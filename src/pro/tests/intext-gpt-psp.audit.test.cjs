const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', '_gam_kv_.js'), 'utf8');

function between(text, start, end) {
  const from = text.indexOf(start);
  const to = text.indexOf(end, from + start.length);
  assert.ok(from >= 0, `missing start marker: ${start}`);
  assert.ok(to > from, `missing end marker: ${end}`);
  return text.slice(from, to);
}

function loadClasses(window) {
  window.__warnings = [];
  const context = vm.createContext({
    window,
    document: window.document,
    console,
    Promise,
    Object,
    Array,
    Set,
    Map,
    String,
    Number,
    Boolean,
    Date,
    Math,
    JSON,
    URL,
    URLSearchParams,
    setTimeout,
    clearTimeout,
    logIntext() {},
    warnIntext(...args) { window.__warnings.push(args); },
    errorIntext() {},
    intextDebugCollector: { attachManager() {}, recordTimeline() {}, recordMetric() {} },
  });
  const Manager = vm.runInContext(
    `${between(source, 'class IntextManager', 'class IntextPlacementEngine')}; IntextManager`,
    context,
  );
  const Node = vm.runInContext(
    `${between(source, 'class IntextNode', 'class IntextContainer')}; IntextNode`,
    context,
  );
  return { Manager, Node };
}

function createRuntime({ psp = false, innerOnly = false, both = false, invalid = false } = {}) {
  const handlers = new Set();
  const slotElement = {
    dataset: {},
    style: {},
    isConnected: true,
    hasAttribute(name) { return this[name] === true; },
    setAttribute(name) { this[name] = true; },
  };
  const realSlot = {
    targeting: {},
    addService(service) { calls.push(['addService', service]); this.service = service; return this; },
    setTargeting(key, value) { this.targeting[key] = Array.isArray(value) ? value : [value]; },
    clearTargeting(key) { delete this.targeting[key]; },
    getTargeting(key) { return this.targeting[key] || []; },
    getTargetingKeys() { return Object.keys(this.targeting); },
    getTargetingMap() { return { ...this.targeting }; },
    getSlotElementId() { return 'gexp-intext'; },
    getAdUnitPath() { return '/99071977/test/n'; },
    getSizes() { return [[300, 250], 'fluid', [1, 1]]; },
  };
  const calls = [];
  const realPubads = {
    addEventListener(type, handler) { calls.push(['addEventListener', type]); handlers.add(handler); },
    removeEventListener(type, handler) { calls.push(['removeEventListener', type]); handlers.delete(handler); },
    refresh(slots) {
      calls.push(['refresh', slots]);
      [...handlers].forEach((handler) => handler({ slot: realSlot, isEmpty: false, size: [300, 250] }));
    },
    getSlots() { return [realSlot]; },
  };
  const realGpt = {
    apiReady: true,
    pubadsReady: true,
    defineSlot(...args) { calls.push(['defineSlot', ...args]); return realSlot; },
    pubads() { calls.push(['pubads']); return realPubads; },
    display(id) { calls.push(['display', id]); },
    destroySlots(slots) { calls.push(['destroySlots', slots]); return true; },
  };
  const proxy = {
    apiReady: true,
    pubadsReady: true,
    cmd: {
      push(...args) {
        calls.push(['cmd.push', args.length, args[1]]);
        args[0]();
      },
    },
    defineSlot() { calls.push(['proxy.defineSlot']); return { proxySlot: true }; },
    pubads() { calls.push(['proxy.pubads']); return {}; },
    display() { calls.push(['proxy.display']); },
    destroySlots() { calls.push(['proxy.destroySlots']); },
  };
  if (psp) {
    proxy.__ctrl = invalid
      ? { dummyObject: {} }
      : innerOnly
        ? { innerObject: realGpt }
        : both
          ? { baseObject: realGpt, innerObject: { ...realGpt } }
          : { baseObject: realGpt, dummyObject: {}, cmdOverriden: true };
  }
  const document = { getElementById: () => slotElement };
  const window = { googletag: psp ? proxy : { ...realGpt, cmd: proxy.cmd }, document };
  return { window, proxy, realGpt, realPubads, realSlot, calls, slotElement };
}

function createDisplayNode(Node, manager, runtime, id = 'gexp-intext') {
  const node = {
    id,
    videoId: `${id}-video`,
    manager,
    config: { display: { sizes: [[300, 250]] } },
    scopedContext: null,
    slot: null,
    state: 'idle',
    _activeRenderToken: 1,
    _visualState: 'idle',
    _displayRequestInFlight: false,
    _slotGptApi: null,
    _slotPubadsService: null,
    _slotGptSource: null,
    _initialDisplayRenderHandler: null,
    _persistentDisplayRenderHandler: null,
    _hasPersistentListener: false,
    _intextTelemetryCycle: {},
    waterfall: { _intextTelemetryCycle: {}, lastTrigger: 'initial', _lastCurrentBannerBids: [] },
    container: { getElement: () => runtime.slotElement, setElement() {} },
    videoContainer: { getElement: () => null },
    wa: null,
    isActiveRenderToken: () => true,
    mergeIntextTelemetry() {},
    resolveDisplayRequestTargeting: () => ({ targeting: {} }),
    clearDisplayRequestTargeting() {},
    applyDisplayRequestTargeting() {},
    applyIntextRandomSnapshotToSlot() {},
    assertIntextRandomSnapshotOnSlot() {},
    ensureIntextCycleTelemetryIdentity() {},
    getSlotTargetingMapSafe: () => ({}),
    applyDisplayBidTargeting() {},
    isHouseLineItemSentinel: () => false,
    resolveDisplayRenderSizeFromEvent: () => ({ gamWidth: 300, gamHeight: 250, actualHeight: 250 }),
    getDisplayCreativeSizeFromEvent: () => '300x250',
    getDisplayGamEventSize: () => '300x250',
    getDisplayLayoutTelemetry: () => ({}),
    getIntextDistancePx: () => 0,
    flushIntextTelemetryToCI() {},
    maybeIncrementFallbackBlankControl() {},
    isHouse1x1AutoRefreshCandidate: () => false,
    isHouse1x1AutoRefreshMaxReached: () => false,
    getDisplayGamRequestTargetingFinal: () => ({}),
    pickHbTargeting: () => ({}),
    getSlotTargetingValueSafe: () => null,
    ensureSingleIntextWrapper: (element) => element,
    ...Object.fromEntries([
      'isUsableIntextPubadsService',
      'removeIntextDisplayListeners',
      'clearIntextGptSlotIdentity',
      'destroyIntextDisplaySlot',
      'ensureIntextDisplayGptSlot',
      'normalizeIntextAmazonTargeting',
      'getIntextAmazonTargeting',
      'clearIntextAmazonTargeting',
      'isIntextAmazonDisplayRequestCurrent',
      'preserveIntextAmazonTargetingForCurrentCycle',
      'askDisplay',
    ].map((name) => [name, Node.prototype[name]])),
  };
  manager.resolveIntextRequestNetworkId = () => '99071977';
  manager.resolveIntextDisplayAdUnitPath = () => 'test/n';
  manager.getIntextNetworkTelemetry = () => ({});
  manager.gexp = { request() {}, isHouse: () => false, isAdex: () => false, isReloadAllowed: () => false };
  return node;
}

test('normal GPT completes display lifecycle and uses the standard one-argument cmd signature', async () => {
  const runtime = createRuntime();
  const { Manager, Node } = loadClasses(runtime.window);
  const manager = Object.create(Manager.prototype);
  const resolution = manager.resolveIntextGptApi();
  assert.equal(resolution.api, runtime.window.googletag);
  assert.equal(resolution.source, 'window.googletag');
  const node = createDisplayNode(Node, manager, runtime);
  const result = await node.askDisplay(null, 1, 'display_only');
  assert.equal(result.filled, true);
  await node.destroyIntextDisplaySlot('normal-cleanup');
  assert.deepEqual(runtime.calls.find((call) => call[0] === 'cmd.push'), ['cmd.push', 1, undefined]);
  for (const operation of ['defineSlot', 'pubads', 'addService', 'addEventListener', 'display', 'refresh', 'removeEventListener', 'destroySlots']) {
    assert.ok(runtime.calls.some((call) => call[0] === operation), operation);
  }
});

test('PSP selects baseObject, schedules with force=true, and never calls proxy GPT methods', async () => {
  const runtime = createRuntime({ psp: true });
  const { Manager, Node } = loadClasses(runtime.window);
  const manager = Object.create(Manager.prototype);
  const resolution = manager.resolveIntextGptApi();
  assert.equal(resolution.source, '__ctrl.baseObject');
  const node = createDisplayNode(Node, manager, runtime);
  const result = await node.askDisplay(null, 1, 'display_only');
  assert.equal(result.filled, true, JSON.stringify({ result, warnings: runtime.window.__warnings }));
  assert.ok(runtime.calls.some((call) => call[0] === 'cmd.push' && call[1] === 2 && call[2] === true));
  assert.ok(runtime.calls.some((call) => call[0] === 'defineSlot'));
  assert.ok(runtime.calls.some((call) => call[0] === 'display'));
  assert.ok(runtime.calls.some((call) => call[0] === 'refresh' && call[1][0] === runtime.realSlot));
  assert.equal(runtime.calls.some((call) => call[0].startsWith('proxy.')), false);
  await node.destroyIntextDisplaySlot('test-cleanup');
  assert.ok(runtime.calls.some((call) => call[0] === 'destroySlots' && call[1][0] === runtime.realSlot));
  assert.equal(node._displayRequestInFlight, false);
  assert.equal(node.slot, null);
});

test('PSP innerObject is a compatibility fallback and baseObject wins when both exist', () => {
  for (const [options, expected] of [
    [{ psp: true, innerOnly: true }, '__ctrl.innerObject'],
    [{ psp: true, both: true }, '__ctrl.baseObject'],
  ]) {
    const runtime = createRuntime(options);
    const { Manager } = loadClasses(runtime.window);
    assert.equal(Object.create(Manager.prototype).resolveIntextGptApi().source, expected);
  }
});

test('PSP without a real API fails cleanly and does not fall back to proxy.defineSlot', async () => {
  const runtime = createRuntime({ psp: true, invalid: true });
  const { Manager, Node } = loadClasses(runtime.window);
  const manager = Object.create(Manager.prototype);
  assert.equal(manager.resolveIntextGptApi().source, 'psp-real-gpt-unavailable');
  const result = await createDisplayNode(Node, manager, runtime).askDisplay(null, 1, 'fallback');
  assert.equal(result.filled, false);
  assert.equal(result.gptError, 'psp-real-gpt-unavailable');
  assert.equal(runtime.calls.some((call) => call[0] === 'proxy.defineSlot'), false);
});

test('display_only, video fallback and video-complete refresh use the same per-node GPT identity', async () => {
  for (const trigger of ['display_only', 'fallback', 'refresh-after-video-complete']) {
    const runtime = createRuntime({ psp: true });
    const { Manager, Node } = loadClasses(runtime.window);
    const manager = Object.create(Manager.prototype);
    const node = createDisplayNode(Node, manager, runtime);
    const result = await node.askDisplay(null, 1, trigger);
    assert.equal(result.filled, true, `${trigger}: ${JSON.stringify(result)}`);
    assert.equal(node._slotGptApi, runtime.realGpt, trigger);
    assert.equal(node._slotPubadsService, runtime.realPubads, trigger);
  }
});

test('multiple Intext nodes do not share slot/API/service state', async () => {
  const runtimeA = createRuntime({ psp: true });
  const runtimeB = createRuntime({ psp: true });
  const { Manager, Node } = loadClasses(runtimeA.window);
  const managerA = Object.create(Manager.prototype);
  const { Manager: ManagerB } = loadClasses(runtimeB.window);
  const managerB = Object.create(ManagerB.prototype);
  const nodeA = createDisplayNode(Node, managerA, runtimeA, 'gexp-intext');
  const nodeB = createDisplayNode(Node, managerB, runtimeB, 'gexp-intext-2');
  await Promise.all([nodeA.askDisplay(null, 1, 'display_only'), nodeB.askDisplay(null, 1, 'display_only')]);
  assert.notEqual(nodeA.slot, nodeB.slot);
  assert.notEqual(nodeA._slotGptApi, nodeB._slotGptApi);
  assert.notEqual(nodeA._slotPubadsService, nodeB._slotPubadsService);
});

test('P0 remains isolated from Rewarded and the exterior GAMExp resolver', () => {
  const rewardedStart = source.indexOf('class RewardedAdManager');
  const rewarded = rewardedStart >= 0 ? source.slice(rewardedStart) : '';
  const gamExp = source.slice(source.indexOf('class GAMExp'), rewardedStart >= 0 ? rewardedStart : undefined);
  assert.doesNotMatch(rewarded, /resolveIntextGptApi|runIntextGptCommand/);
  assert.doesNotMatch(gamExp, /resolveIntextGptApi|runIntextGptCommand|__ctrl\.baseObject/);
});
