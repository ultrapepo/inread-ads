'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {summarize}=require('./intext-p13c-timelines.cjs');
const suffixes=['10-04-40-566Z','10-05-48-573Z','10-27-37-390Z','10-28-30-220Z','10-29-27-305Z','10-30-10-902Z','10-35-43-997Z'];
const selected=new Set(['video_prepare_ready','video_activation_started','video_player_prepared','video_ima_request_sent','video_ads_manager_loaded',
  'video_adstart','video_first_frame','video_player_revealed','video_complete','video_error','video_timeout','video_missed_viewport',
  'video_recovery_requested','video_recovery_api_called','video_recovery_cancelled','video_recovery_confirmed',
  'display_fallback_started','display_request_started','display_slot_requested','display_slot_response_received','display_slot_render_ended',
  'display_creative_ready','display_viewport_wait_started','display_viewport_wait_resolved','display_wrapper_opened','display_impression_viewable']);
function replay(directory) {
  const names=fs.readdirSync(directory),reports=[];
  for(const suffix of suffixes) {
    const matches=names.filter(name=>name.includes('2026-10-19T'+suffix)&&name.endsWith('.json'));
    if(matches.length!==1)throw Error('Expected exactly one original capture for '+suffix);
    const name=matches[0],bytes=fs.readFileSync(path.join(directory,name)),dump=JSON.parse(bytes.toString('utf8'));
    const timeline=dump.logs.flatMap(entry=>{
      const data=entry.args?.find(value=>value&&typeof value==='object')||{};
      if(!selected.has(data.metric))return [];
      return [{sequence:entry.sequence,elapsedMs:entry.elapsedMs,event:data.metric,slotId:data.slotId??null,cycleId:data.cycleId??null,renderToken:data.renderToken??null,
        source:data.source??null,reason:data.reason??null,errorCode:data.imaErrorCode??data.errorCode??null,
        currentTime:data.currentTime??null,readinessRatio:data.readinessIntersectionRatio??null,wrapperRatio:data.wrapperIntersectionRatio??null,
        readinessAnchorRect:data.readinessAnchorRect??null,wrapperRect:data.wrapperRect??null,
        documentVisibility:data.documentVisibility??null,pausedForEligibility:data.pausedForEligibility??null}];
    });
    const states=dump.summary.slotsAndCycles.filter(cycle=>cycle.slotId==='gexp-intext'&&(cycle.video.requestStarted||cycle.display.opened)).map(cycle=>({
      slotId:cycle.slotId,cycleId:cycle.cycleId,renderToken:cycle.renderToken,video:{activationToFirstFrameMs:cycle.video.activationToFirstFrameMs,
        firstFrame:cycle.video.firstFrame,complete:cycle.video.complete,error:cycle.video.error,timeout:cycle.video.timeout,firstFrameSource:cycle.video.firstFrameSource},
      display:cycle.display}));
    const warningEntries=dump.logs.filter(entry=>entry.message.includes('intext_prebid_targeting_missing_after_bid')).map(entry=>({elapsedMs:entry.elapsedMs,data:entry.args?.find(value=>value&&typeof value==='object')??null}));
    const nativeAudits=dump.logs.filter(entry=>entry.message.includes('intext_prebid_native_targeting_after_set_audit')).map(entry=>{
      const a=entry.args?.find(value=>value&&typeof value==='object')||{};
      return {elapsedMs:entry.elapsedMs,slotId:a.slotId,auctionId:a.auctionId,renderToken:a.renderToken,cycleId:a.cycleId,
        pbjsTargeting:a.pbjsTargeting,gptSlotTargeting:a.gptSlotTargeting,gptSlotTargetingApiAvailable:a.gptSlotTargetingApiAvailable,
        rawBannerBids:a.rawBannerBids?.map(bid=>({bidder:bid.bidder,adId:bid.adId,rawCpm:bid.rawCpm,adserverTargeting:bid.adserverTargeting}))};
    });
    const diagnosticMessages=dump.logs.filter(entry=>/readyforpreroll|adsready|loadstart|player\.play\(\)|suppressedTracks|NotSupportedError|AbortError|Could not attach native|Initializing IMA immediately/.test(entry.message)).map(entry=>({sequence:entry.sequence,elapsedMs:entry.elapsedMs,message:entry.message.replace(/https?:\/\/\S+/g,'[URL]'),
      errors:entry.args?.filter(value=>value&&typeof value==='object'&&('stack'in value||'message'in value)).map(value=>({name:value.name??null,message:value.message??null,stack:value.stack??null}))}));
    reports.push({name,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),runtime:dump.runtime,logCount:dump.logs.length,
      states,timeline,diagnosticMessages,warningEntries,nativeAudits,parser:summarize(dump,name).cycles.map(cycle=>({slotId:cycle.slotId,cycleId:cycle.cycleId,renderToken:cycle.renderToken,
        requestToManagerMs:cycle.requestToManagerMs,managerToPrerollMs:cycle.managerToPrerollMs,requestToFrameMs:cycle.requestToFrameMs}))});
  }
  return {source:'original-19Oct2026-JSON-read-only',reports};
}
module.exports={replay};
if(require.main===module){const text=JSON.stringify(replay(process.argv[2]||path.join(process.env.USERPROFILE,'Downloads')),null,2);
  if(process.argv[3]==='--out'&&process.argv[4])fs.writeFileSync(process.argv[4],text+'\n');else console.log(text);}
