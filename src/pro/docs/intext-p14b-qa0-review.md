# P1.4-B-QA0 — Evaluador y contabilidad aislados

27/10/2026. **QA0 desarrollado y validado exclusivamente con datos sintéticos; entrega para auditoría independiente. B-QA1 bloqueada hasta aprobación expresa.** Se implementan componentes puros B0–B3 y un ledger de datos en memoria, sin integración comercial. B4/B5 permanecen unknown/temporal-stage-deferred; B shadow/enforce, A3 y C inactivos. P1.3c visual y H-IMA/H-QA mantienen su estado abierto.

La autorización QA0 de esta tarea sucede a la aprobación independiente del diseño r2. Se conservan intactos los tres documentos r2 como especificación de referencia y los 333 archivos preexistentes a QA0: no se reinterpreta su prohibición histórica de implementación como autorización de adquisición/runtime. QA0 permite los módulos/tests aislados de esta entrega; QA1 sigue requiriendo otra aprobación.

### Correcciones de auditoría independiente QA0

La revisión externa repitió 61/61 pruebas funcionales en Node 22.16.0. La prueba adicional de integridad depende de los 333 originales del workspace y se acredita aquí separadamente; no se presenta como reproducible en una copia que no los contenga. Las correcciones siguientes se limitan a módulos, fixtures/tests y documentación/resultados QA0 afectados.

| Corrección | Comportamiento corregido | Comprobación |
|---|---|---|
| Censura izquierda | `coverage.leftCensored` conserva censura geométrica, sin ejecutar `taint('all')`. Gaps efectivos, fuentes incompletas y membresía/numerador desconocidos conservan su bloqueo propio | Censura con fuentes completas, incompletas y falta de fetch/winner/frame; evicción raw sin pérdida contable |
| Atribución de frame | Identidad activa completa y binding de manager/medio ad verificados; metadatos de frame y reloj compatibles. Evento insuficiente/incompatible no crea frame ni un cero exacto | Token 999 frente a 1, manager/medio distintos, identidad/reloj/metadatos ausentes, dummy/STARTED/IMPRESSION/canplay y frame válido posterior |
| Chrome/box | Chrome negativo y padding/bordes negativos, no finitos o incompatibles con origen/ancho invalidan Q3; los defaults válidos permanecen | 345 + (-1) con rect de 344 ⇒ unknown; caja no trivial consistente ⇒ qualified-estimate |

El alcance sigue siendo datos sintéticos. Estas nuevas exigencias no autorizan inventar IDs o metadatos al convertir exports antiguos ni añadir adquisición.

## 1. Archivos nuevos y alcance

| Archivo | Responsabilidad |
|---|---|
| [intext-p14b-shadow-evaluator.cjs](../tests/qa/intext-p14b-shadow-evaluator.cjs) | Fórmulas versionadas, calificación Q1–Q5 y B0–B3; placeholders diferidos B4/B5 |
| [intext-p14b-shadow-ledger.cjs](../tests/qa/intext-p14b-shadow-ledger.cjs) | Ingesta explícita, contadores/resúmenes, pérdidas, ring, cierre y export manual saneado |
| [intext-p14b-data.cjs](../tests/qa/intext-p14b-data.cjs) | Lectura de propiedades de datos sin invocar getters, validación de tipos, identidad/reloj y tamaño UTF-8 |
| [intext-p14b-qa0-fixtures.cjs](../tests/qa/intext-p14b-qa0-fixtures.cjs) | Constructor de muestras sintéticas y atestaciones de entrada, sin DOM ni SDK simulado |
| [intext-p14b-shadow.audit.test.cjs](../tests/intext-p14b-shadow.audit.test.cjs) | Tests unitarios, contratos e integración de datos sintéticos |
| [Propuesta QA1](intext-p14b-qa1-observation-proposal.md) | Conversión offline primero; adquisición/taps adicionales solo tras otra aprobación |

Ningún archivo existente importa estos módulos: solo el test nuevo los consume. No se ejecutó builder, no se tocó el coordinador E0/E1, probe o bundle existente. Los módulos no importan core, SDK, red, fs, storage, reloj o proceso. La única dependencia Node externa del módulo de datos es `node:buffer` para contar bytes; las otras dependencias son los módulos QA0 locales.

El evaluador es determinista y no muta entradas; el ledger es una máquina de estado de datos **por instancia**, modificada solo mediante llamadas explícitas del test/consumidor. No es un controlador del anuncio. No hay captura automática, eventos/listeners/observers, timers, polling, inicialización IMA ni un global añadido al navegador.

## 2. Contrato implementado

### Evaluación y modelos

`evaluateP14BShadowV1(sample, candidate)` recibe datos JSON planos estructurados (objetos/arrays de datos; sin DOM, SDK, funciones o proxies). Los getters no se invocan. Devuelve un registro nuevo con status, razones, versión, familia/modelo, etapa, calidad, fracciones y comparación con C0. B0 ignora P/viewport/movimiento incluso si no existen; identidad/ámbito/fuente inválidos siguen la precedencia r2.

- Schema: `p14b-shadow-sample-v1`, contractRevision=r2; fórmula `p14b-geometry-v1`.
- Familias B0–B3. Catálogo explícito: el ledger no escoge por defecto un umbral ganador. B2 admite la calibración 0,25/0,50/0,75; B3 x=0,50/1 e y=0,25/0,50. B1 exige intersección positiva.
- Modelos: `player-measured-current-flow`, `player-intent-current-flow-v1` y `slot-open-envelope-v1`. La envolvente del slot no se etiqueta como ratio del medio.
- Qualities: measured en etapa real post-player; qualified-estimate con Q1–Q5 en serie separada; partial/unknown no permiten resultado geométrico completo. Nunca se promueve una estimación por concordar con un player posterior.
- Q1 comprueba identidad/contexto/wrapper conectado y etapa; Q2 rect/viewport, clock/revisión/sequence y origen content-box coherentes; Q3 fuentes resueltas y versionadas con core/distribución/CSS/config, unidades y altura consistente con operandos; Q4 alcance/layout/ocultación; Q5 procedencia y ausencia de conflictos/PiP. Los cores base actuales están fijados por hash; otra versión exige revisión.
- `geometryV1` calcula intersecciones flotantes, fracciones X/Y/área, posición y cota ideal por tamaño; rechaza null, NaN, dimensiones no positivas, infinitos y productos/extremos no representables. No interpola scroll.
- `openEnvelopeHeightV1` solo opera sobre números ya resueltos: override+chrome con fallback 15 para chrome null/0, o preset/default 360. Rechaza override negativo, chrome negativo/no entero y preset explícito inválido. Q3 de estimaciones exige `operands.currentBox`: padding y bordes top/bottom/left/right finitos no negativos, `borderBoxLeftPx/TopPx/WidthPx` y concordancia con origen/ancho content-box (tolerancia absoluta 1e-7 CSS px). Sumas no representables o ancho interior no positivo invalidan. Si se aporta currentBox al helper, también se valida. Chrome abierto y padding actual cerrado son fuentes distintas: no se fuerza igualdad entre ellos. Una bandera `sourcesResolved=true` o el literal 350px solos no bastan. No calcula un desplazamiento de apertura de 31/170 px ni lee CSS.

La validación comprueba la **consistencia de atestaciones de datos de prueba**, no que CSS/config de una página real cumplieran esas atestaciones. Obtenerlas/justificarlas corresponde a una QA1 aprobada. Los resultados no son un permiso de request/play/reveal y no incluyen fill, ingresos o viewability contrafactuales.

### Esquema mínimo de datos y API

La forma completa de una muestra sintética está en el fixture; estas son las fuentes de cada grupo:

| Grupo | Campos relevantes |
|---|---|
| Fuente/ámbito | schemaVersion, contractRevision, scope=video/display/opportunity, source.consistent |
| Identidad | documentLocalId/navigationLocalId/slotLocalId/anchorLocalId, cycleId/fetchGeneration/renderToken/activeRenderToken, verified, state=live/stale/terminal |
| C0 | control.observed/reliable/eligible; ningún valor se deriva desde P |
| Geometría B1–B3 | stage/layoutRevision/sampleSequence/sourceClock/monotonicMs, viewport, provenance y plannedRegions con context/evidence/operandos |
| Evidencia de P | modelo/versión/calidad, rect left/top/width/height, origen/tamaño/estilos resueltos, revisiones e identidad acopladas; sin copiar objetos fuente |

Para el ledger, `createP14BLedgerV1({documentLocalId, candidates, coverage?, sourceClock?, limits?})` requiere un catálogo explícito, máximo 32 entradas únicas. `coverage.D0/Dv/Dc/outcomes` son false por defecto. Los límites solo se pueden reducir respecto de r2. El reloj por instancia es `synthetic-monotonic-ms` o `page-monotonic-ms`; la ingesta rechaza cruces de dominio/regresiones. QA0 solo usa datos sintéticos.

`ingest(sample, facts)` aplica hechos explícitos, por ejemplo `fetchObserved`, `initialWinner`, un frame identificado como ad con fuente admitida, impressionObserved, coverage completa observada y terminal. El scope vídeo o un B0 pass no inventan un winner ni D0. Base media/STARTED/IMPRESSION no sustituyen frame. Una identidad terminal solo puede cerrar un resumen **ya conocido del mismo token/generación**, aportando el terminal; no añade un nuevo C0/frame ni reabre la oportunidad. El evaluador devuelve NA para ese token terminal.

**Contrato mínimo de `facts.frame` corregido:** registro plano con todos los campos de identidad de la muestra (document/nav/slot/anchor/cycle/fetch/render/activeRenderToken, verified=true, state=live), `observed=true`, `media='ad'`, `provenanceVerified=true`, managerLocalId/mediaLocalId, sourceClock y monotonicMs de la misma muestra. `sample.adMediaBinding` debe acreditar esa misma identidad y esos IDs de manager/medio con `media='ad'` y procedencia verificada. No se obtiene el binding desde el propio nombre del evento. Los IDs de los fixtures son exclusivamente sintéticos.

`source='request-video-frame-callback'` requiere evidence.kind='presented-frame', presentedFrames entero ≥1 y mediaTimeSeconds finito ≥0. `ad-playing-confirmed`/`ad-timeupdate-confirmed` requieren además evidencia de decodificación atribuible al binding: kind='decoded-ad-frame', decodedFramesSinceBinding entero ≥1 y mediaTimeSeconds>0. El evento playing/timeupdate por sí solo no basta. Son pruebas de frame publicitario observado, sin acreditar perceptibilidad del wrapper, viewability ni primera pasada.

Una tentativa `observed=true` incompatible o insuficiente conserva `frameObserved=false`, primer tiempo/token null y `frameAttributionIncomplete=true`; no equivale a ausencia de frame acreditada aunque frameCoverageComplete=true. Solo bloquea el numerador que necesita esa atribución, sin invalidar D0/Dv/Dc. Un frame posterior plenamente atribuido puede acreditar que esa oportunidad tuvo frame, conservando el flag de la tentativa anterior para auditoría. Se valida contra el token/generación activos en cada ingreso; nunca se reetiqueta un evento viejo. Bindings/IDs/metadatos crudos no se retienen ni se exportan. La falta de estos campos en exports actuales queda unknown: QA1-A no debe inventarlos y QA1-B necesitaría aprobación expresa para adquirirlos.

`markGap(ámbito)` marca pérdidas sin recuperarlas mediante el ring. `close({endTimeMs})` fija el final de datos y censura derecha de oportunidades no terminadas; no es cierre/cancelación de un anuncio. `exportManual()` crea datos separados del estado y `serializeManual({maxBytes?})` devuelve JSON/bytes o export-too-large sin reiniciar nada. No hay almacenamiento, upload o escritura automática.

Ejemplo ejecutable **solo en Node con fixtures sintéticos**, sin navegador:

```javascript
const {createP14BLedgerV1} = require('./tests/qa/intext-p14b-shadow-ledger.cjs');
const F = require('./tests/qa/intext-p14b-qa0-fixtures.cjs');
const ledger = createP14BLedgerV1({
  documentLocalId: 'documentOne',
  candidates: F.catalogue(),
  coverage: F.fullCoverage() // Atestación del fixture, no del navegador.
});
ledger.ingest(F.makeSample(), F.completedFacts());
ledger.close({endTimeMs: 20});
const result = ledger.serializeManual(); // Devuelve datos; no los almacena ni envía.
```

### Contabilidad y memoria

La clave de oportunidad es documento/nav/slot/cycle; token/fetch son subidentidades. Se retiene identidad/resumen para deduplicar aunque sea terminal. Los contadores se actualizan desde hechos resumidos, antes de conservar el snapshot, y no usan resultados candidatos. Winner conflictivo, datos sin fetch o gaps no se convierten en una población completa.

`leftCensored` señala que la primera entrada física no está cubierta y se conserva en el resumen incluso con evicción raw; **no declara por sí sola pérdida de hechos contables**. Fuentes D0/Dv/Dc/outcomes completas, membresías y numeradores acreditados permiten tasas de registros factuales con esa censura explícita. Si esas condiciones faltan, la tasa correspondiente permanece null. La falta de fetch sigue marcando gap D0 y la pérdida factual explícita sigue marcando los ámbitos afectados. Primera pasada permanece desconocida en todos los casos.

Se implementan 64 resúmenes/256 KiB, agregados reservados hasta 32 KiB y ring de 2000 snapshots/1760 KiB, dentro de 2 MiB lógicos serializados. El tamaño lógico incluye claves internas de los registros; el export las elimina. Se comprueba capacidad antes de admitir resúmenes; los contadores/flags tienen forma acotada y preflight de su tamaño máximo. El ring cuenta bytes incrementalmente, contrastados contra serialización completa en tests. No serializa de nuevo todo el ring en cada ingreso.

La evicción incrementa pérdidas de detalle por etapa/secuencia y por resumen, sin descontar D0/Dv/Dc. La oportunidad 65 o una falta de memoria contable fijan overflow irreversible para el ámbito; las notificaciones posteriores no se convierten en oportunidades únicas. Se conservan resúmenes previos y se bloquean tasas exactas globales. Exportar no borra flags ni libera identidades.

La exactitud se declara por métrica/denominador. Se implementan tasas **de registros factuales suministrados**: proporción de oportunidades vídeo, control observado y vídeo con frame observado; valor null si falta población/membresía/numerador completos o el denominador es cero. Primera pasada siempre permanece unknown/no implementada: no se reconstruye una trayectoria ni se fabrica un resultado temporal.

El export solo conserva campos numéricos/enums/estructuras propios. Identidades recibidas se sustituyen por IDs de oportunidad locales; no se copian URLs, cookies, XML, targeting, campañas, campos desconocidos o métodos toJSON del input. NaN/infinito no salen como números fabricados. Entradas cíclicas en campos desconocidos se ignoran; getters no se ejecutan y los resultados devueltos no permiten mutar el ring.

## 3. Validación y cobertura

**Resultado final tras correcciones: 71/71 tests pasan, cero fail/skip/cancelled: 70 funcionales y una verificación local de los 333 originales.** Node v25.8.1; la repetición externa previa en Node 22.16.0 no se atribuye al código corregido. `--test-isolation=none` evita subprocesses de tests y no importa las suites previas que pudieran reconstruir artefactos. No se ejecutaron builders ni la CLI A2 que escribe evidencia antigua.

Fuentes de resultados: [salida final](intext-p14b-qa0-validation.txt), [LCOV](intext-p14b-qa0-coverage.lcov). La [primera salida 52/52](intext-p14b-qa0-validation-first.txt) queda identificada como comprobación inicial; no se presenta como validación del estado final ampliado.

| Módulo QA0 | Líneas | Ramas | Funciones |
|---|---:|---:|---:|
| Datos | 100% | 97,87% | 100% |
| Evaluador/modelos | 100% | 99,56% | 100% |
| Contabilidad/export | 100% | 95,71% | 100% |
| **Total V8 informado** | **100%** | **97,43%** | **100%** |

Cobertura instrumentada de estos tres módulos, excluyendo fixtures y tests; no cubre core comercial ni prueba exhaustivamente todos los datos posibles. Ramas excepcionales/defensivas no alcanzadas siguen visibles en LCOV, sin falsear cobertura ni simular billones de eventos para un contador.

Revisión de ramas tras las correcciones: los caminos nuevos de censura, atribución (incluidos token/manager/medio/reloj/metadatos inválidos), chrome negativo, caja incoherente y operandos ausentes están ejercitados. Quedan sin alcanzar excepciones defensivas de lectura de datos, comprobaciones de capacidad/contadores extremos, variantes de saneado/censura de APIs existentes y la salvaguarda de altura final no representable tras validar operandos. No se eliminan defensas para elevar el porcentaje. La integridad de 333 archivos es evidencia local del workspace completo; los 70 tests funcionales son el alcance portable de esta batería corregida.

| Requisito/fixture | Evidencia sintética / oráculo |
|---|---|
| B0 con C0=true/P unknown | Falta P/viewport/etc. y getters P/motion que lanzan si se leen; B0 sigue pass y no muta input |
| P parcial, C0=false, identidad terminal/stale | Tablas de estados r2 y contraste de flags, versiones, identidad y formato contradictorios |
| Q1–Q5 y estimación/medición | Witnesses concretos alterados por separado; origen/altura/operandos/versiones/distribuciones y measured antes de player rechazados |
| 0,225% y P fuera; 46,382%; clipping | Fracciones racionales y valores esperados independientes, sin interpolar un cruce |
| Fórmulas geométricas | **441** rectángulos enteros contra recuento independiente de celdas unitarias dentro de viewport 6×5; también bordes fraccionarios y tamaños extremos |
| Envolvente | 345+15=360; 600+20=620; default/preset/0/NaN/unidades no resueltas; inconsistencia de altura/origen invalida el modelo |
| B4/B5 | Unknown/deferred incluso con pares/secuencias favorables, P ausente o control false; sin leer movimientos |
| Ring/bytes/poblaciones | Evento 2001 evicta raw; FIFO por bytes y contador incremental frente a JSON completo; D0/Dv/Dc conservados |
| Overflow | Oportunidad 65, límite de resúmenes, datos posteriores duplicados y tasas exactas bloqueadas |
| Gaps/censura | Gaps por D0/Dv/Dc/outcomes, winner desconocido/conflictivo, falta de fetch, left/right censor, reloj regresivo/dominio distinto |
| No frame / terminal | Dummy/impression no crean frame; terminal factual cierra resumen conocido sin reactivar; ciclos/slots/navs separados |
| Export | Saneado de entradas con URL/cookie/XML/ciclo/toJSON/volumen desconocido, límite de bytes, copias independientes y export repetido sin reset |
| Aislamiento | VM con globals browser/SDK/red/timers prohibidos y lista de imports limitada a datos; no mocks de comportamiento IMA |
| Integridad | SHA256 y tamaño de los 333 archivos existentes, incluidos core/coordinador/probes/bundles/documentos r2 |

Comando de validación, desde src/pro, que solo ejecuta el test nuevo:

```powershell
node --test --test-isolation=none --experimental-test-coverage --test-coverage-include=tests/qa/intext-p14b-data.cjs --test-coverage-include=tests/qa/intext-p14b-shadow-evaluator.cjs --test-coverage-include=tests/qa/intext-p14b-shadow-ledger.cjs tests/intext-p14b-shadow.audit.test.cjs
```

La salida/LCOV entregados se obtuvieron además con reporters spec/lcov y destinos únicamente a archivos nuevos de esta entrega. Los tiempos del harness y su coverage no son el coste del observador en móvil, ni acreditan p95≤2 ms o ≤1% del presupuesto r2. **Adquisición, layout, CPU/GC, coste de dispatch y heap real en navegador siguen sin medir.**

## 4. Integridad y reversibilidad

Antes de editar se registró [baseline de 333 archivos](intext-p14b-qa0-protected-before.json), incluidos cambios previos del usuario y artefactos no rastreados. Se contrastan tamaños/SHA256 desde el test y en el [manifest final de integridad](intext-p14b-qa0-integrity.json). Ningún protegido se modifica; no se restaura ni hace checkout/reset sobre el trabajo previo. También se conservan intactos los tres documentos r2 y el roadmap existente.

La entrega es **aditiva**. Su reversión consiste en retirar únicamente los archivos nuevos inventariados en el manifest final: módulos/test/fixtures y documentación/resultados QA0/QA1. No requiere invertir un patch del core porque no existe tal patch, ni reconstruir bundles ni ejecutar un rollback del anuncio. La validación proyecta esa retirada sobre el inventario y verifica que quedan los mismos 333 archivos y hashes. No se borran ahora los entregables para demostrarlo.

Los hashes del manifest final excluyen el propio manifest para evitar autorreferencia; los hashes/tamaños de los archivos anteriores se conservan en el baseline. No se ha hecho commit, push, despliegue o subida de evidencia.

## 5. Riesgos pendientes y criterios de parada

1. Q1–Q5 validan datos/atestaciones, no hechos DOM/CSS reales. Otro core/CSS/modelo, contexto ambiguo o falta de viewport/revisión simultáneos obliga a unknown y revisión, sin abrir un player para obtenerlos.
2. La memoria acotada es **lógica serializada**: heap JS, asignaciones transitorias de copia/export y GC no están certificados por ese número. El preflight de resúmenes examina hasta 64 registros; su coste de navegador debe medirse antes de QA1-B.
3. Cobertura por defecto false. Un consumidor no debe marcarla true por cero dropped, por éxito IMA ni por tener snapshots. Si no puede acreditar D0/Dv/Dc/numerador completos, las tasas exactas quedan prohibidas.
4. El ledger cuenta oportunidades por ciclo e informa generaciones/tokens; no reconstruye primera pasada, dwell, velocidad o ingresos. B4/B5 y sus contadores de confirmación no están implementados.
5. Datos no planos, funciones/proxies/objetos SDK o llamadas de adquisición no forman parte de la API QA0. No usar estos módulos como sandbox de código arbitrario ni copiarles referencias comerciales.
6. Detener cualquier continuación si requiere un import productivo, hook/listener/observer, cambio de settlement/timeout/request/TTL, un resultado B usado por el core, pérdida contable ocultada o datos sensibles en export. Ninguno queda autorizado por pasar estos tests.
7. H-IMA/H-QA y P1.3c visual siguen abiertas; este éxito sintético no garantiza STARTED/IMPRESSION visible ni altera las conclusiones causales A2/A3.

**Siguiente paso:** auditoría independiente de QA0 y su API/datos/limits. La [propuesta QA1](intext-p14b-qa1-observation-proposal.md) distingue conversión offline, datos faltantes y hooks adicionales. B-QA1 sigue bloqueada hasta aprobación expresa. No se inicia ninguna adquisición ni integración al finalizar esta entrega.
