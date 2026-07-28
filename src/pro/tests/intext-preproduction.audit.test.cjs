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

const gptSlots = [];
const debugMetrics = [];
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
  window: {
    location: {
      href: 'https://www.marca.com/noticia.html',
      hostname: 'www.marca.com',
    },
    gexpIntextDebug: false,
  },
  document: {
    visibilityState: 'visible',
    querySelector: () => null,
    querySelectorAll: () => [],
  },
  googletag: {
    pubads: () => ({
      getSlots: () => gptSlots,
      getTargeting: () => [],
    }),
  },
  intextDebugCollector: {
    recordMetric(metric, payload) {
      debugMetrics.push({ metric, payload });
    },
  },
  logIntext() {},
  warnIntext() {},
  warnIntextAlways() {},
  errorIntext() {},
});

vm.runInContext(`
  const INTEXT_RANDOM_KEYS = Object.freeze(["random1", "random2", "random3", "random4"]);
  this.IntextManager = ${classSource('IntextManager', 'IntextPlacementEngine')};
  this.IntextWaterfall = ${classSource('IntextWaterfall', 'IntextVideoCreative')};
`, context);

const { IntextManager, IntextWaterfall } = context;

function managerFixture({
  mode = 'auto',
  configured = null,
  legacy = null,
  detected = null,
  displayAdUnitPath = null,
  videoAdUnitPath = null,
} = {}) {
  const manager = Object.create(IntextManager.prototype);
  const diagnostics = [];
  manager.config = legacy ? { networkId: legacy } : {};
  manager.siteConfig = {
    gam: {
      networkIdMode: mode,
      networkId: configured,
      displayAdUnitPath,
      videoAdUnitPath,
    },
    display: { adUnitPath: 'detected/fallback/n' },
    video: { enabled: true },
    networks: {
      123456: {
        display: { adUnitPath: 'override/display/n' },
        video: { adUnitPath: 'override/video-intext' },
      },
    },
  };
  manager.baseSiteConfig = JSON.parse(JSON.stringify(manager.siteConfig));
  manager.siteContext = { site: 'marca.com', contentType: 'noticia' };
  manager.detectedNetworkId = detected;
  manager.detectedAdUnitPath = 'detected/page/n';
  manager.adUnitPath = 'legacy/page/n';
  manager.configuredNetworkId = null;
  manager.requestNetworkId = null;
  manager.networkIdResolutionSource = 'unresolved';
  manager.networkId = null;
  manager.registerIntextDiagnosticEvent = (payload) => diagnostics.push(payload);
  return { manager, diagnostics };
}

test('1-3. auto prioriza scoped, GPT detectado y configurado', () => {
  const page = managerFixture({ configured: '777777', detected: '111111' }).manager;
  assert.equal(page.resolveIntextRequestNetworkId(), '111111');
  assert.equal(page.networkIdResolutionSource, 'page-gpt-detected');
  assert.equal(
    page.resolveIntextRequestNetworkId({ detectedNetworkId: '222222' }),
    '222222',
  );
  assert.equal(page.networkIdResolutionSource, 'scoped-gpt-detected');

  const configured = managerFixture({ configured: '777777' }).manager;
  assert.equal(configured.resolveIntextRequestNetworkId(), '777777');
  assert.equal(configured.networkIdResolutionSource, 'gam-config');
});

test('4-6. force ignora GPT/scoped y sin ID bloquea sin fallback', () => {
  const forced = managerFixture({
    mode: 'force',
    configured: '333333',
    detected: '111111',
  }).manager;
  assert.equal(
    forced.resolveIntextRequestNetworkId({ detectedNetworkId: '222222' }),
    '333333',
  );
  assert.equal(forced.networkId, forced.requestNetworkId);
  assert.equal(forced.networkIdResolutionSource, 'gam-config-forced');

  const legacy = managerFixture({ mode: 'force', legacy: '444444' }).manager;
  assert.equal(legacy.resolveIntextRequestNetworkId(), '444444');

  const invalid = managerFixture({ mode: 'force', configured: 'invalid' });
  assert.equal(invalid.manager.resolveIntextRequestNetworkId(), null);
  assert.equal(invalid.manager.requestNetworkId, null);
  assert.equal(invalid.manager.networkIdResolutionSource, 'force-invalid');
  assert.equal(invalid.diagnostics.length, 1);
});

test('7-8. resolveAdUnit detecta GPT y force conserva la red configurada', () => {
  gptSlots.splice(0, gptSlots.length, {
    getSlotElementId: () => 'normal-slot',
    getAdUnitPath: () => '/555555/marca/noticia/n',
  });
  const automatic = managerFixture();
  assert.equal(automatic.manager.resolveAdUnit(), true);
  assert.equal(automatic.manager.detectedNetworkId, '555555');
  assert.equal(automatic.manager.requestNetworkId, '555555');

  const forced = managerFixture({ mode: 'force', configured: '666666' });
  assert.equal(forced.manager.resolveAdUnit(), true);
  assert.equal(forced.manager.detectedNetworkId, '555555');
  assert.equal(forced.manager.requestNetworkId, '666666');
  gptSlots.splice(0);
});

test('9-11. ad units respetan configuración, override y conversión de vídeo', () => {
  const configured = managerFixture({
    mode: 'force',
    configured: '666666',
    displayAdUnitPath: '/666666/config/display/n',
    videoAdUnitPath: '/666666/config/video-intext',
  }).manager;
  assert.equal(configured.resolveIntextDisplayAdUnitPath(), 'config/display/n');
  assert.equal(configured.resolveIntextVideoAdUnitPath(), 'config/video-intext');

  const override = managerFixture({ configured: '123456' }).manager;
  assert.equal(override.resolveIntextDisplayAdUnitPath(), 'override/display/n');
  assert.equal(override.resolveIntextVideoAdUnitPath(), 'override/video-intext');

  const converted = managerFixture({ configured: '777777' }).manager;
  converted.detectedAdUnitPath = 'marca/noticia/n';
  assert.equal(converted.resolveIntextVideoAdUnitPath(), 'marca/noticia/video-intext');
});

function waterfallFixture(manager) {
  const telemetry = {};
  const waterfall = Object.create(IntextWaterfall.prototype);
  waterfall.node = {
    id: 'gexp-intext',
    videoId: 'gexp-intext-video',
    scopedContext: null,
    manager,
    wa: null,
    mergeIntextTelemetry(payload) {
      Object.assign(telemetry, payload);
    },
    resolveVideoRequestTargeting: () => ({ targeting: {}, targetingSource: 'test' }),
  };
  waterfall.gexp = { cfg: {} };
  waterfall.config = {
    tam: { enabled: true },
    video: { enabled: true, playerSize: [640, 360] },
    prebid: { networks: { default: {} } },
  };
  waterfall.resolveIntextVideoConfig = () => ({ enabled: true, playerSize: [640, 360] });
  waterfall.getDisplaySizes = () => [[300, 250]];
  return { waterfall, telemetry };
}

test('12-14. VAST, Prebid y TAM usan requestNetworkId y ad units canónicos', () => {
  const manager = managerFixture({
    mode: 'force',
    configured: '888888',
    displayAdUnitPath: 'forced/display/n',
    videoAdUnitPath: 'forced/video-intext',
  }).manager;
  const { waterfall, telemetry } = waterfallFixture(manager);

  const prebidContext = waterfall.getIntextPrebidAdSlotContext('gexp-intext');
  assert.equal(prebidContext.fullAdUnitPath, '/888888/forced/display/n');

  const tam = waterfall.getTAMConfiguration();
  const tamVideo = waterfall.getTAMVideoConfiguration();
  assert.equal(tam.slots[0].slotName, '/888888/forced/display/n');
  assert.equal(tamVideo.slots[0].slotName, '/888888/forced/video-intext');

  const vastUrl = waterfall.buildGAMVideoTagUrl();
  const parsed = new URL(vastUrl);
  assert.equal(parsed.searchParams.get('iu'), '/888888/forced/video-intext');
  assert.equal(telemetry['gexp-intext-network-id-request'], '888888');
  assert.equal(telemetry['gexp-intext-video-adunit-request'], 'forced/video-intext');
});

test('15-18. todos los consumidores de red pasan por el resolver canónico', () => {
  assert.doesNotMatch(
    source,
    /scopedContext\?\.networkId\s*\|\|\s*this\.node\.manager\.networkId/,
  );
  assert.match(
    source,
    /\n\s+askDisplay\(bidResponse,[\s\S]{0,8000}resolveIntextRequestNetworkId/,
    'askDisplay',
  );
  [
    [IntextWaterfall.prototype, 'getTAMConfiguration'],
    [IntextWaterfall.prototype, 'getTAMVideoConfiguration'],
    [IntextWaterfall.prototype, 'getIntextPrebidAdSlotContext'],
    [IntextWaterfall.prototype, 'getPrebidMultiFormatConfig'],
    [IntextWaterfall.prototype, 'buildGAMVideoTagUrl'],
    [IntextWaterfall.prototype, 'registerPrebidAliases'],
  ].forEach(([prototype, method]) => {
    assert.equal(typeof prototype[method], 'function', method);
    assert.match(
      Function.prototype.toString.call(prototype[method]),
      /resolveIntextRequestNetworkId/,
      method,
    );
  });
  assert.match(source, /googletag\.defineSlot\(fullAdUnit/);
  assert.match(source, /const targetNetwork = prebidNetworks\[networkId\]/);
});

test('19-22. telemetría, debugger y bloqueo force están instrumentados', () => {
  [
    'gexp-intext-network-id-mode',
    'gexp-intext-network-id-configured',
    'gexp-intext-network-id-detected',
    'gexp-intext-network-id-request',
    'gexp-intext-network-id-source',
    'gexp-intext-network-id-forced',
    'gexp-intext-display-adunit-request',
    'gexp-intext-video-adunit-request',
    'intext_network_resolved',
    'intext_network_forced',
    'intext_network_force_invalid',
    'intext_network_scoped_ignored',
  ].forEach((token) => assert.ok(source.includes(token), token));
  assert.match(source, /if \(!networkId \|\| !adUnitPath\)/);
  assert.match(source, /if \(!gamVideoTagUrl\) return false/);
});
