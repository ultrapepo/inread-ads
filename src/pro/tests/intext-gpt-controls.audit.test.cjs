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

const intextSource = between(
  source,
  'class IntextManager',
  'class WPromise',
);

test('GPT Intext: resolver PSP aislado y scheduler con firmas separadas', () => {
  const resolver = between(intextSource, 'isUsableIntextGptApi(', 'createIntextTelemetryId(');
  assert.match(resolver, /controller\.baseObject/);
  assert.match(resolver, /controller\.innerObject/);
  assert.ok(resolver.indexOf('controller.baseObject') < resolver.indexOf('controller.innerObject'));
  assert.match(resolver, /initial\.proxy\.cmd\.push\(execute, true\)/);
  assert.match(resolver, /initial\.proxy\.cmd\.push\(execute\)/);
  assert.match(resolver, /psp-real-gpt-unavailable/);
});

test('GPT Intext: display opera exclusivamente con API y servicio resueltos', () => {
  const display = between(
    intextSource,
    'askDisplay(',
    'waitForViewport(',
  );
  [
    /gpt\.defineSlot/,
    /candidateSlot\.addService\(pubads\)/,
    /gpt\.display/,
    /pubads\.refresh/,
    /settleOnce/,
  ].forEach((pattern) => assert.match(display, pattern));
  assert.doesNotMatch(display, /googletag\.(?:defineSlot|display|destroySlots)|googletag\.pubads\(\)\.refresh/);
});

test('GPT Intext: retry, discard y reset preservan identidad de destrucción', () => {
  const retry = between(
    intextSource,
    'destroyDisplayForRetry(',
    'discardDisplay()',
  );
  const discard = between(
    intextSource,
    'discardDisplay()',
    'buildAndPlayVideo(',
  );
  const reset = between(
    intextSource,
    'resetNode()',
    'class IntextContainer',
  );
  [retry, discard, reset].forEach((block) => assert.match(block, /destroyIntextDisplaySlot/));

  const prebid = between(
    intextSource,
    'registerPrebidAdUnit(',
    'registerPrebidAliases()',
  );
  assert.match(prebid, /_slotPubadsService \|\| gpt\.pubads\(\)/);
  assert.match(prebid, /key\.startsWith\('hb_'\)/);
  assert.match(prebid, /slot\.clearTargeting\(key\)/);
});

test('GPT Intext: Rewarded y resolver GPT exterior permanecen aislados', () => {
  const gamExp = between(source, 'class GAMExp', 'class RewardedAdManager');
  const rewarded = source.slice(source.indexOf('class RewardedAdManager'));
  assert.doesNotMatch(gamExp, /__ctrl\.baseObject/);
  assert.doesNotMatch(rewarded, /resolveIntextGptApi|runIntextGptCommand/);
});

const debugMetrics = [];
const elementFactory = (tagName = 'div') => {
  const attributes = new Map();
  return {
    tagName: String(tagName).toUpperCase(),
    id: '',
    className: '',
    style: {},
    children: [],
    parentElement: null,
    muted: false,
    defaultMuted: false,
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    getAttribute(name) {
      return attributes.get(name) ?? null;
    },
    hasAttribute(name) {
      return attributes.has(name);
    },
    appendChild(child) {
      child.parentElement = this;
      this.children.push(child);
      return child;
    },
    querySelector() {
      return null;
    },
  };
};

const videoContext = vm.createContext({
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
  URLSearchParams,
  setTimeout,
  clearTimeout,
  window: {
    gexpIntextDebug: false,
    videojs: undefined,
  },
  document: {
    createElement: (tagName) => elementFactory(tagName),
  },
  intextDebugCollector: {
    recordMetric(metric, payload) {
      debugMetrics.push({ metric, payload });
    },
    recordVideoEvent() {},
  },
  logIntext() {},
  warnIntext() {},
  errorIntext() {},
});

vm.runInContext(`
  const INTEXT_RANDOM_KEYS = Object.freeze(["random1", "random2", "random3", "random4"]);
  this.IntextVideoCreative = ${classSource('IntextVideoCreative', 'WPromise')};
`, videoContext);

const { IntextVideoCreative } = videoContext;

function controlsFixture({
  controls,
  mutedOnStart,
  debug = false,
  renderToken = 1,
} = {}) {
  debugMetrics.length = 0;
  const rootElement = elementFactory('div');
  const container = {
    getElement: () => rootElement,
  };
  const node = {
    _activeRenderToken: renderToken,
    id: 'gexp-intext',
    setIntextPipPlaybackActive() {},
  };
  const config = {
    video: {},
  };
  if (controls !== undefined) config.video.controls = controls;
  if (mutedOnStart !== undefined) config.video.mutedOnStart = mutedOnStart;

  const creative = new IntextVideoCreative({
    container,
    adTagUrl: 'https://example.test/vast',
    node,
    config,
  });
  creative.createVideoElement();

  const events = new Map();
  let mutedState = false;
  let controlsState = null;
  let userActiveState = null;
  let capturedOptions = null;
  const player = {
    on(name, handler) {
      const handlers = events.get(name) || [];
      handlers.push(handler);
      events.set(name, handlers);
    },
    muted(value) {
      if (arguments.length > 0) mutedState = Boolean(value);
      return mutedState;
    },
    controls(value) {
      if (arguments.length > 0) controlsState = Boolean(value);
      return controlsState;
    },
    userActive(value) {
      if (arguments.length > 0) userActiveState = Boolean(value);
      return userActiveState;
    },
    error() {
      return null;
    },
  };

  videoContext.window.gexpIntextDebug = debug;
  videoContext.window.videojs = (videoElement, options) => {
    assert.equal(videoElement, creative.videoEl);
    capturedOptions = options;
    return player;
  };
  creative.initVideoJS();

  return {
    creative,
    rootElement,
    player,
    events,
    get options() {
      return capturedOptions;
    },
    get mutedState() {
      return mutedState;
    },
    get controlsState() {
      return controlsState;
    },
    get userActiveState() {
      return userActiveState;
    },
  };
}

test('controles 1 y 13-14: defaults completos y elemento/player silenciados', () => {
  const fixture = controlsFixture();
  const controls = fixture.creative.resolveVideoControlsConfig();
  assert.deepEqual(
    JSON.parse(JSON.stringify(controls)),
    {
      enabled: true,
      playPause: true,
      muteToggle: true,
      volumeControl: true,
      progressControl: true,
      timeDisplay: true,
      fullscreen: false,
      nativePictureInPicture: false,
      autoHide: false,
      showForJsAds: true,
      mutedOnStart: true,
    },
  );
  assert.equal(fixture.creative.videoEl.hasAttribute('playsinline'), true);
  assert.equal(fixture.creative.videoEl.hasAttribute('webkit-playsinline'), true);
  assert.equal(fixture.creative.videoEl.hasAttribute('muted'), true);
  assert.equal(fixture.creative.videoEl.defaultMuted, true);
  assert.equal(fixture.creative.videoEl.muted, true);
  assert.equal(fixture.options.controls, true);
  assert.equal(fixture.options.muted, true);
  assert.equal(fixture.mutedState, true);
  assert.equal(fixture.options.inactivityTimeout, 0);
  assert.equal(fixture.userActiveState, true);
});

test('controles 2-9: árbol Video.js respeta barra, botones y volumen sin duplicados', () => {
  const disabled = controlsFixture({
    controls: { enabled: false },
  });
  assert.equal(disabled.options.controlBar, false);
  assert.equal(disabled.controlsState, false);

  const playPause = controlsFixture({
    controls: { playPause: false },
  });
  assert.equal(playPause.options.controlBar.playToggle, false);
  assert.equal(playPause.options.controlBar.progressControl, true);

  const muteOnly = controlsFixture({
    controls: {
      muteToggle: true,
      volumeControl: false,
    },
  });
  assert.deepEqual(
    Array.from(muteOnly.options.controlBar.volumePanel.children),
    ['muteToggle'],
  );

  const volumeOnly = controlsFixture({
    controls: {
      muteToggle: false,
      volumeControl: true,
    },
  });
  assert.deepEqual(
    Array.from(volumeOnly.options.controlBar.volumePanel.children),
    ['volumeControl'],
  );

  const noVolume = controlsFixture({
    controls: {
      muteToggle: false,
      volumeControl: false,
    },
  });
  assert.equal(noVolume.options.controlBar.volumePanel, false);

  const fullscreen = controlsFixture({
    controls: {
      fullscreen: true,
      nativePictureInPicture: true,
    },
  });
  assert.equal(fullscreen.options.controlBar.fullscreenToggle, true);
  assert.equal(fullscreen.options.controlBar.pictureInPictureToggle, true);
});

test('controles 10-12: PiP nativo oculto y auto-hide configurable', () => {
  const defaults = controlsFixture();
  assert.equal(
    defaults.options.controlBar.pictureInPictureToggle,
    false,
  );
  assert.equal(defaults.options.inactivityTimeout, 0);

  const autoHide = controlsFixture({
    controls: { autoHide: true },
  });
  assert.equal(autoHide.options.inactivityTimeout, 2000);
  assert.equal(autoHide.userActiveState, null);
});

test('controles 16-20: no hay desmute automático y cada creative inicia muted', () => {
  const fixture = controlsFixture();
  fixture.player.muted(false);
  assert.equal(fixture.player.muted(), false);
  for (const handler of fixture.events.get('adstart') || []) handler();
  assert.equal(fixture.player.muted(), false);

  const refreshCreative = controlsFixture({ renderToken: 2 });
  assert.equal(refreshCreative.player.muted(), true);

  const pipMethods = between(
    source,
    'getIntextPipConfig()',
    'maybeIncrementFallbackBlankControl(',
  );
  assert.doesNotMatch(pipMethods, /\.muted\s*\(/);
});

test('controles 21-27: IMA conserva controles publicitarios y no existe skip propio', () => {
  assert.match(source, /disableAdControls:\s*false/);
  assert.match(source, /showControlsForJSAds:\s*[\r\n\s]*controls\.showForJsAds/);
  assert.match(source, /ima\.AdEvent\.Type\.SKIPPED/);
  assert.doesNotMatch(source, /adsManager\.skip\s*\(/);
  assert.doesNotMatch(source, /duration\s*>\s*20/);
  assert.doesNotMatch(source, /ima-skip-button|SKIPPABLE_STATE_CHANGED|getAdSkippableState|getSkipTimeOffset/);
});

test('telemetría: métrica efectiva por token y override muted rechazado una vez', () => {
  const fixture = controlsFixture({
    controls: {
      playPause: false,
      showForJsAds: false,
    },
    mutedOnStart: false,
    debug: true,
    renderToken: 9,
  });
  fixture.creative.resolveVideoControlsConfig();
  fixture.creative.resolveVideoControlsConfig();

  const controlsMetrics = debugMetrics.filter(
    ({ metric }) => metric === 'video_controls_config_effective',
  );
  const rejectedMetrics = debugMetrics.filter(
    ({ metric }) => metric === 'intext_video_muted_override_rejected',
  );
  assert.equal(controlsMetrics.length, 1);
  assert.equal(controlsMetrics[0].payload.renderToken, 9);
  assert.equal(controlsMetrics[0].payload.playPauseEnabled, false);
  assert.equal(controlsMetrics[0].payload.showForJsAds, false);
  assert.equal(controlsMetrics[0].payload.mutedOnStart, true);
  assert.equal(rejectedMetrics.length, 1);
});
