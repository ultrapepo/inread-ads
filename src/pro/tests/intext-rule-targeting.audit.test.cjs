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

async function runContinuousArticleFlow(fixture, rootElement, { createNode = false, managerExclusions = true } = {}) {
  const { manager, context } = fixture;
  manager.baseSiteConfig = {
    infiniteScroll: {},
    ...(managerExclusions
      ? { exclusions: { keyValues: { isPremium: ['1', 'true'] } } }
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
    manager.createIntextPositionsScoped = () => ({ result: 'created', found: 1, created: 1 });
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
  assert.equal(result.elapsedMs, 25);
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
  const rootB = { contains: (element) => element === elementB };
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
  const fixture = createFixture({ psp: true, pubadsReady: true });
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
  const fixture = createFixture({ psp: true, pubadsReady: true });
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
  const fixture = createFixture({ psp: true, pubadsReady: true });
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
  const rootB = { contains: (element) => element === elementB };
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
  assert.equal(result.elapsedMs, 125);
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
