# P1.4-B-QA1-B — Plan de implementación, pruebas y presupuesto r1, revisión B

28/10/2026. **Plan, no implementación. Todos los tests y mediciones futuros de este documento están NO EJECUTADOS.** Hoy solo se validan los documentos y la integridad de los archivos previos. No se han repetido las 110 pruebas aprobadas de QA1-A ni se presenta su resultado histórico como ejecución de QA1-B. Véanse [diseño](intext-p14b-qa1b-acquisition-design.md), [matriz](intext-p14b-qa1b-data-matrix.md) e [integridad](intext-p14b-qa1b-integrity.json).

Revisión documental R1/R2 del **31/10/2026** (`r1-review-B`). Se añaden G07–G15 y A01–A06 como casos propuestos, **sin implementar ni ejecutar tests**. La tabla de cambios se conserva en el diseño. Nivel A significa validez factual de una muestra; B significa integridad poblacional y autorización de tasas, según diseño 7.1 y matriz 4.1.

Cotejo documental **13/11/2026**: ampliar G13 y proponer G16/A07/A08 para el descriptor local, la deduplicación y las condiciones por tasa. Todos continúan **sin implementar ni ejecutar**. La integridad compara los 360 originales contra su estado al inicio de este cotejo, con diferencia de bytes del `.sty` declarada frente a baselines anteriores y preservada.

## 1. Etapas futuras y puertas de aprobación

| Etapa propuesta | Trabajo y datos | Aceptación antes de avanzar | Estado actual |
|---|---|---|---|
| I. Contrato offline | Schemas nuevos, registro de identidad sobre fixtures reales/sintéticos, bridge QA0, almacenamiento compartido y generador de copias | Unknown/ownership/contabilidad fieles; constructor acepta límites reducidos; reproducibilidad y rollback | Solo diseñada; implementación bloqueada |
| II. B0 + observación poblacional parcial | Taps mínimos en copias QA: node/nav/fetch/cycle/winner/handoff, tres rutas de wait vídeo y guard final true/false, terminal; exclusiones del inventario | A acreditado y cobertura funcional del perfil declarado por distribución/ruta, invariancia de guards/IO/decisiones, gaps/censuras explícitos y presupuesto total medido. B puede seguir insuficiente, sourceComplete=false y tasas exactas prohibidas | Bloqueada; sin player, SDK o P nuevos para observar; no completitud global prometida |
| III. P pre-player | Perfil de flujo estático, adquisición compartida, bracket/revisiones y Q1–Q5; B1–B3 observacionales | Modelos estimados separados de medidas; ningún P de otra etapa; lectura/layout y heap dentro de presupuesto | Bloqueada; sin selección final de umbral |
| IV. Outcomes | Manager/medio/source-epoch, metadata de RVFC existente, reveal/visibilidad por fronteras ya ejecutadas | Binding y atribución verdaderos, unknown cuando falta fuente, ningún registro/cadencia adicional | Bloqueada; no requisito para aceptar B0 |

Cada etapa requiere autorización expresa de alcance e implementación; una aprobación del diseño no autoriza navegación, medición o captura. Una captura eventual se revisaría aparte y no reabriría automáticamente A2. No avanzar por tener snapshots, cero dropped o éxito IMA. B4/B5, B runtime/enforce, A3/C y cambios comerciales quedan fuera.

La aceptación funcional de II puede permitir proponer III/IV con B insuficiente si se acredita A, se declaran todos los gaps y se mide el presupuesto; requiere revisión independiente y autorización expresa de ese avance. Las tasas exactas tienen otra puerta: perfil de cobertura completo aprobado independientemente antes de instanciarlo, evidencia de todas las fronteras del ámbito y condiciones QA0 de cada tasa. No promover el primer perfil ni convertir un informe externo en flags nuevos del export.

## 2. Inventario de diffs futuros, aún inexistentes

Todos los originales, QA0, QA1-A, coordinador E0/E1, probes y bundles congelados permanecen intactos. Los cambios siguientes se aplicarían **solo a nuevas copias QA mediante un generador nuevo**, con hash base, coincidencias exactas de anchors/AST, diff revisable, hash de salida y fallo si el código base cambia. No copiar Manager desde gam ni viceversa.

| Futuro diff | gam / Manager | Datos añadidos y protección comercial |
|---|---|---|
| Registro de objeto/root/node/ciclo | IntextManager/Placement/Node; beginVisualRender; startIntextTelemetryCycle | Aliases y referencias observadas en fronteras ya existentes, sin atributos DOM, Math.random, storage o targeting. No se crean ciclos/tokens |
| getReadinessViewportState | 11488 / 9706, incluidos returns tempranos | Staging por identidad del mismo resultado y locales; mismo número de evaluaciones/lecturas originales, sin cambiar forma pública del resultado. Cualquier lectura de validación extra es QA, no guard nuevo |
| Consumidores primarios, selector completo | check común llama al guard 11537 / 9755; callers W2 11983/10184, W3 12031/10232, W4 16698/14539; C1 final 16701/14542 | Tres callers separados y mismo resultado por ejecución; no quinto caller del motor común ni otro guard al resolver wait. True/false sin alterar cortocircuito, finish/throw/await, IO/listeners. Inventario exhaustivo en diseño 3.1 y selector matriz 2.1 |
| Exclusiones del comparador primario | W1 Display; C2 no-fill; C3/C5 diagnóstico; C4 preparación; C6–C8 recuperación; C9 reveal; C10/C11 plugin-init/ready, con referencias por distribución en diseño 3.1 | Conservar dato factual en raw/serie propia; no control primario observado/fiable ni Dc retrospectivo. No añadir evaluaciones; guard no ejecutado no es false. Inventariar no autoriza instrumentar todas estas series en II |
| Fetch/winner/direct auction | 13046/13113/13297 / 11247/11314/11498 | Borrow de generación/decisión/ciclo reales. Native generation ausente → raw/gap. No redibujar auction ni resolver winner desde B |
| Preparación/handoff/cleanup | 12735–12851 / 10936–11052 y cleanup | Leer referencias antes de que core las retire; no invocar valid/claim/release/cancel ni mover lease. Distinguir entry.generation de fetchGeneration |
| Frontera pre-Video.js | activate y createPlayerForActivation | Snapshot del guard previo, no apertura/clonación/creación para observar. No alterar prepare/requestAds o waits |
| Manager/medio/frame/reveal | Callbacks existentes de requestAds; bind de _adMediaEl; RVFC; reveal closures | Leer objetos/argumentos ya recibidos y variables ya calculadas. Sin listeners nuevos, getter SDK adicional, otro RVFC o cambio de confirmación/reveal/settlement |
| Adaptador nuevo | Módulo QA1-B independiente | Ingreso unidireccional; usa API pública de QA0. No inspección de arrays/cierres del probe, no modificación del ledger/evaluador o parser QA1-A |
| Verificación/export nuevos | Nuevo perfil QA1-B y manifiestos | Hash base→diff→artefacto servido/CSS/config con cotejo de bytes independiente. No ampliar ARTIFACTS de QA1-A para aceptar un nuevo bundle |

Protecciones específicas de distribución: gam conserva defaultMuted=true y sus llamadas de animación inicial; Manager conserva su ausencia donde corresponde. Pruebas de diff deben rechazar cualquier cambio en autoplay, timeout, targeting, Prebid/APS/PSP, AdsRequest, waterfall AUTO, Display, refresh/fallback, first-frame, PiP o animación. Se verifica tanto diff como orden/huella de efectos: una igualdad superficial de métricas no basta.

No se modifica el builder A1 para insertar B ni el probe protegido para fabricar un bus. La nueva composición puede tomar sus versiones como inputs congelados; toda transformación adicional vive en archivos nuevos y se revisa por separado. Un flag QA solo puede desactivar su propia observación; nunca seleccionar un flujo comercial alternativo.

## 3. Casos de prueba que habría que implementar

Todos deberán ejecutarse por distribución, path soportado, cohorte/versión y etapa. No mezclar PSP/Legacy o E0/E1. Un mock que repita el evaluador no es oráculo. Usar ramas reales del productor en laboratorio autorizado, fixtures trazables, resultados matemáticos independientes y comparación de huellas de efectos; no envolver SDK/requestAds para hacer que el test pase.

| ID | Caso / estímulo | Oráculo y resultado esperado |
|---|---|---|
| G01 | C0=true y false: below, passed, horizontal, hidden, zero-size/no-render | Exactamente el resultado original del guard. Ambos booleanos registrados sin cambiar la rama |
| G02 | Anchor-missing/rect ausente y excepciones originales | No ejecutar lecturas que la rama omitía; raw con razón. Identidad incompleta → unknown/no admisión, sin anchor de relleno |
| G03 | Contador de invocaciones y cortocircuitos | Una llamada original, ninguna reevaluación QA. Guard no ejecutado ≠ false; excepción QA no altera excepción original |
| G04 | recordReadiness entre guard y creación cambia lecturas | C0 conserva el resultado anterior y su muestra; diagnóstico no lo sobrescribe ni incrementa Dc |
| G05 | Proximidad/preparación vs activación | reason below puede permitir preparación, pero no C0=true ni primera elegibilidad de activación |
| G06 | Wait varios false, true, token stale, fallback IO/listeners | Mismos thresholds, márgenes, invocaciones/finish/cleanup; sin subscripciones nuevas ni resolución adelantada |
| G07 | W1 Display true, tanto winner inicial Display como fallback Display tras winner inicial Video, mismo ciclo | Raw Display con caller/owner reales; no admisión B0 vídeo ni incremento Dc. No ingerir scope=display en oportunidad Video ni convertir su guard a control vídeo; hechos legítimos separados como opportunity/control unknown, winner inicial intacto. Literal video del diagnóstico no cambia scope ni winner |
| G08 | Camino sin prepared: W2 capacity-or-legacy → W3 build → W4 video-activation → C1 final; cuatro true de la misma oportunidad | Cada ejecución tiene caller/sequence/resultado propios. Un solo D0, un Dv si winner Video acreditado y un solo Dc/firstControlAt; W0 y resolución await no añaden checks ni oportunidades |
| G09 | Camino prepared: W2 no ejecutado, W3/W4/C1 sí; owner=null legítimo de W2 en el otro camino | No fabricar false para W2 omitido ni exigir creative aún inexistente. Admisión según Node/waterfall/intento nativos; handoff no duplica oportunidad. Distinguir ambas rutas de vídeo |
| G10 | W2/W3 false repetidos→true, W4 true y C1 false por salida posterior, dentro del mismo ciclo | Todas las muestras son factuales y separadas; C1 false impide activación original, pero no borra primera positiva ni crea otra. No afirmar activación/visibilidad posterior desde el true anterior |
| G11 | Token stale antes del check W0; anchor-missing durante check ejecutado; método ausente/terminal/preparationValid false antes de guard | Primer caso y cortocircuitos: guard-not-executed, sin false. Anchor-missing sí conserva false/razón antes de finish(stale); identidad incompleta → raw/no admisión. No capturar una recomputación diagnóstica como guard omitido |
| G12 | C3 recordReadiness disparado por Display/wait/eligible y C5 argumento deferred; cambian rect/estado entre ambas lecturas | Dos evaluaciones diagnósticas distintas; formato/etapa por caller acreditado, no por métrica. Ninguna sobrescribe el C0 de control ni incrementa Dc aunque dé true |
| G13 | C4 entry.eligible con below, standby sin boundToken, claim y lease/reentrada; entry inválida o short-circuit; setupVideoPreparation con descriptor local {winner:video} desde buildAndPlayVideo | Proximidad no es activación; reason aceptado no se convierte en C0=true. Descriptor local no acredita winner inicial nativo ni Dv. Entry.generation no es fetchGeneration, sin B0 primario ni Dc, sin nuevo D0 por subintento |
| G14 | C6 current con epoch/manager/media viejo; C7 check tras reveal; C8 resolución tardía play; C9 reveal con terminal/reintento | Booleano ejecutado en serie post-player propia; cortocircuito no ejecutado ≠ false. Ninguno crea Dc; owner viejo no recibe token/generación nuevos; medios distintos invalidan atribución |
| G15 | C10 plugin-init y C11 player.ready true/false; preparación inválida, terminal o método ausente omiten lectura | Etapa post-player, aun antes del primer play/IMA; raw, sin B0 pre-player ni Dc. Mismas llamadas IMA/play/settle originales y mismo orden; no sustituir C1 por estos guards |
| G16 | Dos checks originales W3 con idéntico booleano/owner/token, posterior retransmisión del primer packet; IDs locales coincidentes en series GAM y Manager | Dos ejecuciones con secuencias propias, retransmisión sin otro ingest; una oportunidad por serie, Dc como máximo una vez en ella. No deduplicar por booleano/caller/token ni unir distribuciones por IDs locales |
| I01 | Dos documentos, dos raíces/nav, slots con IDs DOM repetidos | Aliases únicos por objetos reales; no unión por newsID/filename/token/local counter |
| I02 | Handoff standby→render-owned, lease expirado, cleanup/nuevo fetch | No doble D0, misma genealogía factual; callback viejo no toma generación/token nuevo |
| I03 | Ruta startAuction sin _fetchGeneration acreditada | No sintetizar 1 o token. No admisión y gap de cobertura explícito; tasas afectadas bloqueadas |
| I04 | Anchor sustituido, desconectado, root ambiguo, BFCache no observado | A desconectado identificable puede dar false; A ausente no inventa ID. Ruptura de continuidad/cobertura por ámbito |
| P01 | C0=true/P unknown y B0; manager/medio ausentes | Muestra válida A y candidato B0 pass con identidad/ámbito/procedencia fiables. Ninguna exigencia de SDK, P o frame; no prueba nivel B |
| P02 | C0=false y P inválido/ausente | Muestra válida A si conserva identidad/procedencia completas; candidato B0 fail y B1–B3 fail por control, sin adquirir P innecesariamente. False factual no implica muestra inválida ni se pierde |
| P03 | Anchor 0,225%, P previsto fuera; fracciones parciales y clipping | Matemática independiente, candidata observacional distinta de C0. No calibrar umbral ni inferir mejora causal |
| P04 | Cambios A/V/W/estilos/owner entre lecturas; CSS animada/transform | P parcial/unknown, adquirida no consistente; conservar C0. No retry loop para buscar lectura estable |
| P05 | P post-player ofrecido como intención, revision falsa, CSS/config sin resolver | Rechazo Q1–Q5; no promoted measured. Null/strings/NaN/Infinity/zero/negativos y chrome -1 no usables |
| P06 | Reglas de open/preset/lockedHeight/chrome y currentBox no triviales | Oráculos numéricos: 345+15=360, 600+20=620; dimensiones/origen comprobados; no offsets 31/170 |
| T01 | Evento no catalogado, prefijo conocido, stage del input, vecino reveal | Etapa unknown. Mantener las clasificaciones explícitas de productor, sin default after-player |
| O01 | Manager no entregado o getter no ejecutado por core | Unknown, sin llamada SDK extra. B0/B1–B3 siguen independientes |
| O02 | Manager/medio reemplazados, dummy, source cambiado, token 999 | No facts.frame; invalidar binding previo sin tocar playback/cleanup del core |
| O03 | Metadata del RVFC ya registrado y binding correcto | Frame atribuido solo con presentedFrames/mediaTime y reloj/contexto completos. Sin segundo RVFC |
| O04 | RVFC cancelado, no soportado, playing/timeupdate/canplay/STARTED/IMPRESSION/COMPLETE sin metadata | Hitos raw, no frame inventado ni cero exacto. No añadir cadencia para conseguirlo |
| O05 | Wrapper cerrado al frame; reveal request, dos rAF, PiP/animación | Hechos y etapas separados; sin afirmar perceptibilidad/Active View ni mover reveal |
| D01 | Oportunidad sin guard, sin winner, con false repetidos o sin frame | D0 independiente de snapshots; Dv/Dc/outcomes pending/unknown; no filtrar por candidato o éxito |
| D02 | Inicio positivo, hueco factual, duplicados, terminal sin outcome | Censura izquierda separada de gap; dedup por oportunidad, derecha/outcomes desconocidos. No reconstruir primera pasada |
| D03 | Refresh tras COMPLETE vs fallback, con/sin ciclo nuevo | Relación factual conservada; no cambiar winner inicial por un efecto derivado ni crear ciclo QA |
| D04 | Evento 2001/byte eviction y pérdidas distintas en ring/packets | Recuentos/resúmenes conservados; detalle perdido identificado por representación. Suma de entradas ≤2000 y bytes combinados ≤2 MiB |
| D05 | Oportunidad 65, resumen/agregados llenos, counter overflow | Latch de insuficiencia; sin evicción de identidad ni tasas globales exactas. Notificaciones no son únicos |
| D06 | Handoff token 0→1 sin frame y terminal | Mantener tokenReplaced y política conservadora QA0, sin limpiar el flag para obtener cero exacto |
| D07 | Destrucción/lease de standby y reentrada con la misma pendingAuction | Fin de subintento raw, no terminal ficticio de oportunidad; D0 no se cierra ni duplica |
| D08 | Diagnóstico/reveal/recuperación true sin positiva primaria acreditada | Booleano real retenido en su serie, proyección primaria unknown; no crear Dc retrospectivamente desde un outcome |
| D09 | Constructor con coverage false; cierre/export aparentemente completo | Flags no se elevan ni se parchea QA0. Perfil futuro true solo con prueba previa y gaps irreversibles; sin replay desde ring parcial |
| A01 | Primer perfil con sourceComplete={D0:false,Dv:false,Dc:false,outcomes:false}; muestras primarias true y false completas, sin P/manager/frame | A puede aprobar para ambas; candidato B0 pass/fail respectivamente. B insuficiente y exactRatesAllowed=false; sin elevar flags en close/export ni reinterpretar tasas QA0 |
| A02 | Muestras A válidas junto a startAuction directo sin generación nativa acreditada o episodio sin identidad | Conservar validez individual de las primeras; otro episodio raw/no admitido, gap poblacional explícito y tasas globales bloqueadas. Sin rellenar generación=1/token ni excluirlo silenciosamente del ámbito |
| A03 | Todas las muestras retenidas A válidas, cero dropped, cierre/export y recibos de runner aparentemente completos | No demuestra cobertura D0/Dv/Dc ni convierte A en B. No fabricar episodios desde snapshots, counts, raw saneado QA0 o último owner |
| A04 | Evaluar salida de II con cobertura funcional acreditada por distribución/ruta, exclusiones R1 probadas, gaps declarados y coste total medido dentro de límites | Puede proponerse avance revisado a III/IV con B insuficiente y tasas exactas prohibidas, sourceComplete inmutable. Falta A, gap oculto o presupuesto inconcluso/excedido bloquean; aprobación conceptual no autoriza avanzar |
| A05 | Pretender tasas exactas con perfil inicial, incluso después de revisión externa positiva; comparar con perfil completo nuevo aprobado independientemente antes de construir | Rechazar promoción del inicial y cambios a export QA0. Perfil nuevo solo evaluable con evidencia exhaustiva del ámbito/identidad/fronteras/cierre, sin huecos/overflow, denominador no vacío y condiciones QA0 por tasa; outcomes aparte |
| A06 | Proponer replay desde ring evictado/resúmenes, cambiar scope para ocultar ruta sin generación o pedir tasa global de perfil restringido | Rechazar reconstrucción/promesa global. Solo historial íntegro y ordenado bajo futuro perfil aprobado podría evaluarse; gaps no se borran y resultados restringidos no son tasas globales |
| A07 | Contrastar perfil inicial false con futura instancia de perfil aprobado con D0/Dv/Dc completos y outcomes incompleto; denominadores no vacíos y luego vacíos | Inicial: todas las tasas exactas false/value=null. Instancia futura: condiciones QA0 por tasa; videoOpportunityShare/controlObservedShare pueden permitirse con flag agregado false y tasa de frames bloqueada. Denominador vacío impide su tasa exacta aun con complete; no modificar el export |
| A08 | Perfil futuro con las cuatro completitudes acreditadas; pretender firstPassFrame por haber superado A, salida de II o revisión poblacional | firstPassFrame sigue value=null/exactRatesAllowed=false/temporal-coverage-not-implemented. Ninguna puerta documental implementa cobertura temporal ni autoriza reinterpretar ese campo QA0 |
| X01 | Export repetido, tamaño máximo, resultados/packets mutados por consumidor | Saneado, copias separadas, límite manual y sin reset oculto. Sin URLs, XML, cookies, campañas, storage o envío |
| X02 | Recibo/build servido falsificado, copia JSON, hash/dist/source incompatible | No prueba autosuficiente; cotejo independiente local, auditoría externa no declarada realizada |
| X03 | Fallo/ausencia/desactivación del sink y datos incompletos | Misma huella comercial de callbacks/awaits/requests/decisiones; solo QA marca gap/stop/censura |

Reejecutar en esa fase los tests congelados QA0/QA1-A sin editarlos ni sustituir lógica. La misma selección de tests, comandos, entorno, fail/skip y hashes se publicará por etapa. Datos de fixture no se presentan como adquisición real; ninguna cantidad de tests permite anunciar medición de navegador no realizada.

## 4. Protocolo de coste y atribución

Antes de cualquier medición autorizada se fijarían: dispositivo/navegador/realm, distribución y hashes base/servido/CSS/config, catálogo, perfil estático/dinámico, viewport, estado cache/proxy, camino de loading, ventana de observación y criterio de cierre. Separar visible/hidden, tipo de callback y flujo nativo/directo. Una ventana de laboratorio puede predefinirse para estrés; nunca se amplía por inactividad para bajar el porcentaje o conseguir N/outcomes.

Fronteras monotónicas propuestas, únicamente en invocaciones ya previstas:

| Tramo | Qué incluye y cómo se atribuye |
|---|---|
| setup / registro | Asignación de aliases, registro de identidad, modelo/catálogo y preflight de memoria |
| staging del guard | Copia de locales/resultados y asociación temporal; también llamadas diagnósticas que no lleguen al sink |
| adquisición del packet | Lecturas compartidas, validación de bracket, estilos/rects, clocks, referencias y cualquier layout/estilo síncrono inducido |
| evaluación/contabilidad | Evaluador y ledger congelados, dedup, clonación/preflight de resúmenes, overflow; peor caso 64 oportunidades |
| registro/dispatch | Copias saneadas, recibo público y ambos rings, bytes reales, evicción y flags. No esconderlo en «logger gratis» |
| teardown / export | Cierre QA/censura y liberación de sus referencias, copia, serialización y export explícito completo |

Registrar inicio/fin y descomposición exclusiva. Si la adquisición comparte el guard comercial, informar su intervalo inclusivo y el tramo extra; para el presupuesto conservador cargar el intervalo compartido pertinente sin afirmar que sea coste marginal puro. Staging incluido en un padre no se suma otra vez. La suma del observador es unión de intervalos propios/compartidos cargados, no suma de padres e hijos. Wall-time incluye esperas síncronas/layout; no es CPU pura.

Las estadísticas de coste no se reconstruyen desde el ring superviviente. Agregados acotados no evictables conservan N, total, máximo y un histograma de bins fijos con frontera exacta en 2ms, por los tipos predefinidos que quepan en los 16 KiB de metadatos QA. Si falta detalle para un percentil exacto, publicar intervalo/cota superior del percentil, no un valor inventado; aceptar el umbral solo si la cota lo permite. Saturación o pérdida de muestras de coste → presupuesto inconcluso. Informar resolución/incertidumbre del reloj; no cambiar flags de aislamiento o entorno para esconderla. El perfil externo debe cubrir también reloj, actualización de estadísticas y cola de bookkeeping que los brackets propios pudieran omitir; si no puede cerrarse ese coste, no hay PASS.

Un perfil externo autorizado permitiría separar tareas/script/estilos/layout/GC y compararlos con ejecución sin sink en el mismo entorno. No instalar PerformanceObserver, polling o nuevos listeners solo para atribuir costes. No envolver métodos SDK. Dos navegaciones distintas no constituyen una estimación causal del overhead; se describen confusores y variación, sin cerrar H-QA.

## 5. Presupuestos y decisión de medida

Se heredan literalmente los topes r2 para una fase futura; esta tarea no los ha medido:

- p95(sampleSync) ≤2 ms; informar p50, p95, máximo, N y frecuencia por tipo/distribución. No acreditar un p95 de una subserie rara con N insuficiente; declarar inconcluso. No ampliar capturas para completar N.
- 100×totalObserverSyncMs/observationWindowMs ≤1%, con setup + muestras/staging no consumido + cleanup + export explícito, sin doble cómputo. El export posterior **no amplía la ventana**, pero sí el numerador. Publicar subtotal interactivo y total bruto. Es proporción de tiempo de pared, no porcentaje de CPU del proceso.
- Ningún long task interactivo >50ms nuevo atribuible al observador. Long tasks del export se publican aparte y siguen sumando tiempo total; no se omiten para obtener PASS.
- 2 MiB lógicos combinados, 64 resúmenes, suma de detalle ≤2000 entradas. Verificar con payload máximo, IDs/strings/recibos/registros y ambos rings; no confundir JSON final con heap.

Propuestas físicas adicionales **pendientes de aprobación antes de implementar**: incremento de heap retenido ≤8 MiB por documento y pico transitorio incremental de export ≤16 MiB. Motivo: JSON UTF-8 no limita por sí solo strings UTF-16, objetos, mapas y copias. Son barreras de rechazo iniciales, no certificados ni autorización para subir los topes lógicos.

Memoria física: perfiles comparables sin/con sink, máximo 64 resúmenes y estrés de reemplazos/1000+1000 entradas; retención de DOM/SDK y asociaciones retiradas inspeccionada por heap snapshots externos autorizados. Sin gc() o presión artificial durante el anuncio. Informar heap bruto, deltas, estabilización tras GC natural, pico al copiar/exportar y objetos aún retenidos. Un plateau lógico no demuestra ausencia de fuga física.

GC: registrar asignación/picos y pausas observadas por perfil externo, separar GC coincidente de GC atribuible; no sumar una pausa dos veces al tramo síncrono que ya la contiene. Si no puede atribuirse CPU/layout/GC o falta setup/dispatch/export en el coste, el presupuesto queda **INCONCLUSO**, no PASS. Una medición de Node o la cobertura de tests no sustituye este protocolo.

## 6. Aceptación, rechazo y reversión

**Nivel A, por muestra:** aceptar únicamente el resultado original ejecutado con identidad/procedencia/ownership/etapa/formato completos del selector primario. B0 pass y B0 fail por C0=false pueden satisfacer A. No exigir P, SDK, manager, medio, frame ni completitud poblacional. Stale, datos incompletos o no ejecución permanecen raw/unknown, sin completar identidad ni fabricar false.

**Nivel B, poblacional:** decisión separada sobre integridad D0/Dv/Dc y tasas de un ámbito. El primer perfil nace con sourceComplete=false en D0/Dv/Dc/outcomes; B insuficiente no impide que A pase sus pruebas. No elevar flags al cerrar/exportar, no cambiar QA0 ni reinterpretar su export, no rellenar episodios sin generación nativa. Outcomes unknown no invalidan A ni autorizan una tasa de frames.

**Salida futura de II hacia III/IV:** exigir informe de cobertura funcional con cada ruta primaria y exclusión del inventario R1 por distribución/versión, evidencias A y pruebas de invariancia comercial, matriz soportado/no soportado, todos los gaps/censuras declarados y trazables, deduplicación/contabilidad honesta y memoria/coste total medidos según 4–5. Mantener sourceComplete=false, B insuficiente y tasas exactas prohibidas cuando corresponda. Revisión independiente de resultados y autorización expresa del alcance siguiente; no avance automático por snapshots o éxito IMA. El presupuesto no medido o inconcluso bloquea esta puerta aunque A sea correcto.

**Puerta adicional para tasas exactas:** un perfil de cobertura completo aprobado independientemente **antes** del constructor de una nueva instancia, con catálogo/ámbito de distribuciones/rutas/versiones, identidad nativa de todos los episodios y prueba de cobertura desde antes del primer inicio hasta cierre; deduplicación, membresías D0/Dv/Dc, censuras, gaps y overflow resueltos según QA0. Cada tasa debe satisfacer su condición de complete y denominador no vacío; outcomes requieren perfil propio completo. No promocionar el primer perfil, mutar su export ni reabrir integridad con replay parcial. Un perfil restringido solo puede justificar afirmaciones de su ámbito, nunca globales. Esta puerta no es requisito implícito para aprobar A o para proponer el avance funcional desde II con límites explícitos.

Rechazar ante guard reevaluado, falso omitido, lectura de P posterior usada como pre-player, metadata de frame fabricada, root/owner/generación inventados, cadencia nueva, asociación privada del probe, valor B consultado por core, cambio comercial o límite excedido. Ausencia de datos o de atribución de coste es inconclusa y bloquea la aceptación correspondiente.

Parada técnica futura: cerrar solo la colección QA, con motivo/tiempo reales, gaps y censura. Dejar funcionar exactamente los callbacks/leases/timers/recovery del core. No pausar anuncios, cancelar IMA, cambiar timeout, resolver promesas ni reducir silenciosamente muestreo/campos para cumplir presupuesto. Los packets ya conservados se mantienen para auditoría y el latch de pérdida no se borra por exportar.

Reversión propuesta: deshabilitar la composición opt-in QA en el entorno autorizado y retirar únicamente los archivos nuevos de esa etapa, con manifest antes/después. Cotejar hashes de cada original, QA0/QA1-A, coordinador/probe y bundles congelados; no reset/checkout del trabajo anterior. No requiere reprogramar el anuncio ni una migración de datos, pues no hay persistencia automática. No se ejecuta esa reversión ahora.

**Punto de parada actual:** entregar diseño/matriz/plan y prueba de integridad documental para revisión independiente. Implementación, mediciones de navegador, adquisición y cualquier nueva captura siguen sin autorización.
