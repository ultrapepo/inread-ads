'use strict';
// Offline evidence only. Never loads a browser, SDK, ad tag, or URL from a capture.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const numeric=value=>typeof value==='number'&&Number.isFinite(value);
const delta=(start,end)=>numeric(start)&&numeric(end)?end-start:null;
const median=values=>{const a=values.filter(numeric).sort((a,b)=>a-b),n=a.length;return n?(a[(n-1)>>1]+a[n>>1])/2:null;};
const first=(logs,event)=>logs.find(e=>e.event===event)??null;
const time=e=>numeric(e?.timestamp)?e.timestamp:null;
function intervalOverlap(intervals){
 if(intervals.length!==2||intervals.some(i=>!numeric(i.start)||!numeric(i.end)))return null;
 return Math.max(0,Math.min(...intervals.map(i=>i.end))-Math.max(...intervals.map(i=>i.start)));
}
function auditPluginSource(text){return {bytes:Buffer.byteLength(text),sha256:hash(text),
 sdkCallBeforeAdsRequestEvent:/\.adsLoader\.requestAds\([^)]*\)[,;]\s*this\.controller\.playerWrapper\.vjsPlayer\.trigger\(\{\s*type:\s*['"]ads-request['"]/.test(text),
 defaultRequestModeOnLoad:/requestMode\s*:\s*['"]onLoad['"]/.test(text)};}
function metrics(debug){return (debug.logs||[]).filter(l=>l.message?.startsWith('[IntextMetrics]')).flatMap(l=>
 (l.args||[]).filter(a=>a&&typeof a==='object'&&typeof a.metric==='string').map(a=>({...a,event:a.metric,outerLogTimestamp:l.timestamp})));}
function eventView(e){if(!e)return null;const s=e.snapshot;
 return {event:e.event,timestamp:e.timestamp,monotonicMs:e.monotonicMs??null,renderToken:e.renderToken??null,activeRenderToken:e.activeRenderToken??null,
  tokenMatches:e.tokenMatches??null,documentVisibility:s?.documentVisibility??e.documentVisibility??null,
  readiness:s?.readiness?{eligible:s.readiness.eligible,reason:s.readiness.reason,intersectionRatio:s.readiness.intersectionRatio,distancePx:s.readiness.distancePx}:null,
  wrapper:s?.videoSurface?{hasBox:s.videoSurface.hasBox,height:s.videoSurface.rect?.height??null,opacity:s.videoSurface.opacity}:null,
  inAdMode:s?.adState?.inAdMode??null,inAdBreak:s?.adState?.inAdBreak??null,playerId:s?.playerId??null,managerId:s?.managerId??null};
}
function harView(entry,index){
 const url=new URL(entry.request.url),content=entry.response?.content||{},text=typeof content.text==='string'?(content.encoding==='base64'?Buffer.from(content.text,'base64').toString('utf8'):content.text):null;
 const xml=text&&/<VAST\b/i.test(text)?text:null;
 return {entryIndex:index,hostname:url.hostname,pathname:url.pathname,output:url.searchParams.get('output'),
  startedAt:Date.parse(entry.startedDateTime),durationMs:entry.time,responseEndAt:Date.parse(entry.startedDateTime)+entry.time,status:entry.response?.status,
  timings:entry.timings,xml:xml?{bytes:Buffer.byteLength(xml),sha256:hash(xml),inlineCount:(xml.match(/<InLine\b/gi)||[]).length,
   wrapperCount:(xml.match(/<Wrapper\b/gi)||[]).length,vastAdTagUriCount:(xml.match(/<VASTAdTagURI\b/gi)||[]).length}:null,
  responseBodyCaptured:typeof content.text==='string',networkErrorOrNoHttpResponse:entry.response?.status===0||!!entry._error,
  cancelled:null,cancellationCauseKnown:false,
  note:'HAR startedDateTime includes queue/blocked/connection; not a wire-send timestamp. Query, bodies, headers, identities and initiator stacks omitted.'};
}
function analyzeSession({id,qa,debug,har,slotId='gexp-intext'}){
 const winner=(qa.logs||[]).find(e=>e.slotId===slotId&&e.event==='video_winner_resolved');if(!winner)throw Error(id+': no video winner');
 const cycleId=winner.cycleId,q=(qa.logs||[]).filter(e=>e.slotId===slotId&&e.cycleId===cycleId);
 const integration=(qa.integration?.logs||[]).filter(e=>e.slotId===slotId&&e.cycleId===cycleId);
 const m=metrics(debug),cycle=m.filter(e=>e.slotId===slotId&&e.cycleId===cycleId);
 const metric=name=>first(cycle,name),integrated=name=>first(integration,name);
 const activation=first(q,'video_activation_started'),request=first(q,'video_ima_request_sent'),adRequest=integrated('player:ads-request'),loader=integrated('player:ads-loader');
 const frame=integrated('core:first-frame'),manager=integrated('player:ads-manager'),timeout=integrated('core:timeout');
 const depsStart=(qa.logs||[]).find(e=>e.event==='dependencies_started'&&e.timestamp>=winner.timestamp);
 const attempt=(qa.logs||[]).filter(e=>e.attemptId===depsStart?.attemptId),depsReady=first(attempt,'dependencies_ready');
 const branches=attempt.filter(e=>e.event==='branch_ready').map(e=>({branch:e.branch,durationMs:e.durationMs}));
 const branchIntervals=branches.map(b=>({branch:b.branch,start:time(attempt.find(e=>e.event==='branch_started'&&e.branch===b.branch)),end:time(attempt.find(e=>e.event==='branch_ready'&&e.branch===b.branch))}));
 const initWindowEnd=time(integrated('core:video-player-prepared'))??time(timeout)??time(frame)??Infinity;
 const initLog=activation?(debug.logs||[]).find(e=>e.timestamp>=activation.timestamp&&e.timestamp<=initWindowEnd&&/Initializing IMA immediately after Video\.js/.test(e.message)):null;
 const advertisingTimeout=metric('video_advertising_timeout');
 const allHar=(har.log?.entries||[]).map(harView),vast=allHar.filter(e=>/^xml_vast/i.test(e.output||''));
 const primaryCandidates=activation?vast.filter(e=>e.startedAt>=activation.timestamp&&e.startedAt<=(time(timeout)??time(frame)??time(manager)??Infinity)):[];
 const primaryVast=primaryCandidates.length===1?primaryCandidates[0]:null;
 const result=timeout?'timeout':integrated('ima:COMPLETE')?'complete':'unknown';
 const fallback=timeout?m.find(e=>e.slotId===slotId&&e.event==='display_fallback_started'&&e.timestamp>=time(timeout)):null;
 const displayCycle=fallback?.cycleId??null;
 const display=displayCycle===null?[]:m.filter(e=>e.slotId===slotId&&e.cycleId===displayCycle);
 const displayFirst=name=>first(display,name),displayRequest=displayFirst('display_request_started'),displayRequested=displayFirst('display_slot_requested');
 const rendered=displayFirst('display_slot_render_ended'),opened=displayFirst('display_wrapper_opened');
 const timeoutIndex=integration.indexOf(timeout),beforeTimeout=timeoutIndex<0?[]:integration.slice(0,timeoutIndex).filter(e=>!e.event.endsWith(':microtask'));
 const timeoutAt=time(advertisingTimeout)??time(timeout),activationAt=time(activation),initAt=initLog?.timestamp??null;
 const successfulSummary=(debug.summary?.slotsAndCycles||[]).find(s=>s.slotId===slotId&&s.cycleId===cycleId&&s.renderToken===adRequest?.renderToken);
 const offsets=integration.filter(e=>numeric(e.monotonicMs)&&numeric(e.timestamp)).map(e=>e.timestamp-e.monotonicMs);
 return {id,arm:qa.arm,slotId,cycleId,renderToken:adRequest?.renderToken??null,result,runtime:debug.runtime,
  coverage:{qaDropped:qa.dropped,integrationDropped:qa.integration?.dropped,debuggerDroppedEntries:debug.debugger?.droppedEntries??null,activeObservers:qa.integration?.activeObservers,
   observerSnapshots:integration.length,observerBuildTotalMs:integration.reduce((n,e)=>n+(numeric(e.observerBuildMs)?e.observerBuildMs:0),0),
   observerBuildMaxMs:Math.max(0,...integration.map(e=>e.observerBuildMs||0)),
   clockOffsetSpanMs:offsets.length?Math.max(...offsets)-Math.min(...offsets):null,
   harEntries:allHar.length,allHarGamOnly:allHar.every(e=>e.pathname==='/gampad/ads'),vastEntries:vast.length,
   harVastCorrelation:primaryVast?'sole-captured-vast-in-initial-activation-window':'none-or-ambiguous',
   requestCallProof:'Pinned videojs-ima 1.11.0 emits ads-request after AdsLoader.requestAds returns. Actual plugin response bytes not in these filtered HARs.'},
  stages:{winner:time(winner),dependenciesStarted:time(depsStart),dependenciesReady:time(depsReady),prepared:time(first(q,'video_prepare_ready')),
   activation:activationAt,playerAttached:time(integrated('observer:attached')),imaInitLog:initAt,imaPluginReturned:time(integrated('core:video-player-prepared')),
   adsLoader:time(loader),sdkRequestReturnedProxy:time(adRequest),imaRequestMetric:time(request),harVastStart:primaryVast?.startedAt??null,
   harVastEnd:primaryVast?.responseEndAt??null,adsManager:time(manager),adsready:time(integrated('player:adsready')),
   readyforpreroll:time(integrated('player:readyforpreroll')),adstart:time(integrated('player:adstart')),firstFrame:time(frame),
   nativeStarted:time(integrated('ima:STARTED')),nativeImpression:time(integrated('ima:IMPRESSION')),reveal:time(integrated('core:revealed')),
   nativeComplete:time(integrated('ima:COMPLETE')),advertisingTimeout:timeoutAt,timeoutProbe:time(timeout),destroy:time(integrated('core:destroy-entry'))},
  dependencyResources:attempt.filter(e=>e.event==='resource_started').map(start=>{
   const ready=attempt.find(e=>e.event==='resource_ready'&&e.resource===start.resource),rt=ready?.timing;
   return {resource:start.resource,alreadyAvailable:start.alreadyAvailable,existingScript:start.existingScript,
    apiReady:!!ready,elapsedMs:ready?.durationMs??null,resourceTiming:rt?{
     requestScope:rt.requestScope,durationMs:rt.duration,ttfbMs:rt.ttfbMs,receiveMs:rt.receiveMs,transferSize:rt.transferSize,encodedBodySize:rt.encodedBodySize,
     responseEndToReadyCallbackMs:numeric(ready.monotonicMs)&&numeric(rt.responseEnd)?ready.monotonicMs-rt.responseEnd:null,
     scriptEvaluationCpuMs:null,blockedMs:null,note:'Response-end to callback includes evaluation, event scheduling and QA bookkeeping; not pure CPU.'}:null};
  }),
  durations:{dependenciesTotalMs:delta(time(depsStart),time(depsReady)),branches,branchIntervals,branchOverlapObservedMs:intervalOverlap(branchIntervals),
   branchOverlapProxyMs:branches.length===2?(qa.arm==='E1'?Math.min(...branches.map(b=>b.durationMs)):0):null,
   winnerToDependenciesReadyMs:delta(time(winner),time(depsReady)),winnerToPreparedMs:delta(time(winner),time(first(q,'video_prepare_ready'))),
   prepareDependencyWaitMs:first(q,'video_dependencies_ready')?.dependenciesWaitMs??null,
   residualDependenciesWaitMs:first(q,'activation_dependencies_ready')?.residualDependenciesWaitMs??null,
   winnerToAdsManagerMs:delta(time(winner),time(manager)),winnerToFirstFrameMs:delta(time(winner),time(frame)),
   activationToFirstFrameMs:delta(activationAt,time(frame)),adsLoaderToRequestEventMs:delta(time(loader),time(adRequest)),
   requestMetricToHarStartMs:delta(time(request),primaryVast?.startedAt),harResponseToAdsManagerMs:delta(primaryVast?.responseEndAt,time(manager)),
   requestMetricToAdsManagerMs:delta(time(request),time(manager)),firstFrameToRevealMs:delta(time(frame),time(integrated('core:revealed'))),
   activationToTimeoutMs:delta(activationAt,timeoutAt),requestEventToTimeoutMs:delta(time(adRequest),timeoutAt)},
  timeout:timeout?{lastObservedBeforeTimeout:eventView(beforeTimeout.at(-1)),lastLifecycleEventBeforeTimeout:eventView(beforeTimeout.filter(e=>!e.event.startsWith('surface:')).at(-1)),
   atTimeout:eventView(timeout),allObservedTokensValid:integration.filter(e=>e.timestamp<=timeout.timestamp).every(e=>e.tokenMatches===true),
   documentVisibilityChanges:integration.filter(e=>e.event==='document:visibilitychange').map(eventView),
   recoveryEvents:q.filter(e=>/video_(recovery|activation_(deferred|cancelled))/.test(e.event)).map(e=>({event:e.event,timestamp:e.timestamp})),
   driftProxyMs:{sinceActivationMinus25000:numeric(activationAt)&&numeric(timeoutAt)?timeoutAt-activationAt-25000:null,sincePrePluginInitMinus25000:numeric(initAt)&&numeric(timeoutAt)?timeoutAt-initAt-25000:null,
    exactDriftKnown:false,note:'Arm and callback entry not logged. Approximate bounds include core/telemetry work; durationMs=25000 is configured, not measured.'}}:null,
  snapshots:{request:eventView(adRequest),frame:eventView(frame),nativeImpression:eventView(integrated('ima:IMPRESSION')),reveal:eventView(integrated('core:revealed')),
   debuggerFrame:metric('video_first_frame')?{wrapperIntersectionRatio:metric('video_first_frame').wrapperIntersectionRatio,intersectionRatio:metric('video_first_frame').intersectionRatio}:null,
   debuggerFlags:successfulSummary?.flags??null},
  vast:primaryVast,otherHar:Object.fromEntries([['maxConnectMs','connect'],['maxSslMs','ssl']].map(([name,key])=>{
   const values=allHar.filter(e=>e!==primaryVast).map(e=>e.timings?.[key]).filter(n=>numeric(n)&&n>=0);return [name,values.length?Math.max(...values):null];
  })),
  fallback:fallback?{cycleId:displayCycle,renderToken:fallback.renderToken,start:time(fallback),request:time(displayRequest),slotRequested:time(displayRequested),
   render:time(rendered),open:time(opened),gamFilled:rendered?.gamFilled??null,
   timeoutToFallbackMs:delta(timeoutAt,time(fallback)),fallbackToRequestMs:delta(time(fallback),time(displayRequest)),requestToSlotRequestedMs:delta(time(displayRequest),time(displayRequested)),
   slotRequestedToRenderMs:delta(time(displayRequested),time(rendered)),renderToOpenMs:delta(time(rendered),time(opened)),timeoutToOpenMs:delta(timeoutAt,time(opened))}:null,
  subsequentDisplay: m.filter(e=>e.slotId===slotId&&e.event==='display_waterfall_result'&&e.cycleId!==cycleId).map(e=>{
   const sameCycle=m.filter(a=>a.slotId===slotId&&a.cycleId===e.cycleId&&a.renderToken===e.renderToken),render=first(sameCycle,'display_slot_render_ended');
   const noFillLogObserved=(debug.logs||[]).some(l=>Math.abs(l.timestamp-e.timestamp)<50&&l.message.includes('[Intext:Slot:'+slotId+']')&&l.message.includes('GAM Display: NO-FILL'));
   return {cycleId:e.cycleId,renderToken:e.renderToken,timestamp:e.timestamp,resultFilled:e.filled??null,
    gamFilled:render?.gamFilled??(noFillLogObserved?false:null),noFillLogObserved,isFallback:e.isFallback,
    requestToWaterfallMs:delta(time(first(sameCycle,'display_request_started')),e.timestamp)};
  }),
  observations:integration.filter(e=>/^(player:|ima:|core:)/.test(e.event)&&!e.event.endsWith(':microtask')).map(eventView)};
}
function summarize(sessions){return ['E0','E1'].map(arm=>{
 const group=sessions.filter(s=>s.arm===arm),completed=group.filter(s=>s.result==='complete'),timeouts=group.filter(s=>s.result==='timeout');
 const med=key=>median(group.map(s=>s.durations[key]));
 return {arm,attempts:group.length,completed:completed.length,timeouts:timeouts.length,timeoutPercent:group.length?100*timeouts.length/group.length:null,
  dependenciesTotalMedianMs:med('dependenciesTotalMs'),branchOverlapProxyMedianMs:med('branchOverlapProxyMs'),branchOverlapObservedMedianMs:med('branchOverlapObservedMs'),winnerToDependenciesReadyMedianMs:med('winnerToDependenciesReadyMs'),
  winnerToAdsManagerMedianMsAmongObserved:med('winnerToAdsManagerMs'),winnerToFirstFrameMedianMsAmongObserved:med('winnerToFirstFrameMs'),
  activationToFirstFrameMedianMsAmongObserved:med('activationToFirstFrameMs'),requestMetricToAdsManagerMedianMsAmongObserved:med('requestMetricToAdsManagerMs'),
  observedFrameCount:completed.filter(s=>s.snapshots.frame).length,anchorEligibleAtFrame:completed.filter(s=>s.snapshots.frame?.readiness?.eligible===true).length,
  anchorIneligibleAtFrame:completed.filter(s=>s.snapshots.frame?.readiness?.eligible===false).length,
  fallbackFilled:timeouts.filter(s=>s.fallback?.gamFilled===true).length,
  note:'Small nonrandomized captures; medians among observed milestones exclude timeouts. No causal or commercial improvement inferred.'};
 });}
function analyzeDirectory(directory=path.join(os.homedir(),'Downloads')){
 const inputs=[],read=name=>{const bytes=fs.readFileSync(path.join(directory,name));inputs.push({file:name,bytes:bytes.length,sha256:hash(bytes)});return JSON.parse(bytes);};
 const sessions=[];for(const arm of ['E0','E1'])for(let n=1;n<=(arm==='E0'?4:6);n++){
  const id=arm+'-'+n,debugName=fs.readdirSync(directory).find(f=>f.startsWith('gexp-intext-debug_')&&f.endsWith('-'+id+'.json'));
  if(!debugName)throw Error('Missing debugger '+id);
  sessions.push(analyzeSession({id,qa:read(id+'.json'),debug:read(debugName),har:read('www.marca.com-mobile '+id+'.har')}));
 }
 const report='Informe_P14A_E0_vs_E1_Marca_mobile_2026-10-22.md',bytes=fs.readFileSync(path.join(directory,report));inputs.push({file:report,bytes:bytes.length,sha256:hash(bytes)});
 let historicalPluginReference=null;
 const referenceName='www.marca.com-observe.har',referenceFile=path.join(directory,referenceName);
 if(fs.existsSync(referenceFile)){
  const bytes=fs.readFileSync(referenceFile),har=JSON.parse(bytes);
  const candidates=har.log.entries.filter(e=>/videojs-ima\/1\.11\.0\/videojs\.ima/.test(e.request.url)).map(e=>{
   const content=e.response?.content||{};return content.encoding==='base64'?Buffer.from(content.text||'','base64').toString('utf8'):content.text||'';
  }).map(auditPluginSource).filter(a=>a.sdkCallBeforeAdsRequestEvent);
  historicalPluginReference={file:referenceName,sha256:hash(bytes),bodies:candidates,currentCaptureBodyVerified:false,
   meaning:'Earlier supplied HAR verifies the pinned plugin contract, not bytes loaded on 22/10. Do not substitute it for current HAR/Performance.'};
 }
 return {schema:'p14a2-offline-evidence-v1',qaOnly:true,enforce:false,sourceDate:'2026-10-22',inputs,historicalPluginReference,sessions,summary:summarize(sessions)};
}
module.exports={analyzeSession,analyzeDirectory,summarize,median,delta,eventView,harView,intervalOverlap,auditPluginSource};
if(require.main===module){const result=analyzeDirectory(process.argv[2]),out=path.resolve(__dirname,'../../docs/intext-p14a2-evidence.json');fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result.summary,null,2));}
