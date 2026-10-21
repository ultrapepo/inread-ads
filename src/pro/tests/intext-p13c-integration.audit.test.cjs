'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const {instrument}=require('./qa/intext-p13c-integration-build.cjs'),{expected,build}=require('./qa/intext-p13c-dummy-source-build.cjs');
const {parseHar,inspectHar,normalizeLogs}=require('./qa/intext-p13c-integration-analysis.cjs');
const probeSource=fs.readFileSync(path.join(__dirname,'qa/intext-p13c-integration-probe.cjs'),'utf8');
class Events{constructor(){this.handlers=new Map();}on(type,fn){const set=this.handlers.get(type)??new Set();set.add(fn);this.handlers.set(type,set);}off(type,fn){this.handlers.get(type)?.delete(fn);}emit(type,data={}){for(const fn of [...this.handlers.get(type)??[]])fn(data);}addEventListener(t,f){this.on(t,f);}removeEventListener(t,f){this.off(t,f);}count(){return [...this.handlers.values()].reduce((n,s)=>n+s.size,0);}}
function environment(){const document=new Events(),windowEvents=new Events(),microtasks=[],observers=[];document.visibilityState='visible';
 const dom=()=>Object.assign(new Events(),{currentTime:0,paused:true,ended:false,readyState:4,networkState:1,videoWidth:64,videoHeight:64,currentSrc:'data:video/mp4;base64,AAAA',error:null,
  getAttribute(){return this.currentSrc;},closest(){return null;},isConnected:true,getBoundingClientRect(){return {top:100,bottom:460,left:0,right:640,width:640,height:360};}});
 const base=dom(),ad=dom();ad.currentSrc='https://example.invalid/ad.mp4';ad.closest=()=>({});const videos=[base,ad],surface=dom();surface.querySelectorAll=()=>videos;
 const player=Object.assign(new Events(),{el:()=>surface,currentSrc:()=>base.currentSrc,ads:{snapshot:{currentSrc:base.currentSrc,currentTime:0,ended:false},isInAdMode:()=>true,inAdBreak:()=>true},ima:{getAdsManager:()=>null},
  play(){throw Error('Probe must not play');},pause(){throw Error('Probe must not pause');},src(){throw Error('Probe must not change source');}});
 const node={id:'gexp-intext-2',_intextTelemetryCycleId:3,_activeRenderToken:7,videoContainer:{getElement:()=>surface},container:{getElement:()=>surface},
  getReadinessViewportState:()=>({eligible:true,intersectionRatio:1}),getIntextTelemetryElement:()=>surface};
 const creative={node,_renderToken:7,player,videoEl:base,_adMediaEl:ad};
 const Type=Object.fromEntries(['LOADED','STARTED','IMPRESSION','COMPLETE','ALL_ADS_COMPLETED','CONTENT_PAUSE_REQUESTED','CONTENT_RESUME_REQUESTED','PAUSED','RESUMED','SKIPPED'].map(t=>[t,t]));
 const context={document,performance:{now:()=>10},google:{ima:{AdEvent:{Type},AdErrorEvent:{Type:{AD_ERROR:'AD_ERROR'}}}},
  getComputedStyle:()=>({display:'block',visibility:'visible',opacity:'1'}),queueMicrotask:fn=>microtasks.push(fn),
  addEventListener:(...a)=>windowEvents.on(...a),removeEventListener:(...a)=>windowEvents.off(...a),
  MutationObserver:class{constructor(fn){this.fn=fn;this.disconnected=false;observers.push(this);}observe(){}disconnect(){this.disconnected=true;}},Date};
 vm.runInNewContext(probeSource,context);return {api:context.IntextIntegrationQA,player,creative,node,base,ad,videos,observers,document,windowEvents,context,
  flush(){while(microtasks.length)microtasks.shift()();},manager:()=>new Events()};
}
test('integration QA observes actual identities/sources without wrapping playback APIs',()=>{const e=environment(),play=e.player.play,pause=e.player.pause,src=e.player.src;
 e.api.attach(e.creative);assert.equal(e.player.play,play);assert.equal(e.player.pause,pause);assert.equal(e.player.src,src);e.ad.emit('loadeddata');
 const x=e.api.export(),last=x.logs.at(-1);assert.equal(last.event,'media:loadeddata');assert.equal(last.cycleId,3);assert.equal(last.renderToken,7);
 assert.equal(last.snapshot.media.length,2);assert.equal(last.snapshot.media[0].isBase,true);assert.equal(last.snapshot.media[1].isCoreObservedAd,true);
 assert.equal(last.snapshot.media[0].currentSrc.kind,'data');assert.equal(last.snapshot.media[1].insideImaContainer,true);
 assert.equal(e.creative._playerRevealed,undefined);assert.equal(x.enforce,false);assert.equal(x.wrappers,false);assert.doesNotThrow(()=>JSON.stringify(x));e.api.stop();});
test('integration QA keeps observing base restore/contentended after native COMPLETE',()=>{const e=environment(),m=e.manager();e.api.attach(e.creative);e.player.emit('ads-manager',{adsManager:m});
 m.emit('COMPLETE');e.player.emit('adend');e.base.paused=false;e.base.emit('playing');e.player.emit('contentended');e.flush();
 const events=e.api.export().logs.map(l=>l.event);for(const n of ['ima:COMPLETE','player:adend','media:playing','player:contentended','ima:COMPLETE:microtask'])assert(events.includes(n));
 assert.equal(e.api.export().activeObservers,1);e.player.emit('dispose');assert.equal(e.api.export().activeObservers,0);assert.equal(m.count(),0);});
test('integration QA does not infer first-frame from loadeddata or base content',()=>{const e=environment();e.api.attach(e.creative);e.base.currentTime=.8;e.base.emit('loadeddata');e.ad.emit('loadeddata');
 assert(!e.api.export().logs.some(l=>/^video_first_frame|revealed$/.test(l.event)));assert.equal(e.node._intextPipFirstFrameConfirmed,undefined);e.api.stop();});
test('integration QA tolerates absent FSM and records snapshot disappearance',()=>{const e=environment();e.api.attach(e.creative);e.player.ads.snapshot=null;e.player.emit('contentresumed');e.flush();
 const state=e.api.export().logs.at(-1).snapshot.adState;assert.equal(state.snapshotPresent,false);assert.equal(state.constructor,null);assert.equal(state.inAdMode,true);e.api.stop();});
test('integration QA removes replaced manager listeners and ignores an old late callback',()=>{const e=environment(),a=e.manager(),b=e.manager();e.api.attach(e.creative);e.player.emit('ads-manager',{adsManager:a});
 const stale=[...a.handlers.get('IMPRESSION')][0];e.player.emit('ads-manager',{adsManager:b});assert.equal(a.count(),0);const before=e.api.export().logs.length;stale();assert.equal(e.api.export().logs.length,before);
 b.emit('IMPRESSION');assert.equal(e.api.export().logs.filter(l=>l.event==='ima:IMPRESSION').length,1);e.api.stop();assert.equal(b.count(),0);});
test('integration QA reports missing enums/subscription failure instead of inventing SDK events',()=>{const e=environment(),m=e.manager();delete e.context.google.ima.AdEvent.Type.IMPRESSION;
 const add=m.addEventListener;m.addEventListener=function(t,f){if(t==='STARTED')throw Error('refused');return add.call(this,t,f);};e.api.attach(e.creative);e.player.emit('ads-manager',{adsManager:m});
 const logs=e.api.export().logs;assert(logs.some(l=>l.event==='manager:subscription-missing'&&l.nativeEvent==='IMPRESSION'));
 assert(logs.some(l=>l.event==='manager:subscription-failed'&&l.nativeEvent==='STARTED'));e.api.stop();});
test('integration QA media replacement cleans old listeners; stale tokens are diagnostic only',()=>{const e=environment();e.api.attach(e.creative);const old=e.ad;e.videos.splice(1,1);e.creative._adMediaEl=null;
 e.player.emit('contentloadstart');assert.equal(old.count(),0);e.node._activeRenderToken=8;e.base.emit('ended');assert.equal(e.api.export().logs.at(-1).tokenMatches,false);
 assert.equal(e.node._activeRenderToken,8);assert.equal(e.creative._playerRevealed,undefined);e.api.stop();});
test('integration QA cleanup removes observers/listeners and drops queued callbacks',()=>{const e=environment();e.api.attach(e.creative);e.api.attach(e.creative);assert.equal(e.api.export().activeObservers,1);
 e.player.emit('adsready');e.api.close(e.creative,'destroy');const length=e.api.export().logs.length;e.flush();assert.equal(e.api.export().logs.length,length);
 assert.equal(e.player.count(),0);assert.equal(e.document.count(),0);assert.equal(e.windowEvents.count(),0);assert.equal(e.base.count(),0);assert.equal(e.ad.count(),0);assert(e.observers.every(o=>o.disconnected));});
test('integration QA leaves two slots independent and closes on pagehide',()=>{const e=environment(),second={...e.creative,node:{...e.node,id:'gexp-intext'},player:Object.assign(new Events(),{el:e.player.el,ads:{}})};
 e.api.attach(e.creative);e.api.attach(second);assert.equal(e.api.export().activeObservers,2);e.api.close(e.creative);assert.equal(e.api.export().activeObservers,1);
 e.windowEvents.emit('pagehide');assert.equal(e.api.export().activeObservers,0);});
for(const name of Object.keys(expected))test('integration QA reversible hooks and protected source hash: '+name,()=>{const source=fs.readFileSync(path.join(__dirname,'..',name),'utf8');
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),expected[name]);
 for(const input of [source,build(source).output]){const {output,edits}=instrument(input,probeSource);let rest=output.slice(output.indexOf(probeSource)+probeSource.length+1);
  for(const {addition}of edits)rest=rest.replace(addition,'');assert.equal(rest,input);new vm.Script(output);
  assert(!output.includes('IntextP13C?.attach(this'));}
});
test('integration QA builder refuses ambiguous/missing hooks',()=>{assert.throws(()=>instrument('not a bundle',probeSource),/marker/);});
test('offline integration HAR parser preserves complete entries and labels truncation',()=>{const e={request:{url:'https://example.invalid/gampad/ads?output=vast'},response:{status:200,content:{}},startedDateTime:'2026-10-20T00:00:00Z',time:240,timings:{blocked:5,wait:200}};
 const valid=JSON.stringify({log:{entries:[e]}}),a=parseHar(Buffer.from(valid));assert.equal(a.complete,true);assert.equal(inspectHar(a.har,e.startedDateTime)[0].type,'VAST');
 const b=parseHar(Buffer.from(valid.slice(0,-3)+',{"request":{"url":"unfinished'));assert.equal(b.complete,false);assert.equal(b.har.log.entries.length,1);
 assert.deepEqual(b.har.log.entries[0],e);assert.equal(inspectHar(b.har,e.startedDateTime)[0].bodyPresent,false);});
test('offline integration logs retain slot/token identity and distinguish timeout types',()=>{const rows=normalizeLogs({logs:[{timestamp:100,elapsedMs:10,message:'[IntextMetrics] video_prepare_failed',args:[{metric:'video_prepare_failed',slotId:'slot',renderToken:1,error:'video_dependency_load_timeout'}]}]});
 assert.equal(rows[0].event,'video_prepare_failed');assert.equal(rows[0].data.error,'video_dependency_load_timeout');assert.equal(rows[0].data.renderToken,1);});
