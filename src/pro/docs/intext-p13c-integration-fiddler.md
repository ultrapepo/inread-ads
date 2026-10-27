# P1.3c — Próxima ejecución Fiddler, observe únicamente

P1.3c sigue abierta. No hay budgets ni enforce en este observador. No se han ejecutado nuevas pruebas Chrome/SDK después de esta revisión del probe.

## Preparación

1. Desde `src/pro`: `node tests/qa/intext-p13c-integration-build.cjs`.
2. Verificar [manifiesto](intext-p13c-integration-build.json): hashes productivos de entrada, hash del probe y cuatro SHA256 de salida. Los dos bundles productivos siguen intactos.
3. AutoResponder de Fiddler: sustituir **solo la URL exacta del bundle Intext que ya carga el artículo**, conservando el contexto de PSP/GAMExp/consentimiento de la página. Para `_gam_kv_.js`, seleccionar `tests/qa/generated/intext-integration-black-gam.qa.js`; para una página que realmente carga `IntextManager.js`, usar `…black-manager.qa.js`. No insertar ambos ni añadir un script de arranque.
4. Mantener la copia `…original-gam.qa.js`/`…original-manager.qa.js` como comparación con dummy antiguo. Para medir overhead, conservar además el control sin probe de `intext-p13c-dummy-source-build.cjs`. No sustituir GPT, Prebid, PSP, APS, IMA, videojs-ima o contrib-ads. No modificar ad tags, targeting, random ni cachés comerciales.

## Capturas

Usar el mismo artículo/campaña y anotar dispositivo, caché, scroll y visibilidad. Ejecutar primero una reproducción visible completa y mantener la pestaña visible 5 segundos después del bridge Display. Después, sesiones separadas para salida/reentrada antes de manager, antes de frame y navegación/refresh. No provocar excepciones del SDK ni forzar play/start en sesiones comerciales.

Guardar Console/Network con Preserve log, JSON del debugger, HAR con contenido y grabación de pantalla alrededor del final del anuncio. Exportar:

```js
copy(JSON.stringify(window.IntextIntegrationQA.export(), null, 2));
```

El JSON del probe exporta fuentes HTTP(S) como `{kind, sourceId, hostname, pathname}`: sin credenciales, query ni fragmento; segmentos con aspecto de token se redactan. Los identificadores son locales a esa ejecución, no hashes reversibles de URL. Data URL conserva tipo/longitud/id; blob conserva tipo/id sin UUID. Las identidades de base, tech y medio observado por IMA permanecen separadas. El HAR y la consola nativa **no** son saneados por el probe: conservarlos y compartirlos por el canal restringido de QA.

## Cobertura que debe verificarse

- `observer:attached.installationStage = after-videojs-before-ima`: el hook está dentro del método real, justo después de `initVideoJS()`, antes de que activate invoque `requestAds()/player.ima()`. Los tests ejecutan el método real instrumentado; esto no sustituye la captura del navegador.
- `observer:coverage.playerEvents` incluye `ads-manager`; `missingRequiredPlayerEvents` está vacío.
- `player:ads-manager`, `manager:identity` y `manager:subscribed` corresponden al mismo manager. Para COMPLETE, CONTENT_RESUME_REQUESTED e IMPRESSION comprobar **por separado** enum disponible, `subscriptionEstablished` y contador `observed`.
- Cada evento efectivamente recibido tiene `ima:COMPLETE`, `ima:CONTENT_RESUME_REQUESTED` o `ima:IMPRESSION`. Un enum disponible, contador cero o export temprano no demuestra ausencia del evento SDK.
- Si faltan manager, API removible, enum o suscripción, el JSON conserva cobertura ausente/fallida. No interpretar la falta de eventos como fallo de reproducción. Managers retirados conservan su historia; sus callbacks tardíos no alimentan al nuevo.

## Cleanup y excepciones

Correlacionar `core:destroy-entry`, `player:dispose`, `core:destroy-exit`, `observer:coverage` y `observer:closed`, siempre con slot/ciclo/token/player/manager. La copia QA añade un `try/catch/finally` únicamente al cuerpo de destroy de la creatividad: conserva returns y la **misma excepción original**, observa si lanzó y retira listeners incluso si el método no alcanza la eliminación del media. No reemplaza ni envuelve métodos de Video.js/SDK.

`observer:closed` informa `disposeEventObserved`, `destroyEntryObserved`, `cleanupFailures` y `sdkDestructionVerified:false`. `uncaughtException` se registra en `core:destroy-exit`. `activeObservers=0` acredita solo que el probe no mantiene instancias en su registro: **no** acredita destrucción completa de AdsManager, player o SDK, ni éxito de todas las desuscripciones. Si hay fallos de unsubscribe, quedan registrados y los callbacks cerrados se ignoran.

Tras exportar, retirar solo la observación QA:

```js
window.IntextIntegrationQA.stop();
copy(JSON.stringify(window.IntextIntegrationQA.export(), null, 2));
```

Comprobar listeners/DOM del player y actividad de red posteriores, además del contador. No concluir cleanup productivo correcto a partir de un stop manual. Si una creatividad A cierra mientras B ya ocupa el mismo nodo, B debe seguir observándose: el cierre elimina `byNode` únicamente cuando todavía pertenece a A.

## Criterio de cierre de integración

Identificar anuncio y contenido base por elemento/source/FSM/eventos nativos. Tras fin del anuncio: sin base visible, segundo reveal/animación/PiP, petición VAST o impresión inesperada; bridge único, dispose y siguiente ciclo coherentes. Mantener separados anchor, wrapper, player y medio: geometría DOM no es Active View/IMA viewability. Registrar cobertura incompleta y errores originales con su stack de consola, sin ocultarlos ni inferir causas.

Desactivar AutoResponder y recargar para retirar la copia QA. No integrar el dummy ni cambiar políticas comerciales automáticamente a partir de este ensayo.

## Repetición de tests fuera del sandbox

El test histórico de Floor Authority necesita su baseline anterior a overridePrice; HEAD actual ya contiene la corrección. En PowerShell, sin cambiar tests ni expectativas:

```powershell
cmd /d /c "git show 98106a032aa4d8b2cbc83855030973e6c4563dba:src/pro/_gam_kv_.js > tests/qa/generated/integration-review-floor-baseline.js"
$env:INTEXT_FLOOR_AUDIT_BASELINE = (Resolve-Path tests/qa/generated/integration-review-floor-baseline.js).Path
node --test --test-isolation=none tests/intext-p13c-integration.audit.test.cjs tests/intext-dummy-source.audit.test.cjs tests/intext-dummy-lab.audit.test.cjs
node --test --test-isolation=none tests/*.test.cjs
node --check _gam_kv_.js
node --check IntextManager.js
git diff --check
```

SHA256 del baseline extraído: `e26e59f2f65c9bd2517e7582b53a1d5bc0781a63204b9b2e5fcc16ad50dd8118`. Aquí se utilizó además el adaptador EPERM preexistente: reproduce solo `git rev-parse`, `git diff --name-only` y resultados de sintaxis ejecutados externamente y ligados a sus hashes. No intercepta tests ni APIs publicitarias. El fallo inicial de baseline y los resultados finales están documentados en el informe/scope; no se omite ninguna prueba.
