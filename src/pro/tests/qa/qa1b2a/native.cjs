'use strict';
// II-A native *offline* authority. No import, brand or minting path from fixtures.
// The endpoint is a capability for trusted, extracted source methods, not a JSON API.
const {randomBytes} = require('node:crypto');
const G = require('./generator.cjs');
const P = require('../qa1b/packet.cjs');
const {limitsFor, FALSE_COVERAGE, advanceCounter} = require('../qa1b/adapter.cjs');
const {createP14BLedgerV1} = require('../intext-p14b-shadow-ledger.cjs');
const WAIT = Object.freeze({'showDisplay:waitForViewport':'W1','buildAndPlayVideo:capacity-or-legacy':'W2',
  'buildAndPlayVideo:waitForViewport':'W3','video-activation':'W4'});
const PRIMARY = Object.freeze(['W2','W3','W4','C1']);
const object = v => v !== null && (typeof v === 'object' || typeof v === 'function');
// No getters, prototype traversal, SDK helpers, geometry calls or serialization of objects.
function own(o,k) {if(!object(o))return undefined;const d=Object.getOwnPropertyDescriptor(o,k);return d&&Object.hasOwn(d,'value')?d.value:undefined;}
const integer = (v,min=0) => Number.isSafeInteger(v)&&v>=min?v:null;
function createNativeOffline({buildCapability,document,clock,limits:reductions}={}) {
  const proof=G.describe(buildCapability);
  if(!object(document)||typeof clock!=='function')throw new TypeError('offline-document-and-clock-required');
  const trustedDocuments=new WeakSet([document]);
  const prefix=randomBytes(12).toString('hex'),documentLocalId=`d${prefix}`;
  document=null; // do not retain the simulated DOM root in a closure
  const limits=limitsFor(reductions),budgetBytes=12288;
  const aliases=new WeakMap(),engines=new WeakMap(),placements=new WeakMap(),nodes=new WeakMap(),waterfalls=new WeakMap(),
    auctions=new WeakMap(),creatives=new WeakMap(),entries=new WeakMap(),results=new WeakMap(),issued=new WeakMap();
  let aliasSequence=0,charged=0,exhausted=false,sequence=0,lastTime=null,closed=false,ring=[],ringBytes=2;
  const counters={received:0,accepted:0,rawOnly:0,rejected:0,duplicates:0,dropped:0,oversized:0};
  const flags={sourceGap:false,authorityExhausted:false,metadataOverflow:false,counterOverflow:false};
  const rows=[];
  const ledger=createP14BLedgerV1({documentLocalId,sourceClock:'synthetic-monotonic-ms',coverage:{...FALSE_COVERAGE},candidates:[{family:'B0'}],
    limits:{opportunities:limits.opportunities,snapshots:limits.qa0Entries,summaryBytes:limits.summaryBytes,
      aggregateBytes:limits.qa0AggregateBytes,snapshotBytes:limits.qa0RingBytes,totalBytes:limits.summaryBytes+limits.qa0AggregateBytes+limits.qa0RingBytes}});
  function gap(scope='all'){flags.sourceGap=true;ledger.markGap(scope);}
  function count(k){const next=advanceCounter(counters[k]);counters[k]=next.value;if(next.overflow){flags.counterOverflow=true;gap();}}
  function charge(value){const n=P.bytes(value);if(charged+n>budgetBytes){exhausted=true;flags.authorityExhausted=true;gap();throw new RangeError('native-authority-budget');}charged+=n;}
  function alias(value){if(!object(value))return null;if(!aliases.has(value)){const id=`a${++aliasSequence}`;charge(id);aliases.set(value,id);}return aliases.get(value);}
  function lease(){const cell={active:false};charge(cell);cell.active=true;return cell;}
  function retire(c){if(c?.lease)c.lease.active=false;}
  function stats(){return {authority:'native-local-object-v1',logicalChargedBytes:charged,budgetBytes,exhausted,sourceComplete:false};}
  function metadata(){return {schema:'qa1b-native-metadata-v1',proof,documentLocalId,sourceComplete:false,closed,lastTime,sequence,counters,flags,rows,authority:stats()};}
  function reservation(){return P.bytes(JSON.parse(JSON.stringify(metadata(),(k,v)=>k==='lastTime'?Number.MAX_VALUE:
    v===null||typeof v==='number'?Number.MAX_SAFE_INTEGER:typeof v==='boolean'?false:v)))+budgetBytes;}
  if(reservation()>limits.metadataBytes)throw new RangeError('native-metadata-preflight');
  function retain(packet,receipt) {
    const entry={packet,receipt:P.freeze(P.clone(receipt)),fingerprint:P.digest(packet)},size=P.bytes(entry);
    if(size+2>limits.packetRingBytes||!limits.packetEntries){count('dropped');if(size+2>limits.packetRingBytes)count('oversized');return;}
    ringBytes+=size+(ring.length?1:0);ring.push(entry);
    while(ring.length>limits.packetEntries||ringBytes>limits.packetRingBytes){const n=ring.length,old=ring.shift();ringBytes-=P.bytes(old)+(n>1?1:0);count('dropped');}
  }
  function full(i){return i && ['documentLocalId','navigationLocalId','slotLocalId','anchorLocalId'].every(k=>typeof i[k]==='string')
    &&integer(i.cycleId,1)!==null&&integer(i.fetchGeneration,1)!==null&&integer(i.renderToken)!==null&&i.renderToken===i.activeRenderToken;}
  function ingest(packet) {
    count('received');
    // Object provenance is checked before inspecting untrusted input, dedup or time.
    const stamp=object(packet)?issued.get(packet):null;
    if(!stamp||!stamp.lease.active||exhausted||closed){count('rejected');gap();return {accepted:false,acceptanceA:'not-admitted',candidateB0:'unknown',reason:closed?'closed':!stamp?'native-unaccredited':'native-retired',opportunityId:null,duplicate:false};}
    const old=ring.find(e=>e.packet.sampleSequence===packet.sampleSequence);
    if(packet.sampleSequence<=sequence){
      if(old&&old.packet===packet){count('duplicates');return {...P.clone(old.receipt),duplicate:true};}
      count('rejected');gap();return {accepted:false,reason:'retired-sequence',duplicate:false};
    }
    if(packet.sampleSequence!==sequence+1)gap();sequence=packet.sampleSequence;
    const primary=PRIMARY.includes(packet.caller)&&!['display','none'].includes(packet.facts.observedInitialWinner)
      &&packet.stage==='before-player'&&packet.format==='video'&&packet.guard.executed
      &&typeof packet.guard.eligible==='boolean'&&packet.ownership.verified&&full(packet.identity);
    const key=[packet.identity.navigationLocalId,packet.identity.slotLocalId,packet.identity.cycleId];
    const prior=rows.find(r=>key.every((v,i)=>r[i]===v));
    let result=null,reason='raw-series',validA=false;
    const badClock=!Number.isFinite(packet.time.monotonicMs)||packet.time.monotonicMs<0||(lastTime!==null&&packet.time.monotonicMs<lastTime);
    if(badClock){reason='unknown-or-regressed-clock';gap();}
    else {
      lastTime=packet.time.monotonicMs;
      if(!full(packet.identity)||!packet.ownership.verified){reason='native-identity-unknown';gap();}
      else if(packet.kind==='gap'){reason='native-boundary-gap';gap();}
      else if(primary||['fetch','winner','handoff','terminal'].includes(packet.kind)) {
        const facts={};
        if(packet.kind==='fetch')facts.fetchObserved=true;
        if(packet.kind==='winner')facts.initialWinner=packet.facts.initialWinner;
        if(packet.kind==='terminal')facts.terminal='abandoned';
        const sample={schemaVersion:'p14b-shadow-sample-v1',contractRevision:'r2',source:{consistent:true},identity:P.clone(packet.identity),
          scope:primary?'video':'opportunity',stage:packet.stage,sourceClock:'synthetic-monotonic-ms',monotonicMs:packet.time.monotonicMs,
          sampleSequence:packet.sampleSequence,provenance:{distribution:proof.distribution,coreSha256:proof.coreSha256,
            cssModelVersion:'native-guard-unmeasured',configVersion:'native-profile-IIA-offline'},
          control:{observed:primary,reliable:primary,eligible:primary?packet.guard.eligible:null},plannedRegions:[],
          coverage:{leftCensored:primary&&packet.guard.eligible===true&&prior?.[3]!==true}};
        result=ledger.ingest(sample,facts);reason=result.reason;validA=primary&&result.accepted;
        if(result.accepted){if(prior)prior[3]||=primary;else if(rows.length<limits.opportunities){rows.push([...key,primary]);
            if(reservation()>limits.metadataBytes){rows.pop();flags.metadataOverflow=true;gap();ledger.close({endTimeMs:lastTime});closed=true;}}}
        else gap();
      } else if(PRIMARY.includes(packet.caller)){reason='primary-unqualified';gap('Dc');}
    }
    const receipt={schema:'qa1b-native-receipt-v1',packetId:packet.eventId,sampleSequence:packet.sampleSequence,
      distribution:proof.distribution,documentLocalId,series:packet.series,accepted:result?.accepted===true,reason,
      acceptanceA:validA?'valid':'not-admitted',candidateB0:validA?result.results[0].status:'unknown',opportunityId:result?.opportunityId??null,duplicate:false};
    count(receipt.accepted?'accepted':'rawOnly');retain(packet,receipt);return P.clone(receipt);
  }
  function emit(c,kind,caller='population',guard=null,owner=null) {
    if(!c)return gap();
    const identity={documentLocalId:c.doc,navigationLocalId:c.nav,slotLocalId:c.slot,anchorLocalId:c.anchor,
      cycleId:c.cycle,fetchGeneration:c.generation,renderToken:c.token,activeRenderToken:c.token,verified:false,state:'unknown'};
    const ownership={nodeLocalId:c.slot,waterfallLocalId:c.waterfall,attemptLocalId:c.attempt,creativeLocalId:owner?.id??null,
      entryLocalId:owner?.entry??null,verified:false,state:'unknown'};
    const valid=full(identity)&&!!c.waterfall&&!!c.attempt&&c.lease.active;
    identity.verified=valid;identity.state=valid?'live':'unknown';ownership.verified=valid&&(!['W3','W4','C1'].includes(caller)||!!owner?.lease.active);
    ownership.state=ownership.verified?'live':'unknown';
    // Entering player construction excludes B0, but does not prove a player exists.
    const primary=PRIMARY.includes(caller),stage=c.player?'unknown':'before-player';
    const primarySeries=primary&&stage==='before-player'&&!['display','none'].includes(c.winner);
    let time;try{time=clock();}catch(_){time=null;}
    const next=advanceCounter(sequence);if(next.overflow){flags.counterOverflow=true;return gap();}
    const packet=P.freeze({schemaVersion:'qa1b-native-packet-v1',contractRevision:'r1-review-B',eventId:`e${next.value}`,sampleSequence:next.value,
      kind,caller,format:caller==='W1'?'display':primary?'video':'opportunity',stage,
      series:primarySeries?'primary-video-preplayer':caller==='W1'?'display':primary?'non-primary-video':'native-lifecycle',
      identity,ownership,time:{sourceClock:'synthetic-monotonic-ms',monotonicMs:typeof time==='number'&&Number.isFinite(time)?time:null},
      provenance:{...proof,origin:'native-boundary',producerProfile:'II-A-offline',
        boundary:({fetch:'native-fetch',winner:'native-decision',guard:'guard-result',handoff:'handoff',subattempt:'subattempt',gap:'unknown'})[kind]??'unknown',verified:valid},
      guard:{executed:!!guard,eligible:guard?own(guard,'eligible')??null:null,reason:guard?sanitizeReason(own(guard,'reason')):null,playerCreated:c.player?null:false},
      evidence:{rect:null,viewport:null,P:'unknown'},facts:{initialWinner:kind==='winner'?c.winner:'unknown',observedInitialWinner:c.winner,
        winnerSource:kind==='winner'?'native-decision':'unknown',terminal:kind==='terminal'?'abandoned':null}});
    if(!c.lease.certificate)c.lease.certificate={lease:c.lease,owner:null};
    const certificate=owner?(owner.certificate??=({lease:c.lease,owner:owner.lease,entry:owner.entryLease})):c.lease.certificate;
    issued.set(packet,certificate);
    // Owner revocation is tested again on every external retransmission.
    if(owner&&!owner.lease.active)return gap('Dc');
    return ingest(packet);
  }
  function sanitizeReason(reason){return ['anchor-missing','geometry-unavailable','document-hidden','anchor-zero-or-invalid-size','anchor-not-rendered','passed','below','outside-horizontal','visible'].includes(reason)?reason:'unknown';}
  function bindCreative(c,creative,token){
    if(!c||!object(creative)||token!==c.token)return gap('Dc');
    const old=creatives.get(creative);if(old)old.lease.active=false;
    const e=entries.get(own(creative,'_preparationEntry'));
    const qualifiedEntry=e&&e.lease.active&&e.slot===c.slot&&e.cycle===c.cycle&&e.generation===c.generation&&e.waterfall===c.waterfall?e:null;
    const record={id:alias(creative),slot:c.slot,cycle:c.cycle,generation:c.generation,token,entry:qualifiedEntry?.id??null,
      entryLease:qualifiedEntry?.lease??null,parentLease:c.lease,lease:lease()};
    charge([record.id,record.slot,record.cycle,record.generation,record.token,record.entry,false]);creatives.set(creative,record);
  }
  function ownerFor(c,creative){const o=object(creative)?creatives.get(creative):null;return o&&o.lease.active&&o.parentLease.active&&o.parentLease===c?.lease&&(!o.entryLease||o.entryLease.active)&&o.slot===c?.slot&&o.cycle===c.cycle&&o.generation===c.generation&&o.token===c.token?o:null;}
  function endpoint(kind,...a) {
    if(closed||exhausted)return;
    try {
      if(kind==='root') {
        const [engine,doc,root]=a;if(!trustedDocuments.has(doc))return gap();
        const r={doc:documentLocalId,nav:alias(root)};charge(r);engines.set(engine,r);return;
      }
      if(kind==='placements') {
        const [engine,list]=a,r=engines.get(engine);if(!r||!Array.isArray(list))return gap();
        for(let i=0;i<list.length;i++){const p=own(list,String(i));if(object(p)){charge([r.doc,r.nav]);placements.set(p,r);}}return;
      }
      if(kind==='node') {
        const [node,,placement,doc,navIndex]=a,r=placements.get(placement);if(!trustedDocuments.has(doc))return gap();
        retire(nodes.get(node));
        const nativeNavigation=integer(navIndex);
        const c={doc:r?.doc??documentLocalId,nav:r?.nav&&nativeNavigation!==null?`${r.nav}_n${nativeNavigation}`:null,slot:alias(node),anchor:null,cycle:null,generation:null,pendingGeneration:null,token:0,
          waterfall:null,attempt:null,winner:'unknown',player:false,lease:lease()};
        charge([c.doc,c.nav,c.slot,null,null,null,0,null,null,'unknown',false,false]);nodes.set(node,c);return;
      }
      const node=['fetch-begin','fetch','winner','legacy-auction','cleanup','preparation','handoff','retire-entry','entry-start','prepared-creative'].includes(kind)?a[1]:a[0];
      const c=object(node)?nodes.get(node):null;if(!c)return gap();
      if(kind==='anchor'){c.anchor=alias(a[1]);return;}
      if(kind==='cycle'){retire(c);c.lease=lease();c.cycle=integer(a[1],1);c.generation=c.pendingGeneration;c.pendingGeneration=null;c.winner='unknown';c.anchor=null;return;}
      if(kind==='fetch-begin'){
        retire(c);c.lease=lease();c.pendingGeneration=integer(a[2],1);c.generation=null;c.waterfall=alias(a[0]);c.attempt=`t${++aliasSequence}`;
        charge([c.attempt,c.pendingGeneration]);waterfalls.set(a[0],{slot:c.slot,generation:c.pendingGeneration,id:c.waterfall});return;
      }
      if(kind==='fetch'){
        const wf=waterfalls.get(a[0]);
        if(!wf||wf.id!==c.waterfall||wf.slot!==c.slot||wf.generation!==a[2]||c.generation!==a[2])return gap();
        return emit(c,'fetch');
      }
      if(kind==='legacy-auction'){c.generation=null;c.attempt=null;return emit(c,'gap');}
      if(kind==='winner'){
        const wf=waterfalls.get(a[0]),auction=a[3];
        if(!wf||wf.id!==c.waterfall||wf.slot!==c.slot||wf.generation!==a[2]||c.generation!==a[2])return gap();
        const observed=own(auction,'winner'),winner=observed===null?'none':observed;
        if(!['video','display','none'].includes(winner))return emit(c,'gap');
        c.winner=winner;const r={slot:c.slot,generation:c.generation,cycle:c.cycle,waterfall:c.waterfall};
        charge([r.slot,r.generation,r.cycle,r.waterfall]);auctions.set(auction,r);return emit(c,'winner');
      }
      if(kind==='token'){retire(c);c.lease=lease();c.token=integer(a[1]);c.player=false;return emit(c,'handoff');}
      if(kind==='invalidate'||kind==='cleanup'){
        // Cancellation of callbacks/fetch ownership is factual; opportunity outcome is not.
        // Do not invent an abandoned/complete outcome from these reusable boundaries.
        const receipt=emit(c,'gap');retire(c);return receipt;
      }
      if(kind==='creative')return bindCreative(c,a[1],integer(a[2]));
      if(kind==='preparation'){
        const auction=auctions.get(a[2]),wf=waterfalls.get(a[0]);
        if(!auction||!wf||wf.id!==c.waterfall||auction.waterfall!==wf.id||auction.slot!==c.slot||auction.generation!==c.generation||auction.cycle!==c.cycle){gap();return;}
        const r={id:alias(a[3]),...auction,preparationGeneration:integer(own(a[3],'generation')),lease:lease()};
        charge([r.id,r.slot,r.generation,r.cycle,r.preparationGeneration,false]);entries.set(a[3],r);return;
      }
      if(kind==='retire-entry'||kind==='entry-start'||kind==='prepared-creative'){
        const e=entries.get(a[2]),wf=waterfalls.get(a[0]);if(!e||!wf||e.waterfall!==wf.id||wf.id!==c.waterfall||e.slot!==c.slot||e.generation!==c.generation||e.cycle!==c.cycle)return gap();
        if(kind==='retire-entry'){e.lease.active=false;return emit(c,'subattempt');}
        if(kind==='entry-start'){e.lease.active=false;e.lease=lease();e.preparationGeneration=integer(a[3],1);return;}
        // Preparation is still a subattempt, not an initial-winner or B0 observation.
        if(!e.lease.active||e.preparationGeneration!==a[4])return gap();
        alias(a[3]);return emit(c,'subattempt');
      }
      if(kind==='handoff'){
        const e=entries.get(a[2]),wf=waterfalls.get(a[0]);if(!e||!wf||e.waterfall!==wf.id||wf.id!==c.waterfall||e.slot!==c.slot||e.generation!==c.generation||e.cycle!==c.cycle||a[3]!==c.token)return gap();
        // Handoff is not a new opportunity; the actual creative bind follows activeCreative assignment.
        return emit(c,'handoff');
      }
      if(kind==='result'){
        const [,anchor,result]=a;
        if(!object(result))return gap('Dc');
        const anchorId=alias(anchor);
        if(!c.capture||c.capture.lease!==c.lease||c.capture.anchor!==anchorId){
          const r={slot:c.slot,anchor:anchorId,cycle:c.cycle,generation:c.generation,token:c.token,lease:c.lease};
          charge([r.slot,r.anchor,r.cycle,r.generation,r.token,false]);c.capture=r;
        }
        // All results for this immutable identity/lease share a scalar capture cell.
        results.set(result,c.capture);return;
      }
      if(kind==='wait'||kind==='control'){
        const caller=kind==='wait'?WAIT[a[2]]??'unknown':a[1],creative=kind==='wait'?a[3]:a[2],result=kind==='wait'?a[4]:a[3];
        const r=object(result)?results.get(result):null;
        if(!r||!r.lease.active||r.lease!==c.lease||r.slot!==c.slot||r.cycle!==c.cycle||r.generation!==c.generation||r.token!==c.token
          ||(kind==='wait'&&a[1]!==c.token)){gap('Dc');return;}
        const owner=ownerFor(c,creative);
        if(['W3','W4','C1'].includes(caller)&&!owner){gap('Dc');return;}
        const observed={...c,anchor:r.anchor};
        return emit(observed,'guard',caller,result,owner);
      }
      if(kind==='player-build'){if(!ownerFor(c,a[1]))return gap();c.player=true;return;}
      if(kind==='retire-creative'){const o=creatives.get(a[1]);if(o)o.lease.active=false;return;}
      gap();
    } catch (_) {gap();}
  }
  function exportManual(){const qa0=ledger.exportManual(),meta=metadata();return P.clone({schema:'qa1b-native-manual-export-v1',stage:'II-A-offline',acquisition:false,
    sourceComplete:false,physicalBudgetMeasured:false,producerAuthority:'local-capability-not-external-authentication',qa0,entries:ring,metadata:meta,
    memory:{summaryBytes:qa0.memory.logicalSummaryBytes,qa0AggregateBytes:qa0.memory.logicalAggregateBytes,qa0RingBytes:qa0.memory.logicalSnapshotBytes,
      metadataBytes:P.bytes(meta)+charged,packetRingBytes:ringBytes,detailEntries:qa0.snapshots.length+ring.length,limits}});}
  function serializeManual({maxBytes=limits.totalBytes}={}){if(!Number.isSafeInteger(maxBytes)||maxBytes<1||maxBytes>limits.totalBytes)throw new RangeError('invalid-export-limit');const json=JSON.stringify(exportManual()),bytes=Buffer.byteLength(json);return bytes>maxBytes?{status:'export-too-large',bytes,json:null}:{status:'ok',bytes,json};}
  function close(endTimeMs){if(closed)return {accepted:false,reason:'closed'};if(!Number.isFinite(endTimeMs)||endTimeMs<0||(lastTime!==null&&endTimeMs<lastTime))throw new RangeError('invalid-end-time');const r=ledger.close({endTimeMs});closed=true;return r;}
  function receive(p){const stamp=object(p)?issued.get(p):null;if((stamp?.owner&&!stamp.owner.active)||(stamp?.entry&&!stamp.entry.active)){count('received');count('rejected');gap();return {accepted:false,reason:'native-owner-retired',candidateB0:'unknown'};}return ingest(p);}
  return Object.freeze({endpoint,ingest:receive,exportManual,serializeManual,close,stats,latestPacket:()=>ring.at(-1)?.packet??null});
}
module.exports={createNativeOffline,WAIT,PRIMARY};
