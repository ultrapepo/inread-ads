# P1.3c-R1 — Correcciones del probe QA

Estado: preparado para revisión y nuevas pruebas **observe/shadow**, sin aprobación productiva. No se ejecuta enforce en navegador. Las pruebas unitarias de sus guards siguen siendo simuladas. Versión Intext conservada: `2026.10.07-p1-ima-preload-first-frame`.

## Hallazgos y correcciones

1. **Dispositivo.** `manager.device` no existe en el constructor actual de ninguna distribución. El nuevo resolver QA devuelve `deviceEffective: mobile|desktop|unknown` y `deviceSource`. Precedencia: contexto scoped explícito; su targeting; ueDataLayer; utag_data; finalmente el resultado booleano de `manager.gexp.isMobileDevice()`. Reconoce device/device_category/be_page_site_version y valores GPT de un solo elemento; web se clasifica desktop. Señales contradictorias dentro de una fuente producen unknown, sin adivinar. No usa user-agent ni escribe autoridad alguna. Los tests construyen `new IntextManager({}, gexp)` desde cada fichero real, sin sustituir su constructor/prototipo ni crear device. Servicios DOM/SDK son mocks. Desktop/unknown no arman budgets móviles; una clasificación móvil debe continuar vigente para autorizar una eventual cancelación.

2. **IMPRESSION y ownership.** El enum solo alimenta `impressionTypeAvailable`. `impressionSubscribed` se establece después de llamar con éxito a addEventListener sobre un AdsManager concreto con API de retirada disponible. `managerId` es local al creative y se correlaciona con slot/cycle/token; `managerEpoch` cambia al sustituir el manager. La autorización exige identidad igual a getAdsManager(), suscripción aceptada, instrumentación instalada antes de IMA y ausencia de ambigüedad. Un reemplazo hace la cancelación fail-closed durante el resto del ciclo: no se presume cobertura continua durante el cambio. Ausencia del manager, enum, API de retirada, excepción de suscripción o identidad discordante bloquean la cancelación. Registro aceptado no demuestra entrega infalible de eventos por parte del SDK: queda por validar en Chrome/IMA real.

3. **contrib-ads.** Se capturan separadamente `snapshot.adsState`, `adsFsmState` (nombre observado o constructor) e `isInAdMode`. Accesos opcionales/throwing se protegen individualmente. Un nombre de clase es diagnóstico, no una interpretación autoritativa de la FSM. Se conserva la observación listener y microtask posterior de loadstart, play dispatch, adsready y readyforpreroll. La llamada player.play permanece diferenciada del evento play. No se modifica la FSM ni se sintetizan eventos.

4. **Reemplazos y limpieza.** Antes de instalar listeners sobre otro manager se retiran los anteriores, incluidos errores de plugin/loader asociados; callbacks ya encolados exigen identidad, epoch y token vigentes. Si el getter cambia sin ads-manager, los handlers antiguos no se aceptan y se retiran al detectar el cambio. La escucha de errores del plugin se omite con diagnóstico cuando no se puede demostrar ownership o retirada; las rutas directas de AdsManager/AdsLoader siguen disponibles. Se restauran descriptores originales de play/pause/src e init/start/pause/resume, incluso métodos heredados; destroy/dispose limpia antes de delegar al destructor original y conserva su excepción. Los wrappers preservan this, argumentos, retorno, throw síncrono e identidad de Promise; no añaden handlers a la Promise de play.

5. **Budgets visibles.** Los eventos `qa_budget_armed`, `qa_budget_not_armed`, `qa_budget_expired` y `qa_budget_cancel_blocked` exponen deviceEffective/deviceSource, mode, qaConfirmed, budgetArmed, deadlineAt, expiration y cancelBlockedReason, según la etapa. Expiration es performance.now(), con deadline en el mismo reloj del documento. El vencimiento añade todas las `cancelConditions`, señales started/impression y drift. `budgetArmed` en el vencimiento indica que ese deadline estuvo armado, aunque su callback ya se haya retirado del Map. Shadow arma y registra, pero siempre bloquea cancelación con mode-shadow. Observe no arma. El inicio continúa siendo ads-request proxy, no el instante HTTP.

Ejemplo **probado con reloj simulado y constructor real**, no captura Chrome: ueDataLayer.device_category=mobile, mode=shadow, qaConfirmed=false, ads-request en 0 ms → armado con deadlineAt=10000 → expiración=10000, cancelBlockedReason=mode-shadow; el creative sigue vivo. Con callback a 10321 ms, timerDriftMs=321. Los tests también conservan first-frame posterior al vencimiento shadow.

## Alcance y evidencia conservada

Solo cambian el probe QA, su test existente y la documentación R1. El builder y su configuración no cambian; las dos copias ignoradas generated se regeneran desde las mismas fuentes productivas.

SHA256 productivos, iguales al inicio de R1/P1.3b:

| Fichero | SHA256 |
|---|---|
| _gam_kv_.js | 1CDE1CCDC962C07D5833DC9691A3BFE31B7DD74B3E649E89153A240940A06690 |
| IntextManager.js | BA832DC0EB3C0F6E1070A515FAC09DD31467E2C7A5A64A18FF4E4F4C063FEAD8 |

Por identidad byte a byte no hay cambios nuevos de timeout 25 s, GAMExp, WindowArray, floors, targeting, PSP, Prebid/APS, random, first-frame/reveal, PiP, animación, Display/fallback ni waterfall. El diff contra HEAD contiene trabajo previo sin commit; el diff R1 se calcula contra copias tomadas al iniciar esta revisión.

Las siete capturas originales se vuelven a procesar: el resultado es byte a byte igual a `intext-p13c-real-evidence.json`. El informe Prebid/PSP coincide con el incluido en el parche histórico (SHA256 1C90AD00682D8C282E8C80E2E00FA8BCB589E54ADC2D882C6CF8AF8EAD6E222E). No se cambia ninguna cronología ni se cierra la causa residual 10:29. El parche original P1.3c se conserva como histórico; aplicar el diff incremental R1 o usar directamente el workspace actual.

## Validación automatizada

Baseline real de entrada: **1119/1119**. Test existente ampliado de 38 a **93**, con **55 regresiones nuevas**. Cobertura nueva: dispositivos con manager real, unknown/conflicto, suscripción efectiva/fallida, enum sin manager, identidad discordante, reemplazo, callbacks viejos STARTED/IMPRESSION/error/plugin/loader, FSM ausente, listener/microtask, restauración y errores de APIs/destructor. Los tests previos de settle/fallback usan métodos actuales del core y SDK simulado.

| Grupo | Resultado |
|---|---:|
| P1.3c específico | 93/93 |
| Vídeo/preload/PiP/animación/predictive/debug | 581/581 |
| Floor Authority | 86/86 |
| Prebid audit + aliases | 85/85 |
| Random/runtime | 61/61 |
| APS/TAM | 63/63 |
| GPT/PSP | 17/17 |
| Suite completa | 1174/1174 |

Ningún test omitido, cancelado o fallido en la validación final. Los grupos se solapan con la suite completa; no sumarlos para obtener el total. Stdout completo: `intext-p13c-r1-validation.txt`.

Comandos base:

```powershell
node --test --test-isolation=none tests/intext-p13c-latency.audit.test.cjs
$env:INTEXT_FLOOR_AUDIT_BASELINE = Join-Path $env:TEMP 'intext-authority-head.js'
$adapter = Join-Path $env:TEMP 'intext-authority-test-command-cache.cjs'
node --require $adapter --test --test-isolation=none tests/*.test.cjs
node --check _gam_kv_.js
node --check IntextManager.js
node --check tests/qa/intext-p13c-probe.cjs
node --check tests/intext-p13c-latency.audit.test.cjs
git diff --check
```

Se utiliza el adaptador externo ya establecido porque el sandbox bloquea subprocesses iniciados por Node. Reproduce solo git-root/git-diff-name y node --check previamente ejecutados externamente; verifica hashes de fuentes. No sustituye tests, SDK ni navegador. No se solicita elevar permisos. No hay manifest/package.json ni configuración de lint/seguridad independiente en este workspace; se ejecutan sintaxis y todos los audits disponibles.

## Próximas pruebas Fiddler: solo observe y shadow

Primero control con **P1.3b sin probe**, después observe y finalmente shadow, manteniendo la campaña, noticia, dispositivo, PSP/random/targeting y red reales. Los wrappers de instancia **no son estrictamente pasivos**: cambian identidad de funciones y agregan lectura de estado, snapshots y stacks. Aunque delegan exactamente una vez, su coste o interacción con otros hooks pueden afectar el resultado. `observerBuildMs` mide construcción de snapshot, no todo el coste del probe. Comparar counts/orden de APIs y HTTP, latencias y errores entre control e instrumentado; no atribuir diferencias a IMA sin esta comparación.

```powershell
# Observe: cero budgets; guardar copia antes de generar el siguiente brazo.
node tests/qa/intext-p13c-build.cjs _gam_kv_.js
node tests/qa/intext-p13c-build.cjs IntextManager.js
# Shadow mobile 10 s, qaConfirmed=false; nunca cancela.
node tests/qa/intext-p13c-build.cjs _gam_kv_.js tests/qa/intext-p13c-config.example.json
node tests/qa/intext-p13c-build.cjs IntextManager.js tests/qa/intext-p13c-config.example.json
node --check tests/qa/generated/intext-p13c-gam.qa.js
node --check tests/qa/generated/intext-p13c-manager.qa.js
```

AutoResponder debe sustituir solo el bundle efectivamente cargado por la copia correspondiente, una distribución por página. No interceptar GPT/Prebid/APS/PSP, tags VAST ni MP4. No se ejecuta enforce ni se modifica qaConfirmed en esta revisión. Las copias entregadas generated usan shadow del ejemplo.

En cada móvil shadow exigir `qa_probe_attached.deviceEffective=mobile`, fuente observable real, `qa_budget_armed.deadlineAt`, y, si no hubo frame/terminal antes del plazo, `qa_budget_expired` con mode-shadow y bloqueo explícito. Unknown/no-arm no es una prueba shadow móvil válida: guardar la fuente y corregir el contexto de QA antes de comparar. Un vídeo que obtiene frame antes del deadline desarma normalmente; no debe forzarse un vencimiento fabricando bloqueos. En una reproducción real suficientemente lenta comprobar continuidad después de expirar, sin abort/destrucción, peticiones adicionales o fallback provocado por el probe.

Guardar JSON original del debugger, JSON del probe (`copy(JSON.stringify({stats:IntextP13C.stats(),logs:IntextP13C.entries},null,2))`), consola completa con stacks y HAR/SAZ con cuerpos XML VAST/wrappers y MP4. Cubrir el bloqueo manager-sin-preroll, éxito rápido/lento, cambios de manager, salida/reentrada, hidden/visible, refresh, navegación y destroy. Los errores cross-origin opacos pueden requerir DevTools Pause on exceptions. Al terminar guardar datos y llamar IntextP13C.dispose().

## Límites y pendientes

No se ha realizado una nueva prueba Chrome/IMA con R1: este entorno no ofrece navegador conectado. Por tanto, el armado/vencimiento shadow está demostrado con el **manager real y reloj/SDK simulados**, pero sigue pendiente de confirmación en mobile real. No se afirma reproducción equivalente, mejora de viewability ni ausencia real de tracking tardío. El bloqueo 10:29, errores 1005 y suppressedTracks continúan abiertos. No hay autorización productiva, commit, push ni avance de roadmap.

CodeMemory se consulta y reindexa sin persistir artefactos en el repo; el código actual, las pruebas, hashes y diff son la fuente de verdad. El grafo se verifica después de la reindexación para los helpers QA nuevos.
