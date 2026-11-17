# QA1-B II-B2/C — acta de revisión independiente

Revisor: `/root/iib2c_independent_reviewer`, instancia separada del autor de estas herramientas. Alcance read-only: contratos/evidencias congeladas, scripts nuevos de preflight/arranque, logs auténticos y conservación de archivos. El revisor no lanzó Chrome, no escribió código y no ejecutó el verificador congelado para cambiar su interpretación del HEAD.

Dictamen independiente final sobre las evidencias y el paquete: **BLOCKED por entorno**. Integridad de los 447 inputs previos: PASS. No hay PASS de carga/SRI, fuente/acreditación, funcionalidad o rendimiento de página.

Comprobaciones independientes ya realizadas:

- Sello II-B1 externo 3ac37c8396ea1739c9bf362c26a102f020db6336ffa7e0dd4992037b9665b94f y 447 archivos con tamaños/hashes coincidentes.
- HEAD y ref local origin/main cd1a0f29f160cd9222b4a41b449be6f46dd36d08; 404 rutas versionadas, 26 de II-B1, fixture generado no versionado. GitHub vivo no inferido de refs locales.
- Primer diagnóstico EPERM sin proceso confirmado. Segundo PID28080, tercero PID22336: salida 4294930433, sin DevTools/CDP; stderr Crashpad/Mojo acceso denegado. Hashes de stdout/stderr coinciden con sus JSON.
- Sin flags que deshabiliten sandbox o relajen seguridad. No atribución a GPU. Sin servidor, navegación de fixture, SDK, copia comercial o ensayo de página ejecutados.
- SourceAttestor permanece null en bytes sellados: no autoridad E inventada; sin fuente/acreditación real ni mediciones Chrome transferidas desde Node.

Hallazgos en herramientas nuevas corregidos durante la revisión:

| ID | Hallazgo verificable | Corrección y resolución |
|---|---|---|
| RC01 | Fallo Node child Git EPERM se convertía en trackedFileCount=0 y faltaba HEAD real. | Captura externa de comandos que sí funcionan; procedencia y error Node explícitos; unknown=null si no hay captura. Revisor confirmó HEAD/ref/count404. |
| RC02 | Ausencia de un input producía PARTIAL sin impedir que el launcher continuara. | El nuevo preflight publica BLOCKED y lanza error antes del arranque ante cualquier missing/mismatch. Actualmente no falta ningún input. |
| RC03 | Campo ChromeExecuted:false podía confundirse con ausencia de intento de proceso. | Se distingue no ejecución de fixture/copias de los tres intentos OS de navegador, documentados por separado. |

No se corrigió ninguna fuente congelada. La falta de un contexto Chrome reproducible es el bloqueo operativo, no un fallo nuevo de QA0/QA1-A ni una regresión histórica del `.sty`.

El revisor ejecutó exclusivamente el verificador nuevo inspeccionado (sin navegador) y contrastó además a mano el sello candidato `022bdfcf40c53de339a7c38c6a8d19cc0475de8ecacb636bc50c87b184c4bbcf` de 160922 bytes: 447 before/after, 20 hashes nuevos y 21 archivos contando el manifiesto, cero diferencias/archivos inesperados. Confirmó 20 casos G1/G2 BLOCKED/NOT-RUN, G3 NOT-ESTABLISHED y 14 series de rendimiento con N=0 y valores null/NOT-MEASURED. No queda hallazgo MAJOR/BLOCKER de evidencia; permanece el bloqueo real de ejecución del entorno.

Tras incorporar esta acta y G5 a los dos documentos nuevos se resella el paquete y se coteja otra vez read-only el hash final. No cambia ningún código o log revisado. Su hash externo final se devuelve al usuario; el manifiesto excluye su propio hash. El veredicto BLOCKED no autoriza otra subfase, un binding externo ni publicidad.
