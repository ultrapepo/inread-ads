const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const controls = require('./qa/intext-p13-controls.cjs');
function harness(name,marker,expose) {
  const source = fs.readFileSync(path.join(__dirname,name),'utf8');
  const context = vm.createContext({ require,__dirname,console,Buffer,process,URL,URLSearchParams });
  vm.runInContext(source.slice(0,source.indexOf(marker))+'\n'+expose,context);
  return context;
}
const ima = harness('intext-ima-preload-first-frame.audit.test.cjs',"for (const file of",'this.fixture = fixture;');
const debuggerHarness = harness('intext-debugger.audit.test.cjs',"\ntest(",'this.createHarness = createHarness; this.nodeFixture = nodeFixture;');
for (const file of ['_gam_kv_.js','IntextManager.js']) {
  const check = (name,fn) => test(file+': P1.3 audit '+name,fn);
  check('AdsManager without start, load or terminal cannot reveal and settles exactly at the existing 25s deadline', async () => {
    const f = ima.fixture(file), r = f.playback(); let settled = false;
    r.result.then(() => { settled = true; }); r.adsManagerLoaded(); f.tick(24999); await Promise.resolve();
    assert.equal(settled,false); assert.equal(r.opens,0); assert.equal(r.player.playCalls,1);
    f.tick(1); assert.match(String(await r.result),/video_ad_timeout/);
    assert.equal(r.opens,0); assert.equal(r.player.ima.initializations,1);
    r.creative.destroy();
  });
  check('an explicit 303 terminates promptly without waiting for the advertising deadline', async () => {
    const f = ima.fixture(file), r = f.playback(); r.nativeError(303);
    assert.match(String(await r.result),/video_ad_error.*303/); assert.equal(r.opens,0);
    assert.equal(f.logs.filter(l => l.metric === 'timeout').length,0); r.creative.destroy();
  });
  check('strict first frame remains distinct from AdsManager acquisition and SDK STARTED', async () => {
    const f = ima.fixture(file), r = f.playback(); r.adsManagerLoaded(); r.started();
    assert.equal(r.opens,0); assert.equal(f.logs.filter(l => l.metric === 'first-frame').length,0);
    r.frame(); await r.result; assert.equal(r.opens,1);
    assert.equal(f.logs.filter(l => l.metric === 'first-frame').length,1); r.creative.destroy();
  });
  check('readiness anchor geometry does not overwrite collapsed wrapper DOM intersection or become GAM viewability', () => {
    const h = debuggerHarness.createHarness(true), node = debuggerHarness.nodeFixture();
    const wrapper = node.videoContainer.getElement();
    wrapper.getBoundingClientRect = () => ({top:100,left:0,right:640,bottom:100,width:640,height:0});
    const anchorRect = {top:100,left:0,right:640,bottom:124,width:640,height:24};
    node.getReadinessViewportState = () => ({eligible:true,intersectionRatio:1,distancePx:-700,reason:'visible'});
    const source = fs.readFileSync(path.join(root,file),'utf8');
    const start = source.indexOf('  recordReadiness(metric, data = {}) {'), end = source.indexOf('  setupVideoPreparation(',start);
    const context = vm.createContext({ IntextVideoCreative: { dependencyDiagnostic: (metric,n,data) => h.intextDebugCollector.recordMetric(metric,{node:n,...data}) },
      window:{innerHeight:800},document:{visibilityState:'visible'},Date });
    vm.runInContext('this.Readiness = class { '+source.slice(start,end)+' };',context);
    const waterfall = Object.assign(new context.Readiness(),{node,config:{},getLoadingTargetElement:()=>({getBoundingClientRect:()=>anchorRect})});
    waterfall.recordReadiness('video_activation_eligible');
    const log = h.intextDebugCollector.getLogs().find(l => l.args?.[0]?.metric === 'video_activation_eligible');
    assert.ok(log); const payload = log.args[0];
    assert.equal(payload.readinessIntersectionRatio,1); assert.equal(payload.readinessAnchorRect.height,24);
    assert.equal(payload.wrapperRect.height,0); assert.equal(payload.wrapperIntersectionRatio,0);
    assert.equal(payload.intersectionRatio,0); assert.equal(payload.gptViewabilityAvailable,false);
  });
  check('readiness diagnostics tolerate detached or throwing geometry and retain stage timings', () => {
    const f = ima.fixture(file), source = f.source;
    const start = source.indexOf('  recordReadiness(metric, data = {}) {'), end = source.indexOf('  setupVideoPreparation(',start);
    vm.runInContext('this.Readiness = class { '+source.slice(start,end)+' };',f.context);
    const wf = Object.assign(new f.context.Readiness(),{node:{id:'any-slot',getReadinessViewportState:()=>({eligible:false})},config:{},
      getLoadingTargetElement:()=>({getBoundingClientRect(){throw new Error('detached');}})});
    wf.recordReadiness('video_winner_resolved'); f.tick(1200); wf.recordReadiness('video_prepare_ready');
    const ready = f.logs.find(l => l.metric === 'video_prepare_ready');
    assert.equal(ready.readinessAnchorRect,null); assert.equal(ready.winnerToPreparedMs,1200);
  });
}
test('P1.3 controls require QA confirmation for real tags; original targeting and correlator remain exact', () => {
  const tag = 'https://securepubads.g.doubleclick.net/gampad/ads?iu=%2F1%2Fqa&correlator=99&cust_params=hb_pb%3D1.00%26hb_uuid%3Dcache%26p%3Dintext%26random1%3D5';
  assert.throws(()=>controls.variantTag('B',tag,false),/QA inventory/);
  assert.equal(controls.variantTag('B',tag,true),tag); assert.equal(controls.variantTag('C-with',tag,true),tag);
  const changed = new URL(controls.variantTag('C-without',tag,true));
  const cust = new URLSearchParams(changed.searchParams.get('cust_params'));
  assert.equal(cust.has('hb_pb'),false); assert.equal(cust.has('hb_uuid'),false);
  assert.equal(cust.get('p'),'intext'); assert.equal(cust.get('random1'),'5'); assert.equal(changed.searchParams.get('correlator'),'99');
  assert.equal(new URL(controls.variantTag('A')).searchParams.get('iu'),'/21775744923/external/single_ad_samples');
});
test('P1.3 offline HAR captures response/wrapper timings without fetching ads or leaking query strings', () => {
  const har = {log:{entries:[{startedDateTime:'2026-10-13T00:00:00Z',time:200,request:{url:'https://qa.test/vast?secret=x'},
    response:{status:200,content:{text:'<VAST><Ad><Wrapper><VASTAdTagURI><![CDATA[https://wrapper.test/ad?id=private]]></VASTAdTagURI></Wrapper></Ad></VAST>'}},timings:{wait:100}},
    {time:900,request:{url:'https://wrapper.test/ad?id=private'},response:{status:403,content:{text:'<VAST></VAST>'}}}]}};
  const timeline = controls.harTimeline(har);
  assert.equal(timeline[0].durationMs,200); assert.equal(timeline[0].wrapperResources[0],'https://wrapper.test/ad');
  assert.equal(timeline[1].status,403); assert.equal(timeline[1].emptyVastObserved,true);
  assert.equal(JSON.stringify(timeline).includes('secret=x'),false); assert.equal(JSON.stringify(timeline).includes('id=private'),false);
});
test('P1.3 offline HAR does not infer no-fill when response bodies were not captured', () => {
  const timeline = controls.harTimeline({log:{entries:[{request:{url:'https://qa.test/vast'},response:{status:200,content:{}}}]}});
  assert.equal(timeline[0].responseBodyAvailable,false); assert.equal(timeline[0].emptyVastObserved,false);
  assert.equal(timeline[0].durationMs,null); assert.throws(()=>controls.harTimeline({}),/HAR/);
});
