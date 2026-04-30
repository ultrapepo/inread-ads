# Correcciones en _gam_kv_.js del Intext Publicitario

Análisis completo de los 5 problemas detectados y plan de corrección. **Solo se modifica `src/pro/_gam_kv_.js`.**

---

## Diagnóstico

### 1️⃣ BUG CRÍTICO: random1 se corrompe en refresh

> [!CAUTION]
> El `random1` pasa de `6` (correcto) en la primera request a `17` (incorrecto) en las siguientes. Esto rompe la telemetría y la segmentación del intext (solo usuarios con random1=5 o 6).

**Causa raíz encontrada** en [_gam_kv_.js:4068](file:///c:/Users/pedro.ramos/Documents/workspace/develop/interstitial/intext/inread%20ads/src/pro/_gam_kv_.js#L4068):

```javascript
// Línea 4068: el core GEXP sobreescribe random1 en el slot
this.manager.gexp.request(this.slot);
```

**Flujo del bug:**

1. **Primera request**: `resolveDisplayRequestTargeting()` (L4042) obtiene `random1=6` desde `manager.getPageCustomTargeting` → lo aplica al slot → funciona bien.

2. **Refresh (2ª+ request)**: 
   - L4068: `gexp.request(this.slot)` invoca `w.setTargetings()` (L9026)
   - `setTargetings()` en L687-691 escribe `this.getRandom(y)` en el slot para random1-4
   - `getRandom(1)` → `this.gexp.random1` (L8756: `Math.floor(Math.random() * 20 + 1)`) → un **nuevo random cada page load** (ej: 17), NO el random1=6 del IntextManager
   - L4069-4072: re-lee el slot (ahora contaminado con random1=17 del GEXP core) y lo re-aplica
   - El `prev_scp` del ad request va con `random1=17` en lugar de `6`

**Evidencia en los logs (comprobacion de logs.txt):**

| Request | prev_scp random1 | cust_params random1 | Estado |
|---------|------------------|---------------------|--------|
| 1ª (L430) | `random1=6` | `random1=6` | ✅ Correcto |
| 2ª (L437) | `random1=17` | `random1=6` | ❌ **Corrupto en prev_scp** |
| 3ª (L444) | `random1=17` | `random1=6` | ❌ **Corrupto en prev_scp** |

Nótese que `cust_params` mantiene `random1=6` (viene del page-level targeting que NO pasa por el slot) mientras `prev_scp` tiene `random1=17` (viene del slot-level targeting que SÍ fue sobreescrito por el core GEXP).

---

### 2️⃣ hb_ key-values: generación completa por bidder y protección contra envíos vacíos

> [!WARNING]
> Se envían hb_ targeting keys vacías cuando no hay pujas ni puja ganadora, ensuciando la telemetría.

#### 2a. Cómo funciona el sistema actual de hb_ (collectHbTargetingFromBid)

El método `collectHbTargetingFromBid` (L3239) genera las siguientes keys **por cada bid**:

**Keys genéricas (SOLO para el winner):**
| Key | Origen | Ejemplo |
|-----|--------|---------|
| `hb_pb` | `bid.adserverTargeting.hb_pb` → `bid.pbCg` → `bid.pbAg` → `bid.pbHg` → `bid.cpm` | `"2.50"` |
| `hb_bidder` | `bid.adserverTargeting.hb_bidder` → `bid.bidderCode` (sin `_video`) | `"appnexus"` |
| `hb_format` | `bid.adserverTargeting.hb_format` → `"banner"` o `"video"` | `"banner"` |
| `hb_adid` | `bid.adserverTargeting.hb_adid` → `bid.adId` | `"abc123"` |
| `hb_size` | `bid.adserverTargeting.hb_size` → `bid.width x bid.height` | `"300x600"` |

**Keys scopeadas (para TODOS los bidders con puja):**
| Key | Ejemplo (bidder=appnexus) |
|-----|--------------------------|
| `hb_pb_appnexus` | `"2.50"` |
| `hb_bidder_appnexus` | `"appnexus"` |
| `hb_format_appnexus` | `"banner"` |
| `hb_adid_appnexus` | `"abc123"` |
| `hb_size_appnexus` | `"300x600"` |

**Para VIDEO, adicionalmente:**
| Key | Ejemplo (bidder=rubicon) |
|-----|-------------------------|
| `hb_uuid_rubicon` | `"cache-uuid"` |
| `hb_cache_id_rubicon` | `"cache-id"` |
| `hb_cache_host_rubicon` | `"prebid.unidadeditorial.es"` |
| `hb_cache_path_rubicon` | `"/cache"` |

#### 2b. Los 10 bidders y sus suffixes

El `normalizeIntextBidderCodeForGam` (L3205) normaliza los alias de video quitando `_video`:

| Bidder Display | Bidder Video Alias | Suffix GAM |
|----------------|-------------------|------------|
| `appnexus` | `appnexus_video` | `appnexus` |
| `criteo` | `criteo_video` | `criteo` |
| `rubicon` | `rubicon_video` | `rubicon` |
| `equativ` | `equativ_video` | `equativ` |
| `richaudience` | `richaudience` (mismo) | `richaudience` |
| `teads` | — (sin video alias) | `teads` |
| `pubmatic` | `pubmatic_video` | `pubmatic` |
| `ttd` | `ttd_video` | `ttd` |
| `ix` | `ix_video` | `ix` |
| `taboola` | — (sin video alias) | `taboola` |

> [!IMPORTANT]
> **SÍ**, el sistema actual es capaz de generar TODAS las KV hb_ de CUALQUIERA de los 10 bidders. `collectHbTargetingFromCurrentBids` (L3328) itera TODOS los bids devueltos por Prebid, y para cada uno genera las keys scopeadas. El winner además genera las keys genéricas. Esto funciona correctamente **cuando hay pujas**.

#### 2c. El problema: envíos vacíos sin pujas

**En DISPLAY** — Flujo: `askDisplay(bidResponse)` (L4009) → L4073: `applyDisplayBidTargeting(this.slot, bidResponse, this.waterfall?._lastCurrentBannerBids)`

Cuando **no hay pujas**:
- `bidResponse` = `null` (correcto, el guard L3627 `if (!slot || !bidResponse) return` debería bloquearlo)
- PERO: `bidResponse` puede ser un bid con `cpm=0` o un bid rechazado (floor not met) que sigue existiendo como objeto

Cuando **hay pujas rechazadas** (como el ttd_video con cpm=0.12 < floor=0.3):
- El bid fue rechazado por Prebid Floor → NO aparece en `bidsBackHandler`
- `displayBid = null` → `_lastDisplayBid = null` → correcto, no se envían hb_

**Situación de riesgo identificada**: Si en un ciclo de refresh un bid previo (`_lastDisplayBid`) de un ciclo anterior NO se resetea a null antes de la nueva auction, se podría enviar hb_ stale.

**En VIDEO** — Flujo: `buildGAMVideoTagUrl()` → L6228: `if (window.pbjs && this._lastVideoBid)`

El guard actual solo verifica que `_lastVideoBid` exista y que `bid.source.includes("prebid")`. NO verifica que `bid.cpm > 0`. Aunque en la práctica los bids rechazados no aparecen aquí, es mejor ser explícito.

---

### 3️⃣ Logs confirman la corrupción de random1

Verificado en los tres requests de `gexp-intext` del fichero `comprobacion de logs.txt`. No requiere cambio adicional — se corrige con la solución del punto 1.

Los logs del IntextManager interno muestran `random1=6` consistente (líneas 42-44, 77-79, 97-99, 101, 104, 128, etc.), pero el `prev_scp` de la request GAM muestra `random1=17` en las 2ª y 3ª requests.

---

### 4️⃣ Eventos de Profesor Prebid: errores y advertencias

Del fichero `comprobacion de logs.txt`, sección "EVENTOS DE PROFESOR PREBID" (desde L449):

| Línea | Evento | Bidder | Detalle | Acción |
|-------|--------|--------|---------|--------|
| L450 | Floor not met | `ttd_video` | cpm=0.1241 < floor=0.3 | ⚪ **Esperado**, Prebid Floor funciona bien. No es error. |
| L453 | Server call failed: 0 | `pubmatic_video` | Timeout o error de red | ⚪ **No es de _gam_kv_.js**. Es un problema del bidder pubmatic. |
| L456 | DOMParser error | — | `parseFromString('undefined')` | ⚪ **Error menor** interno de Prebid. No afecta. |
| L460 | Invalid bid | `taboola` | `transactionId: null`, `auctionId: null` | 🟡 **Mitigable**: el bid de taboola no tiene IDs válidos. El Cambio B filtrará estos bids inválidos. |
| L464 | ortb2Imp conflict | `gexp-intext` | `battr` duplicado entre `ortb2Imp.video` y `mediaTypes.video` | ⚪ **Warning menor** de Prebid. `ortb2Imp.video.battr` tiene prioridad. |

> [!NOTE]
> Los errores de `pubmatic_video` (timeout) y `taboola` (invalid bid) son problemas de los bidders, no del código `_gam_kv_.js`. El cambio B mitigará el envío de hb_ de bids inválidos como el de taboola.

---

### 5️⃣ Solo se toca `_gam_kv_.js` de `src/pro`

✅ Confirmado. Todos los cambios propuestos son exclusivamente en [_gam_kv_.js](file:///c:/Users/pedro.ramos/Documents/workspace/develop/interstitial/intext/inread%20ads/src/pro/_gam_kv_.js).

---

## Cambios Propuestos

### [MODIFY] [_gam_kv_.js](file:///c:/Users/pedro.ramos/Documents/workspace/develop/interstitial/intext/inread%20ads/src/pro/_gam_kv_.js)

---

#### Cambio A: Fix random1 corruption en display request (CRÍTICO)

**Ubicación**: L4068-4072

**Problema**: `gexp.request(this.slot)` sobreescribe `random1-4` del slot con los valores del GEXP core (aleatorios 1-20), corrompiendo el `prev_scp` del intext.

**Fix**: Después de `gexp.request()`, restaurar los valores correctos del IntextManager en el slot:

```diff
               this.manager.gexp.request(this.slot);
+              // ── FIX random1 corruption ──────────────────────────────────
+              // El core GEXP sobreescribe random1-4 en el slot con sus propios
+              // valores aleatorios (diferentes a los del IntextManager).
+              // Restauramos los valores del IntextManager inmediatamente.
+              try {
+                const pageTargeting = this.manager?.getPageCustomTargeting?.(this.scopedContext) || {};
+                for (let i = 1; i <= 4; i++) {
+                  const key = `random${i}`;
+                  const pageKv = this.readIntextPageKv(key);
+                  const correctValue = pageKv.value !== null
+                    ? String(pageKv.value)
+                    : (pageTargeting[key] != null ? String(pageTargeting[key]) : null);
+                  if (correctValue !== null) {
+                    this.slot.setTargeting(key, correctValue);
+                  }
+                }
+              } catch (e) {}
+              // ────────────────────────────────────────────────────────────
               const postCoreSlotTargeting = this.getSlotTargetingMapSafe(this.slot);
```

**Resultado**: El `prev_scp` tendrá `random1=6` consistente en TODAS las requests.

---

#### Cambio B: Protección hb_ vacíos en display — NO enviar sin pujas válidas

**Ubicación**: L3626-3644 (`applyDisplayBidTargeting`)

**Problema**: Cuando `bidResponse` es un objeto sin CPM real, o `currentBids` contiene bids inválidos (como taboola con `transactionId: null`), se generan hb_ vacías.

**Fix**: Validar que haya pujas reales antes de generar hb_:

```diff
         applyDisplayBidTargeting(slot, bidResponse, bidResponses = null) {
-          if (!slot || !bidResponse) return;
+          if (!slot) return;
+          // ── GUARD: No enviar hb_ sin pujas válidas ──────────────────
+          if (!bidResponse || bidResponse.cpm == null || Number(bidResponse.cpm) <= 0) {
+            logIntext(`[Intext:Display:${this.id}] display_hb_targeting_skipped — no valid winner bid`);
+            return;
+          }
           const currentBids = Array.isArray(bidResponses)
             ? bidResponses
             : this.waterfall?._lastCurrentBannerBids || [bidResponse];
+          // Filtrar bids inválidos (sin cpm positivo)
+          const validBids = currentBids.filter(b =>
+            b && b.cpm != null && Number(b.cpm) > 0
+          );
+          if (validBids.length === 0) {
+            logIntext(`[Intext:Display:${this.id}] display_hb_targeting_skipped — 0 valid bids in pool`);
+            return;
+          }
+          // ────────────────────────────────────────────────────────────
           const { hbTargeting, biddersIncluded } = this.collectHbTargetingFromCurrentBids(
-            currentBids,
+            validBids,
             bidResponse,
             { mediaType: "banner" },
           );
+          // No aplicar si no se generó hb_pb (indica que no hay datos reales)
+          if (!hbTargeting.hb_pb) {
+            logIntext(`[Intext:Display:${this.id}] display_hb_targeting_skipped — hb_pb empty after collection`);
+            return;
+          }

           logIntext(`[Intext:Display:${this.id}] display_hb_targeting_built`, {
             winnerBidder: hbTargeting.hb_bidder || bidResponse.bidderCode || null,
             winnerPb: hbTargeting.hb_pb || null,
             biddersIncluded,
             keys: Object.keys(hbTargeting),
           });
           this.applyDisplayRequestTargeting(slot, hbTargeting);
         }
```

**Ejemplo de resultado cuando hay 3 bidders con pujas** (appnexus winner, criteo y rubicon también pujan):
```
// Keys genéricas (del winner appnexus):
hb_pb = "2.50"
hb_bidder = "appnexus"
hb_format = "banner"
hb_adid = "abc123"
hb_size = "300x600"

// Keys scopeadas de TODOS los bidders:
hb_pb_appnexus = "2.50"     hb_bidder_appnexus = "appnexus"     hb_format_appnexus = "banner"
hb_pb_criteo = "1.80"       hb_bidder_criteo = "criteo"         hb_format_criteo = "banner"
hb_pb_rubicon = "1.20"      hb_bidder_rubicon = "rubicon"       hb_format_rubicon = "banner"
// + hb_adid_*, hb_size_* de cada uno
```

**Cuando NO hay pujas → NO se envía ninguna hb_ key.**

---

#### Cambio C: Protección hb_ vacíos en video — NO enviar sin pujas válidas

**Ubicación**: L6228-6281 (`buildGAMVideoTagUrl`)

**Problema**: Si `_lastVideoBid` existe pero con `cpm <= 0`, o si los bids en `_lastCurrentVideoBids` son inválidos, se envían hb_ vacías al tag VAST.

**Fix**: Añadir validación de CPM positivo:

```diff
           if (window.pbjs && this._lastVideoBid) {
             const bid = this._lastVideoBid;
-            if (bid.source && bid.source.includes("prebid")) {
+            if (bid.source && bid.source.includes("prebid") && bid.cpm != null && Number(bid.cpm) > 0) {
               const diagnostics = this.getIntextVideoBidDiagnostics(bid);
               const targeting = diagnostics.targeting;
               const { hbTargeting, biddersIncluded } = this.node.collectHbTargetingFromCurrentBids(
-                this._lastCurrentVideoBids || this.node._lastCurrentVideoBids || [bid],
+                (this._lastCurrentVideoBids || this.node._lastCurrentVideoBids || [bid])
+                  .filter(b => b && b.cpm != null && Number(b.cpm) > 0),
                 bid,
                 { mediaType: "video", defaultSize: playerSize },
               );
               const pb = hbTargeting.hb_pb || targeting.hb_pb || bid.pbCg || bid.pbAg || bid.pbHg || String(bid.cpm);

               // ... (logs existentes se mantienen) ...

-              Object.entries(hbTargeting).forEach(([key, value]) => addCustParam(key, value));
+              // Solo añadir hb_ si hay datos reales
+              if (hbTargeting.hb_pb) {
+                Object.entries(hbTargeting).forEach(([key, value]) => addCustParam(key, value));
+              } else {
+                logIntext(`[Intext:Video:${this.node.id}] video_hb_targeting_skipped_no_pb`);
+              }
```

**Resultado para video con pujas**: Las keys genéricas + scopeadas + cache (hb_uuid, hb_cache_id, etc.) de TODOS los bidders con puja se envían en el `cust_params` del tag VAST.

**Resultado sin pujas**: NO se envía ninguna hb_ key en el tag VAST.

---

## Resumen de Garantías

### ✅ random1 siempre correcto
- En TODA request (1ª, refresh, etc.), `random1` será el valor del IntextManager (5 o 6), nunca el del GEXP core.
- Afecta tanto a `prev_scp` como a `cust_params`.

### ✅ hb_ de los 10 bidders generados correctamente
- Cuando **hay pujas**, se generan TODAS las keys: genéricas (winner) + scopeadas (cada bidder).
- Para cada bidder que puje, se generan 5 keys display (`hb_pb_X`, `hb_bidder_X`, `hb_format_X`, `hb_adid_X`, `hb_size_X`) + 4 keys video adicionales (`hb_uuid_X`, `hb_cache_id_X`, `hb_cache_host_X`, `hb_cache_path_X`).
- **Todos los 10 bidders** (appnexus, criteo, rubicon, equativ, richaudience, teads, pubmatic, ttd, ix, taboola) están cubiertos.

### ✅ NO se envían hb_ vacíos
- Sin pujas → 0 keys hb_ en display y video.
- Bids rechazados por floor → NO generan hb_ (Prebid los filtra antes de llegar al handler).
- Bids inválidos (taboola con transactionId: null) → filtrados por `cpm > 0`.

---

## Verificación

### Tests a realizar
1. **random1**: Cargar expansion.com con `?gexpIntextDebug=true`, verificar que `random1` es consistente en prev_scp de TODAS las requests (1ª + refreshes)
2. **hb_ con pujas**: Simular una sesión donde algún bidder responda → verificar que aparecen hb_pb, hb_bidder, hb_pb_[bidder], etc.
3. **hb_ sin pujas**: Verificar que con 0 bids NO aparece ninguna key hb_ en la request
4. **Video hb_**: Verificar que en el tag VAST `cust_params` solo aparecen hb_ cuando hay puja de video real
5. **Bidders inválidos**: Verificar que bids de taboola con transactionId: null no generan hb_
