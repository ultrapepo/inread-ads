# P1.4-B-QA1-B — Matriz de datos y suficiencia r1, revisión B

28/10/2026. Contrato propuesto, **sin implementación ni nueva captura**. Leer con el [diseño](intext-p14b-qa1b-acquisition-design.md) y el [plan](intext-p14b-qa1b-test-plan.md). QA0/QA1-A y sus validaciones permanecen congelados. Todas las filas son obligaciones futuras o límites conocidos, no campos adquiridos hoy.

Revisión documental R1/R2 del **31/10/2026** (`r1-review-B`); pendiente de revisión independiente. La tabla de cambios del diseño y el [manifiesto](intext-p14b-qa1b-integrity.json) identifican el alcance: solo estos cuatro documentos, 360 originales conservados, sin implementación.

## 1. Separación de requisitos

| Grupo / autoridad | B0 | B1–B3 con C0=true | Outcomes | Unknown/gap / prueba necesaria |
|---|---|---|---|---|
| schema/contractRevision/source | Requerido | Requerido | Requerido | Emisor QA1-B versionado nuevo; no declarar otro schema antiguo para atravesar QA1-A |
| Documento/realm y navegación real | Requerido | Requerido | Requerido | Alias del objeto/raíz observados, navIndex como atributo, no identidad por URL; navegación sin frontera observada impide verified |
| Slot/anchor/cycle/fetch/token/activeToken | Requerido completo | Mismo contexto en cada P | Igual + ownership de callback | Generación nativa ausente o contexto perdido: raw no admitido, sin rellenar 1/0/token. No excluirlo del diagnóstico de cobertura D0 |
| C0 booleano de guard real | True **y** false | Igual; false permite fail sin P, según QA0 | Guard posterior con otra etapa | Resultado original por referencia, nunca nueva invocación ni reason reconstruido |
| Callsite / propósito / resultado de guard de token | Requerido; selector 2.1 | Requerido | Requerido | Tres callers de wait vídeo + final activate; Display, preparación, diagnóstico, no-fill, recuperación, reveal, plugin-init y ready separados. Guard no ejecutado no es false |
| Anchor A0 / V0 / hidden/rendered/solape | Aprovechar locales existentes; faltantes no se inventan | Requerido con validación de sincronía | Estado puntual posterior | Retorno temprano puede no tener viewport/rect. No exigir P/manager para B0; anchor no identificable impide identidad completa |
| Clock/tiempo/sequence | Tiempo de observación del realm y orden de fuente | Igual en sample/context/V/revisión | Adquisición del callback, metadata nativa aparte | No mezclar HAR epoch, performance de otro documento, RVFC presentationTime o métricas posteriores |
| W y contentBox actuales | No requerido | Referencia real, rect y 8 padding/bordes, origen/ancho coherentes | Para visibilidad/reveal medido | No llamar getElement con potencial creación, abrir/clonar/inyectar ni medir un player ficticio |
| P intención | No requerido | Alto/origen/ancho de fuente efectiva versionada; qualified-estimate | No sustituye P medido posterior | Literal 350px no resuelve overrides, flex, transform, configuración o clipping; perfil no soportado → partial |
| P envolvente open | No requerido | Operandos lock/chrome/preset y caja actual | No representa medio ni layout final | 345+(-1) inválido; null/0 chrome usa fallback 15 solo cuando la rama real lo permite. No sumar offset 31/170 |
| P medido | No requerido | Solo serie post-player, nunca pre-player | Puede informar superficie en el callback | rectPresent, rectComplete y rectUsable separados; usable local no acredita Q1–Q5 |
| Layout/V revisions y Q1–Q5 | No requerido | Todos comprobados con procedencia | Revalidación de superficie posterior | ID de bracket no es revisión global nativa. Cambio A/V/W/estilos/owner invalida P sin repetir lectura hasta aprobar |
| Distribución/core/CSS/config/build | Partición y procedencia | Fuentes efectivas y modelos fijados por hash/versiones | Igual, con fuente de evento | coreSha256 de QA0 es base aprobado; hash servido QA distinto, con diff/manifiesto y cotejo de bytes independiente |
| Manager/medio/source-epoch | **No requerido** | **No requerido** | Requerido para atribuir frame/nativo a binding | Capturado de objeto realmente entregado/usado por el control. No importar IDs privados del probe ni fabricar aliases de objetos no vistos |
| Frame metadata | **No requerido** | **No requerido** | RVFC existente + binding; alternativa decoder solo si fuente cualificada | STARTED/IMPRESSION/COMPLETE, canplay, timeupdate>0 o firstFrameConfirmed no bastan |
| Reveal / PiP / animación / CSS | No autoridad sobre B0 | Contexto de modelo, PiP excluye serie inline | Hechos y etapas separados | Petición open, flag revealed, rAF/clase aplicada y píxeles perceptibles son distintos |
| D0/Dv/Dc/outcome coverage | No condiciona validez A por muestra; sí nivel B | No filtrar por P disponible ni umbral | Numerador aparte | Primer perfil sourceComplete=false en los cuatro ámbitos. A puede aprobar con B insuficiente; cero dropped no demuestra integridad |

## 2. Forma compatible con QA0 congelado

El packet raw QA1-B tendría envelope con eventId, callsite/version, source-code references, identidad/ownership y pruebas de procedencia. El adaptador expondría la forma QA0, sin añadir permisos al core:

| Destino QA0 | Contenido propuesto / condición |
|---|---|
| sample.identity | documentLocalId/navigationLocalId/slotLocalId/anchorLocalId ≤48 chars locales; cycleId/fetchGeneration enteros positivos nativos; renderToken/activeRenderToken enteros ≥0; state live/stale/terminal y verified solo tras comprobaciones |
| sample.scope / source.consistent | Video verificado para comparador; opportunity para hechos poblacionales pendientes; Display separado. Incoherencia conocida no se oculta |
| sample.control | observed/reliable/eligible del consumidor primario real W2/W3/W4/C1 (2.1). Proyección poblacional versionada: Display, diagnóstico/proximidad/no-fill y todos los guards post-player quedan fuera de control primario observado/fiable; el booleano factual permanece raw en su serie, nunca se sustituye por false |
| sample.stage / sourceClock / monotonicMs / sampleSequence | Etapa de frontera acreditada: before-player en guard previo a creación; posteriores según evento. Unknown sin catálogo de productor; page-monotonic-ms de un solo realm |
| sample.viewport / layoutRevision | width/height CSS layout, revision y coordinateSpace; bracket y validaciones descritos. visualViewport separado, sin reemplazar el viewport que C0 utilizó |
| sample.provenance | distribution, coreSha256 base, cssModelVersion/configVersion efectivos. Artefacto QA servido/CSS/config hashados en envelope auditado; no llamar completa a una declaración del runner |
| plannedRegions[].context | Mismos IDs/cycle/fetch/token, etapa, sourceClock/sequence, layoutRevision/viewportRevision y espacio; no copiar de otra muestra |
| plannedRegions[].evidence | wrapperConnected/ID, acquiredWithinRevision, fuentes/unidades versionadas, currentBox y operandos resueltos, scope layout/closure/externalStyles, procedencia/conflicto/PiP |
| plannedRegions[].quality | qualified-estimate para los dos modelos pre-player, measured solo tras existir player y pasar validación; partial/unknown cuando falte algo |
| facts | fetchObserved y initialWinner solo desde las fronteras reales; terminal solo del evento y owner correctos. No usar un callback de Display para cambiar el winner inicial Video de la misma oportunidad |
| sample.adMediaBinding + facts.frame | Mismas identidades activas completas, managerLocalId/mediaLocalId realmente mapeados, role ad, provenanceVerified y clock/monotonicMs de la muestra; metadatos de presentación/decodificación mínimos QA0 |

QA0 guarda resúmenes/contadores, pero su export raw saneado no conserva todos los contextos/Q1–Q5/IDs. El sobre nuevo debe conservar packets completos acotados y recibos públicos de ingest, enlazados por packetId y opportunityId real devuelto. No recuperar claves internas del ledger ni forzar una correspondencia con su secuencia privada. Un enlace ambiguo sigue unknown. QA1-A no se modifica para interpretar este schema o aceptar otro bundle: un perfil/verificador QA1-B sería otro componente futuro revisable.

### 2.1. Selector de admisión por callsite (revisión R1)

Autoridad exhaustiva: tablas GAM y Manager del diseño 3.1, con propósito, etapa, formato, ownership y duplicados/stale por origen. Sus IDs son estables entre distribuciones, sus líneas no se trasladan entre archivos. Hay 12 invocaciones directas y 4 callers de wait en **cada** distribución; W0 se consume mediante W1–W4 y no es otra oportunidad ni otra muestra.

| Origen del diseño 3.1 | Callsite GAM / Manager | Serie y admisión a B0 vídeo | Control primario / Dc |
|---|---|---|---|
| W0 motor compartido | 11537 / 9755 | Resolver caller real, no admitir por source genérico/default o prefijo | No contar otra evaluación al exportar/resolver wait |
| W1 showDisplay:waitForViewport | 11562 / 9780 | Raw Display, incluido fallback de ciclo Video | Nunca Dc vídeo; no usar literal video de recordReadiness como formato |
| W2 buildAndPlayVideo:capacity-or-legacy | 11983 / 10184 | Nivel A condicional; pre-player sin exigir creative aún inexistente | True primario puede fijar primera positiva una vez |
| W3 buildAndPlayVideo:waitForViewport | 12031 / 10232 | Nivel A condicional; creative preparado/nuevo antes de render | Misma oportunidad que W2/W4/C1; no otra primera |
| W4 video-activation | 16698 / 14539 | Nivel A condicional; creative propietario, pre-player | Misma regla de primera positiva única |
| C1 guard final activate | 16701 / 14542 | Nivel A condicional; tras espera, antes de crear player | Primera positiva única; un false posterior no borra un true previo |
| C2 no-fill | 12289 / 10490 | Raw no-fill, etapa factual o unknown | Sin control primario, sin Dc |
| C3 recordReadiness + C5 argumento deferred | 12712,16697 / 10913,14538 | Dos recomputaciones diagnósticas diferentes; raw según caller | Ninguna es resultado del guard de control ni crea Dc |
| C4 entry.eligible | 12747 / 10948 | Raw preparación/proximidad visible/below, no activación | Entry/lease no crean C0 primario ni oportunidad |
| C6/C7/C8 recuperación | 16756,16783,16842 / 14597,14624,14683 | Raw post-player; attempt/epoch/media/manager propios | Sin Dc retrospectivo; short-circuit no ejecutado ≠ false |
| C9 revealPlayer | 17512 / 15169 | Raw reveal/reintento, post-player | No Dc; revealed/terminal/stale pueden omitir guard |
| C10 plugin-init / C11 player.ready | 18161,18341 / 15801,15971 | Raw activación posterior a creación de Video.js | No Dc pre-player ni reclasificación de etapa |

Para las cuatro fuentes primarias: identidad completa con generación nativa, formato vídeo/etapa/ownership acreditados y resultado original live son condiciones de admisión **de la muestra**. Un owner=null nativo de W2 no sustituye ni invalida el ownership Node/waterfall/intento. Un source con nombre de vídeo no acredita winner inicial Video por sí solo. Dc queda pendiente hasta conocer ese winner y nunca nace de Display. D0 procede de fronteras factuales de inicio, no de estos checks. sampleSequence identifica ejecuciones; eventId deduplica retransmisiones; documento/nav/slot/ciclo identifica oportunidad. Repetir false/true, cambiar de wait, creative o token, o transferir standby no crea otra oportunidad ni otra primera positiva. Una invalidación posterior al resultado se registra sin reescribir el hecho anterior. Si token/terminal/cortocircuito impiden ejecutar el método, guardar no ejecución cuando la frontera original permita observarla; si no existe tal evidencia, declarar gap/unknown, sin inventar false.

W1 permanece raw Display. No ingiere scope=display en oportunidad de winner inicial Video ni se disfraza como control vídeo; ambas opciones alterarían la contabilidad primaria. Solo hechos poblacionales acreditados pueden proyectarse por separado con scope=opportunity/control primario unknown, conservando el winner inicial nativo, sin otro D0 ni otro ledger. Véase diseño 3.1 y G07.

## 3. Integridad de identidad / ownership

| Frontera factual | Estado observacional que habría que registrar | Regla de obsolescencia |
|---|---|---|
| Creación de node / artículo | Documento, root/nav y objetos reales, aliases QA sin Math.random/cookies/IDs comerciales | Cambio de root/document/manager no cubierto → identidad unknown; no inferir nav=0 |
| startFetch aceptado + startIntextTelemetryCycle | Native generation, ciclo incrementado, owner y pendiente/winner | Antes del incremento no inventar ciclo. Si se pierde el comienzo, gap D0; no reconstruirlo desde éxito posterior |
| startAuction directo | Token/ciclo reales y generación nativa si existe, path explícito | Sin generación positiva acreditada no admitir como muestra completa; esa limitación bloquea tasas globales, no se oculta mediante filtros |
| STANDBY_UNBOUND | auction/entry/generation de preparación y token sin transferir | Lease/proximidad no habilitan B0 de activación ni inventan token activo. Entry.generation no sustituye _fetchGeneration |
| claim / RENDER_OWNED | Transferencia real entry.boundToken/creative._renderToken | Handoff no duplica D0. No cancelar ni rearmar lease desde QA |
| release / ACTIVATED | Vínculo retenido por QA con el intento original, aun cuando core borra entry/pendingAuction | No releer una nueva generación para callbacks del intento anterior |
| release/lease de standby | Fin del creativo/entry de preparación como subintento | No cerrar D0 ni enviar facts.terminal mientras la oportunidad/pendingAuction puedan seguir en el mismo ciclo |
| cleanup, expiry, replacement, abort/terminal | Hecho original y aliases retirados | Evento viejo conserva owner/token viejos y queda stale/terminal; nunca se rebasa al activo nuevo |

Un anchor existente pero desconectado/invalid-size puede producir C0=false verificable; identidad y elegibilidad son comprobaciones distintas. Si getIntextTelemetryElement devuelve null, no fabricar anchor desde un ID previo: conservar false factual raw y razón, marcar no admisión/coverage afectada. Así se capturan los false sin falsificar una identidad completa.

## 4. Denominadores y límites

La clave de oportunidad sigue documento/nav/slot/ciclo; tokens y generaciones son subidentidades. D0 no cuenta muestras; Dv espera winner inicial, Dc espera vídeo y primera positiva primaria observada. No se filtran por regiones completas, candidatos pass, primer frame o éxito IMA. Con toda cobertura acreditada, se describen poblaciones factuales; nunca lo que otro gate habría monetizado.

La serie primaria C0 no reconstruye primera entrada física. Primera muestra positiva → censura izquierda; un gap de fuente o intento no admitido marca el ámbito contable pertinente por separado. Terminal ausente → censura derecha/outcome desconocido; no convertir timeout o fin de colección en cero frames acreditado.

sourceComplete es inmutable por instancia QA0. El arranque inicial false no se convierte en true porque el export parezca completo. Un perfil futuro con flags true necesitaría atestaciones de cobertura preacreditadas antes del constructor y gaps irreversibles ante cualquier fallo; replay solo con historial íntegro. No mutar QA0 ni reconstruir una captura completa desde el detalle superviviente.

### 4.1. Aceptación A por muestra y B poblacional (revisión R2)

| Nivel | Evidencia requerida | Qué permite | Qué no acredita |
|---|---|---|---|
| A. Validez factual B0 | Caller primario 2.1 ejecutado, resultado original true/false, identidad/procedencia completas con generación nativa, scope video/pre-player, owner live, clock/sequence verificables | Aceptar esa muestra; candidato B0 pass con true fiable o fail con false fiable; sin exigir P/manager/medio/frame | Membresía exhaustiva D0/Dv/Dc, primera entrada física, tasas globales ni outcomes completos |
| B. Integridad poblacional | Perfil completo aprobado independientemente; fronteras inicio/winner/control/cierre de todo el ámbito, identidad de todos los episodios, deduplicación, censuras, pérdidas y gaps acreditados, condiciones de QA0 satisfechas | Solo tasas exactas expresamente autorizadas del ámbito y denominador no vacío; outcomes requieren cobertura propia | Una serie funcional soportada o el número de muestras A no demuestra completitud global |

**Primer perfil**: sourceComplete={D0:false,Dv:false,Dc:false,outcomes:false}, fijado mediante coverage=false antes del constructor QA0. Puede aprobar A con B insuficiente; no promover flags en cierre/export, no sustituir complete/rates ni reinterpretar el export congelado. Un false factual es una muestra A válida, aunque el candidato B0 sea fail. Raw stale/incompleto/no ejecutado no se completa para pasar A.

**Avance desde II**: informe por distribución/ruta que acredite funcionalmente el selector 2.1 y A, invariancia comercial, caminos soportados/no soportados, gaps/censuras explícitos —incluida ruta directa sin generación nativa— y presupuesto total medido conforme al plan 4–5. Revisión independiente y autorización expresa de siguiente etapa; B puede continuar insuficiente con tasas exactas prohibidas. Ninguna medición de esa puerta se realiza ahora. Coste inconcluso/excedido, evidencia A insuficiente o gap oculto bloquean el avance.

**Pretensión de tasas exactas**: requiere otro perfil completo aprobado independientemente antes de instanciarlo, cobertura desde antes del primer hecho hasta cierre y condiciones de export QA0 por cada tasa/ámbito. No promocionar la instancia inicial ni hacer replay desde rings parciales; no rellenar episodios sin generación nativa. Si una ruta del ámbito no puede acreditarse, la tasa global sigue bloqueada. La aprobación funcional del productor y el presupuesto medido no sustituyen ese perfil poblacional.

Memoria combinada propuesta: 256 KiB / 64 resúmenes; 16+16 KiB de agregados QA0/adaptador; 512+1248 KiB de detalle QA0/packets; total 2048 KiB. 1000 entradas por ring, suma ≤2000 entradas, contando copias de detalle sin duplicar oportunidades. Registry/strings/recibos cuentan en su partición; heap/transitorios aparte. Falta verificar constructor/coste en implementación autorizada. No hay un segundo presupuesto independiente de 2 MiB.

Evicción de raw o packets: conservar N/secuencias/etapas perdidas y resúmenes; separar posibilidad de reauditar de exactitud contable. Oportunidad 65, overflow de resumen/agregado, contador saturado o gap irrecuperable: latch de insuficiencia, no evicción de identidad ni deduplicación supuesta. Notificaciones de oportunidades no retenidas no son oportunidades únicas.

Export manual versionado, sin reset silencioso, persistencia, envío o descargas. Incluye periodo/clock/calidad y presupuestos/atribución desconocidos. Cada recibo es atestación hasta cotejo local independiente de bytes; eso tampoco se etiqueta como auditoría externa. No almacenar URLs, XML, campañas, cookies o targeting.

## 5. Suficiencia que no puede prometerse

Se puede diseñar B0 fiable con guards ya evaluados en ambas distribuciones; no necesita manager/medio. No se puede garantizar cobertura completa de caminos cuya generación/identidad no se observe, ni P cualificado bajo CSS/layout no soportados. Esos eventos permanecen en cobertura raw/unknown, sin desaparecer del denominador.

El callback RVFC actual puede ser limpiado antes de emitir; los otros hitos carecen de decoder metadata suficiente. Con las restricciones de no añadir cadencia/suscripciones, habrá outcomes desconocidos. La precisión visual final sigue dependiendo de P1.3c y evidencia específica; H-IMA no queda resuelta por un guard inicial correcto. B4/B5 y cualquier reconstrucción temporal siguen fuera de esta fase.
