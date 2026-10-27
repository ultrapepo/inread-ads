# P1.4-A2 — Matriz de evidencias y decisión tras Performance

26/10/2026. Revisión offline del informe completo de Descargas y sus cuatro originales; contraste con código actual, A1 y entregas A2 anteriores. **Recopilación descriptiva Legacy E0 2/2 cumplida; causalidad de outliers abierta.** Sin nuevo ensayo, probe, bundle, cambio de runtime ni activación A3/B/C/enforce. P1.3c visual abierta.

## Fuentes nuevas y trazabilidad

SHA256 recalculados sobre bytes originales, sin modificar Descargas. El registro [Legacy Performance](intext-p14a2-legacy-performance-evidence.json) contiene hitos, índices HAR, geometría y eventos trace saneados; no publica URLs publicitarias completas, queries, cookies, campañas o cuerpos XML.

| Original en Descargas | Bytes | SHA256 |
|---|---:|---|
| Informe_P14A2_E0_Legacy_Performance_2026-10-26.md | 12077 | `d90b12ea1278fd1f69d8c50596973dc634cef0b53a22c5448734218d28aaadc2` |
| E0-26oct-json.json, QA/integración | 1000638 | `9eb904c04abd699d3a5cbf6a0cdfdbd42ce5e25a2aa33093914879ba7d427026` |
| E0-26oct.json, debugger | 627251 | `9e2da363596304b583a38aa3a491d63ce23bc2022060c8c9948564fedf798af2` |
| www.marca.com-mobile E0-26oct.har | 49059951 | `054b2a3bde270de68299d1ccfeaf70a40fcf755679c81230f2e5ba4d13924ef9` |
| E0-26OCT-performance.json, **GZIP** | 28940995 | `231c4503ffc48077d13f879453eb43d3db4b52f804a75c3bb4169e15595a158e` |

El body `_gam_kv_.js` recibido tiene 894934 bytes y hash E0 `18299f4fa54e151ff045e6d355c554055bdc85399ddec29eb5e9e85990bcfdfc`. Validación por body, assignment_fixed y runtime, no por nombre de fichero. El HAR contiene 813 entradas. Performance descomprime a **238554799 bytes / 810091 eventos**; no es JSON UTF-8 directo pese a su extensión.

## Cohortes: recuentos descriptivos, sin pooling causal

| Grupo, fecha | Brazo/contexto auténtico | Resultado inicial | Cobertura y límite | Registro |
|---|---|---|---|---|
| Original PSP/dual 22/10 | 4 E0 + 6 E1 | E0: 2 COMPLETE/2 timeout; E1: 4 COMPLETE/2 timeout | HAR GAM filtrados; sin cuerpos SDK de esas sesiones, sin trace | [Evidencia original](intext-p14a2-evidence.json) |
| Legacy 22/10, HAR completos | **6 E1**, incluidos los tres llamados E0 | 5 COMPLETE/1 timeout | Bridge 3.794.0; pre-VAST hasta 21232 ms; sin trace del fallo | [Evidencia Legacy E1](intext-p14a2-har-complete-evidence.json) |
| PSP E0 26/10, A2-Legacy-E0-real-1/2 | 2 E0 PSP/dual | 2 COMPLETE | Nombres invertidos; bridge 3.795.0, connect PSP-E0-1=11112 ms | [Tres E0 anteriores](intext-p14a2-e0-real-evidence.json) |
| Legacy E0 25/10, A2-PSP-E0-1 | 1 E0 Legacy | COMPLETE | Manager→frame 4339 ms; 302→206; sin Performance de ese intento | [Mismo registro anterior](intext-p14a2-e0-real-evidence.json) |
| Legacy E0 26/10, **Legacy-E0-2 / E0-26oct** | 1 E0 Legacy | COMPLETE | Bridge 3.796.0; trace posterior a prepare, screenshots sin COMPLETE | [Nuevo registro separado](intext-p14a2-legacy-performance-evidence.json) |

Los dos Legacy E0 cumplen **2/2 controles descriptivos**. No están emparejados con E1 de otra fecha/SDK/condiciones; no inferir mejora, regresión, tasa comercial ni causa. Los diez PSP originales no incorporan los seis Legacy E1 ni los cuatro E0 posteriores a sus denominadores. Las evidencias JSON anteriores permanecen intactas.

**Cobertura de la revalidación actual:** 35 originales disponibles en Descargas tienen SHA256 cotejado; los 31 archivos del primer estudio PSP 4+6 (30 capturas y su informe) ya no se localizaron allí. Para ese antecedente se utiliza el JSON histórico preservado y los informes A2, sin afirmar una nueva lectura ni revalidación de sus bytes. Los cuatro originales nuevos y el informe Performance sí se verificaron directamente. Esta limitación no solicita nuevas capturas.

## Matriz de contraste de conclusiones

| Pregunta / conclusión del informe | Evidencia original y código actual | Dictamen | Límite / consecuencia |
|---|---|---|---|
| ¿Segundo E0 Legacy auténtico? | QA arm/fixed=E0, cero conflictos/pérdidas; body hash E0; dualMode=false, pspDetected=false, randomSource=gexp-owner-random; ramas sin solape | **Confirmado**, Legacy-E0-2 | No certifica reparación global de AutoResponder ni causa de los falsos E0 del 22/10 |
| ¿Mayor espera previa es geometría? | viewport wait 17:17:09.385→15.294, duration=5909; prepare ready 09.384; dependencies ready 09.381 | **Confirmado para esta navegación** | No atribuir winner→frame 11233 ms solo a descarga; prewarm/prepare/dependencias se solapan |
| ¿Residual cero prueba mejora A? | activation_dependencies_ready residual=0; `activationWait()` mide await prepare; `activate()` comprueba geometría después | **No**; KPI insuficiente | Efecto suelo 0–1 ms; A3 exige primera oportunidad/primera pasada, sin frame/censura y seguridad |
| ¿E0 QA equivale al histórico P1.3c? | Coordinador A1 E0 serial y mismo probe/dummy que E1; histórico sin coordinador A1 | **No**; comparadores distintos | Efecto común coordinador/probe no aislado; histórico no se ha vuelto a ejecutar |
| ¿Bridge tiene coste JS medido? | pid 2984/tid 18584: RunTask 535,861, ParseHTML 535,628, EvaluateScript 409,036, v8.compile 284,938 ms | **Sí**, costes anidados | No sumar; HTTP 200 no prueba fin de ejecución/handshake, ni explica los timeouts de otro intento |
| ¿GC y tareas explican toda la latencia? | Marca pid 23580/tid 3012: tarea 204,751 ms y MajorGC 165,228 ms; ocupación RunTask ~2,09 s/~60%, iframe ~1,21 s/~34% | **Costes observados, atribución incompleta** | Unión de tiempo de pared por hilo, con solape entre hilos/red; no CPU exclusiva de InText ni bloqueo único de varios segundos |
| ¿GAM tarda segundos en responder? | VAST HAR 17:17:16.782→17.037, 200/255,341 ms; ads-request→inicio HAR 1248 ms | **No en este intento** | Sin XML: no reconstruir wrappers ni creatividad final; timestamp HAR incluye colas |
| ¿Contribuye transporte del medio? | GVT 302 ~1012 ms, connect ~966,5/SSL ~893,6 incluido; destino 206 ~279,6 ms, Range bytes=0-, ~498 KB; frame ~182 ms después | **Contribución temporal respaldada** | Buffering/decoder/scheduling no aislados; 206 legítimo, no anuncio duplicado |
| ¿Se aisló Fiddler/origen/TLS? | HAR peer 127.0.0.1/connection 8888, sin NetLog/SAZ | **No** | No adjudicar los 11112 ms históricos ni sumar SSL a connect |
| ¿Anchor elegible casi invisible? | observer:attached ratio 0,0022497559, top 921,663/viewport 922; región prevista top 1091,662; código overlapX>0 && overlapY>0 | **Confirmado**, ~0,225% | Motiva diseño B shadow offline; no fija umbral ni autoriza gate |
| ¿Este intento empezó fuera de viewport? | Anchor ~3,43% en ads-request y 1 en manager/frame, documento visible tras scroll | **No demostrado** | firstFrameOutsideViewport del debugger mide wrapper cerrado; no confundir con anchor pasado ni Active View |
| ¿Puede cerrarse P1.3c visual? | Screenshot desde ~45,6 ms hasta ~14225,4 ms del trace; COMPLETE posterior | **No**, sigue abierta | Filmstrip cubre inicio, no cierre/restore/flash negro final. Reveal/native IMPRESSION no cierran ese gate |
| ¿Display posterior es fallback? | COMPLETE core 29.113, request 31.545, refresh=true/fallback=false; render filled 32.957, open 32.995, viewable 34.051 | **Refresh**, no fallback | **P2: 2432 ms COMPLETE→request**, luego 1412 ms request→render y 38 ms render→open; investigar scheduler/autorizaciones/geometría |
| ¿Slot2 refresh es NO-FILL? | Ciclo1 fill/open/viewable; ciclo2 fill/open, sin impressionViewable al exportar | **No**, señal censurada | No afirmar ausencia perpetua de viewability |
| ¿Puede cerrarse A2? | Segundo E0 válido y captura Performance acordada recibida | **Sí, recopilación descriptiva** | Causalidad pendiente; no A3 ready ni ampliación automática |

Las ocupaciones de hilos son estimaciones sensibles a la correlación de relojes: proyección inicial desde metadata y anclaje aproximado del mismo ResourceSendRequest de media al HAR difieren ~144 ms. Se conserva método/eventos en el JSON; esa diferencia no se presenta como drift exacto ni como nueva latencia causal. Screenshot abarca ~14,18 s entre primera y última imagen y termina ~14,23 s desde el comienzo de la ventana: son dos medidas distintas y compatibles con el informe.

## Hipótesis abierta y siguiente fase recomendada

**H-IMA:** la demora extrema **retorno requestAds→primer VAST/AdsManager** puede acumular trabajo asíncrono de ejecución/disponibilidad del bridge y/o establecimiento de conexión bajo proxy. Los outliers carecen de cobertura suficiente del mismo intervalo para separar esos mecanismos o un efecto común del coordinador/probe frente al histórico. Dependencias listas y retorno SDK ya están acreditados; un éxito nuevo no demuestra reparación de aquel silencio. El caso antiguo manager-sin-preroll continúa separado de los fallos sin manager.

**H-QA, subhipótesis concreta sin aislar:** la capa común del coordinador/probe A1 podría contribuir a la demora mediante scheduling también en E0. E0 conserva esa capa; su secuencialidad no es un control sin ella. No se atribuye el fallo a QA ni se la exonera. Un protocolo futuro debe variar por separado esa capa, proxy y grabación Performance, manteniendo los otros factores comparables.

**Recomendación:** cerrar recopilación A2 y preparar el diseño **offline de P1.4-B shadow**, sin implementación/activación. Entregable concreto: ficha de candidatos sobre anchor y región prevista, primera elegibilidad de control y denominador fijo, primera pasada/reentrada y oportunidades preservadas/perdidas, cobertura faltante y límites contrafactuales. La evidencia de 0,225% identifica un problema geométrico medible; nuevas repeticiones de éxito no aislarían H-IMA. No convertir shadow en garantía de cero STARTED/IMPRESSION offscreen.

Si se prioriza resolver H-IMA, preparar antes un protocolo separado y acotado de comparación proxy/directo y control histórico sin coordinador, con condiciones bloqueadas, eventos discriminantes por request/frame y criterio de parada. Una espera socket/conexión acreditada en el mismo outlier respaldaría transporte; bridge respondido con trabajo/colas de su renderer respaldaría ejecución; silencio sin cobertura mantiene unknown. No inferir causalidad por una única pareja, no incorporar hooks ni ejecutar capturas desde esta revisión.

## Archivos y verificación

- [Informe causal actualizado](intext-p14a2-pre-vast-environment.md).
- [Auditoría de red/medios/Performance](intext-p14a2-e0-network-media-audit.md) y [AdsRequest/IMA](intext-p14a2-adsrequest-ima-audit.md).
- [Guía QA vigente](intext-p14a2-fiddler.md), [aclaración E0/histórico en A1](intext-p14a-qa.md) y [roadmap con A3/P2 corregidos](intext-p14-mobile-latency-viewability-design.md).
- [Evidencia saneada nueva](intext-p14a2-legacy-performance-evidence.json): hashes originales, hitos, geometría, timings, tareas y cobertura. La revisión usa la función pura existente `analyzeSession`; no ejecuta su CLI que sobrescribe evidencia histórica ni reconstruye bundles.

La validación de esta entrega es documental y offline: hashes, coherencia de hitos/intervalos, lectura GZIP, enlaces y preservación de fuentes protegidas. No es una nueva ejecución de suites históricas ni una validación Chrome comercial. Core, IMA, AdsRequest, timeouts, waterfalls, targeting, PSP/Prebid/APS, animación, PiP y Display sin cambios. Sin commit, push o despliegue.

Resultado registrado en el JSON nuevo: **PASS**, 35 originales disponibles verificados, **24 archivos protegidos sin cambios**, siete documentos y 76 enlaces locales comprobados. `git diff --check` sin errores; para documentos todavía no rastreados se comprobaron además UTF-8 y destinos de enlaces offline. Las cifras históricas de suites permanecen como registros de sus entregas.

Contraste estático: [_gam_kv_.js](../_gam_kv_.js), `getReadinessViewportState` (~11488), `preparePlayer/activate` (~16638/16692) y transición vídeo→Display (~13423); [coordinador QA](../tests/qa/intext-p14a-dependencies.cjs), `run`/rama E0 y `activationWait`; [builder](../tests/qa/intext-p14a-build.cjs) y [probe existente](../tests/qa/intext-p13c-integration-probe.cjs). Los símbolos prevalecen sobre las líneas. MCP del grafo intentado primero y rechazado por requerir aprobación con política never; se recurrió a lectura local, sin reindexar ni alterar el grafo.
