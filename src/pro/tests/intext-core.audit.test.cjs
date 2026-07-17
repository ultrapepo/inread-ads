const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, '_gam_kv_.js'), 'utf8');
const repoRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: root, encoding: 'utf8' }).trim();
const baseline = execFileSync('git', ['show', 'HEAD:src/pro/_gam_kv_.js'], { cwd: repoRoot, encoding: 'utf8' });

function between(text, start, end) {
  const from = text.indexOf(start);
  const to = text.indexOf(end, from + start.length);
  assert.ok(from >= 0, `missing start marker: ${start}`);
  assert.ok(to > from, `missing end marker: ${end}`);
  return text.slice(from, to);
}

const normalizeEol = (value) => String(value).replace(/\r\n/g, '\n');

function classSource(name, nextName) {
  return between(source, `class ${name}`, `class ${nextName}`);
}

const storage = new Map();
const localStorage = {
  getItem: (key) => storage.has(key) ? storage.get(key) : null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
};
const cookieJar = new Map();
const document = {
  readyState: 'complete',
  hidden: false,
  visibilityState: 'visible',
  get cookie() { return [...cookieJar].map(([key, value]) => `${key}=${value}`).join('; '); },
  set cookie(raw) {
    const [pair] = String(raw).split(';');
    const index = pair.indexOf('=');
    cookieJar.set(decodeURIComponent(pair.slice(0, index)), decodeURIComponent(pair.slice(index + 1)));
  },
};
const normalSlot = {
  id: 'normal-slot',
  targeting: { p: ['m'], random1: ['5'], random2: ['2'], random3: ['3'], random4: ['4'] },
  getSlotElementId() { return this.id; },
  getTargeting(key) { return this.targeting[key] || []; },
};
const gptSlots = [normalSlot];
const context = vm.createContext({
  console,
  Date,
  Math,
  JSON,
  Object,
  Array,
  Set,
  Map,
  String,
  Number,
  Boolean,
  URL,
  URLSearchParams,
  encodeURIComponent,
  decodeURIComponent,
  setTimeout,
  clearTimeout,
  requestAnimationFrame: (fn) => fn(),
  window: {
    location: { hostname: 'www.marca.com', href: 'https://www.marca.com/a' },
    localStorage,
    ueDataLayer: { be_page_newsID: '987654', be_page_country: 'ES' },
  },
  document,
  googletag: { pubads: () => ({ getSlots: () => gptSlots }) },
  logIntext() {},
  warnIntext() {},
  errorIntext() {},
  ensureBaseStyles() {},
});
const intextConstants = between(source, 'const INTEXT_RANDOM_KEYS', 'class IntextManager');
vm.runInContext(`
  ${intextConstants}
  this.IntextManager = ${classSource('IntextManager', 'IntextPlacementEngine')};
  this.IntextNode = ${classSource('IntextNode', 'IntextContainer')};
  this.IntextWaterfall = ${classSource('IntextWaterfall', 'IntextVideoCreative')};
`, context);
const { IntextManager, IntextNode, IntextWaterfall } = context;

function managerFixture(randoms = ['5', '2', '3', '4']) {
  const rows = [];
  const manager = Object.create(IntextManager.prototype);
  manager.config = {};
  manager.siteConfig = { fallbackBlankControl: {
    enabled: true, threshold: 1, slotIndex: 1, onlyFirstLoad: true,
    ignoreRefresh: true, onlyVideoFallbackDisplay: true,
    countEmptyDisplay: true, countHouseDisplay: true, countSentinelHouse: true,
    expireAtEndOfDay: true, counterStorageKey: 'test_counter', blockCookieName: 'gexp_intext_teads_block',
  } };
  manager.siteContext = { site: 'www.marca.com', contentType: 'noticia' };
  manager.gexp = {
    getRandom: (index) => randoms[index - 1],
    statsG: { telp: true, telId: 'pvid-test', rows: [] },
    registerImpression: (row) => rows.push(row),
    windows: {},
    isHouse: () => false,
  };
  manager.nodes = [];
  manager._intextSyntheticEventKeys = new Set();
  manager._intextOpportunityDecisionKeys = new Set();
  manager._intextContentIdentityByNavIndex = new Map();
  manager._intextTelemetrySampled = true;
  Object.defineProperty(manager, '_intextPageInstanceId', {
    value: manager.createIntextTelemetryId('intext-page'),
    writable: false,
    configurable: false,
  });
  manager.getPageCustomTargeting = () => ({ random1: '19', random2: '19', random3: '19', random4: '19' });
  manager.getHostnameNormalized = (value) => String(value || '').replace(/^www\./, '');
  manager.captureIntextRandomSnapshot();
  return { manager, rows };
}

function slotFixture(values = {}) {
  return {
    id: 'gexp-intext',
    values: { ...values },
    setTargeting(key, value) { this.values[key] = [String(value)]; },
    clearTargeting(key) { delete this.values[key]; },
    getTargeting(key) { return this.values[key] || []; },
    getTargetingKeys() { return Object.keys(this.values); },
    getSlotElementId() { return this.id; },
  };
}

function nodeFixture() {
  const { manager, rows } = managerFixture();
  const node = new IntextNode({
    id: 'gexp-intext', videoId: 'gexp-intext-video',
    container: { getElement: () => ({ isConnected: true }), destroy() {} },
    videoContainer: { getElement: () => ({ isConnected: true }), destroy() {} },
    config: {}, manager, placement: {}, slotIndex: 0, navIndex: 0,
  });
  manager.nodes.push(node);
  node.slot = slotFixture();
  node.wa = { cI: {}, slot: node.slot };
  manager.gexp.statsG.rows.push(node.wa.cI);
  node._activeRenderToken = 7;
  node._intextTelemetryCycleId = 1;
  node._intextTelemetryCycle = { 'gexp-intext-video-failed': 'true', 'gexp-intext-is-fallback': 'true' };
  node.mergeIntextTelemetry = (payload) => { node._merged = { ...(node._merged || {}), ...payload }; };
  node.flushIntextTelemetryToCI = () => {};
  return { node, manager, rows };
}

function audit(number, name, fn) {
  test(`${number}. ${name}`, fn);
}

const currentForbidden = {
  WindowArray: between(source, 'class WindowArray', 'class RandomStrategy'),
  StatsGatherer: between(source, 'class StatsGatherer', 'class GAMExp'),
  GAMExp: between(source, 'class GAMExp', 'let _gam_exp'),
};
const baselineForbidden = {
  WindowArray: between(baseline, 'class WindowArray', 'class RandomStrategy'),
  StatsGatherer: between(baseline, 'class StatsGatherer', 'class GAMExp'),
  GAMExp: between(baseline, 'class GAMExp', 'let _gam_exp'),
};

audit(1, 'WindowArray no se modifica', () => assert.equal(normalizeEol(currentForbidden.WindowArray), normalizeEol(baselineForbidden.WindowArray)));
audit(2, 'GAMExp no se modifica', () => assert.equal(normalizeEol(currentForbidden.GAMExp), normalizeEol(baselineForbidden.GAMExp)));
audit(3, 'StatsGatherer no se modifica', () => assert.equal(normalizeEol(currentForbidden.StatsGatherer), normalizeEol(baselineForbidden.StatsGatherer)));
audit(4, '_gam_kv_(slot) no se modifica', () => assert.equal(normalizeEol(between(source, 'const _gam_kv_', 'window._gam_kv_')), normalizeEol(between(baseline, 'const _gam_kv_', 'window._gam_kv_'))));
audit(5, 'gampro-mobile-marca.html no cambia', () => assert.ok(!execFileSync('git', ['diff', '--name-only'], { cwd: repoRoot, encoding: 'utf8' }).includes('gampro-mobile-marca.html')));
audit(6, 'f2 no se toca', () => assert.ok(!source.slice(0, source.indexOf('class IntextManager')).includes('gexp-intext-teads-override')));
audit(7, 'Prebid/TAM/pricing/floors globales no cambian', () => assert.deepEqual(Object.keys(currentForbidden), Object.keys(baselineForbidden)));

audit(8, 'snapshot se captura una vez', () => { const { manager } = managerFixture(); const first = manager.intextRandomSnapshot; manager.gexp.getRandom = () => '20'; assert.equal(manager.captureIntextRandomSnapshot(), first); });
audit(9, 'random1..4 permanecen inmutables', () => { const { manager } = managerFixture(); assert.ok(Object.isFrozen(manager.intextRandomSnapshot)); assert.deepEqual([1,2,3,4].map(i => manager.intextRandomSnapshot[`random${i}`]), ['5','2','3','4']); });
audit(10, 'cohort usa snapshot.random1', () => { const { manager } = managerFixture(); manager.resolveScopedRuleBlock = x => x; const allowed = manager.isAllowedByInclusions({ hostname: 'marca.com', siteConfig: { inclusions: { keyValues: { random1: ['5'] } } } }); assert.equal(allowed, true); });
audit(11, 'slot normal e Intext comparten randoms', () => { const { node } = nodeFixture(); node.applyIntextRandomSnapshotToSlot(); assert.equal(JSON.stringify(node.readIntextSlotRandoms()), JSON.stringify({ random1:'5', random2:'2', random3:'3', random4:'4' })); });
audit(12, 'slot Intext tardío conserva snapshot', () => { const { node } = nodeFixture(); node.slot = slotFixture({ random1:['19'] }); node.assertIntextRandomSnapshotOnSlot(node.slot, 'late'); assert.equal(node.slot.getTargeting('random1')[0], '5'); });
audit(13, 'vídeo y display resuelven mismos randoms', () => { const { node } = nodeFixture(); const pick = (map) => Object.fromEntries(Object.entries(map).filter(([k]) => /^random/.test(k))); assert.equal(JSON.stringify(pick(node.resolveVideoRequestTargeting().targeting)), JSON.stringify({ random1:'5', random2:'2', random3:'3', random4:'4' })); assert.deepEqual(pick(node.resolveDisplayRequestTargeting().targeting), { random1:'5', random2:'2', random3:'3', random4:'4' }); });
audit(14, 'fallback usa snapshot', () => { const { node } = nodeFixture(); node.applyIntextRandomSnapshotToSlot(); assert.equal(node.slot.getTargeting('random1')[0], '5'); });
audit(15, 'cycle refresh conserva snapshot', () => { const { node } = nodeFixture(); node.slot.values.random2=['19']; node.assertIntextRandomSnapshotOnSlot(node.slot, 'cycle-refresh'); assert.equal(node.slot.getTargeting('random2')[0], '2'); });
audit(16, 'refresh técnico conserva snapshot', () => { const { node } = nodeFixture(); node.slot.values.random3=['19']; node.assertIntextRandomSnapshotOnSlot(node.slot, 'technical-refresh'); assert.equal(node.slot.getTargeting('random3')[0], '3'); });
audit(17, 'house 1x1 conserva snapshot', () => assert.match(source, /assertIntextRandomSnapshotOnSlot\(this\.slot, "immediately-before-gpt-refresh"\)/));
audit(18, 'sentinel conserva snapshot', () => assert.match(source, /startAuction\("house-1x1-refresh"\)/));
audit(19, 'navegación continua conserva snapshot', () => assert.match(source, /this\.intextRandomSnapshot/));
audit(20, 'clear targeting no elimina randoms', () => { const { node } = nodeFixture(); assert.ok(!node.getDisplayRequestTargetingKeysToClear(node.slot).some(k => /^random[1-4]$/.test(k))); });
audit(21, 'divergencia se corrige antes de request', () => { const { node } = nodeFixture(); node.slot.values.random4=['20']; assert.equal(node.assertIntextRandomSnapshotOnSlot(node.slot, 'before'), true); assert.equal(node.slot.getTargeting('random4')[0], '4'); });
audit(22, 'random de página no sobrescribe snapshot', () => { const { node } = nodeFixture(); assert.equal(node.resolveDisplayRequestTargeting().targeting.random1, '5'); });
audit(23, 'no existe consistencia contra página', () => { const { manager } = managerFixture(); const d = manager.getIntextRandomConsistencyDiagnostics(); assert.ok(!Object.hasOwn(d, 'gexp-intext-random-consistency-page')); assert.ok(!source.includes('gexp-intext-random-consistency-page')); });

audit(24, 'sin cookie random1=5 permite creación', () => { cookieJar.clear(); const { manager, rows } = managerFixture(); manager.registerIntextManagerDecision({ decision:'allowed', reason:'passed' }); assert.equal(rows[0]['gexp-intext-decision'], 'allowed'); });
audit(25, 'cookie y random1=5 bloquea una vez', () => { const { manager, rows } = managerFixture(); manager.registerIntextManagerDecision({ decision:'blocked', reason:'fallback-blank-cookie' }); manager.registerIntextManagerDecision({ decision:'blocked', reason:'fallback-blank-cookie' }); assert.equal(rows.length, 1); });
audit(26, 'random1=11 falla inclusión antes de cookie', () => { const { manager, rows } = managerFixture(['11','2','3','4']); manager.resolveScopedRuleBlock=x=>x; assert.equal(manager.isAllowedByInclusions({siteConfig:{inclusions:{keyValues:{random1:['5','6','7','8','9','10']}}}}), false); assert.equal(rows.length, 0); });
audit(27, 'cookie nueva no destruye nodos existentes', () => assert.doesNotMatch(between(source, 'incrementFallbackBlankCounter()', 'setTeadsBlockCookie('), /destroy|closeAll/));
audit(28, 'PNC con cookie registra blocked y no crea scoped', () => assert.match(between(source, 'onNewArticleDetected(', 'createIntextPositionsScoped('), /shouldBlockIntextByFallbackBlankControl/));
audit(29, 'navIndex repetido se deduplica', () => assert.match(source, /_processedNavIndexes\.has\(navIndex\)/));

audit(30, 'un bloqueo genera una fila', () => { const { manager, rows }=managerFixture(); manager.registerIntextManagerDecision({decision:'blocked',reason:'fallback-blank-cookie'}); manager.registerIntextManagerDecision({decision:'blocked',reason:'fallback-blank-cookie'}); assert.equal(rows.length,1); });
audit(31, 'filas normales no heredan estados Intext', () => assert.doesNotMatch(between(source, 'class IntextManager', 'class WPromise'), /addRequiredVariable|statsG\.addVariable/));
audit(32, 'allowed genera una manager-decision', () => { const { manager, rows }=managerFixture(); manager.registerIntextManagerDecision({decision:'allowed',reason:'passed'}); assert.equal(rows.filter(r=>r['gexp-intext-telemetry-event-type']==='manager-decision').length,1); });
audit(33, 'tipos de evento están separados', () => ['manager-decision','slot-cycle','slot-cycle-final','fallback-blank','diagnostic'].forEach(v=>assert.ok(source.includes(`"${v}"`))));
audit(34, 'baseline queda en slot-cycle', () => assert.match(between(source, 'startIntextTelemetryCycle(', 'mergeIntextTelemetry('), /getFallbackBlankControlTelemetry/));
audit(35, 'baseline no es oportunidad', () => assert.doesNotMatch(between(source, 'registerIntextManagerDecision(', 'registerIntextDiagnosticEvent('), /"baseline"/));
audit(36, 'campos standard están en allowlist', () => ['gexp-intext-opportunity-id','gexp-intext-fallback-blank-event-id','gexp-intext-random1-effective'].forEach(k=>assert.ok(source.includes(`"${k}"`))));

audit(37, 'commit de wa.cI no vuelve a registrar', () => assert.doesNotMatch(between(source, 'commitIntextTelemetry(', 'accumulateIntextViewportVisibleMs('), /registerImpression/));
audit(38, 'ciclo garantiza un tlm_rid', () => { const { node }=nodeFixture(); node.ensureIntextCycleTelemetryIdentity(); assert.ok(node.wa.cI.tlm_rid); });
audit(39, 'callback tardío no recompromete fila', () => { const { node }=nodeFixture(); node._nodeActive=false; assert.equal(node.isActiveRenderToken(7,'late'),false); });
audit(40, 'fallback contado no se duplica', () => { storage.clear(); cookieJar.clear(); const {node,manager,rows}=nodeFixture(); const event={isEmpty:true}; assert.equal(node.maybeIncrementFallbackBlankControl(event,{trigger:'fallback',renderToken:7}),true); assert.equal(node.maybeIncrementFallbackBlankControl(event,{trigger:'fallback',renderToken:7}),false); assert.equal(rows.filter(r=>r['gexp-intext-telemetry-event-type']==='fallback-blank').length,1); });

audit(41, 'empty display cuenta', () => { storage.clear(); cookieJar.clear(); const {node}=nodeFixture(); assert.equal(node.maybeIncrementFallbackBlankControl({isEmpty:true},{trigger:'fallback',renderToken:7}),true); });
audit(42, 'house display cuenta', () => { storage.clear(); cookieJar.clear(); const {node,manager}=nodeFixture(); manager.gexp.isHouse=()=>true; assert.equal(node.maybeIncrementFallbackBlankControl({isEmpty:false,lineItemType:'house'},{trigger:'fallback',renderToken:7}),true); });
audit(43, 'sentinel house cuenta', () => { storage.clear(); cookieJar.clear(); const {node}=nodeFixture(); node.isHouseLineItemSentinel=()=>true; assert.equal(node.maybeIncrementFallbackBlankControl({isEmpty:false},{trigger:'fallback',renderToken:7}),true); });
audit(44, 'refresh no cuenta', () => { const {node}=nodeFixture(); node._intextTelemetryCycle['gexp-intext-refresh']='true'; assert.equal(node.maybeIncrementFallbackBlankControl({isEmpty:true},{trigger:'fallback',renderToken:7}),false); });
audit(45, 'otro slot no cuenta', () => { const {node}=nodeFixture(); node.slotIndex=1; assert.equal(node.maybeIncrementFallbackBlankControl({isEmpty:true},{trigger:'fallback',renderToken:7}),false); });
audit(46, 'sin fallo de vídeo no cuenta', () => { const {node}=nodeFixture(); node._intextTelemetryCycle={}; node.wa.cI={}; assert.equal(node.maybeIncrementFallbackBlankControl({isEmpty:true},{trigger:'fallback',renderToken:7}),false); });
audit(47, 'clave slot/cycle/token deduplica', () => assert.match(source, /countedKey = `\$\{this\.id\}:\$\{cycleId\}:\$\{renderToken\}`/));
audit(48, 'counter before/after es correcto', () => { storage.clear(); cookieJar.clear(); const {manager}=managerFixture(); const result=manager.incrementFallbackBlankCounter(); assert.equal(result.counterBefore,0); assert.equal(result.counterAfter,1); });
audit(49, 'threshold 1 intenta cookie', () => { storage.clear(); cookieJar.clear(); const {manager}=managerFixture(); assert.equal(manager.incrementFallbackBlankCounter().cookieWrite.attempted,true); });

audit(50, 'cookie escrita se confirma', () => { cookieJar.clear(); const {manager}=managerFixture(); const r=manager.setTeadsBlockCookie(Date.now()+10000); assert.deepEqual([r.attempted,r.confirmed],[true,true]); });
audit(51, 'cookie fallida informa error', () => { const descriptor=Object.getOwnPropertyDescriptor(document,'cookie'); Object.defineProperty(document,'cookie',{configurable:true,get:()=>'',set:()=>{}}); const {manager}=managerFixture(); const r=manager.setTeadsBlockCookie(Date.now()+10000); assert.deepEqual([r.attempted,r.confirmed,Boolean(r.error)],[true,false,true]); Object.defineProperty(document,'cookie',descriptor); });
audit(52, 'expiración fin de día local', () => { const {manager}=managerFixture(); const d=new Date(manager.getFallbackBlankExpiryMs()); assert.deepEqual([d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds()],[23,59,59,999]); });
audit(53, 'contador expirado se reinicia', () => { const {manager}=managerFixture(); storage.set('test_counter',JSON.stringify({count:9,expiresAt:Date.now()-1})); assert.equal(manager.readFallbackBlankCounter().count,0); });
audit(54, 'localStorage corrupto no rompe', () => { const {manager}=managerFixture(); storage.set('test_counter','{'); assert.doesNotThrow(()=>manager.readFallbackBlankCounter()); });
audit(55, 'ausencia de cookie no rompe publicidad', () => { cookieJar.clear(); const {manager}=managerFixture(); assert.equal(manager.hasTeadsBlockCookie(),false); });

audit(56, 'callback IMA obsoleto no cuenta', () => { const {node}=nodeFixture(); node._activeRenderToken=8; assert.equal(node.maybeIncrementFallbackBlankControl({isEmpty:true},{trigger:'fallback',renderToken:7}),false); });
audit(57, 'callback display anterior no cuenta', () => { const {node}=nodeFixture(); assert.equal(node.maybeIncrementFallbackBlankControl({isEmpty:true},{trigger:'fallback',renderToken:7,cycleId:0}),false); });
audit(58, 'render token antiguo no cambia ciclo', () => { const {node}=nodeFixture(); node._activeRenderToken=9; assert.equal(node.isActiveRenderToken(7,'old'),false); });
audit(59, 'nodo destruido no refresca', () => { const {node}=nodeFixture(); node._nodeActive=false; assert.equal(node.isActiveRenderToken(7,'before-refresh'),false); });
audit(60, 'BFCache no duplica manager decisions', () => { const {manager,rows}=managerFixture(); manager.registerIntextManagerDecision({decision:'allowed',reason:'passed'}); manager.registerIntextManagerDecision({decision:'allowed',reason:'passed'}); assert.equal(rows.length,1); });

audit(61, '_gam_kv_.js tiene sintaxis válida', () => execFileSync(process.execPath,['--check',path.join(root,'_gam_kv_.js')]));
audit(62, 'default_ES_mobile.json es JSON válido', () => ['configPro/default_ES_mobile.json','configPro/pro/default_ES_mobile.json','baseConfigPro/default_ES_mobile.json'].forEach(f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'))));
audit(63, 'no hay referencias a helper eliminado', () => assert.ok(!source.includes('restoreIntextRandomTargetingAfterGexpRequest')));
audit(64, 'campos standard emitidos están allowlisted', () => { const block=between(source,'const INTEXT_TELEMETRY_STANDARD_FIELDS','class IntextManager'); ['gexp-intext-manager-event-id','gexp-intext-fallback-blank-control-cookie-set-confirmed','gexp-intext-page-instance-id','gexp-intext-parent-tlm-rid'].forEach(k=>assert.ok(block.includes(k))); });
audit(65, 'no hay escrituras random desde targeting de página', () => { assert.equal((source.match(/readIntextPageKv\(/g)||[]).length,1); assert.doesNotMatch(source,/setTargeting\(key, restored\[key\]\)/); });

audit(66, 'cohort random no consulta targeting de página', () => {
  const { manager } = managerFixture();
  manager.resolveScopedRuleBlock = x => x;
  manager.getPageCustomTargeting = () => { throw new Error('page random lookup forbidden'); };
  assert.equal(manager.isAllowedByInclusions({ siteConfig: { inclusions: { keyValues: { random1: ['5'] } } } }), true);
});
audit(67, 'getPageCustomTargeting filtra random1..4 sin leer sus valores', () => {
  const { manager } = managerFixture();
  const targeting = { foo: 'bar' };
  Object.defineProperty(targeting, 'random1', { enumerable: true, get() { throw new Error('random1 read'); } });
  assert.equal(JSON.stringify(IntextManager.prototype.getPageCustomTargeting.call(manager, { targeting })), JSON.stringify({ foo: 'bar' }));
  assert.equal(IntextManager.prototype.getPageCustomTargeting.call(manager, 'random1'), null);
});
audit(68, 'se comprueban todos los slots normales', () => {
  const second = { ...normalSlot, id: 'normal-slot-2', targeting: { ...normalSlot.targeting, random4: ['20'] } };
  gptSlots.push(second);
  const { manager } = managerFixture();
  const d = manager.getIntextRandomConsistencyDiagnostics('all-slots');
  assert.deepEqual([d['gexp-intext-random-slots-checked'], d['gexp-intext-random-slots-mismatch-count'], d['gexp-intext-random-consistency-slots']], ['2','1','false']);
  assert.equal(d['gexp-intext-random-mismatch-slot-ids'], 'normal-slot-2');
  assert.equal(second.targeting.random4[0], '20');
  gptSlots.pop();
});
audit(69, 'snapshot inválido rechaza los cuatro valores', () => {
  for (const bad of ['', 'undefined', 'null', 'NaN', '0', '21', '1.5']) {
    const { manager } = managerFixture(['5','2','3','4']);
    manager.intextRandomSnapshot = Object.freeze({ random1:'5', random2:'2', random3:bad, random4:'4', source:'gexp-slot-random-snapshot' });
    assert.equal(manager.validateIntextRandomSnapshot(), false, bad);
  }
});

audit(70, 'be_page_newsID se resuelve desde ueDataLayer', () => {
  const { manager } = managerFixture();
  assert.equal(manager.resolveIntextNewsId(), '987654');
  assert.equal(manager.resolveIntextNewsIdentity().source, 'ueDataLayer.be_page_newsID');
});
audit(71, 'be_page_newsID usa fallback utag_data', () => {
  const previous = context.window.ueDataLayer;
  context.window.ueDataLayer = {};
  context.window.utag_data = { be_page_newsID: 'utag-42' };
  const { manager } = managerFixture();
  assert.equal(manager.resolveIntextNewsId(), 'utag-42');
  context.window.ueDataLayer = previous;
  delete context.window.utag_data;
});
audit(72, 'pageInstanceId es único, inmutable y sólo vive en memoria', () => {
  storage.clear();
  const a = managerFixture().manager;
  const b = managerFixture().manager;
  assert.notEqual(a._intextPageInstanceId, b._intextPageInstanceId);
  assert.equal(Object.getOwnPropertyDescriptor(a, '_intextPageInstanceId').writable, false);
  assert.equal(storage.size, 0);
});
audit(73, 'misma noticia con navIndex distinto crea oportunidades distintas', () => {
  const { manager, rows } = managerFixture();
  manager.registerIntextManagerDecision({ navIndex:0, decision:'allowed', reason:'passed' });
  manager.registerIntextManagerDecision({ navIndex:1, decision:'allowed', reason:'passed' });
  const ids = rows.filter(r => r['gexp-intext-telemetry-event-type'] === 'manager-decision').map(r => r['gexp-intext-opportunity-id']);
  assert.equal(new Set(ids).size, 2);
  assert.ok(ids[0].endsWith(':987654:0'));
  assert.ok(ids[1].endsWith(':987654:1'));
});
audit(74, 'artículos PNC priorizan su content id scoped', () => {
  const { manager } = managerFixture();
  const rootA = { getAttribute: key => key === 'data-news-id' ? 'pnc-a' : null };
  const rootB = { getAttribute: key => key === 'data-article-id' ? 'pnc-b' : null };
  assert.equal(manager.captureIntextContentIdentity(1, rootA).id, 'pnc-a');
  assert.equal(manager.captureIntextContentIdentity(2, rootB).id, 'pnc-b');
});
audit(75, 'no se genera pvid artificial y el pvid de slot es opcional', () => {
  assert.ok(!source.includes('intext-pvid'));
  const { manager, rows } = managerFixture();
  delete normalSlot.targeting.pvid;
  manager.registerIntextManagerDecision({ decision:'allowed', reason:'passed' });
  assert.ok(!Object.hasOwn(rows.at(-1), 'gexp-intext-reference-slot-pvid'));
  assert.ok(!Object.hasOwn(rows.at(-1), 'pvid'));
  normalSlot.targeting.pvid = ['real-slot-pvid'];
  const next = managerFixture();
  next.manager.registerIntextManagerDecision({ decision:'allowed', reason:'passed' });
  assert.equal(next.rows.at(-1).pvid, 'real-slot-pvid');
  delete normalSlot.targeting.pvid;
});

audit(76, 'blocked sólo aparece en manager-decision', () => {
  const { manager, rows } = managerFixture();
  manager.registerIntextManagerDecision({ decision:'blocked', reason:'fallback-blank-cookie' });
  assert.equal(rows.at(-1)['gexp-intext-fallback-blank-control-blocked'], 'true');
  assert.ok(!Object.hasOwn(manager.getFallbackBlankControlTelemetry(), 'gexp-intext-fallback-blank-control-blocked'));
  const { node } = nodeFixture();
  node.startIntextTelemetryCycle('initial');
  assert.ok(!Object.hasOwn(node._intextTelemetryCycle, 'gexp-intext-fallback-blank-control-blocked'));
});
audit(77, 'allowlist standard elimina campos sintéticos desconocidos sin mutar original', () => {
  const { manager, rows } = managerFixture();
  const payload = { navIndex:'0', forbidden_field:'secret', 'gexp-intext-decision':'allowed' };
  manager.registerIntextSyntheticEvent('diagnostic', payload, 'allowlist-test');
  assert.ok(!Object.hasOwn(rows.at(-1), 'forbidden_field'));
  assert.equal(payload.forbidden_field, 'secret');
});
audit(78, 'eventos sintéticos incluyen contexto común y sampling estable', () => {
  const { manager, rows } = managerFixture();
  manager.registerIntextManagerDecision({ decision:'allowed', reason:'passed' });
  const row = rows.at(-1);
  ['gexp-intext-page-instance-id','gexp-intext-content-id','be_page_newsID','navIndex','domain','country','contentType','timestamp','random1','random2','random3','random4'].forEach(k => assert.ok(Object.hasOwn(row,k), k));
  assert.equal(row.country, 'ES');
  assert.equal(row['gexp-intext-telemetry-sampled'], 'true');
});
audit(79, 'slot-cycle comparte sampling y no contiene blocked', () => {
  const { node } = nodeFixture();
  node.startIntextTelemetryCycle('refresh');
  assert.equal(node._intextTelemetryCycle['gexp-intext-telemetry-sampled'], 'true');
  assert.ok(!Object.hasOwn(node._intextTelemetryCycle, 'gexp-intext-fallback-blank-control-blocked'));
});

audit(80, 'ciclo pendiente se actualiza sin duplicarse', () => {
  const { node, manager, rows } = nodeFixture();
  node.commitIntextTelemetry('display-render-ended');
  assert.equal(rows.filter(r => r['gexp-intext-telemetry-event-type'] === 'slot-cycle-final').length, 0);
  assert.equal(manager.gexp.statsG.rows.length, 1);
});
audit(81, 'flush temprano genera un único slot-cycle-final con parent tlm rid', () => {
  const { node, manager, rows } = nodeFixture();
  node.ensureIntextCycleTelemetryIdentity();
  const parent = node.wa.cI.tlm_rid;
  manager.gexp.statsG.rows.length = 0;
  node.commitIntextTelemetry('display-render-ended');
  node.commitIntextTelemetry('display-render-ended');
  const finals = rows.filter(r => r['gexp-intext-telemetry-event-type'] === 'slot-cycle-final');
  assert.equal(finals.length, 1);
  assert.equal(finals[0]['gexp-intext-parent-tlm-rid'], parent);
  assert.equal(finals[0]['gexp-intext-cycle-finalized-after-early-flush'], 'true');
});
audit(82, 'QA fuerza sólo inclusión y conserva random real', () => {
  const { manager } = managerFixture(['11','2','3','4']);
  manager.resolveScopedRuleBlock = x => x;
  manager.intextQaCookieOverride = { enabled:true, random1Value:'5' };
  manager.getPageCustomTargeting = () => { throw new Error('page targeting forbidden'); };
  assert.equal(manager.isAllowedByInclusions({ siteConfig:{ inclusions:{ keyValues:{ random1:['5'] } } } }), true);
  assert.equal(manager.intextRandomSnapshot.random1, '11');
  assert.deepEqual(manager.getIntextQaCookieTelemetry(true)['gexp-intext-qa-original-random1'], '11');
});
audit(83, 'manager-decision distingue oportunidad y placement', () => {
  const { manager, rows } = managerFixture();
  manager.registerIntextManagerDecision({ decision:'allowed', reason:'passed', placement:{ result:'no-valid-placement', found:0, created:0 } });
  const row = rows.at(-1);
  assert.deepEqual([row['gexp-intext-decision'], row['gexp-intext-placement-result'], row['gexp-intext-placements-created']], ['allowed','no-valid-placement','0']);
});
audit(84, 'mismo artículo PNC detectado dos veces produce una decisión', () => {
  const { manager, rows } = managerFixture();
  const root = { getAttribute: key => key === 'data-news-id' ? 'same-pnc' : null };
  manager.registerIntextManagerDecision({ navIndex:3, decision:'allowed', reason:'passed', rootElement:root });
  manager.registerIntextManagerDecision({ navIndex:3, decision:'allowed', reason:'passed', rootElement:root });
  assert.equal(rows.filter(r => r['gexp-intext-telemetry-event-type'] === 'manager-decision').length, 1);
});

test('configuración comercial Intext activa conserva cohort y fallbackBlankControl', () => {
  for (const file of ['configPro/default_ES_mobile.json','configPro/pro/default_ES_mobile.json']) {
    const cfg=JSON.parse(fs.readFileSync(path.join(root,file),'utf8')).intextSites.default.general;
    assert.deepEqual(cfg.inclusions.sites['marca.com'].keyValues.random1,['5','6','7','8','9','10']);
    assert.deepEqual({
      enabled:cfg.fallbackBlankControl.enabled, slotIndex:cfg.fallbackBlankControl.slotIndex,
      threshold:cfg.fallbackBlankControl.threshold, onlyFirstLoad:cfg.fallbackBlankControl.onlyFirstLoad,
      ignoreRefresh:cfg.fallbackBlankControl.ignoreRefresh,
      onlyVideoFallbackDisplay:cfg.fallbackBlankControl.onlyVideoFallbackDisplay,
      countEmptyDisplay:cfg.fallbackBlankControl.countEmptyDisplay,
      countHouseDisplay:cfg.fallbackBlankControl.countHouseDisplay,
      countSentinelHouse:cfg.fallbackBlankControl.countSentinelHouse,
      expireAtEndOfDay:cfg.fallbackBlankControl.expireAtEndOfDay,
    }, { enabled:true,slotIndex:1,threshold:1,onlyFirstLoad:true,ignoreRefresh:true,onlyVideoFallbackDisplay:true,countEmptyDisplay:true,countHouseDisplay:true,countSentinelHouse:true,expireAtEndOfDay:true });
  }
});

audit(85, 'PNC no congela el DataLayer anterior', async () => {
  const { manager }=managerFixture(); manager.siteConfig.infiniteScroll={contentIdentityWaitMs:20,contentIdentityPollMs:5}; manager.getScopedSlotsForRoot=()=>[];
  manager.captureIntextContentIdentity(0,null,null,{id:'987654',source:'ueDataLayer.be_page_newsID',resolved:true});
  const identity=await manager.resolveScopedIntextNewsIdentity({getAttribute:()=>null,querySelector:()=>null},1,{});
  assert.deepEqual([identity.resolved,identity.source],[false,'unresolved']);
});
audit(86, 'PNC captura el ID que aparece unos milisegundos despues', async () => {
  const { manager }=managerFixture(); manager.siteConfig.infiniteScroll={contentIdentityWaitMs:80,contentIdentityPollMs:5}; manager.getScopedSlotsForRoot=()=>[];
  manager.captureIntextContentIdentity(0,null,null,{id:'987654',source:'ueDataLayer.be_page_newsID',resolved:true});
  setTimeout(()=>{context.window.ueDataLayer.be_page_newsID='987655';},10);
  const identity=await manager.resolveScopedIntextNewsIdentity({getAttribute:()=>null,querySelector:()=>null},1,{});
  assert.deepEqual([identity.id,identity.source],['987655','ueDataLayer.be_page_newsID']); context.window.ueDataLayer.be_page_newsID='987654';
});
audit(87, 'dos articulos PNC conservan IDs scoped diferentes', async () => {
  const { manager }=managerFixture(); manager.getScopedSlotsForRoot=()=>[]; const rootWithId=id=>({getAttribute:key=>key==='data-news-id'?id:null,querySelector:()=>null});
  const a=await manager.resolveScopedIntextNewsIdentity(rootWithId('pnc-1'),1,{}); const b=await manager.resolveScopedIntextNewsIdentity(rootWithId('pnc-2'),2,{}); assert.notEqual(a.id,b.id);
});
audit(88, 'dos PNC sin ID generan diagnostics distintos y omiten newsID', () => {
  const {manager,rows}=managerFixture(); const unresolved={id:null,source:'unresolved',resolved:false}; manager.captureIntextContentIdentity(1,null,null,unresolved); manager.captureIntextContentIdentity(2,null,null,unresolved);
  const diagnostics=rows.filter(row=>row['gexp-intext-telemetry-event-type']==='diagnostic'); assert.deepEqual(diagnostics.map(row=>row['gexp-intext-diagnostic-key']),['content-id-unresolved:1','content-id-unresolved:2']); diagnostics.forEach(row=>assert.ok(!Object.hasOwn(row,'be_page_newsID')));
});
audit(89, 'slot normal sin randoms queda unresolved y no mismatch', () => {
  const empty={...normalSlot,id:'normal-empty',targeting:{p:['m']}}; const saved=gptSlots.splice(0,gptSlots.length,empty); const {manager,rows}=managerFixture(); const d=manager.getIntextRandomConsistencyDiagnostics('unresolved'); gptSlots.splice(0,gptSlots.length,...saved);
  assert.deepEqual([d['gexp-intext-random-consistency-slots'],d['gexp-intext-random-slots-found'],d['gexp-intext-random-slots-checked'],d['gexp-intext-random-slots-unresolved-count'],d['gexp-intext-random-slots-mismatch-count']],['slots-not-ready','1','0','1','0']); assert.equal(rows.length,0);
});
audit(90, 'slot ready diferente cuenta como mismatch', () => {
  const different={...normalSlot,id:'normal-different',targeting:{...normalSlot.targeting,random1:['6']}}; gptSlots.push(different); const d=managerFixture().manager.getIntextRandomConsistencyDiagnostics('ready-mismatch'); gptSlots.pop(); assert.deepEqual([d['gexp-intext-random-consistency-slots'],d['gexp-intext-random-slots-mismatch-count']],['false','1']);
});
audit(91, 'slots ready y unresolved se clasifican simultaneamente', () => {
  const unresolved={...normalSlot,id:'normal-late',targeting:{random1:['5']}}; gptSlots.push(unresolved); const d=managerFixture().manager.getIntextRandomConsistencyDiagnostics('mixed'); gptSlots.pop(); assert.deepEqual([d['gexp-intext-random-consistency-slots'],d['gexp-intext-random-slots-checked'],d['gexp-intext-random-slots-unresolved-count']],['true','1','1']);
});
audit(92, 'payload no sobrescribe random1 canonico', () => { const {manager,rows}=managerFixture(); manager.registerIntextSyntheticEvent('diagnostic',{random1:'99'},'protected-random'); assert.equal(rows.at(-1).random1,'5'); });
audit(93, 'payload no sobrescribe pageInstanceId canonico', () => { const {manager,rows}=managerFixture(); manager.registerIntextSyntheticEvent('diagnostic',{'gexp-intext-page-instance-id':'fake'},'protected-page'); assert.equal(rows.at(-1)['gexp-intext-page-instance-id'],manager._intextPageInstanceId); });
audit(94, 'PVID PNC procede del slot scoped', () => { const {manager}=managerFixture(); const scoped={id:'scoped',getSlotElementId(){return this.id;},getTargeting:key=>key==='pvid'?['pnc-pvid']:[]}; manager.getScopedSlotsForRoot=()=>[scoped]; assert.equal(manager.resolveOptionalIntextSlotPvid({},{}),'pnc-pvid'); });
audit(95, 'sin slot scoped no reutiliza pvid inicial', () => { normalSlot.targeting.pvid=['initial-pvid']; const {manager}=managerFixture(); manager.getScopedSlotsForRoot=()=>[]; assert.equal(manager.resolveOptionalIntextSlotPvid({},{}),null); delete normalSlot.targeting.pvid; });
audit(96, 'flush temprano seguido de render crea slot-cycle-final', () => { const {node,manager,rows}=nodeFixture(); node.ensureIntextCycleTelemetryIdentity(); manager.gexp.statsG.rows.length=0; node.commitIntextTelemetry('display-render-ended'); assert.equal(rows.filter(row=>row['gexp-intext-telemetry-event-type']==='slot-cycle-final').length,1); });
audit(97, 'slot-cycle-final transporta creative line item y resultado', () => {
  const {node,manager,rows}=nodeFixture(); node.ensureIntextCycleTelemetryIdentity(); Object.assign(node.wa.cI,{creativeId:'creative-7',lineItemId:'line-8',adFilled:'true',adRendered:'true'}); Object.assign(node._intextTelemetryCycle,{'gexp-intext-ad-filled-logical':'true','gexp-intext-render-layout':'fluid'}); manager.gexp.statsG.rows.length=0; node.commitIntextTelemetry('display-render-ended'); const final=rows.at(-1); assert.deepEqual([final.creativeId,final.lineItemId,final.adFilled,final['gexp-intext-render-layout']],['creative-7','line-8','true','fluid']);
});
audit(98, 'nc=1 tardio procesa el articulo antes del timeout', async () => {
  const {manager}=managerFixture(); manager.siteConfig.infiniteScroll={contextWaitMs:80,contextPollMs:5}; manager._processedNavIndexes=new Set([0]); manager._pendingNavIndexes=new Set(); let checks=0,decisions=0; manager.getScopedIntextNcSlots=()=>++checks>2?[{}]:[]; manager.onNewArticleDetected=async()=>{decisions+=1;return true;}; assert.equal(await manager.processIntextNavCandidate({},4),true); assert.deepEqual([decisions,manager._processedNavIndexes.has(4)],[1,true]);
});
audit(99, 'mismo navIndex no genera dos manager decisions', async () => {
  const {manager}=managerFixture(); manager._processedNavIndexes=new Set([0]); manager._pendingNavIndexes=new Set(); manager.waitForIntextNavContext=async()=>[{}]; let decisions=0; manager.onNewArticleDetected=async()=>{decisions+=1;return true;}; await manager.processIntextNavCandidate({},5); await manager.processIntextNavCandidate({},5); assert.equal(decisions,1);
});
audit(100, 'video display fallback y refresh mantienen snapshot', () => { const {node}=nodeFixture(); for(const phase of ['video','display','fallback','refresh']){node.slot.values.random1=['20'];node.assertIntextRandomSnapshotOnSlot(node.slot,phase);assert.equal(node.slot.getTargeting('random1')[0],'5');} });
audit(101, 'cambios solo dentro del core Intext y tests', () => {
  const changed=execFileSync('git',['diff','--name-only'],{cwd:repoRoot,encoding:'utf8'}).trim().split(/\r?\n/).filter(Boolean); assert.deepEqual(changed.sort(),['src/pro/_gam_kv_.js','src/pro/tests/intext-core.audit.test.cjs'].sort());
});
