# P1.3c — candidato temporal v2 y validación del Lab v3

P1.3c sigue abierta. Enforce deshabilitado. Versión comercial conservada: `2026.10.07-p1-ima-preload-first-frame`. Sin cambios productivos, commit, push o despliegue.

## Seis casos reales de Chrome 155

Se leyeron los seis JSON v3 originales de Downloads y se deduplicaron por timestamp de sesión/caseId: **seis casos únicos**. Los hashes y casos completos están en `intext-p13c-dummy-v3-inputs.json`. Los exports originales no se modifican.

| Caso HTTP | Evidencia real | Conclusión |
|---|---|---|
| Native/control | playing válido; hidden +6030,7 ms → pause +6031 ms; timeout | No validado: repetir manteniendo visible |
| Video.js/control | dos ended/Promise resueltas; player_ended, seeking, seeked, replay_ready; sin AbortError | Replay v3 validado funcionalmente para este control |
| Native/dummy original | HTMLMediaError 4 / DEMUXER_ERROR_NO_SUPPORTED_STREAMS antes de metadata/play | Defecto original confirmado |
| Video.js/dummy original | mismo error | Defecto original confirmado |
| Native/candidato de un frame | ended +17,5 ms, playing observado con paused=true/ended=true; seeked conserva ended=true | Candidato anterior no apto; gate bloquea correctamente |
| Video.js/candidato de un frame | ended +31,8 ms, misma anomalía de estado/seek | Candidato anterior no apto; gate bloquea correctamente |

Estos datos no atribuyen retrospectivamente la pausa v2 a Video.js. La prueba nueva sí confirma que el replay estricto funciona con el control Video.js cuando llega un estado estable.

**Corrección de la validación anterior:** decodificar un único frame negro y recibir EOS no garantizaba una secuencia reproducible de un segundo. El MP4 anterior tenía una sola muestra/PTS=0, aunque declarase duración 1000 ms. Chrome confirma que esa duración declarada no se tradujo en playback temporal; el fixture de un frame queda retirado de las variantes QA actuales.

## Fixture corregido: contenido propio, no publicitario

`intext-p13c-dummy-candidate.cjs` genera ahora **25 fotogramas a 25 fps**, 64×64, negro limitado YUV420, sin audio, AVC Constrained Baseline nivel 1.0 (`avc1.42C00A`). Primer IDR con píxeles propios negros y 24 P frames con predicción de las referencias; no se toman bytes de GAM, HAR, Sponsorship ni clips externos.

MP4 progresivo completo: stts=25×40 ms, stsc/stsz con 25 muestras, primera muestra sync, offsets y tamaños completos. SPS incluye timing fijo de 25 fps; sin B frames ni desfase entre DTS y PTS. PTS **0,40,…,960 ms**, cada duración **40 ms**: cobertura **1000 ms**.

- Tamaño: **7141 bytes** (solo 300 bytes más que el prototipo de un frame).
- SHA256: **410e77398580e6b470c0f5c2297d32484cbb29b9765133f7703038fc24ed753d**.
- Manifiesto: `p13c-black-fixture-v2`; fichero local generado `tests/qa/generated/dummy-lab/candidate.mp4`.

### Validación local real, sin SDK publicitario

Windows Media Foundation H264→NV12, helper C# compilado y ejecutado directamente:

| Recurso | Frames | PTS/duración | Píxeles | Resultado |
|---|---:|---|---|---|
| Nuevo | 25 y EOS | 0…960 ms, todos 40 ms | 153600 bytes NV12, todos negros | exit 0, timingValid=true |
| Anterior, preservado para contraste | 1 y EOS | PTS=0, duración 1000 ms | 6144 bytes negros | exit 2 esperado, timingValid=false |

Salidas: `intext-p13c-dummy-timeline-decoder.json` y `intext-p13c-dummy-single-frame-rejected.json`. Esto valida **decodificación multiframe y tiempos de presentación**, no reproducción a reloj real en Chrome. No se sustituye el ensayo de navegador por la velocidad a la que decodifica SourceReader.

## Lab v3: criterios temporales añadidos, gate conservado

Se mantiene schema v3, con `harnessRevision=candidate-timeline-v2`. **No se modifica prepareReplay/stableForReplay:** sigue exigiendo ended del player cuando corresponde, seeked, seeking=false, ended=false y estado estable. No fuerza play ni ignora un ended persistente. Los límites de espera de seek y los timeouts comerciales permanecen intactos.

Solo para validar el candidato se añade evidencia por ciclo:

- playing debe observar paused=false, ended=false y no seeking/error. La mera existencia del evento sigue registrándose separada de esa confirmación activa.
- timeupdate debe mostrar progreso mientras se reproduce, anterior al ended; se conservan hasta ocho muestras separadas, sin polling.
- duration debe corresponder al segundo esperado (tolerancia de laboratorio 50 ms), playbackRate=1, con al menos dos muestras activas y avance entre ellas de 0,2 s.
- playing activo→terminal debe durar al menos el 75% del segundo esperado (**750 ms**). Es un criterio QA para detectar EOF inmediato, no un timeout ni un indicador de rendimiento comercial. No se declara mejora de latencia/viewability a partir de estos tiempos instrumentados.
- Dos ciclos completos, Promise resuelta ya en el terminal, visibilidad continua, metadata, dimensiones/estado válidos y cleanup correcto siguen siendo obligatorios.

Cada play expone temporalEvidence/temporalAssessment. El caso expone candidateAssessment con motivos como playing-not-active, ended-too-soon, insufficient-observed-progress o replay-not-ready. candidateValidated y candidatesByTransport solo aceptan ambos motores en el mismo transporte. La declaración duration=1 o un segundo ended inmediato ya no pueden bastar para aprobar.

Regresiones nuevas: fallo de un segundo/EOF inmediato y seeked con ended=true en ambos motores (sin segundo play), dos EOF rápidos aunque el seek parezca estable, criterios de actividad/progreso/ritmo, y contraste directo con los seis casos Chrome recibidos. Los tests de playback del harness usan relojes/media simulados y no generan resultados de Chrome.

## Variantes QA regeneradas

El builder no cambia su regla: control P1.3b byte a byte y variante con **un solo literal data URL cambiado**. Sin código adicional, configuración o llamada nueva a IMA/play/start/request; sin nueva petición HTTP de contenido base en InText. Prefix/suffix y reversión exacta se comprueban en ambos bundles. La URI nueva aumenta el JS sin comprimir en 8448 bytes frente al dummy comercial; no se extrapola su efecto de red sin medirlo.

| Copia | SHA256 |
|---|---|
| Control GAM | 1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690 |
| QA negro GAM | **64a21cf4beb13e4492d706151fc5370e9048605fa7ae671560b3cf544aeea000** |
| Control manager | ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8 |
| QA negro manager | **8177b076f68531addd08386f49c16ad504cd29df4f07752edb36093ac67b6537** |

`intext-p13c-dummy-source-build.json` y `intext-p13c-dummy-source-only.patch` se actualizaron al fixture temporal. Los hashes previos del negro de un frame quedan obsoletos. No aplicar el patch a producción.

## Repetición breve en Chrome: HTTP y después data URL

```powershell
node tests/qa/intext-p13c-dummy-lab.cjs prepare
node tests/qa/intext-p13c-dummy-lab.cjs serve
```

1. Detener antes cualquier servidor antiguo. Recargar `http://127.0.0.1:8134/`. Comprobar revisión **candidate-timeline-v2**, manifiesto **25 frames** y hash **410e…753d**. Mantener la pestaña delante, sin ocultarla durante cada caso.
2. Con **HTTP local**, repetir **Native/control** y esperar sus dos ciclos de ~10 s. Si se oculta o falla, no validarlo: guardar y repetir como caso nuevo visible.
3. Ejecutar **Native/candidato negro** y **Video.js/candidato negro** por separado. Cada uno debe mostrar aproximadamente un segundo real por ciclo, progreso activo, seeked con ended=false, dos ended/Promise resueltas y dispose correcto. Revisar temporalAssessment.valid en ambos plays y candidatesByTransport.http.validated.
4. Seleccionar **data URL** y repetir esos tres casos en el mismo orden. Revisar candidatesByTransport.data; no mezclar native HTTP con Video.js data para aprobar. Cada botón crea una instancia nueva.
5. Guardar `intext-dummy-lab-v3.json`, consola y Network/Performance por fase. El éxito Video.js/control ya observado no se importa al estado del nuevo JSON: si se desea controlValidated=true agregado, repetir también ese control en el transporte elegido; sus flags por motor permiten evaluar Native/control por separado.

El laboratorio conserva red exclusivamente local y sin SDK/tracking; no se abre CSP externa. El recurso HTTP y la data URL se generan con los mismos bytes. La prueba del usuario debe determinar el reloj real del nuevo vídeo y su reentrada/replay; aquí **no se han ejecutado nuevos casos Chrome**.

Para regenerar las copias fuente-only:

```powershell
node tests/qa/intext-p13c-dummy-source-build.cjs
```

Archivos bajo `tests/qa/generated`: controles `intext-dummy-original-gam.qa.js`/`original-manager`, variantes `intext-dummy-black-gam.qa.js`/`black-manager`. Siguen siendo exclusivamente QA. Antes de producción permanecen pendientes los ensayos InText de COMPLETE, snapshot/restore, ausencia de contenido base visible, first-frame/reveal, segundo ciclo, fallback y cleanup. La corrección local del fixture no autoriza su adopción comercial.

## Validación y scope

- Tests afectados: **33/33 PASS** (28 harness +5 fixture/build); se mantienen los 27 anteriores y se añaden seis regresiones.
- Suite completa: **1226/1226 PASS**, 0 fail/cancelled/skipped/todo, 24991.1673 ms. Salida `intext-p13c-dummy-timeline-validation.txt`; ejecución con adaptador externo Git/sintaxis ya establecido para subprocesses bloqueados, contrastados directamente, sin sustituir tests.
- `node --check`: 12 archivos JS (dos productivos, cuatro QA, dos tests, cuatro copias), PASS. Compilación C# y decodificación/timing de 25 frames, PASS. Contraste de un frame, rechazo esperado. HTTP real local y hash, PASS.
- `git diff --check`, whitespace de archivos nuevos y reverse-check R1, PASS. Evidencia: `intext-p13c-dummy-timeline-evidence.json`.
- En esta iteración solo se actualizan el generador del candidato, decoder QA, evaluación temporal/UI del laboratorio, sus tests y documentación/derivados. Bundles productivos, probe R1, copia manual, IMA, contrib-ads, GAM, PSP, Prebid, floors, random, PiP, animación y fallback conservan hashes/código. El árbol sigue conteniendo cambios previos sin commit.

CodeMemory se consultó antes de los cambios y se reindexó al finalizar (fast, sin artefactos). Sigue sin devolver assessCandidateTiming; el workspace, las capturas, los hashes y los tests son la fuente de verdad.
