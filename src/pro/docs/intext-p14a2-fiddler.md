# P1.4-A2 — Guía QA tras completar los dos E0 Legacy

Actualización **26/10/2026**, tras revisar íntegramente el informe Performance y sus originales. **Recopilación A2 completada, 2/2 Legacy E0 descriptivos**: A2-PSP-E0-1 del 25/10 y E0-26oct del 26/10. A2-Legacy-E0-real-1/2 siguen siendo PSP/dual, aparte. La captura adicional acordada ya está recibida y validada: **no queda otra navegación solicitada**, ni se amplía automáticamente por faltar NetLog, XML o filmstrip final. [Auditoría vigente](intext-p14a2-e0-network-media-audit.md), [matriz](intext-p14a2-evidence-matrix.md).

No ejecutar builder ni regenerar bundles. Artefactos A1 congelados. Sin nuevas capturas, probes o llamadas publicitarias; A3/B/C/enforce inactivos y P1.3c visual abierta. Los pasos operativos del anexo conservan el procedimiento ya cumplido, **no una orden de repetirlo**.

## Revisión offline vigente

1. Conservar los cuatro originales y el informe en Descargas; cotejar sus SHA256 con el [registro Performance](intext-p14a2-legacy-performance-evidence.json). El Performance `.json` es GZIP, no JSON directamente: leer sus bytes con descompresión, sin alterar ni volver a descargar recursos del HAR.
2. Aceptar identidad por body recibido y export runtime: E0 de 894934 bytes/hash esperado; arm/assignment_fixed E0, cero conflictos y dropped=0; ramas seriales. Legacy confirmado por dualMode=false, pspDetected=false, randomSource=gexp-owner-random. Nombre del fichero o éxito de reproducción solos no certifican contexto/brazo.
3. Mantener PSP 22/10 (4 E0+6 E1, HAR filtrados), Legacy E1 22/10 (6 E1, HAR completos), PSP E0 26/10 (2), Legacy E0 25/10 (1) y Legacy E0 26/10 (1 con trace) en filas separadas. El recuento 2/2 Legacy es cumplimiento descriptivo; no empareja fechas/SDK/creatividades ni estima mejora.
4. Correlacionar slot/ciclo/token e hitos consecutivos. No sumar prewarm, prepare y carga de dependencias ni tareas JS anidadas; SSL va dentro de connect. Diferenciar tiempo de pared RunTask por hilo de CPU exclusiva de InText, y relojes trace/HAR aproximados de drift exacto.
5. Registrar la cobertura real: trace ~35,79 s desde 17:17:10.733, posterior a dependencias/prepare; Screenshot ~14,23 s iniciales, sin COMPLETE/restore. Falta XML VAST y no hay NetLog/SAZ. Son límites que acompañan el resultado, **no motivos automáticos para repetir**.

## Interpretación QA obligatoria

| Señal | Dictamen vigente |
|---|---|
| Residual activate=0; dependencias 1635 ms; viewport wait=5909 ms | Mide una espera ya satisfecha, no latencia total cero ni beneficio E1 |
| Anchor ~0,225% elegible, región prevista fuera, wrapper cerrado | Pregunta B shadow sobre geometría prevista; no prueba start offscreen, pues anchor llega a 1 en manager/frame |
| Bridge 536/409/285 ms | RunTask/evaluación/compilación anidados, no 1230 ms acumulables |
| MajorGC ~165 ms y RunTask Marca ~60%, iframe ~34% | Coste observado en un éxito; tiempos de pared con solape, sin causa histórica demostrada |
| GVT 302 ~1012 ms→206 ~280 ms | Transporte del medio y rango legítimo; no duplicación/error, TLS no separable del proxy/origen |
| COMPLETE→Display request 2432 ms | P2 refresh, isFallback=false; separar request→render→open→viewable |
| Filmstrip antes de COMPLETE | P1.3c visual abierta para cierre y restore; telemetría no la cierra |

## E0 QA, histórico P1.3c y criterio A3

**E0 P1.4-A** ejecuta el coordinador QA, sus marcas y el probe compartido: Video.js→contrib-ads→IMA SDK→videojs-ima. **P1.3c histórico** es la baseline anterior sin coordinador A1; no se transforma en ese control porque E0 cargue secuencialmente. Verificar fuente/hash/instrumentación/dummy y condiciones por separado antes de comparar. Los dos E0 Legacy completados no aíslan un efecto común del coordinador/probe frente a ese histórico. Tampoco son una nueva validación visual P1.3c.

Para cualquier diseño futuro A3, `residualDependenciesWaitMs` es **secundaria**. Si su distribución es 0–1 ms por prepare previo, un p75 residual no tiene sensibilidad útil para valorar A: no usarlo como aprobación exclusiva. Informar carga total, winner→ready y solape como ingeniería; exigir además primera elegibilidad de control→frame perceptible/primera pasada, proporción sin frame, abandonos/censura y seguridad UX/autoridades. Denominadores fijados antes del ensayo e idénticos entre brazos, análisis por página/cohorte, fechas y SDK comparables. Objetivo del 20% residual, si se conserva, solo aplica donde esa espera exista y nunca habilita A3 por sí solo. A3 sigue bloqueada; no ejecutar su matriz ahora.

## Próximo trabajo propuesto, sin nuevas capturas

Cerrar la recopilación A2 y diseñar **offline** P1.4-B shadow con anchor y rectángulo previsto separados. Especificar candidatos geométricos, primera elegibilidad del control, primera pasada/reentrada, oportunidades preservadas/perdidas y campos no cubiertos; no adoptar umbral de producción a partir del 0,225%, ni implementar/activar shadow o gate alguno. Las trazas no predicen qué respuesta publicitaria habría llegado con otro timing.

H-IMA queda abierta: demora asíncrona retorno requestAds→VAST/manager por ejecución/disponibilidad del bridge y/o transporte bajo proxy; el efecto común del coordinador/probe frente al histórico no está aislado. Si se decide retomar esa causalidad, el entregable previo será un **protocolo acotado** proxy/directo con control histórico distinguido, factores bloqueados y criterio de parada. Datos existentes del mismo outlier se analizan primero; un trace de otro éxito no lo sustituye. No hay ensayo adicional autorizado por esta guía ni necesidad demostrada de un probe nuevo.

## Anexo histórico — procedimiento de la captura adicional, ya cumplido

El contenido siguiente documenta el plan anterior. Sus imperativos se conservan como referencia del ensayo recibido; no están activos ni requieren subsanar cobertura mediante otra navegación.

## 1. Verificación offline de archivos y reglas, antes de navegar

Desde `src/pro`, comprobar los archivos existentes con `Get-FileHash -Algorithm SHA256 -LiteralPath 'tests/qa/generated/...'`. Comparar el hash completo, no solo el nombre, con el [manifiesto A1](intext-p14a-build.json):

| Distribución / brazo | Archivo local | SHA256 esperado |
|---|---|---|
| `_gam_kv_.js` E0 | `tests/qa/generated/intext-p14a-E0-gam.qa.js` | `18299f4fa54e151ff045e6d355c554055bdc85399ddec29eb5e9e85990bcfdfc` |
| `_gam_kv_.js` E1 | `tests/qa/generated/intext-p14a-E1-gam.qa.js` | `6356718da3b272d2c68ac208ac9147020b9b327ce6b6dc7b40af3317e3e58e11` |
| `IntextManager.js` E0 | `tests/qa/generated/intext-p14a-E0-manager.qa.js` | `0995a835320911ea856636044e5008e175285f8bbc76abb1f94aa596290fbf5f` |
| `IntextManager.js` E1 | `tests/qa/generated/intext-p14a-E1-manager.qa.js` | `250c24ca253e814c6cca4beec1363fe32abd6f17cf2c9234fdf2a5f73c164bd8` |

En Fiddler AutoResponder, inspeccionar **la regla que realmente coincide**, su orden/prioridad y su acción/ruta absoluta, incluidas reglas duplicadas, genéricas o copias antiguas que puedan adelantarse. Conservar una captura/configuración saneada del matcher y ruta local. Resolverla al E0 ya verificado; nombre «E0» en la regla no prueba qué fichero sirve. No hay acceso a estas reglas en la evidencia recibida: aún no se identifica cuál entregó E1.

Usar el matcher exacto de la URL Intext que ya carga ese artículo, con sus condiciones de host/path/query existentes. No agregar otra distribución. Si la página carga `_gam_kv_.js`, seleccionar E0-gam; si carga Manager, E0-manager; si carga ambas, E0 en ambas y comprobar ambos cuerpos. No interceptar IMA, GPT, Prebid, APS, PSP, VAST o media. Deshabilitar sustituciones/probes antiguos que compitan con el bundle P1.4-A, sin cambiar autoridades comerciales del sitio. No modificar coordinador para compensar una regla errónea.

## 2. Preparación histórica del único intento

| Nueva captura, etiqueta provisional | Brazo exigido | Artículo y contexto requerido | Condiciones |
|---|---|---|---|
| A2-E0-Performance-unico | E0 | Mismo artículo de Marca; Legacy sin PSP **comprobado durante la navegación** | Documento nuevo; registrar entorno/caché, HAR completo y trace desde antes de activar |

Antes de navegar, revisar sin tráfico adicional carga de equipo, pestañas, extensiones, CPU/memoria Chrome/Windows, proxy Fiddler y su configuración de interceptación/cache. Mantener consentimiento, perfil, navegador, emulación, viewport y scroll comparables al Legacy del 25/10; documentar cualquier diferencia, incluida versión del SDK/bridge efectiva. Red sin throttling y CPU sin limitación simulada. Un reinicio que cambie estado/caché debe anotarse; no convierte el ensayo en réplica causal.

Registrar protocolo de caché y estado efectivo por recurso, Fiddler, service worker y revalidaciones. Disable cache requiere DevTools abierto; no confundir cero transferencia con confirmación universal de caché. Si no puede verificarse, marcar `cache-unknown`. No borrar cookies comerciales ni añadir priming. El migrate.js capturado permite PSP por gate/override/muestreo: **no cambiar pspDebug, flags, random, targeting o routing para fabricar Legacy**. Si el contexto resulta PSP, guardar su identidad real y detener el plan para revisión; no repetir hasta que salga Legacy. La etiqueta definitiva se asigna desde runtime y no desde el nombre provisional.

Iniciar Network **antes de la navegación**, grabando y con Preserve log. Exportar sin filtros por texto/tipo/dominio/frame, con contenido disponible. Separar los ficheros por sesión para que Preserve log no mezcle documentos. Incluir scripts, SDK, bridge, requests fallidas, redirects, VAST y media; conservar cuerpos XML si ya fueron capturados, sin volver a pedirlos.

## 3. Aceptar la identidad efectiva del documento

En la única navegación, cuando exista la API, comprobar sin mutarla:

```javascript
window.IntextP14A.arm
const p14aCheck = window.IntextP14A.export();
({
  arm: p14aCheck.arm,
  fixed: p14aCheck.logs.filter(e => e.event === 'assignment_fixed'),
  conflicts: p14aCheck.logs.filter(e => e.event === 'assignment_conflict'),
  dropped: p14aCheck.dropped
});
```

Exigir `arm=E0`, `assignment_fixed.effectiveArm=E0`, cero conflictos y sin pérdida de asignación. En debugger comprobar además **dualMode=false, pspDetected=false, randomSource=gexp-owner-random** y resolución GPT Legacy; conservar identidad inicial y al exportar. `assignment_reused` E0 puede ser legítimo si se cargan ambas distribuciones. Verificar cuerpo efectivamente servido por Fiddler/Network, archivo y SHA256 E0. Disco o propiedad global solos no bastan; revisar caché/SW/304 ante discrepancia.

Guardar el body de respuesta decodificado sin editarlo ni regrabarlo en un editor. Comprobar SHA256 sobre esos bytes; no sobre todo el HAR, headers, compresión de transporte, texto copiado que normalice saltos de línea o un acceso nuevo a la URL. Si se usa `response.content.text` del HAR, decodificar base64 cuando `encoding=base64`; en otro caso usar UTF-8 sin BOM. Si falta body no se puede certificar el hash desde ese HAR: guardar el body ya disponible de Fiddler/DevTools, sin refetch. Aplicar la misma comprobación a cualquier otra distribución Intext cargada.

Si cuerpo/hash, arm o assignment_fixed no coinciden, **no etiquetar el resultado como E0**. Conservarlo como fallo de integridad de entrega; revisar reglas/caché/ruta offline y detener esa medición. No arreglar arm a mitad de documento ni disparar otra request para «probar» la corrección. La repetición no se amplía automáticamente para sustituir capturas inválidas.

La primera asignación permanece hasta destruir el documento. Seleccionar la regla antes de la navegación completa y comprobar nuevo assignment_fixed, reloj y hash. SPA/PNC, refresh publicitario o reinyección no cambian brazo; evitar bfcache del documento anterior y no borrar `window.IntextP14A`. Este único intento es E0; la identidad E1 se comprueba offline, sin navegar otra variante.

## 4. Performance, proxy y exportación

Performance es **la finalidad de este intento**: grabar desde antes de la navegación/activación hasta frame o timeout/recuperación, con red y tareas/frames presentes en el trace. No esperar a que se repita el atasco para empezar. Conservarlo también si completa rápido: sin la fase anterior al frame no se responde qué hizo el navegador durante la entrega del medio. [Chrome Performance](https://developer.chrome.com/docs/devtools/performance/reference).

Registrar sampling, screenshots/memoria, hora de inicio/fin, visibilidad y coste de grabación. Cubrir dependencias, bridge y manager→frame; una ventana de unos 40–45 s alrededor de activación cubre el límite actual y recuperación, ampliando solo la grabación de ese mismo intento si empezó antes. Dejar terminar el anuncio y exportar después. Sin pausas/breakpoints. Si falta cobertura, marcar trace insuficiente y detenerse, **sin segundo intento adicional automático**.

Conservar por sesión:

1. HAR íntegro, bodies JS que permitan hashes de bundle/videojs-ima/ima3.js, bridge con versión, initiator/frame, estados y timings. `startedDateTime` incluye colas, no envío por cable; SSL puede estar incluido en connect.
2. `copy(JSON.stringify(window.IntextP14A.export(), null, 2))`, debugger normal y consola completa con errores. Exportar tras COMPLETE/restore/destroy o timeout/fallback. No llamar `stop()` antes de recoger los eventos necesarios.
3. Performance y captura Fiddler/SAZ/configuración/timings del mismo intento, si están disponibles. Para separar proxy/conexión, preparar también [NetLog](https://www.chromium.org/for-testers/providing-network-details/) en `chrome://net-export/` antes de navegar, con configuración por defecto y anotando reloj/configuración. Detenerlo tras la captura. No requiere otra navegación publicitaria ni reemitir requests; si no se obtiene, mantener explícita la limitación de transporte. No hace falta capturar bytes sensibles adicionales para distinguir eventos de conexión.
4. CPU/memoria/carga de procesos y estado de caché/throttling; no diagnosticar CPU por tiempo de descarga. Grabación visual/filmstrip de reveal y COMPLETE→restore→Display si se dispone, sin cerrar P1.3c solo por telemetría.

HAR, trace, SAZ y consola pueden contener identificadores y tokens; mantener originales en su canal restringido y publicar solo resumen saneado. No consultar URLs extraídas del HAR para completar XML o probar demanda.

## 5. Hoja de verificación y decisión posterior

Por documento: etiqueta real, artículo, hora/timeOrigin, archivo/ruta/regla Fiddler, hash esperado y efectivo, arm, assignment_fixed/conflicts/dropped, navegador/viewport, Legacy/dualMode/pspDetected, consentimiento y caché por recurso. Mantener slot/cycle/token y cobertura de eventos.

Por primer vídeo slot1/ciclo1: winner → dependencias listas → activación → ads-loader → ads-request → inicio/fin HAR del bridge y VAST → manager → adsready/preroll → frame **publicitario** → reveal → COMPLETE/error/timeout → cleanup. Hitos ausentes se conservan null. Para timeout, enlazar fallback con su ciclo/token nuevos; para COMPLETE, Display posterior es refresh. Slot2 y ciclos posteriores van en filas distintas.

| Observación | Próximo análisis, sin cambiar ejecución |
|---|---|
| Long tasks/GC o retrasos de tareas en el intervalo | Correlacionar hilo/frame y stack; no atribuir automáticamente al hardware ni al coordinador |
| Request creada pero esperando socket/DNS/TLS/proxy | Correlacionar esa request HAR/SAZ/NetLog; no extrapolar conexiones de otro servicio |
| Bridge descargado, sin progreso visible, main thread no explica la demora | Revisar cobertura de iframe/SDK/consola y transporte; HTTP 200 no prueba handshake completado |
| VAST/error/XML realmente disponible | Analizar su cadena offline, sin modificar GAM, bidder, targeting o floors |
| Retorno SDK pero sigue sin request/manager y trace/red no discriminan | Entregar el intento y proponer por separado si hace falta captura pasiva del AdsRequest/evento público del loader; no implementar un probe automáticamente |
| Se verifica Legacy y completa el único intento | Completa el objetivo descriptivo de dos Legacy E0; no exonera causalmente a E0 ni demuestra regresión de E1 |
| Se obtiene PSP, faltan hashes o el trace no cubre el intervalo | Conservar con etiqueta/contexto real, informar la cobertura y detenerse; no añadir otro intento |

**Decisión histórica, cumplida:** diagnóstico de entorno/ejecución, sin nuevo probe ni bundles. El único intento es ahora Legacy-E0-2, validado con Performance. La decisión vigente está al comienzo de esta guía: recopilación cerrada, causalidad abierta, sin expansión ni activación A3/B/C/enforce.

Rollback operativo: retirar la sustitución y realizar navegación completa verificando hashes productivos del manifiesto. No tocar el anuncio activo ni sus métodos. Core, timeouts, request/start, autoplay, first-frame/reveal, PiP/fallback, GAM/Prebid/APS/PSP, targeting/floors, producción, QA previa y P1.3c intactos. Sin enforce, commit, push o despliegue.
