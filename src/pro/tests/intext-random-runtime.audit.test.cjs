const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const keys = ['random1', 'random2', 'random3', 'random4'];
const quartet = [4, 12, 16, 8];
const version = '2026.10.02-p0-random-slot';
function between(source, start, end) {
  const from = source.indexOf(start), to = source.indexOf(end, from);
  assert.ok(from >= 0 && to > from, `missing boundaries ${start}/${end}`);
  return source.slice(from, to);
}
function slot(id, values = quartet, position = 'r') {
  return {
    id, values, writes: 0,
    getSlotElementId() { return this.id; },
    getTargeting(key) {
      if (key === 'p') return [position];
      const i = keys.indexOf(key);
      return i >= 0 && this.values[i] !== undefined ? [this.values[i]] : [];
    },
    setTargeting() { this.writes++; throw new Error('native slot mutation'); },
  };
}
function harness(file, options = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const logs = [], commands = [], blobs = [];
  const calls = { wrappers: 0, prebid: 0, aps: 0, gpt: 0, video: 0, gexp: 0, proxy: 0 };
  const native = options.slots || [slot('native-r')];
  const page = options.page || [];
  const pubads = { getSlots: () => native, getTargeting: (key) => page[keys.indexOf(key)] === undefined ? [] : [page[keys.indexOf(key)]] };
  const real = { apiReady: true, pubadsReady: true, pubads: () => pubads, defineSlot() { calls.gpt++; }, display() { calls.gpt++; }, destroySlots() {} };
  const proxy = { __ctrl: options.inner ? { innerObject: real } : { baseObject: real }, cmd: { push: fn => commands.push(fn) }, pubads() { calls.proxy++; throw new Error('proxy random read'); } };
  const window = {
    gexpIntextDebug: true, location: { hostname: 'www.marca.com', href: 'https://www.marca.com/article', origin: 'https://www.marca.com', pathname: '/article' },
    googletag: options.psp === false ? { ...real, cmd: proxy.cmd } : proxy,
    pbjs: { __ctrl: { realObj: { que: [], requestBids() { calls.prebid++; } } } },
    apstag: { __ctrl: { realObj: { fetchBids() { calls.aps++; }, setDisplayBids() {} } } },
  };
  const document = { readyState: 'complete', cookie: '', getElementById: () => null, body: { appendChild() {} }, createElement: () => ({ style: {}, click() {}, remove() {} }) };
  class DebugURL extends URL {}
  DebugURL.createObjectURL = blob => { blobs.push(blob.content); return 'blob:test'; };
  DebugURL.revokeObjectURL = () => {};
  const context = vm.createContext({ window, document, googletag: window.googletag, URL: DebugURL, URLSearchParams,
    console: { log: (...args) => logs.push(args), warn: (...args) => logs.push(args), error: (...args) => logs.push(args), groupCollapsed() {}, groupEnd() {} },
    setTimeout, clearTimeout, ensureBaseStyles() {}, Blob: class { constructor(parts) { this.content = parts.join(''); this.size = this.content.length; } },
  });
  vm.runInContext(`const GEXP_INTEXT_VERSION = ${JSON.stringify(version)}; window.__gexpIntextVersion = GEXP_INTEXT_VERSION;`, context);
  vm.runInContext(between(source, 'const badgeLog', 'const INTEXT_RANDOM_KEYS'), context);
  const Manager = vm.runInContext(between(source, 'const INTEXT_RANDOM_KEYS', 'class IntextPlacementEngine') + '; IntextManager', context);
  const Node = vm.runInContext(between(source, 'class IntextNode', 'class IntextContainer') + '; IntextNode', context);
  const manager = Object.create(Manager.prototype);
  manager.nodes = [];
  manager.config = {};
  manager.siteContext = { site: 'www.marca.com', contentType: 'noticia' };
  manager.siteConfig = { inclusions: { keyValues: { random1: [options.inclusion || '4'] } } };
  manager.gexp = {
    dualMode: options.dualMode === true,
    getRandom(i) { calls.gexp++; return [8, 17, 3, 11][i - 1]; },
    isEnabled: () => true,
  };
  manager.registerIntextDiagnosticEvent = event => logs.push([event.diagnosticKey, event]);
  manager.registerIntextManagerDecision = decision => logs.push(['decision', decision]);
  let time = 0;
  const readiness = { now: () => time, wait: async ms => { time += ms; options.tick?.(time, native, real); } };
  return { source, Manager, Node, manager, context, window, real, pubads, native, calls, logs, commands, blobs, readiness, elapsed: () => time,
    resolve: () => manager.waitForIntextRandomSnapshotReady(readiness),
  };
}

for (const file of ['IntextManager.js', '_gam_kv_.js']) {
  const hardDeadline = file === '_gam_kv_.js' ? 2000 : 600;
  const check = (name, fn) => test(`${file}: ${name}`, fn);
  check('native=4 / GEXP=8 / Intext=4; immutable canonical reference, read only', async () => {
    const h = harness(file); const snapshot = await h.resolve();
    assert.equal(snapshot.source, 'gpt-native-slot-targeting');
    assert.deepEqual(keys.map(key => snapshot[key]), quartet.map(String));
    assert.deepEqual(Array.from(h.manager.intextRandomReferenceSlotIds), ['native-r']);
    assert.equal(h.calls.gexp, 0); assert.equal(h.calls.proxy, 0); assert.equal(h.native[0].writes, 0);
    assert.ok(Object.isFrozen(snapshot)); assert.equal(h.elapsed(), 25);
    assert.equal(h.manager.gexp.getRandom(1), 8);
    h.native[0].values = [9, 9, 9, 9];
    assert.equal(await h.resolve(), snapshot); assert.equal(h.manager.captureIntextRandomSnapshot(), snapshot);
  });
  for (const { inclusion, conflict } of [{ inclusion: '8' }, { inclusion: '4' }, { inclusion: '4', conflict: true }]) check(`real constructor inclusion random1=${inclusion}${conflict ? ' unresolved conflict' : ''} gates wrappers and requests`, async () => {
    const h = harness(file, { inclusion, ...(conflict ? { slots: [slot('a'), slot('b', [8, 12, 16, 8])] } : {}) }); const p = h.Manager.prototype;
    p.getSiteContext = () => h.manager.siteContext;
    p.resolveSiteConfig = () => h.manager.siteConfig;
    p.extractStaticAdUnitPath = () => '/99071977/test/n';
    p.resolveIntextRequestNetworkId = () => '99071977';
    p.resolveAdUnit = () => true;
    p.detectContentType = () => 'noticia';
    p.resolveContentTypeProfile = config => config;
    p.isContentTypeAllowed = () => true;
    p.isBlockedByExclusionsAfterTargetingReady = async () => false;
    p.shouldBlockIntextByFallbackBlankControl = () => false;
    p.registerIntextManagerDecision = h.manager.registerIntextManagerDecision;
    p.registerIntextDiagnosticEvent = h.manager.registerIntextDiagnosticEvent;
    p.createIntextPositions = function () {
      h.calls.wrappers++;
      const target = { values: {}, setTargeting(key, value) { this.values[key] = value; } };
      h.Node.prototype.applyIntextRandomSnapshotToSlot.call({ manager: this }, target);
      assert.deepEqual(keys.map(key => target.values[key]), quartet.map(String));
      return { placed: 1 };
    };
    const originalWait = p.waitForIntextRandomSnapshotReady;
    p.waitForIntextRandomSnapshotReady = function () { return originalWait.call(this, h.readiness); };
    const manager = new h.Manager({}, h.manager.gexp);
    assert.equal(h.commands.length, 1); await h.commands[0]();
    assert.equal(manager.intextRandomSnapshot.random1, conflict ? '' : '4');
    assert.equal(h.calls.wrappers, inclusion === '4' && !conflict ? 1 : 0);
    if (conflict) {
      assert.equal(h.elapsed(), hardDeadline);
      assert.ok(h.logs.some(args => args[0] === 'decision' && args[1].reason === 'random-snapshot-unresolved'));
    }
    for (const kind of ['prebid', 'aps', 'gpt', 'video', 'gexp', 'proxy']) assert.equal(h.calls[kind], 0, kind);
  });
  check('late targeting freezes at 100ms without GEXP access', async () => {
    const h = harness(file, { slots: [slot('native-r', [])], tick: (time, slots) => { if (time === 75) slots[0].values = quartet; } });
    assert.equal((await h.resolve()).random1, '4'); assert.equal(h.elapsed(), 100); assert.equal(h.calls.gexp, 0);
  });
  check(`conflict waits ${hardDeadline}ms and page fallback cannot mask it`, async () => {
    const h = harness(file, { slots: [slot('a'), slot('b', [8, 12, 16, 8])], page: quartet });
    assert.equal((await h.resolve()).source, 'unresolved'); assert.equal(h.elapsed(), hardDeadline);
    const conflictLogs = h.logs.filter(args => String(args[0]).includes('intext_random_native_slot_conflict'));
    if (file === '_gam_kv_.js') assert.equal(conflictLogs.length, 1);
    else assert.ok(conflictLogs.length > 1);
    assert.equal(h.calls.gexp, 0);
  });
  check('conflict can stabilize inside readiness', async () => {
    const h = harness(file, { slots: [slot('a'), slot('b', [8, 12, 16, 8])], tick: (time, slots) => { if (time === 100) slots[1].values = quartet; } });
    assert.equal((await h.resolve()).source, 'gpt-native-slot-targeting'); assert.equal(h.elapsed(), 125);
  });
  check('compatible partial does not invalidate full candidate; contradictory partial blocks', async () => {
    const good = harness(file, { slots: [slot('partial', [4]), slot('full')] });
    assert.equal((await good.resolve()).source, 'gpt-native-slot-targeting');
    const bad = harness(file, { slots: [slot('partial', [8]), slot('full')], page: quartet });
    assert.equal((await bad.resolve()).source, 'unresolved');
  });
  check('partial quartets cannot be mixed and suppress page fallback', async () => {
    const h = harness(file, { slots: [slot('a', [4, 12]), slot('b', [undefined, undefined, 16, 8])], page: quartet });
    assert.equal((await h.resolve()).source, 'unresolved');
  });
  check('page fallback only after timeout with no usable native targeting', async () => {
    for (const slots of [[], [slot('empty', [])]]) {
      const h = harness(file, { slots, page: quartet });
      assert.equal((await h.resolve()).source, 'gpt-page-targeting-fallback'); assert.equal(h.elapsed(), hardDeadline);
      assert.equal(h.calls.gexp, 0);
    }
  });
  check('native slot wins over contradictory page targeting', async () => {
    const h = harness(file, { page: [8, 17, 3, 11] });
    assert.equal((await h.resolve()).source, 'gpt-native-slot-targeting');
    assert.equal(h.manager.getIntextRandomValue('random1'), '4');
    assert.equal(h.elapsed(), 25);
  });
  check('no valid quartet fails closed, including missing real GPT', async () => {
    const h = harness(file, { slots: [], page: [4, 12, 16] });
    assert.equal((await h.resolve()).source, 'unresolved');
    const missing = harness(file); missing.window.googletag.__ctrl = {};
    assert.equal((await missing.resolve()).source, 'unresolved'); assert.equal(missing.calls.gexp, 0);
  });
  check('Intext IDs, positions, and manager node IDs are excluded', async () => {
    const h = harness(file, { slots: [slot('gexp-intext', [8, 1, 1, 1]), slot('gexp-intext-2', [8, 1, 1, 1]), slot('other', [8, 1, 1, 1], 'gexp-intext-x'), slot('custom', [8, 1, 1, 1]), slot('native-r')] });
    h.manager.nodes.push({ id: 'custom' });
    assert.equal((await h.resolve()).random1, '4');
  });
  check('slot ID changes reset stability; ordering does not', async () => {
    const h = harness(file, { tick: (time, slots) => { if (time === 25) slots.push(slot('late')); } });
    await h.resolve(); assert.equal(h.elapsed(), 50);
    const order = harness(file, { slots: [slot('a'), slot('b')], tick: (_, slots) => slots.reverse() });
    await order.resolve(); assert.equal(order.elapsed(), 25);
  });
  check('PSP innerObject and dualMode use native cohort', async () => {
    for (const options of [{ inner: true }, { psp: false, dualMode: true }]) {
      const h = harness(file, options); assert.equal((await h.resolve()).random1, '4'); assert.equal(h.calls.gexp, 0);
    }
  });
  check('owner random remains synchronous, no bounded wait', () => {
    const h = harness(file, { psp: false });
    const snapshot = h.manager.captureIntextRandomSnapshot();
    assert.equal(snapshot.random1, '8'); assert.equal(snapshot.source, 'gexp-owner-random');
    assert.equal(h.calls.gexp, 4); assert.equal(h.elapsed(), 0);
  });
  check('strict validity rejects missing, NaN, fractional and out of range values', async () => {
    for (const value of ['', null, undefined, NaN, 0, 21, 1.5, true, 'undefined']) {
      const h = harness(file, { slots: [slot('native', [value, 12, 16, 8])] });
      assert.equal((await h.resolve()).source, 'unresolved', String(value));
    }
  });
  check('stability ignores external GEXP; real drift deduped by fingerprint', async () => {
    const h = harness(file); const snapshot = await h.resolve();
    assert.equal(h.manager.validateIntextRandomSnapshotStability(), true); assert.equal(h.calls.gexp, 0);
    h.native[0].values = [8, 12, 16, 8];
    for (let i = 0; i < 100; i++) assert.equal(h.manager.validateIntextRandomSnapshotStability('refresh-' + i), false);
    assert.equal(h.window.gexpIntextDebugTools.getLogs().filter(entry => entry.message === '[IntextManager] intext_random_canonical_drift').length, 1);
    assert.equal(h.manager.intextRandomSnapshot, snapshot);
  });
  check('runtime identity, export JSON, version telemetry and allowlist', async () => {
    const h = harness(file); await h.resolve();
    h.manager.recordIntextRuntimeIdentity(); h.manager.recordIntextRuntimeIdentity();
    assert.equal(h.window.__gexpIntextVersion, version);
    assert.equal(h.logs.filter(args => String(args[0]).includes('intext_runtime_identity')).length, 1);
    assert.equal(h.window.__gexpIntextRuntime.randomSource, 'gpt-native-slot-targeting');
    assert.equal(h.manager.getIntextRandomTelemetry()['gexp-intext-version'], version);
    const node = Object.create(h.Node.prototype); node.manager = h.manager;
    assert.ok(node.getStandardIntextTelemetryAllowlist().has('gexp-intext-version'));
    vm.runInContext('intextDebugCollector.attachManager(window.manager)', Object.assign(h.context, { window: Object.assign(h.window, { manager: h.manager }) }));
    h.window.gexpIntextDebugTools.downloadJSON();
    const pkg = JSON.parse(h.blobs[0]);
    assert.equal(pkg.schemaVersion, '1.0.0'); assert.equal(pkg.runtime.gexpIntextVersion, version);
    assert.equal(pkg.runtime.pspDetected, true); assert.equal(pkg.runtime.dualMode, false);
  });
  check('GPT, Prebid, APS runtime logs once per state; ready transition logs again', () => {
    const h = harness(file);
    for (let i = 0; i < 100; i++) { h.manager.resolveIntextGptApi(); h.manager.resolveIntextPrebidApi(); h.manager.resolveIntextApstagApi(); }
    for (const kind of ['gpt', 'prebid', 'apstag']) {
      for (const event of ['runtime_resolved', 'proxy_detected']) assert.equal(h.logs.filter(args => String(args[0]).includes(`intext_${kind}_${event}`)).length, 1);
    }
    h.real.pubadsReady = false; h.manager.resolveIntextGptApi(); h.real.pubadsReady = true; h.manager.resolveIntextGptApi();
    assert.equal(h.logs.filter(args => String(args[0]).includes('intext_gpt_runtime_resolved')).length, 3);
    for (const [property, kind] of [['pbjs', 'prebid'], ['apstag', 'apstag']]) {
      h.window[property].__ctrl.realObj = {};
      for(let i=0;i<3;i++) h.manager[property === 'pbjs' ? 'resolveIntextPrebidApi' : 'resolveIntextApstagApi']();
      assert.equal(h.logs.filter(args => String(args[0]).includes(`intext_${kind}_real_api_unavailable`)).length, 3);
    }
  });
  check('layout state dedupe preserves transitions and lifecycle events', () => {
    const h = harness(file);
    for (let i = 0; i < 100; i++) vm.runInContext(`logIntext('[Intext:Display:gexp-intext] display_wide_standard_layout_applied', {source:'guard-${i}', contentHeight:345, layout:'same', state:'same'})`, h.context);
    vm.runInContext("logIntext('[Intext:Display:gexp-intext] display_wide_standard_layout_applied', {source:'guard', contentHeight:600, layout:'same', state:'same'})", h.context);
    assert.equal(h.logs.filter(args => String(args[0]).includes('display_wide_standard_layout_applied')).length, 2);
    for (const event of ['auction', 'gpt_request', 'slotResponseReceived', 'slotRenderEnded', 'video_request', 'IMA', 'first-frame', 'fallback', 'sentinel', 'timeout', 'error', 'late_callback', 'refresh', 'PiP', 'intext_random_native_slot_conflict', 'intext_random_snapshot_unresolved']) {
      for (let i = 0; i < 3; i++) vm.runInContext(`logIntext('[Intext:Display:gexp-intext] ${event}', {value:1})`, h.context);
      assert.equal(h.logs.filter(args => String(args[0]).endsWith('] ' + event)).length, 3, event);
    }
    assert.doesNotMatch(h.source, /intext_telemetry_debug_passthrough/);
  });
  check('network repeated observations suppressed, errors remain visible', () => {
    const h = harness(file);
    for(let i=0;i<100;i++) h.manager.recordIntextNetworkDebug('intext_network_resolved', { source:'page-gpt-detected', requestNetworkId:'99071977' });
    h.manager.recordIntextNetworkDebug('intext_network_resolved', { source:'page-gpt-detected', requestNetworkId:'123' });
    assert.equal(h.logs.filter(args => String(args[0]).includes('intext_network_resolved')).length, 2);
    for(let i=0;i<3;i++) h.manager.recordIntextNetworkDebug('intext_network_force_invalid', {});
    assert.equal(h.logs.filter(args => String(args[0]).includes('intext_network_force_invalid')).length, 3);
  });
}

const conflictLogs = h => h.logs.filter(args => String(args[0]).includes('intext_random_native_slot_conflict'));
const randomEvents = (h, name) => h.window.gexpIntextDebugTools.getLogs().filter(entry => entry.message === `[IntextManager] ${name}`).map(entry => entry.args[0]);

test('random readiness PSP: production case resolves at 875ms after soft deadline', async () => {
  const h = harness('_gam_kv_.js', {
    slots: [slot('native-r', [])],
    tick: (time, slots) => {
      if (time === 600 || time === 800) {
        assert.equal(h.manager.intextRandomSnapshot, undefined);
        assert.equal(randomEvents(h, 'intext_random_snapshot_unresolved').length, 0);
      }
      if (time === 850) slots[0].values = quartet;
    },
  });
  const pending = h.resolve();
  assert.equal(h.resolve(), pending);
  const snapshot = await pending;
  assert.equal(snapshot.source, 'gpt-native-slot-targeting');
  assert.equal(h.elapsed(), 875);
  assert.equal(h.calls.gexp, 0);
  const events = randomEvents(h, 'intext_random_readiness_completed');
  assert.equal(events.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(events[0])), {
    elapsedMs: 875, source: 'gpt-native-slot-targeting', nativeSlots: 1,
    slotsWithAnyRandom: 1, completeSlots: 1, conflict: false, enteredGraceWindow: true,
  });
  assert.equal(randomEvents(h, 'intext_random_snapshot_unresolved').length, 0);
  h.native[0].values = [8, 17, 3, 11];
  await h.readiness.wait(2000);
  assert.equal(await h.resolve(), snapshot);
  assert.ok(Object.isFrozen(snapshot));
  assert.equal(randomEvents(h, 'intext_random_readiness_completed').length, 1);
});

test('random readiness PSP: fast path resolves at 75ms without grace', async () => {
  const h = harness('_gam_kv_.js', { slots: [slot('native-r', [])], tick: (time, slots) => {
    if (time === 50) slots[0].values = quartet;
  } });
  assert.equal((await h.resolve()).source, 'gpt-native-slot-targeting');
  assert.equal(h.elapsed(), 75);
  assert.equal(randomEvents(h, 'intext_random_readiness_completed')[0].enteredGraceWindow, false);
  assert.equal(h.calls.gexp, 0);
});

test('random readiness PSP: late stable quartet resolves immediately throughout grace', async () => {
  for (const stableAt of [425, 975, 1650, 2000]) {
    const h = harness('_gam_kv_.js', { slots: [slot('native-r', [])], tick: (time, slots) => {
      if (time === stableAt - 25) slots[0].values = quartet;
    } });
    assert.equal((await h.resolve()).source, 'gpt-native-slot-targeting');
    assert.equal(h.elapsed(), stableAt);
    assert.equal(randomEvents(h, 'intext_random_readiness_completed')[0].enteredGraceWindow, stableAt >= 600);
  }
});

test('random readiness PSP: hard timeout blocks real constructor and all downstream work', async () => {
  const h = harness('_gam_kv_.js', { slots: [slot('native-r', [4, 12])], page: quartet });
  const p = h.Manager.prototype;
  p.getSiteContext = () => h.manager.siteContext;
  p.resolveSiteConfig = () => h.manager.siteConfig;
  p.extractStaticAdUnitPath = () => '/99071977/test/n';
  p.resolveIntextRequestNetworkId = () => '99071977';
  p.resolveAdUnit = () => true;
  p.detectContentType = () => 'noticia';
  p.resolveContentTypeProfile = config => config;
  p.isContentTypeAllowed = () => true;
  p.isBlockedByExclusionsAfterTargetingReady = async () => false;
  p.shouldBlockIntextByFallbackBlankControl = () => false;
  p.registerIntextManagerDecision = h.manager.registerIntextManagerDecision;
  p.registerIntextDiagnosticEvent = h.manager.registerIntextDiagnosticEvent;
  p.createIntextPositions = () => {
    for (const kind of ['wrappers', 'prebid', 'aps', 'gpt', 'video']) h.calls[kind]++;
    return { placed: 1 };
  };
  const originalWait = p.waitForIntextRandomSnapshotReady;
  p.waitForIntextRandomSnapshotReady = function () { return originalWait.call(this, h.readiness); };
  const manager = new h.Manager({}, h.manager.gexp);
  await h.commands[0]();
  assert.equal(h.elapsed(), 2000);
  assert.equal(manager.intextRandomSnapshot.source, 'unresolved');
  assert.ok(h.logs.some(args => args[0] === 'decision' && args[1].decision === 'blocked' && args[1].reason === 'random-snapshot-unresolved'));
  for (const kind of ['wrappers', 'prebid', 'aps', 'gpt', 'video', 'gexp', 'proxy']) assert.equal(h.calls[kind], 0, kind);
  const unresolved = randomEvents(h, 'intext_random_snapshot_unresolved');
  assert.equal(unresolved.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(unresolved[0])), {
    reason: 'random-snapshot-unresolved', elapsedMs: 2000, nativeSlots: 1,
    slotsWithAnyRandom: 1, completeSlots: 0, conflict: false, enteredGraceWindow: true,
    observedKeysBySlot: [{ slotId: 'native-r', keys: ['random1', 'random2'] }],
  });
  assert.equal(randomEvents(h, 'intext_random_readiness_completed').length, 0);
});

test('random readiness PSP: conflict fails closed at hard deadline with one conflict log', async () => {
  const h = harness('_gam_kv_.js', { slots: [slot('a'), slot('b', [8, 12, 16, 8])], page: quartet });
  assert.equal((await h.resolve()).source, 'unresolved');
  assert.equal(h.elapsed(), 2000);
  assert.equal(conflictLogs(h).length, 1);
  const event = randomEvents(h, 'intext_random_snapshot_unresolved')[0];
  assert.equal(event.conflict, true);
  assert.equal(event.completeSlots, 2);
  assert.equal(event.enteredGraceWindow, true);
  assert.equal(randomEvents(h, 'intext_random_readiness_completed').length, 0);
  assert.equal(h.calls.gexp, 0);
});

test('random readiness: legacy owner random remains synchronous without grace', () => {
  const h = harness('_gam_kv_.js', { psp: false });
  assert.equal(h.manager.requiresIntextNativeRandom(), false);
  const snapshot = h.manager.captureIntextRandomSnapshot();
  assert.equal(snapshot.source, 'gexp-owner-random');
  assert.equal(h.elapsed(), 0);
  assert.equal(h.calls.gexp, 4);
  assert.equal(h.manager.captureIntextRandomSnapshot(), snapshot);
  assert.equal(randomEvents(h, 'intext_random_readiness_completed').length, 0);
});

test('random readiness PSP: page fallback only at hard deadline without native random', async () => {
  const h = harness('_gam_kv_.js', { slots: [slot('empty', [])], page: quartet });
  assert.equal((await h.resolve()).source, 'gpt-page-targeting-fallback');
  assert.equal(h.elapsed(), 2000);
  const event = randomEvents(h, 'intext_random_readiness_completed')[0];
  assert.equal(event.source, 'gpt-page-targeting-fallback');
  assert.equal(event.nativeSlots, 1);
  assert.equal(event.slotsWithAnyRandom, 0);
  assert.equal(event.completeSlots, 0);
  assert.equal(event.conflict, false);
  assert.equal(event.enteredGraceWindow, true);
});

const layoutLogs = h => h.window.gexpIntextDebugTools.getLogs().filter(entry => entry.message.includes('display_wrapper_total_height_applied'));
function emitLayout(h, details = {}) {
  h.context.layoutDetails = { contentHeight: 250, totalHeight: 270, ...details };
  vm.runInContext("logIntext('[Intext:Display:gexp-intext] display_wrapper_total_height_applied', layoutDetails)", h.context);
}
function attachLayoutNode(h) {
  const node = { id: 'gexp-intext', _intextTelemetryCycleId: 1, _activeRenderToken: 1 };
  h.manager.nodes.push(node);
  h.manager.recordIntextRuntimeIdentity();
  return node;
}

test('Intext diagnostics: identical random conflict across 20 polls logs once', async () => {
  const h = harness('_gam_kv_.js', {
    slots: [slot('a'), slot('b', [8, 12, 16, 8])],
    tick: (time, slots) => { if (time === 500) slots[1].values = quartet; },
  });
  assert.equal((await h.resolve()).source, 'gpt-native-slot-targeting');
  assert.equal(h.elapsed(), 525);
  assert.equal(conflictLogs(h).length, 1);
});

test('Intext diagnostics: changed conflicting values or slot identity log again', async () => {
  const h = harness('_gam_kv_.js', {
    slots: [slot('a'), slot('b', [8, 12, 16, 8])],
    tick: (time, slots) => {
      slots.reverse();
      const conflicting = slots.find(s => s.id !== 'a');
      if (time === 250) conflicting.values = [9, 12, 16, 8];
      if (time === 500) conflicting.id = 'c';
    },
  });
  assert.equal((await h.resolve()).source, 'unresolved');
  assert.equal(h.elapsed(), 2000);
  assert.equal(conflictLogs(h).length, 3);
});

test('Intext diagnostics: runtime identity waits for definitive initial random', async () => {
  const h = harness('_gam_kv_.js');
  h.manager.recordIntextRuntimeIdentity();
  assert.equal(h.window.__gexpIntextRuntime.randomSource, 'unresolved');
  assert.equal(h.logs.filter(args => String(args[0]).includes('intext_runtime_identity')).length, 0);
  await h.resolve();
  h.manager.recordIntextRuntimeIdentity(); h.manager.recordIntextRuntimeIdentity();
  const entries = h.window.gexpIntextDebugTools.getLogs().filter(entry => entry.message.includes('intext_runtime_identity'));
  assert.equal(entries.length, 1);
  assert.equal(entries[0].args[0].randomSource, 'gpt-native-slot-targeting');
});

test('Intext diagnostics: identical visual state in same explicit render dedupes guards', () => {
  const h = harness('_gam_kv_.js');
  for (const source of ['post_guard_300', 'post_guard_900', 'post_guard_1500']) {
    emitLayout(h, { slotId: 'gexp-intext', cycleId: 1, renderToken: 1, source });
  }
  assert.equal(layoutLogs(h).length, 1);
});

test('Intext diagnostics: same layout in new node cycle or render logs again', () => {
  const h = harness('_gam_kv_.js'); const node = attachLayoutNode(h);
  emitLayout(h); emitLayout(h);
  node._activeRenderToken = 2;
  emitLayout(h); emitLayout(h);
  node._intextTelemetryCycleId = 2;
  emitLayout(h); emitLayout(h);
  assert.equal(layoutLogs(h).length, 3);
});

test('Intext diagnostics: clear resets fingerprints and suppression counters', () => {
  const h = harness('_gam_kv_.js'); attachLayoutNode(h);
  emitLayout(h); emitLayout(h);
  h.manager.logIntextState('[IntextManager] test_state', { ready: true });
  h.manager.logIntextState('[IntextManager] test_state', { ready: true });
  assert.equal(vm.runInContext('intextSuppressedStateLogs', h.context), 1);
  assert.equal(h.manager._intextSuppressedDuplicateLogs, 1);
  assert.equal(h.window.gexpIntextDebugTools.clear(), true);
  assert.equal(vm.runInContext('intextStateLogFingerprints.size', h.context), 0);
  assert.equal(vm.runInContext('intextSuppressedStateLogs', h.context), 0);
  assert.equal(h.manager._intextStateLogFingerprints.size, 0);
  assert.equal(h.manager._intextSuppressedDuplicateLogs, 0);
  assert.equal(h.window.gexpIntextDebugTools.getLogs().length, 0);
  emitLayout(h);
  assert.equal(layoutLogs(h).length, 1);
  assert.equal(h.manager.logIntextState('[IntextManager] test_state', { ready: true }), true);
});

test('bundle scope: exterior code matches the CURRENT baseline across checkout line endings', () => {
  const source = fs.readFileSync(path.join(root, '_gam_kv_.js'), 'utf8');
  const prefix = source.slice(0, source.indexOf('const GEXP_INTEXT_VERSION'));
  const suffix = source.slice(source.indexOf('class WPromise'));
  const hash = text => crypto.createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex');
  assert.equal(hash(prefix), 'aecd4e7c4e9d2cd9b80115845ffa72435e666455c94264162bfdac4bd6537f5c');
  assert.equal(hash(suffix), '1cde1c02edbc17f66be896943faa2e460aed3b61e32dfe21da74b90884fdad25');
});
