# QA1-B II-B0 — matriz falsable II-B1 / II-B2

**Todos los casos B01–B52 son propuestos y NO EJECUTADOS.** No son 52 tests implementados ni reemplazan los 52 casos del contrato r1. Las variantes multiplican ejecuciones; su número se fijará en II-B1. Los resultados previos I/II-A/QA0/QA1-A se citan como antecedentes, sin reejecutarlos hoy.

## 1. Escalones y reglas de decisión

| Escalón | Alcance futuro | Evidencia que permite / límite |
|---|---|---|
| II-B1/S0 | Auditoría estática de nuevas fuentes, manifests, anchors, diffs y schema | Identidad de inputs, límites y ausencia de cambios comerciales por inspección. No prueba carga de navegador. |
| II-B1/S1 | Harness Node local de ramas con QA0 real, módulos browser cerrados y fixtures | Capacidades, transporte privado, proyección, presupuesto lógico, efectos y reversión reproducibles. No SDK/navegador ni heap de Chrome. |
| II-B2/C | Chrome aislado, perfil fresco sin cuentas/SDK/publicidad/red externa; autorización separada | Mecanismo de SRI/capability/clock/admin/medición con canary y fixture sin publicidad, incluidas clases/métodos extraídos trazables. No acredita ejecución de las copias GAM/Manager en páginas publicitarias. |
| II-B2/P | GAM Preview y, si se autoriza expresamente, Fiddler/controlador externo | Correspondencia de cuerpo realmente servido y ejecución real por distribución, lifecycle y coste en entorno comercial autorizado. Requiere otra autorización además de II-B2/C; no automático. |

En II-B2/C no se sirve/ejecuta una copia II-A ni se permite que el bootstrap de un core genere requests. El artefacto fixture tiene hash/release propios y se etiqueta sintético. La posibilidad de ejecutar después una copia completa II-B1 con SDK queda pendiente del protocolo P. Si un ensayo C requiere convertirlo en P para continuar, se detiene BLOCKED.

**PASS de un caso:** evidencia completa del estímulo, source/run IDs, oráculo, expected/actual, logs y hashes dentro del alcance del escalón. Una diferencia falsificadora es FAIL y activa STOP según el [plan](intext-p14b-qa1b-II-B0-budget-rollback.md). Falta de autorización, input, observabilidad, N, atribución o soporte es BLOCKED/INCONCLUSO, nunca skip que sume PASS. En II-B0 todos tienen estado NO EJECUTADO; no se usa un canary, Node o el PASS de la auditoría II-A como PASS de Chrome/P.

Ejecutar cada caso pertinente por GAM y Manager, en instancias/documentos separados. Para cada fuente W2/W3/W4/C1 cubrir true y false, preparado/no preparado y omisión legítima. Registrar O original / N copia nueva neutral / E copia nueva conectada, con versión exacta, hashes, condiciones y huecos. No colocalizar original y copia en un realm ni tomar paridad de un core como prueba del otro.

## 2. Casos y oráculos

| ID | Escalón | Estímulo / propiedad | Oráculo independiente y PASS requerido; motivo de BLOCKED |
|---|---|---|---|
| B01 | S0 | Baselines de 411 existentes, cuatro contratos, I/I-01/II-A y `.sty` | SHA/tamaños fijados en preflight, git diff/HEAD; cero cambios fuera de nueva allowlist. Input distinto o ausente bloquea, no se restaura. |
| B02 | S0/S1 | Byte base, padre II-A, dependencia, anchor o firma desviados; anchor 0/2 veces | Bytes/hash y slices originales, no hash declarado por producer. Build falla antes de publicar/copiar; ningún fallback a otra distribución. |
| B03 | S0/S1 | Build determinista, sintaxis, salida alterada e inversión | Comparación de bytes/offsets por verificador aparte del generador; reconstrucción exacta de cada padre/base en memoria. No afirmar reversión por una función que solo devuelva un hash esperado. |
| B04 | S1/C | QA0 CJS cerrado y shim UTF-8 | Ejecución de módulos originales en Node como oráculo: byteLength, JSON, Unicode/surrogates, límites y recibos equivalentes. Require no allowlisted falla; Buffer/require no aparecen en página. |
| B05 | S0/S1/C | Campos privados y argumentos QA internos de constructores | Name/length, claves públicas, super, opciones y argumentos comerciales iguales; solo el argumento QA interno declarado difiere. Contrato comercial observable cambiado bloquea ese transform. |
| B06 | C/P | SRI positivo, versión y distribución únicas | Browser SRI + cuerpo y contexto observados externamente contra manifiesto aprobado. Canary pasa mecanismo C, pero no fuente GAM/Manager real P. |
| B07 | S1/C/P | Un byte de cuerpo servido distinto, versión vieja, distribución intercambiada | SRI impide ejecutar; contador canary de ejecución=0 y ninguna sesión A acreditada. No descargar ni ejecutar original automáticamente. |
| B08 | C/P | Integrity ausente/incorrecto, loader o tipo de script distintos, CSP/CORS incompatibles | Preflight externo rechaza perfil; no se relaja política ni se cree onload. Falta de evidencia de aplicación SRI=BLOCKED. |
| B09 | S1/C/P | UTF-8/BOM/CRLF, compresión, caché, SW y redirect | Cotejo de la representación usada por SRI y de la carga real, sin normalizar ni hacer segunda petición. Variante no observable queda BLOCKED. |
| B10 | S1/C | JSON/hash/URL/buildId/currentScript/verified falsos, manifiesto clonado | Ninguno acredita fuente u objeto por sí solo. Expected: rechazo/unknown antes de ledger o A pendiente de cotejo externo; cero ganancia de autoridad. |
| B11 | S1/C | Dos sesiones con aliases iguales; packet extranjero/clon/proxy hostil | Pertenencia débil privada antes de leer campos/watermarks; D0/Dv/Dc y primera positiva inalterados, rechazo y gap. Proxy no debe provocar lectura de getter para acreditarse. |
| B12 | S0/S1/C | Endpoint en window/global lexical/export; invocar wait en Node real con source W2 y ticket ausente/JSON/ajeno | No se obtiene mint/ingest/bind/activate ni se acredita caller por string; cero B0/Dc/primera positiva desde ese wait. Interceptar constructores en mismo realm demuestra el límite del perfil hostil: BLOCKED, no «seguro por SRI». |
| B13 | S1/C/P | Document/realm/reload distintos, local counters idénticos, frame distinto | Contextos del driver/browser y objetos Document reales; autoridades y clocks separados, sin transplante de packets ni epoch/HAR como clock. |
| B14 | S1/C/P | Varios managers/slots en mismo documento y IDs DOM iguales | Reducer de oportunidades por objetos/fronteras nativas; una reserva compartida y un ledger, slots distintos. No 2 MiB por manager. |
| B15 | S1/C/P | SPA con raíz e índice nativos nuevos | Oráculo del callback original de artículo/creación scoped; genealogía nueva sin crear ciclo comercial QA ni perder owners aún vivos. |
| B16 | S1/C/P | Reutilizar misma raíz con navIndex nativo nuevo | Nuevo vínculo nav acreditado; no unión por identidad del root aislada. Prueba simétrica de raíces distintas con índice igual. |
| B17 | S1/C/P | Índice reiniciado/repetido, root cambiado sin callback, navegación no observada | Unknown/gap de continuidad, sin nav=0 ni alias de la última raíz para completarlo. No se acepta apariencia de URL/newsID igual como oráculo. |
| B18 | S1/C/P | Artículos solapados, retirada/reinserción de raíz y slots todavía live | Retirar solo leases cuyo owner nativo termina. No retirar todos por una nueva navegación ni acreditar una reinserción ambigua. |
| B19 | S1/C/P | Destrucción/reset/cleanup y callback original encolado antes de revocación | Cola controlada y control original; mismo callback comercial, QA lo rechaza/stale sin tomar generación/token actuales. Documento viejo no entra al nuevo. |
| B20 | C/P | BFCache/freeze/restore o desconexión del controlador | Perfil inicial restringido: stop previo en transición controlada, sin resume. Transición no observada se declara no acreditada/gap, y bloquea continuidad autónoma. Sin nuevos listeners/heartbeat para hacer pasar el caso. |
| B21 | S1/C/P | Clock monotónico, timestamps iguales por resolución y alta magnitud válida | Reloj de página y orden de fuente; no rechazar igualdad ni inventar delta. Números/bins/metadata siguen acotados. |
| B22 | S1/C | Retroceso, excepción, no finito o clock de otro realm | Unknown/gap/stop; no clamp/reordenación ni fin t=0. Clock solo declarado en JSON no adquiere confianza. |
| B23 | S1/C/P | Dos ejecuciones iguales/retransmisión, eventId conflictivo, detalle expulsado y finish del wait | Oráculo original: dos muestras, retransmisión vigente sin ingest incluso tras finish si owner sigue vigente; ticket finalizado impide emisión tardía nueva, sin borrar hecho anterior. Una oportunidad/primera positiva por clave. |
| B24 | S1/C/P | W2 sin prepared, owner=null nativo, true/false originales | Método original y contador de guard; admite Node/Waterfall/attempt sin creative, no SDK/P requeridos. Ambas muestras pueden ser A; B0 pass/fail según booleano. |
| B25 | S1/C/P | Prepared disponible, W2 omitido y W3/W4/C1 reales | Huella original: omisión W2 no crea false; handoff/new creative y cuatro fuentes no multiplican oportunidades. |
| B26 | S1/C/P | Varios false→true, W4 true y C1 false posterior | Resultados de cada invocación original; primera positiva se conserva una vez; C1 false impide activación por el control original, no por QA. |
| B27 | S1/C/P | W1 Display true, también tras winner inicial Video | Serie Display raw, nunca Dc ni scope=display en oportunidad Video; el winner inicial y ledger no se reclasifican. |
| B28 | S0/S1/C/P | C2–C11 true/false: diagnóstico, proximidad, no-fill, recuperación, reveal, plugin-init y ready | Inventario R1 completo por core; ninguna proyección de control al ledger B0. Staging no consumido se contabiliza en coste, no en primera positiva. |
| B29 | S1/C/P | Token stale, método ausente, preparación inválida, retorno temprano y throw original | Oráculo de llamadas/retornos/excepciones: no ejecución ≠ false. Anchor-missing sí conserva false original raw; sin A identificable no admite A completa. |
| B30 | S1/C/P | Descriptor `{winner:video}` de preparación y winner inicial ausente/display/null | Frontera decideWinner/pendingAuction original, no descriptor. Unknown no produce Dv; null nativo→none; fallback no borra winner inicial. |
| B31 | S0/S1/C/P | startAuction legacy sin fetchGeneration propia | Raw/unknown y gap declarado; ni 1, token ni entry.generation como sustituto. Eliminar esa ruta del export para aparentar cobertura es FAIL. |
| B32 | S1/C/P | Waterfalls con mismos contadores, nueva generación durante await, handoff/creative/entry viejos | Cola y guard nativos de generación; provenance/lease parental exactos. Callback viejo no produce fetch/winner/control del nuevo owner. |
| B33 | S1/C/P | Expiración/release de standby, reentrada, createPlayer falla y creative reutilizado | No terminal global por subintento; build-started excluye nuevos B0 sin afirmar player creado. No reiniciar etapa de un creative ya usado para admitirlo otra vez. |
| B34 | S1/C/P | Oportunidad sin guard/winner/frame, comienzo perdido, primera muestra positiva | Reducer por hechos originales y QA0 real: D0 independiente de C0; no backfill; unknown y censura izquierda/derecha separadas de gap. |
| B35 | S1/C/P | Close/export completo aparente y admin/config solicitando coverage true | Constructor cuatro false inmutables; rates null/exact false y firstPassFrame no implementado. Ni revisión externa ni cero dropped elevan flags. |
| B36 | S1/C | Constructor real QA0 y suma máxima de todas las particiones | Conteo independiente de UTF-8/representación interna, no solo export; ≤2097152 y los cinco topes, 64/1000/1000 máximos. Rechazar incremento de límites. |
| B37 | S1/C | Oportunidad 65 y overflow de resúmenes/agregados | 64 retenidas sin evicción contable; flag/STOP y notificaciones no contabilizadas como únicos. Si authority impide alcanzar extremo, informar y resolver fixture/preflight, no PASS fingido. |
| B38 | S1/C | 1001+1001 notificaciones, payload grande, pérdidas desiguales de rings | Detalle ≤2000 y bytes por partición; pérdidas/secuencias/representación explícitas, recuentos retenidos correctos. No reconstruir historia del ring superviviente. |
| B39 | S1/C | Autoridad/metadata llenas, contadores máximos, roots/aliases/leases retirados | Pre-reserva y carga independiente; stop sin crecimiento fuerte ilimitado o DOM/SDK en buffers. Saturación y hueco no desaparecen al exportar. |
| B40 | S1/C | Export manual grande/repetido, mutación de copia, clock inválido al cerrar | Export-too-large sin JSON parcial/reset; copia no es credential; fin desconocido se declara sin timestamp de relleno ni terminal inventado. |
| B41 | S1/C/P | Admin colisionado, stop/dispose repetidos, nuevo Manager/slot en el mismo Document y callbacks después | Solo controla QA; sin activate/ingest, borrado ajeno o resume. Tombstone débil por documento impide reinicio. Sin timers/listeners comerciales cancelados; admin no devuelve referencia privada. |
| B42 | S1/C/P | Sink/factory/QA0/shim fallan; getter/guard comercial original lanza | Huellas y error original iguales en O/N/E. Solo errores QA se encapsulan; no swallow del error comercial ni sustitución por false. |
| B43 | S0/S1/C/P | Comparación comercial completa por core | Efectos originales independientes: decisiones, argumentos, awaits, requests, timeout, callback order, mute/animación distintos de GAM/Manager, PiP/reveal/Display/fallback. Diferencias solo en operaciones QA expresamente inventariadas. |
| B44 | S0/S1/C/P | Contar C0/rect/style/helpers, reentrancia y getters con side effects | Exactas invocaciones originales; ningún getElement/valid/isActive/SDK extra para observar. No cambiar el orden de evaluación de sus expresiones al insertar try/catch o recuperar campos privados. |
| B45 | S1/C | Bins, borde 2 ms, N/total/max, intervalos padre/hijo y coste de stats | Oráculo aritmético separado y traces externos; sin doble suma, todos los staging/dispatch/cleanup/export cargados. Stats no dependen de ring evictado. |
| B46 | C/P | Resolución insuficiente, N raro, p95/1%/long task o tope excedido | Run plan fijo y cotas; p95 con cota válida/N suficiente; excedido=FAIL/STOP, sin coste acreditable=INCONCLUSO. No extender ventana o bajar muestreo. |
| B47 | C/P | CPU real, layout/estilo, GC síncrono/diferido y overhead del profiler | Traces externos y tríos O/N/E; cero layout directo añadido. No PerformanceObserver/SDK wrapper de página. Atribución ambigua bloquea presupuesto. |
| B48 | C/P | Heap máximo, reemplazos, export pico y dispose | Retaining paths externos, liberando handles del driver y con GC natural; topes físicos ratificados. Medición intrusiva se separa de timing; sin plateau acreditado no PASS. |
| B49 | S1/C | Reversión offline, archivo nuevo alterado/inesperado, archivo protegido cambiado | Allowlist/hashes y rutas absolutas; no reset/restore del proyecto ni limpieza de fichero no reconocido. Los 411 before permanecen idénticos. |
| B50 | C/P | Stop y retorno al punto de inclusión original | Documento nuevo y hash/config aprobados; no segundo bootstrap en documento vivo ni request/activación por rollback. Config real sin inventario/permiso=BLOCKED. |
| B51 | S1 | Repetir suites congeladas y anteriores sin cambios | Selección completa: I 57, II-A 106, QA0/QA1-A 110; conservar dos FAIL .sty históricos. Salida completa/Node/comandos/hashes; cualquier fallo nuevo se investiga sin editar tests. |
| B52 | S0/C/P | Informe y puerta de aceptación | Trazabilidad A–J, autorización por escalón, revisión independiente y alcance explícito. No «PASS navegador» por revisión documental ni avance automático a otras fases. |

## 3. Independencia de los oráculos

Para C0, ejecutar las ramas **originales** con los mismos inputs/colas y comparar sus retornos, identidad de objetos, cortocircuitos, excepciones y efectos. No crear un mock que llame al adaptador para averiguar qué debería devolver. Para contabilidad, un reducer de conjuntos de oportunidades construido a partir de hechos nativos del vector/driver, más QA0 real, no las receipts del frontend como expected. Pruebas de overflow incluyen aritmética entera independiente y contador de pérdidas por representación.

Para UTF-8, usar Node Buffer del módulo congelado como oracle y vectores conocidos, no la misma función TextEncoder en ambos lados. Para hashes/carga, verificador independiente del generador, SRI del navegador y cuerpo/contexto observados por controlador confiable; tres cadenas de evidencia, ninguna un sello autorreportado. Para efectos, el recorder se sitúa en dobles de laboratorio o traces externos y no consulta estado QA para decidir el expected. No se interponen wrappers SDK en publicidad.

El grafo CodeMemory es evidencia de descubrimiento, **no oracle de exhaustividad**. Sus traces actuales omiten W4; B28/B44 parten del inventario de 40 referencias contrastadas contra los bytes. Una dependencia nueva o un sitio adicional en II-B1 requerirá otra clasificación, no una ampliación automática de PRIMARY.

## 4. Registro de resultados futuro

Cada caso guardaría ID/variante, distribución, escalón, autorización/runId, hashes de origen/copia/módulos/fixture, navegador o Node, Document/realm públicos, expected/actual, recibos correlacionados y ubicación del log. No almacenar datos comerciales sensibles. Estados: NOT-RUN, PASS, FAIL, BLOCKED, INCONCLUSIVE; los tres últimos no cuentan como PASS. Publicar totales y todos los fallos, incluyendo los históricos congelados.

Las salidas completas futuras tendrán nombres nuevos II-B1/II-B2. No sobrescribir logs/results/manifiestos I/I-01/II-A ni el ZIP aprobado para informar un resultado más reciente. Comandos y Node se fijarán antes de implementar; sin binario compatible local, declarar bloqueo y no descargarlo sin autorización de entorno. No ejecutar ahora ninguna suite ni browser para rellenar esta matriz.

Comandos **propuestos, NO EJECUTADOS**, para la raíz reconstruida en una futura II-B1 autorizada:

```text
node --test --test-isolation=none tests/intext-p14b-qa1b-II-B1.test.cjs
node --test --test-isolation=none tests/intext-p14b-qa1b-stage1.test.cjs
node --test --test-isolation=none tests/intext-p14b-qa1b-stage2a.test.cjs
node --test --test-isolation=none tests/intext-p14b-shadow.audit.test.cjs tests/intext-p14b-qa1a.audit.test.cjs
node tests/qa/qa1b2b1/verify.cjs
```

Proponer Node 22.16.0 como entorno de reproducción de la auditoría y 25.8.1 como contraste del entorno previo; registrar binario/versiones reales por comando. No son resultados actuales ni permiso para ejecutarlos en II-B0. El primer y último archivo todavía no existen. Chrome/driver/proxy/versiones y comandos de C/P se fijarán en su autorización posterior, sin inventar hoy un punto de despliegue operativo.
