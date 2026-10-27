/* P1.4-A QA only. Infrastructure scheduling; no player or advertising SDK objects. */
(function(root,factory){
 'use strict';
 function install(target,arm){
  if(!['E0','E1'].includes(arm))throw new Error('p14a_invalid_arm');
  const existing=Object.getOwnPropertyDescriptor(target,'IntextP14A');
  if(existing){if(existing.value?.schema!=='p14a-dependencies-v1')throw new Error('p14a_namespace_collision');existing.value.assignmentRequested(arm);return existing.value;}
  const api=factory(target,arm);Object.defineProperty(target,'IntextP14A',{value:api,writable:false,configurable:false});return api;
 }
 if(typeof module==='object'&&module.exports)module.exports={install};
 else install(root,/*__P14A_ARM__*/'E0');
})(typeof window==='object'?window:globalThis,function(root,arm){
 'use strict';
 const logs=[],attempts=new Map(),activationWaits=new WeakMap();let sequence=0,nextAttempt=0,inflight=null,dropped=0;
 const now=()=>Date.now(),safe=(fn,fallback=null)=>{try{return fn()??fallback;}catch{return fallback;}};
 const errorData=error=>({errorName:error?.name||'Error',errorCode:/^[a-z0-9_-]{1,80}$/i.test(error?.message||'')?error.message:'dependency-error'});
 const record=(event,data={})=>{try{if(logs.length>=5000){logs.shift();dropped++;}logs.push({event,arm,sequence:++sequence,timestamp:now(),monotonicMs:safe(()=>root.performance.now()),...data});}catch{/* QA observation must not change settlement. */}};
 const resources={
  videojs:{url:'https://vjs.zencdn.net/7.20.3/video.min.js',available:()=>!!root.videojs},
  contrib:{url:'https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/6.9.0/videojs-contrib-ads.min.js',available:()=>safe(()=>!!root.videojs?.getPlugin?.('ads'),false)},
  imaSdk:{url:'https://imasdk.googleapis.com/js/sdkloader/ima3.js',available:()=>!!root.google?.ima},
  imaPlugin:{url:'https://cdnjs.cloudflare.com/ajax/libs/videojs-ima/1.11.0/videojs.ima.min.js',available:()=>safe(()=>!!root.videojs?.getPlugin?.('ima'),false)},
 };
 function timing(url,startedAt){return safe(()=>{
  const entry=root.performance.getEntriesByName(url,'resource').at(-1);if(!entry)return null;
  const base=root.performance.timeOrigin,epoch=Number.isFinite(base)?base+entry.startTime:null;
  return {source:'ResourceTiming',requestScope:epoch===null?'unknown':epoch<startedAt?'pre-existing-request':'current-request',
   startTime:entry.startTime,duration:entry.duration,fetchStart:entry.fetchStart,responseEnd:entry.responseEnd,
   ttfbMs:entry.requestStart>0&&entry.responseStart>=entry.requestStart?entry.responseStart-entry.requestStart:null,
   receiveMs:entry.responseStart>0&&entry.responseEnd>=entry.responseStart?entry.responseEnd-entry.responseStart:null,
   transferSize:entry.transferSize??null,encodedBodySize:entry.encodedBodySize??null,
   blockedMs:null,scriptEvaluationCpuMs:null,note:'Elapsed/request timing only; zero sizes may be restricted. Use HAR/Performance for blocked, wait and CPU.'};
 });}
 function run(owner){
  if(inflight){record('dependencies_shared',{attemptId:inflight.id});return inflight.promise;}
  const attempt={id:++nextAttempt,startedAt:now(),failed:false,error:null,settled:false,drained:false};attempts.set(attempt.id,attempt);
  record('dependencies_started',{attemptId:attempt.id});
  const fail=error=>{if(!attempt.failed){attempt.failed=true;attempt.error=error;record('dependencies_failed',{attemptId:attempt.id,durationMs:now()-attempt.startedAt,...errorData(error)});}};
  const requireLive=()=>{if(attempt.failed)throw attempt.error;};
  async function resource(key){
   requireLive();const spec=resources[key],startedAt=now();
   const url=owner.resolveDependencyUrl(spec.url),existing=safe(()=>owner.findDependencyElement('script','src',url));
   record('resource_started',{attemptId:attempt.id,resource:key,alreadyAvailable:safe(spec.available,false),existingScript:!!existing,
    existingStatus:existing?.__intextDependencyStatus??existing?.readyState??null,reusedScriptPromise:!!existing?.__intextDependencyPromise});
   try{
    await owner.loadDependencyScript(spec.url,spec.available);
    if(!spec.available())throw new Error('video_dependency_loaded_but_unavailable');
    record('resource_ready',{attemptId:attempt.id,resource:key,durationMs:now()-startedAt,afterAttemptFailure:attempt.failed,timing:timing(url,startedAt)});
   }catch(error){fail(error);record('resource_failed',{attemptId:attempt.id,resource:key,durationMs:now()-startedAt,timing:timing(url,startedAt),...errorData(error)});throw error;}
  }
  async function branch(name,keys){
   const startedAt=now();record('branch_started',{attemptId:attempt.id,branch:name});
   try{for(const key of keys){requireLive();await resource(key);}requireLive();record('branch_ready',{attemptId:attempt.id,branch:name,durationMs:now()-startedAt});}
   catch(error){fail(error);record('branch_failed',{attemptId:attempt.id,branch:name,durationMs:now()-startedAt,...errorData(error)});throw error;}
  }
  const tasks=[];
  const execute=async()=>{
   const barrierAt=now();record('barrier_wait_started',{attemptId:attempt.id});
   try{
    const video=branch('videojs-contrib',['videojs','contrib']);tasks.push(video);
    if(arm==='E0')await video;
    const ima=branch('ima-sdk',['imaSdk']);tasks.push(ima);
    await Promise.all([video,ima]);requireLive();
    if(!resources.videojs.available()||!resources.contrib.available()||!resources.imaSdk.available())throw new Error('video_dependencies_unavailable_at_barrier');
    record('barrier_ready',{attemptId:attempt.id,durationMs:now()-barrierAt});
    await resource('imaPlugin');requireLive();
    if(!owner.dependenciesAvailable())throw new Error('video_dependencies_unavailable_after_load');
    record('dependencies_ready',{attemptId:attempt.id,durationMs:now()-attempt.startedAt});
   }catch(error){fail(error);record('barrier_or_load_failed',{attemptId:attempt.id,durationMs:now()-barrierAt,...errorData(error)});throw error;}
   finally{
    // Fail-fast consumers; all already-started infrastructure remains bounded by the unchanged loader.
    // A failed attempt never schedules a new stage. Observe both branches even after consumer rejection.
    Promise.allSettled(tasks).then(()=>{attempt.drained=true;record('dependencies_drained',{attemptId:attempt.id,failed:attempt.failed,durationMs:now()-attempt.startedAt});if(attempt.settled)attempts.delete(attempt.id);});
   }
  };
  const promise=execute();const current={id:attempt.id,promise};inflight=current;
  const settled=()=>{attempt.settled=true;if(inflight===current)inflight=null;if(attempt.drained)attempts.delete(attempt.id);};
  promise.then(settled,settled);return promise;
 }
 const identity=node=>({slotId:node?.id??null,cycleId:node?._intextTelemetryCycleId??null,renderToken:node?._activeRenderToken??null});
 const api={schema:'p14a-dependencies-v1',arm,run,
  assignmentRequested(requestedArm){record(requestedArm===arm?'assignment_reused':'assignment_conflict',{requestedArm,effectiveArm:arm});},
  activationWait(creative,phase){
   const data={...identity(creative?.node),renderToken:creative?._renderToken??null,prepared:creative?._prepared===true};
   if(phase==='started'){activationWaits.set(creative,now());record('activation_dependencies_wait_started',data);}
   else if(phase==='ready'){
    const startedAt=activationWaits.get(creative);activationWaits.delete(creative);
    record('activation_dependencies_ready',{...data,residualDependenciesWaitMs:Number.isFinite(startedAt)?now()-startedAt:null});
   }
  },
  diagnostic(event,node,data={}){record(event,{...identity(node),renderToken:data.renderToken??node?._activeRenderToken??null,attemptId:inflight?.id??null,
   dependenciesWaitMs:data.dependenciesWaitMs??null,durationMs:data.durationMs??null,reusedPromise:data.reusedPromise??null,
   alreadyReady:data.alreadyReady??null,winner:data.winner??null,trigger:data.trigger??null});},
  core(creative,event,data={}){record('core:'+event,{...identity(creative?.node),renderToken:creative?._renderToken??null,
   source:typeof data.source==='string'?data.source:null,currentTime:Number.isFinite(data.currentTime)?data.currentTime:null});},
  export(){return {schema:api.schema,qaOnly:true,enforce:false,arm,dropped,inflightAttemptId:inflight?.id??null,
   pendingAttempts:[...attempts.values()].map(a=>({id:a.id,failed:a.failed,settled:a.settled,drained:a.drained})),logs:logs.slice(),
   integration:safe(()=>root.IntextIntegrationQA.export())};},
 };
 record('assignment_fixed',{effectiveArm:arm});return Object.freeze(api);
});
