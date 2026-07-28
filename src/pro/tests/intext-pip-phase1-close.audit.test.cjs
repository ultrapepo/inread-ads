const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, '_gam_kv_.js'), 'utf8');

const pipFields = [
  'gexp-intext-pip-enabled',
  'gexp-intext-pip-entered',
  'gexp-intext-pip-entry-count',
  'gexp-intext-pip-visible-ms',
  'gexp-intext-pip-dismissed',
  'gexp-intext-pip-ended-while-active',
  'gexp-intext-pip-last-exit-reason',
  'gexp-intext-pip-entry-played-pct',
  'gexp-intext-pip-exit-played-pct',
];

function between(text, start, end) {
  const from = text.indexOf(start);
  const to = text.indexOf(end, from + start.length);
  assert.ok(from >= 0, `missing start marker: ${start}`);
  assert.ok(to > from, `missing end marker: ${end}`);
  return text.slice(from, to);
}

function buildClass(methodBlock, globals = {}) {
  const context = vm.createContext({
    Date,
    Math,
    Number,
    String,
    Object,
    Array,
    Set,
    ...globals,
  });
  vm.runInContext(`this.Probe = class Probe { ${methodBlock} };`, context);
  return context.Probe;
}

test('1. configured y effective PIP distinguen desktop, mobile y estado del nodo', () => {
  const methods = between(
    source,
    'isIntextPipEnabled() {',
    'getIntextPipPlayerElement() {',
  );
  const Probe = buildClass(methods);
  const node = new Probe();
  const pip = {
    enabled: true,
    mode: 'floating',
    enabledDesktop: true,
    enabledMobile: false,
  };
  node.getIntextPipConfig = () => pip;
  node.isIntextPipMobileDevice = () => false;
  node._nodeActive = true;
  node.state = 'video';
  node.videoContainer = { getElement: () => ({}) };
  node._intextPipState = 'inline';
  node._activeRenderToken = 4;
  node._renderTokenSeq = 4;
  assert.equal(node.isIntextPipEffectiveEnabled(), true);
  node.isIntextPipMobileDevice = () => true;
  assert.equal(node.isIntextPipEffectiveEnabled(), false);
  node.isIntextPipMobileDevice = () => false;
  pip.enabled = false;
  assert.equal(node.isIntextPipEffectiveEnabled(), false);
  assert.equal(pip.enabled, false, 'el estado configurado permanece independiente');
});

test('2. allowlists, limpieza y final delta contienen todos los campos PIP', () => {
  const globalAllowlist = between(
    source,
    'const INTEXT_TELEMETRY_STANDARD_FIELDS',
    'class IntextManager',
  );
  const nodeAllowlist = between(
    source,
    'getStandardIntextTelemetryAllowlist()',
    'filterIntextTelemetryForCI(',
  );
  const cleanup = between(
    source,
    'clearIntextTelemetryCycleCI()',
    'startIntextTelemetryCycle(',
  );
  const finalDelta = between(source, 'const finalDeltaFields = [', 'const finalDelta = {}');
  [...pipFields, 'gexp-intext-pip-effective-enabled'].forEach((field) => {
    assert.ok(globalAllowlist.includes(`"${field}"`), `global allowlist: ${field}`);
    assert.ok(nodeAllowlist.includes(`"${field}"`), `node allowlist: ${field}`);
    assert.ok(cleanup.includes(`"${field}"`), `cycle cleanup: ${field}`);
    assert.ok(finalDelta.includes(`"${field}"`), `final delta: ${field}`);
  });
});

test('3. un commit temprano conserva el delta PIP final tras salir de statsG.rows', () => {
  const method = between(
    source,
    'commitIntextTelemetry(reason = "manual") {',
    'setupIntextViewportTelemetryObserver() {',
  );
  const Probe = buildClass(method, { logIntext() {} });
  const node = new Probe();
  const ci = { tlm_rid: 'parent-row-1' };
  const events = [];
  const dedupe = new Set();
  node.id = 'gexp-intext';
  node.slotIndex = 0;
  node.navIndex = 0;
  node._activeRenderToken = 3;
  node._intextTelemetryCycleId = 7;
  node._intextTelemetryCycle = {
    'gexp-intext-pip-enabled': 'true',
    'gexp-intext-pip-effective-enabled': 'true',
    'gexp-intext-pip-entered': 'false',
    'gexp-intext-pip-entry-count': '0',
    'gexp-intext-pip-visible-ms': '0',
    'gexp-intext-pip-dismissed': 'false',
    'gexp-intext-pip-ended-while-active': 'false',
    'gexp-intext-pip-last-exit-reason': 'none',
    'gexp-intext-pip-entry-played-pct': 'unknown',
    'gexp-intext-pip-exit-played-pct': 'unknown',
  };
  node._pendingIntextTelemetry = {};
  node._intextTelemetryCommittedForCycle = false;
  node._intextTelemetryCommittedReasons = {};
  node._intextTelemetryFinalCommitted = false;
  node._intextTelemetryFinalDeltaCommitted = false;
  node.wa = { cI: ci };
  node.ensureIntextCycleTelemetryIdentity = () => {};
  node.flushIntextTelemetryToCI = () => {};
  node.applyIntextTelemetryToCI = (payload) => Object.assign(ci, payload);
  node.manager = {
    siteContext: {},
    gexp: { statsG: { rows: [ci] } },
    registerIntextSyntheticEvent(type, payload, key) {
      if (dedupe.has(key)) return false;
      dedupe.add(key);
      events.push({ type, payload, key });
      return true;
    },
  };

  node.commitIntextTelemetry('video-rendered');
  assert.equal(events.length, 0, 'el commit temprano actualiza la fila pendiente');
  node.manager.gexp.statsG.rows.length = 0;
  Object.assign(node._intextTelemetryCycle, {
    'gexp-intext-pip-entered': 'true',
    'gexp-intext-pip-entry-count': '2',
    'gexp-intext-pip-visible-ms': '875',
    'gexp-intext-pip-dismissed': 'true',
    'gexp-intext-pip-ended-while-active': 'false',
    'gexp-intext-pip-last-exit-reason': 'user-dismissed',
    'gexp-intext-pip-entry-played-pct': '23.5',
    'gexp-intext-pip-exit-played-pct': '51.25',
  });
  node.commitIntextTelemetry('close-all');
  node.commitIntextTelemetry('destroy');

  assert.equal(events.length, 1, 'solo existe un slot-cycle-final deduplicado');
  assert.equal(events[0].type, 'slot-cycle-final');
  assert.equal(events[0].payload['gexp-intext-parent-tlm-rid'], 'parent-row-1');
  pipFields.forEach((field) => {
    assert.equal(
      events[0].payload[field],
      node._intextTelemetryCycle[field],
      `final payload: ${field}`,
    );
  });
  assert.equal(events[0].payload['gexp-intext-pip-effective-enabled'], 'true');
  assert.equal(events[0].key, 'slot-cycle-final:parent-row-1');
});

test('4. entrada y salida PIP no registran impresiones adicionales', () => {
  const enter = between(source, 'enterIntextPip(', 'exitIntextPip(');
  const exit = between(source, 'exitIntextPip(', 'dismissIntextPip(');
  assert.doesNotMatch(enter, /registerImpression|registerIntextSyntheticEvent/);
  assert.doesNotMatch(exit, /registerImpression|registerIntextSyntheticEvent/);
});

test('5. beginVisualRender limpia con token y ciclo anteriores antes del incremento', () => {
  const methods = [
    between(source, 'resetIntextPipState(', 'maybeEnterIntextPipFromLastIntersection()'),
    between(source, 'beginVisualRender(', 'completeVisualRender('),
  ].join('\n');
  const Probe = buildClass(methods);
  const node = new Probe();
  const cleanups = [];
  node._activeRenderToken = 6;
  node._renderTokenSeq = 6;
  node._intextTelemetryCycleId = 11;
  node.cleanupIntextPip = (reason) => {
    cleanups.push({
      reason,
      renderToken: node._activeRenderToken,
      cycleId: node._intextTelemetryCycleId,
    });
  };
  node.mergeIntextTelemetry = () => {};
  node.applyIntextWrapperDebugAttributes = () => {};
  node.container = { getElement: () => null };
  node.videoContainer = { getElement: () => null };

  assert.equal(node.beginVisualRender('render_started', 'test'), 7);
  assert.deepEqual(cleanups, [{
    reason: 'stale-render-token',
    renderToken: 6,
    cycleId: 11,
  }]);
  assert.equal(node._activeRenderToken, 7);
  assert.equal(node._intextPipState, 'inline');
});

test('6. el aspa queda sobre IMA, recibe un solo click y corta propagación', () => {
  const css = between(source, '.gexp-intext-pip-close {', '.gexp-intext-pip-close:focus-visible');
  const zIndex = Number(css.match(/z-index:\s*(\d+)/)?.[1]);
  const simulatedImaZIndex = 999;
  assert.equal(zIndex, 10000);
  assert.ok(zIndex > simulatedImaZIndex);
  assert.match(css, /pointer-events:\s*auto/);
  assert.match(css, /touch-action:\s*manipulation/);

  const button = between(
    source,
    'if (pip.showCloseButton && !this._intextPipCloseButton)',
    'this._intextPipState = "floating"',
  );
  assert.match(button, /event\.preventDefault\(\)/);
  assert.match(button, /event\.stopPropagation\(\)/);
  assert.match(button, /addEventListener\("click", this\._intextPipCloseHandler, \{ once: true \}\)/);
  assert.ok(
    button.indexOf('event.stopPropagation()') < button.indexOf('this.dismissIntextPip()'),
    'el click publicitario se detiene antes de dismiss',
  );
});

test('7. el player PIP conserva un z-index configurable inferior a capas superiores', () => {
  const playerCss = between(source, '.gexp-intext-pip-player {', '.gexp-intext-slot.gexp-intext-pip-active');
  assert.match(playerCss, /z-index:\s*var\(--gexp-intext-pip-z-index,\s*100000\)/);
  assert.doesNotMatch(playerCss, /2147483647/);
});
