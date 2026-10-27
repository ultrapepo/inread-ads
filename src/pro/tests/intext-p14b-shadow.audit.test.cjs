'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const E=require('./qa/intext-p14b-shadow-evaluator.cjs');
const {createP14BLedgerV1,LIMITS}=require('./qa/intext-p14b-shadow-ledger.cjs');
const F=require('./qa/intext-p14b-qa0-fixtures.cjs');
const root=path.resolve(__dirname,'..');
const evaluate=(s,f='B0',model,params)=>E.evaluateP14BShadowV1(s,F.candidate(f,model??(['B1','B2','B3'].includes(f)?s.plannedRegions?.[0]?.modelId:undefined)??'player-intent-current-flow-v1',params));
const makeLedger=(options={})=>createP14BLedgerV1({documentLocalId:'documentOne',candidates:F.catalogue(),coverage:F.fullCoverage(),...options});
const completeSample=(options={})=>{const s=F.makeSample(options);return [s,F.completedFacts(s)];};
function freeze(value){if(value&&typeof value==='object'){for(const d of Object.values(Object.getOwnPropertyDescriptors(value)))if(Object.hasOwn(d,'value'))freeze(d.value);Object.freeze(value);}return value;}
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,`${a} != ${b}`);

test('R1 B0: a reliable C0=true passes without P, viewport, stage, provenance or layout fields',()=>{
  const s=F.makeSample();for(const k of ['plannedRegions','viewport','stage','provenance','layoutRevision','sampleSequence','monotonicMs'])delete s[k];
  const r=evaluate(s);assert.equal(r.status,'pass');assert.equal(r.rectModelId,null);assert.equal(r.geometryQuality,'not-required');
  assert.equal(r.movementQuality,'not-required');assert.equal(r.areaFraction,null);assert.equal(r.controlComparison,'agrees');
});
test('R1 B0 never reads P or motion accessors; no mutation and deterministic fresh results',()=>{
  const s=F.makeSample();let reads=0;
  for(const k of ['plannedRegions','viewport','motion'])Object.defineProperty(s,k,{get(){reads++;throw Error('must not read');}});
  freeze(s);const a=evaluate(s),b=evaluate(s);assert.deepEqual(a,b);assert.notEqual(a,b);assert.equal(a.status,'pass');assert.equal(reads,0);
  a.reasons.push('changed');assert.deepEqual(evaluate(s).reasons,[]);
});
test('R1 B0 false/unknown are factual and are not reconstructed from visible P',()=>{
  const s=F.makeSample({control:false});assert.equal(evaluate(s).status,'fail');
  s.control.eligible=null;assert.equal(evaluate(s).status,'unknown');
  s.control.eligible=true;s.control.observed=false;assert.equal(evaluate(s).status,'unknown');
  s.control.observed=true;s.control.reliable=false;assert.equal(evaluate(s).status,'unknown');
});
test('R1 missing geometry cannot defeat a known false C0 for B1-B3',()=>{
  const s=F.makeSample({control:false});delete s.plannedRegions;delete s.viewport;
  for(const f of ['B1','B2','B3'])assert.deepEqual(evaluate(s,f).reasons,['control-ineligible']);
});
test('Scope, verified identity, source and version precedence',()=>{
  const s=F.makeSample();s.scope='display';delete s.identity;assert.equal(evaluate(s).status,'not-applicable');
  for(const state of ['stale','terminal']){const v=F.makeSample();v.identity.state=state;assert.equal(evaluate(v).status,'not-applicable');}
  const bad=F.makeSample();bad.identity.activeRenderToken=2;assert.equal(evaluate(bad).status,'not-applicable');
  bad.identity.verified=false;assert.equal(evaluate(bad).status,'unknown');
  bad.identity.state='terminal';assert.equal(evaluate(bad).status,'unknown');
  const conflict=F.makeSample();conflict.source.consistent=false;assert.deepEqual(evaluate(conflict).reasons,['inconsistent-source']);
  conflict.source.consistent=true;conflict.schemaVersion='other';assert.deepEqual(evaluate(conflict).reasons,['invalid-schema']);
  const unknown=F.makeSample();unknown.scope='opportunity';assert.deepEqual(evaluate(unknown).reasons,['scope-unknown']);
  assert.equal(E.evaluateP14BShadowV1(null,{family:'B0'}).status,'unknown');
  assert.deepEqual(E.evaluateP14BShadowV1(F.makeSample(),{family:'B9'}).reasons,['invalid-candidate']);
  assert.deepEqual(E.evaluateP14BShadowV1(F.makeSample(),{family:'B0',formulaVersion:'other'}).reasons,['invalid-candidate']);
});

for(const distribution of ['_gam_kv_.js','IntextManager.js'])for(const modelId of E.MODELS){
  test(`${distribution}/${modelId}: model-specific measured/estimated qualification and mathematical results`,()=>{
    const s=F.makeSample({distribution,modelId,rect:{left:25,top:75,width:100,height:100}});freeze(s);
    const q=E.qualifyModelV1(s,s.plannedRegions[0]);assert.equal(q.valid,true);assert.deepEqual(q.failedChecks,[]);
    const r1=evaluate(s,'B1'),r2=evaluate(s,'B2'),r3=evaluate(s,'B3');
    assert.equal(r1.status,'pass');near(r1.areaFraction,3/16);near(r1.xFraction,3/4);near(r1.yFraction,1/4);
    assert.equal(r2.status,'fail');assert.equal(r3.status,'fail');assert.equal(r1.geometryQuality,modelId==='player-measured-current-flow'?'measured':'qualified-estimate');
    assert.equal(s.provenance.coreSha256,F.CORES[distribution]);
  });
}
test('Q1-Q5 fail independently from concrete witnesses, not five supplied pass flags',()=>{
  const cases=[['Q1',s=>s.plannedRegions[0].evidence.wrapperConnected=false],
    ['Q1',s=>s.plannedRegions[0].context.renderToken=9],
    ['Q2',s=>s.plannedRegions[0].context.viewportRevision='other'],
    ['Q2',s=>s.plannedRegions[0].context.sampleSequence=99],
    ['Q3',s=>s.plannedRegions[0].evidence.externalUnusedFlag=true],
    ['Q3',s=>s.plannedRegions[0].evidence.sourcesResolved=false],
    ['Q3',s=>s.provenance.coreSha256='a'.repeat(64)],
    ['Q4',s=>s.plannedRegions[0].evidence.externalStylesResolved=false],
    ['Q4',s=>s.plannedRegions[0].evidence.intentionalClosureKnown=false],
    ['Q5',s=>s.plannedRegions[0].evidence.sourceConflict=true],
    ['Q5',s=>s.plannedRegions[0].modelVersion='999']];
  // An unknown evidence property does not qualify or disqualify a model.
  const ignored=cases.splice(4,1)[0];const ok=F.makeSample();ignored[1](ok);assert.equal(E.qualifyModelV1(ok,ok.plannedRegions[0]).valid,true);
  for(const [check,change]of cases){const s=F.makeSample();change(s);const q=E.qualifyModelV1(s,s.plannedRegions[0]);
    assert.equal(q.valid,false);assert.equal(q.checks[check],false);assert.equal(evaluate(s,'B1').status,'unknown');assert.equal(evaluate(s).status,'pass');}
});
test('Partial/unknown models do not become measured by successful geometry or later snapshots',()=>{
  for(const quality of ['partial','unknown','measured']){
    const s=F.makeSample();s.plannedRegions[0].quality=quality;
    for(const f of ['B1','B2','B3'])assert.equal(evaluate(s,f).status,'unknown');assert.equal(evaluate(s).status,'pass');
  }
  const s=F.makeSample({modelId:'player-measured-current-flow'});s.stage='before-player';s.plannedRegions[0].context.stage='before-player';
  assert.equal(evaluate(s,'B1').status,'unknown');
});
test('Literal 350px and a closed wrapper are not qualification or perceptibility proofs',()=>{
  const s=F.makeSample({rect:{left:16,top:1091.6624755859375,width:380,height:350},viewportWidth:412,viewportHeight:922});
  s.anchor={rect:{left:16,top:921.6625366210938,width:380,height:150}};s.wrapper={height:0,opacity:0};
  const anchor=E.geometryV1(s.anchor.rect,s.viewport);near(anchor.yFraction,0.33746337890625/150);
  near(anchor.areaFraction*100,0.2249755859375);assert.equal(evaluate(s).status,'pass');
  for(const f of ['B1','B2','B3']){const r=evaluate(s,f);assert.equal(r.status,'fail');assert.equal(r.areaFraction,0);}
  s.plannedRegions[0].evidence.sourcesResolved=false;assert.equal(evaluate(s,'B1').status,'unknown');
});
test('Envelope height uses independent numeric open operands, including chrome/default/preset paths',()=>{
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:345,wrapperChromeHeight:15,targetHeightPx:null}),360);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:600,wrapperChromeHeight:20,targetHeightPx:100}),620);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:345,wrapperChromeHeight:0,targetHeightPx:100}),360);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:345,wrapperChromeHeight:null,targetHeightPx:100}),360);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:null,wrapperChromeHeight:null,targetHeightPx:420}),420);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:1,wrapperChromeHeight:null,targetHeightPx:null}),360);
  for(const v of [NaN,Infinity,'345'])assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:v}),null);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:345,wrapperChromeHeight:1.5}),null);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:null,targetHeightPx:'360px'}),null);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:2,wrapperChromeHeight:-10}),null);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:345,targetHeightPx:360}),null);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:null,wrapperChromeHeight:null}),null);
});
test('Q2/Q3 require concrete matching origin/size operands, not only sourcesResolved=true',()=>{
  for(const modelId of ['player-intent-current-flow-v1','slot-open-envelope-v1']){
    const missing=F.makeSample({modelId});delete missing.plannedRegions[0].evidence.operands;
    assert.equal(evaluate(missing,'B1').status,'unknown');
    const moved=F.makeSample({modelId});moved.plannedRegions[0].evidence.operands.contentTopPx=1;
    assert.equal(E.qualifyModelV1(moved,moved.plannedRegions[0]).checks.Q2,false);
    const badHeight=F.makeSample({modelId});badHeight.plannedRegions[0].rect.height=99;
    assert.equal(E.qualifyModelV1(badHeight,badHeight.plannedRegions[0]).checks.Q3,false);
    assert.equal(evaluate(badHeight,'B1').status,'unknown');assert.equal(evaluate(badHeight).status,'pass');
  }
});
test('The 46.382% sample compares thresholds at the sample, never interpolates a crossing',()=>{
  const s=F.makeSample({rect:{left:16,top:759.6625366210938,width:380,height:350},viewportWidth:412,viewportHeight:922});
  const quarter=evaluate(s,'B2');near(quarter.areaFraction,162.33746337890625/350);assert.equal(quarter.status,'pass');
  assert.equal(evaluate(s,'B2',s.plannedRegions[0].modelId,{areaFraction:0.5}).status,'fail');
  assert.equal(Object.hasOwn(quarter,'wouldActivateAt'),false);
});
test('Horizontal clipping, vertical fraction and area are distinct mathematical quantities',()=>{
  const s=F.makeSample({rect:{left:-50,top:0,width:100,height:200}});
  const g=E.geometryV1(s.plannedRegions[0].rect,s.viewport);near(g.xFraction,0.5);near(g.yFraction,0.5);near(g.areaFraction,0.25);
  assert.equal(evaluate(s,'B2').status,'pass');assert.equal(evaluate(s,'B3').status,'fail');
  assert.equal(evaluate(s,'B3',s.plannedRegions[0].modelId,{xFraction:0.5,yFraction:0.5}).status,'pass');
});
test('Oversized surfaces report an unreachable threshold, never lower it',()=>{
  const s=F.makeSample({rect:{left:0,top:0,width:400,height:400}});const r=evaluate(s,'B2');
  near(r.maxAreaFraction,1/16);near(r.areaFraction,1/16);assert.deepEqual(r.reasons,['threshold-unreachable-by-size']);
});
test('Versioned parameters are explicit calibration sets, not silent thresholds',()=>{
  const s=F.makeSample();for(const p of [null,NaN,0,1,0.3,'0.25'])assert.equal(evaluate(s,'B2',s.plannedRegions[0].modelId,{areaFraction:p}).status,'unknown');
  assert.equal(evaluate(s,'B3',s.plannedRegions[0].modelId,{xFraction:0.75,yFraction:0.5}).status,'unknown');
  assert.equal(evaluate(s,'B1','unknown-model').status,'unknown');
});
test('Touching edges are not positive intersections; a fractional crossing is',()=>{
  for(const rect of [{left:0,top:100,width:10,height:10},{left:0,top:-10,width:10,height:10},{left:100,top:0,width:10,height:10}]){
    const s=F.makeSample({rect});assert.equal(evaluate(s,'B1').status,'fail');}
  const s=F.makeSample({rect:{left:0,top:99.999,width:10,height:10}});assert.equal(evaluate(s,'B1').status,'pass');
});
test('Analytical clipping agrees with an independent integer unit-cell enumeration',()=>{
  // The oracle counts interior cell centers in a finite grid; it does not copy endpoint clipping formulae.
  for(let left=-5;left<=7;left+=2)for(let top=-5;top<=7;top+=2)for(const width of [1,3,8])for(const height of [1,4,9]){
    let cells=0;for(let x=0;x<6;x++)for(let y=0;y<5;y++)if(x+0.5>left&&x+0.5<left+width&&y+0.5>top&&y+0.5<top+height)cells++;
    const g=E.geometryV1({left,top,width,height},{width:6,height:5});near(g.areaFraction,cells/(width*height));
    assert.ok(g.areaFraction>=0&&g.areaFraction<=g.maxAreaFraction+1e-12&&g.maxAreaFraction<=1);
  }
});
test('Invalid, null, NaN, infinite and arithmetic-overflow dimensions remain unknown',()=>{
  for(const bad of [null,undefined,NaN,Infinity,-Infinity,0,-1,'100'])for(const key of ['width','height']){
    const s=F.makeSample();s.plannedRegions[0].rect[key]=bad;
    assert.equal(evaluate(s,'B1').status,'unknown');assert.equal(E.geometryV1(s.plannedRegions[0].rect,s.viewport),null);}
  for(const bad of [null,NaN,Infinity,0,-1,'100']){
    const s=F.makeSample();s.viewport.width=bad;assert.equal(evaluate(s).status,'pass');assert.equal(evaluate(s,'B2').status,'unknown');}
  const s=F.makeSample();s.plannedRegions[0].rect={left:1e308,top:1e308,width:1e308,height:1e308};assert.equal(evaluate(s,'B1').status,'unknown');
  assert.equal(E.geometryV1({left:0,top:0,width:1e-300,height:1e-300},{width:100,height:100}),null);
});
test('Ambiguous or foreign geometry is not silently chosen',()=>{
  const s=F.makeSample();s.plannedRegions.push(structuredClone(s.plannedRegions[0]));assert.deepEqual(evaluate(s,'B1').reasons,['ambiguous-planned-rect']);
  s.plannedRegions=[];assert.deepEqual(evaluate(s,'B1').reasons,['no-planned-rect']);
  s.plannedRegions=Array(4).fill({});assert.equal(evaluate(s,'B1').status,'unknown');
  const p=F.makeSample();p.plannedRegions[0].context.anchorLocalId='other';assert.equal(evaluate(p,'B1').status,'unknown');
  p.plannedRegions[0].evidence.pipFloating=true;assert.equal(evaluate(p,'B1').status,'not-applicable');assert.equal(evaluate(p).status,'pass');
});
test('B4/B5 stay deferred even with ideal independent pairs, false control or missing P',()=>{
  for(const eligible of [true,false])for(const family of ['B4','B5']){
    const s=F.makeSample({control:eligible});s.motion={pairs:[{dt:50,dy:1},{dt:50,dy:1}],independent:true};delete s.plannedRegions;
    const r=evaluate(s,family);assert.equal(r.status,'unknown');assert.deepEqual(r.reasons,['temporal-stage-deferred']);assert.equal(r.movementQuality,'deferred');}
});
test('Accessor values and custom-prototype inputs are not executed as observation',()=>{
  const s=F.makeSample();let reads=0;Object.defineProperty(s.control,'eligible',{get(){reads++;throw Error('accessor');}});
  assert.equal(evaluate(s).status,'unknown');assert.equal(reads,0);
  assert.equal(E.evaluateP14BShadowV1(Object.create(s),F.candidate()).status,'unknown');
  const n=Object.assign(Object.create(null),F.makeSample());assert.equal(evaluate(n).status,'pass');
});

test('Ledger totals come from fetch, initial winner and C0, never P or retained snapshots',()=>{
  const l=makeLedger({limits:{snapshots:0,snapshotBytes:2}});
  for(let cycle=1;cycle<=3;cycle++){
    const s=F.makeSample({cycleId:cycle,scope:cycle===3?'display':'video'});delete s.plannedRegions;
    l.ingest(s,{fetchObserved:true,initialWinner:cycle===3?'display':'video',terminal:'complete',frameCoverageComplete:true});
  }
  l.close({endTimeMs:100});const e=l.exportManual();
  assert.deepEqual(e.totals.D0,{yes:3,no:0,unknown:0,complete:true});
  assert.deepEqual(e.totals.Dv,{yes:2,no:1,unknown:0,complete:true});
  assert.deepEqual(e.totals.Dc,{yes:2,no:0,unknown:0,complete:true});assert.equal(e.snapshots.length,0);
  assert.equal(e.coverage.flags.rawDropped,3);assert.equal(e.rates.videoOpportunityShare.value,2/3);assert.equal(e.rates.controlObservedShare.value,1);
  assert.ok(e.summaries.every(s=>s.censor.rawEvidenceEvicted));
});
test('Ring FIFO eviction preserves populations, outcomes, timestamps and loss summaries',()=>{
  const l=makeLedger({limits:{snapshots:1}});
  for(let c=1;c<=3;c++)l.ingest(...completeSample({cycleId:c}));
  l.close({endTimeMs:100});const e=l.exportManual();assert.equal(e.snapshots.length,1);assert.equal(e.snapshots[0].opportunityId,'o3');
  assert.equal(e.totals.D0.yes,3);assert.equal(e.totals.Dv.yes,3);assert.equal(e.totals.Dc.yes,3);assert.equal(e.rates.videoWithObservedFrame.value,1);
  assert.equal(e.summaries[0].firstControlAt,10);assert.equal(e.summaries[0].firstFrameAt,10);assert.equal(e.summaries[0].loss.count,1);
  assert.equal(e.coverage.flags.rawDropped,2);assert.equal(e.coverage.exactRatesAllowed,true);
});
test('The contractual 2000-snapshot limit evicts only raw data on event 2001',()=>{
  const l=makeLedger({candidates:[F.candidate()]});
  for(let seq=1;seq<=2001;seq++){
    const s=F.makeSample({sequence:seq,monotonicMs:seq});delete s.plannedRegions;
    l.ingest(s,seq===1?{fetchObserved:true,initialWinner:'video'}:{});
  }
  l.close({endTimeMs:2010});const e=l.exportManual();assert.equal(e.snapshots.length,2000);
  assert.equal(e.snapshots[0].sequence,2);assert.equal(e.coverage.flags.rawDropped,1);
  assert.equal(e.totals.D0.yes,1);assert.equal(e.totals.Dv.yes,1);assert.equal(e.totals.Dc.yes,1);
  assert.equal(e.summaries[0].results[0].pass,2001);assert.equal(e.coverage.flags.accountingOverflow,false);
  assert.ok(e.memory.logicalSnapshotBytes<=1760*1024);
});
test('Byte-budget FIFO eviction is independent from the snapshot-count bound',()=>{
  const probe=makeLedger({candidates:[F.candidate()]});probe.ingest(...completeSample());
  const one=probe.exportManual().memory.logicalSnapshotBytes;
  const l=makeLedger({candidates:[F.candidate()],limits:{snapshotBytes:one+100}});
  l.ingest(...completeSample());l.ingest(...completeSample({cycleId:2}));l.close({endTimeMs:100});
  const e=l.exportManual();assert.equal(e.snapshots.length,1);assert.equal(e.snapshots[0].opportunityId,'o2');
  assert.equal(e.totals.D0.yes,2);assert.equal(e.totals.Dc.yes,2);assert.equal(e.coverage.flags.rawDropped,1);
  assert.equal(e.coverage.flags.accountingOverflow,false);
});
test('Incremental ring byte accounting agrees with independent full JSON serialization after eviction',()=>{
  const l=makeLedger({candidates:[F.candidate()],limits:{snapshots:3}});
  for(let cycle=1;cycle<=10;cycle++){
    l.ingest(...completeSample({cycleId:cycle}));const e=l.exportManual();
    const represented=e.snapshots.map(payload=>({key:JSON.stringify(['documentOne','navOne','slotOne',Number(payload.opportunityId.slice(1))]),payload}));
    assert.equal(e.memory.logicalSnapshotBytes,Buffer.byteLength(JSON.stringify(represented),'utf8'));
  }
});
test('Opportunity 65 freezes admission, not the commercial lifecycle, and blocks all exact capture rates',()=>{
  const l=makeLedger();for(let c=1;c<=65;c++)l.ingest(...completeSample({cycleId:c}));
  l.ingest(...completeSample({cycleId:65,monotonicMs:660,sequence:66}));
  l.close({endTimeMs:1000});const e=l.exportManual();assert.equal(e.summaries.length,64);assert.equal(e.totals.D0.yes,64);
  assert.equal(e.coverage.flags.accountingOverflow,true);assert.equal(e.coverage.flags.untrackedOpportunityNotifications,2);
  assert.equal(e.coverage.exactRatesAllowed,false);assert.equal(e.totals.D0.complete,false);
  for(const r of Object.values(e.rates))assert.equal(r.exactRatesAllowed,false);
  assert.deepEqual(l.exportManual(),e);assert.equal(l.ingest(F.makeSample()).reason,'ledger-closed');
});
test('Deduplication, pending winner and later control facts are independent of candidates',()=>{
  const l=makeLedger();const s=F.makeSample();delete s.plannedRegions;
  l.ingest(s,{fetchObserved:true});l.ingest(s,{fetchObserved:true});
  assert.equal(l.exportManual().totals.D0.yes,1);assert.equal(l.exportManual().totals.Dv.unknown,1);assert.equal(l.exportManual().totals.Dc.yes,0);
  l.ingest(s,{initialWinner:'video'});l.ingest(s,{initialWinner:'video'});
  assert.equal(l.exportManual().totals.Dv.yes,1);assert.equal(l.exportManual().totals.Dc.yes,1);
  l.ingest(s,{terminal:'timeout',frameCoverageComplete:true});l.close({endTimeMs:20});
  assert.equal(l.exportManual().totals.Dc.yes,1);assert.equal(l.exportManual().rates.videoWithObservedFrame.value,0);
});
test('Conflicting winners become unknown; a successful candidate cannot select a winner',()=>{
  const l=makeLedger();const s=F.makeSample();l.ingest(s,{fetchObserved:true,initialWinner:'video'});l.ingest(s,{initialWinner:'display'});
  l.close({endTimeMs:20});const e=l.exportManual();assert.equal(e.totals.Dv.yes,0);assert.equal(e.totals.Dv.unknown,1);
  assert.equal(e.summaries[0].winnerConflict,true);assert.equal(e.rates.videoOpportunityShare.value,null);
});
test('A format scope contradicting the declared initial winner fails accounting closed',()=>{
  const l=makeLedger();l.ingest(F.makeSample({scope:'display'}),{fetchObserved:true,initialWinner:'video'});l.close({endTimeMs:20});
  const e=l.exportManual();assert.equal(e.totals.D0.yes,1);assert.equal(e.totals.Dv.unknown,1);
  assert.equal(e.summaries[0].winnerConflict,true);assert.equal(e.coverage.exactRatesAllowed,false);
});
test('Unknown control, missing winner and right-censored outcomes cannot produce exact rates',()=>{
  const l=makeLedger();const a=F.makeSample();a.control.observed=false;l.ingest(a,{fetchObserved:true,initialWinner:'video'});
  const b=F.makeSample({cycleId:2});l.ingest(b,{fetchObserved:true});l.close({endTimeMs:100});const e=l.exportManual();
  assert.equal(e.totals.D0.complete,true);assert.equal(e.totals.Dv.unknown,1);assert.equal(e.totals.Dc.unknown,1);
  assert.ok(e.summaries.every(s=>s.censor.right));assert.equal(e.rates.videoWithObservedFrame.value,null);
  assert.equal(e.rates.firstPassFrame.value,null);assert.equal(e.coverage.exactRatesAllowed,false);
});
test('No-frame terminal and incomplete temporal coverage remain distinct',()=>{
  const l=makeLedger();l.ingest(F.makeSample(),{fetchObserved:true,initialWinner:'video',terminal:'timeout',frameCoverageComplete:true});l.close({endTimeMs:20});
  assert.equal(l.exportManual().rates.videoWithObservedFrame.value,0);assert.equal(l.exportManual().rates.firstPassFrame.value,null);
  const other=makeLedger();other.ingest(F.makeSample(),{fetchObserved:true,initialWinner:'video',terminal:'timeout'});other.close({endTimeMs:20});
  assert.equal(other.exportManual().rates.videoWithObservedFrame.value,null);
});
for(const gap of ['D0','Dv','Dc','outcomes','all'])test(`Gap ${gap} blocks only supported rates needing the affected population/coverage`,()=>{
  const l=makeLedger();l.ingest(...completeSample());l.markGap(gap);l.close({endTimeMs:20});const e=l.exportManual();
  assert.equal(e.coverage.exactRatesAllowed,false);assert.equal(e.coverage.flags.sourceGap,true);assert.equal(e.summaries[0].censor.sourceGap,true);
  if(['D0','Dv','all'].includes(gap))assert.equal(e.rates.videoOpportunityShare.value,null);
  if(gap==='Dc')assert.equal(e.rates.controlObservedShare.value,null);
  if(gap==='outcomes')assert.equal(e.rates.videoWithObservedFrame.value,null);
});
test('Coverage is not assumed by default, even for a fully successful synthetic stream',()=>{
  const l=makeLedger({coverage:{}});l.ingest(...completeSample());l.close({endTimeMs:20});const e=l.exportManual();
  assert.equal(e.totals.D0.yes,1);assert.equal(e.coverage.exactRatesAllowed,false);assert.equal(e.rates.videoOpportunityShare.value,null);
});
test('An observation without fetch taints D0; a later fetch does not silently restore integrity',()=>{
  const l=makeLedger();const s=F.makeSample();l.ingest(s,{initialWinner:'video'});assert.equal(l.exportManual().totals.D0.unknown,1);
  l.ingest(s,{fetchObserved:true});l.close({endTimeMs:20});assert.equal(l.exportManual().totals.D0.yes,1);assert.equal(l.exportManual().totals.D0.complete,false);
});
test('Geometric left censor survives raw eviction without becoming a factual source gap',()=>{
  for(const field of ['leftCensored','sourceGap']){
    const l=makeLedger({limits:{snapshots:0,snapshotBytes:2}}),s=F.makeSample();s.coverage[field]=true;l.ingest(s,F.completedFacts(s));l.close({endTimeMs:20});
    const e=l.exportManual();assert.equal(e.coverage.exactRatesAllowed,field==='leftCensored');assert.equal(e.coverage.flags.sourceGap,field==='sourceGap');
    assert.equal(e.snapshots.length,0);assert.equal(e.summaries[0].censor.rawEvidenceEvicted,true);
    assert.equal(e.summaries[0].censor[field==='leftCensored'?'left':'sourceGap'],true);}
});
test('Two slots/navs/cycles are separate; foreign documents do not contaminate this ledger',()=>{
  const l=makeLedger();l.ingest(...completeSample());
  l.ingest(...completeSample({slotLocalId:'slotTwo',monotonicMs:20}));
  l.ingest(...completeSample({navigationLocalId:'navTwo',monotonicMs:30}));
  assert.equal(l.ingest(...completeSample({documentLocalId:'otherDoc',monotonicMs:40})).reason,'document-mismatch');
  l.close({endTimeMs:50});assert.equal(l.exportManual().totals.D0.yes,3);
});
test('New generations retire old tokens and terminal cycles never restart',()=>{
  const l=makeLedger();l.ingest(F.makeSample(),{fetchObserved:true,initialWinner:'video'});
  const next=F.makeSample({renderToken:2,fetchGeneration:2,monotonicMs:20,sequence:2});l.ingest(next,{});
  assert.equal(l.ingest(F.makeSample({monotonicMs:21,sequence:3}),{frame:{observed:true,media:'ad',source:'request-video-frame-callback'}}).reason,'retired-generation');
  l.ingest(F.makeSample({renderToken:2,fetchGeneration:2,monotonicMs:22,sequence:4}),{terminal:'timeout'});
  assert.equal(l.ingest(F.makeSample({renderToken:2,fetchGeneration:2,monotonicMs:23,sequence:5}),{}).reason,'opportunity-terminal');
  l.close({endTimeMs:30});assert.equal(l.exportManual().totals.D0.yes,1);assert.equal(l.exportManual().summaries[0].frameObserved,false);
});
test('A terminal factual closure can finish a known summary without activating or inventing C0/frame',()=>{
  const l=makeLedger();l.ingest(F.makeSample({control:false}),{fetchObserved:true,initialWinner:'video'});
  const terminal=F.makeSample({monotonicMs:20,sequence:2});terminal.identity.state='terminal';
  const result=l.ingest(terminal,{terminal:'timeout',frameCoverageComplete:true,
    frame:{observed:true,media:'ad',source:'request-video-frame-callback'}});
  assert.equal(result.accepted,true);assert.ok(result.results.every(r=>r.status==='not-applicable'));
  l.close({endTimeMs:30});const e=l.exportManual();assert.equal(e.totals.D0.yes,1);assert.equal(e.totals.Dc.yes,0);
  assert.equal(e.summaries[0].terminal,'timeout');assert.equal(e.summaries[0].frameObserved,false);
  const unknown=makeLedger();assert.equal(unknown.ingest(terminal,{terminal:'timeout'}).accepted,false);
  assert.equal(unknown.exportManual().totals.D0.yes,0);
});
test('Base media, STARTED and IMPRESSION do not invent an ad frame or first-pass success',()=>{
  const l=makeLedger();l.ingest(F.makeSample(),{fetchObserved:true,initialWinner:'video',impressionObserved:true,
    frame:{observed:true,media:'base',source:'request-video-frame-callback'},terminal:'complete'});
  l.close({endTimeMs:20});const e=l.exportManual();assert.equal(e.summaries[0].impressionObserved,true);
  assert.equal(e.summaries[0].frameObserved,false);assert.equal(e.rates.videoWithObservedFrame.value,null);assert.equal(e.rates.firstPassFrame.value,null);
});
test('Negative/NaN clocks, regressions and malformed identities fail data accounting closed',()=>{
  for(const t of [null,NaN,-1,Infinity]){const l=makeLedger(),s=F.makeSample();s.monotonicMs=t;assert.equal(l.ingest(s,{fetchObserved:true}).accepted,false);l.close({endTimeMs:20});assert.equal(l.exportManual().totals.D0.complete,false);}
  const l=makeLedger();l.ingest(F.makeSample(),{fetchObserved:true});assert.equal(l.ingest(F.makeSample({monotonicMs:9}),{}).reason,'clock-regression');
  const bad=F.makeSample();bad.identity.cycleId=null;assert.equal(l.ingest(bad).accepted,false);
  assert.throws(()=>l.markGap('network'),/gap_scope/);assert.throws(()=>l.close({endTimeMs:0}),/end_time/);
});
test('Clock domains are explicit and cannot merge HAR epochs with page-monotonic data',()=>{
  const l=makeLedger(),s=F.makeSample();s.sourceClock='har-epoch-ms';assert.equal(l.ingest(s,{fetchObserved:true}).reason,'invalid-clock');
  assert.equal(evaluate(s).status,'pass');assert.equal(evaluate(s,'B1').status,'unknown');
  assert.throws(()=>makeLedger({sourceClock:'har-epoch-ms'}),/clock_domain/);
  const valid=makeLedger();valid.ingest(...completeSample());valid.close({endTimeMs:30});
  const e=valid.exportManual();assert.equal(e.sourceClock,'synthetic-monotonic-ms');assert.equal(e.windowStartObservedMs,10);assert.equal(e.windowEndMs,30);
});
test('Summary memory overflow retains prior counters and prevents exact global rates',()=>{
  const l=makeLedger({limits:{summaryBytes:0}});assert.equal(l.ingest(...completeSample()).accepted,false);
  l.close({endTimeMs:20});const e=l.exportManual();assert.equal(e.summaries.length,0);assert.equal(e.totals.D0.yes,0);
  assert.equal(e.coverage.flags.summaryOverflow,true);assert.equal(e.coverage.exactRatesAllowed,false);
});
test('Byte eviction and over-size snapshot rejection do not become population gaps',()=>{
  const l=makeLedger({limits:{snapshotBytes:2}});l.ingest(...completeSample());l.close({endTimeMs:20});const e=l.exportManual();
  assert.equal(e.snapshots.length,0);assert.equal(e.coverage.flags.oversizedSnapshots,1);assert.equal(e.coverage.exactRatesAllowed,true);
  assert.equal(e.memory.logicalSnapshotBytes,2);assert.equal(e.totals.D0.yes,1);
});
test('Limits cannot be raised above r2, partitions must fit, and catalogue size is bounded',()=>{
  for(const limits of [{opportunities:65},{snapshots:2001},{summaryBytes:LIMITS.summaryBytes+1},{snapshotBytes:LIMITS.snapshotBytes+1},
    {aggregateBytes:100},{totalBytes:4096},{snapshots:NaN},{unknown:1}])assert.throws(()=>makeLedger({limits}),/p14b_/);
  assert.throws(()=>makeLedger({candidates:[]}),/catalogue/);assert.throws(()=>makeLedger({candidates:[F.candidate(),F.candidate()]}),/duplicate/);
  assert.throws(()=>makeLedger({candidates:[{family:'B2',rectModelId:'unknown'}]}),/catalogue/);
  assert.throws(()=>makeLedger({candidates:Array(33).fill(F.candidate())}),/catalogue/);
});
test('Every committed ledger component remains within its logical serialization partition',()=>{
  const l=makeLedger({limits:{snapshots:5,snapshotBytes:12000}});
  for(let c=1;c<=70;c++){
    l.ingest(...completeSample({cycleId:c}));const m=l.exportManual().memory;
    assert.ok(m.logicalSummaryBytes<=m.limits.summaryBytes);assert.ok(m.logicalAggregateBytes<=m.limits.aggregateBytes);
    assert.ok(m.logicalSnapshotBytes<=m.limits.snapshotBytes);assert.ok(m.logicalSummaryBytes+m.logicalAggregateBytes+m.logicalSnapshotBytes<=m.limits.totalBytes);
  }
});
test('Manual export is detached, deterministic, sanitized and size checked without reset or I/O',()=>{
  const l=makeLedger();const s=F.makeSample();s.url='https://example.test/?token=SECRET';s.cookie='SECRET';s.campaignId='SECRET';
  s.toJSON=()=>{throw Error('must not serialize input');};s.deep={loop:s};s.payload='SECRET'.repeat(100000);
  s.plannedRegions[0].evidence.xml='<VAST>SECRET</VAST>';s.plannedRegions[0].rect.width=NaN;
  l.ingest(s,F.completedFacts(s));l.close({endTimeMs:20});const a=l.exportManual(),b=l.exportManual();assert.deepEqual(a,b);
  const encoded=l.serializeManual();assert.equal(encoded.status,'ok');assert.equal(Buffer.byteLength(encoded.json),encoded.bytes);assert.deepEqual(JSON.parse(encoded.json),a);
  for(const text of ['SECRET','https://','<VAST>','cookie','campaignId','documentOne','navOne','slotOne','anchorOne'])assert.ok(!encoded.json.includes(text),text);
  a.summaries[0].winner='display';a.coverage.flags.rawDropped=99;assert.deepEqual(l.exportManual(),b);
  assert.equal(l.serializeManual({maxBytes:10}).status,'export-too-large');assert.equal(l.serializeManual({maxBytes:10}).json,null);
  assert.deepEqual(l.exportManual(),b);assert.throws(()=>l.serializeManual({maxBytes:Infinity}),/export_limit/);
  assert.throws(()=>l.serializeManual({maxBytes:LIMITS.totalBytes+1}),/export_limit/);
});
test('Mutable ingestion receipts and exports cannot change retained data or leak strings',()=>{
  const l=makeLedger(),receipt=l.ingest(...completeSample());
  receipt.results[0].reasons.push('SECRET');receipt.results[0].status='fail';
  l.close({endTimeMs:20});const a=l.exportManual();
  assert.equal(a.snapshots[0].results[0].status,'pass');assert.ok(!JSON.stringify(a).includes('SECRET'));
  a.memory.limits.opportunities=1;assert.equal(l.exportManual().memory.limits.opportunities,64);
});
test('A gap in control coverage does not erase an independently covered frame numerator',()=>{
  const l=makeLedger();l.ingest(F.makeSample(),{fetchObserved:true,initialWinner:'video',terminal:'timeout',frameCoverageComplete:true});
  l.markGap('Dc');l.close({endTimeMs:20});const e=l.exportManual();
  assert.equal(e.rates.controlObservedShare.value,null);assert.equal(e.rates.videoWithObservedFrame.value,0);
});
test('Empty population is null, not a zero-percent or NaN success',()=>{
  const l=makeLedger();l.close({endTimeMs:0});const e=l.exportManual();for(const r of Object.values(e.rates)){assert.equal(r.value,null);assert.equal(r.exactRatesAllowed,false);}
  assert.equal(l.markGap().reason,'ledger-closed');assert.equal(l.close({endTimeMs:1}).reason,'ledger-closed');
});

test('Both distributions and both pre-player intent/envelope models support the same isolated data pipeline',()=>{
  for(const distribution of ['_gam_kv_.js','IntextManager.js'])for(const modelId of ['player-intent-current-flow-v1','slot-open-envelope-v1']){
    const l=makeLedger({candidates:F.catalogue(modelId),limits:{snapshots:1}});
    for(let c=1;c<=3;c++){const pair=completeSample({distribution,modelId,cycleId:c,rect:{left:0,top:90,width:100,height:100}});l.ingest(...pair.map(freeze));}
    l.close({endTimeMs:100});const e=l.exportManual();assert.equal(e.totals.D0.yes,3);assert.equal(e.totals.Dv.yes,3);assert.equal(e.totals.Dc.yes,3);
    assert.equal(e.summaries[0].results[0].pass,1);assert.equal(e.summaries[0].results[1].pass,1);assert.equal(e.summaries[0].results[2].fail,1);
    assert.equal(e.summaries[0].results[4].unknown,1);assert.equal(e.snapshots[0].distribution,distribution);
    assert.equal(e.rates.videoWithObservedFrame.value,1);assert.equal(e.rates.firstPassFrame.value,null);
  }
});
test('Isolated modules run with browser/SDK/network/timer globals unavailable and only pure data imports',()=>{
  const dir=path.join(__dirname,'qa'),context=vm.createContext({}),cache=new Map();let forbiddenReads=0;
  for(const name of ['window','document','google','googletag','pbjs','fetch','XMLHttpRequest','setTimeout','setInterval','performance'])
    Object.defineProperty(context,name,{get(){forbiddenReads++;throw Error('forbidden global '+name);}});
  function load(file){
    if(cache.has(file))return cache.get(file).exports;const mod={exports:{}};cache.set(file,mod);
    const source=fs.readFileSync(path.join(dir,file),'utf8');
    const requireOnly=name=>{if(name==='node:buffer')return require('node:buffer');if(/^\.\/intext-p14b-(data|shadow-evaluator)\.cjs$/.test(name))return load(name.slice(2));throw Error('forbidden import '+name);};
    vm.runInContext('(function(require,module,exports){'+source+'\n})',context)(requireOnly,mod,mod.exports);return mod.exports;
  }
  context.evaluator=load('intext-p14b-shadow-evaluator.cjs');context.ledger=load('intext-p14b-shadow-ledger.cjs');
  context.sampleJson=JSON.stringify(F.makeSample());context.candidatesJson=JSON.stringify(F.catalogue());
  const result=vm.runInContext(`(()=>{const s=JSON.parse(sampleJson),l=ledger.createP14BLedgerV1({documentLocalId:'documentOne',candidates:JSON.parse(candidatesJson)});l.ingest(s,{fetchObserved:true,initialWinner:'video'});return evaluator.evaluateP14BShadowV1(s,{family:'B0'}).status+':'+l.serializeManual().status;})()`,context);
  assert.equal(result,'pass:ok');assert.equal(forbiddenReads,0);
});
test('Audit R1: geometric left censor retains complete factual denominators and observed-frame rate',()=>{
  const l=makeLedger(),s=F.makeSample();s.coverage.leftCensored=true;
  l.ingest(s,F.completedFacts(s));l.close({endTimeMs:20});const e=l.exportManual();
  assert.equal(e.summaries[0].censor.left,true);assert.equal(e.summaries[0].censor.sourceGap,false);
  for(const d of ['D0','Dv','Dc'])assert.deepEqual(e.totals[d],{yes:1,no:0,unknown:0,complete:true});
  assert.deepEqual(e.coverage.gaps,{D0:false,Dv:false,Dc:false,outcomes:false});
  assert.equal(e.rates.videoWithObservedFrame.value,1);assert.equal(e.coverage.exactRatesAllowed,true);
  assert.equal(e.rates.firstPassFrame.value,null);assert.equal(e.rates.firstPassFrame.exactRatesAllowed,false);
  const zero=makeLedger(),noFrame=F.completedFacts(s);delete noFrame.frame;
  zero.ingest(s,noFrame);zero.close({endTimeMs:20});
  assert.equal(zero.exportManual().rates.videoWithObservedFrame.value,0);
  assert.equal(zero.exportManual().coverage.exactRatesAllowed,true);
});
test('Audit R1: left censor never repairs missing factual sources, membership or numerators',()=>{
  for(const d of ['D0','Dv','Dc','outcomes']){
    const l=makeLedger({coverage:{...F.fullCoverage(),[d]:false}}),s=F.makeSample();s.coverage.leftCensored=true;
    l.ingest(s,F.completedFacts(s));l.close({endTimeMs:20});const e=l.exportManual();
    assert.equal(e.coverage.exactRatesAllowed,false);assert.equal(e.coverage.flags.sourceGap,false);
    const metric=d==='outcomes'?'videoWithObservedFrame':d==='Dc'?'controlObservedShare':'videoOpportunityShare';
    assert.equal(e.rates[metric].value,null);
  }
  for(const missing of ['fetchObserved','initialWinner','frame']){
    const l=makeLedger(),s=F.makeSample(),facts=F.completedFacts(s);s.coverage.leftCensored=true;
    delete facts[missing];if(missing==='frame')delete facts.frameCoverageComplete;
    l.ingest(s,facts);l.close({endTimeMs:20});assert.equal(l.exportManual().coverage.exactRatesAllowed,false);
  }
});
test('Audit R2: each admitted source needs matched active ad binding and real frame evidence',()=>{
  for(const source of ['request-video-frame-callback','ad-playing-confirmed','ad-timeupdate-confirmed']){
    const l=makeLedger(),s=F.makeSample({stage:'after-player'}),facts=F.completedFacts(s);facts.frame=F.frameFor(s,source);
    l.ingest(s,facts);l.close({endTimeMs:20});const e=l.exportManual();
    assert.equal(e.summaries[0].frameObserved,true);assert.equal(e.summaries[0].firstFrameToken,1);
    assert.equal(e.rates.videoWithObservedFrame.value,1);assert.equal(e.summaries[0].frameAttributionIncomplete,false);
  }
});
test('Audit R2: incompatible or unproven frame cannot produce a frame or an exact zero',()=>{
  const cases=[
    (s,f)=>f.renderToken=999,(s,f)=>f.activeRenderToken=999,(s,f)=>f.fetchGeneration=2,
    (s,f)=>f.cycleId=2,(s,f)=>f.documentLocalId='otherDoc',(s,f)=>f.navigationLocalId='otherNav',
    (s,f)=>f.slotLocalId='otherSlot',(s,f)=>f.anchorLocalId='otherAnchor',(s,f)=>f.state='terminal',(s,f)=>f.state='unobserved',
    (s,f)=>f.verified=false,(s,f)=>f.managerLocalId='otherManager',(s,f)=>f.mediaLocalId='otherMedia',
    (s,f)=>f.provenanceVerified=false,(s,f)=>delete f.managerLocalId,(s,f)=>delete f.evidence,
    (s,f)=>f.sourceClock='page-monotonic-ms',(s,f)=>f.monotonicMs=9,(s,f)=>f.media='base',
    (s,f)=>f.evidence.presentedFrames=0,(s,f)=>f.evidence.mediaTimeSeconds=NaN,
    (s,f)=>f.evidence.mediaTimeSeconds=-1,(s,f)=>f.evidence.kind='canplay',
    s=>delete s.adMediaBinding,s=>s.adMediaBinding.renderToken=999,s=>s.adMediaBinding.verified=false,
    s=>s.adMediaBinding.provenanceVerified=false,s=>s.adMediaBinding.media='base',
    s=>s.adMediaBinding.mediaLocalId='bad id',s=>s.adMediaBinding.managerLocalId=null,
  ];
  for(const change of cases){
    const l=makeLedger(),s=F.makeSample(),facts=F.completedFacts(s);change(s,facts.frame);
    l.ingest(s,facts);l.close({endTimeMs:20});const e=l.exportManual();
    assert.equal(e.summaries[0].frameObserved,false);assert.equal(e.summaries[0].firstFrameToken,null);
    assert.equal(e.summaries[0].frameAttributionIncomplete,true);assert.equal(e.rates.videoWithObservedFrame.value,null);
    assert.equal(e.totals.D0.complete,true);assert.equal(e.totals.Dv.complete,true);assert.equal(e.totals.Dc.complete,true);
  }
});
test('Audit R2: STARTED, IMPRESSION, canplay, dummy and event labels alone remain insufficient',()=>{
  for(const source of ['STARTED','IMPRESSION','canplay','dummy','ad-playing-confirmed','ad-timeupdate-confirmed']){
    const l=makeLedger(),s=F.makeSample(),facts=F.completedFacts(s);facts.frame.source=source;
    l.ingest(s,facts);l.close({endTimeMs:20});assert.equal(l.exportManual().summaries[0].frameObserved,false);
  }
  for(const value of [0,NaN,Infinity,1.5]){
    const l=makeLedger(),s=F.makeSample(),facts=F.completedFacts(s);facts.frame=F.frameFor(s,'ad-timeupdate-confirmed');
    facts.frame.evidence.decodedFramesSinceBinding=value;l.ingest(s,facts);l.close({endTimeMs:20});
    assert.equal(l.exportManual().rates.videoWithObservedFrame.value,null);
  }
  const l=makeLedger(),s=F.makeSample(),facts=F.completedFacts(s);facts.frame=F.frameFor(s,'ad-playing-confirmed');
  facts.frame.evidence.mediaTimeSeconds=0;l.ingest(s,facts);l.close({endTimeMs:20});assert.equal(l.exportManual().summaries[0].frameObserved,false);
});
test('Audit R2: rejected stale frame cannot poison a later verified active frame or leak its IDs',()=>{
  const l=makeLedger({limits:{snapshots:0,snapshotBytes:2}}),s=F.makeSample(),bad=F.frameFor(s);bad.renderToken=999;
  l.ingest(s,{fetchObserved:true,initialWinner:'video',frame:bad});
  const next=F.makeSample({renderToken:2,fetchGeneration:2,monotonicMs:20,sequence:2});
  l.ingest(next,F.completedFacts(next));l.close({endTimeMs:30});const e=l.exportManual();
  assert.equal(e.summaries[0].frameObserved,true);assert.equal(e.summaries[0].firstFrameToken,2);assert.equal(e.summaries[0].firstFrameAt,20);
  assert.equal(e.summaries[0].frameAttributionIncomplete,true);assert.equal(e.rates.videoWithObservedFrame.value,1);
  const json=l.serializeManual().json;for(const secret of ['syntheticManager','syntheticAdMedia','managerLocalId','mediaLocalId','adMediaBinding'])assert.ok(!json.includes(secret));
});
test('Audit R3: override 345 plus chrome -1 invalidates Q3 instead of admitting height 344',()=>{
  for(const distribution of ['_gam_kv_.js','IntextManager.js']){
    const s=F.makeSample({distribution,modelId:'slot-open-envelope-v1',rect:{left:0,top:0,width:100,height:344}});
    Object.assign(s.plannedRegions[0].evidence.operands,{lockedHeightOverride:345,wrapperChromeHeight:-1});
    assert.equal(E.openEnvelopeHeightV1(s.plannedRegions[0].evidence.operands),null);
    assert.equal(E.qualifyModelV1(s,s.plannedRegions[0]).checks.Q3,false);assert.equal(evaluate(s,'B1').status,'unknown');
    assert.equal(evaluate(s).status,'pass');
  }
});
test('Audit R3: negative, nonfinite or inconsistent box/chrome contributions cannot qualify estimates',()=>{
  const fields=['paddingTopPx','paddingBottomPx','paddingLeftPx','paddingRightPx','borderTopPx','borderBottomPx','borderLeftPx','borderRightPx'];
  for(const modelId of ['player-intent-current-flow-v1','slot-open-envelope-v1']){
    for(const field of fields)for(const value of [-1,NaN,Infinity,null]){
      const s=F.makeSample({modelId});s.plannedRegions[0].evidence.operands.currentBox[field]=value;
      assert.equal(E.qualifyModelV1(s,s.plannedRegions[0]).checks.Q3,false);assert.equal(evaluate(s,'B1').status,'unknown');
    }
    for(const change of [o=>delete o.currentBox,o=>o.currentBox.borderBoxWidthPx=90,
      o=>o.currentBox.borderBoxLeftPx=1,o=>o.currentBox.borderBoxTopPx=1,
      o=>{o.currentBox.paddingTopPx=Number.MAX_VALUE;o.currentBox.paddingBottomPx=Number.MAX_VALUE;},
      o=>{o.currentBox.paddingLeftPx=100;},o=>o.wrapperChromeHeight=-1]){
      const s=F.makeSample({modelId});change(s.plannedRegions[0].evidence.operands);assert.equal(evaluate(s,'B1').status,'unknown');
    }
  }
  for(const chrome of [-1,NaN,Infinity,1.5])assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:null,wrapperChromeHeight:chrome,targetHeightPx:360}),null);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:-1,wrapperChromeHeight:15,targetHeightPx:360}),null);
  assert.equal(E.openEnvelopeHeightV1({lockedHeightOverride:345,wrapperChromeHeight:15,targetHeightPx:-1}),null);
});
test('Audit R3: nonzero resolved padding/borders preserve qualified current content origin and width',()=>{
  for(const modelId of ['player-intent-current-flow-v1','slot-open-envelope-v1']){
    const s=F.makeSample({modelId,rect:{left:12,top:24,width:100,height:360}}),o=s.plannedRegions[0].evidence.operands;
    Object.assign(o.currentBox,{paddingLeftPx:10,borderLeftPx:2,paddingTopPx:20,borderTopPx:4,
      paddingRightPx:3,borderRightPx:1,borderBoxWidthPx:116,borderBoxLeftPx:0,borderBoxTopPx:0});
    if(modelId==='slot-open-envelope-v1')Object.assign(o,{lockedHeightOverride:345,wrapperChromeHeight:15});
    assert.equal(E.qualifyModelV1(s,s.plannedRegions[0]).valid,true);assert.equal(evaluate(s,'B1').status,'pass');
  }
});

test('All 333 pre-existing protected files retain their bytes; no core/probe/bundle generation occurred',()=>{
  const baseline=JSON.parse(fs.readFileSync(path.join(root,'docs/intext-p14b-qa0-protected-before.json'),'utf8'));
  assert.equal(baseline.files.length,333);
  for(const f of baseline.files){const b=fs.readFileSync(path.join(root,f.file));assert.equal(b.length,f.bytes,f.file);
    assert.equal(crypto.createHash('sha256').update(b).digest('hex'),f.sha256,f.file);}
});
