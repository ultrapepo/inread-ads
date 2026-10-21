# P1.3c — diagnóstico residual, propuesta QA y validación pendiente

No se modifica producción. `_gam_kv_.js` e `IntextManager.js` conservan los SHA256 de P1.3b: `1CDE1CCDC962C07D5833DC9691A3BFE31B7DD74B3E649E89153A240940A06690` y `BA832DC0EB3C0F6E1070A515FAC09DD31467E2C7A5A64A18FF4E4F4C063FEAD8`. Versión sin cambio. Sin commit, push ni despliegue. **P1.3c no está resuelta ni aprobada: faltan nuevas pruebas Chrome/SDK de esta propuesta.**

## Evidencia original reutilizada

Se localizaron los siete JSON originales en Downloads. `intext-p13c-real-evidence.json` contiene nombres completos, hashes SHA256, runtime, métricas correlacionadas por slot/cycle/token, geometría, diagnósticos y auditorías Prebid extraídas mediante Node. Los originales se leen y no se modifican. Otros dos JSON del 19/10 (10:07 y 10:09) no forman parte del conjunto solicitado. El único HAR disponible, `127.0.0.1.har`, es del **13/10 14:02–14:34 UTC**: no se usa para atribuir red, HTTP ni blocked a los casos del 19/10.

| Fichero (sufijo UTC) | Contexto | Resultado inicial Slot 1 |
|---|---|---|
| 10-04-40-566Z | PSP/dual; random nativo GPT | Vídeo completo; activation→frame 6659 ms |
| 10-05-48-573Z | PSP/dual; random nativo GPT | Display directo; request métrica→open 7027 ms |
| 10-27-37-390Z | Sin PSP; gexp-owner-random | Vídeo completo; activation→frame 5021 ms |
| 10-28-30-220Z | Sin PSP; gexp-owner-random | 1005; request proxy→error 8155 ms; fallback open 18,132 s |
| 10-29-27-305Z | Sin PSP; gexp-owner-random | AdsManager sin readyforpreroll/frame; timeout; fallback open 36,260 s |
| 10-30-10-902Z | Sin PSP; gexp-owner-random | Vídeo completo; activation→frame 7678 ms |
| 10-35-43-997Z | Sin PSP; gexp-owner-random | 1005; request proxy→error 19047 ms; fallback open 31,640 s |

Todos usan la misma cadena de versión Intext; no inferir hashes del bundle desde esa cadena. Los tiempos de esta tabla salen de entradas métricas, que pueden diferir unos ms de logs de texto/observación visual. El request proxy es `video_ima_request_sent` (evento player ads-request), **no el instante HTTP probado por HAR**.

Reproducción offline exacta:

```powershell
node tests/qa/intext-p13c-replay.cjs "$env:USERPROFILE/Downloads" --out docs/intext-p13c-real-evidence.json
```

El parser conserva las claves case-sensitive playerSize/playersize. PowerShell ConvertFrom-Json de esta máquina rechaza ese esquema; no se ha normalizado ni eliminado ninguna clave de los originales para sortearlo.

## Prioridad 1 — móvil 10:29

| Hito | t desde inicio del dump |
|---|---:|
| Dependencias preparadas | 7,584 s |
| Activation started | 7,856 s |
| Log inicio IMA inmediato tras Video.js | 7,863 s |
| Plugin inicializado (log) | 7,869 s |
| Player/plugin prepared (métrica) | 7,870 s |
| ads-request proxy (métrica) | 8,052 s |
| player.play llamado (log) | 8,058 s |
| AdsManager recibido | 11,430 s |
| Primer anchor pasado | 22,836 s |
| Reentrada; recovery solicitado/API llamada | 24,019 / 24,020 s |
| Nueva salida; recovery cancelado | 25,538 s |
| Timeout de seguridad | 32,867 s |
| Fallback iniciado / petición Display | 32,915 / 32,917 s |
| GPT slotRequested / response / render | 33,335 / 33,762 / 33,834 s |
| Espera visual resuelta / wrapper abierto | 36,252 / 36,260 s |
| Evento GPT impressionViewable | 37,333 s |

Al recibir AdsManager el anchor está completamente visible (ratio 1); el wrapper mide altura 0 y ratio 0. El primer missed-viewport llega **11,406 s después** del manager: salida/recovery no explican el inicio del bloqueo. No hay readyforpreroll, adstart ni first-frame en este export. No se registra AbortError de play en este caso. Tampoco hay evidencia de inicialización tardía como en Lifecycle A: P1.3b ejecuta el init inmediato. **No hay causa residual demostrada.**

Faltan señales discriminantes: loadstart real, dispatch de play, adsready y estado de contrib-ads antes/después de esos eventos, estado/retorno de init/start del manager y swaps de source/media. El código productivo actual no registra todos esos eventos; ausencia de adsready en el JSON no prueba que no haya ocurrido. Una llamada player.play no prueba dispatch de play ni reproducción. AdsManager no demuestra que el ad-break se haya iniciado.

Hipótesis ordenadas para la siguiente prueba:

1. Prerrequisito play/adsready o transición interna de contrib-ads no alcanzado: capturar ambos eventos y estado antes/después del dispatch. Si ambos llegan y readyforpreroll no, concentrarse en FSM/source/loadstart; si falta play, investigar promise/tech/autoplay; si falta adsready, SDK→plugin.
2. Loadstart/source/ready de la tech desincronizados pese a init en el mismo turno: capturar native loadstart desde antes de crear el vídeo, player loadstart, contentchanged, src setters y snapshot. No emitir un loadstart artificial.
3. Manager obtenido pero init/start no ejecutados, o SDK no progresa por creatividad/media: observar APIs nativas y error type/inner; exigir HAR/XML/MP4 de ese mismo caso.
4. Pausa/recovery puede prolongar el estado posterior, pero la cronología descarta que la primera salida observada cause el bloqueo inicial. No se modifica P1.2b.

[contrib-ads documenta play + adsready → readyforpreroll y la necesidad de init inmediato](https://videojs.github.io/videojs-contrib-ads/integrator/getting-started.html). Esa regla orienta la instrumentación, no demuestra por sí sola qué evento faltó aquí.

## Dónde está la latencia

En los tres vídeos exitosos, player/plugin prepared − activation es **21, 15 y 17 ms**. No parece el coste principal de esos ensayos. Request proxy→manager: **5255, 3946 y 6783 ms**; manager→frame: **1189, 846 y 692 ms**. Son medidas de pipeline, no tiempos puros de GAM/red: sin HAR del 19/10 no se separan cola del navegador, wrappers, SDK, media o main thread.

Display directo desktop: métrica request 6,165 → slotRequested 7,078 → render 9,515 → open 13,192 s. Total **7027 ms** (la referencia aproximada 7,16 s usa otro log de inicio). Hay 913 ms antes de slotRequested, 2437 ms hasta render y 3677 ms render→open. La espera explícita de viewport es 9,530→13,175, **3645 ms**. No atribuir los 7 s íntegros al adserver ni abrir fuera de viewport para reducirlos.

Fallbacks correlacionados por Slot 1 y transición visible de token/ciclo 1→2 en el mismo export:

| Caso | Terminal→fallback inicio | Request Display→slotRequested | slotRequested→response | response→render | render→open | Terminal→open |
|---|---:|---:|---:|---:|---:|---:|
| 10:28, 1005 | 83 ms | 597 ms | 516 ms | 276 ms | 802 ms | 2280 ms |
| 10:29, timeout | 48 ms | 418 ms | 427 ms | 72 ms | 2426 ms | 3393 ms |
| 10:35, 1005 | 67 ms | 585 ms | 561 ms | 114 ms | 2083 ms | 3414 ms |

Entre fallback inicio y request hay otros 6/2/4 ms. En los tres casos Display creative-ready observa reason=passed; se abre al volver a elegibilidad. No hay evidencia de que abrir tarde fuera del viewport sea el comportamiento de esos tres casos. El DOM pintado/píxel no queda probado por wrapper-open; impressionViewable es una señal separada de GPT.

## Propuesta QA: observación y presupuestos, sin tocar producción

`tests/qa/intext-p13c-probe.cjs` y el builder generan copias rotuladas **NOT FOR PRODUCTION** dentro de tests/qa/generated. No hay imports nuevos desde producción. No se cambian versiones, floors, targeting, SDKs ni autoridades. El builder exige marcadores únicos y falla si el lifecycle no coincide; conserva las llamadas originales init/play/setTargeting.

Instrumentación por creative/cycle/token:

- Native loadstart desde el contenedor, creación e init Video.js, retorno de IMA; play/adsready/readyforpreroll y snapshots de FSM tanto durante listener como en microtask posterior al dispatch.
- AdsManager, init/start/pause/resume delegados exactamente una vez sobre la instancia; nunca se inician desde el probe. LOADED/STARTED/IMPRESSION/error/complete nativos y first-frame/reveal del core. Sin eventos sintéticos, nuevas requests ni retries.
- Setter de source y llamadas play/pause con callsite; no se agregan handlers a la Promise original de play, para conservar su semántica de rechazo/unhandled.
- Error SDK con code/type/VAST code/inner/stack; errores globales permanecen sin atribución automática a un slot y con lista de contextos. No preventDefault ni parche de suppressedTracks.
- Wrapper y anchor separados, visibilidad documental y estado observado de media. Historial acotado a 2000 entradas y contador de descartes; console=false en el ejemplo. observerBuildMs permite estimar el coste de construir cada snapshot, sin confundirlo con blocked HTTP.
- Puente explícito parentRenderToken/parentCycleId para el nuevo fallback, y observación DOM/CSS finita tras apertura Display. No es Active View ni prueba de píxel; los eventos GPT del debugger original se conservan aparte.

Revisión **P1.3c-R1**: ver [correcciones del probe y validación actual](intext-p13c-r1-review.md). El diagnóstico y las cronologías de este documento se conservan; la validación 1119/1119 al final es histórica. El parche original intext-p13c-qa.patch es histórico: usar el probe actual y el diff R1 para generar las copias QA.

Modos autorizados para las próximas pruebas: **observe** por defecto en el builder (sin deadlines) y **shadow** en el ejemplo explícito (solo mide vencimientos). El manager no tiene una propiedad device. R1 resuelve dispositivo/fuente desde contexto scoped, DataLayer y, como fallback, gexp.isMobileDevice(); desktop/unknown no arman budgets móviles. Enforce permanece sin autorización de ejecución. No hay umbral nuevo productivo. totalMs se configura explícitamente a 10000 o 12000 para comparar; managerMs es opcional y por defecto null. El watchdog manager→preroll se desarma con readyforpreroll. La confirmación de frame elimina ambos timers. Se registra timerDriftMs.

El reloj online empieza en ads-request del plugin, etiquetado **proxy-NOT-HTTP**. No garantiza 10 s exactos desde la salida HTTP: cuantificar el offset/blocked en HAR antes de adoptar ese presupuesto. Los plazos reales desde VAST se evalúan con la request HTTP inequívocamente correlacionada; el analizador no asigna por cercanía de timestamp ni mezcla clocks de exports.

Cancelación QA requiere token vigente, observación armada antes de init, cobertura nativa de impresión, settle disponible, ningún reveal, `player.ads.isInAdMode() === false`, ningún currentTime positivo y ninguna señal adstart/STARTED/IMPRESSION. Si falta una prueba, o empezó el ad-break, **no cancela** y mantiene el timeout general existente. Por ello no es una cota universal hasta frame en todos los estados. La garantía negativa de impresión debe comprobarse además en SDK/HAR real; la falta de un evento aislado no basta para aprobarlo.

Una cancelación permitida marca solo el creative antiguo aborted, rechaza su Promise con razón QA y usa destroy/dispose existentes. El waterfall decide si puede pedir Display y genera su token nuevo; el probe no fuerza fallback ni cambia el token del nodo por su cuenta. No llama AdsManager.destroy adicionalmente ni duplica play/start/request. Los tests comprueban el contrato con el core real y SDK mock; no prueban que el SDK real haya cancelado todo callback/tracking de red.

## Evaluación de umbrales y pérdida de oportunidad

Los dos éxitos móviles observados tienen request proxy→frame ≈4792 y 7475 ms. 10/12 s no los cortarían retrospectivamente; **n=2 no permite fijar un default ni estimar pérdida de impresiones**. Un watchdog 3 s desde manager tampoco cortaría los tres éxitos (manager→frame ≤1189 ms), pero sigue siendo solo una hipótesis.

En 10:28 el error llega a +8155 ms: un deadline 10/12 no mejoraría ese caso. En 10:35 llega a +19047 ms: habría vencido antes, pero el anchor ya se había pasado a +1213 ms desde request. Solicitar fallback antes no garantiza apertura/impression antes: hay que respetar viewport y medir reentrada. En 10:29 el deadline 10 s proxy vencería a 18,052 s, antes de la primera salida registrada; es una oportunidad para probar, no un resultado causal de monetización ya obtenido.

Primero observar/shadow, contando vídeos que obtienen frame/impresión después de cada umbral, segmentados por creatividad/VPAID, conexión, bloqueo, documento y scroll. Después comparar enforce en inventario QA limitado, con tracking de cancelaciones que habrían producido vídeo válido. No extender/reducir el timeout de 25 s para ocultar estados.

## Errores secundarios

AbortError tras pause aparece en los éxitos móviles 10:27 (+8,356 s) y 10:30 (+13,914 s), además de 1005. No aparece en el bloqueo 10:29. No es causa demostrada; nuevos callsites de player/manager permiten distinguir pausa de contrib-ads/IMA del gate de viewport sin agregar play de recuperación.

Desktop 10:04 registra NotSupportedError del play original a 30,684 s, después de video_complete a 30,658 s; luego Display se abre y llega impressionViewable. No impidió ese playback ni esa recuperación observada; queda por analizar snapshot restore/dummy/segundos ciclos con pila real. No se cambia la fuente ni el SDK.

No se encontraron mensajes suppressedTracks en estos siete exports; eso no demuestra que no ocurriera en la consola/SDK. La instrumentación global captura stack si el navegador lo expone; con error cross-origin opaco, usar DevTools Pause on exceptions y conservar pila, source exacto y momento. No suprimirlo ni atribuirlo al gate C.

IMA 1005 es [FAILED_TO_REQUEST_ADS](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/namespace/google.ima.AdError); no identifica por sí solo HTTP status, timeout de red, respuesta inválida o proveedor culpable. [getType/getInnerError/getErrorCode](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/interface/google.ima.AdError) y el HAR de la misma ejecución son necesarios. En los JSON actuales no están todos esos datos.

## Uso exacto en Fiddler y plan de pruebas

```powershell
# Observe, sin cancelación: omitir el tercer argumento.
node tests/qa/intext-p13c-build.cjs _gam_kv_.js
# Shadow móvil 10 s, sin cancelación; configuración explícita de ejemplo.
node tests/qa/intext-p13c-build.cjs _gam_kv_.js tests/qa/intext-p13c-config.example.json
node tests/qa/intext-p13c-build.cjs IntextManager.js tests/qa/intext-p13c-config.example.json
```

Los ficheros locales son tests/qa/generated/intext-p13c-gam.qa.js y intext-p13c-manager.qa.js. Son copias derivadas ignoradas por Git, no nuevos bundles productivos. `node --check` sobre ambos antes de cargar. Para 12 s, copiar el ejemplo a un fichero QA y cambiar únicamente totalMs; para watchdog, añadir el managerMs elegido en shadow. No ejecutar enforce en esta revisión. No activar cancelPassed inicialmente: medirlo en brazo separado.

En AutoResponder reemplazar **solo la URL exacta del bundle Intext efectivamente cargado** por la copia correspondiente, una sola distribución/instancia. No sustituir migrate/PSP/GAMExp/GPT/Prebid/APS ni VAST/MP4. Nuevo documento, comprobar cuerpo rotulado QA y hash, evitar caché/304. Comparar runtime, dual/PSP, randomSource/random1–4, networkId/adUnit/tag/t/HB/mode con el control; si cambian, no se aísla este experimento.

Exportar el JSON del debugger original y además el probe, con DevTools `copy(JSON.stringify({qaOnly:true,stats:IntextP13C.stats(),logs:IntextP13C.entries},null,2))`. Guardar consola completa y HAR/SAZ con contenido/XML de VAST, wrappers y MP4. No se incorporan los logs QA al debugger productivo automáticamente. Verificar que los cuerpos existen en el archivo. Al terminar, `IntextP13C.dispose()` retira listeners, timers y observers propios; no destruye anuncios vigentes como acción diagnóstica. La navegación/destroy normal limpia cada creative. Guardar datos antes de disponer.

Matriz: desktop/mobile control observe; móvil shadow10/shadow12; watchdog shadow con umbrales separados; solo después enforce QA. Por cada brazo: éxito, 1005, manager sin preroll, salida antes de manager, salida entre manager/frame, reentrada, documento oculto, refresh/SPAs, destroy y late callbacks. Ambos slots en vídeo si la configuración QA autorizada lo permite; mantener Slot 2 display_only por defecto. No forzar fill ni duplicar requests para fabricar estados.

Aceptación antes de producción: explicar el estado 10:29 con nuevas trazas; no cortar antes de impresión un anuncio ya iniciado; cero tracking/impression/play/reveal tardío tras cancelación; fallback solo según modo; Display no abierto fuera de elegibilidad; sin dos superficies/loaders; refresh y recuperación intactos. Comparar API/HTTP request counts por token. Los tests mock no sustituyen estas comprobaciones.

## Alternativa comercial móvil (solo propuesta)

Comparar Slot 1 auto vídeo+fallback frente a display_only mediante la configuración ya existente, en cohortes autorizadas y estables, estratificadas por noticia/dispositivo/contexto PSP. No se modifica ningún config ni random publicitario en este ticket. Hacer este ensayo separado del experimento técnico de deadlines para no mezclar efectos.

Denominador: mil oportunidades elegibles de Slot 1, incluyendo no-fill, abandono y cancelación; refrescos como oportunidades separadas etiquetadas. Ingresos netos reales de GAM por mil oportunidades (no CPM de bid como ingreso), fill por formato, impresiones totales/vídeo perdidas, Active View sobre impresiones medibles, tiempo hasta impresión/reveal, oportunidades perdidas por scroll, fallback/errores y coste de red/CPU. Reportar distribuciones p50/p75/p95, intervalos de confianza y mezcla de campañas/demanda. No afirmar que Display gana monetización por servir antes ni que un wrapper visible equivale a impresión.

## Validación local y límites de entrega

Baseline comprobado: **1081/1081**. Regresiones nuevas: **38/38**; vídeo/preload/PiP/animación/predictive/debug **526/526**; suite completa **1119/1119**, sin omitidos/cancelados/fallos. Floor Authority **86/86**, Prebid audit/aliases **85/85**, Random/runtime **61/61**, APS/TAM **63/63**, GPT/PSP **17/17**.

Los nuevos tests cubren deadlines 10/12 s, shadow/observe, desktop/dispositivo desconocido, watchdog/readyforpreroll, impresión/STARTED/adstart, cancelación cuando pasa el anchor, first-frame/terminal/cleanup/token, drift, SDK error 1005/inner, API listener no disponible sin romper playback, delegación sin suscribirse a la Promise original, constructor de ambas copias QA, schemas y HAR. Cuatro pruebas usan el método requestWinner y settle/destroy del core actual con SDK mock para verificar fallback autorizado/prohibido y bloqueo de callbacks tardíos.

Ejecución: `node --test --test-isolation=none tests/intext-p13c-latency.audit.test.cjs`; suite/grupos mediante `node --require "$env:TEMP/intext-authority-test-command-cache.cjs" --test --test-isolation=none ...`. Se usa el adaptador externo ya establecido para spawn EPERM: comprueba hashes y reproduce únicamente git-root/git-diff-name y sintaxis realmente ejecutados desde PowerShell. No reemplaza tests ni valida SDK. El baseline floor sigue siendo `$env:TEMP/intext-authority-head.js`.

`node --check` pasó en ambas distribuciones productivas, los cuatro módulos QA nuevos, el test nuevo y las dos copias generadas. `git diff --check` pasó. Los hashes productivos coinciden con las copias capturadas al iniciar P1.3c: **cero cambios productivos nuevos**, incluidos monetización, lifecycle, timeout, Floor Authority, PSP, random, first-frame/reveal, PiP, animación y Display. Los cambios anteriores sin commit siguen preservados.

Artefactos: `intext-p13c-qa.patch` (solo archivos nuevos QA/tests/documentación), `intext-p13c-real-evidence.json` (extracción verificable de siete originales) e `intext-p13c-validation.txt` (stdout de la suite y resultados). Las copias generated se reconstruyen con los comandos anteriores. CodeMemory consultado y reindexado, sin artefacto persistente en el repo; el código/dumps/tests/diff son la fuente de verdad.

Se analizaron capturas reales existentes; **no se ejecutó una nueva sesión Chrome/SDK con el probe ni con enforce**. No hay herramienta de navegador disponible en esta sesión. La causa residual 10:29, las fases HTTP 1005 del 19/10 y la pérdida de impresiones válidas por deadlines siguen pendientes de la matriz real. No hay aprobación productiva ni afirmación de mejora de viewability.
