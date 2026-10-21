'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const probeApi=require('./qa/intext-p13c-probe.cjs'),{budget,errorInfo}=probeApi;
const {instrument}=require('./qa/intext-p13c-build.cjs');
const {normalize,summarize,harRequests}=require('./qa/intext-p13c-timelines.cjs');
const vm=require('node:vm');
// Real, unmodified manager constructor from each distribution; only browser/SDK
// services are simulated. No manager.device property or prototype substitutions.
function browserProbe(file='_gam_kv_.js',options={}) {
  let now=0,next=0,current=null;const timers=new Map(),logs=[];
  function emitter() {
    const listeners=new Map();return {listeners,
      addEventListener(event,fn){if(this.failEvent===event)throw Error('listener failed');const set=listeners.get(event)??new Set();set.add(fn);listeners.set(event,set);},
      removeEventListener(event,fn){listeners.get(event)?.delete(fn);if(!listeners.get(event)?.size)listeners.delete(event);},
      on(event,fn){this.addEventListener(event,fn);},off(event,fn){this.removeEventListener(event,fn);},
      emit(event,value={}){for(const fn of [...listeners.get(event)??[]])fn(value);}};
  }
  const document={cookie:'',readyState:'loading',visibilityState:'visible',querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){}};
  const window={document,location:{hostname:'www.marca.com',href:'https://www.marca.com/test',pathname:'/test',origin:'https://www.marca.com'},
    ueDataLayer:options.dl,utag_data:options.utag,
    google:{ima:{AdEvent:{Type:Object.fromEntries(['LOADED','STARTED','IMPRESSION','PAUSED','RESUMED','COMPLETE','SKIPPED','ALL_ADS_COMPLETED'].map(key=>[key,key.toLowerCase()]))},AdErrorEvent:{Type:{AD_ERROR:'ima-error'}}}}};
  const context=vm.createContext({window,document,console,URL,URLSearchParams,performance:{now:()=>now},
    setTimeout(fn,ms){const id=++next;timers.set(id,{fn,at:now+ms});return id;},clearTimeout:id=>timers.delete(id),
    ensureBaseStyles(){},logIntext(){},warnIntext(){},warnIntextAlways(){},errorIntext(){},intextDebugCollector:{attachManager(){}}});
  const source=fs.readFileSync(path.join(__dirname,'..',file),'utf8');
  vm.runInContext(source.slice(source.indexOf('class IntextManager {'),source.indexOf('class IntextPlacementEngine'))+';this.Manager=IntextManager;',context);
  const gexp={};if(options.gexp!==undefined)gexp.isMobileDevice=()=>options.gexp;
  const manager=new context.Manager({},gexp);
  assert.ok(manager instanceof context.Manager);assert.equal('device' in manager,false);
  const node={id:options.slot??'gexp-intext',manager,scopedContext:options.scoped,_activeRenderToken:1,
    isActiveRenderToken(token){return token===this._activeRenderToken;}};
  const originalDestroy=function(){if(options.destroyThrows)throw Error('destroy error');};
  const creative={node,_renderToken:1,destroy:originalDestroy,_settle(){throw Error('unexpected cancellation');}};
  const player=Object.assign(emitter(),{ads:{state:'content-set',isInAdMode:()=>false},ima:{getAdsManager:()=>current},play(){return options.playResult;},pause(){},src(){return 'source';}});
  vm.runInContext(fs.readFileSync(path.join(__dirname,'qa/intext-p13c-probe.cjs'),'utf8'),context);
  const api=window.IntextP13C,controller=api.attach(creative,{enabled:true,console:false,mode:'shadow',mobile:true,totalMs:10000,...options.config,record:entry=>logs.push(entry)});
  controller.attachPlayer(player,{beforeIma:true});
  return {window,context,manager,node,creative,player,controller,api,logs,timers,emitter,originalDestroy,
    bind(value){current=value;player.emit('ads-manager',{adsManager:value});},
    setCurrent(value){current=value;},
    tick(ms){now+=ms;for(const [id,timer]of [...timers])if(timer.at<=now){timers.delete(id);timer.fn();}},
    dispose(){api.dispose();}};
}
function clock(config={}) {
  let now=0,id=0,valid=true,allowed=true;const timers=new Map(),logs=[],cancelled=[];
  const b=budget({config,now:()=>now,setTimer:(fn,ms)=>{const key=++id;timers.set(key,{fn,at:now+ms});return key;},clearTimer:key=>timers.delete(key),
    live:()=>valid,canCancel:()=>allowed,record:(event,data)=>logs.push({event,...data}),cancel:reason=>cancelled.push(reason)});
  return {b,logs,cancelled,timers,setLive:value=>valid=value,setAllowed:value=>allowed=value,tick(ms,drift=0){const target=now+ms;now=target+drift;
    for(const [key,timer]of[...timers])if(timer.at<=target){timers.delete(key);timer.fn();}},get now(){return now;}};
}
const enforcement={mode:'enforce',mobile:true,qaConfirmed:true,totalMs:10000};
test('observe is default and never installs deadline timers',()=>{const f=clock({mobile:true,totalMs:10000});f.b.note('ads-request');assert.equal(f.timers.size,0);});
for(const totalMs of [10000,12000])test('explicit QA mobile deadline '+totalMs+' cancels once at boundary',()=>{
  const f=clock({...enforcement,totalMs});f.b.note('ads-request');f.tick(totalMs-1);assert.equal(f.cancelled.length,0);f.tick(1);f.tick(25000);
  assert.deepEqual(f.cancelled,['request-to-frame']);assert.equal(f.timers.size,0);
});
for(const config of [{mode:'shadow',mobile:true,qaConfirmed:true,totalMs:10000},{...enforcement,mobile:false},{...enforcement,qaConfirmed:false}])test('non-enforcing/unconfirmed/desktop policy never cancels '+JSON.stringify(config),()=>{
  const f=clock(config);f.b.note('ads-request');f.tick(15000);assert.equal(f.cancelled.length,0);
});
test('shadow preserves a valid frame after expiry for opportunity-loss measurement',()=>{const f=clock({mode:'shadow',mobile:true,totalMs:10000});f.b.note('ads-request');f.tick(11000);f.b.note('first-frame');assert.equal(f.cancelled.length,0);assert.equal(f.b.state().frame,true);});
test('manager watchdog is separate, optional and not rearmed by duplicate events',()=>{
  const f=clock({...enforcement,managerMs:3000});f.b.note('ads-request');f.tick(1000);f.b.note('ads-manager');f.tick(2999);f.b.note('ads-manager');assert.equal(f.cancelled.length,0);f.tick(1);assert.deepEqual(f.cancelled,['manager-to-preroll']);
});
test('readyforpreroll cancels only manager watchdog; total request deadline remains',()=>{
  const f=clock({...enforcement,managerMs:1000});f.b.note('ads-request');f.b.note('ads-manager');f.b.note('readyforpreroll');assert.equal(f.timers.size,1);f.tick(10000);assert.equal(f.cancelled.length,1);
});
for(const event of ['adstart','native-STARTED','native-IMPRESSION'])test(event+' blocks cancellation even if no frame yet',()=>{
  const f=clock(enforcement);f.b.note('ads-request');f.b.note(event);f.tick(10000);assert.equal(f.cancelled.length,0);assert.ok(f.logs.some(log=>log.event==='qa_budget_cancel_blocked'));
});
test('unproven ownership blocks enforcement',()=>{const f=clock(enforcement);f.setAllowed(false);f.b.note('ads-request');f.tick(10000);assert.equal(f.cancelled.length,0);});
for(const event of ['first-frame','error','complete','skipped','destroy','abort'])test(event+' clears all diagnostic timers',()=>{
  const f=clock({...enforcement,managerMs:2000});f.b.note('ads-request');f.b.note('ads-manager');f.b.note(event);assert.equal(f.timers.size,0);f.tick(30000);assert.equal(f.cancelled.length,0);
});
test('stale token cannot cancel, and cannot resurrect by becoming live later',()=>{const f=clock(enforcement);f.b.note('ads-request');f.setLive(false);f.tick(10000);f.setLive(true);f.b.note('ads-manager');assert.equal(f.timers.size,0);assert.equal(f.cancelled.length,0);});
test('passed anchor opt-in and started guards preserve safe cancellation',()=>{
  const f=clock({...enforcement,cancelPassed:true});f.b.checkPassed(false);assert.equal(f.cancelled.length,0);f.b.checkPassed(true);assert.deepEqual(f.cancelled,['anchor-passed']);
  const active=clock({...enforcement,cancelPassed:true});active.b.note('native-STARTED');active.b.checkPassed(true);assert.equal(active.cancelled.length,0);
});
test('late callback records event-loop drift without treating it as network latency',()=>{const f=clock(enforcement);f.b.note('ads-request');f.tick(10000,900);const expired=f.logs.find(log=>log.event==='qa_budget_expired');assert.equal(expired.timerDriftMs,900);assert.equal(expired.clockSource,'plugin-ads-request-proxy-NOT-HTTP');});
test('invalid policy is rejected without inventing defaults',()=>{assert.throws(()=>clock({mode:'other'}),/Unknown/);assert.throws(()=>clock({totalMs:-1}),/Invalid/);});
test('IMA error payload preserves SDK type, inner error and stack including 1005',()=>{
  const inner=new Error('network detail'),error=Object.assign(new Error('request failed'),{getErrorCode:()=>1005,getType:()=> 'adLoadError',getInnerError:()=>inner,getVastErrorCode:()=>900});
  const result=errorInfo(error);assert.equal(result.code,1005);assert.equal(result.type,'adLoadError');assert.equal(result.inner.stack,inner.stack);assert.equal(result.stack,error.stack);
});
test('optional error getters may throw without disrupting diagnosis',()=>{assert.equal(errorInfo({getErrorCode(){throw Error();}}).code,null);});
test('QA cannot break playback if the plugin error-listener API requires a manager first',()=>{
  const previous=global.google;global.google={ima:{AdErrorEvent:{Type:{AD_ERROR:'error'}},AdEvent:{Type:{IMPRESSION:'impression'}}}};
  try{const logs=[],creative={node:{id:'A',isActiveRenderToken:()=>true},_renderToken:1,destroy(){}};
    const player={on(){},off(){},ima:{addEventListener(){throw Error('manager not ready');}}};
    const p=probeApi.attach(creative,{enabled:true,console:false,record:entry=>logs.push(entry)});p.attachPlayer(player,{beforeIma:true});
    assert.doesNotThrow(()=>p.afterIma());assert.ok(logs.some(entry=>entry.event==='qa_plugin_error_listener_unavailable'));p.dispose();
  }finally{global.google=previous;}
});
test('QA API wrappers preserve this, original return identity and never subscribe to play rejection',()=>{
  let calls=0,subscriptions=0;const result={then(){subscriptions++;}},creative={node:{id:'B',isActiveRenderToken:()=>true},_renderToken:1,destroy(){}};
  const player={on(){},off(){},play(){assert.equal(this,player);calls++;return result;}};
  const p=probeApi.attach(creative,{enabled:true,console:false});p.attachPlayer(player,{beforeIma:true});
  assert.equal(player.play(),result);assert.equal(calls,1);assert.equal(subscriptions,0);p.dispose();
});
for(const device of [false,undefined])test('QA denies mobile budgets with desktop/unknown GEXP signal '+device,()=>{
  const callbacks=new Map(),creative={node:{id:'guard',manager:{gexp:{isMobileDevice:()=>device}},isActiveRenderToken:()=>true},_renderToken:1,destroy(){}};
  const player={on:(event,fn)=>callbacks.set(event,fn),off:event=>callbacks.delete(event)};
  const p=probeApi.attach(creative,{enabled:true,...enforcement,console:false});p.attachPlayer(player,{beforeIma:true});
  callbacks.get('ads-request')();assert.equal(p.state().pendingTimers,0);p.dispose();
});
for(const file of ['_gam_kv_.js','IntextManager.js'])test(file+': QA builder keeps all original commercial calls and preserves production input',()=>{
  const before=fs.readFileSync(path.join(__dirname,'..',file),'utf8'),probe=fs.readFileSync(path.join(__dirname,'qa/intext-p13c-probe.cjs'),'utf8');
  const output=instrument(before,probe,{enabled:true,mode:'shadow'});
  assert.equal(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),before);
  assert.ok(output.includes('NOT FOR PRODUCTION'));new Function(output);
  for(const marker of ['this.player.ima(options);','const playPromise = this.player.play();','pb.setTargetingForGPTAsync([configuration.code]);'])assert.equal(output.split(marker).length,before.split(marker).length);
  assert.ok(output.includes('before-set'));assert.ok(output.includes('after-set'));assert.ok(output.includes('markFallback(this.node,renderToken)'));
});
test('builder rejects incompatible source instead of silently patching a different lifecycle',()=>assert.throws(()=>instrument('class IntextVideoCreative {}',''),/marker/));
test('timeline retains case-sensitive JSON keys, separates tokens and never invents absent milestones',()=>{
  const input={logs:[{timestamp:1,message:'[IntextMetrics] video_ads_manager_loaded',args:[{slotId:'A',cycleId:1,renderToken:1,playerSize:1,playersize:2}]},{timestamp:5,message:'[IntextMetrics] display_wrapper_opened',args:[{slotId:'A',cycleId:2,renderToken:2}]}]};
  assert.equal(normalize(input)[0].data.playersize,2);const result=summarize(input);assert.equal(result.cycles.length,2);assert.equal(result.cycles[0].timeline.frame,null);assert.equal(result.cycles[0].requestToFrameMs,null);
});
test('HAR blocked remains separate from wait and absent XML body stays unknown',()=>{
  const result=harRequests({log:{entries:[{startedDateTime:'2026-10-19T10:00:00Z',request:{url:'https://pubads.g.doubleclick.net/gampad/ads'},response:{status:200,content:{}},time:4209,timings:{blocked:4073,wait:92}}]}})[0];
  assert.equal(result.blockedMs,4073);assert.equal(result.waitMs,92);assert.equal(result.bodyAvailable,false);
});
for(const file of ['_gam_kv_.js','IntextManager.js']) {
  for(const [label,options,effective,source]of [
    ['DataLayer mobile',{dl:{device_category:'mobile'}},'mobile','ueDataLayer.device_category'],
    ['site version mobile',{dl:{be_page_site_version:'mobile'}},'mobile','ueDataLayer.be_page_site_version'],
    ['utag mobile',{utag:{device_category:'mobile'}},'mobile','utag_data.device_category'],
    ['scoped mobile',{scoped:{targeting:{device_category:'mobile'}},dl:{device_category:'desktop'}},'mobile','scopedContext.targeting.device_category'],
    ['scoped GPT value',{scoped:{targeting:{device_category:['mobile']}}},'mobile','scopedContext.targeting.device_category'],
    ['GEXP mobile',{gexp:true},'mobile','gexp.isMobileDevice'],
    ['GEXP desktop',{gexp:false},'desktop','gexp.isMobileDevice'],
    ['desktop',{dl:{device_category:'desktop'}},'desktop','ueDataLayer.device_category'],
    ['unknown',{},'unknown','missing'],
    ['conflicting classification',{dl:{device_category:'desktop',be_page_site_version:'mobile'}},'unknown','ueDataLayer.conflict'],
  ])test(file+': real manager without device property / '+label,()=>{
    const f=browserProbe(file,options);try{
      assert.equal(f.controller.state().deviceEffective,effective);assert.equal(f.controller.state().deviceSource,source);
      f.player.emit('ads-request');assert.equal(f.timers.size,effective==='mobile'?1:0);
      f.tick(10000);
      const expired=f.logs.find(log=>log.event==='qa_budget_expired');
      assert.equal(!!expired,effective==='mobile');
      if(expired){assert.equal(expired.mode,'shadow');assert.equal(expired.qaConfirmed,false);assert.equal(expired.deadlineAt,10000);assert.equal(expired.expiration,10000);assert.equal(expired.cancelBlockedReason,'mode-shadow');}
      assert.equal(f.creative._aborted,undefined);
    }finally{f.dispose();}
  });
  for(const scenario of ['absent','listener-failed','enum-missing','getter-mismatch','replaced'])test(file+': fail-closed impression coverage / '+scenario,()=>{
    const f=browserProbe(file,{gexp:true,config:{...enforcement,totalMs:1000}});
    try{
      const manager=f.emitter();if(scenario==='listener-failed')manager.failEvent='impression';
      if(scenario==='enum-missing')delete f.window.google.ima.AdEvent.Type.IMPRESSION;
      if(scenario!=='absent')f.bind(manager);
      if(scenario==='getter-mismatch')f.setCurrent(f.emitter());
      if(scenario==='replaced')f.bind(f.emitter());
      f.player.emit('ads-request');f.tick(1000);
      const blocked=f.logs.find(log=>log.event==='qa_budget_expired');
      assert.equal(f.creative._aborted,undefined);assert.ok(blocked.cancelBlockedReason);assert.ok(Object.values(blocked.cancelConditions).some(value=>value===false));
      if(['absent','listener-failed','enum-missing'].includes(scenario))assert.equal(f.controller.state().impressionSubscribed,false);
    }finally{f.dispose();}
  });
  test(file+': successful actual registration and manager identity are distinct from enum availability',()=>{
    const f=browserProbe(file,{gexp:true});try{
      const before=f.logs.find(log=>log.event==='player-created');assert.equal(before.impressionTypeAvailable,true);assert.equal(before.impressionSubscribed,false);assert.equal(before.managerId,null);
      const manager=f.emitter();f.bind(manager);assert.equal(f.controller.state().impressionSubscribed,true);
      assert.equal(manager.listeners.get('impression').size,1);manager.emit('impression');assert.equal(f.controller.state().impression,true);
    }finally{f.dispose();}
  });
  test(file+': replacement retires old listeners/wrappers and rejects late STARTED/IMPRESSION/error',()=>{
    const f=browserProbe(file,{gexp:true});try{
      const first=Object.assign(f.emitter(),{init(){},start(){},pause(){},resume(){}}),original=first.resume;
      f.bind(first);const late=Object.fromEntries(['started','impression','ima-error'].map(type=>[type,[...first.listeners.get(type)][0]]));
      const second=f.emitter();f.bind(second);assert.equal(first.listeners.size,0);assert.equal(first.resume,original);
      f.player.emit('ads-request');for(const type of Object.keys(late))late[type]({getError:()=>Error('old manager')});
      assert.equal(f.controller.state().started,false);assert.equal(f.controller.state().impression,false);assert.equal(f.controller.state().pendingTimers,1);
      assert.equal(f.logs.some(log=>['native-STARTED','native-IMPRESSION','ima-error'].includes(log.event)),false);
      second.emit('impression');assert.equal(f.controller.state().impression,true);
    }finally{f.dispose();}
  });
  test(file+': getter replacement without ads-manager event cannot admit callbacks from previous owner',()=>{
    const f=browserProbe(file,{gexp:true});try{
      const manager=f.emitter();f.bind(manager);f.setCurrent(f.emitter());manager.emit('impression');manager.emit('started');
      assert.equal(f.controller.state().impression,false);assert.equal(f.controller.state().started,false);
    }finally{f.dispose();}
  });
  test(file+': manager replacement also retires plugin/loader errors already queued',()=>{
    const f=browserProbe(file,{gexp:true});try{
      const plugin=f.emitter();f.player.ima.addEventListener=plugin.addEventListener.bind(plugin);f.player.ima.removeEventListener=plugin.removeEventListener.bind(plugin);
      f.bind(f.emitter());
      f.controller.afterIma();const latePlugin=[...plugin.listeners.get('ima-error')][0];
      const loader=f.emitter();f.player.emit('ads-loader',{adsLoader:loader});const lateLoader=[...loader.listeners.get('ima-error')][0];
      f.bind(f.emitter());assert.equal(loader.listeners.size,0);assert.equal(plugin.listeners.size,0);
      f.player.emit('ads-request');lateLoader({getError:()=>Error('old loader')});latePlugin({getError:()=>Error('old plugin binding')});
      assert.equal(f.controller.state().pendingTimers,1);assert.equal(f.logs.some(log=>['ima-loader-error','ima-plugin-error'].includes(log.event)),false);
    }finally{f.dispose();}
  });
  for(const options of [{},{gexp:false},{dl:{device_category:'desktop',be_page_site_version:'mobile'}}])test(file+': actual manager unknown/desktop never arms even with enforce config '+JSON.stringify(options),()=>{
    const f=browserProbe(file,{...options,config:enforcement});try{
      f.bind(f.emitter());f.player.emit('ads-request');assert.equal(f.timers.size,0);f.tick(10000);assert.equal(f.creative._aborted,undefined);
      const notArmed=f.logs.find(log=>log.event==='qa_budget_not_armed');assert.equal(notArmed.cancelBlockedReason,'mobile-budget-inactive');
    }finally{f.dispose();}
  });
  test(file+': synchronous API errors propagate unchanged and cleanup restores originals',()=>{
    const f=browserProbe(file,{gexp:true});try{
      const error=new Error('native call failed');let calls=0;
      const manager=Object.assign(f.emitter(),{init(){assert.equal(this,manager);calls++;throw error;}}),original=manager.init;
      f.bind(manager);assert.throws(()=>manager.init(),value=>value===error);assert.equal(calls,1);
      f.player.emit('dispose');assert.equal(manager.init,original);assert.equal(manager.listeners.size,0);assert.equal(f.player.listeners.size,0);
    }finally{f.dispose();}
  });
  test(file+': stale token and disposal suppress queued player microtasks and manager attachment',async()=>{
    const f=browserProbe(file,{gexp:true});try{
      f.player.emit('play');f.player.emit('adsready');f.node._activeRenderToken++;
      f.bind(f.emitter());await Promise.resolve();await Promise.resolve();
      assert.equal(f.controller.state().managerId,null);assert.equal(f.logs.some(log=>log.event.endsWith('-after-dispatch')),false);
    }finally{f.dispose();}
  });
  test(file+': FSM absent remains safe; state and dispatch/microtask observations remain separate',async()=>{
    const f=browserProbe(file,{gexp:true});try{
      for(const type of ['loadstart','play','adsready','readyforpreroll'])f.player.emit(type);
      await Promise.resolve();await Promise.resolve();
      for(const type of ['loadstart','play','adsready','readyforpreroll']){
        const during=f.logs.find(log=>log.event===type),after=f.logs.find(log=>log.event===type+'-after-dispatch');
        assert.equal(during.snapshot.adsState,'content-set');assert.equal(during.snapshot.adsFsmState,null);assert.equal(during.snapshot.isInAdMode,false);
        assert.equal(during.observationPhase,'listener');assert.equal(after.observationPhase,'microtask');
      }
      f.player.ads._state={name:'PrerollState'};f.player.emit('adsready');assert.equal(f.logs.filter(log=>log.event==='adsready').at(-1).snapshot.adsFsmState,'PrerollState');
    }finally{f.dispose();}
  });
  for(const destroyThrows of [false,true])test(file+': destroy restores exact player and manager methods / throws '+destroyThrows,()=>{
    const f=browserProbe(file,{gexp:true,destroyThrows});
    const manager=Object.assign(f.emitter(),{init(){},start(){},pause(){},resume(){}}),managerOriginals=Object.fromEntries(['init','start','pause','resume'].map(key=>[key,Object.getOwnPropertyDescriptor(manager,key)]));
    // Player wrappers already installed: dispose and use a second creative to capture exact originals.
    f.controller.dispose();
    const original=Object.fromEntries(['play','pause','src'].map(key=>[key,Object.getOwnPropertyDescriptor(f.player,key)]));
    const p=f.api.attach({...f.creative}, {enabled:true,console:false});p.attachPlayer(f.player,{beforeIma:true});f.bind(manager);
    for(const key of Object.keys(managerOriginals))assert.notEqual(manager[key],managerOriginals[key].value);
    const target=[...f.api.entries].find(log=>log.event==='qa_probe_attached');assert.ok(target);
    // The real destroy wrapper is exercised separately below; dispose remains idempotent.
    p.dispose();p.dispose();
    for(const key of Object.keys(original))assert.deepEqual(Object.getOwnPropertyDescriptor(f.player,key),original[key]);
    for(const key of Object.keys(managerOriginals))assert.deepEqual(Object.getOwnPropertyDescriptor(manager,key),managerOriginals[key]);
    assert.equal(manager.listeners.size,0);f.dispose();
    const fresh=browserProbe(file,{gexp:true,destroyThrows});const oldPlay=fresh.player.play;
    if(destroyThrows)assert.throws(()=>fresh.creative.destroy(),/destroy error/);else fresh.creative.destroy();
    assert.equal(fresh.creative.destroy,fresh.originalDestroy);assert.notEqual(fresh.player.play,oldPlay);assert.equal(fresh.timers.size,0);assert.equal(fresh.player.listeners.size,0);fresh.dispose();
  });
}

test('shadow budget emits complete policy/authorization and drift without cancelling after expiry',()=>{
  const f=clock({mode:'shadow',mobile:true,totalMs:10000,deviceEffective:'mobile',deviceSource:'ueDataLayer.device_category'});
  f.b.note('ads-request');const armed=f.logs.find(log=>log.event==='qa_budget_armed');assert.equal(armed.budgetArmed,true);assert.equal(armed.deadlineAt,10000);
  f.tick(10000,321);const expired=f.logs.find(log=>log.event==='qa_budget_expired');
  assert.equal(expired.deviceEffective,'mobile');assert.equal(expired.deviceSource,'ueDataLayer.device_category');assert.equal(expired.expiration,10321);assert.equal(expired.timerDriftMs,321);assert.equal(expired.cancelBlockedReason,'mode-shadow');assert.equal(f.cancelled.length,0);
});
for(const file of ['_gam_kv_.js','IntextManager.js'])for(const allowed of [true,false])test(file+': real core settlement/cleanup preserves fallback authorization '+allowed,async()=>{
  const text=fs.readFileSync(path.join(__dirname,'intext-ima-preload-first-frame.audit.test.cjs'),'utf8'),context={require,__dirname,URL,URLSearchParams};
  vm.runInNewContext(text.slice(0,text.indexOf("for (const file of"))+'\nthis.fixture=fixture;',context);
  const f=context.fixture(file),r=f.playback();r.creative.abort();await r.result;
  f.context.performance={now:()=>f.context.Date.now()};f.window.document=f.document;
  f.window.google.ima.AdEvent.Type.IMPRESSION='impression';
  vm.runInContext(fs.readFileSync(path.join(__dirname,'qa/intext-p13c-probe.cjs'),'utf8'),f.context);
  const probe=f.window.IntextP13C,creative=new f.Creative({node:r.node,container:r.container,config:{},adTagUrl:'test-vast'});
  r.node.manager={gexp:{isMobileDevice:()=>true}};creative.player=r.player;r.player.ads={isInAdMode:()=>false};let disposals=0;r.player.dispose=()=>{disposals++;};
  // This legacy core fixture exposes only `on`. Model Video.js's `off` with a
  // removable forwarding listener, rather than inventing an active subscription.
  const originalOn=r.player.on,subscriptions=new Map();
  r.player.on=(event,handler)=>{const handlers=subscriptions.get(event)??new Set();handlers.add(handler);subscriptions.set(event,handlers);
    originalOn(event,(...args)=>{if(handlers.has(handler))handler(...args);});};
  r.player.off=(event,handler)=>subscriptions.get(event)?.delete(handler);
  const manager=f.element();r.player.ima.getAdsManager=()=>manager;
  const observer=probe.attach(creative,{enabled:true,mode:'enforce',mobile:true,qaConfirmed:true,managerMs:1000,console:false});observer.attachPlayer(r.player,{beforeIma:true});
  const result=creative.requestAds().catch(error=>error);r.adsManagerLoaded();
  const begin=f.source.indexOf('  async requestWinner('),end=f.source.indexOf('  async _requestFormat(',begin);
  vm.runInContext('this.Winner=class {'+f.source.slice(begin,end)+'};',f.context);
  let displayRequests=0,closed=0;Object.assign(r.node,{closeAll(){closed++;},beginVisualRender(){return ++this._activeRenderToken;},startIntextTelemetryCycle(){},ensureSingleVisibleIntextSurface(){}});
  const wf=Object.assign(new f.context.Winner(),{node:r.node,lastTrigger:'QA',_requestFormat:async format=>{
    if(format==='video'){await result;return false;}displayRequests++;return true;
  }});
  const finish=wf.requestWinner('video','display',allowed);f.tick(1000);await finish;
  assert.match(String(await result),/p13c_qa_manager-to-preroll/);assert.equal(disposals,1);assert.equal(creative._aborted,true);
  assert.equal(displayRequests,allowed?1:0);assert.equal(closed,allowed?0:1);assert.equal(f.timers.size,0);
  r.started();r.frame();assert.equal(r.opens,0);assert.equal(disposals,1);probe.dispose();
});
