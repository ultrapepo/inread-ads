const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const existing = fs.readFileSync(path.join(__dirname, 'intext-ima-preload-first-frame.audit.test.cjs'), 'utf8');
const harness = { require, __dirname, URL, URLSearchParams };
vm.runInNewContext(existing.slice(0, existing.indexOf("for (const file of ['_gam_kv_.js'")) + '\nthis.fixture = fixture;', harness);
const flush = async () => { for (let i = 0; i < 30; i++) await Promise.resolve(); };

function readiness(file) {
  const f = harness.fixture(file), observers = [], docEvents = new Map(), windowEvents = new Map();
  const events = (target, map) => {
    target.addEventListener = (name, fn) => { const set = map.get(name) || new Set(); set.add(fn); map.set(name, set); };
    target.removeEventListener = (name, fn) => { map.get(name)?.delete(fn); if (!map.get(name)?.size) map.delete(name); };
    target.emit = (name, data) => { for (const fn of [...(map.get(name) || [])]) fn(data); };
  };
  events(f.document, docEvents); events(f.window, windowEvents);
  f.window.innerWidth = 400;
  f.window.getComputedStyle = el => ({ display: el.style.display || "block", visibility: el.style.visibility || "visible", opacity: el.style.opacity || "1" });
  class Observer {
    constructor(callback, options) { this.callback = callback; this.options = options; this.connected = true; observers.push(this); }
    observe(anchor) { this.anchor = anchor; }
    disconnect() { this.connected = false; }
    emit(intersecting = true) { if (this.connected) this.callback([{ isIntersecting: intersecting, target: this.anchor }]); }
  }
  f.context.IntersectionObserver = Observer; f.window.IntersectionObserver = Observer;
  const wfStart = f.source.indexOf('class IntextWaterfall');
  vm.runInContext('this.Waterfall = ' + f.source.slice(wfStart, f.source.indexOf('class IntextVideoCreative', wfStart)), f.context);
  const viewportStart = f.source.indexOf('  getReadinessViewportState(');
  const viewportEnd = f.source.indexOf('  async showDisplay(', viewportStart);
  vm.runInContext('this.Viewport = class { ' + f.source.slice(viewportStart, viewportEnd) + ' };', f.context);
  const begin = f.source.indexOf('  beginVisualRender('), end = f.source.indexOf('  completeVisualRender(', begin);
  const build = f.source.indexOf('  async buildAndPlayVideo('), buildEnd = f.source.indexOf('  resolveIntextVideoRefreshPlan(', build);
  vm.runInContext('this.Transition = class extends Viewport { ' + f.source.slice(begin, end) + f.source.slice(build, buildEnd) + ' };', f.context);
  const players = [];
  const videojs = (el, options) => {
    const eventMap = new Map();
    const player = { el: () => el, options, disposed: false, on(name, fn) { eventMap.set(name, fn); },
      ready: fn => fn(), dispose() { this.disposed = true; }, muted: () => true, volume: () => 0,
      controls() {}, userActive() {},
      play: () => assert.fail('preparation must never play'),
      ima: () => assert.fail('preparation must never initialize IMA') };
    players.push(player); return player;
  };
  videojs.getPlugin = () => () => {};
  function ready() { f.window.videojs = videojs; f.window.google = { ima: {} }; }
  function slot(id, mode = 'auto', top = 1100, config = {}) {
    const anchor = f.element('span'), wrapper = f.element();
    anchor.isConnected = true; anchor.top = top;
    anchor.width = 300; anchor.height = 20; anchor.left = 0;
    anchor.getBoundingClientRect = () => ({ top: anchor.top, bottom: anchor.top + anchor.height, height: anchor.height,
      left: anchor.left, right: anchor.left + anchor.width, width: anchor.width });
    wrapper.style.height = '0px'; wrapper.style.opacity = '0'; wrapper.isConnected = true;
    const node = Object.assign(Object.create(f.context.Transition.prototype), {
      id, config: { decision: { mode }, loading: { videoPreparation: config } }, _activeRenderToken: 1,
      manager: { device: 'mobile' }, _intextTelemetryCycleId: 1,
      isActiveRenderToken(token) { return !this.destroyed && token === this._activeRenderToken; },
      getIntextTelemetryElement: () => anchor,
      container: { getElement: () => wrapper }, _renderTokenSeq: 1,
      resetIntextPipState() {}, cleanupIntextPip() {}, getIntextPipConfig: () => ({}),
      mergeIntextTelemetry() {}, applyIntextWrapperDebugAttributes() {},
      isIntextPipEffectiveEnabled: () => false, setupIntextViewportTelemetryObserver() {}, teardownIntextViewportTelemetryObserver() {},
      ensureSingleVisibleIntextSurface() {}, getDisplayStandardContentHeight: () => 360,
      getIntextDistancePx: () => anchor.top - 800, flushIntextTelemetryToCI() {}, commitIntextTelemetry() {},
      recordTelemetry() {}, discardDisplay() {}, completeVisualRender() {},
      videoContainer: { getElement: () => wrapper, open: () => assert.fail('preparation must not open'), close() {} },
    });
    const wf = Object.assign(Object.create(f.context.Waterfall.prototype), {
      node, config: node.config, loadingConfig: { videoPreparation: config, maxFetchToRenderMs: 8000 },
    });
    node.waterfall = wf;
    return { node, wf, anchor, wrapper };
  }
  function winner(s, format = 'video') {
    s.wf.pendingAuction = { timestamp: Date.now(), winner: format };
    s.wf.setupVideoPreparation(s.wf.pendingAuction);
  }
  function proximity(s, intersecting = true) {
    const observer = observers.findLast(o => o.connected && o.anchor === s.anchor && o.options.rootMargin !== '0px');
    observer?.emit(intersecting);
  }
  function visibility(hidden) {
    f.document.hidden = hidden; f.document.visibilityState = hidden ? 'hidden' : 'visible';
    f.document.emit('visibilitychange');
  }
  function move(s, top) {
    s.anchor.top = top;
    for (const o of observers.filter(o => o.connected && o.anchor === s.anchor && o.options.rootMargin === '0px')) o.emit();
  }
  return Object.assign(f, { observers, docEvents, windowEvents, players, ready, slot, winner, proximity, visibility, move });
}

for (const file of ['_gam_kv_.js', 'IntextManager.js']) {
  const check = (name, fn) => test(`${file}: predictive readiness ${name}`, fn);
  check('default lead is a viewport in pixels and slot overrides remain independent', () => {
    const f = readiness(file), a = f.slot('arbitrary-7'), b = f.slot('arbitrary-9', 'video_only', 1000, { maxPreparedPlayers: 1, preparationRootMargin: '1200px 0px' });
    assert.equal(a.wf.getVideoPreparationConfig().preparationRootMargin, '800px 0px');
    assert.equal(a.wf.getVideoPreparationConfig().maxPreparedPlayers, 2);
    assert.equal(b.wf.getVideoPreparationConfig().preparationRootMargin, '1200px 0px');
    assert.equal(b.wf.getVideoPreparationConfig().maxPreparedPlayers, 1);
  });
  for (const [m1, w1, m2, w2] of [
    ['display_only', 'display', 'display_only', 'display'], ['video_only', 'video', 'display_only', 'display'],
    ['display_only', 'display', 'video_only', 'video'], ['video_only', 'video', 'video_only', 'video'],
    ['auto', 'display', 'auto', 'video'], ['auto', 'video', 'auto', 'display'],
  ]) {
    check(`two arbitrary slots ${m1}/${w1} + ${m2}/${w2} prepare only actual video winners`, async () => {
      const f = readiness(file); f.ready(); const a = f.slot('position-A', m1), b = f.slot('position-Z', m2);
      f.winner(a, w1); f.winner(b, w2); f.proximity(a); f.proximity(b); await flush();
      assert.equal(f.players.length, 0, 'standby prepares dependencies, never players');
      assert.equal(a.wf._videoPreparation?.creative?._prepared || false, w1 === 'video');
      assert.equal(b.wf._videoPreparation?.creative?._prepared || false, w2 === 'video');
      assert.equal(a.wrapper.style.height, '0px'); assert.equal(b.wrapper.style.opacity, '0');
      for (const player of f.players) { assert.equal(player.options.autoplay, false); assert.equal(player.options.preload, 'none'); }
      a.wf.cancelVideoPreparation(); b.wf.cancelVideoPreparation();
      assert.equal(f.Creative._preparationEntries?.size || 0, 0); assert.equal(f.timers.size, 0);
    });
  }
  check('Video prepares before viewport without ads or duplicate player and activates once on reentry', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('video-later-slot', 'video_only');
    f.winner(s); f.proximity(s); await flush();
    const entry = s.wf.getPreparedVideo(1), creative = entry.creative;
    assert.equal(creative._prepared, true); assert.equal(f.players.length, 0);
    creative._preparationGuard = null; let requests = 0;
    creative.requestAds = async () => { requests++; };
    const first = creative.render(), second = creative.render(); assert.equal(first, second);
    await flush(); assert.equal(requests, 0);
    f.move(s, -100); await flush(); assert.equal(requests, 0);
    f.move(s, 300); await first; assert.equal(requests, 1); assert.equal(f.players.length, 1);
    s.wf.releasePreparedVideo(creative); creative.destroy();
    assert.equal(f.observers.filter(o => o.connected).length, 0); assert.equal(f.docEvents.size, 0);
  });
  check('actual buildAndPlayVideo prepares dependencies outside viewport then creates the player at eligible activation', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('actual-build', 'video_only'); let requests = 0;
    f.Creative.prototype.requestAds = async () => { requests++; };
    const build = s.node.buildAndPlayVideo('original-vast-tag', 1, 'render'); await flush();
    assert.equal(f.players.length, 0); assert.equal(s.node.activeCreative._prepared, true);
    assert.equal(requests, 0); assert.equal(s.wrapper.style.height, '0px');
    f.move(s, 300); assert.equal(await build, true); assert.equal(requests, 1); assert.equal(f.players.length, 1);
    assert.equal(s.node.activeCreative.adTagUrl, 'original-vast-tag'); s.node.activeCreative.destroy();
    assert.equal(f.timers.size, 0); assert.equal(f.docEvents.size, 0);
  });
  check('actual build honors preparation opt-out and creates no player before viewport', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('legacy-build', 'video_only', 1100, { enabled: false });
    let requests = 0; f.Creative.prototype.requestAds = async () => { requests++; };
    const build = s.node.buildAndPlayVideo('original-vast-tag', 1, 'render'); await flush();
    assert.equal(f.players.length, 0); assert.equal(requests, 0);
    f.move(s, 300); assert.equal(await build, true); assert.equal(requests, 1); assert.equal(f.players.length, 1);
    s.node.activeCreative.destroy();
  });
  check('hidden document defers preparation and activation until visible', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('hidden-slot', 'auto', 300);
    f.visibility(true); f.winner(s); f.proximity(s); await flush(); assert.equal(f.players.length, 0);
    f.visibility(false); await flush(); assert.equal(f.players.length, 0);
    assert.equal(s.wf._videoPreparation.creative._prepared, true);
    const creative = s.wf.getPreparedVideo(1).creative; creative._preparationGuard = null;
    let requests = 0; creative.requestAds = async () => { requests++; };
    f.visibility(true); const render = creative.render(); await flush(); assert.equal(requests, 0);
    f.visibility(false); await render; assert.equal(requests, 1);
    s.wf.releasePreparedVideo(creative); creative.destroy();
  });
  check('stale token and removed anchor settle viewport waits and disconnect', async () => {
    const f = readiness(file), s = f.slot('obsolete');
    const waiting = s.node.waitForViewport(1); s.node._activeRenderToken = 2; f.move(s, 300);
    assert.equal(await waiting, 'stale'); assert.equal(f.docEvents.size, 0);
    s.anchor.top = 1100;
    const removed = s.node.waitForViewport(2); s.anchor.isConnected = false; f.move(s, 300);
    assert.equal(await removed, 'stale'); assert.equal(s.node._viewportWaits.size, 0);
  });
  check('destroy during dependencies await cannot construct or resurrect a player', async () => {
    const f = readiness(file), s = f.slot('destroy-during-await'); f.winner(s); f.proximity(s);
    const creative = s.wf._videoPreparation.creative;
    s.wf.cancelVideoPreparation('navigation'); await f.finishAssets(); await flush();
    assert.equal(creative._destroyed, true); assert.equal(f.players.length, 0);
    assert.equal(f.Creative._preparationEntries.size, 0); assert.equal(f.timers.size, 0);
  });
  check('nearest slot preempts bounded standby and lease expiry prevents starvation', async () => {
    const f = readiness(file); f.ready(); const cfg = { maxPreparedPlayers: 1, preparedMaxAgeMs: 500 };
    const a = f.slot('far', 'video_only', 1500, cfg), b = f.slot('near', 'video_only', 1000, cfg);
    f.winner(a); f.proximity(a); await flush(); const old = a.wf._videoPreparation.creative;
    f.winner(b); f.proximity(b); await flush(); assert.equal(old._destroyed, true);
    assert.equal([...f.Creative._preparationEntries.values()].filter(e => e.busy).length, 1);
    f.proximity(a); await flush(); assert.equal(a.wf._videoPreparation.busy, false);
    f.tick(500); await flush(); assert.equal(a.wf._videoPreparation.busy, true);
    a.wf.cancelVideoPreparation(); b.wf.cancelVideoPreparation(); assert.equal(f.timers.size, 0);
  });
  check('a stricter slot budget never starts above capacity after replacing one of several standbys', async () => {
    const f = readiness(file); f.ready();
    const far = f.slot('far-wide-budget', 'video_only', 1500, { maxPreparedPlayers: 2 });
    const middle = f.slot('middle-wide-budget', 'video_only', 1200, { maxPreparedPlayers: 2 });
    const near = f.slot('near-tight-budget', 'video_only', 1000, { maxPreparedPlayers: 1 });
    for (const s of [far, middle]) { f.winner(s); f.proximity(s); await flush(); }
    assert.equal([...f.Creative._preparationEntries.values()].filter(e => e.busy).length, 2);
    f.winner(near); f.proximity(near); await flush();
    assert.equal(near.wf._videoPreparation.busy, false);
    assert.equal([...f.Creative._preparationEntries.values()].filter(e => e.busy).length, 1);
    middle.wf.cancelVideoPreparation(); await flush();
    assert.equal(near.wf._videoPreparation.busy, true);
    assert.equal([...f.Creative._preparationEntries.values()].filter(e => e.busy).length, 1);
    for (const s of [far, middle, near]) s.wf.cancelVideoPreparation();
    assert.equal(f.timers.size, 0);
  });
  check('leaving the preparation zone releases resources and reentry creates a fresh player', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('fast-scroll'); f.winner(s); f.proximity(s); await flush();
    const old = s.wf._videoPreparation.creative;
    f.move(s, -50); f.proximity(s, false); assert.equal(old._destroyed, true);
    f.move(s, 1100); f.proximity(s); await flush(); assert.notEqual(s.wf._videoPreparation.creative, old);
    s.wf.cancelVideoPreparation();
  });
  check('refresh Video to Display to Video invalidates ownership and keeps shared dependencies', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('mode-changing', 'auto');
    f.winner(s); f.proximity(s); await flush(); const first = s.wf._videoPreparation.creative;
    f.winner(s, 'display'); assert.equal(first._destroyed, true); assert.equal(s.wf._videoPreparation, null);
    s.node._activeRenderToken++; f.winner(s); f.proximity(s); await flush();
    assert.equal(f.players.length, 0); assert.equal(f.assets.filter(a => a.tagName === 'SCRIPT').length, 0);
    s.wf.cancelVideoPreparation();
  });
  check('opt-out and unknown/Display winner do not create observers or players', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('disabled', 'auto', 1000, { enabled: false });
    f.winner(s); f.proximity(s); await flush(); assert.equal(f.players.length, 0); assert.equal(f.observers.length, 0);
  });
  check('no IntersectionObserver uses visible geometry plus events instead of activating offscreen', async () => {
    const f = readiness(file); delete f.context.IntersectionObserver;
    const s = f.slot('no-observer'); let resolved = false;
    const wait = s.node.waitForViewport(1).then(() => { resolved = true; });
    await flush(); assert.equal(resolved, false); s.anchor.top = 300; f.window.emit('scroll'); await wait;
    assert.equal(f.windowEvents.size, 0); assert.equal(f.docEvents.size, 0);
  });
  function runtime(f, mediaFound = true, enabled = true) {
    const s = f.slot('runtime-position-Z', 'auto', 300, { enabled });
    const r = f.playback({ mediaFound });
    Object.setPrototypeOf(r.node, f.context.Viewport.prototype);
    r.node.getIntextTelemetryElement = () => s.anchor;
    r.node.waterfall = s.wf; s.wf.node = r.node;
    r.creative.observeActivationEligibility();
    return { s, r };
  }
  check('actual first frame after fast scroll is held, paused and revealed once on reentry without another request', async () => {
    const f = readiness(file), { s, r } = runtime(f);
    let pauses = 0, resumes = 0;
    const manager = { pause() { pauses++; r.media.paused = true; }, resume() { resumes++; r.media.paused = false; r.nativeResumed(); } };
    r.player.ima.getAdsManager = () => manager;
    r.media.pause = () => { r.media.paused = true; };
    r.started(); f.move(s, -100); r.frame(); await flush();
    assert.equal(r.opens, 0); assert.equal(r.node._intextPipFirstFrameConfirmed, true);
    assert.ok(pauses > 0); assert.equal(r.wrapper.style.opacity, '0');
    f.move(s, 300); await r.result;
    assert.equal(r.opens, 1); assert.equal(resumes, 1);
    assert.equal(f.logs.filter(l => l.metric === 'first-frame').length, 1);
    assert.equal(f.logs.filter(l => l.metric === 'revealed').length, 1);
    f.move(s, 300); assert.equal(r.opens, 1);
    r.creative.destroy(); assert.equal(f.docEvents.size, 0);
  });
  check('hidden before frame holds reveal and visibility reentry reuses the same ad', async () => {
    const f = readiness(file), { r } = runtime(f); r.started(); f.visibility(true); r.frame();
    assert.equal(r.opens, 0); f.visibility(false); r.media.emit('playing'); await r.result; assert.equal(r.opens, 1);
    r.creative.destroy(); assert.equal(f.docEvents.size, 0);
  });
  check('predictive STARTED with no observable media never substitutes 500ms for a real frame', async () => {
    const f = readiness(file), { r } = runtime(f, false);
    r.started(); f.tick(500); assert.equal(r.opens, 0);
    assert.equal(f.logs.filter(l => l.metric === 'first-frame').length, 0);
    f.tick(24500); assert.match(String(await r.result), /video_ad_timeout/);
    r.creative.destroy(); assert.equal(f.docEvents.size, 0);
  });
  check('explicit opt-out preserves the historical native fallback compatibility', async () => {
    const f = readiness(file), { r } = runtime(f, false, false);
    r.started(); f.tick(500); await r.result; assert.equal(r.opens, 1);
    assert.equal(f.logs.find(l => l.metric === 'revealed').source, 'native_started'); r.creative.destroy();
  });
  for (const code of [303, 901]) {
    check('native VAST/VPAID error ' + code + ' stays terminal, hidden and does not retry requests', async () => {
      const f = readiness(file), { r } = runtime(f); r.nativeError(code);
      assert.match(String(await r.result), new RegExp(String(code)));
      assert.equal(r.opens, 0); assert.equal(r.creative._firstFrameWaitTimers.length, 0);
      f.tick(50); assert.equal(r.creative._destroyed, true); assert.equal(f.docEvents.size, 0);
    });
  }
  check('media abort emits observed media/lifecycle fields without asserting a viewport cause', async () => {
    const f = readiness(file), { r } = runtime(f); r.started(); r.media.emit('abort');
    const log = f.logs.find(l => l.metric === 'video_media_abort_observed');
    assert.equal(log.readyState, 2); assert.equal(log.networkState, 2);
    assert.equal(log.pausedForEligibility, false); assert.equal(log.destroyed, false);
    r.creative.abort(); await r.result;
  });
  check('AdsManager milestone is recorded only for its own observed plugin event', async () => {
    const f = readiness(file), { r } = runtime(f);
    r.adsLoad(); assert.equal(f.logs.filter(l => l.metric === 'video_ads_manager_loaded').length, 0);
    r.adsManagerLoaded(); const log = f.logs.find(l => l.metric === 'video_ads_manager_loaded');
    assert.equal(log.source, 'player-ads-manager'); r.creative.abort(); await r.result;
  });
  for (const waitMs of [20000, 45000]) check('render ownership survives ' + waitMs + 'ms of valid viewport waiting without a standby deadline', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('owned-wait', 'auto');
    f.winner(s); f.proximity(s); await flush(); const entry = s.wf.getPreparedVideo(1), creative = entry.creative;
    let requests = 0; creative.requestAds = async () => { requests++; };
    const render = creative.render(); await flush(); f.tick(waitMs); await flush();
    assert.equal(entry.state, 'RENDER_OWNED'); assert.equal(entry.leaseTimer, null);
    assert.equal(s.node._activeRenderToken, 1); assert.equal(creative._destroyed, false);
    assert.equal(requests, 0); assert.equal(f.Creative._preparationEntries.size, 0);
    f.move(s, 300); await render; assert.equal(requests, 1); assert.equal(entry.state, 'ACTIVATED');
    creative.destroy(); creative.destroy(); assert.equal(entry.state, 'RELEASED');
    assert.equal(f.docEvents.size, 0); assert.equal(f.timers.size, 0);
  });
  check('actual beginVisualRender cancels old waits, destroys the old player and invalidates preparation', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('new-cycle'); f.winner(s); f.proximity(s); await flush();
    const creative = s.wf.getPreparedVideo(1).creative; creative._preparationGuard = null; s.node.activeCreative = creative;
    creative.requestAds = () => assert.fail('stale cycle must never request');
    const render = creative.render(), rejection = assert.rejects(render, /stale_render_token/); await flush();
    s.node.beginVisualRender('auction_started', 'refresh'); await rejection;
    assert.equal(creative._destroyed, true); assert.equal(s.wf._videoPreparation, null);
    assert.equal(f.docEvents.size, 0); assert.equal(f.timers.size, 0);
  });
  check('startRender atomically claims ownership before delayed build and a queued original lease cannot cancel it', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('handoff-race');
    f.winner(s); s.wf.pendingAuction.timestamp = f.context.Date.now(); f.proximity(s); await flush();
    const entry = s.wf._videoPreparation, creative = entry.creative, originalTimeout = f.timers.get(entry.leaseTimer).fn;
    Object.assign(s.wf, { fetchStarted: true, fetchComplete: true, disconnectRenderObserver() {},
      getIntextOffYTelemetry: () => ({}), getIntextExpectedViewability: () => null, mergeLoadingPhaseTelemetry() {} });
    let requested = 0; s.wf.requestWinner = () => { requested++; };
    await s.wf.startRender('render-margin');
    assert.equal(requested, 1); assert.equal(entry.state, 'RENDER_OWNED'); assert.equal(entry.leaseTimer, null);
    const token = s.node._activeRenderToken;
    originalTimeout(); f.tick(20000); await flush();
    assert.equal(s.node._activeRenderToken, token); assert.equal(creative._destroyed, false);
    assert.equal(s.wf.getPreparedVideo(token), entry); assert.equal(s.wf.getPreparedVideo(token), entry);
    assert.equal(f.logs.filter(l => l.metric === 'video_preparation_ownership_transferred').length, 1);
    let ads = 0; creative.requestAds = async () => { ads++; };
    const build = s.node.buildAndPlayVideo('same-ad-tag', token, 'render'); await flush();
    assert.equal(ads, 0); f.move(s, 300); assert.equal(await build, true); assert.equal(ads, 1);
    creative.destroy(); assert.equal(f.timers.size, 0);
  });
  check('unclaimed standby expires and disposes exactly once without invalidating a visual token', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('unclaimed', 'auto', 1100, { preparedMaxAgeMs: 500 });
    f.winner(s); f.proximity(s); await flush(); const entry = s.wf._videoPreparation, creative = entry.creative;
    assert.equal(creative.player, null);
    // Defensive cleanup still disposes an attached resource once, even though standby no longer creates one.
    let disposals = 0; creative.player = { dispose() { disposals++; } };
    f.tick(500); await flush(); s.wf.cancelVideoPreparation(); creative.destroy();
    assert.equal(entry.state, 'CANCELLED'); assert.equal(disposals, 1); assert.equal(s.node._activeRenderToken, 1);
    assert.equal(f.logs.filter(l => l.metric === 'video_standby_expired').length, 1);
    assert.equal(f.Creative._preparationEntries.size, 0); assert.equal(f.timers.size, 0);
    assert.equal(f.docEvents.size, 0); assert.equal(f.observers.filter(o => o.connected).length, 0);
  });
  check('render waiting for viewport frees standby budget and neither it nor an activated resource can be evicted', async () => {
    const f = readiness(file); f.ready(); const cfg = { maxPreparedPlayers: 1 };
    const a = f.slot('render-owner', 'auto', 1200, cfg), b = f.slot('standby-neighbor', 'auto', 1000, cfg);
    f.winner(a); f.proximity(a); await flush(); const entry = a.wf.getPreparedVideo(1), creative = entry.creative;
    let ads = 0; creative.requestAds = async () => { ads++; }; const activation = creative.render(); await flush();
    f.winner(b); f.proximity(b); await flush();
    assert.equal(b.wf._videoPreparation.busy, true); assert.equal(creative._destroyed, false);
    f.tick(20000); await flush(); assert.equal(creative._destroyed, false); assert.equal(ads, 0);
    f.move(a, 300); await activation; assert.equal(entry.state, 'ACTIVATED');
    f.proximity(b); await flush(); assert.equal(creative._destroyed, false);
    creative.destroy(); b.wf.cancelVideoPreparation(); assert.equal(f.timers.size, 0);
  });
  for (const allowFallback of [true, false]) check('real activation error retains the render token and ' + (allowFallback ? 'executes' : 'forbids') + ' the existing Display fallback', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('activation-error', allowFallback ? 'auto' : 'video_only', 1100);
    let display = 0, closed = 0;
    s.node.closeAll = () => { closed++; }; s.node.startIntextTelemetryCycle = () => {};
    f.Creative.prototype.requestAds = async () => { throw new Error('real_activation_error'); };
    s.wf._requestFormat = async (format, token) => {
      if (format === 'video') {
        const result = await s.node.buildAndPlayVideo('same-tag', token, 'render');
        assert.equal(s.node.isActiveRenderToken(token), true);
        return result;
      }
      display++; return true;
    };
    const waterfall = s.wf.requestWinner('video', 'display', allowFallback);
    await flush(); f.tick(20000); await flush();
    assert.equal(s.node._activeRenderToken, 1); assert.equal(display, 0);
    f.move(s, 300); await waterfall;
    assert.equal(s.node._activeRenderToken, allowFallback ? 2 : 1); assert.equal(display, Number(allowFallback)); assert.equal(closed, Number(!allowFallback));
    assert.equal(s.node.activeCreative._destroyed, true); s.wf.cancelVideoPreparation(); assert.equal(f.timers.size, 0);
  });
  check('configuration switched to Display or opt-out while preparing cancels ownership', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('configuration-change'); f.winner(s); f.proximity(s); await flush();
    const first = s.wf._videoPreparation.creative; s.wf.config.decision.mode = 'display_only'; f.proximity(s);
    assert.equal(first._destroyed, true); assert.equal(s.wf._videoPreparation, null);
    s.wf.config.decision.mode = 'auto'; f.winner(s); f.proximity(s); await flush();
    s.wf.loadingConfig.videoPreparation.enabled = false; f.proximity(s);
    assert.equal(s.wf._videoPreparation, null);
  });
  check('timing provenance survives render-token handoff without inventing missing milestones', () => {
    const f = readiness(file), s = f.slot('timings');
    s.wf.recordReadiness('video_winner_resolved'); f.tick(50); s.wf.recordReadiness('video_prepare_started');
    f.tick(100); s.wf.recordReadiness('video_prepare_ready'); s.node._activeRenderToken = 2;
    f.tick(500); s.wf.recordReadiness('video_activation_eligible');
    const log = f.logs.find(l => l.metric === 'video_activation_eligible');
    assert.equal(log.winnerToPreparedMs, 150); assert.equal(log.preparedToEligibleMs, 500); assert.equal(log.preparationMs, 100);
    s.node._intextTelemetryCycleId = 2; s.wf.recordReadiness('video_activation_eligible');
    assert.equal(f.logs.at(-1).preparedToEligibleMs, null); assert.equal(f.logs.at(-1).preparationMs, null);
  });
  for (const geometry of [
    { name: 'zero width and height', width: 0, height: 0, eligible: false },
    { name: 'zero height', height: 0, eligible: false },
    { name: 'offscreen right', left: 450, eligible: false },
    { name: 'offscreen left', left: -310, eligible: false },
    { name: 'touching horizontal edge', left: 400, eligible: false },
    { name: 'partial horizontal overlap', left: 350, eligible: true, ratio: 1 / 6 },
    { name: 'partial vertical overlap', top: -10, eligible: true, ratio: 0.5 },
    { name: 'display none', display: 'none', eligible: false },
    { name: 'visibility hidden', visibility: 'hidden', eligible: false },
    { name: 'transparent anchor', opacity: '0', eligible: false },
  ]) check('viewport eligibility rejects invalid geometry and uses 2D overlap: ' + geometry.name, () => {
    const f = readiness(file), s = f.slot('geometry', 'auto', 300);
    for (const key of ['width', 'height', 'top', 'left']) if (geometry[key] != null) s.anchor[key] = geometry[key];
    for (const key of ['display', 'visibility', 'opacity']) if (geometry[key] != null) s.anchor.style[key] = geometry[key];
    const state = s.node.getReadinessViewportState(); assert.equal(state.eligible, geometry.eligible);
    if (geometry.ratio != null) assert.ok(Math.abs(state.intersectionRatio - geometry.ratio) < 1e-9);
    if (!geometry.eligible) assert.equal(state.intersectionRatio === 0 || state.reason === 'document-hidden', true);
  });
  check('non-rendered and hidden ancestors cannot authorize activation; visible reentry resolves the same wait', async () => {
    const f = readiness(file), s = f.slot('ancestor', 'auto', 300);
    s.anchor.getClientRects = () => []; assert.equal(s.node.getReadinessViewportState().eligible, false);
    delete s.anchor.getClientRects;
    s.anchor.parentElement = f.element(); s.anchor.parentElement.style.display = 'none';
    assert.equal(s.node.getReadinessViewportState().eligible, false);
    s.anchor.parentElement.style.display = 'block'; f.visibility(true);
    let resolved = false; const wait = s.node.waitForViewport(1).then(() => { resolved = true; });
    await flush(); assert.equal(resolved, false);
    f.visibility(false); await wait; assert.equal(resolved, true); assert.equal(f.docEvents.size, 0);
  });
  for (const managerMode of ['absent', 'no-resume', 'no-pause']) check('eligible recovery without complete AdsManager APIs: ' + managerMode, async () => {
    const f = readiness(file), { s, r } = runtime(f); let plays = 0;
    r.player.ima.getAdsManager = () => managerMode === 'absent' ? undefined : managerMode === 'no-resume' ? { pause() {} } : { resume() { r.media.paused = false; } };
    r.media.pause = () => { r.media.paused = true; };
    r.media.play = () => { plays++; r.media.paused = false; return Promise.resolve(); };
    r.started(); f.move(s, -100); assert.equal(r.media.paused, true); assert.equal(r.opens, 0);
    f.move(s, 300); await flush(); assert.equal(r.media.paused, false); assert.equal(r.opens, 0);
    assert.equal(plays, 1); // Incomplete AdsManager APIs retain direct-media ownership.
    r.frame(); await r.result; assert.equal(r.opens, 1);
    assert.equal(f.logs.filter(l => l.metric === 'first-frame').length, 1);
    assert.equal(f.logs.filter(l => l.metric === 'revealed').length, 1);
    assert.equal(f.logs.filter(l => l.metric === 'video_recovery_resumed').length, 1);
    r.creative.destroy(); assert.equal(r.creative._firstFrameWaitTimers.length, 0);
    assert.equal(f.docEvents.size, 0); f.tick(30000); assert.equal(f.timers.size, 0); assert.equal(r.opens, 1);
  });
  check('unavailable resume stays bounded by the existing advertising timeout and cannot reveal on reentry', async () => {
    const f = readiness(file), { s, r } = runtime(f);
    r.media.pause = () => { r.media.paused = true; }; r.started(); f.move(s, -100); f.move(s, 300);
    assert.equal(r.opens, 0); assert.equal(f.logs.filter(l => l.metric === 'video_recovery_unavailable').length, 1);
    f.tick(25000); assert.match(String(await r.result), /video_ad_timeout/);
    assert.equal(f.logs.filter(l => l.metric === 'video_advertising_timeout').length, 1);
    r.frame(); f.move(s, 300); assert.equal(r.opens, 0); r.creative.destroy(); assert.equal(f.timers.size, 0);
  });
  check('media resume rejection settles a real activation failure without a late reveal', async () => {
    const f = readiness(file), { s, r } = runtime(f);
    r.media.pause = () => { r.media.paused = true; }; r.media.play = () => Promise.reject(new Error('autoplay denied'));
    r.started(); f.move(s, -100); f.move(s, 300); await flush();
    assert.match(String(await r.result), /video_recovery_failed/);
    assert.equal(f.logs.filter(l => l.metric === 'video_recovery_failed').length, 1);
    r.frame(); assert.equal(r.opens, 0); r.creative.destroy(); assert.equal(f.docEvents.size, 0);
  });
  check('terminal during asynchronous resume invalidates its continuation and cannot reveal', async () => {
    const f = readiness(file), { s, r } = runtime(f); let finish;
    r.media.pause = () => { r.media.paused = true; }; r.media.play = () => new Promise(resolve => { finish = resolve; });
    r.started(); f.move(s, -100); f.move(s, 300); r.nativeError(303);
    assert.match(String(await r.result), /303/); finish(); await flush(); r.frame();
    assert.equal(r.opens, 0); assert.equal(f.logs.filter(l => l.metric === 'video_recovery_resumed').length, 0);
    r.creative.destroy(); assert.equal(f.docEvents.size, 0);
  });
  for (const terminalMedia of ['ended', 'error']) check('observed terminal media cannot be restarted on reentry: ' + terminalMedia, async () => {
    const f = readiness(file), { s, r } = runtime(f); let plays = 0;
    r.media.pause = () => { r.media.paused = true; };
    r.media.play = () => { plays++; return Promise.resolve(); };
    r.player.ima.getAdsManager = () => ({ resume() { plays++; } });
    r.started(); f.move(s, -100); r.media[terminalMedia] = terminalMedia === 'ended' ? true : { code: 3 };
    f.move(s, 300); await flush(); assert.equal(plays, 0); assert.equal(r.opens, 0);
    r.nativeError(303); await r.result; f.tick(50); assert.equal(plays, 0); assert.equal(f.docEvents.size, 0);
  });
  for (const slotId of ['gexp-intext', 'gexp-intext-2']) check('IMA void resume needs observed playback, without a second media play: ' + slotId, async () => {
    const f = readiness(file), { s, r } = runtime(f); r.node.id = slotId;
    let pauses = 0, resumes = 0, mediaPauses = 0, plays = 0;
    const manager = { pause() { pauses++; r.media.paused = true; }, resume() { resumes++; } };
    r.player.ima.getAdsManager = () => manager;
    r.media.pause = () => { mediaPauses++; r.media.paused = true; };
    r.media.play = () => { plays++; return Promise.resolve(); };
    r.started(); f.move(s, -100); r.frame(); f.move(s, 300);
    assert.equal(pauses, 1); assert.equal(mediaPauses, 0); assert.equal(resumes, 1); assert.equal(plays, 0);
    assert.equal(r.opens, 0); assert.equal(r.node._intextPipPlayerRevealed === true, false);
    r.nativeResumed(); // Even IMA's signal cannot contradict an observed paused media element.
    assert.equal(r.opens, 0); assert.equal(f.logs.filter(l => l.metric === 'video_recovery_confirmed').length, 0);
    f.move(s, 300); assert.equal(resumes, 1);
    r.media.paused = false; r.media.emit('playing'); await r.result;
    assert.equal(r.opens, 1); assert.ok(r.animations <= 1); assert.equal(plays, 0);
    const animations = r.animations;
    for (const metric of ['video_recovery_requested', 'video_recovery_api_called', 'video_recovery_confirmed', 'first-frame', 'revealed']) {
      assert.equal(f.logs.filter(l => l.metric === metric).length, 1, metric);
    }
    r.nativeResumed(); r.media.emit('playing'); assert.equal(r.opens, 1); assert.equal(r.animations, animations); r.creative.destroy();
    assert.equal(r.player.ima.initializations, 1); assert.equal(r.player.playCalls, 1);
    assert.equal(f.docEvents.size, 0); assert.equal(f.windowEvents.size, 0);
  });
  check('IMA owns pause/resume and RESUMED confirms transport but never creates a first frame', async () => {
    const f = readiness(file), { s, r } = runtime(f); let plays = 0;
    const manager = { pause() { r.media.paused = true; }, resume() { r.media.paused = false; r.nativeResumed(); } };
    r.player.ima.getAdsManager = () => manager; r.media.pause = () => assert.fail('IMA owns pause');
    r.media.play = () => { plays++; };
    r.started(); f.move(s, -100); f.move(s, 300);
    assert.equal(f.logs.find(l => l.metric === 'video_recovery_confirmed').signal, 'ima-resumed');
    assert.equal(r.opens, 0); assert.equal(r.node._intextPipFirstFrameConfirmed === true, false);
    r.frame(); await r.result; assert.equal(r.opens, 1); assert.equal(plays, 0); r.creative.destroy();
  });
  check('directly paused media retains ownership when an independent AdsManager appears later', async () => {
    const f = readiness(file), { s, r } = runtime(f); let plays = 0, resumes = 0;
    r.media.pause = () => { r.media.paused = true; };
    r.media.play = () => { plays++; r.media.paused = false; return Promise.resolve(); };
    r.started(); f.move(s, -100);
    const manager = { pause() { assert.fail('independent manager must not take direct-media ownership'); }, resume() { resumes++; } }; r.player.ima.getAdsManager = () => manager;
    f.move(s, 300); await flush(); assert.equal(plays, 1); assert.equal(resumes, 0);
    f.move(s, -100); assert.equal(r.media.paused, true); f.move(s, 300); await flush();
    assert.equal(plays, 2); assert.equal(resumes, 0);
    r.frame(); await r.result; r.creative.destroy();
  });
  check('missing manager after an IMA pause permits a deliberate media ownership handoff', async () => {
    const f = readiness(file), { s, r } = runtime(f); let plays = 0;
    const manager = { pause() { r.media.paused = true; }, resume() { assert.fail('removed manager'); } };
    r.player.ima.getAdsManager = () => manager;
    r.media.play = () => { plays++; r.media.paused = false; return Promise.resolve(); };
    r.started(); f.move(s, -100); r.player.ima.getAdsManager = () => null; f.move(s, 300); await flush();
    assert.equal(plays, 1); assert.equal(f.logs.find(l => l.metric === 'video_recovery_confirmed').source, 'ad-media');
    r.frame(); await r.result; r.creative.destroy();
  });
  check('a rejected media recovery cannot reveal and the existing waterfall alone authorizes Display', async () => {
    for (const allowFallback of [true, false]) {
      const f = readiness(file), { s, r } = runtime(f); let displays = 0, closes = 0;
      r.node.beginVisualRender = () => r.node._activeRenderToken;
      r.node.startIntextTelemetryCycle = () => {}; r.node.closeAll = () => { closes++; };
      r.node.ensureSingleVisibleIntextSurface = () => {};
      r.media.pause = () => { r.media.paused = true; }; r.media.play = () => Promise.reject(new Error('denied'));
      s.wf._requestFormat = async format => {
        if (format === 'video') { const result = await r.result; return !(result instanceof Error) && !String(result).includes('Error'); }
        displays++; return true;
      };
      const waterfall = s.wf.requestWinner('video', 'display', allowFallback);
      r.started(); f.move(s, -100); f.move(s, 300); await waterfall;
      assert.equal(displays, Number(allowFallback)); assert.equal(closes, Number(!allowFallback));
      assert.equal(r.opens, 0); r.creative.destroy();
    }
  });
  check('an independent manager resume failure settles recovery without falling through to media.play', async () => {
    const f = readiness(file), { s, r } = runtime(f); let plays = 0;
    const manager = { pause() { r.media.paused = true; }, resume() { throw new Error('SDK failure'); } };
    r.player.ima.getAdsManager = () => manager; r.media.play = () => { plays++; };
    r.started(); f.move(s, -100); f.move(s, 300);
    assert.match(String(await r.result), /video_recovery_failed/); assert.equal(plays, 0); assert.equal(r.opens, 0);
    r.creative.destroy();
  });
  check('exit invalidates a pending IMA recovery and the next entry can resume once again', async () => {
    const f = readiness(file), { s, r } = runtime(f); let resumes = 0, pauses = 0;
    const manager = { pause() { pauses++; r.media.paused = true; }, resume() { resumes++; } };
    r.player.ima.getAdsManager = () => manager;
    r.started(); f.move(s, -100); f.move(s, 300); f.move(s, -100);
    r.nativeResumed(); assert.equal(f.logs.filter(l => l.metric === 'video_recovery_confirmed').length, 0);
    f.move(s, 300); assert.equal(resumes, 2); assert.equal(pauses, 2);
    r.media.paused = false; r.media.emit('playing'); r.frame(); await r.result;
    assert.equal(r.opens, 1); assert.equal(f.logs.filter(l => l.metric === 'video_recovery_cancelled').length, 1);
    r.creative.destroy();
  });
  check('late direct-media play completion after exit is re-paused and cannot confirm the next attempt', async () => {
    const f = readiness(file), { s, r } = runtime(f); const completions = [];
    r.media.pause = () => { r.media.paused = true; };
    r.media.play = () => new Promise(resolve => completions.push(() => { r.media.paused = false; resolve(); }));
    r.started(); f.move(s, -100); f.move(s, 300); f.move(s, -100);
    completions[0](); await flush(); assert.equal(r.media.paused, true); assert.equal(r.opens, 0);
    f.move(s, 300); assert.equal(completions.length, 2); completions[1](); await flush();
    r.frame(); await r.result; assert.equal(r.opens, 1); r.creative.destroy();
  });
  for (const invalidation of ['token', 'navigation', 'refresh', 'destroy', 'abort', 'terminal']) check('pending recovery cleanup rejects stale continuations: ' + invalidation, async () => {
    const f = readiness(file), { s, r } = runtime(f); let finish;
    r.media.pause = () => { r.media.paused = true; };
    r.media.play = () => new Promise(resolve => { finish = () => { r.media.paused = false; resolve(); }; });
    r.started(); f.move(s, -100); f.move(s, 300);
    if (['token', 'navigation', 'refresh'].includes(invalidation)) r.node._activeRenderToken++;
    else if (invalidation === 'terminal') r.nativeError(303);
    else r.creative[invalidation]();
    finish(); await flush(); r.frame(); r.media.emit('playing');
    assert.equal(r.opens, 0); assert.equal(f.logs.filter(l => l.metric === 'video_recovery_confirmed').length, 0);
    assert.equal(r.creative._recoveryAttempt, null); assert.equal(f.docEvents.size, 0); assert.equal(f.windowEvents.size, 0);
    r.creative.destroy(); assert.equal(r.creative._firstFrameWaitTimers.length, 0);
    f.tick(30000); assert.equal(f.timers.size, 0); assert.equal(r.opens, 0);
  });
  check('a replaced media cannot confirm an outstanding recovery belonging to its predecessor', async () => {
    const f = readiness(file), { s, r } = runtime(f); let finish;
    r.media.pause = () => { r.media.paused = true; }; r.media.play = () => new Promise(resolve => { finish = resolve; });
    r.started(); f.move(s, -100); f.move(s, 300);
    const replacement = f.element('video'); Object.assign(replacement, { paused: true, ended: false, currentTime: 0, readyState: 2 });
    r.replaceMedia(replacement); r.media.paused = false; finish(); await flush(); r.media.emit('playing');
    assert.equal(r.opens, 0); assert.equal(f.logs.filter(l => l.metric === 'video_recovery_confirmed').length, 0);
    replacement.paused = false; replacement.emit('playing'); replacement.currentTime = 1; replacement.emit('timeupdate');
    await r.result; assert.equal(r.opens, 1); r.creative.destroy();
  });
  check('time progress confirms recovery but a paused cached frame cannot reveal', async () => {
    const f = readiness(file), { s, r } = runtime(f);
    const manager = { pause() { r.media.paused = true; }, resume() {} };
    r.player.ima.getAdsManager = () => manager; r.started(); f.move(s, -100); f.move(s, 300);
    r.media.currentTime = 1; r.media.emit('timeupdate'); assert.equal(r.opens, 0);
    // First-frame listeners may now be retired; playing remains a valid recovery signal.
    r.media.paused = false; r.media.emit('playing'); await r.result;
    assert.equal(r.opens, 1); assert.equal(f.logs.filter(l => l.metric === 'first-frame').length, 1); r.creative.destroy();
  });
  check('unpaused advancing media confirms through timeupdate without using a void manager return', async () => {
    const f = readiness(file), { s, r } = runtime(f);
    const manager = { pause() { r.media.paused = true; }, resume() { r.media.paused = false; } };
    r.player.ima.getAdsManager = () => manager; r.started(); f.move(s, -100); f.move(s, 300);
    assert.equal(f.logs.filter(l => l.metric === 'video_recovery_confirmed').length, 0);
    r.media.currentTime = 0.2; r.media.emit('timeupdate'); await r.result;
    assert.equal(f.logs.find(l => l.metric === 'video_recovery_confirmed').signal, 'media-timeupdate'); r.creative.destroy();
  });
  check('opacity-only changes are rechecked on style completion and scroll without a new intersection', async () => {
    const f = readiness(file), { s, r } = runtime(f);
    const manager = { pause() { r.media.paused = true; }, resume() { r.media.paused = false; r.nativeResumed(); } };
    r.player.ima.getAdsManager = () => manager; r.started();
    s.anchor.style.opacity = '0'; f.document.emit('transitionend', { target: s.anchor });
    assert.equal(r.media.paused, true); r.frame(); assert.equal(r.opens, 0);
    s.anchor.style.opacity = '1'; f.window.emit('scroll'); await r.result;
    assert.equal(r.opens, 1); r.creative.destroy(); assert.equal(f.docEvents.size, 0); assert.equal(f.windowEvents.size, 0);
  });
  for (const slotId of ['gexp-intext', 'gexp-intext-2']) {
    const ownershipCheck = (name, fn) => check('P1.2a ownership ' + slotId + ': ' + name, fn);
    const setup = () => {
      const f = readiness(file), { s, r } = runtime(f); r.node.id = slotId;
      return { f, s, r };
    };
    const replacement = f => Object.assign(f.element('video'), { paused: true, ended: false,
      currentTime: 0, readyState: 2, networkState: 2, videoWidth: 640, videoHeight: 360 });
    const noExtraAds = r => { assert.equal(r.player.ima.initializations, 1); assert.equal(r.player.playCalls, 1); };
    ownershipCheck('exit without media/controller never grants direct ownership to subsequently observed IMA media', async () => {
      const { f, s, r } = setup(); let plays = 0, resumes = 0;
      assert.equal(r.creative._adMediaEl, null); f.move(s, -100);
      assert.equal(r.creative._eligibilityPauseOwner, null);
      const manager = { pause() { r.media.paused = true; }, resume() { resumes++; r.media.paused = false; r.nativeResumed(); } };
      r.player.ima.getAdsManager = () => manager;
      r.media.play = () => { plays++; }; r.started(); f.move(s, 300);
      assert.equal(plays, 0); assert.equal(resumes, 1); r.frame(); await r.result;
      assert.equal(r.opens, 1); noExtraAds(r); r.creative.destroy();
    });
    ownershipCheck('directly paused A cannot authorize play on replacement B controlled by IMA', async () => {
      const { f, s, r } = setup(); let directPlays = 0, resumes = 0;
      r.media.pause = () => { r.media.paused = true; }; r.media.play = () => { directPlays++; };
      r.started(); f.move(s, -100); assert.equal(r.creative._eligibilityPauseOwner.media, r.media);
      const b = replacement(f); b.play = () => { directPlays++; };
      const manager = { pause() { b.paused = true; }, resume() { resumes++; b.paused = false; r.nativeResumed(); } };
      r.player.ima.getAdsManager = () => manager; r.replaceMedia(b); f.move(s, 300);
      assert.equal(directPlays, 0); assert.equal(resumes, 1);
      assert.equal(f.logs.filter(l => l.metric === 'video_recovery_ownership_invalidated').length, 1);
      b.currentTime = 0.1; b.emit('timeupdate'); await r.result;
      assert.equal(r.opens, 1); noExtraAds(r); r.creative.destroy();
    });
    ownershipCheck('replacement B without IMA cannot inherit direct play permission from A', async () => {
      const { f, s, r } = setup(); let plays = 0;
      r.media.pause = () => { r.media.paused = true; }; r.started(); f.move(s, -100);
      const b = replacement(f); b.play = () => { plays++; };
      r.replaceMedia(b); f.move(s, 300);
      assert.equal(r.creative._eligibilityPauseOwner, null); assert.equal(plays, 0);
      assert.equal(r.opens, 0); f.tick(25000); assert.match(String(await r.result), /video_ad_timeout/);
      noExtraAds(r); r.creative.destroy();
    });
    ownershipCheck('a replaced AdsManager supersedes its pending attempt without a media play', async () => {
      const { f, s, r } = setup(); let finish, oldResumes = 0, newResumes = 0, plays = 0;
      let manager = { pause() { r.media.paused = true; }, resume() { oldResumes++; return new Promise(resolve => { finish = resolve; }); } };
      r.player.ima.getAdsManager = () => manager; r.media.play = () => { plays++; };
      r.started(); f.move(s, -100); f.move(s, 300);
      manager = { pause() { r.media.paused = true; }, resume() { newResumes++; } };
      r.creative._checkActivationEligibility(); finish(); await flush();
      assert.equal(oldResumes, 1); assert.equal(newResumes, 1); assert.equal(plays, 0);
      assert.equal(f.logs.filter(l => l.metric === 'video_recovery_confirmed').length, 0);
      assert.equal(f.logs.find(l => l.metric === 'video_recovery_cancelled').reason, 'ads-manager-replaced');
      r.media.paused = false; r.nativeResumed(); r.frame(); await r.result;
      assert.equal(f.logs.filter(l => l.metric === 'video_recovery_confirmed').length, 1);
      assert.equal(r.opens, 1); noExtraAds(r); r.creative.destroy();
    });
    ownershipCheck('same effectively paused A retains direct recovery despite an independent manager', async () => {
      const { f, s, r } = setup(); let plays = 0, resumes = 0;
      r.media.pause = () => { r.media.paused = true; };
      r.media.play = () => { plays++; r.media.paused = false; return Promise.resolve(); };
      r.started(); f.move(s, -100); const owner = r.creative._eligibilityPauseOwner;
      const manager = { pause() { assert.fail('direct A remains the owner'); }, resume() { resumes++; } };
      r.player.ima.getAdsManager = () => manager; f.move(s, 300); await flush();
      assert.equal(r.creative._eligibilityPauseOwner, owner); assert.equal(owner.media, r.media);
      assert.equal(plays, 1); assert.equal(resumes, 0); f.move(s, 300); assert.equal(plays, 1);
      r.frame(); await r.result; assert.equal(r.opens, 1); noExtraAds(r); r.creative.destroy();
    });
    ownershipCheck('throwing direct pause grants no permission to play', async () => {
      const { f, s, r } = setup(); let plays = 0;
      r.media.paused = true; r.media.pause = () => { throw new Error('pause failure'); };
      r.media.play = () => { plays++; }; r.started(); f.move(s, -100);
      assert.equal(r.creative._eligibilityPauseOwner, null);
      assert.ok(f.logs.some(l => l.metric === 'video_recovery_control_unavailable' && l.reason === 'pause-failed'));
      f.move(s, 300); assert.equal(plays, 0); assert.equal(r.opens, 0);
      f.tick(25000); assert.match(String(await r.result), /video_ad_timeout/);
      noExtraAds(r); r.creative.destroy();
    });
    ownershipCheck('a pause call that did not pause the media grants no direct play authority', async () => {
      const { f, s, r } = setup(); let plays = 0;
      r.media.pause = () => {}; r.media.play = () => { plays++; };
      r.started(); f.move(s, -100); assert.equal(r.creative._eligibilityPauseOwner, null);
      f.move(s, 300); assert.equal(plays, 0); r.media.emit('playing');
      assert.equal(r.opens, 0); r.frame(); await r.result;
      assert.equal(r.opens, 1); noExtraAds(r); r.creative.destroy();
    });
    ownershipCheck('same A without a recovery API remains bounded and never repeats requests', async () => {
      const { f, s, r } = setup(); r.media.pause = () => { r.media.paused = true; };
      r.started(); f.move(s, -100); f.move(s, 300); f.move(s, 300);
      assert.equal(f.logs.filter(l => l.metric === 'video_recovery_api_called').length, 0);
      assert.equal(r.opens, 0); f.tick(25000); assert.match(String(await r.result), /video_ad_timeout/);
      noExtraAds(r); r.creative.destroy();
    });
    ownershipCheck('late Promise, events and frame from A cannot recover or reveal installed B', async () => {
      const { f, s, r } = setup(); let finish, resumes = 0, bPlays = 0;
      r.media.pause = () => { r.media.paused = true; };
      r.media.play = () => new Promise(resolve => { finish = resolve; });
      r.started(); const staleFrame = r.frameCallback(); f.move(s, -100); f.move(s, 300);
      const b = replacement(f); b.play = () => { bPlays++; };
      const manager = { pause() { b.paused = true; }, resume() { resumes++; } };
      r.player.ima.getAdsManager = () => manager; r.replaceMedia(b); f.move(s, 300);
      r.media.paused = false; finish(); await flush(); r.media.emit('playing'); staleFrame?.(0, {});
      r.creative._confirmEligibilityRecovery('media-playing', r.media);
      assert.equal(f.logs.filter(l => l.metric === 'first-frame').length, 0);
      assert.equal(f.logs.filter(l => l.metric === 'video_recovery_confirmed').length, 0);
      assert.equal(r.opens, 0); assert.equal(bPlays, 0); assert.equal(resumes, 1);
      b.paused = false; r.nativeResumed(); b.currentTime = 0.1; b.emit('timeupdate'); await r.result;
      assert.equal(r.opens, 1); assert.equal(f.logs.filter(l => l.metric === 'revealed').length, 1);
      noExtraAds(r); r.creative.destroy();
    });
    for (const mode of ['auto', 'video_only']) ownershipCheck('replacement recovery failure preserves ' + mode + ' fallback policy', async () => {
      const { f, s, r } = setup(); let displays = 0, closes = 0, directPlays = 0;
      s.wf.config.decision.mode = mode; r.node.config.decision = { mode };
      r.node.beginVisualRender = () => r.node._activeRenderToken;
      r.node.startIntextTelemetryCycle = () => {}; r.node.closeAll = () => { closes++; };
      r.node.ensureSingleVisibleIntextSurface = () => {};
      r.media.pause = () => { r.media.paused = true; }; r.started(); f.move(s, -100);
      const b = replacement(f); b.play = () => { directPlays++; };
      const manager = { pause() {}, resume() { throw new Error('IMA recovery failure'); } };
      r.player.ima.getAdsManager = () => manager; r.replaceMedia(b);
      s.wf._requestFormat = async format => {
        if (format === 'video') { await r.result; return false; }
        displays++; return true;
      };
      const waterfall = s.wf.requestWinner('video', 'display', mode === 'auto');
      f.move(s, 300); await waterfall;
      assert.match(String(await r.result), /video_recovery_failed/);
      assert.equal(displays, Number(mode === 'auto')); assert.equal(closes, Number(mode === 'video_only'));
      assert.equal(directPlays, 0); assert.equal(r.opens, 0); noExtraAds(r); r.creative.destroy();
    });
  }
  for (const slotId of ['gexp-intext', 'gexp-intext-2']) {
    const recoveryCheck = (name, fn) => check('P1.2b recovery ' + slotId + ': ' + name, fn);
    const setup = () => {
      const f = readiness(file), { s, r } = runtime(f); r.node.id = slotId;
      return { f, s, r };
    };
    const finish = async (f, r) => {
      r.frame(); await r.result; assert.equal(r.opens, 1);
      assert.equal(f.logs.filter(l => l.metric === 'first-frame').length, 1);
      assert.equal(f.logs.filter(l => l.metric === 'revealed').length, 1);
      assert.equal(r.player.ima.initializations, 1); assert.equal(r.player.playCalls, 1);
      r.creative.destroy();
    };
    recoveryCheck('already paused media grants no direct ownership and a later IMA manager remains authoritative', async () => {
      const { f, s, r } = setup(); let plays = 0, resumes = 0;
      r.media.paused = true; r.media.pause = () => { r.media.paused = true; };
      r.media.play = () => { plays++; }; r.started(); f.move(s, -100);
      assert.equal(r.creative._eligibilityPauseOwner, null);
      const manager = { pause() {}, resume() { resumes++; r.media.paused = false; } };
      r.player.ima.getAdsManager = () => manager;
      f.move(s, 300); assert.equal(plays, 0); assert.equal(resumes, 1);
      assert.equal(f.logs.filter(l => l.metric === 'video_recovery_confirmed').length, 0);
      r.media.emit('playing'); await finish(f, r);
    });
    recoveryCheck('effective direct pause preserves the same owner across repeated checks and later SDK availability', async () => {
      const { f, s, r } = setup(); let pauses = 0, plays = 0, resumes = 0;
      r.media.pause = () => { pauses++; r.media.paused = true; };
      r.media.play = () => { plays++; r.media.paused = false; return Promise.resolve(); };
      r.started(); f.move(s, -100); const owner = r.creative._eligibilityPauseOwner;
      const epoch = r.creative._recoveryEpoch;
      for (let i = 0; i < 10; i++) f.window.emit('scroll');
      assert.equal(pauses, 1); assert.equal(r.creative._recoveryEpoch, epoch);
      r.player.ima.getAdsManager = () => manager;
      const manager = { pause() { assert.fail('same direct owner must remain authoritative'); }, resume() { resumes++; } };
      f.window.emit('scroll'); assert.equal(r.creative._eligibilityPauseOwner, owner);
      f.move(s, 300); await flush(); assert.equal(plays, 1); assert.equal(resumes, 0);
      assert.equal(r.creative._eligibilityPauseOwner, owner); await finish(f, r);
    });
    for (const failure of ['throw', 'no-effect']) recoveryCheck('unsuccessful pause cannot grant ownership or repeatedly retry: ' + failure, async () => {
      const { f, s, r } = setup(); let pauses = 0, plays = 0;
      r.media.pause = () => { pauses++; if (failure === 'throw') throw new Error('pause failed'); };
      r.media.play = () => { plays++; }; r.started(); f.move(s, -100);
      const epoch = r.creative._recoveryEpoch;
      for (let i = 0; i < 10; i++) f.window.emit('scroll');
      assert.equal(pauses, 1); assert.equal(r.creative._recoveryEpoch, epoch);
      assert.equal(r.creative._eligibilityPauseOwner, null); f.move(s, 300); assert.equal(plays, 0);
      r.creative.destroy();
    });
    recoveryCheck('unchanged resource-less scroll does not restart pause or recovery epochs', () => {
      const { f, s, r } = setup(); f.move(s, -100); const epoch = r.creative._recoveryEpoch;
      for (let i = 0; i < 50; i++) { f.window.emit('scroll'); f.window.emit('resize'); }
      assert.equal(r.creative._recoveryEpoch, epoch);
      assert.equal(r.creative._eligibilityPauseOwner, null); assert.equal(r.creative._recoveryAttempt, null);
      assert.equal(f.logs.filter(l => l.metric === 'video_missed_viewport').length, 1);
      r.creative.destroy();
    });
    recoveryCheck('SDK appearance after many resource-less checks triggers exactly one new pause', async () => {
      const { f, s, r } = setup(); let pauses = 0, resumes = 0, plays = 0;
      f.move(s, -100); const epoch = r.creative._recoveryEpoch;
      for (let i = 0; i < 20; i++) f.window.emit('scroll');
      const manager = { pause() { pauses++; r.media.paused = true; }, resume() { resumes++; r.media.paused = false; } };
      r.media.paused = true; r.started();
      r.player.ima.getAdsManager = () => manager; r.media.play = () => { plays++; };
      f.window.emit('scroll'); const changedEpoch = r.creative._recoveryEpoch;
      assert.ok(changedEpoch > epoch); assert.equal(pauses, 1);
      for (let i = 0; i < 20; i++) f.window.emit('scroll');
      assert.equal(pauses, 1); assert.equal(r.creative._recoveryEpoch, changedEpoch);
      f.move(s, 300); assert.equal(resumes, 1); assert.equal(plays, 0);
      r.media.emit('playing'); await finish(f, r);
    });
    recoveryCheck('APIs added to the same manager outside viewport are detected without polling', async () => {
      const { f, s, r } = setup(); const manager = {}; let pauses = 0, resumes = 0;
      r.media.paused = true; r.player.ima.getAdsManager = () => manager;
      r.started(); f.move(s, -100); const epoch = r.creative._recoveryEpoch;
      f.window.emit('scroll'); assert.equal(r.creative._recoveryEpoch, epoch);
      manager.pause = () => { pauses++; }; manager.resume = () => { resumes++; r.media.paused = false; };
      f.window.emit('scroll'); assert.equal(pauses, 1);
      f.window.emit('scroll'); assert.equal(pauses, 1);
      f.move(s, 300); assert.equal(resumes, 1); r.media.emit('playing'); await finish(f, r);
    });
    recoveryCheck('pending observed recovery reevaluates APIs becoming available on the same manager', async () => {
      const { f, s, r } = setup(); const manager = {}; let resumes = 0;
      r.media.paused = true; r.player.ima.getAdsManager = () => manager;
      r.started(); f.move(s, -100); f.move(s, 300);
      assert.equal(r.creative._recoveryAttempt.source, 'ad-media-observed');
      manager.pause = () => {}; manager.resume = () => { resumes++; r.media.paused = false; };
      f.window.emit('scroll'); assert.equal(resumes, 1);
      assert.equal(f.logs.find(l => l.metric === 'video_recovery_cancelled').reason, 'recovery-api-changed');
      f.window.emit('scroll'); assert.equal(resumes, 1);
      r.media.emit('playing'); await finish(f, r);
    });
    recoveryCheck('a newly available play API recovers only the same legitimately owned media', async () => {
      const { f, s, r } = setup(); let plays = 0;
      r.media.pause = () => { r.media.paused = true; }; r.started(); f.move(s, -100); f.move(s, 300);
      assert.equal(r.creative._recoveryAttempt.source, 'ad-media-observed');
      r.media.play = () => { plays++; r.media.paused = false; return Promise.resolve(); };
      f.window.emit('scroll'); await flush(); assert.equal(plays, 1);
      await finish(f, r);
    });
    recoveryCheck('replacement B cannot inherit the legitimate direct owner of A after deduplication', async () => {
      const { f, s, r } = setup(); let plays = 0, resumes = 0;
      r.media.pause = () => { r.media.paused = true; }; r.started(); f.move(s, -100);
      for (let i = 0; i < 10; i++) f.window.emit('scroll');
      const b = Object.assign(f.element('video'), { paused: true, ended: false, currentTime: 0, readyState: 2 });
      b.play = () => { plays++; }; r.replaceMedia(b);
      const manager = { pause() {}, resume() { resumes++; b.paused = false; } };
      r.player.ima.getAdsManager = () => manager; f.move(s, 300);
      assert.equal(plays, 0); assert.equal(resumes, 1);
      b.currentTime = 0.1; b.emit('timeupdate'); await r.result;
      assert.equal(r.opens, 1); r.creative.destroy();
    });
    for (const mode of ['auto', 'video_only']) recoveryCheck('late SDK recovery error preserves ' + mode + ' fallback policy', async () => {
      const { f, s, r } = setup(); let displays = 0, closes = 0;
      s.wf.config.decision.mode = mode; r.node.config.decision = { mode };
      r.node.beginVisualRender = () => r.node._activeRenderToken;
      r.node.startIntextTelemetryCycle = () => {}; r.node.closeAll = () => { closes++; };
      r.node.ensureSingleVisibleIntextSurface = () => {};
      r.media.paused = true; r.media.pause = () => {}; r.started(); f.move(s, -100);
      const manager = { pause() {}, resume() { throw new Error('recovery failed'); } };
      r.player.ima.getAdsManager = () => manager;
      s.wf._requestFormat = async format => { if (format === 'video') { await r.result; return false; } displays++; return true; };
      const waterfall = s.wf.requestWinner('video', 'display', mode === 'auto');
      f.move(s, 300); await waterfall; assert.match(String(await r.result), /video_recovery_failed/);
      assert.equal(displays, Number(mode === 'auto')); assert.equal(closes, Number(mode === 'video_only'));
      assert.equal(r.opens, 0); r.creative.destroy();
    });
  }
  check('Display winner produces only neutral winner telemetry and no video preparation summary', async () => {
    const f = readiness(file), wf = f.fetch('display');
    wf.recordReadiness = f.context.Waterfall.prototype.recordReadiness;
    await wf.startFetch('fetch');
    assert.equal(f.logs.filter(l => l.metric === 'video_winner_resolved').length, 0);
    assert.equal(f.logs.find(l => l.metric === 'intext_winner_resolved').winnerFormat, 'display');
    assert.equal(f.logs.filter(l => /^video_prepare/.test(l.metric)).length, 0);
  });
  check('late winner reports actual preparation distance rather than promising its configured margin', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('late-auction', 'auto', 300);
    s.wf.recordReadiness('video_winner_resolved'); f.winner(s);
    s.wf.pendingAuction.timestamp = f.context.Date.now(); f.tick(100); f.proximity(s); await flush();
    const triggered = f.logs.find(l => l.metric === 'video_prepare_triggered');
    assert.equal(triggered.preparationRootMargin, '800px 0px'); assert.equal(triggered.distanceToViewportPx, -500);
    assert.equal(triggered.winnerAgeMs, 100);
    assert.equal(f.logs.find(l => l.metric === 'video_prepare_ready').winnerToPreparedMs, 100);
    assert.match(f.source, /activationToFirstFrameMs: delta\(t, "video_activation_started", "video_first_frame"\)/);
    s.wf.cancelVideoPreparation();
  });
  check('destroying a video cancels only its viewport wait and preserves the Display recovery wait', async () => {
    const f = readiness(file); f.ready(); const s = f.slot('owner-specific-cleanup');
    const creative = new f.Creative({ node: s.node, container: s.node.videoContainer, config: s.node.config });
    const render = creative.render(), rejected = assert.rejects(render, /stale_render_token/); await flush();
    let displayResolved = false;
    const display = s.node.waitForViewport(1, 'showDisplay:waitForViewport').then(() => { displayResolved = true; });
    creative.destroy(); await rejected; assert.equal(displayResolved, false);
    f.move(s, 300); await display; assert.equal(displayResolved, true); assert.equal(f.docEvents.size, 0);
  });
  check('cleanup during fetch prevents a stale auction from restoring pendingAuction or starting prewarm', async () => {
    const f = readiness(file), wf = f.fetch('video'); let finish;
    wf.runPrebidPhase = () => new Promise(resolve => { finish = resolve; });
    wf.disconnectRenderObserver = () => {};
    const fetch = wf.startFetch('fetch');
    f.context.Waterfall.prototype.cleanup.call(wf);
    finish(); await fetch; await flush();
    assert.equal(wf.pendingAuction, null); assert.equal(wf.fetchComplete, false); assert.equal(f.creates.length, 0);
  });
  check('no-fill after fast scroll keeps initial surfaces closed while completing lifecycle', () => {
    const f = readiness(file), s = f.slot('no-fill-outside', 'auto', -100);
    const start = f.source.indexOf('  closeAll('), end = f.source.indexOf('  handleCreativeError(', start);
    vm.runInContext('this.NoFill = class { ' + f.source.slice(start, end) + ' };', f.context);
    let complete = 0;
    Object.assign(s.node, { teardownIntextViewportTelemetryObserver() {}, flushIntextTelemetryToCI() {},
      recordTelemetry() {}, getIntextDistancePx: () => -900,
      applyDisplayWrapperHeight: () => assert.fail('offscreen no-fill must not expand height') });
    s.node.manager.onSlotComplete = () => { complete++; };
    f.context.NoFill.prototype.closeAll.call(s.node);
    assert.equal(s.wrapper.style.display, 'none'); assert.equal(s.wrapper.style.opacity, '0');
    assert.equal(s.wrapper.style.height, '0px'); assert.equal(complete, 1);
  });
}

test('predictive methods retain exact parity in both distributions', () => {
  const root = path.resolve(__dirname, '..'), files = ['_gam_kv_.js', 'IntextManager.js'].map(file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n'));
  const extract = (source, name) => {
    const regex = new RegExp('^  (?:static |async )?' + name + '\\(', 'm'), match = regex.exec(source);
    assert.ok(match, name);
    const tail = source.slice(match.index + match[0].length);
    const next = /\n  (?:static |async )?[A-Za-z_$][\w$]*\(/.exec(tail);
    const classEnd = /\n}/.exec(tail);
    return source.slice(match.index, match.index + match[0].length + Math.min(next?.index ?? tail.length, classEnd?.index ?? tail.length)).trim();
  };
  for (const name of ['getReadinessViewportState', 'cancelViewportWaits', 'waitForViewport', 'getVideoPreparationConfig', 'recordReadiness', 'setupVideoPreparation', 'claimVideoPreparation', 'getPreparedVideo', 'cancelVideoPreparation', 'releasePreparedVideo', 'prepare', 'preparationValid', 'preparePlayer', 'activate', 'observeActivationEligibility', 'drainPreparations']) {
    assert.equal(extract(files[0], name), extract(files[1], name), name);
  }
});
