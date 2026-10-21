'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {createHarness,validation,validControl,assessCandidateTiming}=require('./qa/intext-p13c-dummy.js'),{createHandler}=require('./qa/intext-p13c-dummy-lab.cjs');
function fixture(config={}){
  const nodes=[],registry=new Map(),timers=new Set(),calls=[],revoked=[];let clockOffset=0;
  const later=(fn,ms)=>{const id=setTimeout(()=>{timers.delete(id);fn();},ms);timers.add(id);return id;};
  const cancel=id=>{clearTimeout(id);timers.delete(id);};
  class Media extends EventTarget{
    constructor(){super();Object.assign(this,{currentTime:0,duration:NaN,readyState:0,networkState:0,paused:true,ended:false,playbackRate:1,videoWidth:0,videoHeight:0,error:null,currentSrc:'',isConnected:false,attributes:{},playCount:0});nodes.push(this);}
    setAttribute(key,value){this.attributes[key]=value;}getAttribute(key){return this.attributes[key]??null;}removeAttribute(key){delete this.attributes[key];if(key==='src'){this.currentSrc='';this._src='';}}
    set src(value){calls.push('src');this._src=value;this.attributes.src=value;this.currentSrc=value;}get src(){return this._src;}
    emit(type){this.dispatchEvent(new Event(type));}
    set currentTime(value){const seek=value===0&&(this._time>0||this.ended);this._time=value;
      if(seek){this.seeking=true;this.readyState=1;this.emit('seeking');if(!config.seekTimeout)later(()=>{this.seeking=false;this.ended=config.stickyEndedAfterSeek===true;this.readyState=4;this.emit('seeked');},config.seekDelay??1);}}
    get currentTime(){return this._time;}
    load(){calls.push('load');this.emit('loadstart');if(!this.src){this.emit('emptied');return;}
      if(config.metadataTimeout)return;
      queueMicrotask(()=>{if(config.mediaError){this.error={code:4,message:'mock decoder error'};this.emit('error');return;}
        Object.assign(this,{duration:1,readyState:4,networkState:1,videoWidth:444,videoHeight:250});this.emit('loadedmetadata');});}
    play(){calls.push('play');this.playCount++;this.paused=false;this.ended=false;this.emit('play');
      if(config.playReject)return Promise.reject(Object.assign(Error('mock not allowed'),{name:'NotAllowedError'}));
      if(config.pendingPlay)return new Promise((resolve,reject)=>{this.rejectPending=reject;});
      if(config.immediateEnded){this.currentTime=1;this.paused=true;this.ended=true;}
      queueMicrotask(()=>this.emit('playing'));later(()=>{
        if(config.temporalPlayback){for(const time of [0.3,0.6]){clockOffset+=300;this.currentTime=time;this.emit('timeupdate');}clockOffset+=400;}
        this.currentTime=1;this.paused=true;this.ended=true;this.emit('ended');},2);return Promise.resolve();}
    pause(){calls.push('pause');this.paused=true;this.emit('pause');if(this.rejectPending&&!config.uninterruptible){this.rejectPending(Object.assign(Error('pause interrupted pending play'),{name:'AbortError'}));this.rejectPending=null;}}
    remove(){this.isConnected=false;}
  }
  const document=new EventTarget();Object.assign(document,{visibilityState:'visible',baseURI:'http://127.0.0.1:8134/',createElement:()=>new Media(),
    getElementById:()=>({appendChild:media=>{media.isConnected=true;}})});
  function videojs(media){calls.push('videojs');const id=media.id;let disposed=false,ready=false;
    const events=new EventTarget();
    const player={id:()=>id,ready:fn=>later(()=>{ready=true;calls.push('ready');fn();},config.readyDelay??1),el:()=>({querySelector:()=>media}),
      on:(event,handler)=>events.addEventListener(event,handler),off:(event,handler)=>events.removeEventListener(event,handler),
      src:source=>{assert.equal(ready,true,'No source before Video.js ready');media.src=source.src;},load:()=>media.load(),play:()=>media.play(),pause:()=>media.pause(),
      currentTime:value=>{media.currentTime=value;},dispose:()=>{media.pause();media.removeAttribute('src');media.load();media.remove();disposed=true;registry.delete(id);},isDisposed:()=>disposed};
    const endedTail=()=>queueMicrotask(function videojsEndedTail(){if(disposed)return;
      if(config.pauseOnEndedTail||!media.paused)player.pause();if(!config.playerEndedMissing)events.dispatchEvent(new Event('ended'));});
    media.addEventListener('ended',endedTail);
    registry.set(id,player);return player;}
  videojs.VERSION='7.20.3';videojs.getPlayer=id=>registry.get(id);
  class LocalURL extends URL{static createObjectURL(){return 'blob:http://127.0.0.1:8134/local-fixture';}static revokeObjectURL(url){revoked.push(url);}}
  const env={document,performance:{now:()=>performance.now()+clockOffset,getEntriesByType:()=>[]},navigator:{userAgent:'mock'},setTimeout:later,clearTimeout:cancel,
    URL:LocalURL,Blob,atob,videojs,IntextDummyFixtures:{manifest:{mock:true,candidate:{durationMs:1000}},dummy:'data:video/mp4;base64,YQ==',control:'data:video/mp4;base64,Yg==',candidate:'data:video/mp4;base64,Yw=='}};
  const harness=createHarness(env,{readyMs:20,metadataMs:20,playMs:20,seekMs:30,cleanupMs:1});return {env,harness,nodes,calls,timers,registry,revoked};
}
test('dummy lab: independent buttons/default HTTP; no automatic all-case loop',()=>{
  const html=fs.readFileSync(path.join(__dirname,'qa/intext-p13c-dummy.html'),'utf8');
  assert.equal((html.match(/data-engine=/g)||[]).length,6);assert.match(html,/option value="http"/);assert.doesNotMatch(html,/id="run"/);
});
test('dummy lab: native control metadata → two successful plays → disposal',async()=>{
  const f=fixture(),r=await f.harness.runCase('native','control');assert.equal(r.plays.length,2);assert.equal(r.plays[1].kind,'replay');
  assert(r.plays.every(p=>p.terminal==='ended'&&p.promise==='resolved'));assert.equal(r.disposed.success,true);
  assert.equal(f.harness.result.controlValidated,false);assert.equal(f.timers.size,0);assert.equal(f.nodes[0].isConnected,false);
  const names=r.events.map(e=>e.event);assert(names.indexOf('loadedmetadata')<names.indexOf('play_requested'));
  assert(names.indexOf('play_promise_resolved')<names.indexOf('ended'));
});
test('dummy lab: Video.js starts empty, waits ready, assigns source and loads before play',async()=>{
  const f=fixture(),r=await f.harness.runCase('videojs','control');assert.equal(r.disposed.success,true);assert.equal(f.registry.size,0);
  assert(f.calls.indexOf('ready')<f.calls.indexOf('src'));assert(f.calls.indexOf('src')<f.calls.indexOf('load'));assert(f.calls.indexOf('load')<f.calls.indexOf('play'));
  assert.equal(r.events.filter(e=>e.event==='source_assign_requested').length,1);
  assert(r.events.filter(e=>e.event==='media_api_call'&&e.method==='load'&&e.stage!=='cleanup').every(e=>e.pendingPlayIds.length===0));
});
test('dummy lab: new element/state for every case; concurrent scenarios rejected',async()=>{
  const f=fixture(),a=f.harness.runCase('native','control');await assert.rejects(f.harness.runCase('videojs','control'),/Another case/);await a;
  await f.harness.runCase('native','control');assert.equal(f.nodes.length,2);assert.notEqual(f.nodes[0],f.nodes[1]);assert.notEqual(f.nodes[0].id,f.nodes[1].id);
});
test('dummy lab: native+Video.js controls need two ended cycles in the SAME transport',async()=>{
  const f=fixture();await f.harness.runCase('native','control','http');await f.harness.runCase('videojs','control','data');
  assert.equal(f.harness.result.controlValidated,false);await f.harness.runCase('videojs','control','http');assert.equal(f.harness.result.controlsByTransport.http.validated,true);
  assert.equal(f.harness.result.controlsByTransport.data.validated,false);assert.equal(f.harness.result.controlValidated,true);
});
test('dummy lab: metadata timeout never calls play, never counts a replay',async()=>{
  const f=fixture({metadataTimeout:true}),r=await f.harness.runCase('native','control');
  assert.equal(r.plays.length,1);assert.equal(r.plays[0].terminal,'metadata-timeout');assert(!f.calls.includes('play'));
  assert.equal(f.harness.result.controlValidated,false);assert.equal(f.timers.size,0);
});
test('dummy lab: spontaneous media error preserves code/message and current source',async()=>{
  const f=fixture({mediaError:true}),r=await f.harness.runCase('native','dummy');
  assert.deepEqual(r.plays[0].snapshot.mediaError,{code:4,message:'mock decoder error'});
  const error=r.events.find(e=>e.event==='error');assert.equal(error.stage,'setup');assert.equal(error.origin,'media');
  assert.equal(error.currentSrc,'http://127.0.0.1:8134/media/dummy.mp4');assert.equal(r.plays[0].terminal,'media-error');
});
test('dummy lab: pending play times out once; cleanup AbortError is separate, timestamped and intentional',async()=>{
  const f=fixture({pendingPlay:true}),r=await f.harness.runCase('native','control');assert.equal(r.plays.length,1);
  const play=r.plays[0];assert.equal(play.terminal,'lab-timeout');assert.equal(play.promiseAtTerminal,'pending');assert.equal(play.promise,'rejected');
  assert.equal(play.error.origin,'cleanup-interruption');assert.equal(play.error.name,'AbortError');
  const events=r.events,interrupt=events.find(e=>e.event==='cleanup_intentional_play_interrupt'),rejected=events.find(e=>e.event==='play_promise_rejected');
  assert(interrupt.atMs<=rejected.atMs);assert.equal(rejected.stage,'cleanup');assert.equal(r.pendingPlayIdsAfterCleanup.length,0);
  const timeout=events.find(e=>e.event==='lab_timeout');assert.equal(timeout.timerDriftMs,timeout.actualElapsedMs-timeout.timeoutMs);
  assert(!events.some(e=>e.event==='replay_seek_requested'));assert.equal(f.timers.size,0);
});
test('dummy lab: playback rejection is not a media error or cleanup interruption',async()=>{
  const f=fixture({playReject:true}),r=await f.harness.runCase('native','control');assert.equal(r.plays.length,1);
  assert.equal(r.plays[0].terminal,'play-rejected');assert.equal(r.plays[0].error.origin,'playback');assert.equal(r.plays[0].snapshot.mediaError,null);
});
test('dummy lab: a promise still unresolved after dispose requires reload, never overlapping another case',async()=>{
  const f=fixture({pendingPlay:true,uninterruptible:true}),r=await f.harness.runCase('native','control');
  assert.equal(r.pendingPlayIdsAfterCleanup.length,1);assert.equal(r.events.find(e=>e.event==='dispose_requested').forcedReset,true);
  await assert.rejects(f.harness.runCase('native','control'),/reload the laboratory/);assert.equal(f.nodes.length,1);assert.equal(f.timers.size,0);
});
test('dummy lab: retry after failure is an explicit independent recovery, not a validated replay',async()=>{
  const f=fixture({metadataTimeout:true});const a=await f.harness.runCase('native','control'),b=await f.harness.runCase('native','control');
  assert.equal(b.runKind,'recovery');assert.equal(b.previousCaseId,a.id);assert.equal(b.plays.length,1);assert.notEqual(f.nodes[0],f.nodes[1]);
  assert.equal(f.harness.result.controlValidated,false);
});
test('dummy lab: hidden document cannot validate controls',async()=>{
  const f=fixture();f.env.document.visibilityState='hidden';await f.harness.runCase('native','control');await f.harness.runCase('videojs','control');
  assert.equal(f.harness.result.controlValidated,false);
});
test('dummy lab: transient hidden state invalidates otherwise ended playback',async()=>{
  const f=fixture(),promise=f.harness.runCase('native','control');f.env.document.visibilityState='hidden';f.env.document.dispatchEvent(new Event('visibilitychange'));
  f.env.document.visibilityState='visible';const r=await promise;assert.equal(r.visibilityValid,false);
});
test('dummy lab: data URL stored once with exact currentSrc reference; blob revoked after dispose',async()=>{
  const f=fixture(),data=await f.harness.runCase('native','control','data');const metadata=data.events.find(e=>e.event==='loadedmetadata');
  assert.equal(f.harness.result.sourceTable[metadata.currentSrcRef],f.env.IntextDummyFixtures.control);assert.equal(metadata.currentSrc,null);
  const blob=await f.harness.runCase('native','control','blob');assert.equal(blob.transport,'blob');assert.deepEqual(f.revoked,[blob.sourceUrl]);
});
test('dummy lab: failed/absent controls cannot become vacuous true',()=>{
  assert.equal(validation([]).controlValidated,false);assert.equal(validation([{source:'dummy',transport:'http',engine:'native'}]).controlValidated,false);
});
test('dummy lab: contaminated ad environment refuses to create media',async()=>{
  const f=fixture();f.env.google={ima:{}};await assert.rejects(f.harness.runCase('native','control'),/contaminated/);assert.equal(f.nodes.length,0);
});
test('dummy lab: server supports local MP4 full/range/HEAD; external connections remain forbidden',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'intext-dummy-http-'));
  try{fs.writeFileSync(path.join(dir,'control.mp4'),Buffer.from('0123456789'));const handler=createHandler(dir);
    function request(method,range,url='/media/control.mp4'){const result={};handler({url,method,headers:{range}},
      {writeHead:(status,headers)=>Object.assign(result,{status,headers}),end:body=>{result.body=body;}});return result;}
    const full=request('GET');assert.equal(full.status,200);assert.equal(full.headers['Content-Type'],'video/mp4');assert.equal(full.body.toString(),'0123456789');
    assert.match(full.headers['Content-Security-Policy'],/media-src 'self' data: blob:/);assert.match(full.headers['Content-Security-Policy'],/connect-src 'none'/);
    const range=request('GET','bytes=2-5');assert.equal(range.status,206);assert.equal(range.headers['Content-Range'],'bytes 2-5/10');assert.equal(range.body.toString(),'2345');
    assert.equal(request('GET','bytes=-2').body.toString(),'89');assert.equal(request('GET','bytes=20-').status,416);
    assert.equal(request('GET','bytes=1-2,4-5').status,416);assert.equal(request('HEAD').body,undefined);assert.equal(request('GET',null,'/../control.mp4').status,404);
  }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('dummy lab: replay yields past remaining native ended listeners and waits for actual seeked',async()=>{
  const f=fixture({seekDelay:8}),r=await f.harness.runCase('videojs','control');assert.equal(r.plays.length,2);assert.equal(r.plays[1].terminal,'ended');
  const playerEnded=r.events.find(e=>e.event==='player_ended'),seek=r.events.find(e=>e.event==='replay_seek_requested'),seeked=r.events.find(e=>e.event==='seeked');
  const replay=r.events.find(e=>e.event==='play_requested'&&e.kind==='replay');
  assert(playerEnded.sequence<seek.sequence);assert(seeked.sequence<replay.sequence);assert.equal(replay.seeking,false);assert.equal(replay.ended,false);
  assert.equal(r.replayGate.ready,true);assert.equal(r.replayGate.seekObserved,true);
});
test('dummy lab: missing seeked prevents second play; bounded diagnostic, no retry',async()=>{
  const f=fixture({seekTimeout:true}),r=await f.harness.runCase('videojs','control');
  assert.equal(r.plays.length,1);assert.equal(r.replayGate.reason,'lab-timeout');assert.equal(r.replayGate.ready,false);
  assert.equal(r.replaySkippedReason,'replay-gate-not-ready');assert.equal(f.timers.size,0);
});
test('dummy lab: missing public player ended prevents Video.js replay',async()=>{
  const f=fixture({playerEndedMissing:true}),r=await f.harness.runCase('videojs','control');assert.equal(r.plays.length,1);
  assert.equal(r.events.some(e=>e.event==='replay_seek_requested'),false);assert.equal(r.replayGate.reason,'lab-timeout');
});
test('dummy lab: pause stack distinguishes unknown ended tail, player chain and deliberate harness cleanup',async()=>{
  const f=fixture({pauseOnEndedTail:true}),r=await f.harness.runCase('videojs','control');
  const pause=r.events.find(e=>e.event==='player_api_call'&&e.method==='pause'&&e.stage!=='cleanup');
  assert.equal(pause.caller,'unattributed');assert.match(pause.stack,/videojsEndedTail/);
  const native=r.events.find(e=>e.event==='media_api_call'&&e.method==='pause'&&e.stage!=='cleanup');assert.equal(native.viaPlayer,true);
  const cleanup=r.events.find(e=>e.event==='media_api_call'&&e.method==='pause'&&e.stage==='cleanup');assert.equal(cleanup.caller,'harness.cleanup-dispose');
  assert.equal(r.plays[1].terminal,'ended');
});
test('dummy lab: candidate has separate validation; it never certifies the GAM control fixture',async()=>{
  const f=fixture({temporalPlayback:true});await f.harness.runCase('native','candidate','data');await f.harness.runCase('videojs','candidate','data');
  assert.equal(f.harness.result.candidateValidated,true);assert.equal(f.harness.result.candidatesByTransport.data.validated,true);
  assert.equal(f.harness.result.controlValidated,false);
});
for(const engine of ['native','videojs'])test('dummy lab: rejects duration=1 immediate EOF and seeked retaining ended=true: '+engine,async()=>{
  const f=fixture({immediateEnded:true,stickyEndedAfterSeek:true}),r=await f.harness.runCase(engine,'candidate');
  assert.equal(r.plays.length,1);assert.equal(r.plays[0].snapshot.duration,1);assert.equal(r.replayGate.ready,false);
  const seeked=r.events.find(e=>e.event==='seeked');assert.equal(seeked.currentTime,0);assert.equal(seeked.ended,true);assert.equal(seeked.seeking,false);
  assert.equal(r.candidateAssessment.status,'not-suitable');assert(r.candidateAssessment.reasons.includes('ended-too-soon'));
  assert(r.candidateAssessment.reasons.includes('playing-not-active'));assert.equal(f.harness.result.candidateValidated,false);
  assert.equal(r.events.filter(e=>e.event==='play_requested').length,1);assert.equal(f.timers.size,0);
});
test('dummy lab: two fast ended cycles do not certify a candidate even when replay is stable',async()=>{
  const f=fixture(),r=await f.harness.runCase('native','candidate');assert.equal(r.plays.length,2);assert.equal(r.replayGate.ready,true);
  assert.equal(r.candidateAssessment.status,'not-suitable');assert(r.plays.every(p=>p.temporalAssessment.reasons.includes('ended-too-soon')));
  assert.equal(f.harness.result.candidateValidated,false);
});
test('dummy lab: temporal success requires active progress, declared duration and normal playback rate',()=>{
  const play={terminal:'ended',terminalAtMs:1100,snapshot:{duration:1},temporalEvidence:{playingActive:true,playingAtMs:100,playingCurrentTime:0,playbackRate:1,
    progressSamples:[{atMs:400,currentTime:0.3,active:true},{atMs:700,currentTime:0.6,active:true}]}};
  assert.equal(assessCandidateTiming(play,1000).valid,true);
  const noProgress=structuredClone(play);noProgress.temporalEvidence.progressSamples=[];assert(assessCandidateTiming(noProgress,1000).reasons.includes('insufficient-observed-progress'));
  const paused=structuredClone(play);paused.temporalEvidence.playingActive=false;assert(assessCandidateTiming(paused,1000).reasons.includes('playing-not-active'));
  const duration=structuredClone(play);duration.snapshot.duration=0.5;assert(assessCandidateTiming(duration,1000).reasons.includes('duration-mismatch'));
  const rate=structuredClone(play);rate.temporalEvidence.playbackRate=2;assert(assessCandidateTiming(rate,1000).reasons.includes('playback-rate-not-one'));
});
test('dummy lab: Chrome v3 evidence preserves successful Video.js replay and invalid hidden native control',()=>{
  const cases=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/intext-p13c-dummy-v3-inputs.json'),'utf8')).uniqueCases;
  assert.equal(cases.length,6);assert.equal(validControl(cases.find(c=>c.source==='control'&&c.engine==='videojs')),true);
  assert.equal(validControl(cases.find(c=>c.source==='control'&&c.engine==='native')),false);
});
test('dummy lab: actual Chrome single-frame candidate evidence is not suitable despite duration=1',()=>{
  const cases=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/intext-p13c-dummy-v3-inputs.json'),'utf8')).uniqueCases;
  for(const c of cases.filter(c=>c.source==='candidate')){
    const playing=c.events.find(e=>e.event==='playing'),play={...c.plays[0],temporalEvidence:{playingActive:playing.paused===false&&playing.ended===false,
      playingAtMs:playing.atMs,playingCurrentTime:playing.currentTime,playbackRate:1,progressSamples:[]}};
    const result=assessCandidateTiming(play,1000);assert.equal(result.valid,false);assert(result.reasons.includes('playing-not-active'));assert(result.reasons.includes('ended-too-soon'));
    assert.equal(c.events.find(e=>e.event==='seeked').ended,true);assert.equal(c.replayGate.ready,false);
  }
});
