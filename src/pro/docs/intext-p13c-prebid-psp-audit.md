# P1.3c — auditoría Prebid/PSP independiente, sin cambios comerciales

Fuente: los siete JSON originales identificados por hash en `intext-p13c-real-evidence.json`. Se conserva la separación entre targeting nativo Prebid, targeting reconstruido Intext y petición GAM. No se cambia ningún bidder, floor, alias, targeting, prioridad ni autoridad PSP/random.

## Hallazgos observados

Hay **7 warnings intext_prebid_targeting_missing_after_bid**: cuatro en desktop 10:04 (Slots 1/2 y ciclos posteriores), dos en desktop 10:05 (Slot 1) y uno en móvil 10:29 (Slot 1). En los **7/7**, el audit inmediatamente posterior al set muestra hb_pb/hb_bidder/hb_adid presentes en `pbjsTargeting`, mientras `gptSlotTargetingApiAvailable=false` y `gptSlotTargeting=null`.

No es el caso A «bid tiene targeting pero PBJS API no lo devuelve»: la API sí lo devuelve en estos warnings. La evidencia corresponde a API Prebid disponible frente a **API de targeting del node.slot no disponible en ese instante**. No se puede distinguir solo con ese booleano si el slot aún no existe o si hay un proxy sin ese método; no se ha probado una pérdida GPT causada por PSP. También aparece en móvil sin PSP.

Ejemplo concreto 10:29: auction `a7b3fce2-d010-4586-a18f-b6bef995f25f`, adUnit `gexp-intext`, un banner candidato; PBJS devuelve hb_pb=0.84, hb_bidder=richaudience y hb_adid=14132ecc8908179. El warning se emite antes de crear/adjuntar el GPT Display del primer render; el audit no dispone de getTargetingMap del node.slot. No se usa ese precio para decidir nuevos floors ni se concluye qué línea GAM ganó.

En dos warnings de ciclos posteriores de desktop, el hb_adid devuelto por la API no está entre los rawBannerBids de esa subasta corriente. La API consulta por adUnitCode, no por auctionId; puede exponer estado de otras subastas/bids todavía considerados por Prebid. Esto requiere correlación adicional de auction/TTL/ganador/render, **no autoriza filtrar bids ni declara un bug de caché por sí solo**. Los aliases cuyo nombre contiene video pueden responder banner; no deducir formato por nombre del bidder.

## Qué hace el código actual

executePrebid reúne respuestas del auction observado, registra auditoría de bids, llama setTargetingForGPTAsync([code]), captura inmediatamente la auditoría nativa y comprueba `node.slot?.getTargetingMap?.() || {}`. El warning se condiciona a que haya respuestas de cualquier formato y a que **ninguna** de las tres keys exista. No exige un banner ganador utilizable ni prueba que falten las tres en un slot nativo ya creado. No comprueba que las tres estén completas cuando solo existe una.

El nombre Async no demuestra que la llamada ya haya aplicado targeting al slot que el warning inspecciona. No se espera ni bloquea finalize. La reconstrucción manual Intext ocurre después y tiene un evento separado, intext_prebid_winner_targeting_audit; no debe interpretarse como targeting nativo. Tampoco debe compararse una API por adUnit global con un bid de auction distinto sin etiquetar esa diferencia.

## Instrumentación QA preparada

La copia derivada QA añade snapshots read-only antes y después de setTargetingForGPTAsync con slotExists, slotElementId, auctionId, adUnitCode, cycleId/token, bid.mediaType, adId, CPM bruto y subset hb_* de bid/API/slot. Si el objeto ofrece explícitamente __ctrl.innerObject, se registra la identidad y el targeting de ese handle; si no, es unknown, sin resolver ni sustituir autoridades. No se infiere un slot nativo ni se llama a un API alternativo stateful para fabricar el dato.

El native audit y el winner audit existentes se conservan. La propuesta no escribe targeting ni espera APIs. La próxima captura debe correlacionar estos snapshots con el slot real de slotRequested/slotRenderEnded y el targeting de la request GAM en HAR; una captura inmediata no certifica el estado final de una cola GPT.

## Prueba mínima pendiente

En PSP y sin PSP, Slot 1 auto y Slot 2 display_only: identificar código de adUnit, auctionId, tipo de cada bid, candidato banner y winner efectivo; registrar API Prebid antes/después, existencia/identidad del GPT slot, native/proxy cuando el handle esté observado y hb_* antes del request GAM. Comparar después el targeting reconstruido por Intext y el HAR real. Repetir refresh con APIs que devuelven bids anteriores; comprobar TTL/auction sin alterar selección.

Clasificar cada caso: bid/API/slot presentes, API presente pero slot todavía no observable, proxy distinto observado, targeting aplicado posteriormente, bid de otro formato, API relacionada con otro auction, o evidencia insuficiente. No corregir el warning ni la monetización en P1.3c basándose únicamente en ausencia de keys.
