'use strict';
// Offline evidence only. Reads authorised captures; never executes HAR JavaScript.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const pairs=[['original1','original1-gexp','www.marca.com-mobile original 1.har'],['original2','original2-gexp','www.marca.com-mobile original 2.har'],
 ['black1','dummy-gexp','www.marca.com-mobile dummy.har'],['black2','dummy2-gexp','www.marca.com-mobile 2 dummy.har'],
 ['black3','dummy3-gexp','www.marca.com-mobile 3 dummy.har'],['black4','dummy-4gexp','www.marca.com-mobile 4 dummy.har']];
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function normalizeLogs(dump){return (dump.logs??[]).map(log=>{const data=log.args?.find(a=>a&&typeof a==='object'&&!Array.isArray(a))??{};
 return {sequence:log.sequence,epochMs:typeof log.timestamp==='number'?log.timestamp:Date.parse(log.timestamp),elapsedMs:log.elapsedMs,
  event:data.metric??data.event??/\]\s+((?:video_|display_)[a-z_]+|intext_winner_resolved)/.exec(log.message)?.[1]??null,message:log.message,data};});}
function analyzeDebug(dump){const logs=normalizeLogs(dump);return {runtime:dump.runtime,startedAt:dump.startedAt,durationMs:dump.durationMs,
 metrics:logs.filter(e=>e.event),videoMessages:logs.filter(e=>/Video:IMA|VideoPlayer|Video:|bridge|refresh/i.test(e.message)),
 warnings:logs.filter(e=>/psp|prebid.*(missing|warning|error)|suppressedTracks|NotSupportedError|AbortError|DEMUXER_ERROR/i.test(e.message))};}
function inspectHar(har,startedAt){return har.log.entries.flatMap((entry,index)=>{
 const u=new URL(entry.request.url),isVast=u.pathname.includes('/gampad/ads')&&/vast/.test(u.searchParams.get('output'));
 const isMedia=/\.mp4(?:$|\?)/i.test(u.href),isLibrary=/video|contrib-ads|ima3\.js/.test(u.pathname)&&/\.js$/.test(u.pathname);
 if(!isVast&&!isMedia&&!isLibrary)return [];
 const c=entry.response.content,body=c?.text?(c.encoding==='base64'?Buffer.from(c.text,'base64').toString('utf8'):c.text):null;
 const needles=u.pathname.includes('contrib-ads')?['restorePlayerSnapshot','suppressedTracks','contentresumed','contentended','setTimeout','timeout:','timeout=']:
  u.pathname.includes('videojs.ima')?['onContentEnded=function','onAdBreakEnd=function','onAdsManagerLoaded=function','restoreCustomPlaybackStateOnAdBreakComplete','endLinearAdMode','onContentAndAdsCompleted=function','autoPlayAdBreaks']:[];
 return [{index,type:isVast?'VAST':isMedia?'MP4':'library',host:u.host,path:isMedia?'[media path omitted]':u.pathname,status:entry.response.status,
  adUnit:isVast?u.searchParams.get('iu'):null,position:isVast?new URLSearchParams(u.searchParams.get('cust_params')??'').get('p'):null,
  elapsedMs:Date.parse(entry.startedDateTime)-Date.parse(startedAt),totalMs:entry.time,timings:entry.timings,
  bodyPresent:!!body,bodySha256:body?sha(body):null,bodyBytes:body?Buffer.byteLength(body):null,
  snippets:body?needles.map(needle=>{const at=body.indexOf(needle);return {needle,at,source:at<0?null:body.slice(Math.max(0,at-80),at+1600)};}):[]}];
 });}
function parseHar(bytes){const text=bytes.toString('utf8');try{return {har:JSON.parse(text),complete:true};}catch(error){
 // A truncated capture is not repaired: retain only independently complete entries.
 const marker=/"entries"\s*:\s*\[/.exec(text);if(!marker)throw Error('HAR entries missing');
 const entries=[];let start=-1,depth=0,quoted=false,escaped=false;
 for(let i=marker.index+marker[0].length;i<text.length;i++){const c=text[i];
  if(quoted){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;continue;}
  if(c==='"'){quoted=true;continue;}if(c==='{'){if(depth===0)start=i;depth++;}
  else if(c==='}'){depth--;if(depth===0&&start>=0){entries.push(JSON.parse(text.slice(start,i+1)));start=-1;}}
  else if(c===']'&&depth===0)break;
 }
 return {har:{log:{entries}},complete:false,warning:'Invalid/truncated HAR; only complete entry prefix retained',completeEntryCount:entries.length};
}}
function analyze(directory=path.join(os.homedir(),'Downloads')){
 const names=fs.readdirSync(directory);return {schema:'p13c-integration-offline-v1',sessions:pairs.map(([id,prefix,harName])=>{
  const name=names.find(n=>n.startsWith(prefix)&&n.includes('2026-10-20')&&n.endsWith('.json'));if(!name)throw Error('Missing capture '+prefix);
  const bytes=fs.readFileSync(path.join(directory,name)),debug=JSON.parse(bytes),harBytes=fs.readFileSync(path.join(directory,harName));
  const parsed=parseHar(harBytes);return {id,debugName:name,debugSha256:sha(bytes),harName,harSha256:sha(harBytes),harComplete:parsed.complete,harWarning:parsed.warning??null,
   harCompleteEntryCount:parsed.har.log.entries.length,har:inspectHar(parsed.har,debug.startedAt),...analyzeDebug(debug)};
 })};
}
function summarize(result){return {schema:result.schema,scope:'Read-only evidence from six 2026-10-20 sessions; no new browser execution',sessions:result.sessions.map(s=>{
 const first=name=>s.metrics.find(e=>e.event===name&&e.data.slotId==='gexp-intext');
 const names=['video_winner_resolved','video_dependency_prewarm_started','video_dependency_prewarm_ready','video_prepare_started','video_prepare_ready',
  'video_activation_started','video_ima_request_sent','video_ads_manager_loaded','video_first_frame','video_player_revealed','video_complete','display_refresh_completed'];
 const milestones=Object.fromEntries(names.map(n=>[n,first(n)?.elapsedMs??null]));
 const diff=(a,b)=>milestones[a]!==null&&milestones[b]!==null?milestones[b]-milestones[a]:null;
 const geo=name=>{const e=first(name);return e?{elapsedMs:e.elapsedMs,source:e.data.source??null,currentTime:e.data.currentTime??null,
  readinessAnchorRect:e.data.readinessAnchorRect??null,wrapperRect:e.data.wrapperRect??null,wrapperIntersectionRatio:e.data.wrapperIntersectionRatio??null,
  documentVisibility:e.data.documentVisibility??null,gptViewabilityAvailable:e.data.gptViewabilityAvailable??null}:null;};
 return {id:s.id,debugName:s.debugName,debugSha256:s.debugSha256,harName:s.harName,harSha256:s.harSha256,
  runtime:s.runtime,harComplete:s.harComplete,harWarning:s.harWarning,harCompleteEntryCount:s.harCompleteEntryCount,milestones,
  durationsMs:{winnerToPrepared:diff('video_winner_resolved','video_prepare_ready'),prewarm:diff('video_dependency_prewarm_started','video_dependency_prewarm_ready'),
   preparedToActivation:diff('video_prepare_ready','video_activation_started'),activationToProxy:diff('video_activation_started','video_ima_request_sent'),
   proxyToManager:diff('video_ima_request_sent','video_ads_manager_loaded'),managerToFrame:diff('video_ads_manager_loaded','video_first_frame'),
   activationToFrame:diff('video_activation_started','video_first_frame'),frameToReveal:diff('video_first_frame','video_player_revealed'),
   completeMetricToDisplayRefreshCompleted:diff('video_complete','display_refresh_completed')},
  geometry:{manager:geo('video_ads_manager_loaded'),frame:geo('video_first_frame'),reveal:geo('video_player_revealed'),complete:geo('video_complete')},
  // Native COMPLETE is not uniquely identified by the current video_complete metric.
  postAdend:s.videoMessages.filter(e=>/Ad playback ended|Video playback ended|video_to_display_bridge|video_to_display_video_loader|Scheduling Video Refresh|Visible time reached/.test(e.message))
   .map(e=>({elapsedMs:e.elapsedMs,message:e.message})),
  dependencyFailures:s.videoMessages.filter(e=>/dependency_script_timeout|Video build\/play failed/.test(e.message)).map(e=>({elapsedMs:e.elapsedMs,message:e.message,data:e.data})),
  fallback:s.metrics.filter(e=>e.data.slotId==='gexp-intext'&&e.data.cycleId===2&&/fallback|display_(slot_requested|slot_render_ended|creative_ready|viewport_wait|wrapper_opened|opened|impression_viewable)/.test(e.event))
   .map(e=>({elapsedMs:e.elapsedMs,event:e.event,cycleId:e.data.cycleId,renderToken:e.data.renderToken,source:e.data.source??null})),
  nativeEventCoverage:s.videoMessages.filter(e=>/Native.*(COMPLETE|STARTED|RESUME)|native started|content-resume/.test(e.message)).map(e=>({elapsedMs:e.elapsedMs,message:e.message})),
  har:s.har};
 })};}
module.exports={analyze,analyzeDebug,normalizeLogs,inspectHar,parseHar,summarize,pairs};
if(require.main===module){const result=analyze(process.argv[2]||undefined);fs.writeFileSync(path.resolve(__dirname,'generated/integration-debug.json'),JSON.stringify(result,null,2)+'\n');
 fs.writeFileSync(path.resolve(__dirname,'../../docs/intext-p13c-integration-evidence.json'),JSON.stringify(summarize(result),null,2)+'\n');
 for(const s of result.sessions)console.log(JSON.stringify({id:s.id,runtime:s.runtime,metrics:s.metrics.filter(e=>/winner_resolved|prewarm|dependencies_ready|prepare_ready|prepare_started|activation_started|ima_request_sent|ads_manager_loaded|first_frame$|player_revealed|video_complete$|video_error$|content_resume|content_pause|bridge|timeout/.test(e.event??'')).map(e=>({t:e.elapsedMs,event:e.event,slot:e.data.slotId,cycle:e.data.cycleId,token:e.data.renderToken,source:e.data.source,distance:e.data.distancePx,eligible:e.data.eligible,currentTime:e.data.currentTime,elementRect:e.data.elementRect,anchor:e.data.readinessAnchorRect})),messages:s.videoMessages.filter(e=>/COMPLETE|complete|Ad playback ended|Playback ended|timeout|suppressedTracks|Snapshot|snapshot|Readyforpreroll|readyforpreroll|content-resume/i.test(e.message)).map(e=>({t:e.elapsedMs,message:e.message}))}));}
