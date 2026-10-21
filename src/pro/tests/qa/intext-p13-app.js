/* QA-only probe. Executes the current creative/container classes, not the bundle bootstrap. */
'use strict';
const $ = id => document.getElementById(id), logs = [], undo = [], observedManagers = new WeakSet();
let creative, container, node, origin = performance.now(), observation;
window.gexpIntextDebug = true;
function rect(el) { if (!el) return null; const r = el.getBoundingClientRect(); return Object.fromEntries(['top','left','bottom','right','width','height'].map(k => [k,r[k]])); }
function snapshot() {
  const player = creative?.player, root = player?.el?.();
  const media = [...(root?.querySelectorAll('video') || [])].map(el => ({ base: el === creative.videoEl,
    rect: rect(el), currentTime: el.currentTime, readyState: el.readyState, networkState: el.networkState,
    paused: el.paused, ended: el.ended, errorCode: el.error?.code || null, muted: el.muted,
    autoplay: el.autoplay, playsinline: el.playsInline, videoWidth: el.videoWidth, videoHeight: el.videoHeight }));
  let adsState = null, managerAvailable = false;
  try { adsState = player?.ads?._state?.constructor?.name || player?.ads?.state || null; managerAvailable = !!player?.ima?.getAdsManager?.(); } catch {}
  return { slotId: node?.id, renderToken: node?._activeRenderToken, documentVisibility: document.visibilityState,
    videojsVersion: window.videojs?.VERSION || null, imaVersion: window.google?.ima?.VERSION || null,
    anchorRect: rect($('anchor')), wrapperRect: rect($('surface')), playerRect: rect(root),
    imaContainerRect: rect(root?.querySelector('.ima-ad-container, .vjs-ima-ad-container')),
    wrapperDisplay: getComputedStyle($('surface')).display, wrapperOpacity: getComputedStyle($('surface')).opacity,
    adsState, managerAvailable, pausedForEligibility: creative?._pausedForEligibility || false, media,
    adsSnapshotPresent: player?.ads?.snapshot != null,
    playerDisposed: player?.isDisposed?.() ?? null,
    userActivation: navigator.userActivation ? { isActive: navigator.userActivation.isActive, hasBeenActive: navigator.userActivation.hasBeenActive } : null };
}
function record(event, data = {}) {
  const entry = { event, elapsedMs: performance.now() - origin, timestamp: Date.now(), ...data, snapshot: snapshot() };
  logs.push(entry); $('log').textContent = JSON.stringify(logs.slice(-12), null, 2);
}
// Diagnostic only: retain uncaught SDK errors and full stack; never preventDefault.
window.addEventListener('error', event => record('qa-window-error', {
  message:event.message, filename:event.filename, line:event.lineno, column:event.colno,
  stack:event.error?.stack || null,
}));
window.addEventListener('unhandledrejection', event => record('qa-unhandled-rejection', {
  message:String(event.reason?.message || event.reason), stack:event.reason?.stack || null,
}));
const collector = { recordMetric: (event, data) => record(event, scalar(data)), recordVideoEvent: (event, n, data) => record(event, scalar(data)), recordTimeline: event => record(event) };
function scalar(data = {}) { return Object.fromEntries(Object.entries(data).filter(([k,v]) => !['node','creative','element','player','mediaElement'].includes(k) && (v === null || ['string','number','boolean'].includes(typeof v)))); }
function stop() {
  creative?.destroy(); observation?.disconnect(); observation = null;
  for (const cleanup of undo.splice(0)) cleanup();
  creative = null; $('surface').replaceChildren(); record('qa-destroyed');
}
function probeManager(manager) {
  if (!manager || observedManagers.has(manager)) return;
  // Instance wrappers delegate unchanged arguments, this and return values. Never invoke SDK control.
  const originals = [];
  for (const name of ['init','start','pause','resume','resize','destroy']) {
    const original = manager[name]; if (typeof original !== 'function') continue;
    const wrapped = function (...args) { record('sdk-api-called', { api: name, args: args.map(v => typeof v === 'object' ? '[object]' : v) });
      try { const value = original.apply(this, args); record('sdk-api-returned', { api: name, returnType: typeof value }); return value; }
      catch (error) { record('sdk-api-threw', { api: name, name: error.name, message: error.message }); throw error; } };
    try { manager[name] = wrapped; if (manager[name] === wrapped) originals.push(() => { manager[name] = original; }); } catch { record('sdk-api-not-writable', { api: name }); }
  }
  observedManagers.add(manager);
  const listeners = [];
  for (const name of ['LOADED','STARTED','PAUSED','RESUMED','IMPRESSION','COMPLETE','SKIPPED','ALL_ADS_COMPLETED','CONTENT_PAUSE_REQUESTED','CONTENT_RESUME_REQUESTED','LOG']) {
    const type = window.google?.ima?.AdEvent?.Type?.[name]; if (!type) continue;
    const listener = event => record('native-' + name, { adId: event.getAd?.()?.getAdId?.() || null });
    manager.addEventListener(type, listener); listeners.push(() => manager.removeEventListener(type, listener));
  }
  const errorType = window.google?.ima?.AdErrorEvent?.Type?.AD_ERROR;
  if (errorType) { const listener = event => record('native-AD_ERROR', { code: event.getError?.()?.getErrorCode?.(), message: event.getError?.()?.getMessage?.() }); manager.addEventListener(errorType, listener); listeners.push(() => manager.removeEventListener(errorType, listener)); }
  undo.push(() => { for (const cleanup of [...listeners,...originals]) cleanup(); observedManagers.delete(manager); });
}
async function prepare() {
  stop(); origin = performance.now(); logs.length = 0;
  const variant = $('variant').value;
  const tag = IntextP13Controls.variantTag(variant, $('tag').value.trim(), $('qa').checked);
  const response = await fetch('source/' + $('bundle').value); if (!response.ok) throw new Error('Source unavailable');
  const source = await response.text();
  const cut = (start,end) => { const a = source.indexOf(start), b = source.indexOf(end,a+start.length); if(a < 0 || b < 0) throw new Error('Current architecture markers missing'); return source.slice(a,b); };
  const classes = new Function('logIntext','warnIntext','errorIntext','intextDebugCollector',
    cut('class IntextContainer {','class IntextWaterfall {') + cut('class IntextVideoCreative {','class WPromise {')
    + 'return { Creative: IntextVideoCreative, Container: IntextContainer };')(
      message => record('core-log', { message: String(message).replace(/https?:\/\/\S+/g,'[url]') }),
      (message,error) => record('core-warning', { message: String(message), name: error?.name, detail: error?.message }),
      (message,error) => record('core-error', { message: String(message), name: error?.name, detail: error?.message }), collector);
  const viewport = new Function(cut('  getReadinessViewportState() {','  cancelViewportWaits(') .replace('  getReadinessViewportState() {','return function () {'))();
  const surface = $('surface'); surface.style.display = $('closure').value === 'display-none' ? 'none' : '';
  surface.style.height = $('closure').value === 'sized-hidden' ? '360px' : '0px'; surface.style.opacity = '0';
  container = new classes.Container(surface, {});
  node = { id: 'gexp-intext', _activeRenderToken: 1, _intextTelemetryCycleId: 1,
    config: { video: {} }, videoContainer: container, manager: {},
    getIntextTelemetryElement: () => $('anchor'), getReadinessViewportState: viewport,
    isActiveRenderToken: token => token === node._activeRenderToken,
    getDisplayStandardContentHeight: () => 360, mergeIntextTelemetry() {}, flushIntextTelemetryToCI() {},
    recordTelemetry: event => record(event), setIntextPipPlaybackActive() {}, cleanupIntextPip() {},
    playInitialOpenAnimation: () => { record('qa-animation-hook'); return true; },
    waterfall: { recordReadiness: (event,data) => record(event,scalar(data)), getVideoPreparationConfig: () => ({ enabled:true }),
      releasePreparedVideo() {}, getLoadingDistancePx: () => $('anchor').getBoundingClientRect().top - innerHeight },
    waitForViewport: () => new Promise(resolve => {
      const check = () => { if (node.getReadinessViewportState().eligible) { cleanup(); resolve('visible'); } };
      const io = new IntersectionObserver(check,{threshold:0,rootMargin:'0px'});
      const cleanup = () => { io.disconnect(); document.removeEventListener('visibilitychange',check); window.removeEventListener('scroll',check); };
      undo.push(() => { cleanup(); resolve('stale'); }); io.observe($('anchor'));
      document.addEventListener('visibilitychange',check); window.addEventListener('scroll',check,{passive:true}); check();
    }) };
  container.ownerNode = node;
  const creating = new classes.Creative({ node, config: node.config, container, adTagUrl: tag }); creative = creating;
  const lifecycle = $('lifecycle').value;
  if (lifecycle !== 'A' && !$('experiment').checked) throw new Error('Enable the explicit QA lifecycle experiment first');
  undo.push(IntextP13Lifecycle.install(creating, { variant:lifecycle, source, sdk:() => window.google.ima,
    record, eligible:() => node.getReadinessViewportState().eligible }));
  const createMedia = creating.createVideoElement;
  creating.createVideoElement = function() { const result = createMedia.call(this); record('qa-media-created'); return result; };
  const init = creating.initVideoJS;
  creating.initVideoJS = function () { init.call(this); record('player-created');
    const ima = this.player.ima;
    this.player.ima = Object.assign(function(...args) { record('qa-ima-init-called');
      const result = ima.apply(this,args); record('qa-ima-init-returned'); return result; },ima);
    for (const name of ['loadstart','loadedmetadata','play','playing','pause','error','ads-request','ads-loader','ads-manager','adsready','readyforpreroll','ads-load','adstart','adplaying','adtimeout','nopreroll','adserror','adend','alladscompleted'])
      this.player.on(name,event => { if (name === 'ads-manager') probeManager(event?.adsManager || this.player.ima.getAdsManager?.()); record('player-' + name); });
    const play = this.player.play;
    this.player.play = function (...args) { record('player-play-called'); const result = play.apply(this,args);
      result?.then?.(() => record('player-play-resolved'),error => record('player-play-rejected',{name:error.name,message:error.message})); return result; };
  };
  // Captures base media loadstart even before Video.js/contrib-ads exists.
  const mediaEvent = event => { if (surface.contains(event.target)) record('capture-' + event.type); };
  for (const name of ['loadstart','loadedmetadata','playing','pause','abort','error']) { surface.addEventListener(name,mediaEvent,true); undo.push(() => surface.removeEventListener(name,mediaEvent,true)); }
  record('qa-prepare-start', { variant, lifecycle, closure: $('closure').value, bundle: $('bundle').value });
  try { await creating.prepare(); record('qa-prepared'); } catch(error) { record('qa-prepare-failed',{name:error.name,message:error.message}); throw error; }
}
async function activate() { if (!creative) throw new Error('Prepare first');
  const prepared = logs.findLast(entry => entry.event === 'qa-prepared');
  if (!prepared) throw new Error('Preparation must finish before activation');
  const standbyMs = Date.now() - prepared.timestamp, minimum = Number($('standby').value) * 1000;
  if (standbyMs < minimum) throw new Error('Standby pending: ' + Math.ceil((minimum - standbyMs)/1000) + ' seconds');
  record('qa-activation-called',{standbyMs,standbyRequestedMs:minimum});
  try { await creative.render(); record('qa-render-resolved'); } catch(error) { record('qa-render-rejected',{name:error.name,message:error.message}); } }
$('prepare').onclick = () => prepare().catch(error => record('qa-error',{message:error.message}));
$('activate').onclick = () => activate().catch(error => record('qa-error',{message:error.message}));
$('stop').onclick = stop;
$('export').onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify({qaOnly:true,userAgent:navigator.userAgent,logs},null,2)],{type:'application/json'})); a.download = 'intext-p13-qa.json'; a.click(); URL.revokeObjectURL(a.href); };
$('har').onchange = async () => { const har = JSON.parse(await $('har').files[0].text()); record('qa-har-import',{responses:IntextP13Controls.harTimeline(har)}); };
window.p13 = { logs, prepare, activate, stop, snapshot };
// Activation remains explicit; a standby timer cannot authorize advertising or playback.
