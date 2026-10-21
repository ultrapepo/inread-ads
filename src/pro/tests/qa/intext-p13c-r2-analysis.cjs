'use strict';
// Offline/read-only input analysis. No import from, or hook into, production.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const pairs=[
 ['desktop-observe','observe desktop 1.json','15-17-48-482Z'],
 ['mobile-observe-1','mobile observe 1.json','15-20-01-333Z'],
 ['mobile-observe-2','mobile observe 2.txt','15-21-55-054Z','www.marca.com-observe.har'],
 ['desktop-shadow','desktop shadow 1.json','15-25-09-504Z'],
 ['mobile-shadow-1','mobile shadow 1.json','15-28-21-746Z'],
 ['mobile-shadow-2','mobile shadow 2.txt','15-29-48-910Z'],
 ['mobile-shadow-3','mobile shadow 3.json','15-31-07-292Z','www.marca.com-shadow.har'],
];
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const percentile=(values,p)=>values.length?values[Math.max(0,Math.ceil(p*values.length)-1)]:null;
const distribution=values=>{const v=values.filter(Number.isFinite).sort((a,b)=>a-b);return {count:v.length,sum:v.reduce((a,b)=>a+b,0),p50:percentile(v,.5),p95:percentile(v,.95),max:v.at(-1)??null};};
const epoch=value=>typeof value==='number'?value:Date.parse(value);
const route=value=>{try{const u=new URL(value);return {host:u.hostname,path:u.pathname};}catch{return null;}};
const shape=value=>({hb_pb:value?.hb_pb??null,hb_bidder:value?.hb_bidder??null,hb_adid:value?.hb_adid??null,hb_format:value?.hb_format??null});
const targetingHash=value=>sha(JSON.stringify(Object.entries(value).sort(([a],[b])=>a.localeCompare(b))));
function inspectDummy(file,suppliedSource) {
 const source=suppliedSource??fs.readFileSync(file,'utf8'),start=source.indexOf('  createVideoElement() {'),end=source.indexOf('  initVideoJS()',start);
 const base64=/data:video\/mp4;base64,([A-Za-z0-9+/=]+)/.exec(source.slice(start,end))?.[1];if(!base64)throw Error('Missing current dummy source');
 const bytes=Buffer.from(base64,'base64'),boxes=[];let offset=0;
 while(offset+8<=bytes.length){const size=bytes.readUInt32BE(offset),type=bytes.toString('ascii',offset+4,offset+8);
  boxes.push({offset,type,declaredSize:size,end:offset+size,available:bytes.length-offset,truncated:offset+size>bytes.length});
  if(size<8||offset+size>bytes.length)break;offset+=size;
 }
 return {file,sourceSha256:sha(source),dummySha256:sha(bytes),byteLength:bytes.length,boxes,
  asciiMdatFound:bytes.includes(Buffer.from('mdat')),note:'Static container bounds inspection, not a codec or browser playback test.'};
}
function analyze(directory) {
 const manifest=[],load=name=>{const bytes=fs.readFileSync(path.join(directory,name));manifest.push({name,bytes:bytes.length,sha256:sha(bytes)});return JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/,''));};
 const output={schema:'intext-p13c-r2-offline-v1',clock:'QA offsets use Date.now relative to ads-request; monotonic retained separately. Not HTTP time.',
  production:['./_gam_kv_.js','./IntextManager.js'].map(file=>inspectDummy(file)),sessions:[],inputs:manifest};
 for(const [id,qaName,suffix,harName]of pairs) {
  const debugName='gexp-intext-debug_marca.com_6e313bd494389c954dfc9e81_2026-10-19T'+suffix+'.json';
  const qa=load(qaName),debug=load(debugName),logs=qa.logs;
  const attach=logs.find(e=>e.event==='qa_probe_attached');if(!attach)throw Error(id+': missing creative identity');
  const same=e=>e.slotId===attach.slotId&&e.cycleId===attach.cycleId&&e.renderToken===attach.renderToken;
  const creative=logs.filter(same),request=creative.find(e=>e.event==='ads-request');if(!request)throw Error(id+': missing request');
  const dbg=debug.logs.map(e=>{const data=e.args?.find(a=>a&&typeof a==='object')??{};return {sequence:e.sequence,epochMs:epoch(e.timestamp),elapsedMs:e.elapsedMs,message:e.message,data};});
  const dbgCreative=dbg.filter(e=>same(e.data));
  const metric=name=>dbgCreative.find(e=>e.data.metric===name),qaEvent=name=>creative.find(e=>e.event===name);
  const frame=metric('video_first_frame'),activation=metric('video_activation_started');
  if(!frame||!activation||!Number.isFinite(frame.epochMs)||!Number.isFinite(activation.epochMs)
    ||!Number.isFinite(qaEvent('first-frame')?.timestamp)||Math.abs(frame.epochMs-qaEvent('first-frame').timestamp)>100)throw Error(id+': pair identity/time mismatch');
  const eventRow=e=>({event:e.event,requestOffsetMs:e.timestamp-request.timestamp,monotonicOffsetMs:Number.isFinite(e.monotonicMs)?e.monotonicMs-request.monotonicMs:null,
   deviceEffective:e.deviceEffective??null,deviceSource:e.deviceSource??null,mode:e.mode??null,managerId:e.managerId??null,managerEpoch:e.managerEpoch??null,
   impressionSubscribed:e.impressionSubscribed??null,managerOwnershipAmbiguous:e.managerOwnershipAmbiguous??null,
   api:e.api??null,source:e.source??null,mediaIdentity:e.mediaIdentity??null,error:e.error??null,stack:e.stack??null,
   budgetArmed:e.budgetArmed??null,deadlineAt:e.deadlineAt??null,expiration:e.expiration??null,cancelBlockedReason:e.cancelBlockedReason??null,cancelConditions:e.cancelConditions??null,
   actualElapsedMs:e.actualElapsedMs??null,timerDriftMs:e.timerDriftMs??null,snapshot:e.snapshot?{...e.snapshot,
    media:e.snapshot.media?{...e.snapshot.media,
      currentSrc:/^https?:/.test(e.snapshot.media.currentSrc??'')?'[HTTP media URL hashed]':e.snapshot.media.currentSrc,
      mediaResourceHash:/^https?:/.test(e.snapshot.media.currentSrc??'')?sha(e.snapshot.media.currentSrc):null}:null}:null});
  const eventNames=new Set(['qa_probe_attached','videojs-init-called','player-created','ima-init-returned','ads-loader','ads-request','player-api','loadstart','native-media-loadstart','play','play-after-dispatch','pause',
   'native-media-error','qa_budget_armed','qa_budget_not_armed','qa_budget_expired','qa_budget_cancel_blocked','qa_manager_subscription','ads-manager','adsready','adsready-after-dispatch',
   'readyforpreroll','readyforpreroll-after-dispatch','manager-api','native-LOADED','adstart','first-frame','native-IMPRESSION','native-STARTED','native-PAUSED','native-RESUMED','revealed',
   'native-COMPLETE','adend','core-complete','native-ALL_ADS_COMPLETED','qa_probe_disposed']);
  const session={id,qaName,debugName,harName:harName??null,identity:{slotId:attach.slotId,cycleId:attach.cycleId,renderToken:attach.renderToken},
   deviceEffective:attach.deviceEffective,deviceSource:attach.deviceSource,mode:attach.mode,stats:qa.stats,
   activationToFrameMs:frame.epochMs-activation.epochMs,requestEpochMs:request.timestamp,
   durations:{requestToManagerMs:qaEvent('ads-manager').timestamp-request.timestamp,managerToPrerollMs:qaEvent('readyforpreroll').timestamp-qaEvent('ads-manager').timestamp,
    prerollToFrameMs:qaEvent('first-frame').timestamp-qaEvent('readyforpreroll').timestamp,requestToFrameMs:qaEvent('first-frame').timestamp-request.timestamp,
    frameToImpressionMs:qaEvent('native-IMPRESSION').timestamp-qaEvent('first-frame').timestamp,frameToRevealMs:qaEvent('revealed').timestamp-qaEvent('first-frame').timestamp},
   timeline:creative.filter(e=>eventNames.has(e.event)).map(eventRow),
   debugReadiness:dbgCreative.filter(e=>/^video_(missed|recovery|reveal_blocked|activation)/.test(e.data.metric??'')).map(e=>({event:e.data.metric,requestOffsetMs:e.epochMs-request.timestamp,elapsedMs:e.elapsedMs,...e.data})),
   cost:{creative:distribution(creative.map(e=>e.observerBuildMs)),all:distribution(logs.map(e=>e.observerBuildMs)),
    events:logs.length,creativeEvents:creative.length,globalErrors:logs.filter(e=>/qa_global_error|qa_unhandled_rejection/.test(e.event)).length,
    scopeWarnings:logs.filter(e=>/qa_listener_failed|qa_manager_identity|qa_manager_replaced|qa_probe_internal_error/.test(e.event)).map(eventRow)},
   coreErrors:dbg.filter(e=>/dummy source|AbortError|NotSupportedError|suppressedTracks|video.*timeout/i.test(e.message??'')).map(e=>({requestOffsetMs:e.epochMs-request.timestamp,message:e.message})),
   gamTags:debug.logs.flatMap(e=>[e.message,...(e.args??[]).filter(a=>typeof a==='string')].flatMap(text=>{
    const urls=String(text??'').match(/https?:\/\/[^\s"<>]+/g)??[];return urls.flatMap(url=>{let u;try{u=new URL(url);}catch{return [];}
    if(!u.pathname.includes('/gampad/ads')||!u.searchParams.has('iu'))return [];const targeting=Object.fromEntries(new URLSearchParams(u.searchParams.get('cust_params')??''));
    return [{requestOffsetMs:epoch(e.timestamp)-request.timestamp,adUnit:u.searchParams.get('iu'),output:u.searchParams.get('output'),
      targetingHash:targetingHash(targeting),targetingHB:shape(targeting),tagPresent:!!targeting.tag,tPresent:!!targeting.t}];});})),
   prebidWarnings:dbg.filter(e=>e.message?.includes('intext_prebid_targeting_missing_after_bid')).map(e=>({sequence:e.sequence,requestOffsetMs:e.epochMs-request.timestamp,data:e.data})),
   prebidSnapshots:logs.filter(e=>e.event==='qa_prebid_targeting_snapshot').map(e=>({slotId:e.slotId,cycleId:e.cycleId,renderToken:e.renderToken,stage:e.stage,auctionId:e.auctionId,
    requestOffsetMs:e.timestamp-request.timestamp,adUnitCode:e.adUnitCode,slotExists:e.slotExists,slotElementId:e.slotElementId,nativeProxySameObject:e.nativeProxySameObject,
    pbjs:shape(e.pbjsTargeting),slot:e.slotTargeting==null?null:shape(e.slotTargeting),native:e.nativeTargeting==null?null:shape(e.nativeTargeting),
    bids:e.bids.map(b=>({auctionId:b.auctionId,adUnitCode:b.adUnitCode,mediaType:b.mediaType,bidder:b.bidder,adId:b.adId,adserver:shape(b.adserverTargeting)}))})),
   nativeTargeting:dbg.filter(e=>e.message?.includes('intext_prebid_native_targeting_after_set_audit')).map(e=>({requestOffsetMs:e.epochMs-request.timestamp,data:e.data})),
   videoTargeting:dbg.filter(e=>/video.*(targeting|adtag|ad_tag)|targeting.*video/i.test(e.message??'')).map(e=>({requestOffsetMs:e.epochMs-request.timestamp,message:e.message,data:e.data})),
  };
  if(harName) {
   const har=load(harName);session.har={requests:[],dependencyBodies:[],bundleBodies:[]};
   for(const [index,e]of har.log.entries.entries()) {
    const url=e.request.url,where=route(url);if(!where)continue;
    if(where.path.endsWith('/_gam_kv_.js')){
      const content=e.response.content,body=content?.text?(content.encoding==='base64'?Buffer.from(content.text,'base64').toString('utf8'):content.text):null;
      session.har.bundleBodies.push({index,...where,status:e.response.status,bodyAvailable:!!body,
        dummy:body?inspectDummy('HAR #'+index,body):null});
    }
    if(/video(js)?|contrib-ads|ima3\.js/.test(where.path)&&/\.js$/.test(where.path)) {
      const content=e.response.content,body=content?.text?(content.encoding==='base64'?Buffer.from(content.text,'base64').toString('utf8'):content.text):null;
      const needles=where.path.includes('contrib-ads')?['suppressedTracks','a.suppressedTracks','isInAdMode=function','isInAdMode:','snapshot;if','restorePlayerSnapshot']:
       where.path.includes('videojs.ima')?['onAdsManagerLoaded=function','onPlayerReadyForPreroll=function','setAutoPlayAdBreaks','onAdBreakReady=function','playAdBreak=function','onAdBreakEnd=function']:[];
      session.har.dependencyBodies.push({index,...where,status:e.response.status,bodyAvailable:!!body,bodySha256:body?sha(body):null,encoding:content?.encoding??null,
       snippets:body?needles.map(needle=>{const at=body.indexOf(needle);return {needle,at,source:at<0?null:body.slice(Math.max(0,at-80),at+(needle==='onAdsManagerLoaded=function'?3000:1100))};}):[]});
    }
    const u=new URL(url),gam=u.pathname.includes('/gampad/ads')&&u.searchParams.get('output')?.includes('vast'),mp4=/\.mp4(?:$|\?)/i.test(url);
    if(!gam&&!mp4)continue;
    let targeting={};try{targeting=Object.fromEntries(new URLSearchParams(u.searchParams.get('cust_params')??''));}catch{}
    session.har.requests.push({index,type:gam?'GAM-VAST':'MP4',...where,path:gam?where.path:'/videoplayback/[redacted-media-path]',mediaResourceHash:mp4?sha(url):null,
     mediaId:mp4?/\/id\/([^/]+)/.exec(u.pathname)?.[1]??null:null,
     startEpochMs:Date.parse(e.startedDateTime),requestOffsetMs:Date.parse(e.startedDateTime)-request.timestamp,
     status:e.response.status,totalMs:e.time,timings:e.timings,responseBodyPresent:typeof e.response.content?.text==='string'&&e.response.content.text.length>0,
     mimeType:e.response.content?.mimeType,adUnit:gam?u.searchParams.get('iu'):null,
     matchesFirstFrameMedia:mp4?sha(url)===sha(qaEvent('first-frame').snapshot?.media?.currentSrc??''):null,
     targetingHash:gam?targetingHash(targeting):null,
     targeting:gam?Object.fromEntries(Object.entries(targeting).filter(([key])=>/^hb_|^(tag|t|pos|position|random[1-4]|gexp_floor)$/.test(key))):null});
   }
  }
  output.sessions.push(session);
 }
 return output;
}
module.exports={analyze,pairs,distribution,inspectDummy};
if(require.main===module){const result=analyze(process.argv[2]??path.join(os.homedir(),'Downloads'));const text=JSON.stringify(result,null,2)+'\n';
 if(process.argv[3])fs.writeFileSync(process.argv[3],text);else process.stdout.write(text);}
