'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {build,reverse,runtimeFor,sha,expected}=require('./qa/intext-p14a-build.cjs');
const root=path.resolve(__dirname,'..'),artifacts=new Map();
const flush=async()=>{for(let i=0;i<40;i++)await Promise.resolve();};
const originalFixture=fs.readFileSync(path.join(__dirname,'intext-ima-preload-first-frame.audit.test.cjs'),'utf8').split('\nfor (const file of')[0];
function artifact(file,arm){const key=file+arm;if(!artifacts.has(key))artifacts.set(key,build(fs.readFileSync(path.join(root,file),'utf8'),arm));return artifacts.get(key);}
function fixture(file,arm){
 const output=artifact(file,arm).output;
 const replacementRequire=name=>name==='node:fs'?{...fs,readFileSync:(fileName,...args)=>path.resolve(fileName)===path.join(root,file)?output:fs.readFileSync(fileName,...args)}:require(name);
 const create=new Function('require','__dirname',originalFixture+'\nreturn fixture;')(replacementRequire,__dirname);
 const f=create(file);f.window.document=f.document;vm.runInContext(runtimeFor(arm),f.context);
 f.scripts=()=>f.assets.filter(e=>e.tagName==='SCRIPT');
 f.script=part=>f.scripts().find(e=>e.src.includes(part));
 f.events=event=>f.window.IntextP14A.export().logs.filter(e=>e.event===event);
 return f;
}
for(const file of Object.keys(expected)){
 test(file+': P14A byte-exact reversal, parity, protected loader and activation',()=>{
  const source=fs.readFileSync(path.join(root,file),'utf8'),e0=artifact(file,'E0'),e1=artifact(file,'E1');
  assert.equal(sha(source),expected[file]);
  for(const a of [e0,e1]){
   assert.equal(reverse(a.output,a.ledger),source);
   const segment=(text,start,end)=>text.slice(text.indexOf(start),text.indexOf(end,text.indexOf(start)));
   for(const [start,end]of [['  static loadDependencyScript(', '  static async loadDependencies('],['  static ensureSharedDependencies(', '  static prewarmDependencies(']]){
    assert.ok(source.includes(start),start);assert.ok(source.includes(end),end);assert.equal(segment(a.output,start,end),segment(source,start,end));
   }
   const activate=text=>{const from=text.indexOf('  async activate()');return text.slice(from,text.indexOf('\n  }',from)+4);};
   assert.equal(activate(a.output).replace(/\n    try \{ window\.IntextP14A\?\.activationWait\(this, "(?:started|ready)"\); \} catch \(e\) \{ \/\* QA observation only \*\/ \}/g,''),activate(source));
   assert.equal(a.manifest.probeSha256,sha(fs.readFileSync(path.join(__dirname,'qa/intext-p13c-integration-probe.cjs'),'utf8')));
   assert.equal(a.manifest.dummy.sha256,'410e77398580e6b470c0f5c2297d32484cbb29b9765133f7703038fc24ed753d');
   assert.throws(()=>reverse(a.output.replace('return window.IntextP14A.run(this);','throw Error("changed");'),a.ledger));
  }
  assert.equal(e0.output.slice(e0.ledger.prefix.length),e1.output.slice(e1.ledger.prefix.length));
 });
 for(const arm of ['E0','E1']){
  const check=(name,fn)=>test(`${file}: P14A ${arm} ${name}`,fn);
  check('exact dependency graph and API barrier, no advertising objects',async()=>{
   const f=fixture(file,arm),p=f.Creative.ensureSharedDependencies();await flush();
   assert.equal(f.scripts().length,arm==='E0'?1:2);assert.ok(f.script('video.min.js'));
   f.assetLoad(f.script('video.min.js'));await flush();assert.ok(f.script('contrib-ads.min.js'));
   assert.equal(f.script('videojs.ima.min.js'),undefined);
   f.assetLoad(f.script('contrib-ads.min.js'));await flush();assert.ok(f.script('ima3.js'));
   assert.equal(f.script('videojs.ima.min.js'),undefined);
   f.assetLoad(f.script('ima3.js'));await flush();assert.ok(f.script('videojs.ima.min.js'));
   f.assetLoad(f.script('videojs.ima.min.js'));await p;await flush();
   assert.equal(f.scripts().length,4);assert.equal(f.timers.size,0);
   assert.ok(f.creates.every(t=>t==='script'||t==='link'));assert.equal(f.window.IntextP14A.export().pendingAttempts.length,0);
   const events=f.window.IntextP14A.export().logs,barrier=events.find(e=>e.event==='barrier_ready');
   for(const resource of ['videojs','contrib','imaSdk'])assert.ok(events.find(e=>e.event==='resource_ready'&&e.resource===resource).sequence<barrier.sequence);
   assert.ok(events.find(e=>e.event==='resource_started'&&e.resource==='imaPlugin').sequence>barrier.sequence);
  });
  check('prewarm begins after pendingAuction and never blocks fetchComplete',async()=>{
   const f=fixture(file,arm),wf=f.fetch('video'),original=f.Creative.prewarmDependencies;
   let called=false;f.Creative.prewarmDependencies=function(...args){assert.equal(wf.pendingAuction.winner,'video');called=true;return original.apply(this,args);};
   await wf.startFetch('fetch-intersection');await flush();assert.equal(called,true);assert.equal(wf.fetchComplete,true);
   assert.equal(wf.pendingAuction.marker,'auction-preserved');assert.equal(f.events('dependencies_ready').length,0);
   assert.ok(f.creates.every(t=>t==='script'||t==='link'));await f.finishAssets();
  });
  check('Display winner has no dependency or player cost',async()=>{
   const f=fixture(file,arm),wf=f.fetch('display');await wf.startFetch('fetch');await flush();
   assert.equal(wf.pendingAuction.winner,'display');assert.equal(f.creates.length,0);assert.equal(f.events('dependencies_started').length,0);
  });
  check('two slots and render share one promise, scripts and styles',async()=>{
   const f=fixture(file,arm),p1=f.Creative.prewarmDependencies({node:{id:'one'}}),shared=f.Creative._dependenciesPromise;
   const p2=f.Creative.prewarmDependencies({node:{id:'two'}}),creative=new f.Creative({node:{},config:{}});
   assert.equal(creative.ensureDependencies(),shared);assert.equal(f.Creative.ensureSharedDependencies(),shared);
   await f.finishAssets();await Promise.all([p1,p2]);
   assert.equal(f.scripts().length,4);assert.equal(f.assets.filter(e=>e.tagName==='LINK').length,3);
   assert.equal(f.events('dependencies_started').length,1);
   await f.Creative.prewarmDependencies({node:{id:'third'}});assert.equal(f.scripts().length,4);
  });
  check('SDK already available is verified without reinserting it',async()=>{
   const f=fixture(file,arm);f.window.google={ima:{}};
   const p=f.Creative.ensureSharedDependencies();await f.finishAssets();await p;
   assert.equal(f.scripts().length,3);assert.equal(f.script('ima3.js'),undefined);
   assert.equal(f.events('resource_started').find(e=>e.resource==='imaSdk').alreadyAvailable,true);
  });
  check('CSS protocol-relative URL is reused, no parallel duplicate stylesheet',async()=>{
   const f=fixture(file,arm),link=f.element('link');link.href='//vjs.zencdn.net/7.20.3/video-js.css';link.rel='stylesheet';f.assets.push(link);
   const p=f.Creative.ensureSharedDependencies();await f.finishAssets();await p;
   assert.equal(f.assets.filter(e=>e.tagName==='LINK').length,3);assert.equal(f.assets.filter(e=>e.href?.includes('video-js.css')).length,1);
  });
  check('foreign SDK script still loading, normalized URL, bounded shared ownership',async()=>{
   const f=fixture(file,arm),script=f.element('script');script.src='//imasdk.googleapis.com/js/sdkloader/ima3.js';f.assets.push(script);
   let done=false;const p=f.Creative.ensureSharedDependencies().then(()=>{done=true;});
   await flush();f.assetLoad(f.script('video.min.js'));await flush();f.assetLoad(f.script('contrib-ads.min.js'));await flush();
   assert.equal(done,false);assert.equal(f.scripts().filter(e=>e.src.includes('ima3.js')).length,1);
   assert.equal(script.__intextDependencyStatus,'loading');assert.ok(script.__intextDependencyPromise);
   f.assetLoad(script);await f.finishAssets();await p;assert.equal(f.timers.size,0);
  });
  check('load with missing API rejects and real retry replaces broken script',async()=>{
   const f=fixture(file,arm),first=f.Creative.ensureSharedDependencies(),rejected=assert.rejects(first,/unavailable/);
   const broken=f.script('video.min.js');broken.emit('load');await rejected;await flush();
   assert.equal(f.Creative._dependenciesPromise,null);
   const retry=f.Creative.ensureSharedDependencies();assert.notEqual(f.script('video.min.js'),broken);
   await f.finishAssets();await retry;await flush();assert.equal(f.scripts().length,4);assert.equal(f.timers.size,0);
   assert.equal(f.window.IntextP14A.export().pendingAttempts.length,0);
  });
  check('script failure keeps fetch and its winner, render can retry',async()=>{
   const f=fixture(file,arm),wf=f.fetch('video');await wf.startFetch('fetch');await flush();
   f.script('video.min.js').emit('error');await flush();
   assert.equal(wf.fetchComplete,true);assert.equal(wf.pendingAuction.winner,'video');
   assert.ok(f.logs.some(e=>e.metric==='video_dependency_prewarm_failed'));assert.equal(f.Creative._dependenciesPromise,null);
   const retry=new f.Creative({node:{},config:{}}).ensureDependencies();await f.finishAssets();await retry;await flush();
   assert.equal(f.scripts().length,4);assert.equal(f.timers.size,0);assert.equal(f.events('dependencies_ready').length,1);
  });
  check('unchanged 10s timeout rejects, no orphan or delayed plugin, retry works',async()=>{
   const f=fixture(file,arm),p=f.Creative.ensureSharedDependencies(),rejected=assert.rejects(p,/timeout/);
   assert.equal(f.Creative.DEPENDENCY_SCRIPT_TIMEOUT_MS,10000);f.tick(9999);await flush();assert.equal(f.events('dependencies_failed').length,0);
   f.tick(1);await rejected;await flush();assert.equal(f.Creative._dependenciesPromise,null);assert.equal(f.timers.size,0);
   assert.equal(f.script('videojs.ima.min.js'),undefined);assert.equal(f.window.IntextP14A.export().pendingAttempts.length,0);
   const retry=f.Creative.ensureSharedDependencies();await f.finishAssets();await retry;assert.equal(f.scripts().length,4);
  });
  check('stale token while dependencies load never constructs or activates player',async()=>{
   const f=fixture(file,arm),node={id:'slot-two',_activeRenderToken:1,isActiveRenderToken(token){return token===this._activeRenderToken;}};
   const creative=new f.Creative({node,config:{}});creative.createPlayerForActivation=()=>assert.fail('stale activation');
   const rejected=assert.rejects(creative.activate(),/stale_render_token/);node._activeRenderToken=2;
   await f.finishAssets();await rejected;assert.ok(f.creates.every(t=>t==='script'||t==='link'));assert.equal(f.timers.size,0);
  });
  check('destroy during prepare settles without activation or leftover dependency timers',async()=>{
   const f=fixture(file,arm),creative=new f.Creative({node:{isActiveRenderToken:()=>true},config:{}});
   creative.createPlayerForActivation=()=>assert.fail('destroyed activation');
   const rejected=assert.rejects(creative.activate(),/stale_render_token/);creative.destroy();
   await f.finishAssets();await rejected;assert.equal(f.timers.size,0);assert.equal(creative.player,null);
  });
  check('residual dependency wait is measured, no fabricated CPU or blocked timing',async()=>{
   const f=fixture(file,arm),node={id:'second-slot',_activeRenderToken:4,_intextTelemetryCycleId:'cycle',isActiveRenderToken:()=>true};
   const creative=new f.Creative({node,config:{}}),p=creative.prepare();f.tick(137);await f.finishAssets();await p;
   const ready=f.events('video_dependencies_ready')[0];assert.equal(ready.dependenciesWaitMs,137);assert.equal(ready.slotId,node.id);
   assert.equal(ready.cycleId,'cycle');assert.equal(ready.renderToken,4);assert.equal(creative.player,null);
   assert.equal(f.events('resource_ready')[0].timing,null);
   const warm=new f.Creative({node,config:{}});await warm.prepare();assert.equal(f.events('video_dependencies_ready').at(-1).dependenciesWaitMs,0);
  });
  check('render residual is separate from standby prepare and excludes viewport wait',async()=>{
   const f=fixture(file,arm),node={id:'any-slot',_activeRenderToken:7,isActiveRenderToken:()=>true},calls=[];
   const creative=new f.Creative({node,config:{}});
   creative.createPlayerForActivation=()=>{assert.equal(f.Creative.dependenciesAvailable(),true);calls.push('create');};
   creative.observeActivationEligibility=()=>{};creative.requestAds=()=>{calls.push('request');return Promise.resolve('activated');};
   const rendered=creative.render();assert.equal(creative.render(),rendered);f.tick(123);await f.finishAssets();assert.equal(await rendered,'activated');
   assert.equal(f.events('activation_dependencies_ready')[0].residualDependenciesWaitMs,123);assert.deepEqual(calls,['create','request']);
   const warm=new f.Creative({node,config:{}});await warm.prepare();let enter;
   node.getReadinessViewportState=()=>({eligible:true,reason:'visible'});node.waitForViewport=()=>new Promise(resolve=>{enter=resolve;});
   warm.createPlayerForActivation=()=>calls.push('warm-create');warm.observeActivationEligibility=()=>{};warm.requestAds=()=>Promise.resolve();
   const warmRendered=warm.render();await flush();assert.equal(f.events('activation_dependencies_ready').at(-1).residualDependenciesWaitMs,0);
   f.tick(2000);assert.ok(!calls.includes('warm-create'));enter('visible');await warmRendered;assert.ok(calls.includes('warm-create'));
   assert.equal(f.events('activation_dependencies_ready').at(-1).residualDependenciesWaitMs,0);assert.equal(f.timers.size,0);
  });
  check('existing first-frame, reveal, timeout and cleanup behavior remains intact',async()=>{
   const f=fixture(file,arm),r=f.playback();assert.ok([...f.timers.values()].some(t=>t.delay===25000));
   r.started();r.media.emit('playing');assert.equal(r.opens,0);
   r.frame();await r.result;assert.equal(r.opens,1);r.media.currentTime=.1;r.media.emit('timeupdate');assert.equal(r.opens,1);
   for(const key of ['timeout','prerollTimeout','postrollTimeout'])assert.equal(r.player.ima.options[key],30000);
   assert.equal(r.player.playCalls,1);
   assert.equal(f.events('core:first-frame').length,1);assert.equal(f.events('core:revealed').length,1);r.creative.destroy();
   assert.equal(r.creative._firstFrameWaitTimers.length,0);assert.equal(r.frameCallback(),null);
   assert.ok([...f.timers.values()].every(t=>t.delay!==10000&&t.delay!==25000));
  });
 }
 test(file+': P14A E1 SDK completes first; plugin still waits for contrib',async()=>{
  const f=fixture(file,'E1'),p=f.Creative.ensureSharedDependencies();f.assetLoad(f.script('ima3.js'));await flush();
  assert.equal(f.script('videojs.ima.min.js'),undefined);f.assetLoad(f.script('video.min.js'));await flush();
  assert.equal(f.script('videojs.ima.min.js'),undefined);f.assetLoad(f.script('contrib-ads.min.js'));await f.finishAssets();await p;
 });
 test(file+': P14A E1 fail-fast branch drains while retry safely adopts in-flight sibling',async()=>{
  const f=fixture(file,'E1'),p=f.Creative.ensureSharedDependencies(),rejected=assert.rejects(p,/load_failed/);
  const oldVideo=f.script('video.min.js');f.script('ima3.js').emit('error');await rejected;await flush();
  assert.equal(f.script('contrib-ads.min.js'),undefined);assert.equal(f.events('dependencies_ready').length,0);
  assert.equal(f.window.IntextP14A.export().pendingAttempts.length,1);
  const retry=f.Creative.ensureSharedDependencies();assert.equal(f.script('video.min.js'),oldVideo);
  f.assetLoad(oldVideo);await flush();assert.equal(f.scripts().filter(e=>e.src.includes('contrib-ads.min.js')).length,1);
  await f.finishAssets();await retry;await flush();assert.equal(f.scripts().length,4);
  assert.equal(f.events('dependencies_ready').length,1);assert.equal(f.window.IntextP14A.export().pendingAttempts.length,0);assert.equal(f.timers.size,0);
  assert.ok(!f.events('resource_started').some(e=>e.attemptId===1&&e.resource==='contrib'));
 });
 test(file+': P14A E1 plugin failure after barrier rejects and real retry loads it once',async()=>{
  const f=fixture(file,'E1'),p=f.Creative.ensureSharedDependencies(),rejected=assert.rejects(p,/load_failed/);
  f.assetLoad(f.script('ima3.js'));f.assetLoad(f.script('video.min.js'));await flush();f.assetLoad(f.script('contrib-ads.min.js'));await flush();
  const broken=f.script('videojs.ima.min.js');broken.emit('error');await rejected;await flush();
  const retry=f.Creative.ensureSharedDependencies();await flush();const replacement=f.script('videojs.ima.min.js');assert.notEqual(replacement,broken);
  f.assetLoad(replacement);await retry;await flush();assert.equal(f.scripts().length,4);assert.equal(f.events('dependencies_ready').length,1);
 });
 test(file+': P14A E1 barrier rechecks APIs, absence cannot start plugin',async()=>{
  const f=fixture(file,'E1'),p=f.Creative.ensureSharedDependencies(),rejected=assert.rejects(p,/unavailable_at_barrier/);
  f.assetLoad(f.script('ima3.js'));await flush();f.assetLoad(f.script('video.min.js'));await flush();
  f.assetLoad(f.script('contrib-ads.min.js'));delete f.window.google.ima;await rejected;await flush();
  assert.equal(f.script('videojs.ima.min.js'),undefined);assert.equal(f.Creative._dependenciesPromise,null);assert.equal(f.timers.size,0);
 });
 test(file+': P14A E1 independent distribution classes also share document load',async()=>{
  const f=fixture(file,'E1'),from=f.source.indexOf('class IntextVideoCreative');
  vm.runInContext('this.Other = '+f.source.slice(from,f.source.indexOf('class WPromise',from)),f.context);
  const p=f.Creative.ensureSharedDependencies(),other=f.context.Other.ensureSharedDependencies();
  await f.finishAssets();await Promise.all([p,other]);assert.equal(f.scripts().length,4);assert.equal(f.events('dependencies_started').length,1);
  assert.equal(f.events('dependencies_shared').length,1);
 });
 test(file+': P14A immutable assignment through second distribution, refresh and SPA/PNC',async()=>{
  const f=fixture(file,'E0'),first=f.window.IntextP14A;f.document.baseURI='https://example.test/next';
  vm.runInContext(runtimeFor('E1'),f.context);assert.equal(f.window.IntextP14A,first);assert.equal(first.arm,'E0');
  assert.equal(f.events('assignment_conflict').length,1);
  assert.throws(()=>vm.runInContext('"use strict";window.IntextP14A.arm="E1";',f.context));
  assert.throws(()=>vm.runInContext('Object.defineProperty(window,"IntextP14A",{value:{}});',f.context));
  for(let cycle=0;cycle<2;cycle++){const p=f.Creative.ensureSharedDependencies();await f.finishAssets();await p;}
  assert.equal(f.scripts().length,4);assert.equal(first.arm,'E0');
 });
}
test('P14A builder refuses unknown commercial input and arm',()=>{
 assert.throws(()=>build('not the protected source','E0'),/hash/);assert.throws(()=>runtimeFor('C'),/Invalid/);
});
