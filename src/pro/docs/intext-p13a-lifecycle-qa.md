# P1.3a: experimento QA de inicialización Video.js / IMA

Versión productiva conservada: `2026.10.07-p1-ima-preload-first-frame`.
Ningún cambio nuevo en `_gam_kv_.js` ni `IntextManager.js` en esta iteración.
El harness carga las clases actuales sin ejecutar el bootstrap publicitario.

## Evidencia y diagnóstico diferencial

Los cuatro JSON originales y sus HAR no están disponibles en este workspace. Esta tabla recoge los tiempos aportados por el usuario, no una extracción independiente de los ficheros.

| Captura | Resultado | Contexto |
|---|---|---|
| FIDDLER | Display ganador: no demuestra fallo de vídeo | versión nueva |
| PRODUCCION | Vídeo reproducido | versión antigua |
| FIDDLER-V2 | AdsManager sin readyforpreroll/adstart; timeout | PSP/dual; random1=8 |
| PRODUCCION-V2 | Vídeo reproducido y completado | legacy; random1=10 |

| Hito (s desde dump) | Fiddler V2 | Producción V2 |
|---|---:|---:|
| prepared | 7.737 | desconocido |
| activation | 14.135 | desconocido |
| IMA inicializado | 14.317 | 13.864 |
| ads-request | 14.477 | 14.011 |
| AdsManager | 17.468 | desconocido |
| readyforpreroll | ausente | 17.253 |
| adstart | ausente | 17.313 |
| primer frame | ausente | 17.741 |
| complete | ausente | 27.977 |
| timeout | 39.150 | no |

La revisión del HEAD `98106a0` (05oct26) confirma que `render()` hacía consecutivamente createVideoElement → initVideoJS → attachPlayerEvents → requestAds. La implementación actual traslada los tres primeros pasos a preparePlayer; requestAds sigue en activate. Es el cambio estructural candidato, no una demostración de causalidad. B conserva los fixes actuales y replica solo la proximidad entre inicializaciones; no vuelve al bundle antiguo completo.

[contrib-ads exige inicialización en el mismo tick que Video.js](https://videojs.github.io/videojs-contrib-ads/integrator/getting-started.html) y describe el flujo play/adsready → readyforpreroll. Perder loadstart por inicialización tardía es una hipótesis discriminable mediante A/B, no una causa raíz demostrada. No atribuir el bloqueo a P1.2b sin observar una pausa anterior al punto de bloqueo.

## Dos ejes independientes

El selector **fuente VAST** conserva A (sample oficial Google), B (tag GAM exacto), C-with (GAM con HB), C-without (solo quita hb_* en QA). B/C requieren confirmar inventario autorizado. No se consulta el VAST por separado: lo pide exclusivamente IMA durante activación.

El nuevo selector **lifecycle** tiene:

- A, default: Video.js en prepare; IMA en activate. Sin opt-in experimental.
- B, opt-in QA: prepare solo asegura dependencias. En activate se ejecuta preparePlayer original y después requestAds original. Una creación, una inicialización y un play; mismo tag y opciones.
- C, opt-in QA: preparePlayer original seguido de player.ima con las opciones extraídas del requestAds actual. No llama player.ads por separado. Un gate QA sobre AdsLoader.requestAds retiene las invocaciones hasta activar; también retiene el evento ads-request del plugin. Un guard prohíbe play durante prepare. En activate se reutiliza esa única inicialización, se comprueba igualdad de opciones, se inicializa AdDisplayContainer y se liberan las operaciones pendientes; el play lo sigue haciendo el código original.

**C es una intervención experimental sobre el SDK en una página aislada, no una API productiva propuesta.** Nunca cargar este módulo en una página con otros players activos: el gate es compartido por el SDK de esa página. Si no hay API interceptable o las opciones cambian, falla explícitamente. La prueba real debe verificar en HAR que antes de activar no hubo VAST, tracking ni impresión; en JSON no debe haber start/init de AdsManager, reproducción ni eventos nativos publicitarios. Si aparece alguna operación anticipada, detener C y conservar la captura: no darlo por seguro por haber pasado los mocks. No se ha podido consultar/verificar aquí el source exacto de videojs-ima 1.11.0; no se han actualizado librerías.

## Ejecución local y Fiddler

1. PowerShell en `src/pro`: `node tests/qa/intext-p13-server.cjs`.
2. Abrir `http://127.0.0.1:8133/` con DevTools Network, Preserve log y exportación HAR **con contenido**. Fiddler captura HTTPS con autorización y conserva SAZ/HAR original. No mapear estos controles al bundle productivo.
3. Si se necesita el origen Marca, usar una URL QA separada `https://www.marca.com/__intext_p13a_qa__/` en AutoResponder. Mapear exactamente esa URL al HTML, y `app.js`, `controls.cjs`, `lifecycle.cjs` bajo ese prefijo a sus ficheros locales. Mapear `source/_gam_kv_.js` y `source/IntextManager.js` bajo el mismo prefijo a las distribuciones actuales. Los paths del harness son relativos. No sustituir scripts PSP/GAMExp ni activar simultáneamente otro Intext en esta página QA.
4. Mantener dispositivo, viewport, closure, bundle, fuente, tag, consentimiento y condiciones de gesto idénticos para A/B/C. Activar inventario real solo con autorización QA; el harness no implementa el CMP del site. La página QA aislada no replica por sí sola todo el entorno PSP o la noticia: esta limitación debe acompañar los resultados.
5. Seleccionar lifecycle A y fuente A; Prepare, esperar a qa-prepared, Activate con anchor visible. Exportar JSON/HAR. Repetir B y C con opt-in. Cada ensayo en documento nuevo para evitar caché de player/plugin y contaminación del gate; conservar el mismo criterio de caché HTTP.
6. Repetir con standby solicitado 0, 7, 20 y 45 segundos. No hay autoactivación: el botón rechaza activaciones anteriores al mínimo y registra standby efectivo; después exige el gate de viewport/documento del código actual. Registrar por separado las pruebas con gesto y las de autoplay, sin mezclar conclusiones.
7. Repetir la matriz con fuente B/tag exacto de la campaña fija autorizada y las dos distribuciones. No cambiar random/tag/t para conseguir fill. El tag se conserva exactamente entre lifecycle A/B/C. C-without es otro experimento separado.
8. Detener/Destroy y cerrar el documento después de cada caso. No reintentar play, start o request para esconder el bloqueo.

## JSON, HAR y criterio discriminante

Guardar `site-device-lifecycle-source-standby-bundle.json`, su HAR con cuerpos y, si se usa Fiddler, SAZ. Además conservar los cuatro dumps originales íntegros, versión/hash del bundle y los recursos reales Video.js 7.20.3, contrib-ads 6.9.0, videojs-ima 1.11.0 e ima3.js. No compartir cookies, consent strings o URLs privadas sin sanitizar una copia.

JSON registra creación del medio y player, llamadas/retorno de IMA, loadstart capturado desde antes de crear Video.js, play, adsready, readyforpreroll, adtimeout/nopreroll/adserror, AdsManager y sus init/start/pause/resume, eventos SDK nativos, first-frame y reveal. Cada evento incluye estado contrib-ads, documentos, flags/estados multimedia y rects de anchor/wrapper/player/IMA. Las mediciones son DOM/readiness, no Active View.

Comprobar request→AdsManager→adsready→readyforpreroll→init/start→STARTED→frame→reveal. Si A falla tras standby y B funciona con el mismo VAST/creatividad, la separación temporal gana evidencia. C permite comprobar si inicialización temprana cambia el resultado, con la limitación explícita de su gate QA. Ningún mock demuestra que el SDK real perdió loadstart.

HAR debe contener la request GAM efectiva, status/body/tiempos de VAST inicial y wrappers, caché Prebid si aparece, MediaFiles, errores de red y tracking. AdsManager no significa anuncio listo. Un HTTP 200 no significa VAST válido. Misma adUnit no significa misma creatividad: comparar IDs de Ad/Creative, wrappers y selección real del SDK.

Comparación offline, sin requests adicionales:

`node tests/qa/intext-p13a-targeting.cjs PRODUCCION-V2.har FIDDLER-V2.har > comparacion-local.json`

El CLI preserva todos los parámetros y targeting salvo correlator. Emite las requests de vídeo y los cuerpos capturados. La comparación inicial automática debe revisarse: seleccionar peticiones homólogas, no mezclar slot, refresh, fallback o múltiples anuncios. El resultado puede contener datos privados; conservarlo local.

## Auditoría tag/t y autoridades

resolveIntextRuleTargeting consulta contexto, datos de página, GPT de página y **slots GPT nativos**. getPageCustomTargeting devuelve la primera fuente de página disponible; no agrega esos slots nativos. resolveVideoRequestTargeting mezcla scopedContext, getPageCustomTargeting y el slot Display Intext, que puede no existir en la primera auction; no llama resolveIntextRuleTargeting. Por eso una regla puede descubrir tag sin que la petición de vídeo lo reciba. Las regresiones ejecutan el resolver real de ambas distribuciones y demuestran esta diferencia de rutas; no demuestran todavía la fuente exacta del tag en las capturas ausentes.

Random procede de su snapshot autorizado; no se modifica. Las diferencias PSP/dual/randomSource/random1 y tag/t son factores de confusión. No se ha corregido targeting ni se ha equiparado el contexto de producción a PSP.

## Límites y siguiente revisión

No se ejecutó aquí un navegador con SDK real ni la campaña: el lanzamiento automatizado fue rechazado por policy en la auditoría previa y la descarga del SDK exacto no estuvo disponible. Las pruebas unitarias validan guards, gating, opciones y ausencia de duplicación con dobles; el operador debe realizar la matriz real anterior. No se afirma causa raíz, corrección productiva ni mejora de viewability. El timeout de 25 s, fallback, monetización y todas las autoridades siguen intactos.

## Validación ejecutada

Baseline real excluyendo el nuevo fichero: 1030/1030. Nuevas regresiones: 21/21 (lifecycle A/B/C con standby 0, 6580 y 45000 ms; token inválido; play prematuro; cleanup de request pendiente; SDK no interceptable; opciones exactas de ambas distribuciones; targeting real y comparación HAR offline).

| Grupo | Resultado |
|---|---:|
| Video/preload/PiP/animación/predictive/debug/P1.3/P1.3a | 458/458 |
| Floor Authority | 86/86 |
| Prebid audit + aliases | 85/85 |
| Random/runtime | 61/61 |
| APS/TAM | 63/63 |
| GPT/PSP | 17/17 |
| Suite completa final | 1051/1051 |

Sin omitidos, cancelados ni fallos. Ejecución Node con `--test --test-isolation=none`; para la suite y los grupos se empleó el adaptador de comprobaciones externas ya utilizado en el proyecto: `--require "$env:TEMP/intext-authority-test-command-cache.cjs"`. El sandbox rechaza spawn de Node (`EPERM`). El adaptador verifica hashes y reproduce únicamente git-root/git-diff-name y sintaxis realmente comprobados desde PowerShell; no sustituye tests, SDK ni HTTP. Baseline floor en `$env:INTEXT_FLOOR_AUDIT_BASELINE` apunta a la copia HEAD ya usada por el proyecto.

Comandos: `node --test --test-isolation=none tests/intext-p13a-lifecycle.audit.test.cjs`; suite `node --require <adaptador> --test --test-isolation=none tests/*.test.cjs`. Grupos según los ficheros actuales intext-predictive-readiness, intext-ima-preload-first-frame, intext-pip, intext-initial-open-animation, intext-debugger, intext-p13-video-blocking, intext-p13a-lifecycle; floor-authority; prebid-floor/prebid-aliases; random-runtime; aps-display-slot/prebid-aps-psp; gpt-psp/gpt-controls.

`node --check` pasó sobre ambas distribuciones, app, controles VAST, servidor, lifecycle, auditor offline y test nuevo. `git diff --check` pasó. Los hashes SHA256 de las distribuciones coinciden byte a byte con los capturados al empezar P1.3a: `_gam_kv_.js` = `4445C919CCE122BB29B65FEB8482EA64A1AD2A64FC2D85B99488333C36E51E08`; `IntextManager.js` = `0491ED2B41355460BD0849174AB2FEDD706E19375ABBFD14232A98A8A1A47766`. Los cambios productivos anteriores que ya estaban sin commit se conservan; esta iteración añade cero cambios productivos.

CodeMemory consultado antes del trabajo y reindexado al finalizar sin crear artefacto persistente en el repo: 17918 nodos, 34146 edges. El índice no devuelve los nuevos helpers CJS QA por búsqueda de símbolo; no sustituye su lectura directa, los tests ni el diff. No commit ni push.
