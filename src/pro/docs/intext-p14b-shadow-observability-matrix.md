# P1.4-B — Campos observables y límites del cálculo offline

Revisión documental **r2, 27/10/2026**. Anexo del [diseño B y tabla de cambios R1–R6](intext-p14b-shadow-design.md) y del [contrato QA corregido](intext-p14b-shadow-qa-contract.md), para segunda revisión independiente. **No es captura, test ejecutable ni export de shadow instalado.** Etapa inicial propuesta B0–B3 por snapshot; B4/B5 diferidos/unknown. A2 recopilación cerrada; A3 bloqueada, B/C inactivos y P1.3c visual abierta.

## 1. Clasificación de evidencia

- **O, observado:** valor del evento/snapshot, con fuente e identidad verificables.
- **D, derivado:** función matemática de valores observados simultáneos, con modelo/versión declarados.
- **P, parcial/estimado:** falta sincronía, cobertura, modelo de layout o alguna dimensión; conservar hipótesis y no convertir a O.
- **U, desconocido:** no capturado/no identificable. Ausencia no se codifica como cero o false.
- **NA:** fuera de ámbito, por ejemplo candidato de activación vídeo en ciclo display_only.

Los números de un evento no heredan automáticamente viewport/scroll/identidad de un vecino: si se correlacionan fuentes se guarda su diferencia temporal y calidad. Los clocks HAR/trace son correlaciones aproximadas; las fórmulas dentro de página usan reloj monotónico/sequence de su propio documento.

### Corrección B0 y etapas

| Datos del snapshot, tras verificar ámbito e identidad | B0 | B1–B3 | B4/B5 en etapa inicial |
|---|---|---|---|
| C0 factual=true, P unknown | **pass**, sin acceder a P | unknown por modelo insuficiente | unknown/temporal-stage-deferred |
| C0 factual=true, P qualified-estimate y viewport/contexto admisibles | pass | Calculables en serie **estimada**, no measured | unknown/deferred, aunque haya pareja ocasional |
| C0 factual=false, P unknown | fail por control | fail por control, sin exigir P | unknown/deferred |
| C0 no observado/fiable | unknown | unknown | unknown/deferred |
| Fuera de ámbito o identidad conocida stale/terminal | not-applicable | not-applicable | not-applicable |
| Ámbito/identidad no verificables o conflicto de fuente | unknown | unknown | unknown |

B0 no añade un segundo gate de documento/viewport ni depende de geometría o movimiento; un conflicto de origen acreditado invalida la muestra completa. Solo B1–B5 necesitan el modelo P para sus fórmulas; B4/B5 no se calculan en la etapa inicial. Los callbacks disponibles no garantizan cadencia y no se añaden listeners, observers, polling, timers o capturas para obtenerla.

## 2. Matriz de campos

| Campo o resultado | Fuente existente / autoridad | Cobertura actual | Contrato eventual y límite |
|---|---|---|---|
| Distribución y hash core/bundle | Archivos/manifiestos A1 y body HAR | O en las capturas verificadas; no deducirlo de PSP | Registrar hash de código/CSS y modelo; E0 QA incluye coordinador, histórico P1.3c no |
| PSP/Legacy y brazo | runtime debugger y QA arm/assignment_fixed | O: dualMode, pspDetected, randomSource; hashes por grupo | Separar contexto, fecha/SDK y brazo; no cambiar autoridades para obtener una cohorte |
| doc/nav/slot/cycle/token | Probe, métricas y eventos QA | O donde se exportan; pre-render token puede ser 0 | No unir por slot solo; relacionar fetch generation y el handoff únicamente si están observados |
| Reloj y secuencia | timestamp/monotonicMs/sequence del QA | O en logs QA; trace/HAR tienen otros clocks | Guardar sourceClock; no ordenar ambiguamente eventos de procesos distintos por 1 ms |
| Anchor tipo/rect/CSS | `getIntextTelemetryElement`, readinessAnchorRect; core C0 | O en snapshots/recordReadiness concretos; tipo no siempre en export | Congelar anchorId/tipo. Cambio de elemento rompe continuidad; no asumir que siempre es paragraph |
| Control eligible/reason | snapshot.readiness; métricas readiness | O en muestras; falta serie completa de todos los checks | Guardar el resultado factual de C0, sin nueva llamada a métodos que puedan producir logs/efectos |
| B0 factual | C0 observado, ámbito e identidad válidos | O/derivación directa de true/false; sin requisito P | rectModelId=null; P/viewport adicional unknown no degrada C0=true→pass. C0 desconocido no se reconstruye con P |
| Viewport layout width/height | Métricas debugger incluyen viewportHeight; snapshots de integración no incluyen siempre width/height | Altura O en métricas concretas; width/sincronía puede ser P/U | Contrato añade ambos **en la misma muestra**; visualViewport aparte, no reemplaza C0 |
| Wrapper W | snapshot.videoSurface | O: rect, connected, display, visibility, opacity, hasBox | Closed height=0 es un dato válido; área W=0 no sirve como gate de activación |
| Player existente | snapshot.playerSurface y rect media | O después de construir Video.js | Medido post-player; no representa una medición pre-player ni posición final abierta |
| P intención pre-player | Código createVideoElement, ancho/origen del wrapper, CSS | P; no hay modelo P completo exportado en frontera antes de createPlayer | Solo qualified-estimate si cumple Q1–Q5 del diseño: identidad/etapa, caja/viewport simultáneos, fuentes efectivas versionadas, alcance CSS resuelto y procedencia. Literal 350px solo no basta; partial/unknown deja B1–B3 unknown |
| Envolvente open/lock/chrome | `IntextContainer.open`, lockedHeight, targetHeight, wrapperChromeHeight | Operandos estáticos O en código; valores efectivos no siempre exportados | Réplica aritmética pura; no invocar open ni alterar DOM. Ratio de slot distinto al de media |
| Layout final abierto/oclusiones | CSS is-open, animación y filmstrip | P/U para geometría final hipotética; filmstrip parcial para factual | No sumar offset 170 ni 31 px como verdad general; ancestros clipping/overlays limitan perceptibilidad |
| Intersection A/P/W | A readiness O; P por rect cuando dimensiones están completas | D en la muestra; área requiere Vw y Vh sincronizados | Modelos/denominadores separados. Si solo se conoce Vh, calcular yFraction y dejar areaFraction parcial |
| scrollY | Métrica debugger | O a sus eventos, no serie de scroll continua; probe integración no lo exporta por snapshot | Dos muestras no prueban dirección instantánea ni ausencia de inversión; no interpolar |
| Movimiento/velocidad neta | Pares de scrollY/monotonic time compatibles | P/U; callbacks sin cadencia garantizada | B4/B5 unknown/deferred en etapa inicial, aun con pareja ocasional; extensión temporal/cobertura requiere revisión separada, sin nuevas suscripciones |
| Primera elegibilidad de control | Wait resolved/activation_eligible + muestras readiness | P para primer cruce físico; O para primera positiva registrada por un guard específico | Distinguir firstObserved y entrada real left-censored; no confundir fin de wait con primer contacto absoluto |
| Primera pasada/salida/reentrada | Recovery/missed viewport y snapshots | P, salvo episodios con entrada/salida/identidad suficientes; invisible entre snapshots | Registrar `continuity-unknown`; ocultación del documento no es salida geométrica |
| Prepared/pendingAuction/TTL | Métricas de carga y código startRender | Carga O; edad/config y lease parcial; TTL efectivo de cada bid/cache U si no figura | No equiparar maxFetchToRender, standby lease y bid TTL. Post-release pendingAuction es null, no edad 0 |
| Frontera pre-player | Orden en `activate` antes de release/create | O estático, sin snapshot geométrico completo allí en el nuevo E0 | Futuro `boundary-pre-player` sería observación nueva, requiere aprobación; hoy U para P exacto allí |
| ads-request / VAST / manager | Probe, HAR completo, debugger | O por intento; ads-request posterior a retorno SDK no acredita envío HTTP | Correlacionar recurso/manager; no trasladar latencia a otro timing candidato |
| First frame publicitario | core:first-frame con medio y source | O cuando probe identifica ad media/rVFC; base canplay no sirve | Separar mecanismo/suficiencia y perceptibilidad; ausencia con coverage incompleta U |
| Native STARTED/IMPRESSION | Probe con manager y coverage | O si suscrito y observado; summary histórico puede tener mapping incompleto | Hito nativo, no Active View. No usar manager/adsready como sustituto |
| Reveal solicitado / apertura | core:revealed, W/clases, open ya existente | O de solicitud/snapshot, P de apertura terminada sin filmstrip | No equiparar dos rAF con píxeles visibles ni exigir W abierto antes del frame |
| Perceptibilidad factual | Screenshot/grabación identificable | Parcial en nuevo trace: inicio sí, COMPLETE no | Anotar frame/rango de reloj y medio; no reconstruir píxel exacto desde evento DOM |
| Sin frame/censura | Terminal, fin export, dropped, cobertura | Clasificable por cada intento; no todo «sin evento» es fallo | Estado terminal vs right/left-censor vs cobertura perdida; conservar Dv completo |
| D0/Dv/Dc y membresías | Futuros contadores por ciclo, winner inicial y C0 factual, **antes de candidatos** | No existe contabilidad B instalada; los exports actuales tienen su cobertura histórica | Independientes de P, candidato y ring; membresía yes/no/unknown. No deducir oportunidad de cada snapshot ni Dc de B0 sin winner vídeo verificado |
| Resumen de oportunidad | Clave/idempotencia, hitos, censura, calidad y pérdidas compactas | Contrato propuesto, no export disponible | Retener hasta 64 identidades incluso terminales; no eviction por snapshot. Saturación/falta de fuente invalida contabilidad afectada |
| Ring y pérdidas raw | Snapshots con referencia al resumen | Propuesta de retención, sin instrumentación B | Evicción solo de detalle, conserva contadores/resúmenes y registra N/secuencias/etapas perdidas; no reduce denominadores |
| Integridad contable y tasa exacta | accountingComplete por D0/Dv/Dc, unknown-membership, sourceGap/summaryOverflow y cobertura de numerador | Unknown hasta existir datos suficientes y observador aprobado | Si no se recupera población/numerador completos: coverage-insufficient, exactRatesAllowed=false; nunca tasa exacta de captura completa con población parcial |
| PiP / animación | Estado/logs core y geometría | P si no está en snapshot; no deducir PiP solo de coordenadas | Etiquetar fase y excluir geometry floating del éxito de inserción inicial |
| Display descendiente | Ciclos/flags y fill/open/viewable factuales | O en ciclos documentados; slot2/ciclo2 viewable no observado al exportar | COMPLETE→refresh y timeout/error→fallback separados; no outcome candidato |
| Coste del observador B | No existe implementación | **U, sin medición actual** | Contrato §5.4: lectura/layout, evaluación, contabilidad, ring, setup/cleanup y export; total con coste de medir, sin doble suma de layout anidado. CPU/GC no atribuibles siguen unknown; no reutilizar observerBuildMs como coste B |
| Fill/creatividad/ingresos/viewability bajo B | Gate B no ejecutado | **U por construcción** | Prohibido imputar el resultado factual a otra hora/request; no estimación comercial contrafactual |

## 3. Cálculos puntuales existentes: Legacy-E0-2

Fuente saneada [Performance A2](intext-p14a2-legacy-performance-evidence.json); la [matriz A2](intext-p14a2-evidence-matrix.md) conserva hashes/limitaciones. Altura viewport de la sesión: 922 px; P medido height=350 y mismo intervalo horizontal que A. Se calcula aquí **fracción vertical de P**, sin introducir una anchura de viewport no exportada en ese snapshot. Coincidiría con la fracción de área si toda la anchura estuviera cubierta; esa condición se conserva aparte al evaluar B2.

| Snapshot factual, UTC | Ratio A observado | P.top / P.bottom | yFraction P derivada | W real | Comparación puntual, sin simular activación |
|---|---:|---|---:|---|---|
| observer:attached 17:17:15.385 | 0,0022497559 = **0,225%** | 1091,6625 / 1441,6625 | **0** | h=0, opacity=0 | C0/B0 true/pass. Diagnóstico yP=0; B1–B3 fail solo con P/viewport admisibles completos; si son parciales, unknown |
| ads-request 17:17:15.534 | 0,0342500814 = 3,425% | 1086,8625 / 1436,8625 | **0** | h=0, opacity=0 | B0 pass; P parcial no lo degrada. La request ya ocurrió; no resultado de otro gate |
| ads-manager 17:17:17.326 | 1 | 759,6625 / 1109,6625 | **0,4638213 = 46,382%** | h=0, opacity=0 | fy=25% sí, fy=50% no; área 25/50 depende además de X y modelo |
| first-frame 17:17:18.896 | 1 | 476,4625 / 826,4625 | **1** | h=0, opacity=0 | Condición vertical 25/50/75 satisfecha en camino factual; no es P preactivación |
| IMPRESSION 17:17:19.010 | 1 | 470,8625 / 820,8625 | **1** | h=0, opacity=0 | Impresión nativa con W todavía cerrado según snapshot, sin Active View demostrada |
| STARTED 17:17:19.019 | 1 | 470,8625 / 820,8625 | **1** | h=0, opacity=0 | Playback nativo distinto de perceptibilidad |

Estos ratios corresponden al player observado en su etapa `player-measured-current-flow`, **no** a envolvente abierta ni modelo pre-player. El rect medido puede coexistir con una **derivación parcial** por faltar viewport sincronizado: en ese caso no se emite pass geométrico completo B1–B3. No sumar padding/margen de apertura, ni llamar measured a un P pre-player estimado. B0 sigue resolviendo únicamente C0 factual e identidad/ámbito.

La proporción 0,225% se explica por apenas **0,3375 px verticales de A** frente a 150 px de alto. `distancePx=0` es redondeo. La diferencia top P−top A≈170 px describe esa muestra; no es una constante del layout general.

**Lo que no se calcula de esta tabla:** primer instante de P>0/25%/50%, dwell continuo, velocidad admisible B4, cumplimiento B5 o hora de otro request. B4/B5 quedan unknown/deferred en etapa inicial, no son una condición de aceptación de B0–B3 ni un motivo para ampliar captura. Entre snapshots puede haber pasos no capturados; incluso dos positivas no demuestran continuidad. Attach no sustituye frontera pre-player.

## 4. Lecturas de las otras evidencias, sin nuevas capturas

| Caso existente | Hecho útil para B | Qué sigue desconocido |
|---|---|---|
| PSP-E0-1 26/10, 12,210 s pre-VAST | Demuestra demora después del request con E0; gate inicial correcto no asegura visibilidad al responder | Trayectoria completa, aporte causal de proxy/SDK y resultado de un request B a otra hora |
| Legacy E1 A2-E1-3 22/10, 21,232 s pre-VAST | Riesgo de salir durante resolución, SDK/contexto distinto | No deducir salida/reentrada por duración sola; no comparte identidad con E1-3 PSP |
| E1-3 PSP original 22/10 | Evidencia archivada: anchor passed al frame, reveal retenido ~4821 ms hasta reentrada | Bytes originales no disponibles en Descargas; no nueva revalidación de trayectoria ni conclusión causal B |
| Mobile shadow2 histórico 19/10 sin PSP | Anchor muy marginal y superficie prevista más abajo; IMPRESSION con anchor fuera y reveal posterior | Shadow histórico es otra instrumentación/fase, no B ejecutado ni control E0 A1; sin HAR para atribución de latencia |
| Legacy-E0-1 25/10 | Manager→preroll 5 ms, manager→frame 4339 ms y cadena GVT | Sin trace de ese intento; no atribuir todo a decoder ni extrapolar desde Performance del 26/10 |
| Legacy-E0-2 26/10 | VAST 255 ms, costes bridge/V8/GC y medio observados; primer frame/reveal/COMPLETE | Sin NetLog/SAZ/XML ni Screenshot tras COMPLETE; H-IMA/H-QA y visual final abiertas |

No se agregan PSP y Legacy, fechas/SDK o formatos como si fueran comparables. Los episodios diagnósticos concretos no constituyen una distribución de tráfico ni una calibración estadística de umbrales.

## 5. Resultados permitidos y prohibidos

| Resultado offline | Estado de cálculo | Forma de reportarlo |
|---|---|---|
| Discordancia C0/P en un snapshot identificable | D/P según rect/modelo/viewport | Count por evento y etapa, con denominador de **muestras**, aparte de oportunidades |
| Primera positiva registrada de candidato | Parcial, solo sobre muestras factual | Timestamp + bracket/cobertura; nunca crossing interpolado ni activación simulada |
| B1–B3 positivos en frontera antes de crear player | U en el nuevo E0 para P completo | No reemplazarlo por attach tardío; la falta de P no vuelve unknown un B0 sustentado en C0 factual |
| Proporción de oportunidades sin coincidencia candidata en muestras | Solo si contabilidad Dv, membresías y numerador son completos para el ámbito solicitado | «No match observado», no pérdidas comerciales; si falla integridad, conteos parciales y tasa exacta prohibida |
| D0/Dv/Dc tras evictar snapshots | Recuento conservable por resumen/contadores íntegros | Identificar rawEvidenceEvicted, censura y auditoría parcial del detalle; no restar oportunidades |
| Tasa de captura completa con resumen overflow/gap de origen o membresía/numerador desconocido | No calculable exactamente | coverage-insufficient; exactRatesAllowed=false. No usar snapshots retenidos como denominador |
| Eventos reales dentro/fuera de pasada | Parcial o D si entrada/salida/identidad bastan | Clasificable/unknown/censurado, no forzar todos los casos a binario |
| Área-tiempo, dwell continuo o trayectoria de scroll | U con snapshots aislados | No calcular trapezoides, hold-last-value ni curvas interpoladas |
| Frame/IMPRESSION B = instante candidato + latencia IMA real | Inválido | Prohibido: latencia/creatividad/layout pueden cambiar al variar request |
| Revenue, fill y Active View de B | U | No producir cifras ni promesas contrafactuales |
| Ausencia de Screenshot final = ausencia de flash negro | Inválido | P1.3c visual sigue abierta |

## 6. Contabilidad y coste: comprobaciones documentales r2

| Situación | Qué permanece | Qué no puede afirmarse |
|---|---|---|
| Ring lleno, resumen/contadores actualizados antes de eviction | Poblaciones y hechos resumidos; pérdidas raw y censura conservadas | Trayectoria continua o acceso a todos los snapshots originales |
| 65.ª oportunidad o límite de memoria de resúmenes | Las primeras identidades retenidas, conteos conocidos y flag irreversible de overflow | Denominador completo del documento; notificaciones nuevas no son N oportunidades únicas |
| D0 completo pero winner inicial pendiente/desconocido | D0 y membresía Dv unknown | Dv exacto o excluir oportunidades porque P sea unknown |
| Dv completo pero faltan C0 o primera pasada | Dv, Dc parcial y/o numerador censurado según fuente | Tasa exacta de primera oportunidad sobre toda la captura |
| Coste solo de evaluación disponible | Ese componente medido, si se obtiene tras autorización | Coste total, presupuesto PASS, CPU pura o layout «gratis» |

El contrato §5 especifica límites independientes (64 resúmenes, agregados y ring dentro de 2 MiB lógicos) y regla de no evictar contabilidad para retener muestras. §5.4 define tramos de wall-time, perfil/layout/CPU con atribución, export y coste de medir; **todo resultado de coste actual es unknown**. Sus fixtures son filas propuestas de revisión, sin código ni ejecución.

Esta revisión termina para **segunda revisión independiente**. No aprueba implementación QA ni nuevas capturas; mantiene las diferencias de ambas distribuciones y las restricciones comerciales.
