const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, '_gam_kv_.js'), 'utf8');
const qaDocs = fs.readFileSync(path.join(root, 'docs/intext-qa.md'), 'utf8');

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

const logs = [];
const documentFixture = { cookie: '', readyState: 'complete' };
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
  window: {
    location: { hostname: 'blocked.example', href: 'https://blocked.example/a' },
    ueDataLayer: { be_page_domain: 'blocked.example' },
  },
  document: documentFixture,
  logIntext: (...args) => logs.push(args),
  warnIntext() {},
  errorIntext() {},
});
const constants = between(source, 'const INTEXT_RANDOM_KEYS', 'class IntextManager');
vm.runInContext(`
  ${constants}
  this.IntextManager = ${classSource('IntextManager', 'IntextPlacementEngine')};
  this.IntextNode = ${classSource('IntextNode', 'IntextContainer')};
  this.IntextWaterfall = ${classSource('IntextWaterfall', 'IntextVideoCreative')};
`, context);
const { IntextManager, IntextNode, IntextWaterfall } = context;

function managerFixture(cookie = '', random1 = '13') {
  logs.length = 0;
  documentFixture.cookie = cookie;
  const manager = Object.create(IntextManager.prototype);
  manager.config = {};
  manager.siteContext = { site: 'blocked.example', contentType: 'noticia' };
  manager.siteConfig = {
    loading: {
      fetchRootMargin: '250px 0px',
      renderRootMargin: '250px 0px',
      maxDelayMs: 1500,
    },
    inclusions: { keyValues: { random1: ['5', '6', '7', '8', '9', '10'] } },
    exclusions: {
      disableAll: false,
      adUnitPaths: ['/blocked'],
      keyValues: { tag: ['blocked'] },
      disableSlots: { always: [0], rules: [] },
    },
  };
  manager.baseSiteConfig = manager.siteConfig;
  manager.intextRandomSnapshot = Object.freeze({
    random1: String(random1),
    random2: '2',
    random3: '3',
    random4: '4',
  });
  manager._intextQaCookieApplied = false;
  manager._intextQaInclusionForced = false;
  manager._intextQaCookieExclusionsBypassed = false;
  manager._intextQaCookieExclusionsBypassSource = null;
  manager.intextQaCookieOverride = manager.readIntextQaCookieOverride();
  manager.resolveScopedRuleBlock = (block) => block;
  manager.getHostnameNormalized = (value) => String(value || '').replace(/^www\./, '');
  manager.getPageAdUnitPath = () => '/blocked/article';
  manager.getPageCustomTargeting = () => ({ tag: 'blocked' });
  return manager;
}

function loadingExperimentsFor(values = ['5', '6', '7', '8', '9', '10']) {
  return {
    enabled: true,
    key: 'random1',
    variants: Object.fromEntries(values.map((value) => [
      value,
      {
        name: `variant-${value}`,
        slots: {
          'gexp-intext': {
            loading: {
              fetchRootMargin: `${Number(value) * 100}px 0px`,
              renderRootMargin: '100px 0px',
            },
          },
        },
      },
    ])),
  };
}

test('1. gexp_intext_force fuerza inclusions', () => {
  const manager = managerFixture('gexp_intext_force=1', '13');
  assert.equal(manager.isAllowedByInclusions(), true);
  assert.equal(manager._intextQaInclusionForced, true);
});

test('2. el forzado está integrado en la carga inicial', () => {
  const constructor = between(
    source,
    'class IntextManager',
    '        readIntextQaCookieOverride() {',
  );
  const launch = between(source, 'const launchIntextPositions', 'if (document.readyState');
  assert.match(constructor, /intextQaCookieOverride = this\.readIntextQaCookieOverride/);
  assert.match(launch, /this\.isAllowedByInclusions\(\)/);
});

test('3. el mismo forzado se utiliza en PNC', () => {
  const method = IntextManager.prototype.onNewArticleDetected.toString();
  assert.match(method, /this\.isAllowedByInclusions\(scopedRuleContext\)/);
  assert.match(method, /this\.isBlockedByExclusions\(scopedRuleContext\)/);
});

test('4. supera domainFilter.allowedDomains dentro del manager', () => {
  const constructor = classSource('IntextManager', 'IntextPlacementEngine').slice(0, 9000);
  assert.match(constructor, /domainFilter\.allowedDomains/);
  assert.match(constructor, /intextQaCookieOverride\?\.enabled !== true/);
  assert.match(constructor, /key: "domainFilter\.allowedDomains"/);
});

test('5. continúa con GAMExp deshabilitado sin mutarlo', () => {
  const constructor = classSource('IntextManager', 'IntextPlacementEngine').slice(0, 9000);
  assert.match(constructor, /if \(!this\.gexp\.isEnabled\(\)\)/);
  assert.match(constructor, /key: "gexp\.isEnabled"/);
  assert.doesNotMatch(constructor, /this\.gexp\.enabled\s*=/);
});

test('6. no supera content types no permitidos', () => {
  const constructor = classSource('IntextManager', 'IntextPlacementEngine').slice(0, 10000);
  const qaGate = constructor.indexOf('key: "gexp.isEnabled"');
  const contentGate = constructor.indexOf('allowedContentTypes');
  assert.ok(contentGate > qaGate);
  assert.match(constructor.slice(contentGate), /return;/);
});

test('7. no supera ausencia de placements', () => {
  const placement = IntextManager.prototype.createIntextPositions.toString();
  assert.match(placement, /findPlacements/);
  assert.doesNotMatch(placement, /intextQaCookieOverride|gexp_intext_force/);
});

test('8. random QA 5-10 selecciona la variante de vídeo correspondiente', () => {
  const values = ['5', '6', '7', '8', '9', '10'];
  for (const value of values) {
    const manager = managerFixture(
      `gexp_intext_force=1; gexp_intext_force_random1=${value}`,
      '13',
    );
    const waterfall = Object.create(IntextWaterfall.prototype);
    waterfall.config = {
      video: {
        variantSelection: {
          key: 'random1',
          values: Object.fromEntries(values.map((entry) => [entry, `variant-${entry}`])),
          fallback: 'default',
        },
      },
    };
    waterfall.node = { id: 'gexp-intext', manager, scopedContext: null };
    const result = waterfall.resolveIntextVideoVariant();
    assert.equal(result.value, value);
    assert.equal(result.variant, `variant-${value}`);
    assert.equal(result.source, 'qa-cookie');
  }
});

test('9. default selecciona la configuración base', () => {
  const manager = managerFixture(
    'gexp_intext_force=1; gexp_intext_force_random1=default',
    '5',
  );
  const resolved = manager.resolveLoadingConfig(
    'gexp-intext',
    { loadingExperiments: loadingExperimentsFor() },
  );
  assert.equal(resolved._experiment.enabled, false);
  assert.equal(resolved._experiment.variant, 'default');
  assert.equal(resolved._experiment.fallbackReason, 'qa-cookie-default');
  assert.equal(resolved._experiment.experimentName, 'default');
});

test('10. random QA inválido no se aplica', () => {
  const manager = managerFixture(
    'gexp_intext_force=1; gexp_intext_force_random1=11',
    '13',
  );
  const resolution = manager.getEffectiveIntextTargetingResolution('random1');
  assert.equal(manager.intextQaCookieOverride.invalidRandom1Value, '11');
  assert.equal(resolution.value, '13');
  assert.equal(resolution.qaCookieApplied, false);
  assert.ok(logs.some(([message]) => String(message).includes('intext_qa_cookie_override_invalid')));
});

test('11. el snapshot canónico no se modifica', () => {
  const manager = managerFixture(
    'gexp_intext_force=1; gexp_intext_force_random1=10',
    '13',
  );
  const snapshot = manager.intextRandomSnapshot;
  assert.equal(manager.getEffectiveIntextTargetingResolution('random1').value, '10');
  assert.equal(manager.intextRandomSnapshot, snapshot);
  assert.equal(manager.getIntextRandomValue('random1'), '13');
});

test('12. force_exclusions requiere la cookie principal', () => {
  const manager = managerFixture('gexp_intext_force_exclusions=1');
  assert.equal(manager.intextQaCookieOverride.forceExclusions, false);
  assert.equal(manager.isIntextQaExclusionsBypassEnabled(), false);
});

test('13. force_exclusions supera disableAll', () => {
  const manager = managerFixture(
    'gexp_intext_force=1; gexp_intext_force_exclusions=1',
  );
  manager.siteConfig.exclusions.disableAll = true;
  assert.equal(manager.isBlockedByExclusions(), false);
  assert.equal(manager._intextQaCookieExclusionsBypassed, true);
});

test('14. supera exclusiones de ad unit y key-value', () => {
  const manager = managerFixture(
    'gexp_intext_force=1; gexp_intext_force_exclusions=1',
  );
  assert.equal(manager.isBlockedByExclusions(), false);
  assert.equal(manager._intextQaCookieExclusionsBypassSource, 'exclusions');
});

test('15. disableSlots se supera de forma explícita y documentada', () => {
  const manager = managerFixture(
    'gexp_intext_force=1; gexp_intext_force_exclusions=1',
  );
  assert.equal(manager.isSlotDisabledByExclusion(0), false);
  assert.equal(manager._intextQaCookieExclusionsBypassSource, 'disableSlots');
  assert.match(qaDocs, /opción A: el bypass de exclusiones también supera `disableSlots`/);
});

test('16. no supera gexp_intext_teads_block', () => {
  const launch = between(source, 'const launchIntextPositions', 'if (document.readyState');
  assert.ok(
    launch.indexOf('shouldBlockIntextByFallbackBlankControl')
      > launch.indexOf('isAllowedByInclusions'),
  );
  assert.doesNotMatch(
    IntextManager.prototype.shouldBlockIntextByFallbackBlankControl.toString(),
    /intextQaCookieOverride|forceExclusions/,
  );
});

test('17. telemetría distingue random original y QA', () => {
  const manager = managerFixture(
    'gexp_intext_force=1; gexp_intext_force_random1=8',
    '13',
  );
  manager.getEffectiveIntextTargetingResolution('random1');
  const telemetry = manager.getIntextQaCookieTelemetry();
  assert.equal(telemetry['gexp-intext-qa-cookie-random1'], '8');
  assert.equal(telemetry['gexp-intext-qa-original-random1'], '13');
  assert.equal(manager.getIntextRandomTelemetry()['gexp-intext-random1-effective'], '13');
});

test('18. la allowlist contiene todos los campos QA', () => {
  const allowlist = between(source, 'const INTEXT_TELEMETRY_STANDARD_FIELDS', 'class IntextManager');
  [
    'gexp-intext-qa-cookie-enabled',
    'gexp-intext-qa-cookie-random1',
    'gexp-intext-qa-cookie-applied',
    'gexp-intext-qa-inclusion-forced',
    'gexp-intext-qa-original-random1',
    'gexp-intext-qa-cookie-force-exclusions',
    'gexp-intext-qa-cookie-exclusions-bypassed',
    'gexp-intext-qa-cookie-exclusions-bypass-source',
  ].forEach((field) => assert.match(allowlist, new RegExp(field)));
});

test('19. sin cookies QA el comportamiento permanece normal', () => {
  const manager = managerFixture('', '13');
  assert.equal(manager.intextQaCookieOverride.enabled, false);
  assert.equal(manager.isAllowedByInclusions(), false);
  const resolution = manager.getEffectiveIntextTargetingResolution('random1');
  assert.equal(resolution.value, '13');
  assert.equal(resolution.source, 'gexp-slot-random-snapshot');
});

test('20. QA no activa PIP cuando está desactivado', () => {
  const manager = managerFixture('gexp_intext_force=1');
  const node = Object.create(IntextNode.prototype);
  node.manager = manager;
  node.config = { video: { pip: { enabled: false } } };
  assert.equal(node.getIntextPipConfig().enabled, false);
});

test('21. QA no modifica la configuración PIP por slot', () => {
  const manager = managerFixture('gexp_intext_force=1');
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

test('22. QA no altera entrada, salida, dismiss ni cleanup PIP', () => {
  const qaBlock = [
    IntextManager.prototype.readIntextQaCookieOverride,
    IntextManager.prototype.markIntextQaCookieApplied,
    IntextManager.prototype.isIntextQaExclusionsBypassEnabled,
    IntextManager.prototype.markIntextQaExclusionsBypassApplied,
    IntextManager.prototype.getIntextQaCookieTelemetry,
    IntextManager.prototype.getEffectiveIntextTargetingResolution,
  ].map(String).join('\n');
  assert.doesNotMatch(qaBlock, /enterIntextPip|exitIntextPip|dismissIntextPip|cleanupIntextPip/);
  ['enterIntextPip', 'exitIntextPip', 'dismissIntextPip', 'cleanupIntextPip'].forEach(
    (method) => assert.equal(typeof IntextNode.prototype[method], 'function'),
  );
});

test('23. todas las señales QA se emiten mediante logIntext', () => {
  const qaSource = [
    IntextManager.prototype.readIntextQaCookieOverride,
    IntextManager.prototype.getEffectiveIntextTargetingResolution,
    IntextManager.prototype.markIntextQaExclusionsBypassApplied,
    IntextManager.prototype.isAllowedByInclusions,
  ].map(String).join('\n');
  [
    'intext_qa_cookie_override_detected',
    'intext_qa_cookie_force_allow_applied',
    'intext_qa_cookie_random1_applied',
    'intext_qa_cookie_default_applied',
    'intext_qa_cookie_exclusions_bypass_detected',
    'intext_qa_cookie_exclusions_bypass_applied',
    'intext_qa_cookie_override_invalid',
  ].forEach((event) => {
    assert.match(qaSource, new RegExp(`logIntext[\\s\\S]*${event}`));
  });
});

test('24. activar QA no registra una impresión adicional', () => {
  const qaSource = [
    IntextManager.prototype.readIntextQaCookieOverride,
    IntextManager.prototype.getEffectiveIntextTargetingResolution,
    IntextManager.prototype.markIntextQaCookieApplied,
    IntextManager.prototype.markIntextQaExclusionsBypassApplied,
  ].map(String).join('\n');
  assert.doesNotMatch(qaSource, /registerImpression|registerRow|newImpression/);
});
