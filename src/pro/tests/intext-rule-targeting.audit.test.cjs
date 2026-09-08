const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', '_gam_kv_.js'), 'utf8');

function between(text, start, end) {
  const from = text.indexOf(start);
  const to = text.indexOf(end, from + start.length);
  assert.ok(from >= 0, `missing start marker: ${start}`);
  assert.ok(to > from, `missing end marker: ${end}`);
  return text.slice(from, to);
}

function createFixture({ psp = false, page = {}, slots = [], dataTargeting = {}, ueDfpTargeting = {}, ueTargeting = {}, utagTargeting = {} } = {}) {
  const elements = new Map();
  slots.forEach((slot) => elements.set(slot.getSlotElementId(), { slot }));
  const pubads = {
    getSlots: () => slots,
    getTargeting: (key) => page[key] || [],
    getTargetingKeys: () => Object.keys(page),
  };
  const realGpt = {
    apiReady: true,
    pubadsReady: true,
    defineSlot() {},
    display() {},
    destroySlots() {},
    pubads: () => pubads,
  };
  const proxy = psp
    ? { __ctrl: { baseObject: realGpt }, cmd: { push() {} }, defineSlot() {}, display() {}, destroySlots() {}, pubads() { throw new Error('proxy GPT must not be used'); } }
    : realGpt;
  const document = {
    getElementById: (id) => elements.get(id) || null,
    querySelector: () => null,
  };
  const window = {
    googletag: proxy,
    document,
    location: { hostname: 'www.elmundo.es', href: 'https://www.elmundo.es/article' },
    ueDataLayer: ueTargeting,
    utag_data: utagTargeting,
  };
  const context = vm.createContext({
    window,
    document,
    data: { customTargeting: dataTargeting },
    ueDFPData: { customTargeting: ueDfpTargeting },
    console,
    Object,
    Array,
    Set,
    Map,
    String,
    Number,
    Boolean,
    Date,
    Math,
    JSON,
    URL,
    URLSearchParams,
    setTimeout,
    clearTimeout,
    logIntext() {},
    warnIntext() {},
    errorIntext() {},
    intextDebugCollector: { attachManager() {}, recordTimeline() {}, recordMetric() {} },
  });
  vm.runInContext(`
    const INTEXT_RANDOM_KEYS = Object.freeze(["random1", "random2", "random3", "random4"]);
    this.IntextManager = ${between(source, 'class IntextManager', 'class IntextPlacementEngine')};
    this.IntextNode = ${between(source, 'class IntextNode', 'class IntextContainer')};
  `, context);
  const manager = Object.create(context.IntextManager.prototype);
  manager.siteContext = { site: 'elmundo.es', contentType: 'noticia' };
  manager.siteConfig = {};
  manager.baseSiteConfig = {};
  manager.config = {};
  manager.gexp = { getRandom: () => '19' };
  manager.intextRandomSnapshot = Object.freeze({ random1: '8', random2: '2', random3: '3', random4: '4', source: 'gexp-slot-random-snapshot' });
  manager.intextQaCookieOverride = { enabled: false, forceExclusions: false };
  return { manager, context, window, document, elements };
}

function slot(id, targeting = {}) {
  return {
    getSlotElementId: () => id,
    getAdUnitPath: () => '/99071977/mun/cultura/n',
    getTargeting: (key) => targeting[key] || [],
    getTargetingMap: () => ({ ...targeting }),
    getTargetingKeys: () => Object.keys(targeting),
  };
}

function createArticleRoot(fixture, slotId, urlSuffix) {
  const slotElement = fixture.elements.get(slotId);
  return {
    contains: (element) => element === slotElement,
    dataset: { url: `https://www.elmundo.es/${urlSuffix}` },
    querySelector: () => null,
  };
}

async function runContinuousArticleFlow(fixture, rootElement) {
  const { manager } = fixture;
  manager.baseSiteConfig = {
    infiniteScroll: {},
    exclusions: { keyValues: { isPremium: ['1', 'true'] } },
  };
  manager.siteConfig = manager.baseSiteConfig;
  manager.resolveIntextRequestNetworkId = () => '99071977';
  manager.resolveIntextDisplayAdUnitPath = () => 'mun/cultura/n';
  manager.getIntextNetworkOverride = () => null;
  manager.resolveScopedIntextNewsIdentity = async () => ({ newsId: 'article-b' });
  manager.captureIntextContentIdentity = () => ({ newsId: 'article-b' });
  manager.detectContentType = () => 'noticia';
  manager.shouldBlockIntextByFallbackBlankControl = () => false;
  manager.createIntextPositionsScoped = () => ({ result: 'created', found: 1, created: 1 });
  manager.registerIntextManagerDecision = () => true;

  let scopedRuleContext = null;
  const isBlockedByExclusions = manager.isBlockedByExclusions.bind(manager);
  manager.isBlockedByExclusions = (context) => {
    scopedRuleContext = context;
    return isBlockedByExclusions(context);
  };

  const result = await manager.onNewArticleDetected(rootElement, 1);
  return { result, scopedRuleContext };
}

test('normaliza escalares, CSV, arrays anidados, duplicados y conserva el valor vacio', () => {
  const { manager } = createFixture();
  assert.deepEqual(Array.from(manager.normalizeIntextRuleTargetingValues([undefined, null, true, 1, 'a,b', ['1', 'true'], ''])), ['true', '1', 'a', 'b', '']);
});

test('PSP premium une slot nativo y ueDataLayer aunque page-level este vacio, y bloquea', () => {
  const premiumSlots = Array.from({ length: 10 }, (_, index) => slot(`SelectorBased-slot-${index}`, { isPremium: ['1'] }));
  const { manager } = createFixture({ psp: true, slots: premiumSlots, ueTargeting: { isPremium: true } });
  const resolved = manager.resolveIntextRuleTargeting('isPremium');
  assert.deepEqual(Array.from(resolved.values), ['1', 'true']);
  assert.equal(resolved.pspDetected, true);
  assert.equal(resolved.slotsChecked, 10);
  assert.equal(resolved.slotsMatched, 10);
  manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  assert.equal(manager.isBlockedByExclusions(), true);
});

test('page-only permite inclusion y slot-only tambien', () => {
  const pageOnly = createFixture({ page: { country: ['ES'] }, slots: [slot('page-slot')] }).manager;
  pageOnly.siteConfig = { inclusions: { keyValues: { country: ['ES'] } } };
  assert.equal(pageOnly.isAllowedByInclusions(), true);
  const slotOnly = createFixture({ slots: [slot('segment-slot', { segment: ['sports'] })] }).manager;
  slotOnly.siteConfig = { inclusions: { keyValues: { segment: ['sports'] } } };
  assert.equal(slotOnly.isAllowedByInclusions(), true);
});

test('page y todos los slots se unen y deduplican sin prioridad destructiva', () => {
  const { manager } = createFixture({ page: { foo: ['a'] }, slots: [slot('a', { foo: ['b'] }), slot('b', { foo: ['b', 'c'] }), slot('c')] });
  assert.deepEqual(Array.from(manager.resolveIntextRuleTargeting('foo').values), ['a', 'b', 'c']);
  manager.siteConfig = { exclusions: { keyValues: { foo: ['b'] } }, inclusions: { keyValues: { foo: ['a'] } } };
  assert.equal(manager.isBlockedByExclusions(), true);
  assert.equal(manager.isAllowedByInclusions(), true);
});

test('excluye siempre slots Intext de la senal editorial', () => {
  const { manager } = createFixture({ slots: [slot('SelectorBased-slot-0', { foo: ['safe'] }), slot('gexp-intext', { foo: ['blocked'] }), slot('gexp-intext-2', { foo: ['blocked'] })] });
  assert.deepEqual(Array.from(manager.resolveIntextRuleTargeting('foo').values), ['safe']);
});

test('sin PSP une data.customTargeting y targeting de slot normal', () => {
  const { manager } = createFixture({ dataTargeting: { foo: 'bar' }, slots: [slot('normal', { foo: ['baz'] })] });
  const resolved = manager.resolveIntextRuleTargeting('foo');
  assert.deepEqual(Array.from(resolved.values), ['bar', 'baz']);
  assert.equal(resolved.pspDetected, false);
});

test('context, data, ueDFPData, page GPT, slot, ueDataLayer y utag_data forman una union por key', () => {
  const { manager } = createFixture({
    page: { foo: ['page'] },
    slots: [slot('normal', { foo: ['slot'] })],
    dataTargeting: { foo: 'data' },
    ueDfpTargeting: { foo: 'uedfp' },
    ueTargeting: { foo: 'uedl' },
    utagTargeting: { foo: 'utag' },
  });
  const resolved = manager.resolveIntextRuleTargeting('foo', { targeting: { foo: 'context' } });
  assert.deepEqual(Array.from(resolved.values), ['context', 'data', 'uedfp', 'page', 'slot', 'uedl', 'utag']);
});

test('flujo real de navegacion continua conserva root no enumerable y no mezcla A premium en B', async () => {
  const fixture = createFixture({
    slots: [
      slot('article-a', { isPremium: ['1'] }),
      slot('article-b', { isPremium: ['0'] }),
    ],
  });
  const rootB = createArticleRoot(fixture, 'article-b', 'article-b');
  const { result, scopedRuleContext } = await runContinuousArticleFlow(fixture, rootB);
  const resolved = fixture.manager.resolveIntextRuleTargeting('isPremium', scopedRuleContext);

  assert.equal(result.decision, 'allowed');
  assert.equal(scopedRuleContext.rootElement, rootB);
  assert.equal(Object.keys(scopedRuleContext).includes('rootElement'), false);
  assert.deepEqual(
    Object.getOwnPropertyDescriptor(scopedRuleContext, 'rootElement'),
    { value: rootB, enumerable: false, configurable: false, writable: false },
  );
  assert.deepEqual(Array.from(resolved.values), ['0']);
  assert.equal(resolved.scoped, true);
  assert.equal(resolved.slotsChecked, 1);
  assert.equal(resolved.slotsMatched, 1);
});

test('flujo real de navegacion continua bloquea B premium sin mezclar A no premium', async () => {
  const fixture = createFixture({
    slots: [
      slot('article-a', { isPremium: ['0'] }),
      slot('article-b', { isPremium: ['1'] }),
    ],
  });
  const rootB = createArticleRoot(fixture, 'article-b', 'article-b');
  const { result, scopedRuleContext } = await runContinuousArticleFlow(fixture, rootB);
  const resolved = fixture.manager.resolveIntextRuleTargeting('isPremium', scopedRuleContext);

  assert.equal(result.decision, 'excluded');
  assert.equal(scopedRuleContext.rootElement, rootB);
  assert.equal(Object.keys(scopedRuleContext).includes('rootElement'), false);
  assert.deepEqual(Array.from(resolved.values), ['1']);
  assert.equal(resolved.scoped, true);
  assert.equal(resolved.slotsChecked, 1);
});

test('random usa exclusivamente el snapshot congelado', () => {
  const { manager } = createFixture({ page: { random1: ['5'] }, slots: [slot('normal', { random1: ['6'] })], ueTargeting: { random1: '7' } });
  const resolved = manager.resolveIntextRuleTargeting('random1', { targeting: { random1: '9' } });
  assert.deepEqual(Array.from(resolved.values), ['8']);
  assert.deepEqual(Array.from(resolved.sources, (entry) => entry.source), ['gexp-slot-random-snapshot']);
  assert.equal(resolved.slotsChecked, 0);
});

test('fuentes vacias no detienen la busqueda y boolean true coincide', () => {
  const { manager } = createFixture({ page: { isPremium: [] }, slots: [slot('empty'), slot('value', { isPremium: ['1'] })], ueTargeting: { flag: true } });
  assert.deepEqual(Array.from(manager.resolveIntextRuleTargeting('isPremium').values), ['1']);
  manager.siteConfig = { inclusions: { keyValues: { flag: ['true'] } } };
  assert.equal(manager.isAllowedByInclusions(), true);
});

test('exclusions conservan prioridad sobre inclusions en el flujo de creacion', () => {
  const { manager } = createFixture({ page: { country: ['ES'] }, slots: [slot('premium', { isPremium: ['1'] })] });
  manager.siteConfig = { inclusions: { keyValues: { country: ['ES'] } }, exclusions: { keyValues: { isPremium: ['1'] } } };
  assert.equal(manager.isBlockedByExclusions(), true);
  assert.equal(manager.isAllowedByInclusions(), true);
  const constructorFlow = between(source, 'if (this.isBlockedByExclusions())', 'this.createIntextPositions();');
  assert.ok(constructorFlow.indexOf('isBlockedByExclusions') < constructorFlow.indexOf('isAllowedByInclusions'));
});

test('PIP exclusions resuelven targeting nativo por la misma logica canonica', () => {
  const fixture = createFixture({ slots: [slot('premium', { isPremium: ['1'] })] });
  const node = Object.create(fixture.context.IntextNode.prototype);
  node.manager = fixture.manager;
  node.config = { video: { pip: { enabled: true, exclusions: { enabled: true, keyValues: { isPremium: ['1', 'true'] } } } } };
  node.scopedContext = null;
  assert.equal(node.isIntextPipBlockedByExclusions().blocked, true);
  node.config.video.pip.exclusions.enabled = false;
  node.config.video.pip.inclusions = { enabled: true, keyValues: { isPremium: ['1'] } };
  assert.equal(node.isIntextPipAllowedByInclusions().allowed, true);
});

test('PIP scoped usa solo los slots del articulo B en ambos sentidos premium', async () => {
  for (const [targetingA, targetingB, expectedBlocked] of [
    ['1', '0', false],
    ['0', '1', true],
  ]) {
    const fixture = createFixture({
      slots: [
        slot('article-a', { isPremium: [targetingA] }),
        slot('article-b', { isPremium: [targetingB] }),
      ],
    });
    const rootB = createArticleRoot(fixture, 'article-b', `article-b-${targetingB}`);
    const { scopedRuleContext } = await runContinuousArticleFlow(fixture, rootB);
    const node = Object.create(fixture.context.IntextNode.prototype);
    node.manager = fixture.manager;
    node.config = {
      video: {
        pip: {
          enabled: true,
          exclusions: {
            enabled: true,
            keyValues: { isPremium: ['1', 'true'] },
          },
        },
      },
    };
    node.scopedContext = scopedRuleContext;

    assert.equal(node.isIntextPipBlockedByExclusions().blocked, expectedBlocked);
  }
});

test('fallback getTargetingMap se usa cuando getTargeting esta vacio', () => {
  const fallbackSlot = slot('fallback');
  fallbackSlot.getTargetingMap = () => ({ foo: ['map-value'] });
  const { manager } = createFixture({ slots: [fallbackSlot] });
  assert.deepEqual(Array.from(manager.resolveIntextRuleTargeting('foo').values), ['map-value']);
});
