# P1.4-A — Experimento QA E0/E1 de dependencias compartidas

Estado: copias QA para revisión y ensayo Chrome, sin despliegue. Versión productiva conservada: `2026.10.07-p1-ima-preload-first-frame`. P1.3c mantiene su gate visual independiente. Enforce, gate B y alternativa C deshabilitados; E0/E1 no son los lifecycles A/B/C de P1.3a.

**Estado A2 al 26/10 tras Performance:** dos E0 Legacy auténticos recibidos; recopilación descriptiva cumplida y causalidad histórica abierta. La [guía A2 vigente](intext-p14a2-fiddler.md) sustituye las propuestas de repetición para esta investigación: no generar bundles/probes ni ampliar capturas automáticamente. A3 continúa bloqueada; B/C/enforce inactivos y P1.3c visual abierta.

**Comparadores y métrica:** E0 de este documento usa **coordinador QA secuencial y probe compartido**; no equivale al histórico P1.3c sin coordinador A1. Un control histórico exige identificar fuente/hash/instrumentación/dummy por separado. `residualDependenciesWaitMs` mide el await de prepare en activate: su valor 0–1 ms tiene efecto suelo cuando prepare ya terminó. No aprobar A3 solo por ese residual ni por un objetivo del 20% sobre él; exigir métricas de primera oportunidad/primera pasada, sin frame, abandonos/censura y seguridad UX, según el [roadmap corregido](intext-p14-mobile-latency-viewability-design.md). Las instrucciones de build y matriz siguientes describen A1 y diseños futuros, no acciones autorizadas en esta revisión documental.

## Base y alcance

El [diseño P1.4 actualizado](intext-p14-mobile-latency-viewability-design.md) incorpora separadamente la captura real de Marca mobile del **21/10**: prewarm 3139 ms, espera residual de dependencias 2589 ms y activación→frame 3454 ms. El revisor confirma eventos nativos IMA, COMPLETE, restauración del dummy y destroy posterior. No es un resultado E0/E1 ni una muestra estadística junto al 20/10. El cierre visual del contenido base continúa pendiente.

El builder parte exclusivamente de los dos SHA256 P1.3b protegidos, compone el reemplazo source-only del dummy negro ya existente y el **mismo** probe de integración. Ningún archivo comercial ni artefacto anterior P1.3c se sobrescribe. El fixture negro es idéntico en ambos brazos: 7141 bytes, 25 fotogramas/25 fps; SHA256 `410e77398580e6b470c0f5c2297d32484cbb29b9765133f7703038fc24ed753d`.

| Archivo productivo, sin cambios | SHA256 |
|---|---|
| `_gam_kv_.js` | `1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690` |
| `IntextManager.js` | `ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8` |

## Diferencia única del experimento

```text
Ambos: winner vídeo → pendingAuction guardada → prewarm no bloqueante
E0: Video.js → contrib-ads → IMA SDK → videojs-ima
E1: ┌ Video.js → contrib-ads ┐
    └ IMA SDK ───────────────┴→ barrera con APIs verificadas → videojs-ima
Ambos: render espera la misma carga → elegibilidad vigente → Video.js + IMA
       consecutivos en activate → request/play actuales → frame → reveal
```

`tests/qa/intext-p14a-dependencies.cjs` implementa la coordinación QA. Las cuatro URLs/versiones, CSS y callbacks de disponibilidad son los actuales. `loadDependencyScript`, canonicalización por `document.baseURI`, elementos/promise compartidos y timeout de **10000 ms por script** quedan intactos. Se comprueba disponibilidad tanto en el loader como en la barrera, y la disponibilidad conjunta después del plugin.

El builder reemplaza solo el cuerpo de `loadDependencies` por una delegación al coordinador y añade dos hooks de diagnóstico protegidos, más dos marcas alrededor del `await this.prepare()` existente en activate. Estas marcas no añaden awaits ni cambian su orden. El probe de integración se incorpora sin modificar sus bytes; instala sus listeners post-Video.js/pre-IMA como antes. No se inicializa `player.ads()` por separado. No se crean player, video, AdsLoader, AdsRequest o AdsManager durante prewarm. No se alteran init/play/start, opciones IMA, autoplay, timeout de 25 s, opciones de 30 s, gates viewport/frame/reveal, recovery, PiP, animación, fallback o refresh.

El estado es compartido por documento y por las clases que usen la misma ventana. Cada posición conserva su ownership/cycle/token actuales. Preparaciones obsoletas pueden terminar de cargar infraestructura compartida, pero el core vuelve a validar el token antes de construir/activar. Display no inicia este proceso.

### Fallos y retry

El primer fallo rechaza al consumidor inmediatamente y deja que el core limpie `_dependenciesPromise`. No se esperan los 10 s de otra rama para informar ese fallo. Los scripts ya iniciados continúan **solo como infraestructura**, observados hasta resolve/reject con el límite original; no se cancelan SDK ni anuncios. El intento fallido no puede iniciar contrib-ads o videojs-ima posteriormente. `dependencies_drained` permite comprobar cuándo se liquidaron esas ramas.

Un retry explícito del lifecycle reutiliza los scripts aún cargándose mediante el loader existente, elimina/reemplaza los fallidos y vuelve a verificar APIs. La finalización tardía del intento viejo no borra el ownership del nuevo. No hay retry automático, bucle, polling ni nueva request publicitaria. Por diseño puede haber un intento rechazado y otro vigente con referencias al mismo script pendiente; eso no equivale a dos cargas efectivas.

### Asignación externa inmutable

Elegir el archivo **E0 o E1 en Fiddler antes de crear el documento**. No se utiliza cookie, targeting, random1–4, localStorage ni selección por slot. Todos los slots/ciclos del documento pertenecen al mismo brazo. `window.IntextP14A` es una propiedad no reconfigurable/no escribible y su API está congelada. La primera instalación fija el brazo hasta una navegación completa; refresh publicitario, SPA/PNC y segunda distribución reutilizan esa asignación.

Si una reinyección pide otro brazo, se registra `assignment_conflict` y se conserva el primero. Esa captura se marca contaminada y se repite con navegación completa; no se cambia el brazo a mitad de anuncio. Un namespace ajeno ya ocupado hace fallar el artefacto QA explícitamente; retirar sustitución y recargar, sin tocar el entorno comercial.

## Telemetría y límites

`window.IntextP14A.export()` devuelve brazo, secuencia, reloj de documento, intentos pendientes, logs y exportación del probe de integración. Recursos y ramas se identifican con nombres locales, sin URLs de solicitudes publicitarias.

| Marcas QA | Qué miden |
|---|---|
| `assignment_fixed/reused/conflict` | Asignación efectiva y mezcla accidental |
| `dependencies_started/shared/ready/failed/drained` | Carga común, consumidor y drenaje real de ramas |
| `resource_started/ready/failed` | Disponibilidad inicial, elemento/promise existente, duración elapsed y error saneado |
| `branch_started/ready/failed` | Cadena Video.js/contrib y SDK IMA |
| `barrier_wait_started`, `barrier_ready`, `barrier_or_load_failed` | Ventana de carga hasta APIs listas o fallo; no confundirla con una espera añadida a la red |
| `video_dependency_prewarm_*`, `video_dependencies_wait_started/ready` | Hitos actuales; espera residual de prepare/render, slot/ciclo/token |
| `activation_dependencies_wait_started/ready` | Espera residual real de activate sobre prepare (`residualDependenciesWaitMs`), antes de la espera de viewport; también registra cero cuando prepare ya terminó |
| `core:*` y exportación `integration` | Player preparado/activación, request IMA proxy, AdsManager y cobertura nativa, frame/reveal, COMPLETE/restore y cleanup ya instrumentados |

El intervalo de barrera empieza antes de las ramas: incluye su trabajo y **no se suma** a sus duraciones. Prewarm y espera residual se solapan. Un `resource_ready` tardío con `afterAttemptFailure=true` no es una preparación válida ni permiso de activar.

Cuando hay Resource Timing se conserva duración, fetch/response y tamaños; TTFB/receive solo si los campos lo permiten. `blockedMs` y `scriptEvaluationCpuMs` son **null**: no se inventa una separación red/evaluación/CPU desde el callback load. TAO, caché y recursos externos preexistentes limitan la atribución. El HAR aporta blocked/wait; Performance/trace aporta evaluación/scheduling/CPU. Un tamaño cero no prueba caché caliente. Un error o hito ausente se informa como tal, no como duración cero.

El ring QA retiene hasta 5000 eventos; `dropped` informa truncamiento. El probe conserva su cobertura y fuentes saneadas. `activeObservers=0` no certifica destrucción del SDK. Los hooks y la escritura de logs tienen coste: comparar E0/E1 con el mismo probe y hacer también controles P1.3b sin probe con el mismo dummy QA.

## Construir y revisar

Desde `src/pro`:

```powershell
node tests/qa/intext-p14a-build.cjs
node --test --test-isolation=none tests/intext-p14a-dependencies.audit.test.cjs
```

El builder genera exclusivamente:

```text
tests/qa/generated/intext-p14a-E0-gam.qa.js
tests/qa/generated/intext-p14a-E1-gam.qa.js
tests/qa/generated/intext-p14a-E0-manager.qa.js
tests/qa/generated/intext-p14a-E1-manager.qa.js
docs/intext-p14a-build.json
```

El manifiesto contiene hashes de entrada, source-only, runtime, probe y salida. Los tests revierten prefijo, hooks, delegación y literal base y comparan byte a byte contra el original protegido. Comparan también que E0 y E1 solo difieren en el prefijo de asignación; el core instrumentado, dummy y configuración son idénticos. `build()` rechaza entradas desconocidas. `reverse()` rechaza modificaciones ajenas y demuestra restitución exacta; no se aplica sobre archivos productivos.

La validación y los límites de sandbox se registran en [scope y resultados](intext-p14a-scope.json), [tests afectados](intext-p14a-affected-validation.txt), [intento directo](intext-p14a-validation-direct.txt) y [suite completa](intext-p14a-validation.txt). Son tests automatizados con DOM/SDK simulados y código actual extraído, no pruebas Chrome/IMA reales ni evidencia de mejora de viewability.

### Resultados automatizados y reproducción de la suite

| Grupo, contado por fichero en la ejecución completa | PASS / total |
|---|---:|
| Nuevas regresiones E0/E1, ambas distribuciones | 75/75 |
| Vídeo/preload/PiP/animación, P1.3*, dummy y predictive-readiness existentes | 622/622 |
| Floor Authority | 86/86 |
| Prebid floor audit + aliases | 85/85 |
| Random/runtime | 61/61 |
| APS/TAM y Prebid/APS/PSP | 63/63 |
| GPT controls / PSP | 17/17 |
| Core, debugger, QA, configuración y targeting | 318/318 |
| **Suite completa** | **1327/1327** |

La baseline existente queda cubierta con 1252 tests más 75 nuevos, cero omitidos/cancelados. El grupo afectado ejecutado antes de la suite pasa 183/183. Sintaxis verificada en los dos originales, cuatro bundles generados y tres archivos JS nuevos. No hay package.json ni configuración lint dedicada en `src/pro`; se usaron los controles de arquitectura/seguridad existentes de la suite y revisión de diff, sin instalar herramientas.

Comando normal fuera de la restricción de subprocess:

```powershell
cmd /c "git show 98106a032aa4d8b2cbc83855030973e6c4563dba:src/pro/_gam_kv_.js > tests/qa/generated/p14a-floor-baseline.js"
$env:INTEXT_FLOOR_AUDIT_BASELINE = (Resolve-Path tests/qa/generated/p14a-floor-baseline.js).Path
node --test --test-isolation=none tests/*.test.cjs
```

Para reproducir el hash histórico exacto, exportar con `git show ... > tests/qa/generated/p14a-floor-baseline.js` desde **cmd.exe** (PowerShell puede transcodificar/añadir BOM). SHA256 esperado `e26e59f2f65c9bd2517e7582b53a1d5bc0781a63204b9b2e5fcc16ad50dd8118`. El commit es la baseline anterior al override usada también en P1.3c; HEAD ya contiene el comportamiento posterior. No se cambian expectativas de tests para usar HEAD como si fuera la implementación antigua. El archivo histórico solo se lee en tests y no se sirve en Fiddler.

En este sandbox Windows, Node no pudo crear ciertos subprocess (`spawnSync git`/`node` EPERM). Se ejecutaron externamente `git rev-parse --show-toplevel`, `git diff --name-only`, `git show` del commit histórico y `node --check`; sus salidas y hashes alimentaron el adaptador temporal existente `intext-authority-test-command-cache.cjs`. El adaptador solo responde a los comandos exactos ya verificados y verifica SHA antes de devolver una comprobación de sintaxis. El env de baseline evita los `git show` internos, sin falsearlos. No sustituye tests, asserts, SDK ni DOM. La ejecución completa usó `--require` de ese preloader y `--test-isolation=none`; el adaptador no forma parte de los bundles ni del patch.

Se conserva también [la primera ejecución con adaptador](intext-p14a-validation-first.txt), previa a las cuatro regresiones de las marcas finales de render: 1322 PASS y un `lab-timeout` en el test existente de pause-stack/ended del laboratorio dummy (expectativa `ended`). Ese fichero y sus tiempos no se modificaron. Su [repetición aislada](intext-p14a-dummy-recheck.txt) pasa 28/28; la repetición completa pasó 1323/1323 y la validación final, incluidas las marcas de render, pasa 1327/1327. Se informa esta sensibilidad temporal del harness, sin atribuirla a E1 ni ocultar el fallo. La ejecución directa sin adaptador queda guardada por separado con sus EPERM.

El [patch QA](intext-p14a-qa.patch) contiene los tres archivos nuevos de implementación/pruebas y esta guía; requiere los helpers/probe P1.3c actuales, cuyos hashes se fijan en el manifiesto. La actualización del diseño P1.4 se conserva en su propio documento. El patch no modifica fuentes productivas. Se verifica `git apply --reverse --check` sobre los archivos nuevos presentes para comprobar su reversibilidad; retirar una sustitución Fiddler y recargar sigue siendo el rollback operativo.

CodeMemory se consultó antes de modificar y se reindexó en modo fast sin persistir artefactos. Se volvió a contrastar `loadDependencies` productivo (todavía serial). La memoria sirve para descubrimiento, no sustituye hashes, tests ni diff; la cobertura de helpers QA se indica en scope.

## Guía Fiddler E0/E1

1. Conservar el artículo de Marca, campaña fija GAM autorizada y contexto comercial del sitio. No añadir/remover parámetros ni forzar PSP/Legacy, random, bidders o floors. Guardar los hashes del bundle original y la respuesta sustituida. El brazo depende del documento completo, no del Slot 1.
2. En AutoResponder, reutilizar el matcher **exacto de la URL JS Intext que carga la página** y seleccionar uno de los cuatro archivos locales. Si el sitio usa `_gam_kv_.js`, usar `-gam`; si carga `IntextManager.js`, usar `-manager`. Si carga ambos, ambos deben ser del mismo brazo. No añadir una distribución que la página no cargaba. No interceptar GPT, Prebid, APS, IMA, assets CDN ni VAST. No construir reglas generales para todos los JS.
3. La sustitución es solo del bundle QA. Deshabilitar los probes anteriores observe/shadow/enforce, budgets, variantes de lifecycle y copias manual ad-break: este archivo ya incorpora el probe de integración vigente. No inyectarlo dos veces. Confirmar que no existe otro `IntextP14A` antes de la primera ejecución.
4. Configurar frío/caliente antes de navegar. Para frío, DevTools Disable cache y documentar Fiddler/browser cache; para caliente, permitir caché y repetir navegación completa con el mismo protocolo. No comparar E0 frío contra E1 caliente. No suponer que recargar deshabilita service workers. Registrar si intervienen, sin cambiar autoridades comerciales.
5. Abrir documento nuevo con captura Network/Preserve log y, cuando sea viable, Performance y grabación/filmstrip. Tras cargar, comprobar `window.IntextP14A.arm` y ausencia de `assignment_conflict`. Comprobar Network/Response y SHA256 contra el manifiesto; la propiedad global sola no prueba todos los bytes sustituidos.
6. Ejecutar recorridos equivalentes: scroll lento, rápido/pasada y reentrada; documento oculto/visible; refresh y navegación SPA/PNC. Comprobar dos slots, sus modos efectivos y Display directo. Las variantes no convierten un Display en vídeo para completar la matriz. En PSP/Legacy usar contextos naturalmente obtenidos y verificar autoridades reales en debugger.
7. Conservar la grabación después de COMPLETE, restore y destroy, hasta el siguiente ciclo/Display. Comprobar visualmente dummy negro no perceptible, una superficie, animación y PiP habituales. P1.3c sigue abierta si falta esta prueba aunque E0/E1 descargue correctamente.
8. Exportar con `copy(JSON.stringify(window.IntextP14A.export(), null, 2))`; guardar como JSON junto al debugger habitual. Exportar HAR con contenido cuando esté autorizado y Performance trace. El HAR puede contener tokens/identificadores: guardarlo por el canal restringido, no subirlo a documentación pública. Si faltan XML/TAO, indicar cobertura ausente.
9. Antes de terminar una captura se puede llamar al `stop()` del probe de integración para retirar observadores; no aborta el SDK ni revierte el brazo. No usarlo a mitad de un ensayo que precise COMPLETE. Para cambiar brazo o hacer rollback: deshabilitar sustitución o elegir el otro archivo y realizar **navegación completa**. No borrar la propiedad global ni destruir/reproducir un anuncio para cambiar brazo.

### Hoja de captura y criterios

Registrar fecha/artículo, brazo y cuatro hashes relevantes (producción, artefacto, probe, dummy), navegador/dispositivo, PSP/Legacy real, caché, conexión, modo/slot/ciclo/token, creatividad/line item cuando conste, ruta de scroll y cobertura IMA. Alternar el orden E0/E1 externamente y repetir en condiciones comparables. No tratar slots/ciclos del mismo documento como muestras independientes.

Medir winner→prewarm→dependencies ready; residual dependencies wait; activación→request proxy→HTTP→AdsManager→preroll→frame **publicitario**→reveal y primer píxel perceptible. Conservar también errores, oportunidades sin frame, inicios fuera de viewport, impresiones antes del reveal, COMPLETE→restore→Display, conteos HTTP/SDK, observerBuildMs y CPU/red/memoria. Anchor, wrapper cerrado y viewability GAM son señales diferentes. La reproducción del dummy no certifica frame del anuncio.

Aceptar el gate técnico solo con cero nuevas requests publicitarias antes de elegibilidad, cero duplicación de init/play/start/impresión, deduplicación de dependencias, retry acotado, cleanup y fallback vigentes, sin regresión visual o de autoridades. Redirects/wrappers y rangos MP4 legítimos no son requests duplicadas por definición. Un prewarm menor sin mejor primer frame se informa únicamente como reducción técnica. La captura 21/10 no demuestra beneficio E1. Ninguna afirmación de ingresos/viewability se hace antes de las mediciones reales y de sus denominadores/variabilidad.

## Riesgos residuales y rollback

| Riesgo | Evidencia / medida |
|---|---|
| Dos descargas compiten por red/CPU en mobile | La independencia de APIs no garantiza menor frame; HAR y Performance, caché fría/caliente |
| SDK externo cargándose o fallido | Reutilización, disponibilidad y timeout existentes; tests de adopción, fallo y retry; repetir en Chrome |
| Rama pendiente tras fallo | Drenaje bounded sin publicidad; intento viejo no inicia nuevas etapas; revisar `pendingAttempts` |
| Script load tarda por evaluación/blocked | No subir timeout ni atribuirlo a GAM; recoger trace/HAR |
| El recurso ya está listo antes de render | Beneficio potencial nulo; distinguir espera residual de duración total |
| Probe/QA cambia scheduling | Coste no nulo; mismo instrumento entre brazos y controles sin probe |
| Mezcla de brazo por reinyección | Primera asignación inmutable; log conflict y repetir documento |
| Contenido base tras COMPLETE | Gate visual P1.3c pendiente, independiente del éxito de carga |
| Error VAST/SDK o offscreen STARTED | No resuelto por paralelización; preservar gates y diagnóstico, sin deadlines ni start manual |

Rollback: retirar AutoResponder y recargar documento completo; verificar los SHA256 productivos. No mutar SDK, targeting, cookies, refresh ni el anuncio activo. No hay commit, push, despliegue o integración automática del dummy.
