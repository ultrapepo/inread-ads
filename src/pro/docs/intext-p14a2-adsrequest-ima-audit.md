# P1.4-A2 — Auditoría de AdsRequest, bridge IMA y asignación

Auditoría base del 22/10/2026, conservada en las secciones 1–7; estado actualizado **26/10 tras Performance**. Sin ejecutar publicidad ni modificar runtime. Complementa el [informe causal A2](intext-p14a2-pre-vast-environment.md) y la [guía QA de recopilación cumplida](intext-p14a2-fiddler.md). Legacy E1, PSP y Legacy E0 siguen separados. [Evidencia del 22/10](intext-p14a2-har-complete-evidence.json), [matriz vigente](intext-p14a2-evidence-matrix.md).

## Estado vigente: 2/2 Legacy E0 descriptivos, causalidad abierta

`E0-26oct` aporta el segundo E0 Legacy auténtico con Performance, hash/assignment_fixed/contexto y ramas seriales verificados. La [evidencia nueva](intext-p14a2-legacy-performance-evidence.json) confirma retorno SDK→VAST 1248 ms, VAST 200/255 ms, manager→preroll 6 ms y manager→frame 1570 ms; COMPLETE sin timeout. Bridge **3.796.0**, evaluación 409 ms con compilación 285 ms dentro de tarea 536 ms; GC principal 165 ms y transporte GVT 302 ~1012→206 ~280 ms. Costes observados anidados/concurrentes, no explicación causal del silencio de los outliers históricos.

No se demuestra un defecto nuevo de AdsRequest ni activación de las ramas XML condicionales. El trace empieza después de dependencies/prepare; no aporta objeto AdsRequest completo, XML VAST ni NetLog/SAZ y sus screenshots acaban antes de COMPLETE. E0 QA incluye coordinador secuencial y probe; **no es el control histórico P1.3c sin coordinador**. Dos COMPLETE no aíslan ese efecto común ni autorizan A3. Recopilación A2 cumplida, sin más navegaciones/probes/bundles. H-IMA (demora asíncrona bridge/ejecución/transporte posterior al retorno SDK) sigue abierta. Próximo trabajo propuesto: diseño offline B shadow por anchor 0,225% elegible con región prevista fuera, sin implementarlo/activarlo; P2 registra COMPLETE→Display request 2432 ms como refresh, no fallback. P1.3c visual abierta.

## Antecedente 26/10 previo al segundo Legacy: controles reales y medios

Las cifras 1/2 y la propuesta de un intento adicional siguientes documentan el estado anterior; están cumplidas y sustituidas por el dictamen vigente. Las secciones 1–7 conservan la auditoría base, sin ordenar nuevas capturas.

Los tres nuevos HAR verifican E0 por bytes/assignment_fixed/loader serial; son **dos PSP/dual y un Legacy**, con nombres de contexto invertidos. Los tres COMPLETE no explican el timeout previo ni validan una mejora. Legacy está 1/2 frente al plan del 22/10. La [auditoría nueva de red y medios](intext-p14a2-e0-network-media-audit.md) reconstruye bridge connect=11112 ms (SSL incluido 95 ms), cadena GVT 302→206, manager→frame=4339 ms y preroll a +5 ms, más attribution por initiator de una ruta InText y siete VPAID en Legacy. Bridge 3.795.0, fechas/contextos diferentes y ausencia de Performance impiden comparación causal.

No aparece evidencia nueva que active las inconsistencias XML condicionales descritas abajo ni un defecto de AdsRequest que justifique modificarlo. Los múltiples recursos no acreditan requests publicitarias duplicadas del primer player; falta frame ownership fino. La variación PSP/Legacy es compatible con el gate de adopción observado en migrate.js, separado de E0/E1; su decisión exacta no está registrada.

**Decisión histórica, cumplida:** diagnóstico de entorno/ejecución antes de correcciones y un único E0 Legacy adicional con Performance. Recibido y contrastado como Legacy-E0-2; estado vigente 2/2, sin ampliación automática ni probe nuevo. Las lagunas del payload AdsRequest y evento nativo del loader siguen documentadas; no se demuestra que requieran hooks ahora. «Primero dos E0» en la base es un plan ya cumplido, no una nueva solicitud.

## 1. Código efectivo y alcance de la comprobación

Se leyó íntegro el informe de Descargas `Informe_P14A2_revision_HAR_completos_2026-10-22.md`, el informe anterior `A2-E1.md`, A1, el diagnóstico A2 y el diseño P1.4. Se contrastaron ambos cores, builder, coordinador, probe, manifiesto y cuatro variantes existentes. El MCP de conocimiento se intentó primero, pero devolvió «requires approval, but approval policy is never»; esta revisión utiliza lectura local. No se reindexó ni se alteró el grafo.

Se decodificaron offline los bodies JS de los seis HAR completos, sin abrir sus URLs. En los seis, `_gam_kv_.js` es E1, 894934 bytes, SHA256 `6356718da3b272d2c68ac208ac9147020b9b327ce6b6dc7b40af3317e3e58e11`; videojs-ima es 1.11.0, 36933 bytes, SHA256 `01b11a7a6a4b771ead01e2060b8983d0b37f6f3e01a7e74f0140eb04b69459c8`. El orden del plugin se verificó también en esos bytes, sin sustituirlos por el HAR antiguo ni por documentación actual.

Los QA exports `E1-2-debug.json` y `E1-3-debug.json` de Descargas corresponden, por reloj y hitos, a **A2-E1-2 y A2-E1-3**. Sus nombres no los convierten en las E1-2/E1-3 del estudio PSP anterior. Se conservan nombres originales y hashes de los 18 ficheros en la evidencia nueva. No se reescribe el JSON de evidencia del estudio anterior.

## 2. Construcción del request efectivo

Ruta actual: `IntextWaterfall._requestVideo` construye `buildGAMVideoTagUrl()` y lo entrega a `buildAndPlayVideo`, que asigna `creative.adTagUrl` incluso al reutilizar un creative preparado. Después del gate vigente, `activate()` construye Video.js y llama al `requestAds()` del core. Este devuelve una Promise comercial; es distinto del método homónimo de `google.ima.AdsLoader`.

Referencias de `_gam_kv_.js`: `buildAndPlayVideo:11978`, `_requestVideo:14863`, `buildGAMVideoTagUrl:15690`, constructor `:16591`, `requestAds:17381`, opciones `:18185`, `getVideoTagUrl:18376`. Equivalentes en `IntextManager.js`: `:10179`, `:12722`, `:13549`, `:14434`, `:15038`, `:15822`, `:16006`; los símbolos prevalecen sobre las líneas si cambia el fichero.

El core calcula `useAdsResponse = !!this.vastXml` y, si es falso, obtiene el tag con `getVideoTagUrl()`. Rechaza si faltan ambos. No crea directamente un `google.ima.AdsRequest`: pasa a `player.ima(options)` este literal, sin spread de configuración externa:

| Opción enviada por Intext | Valor / procedencia |
|---|---|
| `adTagUrl` | Tag GAM de `creative.adTagUrl` en la ruta observada |
| `adsRenderingSettings.enablePreloading` | `config.video.imaPreload.enabled !== false` |
| `id`, `showCountdown`, `disableAdControls` | `playerId`, `true`, `false` |
| `showControlsForJSAds` | `resolveVideoControlsConfig().showForJsAds` |
| `vpaidMode`, `autoPlayAdBreaks`, `debug` | `INSECURE`, `true`, `true` |
| `timeout`, `prerollTimeout`, `postrollTimeout` | 30000 ms cada uno; no son el límite comercial del core |
| `adsResponse`, `adsRequest`, `requestMode`, `vastLoadTimeout` | No se suministran en este literal |

El plugin capturado completa sus defaults (`requestMode:onLoad`), crea el AdsRequest, escoge tag antes que respuesta inline, añade dimensiones y señales de autoplay/mute, aplica al final propiedades de `settings.adsRequest` si existe, llama al loader y emite `ads-request` con el objeto `AdsRequest`. La secuencia coincide con el [source oficial 1.11.0](https://raw.githubusercontent.com/googleads/videojs-ima/v1.11.0/src/sdk-impl.js). El contrato público distingue [AdsRequest](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/class/google.ima.AdsRequest) y la llamada sin valor de retorno [AdsLoader.requestAds](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/class/google.ima.AdsLoader); retornar no acredita una petición HTTP ni resolución del anuncio.

Las señales de autoplay/mute se derivan de settings o de opciones/estado del player en el plugin capturado; no se deducen del éxito de `player.play()`. `timeout:30000` no se copia automáticamente a `AdsRequest.vastLoadTimeout`. Dimensiones del AdsRequest son las que lee el plugin del player, distintas del `sz` construido en el tag GAM. No se ha demostrado que sean inválidas. `enablePreloading` se aplica a AdsRenderingSettings al obtener manager: no demuestra despacho anticipado de VAST ni explica por sí mismo una espera sin manager.

### Inconsistencias y riesgos, con su condición de entrada

| Hallazgo | Clasificación estricta | Relevancia para estas seis sesiones |
|---|---|---|
| Si `this.vastXml` es truthy, el core pone `adTag=null` y anuncia adsResponse, pero omite `options.adsResponse` | Inconsistencia estática demostrada en una rama condicional: el XML no se entrega al plugin. Con settings normales, onLoad no solicitaría al faltar ambas entradas | El constructor y la ruta GAM inspeccionados no asignan `this.vastXml`; las seis registran «Full VAST tag URL», ninguna «Using adsResponse». No es causa demostrada del timeout y no se corrige aquí |
| `getVideoTagUrl()` termina en `bid.vastXml` | Defecto condicional de tipado demostrado: con solo XML inline en ese campo, se devuelve como tag, sin validación de URL | La ruta observada proporciona previamente el tag GAM. No hay evidencia de XML tratado como URL en estas capturas |
| Tag y XML presentes a la vez | El plugin prioriza tag; el core intenta elegir una sola ruta, con la omisión anterior | No se observa envío simultáneo de ambos; no afirmar ambigüedad activa |
| `settings.adsRequest` copia propiedades al final | Riesgo de sobrescribir tag/respuesta, dimensiones u otros campos si otro código lo suministra o muta | El core no lo envía y los defaults capturados no lo definen. No se ha demostrado una mutación externa ni un override en estos intentos |
| Tag incompleto/malformado o settings mutados en runtime | Hipótesis posible, sin objeto efectivo persistido | El debugger sanea la query del log «Full VAST tag URL». Solo conserva origen/ruta GAM; no permite certificar todos los parámetros del request fallido |

No hay defecto demostrado del AdsRequest **en la ruta ejecutada** que explique la ausencia de VAST. Tampoco se certifica que todos sus valores runtime fueran correctos: `player:ads-request` exporta snapshots, pero el probe actual no persiste el payload `event.AdsRequest`. Esa laguna queda identificada sin instalar otro listener ni modificar el probe. Los cinco VAST HTTP 200 tampoco validan por sí solos targeting, demanda final o XML.

## 3. Inicialización, bridge y callbacks

El coordinador solo carga infraestructura. `dependencies_ready` y `google.ima` disponible no significan que el core interno del iframe esté operativo. Al ready de Video.js, el plugin crea AdDisplayContainer y AdsLoader, registra callbacks nativos `ADS_MANAGER_LOADED`/`AD_ERROR` y emite `ads-loader`; onLoad solicita el anuncio. Después, el ready del core llama a `initializeAdDisplayContainer()` y al play vigente. En estas capturas, `ads-request` precede a la confirmación de inicialización del contenedor. No se reordena nada.

La API documenta que [AdDisplayContainer crea un iframe y carga el core SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/class/google.ima.AdDisplayContainer). El HAR acredita la descarga HTTP, no ejecución completa, intercambio de mensajes, callbacks ni estado listo del bridge. Su protocolo interno no está cubierto por el contrato público; atribuir un atasco específico a su handshake sería una hipótesis.

| Captura (todas E1 Legacy) | Bridge HTTP 200 (ms) | ads-request→VAST HAR (ms) |
|---|---:|---:|
| A2-E0 | 422 | 3377 |
| A2-E0-2 | 1668 | No observado |
| A2-E0-3 | 497 | 6425 |
| A2-E1 | 596 | 9161 |
| A2-E1-2 | 427 | 8271 |
| A2-E1-3 | 5115 | 21232 |

Todos anuncian `/js/core/bridge3.794.0_en.html`. No hay body del bridge en estos HAR: no se ha auditado su JS interno. En A2-E1-3 quedan aproximadamente **16,10 s entre fin HAR del bridge e inicio HAR VAST**, por lo que sus 5,115 s de descarga no agotan la demora. Los seis bodies `ima3.js` tienen hashes distintos; no demuestran seis comportamientos funcionales ni permiten responsabilizar una versión por hash aislado.

El callback del loader obtiene manager, configura listeners y emite `player:ads-manager`; luego avanza a adsready/preroll. Un fallo o excepción entre el evento nativo y esa emisión podría ocultar un manager al probe. Los listeners añadidos mediante `player.ima.addEventListener` solo se conectan si ya existe manager en ese plugin; el probe de integración cubre eventos del manager cuando lo observa, pero no registra directamente el evento nativo previo del AdsLoader. Ni `imaStarted:false` ni la ausencia de un log nativo con cobertura desconocida prueban que el SDK no lo emitiera.

## 4. Qué explica y qué no explica el silencio posterior al retorno

En A2-E0-2: dependencies ready antes de activar; loader→ads-request **13 ms**; inicialización del contenedor registrada; bridge HTTP 200 en 1668 ms; ningún VAST GAM observado en las 930 entradas completas y ningún manager observado. El límite se alcanza a **25023 ms desde activación** (24690 ms desde ads-request), seguido del fallback Display/ciclo 2 filled. El intervalo loader→evento no es duración pura de la llamada SDK. No hay evidencia de bloqueo síncrono de 25 s dentro de `AdsLoader.requestAds()`.

| Estado o explicación | Dictamen | Evidencia que discrimina |
|---|---|---|
| SDK aplaza trabajo mientras iframe/core inicializa o procesa mensajes | Hipótesis plausible | Trace con frames/recursos y tareas/mensajes del mismo intervalo; HTTP 200 no resuelve esa cobertura |
| CPU, long tasks, GC o scheduling retrasan SDK/callbacks | Hipótesis plausible, sin medición cuantitativa | Chrome Performance del documento y procesos/frames presentes; hilo ocupado vs hueco sin ejecución; carga de procesos por separado |
| Cola de red, DNS, socket/TLS, proxy o bloqueo específico del origen | Hipótesis plausible | Request concreta en HAR/NetLog y Fiddler/SAZ, blocked/connect/wait/errors, initiator/frame y relojes correlacionados |
| SDK procesa/error callback perdido, excepción o instancia obsoleta | Hipótesis plausible | Consola/stack, identidad/token, lifecycle de iframe/player, evento nativo del loader si los datos externos no bastan |
| Dependencias siguen pendientes y el core aún no llamó al SDK | Descartado para este intento por ready, loader y evento posterior al retorno | No añadir una llamada para «desbloquear» |
| E0 auténtico fue convertido internamente en E1 | Contradicho por bytes: se entregó E1; auditoría estática sin ruta de conversión | Verificación de entrega de la sección siguiente |
| Ausencia de iframe o fallo HTTP del bridge | Descartado en estas seis como explicación literal | Sí está el bridge HTTP 200; su ejecución sigue abierta |
| Caída total y continua de toda la red | Incompatible con tráfico paralelo observado | No descarta un bloqueo selectivo ni proxy/colas de IMA |
| E1 es condición necesaria del timeout | Descartado por los E0 reales de la cohorte PSP anterior, no por los falsos E0 nuevos | No demuestra que E1 carezca de efecto sobre latencia |
| PSP `__impression` es requisito necesario de este timeout | Descartado: el nuevo caso es Legacy sin PSP | No evalúa ni cierra las incidencias PSP anteriores |
| NO-FILL, RichAudience, cache Prebid, autoplay o wrapper cerrado como causa concreta | No demostrados; no se clasifican como causas descartadas universales | XML/error/cadena real o prueba específica. AbortError y wrapper cerrado también aparecen en éxitos |

`isInAdMode=true` con manager ausente puede expresar espera normal de contrib-ads; no acredita deadlock ni impresión. Sin VAST observado no hay respuesta con la que diagnosticar NO-FILL ni identificar bidder/creatividad final. La ausencia en el HAR completo refuerza el silencio de **lo capturado**, sin demostrar ausencia absoluta de actividad fuera de su cobertura.

## 5. Auditoría E0/E1: builder, bytes y asignación

`runtimeFor(arm)` admite exclusivamente E0/E1 y exige un único marcador de sustitución. `build()` exige hashes productivos protegidos y composición reversible; `buildAll()` nombra separadamente cada salida y registra su hash. No se ejecutó `buildAll()` ni se escribieron bundles. Se recomputaron SHA256 de los cuatro ya generados y coinciden con el manifiesto A1. Al normalizar solo el comentario `P1.4-A QA E0/E1` y el literal `/*__P14A_ARM__*/'E0/E1'`, ambas parejas son idénticas byte a byte. Runtime, probe y dummy se conservan.

En `install(target,arm)`, la primera instalación captura `arm` en el closure, crea una API congelada y una propiedad global no escribible/no configurable. `run()` solo consulta ese valor; la rama E0 espera Video.js→contrib antes de iniciar IMA SDK. `assignmentRequested()` registra reused/conflict y no reasigna. No se lee Fiddler, query, cookie, random, targeting ni un selector por slot para elegir brazo. No hay promoción automática E0→E1, ni en retry ni al reutilizar dependencias.

Una ventana ya fijada a E1 que reciba E0 conserva E1 **y registra conflict**, por diseño. E1 solicitado de nuevo registra reused. Una SPA, refresh de anuncio o reinyección no crea documento nuevo. Estas condiciones explican capturas contaminadas posibles, pero los seis exports actuales tienen `assignment_fixed=E1`, cero conflict y dropped=0. Junto al body E1 del HAR, la evidencia sitúa el error de control en la entrega/selección QA, no en una conversión interna demostrada.

No se han aportado reglas AutoResponder ni SAZ de su configuración: no se identifica cuál matcher, prioridad, ruta local, copia, caché o mecanismo de entrega suministró E1. «Regla incorrecta» es una explicación operativa plausible, aún pendiente de verificar. No se cambia el coordinador para compensarla. La [guía](intext-p14a2-fiddler.md) exige ruta efectiva, body/hash servido, arm, assignment_fixed y navegación completa, antes de aceptar los dos controles.

## 6. Decisión sobre un nuevo probe

**No hace falta un nuevo probe ni bundles ahora.** La identidad efectiva, el retorno de la llamada SDK, las dependencias, el límite del core, los cinco COMPLETE y la ausencia observada de manager ya están cubiertos. Faltan Performance, detalle de transporte/proxy y ejecución del iframe. Repetir una marca alrededor de requestAds no aporta esos datos.

Existen dos lagunas concretas: no se conserva el AdsRequest del evento existente y no se cubre directamente `ADS_MANAGER_LOADED`/`AD_ERROR` del loader antes del callback del plugin. Todavía no se ha demostrado que impidan el siguiente diagnóstico o que HAR/Performance/consola/SAZ no puedan resolverlo. Primero dos E0 verificados con instrumentos actuales y datos externos. No se activan los hooks condicionales del plan A2 anterior.

Solo si persiste el silencio con entrega correcta y esos datos siguen sin distinguir configuración efectiva de fallo SDK/callback, se propondría aparte un registro QA pasivo, saneado y removible del **payload ya existente** de ads-request y eventos públicos del loader. Sin URLs/tokens, wrappers de métodos, getAdsManager adicional, timers o requests nuevos. Es una propuesta futura condicionada, no instrumentación implementada ni autorización de otra fase.

## 7. Comprobaciones de esta revisión

Relectura íntegra del informe y contraste offline de seis HAR, seis debuggers y seis QA exports; hashes de entrada, salidas QA y plugin; comparación de parejas E0/E1; hitos recalculados con la función pura `analyzeSession` existente, sin ejecutar su CLI ni sobrescribir evidencia anterior. Se conserva la diferencia de hasta 1 ms entre timestamps y durationMs registrados. El JSON nuevo no contiene queries, headers, cuerpos publicitarios ni stacks.

La validación histórica 1336/1336 pertenece a la entrega A2 anterior; esta revisión documental no la presenta como una nueva ejecución. La comprobación final compara hashes del workspace antes/después y enlaces/documentos; no necesita reconstruir variantes ni lanzar el SDK. Producción, QA previa y P1.3c se mantienen. Sin enforce, commit, push, despliegue, ni activación A3/B/C.
