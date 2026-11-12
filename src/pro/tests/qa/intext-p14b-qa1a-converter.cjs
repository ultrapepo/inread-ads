'use strict';
// Offline JSON data conversion only. No acquisition, file I/O, runtime hooks or SDK imports.
const {createHash}=require('node:crypto');
const {Buffer}=require('node:buffer');
const D=require('./intext-p14b-data.cjs');
const E=require('./intext-p14b-shadow-evaluator.cjs');
const {createP14BLedgerV1}=require('./intext-p14b-shadow-ledger.cjs');
const V=require('./intext-p14b-qa1a-artifact-proof.cjs');
const {own,at,finite,integer}=D;
const LIMITS=Object.freeze({inputBytes:8*1024*1024,logs:10000,records:10000});
const ARTIFACTS=V.ARTIFACTS;
const hash=text=>createHash('sha256').update(text).digest('hex');
const pick=(x,keys)=>Object.fromEntries(keys.map(k=>[k,D.numberOrNull(own(x,k))]));
const rect=x=>{if(!D.record(x))return null;return pick(x,['left','top','width','height']);};
function originalField(value){
  if(value===undefined)return {type:'missing',value:null};
  if(value===null)return {type:'null',value:null};
  if(typeof value==='number')return {type:'number',value:finite(value)?value:null,
    numberState:finite(value)?Object.is(value,-0)?'-0':'finite':Number.isNaN(value)?'NaN':value>0?'Infinity':'-Infinity'};
  if(typeof value==='boolean')return {type:'boolean',value};
  if(typeof value==='string'){
    const safe=value.length<=96&&/^(?:[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?(?:px)?|auto|NaN|[-+]?Infinity)$/i.test(value);
    return {type:'string',value:safe?value:null,redacted:!safe,...(!safe?{sha256:hash(value)}:{})};
  }
  return {type:Array.isArray(value)?'array':'invalid-type',value:null};
}
function rectStatusV2(value){
  const rectPresent=D.record(value),rectComplete=rectPresent&&['left','top','width','height'].every(k=>finite(own(value,k)));
  return {rectPresent,rectComplete,rectUsable:rectComplete&&D.validRect(value)!==null,rect:rect(value),
    original:rectPresent?Object.fromEntries(['left','top','width','height','right','bottom'].map(k=>[k,originalField(own(value,k))])):originalField(value)};
}
const safeId=x=>D.localId(x)?x:null;
const count=x=>integer(x)?x:null;
const bool=x=>typeof x==='boolean'?x:null;
const STAGES=Object.freeze({'observer:attached':'after-player','player:ads-request':'post-request','core:revealed':'post-reveal'});
const BEFORE=new Set(['video_winner_resolved','video_prepare_started','video_prepare_ready','video_activation_eligible']);
// Exact event names emitted after attach's player guard in the frozen p13c producer.
// Unknown prefixes, caller-supplied stage and neighboring records confer no stage.
const AFTER=new Set(['observer:coverage','observer:closed','surface:mutation','document:visibilitychange',
  'core:video-player-prepared','core:first-frame','core:complete','core:destroy-entry','core:destroy-exit',
  'manager:identity','manager:subscribed','manager:coverage-missing','manager:subscription-missing','manager:subscription-failed','player:subscription-failed',
  ...['loadstart','loadedmetadata','loadeddata','canplay','play','playing','pause','seeking','seeked','ended','emptied','abort','error'].map(e=>'media:'+e),
  ...['loadstart','play','playing','pause','ended','contentended','contentresumed','contentloadstart','contentloadedmetadata','contentcanplay',
    'ads-request','ads-loader','ads-manager','adsready','readyforpreroll','adstart','ads-ad-started','adend','adended','adtimeout','nopreroll','adserror','alladscompleted','dispose']
    .flatMap(e=>e==='dispose'?['player:dispose']:['player:'+e,'player:'+e+':microtask']),
  ...['LOADED','STARTED','IMPRESSION','COMPLETE','ALL_ADS_COMPLETED','CONTENT_PAUSE_REQUESTED','CONTENT_RESUME_REQUESTED','PAUSED','RESUMED','SKIPPED','AD_ERROR']
    .flatMap(e=>['ima:'+e,'ima:'+e+':microtask'])]);
function stageV2(name,channel){
  return channel==='integration'?(own(STAGES,name)||(AFTER.has(name)?'after-player':'unknown')):BEFORE.has(name)?'before-player':'unknown';
}
const EVENT_NAMES=new Set(['observer:attached','observer:coverage','observer:closed','surface:mutation','document:visibilitychange',
  'core:video-player-prepared','core:first-frame','core:revealed','core:complete','core:destroy-entry','core:destroy-exit',
  'manager:identity','manager:subscribed','manager:coverage-missing','player:ads-request','player:adstart','player:playing','player:dispose',
  'media:playing','media:canplay','ima:STARTED','ima:IMPRESSION','ima:COMPLETE','ima:ALL_ADS_COMPLETED',
  'video_winner_resolved','intext_winner_resolved','video_prepare_started','video_prepare_ready','video_activation_eligible',
  'video_fetch_started','video_ima_request_sent','video_first_frame','video_player_revealed','video_complete','video_timeout',
  'display_request_started','display_slot_requested','display_reveal_eligible']);
const eventName=x=>EVENT_NAMES.has(x)?x:'other';
const candidates=()=>['B0','B1','B2','B3','B4','B5'].map(family=>({family,rectModelId:'player-measured-current-flow',
  parameters:family==='B2'?{areaFraction:0.25}:family==='B3'?{xFraction:1,yFraction:0.5}:{}}));
function armOf(x){
  if(own(x,'schema')!=='p14a-dependencies-v1')return null;
  const arm=own(x,'arm'),logs=D.items(own(x,'logs'),LIMITS.logs);
  if(!['E0','E1'].includes(arm)||!logs)return null;
  const fixed=logs.filter(e=>own(e,'event')==='assignment_fixed');
  if(fixed.length!==1||own(fixed[0],'effectiveArm')!==arm)return null;
  if(logs.some(e=>own(e,'event')==='assignment_conflict'||(own(e,'arm')!==undefined&&own(e,'arm')!==arm)))return null;
  return arm;
}
function cohortOf(runtime){
  if(own(runtime,'dualMode')===true&&own(runtime,'pspDetected')===true&&own(runtime,'randomSource')==='gpt-native-slot-targeting')return 'PSP';
  if(own(runtime,'dualMode')===false&&own(runtime,'pspDetected')===false&&own(runtime,'randomSource')==='gexp-owner-random')return 'Legacy';
  return 'unknown';
}
function parseInputV1(text,expectedSha256){
  if(typeof text!=='string'||Buffer.byteLength(text,'utf8')>LIMITS.inputBytes)throw new RangeError('qa1a_input_size_or_type');
  const sha256=hash(text);
  if(!D.hash(expectedSha256)||sha256!==expectedSha256)throw new Error('qa1a_source_hash_mismatch');
  const value=JSON.parse(text);if(!D.record(value))throw new TypeError('qa1a_plain_export_required');
  const kind=own(value,'schema')==='p14a-dependencies-v1'?'dependencies':own(value,'schema')==='p13c-integration-observe-v1'?'integration':
    own(value,'schemaVersion')==='1.0.0'&&D.record(own(value,'runtime'))?'debugger':null;
  if(!kind)throw new TypeError('qa1a_unsupported_schema');
  if(kind!=='debugger'&&(own(value,'qaOnly')!==true||own(value,'enforce')!==false))throw new TypeError('qa1a_non_observational_export');
  if(!D.items(own(value,'logs'),LIMITS.logs))throw new RangeError('qa1a_log_limit');
  return {value,kind,sha256};
}
// Correlate documents ONLY for metadata via >=2 exact diagnostic identities/timestamps.
// No clock offset, viewport, token, frame or geometry is copied across the two streams.
function metadataLinkV1(qa,debug){
  if(own(qa,'schema')!=='p14a-dependencies-v1'||own(debug,'schemaVersion')!=='1.0.0')return {matched:false,exactDiagnosticMatches:0};
  const q=D.items(own(qa,'logs'),LIMITS.logs),d=D.items(own(debug,'logs'),LIMITS.logs);if(!q||!d)return {matched:false,exactDiagnosticMatches:0};
  const signatures=new Set(q.filter(e=>integer(own(e,'cycleId'),1)&&finite(own(e,'timestamp'))&&safeId(own(e,'slotId')))
    .map(e=>JSON.stringify([own(e,'event'),own(e,'timestamp'),own(e,'slotId'),own(e,'cycleId'),own(e,'renderToken')])));
  const matches=new Set();
  for(const log of d){if(typeof own(log,'message')!=='string'||!own(log,'message').startsWith('[IntextMetrics]'))continue;
    for(const m of D.items(own(log,'args'),100)||[]){const key=JSON.stringify([own(m,'metric'),own(m,'timestamp'),own(m,'slotId'),own(m,'cycleId'),own(m,'renderToken')]);
      if(signatures.has(key))matches.add(key);}}
  return {matched:matches.size>=2,exactDiagnosticMatches:matches.size};
}
function metadata(value,kind,context,sourceSha256){
  const runtime=kind==='debugger'?own(value,'runtime'):own(context,'linkedRuntime');
  const arm=kind==='dependencies'?armOf(value):own(context,'metadataLinkVerified')===true?D.oneOf(own(context,'linkedArm'),['E0','E1']):null;
  const linked=kind==='debugger'||own(context,'metadataLinkVerified')===true;
  const artifact=own(context,'artifact');
  const checked=V.resolveHarProofV2(own(context,'artifactProof'),sourceSha256,arm,artifact);
  return {arm,cohort:linked?cohortOf(runtime):'unknown',version:linked&&typeof own(runtime,'gexpIntextVersion')==='string'
    &&/^[A-Za-z0-9._-]{1,96}$/.test(own(runtime,'gexpIntextVersion'))?own(runtime,'gexpIntextVersion'):null,
    distribution:checked?.distribution??null,coreSha256:checked?.coreSha256??null,
    servedSha256:checked?.servedSha256??null,artifactEvidenceSha256:checked?.evidenceSha256??null,
    artifactProvenance:{status:checked?'local-bytes-verified':artifact?'attestation-not-corroborated':'unknown',
      runnerAttestationPresent:!!artifact,externalIndependentAudit:'not-performed',receiptFlagIsProof:false}};
}
function convertExportV1({text,expectedSha256,context={}}){
  const parsed=parseInputV1(text,expectedSha256),{value,kind,sha256}=parsed;
  if(!D.record(context)||!safeId(own(context,'captureLocalId')))throw new TypeError('qa1a_capture_namespace_required');
  const meta=metadata(value,kind,context,sha256),records=[],losses=[];
  const documentLocalId='doc'+sha256.slice(0,24); // Export namespace, NOT an asserted live document identity.
  const topDropped=kind==='debugger'?at(value,'debugger','droppedEntries'):own(value,'dropped');
  if(!integer(topDropped)||topDropped>0)losses.push('source-dropped-or-unknown');
  let lastMonotonic=null;
  function add(row,pointer,channel,outer=null){
    if(records.length>=LIMITS.records)throw new RangeError('qa1a_record_limit');
    const snapshot=own(row,'snapshot'),integrated=channel==='integration',metric=channel==='debugger';
    const name=integrated?own(row,'event'):own(row,'metric')||own(row,'event');
    const epoch=own(row,'timestamp'),mono=integrated||channel==='dependencies'?own(row,'monotonicMs'):undefined;
    const monotonicValid=finite(mono)&&mono>=0,regression=monotonicValid&&lastMonotonic!==null&&mono<lastMonotonic;
    if(monotonicValid)lastMonotonic=mono;
    const readiness=integrated?own(snapshot,'readiness'):null;
    const factualC0=typeof own(readiness,'eligible')==='boolean'?own(readiness,'eligible'):null;
    // No inference from stage name, reason=visible, STARTED, success, geometry or later frame.
    const token=count(own(row,'renderToken')),active=count(own(row,'activeRenderToken'));
    const scope=integrated&&integer(own(snapshot,'playerId'),1)?'video':metric&&['video','display'].includes(own(row,'format'))?own(row,'format'):'opportunity';
    const destroyed=own(snapshot,'destroyed')===true;
    const state=destroyed?'terminal':active!==null&&token!==null&&active!==token?'stale':'live';
    const stage=stageV2(name,channel);
    const player=integrated?own(snapshot,'playerSurface'):null,playerRect=rectStatusV2(own(player,'rect')),p=playerRect.rect;
    const reasons=['live-document-navigation-anchor-fetch-not-accredited','factual-population-coverage-incomplete'];
    if(factualC0===null)reasons.push('no-direct-readiness-boolean');
    if(regression)reasons.push('monotonic-regression');
    if(!monotonicValid)reasons.push('page-monotonic-clock-missing');
    if(integrated)reasons.push('synchronized-viewport-and-Q1-Q5-missing');
    if(!meta.distribution)reasons.push('distribution-not-accredited');
    if(stage==='unknown')reasons.push('temporal-stage-not-accredited');
    if(playerRect.rectPresent&&!playerRect.rectUsable)reasons.push('player-rect-not-usable');
    const sample={schemaVersion:D.SCHEMA,contractRevision:'r2',scope,source:{consistent:!regression},
      identity:{documentLocalId,navigationLocalId:metric&&integer(own(row,'navIndex'))?'nav'+own(row,'navIndex'):null,
        slotLocalId:safeId(own(row,'slotId')),anchorLocalId:null,cycleId:count(own(row,'cycleId')),
        fetchGeneration:null,renderToken:token,activeRenderToken:active,verified:false,state},
      stage,sourceClock:monotonicValid?'page-monotonic-ms':null,monotonicMs:monotonicValid?mono:null,
      sampleSequence:count(own(row,'sequence')),layoutRevision:null,
      provenance:{distribution:meta.distribution,coreSha256:meta.coreSha256,cssModelVersion:null,configVersion:null},
      control:{observed:factualC0!==null,reliable:factualC0!==null,eligible:factualC0},
      viewport:{width:null,height:metric?D.numberOrNull(own(row,'viewportHeight')):null,revision:null,coordinateSpace:'layout-css-px'},
      coverage:{leftCensored:true,sourceGap:losses.length>0||regression},
      plannedRegions:p?[{modelId:'player-measured-current-flow',modelVersion:'1',quality:'partial',rect:p,
        context:{stage,coordinateSpace:'layout-css-px'},evidence:{existingObject:'player',wrapperConnected:bool(own(player,'connected'))}}]:[]};
    const facts={};
    // A metric fetch/winner is retained as a source fact, but cannot repair missing identity.
    if(name==='video_fetch_started')facts.fetchObserved=true;
    if(name==='video_winner_resolved')facts.initialWinner='video';
    else if(name==='intext_winner_resolved'&&['video','display','none'].includes(own(row,'winnerFormat')))facts.initialWinner=own(row,'winnerFormat');
    const nativeIdentity=integrated&&integer(own(snapshot,'managerId'),1)&&token!==null&&token===active&&own(row,'tokenMatches')===true;
    if(name==='ima:IMPRESSION'&&nativeIdentity)facts.impressionObserved=true;
    // Legacy exports lack decoded/presented-frame metadata and complete binding identities.
    // Never forward their core:first-frame, media:playing or SDK events as facts.frame.
    const evidence={pointer,channel,event:eventName(name),sourceSequence:count(own(row,'sequence')),
      epochMs:finite(epoch)?epoch:null,outerEpochMs:finite(own(outer,'timestamp'))?own(outer,'timestamp'):null,
      temporalQuality:regression?'regression':monotonicValid?'page-monotonic-observed':finite(epoch)?'epoch-only':'unknown',
      factualC0,readinessReason:D.oneOf(own(readiness,'reason'),['visible','below','above','hidden','passed','unknown']),
      anchorRect:rect(integrated?own(snapshot,'readinessAnchorRect'):own(row,'readinessAnchorRect')),
      anchorIntersectionRatio:D.numberOrNull(integrated?own(readiness,'intersectionRatio'):own(row,'readinessIntersectionRatio')),
      documentVisibility:D.oneOf(integrated?own(snapshot,'documentVisibility'):own(row,'documentVisibility'),['visible','hidden','prerender']),
      observedManagerId:integrated?count(own(snapshot,'managerId')):null,
      observedAdMediaId:integrated?count(own(snapshot,'observedAdMediaId')):null,
      nativeImpressionObserved:facts.impressionObserved===true,frameAttribution:'unknown',
      perceptibility:'unknown',geometryStage:stage,geometryQuality:p?'partial':'unknown',playerRect,
      stageEvidence:{status:stage==='unknown'?'unknown':'producer-event-map-v2',
        producer:stage==='unknown'?null:integrated?'p13c-integration-observe-v1':'p14a-readiness-metrics'},
      identityQuality:'partial',unknownReasons:reasons};
    records.push({sample,facts,evidence,results:candidates().map(c=>E.evaluateP14BShadowV1(sample,c))});
  }
  const logs=own(value,'logs');
  if(kind==='integration')logs.forEach((row,i)=>add(row,`/logs/${i}`,'integration'));
  else if(kind==='debugger')logs.forEach((outer,i)=>{
    if(typeof own(outer,'message')!=='string'||!own(outer,'message').startsWith('[IntextMetrics]'))return;
    const args=D.items(own(outer,'args'),100);
    if(!args){if(!losses.includes('debugger-metric-args-unavailable'))losses.push('debugger-metric-args-unavailable');return;}
    args.forEach((m,j)=>{if(typeof own(m,'metric')==='string')add(m,`/logs/${i}/args/${j}`,'debugger',outer);});
  });
  else{
    logs.forEach((row,i)=>{if(safeId(own(row,'slotId')))add(row,`/logs/${i}`,'dependencies');});
    const integration=own(value,'integration');
    if(own(integration,'schema')==='p13c-integration-observe-v1'&&own(integration,'qaOnly')===true&&own(integration,'enforce')===false){
      if(!integer(own(integration,'dropped'))||own(integration,'dropped')>0)losses.push('integration-dropped-or-unknown');
      const ilogs=D.items(own(integration,'logs'),LIMITS.logs);if(!ilogs)throw new RangeError('qa1a_integration_log_limit');
      lastMonotonic=null;ilogs.forEach((row,i)=>add(row,`/integration/logs/${i}`,'integration'));
    }else losses.push('integration-missing-or-unsupported');
  }
  const ledger=createP14BLedgerV1({documentLocalId,candidates:candidates(),sourceClock:'page-monotonic-ms'});
  if(losses.length)for(const r of records)r.sample.coverage.sourceGap=true;
  // These schemas cannot prove full QA0 identity. Do not turn rejected rows into opportunities.
  ledger.markGap('all'); // No invented capture end/clock: its window remains unknown.
  const partitionKey=JSON.stringify([own(context,'captureLocalId'),sha256,meta.cohort,meta.arm,meta.distribution,meta.version]);
  return {schema:'p14b-qa1a-conversion-v1',qaOnly:true,enforce:false,source:{sha256,kind,bytes:Buffer.byteLength(text),
    captureLocalId:own(context,'captureLocalId'),partitionKey,...meta,losses,topDropped:count(topDropped)},records,
    accounting:{status:'coverage-insufficient',windowQuality:'unknown',notAdmittedToLedger:records.length,ledger:ledger.exportManual()},
    limits:{...LIMITS},guarantees:{prePlayerReconstruction:false,frameProof:false,exactRates:false,continuousScroll:false}};
}
module.exports={LIMITS,ARTIFACTS,hash,rectStatusV2,stageV2,parseInputV1,armOf,cohortOf,metadataLinkV1,convertExportV1};
