# QA1-B II-A — productor B0 en copias inertes, revisión offline

Fecha: 16/11/2026. Estado: implementación offline entregada para auditoría independiente. No constituye aprobación de ejecución en navegador ni de adquisición. Las etapas II real, III–IV, B runtime/enforce, A3 y C siguen bloqueadas.

Se añaden archivos nuevos exclusivamente. El baseline previo de `intext-p14b-qa1b-stage2a-before.json` fija 386 archivos: los 360 protegidos, los cuatro contratos vinculantes y los 22 archivos de etapa I aprobada, incluida la corrección I-01. Las trece diferencias de etapa I que ya mostraba Git al comenzar permanecen byte a byte en ese baseline; no se han restaurado a HEAD. El `.sty` conserva 3940 bytes y SHA256 `15c72d69032cc0e212b1501cdd78e9da78561b404c65165fe1a6d02efe16b660`.

## Entrega y reproducción

Ejecutar desde la raíz `src/pro` que contiene ambos cores. Entorno utilizado: Windows, Node **v25.8.1**, Git local para los diffs. No hay paquetes npm, instalación, navegador, servidores, requests ni dependencias de red. Node 22.16.0 fue el entorno comunicado por la auditoría anterior; esta entrega no afirma haberlo ejecutado.

```text
node tests/qa/qa1b2a/audit.cjs
node tests/qa/qa1b2a/audit.cjs --verify
```

El primer comando reconstruye únicamente los artefactos nuevos de su allowlist, ejecuta las tres baterías y actualiza el manifiesto II-A. Los comandos individuales y argv completos, directorio, versión, códigos de salida y salidas TAP sin recortar se conservan en `intext-p14b-qa1b-stage2a-{validation,stage1-validation,frozen-validation}.txt`. El segundo comando solo lee, contrasta todos los hashes y demuestra la inversión de ambas copias.

| Archivo nuevo | Función |
|---|---|
| `tests/qa/qa1b2a/facade.cjs` | Tap protegido y wrappers que devuelven exactamente el objeto original. |
| `tests/qa/qa1b2a/generator.cjs` | Hash base cerrado, anchors únicos, copias deterministas, capacidad de build local e inversión exacta. |
| `tests/qa/qa1b2a/native.cjs` | Autoridad nativa offline, registro débil, selector R1 y entrada a la API pública congelada de QA0. |
| `tests/qa/qa1b2a/native-schema.cjs` | Perfil de salida nativo versionado; comprobación de conformidad, sin conferir autoridad. |
| `tests/qa/qa1b2a/harness.cjs` | Métodos originales/transformados aislados en VM con dobles de efectos, nunca bootstrap del core. |
| `tests/qa/qa1b2a/audit.cjs` | Generación local de evidencias, suites, allowlist y manifiesto. |
| `tests/intext-p14b-qa1b-stage2a.test.cjs` | Pruebas II-A, oráculos de efectos, integridad, autoridad, contabilidad y límites. |
| `tests/qa/generated/qa1b-stage2a/{gam,manager}.qa.js` | Copias completas inertes. Endpoint léxico fijo `null`, sin instalador ni interruptor global. |
| `docs/intext-p14b-qa1b-stage2a-*` | Baseline, esta revisión, protocolo propuesto, resultados, tres logs, efectos, límites, export, dos diffs y manifiestos. |

El manifiesto de integridad enumera las rutas, tamaños y SHA256 de todos los archivos nuevos salvo él mismo y de los 386 protegidos. Su hash se obtiene al verificarlo; no se introduce una autorreferencia de hash. La reversión del proyecto consiste en retirar exclusivamente esa lista nueva y el propio manifiesto. No hay ningún archivo preexistente que restaurar. La inversión base→copia se prueba además en memoria, no mediante sobrescritura de los cores.

## Autoridad e interoperabilidad

La interfaz aprobada de etapa I exige una registry de fixtures y un origen `synthetic-fixture`; no se amplía ni se modifica. El frontend nativo nuevo reutiliza sus utilidades escalares y particiones y llama al **constructor real** `createP14BLedgerV1`, con su contrato público `p14b-shadow-sample-v1/r2`. No crea registros sintéticos para acreditar un objeto nativo ni altera las validaciones QA0.

`qa1b-native-packet-v1` es un perfil de salida separado y explícito, declarado en `native-schema.cjs`. Conserva los campos de identidad, ownership, caller y etapas del packet aprobado; añade procedencia `native-boundary`, hash de copia y contexto de winner observado para el selector. No se presenta como un JSON admitido por el adaptador sintético aprobado. Los cuatro contratos y el schema de etapa I permanecen intactos. La interoperabilidad futura se hará por una frontera de productor revisada y por la proyección pública QA0; ningún consumidor puede autenticar una fuente externa con este JSON.

La capacidad opaca de build solo nace al comprobar los bytes base y la copia determinista completa. El productor crea una autoridad nueva por sesión/documento y acredita los packets **por pertenencia débil del objeto inmutable emitido**, con leases escalares revocables. JSON, clones, aliases, campos `verified=true`, un manifiesto copiado o un packet de otro productor no acreditan nada. La comprobación precede a deduplicación, reloj y modificación de poblaciones. Los rechazos dejan un gap y no crean oportunidad ni primera positiva.

Los aliases locales pueden coincidir entre sesiones. Un identificador de documento aleatorio efímero de 96 bits, no comercial ni secreto, separa la genealogía pública; la autoridad privada de objeto sigue siendo la barrera decisiva incluso ante coincidencias de todos los escalares. Los buffers solo contienen escalares saneados, packets y recibos. Las claves DOM/SDK simuladas están en WeakMaps/WeakSets; sus valores contienen aliases y leases, sin referencias a esos objetos. No hay mapas fuertes de objetos nativos, almacenamiento persistente ni envío. El harness tiene una caché fija de dos fuentes/builds y el ledger sus 64 resúmenes acotados.

El endpoint es una **capacidad de productor de confianza**, disponible únicamente al harness offline que compila métodos extraídos con enlace léxico. No es una API de ingestión de JSON ni protege frente a código hostil que ya controle esa capacidad o el mismo realm. Las copias entregadas no lo reciben: su facade está ligada a `null` y no incorpora un loader CJS, bundle, hook de instalación o activación. Una futura autoridad de carga/realm, reloj de página y conexión a navegador necesitan implementación y autorización adicionales. El hash de build acredita bytes locales; no demuestra qué se sirvió o ejecutó en una página.

## Fronteras y selector R1

Las líneas exactas de cada distribución, anchors originales íntegros, hashes de métodos y sustituciones constan en `intext-p14b-qa1b-stage2a-copies.json`; los diffs muestran cada inserción.

| Frontera original en ambas distribuciones | Dato nativo / uso |
|---|---|
| Constructor de PlacementEngine, resultado de `findPlacements()`, constructor de Node | Documento, cuerpo de artículo observado, placement y slot. La navegación combina la raíz acreditada y el `navIndex` recibido en el parámetro nativo; ni el índice por sí solo ni nombres comerciales lo sustituyen. Una raíz reutilizada con nuevo índice se separa. |
| Retornos de `getIntextTelemetryElement()` | Referencia exacta del anchor ya elegido por el core. No consulta DOM adicional, selector ni geometría adicional. |
| Incremento de ciclo y `startFetch()` | Generación nativa y nuevo ciclo. Solo un fetch nativo pendiente se vincula al ciclo siguiente. Si falta generación, raíz o anchor, queda unknown/gap. |
| Asignación de `pendingAuction` tras `decideWinner({commit:false})` y guard original de generación | Winner inicial `video`, `display` o `null→none`. Un descriptor `{winner:'video'}` usado al preparar no es este evento. |
| Asignación del token en `beginVisualRender()` | Handoff de ownership; revoca el lease anterior. No crea otra oportunidad. |
| Creación, generación, release y claim de entrada preparada | Subintento acreditado solo si su auction procede de la frontera de decisión. No crea D0/Dv/Dc ni outcome. |
| Asignación original de `activeCreative` | Creative y token acreditados; si existe entrada de preparación, se reconoce solo por pertenencia a la autoridad nativa. |
| Retornos originales de `getReadinessViewportState()` | Staging débil del mismo objeto resultado y del anchor local, sin emitir control hasta conocer el consumidor. |
| `waitForViewport()` después de su única llamada original al guard | W2 `buildAndPlayVideo:capacity-or-legacy`, W3 `buildAndPlayVideo:waitForViewport` y W4 `video-activation`, condicionales a identidad, owner, token y etapa. W1 `showDisplay:waitForViewport` se conserva como Display. |
| Expresión final de `activate()` | C1 recibe el mismo resultado original y lo devuelve; se conserva el short circuit, la lectura `.eligible` y la excepción original. |
| Entrada original a construcción de player | Desautoriza nuevos B0. Este marcador no prueba que se haya creado un player: etapa posterior `unknown`, P desconocido. |
| `abort()`, `destroy()`, invalidación y `cleanup()` | Revocación de creative/entrada/attempt. Cancelación y reset no se convierten en outcome comercial; gap/censura cuando corresponda. |

Un B0 primario requiere ejecución real, booleano original, identidad completa, generación/ciclo/token nativos vigentes, ownership y etapa antes de construir el player. W2 admite owner Node/Waterfall sin creative aún; W3/W4/C1 requieren el creative acreditado para ese token. El resultado staged de otro lease/token no se reutiliza. El primer perfil mantiene P geométrico desconocido: tanto true como false son B0 factuales sin reconstruir un rectángulo candidato.

Una ruta con winner inicial acreditado Display/none se conserva como vídeo no primario, para no convertir una recuperación/fallback en un winner inicial de vídeo ni provocar una reclasificación de QA0. Si el winner inicial es desconocido, puede existir B0 factual de nivel A, pero Dv permanece unknown; nunca se rellena desde el descriptor de preparación. La ruta legacy `startAuction()` no incrementa una generación fetch propia y se declara unknown/gap: no se recicla el fetch anterior ni se inventa una generación.

Diagnóstico, preparación, recuperación, reveal y post-player quedan fuera de B0. Sus consumidores originales no se transforman en controles primarios. Sus llamadas al guard pueden pasar por el staging débil común, que no emite ni contabiliza un packet por sí solo. II-A no promete una serie exhaustiva de diagnóstico: solo W1 y los cuatro consumidores autorizados tienen emisión de control; los demás callsites permanecen excluidos. Un guard omitido por token stale, error previo, preparación inválida o ausencia de método no se transforma en false.

## Contabilidad, pérdidas y memoria

Cada ejecución emitida tiene eventId/sampleSequence nuevo. La retransmisión del mismo packet acreditado retenido devuelve su recibo anterior; no reingresa en QA0. Los packets de lease/owner retirado se rechazan, aunque fueran válidos antes. Una secuencia cuyo detalle ya se expulsó no se reconstruye ni se acepta como ejecución nueva. La clave poblacional es documento/navegación/slot/ciclo; generación y token delimitan sus owners. Las distribuciones tienen autoridades y ledgers separados.

QA0 es la única autoridad poblacional. El frontend solo conserva correlación y si ya vio un check primario, sin contador paralelo D0/Dv/Dc. Primera positiva sin check previo produce censura izquierda; cerrar manualmente la ventana produce censura derecha de oportunidades sin terminal. La falta de fetch/identidad no se rellena desde un éxito posterior. Los resets y cancelaciones acreditan revocación, pero no acreditan `complete`, error comercial o frame: outcomes no se adquieren en II-A.

En todos los ámbitos `sourceComplete={D0:false,Dv:false,Dc:false,outcomes:false}` permanece fijo, sin setter. B0 válido por muestra (nivel A) no acredita integridad poblacional (nivel B). Todas las tasas exactas conservan `value:null/exactRatesAllowed:false`; `firstPassFrame` mantiene `temporal-coverage-not-implemented` en el export QA0 sin reinterpretación.

| Partición compartida | Máximo lógico |
|---|---:|
| Resúmenes QA0, máximo 64 | 262144 bytes |
| Agregado QA0 | 16384 bytes |
| Metadata y autoridad nueva | 16384 bytes, reserva de autoridad 12288 |
| Ring QA0, máximo 1000 | 524288 bytes |
| Ring packets/recibos, máximo 1000 | 1277952 bytes |
| Total | 2097152 bytes |

Los límites de bytes pueden expulsar detalle antes de alcanzar 1000+1000. No se desalojan resúmenes para admitir la oportunidad 65. La autoridad acumula cargos escalares y falla cerrada al agotarse, sin GC supuesto para recuperar presupuesto. Puede agotarse antes de 64 oportunidades en genealogías más complejas; se declara el gap. El export es manual, saneado y anidado sobre el QA0 original, con límite de serialización; si lo supera, retorna `export-too-large` sin JSON parcial. Los límites y el export se ejercitan con el constructor real de QA0.

La evidencia es de **presupuesto lógico** según el modelo aprobado, no una medición del heap del motor. No se afirma que los WeakMaps, el bootstrap del script, las pilas temporales o el string del export tengan un heap físico de 2 MiB. Ni el coste temporal ni la presión GC en navegador están medidos.

## Validación y límites de la demostración

Resultados verificables en `intext-p14b-qa1b-stage2a-results.json` y logs completos. Se ejecutan las pruebas II-A, las **57/57** aprobadas de etapa I y las **110** congeladas QA0/QA1-A. Estas últimas conservan **108 PASS / 2 FAIL**: las dos aserciones históricas del `.sty`, expected 3903 / actual 3940, con expected/actual y stack en el log completo. No se filtran, deshabilitan ni alteran. No se restaura el archivo.

Los oráculos incluyen igualdad de bytes fuera de los métodos declarados, igualdad de awaits y llamadas comerciales por método, inversión exacta con hashes aprobados, comparación original/copia de efectos ordenados y resultados/excepciones, poblaciones esperadas por oportunidades conocidas y evaluación/contabilidad del QA0 real. Las ramas cubren false→true, stale sin ejecución, W1, W2/W3 con y sin standby, W4/C1, short circuits, fallos de prepare/guard/sink, handoff, revocación, JSON/foreign, reloj inválido, rings, export, agotamiento y oportunidad 65. `effects.json` aporta huellas completas representativas, y la suite amplía las ramas comparadas.

La VM compila el script completo solo para verificar sintaxis; **no lo ejecuta**. Ejecuta métodos extraídos con objetos simulados, sin SDK, DOM real, timers reales ni requests. Los dobles registran las llamadas que los métodos originales habrían hecho, incluidos callbacks/listeners/timers ya existentes. La igualdad del orden, argumentos escalares, awaits y valores no demuestra igualdad del tiempo de CPU ni de todos los interleavings reales. Las expresiones comerciales no se reordenan, pero hay trabajo síncrono adicional de observación y lecturas de campos internos ordinarios en los taps; los accesores/proxies hostiles del runtime no se consideran acreditados por estas pruebas. Ninguna medición de publicidad/viewability real se ha realizado.

Antes de una adquisición real quedan abiertos: autoridad de carga/realm y enlace browser seguro, fuente temporal nativa, genealogía en SPA y solapamientos reales, disponibilidad del anchor al fetch, cobertura de la ruta legacy sin generación nativa, revocaciones ante todas las carreras SDK, costes temporales/heap, sanción de límites bajo presión y export manual en página. Se exige cobertura funcional acreditada, gaps declarados y presupuesto medido para avanzar; las tasas exactas requerirían otro perfil de cobertura completo aprobado independientemente. El protocolo siguiente es únicamente una propuesta en `intext-p14b-qa1b-stage2a-browser-protocol.md`.

## Tabla de cambios

| Cambio II-A | Alcance y reversión |
|---|---|
| Productor nativo y frontend QA0 separados | Archivos nuevos; sin modificar la autoridad I-01, sus fixtures, schema o adaptador. |
| Taps B0 y fronteras de identidad | Solo las dos copias nuevas, hashes/anchors cerrados, endpoint null e inversión byte a byte. |
| Pruebas y evidencias | Nuevas suites/logs; se mantienen íntegros los FAIL históricos y el baseline aprobado. |
| Informe y protocolo propuesto | Documentación nueva; no autoriza ni inicia ejecución en navegador. |

Entrega detenida para auditoría independiente. No se ha activado automáticamente ninguna etapa posterior.
