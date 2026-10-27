'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {analyzeSession,summarize,delta,median,harView,intervalOverlap,auditPluginSource}=require('./qa/intext-p14a2-analysis.cjs');
const evidence=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/intext-p14a2-evidence.json'),'utf8'));
test('P14A2: four missing HAR VASTs remain unknown network outcomes, not NO-FILL',()=>{
 const failures=evidence.sessions.filter(s=>s.result==='timeout');assert.deepEqual(failures.map(s=>s.id),['E0-1','E0-3','E1-4','E1-5']);
 for(const s of failures){assert.ok(s.stages.sdkRequestReturnedProxy);assert.equal(s.stages.adsManager,null);assert.equal(s.vast,null);
  assert.equal(s.coverage.vastEntries,0);assert.equal(s.coverage.allHarGamOnly,true);assert.equal(s.timeout.driftProxyMs.exactDriftKnown,false);
  assert.equal(s.dependencyResources.length,4);assert.ok(s.dependencyResources.every(r=>r.apiReady===true&&r.alreadyAvailable===false));
  assert.ok(s.dependencyResources.every(r=>r.resourceTiming?.scriptEvaluationCpuMs===null&&r.resourceTiming?.blockedMs===null));
  assert.equal(s.timeout.allObservedTokensValid,true);assert.equal(s.fallback.cycleId,2);assert.equal(s.fallback.gamFilled,true);}
});
test('P14A2: failed video and successful fallback are separate cycles',()=>{
 for(const s of evidence.sessions){if(s.result==='complete')assert.equal(s.fallback,null);else{
  assert.equal(s.stages.firstFrame,null);assert.ok(s.fallback.render>s.stages.advertisingTimeout);assert.equal(s.fallback.renderToken,2);}}
});
test('P14A2: five eligible anchors are not relabelled offscreen by zero-height wrapper flags',()=>{
 const completed=evidence.sessions.filter(s=>s.result==='complete');assert.equal(completed.length,6);
 assert.equal(completed.filter(s=>s.snapshots.frame.readiness.eligible).length,5);
 assert.deepEqual(completed.filter(s=>!s.snapshots.frame.readiness.eligible).map(s=>s.id),['E1-3']);
 assert.ok(completed.every(s=>s.snapshots.frame.wrapper.height===0&&s.snapshots.debuggerFlags.firstFrameOutsideViewport===true));
});
test('P14A2: timeouts stay in denominators; observed milestone medians do not fabricate zeroes',()=>{
 const [e0,e1]=summarize(evidence.sessions);assert.equal(e0.attempts,4);assert.equal(e1.attempts,6);
 assert.equal(e0.timeoutPercent,50);assert.equal(e1.timeoutPercent,100/3);
 assert.equal(e0.winnerToAdsManagerMedianMsAmongObserved,6947);assert.equal(e1.winnerToAdsManagerMedianMsAmongObserved,13918.5);
 assert.equal(e0.winnerToFirstFrameMedianMsAmongObserved,7896);assert.equal(e1.winnerToFirstFrameMedianMsAmongObserved,15104);
 assert.equal(delta(null,123),null);assert.equal(median([null,undefined]),null);assert.equal(median([null,2,4]),3);
});
test('P14A2: overlap measures intersection, not minimum duration with staggered branches',()=>{
 assert.equal(intervalOverlap([{start:0,end:10},{start:5,end:12}]),5);assert.equal(intervalOverlap([{start:0,end:4},{start:4,end:9}]),0);
 assert.equal(intervalOverlap([{start:0,end:10},{start:null,end:12}]),null);
});
test('P14A2: historical plugin verifies return-proxy ordering, not current network or bytes',()=>{
 assert.ok(evidence.historicalPluginReference.bodies.some(b=>b.sdkCallBeforeAdsRequestEvent&&b.defaultRequestModeOnLoad));
 assert.equal(evidence.historicalPluginReference.currentCaptureBodyVerified,false);
 const code='this.adsLoader.requestAds(r);this.controller.playerWrapper.vjsPlayer.trigger({type:"ads-request"});';
 assert.equal(auditPluginSource(code).sdkCallBeforeAdsRequestEvent,true);
 assert.equal(auditPluginSource('this.controller.playerWrapper.vjsPlayer.trigger({type:"ads-request"});this.adsLoader.requestAds(r);').sdkCallBeforeAdsRequestEvent,false);
});
test('P14A2: HAR lifecycle start is preserved and sensitive data is removed',()=>{
 const v=harView({startedDateTime:'2026-10-22T10:00:00Z',time:150,request:{url:'https://ad.example/gampad/ads?output=xml_vast4&token=SECRET#fragment'},
  response:{status:200,headers:[{name:'set-cookie',value:'SECRET'}],content:{text:'<VAST><Wrapper/></VAST>'}},timings:{blocked:100,send:1,wait:40,receive:9}},0);
 assert.equal(v.startedAt,Date.parse('2026-10-22T10:00:00Z'));assert.equal(v.responseEndAt-v.startedAt,150);assert.equal(v.xml.wrapperCount,1);
 const text=JSON.stringify(v);for(const forbidden of ['SECRET','https://','fragment','<VAST>','set-cookie'])assert.ok(!text.includes(forbidden));
 const failed=harView({startedDateTime:'2026-10-22T10:00:00Z',time:10,request:{url:'https://ad.example/gampad/ads'},response:{status:0,content:{}},timings:{}},1);
 assert.equal(failed.networkErrorOrNoHttpResponse,true);assert.equal(failed.cancelled,null);assert.equal(failed.cancellationCauseKnown,false);
});
test('P14A2: E1-3 post-response gap is measured separately from preroll and reveal',()=>{
 const s=evidence.sessions.find(s=>s.id==='E1-3');assert.ok(Math.abs(s.durations.harResponseToAdsManagerMs-2790.017)<.01);
 assert.equal(s.stages.adsready-s.stages.adsManager,3);assert.equal(s.stages.readyforpreroll-s.stages.adsready,1);
 assert.equal(s.durations.firstFrameToRevealMs,4821);assert.equal(s.subsequentDisplay[0].gamFilled,false);
});
test('P14A2: no later cycle, other slot, or missing activation contaminates an initial timeout',()=>{
 const qa={arm:'E0',logs:[{event:'video_winner_resolved',slotId:'slot-any',cycleId:4,timestamp:1000}],integration:{logs:[
  {event:'player:ads-request',slotId:'slot-any',cycleId:4,renderToken:7,timestamp:1100},
  {event:'core:timeout',slotId:'slot-any',cycleId:4,renderToken:7,timestamp:26000},
  {event:'core:first-frame',slotId:'slot-other',cycleId:4,timestamp:27000},
  {event:'ima:COMPLETE',slotId:'slot-any',cycleId:5,timestamp:28000}]}},debug={logs:[{timestamp:28000,message:'Initializing IMA immediately after Video.js'}],summary:{slotsAndCycles:[]}},har={log:{entries:[]}};
 const s=analyzeSession({id:'synthetic-cycle-control',qa,debug,har,slotId:'slot-any'});
 assert.equal(s.result,'timeout');assert.equal(s.stages.firstFrame,null);assert.equal(s.stages.nativeComplete,null);
 assert.equal(s.timeout.driftProxyMs.sinceActivationMinus25000,null);assert.equal(s.timeout.driftProxyMs.sincePrePluginInitMinus25000,null);
 assert.equal(s.durations.activationToTimeoutMs,null);assert.equal(s.otherHar.maxConnectMs,null);assert.equal(s.coverage.harVastCorrelation,'none-or-ambiguous');
 assert.equal(s.durations.branchOverlapProxyMs,null);
});
