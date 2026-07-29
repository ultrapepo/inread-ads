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

test('23-27. detección scoped nula, sources y telemetría usan resolución local', () => {
  const configured = managerFixture({ configured: '99071977' }).manager;
  const resolvedContext = {
    detectedNetworkId: null,
    networkId: '99071977',
  };
  const configuredResolution =
    configured.resolveIntextNetworkResolution(resolvedContext);
  assert.equal(configuredResolution.scopedDetectedNetworkId, null);
  assert.equal(configuredResolution.requestNetworkId, '99071977');
  assert.equal(configuredResolution.source, 'gam-config');
  assert.deepEqual(
    JSON.parse(JSON.stringify(
      configured.getIntextNetworkTelemetry(resolvedContext),
    )),
    {
      'gexp-intext-network-id-mode': 'auto',
      'gexp-intext-network-id-configured': '99071977',
      'gexp-intext-network-id-detected': 'none',
      'gexp-intext-network-id-request': '99071977',
      'gexp-intext-network-id-source': 'gam-config',
      'gexp-intext-network-id-forced': 'false',
    },
  );

  const fallback = managerFixture().manager.resolveIntextNetworkResolution();
  assert.equal(fallback.requestNetworkId, '99071977');
  assert.equal(fallback.source, 'default');

  const forced = managerFixture({
    mode: 'force',
    configured: '99071977',
    detected: '21626337071',
  }).manager.resolveIntextNetworkResolution({
    detectedNetworkId: '21626337071',
  });
  assert.equal(forced.requestNetworkId, '99071977');
  assert.equal(forced.source, 'gam-config-forced');
  assert.equal(forced.forced, true);
});

test('28-30. contextos concurrentes y PNC conservan su propia resolución', () => {
  const manager = managerFixture({ configured: '99071977' }).manager;
  const ueContext = { detectedNetworkId: '99071977' };
  const latamContext = { detectedNetworkId: '21626337071' };

  manager.resolveIntextRequestNetworkId(latamContext);
  assert.equal(manager.requestNetworkId, '21626337071');
  assert.equal(
    manager.getIntextNetworkTelemetry(ueContext)[
      'gexp-intext-network-id-request'
    ],
    '99071977',
  );
  assert.equal(
    manager.getIntextNetworkTelemetry(latamContext)[
      'gexp-intext-network-id-request'
    ],
    '21626337071',
  );
  assert.equal(
    manager.getIntextNetworkTelemetry(ueContext)[
      'gexp-intext-network-id-source'
    ],
    'scoped-gpt-detected',
  );
});

test('31. un prefijo numérico de otra red se elimina sin ruta doble', () => {
  const manager = managerFixture({
    configured: '99071977',
    displayAdUnitPath: '/21626337071/marca/noticia/n',
  }).manager;
  assert.equal(
    manager.resolveIntextDisplayAdUnitPath(),
    'marca/noticia/n',
  );
  const { waterfall } = waterfallFixture(manager);
  assert.equal(
    waterfall.getIntextPrebidAdSlotContext('gexp-intext').fullAdUnitPath,
    '/99071977/marca/noticia/n',
  );
});

async function resolvePncConfigForNetwork(networkId) {
  const manager = managerFixture({ configured: '99071977' }).manager;
  manager.siteConfig = {
    ...manager.siteConfig,
    infiniteScroll: {},
    contentTypes: {},
    tam: { enabled: true },
    networks: {
      99071977: { tam: { enabled: true } },
      21626337071: { tam: { enabled: false } },
    },
  };
  manager.baseSiteConfig = JSON.parse(JSON.stringify(manager.siteConfig));
  manager.resolveScopedAdContext = () => ({
    detectedNetworkId: networkId,
    networkId,
    contentType: 'noticia',
    hostname: 'marca.com',
    targeting: {},
  });
  manager.resolveScopedIntextNewsIdentity = async () => ({
    id: 'pnc-network',
    newsId: 'pnc-network',
    source: 'test',
    resolved: true,
  });
  manager.captureIntextContentIdentity = () => ({
    id: 'pnc-network',
    newsId: 'pnc-network',
    source: 'test',
    resolved: true,
  });
  manager.isContentTypeAllowed = () => true;
  manager.isBlockedByExclusions = () => false;
  manager.isAllowedByInclusions = () => true;
  manager.shouldBlockIntextByFallbackBlankControl = () => false;
  manager.registerIntextManagerDecision = () => false;
  let captured = null;
  manager.createIntextPositionsScoped = (
    root,
    scopedConfig,
    suffix,
    navIndex,
    scopedContext,
  ) => {
    captured = { scopedConfig, scopedContext };
    return { result: 'no-valid-placement', found: 0, created: 0 };
  };
  await manager.onNewArticleDetected({}, 2);
  return captured;
}

test('32-33. PNC aplica el override de su red antes de crear nodos', async () => {
  const latam = await resolvePncConfigForNetwork('21626337071');
  assert.equal(latam.scopedConfig.tam.enabled, false);
  assert.equal(latam.scopedContext.networkId, '21626337071');

  const spain = await resolvePncConfigForNetwork('99071977');
  assert.equal(spain.scopedConfig.tam.enabled, true);
  assert.equal(spain.scopedContext.networkId, '99071977');
});

function pncIsolationFixture(initialNetworkId) {
  const manager = managerFixture({ configured: '99071977' }).manager;
  const cleanBaseConfig = {
    ...manager.siteConfig,
    tam: { enabled: true },
    infiniteScroll: {
      overrides: {
        refreshCycle: { isolationMarker: 'infinite-scroll' },
      },
    },
    contentTypes: {
      noticia: {
        video: { contentTypeMarker: 'noticia-profile' },
      },
    },
    slotOverridesById: {
      pnc: {
        video: { slotOverrideMarker: 'pnc-slot' },
      },
    },
    networks: {
      21626337071: { tam: { enabled: false } },
    },
  };
  manager.baseSiteConfig =
    JSON.parse(JSON.stringify(cleanBaseConfig));
  manager.siteConfig = IntextManager.deepMerge(
    cleanBaseConfig,
    cleanBaseConfig.networks[initialNetworkId] || {},
  );
  const baseSnapshot = JSON.stringify(manager.baseSiteConfig);
  let pendingNetworkId = '99071977';
  let nextNavIndex = 1;
  const nodes = [];

  manager.resolveScopedAdContext = () => ({
    detectedNetworkId: pendingNetworkId,
    networkId: pendingNetworkId,
    contentType: 'noticia',
    hostname: 'marca.com',
    targeting: {},
  });
  manager.resolveScopedIntextNewsIdentity = async () => ({
    id: `pnc-${nextNavIndex}`,
    newsId: `pnc-${nextNavIndex}`,
    source: 'test',
    resolved: true,
  });
  manager.captureIntextContentIdentity = () => ({
    id: `pnc-${nextNavIndex}`,
    newsId: `pnc-${nextNavIndex}`,
    source: 'test',
    resolved: true,
  });
  manager.isContentTypeAllowed = () => true;
  manager.isBlockedByExclusions = () => false;
  manager.isAllowedByInclusions = () => true;
  manager.shouldBlockIntextByFallbackBlankControl = () => false;
  manager.registerIntextManagerDecision = () => false;
  manager.createIntextPositionsScoped = (
    root,
    scopedConfig,
    suffix,
    navIndex,
    scopedContext,
  ) => {
    let nodeConfig = { ...scopedConfig };
    const slotOverride = manager.getSlotOverridesForNode(
      0,
      `gexp-intext-pnc-${navIndex}`,
      scopedConfig,
    );
    Object.entries(slotOverride || {}).forEach(([section, value]) => {
      nodeConfig[section] =
        value && typeof value === 'object' && !Array.isArray(value)
          ? IntextManager.deepMerge(nodeConfig[section] || {}, value)
          : value;
    });
    const node = { config: nodeConfig, scopedContext };
    nodes.push(node);
    return { result: 'created', found: 1, created: 1 };
  };

  return {
    manager,
    nodes,
    baseSnapshot,
    async create(networkId) {
      pendingNetworkId = networkId;
      const navIndex = nextNavIndex++;
      await manager.onNewArticleDetected({}, navIndex);
      return nodes.at(-1);
    },
  };
}

function getTamForPncNode(manager, node) {
  const { waterfall } = waterfallFixture(manager);
  waterfall.node.scopedContext = node.scopedContext;
  waterfall.config = node.config;
  return waterfall.getTAMConfiguration();
}

test('34-40. red inicial LATAM no contamina PNC España alternados', async () => {
  const fixture = pncIsolationFixture('21626337071');
  assert.equal(fixture.manager.siteConfig.tam.enabled, false);

  const networks = [
    '21626337071',
    '99071977',
    '21626337071',
    '99071977',
  ];
  const nodes = [];
  for (const networkId of networks) {
    nodes.push(await fixture.create(networkId));
  }

  assert.deepEqual(
    nodes.map((node) => node.config.tam.enabled),
    [false, true, false, true],
  );
  assert.equal(getTamForPncNode(fixture.manager, nodes[0]), null);
  assert.ok(getTamForPncNode(fixture.manager, nodes[1]));
  assert.equal(getTamForPncNode(fixture.manager, nodes[2]), null);
  assert.ok(getTamForPncNode(fixture.manager, nodes[3]));
  assert.equal(fixture.manager.siteConfig.tam.enabled, false);
  assert.equal(
    JSON.stringify(fixture.manager.baseSiteConfig),
    fixture.baseSnapshot,
  );
  assert.deepEqual(
    nodes.map((node) => node.scopedContext.networkId),
    networks,
  );
});

test('41-45. red inicial España conserva profiles y permite PNC LATAM aislado', async () => {
  const fixture = pncIsolationFixture('99071977');
  assert.equal(fixture.manager.siteConfig.tam.enabled, true);
  const spain = await fixture.create('99071977');
  const latam = await fixture.create('21626337071');

  assert.equal(spain.config.tam.enabled, true);
  assert.equal(latam.config.tam.enabled, false);
  assert.equal(spain.config.video.contentTypeMarker, 'noticia-profile');
  assert.equal(spain.config.video.slotOverrideMarker, 'pnc-slot');
  assert.equal(
    spain.config.refreshCycle.isolationMarker,
    'infinite-scroll',
  );
  assert.equal(
    fixture.manager.resolveIntextVideoAdUnitPath(spain.scopedContext),
    'detected/page/video-intext',
  );
  assert.equal(
    fixture.manager.resolveIntextVideoAdUnitPath(latam.scopedContext),
    'detected/page/video-intext',
  );
  assert.equal(
    JSON.stringify(fixture.manager.baseSiteConfig),
    fixture.baseSnapshot,
  );
});

test('46-49. los doce JSON usan fallback auto por región y mantienen PIP off', () => {
  const files = [
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
  files.forEach((relativePath) => {
    const config = JSON.parse(
      fs.readFileSync(path.join(root, relativePath), 'utf8'),
    );
    const general = config.intextSites.default.general;
    assert.equal(general.gam.networkIdMode, 'auto');
    assert.equal(
      general.gam.networkId,
      relativePath.includes('LATAM') ? '21626337071' : '99071977',
    );
    assert.equal(general.video.pip.enabled, false);
    assert.deepEqual(general.video.pip.slots, {
      default: false,
      'gexp-intext': true,
      'gexp-intext-2': false,
      'gexp-intext-3': false,
      pnc: false,
    });
  });
});
