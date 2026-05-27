Propuestas de mejora

Punto 1 — test-b: mejorar viewability sin doble subasta
El problema exacto: En test-b (random1=5) el maxDelayMs está a null (sin timer), y el fetchRootMargin es 650px pero el renderRootMargin es solo 250px. Cuando el usuario llega al render margin, el fetch ya lleva más de 8 segundos esperando (el maxFetchToRenderMs: 8000), se detecta como expirado (loading_phase_fetch_expired, pendingAgeMs: 10001ms), se lanza render-intersection-restart y se hace una segunda subasta completa ya con el slot casi encima. El objetivo de test-b era reducir el "tiempo hasta que el slot es visible" lanzando el render más tarde (más cerca del viewport), pero sin timer el slot solo renderiza cuando llega al margen de intersección, y si eso tarda más de 8s después del fetch, todo colapsa.
Propuesta: Dos cambios concretos en la config de test-b en default_ES_mobile.js:
a) Añadir maxDelayMs como red de seguridad para que si el render-intersection no llega antes de que la subasta caduque, el timer lo fuerce igual. El valor debe ser inferior a maxFetchToRenderMs (8000ms) para que cuando se dispare el timer, la subasta todavía sea válida. Un valor de 7000ms da margen suficiente:
json"5": {
  "name": "test-b",
  "slots": {
    "gexp-intext": {
      "loading": {
        "fetchRootMargin": "650px 0px",
        "renderRootMargin": "250px 0px",
        "maxDelayMs": 7000
      }
    },
    "gexp-intext-2": {
      "loading": {
        "fetchRootMargin": "500px 0px",
        "renderRootMargin": "150px 0px",
        "maxDelayMs": null
      }
    },
    ...
  }
}
Esto preserva el espíritu del test (render más cercano al viewport = mejor viewability) pero evita la doble subasta si el usuario es lento. gexp-intext-2 puede quedar sin timer porque su fetchRootMargin es menor y la ventana de caducidad es más difícil de superar.
b) Opcionalmente subir maxFetchToRenderMs de 8000 a 10000 solo para test-b (se puede configurar por variante si el código lo soporta vía mergedLoading). Esto ampliaría la ventana de validez de la subasta sin cambiar el comportamiento de render. Sin embargo, la opción (a) es más limpia porque actúa antes del problema. Ambas pueden combinarse.
Efecto esperado: La viewability mejoraría porque el render sigue ocurriendo más tarde (más cerca de cuando el usuario ve el slot), pero la subasta nunca caduca porque el timer actúa de fallback. El control (random1=6) usa 1500ms de maxDelayMs porque es el comportamiento base; en test-b 7000ms garantiza que el render nunca tarde más de 7s independientemente del scroll.

Punto 2 — Slot fantasma post-vídeo: sin destrucción de cajas, sin CLS
Causa exacta: Cuando el vídeo termina y startAuction("refresh") entra por el path currentState === "video", el código hace esto en orden:

Llama a ensureSingleVisibleIntextSurface("video", ...) → el videoEl se mantiene visible.
Activa el loader "Recuperando anuncio" en el videoEl y lo deja con is-open, display:block, opacity:1.
Oculta el displayEl a display:none.
…más tarde, cuando llega el FILL de display, showDisplay llama a ensureSingleVisibleIntextSurface("display", ...) que oculta el videoEl y muestra el displayEl.

El slot fantasma aparece porque tanto el videoEl como el displayEl existen en el DOM uno debajo del otro (así los insertó createIntextPositions: display primero, video justo a continuación). El videoEl con su loader queda visible mientras el displayEl abre encima. El resultado visible es que hay dos cajas con "Recuperando anuncio" superpuestas brevemente.
Propuesta: Cambiar el orden en el path currentState === "video" del startAuction. En lugar de mostrar el loader en el videoEl, trasladar el loader al displayEl (que es la caja padre que va a sobrevivir), y ocultar el videoEl inmediatamente. El displayEl se mantiene con su altura preservada y el loader, mientras llega el display. Así nunca hay dos cajas abiertas a la vez.
Específicamente, en el bloque if (currentState === "video") dentro del trigger === "refresh" (líneas ~7548-7580 del _gam_kv_.js):
js// ACTUAL — pone el loader en el videoEl (que luego genera el slot fantasma):
if (currentState === "video") {
  this.node.ensureSingleVisibleIntextSurface("video", renderToken, "startAuction_refresh_video_wait_surface");
  const videoEl = this.node.videoContainer?.getElement();
  if (videoEl) {
    // ... añade loader al videoEl, lo hace visible
  }
  const displayEl = this.container.getElement();
  if (displayEl) {
    // oculta displayEl
  }
}

// PROPUESTA — usar el displayEl como portador del loader de transición:
if (currentState === "video") {
  const videoEl = this.node.videoContainer?.getElement();
  const displayEl = this.container.getElement();

  // 1. Ocultar el videoEl PRIMERO — sin destruirlo, sin CLS
  if (videoEl) {
    videoEl.style.display = "none";
    videoEl.style.opacity = "0";
    videoEl.classList.remove("is-open");
    const loaderVideo = videoEl.querySelector(".gexp-intext-loader");
    if (loaderVideo) loaderVideo.style.display = "none";
  }

  // 2. Activar el displayEl con su altura preservada y el loader
  if (displayEl) {
    const preservedHeight = this.node.getPreservedRefreshHeight(displayEl);
    this.node.applyDisplayWrapperHeight(displayEl, preservedHeight, {
      logReason: preservedHeight === 600 ? "display_300x600_visual_height_adjusted" : "",
      source: "refresh_prepare_display_container_from_video",
    });
    let loaderDisplay = displayEl.querySelector(".gexp-intext-loader");
    if (!loaderDisplay) {
      displayEl.insertAdjacentHTML('beforeend', '<div class="gexp-intext-loader"><div class="gexp-intext-spinner"></div><div class="gexp-intext-loader-text">Recuperando anuncio</div></div>');
      loaderDisplay = displayEl.querySelector(".gexp-intext-loader");
    }
    if (loaderDisplay) loaderDisplay.style.display = "flex";
    displayEl.classList.add("is-open");
    displayEl.style.display = "block";
    displayEl.style.opacity = "1";
  }
}
Lo que esto garantiza:

Solo hay una caja visible en todo momento (displayEl).
El videoEl desaparece de forma limpia antes de que el displayEl abra.
No se toca destroyDisplayForRetry ni ningún otro flujo existente, solo el path específico del refresh post-vídeo.
El guard del 600px ya está en getPreservedRefreshHeight/applyDisplayWrapperHeight, que no se toca.
El ensureSingleVisibleIntextSurface("video", ...) inicial ya no es necesario en este path porque gestionamos el videoEl directamente antes de que se abra nada.


Punto 3 — Flash de billboard/creativo especial: sin flashazo, sin CLS
Causa exacta: En showDisplay, el orden actual es:

container.open(lockedHeight) → el wrapper tiene height CSS animada hacia el valor destino.
slotDoc.style.display = "block" y opacity = "1" → el slot es visible con el iframe sin escalar.
applyDisplayRenderLayout(...) → aplica el transform: scale(0.3381) y display: flex sobre el wrapper.

Entre los pasos 2 y 3 hay una llamada a waitForViewport (async) más toda la lógica de clasificación, lo que significa que el slot pasa un instante visible con el iframe a 970px sin comprimir → destello visual.
Propuesta: Antes de hacer visible el slot, detectar si el creativo entrante es isSpecial y si lo es, pre-aplicar visibility: hidden sobre el slotDoc (no display:none, para no interferir con el tamaño y no causar reflow/CLS). Una vez que applyDisplayRenderLayout haya terminado de aplicar el transform, restaurar visibility: "". Esto es quirúrgico: solo afecta al path especial, no toca nada de los creatuvos estándar ni el guard del 600.
El punto de inserción es en showDisplay, justo después de que slotDoc existe y antes de container.open:
js// Detectar si el creativo entrante es special ANTES de abrir el slot
const incomingSpecialProfile = this.getDisplaySpecialCreativeProfile(
  renderSize.gamWidth,
  renderSize.gamHeight
);

if (slotDoc) {
  slotDoc.style.transition = "none";
  if (this.lockedHeight) {
    slotDoc.dataset.lockedHeight = String(this.lockedHeight);
  }
  // Pre-ocultar solo si es special, para que el transform se aplique antes de revelar
  if (incomingSpecialProfile.isSpecial) {
    slotDoc.style.visibility = "hidden";
  }
}

this.container.open(this.lockedHeight);
// ... resto del código existing (display:block, opacity:1, margin, padding)

this.applyDisplayRenderLayout(slotDoc, {
  gamWidth: renderSize.gamWidth,
  gamHeight: renderSize.gamHeight,
  actualHeight: actualCreativeHeight,
  reason: "display_showDisplay",
  renderToken,
});

// Revelar solo después de que el transform ya esté aplicado
if (incomingSpecialProfile.isSpecial && slotDoc?.isConnected) {
  slotDoc.style.visibility = "";
}

// ... setTimeout transition restore ya existente, sin tocar
Por qué visibility:hidden y no opacity:0 o display:none:

display:none rompería el cálculo de clientWidth dentro de applyDisplayRenderLayout (usa slotEl.clientWidth para calcular el scaleFactor), y destruiría el flujo de container.open.
opacity:0 ya está gestionado por CSS transition y el código existente; mezclar los dos puede interferir.
visibility:hidden es la única opción que mantiene el elemento en el layout (preservando las dimensiones para el cálculo del scale y sin CLS) pero lo hace invisible al usuario. Es CSS puro, sin side effects sobre el flujo de código existente.

Lo que NO se toca:

El guard lockedHeight === 600 y markDisplayHeightLock.
applyDisplayWrapperHeight y sus paths para 600.
El setTimeout de restauración de la transition.
El flujo de isSpecial dentro de applyDisplayRenderLayout — ese código queda exactamente igual, solo se añade el visibility antes y se quita después.
Todo el path de creatuvos estándar (300×250, 300×600, etc.) — incomingSpecialProfile.isSpecial será false y el if no se ejecuta.
