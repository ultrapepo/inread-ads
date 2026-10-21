const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const flush = async () => { for (let i = 0; i < 16; i++) await Promise.resolve(); };
const plain = value => JSON.parse(JSON.stringify(value));

function fixture(file) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  let now = 10000, sequence = 0;
  const timers = new Map(), logs = [], assets = [], creates = [];
  function element(tag = 'div') {
    const listeners = new Map(), classes = new Set();
    return {
      tagName: tag.toUpperCase(), style: {}, children: [], dataset: {}, listeners,
      classList: { add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name) },
      setAttribute(name, value) { this[name] = value; },
      addEventListener(name, fn) { const set = listeners.get(name) || new Set(); set.add(fn); listeners.set(name, set); },
      removeEventListener(name, fn) { listeners.get(name)?.delete(fn); if (!listeners.get(name)?.size) listeners.delete(name); },
      emit(name, data) { for (const fn of [...(listeners.get(name) || [])]) fn(data); },
      appendChild(child) { this.children.push(child); return child; },
      remove() { const i = assets.indexOf(this); if (i >= 0) assets.splice(i, 1); },
      querySelector: () => null, querySelectorAll: () => [],
    };
  }
  const plugins = {};
  const videojs = () => assert.fail('prewarm must not create a player');
  videojs.getPlugin = name => plugins[name];
  const window = { gexpIntextDebug: true, innerHeight: 800 };
  const document = {
    baseURI: 'https://example.test/article',
    visibilityState: 'visible', head: { appendChild: el => assets.push(el) },
    createElement(tag) { creates.push(tag); return element(tag); },
    querySelector(selector) { const match = /^(script|link)\[(src|href)="(.*)"\]$/.exec(selector); return assets.find(el => match && el.tagName.toLowerCase() === match[1] && el[match[2]] === match[3]) || null; },
    querySelectorAll(selector) { const match = /^(script|link)\[(src|href)\]$/.exec(selector); return assets.filter(el => match && el.tagName.toLowerCase() === match[1] && el[match[2]]); },
  };
  const context = vm.createContext({ window, document, console, Promise, Set, Map, URL, URLSearchParams,
    Date: class extends Date { static now() { return now; } },
    setTimeout(fn, delay) { const id = ++sequence; timers.set(id, { fn, at: now + delay, delay }); return id; },
    clearTimeout: id => timers.delete(id),
    logIntext() {}, warnIntext() {}, errorIntext() {},
    intextDebugCollector: {
      recordMetric: (metric, data) => logs.push({ metric, ...data }),
      recordVideoEvent: (event, node, data) => logs.push({ metric: event, node, ...data }),
      recordTimeline() {},
    },
  });
  const videoStart = source.indexOf('class IntextVideoCreative');
  vm.runInContext('this.Creative = ' + source.slice(videoStart, source.indexOf('class WPromise', videoStart)), context);
  const fetchStart = source.indexOf('  async startFetch(');
  vm.runInContext('this.Fetch = class { ' + source.slice(fetchStart, source.indexOf('  async startRender(', fetchStart)) + ' };', context);
  context.IntextVideoCreative = context.Creative;
  const Creative = context.Creative;
  const imaTypes = { LOADED: 'loaded', STARTED: 'started', COMPLETE: 'complete', SKIPPED: 'skipped', PAUSED: 'paused', RESUMED: 'resumed' };
  function sdkReady() {
    window.google = { ima: { AdEvent: { Type: imaTypes }, AdErrorEvent: { Type: { AD_ERROR: 'error' } } } };
  }
  function assetLoad(script) {
    if (script.src.includes('video.min.js')) window.videojs = videojs;
    if (script.src.includes('contrib-ads.min.js')) plugins.ads = () => {};
    if (script.src.includes('ima3.js')) sdkReady();
    if (script.src.includes('videojs.ima.min.js')) plugins.ima = () => {};
    script.emit('load');
  }
  async function finishAssets() {
    for (let i = 0; i < 10; i++) {
      await flush();
      const pending = assets.find(el => el.tagName === 'SCRIPT' && el.__intextDependencyStatus === 'loading');
      if (!pending) break;
      assetLoad(pending);
    }
    await flush();
  }
  function tick(ms, drift = 0) {
    const target = now + ms;
    if (drift) now = target + drift;
    while (true) {
      const next = [...timers].filter(([, t]) => t.at <= target).sort((a, b) => a[1].at - b[1].at)[0];
      if (!next) break;
      if (!drift) now = next[1].at;
      timers.delete(next[0]); next[1].fn();
    }
    if (!drift) now = target;
  }
  function playback({ mediaFound = true, preload, frame = true } = {}) {
    sdkReady();
    const media = element('video');
    Object.assign(media, { currentTime: 0, readyState: 2, networkState: 2, paused: false, ended: false,
      videoWidth: 640, videoHeight: 360, buffered: { length: 2, end: index => index === 1 ? 3 : 1 } });
    let frameCallback = null;
    if (frame) {
      media.requestVideoFrameCallback = fn => { frameCallback = fn; return 1; };
      media.cancelVideoFrameCallback = () => { frameCallback = null; };
    }
    const loader = element(); loader.style.display = 'flex';
    const wrapper = element(); wrapper.style.opacity = '0';
    wrapper.querySelector = selector => selector === '.gexp-intext-loader' ? loader : null;
    let opens = 0, animations = 0;
    const container = { getElement: () => wrapper, open() { opens++; this.isOpen = true; }, isOpen: false };
    const node = { id: 'intext', _activeRenderToken: 1, config: { video: { imaPreload: { enabled: preload } } }, videoContainer: container,
      isActiveRenderToken(token) { return token === this._activeRenderToken; },
      getDisplayStandardContentHeight: () => 360, waterfall: { getLoadingDistancePx: () => 123 },
      playInitialOpenAnimation() { animations++; return true; }, mergeIntextTelemetry() {}, flushIntextTelemetryToCI() {},
    };
    let observedMedia = media;
    const rootEl = element(); rootEl.querySelectorAll = () => mediaFound ? [observedMedia] : [];
    const playerEvents = element(), imaEvents = element();
    const ima = options => { ima.options = options; ima.initializations = (ima.initializations || 0) + 1; };
    ima.addEventListener = (event, fn) => imaEvents.addEventListener(event, fn);
    ima.initializeAdDisplayContainer = () => {};
    const player = { ima, on: (event, fn) => playerEvents.addEventListener(event, fn), ready: fn => fn(),
      playCalls: 0, play() { this.playCalls++; return Promise.resolve(); }, el: () => rootEl, dispose() {}, currentTime: () => media.currentTime };
    const creative = new Creative({ node, container, config: node.config, adTagUrl: 'test-vast', videoTiming: { trigger: 'initial' } });
    creative.player = player;
    const promise = creative.requestAds(); const result = promise.catch(error => error);
    return { media, node, creative, player, loader, wrapper, container, result,
      started() { playerEvents.emit('adstart'); imaEvents.emit('started'); tick(0); },
      frameCallback: () => frameCallback,
      frame() { const fn = frameCallback; frameCallback = null; fn?.(0, {}); },
      replaceMedia(replacement) { observedMedia = replacement; playerEvents.emit('timeupdate'); tick(0); },
      terminal(event) { if (event === 'error') playerEvents.emit('adserror', {}); else imaEvents.emit(event); },
      nativeError(code) { imaEvents.emit('error', { getError: () => ({ getErrorCode: () => code, getMessage: () => 'native failure', getVastErrorCode: () => code }) }); },
      adsManagerLoaded() { playerEvents.emit('ads-manager'); },
      nativeResumed() { imaEvents.emit('resumed'); },
      adsLoad() { playerEvents.emit('ads-load', {}); },
      get opens() { return opens; }, get animations() { return animations; },
    };
  }
  function fetch(winner) {
    const wf = new context.Fetch();
    const node = { id: 'intext', startIntextTelemetryCycle() {} };
    Object.assign(wf, { node, config: {}, disconnectFetchObserver() {}, getLoadingDistancePx: () => 123,
      getIntextOffYTelemetry: () => ({}), getIntextExpectedViewability() {}, mergeLoadingPhaseTelemetry() {},
      runPrebidPhase: async () => {}, decideWinner: () => ({ winner, marker: 'auction-preserved' }) });
    return wf;
  }
  return { source, context, Creative, logs, assets, creates, document, window, element, playback, fetch, tick, timers, finishAssets, assetLoad };
}

for (const file of ['_gam_kv_.js', 'IntextManager.js']) {
  const check = (name, fn) => test(`${file}: IMA preload ${name}`, fn);
  check('video fetch completes without waiting, creating video or requesting ads', async () => {
    const f = fixture(file), wf = f.fetch('video');
    await wf.startFetch('fetch-intersection'); await flush();
    assert.equal(wf.fetchComplete, true); assert.equal(wf.pendingAuction.winner, 'video');
    assert.equal(wf.pendingAuction.marker, 'auction-preserved');
    assert.ok(f.logs.some(log => log.metric === 'video_dependency_prewarm_started'));
    assert.ok(f.creates.every(tag => tag === 'script' || tag === 'link'));
    assert.equal(f.assets.filter(el => el.tagName === 'SCRIPT').length, 1);
    assert.ok(!f.logs.some(log => log.metric === 'video_dependency_prewarm_ready'));
    await f.finishAssets();
  });
  check('display winner never prewarms video', async () => {
    const f = fixture(file), wf = f.fetch('display'); await wf.startFetch('fetch'); await flush();
    assert.equal(wf.pendingAuction.winner, 'display'); assert.equal(f.creates.length, 0);
  });
  check('VAST failure keeps initial video hidden and preserves one Display recovery loader', async () => {
    const f = fixture(file), r = f.playback();
    const method = (start, end) => f.source.slice(f.source.indexOf(start), f.source.indexOf(end, f.source.indexOf(start)));
    vm.runInContext('this.Visual = class { ' +
      method('  ensureSingleVisibleIntextSurface(', '  resolveTransitionPreservedHeight(') +
      method('  ensureTransitionLoader(', '  findDisplayCreativeSurface(') + ' };' +
      'this.Winner = class { ' + method('  async requestWinner(', '  async _requestFormat(') + ' };', f.context);
    Object.setPrototypeOf(r.node, f.context.Visual.prototype);
    const display = f.element(), recovery = f.element(), text = f.element();
    display.isConnected = true; r.wrapper.isConnected = true;
    recovery.classList.add('gexp-intext-loader'); recovery.style.display = 'none';
    recovery.querySelector = selector => selector === '.gexp-intext-loader-text' ? text : null;
    display.appendChild(recovery); display.querySelector = () => recovery;
    display.style.opacity = '0'; display.style.height = '0px';
    r.node.container = { getElement: () => display };
    r.node.startIntextTelemetryCycle = () => {};
    r.node.beginVisualRender = () => ++r.node._activeRenderToken;
    r.node.closeAll = () => assert.fail('successful Display fallback must not close');
    let deliverDisplay;
    const delivered = new Promise(resolve => { deliverDisplay = resolve; });
    const wf = new f.context.Winner(); wf.node = r.node;
    wf._requestFormat = async format => {
      if (format === 'video') { await r.result; return false; }
      // Transport boundary: exercise the existing recovery loader and surface helpers.
      r.node.ensureTransitionLoader(display, { source: 'fallback' });
      r.node.ensureTransitionLoader(display, { source: 'fallback' });
      display.style.opacity = '1'; display.style.height = '250px';
      await delivered; recovery.style.display = 'none'; return true;
    };
    const waterfall = wf.requestWinner('video', 'display', true);
    assert.equal(r.container.isOpen, false); assert.equal(r.wrapper.style.opacity, '0');
    assert.equal(r.loader.style.display, 'flex'); // Internal loader is effectively hidden.
    r.terminal('error'); await flush();
    assert.equal(r.opens, 0); assert.equal(r.wrapper.style.display, 'none');
    assert.equal(r.loader.style.display, 'none'); assert.equal(display.style.opacity, '1');
    assert.equal(display.children.filter(child => child.classList.contains('gexp-intext-loader')).length, 1);
    assert.equal(recovery.style.display, 'flex'); assert.equal(text.textContent, 'Recuperando anuncio');
    deliverDisplay(); await waterfall; assert.equal(recovery.style.display, 'none');
    r.creative.destroy();
  });
  check('concurrent slots and render share one dependency load', async () => {
    const f = fixture(file);
    const p1 = f.Creative.prewarmDependencies({ node: { id: 'one' } });
    const shared = f.Creative._dependenciesPromise;
    const p2 = f.Creative.prewarmDependencies({ node: { id: 'two' } });
    const creative = new f.Creative({ node: {}, config: {} });
    assert.equal(creative.ensureDependencies(), shared);
    await f.finishAssets(); await Promise.all([p1, p2]);
    assert.equal(f.assets.filter(el => el.tagName === 'SCRIPT').length, 4);
    assert.equal(f.assets.filter(el => el.tagName === 'LINK').length, 3);
    assert.equal(f.logs.filter(log => log.metric === 'video_dependency_prewarm_started')[1].reusedPromise, true);
    await f.Creative.prewarmDependencies({ node: { id: 'three' } });
    assert.equal(f.logs.filter(log => log.metric === 'video_dependency_prewarm_started')[2].alreadyReady, true);
  });
  for (const state of ['loaded', 'complete']) {
    check(state + ' without API rejects and permits a real shared retry', async () => {
      const f = fixture(file), script = f.element('script');
      script.src = 'https://vjs.zencdn.net/7.20.3/video.min.js';
      if (state === 'loaded') script.__intextDependencyStatus = 'loaded';
      else script.readyState = 'complete';
      f.assets.push(script);
      const prewarm = f.Creative.prewarmDependencies();
      const shared = f.Creative._dependenciesPromise;
      const creative = new f.Creative({ node: {}, config: {} });
      assert.equal(creative.ensureDependencies(), shared);
      await Promise.all([
        assert.rejects(prewarm, /video_dependency_loaded_but_unavailable/),
        assert.rejects(shared, /video_dependency_loaded_but_unavailable/),
      ]);
      assert.equal(script.__intextDependencyStatus, 'failed');
      assert.equal(f.Creative._dependenciesPromise, null);
      assert.equal(f.timers.size, 0);
      assert.ok(f.logs.some(log => log.metric === 'video_dependency_loaded_but_unavailable'));
      const retry = f.Creative.prewarmDependencies();
      assert.equal(creative.ensureDependencies(), f.Creative._dependenciesPromise);
      const replacement = f.assets.find(el => el.tagName === 'SCRIPT');
      assert.notEqual(replacement, script);
      assert.equal(f.assets.includes(script), false);
      assert.equal(f.assets.filter(el => el.tagName === 'SCRIPT').length, 1);
      await f.finishAssets(); await retry;
      assert.equal(replacement.__intextDependencyStatus, 'loaded');
      assert.equal(f.assets.filter(el => el.tagName === 'SCRIPT').length, 4);
    });
  }
  check('loaded with available API resolves immediately without reloading', async () => {
    const f = fixture(file), script = f.element('script');
    script.src = 'https://vjs.zencdn.net/7.20.3/video.min.js';
    script.__intextDependencyStatus = 'loaded'; f.assets.push(script);
    f.assetLoad(script);
    await f.Creative.loadDependencyScript(script.src, () => !!f.window.videojs);
    assert.equal(f.assets.length, 1); assert.equal(f.creates.length, 0);
    assert.equal(f.timers.size, 0); assert.equal(script.listeners.size, 0);
  });
  check('load event without API fails and cleans the bounded wait for retry', async () => {
    const f = fixture(file);
    const promise = f.Creative.ensureSharedDependencies();
    const script = f.assets.find(el => el.tagName === 'SCRIPT');
    script.emit('load');
    await assert.rejects(promise, /video_dependency_loaded_but_unavailable/);
    assert.equal(script.__intextDependencyStatus, 'failed');
    assert.equal(script.listeners.size, 0); assert.equal(f.timers.size, 0);
    assert.equal(f.Creative._dependenciesPromise, null);
    const retry = f.Creative.ensureSharedDependencies();
    assert.equal(f.assets.includes(script), false);
    await f.finishAssets(); await retry;
  });
  check('existing loading script waits for load and never duplicates', async () => {
    const f = fixture(file), script = f.element('script');
    script.src = 'https://vjs.zencdn.net/7.20.3/video.min.js'; f.assets.push(script);
    let resolved = false;
    const promise = f.Creative.prewarmDependencies().then(() => { resolved = true; });
    await flush(); assert.equal(resolved, false);
    assert.equal(f.assets.filter(el => el.tagName === 'SCRIPT').length, 1);
    f.assetLoad(script); await f.finishAssets(); await promise;
    assert.equal(script.listeners.size, 0);
  });
  check('existing script with a missed load event settles by the dependency deadline and render retries', async () => {
    const f = fixture(file), wf = f.fetch('video'), script = f.element('script');
    script.src = 'https://vjs.zencdn.net/7.20.3/video.min.js';
    script.emit('load'); // The external script finished before Intext attached listeners; no API is available.
    f.assets.push(script);
    await wf.startFetch('fetch'); await flush();
    let outcome = 'pending';
    const renderWait = f.Creative.ensureSharedDependencies().then(() => { outcome = 'ready'; }, error => { outcome = error.message; });
    const node = { _activeRenderToken: 1, isActiveRenderToken: () => true };
    const creative = new f.Creative({ node, config: {} });
    creative.createVideoElement = () => assert.fail('failed dependencies must not create video');
    creative.requestAds = () => assert.fail('failed dependencies must not request ads');
    const render = creative.render().catch(error => error);
    f.tick(f.Creative.DEPENDENCY_SCRIPT_TIMEOUT_MS - 1); await flush();
    assert.equal(outcome, 'pending');
    f.tick(1); await flush(); await renderWait;
    assert.equal(outcome, 'video_dependency_load_timeout');
    assert.equal((await render).message, 'video_dependency_load_timeout');
    assert.equal(f.Creative._dependenciesPromise, null); assert.equal(script.listeners.size, 0);
    assert.equal(script.__intextDependencyTimer, null); assert.equal(f.timers.size, 0);
    assert.equal(wf.fetchComplete, true); assert.equal(wf.pendingAuction.winner, 'video');
    const diagnostic = f.logs.find(log => log.metric === 'video_dependency_script_timeout');
    assert.equal(diagnostic.existingScript, true); assert.equal(diagnostic.timeoutMs, 10000);
    assert.equal(diagnostic.elapsedMs, 10000);
    assert.ok(f.logs.some(log => log.metric === 'video_dependency_prewarm_failed'));
    const retry = new f.Creative({ node: {}, config: {} }).ensureDependencies();
    await f.finishAssets(); await retry;
    assert.equal(f.assets.filter(el => el.tagName === 'SCRIPT').length, 4);
  });
  check('Intext-owned silent script also rejects finitely without duplicate concurrent tags', async () => {
    const f = fixture(file); const src = 'https://vjs.zencdn.net/7.20.3/video.min.js';
    const first = f.Creative.loadDependencyScript(src, () => false);
    const second = f.Creative.loadDependencyScript(src, () => false);
    assert.equal(first, second); const error = first.catch(error => error);
    assert.equal(f.assets.length, 1); f.tick(10000);
    assert.match((await error).message, /video_dependency_load_timeout/);
    assert.equal(f.timers.size, 0); assert.equal(f.assets[0].listeners.size, 0);
  });
  check('inherited unbounded script Promise is adopted with a finite deadline', async () => {
    const f = fixture(file), script = f.element('script');
    script.src = 'https://vjs.zencdn.net/7.20.3/video.min.js';
    script.__intextDependencyPromise = new Promise(() => {}); f.assets.push(script);
    const result = f.Creative.loadDependencyScript(script.src, () => false).catch(error => error);
    f.tick(10000); assert.match((await result).message, /video_dependency_load_timeout/);
    assert.equal(script.listeners.size, 0); assert.equal(f.timers.size, 0);
  });
  check('equivalent protocol-relative script and CSS URLs reuse the same resources', async () => {
    const f = fixture(file), script = f.element('script'), css = f.element('link');
    script.src = '//vjs.zencdn.net/7.20.3/video.min.js';
    css.href = '//vjs.zencdn.net/7.20.3/video-js.css'; f.assets.push(script, css);
    const first = f.Creative.prewarmDependencies();
    const shared = f.Creative.ensureSharedDependencies();
    const explicit = f.Creative.loadDependencyScript('https://vjs.zencdn.net/7.20.3/video.min.js', () => false);
    assert.equal(explicit, script.__intextDependencyPromise);
    await flush(); assert.equal(f.assets.filter(el => el.tagName === 'SCRIPT').length, 1);
    assert.equal(f.assets.filter(el => el.tagName === 'LINK').length, 3);
    await f.finishAssets(); await Promise.all([first, shared, explicit]);
    assert.equal(f.assets.filter(el => el.tagName === 'SCRIPT').length, 4);
    assert.equal(f.assets.filter(el => el.tagName === 'LINK').length, 3);
  });
  check('IMA protocol-relative URL does not insert a second SDK script', async () => {
    const f = fixture(file), script = f.element('script');
    script.src = '//imasdk.googleapis.com/js/sdkloader/ima3.js'; f.assets.push(script);
    const pending = f.Creative.loadDependencyScript('https://imasdk.googleapis.com/js/sdkloader/ima3.js', () => !!f.window.google?.ima);
    assert.equal(f.assets.length, 1); f.assetLoad(script); await pending;
    assert.equal(f.timers.size, 0);
  });
  check('script error does not invalidate fetch and render can retry', async () => {
    const f = fixture(file), wf = f.fetch('video'); await wf.startFetch('fetch'); await flush();
    f.assets.find(el => el.tagName === 'SCRIPT').emit('error'); await flush();
    assert.equal(wf.pendingAuction.winner, 'video'); assert.equal(wf.fetchComplete, true);
    assert.ok(f.logs.some(log => log.metric === 'video_dependency_prewarm_failed'));
    assert.equal(f.Creative._dependenciesPromise, null);
    const p = new f.Creative({ node: {}, config: {} }).ensureDependencies();
    await f.finishAssets(); await p;
    assert.equal(f.assets.filter(el => el.tagName === 'SCRIPT').length, 4);
  });
  check('synchronous stylesheet failure is diagnosed without failing fetch', async () => {
    const f = fixture(file), wf = f.fetch('video');
    f.document.head.appendChild = () => { throw new Error('head-unavailable'); };
    await wf.startFetch('fetch'); await flush();
    assert.equal(wf.fetchComplete, true); assert.equal(wf.pendingAuction.winner, 'video');
    assert.equal(f.logs.find(log => log.metric === 'video_dependency_prewarm_failed').error, 'head-unavailable');
  });
  for (const enabled of [undefined, true, false]) check(`preload config ${enabled} preserves every timeout`, () => {
    const f = fixture(file), r = f.playback({ preload: enabled });
    assert.equal(r.player.ima.options.adsRenderingSettings.enablePreloading, enabled !== false);
    assert.deepEqual(plain(r.player.ima.options.adsRenderingSettings), { enablePreloading: enabled !== false });
    for (const timeout of ['timeout', 'prerollTimeout', 'postrollTimeout']) assert.equal(r.player.ima.options[timeout], 30000);
    assert.ok([...f.timers.values()].some(timer => timer.delay === 25000));
    assert.equal(r.player.ima.options.adTagUrl, 'test-vast');
    const log = f.logs.find(log => log.metric === 'video_ima_preload_config');
    assert.equal(log.source, enabled === undefined ? 'default' : 'config'); r.creative.abort();
  });
  check('rVFC reveals immediately once, without playing or timeupdate', async () => {
    const f = fixture(file), r = f.playback(); r.started();
    assert.equal(r.opens, 0); assert.equal(r.wrapper.style.opacity, '0');
    assert.equal(r.loader.style.display, 'flex'); assert.equal(r.container.isOpen, false);
    r.frame(); await r.result;
    assert.equal(r.opens, 1); assert.equal(r.creative._playerRevealed, true);
    r.media.emit('playing'); r.media.currentTime = 0.1; r.media.emit('timeupdate');
    assert.equal(r.opens, 1); assert.equal(r.loader.style.display, 'none');
    assert.equal(f.logs.filter(log => log.metric === 'first-frame').length, 1);
    assert.equal(f.logs.find(log => log.metric === 'first-frame').source, 'request-video-frame-callback');
    assert.equal(f.logs.filter(log => log.metric === 'revealed').length, 1);
    assert.equal(f.logs.find(log => log.metric === 'revealed').source, 'request_video_frame_callback');
    assert.equal(r.creative._firstFrameWaitTimers.length, 0); r.creative.destroy();
  });
  check('playing at zero stays hidden until rVFC confirms exactly one frame and reveal', async () => {
    const f = fixture(file), r = f.playback(); r.started();
    r.media.emit('playing'); f.tick(500);
    assert.equal(r.opens, 0); assert.equal(r.container.isOpen, false);
    assert.equal(r.wrapper.style.opacity, '0'); assert.equal(r.node._intextPipFirstFrameConfirmed, undefined);
    assert.equal(f.logs.filter(log => log.metric === 'first-frame').length, 0);
    assert.equal(f.logs.filter(log => log.metric === 'revealed').length, 0);
    r.frame(); await r.result;
    r.media.emit('playing'); r.media.currentTime = 0.2; r.media.emit('timeupdate');
    assert.equal(r.opens, 1);
    assert.equal(f.logs.filter(log => log.metric === 'first-frame').length, 1);
    assert.equal(f.logs.filter(log => log.metric === 'revealed').length, 1); r.creative.destroy();
  });
  check('timeupdate above zero confirms and reveals without rVFC', async () => {
    const f = fixture(file), r = f.playback({ frame: false }); r.started();
    r.media.emit('playing'); assert.equal(r.opens, 0);
    r.media.currentTime = 0.1; r.media.emit('timeupdate'); await r.result;
    assert.equal(r.opens, 1); assert.equal(f.logs.find(log => log.metric === 'first-frame').source, 'media-timeupdate');
    r.media.emit('playing'); r.media.emit('timeupdate');
    assert.equal(f.logs.filter(log => log.metric === 'first-frame').length, 1);
    assert.equal(f.logs.filter(log => log.metric === 'revealed').length, 1); r.creative.destroy();
  });
  check('playing above zero confirms and reveals with media_playing source', async () => {
    const f = fixture(file), r = f.playback({ frame: false }); r.started();
    r.media.currentTime = 0.1; r.media.emit('playing'); await r.result;
    assert.equal(r.opens, 1); assert.equal(f.logs.find(log => log.metric === 'first-frame').source, 'media-playing');
    assert.equal(f.logs.find(log => log.metric === 'revealed').source, 'media_playing');
    r.media.emit('playing'); assert.equal(r.opens, 1); r.creative.destroy();
  });
  check('observed media with no frame cannot use native_started at 500ms', () => {
    const f = fixture(file), r = f.playback(); r.started(); f.tick(500);
    assert.equal(r.opens, 0); assert.equal(r.wrapper.style.opacity, '0');
    assert.equal(f.logs.filter(log => log.metric === 'revealed').length, 0); r.creative.abort();
  });
  check('replacement media owns a fresh rVFC; the old callback cannot confirm, reveal, animate or enter PiP', async () => {
    const f = fixture(file), r = f.playback(); r.started(); const stale = r.frameCallback();
    const replacement = f.element('video'); Object.assign(replacement, { currentTime: 0, paused: false, readyState: 2 });
    let fresh = null, requested = 0, cancelled = 0, pip = 0;
    replacement.requestVideoFrameCallback = callback => { requested++; fresh = callback; return 2; };
    replacement.cancelVideoFrameCallback = () => { cancelled++; fresh = null; };
    r.node.maybeEnterIntextPipFromLastIntersection = () => { pip++; };
    r.replaceMedia(replacement);
    assert.equal(requested, 1); assert.equal(r.creative._adMediaEl, replacement);
    assert.equal(r.frameCallback(), null); assert.equal(r.media.listeners.size, 0);
    stale(0, {});
    assert.equal(r.opens, 0); assert.equal(r.animations, 0); assert.equal(pip, 0);
    assert.equal(f.logs.filter(log => log.metric === 'first-frame').length, 0);
    const callback = fresh; callback(0, {}); await r.result;
    assert.equal(r.opens, 1); assert.equal(f.logs.find(log => log.metric === 'first-frame').mediaElement, replacement);
    stale(0, {}); callback(0, {}); replacement.emit('playing');
    assert.equal(f.logs.filter(log => log.metric === 'first-frame').length, 1);
    assert.equal(f.logs.filter(log => log.metric === 'revealed').length, 1);
    assert.equal(cancelled, 0); r.creative.destroy();
  });
  check('stale rVFC cannot reveal and cleans observations', () => {
    const f = fixture(file), r = f.playback(); r.started(); const callback = r.frameCallback();
    r.node._activeRenderToken = 2; callback(0, {});
    assert.equal(r.opens, 0); assert.equal(r.media.listeners.size, 0);
    assert.equal(r.creative._firstFrameWaitTimers.length, 0); r.creative.abort();
  });
  check('native started compatibility remains 500ms without a media element', async () => {
    const f = fixture(file), r = f.playback({ mediaFound: false }); r.started();
    f.tick(499); assert.equal(r.opens, 0); f.tick(1); await r.result;
    const log = f.logs.find(log => log.metric === 'revealed');
    assert.equal(log.source, 'native_started'); assert.equal(log.mediaElementFound, false);
    assert.equal(log.firstFrameConfirmed, false); assert.equal(log.elapsedFromStartedMs, 500); r.creative.destroy();
  });
  check('five health checkpoints inspect media and capture event-loop drift', () => {
    const f = fixture(file), r = f.playback(); r.started();
    f.tick(250); f.tick(250); f.tick(500); f.tick(1000); f.tick(3000, 950);
    const snapshots = f.logs.filter(log => log.metric === 'video_first_frame_wait_snapshot');
    assert.deepEqual(snapshots.map(log => log.checkpointMs), [250, 500, 1000, 2000, 5000]);
    assert.equal(snapshots[4].actualElapsedMs, 5950); assert.equal(snapshots[4].timerDriftMs, 950);
    assert.equal(snapshots[0].bufferedRanges, 2); assert.equal(snapshots[0].bufferedEnd, 3);
    assert.equal(snapshots[0].distancePx, 123); assert.equal(r.opens, 0); r.creative.abort();
  });
  check('frame cancels remaining checkpoints and diagnostic media events are deduped', () => {
    const f = fixture(file), r = f.playback(); r.started();
    for (const name of ['loadstart', 'loadedmetadata', 'waiting', 'suspend', 'progress', 'canplaythrough']) {
      r.media.emit(name); r.media.emit(name);
    }
    assert.equal(f.logs.filter(log => log.metric === 'video_media_state_event').length, 6);
    f.tick(250); r.frame(); f.tick(6000);
    assert.equal(f.logs.filter(log => log.metric === 'video_first_frame_wait_snapshot').length, 1);
    assert.equal(r.media.listeners.has('progress'), false); r.creative.destroy();
  });
  for (const terminal of ['error', 'timeout', 'complete', 'skipped', 'abort', 'destroy', 'stale']) {
    check(`terminal ${terminal} clears health timers/listeners and blocks late reveal`, async () => {
      const f = fixture(file), r = f.playback(); r.started(); const callback = r.frameCallback();
      if (terminal === 'timeout') f.tick(25000);
      else if (terminal === 'stale') { r.node._activeRenderToken = 2; f.tick(250); }
      else if (terminal === 'abort' || terminal === 'destroy') r.creative[terminal]();
      else r.terminal(terminal);
      assert.equal(r.creative._firstFrameWaitTimers.length, 0); assert.equal(r.media.listeners.size, 0);
      callback(0, {}); f.tick(6000); assert.equal(r.opens, 0);
      if (terminal === 'destroy' || terminal === 'stale') r.creative.abort();
      await r.result;
    });
  }
  check('render records dependency wait and remains hidden while infrastructure loads', async () => {
    const f = fixture(file), r = f.playback(); delete f.window.google;
    const prewarm = f.Creative.prewarmDependencies({ node: r.node });
    let ads = 0;
    r.creative.createVideoElement = () => {};
    r.creative.initVideoJS = () => {};
    r.creative.attachPlayerEvents = () => {};
    r.creative.requestAds = async () => { ads++; };
    const rendering = r.creative.render(); await flush();
    assert.equal(ads, 0); assert.equal(r.opens, 0); f.tick(600);
    await f.finishAssets(); await prewarm; await rendering;
    assert.equal(ads, 1); assert.equal(f.logs.find(log => log.metric === 'video_dependencies_ready').dependenciesWaitMs, 600);
    await r.creative.render();
    assert.equal(f.logs.filter(log => log.metric === 'video_dependencies_ready').length, 1);
    assert.equal(ads, 1); // Preparation and activation are idempotent per creative/token.
    r.creative.abort();
  });
  check('no early VAST or new timeout settings are introduced', () => {
    const f = fixture(file);
    const helper = f.source.slice(f.source.indexOf('  static dependencyDiagnostic('), f.source.indexOf('  ensureDependencies()', f.source.indexOf('  static dependencyDiagnostic(')));
    assert.doesNotMatch(helper, /requestAds\(|initializeAdDisplayContainer\(|\.play\(|\.ima\(|createElement\("video"\)/);
    const video = f.source.slice(f.source.indexOf('class IntextVideoCreative'), f.source.indexOf('class WPromise'));
    assert.doesNotMatch(video, /(?:prerollLoadVideoTimeout|loadVideoTimeout)\s*:/);
  });
}

test('debug summary exposes preload, dependency wait, frame sources and checkpoint count/drift', () => {
  const harnessSource = fs.readFileSync(path.join(__dirname, 'intext-debugger.audit.test.cjs'), 'utf8');
  const loadHarness = new Function('require', '__dirname', harnessSource + '; return { createHarness, nodeFixture };');
  const { createHarness, nodeFixture } = loadHarness(name => name === 'node:test' ? () => {} : require(name), __dirname);
  const h = createHarness(), node = nodeFixture();
  const collector = h.intextDebugCollector;
  collector.recordMetric('video_dependencies_ready', { node, dependenciesWaitMs: 2,
    dependencyPrewarmStarted: true, dependencyPrewarmReady: true, dependencyPrewarmMs: 600 });
  collector.recordMetric('video_ima_preload_config', { node, enabled: true });
  collector.recordVideoEvent('started', node);
  collector.recordMetric('video_first_frame_wait_snapshot', { node, timerDriftMs: 950 });
  collector.recordMetric('video_first_frame_wait_snapshot', { node, timerDriftMs: 10 });
  collector.recordVideoEvent('first-frame', node, { source: 'request-video-frame-callback' });
  collector.recordVideoEvent('revealed', node, { source: 'request_video_frame_callback' });
  const video = collector.getSummary().slotsAndCycles[0].video;
  assert.equal(video.dependencyPrewarmStarted, true); assert.equal(video.dependencyPrewarmReady, true);
  assert.equal(video.dependencyPrewarmMs, 600); assert.equal(video.dependenciesWaitMs, 2);
  assert.equal(video.imaPreloadingEnabled, true); assert.equal(video.firstFrameWaitSnapshots, 2);
  assert.equal(video.maxFirstFrameTimerDriftMs, 950);
  assert.equal(video.firstFrameSource, 'request-video-frame-callback');
  assert.equal(video.revealSource, 'request_video_frame_callback');
});
