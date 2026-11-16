'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),vm=require('node:vm');
const P=require('./qa/qa1b/packet.cjs'),R=require('./qa/qa1b/identity-registry.cjs'),A=require('./qa/qa1b/adapter.cjs');
const G=require('./qa/qa1b/generator.cjs'),{assessFutureII}=require('./qa/qa1b/gates.cjs');
const Delivery=require('./qa/qa1b/delivery-integrity.cjs');
const F=require('./qa/qa1b/fixtures.cjs');
const QA0=require('./qa/intext-p14b-shadow-ledger.cjs'),QF=require('./qa/intext-p14b-qa0-fixtures.cjs');
const root=path.resolve(__dirname,'..'),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const distributions=['_gam_kv_.js','IntextManager.js'];
const primary=['W2','W3','W4','C1'];
const read=s=>s.adapter.exportManual();
const totals=s=>{const q=read(s).qa0;return [q.totals.D0.yes,q.totals.Dv.yes,q.totals.Dc.yes];};
const memoryCheck=value=>{
  for(const key of ['summaryBytes','qa0AggregateBytes','metadataBytes','qa0RingBytes','packetRingBytes'])assert(value.memory[key]<=value.memory.limits[key],key);
  assert.equal(Buffer.byteLength(JSON.stringify(value.entries)),value.memory.packetRingBytes);
  assert(value.entries.length<=1000);assert(value.qa0.snapshots.length<=1000);assert(value.memory.detailEntries<=2000);
  assert(Object.keys(value.memory).filter(k=>k.endsWith('Bytes')).reduce((n,k)=>n+value.memory[k],0)<=2097152);
};

// Independent set/count oracle for a fixed trace. It neither imports selector nor
// reconstructs samples using adapter outputs. Expected outcomes follow native facts.
function traceOracle(events){
  const opportunities=new Map();
  for(const e of events){
    if(e.repeat)continue;
    const key=JSON.stringify([e.dist,e.doc,e.nav,e.slot,e.cycle]);
    const row=opportunities.get(key)||{fetch:false,winner:null,positive:false};
    if(e.type==='native-fetch')row.fetch=true;
    if(e.type==='native-winner')row.winner=e.winner;
    if(e.type==='video-preplayer-guard'&&e.executed&&e.live&&e.nativeGeneration&&e.result)row.positive=true;
    opportunities.set(key,row);
  }
  const rows=[...opportunities.values()];
  return [rows.filter(r=>r.fetch).length,rows.filter(r=>r.fetch&&r.winner==='video').length,
    rows.filter(r=>r.fetch&&r.winner==='video'&&r.positive).length];
}

for(const distribution of distributions){
  test(`[G01 G02 P01 P02 A01] ${distribution}: B0 factual true and false with unknown P`,()=>{
    for(const eligible of [true,false])for(const reason of eligible?['visible']:['below','passed','outside-horizontal','document-hidden','anchor-zero-or-invalid-size','anchor-not-rendered','geometry-unavailable']){
      const s=F.session(distribution);s.start();const r=s.send({guard:{eligible,reason}});
      assert.equal(r.acceptanceA,'valid');assert.equal(r.candidateB0,eligible?'pass':'fail');
      assert.deepEqual(totals(s),[1,1,eligible?1:0]);
      const x=read(s);assert.equal(x.entries.at(-1).packet.evidence.anchorRect,null);
      assert.equal(x.qa0.snapshots.at(-1).plannedRegions.length,0);assert.equal(x.physicalBudgetMeasured,false);
    }
  });
  test(`[G07] ${distribution}: Display true never increments video Dc or overwrites initial winner`,()=>{
    for(const initial of ['video','display']){
      const s=F.session(distribution);s.start(initial);const r=s.send({caller:'W1',format:'display',facts:{relation:'fallback'}});
      assert.equal(r.series,'display');assert.equal(r.acceptanceA,'not-admitted');assert.equal(r.opportunityId,null);
      assert.deepEqual(totals(s),[1,initial==='video'?1:0,0]);
      assert.equal(read(s).qa0.summaries[0].winner,initial);assert.equal(read(s).qa0.summaries[0].winnerConflict,false);
    }
  });
  test(`[G08 G10] ${distribution}: four primary sources, one opportunity and immutable first positive`,()=>{
    const s=F.session(distribution);s.start();
    for(const caller of primary)assert.equal(s.send({caller}).acceptanceA,'valid');
    const first=read(s).qa0.summaries[0].firstControlAt;
    s.send({caller:'C1',guard:{eligible:false,reason:'below'}});
    assert.deepEqual(totals(s),[1,1,1]);assert.equal(read(s).qa0.summaries[0].firstControlAt,first);
    assert.equal(read(s).qa0.summaries.length,1);
  });
  test(`[G09] ${distribution}: prepared path omits W2; W2 can have native null creative owner`,()=>{
    const s=F.session(distribution);s.start();
    for(const caller of ['W3','W4','C1'])s.send({caller});
    assert(!read(s).entries.some(e=>e.packet.caller==='W2'));
    const unprepared=F.session(distribution,{withoutCreative:true});unprepared.start();
    assert.equal(unprepared.send({caller:'W2'}).acceptanceA,'valid');
    assert.equal(unprepared.send({caller:'W3'}).acceptanceA,'not-admitted');
    assert.deepEqual(totals(unprepared),[1,1,1]);
    assert.deepEqual(totals(s),[1,1,1]);
  });
  test(`[G11] ${distribution}: unexecuted, missing anchor, disconnected identifiable anchor and stale`,()=>{
    const s=F.session(distribution);s.start();
    const skipped=s.send({guard:{executed:false,eligible:null,reason:'guard-not-executed'}});
    assert.equal(skipped.candidateB0,'unknown');
    assert.equal(s.send({guard:{eligible:false,reason:'anchor-missing'},identity:{anchorLocalId:null,verified:false}}).acceptanceA,'not-admitted');
    assert.equal(s.send({guard:{eligible:false,reason:'anchor-missing'}}).candidateB0,'fail');
    const staleSnapshot=s.registry.retire({...s.objects,state:'stale'});
    const stale=R.fixturePacket(staleSnapshot,{distribution,sampleSequence:6});
    assert.equal(s.adapter.ingest(stale).acceptanceA,'not-admitted');
    assert.equal(read(s).entries.at(-1).packet.identity.renderToken,1);assert.deepEqual(totals(s),[1,1,0]);
    const invalid=s.packet({guard:{executed:false,eligible:false}});assert.equal(s.adapter.ingest(invalid).reason,'invalid-packet');
  });
  test(`[G12 G13 G14 G15 D08] ${distribution}: each nonprimary raw series excluded from Dc`,()=>{
    const s=F.session(distribution);s.start();
    const series={C2:'no-fill',C3:'diagnostic',C4:'preparation',C5:'diagnostic',C6:'recovery',C7:'recovery',C8:'recovery',C9:'reveal',C10:'post-player-activation',C11:'post-player-activation'};
    for(const [caller,expected]of Object.entries(series)){
      const receipt=s.send({caller,stage:['C6','C7','C8','C9','C10','C11'].includes(caller)?'after-player':'before-player'});
      assert.equal(receipt.series,expected);assert.equal(receipt.acceptanceA,'not-admitted');
    }
    assert.deepEqual(totals(s),[1,1,0]);assert(read(s).entries.filter(e=>e.packet.kind==='guard').every(e=>e.packet.guard.eligible===true));
  });
  test(`[G13] ${distribution}: preparation descriptor is not a native initial-winner decision`,()=>{
    const s=F.session(distribution);s.start('unknown');
    s.send({caller:'C4',facts:{initialWinner:'video',winnerSource:'preparation-descriptor'}});
    s.send({kind:'winner',facts:{initialWinner:'video',winnerSource:'preparation-descriptor'}});
    s.send({caller:'W2'});assert.deepEqual(totals(s),[1,0,0]);
    assert.equal(read(s).qa0.summaries[0].firstControlAt,4);
    s.send({kind:'winner',facts:{initialWinner:'video',winnerSource:'native-decision'}});
    assert.deepEqual(totals(s),[1,1,1]);assert.equal(read(s).qa0.summaries[0].firstControlAt,4);
  });
  test(`[G16 D02] ${distribution}: executions, retransmissions, conflicts and bounded replay horizon`,()=>{
    const s=F.session(distribution,{adapterOptions:{limits:{packetEntries:4}}});s.start();
    const p=s.packet(),a=s.adapter.ingest(p),b=s.send({});
    assert.notEqual(a.sampleSequence,b.sampleSequence);assert.equal(a.opportunityId,b.opportunityId);
    assert.equal(s.adapter.ingest(p).duplicate,true);assert.equal(read(s).qa0.snapshots.length,4);
    assert.equal(s.adapter.ingest(s.packet({sampleSequence:p.sampleSequence,eventId:p.eventId,guard:{eligible:false}})).reason,'event-sequence-conflict');
    for(let i=0;i<5;i++)s.send({});
    assert.equal(s.adapter.ingest(p).reason,'retired-sequence');assert.deepEqual(totals(s),[1,1,1]);
    assert.equal(read(s).metadata.counts.duplicates,1);assert.equal(read(s).metadata.counts.retiredSequences,1);
  });
}

test('[I01 G16] duplicate DOM names/counters across documents, navigation and distributions never join',()=>{
  const a=F.session(),b=F.session('IntextManager.js');a.start();b.start();a.send({});b.send({});
  assert.equal(a.current().identity.documentLocalId,b.current().identity.documentLocalId);
  assert.notEqual(read(a).series.distribution,read(b).series.distribution);
  assert.deepEqual(totals(a),[1,1,1]);assert.deepEqual(totals(b),[1,1,1]);
  const wrong=F.merge(a.packet(),{provenance:{distribution:'IntextManager.js',coreSha256:P.CORES['IntextManager.js']}});
  assert.equal(a.adapter.ingest(wrong).reason,'series-or-clock-mismatch');
  const registry=R.createIdentityRegistry(),o=Object.fromEntries(['document','navigation','node','waterfall','anchor','attempt','creative'].map(k=>[k,R.fixtureHandle()]));
  const first=registry.bind({...o,cycleId:1,fetchGeneration:1,renderToken:1});
  const second=registry.bind({...o,navigation:R.fixtureHandle(),attempt:R.fixtureHandle(),cycleId:1,fetchGeneration:1,renderToken:1});
  assert.notEqual(first.identity.navigationLocalId,second.identity.navigationLocalId);
  assert.equal(registry.snapshot(o).identity.state,'stale');
});
test('[I02 D06] native handoff preserves opportunity, tokenReplaced and original generation',()=>{
  const s=F.session('_gam_kv_.js',{renderToken:0});s.start();s.handoff(1);s.send({kind:'handoff'});s.send({caller:'W4'});
  assert.deepEqual(totals(s),[1,1,1]);assert.equal(read(s).qa0.summaries[0].tokenReplaced,true);
  const oldAttempt=s.objects.attempt;s.nextCycle(2,2);
  const old=s.registry.snapshot({...s.objects,attempt:oldAttempt});assert.equal(old.identity.state,'stale');assert.equal(old.identity.fetchGeneration,1);
  assert.equal(old.identity.renderToken,1);assert.equal(old.identity.activeRenderToken,2);
});
test('[I03 I04 A02] invented identity edits are rejected; native missing generation remains raw unknown with gap',()=>{
  for(const fields of [{fetchGeneration:null},{anchorLocalId:null},{navigationLocalId:null},{documentLocalId:null},{cycleId:null}]){
    const s=F.session();s.start();const p=s.packet({identity:{...fields,verified:false}}),r=s.adapter.ingest(p);
    assert.equal(r.acceptanceA,'not-admitted');assert(read(s).qa0.coverage.gaps.D0);
    assert.equal(r.reason,'registry-unaccredited');assert.equal(read(s).entries.length,2);assert.deepEqual(totals(s),[1,1,0]);
  }
  for(const field of ['fetchGeneration','cycleId']){
    const raw=F.session('_gam_kv_.js',{binding:{[field]:null}}),incomplete=raw.packet();
    assert.equal(raw.registry.accredit(incomplete),'current');assert.equal(raw.adapter.ingest(incomplete).candidateB0,'unknown');
    assert.equal(read(raw).entries[0].packet.identity[field],null);assert(read(raw).qa0.coverage.gaps.D0);
  }
  const registry=R.createIdentityRegistry(),o=Object.fromEntries(['document','navigation','node','waterfall','anchor','attempt'].map(k=>[k,R.fixtureHandle()]));
  const missing=registry.bind({...o,cycleId:1,renderToken:7});assert.equal(missing.identity.fetchGeneration,null);assert.equal(missing.identity.verified,false);
});
test('[I01 I02] registry rejects unobserved objects, forged snapshots and exhaustion; retains only scalars',()=>{
  const s=F.session();assert.throws(()=>R.fixturePacket(P.clone(s.current())),/registry-snapshot/);
  assert.throws(()=>R.createIdentityRegistry().bind({document:{},node:{},attempt:{}}),/fixture-handle/);
  assert.throws(()=>R.createIdentityRegistry({budgetBytes:1}).bind(s.objects),/registry-overflow/);
  const before=Reflect.ownKeys(s.objects.node);s.registry.snapshot(s.objects);assert.deepEqual(Reflect.ownKeys(s.objects.node),before);
  const exported=JSON.parse(JSON.stringify(s.current()));
  function scalars(x){for(const v of Object.values(x))if(v&&typeof v==='object')scalars(v);else assert(['string','number','boolean'].includes(typeof v)||v===null);}
  scalars(exported);assert(s.registry.stats().logicalChargedBytes>0);assert.equal(s.registry.stats().physicalHeapMeasured,false);
});
test('[D01 D02] no guard/winner/frame does not disappear; first true is not physical first entry',()=>{
  const s=F.session();s.start('unknown');assert.deepEqual(totals(s),[1,0,0]);
  s.send({guard:{eligible:false,reason:'below'}});s.send({});assert.deepEqual(totals(s),[1,0,0]);
  s.adapter.close(10);const q=read(s).qa0;assert.equal(q.summaries[0].censor.right,true);assert.equal(q.totals.Dv.unknown,1);
  assert.equal(q.rates.firstPassFrame.status,'temporal-coverage-not-implemented');
  const noFetch=F.session();noFetch.send({});assert.equal(read(noFetch).qa0.totals.D0.unknown,1);assert(read(noFetch).qa0.coverage.gaps.D0);
  const positive=F.session();positive.start();positive.send({});assert.equal(read(positive).qa0.summaries[0].censor.left,true);
  assert.equal(read(positive).qa0.coverage.flags.sourceGap,false);
  const transition=F.session();transition.start();transition.send({guard:{eligible:false,reason:'below'}});transition.send({});
  assert.equal(read(transition).qa0.summaries[0].censor.left,false);
});
test('[D03 D07] subattempt end is not terminal; fallback and refresh use native cycles',()=>{
  const s=F.session();s.start();s.send({kind:'subattempt',facts:{terminal:'disposed',relation:'subattempt'}});
  assert.equal(read(s).qa0.summaries[0].terminal,null);s.send({});
  s.send({caller:'W1',format:'display',facts:{relation:'fallback'}});assert.deepEqual(totals(s),[1,1,1]);
  s.send({kind:'terminal',facts:{terminal:'complete'}});s.nextCycle(2);s.send({kind:'fetch',facts:{relation:'refresh'}});
  s.send({kind:'winner',facts:{initialWinner:'display',winnerSource:'native-decision',relation:'refresh'}});
  assert.deepEqual(totals(s),[2,1,1]);assert.equal(read(s).qa0.summaries[0].winner,'video');
});
test('[D04 D05] actual QA0 constructor accepts the shared partition and rejects increases',()=>{
  const s=F.session();const e=read(s);memoryCheck(e);
  assert.deepEqual(e.qa0.memory.limits,{opportunities:64,snapshots:1000,summaryBytes:262144,aggregateBytes:16384,snapshotBytes:524288,totalBytes:802816});
  for(const [key,value]of Object.entries(A.PARTITION))assert.throws(()=>A.limitsFor({[key]:value+1}),RangeError);
  assert.throws(()=>F.session('_gam_kv_.js',{adapterOptions:{limits:{metadataBytes:1}}}),/metadata-preflight/);
});
test('[D05] bounded counters use a BigInt oracle and never wrap or manufacture unique opportunities',()=>{
  for(const n of [0,1,1000,Number.MAX_SAFE_INTEGER-1,Number.MAX_SAFE_INTEGER]){
    const mathematical=BigInt(n)+1n,overflow=mathematical>BigInt(Number.MAX_SAFE_INTEGER),result=A.advanceCounter(n);
    assert.equal(result.overflow,overflow);assert.equal(result.value,overflow?n:Number(mathematical));
  }
  for(const n of [-1,NaN,Infinity,Number.MAX_SAFE_INTEGER+1])assert.throws(()=>A.advanceCounter(n),RangeError);
});
test('[D04] 2001 original samples: entry/byte evictions conserve summaries and account full packet + receipt',()=>{
  const s=F.session();s.start();for(let n=0;n<2001;n++)s.send({guard:{eligible:n%2===0}});
  const e=read(s);memoryCheck(e);assert.deepEqual(totals(s),[1,1,1]);assert(e.qa0.snapshots.length>0&&e.qa0.snapshots.length<=1000);
  assert(e.entries.length<1000);assert(e.metadata.counts.packetDropped>0);assert(e.qa0.coverage.flags.rawDropped>0);
  assert(e.metadata.loss.firstSequence!==null);assert.equal(e.qa0.totals.D0.complete,false);
  const tiny=F.session('_gam_kv_.js',{adapterOptions:{limits:{packetRingBytes:2,qa0RingBytes:2}}});tiny.start();tiny.send({});
  const t=read(tiny);assert.equal(t.entries.length,0);assert.equal(t.qa0.snapshots.length,0);assert(t.metadata.counts.packetOversized>0);memoryCheck(t);
  const countLimited=F.session('_gam_kv_.js',{adapterOptions:{limits:{packetEntries:3,qa0Entries:3}}});countLimited.start();
  for(let i=0;i<10;i++)countLimited.send({});assert.equal(read(countLimited).entries.length,3);assert.equal(read(countLimited).qa0.snapshots.length,3);
  const zero=F.session('_gam_kv_.js',{adapterOptions:{limits:{packetEntries:0}}});zero.start();
  assert.equal(read(zero).metadata.counts.packetOversized,0);assert.equal(read(zero).metadata.counts.packetDropped,2);
});
test('[D05] opportunity 65 latches overflow; 64 summaries survive without counting overflow notifications as unique',()=>{
  const s=F.session();for(let n=1;n<=65;n++){if(n>1)s.nextCycle(n);s.start();s.send({});}
  const e=read(s);assert.equal(e.qa0.summaries.length,64);assert.deepEqual(totals(s),[64,64,64]);assert(e.qa0.coverage.flags.accountingOverflow);
  s.send({});assert.deepEqual(totals(s),[64,64,64]);assert(e.qa0.coverage.flags.untrackedOpportunityNotifications>0);memoryCheck(read(s));
  const small=F.session('_gam_kv_.js',{adapterOptions:{limits:{summaryBytes:1}}});small.start();assert(read(small).qa0.coverage.flags.summaryOverflow);
  const meta=F.session('_gam_kv_.js',{adapterOptions:{limits:{metadataBytes:14000}}});
  for(let n=1;n<=64&&!read(meta).metadata.closed;n++){if(n>1)meta.nextCycle(n);meta.start();meta.send({});}
  const stopped=read(meta);assert(stopped.metadata.flags.metadataOverflow);assert(stopped.qa0.closed);
  assert(stopped.qa0.summaries.length>0&&stopped.qa0.summaries.length<64);assert(stopped.qa0.coverage.gaps.D0);memoryCheck(stopped);
});
test('[D09 A01 A03 A05] initial sourceComplete stays false through close/export, even with all retained samples valid',()=>{
  const s=F.session();s.start();s.send({});s.send({kind:'terminal',facts:{terminal:'complete'}});s.adapter.close(20);
  const e=read(s);assert.deepEqual(e.qa0.coverage.sourceComplete,{D0:false,Dv:false,Dc:false,outcomes:false});
  for(const r of Object.values(e.qa0.rates)){assert.equal(r.value,null);assert.equal(r.exactRatesAllowed,false);}
  e.qa0.coverage.sourceComplete.D0=true;e.qa0.totals.D0.complete=true;assert.equal(read(s).qa0.coverage.sourceComplete.D0,false);
  assert.throws(()=>A.createOfflineAdapter({distribution:s.distribution,documentLocalId:s.current().identity.documentLocalId,registry:s.registry,coverage:{D0:true}}),/coverage-must/);
  assert.equal(s.adapter.ingest(s.packet()).reason,'adapter-closed');assert.equal(s.adapter.close(30).reason,'adapter-closed');
});
test('[A04] measured functional exit is distinct from population completeness and grants no permission',()=>{
  const required={functionalCoverage:true,sampleAEvidence:true,commercialInvariance:true,declaredGaps:true,measuredBudget:true,
    withinApprovedBudget:true,independentReview:true,explicitNextStageAuthorization:true};
  assert.equal(assessFutureII(required).readyForReviewedProposal,true);
  for(const k of Object.keys(required))assert.equal(assessFutureII({...required,[k]:false}).readyForReviewedProposal,false,k);
  assert.equal(assessFutureII(required).exactRatesAuthorized,false);assert.equal(assessFutureII(required).nextStageStarted,false);
});
test('[A06] partial retained detail cannot be replayed as a new complete population',()=>{
  const s=F.session('_gam_kv_.js',{adapterOptions:{limits:{packetEntries:1}}});s.start();s.send({});
  const e=read(s),other=F.session();for(const entry of e.entries)other.adapter.ingest(entry.packet);
  assert.equal(read(other).qa0.totals.D0.yes,0);assert.equal(read(other).qa0.totals.D0.unknown,0);
  assert.equal(read(other).qa0.summaries.length,0);
  assert.equal(read(other).qa0.coverage.exactRatesAllowed,false);assert(read(other).qa0.coverage.gaps.D0);
});
test('[A07 A08] independent direct QA0 oracles: per-rate denominators, outcome coverage and firstPassFrame',()=>{
  const ledger=QA0.createP14BLedgerV1({documentLocalId:'documentOne',candidates:[{family:'B0'}],coverage:{D0:true,Dv:true,Dc:true,outcomes:false}});
  const sample=QF.makeSample();ledger.ingest(sample,{fetchObserved:true,initialWinner:'video',terminal:'complete'});ledger.close({endTimeMs:100});
  const e=ledger.exportManual();assert.equal(e.rates.videoOpportunityShare.value,1);assert.equal(e.rates.controlObservedShare.value,1);
  assert.equal(e.coverage.exactRatesAllowed,false);assert.equal(e.rates.videoWithObservedFrame.value,null);assert.equal(e.rates.firstPassFrame.value,null);
  const full=QA0.createP14BLedgerV1({documentLocalId:'documentOne',candidates:[{family:'B0'}],coverage:QF.fullCoverage()});
  full.ingest(sample,QF.completedFacts(sample));full.close({endTimeMs:100});assert.equal(full.exportManual().coverage.exactRatesAllowed,true);
  assert.equal(full.exportManual().rates.firstPassFrame.exactRatesAllowed,false);
  const empty=QA0.createP14BLedgerV1({documentLocalId:'documentOne',candidates:[{family:'B0'}],coverage:QF.fullCoverage()});empty.close({endTimeMs:0});
  assert.equal(empty.exportManual().coverage.exactRatesAllowed,true);
  for(const key of ['videoOpportunityShare','controlObservedShare','videoWithObservedFrame'])assert.equal(empty.exportManual().rates[key].exactRatesAllowed,false);
});
test('[X01] export is manual, detached, bounded, repeatable, free of injected fields and does not reset',()=>{
  const s=F.session();s.start();const p=s.packet();s.adapter.ingest(p);
  const a=read(s),b=read(s);assert.deepEqual(a,b);a.entries[0].packet.identity.documentLocalId='mutated';assert.deepEqual(read(s),b);
  assert.throws(()=>{p.guard.eligible=false;},TypeError);assert.equal(read(s).entries.at(-1).packet.guard.eligible,true);
  assert.equal(s.adapter.serializeManual({maxBytes:1}).status,'export-too-large');assert.equal(s.adapter.serializeManual({maxBytes:1}).json,null);
  const serialized=s.adapter.serializeManual();assert.equal(serialized.status,'ok');assert.equal(serialized.bytes,Buffer.byteLength(serialized.json));
  assert.deepEqual(JSON.parse(serialized.json),b);
  const extra=F.merge(s.packet(),{url:'https://invalid.example/secret',cookie:'secret'});assert.equal(s.adapter.ingest(extra).reason,'invalid-packet');
  assert(!JSON.stringify(read(s)).includes('secret'));assert.throws(()=>s.adapter.serializeManual({maxBytes:2097153}),RangeError);
  const r=b.entries.at(-1).receipt;assert.equal(r.packetId,p.eventId);assert.equal(r.opportunityId,b.qa0.summaries[0].opportunityId);
});
test('[X02 T01] schema, provenance, accessor and event/sequence conflicts fail closed without reading getters',()=>{
  const s=F.session();let reads=0;
  const p=P.clone(s.packet());Object.defineProperty(p,'cookie',{get(){reads++;throw Error('getter');},enumerable:true});
  assert.equal(s.adapter.ingest(p).reason,'invalid-packet');assert.equal(reads,0);
  for(const changes of [{caller:'video_like_unknown'},{schemaVersion:'p14b-shadow-sample-v1'},{eventId:'e999'},
    {provenance:{coreSha256:'0'.repeat(64)}},{time:{monotonicMs:NaN}},{identity:{fetchGeneration:0}}]){
    assert.equal(s.adapter.ingest(F.merge(s.packet(),changes)).reason,'invalid-packet');
  }
  const stage=s.send({stage:'unknown'});assert.equal(stage.acceptanceA,'not-admitted');
  const unknown=s.send({caller:'unknown'});assert.equal(unknown.series,'population-or-unknown');assert.equal(unknown.candidateB0,'unknown');
});
test('[I03 G11 X02] executable contract matches published schema and preserves unknown states without coercion',()=>{
  const published=JSON.parse(fs.readFileSync(path.join(root,'tests/qa/qa1b/packet.schema.json'),'utf8'));assert.deepEqual(published,P.schema);
  const s=F.session();const p=s.packet();assert.equal(P.validate(p).valid,true);
  const unknown=F.merge(p,{identity:{fetchGeneration:null,verified:false,state:'unknown'},ownership:{verified:false,state:'unknown'},time:{monotonicMs:null}});
  assert.equal(P.validate(unknown).valid,true);const receipt=s.adapter.ingest(unknown);assert.equal(receipt.candidateB0,'unknown');
  assert.equal(receipt.reason,'registry-unaccredited');assert.equal(read(s).entries.length,0);
  for(const changes of [{identity:{cycleId:'1'}},{caller:'W0'},{identity:{renderToken:-1}},{guard:{eligible:'true'}},{guard:{executed:true,eligible:null}}])assert.equal(P.validate(F.merge(p,changes)).valid,false);
  const nested=F.merge(p,{});let reads=0;Object.defineProperty(nested.guard,'eligible',{get(){reads++;return true;},enumerable:true});
  assert.equal(P.validate(nested).valid,false);assert.equal(reads,0);
  const exotic=F.merge(p,{});exotic.ownership=Object.assign(Object.create({}),exotic.ownership);assert.equal(P.validate(exotic).valid,false);
});
test('[G11 I04 A02] conditional primary requires matched owner, verified provenance and absent player',()=>{
  for(const changes of [{ownership:{verified:false}},{ownership:{nodeLocalId:'wrongNode'}},{ownership:{attemptLocalId:null}},
    {provenance:{verified:false}},{provenance:{origin:'unknown'}},{guard:{playerCreated:true}},{format:'unknown'}]){
    const s=F.session();s.start();const receipt=s.send(changes);assert.equal(receipt.acceptanceA,'not-admitted');assert.deepEqual(totals(s),[1,1,0]);
  }
});
test('[D02 X03] missing sequence, source clock mismatch and monotonic regression latch gaps',()=>{
  const s=F.session();s.start();s.packet();s.send({});assert(read(s).qa0.coverage.gaps.D0);
  assert.equal(s.send({time:{monotonicMs:0}}).reason,'unknown-or-regressed-clock');
  assert.equal(s.send({time:{sourceClock:'page-monotonic-ms'}}).reason,'series-or-clock-mismatch');
  assert.throws(()=>s.adapter.close(0),RangeError);assert.throws(()=>F.session('_gam_kv_.js',{adapterOptions:{sourceClock:'page-monotonic-ms'}}),/synthetic-clock/);
  const raw=F.session('_gam_kv_.js',{binding:{fetchGeneration:null}});raw.send({time:{monotonicMs:500}});
  assert.throws(()=>raw.adapter.close(499),RangeError);raw.adapter.close(500);assert.equal(read(raw).qa0.windowEndMs,500);
});
test('[X03] missing sink and data errors invoke no browser/network/timer/commercial function',()=>{
  const sandbox=vm.createContext({Buffer}),cache=new Map(),base=path.join(root,'tests/qa');
  function load(file){
    const absolute=path.resolve(file);assert(absolute.startsWith(base+path.sep));
    if(cache.has(absolute))return cache.get(absolute).exports;
    const module={exports:{}};cache.set(absolute,module);
    const localRequire=specifier=>{
      if(['node:crypto','node:buffer'].includes(specifier))return require(specifier);
      if(!specifier.startsWith('.'))throw Error('unexpected import');
      return load(path.resolve(path.dirname(absolute),specifier));
    };
    const source=fs.readFileSync(absolute,'utf8');
    new vm.Script(`(function(require,module,exports){${source}\n})`,{filename:`offline-sandbox-${path.basename(absolute)}`}).runInContext(sandbox)(localRequire,module,module.exports);
    return module.exports;
  }
  const fixtures=load(path.join(base,'qa1b/fixtures.cjs')),s=fixtures.session();
  assert(!('window'in sandbox));assert(!('document'in sandbox));assert(!('fetch'in sandbox));assert(!('setTimeout'in sandbox));
  assert.equal(s.send({}).candidateB0,'pass');assert.equal(s.adapter.ingest({}).reason,'invalid-packet');
});
test('[G03 G04 G05 G06] generator enforces exact hashes/anchors and byte reversibility for both distributions',()=>{
  for(const dist of distributions){
    const source=fs.readFileSync(path.join(root,dist)),g=G.generateCopy(dist,source);
    assert.equal(hash(source),P.CORES[dist]);assert.deepEqual(G.reverseCopy(dist,g.artifact),source);
    assert.equal(g.manifest.acquisitionEnabled,false);assert.equal(g.manifest.transformation,'inert-comment-prefix-only');
    assert.equal(g.manifest.anchors.length,7);assert.equal(g.diff.split('\n').filter(l=>l.startsWith('+')&&!l.startsWith('+++')).length,1);
    const tampered=Buffer.concat([source,Buffer.from('\n')]);assert.throws(()=>G.generateCopy(dist,tampered),/unapproved-base/);
    assert.throws(()=>G.reverseCopy(dist,Buffer.concat([g.artifact,Buffer.from('x')])),/reverse-hash/);
    assert.throws(()=>G.checkAnchors(Buffer.from('no anchors')));assert.throws(()=>G.checkAnchors(Buffer.from('xx'),['x']));
  }
});
test('[X02] generator output removal preflights hashes, refuses extra files and never restores an original',()=>{
  const parent=fs.mkdtempSync(path.join(os.tmpdir(),'qa1b-stage1-')),target=path.join(parent,'copies');
  try{
    const m=G.writeCopies({sourceRoot:root,outputDirectory:target});assert.equal(m.artifacts.length,4);
    assert.throws(()=>G.writeCopies({sourceRoot:root,outputDirectory:target}),/must-not-exist/);
    fs.writeFileSync(path.join(target,'extra.txt'),'x');assert.throws(()=>G.removeCopies(target),/unexpected-output/);fs.unlinkSync(path.join(target,'extra.txt'));
    const file=path.join(target,'gam.diff'),saved=fs.readFileSync(file);fs.appendFileSync(file,'changed');
    assert.throws(()=>G.removeCopies(target),/altered-output/);assert(fs.existsSync(path.join(target,'manager.qa.js')));fs.writeFileSync(file,saved);
    assert.deepEqual(G.removeCopies(target),{removed:5,originalsTouched:0});assert(!fs.existsSync(target));
  }finally{
    const resolved=fs.realpathSync(parent),tmp=fs.realpathSync(os.tmpdir());
    assert.equal(path.dirname(resolved),tmp);assert(path.basename(resolved).startsWith('qa1b-stage1-'));fs.rmSync(resolved,{recursive:true,force:true});
  }
});
test('[G03 X02] approved hashes/anchors are independently tied to the binding design manifest',()=>{
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'docs/intext-p14b-qa1b-integrity.json'),'utf8'));
  for(const row of manifest.sourceAudit.guardCallsiteInventory.distributions){
    assert.equal(P.CORES[row.file],row.sha256);
    const source=fs.readFileSync(path.join(root,row.file)),g=G.generateCopy(row.file,source),lines=source.toString('utf8').split(/\r?\n/);
    for(const anchor of g.manifest.anchors)assert.equal(lines[anchor.line-1].trim(),anchor.text);
  }
});
test('[D04 X01] maximal numeric evidence and bounded version strings do not bypass packet or export budgets',()=>{
  const s=F.session('_gam_kv_.js',{adapterOptions:{limits:{packetRingBytes:12000}}});s.start();
  for(let n=0;n<30;n++)s.send({provenance:{fixtureVersion:'v'.repeat(48),cssModelVersion:'c'.repeat(48),configVersion:'x'.repeat(48)},
    evidence:{anchorRect:{left:-Number.MAX_VALUE,top:Number.MAX_VALUE,width:Number.MAX_VALUE,height:Number.MAX_VALUE},viewport:{width:Number.MAX_VALUE,height:Number.MAX_VALUE}}});
  const e=read(s);memoryCheck(e);assert(e.metadata.counts.packetDropped>0);assert.deepEqual(totals(s),[1,1,1]);
  assert.equal(s.adapter.serializeManual({maxBytes:100}).status,'export-too-large');
});
test('[I02 D06] explicit terminal registry state closes only the same native owner and cannot revive it',()=>{
  const s=F.session();s.start();s.send({});const terminal=s.registry.retire({...s.objects,state:'terminal'});
  const p=R.fixturePacket(terminal,{sampleSequence:4,kind:'terminal',caller:'population',format:'opportunity',
    provenance:{distribution:s.distribution,coreSha256:P.CORES[s.distribution],origin:'synthetic-fixture',fixtureVersion:'fixtureV1',cssModelVersion:'unknown',configVersion:'fixtureV1',boundary:'terminal',verified:true},
    guard:{executed:false,eligible:null,reason:'terminal',playerCreated:true},
    facts:{initialWinner:'unknown',winnerSource:'unknown',terminal:'complete',relation:'unknown'}});
  assert.equal(s.adapter.ingest(p).accepted,true);assert.equal(read(s).qa0.summaries[0].terminal,'complete');
  assert.throws(()=>s.registry.handoff({...s.objects,renderToken:2}),/stale-handoff/);
  assert.throws(()=>s.registry.retire({...s.objects,state:'live'}),/retirement-state/);
});
test('[D01 D03 G07 G08] mixed native trace agrees with independent opportunity-set oracle',()=>{
  const s=F.session(),events=[];
  for(let cycle=1;cycle<=12;cycle++){
    if(cycle>1)s.nextCycle(cycle);
    const common={dist:s.distribution,doc:'D',nav:'N',slot:'S',cycle};
    s.send({kind:'fetch'});events.push({...common,type:'native-fetch'});
    const winner=cycle%3===0?'display':'video';s.send({kind:'winner',facts:{initialWinner:winner,winnerSource:'native-decision'}});events.push({...common,type:'native-winner',winner});
    if(winner==='video')for(const caller of primary){const result=cycle%2===0;s.send({caller,guard:{eligible:result}});events.push({...common,type:'video-preplayer-guard',executed:true,live:true,nativeGeneration:true,result});}
    s.send({caller:'W1',format:'display'});events.push({...common,type:'display-guard',result:true});
  }
  assert.deepEqual(totals(s),traceOracle(events));assert.deepEqual(totals(s),[12,8,4]);
});

// Independent audit finding I-01: aliases/flags are not source authentication.
for(const distribution of distributions){
  test('[I-01/a] '+distribution+': equal aliases and byte-identical foreign packets cannot borrow admission or duplicate receipts',()=>{
    const a=F.session(distribution),b=F.session(distribution);a.start();b.start();
    const foreign=a.packet(),own=b.packet();assert.deepEqual(foreign,own);
    assert.equal(P.validate(foreign).valid,true);assert.equal(P.select(foreign).primary,false);
    assert.equal(b.registry.accredit(foreign),'unaccredited');assert.equal(b.registry.accredit(own),'current');
    const original=read(b),rejected=b.adapter.ingest(foreign);
    assert.deepEqual([rejected.accepted,rejected.acceptanceA,rejected.candidateB0,rejected.opportunityId],[false,'not-admitted','unknown',null]);
    assert.equal(rejected.reason,'registry-unaccredited');assert.deepEqual(totals(b),[1,1,0]);
    assert.equal(read(b).metadata.lastSequence,original.metadata.lastSequence);assert.equal(read(b).metadata.lastTime,original.metadata.lastTime);
    assert.equal(read(b).qa0.snapshots.length,original.qa0.snapshots.length);assert.equal(read(b).qa0.summaries[0].firstControlAt,null);
    assert(read(b).qa0.coverage.gaps.D0);assert(read(b).qa0.coverage.gaps.Dv);assert(read(b).qa0.coverage.gaps.Dc);
    assert.equal(b.adapter.ingest(own).candidateB0,'pass');const first=read(b).qa0.summaries[0].firstControlAt;
    assert.equal(b.adapter.ingest(foreign).duplicate,false);assert.equal(b.adapter.ingest(own).duplicate,true);
    assert.deepEqual(totals(b),[1,1,1]);assert.equal(read(b).qa0.summaries[0].firstControlAt,first);
  });
  test('[I-01/b] '+distribution+': foreign fetch/winner/guard/handoff/terminal cannot create any population',()=>{
    for(const kind of ['fetch','winner','guard','handoff','terminal']){
      const a=F.session(distribution),b=F.session(distribution);
      const p=a.packet({kind,facts:{initialWinner:'video',winnerSource:'native-decision',terminal:kind==='terminal'?'complete':null}});
      assert.equal(b.adapter.ingest(p).reason,'registry-unaccredited');assert.deepEqual(totals(b),[0,0,0]);
      const e=read(b);assert.equal(e.qa0.summaries.length,0);assert.equal(e.qa0.snapshots.length,0);
      assert.equal(e.metadata.lastSequence,0);assert.equal(e.metadata.lastTime,null);assert(e.qa0.coverage.gaps.D0);
      b.start();assert.equal(b.send({}).acceptanceA,'valid');assert.deepEqual(totals(b),[1,1,1]);
    }
  });
  test('[I-01/c] '+distribution+': invented JSON and fixture-owner edits stay unaccredited despite all verified flags',()=>{
    const s=F.session(distribution),own=s.packet();
    const forged=P.clone(own);Object.assign(forged.identity,{navigationLocalId:'inventedNav',slotLocalId:'inventedNode',anchorLocalId:'inventedAnchor',verified:true});
    Object.assign(forged.ownership,{nodeLocalId:'inventedNode',waterfallLocalId:'inventedWaterfall',attemptLocalId:'inventedAttempt',creativeLocalId:'inventedCreative',verified:true});
    forged.provenance.verified=true;
    for(const p of [forged,P.clone(own),P.validate(own).packet,s.packet({identity:{anchorLocalId:'inventedAnchor',verified:true}}),
      s.packet({ownership:{attemptLocalId:'inventedAttempt',verified:true}})]){
      assert.equal(P.validate(p).valid,true);assert.equal(s.adapter.ingest(p).reason,'registry-unaccredited');
      assert.deepEqual(totals(s),[0,0,0]);assert.equal(read(s).qa0.summaries.length,0);
    }
    assert.throws(()=>R.fixturePacket(P.clone(s.current())),/registry-snapshot/);
    const missing=F.session(distribution,{binding:{fetchGeneration:null}});
    const promoted=missing.packet({identity:{fetchGeneration:1,verified:true,state:'live'},ownership:{verified:true,state:'live'}});
    assert.equal(P.validate(promoted).valid,true);assert.equal(missing.adapter.ingest(promoted).reason,'registry-unaccredited');
    assert.deepEqual(totals(missing),[0,0,0]);
  });
  test('[I-01/d] '+distribution+': own immutable packet, retransmission and distinct execution preserve public correlation and export format',()=>{
    const s=F.session(distribution);s.start();const first=s.packet(),r1=s.adapter.ingest(first),r2=s.adapter.ingest(first),second=s.packet(),r3=s.adapter.ingest(second);
    assert.equal(r1.acceptanceA,'valid');assert.equal(r1.candidateB0,'pass');assert.equal(r2.duplicate,true);
    assert.equal(r3.duplicate,false);assert.notEqual(first.sampleSequence,second.sampleSequence);assert.equal(r1.opportunityId,r3.opportunityId);
    assert.equal(Object.isFrozen(first),true);assert.equal(Object.isFrozen(first.identity),true);assert.equal(Object.getOwnPropertySymbols(first).length,0);
    assert.equal(read(s).qa0.snapshots.length,4);assert.deepEqual(totals(s),[1,1,1]);
    const exported=JSON.parse(s.adapter.serializeManual().json),p=exported.entries.at(-1).packet;
    assert.equal(P.validate(p).valid,true);assert.deepEqual(Object.keys(p),Object.keys(second));
    assert.equal(s.adapter.ingest(p).reason,'registry-unaccredited');assert.equal(read(s).qa0.snapshots.length,4);
    memoryCheck(read(s));
  });
  test('[I-01/e] '+distribution+': navigation, handoff, same-token creative replacement and owner retirement revoke pending packets',()=>{
    for(const transition of ['navigation','handoff','creative-replacement','retire']){
      const s=F.session(distribution);s.start();const pending=s.packet(),oldSnapshot=s.current();
      if(transition==='navigation'){s.objects.navigation=R.fixtureHandle();s.nextCycle(2);}
      else if(transition==='handoff')s.handoff(2);
      else if(transition==='creative-replacement'){s.objects.creative=R.fixtureHandle();s.handoff(1);}
      else s.registry.retire({...s.objects,state:'stale'});
      assert.equal(s.registry.accredit(pending),'retired-owner');assert.equal(s.adapter.ingest(pending).reason,'registry-retired-owner');
      assert.deepEqual(totals(s),[1,1,0]);assert.equal(read(s).qa0.summaries[0].firstControlAt,null);
      const late=R.fixturePacket(oldSnapshot,{distribution,sampleSequence:4});assert.equal(s.registry.accredit(late),'retired-owner');
      assert.equal(s.adapter.ingest(late).accepted,false);assert.equal(late.identity.fetchGeneration,1);
      if(transition==='retire'){
        const stale=s.registry.snapshot(s.objects),raw=R.fixturePacket(stale,{distribution,sampleSequence:4});
        assert.equal(s.registry.accredit(raw),'current');assert.equal(s.adapter.ingest(raw).acceptanceA,'not-admitted');
        assert.equal(read(s).entries.at(-1).packet.identity.state,'stale');assert.deepEqual(totals(s),[1,1,0]);
      }else{
        if(transition==='navigation')s.start();
        assert.equal(s.send({caller:'W4'}).acceptanceA,'valid');assert.deepEqual(totals(s),transition==='navigation'?[2,2,1]:[1,1,1]);
      }
    }
  });
}
test('[I-01/f] one registry distinguishes documents and producer distribution; a packet cannot authenticate its own JSON clone',()=>{
  const s=F.session(),original=s.packet();s.objects.document=R.fixtureHandle();s.nextCycle(2);
  assert.notEqual(s.current().identity.documentLocalId,original.identity.documentLocalId);assert.equal(s.registry.accredit(original),'retired-owner');
  const current=s.packet();assert.equal(s.adapter.ingest(current).reason,'series-or-clock-mismatch');
  const otherDistribution=R.fixturePacket(s.current(),{distribution:'IntextManager.js',sampleSequence:1});
  const receiver=A.createOfflineAdapter({distribution:'IntextManager.js',documentLocalId:s.current().identity.documentLocalId,registry:s.registry});
  assert.equal(receiver.ingest(otherDistribution).reason,'registry-unaccredited');
  const own=A.createOfflineAdapter({distribution:s.distribution,documentLocalId:s.current().identity.documentLocalId,registry:s.registry});
  assert.equal(own.ingest(current).acceptanceA,'valid');assert.equal(own.ingest(P.clone(current)).reason,'registry-unaccredited');
});
test('[I-01/g] an unaccredited packet cannot poison sequence or clock watermarks',()=>{
  const s=F.session();s.start();const legitimate=s.packet(),fake=P.clone(legitimate);
  fake.sampleSequence=999;fake.eventId='e999';fake.time.monotonicMs=999999;
  assert.equal(s.adapter.ingest(fake).reason,'registry-unaccredited');assert.equal(read(s).metadata.lastSequence,2);
  assert.equal(read(s).metadata.lastTime,2);assert.equal(s.adapter.ingest(legitimate).candidateB0,'pass');
  assert.equal(read(s).qa0.summaries[0].firstControlAt,3);
});
test('[I-01/h] authority exhaustion fails closed while scalar leases and both rings remain within partition',()=>{
  const s=F.session('_gam_kv_.js',{registryOptions:{budgetBytes:512}});s.start();const pending=s.packet();
  assert.throws(()=>{for(let n=2;n<20;n++)s.nextCycle(n);},/registry-overflow/);
  assert.equal(s.registry.accredit(pending),'authority-exhausted');assert.equal(s.adapter.ingest(pending).reason,'registry-authority-exhausted');
  assert.deepEqual(totals(s),[1,1,0]);assert.equal(read(s).qa0.summaries[0].firstControlAt,null);memoryCheck(read(s));
});

test('every new delivery path is reversible by projection; originals, traversal and historical docs are forbidden',()=>{
  const before=JSON.parse(fs.readFileSync(path.join(root,'docs/intext-p14b-qa1b-stage1-before.json'),'utf8'));
  const files=['tests/qa/qa1b/adapter.cjs','tests/qa/qa1b/generator.cjs','docs/intext-p14b-qa1b-stage1-before.json',
    'tests/intext-p14b-qa1b-stage1.test.cjs','docs/intext-p14b-qa1b-stage1-evidence.json'];
  const manifest={schema:'qa1b-stage1-integrity-v1',protectedBefore:before.files,contracts:before.contracts,newFiles:files.map(file=>({file}))};
  const plan=Delivery.removalPlan(manifest),all=new Set([...before.files,...before.contracts].map(x=>x.file).concat(plan.files));
  for(const file of plan.files)all.delete(file);
  assert.deepEqual([...all].sort(),[...before.files,...before.contracts].map(x=>x.file).sort());
  for(const file of ['_gam_kv_.js','IntextManager.js','docs/intext-p14b-qa1b-integrity.json','../other.txt','docs/../../original.txt']){
    assert.throws(()=>Delivery.removalPlan({...manifest,newFiles:[{file}]}),/unsafe-removal/);
  }
});
test('stage I baseline: all 360 originals and all four binding contracts remain byte-identical',()=>{
  const before=JSON.parse(fs.readFileSync(path.join(root,'docs/intext-p14b-qa1b-stage1-before.json'),'utf8'));
  assert.equal(before.files.length,360);
  for(const item of [...before.files,...before.contracts]){const b=fs.readFileSync(path.join(root,item.file));assert.equal(b.length,item.bytes,item.file);assert.equal(hash(b),item.sha256,item.file);}
  const sty=before.files.find(x=>x.file.endsWith('.sty'));assert.equal(sty.bytes,3940);assert.equal(sty.sha256,'15c72d69032cc0e212b1501cdd78e9da78561b404c65165fe1a6d02efe16b660');
});
