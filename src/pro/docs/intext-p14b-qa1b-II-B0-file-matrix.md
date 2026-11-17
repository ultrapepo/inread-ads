# QA1-B II-B0 — permisos propuestos y trazabilidad de archivos II-B1

**Esta matriz no autoriza implementación.** Solo se han creado documentos II-B0. Las 29 rutas siguientes son una allowlist **propuesta** para una eventual autorización II-B1 offline; cualquier ampliación, sobrescritura o dependencia no contemplada requiere revisión separada. II-B2/C y II-B2/P tienen otras puertas de autorización y no se ejecutan al aprobar un build.

Read-only obligatorio: los 411 archivos de [preflight](intext-p14b-qa1b-II-B0-preflight.json), incluidos los dos cores originales, cuatro contratos, QA0/QA1-A, I/I-01, II-A/copies/logs, probes, coordinador, bundles y paquetes previos. No cambiar esas fuentes para facilitar el port a browser. Si existe cualquiera de las rutas futuras con bytes no aprobados, II-B1 debe parar; no borrarla o reemplazarla suponiendo que es output propio.

## 1. Allowlist futura, todos ADD-only

Coste indicado = dónde debe cargarse y medirse, **no valor medido**. «Disco/offline» no consume retención de página; si una fuente se incluye en el bundle, su parse/setup/heap incremental sí se mide. Trazabilidad Bxx refiere a la [matriz de pruebas](intext-p14b-qa1b-II-B0-test-matrix.md).

| # / ruta exacta nueva propuesta | Permiso y función | Invariante / oráculo | Coste y conflicto conocido |
|---|---|---|---|
| 01 `tests/qa/qa1b2b1/runtime.factory.js` | ADD, fuente de factory privada: autoridad, clocks, lineage, frontend, rings, coste y admin | Sin globals de ingreso/activate, sin SDK/DOM de medida/I/O; QA0 público, selector R1, cuatro false; B10–B44 | Setup/tap/staging/metadata/heap/export. No reutilizar factory offline II-A ni aceptar su capability de build Node en browser. |
| 02 `tests/qa/qa1b2b1/qa0-byte-length.js` | ADD, shim cerrado exclusivo de node:buffer para QA0 | UTF-8 igual al Buffer real, sin Buffer/require global y sin otros métodos; B04/B36 | Codificación en ingest/export. Cualquier uso adicional de Buffer/require detectado bloquea build. |
| 03 `tests/qa/qa1b2b1/native-browser.schema.json` | ADD, packet browser v1 y recepción/salida documentadas | Clock page-monotonic, origin/profile nuevos, procedencia local/external distintas, no credentials JSON; B10/B21/B35 | Tamaños máximos cargados a packets/header; no ampliar schemas I/II-A. Sin identidad completa no fabricar defaults. |
| 04 `tests/qa/qa1b2b1/release.schema.json` | ADD, release/input recipe y evidencia externa requerida | Input ID acíclico, hashes base/padre/módulos/salida, SRI, límites de distribución/contexto, estado de autorización; B01–B10 | Disco/control externo; no autohash embebido de su propia salida ni «cotejo» con hash declarado. |
| 05 `tests/qa/qa1b2b1/generator.cjs` | ADD, transform cerrado de nuevas copias y composición CJS | SHA exactos, anchors únicos, templates privadas, bytes congelados QA0 intactos, no eval/loader de red; B02–B05/B43 | Offline. Más invasivo que sustituir null: nuevas firmas/campos privados deben demostrar invariancia, no heredar PASS de II-A. |
| 06 `tests/qa/qa1b2b1/build.cjs` | ADD, CLI offline con outputs explícitos | Produce HTML 11 después de los hashes de cuerpos y rutas 14–29 pertinentes; rechaza entrada divergente; no sirve ni ejecuta copias; B01/B02/B49 | Disco/offline. No invocar como script de navegador ni sobrescribir generated/qa1b-stage2a. |
| 07 `tests/qa/qa1b2b1/verify.cjs` | ADD, CLI de lectura, hashes, diffs/inversión y allowlist | Verificador separado de build, no arregla divergencias; B01–B03/B49 | Offline. Requiere padres congelados, no acepta manifest autorreportado sin el release aprobado. |
| 08 `tests/qa/qa1b2b1/harness.cjs` | ADD, ejecución local de módulos/métodos nuevos aislados | No bootstrap comercial completo; clock/colas controlados, original real y QA0 como oráculos; B04–B51 | Solo coste de laboratorio Node. No se llama heap/clock real de Chrome. |
| 09 `tests/qa/qa1b2b1/fixtures/lifecycle.json` | ADD, vectores de owners, guards, SPA, reloj, pérdidas y errores | Datos sintéticos trazables, no objetos con verified que acrediten nada; B11–B44 | Disco/harness, nunca authority de productor. Sin XML/URLs/IDs comerciales. |
| 10 `tests/qa/qa1b2b1/fixtures/sri.json` | ADD, vectores de bytes/encoding/mismatch/caché/redirect | SHA conocidos/cotejados por oracle aparte; B06–B10 | Offline. Los casos de red/browser permanecen NOT-RUN, no se simulan como resultados reales. |
| 11 `tests/qa/qa1b2b1/fixtures/isolated.html` | ADD, HTML generado para futuro Chrome aislado; plantilla fija en el generador | Se genera una vez tras hash de fixture/canary, sin SDK/endpoints externos ni scripts de cores/II-A; SRI real de fixtures; B06–B20 | Futuro C, no abrir/servir en II-B1. No es el HTML de despliegue publicitario ni autoriza editarlo. |
| 12 `tests/qa/qa1b2b1/fixtures/canary.js` | ADD, canary no publicitario de carga/capability | Solo prueba mecanismo y ejecución=0 ante mismatch; B06–B12 | Futuro C. No inferir procedencia GAM/Manager real a partir de su PASS. |
| 13 `tests/intext-p14b-qa1b-II-B1.test.cjs` | ADD, tests offline futuros | Casos S0/S1 implementados, variantes y oráculos independientes; no editar los 106 ni congelados; B01–B52 pertinentes | Laboratorio. Los casos C/P no se cuentan como PASS/skip exitoso sin ejecutar/autorizar. |
| 14 `tests/qa/generated/qa1b-stage2b1/gam.qa.js` | ADD, copia completa nueva GAM con composición privada | Padre/base aprobados; sin cambios comerciales fuera de transform QA inventariado; B02/B03/B05/B43 | Parse/setup/retención runtime futuros, medidos O/N/E. Su hash todavía no existe. No ejecutar/servir por crearla. |
| 15 `tests/qa/generated/qa1b-stage2b1/manager.qa.js` | ADD, copia completa nueva Manager | Generar desde Manager, sin homogeneizar mute/animación con GAM; B02/B03/B43 | Igual separación; no original/copia ni GAM/Manager juntos en un realm. No modificar copia II-A. |
| 16 `tests/qa/generated/qa1b-stage2b1/isolated-fixture.qa.js` | ADD, build fixture con clases/métodos extraídos y factory nueva | Mapa de fragmentos/hashes nativos y stubs declarados, ninguna acquisition real; B04–B48 en C pertinente | Futuro C, costes solo del fixture. No llamarlo copia comercial completa ni usar su hash para acreditar 14/15. |
| 17 `docs/intext-p14b-qa1b-II-B1-copy-manifest.json` | ADD, inputs, módulos/wrappers, offsets, anchors, transform/inversión y hashes completos | No autorreferencias SHA; source map de cada fragmento y cambios añadidos a 36 métodos II-A; B01–B05 | Disco/evidencia; ningún hash actual de II-A se convierte en hash II-B1. |
| 18 `docs/intext-p14b-qa1b-II-B1-fixture-release.json` | ADD, hashes/SRI de fixture/canary/HTML aislado | Generar después de los cuerpos, registrar limitación sintética y nunca URL publicitaria inventada; B06–B10 | Disco; opt-in del entorno P queda fuera, desconocido y bloqueado. |
| 19 `docs/intext-p14b-qa1b-II-B1-gam.diff` | ADD, diff base/padre→copia GAM | Mostrar nuevos carriers privados y todos los taps; mantener resto de bytes y decisiones; B02/B03/B43 | Disco. No sobreescribir el diff II-A. |
| 20 `docs/intext-p14b-qa1b-II-B1-manager.diff` | ADD, diff independiente Manager | Mismo criterio sobre su propia fuente; B02/B03/B43 | Disco. No derivarlo del diff GAM ni tratar paridad como prueba. |
| 21 `docs/intext-p14b-qa1b-II-B1-results.json` | ADD, entorno, comandos, casos ejecutados/bloqueados y criterios | Separar nivel A/B, S0/S1 de C/P y resultados históricos; B35/B46/B51/B52 | Disco; ningún flag de coverage de QA0 se sustituye por veredicto externo. |
| 22 `docs/intext-p14b-qa1b-II-B1-validation.txt` | ADD, salida completa de nueva suite | PASS/FAIL/BLOCKED y expected/actual sin filtros; B51/B52 | Disco. No modificar logs II-A. |
| 23 `docs/intext-p14b-qa1b-II-B1-stage1-validation.txt` | ADD, salida nueva suite I congelada | 57 casos sin edición, documentar cualquier diferencia real; B51 | Disco; no copiar resultado previo como nueva ejecución. |
| 24 `docs/intext-p14b-qa1b-II-B1-stage2a-validation.txt` | ADD, salida nueva suite II-A congelada | 106 casos sin cambios; B51 | Disco; no promover sintéticos a perfil browser. |
| 25 `docs/intext-p14b-qa1b-II-B1-frozen-validation.txt` | ADD, QA0/QA1-A completas | Conservar expected/actual históricos .sty y todos los nuevos fallos; B01/B51 | Disco; nunca transformar 108/110 en 110 PASS editando pruebas/archivo. |
| 26 `docs/intext-p14b-qa1b-II-B1-effects.json` | ADD, traces originales/copia neutral/conectada por core | Argumentos comerciales/retornos/awaits/excepciones/orden y diferencias QA permitidas; B24–B44 | Disco/harness. Sin timings de navegador inferidos de Node. |
| 27 `docs/intext-p14b-qa1b-II-B1-budget-evidence.json` | ADD, partición lógica, constructor real, pérdidas, oracles y export | 2 MiB combinados, metadata preflight y alcanzabilidad 65; B36–B48 | Offline; todos CPU/layout/GC/heap browser NOT-MEASURED. No rellenarlos con números de fixtures. |
| 28 `docs/intext-p14b-qa1b-II-B1-browser-readiness.md` | ADD, riesgos, gates C/P, protocolo externo y resultados aún no disponibles | Scope de release/realm, permisos separados, gaps/legacy/BFCache; B20/B31/B46–B52 | Documental. No equivale a permiso de servir o medir. |
| 29 `docs/intext-p14b-qa1b-II-B1-integrity.json` | ADD, before/after y allowlist total | Congelados y documentos II-B0 intactos; self-hash externo; retirada de nuevos solo con hash/ruta coincidentes; B01/B49/B52 | Disco; no modificar manifiestos previos para incorporar el nuevo release. |

No se crean esas 29 rutas en II-B0. Cualquier herramienta/builder de terceros, archivo lock, package.json, módulo compartido o polyfill fuera de la lista es dependencia nueva a revisar; no instalar ni actualizar paquetes para que compile. Node/Git se usan como herramientas locales existentes, versiones registradas. La receta de build no puede iniciar un servidor, navegador, proxy, SDK o petición.

## 2. Fronteras que tocaría exclusivamente la nueva copia

| Símbolo / ubicación de referencia | Transform QA propuesto | Invariantes y conflictos |
|---|---|---|
| IntextManager, creación inicial/scoped y onNewArticleDetected | Factory privada por documento y paso a PlacementEngine/Node en sus construcciones reales | No rediseñar singleton, constructor comercial, selección de root o navIndex. Registrar semántica global/super/length y declarar BLOCKED si no se preserva. |
| IntextPlacementEngine.constructor/findPlacements y Node.constructor | Binding de doc/root/placement/node nativos | No nuevos selectores ni lecturas de geometría; índices ausentes no se convierten en cero. Argumento QA final no modifica options. |
| Node.initialize, `new IntextWaterfall` | Paso privado Node→Waterfall | GAM 10793 / Manager 9004, corroborado por graph y bytes. No modificar gexp.windows, wa/cI, config ni llamada comercial de initialize. |
| Node.beginVisualRender/invalidateVisualCallbacks/cycle/anchor | Lease/token/ciclo/anchor en asignaciones/retornos reales | Usar estados ya calculados, no llamar helpers extra ni cancelar por QA. Proteger acceso privado sin tragarse error comercial. |
| Waterfall.startFetch/startAuction/cleanup y decisión/auction | Vinculación de generación/owner y gaps legacy | Conservar awaits/checks/TTL, native decisions y orden. Ningún fetch QA, parche a legacy o ganador desde un descriptor. |
| Preparación/claim/release y construcción de Creative | Carrier privado y generación de entry/creative | No confundir entry.generation/fetchGeneration, ni crear/destruir creativo para observar. Subintentos no terminan oportunidad. |
| Guard returns, sitios W2/W3/W4, firma/check/finish de wait y activate final | Mismo objeto original + ticket privado por invocación, caller W2/W3/W4/C1 | Source string solo no acredita caller. Argumento QA final/default null, owner comercial igual; finish retira emisión futura, no borra hechos. Sin reevaluación, microtask/await ni quinto W0; W1/C2–C11 fuera del ledger B0. |
| Entrada nativa a construcción de player, abort/destroy | Estado de exclusión de B0 y revocación | No medir P, inicializar player, inspeccionar SDK ni convertir build-started en playerCreated cierto. |

Los 36 métodos heredados de II-A están identificados en su copy-manifest. La composición nueva necesita anchors **adicionales** para carrier/factory/initialize/creación de managers/nodes: su número/hash final se fijará en II-B1 después de leer cada cuerpo completo. No se afirma que los 36 actuales basten para el enlace privado ni se inventan hashes de código futuro. Un nuevo sitio no contemplado aquí o un cambio en comerciales exige volver a revisión del alcance.

## 3. Archivos que no se pueden cambiar

Las rutas individuales y SHA de los 411 existentes están en preflight. La prohibición incluye, sin limitarse a:

- `_gam_kv_.js`, `IntextManager.js`, `Indicar que dependencias tiene el core d.sty` y todo bundle productivo/histórico.
- `tests/qa/intext-p14b-data.cjs`, `tests/qa/intext-p14b-shadow-evaluator.cjs`, `tests/qa/intext-p14b-shadow-ledger.cjs` y las suites QA0/QA1-A. Leer/copiar **bytes** en wrappers nuevos no autoriza editarlos.
- Todos los módulos `tests/qa/qa1b/` y `tests/qa/qa1b2a/`, sus tests, fixtures, generated/qa1b-stage2a, evidencia, docs y manifiestos; no tocar I-01 para admitir browser.
- Los cuatro contratos QA1-B, coordinador, probes y sus builders/allowlists; no fabricar un bus ni ampliar el parser QA1-A.
- Git/entorno productivo/HTML de inclusión real, CSP/CORS, configuración de proxy y SDK, y cualquier targeting/floors/APS/Prebid/GAM. No hay permiso para modificar un archivo de despliegue de nombre desconocido.

## 4. Permisos que seguirían faltando

II-B1 necesitaría aprobación expresa de estas fuentes nuevas y transforms privados; no se deduce de aceptar II-B0. II-B2/C necesitaría release/Chrome/perfil local y host/controlador inventariados; II-B2/P además el punto real de inclusión, sus archivos/config/hashes, política de captura y alcance comercial. Si esas rutas operativas no están identificadas, se informa BLOCKED para su despliegue: no se elige un config productivo por conveniencia ni se inicia Fiddler para descubrirlo.

No se permite generar neutral/connected variants o HTML extra fuera de la allowlist de II-B1 sin incorporarlos y aprobarlos. La comparación O/N/E puede componerse en memoria en S1; si C/P requiere variantes persistidas con hashes propios, será parte de su inventario posterior explícito. Esto evita que una variante no manifestada llegue a la prueba browser.

Traza requisitos: A→04/05/07/10/12/17–20; B/C→01/05/08/09/13; D/E/F→01/03/08/09/13/26; G→01/02/13/27; H→10–12/16/18/28; I→01/06/07/13/29; J→esta matriz. La [revisión](intext-p14b-qa1b-II-B0-review.md) exige oráculos/evidencia por requisito antes de un sign-off independiente.
