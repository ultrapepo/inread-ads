'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const {instrument}=require('./qa/intext-p13c-integration-build.cjs'),{expected,build}=require('./qa/intext-p13c-dummy-source-build.cjs');
const {parseHar,inspectHar,normalizeLogs}=require('./qa/intext-p13c-integration-analysis.cjs');
const probeSource=fs.readFileSync(path.join(__dirname,'qa/intext-p13c-integration-probe.cjs'),'utf8');
class Events{constructor(){this.handlers=new Map();}on(type,fn){const set=this.handlers.get(type)??new Set();set.add(fn);this.handlers.set(type,set);}off(type,fn){this.handlers.get(type)?.delete(fn);}emit(type,data={}){for(const fn of [...this.handlers.get(type)??[]])fn(data);}addEventListener(t,f){this.on(t,f);}removeEventListener(t,f){this.off(t,f);}count(){return [...this.handlers.values()].reduce((n,s)=>n+s.size,0);}}
function environment(){const document=new Events(),windowEvents=new Events(),microtasks=[],observers=[];document.visibilityState='visible';document.baseURI='https://page.invalid/article';
 const dom=()=>Object.assign(new Events(),{currentTime:0,paused:true,ended:false,readyState:4,networkState:1,videoWidth:64,videoHeight:64,currentSrc:'data:video/mp4;base64,AAAA',error:null,
  getAttribute(){return this.currentSrc;},closest(){return null;},isConnected:true,getBoundingClientRect(){return {top:100,bottom:460,left:0,right:640,width:640,height:360};}});
 const base=dom(),ad=dom();ad.currentSrc='https://example.invalid/ad.mp4';ad.closest=()=>({});const videos=[base,ad],surface=dom();surface.querySelectorAll=()=>videos;
 const player=Object.assign(new Events(),{el:()=>surface,currentSrc:()=>base.currentSrc,ads:{snapshot:{currentSrc:base.currentSrc,currentTime:0,ended:false},isInAdMode:()=>true,inAdBreak:()=>true},ima:{getAdsManager:()=>null},
  play(){throw Error('Probe must not play');},pause(){throw Error('Probe must not pause');},src(){throw Error('Probe must not change source');}});
 const node={id:'gexp-intext-2',_intextTelemetryCycleId:3,_activeRenderToken:7,videoContainer:{getElement:()=>surface},container:{getElement:()=>surface},
  getReadinessViewportState:()=>({eligible:true,intersectionRatio:1}),getIntextTelemetryElement:()=>surface};
 const creative={node,_renderToken:7,player,videoEl:base,_adMediaEl:ad};
 const Type=Object.fromEntries(['LOADED','STARTED','IMPRESSION','COMPLETE','ALL_ADS_COMPLETED','CONTENT_PAUSE_REQUESTED','CONTENT_RESUME_REQUESTED','PAUSED','RESUMED','SKIPPED'].map(t=>[t,t]));
 const context={document,URL,performance:{now:()=>10},google:{ima:{AdEvent:{Type},AdErrorEvent:{Type:{AD_ERROR:'AD_ERROR'}}}},
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
test('integration QA old creative closing cannot delete the newer owner of the same node',()=>{const e=environment(),a=e.creative,b={...a,player:Object.assign(new Events(),{el:e.player.el,ads:{}}),_renderToken:8};
 e.api.attach(a);e.node._activeRenderToken=8;e.api.attach(b);const bPlayer=e.api.export().logs.at(-1).snapshot.playerId;
 e.api.close(a,'old-cycle');assert.equal(e.api.export().activeObservers,1);e.api.node(e.node,'video-ended-entry');
 const last=e.api.export().logs.at(-1);assert.equal(last.event,'node:video-ended-entry');assert.equal(last.renderToken,8);assert.equal(last.snapshot.playerId,bPlayer);
 b.player.emit('contentresumed');assert.equal(e.api.export().logs.at(-1).snapshot.playerId,bPlayer);e.api.stop();assert.equal(b.player.count(),0);});
test('integration QA source export strips credentials/query/hash while retaining local identity',()=>{const e=environment();
 e.ad.currentSrc='https://user:private-password@media.invalid/ad.mp4?token=secret-query#secret-hash';e.api.attach(e.creative);
 const first=e.api.export().logs.at(-1).snapshot.media[1].currentSrc;assert.equal(first.hostname,'media.invalid');assert.equal(first.pathname,'/ad.mp4');assert.equal(first.value,undefined);
 e.ad.emit('playing');assert.equal(e.api.export().logs.at(-1).snapshot.media[1].currentSrc.sourceId,first.sourceId);
 e.ad.currentSrc='https://media.invalid/ad.mp4?token=another-query';e.ad.emit('pause');const second=e.api.export().logs.at(-1).snapshot.media[1].currentSrc;
 assert.notEqual(second.sourceId,first.sourceId);assert.equal(second.pathname,first.pathname);
 const json=JSON.stringify(e.api.export());for(const secret of ['private-password','secret-query','secret-hash','another-query','user:'])assert(!json.includes(secret));e.api.stop();});
test('integration QA sanitizes snapshot/player sources, blob ids and token-like paths',()=>{const e=environment();e.base.currentSrc='blob:https://page.invalid/private-blob-uuid';
 e.ad.currentSrc='https://media.invalid/token/private-path-token/asset.mp4?private=1';e.player.ads.snapshot.currentSrc='https://media.invalid/abcdefghijklmnopqrstuvwxyz1234567890/movie.mp4#private-fragment';
 e.api.attach(e.creative);const snap=e.api.export().logs.at(-1).snapshot;
 assert.equal(snap.playerSource.kind,'blob');assert.equal(snap.playerSource.value,undefined);assert.equal(snap.media[0].currentSrc.sourceId,snap.playerSource.sourceId);
 assert.equal(snap.media[1].currentSrc.pathname,'/token/[redacted]/asset.mp4');assert.equal(snap.adState.snapshotCurrentSrc.pathname,'/[redacted]/movie.mp4');
 const json=JSON.stringify(e.api.export());for(const secret of ['private-blob-uuid','private-path-token','abcdefghijklmnopqrstuvwxyz1234567890','private-fragment'])assert(!json.includes(secret));e.api.stop();});
test('integration QA distinct Data URLs keep distinct ids without exposing payload',()=>{const e=environment();e.api.attach(e.creative);const first=e.api.export().logs.at(-1).snapshot.media[0].currentSrc;
 e.base.currentSrc='data:video/mp4;base64,BBBB';e.base.emit('loadedmetadata');const second=e.api.export().logs.at(-1).snapshot.media[0].currentSrc;
 assert.equal(first.kind,'data');assert.equal(first.length,second.length);assert.notEqual(first.sourceId,second.sourceId);assert(!JSON.stringify(e.api.export()).includes('base64,AAAA'));e.api.stop();});
test('integration QA missing AdsManager and unsubscribed enums remain missing coverage',()=>{const e=environment();e.api.attach(e.creative);e.player.emit('ads-manager');e.api.stop();
 const logs=e.api.export().logs,coverage=logs.filter(l=>l.event==='observer:coverage').at(-1).coverage;
 assert.equal(coverage.adsManagerEvents,1);assert.equal(coverage.currentManagerId,null);assert.equal(coverage.nativeManagers.length,0);
 assert(logs.some(l=>l.event==='manager:coverage-missing'));assert(!logs.some(l=>l.event==='ima:COMPLETE'));});
test('integration QA records effective subscriptions and native events, not enum availability alone',()=>{const e=environment(),m=e.manager();e.api.attach(e.creative);e.player.emit('ads-manager',{adsManager:m});
 for(const name of ['COMPLETE','CONTENT_RESUME_REQUESTED','IMPRESSION'])m.emit(name);e.api.stop();
 const coverage=e.api.export().logs.filter(l=>l.event==='observer:coverage').at(-1).coverage;
 for(const name of ['COMPLETE','CONTENT_RESUME_REQUESTED','IMPRESSION']){const status=coverage.nativeManagers[0].events[name];assert.equal(status.subscriptionEstablished,true);assert.equal(status.observed,1);assert.equal(status.subscribed,false);}
 assert.equal(coverage.adsManagerEventObserved,true);assert.equal(m.count(),0);});
test('integration QA unsubscribing failure is diagnosed even when activeObservers is zero',()=>{const e=environment(),m=e.manager();e.api.attach(e.creative);e.player.emit('ads-manager',{adsManager:m});
 m.removeEventListener=()=>{throw Error('SDK refused unsubscribe');};e.api.stop();assert.equal(e.api.export().activeObservers,0);
 const last=e.api.export().logs.at(-1);assert(last.cleanupFailures>0);assert.equal(last.sdkDestructionVerified,false);
 const length=e.api.export().logs.length;m.emit('COMPLETE');assert.equal(e.api.export().logs.length,length);});
function actualMethod(output,name){const begin=output.indexOf('class IntextVideoCreative {'),at=output.indexOf('\n  '+name+'(',begin);
 const end=name==='destroy'?output.indexOf('\n  // One small page-local ledger.',at):output.indexOf('\n  ',output.indexOf('\n  }',at)+4);
 assert(at>begin&&end>at);return output.slice(at,end).trim();}
test('integration QA real createPlayerForActivation installs observer before synchronous IMA events',()=>{const e=environment(),source=fs.readFileSync(path.join(__dirname,'../_gam_kv_.js'),'utf8');
 const {output}=instrument(source,probeSource),method=actualMethod(output,'createPlayerForActivation');e.context.window=e.context;
 const fn=vm.runInNewContext('({'+method+'})',e.context).createPlayerForActivation;e.creative.preparationValid=()=>true;e.creative.createVideoElement=()=>{};
 e.creative.initVideoJS=()=>{};e.creative.attachPlayerEvents=()=>{};e.creative.container=e.node.videoContainer;e.player.el().querySelector=()=>null;e.player.el().style={};
 fn.call(e.creative);const attached=e.api.export().logs.find(l=>l.event==='observer:attached');assert.equal(attached.installationStage,'after-videojs-before-ima');
 assert(e.player.handlers.get('ads-manager').size>0);const manager=e.manager();e.player.emit('ads-manager',{adsManager:manager});manager.emit('COMPLETE');manager.emit('CONTENT_RESUME_REQUESTED');manager.emit('IMPRESSION');
 for(const name of ['COMPLETE','CONTENT_RESUME_REQUESTED','IMPRESSION'])assert(e.api.export().logs.some(l=>l.event==='ima:'+name));e.api.stop();});
for(const scenario of ['throws-before-dispose','throws-after-dispose','normal','early-return'])test('integration QA real destroy finally preserves original outcome and cleans observer: '+scenario,()=>{
 const e=environment(),source=fs.readFileSync(path.join(__dirname,'../_gam_kv_.js'),'utf8'),{output}=instrument(source,probeSource),method=actualMethod(output,'destroy');
 e.context.window=e.context;const fn=vm.runInNewContext('({'+method+'})',e.context).destroy,error=new Error('original destroy failure');let disposals=0;
 e.creative.cleanupAdMediaObservation=()=>{};e.player.dispose=()=>{disposals++;e.player.emit('dispose');};e.base.remove=()=>{};
 if(scenario==='throws-before-dispose')e.creative._eligibilityCleanup=()=>{throw error;};
 if(scenario==='throws-after-dispose')e.base.remove=()=>{throw error;};if(scenario==='early-return')e.creative._destroyed=true;
 e.api.attach(e.creative);if(scenario.startsWith('throws'))assert.throws(()=>fn.call(e.creative),err=>err===error);else assert.equal(fn.call(e.creative),undefined);
 e.flush();const logs=e.api.export().logs,exit=logs.find(l=>l.event==='core:destroy-exit'),last=logs.at(-1);
 assert.equal(exit.uncaughtException,scenario.startsWith('throws'));assert.equal(last.reason,'creative-destroy-finally');assert.equal(last.sdkDestructionVerified,false);
 assert.equal(disposals,scenario==='normal'||scenario==='throws-after-dispose'?1:0);assert.equal(last.disposeEventObserved,disposals===1);
 assert.equal(e.api.export().activeObservers,0);assert.equal(e.player.count(),0);assert.equal(e.document.count(),0);assert.equal(e.base.count(),0);assert(e.observers.every(o=>o.disconnected));
});
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
