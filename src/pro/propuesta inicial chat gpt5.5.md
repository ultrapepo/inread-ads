He revisado V3 con los dos logs mobile Marca (random1=5 y random1=6), _gam_kv_.js y default_ES_mobile.js. Mi conclusión: los problemas que describes son reales y los logs apuntan bastante claro a dos causas de lifecycle/DOM, no a la lógica de resize en sí.

Resumen ejecutivo

Hay tres conclusiones importantes:

El resize especial funciona bien.
Los 970x250 se detectan como wide-medium-special, se centran y escalan a scaleFactor: 0.3381 con availableWidth: 328. Eso está haciendo lo que queríamos.
El flash viene casi seguro de IntextContainer.close({ destroy: true }) / delayed destroy.
En los dos logs aparece intext_container_delayed_destroy_applied justo después de que el anuncio ya está renderizado y remaquetado. Eso encaja con el “desaparece y vuelve a aparecer” que estás viendo.
Lo de los dos slots tras finalizar vídeo no parece un duplicado real de wrapper.
No hay duplicate_intext_wrapper_detected. Lo que parece ocurrir es que durante la transición vídeo → display quedan visibles durante unos instantes las dos superficies legítimas del mismo nodo: gexp-intext display y gexp-intext-video.
1. Comparativa random1=5 vs random1=6
random1=5 / test-b

Configuración resuelta:

gexp-intext:
fetchRootMargin: 650px
renderRootMargin: 250px
maxDelayMs: null

gexp-intext-2:
fetchRootMargin: 500px
renderRootMargin: 150px
maxDelayMs: null

Eso está correcto.

Pero en gexp-intext pasa algo importante:

fetch distancePx: 629
render distancePx: 210
pendingAgeMs: 10001
maxFetchToRenderMs: 8000
fetch expired → restart
nuevo render distancePx: 98

Es decir: el fetch inicial caduca antes del render. Luego relanza fetch muy cerca del viewport, perdiendo parte de la ventaja del prefetch.

Después, el vídeo tarda bastante:

auction_to_request_winner_video = 7708ms
request_winner_video_to_adstart = 5611ms
adstart_to_reveal = 1719ms

Esto es alto. En la práctica, desde la fase útil de render hasta vídeo visible se va a varios segundos. El test-b está evitando impresiones tempranas, pero en este caso la expiración de pendingAuction está penalizando.

random1=6 / control

Configuración resuelta:

gexp-intext:
fetchRootMargin: 900px
renderRootMargin: 500px
maxDelayMs: 1500

gexp-intext-2:
fetchRootMargin: 400px
renderRootMargin: 150px
maxDelayMs: null

También está correcto.

Aquí el gexp-intext renderiza por timer:

trigger: timer
distancePx: 629

O sea, el control dispara muy pronto, mucho antes del viewport. Eso puede ayudar a que el vídeo esté preparado, pero también puede perjudicar viewability si cuenta demasiado pronto.

El vídeo tarda todavía más en arrancar:

auction_to_request_winner_video = 1473ms
request_winner_video_to_adstart = 16535ms
adstart_to_reveal = 523ms

La diferencia es clara:

Métrica	random1=5 test-b	random1=6 control
Render gexp-intext	98/210px	629px por timer
Pending auction	caduca a 10s	no caduca
Video request → adstart	5.6s	16.5s
Adstart → reveal	1.7s	0.5s

Mi lectura: el vídeo sigue siendo el cuello de botella, y en test-b además estamos perdiendo el fetch por maxFetchToRenderMs=8000.

2. Problema del doble slot al terminar vídeo

Lo que describes:

Termina vídeo en gexp-intext, desaparece player, queda slot con “recuperando anuncio”, y justo debajo aparece otro slot pegado con “cargando anuncio”.

En los logs no aparece:

duplicate_intext_wrapper_detected

Así que no parece que se estén creando dos wrappers duplicados del mismo display. Lo que sí existe en arquitectura es esto:

un wrapper display: gexp-intext
un wrapper vídeo: gexp-intext-video

Ambos se crean como hermanos en DOM. En el código se insertan display y después video. Además, el sistema tiene una función para ocultar la superficie opuesta, pero esa función oculta con display:none, height:0, opacity:0, y quita is-open sobre el elemento contrario.

El problema probable es la ventana intermedia:

Vídeo termina.
Se inicia refresh display.
El sistema prepara el contenedor display.
El wrapper vídeo aún no ha quedado totalmente cerrado/oculto.
Durante unos ms se ven ambos: display arriba y vídeo/loader abajo.

En el log de random1=5 aparece justo esta transición:

[Intext:Video:gexp-intext-video] Visible time reached (0ms) -> Starting refresh cycle 1/3
[Intext:Display:gexp-intext] display_height_state_applied - source=refresh_prepare_video_container

Eso huele a transición video→display donde se está preparando display mientras todavía hay superficie de vídeo viva.

Qué corregiría

No tocaría la lógica de subasta ni vídeo. Haría un fix de lifecycle visual:

Regla nueva

Durante video → display refresh debe haber una única superficie visible.

Comportamiento deseado:

Si el vídeo termina y va a display refresh:
mantener un solo wrapper abierto con la altura actual;
ocultar la otra superficie en el mismo frame;
no permitir que display y video wrappers estén visibles simultáneamente;
no cerrar a 0 y reabrir;
no destruir el wrapper activo.
Fix técnico

Reforzar ensureSingleVisibleIntextSurface() para que, además de tocar estilos del elemento contrario, también sincronice el estado interno del IntextContainer, porque ahora puede dejar el DOM oculto pero el objeto IntextContainer.isOpen en un estado no representativo.

Añadir algo tipo:

hideSurface(this.videoContainer, "video")
hideSurface(this.container, "display")

en vez de pasar solo el el, para poder hacer:

container.isOpen = false;

y limpiar loader/height/display de forma consistente.

3. Flash al cargar formato especial

Aquí el log es bastante revelador.

En gexp-intext-2, después de sentinel, llega el especial:

slotRenderEnded size: [970,250]
display_special_creative_layout_detected
display_height_state_applied
display_special_creative_layout_applied

Hasta aquí, perfecto.

Pero justo después aparece:

intext_container_delayed_destroy_applied

Esto aparece justo después de aplicar layout especial, tanto en test como en control. En el propio código, IntextContainer.close({ destroy: true }) hace esto:

elToDestroy.classList.remove("is-open");
elToDestroy.style.height = "0px";

setTimeout(() => {
  logIntext("intext_container_delayed_destroy_applied");
  this.destroy();
}, 350);

Es decir: si se llama a close({ destroy: true }), el contenedor se colapsa a 0 y 350ms después se destruye.

Eso explica perfectamente el flash:

GAM devuelve sentinel o refresh.
destroyDisplayForRetry() prepara/reintenta.
Se agenda un delayed destroy.
Llega el nuevo anuncio especial y se pinta bien.
El delayed destroy anterior dispara después.
Visualmente parece que la caja desaparece/reaparece o flashea.

En los logs de especial también se ve esa secuencia: se aplica el layout especial y aparece intext_container_delayed_destroy_applied inmediatamente después.

Esto no es culpa del resize

El resize está bien:

sourceWidth: 970
sourceHeight: 250
layoutKind: wide-medium-special
availableWidth: 328
scaleFactor: 0.3381
targetContentHeight: 345

El problema es el destroy/close alrededor del retry/render, no el cálculo de escala.

4. Sentinel y refresh

En ambos logs hay sentinel en gexp-intext-2.

En random1=5:

primer display de gexp-intext-2 da sentinel;
retry;
luego entrega 970x250.

En random1=6:

gexp-intext-2 recibe sentinel varias veces;
llega hasta attemptSlot: 3;
luego entrega display real.

No veo bloqueo fatal de sentinel. Lo que sí veo es que cada sentinel/retry activa rutas de destroy/cleanup, y eso aumenta la probabilidad del flash.

5. Sobre formatos especiales

Los tamaños nuevos están entrando en la request:

[300,250]
[300,300]
[336,280]
[320,100]
[320,50]
[300,600]
[970,90]
[980,90]
[970,250]
[980,250]
[120,600]
[120,1000]

Y el 970x250 se está tratando como especial:

layoutKind: wide-medium-special
scaleFactor: 0.3381
targetContentHeight: 345

Esto está bien. Yo no tocaría la lógica de scale todavía. El ajuste debe ir a preservar wrapper/height y eliminar delayed destroy sobre el contenedor activo.

6. Cambios que pediría ahora

Prioridad absoluta: no tocar subasta, Prebid, TAM, GAM, vídeo IMA, ni resize especial. Solo lifecycle visual.

Cambio 1 — No destruir el wrapper activo

IntextContainer.close({ destroy: true }) es demasiado agresivo para Intext.

Ahora hace:

classList.remove("is-open")
height = "0px"
destroy en 350ms

Eso no vale para refresh/retry si queremos evitar CLS/flash.

Pediría:

Añadir opción preserveHeight.
Añadir opción destroyOnlyIfStale.
Añadir source, renderToken, slotCode.
Si el elemento sigue siendo el wrapper activo del nodo, no destruirlo.
Si hay que limpiar, limpiar solo el inner GPT/creative, no la caja exterior.

Ejemplo conceptual:

close({
  destroy: true,
  preserveHeight: true,
  destroyOnlyIfStale: true,
  source: "sentinel-retry",
  renderToken
})

Y si es el wrapper activo:

intext_container_delayed_destroy_skipped_active_current
Cambio 2 — destroyDisplayForRetry() debe preservar la caja

Para sentinel y refresh:

no debe colapsar el contenedor a 0;
no debe eliminar el wrapper visual;
debe mantener content_height actual, sea 345 o 600;
debe mostrar loader dentro de la misma caja;
debe limpiar/recrear solo el contenido de GAM si hace falta.

Ahora los logs muestran:

display_height_state_applied - source=destroyDisplayForRetry
intext_container_delayed_destroy_applied

Eso es contradictorio: por un lado preservamos altura; por otro un delayed destroy puede cargarse la caja.

Cambio 3 — Transición vídeo → display con una sola superficie visible

Cuando termina vídeo y empieza display refresh:

ocultar video wrapper y abrir display wrapper en la misma operación visual;
o mantener una única caja loader hasta que display esté listo;
nunca permitir display wrapper + video wrapper visibles simultáneamente.

Añadir logs:

video_to_display_transition_started
video_to_display_single_surface_enforced
video_to_display_previous_surface_hidden
video_to_display_loader_preserved
Cambio 4 — Añadir slot/source al log de container

Ahora intext_container_delayed_destroy_applied no dice qué slot ni qué superficie es. Necesitamos:

slotCode
format: display|video
source
renderToken
cycleId
elementId
isCurrentElement
isConnected
heightBefore

Sin eso es difícil saber si destruye display, video o stale.

7. Ajuste menor de tiempos

No lo haría antes del fix visual, pero lo dejo marcado:

En random1=5, maxFetchToRenderMs=8000 ha caducado a 10001ms. Eso obliga a reiniciar fetch justo cuando ya toca render.

Yo consideraría subir en mobile gexp-intext a:

maxFetchToRenderMs: 15000

al menos para test-b, o hacer una prueba con 12000. Pero después de arreglar el flash/doble superficie, porque ahora hay demasiado ruido visual.

Veredicto

No subiría más cambios de formatos ni de márgenes hasta arreglar esto.

El resize especial está bien.
El problema fuerte está en:

close({ destroy: true }) colapsando/destruyendo wrappers activos.
delayed destroy disparando después de que ya hay nuevo render.
transición vídeo→display dejando visibles dos superficies hermanas unos instantes.

Mi recomendación: fix pequeño y quirúrgico de lifecycle visual, manteniendo la caja abierta y su altura, limpiando solo contenido interno y forzando una única superficie visible.