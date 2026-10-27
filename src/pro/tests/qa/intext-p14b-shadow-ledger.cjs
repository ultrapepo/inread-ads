'use strict';
// QA0 in-memory data ledger. Explicit ingestion/close/export only; no acquisition or I/O.
const D=require('./intext-p14b-data.cjs');
const E=require('./intext-p14b-shadow-evaluator.cjs');
const {own,at,integer,finite,oneOf,bytes,clone}=D;
const LIMITS=Object.freeze({opportunities:64,snapshots:2000,summaryBytes:256*1024,aggregateBytes:32*1024,snapshotBytes:1760*1024,totalBytes:2*1024*1024});
const STATUSES=Object.freeze(['pass','fail','unknown','not-applicable']);
const FRAME_SOURCES=Object.freeze(['request-video-frame-callback','ad-playing-confirmed','ad-timeupdate-confirmed']);
// These bindings are supplied facts, never invented from event names or SDK objects.
function attributedFrame(sample,frame,identity){
  const binding=own(sample,'adMediaBinding'),eventIdentity=D.identity(frame),bindingIdentity=D.identity(binding);
  const matches=value=>value&&Object.keys(identity).every(k=>value[k]===identity[k]);
  if(!matches(eventIdentity)||!matches(bindingIdentity)||own(sample,'scope')!=='video'
    ||own(frame,'provenanceVerified')!==true||own(binding,'provenanceVerified')!==true
    ||own(frame,'media')!=='ad'||own(binding,'media')!=='ad'
    ||!D.localId(own(binding,'managerLocalId'))||!D.localId(own(binding,'mediaLocalId'))
    ||own(frame,'managerLocalId')!==own(binding,'managerLocalId')||own(frame,'mediaLocalId')!==own(binding,'mediaLocalId')
    ||own(frame,'sourceClock')!==own(sample,'sourceClock')||own(frame,'monotonicMs')!==own(sample,'monotonicMs'))return false;
  const source=own(frame,'source'),e=own(frame,'evidence'),mediaTime=own(e,'mediaTimeSeconds');
  if(!FRAME_SOURCES.includes(source)||!finite(mediaTime)||mediaTime<0)return false;
  return source==='request-video-frame-callback'
    ?own(e,'kind')==='presented-frame'&&integer(own(e,'presentedFrames'),1)
    :own(e,'kind')==='decoded-ad-frame'&&integer(own(e,'decodedFramesSinceBinding'),1)&&mediaTime>0;
}
const emptyStatuses=()=>Object.fromEntries(STATUSES.map(s=>[s,0]));
const stageOf=s=>oneOf(own(s,'stage'),D.STAGES)||'unknown';
const cleanRect=r=>Object.fromEntries(['left','top','width','height'].map(k=>[k,D.numberOrNull(own(r,k))]));

function limitsFor(value){
  const out={...LIMITS};
  if(value!==undefined){
    if(!D.record(value))throw new TypeError('p14b_invalid_limits');
    for(const k of Object.keys(value)){
      if(!Object.hasOwn(LIMITS,k)||!integer(own(value,k),k==='snapshotBytes'?2:k==='aggregateBytes'?4096:k==='totalBytes'?4096:0)||own(value,k)>LIMITS[k])throw new RangeError('p14b_invalid_limit');
      out[k]=own(value,k);
    }
  }
  if(out.summaryBytes+out.aggregateBytes+out.snapshotBytes>out.totalBytes)throw new RangeError('p14b_limit_partition');
  return Object.freeze(out);
}
function catalogueFor(values){
  const list=D.items(values,32);if(!list?.length)throw new TypeError('p14b_explicit_catalogue_required');
  const seen=new Set();
  return Object.freeze(list.map(c=>{
    const spec=E.candidateV1(c);
    if(!spec||(['B1','B2','B3'].includes(spec.family)&&(!spec.rectModelId||!spec.parametersValid)))throw new TypeError('p14b_invalid_catalogue');
    const key=JSON.stringify([spec.family,spec.rectModelId,spec.parameterSetId]);
    if(seen.has(key))throw new TypeError('p14b_duplicate_candidate');seen.add(key);
    // parametersValid is internal validation, never copied from caller.
    return Object.freeze({...spec,parameters:Object.freeze({...spec.parameters}),key});
  }));
}

function createP14BLedgerV1(options){
  if(!D.record(options)||!D.localId(own(options,'documentLocalId')))throw new TypeError('p14b_document_required');
  const documentId=own(options,'documentLocalId'),limits=limitsFor(own(options,'limits'));
  const sourceClock=own(options,'sourceClock')??'synthetic-monotonic-ms';
  if(!D.CLOCKS.includes(sourceClock))throw new TypeError('p14b_invalid_clock_domain');
  const catalogue=catalogueFor(own(options,'candidates'));
  const rows=new Map();let ring=[],ringLogicalBytes=2,closed=false,nextOpportunity=0,totalNotifications=0,firstTime=null,lastTime=null;
  const sourceComplete=Object.fromEntries(['D0','Dv','Dc','outcomes'].map(k=>[k,at(options,'coverage',k)===true]));
  const flags={accountingOverflow:false,summaryOverflow:false,sourceGap:false,counterOverflow:false,
    untrackedOpportunityNotifications:0,untrackedObservations:0,rejectedInputs:0,rawEvidenceEvicted:false,
    rawDropped:0,oversizedSnapshots:0,snapshotLimitDrops:0,firstRawDroppedSequence:null,lastRawDroppedSequence:null,
    rawDroppedByStage:Object.fromEntries([...D.STAGES,'unknown'].map(k=>[k,0]))};
  const gaps={D0:false,Dv:false,Dc:false,outcomes:false};
  let counts={D0:{yes:0,no:0,unknown:0},Dv:{yes:0,no:0,unknown:0},Dc:{yes:0,no:0,unknown:0},frames:0,frameUnknown:0};
  const increment=(object,key)=>{
    if(object[key]>=Number.MAX_SAFE_INTEGER){flags.counterOverflow=true;for(const k of Object.keys(gaps))gaps[k]=true;}
    else object[key]++;
  };
  const taint=kind=>{flags.sourceGap=true;if(kind==='all')for(const k of Object.keys(gaps))gaps[k]=true;else gaps[kind]=true;};
  function storageRows(map=rows){return [...map].map(([key,r])=>({key,identity:r.identity,summary:r.summary}));}
  const summaryBytes=()=>rows.size?bytes(storageRows()):0;
  function memberships(s){
    const v=s.winner==='video'?'yes':['display','none'].includes(s.winner)?'no':'unknown';
    const c=v!=='yes'?'unknown':s.controlPositive?'yes':s.controlCoverageComplete?'no':'unknown';
    return {v,c};
  }
  function recount(){
    const n={D0:{yes:0,no:0,unknown:0},Dv:{yes:0,no:0,unknown:0},Dc:{yes:0,no:0,unknown:0},frames:0,frameUnknown:0};
    for(const {summary:s}of rows.values()){
      if(!s.fetchObserved){n.D0.unknown++;continue;}n.D0.yes++;
      const {v,c}=memberships(s);n.Dv[v]++;
      if(v==='yes'){
        n.Dc[c]++;
        if(s.frameObserved)n.frames++;
        else if(!s.terminal||!s.frameCoverageComplete||s.tokenReplaced||s.frameAttributionIncomplete)n.frameUnknown++;
      }
    }
    counts=n;
  }
  const aggregate=()=>({sourceComplete,gaps,flags,counts,closed,totalNotifications,firstTime,lastTime,sourceClock,nextOpportunity,ringLogicalBytes,limits,
    catalogue:catalogue.map(c=>({family:c.family,rectModelId:c.rectModelId,parameterSetId:c.parameterSetId,formulaVersion:c.formulaVersion}))});
  // Fixed-size schema/counters + <=32 canonical candidates stay within this reserved block.
  function worstSize(value){
    if(value===null||typeof value==='number')return -Number.MAX_VALUE;
    if(typeof value==='boolean')return false;
    if(Array.isArray(value))return value.map(worstSize);
    if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,worstSize(v)]));
    return value;
  }
  if(bytes(worstSize(aggregate()))>limits.aggregateBytes)throw new RangeError('p14b_aggregate_limit');
  function overflow(summary=false){
    flags.accountingOverflow=true;if(summary)flags.summaryOverflow=true;
    for(const k of Object.keys(gaps))gaps[k]=true;
  }
  function commit(key,row){
    const proposed=new Map(rows);proposed.set(key,row);
    if(bytes(storageRows(proposed))>limits.summaryBytes){overflow(true);return false;}
    rows.set(key,row);recount();return true;
  }
  function newSummary(id){
    return {opportunityId:`o${id}`,fetchObserved:false,winner:'unknown',winnerConflict:false,controlPositive:false,controlSeen:false,
      controlCoverageComplete:false,frameObserved:false,frameCoverageComplete:false,frameAttributionIncomplete:false,impressionObserved:false,
      firstControlAt:null,firstControlToken:null,firstFrameAt:null,firstFrameToken:null,firstSeenAt:null,lastSeenAt:null,terminal:null,tokenReplaced:false,
      currentRenderToken:null,currentFetchGeneration:null,censor:{left:false,right:false,sourceGap:false,rawEvidenceEvicted:false},
      loss:{count:0,firstSequence:null,lastSequence:null},results:catalogue.map(()=>emptyStatuses())};
  }
  function drop(entry,kind){
    flags.rawEvidenceEvicted=true;increment(flags,'rawDropped');
    increment(flags.rawDroppedByStage,entry.payload.stage);
    if(flags.firstRawDroppedSequence===null)flags.firstRawDroppedSequence=entry.payload.sequence;
    flags.lastRawDroppedSequence=entry.payload.sequence;
    increment(flags,kind==='oversized'?'oversizedSnapshots':'snapshotLimitDrops');
    if(entry.key&&rows.has(entry.key)){
      const r=clone(rows.get(entry.key));r.summary.censor.rawEvidenceEvicted=true;
      increment(r.summary.loss,'count');r.summary.loss.firstSequence??=entry.payload.sequence;r.summary.loss.lastSequence=entry.payload.sequence;
      commit(entry.key,r); // A byte overflow here fails accounting closed; never evicts a summary.
    }
  }
  function sanitizedSnapshot(sample,results,opportunityId){
    const models=D.items(own(sample,'plannedRegions'),D.MODELS.length)||[];
    return {sequence:totalNotifications,monotonicMs:D.numberOrNull(own(sample,'monotonicMs')),opportunityId,
      scope:oneOf(own(sample,'scope'),['video','display','opportunity'])||'unknown',stage:stageOf(sample),
      distribution:oneOf(at(sample,'provenance','distribution'),D.DISTRIBUTIONS),control:D.control(sample),
      viewport:{width:D.numberOrNull(at(sample,'viewport','width')),height:D.numberOrNull(at(sample,'viewport','height'))},
      plannedRegions:models.filter(m=>D.MODELS.includes(own(m,'modelId'))).map(m=>({modelId:own(m,'modelId'),
        quality:oneOf(own(m,'quality'),['measured','qualified-estimate','partial','unknown'])||'unknown',rect:cleanRect(own(m,'rect'))})),
      results:clone(results)};
  }
  function retain(sample,results,key){
    const opportunityId=key?rows.get(key)?.summary.opportunityId??null:null;
    const entry={key, payload:sanitizedSnapshot(sample,results,opportunityId)};
    const entryBytes=bytes(entry);
    // Charge internal key metadata too; exported raw identities are always removed.
    if(limits.snapshots===0){drop(entry,'capacity');return;}
    if(entryBytes+2>limits.snapshotBytes){drop(entry,'oversized');return;}
    ringLogicalBytes+=entryBytes+(ring.length?1:0);ring.push(entry);
    while(ring.length>limits.snapshots||ringLogicalBytes>limits.snapshotBytes){
      const oldLength=ring.length,removed=ring.shift();
      ringLogicalBytes-=bytes(removed)+(oldLength>1?1:0);drop(removed,'capacity');
    }
  }
  function markGap(kind='all'){
    if(closed)return {accepted:false,reason:'ledger-closed'};
    if(!['all','D0','Dv','Dc','outcomes'].includes(kind))throw new TypeError('p14b_gap_scope');
    taint(kind);
    for(const [key,current]of [...rows]){
      const r=clone(current);r.summary.censor.sourceGap=true;
      if(kind==='all'||kind==='Dc')r.summary.controlCoverageComplete=false;
      if(kind==='all'||kind==='outcomes')r.summary.frameCoverageComplete=false;
      commit(key,r);
    }
    return {accepted:true,reason:'source-gap'};
  }
  function ingest(sample,facts={}){
    if(closed)return {accepted:false,reason:'ledger-closed'};
    if(!D.record(facts))throw new TypeError('p14b_facts_required');
    const i=D.identity(own(sample,'identity'));
    if(i&&i.documentLocalId!==documentId)return {accepted:false,reason:'document-mismatch'};
    if(!i||own(sample,'schemaVersion')!==D.SCHEMA||own(sample,'contractRevision')!=='r2'||at(sample,'source','consistent')!==true){
      increment(flags,'rejectedInputs');taint('all');return {accepted:false,reason:'invalid-source-or-identity'};
    }
    const key=D.opportunityKey(i),existing=rows.get(key);
    const terminalFact=oneOf(own(facts,'terminal'),['complete','timeout','error','disposed','abandoned']);
    const closingKnownIdentity=i.state==='terminal'&&existing&&terminalFact
      &&i.renderToken===existing.summary.currentRenderToken&&i.fetchGeneration===existing.summary.currentFetchGeneration;
    if((i.state!=='live'&&!closingKnownIdentity)||i.renderToken!==i.activeRenderToken)return {accepted:false,reason:'stale-or-terminal-identity'};
    const t=own(sample,'monotonicMs');
    if(!finite(t)||t<0||!integer(own(sample,'sampleSequence'),1)||own(sample,'sourceClock')!==sourceClock){
      increment(flags,'rejectedInputs');taint('all');return {accepted:false,reason:'invalid-clock'};
    }
    if(lastTime!==null&&t<lastTime){increment(flags,'rejectedInputs');taint('all');return {accepted:false,reason:'clock-regression'};}
    firstTime??=t;lastTime=t;totalNotifications++;
    if(!Number.isSafeInteger(totalNotifications)){totalNotifications=Number.MAX_SAFE_INTEGER;flags.counterOverflow=true;taint('all');}
    const results=catalogue.map(c=>E.evaluateP14BShadowV1(sample,c));
    if(!existing&&(flags.accountingOverflow||rows.size>=limits.opportunities)){
      overflow();increment(flags,'untrackedOpportunityNotifications');retain(sample,results,null);
      return {accepted:false,reason:'accounting-overflow',results};
    }
    if(existing&&(i.renderToken<existing.summary.currentRenderToken||i.fetchGeneration<existing.summary.currentFetchGeneration)){
      increment(flags,'rejectedInputs');return {accepted:false,reason:'retired-generation'};
    }
    if(existing?.summary.terminal){
      // Repeated terminal notifications do not restart the cycle or duplicate populations.
      return {accepted:false,reason:'opportunity-terminal'};
    }
    const r=existing?clone(existing):{identity:i,summary:newSummary(nextOpportunity+1)};
    const s=r.summary;
    if(!existing&&own(facts,'fetchObserved')!==true){increment(flags,'untrackedObservations');taint('D0');s.censor.left=true;}
    if(existing&&(i.renderToken!==s.currentRenderToken||i.fetchGeneration!==s.currentFetchGeneration))s.tokenReplaced=true;
    r.identity=i;s.currentRenderToken=i.renderToken;s.currentFetchGeneration=i.fetchGeneration;
    s.firstSeenAt??=t;s.lastSeenAt=t;
    if(at(sample,'coverage','leftCensored')===true)s.censor.left=true;
    if(at(sample,'coverage','sourceGap')===true){s.censor.sourceGap=true;taint('all');}
    if(own(facts,'fetchObserved')===true)s.fetchObserved=true;
    const winner=oneOf(own(facts,'initialWinner'),['video','display','none']);
    if(winner&&!s.winnerConflict){
      if(s.winner==='unknown')s.winner=winner;
      else if(s.winner!==winner){s.winner='unknown';s.winnerConflict=true;taint('Dv');}
    }
    if((own(sample,'scope')==='display'&&s.winner==='video')||(own(sample,'scope')==='video'&&['display','none'].includes(s.winner))){
      s.winner='unknown';s.winnerConflict=true;taint('Dv');
    }
    const c0=D.control(sample);
    if(!closingKnownIdentity&&c0!==null){s.controlSeen=true;if(c0){s.controlPositive=true;if(s.firstControlAt===null){s.firstControlAt=t;s.firstControlToken=i.renderToken;}}}
    const frame=own(facts,'frame');
    if(!closingKnownIdentity&&own(frame,'observed')===true){
      if(attributedFrame(sample,frame,i)){
        s.frameObserved=true;if(s.firstFrameAt===null){s.firstFrameAt=t;s.firstFrameToken=i.renderToken;}
      }else s.frameAttributionIncomplete=true;
    }
    if(own(facts,'impressionObserved')===true)s.impressionObserved=true;
    if(own(facts,'controlCoverageComplete')===true)s.controlCoverageComplete=true;
    if(own(facts,'frameCoverageComplete')===true)s.frameCoverageComplete=true;
    const terminal=terminalFact;
    if(terminal)s.terminal=terminal;
    if(terminal==='abandoned'||own(facts,'rightCensored')===true)s.censor.right=true;
    results.forEach((result,index)=>increment(s.results[index],result.status));
    const saved=commit(key,r);
    if(saved&&!existing)nextOpportunity++;
    if(!saved)increment(flags,'untrackedOpportunityNotifications');
    retain(sample,results,saved?key:null);
    return {accepted:saved,reason:saved?'recorded':'summary-memory-overflow',opportunityId:saved?s.opportunityId:null,results};
  }
  function close(value={}){
    if(closed)return {accepted:false,reason:'ledger-closed'};
    const end=own(value,'endTimeMs');
    if(!finite(end)||end<0||(lastTime!==null&&end<lastTime))throw new RangeError('p14b_invalid_end_time');
    lastTime=end;closed=true;
    for(const [key,current]of [...rows]){
      const r=clone(current);if(!r.summary.terminal)r.summary.censor.right=true;commit(key,r);
    }
    return {accepted:true,reason:'capture-end'};
  }
  function exportManual(){
    const populationIntact=!flags.accountingOverflow&&!flags.counterOverflow;
    const D0Complete=closed&&populationIntact&&sourceComplete.D0&&!gaps.D0&&counts.D0.unknown===0;
    const DvComplete=D0Complete&&sourceComplete.Dv&&!gaps.Dv&&counts.Dv.unknown===0;
    const DcComplete=DvComplete&&sourceComplete.Dc&&!gaps.Dc&&counts.Dc.unknown===0;
    const frameComplete=DvComplete&&sourceComplete.outcomes&&!gaps.outcomes&&counts.frameUnknown===0;
    function rate(n,d,complete){return {numerator:n,denominator:d,value:complete&&d>0?n/d:null,
      exactRatesAllowed:complete&&d>0,status:!complete?'coverage-insufficient':d===0?'empty-population':'observed-records-only'};}
    const totals={D0:{...counts.D0,complete:D0Complete},Dv:{...counts.Dv,complete:DvComplete},Dc:{...counts.Dc,complete:DcComplete}};
    const publicRows=[...rows.values()].map(r=>{
      const s=clone(r.summary);s.censor.sourceGap||=Object.values(gaps).some(Boolean);
      const m=memberships(s);return {...s,membership:{D0:s.fetchObserved?'yes':'unknown',Dv:m.v,Dc:m.c}};
    });
    const memory={logicalSummaryBytes:summaryBytes(),logicalAggregateBytes:bytes(aggregate()),logicalSnapshotBytes:ringLogicalBytes,limits:{...limits}};
    return {schema:'p14b-shadow-export-v1',contractRevision:'r2',qaOnly:true,enforce:false,evaluationStage:'snapshot-B0-B3',
      closed,sourceClock,windowStartObservedMs:firstTime,windowEndMs:lastTime,totals,coverage:{sourceComplete:clone(sourceComplete),gaps:clone(gaps),flags:clone(flags),
        accountingComplete:{D0:D0Complete,Dv:DvComplete,Dc:DcComplete},
        exactRatesAllowed:D0Complete&&DvComplete&&DcComplete&&frameComplete,
        meaning:'Record populations only; no continuous scroll, alternative request, revenue, fill or viewability is reconstructed.'},
      rates:{videoOpportunityShare:rate(counts.Dv.yes,counts.D0.yes,DvComplete),controlObservedShare:rate(counts.Dc.yes,counts.Dv.yes,DcComplete),
        videoWithObservedFrame:rate(counts.frames,counts.Dv.yes,frameComplete),
        firstPassFrame:{value:null,exactRatesAllowed:false,status:'temporal-coverage-not-implemented'}},
      catalogue:catalogue.map(({family,rectModelId,parameterSetId,formulaVersion})=>({family,rectModelId,parameterSetId,formulaVersion})),
      summaries:publicRows,snapshots:ring.map(e=>clone(e.payload)),memory};
  }
  function serializeManual(options={}){
    const maxBytes=own(options,'maxBytes')??limits.totalBytes;
    if(!integer(maxBytes,1)||maxBytes>limits.totalBytes)throw new RangeError('p14b_invalid_export_limit');
    const value=exportManual(),json=JSON.stringify(value),size=D.bytes(value);
    return size>maxBytes?{status:'export-too-large',bytes:size,json:null}:{status:'ok',bytes:size,json};
  }
  return Object.freeze({ingest,markGap,close,exportManual,serializeManual});
}
module.exports={LIMITS,createP14BLedgerV1};
