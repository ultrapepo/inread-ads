# GEXP INTEXT — recuperación portátil II-B2/C

Este paquete se prepara sin ejecutar Chrome en Codex. No es un PASS de navegador. Conserva los diagnósticos originales BLOCKED y los bytes sellados. Los scripts requieren revisión independiente y ejecución **manual en una sesión Windows 11 local autorizada fuera de Codex**. No instalan dependencias ni cambian ACL, antivirus, políticas, firewall o configuración del SO.

Requisitos: Windows 11, Node existente ≥22.16.0 con WebSocket integrado y Chrome/Chromium ya instalado; PowerShell 5.1 o posterior para versión del ejecutable y wrapper. Si la política impide ejecutar un script, detener con BLOCKED: no usar Set-ExecutionPolicy, Bypass, Unblock-File, --no-sandbox, --disable-web-security o cambios de GPU/ACL/antivirus. No se permiten flags adicionales ni fallback de navegador.

Descomprimir el ZIP en una carpeta nueva. Conservar íntegra su estructura, incluidos tres QA generados, isolated.html y canary.js. GAM/Manager completos se comprueban por hash pero **nunca se sirven ni ejecutan**. Solo los tres recursos del fixture están en la allowlist HTTP. Los sellos II-B1/II-B2/C y los diagnósticos se incluyen sin modificarse; los otros archivos de los antiguos inventarios completos no se necesitan para estos checks independientes y no se afirma reejecutar sus suites.

Verificar SHA256 del ZIP contra la entrega externa. `package-manifest.json` tiene un SHA externo independiente indicado en la ficha de entrega junto al ZIP; los argumentos siguientes deben usar ese valor aprobado. Un hash contenido en JSON no acredita por sí mismo la ejecución ni una fuente de productor.

Desde la carpeta extraída, PowerShell normal sin elevar privilegios:

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath .\package-manifest.json
$approved = 'PEGAR_SHA256_EXTERNO_DEL_MANIFIESTO_DEL_PAQUETE'
.\Run-Recovery.ps1 -Mode preflight -ExpectedManifestSha256 $approved -OutputDirectory 'C:\QA\run-preflight-01'
.\Run-Recovery.ps1 -Mode environment -ExpectedManifestSha256 $approved -OutputDirectory 'C:\QA\run-environment-01' -ChromePath 'C:\Program Files\Google\Chrome\Application\chrome.exe' -ConfirmLocalSession
```

Las carpetas de salida deben ser nuevas y estar fuera del paquete. Mode preflight verifica únicamente bytes, sin lanzar Chrome. Mode environment registra hash y VersionInfo del ejecutable; usa perfil Temp nuevo, sandbox estándar y CDP en loopback. No abre el fixture. Exige PID, Browser.getVersion válido, contexto/documento about:blank y estabilidad de 3000 ms con segunda comprobación de versión. El límite de arranque es 20000 ms, sin reintentos. Después cierra su propio navegador; una terminación forzada deja BLOCKED. Se guardan flags, errores, stdout/stderr, datos CDP, proceso y proxy denegador. El perfil temporal propio queda identificado para inspección, sin tocar el perfil personal.

Si environment devuelve BLOCKED, detenerse y conservar la carpeta íntegra. Exit code Node 2 indica rechazo/bloqueo/fallo; exit 0 solo corresponde al alcance indicado en result.json. Ninguna confirmación de operador o JSON convierte UNBOUND en autoridad.

Solo tras revisar un PASS-ENVIRONMENT-ONLY, el operador puede pedir separadamente G1/G2:

```powershell
.\Run-Recovery.ps1 -Mode g1g2 -ExpectedManifestSha256 $approved -OutputDirectory 'C:\QA\run-g1g2-01' -ChromePath 'C:\Program Files\Google\Chrome\Application\chrome.exe' -ConfirmLocalSession -ResumeG1G2
```

G1/G2 repite primero la puerta de entorno en **su propio navegador nuevo**; no confía en un JSON de otro run para saltarla. Solo si pasa inicia servidor 127.0.0.1. Cuatro documentos/contextos separados: positivo GAM, negativo fixture, negativo canary, positivo Manager. Los negativos cambian un byte de comentario únicamente en el Buffer de respuesta, nunca el fichero. Cache desactivada y Service Worker bypass declarados; sin compresión/redirects. Se preservan respuesta servida y Network.getResponseBody de la misma carga, requestId/frame/loader/contexto, cabeceras/MIME, integrity real y errores. Si Chrome no entrega body en un rechazo SRI, se requiere el digest computado de su error, coincidente con la respuesta negativa; nunca se hace segundo fetch.

Profiler precise coverage se usa **solo como oráculo funcional** de ejecución de canary exactamente una vez, no como medición temporal. No basta su propiedad estática executions=1. Se contrasta la política meta CSP y un fetch de prueba al propio loopback que debe bloquear connect-src antes de red/intercepción. No se añaden scripts a DOM ni se usa eval/Function/blob/data para cargar código. Runtime.callFunctionOn es el controlador externo de inspección/estímulo explícito; no recibe ni fabrica autoridad de productor y no es fallback de SRI.

G2 usa exclusivamente los constructores extraídos sellados. El primer helper comercial omitido getSiteContext provoca un TypeError esperado **después** del binding QA inactivo; no se completa el bootstrap, no se crean Node/SDK ni se parchean prototipos para publicidad. Se acredita INACTIVE/pending, cero admisión/ledger, cuatro false, admin limitado y resistencia a datos JSON/hash/aliases. Export manual debe tener qa0=null: tasas/firstPassFrame no se publican como observados. Stop/dispose no cancelan una microtarea ajena; un Manager posterior no borra tombstone. Esto no es una prueba de todos los caminos comerciales.

Toda petición de página ajena a la allowlist se bloquea y causa FAIL. El proxy deniega conexiones externas del navegador y las registra; no equivale a captura de paquetes del SO ni protege frente a una cuenta/realm hostil. No se ejecutan SDK, anuncios, Prebid, APS, IMA, GAM Preview o copias comerciales. `sourceAttestor:null` permanece UNBOUND; E sigue BLOCKED. O/N/E completo, diez tríos, ventanas de aceptación, p95/CPU/layout/GC/heap, outcomes y tasas exactas **no se activan**.

Importación manual de logs, sin envío automático: copiar íntegra la carpeta de salida a un directorio nuevo del equipo revisor; no ejecutar ninguno de sus contenidos. El runner imprime el SHA256 de logs-manifest.json: cotejarlo por un canal externo. Con el paquete original verificado:

```powershell
node .\import-logs.cjs --logs 'D:\Recibidos\run-g1g2-01' --destination 'C:\QA\import-01' --expected-logs-manifest SHA256_EXTERNO_LOGS --expected-manifest SHA256_EXTERNO_PAQUETE
```

El importador rechaza traversal, symlinks, duplicados, tipos ejecutables, ficheros inesperados, hashes incorrectos y más de 128 MiB. Copia evidencia inerte, no sobrescribe diagnósticos anteriores. Su resultado siempre es IMPORTED-PENDING-INDEPENDENT-REVIEW: logs/JSON no autentican por sí solos Chrome o productor. Revisar CDP crudo, cuerpo de la misma carga, CSP/SRI, proceso estable, red denegada, coverage y admin antes de cualquier dictamen C limitado.

Continuación explícita: environment PASS en sesión autorizada permite únicamente el opt-in G1/G2 documentado. Un PASS-C-ISOLATED-LIMITED importado y aprobado por revisor solo acredita esos componentes sintéticos. No autoriza nueva autoridad/binding E, publicidad II-B2/P ni mediciones de aceptación. Cualquier binding requerirá diseño, nuevos bytes/hashes/SRI, auditoría y autorización **antes de uso**. Detenerse y entregar logs tras el run elegido.
