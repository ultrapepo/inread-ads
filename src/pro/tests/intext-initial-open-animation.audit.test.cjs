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

const animationCss = between(
  source,
  '        .gexp-intext-first-open-surface {',
  '        .gexp-intext-slot:not(.video-started)',
);
const animationMethod = between(
  source,
  '  playInitialOpenAnimation(',
  '\n  getIntextNodeId()',
);
const nodeConstructor = between(
  source,
  'class IntextNode',
  '  playInitialOpenAnimation(',
);
const showDisplay = between(
  source,
  '  async showDisplay(',
  '\n  scheduleWaterfallRetry(',
);
const requestAds = between(
  source,
  '  requestAds()',
  '\n  getVideoTagUrl()',
);
const containerClass = between(
  source,
  'class IntextContainer',
  'class IntextWaterfall',
);

const scheduled = [];
const context = vm.createContext({
  Math,
  Number,
  String,
  window: {
    setTimeout(callback, delay) {
      scheduled.push({ callback, delay });
      return scheduled.length;
    },
  },
});
vm.runInContext(
  `this.AnimationNode = class AnimationNode {${animationMethod}};`,
  context,
);
const { AnimationNode } = context;

function animationFixture(animation = { enabled: true }) {
  scheduled.length = 0;
  const properties = new Map();
  const classes = new Set();
  const listeners = new Map();
  const wrapper = {
    style: {
      setProperty(name, value) {
        properties.set(name, value);
      },
    },
  };
  const surface = {
    isConnected: true,
    closest: () => wrapper,
    classList: {
      add: (...names) => names.forEach((name) => classes.add(name)),
      remove: (...names) => names.forEach((name) => classes.delete(name)),
      contains: (name) => classes.has(name),
    },
    addEventListener(name, callback) {
      listeners.set(name, callback);
    },
    removeEventListener(name, callback) {
      if (listeners.get(name) === callback) listeners.delete(name);
    },
  };
  const node = Object.create(AnimationNode.prototype);
  node.config = { style: { animation } };
  node.container = { getElement: () => wrapper };
  node.videoContainer = { getElement: () => wrapper };
  node._initialOpenAnimationPlayed = false;
  return {
    node,
    surface,
    wrapper,
    properties,
    classes,
    listeners,
  };
}

test('estructura 1-10: método estético aislado y flag persistente por nodo', () => {
  assert.equal(
    (source.match(/this\._initialOpenAnimationPlayed = false;/g) || []).length,
    1,
  );
  assert.equal(
    (source.match(/this\._initialOpenAnimationPlayed = true;/g) || []).length,
    1,
  );
  assert.doesNotMatch(
    animationMethod,
    /\.(?:open|close|setHeight|collapse|revealPlayer|markVideoStarted)\s*\(/,
  );
  assert.doesNotMatch(
    containerClass,
    /playInitialOpenAnimation|gexp-intext-first-open/,
  );
  assert.equal(
    (source.match(/playInitialOpenAnimation/g) || []).length,
    3,
  );
  assert.match(nodeConstructor, /this\._initialOpenAnimationPlayed = false/);
});

test('CSS 4 y 32: solo anima opacity/transform y respeta reduced motion', () => {
  assert.match(animationCss, /@keyframes gexp-intext-first-open-reveal/);
  assert.match(animationCss, /opacity:\s*0/);
  assert.match(animationCss, /opacity:\s*1/);
  assert.match(animationCss, /translate3d/);
  assert.match(animationCss, /scale\(/);
  assert.match(animationCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(animationCss, /transform:\s*none\s*!important/);
  assert.doesNotMatch(
    animationCss,
    /(?:^|[;{\s])(?:height|min-height|max-height|margin|padding|display|position|will-change)\s*:/m,
  );
});

test('método 10, 33-35: disabled/missing no muta y cleanup funciona', () => {
  const disabled = animationFixture({ enabled: false });
  assert.equal(
    disabled.node.playInitialOpenAnimation(
      disabled.surface,
      'display-first-fill',
    ),
    false,
  );
  assert.equal(disabled.classes.size, 0);
  assert.equal(disabled.node._initialOpenAnimationPlayed, false);

  const missing = animationFixture();
  assert.equal(
    missing.node.playInitialOpenAnimation(null, 'display-first-fill'),
    false,
  );
  assert.equal(missing.node._initialOpenAnimationPlayed, false);

  const active = animationFixture();
  assert.equal(
    active.node.playInitialOpenAnimation(
      active.surface,
      'display-first-fill',
    ),
    true,
  );
  assert.equal(
    active.classes.has('gexp-intext-first-open-surface'),
    true,
  );
  assert.equal(scheduled.length, 1);
  assert.equal(scheduled[0].delay, 380);
  scheduled[0].callback();
  assert.equal(
    active.classes.has('gexp-intext-first-open-surface'),
    false,
  );
  assert.equal(active.listeners.has('animationend'), false);
});

test('método: defaults, límites y una ejecución máxima por nodo', () => {
  const fixture = animationFixture({
    enabled: true,
    durationMs: -5,
    translateYPx: -4,
    scaleFrom: 2,
    respectReducedMotion: false,
  });
  assert.equal(
    fixture.node.playInitialOpenAnimation(
      fixture.surface,
      'video-first-frame',
    ),
    true,
  );
  assert.equal(
    fixture.properties.get('--gexp-intext-first-open-duration'),
    '0ms',
  );
  assert.equal(
    fixture.properties.get('--gexp-intext-first-open-translate-y'),
    '0px',
  );
  assert.equal(
    fixture.properties.get('--gexp-intext-first-open-scale'),
    '1',
  );
  assert.equal(
    fixture.classes.has(
      'gexp-intext-first-open-ignore-reduced-motion',
    ),
    true,
  );
  assert.equal(
    fixture.node.playInitialOpenAnimation(
      fixture.surface,
      'display-first-fill',
    ),
    false,
  );
});

test('display 11-18: llamada posterior al open, layout y fill real', () => {
  const openIndex = showDisplay.indexOf('this.container.open(');
  const layoutIndex = showDisplay.indexOf('this.applyDisplayRenderLayout(');
  const animationIndex = showDisplay.indexOf(
    'this.playInitialOpenAnimation(',
  );
  assert.ok(openIndex >= 0);
  assert.ok(layoutIndex > openIndex);
  assert.ok(animationIndex > layoutIndex);
  assert.match(showDisplay, /displayResult\?\.filled === true/);
  assert.match(showDisplay, /is1x1 !== true/);
  assert.match(
    showDisplay,
    /isActiveRenderToken\(\s*renderToken,\s*"showDisplay:first-open-animation"/,
  );
  assert.match(
    showDisplay,
    /findDisplayCreativeSurface\(slotDoc\)/,
  );
  assert.match(
    showDisplay,
    /"display-first-fill"/,
  );
  assert.doesNotMatch(
    between(
      showDisplay,
      'this.playInitialOpenAnimation(',
      'this.videoContainer.close',
    ),
    /loader/,
  );
  [250, 600, 1000].forEach((height) => {
    assert.doesNotMatch(
      animationMethod,
      new RegExp(`height[^\\n]*${height}`),
    );
  });
});

test('vídeo 19-25: exige first frame y reveal; LOADED/STARTED no animan', () => {
  assert.match(
    requestAds,
    /!firstFrameConfirmed\s*\|\|\s*!playerRevealed/,
  );
  assert.match(
    requestAds,
    /this\.player\?\.el\?\.\(\),\s*"video-first-frame"/,
  );
  const loadedBlock = between(
    requestAds,
    'ima.AdEvent.Type.LOADED',
    'ima.AdEvent.Type.STARTED',
  );
  const startedBlock = between(
    requestAds,
    'ima.AdEvent.Type.STARTED',
    'ima.AdEvent.Type.COMPLETE',
  );
  assert.doesNotMatch(loadedBlock, /playInitialOpenAnimation/);
  assert.doesNotMatch(startedBlock, /playInitialOpenAnimation/);
  assert.ok(
    requestAds.indexOf('debugVideo("first-frame"') <
      requestAds.indexOf('maybePlayInitialOpenAnimation();', requestAds.indexOf('debugVideo("first-frame"')),
  );
  assert.ok(
    requestAds.indexOf('debugVideo("revealed"') <
      requestAds.indexOf('maybePlayInitialOpenAnimation();', requestAds.indexOf('debugVideo("revealed"')),
  );
});

test('refresh/PIP 26-31: no contienen activaciones ni reseteos', () => {
  const refreshAndPipBlocks = [
    between(
      source,
      '\n  scheduleWaterfallRetry(',
      '\n  destroyDisplayForRetry(',
    ),
    between(
      source,
      '\n  enterIntextPip(',
      '\n  exitIntextPip(',
    ),
    between(
      source,
      '\n  exitIntextPip(',
      '\n  dismissIntextPip(',
    ),
    between(
      source,
      '\n  dismissIntextPip(',
      '\n  cleanupIntextPip(',
    ),
    between(
      source,
      '\n  cleanupIntextPip(',
      '\n  resetIntextPipState(',
    ),
  ];
  refreshAndPipBlocks.forEach((block) => {
    assert.doesNotMatch(
      block,
      /playInitialOpenAnimation|_initialOpenAnimationPlayed\s*=/,
    );
  });
});
