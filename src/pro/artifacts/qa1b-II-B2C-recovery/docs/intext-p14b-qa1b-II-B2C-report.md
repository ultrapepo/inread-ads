# QA1-B II-B2/C — cierre de preflight de Chrome aislado

**BLOCKED por entorno.** Los ejecutables Chrome y Chromium disponibles terminan antes de abrir CDP o crear un contexto de prueba. No hay PASS C-ISOLATED, carga SRI, ejecución del fixture ni rendimiento de página acreditados. No se rebajó la seguridad, no se sirvió ningún archivo y no se modificaron fuentes o sellos anteriores.

G0 conserva el sello externo II-B1 `3ac37c8396ea1739c9bf362c26a102f020db6336ffa7e0dd4992037b9665b94f`, con sus 418 archivos históricos, 28 nuevos registrados y el propio manifiesto: **447/447 hashes/tamaños coinciden**, sin ausencias. Los ocho documentos requeridos se leyeron completos; se verificaron todos los inputs de receta, el release fixture y sus SRI. No se volvió a construir II-B1 ni se ejecutaron sus suites como sustituto de Chrome. Sus resultados 138/138, 57/57, 106/106 y 108/110 son antecedentes congelados. El `.sty` conserva 3940 bytes y SHA `15c72d69032cc0e212b1501cdd78e9da78561b404c65165fe1a6d02efe16b660`; no se corrigieron sus dos aserciones históricas de 3903 bytes.

La distinción de inventarios queda registrada en [preflight](intext-p14b-qa1b-II-B2C-preflight.json) y en la [captura de Git](intext-p14b-qa1b-II-B2C-git-environment.json):

| Dominio | Evidencia actual |
|---|---|
| A. Baseline histórico local | 418/418 presentes e idénticos; es un inventario de bytes, no un recuento de archivos versionados. |
| B. Git actual | 404 rutas versionadas bajo src/pro. HEAD `cd1a0f29f160cd9222b4a41b449be6f46dd36d08`, igual al ref local cacheado origin/main. No se consultó el servidor GitHub: su estado remoto vivo sigue NOT-QUERIED. |
| C. Generados II-B1 | GAM, Manager e isolated-fixture existen con hashes aprobados y no están versionados. Las otras 26 rutas II-B1 sí están versionadas. Hay además generados históricos excluidos del tracking. |
| D. HEAD histórico | El sello II-B1 fija `4badfd433807e8e2024908573cfb637d9398cfa1`; no es el HEAD actual. No se cambió ni ejecutó verify.cjs congelado para hacerlo pasar. Se usaron comprobaciones nuevas independientes de bytes. |

Las invocaciones Git desde Node con pipes también reciben EPERM. El nuevo preflight distingue ese error de Git y usa la captura de comandos de la herramienta exec_command que sí funciona; registra ambas procedencias. No deduce tracking cero o HEAD inexistente de un fallo de proceso. Las comprobaciones disponibles son válidas independientemente de la incompatibilidad del verificador histórico. CodeMemory list_projects informó el HEAD actual y search_graph en intext-pro no encontró los símbolos nuevos; se inspeccionaron los artefactos conocidos y prevalecen sus bytes.

Entorno: Windows 11 Enterprise, Windows_NT 10.0.26300, x64; Node v25.8.1. [Versiones instaladas](intext-p14b-qa1b-II-B2C-browser-versions.json): Chrome 156.0.8078.81 en `C:/Program Files/Google/Chrome/Application/chrome.exe`; Chrome for Testing/Chromium 151.0.7922.34 ya instalado en `C:/Users/pedro.ramos/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe`. VersionInfo procede del ejecutable local: **no sustituye Browser.getVersion**, que no pudo obtenerse. No se instaló ni descargó ninguna dependencia.

Los intentos fueron diagnósticos de arranque, sin URL de página, servidor, SDK ni copia comercial. Cada uno tuvo un perfil temporal nuevo con prefijo gexp-qa1b-II-B2C bajo Temp; no se reutilizó el perfil personal ni un perfil histórico protegido. Las rutas exactas, hashes de ejecutables, fechas, flags, PID, errores, exit code y stdout/stderr íntegros están en los artefactos siguientes:

| Intento | Transporte y resultado observado |
|---|---|
| [Chrome pipe](intext-p14b-qa1b-II-B2C-environment.json) | `spawn EPERM` desde Node al crear pipes adicionales; no hay PID confirmado ni exit code de un Chrome creado. stdout/stderr vacíos conservados. |
| [Chrome puerto local](intext-p14b-qa1b-II-B2C-launch-port.json) | stdio a ficheros, CDP previsto en 127.0.0.1 con puerto efímero. PID 28080; termina con exit code Windows 4294930433 (`0xffff7001`), sin DevToolsActivePort ni respuesta CDP. |
| [Chromium instalado](intext-p14b-qa1b-II-B2C-launch-chromium.json) | Misma seguridad y transporte; única alternativa local, sin descarga. PID 22336; mismo exit code, sin DevToolsActivePort ni respuesta CDP. |

Chrome stderr contiene `CreateFile: Acceso denegado. (0x5)`, un FATAL en `mojo/public/cpp/platform/platform_channel.cc`, y `crash server failed to launch, self-terminating`; Chromium reproduce Crashpad/Mojo. Chrome también informa acceso denegado al abrir una clave Google Update. Son errores observados, **no una atribución a GPU**. No se ha aislado qué política, ACL o capa IPC produce el bloqueo.

No se usaron `--no-sandbox`, `--disable-web-security`, bypass de SRI/CSP ni cambios de GPU. Los flags completos se conservan en JSON: headless, perfil nuevo, CDP pipe o loopback, supresión de tareas de fondo/updates/sync/extensiones y bloqueo de resolución externa/proxy salvo loopback. Estos flags no acreditan por sí solos la ausencia global de conexiones del proceso. Sin CDP no existe captura de red de página: esa comprobación queda BLOCKED. No se configuró ni proporcionó tráfico publicitario, SDK o bootstrap comercial.

Comandos ejecutados desde `C:/Users/pedro.ramos/Documents/workspace/develop/interstitial/intext/inread ads/src/pro`, Node v25.8.1:

```text
node tests/qa/qa1b2b2c/launch.cjs
node tests/qa/qa1b2b2c/launch-port.cjs
node tests/qa/qa1b2b2c/launch-port.cjs --chromium
node tests/qa/qa1b2b2c/preflight.cjs
node tests/qa/qa1b2b2c/finalize.cjs --results
node tests/qa/qa1b2b2c/finalize.cjs --seal
node tests/qa/qa1b2b2c/finalize.cjs --verify
```

Los launchers Node salieron con 0 al escribir sus diagnósticos. Esto **no es exit 0 de Chrome ni PASS de arranque**: sus campos status=BLOCKED y browser exit/error contienen el resultado real. Los logs crudos no se filtraron: launch.stdout/stderr, launch-port.stdout/stderr y launch-chromium.stdout/stderr.

| Gate solicitado | Resultado de esta entrega |
|---|---|
| G0 inputs/entorno | PASS de integridad local independiente; arranque de navegador BLOCKED. |
| G1 carga positiva y SRI | BLOCKED / NOT-RUN. No servidor ni navegación; cero recursos servidos. URL/redirect/status/body/cache/SW/MIME/CSP/integrity aplicado/contexto no observados. |
| G1 negativos fixture y canary | BLOCKED / NOT-RUN. No se alteraron respuestas ni bytes sellados. No se atribuye rechazo SRI a Chrome sin ejecución. |
| G2 fuente, ledger, admin y cobertura | BLOCKED / NOT-RUN en Chrome. El contrato estático sigue sourceAttestor:null, UNBOUND-BROWSER y cuatro coberturas false, pero no se presenta como observación del navegador. |
| G3 ambas distribuciones | O NOT-RUN; N NOT-RUN; E BLOCKED por UNBOUND. No hay paridad, guard counts o comparación de callbacks acreditados en Chrome. El fixture no es E. |
| G4 rendimiento | NOT-MEASURED; aceptación BLOCKED. N real de todas las series de página =0; total/máximo/bins/p95/ratio/heap no se inventan. |
| G5 revisión | Revisor independiente read-only, sin autoría del código nuevo. Dictamen y cotejo final en review.md. |

[Resultados](intext-p14b-qa1b-II-B2C-results.json) conserva cada comprobación G1/G2 y O/N/E por distribución. [Rendimiento](intext-p14b-qa1b-II-B2C-performance.json) separa todas las series solicitadas. No se usan los contadores Node ni el tiempo de vida de un proceso fallido como CPU/setup/GC/layout de una página. No se activó profiler, breakpoint ni heap snapshot.

El presupuesto lógico de 2097152 bytes permanece congelado. No se ratificaron topes físicos ni se afirmó p95≤2 ms, ratio≤1%, ausencia de long task añadido >50 ms, heap≤8 MiB o pico export≤16 MiB. Setup/cleanup/export no tienen p95 inventado; aquí N=0. No se ejecutaron diez tríos O/N/E ni ventanas de 120000 ms: falta E válida y no existe procedimiento de comparación acreditado. No se amplió una serie tras observar N insuficiente; no se inició ninguna serie temporal de página.

STOP se aplica al diagnóstico del entorno tras los tres intentos documentados. No se continúa con flags que rebajen seguridad, fallback de carga, eval/Function, blob/data, inyección DOM ni cambios en producer. No hay nuevo controlador/binding, capability de navegador o bytes de productor: diseñarlos para salvar este bloqueo confundiría autoridad con un problema anterior de ejecución.

Riesgos pendientes: acceso IPC/Crashpad sin causa de política aislada; GitHub vivo no consultado; no hay cadena de carga real ni CSP/redirect/cache/SW observados; SPA/BFCache/callbacks y stop/dispose de página no probados; E y autoridad externa faltantes; oráculo O equivalente de navegador no disponible en esta ejecución; costes físicos y perturbación del profiler no medidos. Ninguno se cubre por analogía con los PASS offline previos.

Siguiente gate concreto: utilizar un entorno local autorizado donde Chrome pueda abrir IPC/Crashpad **con el sandbox estándar**, el mismo sello externo y perfil nuevo. Primero obtener Browser.getVersion/contexto CDP antes de servir nada. Después, servidor vinculado exclusivamente a 127.0.0.1 con allowlist exacta de isolated.html, canary.js e isolated-fixture.qa.js; MIME UTF8, sin transformaciones, redirects, compresión ni caché no declarada, bloqueo y registro de todo request ajeno. En documentos nuevos y separados: carga positiva, un byte de respuesta fixture alterado en memoria, un byte de respuesta canary alterado en memoria; ficheros sellados intactos. Capturar el cuerpo de la misma carga sin segundo fetch y ejecuciones independientes, no solo un hash declarado. Esto sigue siendo C sintético.

Solo después de acreditar ese procedimiento caben ensayos N viables y una propuesta específica de O/N/E. Activar E necesitaría otra propuesta revisada de autoridad/contexto/binding privado, nuevos bytes de test/hash/SRI y autorización **antes de utilizarlos**. No se preparó ni utilizó ese binding aquí. II-B2/P, publicidad, B shadow/enforce, geometría B1–B3, outcomes, III–IV, A3 y C IMA siguen fuera del alcance. No hubo commit, push, merge ni despliegue. Esta entrega termina con BLOCKED, sin avanzar automáticamente.
