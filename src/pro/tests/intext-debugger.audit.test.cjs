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
const finalConfigFiles = [
  'configPro/default_ES_desktop.json',
  'configPro/default_ES_mobile.json',
  'configPro/default_ES_mundo_desktop.json',
  'configPro/default_ES_mundo_mobile.json',
  'configPro/default_expansion_ES.json',
  'configPro/default_LATAM.json',
  'configPro/pro/default_ES_desktop.json',
  'configPro/pro/default_ES_mobile.json',
  'configPro/pro/default_ES_mundo_desktop.json',
  'configPro/pro/default_ES_mundo_mobile.json',
  'configPro/pro/default_expansion_ES.json',
  'configPro/pro/default_LATAM.json',
];

function between(text, start, end) {
  const from = text.indexOf(start);
  const to = text.indexOf(end, from + start.length);
  assert.ok(from >= 0, `missing start marker: ${start}`);
  assert.ok(to > from, `missing end marker: ${end}`);
  return text.slice(from, to);
}

const debuggerSource = between(source, 'const badgeLog', 'const INTEXT_RANDOM_KEYS');

function elementFixture(id = 'gexp-intext-1') {
  return {
    nodeType: 1,
    tagName: 'DIV',
    id,
    className: 'gexp-intext-wrapper is-open',
    dataset: { gexpIntextVisualState: 'open', userId: 'private' },
    isConnected: true,
    getBoundingClientRect: () => ({ top: 100, right: 350, bottom: 350, left: 50, width: 300, height: 250 }),
  };
}

function createHarness(debug = true) {
  const consoleCalls = { log: [], warn: [], error: [], group: [], groupEnd: [] };
  const listeners = [];
  const documentListeners = [];
  const gptListeners = [];
  const blobs = [];
  const downloads = [];
  const timerDelays = [];
  class FakeBlob {
    constructor(parts, options = {}) {
      this.content = parts.join('');
      this.type = options.type;
      this.size = Buffer.byteLength(this.content);
    }
  }
  class DebugURL extends URL {}
  DebugURL.createObjectURL = (blob) => {
    blobs.push(blob);
    return `blob:debug-${blobs.length}`;
  };
  DebugURL.revokeObjectURL = () => {};
  const window = {
    gexpIntextDebug: debug,
    location: {
      origin: 'https://www.marca.com',
      pathname: '/futbol/noticia.html',
      hostname: 'www.marca.com',
      search: '',
    },
    innerWidth: 400,
    innerHeight: 700,
    scrollY: 20,
    ueDataLayer: {
      be_page_newsID: 'news-42',
      be_page_domain: 'marca',
      be_page_content_type: 'article',
    },
    localStorage: { secret: 'must-not-leak' },
    addEventListener: (...args) => listeners.push(args),
  };
  const document = {
    visibilityState: 'visible',
    body: { appendChild() {} },
    addEventListener: (...args) => documentListeners.push(args),
    createElement: () => ({
      style: {},
      click() { downloads.push(this.download); },
      remove() {},
    }),
  };
  const context = vm.createContext({
    console: {
      log: (...args) => consoleCalls.log.push(args),
      warn: (...args) => consoleCalls.warn.push(args),
      error: (...args) => consoleCalls.error.push(args),
      groupCollapsed: (...args) => consoleCalls.group.push(args),
      groupEnd: (...args) => consoleCalls.groupEnd.push(args),
    },
    window,
    document,
    googletag: {
      cmd: { push() { throw new Error('debugger must not install GPT listeners'); } },
      pubads: () => ({ addEventListener: (...args) => gptListeners.push(args) }),
    },
    Blob: FakeBlob,
    URL: DebugURL,
    Date,
    Math,
    JSON,
    Object,
    Array,
    Set,
    Map,
    WeakSet,
    Reflect,
    String,
    Number,
    Boolean,
    RegExp,
    Error,
    setTimeout: (_fn, delay) => { timerDelays.push(delay); return timerDelays.length; },
  });
  vm.runInContext(
    `${debuggerSource}
     this.debugExports = {
       serializeIntextLogValue, serializeIntextDebugValue, createIntextDebugCollector,
       intextDebugCollector, logIntext, warnIntext, warnIntextAlways, errorIntext, groupIntext, groupEndIntext
     };`,
    context,
  );
  return {
    ...context.debugExports,
    context,
    window,
    document,
    consoleCalls,
    listeners,
    documentListeners,
    gptListeners,
    blobs,
    downloads,
    timerDelays,
  };
}

function nodeFixture() {
  const wrapper = elementFixture();
  return {
    id: 'gexp-intext-1',
    slotIndex: 1,
    navIndex: 2,
    state: 'video',
    _intextTelemetryCycleId: 7,
    _activeRenderToken: 9,
    container: { getElement: () => wrapper },
    videoContainer: { getElement: () => wrapper },
    waterfall: { lastTrigger: 'viewport' },
  };
}

test('1. debug desactivado no crea buffer ni API', () => {
  const h = createHarness(false);
  h.logIntext('disabled', { value: 1 });
  assert.equal(h.intextDebugCollector.getStateForTests(), null);
  assert.equal(h.window.gexpIntextDebugTools, undefined);
  assert.equal(h.consoleCalls.log.length, 0);
});

test('2-4. log, warn y error se capturan y conservan una sola salida', () => {
  const h = createHarness(true);
  h.logIntext('log', { value: 1 });
  h.warnIntext('warn');
  h.errorIntext('error', new Error('boom'));
  assert.deepEqual(Array.from(h.intextDebugCollector.getLogs(), (entry) => entry.level), ['log', 'warn', 'error']);
  assert.deepEqual(
    [h.consoleCalls.log.length, h.consoleCalls.warn.length, h.consoleCalls.error.length],
    [1, 1, 1],
  );
});

test('5. los grupos mantienen groupDepth', () => {
  const h = createHarness(true);
  h.groupIntext('outer');
  h.logIntext('inside');
  h.groupEndIntext();
  assert.deepEqual(
    Array.from(h.intextDebugCollector.getLogs(), ({ level, groupDepth }) => [level, groupDepth]),
    [['group', 0], ['log', 1], ['groupEnd', 0]],
  );
});

test('6-9. serialización circular, DOM, Error y truncado', () => {
  const h = createHarness(true);
  const circular = { name: 'root' };
  circular.self = circular;
  const value = h.serializeIntextLogValue({
    circular,
    error: new Error('failure'),
    dom: elementFixture(),
    array: Array.from({ length: 105 }, (_, index) => index),
    long: 'x'.repeat(10010),
    deep: { a: { b: { c: 1 } } },
    many: Object.fromEntries(Array.from({ length: 65 }, (_, index) => [`k${index}`, index])),
  });
  assert.equal(value.circular.self, '[Circular]');
  assert.equal(value.error.type, 'Error');
  assert.equal(value.error.message, 'failure');
  assert.match(value.error.stack, /Error/);
  assert.deepEqual(
    {
      type: value.dom.type,
      tagName: value.dom.tagName,
      id: value.dom.id,
      className: value.dom.className,
      width: value.dom.rect.width,
      isConnected: value.dom.isConnected,
    },
    {
      type: 'DOMElement',
      tagName: 'DIV',
      id: 'gexp-intext-1',
      className: 'gexp-intext-wrapper is-open',
      width: 300,
      isConnected: true,
    },
  );
  assert.equal(value.dom.dataset.userId, '[Redacted]');
  assert.match(value.array.at(-1), /Truncated 5 items/);
  assert.match(value.long, /Truncated 10 chars/);
  assert.equal(value.deep.a.b, '[MaxDepth]');
  assert.equal(value.many['[TruncatedKeys]'], 5);
});

test('10. el buffer no supera 5.000 entradas', () => {
  const h = createHarness(true);
  for (let index = 0; index < 5005; index += 1) h.intextDebugCollector.capture('log', [`entry-${index}`]);
  const state = h.intextDebugCollector.getStateForTests();
  assert.equal(state.entries.length, 5000);
  assert.equal(state.droppedEntries, 5);
});

test('11. el buffer respeta el límite aproximado de bytes', () => {
  const h = createHarness(true);
  const collector = h.createIntextDebugCollector({ maxBytes: 800 });
  for (let index = 0; index < 20; index += 1) collector.capture('log', [`entry-${index}`, 'x'.repeat(100)]);
  const state = collector.getStateForTests();
  assert.ok(state.approximateBytes <= 800);
  assert.ok(state.droppedEntries > 0);
});

test('12-14. JSON válido, TXT cronológico y retorno mínimo', () => {
  const h = createHarness(true);
  h.logIntext('first');
  h.warnIntext('second');
  const jsonResult = h.window.gexpIntextDebugTools.downloadJSON();
  assert.deepEqual(Object.keys(jsonResult).sort(), ['filename', 'sizeBytes']);
  const pkg = JSON.parse(h.blobs[0].content);
  assert.equal(pkg.schemaVersion, '1.0.0');
  assert.equal(pkg.logs[0].message, 'first');
  assert.equal(pkg.page.origin, 'https://www.marca.com');
  assert.equal(pkg.page.pathname, '/futbol/noticia.html');
  assert.ok(!Object.hasOwn(pkg.page, 'url'));
  const txtResult = h.window.gexpIntextDebugTools.downloadTXT();
  assert.deepEqual(Object.keys(txtResult).sort(), ['filename', 'sizeBytes']);
  assert.ok(h.blobs[1].content.indexOf('first') < h.blobs[1].content.indexOf('second'));
  assert.match(h.blobs[1].content, /^00001 \+\d+ms \[log\] first/m);
  assert.ok(h.timerDelays.every((delay) => delay >= 1000));
});

test('15. cookies, claves sensibles, query y hash no se exportan', () => {
  const h = createHarness(true);
  h.logIntext('url https://ad.example/vast?token=secret#private', {
    cookie: 'bad',
    token: 'bad',
    authorization: 'bad',
    email: 'a@example.com',
    pvid: 'bad',
    ppid: 'bad',
    ueid: 'bad',
    permid: 'bad',
    sharedid: 'bad',
    id5: 'bad',
    tdid: 'bad',
    pubcid: 'bad',
    gaid: 'bad',
    idfa: 'bad',
    deviceId: 'bad',
    userId: 'bad',
    sessionId: 'bad',
  });
  h.window.gexpIntextDebugTools.downloadJSON();
  const exported = h.blobs[0].content;
  assert.doesNotMatch(exported, /secret#private|a@example\.com|must-not-leak/);
  assert.match(exported, /https:\/\/ad\.example\/vast/);
  assert.equal((exported.match(/\[Redacted\]/g) || []).length, 17);
});

test('16-19. no intercepta consola ni instala scroll, observers o listeners GPT', () => {
  const h = createHarness(true);
  const originalConsole = h.context.console;
  h.logIntext('one');
  assert.equal(h.context.console, originalConsole);
  assert.equal(h.listeners.length, 0);
  assert.equal(h.documentListeners.length, 0);
  assert.equal(h.gptListeners.length, 0);
  assert.doesNotMatch(debuggerSource, /addEventListener\s*\(\s*["']scroll|new\s+IntersectionObserver|installGpt|performance\.getEntriesByType|elementFromPoint|getComputedStyle/);
});

test('20-21. IMA started, first frame y player revealed son métricas distintas', () => {
  const h = createHarness(true);
  const node = nodeFixture();
  h.intextDebugCollector.recordVideoEvent('started', node);
  h.intextDebugCollector.recordVideoEvent('first-frame', node, { currentTime: 0.1 });
  h.intextDebugCollector.recordVideoEvent('revealed', node);
  assert.deepEqual(
    Array.from(h.intextDebugCollector.getLogs(), (entry) => entry.args[0].metric),
    ['video_ima_started', 'video_first_frame', 'video_player_revealed'],
  );
  assert.match(source, /if \(intextDebugFirstFrameLogged \|\| currentTime <= 0\) return false/);
});

test('22. display usa callbacks existentes para visibility e impressionViewable', () => {
  assert.match(source, /wrapExistingCallback\("onSlotVisibilityChanged", "display_visibility_changed"/);
  assert.match(source, /wrapExistingCallback\("onViewable", "display_impression_viewable"/);
  assert.doesNotMatch(debuggerSource, /addEventListener\s*\([^)]*(?:slotVisibilityChanged|impressionViewable)/s);
});

test('23. summary se calcula bajo demanda a partir de logs', () => {
  const h = createHarness(true);
  const node = nodeFixture();
  for (const metric of [
    'display_request_started',
    'display_slot_response_received',
    'display_slot_render_ended',
    'display_gam_filled',
    'display_real_filled',
    'display_impression_viewable',
    'video_request_started',
    'video_ima_loaded',
    'video_ima_started',
    'video_first_frame',
    'video_player_revealed',
    'video_complete',
  ]) {
    h.intextDebugCollector.recordMetric(metric, { node, inViewPercentage: 75, currentTime: 1 });
  }
  assert.ok(!Object.hasOwn(h.intextDebugCollector.getStateForTests(), 'summary'));
  const summary = h.window.gexpIntextDebugTools.getSummary();
  assert.equal(summary.slotsAndCycles.length, 1);
  assert.equal(summary.slotsAndCycles[0].display.impressionViewable, true);
  assert.equal(summary.slotsAndCycles[0].display.gamFilled, true);
  assert.equal(summary.slotsAndCycles[0].display.realFilled, true);
  assert.equal(summary.slotsAndCycles[0].video.firstFrame, true);
  assert.equal(summary.slotsAndCycles[0].video.playerRevealed, true);
  assert.equal(summary.slotsAndCycles[0].flags.startedWithoutFirstFrame, false);
});

test('24. el debugger no modifica componentes globales ni lógica funcional', () => {
  const normalize = (value) => String(value).replace(/\r\n/g, '\n');
  for (const [start, end] of [
    ['class GAMExp', 'let _gam_exp'],
    ['class WindowArray', 'class RandomStrategy'],
    ['class StatsGatherer', 'class GAMExp'],
    ['const _gam_kv_', 'window._gam_kv_'],
  ]) {
    assert.equal(normalize(between(source, start, end)), normalize(between(baseline, start, end)), `${start} fue modificado`);
  }
});

test('25. _gam_kv_.js pasa node --check', () => {
  execFileSync(process.execPath, ['--check', path.join(root, '_gam_kv_.js')], { stdio: 'pipe' });
});

test('API, clear, mark y getLogs cumplen el contrato', () => {
  const h = createHarness(true);
  assert.deepEqual(
    Object.keys(h.window.gexpIntextDebugTools).sort(),
    ['clear', 'downloadJSON', 'downloadTXT', 'getLogs', 'getSummary', 'mark'].sort(),
  );
  h.window.gexpIntextDebugTools.mark('usuario-ha-pasado-el-slot', { comentario: 'sin vídeo' });
  const copy = h.window.gexpIntextDebugTools.getLogs();
  assert.equal(copy[0].level, 'marker');
  copy.length = 0;
  assert.equal(h.window.gexpIntextDebugTools.getLogs().length, 1);
  h.window.gexpIntextDebugTools.clear();
  const state = h.intextDebugCollector.getStateForTests();
  assert.deepEqual(
    JSON.parse(JSON.stringify({
      sequence: state.sequence,
      groupDepth: state.groupDepth,
      droppedEntries: state.droppedEntries,
      approximateBytes: state.approximateBytes,
      entries: state.entries,
    })),
    { sequence: 0, groupDepth: 0, droppedEntries: 0, approximateBytes: 0, entries: [] },
  );
});

test('lista canónica de métricas está instrumentada', () => {
  const required = [
    'display_slot_created', 'display_request_started', 'display_slot_requested',
    'display_slot_response_received', 'display_slot_render_ended', 'display_waterfall_result',
    'display_onload', 'display_opened',
    'display_closed', 'display_refresh_started', 'display_refresh_completed',
    'display_fallback_started', 'display_empty', 'display_gam_filled', 'display_real_filled', 'display_house',
    'display_sentinel', 'display_impression_viewable', 'display_visibility_changed',
    'intext_real_render', 'intext_intersection_changed',
    'video_request_started', 'video_pipeline_completed', 'video_player_ads_load',
    'video_vast_processed', 'video_ima_loaded', 'video_player_adstart',
    'video_ima_started', 'video_first_frame', 'video_player_revealed',
    'video_first_quartile', 'video_midpoint', 'video_third_quartile',
    'video_complete', 'video_skipped', 'video_paused', 'video_resumed',
    'video_click', 'video_error', 'video_timeout', 'video_fallback_started',
    'video_fallback_display_requested',
  ];
  for (const metric of required) assert.match(source, new RegExp(metric), `falta ${metric}`);
});

test('revisión 1-2: renderToken se conserva y access_token se redacta en JSON', () => {
  const h = createHarness(true);
  h.logIntext('[IntextMetrics] test', {
    renderToken: 9,
    'gexp-intext-render-token': '9',
    cycleId: 7,
    tlm_rid: 'tlm-1',
    access_token: 'private-token',
  });
  h.window.gexpIntextDebugTools.downloadJSON();
  const pkg = JSON.parse(h.blobs[0].content);
  const data = pkg.logs[0].args[0];
  assert.equal(data.renderToken, 9);
  assert.equal(data['gexp-intext-render-token'], '9');
  assert.equal(data.cycleId, 7);
  assert.equal(data.tlm_rid, 'tlm-1');
  assert.equal(data.access_token, '[Redacted]');
});

test('revisión 3-4: LOADED nativo es la única fuente de video_ima_loaded y ads-load no inventa tres fases', () => {
  const adsLoadBlock = between(source, 'this.player.on("ads-load"', 'this.player.on("nopreroll"');
  assert.match(adsLoadBlock, /debugVideo\("player-ads-load"/);
  assert.match(adsLoadBlock, /debugVideo\("vast-processed"[\s\S]*inferred:\s*true[\s\S]*source:\s*"player-ads-load"/);
  assert.doesNotMatch(adsLoadBlock, /debugVideo\("(?:loaded|started|ads-manager-loaded)"/);
  assert.equal((source.match(/debugVideo\("loaded"/g) || []).length, 1);
  assert.match(source, /ima\.AdEvent\.Type\.LOADED,[\s\S]*debugVideo\("loaded",\s*\{[\s\S]*source:\s*"native-ima-loaded"/);
  assert.match(source, /ima\.AdEvent\.Type\.STARTED,[\s\S]*debugVideo\("started",\s*\{[\s\S]*source:\s*"native-ima-started"/);
  assert.doesNotMatch(source, /video_ads_manager_loaded/);
});

test('revisión 4b: métricas de vídeo se deduplican por ciclo, token, métrica y source', () => {
  const h = createHarness(true);
  const node = nodeFixture();
  h.intextDebugCollector.recordVideoEvent('loaded', node, { source: 'native-ima-loaded' });
  h.intextDebugCollector.recordVideoEvent('loaded', node, { source: 'native-ima-loaded' });
  h.intextDebugCollector.recordVideoEvent('loaded', node, { source: 'another-native-source' });
  const loaded = h.intextDebugCollector.getLogs().filter((entry) => entry.args[0].metric === 'video_ima_loaded');
  assert.equal(loaded.length, 2);
});

test('revisión 5: final de buildAndPlayVideo es pipeline completed, no request completed', () => {
  const requestVideo = between(source, 'async _requestVideo(', '\n        getTAMVideoConfiguration() {');
  assert.match(requestVideo, /recordVideoEvent\("video-request-complete"/);
  assert.match(debuggerSource, /"video-request-complete":\s*"video_pipeline_completed"/);
  assert.doesNotMatch(source, /video_request_completed/);
});

test('revisión 6-7: render e intersection de vídeo permanecen neutrales', () => {
  const h = createHarness(true);
  const node = nodeFixture();
  h.intextDebugCollector.recordTimeline('render-logical', { node, format: 'video', phase: 'video-rendered', state: 'video' });
  h.intextDebugCollector.recordTimeline('intersection-change', { node, format: 'video', phase: 'viewport-observer', state: 'video', intersectionRatio: 0.5 });
  const metrics = Array.from(h.intextDebugCollector.getLogs(), (entry) => entry.args[0]);
  assert.deepEqual(metrics.map((data) => data.metric), ['intext_real_render', 'intext_intersection_changed']);
  assert.ok(metrics.every((data) => data.format === 'video' && data.state === 'video'));
  assert.ok(metrics.every((data) => !data.metric.startsWith('display_')));
  const summary = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(summary.display.renderEnded, false);
  assert.equal(summary.flags.displayRenderedButNeverViewable, 'not-applicable');
});

test('revisión 8: slot response y waterfall result son métricas diferentes', () => {
  assert.match(source, /wrapExistingCallback\("response", "display_slot_response_received"/);
  assert.match(debuggerSource, /"request-end":\s*"display_waterfall_result"/);
  assert.doesNotMatch(source, /display_response_received/);
});

test('revisión 9: display slot render ended solo se emite en initial-render-handler', () => {
  assert.equal((source.match(/recordMetric\("display_slot_render_ended"/g) || []).length, 1);
  assert.doesNotMatch(source, /wrapExistingCallback\("onRendered"/);
  assert.match(source, /source:\s*"initial-render-handler"/);
});

test('revisión 10: response information se obtiene del slot', () => {
  const initializeBlock = between(source, 'initialize() {', 'askDisplay(');
  assert.match(initializeBlock, /event\?\.slot\?\.getResponseInformation\?\.\(\)\s*\|\|\s*\{\}/);
  assert.doesNotMatch(initializeBlock, /isEmpty:\s*event\.isEmpty|size:\s*event\.size/);
});

test('revisión 11: sentinel puede ser GAM fill pero nunca real fill', () => {
  assert.match(source, /const gamFilled = event\.isEmpty !== true;/);
  assert.match(source, /const realDisplayFilled = gamFilled && !isSentinel;/);
  const h = createHarness(true);
  const node = nodeFixture();
  h.intextDebugCollector.recordMetric('display_slot_render_ended', { node, source: 'initial-render-handler', gamFilled: true, realDisplayFilled: false });
  h.intextDebugCollector.recordMetric('display_gam_filled', { node, source: 'initial-render-handler' });
  h.intextDebugCollector.recordMetric('display_sentinel', { node, source: 'initial-render-handler' });
  const display = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0].display;
  assert.equal(display.gamFilled, true);
  assert.equal(display.realFilled, false);
  assert.equal(display.sentinel, true);
});

test('revisión 12-13: errores y warnings directos de Intext se capturan y se imprimen una vez', () => {
  const h = createHarness(true);
  h.errorIntext('[IntextManager] Failed to create positions', new Error('creation failed'));
  h.warnIntextAlways('[IntextManager] Could not read GPT targeting', new Error('targeting failed'));
  assert.equal(h.consoleCalls.error.length, 1);
  assert.equal(h.consoleCalls.warn.length, 1);
  h.window.gexpIntextDebugTools.downloadJSON();
  const logs = JSON.parse(h.blobs[0].content).logs;
  assert.ok(logs.some((entry) => entry.level === 'error' && entry.message.includes('Failed to create positions')));
  assert.ok(logs.some((entry) => entry.level === 'warn' && entry.message.includes('Could not read GPT targeting')));
  const managerSource = between(source, 'class IntextManager', 'class IntextPlacementEngine');
  assert.doesNotMatch(managerSource, /console\.(?:warn|error)\(/);
});

test('revisión 14: firstFrameBelow50Percent usa intersection si falta GPT', () => {
  const h = createHarness(true);
  const node = nodeFixture();
  h.intextDebugCollector.recordMetric('video_first_frame', {
    node,
    source: 'media-timeupdate',
    gptInViewPercentage: null,
    wrapperIntersectionRatio: 0.4,
  });
  const group = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(group.flags.firstFrameBelow50Percent, true);
  assert.equal(group.flags.firstFrameOutsideViewport, false);
  assert.equal(group.viewabilitySource.firstFrame, 'dom-intersection');
});

test('revisión 15: ausencia total de viewability produce unknown', () => {
  const h = createHarness(true);
  const node = {
    ...nodeFixture(),
    container: { getElement: () => null },
    videoContainer: { getElement: () => null },
  };
  h.intextDebugCollector.recordMetric('video_first_frame', { node, source: 'unknown-media' });
  h.intextDebugCollector.recordMetric('video_player_revealed', { node, source: 'unknown-reveal' });
  const group = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(group.flags.firstFrameBelow50Percent, 'unknown');
  assert.equal(group.flags.firstFrameOutsideViewport, 'unknown');
  assert.equal(group.flags.revealedAfterViewportExit, 'unknown');
  assert.equal(group.viewabilitySource.firstFrame, 'unknown');
  assert.equal(group.viewabilitySource.playerRevealed, 'unknown');
});

test('revisión 16: vídeo ignora adMaxViewability sin callback GPT y prioriza DOM', () => {
  const makeNode = () => ({
    ...nodeFixture(),
    wa: { cI: { adMaxViewability: 0 } },
    container: { getElement: () => null },
    videoContainer: { getElement: () => null },
  });

  const visible = createHarness(true);
  visible.intextDebugCollector.recordMetric('video_first_frame', {
    node: makeNode(),
    source: 'visible-frame',
    wrapperIntersectionRatio: 0.8,
  });
  const visibleData = visible.intextDebugCollector.getLogs()[0].args[0];
  assert.equal(visibleData.gptViewabilityAvailable, false);
  assert.equal(visibleData.viewabilitySource, 'dom-intersection');
  assert.equal(visibleData.viewabilityPercentage, 80);

  const outside = createHarness(true);
  outside.intextDebugCollector.recordMetric('video_first_frame', {
    node: makeNode(),
    source: 'outside-frame',
    wrapperIntersectionRatio: 0,
  });
  const outsideGroup = outside.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(outsideGroup.flags.firstFrameOutsideViewport, true);

  const unknown = createHarness(true);
  unknown.intextDebugCollector.recordMetric('video_first_frame', {
    node: makeNode(),
    source: 'unknown-frame',
  });
  const unknownData = unknown.intextDebugCollector.getLogs()[0].args[0];
  assert.equal(unknownData.gptViewabilityAvailable, false);
  assert.equal(unknownData.viewabilitySource, 'unknown');
  assert.equal(unknownData.viewabilityPercentage, null);
});

test('revisión 17: display usa GPT solo tras señal real y conserva el cero explícito', () => {
  const h = createHarness(true);
  const node = {
    ...nodeFixture(),
    state: 'display',
    wa: { cI: { adMaxViewability: 65 } },
    container: { getElement: () => null },
  };
  h.intextDebugCollector.recordMetric('display_visibility_changed', {
    node,
    source: 'persistent-listener',
    inViewPercentage: 65,
  });
  h.intextDebugCollector.recordMetric('display_opened', { node, source: 'wrapper-open' });
  const [visibility, opened] = h.intextDebugCollector.getLogs().map((entry) => entry.args[0]);
  assert.equal(visibility.gptViewabilityAvailable, true);
  assert.equal(visibility.viewabilitySource, 'gpt');
  assert.equal(visibility.gptInViewPercentage, 65);
  assert.equal(opened.gptViewabilityAvailable, true);
  assert.equal(opened.gptInViewPercentage, 65);

  const zero = createHarness(true);
  zero.intextDebugCollector.recordMetric('video_first_frame', {
    node: nodeFixture(),
    source: 'explicit-gpt-zero',
    gptInViewPercentage: 0,
    wrapperIntersectionRatio: 0.8,
  });
  const zeroData = zero.intextDebugCollector.getLogs()[0].args[0];
  assert.equal(zeroData.gptViewabilityAvailable, true);
  assert.equal(zeroData.viewabilitySource, 'gpt');
  assert.equal(zeroData.viewabilityPercentage, 0);
});

test('revisión 18: solo las fases one-shot de vídeo se deduplican', () => {
  const h = createHarness(true);
  const node = nodeFixture();
  for (const event of ['paused', 'resumed', 'click']) {
    h.intextDebugCollector.recordVideoEvent(event, node, { source: `native-${event}` });
    h.intextDebugCollector.recordVideoEvent(event, node, { source: `native-${event}` });
  }
  h.intextDebugCollector.recordVideoEvent('error', node, { source: 'native-error', errorMessage: 'first' });
  h.intextDebugCollector.recordVideoEvent('error', node, { source: 'native-error', errorMessage: 'second' });
  h.intextDebugCollector.recordVideoEvent('started', node, { source: 'native-ima-started' });
  h.intextDebugCollector.recordVideoEvent('started', node, { source: 'native-ima-started' });
  h.intextDebugCollector.recordVideoEvent('complete', node, { source: 'native-ima-complete' });
  h.intextDebugCollector.recordVideoEvent('complete', node, { source: 'native-ima-complete' });

  const data = h.intextDebugCollector.getLogs().map((entry) => entry.args[0]);
  for (const metric of ['video_paused', 'video_resumed', 'video_click', 'video_error']) {
    const events = data.filter((item) => item.metric === metric);
    assert.equal(events.length, 2, metric);
    assert.deepEqual(Array.from(events, (item) => item.occurrence), [1, 2]);
    assert.ok(events[1].eventSequence > events[0].eventSequence);
  }
  assert.deepEqual(Array.from(data.filter((item) => item.metric === 'video_error'), (item) => item.errorMessage), ['first', 'second']);
  assert.equal(data.filter((item) => item.metric === 'video_ima_started').length, 1);
  assert.equal(data.filter((item) => item.metric === 'video_complete').length, 1);
});

test('revisión 19: summary separa máximos display, vídeo y overall', () => {
  const videoOnly = createHarness(true);
  videoOnly.intextDebugCollector.recordMetric('video_first_frame', {
    node: nodeFixture(),
    source: 'video-only',
    wrapperIntersectionRatio: 0.8,
  });
  const videoGroup = videoOnly.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(Object.hasOwn(videoGroup.display, 'maxInViewPercentage'), false);
  assert.equal(videoGroup.video.maxInViewPercentage, 80);
  assert.equal(videoGroup.overall.maxInViewPercentage, 80);
  assert.equal(videoGroup.flags.displayOpenedOutsideViewport, 'not-applicable');

  const displayOnly = createHarness(true);
  const displayNode = { ...nodeFixture(), state: 'display', container: { getElement: () => null } };
  displayOnly.intextDebugCollector.recordMetric('display_visibility_changed', {
    node: displayNode,
    source: 'persistent-listener',
    inViewPercentage: 60,
  });
  const displayGroup = displayOnly.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(displayGroup.display.maxInViewPercentage, 60);
  assert.equal(Object.hasOwn(displayGroup.video, 'maxInViewPercentage'), false);
  assert.equal(displayGroup.overall.maxInViewPercentage, 60);

  const fallback = createHarness(true);
  fallback.intextDebugCollector.recordMetric('display_visibility_changed', {
    node: displayNode,
    source: 'persistent-listener',
    inViewPercentage: 60,
  });
  fallback.intextDebugCollector.recordMetric('video_first_frame', {
    node: { ...displayNode, state: 'video' },
    source: 'fallback-video',
    wrapperIntersectionRatio: 0.8,
  });
  const fallbackGroup = fallback.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(fallbackGroup.display.maxInViewPercentage, 60);
  assert.equal(fallbackGroup.video.maxInViewPercentage, 80);
  assert.equal(fallbackGroup.overall.maxInViewPercentage, 80);
  assert.equal(fallbackGroup.slotId, 'gexp-intext-1');
  assert.equal(fallbackGroup.cycleId, 7);
  assert.equal(fallbackGroup.renderToken, 9);
});

test('revisión 20: apertura display sin medición queda unknown', () => {
  const h = createHarness(true);
  const node = {
    ...nodeFixture(),
    state: 'display',
    container: { getElement: () => null },
    videoContainer: { getElement: () => null },
  };
  h.intextDebugCollector.recordMetric('display_opened', { node, source: 'wrapper-open' });
  const group = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(group.flags.displayOpenedOutsideViewport, 'unknown');
});

test('formato 1: display_fallback_started prevalece sobre node.state video', () => {
  const h = createHarness(true);
  h.intextDebugCollector.recordMetric('display_fallback_started', {
    node: nodeFixture(),
    wrapperIntersectionRatio: 0.4,
  });
  const group = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(h.intextDebugCollector.getLogs()[0].args[0].format, 'display');
  assert.equal(group.display.maxInViewPercentage, 40);
  assert.equal(Object.hasOwn(group.video, 'maxInViewPercentage'), false);
});

test('formato 2: display_request_started prevalece sobre format video explícito', () => {
  const h = createHarness(true);
  h.intextDebugCollector.recordMetric('display_request_started', {
    node: nodeFixture(),
    format: 'video',
    wrapperIntersectionRatio: 0.35,
  });
  const group = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(h.intextDebugCollector.getLogs()[0].args[0].format, 'display');
  assert.equal(group.display.maxInViewPercentage, 35);
  assert.equal(Object.hasOwn(group.video, 'maxInViewPercentage'), false);
});

test('formato 3: video_fallback_started prevalece sobre node.state display', () => {
  const h = createHarness(true);
  h.intextDebugCollector.recordMetric('video_fallback_started', {
    node: { ...nodeFixture(), state: 'display' },
    wrapperIntersectionRatio: 0.7,
  });
  const group = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(h.intextDebugCollector.getLogs()[0].args[0].format, 'video');
  assert.equal(group.video.maxInViewPercentage, 70);
  assert.equal(Object.hasOwn(group.display, 'maxInViewPercentage'), false);
});

test('formato 4: intext_real_render explícitamente video pertenece a video', () => {
  const h = createHarness(true);
  h.intextDebugCollector.recordMetric('intext_real_render', {
    node: { ...nodeFixture(), state: 'display' },
    format: 'video',
    wrapperIntersectionRatio: 0.8,
  });
  const group = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(group.video.maxInViewPercentage, 80);
  assert.equal(Object.hasOwn(group.display, 'maxInViewPercentage'), false);
});

test('formato 5: intext_real_render explícitamente display pertenece a display', () => {
  const h = createHarness(true);
  h.intextDebugCollector.recordMetric('intext_real_render', {
    node: nodeFixture(),
    format: 'display',
    wrapperIntersectionRatio: 0.55,
  });
  const group = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(group.display.maxInViewPercentage, 55.00000000000001);
  assert.equal(Object.hasOwn(group.video, 'maxInViewPercentage'), false);
});

test('formato 6: ciclo fallback conserva máximos independientes', () => {
  const h = createHarness(true);
  const node = nodeFixture();
  h.intextDebugCollector.recordMetric('video_fallback_started', {
    node,
    wrapperIntersectionRatio: 0.8,
  });
  h.intextDebugCollector.recordMetric('display_fallback_started', {
    node,
    wrapperIntersectionRatio: 0.4,
  });
  const group = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
  assert.equal(group.video.maxInViewPercentage, 80);
  assert.equal(group.display.maxInViewPercentage, 40);
  assert.equal(group.overall.maxInViewPercentage, 80);
});

test('formato 7: una métrica nunca actualiza simultáneamente display y video', () => {
  const cases = [
    ['display_request_started', 'video', 'video'],
    ['video_fallback_started', 'display', 'display'],
    ['intext_real_render', 'video', 'display'],
    ['intext_real_render', 'display', 'video'],
  ];
  for (const [metric, explicitFormat, nodeState] of cases) {
    const h = createHarness(true);
    h.intextDebugCollector.recordMetric(metric, {
      node: { ...nodeFixture(), state: nodeState },
      format: explicitFormat,
      wrapperIntersectionRatio: 0.5,
    });
    const group = h.window.gexpIntextDebugTools.getSummary().slotsAndCycles[0];
    const classifiedFormats = [
      Object.hasOwn(group.display, 'maxInViewPercentage'),
      Object.hasOwn(group.video, 'maxInViewPercentage'),
    ].filter(Boolean);
    assert.equal(classifiedFormats.length, 1, `${metric}:${explicitFormat}:${nodeState}`);
  }
});

test('estado final valida las 12 configuraciones PIP sin depender del diff', () => {
  assert.equal(finalConfigFiles.length, 12);
  for (const file of finalConfigFiles) {
    const config = JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
    const general = config.intextSites.default.general;
    assert.equal(general.gam.networkIdMode, 'auto', file);
    assert.equal(general.video.pip.enabled, false, file);
    assert.equal(general.video.pip.slots['gexp-intext'], true, file);
    assert.equal(
      Object.entries(general.video.pip.slots).filter(([, enabled]) => enabled === true).length,
      1,
      file,
    );
  }
});

test('coste real: fast path desactivado y captura activada', (t) => {
  const disabled = createHarness(false);
  const enabled = createHarness(true);
  const iterations = 10000;
  let started = process.hrtime.bigint();
  for (let index = 0; index < iterations; index += 1) disabled.intextDebugCollector.capture('log', ['x']);
  const disabledMs = Number(process.hrtime.bigint() - started) / 1e6;
  started = process.hrtime.bigint();
  for (let index = 0; index < iterations; index += 1) enabled.intextDebugCollector.capture('log', ['x', { index }]);
  const enabledMs = Number(process.hrtime.bigint() - started) / 1e6;
  t.diagnostic(`10k captures: disabled=${disabledMs.toFixed(3)}ms enabled=${enabledMs.toFixed(3)}ms`);
  assert.equal(disabled.intextDebugCollector.getStateForTests(), null);
  assert.equal(enabled.intextDebugCollector.getStateForTests().entries.length, 5000);
});
