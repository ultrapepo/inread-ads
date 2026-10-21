# P1.3c — Revisión R2 y ensayos separados

Sin cambios de producción o del probe R1. Sin enforce, commit, push ni despliegue. P1.3c sigue abierta. No se adopta una nueva fase ni se sustituye el dummy comercial.

## Fe de erratas PSP

Se corrigió `intext-p13c-r2-analysis.md`. En los siete originales se vuelven a comprobar todos los campos dualMode, pspDetected y randomSource encontrados: únicamente **false, false y gexp-owner-random**, respectivamente. Los cinco warnings desktop son de GAM tradicional, sin PSP. El sexto warning es móvil. PBJS targeting presente/node.slot no disponible permanece como conclusión; no demuestra pérdida en PSP. Falta una captura PSP con HTTP de la misma auction/slot/ciclo para validar esa ruta.

## 1. Laboratorio dummy: preparado y reproducible; ejecución de media pendiente

La página `intext-p13c-dummy.html` y su servidor solo cargan cuatro recursos locales: HTML, harness, fixtures y Video.js **7.20.3**. No importan Intext, IMA, contrib-ads, GPT, GAM, VAST ni tracking. CSP bloquea conexiones, frames y recursos externos. Ambos medios se prueban como data:video/mp4 para mantener igual el transporte.

Assets extraídos sin nuevos requests, desde `www.marca.com-observe.har`:

| Asset | Evidencia |
|---|---|
| Dummy actual | 807 bytes; SHA256 6231a292d2b2202abe7ef00697d2172b1c2b67e26c231b3bb4e529e983cdb52b |
| Control MP4 | 498319 bytes; SHA256 2318ffdb44aa3c48b91ba4fb8c161b9ba8c25be6a6f7979499c6ff51aed0dc1e |
| Integridad control | HAR #387, Content-Range bytes 0-498318/498319; cuerpo completo decodificado, sin recortes; ftyp(24), moov(4248) con trak, mdat(494047), sin cajas fuera de rango |
| Video.js | cuerpo 7.20.3 del HAR; SHA256 46763816babdcf547c1cbedf9a54a7295648cbc1ae648f5620c8e11264b01fcc |

El control contiene el clip del inventario autorizado capturado en el HAR, pero aquí son solo bytes locales: no hay SDK, tags o solicitudes a la campaña. La validación estructural/rango está completada; **no se confunde con reproducción directa validada en HTMLVideoElement/Video.js**.

Cuatro casos: native/dummy, native/control, Video.js/dummy, Video.js/control. Cada caso hace primer play, espera ended/error/rechazo, segundo play del mismo medio y dispose. El control se reposiciona a 0 al acabar; no se recarga la fuente rota para ocultar su error. Se registran loadstart, loadedmetadata, loadeddata, canplay, play/playing/pause, ended, error, abort, emptied, stalled/waiting y primera timeupdate por intento. Snapshot incluye **HTMLMediaError.code y message**, ready/networkState, currentTime, dimensiones, paused/ended. Se conserva el rechazo de Promise separado del evento error. Video.js dispose comprueba isDisposed y su registro de player; native limpia fuente/listeners y retira el nodo.

Cada intento tiene un límite de laboratorio de 15 s para terminar el ensayo si no llega una señal. Este límite **no pertenece a Intext/IMA** ni cambia ninguno de sus timeouts. El JSON diferencia timeout, reproducción terminada y play rechazado; no convierte todos los errores en éxito.

Comandos:

```powershell
node tests/qa/intext-p13c-dummy-lab.cjs prepare
node tests/qa/intext-p13c-dummy-lab.cjs serve
# En Chrome normal: http://127.0.0.1:8134
```

Pulsar «Ejecutar los cuatro casos», conservar la pestaña visible y guardar JSON con el botón. Alternativamente: `copy(JSON.stringify(IntextDummyLab.result,null,2))`. No cambiar permisos/autoplay ni usar flags que alteren el comportamiento. Son medios muted/playsinline. El JSON declara `controlValidated=true` solo si ambos motores completan los dos plays del control con dimensiones válidas y sin media error. Un NotAllowedError no valida ni invalida un códec.

**Resultado obtenido en esta sesión:** preparación/integridad de assets y HTTP/CSP de las cuatro rutas: PASS. Se intentó Chrome headless con perfil de laboratorio separado; el proceso terminó **antes de cargar la página** con `mojo platform_channel.cc:112 Access denied (0x5)` y error crashpad CreateFile. Por tanto, **0 casos de media ejecutados; playback del control y dispose en navegador pendientes**. No se intentan variantes que eludan ese bloqueo ni se informa un resultado mock como reproducción real. Ver `intext-p13c-isolated-assets.json`.

Si el navegador confirma que el dummy falla y el control reproduce/repite correctamente, la siguiente propuesta será una **copia QA independiente que cambie únicamente la fuente dummy**, conservando lifecycle y todos los demás ajustes. El clip de control no se propone automáticamente como dummy comercial: primero deben decidirse asset mínimo adecuado, duración/codec/licencia/tamaño, snapshot/segundos ciclos y coste. No se genera esa copia antes del contraste aislado.

## 2. Control manual: copia QA separada, compatibilidad real aún no verificada

No se ha ejecutado un nuevo request GAM. Se solicitó acceso a una pestaña Chrome de QA/CDP en el artículo autorizado; no hay sesión conectada disponible para esta ejecución. No se trasplanta un tag viejo del HAR a un origen local ni se ejecutan anuncios en Chrome headless para aparentar una prueba de viewability.

La revisión estática del JS **videojs-ima 1.11.0 capturado** permite preparar el ensayo, no afirmar su compatibilidad:

- `onAdsManagerLoaded` obtiene el manager y emite ads-manager; con autoPlayAdBreaks=false llama initAdsManager.
- `onPlayerReadyForPreroll` no llama start si autoPlayAdBreaks=false.
- `setAdBreakReadyListener` y `playAdBreak` son las APIs públicas documentadas; playAdBreak es quien solicita start en modo manual.
- Ninguna de estas propiedades demuestra que el **VAST concreto** emita AD_BREAK_READY. El probe R1 de las siete sesiones no estaba suscrito a ese evento; su ausencia en esos exports tampoco demuestra que no exista.

Referencia: [videojs-ima](https://github.com/googleads/videojs-ima), [control de ad breaks IMA](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/ad-rules?hl=en). La documentación describe VMAP/ad rules; no se extrapola a todos los VAST/VPAID.

`intext-p13c-manual-build.cjs` genera nombres nuevos; no sobrescribe bundles ni las copias observe/shadow R1. Conserva el probe R1 sin editarlo, en mode=observe. Única variable de reproducción del ensayo: autoPlayAdBreaks=false y conducción mediante su API pública. No usa el gate global de Lifecycle C, no parchea AdsLoader/AdsManager.prototype ni llama player.ads o manager.start directamente.

El controlador exige **las dos señales reales** de break-ready (callback del plugin y evento nativo del manager actual), readyforpreroll, suscripciones aceptadas, estado público de espera, documento visible, viewport elegible, token/manager vigentes y ninguna señal previa STARTED/IMPRESSION. Solo entonces puede llamar una vez a playAdBreak. Guardar readiness no inicia nada al estar fuera de viewport; scroll/reentrada vuelve a comprobarla. Un retorno undefined no confirma playback. Fallo de API o cambio de manager no provoca retry. Terminales/destroy retiran listeners y bloquean callbacks tardíos; el timeout original de **25 s** se conserva y liquida por el core/fallback ya existente.

```powershell
node tests/qa/intext-p13c-manual-build.cjs _gam_kv_.js
node tests/qa/intext-p13c-manual-build.cjs IntextManager.js
node --check tests/qa/generated/intext-manual-gam.qa.js
node --check tests/qa/generated/intext-manual-manager.qa.js
```

En Fiddler usar solo `intext-manual-gam.qa.js` o `intext-manual-manager.qa.js`, según el bundle realmente cargado, como **brazo separado**. No sustituir GPT/Prebid/APS/PSP, targeting, URL VAST, MP4 ni SDK. La petición debe proceder de la activación normal de ese documento en el artículo autorizado. No mezclar este ensayo con cambio de dummy o deadlines.

| Pregunta | Evidencia requerida en la prueba real | Estado actual |
|---|---|---|
| ¿Llega AdsManager con false? | qa_manual_manager_loaded y evento original ads-manager | pendiente |
| ¿Ese VAST emite AD_BREAK_READY? | qa_manual_plugin_break_ready + qa_manual_native_break_ready del mismo manager | pendiente |
| ¿Se retiene el único inicio? | sin manager.start/STARTED/IMPRESSION mientras ineligible, request único, FSM pública de espera | pendiente |
| ¿Funciona reentrada antes de empezar? | readiness guardada → eligible → un qa_manual_start_requested → frame/IMPRESSION/COMPLETE | pendiente |
| ¿Respeta 25 s sin duplicación? | ready fuera de viewport hasta timeout → cleanup/fallback original; callback tardío no inicia | guards probados con mocks; SDK real pendiente |

Si llega AdsManager/preroll pero **no AD_BREAK_READY** hasta el terminal del ciclo, el controlador no llama playAdBreak ni inventa eventos. Conservar JSON/HAR y clasificar «ruta manual no utilizable en este ensayo/formato con las señales observadas»; distinguirlo de no-fill/error que impida llegar siquiera al manager. No generalizar un fallo aislado a todo VAST, ni usar manager-loaded o un temporizador como señal alternativa de arranque. Detener ese brazo y volver al control.

Los JSON del probe se exportan como antes: `copy(JSON.stringify({stats:IntextP13C.stats(),logs:IntextP13C.entries},null,2))`. Los nuevos eventos empiezan por qa_manual_. Registrar además debugger, consola, HAR/SAZ con XML y todos los wrappers/MP4. Si esos cuerpos no están, no declarar verificada la creatividad/cadena.

## 3. Cancelación preimpresión: garantías que faltan

La [definición pública de ad mode](https://videojs.github.io/videojs-contrib-ads/integrator/ad-mode.html) incluye espera y reanudación; no equivale a anuncio reproduciéndose. Las APIs públicas isWaitingForAdBreak, inAdBreak e isContentResuming permiten **clasificar**, pero no garantizan cancelar una request ni impedir tracking del SDK.

| Situación | Señales públicas útiles | Qué puede afirmarse / qué falta |
|---|---|---|
| Request pendiente, sin manager | ads-loader, ads-request, waiting=true, inAdBreak=false | Demanda en curso; sin contrato demostrado para abortarla sin callbacks/tracking tardíos |
| Manager preparado, sin start propio | ads-manager, AD_BREAK_READY si existe, waiting, ownership | Posible espera controlada si la ruta manual se valida; en auto=true el plugin todavía puede iniciar automáticamente |
| start solicitado, aún sin STARTED/IMPRESSION | registro del único inicio y eventos nativos | El inicio ya es posible/asíncrono: ausencia de eventos no prueba preimpresión |
| STARTED/frame/IMPRESSION | señales positivas | No tratarlo como pendiente preimpresión ni cancelar para mejorar números; conservar pausa/recovery |
| COMPLETE y content-resuming | COMPLETE, isContentResuming | No volver a clasificarlo como espera inicial por isInAdMode=true |
| Ownership/suscripción ambiguos | manager distinto, APIs ausentes, gaps | Estado desconocido: fail-closed |

En M-S2, waiting podría explicar isInAdMode=true antes de AdsManager, pero R1 no registró las otras tres APIs: **no se inventan sus valores retroactivos**. Se mantiene outsideAdMode del probe R1. El ensayo manual lo que investiga es prevención de inicio tardío, no una excepción de cancelación.

Para diseñar después una cancelación de pending harían falta: ownership de AdsLoader/request/manager por token, impedir de forma soportada todo inicio automático tardío, cierre idempotente de la integración, cobertura continua desde antes de init, tratamiento de respuestas ya encoladas, prueba de ausencia de nueva actividad publicitaria tras teardown y política comercial de pérdida de vídeos válidos. [AdsLoader.destroy](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/class/google.ima.AdsLoader) documenta limpieza interna, **no una promesa de abort HTTP/preimpresión**. [AdsManager.destroy](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/interface/google.ima.AdsManager) detiene anuncios/tracking del manager, pero no revierte lo ya emitido ni sirve cuando aún no hay manager.

Seguirían sin garantía universal: requests cuyo loader no se posee, callbacks ya encolados con auto-start, una llamada start ya realizada, manager reemplazado, VPAID/JS con acciones propias, o tracking previo no observable. Quitar outsideAdMode únicamente porque waiting=true sería insuficiente. No se implementa cancelación, deadline 10/12 s ni enforce en este trabajo.

## 4. Matriz P1.3b sin probe / observe / shadow

Tres brazos de comparación, separados del manual y del dummy:

| Brazo | Bundle | Instrumentación adicional | Deadline |
|---|---|---|---|
| Control | fuentes P1.3b actuales exactas | ninguno de los probes; debugger existente igual de activado que en los demás | solo original 25 s |
| Observe | builder R1 sin tercer argumento | probe R1 original | ninguno |
| Shadow | builder R1 + config.example | mismo probe R1, presupuestos solo diagnósticos | nunca cancela |

Usar el mismo artículo, campaña y contexto; las siete sesiones de R2 son sin PSP. PSP deberá tener bloque independiente. Alternar brazos externamente, sin cambiar random, floors, bidders, consentimiento, network/adUnit/tag/t ni reglas comerciales. Separar desktop/mobile real/emulado, caché fría/caliente, visibilidad, ancho de banda y creatividad/demanda. Registrar los cambios reales de respuesta, no forzar igual fill.

Secuencias repetibles: permanecer visible; salir antes de manager; salir entre manager/frame; volver antes de 25 s; no volver; ocultar documento y volver; completar y observar segundo ciclo. Registrar tiempos y scroll/distance del anchor y wrapper separados. No asignar Slot 1/2 a reglas nuevas.

Medir request proxy→manager, HTTP start→respuesta/wrappers, manager→frame, frame→reveal y apertura efectiva, errores base/ad y sus códigos, impresiones anteriores al reveal, requests VAST/MP4/impresión por token y terminal→Display. En **control sin probe**, IMPRESSION nativo puede no estar instrumentado: usar HTTP de tracking enlazado mediante XML del mismo anuncio, nunca un píxel de otra posición. Si no hay XML/correlación suficiente, dejar ese campo desconocido en vez de añadir un listener al brazo «sin probe».

observerBuildMs solo existe en brazos con probe y no mide todo su coste. Capturar Performance trace con ajustes iguales en todos los brazos para scripting/layout/long tasks y distinguir descarga de ejecución de JS. No mezclar el tiempo blocked HAR con wait ni con coste del observer. Informar dispersión y mezcla de creatividades, no inferir mejora de sesiones aisladas. La viabilidad del control manual exige después su propio brazo y muestras.

## Validación y alcance

19 tests nuevos verifican únicamente guards del **harness QA** con SDK simulado: señales reales separadas, ausencia de AD_BREAK_READY sin fallback sintético, reentrada, hidden, token/abort, impresión inesperada, manager cambiado, listener fallido, API void/throw, terminales y ambas distribuciones derivadas. No prueban que GAM real emita la señal ni decodificación de media.

Los 1174 tests previos se mantienen. Suite final: **1193/1193**, sin omitidos; sintaxis, diff-check y reverse-check R1 verificados. Resultados en `intext-p13c-isolated-validation.txt`. Las comprobaciones de subprocesses usan el adaptador externo ya establecido con evidencias/hashes, sin sustituir tests.

Ejecución: `node --require <adaptador de entorno temporal> --test --test-isolation=none tests/*.test.cjs`, con `INTEXT_FLOOR_AUDIT_BASELINE` y el adaptador de comandos externos del proyecto. Este último cubre exclusivamente los subprocesses de comprobación bloqueados en el sandbox (Git y sintaxis), contrastados externamente; no simula IMA ni sustituye los 1193 tests. Resultado: 1193 pass, 0 fail/cancelled/skipped/todo, 17003.774 ms. También se ejecutaron `node --check` directamente sobre los dos bundles comerciales, cuatro scripts del laboratorio/controlador/build, el nuevo test y las dos copias manuales generadas.

CodeMemory se consultó y reindexó al finalizar (modo fast, sin escribir artefactos). La consulta del nuevo helper attach por archivo sigue devolviendo cero nodos: el grafo no refleja todos los helpers actuales. Código, hashes y pruebas del workspace conservan la autoridad; no se presenta el índice como validación del ensayo.

Hashes P1.3b conservados: `_gam_kv_.js` 1CDE1CCDC962C07D5833DC9691A3BFE31B7DD74B3E649E89153A240940A06690; `IntextManager.js` BA832DC0EB3C0F6E1070A515FAC09DD31467E2C7A5A64A18FF4E4F4C063FEAD8. Reverse-check del parche R1 sigue pasando: probe/builder originales intactos. Solo se añaden laboratorio/controlador/build QA separados, sus tests y documentación, y se corrige la referencia PSP del informe. Assets/profile locales están ignorados por Git.

**No hay cambio comercial propuesto como viable todavía.** Dummy playback y compatibilidad AD_BREAK_READY con la campaña real quedan pendientes de navegador; el rechazo de ejecución local no se presenta como resultado funcional. Los nuevos mocks no cierran esos pendientes. Tampoco se cierra 10:29 ni se declara mejora de viewability.
