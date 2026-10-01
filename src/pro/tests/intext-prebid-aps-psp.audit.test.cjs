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

function loadRuntime(window) {
  const warnings = [];
  const context = vm.createContext({
    window,
    console,
    Promise,
    Object,
    Array,
    Set,
    Map,
    WeakMap,
    String,
    Number,
    Boolean,
    Date,
    Math,
    JSON,
    URL,
    URLSearchParams,
    setTimeout: (callback, ms) => setTimeout(callback, ms >= 2000 ? 80 : Math.min(ms, 10)),
    clearTimeout,
    logIntext() {},
    warnIntext(...args) { warnings.push(args); },
    errorIntext() {},
    WindowArray: {},
  });
  const Manager = vm.runInContext(
    `${between(source, 'class IntextManager', 'class IntextPlacementEngine')}; IntextManager`,
    context,
  );
  const Waterfall = vm.runInContext(`
    const intextPrebidAliasRegistry = new WeakMap();
    ${between(source, 'class IntextWaterfall', 'class IntextVideoCreative')}
    IntextWaterfall;
  `, context);
  const Node = vm.runInContext(`${between(source, 'class IntextNode', 'class IntextContainer')}; IntextNode`, context);
  Waterfall.Node = Node;
  return { Manager, Waterfall, warnings };
}

function createSlot() {
  return {
    targeting: {},
    setTargeting(key, value) { this.targeting[key] = Array.isArray(value) ? value : [value]; },
    clearTargeting(key) { delete this.targeting[key]; },
    getTargetingMap() { return { ...this.targeting }; },
    getSlotElementId() { return 'gexp-intext'; },
    getAdUnitPath() { return '/99071977/test/n'; },
    getSizes() { return [[300, 250]]; },
    getTargetingKeys() { return Object.keys(this.targeting); },
    getTargeting(key) { return this.targeting[key] || []; },
    addService() { return this; },
  };
}

function createRealPbjs(order, slot) {
  const bid = {
    auctionId: 'auction-p2',
    adId: 'ad-p2',
    bidderCode: 'ix_video',
    cpm: 1.25,
    mediaType: 'banner',
  };
  return {
    version: 'v11.25.0',
    que: { push(callback) { order.push('que.push'); callback(); } },
    aliasBidder() { order.push('aliasBidder'); },
    addAdUnits() { order.push('addAdUnits'); },
    removeAdUnit() { order.push('removeAdUnit'); },
    markWinningBidAsUsed() { order.push('markWinningBidAsUsed'); },
    requestBids({ bidsBackHandler }) {
      order.push('requestBids');
      bidsBackHandler({}, false, 'auction-p2');
    },
    getBidResponsesForAdUnitCode() { order.push('getBidResponsesForAdUnitCode'); return { bids: [bid] }; },
    getNoBids() { return []; },
    setTargetingForGPTAsync() {
      order.push('setTargetingForGPTAsync');
      slot.setTargeting('hb_pb', '1.25');
      slot.setTargeting('hb_bidder', 'ix_video');
      slot.setTargeting('hb_adid', 'ad-p2');
    },
    getAdserverTargetingForAdUnitCode() { return { hb_pb: '1.25' }; },
    getConfig() { return {}; },
    setConfig() { order.push('setConfig'); },
  };
}

function createWaterfall(Waterfall, manager, slot, aliases = { ix_video: 'ix' }) {
  const waterfall = Object.create(Waterfall.prototype);
  waterfall.node = {
    id: 'gexp-intext',
    slot,
    manager,
    scopedContext: null,
    _slotPubadsService: { getSlots: () => [slot] },
    mergeIntextTelemetry() {},
    isActiveRenderToken() { return true; },
    ...Object.fromEntries(['normalizeIntextAmazonTargeting', 'getIntextAmazonTargeting', 'clearIntextAmazonTargeting',
      'isIntextAmazonDisplayRequestCurrent', 'ensureIntextDisplayGptSlot', 'isUsableIntextPubadsService'].map((key) => [key, Waterfall.Node.prototype[key]])),
  };
  waterfall.config = {
    prebid: { pbjsAvailabilityWaitMs: 80, pbjsAvailabilityRetryMs: 5, graceMs: 0 },
  };
  waterfall.getPrebidAliasesConfig = () => ({ aliases });
  waterfall.waitForPrebidGlobalInitFlag = () => Promise.resolve(true);
  waterfall.getPrebidTimeout = () => 10;
  waterfall._aliasRegistrationState = 'idle';
  waterfall._aliasRegistrationPromise = null;
  return waterfall;
}

function createManager(Manager) {
  const manager = Object.create(Manager.prototype);
  manager.runIntextGptCommand = (callback) => {
    callback({ pubads: () => ({ getSlots: () => [] }) });
    return Promise.resolve({ executed: true });
  };
  return manager;
}

test('normal and PSP resolvers select only the intended real APIs', () => {
  const slot = createSlot();
  const order = [];
  const realPbjs = createRealPbjs(order, slot);
  const realAps = { fetchBids() {}, setDisplayBids() {} };
  for (const psp of [false, true]) {
    const window = psp
      ? {
          pbjs: { __ctrl: { baseObj: { que: [], requestBids() {} }, realObj: realPbjs } },
          apstag: { __ctrl: { baseObj: { fetchBids() {}, setDisplayBids() {}, _Q: [] }, realObj: realAps } },
        }
      : { pbjs: realPbjs, apstag: realAps };
    const { Manager } = loadRuntime(window);
    const manager = createManager(Manager);
    const pb = manager.resolveIntextPrebidApi();
    const aps = manager.resolveIntextApstagApi();
    assert.equal(pb.api, realPbjs);
    assert.equal(aps.api, realAps);
    assert.equal(pb.source, psp ? '__ctrl.realObj' : 'window.pbjs');
    assert.equal(aps.source, psp ? '__ctrl.realObj' : 'window.apstag');
    assert.equal(pb.pspDetected, psp);
    assert.equal(aps.pspDetected, psp);
  }
});

test('waitForPbjsAvailability executes with immediately available normal and PSP PBJS', async () => {
  for (const psp of [false, true]) {
    const slot = createSlot();
    const realPbjs = createRealPbjs([], slot);
    const window = psp
      ? { pbjs: { __ctrl: { baseObj: { que: [], requestBids() {} }, realObj: realPbjs } } }
      : { pbjs: realPbjs };
    const { Manager, Waterfall } = loadRuntime(window);
    const manager = createManager(Manager);
    const waterfall = createWaterfall(Waterfall, manager, slot);

    assert.equal(await waterfall.waitForPbjsAvailability({ code: 'gexp-intext' }), true);
    assert.equal(manager.resolveIntextPrebidApi().api, realPbjs);
    assert.equal(manager.resolveIntextPrebidApi().source, psp ? '__ctrl.realObj' : 'window.pbjs');
  }
});

test('PSP Prebid auction uses realObj, preserves alias order and applies hb targeting', async () => {
  const order = [];
  const slot = createSlot();
  const realPbjs = createRealPbjs(order, slot);
  const baseCalls = [];
  const proxyCalls = [];
  const window = {
    gexpIntextDebug: true,
    pbjs: {
      requestBids() { proxyCalls.push('requestBids'); throw new Error('PBJS proxy must not be used'); },
      __ctrl: {
        baseObj: { que: [], requestBids() { baseCalls.push('requestBids'); } },
        realObj: realPbjs,
        dummyObject: {},
        overriden: true,
        passthruProperty: '__pbjs__',
      },
    },
  };
  const { Manager, Waterfall, warnings } = loadRuntime(window);
  const manager = createManager(Manager);
  const waterfall = createWaterfall(Waterfall, manager, slot);
  await waterfall.executePrebid({ code: 'gexp-intext', mediaTypes: { banner: {} } });
  assert.ok(order.indexOf('aliasBidder') < order.indexOf('addAdUnits'));
  assert.ok(order.indexOf('addAdUnits') < order.indexOf('requestBids'));
  assert.deepEqual(baseCalls, []);
  assert.deepEqual(proxyCalls, []);
  assert.deepEqual(Object.keys(slot.getTargetingMap()).sort(), ['hb_adid', 'hb_bidder', 'hb_pb']);
  assert.equal(warnings.some(([message]) => String(message).includes('targeting_missing')), false);
});

test('PSP Prebid waits for late realObj and never treats baseObj as ready', async () => {
  const order = [];
  const slot = createSlot();
  const realPbjs = createRealPbjs(order, slot);
  const baseCalls = [];
  const window = { pbjs: { __ctrl: { baseObj: { que: [], requestBids() { baseCalls.push('requestBids'); } } } } };
  const { Manager, Waterfall } = loadRuntime(window);
  const manager = createManager(Manager);
  const waterfall = createWaterfall(Waterfall, manager, slot);
  setTimeout(() => { window.pbjs.__ctrl.realObj = realPbjs; }, 5);
  assert.equal(await waterfall.waitForPbjsAvailability({ code: 'gexp-intext' }), true);
  assert.equal(manager.resolveIntextPrebidApi().source, '__ctrl.realObj');
  await waterfall.executePrebid({ code: 'gexp-intext', mediaTypes: { banner: {} } });
  assert.ok(order.includes('requestBids'));
  assert.deepEqual(baseCalls, []);
});

test('PSP Prebid without realObj times out cleanly without proxy/baseObj calls', async () => {
  const calls = [];
  const window = {
    pbjs: {
      requestBids() { calls.push('proxy'); },
      __ctrl: { baseObj: { que: [], requestBids() { calls.push('base'); } } },
    },
  };
  const { Manager, Waterfall } = loadRuntime(window);
  const waterfall = createWaterfall(Waterfall, createManager(Manager), createSlot());
  assert.equal(await waterfall.executePrebid({ code: 'gexp-intext', mediaTypes: { banner: {} } }), null);
  assert.deepEqual(calls, []);
});

test('two PSP waterfalls share the alias registry keyed by realObj', async () => {
  const order = [];
  const slot = createSlot();
  const realPbjs = createRealPbjs(order, slot);
  const window = { pbjs: { __ctrl: { baseObj: { que: [], requestBids() {} }, realObj: realPbjs } } };
  const { Manager, Waterfall } = loadRuntime(window);
  const manager = createManager(Manager);
  const first = createWaterfall(Waterfall, manager, slot);
  const second = createWaterfall(Waterfall, manager, slot);
  assert.deepEqual(await Promise.all([
    first.ensurePrebidAliasesRegistered(realPbjs),
    second.ensurePrebidAliasesRegistered(realPbjs),
  ]), [true, true]);
  assert.equal(order.filter((event) => event === 'aliasBidder').length, 1);
});

function createRealAps(order, slot) {
  return {
    fetchBids(_configuration, callback) { order.push('fetchBids'); callback([{ price: 1.1 }]); },
    setDisplayBids() { order.push('setDisplayBids'); slot.setTargeting('amznbid', 'aps-p2'); },
    targetingKeys() { return { 'gexp-intext': { amznbid: 'aps-p2' } }; },
  };
}

test('normal and PSP APS use one real instance and preserve amzn targeting', async () => {
  for (const psp of [false, true]) {
    const order = [];
    const slot = createSlot();
    const realAps = createRealAps(order, slot);
    const forbidden = [];
    const proxy = {
      fetchBids() { forbidden.push('proxy.fetchBids'); },
      setDisplayBids() { forbidden.push('proxy.setDisplayBids'); },
      __ctrl: {
        baseObj: {
          fetchBids() { forbidden.push('base.fetchBids'); },
          setDisplayBids() { forbidden.push('base.setDisplayBids'); },
          _Q: [],
        },
        realObj: realAps,
      },
    };
    const window = { gexpIntextDebug: true, apstag: psp ? proxy : realAps };
    const { Manager, Waterfall } = loadRuntime(window);
    const waterfall = createWaterfall(Waterfall, createManager(Manager), slot, null);
    assert.equal(await waterfall.executeAmazonTam({ slots: [{ slotID: 'gexp-intext' }] }), 'tam_done');
    assert.deepEqual(order, ['fetchBids', 'setDisplayBids']);
    assert.deepEqual(forbidden, []);
    assert.equal(slot.getTargetingMap().amznbid[0], 'aps-p2');
  }
});

test('PSP APS waits for late realObj within its safety budget', async () => {
  const order = [];
  const slot = createSlot();
  const realAps = createRealAps(order, slot);
  const baseCalls = [];
  const window = { apstag: { __ctrl: { baseObj: { fetchBids() { baseCalls.push('fetchBids'); }, setDisplayBids() {}, _Q: [] } } } };
  const { Manager, Waterfall } = loadRuntime(window);
  const waterfall = createWaterfall(Waterfall, createManager(Manager), slot, null);
  setTimeout(() => { window.apstag.__ctrl.realObj = realAps; }, 5);
  assert.equal(await waterfall.executeAmazonTam({ slots: [{ slotID: 'gexp-intext' }] }), 'tam_done');
  assert.deepEqual(order, ['fetchBids', 'setDisplayBids']);
  assert.deepEqual(baseCalls, []);
});

test('PSP APS without realObj resolves at the safety timeout without functional calls', async () => {
  const calls = [];
  const window = {
    apstag: {
      fetchBids() { calls.push('proxy'); },
      __ctrl: { baseObj: { fetchBids() { calls.push('base'); }, setDisplayBids() {}, _Q: [] } },
    },
  };
  const { Manager, Waterfall } = loadRuntime(window);
  const waterfall = createWaterfall(Waterfall, createManager(Manager), createSlot(), null);
  assert.equal(await waterfall.executeAmazonTam({ slots: [{ slotID: 'gexp-intext' }] }), 'tam_timeout');
  assert.deepEqual(calls, []);
});

test('APS absent keeps the legacy immediate controlled skip', async () => {
  const window = {};
  const { Manager, Waterfall } = loadRuntime(window);
  const waterfall = createWaterfall(Waterfall, createManager(Manager), createSlot(), null);
  assert.equal(await waterfall.executeAmazonTam({ slots: [{ slotID: 'gexp-intext' }] }), null);
});

test('integrated PSP runtime routes Prebid, APS and GPT to their distinct real APIs', async () => {
  const order = [];
  const slot = createSlot();
  const realPbjs = createRealPbjs(order, slot);
  const realAps = createRealAps(order, slot);
  const realPubads = {
    getSlots: () => [slot],
    addEventListener() {},
    removeEventListener() {},
    refresh() { order.push('realGpt.refresh'); },
  };
  const realGpt = {
    apiReady: true,
    pubadsReady: true,
    defineSlot() { order.push('realGpt.defineSlot'); return slot; },
    pubads() { return realPubads; },
    display() { order.push('realGpt.display'); },
    destroySlots() { return true; },
  };
  const forbidden = () => { throw new Error('PSP proxy/baseObj must not receive functional calls'); };
  const gptProxy = {
    cmd: { push(callback, force) { order.push(`gpt.cmd:${force === true}`); callback(); } },
    defineSlot: forbidden,
    pubads: forbidden,
    display: forbidden,
    __ctrl: { baseObject: realGpt },
  };
  const window = {
    googletag: gptProxy,
    pbjs: {
      requestBids: forbidden,
      __ctrl: { baseObj: { que: [], requestBids: forbidden }, realObj: realPbjs },
    },
    apstag: {
      fetchBids: forbidden,
      setDisplayBids: forbidden,
      __ctrl: { baseObj: { fetchBids: forbidden, setDisplayBids: forbidden, _Q: [] }, realObj: realAps },
    },
  };
  const { Manager, Waterfall } = loadRuntime(window);
  const manager = createManager(Manager);
  manager.runIntextGptCommand = Manager.prototype.runIntextGptCommand.bind(manager);
  const waterfall = createWaterfall(Waterfall, manager, slot);
  await waterfall.executePrebid({ code: 'gexp-intext', mediaTypes: { banner: {} } });
  manager.resolveIntextRequestNetworkId = () => '99071977';
  manager.resolveIntextDisplayAdUnitPath = () => 'test/n';
  waterfall.node.config = { display: { sizes: [[300, 250]] } };
  waterfall.node.slot = null;
  assert.equal((await waterfall.node.ensureIntextDisplayGptSlot(1)).ready, true);
  await waterfall.executeAmazonTam({ slots: [{ slotID: 'gexp-intext' }] });
  const gptResult = await manager.runIntextGptCommand((gpt) => {
    gpt.display('gexp-intext');
    gpt.pubads().refresh([slot]);
  });
  assert.equal(gptResult.executed, true);
  assert.ok(order.indexOf('aliasBidder') < order.indexOf('addAdUnits'));
  assert.ok(order.indexOf('addAdUnits') < order.indexOf('requestBids'));
  assert.ok(order.indexOf('requestBids') < order.indexOf('fetchBids'));
  assert.ok(order.indexOf('realGpt.defineSlot') < order.indexOf('setDisplayBids'));
  assert.equal(order.filter((operation) => operation === 'realGpt.defineSlot').length, 1);
  assert.ok(order.includes('gpt.cmd:true'));
  assert.ok(order.includes('realGpt.display'));
  assert.ok(order.includes('realGpt.refresh'));
});

test('core direct references are limited to resolver detection and diagnostics', () => {
  const manager = between(source, 'class IntextManager', 'class IntextPlacementEngine');
  const waterfall = between(source, 'class IntextWaterfall', 'class IntextVideoCreative');
  assert.equal((manager.match(/window\.pbjs/g) || []).length, 2);
  assert.equal((manager.match(/window\.apstag/g) || []).length, 2);
  assert.doesNotMatch(waterfall, /window\.(?:pbjs|apstag)/);
  assert.doesNotMatch(waterfall, /__ctrl\.baseObj/);
});

test('waitForPbjsAvailability contains no accidental scoped-context references', () => {
  const waterfall = between(source, 'class IntextWaterfall', 'class IntextVideoCreative');
  const waitForAvailability = between(
    waterfall,
    '  waitForPbjsAvailability(configuration) {',
    '  waitForPrebidGlobalInitFlag(configuration) {',
  );
  assert.doesNotMatch(waitForAvailability, /scopedContext|rootElement|Object\.defineProperty/);
});
