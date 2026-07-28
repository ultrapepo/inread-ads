const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, '_gam_kv_.js'), 'utf8');

function between(text, start, end) {
  const from = text.indexOf(start);
  const to = text.indexOf(end, from + start.length);
  assert.ok(from >= 0, `missing start marker: ${start}`);
  assert.ok(to > from, `missing end marker: ${end}`);
  return text.slice(from, to);
}

function classSource(name, nextName) {
  return between(source, `class ${name}`, `class ${nextName}`);
}

function styleFixture() {
  const properties = new Map();
  return {
    height: '',
    minHeight: '',
    display: '',
    opacity: '',
    pointerEvents: '',
    setProperty(name, value, priority = '') {
      properties.set(name, { value: String(value), priority: String(priority) });
    },
    getPropertyValue(name) {
      return properties.get(name)?.value || '';
    },
    getPropertyPriority(name) {
      return properties.get(name)?.priority || '';
    },
    removeProperty(name) {
      const previous = properties.get(name)?.value || '';
      properties.delete(name);
      return previous;
    },
  };
}

function classListFixture(initial = []) {
  const values = new Set(initial);
  return {
    add: (...names) => names.forEach((name) => values.add(name)),
    remove: (...names) => names.forEach((name) => values.delete(name)),
    contains: (name) => values.has(name),
    values,
  };
}

function elementFixture({ id = '', classes = [], height = 360 } = {}) {
  const listeners = new Map();
  const element = {
    id,
    nodeType: 1,
    tagName: 'DIV',
    dataset: {},
    style: styleFixture(),
    classList: classListFixture(classes),
    children: [],
    isConnected: true,
    parentNode: null,
    textContent: '',
    setAttribute(name, value) { this[name] = String(value); },
    addEventListener(name, handler) { listeners.set(name, handler); },
    removeEventListener(name, handler) {
      if (listeners.get(name) === handler) listeners.delete(name);
    },
    appendChild(child) {
      child.parentNode = this;
      child.isConnected = true;
      this.children.push(child);
      return child;
    },
    remove() {
      if (this.parentNode) {
        this.parentNode.children = this.parentNode.children.filter((child) => child !== this);
      }
      this.parentNode = null;
      this.isConnected = false;
    },
    dispatch(name, event) { return listeners.get(name)?.(event); },
    getBoundingClientRect: () => ({ top: 100, left: 0, right: 640, bottom: 100 + height, width: 640, height }),
    querySelector() { return null; },
    closest(selector) {
      let current = this;
      while (current) {
        if (selector === '.video-js' && current.classList?.contains('video-js')) return current;
        current = current.parentNode;
      }
      return null;
    },
  };
  return element;
}

let lastObserver = null;
class FakeIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.observed = null;
    this.disconnected = false;
    lastObserver = this;
  }
  observe(element) { this.observed = element; }
  disconnect() { this.disconnected = true; }
}

const documentFixture = {
  visibilityState: 'visible',
  createElement: () => elementFixture({ classes: [] }),
  querySelectorAll: () => [],
};
const windowFixture = {
  innerWidth: 1200,
  innerHeight: 800,
  scrollY: 0,
  ueDataLayer: { device_category: 'desktop' },
  gexpIntextDebug: false,
  getComputedStyle: (element) => ({ display: element.style.display || 'none' }),
};
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
  Promise,
  Error,
  window: windowFixture,
  document: documentFixture,
  IntersectionObserver: FakeIntersectionObserver,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  logIntext() {},
  warnIntext() {},
  errorIntext() {},
  intextDebugCollector: { attachManager() {}, recordTimeline() {}, recordMetric() {} },
});
const telemetryStandardFieldsSource = between(
  source,
  'const INTEXT_TELEMETRY_STANDARD_FIELDS',
  '\n\n      class IntextManager',
);
vm.runInContext(`
  const INTEXT_RANDOM_KEYS = Object.freeze(["random1", "random2", "random3", "random4"]);
  ${telemetryStandardFieldsSource}
  this.IntextManager = ${classSource('IntextManager', 'IntextPlacementEngine')};
  this.IntextNode = ${classSource('IntextNode', 'IntextContainer')};
`, context);
const { IntextManager, IntextNode } = context;

const pipTelemetryFields = [
  'gexp-intext-pip-enabled',
  'gexp-intext-pip-effective-enabled',
  'gexp-intext-pip-entered',
  'gexp-intext-pip-entry-count',
  'gexp-intext-pip-visible-ms',
  'gexp-intext-pip-dismissed',
  'gexp-intext-pip-ended-while-active',
  'gexp-intext-pip-last-exit-reason',
  'gexp-intext-pip-entry-played-pct',
  'gexp-intext-pip-exit-played-pct',
];

function nodeFixture(pipOverrides = {}, id = 'gexp-intext') {
  const wrapper = elementFixture({ id: `${id}-video`, classes: ['gexp-intext-slot', 'is-open'], height: 360 });
  const playerRoot = elementFixture({ id: `${id}-player`, classes: ['video-js'], height: 360 });
  const video = elementFixture({ id: `${id}-media` });
  video.tagName = 'VIDEO';
  const loader = elementFixture({ classes: ['gexp-intext-loader'] });
  loader.style.display = 'none';
  wrapper.appendChild(playerRoot);
  playerRoot.appendChild(video);
  wrapper.appendChild(loader);
  wrapper.querySelector = (selector) => {
    if (selector === '.video-js') return playerRoot;
    if (selector === 'video') return video;
    if (selector === '.gexp-intext-loader') return loader;
    return null;
  };
  const container = { getElement: () => elementFixture({ id }), destroy() {}, close() {}, open() {} };
  const videoContainer = { getElement: () => wrapper, destroy() {}, close() {}, open() {}, isOpen: true };
  const manager = {
    nodes: [],
    gexp: { isMobileDevice: () => false, windows: {} },
    _activeIntextPipNode: null,
    requestActiveIntextPip(node) {
      if (this._activeIntextPipNode && this._activeIntextPipNode !== node) {
        this._activeIntextPipNode.exitIntextPip('replaced-by-another-slot');
      }
      this._activeIntextPipNode = node;
      return true;
    },
    releaseActiveIntextPip(node) {
      if (this._activeIntextPipNode !== node) return false;
      this._activeIntextPipNode = null;
      return true;
    },
  };
  const node = new IntextNode({
    id,
    videoId: `${id}-video`,
    container,
    videoContainer,
    config: { video: { pip: { enabled: true, ...pipOverrides } } },
    manager,
    placement: {},
    slotIndex: 0,
    navIndex: 0,
  });
  manager.nodes.push(node);
  node.state = 'video';
  node._visualState = 'video_completed';
  node._activeRenderToken = 1;
  node._renderTokenSeq = 1;
  node.lockedHeight = 360;
  node._intextTelemetryCycle = {};
  const media = { currentTime: 12, duration: 30, ended: false, paused: false, readyState: 4 };
  const player = {
    el: () => playerRoot,
    currentTime: () => media.currentTime,
    duration: () => media.duration,
    ended: () => media.ended,
    paused: () => media.paused,
  };
  node.activeCreative = {
    player,
    _adMediaEl: media,
    _aborted: false,
    _videoEndHandled: false,
  };
  const telemetry = {};
  node.mergeIntextTelemetry = (payload) => Object.assign(telemetry, payload);
  node.getIntextTelemetryElementMeta = () => ({});
  return { node, manager, wrapper, playerRoot, video, loader, media, telemetry };
}

function telemetryFlowFixture({
  refreshEnabled = false,
  maxCycles = 3,
  parentTelemetryId = 'tlm-parent-1',
} = {}) {
  const fixture = nodeFixture();
  const { node, manager } = fixture;
  const events = [];
  const order = [];
  const syntheticKeys = new Set();

  node.mergeIntextTelemetry = IntextNode.prototype.mergeIntextTelemetry;
  node.config.refreshCycle = {
    enabled: refreshEnabled,
    maxCycles,
    videoIntervalMs: 0,
    mode: 'display_only',
  };
  node.wa = { cI: { tlm_rid: parentTelemetryId } };
  manager.gexp.statsG = { rows: [node.wa.cI] };
  manager.getIntextRandomTelemetry = () => ({});
  manager.gexp.registerImpression = () => {
    throw new Error('the original telemetry row must not be registered again');
  };
  manager.registerIntextSyntheticEvent = (eventType, payload, dedupeKey) => {
    if (dedupeKey && syntheticKeys.has(dedupeKey)) return false;
    if (dedupeKey) syntheticKeys.add(dedupeKey);
    events.push({ eventType, payload, dedupeKey });
    order.push('slot-cycle-final');
    return true;
  };
  manager.onSlotComplete = () => order.push('slot-complete');
  node.waterfall = {
    lastTrigger: 'initial',
    prebidStarted: true,
    startAuction(trigger) {
      order.push(`startAuction:${trigger}`);
      node.startIntextTelemetryCycle(trigger);
      order.push(`startIntextTelemetryCycle:${trigger}`);
    },
  };
  node.startIntextTelemetryCycle('initial');
  node.mergeIntextTelemetry({
    'gexp-intext-request-type': 'video',
    'gexp-intext-video': 'true',
    'gexp-intext-display': 'false',
  });

  return { ...fixture, events, order };
}

function commitEarlyAndSendOriginalRow(fixture) {
  fixture.node.flushIntextTelemetryToCI({
    register: true,
    reason: 'video-rendered',
  });
  assert.equal(
    fixture.node.wa.cI['gexp-intext-telemetry-commit-reason'],
    'video-rendered',
  );
  fixture.manager.gexp.statsG.rows.splice(0);
}

function makeEligible(fixture) {
  fixture.node.handleIntextPipIntersection({ isIntersecting: true, intersectionRatio: 0.5 });
  fixture.node._intextPipFirstFrameConfirmed = true;
  fixture.node._intextPipPlayerRevealed = true;
}

test('1. PIP desactivado por defecto', () => {
  const { node } = nodeFixture({ enabled: false });
  assert.equal(node.getIntextPipConfig().enabled, false);
});

test('2-4. overrides por id activan sólo el slot solicitado y respetan PNC', () => {
  const manager = Object.create(IntextManager.prototype);
  const config = {
    slotOverridesById: {
      'gexp-intext': { video: { pip: { enabled: true } } },
      'gexp-intext-2': { video: { pip: { enabled: false } } },
      pnc: { video: { pip: { enabled: false } } },
    },
  };
  assert.equal(manager.getSlotOverridesForNode(0, 'gexp-intext', config).video.pip.enabled, true);
  assert.equal(manager.getSlotOverridesForNode(1, 'gexp-intext-2', config).video.pip.enabled, false);
  assert.equal(manager.getSlotOverridesForNode(2, 'gexp-intext-pnc-1', config).video.pip.enabled, false);
});

test('5-7. normaliza números, separa ratios y desactiva mobile por defecto', () => {
  const { node } = nodeFixture({
    widthDesktop: 'invalid',
    right: -50,
    enterIntersectionRatio: 2,
    returnIntersectionRatio: -1,
  });
  const pip = node.getIntextPipConfig();
  assert.equal(pip.widthDesktop, 360);
  assert.equal(pip.right, 0);
  assert.ok(pip.returnIntersectionRatio > pip.enterIntersectionRatio);
  assert.equal(pip.enabledMobile, false);
  assert.ok(Object.isFrozen(pip));
});

test('8. no entra antes del primer frame', () => {
  const fixture = nodeFixture();
  fixture.node._intextPipPlayerRevealed = true;
  fixture.node._intextPipAnchorEverVisible = true;
  fixture.node._intextPipLastIntersectionRatio = 0;
  assert.equal(fixture.node.canEnterIntextPip(), false);
});

test('9. no entra antes de reveal', () => {
  const fixture = nodeFixture();
  fixture.node._intextPipFirstFrameConfirmed = true;
  fixture.node._intextPipAnchorEverVisible = true;
  fixture.node._intextPipLastIntersectionRatio = 0;
  assert.equal(fixture.node.canEnterIntextPip(), false);
});

test('10. no entra si el anchor nunca fue visible', () => {
  const fixture = nodeFixture();
  fixture.node._intextPipFirstFrameConfirmed = true;
  fixture.node._intextPipPlayerRevealed = true;
  fixture.node._intextPipLastIntersectionRatio = 0;
  assert.equal(fixture.node.canEnterIntextPip(), false);
});

test('11. no entra con pestaña oculta', () => {
  const fixture = nodeFixture();
  makeEligible(fixture);
  documentFixture.visibilityState = 'hidden';
  fixture.node._intextPipLastIntersectionRatio = 0;
  assert.equal(fixture.node.canEnterIntextPip(), false);
  documentFixture.visibilityState = 'visible';
});

test('12-19. entra al salir y conserva player, tiempo, DOM, wrapper, altura y apertura', () => {
  const fixture = nodeFixture();
  makeEligible(fixture);
  const originalPlayer = fixture.node.activeCreative.player;
  const originalTime = fixture.media.currentTime;
  const originalChildren = fixture.wrapper.children.length;
  assert.equal(fixture.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 }), true);
  assert.equal(fixture.node._intextPipState, 'floating');
  assert.equal(fixture.node.activeCreative.player, originalPlayer);
  assert.equal(fixture.media.currentTime, originalTime);
  assert.equal(fixture.wrapper.children.filter((child) => child.tagName === 'VIDEO').length, 0);
  assert.equal(fixture.playerRoot.parentNode, fixture.wrapper);
  assert.equal(fixture.wrapper.classList.contains('gexp-intext-pip-active'), true);
  assert.equal(fixture.wrapper.classList.contains('gexp-intext-pip-player'), false);
  assert.equal(fixture.wrapper.style.minHeight, '360px');
  assert.equal(fixture.wrapper.classList.contains('is-open'), true);
  assert.equal(fixture.wrapper.children.length, originalChildren);
});

test('20-25. retorno usa histéresis, restaura estilos, quita botón y no toca reproducción/refresh', () => {
  const fixture = nodeFixture();
  makeEligible(fixture);
  fixture.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 });
  const originalTime = fixture.media.currentTime;
  assert.equal(fixture.node.handleIntextPipIntersection({ isIntersecting: true, intersectionRatio: 0.2 }), false);
  assert.equal(fixture.node._intextPipState, 'floating');
  assert.equal(fixture.node.handleIntextPipIntersection({ isIntersecting: true, intersectionRatio: 0.35 }), true);
  assert.equal(fixture.node._intextPipState, 'inline');
  assert.equal(fixture.playerRoot.classList.contains('gexp-intext-pip-player'), false);
  assert.equal(fixture.wrapper.classList.contains('gexp-intext-pip-active'), false);
  assert.equal(fixture.wrapper.style.minHeight, '');
  assert.equal(fixture.node._intextPipCloseButton, null);
  assert.equal(fixture.media.currentTime, originalTime);
  assert.equal(fixture.node._videoVisibilityTimer, undefined);
});

test('26-31. aspa no propaga, vuelve inline, no pausa/cierra y descarta sólo el token actual', () => {
  const fixture = nodeFixture();
  makeEligible(fixture);
  fixture.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 });
  let prevented = false;
  let stopped = false;
  const button = fixture.node._intextPipCloseButton;
  button.dispatch('click', {
    preventDefault: () => { prevented = true; },
    stopPropagation: () => { stopped = true; },
  });
  assert.equal(prevented, true);
  assert.equal(stopped, true);
  assert.equal(fixture.node._intextPipState, 'dismissed');
  assert.equal(fixture.wrapper.classList.contains('is-open'), true);
  assert.equal(fixture.media.currentTime, 12);
  assert.equal(fixture.node.enterIntextPip(), false);
  fixture.node._activeRenderToken = 2;
  fixture.node._renderTokenSeq = 2;
  fixture.node.resetIntextPipForRenderToken(2);
  makeEligible(fixture);
  assert.equal(fixture.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 }), true);
});

test('32-34. final elimina PIP primero y conserva el refresh ligado al wrapper', () => {
  const onEnded = between(source, 'onVideoEnded(renderToken', 'closeAll()');
  assert.ok(onEnded.indexOf('this.exitIntextPip("video-ended")') < onEnded.indexOf('const refreshCfg'));
  assert.match(onEnded, /observer\.observe\(el\)/);
  assert.doesNotMatch(onEnded, /_intextPipPlayerElement.*observe/);
});

test('35-39. error, timeout, fallback y destroy limpian clases y referencias', () => {
  assert.match(source, /cleanupIntextPip\(videoErrorCode === "timeout" \? "video-timeout" : "video-error"\)/);
  assert.match(source, /cleanupIntextPip\?\.\("video-fallback"\)/);
  const fixture = nodeFixture();
  makeEligible(fixture);
  fixture.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 });
  fixture.node.cleanupIntextPip('video-error');
  assert.equal(fixture.playerRoot.classList.contains('gexp-intext-pip-player'), false);
  assert.equal(fixture.wrapper.classList.contains('gexp-intext-pip-active'), false);
  assert.equal(fixture.node._intextPipCloseButton, null);
  assert.equal(fixture.node._intextPipPlayerElement, null);
  assert.doesNotMatch(between(source, 'async showDisplay(', 'discardDisplay()'), /gexp-intext-pip-player/);
});

test('40-44. manager permite un único PIP y libera sin detener al anterior', () => {
  const first = nodeFixture({}, 'gexp-intext');
  const second = nodeFixture({
    slots: {
      default: false,
      'gexp-intext': true,
      'gexp-intext-2': true,
      'gexp-intext-3': false,
      pnc: false,
    },
  }, 'gexp-intext-2');
  second.node.manager = first.manager;
  makeEligible(first);
  makeEligible(second);
  first.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 });
  const firstTime = first.media.currentTime;
  second.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 });
  assert.equal(first.node._intextPipState, 'inline');
  assert.equal(second.node._intextPipState, 'floating');
  assert.equal(first.media.currentTime, firstTime);
  assert.equal(first.manager._activeIntextPipNode, second.node);
  second.node.exitIntextPip('anchor-returned');
  assert.equal(first.manager._activeIntextPipNode, null);
  assert.match(source, /cleanupIntextPip\("node-destroy"\)/);
});

test('45-50. debugger registra eventos PIP y summary deriva entradas y duración desde logs', () => {
  [
    'video_pip_entered',
    'video_pip_returned_inline',
    'video_pip_dismissed',
    'video_pip_video_ended',
    'accumulatedPipVisibleMs',
    'group.video.pip =',
    'totalFloatingMs',
  ].forEach((token) => assert.ok(source.includes(token), token));
});

test('51-54. no añade polling/scroll/observer y reutiliza el observer existente', () => {
  const pipMethods = between(source, 'getIntextPipConfig()', 'maybeIncrementFallbackBlankControl(');
  assert.doesNotMatch(pipMethods, /setInterval|addEventListener\(["']scroll/);
  const observerMethod = between(
    source,
    '\n        setupIntextViewportTelemetryObserver() {',
    '\n        teardownIntextViewportTelemetryObserver() {',
  );
  assert.equal((observerMethod.match(/new IntersectionObserver/g) || []).length, 1);
  const fixture = nodeFixture();
  fixture.node.setupIntextViewportTelemetryObserver();
  assert.equal(lastObserver.observed, fixture.wrapper);
  assert.deepEqual(Array.from(lastObserver.options.threshold), [0, 0.05, 0.35, 1]);
});

test('55-56. campos PIP llegan al ciclo sin registrar impresión adicional', () => {
  const allowlist = between(source, 'getStandardIntextTelemetryAllowlist()', 'filterIntextTelemetryForCI(');
  [
    'gexp-intext-pip-enabled',
    'gexp-intext-pip-entered',
    'gexp-intext-pip-entry-count',
    'gexp-intext-pip-visible-ms',
    'gexp-intext-pip-dismissed',
    'gexp-intext-pip-ended-while-active',
    'gexp-intext-pip-last-exit-reason',
    'gexp-intext-pip-entry-played-pct',
    'gexp-intext-pip-exit-played-pct',
  ].forEach((field) => assert.ok(allowlist.includes(field), field));
  const pipMethods = between(source, 'getIntextPipConfig()', 'maybeIncrementFallbackBlankControl(');
  assert.doesNotMatch(pipMethods, /registerImpression|registerIntextSyntheticEvent/);
});

test('57-63. PIP off y core display/fallback/refresh/debugger conservan sus rutas', () => {
  const fixture = nodeFixture({ enabled: false });
  fixture.node._intextPipFirstFrameConfirmed = true;
  fixture.node._intextPipPlayerRevealed = true;
  fixture.node._intextPipAnchorEverVisible = true;
  fixture.node._intextPipLastIntersectionRatio = 0;
  assert.equal(fixture.node.canEnterIntextPip(), false);
  assert.match(source, /this\.node\.showDisplay\(displayResult, renderToken, requestTrigger\)/);
  assert.match(source, /this\.waterfall\.startAuction\("refresh"\)/);
  assert.match(source, /video_fallback_started/);
  assert.match(source, /const createIntextDebugCollector/);
  assert.doesNotMatch(source, /requestPictureInPicture/);
  assert.doesNotMatch(source, /document\.body\.appendChild\(playerElement\)/);
});

test('64-65. sintaxis y whitespace son válidos', () => {
  assert.doesNotThrow(() => new vm.Script(source));
  assert.doesNotMatch(source, /^(<<<<<<<|=======|>>>>>>>)/m);
});

test('66-73. video-ended emite el delta PIP completo antes de iniciar refresh', async () => {
  const fixture = telemetryFlowFixture({ refreshEnabled: true });
  commitEarlyAndSendOriginalRow(fixture);
  makeEligible(fixture);
  assert.equal(
    fixture.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 }),
    true,
  );
  fixture.node._intextPipEnteredAt = Date.now() - 1250;

  fixture.node.onVideoEnded();

  assert.equal(fixture.events.length, 1);
  const finalEvent = fixture.events[0];
  assert.equal(finalEvent.eventType, 'slot-cycle-final');
  assert.equal(finalEvent.dedupeKey, 'slot-cycle-final:tlm-parent-1');
  assert.equal(finalEvent.payload['gexp-intext-parent-tlm-rid'], 'tlm-parent-1');
  assert.equal(finalEvent.payload['gexp-intext-cycle-finalized-after-early-flush'], 'true');
  assert.equal(finalEvent.payload['gexp-intext-telemetry-commit-reason'], 'video-ended');
  pipTelemetryFields.forEach((field) => assert.ok(field in finalEvent.payload, field));
  assert.equal(finalEvent.payload['gexp-intext-pip-entered'], 'true');
  assert.equal(finalEvent.payload['gexp-intext-pip-entry-count'], '1');
  assert.ok(Number(finalEvent.payload['gexp-intext-pip-visible-ms']) >= 1250);
  assert.equal(finalEvent.payload['gexp-intext-pip-dismissed'], 'false');
  assert.equal(finalEvent.payload['gexp-intext-pip-ended-while-active'], 'true');
  assert.equal(finalEvent.payload['gexp-intext-pip-last-exit-reason'], 'video-ended');
  assert.equal(finalEvent.payload['gexp-intext-pip-entry-played-pct'], '40');
  assert.equal(finalEvent.payload['gexp-intext-pip-exit-played-pct'], '40');

  const refreshObserver = lastObserver;
  refreshObserver.callback([{ isIntersecting: true, intersectionRatio: 1 }]);
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.deepEqual(fixture.order.slice(0, 3), [
    'slot-cycle-final',
    'startAuction:refresh',
    'startIntextTelemetryCycle:refresh',
  ]);
  assert.equal(fixture.node._intextTelemetryCycle['gexp-intext-load-trigger'], 'refresh');
});

test('74-76. la fila original pendiente se actualiza sin evento sintético', () => {
  const fixture = telemetryFlowFixture({ refreshEnabled: false });
  fixture.node.flushIntextTelemetryToCI({
    register: true,
    reason: 'video-rendered',
  });
  const originalRow = fixture.node.wa.cI;
  makeEligible(fixture);
  fixture.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 });
  fixture.node.onVideoEnded();

  assert.equal(fixture.manager.gexp.statsG.rows[0], originalRow);
  assert.equal(fixture.events.length, 0);
  assert.equal(originalRow['gexp-intext-pip-ended-while-active'], 'true');
  assert.equal(originalRow['gexp-intext-pip-last-exit-reason'], 'video-ended');
});

test('77-80. refresh deshabilitado y cierres posteriores quedan deduplicados', () => {
  const fixture = telemetryFlowFixture({ refreshEnabled: false });
  commitEarlyAndSendOriginalRow(fixture);
  fixture.node.onVideoEnded();
  fixture.node.flushIntextTelemetryToCI({ register: true, reason: 'close-all' });
  fixture.node.flushIntextTelemetryToCI({ register: true, reason: 'destroy' });

  assert.equal(fixture.events.length, 1);
  assert.equal(fixture.events[0].payload['gexp-intext-telemetry-commit-reason'], 'video-ended');
  assert.equal(fixture.order.includes('slot-complete'), true);
  assert.equal(fixture.order.some((entry) => entry.startsWith('startAuction:')), false);
});

test('81-83. maxCycles conserva el delta y cierra después de video-ended', () => {
  const fixture = telemetryFlowFixture({ refreshEnabled: true, maxCycles: 1 });
  commitEarlyAndSendOriginalRow(fixture);
  makeEligible(fixture);
  fixture.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 });
  fixture.node.onVideoEnded();

  assert.equal(fixture.events.length, 1);
  assert.equal(fixture.events[0].payload['gexp-intext-pip-ended-while-active'], 'true');
  assert.deepEqual(fixture.order.slice(0, 2), ['slot-cycle-final', 'slot-complete']);
  assert.equal(fixture.order.some((entry) => entry.startsWith('startAuction:')), false);
});

test('84-86. final sin entrada PIP registra los defaults false/0/none', () => {
  const fixture = telemetryFlowFixture({ refreshEnabled: false });
  commitEarlyAndSendOriginalRow(fixture);
  fixture.node.onVideoEnded();

  const payload = fixture.events[0].payload;
  assert.equal(payload['gexp-intext-pip-entered'], 'false');
  assert.equal(payload['gexp-intext-pip-entry-count'], '0');
  assert.equal(payload['gexp-intext-pip-visible-ms'], '0');
  assert.equal(payload['gexp-intext-pip-dismissed'], 'false');
  assert.equal(payload['gexp-intext-pip-ended-while-active'], 'false');
  assert.equal(payload['gexp-intext-pip-last-exit-reason'], 'none');
});

test('87-89. dismiss previo conserva dismissed, duración y último motivo', () => {
  const fixture = telemetryFlowFixture({ refreshEnabled: false });
  commitEarlyAndSendOriginalRow(fixture);
  makeEligible(fixture);
  fixture.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 });
  fixture.node._intextPipEnteredAt = Date.now() - 800;
  fixture.node.dismissIntextPip();
  fixture.node.onVideoEnded();

  const payload = fixture.events[0].payload;
  assert.equal(payload['gexp-intext-pip-dismissed'], 'true');
  assert.equal(payload['gexp-intext-pip-ended-while-active'], 'false');
  assert.equal(payload['gexp-intext-pip-last-exit-reason'], 'user-dismissed');
  assert.ok(Number(payload['gexp-intext-pip-visible-ms']) >= 800);
});

test('90-93. retorno inline conserva duración/motivo y PIP no registra impresiones', () => {
  const fixture = telemetryFlowFixture({ refreshEnabled: false });
  commitEarlyAndSendOriginalRow(fixture);
  makeEligible(fixture);
  fixture.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 });
  fixture.node._intextPipEnteredAt = Date.now() - 600;
  fixture.node.exitIntextPip('anchor-returned');
  fixture.node.onVideoEnded();

  const payload = fixture.events[0].payload;
  assert.equal(payload['gexp-intext-pip-ended-while-active'], 'false');
  assert.equal(payload['gexp-intext-pip-last-exit-reason'], 'anchor-returned');
  assert.ok(Number(payload['gexp-intext-pip-visible-ms']) >= 600);
  assert.equal(fixture.events.length, 1);
});

test('94-96. contrato fuente mantiene video-ended, flush y dedupe por parentTelemetryId', () => {
  const commit = between(source, 'commitIntextTelemetry(reason', 'accumulateIntextViewportVisibleMs()');
  const onEnded = between(source, 'onVideoEnded(renderToken', 'closeAll()');
  assert.match(commit, /"video-ended"/);
  assert.match(commit, /const finalDedupeKey = `slot-cycle-final:\$\{parentTelemetryId\}`/);
  assert.doesNotMatch(commit, /slot-cycle-final:\$\{parentTelemetryId\}:\$\{reason\}/);
  assert.ok(
    onEnded.indexOf('reason: "video-ended"') <
      onEnded.indexOf('const refreshCfg = this.config.refreshCycle'),
  );
});

test('97-101. playback pausado/terminado/sin player bloquea y playing permite PIP', () => {
  const paused = nodeFixture();
  makeEligible(paused);
  paused.media.paused = true;
  paused.node._intextPipLastIntersectionRatio = 0;
  assert.equal(paused.node.getIntextPipEntryBlockReason(), 'video-not-playing');
  assert.equal(paused.node.enterIntextPip(), false);

  paused.media.paused = false;
  paused.node.setIntextPipPlaybackActive(true, 'test-playing');
  assert.equal(paused.node._intextPipState, 'floating');

  const ended = nodeFixture();
  makeEligible(ended);
  ended.media.ended = true;
  ended.node._intextPipLastIntersectionRatio = 0;
  assert.equal(ended.node.getIntextPipEntryBlockReason(), 'video-ended');

  const unavailable = nodeFixture();
  makeEligible(unavailable);
  unavailable.node.activeCreative = null;
  unavailable.node._intextPipLastIntersectionRatio = 0;
  assert.equal(unavailable.node.getIntextPipEntryBlockReason(), 'creative-unavailable');
});

test('102-105. resume fuera de viewport reevalúa sin debilitar first frame ni reveal', () => {
  const fixture = nodeFixture();
  makeEligible(fixture);
  fixture.media.paused = true;
  assert.equal(
    fixture.node.handleIntextPipIntersection({ isIntersecting: false, intersectionRatio: 0 }),
    false,
  );
  fixture.media.paused = false;
  fixture.node.setIntextPipPlaybackActive(true, 'ima-resumed');
  assert.equal(fixture.node._intextPipState, 'floating');

  const firstFrame = nodeFixture();
  firstFrame.node._intextPipPlayerRevealed = true;
  firstFrame.node._intextPipAnchorEverVisible = true;
  firstFrame.node._intextPipLastIntersectionRatio = 0;
  firstFrame.node.setIntextPipPlaybackActive(true, 'test-playing');
  assert.equal(firstFrame.node._intextPipState, 'inline');

  const reveal = nodeFixture();
  reveal.node._intextPipFirstFrameConfirmed = true;
  reveal.node._intextPipAnchorEverVisible = true;
  reveal.node._intextPipLastIntersectionRatio = 0;
  reveal.node.setIntextPipPlaybackActive(true, 'test-playing');
  assert.equal(reveal.node._intextPipState, 'inline');
});

test('106-109. fallback y loader bloquean nuevas entradas PIP', () => {
  const fallback = nodeFixture();
  makeEligible(fallback);
  fallback.node._visualState = 'fallback_started';
  fallback.node._intextPipLastIntersectionRatio = 0;
  assert.equal(fallback.node.getIntextPipEntryBlockReason(), 'error-or-fallback');

  const loader = nodeFixture();
  makeEligible(loader);
  loader.loader.style.display = 'flex';
  loader.node._intextPipLastIntersectionRatio = 0;
  assert.equal(loader.node.getIntextPipEntryBlockReason(), 'loader-visible');
});

test('110-117. master y mapa de slots permiten únicamente los slots configurados', () => {
  assert.equal(nodeFixture({ enabled: false }).node.isIntextPipSlotEnabled(), true);
  assert.equal(nodeFixture({ enabled: false }).node.isIntextPipEnabled(), false);
  assert.equal(nodeFixture({}, 'gexp-intext').node.isIntextPipSlotEnabled(), true);
  assert.equal(nodeFixture({}, 'gexp-intext-2').node.isIntextPipSlotEnabled(), false);
  assert.equal(nodeFixture({}, 'gexp-intext-3').node.isIntextPipSlotEnabled(), false);
  assert.equal(nodeFixture({}, 'gexp-intext-pnc-2').node.isIntextPipSlotEnabled(), false);
  const second = nodeFixture({
    slots: { default: false, 'gexp-intext': true, 'gexp-intext-2': true, pnc: false },
  }, 'gexp-intext-2');
  assert.equal(second.node.isIntextPipSlotEnabled(), true);
  second.node.state = 'display';
  assert.equal(second.node.isIntextPipEnabled(), false);
});

function targetingFixture(pipRules, { hostname = 'www.marca.com', targeting = {} } = {}) {
  const fixture = nodeFixture(pipRules);
  fixture.node.scopedContext = { hostname, targeting };
  fixture.manager.getHostnameNormalized = (value) => String(value || '')
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0];
  fixture.manager.getPageCustomTargeting = (contextValue) => contextValue?.targeting || {};
  fixture.manager.getIntextRandomValue = (key) => (
    key === 'random1' ? '5' : null
  );
  return fixture;
}

test('118-124. inclusions PIP validan site, KV y ambas dimensiones', () => {
  assert.equal(targetingFixture({}).node.resolveIntextPipTargetingEligibility().allowed, true);
  const siteRules = {
    inclusions: { enabled: true, sites: ['marca.com'], keyValues: {} },
  };
  assert.equal(targetingFixture(siteRules).node.resolveIntextPipTargetingEligibility().allowed, true);
  assert.equal(
    targetingFixture(siteRules, { hostname: 'elmundo.es' }).node.resolveIntextPipTargetingEligibility().reason,
    'pip-inclusion-site-not-matched',
  );
  const kvRules = {
    inclusions: { enabled: true, sites: [], keyValues: { ct: ['n', 'o'] } },
  };
  assert.equal(
    targetingFixture(kvRules, { targeting: { ct: 'n' } }).node.resolveIntextPipTargetingEligibility().allowed,
    true,
  );
  assert.equal(
    targetingFixture(kvRules, { targeting: { ct: 'v' } }).node.resolveIntextPipTargetingEligibility().reason,
    'pip-inclusion-keyvalue-not-matched',
  );
  const combined = {
    inclusions: { enabled: true, sites: ['marca.com'], keyValues: { ct: ['n'] } },
  };
  assert.equal(
    targetingFixture(combined, { targeting: { ct: 'n' } }).node.resolveIntextPipTargetingEligibility().allowed,
    true,
  );
  assert.equal(
    targetingFixture(combined, { hostname: 'elmundo.es', targeting: { ct: 'n' } })
      .node.resolveIntextPipTargetingEligibility().allowed,
    false,
  );
});

test('125-132. exclusions prevalecen y soportan arrays, comas, random y scoped PNC', () => {
  const site = targetingFixture({
    exclusions: { enabled: true, disableAll: false, sites: ['marca.com'], keyValues: {} },
  });
  assert.equal(site.node.resolveIntextPipTargetingEligibility().reason, 'pip-excluded-site');

  const kv = targetingFixture({
    exclusions: { enabled: true, disableAll: false, sites: [], keyValues: { section: ['economia'] } },
  }, { targeting: { section: 'deportes,economia' } });
  assert.equal(kv.node.resolveIntextPipTargetingEligibility().reason, 'pip-excluded-keyvalue');

  const disabled = targetingFixture({
    exclusions: { enabled: true, disableAll: true, sites: [], keyValues: {} },
  });
  assert.equal(disabled.node.resolveIntextPipTargetingEligibility().reason, 'pip-exclusions-disable-all');

  const precedence = targetingFixture({
    inclusions: { enabled: true, sites: ['marca.com'], keyValues: {} },
    exclusions: { enabled: true, disableAll: false, sites: ['marca.com'], keyValues: {} },
  });
  assert.equal(precedence.node.resolveIntextPipTargetingEligibility().reason, 'pip-excluded-site');

  const random = targetingFixture({
    inclusions: { enabled: true, sites: [], keyValues: { random1: ['5', '6'] } },
  });
  assert.equal(random.node.resolveIntextPipTargetingEligibility().allowed, true);

  const pnc = targetingFixture({
    inclusions: { enabled: true, sites: [], keyValues: { ct: ['n'] } },
  }, { targeting: { ct: ['o', 'n'] } });
  pnc.node.id = 'gexp-intext-pnc-4';
  assert.equal(pnc.node.resolveIntextPipTargetingEligibility().allowed, true);

  pnc.manager.intextQaCookieOverride = { enabled: true, forceExclusions: true };
  pnc.node.config.video.pip.exclusions = {
    enabled: true,
    disableAll: true,
    sites: [],
    keyValues: {},
  };
  assert.equal(pnc.node.resolveIntextPipTargetingEligibility().allowed, false);
});

test('133-138. refresh exige anchor e IntersectionObserver visible', () => {
  const missing = telemetryFlowFixture({ refreshEnabled: true });
  commitEarlyAndSendOriginalRow(missing);
  missing.node.videoContainer.getElement = () => null;
  missing.node.onVideoEnded();
  assert.equal(missing.order.some((entry) => entry.startsWith('startAuction:')), false);
  assert.equal(missing.node._intextTelemetryCycle['gexp-intext-refresh-blocked'], 'true');
  assert.equal(
    missing.node._intextTelemetryCycle['gexp-intext-refresh-blocked-reason'],
    'refresh-anchor-missing',
  );

  const outside = telemetryFlowFixture({ refreshEnabled: true });
  commitEarlyAndSendOriginalRow(outside);
  outside.node.onVideoEnded();
  const outsideObserver = lastObserver;
  outsideObserver.callback([{ isIntersecting: false, intersectionRatio: 0 }]);
  assert.equal(outside.order.some((entry) => entry.startsWith('startAuction:')), false);
  outside.node._videoVisibilityTimer.stop();

  documentFixture.visibilityState = 'hidden';
  const hidden = telemetryFlowFixture({ refreshEnabled: true });
  commitEarlyAndSendOriginalRow(hidden);
  hidden.node.onVideoEnded();
  const hiddenObserver = lastObserver;
  hiddenObserver.callback([{ isIntersecting: true, intersectionRatio: 1 }]);
  assert.equal(hidden.order.some((entry) => entry.startsWith('startAuction:')), false);
  documentFixture.visibilityState = 'visible';
  hiddenObserver.callback([{ isIntersecting: false, intersectionRatio: 0 }]);
  hiddenObserver.callback([{ isIntersecting: true, intersectionRatio: 1 }]);
  assert.equal(hidden.order.includes('startAuction:refresh'), true);

  const onEnded = between(source, 'onVideoEnded(renderToken', 'closeAll()');
  assert.doesNotMatch(onEnded, /video_refresh_missing_el_timer/);
  assert.doesNotMatch(onEnded, /setTimeout\([\s\S]*startAuction\("refresh"\)/);
});
