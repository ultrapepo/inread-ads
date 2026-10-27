# P1.4-B — Contrato propuesto de observabilidad QA

Revisión documental **r2, 27/10/2026**. **Contrato corregido para segunda revisión independiente, sin implementación autorizada.** Vinculado al [diseño y tabla de cambios R1–R6](intext-p14b-shadow-design.md) y la [matriz de campos/cobertura](intext-p14b-shadow-observability-matrix.md). No se añade API, hook, test ejecutable, listener, observer, bundle, probe o export. No se hacen capturas ni mediciones de runtime.

## 1. Separación de responsabilidades

Propuesta de tres componentes futuros, exclusivos de QA:

1. **Adaptador de lectura:** convierte datos de eventos existentes y referencias del nodo en una muestra plana saneada. No escribe DOM, configuración, targeting, SDK o estado de core. No llama funciones de validación/ownership que produzcan logs o cambios; recibe sus resultados factuales.
2. **Evaluador inicial B0–B3:** acepta datos planos y devuelve datos planos, sin DOM/globals/promesas/timers/SDK. B0 solo usa C0 factual, ámbito e identidad; B1–B3 exigen P admisible. B4/B5 se reservan como unknown/temporal-stage-deferred, sin evaluador ni reductor temporal inicial.
3. **Contabilidad, registro y analizador offline:** conserva contadores de oportunidades y resúmenes independientemente del ring de snapshots. El analizador exporta cobertura/censura sin reconstruir denominadores desde muestras supervivientes. Nunca devuelve permisos al lifecycle.

Se propone un módulo QA separado en una futura composición aprobada; no sustituir `getReadinessViewportState`, envolver requestAds/start/play, monkeypatch de getters, instalar otro controlador global comercial o alterar los probes/bundles actuales para «completar» esta tarea. El export existente no contiene aún los campos B.

**Nombres siguientes son propuestos**, no interfaces que existan en producción: `P14BShadowSampleV1`, `evaluateP14BShadowV1`, `P14BShadowExportV1`.

## 2. Puntos de observación y cadencia

| Etapa propuesta | Fuente factual a reutilizar en una implementación QA futura | Precaución |
|---|---|---|
| fetch/winner y token handoff | Eventos/marcas de preparación y métricas ya existentes | Pre-token: identificar fetch generation; no fabricar creative/player |
| control-check / primera positiva | Resultado del check que ya evalúa `waitForViewport` | IO threshold 0 no informa cruces 25/50 de P; no cambiar thresholds/márgenes del control |
| **boundary-pre-player** | Observación de datos justo tras guard `video_activation_eligible`, antes de release/crear Video.js | No existe snapshot completo allí hoy. Un punto QA futuro requeriría aprobación de alcance, sin await nuevo ni retorno consultado |
| after-player / ads-request / manager / frame | Snapshots existentes del probe de integración | Post-control: no sustituye frontera ni trayectoria hipotética de otro gate |
| user/geometry event | Callbacks existentes de scroll/resize/IO/visibilitychange, mientras existan | No todos están instalados preactivación: con IO, wait no usa scroll fallback; no fingir cadencia continua |
| STARTED/IMPRESSION/reveal/terminal | Eventos existentes con identidad/cobertura manager | No getAdsManager adicional, nueva suscripción nativa ni lectura de AdsRequest para este fin |
| salida/reentrada/ownership invalidado | Checks/recovery ya existentes y eventos de cierre | Registrar, sin llamar pause/resume, retry, claim/release/cancel |
| pagehide/export/detach | Eventos disponibles/cierre propio QA | Censura y cobertura; export explícito no hace refetch |

Los puntos describen **dónde se observaría**, sin añadirlos ahora. Una implementación futura debe justificar por separado cómo recibe datos de ambos cores. El alcance inicial es B0–B3 por snapshot disponible: **no incluye nuevos listeners, observers, polling ni timers para obtener pares B4/B5**. Si falta un dato, queda unknown. Ampliar captura, suscripciones o hooks necesita otra revisión explícita; ni esta arquitectura ni un snapshot incompleto lo autorizan.

La cadencia es la de los callbacks disponibles y **no se garantiza**. Cada evento/nodo aporta como máximo una lectura compartida por B0–B3. B4/B5 permanecen diferidos/unknown en la etapa inicial aunque aparezca ocasionalmente una pareja favorable. La regla futura B5 solo se evaluaría con eventos independientes ya disponibles, después de aprobar esa extensión; nunca se programaría otra muestra. Sin rAF/timer, espera de estabilización, deadline, request o navegación para completar datos.

## 3. Esquema de muestra

Campos obligatorios pueden contener null con `missingReason`; nunca inventar valores para completar el esquema. Objetos/DOM/funciones/SDK no entran en el registro.

La validación base de B0 solo exige versión/fuente factual, ámbito, identidad y C0 observado/fiable. **P[], rectModelVersion, viewport y movimiento son opcionales para B0**, incluso si no aparecen en el snapshot: no se rechaza su esquema por faltar datos geométricos que no usa. B1–B3 añaden sus requisitos propios; B4/B5 no se evalúan en la etapa inicial.

| Grupo | Campos propuestos | Semántica |
|---|---|---|
| Encabezado | schemaVersion, contractRevision=r2, evaluationStage=snapshot-B0-B3, formulaVersion, rectModelVersion, parameterSetId, qaOnly=true, mode=shadow, enforce=false | B0 no requiere rectModelVersion; B4/B5 diferidos, sin campo de autorización comercial |
| Proveniencia | distribution, coreSha256, qaBundleSha256, cssModelSha256/version, arm, cohortId, runtimeContext | Hash de la fuente medida; contexto PSP/Legacy explícito, sin inferirlo del nombre de archivo |
| Identidad | documentLocalId, navigationLocalId/navIndex, slotLocalId, cycleId, fetchGeneration, renderToken, activeRenderToken, preparationGeneration, anchorLocalId/type | IDs QA locales por sesión; no escribirlos en elementos/targeting. No unir pre-token a post-token sin handoff acreditado |
| Tiempo | sourceClock, monotonicMs, wallTimestampMs, eventSequence, parentEventId, sampleSequence, eventType, stage, boundaryPosition | `before-player`, `after-player`, `post-request`, `post-reveal` explícitos; source clock no intercambiable con trace/HAR |
| Control/ownership | controlEligible, controlReason, controlEvaluationObserved, tokenMatches, preparationState, revealed, terminal, destroyed | Capturar hechos ya evaluados, no llamar `claimVideoPreparation`, `isActiveRenderToken` o recovery solo para observar |
| Documento/viewport | documentHidden, visibilityState, layoutWidth, layoutHeight, viewportRevision; visualViewport opcional separado | Misma muestra; distinguir missing de hidden. Cambios invalidan pares de movimiento |
| A | rect, connected, targetType, renderedByControl, externalAncestorStyleKnown | C0 verdadero/razón como autoridad factual, no otra versión del gate |
| P[] | rect o null, rectModelId/version, coordinateSpace, heightSource, widthSource, originSource, quality, qualificationQ1Q5, layoutRevision, clippingCoverage | B0 no consulta P. Para B1–B3: measured en su etapa o qualified-estimate con Q1–Q5; partial/unknown no bastan |
| W y player | wrapperRect/CSS/isOpen, playerRect/source/measurementStage, mediaLocalId/frameSource si existentes | El wrapper cerrado sigue siendo W; rect positivo del hijo no prueba anuncio perceptible |
| Movimiento | scrollY, sourceEvent, previousSampleId, dtMs, dyPx, meanVelocity, netDirection, centerDistanceDelta, documentTopDelta, movementQuality | Valores derivados solo con par admisible; net-small-displacement no es stopped |
| Edad | winnerResolvedAt, pendingTimestampObserved, pendingAgeMs, pendingState, configuredMaxFetchToRenderMs, preparedLeaseState, bidTtlStatus | `consumed/null` no significa edad cero. TTL/cache unknown si no exportado; no consulta extra al bidder |
| Contexto UX | pipState, animationStage, recoveryState, nativeCoverage, frameObserved, revealRequested, perceptibilitySource | Valor observado o unknown; no inferir PiP por posición fixed ni Active View de un ratio DOM |
| Cobertura | missingFields/reasons, rawSnapshotDropped, leftCensored, visibilityGap, clockQuality, geometryQuality, samplingSource, opportunityTracked, accountingCompleteByDenominator, sourceGap, summaryOverflow | Pérdida de snapshots y pérdida contable no son equivalentes; preservar ambas sin inventar continuidad |

No se incluyen URLs, querystrings, cookies, targeting, bids íntegros, line item/campaign IDs, XML, payload AdsRequest, referencias a elementos ni stacks con URLs. Una identidad comercial necesaria en otro análisis se conserva en su canal restringido, no se agrega al esquema B. Se reutiliza el sanitizado existente solo si su contrato realmente cubre esos datos; no se modifica en esta tarea.

### Salida por candidato

```text
sampleId, candidateId, rectModelId, parameterSetId, formulaVersion
evaluationStage: snapshot-B0-B3 | temporal-deferred
status: pass | fail | unknown | not-applicable
reasons[]
areaFraction?, xFraction?, yFraction?, maxAreaFraction?
controlComparison: agrees | candidate-rejects-control | unknown | not-applicable
stage: before-player | after-player | post-request | post-reveal
geometryQuality, movementQuality, coverage
```

**Salida B0:** rectModelId=null, parameterSetId=control-factual, geometryQuality=not-required, movementQuality=not-required y fracciones null. C0=true/P unknown produce pass y controlComparison=agrees. Faltan P o viewport como dato geométrico adicional: no degradar ese resultado; el control ya aplicó su propia regla factual.

**Salida temporal diferida:** para B4/B5 in-scope, status=unknown, reason=temporal-stage-deferred, geometryQuality=not-evaluated y movementQuality=deferred. Un modelId solicitado identifica solo la fórmula futura, no acredita que se haya leído P o construido una secuencia. No se contabiliza como candidato fallido ni se requiere para aprobar la etapa B0–B3.

Razones propuestas: control-ineligible, control-unobserved, scope-unknown, identity-unknown, inconsistent-source, stale-identity, no-planned-rect, model-quality-insufficient, invalid-viewport, qualified-estimate, outside-planned, below-fraction, horizontal-fraction, threshold-unreachable-by-size, temporal-stage-deferred, insufficient-motion-samples, sampling-gap, layout-changed, candidate-confirmation-pending, pip-geometry, terminal, display-only. Las razones temporales posteriores a deferred solo corresponden a una extensión futura aprobada. qualified-estimate acompaña calidad sin presentarla como measured.

**Nulidad y precedencia:** fuera de ámbito o identidad conocida stale/terminal → not-applicable; ámbito/identidad no verificables o fuentes incompatibles → unknown. Después, B0 resuelve únicamente C0 observado y fiable: true→pass, false→fail, ausente→unknown. No exige otro flag de documento/viewport/P; un conflicto de origen acreditado invalida la muestra, no reinterpreta C0. B4/B5 in-scope son unknown/temporal-stage-deferred en la etapa inicial, incluso con C0=false. Solo después se resuelven B1–B3: C0=false→fail sin P; C0 unknown→unknown; C0=true requiere P/viewport admisibles o unknown. Nunca coerción truthy de null ni NaN→0.

## 4. Evaluación y reductor de episodios, pseudocódigo de diseño

```text
evaluate(sample, candidate):
  verificar esquema/versión y consistencia de la fuente factual
  si ámbito conocido excluye vídeo, o identidad conocida terminal/stale: not-applicable
  si ámbito o identidad no son verificables, o hay conflicto acreditado de fuente: unknown
  si candidate es B0:
    si C0 factual observado y fiable es true: pass (sin acceder a P)
    si C0 factual observado y fiable es false: fail(control-ineligible)
    si C0 no está observado/fiable: unknown(control-unobserved)
    terminar esta evaluación; no validar P, viewport ni movimiento
  si candidate es B4 o B5 en etapa inicial: unknown(temporal-stage-deferred)
  continuar solo para B1–B3
  si C0 factual es unknown/no fiable: unknown(control-unobserved)
  si C0 factual es false: fail(control-ineligible), sin exigir P
  elegir P exclusivamente por rectModelId solicitado
  si P es player flotante PiP: not-applicable(pip-geometry para inserción inicial)
  si P/viewport no cumplen calidad mínima aplicable: unknown(model-quality-insufficient)
  calcular intersecciones flotantes y condición geométrica
  si condición geométrica conocida false: fail(razón)
  si todas las condiciones conocidas true: pass
  devolver dato; nadie consulta ese dato para actuar sobre el anuncio
```

Es pseudocódigo de documentación, no un evaluador implementado ni un test ejecutado. Para P pre-player, los requisitos Q1–Q5 del diseño son normativos: contexto/identidad y mismo snapshot; rect/viewport válidos y espacio compatible; fuentes efectivas de tamaño versionadas; hipótesis/alcance CSS resueltos; procedencia y ausencia de conflictos. El literal 350px o concordar con un player posterior no califican por sí solos un modelo. B1–B3 con partial/unknown siguen unknown, aunque se publique un yFraction auxiliar. qualified-estimate se calcula en serie propia y nunca se renombra measured.

Los estados se definen por muestra; los resúmenes factuales conservan solo los hitos/flags compactos disponibles. El reductor de pares/confirmaciones **B4/B5 está diferido**, sin implementación inicial ni garantía de cadencia. No mantiene un estado que autorice render.

Para una eventual extensión B5 aprobada, microtask y callback padre cuentan como una observación aunque tengan sequence distinto. Requerirá parentEventId, reloj y eventos independientes, sin listeners/observers/polling/timers añadidos en el alcance inicial. Una futura confirmación por muestras nunca se llamará dwell continuo. No se implementa su contador k para satisfacer esta revisión.

La primera positiva, tras una negativa, guarda bracket `(lastNegativeObserved, firstPositiveObserved]` como intervalo sin afirmar unicidad de cruce ni continuidad. Si empieza positiva, `firstEntryLeftCensored=true`. Unknown, dropped, cambio de anchor/layout/viewport o hueco no admisible invalidan confirmación B5 y continuidad de pasada; no rellenar muestras ni sostener el último rect entre ellas. Una reentrada con token nuevo inicia registro distinto, relacionado si la genealogía factual es conocida.

Los denominadores D0/Dv/Dc se forman **antes de candidatos** a partir de ciclos, winner inicial y control factual. P unknown no elimina una oportunidad de Dv/Dc; B0 no puede añadir una oportunidad Display a Dc por sí solo. Para cada candidato se publican los mismos contadores de población y sus unknown/pérdidas, junto a estados por snapshot. No confundir tasas de muestras con tasas de oportunidades. La integridad que permite tasas exactas se define a continuación, nunca se infiere del ring retenido.

## 5. Contabilidad, memoria y medición del coste

### 5.1 Tres niveles independientes

| Nivel | Qué conserva | Política ante límite |
|---|---|---|
| Contadores de oportunidades | D0, Dv/Dc yes/no/unknown-membership, censura por motivo, integridad por denominador/ámbito y pérdidas de origen | No son conteos de snapshots ni se evictan con ellos; si no pueden actualizarse con integridad, marcar partial/unknown irreversible |
| Resúmenes compactos por oportunidad | Clave documento/nav/slot/cycle, winner inicial, primera positiva C0, hitos mínimos, token/fetch actuales y genealogía conocida, resultado/censura, flags de pérdida y contadores iniciales B0–B3 | Retener la identidad incluso terminal para deduplicar; no sustituir resúmenes antiguos por nuevos. Capacidad finita y saturación explícita |
| Ring de snapshots | Geometría y detalle por evento, sampleId y referencia a resumen si existe | Evictar primero el snapshot más antiguo; actualizar pérdidas por resumen/etapa. Ninguna resta en D0/Dv/Dc |

Orden lógico futuro: validar clave/fuente factual → registrar o actualizar resumen/contadores idempotentes → evaluar B0–B3 si hay datos → actualizar resumen de resultados/cobertura → intentar retener snapshot. Repetir un evento del mismo ciclo no incrementa D0; winner vídeo y primera positiva C0 se contabilizan una sola vez por identidad. Un winner inicial contradictorio se marca unknown/conflict, sin escoger el favorable. D0/Dv/Dc no dependen de P, del catálogo candidato ni de la supervivencia de una muestra.

Membresía de Dv/Dc usa yes/no/unknown y fase pending/terminal/export: falta de winner no es Display, falta de C0 no es ineligible, y fin de captura puede dejar censura. Dc contabiliza positiva C0 observada en una oportunidad vídeo verificada; no pretende contar cruces físicos que no se muestrearon. Un control observado true con vídeo aún no verificado queda pendiente en el resumen, sin incrementar Dc hasta resolver esa identidad/winner. Los resúmenes guardan censura izquierda/derecha, gaps, pérdida de detalle y timestamp/reason de cada primer hecho relevante, con campos fijos; no una lista ilimitada de eventos/tokens.

### 5.2 Límites y overflow sin denominadores ficticios

Propuesta r2 para revisión, no configuración instalada: **2 MiB de estado lógico serializado total**, reservando hasta 256 KiB a un máximo de **64 resúmenes** y 32 KiB a agregados/flags; ring de hasta **2000 snapshots y 1760 KiB**. Esos topes reemplazan el anterior límite ambiguo conjunto; no confundir bytes serializados con heap real. Catálogo B0–B3 y campos de resumen acotados por versión; estructuras, strings y contadores no pueden crecer sin límite. Asignaciones transitorias/export y memoria física se miden aparte.

La evicción de snapshots fija `rawEvidenceEvicted`, conserva N descartado y primera/última secuencia perdida por ámbito/etapa; los resúmenes conservan hechos procesados y censura. Si el bracket o episodio exige detalle que ya no está, marcar su reconstrucción como insuficiente. **Perder el detalle no implica automáticamente perder el contador** ni autoriza a reducirlo. Puede informarse un recuento exacto sustentado por resúmenes íntegros, etiquetado como tal, aunque el raw no sea reauditable; no acreditar continuidad del scroll.

Al llegar una **65.ª oportunidad distinta**, o agotarse el presupuesto de resúmenes/agregados, no evictar identidades contables ni fingir deduplicación ilimitada. Fijar `accountingOverflow=true`, hora/motivo y `accountingComplete=false` para el documento/poblaciones afectadas; conservar resúmenes y contadores ya válidos. No admitir nuevas identidades fuera de capacidad. El contador posterior de `untrackedOpportunityNotifications` es de **notificaciones**, no de oportunidades únicas. Se pueden seguir completando registros ya retenidos, sin restaurar por ello la integridad global. Un límite de contador o gap de origen no recuperable también invalida la exactitud.

No perder silenciosamente hechos antes de resumirlos: si el origen/entrega del callback ya era incompleto, conservar `sourceGap` por ámbito y desconocidos. Si se perdió un fetch/ciclo, ni D0 puede darse por completo; si solo falta winner, Dv es parcial aunque D0 sea completo; si falta control, Dc puede ser parcial con Dv completo. El ring no repara ninguno de esos gaps. Exportar manualmente no reinicia flags, no libera resúmenes para presentar luego toda la captura como completa y no salva por sí solo un overflow. Solo otro documento inicia otro ámbito; **no se navega automáticamente**.

### 5.3 Export, censura y tasas

Un futuro export manual incluiría, además del ring, los resúmenes/contadores, periodo/sourceClock y ámbito, estados de integridad D0/Dv/Dc, unknown-membership, fuentes/gaps, overflow, pérdidas raw y resultados/censura. Es un contrato propuesto: no hay export nuevo hoy, persistencia automática en storage, cargas remotas ni borrado del estado por exportar.

**Tasas exactas permitidas solo cuando** las identidades deduplicadas de la población solicitada están todas contabilizadas y son recuperables en contabilidad íntegra, sus membresías necesarias están resueltas y el numerador conserva cobertura suficiente del mismo ámbito/periodo. Snapshot eviction por sí sola no prohíbe una tasa respaldada completamente por resúmenes; pérdida de contabilidad/membresía/numerador sí. Los hechos observados no prueban una trayectoria continua, y una tasa exacta de registros factuales no es causalidad ni tasa comercial del tráfico.

Si algún requisito falla, el export debe decir **coverage-insufficient; exactRatesAllowed=false**, por métrica/ámbito, y prohibir la tasa exacta de toda la captura. Publicar conteos retenidos etiquetados como población parcial y motivos de censura/pérdida. Si se conoce un total íntegro y solo hay membresía unknown, pueden mostrarse cotas justificadas; no inventarlas si también se desconoce el total. Una subpoblación/prefijo íntegro solo se describe con su límite explícito, sin extrapolar ni ocultar que el resto está sin contabilizar. Nunca denominador igual al número de muestras supervivientes o de candidatos que pasan.

### 5.4 Protocolo de coste para una eventual fase aprobada

**Resultado actual: unknown, no medido.** Esta revisión no añade marcas, tests, capturas ni fixtures ejecutables. El protocolo siguiente concreta qué deberá verificarse tras aprobar una implementación QA y, por separado, cualquier medición que requiera nueva captura.

| Componente | Medición propuesta futura | Regla de atribución |
|---|---|---|
| Adquisición/lectura | Diferencia monotónica entre entrada y fin de la única lectura compartida por evento/nodo | Incluye getBoundingClientRect/getComputedStyle y cualquier layout forzado síncrono que provoquen; registrar wall-time, no llamarlo CPU pura |
| Evaluación B0–B3 | Tramo desde datos planos hasta resultados de todo el catálogo inicial | Desglosar B0 y familias P cuando pueda hacerse sin alterar el orden; no nuevas lecturas por candidato |
| Contabilidad/resumen | Tramo de deduplicación, actualización D0/Dv/Dc, censura y pérdidas | Incluye caso duplicado, límite/overflow y trabajo de evicción; no esconderlo dentro de un ring supuestamente gratis |
| Registro/ring | Tramo de saneado, cálculo de tamaño, copia y escritura de snapshot/resumen | Incluir cálculo del límite lógico y asignaciones; no solo push. Export no se ejecuta desde callback crítico |
| Setup/cleanup y dispatch propio | Tiempo exclusivo del módulo QA y sus invocaciones, mediante perfil/trace si está aprobado | No adjudicar el callback comercial entero al observador ni repetirlo para medirlo |
| Export explícito | Tramo separado de construir/codificar/copiar el export manual, bytes y máximo de memoria transitoria | Informar aunque suceda fuera del intervalo interactivo; incluirlo en el coste total |
| Layout, CPU y GC | Perfil/trace externo del mismo intervalo y stacks del módulo; memoria/allocations si disponibles | Layout dentro de lectura es un **subconjunto**, no sumarlo otra vez. Tiempo exclusivo de hilo no es consumo CPU puro. GC compartido/no atribuible se declara incierto |
| Coste de medir | Overhead de lectura de reloj, marcas/contadores/serialización diagnóstica y DevTools | Incluido en tiempo total observado; cualquier corrección/calibración se publica aparte y nunca oculta el valor bruto |

En una instrumentación futura aprobada se usarían fronteras monotónicas en las invocaciones QA ya previstas, **sin envolver métodos SDK ni añadir polling/listeners/observers/timers**. Tramos exclusivos no solapados: `sampleSync = lectura + evaluación + contabilidad + registro + dispatch propio no incluido`. La misma lectura sirve a todos los candidatos. No sumar subtramos al tramo padre. Para costes del resto del hilo/procesos se necesita perfil autorizado; sin él, CPU/layout exclusivo o GC no separables siguen unknown aunque haya duración de callback.

Definir antes de medir el dispositivo, distribución, versión/catálogo, carga, viewport, estado de caché/proxy y ventana común del documento, desde setup hasta freeze/cierre de observación; no alargarla por inactividad para aprobar presupuesto. Registrar N eventos por tipo, frecuencia/pérdidas y tiempo visible/oculto. Un contraste futuro apagado/encendido debe usar el mismo camino factual permitido y describir factores/variabilidad, sin atribuir las diferencias de dos navegaciones al observador ni cerrar H-QA. No se ordena realizarlo ahora.

Presupuesto provisional, pendiente de esa revisión: **p95(sampleSync)≤2 ms**, y **100 × totalObserverSyncMs / observationWindowMs ≤1%**, con `totalObserverSyncMs = setup + suma(sampleSync) + cleanup + export explícito`, sin doble cómputo. observationWindowMs es la ventana fijada hasta freeze; el export posterior **no la amplía**, aunque su coste sí entra en el numerador. Informar p50/p95/máximo, N, coste por componente, total bruto, bytes/heap, pico transitorio y cobertura; publicar también el subtotal interactivo, sin sustituir al total. Estos porcentajes son relación de tiempo de pared síncrono al intervalo, no porcentaje de CPU del proceso.

Además, ningún long task >50 ms nuevo atribuible al observador en la fase interactiva; reportar por separado long tasks del export y coste de layout/GC incierto, sin esconderlos para aprobar. Si no se puede medir coste total o atribución requerida, el resultado del presupuesto es **inconcluso**, no PASS. Un exceso rechaza el adaptador propuesto y vuelve a revisión de diseño, sin reducir el muestreo silenciosamente, alterar el lifecycle o ampliar capturas B4/B5.

Una parada manual/fallo del observador afecta solo sus datos y cierra su cobertura con razón; nunca detiene, espacia o reintenta el lifecycle comercial. Todos los límites anteriores son reglas de datos/medición, no deadlines de anuncios.

## 6. Validación, rechazo y retirada para la fase futura

Los siguientes son **fixtures documentales propuestos, no tests creados ni ejecutados**:

| Caso / datos de entrada | Resultado esperado de diseño |
|---|---|
| Ámbito vídeo/identidad válidos, C0=true, P unknown o viewport geométrico no exportado | B0 pass sin acceder a P; B1–B3 unknown; B4/B5 unknown/deferred |
| Misma identidad, C0=false y P unknown | B0 fail; B1–B3 fail por C0; B4/B5 unknown/deferred en etapa inicial |
| C0 no observado/fiable, aunque P parezca visible | B0–B3 unknown; B4/B5 deferred; no reconstruir C0 con P |
| Display, token conocido stale/terminal; o identidad no verificable | NA en primer grupo; unknown en el último. No acceso obligatorio a P para B0 |
| C0=true y P pre-player solo basado en literal 350px, CSS/origen pendiente | B0 pass; modelo partial/unknown y B1–B3 unknown/model-quality-insufficient |
| C0=true y Q1–Q5 acreditados para qualified-estimate | B1–B3 calculables en serie estimada; jamás measured ni layout final |
| Caso anchor 0,225%, P válido fuera y W h=0 | B0 pass; B1–B3 fail geométrico si el modelo/viewport de esa muestra son admisibles; con datos parciales, unknown, sin abrir W |
| Dos snapshots positivos independientes o parejas ocasionalmente adecuadas | Etapa inicial B4/B5 unknown/deferred; no activa extensión ni prueba dwell continuo |
| Evicción de todos los snapshots con contadores/resúmenes íntegros | D0/Dv/Dc y sus estados conservados; rawEvidenceEvicted y pérdida de detalle, sin descontar oportunidades |
| Repetición de fetch/winner/C0 de una identidad retenida | No duplicar D0/Dv/Dc ni sustituir winner inicial |
| 64 resúmenes retenidos, llega una 65.ª oportunidad | No evictar resumen; accountingOverflow, contabilidad global parcial, exactRatesAllowed=false para captura completa |
| Falta winner/control o evento de origen anterior a resumir | Dv/Dc o D0 parciales según fuente; no false/0; prohibir tasas que necesitan esa población/numerador |
| Denominador íntegro, numerador de primera pasada censurado | Conteos de población conservados; tasa exacta de ese outcome prohibida, aunque el ring no se haya llenado |
| Falta adquisición/layout/registro/export o atribución de coste total | Presupuesto unknown/inconcluso; no sumar layout anidado dos veces ni anunciar PASS |

Se mantienen como casos de una eventual validación aprobada fracciones/bordes, clipping, doc hidden, P/viewport cero o NaN, identidad/generación, dos slots, reentrada, PiP y Display. No se convierte esta lista en tests ejecutables durante la corrección documental.

Antes de aceptar una implementación, revisión de dependencias debe demostrar que solo datos fluyen hacia el observador y que no existe una rama de control sobre su resultado. Comparar ambas distribuciones con sus diferencias reales (por ejemplo `defaultMuted` explícito en el createVideoElement de `_gam_kv_.js`, no en el de Manager); no homogeneizarlas como parte de B. Validar que no se añaden timers, requests, starts/pausas, cancelaciones, modificaciones de IO comercial, AdsRequest, TTL, targetings o rutas de error.

La comparación de reveal también conserva la llamada explícita a `maybePlayInitialOpenAnimation()` al final de `revealPlayer` en `_gam_kv_.js`, ausente en esa closure de Manager. No usar una expectativa de llamadas idénticas entre distribuciones como test de B: exigir que cada una conserve su propio comportamiento y que el observador registre correctamente la fase disponible.

Rechazar si el contrato requiere ampliar cobertura nativa/SDK, abrir DOM, un global comercial nuevo, un retorno awaitable, un nuevo hook que modifique el orden o una falsa trayectoria continua. Cobertura incompleta no habilita navegar más automáticamente. Toda necesidad adicional se lleva a revisión explícita con los resultados existentes.

Rollback del módulo futuro: omitirlo en composición QA para siguientes documentos autorizados; retirada de sus propias suscripciones/buffer con cierre de cobertura. No detener el probe existente, destruir players, cambiar brazo, borrar pendingAuction, forzar refresh o recargar automáticamente una página con publicidad activa. Los exports saneados ya obtenidos se conservan.

**Punto de parada actual:** entregar diseño, matriz y contrato para revisión independiente. No implementar, instalar ni activar B shadow/enforce, A3 o C; no nuevas capturas, commit, push o despliegue.
