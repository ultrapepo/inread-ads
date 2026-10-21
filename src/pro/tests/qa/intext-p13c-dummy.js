'use strict';
// Media-only QA harness. No advertising code or global media prototype patches.
(function(scope){
  const mediaEvents=['loadstart','loadedmetadata','durationchange','loadeddata','canplay','canplaythrough','seeking','seeked','play','playing','pause','ended','error','abort','emptied','waiting','stalled','suspend','timeupdate'];
  const snapshot=media=>({currentTime:media.currentTime,duration:Number.isFinite(media.duration)?media.duration:null,
    currentSrc:media.currentSrc||'',src:media.getAttribute?.('src')||'',readyState:media.readyState,networkState:media.networkState,
    paused:media.paused,ended:media.ended,seeking:media.seeking===true,videoWidth:media.videoWidth,videoHeight:media.videoHeight,
    mediaError:media.error?{code:media.error.code,message:media.error.message}:null});
  const candidateCriteria={minimumPlayingFraction:0.75,minimumProgressSamples:2,minimumProgressFraction:0.2,durationToleranceMs:50,maximumProgressSamples:8};
  function assessCandidateTiming(play,expectedDurationMs){
    const evidence=play.temporalEvidence??{},reasons=[],durationMs=play.snapshot?.duration*1000;
    const expectedKnown=Number.isFinite(expectedDurationMs)&&expectedDurationMs>0;
    const elapsedFromPlayingMs=Number.isFinite(evidence.playingAtMs)&&Number.isFinite(play.terminalAtMs)?play.terminalAtMs-evidence.playingAtMs:null;
    const samples=evidence.progressSamples??[],progressSeconds=samples.length>1?samples.at(-1).currentTime-samples[0].currentTime:0;
    if(!expectedKnown)reasons.push('expected-duration-unknown');
    if(play.terminal!=='ended')reasons.push('playback-not-complete');
    if(evidence.playingActive!==true)reasons.push('playing-not-active');
    if(evidence.playbackRate!==1)reasons.push('playback-rate-not-one');
    if(!Number.isFinite(durationMs)||expectedKnown&&Math.abs(durationMs-expectedDurationMs)>candidateCriteria.durationToleranceMs)reasons.push('duration-mismatch');
    if(elapsedFromPlayingMs===null||expectedKnown&&elapsedFromPlayingMs<expectedDurationMs*candidateCriteria.minimumPlayingFraction)reasons.push('ended-too-soon');
    if(samples.length<candidateCriteria.minimumProgressSamples||expectedKnown&&progressSeconds<expectedDurationMs/1000*candidateCriteria.minimumProgressFraction)reasons.push('insufficient-observed-progress');
    if(samples.some((sample,i)=>!Number.isFinite(sample.currentTime)||!Number.isFinite(sample.atMs)||sample.active!==true||sample.currentTime<=evidence.playingCurrentTime||sample.currentTime>=play.snapshot?.duration||sample.atMs<=evidence.playingAtMs||sample.atMs>=play.terminalAtMs||
      i>0&&(sample.currentTime<=samples[i-1].currentTime||sample.atMs<=samples[i-1].atMs)))reasons.push('invalid-progress-sequence');
    return {valid:reasons.length===0,reasons,expectedDurationMs,declaredDurationMs:durationMs,elapsedFromPlayingMs,progressSampleCount:samples.length,progressSeconds};
  }
  const validControl=(result,source='control')=>result.source===source&&result.visibilityValid&&result.plays.length===2&&
    result.plays.every(play=>play.kind!=='recovery'&&play.terminal==='ended'&&play.promise==='resolved'&&play.promiseAtTerminal==='resolved'&&play.playingObserved&&
      play.snapshot.currentTime>0&&play.snapshot.videoWidth>0&&play.snapshot.videoHeight>0&&!play.snapshot.mediaError&&(source!=='candidate'||play.temporalAssessment?.valid===true))&&
    result.metadataObserved&&!result.harnessError&&!result.cleanupErrors?.length&&result.pendingPlayIdsAfterCleanup?.length===0&&result.disposed?.success===true;
  function validation(cases,source='control'){
    const byTransport={};
    for(const transport of ['http','data','blob']){
      byTransport[transport]={};for(const engine of ['native','videojs']){
        const latest=cases.filter(c=>c.transport===transport&&c.engine===engine&&c.source===source).at(-1);
        byTransport[transport][engine]=!!latest&&validControl(latest,source);
      }
      byTransport[transport].validated=byTransport[transport].native&&byTransport[transport].videojs;
    }
    return {controlValidated:Object.values(byTransport).some(value=>value.validated),controlsByTransport:byTransport};
  }
  function createHarness(env,options={}){
    const {document,performance}=env,fixtures=env.IntextDummyFixtures;
    const limits={readyMs:5000,metadataMs:15000,playMs:15000,seekMs:2000,cleanupMs:250,...options}; // Laboratory bounds only.
    const delay=ms=>new Promise(resolve=>env.setTimeout(resolve,ms));
    const report={schema:'p13c-dummy-lab-result-v3',harnessRevision:'candidate-timeline-v2',candidateCriteria,timestamp:new Date().toISOString(),userAgent:env.navigator?.userAgent,
      mediaOnly:true,fixtures:fixtures.manifest,limits,cases:[],sourceTable:{},controlValidated:false,controlsByTransport:{},candidateValidated:false,candidatesByTransport:{}};
    let running=null,sequence=0;
    async function execute(engine,source,transport){
      if(env.google?.ima||env.pbjs||env.googletag)throw Error('Advertising SDK present: laboratory contaminated');
      if(!['native','videojs'].includes(engine)||!['dummy','control','candidate'].includes(source)||!['http','data','blob'].includes(transport))throw Error('Invalid case');
      if(engine==='videojs'&&env.videojs?.VERSION!=='7.20.3')throw Error('Unexpected Video.js version');
      const previous=report.cases.filter(c=>c.engine===engine&&c.source===source&&c.transport===transport).at(-1);
      const result={id:'case-'+(++sequence),engine,source,transport,runKind:previous&&previous.plays?.[0]?.terminal!=='ended'?'recovery':'independent',
        previousCaseId:previous?.id??null,events:[],plays:[],visibilityValid:document.visibilityState==='visible',metadataObserved:false};
      report.cases.push(result);
      const origin=performance.now(),removers=[],restores=[],pending=new Map(),timers=new Set();
      const later=(fn,ms)=>{const id=env.setTimeout(()=>{timers.delete(id);fn();},ms);timers.add(id);return id;};
      const cancel=id=>{env.clearTimeout(id);timers.delete(id);};
      const capture=element=>{const value=snapshot(element);for(const field of ['src','currentSrc'])if(value[field].startsWith('data:')){
        const key=result.id+'-'+field;report.sourceTable[key]=value[field];value[field]=null;value[field+'Ref']=key;
      }return value;};
      let stage='setup',phase=0,player=null,objectUrl=null,settleAttempt=null,settleMetadata=null,settlePlayerEnded=null,settleSeek=null,media,mediaIdentity=0;
      let callerContext=null,playerCallDepth=0,seekObserved=false;const playerEndedPhases=new Set();
      const callAs=(caller,fn)=>{const previous=callerContext;callerContext=caller;try{return fn();}finally{callerContext=previous;}};
      const record=(event,data={})=>{const row={sequence:result.events.length+1,event,stage,phase,atMs:performance.now()-origin,
        documentVisibility:document.visibilityState,mediaIdentity,...(media?capture(media):{}),...data};result.events.push(row);return row;};
      const onVisibility=()=>{if(document.visibilityState!=='visible')result.visibilityValid=false;record('document_visibility_changed');};
      document.addEventListener('visibilitychange',onVisibility);removers.push(()=>document.removeEventListener('visibilitychange',onVisibility));
      function observeApi(target,method,layer){
        const descriptor=Object.getOwnPropertyDescriptor(target,method),original=target[method];if(typeof original!=='function')return;
        const wrapper=function(...args){record(layer+'_api_call',{method,caller:callerContext??'unattributed',viaPlayer:playerCallDepth>0,
          stack:method==='pause'?new Error('QA pause call stack').stack:undefined,pendingPlayIds:[...pending.keys()],cleanupInterruption:stage==='cleanup'&&pending.size>0});
          if(layer==='player')playerCallDepth++;try{return original.apply(this,args);}finally{if(layer==='player')playerCallDepth--;}};
        try{target[method]=wrapper;restores.push(()=>{if(target[method]===wrapper){if(descriptor)Object.defineProperty(target,method,descriptor);else delete target[method];}});}
        catch(error){record('api_observation_unavailable',{layer,method,message:error.message});}
      }
      function bind(element){
        media=element;mediaIdentity++;record('media_observed');
        for(const method of ['load','play','pause'])observeApi(element,method,'media');
        const timeupdates=new Map(),identity=mediaIdentity;
        for(const event of mediaEvents){const handler=()=>{
          if(element===media&&stage==='play'){
            const play=result.plays[phase-1],evidence=play?.temporalEvidence,active=media.paused===false&&media.ended===false&&!media.seeking&&!media.error;
            if(evidence&&event==='playing'){
              play.playingObserved=true;
              if(active&&!evidence.playingActive){evidence.playingActive=true;evidence.playingAtMs=performance.now()-origin;evidence.playingCurrentTime=media.currentTime;}
            }
            if(evidence&&event==='timeupdate'&&active&&evidence.playingActive&&media.currentTime>evidence.playingCurrentTime&&media.currentTime<media.duration&&
              (!evidence.progressSamples.length||media.currentTime-evidence.progressSamples.at(-1).currentTime>=0.1)&&evidence.progressSamples.length<candidateCriteria.maximumProgressSamples){
              evidence.progressSamples.push({atMs:performance.now()-origin,currentTime:media.currentTime,active:true});
            }
          }
          if(event==='timeupdate'){const count=timeupdates.get(phase)??0;if(count>=candidateCriteria.maximumProgressSamples)return;timeupdates.set(phase,count+1);}
          record(event,{origin:stage==='cleanup'?'cleanup':'media',observedMediaIdentity:identity});
          if(element!==media)return;
          if(event==='loadedmetadata'){result.metadataObserved=true;settleMetadata?.('loadedmetadata');}
          if(event==='error'){settleMetadata?.('media-error');settleAttempt?.('media-error');settleSeek?.('media-error');}
          if(event==='seeked')seekObserved=true;
          if(['seeked','canplay','loadeddata'].includes(event)&&seekObserved&&stableForReplay())settleSeek?.('ready');
          if(event==='playing'&&result.plays[phase-1])result.plays[phase-1].playingObserved=true;
          if(event==='ended')settleAttempt?.('ended');
        };element.addEventListener(event,handler);removers.push(()=>element.removeEventListener(event,handler));}
      }
      const stableForReplay=()=>!pending.size&&!media.error&&!media.seeking&&!media.ended&&media.paused===true&&
        Number.isFinite(media.currentTime)&&Math.abs(media.currentTime)<0.05&&media.readyState>=2;
      async function prepareReplay(){
        stage='replay';record('replay_ended_dispatch_wait_started');
        // A microtask can run between native listeners. Yield a task before changing ended state.
        await delay(0);
        if(player&&!playerEndedPhases.has(phase)){
          const reason=await waitFor(finish=>{settlePlayerEnded=finish;},limits.seekMs,'player-ended');settlePlayerEnded=null;
          if(reason!=='player-ended'){result.replayGate={reason};record('replay_blocked',result.replayGate);return false;}
        }
        record('replay_ended_dispatch_complete',{playerEndedObserved:player?playerEndedPhases.has(phase):null});
        if(pending.size||media.error){result.replayGate={reason:'pending-play-or-media-error'};record('replay_blocked',result.replayGate);return false;}
        seekObserved=false;const needsSeek=media.ended||media.seeking||Math.abs(media.currentTime)>=0.05;
        let reason='already-at-start';
        if(needsSeek){const sought=waitFor(finish=>{settleSeek=finish;},limits.seekMs,'replay-seek');
          record('replay_seek_requested');callAs('harness.replay-seek',()=>{if(player)player.currentTime(0);else media.currentTime=0;});
          reason=await sought;settleSeek=null;
        }
        // Let native/Video.js seeked handlers finish too; no polling, reload or synthetic event.
        await delay(0);
        const ready=(reason==='ready'||reason==='already-at-start')&&stableForReplay();
        result.replayGate={reason,ready,seekObserved,needsSeek};record(ready?'replay_ready':'replay_blocked',result.replayGate);return ready;
      }
      function waitFor(register,timeoutMs,label){let timer;
        return new Promise(resolve=>{let done=false;const finish=reason=>{if(done)return;done=true;cancel(timer);resolve(reason);};
          const armedAt=performance.now();record('lab_wait_armed',{label,timeoutMs,deadlineAtMs:armedAt-origin+timeoutMs});
          timer=later(()=>{const actualElapsedMs=performance.now()-armedAt;
            record('lab_timeout',{label,timeoutMs,actualElapsedMs,timerDriftMs:actualElapsedMs-timeoutMs,pendingPlayIds:[...pending.keys()]});finish('lab-timeout');},timeoutMs);register(finish);});
      }
      async function playCycle(kind){
        phase++;stage='play';const play={phase,kind,promise:'not-called',playingObserved:false,
          temporalEvidence:{playingActive:false,playingAtMs:null,playingCurrentTime:null,playbackRate:media.playbackRate??null,progressSamples:[]}};result.plays.push(play);
        const terminal=waitFor(finish=>{settleAttempt=finish;},limits.playMs,'play-'+phase);
        record('play_requested',{kind});const playId=result.id+'-play-'+phase;
        try{
          const value=callAs('harness.'+kind+'-play',()=>player?player.play():media.play());
          record('play_call_returned',{playId,returnedPromise:!!value&&typeof value.then==='function'});
          if(value&&typeof value.then==='function'){
            play.promise='pending';pending.set(playId,value);
            Promise.resolve(value).then(()=>{pending.delete(playId);play.promise='resolved';play.promiseSettledAtMs=performance.now()-origin;
              record('play_promise_resolved',{playId});},error=>{pending.delete(playId);play.promise='rejected';play.promiseSettledAtMs=performance.now()-origin;
              play.error={name:error.name,message:error.message,stage,origin:stage==='cleanup'?'cleanup-interruption':'playback'};
              record('play_promise_rejected',{playId,...play.error});settleAttempt?.('play-rejected');});
          }else{play.promise='no-promise';record('play_returned_without_promise',{playId});}
        }catch(error){play.promise='threw';play.error={name:error.name,message:error.message,stage,origin:'playback'};
          record('play_threw',play.error);settleAttempt('play-threw');}
        play.terminal=await terminal;play.terminalAtMs=performance.now()-origin;play.snapshot=capture(media);settleAttempt=null;
        play.promiseAtTerminal=play.promise;record('play_terminal',{terminal:play.terminal,promise:play.promise});
        if(source==='candidate'){play.temporalAssessment=assessCandidateTiming(play,fixtures.manifest.candidate?.durationMs);record('candidate_timing_assessment',play.temporalAssessment);}
        return play;
      }
      try{
        media=document.createElement('video');record('element_created');media.id='dummy-lab-'+sequence;
        media.muted=true;media.defaultMuted=true;media.setAttribute('playsinline','');media.preload='auto';media.controls=true;
        bind(media);document.getElementById('surface').appendChild(media);record('element_attached');
        if(engine==='videojs'){
          record('videojs_create_requested');player=env.videojs(media,{autoplay:false,preload:'auto',muted:true,controls:true,width:444,height:250,errorDisplay:false});
          const ready=await waitFor(finish=>player.ready(()=>{if(stage!=='setup')return;record('videojs_ready');finish('ready');}),limits.readyMs,'videojs-ready');
          if(ready!=='ready')throw Error('videojs-ready-timeout');
          const actual=player.el().querySelector('video');if(!actual)throw Error('videojs-media-missing');
          if(actual!==media){record('media_replaced_before_source');bind(actual);}
          for(const method of ['load','play','pause','currentTime'])observeApi(player,method,'player');
          const ended=()=>{playerEndedPhases.add(phase);record('player_ended');settlePlayerEnded?.('player-ended');};
          player.on('ended',ended);removers.push(()=>player.off('ended',ended));
        }else record('native_ready');
        let url;
        if(transport==='http')url=new env.URL('/media/'+source+'.mp4',document.baseURI).href;
        else if(transport==='data')url=fixtures[source];
        else{
          const raw=env.atob(fixtures[source].split(',')[1]),bytes=Uint8Array.from(raw,char=>char.charCodeAt(0));
          objectUrl=env.URL.createObjectURL(new env.Blob([bytes],{type:'video/mp4'}));url=objectUrl;
        }
        result.sourceUrl=transport==='data'?'data:video/mp4;base64,[fixture '+source+']':url;
        const metadata=waitFor(finish=>{settleMetadata=finish;},limits.metadataMs,'metadata');
        record('source_assign_requested',{transport});
        if(player)player.src({src:url,type:'video/mp4'});else media.src=url;
        record('source_assigned');record('load_requested');callAs('harness.initial-load',()=>{if(player)player.load();else media.load();});
        const loaded=await metadata;settleMetadata=null;record('metadata_gate_resolved',{reason:loaded});
        if(loaded==='loadedmetadata'){
          const first=await playCycle('initial');
          if(first.terminal==='ended'&&first.promise==='resolved'&&!pending.size&&!first.snapshot.mediaError){
            if(await prepareReplay())await playCycle('replay');else result.replaySkippedReason='replay-gate-not-ready';
          }else result.replaySkippedReason='first-cycle-not-successful-or-play-pending';
        }else{result.plays.push({phase:1,kind:'initial',terminal:loaded==='media-error'?'media-error':'metadata-timeout',promise:'not-called',snapshot:capture(media)});
          result.replaySkippedReason='metadata-not-ready';}
      }catch(error){result.harnessError={name:error.name,message:error.message};record('harness_error',result.harnessError);}
      finally{
        stage='cleanup';for(const id of [...timers])cancel(id);settleMetadata=null;settleAttempt=null;settlePlayerEnded=null;settleSeek=null;
        record('cleanup_started',{pendingPlayIds:[...pending.keys()]});
        if(pending.size){record('cleanup_intentional_play_interrupt',{pendingPlayIds:[...pending.keys()],reason:'bounded-test-ended-with-pending-play'});
          try{callAs('harness.cleanup-pause',()=>{if(player)player.pause();else media.pause();});}catch(error){record('cleanup_pause_failed',{message:error.message});}
          await delay(limits.cleanupMs);
        }
        result.beforeDispose=media?capture(media):null;
        record('dispose_requested',{pendingPlayIds:[...pending.keys()],forcedReset:pending.size>0});
        try{
          if(player){const id=player.id();callAs('harness.cleanup-dispose',()=>player.dispose());result.disposed={isDisposed:player.isDisposed(),registryEmpty:env.videojs.getPlayer(id)==null};
            result.disposed.success=result.disposed.isDisposed&&result.disposed.registryEmpty;}
          else if(media){callAs('harness.cleanup-dispose',()=>{media.pause();media.removeAttribute('src');media.load();media.remove();});result.disposed={success:!media.isConnected,connected:media.isConnected};}
        }catch(error){result.disposed={success:false,message:error.message};}
        await delay(limits.cleanupMs);record('dispose_completed',{...result.disposed,pendingPlayIds:[...pending.keys()]});
        for(const operation of [...removers.reverse(),...restores.reverse()])try{operation();}catch(error){
          (result.cleanupErrors??=[]).push(error.message);record('cleanup_observer_error',{message:error.message});}
        if(objectUrl)env.URL.revokeObjectURL(objectUrl);
        result.pendingPlayIdsAfterCleanup=[...pending.keys()];result.durationMs=performance.now()-origin;
        if(source==='candidate'){
          const reasons=result.plays.flatMap(play=>play.temporalAssessment?.reasons??['no-valid-playback-timing']);
          if(result.plays.length!==2)reasons.push('two-complete-cycles-required');if(result.replayGate?.ready===false)reasons.push('replay-not-ready');
          if(!result.visibilityValid)reasons.push('document-not-continuously-visible');if(!result.disposed?.success||result.cleanupErrors?.length||pending.size)reasons.push('cleanup-not-validated');
          const suitable=validControl(result,'candidate');if(!suitable&&!reasons.length)reasons.push('cycle-contract-not-validated');
          result.candidateAssessment={status:suitable?'suitable-in-this-lab-run':'not-suitable',reasons:[...new Set(reasons)]};
        }
        Object.assign(report,validation(report.cases));
        const blackValidation=validation(report.cases,'candidate');report.candidateValidated=blackValidation.controlValidated;report.candidatesByTransport=blackValidation.controlsByTransport;
        report.requests=performance.getEntriesByType?.('resource').map(entry=>({name:entry.name,initiatorType:entry.initiatorType}))??[];
      }
      return result;
    }
    function runCase(engine,source,transport='http'){
      if(running)return Promise.reject(Error('Another case is running; no concurrent media scenarios'));
      if(report.cases.some(result=>result.pendingPlayIdsAfterCleanup?.length))return Promise.reject(Error('Play still unresolved after disposal; reload the laboratory before another case'));
      running=execute(engine,source,transport).finally(()=>{running=null;});return running;
    }
    return {runCase,result:report,isRunning:()=>!!running};
  }
  const api={createHarness,snapshot,validControl,validation,assessCandidateTiming};
  if(typeof module!=='undefined'&&module.exports){module.exports=api;return;}
  const harness=createHarness(scope);scope.IntextDummyLab=harness;
  const status=scope.document.getElementById('status'),buttons=[...scope.document.querySelectorAll('button[data-engine]')];
  for(const button of buttons)button.onclick=async()=>{
    for(const item of buttons)item.disabled=true;scope.document.getElementById('transport').disabled=true;
    status.textContent='Ejecutando '+button.dataset.engine+'/'+button.dataset.source+' de forma independiente. Mantén la pestaña visible.';
    try{await harness.runCase(button.dataset.engine,button.dataset.source,scope.document.getElementById('transport').value);status.textContent=JSON.stringify(harness.result,null,2);}
    catch(error){status.textContent=error.stack;}
    finally{for(const item of buttons)item.disabled=false;scope.document.getElementById('transport').disabled=false;scope.document.getElementById('download').disabled=false;}
  };
  scope.document.getElementById('download').onclick=()=>{const a=scope.document.createElement('a'),url=scope.URL.createObjectURL(new scope.Blob([JSON.stringify(harness.result,null,2)],{type:'application/json'}));
    a.href=url;a.download='intext-dummy-lab-v3.json';a.click();scope.setTimeout(()=>scope.URL.revokeObjectURL(url),1000);};
})(typeof window!=='undefined'?window:globalThis);
