'use strict';
const fs=require('node:fs'),path=require('node:path');
function logArray(input) {
  if(Array.isArray(input))return input;
  for(const value of [input.entries,input.logs,input.logs?.entries,input.debug?.entries,input.logBuffer?.entries,input.buffer?.entries])if(Array.isArray(value))return value;
  throw Error('Unknown dump schema: expected explicit logs/entries array');
}
function normalize(input) {
  return logArray(input).map(entry=>{
    const arg=entry.args?.find?.(value=>value&&typeof value==='object'&&!Array.isArray(value))||{};
    const data={...entry,...arg,...entry.data};
    const message=String(entry.message??'');
    const event=String(data.metric??entry.event??message.match(/\[IntextMetrics\]\s+(\S+)/)?.[1]??message);
    let timestamp=data.timestamp;
    if(typeof timestamp==='string')timestamp=Date.parse(timestamp);
    const relative=entry.elapsedMs;
    return {event,data,message,timestamp:Number.isFinite(timestamp)?timestamp:Number.isFinite(relative)?relative:null,
      timebase:Number.isFinite(timestamp)?'timestamp':'relative',slotId:data.slotId??null,cycleId:data.cycleId??null,renderToken:data.renderToken??null};
  });
}
const aliases={request:['video_ima_request_sent','video_ads_request','ads-request','player-ads-request'],manager:['video_ads_manager_loaded','ads-manager','player-ads-manager'],
  adsready:['adsready','player-adsready'],preroll:['readyforpreroll','player-readyforpreroll'],start:['video_ima_started','video_adstart','adstart','native-STARTED','player-adstart'],
  frame:['video_first_frame','first-frame'],reveal:['video_player_revealed','revealed'],
  error:['video_error','ima-error','ima-plugin-error','core-error'],timeout:['video_timeout','video_advertising_timeout','core-timeout'],
  fallback:['display_fallback_started','video_fallback_started','qa_fallback_bridge'],gptRequest:['display_slot_requested','display_request_started'],
  render:['display_slot_render_ended'],open:['display_wrapper_opened'],visible:['qa_display_dom_visibility'],activeView:['display_impression_viewable']};
function summarize(input,name='dump') {
  const rows=normalize(input),groups=new Map();
  for(const row of rows){const key=JSON.stringify([row.slotId,row.cycleId,row.renderToken]);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(row);}
  return {name,entryCount:rows.length,cycles:[...groups.values()].map(events=>{
    const first=events[0],timeline={};
    for(const [stage,names] of Object.entries(aliases)){const match=events.find(row=>names.includes(row.event));timeline[stage]=match?{at:match.timestamp,timebase:match.timebase,event:match.event}:null;}
    const delta=(a,b)=>timeline[a]?.at!=null&&timeline[b]?.at!=null&&timeline[a].timebase===timeline[b].timebase&&timeline[b].at>=timeline[a].at?timeline[b].at-timeline[a].at:null;
    return {slotId:first.slotId,cycleId:first.cycleId,renderToken:first.renderToken,correlationComplete:first.slotId!=null&&first.cycleId!=null&&first.renderToken!=null,
      timeline,requestToManagerMs:delta('request','manager'),managerToPrerollMs:delta('manager','preroll'),requestToFrameMs:delta('request','frame'),
      frameToRevealMs:delta('frame','reveal'),gamRenderToOpenMs:delta('render','open'),
      missingTransitions:['adsready','preroll','start','frame'].filter(stage=>!timeline[stage]),
      missingMeans:'not-observed-in-this-export-NOT-proof-event-did-not-fire',
      geometry:events.filter(row=>row.data.readinessAnchorRect||row.data.wrapperRect||row.data.snapshot?.anchorRect).map(row=>({at:row.timestamp,event:row.event,
        anchor:row.data.readinessAnchorRect??row.data.snapshot?.anchorRect??null,wrapper:row.data.wrapperRect??row.data.snapshot?.wrapperRect??null,
        readinessRatio:row.data.readinessIntersectionRatio??row.data.snapshot?.readiness?.intersectionRatio??null,wrapperRatio:row.data.wrapperIntersectionRatio??row.data.intersectionRatio??null})),
      prebidWarnings:events.filter(row=>row.message.includes('intext_prebid_targeting_missing_after_bid')).length};
  })};
}
function harRequests(har) {
  return (har.log?.entries??[]).filter(entry=>{try{return new URL(entry.request.url).pathname==='/gampad/ads';}catch{return false;}}).map(entry=>({
    startedAt:Date.parse(entry.startedDateTime),status:entry.response?.status??null,totalMs:entry.time??null,blockedMs:entry.timings?.blocked??null,
    waitMs:entry.timings?.wait??null,otherTimings:entry.timings??null,bodyAvailable:typeof entry.response?.content?.text==='string',
    correlation:'manual-request-identity-required-NOT-nearest-timestamp'}));
}
module.exports={normalize,summarize,harRequests};
if(require.main===module) {
  if(process.argv.length<3)throw Error('Pass explicit JSON/HAR paths; inputs are read-only');
  const reports=process.argv.slice(2).map(file=>{const input=JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));return input.log?.entries?{name:path.basename(file),har:harRequests(input)}:summarize(input,path.basename(file));});
  console.log(JSON.stringify({qaOnly:true,reports},null,2));
}
