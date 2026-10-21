# P1.3b — propuesta local conservadora, pendiente de prueba real en Marca

Versión conservada: `2026.10.07-p1-ima-preload-first-frame`. Identificar esta propuesta por el diff y el SHA256 del bundle, no solo por su versión. No commit, push ni despliegue.

## Evidencia real recibida y causa

La evidencia de Chrome/HAR confirmada por el usuario discrimina el lifecycle:

| Variante | Orden | Resultado real comunicado |
|---|---|---|
| A | Video.js/loadstart en prepare; IMA posteriormente | Error de inicialización tardía de contrib-ads, AdsManager + adsready, sin readyforpreroll/frame, timeout |
| B | Dependencias antes; Video.js + IMA consecutivos en activate | readyforpreroll, adstart, frame/reveal, impresión, STARTED y COMPLETE; vídeo visible |
| C | Video.js + IMA en prepare con gate QA | Completa; requiere monkey patches globales, no se adopta |

El problema demostrado en A es inicializar contrib-ads después del loadstart inicial. [La documentación oficial](https://videojs.github.io/videojs-contrib-ads/integrator/getting-started.html) exige inicialización inmediatamente después de Video.js en el mismo tick y explica que perder loadstart rompe el lifecycle. Esta causa ya no se atribuye a recovery P1.2b, demanda vacía o falta de AdsManager. Los ficheros originales no están en este workspace: la evidencia real anterior es la reportada por el usuario; los tests y el diff de esta propuesta sí se verifican localmente.

HAR comunicado: A recibe VAST 200 pero no MP4; B/C reciben VAST 200 y MP4 206. C solicita VAST después de activar. B VAST=233 ms. C total=4209 ms, blocked=4073 ms y wait≈92 ms; el total incluye otras fases. Hay otra solicitud con blocked≈4 s sin JSON asociado: no atribuir ese bloqueo exclusivamente a C ni confundirlo con tiempo de GAM/IMA. Faltan cuerpos XML de las tres respuestas principales; no afirmar identidad de creatividad, validación completa de wrappers ni causalidad comercial a partir del 200.

## Diff productivo y orden nuevo

Solo se modifica IntextVideoCreative en ambas distribuciones:

1. preparePlayer asegura las dependencias compartidas y valida lifecycle. No crea video/source/Video.js ni IMA. Mantiene _prepared, ownership, leases y scheduler actuales. video_prepare_ready añade preparationStage=dependencies y playerCreated=false: ya no debe interpretarse como player construido.
2. activate espera exactamente el gate vigente de viewport/documento/token. Tras transferir ownership, createPlayerForActivation ejecuta createVideoElement, initVideoJS, el loader interno oculto existente y attachPlayerEvents. No hay await entre estos pasos y requestAds.
3. requestAds inicializa player.ima(options) en esa misma llamada síncrona, sin esperar previamente player.ready. El plugin sigue siendo quien inicializa contrib-ads: no se añade player.ads ni AdsManager.start. Esto evita dejar pasar el loadstart inicial durante standby o mientras se espera la callback de readiness.
4. Native listeners se conservan. Solo initializeAdDisplayContainer y el único player.play esperan player.ready; se usa su opción sync cuando ya está ready. El callback vuelve a validar token, abort/destroy/terminal y viewport/documento, y rechaza coherentemente si perdió elegibilidad. Sus errores se registran y liquidan la Promise, sin retries automáticos.
5. Se conserva requestAds→SDK→first-frame→reveal, animación, PiP y recovery. Timeout publicitario=25000 ms; IMA/preroll/postroll=30000 ms; dependencias=10000 ms; fallback native compatible=500 ms. No cambia adsRenderingSettings.enablePreloading ni ningún valor comercial.

La fuente dummy data:video/mp4 y sus bytes no cambian. Se sigue asignando mediante el source nativo de createVideoElement, pero ahora solo durante activación, inmediatamente antes de crear Video.js e inicializar IMA en el mismo turno. No se añade player.src, load(), fuente remota, reproducción oculta ni evento loadstart artificial. La creación del player puede ser síncrona mientras la tech queda ready después: por eso IMA se inicializa primero y play sigue esperando readiness. El test modela un loadstart en el siguiente turno y readiness diferida; verificar además el orden real en Chrome/Marca.

El nuevo evento normalizado video_player_prepared mide duración desde el comienzo de construcción hasta que retorna player.ima; no significa VAST recibido, AdsManager disponible, anuncio listo ni primer frame. Separar dependencias listas, player/plugin inicializados, readiness, request real, network blocked/wait, SDK y frame.

## Tests y alcance de su evidencia

30 regresiones nuevas en intext-p13b-lifecycle.audit.test.cjs: las dos distribuciones y slots 1/2 con standby 0/7/20/45 s; ningún player/source/IMA/play durante standby; inicialización antes de loadstart mock incluso con readiness tardía; un init, initializeAdDisplayContainer y play; tag intacto; destroy/abort/token/documento oculto/salida antes de readiness bloquean playback; fallo síncrono del plugin rechaza inmediatamente; cleanup; captura de stack QA sin suprimir errores. El control C histórico rechaza explícitamente el core nuevo, que ya no prepara un player, antes de tocar los globals del SDK; requiere su source archivado para reproducir aquel ensayo.

Las pruebas predictive existentes se mantienen y se actualizan al contrato nuevo: standby conserva recursos/ownership/dependencias pero no players. Se conservan las regresiones de leases 20/45 s, refresh, destrucción, multi-slot, P1.2b recovery, fallback auto/video_only, first-frame, PiP y animación. La disposición defensiva de recursos adjuntos se sigue comprobando aunque standby ya no los construya. No se elimina ningún test.

Los tests usan dobles del SDK y eventos nativos modelados; no demuestran MP4 real, impresión, autoplay móvil, fill o viewability. La prueba anterior B es real, pero todavía **no valida este nuevo bundle**.

## suppressedTracks: investigación secundaria sin parchear el SDK

El TypeError aparece en B y C, ambos con COMPLETE. No se atribuye al gate C ni se considera causa de que A no arranque. Se añade únicamente al laboratorio captura window.error/unhandledrejection con stack completo, timestamp, source/line/column, estado del player/medio, disposed y presencia observada de player.ads.snapshot. No preventDefault ni modificación de handlers/SDK para ocultarlo.

El [source upstream de contrib-ads](https://raw.githubusercontent.com/videojs/videojs-contrib-ads/main/src/snapshot.js) contiene restorePlayerSnapshot leyendo snapshotObject.suppressedTracks a partir de player.ads.snapshot. Es una pista verificable para inspeccionar restauración del contenido/fin de ad-break, **no un diagnóstico del SDK exacto 6.9.0 cargado en el ensayo**; ese source exacto no pudo recuperarse aquí. Una pila que termine en ese acceso, con snapshot null, permitiría investigar quién lo elimina y si hay restore duplicado, cierre/dispose o transición de fuente. No se alteran snapshot, restore, dummy ni versiones por esta hipótesis.

Recoger el stack completo con DevTools Preserve log y Pause on exceptions (incluidas caught en un ensayo separado); conservar la versión/URL y copia de los JS realmente cargados. Correlacionar error con adend/ALL_ADS_COMPLETED/COMPLETE, dispose, cambio de fuente, media identity y player.ads state/snapshot. Comprobar si impide finalizar, cleanup, refresh Display o el siguiente ciclo. COMPLETE prueba que no bloqueó aquel playback, pero no descarta daños posteriores. El error sigue pendiente y visible.

El listener QA guarda la pila si el navegador la expone. Si un error cross-origin aparece como Script error con error/stack null, conserva ese desconocido y recoge la pila desde DevTools; no se cambia crossorigin ni el loader productivo para este diagnóstico.

## Validación Fiddler sobre la noticia real de Marca

1. Usar la misma noticia, navegador/dispositivo, consentimiento, campaña fija y configuración que el ensayo baseline. Guardar un dump y HAR/SAZ sin sustitución nueva, y otro del Fiddler baseline P1 actual si procede. No mezclar contextos PSP/dual/random diferentes para atribuir el resultado solo al player.
2. Capturar en Fiddler la URL exacta del **bundle Intext que efectivamente ejecuta esa noticia**. Añadir una única regla AutoResponder para esa URL/session y asignarle el fichero local correspondiente: _gam_kv_.js si la noticia usa esa distribución; IntextManager.js si usa la standalone. No cargar ambos ni inyectar un segundo bootstrap. No usar wildcard de todos los JS del dominio. Las URLs reales no se han inventado aquí: copiar la session de la captura.
3. Mantener pass-through de las demás requests. No interceptar migrate.js, PSP, GPT, Prebid, APS/TAM, GAM/VAST/MP4 ni targeting/configs/random. No cargar los módulos QA lifecycle C en la noticia. Si Fiddler ya aplica otras sustituciones, desactivarlas para una prueba comparable o documentarlas explícitamente.
4. Abrir documento nuevo/recargar con caché desactivada para comprobar que se descarga el fichero local, no una respuesta 304 o Service Worker antigua. En Network/Sources verificar el cuerpo y SHA256, y que contiene Initializing IMA immediately after Video.js. No usar la versión como prueba suficiente: permanece igual.
5. Comparar dumps antes/después: PSP, dualMode, randomSource/random1–4, networkId, adUnit, p, tag/t, HB, source/adsResponse y mode deben proceder de las mismas autoridades. Si cambian, el ensayo no aísla esta corrección. Las diferencias previas producción/PSP y la ausencia tag/t no se corrigen en este ticket. Mantener GPT/Prebid/APS del sitio intactos y comprobar que no hay otro bootstrap Intext.
6. Slot 1 auto/campaña fija: detenerse cerca pero fuera del gate, dejar preparar dependencias y esperar 0/7/20/45 s con winner/ciclo todavía válidos. Observar que no hay video/player/IMA/VAST/impresión antes de activate. Entrar y comprobar creación Video.js→IMA→loadstart, ads-request→AdsManager/adsready→readyforpreroll→adstart/STARTED→frame→reveal→COMPLETE. No usar el harness QA aislado como sustituto de esta prueba de la noticia.
7. Repetir mobile real/emulado y desktop, salida/reentrada antes del frame y después del frame, documento oculto, refresh/navegación/destroy. Verificar un solo player/request/reveal por token. Ante error verdadero, auto debe conservar el fallback Display y su único loader Recuperando anuncio; video_only conserva su política sin Display. Display directo/Slot 2 deben permanecer intactos. No forzar un error manipulando decisiones económicas de producción.
8. Exportar JSON/debug completo, consola con stacks, HAR **con contenido**, SAZ y screenshots/grabación del reveal. En Fiddler guardar también los bodies raw/XML de VAST y wrappers; verificar que realmente están en la exportación (el HAR anterior no los tenía). Conservar headers/status/timings/AdId/CreativeId y MP4 206. Sanitizar únicamente una copia compartible; conservar evidencia original autorizada local.

Métricas comparables: fetch→winner; winner→dependencies-ready; activation→player/plugin-prepared; plugin→request real; VAST blocked/dns/connect/ssl/send/wait/receive por separado; request→AdsManager; adsready→readyforpreroll; STARTED→frame; frame→reveal; error→fallback request→GAM render→Display open. Registrar distancia/readiness/visibilidad y contexto comercial. No equiparar DOM/readiness con Active View.

## B conservadora frente a una preparación anticipada futura

B elimina el standby de una instancia Video.js todavía sin plugin y evita el coste de instancias innecesarias; conserva la descarga compartida anticipada de CSS/JS. El coste de construir el player pasa a activation, sin awaits nuevos hasta inicializar IMA. Hay que medirlo en el nuevo bundle: no se afirma ahorro de ms ni mejora de viewability por los mocks.

Una solución anticipada futura necesitaría inicializar el plugin y contrib-ads junto al player, con una API soportada y verificada en la versión real que separe inicialización de request/playback. Requeriría validar side effects, ownership por slot, standby, expiración y teardown sin interceptar prototipos/globales ni suprimir eventos. No se implementa ni se adopta C. No se introducen etapas timeout nuevas, retries, VAST prefetch ni cambios económicos.

## Cierre de revisión

Esta es una propuesta local. La aprobación productiva sigue bloqueada por la prueba real del nuevo bundle en Marca y por la evaluación del impacto posterior de suppressedTracks. No dar por reproducido localmente lo comunicado en los tres JSON/HAR, ni por validado el SDK real por haber pasado la suite.

## Resultados locales y evidencia de scope

Baseline comprobado antes de editar: **1051/1051**. Suite final: **1081/1081**, sin fallos/omitidos/cancelados. Grupo vídeo/preload/PiP/animación/predictive/debug/P1.3: **488/488**. Floor Authority **86/86**; Prebid audit/aliases **85/85**; Random/runtime **61/61**; APS/TAM **63/63**; GPT/PSP **17/17**.

Comandos ejecutados: `node --test --test-isolation=none tests/intext-p13b-lifecycle.audit.test.cjs`, grupos con los ficheros P1.3/P1.3a/P1.3b, predictive-readiness, ima-preload-first-frame, pip, initial-open-animation y debugger; floor-authority; prebid-floor/prebid-aliases; random-runtime; aps-display-slot/prebid-aps-psp; gpt-psp/gpt-controls; suite `node --require <adaptador externo existente> --test --test-isolation=none tests/*.test.cjs`. Se conserva el procedimiento del proyecto para spawn EPERM: adaptador temporal que comprueba hashes de la evidencia de sintaxis ejecutada realmente por PowerShell y reproduce exclusivamente esos checks git/sintaxis, no los tests. El baseline floor se toma de `$env:TEMP/intext-authority-head.js`.

`node --check` pasó en ambas distribuciones y los ficheros JS/CJS modificados de QA y tests. `git diff --check` pasó. Patch productivo `docs/intext-p13b-core.patch` generado contra las copias al inicio de P1.3b y verificado con `git apply --reverse --check --directory=src/pro`.

Audit binario: todos los bytes anteriores y posteriores a IntextVideoCreative en `_gam_kv_.js` permanecen idénticos al inicio. En IntextManager.js, todo lo anterior a esta clase permanece idéntico y esta es la última clase hasta EOF. El diff solo toca preparePlayer, el nuevo createPlayerForActivation, activate y requestAds. Los métodos de fuente dummy, recovery, first-frame, PiP y scheduler no se modifican. Cero cambios nuevos en GAMExp, WindowArray, Floor Authority, PSP, Prebid, APS/TAM, targeting, random o waterfall; se preservan cambios anteriores que ya estaban sin commit. Las distribuciones mantienen paridad y la suite incluye la comprobación vigente de paridad.

SHA256 de los artefactos propuestos:

| Distribución | SHA256 |
|---|---|
| `_gam_kv_.js` | `1CDE1CCDC962C07D5833DC9691A3BFE31B7DD74B3E649E89153A240940A06690` |
| `IntextManager.js` | `BA832DC0EB3C0F6E1070A515FAC09DD31467E2C7A5A64A18FF4E4F4C063FEAD8` |

CodeMemory consultado antes de editar y reindexado; la búsqueda devuelve createPlayerForActivation en las dos distribuciones. El grafo no sustituye la comparación binaria, el diff ni los tests. No hay prueba SDK real del nuevo bundle ejecutada aquí; queda pendiente el checklist Marca anterior.
