'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'intext-predictive-readiness.audit.test.cjs'),'utf8');
const harness={require,__dirname,URL,URLSearchParams};
vm.runInNewContext(source.slice(0,source.indexOf('\nfor (const file'))+'\nthis.readiness=readiness;',harness);
const flush=async()=>{for(let i=0;i<30;i++) await Promise.resolve();};
test('historical QA C refuses dependencies-only preparation before touching SDK globals',async()=>{
  const {install}=require('./qa/intext-p13a-lifecycle.cjs');
  const creative={preparePlayer:async()=>{},preparationValid:()=>true,requestAds(){}};
  const cleanup=install(creative,{variant:'C',source:'',sdk:()=>assert.fail('must not touch SDK'),record(){},eligible:()=>true});
  await assert.rejects(creative.preparePlayer(),/unavailable in dependencies-only P1.3b/);cleanup();
});
function setup(file,id) {
  const f=harness.readiness(file),s=f.slot(id,'auto',1100),trace=[],calls={ima:0,play:0,displayInit:0,dispose:0};
  f.ready(); f.window.google={ima:{AdEvent:{Type:{}},AdErrorEvent:{Type:{}}}};
  const append=s.wrapper.appendChild;
  s.wrapper.appendChild=el=>{append.call(s.wrapper,el);if(el.tagName==='VIDEO') f.context.setTimeout(()=>trace.push({event:'loadstart',imaInitialized:calls.ima===1}),0);return el;};
  const player={el:()=>s.wrapper,on(){},muted(){return true;},controls(){},userActive(){},error:()=>null,
    ready:fn=>f.context.setTimeout(fn,10),play(){calls.play++;return Promise.resolve();},dispose(){calls.dispose++;}};
  player.ima=options=>{calls.ima++;trace.push({event:'ima-init',options});};
  player.ima.addEventListener=()=>{};player.ima.initializeAdDisplayContainer=()=>{calls.displayInit++;};
  const videojs=()=>{trace.push({event:'videojs-create'});return player;};videojs.getPlugin=()=>()=>{};f.window.videojs=videojs;
  const creative=new f.Creative({node:s.node,container:s.node.videoContainer,config:s.node.config,adTagUrl:'exact-unchanged-tag'});
  return {f,s,creative,calls,trace};
}
test('QA uncaught-error capture preserves full stack and observable state without suppressing SDK errors',()=>{
  const listeners=new Map(),elements=new Map();
  const document={visibilityState:'visible',getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getBoundingClientRect:()=>({top:0,left:0,bottom:0,right:0,width:0,height:0})});return elements.get(id);}};
  const window={addEventListener:(name,fn)=>listeners.set(name,fn)};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'qa/intext-p13-app.js'),'utf8'),{
    document,window,navigator:{},performance:{now:()=>0},getComputedStyle:()=>({display:'block',opacity:'0'}),Date,console,
  });
  const error=new TypeError("Cannot read properties of null (reading 'suppressedTracks')");let suppressed=false;
  listeners.get('error')({message:error.message,error,filename:'videojs-contrib-ads.js',lineno:123,colno:9,preventDefault(){suppressed=true;}});
  const log=window.p13.logs.at(-1);assert.equal(log.event,'qa-window-error');assert.equal(log.stack,error.stack);
  assert.equal(log.line,123);assert.equal(log.snapshot.adsSnapshotPresent,false);assert.equal(suppressed,false);
});
for(const file of ['_gam_kv_.js','IntextManager.js']) {
  for(const id of ['gexp-intext','gexp-intext-2']) for(const standby of [0,7000,20000,45000]) {
    test(file+': P1.3b '+id+' standby '+standby+'ms keeps only dependencies then initializes IMA before queued loadstart',async()=>{
      const {f,s,creative,calls,trace}=setup(file,id);await creative.prepare();f.tick(standby);
      assert.equal(creative.player,null);assert.equal(creative.videoEl,undefined);assert.equal(calls.ima,0);assert.equal(calls.play,0);
      assert.equal(f.creates.filter(tag=>tag==='video'||tag==='source').length,0);
      const render=creative.render().catch(error=>error),duplicate=creative.render();duplicate.catch(()=>{});
      await flush();assert.equal(calls.ima,0);assert.equal(s.wrapper.style.opacity,'0');
      f.move(s,300);await flush();assert.equal(calls.ima,1);assert.equal(calls.play,0);
      assert.deepEqual(trace.map(entry=>entry.event),['videojs-create','ima-init']);
      assert.equal(trace[1].options.adTagUrl,'exact-unchanged-tag');
      assert.equal(creative.videoEl.children[0].type,'video/mp4');assert.match(creative.videoEl.children[0].src,/^data:video\/mp4;base64,/);
      f.tick(0);assert.equal(trace.at(-1).imaInitialized,true);
      f.tick(10);assert.equal(calls.play,1);assert.equal(calls.displayInit,1);
      creative.abort();await render;creative.destroy();assert.equal(calls.dispose,1);assert.equal(f.timers.size,0);
    });
  }
  for(const action of ['destroy','abort','token','hidden','outside']) {
    test(file+': P1.3b '+action+' before queued player readiness cannot play or reopen',async()=>{
      const {f,s,creative,calls}=setup(file,'arbitrary-video');s.anchor.top=300;
      const render=creative.render().catch(error=>error);await flush();assert.equal(calls.ima,1);
      if(action==='destroy') creative.destroy();
      if(action==='abort') creative.abort();
      if(action==='token') s.node._activeRenderToken++;
      if(action==='hidden') f.visibility(true);
      if(action==='outside') f.move(s,-100);
      f.tick(10);await render;assert.equal(calls.play,0);assert.equal(calls.displayInit,0);
      assert.equal(s.wrapper.style.opacity,'0');creative.destroy();assert.equal(f.timers.size,0);
    });
  }
  test(file+': P1.3b synchronous plugin failure rejects without waiting 25s or calling play',async()=>{
    const {f,s,creative,calls}=setup(file,'plugin-failure');s.anchor.top=300;
    const init=creative.initVideoJS;creative.initVideoJS=function(){init.call(this);this.player.ima=()=>{throw new Error('plugin-init-failed');};};
    await assert.rejects(creative.render(),/plugin-init-failed/);assert.equal(calls.play,0);f.tick(0);assert.equal(f.timers.size,0);creative.destroy();
  });
}
