# P1.4-B-QA1-A — Conversor offline para revisión independiente

27/10/2026. **QA1-A desarrollado y validado solo sobre archivos locales existentes.** La autorización de esta tarea habilita la conversión offline; sucede a la aprobación final de QA0. Los documentos previos que aún dicen «QA1-A bloqueada» quedan como registro histórico intacto. QA1-B, B runtime/enforce, A3 y C siguen sin autorización. No se ha cambiado roadmap, core, coordinador, probe, bundle ni archivo QA0 aprobado.

Revisión P2: [informe de cierre](intext-p14b-qa1a-p2-closure.md). Se separa atestación del runner y cotejo independiente local de bytes; se formalizan rectPresent/rectComplete/rectUsable y se elimina toda etapa por defecto. El inventario previo conserva los 98 nombres de pruebas ejecutadas y el orden de los 3.186 registros para comprobar las variaciones.

## Entrega y ejecución

| Archivo nuevo | Función |
|---|---|
| [Conversor](../tests/qa/intext-p14b-qa1a-converter.cjs) | JSON + SHA256 esperado + recibos de metadatos → muestras QA0 y evidencia parcial saneada; sin I/O |
| [Runner offline](../tests/qa/intext-p14b-qa1a-offline.cjs) | Lectura explícita de diez conjuntos conocidos; prueba de asociación y cuerpos HAR; export manual a dos nombres QA1-A nuevos |
| [Verificador de artefactos](../tests/qa/intext-p14b-qa1a-artifact-proof.cjs) | Recalcula bytes/HAR y correlación de exports en un módulo separado, sin confiar en la atestación del runner |
| [Fixtures capturados](../tests/qa/intext-p14b-qa1a-captured-fixtures.json) | Proyecciones saneadas con archivo/hash/pointers originales; no son exports completos ni cobertura total |
| [Tests](../tests/intext-p14b-qa1a.audit.test.cjs) | Procedencia, identidades, etapas, límites, unknown, relojes, aislamiento y frozen files |
| [Matriz](intext-p14b-qa1a-results-matrix.md) | Resultados útiles, parciales y desconocidos; condición para una eventual QA1-B |
| [Resultados](intext-p14b-qa1a-results.json) / [muestras](intext-p14b-qa1a-converted.json) | 20 exports separados, 30 archivos fuente hashados y 3.186 registros con pointer a su origen |
| [Integridad](intext-p14b-qa1a-integrity.json) / [baseline](intext-p14b-qa1a-protected-before.json) | Archivos nuevos, hashes, verificación de inputs y congelación de los 345 preexistentes |

Comando **manual**, desde src/pro, que solo lee el material local ya disponible y escribe los resultados QA1-A nuevos:

```powershell
node tests/qa/intext-p14b-qa1a-offline.cjs 'C:/Users/pedro.ramos/Downloads' docs
```

No hay directorio automático, descarga, escaneo de URLs, importación de scripts capturados, almacenamiento browser ni envío remoto. Importar los módulos no ejecuta el runner. La escritura solo se produce mediante llamada explícita/CLI; los nombres de salida están fijados al prefijo QA1-A. Los HAR se leen como JSON: URL se analiza como dato para correlacionar documento/cuerpo, sin navegación, fetch ni anuncios. No se generó un HAR nuevo.

## Contrato de conversión y procedencia

`convertExportV1({text, expectedSha256, context})` comprueba tipo, límite de bytes, SHA256 y formato. Perfiles: `p14a-dependencies-v1` con integración anidada, `p13c-integration-observe-v1` independiente y debugger `schemaVersion=1.0.0`. QA requiere qaOnly=true/enforce=false. Campos desconocidos, XML, targeting, URLs y mensajes arbitrarios no se copian. Un schema/hash incorrecto o límite excedido produce error explícito, sin truncar silenciosamente ni emitir una tasa.

El SHA256 prueba identidad de bytes con el input inventariado, no es una firma ni acredita por sí solo que sus atestaciones describieran la realidad. La semántica se contrasta con los productores QA congelados, los registros y, para distribución, con el body del script capturado. El runner:

1. Valida por contenido los papeles QA/debugger; no confía en sufijos E0/E1/Legacy/PSP del filename.
2. Fija brazo solo con arm y un assignment_fixed coherentes, sin conflicto. Cohorte solo con dualMode/pspDetected/randomSource compatibles.
3. Vincula **metadatos**, no muestras, mediante dos o más coincidencias exactas y distintas evento/timestamp/slot/cycle/token. Sin vínculo, runtime prestado y brazo del debugger quedan unknown. No usa vecinos por tiempo.
4. Correlaciona un documento HAR con origin/path del debugger y la ventana grabada, exige pageref compatible y body único con hash de bundle congelado y brazo compatible. Una ruta `_gam_kv_.js`, el nombre de clase IntextManager o una versión declarada no bastan. El recibo conserva SHA del HAR y entryIndex.
5. Mantiene partición por captureLocalId + SHA del export + cohorte + brazo + distribución + versión. Ningún token local une documentos o exports. El namespace doc derivado del hash se etiqueta **no verificado como identidad live**.

El recibo del runner es una **atestación**, no prueba autosuficiente. `verified=true`, hashes con forma válida o una copia JSON de un resultado no permiten acreditar distribución. Un módulo separado recibe los bytes HAR/QA/debugger y sus SHA-256, vuelve a calcular hashes, arm/assignment, coincidencias de contenido, documento/pageref y body único contra los cuatro artefactos fijados por A2; contrasta cada campo del recibo. Solo ese cotejo produce una capacidad efímera ligada a los hashes exactos de los dos exports y al artefacto; no se serializa como permiso reutilizable. Un recibo alterado o replay sobre otros bytes queda no corroborado. El runner conserva su atestación y el resultado local por separado; el conversor marca externalIndependentAudit=not-performed. **Una comprobación local por código separado no es una auditoría humana externa**, firma de procedencia ni prueba de identidad live, geometría o neutralidad del SDK.

Cada registro devuelve `sample`, `facts`, `evidence` y resultados del evaluador QA0 **sin modificarlo**. El pointer identifica el índice original incluso cuando se excluyen logs no métricos o campos sensibles. Epoch de métrica y log exterior se guardan separados; los monotónicos se copian del productor que usaba performance.now. No se calcula un nuevo origen, tiempo final, offset o trayectoria. El orden de fuente y sus secuencias se conservan, con regresión o campo ausente explícitos.

### Límites deliberados, sin relajar QA0

- **C0:** solo booleano directo de snapshot.readiness.eligible. `reason=visible`, video_activation_eligible o una intersección no se convierten en booleano C0. B0 no exige P; sigue unknown cuando falta identidad fiable.
- **Identidad:** se conservan escalares acreditados; faltan anchor/fetch y asociación documental/nav completa de la misma observación. `verified=false`, sin default fetch=1, anchor=slot o nav=0 del artículo. navIndex=0 real en debugger se conserva solo allí. No se parchea la identidad para que pase QA0.
- **P:** rect de playerSurface preservado como quality=partial, incluso cuando no sea utilizable; no estimación pre-player ni cambio a measured cualificado. rectPresent exige objeto rect; rectComplete exige left/top/width/height numéricos finitos; rectUsable exige además dimensiones positivas y extremos/área representables. Usable describe solo el rectángulo local, no un modelo Q1–Q5 apto para B. Campos numéricos, ausencias, null y strings numéricos se conservan sin coerción en evidence.playerRect.original; el helper distingue también NaN/±Infinity/-0 en pruebas directas. JSON no admite NaN/Infinity: un null del export permanece null, sin reconstruir su causa. Strings sensibles y tipos no admitidos se sanean conservando tipo, hash cuando procede y pointer al raw. Width del viewport, revisiones CSS/config y Q1–Q5 faltantes quedan null/unknown. No se traslada viewportHeight del debugger a un snapshot próximo ni se inventan padding/bordes cero.
- **Etapa:** solo el catálogo explícito de eventos de productores congelados acredita before-player/after-player/post-request/post-reveal. El evento desconocido, un prefijo familiar, stage declarado por el input, revealed=true o un vecino conocido no acreditan etapa: se emite unknown y stageEvidence=unknown. No hay default after-player ni promoción de P a pre-player. El catálogo se limita a nombres exactos emitidos por los productores; no generaliza prefijos.
- **Frame:** se guardan IDs numéricos que realmente constan, como observaciones locales; no se crean managerLocalId/mediaLocalId/binding ni metadatos de decodificación/presentación. No se entrega facts.frame. Native IMPRESSION con manager y token compatibles se conserva como evento nativo, sin frame ni píxeles perceptibles. Core:first-frame y otros hitos se conservan como nombre de evento, sin promoverlos.
- **Contabilidad:** coverage D0/Dv/Dc/outcomes false. Los formatos existentes no acreditan identidad completa para admitir oportunidades; los 3.186 registros **no** se ingresan como oportunidades ficticias al ledger. Sus resúmenes retenidos vacíos no significan tráfico cero. Se declara notAdmittedToLedger y coverage-insufficient; todos los rates son null. La ventana contable queda unknown, con tiempos null; no se cierra artificialmente en t=0.
- **Censura/gaps:** primera entrada física no cubierta se marca separadamente. Drops desconocidos/positivos, integración ausente, args métricos ilegibles y regresión se conservan. La insuficiencia de D0/Dv/Dc no se atribuye automáticamente a leftCensored; deriva de fuente/identidad/población no acreditadas.
- **B4/B5:** resultados unknown/deferred, sin evaluador temporal, adquisición o uso de pares para simular trayectoria. No se elige umbral ni se estiman ingresos/fill/viewability contrafactuales.

## Validación, cobertura y reproducibilidad

**110/110 pruebas pasan en Node 25.8.1**, sin fail/skip/cancelled: las 98 originales se han vuelto a ejecutar y se añaden 12 regresiones P2. Las 71 de QA0 están intactas. Son 108 funcionales y dos verificaciones locales de inventario (333 originales y 345 anteriores a QA1-A). El nuevo suite verifica además cuerpos como datos, límites, sanitizado, recibos falsificados/replay, geometría inválida y etapas desconocidas, censura y una VM sin globals browser/red/timers/proceso accesibles al conversor. No hay mocks de lifecycle ni un reemplazo del evaluador. El fixture de C0/anchor conserva valores reales y la prueba sintética de B0 con identidad completa es un test del contrato, **no una identidad añadida a las capturas**.

Fuentes: [salida final](intext-p14b-qa1a-validation.txt) y [LCOV de los tres módulos QA1-A](intext-p14b-qa1a-coverage.lcov). QA0 mantiene su cobertura/documentos previos intactos.

| Cobertura V8 QA1-A | Líneas | Ramas | Funciones |
|---|---:|---:|---:|
| Verificador local de bytes | 100% | 88,24% | 100% |
| Conversor | 100% | 98,22% | 100% |
| Runner offline | 95,88% | 86,08% | 96,30% |
| Total | 98,92% | 94,39% | 98,72% |

Las líneas no cubiertas del runner corresponden a su entrada CLI; esta se ejecutó manualmente sobre los 30 inputs existentes. La cobertura del harness no incluye esa ejecución manual ni implica coste de observación en navegador. Las ramas restantes (errores/campos alternativos, cuerpos o correlaciones HAR incompletos y límites de salida) figuran en LCOV y no se ocultan. Se han comprobado las rutas críticas de missing identity, C0 sin P, clocks, stale/terminal, sin frames, recibos por distribución y tope combinado de 10.000 registros.

```powershell
node --test --test-isolation=none --experimental-test-coverage --test-coverage-include=tests/qa/intext-p14b-qa1a-converter.cjs --test-coverage-include=tests/qa/intext-p14b-qa1a-artifact-proof.cjs --test-coverage-include=tests/qa/intext-p14b-qa1a-offline.cjs tests/intext-p14b-shadow.audit.test.cjs tests/intext-p14b-qa1a.audit.test.cjs
```

Los tests funcionales/proyecciones son transportables con los fuentes y fixtures congelados. Verificar todos los originales requiere el workspace completo; repetir la conversión completa y revalidar hashes/pointers raw requiere los archivos locales inventariados, que no se copian íntegros al repositorio. La repetición externa 70/70 en Node 22.16.0 acredita QA0 aprobado; **no se afirma haber repetido QA1-A en Node 22** en este entorno.

Límites offline explícitos: 8 MiB por export JSON, 10.000 logs por stream, 10.000 registros combinados; HAR máximo 128 MiB/100.000 entries; salida máxima 64 MiB por resultado. Son límites de datos/serialización, no una certificación de heap físico. El runner procesa cada HAR sin ejecutarlo; un error no autoriza ampliar capturas, borrar inputs o reducir validaciones.

## Integridad, límites pendientes y parada

La captura previa inventaría **345 archivos**, incluidos los 333 originales y los 12 artefactos QA0. Sus tamaños/SHA256, el manifiesto QA0 aprobado y los inputs leídos se vuelven a cotejar en el manifest QA1-A. El helper de datos QA0, evaluador, ledger, fixtures/tests y resultados/documentos QA0 permanecen byte por byte. No se borra, restaura, regenera o hace checkout/reset del trabajo anterior. La reversión de QA1-A es retirar únicamente los archivos nuevos listados en su manifest; no requiere revertir core ni reconstruir bundles. Se prueba por proyección, sin borrar ahora la entrega.

Los datos alcanzan para revisar conservación/procedencia y límites del conversor. **No alcanzan para evaluar B como gate por oportunidad o emitir tasas exactas.** El primer bloqueo técnico es identidad/ámbito/C0 sincronizados, incluso antes de P. Para geometría harían falta las lecturas/operandos/revisiones Q1–Q5 del mismo check; para outcomes de frame, binding completo y evidencia de presentación/decodificación; para denominadores, hechos fetch/winner/terminal con cobertura contable independiente del ring. Los snapshots actuales no suplen esas carencias aunque sus dropped sean cero.

Recomendación: revisar esta entrega independientemente. Si se aprueba continuar, diseñar **por separado** el alcance mínimo QA1-B en callbacks ya existentes, empezando por identidad y C0, y presupuestar el coste total de lectura/layout/dispatch/evaluación/registro. Cualquier hook, artefacto QA, instrumentación o adquisición futura necesitaría aprobación expresa de alcance y coste; no se implementa ni se inicia aquí. Una eventual comparación geométrica debe conservar las diferencias de `_gam_kv_.js`/Manager, el lifecycle/ownership/TTL y Q1–Q5, sin usar el resultado B como permiso. Un gate anterior a requestAds seguiría sin garantizar visibilidad cuando IMA responda tras una demora.

Parar ante procedencia ambigua, mezcla de cohortes/relojes, promoción de unknown a measured/verified, necesidad de ampliar capturas, tasa con población incompleta, datos sensibles en salida, dependencia comercial o un resultado consultado por control. CPU/layout/heap en móvil, P1.3c visual y H-IMA/H-QA siguen pendientes. No hay B shadow runtime/enforce, A3, C, hooks, listeners, observers, navegador, peticiones publicitarias, commit, push o despliegue. **Trabajo detenido para revisión independiente.**
