'use strict';
// Explicit data calls only. The frozen QA0 ledger is the sole population authority.
const {createP14BLedgerV1}=require('../intext-p14b-shadow-ledger.cjs');
const P=require('./packet.cjs');
const {isRegistry}=require('./identity-registry.cjs');
const PARTITION=Object.freeze({summaryBytes:256*1024,qa0AggregateBytes:16*1024,metadataBytes:16*1024,
  qa0RingBytes:512*1024,packetRingBytes:1248*1024,opportunities:64,qa0Entries:1000,packetEntries:1000,totalBytes:2048*1024});
const FALSE_COVERAGE=Object.freeze({D0:false,Dv:false,Dc:false,outcomes:false});
function advanceCounter(value){
  if(!Number.isSafeInteger(value)||value<0)throw new RangeError('invalid-counter');
  return value===Number.MAX_SAFE_INTEGER?{value,overflow:true}:{value:value+1,overflow:false};
}
function limitsFor(reductions={}){
  if(!reductions||typeof reductions!=='object'||Array.isArray(reductions))throw new TypeError('partition-required');
  const limits={...PARTITION};
  for(const [key,value]of Object.entries(reductions)){
    if(!Object.hasOwn(limits,key)||!Number.isSafeInteger(value)||value<0||value>limits[key])throw new RangeError('partition-increase-or-invalid');
    limits[key]=value;
  }
  if(limits.qa0RingBytes<2||limits.qa0AggregateBytes<4096||limits.packetRingBytes<2
    ||limits.summaryBytes+limits.qa0AggregateBytes+limits.metadataBytes+limits.qa0RingBytes+limits.packetRingBytes>limits.totalBytes)throw new RangeError('partition-sum');
  return Object.freeze(limits);
}
function createOfflineAdapter(options){
  const {distribution,documentLocalId,registry}=options||{};
  for(const key of Object.keys(options||{}))if(!['distribution','documentLocalId','registry','limits','coverage','sourceClock'].includes(key))throw new TypeError('unsupported-option');
  if(!Object.hasOwn(P.CORES,distribution)||typeof documentLocalId!=='string'||!/^[A-Za-z][A-Za-z0-9_-]{0,47}$/.test(documentLocalId)||!isRegistry(registry))throw new TypeError('series-context-required');
  if(options.sourceClock!==undefined&&options.sourceClock!=='synthetic-monotonic-ms')throw new TypeError('stage1-synthetic-clock-only');
  if(options.coverage!==undefined&&(!options.coverage||Object.keys(options.coverage).some(k=>!Object.hasOwn(FALSE_COVERAGE,k)||options.coverage[k]!==false)))throw new TypeError('coverage-must-remain-false');
  const limits=limitsFor(options.limits),ledger=createP14BLedgerV1({documentLocalId,sourceClock:'synthetic-monotonic-ms',
    coverage:{...FALSE_COVERAGE},candidates:[{family:'B0'}],limits:{opportunities:limits.opportunities,snapshots:limits.qa0Entries,
      summaryBytes:limits.summaryBytes,aggregateBytes:limits.qa0AggregateBytes,snapshotBytes:limits.qa0RingBytes,
      totalBytes:limits.summaryBytes+limits.qa0AggregateBytes+limits.qa0RingBytes}});
  let ring=[],ringBytes=2,closed=false,lastSequence=0,lastTime=null;
  // Public receipt correlation/first-check metadata only; no secondary populations.
  const opportunityMetadata=[];
  const flags={metadataOverflow:false,counterOverflow:false,sourceGap:false};
  const counts={received:0,accepted:0,rawOnly:0,rejected:0,duplicates:0,retiredSequences:0,packetDropped:0,packetOversized:0};
  const loss={firstSequence:null,lastSequence:null};
  const metadata=()=>({schema:'qa1b-adapter-metadata-v1',distribution,documentLocalId,closed,lastSequence,lastTime,flags,counts,loss,limits,
    opportunityMetadata,registry:registry.stats()});
  const metadataReservationBytes=()=>Buffer.byteLength(JSON.stringify(metadata(),(key,value)=>
    value===null||typeof value==='number'?Number.MAX_SAFE_INTEGER:typeof value==='boolean'?false:value),'utf8')+registry.stats().budgetBytes;
  // All counters/scalars fit this reservation. WeakMap values have a separate conservative charge.
  if(metadataReservationBytes()>limits.metadataBytes)throw new RangeError('metadata-preflight');
  function gap(scope='all'){flags.sourceGap=true;return ledger.markGap(scope);}
  function increment(key){const next=advanceCounter(counts[key]);counts[key]=next.value;if(next.overflow){flags.counterOverflow=true;gap();return false;}return true;}
  function drop(entry,oversized=false){increment('packetDropped');if(oversized)increment('packetOversized');loss.firstSequence??=entry.packet.sampleSequence;loss.lastSequence=entry.packet.sampleSequence;}
  function retain(packet,receipt,fingerprint){
    const entry={packet:P.clone(packet),receipt:P.clone(receipt),fingerprint},n=P.bytes(entry);
    if(n+2>limits.packetRingBytes){drop(entry,true);return;}
    if(!limits.packetEntries){drop(entry);return;}
    ringBytes+=n+(ring.length?1:0);ring.push(entry);
    while(ring.length>limits.packetEntries||ringBytes>limits.packetRingBytes){
      const previous=ring.length,old=ring.shift();ringBytes-=P.bytes(old)+(previous>1?1:0);drop(old);
    }
  }
  function ingest(input){
    if(closed)return {accepted:false,reason:'adapter-closed'};
    increment('received');
    const validated=P.validate(input);
    if(!validated.valid){increment('rejected');gap();return {accepted:false,reason:'invalid-packet',errors:validated.errors};}
    const p=validated.packet;
    if(p.provenance.distribution!==distribution||(p.identity.documentLocalId!==null&&p.identity.documentLocalId!==documentLocalId)||p.time.sourceClock!=='synthetic-monotonic-ms'){
      increment('rejected');gap();return {accepted:false,reason:'series-or-clock-mismatch'};
    }
    // Check the original immutable object, not the validated JSON-shaped clone.
    // This precedes dedup and every time/sequence/population update, so a foreign
    // packet cannot borrow a receipt through matching aliases or event IDs.
    const accreditation=registry.accredit(input);
    if(accreditation!=='current'){
      increment('rejected');gap();return {accepted:false,reason:`registry-${accreditation}`,
        acceptanceA:'not-admitted',candidateB0:'unknown',opportunityId:null,duplicate:false};
    }
    const fingerprint=P.digest(p),old=ring.find(e=>e.packet.sampleSequence===p.sampleSequence);
    if(p.sampleSequence<=lastSequence){
      if(old&&old.fingerprint===fingerprint){increment('duplicates');return {...P.clone(old.receipt),duplicate:true};}
      increment(old?'rejected':'retiredSequences');gap();
      return {accepted:false,reason:old?'event-sequence-conflict':'retired-sequence',duplicate:false};
    }
    if(p.sampleSequence!==lastSequence+1)gap();
    lastSequence=p.sampleSequence;
    const selection=P.select(p,true);
    const key=[p.identity.navigationLocalId,p.identity.slotLocalId,p.identity.cycleId];
    const prior=opportunityMetadata.find(row=>key.every((value,index)=>row[index]===value));
    let metadataAdded=false;
    const clockInvalid=p.time.monotonicMs===null||(lastTime!==null&&p.time.monotonicMs<lastTime);
    if(!clockInvalid)lastTime=p.time.monotonicMs;
    let result=null,reason='raw-series',validA=false;
    const terminal=p.kind==='terminal'&&p.identity.state==='terminal'&&p.ownership.state==='terminal'
      &&P.completeIdentity({...p.identity,state:'live'})&&p.ownership.verified&&p.ownership.nodeLocalId===p.identity.slotLocalId
      &&p.ownership.waterfallLocalId!==null&&p.ownership.attemptLocalId!==null&&p.provenance.verified&&p.provenance.origin==='synthetic-fixture';
    if(clockInvalid){
      reason='unknown-or-regressed-clock';gap();
    }else if(!selection.verified&&!terminal){reason='identity-or-provenance-unknown';gap();}
    else if(p.identity.state!=='live'&&!terminal){reason='stale-or-terminal';gap('Dc');}
    else{
      const facts={};
      const population=p.caller==='population'&&p.format==='opportunity';
      if(population&&p.kind==='fetch'&&['native-fetch','native-auction'].includes(p.provenance.boundary))facts.fetchObserved=true;
      if(population&&p.kind==='winner'&&p.provenance.boundary==='native-decision'&&p.facts.winnerSource==='native-decision'
        &&p.facts.initialWinner!=='unknown')facts.initialWinner=p.facts.initialWinner;
      if(population&&p.kind==='terminal'&&p.provenance.boundary==='terminal'&&p.facts.terminal!==null)facts.terminal=p.facts.terminal;
      const handoff=population&&p.kind==='handoff'&&p.provenance.boundary==='handoff';
      if(p.kind==='gap'){gap();reason='declared-gap';}
      else if(selection.primary||Object.keys(facts).length||handoff){
        const sample={schemaVersion:'p14b-shadow-sample-v1',contractRevision:'r2',source:{consistent:true},identity:P.clone(p.identity),
          scope:selection.primary?'video':'opportunity',stage:p.stage,sourceClock:p.time.sourceClock,monotonicMs:p.time.monotonicMs,
          sampleSequence:p.sampleSequence,provenance:{distribution,coreSha256:p.provenance.coreSha256,
            cssModelVersion:p.provenance.cssModelVersion,configVersion:p.provenance.configVersion},
          control:{observed:selection.primary,reliable:selection.primary,eligible:selection.primary?p.guard.eligible:null},plannedRegions:[]};
        sample.coverage={leftCensored:selection.primary&&p.guard.eligible===true&&prior?.[4]!==true};
        result=ledger.ingest(sample,facts);reason=result.reason;
        validA=selection.primary&&result.accepted;
        if(result.accepted){
          if(prior)prior[4]||=selection.primary;
          else{opportunityMetadata.push([...key,result.opportunityId,selection.primary]);metadataAdded=true;}
        }
        if(!result.accepted)gap();
      }else if(P.PRIMARY.includes(p.caller)||p.caller==='unknown'){reason='primary-not-executed-or-unqualified';gap('Dc');}
    }
    const receipt={schema:'qa1b-ingest-receipt-v1',packetId:p.eventId,sampleSequence:p.sampleSequence,
      distribution,documentLocalId,series:selection.series,accepted:result?.accepted===true,reason,
      acceptanceA:validA?'valid':'not-admitted',candidateB0:validA?result.results[0].status:'unknown',
      opportunityId:result?.opportunityId??null,duplicate:false};
    increment(receipt.accepted?'accepted':'rawOnly');retain(p,receipt,fingerprint);
    if(metadataReservationBytes()>limits.metadataBytes){
      if(metadataAdded)opportunityMetadata.pop();
      flags.metadataOverflow=true;gap();ledger.close({endTimeMs:lastTime});closed=true;
    }
    return P.clone(receipt);
  }
  function close(endTimeMs){
    if(closed)return {accepted:false,reason:'adapter-closed'};
    // QA0 validates the timestamp against every projected observation; also cover raw series.
    if(typeof endTimeMs!=='number'||!Number.isFinite(endTimeMs)||endTimeMs<0||(lastTime!==null&&endTimeMs<lastTime))throw new RangeError('invalid-end-time');
    const result=ledger.close({endTimeMs});closed=true;return result;
  }
  function exportManual(){
    const qa0=ledger.exportManual(),meta=metadata();
    return P.clone({schema:'qa1b-manual-export-v1',contractRevision:'r1-review-B',stage:'I-offline-synthetic',
      acquisition:false,physicalBudgetMeasured:false,projectionVersion:'primary-video-preplayer-v1',
      series:{distribution,documentLocalId,sourceClock:'synthetic-monotonic-ms'},qa0,entries:ring,metadata:meta,
      memory:{summaryBytes:qa0.memory.logicalSummaryBytes,qa0AggregateBytes:qa0.memory.logicalAggregateBytes,
        qa0RingBytes:qa0.memory.logicalSnapshotBytes,metadataBytes:P.bytes(meta)+registry.stats().logicalChargedBytes,
        packetRingBytes:ringBytes,detailEntries:qa0.snapshots.length+ring.length,limits}});
  }
  function serializeManual({maxBytes=limits.totalBytes}={}){
    if(!Number.isSafeInteger(maxBytes)||maxBytes<1||maxBytes>limits.totalBytes)throw new RangeError('invalid-export-limit');
    const value=exportManual(),json=JSON.stringify(value),bytes=Buffer.byteLength(json,'utf8');
    return bytes>maxBytes?{status:'export-too-large',bytes,json:null}:{status:'ok',bytes,json};
  }
  return Object.freeze({ingest,close,exportManual,serializeManual});
}
module.exports={PARTITION,FALSE_COVERAGE,limitsFor,advanceCounter,createOfflineAdapter};
