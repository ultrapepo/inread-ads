# P1.4-B-QA1 — Propuesta de observaciones, bloqueada

27/10/2026. Propuesta derivada de B-QA0 y del [diseño r2](intext-p14b-shadow-design.md), [matriz](intext-p14b-shadow-observability-matrix.md) y [contrato](intext-p14b-shadow-qa-contract.md). **B-QA1 no está aprobada ni implementada.** No hay adaptador de navegador, hooks nuevos, listeners, observers, bundles, capturas o publicidad ejecutada en B-QA0.

## 1. Orden recomendado y frontera de aprobación

Primero auditar los módulos y tests aislados de [B-QA0](intext-p14b-qa0-review.md). Después, si se aprueba expresamente QA1, comenzar por un **conversor offline de exports ya existentes**, sin navegador ni tráfico. Conservar los datos desconocidos: no completar P pre-player, ámbito, identidad, reloj o denominadores a partir de un éxito posterior.

La adquisición sincronizada antes de crear player requiere un alcance distinto y posiblemente **hooks QA adicionales**. No se considera autorizada por aprobar QA0 o por disponer del evaluador. Antes de implementarlos deben revisarse archivo/ubicación, fuente factual, orden, coste y reversibilidad de una composición QA nueva. Los originales productivos, coordinador, probes y bundles congelados actuales no se sobrescriben.

| Etapa propuesta | Entrada / salida | Estado actual y condición |
|---|---|---|
| QA0 | Muestras sintéticas planas → evaluador/ledger/export saneado | Implementado aisladamente; pendiente auditoría independiente |
| QA1-A, conversión offline | Exports existentes QA/debugger y manifiestos → subconjunto cualificado de esquema QA0 | **Bloqueada** hasta aprobación; sin necesidad de nuevas suscripciones/capturas |
| QA1-B, adquisición sincronizada QA | Datos factuales en fronteras existentes → muestras del mismo evento | **Bloqueada**; exige revisar hooks/coste/artefacto separado y autorizar cualquier nueva captura aparte |
| B4/B5 | Pares/secuencias independientes | Fuera de QA0/QA1 inicial; unknown/deferred, sin listeners/IO/polling/timers para crear cadencia |
| Gate activo / A3 / C | Cambios de comportamiento | No autorizados ni consecuencia de estas fases |

## 2. Qué existe de verdad en ambas distribuciones

La [auditoría r2](intext-p14b-shadow-design.md) conserva cuerpos y diferencias de ambos cores. Líneas de referencia actuales, con el símbolo como autoridad:

| Fuente factual | `_gam_kv_.js` | `IntextManager.js` | Qué puede aportar / qué falta |
|---|---:|---:|---|
| `recordReadiness` | 12711 | 10912 | stage, razón C0, geometría anchor, contexto/cycle/token en métricas cuando se exportan; no P completo pre-player |
| `getReadinessViewportState` | 11488 | 9706 | Resultado C0 calculado por el control; no sustituirlo, envolverlo ni usarlo para obtener otro permiso |
| `waitForViewport` | 11518 | 9736 | Entrada/resolución del wait y checks dirigidos por eventos; no garantiza un muestreo continuo ni cruces de P 25/50 |
| `activate` antes de release/create | 16692 | 14533 | Frontera útil justo tras guard factual de elegibilidad; snapshot completo aún no existe allí |
| `setupVideoPreparation` / handoff | 12735 / 12804 | 10936 / 11005 | Generación/ownership/lease; no llamar claim/release/cancel para observarlos |
| `startRender` | 13149 | 11350 | Token, consumo/edad de pendingAuction; no implica TTL vivo revalidado después de liberar winner |
| `beginVisualRender` | 7490 | 5834 | Inicio/reemplazo de token y ciclo; marcar la asociación de identidad, no cambiarla |
| Probe de integración existente | Común, instalación post-Video.js/pre-IMA | Común | A/P medido post-player/W y eventos player/manager/media con cobertura; no frontera pre-player ni viewport completo en todos los snapshots |

El coordinador A1 existente exporta logs de dependencias y eventos instrumentados; el probe existente expone `attach/core/node/close/stop/export`, **no un bus público de suscripción B**. Sus arrays/cierres internos no son un API de stream. No proponer envolver push/emit/export o hacer polling del ring para consumir nuevos eventos. Tampoco envolver `requestAds`, `play`, `start` o getters SDK.

## 3. QA1-A: conversión offline de evidencia ya aportada

El conversor futuro leería archivos locales entregados, con hashes/cobertura, sin extraer ni pedir URLs del HAR. Transformaría solo datos acreditados:

- Identidad documental, artículo/nav/slot/cycle y token, sin unir ventanas por nombre del fichero. PSP/Legacy y E0/E1 se mantienen separados.
- C0 de `snapshot.readiness` o de un evento factual bien identificado, no reconstruido desde P. B0 solo se evalúa si ámbito/identidad/fuente son fiables; no necesita viewport/P.
- P **medido post-player** de `snapshot.playerSurface.rect`, con su etapa original. Si falta Vw/Vh del mismo evento, P queda parcial para B1–B3 aunque se pueda calcular una fracción vertical auxiliar. Nunca convertir attach en una observación anterior a crear Video.js.
- Los operandos de intención pre-player/CSS efectivos no exportados permanecen unknown. El literal 350px, el offset observado 170px o un player posterior no acreditan Q1–Q5.
- Eventos nativos y frame solo con identidad/cobertura del manager/medio publicitario; canplay del dummy, STARTED o IMPRESSION no son un frame perceptible.

La corrección de auditoría QA0 exige un binding factual verificado manager/medio ad ↔ identidad activa completa y metadatos de presentación/decodificación, junto con reloj compatible. Los `syntheticManager`/`syntheticAdMedia` del fixture **no existen como datos recuperados de los exports**. QA1-A solo podrá aportar managerLocalId/mediaLocalId si el origen permite identificarlos y vincularlos sin ambigüedad; no se fabrican desde el nombre del evento, orden o éxito IMA. Si no existen binding, token o metadatos suficientes, omitir la afirmación de frame y declarar outcomes/cobertura insuficientes; no marcar frameCoverageComplete por mera ausencia de eventos. QA1-B necesitaría revisar y aprobar por separado cualquier hook para establecer ese binding y obtener los metadatos que falten, sin suscribirse ahora a ningún callback.

Para P estimado, Q3 ahora exige operandos numéricos de padding/bordes actuales y caja de borde coherentes con origen/ancho content-box; no se rellenan con ceros por defecto desde exports antiguos. Chrome negativo o físicamente inconsistente queda unknown, incluido 345 + (-1). La censura geométrica izquierda se conserva separada de gaps factuales: no impide por sí sola un denominador acreditado ni demuestra continuidad o primera entrada física.

El esquema QA0 identifica el reloj; no mezclar `timestamp`, performance.now de otro documento o HAR/trace en una sola serie. La conversión de epoch a monotónico requiere origen/correlación de esa navegación y calidad explícita; si no está, no se inventa. El contador sampleSequence y contexto de un modelo deben referirse a la misma observación, no a dos eventos cercanos elegidos por comodidad.

Los valores `sourceComplete.D0/Dv/Dc/outcomes` del ledger son **atestaciones de entrada**, no algo que el módulo compruebe del navegador. El conversor deberá justificar cada una desde export completo, origen y pérdidas; por defecto serán false. Cero dropped del probe no acredita que todos los fetch/ciclos/guards relevantes hayan sido suscritos. Si no puede recuperar el denominador, `exactRatesAllowed=false`; no añadir capturas para arreglarlo automáticamente.

## 4. QA1-B: datos que requieren hooks adicionales

Solo diseñar la lista de cambios para revisión. **No se implementa ninguno** en esta entrega.

| Dato faltante | Punto propuesto de una composición QA futura | Alcance que necesitaría aprobación adicional |
|---|---|---|
| C0 y P/viewport simultáneos antes de player | Justo después del guard factual de `activate`, antes de `releasePreparedVideo`/crear player | Tap de lectura QA nuevo en ambas distribuciones; los hooks A1 alrededor de await prepare no lo sustituyen |
| Razón y primera positiva de cada guard relevante | Callback/check existente en wait/activate, con resultado C0 ya calculado | Ampliar registro QA de datos del check, sin reejecutarlo para decidir ni tocar IO/márgenes |
| Q1–Q5 y revisión de geometría | Una lectura compartida de W/content box, viewport, operandos/estilos soportados y contexto del mismo evento | Nueva fuente/contrato de lectura; nunca abrir/clonar DOM ni medir con clases temporales |
| Cobertura D0/Dv/Dc recuperable tras eviction | Registro por identidad antes de ring en hechos fetch/winner/guard/handoff/terminal ya existentes | Registro contable externo a snapshots, sin aumentar cadencia ni modificar el coordinador actual; límites r2 y origen explícitos |
| Conexión de datos al módulo puro | Composición QA separada, con un tap de datos saneados y manejo de fallo propio | No hay stream B actual; requiere un diseño de entrega, revisión de diff y ledger de reversión nuevos |
| Coste layout/evaluación/contabilidad/registro/export | Brackets monotónicos QA y perfil externo, solo tras autorización de medición | Cambios de instrumentación y eventual captura se aprueban aparte; no se deducen del tiempo de tests Node |

Un tap futuro no devolvería un permiso ni promesa al core; la salida B jamás entraría en un if comercial. No añadir awaits, timers, rAF, starts, pausas, cancelaciones o un fallback por fallo de observación. Ante excepción, cerrar solo cobertura B con motivo; nunca cambiar el resolve/reject del anuncio. Aun así, leer geometría y registrar consume tiempo y puede forzar layout: **igualdad de flujo lógico no demuestra neutralidad temporal**. Hay que medir el coste total del contrato r2 antes de aprobar uso en navegador.

No se homogeneizan las distribuciones: `_gam_kv_.js` contiene defaultMuted explícito y una llamada a `maybePlayInitialOpenAnimation()` al final de reveal que no aparece allí en Manager. Cualquier tap preservaría el comportamiento propio de cada una. Q1–Q5 deben declarar distribución/core base y artefacto QA servido, CSS/config efectivos y procedencia; el hash del bundle servido no es intercambiable con el hash base del core que compone.

## 5. Criterios de aprobación, riesgos y parada

Antes de QA1-A: auditoría QA0 favorable y autorización explícita de conversor offline; ejemplos trazables sin promover unknown a measured ni afirmar tasas completas. Antes de QA1-B: aprobación separada del alcance de taps y manifest/rollback, preservación de originales y bundles congelados, y un protocolo autorizado de medición de coste/cobertura. Ninguna fase solicita ahora publicidad o navegación.

Parar si hay dependencia de SDK/DOM en el evaluador, salida candidata consultada por control, escritura comercial, nueva llamada/request/timer, cambio de ownership/TTL, pérdida contable ocultada, esquema que convierte estimaciones en medidas, sanitizado insuficiente o intención de perseguir el outlier con más capturas. Presupuesto no medido/inconcluso y captura parcial no son PASS. Un coste que exceda el límite vuelve a revisión, sin muestrear menos silenciosamente.

Riesgos que permanecen: atestaciones sintéticas no prueban CSS real; datos pre-player escasos; coste de lectura/layout y dispatch en móviles desconocido; heap físico/export transitorio no equivalen a 2 MiB lógicos; TTL/pendingAuction y movimiento posterior no son predicciones del evaluador; H-IMA/H-QA no resueltas; P1.3c visual abierta; no se garantiza STARTED/IMPRESSION visible tras 12–21 s pre-VAST. A3, C, B shadow y B enforce continúan inactivos.

**Punto de parada:** entregar QA0 para auditoría independiente. B-QA1 sigue bloqueada hasta aprobación expresa; este documento no es dicha aprobación ni una implementación.
