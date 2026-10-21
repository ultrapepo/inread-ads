const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const fixture = fs.readFileSync(path.join(__dirname, 'intext-prebid-floor.audit.test.cjs'), 'utf8');
const attachStart = fixture.indexOf('function attachExistingGexp(');
const attachEnd = fixture.indexOf('\nfor (const [name, extra', attachStart);
const { setup, bid, attachExistingGexp } = new Function('require', '__dirname',
  fixture.slice(0, fixture.indexOf('\nfor (const [name, cpm')) +
  fixture.slice(attachStart, attachEnd) + '; return { setup, bid, attachExistingGexp };')(require, __dirname);
const plain = value => JSON.parse(JSON.stringify(value));

function pricing({ effectivePrice, lastPrice, windowStart, overridePrice, mp, pivot = 7, p = 4,
  enabled = true, array = [0, 0.06, 0.11, 0.17, 0.22, 0.30, 0.35, 0.40, 0.45] } = {}) {
  const calls = [];
  const forbidden = () => assert.fail('Intext must not run a pricing strategy');
  const cfg = { adUnit: 'fallback-unit', enabled: true };
  Object.defineProperty(cfg, 'ext', { get: () => assert.fail('Intext must not inspect pp2/p1') });
  const wa = Object.freeze({
    position: 'gexp-intext', offY: 321, cI: Object.freeze({ adUnit: 'resolved-unit' }),
    array: Object.freeze(array.slice()), effectivePrice,
    state: Object.freeze({ lastPrice, windowStart }),
    pCfg: Object.freeze({ p, mp, overridePrice, pbDefaultFloor: 0.10, rv: 8, rvp: 100 }),
    getBasePrice: forbidden, initPrice: forbidden, getNextPrice: forbidden,
    gexp: Object.freeze({ enabled, cfg: Object.freeze(cfg), getRandom: forbidden,
      getPivotIndex(...args) { calls.push(args); if (pivot instanceof Error) throw pivot; return pivot; },
    }),
  });
  return { wa, calls };
}

for (const file of ['_gam_kv_.js', 'IntextManager.js']) {
  const implementation = fs.readFileSync(path.join(root, file), 'utf8');
  const run = (options, setupOptions = {}) => {
    const r = setup({ implementation, ...setupOptions });
    const input = pricing(options);
    r.waterfall.wa = input.wa;
    return { ...r, ...input };
  };
  const check = (name, fn) => test(`${file}: floor authority ${name}`, fn);

  for (const [name, options, source, index, value, pivotCalls] of [
    ['effective price wins', { effectivePrice: 0.40, lastPrice: 0.30, windowStart: 5, overridePrice: 8 }, 'gexp-effective-price', 7, 0.40, 0],
    ['last price wins', { lastPrice: 0.35, windowStart: 5, overridePrice: 8 }, 'gexp-last-price', 6, 0.35, 0],
    ['window start wins', { windowStart: 7, overridePrice: 8 }, 'gexp-window-start', 7, 0.40, 0],
    ['GEXP pivot', {}, 'gexp-pivot', 7, 0.40, 1],
    ['GEXP config fallback', { pivot: null }, 'gexp-config-fallback', 5, 0.30, 1],
    ['PSP disabled runtime fallback', { pivot: null, enabled: false }, 'gexp-config-fallback', 5, 0.30, 1],
    ['override before pivot', { overridePrice: 8 }, 'gexp-override-price', 8, 0.45, 0],
    ['zero index is valid if its array price is positive', { overridePrice: 0, array: [0.73] }, 'gexp-override-price', 0, 0.73, 0],
    ['no floor', { pivot: null, p: undefined, array: [] }, 'missing', null, null, 1],
  ]) check(name, () => {
    const r = run(options);
    const before = plain(r.wa);
    // The helper itself must not access GPT, targeting, Prebid or random.
    r.node.slot = new Proxy({}, { get: () => assert.fail('pricing helper read GPT') });
    const result = r.waterfall.resolveIntextGexpDisplayFloor();
    assert.equal(result.source, source); assert.equal(result.index, index); assert.equal(result.value, value);
    assert.equal(result.floorSource, source); assert.equal(result.floorIndex, index); assert.equal(result.floorValue, value);
    assert.equal(result.position, 'gexp-intext'); assert.equal(result.adUnit, 'resolved-unit');
    assert.equal(result.gexpRuntimeEnabled, options.enabled === false ? false : true);
    assert.equal(r.calls.length, pivotCalls);
    if (pivotCalls) assert.deepEqual(r.calls[0], ['resolved-unit', 'gexp-intext', 0, 321]);
    assert.deepEqual(plain(r.wa), before);
    assert.equal(r.operations.length, 0);
  });

  check('the fallback price follows the GEXP array, including precise values', () => {
    for (const price of [0.30, 0.613579, 1.23456789]) {
      const prices = pricing().wa.array.slice(); prices[5] = price;
      const r = run({ pivot: null, array: prices });
      assert.equal(r.waterfall.applyIntextDisplayFloorToPrebid(r.unit, r.pb), price);
      const payload = r.operations.find(op => op[0] === 'setConfig')[1];
      assert.equal(payload.floors.data.values['gexp-intext|banner'], price);
      const audit = r.events('display_prebid_floor_write_candidate')[0];
      assert.equal(audit.source, 'gexp-config-fallback'); assert.equal(audit.index, 5); assert.equal(audit.value, price);
      assert.equal(audit.configFallbackP, 4); assert.equal(audit.configFallbackIndex, 5);
      assert.equal(audit.pivotResult, null);
    }
  });

  check('slot gexp_floor and pbDefaultFloor never become price authority', () => {
    for (const [pivot, expected] of [[null, 0.30], [7, 0.40]]) {
      const r = run({ pivot }); r.node.slot.setTargeting('gexp_floor', '2.00');
      r.waterfall.applyIntextDisplayFloorToPrebid(r.unit, r.pb);
      assert.equal(r.operations.find(op => op[0] === 'setConfig')[1].floors.data.values['gexp-intext|banner'], expected);
      assert.notEqual(expected, r.wa.pCfg.pbDefaultFloor);
      assert.deepEqual(r.node.slot.getTargeting('gexp_floor'), ['2.00']);
    }
  });

  check('missing floor removes an existing rule and preserves unrelated Prebid config', () => {
    const r = run({ pivot: null, p: null });
    r.pb.getConfig = () => ({ data: { currency: 'USD', schema: { delimiter: '|', fields: ['adUnitCode', 'mediaType'] },
      values: { 'gexp-intext|banner': 0.30, 'native|banner': 0.87 } } });
    r.node.slot.setTargeting('gexp_floor', '2.00');
    assert.equal(r.waterfall.applyIntextDisplayFloorToPrebid(r.unit, r.pb), null);
    const values = r.operations.find(op => op[0] === 'setConfig')[1].floors.data.values;
    assert.deepEqual(values, { 'native|banner': 0.87 });
    assert.equal(r.events('display_prebid_floor_write_rejected_non_banner')[0].source, 'slot_targeting');
  });

  check('subsequent auctions consume changed runtime state without caching a fallback', () => {
    const r = run({ pivot: null });
    assert.equal(r.waterfall.applyIntextDisplayFloorToPrebid(r.unit, r.pb), 0.30);
    const next = pricing({ windowStart: 7 }); r.waterfall.wa = next.wa;
    assert.equal(r.waterfall.applyIntextDisplayFloorToPrebid(r.unit, r.pb), 0.40);
    const audits = r.events('display_prebid_floor_write_candidate');
    assert.deepEqual(audits.map(audit => [audit.source, audit.index, audit.value]),
      [['gexp-config-fallback', 5, 0.30], ['gexp-window-start', 7, 0.40]]);
    assert.equal(next.calls.length, 0);
  });

  for (const invalid of [null, undefined, NaN, Infinity, -1, 0.5, 99, '7', true]) {
    check(`invalid pivot ${String(invalid)} falls back to GEXP config`, () => {
      const r = run({ pivot: invalid });
      // Explicit undefined is still a valid simulation of an absent pivot.
      if (invalid === undefined) r.waterfall.wa = { ...r.wa, gexp: { ...r.wa.gexp, getPivotIndex: () => undefined } };
      const result = r.waterfall.resolveIntextGexpDisplayFloor();
      assert.equal(result.source, 'gexp-config-fallback'); assert.equal(result.value, 0.30); assert.equal(result.index, 5);
    });
  }
  check('unusable array price and pivot exception do not invent prices', () => {
    for (const price of [0, -1, NaN, Infinity, '0.40']) {
      const prices = pricing().wa.array.slice(); prices[7] = price;
      const r = run({ array: prices, p: null });
      assert.equal(r.waterfall.resolveIntextGexpDisplayFloor().source, 'missing');
    }
    const r = run({ pivot: new Error('GEXP unavailable') });
    const result = r.waterfall.resolveIntextGexpDisplayFloor();
    assert.equal(result.source, 'gexp-config-fallback'); assert.equal(result.pivotError, 'GEXP unavailable');
  });
  check('invalid runtime values and override indexes yield to valid GEXP sources', () => {
    for (const invalid of ['0.40', NaN, Infinity, -1, 0]) {
      const r = run({ effectivePrice: invalid, lastPrice: invalid, windowStart: 0.5, overridePrice: 99 });
      const result = r.waterfall.resolveIntextGexpDisplayFloor();
      assert.equal(result.source, 'gexp-pivot'); assert.equal(result.value, 0.40);
    }
  });
  check('unknown runtime index remains unknown; no nearest-price approximation', () => {
    const r = run({ effectivePrice: 0.4123456 });
    const result = r.waterfall.resolveIntextGexpDisplayFloor();
    assert.equal(result.source, 'gexp-effective-price'); assert.equal(result.value, 0.4123456); assert.equal(result.index, null);
    assert.equal(r.calls.length, 0);
  });
  for (const [name, options, source, raw, effective, minimumApplied] of [
    ['pivot without effective minimum', { pivot: 5, mp: 0 }, 'gexp-pivot', 5, 5, false],
    ['pivot below minimum', { pivot: 5, mp: 7 }, 'gexp-pivot', 5, 7, true],
    ['pivot above minimum', { pivot: 8, mp: 5 }, 'gexp-pivot', 8, 8, false],
    ['fallback below minimum', { pivot: null, mp: 7 }, 'gexp-config-fallback', 5, 7, true],
    ['override is not clamped', { overridePrice: 5, mp: 7 }, 'gexp-override-price', null, 5, false],
    ['effective price is not clamped', { effectivePrice: 0.30, mp: 7 }, 'gexp-effective-price', null, 5, false],
    ['last price is not clamped', { lastPrice: 0.30, mp: 7 }, 'gexp-last-price', null, 5, false],
    ['window start is not clamped', { windowStart: 5, mp: 7 }, 'gexp-window-start', null, 5, false],
  ]) check(name, () => {
    const r = run(options); const before = plain(r.wa);
    const result = r.waterfall.resolveIntextGexpDisplayFloor();
    assert.equal(result.source, source); assert.equal(result.rawIndex, raw);
    assert.equal(result.effectiveIndex, effective); assert.equal(result.index, effective);
    assert.equal(result.minimumPriceIndexConfigured, options.mp);
    assert.equal(result.minimumApplied, minimumApplied); assert.equal(result.value, r.wa.array[effective]);
    assert.equal(r.waterfall.applyIntextDisplayFloorToPrebid(r.unit, r.pb), r.wa.array[effective]);
    assert.equal(r.operations.find(op => op[0] === 'setConfig')[1].floors.data.values['gexp-intext|banner'], r.wa.array[effective]);
    assert.deepEqual(plain(r.wa), before);
  });
  check('pivot price follows the array with mp zero', () => {
    for (const price of [0.30, 0.61789]) {
      const array = pricing().wa.array.slice(); array[5] = price;
      const r = run({ pivot: 5, mp: 0, array });
      assert.equal(r.waterfall.resolveIntextGexpDisplayFloor().value, price);
    }
  });
  check('invalid minimum adds no default', () => {
    for (const mp of [undefined, null, -1, NaN, Infinity, 0.5, '7', true]) {
      const result = run({ pivot: 5, mp }).waterfall.resolveIntextGexpDisplayFloor();
      assert.equal(result.index, 5); assert.equal(result.minimumApplied, false);
    }
  });
  check('unusable minimum fails open without array-end clamp or lower fallback', () => {
    for (const pivot of [5, null]) for (const mp of [99, 7]) {
      const array = pricing().wa.array.slice(); if (mp === 7) array[7] = 0;
      const r = run({ pivot, mp, array });
      const result = r.waterfall.resolveIntextGexpDisplayFloor();
      assert.equal(result.source, 'missing'); assert.equal(result.value, null);
      assert.equal(result.index, null); assert.equal(result.effectiveIndex, null);
      assert.equal(result.rawIndex, 5); assert.equal(result.rejectedEffectiveIndex, mp);
      r.pb.getConfig = () => ({ data: { currency: 'USD', schema: { delimiter: '|', fields: ['adUnitCode', 'mediaType'] },
        values: { 'gexp-intext|banner': 0.30, 'native|banner': 0.87 } } });
      assert.equal(r.waterfall.applyIntextDisplayFloorToPrebid(r.unit, r.pb), null);
      assert.deepEqual(r.operations.find(op => op[0] === 'setConfig')[1].floors.data.values, { 'native|banner': 0.87 });
    }
  });
  check('first PSP auction resolves manager identity before WindowArray impression and GPT slot', async () => {
    const r = run({ pivot: 8 }, { psp: true });
    r.waterfall.wa = { ...r.wa, cI: null, slot: null };
    r.node.manager.adUnitPath = 'exp2/economia/empresas/n';
    const result = r.waterfall.getIntextDisplayFloorInfo('gexp-intext|banner');
    assert.equal(result.adUnit, 'exp2'); assert.equal(result.adUnitSource, 'intext-manager-adunit');
    assert.equal(result.pivotAttempted, true); assert.equal(result.pivotResult, 8);
    assert.equal(result.source, 'gexp-pivot'); assert.equal(result.index, 8);
    assert.deepEqual(r.calls[0], ['exp2', 'gexp-intext', 0, 321]);
    assert.equal(r.operations.length, 0);
    await r.auction();
    const write = r.operations.find(op => op[0] === 'setConfig')[1];
    assert.equal(write.floors.data.values['gexp-intext|banner'], r.wa.array[8]);
    assert.equal(r.waterfall.wa.slot, null); assert.equal(r.waterfall.wa.cI, null);
    assert.ok(!r.operations.some(op => op[0] === 'defineSlot' || op[0] === 'refresh'));
  });
  check('manager identity ignores unexpected network prefix', () => {
    const r = run(); r.waterfall.wa = { ...r.wa, cI: null, slot: null };
    r.node.manager.adUnitPath = '/99071977/exp2/economia/n';
    const result = r.waterfall.resolveIntextGexpDisplayFloor();
    assert.equal(result.adUnit, 'exp2'); assert.equal(result.adUnitSource, 'intext-manager-adunit');
    assert.equal(r.calls[0][0], 'exp2');
  });
  check('identity precedence is impression, explicit, manager, config, missing', () => {
    for (const [impression, explicit, manager, cfg, expected, source] of [
      ['exp2', 'telva', 'mun/economia/n', 'cfg', 'exp2', 'windowarray-impression'],
      [null, 'telva', 'exp2/economia', 'cfg', 'telva', 'explicit'],
      [null, null, 'exp2/economia', 'cfg', 'exp2', 'intext-manager-adunit'],
      [' ', '/99071977/', '', '/123/cfg/page', 'cfg', 'gexp-config'],
      [null, null, null, null, null, 'missing'],
    ]) {
      const r = run(); r.node.manager.adUnitPath = manager;
      r.waterfall.wa = { ...r.wa, cI: { adUnit: impression },
        slot: new Proxy({}, { get: () => assert.fail('pricing identity must not read GPT') }),
        gexp: { ...r.wa.gexp, cfg: { adUnit: cfg } } };
      const result = r.waterfall.resolveIntextGexpDisplayFloor(explicit);
      assert.equal(result.adUnit, expected); assert.equal(result.adUnitSource, source);
      assert.equal(result.pivotAttempted, !!expected);
      if (expected) assert.equal(r.calls[0][0], expected);
      else { assert.equal(r.calls.length, 0); assert.equal(result.source, 'gexp-config-fallback'); }
    }
  });
  check('no identity or configured floor yields missing without pivot', () => {
    const r = run({ p: null }); r.node.manager.adUnitPath = '/99071977/';
    r.waterfall.wa = { ...r.wa, cI: null, slot: null, gexp: { ...r.wa.gexp, cfg: {} } };
    const result = r.waterfall.resolveIntextGexpDisplayFloor();
    assert.equal(result.adUnitSource, 'missing'); assert.equal(result.pivotAttempted, false);
    assert.equal(result.source, 'missing'); assert.equal(result.value, null); assert.equal(r.calls.length, 0);
  });
}

test('Prebid request audit exposes the complete pricing authority chain', async () => {
  const r = setup({ psp: true, bids: [bid('IX', 0.42, '0.40')] });
  r.waterfall.wa = pricing({ pivot: null, enabled: false }).wa;
  await r.auction();
  const audit = r.events('intext_prebid_floor_audit_start')[0];
  assert.equal(audit.floorSource, 'gexp-config-fallback'); assert.equal(audit.floorIndex, 5); assert.equal(audit.floorValue, 0.30);
  for (const field of ['position', 'adUnit', 'effectivePrice', 'lastPrice', 'windowStart', 'overridePriceConfigured',
    'adUnitSource', 'pivotAttempted', 'pivotResult', 'minimumPriceIndexConfigured', 'rawIndex', 'effectiveIndex', 'minimumApplied',
    'pivotIndex', 'configFallbackP', 'configFallbackIndex', 'gexpRuntimeEnabled']) assert.ok(Object.hasOwn(audit, field), field);
  assert.equal(audit.gexpRuntimeEnabled, false); assert.equal(audit.pivotResult, null);
  const snapshot = r.events('intext_prebid_floor_request_snapshot')[0];
  assert.equal(snapshot.floorResolution.source, 'gexp-config-fallback');
  assert.equal(snapshot.floorsConfig.sent.values['gexp-intext|banner'], 0.30);
});

test('Prebid audit correlates manager identity, raw pivot and applied minimum', async () => {
  const r = setup({ psp: true });
  const { wa, calls } = pricing({ pivot: 5, mp: 7 });
  r.waterfall.wa = { ...wa, cI: null, slot: null };
  r.node.manager.adUnitPath = '/99071977/exp2/economia/n';
  await r.auction();
  const audit = r.events('intext_prebid_floor_audit_start')[0];
  const resolution = r.events('intext_prebid_floor_request_snapshot')[0].floorResolution;
  for (const payload of [audit, resolution]) {
    assert.equal(payload.adUnit, 'exp2'); assert.equal(payload.adUnitSource, 'intext-manager-adunit');
    assert.equal(payload.pivotAttempted, true); assert.equal(payload.pivotResult, 5);
    assert.equal(payload.rawIndex, 5); assert.equal(payload.minimumPriceIndexConfigured, 7);
    assert.equal(payload.effectiveIndex, 7); assert.equal(payload.index, 7);
    assert.equal(payload.minimumApplied, true); assert.equal(payload.floorSource, 'gexp-pivot');
    assert.equal(payload.floorValue, wa.array[7]);
  }
  assert.deepEqual(calls[0], ['exp2', 'gexp-intext', 0, 321]);
});

test('first-auction override alignment changes the selected GEXP index, not the price array', () => {
  const baseline = process.env.INTEXT_FLOOR_AUDIT_BASELINE
    ? fs.readFileSync(process.env.INTEXT_FLOOR_AUDIT_BASELINE, 'utf8')
    : execFileSync('git', ['show', 'HEAD:src/pro/_gam_kv_.js'], { cwd: root, encoding: 'utf8', maxBuffer: 5e6 });
  const results = [];
  for (const implementation of [baseline, fs.readFileSync(path.join(root, '_gam_kv_.js'), 'utf8')]) {
    const r = setup({ implementation }); const { wa, calls } = pricing({ overridePrice: 8 });
    r.waterfall.wa = wa;
    results.push({ value: r.waterfall.applyIntextDisplayFloorToPrebid(r.unit, r.pb), pivotCalls: calls.length });
  }
  assert.deepEqual(results, [{ value: 0.40, pivotCalls: 1 }, { value: 0.45, pivotCalls: 0 }]);
});

test('real disabled GAMExp returns no pivot and Intext consumes only its configured fallback', () => {
  const r = setup({ psp: true });
  const { wa, gexp } = attachExistingGexp(r, { runtimeEnabled: false });
  wa.effectivePrice = undefined; wa.state.lastPrice = undefined; wa.state.windowStart = -1;
  wa.pCfg.p = 4; wa.array = pricing().wa.array.slice(); wa.cI = { adUnit: 'resolved-unit' };
  Object.defineProperty(gexp.cfg, 'ext', { get: () => assert.fail('disabled runtime must not read backend pivot') });
  const result = r.waterfall.resolveIntextGexpDisplayFloor();
  assert.equal(result.source, 'gexp-config-fallback'); assert.equal(result.index, 5); assert.equal(result.value, 0.30);
  assert.equal(result.pivotResult, null); assert.equal(result.gexpRuntimeEnabled, false);
  assert.equal(gexp.enabled, false); assert.equal(wa.state.windowStart, -1);
});

test('Marca legacy still runs real GEXP request and WindowArray request lifecycle', async () => {
  const r = setup({ psp: false, bids: [bid('IX', 0.42, '0.40')] });
  const { wa, gexp } = attachExistingGexp(r, { floor: 0.40 });
  // Match the real no-bid checkPrebid quartet instead of the fixture's minimal stub.
  wa.checkPrebid = () => ({ rndp: '-1', sj: '-1' });
  const winner = (await r.auction()).displayBid;
  assert.equal(r.events('intext_prebid_floor_audit_start')[0].floorSource, 'gexp-effective-price');
  assert.equal(r.events('intext_prebid_floor_audit_start')[0].floorValue, 0.40);
  try {
    await r.node.askDisplay(winner, 1, 'display_only');
    const snapshot = r.refreshSnapshots[0];
    assert.deepEqual(snapshot.gexp_floor, ['0.4']);
    assert.deepEqual(snapshot.random1, [gexp.getRandom(1)]);
    assert.deepEqual(snapshot.sj, ['-1']); assert.deepEqual(snapshot.rndp, ['-1']);
    assert.ok(r.operations.some(op => op[0] === 'refresh'));
    assert.equal(r.events('intext_gexp_floor_propagation_audit')[0].status, 'propagated');
    assert.equal(wa.state.lastPrice, 0.40);
  } finally { clearTimeout(wa.loadWatchdog); }
});

test('pricing helper contains no floor literals, backend pivot structure, slot targeting or pbDefaultFloor', () => {
  const blocks = ['_gam_kv_.js', 'IntextManager.js'].map(file => {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    return source.slice(source.indexOf('  resolveIntextGexpDisplayFloor('), source.indexOf('  getIntextDisplayFloorInfo('));
  });
  assert.equal(blocks[0].replace(/\r\n/g, '\n'), blocks[1].replace(/\r\n/g, '\n'));
  for (const block of blocks) {
    assert.doesNotMatch(block, /\b(?:0\.\d+|pbDefaultFloor|pp2|\.p1\b|getTargeting|setTargeting|pbjs|Math\.random)\b/);
    assert.doesNotMatch(block, /\.(?:initPrice|getBasePrice|getNextPrice)\s*\(/);
  }
});
