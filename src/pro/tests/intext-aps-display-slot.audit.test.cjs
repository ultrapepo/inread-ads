const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', '_gam_kv_.js'), 'utf8');
// Reuse the existing GPT lifecycle fixture without registering its tests twice.
const fixture = fs.readFileSync(path.join(__dirname, 'intext-gpt-psp.audit.test.cjs'), 'utf8');
const { between, createRuntime, createDisplayNode } = new Function('source', 'vm', 'assert',
  fixture.slice(fixture.indexOf('function between('), fixture.indexOf("test('normal GPT")) +
  '; return { between, loadClasses, createRuntime, createDisplayNode };')(source, vm, assert);

function setup({ psp = true, responses = ['A'], fallback = false, missing = false, mutate = false, implementation = source } = {}) {
  const runtime = createRuntime({ psp });
  runtime.window.gexpIntextDebug = true;
  const logs = [];
  const callbacks = [];
  const snapshots = [];
  let currentBid = null;
  let keys = {};
  let fetchCount = 0;
  const aps = {
    fetchBids(configuration, callback) {
      runtime.calls.push(['fetchBids', configuration]);
      callbacks.push(callback);
      currentBid = responses[fetchCount++];
      keys = currentBid ? { [configuration.slots[0].slotID]: { amznbid: currentBid, amzniid: `iid-${currentBid}`, irrelevant: 'ignore' } } : {};
      if (currentBid !== 'pending') callback(currentBid ? [{}] : []);
    },
    setDisplayBids() {
      runtime.calls.push(['setDisplayBids']);
      if (!fallback && !missing && currentBid) {
        runtime.realSlot.setTargeting('amznbid', currentBid);
        runtime.realSlot.setTargeting('amzniid', `iid-${currentBid}`);
      }
    },
  };
  if (fallback) aps.targetingKeys = () => keys;
  const forbidden = () => assert.fail('PSP public APS proxy must not be called');
  runtime.window.apstag = psp ? { fetchBids: forbidden, setDisplayBids: forbidden, __ctrl: { realObj: aps } } : aps;
  const loadImplementation = new Function('source', 'vm', 'assert',
    fixture.slice(fixture.indexOf('function between('), fixture.indexOf("test('normal GPT")) +
    '; return loadClasses;')(implementation, vm, assert);
  const { Manager, Node } = loadImplementation(runtime.window);
  const manager = Object.create(Manager.prototype);
  const node = createDisplayNode(Node, manager, runtime);
  node._intextTelemetryCycleId = 1;
  node._nodeActive = true;
  node.isActiveRenderToken = (token) => node._nodeActive && token === node._activeRenderToken;
  node.showDisplay = async () => true;
  node.discardDisplay = () => {};
  node.applyDisplayRequestTargeting = () => { node.slot.setTargeting('p', 'intext'); node.slot.setTargeting('intext', '1'); };
  node.applyIntextRandomSnapshotToSlot = () => { for (let i = 1; i <= 4; i++) node.slot.setTargeting(`random${i}`, `${i}`); };
  node.applyDisplayBidTargeting = () => { for (const [k, v] of Object.entries({ hb_pb: '1.25', hb_bidder: 'ix', hb_adid: 'ad-1' })) node.slot.setTargeting(k, v); };
  if (mutate) manager.gexp.request = (slot) => node.clearIntextAmazonTargeting(slot);
  const originalRefresh = runtime.realPubads.refresh;
  runtime.realPubads.refresh = (slots) => {
    snapshots.push(JSON.parse(JSON.stringify(slots[0].getTargetingMap())));
    originalRefresh(slots);
  };
  const context = vm.createContext({ window: runtime.window, document: runtime.window.document,
    console, Promise, Object, Array, Set, Map, WeakMap, String, Number, Boolean, Date, Math, JSON, URL, URLSearchParams,
    setTimeout: (cb, ms) => setTimeout(cb, ms === 2000 ? 30 : ms), clearTimeout,
    logIntext: (...args) => logs.push(args), warnIntext: (...args) => logs.push(args), errorIntext() {},
    intextDebugCollector: { recordTimeline() {}, recordVideoEvent() {} },
    INTEXT_RANDOM_KEYS: ['random1', 'random2', 'random3', 'random4'],
  });
  const Waterfall = vm.runInContext(`const intextPrebidAliasRegistry = new WeakMap();
    ${between(implementation, 'class IntextWaterfall', 'class IntextVideoCreative')}; IntextWaterfall`, context);
  const waterfall = Object.create(Waterfall.prototype);
  waterfall.node = node;
  waterfall.config = { tam: { enabled: true } };
  node.waterfall = waterfall;
  waterfall.lastTrigger = 'initial';
  waterfall.getDisplaySizes = () => [[300, 250]];
  waterfall._lastCurrentBannerBids = [];
  const hasLog = (name) => logs.some((args) => String(args[0]).includes(name));
  return { ...runtime, manager, node, waterfall, aps, snapshots, callbacks, logs, hasLog, setKeys: (value) => { keys = value; } };
}

for (const psp of [true, false]) test(`first Display binds APS to the same real GPT slot (${psp ? 'PSP' : 'normal'})`, async () => {
  const r = setup({ psp });
  assert.equal(await r.waterfall._requestDisplay(1, 'initial'), true);
  const order = r.calls.map((c) => c[0]);
  for (const [a, b] of [['defineSlot', 'addService'], ['addService', 'fetchBids'], ['fetchBids', 'setDisplayBids'], ['setDisplayBids', 'display'], ['display', 'refresh']]) {
    assert.ok(order.indexOf(a) < order.indexOf(b), `${a} before ${b}`);
  }
  assert.equal(r.node.slot, r.realSlot);
  assert.equal(r.calls.find((c) => c[0] === 'refresh')[1][0], r.realSlot);
  assert.equal(r.snapshots[0].amznbid[0], 'A');
  const config = r.calls.find((c) => c[0] === 'fetchBids')[1].slots[0];
  assert.equal(config.slotID, r.realSlot.getSlotElementId());
  assert.equal(config.slotName, r.realSlot.getAdUnitPath());
  assert.deepEqual(JSON.parse(JSON.stringify(config.sizes)), [[300, 250]]);
  const identity = r.logs.find((args) => String(args[0]).includes('display_slot_identity'))[1];
  assert.equal(identity.identityMatches, true);
});

for (const psp of [true, false]) test(`standalone source binds the same GPT slot (${psp ? 'PSP' : 'normal'})`, async () => {
  const implementation = fs.readFileSync(path.join(__dirname, '..', 'IntextManager.js'), 'utf8');
  const r = setup({ psp, implementation });
  assert.equal(await r.waterfall._requestDisplay(1), true);
  assert.equal(r.calls.find((c) => c[0] === 'refresh')[1][0], r.node.slot);
  assert.deepEqual(r.snapshots[0].amznbid, ['A']);
  assert.equal(r.calls.filter((c) => c[0] === 'defineSlot').length, 1);
});

test('preparing twice is idempotent and does not display, refresh, or request GEXP', async () => {
  const r = setup();
  let requests = 0;
  r.manager.gexp.request = () => requests++;
  await Promise.all([r.node.ensureIntextDisplayGptSlot(1), r.node.ensureIntextDisplayGptSlot(1)]);
  assert.equal(r.calls.filter((c) => c[0] === 'defineSlot').length, 1);
  assert.equal(r.calls.some((c) => ['display', 'refresh', 'fetchBids'].includes(c[0])), false);
  assert.equal(requests, 0);
});

test('refresh reuses slot, clears stale Amazon, and preserves unrelated targeting on no-bid', async () => {
  const r = setup({ responses: ['A', null] });
  await r.waterfall._requestDisplay(1);
  await r.waterfall._requestDisplay(1, 'refresh');
  assert.equal(r.calls.filter((c) => c[0] === 'defineSlot').length, 1);
  assert.equal(r.calls.filter((c) => c[0] === 'setDisplayBids').length, 1);
  assert.equal(r.snapshots[1].amznbid, undefined);
  assert.deepEqual(r.snapshots[1].hb_pb, ['1.25']);
  for (const key of ['p', 'intext', 'random1', 'random2', 'random3', 'random4']) assert.ok(r.snapshots[1][key]);
});

test('new bid replaces the previous cycle snapshot', async () => {
  const r = setup({ responses: ['A', 'B'] });
  await r.waterfall._requestDisplay(1);
  r.node._intextTelemetryCycleId++;
  await r.waterfall._requestDisplay(1, 'sentinel_retry');
  assert.deepEqual(r.snapshots.map((snapshot) => snapshot.amznbid), [['A'], ['B']]);
  assert.equal(r.calls.filter((c) => c[0] === 'defineSlot').length, 1);
});

test('targetingKeys fallback applies only fresh amzn keys belonging to the requested slot', async () => {
  const r = setup({ fallback: true });
  await r.waterfall._requestDisplay(1);
  assert.deepEqual(r.snapshots[0].amznbid, ['A']);
  assert.equal(r.snapshots[0].irrelevant, undefined);
  assert.ok(r.hasLog('display_targeting_fallback_applied'));
});

test('a stale targetingKeys cache cannot be applied as fallback', async () => {
  const r = setup({ fallback: true });
  r.aps.targetingKeys = () => ({ 'gexp-intext': { amznbid: 'old' } });
  await r.waterfall._requestDisplay(1);
  assert.equal(r.snapshots[0].amznbid, undefined);
  assert.ok(r.hasLog('display_targeting_missing_after_bid'));
});

test('targetingKeys from a different slot cannot be applied', async () => {
  const r = setup({ fallback: true });
  let reads = 0;
  r.aps.targetingKeys = () => ++reads > 1 ? { other: { amznbid: 'other-bid' } } : {};
  await r.waterfall._requestDisplay(1);
  assert.equal(r.snapshots[0].amznbid, undefined);
});

test('bid without either targeting path warns and proceeds to GAM', async () => {
  const r = setup({ missing: true });
  assert.equal(await r.waterfall._requestDisplay(1), true);
  assert.ok(r.hasLog('display_targeting_missing_after_bid'));
  assert.equal(r.snapshots[0].amznbid, undefined);
});

test('core mutation restores only the validated current Amazon snapshot before refresh', async () => {
  const r = setup({ mutate: true });
  await r.waterfall._requestDisplay(1);
  assert.deepEqual(r.snapshots[0].amznbid, ['A']);
  assert.deepEqual(r.snapshots[0].amzniid, ['iid-A']);
  for (const key of ['hb_pb', 'hb_bidder', 'hb_adid', 'random1', 'random2', 'random3', 'random4', 'p', 'intext']) assert.ok(r.snapshots[0][key]);
});

test('timeout then new request rejects the old callback without mutating targeting', async () => {
  const r = setup({ responses: ['pending', 'B'] });
  await r.node.ensureIntextDisplayGptSlot(1);
  const config = r.waterfall.getTAMConfiguration();
  assert.equal(await r.waterfall.executeAmazonTam(config, { renderToken: 1 }), 'tam_timeout');
  await r.waterfall._requestDisplay(1);
  const before = r.realSlot.getTargetingMap();
  const count = r.calls.filter((c) => c[0] === 'setDisplayBids').length;
  r.callbacks[0]([{}]);
  assert.equal(r.calls.filter((c) => c[0] === 'setDisplayBids').length, count);
  assert.deepEqual(r.realSlot.getTargetingMap(), before);
  assert.ok(r.hasLog('display_late_callback_ignored'));
});

for (const change of ['token', 'cycle', 'close', 'slot']) test(`callback ownership rejects changed ${change}`, async () => {
  const r = setup({ responses: ['pending'] });
  await r.node.ensureIntextDisplayGptSlot(1);
  const promise = r.waterfall.executeAmazonTam(r.waterfall.getTAMConfiguration(), { renderToken: 1 });
  if (change === 'token') r.node._activeRenderToken++;
  if (change === 'cycle') r.node._intextTelemetryCycleId++;
  if (change === 'close') r.node._nodeActive = false;
  if (change === 'slot') r.node.slot = { ...r.realSlot };
  r.callbacks[0]([{}]);
  assert.equal(await promise, 'tam_stale');
  assert.equal(r.calls.some((c) => c[0] === 'setDisplayBids'), false);
});

test('TAM video-first does not inspect or define a Display GPT slot', async () => {
  const r = setup();
  r.aps.setDisplayBids = () => r.calls.push(['setDisplayBids']);
  r.aps.targetingKeys = () => ({ [r.node.videoId]: { amznbid: 'video' } });
  Object.defineProperty(r.node, 'slot', { get() { assert.fail('Video must not inspect Display slot'); } });
  assert.equal(await r.waterfall.executeAmazonTam({ slots: [{ slotID: r.node.videoId }] }, { format: 'video', renderToken: 1 }), 'tam_done');
  assert.equal(r.calls.some((c) => c[0] === 'defineSlot'), false);
  assert.ok(r.hasLog('video_targeting_available'));
  assert.equal(r.hasLog('display_targeting_missing'), false);
});

test('video targetingKeys unavailable is a video-only diagnostic', async () => {
  const r = setup();
  r.aps.setDisplayBids = () => {};
  await r.waterfall.executeAmazonTam({ slots: [{ slotID: r.node.videoId }] }, { format: 'video', renderToken: 1 });
  assert.ok(r.hasLog('video_targeting_unavailable'));
  assert.equal(r.hasLog('display_targeting_missing'), false);
});

test('mismatched APS slot identity skips fetch and cannot mutate another slot', async () => {
  const r = setup();
  await r.node.ensureIntextDisplayGptSlot(1);
  assert.equal(await r.waterfall.executeAmazonTam({ slots: [{ slotID: 'other' }] }, { renderToken: 1 }), null);
  assert.equal(r.calls.some((c) => c[0] === 'fetchBids'), false);
});

test('video GAM tag retains APS video keys without defining a Display slot', async () => {
  const r = setup();
  r.window.location = { href: 'https://example.test/article' };
  r.aps.setDisplayBids = () => {};
  r.aps.targetingKeys = () => ({ [r.node.videoId]: { amznbid: 'video-A', amzniid: ['video-iid'] } });
  r.manager.resolveIntextVideoAdUnitPath = () => 'test/v';
  r.manager.resolveIntextPrebidApi = () => ({ api: null });
  r.waterfall.resolveIntextVideoConfig = () => ({ playerSize: [640, 360] });
  r.node.resolveVideoRequestTargeting = () => ({ targeting: {} });
  r.waterfall.getTAMVideoConfiguration = () => ({ slots: [{ slotID: r.node.videoId }] });
  let requestedUrl;
  r.node.buildAndPlayVideo = async (url) => { requestedUrl = url; return true; };
  assert.equal(await r.waterfall._requestVideo(1), true);
  const url = new URL(requestedUrl);
  const targeting = new URLSearchParams(url.searchParams.get('cust_params'));
  assert.equal(targeting.get('amznbid'), 'video-A');
  assert.equal(targeting.get('amzniid'), 'video-iid');
  assert.equal(r.calls.some((c) => c[0] === 'defineSlot'), false);
});
