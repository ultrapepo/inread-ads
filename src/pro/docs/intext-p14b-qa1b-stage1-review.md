# P1.4-B-QA1-B — Etapa I aislada offline

13/11/2026. Implementación de etapa I autorizada por el usuario tras aprobar `r1-review-B` y su cotejo del 13/11. **Entrega para auditoría independiente; etapas II–IV y adquisición real bloqueadas.** Solo se añaden archivos. Los cuatro contratos vinculantes, los 360 originales, QA0/QA1-A, probes, coordinador y bundles permanecen intactos.

## Resultado y alcance

Se implementan contrato versionado, registro de identidades de fixtures, selector R1, adaptador hacia QA0 real, contabilidad sintética, memoria compartida, export manual y generador reversible. No existe productor conectado al runtime, hook de adquisición ni lectura de DOM/SDK. Los únicos objetos admitidos por el registro son handles vacíos de fixtures, creados y reconocidos mediante WeakSet. `verified` describe coherencia del fixture: no certifica observaciones reales.

La validación y sus límites constan en [resultados](intext-p14b-qa1b-stage1-results.json), [salida nueva](intext-p14b-qa1b-stage1-validation.txt), [salida congelada](intext-p14b-qa1b-stage1-frozen-validation.txt), [evidencia de datos/límites](intext-p14b-qa1b-stage1-evidence.json) y [matriz de los 52 casos](intext-p14b-qa1b-stage1-case-matrix.md). Un caso puede quedar validado como contrato sintético, parcialmente cubierto o diferido; no se afirma que se hayan ejecutado 52 escenarios comerciales.

| Archivo nuevo | Función |
|---|---|
| [packet.cjs](../tests/qa/qa1b/packet.cjs), [schema JSON](../tests/qa/qa1b/packet.schema.json) | Packet `qa1b-packet-v1`, revisión `r1-review-B`; esquema cerrado y validación sin getters, coerción ni campos extra |
| [identity-registry.cjs](../tests/qa/qa1b/identity-registry.cjs) | WeakMaps con valores escalares compactos, aliases de handles, bindings, handoff, retiro y snapshots inmutables |
| [adapter.cjs](../tests/qa/qa1b/adapter.cjs) | Ingreso explícito, selector, deduplicación, ledger QA0 público, rings, cierre y export manual |
| [generator.cjs](../tests/qa/qa1b/generator.cjs) | Validación de hashes/anchors, copias inertes, diffs/manifiestos y reversión de bytes/archivos generados |
| [fixtures.cjs](../tests/qa/qa1b/fixtures.cjs), [tests](../tests/intext-p14b-qa1b-stage1.test.cjs) | Objetos simulados y trazas explícitas; oráculos independientes y constructor real de QA0 |
| [gates.cjs](../tests/qa/qa1b/gates.cjs) | Comprobación de criterios declarados para una futura propuesta de II; no otorga permisos ni mide presupuesto |
| [evidence.cjs](../tests/qa/qa1b/evidence.cjs) | CLI offline explícita que materializa evidencia sintética y diffs; nunca importada por el adaptador |
| [delivery-integrity.cjs](../tests/qa/qa1b/delivery-integrity.cjs) | Cotejo de bytes y plan revisable de retirada de todos los archivos nuevos; no borra la entrega |

## Identidad, selector y contabilidad

Cada instancia se fija a una distribución, documento y reloj sintético. Navegación/slot/ciclo identifican la oportunidad dentro de esa serie; generación, anchor, token, creative y entry conservan su genealogía. Los snapshots viejos retienen generación/token originales y pasan a stale; el handoff no crea otro D0. Una generación ausente queda null/unknown y causa gap; nunca se sustituye por 1, token o generación del lease.

W2/W3/W4/C1 solo proyectan control cuando hubo ejecución, resultado booleano, identidad y ownership completos/live, procedencia sintética coherente, vídeo, etapa before-player y ausencia de player. W2 admite creative=null si el ownership Node/waterfall/intento existe. B0 true y false funcionan con P desconocido. False implica candidato fail, sin invalidar la muestra A. Guard no ejecutado lleva eligible=null; eligible=false en esa condición es un packet inválido.

W1 conserva serie Display, incluso tras winner inicial Video; C2–C11 conservan las series no-fill, diagnóstico, preparación, recuperación, reveal o activación post-player pertinentes. Esos guards no se ingieren como control primario. Los hechos poblacionales requieren fronteras propias: fetch explícito, winner de decisión nativa simulada y terminal del propietario. Un descriptor local de preparación no crea winner, Dv ni Dc. Subattempt-end no cierra la oportunidad.

El perfil impone `eventId=e<sampleSequence>` por serie y una secuencia creciente única que incluye también hechos y series raw. Dos checks originales usan secuencias distintas; retransmitir conserva ambos identificadores. El packet idéntico retenido devuelve un recibo duplicate sin otro ingest. Un conflicto de contenido se rechaza y marca gap. Una secuencia retirada del ring se rechaza conservadoramente como retired-sequence, con gap: no se finge conocer su contenido ni se reingiere. Así no se mantiene un índice ilimitado de tombstones. Saltos de secuencia y regresiones de reloj también declaran gaps.

QA0 es la única autoridad de D0/Dv/Dc. La metadata auxiliar solo guarda correlación con opportunityId público y si ya hubo primer check primario; no cuenta otra población. Primera muestra primaria positiva marca censura izquierda geométrica sin inventar gap contable. Cada primer true acreditado puede fijar Dc una vez; los siguientes no cambian firstControlAt. Todas las opciones sourceComplete se construyen false, no existe setter y los exports se devuelven separados. Las tasas exactas permanecen false/value=null, y firstPassFrame conserva temporal-coverage-not-implemented. Los tests A07/A08 usan instancias QA0 sintéticas separadas como oráculo de sus condiciones congeladas; no aprueban un perfil real ni promocionan el adaptador.

## Presupuesto lógico y exportación

| Partición | Límite |
|---|---:|
| Resúmenes QA0 / oportunidades | 262144 bytes / 64 |
| Agregados QA0 | 16384 bytes |
| Metadata adaptador, correlación y cargos del registro | 16384 bytes |
| Ring QA0 | 524288 bytes / hasta 1000 entradas |
| Ring de packets + recibos + fingerprint | 1277952 bytes / hasta 1000 entradas |
| Total compartido | 2097152 bytes |

El constructor QA0 real recibe totalBytes=802816 para sus tres particiones. Las reducciones deben respetar los máximos, la suma y el preflight real de agregados; no se elevan límites QA0. El registro carga conservadoramente aliases y valores escalares de WeakMaps, con tope de 12288 bytes dentro de metadata; reemplazos no recuperan presupuesto artificialmente. Los mapas son débiles hacia los handles y sus valores no contienen referencias DOM/SDK. Las estructuras auxiliares están contabilizadas. No se promete heap físico de 2 MiB.

En el estrés de 2001 guards originales más fetch/winner se retienen **792 snapshots QA0 + 844 packets = 1636 entradas**: los límites de bytes se alcanzan antes del máximo de entradas. Se conserva D0/Dv/Dc observado 1/1/1. Uso lógico: resúmenes 920, agregados 1123, ring QA0 523909, metadata/registro 895 y packets/recibos 1277395 bytes; total 1804242. La serialización manual de esa evidencia ocupa 1769923 bytes. Son resultados de fixtures, no medición de anuncios. La evidencia JSON conserva los detalles reproducibles.

La oportunidad sintética 65 deja 64 resúmenes y activa accountingOverflow sin evictar identidades; las notificaciones no retenidas no se presentan como oportunidades únicas. Se prueban también particiones reducidas, rechazo por tamaño, evicción por entradas y bytes, payloads numéricos/string acotados y export-too-large sin JSON parcial. El límite de contadores se contrasta con BigInt; no se ejecutan billones de notificaciones. Un overflow de metadata detiene y censura únicamente la colección de datos con tiempo suministrado y gaps, sin API comercial.

`exportManual()` conserva el export QA0 original y entradas `{packet,receipt,fingerprint}`. Los recibos correlacionan eventId/sampleSequence con el opportunityId público devuelto por ingest. Raw excluido o no admitido tiene opportunityId=null; no se inventa una relación. `serializeManual()` impone el máximo total y no trunca ni resetea. No hay almacenamiento o envío en el adaptador. El [export de ejemplo](intext-p14b-qa1b-stage1-synthetic-export.json) lo escribe explícitamente la CLI de evidencia con datos sintéticos como artefacto de revisión.

## Generación y reversión

Solo se aceptan los hashes base aprobados de ambas distribuciones; siete anchors exactos deben aparecer una vez. Cualquier byte divergente impide generar. La transformación actual **solo antepone un comentario inerte**, sin import, flag ejecutable, hook ni modificación del cuerpo original. Los [diff GAM](intext-p14b-qa1b-stage1-gam.diff) y [diff Manager](intext-p14b-qa1b-stage1-manager.diff) son auditables; sus hashes, anchors y hashes de las copias constan en la evidencia. No quedan copias publicitarias completas en el workspace: las pruebas escriben y retiran sets temporales, sin importarlos, evaluarlos o servirlos.

La reversión de bytes elimina exclusivamente el prefijo exacto y exige obtener el hash base aprobado. La retirada de un set temporal verifica todo el inventario, cada hash, los bytes base recuperables y el diff esperado antes de borrar; rechaza archivos extra, symlinks fuera del destino y artefactos alterados. No sobrescribe un destino existente ni escribe en los originales. La generación limpia sus propios archivos nuevos si falla una escritura.

La [integridad de etapa I](intext-p14b-qa1b-stage1-integrity.json) enumera todos los archivos nuevos, con hash y tamaño; su propio hash se excluye para evitar autorreferencia. `delivery-integrity.cjs plan` produce la retirada exacta de ese inventario más el manifiesto. La prueba de reversibilidad verifica por proyección que retirar esos nombres deja intactos los 360 originales y cuatro contratos. **No se ejecuta esa retirada sobre la entrega.**

## Validación reproducible

Entorno: Node v25.8.1, win32. Los comandos se ejecutan desde `src/pro`, sin instalar dependencias:

```powershell
node --test --test-isolation=none --experimental-test-coverage --test-coverage-include=tests/qa/qa1b/*.cjs tests/intext-p14b-qa1b-stage1.test.cjs
node --test --test-isolation=none tests/intext-p14b-shadow.audit.test.cjs tests/intext-p14b-qa1a.audit.test.cjs
node tests/qa/qa1b/evidence.cjs
node tests/qa/qa1b/delivery-integrity.cjs verify
node tests/qa/qa1b/delivery-integrity.cjs plan
```

La salida nueva final corresponde a **44 PASS, 0 FAIL, 0 skipped/cancelled**. Los oráculos incluyen un reductor independiente por conjuntos de oportunidades, expectativas de las trazas nativas simuladas, aritmética BigInt, los bytes/hash de los contratos base y las APIs reales QA0; no se sustituyen ledger/evaluador por mocks. El aislamiento carga los módulos en un realm sin DOM, red, SDK o timers. La cobertura del test runner no mide coste de navegador ni acredita todas las ramas defensivas. La CLI de evidencia y el verificador de entrega se comprueban además como comandos offline separados.

Las suites congeladas se repitieron completas y dieron **108 PASS / 2 FAIL** sobre 110 tests. Ambos fallos son las verificaciones históricas de 333/345 archivos: esperan `.sty` de 3903 bytes y reciben 3940. Se conservan los tests y sus baselines sin filtrar ni reparar; no se presenta esa ejecución como 110 PASS. La [captura inicial actual](intext-p14b-qa1b-stage1-before.json) acredita el `.sty` de 3940 bytes, SHA256 `15c72d69032cc0e212b1501cdd78e9da78561b404c65165fe1a6d02efe16b660`, y su before/after actual pasa para los 360 originales. Los cuatro contratos también se conservan por hash.

La [matriz JSON](intext-p14b-qa1b-stage1-case-matrix.json) desglosa los 52 casos. G01–G06/G11–G15 conservan limitaciones de evaluación/callback real aunque su contrato de datos se ejercite; P03–P06 y O01–O05 permanecen diferidos. A04 comprueba criterios declarados, no un presupuesto ya medido. Las salidas de tests no se usan para afirmar adquisición, resultados de ingresos, fill, viewability o primera pasada física.

## Riesgos abiertos y propuesta mínima de II

Persisten la procedencia real del resultado original y los retornos tempranos, fronteras nativas de navegación/ciclo/generación, cobertura de rutas y exclusiones, invalidaciones asíncronas, diferencias de distribución y presupuesto CPU/layout/GC/heap. La identidad sintética no prueba ninguno de esos hechos. El registro aplica un límite conservador durante toda su vida y puede agotarse en reemplazos; un futuro productor deberá declarar gap/stop QA y no actuar sobre anuncios. Los recibos y hashes de este artefacto tampoco prueban que un bundle se haya servido o ejecutado.

El generador aún no inserta taps; su siguiente transformación requerirá diff propio aprobado. La propuesta mínima para II es un productor B0 en **copias nuevas** con taps sobre las fronteras ya existentes de documento/nav/node/fetch/ciclo/winner/handoff/terminal y W2/W3/W4/C1, reutilizando exactamente los resultados originales. Mantendría sourceComplete=false en todos los ámbitos y las exclusiones R1; generación ausente seguiría raw/unknown con gap. Sin P, SDK, manager, medios, frames ni productores III/IV.

Antes de cualquier entorno, tráfico o medida real se necesitará autorización expresa aparte. La futura puerta de salida de II exigirá A factual, cobertura funcional por distribución/ruta, invariancia comercial, gaps/censuras declarados y presupuesto total medido: p95 síncrono ≤2 ms, tiempo total ≤1% de ventana fijada, ningún long task interactivo >50 ms nuevo atribuible, además de partición lógica y atribución CPU/layout/GC. Los límites físicos propuestos de heap/export siguen pendientes de aprobación y medición. Tasas exactas exigirían otro perfil poblacional completo aprobado independientemente antes del constructor, sin promover esta instancia.

**Parada actual:** entrega de etapa I para auditoría independiente. No se inicia II–IV, B shadow runtime, B enforce, A3 o C. Sin navegador, Fiddler, requests publicitarios, capturas, activaciones, commit, push ni despliegue.
