# P1.4-A2 — Diagnóstico pre-VAST y factor entorno

Actualización: **26/10/2026, tras el E0 Legacy con Performance**. Recopilación descriptiva A2 **completa: 2/2 E0 Legacy auténticos**, el 25/10 y el 26/10. Atribución causal de los outliers **abierta**. Sin cambios de core, reproducción, coordinador, probe ni bundles. A3/B/C/enforce inactivos; P1.3c visual abierta. La [guía QA](intext-p14a2-fiddler.md) ya no solicita otra captura.

## Dictamen vigente: segundo Legacy E0 y cierre de recopilación

Se leyó íntegramente `Informe_P14A2_E0_Legacy_Performance_2026-10-26.md` de Descargas y se contrastó offline con QA, debugger, HAR completo y trace original comprimido, código actual e informes P1.4-A2. La [matriz de evidencias](intext-p14a2-evidence-matrix.md) y el [registro saneado independiente](intext-p14a2-legacy-performance-evidence.json) conservan fuentes, hashes, hitos y límites sin reescribir las evidencias anteriores.

Se revalidaron hashes de 35 originales disponibles. Los 31 archivos del primer estudio PSP 4+6 ya no se localizaron en Descargas: ese antecedente se contrasta mediante su evidencia JSON preservada e informes posteriores, sin presentar una nueva lectura de sus originales. La evidencia Performance nueva sí se leyó y verificó directamente.

`E0-26oct` es **Legacy-E0-2**: body E0 de 894934 bytes, SHA256 `18299f4fa54e151ff045e6d355c554055bdc85399ddec29eb5e9e85990bcfdfc`; arm/assignment_fixed E0, cero conflictos, dropped=0 y ramas secuenciales. Runtime dualMode=false, pspDetected=false, randomSource=gexp-owner-random. Primer slot AUTO/vídeo inicial, segundo display_only. Su bridge es **3.796.0**, frente a 3.795.0 en los E0 del 25–26/10 anteriores y 3.794.0 el 22/10. Los dos Legacy E0 son controles descriptivos de fechas distintas; no están emparejados con los seis E1 Legacy del 22/10. PSP sigue separado.

| Slot1/ciclo1, reloj UTC | Hito | Intervalo relevante |
|---|---|---:|
| 17:17:07.663 | Winner vídeo | Origen |
| 17:17:07.746–09.381 | Dependencias coordinador | 1635 ms; prewarm/prepare solapados |
| 17:17:09.384 | Prepare ready | No es player/bridge listo |
| 17:17:09.385–15.294 | Espera viewport | **5909 ms** |
| 17:17:15.392 | Activación | Winner→activación 7729 ms |
| 17:17:15.534 | player:ads-request | SDK retornado; no envío HTTP probado |
| 17:17:15.506–15.950 aprox. | Bridge HTTP 200 | 444 ms; empieza antes del evento ads-request |
| 17:17:16.782–17.037 aprox. | VAST HTTP 200 | 255 ms; ads-request→inicio HAR 1248 ms |
| 17:17:17.326 | AdsManager | +1792 ms desde ads-request |
| 17:17:17.330 / 17.332 | adsready / readyforpreroll | +4 / +6 ms desde manager |
| 17:17:18.896 / 18.903 | Frame publicitario / reveal solicitado | Manager→frame 1570 ms; frame→reveal 7 ms |
| 17:17:19.010 / 19.019 | Native IMPRESSION / STARTED | Eventos reales, sin acreditar Active View |
| 17:17:29.091 / 29.113 | IMA COMPLETE / core complete | Éxito sin timeout |

Winner→frame son **11233 ms**, activación→frame **3504 ms**. La espera de geometría es el mayor tramo anterior a activar. `residualDependenciesWaitMs=0` solo indica que el `await prepare()` medido al activar encontró recursos preparados; no elimina los 1635 ms de carga previa, los 5909 ms geométricos ni la latencia posterior. El core también registra una segunda espera viewport de 2 ms al entrar en activate: no sustituye la primera ni se cuenta como otros 5,9 s.

### Performance: contribuciones observadas y costes solapados

El `.json` Performance contiene **GZIP**: 28940995 bytes comprimidos, 238554799 descomprimidos y 810091 eventos. Metadata: DevTools, Pixel 9 Pro Fold, inicio 17:17:10.733 UTC y ventana ~35,79 s. Empieza **después** de dependencias/prepare y antes de activar: no mide evaluación inicial de dependencias. La proyección trace→UTC es aproximada; la request de medio discrepa del HAR en el orden de 145 ms, sin calibración de drift exacto.

- Bridge IMA, pid 2984/tid 18584: `RunTask` **535,861 ms** contiene `ParseHTML` 535,628 ms, `EvaluateScript` **409,036 ms** y `v8.compile` **284,938 ms** anidados. La evaluación ocupa parte del tramo entre fin HTTP del bridge (~15.950) e inicio VAST (~16.782). No sumar 536+409+285 ni atribuirle todos los 1248 ms pre-VAST.
- Renderer principal Marca, pid 23580/tid 3012: tarea ~204,751 ms durante activación y `MajorGC` **165,228 ms** antes de AdsManager. En activación→frame, unión recortada de ventanas RunTask ~2,09 s (~60%); iframe IMA ~1,21 s (~34%). Son ocupación de pared de hilos distintos que pueden coincidir, **no CPU exclusiva de InText**, ni fases sumables, ni evidencia de un bloqueo único de varios segundos. DevTools y otras integraciones forman parte del contexto observado.
- VAST GAM: 200/~255 ms, connect ~92 ms con SSL ~63 ms incluido. Falta XML exportado: sin cadena de wrappers ni atribución final de creatividad. Esta respuesta HTTP no tarda varios segundos.
- Medio GVT: **302 ~1012 ms** (connect ~966,5 ms, SSL ~893,6 incluido) → **206 ~279,6 ms**, Range `bytes=0-`, MP4 ~498 KB; frame ~182 ms tras el fin registrado del 206. El transporte contribuye temporalmente; no queda aislado buffering, decoder o scheduling ni se demuestra que completar toda la transferencia sea imprescindible.

Trace no equivale a NetLog/SAZ. Peer 127.0.0.1/puerto 8888 es coherente con Fiddler: no separa cliente→proxy→origen ni adjudica TLS al servidor. Esta sesión rápida no reconstruye los 11112 ms de connect PSP previos ni explica retrospectivamente 21,23 s pre-VAST o el timeout de 25 s Legacy.

### Geometría: pregunta concreta para P1.4-B shadow

En `observer:attached` (17:17:15.385), anchor elegible con ratio **0,0022497559 (~0,225%)**, top 921,663 frente a viewport 922 px; región prevista/player top **1091,662**, fuera del viewport, wrapper real altura 0 y opacity 0. El código `getReadinessViewportState()` acepta overlapX>0 y overlapY>0: confirma la permisividad, sin exigir un porcentaje mínimo. Al ads-request el anchor está ~3,43%; en AdsManager/frame llega a ratio 1 con documento visible tras scroll. **No se demuestra start fuera de viewport en este intento**. `firstFrameOutsideViewport=true` se refiere al wrapper cerrado, no a un anchor pasado.

Esto motiva diseñar **offline** B shadow sobre anchor y región prevista por separado, midiendo primera oportunidad y pérdidas/reentradas con denominador de control fijo. Una sola navegación no fija un umbral óptimo. No se implementa ni activa B. El filmstrip permite revisar el comienzo alrededor del frame, pero sus Screenshot terminan ~14,23 s después de comenzar el trace, antes de COMPLETE: **P1.3c visual permanece abierta** para cierre, restore y ausencia de flash negro. Reveal solicitado y native IMPRESSION no prueban fin de animación ni Active View.

### Display P2 y decisión de siguiente fase

Slot1/ciclo2 es **refresh tras COMPLETE**, con isFallback=false. Core COMPLETE 17:17:29.113 → Display request 17:17:31.545 = **2432 ms**. Mantener P2 separado: recreado +2921 ms, render filled +3844 ms, wrapper abierto +3882 ms, impressionViewable +4938 ms. El puente DOM provisional a +126 ms no es el bridge IMA ni un fallo comercial; no adjudicar los 2432 ms solo al core sin estudiar scheduler/autorizaciones/geometría. Slot2 display_only: ciclo1 filled/open/viewable; ciclo2 filled/open sin señal viewable al exportar, observación censurada y no NO-FILL.

**A2 puede cerrar la recopilación acordada**, no el diagnóstico causal. Hipótesis H-IMA pendiente: el tramo **retorno requestAds→primer VAST/AdsManager** de los outliers acumula demora asíncrona de ejecución/disponibilidad del bridge y/o establecimiento de conexión bajo proxy; aún no se distingue ese mecanismo de un efecto común del coordinador/probe frente al histórico P1.3c. El trace prueba costes JS y GC en un éxito, no que causen el silencio del fallo.

La subhipótesis contrastable **H-QA** es que la capa compartida de coordinador/instrumentación A1 altere el scheduling y contribuya a esos outliers también en E0. No está demostrada ni excluida: E0 secuencial conserva esa capa y dos COMPLETE no equivalen a un control histórico sin ella. Una futura comparación deberá separar ese factor del cambio de proxy y del coste de grabar Performance; variar todos a la vez no identificaría la causa.

**Recomendación concreta:** congelar A2 y preparar el diseño offline de P1.4-B shadow con la geometría ya disponible; conservar H-IMA como investigación acotada pendiente, sin perseguir el outlier con más navegaciones. Para retomarla, redactar primero un protocolo discriminante de transporte proxy/directo y control histórico P1.3c separado del E0 QA, con misma cobertura/recurso/entorno y criterio de parada; revisión futura antes de ejecutar. No es una captura ordenada ahora. A3 requiere comparador y métricas de oportunidad válidos, no un residual cero ni dos COMPLETE; sigue bloqueada. No hay evidencia para cambiar AdsRequest, SDK, timeout, waterfall o Display.

## Antecedente de esta fecha: tres E0 auténticos, contextos invertidos

Las cifras y decisiones siguientes describen la entrega anterior al cuarto E0. Su estado 1/2 y propuesta de una captura adicional están **cumplidos y sustituidos** por el dictamen vigente anterior; se conservan para trazabilidad.

Se leyó íntegramente el informe de Descargas `Informe_P14A2_E0_reales_25-26_octubre_2026.md` y se contrastó offline con los tres HAR completos, sus exports QA y debuggers, código actual, roadmap y auditoría AdsRequest/IMA. Los originales mantienen sus nombres; se corrige la **etiqueta analítica**, sin renombrar ni mezclar evidencias:

| Original | Etiqueta correcta | Fecha / cohorte | Arm verificado | Entorno real |
|---|---|---|---|---|
| A2-Legacy-E0-real-1 | PSP-E0-1 | 26/10, PSP E0 adicional | E0 | dualMode=true, pspDetected=true, randomSource=gpt-native-slot-targeting |
| A2-Legacy-E0-real-2 | PSP-E0-2 | 26/10, PSP E0 adicional | E0 | PSP/dual, igual al anterior |
| A2-PSP-E0-1 | Legacy-E0-1 | 25/10, Legacy E0 adicional | E0 | dualMode=false, pspDetected=false, randomSource=gexp-owner-random |

Los tres cuerpos recibidos coinciden con SHA256 E0 `18299f4fa54e151ff045e6d355c554055bdc85399ddec29eb5e9e85990bcfdfc`, 894934 bytes; assignment_fixed=E0, cero conflictos/pérdidas y ramas secuenciales sin solape. **La entrega E0 es válida en estos tres documentos**. Esto no prueba reparación global de AutoResponder ni identifica la regla responsable de los seis E1 del 22/10. No existe nueva evidencia de conversión interna de brazo y no se cambia el coordinador.

| Intervalo (ms), slot1/ciclo1 | PSP-E0-1 | PSP-E0-2 | Legacy-E0-1 |
|---|---:|---:|---:|
| Dependencias del coordinador | 6105 | 2087 | 6492 |
| Ads-request→VAST HAR | 12210 | 4234 | 3715 |
| VAST HTTP 200 | 224 | 497 | 179 |
| Ads-request→AdsManager | 12551 | 5027 | 4353 |
| AdsManager→frame publicitario | 592 | 762 | **4339** |
| Activación→frame | 13310 | 5943 | 8957 |
| Winner→frame | 19606 | 8316 | 15833 |
| Resultado | COMPLETE | COMPLETE | COMPLETE |

Tres completados, ningún timeout nuevo: recuentos descriptivos, no tasa de fallos ni demostración de mejora. Mantener **cuatro grupos separados**: PSP 22/10 (4 E0+6 E1, HAR filtrados), Legacy E1 22/10 (6 E1, HAR completos: cinco COMPLETE y un timeout), PSP E0 26/10 (2) y Legacy E0 25/10 (1). La nueva infraestructura bridge es **3.795.0**, frente a 3.794.0 el 22/10; no son condiciones de SDK/fecha equivalentes para inferencia causal.

**Red pre-VAST:** en PSP-E0-1 el bridge primario registra 11583,613 ms, connect=11112,066 ms, SSL=95,348 ms **incluido**, residual connect−SSL=11016,718 ms. No es prueba de 11 s de TLS ni de TCP puro. Peer loopback/campo connection=8888 y contexto Fiddler impiden separar transporte cliente/proxy/origen sin NetLog/SAZ. Desde fin HAR del bridge quedan 672,387 ms hasta VAST; en PSP-E0-2 el bridge tarda solo 691,065 ms y quedan 3596,935 ms posteriores. HTTP 200 no acredita ejecución/handshake. Sigue abierta la atribución de scheduling/SDK/proxy, y E0 también reproduce latencias pre-VAST sin timeout.

**Media Legacy:** AdsManager→readyforpreroll son 5 ms; no reproduce el caso histórico manager-sin-preroll. A +591 ms empieza la redirección GVT (302, 2140,622 ms), seguida del 206 `video/mp4` (1570,137 ms); primer frame 36,863 ms después del fin HAR. Se enlaza con el medio publicitario IMA 6 por identidad del recurso, distinto del dummy. El rango es `bytes=0-`, respuesta `bytes 0-498318/498319`, sin evidencia de error o anuncio duplicado. La suma temporal no mide CPU/decoder ni cuánto de esa transferencia era imprescindible para reproducir. Anchor elegible y sin recovery QA durante manager→frame; pausas internas/scheduling no quedan excluidos.

**Ocho IMA/bridge en Legacy:** el initiator identifica una carga SDK del coordinador y un bridge Video.js para el primer player; las otras siete cargas SDK y siete bridges siguen rutas `vpaid_adapter.js` con Seedtag/GPT/verificación. Tres SDK adicionales arrancan después del COMPLETE inicial. Cinco entradas SDK casi instantáneas y transferSize cero son compatibles con caché, sin flag explícito. El HAR carece de frameId: pageref es navegación, no frame. No se atribuyen esas rutas a slots concretos ni se convierten ocho recursos en ocho anuncios InText.

**PSP/Legacy:** el mismo migrate.js capturado en las tres incluye gate de sitio/URL/site version, override `pspDebug=yes/no` y, en su defecto, `Math.random()<b` (Marca: rama mobile 0,2, otra 0,8; exclusión de URL 0). El core fija dualMode desde `__disable_gam_kv__` y detecta PSP por `googletag.__ctrl`; los logs son coherentes con sus autoridades respectivas. Hay una condición conocida que permite variar dentro del mismo artículo, **sin routing defectuoso demostrado**. Faltan cookie/sorteo/inputs al decidir para explicar cada navegación. Su trazabilidad se mantiene aparte de la asignación E0/E1, sin forzar PSP/Legacy ni modificar flags/cookies/random.

**Display:** tras COMPLETE, slot1/ciclo2 es refresh y los tres resultan filled/realFilled, abiertos y no vacíos. `video_to_display_display_missing_keep_video_surface` describe un puente DOM transitorio cuando falta Display; después se recrea, abre y oculta la superficie vídeo. No es el bridge iframe IMA ni un NO-FILL. PSP registra impressionViewable; Legacy house=true y sin esa señal al exportar no demuestra fallo comercial. P1.3c visual sigue pendiente.

La [auditoría de red, medios, routing y Display](intext-p14a2-e0-network-media-audit.md) detalla índices HAR, fases, callbacks y límites; [evidencia nueva](intext-p14a2-e0-real-evidence.json) conserva hashes saneados de los nueve originales y del informe. Los JSON/hashes de las cohortes anteriores no se reescriben.

**Decisión:** primero diagnóstico de entorno y evidencia externa; ningún fix todavía. Sin Performance/NetLog/SAZ aportados no se cuantifican CPU/GC/scheduling ni el proxy. Si no hay registros existentes que lo resuelvan, preparar un único E0 Legacy adicional, Performance desde antes de activar y HAR completo; NetLog/Fiddler del mismo intento recomendados para transporte. Si sale PSP o la cobertura falla, conservar el contexto real y detenerse, sin nuevas navegaciones automáticas. No se necesita un probe nuevo ahora: solo se propondría instrumentación pasiva separada ante una laguna concreta persistente después de la captura externa. A3/B/C/enforce inactivos; P1.3c visual abierta. La entrega documental no ejecuta ese ensayo.

## Antecedente 22/10: seis sesiones, todas E1 Legacy

Las decisiones de repetición de esta sección reflejan el estado del 22/10; el dictamen vigente registra su cumplimiento 2/2 y cierra la recopilación, sin más intentos automáticos.

Se leyó íntegramente `Informe_P14A2_revision_HAR_completos_2026-10-22.md` de Descargas y se contrastó con código, diseño, A1 y A2 anterior. Se verificaron offline los seis HAR completos, sus seis debuggers y seis exports QA. Se registran como cohorte adicional **`P14A2-Legacy-E1-20261022-full-HAR`**, sin incorporar sus intentos a los denominadores de las diez sesiones PSP/dual anteriores. Nombres de captura conservados; «A2-E0» no significa control real.

| Captura original | Brazo efectivo | Deps (s) | Winner→activar (s) | ads-request→VAST HAR (s) | HTTP VAST (ms) | ads-request→manager (s) | Activar→frame (s) | Resultado vídeo inicial |
|---|---|---:|---:|---:|---:|---:|---:|---|
| A2-E0 | E1 | 0,86 | 4,68 | 3,38 | 253 | 4,59 | 5,90 | COMPLETE |
| A2-E0-2 | E1 | 3,53 | 3,78 | — | — | — | — | timeout 25,02 s |
| A2-E0-3 | E1 | 2,03 | 2,72 | 6,42 | 302 | 7,19 | 8,12 | COMPLETE |
| A2-E1 | E1 | 2,48 | 3,94 | 9,16 | 731 | 10,02 | 11,14 | COMPLETE |
| A2-E1-2 | E1 | 2,26 | 2,52 | 8,27 | 264 | 8,88 | 9,86 | COMPLETE |
| A2-E1-3 | E1 | 2,70 | 5,76 | 21,23 | 140 | 21,87 | 22,98 | COMPLETE |

Los seis bodies `_gam_kv_.js` tienen SHA256 **`6356718da3b272d2c68ac208ac9147020b9b327ce6b6dc7b40af3317e3e58e11`**, idéntico al E1 del manifiesto A1. Los seis exports tienen `arm=E1`, `assignment_fixed.effectiveArm=E1`, cero conflict y dropped=0. Se invalidan como controles las tres etiquetas E0. Los cuatro artefactos locales conservan sus hashes; E0 y E1 solo difieren en el prefijo de asignación. No se encuentra una anomalía interna de conversión E0→E1. Falta la configuración real de AutoResponder para identificar el matcher/ruta/entrega responsable; no se atribuye una regla concreta ni se cambia el coordinador.

Todas las nuevas capturas son **Legacy: dualMode=false, pspDetected=false**, frente a PSP/dual en el estudio anterior. Cinco COMPLETE y un timeout son recuentos descriptivos de esta cohorte, sin tasa comercial, pooling, comparación E0/E1 nueva ni causalidad estadística. La mediana de dependencias observada es aproximadamente 2,37 s; no estima una mejora respecto de E0.

Los HAR nuevos tienen 826–1141 entradas y capturan scripts/iframes/múltiples orígenes. En los seis se verificó videojs-ima 1.11.0 con SHA256 `01b11a7a6a4b771ead01e2060b8983d0b37f6f3e01a7e74f0140eb04b69459c8`: el evento ads-request sucede después del retorno SDK también en **estos** bytes. No se traslada esa verificación retrospectivamente a los bodies ausentes de la cohorte anterior.

La fase pre-VAST domina los cinco éxitos: **3,38–21,23 s** hasta `HAR.startedDateTime`, que incluye colas y no acredita envío por cable. Los cinco HTTP son 200, 140–731 ms, sin XML en el HAR. En la nueva A2-E1-3 hay 21232 ms pre-VAST y unos 501 ms entre fin HTTP y manager; **no son los 2790 ms de la E1-3 PSP anterior**. El bridge 3.794.0 aparece HTTP 200 en todas; sus 5115 ms en la nueva A2-E1-3 dejan todavía unos 16,10 s hasta la entrada VAST. HTTP 200 del bridge no acredita ejecución/handshake interno. Los hashes de ima3.js difieren; eso no prueba un cambio funcional causal.

**A2-E0-2, realmente E1:** dependencias listas, ads-loader, retorno SDK acreditado por ads-request, confirmación de AdDisplayContainer initialized y bridge HTTP 200 (1668 ms), pero ningún VAST ni manager observado. Timeout a 25023 ms desde activación; desde ads-request pasan 24690 ms. No es un bloqueo síncrono de 25 s en la llamada SDK. El tráfico paralelo impide afirmar caída total continua de red, pero no descarta bloqueo selectivo, CPU/scheduling, proxy, iframe o SDK. No hay Performance/NetLog de esta sesión. No se diagnostica NO-FILL ni responsabilidad de RichAudience sin respuesta/cadena real.

Los primeros Display slot1/ciclo2 son filled/realFilled y abiertos en las seis. En el timeout son **fallback**; en los cinco COMPLETE son **refresh**. No se reprodujo NO-FILL en esos seis ciclos concretos; otros refresh/slot2 y la cohorte anterior siguen aparte. AbortError y warnings de targeting/cache aparecen también con éxito y no prueban causalidad. PSP ausente no evalúa su incidencia `__impression`. Los cinco frames son de medio publicitario y anchor elegible, pero eso no acredita píxel perceptible/Active View ni cierra P1.3c visual.

La [auditoría AdsRequest/bridge/asignación](intext-p14a2-adsrequest-ima-audit.md) distingue dos inconsistencias estáticas condicionales (XML no pasado en la rama adsResponse y posible XML usado como URL en el fallback bid), **sin evidencia de que se ejecutaran aquí**. El core observado usa tag GAM, no suministra `settings.adsRequest` y no demuestra un override. El debugger sanea la query y el probe no conserva `event.AdsRequest`: no se certifica todo el objeto efectivo del fallo por el nombre del log.

**Decisión histórica del 22/10, recopilación ya cumplida:** conservar las seis E1 sin repetirlas y obtener dos E0 auténticos Legacy con los instrumentos actuales. Se recibieron el 25 y 26/10; el segundo añade Performance. Los huecos de payload AdsRequest y evento nativo del loader siguen documentados, sin nuevos hooks ni bundles. La decisión vigente cierra la recopilación y mantiene A3 bloqueada, B/C inactivos y P1.3c visual abierta.

Fuentes nuevas y SHA256 de los 18 originales más el informe: [evidencia nueva separada](intext-p14a2-har-complete-evidence.json). `E1-2-debug.json` y `E1-3-debug.json` se correlacionaron por reloj con A2-E1-2/A2-E1-3. `A2-E1.md` de Descargas pertenece al estudio anterior 4+6; se contrasta como antecedente, no como lectura de los HAR nuevos. No se modifica el analizador, el JSON antiguo, el manifiesto A1 ni el scope histórico A2; sus hashes/resultados son registros de aquella entrega.

## Antecedente conservado: cohorte original PSP/dual (4 E0 + 6 E1)

Las secciones siguientes describen exclusivamente las diez sesiones anteriores y sus HAR filtrados; no incluyen las seis E1 Legacy ni los cuatro E0 posteriores. Sus métricas y límites se conservan para trazabilidad. Las propuestas de captura de este antecedente no son tareas vigentes; los dos E0 Legacy ya se recibieron.

## Dictamen y evidencia discriminante

Los cuatro fallos alcanzan el evento `player:ads-request` y luego esperan sin AdsManager hasta el timeout del core. En videojs-ima **1.11.0**, dicho evento se emite **después del retorno** de `AdsLoader.requestAds()`. Por tanto, bajo el contrato del plugin fijado, la solicitud sí se entregó a la API del SDK: no está simplemente retenida en el gate anterior del core o esperando que Intext llame al método. Esto **no acredita despacho HTTP, demanda, reproducción ni impresión**. [Código oficial fijado: SdkImpl.requestAds](https://raw.githubusercontent.com/googleads/videojs-ima/v1.11.0/src/sdk-impl.js).

La causa interna de la espera SDK→tráfico/manager no queda identificada con estos HAR filtrados. No se ha demostrado un defecto económico, un NO-FILL VAST, un bloqueo por autoplay, una regresión exclusiva de E1 ni saturación del ordenador. El diagnóstico queda acotado a una solicitud aceptada por la API y sin progreso de resolución publicitaria observado; se necesita red completa y Performance para discriminar las hipótesis.

No se añade un wrapper de requestAds: repetiría evidencia ya obtenida por el evento posterior a su retorno, cambiaría identidad y aumentaría el efecto de observación. Tampoco se envuelven play/pause ni se añade ningún timer/probe. El siguiente ensayo reutiliza las variantes y el probe actuales.

## Fuentes y trazabilidad

- Informe completo de Descargas `Informe_P14A_E0_vs_E1_Marca_mobile_2026-10-22.md`, leído como UTF-8. SHA256 `9586db5f84758724f2f9f132e3ab081346ea112ef4a2efbcae6f5e0db4b852da`. Sus resultados se conservan como referencia, no como supuestos.
- Diez JSON QA `E0-1..4`, `E1-1..6`; diez debuggers correspondientes; diez HAR GAM filtrados, todos del 22/10. Se recalculan hitos sin mezclar primer vídeo, fallback, refresh o Slot 2. Los 31 hashes de entrada se guardan en [evidencia reproducible](intext-p14a2-evidence.json).
- Core actual, loader/coordinador A1, builder y probe, consultados primero mediante CodeMemory y contrastados con workspace. Los dos originales productivos y las cuatro salidas E0/E1 conservan los hashes del [manifiesto A1](intext-p14a-build.json).
- Referencia de plugin del HAR anterior **aportado** `www.marca.com-observe.har`: JS 36933 bytes, SHA256 `01b11a7a6a4b771ead01e2060b8983d0b37f6f3e01a7e74f0140eb04b69459c8`. Confirma el orden llamada→evento y `requestMode:onLoad`. No sustituye los bytes de las capturas del 22/10, que no incluyen scripts. Comprobar esos bytes en la repetición.
- Fuentes primarias complementarias: contrato público [AdsLoader](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/class/google.ima.AdsLoader), [Network DevTools](https://developer.chrome.com/docs/devtools/network/reference) y [Performance DevTools](https://developer.chrome.com/docs/devtools/performance/reference). Las APIs actuales no prueban por sí solas la versión efectiva del SDK unversioned `ima3.js` de una sesión histórica.

Recalcular: `node tests/qa/intext-p14a2-analysis.cjs` (Descargas por defecto), o pasar otro directorio de evidencias como único argumento. Solo lectura de JSON/HAR locales y escritura de datos saneados; no carga SDK, VAST, XML remoto ni navegador. No exporta URLs completas, queries, headers, cuerpos VAST, stacks con URLs ni IDs de campañas. Los originales permanecen en Descargas.

## Flujo real y significado de los hitos

```text
winner → pendingAuction → infraestructura compartida → prepare dependencies-ready
→ gate actual viewport/token → createVideoElement + Video.js
→ observeActivationEligibility → video_activation_started
→ IntextVideoCreative.requestAds (Promise del core; no es AdsLoader.requestAds)
→ arma timeout de seguridad de 25 s → player.ima(options)
→ ready de Video.js → PlayerWrapper/Controller.onPlayerReady
→ SdkImpl.onPlayerReady → initAdObjects → evento ads-loader
→ requestMode:onLoad → SdkImpl.requestAds → AdsLoader.requestAds(AdsRequest)
→ retorna llamada SDK → evento player:ads-request / video_ima_request_sent
→ trabajo asíncrono SDK/navegador/red no descompuesto en los HAR actuales
→ entrada HAR VAST → respuesta HTTP → SDK ADS_MANAGER_LOADED
→ getAdsManager/listeners del plugin → player:ads-manager → adsready
→ readyforpreroll → init/start ya existentes → adstart/frame → reveal vigente
```

El source inspeccionado del plugin fija ese flujo onLoad. Intext no hace una segunda llamada explícita al request del SDK. Su propio `player.ready` inicializa AdDisplayContainer y realiza el play vigente; los logs de las sesiones sitúan `ads-request` antes de ese play. No se modifica ninguno de esos órdenes.

| Hito | Qué acredita / qué no |
|---|---|
| `video_activation_started` | Core entró en activación válida tras construir Video.js; no equivale a request HTTP |
| `core:video-player-prepared` | Retorno de `player.ima(options)`; no manager/ad listo |
| `player:ads-loader` | Plugin creó un AdsLoader y emitió su identidad; no respuesta publicitaria |
| `player:ads-request` | En el plugin fijado, requestAds del SDK ya retornó; no acuse del servidor ni envío por cable |
| `video_ima_request_sent` | Nombre histórico del listener del evento anterior; no es medición de HTTP |
| `HAR.startedDateTime` | Inicio del registro de request, incluye blocked/colas/conexión. No se etiqueta como instante exacto de envío HTTP |
| `responseEnd` calculado | Fin de esa entrada HAR; sin XML no acredita fin de wrappers, parsers o resolución del SDK |
| `player:ads-manager` | Plugin obtuvo manager y registró listeners antes de emitir; es posterior al evento nativo del loader. Ese evento nativo no está cubierto directamente en estos logs |
| `adsready/readyforpreroll` | Progreso de plugin/contrib-ads; no impresión ni frame |
| Native STARTED/IMPRESSION/COMPLETE | Eventos reales observados con cobertura del manager; no sustituyen visibilidad del anuncio |
| Timeout del core | Fin del límite vigente sin resolución/reveal; no diagnóstico específico de demanda o red |

La pausa de contenido en el flujo de contrib-ads mientras espera adsready es normal y no demuestra deadlock. `isInAdMode=true`, sin manager y con `inAdBreak=false`, tampoco equivale a anuncio iniciado. La solicitud SDK ya había retornado antes de esas esperas. No se ha demostrado que los AbortError de play impidan la petición: también aparecen en éxitos y son posteriores al evento de solicitud.

## Comparación de diez intentos iniciales

Milisegundos. El origen winner es el del primer vídeo de Slot 1/ciclo 1; los nulos se conservan. La columna solape es la intersección observada de ventanas de rama; no una ganancia causal frente a una sesión serial distinta.

| Caso | Dependencias | Winner→deps ready | Solape de ramas | Winner→manager | Winner→frame | Resultado |
|---|---:|---:|---:|---:|---:|---|
| E0-1 | 8208 | 8274 | 0 | — | — | timeout |
| E0-2 | 2364 | 2449 | 0 | 4999 | 6091 | COMPLETE |
| E0-3 | 8953 | 9043 | 0 | — | — | timeout |
| E0-4 | 3318 | 3408 | 0 | 8895 | 9701 | COMPLETE |
| E1-1 | 1975 | 2041 | 1513 | 12615 | 13275 | COMPLETE |
| E1-2 | 1843 | 1932 | 1538 | 7403 | 8583 | COMPLETE |
| E1-3 | 2647 | 2708 | 1586 | 15222 | 16933 | COMPLETE |
| E1-4 | 2535 | 2615 | 1183 | — | — | timeout |
| E1-5 | 4454 | 4558 | 4154 | — | — | timeout |
| E1-6 | 10317 | 10398 | 7288 | 20222 | 21080 | COMPLETE |

| Métrica | E0 | E1 | Denominador / límite |
|---|---:|---:|---|
| Duración mediana dependencias | 5763 | 2591 | 4 y 6 intentos; 55% menos observado, no causal |
| Solape mediano de ventanas | 0 | 1562 | Trabajo concurrente; no ahorro end-to-end demostrado |
| Mediana del mínimo de duración de ramas | 0 | 1563 | Proxy del informe; pequeñas diferencias por marcas/offsets de comienzo, no contradicción de latencia |
| Winner→deps ready mediano | 5841 | 2661,5 | Todos los intentos |
| Winner→manager mediano | 6947 | 13918,5 | Solo 2/4 y 4/6 con manager, excluidos temporalmente los cuatro sin hito |
| Winner→frame mediano | 7896 | 15104 | Solo 2/4 y 4/6 con frame, no estadística de todos los intentos |
| Activación→frame mediano | 3447,5 | 10315 | Misma cautela de supervivencia |
| `video_ima_request_sent`→manager mediano | 2244,5 | 9257,5 | Misma cautela de supervivencia |
| Timeouts | 2/4 (50%) | 2/6 (33,3%) | Diferencia descriptiva, sin inferencia causal/estadística |
| Fallback filled tras timeout inicial | 2/2 | 2/2 | Otro ciclo; no rescata el vídeo fallido como vídeo exitoso |
| Anchor elegible al frame | 2/2 | 3/4 | Geometría de readiness, no viewability GAM ni prueba visual |

El residual de activate es 0–1 ms en todas las sesiones porque prepare había terminado: es una medición válida de esa espera concreta, no un KPI suficiente de impacto. No se resta dos veces tiempo solapado. E1-6 prueba además que la paralelización no impone un total menor de 10 s: cada script conserva su timeout individual, y la duración total incluye etapas distintas.

Los HAR no incluyen scripts, pero los JSON **sí conservan ResourceTiming parcial** del loader. Se exportan por recurso en la evidencia, sin atribuir CPU: E0-3 contrib-ads tiene duración RT 5423,4 ms y TTFB observado 5332,8 ms; E1-6 contrib-ads, duración RT 7062,6 ms pero TTFB 36,2 y receive 19,9 ms. En este último hay unos 7006,5 ms entre inicio RT y requestStart, cuya descomposición DNS/conexión/cola/worker no está exportada. E1-6 IMA SDK tarda 8505,1 ms en RT frente a 9450 ms de espera del recurso. El intervalo responseEnd→callback incluye evaluación, scheduling y diagnóstico; no es CPU puro. `blockedMs` y `scriptEvaluationCpuMs` siguen null. No extrapolar estas demoras del loader a la espera pre-VAST posterior: son etapas distintas.

Los recursos registrados comienzan con APIs no disponibles y terminan ready en las diez sesiones; no es una comparación entre un brazo con el plugin ya disponible y otro con carga inicial. Esto tampoco verifica por hash el cuerpo descargado. Los tamaños/tiempos RT no sustituyen HAR completo ni permiten inferir versión o caché de forma universal.

En los seis COMPLETE, el primer Display posterior es refresh (filled salvo E1-3); en los cuatro timeouts es fallback/ciclo 2, todos filled. E1-4 tiene además otro NO-FILL posterior en ciclo 3. El informe cuenta, incluyendo ambos slots/refresh/fallback, 13 ciclos Display E0 (13 filled) y 20 E1 (18 filled, 2 NO-FILL), con mediana request→waterfall para rellenos de 1153/1362 ms. Esos ciclos no son oportunidades independientes ni un fill-rate comercial comparable.

## Los cuatro timeouts, sin mezclar fallback

Tiempos relativos a `video_activation_started`; en ms. Loader→request delimita un tramo pequeño que incluye construcción de AdsRequest, callbacks y snapshots: no es duración pura de la llamada SDK.

| Caso | AdsLoader | Ads-request | Último lifecycle observado antes de silencio | Timeout observado | Último snapshot antes del timeout |
|---|---:|---:|---|---:|---|
| E0-1 | +132 | +151 | media:canplay +338 | +25093 | surface:mutation +348 |
| E0-3 | +220 | +238 | media:canplay +514 | +25012 | surface:mutation +534 |
| E1-4 | +137 | +173 | media:canplay +458 | +25014 | surface:mutation +468 |
| E1-5 | +198 | +225 | media:canplay +887 | +25007 | surface:mutation +906 |

En los cuatro: dependencias listas; wrapper cerrado; AdsManager no observado; `adsready`, `readyforpreroll`, native STARTED/IMPRESSION y frame no observados. En los snapshots previos/timeout, `isInAdMode=true` e `inAdBreak=false`. Todos los tokens observados siguen vigentes, no hay cambios `visibilitychange` registrados, el documento está visible y el anchor vuelve a estar elegible al timeout. Sí hay salidas/reentradas y eventos de recovery durante la espera; no se borran ni se atribuyen automáticamente como causa de ausencia de red.

Los `media:canplay` de esa tabla pertenecen al contenido base/tech del player (dummy negro), no acreditan un anuncio listo. La identidad de medio del probe y la falta de manager/frame publicitario impiden confundirlos con progreso IMA.

La diferencia AdsLoader→ads-request es 19/18/36/27 ms. Bajo el código fijado, el SDK devolvió control: no hay evidencia de un bloqueo síncrono de 25 s dentro de esa llamada. El largo silencio posterior puede incluir SDK/iframe/colas/recursos no exportados y trabajo del navegador. No hay evidencia para escoger uno de ellos.

**Timer:** el core lo arma después de activar y antes del log de inicialización IMA. No existen marcas exactas de armado/entrada del callback. La diferencia aparente frente a 25000 ms queda entre 87–93 ms (E0-1), 6–12 ms (E0-3), 9–14 ms (E1-4) y 0–7 ms (E1-5), usando los hitos que lo rodean. Incluye trabajo del core/telemetría y no es drift exacto. La cifra `durationMs:25000` del evento es configurada. Los datos no indican una deriva de varios segundos al vencer; tampoco descartan bloqueos anteriores del hilo principal. El reloj wall/performance mantiene una dispersión de offset cercana a 1 ms.

El límite de 25 s comienza antes del request HTTP y permanece hasta resolver/revelar o rechazar. Las opciones del plugin siguen en 30 s; no hacen vencer antes el límite propio. Sin evento terminal anterior de SDK, el waterfall no tiene otro error observado que permita avanzar antes: rechaza al vencer el core, hace cleanup y abre la recuperación permitida. Así se explica la dependencia del fallback de esos 25 s, sin demostrar que otro umbral menor fuese seguro. No se amplía, reduce ni rearma ningún timeout.

Los cuatro HAR contienen cero entradas xml_vast4, pero solo 13–16 requests GAM cada uno. No permiten clasificar la petición como cancelada, bloqueada u omitida: puede no haberse emitido o no estar incluida en el subconjunto exportado. No se ve respuesta VAST con NO-FILL en estos intentos. Ni RichAudience ni caché Prebid pueden declararse culpables sin respuesta/cadena real.

Los ficheros ERROR separados disponibles de E0-1/E0-3 muestran excepciones GPT `slotVisibilityChanged/onViewabilityChange`; E1-5, `impressionViewable/onViewable`. No había un ERROR separado E1-4. Esos extractos no proporcionan una pila/timing que vincule el fallo al callback IMA: se mantienen en el backlog PSP, sin atribución causal al SDK ni a E1. La ausencia de un fichero o de un error capturado tampoco prueba ausencia de excepciones.

### Fallback: otro token/ciclo y otra latencia

| Caso | Timeout→fallback | Fallback→request core | Request→slot requested | Slot requested→render | Render→open solicitado | Timeout→open solicitado |
|---|---:|---:|---:|---:|---:|---:|
| E0-1 | 94 | 36 | 1356 | 1861 | 19 | 3366 |
| E0-3 | 79 | 3 | 492 | 635 | 20 | 1229 |
| E1-4 | 79 | 3 | 1191 | 849 | 23 | 2145 |
| E1-5 | 73 | 4 | 508 | 606 | 22 | 1213 |

Todos corresponden al Slot 1/ciclo 2/renderToken 2 con filled y apertura registrada. `slot requested` es un hito core/WindowArray, no HTTP ni tiempo puro de GAM. `open` es solicitud de apertura, no píxel visible ni Active View. El vídeo inicial permanece fallido aunque el summary de ese ciclo tenga `fallback:false`: el fallback se registra en el ciclo nuevo. Los NO-FILL posteriores E1-3/ciclo 2 (refresh tras COMPLETE, 5507 ms) y E1-4/ciclo 3 (5306 ms) son backlog P2, no los cuatro fallos vídeo.

## E1-3: hueco posterior a la respuesta VAST

Origen en `video_ima_request_sent`:

| Hito | +ms |
|---|---:|
| Ads-request observado | -1 |
| Inicio de entrada HAR VAST | 8838 |
| Fin de entrada HAR VAST | 9331,983 |
| Player ads-manager | 12122 |
| adsready | 12125 |
| readyforpreroll | 12126 |
| adstart | 12223 |
| Frame | 13833 |
| Native IMPRESSION / STARTED | 14551 / 14562 |
| Reveal solicitado tras retorno | 18654 |

HTTP total 493,983 ms: blocked 129,618; connect 120,969 (SSL 64,455 incluido); send 0,418; wait 235,015; receive 7,963. No sumar SSL otra vez a connect. El hueco fin HTTP→player ads-manager es **2790,017 ms**. Falta XML de esa respuesta y red de wrappers/SDK; puede incluir resolución adicional, scheduling o trabajo del SDK/plugin. No es evidencia de 2,79 s adicionales del servidor GAM. E1-6 también tiene un hueco de 1556,225 ms, por lo que no se limita a E1-3.

El manager progresa en 3 ms a adsready y 1 ms más a readyforpreroll: en esta sesión no se reproduce AdsManager-sin-preroll histórico. Durante el frame el anchor está superado (`reason:passed`, ratio 0); reveal se retiene 4821 ms hasta la reentrada. Eso es espera visual y no demora del decoder después del frame. No se cambia esa política.

Hay además un request GAM distinto con connect≈6124 ms/SSL≈6100 ms (E1-3), y otro con connect≈8547/SSL≈8451 ms (E1-4). Demuestran variación en esas conexiones del navegador/proxy/origen, no atribución a la petición IMA ausente, CPU ni hardware. No se extrapola el timing de otra request.

## Precisiones sobre geometría, cobertura y coste

El informe original conserva seis flags `firstFrameOutsideViewport=true`, seis `intersectionRatio=0` y `revealedAfterViewportExit=true`. El cruce con el probe distingue:

| Sesión completa | Anchor elegible al frame | Ratio de readiness | Wrapper al frame |
|---|---|---:|---|
| E0-2 | sí | 0,735625 | altura 0, opacity 0 |
| E0-4 | sí | 1 | altura 0, opacity 0 |
| E1-1 | sí | 0,957708 | altura 0, opacity 0 |
| E1-2 | sí | 1 | altura 0, opacity 0 |
| E1-3 | no, passed | 0 | altura 0, opacity 0 |
| E1-6 | sí | 1 | altura 0, opacity 0 |

No se eliminan los flags: se corrige su interpretación. Cinco anchors elegibles con wrapper todavía cerrado no son cinco anuncios demostrados fuera del viewport. Tampoco anchor elegible demuestra anuncio perceptible, viewability IMA/GAM o cierre visual del dummy. En E1-3 sí existe evidencia geométrica explícita de posición superada. El summary `imaStarted:false`/duraciones null contradice la cobertura nativa observada en los seis éxitos: es mapping/cobertura del debugger, no ausencia de reproducción. No se corrige código comercial para maquillar esos campos.

El probe registra 45 snapshots por vídeo fallido; construcción acumulada ~49,5/50,9/62,7/74,2 ms, máximo individual 7,6/10,1/9,2/23,5 ms. Éxitos: 155–178 snapshots, ~130,4–192 ms acumulados y máximos 5,4–11,4 ms. `observerBuildMs` no mide despacho de listeners, console, grabación de DevTools, layouts ajenos ni coste completo del probe. No explica ni descarta segundos de scheduling; medir trace y control histórico. Cero observers al exportar no demuestra destrucción del SDK; conservar dispose/destroy y cobertura de cleanup.

## Hechos, hipótesis y límites

| Afirmación | Clasificación | Evidencia que falta o discrimina |
|---|---|---|
| E1 solapa infraestructura y respeta barrera | Confirmada por logs y código | Beneficio end-to-end controlado pendiente |
| Cuatro intentos alcanzan llamada SDK | Inferencia fuerte bajo plugin 1.11.0, respaldado por referencia HAR y source | Confirmar hash del plugin efectivo del 22/10 o nueva repetición |
| SDK ya envió HTTP al emitir ads-request | No acreditada | HAR completo/Performance/NetLog de la misma sesión |
| Timeout está causado por carga de dependencias pendiente | Contradicha en estos intentos | Todas dependencies_ready antes de activar |
| Wrapper cerrado causa deadlock pre-VAST | No demostrado | Los éxitos usan la misma superficie cerrada; investigar SDK con red completa sin abrir artificialmente |
| Autoplay/AbortError impide SDK request | No demostrado | Evento posterior al retorno SDK ya observado; mismo AbortError en éxitos |
| FSM espera adsready porque manager no llega | Compatible con snapshots/código | Explicar falta de resolución del loader antes de atribuir el fallo a FSM |
| Llegó el evento nativo del loader, pero falló el callback del plugin antes de emitir ads-manager | Hipótesis no excluida | Evento nativo del loader no cubierto directamente; consola/stack/trace y, solo si hacen falta, listeners públicos pasivos |
| Fiddler/TLS/cola limita el SDK | Hipótesis prioritaria de entorno/bridge | Recursos iframe/SDK, initiators, blocked/connect/TLS, proxy timings de esa request |
| Main thread/GC/DevTools ralentiza callbacks | Hipótesis sin medición CPU | Trace largo de tarea/GC y cola del mismo intervalo; no inferir por el ordenador usado |
| GAM/VAST wrappers/cache sin demanda | No observable en los cuatro fallos | XML y cadena reales; no hay respuesta que diagnosticar |
| E1 es condición necesaria del timeout | Descartada: también ocurre E0 | Un defecto común del coordinador/probe aún exige control histórico |
| Puede pasar sin coordinador A1 | Ruta del core/SDK lo permite; no aislado empíricamente en estas diez | Control histórico si falla la repetición limpia; éxito único no exonera ni condena |
| SDK actual cambió frente a sesiones antiguas | Posible, no probado | Hash/versión efectiva; ima3.js no lleva versión fija en URL |

El diagnóstico 19/10 10:29 (manager sin readyforpreroll) sigue abierto y es distinto de estos cuatro casos **sin manager**. No lo reetiquetar como el mismo fallo ni reabrir inicialización tardía sin el orden loadstart/IMA que lo demostraría.

## Instrumentación: decisión mínima

No se modifica probe ni se genera otro bundle A2. Hay cobertura suficiente para ubicar la llamada SDK, las dependencias y el límite del core. Falta evidencia de red/CPU, que otro wrapper del mismo evento no aportaría. Los HAR siguientes deben incluir todos los tipos/orígenes y Performance. No hay nuevos listeners, wrappers, timers, polling ni hooks, y E0/E1 siguen exactamente con sus hashes A1.

El plan anterior contemplaba marcas del timer o listeners públicos del loader después de cuatro sesiones. Esa propuesta **no se activa** con esta revisión. El retorno SDK ya está acreditado; no se necesita precisión sub-frame del límite para decidir el siguiente paso. Primero se recogen los dos E0 auténticos y Performance/red completa. Solo una laguna persistente tras revisar esos datos justificaría diseñar una propuesta pasiva separada, sin modificar métodos, timeout ni publicidad; véase la auditoría actual.

## Plan histórico de repetición Chrome/Fiddler — ya cumplido

El plan de cuatro navegaciones E0 → E1 → E1 → E0 fue sustituido por **dos E0 genuinos Legacy**, recibidos el 25/10 y el 26/10. La recopilación está cumplida; no es un benchmark estadístico ni incluye un control histórico sin coordinador. Ver [guía vigente](intext-p14a2-fiddler.md); no iniciar A3 ni más capturas automáticamente.

Decisión: **conservar E1 solo QA**. La concurrencia funciona, no hay evidencia de una violación de barrera/retry que requiera revisar su algoritmo, y los timeouts también ocurren en E0. No descartarlo por medianas de cuatro éxitos ni adoptarlo por dependencia más rápida. A3 queda bloqueada por atribución insuficiente del tramo pre-VAST y cobertura de entorno; P1.3c visual mantiene su gate independiente.

## Validación y alcance de la entrega A2 anterior

El analizador offline añade nueve regresiones sobre separación de ciclos, nulos/denominadores, privacidad del HAR, distinción anchor/wrapper, contrato source y hueco E1-3. No se modifica ningún test existente ni probe. Véanse [validación afectada](intext-p14a2-targeted-validation.txt), [suite completa](intext-p14a2-validation.txt) y [scope/hashes](intext-p14a2-scope.json). Las nuevas pruebas son de análisis de evidencias, no ejecuciones Chrome/SDK.

Resultados finales: **9/9** nuevas; **110/110** en el grupo analizador + E0/E1 + integración; **1336/1336** en la suite completa (1327 existentes + 9), cero omitidas/canceladas. `node --check` pasa para ambos originales productivos y los dos módulos nuevos; `git diff --check` pasa. Los tests existentes de arquitectura/seguridad y reversibilidad A1 se conservan; no existe una configuración lint dedicada en este workspace.

Comandos ejecutados, desde `src/pro`:

```text
node tests/qa/intext-p14a2-analysis.cjs
node --test --test-isolation=none tests/intext-p14a2-analysis.audit.test.cjs
node --test --test-isolation=none tests/intext-p14a2-analysis.audit.test.cjs tests/intext-p14a-dependencies.audit.test.cjs tests/intext-p13c-integration.audit.test.cjs
node --test --test-isolation=none tests/*.test.cjs
node --require ./tests/qa/.p14a2-preload.cjs --test --test-isolation=none tests/*.test.cjs
node --check _gam_kv_.js
node --check IntextManager.js
node --check tests/qa/intext-p14a2-analysis.cjs
node --check tests/intext-p14a2-analysis.audit.test.cjs
git diff --check
```

El intento directo encuentra `spawnSync git/node EPERM` y se conserva en [salida directa](intext-p14a2-validation-direct.txt). La ejecución completa verde usa el procedimiento temporal ya existente: resultados externos exactos de git rev-parse/diff y node --check, con SHA verificados; `INTEXT_FLOOR_AUDIT_BASELINE` lee la exportación real del commit `98106a032aa4d8b2cbc83855030973e6c4563dba`, SHA256 `e26e59f2f65c9bd2517e7582b53a1d5bc0781a63204b9b2e5fcc16ad50dd8118`. HEAD ya incluye el resolver posterior que el test histórico compara con el anterior. No se cambian expectativas ni se falsea git show. El preloader temporal se retira al terminar; no entra en variantes QA, probe o producción. Fuera de esa restricción puede usarse el comando normal con esa baseline histórica, como documenta la guía A1. No hay nuevas mediciones de Chrome por ejecutar mocks o por pasar estos tests.

No se han generado anuncios, requests de GAM ni nuevas sesiones de navegador desde este entorno. Producción, dependencias/versiones, config comercial, floors, targeting, GAMExp/WindowArray, PSP, Prebid/RichAudience, APS/TAM, random, timeout, waterfall, first-frame/reveal, PiP, animación, Display y refresh intactos. Sin commit, push, despliegue o enforce.
