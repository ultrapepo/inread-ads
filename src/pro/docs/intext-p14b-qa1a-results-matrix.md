# P1.4-B-QA1-A — Matriz de conversión offline

27/10/2026. Fuente de los números: [resultados por export](intext-p14b-qa1a-results.json), con hashes de los 30 archivos leídos; [3.186 registros convertidos](intext-p14b-qa1a-converted.json), con pointer al registro original. No son oportunidades, tasas de tráfico, medidas de fill ni resultados de un gate ejecutado. Las filas no se fusionan para comparar efectos.

Revisión P2 cerrada en el [informe de cierre](intext-p14b-qa1a-p2-closure.md): **3.186 → 3.186 registros**, mismo orden, pointers y timestamps. Cambian las etiquetas de procedencia/geometría/etapa, sin nuevas observaciones. Las diez atestaciones del runner se contrastan mediante otro módulo con los bytes HAR/QA/debugger y sus hashes; el resultado es un cotejo local, no una auditoría externa independiente. Un recibo `verified=true` aislado no acredita distribución.

## Material efectivamente convertido

Cada caso conserva dos exports separados (QA y debugger), namespaces documentales de archivo distintos, versión, distribución y hash de fuente. La asociación de metadatos exige ≥2 coincidencias exactas y distintas de evento/timestamp/slot/cycle/token; **no une muestras ni relojes**. Los diez cuerpos de script capturados se cotejaron con los bundles congelados y el documento HAR correspondiente, sin ejecutar sus bytes. Distribución real en los diez casos: `_gam_kv_.js`; versión runtime declarada: `2026.10.07-p1-ima-preload-first-frame`. El modelo/distribución Manager tiene tests sintéticos de procedencia; no se presenta como una captura Manager real.

| Caso | Cohorte / brazo factual / fecha UTC | Archivos QA y debugger | Registros QA+debugger | C0 true / false observados | Rect P parcial |
|---|---|---|---:|---:|---:|
| case01 | Legacy E1, 22/10 | A2-E0-debug.json / A2-E0.json | 359 | 156 / 0 | 153 |
| case02 | Legacy E1, 22/10 | A2-E0-2-debug.json / A2-E0-2.json | 176 | 44 / 0 | 41 |
| case03 | Legacy E1, 22/10 | A2-E0-3-debug.json / A2-E0-3.json | 326 | 156 / 0 | 153 |
| case04 | Legacy E1, 22/10 | A2-E1-debug.json / A2-E1.json | 316 | 156 / 0 | 153 |
| case05 | Legacy E1, 22/10 | E1-2-debug.json / A2-E1-2.json | 301 | 156 / 0 | 153 |
| case06 | Legacy E1, 22/10 | E1-3-debug.json / A2-E1-3.json | 315 | 122 / 32 | 151 |
| case07 | PSP E0, 26/10 | A2-Legacy-E0-real-1-JSON.json / A2-Legacy-E0-real-1.json | 352 | 156 / 0 | 153 |
| case08 | PSP E0, 26/10 | A2-Legacy-E0-real-2-JSON.json / A2-Legacy-E0-real-2.json | 355 | 155 / 0 | 152 |
| case09 | Legacy E0, 25/10 | A2-PSP-E0-1-JSON.json / A2-PSP-E0-1.json | 370 | 146 / 7 | 150 |
| case10 | Legacy E0, 26/10 | E0-26oct-json.json / E0-26oct.json | 316 | 157 / 0 | 154 |

Los nombres E0/Legacy/PSP no acreditan su contenido. El brazo procede de `arm` y assignment_fixed sin conflicto; la cohorte de dualMode/pspDetected/randomSource, vinculados por metadatos verificables. Los nombres originales se conservan, sin sustituir archivos antiguos por otros que compartan etiqueta.

Como volumen de material procesado, hay 1.899 registros QA y 1.287 métricas debugger. En los snapshots hay 1.404 observaciones C0=true y 39 C0=false; son observaciones repetidas, **no 1.443 oportunidades ni primeras elegibilidades**. Hay 1.413 rectángulos P parciales y 9 eventos nativos IMPRESSION identificados como tales. Ninguno acredita `facts.frame`.

## Resultados útiles, parciales y desconocidos

| Campo / pregunta | Información existente y procedencia | Conversión / límite |
|---|---|---|
| C0 factual | `/integration/logs/i/snapshot/readiness/eligible`, booleano directo del control | Útil como observación factual; no se deriva de reason=visible, anchor, evento eligible o éxito posterior |
| B0 | QA0 exige identidad y ámbito válidos, además del C0 factual; P no es requisito | Identidad completa no acreditada: unknown. No se rellena para obtener pass |
| Identidad | Slot, cycle, renderToken, activeRenderToken y tokenMatches existen en el probe; navIndex existe en métricas debugger | Parcial: faltan identidad de navegación/anchor/fetch y vinculación completa en la misma observación. El hash de archivo da un namespace offline, no una identidad live verificada |
| P medido | `snapshot.playerSurface.rect` de la fuente original | Conservado como `player-measured-current-flow`, quality=partial, con etapa explícita acreditada o unknown. Nunca convertido a P pre-player |
| Calidad del rect | Objeto y cuatro escalares originales, sin coerción | rectPresent / rectComplete / rectUsable separados. En este material hay 1.413 de cada uno; no son 1.413 modelos B cualificados. Los rect inválidos de regresión se conservan con original/tipo/estado y usable=false |
| W cerrado / reveal | videoSurface CSS/rect y revealed se encuentran en el original | No acreditan píxeles perceptibles ni que P sea el wrapper; no se promueve opacity del hijo a perceptibilidad |
| Viewport | Métricas debugger exportan viewportHeight; snapshots del probe no exportan viewport completo sincronizado | Height copiado solo a su métrica. Width=null; no se traslada height de una métrica próxima al snapshot |
| Q1–Q5 / CSS / config | Faltan revisiones y operandos/atestaciones completos de la misma observación | No se inventan versiones, currentBox, chrome, fuentes o revisiones. B1–B3 unknown |
| Anchor marginal | case10 attach: intersectionRatio=0,002249755859375; C0=true; P.top=1091,6624755859375 y P.height=350 | Se conservan los valores post-player. El viewport de 922 del debugger no se añade al snapshot. No se calcula un nuevo ratio de P ni un cruce temporal |
| Manager / medio | IDs numéricos locales del probe, cuando existen | Se conservan como IDs **observados**, sin inventar managerLocalId/mediaLocalId ni afirmar binding QA0 completo |
| Frame | Legacy core:first-frame/media/SDK son hitos, pero faltan metadatos de presentación/decodificación y binding completo | `facts.frame` ausente, frameAttribution=unknown. STARTED/IMPRESSION/COMPLETE/canplay no sustituyen esa evidencia |
| IMPRESSION | Evento nativo con manager identificado y token compatible | Observación nativa explícita; no prueba frame perceptible, reveal o viewability |
| Tiempo | Monotónico QA y epoch originales; epoch de métrica y de log exterior debugger se guardan separados | No se construye performance.timeOrigin ni un offset. Regresión explícita; sin reordenar, interpolar o reconstruir scroll |
| Etapa acreditada | Catálogo de nombres exactos emitidos por los productores congelados | Ningún default after-player. Eventos no acreditados y sus P quedan stage=unknown; no heredan etapa de vecinos, prefijos, revealed o campos del input |
| D0 / Dv / Dc | Winner/fetch pueden constar como hechos parciales, pero no hay identidad/población completa acreditada | Fuentes false por defecto. No se admiten filas incompletas al ledger ni se usan snapshots como oportunidades. Recuentos retenidos vacíos ≠ población real cero |
| Censura / gaps | Primera entrada física no cubierta; posibles drops/regresiones explícitos | Censura izquierda y gaps factuales separados. La insuficiencia contable no se atribuye a la censura geométrica. No se inventa fin de captura: ventana contable unknown, tiempos null |
| Primera pasada / salida / reentrada | Snapshots aislados, con cadencia oportunista | Unknown; B4/B5 diferidos incluso si existen pares. Ninguna trayectoria continua reconstruida |
| Contrafactuales comerciales | No se ejecutó un gate alternativo | Ningún fill, ingreso, viewability, fallback/refresh o mejora causal contrafactual atribuido a B |

El resultado del evaluador congelado para cada familia B0–B5 es **2.483 unknown y 703 not-applicable por ámbito Display**, cero pass/fail. Es un límite de cobertura, no una medición de rechazo del candidato. B4/B5 conservan evaluationStage temporal-deferred; no se evalúa movimiento.

Todas las tasas del ledger permanecen null/exactRatesAllowed=false. Cero dropped y un episodio exitoso no acreditan cobertura de D0/Dv/Dc/outcomes.

Reclasificación temporal P2 (recuentos de registros, sin inferir recorrido):

| Etapa | Antes | Tras P2 | Motivo |
|---|---:|---:|---|
| before-player | 80 | 80 | Eventos explícitos de preparación/elegibilidad |
| after-player | 1.424 | 1.405 | 19 eventos sin acreditación exacta dejan de recibir el default |
| post-request | 10 | 10 | Clasificación explícita conservada |
| post-reveal | 9 | 9 | Clasificación explícita conservada |
| Sin etapa / unknown | 1.663 (null) | 1.682 (unknown) | Los null pasan a unknown explícito y se añaden los 19 eventos anteriores |

Las 19 reclasificaciones no añaden ni eliminan P ni filas y no habilitan first-frame, perceptibilidad o tasas. La presencia numérica de un rect no acredita su etapa.

## Material que no se sustituye ni se eleva de calidad

El estudio PSP original de 22/10 (4 E0 + 6 E1) permanece en sus [evidencias archivadas A2](intext-p14a2-evidence.json). Sus JSON raw originales no se sustituyen por los seis Legacy E1 disponibles con nombres parecidos. El manifest QA1-A inventaría disponibilidad/hash; una síntesis histórica no se pasa por el conversor como si fuera un export raw.

Los exports históricos `mobile observe 1.json`, `mobile observe 2.txt`, `mobile shadow 1.json`, `mobile shadow 2.txt`, `mobile shadow 3.json` y `observe desktop 1.json` tienen raíz `{stats,logs}` sin los schemas versionados de este adaptador. Sus hashes quedan inventariados y los archivos quedan fuera del perfil, sin renombrar su shadow histórico como B shadow. No se ejecuta ni modifica su instrumentación. Añadir otro perfil de conversión necesitaría justificar semántica y procedencia; no autoriza capturas ni completa automáticamente los campos que faltan.

## Decisión para la fase siguiente

Los datos bastan para auditar la **conservación de evidencia y los unknown** y revisar la semántica del adaptador. No bastan para calibrar B1–B3, obtener B0 verificable por oportunidad, tasas exactas, primeras pasadas ni frames atribuibles/perceptibles conforme a QA0.

Tras revisión independiente, el siguiente paso técnico motivado sería **diseñar el contrato mínimo de adquisición QA1-B**, empezando por identidad/ámbito y C0 en el mismo check existente, antes de discutir umbrales. Para comparar geometría se necesitarían P/viewport/revisión y Q1–Q5 simultáneos; para outcomes de frame, binding y metadatos verificables. Los huecos figuran en el [informe QA1-A](intext-p14b-qa1a-review.md). Esa adquisición, sus hooks, medición de coste y capturas requerirían aprobación separada y **no se implementan ni autorizan aquí**. A2 sigue cerrada en recopilación; H-IMA/H-QA y P1.3c visual siguen abiertas; A3 permanece bloqueada.
