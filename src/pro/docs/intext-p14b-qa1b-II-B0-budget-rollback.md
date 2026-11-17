# QA1-B II-B0 — presupuesto, medición, parada y reversión

**Solo diseño. Ninguna medición se ha ejecutado.** Complementa [arquitectura](intext-p14b-qa1b-II-B0-design.md), [pruebas](intext-p14b-qa1b-II-B0-test-matrix.md) y [permisos propuestos](intext-p14b-qa1b-II-B0-file-matrix.md). No modifica límites de QA0 ni el perfil II-A.

## 1. Unidad de presupuesto y preflight futuro

Un único presupuesto por Document/realm/distribución autorizada. Todos los managers, raíces, slots, navegaciones SPA, leases y sus dos representaciones de detalle consumen ese mismo presupuesto. No reservar otro ledger por navegación o para Display. GAM/Manager y original/copia se prueban en documentos distintos. Documentos diferentes requieren límites propios y un informe adicional del total del proceso; no presentar ese total como si fueran 2 MiB para todo Chrome.

| Partición | Máximo bytes | Entradas y conducta |
|---|---:|---|
| Resúmenes QA0 | 262144 | Hasta 64; no desalojar identidad para admitir la oportunidad 65. |
| Agregados QA0 | 16384 | Constructor real, coverage false; overflow/gaps irreversibles. |
| Metadata + autoridad + coste QA1-B | 16384 | Una sola reserva compartida, desglosada debajo. |
| Ring raw QA0 | 524288 | Hasta 1000, sujeto a bytes y tamaño de entrada. |
| Ring packets + recibos | 1277952 | Hasta 1000, sujeto a bytes; incluye procedencia y pérdidas. |
| **Total** | **2097152** | Máximo 2000 entradas de detalle; no 2000 oportunidades. |

Se conserva la partición aprobada. Subpartición **propuesta para II-B1**, a verificar con el constructor y su representación real: autoridad/aliases/leases 8192; correlación/primer check hasta 64 filas 4096; agregados de coste 2048; sesión/admin/procedencia/latches 2048. Suman 16384. No se traslada gasto a una caché no declarada ni se usa una segunda reserva I/II-A en paralelo. Si no cabe el peor caso, el perfil no pasa preflight: reducir campos no contractuales bajo otra revisión o detener admisión, nunca subir los topes congelados.

La autoridad browser podría agotarse antes de 64 oportunidades con genealogías largas. Se declara ese límite; 64 es máximo, no capacidad mínima garantizada para cualquier payload. Los aliases del frontend serían cortos y sus vínculos a root/índice/ciclo nativos se cargarían en la autoridad; no repetir IDs largos en tablas auxiliares. Todo map fuerte de **escalares** tiene cargos y límite; ninguno retiene DOM/SDK. WeakMap no equivale a memoria gratuita: cargar sus tuplas/leases y medir su retención física. No se depende de GC para recuperar un presupuesto de autoridad ya comprometido.

Preflight del almacenamiento: payloads máximos válidos, aliases/counters en sus anchuras límite, Unicode UTF-8/UTF-16, estados de pérdida, recibos y headers. Verificar cada partición después de cada operación, la suma combinada, pre-reserva del siguiente estado y las dos rings simultáneas. Asignar una entrada mayor que su ring debe descartarla con contador/latch antes de retenerla. Constructor QA0 con límites reducidos debe aceptar exactamente su porción; no eludir validaciones mediante un mock.

Oportunidad 65 se prueba en QA0 y extremo a extremo. Si la autoridad se agota antes en un fixture, informar **no alcanzable por ese fixture**, nunca PASS ficticio de la oportunidad 65; otro fixture mínimo debe demostrar el extremo o II-B1 queda BLOCKED en esa prueba. Notificaciones no retenidas no son nuevos únicos contables. Evicción raw puede continuar con pérdidas explícitas; overflow contable o de metadata/autoridad detiene QA.

## 2. Qué coste se mide

Se heredan los topes del contrato: p95(sampleSync) ≤2 ms, 100×totalObserverSyncMs/ventana ≤1%, ningún long task interactivo nuevo >50 ms atribuible. CPU real, wall-time, layout, GC, memoria lógica y heap físico se publican por separado. Una igualdad de decisiones no prueba neutralidad temporal.

| Tramo | Cargo obligatorio |
|---|---|
| Carga/setup | Verificación SRI incremental del navegador, parse/compile e inicialización del bundle, shim, factory, admin, registro y preflight. No esconderlo antes del primer sample; el coste anterior al primer clock QA exige profiler externo. |
| Staging | Captura del resultado original, WeakMap, alias/lease y clocks; también diagnóstico/Display no consumidos. |
| Entrada/evaluación | Validación de autoridad, clock/secuencia, selección, clones, QA0/evaluador/contabilidad; cero reevaluaciones C0. |
| Retención | Dimensionado UTF-8, recibos, ambas rings, evicción, correlación, pérdidas y actualización de estadísticas. |
| Stop/cleanup | Revocación, marca de gaps/censura, retiro solo de recursos QA; incluye coste residual de taps ya desactivados. |
| Export manual | Cierre real, todas las copias, codificación/serialización y resultado demasiado grande; sin ampliar denominador. |

Brackets síncronos usan el mismo performance.now confiable. Se conserva N, total, máximo y bins **no evictables**: límites superiores 0.125, 0.5, 1, 2, 4, 16, 50 ms y >50 ms, con borde exacto en 2 ms. Categorías propuestas: W2, W3, W4, C1, staging no primario, setup, cleanup, export. Guardar tiempos acumulados en unidades enteras conservadoras y acotadas, con overflow latch; no saturar ocultamente ni envolver contadores. El preflight tiene que demostrar que la codificación máxima cabe en sus 2048 bytes; etiquetas/overhead también cuentan.

La suma del observador es la **unión** de intervalos cargados, no la suma duplicada de padre/hijo. Si un tramo incluye layout comercial compartido que no se puede separar, cargarlo conservadoramente y declararlo. Externo incluye costes del reloj, brackets y actualización de estadísticas que el bracket interno omita. GC diferido atribuible fuera del tap se informa/carga en la unión externa pertinente, sin sumarlo de nuevo si ya estaba dentro. No llamar al ratio wall-time un porcentaje de CPU del proceso.

No estimar percentiles desde el detalle superviviente. Usar la cota superior del bin del percentil, no un punto inventado. Si incertidumbre/resolución del reloj hace cruzar 2 ms, el resultado es INCONCLUSO. No modificar COOP/COEP, privacidad, flags de aislamiento, cadencia o dispositivo para hacer pasar el presupuesto. No se añade PerformanceObserver, polling ni medición de rect/style en página.

## 3. Protocolo de medida futura, aún sin ejecutar

Antes de comenzar se aprobaría un run plan inmutable: navegador/build/OS/dispositivo/CPU/viewport, distribución y hashes, perfil de CSS/config cuando corresponda, caché/SW/proxy, visibilidad, throttling, cargas concurrentes, caminos y ventana. El controlador y el profiler son externos a la página. No se envían packets ni métricas automáticamente desde el producto.

Propuesta falsable inicial: **10 tríos** por distribución y perfil, cada ensayo con ventana fija de **120000 ms**, documentos frescos y orden balanceado O/N/E. O=original; N=copia II-B1 neutral con capacidad ausente; E=copia II-B1 con observador. O↔N mide el cambio de instrumentación/parseo, N↔E el trabajo de la colección, O↔E el coste total. No confundir N con el original ni usar E de GAM contra O de Manager. Un run plan de publicidad real deberá aprobar también el coste/volumen comercial; estos números no autorizan generar anuncios.

En fixtures aislados se reproducen los mismos estímulos y callbacks mediante el driver, con oráculo original. En página comercial los anuncios, red y subastas no serán idénticos: publicar confusores y dispersión; no atribuir causalmente cualquier diferencia entre navegaciones al observador. No inyectar requests, guards o activaciones para aumentar N. No extender ventana/tríos porque falten samples. Perfil sin N suficiente queda inconcluso.

El t0/t1 planificado se expresa en clock de página; la duración del denominador nunca cambia. Registrar aparte el cierre **efectivamente observado** y su latencia: no inventar endTime=t1 si la orden llegó después. Export/cleanup posteriores suman al numerador original. El controlador pararía la colección al final previsto; no se añade timer en página. Un tap posterior al deadline no adquiere otra muestra; stop usa tiempo real. Una desviación del protocolo que impida atribuir la ventana bloquea el ensayo, no se corrige ampliándolo.

Para aceptar el percentil de una categoría, propuesta N≥100 ejecuciones **originales** por distribución/categoría/perfil en el conjunto de ensayos predefinido, sin mezclar cold/warm, hidden/visible o variantes. Es un mínimo de descripción empírica, no una garantía estadística universal. Categorías raras con N menor se informan con N/máximo/cota e INCONCLUSO; su coste no desaparece del total. Las ventanas de estrés no publicitarias pueden generar escenarios sintéticos acordados; no acreditan frecuencia ni presupuesto de una página real.

Con herramientas externas futuras: traces por stack para script, style/layout y GC; muestras CPU de proceso separadas del wall-time; heap/retaining paths y asignaciones. **Cero lecturas adicionales QA de geometría/estilo** es un invariante estático/de efectos; cualquier forced layout directo añadido por QA es STOP. Las diferencias indirectas del layout original se cargan o quedan inconclusas. No envolver SDK ni crear rAF/RVFC/listeners para atribuir coste.

Snapshots de heap, pausas de debugger y otras operaciones intrusivas se ejecutan solo en ensayos diagnósticos separados; nunca se usan sus timings como medida sin perturbación. En los ensayos temporales no se fuerza GC. Tras GC natural, comparar el plateau y retaining paths a máximo de slots/rings/reemplazos; sin GC natural o sin separación fiable de la retención, no hay PASS físico. El driver libera todos sus handles de inspección y referencias antes de evaluar fuga; si los retiene, el ensayo queda contaminado.

Los topes físicos heredados son **propuestas pendientes de ratificación**, no aprobación de medición: heap retenido incremental ≤8 MiB/documento y pico transitorio incremental de export ≤16 MiB. Incluyen estado QA, código/glue incremental y copias temporales; no se sustituyen por el JSON lógico. Se propone además detener aceptación si una llamada de export añade >50 ms síncronos; sus long tasks se publican aparte y siguen sumando al 1%. Antes de II-B2 se ratifican estos topes y el run plan; no se presentan hoy como medidos ni como modificación del contrato congelado.

## 4. Criterios de parada y decisión

| Condición | Decisión / acción QA |
|---|---|
| Cuerpo/manifest/SRI/distribución o correspondencia de contexto no acreditados | BLOCKED antes de prueba; no ejecutar copia alternativa ni fallback de carga. |
| Capability/owner extranjero o retirado, hash declarado usado como autoridad, endpoint expuesto | STOP/markGap del ámbito; rechazo antes de watermark/ledger; preservar evidencia y no reactivar esa sesión. |
| Excepción propia QA o reloj regresivo/no finito/no confiable | STOP; error comercial original debe conservarse. Si no existe tiempo válido para close, export incompleto con close no acreditado, sin timestamp de relleno. |
| Guard reevaluado, false omitido, wait resuelto alterado, callback/timeout/request/layout nuevo o cambio comercial | STOP y FAIL de invariancia. Retirar QA del siguiente documento bajo rollback autorizado; no reparar el anuncio en curso. |
| Dato/lineage incompletos de una ruta declarada (legacy, root, anchor) | Unknown/gap explícito, sin completar desde éxito. Puede conservarse A de otras muestras; nunca B completo. |
| Gap nuevo no declarado, transición SPA/BFCache ambigua o callback rebautizado al owner nuevo | STOP; intervalo no acreditado. La ausencia de evento no prueba continuidad. |
| Ring lleno | Evicción de detalle y pérdidas/secuencias explícitas; no borra latch ni resúmenes. Entrada oversized se descarta con contador. |
| Oportunidad 65, metadatos/autoridad/resúmenes/agregado o counter overflow | STOP QA, accounting/coverage insuficientes; no desalojar oportunidad ni contar notificaciones como únicos. |
| p95 cota >2 ms, ratio >1%, long task interactivo añadido >50 ms, tope físico ratificado excedido | STOP y FAIL de presupuesto. No muestrear menos, recortar campos, elevar límites o agrandar denominador para pasar. |
| Atribución CPU/layout/GC/heap incompleta, N insuficiente, coste del staging/export omitido | INCONCLUSO/BLOCKED para aceptación de coste, aunque tests funcionales pasen. |

No puede deshacerse un tap síncrono o un pico de asignación que ya ocurrió. Los umbrales retrospectivos paran la adquisición siguiente; no garantizan preempción de una tarea larga ni recuperación de OOM/crash. La evaluación externa y los topes preventivos de retención reducen riesgo; no se declara que el catch QA garantice inmunidad del navegador.

## 5. Máquina de stop, export y cleanup

Estados de sesión propuestos: INACTIVE → ACTIVE → STOPPED → DISPOSED; cualquier error desde ACTIVE lleva a STOPPED. No hay ACTIVE después de STOPPED ni setters de sourceComplete. Incompatibilidad antes del arranque queda INACTIVE con motivo. La transición solo afecta QA.

Stop invalida la celda de sesión y todos los leases por dependencia, marca gaps/censura reales y cierra QA0 si hay timestamp confiable ≥última observación. No cambia promises, waits, IO, rootMargin, timers, leases de standby, creative.abort/destroy, SDK, PiP, reveal, refresh o recuperación Display. Callbacks comerciales viejos continúan con sus propios controles; el tap hace como máximo la comprobación QA desactivada, sin rearmar nada.

Export manual sella primero la ventana con tiempo real, conserva motivo, pérdida y ambos niveles A/B. Copia solo escalares/packets/recibos saneados y QA0 original anidado; no funciones/capabilities/DOM/SDK, URLs/XML/cookies/newsID/targeting/campañas. Máximo de serialización 2097152 bytes: si no cabe, export-too-large, sin JSON parcial ni reset. Clonar el export no autentica sus packets. Export repetido no borra pérdidas ni abre otra ventana. Si no puede cerrarse por clock inválido, declarar el cierre desconocido, no convertirlo a un evento terminal ficticio.

Dispose, bajo orden explícita, retira únicamente admin/estadísticas/referencias QA propios, suelta las tablas y buffers y deja las celdas revocadas para closures antiguas. La factory conserva el veto débil por Document: otro Manager/slot en ese documento no puede reabrir QA tras dispose. No toca mapas/probes/coordinador ajenos. El propio cleanup y el coste residual con sink desactivado se perfilan en una ventana separada fijada de 30000 ms; no se añaden timers para ello dentro de la página. No prometer liberación instantánea del heap: GC y handles externos se inspeccionan aparte. Exportar o disponer no modifica la membresía histórica de QA0 para obtener otra tasa.

## 6. Rollback con hashes antes/después

**Hoy:** solo se añaden documentos II-B0. Before = [preflight](intext-p14b-qa1b-II-B0-preflight.json), 411 archivos; after debe dar los mismos 411 SHA/tamaños y HEAD, con nuevas rutas exclusivamente II-B0. El `.sty` sigue 3940 bytes/hash aprobado. No se hacen reset/checkout/restore, ni commit/push/merge.

**Futura II-B1 offline:** build en directorio nuevo de allowlist, nunca sobre II-A/originales. Manifiesto con entradas padres, hashes exactos de todos los ficheros nuevos, wrappers y transformaciones reversibles. La prueba de inversión produce bytes base/padre en memoria y contrasta hashes; no sobrescribe esos padres. Reversión de archivos: retirar solo la lista nueva después de verificar su hash y ruta dentro del destino permitido. Cualquier fichero inesperado o alterado bloquea la limpieza automática para revisión.

**Futura prueba browser:** primero STOP QA y export manual si es posible; retirar opt-in del controlador y restaurar el punto de inclusión original auditado en la **siguiente navegación autorizada**. La configuración de despliegue/HTML real no se edita ni se inventa en II-B1; requiere su propia autorización y hash before/after. No borrar/reemplazar script o reinstanciar originales en un documento vivo, ni cancelar/repetir la subasta actual. Documento nuevo sin QA debe coincidir con el baseline comercial; las copias II-A permanecen inertes en disco.

Criterio de rollback PASS: originales, cuatro contratos, QA0/QA1-A, I/I-01/II-A, probes/coordinador/bundles y cualquier configuración no autorizada conservan hashes; únicamente las rutas autorizadas nuevas o el opt-in expresamente aprobado cambian. Callbacks/timers comerciales siguen su cleanup nativo; no consta tráfico/efecto adicional por rollback QA. Si no se puede demostrarlo, rollback INCONCLUSO/BLOCKED, no declarar «todo restaurado» por tener cero packets.

Tras cualquier STOP o rollback, revisión independiente y otra autorización para una nueva sesión/prueba. No avanzar a geometría, outcomes, III–IV o enforce por haber superado un presupuesto B0.
