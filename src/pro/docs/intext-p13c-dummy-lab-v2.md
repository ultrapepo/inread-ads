# P1.3c — corrección del laboratorio dummy (QA v2)

Actualización posterior: los resultados Chrome v2 y el laboratorio v3 con replay estable y candidato independiente se documentan en [la revisión de replay/dummy QA](intext-p13c-dummy-replay-review.md). Este informe conserva los resultados y comandos históricos de v2.

Solo se modifica el laboratorio de media. Las dos distribuciones P1.3b, probe R1 y copia manual de ad-break permanecen intactos. No hay enforce, cambio de dummy comercial, commit, push ni despliegue. P1.3c sigue abierta.

## Qué demuestra el JSON recibido

Original: `Downloads/intext-dummy-lab.json`, schema v1, fecha `2026-10-19T16:46:03.812Z`, SHA256 `dd3202f5c82fb4065c82c1f73134483e3c79c03a5fc3f863f420d595cb358f9e`. Se conserva sin editar. Resumen de evidencia en `intext-p13c-dummy-lab-v2-evidence.json`.

| Caso | Resultado | Evidencia y límite |
|---|---|---|
| Native/dummy | dos timeouts | sin metadata/error registrado; Promise rechazada por pause, sin instante del rechazo |
| Native/control | dos timeouts | stalled a +3317 ms, sin loadedmetadata; no prueba un fallo de códec |
| Video.js/dummy | dos timeouts | abort/emptied/nuevo loadstart a +981 ms; no hay primer ciclo terminado |
| Video.js/control | timeout y luego ended | reinicio a +8996 ms; segundo play a +27394,5 ms, metadata a +27400,3 ms, playing a +27621,3 ms, ended a +37683,3 ms |

Ese único ended confirma reproducción del control de **10,0078 s, 444×250**, readyState=4, sin mediaError, en ese intento de recuperación Video.js. No valida dos ciclos ni baseline native.

El reinicio de +8996 ms no pertenece al dispose final: el caso acaba a +37689,5 ms. El harness anterior no registraba las llamadas reales de load/src/play, player.ready ni el instante de resolución/rechazo de cada Promise. Por ello **no puede identificarse el autor del reinicio** con ese JSON. Sí se confirma en el código que asignaba un `<source>` antes de inicializar Video.js y llamaba play sin esperar ready: una reconfiguración asíncrona del tech es una hipótesis verificable, no una causa probada del reset a +9 s.

También se confirma un defecto del ensayo: tras un timeout empezaba otro play sobre el mismo elemento aunque el anterior siguiera pendiente. Las callbacks podían modificar `play.promise` después de tomar el snapshot terminal. Durante cleanup se ejecutaban pause/load/dispose después de retirar los listeners. Esto permite que los AbortError de limpieza aparezcan como rechazos de los intentos sin el contexto temporal necesario. No se atribuyen todos los AbortError al cleanup: el texto «new load request» también exige correlación con las operaciones anteriores.

El segundo intento de Video.js/control comienza a +27,394 s pese al límite nominal de 15 s del primero. Sin marcas de entrada/retorno de play, deadline, visibility y callback del timer no puede repartirse esa demora entre bloqueo síncrono, timer tardío u otras causas. El nuevo harness registra esos hitos y el drift; no lo adjudica retroactivamente a red, IMA o CSP.

El aviso CSP sobre la ruta auxiliar de DevTools no es un HTMLMediaError ni evidencia de fallo del MP4. No se habilita esa ruta ni se relaja connect-src.

## Cambio del harness

- Cuatro botones independientes; ningún auto-run ni bucle de escenarios. Cada pulsación crea nuevo elemento, player, listeners y estado; no se permite concurrencia. El JSON conserva cada ejecución con case id y enlace al intento anterior.
- HTTP local es la baseline por defecto. Seleccionar data URL o blob crea otro caso/transporte con los mismos bytes. No se mezclan resultados de transporte para validar controles.
- Native: elemento vacío, listeners, source directo, load explícito **antes de play**, espera bounded de loadedmetadata, primer play. Se evita depender exclusivamente de errores de un `<source>` hijo.
- Video.js: elemento vacío, creación 7.20.3, **player.ready**, identificación del video real, listeners, una asignación de source y load antes de play. No se suministra source al constructor. Las llamadas internas adicionales de load/play/pause quedan observadas.
- Replay solo después de ended, Promise resuelta, ningún play pendiente y ningún mediaError. Se busca tiempo 0 sin cambiar src ni llamar load. Si falla el primero, se omite el replay. Pulsar de nuevo crea una recuperación independiente (`runKind=recovery`), que no cuenta el intento fallido anterior como primer ciclo válido.
- Un timeout es `lab_timeout`, distinto de `media-error` y `play-rejected`. Se conserva `promiseAtTerminal` y el instante posterior de settlement; un rechazo posterior no reescribe el motivo terminal.
- Cleanup permanece observado. Si queda un play pendiente, se registra **cleanup_intentional_play_interrupt**, se pausa para liquidarlo y se espera 250 ms antes de destruir. Un reset forzado todavía necesario queda marcado. Si la Promise sigue pendiente después del dispose, se informa y se exige recargar la página antes de otro ensayo. Esta es la excepción de interrupción deliberada de cleanup, nunca una recarga automática para intentar reproducir.
- Estado registrado: HTMLMediaError.code/message, currentTime, duration, currentSrc/src, networkState, readyState, dimensiones, paused, ended, visibility, phase, stage e identidad de media. Los data URL completos se conservan una sola vez en `sourceTable`, referenciados por `currentSrcRef`/`srcRef`; evita repetir ~665 kB en cada evento.
- Las wrappers temporales de load/play/pause son **de instancia y no estrictamente pasivas**. Se restauran al finalizar; no modifican prototipos ni producción. El ensayo prueba corrección funcional, no mejora de rendimiento.

Límites exclusivamente del laboratorio: ready 5 s, metadata 15 s, cada reproducción 15 s, ventana de observación de cleanup 250 ms. Ningún timeout comercial cambia. Cada espera registra deadline/elapsed/drift. La visibilidad debe mantenerse durante toda la ejecución para poder validar el control.

`controlValidated=true` exige que native **y** Video.js, en el mismo transporte, hayan terminado dos ciclos cada uno con metadata, playing, Promise resuelta ya en el terminal, tiempo/dimensiones válidos, ausencia de error y dispose correcto, sin Promise pendiente. `controlsByTransport` indica exactamente cuál pasó. El campo no certifica los transportes no probados ni el dummy. Un caso fallido más reciente invalida su control para ese transporte.

## Chrome: guía de ejecución

Desde el directorio `src/pro`:

```powershell
node tests/qa/intext-p13c-dummy-lab.cjs prepare
node tests/qa/intext-p13c-dummy-lab.cjs serve
```

1. Abrir `http://127.0.0.1:8134/` en Chrome normal, sin Fiddler ni scripts de la página publicitaria. Si ya había un servidor anterior, detenerlo con Ctrl+C y reiniciarlo; recargar la pestaña. El JSON nuevo debe indicar **schema v2**.
2. Mantener la pestaña visible. No tocar controles de reproducción durante un caso. No activar flags especiales de autoplay, no cambiar permisos, no cargar SDK ni anuncios.
3. Dejar **HTTP local** y pulsar **1. Native/control**. Esperar primer ended y replay/ended. Si falla, guardar JSON y parar esa comparación: no hay baseline validada. Pulsar otra vez es recuperación, no continuación del mismo primer ciclo.
4. Si pasa, pulsar **2. Video.js/control**. Confirmar `controlsByTransport.http.validated=true` solo tras los dos controles correctos.
5. Ejecutar **3 y 4**, cada uno por separado. Sus fallos no cambian los bytes del control ni se contabilizan como media error si solo hay timeout.
6. Seleccionar **data URL**, repetir primero los dos controles y luego los dos dummy. Hacer lo mismo con **blob URL** si se necesita discriminar transporte. No mezclar un native HTTP con un Video.js data para afirmar baseline.
7. Guardar JSON con el botón tras cada fase; conservar consola y Network con Preserve log. Si aparece «Play still unresolved after disposal», guardar y recargar antes de continuar. No lanzar un segundo ensayo sobre el elemento que quedó pendiente.

HTTP añade solo las rutas locales `/media/control.mp4` y `/media/dummy.mp4`, con MIME video/mp4 y GET/HEAD/Range 200/206/416. Los bytes/hash son idénticos a los fixtures data/blob originales (control 498319 bytes, dummy 807 bytes). CSP permite media del mismo origen, data y blob; **connect-src sigue none**, sin recursos/SDK externos ni tracking. Servidor ligado exclusivamente a 127.0.0.1. La comprobación auxiliar DevTools puede seguir bloqueada y se mantiene separada de los eventos media.

## Archivos y validación

Cambios: `tests/qa/intext-p13c-dummy.js`, `tests/qa/intext-p13c-dummy.html`, `tests/qa/intext-p13c-dummy-lab.cjs`. Nuevo `tests/intext-dummy-lab.audit.test.cjs`; esta guía, evidencia y salida de tests. Assets locales regenerados dentro del directorio ya ignorado por Git. No se modifica la copia manual de ad-break ni el informe R2 histórico.

Tests del harness: **17/17 PASS**. Incluyen orden ready/source/load/play, replay estricto, elementos nuevos, concurrencia, timeout con Promise pendiente, cleanup AbortError, error espontáneo, recuperación explícita, hidden, fuentes data/blob, validación por transporte y HTTP Range/CSP. Son pruebas con media y Video.js simulados: no demuestran decodificación en Chrome.

Suite completa: **1210/1210 PASS**, 0 fail/cancelled/skipped/todo (1193 anteriores +17 nuevos), 9891.7477 ms. Salida: `intext-p13c-dummy-lab-v2-validation.txt`. Se utiliza el adaptador externo ya establecido para subprocesses Git/sintaxis bloqueados en el sandbox, contrastados directamente con sus salidas/hashes; no reemplaza los tests. Comando: `node --require <adaptador de entorno temporal> --test --test-isolation=none tests/*.test.cjs`.

`node --check` de los dos bundles, ambos scripts del laboratorio y nuevo test: PASS. HTTP real local: HTML 200, MP4 control completo 200 con hash coincidente, rango 206 y dummy HEAD 200: PASS. `git diff --check` y reverse-check del parche R1: PASS. Hashes productivos P1.3b conservados; figuran junto con los del probe y de los scripts manuales en la evidencia.

**No se ha ejecutado una nueva reproducción Chrome con v2 desde este entorno.** El único resultado real de media sigue siendo el JSON recibido. No se declara corregida la reproducción native/control, validado el control completo ni resuelta P1.3c. La nueva captura debe discriminar source/tech setup, transporte, error media y cleanup antes de proponer cambios comerciales.
