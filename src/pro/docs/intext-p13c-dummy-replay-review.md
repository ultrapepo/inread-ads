# P1.3c — replay del laboratorio y sustitución de dummy exclusivamente QA

**Candidato de un frame retirado:** los resultados Chrome v3 mostraron EOF inmediato. Este documento conserva evidencia histórica, no recomienda esa fuente. El fixture temporal corregido, los hashes vigentes y la guía actual están en [la revisión de timeline](intext-p13c-dummy-timeline-review.md).

P1.3c abierta, enforce deshabilitado. Sin commit, push, despliegue o modificación de los bundles productivos. Versión comercial conservada: `2026.10.07-p1-ima-preload-first-frame`.

## Evidencia real recibida

Se leyeron los cuatro originales `intext-dummy-lab-v2.json`, `(1)`, `(2)` y `(3)` de Downloads. Son exports parcialmente acumulativos: el segundo contiene también native/control y el cuarto también native/dummy. Son **cuatro casos únicos**, no seis ensayos independientes. Sus hashes, timestamps, snapshots y eventos relevantes se conservan en `intext-p13c-dummy-replay-inputs.json`; no se editan los originales.

| Caso Chrome 155, HTTP local | Resultado real |
|---|---|
| Native/control | dos ended, duración 10,0078 s, 444×250, Promise resuelta, sin error, dispose correcto |
| Video.js/control | primer ended; segundo play interrumpido por pause y AbortError antes de cleanup |
| Native/dummy | error código 4 / DEMUXER_ERROR_NO_SUPPORTED_STREAMS a +28,8 ms, antes de metadata/play |
| Video.js/dummy | mismo error a +107,7 ms, antes de metadata/play |

En Video.js/control: ended **10428,5 ms** → seek **10428,6** → play **10428,9** → pause **10429,2** → rechazo **10430,9** → cleanup. El harness no llama pause en esa rama de playback; la marca stage=play descarta atribuir esa llamada al cleanup posterior. **El stack del llamante no existe en v2**, por lo que no se identifica retrospectivamente como Video.js u otro actor.

El JS real 7.20.3 capturado en el HAR (hash `46763816babdcf547c1cbedf9a54a7295648cbc1ae648f5620c8e11264b01fcc`) contiene en handleTechEnded_: quitar clases → comprobar loop → `this.paused() || this.pause()` → emitir ended del player. Nuestro listener native ended estaba instalado antes de Video.js y resolvía una Promise; v2 continuaba inmediatamente con seek/play, sin esperar ended del player ni seeked. Una continuación entre listeners nativos puede modificar paused/ended antes del manejador restante: **carrera concreta y reproducible en el modelo de ordenación**, compatible con la captura. Todavía hace falta el stack Chrome para demostrar que explica exactamente esa pausa real.

Los errores del dummy sí son fallos de carga/decodificación anteriores a reproducción. No corresponden a una interrupción de play ni a dispose. El flash de la superficie del laboratorio acompaña el montaje y eliminación rápida de ese caso; no se cambia loading UX comercial para ocultarlo.

## A. Cambio QA del replay

Harness schema **p13c-dummy-lab-result-v3**:

1. Tras un primer ended válido, cede una tarea para permitir terminar el despacho native ended. En Video.js exige también el evento público ended del player.
2. Instala la observación de seeking/seeked antes de cambiar currentTime. Si es necesario un seek, espera seeked y datos suficientes; no cambia src ni recarga.
3. Cede otra tarea después de seeked y comprueba: sin Promise pendiente/error, seeking=false, ended=false, paused=true, currentTime próximo a 0 y readyState>=2. Solo entonces lanza el segundo play.
4. Si no llega ended del player o seeked/estado estable, termina la espera con diagnóstico y **omite el replay**. No reintenta play. El límite de estas esperas es 2 s exclusivamente de laboratorio, sin polling.

Eventos nuevos: replay_ended_dispatch_wait_started/complete, player_ended, seeking/seeked, replay_ready/replay_blocked. player_api_call y media_api_call distinguen capas. Las llamadas pause registran stack completo, caller explícito del harness o **unattributed**, viaPlayer, phase/stage y Promise pendiente. Una llamada asíncrona no hereda artificialmente el caller del harness. Los wrappers siguen siendo solo de instancia y se restauran al finalizar; son instrumentación QA, no observación sin efectos de coste.

Los invariantes de v2 permanecen: casos separados, elementos nuevos, transportes separados, errors/timeouts/cleanup distinguidos, interrupción deliberada registrada si se necesita destruir un play pendiente, dos ciclos correctos para validar cada motor/transporte. Se añaden botones del candidato, con candidateValidated/candidatesByTransport **separados** de controlValidated/controlsByTransport del MP4 de control. Ninguna aprobación de un fixture certifica el otro.

## B. Dummy QA propio, sin contenido publicitario

Se genera localmente un MP4 completo, progresivo, de **6841 bytes, 64×64, 1 segundo, un IDR negro, sin audio**, AVC Constrained Baseline nivel 1.0 (`avc1.42C00A`), YUV420 limitado. El generador escribe SPS/PPS, macroblocks I_PCM negros y tablas MP4; no toma imágenes/bytes de Sponsorship, HAR ni otro vídeo. Sin recursos remotos ni dependencias nuevas.

SHA256: **16988373d3ea7d2d6c7a901b9511228626729ee45d46f6cbb218ad34ec5e21d8**. Archivo local generado: `tests/qa/generated/dummy-lab/candidate.mp4`. El prototipo exploratorio 16×16 no produjo frame en el decoder local y se descartó; no se distribuye como variante válida. No se generaliza esa observación a una limitación universal del navegador.

**Validación real local del candidato elegido:** Windows Media Foundation, solicitando salida H264→NV12, compilación y ejecución externas al proceso Node:

```json
{"decoder":"Windows Media Foundation H264 to NV12","frames":1,"eos":true,"width":64,"height":64,"decodedBytes":6144,"expectedBlackPixels":true}
```

Código de salida 0. Se inspeccionaron los 6144 bytes decodificados: luma 16 y cromas 128, imagen negra. Esto prueba decodificación local y contenido del fixture, **no reproducción Chrome/Video.js, compatibilidad con todos los dispositivos ni snapshot/restore de IMA**. La fuente/reproductor comercial no se modifica. El helper reproducible es `tests/qa/intext-p13c-dummy-decode.cs` y la salida original `intext-p13c-dummy-decoder.json`.

`intext-p13c-dummy-source-build.cjs` exige los hashes P1.3b de partida y crea, para cada distribución, una copia control byte a byte y una variante que cambia **solo el literal data URL de createVideoElement**. Prefix/suffix idénticos y reversión exacta comprobados. Sin probe añadido, cambio de versión, fuente publicitaria, llamadas extra, configuración o lifecycle. El recurso sigue embebido: tampoco añade una petición HTTP de contenido base en InText.

| Archivo | SHA256 |
|---|---|
| Control _gam_kv_.js | 1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690 |
| QA negro GAM | a26e52e5032d0640bb0763ee94b5052db86c9c0c575c646484acc0610f7d06c7 |
| Control IntextManager.js | ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8 |
| QA negro manager | 3629ed368f84b26088d858505cf8f54cc6edb8e19fe32f6623084280ad023fb4 |

Diff de las copias: `intext-p13c-dummy-source-only.patch`; manifiesto y paths: `intext-p13c-dummy-source-build.json`. Una línea cambiada por distribución, únicamente la URI. No aplicar ese patch al bundle productivo.

## Ejecución sencilla: primero laboratorio, después Fiddler

```powershell
node tests/qa/intext-p13c-dummy-lab.cjs prepare
node tests/qa/intext-p13c-dummy-lab.cjs serve
```

Detener el servidor anterior antes de reiniciar. Abrir/recargar `http://127.0.0.1:8134/`, mantener visible y comprobar schema v3. HTTP local por defecto: native/control, Video.js/control; verificar dos ciclos y revisar stacks de cualquier pause durante replay. Después native/candidato negro y Video.js/candidato negro: ambos deben completar dos ciclos sin error, con dispose y validación candidateValidated. Repetir data/blob si hace falta; no mezclar transportes. Guardar **intext-dummy-lab-v3.json**, consola y Network/Performance con Preserve log. No usar la superficie del laboratorio como prueba de reveal de Intext.

Sigue siendo media local sin IMA/GAM/VAST/tracking. CSP bloquea red externa y connect-src sigue none. Solo se añade `/media/candidate.mp4` local, con el mismo soporte Range del laboratorio. HTTP real local devolvió 200 y el hash de 6841 bytes esperado. El aviso auxiliar de DevTools continúa separado de HTMLMediaError.

Generar controles y variantes del core:

```powershell
node tests/qa/intext-p13c-dummy-source-build.cjs
```

En Fiddler, en la regla **exacta de JS Intext ya utilizada**, seleccionar por turno:

- bundle GAM: `tests/qa/generated/intext-dummy-original-gam.qa.js` y `intext-dummy-black-gam.qa.js`;
- distribución manager, solo si esa es la cargada por el sitio: los equivalentes `original-manager` y `black-manager`.

Una sola sustitución activa por prueba. No sustituir las dos distribuciones a la vez, GPT, Prebid, APS, SDK IMA, dependencias, VAST, MP4 publicitario ni píxeles. No usar Lifecycle C, copia manual ad-break, deadlines enforce o cambio comercial. En esta comparación mantener desactivado el probe adicional; si después hace falta instrumentación R1, debe ser un brazo separado y simétrico. Guardar el cuerpo del JS servido y verificar hash, sin confundir igual versión con igual variante.

Marca, mismo artículo/campaña Sponsorship existente, dispositivo y condiciones de scroll/caché comparables. No fijar ni reescribir random, PSP, targeting, consentimiento o selección de creatividad. Registrar las autoridades reales, ids de creatividad/adUnit/ciclo y diferencias legítimas de demanda. El Sponsorship sigue siendo **el anuncio servido por GAM**, nunca el contenido base del candidato.

Antes de autorizar producción, capturar en Chrome desktop y mobile (y dispositivos objetivo):

- Primer ciclo completo, native IMPRESSION/COMPLETE, primer frame real del anuncio y reveal/animación/PiP correctos; una sola request/impresión por ciclo.
- Salida/reentrada y documento oculto antes/después de STARTED, sin reveal tardío indebido; error/fallback auto y video_only conforme al waterfall actual.
- Tras COMPLETE, grabación de pantalla y estados de source, paused/currentTime, snapshot/restore, content events y superficies: **ningún playback visible de contenido base ni falsa señal de frame/reveal**. Una imagen negra en un wrapper abierto cuenta como incidencia, no éxito.
- Segundo ciclo/refresh, navegación y destroy durante awaits: sin instancias, callbacks o tracking tardíos; sin error de restore, doble petición, impresión o reapertura. La duración de 1 s es una variable del fixture: puede producir contentended al restaurar, precisamente uno de los riesgos a validar.
- JSON del debugger, consola con stack completo, HAR/SAZ con XML VAST/wrappers/MP4 y conteos de tracking, más vídeo de pantalla. No afirmar identidad de creatividad únicamente por compartir adUnit.

No se ha ejecutado aquí este ensayo InText ni el replay v3 en Chrome. Sin esos datos no se declara segura la sustitución ni resuelta P1.3c.

## Validación y alcance

Tests afectados: **27/27 PASS** (22 harness +5 fixture/build). Se mantienen los 17 anteriores; se añaden 10 regresiones para orden ended/seeked, ausencia de señales, stacks/caller, candidato separado, estructura/píxeles AVC y modificación exclusiva de URI en ambos bundles.

Suite completa: **1220/1220 PASS**, 0 fail/cancelled/skipped/todo, 19415.8324 ms. Comando con el adaptador externo de comprobaciones Git/sintaxis ya establecido: `node --require <adaptador de entorno temporal> --test --test-isolation=none tests/*.test.cjs`. Sus entradas se contrastan con Git/sintaxis ejecutados directamente y hashes; no sustituye pruebas ni simula SDK real. Salida: `intext-p13c-dummy-replay-validation.txt`.

`node --check`: 12 archivos (dos bundles productivos, cuatro scripts QA, dos tests y cuatro copias generadas), PASS. Compilación C# y decoder real, PASS. `git diff --check`, comprobación de whitespace de archivos nuevos y reverse-check R1, PASS. Evidencia de hashes/decoder/HTTP: `intext-p13c-dummy-replay-evidence.json`.

Archivos tocados en esta iteración: tres archivos existentes del laboratorio y su test; nuevos generador de fixture, builder fuente-only, helper de decoder, test de fixture/build y documentación/evidencia. Generados bajo el directorio QA ya ignorado por Git. **Hashes P1.3b, probe R1 y copia manual ad-break sin cambios**. Tampoco se modifican GAMExp, WindowArray, PSP, Prebid, pisos, random, IMA, first-frame/reveal, PiP, animación, timeout ni fallback. El árbol conserva los cambios sin commit anteriores a esta iteración.

CodeMemory consultado antes de modificar y reindexado al terminar, modo fast sin artefactos. El grafo sigue sin devolver los helpers nuevos del laboratorio; código actual, hashes, pruebas y capturas siguen siendo la fuente de verdad. Los archivos de evidencia Windows se normalizan a LF sin cambiar sus valores.
