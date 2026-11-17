'use strict';
// II-B1: new browser factory, composed privately; no global endpoint.
function createRuntime(qa0, byteLength, context = {}) {
  const profile=Object.freeze({distribution:context.profile?.distribution,coreSha256:context.profile?.coreSha256,releaseInputId:context.profile?.releaseInputId});
  if(!['_gam_kv_.js','IntextManager.js'].includes(profile.distribution)||!/^[a-f0-9]{64}$/.test(profile.coreSha256)||!/^[a-f0-9]{64}$/.test(profile.releaseInputId))throw new TypeError('release-profile');
  const LIMITS=Object.freeze({summaryBytes:262144,qa0AggregateBytes:16384,metadataBytes:16384,qa0RingBytes:524288,
    packetRingBytes:1277952,opportunities:64,qa0Entries:1000,packetEntries:1000,totalBytes:2097152});
  const FALSE_COVERAGE=Object.freeze({D0:false,Dv:false,Dc:false,outcomes:false});
  const P={clone:v=>JSON.parse(JSON.stringify(v)),bytes:v=>byteLength(JSON.stringify(v)),freeze:function freeze(v){
    if(v&&typeof v==='object'){for(const x of Object.values(v))freeze(x);Object.freeze(v);}return v;}};
  const WAIT=Object.freeze({'showDisplay:waitForViewport':'W1','buildAndPlayVideo:capacity-or-legacy':'W2',
    'buildAndPlayVideo:waitForViewport':'W3','video-activation':'W4'}),PRIMARY=Object.freeze(['W2','W3','W4','C1']);
  const object=v=>v!==null&&(typeof v==='object'||typeof v==='function');
  function own(o,k){if(!object(o))return undefined;const d=Object.getOwnPropertyDescriptor(o,k);return d&&Object.hasOwn(d,'value')?d.value:undefined;}
  const integer=(v,min=0)=>Number.isSafeInteger(v)&&v>=min?v:null;
  function advanceCounter(v){if(integer(v)===null)throw new RangeError('counter');return v===Number.MAX_SAFE_INTEGER?{value:v,overflow:true}:{value:v+1,overflow:false};}
  function limitsFor(reductions={}){const l={...LIMITS};for(const[k,v]of Object.entries(reductions)){
    if(!Object.hasOwn(l,k)||integer(v)===null||v>l[k])throw new RangeError('partition-increase');l[k]=v;}
    if(l.qa0AggregateBytes<4096||l.qa0RingBytes<2||l.packetRingBytes<2||l.summaryBytes+l.qa0AggregateBytes+l.metadataBytes+l.qa0RingBytes+l.packetRingBytes>l.totalBytes)throw new RangeError('partition-sum');return Object.freeze(l);}
  function source(){try{const v=typeof context.sourceAttestor==='function'?context.sourceAttestor():null;return ['accredited','failed'].includes(v)?v:'pending';}catch(_){return 'failed';}}
  function decision(localMembership,sourceAttestation,lease,session){
    if(localMembership!=='valid')return 'membership';if(lease!=='valid')return 'lease';
    if(session!=='ACTIVE')return 'session';if(sourceAttestation!=='accredited')return 'source';return 'admit';
  }
  const categories=Object.freeze(['W2','W3','W4','C1','unused','setup','cleanup','export']);
  function costStats(onOverflow=()=>{}){const rows=categories.map(()=>Array(11).fill(0));let overflow=false;
    const fail=()=>{overflow=true;onOverflow();};
    const edges=[125,500,1000,2000,4000,16000,50000,Infinity];
    function add(category,ms){const i=categories.indexOf(category);if(i<0||!Number.isFinite(ms)||ms<0){fail();return;}
      const us=Math.ceil(ms*1000),r=rows[i],bin=edges.findIndex(e=>us<=e);
      if(!Number.isSafeInteger(rows.reduce((s,r)=>s+r[1],0)+us)){fail();return;}
      for(const [j,n]of [[0,1],[1,us],[3+bin,1]]){if(!Number.isSafeInteger(r[j]+n)){fail();return;}r[j]+=n;}r[2]=Math.max(r[2],us);}
    function read(){const totalRecordedUs=rows.reduce((s,r)=>s+r[1],0);return {kind:'OFFLINE-FIXTURE-COUNTERS-NOT-CHROME',rows:P.clone(rows),overflow,totalRecordedUs,realChrome:'NOT-MEASURED',
      series:categories.map((category,i)=>{const r=rows[i],unique=i>=5;let bound=null;
        if(!unique&&r[0]>=100){let n=0;const bin=r.slice(3).findIndex(v=>(n+=v)>=Math.ceil(r[0]*.95));bound=Number.isFinite(edges[bin])?edges[bin]/1000:null;}
        return {category,N:r[0],totalUs:r[1],maxUs:r[2],contributionToTotal:totalRecordedUs?r[1]/totalRecordedUs:null,p95UpperBoundMs:bound,
          status:overflow?'INCONCLUSIVE':unique?'total-and-maximum':r[0]<100?'INCONCLUSIVE':bound!==null&&bound<=2?'within-fixture-bound':'exceeded-fixture-bound'};})};}
    return Object.freeze({add,read,logicalBytes:()=>P.bytes(rows),reservedBytes:P.bytes(rows.map(r=>r.map(()=>Number.MAX_SAFE_INTEGER)))});
  }
  let idSequence=0;
  function makeId(){if(typeof context.randomId!=='function')throw new TypeError('random-source-required');const id=context.randomId();
    if(typeof id!=='string'||!/^[a-f0-9]{24}$/.test(id))throw new TypeError('invalid-random-id');return id+(++idSequence).toString(16);}
  const createP14BLedgerV1=qa0.createP14BLedgerV1;
function createSession({document,clock,limits:reductions}={}) {
  const proof=profile;
  if(!object(document)||typeof clock!=='function')throw new TypeError('offline-document-and-clock-required');
  const trustedDocuments=new WeakSet([document]);
  const prefix=makeId(),documentLocalId=`d${prefix}`;
  document=null; // do not retain the simulated DOM root in a closure
  const limits=limitsFor(reductions),budgetBytes=8192;
  let roots=new WeakMap(),aliases=new WeakMap(),engines=new WeakMap(),placements=new WeakMap(),nodes=new WeakMap(),waterfalls=new WeakMap(),
    auctions=new WeakMap(),creatives=new WeakMap(),entries=new WeakMap(),results=new WeakMap(),issued=new WeakMap(),managers=new WeakSet(),bornCreatives=new WeakSet();
  let aliasSequence=0,charged=0,exhausted=false,sequence=0,emittedSequence=0,lastTime=null,closed=false,ring=[],ringBytes=2;
  const counters={received:0,accepted:0,rawOnly:0,rejected:0,duplicates:0,dropped:0,oversized:0};
  const flags={sourceGap:false,authorityExhausted:false,metadataOverflow:false,counterOverflow:false};
  const rows=[];
  let phase=source()==='accredited'?'ACTIVE':'INACTIVE';
  const sessionLease={active:true},costs=costStats(()=>{flags.counterOverflow=true;phase='STOPPED';sessionLease.active=false;gap();});let tickets=new WeakMap();
  let observedClock=null;
  function readClock(){try{const t=clock();if(!Number.isFinite(t)||t<0||(observedClock!==null&&t<observedClock))throw new RangeError('untrusted-clock');observedClock=t;return t;}catch(e){gap();phase='STOPPED';sessionLease.active=false;throw e;}}
  let setupStart;try{setupStart=readClock();}catch(_){}
  let ledger=phase==='ACTIVE'?createP14BLedgerV1({documentLocalId,sourceClock:'page-monotonic-ms',coverage:{...FALSE_COVERAGE},candidates:[{family:'B0'}],
    limits:{opportunities:limits.opportunities,snapshots:limits.qa0Entries,summaryBytes:limits.summaryBytes,
      aggregateBytes:limits.qa0AggregateBytes,snapshotBytes:limits.qa0RingBytes,totalBytes:limits.summaryBytes+limits.qa0AggregateBytes+limits.qa0RingBytes}}):null;
  function gap(){flags.sourceGap=true;}
  function count(k){const next=advanceCounter(counters[k]);counters[k]=next.value;if(next.overflow){flags.counterOverflow=true;phase='STOPPED';sessionLease.active=false;gap();}}
  function charge(value){const n=P.bytes(value);if(charged+n>budgetBytes){exhausted=true;flags.authorityExhausted=true;phase='STOPPED';sessionLease.active=false;gap();throw new RangeError('native-authority-budget');}charged+=n;}
  function alias(value){if(!object(value))return null;if(!aliases.has(value)){const id=`a${++aliasSequence}`;charge(id);aliases.set(value,id);}return aliases.get(value);}
  // Logical authority representation is a scalar tuple, not a claim about V8 heap.
  function lease(){const cell={active:false};charge([false]);cell.active=true;return cell;}
  function retire(c){if(c?.lease)c.lease.active=false;}
  function stats(){return {authority:'private-native-browser-object-v1',logicalChargedBytes:charged,budgetBytes,exhausted,sourceComplete:false};}
  function metadata(){return {schema:'qa1b-browser-metadata-v1',proof,documentLocalId,sourceComplete:false,closed,phase,lastTime,sequence,counters,flags,rows,authority:stats(),
    localAccreditation:'private-object-membership',sourceAttestation:source(),evidenceKind:context.evidenceKind??'UNBOUND-BROWSER',realChromeMetrics:'NOT-MEASURED'};}
  function reservation(){return P.bytes(JSON.parse(JSON.stringify(metadata(),(k,v)=>k==='lastTime'?Number.MAX_VALUE:
    v===null||typeof v==='number'?Number.MAX_SAFE_INTEGER:typeof v==='boolean'?false:v)))+budgetBytes+costs.reservedBytes;}
  if(reservation()>limits.metadataBytes)throw new RangeError('native-metadata-preflight');
  if(costs.reservedBytes>2048)throw new RangeError('cost-metadata-preflight');
  if(P.bytes({...metadata(),rows:[]})>2048)throw new RangeError('header-metadata-preflight');
  function retain(packet,receipt) {
    const entry={packet,receipt:P.freeze(P.clone(receipt)),retained:true},size=P.bytes(entry);
    if(size+2>limits.packetRingBytes||!limits.packetEntries){count('dropped');if(size+2>limits.packetRingBytes)count('oversized');return;}
    ringBytes+=size+(ring.length?1:0);ring.push(entry);
    while(ring.length>limits.packetEntries||ringBytes>limits.packetRingBytes){const n=ring.length,old=ring.shift();ringBytes-=P.bytes(old)+(n>1?1:0);count('dropped');}
  }
  function full(i){return i && ['documentLocalId','navigationLocalId','slotLocalId','anchorLocalId'].every(k=>typeof i[k]==='string')
    &&integer(i.cycleId,1)!==null&&integer(i.fetchGeneration,1)!==null&&integer(i.renderToken)!==null&&i.renderToken===i.activeRenderToken;}
  function ingest(packet) {
    count('received');
    // Object provenance is checked before inspecting untrusted input, dedup or time.
    const stamp=object(packet)?issued.get(packet):null,sourceStatus=source();
    const gate=decision(stamp?'valid':'invalid',sourceStatus,stamp?.lease.active&&(!stamp.owner||stamp.owner.active)&&(!stamp.entry||stamp.entry.active)&&sessionLease.active?'valid':'revoked',phase);
    if(gate!=='admit'||exhausted||closed){count('rejected');gap();if(phase==='ACTIVE'){phase='STOPPED';sessionLease.active=false;}return {accepted:false,acceptanceA:'not-admitted',candidateB0:'unknown',reason:gate==='admit'?'closed-or-exhausted':gate,
      localAccreditation:stamp?'owned-object':'unaccredited',sourceAttestation:sourceStatus,opportunityId:null,duplicate:false};}
    const old=ring.find(e=>e.packet.sampleSequence===packet.sampleSequence);
    if(old&&old.packet===packet){count('duplicates');return {...P.clone(old.receipt),duplicate:true};}
    if(packet.sampleSequence<=sequence){
      count('rejected');gap();return {accepted:false,reason:'retired-sequence',duplicate:false};
    }
    if(packet.sampleSequence!==sequence+1)gap();
    const primary=PRIMARY.includes(packet.caller)&&!['display','none'].includes(packet.facts.observedInitialWinner)
      &&packet.stage==='before-player'&&packet.format==='video'&&packet.guard.executed
      &&typeof packet.guard.eligible==='boolean'&&packet.ownership.verified&&full(packet.identity);
    const key=[packet.identity.navigationLocalId,packet.identity.slotLocalId,packet.identity.cycleId];
    const prior=rows.find(r=>key.every((v,i)=>r[i]===v));
    let result=null,reason='raw-series',validA=false;
    const badClock=!Number.isFinite(packet.time.monotonicMs)||packet.time.monotonicMs<0||(lastTime!==null&&packet.time.monotonicMs<lastTime);
    if(!badClock&&full(packet.identity)&&packet.ownership.verified){sequence=packet.sampleSequence;lastTime=packet.time.monotonicMs;}
    if(badClock){reason='unknown-or-regressed-clock';gap();phase='STOPPED';sessionLease.active=false;}
    else {
      if(!full(packet.identity)||!packet.ownership.verified){reason='native-identity-unknown';gap();}
      else if(packet.kind==='gap'){reason='native-boundary-gap';gap();}
      else if(primary||['fetch','winner','handoff','terminal'].includes(packet.kind)) {
        const proposed=prior?rows:[...rows,[...key,false]];
        if(P.bytes(proposed)>4096){flags.metadataOverflow=true;phase='STOPPED';sessionLease.active=false;gap();return {accepted:false,reason:'correlation-memory',acceptanceA:'not-admitted',candidateB0:'unknown'};}
        const facts={};
        if(packet.kind==='fetch')facts.fetchObserved=true;
        if(packet.kind==='winner')facts.initialWinner=packet.facts.initialWinner;
        if(packet.kind==='terminal')facts.terminal='abandoned';
        const sample={schemaVersion:'p14b-shadow-sample-v1',contractRevision:'r2',source:{consistent:true},identity:P.clone(packet.identity),
          scope:primary?'video':'opportunity',stage:packet.stage,sourceClock:'page-monotonic-ms',monotonicMs:packet.time.monotonicMs,
          sampleSequence:packet.sampleSequence,provenance:{distribution:proof.distribution,coreSha256:proof.coreSha256,
            cssModelVersion:'native-guard-unmeasured',configVersion:'browser-B0-no-P-v1'},
          control:{observed:primary,reliable:primary,eligible:primary?packet.guard.eligible:null},plannedRegions:[],
          coverage:{leftCensored:primary&&packet.guard.eligible===true&&prior?.[3]!==true}};
        result=ledger.ingest(sample,facts);reason=result.reason;validA=primary&&result.accepted;
        if(result.accepted){if(prior)prior[3]||=primary;else if(rows.length<limits.opportunities){rows.push([...key,primary]);
            if(reservation()>limits.metadataBytes){rows.pop();flags.metadataOverflow=true;gap();ledger.close({endTimeMs:lastTime});closed=true;phase='STOPPED';sessionLease.active=false;}}}
        else {gap();phase='STOPPED';sessionLease.active=false;}
      } else if(PRIMARY.includes(packet.caller)){reason='primary-unqualified';gap('Dc');}
    }
    const receipt={schema:'qa1b-browser-receipt-v1',packetId:packet.eventId,sampleSequence:packet.sampleSequence,
      distribution:proof.distribution,documentLocalId,series:packet.series,accepted:result?.accepted===true,reason,
      sourceAttestation:sourceStatus,evidenceKind:context.evidenceKind??'UNBOUND-BROWSER',browserSourceAccredited:false,
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
    let time;try{time=readClock();}catch(_){time=null;}
    const next=advanceCounter(emittedSequence);if(next.overflow){flags.counterOverflow=true;phase='STOPPED';sessionLease.active=false;return gap();}emittedSequence=next.value;
    const packet=P.freeze({schemaVersion:'qa1b-native-browser-packet-v1',contractRevision:'r1-review-B',eventId:`e${next.value}`,sampleSequence:next.value,
      kind,caller,format:caller==='W1'?'display':primary?'video':'opportunity',stage,
      series:primarySeries?'primary-video-preplayer':caller==='W1'?'display':primary?'non-primary-video':'native-lifecycle',
      identity,ownership,time:{sourceClock:'page-monotonic-ms',monotonicMs:typeof time==='number'&&Number.isFinite(time)?time:null},
      provenance:{...proof,origin:'native-boundary',profile:'II-B1',localAccreditation:valid?'owned-current-object':'unknown',sourceAttestation:source(),evidenceKind:context.evidenceKind??'UNBOUND-BROWSER',
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
    if(closed||exhausted||phase!=='ACTIVE')return;
    if(source()!=='accredited'){phase='STOPPED';sessionLease.active=false;gap();return;}
    try {
      if(kind==='manager'){if(!object(a[0])||!trustedDocuments.has(a[1]))return gap();managers.add(a[0]);alias(a[0]);return;}
      if(kind==='root') {
        const [engine,doc,root]=a;if(!trustedDocuments.has(doc))return gap();
        let lineage=object(root)?roots.get(root):null;if(!lineage&&object(root)){lineage={epoch:0,lastIndex:null,lastEpoch:null};charge([0,null,null]);roots.set(root,lineage);}
        if(lineage){const next=advanceCounter(lineage.epoch);if(next.overflow){flags.counterOverflow=true;phase='STOPPED';sessionLease.active=false;return gap();}lineage.epoch=next.value;}
        const r={doc:documentLocalId,nav:alias(root),epoch:lineage?.epoch??null,lineage};charge([r.doc,r.nav,r.epoch]);engines.set(engine,r);return;
      }
      if(kind==='placements') {
        const [engine,list]=a,r=engines.get(engine);if(!r||!Array.isArray(list))return gap();
        for(let i=0;i<list.length;i++){const p=own(list,String(i));if(object(p)){charge([r.doc,r.nav]);placements.set(p,r);}}return;
      }
      if(kind==='node') {
        const [node,manager,placement,doc,navIndex]=a,r=placements.get(placement);if(!trustedDocuments.has(doc)||!managers.has(manager))return gap();
        retire(nodes.get(node));
        let nativeNavigation=integer(a[5]===null||a[5]===undefined?navIndex:own(a[5],'navIndex'));
        if(r?.lineage&&nativeNavigation!==null){const l=r.lineage;if(l.lastEpoch!==r.epoch){if(l.lastIndex!==null&&nativeNavigation<=l.lastIndex){nativeNavigation=null;gap();}else{l.lastIndex=nativeNavigation;l.lastEpoch=r.epoch;}}else if(nativeNavigation!==l.lastIndex){nativeNavigation=null;gap();}}
        else {nativeNavigation=null;gap();}
        const c={doc:r?.doc??documentLocalId,nav:r?.nav&&nativeNavigation!==null?`${r.nav}_n${nativeNavigation}`:null,slot:alias(node),anchor:null,cycle:null,generation:null,pendingGeneration:null,token:0,
          waterfall:null,attempt:null,winner:'unknown',player:false,lease:lease()};
        charge([c.doc,c.nav,c.slot,null,null,null,0,null,null,'unknown',false,false]);nodes.set(node,c);return;
      }
      const node=['waterfall','fetch-begin','fetch','winner','legacy-auction','cleanup','preparation','handoff','retire-entry','entry-start','prepared-creative'].includes(kind)?a[1]:a[0];
      const c=object(node)?nodes.get(node):null;if(!c)return gap();
      if(kind==='waterfall'){const r={slot:c.slot,generation:null,id:alias(a[0])};charge([r.slot,null,r.id]);waterfalls.set(a[0],r);return;}
      if(kind==='creative-created'){if(object(a[1]))bornCreatives.add(a[1]);return;}
      if(kind==='anchor'){c.anchor=alias(a[1]);return;}
      if(kind==='cycle'){retire(c);c.lease=lease();c.cycle=integer(a[1],1);c.generation=c.pendingGeneration;c.pendingGeneration=null;c.winner='unknown';c.anchor=null;return;}
      if(kind==='fetch-begin'){
        const known=waterfalls.get(a[0]);if(!known||known.slot!==c.slot)return gap();
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
      if(kind==='creative'){if(!bornCreatives.has(a[1]))return gap();return bindCreative(c,a[1],integer(a[2]));}
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
      if(kind==='wait-finished'){const t=object(a[1])?tickets.get(a[1]):null;if(t)t.active=false;return;}
      if(kind==='wait'||kind==='control'){
        const caller=kind==='wait'?WAIT[a[2]]??'unknown':a[1],creative=kind==='wait'?a[3]:a[2],result=kind==='wait'?a[4]:a[3];
        if(kind==='control'&&caller!=='C1'){gap();return;}
        if(kind==='wait'&&caller!=='W1'){
          const t=object(a[5])?tickets.get(a[5]):null;
          if(!t||!t.active||t.lease!==c.lease||t.slot!==c.slot||t.token!==a[1]||t.caller!==caller||t.owner!==alias(creative)){gap();return;}
        }
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
  function exportManual(){const qa=ledger?.exportManual()??null,meta=metadata();return P.clone({schema:'qa1b-browser-manual-export-v1',stage:'II-B1-S0-S1',acquisition:false,
    sourceComplete:false,physicalBudgetMeasured:false,sourceAttestation:source(),evidenceKind:context.evidenceKind??'UNBOUND-BROWSER',realChromeMetrics:'NOT-MEASURED',
    producerAuthority:'private-local-membership-and-source-root',qa0:qa,entries:ring,metadata:meta,cost:costs.read(),
    memory:{summaryBytes:qa?.memory.logicalSummaryBytes??0,qa0AggregateBytes:qa?.memory.logicalAggregateBytes??0,qa0RingBytes:qa?.memory.logicalSnapshotBytes??0,
      metadataBytes:P.bytes(meta)+charged+costs.logicalBytes(),packetRingBytes:ringBytes,detailEntries:(qa?.snapshots.length??0)+ring.length,limits}});}
  function timed(category,fn){let start;try{start=readClock();}catch(_){return category==='unused'?null:fn();}try{return fn();}finally{try{costs.add(category,readClock()-start);}catch(_){gap();}}}
  function serializeManual({maxBytes=limits.totalBytes}={}){return timed('export',()=>{if(!Number.isSafeInteger(maxBytes)||maxBytes<1||maxBytes>limits.totalBytes)throw new RangeError('invalid-export-limit');const json=JSON.stringify(exportManual()),bytes=byteLength(json);return bytes>maxBytes?{status:'export-too-large',bytes,json:null}:{status:'ok',bytes,json};});}
  function close(endTimeMs){if(closed)return {accepted:false,reason:'closed'};if(!Number.isFinite(endTimeMs)||endTimeMs<0||(lastTime!==null&&endTimeMs<lastTime))throw new RangeError('invalid-end-time');
    if(source()!=='accredited')return {accepted:false,reason:'source-not-accredited'};const r=ledger?.close({endTimeMs})??{accepted:false,reason:'inactive'};closed=true;return r;}
  function stop(){if(phase==='DISPOSED'||phase==='STOPPED')return;phase='STOPPED';sessionLease.active=false;let t;try{t=readClock();}catch(_){}if(source()==='accredited'&&Number.isFinite(t)&&t>=0&&(lastTime===null||t>=lastTime))close(t);else gap();}
  function dispose(){return timed('cleanup',()=>{stop();phase='DISPOSED';ring=[];ringBytes=2;rows.length=0;ledger=null;charged=0;
    roots=new WeakMap();aliases=new WeakMap();engines=new WeakMap();placements=new WeakMap();nodes=new WeakMap();waterfalls=new WeakMap();auctions=new WeakMap();
    creatives=new WeakMap();entries=new WeakMap();results=new WeakMap();issued=new WeakMap();tickets=new WeakMap();managers=new WeakSet();bornCreatives=new WeakSet();});}
  function ticket(node,caller,token,owner=null){return timed('unused',()=>{if(phase!=='ACTIVE'||source()!=='accredited')return null;const c=nodes.get(node);if(!c||!c.lease.active||c.token!==token||!['W2','W3','W4'].includes(caller))return null;
    if(caller!=='W2'&&!ownerFor(c,owner))return null;const v=Object.freeze(Object.create(null)),r={slot:c.slot,token,owner:alias(owner),caller,lease:c.lease,active:true};charge([r.slot,r.token,r.owner,r.caller,false]);tickets.set(v,r);return v;});}
  const rawEndpoint=endpoint;
  function measured(kind,...args){if(phase!=='ACTIVE')return;let t;try{t=readClock();const r=rawEndpoint(kind,...args);const end=readClock();costs.add(kind==='wait'?WAIT[args[2]]??'unused':kind==='control'?'C1':'unused',end-t);return r;}catch(_){gap();phase='STOPPED';sessionLease.active=false;}}
  const status=()=>({phase,sourceAttestation:source(),localAccreditation:'private-object-membership',evidenceKind:context.evidenceKind??'UNBOUND-BROWSER',
    documentLocalId,sequence,lastTime,counts:P.clone(counters),flags:P.clone(flags),sourceComplete:{...FALSE_COVERAGE},realChromeMetrics:'NOT-MEASURED'});
  if(setupStart!==undefined)try{costs.add('setup',readClock()-setupStart);}catch(_){}
  return Object.freeze({endpoint:measured,ticket,ingest,exportManual,serializeManual,close,stop,dispose,status,costs,stats,timed,latestPacket:()=>ring.at(-1)?.packet??null});
}
  const sessions=new WeakMap();
  function manager(managerObject,doc){if(!object(doc))return null;let s=sessions.get(doc);
    if(!s){s=createSession({document:doc,clock:context.clock,limits:context.limits});sessions.set(doc,s);publish(s);}
    if(!['INACTIVE','ACTIVE'].includes(s.status().phase))return null;
    s.endpoint('manager',managerObject,doc);
    return Object.freeze({tap:s.endpoint,ticket:s.ticket});
  }
  function publish(s){const host=context.host;if(!object(host))return;const name='__qa1bAdmin_'+profile.distribution.replace(/[^a-z0-9]/gi,'_');
    if(Object.getOwnPropertyDescriptor(host,name)){s.stop();return;}
    const stop=()=>s.timed('cleanup',s.stop);
    const admin=Object.freeze({status:()=>s.timed('unused',s.status),stop,exportManual:()=>{stop();return s.serializeManual();},dispose:()=>{s.dispose();const d=Object.getOwnPropertyDescriptor(host,name);if(d?.value===admin)delete host[name];}});
    Object.defineProperty(host,name,{value:admin,enumerable:false,writable:false,configurable:true});
  }
  return Object.freeze({manager,decision,costStats,advanceCounter,limits:LIMITS,inspect:doc=>sessions.get(doc)??null});
}
if (typeof module !== 'undefined') module.exports={createRuntime};
