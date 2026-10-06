const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, '_gam_kv_.js'), 'utf8');
const gptFixture = fs.readFileSync(path.join(__dirname, 'intext-gpt-psp.audit.test.cjs'), 'utf8');
const { between, createRuntime, createDisplayNode } = new Function('source', 'vm', 'assert',
  gptFixture.slice(gptFixture.indexOf('function between('), gptFixture.indexOf("test('normal GPT")) +
  '; return { between, createRuntime, createDisplayNode };')(source, vm, assert);
const plain = value => JSON.parse(JSON.stringify(value));
const bid = (bidderCode, cpm, hbPb, extra = {}) => ({
  bidderCode, cpm, currency: 'USD', mediaType: 'banner', auctionId: 'auction-1',
  adId: `ad-${bidderCode}`, width: 300, height: 250,
  pbMg: '0.10', pbAg: '0.20', pbLg: '0.00', pbDg: '0.25',
  adserverTargeting: { hb_pb: hbPb, hb_bidder: bidderCode, hb_adid: `ad-${bidderCode}` }, ...extra,
});

function setup({ bids = [], floor = 0.30, debug = true, psp = false, implementation = source,
  floors = null, mode = 'display_only', getEvents = null } = {}) {
  const runtime = createRuntime({ psp });
  runtime.window.gexpIntextDebug = debug;
  const logs = [], operations = [], refreshSnapshots = [];
  const context = vm.createContext({ window: runtime.window, document: runtime.window.document,
    console, Promise, Object, Array, Set, Map, WeakMap, String, Number, Boolean, Date, Math, JSON,
    URL, URLSearchParams, setTimeout, clearTimeout, WindowArray: {},
    INTEXT_RANDOM_KEYS: ['random1', 'random2', 'random3', 'random4'],
    logIntext: (...args) => { if (debug) logs.push(args); }, warnIntext: (...args) => logs.push(args), errorIntext() {},
    intextDebugCollector: { recordTimeline() {}, recordMetric() {} },
  });
  const Manager = vm.runInContext(`${between(implementation, 'class IntextManager', 'class IntextPlacementEngine')}; IntextManager`, context);
  const Node = vm.runInContext(`${between(implementation, 'class IntextNode', 'class IntextContainer')}; IntextNode`, context);
  const Waterfall = vm.runInContext(`const intextPrebidAliasRegistry = new WeakMap();
    ${between(implementation, 'class IntextWaterfall', 'class IntextVideoCreative')}; IntextWaterfall`, context);
  const manager = Object.create(Manager.prototype);
  const node = createDisplayNode(Node, manager, runtime);
  Object.setPrototypeOf(node, Node.prototype);
  node.slot = runtime.realSlot;
  node._slotGptApi = manager.resolveIntextGptApi().api;
  node._slotGptSource = manager.resolveIntextGptApi().source;
  node._slotPubadsService = runtime.realPubads;
  node._intextTelemetryCycleId = 7;
  node.showDisplay = async () => true;
  node.discardDisplay = () => {};
  for (const name of ['applyDisplayBidTargeting', 'applyDisplayRequestTargeting', 'clearDisplayRequestTargeting',
    'getSlotTargetingMapSafe', 'getSlotTargetingValueSafe', 'getDisplayGamRequestTargetingFinal',
    'pickHbTargeting', 'collectHbTargetingFromCurrentBids', 'collectHbTargetingFromBid', 'normalizeHbValue',
    'getBidderSuffixFromBid', 'normalizeIntextBidderCodeForGam', 'getBidSize']) node[name] = Node.prototype[name];
  node.slot.setTargeting('gexp_floor', '0.30');
  manager.gexp.request = slot => { operations.push(['gexp.request']); slot.setTargeting('gexp_floor', '0.30'); };
  const originalRefresh = runtime.realPubads.refresh;
  runtime.realPubads.refresh = slots => {
    refreshSnapshots.push(plain(slots[0].getTargetingMap()));
    operations.push(['refresh']); originalRefresh(slots);
  };
  let floorConfig = floors;
  const pb = {
    adUnits: [], que: { push: fn => fn() },
    markWinningBidAsUsed: opts => operations.push(['markWinningBidAsUsed', plain(opts)]),
    removeAdUnit: code => { operations.push(['removeAdUnit', code]); pb.adUnits = []; },
    addAdUnits: units => { operations.push(['addAdUnits', plain(units)]); pb.adUnits = units; },
    setConfig: config => { operations.push(['setConfig', plain(config)]); floorConfig = config.floors; },
    getConfig: key => key === 'floors' ? floorConfig : {},
    requestBids: opts => {
      operations.push(['requestBids', { timeout: opts.timeout, adUnitCodes: plain(opts.adUnitCodes) }]);
      opts.bidsBackHandler({}, false, 'auction-1');
    },
    getBidResponsesForAdUnitCode: () => ({ bids }), getNoBids: () => [],
    setTargetingForGPTAsync: codes => operations.push(['setTargetingForGPTAsync', plain(codes)]),
  };
  if (getEvents) pb.getEvents = getEvents;
  runtime.window.pbjs = psp ? { __ctrl: { realObj: pb, baseObj: { que: [] } } } : pb;
  const waterfall = Object.create(Waterfall.prototype);
  Object.assign(waterfall, { node, config: { prebid: { graceMs: 0 }, decision: { minCpm: 1 } },
    _effectiveMode: mode, wa: { effectivePrice: floor }, lastTrigger: 'audit-test' });
  node.waterfall = waterfall;
  waterfall.waitForPbjsAvailability = async () => true;
  waterfall.waitForPrebidGlobalInitFlag = async () => true;
  waterfall.ensurePrebidAliasesRegistered = async () => true;
  waterfall.getPrebidTimeout = () => 10;
  const unit = { code: node.id, mediaTypes: { banner: { sizes: [[300, 250]] } }, bids: [{ bidder: 'pubstack_server', params: {} }] };
  const events = name => logs.filter(args => String(args[0]).endsWith(` ${name}`)).map(args => plain(args[1]));
  const auction = async () => { await waterfall.executePrebid(unit); return waterfall.decideWinner({ commit: false }); };
  return { ...runtime, node, waterfall, pb, unit, bids, logs, events, operations, refreshSnapshots, auction, context, Node, manager };
}

for (const [name, cpm, hbPb, above, violations] of [
  ['above floor', 0.42, '0.40', true, 0],
  ['valid CPM with bucket below floor', 0.319, '0.25', true, 0],
  ['raw CPM below floor', 0.0578, '0.05', false, 1],
]) test(`${name}: auction, actual selection, targeting and GAM refresh`, async () => {
  const r = setup({ bids: [bid('pubstack_server', cpm, hbPb)] });
  const decision = await r.auction();
  assert.equal(decision.displayBid, r.bids[0]);
  assert.equal(decision.winner, 'display');
  const winner = r.events('intext_prebid_winner_audit')[0];
  assert.equal(winner.rawCpm, cpm);
  assert.equal(winner.hbPb, hbPb);
  assert.equal(winner.rawCpmAboveFloor, above);
  assert.equal(winner.selectionSource, 'decideWinner:getBidResponsesForAdUnitCode:sort-cpm-desc');
  assert.equal(r.events('intext_prebid_floor_violation_candidate').length, violations);
  const rendered = await r.node.askDisplay(decision.displayBid, 1, 'display_only');
  assert.equal(rendered.filled, true, JSON.stringify({ rendered, errors: r.logs.filter(args => String(args[0]).includes('failed')) }));
  const targeting = r.events('intext_prebid_winner_targeting_audit')[0];
  const gam = r.events('display_gam_request_targeting_final')[0];
  assert.equal(targeting.auditId, winner.auditId);
  assert.equal(gam.prebidAuditId, winner.auditId);
  assert.equal(targeting.hb_pb, hbPb);
  assert.equal(gam.winnerRawCpm, cpm);
  assert.equal(gam.hb_pb, hbPb);
  assert.deepEqual(r.refreshSnapshots[0].hb_pb, [hbPb]);
  assert.deepEqual(r.refreshSnapshots[0].hb_bidder, ['pubstack_server']);
  assert.equal(r.refreshSnapshots[0].prebidAuditId, undefined);
  assert.equal(r.events('display_hb_targeting_built')[0].prebidAuditId, winner.auditId);
});

test('all bidders are recorded and current implementation picks highest raw CPM', async () => {
  const r = setup({ bids: [bid('A', 0.12, '0.10'), bid('B', 0.31, '0.30'), bid('C', 0.48, '0.45')] });
  assert.equal((await r.auction()).displayBid.bidderCode, 'C');
  const all = r.events('intext_prebid_floor_bids_audit')[0];
  assert.deepEqual(all.bids.map(b => b.rawCpm), [0.12, 0.31, 0.48]);
  assert.deepEqual(all.bids.map(b => b.rawCpmAboveFloor), [false, true, true]);
  assert.equal(all.bidCount, 3);
  assert.equal(all.aboveFloorBidCount, 2);
});

test('all bids below floor remain eligible; exactly one violation candidate', async () => {
  const r = setup({ bids: [bid('A', 0.05, '0.05'), bid('B', 0.18, '0.15')] });
  assert.equal((await r.auction()).displayBid.bidderCode, 'B');
  const all = r.events('intext_prebid_floor_bids_audit')[0];
  assert.equal(all.bidCount, 2); assert.equal(all.aboveFloorBidCount, 0); assert.equal(all.belowFloorBidCount, 2);
  assert.equal(r.events('intext_prebid_floor_violation_candidate').length, 1);
});

test('raw CPM, each price bucket, hb_pb and module floor data remain separate', async () => {
  const floorData = { floorValue: 0.02, floorCurrency: 'USD', floorRule: '*|banner',
    floorRuleValue: 0.02, cpmAfterAdjustments: 0.0578, enforcements: { enforceJS: false } };
  const r = setup({ bids: [bid('A', 0.0578, '0.05', { floorData })] });
  await r.auction();
  const b = r.events('intext_prebid_floor_bids_audit')[0].bids[0];
  assert.equal(b.rawCpm, 0.0578); assert.equal(b.hbPb, '0.05');
  assert.deepEqual(b.priceBucket, { pbMg: '0.10', pbAg: '0.20', pbLg: '0.00', pbDg: '0.25' });
  assert.equal(b.effectiveFloor, 0.30); assert.equal(b.applicableFloor, 0.02);
  assert.equal(b.aboveFloor, true); assert.equal(b.rawCpmAboveFloor, false);
  assert.deepEqual(b.prebidFloorData, floorData);
});

for (const floor of [null, undefined, 0, 'bad', '0.30garbage', Infinity, -1]) test(`invalid/missing GEXP floor ${String(floor)} does not become zero`, async () => {
  const r = setup({ bids: [bid('A', 0.0578, '0.05')], floor: floor === undefined ? null : floor });
  await r.auction();
  assert.equal(r.events('intext_prebid_floor_audit_start')[0].effectiveFloor, null);
  assert.equal(r.events('intext_prebid_winner_audit')[0].rawCpmAboveFloor, null);
  assert.equal(r.events('intext_prebid_floor_violation_candidate').length, 0);
});

for (const currency of [undefined, 'EUR']) test(`unconfirmed currency ${currency} does not produce a violation`, async () => {
  const r = setup({ bids: [bid('A', 0.0578, '0.05', { currency })] });
  await r.auction();
  assert.equal(r.events('intext_prebid_winner_audit')[0].rawCpmAboveFloor, null);
  assert.equal(r.events('intext_prebid_floor_violation_candidate').length, 0);
});

test('inherited size/bidder schema is recorded without claiming the GEXP key matches', async () => {
  const r = setup({ bids: [bid('A', 0.0578, '0.05')], floors: { enforcement: { enforceJS: false },
    data: { currency: 'USD', schema: { fields: ['adUnitCode', 'mediaType', 'size', 'bidder'] }, values: { '*|banner|300x250|A': 0.15 } } } });
  await r.auction();
  assert.equal(r.events('intext_prebid_winner_audit')[0].rawCpmAboveFloor, null);
  assert.deepEqual(r.events('intext_prebid_floor_request_snapshot')[0].floorsConfig.sent.schema.fields,
    ['adUnitCode', 'mediaType', 'size', 'bidder']);
});

test('no bids differs from returned bids without a selected Display winner', async () => {
  const empty = setup(); await empty.auction();
  assert.equal(empty.events('intext_prebid_floor_bids_audit')[0].bidCount, 0);
  assert.equal(empty.events('intext_prebid_no_winner_audit')[0].bidCount, 0);
  const unselected = setup({ bids: [bid('A', 0.42, '0.40')], mode: 'video_only' });
  assert.equal((await unselected.auction()).displayBid, null);
  assert.equal(unselected.events('intext_prebid_no_winner_audit')[0].bidCount, 1);
  assert.equal(unselected.events('intext_prebid_no_winner_audit')[0].aboveFloorBidCount, 1);
});

test('diagnostic events are deduped and new auctions have new audit IDs', async () => {
  const r = setup({ bids: [bid('A', 0.0578, '0.05')] });
  await r.auction();
  r.waterfall.decideWinner({ commit: false });
  r.node.applyDisplayBidTargeting(r.node.slot, r.bids[0], r.bids);
  r.node.applyDisplayBidTargeting(r.node.slot, r.bids[0], r.bids);
  for (const event of ['floor_audit_start', 'floor_request_snapshot', 'floor_bids_audit', 'winner_audit', 'winner_targeting_audit', 'floor_violation_candidate']) {
    assert.equal(r.events(`intext_prebid_${event}`).length, 1, event);
  }
  const firstId = r.events('intext_prebid_floor_audit_start')[0].auditId;
  await r.auction();
  assert.notEqual(r.events('intext_prebid_floor_audit_start')[1].auditId, firstId);
});

test('snapshot preserves request fields and observes runtime getFloor without invoking it', async () => {
  let getFloorCalls = 0;
  const r = setup({ bids: [bid('A', 0.42, '0.40')], getEvents: () => [{ eventType: 'bidRequested', args: {
    auctionId: 'auction-1', floorData: { skipped: true, location: 'setConfig', skipRate: 100 },
    bids: [{ bidder: 'A', adUnitCode: 'gexp-intext', getFloor: () => { getFloorCalls++; }, params: { bidfloor: 0.30 } },
      { bidder: 'other', adUnitCode: 'normal-slot' }],
  } }] });
  r.unit.ortb2Imp = { bidfloor: 0.30, bidfloorcur: 'USD', ext: { prebid: { floors: { floorMin: 0.20 } } } };
  r.unit.bids[0].params = { bidfloor: 0.30, secret: 'not logged' };
  await r.auction();
  const start = r.events('intext_prebid_floor_audit_start')[0];
  assert.equal(start.floorSource, 'effectivePrice'); assert.equal(start.gexpFloor, '0.30');
  assert.equal(start.cycleId, 7); assert.equal(start.renderToken, 1);
  const request = r.events('intext_prebid_floor_request_snapshot')[0];
  assert.equal(request.floorFields.ortb2Imp.bidfloor, 0.30);
  assert.equal(request.floorsConfig.sent.values['gexp-intext|banner'], 0.30);
  assert.equal(request.floorsConfig.acceptedState, 'accepted');
  assert.equal(JSON.stringify(request).includes('not logged'), false);
  const evidence = r.events('intext_prebid_floor_bids_audit')[0].requestEvidence;
  assert.equal(evidence.length, 1); assert.equal(evidence[0].getFloorAvailable, true);
  assert.equal(evidence[0].floorFields.floorData.skipped, true);
  assert.equal(getFloorCalls, 0);
});

test('cached winner retains original floor and identifies both audits in compare mode', async () => {
  const r = setup({ bids: [bid('old', 0.42, '0.40')] });
  await r.auction();
  const originId = r.events('intext_prebid_winner_audit')[0].auditId;
  const cached = r.bids[0];
  r.bids.splice(0, 1, bid('new', 0.12, '0.10'));
  r.waterfall.wa.effectivePrice = 0.50;
  r.waterfall._cachedBidsForDecision = { banner: [cached], video: [], ageMs: 1 };
  r.waterfall.config.refreshCycle = { bidStrategy: 'compare' };
  const result = await r.auction();
  assert.equal(result.displayBid, cached);
  const winner = r.events('intext_prebid_winner_audit')[1];
  assert.equal(winner.selectionSource, 'decideWinner:cached-bid');
  assert.equal(winner.originAuditId, originId); assert.equal(winner.effectiveFloor, 0.30);
  assert.equal(winner.requestedFloor, 0.50); assert.equal(winner.rawCpmAboveFloor, true);
  assert.equal(r.events('intext_prebid_floor_violation_candidate').length, 0);
});

test('diagnostics enabled/disabled preserve requests, winner, targeting and refresh', async () => {
  for (const psp of [false, true]) {
    const results = [];
    for (const debug of [false, true]) {
      const r = setup({ psp, debug, bids: [bid('A', 0.0578, '0.05'), bid('B', 0.04, '0.00')] });
      const decision = await r.auction();
      await r.node.askDisplay(decision.displayBid, 1, 'display_only');
      results.push({ operations: r.operations, snapshots: r.refreshSnapshots, winner: decision.displayBid.adId });
      if (!debug) assert.equal(r.events('intext_prebid_floor_audit_start').length, 0);
    }
    assert.deepEqual(results[0], results[1]);
  }
});

test('pre-audit baseline and instrumented implementation preserve functional behavior and scope', async () => {
  const baseline = process.env.INTEXT_FLOOR_AUDIT_BASELINE
    ? fs.readFileSync(process.env.INTEXT_FLOOR_AUDIT_BASELINE, 'utf8')
    : execFileSync('git', ['show', 'HEAD:src/pro/_gam_kv_.js'], { cwd: root, encoding: 'utf8', maxBuffer: 5e6 });
  const results = [];
  for (const implementation of [baseline, source]) {
    const r = setup({ implementation, bids: [bid('A', 0.0578, '0.05')] });
    const decision = await r.auction();
    await r.node.askDisplay(decision.displayBid, 1, 'display_only');
    results.push({ operations: r.operations, snapshots: r.refreshSnapshots, winner: decision.displayBid.adId });
  }
  assert.deepEqual(results[0], results[1]);
  assert.equal(source.slice(0, source.indexOf('const GEXP_INTEXT_VERSION')).replace(/\r\n/g, '\n'), baseline.slice(0, baseline.indexOf('const GEXP_INTEXT_VERSION')).replace(/\r\n/g, '\n'));
  assert.equal(source.slice(source.indexOf('class WPromise')).replace(/\r\n/g, '\n'), baseline.slice(baseline.indexOf('class WPromise')).replace(/\r\n/g, '\n'));
});

for (const [expectedSource, wa] of [
  ['effectivePrice', { effectivePrice: 0.30, state: { lastPrice: 0.50 } }],
  ['lastPrice', { state: { lastPrice: 0.30, windowStart: 1 }, array: [0.1, 0.50] }],
  ['windowStart', { state: { windowStart: 1 }, array: [0.1, 0.30] }],
  ['initial', { pCfg: { p: 0 }, array: [0.1, 0.30] }],
]) test(`GEXP source ${expectedSource} is captured from the actual existing floor resolution`, async () => {
  const r = setup({ bids: [bid('A', 0.42, '0.40')] });
  r.waterfall.wa = wa;
  await r.auction();
  const start = r.events('intext_prebid_floor_audit_start')[0];
  assert.equal(start.effectiveFloor, 0.30); assert.equal(start.floorSource, expectedSource);
  const writes = r.operations.filter(op => op[0] === 'setConfig');
  assert.equal(writes.length, 1); assert.equal(writes[0][1].floors.data.values['gexp-intext|banner'], 0.30);
});

test('initial pivot is called exactly once; slot gexp_floor is observed independently', async () => {
  const r = setup({ bids: [bid('A', 0.42, '0.40')] });
  let pivotCalls = 0;
  r.waterfall.wa = { cI: { adUnit: 'test' }, array: [0.1, 0.30], gexp: { getPivotIndex: () => { pivotCalls++; return 1; } } };
  r.node.slot.setTargeting('gexp_floor', '0.90');
  await r.auction();
  assert.equal(pivotCalls, 1);
  const start = r.events('intext_prebid_floor_audit_start')[0];
  assert.equal(start.gexpFloor, '0.90'); assert.equal(start.effectiveFloor, 0.30);
});

test('the existing WindowArray and fallback floor configuration sources are observed without altering them', async () => {
  for (const sourceName of ['windowarray', 'fallback']) {
    const r = setup({ bids: [bid('A', 0.42, '0.40')] });
    if (sourceName === 'windowarray') vm.runInContext(`WindowArray.pbFloorCfg = { floors: { data: {
      currency: 'USD', schema: { delimiter: '|', fields: ['adUnitCode', 'mediaType'] }, values: { 'normal-slot|banner': 0.8 }
    } } };`, r.context);
    await r.auction();
    const config = r.events('intext_prebid_floor_request_snapshot')[0].floorsConfig;
    assert.equal(config.beforeSet.source, sourceName);
    if (sourceName === 'windowarray') assert.equal(r.operations.find(op => op[0] === 'setConfig')[1].floors.data.values['normal-slot|banner'], 0.8);
  }
});

test('cached bid without a captured origin is never compared to the fresh auction floor', async () => {
  const r = setup({ bids: [bid('new', 0.04, '0.00')] });
  r.waterfall._cachedBidsForDecision = { banner: [bid('old', 0.0578, '0.05')], video: [], ageMs: 1 };
  r.waterfall.config.refreshCycle = { bidStrategy: 'compare' };
  await r.auction();
  const winner = r.events('intext_prebid_winner_audit')[0];
  assert.equal(winner.effectiveFloor, null); assert.equal(winner.rawCpmAboveFloor, null);
  assert.equal(winner.floorSource, 'cached-origin-unavailable');
  assert.equal(r.events('intext_prebid_floor_violation_candidate').length, 0);
});

test('duplicate callback cannot duplicate auction diagnostics', async () => {
  const r = setup({ bids: [bid('A', 0.0578, '0.05')] });
  r.pb.requestBids = ({ bidsBackHandler }) => { bidsBackHandler({}, false, 'auction-1'); bidsBackHandler({}, false, 'auction-1'); };
  await r.auction();
  assert.equal(r.events('intext_prebid_floor_bids_audit').length, 1);
  assert.equal(r.events('intext_prebid_winner_audit').length, 1);
  assert.equal(r.events('intext_prebid_floor_violation_candidate').length, 1);
});

function attachExistingGexp(r, { configuredEnabled = true, runtimeEnabled = true, random1 = '5', floor = 0.30 } = {}) {
  // Execute the existing GEXP/WindowArray methods, without constructing global owners.
  r.context.localStorage = { getItem: () => null, setItem() {} };
  r.context.googletag = r.window.googletag;
  const Gexp = vm.runInContext(`${between(source, 'class GAMExp', 'let _gam_exp = new GAMExp()')}; GAMExp`, r.context);
  const Window = vm.runInContext(`${between(source, 'class WindowArray', 'const GEXP_INTEXT_VERSION')}; WindowArray`, r.context);
  const gexp = Object.create(Gexp.prototype);
  Object.assign(gexp, { cfg: { enabled: configuredEnabled }, enabled: runtimeEnabled, initialized: true,
    errored: false, dualMode: Boolean(r.window.googletag.__ctrl), random1,
    statsG: { telp: false, telId: 'test', dailyStorageInstance: { get: () => 0 } },
    getRandom: index => index === 1 ? random1 : '1', save() {}, getExpectedViewability: () => 1,
    isHouse: () => false, isAdex: () => false, isReloadAllowed: () => false,
    reportError: error => { throw error; },
  });
  const wa = Object.create(Window.prototype);
  Object.assign(wa, { gexp, slot: r.node.slot, pCfg: { umu: 0 }, kPrefix: 'gexp_', tKeys: {},
    state: { date: 'test', windowStart: 1, lastPrice: floor, lastPriceIndex: 1, nFloorChanges: 0 },
    array: [0.05, floor], effectivePrice: floor, effectivePriceIndex: 1,
    newImpression() { this.cI = {}; }, getSlotOffset: () => null, today: () => 'test',
    checkPrebid: () => ({ rndp: '-1' }), getRandom: index => gexp.getRandom(index),
    getNextPrice() {}, getCookie: () => null,
  });
  gexp.windows = { [r.node.id]: wa };
  gexp.getWindowFromSlot = () => wa;
  r.manager.gexp = gexp;
  r.manager.getIntextRandomValue = () => null;
  r.manager.getPageCustomTargeting = () => ({});
  r.node.resolveDisplayRequestTargeting = r.Node.prototype.resolveDisplayRequestTargeting;
  r.node.slot.setTargeting('p', r.node.id);
  r.node.slot.clearTargeting('gexp_floor');
  r.node.slot.updateTargetingFromMap = map => { for (const [key, value] of Object.entries(map)) r.node.slot.setTargeting(key, value); };
  r.node.wa = wa;
  r.waterfall.wa = wa;
  return { gexp, wa };
}

for (const [name, extra, policy, expected, count] of [
  ['dealId without policy', { dealId: 'ABC' }, {}, 'deal-enforcement-unknown', 0],
  ['hb_deal without policy', { adserverTargeting: { hb_deal: 'ABC', hb_source: 's2s', hb_pb: '0.05' } }, {}, 'deal-enforcement-unknown', 0],
  ['observed exempt deal', { dealId: 'ABC' }, { floorDeals: false }, 'deal-exempt-observed', 0],
  ['confirmed enforced deal', { dealId: 'ABC' }, { floorDeals: true, enforceJS: true }, 'below-floor', 1],
  ['floorDeals explicitly true with other settings unknown', { dealId: 'ABC' }, { floorDeals: true }, 'below-floor', 1],
  ['bid-specific confirmed deal policy', { dealId: 'ABC', floorData: { enforcements: { floorDeals: true } } }, {}, 'below-floor', 1],
  ['no-deal comparable CPM', {}, {}, 'below-floor', 1],
  ['enforcement disabled', {}, { enforceJS: false, enforcePBS: false }, 'floor-enforcement-unknown', 0],
  ['bid-specific exemption', { dealId: 'ABC', floorData: { enforcements: { floorDeals: false } } }, { floorDeals: true }, 'deal-exempt-observed', 0],
  ['floor module skipped', { dealId: 'ABC', floorData: { skipped: true } }, { floorDeals: true }, 'floor-enforcement-unknown', 0],
]) test(`deal-aware diagnosis: ${name}`, async () => {
  const r = setup({ bids: [bid('pubstack_server', 0.0578, '0.05', extra)], floors: {
    enforcement: policy, data: { currency: 'USD', schema: { delimiter: '|', fields: ['adUnitCode', 'mediaType'] }, values: {} },
  } });
  const winner = (await r.auction()).displayBid;
  assert.equal(winner, r.bids[0]);
  const record = r.events('intext_prebid_winner_audit')[0];
  assert.equal(record.floorComparisonStatus, expected);
  assert.equal(record.rawCpmAboveFloor, false);
  assert.equal(r.events('intext_prebid_floor_violation_candidate').length, count);
  if (record.isDeal) assert.equal(record.dealId, 'ABC');
  if (extra.adserverTargeting) { assert.equal(record.hbDeal, 'ABC'); assert.equal(record.hbSource, 's2s'); }
  if (count) {
    const violation = r.events('intext_prebid_floor_violation_candidate')[0];
    assert.equal(violation.floorComparisonStatus, 'below-floor'); assert.equal(violation.isDeal, record.isDeal);
  }
});

test('scoped hb_deal is preserved as observed evidence without inventing a policy', async () => {
  const r = setup({ bids: [bid('A', 0.0578, '0.05', { adserverTargeting: { hb_deal_A: ['scoped-deal'], hb_pb: '0.05' } })] });
  await r.auction();
  const b = r.events('intext_prebid_floor_bids_audit')[0].bids[0];
  assert.equal(b.dealId, 'scoped-deal'); assert.equal(b.hbDeal, null); assert.equal(b.isDeal, true);
  assert.equal(b.floorDealsObserved, null); assert.equal(b.floorEnforcementStatus, 'unknown');
  assert.equal(b.floorComparisonStatus, 'deal-enforcement-unknown');
  assert.equal(r.events('intext_prebid_floor_violation_candidate').length, 0);
});

test('enforcement observations cannot be inferred from sent payload or Prebid defaults', async () => {
  const r = setup({ bids: [bid('A', 0.0578, '0.05', { dealId: 'ABC' })] });
  const getConfig = r.pb.getConfig;
  r.pb.getConfig = key => { const result = getConfig(key); return result ? { ...result, enforcement: undefined } : result; };
  await r.auction();
  const config = r.events('intext_prebid_floor_request_snapshot')[0].floorsConfig.observedAfterSet;
  assert.deepEqual(config.enforcement, { enforceJS: null, enforcePBS: null, floorDeals: null, bidAdjustment: null });
  assert.equal(config.skipRate, null); assert.equal(config.floorMin, null);
  assert.equal(r.events('intext_prebid_winner_audit')[0].floorDealsObserved, null);
});

for (const site of ['Marca', 'Mundo', 'Telva', 'Expansión']) {
  for (const psp of [false, true]) test(`GEXP real gates + propagation: ${site}, ${psp ? 'PSP/dual' : 'legacy'}`, async () => {
    const r = setup({ psp, bids: [bid('A', 0.42, '0.40')] });
    const { wa, gexp } = attachExistingGexp(r);
    assert.equal(gexp.isEnabled(), true);
    const decision = await r.auction();
    try {
      const result = await r.node.askDisplay(decision.displayBid, 1, 'display_only');
      assert.equal(result.filled, true, JSON.stringify({ result, logs: r.logs.slice(-5) }));
      const before = r.events('intext_gexp_floor_before_request')[0];
      const after = r.events('intext_gexp_floor_after_request')[0];
      const propagation = r.events('intext_gexp_floor_propagation_audit')[0];
      assert.equal(before.gexpEnabled, true); assert.equal(before.gexpEnabledType, 'boolean');
      assert.equal(before.dualMode, psp); assert.equal(after.slotGexpFloor, '0.3');
      assert.equal(propagation.status, 'propagated'); assert.equal(propagation.prebidEffectiveFloor, 0.30);
      assert.equal(propagation.afterClear, null); assert.equal(propagation.afterReapply, '0.3');
      assert.equal(propagation.beforeRefresh, '0.3');
      assert.equal(r.events('display_gam_request_targeting_final')[0].gexpEffectivePrice, 0.30);
      assert.deepEqual(r.refreshSnapshots[0].gexp_floor, ['0.3']);
    } finally { clearTimeout(wa.loadWatchdog); }
  });
}

for (const [name, options, status, enabled] of [
  ['configuration disables pricing', { configuredEnabled: false }, 'not-produced-gexp-config-disabled', false],
  ['runtime disabled with isEnabled true', { runtimeEnabled: false }, 'not-produced-gexp-runtime-disabled', true],
  ['GEXP random1 19 excludes floor', { random1: '19' }, 'not-produced-test-random-19', true],
]) test(`GEXP absence diagnosed without repair: ${name}`, async () => {
  const r = setup({ psp: true, bids: [bid('A', 0.0578, '0.05', { dealId: 'ABC' })] });
  const { wa, gexp } = attachExistingGexp(r, options);
  assert.equal(gexp.isEnabled(), enabled);
  const decision = await r.auction();
  try {
    const result = await r.node.askDisplay(decision.displayBid, 1, 'display_only');
    assert.equal(result.filled, true);
    const propagation = r.events('intext_gexp_floor_propagation_audit')[0];
    assert.equal(propagation.status, status); assert.equal(propagation.gexpEnabled, enabled);
    assert.equal(propagation.prebidEffectiveFloor, 0.30); assert.equal(propagation.effectivePrice, 0.30);
    assert.equal(propagation.beforeRefresh, null); assert.equal(r.refreshSnapshots[0].gexp_floor, undefined);
    assert.equal(r.events('intext_prebid_floor_violation_candidate').length, 0);
  } finally { clearTimeout(wa.loadWatchdog); }
});

test('diagnosis detects floor lost during rebuild; no automatic reinjection', async () => {
  const r = setup({ bids: [bid('A', 0.42, '0.40')] });
  const { wa } = attachExistingGexp(r);
  const resolve = r.node.resolveDisplayRequestTargeting;
  r.node.resolveDisplayRequestTargeting = (...args) => { const value = resolve.apply(r.node, args); delete value.targeting.gexp_floor; return value; };
  const decision = await r.auction();
  try {
    await r.node.askDisplay(decision.displayBid, 1, 'display_only');
    const record = r.events('intext_gexp_floor_propagation_audit')[0];
    assert.equal(record.afterGexpRequest, '0.3'); assert.equal(record.resolvedFinalTargeting, null);
    assert.equal(record.status, 'lost-during-intext-targeting-rebuild');
    assert.equal(r.refreshSnapshots[0].gexp_floor, undefined);
  } finally { clearTimeout(wa.loadWatchdog); }
});

test('existing scoped targeting precedence produces a value mismatch without correction', async () => {
  const r = setup({ bids: [bid('A', 0.42, '0.40')] });
  const { wa } = attachExistingGexp(r);
  r.node.scopedContext = { targeting: { gexp_floor: '0.50' } };
  const decision = await r.auction();
  try {
    await r.node.askDisplay(decision.displayBid, 1, 'display_only');
    const record = r.events('intext_gexp_floor_propagation_audit')[0];
    assert.equal(record.effectivePrice, 0.30); assert.equal(record.prebidEffectiveFloor, 0.30);
    assert.equal(record.afterGexpRequest, '0.3'); assert.equal(record.beforeRefresh, '0.50');
    assert.equal(record.status, 'value-mismatch'); assert.deepEqual(r.refreshSnapshots[0].gexp_floor, ['0.50']);
  } finally { clearTimeout(wa.loadWatchdog); }
});

test('GEXP diagnostic failure is isolated; no isEnabled calls when debug is off', async () => {
  for (const debug of [true, false]) {
    const r = setup({ debug, bids: [bid('A', 0.42, '0.40')] });
    let enabledCalls = 0;
    r.manager.gexp.isEnabled = () => { enabledCalls++; throw new Error('diagnostic-only error'); };
    const decision = await r.auction();
    assert.equal((await r.node.askDisplay(decision.displayBid, 1, 'display_only')).filled, true);
    assert.equal(enabledCalls, debug ? 2 : 0);
    if (debug) assert.equal(r.events('intext_gexp_floor_before_request')[0].gexpEnabledType, 'error');
  }
});

test('GEXP propagation logs dedupe per request and reset with cycle/render context', () => {
  const r = setup();
  const first = r.node.beginIntextGexpFloorAudit(1);
  r.node.recordIntextGexpFloorAuditStage(first, 'afterRequest');
  r.node.finishIntextGexpFloorAudit(first); r.node.finishIntextGexpFloorAudit(first);
  assert.equal(r.node.beginIntextGexpFloorAudit(1), null);
  assert.equal(r.events('intext_gexp_floor_propagation_audit').length, 1);
  r.node._intextTelemetryCycleId++;
  assert.ok(r.node.beginIntextGexpFloorAudit(2));
  assert.equal(r.events('intext_gexp_floor_before_request').length, 2);
});

test('all current Intext version strings identify the P1 diagnostic build', () => {
  const version = '2026.10.05-p1-prebid-audit.2';
  for (const implementation of [source.slice(source.indexOf('const GEXP_INTEXT_VERSION'), source.indexOf('class WPromise')),
    fs.readFileSync(path.join(root, 'IntextManager.js'), 'utf8')]) {
    assert.doesNotMatch(implementation, /2026\.10\.02-p0-random-slot/);
    assert.match(implementation, new RegExp(`const GEXP_INTEXT_VERSION = "${version}"`));
    assert.equal((implementation.match(new RegExp(version, 'g')) || []).length, 3);
  }
});

for (const [applicableFloor, currency, expected, count] of [
  [0.20, 'USD', 'above-floor', 0],
  [0.30, 'USD', 'below-floor', 1],
  [0.30, 'EUR', 'currency-not-comparable', 0],
]) test(`requested 0.30, applicable ${applicableFloor} ${currency}, raw CPM 0.27`, async () => {
  const r = setup({ bids: [bid('IX', 0.27, '0.27', { floorData: {
    floorValue: applicableFloor, floorCurrency: currency, enforcements: { enforceJS: true },
  } })] });
  const winner = (await r.auction()).displayBid;
  assert.equal(winner, r.bids[0]);
  const record = r.events('intext_prebid_winner_audit')[0];
  assert.equal(record.requestedFloor, 0.30);
  assert.equal(record.applicableFloor, applicableFloor);
  assert.equal(record.requestedFloorCurrency, 'USD');
  assert.equal(record.applicableFloorCurrency, currency);
  assert.equal(record.rawCpmAboveRequestedFloor, false);
  assert.equal(record.rawCpmAboveApplicableFloor, currency === 'USD' ? applicableFloor === 0.20 : null);
  assert.equal(record.floorComparisonStatus, expected);
  assert.equal(record.requestedVsApplicableFloorRelation, currency !== 'USD' ? 'unknown' : applicableFloor === 0.20 ? 'different' : 'same');
  assert.equal(r.events('intext_prebid_floor_violation_candidate').length, count);
  if (count) {
    const candidate = r.events('intext_prebid_floor_violation_candidate')[0];
    assert.equal(candidate.comparisonFloor, applicableFloor);
    assert.equal(candidate.comparisonFloorSource, 'bid.floorData.floorValue');
    assert.equal(candidate.floorEnforcementStatus, 'enabled-observed');
  }
});

test('requested floor evidence never masquerades as an observed applicable floor', async () => {
  const r = setup({ bids: [bid('IX', 0.27, '0.27')] });
  await r.auction();
  const record = r.events('intext_prebid_winner_audit')[0];
  assert.equal(record.requestedFloor, 0.30);
  assert.equal(record.applicableFloor, null);
  assert.equal(record.applicableFloorStatus, 'unknown');
  assert.equal(record.floorObserved, null);
  assert.equal(record.rawCpmAboveRequestedFloor, false);
  assert.equal(record.rawCpmAboveApplicableFloor, null);
  assert.equal(record.comparisonFloorSource, 'requested-floor-only:applicable-unknown');
});

test('perfect post-request GEXP propagation remains propagated when the Prebid floor differs', async () => {
  const r = setup({ bids: [bid('IX', 0.42, '0.40')] });
  const { wa } = attachExistingGexp(r);
  const winner = (await r.auction()).displayBid;
  wa.getNextPrice = () => { wa.effectivePrice = 0.50; };
  try {
    await r.node.askDisplay(winner, 1, 'display_only');
    const audit = r.events('intext_gexp_floor_propagation_audit')[0];
    assert.equal(audit.prebidEffectiveFloor, 0.30);
    assert.equal(audit.effectivePrice, 0.50);
    assert.equal(audit.gexpFloorPropagationStatus, 'propagated');
    assert.equal(audit.status, 'propagated');
    assert.equal(audit.prebidVsPostGexpFloorRelation, 'different');
    assert.equal(r.events('display_gam_request_targeting_final')[0].prebidVsPostGexpFloorRelation, 'different');
    assert.deepEqual(r.refreshSnapshots[0].gexp_floor, ['0.5']);
  } finally { clearTimeout(wa.loadWatchdog); }
});

for (const [name, change, expected] of [
  ['slot gate', r => { r.node.slot.__position = 'native-slot'; }, 'not-produced-slot-not-handled'],
  ['GEXP error', r => { r.manager.gexp.request = slot => slot.setTargeting('gexp_error', 'true'); }, 'not-produced-gexp-error'],
  ['missing window', r => { r.node.wa = null; r.waterfall.wa = null; r.manager.gexp.windows = {}; r.manager.gexp.request = () => {}; }, 'not-produced-window-missing'],
  ['unexplained absence', r => { r.manager.gexp.request = () => {}; }, 'not-produced-unexpected'],
]) test(`observed absence: ${name}`, async () => {
  const r = setup({ psp: true });
  attachExistingGexp(r);
  change(r);
  const audit = r.node.beginIntextGexpFloorAudit(1);
  r.manager.gexp.request(r.node.slot);
  r.node.recordIntextGexpFloorAuditStage(audit, 'afterRequest');
  r.node.finishIntextGexpFloorAudit(audit);
  const after = r.events('intext_gexp_floor_after_request')[0];
  const result = r.events('intext_gexp_floor_propagation_audit')[0];
  assert.equal(result.gexpFloorPropagationStatus, expected);
  for (const key of ['gexpRuntimeEnabled', 'gexpConfiguredEnabled', 'gexpIsEnabled', 'gexpShouldHandleSlot',
    'gexpRandom1Observed', 'gexpErrored', 'slotGexpError', 'windowExists', 'effectivePrice']) assert.deepEqual(result[key], after[key], key);
  assert.equal(result.prebidVsPostGexpFloorRelation, 'unknown');
  assert.deepEqual(r.node.slot.getTargeting('gexp_floor'), []);
});

for (const [name, hasBidTargeting, hasApiTargeting, hasSlotTargeting] of [
  ['A: bid only', true, false, false], ['B: bid and API', true, true, false],
  ['C: GPT slot', true, true, true], ['D: none', false, false, false],
]) test(`native Prebid targeting captured before manual Intext rebuild: ${name}`, async () => {
  const targeting = { hb_pb: '0.27', hb_bidder: 'IX', hb_adid: 'ad-IX', hb_size: '300x250',
    hb_format: 'banner', hb_source: 's2s', hb_deal: 'deal', hb_deal_IX: ['scoped'] };
  const r = setup({ bids: [bid('IX', 0.27, '0.27', { adserverTargeting: hasBidTargeting ? targeting : {} })] });
  const order = [];
  const log = r.context.logIntext;
  r.context.logIntext = (...args) => { order.push(String(args[0])); log(...args); };
  r.pb.getAdserverTargetingForAdUnitCode = code => {
    assert.equal(code, r.unit.code); order.push('pb-native-api'); return hasApiTargeting ? targeting : {};
  };
  r.pb.setTargetingForGPTAsync = () => {
    order.push('pb-set-targeting');
    if (hasSlotTargeting) for (const [key, value] of Object.entries(targeting)) r.node.slot.setTargeting(key, value);
  };
  const collect = r.node.collectHbTargetingFromCurrentBids;
  r.node.collectHbTargetingFromCurrentBids = (...args) => { order.push('manual-collect'); return collect.apply(r.node, args); };
  const winner = (await r.auction()).displayBid;
  const audit = r.events('intext_prebid_native_targeting_after_set_audit')[0];
  assert.equal(audit.auctionId, 'auction-1'); assert.equal(audit.adUnitCode, r.unit.code);
  assert.equal(audit.cycleId, 7); assert.ok(Object.hasOwn(audit, 'renderToken'));
  assert.deepEqual(audit.rawBannerBids[0].adserverTargeting, hasBidTargeting ? targeting : {});
  assert.deepEqual(audit.pbjsTargeting, hasApiTargeting ? targeting : {});
  assert.deepEqual(audit.gptSlotTargeting, hasSlotTargeting ? Object.fromEntries(Object.entries(targeting).map(([k,v]) => [k, Array.isArray(v) ? v : [v]])) : {});
  assert.equal(r.events('intext_prebid_winner_targeting_audit').length, 0);
  assert.ok(order.indexOf('pb-set-targeting') < order.indexOf('pb-native-api'));
  await r.node.askDisplay(winner, 1, 'display_only');
  const nativeIndex = order.findIndex(value => value.endsWith(' intext_prebid_native_targeting_after_set_audit'));
  assert.ok(order.indexOf('manual-collect') > nativeIndex);
  const rebuilt = r.events('intext_prebid_winner_targeting_audit')[0];
  assert.equal(rebuilt.targetingSource, 'collectHbTargetingFromCurrentBids/collectHbTargetingFromBid');
  assert.equal(rebuilt.hb_pb, hasBidTargeting ? '0.27' : '0.20');
  assert.deepEqual(r.refreshSnapshots[0].hb_pb, [hasBidTargeting ? '0.27' : '0.20']);
});

test('native targeting inspection errors are isolated and debug-off performs no inspection', async () => {
  for (const debug of [true, false]) {
    const r = setup({ debug, bids: [bid('IX', 0.27, '0.27')] });
    let reads = 0;
    r.pb.getAdserverTargetingForAdUnitCode = () => { reads++; throw new Error('read failure'); };
    const winner = (await r.auction()).displayBid;
    assert.equal(winner, r.bids[0]); assert.equal(reads, debug ? 1 : 0);
    if (debug) assert.equal(r.events('intext_prebid_native_targeting_after_set_audit')[0].pbjsTargetingError, 'read failure');
  }
});

for (const psp of [false, true]) test(`final GAM snapshot correlates GEXP, Prebid, deal and existing APS (${psp ? 'PSP' : 'legacy'})`, async () => {
  const r = setup({ psp, bids: [bid('pubstack_server', 0.0578, '0.05', { adserverTargeting: {
    hb_pb: '0.05', hb_deal: 'ABC', hb_source: 's2s', hb_bidder: 'pubstack_server', hb_adid: 'ad-pubstack_server',
  } })], floor: 0.50 });
  const { wa } = attachExistingGexp(r, { floor: 0.50 });
  const apsCalls = [];
  const aps = {
    fetchBids(config, callback) { apsCalls.push('fetchBids'); callback([{ slotID: config.slots[0].slotID }]); },
    setDisplayBids() { apsCalls.push('setDisplayBids'); r.realSlot.setTargeting('amznbid', 'APS'); r.realSlot.setTargeting('amznp', '0.10'); },
  };
  const forbidden = () => assert.fail('public APS wrapper must not be used');
  r.window.apstag = psp ? { fetchBids: forbidden, setDisplayBids: forbidden, __ctrl: { realObj: aps } } : aps;
  r.waterfall.config.tam = { enabled: true };
  r.waterfall.getDisplaySizes = () => [[300, 250]];
  await r.auction();
  try {
    assert.equal(await r.waterfall._requestDisplay(1, 'audit-test'), true);
    const gam = r.events('display_gam_request_targeting_final')[0];
    assert.equal(gam.gexpEffectivePrice, 0.50); assert.equal(gam.prebidEffectiveFloor, 0.50);
    assert.equal(gam.slotGexpFloor, '0.5'); assert.equal(gam.winnerRawCpm, 0.0578);
    assert.equal(gam.hb_pb, '0.05'); assert.equal(gam.hb_deal, 'ABC');
    assert.equal(gam.floorComparisonStatus, 'deal-enforcement-unknown');
    assert.deepEqual(gam.allAmazonTargeting.amznbid, ['APS']); assert.deepEqual(gam.allAmazonTargeting.amznp, ['0.10']);
    assert.deepEqual(r.refreshSnapshots[0].amznbid, ['APS']);
    assert.deepEqual(apsCalls, ['fetchBids', 'setDisplayBids']);
  } finally { clearTimeout(wa.loadWatchdog); }
});
