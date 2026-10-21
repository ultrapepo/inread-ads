'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {attach}=require('./qa/intext-p13c-manual-break.cjs'),{build}=require('./qa/intext-p13c-manual-build.cjs');
function emitter(){const listeners=new Map();return {listeners,addEventListener(event,fn){if(this.fail===event)throw Error('registration failed');const set=listeners.get(event)??new Set();set.add(fn);listeners.set(event,set);},
 removeEventListener(event,fn){listeners.get(event)?.delete(fn);if(!listeners.get(event)?.size)listeners.delete(event);},on(event,fn){this.addEventListener(event,fn);},off(event,fn){this.removeEventListener(event,fn);},
 emit(event,data={}){for(const fn of [...listeners.get(event)??[]])fn(data);}};}
function fixture(){let current=null,callback=null,calls=0;const logs=[],environment=Object.assign(emitter(),{document:Object.assign(emitter(),{visibilityState:'visible'}),google:{ima:{AdEvent:{Type:{AD_BREAK_READY:'ready',STARTED:'started',IMPRESSION:'impression'}}}}});
 const node={_activeRenderToken:1,eligible:true,isActiveRenderToken(token){return token===this._activeRenderToken;},getReadinessViewportState(){return {eligible:this.eligible};}};
 const player=Object.assign(emitter(),{ads:{isInAdMode:()=>true,isWaitingForAdBreak:()=>true,inAdBreak:()=>false,isContentResuming:()=>false},
  ima:{getAdsManager:()=>current,setAdBreakReadyListener:fn=>{callback=fn;},playAdBreak(){calls++;}}});
 const destroy=function(){},creative={node,player,_renderToken:1,destroy,_p13cProbe:{record:(event,data)=>logs.push({event,...data})}};
 const controller=attach(creative,environment);
 return {node,player,environment,creative,controller,logs,destroy,get calls(){return calls;},bind(value=emitter()){current=value;player.emit('ads-manager',{adsManager:value});return value;},
  pluginReady(){callback();},preroll(){player.emit('readyforpreroll');},ready(manager){callback();manager.emit('ready');player.emit('readyforpreroll');}};
}
test('manual experiment never substitutes readyforpreroll for real AD_BREAK_READY',()=>{const f=fixture();f.bind();f.pluginReady();f.preroll();f.environment.emit('scroll');assert.equal(f.calls,0);f.controller.dispose();});
test('native and plugin readiness both required, with public waiting state even while isInAdMode=true',()=>{const f=fixture(),m=f.bind();f.preroll();m.emit('ready');assert.equal(f.calls,0);f.pluginReady();assert.equal(f.calls,1);f.controller.dispose();});
test('preroll is independently required',()=>{const f=fixture(),m=f.bind();f.pluginReady();m.emit('ready');assert.equal(f.calls,0);f.preroll();assert.equal(f.calls,1);f.controller.dispose();});
test('outside viewport retains ready break; reentry makes exactly one API call',()=>{const f=fixture(),m=f.bind();f.node.eligible=false;f.ready(m);assert.equal(f.calls,0);f.node.eligible=true;f.environment.emit('scroll');f.environment.emit('scroll');f.ready(m);assert.equal(f.calls,1);f.controller.dispose();});
test('hidden document blocks start until visible',()=>{const f=fixture(),m=f.bind();f.environment.document.visibilityState='hidden';f.ready(m);assert.equal(f.calls,0);f.environment.document.visibilityState='visible';f.environment.document.emit('visibilitychange');assert.equal(f.calls,1);f.controller.dispose();});
for(const flag of ['_aborted','_destroyed','token'])test(flag+' prevents late manual API execution',()=>{const f=fixture(),m=f.bind();if(flag==='token')f.node._activeRenderToken++;else f.creative[flag]=true;f.ready(m);assert.equal(f.calls,0);f.controller.dispose();});
for(const event of ['started','impression'])test('unexpected '+event+' blocks any subsequent manual start',()=>{const f=fixture(),m=f.bind();m.emit(event);f.ready(m);assert.equal(f.calls,0);f.controller.dispose();});
test('manager replacement is ambiguous; old queued native callback cannot authorize start',()=>{const f=fixture(),old=f.bind(),late=[...old.listeners.get('ready')][0];const fresh=f.bind();f.pluginReady();late();f.preroll();fresh.emit('ready');assert.equal(f.calls,0);assert.equal(f.controller.state().ambiguous,true);f.controller.dispose();});
test('failed IMPRESSION subscription blocks manual start',()=>{const f=fixture(),m=emitter();m.fail='impression';f.bind(m);f.ready(m);assert.equal(f.calls,0);f.controller.dispose();});
test('public API throw is recorded and never retried',()=>{const f=fixture(),m=f.bind();let calls=0;f.player.ima.playAdBreak=()=>{calls++;throw Error('SDK failed');};f.ready(m);f.environment.emit('scroll');assert.equal(calls,1);assert.ok(f.logs.some(e=>e.event==='qa_manual_api_failed'));f.controller.dispose();});
test('undefined API return never confirms playback',()=>{const f=fixture(),m=f.bind();f.ready(m);assert.equal(f.calls,1);assert.equal(f.controller.state().started,false);assert.equal(f.logs.find(e=>e.event==='qa_manual_api_returned').playbackConfirmed,false);f.controller.dispose();});
test('terminal/destroy retires listeners and restores creative destructor',()=>{const f=fixture(),m=f.bind(),late=[...m.listeners.get('ready')][0];f.creative.destroy();f.pluginReady();late();f.preroll();assert.equal(f.calls,0);assert.equal(f.creative.destroy,f.destroy);assert.equal(m.listeners.size,0);assert.equal(f.environment.listeners.size,0);assert.equal(f.environment.document.listeners.size,0);});
for(const event of ['adtimeout','adserror'])test(event+' prevents late readiness from calling playAdBreak',()=>{const f=fixture(),m=f.bind();f.player.emit(event);f.ready(m);assert.equal(f.calls,0);assert.equal(m.listeners.size,0);});
for(const file of ['_gam_kv_.js','IntextManager.js'])test(file+': separate QA builder preserves all calls/timeouts and only chooses manual policy',()=>{
 const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,file),'utf8'),probe=fs.readFileSync(path.join(__dirname,'qa/intext-p13c-probe.cjs'),'utf8'),manual=fs.readFileSync(path.join(__dirname,'qa/intext-p13c-manual-break.cjs'),'utf8');
 const output=build(source,probe,manual);new Function(output);assert.equal(fs.readFileSync(path.join(root,file),'utf8'),source);
 for(const marker of ['this.player.ima(options);','const playPromise = this.player.play();','timeout: 30000','prerollTimeout: 30000','postrollTimeout: 30000','}, 25000)'])assert.equal(output.split(marker).length,source.split(marker).length);
 assert.ok(output.includes('autoPlayAdBreaks: false'));assert.ok(output.includes('compatibility UNVERIFIED'));
 assert.ok(output.includes('this._manualBreakLab?.dispose()'));
 assert.equal(output.includes('AdsManager.prototype'),false);assert.equal(output.includes('AdsLoader.prototype'),false);
});
