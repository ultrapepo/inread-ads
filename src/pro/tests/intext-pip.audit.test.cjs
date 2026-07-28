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
vm.runInContext(`
  this.IntextManager = ${classSource('IntextManager', 'IntextPlacementEngine')};
  this.IntextNode = ${classSource('IntextNode', 'IntextContainer')};
`, context);
const { IntextManager, IntextNode } = context;

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
  const media = { currentTime: 12, duration: 30, ended: false };
  const player = {
    el: () => playerRoot,
    currentTime: () => media.currentTime,
    duration: () => media.duration,
    ended: () => media.ended,
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
  const second = nodeFixture({}, 'gexp-intext-2');
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
