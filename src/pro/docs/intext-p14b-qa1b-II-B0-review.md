# QA1-B II-B0 — revisión documental, preflight y dictamen

**Dictamen global: PARTIAL.** Diseño verificable y preflight documental completados; falta el sign-off independiente de este expediente. No se ha ejecutado ni servido código en navegador. No existe PASS de browser, medición de página o autorización II-B1/II-B2.

## 1. Evidencia y decisiones de alcance

Se añadieron únicamente siete documentos con prefijo `intext-p14b-qa1b-II-B0-`: [arquitectura](intext-p14b-qa1b-II-B0-design.md), [matriz de pruebas](intext-p14b-qa1b-II-B0-test-matrix.md), [presupuesto/rollback](intext-p14b-qa1b-II-B0-budget-rollback.md), [archivos futuros](intext-p14b-qa1b-II-B0-file-matrix.md), esta revisión, [preflight](intext-p14b-qa1b-II-B0-preflight.json) e [integridad](intext-p14b-qa1b-II-B0-integrity.json). Ninguno existía al inicio. No se ha implementado ningún archivo de la allowlist II-B1.

Preflight factual: 411 archivos existentes fijados antes de la primera escritura II-B0; los 386 protegidos II-A, sus 22 archivos nuevos y el manifiesto coinciden con el release recibido. Los dos archivos de empaquetado existentes también se conservan. Se contrastan before/after los 411, Git HEAD y ausencia de diferencias tracked. No se hacen reset/restore/checkout ni normalización de `.sty`. Git estaba limpio al inicio, a diferencia de la situación histórica que documenta II-A; no se atribuye esa diferencia de estado Git a una acción de este encargo.

La autoridad de baseline actual es la cadena II-A aprobada. Los baselines antiguos y las dos aserciones históricas expected 3903 / actual 3940 se conservan como evidencia histórica; no se usan para «restaurar» el archivo. Del mismo modo, los campos pendientes de revisión de JSON/documentos congelados no se reescriben por la aprobación posterior comunicada por el usuario.

Comandos de cotejo II-B0, desde `src/pro`, sin cargar código del proyecto ni escribir en sus fuentes:

```text
git status --short --untracked-files=all
git rev-parse HEAD
git diff --exit-code -- .
node -e "const fs=require('fs'),c=require('crypto'),p=JSON.parse(fs.readFileSync('docs/intext-p14b-qa1b-II-B0-preflight.json'));for(const x of p.baseline.files){const b=fs.readFileSync(x.file);if(b.length!==x.bytes||c.createHash('sha256').update(b).digest('hex')!==x.sha256)throw Error(x.file)}console.log('PASS',p.baseline.files.length)"
```

Git limpio inicial y únicamente documentos II-B0 nuevos al cerrar son estados diferentes y esperados. El diff tracked debe seguir vacío. El hash del propio manifiesto documental se publica fuera de su lista autorreferente; su ruta/bytes se verifican por separado.

MCP: proyecto indexado y Git HEAD reportado coincidente, sin certificar la frescura global del índice; consultas seleccionadas y comparación del snippet nativo con bytes locales en preflight. `index_status` exige una aprobación no disponible. Otras lecturas sí funcionan. Los dos traces de wait omiten W4: se verificaron directamente las 40 referencias del inventario R1, además de los 36 anchors de métodos II-A. No se declara exhaustividad a partir del grafo ni se crea un índice nuevo. Las únicas ejecuciones de herramientas locales fueron de lectura de Git/archivos, SHA/JSON/análisis textual y escritura/verificación de estos documentos; no se cargaron los módulos del proyecto para ejecutarlos, ni se repitieron suites/copias/builds.

## 2. Revisión de coherencia por requisitos

Esta es una comprobación del autor contra contratos/código/oráculos documentados, **no una auditoría independiente ya realizada**. Estados: CHECKED=propuesta y criterios documentados; PENDING=requiere evidencia/revisión futura; BLOCKED=prueba/avance que no puede autorizarse desde este expediente.

| Requisito | Diseño y prueba falsificadora | Comprobación documental / frontera pendiente |
|---|---|---|
| A. Bytes servidos | Arquitectura 3; B01–B10, release y copy-manifest futuros | CHECKED: SRI + inclusión confiable + cotejo externo cuerpo/contexto, sin self-hash circular. PENDING: loader/entorno real. Hash/JSON/currentScript no son autoridad. |
| B. Document/realm/SPA | Arquitectura 4; B13–B20/B32 | CHECKED: sesiones aisladas, presupuesto por documento, roots/índices nativos. PENDING: cobertura de carreras reales; continuidad BFCache autónoma BLOCKED. |
| C. Capability privada | Arquitectura 2/4; B10–B12/B41/B42 | CHECKED: campos privados/carriers, membership antes de ledger, admin sin ingreso/activate. PENDING: prueba de templates; mismo realm hostil fuera del perfil. |
| D. Clock/genealogía | Arquitectura 5; B19/B21–B23/B30–B34 | CHECKED: page-monotonic, parent leases y generación original, legacy unknown. No garantizar fuente temporal por una cadena declarada. |
| E. W2/W3/W4/C1 | Arquitectura 5 y R1 congelado; B24–B33/B43/B44 | CHECKED: ambos booleanos originales, omisión no false, no reevaluación. W1/C2–C11 fuera del control ledger B0. |
| F. Cobertura/tasas | Arquitectura 6; B34/B35/B40/B52 | CHECKED: cuatro false al constructor, A por muestra distinta de B poblacional, tasas y firstPassFrame bloqueados. |
| G. Presupuesto | Presupuesto 1–4; B36–B48 | CHECKED: suma 2097152, límites sujetos a bytes, metadata compartida y medidas propuestas. PENDING: preflight de implementación/CPU/layout/GC/heap; cero medidas actuales. |
| H. Escalones | Matriz 1; B06–B09/B46–B52 | CHECKED: S0/S1, Chrome aislado C y publicidad P separados; Node/canary no acreditan página comercial. Todas las autorizaciones futuras PENDING. |
| I. Stop/rollback | Presupuesto 4–6; B19/B20/B39–B42/B49/B50 | CHECKED: sticky stop QA, no cancelación comercial, export/cleanup y hashes. Config real de inclusión no inventariada: despliegue BLOCKED. |
| J. Archivos/permisos | Matriz de 29 rutas y tabla de fronteras; B01/B02/B05/B49/B52 | CHECKED: solo ADD futuro, costes/conflictos/oráculos, 411 existentes read-only. No permiso implícito para editar I/II-A, contratos o deploy. |

Las 52 filas propuestas no se presentan como 52 PASS ni se heredan de las 106 II-A. La verificación de Markdown/JSON/hashes y de que las rutas II-B1 no se crearon es documental; no sustituye ejecutar esas futuras pruebas.

## 3. Hallazgos de revisión de diseño y tratamiento

| ID | Riesgo comprobado al diseñar | Tratamiento y estado |
|---|---|---|
| D01 | Helper global léxico de II-A sería invocable si se reemplazara null por endpoint | No se modifica II-A; propuesta de campos privados/carriers en nuevas copias. Resuelto como elección documental, prueba de implementación PENDING. |
| D02 | Un hash de copia embebido en esa misma copia crea una dependencia circular; un hash declarado no prueba carga | buildId acíclico de inputs; hash completo/SRI en release externo; aplicación browser + correlación real. Resuelto documentalmente, evidencia real PENDING. |
| D03 | Port directo de createNativeOffline/fixture authority falsearía procedencia/clock | Frontend browser y schema nuevos, QA0 congelado y shim mínimo; crypto no entra al hot path. No modificar I/I-01/II-A. Implementación PENDING. |
| D04 | Múltiples managers/navs o coste fuera de metadata podrían duplicar los 2 MiB | Un ledger/reserva por documento; subparticiones 8192+4096+2048+2048 dentro de 16384. Preflight worst-case futuro obligatorio; agotamiento temprano declarado. |
| D05 | Sin listeners nuevos no se observa todo BFCache/restore/desconexión a tiempo | Perfil inicial controlado, documentos frescos, stop externo previo; hueco no observado invalida continuidad. Limitación abierta, no falsear soporte autónomo. |
| D06 | Same realm permite interceptar constructores/prototipos y no queda protegido por SRI | Límite explícito de confianza y prueba adversarial; si ese atacante está en alcance, perfil BLOCKED y requiere otra arquitectura. No se promete aislamiento criptográfico interno. |
| D07 | El grafo consultado omite llamadas opcionales/dinámicas W4 | Cotejo directo de los bytes y 40 referencias. Resuelto para descubrimiento documental; no elevar cobertura runtime. |
| D08 | Private fields, parámetros QA, bootstrap y metadatos de script añaden trabajo/lecturas | Diff y huellas O/N/E, acceso privado protegido, ninguna expresión comercial dentro de catch QA, todos los costes cargados. Riesgo temporal/heap PENDING. |
| D09 | Medida intrusiva o muestras raras pueden producir un falso PASS de presupuesto | Ensayos diagnósticos separados, ventanas fijas/N mínimo/cotas, GC natural, incertidumbre→INCONCLUSO; topes físicos pendientes de ratificar. |
| D10 | Rollback en documento vivo podría duplicar bootstrap/anuncios o alterar recovery | Stop únicamente QA; siguiente documento usa opt-in original auditado; configuración real necesita permiso aparte. Despliegue/rollback browser no ejecutados. |
| D11 | Un source string W2/W3/W4 sobre un Node real no prueba el sitio de llamada, aunque el guard devuelva un booleano real | Ticket privado por invocación desde el caller nativo, distinto del lease de packets históricos. Finish cierra emisión nueva, sin borrar hechos. B12/B23 lo falsifican; diseño resuelto, implementación PENDING. |

No hay cambios correctivos al código aprobado detrás de estos hallazgos. Son restricciones y criterios falsificadores para la propuesta futura. SPA sin fronteras observadas suficientes, legacy sin generación y temporalidad real quedan declarados; ni un sourceComplete false ni un test sintético convierten esos huecos en datos válidos.

## 4. Acta para revisión independiente documental

**Estado de la revisión independiente de II-B0: PENDING / no emitida.** Autor de este expediente: agente que preparó el diseño. No consta un segundo revisor ni se contactó a terceros. La auditoría previa de II-A comunicada por el usuario no es un sign-off de esta nueva arquitectura. Esta distinción es la razón del dictamen PARTIAL; no se solicita permiso para implementar como sustituto de revisión.

La revisión independiente deberá verificar sobre estos mismos hashes:

1. Cadena de confianza A sin credenciales JSON ni hash de sí mismo; la precondición de inclusión SRI y controlador externo es viable para el entorno real, con mismatch antes de ejecutar.
2. Viabilidad del carrier privado sin mover clases ni alterar bootstrap/super/length/argumentos comerciales; exposición a interceptación same realm aceptada o rechazada expresamente.
3. Semántica de SPA/root reutilizada/índice repetido y ausencia de detección autónoma BFCache; el perfil no promete continuidad donde no hay fuente nativa.
4. Separación W1/C2–C11, true/false/no ejecución, R1/R2 y contabilidad QA0; legacy no se rellena y firstPassFrame no se habilita.
5. Metadata y autoridad dentro de la partición, todos los costes y medidas cubiertos, umbrales/ventanas/topes físicos ratificados antes de browser, costes inconclusos bloqueantes.
6. Exactitud de las 29 rutas propuestas, fuentes congeladas intactas, rollback sin efectos comerciales y autorizaciones separadas de C/P.

Campos del acta futura: revisor independiente, fecha, hash del manifiesto II-B0, requisitos/hallazgos revisados, observaciones, PASS DOCUMENTAL / PARTIAL / BLOCKED y alcance explícito de la recomendación. No rellenar nombre, fecha de sign-off o PASS con valores de ejemplo. Los documentos II-B0 se conservarán; una decisión posterior iría en otro documento autorizado, sin reescribir este acta pendiente.

## 5. Dictamen final de II-B0

- **PASS de preflight documental:** entradas presentes, autoridad de hashes vigente, referencias/anchors contrastados y before/after sin cambios preexistentes; evidencia exacta en integridad/preflight.
- **PARTIAL global:** propuesta completa A–J, oráculos, rollback y presupuesto definidos, pero revisión independiente de este diseño aún no emitida. No se encubre esa ausencia con una autoauditoría.
- **BLOCKED para avanzar:** ninguna autorización II-B1/II-B2; loader/archivo operativo de inclusión no implementado, continuidad autónoma no acreditada, coste browser no medido. No hay PASS de Chrome, SDK, anuncios, tráfico, Fiddler, geometría u outcomes.

Se detiene aquí II-B0. No se desarrolla código ni se crean hooks, adaptador browser, generador, nuevas copias o fixtures. No se sirve/ejecuta II-A, no se inicia II-B1/II-B2, III–IV, B runtime/enforce, A3 o C. No commit, push, merge o despliegue.
