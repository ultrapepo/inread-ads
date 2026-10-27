# P1.4-B — Especificación offline del shadow geométrico

Revisión documental **r2, 27/10/2026**, sobre el diseño del 26/10. **Correcciones para segunda revisión independiente; implementación y activación no autorizadas todavía.** Solo documentación offline. A2 recopilación cerrada; H-IMA/H-QA abiertas y A3 bloqueada. B shadow, B enforce y C inactivos; P1.3c visual abierta. Sin nuevas capturas.

Entregables asociados: [matriz de observabilidad y cálculo existente](intext-p14b-shadow-observability-matrix.md), [contrato QA propuesto](intext-p14b-shadow-qa-contract.md), [roadmap](intext-p14-mobile-latency-viewability-design.md). Ninguna expresión o pseudocódigo de estos documentos está instalada en el runtime.

## 1. Decisión de diseño y alcance

La primera etapa eventual se limita a **B0–B3 por snapshot**, mediante un evaluador puro con resultados `pass | fail | unknown | not-applicable`. B0 reproduce C0 factual sin exigir P; B1–B3 comparan modelos P admisibles. **B4/B5 quedan documentados y diferidos**, con estado unknown en esta etapa para una oportunidad en ámbito, sin adquirir nueva cadencia. Su evaluación temporal y cualquier ampliación de captura requieren revisión y autorización separadas. No hay nuevos listeners, observers, polling o timers para completarlos.

La salida nunca gobierna prepare, request, reproducción, reveal, fallback o refresh. Compara datos del mismo instante factual; no simula la publicidad que habría llegado con otro timing. La aceptación de la arquitectura y de estas correcciones no autoriza escribir el evaluador, adaptador, hooks ni tests ejecutables.

No hay umbral elegido. El primer uso es diagnosticar discordancias: control acepta un borde del anchor mientras la región del vídeo sigue fuera, o el candidato exigiría más intersección cuando el usuario ya está atravesando la oportunidad. Ni una discordancia ni un porcentaje de muestras favorables demuestran beneficio comercial.

**Unidad de aislamiento:** documento/navegación, artículo/navIndex, posición, ciclo, fetch generation y render token; creative/player/media solo cuando existan. Los estados de dos posiciones o de una reentrada con token distinto no se mezclan. La identidad QA es local, sin escribir IDs, atributos o targeting comerciales.

### Tabla de cambios de revisión r2

| ID | Corrección | Criterio de coherencia para segunda revisión |
|---|---|---|
| R1 | B0 se resuelve antes de acceder a P | C0=true, ámbito/identidad válidos y P unknown → B0 pass; pseudocódigo, nulidad, matriz y fixtures coinciden |
| R2 | Contabilidad independiente del ring | Contadores D0/Dv/Dc y resúmenes no se evictan con snapshots; saturación o pérdida de origen invalida tasas exactas del ámbito afectado |
| R3 | Etapa inicial B0–B3; B4/B5 diferidos | Una muestra basta para B0–B3 si cumple calidad; B4/B5 in-scope son unknown/temporal-stage-deferred, sin ampliar suscripciones |
| R4 | Calidad mínima P pre-player explícita | qualified-estimate conserva su etiqueta y procedencia; partial/unknown solo diagnósticos, sin pass geométrico completo |
| R5 | Coste por componentes y total definido | Lectura/layout, evaluación, contabilidad, ring, export y coste de medir se separan sin doble cómputo; resultado actual unknown |
| R6 | Autoridades y diferencias de distribución conservadas | Sin homogeneizar defaultMuted ni rutas de animación; A3/B/C/enforce inactivos y sin implementación |

## 2. Auditoría de autoridades reales en las dos distribuciones

Referencias de línea al código leído, con símbolos como autoridad si cambian los números. [_gam_kv_.js](../_gam_kv_.js) e [IntextManager.js](../IntextManager.js) son distribuciones distintas; PSP/Legacy es contexto runtime, no sinónimo del nombre de distribución.

| Autoridad / función | `_gam_kv_.js` | `IntextManager.js` | Contrato vigente que B debe observar |
|---|---:|---:|---|
| `createIntextPositions` / `createWrapperNode` | ~5645 / 5756 | ~4105 / 4216 | Inserta Display tras paragraph y vídeo después de Display; variantes de navegación continua conservan su contexto. No deducir la posición sumando un offset al anchor |
| `getIntextTelemetryElement` | 8184 | 6528 | Preferencia telemetryAnchor → placement.paragraph → wrapper según estado. No siempre es un anchor dedicado; registrar tipo/identidad |
| `setupLoadingTriggers` | 12941 | 11142 | IO de fetch/render con márgenes de configuración; timer render ya existente. Estos triggers no son elegibilidad de reproducción |
| `startFetch` / `startRender` | ~13046 / 13149 | ~11247 / 11350 | Fetch decide formato y guarda pendingAuction; render reclama token/standby y comprueba edad antes de liberar winner. Prewarm solo infraestructura tras winner vídeo |
| `getVideoPreparationConfig` / `setupVideoPreparation` | 12700 / 12735 | 10901 / 10936 | Preparación por proximidad, capacidad y validez; acepta razones visible/below. Defaults: margen de un viewport, capacidad 2, lease standby 15000 ms, sujetos a configuración |
| `claimVideoPreparation` / `getPreparedVideo` / `releasePreparedVideo` | 12804 / 12820 / 12835 | 11005 / 11021 / 11036 | Handoff STANDBY_UNBOUND→RENDER_OWNED→ACTIVATED, generación y guard. Al reclamar se elimina lease standby; B no adquiere ni libera ownership |
| `preparePlayer` | 16638 | 14479 | Solo dependencias; `_prepared=true`, playerCreated=false. No hay player/AdsLoader durante prepare |
| `buildAndPlayVideo` | 11978 | 10179 | Espera viewport si no hay standby, espera prepare, vuelve a esperar viewport y renderiza creative del token actual |
| `getReadinessViewportState` | 11488 | 9706 | Gate común de anchor, CSS y documento; basta solapamiento X/Y positivo |
| `waitForViewport` | 11518 | 9736 | Check inicial, IO threshold 0/rootMargin 0 y visibilitychange; scroll/resize como fallback si no hay IO. No emite una trayectoria continua |
| `activate` / `createPlayerForActivation` | 16692 / 16664 | 14533 / 14505 | Revalida prepare/token/anchor, libera standby, crea vídeo/Video.js y observación de elegibilidad; entra en requestAds. Punto de comparación pre-player: justo antes de `releasePreparedVideo`/crear player |
| `observeActivationEligibility` | 16710 | 14551 | Recovery vigente pre-reveal con ownership manager/media, epoch y confirmación. Después de reveal deja actuar a playback/PiP. B no invoca esos controles |
| `requestAds` / guards plugin y player-ready | 17381 / ~18161 / ~18341 | 15038 / ~15801 / ~15971 | Timeout propio y plugin vigentes; vuelve a consultar control antes de IMA y player-ready. No hay nueva autoridad B |
| closure `revealPlayer` dentro de `requestAds` | 17503 | 15160 | Token, no terminal, no revelado, anchor elegible, no paused/ended/error; firstFrame confirmado si preparación habilitada. Abre wrapper y mantiene animación/PiP existentes |
| `IntextContainer.open` | 12450 | 10651 | Altura prevista y dos rAF ya existentes; is-open cambia padding/márgenes/opacidad. Request de apertura no es apertura terminada |
| `onVideoEnded` | 12136 | 10337 | COMPLETE/adend y refresh vigentes. Error vídeo en AUTO y fallback son otra ruta; sin reinterpretarlos |

Se cotejaron las funciones compartidas de anchor, gate, wait, preparación/handoff, activate y recovery: sus cuerpos normalizados por fin de línea coinciden. No se supone identidad byte a byte de ambos cores completos: `createVideoElement` establece `defaultMuted=true` explícitamente en `_gam_kv_.js` y no en Manager; se conserva esa diferencia y los hashes productivos distintos. La propuesta exige paridad de las reglas shadow y fixtures de ambas distribuciones, sin homogeneizar el playback ni copiar posiciones de línea de una a otra.

También se cotejó la closure `revealPlayer`: los guards y la apertura coinciden, pero `_gam_kv_.js` invoca explícitamente `maybePlayInitialOpenAnimation()` al final de esa closure y Manager no lo hace allí. No se infiere equivalencia total de sus rutas de animación ni se corrige esa diferencia en B. El contrato observa fase/distribución reales y mantiene la revisión visual P1.3c independiente.

### Gate de control C0

Para el elemento devuelto por `getIntextTelemetryElement()`:

1. Debe existir y estar conectado; rect finito con ancho/alto positivos y viewport de layout válido (`innerWidth/innerHeight`, con fallback del core).
2. El documento no debe estar hidden y el anchor/ancestros deben estar renderizados: `getClientRects`, display distinto de none, visibility distinta de hidden/collapse y opacity distinta de la cadena `"0"` según la comprobación actual.
3. `overlapX > 0 && overlapY > 0`. El ratio se calcula con el área del anchor; no hay fracción mínima, velocidad ni dirección de scroll en C0.

`distancePx` redondea rect.top−viewportHeight; un valor 0 puede ser ligeramente interior o exterior. Usar coordenadas flotantes para las fórmulas shadow, sin cambiar esa métrica del core. El C0 operativo se obtiene de la evaluación factual existente; no se redefine para favorecer candidatos.

### Anchor, región prevista y wrapper: tres objetos distintos

- **A, anchor de inserción/telemetría:** elemento de C0, a menudo paragraph. Su tamaño no representa el anuncio.
- **P, región prevista:** rectángulo matemático para el reproductor en la posición de inserción, con fuente/modelo de altura y coordenadas declarados. Existe como dato aunque el wrapper tenga altura cero. No es un nuevo elemento DOM.
- **W, wrapper real:** caja conectada de `videoContainer`, inicialmente altura/opacidad cero; overflow y clases pueden ocultar el medio. El player hijo puede tener rect positivo dentro de W cerrado. Un P con intersección 1 y un W cerrado no acreditan píxeles visibles.

El reveal sigue usando C0 y estado del player, no P. Tampoco es el gate de preparación: este puede preparar infraestructura por debajo del viewport. Dirección de scroll solo será una variable descriptiva propuesta; no es autoridad actual de start/reveal.

## 3. Construcción de geometría sin escrituras DOM

### 3.1 Espacio y versión de cada rectángulo

Todos los rectángulos de una comparación usan **CSS px del mismo viewport de layout y misma muestra**, con `viewportRect=[0,0,Vw,Vh]`. `visualViewport` puede registrarse aparte si está disponible; no sustituye silenciosamente al viewport de C0. Zoom, resize, orientación, cambios de layout o transformaciones invalidan continuidad entre muestras; incrementan una revisión QA de geometría.

Un adaptador de lectura futuro entregará tres modelos separados:

| Modelo | Cálculo y fuente | Calidad / uso |
|---|---|---|
| `player-measured-current-flow` | Rect del player ya existente, del snapshot del probe; conserva P aunque W esté cerrado | Medido **después de crear player**. No disponible para decidir un supuesto pre-player anterior |
| `player-intent-current-flow-v1` | Origen del content box de W conectado, usando rect de W y bordes/padding **actuales**; ancho interior. Alto de intención versionado según la fuente de media/CSS realmente aplicable | Estimación pre-player en flujo cerrado; no equivale a posición final abierta. Si fuente/CSS/caja no se resuelven, unknown |
| `slot-open-envelope-v1` | Mismo origen de inserción actual, ancho de W; alto que calcularía `open` para ese nodo, registrado con chrome/preset/lock | Envolvente de slot, incluye chrome; **no es ratio del medio**. Serie y candidatos separados del modelo player |

En esta versión `createVideoElement` establece width 100% y height 350px; `initVideoJS` declara 640×360 y `fluid:false`. El tamaño de tag/playerSize **no reemplaza** el tamaño CSS efectivo. Antes de existir player, 350 es intención de la fuente fijada, con calidad estimada, no una medida del navegador ni un nuevo default. Si CSS externo, layout flex, transform, ancho cero o configuración no permiten resolverla de forma fundada, no extrapolar: P=unknown. No crear un player para medirlo.

Para la envolvente, leer valores ya existentes, sin invocar `open()` ni setters. El argumento vigente de reveal es `node.lockedHeight || node.getDisplayStandardContentHeight()`; el segundo devuelve 345. `open` suma `wrapperChromeHeight` parseado con fallback 15 si el argumento es >1; si no, usa dataset.targetHeight o 360px. En QA futuro conviene recibir esos operandos ya resueltos en el snapshot. No convertir strings/unidades desconocidas a píxeles por suposición.

El CSS `.is-open` añade padding-top 15px y margin-top 16px, y modifica márgenes/overflow/opacidad. La apertura puede desplazar player y otros elementos; hay colapso de márgenes, Display vecino, reflow y animación. **No se calcula una posición final exacta sumando 31px ni el offset histórico de 170px al anchor.** Una proyección `opened-layout` solo se aceptaría como modelo estimado separado si demuestra su hipótesis de layout con las lecturas disponibles; en los demás casos queda unknown. No se clona DOM, abre un wrapper invisible, mide con estilos temporales, llama getAdsManager ni cambia clases para resolverla.

Para P se excluye como veto la opacidad/altura cerrada **propia de W**: son intencionales antes del reveal. Se conserva esa información en W y se comprueban desconexión/ocultación de ancestros externos. El ratio de P es geometría, nunca perceptibilidad/Active View. Si no puede distinguirse ocultación intencional de otra condición CSS, calidad unknown en vez de habilitar un control.

### Calidad mínima de P pre-player

La calidad se asigna **antes de calcular B1–B3** y no depende de que el resultado favorezca al candidato. B0 no consulta esta clasificación.

| Calidad | Requisitos | Uso permitido |
|---|---|---|
| `measured` | Rect del objeto existente, viewport y contexto del mismo snapshot, coordenadas/dimensiones válidas | Geometría medida en su etapa real; un player posterior nunca se convierte retrospectivamente en P pre-player |
| `qualified-estimate` | Todos los requisitos Q1–Q5 siguientes acreditados | Cálculo B1–B3 en una **serie estimada separada** por modelId/version/etapa. No es medida ni prueba de layout abierto |
| `partial` | Alguna dimensión/condición solo permite un cálculo auxiliar, por ejemplo yFraction con Vh conocido | Publicar ese diagnóstico con sus supuestos; resultado completo B1–B3 unknown/model-quality-insufficient |
| `unknown` | Origen, tamaño, espacio, contexto o aplicabilidad no resueltos | B1–B3 unknown; no usar cero ni suplir con un snapshot posterior |

Q1: W conectado e identificado, token/fetch/anchor del mismo evento y ámbito de modelo declarado (`current-flow` cerrado o envolvente de slot, nunca «layout final» implícito). Q2: origen content-box, bordes/padding actuales, ancho/alto finitos positivos y Vw/Vh del mismo snapshot, con revisión/espacio CSS px compatibles; si la adquisición cruza una revisión, invalidar el conjunto. Q3: fuente de altura/ancho documentada y versionada por distribución/core/CSS/config efectiva, operandos resueltos y unidades conocidas. **El literal 350px por sí solo no acredita Q3** si hay overrides, flex/transform o estilos de sitio sin resolver. Q4: hipótesis de layout y ocultación conocidas dentro del alcance soportado; nada de sumar 170/31 px o probar DOM para resolverlas. Q5: procedencia/campos faltantes y calidad exportables, sin conflicto entre fuentes ni reutilización de una geometría de otro ciclo/PiP.

Clipping/oclusiones pueden seguir unknown como límites de visibilidad, aunque la geometría del modelo sea válida; se registran aparte y no se presentan como Active View. Si impiden determinar el propio rect/modelo o distinguir la ocultación intencional, no cumple Q4. Coincidir después con un player medido solo permite contrastar el error de modelo en ese caso: no eleva una estimación a measured ni completa datos faltantes de la frontera.

### 3.2 Intersecciones y posición

Con R=(l,t,w,h), r=l+w, b=t+h, dimensiones positivas y finitas:

```text
ix = max(0, min(r,Vw) - max(l,0))
iy = max(0, min(b,Vh) - max(t,0))
areaFraction = (ix*iy)/(w*h)
xFraction = ix/w; yFraction = iy/h
position = below si t>=Vh; above si b<=0;
           horizontal-out si ix==0; overlapping si ix>0 && iy>0
```

No usar `IntersectionObserver.intersectionRatio` de A como ratio de P. Guardar área, fracción vertical y horizontal separadas. Si R supera el viewport, `maxAreaFraction = min(w,Vw)*min(h,Vh)/(w*h)` es una cota ideal de alcanzabilidad, no una intersección actual; registrar candidato inalcanzable por tamaño sin rebajar su umbral. Overflow/clipping de ancestros y overlays no se conocen solo con estas fórmulas; registrar cobertura, sin certificar visibilidad.

## 4. Familias candidatas y tradeoffs

Cada salida lleva candidateId, parameterSetId y formulaVersion; **B0 usa rectModelId=null**. Solo B1–B5 identifican un P. No se agregan ratios de modelos distintos. Tras validar ámbito e identidad, B0 devuelve pass/ fail según C0 factual conocido, o unknown si C0 no está observado/fiable; **no añade requisitos de P, viewport, movimiento ni un segundo gate de documento**. Un conflicto acreditado entre fuentes invalida la muestra, sin recalcular C0 para resolverlo.

Para B1–B3, el control conocido false basta para fail; con C0=true se exige P/viewport de calidad admisible y el contexto factual coherente. Ninguna familia puede pass cuando C0=false. `unknown` no se convierte en false ni true; not-applicable corresponde a fuera de ámbito o identidad conocida stale/terminal para una nueva activación. B4/B5 se reservan como unknown/temporal-stage-deferred en la etapa inicial in-scope, incluso si otros datos permitirían deducir una condición necesaria.

| Familia | Regla observacional, tras ámbito/identidad | Parámetros a comparar, sin default comercial | Tradeoff / etapa |
|---|---|---|---|
| B0 / control | Solo C0 factual conocido; **no exige P** | rectModelId=null; control-factual | Referencia por snapshot; C0=true/P unknown sigue pass |
| B1 / P positivo | ix>0 e iy>0 sobre P | Cada modelo, por separado | Evita P completamente fuera, pero acepta un borde mínimo del propio P |
| B2 / área P | areaFraction≥f, con intersección positiva | f∈{0,25; 0,50; 0,75} | Mayor representación espacial; activación más tardía, umbral quizá inalcanzable y más exposición a TTL/salida |
| B3 / altura y ancho P | yFraction≥fy y xFraction≥fx | fy∈{0,25; 0,50}; fx∈{0,50; 1} | Explica clipping horizontal; no equivale al mismo porcentaje de área ni a viewability |
| B4 / área y movimiento | B2 y señal observada compatible con aproximación/no alejamiento del centro, con límite descriptivo de velocidad | f anterior; parámetros de movimiento versionados | Puede excluir usuarios que cruzan rápido y también oportunidades legítimas al seguir leyendo |
| B5 / confirmación por muestras | B2 verdadero en k muestras admisibles distintas del mismo tramo observado, sin false/unknown/revisión entre ellas | k∈{2,3}, gap máximo de cobertura declarado | Reduce decisiones basadas en una muestra; añade demora de observación y **no prueba estabilidad continua** |

Los conjuntos anteriores sirven para análisis de sensibilidad, no para elegir un ganador ni adoptar thresholds de Active View. El orden por fracción no implica mejor UX o ingresos. Las reglas B4/B5 de la tabla y del apartado siguiente describen **solo la extensión temporal diferida**: no forman parte de la implementación inicial B0–B3. Los callbacks existentes no garantizan pares/secuencias independientes; no se añaden listeners, observers, polling o timers. Sin cobertura o sin aprobación de esa extensión, B4/B5 siguen unknown y no bloquean evaluar B0–B3.

### Movimiento: definición discreta y límites

Este apartado conserva la especificación de B4/B5 para revisión futura; no exige construir ahora su reductor temporal ni adquirir observaciones adicionales. Fuera de ámbito se aplica not-applicable; dentro de ámbito, la etapa inicial solo declara temporal-stage-deferred. Incluso una pareja ocasional adecuada no cambia automáticamente de etapa.

Solo entre muestras reales con reloj monotónico creciente, mismo documento/anchor/token y revisión de viewport/layout compatible. Para un par i−1,i:

```text
dt = t[i]-t[i-1]; dy = scrollY[i]-scrollY[i-1]
meanScrollVelocity = dy/dt
centerDistance[i] = abs((P.top+P.height/2)-Vh/2)
deltaCenterDistance = centerDistance[i]-centerDistance[i-1]
documentTopDelta = (P.top+scrollY)[i]-(P.top+scrollY)[i-1]
```

`dy>εY` significa dirección **neta descendente** entre esas muestras, no ausencia de inversión intermedia; el signo contrario es ascendente. Si |dy|≤εY, registrar `net-small-displacement`, no «usuario parado». Aproximación al centro es deltaCenterDistance<−εD; alejamiento es >εD. El centro es una referencia geométrica, no destino/intención del usuario.

B4 requiere par de evento scroll real, dt≤G, revisión estable y |documentTopDelta|≤εLayout; de otro modo `movement=unknown` por hueco, layout o fuente. Un conjunto de calibración explícito puede comparar G∈{100,250}ms, εY/εD/εLayout∈{1,4}px y límites de velocidad ∈{0,5;1} alturas de viewport/s, sin escoger ninguno todavía. La identidad del candidato incluye toda esa combinación; no se hace búsqueda retrospectiva del parámetro que favorezca una campaña.

La condición B4 concreta, una vez admisible el par, es `deltaCenterDistance <= εD && abs(dy/dt)*1000/Vh <= β`, además de B2. β se expresa en alturas de viewport/s. La dirección neta se reporta aparte; no se exige scroll descendente para permitir una reentrada ascendente. G limita la **calidad de un par al llegar la muestra**; nunca programa un evento, espera al usuario o hace vencer un anuncio. En B5, cada par de las k muestras debe satisfacer el mismo G elegido y la misma revisión/identidad; si no, la confirmación queda unknown y se reinicia únicamente su contador QA.

No se interpola scroll continuo, extrapola posición futura ni estima un «tiempo garantizado restante». Snapshots de manager/frame separados 1570 ms no satisfacen G y no permiten B4/B5. Un cambio brusco de documentTop, viewport o PiP corta el par; el desplazamiento de una animación no se interpreta como scroll. No hay polling, rAF añadido, debounce con timer, plazo de start ni deadline shadow.

## 5. Lectura del caso Legacy-E0-2 y evidencia existente

Fuente: [registro Performance A2](intext-p14a2-legacy-performance-evidence.json) y originales ya aportados. La [matriz B](intext-p14b-shadow-observability-matrix.md) distingue qué puede calcularse y qué no.

En observer:attached, A.top=921,6625, A.height=150 y Vh=922: iy≈0,3375 px, ratio A≈**0,225%**. P medido del player está en top=1091,6625, height=350; W comparte ese top pero height=0 y opacity=0. El control acepta A; la región player está completamente debajo. El redondeo distancePx=0 no significa visibilidad material. No se adopta un offset universal de 170px.

Este snapshot ocurre **después de construir Video.js y 7 ms antes del log activation_started**; no equivale a una muestra de la frontera pre-player. Al ads-request, P sigue fuera y A≈3,43%. En manager, P tiene fracción vertical ≈46,382%; en frame, ≈100%. Son comparaciones sobre el flujo factual cerrado; no reconstruyen el instante de entrada al 25% o 50% ni cuándo se habría creado otro player.

La espera viewport registrada fue **5909 ms**; no demuestra que el anchor fuese ineligible cada milisegundo ni mide una trayectoria de usuario continua. El residual de dependencias 0 tampoco explica winner→frame 11233 ms. Native IMPRESSION/STARTED se registran con A/P interiores y W aún cerrado en esos snapshots; filmstrip posterior muestra el anuncio. No acredita que esos eventos fuesen perceptibles ni Active View. Screenshot termina antes de COMPLETE, manteniendo P1.3c visual abierta.

PSP-E0-1 conserva ~12,21 s pre-VAST y Legacy E1 ~21,232 s. Incluso con C0/P elegibles al inicio, el usuario puede salir antes de resolver SDK. **Un gate anterior a requestAds no garantiza que STARTED/IMPRESSION o el primer frame ocurran visibles cuando responda IMA.** B no soluciona H-IMA, no reduce el timeout de 25 s y no retiene el start del SDK.

## 6. Denominadores, pasos y censura

### Poblaciones fijas antes de evaluar candidatos

- **D0:** todos los ciclos de posición iniciados por fetch vigente en los documentos cubiertos; una fila por documento/nav/slot/cycleId. Reintentos/fetch generation son subfilas; refresh y fallback en otro ciclo se relacionan como descendientes, sin contabilizarlos como rescate del vídeo inicial.
- **Dv:** subgrupo D0 con winner inicial vídeo según la decisión factual, incluyendo dependencia fallida, timeout, abandono y ausencia de frame. No filtrar por que el candidato llegue a pass.
- **Dc:** subgrupo Dv con primera elegibilidad **de control observada**. Las oportunidades con cobertura de C0 insuficiente permanecen en Dv como unknown; no se declaran ineligible para mejorar el resultado.

### Conservación independiente de snapshots

El [contrato QA, sección 5](intext-p14b-shadow-qa-contract.md#5-contabilidad-memoria-y-medición-del-coste) distingue tres niveles: **contadores de oportunidades**, **resúmenes por identidad** y **ring de snapshots**. En una futura implementación, el hecho factual se aplica primero al resumen/contadores idempotentes y después se intenta retener el snapshot. D0 se registra una sola vez por clave de ciclo, Dv por winner inicial y Dc una sola vez por positiva C0 factual; ni P ni un candidato intervienen. B0 pass solo puede aportar Dc si también consta el winner vídeo y la identidad del ciclo.

La evicción del ring conserva membresía, timestamps resumidos, censura y contadores de pérdidas; no decrementa D0/Dv/Dc. Los resúmenes compactos no se evictan para dejar sitio a imágenes/muestras. Su capacidad también es finita: al superar el límite o perder hechos de origen se fija un flag irreversible de contabilidad incompleta para el ámbito afectado. Se conserva lo ya contabilizado y se informa cobertura insuficiente; no se pretende deduplicar identidades nuevas sin memoria ni continuar con un denominador supuestamente completo.

Cada denominador exporta `yes/no/unknown-membership` y estado de integridad propio. Solo se permiten tasas exactas de un ámbito cerrado/definido cuando **todos los denominadores y numeradores necesarios están completos**; exactitud del recuento de eventos observados no prueba continuidad física del scroll. Si no se recupera la población completa, publicar conteos retenidos etiquetados, pérdidas/censura y, si están fundadas, cotas; **prohibidas las tasas exactas de la captura completa**, el denominador «snapshots que sobrevivieron» y extrapolarlo al tráfico. No hay persistencia automática, cargas remotas ni nuevas capturas para compensarlo.

Publicar por PSP/Legacy, distribución, brazo QA, versión SDK, dispositivo y sesión. Slots/ciclos de una página están correlacionados; no son n independiente. No mezclar E0 QA secuencial con histórico P1.3c sin coordinador; A3 sigue bloqueada. Las capturas disponibles no representan todo el tráfico: D0 observado lleva cobertura del periodo, no se publicita como tasa global.

### Primera elegibilidad y primera pasada

Guardar `tControlFirstObserved` y fuente; si existe una secuencia previa ineligible del mismo wait/guard, guardar última observación negativa y primera positiva. Un check inicial ya positivo es **left-censored** para la primera entrada real; no se fija como cruce exacto. `video_activation_eligible` es un guard de activación posterior y no sustituye por sí solo la primera entrada.

La primera pasada geométrica es el primer tramo de **observaciones** de C0/posición desde la primera entrada observada hasta una salida geométrica observada (above, below u horizontal-out). Cambio de CSS/documento oculto se registra como suspensión distinta; token stale/dispose/fin de captura terminan cobertura. Reentrada requiere una salida y una nueva entrada observadas del mismo token vivo; nunca resucita uno terminal. Ausencia de muestra de salida no demuestra que el usuario no salió; episodios se etiquetan `pass-continuity-unknown` cuando la cobertura no lo permite.

Para P puede mantenerse otro índice de pasada, sin redefinir Dc ni la pasada de control. La ventana de primera oportunidad para métricas usa la pasada C0 fijada; una reentrada posterior no cuenta como éxito inicial. Si falta una salida/cierre observable, estado de esa primera oportunidad desconocido/right-censored según cobertura, no éxito por defecto.

### Resultados factuales y contrafactuales permitidos

| Medida | Definición y límite |
|---|---|
| Control→frame publicitario | Diferencia de hitos del mismo token; reportar censura y fallos, no percentiles solo de éxitos |
| Frame/IMPRESSION/STARTED en primera pasada | Clasificable solo con cobertura de pasada; evento nativo real separado de log de reveal |
| Perceptibilidad observada | Primer screenshot/intervalo visual con medio publicitario identificable; si no cubre transición, no timestamp exacto. DOM/CSS favorable es solo proxy separado |
| Sin frame | Separar fallo terminal factual sin frame, salida de primera pasada sin frame y captura acabada sin frame. No convertir ausencia de evento sin cobertura en fallo terminal |
| Discordancia control/candidato | Tabla pass/fail/unknown en la **misma muestra**, preferentemente frontera pre-player. Comparaciones post-activación se etiquetan como tales |
| Primera positiva candidata | Primer pass **observado** con bracket de muestras, no instante exacto de cruce ni `wouldActivateAt` |
| Sin pass candidato antes de salida factual | «No coincidió en las muestras cubiertas»; no es vídeo/impresión que se habría perdido necesariamente |
| Cambio de oportunidad comercial | **Unknown**: no asignar fill, VAST/creatividad, ingresos o Active View a la política no ejecutada |

No desplazar artificialmente el frame/IMPRESSION factual sumando la demora del candidato, ni reutilizar la misma latencia SDK como constante contrafactual. Tras el primer momento en que el candidato difiere del control, player, apertura, reflow y solicitudes pertenecen al camino factual: las observaciones siguientes son útiles para diagnóstico geométrico, no la evolución causal de otra política.

No integrar área/tiempo ni acreditar segundos continuos dentro del viewport mediante rectángulos sostenidos entre snapshots. Los brackets entre dos muestras indican incertidumbre; incluso dos positivas pueden ocultar salida/reentrada. La censura incluye export/pagehide, inicio tardío, dropped, cobertura de manager incompleta, campo faltante o identidad inconsistente. Ingresos/fill/viewability factuales, si existen, solo describen el control y no seleccionan un gate candidato.

## 7. Riesgos y dependencias

El shadow puramente observacional no retrasa deliberadamente la activación. Los riesgos temporales y de TTL de la tabla son consecuencias posibles de una **política activa futura**, usadas para decidir qué medir y qué no prometer; no efectos implementados por esta entrega. El coste de observar sí sería un riesgo propio de una eventual implementación QA.

| Riesgo | Qué podría suceder | Límite de B shadow / requisito para revisión futura |
|---|---|---|
| Activación temprana por A mínimo | P aún fuera pese a A elegible | Comparar A/P en frontera; B1 aún acepta un borde de P |
| Umbral alto o confirmación tardía | P entra cuando queda poco recorrido; candidate no llega a pass | Mantener Dv/Dc, unknown y ausencia de coincidencia; revisar fracciones máximas y dispositivos |
| IMA tarda 12–21 s | Sale el usuario después de una elegibilidad inicial correcta | H-IMA independiente; sin promesa de cero inicios offscreen ni nuevo control de start |
| pendingAuction/TTL envejecen | La espera posterior a startRender puede consumir validez de bid/cache | startRender valida edad una vez y vacía pendingAuction; después no presumir revalidación continua. Shadow solo registra edad/unknown; no rebid, no extensión TTL/lease |
| Handoff/reentrada/ownership | Un callback tardío pertenece a otra generación o creative | Clave completa y revisión de identity; cerrar registro viejo y no unir con ciclo nuevo. Nunca llamar claim/release/cancel desde QA |
| Wrapper cerrado con STARTED/IMPRESSION | Medio interno progresa antes de superficie perceptible | Medir evento, A/P/W y cobertura por separado; no forzar apertura ni pausar IMA para adecuar números |
| Modelo previo ambiguo | CSS externo, margen colapsado, lockedHeight o Display vecino alteran layout | Modelo/altura/versión/calidad explícitos, unknown; no abrir DOM de prueba |
| Reveal, animación y PiP | Opening cambia geometría; PiP mueve player a viewport fijo | No usar geometría PiP como éxito de inserción inicial; marcar `post-reveal`, `pip-floating`, fase de animación y cortar continuidad. No modificar estas autoridades |
| AUTO fallback/refresh | Una política activa podría cambiar momento del error y recuperación | Shadow no rechaza el vídeo ni elige Display. Registrar relación factual error→fallback y COMPLETE→refresh; P2 separado |
| Observación afecta scheduling | Layout reads/logs añaden trabajo | Contrato acotado y coste medido antes de aprobar implementación; no confundir observerBuild con coste total ni atribuir H-QA resuelta |
| Clipping/oclusiones/viewport móvil | Ratio P alto con anuncio tapado o fuera de área visual | Campos de cobertura; no certificados de perceptibilidad ni Active View |

P1.3c visual **no impide revisar este diseño ni cálculos offline**, pero su cierre sigue siendo requisito antes de una validación posterior que afirme seguridad visual o de un ensayo activo. B shadow no la cierra. H-IMA/H-QA no impiden describir geometría factual; impiden usar B como reparación de causalidad o promesa de ingresos/latencia. A3 no se desbloquea por entregar este diseño ni por un residual cero.

## 8. Criterios para una eventual implementación separada

### Aceptación de ingeniería del observador, no de un gate comercial

1. Revisión independiente aprueba fórmulas, modelos, esquema, alcance QA y presupuesto antes de escribir implementación. Cualquier código posterior tiene otra entrega; hoy B sigue sin instalarse.
2. Evaluador inicial puro B0–B3: B0 verdadero con C0 factual=true aunque P sea unknown; B1–B3 no pueden pass con C0=false o P de calidad insuficiente. B4/B5 in-scope quedan unknown/temporal-stage-deferred sin nuevas suscripciones. Null/unknown/NA y ámbito/identidad se conservan.
3. Fuentes de altura/viewport/anchor documentadas en ambas distribuciones; cero exigencia de W abierto para P; modelos estimados nunca presentados como medición. Sin cambios DOM para obtener datos.
4. Fixtures **propuestos, no ejecutables en esta entrega**, incluyen C0=true/P unknown→B0 pass; B1–B3 unknown por modelo insuficiente; B4/B5 diferidos aun con snapshots favorables; evicción sin pérdida de denominadores y saturación con tasas prohibidas. El contrato añade la tabla de resultados esperados, junto a casos 0,225%, viewport/CSS, identidad y censura. No se crean ni ejecutan tests del evaluador.
5. Fuera de esta tarea, revisión de diff y comparación de trazas/llamadas con observador apagado/encendido deben mostrar mismos request/init/play/start, decisiones, settles, timers, fallback/refresh, first-frame/reveal/PiP y cero escrituras comerciales. No se hacen navegaciones para probarlo ahora.
6. Contadores/resúmenes separados del ring, sin tasas exactas si falla su integridad. Coste de lectura/layout/evaluación/contabilidad/registro/setup/cleanup/export definido por componente y total, sin duplicar layout anidado; evaluación actual unknown. Sin timers/polling, nuevos requests ni callbacks que gobiernen control; no ampliar cobertura B4/B5 implícitamente.
7. Resultados incluyen denominadores, cobertura y sesgo de muestreo. No seleccionar umbral por fill/ingresos contrafactuales ni anunciar validación causal por muestras aisladas.

### Rechazo o suspensión

Rechazar implementación si requiere abrir/reservar DOM, retener un await, consultar SDK extra, cambiar timer/IO comercial, usar el retorno candidato en un if de control, pausar/start/cancelar, modificar targeting o reutilizar tokens terminales. Rechazar datos con relojes incompatibles, pérdidas no contabilizadas, modelo sin procedencia o trayectorias interpoladas. Un conjunto casi todo unknown es **inconcluso**, no prueba contra el candidato ni autorización para ampliar capturas automáticamente.

No aceptar B enforce, C o A3 como continuación implícita. Un gate activo necesita diseño propio de compatibilidad/TTL, evaluación de oportunidades y autorización; este diseño no lo concede.

### Rollback futuro del QA

El observador se debe poder omitir desde la composición/configuración QA externa para la **siguiente navegación autorizada**, sin cambiar la asignación E0/E1 ni interceptar recursos comerciales adicionales. Si hay una parada manual de su observación, solo desconecta sus suscripciones y cierra su ring; no llama al stop del probe existente ni toca player/manager/timers/tokens/standby del core. No destruir/reproducir un anuncio para retirar shadow. Conservar el último export y las razones de parada como cobertura, sin reintentos.

Hoy no hay shadow instalado y, por tanto, no hay rollback runtime que ejecutar. Tras entregar esta especificación se detiene el trabajo: revisión independiente y aprobación explícita antes de cualquier implementación o captura adicional.

## 9. Fuentes y verificaciones de esta entrega

Código actual de ambas distribuciones, coordinador/builder/probe QA existentes y documentos/evidencias A2, en particular [matriz A2](intext-p14a2-evidence-matrix.md), [diagnóstico causal](intext-p14a2-pre-vast-environment.md) y [Performance saneado](intext-p14a2-legacy-performance-evidence.json). Los originales PSP 4+6 no disponibles en Descargas siguen representados por su evidencia archivada; no se presenta nueva lectura de esos bytes. Sin fuentes remotas ni consulta a URLs del HAR.

La auditoría de código del 26/10 intentó primero el MCP y recurrió a lectura local al requerir aprobación con política never, sin reindexar. Esa auditoría y la aritmética de sus muestras se conservan como antecedente. La revisión r2 solo comprueba documentación e integridad de archivos; no ejecuta fixtures, tests del evaluador, builders ni suites, no es validación Chrome y no añade instrumentación. Sin commit, push ni despliegue.

Verificación **histórica del 26/10**, conservada como antecedente: PASS de 183 archivos protegidos, cuatro documentos/41 enlaces y aritmética de muestras; no es ejecución de fixtures r2. En esta revisión se comprueban únicamente integridad de archivos y coherencia documental entre B0, calidad P, contabilidad, etapas, fixtures propuestos y presupuesto. No se implementa ni ejecuta evaluador/adaptador/test alguno. El coste real sigue unknown. La entrega r2 termina para segunda revisión independiente; no autoriza implementación.

**Comprobación r2 del 27/10:** coherencia R1–R6 revisada entre diseño, pseudocódigo/nulidad, matriz, fixtures documentales y roadmap. B0 se resuelve sin P; contabilidad y ring tienen pérdidas distintas; overflow impide tasas exactas; B4/B5 no se evalúan en la etapa inicial; Q1–Q5 no convierten estimaciones en medidas; el presupuesto incluye export y coste de observar sin doble suma de layout. Cuatro documentos y **42 enlaces locales** comprobados sin incidencias de UTF-8, espacios finales, fences o destino/ancla; `git diff --check` sin errores. Los **183 archivos protegidos** de código/JSON/patch conservan el digest agregado SHA256 `3430524bd7139a7d3b8c0095d8e10ee2537b72c15089c64ed1615ef3e8df55b9`. Es verificación documental, no aprobación independiente, prueba ejecutable ni medición de runtime.
