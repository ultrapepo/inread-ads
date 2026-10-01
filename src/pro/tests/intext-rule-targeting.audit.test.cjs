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

function createFixture({ psp = false, pubadsReady = true, page = {}, slots = [], dataTargeting = {}, ueDfpTargeting = {}, ueTargeting = {}, utagTargeting = {} } = {}) {
  const elements = new Map();
  const logs = [];
  slots.forEach((slot) => elements.set(slot.getSlotElementId(), { slot }));
  const pubads = {
    getSlots: () => slots,
    getTargeting: (key) => page[key] || [],
    getTargetingKeys: () => Object.keys(page),
  };
  const realGpt = {
    apiReady: true,
    pubadsReady,
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
    logIntext(...args) { logs.push(args); },
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
  return { manager, context, window, document, elements, realGpt, pubads, slots, logs };
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

function createArticleRoot(fixture, slotIds, urlSuffix) {
  const slotElements = new Set(
    (Array.isArray(slotIds) ? slotIds : [slotIds]).map((slotId) => fixture.elements.get(slotId)),
  );
  return {
    contains: (element) => slotElements.has(element),
    dataset: { url: `https://www.elmundo.es/${urlSuffix}` },
    querySelector: () => null,
  };
}

async function runContinuousArticleFlow(fixture, rootElement, {
  createNode = false,
  managerExclusions = true,
  exclusionKeyValues = { isPremium: ['1', 'true'] },
  onCreatePositions = null,
} = {}) {
  const { manager, context } = fixture;
  manager.baseSiteConfig = {
    infiniteScroll: {},
    ...(managerExclusions
      ? { exclusions: { keyValues: exclusionKeyValues } }
      : {}),
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
  manager.siteConfig = manager.baseSiteConfig;
  manager.resolveIntextRequestNetworkId = () => '99071977';
  manager.resolveIntextDisplayAdUnitPath = () => 'mun/cultura/n';
  manager.getIntextNetworkOverride = () => null;
  manager.resolveScopedIntextNewsIdentity = async () => ({ newsId: 'article-b' });
  manager.captureIntextContentIdentity = () => ({ newsId: 'article-b' });
  manager.detectContentType = () => 'noticia';
  manager.shouldBlockIntextByFallbackBlankControl = () => false;
  manager.registerIntextManagerDecision = () => true;

  if (createNode) {
    const parentNode = {
      insertBefore(node) { node.parentNode = this; },
    };
    const placement = {
      paragraph: { parentNode, nextSibling: null },
    };
    context.IntextPlacementEngine = class {
      findPlacements() { return [placement]; }
    };
    context.IntextContainer = class {
      constructor(element) { this.element = element; }
    };
    context.IntextNode.prototype.initialize = function initialize() {};
    manager.createWrapperNode = (index, type, suffix) => ({
      id: `gexp-intext-${type}-${index}${suffix}`,
      dataset: {},
      parentNode,
      nextSibling: null,
    });
    manager.getSlotOverridesForNode = () => null;
    manager.nodes = [];
    manager._navContinuaNodes = [];
  } else {
    manager.createIntextPositionsScoped = onCreatePositions || (() => ({ result: 'created', found: 1, created: 1 }));
  }

  let scopedRuleContext = null;
  const isBlockedByExclusions = manager.isBlockedByExclusions.bind(manager);
  manager.isBlockedByExclusions = (context) => {
    scopedRuleContext = context;
    return isBlockedByExclusions(context);
  };

  const result = await manager.onNewArticleDetected(rootElement, 1);
  return { result, scopedRuleContext, node: manager.nodes?.[0] || null };
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
  const resolved = manager.resolveIntextRuleTargeting('foo');
  assert.deepEqual(Array.from(resolved.values), ['a', 'b', 'c']);
  assert.equal(resolved.scoped, false);
  assert.equal(resolved.slotsChecked, 3);
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
  const constructorFlow = between(source, 'if (await this.isBlockedByExclusionsAfterTargetingReady())', 'this.createIntextPositions();');
  assert.ok(constructorFlow.indexOf('isBlockedByExclusionsAfterTargetingReady') < constructorFlow.indexOf('isAllowedByInclusions'));
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

test('flujo real propaga root no enumerable hasta IntextNode y PIP B no hereda A premium', async () => {
  const fixture = createFixture({
    slots: [
      slot('article-a', { isPremium: ['1'] }),
      slot('article-b', { isPremium: ['0'] }),
    ],
  });
  const rootB = createArticleRoot(fixture, 'article-b', 'article-b-node');
  const { result, node } = await runContinuousArticleFlow(
    fixture,
    rootB,
    { createNode: true, managerExclusions: false },
  );
  assert.equal(result.decision, 'allowed');
  assert.ok(node instanceof fixture.context.IntextNode);
  assert.equal(node.scopedContext.rootElement, rootB);
  assert.equal(Object.keys(node.scopedContext).includes('rootElement'), false);
  assert.deepEqual(
    Object.getOwnPropertyDescriptor(node.scopedContext, 'rootElement'),
    { value: rootB, enumerable: false, configurable: false, writable: false },
  );

  let pipResolution = null;
  const resolveIntextRuleTargeting = fixture.manager.resolveIntextRuleTargeting.bind(fixture.manager);
  fixture.manager.resolveIntextRuleTargeting = (key, context) => {
    const resolution = resolveIntextRuleTargeting(key, context);
    if (key === 'isPremium') pipResolution = resolution;
    return resolution;
  };
  assert.equal(node.isIntextPipBlockedByExclusions().blocked, false);
  assert.deepEqual(Array.from(pipResolution.values), ['0']);
  assert.equal(pipResolution.scoped, true);
  assert.equal(pipResolution.slotsChecked, 1);
});

test('PIP del IntextNode real bloquea B premium sin heredar A no premium', async () => {
  const fixture = createFixture({
    slots: [
      slot('article-a', { isPremium: ['0'] }),
      slot('article-b', { isPremium: ['1'] }),
    ],
  });
  const rootB = createArticleRoot(fixture, 'article-b', 'article-b-premium-node');
  const { node } = await runContinuousArticleFlow(
    fixture,
    rootB,
    { createNode: true, managerExclusions: false },
  );

  let pipResolution = null;
  const resolveIntextRuleTargeting = fixture.manager.resolveIntextRuleTargeting.bind(fixture.manager);
  fixture.manager.resolveIntextRuleTargeting = (key, context) => {
    const resolution = resolveIntextRuleTargeting(key, context);
    if (key === 'isPremium') pipResolution = resolution;
    return resolution;
  };
  assert.equal(node.isIntextPipBlockedByExclusions().blocked, true);
  assert.deepEqual(Array.from(pipResolution.values), ['1']);
  assert.equal(pipResolution.scoped, true);
  assert.equal(pipResolution.slotsChecked, 1);
});

test('IntextNode scoped consulta todos los slots de B y ninguno fuera del root', async () => {
  const fixture = createFixture({
    slots: [
      slot('article-a', { segment: ['outside'], isPremium: ['0'] }),
      slot('article-b-1', { segment: ['sports'] }),
      slot('article-b-2', { isPremium: ['1'] }),
    ],
  });
  const rootB = createArticleRoot(fixture, ['article-b-1', 'article-b-2'], 'article-b-multi-slot');
  const { node } = await runContinuousArticleFlow(
    fixture,
    rootB,
    { createNode: true, managerExclusions: false },
  );
  const segment = fixture.manager.resolveIntextRuleTargeting('segment', node.scopedContext);
  const premium = fixture.manager.resolveIntextRuleTargeting('isPremium', node.scopedContext);

  assert.deepEqual(Array.from(segment.values), ['sports']);
  assert.deepEqual(Array.from(premium.values), ['1']);
  assert.equal(segment.slotsChecked, 2);
  assert.equal(premium.slotsChecked, 2);
});

test('fallback getTargetingMap se usa cuando getTargeting esta vacio', () => {
  const fallbackSlot = slot('fallback');
  fallbackSlot.getTargetingMap = () => ({ foo: ['map-value'] });
  const { manager } = createFixture({ slots: [fallbackSlot] });
  assert.deepEqual(Array.from(manager.resolveIntextRuleTargeting('foo').values), ['map-value']);
});

test('hotfix PSP reproduce elmundo: espera 400ms, reevalua premium y no adelanta random inclusion', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: null });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { isPremium: ['1', 'true'] } },
    inclusions: { keyValues: { random1: ['8'] } },
  };
  let elapsed = 0;
  let waitCalls = 0;
  const originalWait = fixture.manager.waitForIntextRuleTargetingReady.bind(fixture.manager);
  fixture.manager.waitForIntextRuleTargetingReady = (context) => originalWait(context, {
    now: () => elapsed,
    wait: async (delayMs) => {
      waitCalls += 1;
      elapsed += delayMs;
      if (elapsed === 400) {
        fixture.realGpt.pubadsReady = true;
        fixture.slots.push(slot('SelectorBased-slot-late', { isPremium: ['1'] }));
        fixture.window.ueDataLayer.isPremium = true;
      }
    },
  });
  let inclusionsChecked = 0;
  const originalInclusions = fixture.manager.isAllowedByInclusions.bind(fixture.manager);
  fixture.manager.isAllowedByInclusions = (...args) => {
    inclusionsChecked += 1;
    return originalInclusions(...args);
  };
  const sideEffects = { nodes: 0, display: 0, prebid: 0, aps: 0, video: 0 };

  const blocked = await fixture.manager.isBlockedByExclusionsAfterTargetingReady();
  if (!blocked && fixture.manager.isAllowedByInclusions()) sideEffects.nodes += 1;

  assert.equal(blocked, true);
  assert.equal(elapsed, 400);
  assert.equal(waitCalls, 16);
  assert.equal(inclusionsChecked, 0);
  assert.deepEqual(sideEffects, { nodes: 0, display: 0, prebid: 0, aps: 0, video: 0 });
  const startedLog = fixture.logs.find(([message]) => message.includes('intext_rule_targeting_wait_started'));
  const completedLog = fixture.logs.find(([message]) => message.includes('intext_rule_targeting_wait_completed'));
  const finalLog = fixture.logs.find(([message]) => message.includes('intext_rule_targeting_final_recheck'));
  assert.equal(startedLog[1].pollMs, 25);
  assert.equal(startedLog[1].maxWaitMs, 600);
  assert.deepEqual(Array.from(startedLog[1].relevantKeys), ['isPremium']);
  assert.equal(completedLog[1].reason, 'exclusion-match');
  assert.equal(completedLog[1].elapsedMs, 400);
  assert.equal(finalLog[1].blocked, true);
  assert.equal(finalLog[1].elapsedWaitMs, 400);
});

test('hotfix PSP no premium estable hace recheck y permite inclusions a 125ms', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: null });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { isPremium: ['1', 'true'] } },
    inclusions: { keyValues: { random1: ['8'] } },
  };
  let elapsed = 0;
  const originalWait = fixture.manager.waitForIntextRuleTargetingReady.bind(fixture.manager);
  fixture.manager.waitForIntextRuleTargetingReady = (context) => originalWait(context, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 100) {
        fixture.window.ueDataLayer.isPremium = false;
        fixture.realGpt.pubadsReady = true;
        fixture.slots.push(slot('SelectorBased-slot-safe', { isPremium: ['0'] }));
      }
    },
  });

  assert.equal(await fixture.manager.isBlockedByExclusionsAfterTargetingReady(), false);
  assert.equal(fixture.manager.isAllowedByInclusions(), true);
  assert.equal(elapsed, 125);
});

test('helper PSP ya ready y con targeting estable resuelve en un poll', async () => {
  const fixture = createFixture({ psp: true, slots: Array.from({ length: 8 }, (_, index) => slot(`native-${index}`, { isPremium: ['0'] })) });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  let waitCalls = 0;
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => { elapsed += delayMs; waitCalls += 1; },
  });

  assert.equal(result.ready, true);
  assert.equal(result.reason, 'stable-blocking-targeting');
  assert.equal(result.readinessBasis, 'stable-blocking-targeting');
  assert.equal(result.nativeSlots, 8);
  assert.equal(result.elapsedMs, 25);
  assert.equal(result.stabilityPolls, 2);
  assert.equal(waitCalls, 1);
});

test('blocking key legitimamente ausente sale pronto con runtime y slots maduros', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: true, slots: [slot('empty-ready-slot')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => { elapsed += delayMs; },
  });

  assert.equal(result.reason, 'stable-empty-blocking-targeting-runtime-mature');
  assert.equal(result.relevantSignalFound, false);
  assert.equal(result.finalRecheckRequired, true);
  assert.equal(result.elapsedMs, 100);
  assert.deepEqual(Array.from(result.unresolvedBlockingKeys), ['isPremium']);
});

test('helper sin PSP no hace polling', async () => {
  const fixture = createFixture({ psp: false, pubadsReady: null });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  let waitCalls = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    wait: async () => { waitCalls += 1; },
  });

  assert.equal(result.reason, 'psp-not-detected');
  assert.equal(result.waitRequired, false);
  assert.equal(waitCalls, 0);
});

test('helper PSP con reglas solo random no hace polling', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: null });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { random2: ['2'] } },
    inclusions: { keyValues: { random1: ['8'] } },
  };
  let waitCalls = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    wait: async () => { waitCalls += 1; },
  });

  assert.equal(result.reason, 'no-external-targeting-rules');
  assert.equal(result.waitRequired, false);
  assert.equal(waitCalls, 0);
});

test('inclusion non-random sin blocking rules no retiene el gate', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: false, slots: [] });
  fixture.manager.siteConfig = { inclusions: { keyValues: { tag: ['economia'] } } };
  let waitCalls = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    wait: async () => { waitCalls += 1; },
  });

  assert.equal(result.reason, 'no-blocking-external-rules');
  assert.deepEqual(Array.from(result.inclusionKeys), ['tag']);
  assert.equal(result.waitRequired, false);
  assert.equal(waitCalls, 0);
});

test('timeout PSP inmaduro termina a 600ms, hace recheck y conserva fail-open', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: false, slots: [] });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { isPremium: ['1'] } },
    inclusions: { keyValues: { random1: ['8'] } },
  };
  let elapsed = 0;
  let polls = 0;
  let timeoutResult = null;
  const originalWait = fixture.manager.waitForIntextRuleTargetingReady.bind(fixture.manager);
  fixture.manager.waitForIntextRuleTargetingReady = async (context) => {
    timeoutResult = await originalWait(context, {
      now: () => elapsed,
      wait: async (delayMs) => { elapsed += delayMs; polls += 1; },
    });
    return timeoutResult;
  };

  assert.equal(await fixture.manager.isBlockedByExclusionsAfterTargetingReady(), false);
  assert.equal(fixture.manager.isAllowedByInclusions(), true);
  assert.equal(timeoutResult.reason, 'timeout');
  assert.equal(timeoutResult.timedOut, true);
  assert.equal(elapsed, 600);
  assert.equal(polls, 24);
});

test('cuatro exclusions no-random disparan un solo wait por decision', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('ready', { newsid: ['safe'], tag: ['safe'], t: ['safe'], isPremium: ['0'] })] });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { newsid: ['x'], tag: ['x'], t: ['x'], isPremium: ['1'] } },
  };
  let waits = 0;
  let elapsed = 0;
  const originalWait = fixture.manager.waitForIntextRuleTargetingReady.bind(fixture.manager);
  fixture.manager.waitForIntextRuleTargetingReady = (context) => {
    waits += 1;
    return originalWait(context, {
      now: () => elapsed,
      wait: async (delayMs) => { elapsed += delayMs; },
    });
  };

  assert.equal(await fixture.manager.isBlockedByExclusionsAfterTargetingReady(), false);
  assert.equal(waits, 1);
});

test('navegacion continua espera targeting estable de B y no consulta el premium de A', async () => {
  const targetingB = {};
  const fixture = createFixture({
    psp: true,
    pubadsReady: null,
    slots: [
      slot('article-a-late-test', { isPremium: ['1'] }),
      slot('article-b-late-test', targetingB),
    ],
  });
  const elementB = {};
  fixture.elements.set('article-b-late-test', elementB);
  const rootB = { contains: (element) => elapsed >= 150 && element === elementB };
  const scopedContext = {
    rootElement: rootB,
    siteConfig: { exclusions: { keyValues: { isPremium: ['1'] } } },
    navIndex: 1,
  };
  let elapsed = 0;
  const originalWait = fixture.manager.waitForIntextRuleTargetingReady.bind(fixture.manager);
  fixture.manager.waitForIntextRuleTargetingReady = (context) => originalWait(context, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 150) targetingB.isPremium = ['0'];
    },
  });

  assert.equal(await fixture.manager.isBlockedByExclusionsAfterTargetingReady(scopedContext), false);
  assert.equal(elapsed, 175);
});

test('extrae keys non-random de exclusions, inclusions y disableSlots sin duplicados', () => {
  const fixture = createFixture({ psp: true, pubadsReady: null });
  fixture.manager.siteConfig = {
    exclusions: {
      keyValues: { newsid: ['1'], random1: ['8'], tag: ['blocked'] },
      disableSlots: {
        rules: [
          { slots: [0], ifKeyValues: { t: ['x'], tag: ['blocked'], random2: ['2'] } },
          { slots: [1], ifKeyValues: { isPremium: ['1'] } },
        ],
      },
    },
    inclusions: { keyValues: { section: ['sports'], random3: ['3'] } },
  };

  assert.deepEqual(
    Array.from(fixture.manager.getIntextRelevantNonRandomRuleKeys()),
    ['newsid', 'tag', 'section', 't', 'isPremium'],
  );
  const roles = fixture.manager.getIntextRuleKeyRoles();
  assert.deepEqual(Array.from(roles.exclusionKeys), ['newsid', 'random1', 'tag']);
  assert.deepEqual(Array.from(roles.inclusionKeys), ['section', 'random3']);
  assert.deepEqual(Array.from(roles.disableSlotKeys), ['t', 'tag', 'random2', 'isPremium']);
  assert.deepEqual(Array.from(roles.blockingKeys), ['newsid', 'tag', 't', 'isPremium']);
});

test('inclusion resuelta no enmascara premium pendiente y bloquea a 175ms', async () => {
  const targeting = {};
  const fixture = createFixture({ psp: true, pubadsReady: false });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { isPremium: ['1', 'true'] } },
    inclusions: { keyValues: { tag: ['economia'] } },
  };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 100) {
        targeting.tag = ['economia'];
        fixture.slots.push(slot('inclusion-before-premium', targeting));
      }
      if (elapsed === 175) targeting.isPremium = ['1'];
    },
  });

  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.elapsedMs, 175);
  assert.deepEqual(Array.from(result.resolvedBlockingKeys), ['isPremium']);
  assert.equal(result.blockingGptSlotSignalFound, true);
});

test('otra exclusion resuelta no enmascara premium pendiente', async () => {
  const targeting = {};
  const fixture = createFixture({ psp: true, pubadsReady: false });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { tag: ['bloqueo-publi'], isPremium: ['1', 'true'] } },
  };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 100) {
        targeting.tag = ['normal'];
        fixture.slots.push(slot('exclusion-before-premium', targeting));
      }
      if (elapsed === 175) targeting.isPremium = ['1'];
    },
  });

  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.elapsedMs, 175);
});

test('blocking key vacia con runtime inmaduro no sale por fingerprints vacios', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: false, slots: [] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { tag: ['bloqueo-publi'] } } };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => { elapsed += delayMs; },
  });

  assert.equal(result.reason, 'timeout');
  assert.equal(result.elapsedMs, 600);
  assert.equal(result.blockingStabilityPolls, 0);
});

test('generic blocking key tarda aunque otra inclusion ya tenga targeting', async () => {
  const targeting = {};
  const fixture = createFixture({ psp: true, pubadsReady: false });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { fooBlock: ['1'] } },
    inclusions: { keyValues: { section: ['economia'] } },
  };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 100) {
        targeting.section = ['economia'];
        fixture.slots.push(slot('generic-blocking-late', targeting));
      }
      if (elapsed === 175) targeting.fooBlock = ['1'];
    },
  });

  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.elapsedMs, 175);
  assert.deepEqual(Array.from(result.blockingKeys), ['fooBlock']);
});

test('scoped multi-key espera el blocker de B y no usa targeting de A', async () => {
  const targetingB = {};
  const fixture = createFixture({
    psp: true,
    pubadsReady: true,
    slots: [
      slot('role-aware-a', { isPremium: ['1'], tag: ['A'] }),
      slot('role-aware-b', targetingB),
    ],
  });
  const elementB = {};
  fixture.elements.set('role-aware-b', elementB);
  const rootB = { contains: (element) => elapsed >= 175 && element === elementB };
  const scopedContext = {
    rootElement: rootB,
    siteConfig: {
      exclusions: { keyValues: { isPremium: ['1'] } },
      inclusions: { keyValues: { tag: ['B'] } },
    },
  };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(scopedContext, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 100) targetingB.tag = ['B'];
      if (elapsed === 175) targetingB.isPremium = ['0'];
    },
  });

  assert.equal(result.reason, 'stable-blocking-targeting');
  assert.equal(result.elapsedMs, 200);
  assert.equal(result.scoped, true);
  assert.deepEqual(Array.from(result.resolvedBlockingKeys), ['isPremium']);
  assert.deepEqual(Array.from(fixture.manager.resolveIntextRuleTargeting('isPremium', scopedContext).values), ['0']);
});

test('exclusion disponible en el fast path bloquea sin invocar el wait', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: null, ueTargeting: { isPremium: true } });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  let waits = 0;
  fixture.manager.waitForIntextRuleTargetingReady = async () => { waits += 1; throw new Error('unexpected wait'); };

  assert.equal(await fixture.manager.isBlockedByExclusionsAfterTargetingReady(), true);
  assert.equal(waits, 0);
});

test('DataLayer premium tardio bloquea early a 75ms sin esperar GPT', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: null });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 75) fixture.window.ueDataLayer.isPremium = true;
    },
  });

  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.blockedEarly, true);
  assert.equal(result.relevantSignalFound, true);
  assert.equal(result.elapsedMs, 75);
});

test('slot existente sin targeting no completa readiness antes del premium a 175ms', async () => {
  const lateTargeting = {};
  const fixture = createFixture({ psp: true, pubadsReady: null });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 100) fixture.slots.push(slot('early-empty-slot', lateTargeting));
      if (elapsed === 175) lateTargeting.isPremium = ['1'];
    },
  });

  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.elapsedMs, 175);
  assert.deepEqual(Array.from(result.resolvedRelevantKeys), ['isPremium']);
});

test('pubadsReady prematuro no completa readiness antes del DataLayer premium', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: false });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 75) fixture.realGpt.pubadsReady = true;
      if (elapsed === 150) fixture.window.ueDataLayer.isPremium = true;
    },
  });

  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.elapsedMs, 150);
});

test('slot-only premium tardio bloquea a 175ms', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: null });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 175) fixture.slots.push(slot('slot-only-premium', { isPremium: ['1'] }));
    },
  });

  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.elapsedMs, 175);
});

test('false temprano y slot vacio no permiten antes del targeting premium a 200ms', async () => {
  const lateSlotTargeting = {};
  const fixture = createFixture({ psp: true, pubadsReady: null });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { isPremium: ['1', 'true'] } },
    inclusions: { keyValues: { random1: ['8'] } },
  };
  let elapsed = 0;
  const originalWait = fixture.manager.waitForIntextRuleTargetingReady.bind(fixture.manager);
  fixture.manager.waitForIntextRuleTargetingReady = (context) => originalWait(context, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 50) fixture.window.ueDataLayer.isPremium = false;
      if (elapsed === 100) fixture.slots.push(slot('conflicting-premium', lateSlotTargeting));
      if (elapsed === 200) lateSlotTargeting.isPremium = ['1'];
    },
  });

  assert.equal(await fixture.manager.isBlockedByExclusionsAfterTargetingReady(), true);
  assert.equal(elapsed, 200);
  assert.deepEqual(Array.from(fixture.manager.resolveIntextRuleTargeting('isPremium').values), ['1', 'false']);
});

test('key editorial tag espera targeting aunque el slot exista antes', async () => {
  const lateTagTargeting = {};
  const fixture = createFixture({ psp: true, pubadsReady: null });
  fixture.manager.siteConfig = { exclusions: { keyValues: { tag: ['bloqueo-publi'] } } };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 50) fixture.slots.push(slot('generic-tag-slot', lateTagTargeting));
      if (elapsed === 125) lateTagTargeting.tag = ['bloqueo-publi'];
    },
  });

  assert.deepEqual(Array.from(result.relevantKeys), ['tag']);
  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.elapsedMs, 125);
});

test('slotless DataLayer estable usa pubadsReady y termina sin esperar timeout', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: true, slots: [] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { tag: ['bloqueada'] } } };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady(null, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 100) fixture.window.ueDataLayer.tag = 'economia';
    },
  });

  assert.equal(result.reason, 'stable-blocking-targeting');
  assert.equal(result.readinessBasis, 'stable-blocking-targeting');
  assert.deepEqual(Array.from(result.resolvedRelevantKeys), ['tag']);
  assert.equal(result.elapsedMs, 200);
});

test('scoped ignora pubadsReady global hasta tener targeting de slot del articulo B', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: true, slots: [slot('article-a-global')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  const elementB = {};
  const rootB = { contains: (element) => element === elementB };
  let elapsed = 0;
  const result = await fixture.manager.waitForIntextRuleTargetingReady({ rootElement: rootB }, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      if (elapsed === 250) {
        fixture.elements.set('article-b-safe', elementB);
        fixture.slots.push(slot('article-b-safe', { isPremium: ['0'] }));
      }
    },
  });

  assert.equal(result.reason, 'stable-blocking-targeting');
  assert.equal(result.readinessBasis, 'stable-blocking-targeting');
  assert.equal(result.scoped, true);
  assert.equal(result.nativeSlots, 1);
  assert.equal(result.elapsedMs, 275);
});

test('el gate es unico antes de dos nodos y ninguna request cruza el boundary', () => {
  const initialFlow = between(
    source,
    'if (await this.isBlockedByExclusionsAfterTargetingReady())',
    'const placement = this.createIntextPositions();',
  );
  const createFlow = between(source, 'createIntextPositions() {', 'createWrapperNode(');
  assert.equal((initialFlow.match(/isBlockedByExclusionsAfterTargetingReady/g) || []).length, 1);
  assert.doesNotMatch(createFlow, /waitForIntextRuleTargetingReady/);
  assert.doesNotMatch(initialFlow, /requestBids|fetchBids|\.display\(|\.refresh\(|buildAndPlayVideo/);
  assert.ok(initialFlow.indexOf('isAllowedByInclusions') > initialFlow.indexOf('isBlockedByExclusionsAfterTargetingReady'));
});

test('readiness y P3 no leen sessionStorage ni datos de suscriptor', () => {
  const methods = [
    fixtureMethod('resolveIntextRuleTargeting'),
    fixtureMethod('waitForIntextRuleTargetingReady'),
    fixtureMethod('getIntextRelevantNonRandomRuleKeys'),
  ].join('\n');
  assert.doesNotMatch(methods, /sessionStorage|paymentSubscriptions|subscriptionPortals|\bpids\b|\buid\b/);
});

function fixtureMethod(name) {
  const fixture = createFixture();
  return fixture.manager[name].toString();
}

async function observeReadiness(fixture, ruleContext = null, onPoll = () => {}) {
  let elapsed = 0;
  return fixture.manager.waitForIntextRuleTargetingReady(ruleContext, {
    now: () => elapsed,
    wait: async (delayMs) => { elapsed += delayMs; onPoll(elapsed); },
  });
}

function keyMaturities(result) {
  return Object.fromEntries(Array.from(result.blockingKeyMaturities, (entry) => [entry.key, entry]));
}

test('coverage: initial dos slots, uno matched, no ready a 125/150 y block a 175ms', async () => {
  const fixture = createFixture({ psp: true });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  const targetingB = {};
  const polls = [];
  const result = await observeReadiness(fixture, null, (elapsed) => {
    polls.push(elapsed);
    assert.equal(fixture.realGpt.pubadsReady, true);
    if (elapsed === 100) fixture.slots.push(slot('coverage-a', { isPremium: ['0'] }), slot('coverage-b', targetingB));
    if (elapsed === 125 || elapsed === 150) {
      const keyState = fixture.manager.getIntextRelevantRuleTargetingState(['isPremium']).blockingKeyStates.isPremium;
      const maturity = fixture.manager.getIntextBlockingKeyMaturity({
        key: 'isPremium', resolution: fixture.manager.resolveIntextGptApi(),
        nativeSlots: fixture.slots, keyState, stability: { fingerprint: keyState.fingerprint, polls: 2 },
      });
      assert.equal(maturity.hasOwnSlotSignal, true);
      assert.equal(maturity.hasCompleteSlotCoverage, false);
      assert.equal(maturity.hasPartialSlotCoverage, true);
      assert.equal(maturity.requiredStabilityPolls, 5);
      assert.equal(maturity.status, 'pending');
      assert.equal(maturity.reason, 'partial-slot-targeting-pending');
    }
    if (elapsed === 175) targetingB.isPremium = ['1'];
  });
  assert.ok(polls.includes(125) && polls.includes(150));
  assert.equal(result.elapsedMs, 175);
  assert.equal(result.reason, 'exclusion-match');
  assert.deepEqual(Array.from(fixture.manager.resolveIntextRuleTargeting('isPremium').values), ['0', '1']);
});

test('coverage: scoped B dos slots, uno matched, late block a 175ms sin slots A', async () => {
  const outside = slot('coverage-outside-a', { isPremium: ['1'] });
  let outsideReads = 0;
  const readOutside = outside.getTargeting;
  outside.getTargeting = (key) => { outsideReads += 1; return readOutside(key); };
  const fixture = createFixture({ psp: true, slots: [outside] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  const targetingB2 = {};
  const ruleContext = { rootElement: { contains: (element) => element?.article === 'B' } };
  const polls = [];
  const result = await observeReadiness(fixture, ruleContext, (elapsed) => {
    polls.push(elapsed);
    if (elapsed === 100) {
      fixture.elements.set('coverage-b1', { article: 'B' });
      fixture.elements.set('coverage-b2', { article: 'B' });
      fixture.slots.push(slot('coverage-b1', { isPremium: ['0'] }), slot('coverage-b2', targetingB2));
    }
    if (elapsed === 175) targetingB2.isPremium = ['1'];
  });
  assert.ok(polls.includes(125) && polls.includes(150));
  assert.equal(result.elapsedMs, 175);
  assert.equal(result.reason, 'exclusion-match');
  assert.equal(keyMaturities(result).isPremium.slotsChecked, 2);
  assert.equal(outsideReads, 0);
});

test('coverage: completa en dos slots a 100ms conserva fast path a 125ms', async () => {
  const fixture = createFixture({ psp: true });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 100) fixture.slots.push(slot('complete-a', { isPremium: ['0'] }), slot('complete-b', { isPremium: ['0'] }));
  });
  const maturity = keyMaturities(result).isPremium;
  assert.equal(result.elapsedMs, 125);
  assert.equal(maturity.reason, 'stable-own-slot-targeting');
  assert.equal(maturity.requiredStabilityPolls, 2);
  assert.equal(maturity.stabilityPolls, 2);
  assert.equal(maturity.slotsChecked, 2);
  assert.equal(maturity.slotsMatched, 2);
  assert.equal(maturity.slotCoverage, 'complete');
});

test('coverage: un matched de cinco slots estable madura a 100ms sin timeout', async () => {
  const fixture = createFixture({ psp: true, slots: [
    slot('partial-stable-1', { isPremium: ['0'] }),
    ...Array.from({ length: 4 }, (_, index) => slot(`partial-stable-${index + 2}`)),
  ] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  const result = await observeReadiness(fixture);
  const maturity = keyMaturities(result).isPremium;
  assert.equal(result.elapsedMs, 100);
  assert.equal(result.timedOut, false);
  assert.equal(maturity.status, 'resolved-mature');
  assert.equal(maturity.reason, 'stable-partial-slot-coverage');
  assert.equal(maturity.requiredStabilityPolls, 5);
  assert.equal(maturity.slotsChecked, 5);
  assert.equal(maturity.slotsMatched, 1);
  assert.equal(maturity.slotCoverage, 'partial');
  const completed = fixture.logs.find(([message]) => message.includes('intext_rule_targeting_wait_completed'))[1];
  assert.deepEqual(Object.keys(completed.blockingKeyMaturities[0]), [
    'key', 'status', 'reason', 'stabilityPolls', 'requiredStabilityPolls', 'slotsChecked', 'slotsMatched', 'slotCoverage',
  ]);
});

test('coverage: partial 1/5 pasa a complete 5/5 con igual union y madura a 175ms', async () => {
  const fixture = createFixture({ psp: true });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  const targets = Array.from({ length: 5 }, (_, index) => index === 0 ? { isPremium: ['0'] } : {});
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 100) fixture.slots.push(...targets.map((targeting, index) => slot(`complete-later-${index}`, targeting)));
    if (elapsed === 150) targets.forEach((targeting) => { targeting.isPremium = ['0']; });
  });
  assert.equal(result.elapsedMs, 175);
  assert.equal(keyMaturities(result).isPremium.requiredStabilityPolls, 2);
  assert.equal(keyMaturities(result).isPremium.stabilityPolls, 2);
  assert.equal(keyMaturities(result).isPremium.slotCoverage, 'complete');
});

test('coverage: partial a complete blocking bloquea a 150ms antes de estabilidad', async () => {
  const fixture = createFixture({ psp: true });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  const targetingB = {};
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 100) fixture.slots.push(slot('completion-block-a', { isPremium: ['0'] }), slot('completion-block-b', targetingB));
    if (elapsed === 150) targetingB.isPremium = ['1'];
  });
  assert.equal(result.elapsedMs, 150);
  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.blockedEarly, true);
});

test('coverage: nuevo slot en poll 2 convierte complete a partial y bloquea en poll 4', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('discovery-complete-a', { isPremium: ['0'] })] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  const targetingB = {};
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 25) fixture.slots.push(slot('discovery-complete-b', targetingB));
    if (elapsed === 75) targetingB.isPremium = ['1'];
  });
  assert.equal(result.elapsedMs, 75);
  assert.equal(result.reason, 'exclusion-match');
});

test('coverage: eliminar un slot sin targeting reinicia y reclasifica partial a complete', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('removal-a', { fooBlock: ['0'] }), slot('removal-b')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 25) fixture.slots.pop();
  });
  assert.equal(result.elapsedMs, 50);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 2);
  assert.equal(keyMaturities(result).fooBlock.requiredStabilityPolls, 2);
  assert.equal(keyMaturities(result).fooBlock.slotCoverage, 'complete');
});

test('coverage: wrappers nuevos con mismos IDs mantienen complete fast path', async () => {
  const fixture = createFixture({ psp: true });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  fixture.pubads.getSlots = () => [slot('coverage-wrapper-1', { fooBlock: ['0'] }), slot('coverage-wrapper-2', { fooBlock: ['0'] })];
  const result = await observeReadiness(fixture);
  assert.equal(result.elapsedMs, 25);
  assert.equal(keyMaturities(result).fooBlock.slotCoverage, 'complete');
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 2);
});

test('coverage: reordenar mismos IDs no resetea complete coverage', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('coverage-order-1', { fooBlock: ['0'] }), slot('coverage-order-2', { fooBlock: ['0'] })] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, () => { fixture.slots.reverse(); });
  assert.equal(result.elapsedMs, 25);
  assert.equal(keyMaturities(result).fooBlock.slotCoverage, 'complete');
});

test('coverage: generic fooBlock partial detecta blocker tardio', async () => {
  const targetingB = {};
  const fixture = createFixture({ psp: true, slots: [slot('generic-partial-a', { fooBlock: ['0'] }), slot('generic-partial-b', targetingB)] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 75) targetingB.fooBlock = ['1'];
  });
  assert.equal(result.elapsedMs, 75);
  assert.equal(result.reason, 'exclusion-match');
});

test('coverage: key exclusiva de disableSlots usa cobertura parcial sin cambiar matching', async () => {
  const targetingB = {};
  const fixture = createFixture({ psp: true, slots: [slot('disable-partial-a', { fooBlock: ['0'] }), slot('disable-partial-b', targetingB)] });
  fixture.manager.siteConfig = { exclusions: { disableSlots: { rules: [{ slots: [0], ifKeyValues: { fooBlock: ['1'] } }] } } };
  const result = await observeReadiness(fixture);
  assert.equal(result.elapsedMs, 100);
  assert.equal(keyMaturities(result).fooBlock.requiredStabilityPolls, 5);
  assert.equal(keyMaturities(result).fooBlock.slotCoverage, 'partial');
  assert.equal(fixture.manager.isSlotDisabledByExclusion(0), false);
  targetingB.fooBlock = ['1'];
  assert.equal(fixture.manager.isSlotDisabledByExclusion(0), true);
});

test('coverage: global false no completa coverage parcial GPT', async () => {
  const fixture = createFixture({ psp: true, ueTargeting: { isPremium: false }, slots: [slot('global-partial-a', { isPremium: ['0'] }), slot('global-partial-b')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  const result = await observeReadiness(fixture);
  assert.equal(result.elapsedMs, 100);
  assert.equal(keyMaturities(result).isPremium.requiredStabilityPolls, 5);
  assert.equal(keyMaturities(result).isPremium.slotCoverage, 'partial');
});

test('coverage: GPT page targeting no completa coverage parcial slot-level', async () => {
  const fixture = createFixture({ psp: true, page: { isPremium: ['0'] }, slots: [slot('page-partial-a', { isPremium: ['0'] }), slot('page-partial-b')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  const result = await observeReadiness(fixture);
  assert.equal(result.elapsedMs, 100);
  assert.equal(keyMaturities(result).isPremium.requiredStabilityPolls, 5);
  assert.equal(keyMaturities(result).isPremium.slotCoverage, 'partial');
});

test('coverage: request boundary del flujo real cerrado durante partial coverage pending', async () => {
  const targetingB2 = {};
  const fixture = createFixture({ psp: true, slots: [slot('boundary-partial-b1', { isPremium: ['0'] }), slot('boundary-partial-b2', targetingB2)] });
  const rootB = createArticleRoot(fixture, ['boundary-partial-b1', 'boundary-partial-b2'], 'boundary-partial-b');
  const calls = { nodes: 0, prebid: 0, aps: 0, display: 0, refresh: 0, video: 0, inclusions: 0 };
  fixture.window.pbjs = { requestBids() { calls.prebid += 1; } };
  fixture.window.apstag = { fetchBids() { calls.aps += 1; } };
  fixture.realGpt.display = () => { calls.display += 1; };
  fixture.pubads.refresh = () => { calls.refresh += 1; };
  fixture.manager.isAllowedByInclusions = () => { calls.inclusions += 1; return true; };
  fixture.manager.buildAndPlayVideo = () => { calls.video += 1; };
  let elapsed = 0;
  const originalWait = fixture.manager.waitForIntextRuleTargetingReady.bind(fixture.manager);
  fixture.manager.waitForIntextRuleTargetingReady = (ruleContext) => originalWait(ruleContext, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      assert.ok(Object.values(calls).every((count) => count === 0));
      if (elapsed === 75) targetingB2.isPremium = ['1'];
    },
  });
  const { result } = await runContinuousArticleFlow(fixture, rootB, {
    onCreatePositions: () => { calls.nodes += 1; throw new Error('nodes during partial coverage'); },
  });
  assert.equal(elapsed, 75);
  assert.equal(result.decision, 'excluded');
  assert.ok(Object.values(calls).every((count) => count === 0));
});

test('coverage: slotsMatched 1 a 2 reinicia observacion aunque siga partial y union igual', async () => {
  const targetingB = {};
  const fixture = createFixture({ psp: true, slots: [
    slot('matched-change-a', { fooBlock: ['0'] }), slot('matched-change-b', targetingB), slot('matched-change-c'),
  ] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 25) targetingB.fooBlock = ['0'];
  });
  assert.equal(result.elapsedMs, 125);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
  assert.equal(keyMaturities(result).fooBlock.slotsMatched, 2);
  assert.equal(keyMaturities(result).fooBlock.slotsChecked, 3);
  assert.equal(keyMaturities(result).fooBlock.slotCoverage, 'partial');
});

test('coverage: cambio real de IDs con complete coverage y mismos counters reinicia snapshot', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('full-id-a', { fooBlock: ['0'] }), slot('full-id-b', { fooBlock: ['0'] })] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 25) fixture.slots[1] = slot('full-id-c', { fooBlock: ['0'] });
  });
  assert.equal(result.elapsedMs, 50);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 2);
  assert.equal(keyMaturities(result).fooBlock.slotCoverage, 'complete');
});

test('coverage: unknown slot identity no certifica ausencia estable', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  assert.equal(fixture.manager.getIntextNativeGptSlots().length, 1);
  const result = await observeReadiness(fixture);
  assert.equal(result.elapsedMs, 600);
  assert.equal(result.timedOut, true);
  assert.equal(keyMaturities(result).fooBlock.status, 'pending');
  assert.equal(keyMaturities(result).fooBlock.slotCoverage, 'none');
  assert.deepEqual(Array.from(result.pendingBlockingKeysAtExit), ['fooBlock']);
});

test('per-key: blocker GPT no certifica otro blocker global false y bloquea a 175ms', async () => {
  const targeting = {};
  const fixture = createFixture({ psp: true, pubadsReady: false });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { tag: ['bloqueo-publi'], isPremium: ['1', 'true'] } },
  };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 100) {
      targeting.tag = ['normal'];
      fixture.window.ueDataLayer.isPremium = false;
      fixture.slots.push(slot('blocker-masking-blocker', targeting));
    }
    if (elapsed === 125) {
      const state = fixture.manager.getIntextRelevantRuleTargetingState(['tag', 'isPremium']);
      assert.equal(state.blockingGptSlotSignalFound, true);
      assert.equal(state.blockingKeyStates.isPremium.hasGptSlotSignal, false);
      assert.equal(state.blockingKeyStates.isPremium.hasUeDataLayerSignal, true);
      assert.equal(fixture.manager.needsIntextRuleTargetingReadinessWait(), true);
    }
    if (elapsed === 175) {
      fixture.realGpt.pubadsReady = true;
      targeting.isPremium = ['1'];
    }
  });
  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.blockedEarly, true);
  assert.equal(result.elapsedMs, 175);
});

test('per-key: partial resolved y optional absent terminan a 100ms con telemetry compacta', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('partial', { tag: ['normal'], isPremium: ['0'] })] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { newsid: ['x'], tag: ['x'], t: ['x'], isPremium: ['1'] } } };
  let elapsed = 0;
  const firstMatureAt = {};
  const originalMaturity = fixture.manager.getIntextBlockingKeyMaturity.bind(fixture.manager);
  fixture.manager.getIntextBlockingKeyMaturity = (state) => {
    const maturity = originalMaturity(state);
    if (maturity.mature && firstMatureAt[maturity.key] === undefined) firstMatureAt[maturity.key] = elapsed;
    return maturity;
  };
  const result = await observeReadiness(fixture, null, (pollTime) => { elapsed = pollTime; });
  const states = keyMaturities(result);
  assert.equal(result.elapsedMs, 100);
  assert.equal(result.timedOut, false);
  assert.equal(states.tag.status, 'resolved-mature');
  assert.equal(states.isPremium.reason, 'stable-own-slot-targeting');
  assert.equal(states.newsid.status, 'absent-mature');
  assert.equal(states.t.reason, 'stable-absent-after-slot-settle');
  assert.equal(states.tag.requiredStabilityPolls, 2);
  assert.equal(states.t.requiredStabilityPolls, 5);
  assert.ok(Object.values(states).every((entry) => entry.stabilityPolls === 5));
  assert.deepEqual(firstMatureAt, { tag: 25, isPremium: 25, newsid: 100, t: 100 });
  assert.deepEqual(Array.from(result.pendingBlockingKeysAtExit), []);
  const completed = fixture.logs.find(([message]) => message.includes('intext_rule_targeting_wait_completed'))[1];
  assert.equal(completed.blockingKeyMaturities.length, 4);
  assert.deepEqual(Object.keys(completed.blockingKeyMaturities[0]), ['key', 'status', 'reason', 'stabilityPolls', 'requiredStabilityPolls', 'slotsChecked', 'slotsMatched', 'slotCoverage']);
});

test('per-key: global false desde 50ms no madura con slot vacio y GPT inmaduro', async () => {
  const targeting = {};
  const fixture = createFixture({ psp: true, pubadsReady: false });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 50) fixture.window.ueDataLayer.isPremium = false;
    if (elapsed === 100) fixture.slots.push(slot('global-false-late-true', targeting));
    if (elapsed === 175) targeting.isPremium = ['1'];
  });
  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.elapsedMs, 175);
});

test('per-key: global false con ausencia slot-level madura resuelve a 100ms', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('mature-absence')], ueTargeting: { isPremium: false } });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  const result = await observeReadiness(fixture);
  assert.equal(result.elapsedMs, 100);
  assert.equal(keyMaturities(result).isPremium.status, 'resolved-mature');
  assert.equal(keyMaturities(result).isPremium.reason, 'stable-global-with-stable-slot-absence');
});

test('per-key: fingerprints vacios previos a runtime ready no cuentan como estabilidad madura', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: false, slots: [slot('runtime-not-ready')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 100) fixture.realGpt.pubadsReady = true;
  });
  assert.equal(result.elapsedMs, 200);
  assert.equal(keyMaturities(result).fooBlock.status, 'absent-mature');
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
});

test('per-key: all absent no depende de inclusion GPT resuelta', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('all-absent', { section: ['sports'] })] });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { newsid: ['x'], tag: ['x'], t: ['x'], isPremium: ['1'] } },
    inclusions: { keyValues: { section: ['sports'] } },
  };
  const result = await observeReadiness(fixture);
  assert.equal(result.elapsedMs, 100);
  assert.equal(result.reason, 'stable-empty-blocking-targeting-runtime-mature');
  assert.ok(Object.values(keyMaturities(result)).every((entry) => entry.status === 'absent-mature'));
});

test('per-key: mixed sources derivan exclusivamente del resolver canonico', async () => {
  const fixture = createFixture({
    psp: true, slots: [slot('mixed', { tag: ['normal'] })], ueTargeting: { isPremium: false },
    dataTargeting: { dataBlock: 'safe' }, ueDfpTargeting: { dfpBlock: 'safe' },
    page: { pageBlock: ['safe'] }, utagTargeting: { utagBlock: 'safe' },
  });
  fixture.manager.siteConfig = { exclusions: { keyValues: Object.fromEntries(
    ['newsid', 'tag', 't', 'isPremium', 'dataBlock', 'dfpBlock', 'pageBlock', 'utagBlock'].map((key) => [key, ['blocked']]),
  ) } };
  const ruleContext = { targeting: { newsid: 'safe' } };
  const state = fixture.manager.getIntextRelevantRuleTargetingState(
    fixture.manager.getIntextRelevantNonRandomRuleKeys(ruleContext), ruleContext,
  );
  const keys = state.blockingKeyStates;
  assert.equal(keys.newsid.hasContextSignal, true);
  assert.equal(keys.tag.hasGptSlotSignal, true);
  assert.equal(keys.isPremium.hasUeDataLayerSignal, true);
  assert.equal(keys.dataBlock.hasDataSignal, true);
  assert.equal(keys.dfpBlock.hasUeDfpSignal, true);
  assert.equal(keys.pageBlock.hasGptPageSignal, true);
  assert.equal(keys.utagBlock.hasUtagSignal, true);
  assert.equal(keys.t.fingerprint, '[]');
  assert.equal(keys.isPremium.fingerprint, '["false"]');
  const result = await observeReadiness(fixture, ruleContext);
  assert.equal(result.elapsedMs, 100);
  assert.equal(keyMaturities(result).t.status, 'absent-mature');
  assert.ok(Object.entries(keyMaturities(result)).filter(([key]) => key !== 't').every(([, entry]) => entry.status === 'resolved-mature'));
});

test('per-key: own slot targeting madura aunque pubadsReady sea false', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: false, slots: [slot('own-slot', { isPremium: ['0'] })] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1'] } } };
  const result = await observeReadiness(fixture);
  assert.equal(result.elapsedMs, 25);
  assert.equal(keyMaturities(result).isPremium.reason, 'stable-own-slot-targeting');
});

test('per-key: inclusion cambiante no resetea ni certifica blocker maturity', async () => {
  const targeting = { fooBlock: ['0'], section: ['sports'] };
  const fixture = createFixture({ psp: true, pubadsReady: false, slots: [slot('inclusion-changing', targeting)] });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { fooBlock: ['1'] } }, inclusions: { keyValues: { section: ['sports'] } },
  };
  const result = await observeReadiness(fixture, null, () => { delete targeting.section; });
  assert.equal(result.elapsedMs, 25);
  assert.deepEqual(Object.keys(keyMaturities(result)), ['fooBlock']);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 2);
});

test('per-key: generic blockers tienen contadores independientes y disableSlots participa', async () => {
  const targeting = { fooBlock: ['safe'], barBlock: ['safe'] };
  const fixture = createFixture({ psp: true, slots: [slot('generic-counters', targeting)] });
  fixture.manager.siteConfig = { exclusions: {
    keyValues: { fooBlock: ['1'] }, disableSlots: { rules: [{ slots: [0], ifKeyValues: { barBlock: ['1'] } }] },
  } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 25) targeting.barBlock = ['other-safe'];
  });
  assert.equal(result.elapsedMs, 50);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 3);
  assert.equal(keyMaturities(result).barBlock.stabilityPolls, 2);
});

test('per-key: scoped partial observa solo slots B y ausencia estable sin pubadsReady global', async () => {
  const outside = slot('partial-a', { fooBlock: ['1'] });
  let outsideReads = 0;
  outside.getTargeting = outside.getTargetingMap = () => { outsideReads += 1; return []; };
  const fixture = createFixture({ psp: true, pubadsReady: false, slots: [outside, slot('partial-b', { barBlock: ['0'] })] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'], barBlock: ['1'] } } };
  const ruleContext = { rootElement: createArticleRoot(fixture, 'partial-b', 'partial-b') };
  const result = await observeReadiness(fixture, ruleContext);
  assert.equal(result.elapsedMs, 100);
  assert.equal(result.nativeSlots, 1);
  assert.equal(outsideReads, 0);
  assert.equal(keyMaturities(result).fooBlock.status, 'absent-mature');
  assert.equal(keyMaturities(result).barBlock.status, 'resolved-mature');
  const state = fixture.manager.getIntextRelevantRuleTargetingState(['fooBlock', 'barBlock'], ruleContext);
  assert.equal(state.blockingKeyStates.fooBlock.slotsChecked, 1);
});

test('per-key: scoped slot aun no estable permite early block a 175ms', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('late-a', { fooBlock: ['0'] })] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const elementB = {};
  const ruleContext = { rootElement: { contains: (element) => element === elementB } };
  const targetingB = {};
  const result = await observeReadiness(fixture, ruleContext, (elapsed) => {
    if (elapsed === 100) {
      fixture.elements.set('late-b', elementB);
      fixture.slots.push(slot('late-b', targetingB));
    }
    // Fresh wrappers keep B's logical identity; reinforced absence still catches late targeting.
    if (elapsed === 125 || elapsed === 150) fixture.slots[1] = slot('late-b', targetingB);
    if (elapsed === 175) targetingB.fooBlock = ['1'];
  });
  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.elapsedMs, 175);
});

test('per-key: replacement scoped object con mismo slot ID conserva estabilidad', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('replace-b')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const ruleContext = { rootElement: createArticleRoot(fixture, 'replace-b', 'replace-b') };
  const result = await observeReadiness(fixture, ruleContext, (elapsed) => {
    if (elapsed === 25) fixture.slots[0] = slot('replace-b');
  });
  assert.equal(result.elapsedMs, 100);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
});

test('per-key: cambio de fuente con valores identicos exige dos snapshots de la propia key', async () => {
  const targeting = {};
  const fixture = createFixture({ psp: true, slots: [slot('source-changing', targeting)], ueTargeting: { fooBlock: '0' } });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 25) targeting.fooBlock = ['0'];
  });
  assert.equal(result.elapsedMs, 50);
  assert.equal(keyMaturities(result).fooBlock.reason, 'stable-own-slot-targeting');
});

test('per-key: timeout expone pending blockers sin madurarlos por estabilidad global', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: false, slots: [slot('timeout-partial', { fooBlock: ['0'] })] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'], barBlock: ['1'] } } };
  const result = await observeReadiness(fixture);
  assert.equal(result.elapsedMs, 600);
  assert.equal(result.timedOut, true);
  assert.equal(result.finalRecheckRequired, true);
  assert.deepEqual(Array.from(result.pendingBlockingKeysAtExit), ['barBlock']);
  assert.equal(keyMaturities(result).fooBlock.status, 'resolved-mature');
  assert.equal(keyMaturities(result).barBlock.status, 'pending');
});

test('per-key: request boundary real permanece cerrado mientras un blocker siga pending', async () => {
  const targetingB = { barBlock: ['0'] };
  const fixture = createFixture({ psp: true, slots: [slot('request-b', targetingB)] });
  const rootB = createArticleRoot(fixture, 'request-b', 'request-b');
  const calls = { prebid: 0, aps: 0, display: 0, refresh: 0, video: 0, nodes: 0, inclusions: 0 };
  fixture.window.pbjs = { requestBids() { calls.prebid += 1; } };
  fixture.window.apstag = { fetchBids() { calls.aps += 1; } };
  fixture.realGpt.display = () => { calls.display += 1; };
  fixture.pubads.refresh = () => { calls.refresh += 1; };
  fixture.manager.isAllowedByInclusions = () => { calls.inclusions += 1; return true; };
  fixture.manager.buildAndPlayVideo = () => { calls.video += 1; };
  let elapsed = 0;
  const originalWait = fixture.manager.waitForIntextRuleTargetingReady.bind(fixture.manager);
  fixture.manager.waitForIntextRuleTargetingReady = (ruleContext) => originalWait(ruleContext, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      assert.ok(Object.values(calls).every((count) => count === 0));
      if (elapsed === 175) targetingB.isPremium = ['1'];
    },
  });
  // B is not part of the scoped runtime until its slot appears at 150ms.
  const contains = rootB.contains;
  rootB.contains = (element) => elapsed >= 150 && contains(element);
  const { result } = await runContinuousArticleFlow(fixture, rootB, {
    exclusionKeyValues: { isPremium: ['1', 'true'], barBlock: ['1'] },
    onCreatePositions: () => { calls.nodes += 1; throw new Error('nodes before exclusions'); },
  });
  assert.equal(elapsed, 175);
  assert.ok(Object.values(calls).every((count) => count === 0));
  assert.equal(result.decision, 'excluded');
});

test('late-slot: global false + pubadsReady true antes del slot targeting bloquea a 175ms', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: false });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  const targeting = {};
  const polls = [];
  const result = await observeReadiness(fixture, null, (elapsed) => {
    polls.push(elapsed);
    if (elapsed === 50) fixture.window.ueDataLayer.isPremium = false;
    if (elapsed === 100) {
      fixture.realGpt.pubadsReady = true;
      fixture.slots.push(slot('late-premium-ready', targeting));
    }
    if (elapsed === 125 || elapsed === 150) {
      assert.equal(fixture.realGpt.pubadsReady, true);
      assert.equal(fixture.manager.isBlockedByExclusions(), false);
    }
    if (elapsed === 175) targeting.isPremium = ['1'];
  });
  assert.ok(polls.includes(125) && polls.includes(150));
  assert.equal(result.elapsedMs, 175);
  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.blockedEarly, true);
});

test('late-slot: slot discovery tardio reinicia grace y bloquea a 200ms', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: false });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  const targeting = {};
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 100) {
      fixture.realGpt.pubadsReady = true;
      fixture.window.ueDataLayer.isPremium = false;
    }
    if (elapsed === 150) fixture.slots.push(slot('discovery-late', targeting));
    if (elapsed === 200) targeting.isPremium = ['1'];
  });
  assert.equal(result.elapsedMs, 200);
  assert.equal(result.reason, 'exclusion-match');
});

test('late-slot: own slot non-blocking durante grace pasa al fast path a 175ms', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: false });
  fixture.manager.siteConfig = { exclusions: { keyValues: { isPremium: ['1', 'true'] } } };
  const targeting = {};
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 100) {
      fixture.realGpt.pubadsReady = true;
      fixture.window.ueDataLayer.isPremium = false;
      fixture.slots.push(slot('absence-to-own-slot', targeting));
    }
    if (elapsed === 150) targeting.isPremium = ['0'];
  });
  const maturity = keyMaturities(result).isPremium;
  assert.equal(result.elapsedMs, 175);
  assert.equal(maturity.reason, 'stable-own-slot-targeting');
  assert.equal(maturity.stabilityPolls, 2);
  assert.equal(maturity.requiredStabilityPolls, 2);
});

test('late-slot: own slot generic disponible a 100ms madura a 125ms', async () => {
  const fixture = createFixture({ psp: true, pubadsReady: false });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 100) fixture.slots.push(slot('fast-generic-own', { fooBlock: ['0'] }));
  });
  assert.equal(result.elapsedMs, 125);
  assert.equal(keyMaturities(result).fooBlock.requiredStabilityPolls, 2);
});

test('late-slot: pubadsReady desde t=0 no oculta generic blocking targeting tardio', async () => {
  const targeting = {};
  const fixture = createFixture({ psp: true, slots: [slot('generic-late-ready', targeting)], ueTargeting: { fooBlock: '0' } });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    assert.equal(fixture.realGpt.pubadsReady, true);
    if (elapsed === 75) targeting.fooBlock = ['1'];
  });
  assert.equal(result.elapsedMs, 75);
  assert.equal(result.reason, 'exclusion-match');
  assert.equal(result.blockedEarly, true);
});

test('late-slot: global slotless estable usa discovery threshold de cinco observaciones', async () => {
  const fixture = createFixture({ psp: true, ueTargeting: { fooBlock: '0' } });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture);
  assert.equal(result.elapsedMs, 100);
  assert.equal(result.nativeSlots, 0);
  assert.equal(keyMaturities(result).fooBlock.status, 'resolved-mature');
  assert.equal(keyMaturities(result).fooBlock.requiredStabilityPolls, 5);
});

test('late-slot: scoped B pending a 125ms bloquea a 175ms sin consultar A', async () => {
  const targetingB = {};
  const outside = slot('scoped-late-a', { fooBlock: ['0'] });
  let outsideReads = 0;
  outside.getTargeting = outside.getTargetingMap = () => { outsideReads += 1; return []; };
  const fixture = createFixture({ psp: true, slots: [outside] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const elementB = {};
  const ruleContext = { rootElement: { contains: (element) => element === elementB } };
  const result = await observeReadiness(fixture, ruleContext, (elapsed) => {
    if (elapsed === 100) {
      fixture.elements.set('scoped-late-b', elementB);
      fixture.slots.push(slot('scoped-late-b', targetingB));
    }
    if (elapsed === 175) targetingB.fooBlock = ['1'];
  });
  assert.equal(result.elapsedMs, 175);
  assert.equal(result.reason, 'exclusion-match');
  assert.equal(outsideReads, 0);
});

test('late-slot: getSlots devuelve wrappers nuevos del mismo scoped ID sin reset', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('wrappers-b')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  let wrapperCalls = 0;
  fixture.pubads.getSlots = () => { wrapperCalls += 1; return [slot('wrappers-b')]; };
  const ruleContext = { rootElement: createArticleRoot(fixture, 'wrappers-b', 'wrappers-b') };
  const result = await observeReadiness(fixture, ruleContext);
  assert.equal(result.elapsedMs, 100);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
  assert.ok(wrapperCalls > 5);
});

test('late-slot: cambio real del scoped slot set reinicia ausencia y reclasifica own key parcial', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('set-b-1', { fooBlock: ['0'] })] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'], barBlock: ['1'] } } };
  const ruleContext = { rootElement: { contains: (element) => element?.article === 'B' } };
  fixture.elements.set('set-b-1', { article: 'B' });
  const result = await observeReadiness(fixture, ruleContext, (elapsed) => {
    if (elapsed === 25) {
      fixture.elements.set('set-b-2', { article: 'B' });
      fixture.slots.push(slot('set-b-2'));
    }
  });
  assert.equal(result.elapsedMs, 125);
  assert.equal(keyMaturities(result).barBlock.stabilityPolls, 5);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
  assert.equal(keyMaturities(result).fooBlock.slotCoverage, 'partial');
});

test('late-slot: slot ID cambia con mismo numero de slots y reinicia ausencia', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('same-count-1')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 25) fixture.slots[0] = slot('same-count-2');
  });
  assert.equal(result.elapsedMs, 125);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
});

test('late-slot: slot nuevo vacio convierte own coverage completa en parcial', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('own-stable', { fooBlock: ['0'] })] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 25) fixture.slots.push(slot('unrelated-empty'));
  });
  assert.equal(result.elapsedMs, 125);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
  assert.equal(keyMaturities(result).fooBlock.requiredStabilityPolls, 5);
  assert.equal(keyMaturities(result).fooBlock.slotCoverage, 'partial');
});

test('late-slot: ordenar el mismo slot set no reinicia ausencia', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('ordered-1'), slot('ordered-2')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, () => { fixture.slots.reverse(); });
  assert.equal(result.elapsedMs, 100);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
});

test('late-slot: cambio de sources de ESA key reinicia grace con union igual', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('source-reset')], ueTargeting: { fooBlock: '0' } });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 25) fixture.context.data.customTargeting.fooBlock = '0';
  });
  assert.equal(result.elapsedMs, 125);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
});

test('late-slot: valores por source cambian con igual union y reinician estabilidad', async () => {
  const fixture = createFixture({
    psp: true, slots: [slot('source-values-reset')],
    ueTargeting: { fooBlock: '0' }, dataTargeting: { fooBlock: 'safe' },
  });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 25) {
      fixture.window.ueDataLayer.fooBlock = 'safe';
      fixture.context.data.customTargeting.fooBlock = '0';
    }
  });
  assert.equal(result.elapsedMs, 125);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
});

test('late-slot: cambio de pubadsReady inicial reinicia observaciones elegibles', async () => {
  const fixture = createFixture({ psp: true, slots: [slot('runtime-reset')] });
  fixture.manager.siteConfig = { exclusions: { keyValues: { fooBlock: ['1'] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 25) fixture.realGpt.pubadsReady = false;
    if (elapsed === 50) fixture.realGpt.pubadsReady = true;
  });
  assert.equal(result.elapsedMs, 150);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
});

test('late-slot: inclusion cambiante no resetea ausencia de blocking key', async () => {
  const targeting = { section: ['sports'] };
  const fixture = createFixture({ psp: true, slots: [slot('absence-inclusion-changing', targeting)] });
  fixture.manager.siteConfig = {
    exclusions: { keyValues: { fooBlock: ['1'] } }, inclusions: { keyValues: { section: ['sports'] } },
  };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    targeting.section = elapsed % 50 === 0 ? ['sports'] : [];
  });
  assert.equal(result.elapsedMs, 100);
  assert.equal(keyMaturities(result).fooBlock.stabilityPolls, 5);
});

test('late-slot: disableSlots usa absence grace y targeting propio sin alterar matching', async () => {
  const targeting = {};
  const fixture = createFixture({ psp: true, slots: [slot('disable-late', targeting)], ueTargeting: { fooBlock: '0' } });
  fixture.manager.siteConfig = { exclusions: { disableSlots: { rules: [{ slots: [0], ifKeyValues: { fooBlock: ['1'] } }] } } };
  const result = await observeReadiness(fixture, null, (elapsed) => {
    if (elapsed === 75) targeting.fooBlock = ['1'];
  });
  assert.equal(result.elapsedMs, 100);
  assert.equal(result.blockedEarly, false);
  assert.equal(keyMaturities(result).fooBlock.reason, 'stable-own-slot-targeting');
  assert.equal(fixture.manager.isSlotDisabledByExclusion(0), true);
});

test('late-slot: request boundary permanece cerrado con pubadsReady true y slot ambiguo', async () => {
  const targetingB = {};
  const fixture = createFixture({ psp: true, slots: [slot('boundary-ready-b', targetingB)], ueTargeting: { isPremium: false } });
  const rootB = createArticleRoot(fixture, 'boundary-ready-b', 'boundary-ready-b');
  const calls = { prebid: 0, aps: 0, display: 0, refresh: 0, video: 0, nodes: 0, inclusions: 0 };
  fixture.window.pbjs = { requestBids() { calls.prebid += 1; } };
  fixture.window.apstag = { fetchBids() { calls.aps += 1; } };
  fixture.realGpt.display = () => { calls.display += 1; };
  fixture.pubads.refresh = () => { calls.refresh += 1; };
  fixture.manager.isAllowedByInclusions = () => { calls.inclusions += 1; return true; };
  fixture.manager.buildAndPlayVideo = () => { calls.video += 1; };
  let elapsed = 0;
  const originalWait = fixture.manager.waitForIntextRuleTargetingReady.bind(fixture.manager);
  fixture.manager.waitForIntextRuleTargetingReady = (ruleContext) => originalWait(ruleContext, {
    now: () => elapsed,
    wait: async (delayMs) => {
      elapsed += delayMs;
      assert.equal(fixture.realGpt.pubadsReady, true);
      assert.ok(Object.values(calls).every((count) => count === 0));
      if (elapsed === 75) targetingB.isPremium = ['1'];
    },
  });
  const { result } = await runContinuousArticleFlow(fixture, rootB, {
    onCreatePositions: () => { calls.nodes += 1; throw new Error('nodes before exclusion recheck'); },
  });
  assert.equal(elapsed, 75);
  assert.equal(result.decision, 'excluded');
  assert.ok(Object.values(calls).every((count) => count === 0));
});
