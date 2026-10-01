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

const window = {};
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
  setTimeout,
  clearTimeout,
  logIntext() {},
  warnIntext() {},
});
const Waterfall = vm.runInContext(`
  const intextPrebidAliasRegistry = new WeakMap();
  ${between(source, 'class IntextWaterfall', 'class IntextVideoCreative')}
  IntextWaterfall;
`, context);

const aliases = {
  ttd_video: 'ttd',
  ix_video: { bidder: 'ix', gvlid: 10 },
  equativ_video: { bidder: 'equativ', gvlid: 42, useBaseGvlid: true },
};

function createWaterfall(aliasConfig = aliases) {
  const waterfall = Object.create(Waterfall.prototype);
  waterfall.node = {
    id: 'gexp-intext',
    scopedContext: null,
    manager: {
      resolveIntextRequestNetworkId: () => '99071977',
      resolveIntextPrebidApi: () => ({ api: window.pbjs || null, source: window.pbjs ? 'window.pbjs' : 'pbjs-unavailable', pspDetected: false, proxy: window.pbjs || null, controller: null }),
    },
    mergeIntextTelemetry() {},
  };
  waterfall.config = {
    prebid: {
      pbjsAvailabilityWaitMs: 100,
      pbjsAvailabilityRetryMs: 5,
      networks: { '99071977': { aliases: aliasConfig } },
      graceMs: 0,
    },
  };
  waterfall._aliasRegistrationState = 'idle';
  waterfall._aliasRegistrationPromise = null;
  return waterfall;
}

function createReadyPbjs(order, aliasImpl = null) {
  return {
    que: { push(callback) { callback(); } },
    aliasBidder(original, alias, options) {
      order.push(['aliasBidder', original, alias, options]);
      if (aliasImpl) aliasImpl(original, alias, options);
    },
    requestBids({ bidsBackHandler }) {
      order.push(['requestBids']);
      bidsBackHandler({}, false, 'auction-1');
    },
    setTargetingForGPTAsync() {},
    getNoBids: () => [],
  };
}

function prepareExecutableWaterfall(waterfall, order) {
  waterfall.registerPrebidAdUnit = () => order.push(['addAdUnits']);
  waterfall.applyIntextDisplayFloorToPrebid = () => {};
  waterfall.getPrebidTimeout = () => 10;
  waterfall.getPbjsBidsSafe = () => [];
  waterfall.waitForPrebidGlobalInitFlag = () => Promise.resolve(true);
}

test('PBJS ready registers aliases before addAdUnits and requestBids', async () => {
  const order = [];
  window.pbjs = createReadyPbjs(order);
  const waterfall = createWaterfall();
  prepareExecutableWaterfall(waterfall, order);
  await waterfall.executePrebid({ code: 'gexp-intext', mediaTypes: { banner: {} } });
  const names = order.map(([name]) => name);
  assert.ok(names.lastIndexOf('aliasBidder') < names.indexOf('addAdUnits'));
  assert.ok(names.indexOf('addAdUnits') < names.indexOf('requestBids'));
  assert.equal(waterfall._aliasRegistrationState, 'registered');
});

for (const [name, initialPbjs] of [
  ['standard bootstrap queue', { que: [] }],
  ['PBJS absent initially', undefined],
  ['partial PBJS without queue', { requestBids() {} }],
]) {
  test(`${name} waits and registers when PBJS becomes ready`, async () => {
    const order = [];
    window.pbjs = initialPbjs;
    const waterfall = createWaterfall();
    setTimeout(() => { window.pbjs = createReadyPbjs(order); }, 10);
    assert.equal(await waterfall.waitForPbjsAvailability({ code: 'gexp-intext' }), true);
    assert.equal(await waterfall.ensurePrebidAliasesRegistered(), true);
    assert.equal(order.filter(([event]) => event === 'aliasBidder').length, 3);
  });
}

test('late aliasBidder is part of PBJS readiness when aliases are required', async () => {
  const order = [];
  window.pbjs = createReadyPbjs(order);
  delete window.pbjs.aliasBidder;
  const waterfall = createWaterfall();
  setTimeout(() => {
    window.pbjs.aliasBidder = (original, alias, options) => order.push(['aliasBidder', original, alias, options]);
  }, 10);
  assert.equal(await waterfall.waitForPbjsAvailability({ code: 'gexp-intext' }), true);
  assert.equal(await waterfall.ensurePrebidAliasesRegistered(), true);
});

test('concurrent slots share one alias registration Promise', async () => {
  const order = [];
  window.pbjs = createReadyPbjs(order);
  const first = createWaterfall();
  const second = createWaterfall();
  const [a, b] = await Promise.all([
    first.ensurePrebidAliasesRegistered(),
    second.ensurePrebidAliasesRegistered(),
  ]);
  assert.equal(a, true);
  assert.equal(b, true);
  assert.equal(order.filter(([event]) => event === 'aliasBidder').length, 3);
  assert.equal(second._aliasRegistrationState, 'registered');
});

test('successful prior registration is idempotent across later auctions', async () => {
  const order = [];
  window.pbjs = createReadyPbjs(order);
  const waterfall = createWaterfall();
  assert.equal(await waterfall.ensurePrebidAliasesRegistered(), true);
  assert.equal(await waterfall.ensurePrebidAliasesRegistered(), true);
  assert.equal(order.filter(([event]) => event === 'aliasBidder').length, 3);
});

test('one alias error leaves state idle and retries only the failed alias', async () => {
  const order = [];
  let failOnce = true;
  window.pbjs = createReadyPbjs(order, (_original, alias) => {
    if (alias === 'ix_video' && failOnce) {
      failOnce = false;
      throw new Error('late adapter');
    }
  });
  const waterfall = createWaterfall();
  assert.equal(await waterfall.ensurePrebidAliasesRegistered(), false);
  assert.equal(waterfall._aliasRegistrationState, 'idle');
  assert.equal(await waterfall.ensurePrebidAliasesRegistered(), true);
  const counts = Object.fromEntries(
    Object.keys(aliases).map((alias) => [alias, order.filter((entry) => entry[0] === 'aliasBidder' && entry[2] === alias).length]),
  );
  assert.deepEqual(counts, { ttd_video: 1, ix_video: 2, equativ_video: 1 });
});

test('no alias configuration does not wait for aliasBidder or block auction', async () => {
  const order = [];
  window.pbjs = createReadyPbjs(order);
  delete window.pbjs.aliasBidder;
  const waterfall = createWaterfall(null);
  prepareExecutableWaterfall(waterfall, order);
  await waterfall.executePrebid({ code: 'gexp-intext', mediaTypes: { banner: {} } });
  assert.deepEqual(order.map(([name]) => name), ['addAdUnits', 'requestBids']);
});

test('alias object options preserve useBaseGvlid precedence over gvlid', async () => {
  const order = [];
  window.pbjs = createReadyPbjs(order);
  assert.equal(await createWaterfall().ensurePrebidAliasesRegistered(), true);
  const ix = order.find((entry) => entry[2] === 'ix_video');
  const equativ = order.find((entry) => entry[2] === 'equativ_video');
  assert.equal(JSON.stringify(ix[3]), JSON.stringify({ gvlid: 10 }));
  assert.equal(JSON.stringify(equativ[3]), JSON.stringify({ useBaseGvlid: true }));
});

test('source order explicitly gates addAdUnits/requestBids on alias completion', () => {
  const execute = between(source, 'executePrebid(configuration)', 'executeAmazonTam(configuration,');
  assert.ok(execute.indexOf('await this.ensurePrebidAliasesRegistered(pb)') < execute.indexOf('runPrebid(pb);'));
  assert.ok(execute.indexOf('this.registerPrebidAdUnit(configuration, pb)') < execute.indexOf('pb.requestBids'));
});
