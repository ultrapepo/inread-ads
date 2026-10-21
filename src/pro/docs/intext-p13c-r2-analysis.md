# P1.3c-R2 — Siete sesiones Chrome/IMA y dos HAR

Estado: análisis de las capturas aportadas; **P1.3c continúa abierta**. Ninguna modificación del core comercial, del probe R1, de configuración publicitaria ni de SDK. Sin enforce, commit, push o despliegue. No se inicia P1.3d.

## Evidencia, identidad y relojes

Fe de erratas tras revisión R2: **las siete sesiones tienen dualMode=false, pspDetected=false y randomSource=gexp-owner-random**. Las cinco advertencias desktop pertenecen a contexto GAM tradicional, no PSP. Se conserva la conclusión PBJS/node.slot; la validación PSP con HTTP real sigue pendiente y no está representada por estas capturas.

Se leen siete parejas del 19/10/2026 y dos HAR desde Downloads. `intext-p13c-r2-evidence.json` conserva manifiesto SHA256 de los 16 originales, eventos correlacionados, snapshots, callsites, costes y entradas HAR con índice original. El analizador no importa ni ejecuta código comercial ni realiza requests.

| Sesión | QA original | Debugger, sufijo UTC |
|---|---|---|
| D-O | observe desktop 1.json | 15-17-48-482Z |
| M-O1 | mobile observe 1.json | 15-20-01-333Z |
| M-O2 | mobile observe 2.txt | 15-21-55-054Z |
| D-S | desktop shadow 1.json | 15-25-09-504Z |
| M-S1 | mobile shadow 1.json | 15-28-21-746Z |
| M-S2 | mobile shadow 2.txt | 15-29-48-910Z |
| M-S3 | mobile shadow 3.json | 15-31-07-292Z |

Todos los vídeos analizados pertenecen a `gexp-intext`, cycleId=1/renderToken=1. Las subastas y Display posteriores conservan sus propios tokens/ciclos. Cada pareja se comprueba por identidad y timestamp de first-frame, no solo por cercanía del nombre. Las extensiones txt contienen JSON válido. No se importan al informe cookies, XML inexistente ni cuerpos completos de los HAR; las URLs de media se identifican por hash, omitiendo rutas firmadas/IP. Los bid IDs locales permiten correlacionar subastas.

Las tablas siguientes usan **t=0 en ads-request del probe**, Date.now del documento. No es HTTP start ni activation. Se preserva monotonicMs por separado; diferencias de 1–2 ms entre evento, registro y armado son esperables y se indican donde afectan al deadline. Activation→frame se obtiene del debugger, con sus propios hitos.

## Resultados por sesión

Las siete sesiones tienen exactamente un ads-manager, adsready, readyforpreroll, adstart, first-frame, native IMPRESSION y native COMPLETE. Un init y un start del manager por sesión. No hay evidencia del bloqueo histórico en este conjunto.

Tiempos en ms desde ads-request; las columnas no implican que reveal preceda siempre a IMPRESSION:

| Sesión | Activation→frame | Manager | adsready | Preroll | adstart | Frame | IMPRESSION | Reveal | COMPLETE |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| D-O | 4425 | 3431 | 3434 | 3435 | 3510 | 4191 | 4252 | 4194 | 14413 |
| M-O1 | 4157 | 3137 | 3139 | 3141 | 3217 | 4014 | 4114 | 4018 | 14168 |
| M-O2 | 2185 | 1013 | 1015 | 1016 | 1067 | 2105 | 2161 | 2107 | 12180 |
| D-S | 3461 | 2271 | 2274 | 2276 | 2412 | 3313 | 3430 | 3316 | 13593 |
| M-S1 | 2560 | 1572 | 1573 | 1574 | 1635 | 2328 | 2411 | 2331 | 13958 |
| M-S2 | 13174 | 12446 | 12449 | 12451 | 12557 | 12998 | 13058 | 18694 | 28741 |
| M-S3 | 1636 | 1214 | 1215 | 1216 | 1269 | 1555 | 1615 | 1558 | 11698 |

Contrib-ads progresa manager→preroll en **2–5 ms**; preroll→frame tarda **339–1089 ms**. En M-S2 los 12,446 s request→manager concentran la demora previa a reproducción; no hay HAR suyo que permita repartirla entre SDK, HTTP, wrappers, disponibilidad de demanda o main thread. El reveal añade otros 5,696 s desde frame porque espera reentrada. Son dos esperas distintas.

En seis sesiones el anchor es elegible al recibir IMPRESSION; en M-S2 no. Ninguna de estas observaciones mide Active View. D-S y M-S1 confirman frame mediante rVFC; las otras cinco usan media-loadeddata-confirmed, con currentTime positivo observado. Se conserva la definición estricta del core; no se considera suficiente adstart ni STARTED.

## Investigación 1 — Error de media dummy

| Sesión | Error desde request | Respecto a AdsManager/COMPLETE | Identidad y fuente |
|---|---:|---|---|
| D-O | +14433 ms | COMPLETE +20 ms | base / data:dummy |
| M-O1 | +192 ms | manager −2945 ms | base / data:dummy |
| M-O2 | +129 ms | manager −884 ms | base / data:dummy |
| D-S | +13680 ms | COMPLETE +87 ms | base / data:dummy |
| M-S1 | +238 ms | manager −1334 ms | base / data:dummy |
| M-S2 | +354 ms | manager −12092 ms | base / data:dummy |
| M-S3 | +201 ms | manager −1013 ms | base / data:dummy |

**Probado:** todos los eventos native-media-error corresponden a `mediaIdentity=base`, currentSrc=data:dummy, readyState=0, networkState=3 y dimensiones de vídeo 0. No son errores observados del MP4 publicitario. El core registra inmediatamente después que ignora MEDIA_ERR_SRC_NOT_SUPPORTED. El serializer del probe usa getErrorCode(), no HTMLMediaError.code: su campo code=null no demuestra ausencia de código de media; el mensaje y el log del core son las evidencias disponibles.

`createVideoElement()` inserta un source data:video/mp4 antes de crear Video.js. La inspección binaria de **ambas distribuciones actuales** encuentra el mismo payload:

- 807 bytes; SHA256 `6231a292d2b2202abe7ef00697d2172b1c2b67e26c231b3bb4e529e983cdb52b`.
- ftyp: offset 0, tamaño 32; free: offset 32, tamaño 8.
- moov: offset 40, tamaño declarado 1704, final declarado 1744, pero solo quedan 767 bytes.
- No aparece el identificador mdat en esos bytes.

Esto demuestra una estructura truncada del asset embebido. El cuerpo del bundle efectivamente servido en **la entrada #9 de cada HAR** contiene exactamente el mismo dummy de 807 bytes y el mismo hash: no se analiza solo una copia local distinta a la ejecutada en esas dos sesiones. Junto con el error real de Chrome sobre esa fuente, identifica el origen de la advertencia sistemática. **No es una prueba aislada de decodificación alternativa** ni demuestra por qué antes falló un preroll. No hay ffprobe disponible; no se descarga ninguna herramienta ni se sustituye el dummy.

Orden normal observado en las cinco sesiones móviles: Video.js/IMA inicializados antes de loadstart → play real → pause de contrib-ads → error base → AdsManager → adsready → readyforpreroll → medio publicitario válido → frame/COMPLETE. Los stacks de la primera pausa móvil apuntan a contrib-ads, no al gate de viewport. La pausa posterior a adstart apunta a videojs-ima.onAdBreakStart y corresponde a contenido base, no prueba una pausa del anuncio.

En desktop el dummy no produce su error hasta que, después de COMPLETE, el stack de `player.play()` pasa por contrib-ads.endLinearAdMode/snapshot resume y videojs-ima.onAdBreakEnd. En las siete sesiones hay una llamada de play de contenido tras COMPLETE; no es un segundo AdsManager.start ni una segunda impresión. En estas trazas no se observa ningún setter `player.src(...)` interceptado: la fuente se asigna inicialmente mediante source DOM y las tech/SDK pueden operar sin pasar por ese método. No se infiere ausencia de otras operaciones de source desde ese dato.

**Conclusión acotada:** el dummy defectuoso explica la advertencia, pero no basta para bloquear esta integración: las siete sesiones completan. La restauración de contenido sobre ese dummy explica el camino de error desktop, con callsite observado. Sigue sin probarse si una carrera de source/snapshot contribuye a fallos raros o segundos ciclos. No se cambia la fuente, no se desactiva snapshot y no se ocultan errores.

## Investigación 2 — M-S2, eligibility y pausa

| Hito | t desde request | Estado relevante |
|---|---:|---|
| Init IMA retorna | −160 ms | aún no loadstart; anchor elegible |
| ads-request | 0 | anchor ratio ≈0,304; documento visible |
| loadstart / play | +197 / +234 ms | se inicia el flujo normal |
| Microtask después de play | +241 ms | isInAdMode=true, sin AdsManager |
| Error dummy | +354 ms | base; no error publicitario terminal |
| Usuario supera anchor | +7627 ms | video_missed_viewport, reason=passed |
| Shadow expira | +10063 ms por Date.now | actualElapsed≈10061,8 ms; drift≈61,8 ms; no cancela |
| AdsManager / adsready / preroll | +12446 / +12449 / +12451 ms | anchor pasado, ratio=0, gate pausado |
| Manager init / start | +12453 / +12457 ms | callsite videojs-ima.onPlayerReadyForPreroll |
| Primera llamada manager.pause | +12467 ms | fuera de viewport; no confirmación PAUSED todavía |
| Native LOADED / adstart | +12525 / +12557 ms | comienza ad-break fuera de eligibility |
| Nuevas llamadas manager.pause | +12637 y +13003 ms | esta última tras confirmar frame |
| First-frame | +12998 ms | currentTime≈0,002513; media.paused=false; reveal retenido |
| IMPRESSION | +13058 ms | media.paused=true, currentTime≈0,015129; anchor ratio=0 |
| Native STARTED / PAUSED | +13062 / +13072 ms | PAUSED observado después de IMPRESSION |
| Otra llamada manager.pause | +13088 ms | no se solicita una nueva reproducción |
| Reentrada / recovery API | +18684 / +18686 ms | ratio≈0,051; manager.resume una vez |
| Recovery confirmado / reveal | +18692 / +18694 ms | media reproduciendo; guard visual válido |
| Native RESUMED | +18714 ms | confirmación adicional del SDK |
| COMPLETE / probe dispose | +28741 / +28765 ms | finalización y limpieza diagnóstica |

La expiración se mide desde el hito interno de budget, registrado unos ms después de ads-request; por eso el offset Date.now redondeado es +10063, mientras que duración/drift son ≈10062/62. No se atribuyen esos 62 ms a red.

**Mecanismo demostrado:** activar con viewport válido no garantiza que siga válido cuando la respuesta llega. El plugin 1.11.0 con autoPlayAdBreaks=true arranca el manager al recibir readyforpreroll. Las llamadas posteriores de pausa no son un gate previo de start. El evento PAUSED llega después de frame/IMPRESSION; no se puede deshacer tracking ya iniciado. El código de esa versión se ha leído del cuerpo JS presente en los HAR, con hash e índices conservados en la evidencia; los stacks de M-S2 señalan ese mismo plugin/version.

La [API oficial AdsManager](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/interface/google.ima.AdsManager) distingue pause/resume de start: pause puede no actuar si el anuncio aún no está cargado. Esto es compatible con las primeras llamadas de pausa, pero la traza no permite determinar qué parte fue no-op y qué parte fue latencia interna. No se propone repetir pause/play/start indiscriminadamente.

**IMPRESSION no implica viewability.** Según [AdEvent de IMA](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/namespace/google.ima.AdEvent), ese evento señala el ping de impresión. En M-S2 el anchor está entre top≈−1851 y bottom≈−1701 px, el player también está fuera de pantalla y el wrapper mide altura 0. El SDK ya inició/tracked el anuncio antes de que Intext abra su superficie. Retener reveal protege la apertura visual/PiP, pero no intercepta automáticamente la contabilidad de IMA. No se inventan métricas Active View/GAM ni se afirma una impresión viewable.

En los demás casos también hay snapshots tempranos de wrapper con altura 0 pese al hito reveal. `IntextContainer.open()` difiere expansión mediante dos requestAnimationFrame; el evento reveal no certifica píxeles pintados. Anchor, wrapper, player/IMA y animación son geometrías/hitos diferentes. Se requiere observar apertura efectiva y final de transición antes de atribuir esos ceros a un fallo visual o a viewability.

### Por qué enforce sigue bloqueado

En el vencimiento M-S2: deviceMobile=true, listenerInstalledBeforeIma=true; **managerPresent=false, managerIdentityCurrent=false, impressionSubscribed=false, outsideAdMode=false**. El motivo registrado es mode-shadow; esas condiciones bloquearían también un intento enforce. Se conserva el guard.

isInAdMode=true aparece desde +241 ms, mucho antes del manager. Es un estado de contrib-ads, no prueba de reproducción/impresión. La [API de contrib-ads](https://videojs.github.io/videojs-contrib-ads/integrator/api.html) distingue espera, ad-break y reanudación de contenido dentro de ad mode. El JS 6.9.0 capturado implementa isInAdMode mediante `_state.isAdState()`. El constructor minificado `n` no identifica inequívocamente la fase. Esto explica que el guard sea conservador, no autoriza eliminarlo.

Riesgos impeditivos: falta de cobertura preimpresión verificable; ausencia de una cancelación demostrada del request pendiente del SDK; posible callback/tracking tardío; ad mode semánticamente ambiguo; y pérdida de un vídeo válido (este mismo terminó). Incluso un cap de 12 s vencería antes del frame válido de +12,998 s. La validez de ese vídeo no demuestra que su oportunidad comercial fuese buena: empezó fuera de pantalla y solo se reveló al volver. No se activa ningún deadline productivo de 10/12 s.

## HAR: correlación y límites

Solo M-O2 y M-S3 tienen HAR. Ambos usan `/99071977/mc-mv2/motor/formula1/video-intext`. Los requests reales contienen tag/t; en esas subastas móviles PBJS no devuelve bids/targeting HB, de modo que su ausencia en VAST no demuestra pérdida. No se extrapola a desktop ni valida PSP.

| Sesión / entrada HAR | HTTP | Inicio desde proxy | Total | blocked | wait |
|---|---:|---:|---:|---:|---:|
| M-O2 VAST #376 | 200 | +721 ms | 235,535 ms | 3,192 ms | 158,759 ms |
| M-O2 MP4 redirect #383 | 302 | +1051 ms | 246,298 ms | 3,178 ms | 43,601 ms |
| M-O2 MP4 final #387 | 206 | +1297 ms | 697,310 ms | 1,818 ms | 477,350 ms |
| M-S3 VAST #403 | 200 | +883 ms | 274,526 ms | 4,265 ms | 161,196 ms |
| M-S3 MP4 redirect #408 | 302 | +1252 ms | 78,641 ms | 5,427 ms | 52,488 ms |
| M-S3 MP4 final #411 | 206 | +1330 ms | 249,327 ms | 11,850 ms | 23,799 ms |

El hash de la URL currentSrc del medio en first-frame coincide exactamente con la entrada redirect MP4 indicada; el recurso de destino conserva el media ID `aaea173cbf37b22d`. No se confunden los otros MP4 de publicidad de página presentes antes/después. La falta de XML impide demostrar toda la cadena VAST/wrappers y sus creatividades desde los cuerpos. El HTTP 200 no se usa como sustituto del XML.

En M-O2 el manager aparece ≈56 ms después de terminar el VAST registrado; en M-S3 también ≈56 ms. Los +721/+883 ms proxy→HTTP no forman parte del tiempo HTTP total. El primer frame de M-S3 precede ligeramente al final de descarga MP4: reproducción progresiva, no una obligación de completar todo el archivo primero.

Video.js 7.20.3, contrib-ads 6.9.0 y videojs-ima 1.11.0 tienen los mismos hashes de cuerpos entre los dos HAR; ima3.js, de URL evergreen, tiene hashes distintos. No se atribuye causalidad a esa diferencia. Conservar cuerpo/hash/version SDK observada en futuras comparaciones. **No hay ningún HAR de M-S2**: no se atribuyen sus 12,446 s a GAM, HTTP ni exclusivamente al SDK.

## Investigación 3 — Diferencial con 19/10 10:29

P1.3b/R1 normal en estas pruebas: IMA retorna 13–24 ms después de player-created y antes del primer loadstart; no existe el standby con Video.js creado e IMA tardío de Lifecycle A. Todos los casos muestran play dispatch y adsready, y preroll progresa inmediatamente después del manager. El error dummy móvil precede al manager sin impedir esa secuencia. No se da por cerrado 10:29 por haber tenido siete éxitos.

| Patrón si reaparece | Evidencia que diferencia | Interpretación permitida |
|---|---|---|
| Error base/dummy + después adsready/preroll/frame | identidad base, fuente data, medio del anuncio válido | advertencia de contenido base; no bloqueo demostrado |
| Manager pero no adsready | evento manager, callbacks/error SDK y plugin | posible falta de puente SDK→plugin; no culpar a viewport sin cronología |
| adsready pero sin play dispatch | play API vs evento, Promise/tech/autoplay/source | falta de prerrequisito de contrib-ads; no sintetizar play |
| play + adsready pero sin preroll | loadstart/contentchanged y métodos públicos de estado | sospecha de FSM/source/reinicio; constructor minificado no basta |
| preroll pero sin manager.init/start | stack/retorno/error de APIs | problema de arranque en plugin o gate |
| start pero sin LOADED/STARTED/frame | HAR del mismo token, XML, MP4, media/error/eligibility | falta de progreso SDK/creatividad o pausa; investigar por etapa |

La regla play+adsready→readyforpreroll está documentada por [contrib-ads](https://videojs.github.io/videojs-contrib-ads/integrator/getting-started.html); no permite reconstruir retroactivamente eventos que 10:29 no instrumentó. Solicitar nueva traza del bloqueo con HAR de **esa misma sesión**, sin retries de play/start ni eventos sintéticos.

## Investigación 4 — Coste y cleanup reales

observerBuildMs, en ms, para eventos de creative que lo incluyen; percentiles de rango más próximo:

| Sesión | n | Suma | p50 | p95 | Máximo | COMPLETE→probe dispose |
|---|---:|---:|---:|---:|---:|---:|
| D-O | 47 | 34,8 | 0,4 | 1,9 | 6,5 | 5680 ms |
| M-O1 | 46 | 44,4 | 0,5 | 2,6 | 8,1 | 14075 ms |
| M-O2 | 46 | 23,2 | 0,3 | 1,7 | 2,2 | 8323 ms |
| D-S | 47 | 47,6 | 0,4 | 3,2 | 9,2 | 7525 ms |
| M-S1 | 46 | 44,7 | 0,4 | 2,3 | 11,9 | 6700 ms |
| M-S2 | 55 | 35,6 | 0,4 | 1,8 | 4,1 | 24 ms |
| M-S3 | 46 | 28,4 | 0,3 | 2,6 | 4,1 | 13838 ms |

No equivale al coste total: quedan fuera stacks construidos antes del record, serialization/copy, debugger, eventos globales/display, impacto de wrappers y posibles layouts/otras tareas. Un pico de 11,9 ms no es despreciable en un frame móvil. La suma de M-S2 no explica por sí sola 12 s, pero tampoco descarta perturbación del experimento. **No existe control P1.3b sin probe en estas siete sesiones.** No se afirma overhead inocuo ni equivalencia de timings a producción.

Al exportar, los siete stats son droppedEntries=0, activeCreatives=0 y displayObservers=0. Hay un qa_probe_disposed por creative y no eventos posteriores de ese creative. No hay reemplazos/ambigüedades de manager ni errores internos/listener del probe registrados. La omisión diagnóstica del listener de error del plugin aparece en cada init, mientras aún no hay manager; luego la suscripción directa de manager funciona y recibe IMPRESSION/COMPLETE.

El snapshot de COMPLETE y hasta el record de dispose conserva isInAdMode=true/snapshotPresent=true. Es compatible con restauración de contenido pendiente: no prueba anuncio reproduciéndose indefinidamente. El core destroy es idempotente, limpia eligibility/media/timers y llama player.dispose; el probe R1 restaura wrappers antes de delegar. **Estos JSON no registran comparación de identidades de funciones ni player.isDisposed después de retornar el destructor**. Stats=0 y los mocks anteriores no prueban por sí solos restauración completa/memoria libre en Chrome. Los intervalos hasta dispose deben correlacionarse con refresh Display/transición/viewport, sin convertirlos automáticamente en fuga.

No aparecen errores globales/unhandled del probe ni suppressedTracks en este conjunto exportado. La pila de restore sí se observa en el segundo play. El JS contrib-ads capturado lee `snapshot.suppressedTracks` en restauración; eso localiza el camino susceptible, pero **no demuestra un snapshot nulo en estas sesiones**. Capturar excepción completa si reaparece; no parchear SDK ni silenciarla.

### Prebid, correlación separada; PSP pendiente

Hay **seis warnings**: D-O=3, D-S=2, M-S1=1; los otros cuatro exports no los tienen. Los seis se enlazan por auctionId/adUnit/cycle/token con snapshots before/after-set. En todos: slotExists=false, slotTargeting=null, nativeTargeting=null; PBJS after-set sí conserva hb_pb/hb_bidder/hb_adid. En el audit nativo, gptSlotTargetingApiAvailable=false. Esto evidencia que **node.slot no está disponible en ese punto**, no targeting perdido por PSP. Tampoco demuestra que no exista otro slot GPT de página/proxy: no se adopta un objeto distinto como sustituto de identidad.

D-O: auctions `d4765d5b…`, `4f190d24…`, `c43c5bf7…`; D-S: `5a0445d5…`, `4eb4d793…`; M-S1: `ae477038…`. El hb_adid seleccionado está en los bids de su snapshot QA. En M-S1 se trata de un bid **video** richaudience_video; el audit rawBannerBids vacío no significa ausencia de ese bid. No se confunde la lista banner con toda la auction. Hay snapshots posteriores con targeting PBJS conservado pero sin bids actuales: no se reasignan a otro token ni se declara violación de floor.

Para los cinco warnings desktop (sin PSP) no hay HAR adjunto. La correlación hasta la request GAM efectiva queda sin prueba de red en esas sesiones. Los dos HAR móviles muestran tag/t y ausencia HB coherente con snapshots sin bids, pero no validan la ruta desktop. Ninguna de las siete sesiones valida PSP: se requiere una captura PSP independiente con HTTP real. Se necesita iu/slot efectivo/cust_params del request de **la misma auction/ciclo**, más snapshot de slot real cuando exista. No cambiar aliases, HB, floors, random ni PSP para obtener esa evidencia.

## Siguiente experimento propuesto, no implementado

Prioridad inmediata: repetir la captura completa **P1.3b sin probe / observe / shadow** y aislar el dummy sin tocar la campaña. No se recomienda enforce ni un nuevo timeout.

1. **Control de instrumentación.** Alternar los tres brazos con el mismo artículo/campaña y dispositivo, scroll guionado (incluido salir antes del manager y volver), caché/DevTools/throttling/visibilidad/consentimiento comparables. Asignación QA externa, sin tocar random publicitario. Conservar dual/PSP, network/adUnit/tag/t, bid/creatividad cuando disponibles y hashes de SDK. No forzar que subastas distintas devuelvan lo mismo. Separar cold/warm y contexto PSP; no juntar siete sesiones de conveniencia para inferir causalidad. Comparar distribuciones y fallos con varias repeticiones por brazo, no solo medianas de 1–3 casos.
2. **Dummy aislado, sin anuncios.** En laboratorio local, reproducir exactamente los 807 bytes con HTMLVideoElement y después Video.js de la misma versión, capturando loadedmetadata/loadstart/play/error, media.code, ready/networkState. Un MP4 de contenido válido independiente puede servir de control de decodificación, sin IMA ni VAST/tracking. Solo si ese contraste reproduce la causa, diseñar un segundo ensayo QA de integración con una única variable; no sustituir todavía el dummy del bundle real.
3. **Telemetría mínima si se autoriza otra revisión QA.** Leer isWaitingForAdBreak/inAdBreak/isContentResuming junto a isInAdMode; identificar base/ad y código HTMLMediaError sin confundirlo con IMA. Añadir verificación finita de restauración de referencias/descriptores después de destroy, y observación de apertura efectiva/rAF/transitionend. Sin polling, mutación FSM ni eventos sintéticos. R2 no modifica el probe actual.

Opciones de diseño para reducir arranque fuera de viewport, pendientes de revisión y prueba aislada:

| Opción | Beneficio y límite | Gate de aceptación |
|---|---|---|
| Mantener request en activación válida y pausar al salir, como ahora | mantiene compatibilidad; no impide start tardío ni tracking previo a pausa | brazo control, sin promesa de cero impresiones fuera de pantalla |
| Gestionar el inicio mediante la API pública de ad-break manual | permite revalidar viewport/documento/token inmediatamente antes del único start, aunque manager llegue tarde | verificar plain VAST real, AD_BREAK_READY, init previo y una sola ejecución; reentrada sin nueva request; no cortar un ad ya iniciado |
| Exigir más permanencia/proximidad antes de request | puede evitar entradas fugaces pero retrasa demanda y pierde oportunidades | decisión comercial/UX separada, no cambiar márgenes por suposición |
| Cancelar pending request con deadline | puede ahorrar espera, pero no hay aquí garantías suficientes de cancelación/preimpresión | descartado para este paso; conservar guards y timeout 25 s |

La ruta manual está documentada en [videojs-ima](https://github.com/googleads/videojs-ima): autoPlayAdBreaks=false, setAdBreakReadyListener y playAdBreak. El **JS 1.11.0 capturado** muestra que con false inicializa el manager al cargarlo y no arranca en onPlayerReadyForPreroll; playAdBreak llama start. La documentación [IMA](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/ad-rules?hl=en) describe el control manual para ad rules. Por tanto, no se asume compatibilidad de todos los tags VAST/VPAID/VMAP con nuestra creatividad fija: primero demostrarla en inventario QA, sin adoptar una playlist.

En ese posible ensayo, mientras isInAdMode=true pero aún no existe manager, el estado sería **request pendiente/espera de elegibilidad**, no prueba de reproducción ni autorización de cancelación. Al llegar manager/break-ready, guardar readiness; si el usuario ya pasó, no iniciar hasta reentrada válida y dentro del lifecycle/timeout existente. Tras primer start legítimo, conservar recuperación P1.2b. No reinicializar, duplicar request, repetir play/start ni extender 25 s para mantener un standby indefinido. Si el tag no emite la señal soportada, detener el ensayo en vez de inventar readyforpreroll. Un check antes de start reduce la ventana larga observada, pero no hace atómica la impresión asíncrona frente a un nuevo scroll.

## Validación, archivos y scope

Reproducir la extracción:

```powershell
node tests/qa/intext-p13c-r2-analysis.cjs "$env:USERPROFILE/Downloads" docs/intext-p13c-r2-evidence.json
node --check tests/qa/intext-p13c-r2-analysis.cjs
node --check _gam_kv_.js
node --check IntextManager.js
$env:INTEXT_FLOOR_AUDIT_BASELINE = Join-Path $env:TEMP 'intext-authority-head.js'
$adapter = Join-Path $env:TEMP 'intext-authority-test-command-cache.cjs'
node --require $adapter --test --test-isolation=none tests/*.test.cjs
git diff --check
```

Suite existente: **1174/1174**, sin fallos, omitidos ni cancelados; stdout en `intext-p13c-r2-validation.txt`. No se añaden tests de comportamiento sin una corrección/hipótesis ejecutable aislada. El analizador verifica identidad/tiempo de las parejas y aporta inspección estructural reproducible; no pretende simular un decoder ni probar impacto real del SDK con mocks. Se usa el adaptador externo de subprocesses ya establecido, que verifica hashes y reproduce exclusivamente checks git/sintaxis ejecutados externamente. No hay una nueva ejecución Chrome desde este workspace: la evidencia real es la facilitada por el usuario.

Cambios R2: solo analizador offline y documentación/evidencia/validación. El probe, builder, tests previos y fuentes comerciales permanecen intactos. El reverse-check del diff R1 sigue pasando. Hashes comerciales conservados:

- `_gam_kv_.js`: `1CDE1CCDC962C07D5833DC9691A3BFE31B7DD74B3E649E89153A240940A06690`.
- `IntextManager.js`: `BA832DC0EB3C0F6E1070A515FAC09DD31467E2C7A5A64A18FF4E4F4C063FEAD8`.

Versión inalterada: `2026.10.07-p1-ima-preload-first-frame`. Timeout, targeting, Floor Authority, GAMExp, WindowArray, PSP, Prebid/APS/TAM, random, waterfall/fallback, first-frame, PiP y animación sin cambios. CodeMemory se consultó para el core y se reindexó al cerrar, sin artefacto persistente. Limitación observada: devuelve indexed, pero search_graph/search_code todavía no encuentran analyze/inspectDummy del nuevo fichero R2; el fichero actual, su ejecución y hashes son la referencia. Diagnóstico 10:29 abierto; ninguna afirmación de mejora de viewability ni autorización de producción.
