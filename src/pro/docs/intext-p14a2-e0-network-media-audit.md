# P1.4-A2 — Auditoría offline de red, medios y Performance E0

26/10/2026, revisión posterior a `Informe_P14A2_E0_Legacy_Performance_2026-10-26.md`. Cuatro E0 auténticos en las entregas del 25–26/10: dos PSP y **dos Legacy descriptivos, objetivo 2/2 cumplido**. Sin comparación causal. [Matriz vigente](intext-p14a2-evidence-matrix.md), [evidencia Performance nueva](intext-p14a2-legacy-performance-evidence.json) y [evidencia anterior intacta](intext-p14a2-e0-real-evidence.json). Lectura offline, sin URLs publicitarias, navegador, bundles ni cambios de core/coordinador.

## Revisión vigente — Legacy-E0-2 del 26/10 con Performance

Se contrastó el informe completo con los cuatro originales. QA `E0-26oct-json.json`, debugger `E0-26oct.json`, HAR `www.marca.com-mobile E0-26oct.har` (813 entradas) y `E0-26OCT-performance.json` verifican E0 Legacy: body E0/894934 bytes/hash esperado, arm/assignment_fixed E0, sin conflictos ni eventos perdidos y ramas secuenciales sin solape. dualMode=false, pspDetected=false, randomSource=gexp-owner-random. Primera posición AUTO, segunda display_only. Plugin 1.11.0, bytes auditados; bridge **3.796.0**. Se añade a Legacy-E0-1 del 25/10; PSP, Legacy E1 y versiones/fechas se conservan separados.

| Tramo del primer vídeo | ms | Interpretación |
|---|---:|---|
| Dependencias coordinador | 1635 | Solapadas con prewarm/prepare, no sumar esas marcas |
| Prepare ready→fin de primera espera viewport | ~5910 | Espera registrada 5909 ms, no descarga IMA |
| Winner→activación | 7729 | Incluye geometría y trabajo previo |
| Activación→ads-request | 142 | Evento tras retorno SDK, no envío de red |
| ads-request→inicio HAR VAST | 1248 | Incluye ejecución/colas, no HTTP GAM puro |
| VAST HTTP 200 | 255,341 | Sin XML exportado |
| ads-request→manager | 1792 | No reproduce los outliers anteriores |
| manager→readyforpreroll | 6 | No reproduce manager-sin-preroll histórico |
| manager→primer frame publicitario | 1570 | Medio y ejecución pueden solaparse |
| Activación→frame / winner→frame | 3504 / 11233 | No beneficio causal demostrado |
| Frame→reveal solicitado | 7 | No fin de animación ni Active View |

El trace es GZIP aunque termina en `.json`; descomprimir antes de parsear. 238554799 bytes descomprimidos, 810091 eventos; inicio metadata **17:17:10.733 UTC**, duración ~35,79 s, DevTools/Pixel 9 Pro Fold. Dependencias y prepare ya finalizaron a ~17:17:09.384: su coste de ejecución inicial queda fuera. No describir esta captura como Performance de toda la navegación. La correlación con HAR requiere una proyección aproximada: ResourceSendRequest del medio presenta diferencia del orden de 145 ms; no es drift exacto.

### Ejecución del iframe y renderer principal

Entre bridge HTTP (~17:17:15.506–15.950, ~444 ms) y VAST HAR (17:17:16.782) aparece, en el renderer del bridge pid 2984/tid 18584, `RunTask` **535,861 ms**, `ParseHTML` 535,628 ms, evaluación **409,036 ms** y compilación V8 **284,938 ms**. ParseHTML contiene la evaluación y esta contiene compilación: **no sumar sus duraciones**. Hay coste JS real tras la respuesta del bridge; no queda probado que toda la brecha HTTP→VAST sea compilación o handshake IMA.

Renderer Marca pid 23580/tid 3012: tarea **204,751 ms** durante activación y `MajorGC` **165,228 ms** antes de manager. Unión de RunTask recortada a activación→frame: ~2,09 s (~60%) en Marca y ~1,21 s (~34%) en iframe IMA. Son duraciones de pared de tareas, con posible solape entre hilos y red; no sumarlas ni llamarlas CPU de InText. No hay una sola tarea de varios segundos en esos hilos dentro de esa fase. Otras integraciones y el coste de DevTools limitan la atribución; no se diagnostica saturación del equipo ni causa de los timeouts del 22/10.

### VAST y transporte GVT 302→206

VAST GAM 200 en **255,341 ms**, connect ~92 ms con SSL ~63 ms incluido. HAR sin XML: no reconstruir wrappers ni creatividad final. Manager 17:17:17.326, preroll a +6 ms; LOADED 17:17:17.400, adstart 17:17:17.443. El medio es publicitario, distinto del dummy; cadena redirector→destino correlacionada sin publicar URL/tokens.

| Red del medio | Inicio UTC | Total | Subfases / límite |
|---|---|---:|---|
| GVT redirector 302 | 17:17:17.421 | ~1012 ms | connect ~966,5 ms, SSL ~893,6 ms **incluido** |
| Destino MP4 206 | 17:17:18.434 | ~279,6 ms | `Range: bytes=0-`, ~498 KB; respuesta al rango, no error |
| Frame publicitario | 17:17:18.896 | ~182 ms tras fin HAR 206 | No equivale a 182 ms de decoder puro |

La red empieza ~22 ms antes de adstart; no es una fase enteramente posterior a ese evento. 302/206 y ejecución concurren. El primer frame próximo al final de la 206 respalda contribución de transporte, sin demostrar dependencia de todos los bytes ni excluir buffering/scheduling. Peer local 127.0.0.1 y connection=8888: Chrome bajo Fiddler no separa cliente/proxy/origen; SSL incluido no se vuelve a sumar. No hay NetLog/SAZ de este intento. Su transporte rápido no explica el connect=11112 ms del bridge PSP anterior.

### Geometría y cobertura visual

Espera viewport 17:17:09.385→15.294 = **5909 ms**. En observer:attached, anchor top~921,663/viewport 922, ratio **0,0022497559 = ~0,225%**, técnicamente elegible; región prevista/player top~1091,662 fuera y wrapper altura/opacity 0. El gate actual exige solo overlapX/Y positivo. En ads-request ratio anchor ~3,43%; en manager/frame es 1 con documento visible tras scroll. No prueba start offscreen, sí una activación permisiva que merece diseño B shadow **offline**, sin cambiar el gate ni fijar un umbral por una muestra. El flag firstFrameOutsideViewport del debugger describe wrapper cerrado, no anchor pasado.

Los Screenshot solo cubren ~14,23 s iniciales del trace y terminan antes de COMPLETE. El comienzo alrededor del frame tiene cobertura visual; cierre/restore/transición final no. **P1.3c visual abierta**. Native IMPRESSION a +114 ms del frame no acredita Active View; reveal no acredita apertura terminada.

### P2: refresh Display tras COMPLETE, no fallback

| Hito slot1/ciclo2 | UTC | ms desde core COMPLETE |
|---|---|---:|
| core:complete del vídeo inicial | 17:17:29.113 | 0 |
| display_missing / puente DOM provisional | 17:17:29.239 | 126 |
| Display request started, refresh=true/fallback=false | 17:17:31.545 | **2432** |
| Display recreado | 17:17:32.034 | 2921 |
| slotRenderEnded filled | 17:17:32.957 | 3844 |
| wrapper abierto | 17:17:32.995 | 3882 |
| impressionViewable | 17:17:34.051 | 4938 |

P2 debe separar **COMPLETE→request 2432 ms**, request→render 1412 ms y render→open 38 ms; no adjudicar todo el intervalo a GAM ni al core. Revisar scheduler, autorizaciones y geometría antes de proponer cambios. El puente DOM no es el iframe IMA. Slot2/ciclo1 display_only tiene fill/apertura/viewable; ciclo2 fill/apertura, sin impressionViewable al exportar: censura, no NO-FILL ni ausencia perpetua de viewability.

**Decisión vigente:** cerrar recopilación A2 2/2; no más capturas automáticas. Mantener abierta H-IMA (demora asíncrona bridge/ejecución/transporte tras retorno SDK en outliers), incluido el efecto común de QA aún sin control histórico equivalente. Diseñar B shadow offline con lo existente y, si se retoma H-IMA, un protocolo discriminante separado antes de cualquier ensayo. A3 bloqueada; B/C/enforce inactivos. [Criterios y próximo paso](intext-p14a2-pre-vast-environment.md).

## Antecedente — tres E0 reales revisados antes de Performance

Las secciones numeradas siguientes mantienen los datos originales de esa entrega. Sus referencias a 1/2, ausencia de Performance y a un intento adicional describen **el estado anterior**, cumplido por Legacy-E0-2; no solicitan nuevas capturas ni niegan el trace del 26/10.

## 1. Identidad y separación de cohortes

| Nombre original, conservado en los ficheros | Etiqueta analítica correcta | Fecha | Contexto real | Resultado vídeo inicial |
|---|---|---|---|---|
| A2-Legacy-E0-real-1 | PSP-E0-1 | 26/10 | dualMode=true, pspDetected=true, randomSource=gpt-native-slot-targeting | COMPLETE |
| A2-Legacy-E0-real-2 | PSP-E0-2 | 26/10 | PSP/dual, igual al anterior | COMPLETE |
| A2-PSP-E0-1 | Legacy-E0-1 | 25/10 | dualMode=false, pspDetected=false, randomSource=gexp-owner-random | COMPLETE |

Los tres cuerpos `_gam_kv_.js` tienen 894934 bytes y SHA256 E0 `18299f4fa54e151ff045e6d355c554055bdc85399ddec29eb5e9e85990bcfdfc`. Los exports registran arm y assignment_fixed E0, cero conflictos/pérdidas y solape de ramas cero. Se restablecen controles **de brazo** en estas tres navegaciones; no se acredita retrospectivamente cuál regla entregó E1 el 22/10 ni se completan dos controles Legacy por sus nombres. Hay **1 de los 2 E0 Legacy previstos**.

Se mantienen cuatro grupos: PSP/dual original 22/10 (4 E0 + 6 E1, HAR filtrados), Legacy E1 22/10 (6 E1 reales, HAR completos), PSP E0 26/10 (estos 2) y Legacy E0 25/10 (este 1). Sin pooling, tasas comparadas ni causalidad. El mismo artículo se verificó por igualdad de la identidad de página/path de los debuggers, no solo por el nombre de archivo.

En los tres videojs-ima 1.11.0 coincide con el hash fijado `01b11a7a6a4b771ead01e2060b8983d0b37f6f3e01a7e74f0140eb04b69459c8`. El bridge pasa de 3.794.0 en Legacy E1 del 22/10 a **3.795.0** en estas sesiones. La URL unversioned de ima3.js y cuerpos distintos impiden asumir infraestructura idéntica entre fechas; no demuestran una regresión funcional del SDK.

| Intervalo, ms | PSP-E0-1 | PSP-E0-2 | Legacy-E0-1 |
|---|---:|---:|---:|
| Dependencias del coordinador | 6105 | 2087 | 6492 |
| Winner→dependencias listas | 6179 | 2263 | 6714 |
| Ads-request→inicio HAR VAST | 12210 | 4234 | 3715 |
| VAST HTTP 200 | 224 | 497 | 179 |
| Ads-request→manager | 12551 | 5027 | 4353 |
| Manager→frame | 592 | 762 | **4339** |
| Activación→frame | 13310 | 5943 | 8957 |
| Winner→frame | 19606 | 8316 | 15833 |
| Frame→reveal solicitado | 6 | 6 | 13 |

Los tres tienen manager, LOADED/STARTED/IMPRESSION, frame del anuncio, COMPLETE y cleanup observados. Ningún timeout nuevo; eso no estima una tasa de fallos ni excluye recurrencia. E0 también presenta demora pre-VAST: E1 no es condición necesaria, sin inferir efecto causal de cambiar el brazo.

## 2. PSP-E0-1: qué contiene connect=11112 ms del bridge

Entrada **378** (índices HAR desde cero), HTTP 200 de bridge3.795.0, initiator `ima3.js → videojs-ima.initAdObjects/onPlayerReady → Video.js`. La misma cadena aparece en el bridge primario de las otras dos capturas. Se correlaciona con el primer player InText por orden del plugin y reloj, sin confundirlo con bridges VPAID.

| Campo del HAR | ms | Interpretación limitada |
|---|---:|---|
| blocked | 29,912 | Incluye `_blocked_queueing=1,938`; no sumar esa subfase otra vez |
| dns | -1 | No desglosado/no aplicable en esta entrada; no equivale a DNS medido en cero |
| connect | **11112,066** | Fase de conexión registrada por Chrome en este entorno proxy |
| ssl | **95,348** | Incluido en connect, no tiempo adicional |
| connect menos ssl | **11016,718** | Residual aritmético; no es medición de TCP puro ni del servidor origen |
| send | 0,383 | Fase registrada |
| wait | 375,673 | Espera registrada tras envío; no atribuir todo al origen bajo proxy |
| receive | 65,579 | Recepción registrada |
| Total | **11583,613** | Suma blocked + connect + send + wait + receive, sin volver a sumar SSL |

El HAR muestra peer loopback, `connection="8888"`, HTTP/1.1 y `_connectionId="367340"`. Son campos distintos: no usar el valor común 8888 como identidad de socket de todas las requests. Son coherentes con el proxy local Fiddler del ensayo; el HAR de Chrome no separa sus tramos cliente→proxy, CONNECT, establecimiento proxy→origen o posibles esperas internas. No afirmar «11 s de TLS»: solo 95 ms están registrados en ssl. Tampoco afirmar «11 s de red física/TCP», «Fiddler culpable» o «CPU descartada» por el nombre connect.

El bridge empieza **46 ms antes** de ads-request y acaba a +11537,613 ms. El VAST HAR empieza a +12210 ms: quedan **672,387 ms después del fin HAR del bridge**. Así, casi todo el intervalo pre-VAST se solapa con esta request de infraestructura concreta; es evidencia temporal fuerte, no una descomposición causal de su transporte. El fin HTTP no acredita ejecución JS ni handshake interno. En PSP-E0-2 el bridge tarda 691,065 ms, pero el hueco posterior es **3596,935 ms**; en Legacy, bridge primario 1637,736 ms y hueco posterior **2137,264 ms**. Descargar rápido el bridge no elimina la espera posterior.

Para discriminar esa conexión hacen falta NetLog de Chrome y timings de Fiddler/SAZ del **mismo intento**, si existen, con relojes correlacionados, ruta proxy y eventos de resolución/socket/TLS. No hay esos ficheros aportados y no pueden reconstruirse del HAR. Performance complementa ejecución/scheduling; no sustituye el transporte ni identifica por sí solo el coste del proxy. [Chrome: fases y dependencias de Network](https://developer.chrome.com/docs/devtools/network/reference#timing-explanation), [Chromium: NetLog](https://www.chromium.org/for-testers/providing-network-details/).

## 3. Legacy-E0-1: los 4339 ms después de manager

Origen temporal: `player:ads-manager`, player local **1**/manager **8**, slot1/ciclo1/token1. Son identidades locales del probe, no numeración de anuncios. Se enlaza el medio IMA local **6** con el recurso redirector GVT por coincidencia de identidad de media del path del probe y HAR; solo se publica su igualdad/hash, sin URL ni identificadores comerciales. No es el dummy/base media 2. El destino de Location/redirectURL de la entrada 302 coincide exactamente con la entrada 206 posterior.

| Hito | ms desde manager |
|---|---:|
| player:adsready | 3 |
| player:readyforpreroll | **5** |
| ima:LOADED | 558 |
| HAR 429: inicio redirector.gvt1, 302 | **591** |
| player:adstart | 599 |
| ima:CONTENT_PAUSE_REQUESTED | 615 |
| HAR 429: fin 302 | 2731,622 |
| HAR 470: inicio 206 del destino GVT | **2732** |
| media:loadedmetadata, medio 6 | 3789 |
| HAR 470: fin 206 | **4302,137** |
| core:first-frame | **4339** |
| core:revealed | 4352 |
| media:loadeddata / canplay / playing, medio 6 | 4443 / 4447 / 4450 |
| ima:IMPRESSION / STARTED | 4546 / 4566 |

La demora no es manager-sin-preroll: este callback aparece en 5 ms. `adstart→frame` son 3740 ms usando el evento player; el redondeo/hito core del informe aporta aproximadamente 3739 ms. La request de media empieza 8 ms antes del log adstart; no sumarlos como fases consecutivas. La fuente del hito frame es **request-video-frame-callback**, no canplay del dummy. En ese snapshot, el medio 6 tiene currentTime=0, paused=false y readyState=1; loadeddata/canplay/playing se observan después. Se conserva esa secuencia sin convertirla en un fallo del decoder ni certificar píxel perceptible. Performance/filmstrip permitirían interpretar despacho/composición; no se impone otro orden ni se mueve el reveal.

| Entrada | Total ms | connect (ssl incluido) | blocked | wait | receive |
|---|---:|---:|---:|---:|---:|
| 429, 302 | 2140,622 | 1798,926 (532,776) | 213,207 | 113,407 | 12,913 |
| 470, 206 | 1570,137 | 820,723 (116,374) | 112,585 | 41,477 | 594,646 |

Descomposición temporal sin doble cómputo: **591 + 2140,622 + 0,378 + 1570,137 + 36,863 = 4339 ms**. El primer término incluye trabajo previo al inicio HAR; el último es fin HAR→frame y no CPU/decodificación pura. Los 3711 ms de las dos entradas constituyen tiempo observado de entrega/conexión, no 3711 ms demostrados de bloqueo de reproducción. loadedmetadata ocurre durante la respuesta 206; el navegador puede consumir progresivamente el medio.

La petición usa `Range: bytes=0-`, la respuesta es `video/mp4`, `Content-Range: bytes 0-498318/498319`. HTTP 206 es aquí respuesta al rango, sin evidencia de error/reintento publicitario. Las otras dos sesiones tienen el mismo identificador de media GVT y rango/tamaño final, pero no queda acreditada la misma línea GAM ni igualdad de condiciones comerciales. PSP-E0-1 incluso alcanza frame unos **146 ms antes** del fin HAR de su 206: completar la transferencia no es condición universal del primer frame.

Los snapshots muestran medio IMA 6 evolucionando desde readyState 0 a reproducción; el anchor es elegible y no hay eventos QA de recovery/deferred/cancelled/pause durante manager→frame. Esto no prueba ausencia absoluta de pausa interna, buffering o tareas no instrumentadas. Los intervalos sin callback pueden incluir init/start del plugin, selección/preload/buffering, scheduling, decodificación o espera SDK. No hay marca directa de entrada a AdsManager.start ni Performance; los callbacks de media 2 previos son del dummy y no acreditan progreso del anuncio. No se justifica cambiar autoplay, timeout, start, first-frame o reveal.

## 4. Ocho SDK y ocho bridges en Legacy: atribución disponible

El HAR no exporta `_frameId`/frameId/loaderId por request. **pageref=page_7 es navegación, no iframe.** No se puede construir un mapa fiable de ocho frames/player/slots con él. Sí se preservan stacks de initiator, lo que permite distinguir la ruta primaria de Video.js de las rutas VPAID; atribuir un slot concreto a estas últimas queda pendiente.

| Recurso / índices HAR Legacy | Evidencia de initiator | Clasificación |
|---|---|---|
| ima3.js **276** | `_gam_kv_.js:loadDependencyScript → resource → branch → run/prewarm` | SDK del loader InText E0, una entrada |
| Bridge **346** | `ima3.js → videojs.ima.min.js:initAdObjects/onPlayerReady → video.min.js` | Bridge del primer player InText, uno |
| ima3.js **344, 354, 364** | `vpaid_adapter.js → Seedtag → pubads_impl.js` en stack/parents | Ruta de creatividad VPAID/GPT; no son otras tres cargas del coordinador E0 |
| ima3.js **410** | `vpaid_adapter.js`, verificación DoubleVerify, Seedtag/GPT en parents | Otra ruta VPAID; no atribuible al primer player Video.js |
| ima3.js **869, 1148, 1339** | Adaptador VPAID y Seedtag | Empiezan después del COMPLETE inicial; no son tres solicitudes del primer vídeo |
| Bridges **359, 370, 378, 412, 871, 1150, 1341** | `ima3.js → vpaid_adapter.js` (`rc`, `m.na`, `Ta`), sin ruta Video.js | Compatibles con instancias VPAID de esas integraciones; no se emparejan uno a uno por proximidad temporal |

Los índices 364, 410, 869, 1148 y 1339 de ima3.js tienen transfer/body size cero y tiempos inferiores a 1 ms, compatibles con reutilización/caché; no hay flag explícito de memoria/disco y `cache={}` no certifica el origen. Los otros tres SDK y los ocho bridges tienen transferencia positiva registrada. No convertir entradas instantáneas en ocho descargas de red, ni el total de recursos en número de anuncios.

Se identifica la procedencia **del código iniciador**, no necesariamente ownership comercial: una creatividad GPT/VPAID podría pertenecer a otro slot del artículo, a slot2 InText o a un refresh posterior. Sin frame/slot/request correlacionados no se excluyen esas posibilidades. Tampoco se atribuye el fallo a Seedtag, DoubleVerify o RichAudience por aparecer en la página. No se demuestra doble request primaria del slot1/ciclo1; la contribución de esas integraciones a CPU/red es hipótesis de entorno pendiente de Performance.

## 5. PSP frente a Legacy en el mismo artículo

El código actual separa señales: `GAMExp` fija dualMode al construir desde `window.__disable_gam_kv__===true` (`_gam_kv_.js:19455`); `resolveIntextGptApi:2754` detecta `googletag.__ctrl` y selecciona baseObject/innerObject o window.googletag. `getIntextRuntimeIdentity:3095` combina esas señales con la fuente random real. La asignación E0/E1 usa su propio literal/closure y no selecciona PSP.

Se recuperó **el mismo migrate.js** en las tres capturas: 588807 bytes, SHA256 `accb4531366c021b10424e7be04f177df901aacf930be7aafd8b0fbd19f5da2d`, versión declarada PSP 1.80.221. Su código tiene un gate de adopción: sitio/URL/site version determinan b; en Marca, rama mobile b=0,2, otra rama b=0,8 y una exclusión de URL b=0. `pspDebug=yes/no` elige explícitamente; en otro caso evalúa `Math.random() < b`. Al entrar instala proxies y pone `window.__disable_gam_kv__=!0`. Es un mecanismo **observado en el código capturado**, no una recomendación de cambiar cookie, random o routing. Site version procede del detector de integración y no se infiere del tamaño de la ventana/emulación.

Los logs iniciales y la identidad exportada son coherentes: en las dos PSP existe controller/baseObject usable; en Legacy no hay controller y se resuelve window.googletag usable. La identidad de página/path coincide y las requests principales del artículo no llevan query. El script migrate.js está presente incluso en Legacy; **su descarga no significa que el gate haya activado PSP**. Las cookies del request no están capturadas y no se registró el sorteo ni sus entradas exactas al decidir.

Dictamen: existe una condición conocida suficiente para permitir variación entre navegaciones del mismo artículo. No hay incidencia de routing demostrada ni contradicción dualMode/pspDetected en estas tres muestras. No se puede afirmar cuál rama concreta (override, sorteo, site-version/exclusión) produjo cada resultado, ni excluir un problema de orden en otra sesión. Dejar una tarea separada de trazabilidad del gate/bootstrap si se necesita explicar la selección exacta; no modificar el routing para fabricar Legacy ni mezclarlo con el bug anterior de entregar E1.

## 6. Display después de COMPLETE y superficie de transición

`video_to_display_display_missing_keep_video_surface` se emite en el refresh cuando el contenedor Display no está conectado y `ensureIntextTransitionBridge` selecciona temporalmente la superficie vídeo conectada (`_gam_kv_.js:7900,13423–13448`; equivalente en Manager `:11634`). El código conserva altura/loader mientras la ruta askDisplay recrea Display, lo abre y después oculta la superficie vídeo (`:11310` y siguientes). **Este bridge DOM no es el iframe bridge IMA** auditado en red.

Secuencia de primer refresh slot1/ciclo2, ms relativos a COMPLETE:

| Hito | PSP-E0-1 | PSP-E0-2 | Legacy-E0-1 |
|---|---:|---:|---:|
| Mensaje display missing / conservar vídeo | 117 | 81 | 248 |
| Display recreado / puente Display abierto | 1156 | 1045 / 1046 | 2499 |
| slotRenderEnded filled | 1845 | 1771 | 3297 |
| display_wrapper_opened | 1868 | 1790 | 3332 |

Los tres primeros refresh tienen gamFilled/realFilled/opened=true, empty=false y no son fallback. En PSP el debugger registra impressionViewable; en Legacy figura false al exportar y house=true. Los summaries PSP tienen slotResponseReceived=false y latencias de respuesta null pese a render/fill/apertura observados: cobertura del hito incompleta, no prueba de ausencia de respuesta. No inferir valor económico de house, impresión visible ausente para siempre, pérdida comercial ni fill-rate por estas tres filas. El puente abierto para loader precede a la apertura final medida tras render: son hitos distintos. Slot2 y refresh posteriores siguen separados. Persisten la revisión visual P1.3c y el backlog de targeting; no hay cambio Display justificado por este mensaje aislado.

## 7. Hechos, hipótesis y evidencia pendiente

| Pregunta | Estado | Evidencia necesaria antes de corregir |
|---|---|---|
| ¿Se restableció E0? | Sí, en estos tres cuerpos/exports; contexto mal etiquetado | Seguir verificando bytes/brazo/contexto en futuras capturas; no asumir reparación global de Fiddler |
| ¿Los 11 s son TLS del origen? | No demostrado; SSL registrado solo 95 ms | NetLog + SAZ/timings de la misma conexión y entorno proxy |
| ¿Manager espera preroll 4,339 s en Legacy? | Contradicho: preroll a +5 ms | La fase larga es posterior; media/Performance para separar entrega de ejecución |
| ¿El medio contribuye a esa fase? | Sí hay cadena 302→206 y correspondencia con medio IMA 6; solape fuerte | No cuantifica espera necesaria de playback ni CPU; falta trace |
| ¿Hay ocho anuncios InText duplicados? | No demostrado; initiators separan ruta primaria y VPAID | Frames/slots/CDP de la misma sesión si se necesita ownership fino |
| ¿PSP/Legacy exige bug de routing? | No; gate condicional/aleatorio capturado lo permite | Inputs/resultado del gate y orden de bootstrap si hace falta atribuir cada navegación |
| ¿Display falló porque el wrapper faltó al comenzar? | No en estas secuencias: se recrea, rellena y abre | Visual y continuidad P1.3c; no corregir una ausencia transitoria como NO-FILL |
| ¿CPU/equipo, SDK o proxy explican la variación restante? | Hipótesis abiertas | Performance y datos de entorno/NetLog, correlacionados; no otra tabla de medianas |

**Decisión:** sigue siendo necesario un diagnóstico de entorno/ejecución antes de proponer correcciones. Primero recuperar SAZ/NetLog/Performance ya existentes si los hubiera, sin repetir PSP-E0-1 para perseguir los 11 s. Si no existen, se prepara **como máximo un E0 Legacy adicional** con Performance desde antes de activar y HAR completo; NetLog y captura Fiddler en ese mismo intento son complementos recomendados para transporte. Su objetivo es observar ejecución/media y completar el segundo control Legacy, no reproducir obligatoriamente el outlier PSP ni medir mejora comercial. [Guía vigente](intext-p14a2-fiddler.md).

No se demuestra necesidad de otro probe. Los eventos actuales ya cubren llamada SDK retornada, manager, preroll, media, frame y transición. Una propuesta futura de instrumentación pasiva solo tendría sentido si la captura externa sigue dejando una pregunta concreta irresoluble (objeto AdsRequest, evento nativo del loader, gate de routing o frame ownership); se presentaría aparte, sin implementar hooks ahora ni modificar métodos/tiempos/publicidad. Si el único intento adicional resulta PSP o carece de trace útil, guardar el resultado real y detenerse, sin navegar repetidamente hasta obtener Legacy.

P1.4-A3 permanece bloqueada por falta de comparación controlada/atribución, B/C/enforce inactivos. P1.3c visual pendiente. Producción, QA, core, coordinador y bundles conservados; sin commit/push/despliegue. Las comprobaciones de esta revisión son offline de evidencia, hashes y documentos; las suites históricas no se presentan como una nueva ejecución.
