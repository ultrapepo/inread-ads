# P1.3c — Integración del dummy y diagnóstico mobile

Estado: **abierta; integración comercial pendiente**. Investigación offline de seis sesiones reales del 20/10/2026 y propuesta de observación QA. No se ha ejecutado una nueva sesión Chrome/IMA en este trabajo. No hay autorización de producción ni enforce.

## Evidencia y alcance

Se correlacionaron los seis debugger JSON y sus seis HAR por reloj absoluto, posición y ciclo. Los originales son `original1-gexp…09-18-46-013Z` y `original2-gexp…09-20-54-682Z`; las variantes son `dummy-gexp…09-34-28-356Z`, `dummy2-gexp…09-36-10-731Z`, `dummy3-gexp…09-39-42-125Z` y `dummy-4gexp…09-41-27-274Z`.

[Evidencia reproducible](intext-p13c-integration-evidence.json) conserva nombres completos, SHA256 de cada entrada, hitos, geometría y fragmentos del código de las librerías capturadas. El analizador no ejecuta JavaScript del HAR. `www.marca.com-mobile 4 dummy.har` está truncado: se recuperaron **516 entradas completas**, sin reparar ni inventar el resto. Los otros cinco HAR son JSON completos. Las cinco respuestas GAM VAST identificadas tienen HTTP 200 y **carecen de XML en `response.content.text`**. No se puede reconstruir su cadena completa de wrappers.

En estas seis sesiones `dualMode=true`, `pspDetected=true`, `randomSource=gpt-native-slot-targeting`. Esto corresponde a estas capturas; no contradice las siete sesiones R2 anteriores sin PSP. Las advertencias PSP/Prebid se mantienen como investigación independiente y no explican por sí mismas un fallo de reproducción.

P1.3b conserva la versión `2026.10.07-p1-ima-preload-first-frame`. SHA256 productivos, iguales antes y después:

| Distribución | SHA256 |
|---|---|
| `_gam_kv_.js` | `1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690` |
| `IntextManager.js` | `ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8` |

El fixture QA negro sigue teniendo 7.141 bytes, 25 frames/25 fps, SHA256 `410e77398580e6b470c0f5c2297d32484cbb29b9765133f7703038fc24ed753d`. No se ha integrado en los bundles productivos. Las copias fuente-only anteriores permanecen intactas.

## A. Secuencia después del anuncio

La secuencia contractual del código es la siguiente; el orden temporal exacto entre eventos nativos y callbacks reentrantes todavía necesita la nueva captura:

```text
IMA COMPLETE
  └─ core: marca terminal y desactiva observación/recovery/PiP del anuncio
IMA CONTENT_RESUME_REQUESTED
  └─ videojs-ima.onAdBreakEnd()
       ├─ vuelve a suscribir contentended
       └─ contrib-ads.endLinearAdMode()
            ├─ emite adend de forma síncrona
            │    ├─ attachPlayerEvents(): si hubo reveal y no se manejó ya el fin
            │    │    └─ IntextNode.onVideoEnded(token)
            │    │         └─ plan existente: cerrar / bloquear / esperar tiempo visible
            │    │              └─ destroy creative → startAuction(refresh Display)
            │    └─ requestAds(): terminal; no reabre ni inicia otro fallback
            └─ restaura snapshot / puede reanudar contenido base
                 └─ posibles content* / ended y notificación del plugin al SDK
refresh autorizado
  └─ bridge conserva altura/loader → request Display → swap de superficies
```

**COMPLETE no es el disparador directo del refresh Display del core**. El callback se enlaza con `adend`; `_videoEndHandled` impide repetirlo. El refresh exitoso es distinto de un fallback por error. Sin reveal, el terminal rechaza el intento para que decida el waterfall existente. Después de reveal, el terminal no lo reclasifica como un fallo anterior a reproducción.

El HAR incluye videojs-ima **1.11.0** (SHA256 `01b11a7a6a4b771ead01e2060b8983d0b37f6f3e01a7e74f0140eb04b69459c8`) y contrib-ads **6.9.0** (`8083a510108bfa2848c613baf8f1823af26a8dab1bb0907b8b0a06aebac5f226`). En el código efectivamente capturado:

- IMA establece `restoreCustomPlaybackStateOnAdBreakComplete=true`. No es una nueva opción de este trabajo.
- `onContentResumeRequested()` llama a `controller.onAdBreakEnd()`; el wrapper termina el modo lineal si estaba activo.
- contrib-ads emite `adend` **antes** de restaurar el snapshot. En la ruta de elemento reciclado puede restaurar `src`, tiempo y ejecutar `play()`; en otra ruta también ejecuta `play()` si el contenido no está terminado. Sus promesas tienen diagnóstico de rechazo.
- El wrapper videojs-ima vuelve a instalar su listener de `contentended`. El core Intext no utiliza el `ended` genérico del contenido como disparador de refresh, reveal o fallback. El plugin sí procesa la finalización del contenido: no se puede prometer ausencia de toda actividad posterior del SDK sin observarla en navegador.
- La lectura `snapshot.suppressedTracks` existe en esa ruta de contrib-ads. Un snapshot nulo sigue siendo un riesgo secundario conocido; estas capturas no ofrecen una pila nueva que demuestre su causa. No se parchea el SDK ni se oculta su error.

**El dummy válido puede reproducirse como contenido base tras el anuncio.** Es una posibilidad demostrada por las rutas de código, no una reproducción visible probada en estas sesiones. Al desaparecer el error de decodificación anterior, esa restauración puede progresar y emitir `contentended`. Debe observarse especialmente cuando el refresh espera visibilidad o un intervalo no nulo.

En el camino normal de refresh se destruye la instancia antigua antes de la siguiente subasta y se crea otra cuando el siguiente formato lo requiere; no se reutiliza el player anterior como player de otro ciclo. Las ramas de cierre por refresh deshabilitado o máximo de ciclos cierran el contenedor, sin `activeCreative.destroy()` explícito en `onVideoEnded()`. No se corrigen aquí: hace falta comprobar su teardown efectivo en el ciclo completo. El probe dispone de stop explícito para retirar observación QA si una instancia sigue viva.

### Evidencia de bridge

Los valores siguientes son ms desde inicio del dump y corresponden al Slot 1. `video_complete` es una métrica compartida por `adend` y COMPLETE nativo: **no permite atribuir por sí sola el origen a IMA COMPLETE**.

| Sesión | adend, log player | `video_complete` | bridge conservado | swap Display | refresh Display terminado |
|---|---:|---:|---:|---:|---:|
| original1 | 45.046 | 45.050 | 45.116 | 46.001 | 46.635 |
| original2 | 41.280 | 41.282 | 41.323 | 42.160 | 42.798 |
| negro1 | 32.201 | 32.206 | 32.292 | 33.287 | 34.175 |
| negro2 | — | — | — | — | fallback abierto 21.024; refresh posterior 29.245 |
| negro3 | 29.715 | 29.717 | 29.755 | 30.384 | 31.058 |
| negro4 | 26.369 | 26.372 | 26.410 | 27.340 | 28.031 |

El log de refresh terminado es un hito del código y no demuestra una nueva impresión, Active View ni píxeles visibles. Los logs muestran un bridge por transición exitosa; no proporcionan identidad/src de todos los elementos en el intervalo adend → dispose. Ese es el hueco de integración que cubre el observador.

## B. Latencia mobile

Duraciones en ms, obtenidas de los primeros hitos de cada evento para Slot 1/ciclo 1. Las filas duplicadas del collector no se cuentan como nuevas operaciones. `ads-request` es un proxy del plugin y **no** el inicio HTTP VAST.

| Sesión | prewarm | winner→prepared | prepared→activate | activate→proxy | proxy→manager | manager→frame | activate→frame | frame→reveal |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| original1 | 8.517 | 8.602 | 78 | 287 | 10.485 | 1.076 | 11.848 | 8.526 |
| original2 | 11.423 | 11.497 | 72 | 130 | 3.433 | 887 | 4.450 | 14.402 |
| negro1 | 6.895 | 6.953 | 74 | 274 | 6.728 | 603 | 7.605 | 9 |
| negro2 | falla | falla | — | — | — | — | — | — |
| negro3 | 2.130 | 2.203 | 8.052 | 132 | 1.466 | 954 | 2.552 | 4 |
| negro4 | 3.061 | 3.186 | 75 | 166 | 4.880 | 747 | 5.793 | 6 |

`prepared` sigue significando **dependencias listas**, no Video.js/AdsManager listo: P1.3b crea Video.js e IMA juntos en activate para conservar el orden validado. `activate→proxy` tampoco mide exclusivamente inicialización: incluye trabajo síncrono posterior. Negro3 separa con claridad 8,052 s de elegibilidad de 2,552 s desde activación a frame.

| Sesión | proxy, t ms | GAM VAST HTTP, t ms | total HAR ms | blocked ms | wait ms |
|---|---:|---:|---:|---:|---:|
| original1 | 14.903 | 21.759 | 3.459 | 372 | 140 |
| original2 | 18.010 | 21.124 | 199 | 19 | 178 |
| negro1 | 14.794 | 19.215 | 646 | 168 | 224 |
| negro3 | 17.220 | 18.328 | 293 | 9 | 145 |
| negro4 | 10.369 | 14.896 | 276 | 12 | 150 |

Hay 1,1–6,9 s entre proxy y la petición GAM registrada, además del tiempo HTTP. No se atribuyen íntegramente a GAM, SDK, scheduling, consentimiento o wrappers: el proxy no delimita esas fases. Original1 incluye ~2,946 s de connect; SSL es una parte de connect y no debe sumarse otra vez. Los MP4 de otros proveedores de la página no se imputan a este Intext por compartir sesión.

### El timeout de 10 s

**Negro2 no llega a activar IMA.** A t=17.735 el core emite `video_dependency_script_timeout` para `videojs-contrib-ads.min.js`, `timeoutMs=10000`, `elapsedMs=10001`; después `video_dependency_load_timeout`, `video_prepare_failed` y fallback Display.

El HAR sitúa ese script a t=7.734, HTTP 200, total **11.096,287 ms**, de los cuales `blocked=10.275,903`, `wait=818,606`. La respuesta termina después de vencer el loader. Esto explica el fallo concreto de infraestructura; no demuestra una avería interna de contrib-ads ni falta de demanda.

El fallback de ese intento es el ciclo 2/token 2: solicitado a 17.761; `display_slot_requested` a 18.413; `slotRenderEnded` a 20.984; creative listo a 20.994; espera viewport 20.998→21.000; wrapper abierto 21.024; `display_opened` a 21.098. Son 652 ms hasta la notificación de request GPT, 2.571 ms request→render y 40 ms render→apertura. El refresh de 29.245 pertenece al ciclo 3: no se confunde con la recuperación inicial. Hay además `display_impression_viewable` a 22.112, registrado desde WindowArray; no es una medición de IMA.

Son tres mecanismos distintos, todos intactos:

1. `DEPENDENCY_SCRIPT_TIMEOUT_MS=10000`: límite por script del loader Intext.
2. contrib-ads: el código 6.9.0 declara default `timeout=5000`, pero Intext pasa a videojs-ima `timeout`, `prerollTimeout` y `postrollTimeout` de **30000**. No hay evidencia aquí de un presupuesto interno de preroll de 10 s.
3. Timeout publicitario Intext **25000**, cuando ya se ha iniciado `requestAds()`.

El loader comparte Promise, marca fallidos, libera `_dependenciesPromise` y permite un **intento posterior** que retire el script inválido; no hay retry automático infinito ni nueva subasta/VAST desde el prewarm. Si prepare/render están esperando el mismo intento, ambos pueden recibir el fallo y seguir el fallback vigente. No se amplía ningún plazo ni se añade retry en esta revisión.

## C. Frame, geometría y riesgo visual

`findAdMediaElement()` excluye `this.videoEl` y prioriza selectores de IMA; su último selector es `video`. El tiempo positivo y rVFC siguen siendo las señales aceptadas. `loadeddata`/`canplay` solos no confirman: la ruta `media-loadeddata-confirmed` comprueba `currentTime>0` (negro3: 0,00211 s). Terminal, token y ownership bloquean confirmaciones posteriores. No se ha cambiado esa lógica.

La exclusión por identidad merece comprobación si cambia el tech de Video.js o si IMA recicla un elemento: el selector genérico no aporta por sí mismo una prueba de procedencia publicitaria. Duración 10,0078 s en los frames registrados, frente al dummy negro de 1 s, es evidencia compatible con el anuncio, pero no sustituye identidad/source y eventos SDK. El observador registra esas identidades por separado y no crea métricas de primer frame.

Los originales registran frame con wrapper de altura cero y fuera de pantalla (top -267,34 y -73,14). El anchor estable se mantiene a 170 px por encima del wrapper cerrado en los snapshots adyacentes; en el original2 el anchor ya estaba completamente superado al llegar AdsManager. Reveal queda retenido 8,526 y 14,402 s. Esto demuestra frame antes de apertura; no permite contar una impresión ni atribuir viewability IMA/GAM.

Negro3 muestra por qué deben medirse ambos elementos: anchor parcialmente elegible alrededor de top 639 px, wrapper cerrado top 809,46 px, viewport de 760 px. El reveal se solicita a +4 ms del frame con esa geometría inicial; la altura final puede crecer antes de que el usuario vea el anuncio. Un `video_player_revealed` con height=0 es el snapshot síncrono al iniciar la apertura, no prueba de superficie visible ni de fallo de animación.

El control de salida actual reevalúa elegibilidad y pausa AdsManager/media según su ownership cuando dispone de APIs. Si todavía no existe AdsManager ni medio publicitario, no puede detener lo que todavía no controla. La pausa al aparecer el SDK y el callback de inicio pueden competir; retener reveal no retiene necesariamente STARTED/IMPRESSION. Estas seis capturas no tienen cobertura inequívoca de IMPRESSION; no se reutiliza como hecho de estas sesiones lo observado en Mobile shadow2 anterior.

## D. Matriz de decisión

| Hallazgo | Estado | Evidencia / dato pendiente |
|---|---|---|
| Dummy anterior corrupto; desaparece error conocido con negro | Confirmado por laboratorio/comparativa aportada | No implica aprobación del ciclo post-ad |
| Tres QA llegan al fin y bridge Display | Confirmado en debugger | Negro2 falla antes de activar IMA |
| Snapshot puede hacer play del contenido base | Confirmado en código HAR | Falta observar si progresa y resulta visible en este core |
| contentended puede procesarse por videojs-ima | Confirmado en código HAR | No se ha demostrado nuevo request/impression ni efecto comercial |
| Doble refresh por fin del dummy | No observado; protegido en core por `_videoEndHandled` | Ensayar fin base, tokens y siguiente ciclo |
| Frames del dummy considerados publicidad | No demostrado | Comparar base/tech/IMA y sources; selector final genérico merece atención |
| Error de 10 s en negro2 | Confirmado: loader de script | HAR muestra bloqueo del navegador; no es preroll interno |
| Impresión fuera del viewport en estas seis | Pendiente | Requiere listener nativo IMPRESSION efectivo e identidad de manager |
| Ausencia de errores secundarios tras COMPLETE | Pendiente | Conservar consola completa, stacks y eventos post-restauración |
| Mejora comercial/latencia atribuible al dummy | No demostrada | Sesiones con red, caché y scroll diferentes no son un A/B causal |

## E. Instrumentación QA preparada

Archivos nuevos: `tests/qa/intext-p13c-integration-probe.cjs`, `…integration-build.cjs`, `…integration-analysis.cjs` y `tests/intext-p13c-integration.audit.test.cjs`.

El builder produce **copias nuevas** originales/negras para ambas distribuciones. Mantiene intactos los bundles, las variantes fuente-only, el probe R1 y la copia manual de ad-break. Comprueba SHA de entrada, marcas únicas y sintaxis. [Manifest y hashes de salida](intext-p13c-integration-build.json). El patch QA contiene únicamente los archivos de observación, builder, análisis y tests.

Los hooks se limitan a: después de initVideoJS y antes de IMA; diagnóstico `debugVideo`; entrada `onVideoEnded`; entrada/salida de destroy y cierre de observación desde un finally QA. Son inserciones reversibles; el cuerpo original de destroy conserva sus returns y relanza la misma excepción. No se sustituyen métodos del player o SDK ni se cambia la política comercial.

El observador no envuelve player/SDK ni llama a `play`, `pause`, `src`, `load`, `start`, requestAds o setters. Escucha:

- Player: loadstart/play/playing/pause/ended, contentended/contentresumed/contentloadstart/contentloadedmetadata/contentcanplay, ads-request/ads-loader/ads-manager/adsready/readyforpreroll, adstart/ads-ad-started/adend/adended, adtimeout/nopreroll/adserror/alladscompleted y dispose.
- Cada media: loadstart, metadata/data/canplay, play/playing/pause, seeking/seeked, ended/emptied/abort/error. No llama a rVFC ni confirma frames.
- AdsManager concreto: únicamente enums realmente expuestos por `google.ima.AdEvent.Type` y `AdErrorEvent.Type`, con diagnóstico de suscripción o fallo. STARTED, COMPLETE, CONTENT_RESUME_REQUESTED e IMPRESSION quedan diferenciados del proxy del player. Un manager reemplazado pierde sus listeners; callbacks tardíos no contaminan el nuevo.
- Visibilidad del documento y cambios DOM/CSS dentro del wrapper de vídeo mediante un MutationObserver local, agrupado por microtask. No hay polling ni MutationObserver global.

Guarda identidad de player, base, tech, medio observado por core y manager; fuentes por hostname/pathname saneado e id local, sin credenciales/query/fragmento (Data URL resumida por tipo/longitud/id y blob solo por tipo/id), dimensiones/estado/error de cada medio; FSM defensiva y campos escalares de snapshot sin copiar objetos completos; superficies y readiness anchor separados. La microtask posterior ayuda a distinguir snapshot existente antes de adend y eliminado/restaurado después. Las lecturas DOM pueden forzar layout: `observerBuildMs` mide el coste de construcción de cada snapshot, no todo el overhead del navegador.

`playerBuildStartedAt` conserva el hito real existente del core. Se compara con `observer:attached` (Video.js ya creado, IMA todavía sin inicializar) y `core:video-player-prepared` (retorno de `player.ima`) para acotar la construcción técnica. Los intervalos son observación QA del mismo ciclo; no se confunden con readiness de AdsManager o con el comienzo HTTP VAST.

Cleanup en dispose, finally de destroy, pagehide o `IntextIntegrationQA.stop()`. Durante destroy, un evento dispose se registra sin cerrar prematuramente el probe, para poder observar la salida y una posible excepción posterior. `observer:closed` distingue `disposeEventObserved`, `destroyEntryObserved`, `cleanupFailures` y `sdkDestructionVerified:false`: cero observadores no demuestra destrucción del SDK. La entrada byNode solo se elimina si sigue perteneciendo al probe que cierra; una creatividad anterior no borra al nuevo propietario del mismo nodo. Las entradas obsoletas se etiquetan con token propio/activo, no autorizan ninguna acción. Registro circular de 5.000 entradas, con contador `dropped`. No captura cada timeupdate/progress para evitar spam. Si no hay dispose (por ejemplo una ruta de cierre de contenedor), usar stop tras exportar y verificar esa ruta.

La cobertura exportada separa `enumAvailable`, `subscriptionEstablished`, `subscribed` y `observed` por manager/evento. Se registran suscripciones ausentes/fallidas y managers no observados. El cierre conserva el estado de desuscripción y sus fallos; los callbacks cerrados o pertenecientes a managers sustituidos se ignoran. Un contador de eventos cero nunca se interpreta como ausencia de eventos del SDK.

## F. Siguiente prueba acotada Marca mobile

1. Generar: `node tests/qa/intext-p13c-integration-build.cjs`. Conservar también el control sin observación de `intext-p13c-dummy-source-build.cjs`.
2. Fiddler AutoResponder: reemplazar **solo la URL JS exacta realmente cargada por la página**, conservando su query y el contexto real. Usar `tests/qa/generated/intext-integration-black-gam.qa.js` si se sustituye `_gam_kv_.js`; la variante `…black-manager.qa.js` solo si esa es la distribución servida. No cargar ambos como scripts adicionales. No sustituir GPT, PSP, Prebid, APS, SDK IMA, ad tags ni reglas.
3. Primero original sin probe y negro sin probe, luego original observado y negro observado, mismo artículo/campaña, dispositivo y política de caché declarados. Repetir: permanecer visible hasta COMPLETE y 5 s después; salir antes de manager y reentrar; salir antes de frame; refresh/siguiente ciclo y navegación. Mantener los modos y políticas actuales. No forzar errores ni reproducir manualmente.
4. Console Preserve log y Network Preserve log. Recoger JSON debugger, `copy(JSON.stringify(window.IntextIntegrationQA.export(),null,2))`, consola completa con stacks, HAR con contenido y captura de pantalla/grabación alrededor de COMPLETE. Exportar antes de navegar; después `window.IntextIntegrationQA.stop()` y comprobar `export().activeObservers===0`. Stop solo retira listeners QA.
5. Verificar SHA del bundle efectivo, runtime/autoridades, slot/ciclo/token, manager/subscription, media base/tech/IMA, CONTENT_RESUME_REQUESTED→adend→snapshot→contentended→dispose, número de requests VAST e impresiones y siguiente ciclo. Si faltan enums o listeners, declarar cobertura incompleta.
6. Para visibilidad: conservar anchor, wrapper, player y media; revisar el vídeo de pantalla. No llamar Active View a intersección DOM. Si el XML falta del HAR, guardar las respuestas autorizadas por separado, sin reemitir requests.

[Guía actualizada de Fiddler y verificación de cobertura/cleanup](intext-p13c-integration-fiddler.md). Incluye las limitaciones de privacidad de HAR/consola nativos, que no son saneados por el probe.

Criterio de integración: sin base visible después del anuncio, sin segundo reveal/animación/PiP o callback de fin, sin nuevo request/impresión inesperado, sin error snapshot/restore sin explicar, dispose y siguiente ciclo correctos. Si alguno falla, aislar primero su origen y proponer otro cambio QA; no integrarlo automáticamente.

## G. Opciones de latencia/viewability, sin implementar

1. **Riesgo menor:** medir y optimizar entrega/cache de dependencias preservando Promise compartida y prewarm tras winner. Priorizar separar `blocked`, connect, wait, evaluación JS y eligibilidad. Preconnect/preload/carga previa al winner exigirían otro experimento y revisión de coste/red/consentimiento; no se habilitan aquí. No recrear Video.js temprano separado de IMA.
2. **Riesgo acotado pero pendiente de prueba:** conservar preparación de infraestructura y activación juntas VJS/IMA; evaluar un gate de activación configurable más conservador con señales reales de estabilidad/proximidad. Puede reducir inicios mientras el usuario pasa de largo y también perder oportunidades válidas; no elimina la latencia de red una vez activado.
3. **Riesgo superior:** separar request VAST de inicio solo con contrato público validado para este inventario, cobertura real y ownership claro antes de impresión. `isInAdMode=true` no identifica por sí solo anuncio iniciado; tampoco demuestra que cancelar sea seguro. `AD_BREAK_READY/autoPlayAdBreaks=false` siguen sin validación para este VAST simple. No adoptar el gate C ni introducir start/play sintéticos.
4. **Riesgo comercial alto:** deadline por etapas o cancelación antes de impresión. Se necesitan eventos y control fiables incluso sin manager. No retirar guards ni fijar budgets de 10/12 s a partir de esta muestra. No cancelar anuncios ya iniciados para mejorar cifras.

No se afirma mejora de viewability ni de ingresos. La integración del dummy y la arquitectura futura son decisiones distintas.

## Validación

- Probe/análisis/build: **26/26** (12 regresiones añadidas en esta revisión). Con tests existentes de dummy/loader de laboratorio: **59/59**, cero omitidos.
- Suite completa de esta revisión: **1252/1252**, cero fail/cancelled/skipped/todo. Baseline recibido 1240; se añaden 12. Los 14 tests de la entrega anterior permanecen.
- La ejecución directa encontró `spawnSync git/node EPERM`. Se repitió con el adaptador de comprobaciones externas ya utilizado por el proyecto, exclusivamente para `git rev-parse`, `git diff --name-only` y `node --check`, con hashes verificados. No se sustituyen tests ni SDK. [Salida directa actual](intext-p13c-integration-review-validation-direct.txt), [suite completa actual](intext-p13c-integration-review-validation.txt), [afectados actuales](intext-p13c-integration-review-targeted-validation.txt).
- Una primera repetición con baseline HEAD tuvo **1251 pass / 1 fail**: el test histórico de Floor Authority espera comparar el resolver anterior a overridePrice con el actual, pero HEAD `b4ffb921…` ya contiene ambos cambios anteriores. Sin cambiar test ni expectativas, se utilizó `INTEXT_FLOOR_AUDIT_BASELINE` con el archivo extraído externamente del commit **`98106a032aa4d8b2cbc83855030973e6c4563dba`**, idéntico byte a byte al baseline verificado de las entregas previas. Esa comparación vuelve a probar 0,40/pivot frente a 0,45/override. No se modificó Floor Authority.
- `node --check` de ambas distribuciones productivas, módulos QA y cuatro copias observadas: correcto; copias fuente-only siguen validadas por sus tests/hashes.
- `git diff --check`: correcto. El árbol tracked estaba limpio al comenzar esta revisión. El diff nuevo pertenece exclusivamente al probe/build/tests QA y su documentación/artefactos; ambos bundles productivos conservan sus hashes. Las inserciones son reversibles y los tests verifican igualdad byte a byte del input tras retirarlas. No hay diff productivo.
- No existe configuración separada de lint/auditor de seguridad en este workspace; se ejecutaron los gates de arquitectura, seguridad y sintaxis incluidos en la suite. Tests con mocks no certifican comportamiento de Chrome/SDK ni ausencia de overhead real.
- CodeMemory se consultó primero y se reindexó al finalizar en modo fast sin artefacto persistente. La indexación finaliza, pero las búsquedas del grafo siguen omitiendo los helpers QA CJS actuales; el código del workspace, los hashes y los tests prevalecen. [Scope y comprobaciones](intext-p13c-integration-scope.json).

Sin commit, push, despliegue, cambios comerciales, cambios de timeout o enforce. P1.3c continúa abierta.
