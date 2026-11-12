# P1.4-B-QA1-A — Cierre de observaciones P2

27/10/2026. **Recomendación: QA1-A PASS para el alcance de conversión offline, pendiente de revisión independiente final.** Las tres observaciones P2 están resueltas en código, regresiones y resultados. No se interpreta como aprobación de QA1-B, runtime, enforce, A3 o C.

## Cambios exactos y evidencia

| Observación | Cambio QA1-A | Evidencia ejecutada |
|---|---|---|
| P2.1 | Nuevo [verificador local](../tests/qa/intext-p14b-qa1a-artifact-proof.cjs), `verifyHarArtifactV2` / `resolveHarProofV2`. El runner emite atestación, sin `verified:true`. El conversor solo acredita el artefacto tras cotejar bytes independientes HAR/QA/debugger, SHA-256, coincidencias de contenido, brazo/distribución/core/body, documento/pageref e índice | 5 tests P2.1: flag falso/verdadero insuficiente; recibos falsificados e incompatibles; bytes/recording/documento/body incorrectos; duplicidad; copia JSON y replay de prueba sobre otros bytes |
| P2.2 | `rectStatusV2` en el [conversor](../tests/qa/intext-p14b-qa1a-converter.cjs): `rectPresent`, `rectComplete`, `rectUsable`, proyección numérica y campos originales etiquetados | 4 tests P2.2: missing/null/NaN/±Infinity, dimensiones cero/negativas/-0, overflow/underflow, strings sin coerción, sin reparación desde right/bottom, conservación del rect inválido y ausencia de promoción |
| P2.3 | `stageV2` usa un catálogo explícito de eventos de los productores congelados. Se retira el fallback after-player; `unknown` cuando el nombre/canal no acreditan etapa. El catálogo no admite microtasks que el productor no emite | 3 tests P2.3: nombres/prefijos desconocidos, claves de prototipo, stage/revealed/installationStage del input, vecinos, microtasks inexistentes; clasificaciones conocidas conservadas |

El [runner](../tests/qa/intext-p14b-qa1a-offline.cjs) añade `localByteCheck`, conteos de calidad del rect y de etapas. No adquiere datos ni ejecuta scripts HAR. Los [tests QA1-A](../tests/intext-p14b-qa1a.audit.test.cjs) incorporan los 12 casos anteriores; el test existente de recibos por distribución ahora exige bytes verificables en sus positivos y comprueba que el flag aislado no basta. Sus nombres originales se conservan. Los módulos, fixtures, tests y resultados QA0 **no cambian**.

### Qué acredita P2.1 y qué no

Hay dos niveles explícitos: **atestación del runner** y **recomprobación local de bytes por otro módulo**. El segundo no llama a la función de atestación, recalcula SHA-256 y correlaciones desde los inputs y contrasta el recibo. Produce una capacidad efímera ligada a los hashes de esos dos exports y del artefacto; su copia JSON no es una prueba y otro export no puede reutilizarla. El flag `verified` recibido carece de autoridad, incluso con hashes de formato correcto. Cambiar distribución, brazo, core, body, HAR o entryIndex impide acreditar el artefacto.

Los diez casos tienen `localByteCheck.status=local-bytes-verified`. Se trata de software offline ejecutado en este workspace, **no de una auditoría humana externa ni de una firma de autenticidad**. Se conserva externalIndependentAudit=not-performed. Identidad de bytes no acredita neutralidad IMA, hechos comerciales, geometría ni identidad live. La revisión independiente de esta entrega sigue pendiente.

### Definición geométrica P2.2

`rectPresent` significa objeto rect original. `rectComplete` exige cuatro números finitos left/top/width/height. `rectUsable` exige además width/height>0 y extremos/área representables conforme al validador QA0 congelado. Completo no implica usable: width=0/-7 es completo y no usable. Usable tampoco implica modelo B cualificado: faltan viewport sincronizado y Q1–Q5.

Ninguna fila se borra por rect incompleto o inválido. Se conservan valores numéricos, missing/null, strings numéricos sin conversión y etiquetas de estados no finitos/-0 en `evidence.playerRect.original`; tipos o strings sensibles se sanean con tipo/hash cuando procede y pointer al raw original hashado. JSON no puede representar NaN/Infinity: no se reconstruye una causa a partir de null. Tampoco se infiere width desde right-left ni se transforma P post-player en P pre-player.

### Autoridad temporal P2.3

La lista exacta se contrasta con el productor protegido [probe](../tests/qa/intext-p13c-integration-probe.cjs) y los eventos de preparación/métricas ya existentes. Incluye los nombres emitidos tras el guard de attach con player, los eventos player/manager/media/IMA enumerados y las clasificaciones explícitas post-request/post-reveal. «After-player» solo acredita después de creación del player, no una superficie visible. Ningún prefijo abierto acredita etapa. `player:dispose:microtask`, que el productor no emite, queda unknown.

## Ejecución y variaciones de resultados

**110 PASS / 0 FAIL / 0 skipped / 0 cancelled**, Node 25.8.1. Se ejecutaron de nuevo los 98 nombres originales y los 12 añadidos. Las 71 pruebas QA0 permanecen byte por byte y se ejecutaron completas. Son 108 pruebas funcionales y dos verificaciones de inventario local (333/345). [Salida final](intext-p14b-qa1a-validation.txt), [LCOV](intext-p14b-qa1a-coverage.lcov) y [resumen de validación](intext-p14b-qa1a-review.md).

No se declara ejecución de QA1-A en Node 22, auditoría externa, navegador, CPU/layout móvil ni publicidad: **no ejecutados** en esta tarea. El cero skipped corresponde al runner de tests, no convierte esas actividades ausentes en PASS.

Se releyeron los mismos **30 inputs** y los **diez casos**. Las asociaciones exactas QA/debugger conservan sus recuentos: 30, 25, 27, 26, 24, 35, 32, 30, 35 y 27. El verificador local de HAR concuerda en cada caso. Ningún input se sustituye por un filename equivalente.

| Magnitud | Antes | Tras P2 | Explicación |
|---|---:|---:|---|
| Exports / registros | 20 / 3.186 | 20 / 3.186 | Mismos pointers, orden y timestamps; sin nuevas observaciones |
| Rect P presente | 1.413 | 1.413 | Ahora se etiqueta por separado; los 1.413 son completos y usables como rect local, pero siguen partial como modelo |
| after-player | 1.424 | 1.405 | 19 registros pierden el default no acreditado |
| Sin etapa / unknown | 1.663 null | 1.682 unknown | Unknown explícito, incluyendo los 19 anteriores |
| before-player / post-request / post-reveal | 80 / 10 / 9 | 80 / 10 / 9 | Clasificaciones demostradas conservadas |
| C0 true / false | 1.404 / 39 | 1.404 / 39 | Booleanos factuales conservados; no son oportunidades |
| Frame atribuido / identidad QA0 verificada | 0 / 0 | 0 / 0 | No se rellenan bindings ni identidades |
| B0–B5 por familia | 2.483 unknown / 703 NA | Igual | Sin pass/fail fabricados; B4/B5 siguen diferidos |

Se mantiene viewportWidth=null, sin préstamos entre snapshots, y todas las tasas contables null/exactRatesAllowed=false. No se introducen oportunidades, cierres de captura en t=0, estimaciones pre-player ni trayectorias. La [matriz](intext-p14b-qa1a-results-matrix.md) y los resultados regenerados reflejan las etiquetas nuevas.

## Integridad y límites restantes

Los tamaños y SHA-256 de los **345 protegidos** coinciden con el [baseline original](intext-p14b-qa1a-protected-before.json): 333 anteriores a QA0 y los 12 artefactos QA0. El [manifest final](intext-p14b-qa1a-integrity.json) registra la comprobación completa, los hashes QA1-A nuevos/actualizados, hashes de los 30 inputs, las diez asociaciones y las variaciones de etiquetas. El [inventario previo P2](intext-p14b-qa1a-p2-before.json) conserva los hashes QA1-A anteriores, los 98 nombres ejecutados y las claves/etapas de los 3.186 registros. No se borra, restaura o regenera ningún protegido/histórico.

La suficiencia de los datos no cambia: faltan identidad live completa, viewport/revisiones/Q1–Q5 sincronizados, binding y evidencia de frames y denominadores íntegros. Se conservan unknown, partial, censura y gaps; esas carencias no bloquean el cierre del **conversor offline**, porque no se ocultan ni se convierten en tasas o permisos. Los JSON históricos no disponibles siguen sin revalidarse y los perfiles stats/logs no versionados siguen fuera del adaptador.

No se inicia QA1-B ni se implementa instrumentación. P1.3c visual, H-IMA/H-QA siguen abiertas; A3, C, B runtime/enforce siguen bloqueados. No hubo navegación, red, nuevos anuncios/capturas, cambios de core/manager/probe/QA0/bundles, commit, push o despliegue. **Detención para revisión independiente antes de cualquier fase siguiente.**
