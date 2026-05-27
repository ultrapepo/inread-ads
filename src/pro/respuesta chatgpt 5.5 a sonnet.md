Sí: me parece buen diagnóstico y, en varios puntos, incluso más quirúrgico que mi propuesta anterior. Yo llegaría a un acuerdo bastante claro con Sonnet 4.6.

Mi veredicto: aplicaría la propuesta de Sonnet, pero con dos protecciones añadidas.

Punto 1 — test-b y doble subasta

Estoy de acuerdo con Sonnet.

El diagnóstico coincide con lo que vimos: en random1=5, gexp-intext hace fetch pronto, pero como maxDelayMs está en null, el render solo llega por intersección. Si el usuario tarda más de maxFetchToRenderMs, la subasta caduca y se relanza con el slot ya muy encima. Sonnet lo resume bien: pendingAgeMs: 10001 supera maxFetchToRenderMs: 8000, provocando render-intersection-restart.

Mi propuesta anterior era subir maxFetchToRenderMs a 12000/15000. La de Sonnet de meter:

maxDelayMs: 7000

en gexp-intext test-b me parece más limpia, porque evita que la subasta caduque antes de tener que relanzarla.

Mi ajuste fino

Yo haría esto:

gexp-intext test-b mobile:
  fetchRootMargin: "650px 0px"
  renderRootMargin: "250px 0px"
  maxDelayMs: 7000
  maxFetchToRenderMs: 8000

No tocaría todavía gexp-intext-2, gexp-intext-3 ni pnc.

Lo único que vigilaría en logs es que el timer no nos renderice demasiado pronto. En Kibana habría que mirar:

gexp-intext-render-trigger = timer
gexp-intext-render-distance-px
gexp-intext-fetch-age-ms
gexp-intext-fetch-expired

Si vemos muchos timers con distancia tipo 600px+, entonces habría que bajar a 5000/6000 o subir maxFetchToRenderMs a 10000. Pero como primer ajuste, 7000 me parece razonable.

Punto 2 — slot fantasma post-vídeo

También estoy de acuerdo. De hecho, aquí Sonnet concreta mejor que yo.

Yo había dicho: “hay que garantizar una sola superficie visible y evitar delayed destroy sobre wrappers activos”. Sonnet baja al punto exacto: en el path currentState === "video" dentro de startAuction("refresh"), el sistema deja visible el videoEl con loader mientras prepara el display. Como displayWrapper y videoWrapper son hermanos en DOM, durante unos instantes se ven dos cajas.

La solución de Sonnet de usar displayEl como caja superviviente del loader y ocultar videoEl inmediatamente me parece acertada:

videoEl.style.display = "none";
videoEl.style.opacity = "0";
videoEl.classList.remove("is-open");

y luego abrir displayEl con altura preservada y loader.

Mi condición

Aquí añadiría dos protecciones:

No destruir videoEl, solo ocultarlo. Nada de close({ destroy: true }) en ese punto.
Validar renderToken antes de tocar DOM, porque este flujo tiene callbacks async y ya hemos visto stale callbacks antes.

También pediría logs específicos:

video_to_display_transition_started
video_to_display_video_surface_hidden
video_to_display_display_loader_preserved
video_to_display_single_surface_enforced

Este cambio sí lo haría.

Punto 3 — flash en formatos especiales

También estoy de acuerdo con Sonnet.

Su diagnóstico encaja mucho con lo que viste: el billboard llega como 970x250, se muestra un instante antes de aplicar transform: scale(...), y por eso ves el flash. Sonnet dice que el wrapper se hace visible con display:block y opacity:1 antes de que applyDisplayRenderLayout() aplique el escalado.

La solución de:

slotDoc.style.visibility = "hidden";
...
applyDisplayRenderLayout(...)
...
slotDoc.style.visibility = "";

solo para isSpecial === true me parece la mejor opción. No usaría display:none, porque rompería medidas como clientWidth. Sonnet también lo marca: visibility:hidden mantiene el elemento en layout, permite calcular medidas y evita CLS.

Mi condición

Aquí añadiría un try/finally para que nunca se quede oculto si algo falla:

let specialHidden = false;

try {
  if (incomingSpecialProfile?.isSpecial && slotDoc) {
    slotDoc.style.visibility = "hidden";
    specialHidden = true;
  }

  this.container.open(this.lockedHeight);
  ...
  this.applyDisplayRenderLayout(...);
} finally {
  if (specialHidden && slotDoc?.isConnected) {
    slotDoc.style.visibility = "";
  }
}

Y logs:

display_special_creative_prerender_hidden
display_special_creative_revealed_after_layout
display_special_creative_reveal_recovered_from_error

Este cambio también lo haría.

Donde matizaría a Sonnet

No le pediría mucho más. Solo matizaría esto:

1. No tocar todavía maxFetchToRenderMs

Sonnet lo propone como opcional subir a 10000. Yo no lo metería en el mismo cambio salvo que Codex vea que maxDelayMs: 7000 no basta.

Primero probaría:

maxDelayMs: 7000
maxFetchToRenderMs: 8000

Si sigue habiendo expiraciones, entonces sí subir a 10000.

2. No meter una solución global de destroy ahora

Mi propuesta anterior iba más amplia: revisar delayed_destroy, destroyDisplayForRetry, etc. Ahora creo que, para no tocar demasiado, haría primero lo de Sonnet:

video→display: mover loader al displayEl;
special creative: visibility:hidden hasta layout aplicado;
test-b: maxDelayMs: 7000.

Si después sigue apareciendo intext_container_delayed_destroy_applied cerca de los flashes, entonces atacamos close({ destroy: true }).

Acuerdo final

Yo lo dejaría así:

Aplicar ahora
Config mobile gexp-intext test-b
maxDelayMs: 7000
mantener fetchRootMargin: "650px 0px"
mantener renderRootMargin: "250px 0px"
no tocar secundarios.
Core vídeo→display
en refresh desde estado vídeo, ocultar videoEl inmediatamente;
usar displayEl como caja visible con loader y altura preservada;
no destruir wrappers;
validar token.
Core special creatives
si getDisplaySpecialCreativeProfile(...).isSpecial, aplicar visibility:hidden antes de hacer visible el slot;
llamar a applyDisplayRenderLayout();
revelar después;
usar try/finally.
No aplicar todavía
No subir maxFetchToRenderMs salvo que la prueba siga mostrando expiraciones.
No tocar destroyDisplayForRetry() global todavía.
No tocar resize especial.
No tocar Prebid/TAM/GAM, vídeo IMA, sentinel, refresh normal ni decision mode.

Qué le preguntaría a Sonnet, si quieres cerrar del todo

Le preguntaría solo esto:

¿Ves algún riesgo de que maxDelayMs: 7000 en gexp-intext test-b dispare demasiados renders por timer lejos del viewport en usuarios que se paran arriba del artículo? ¿Preferirías 6000, 7000 o combinar 7000 con maxFetchToRenderMs: 10000?

Pero no es imprescindible. Con lo que ha propuesto, más los guards de token y try/finally, yo lo veo bastante sólido.