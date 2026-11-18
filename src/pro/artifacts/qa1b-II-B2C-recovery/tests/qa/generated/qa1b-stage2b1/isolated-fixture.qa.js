'use strict';
// Synthetic class definitions only. No construction, ad bootstrap or browser activation.
Object.defineProperty(window,'__qa1bIsolatedClasses',{value:Object.freeze({GAM:(()=>{class IntextManager {
  #qa1b = null;
  static #qp(self){try{return self.#qa1b;}catch(_){return null;}}
  static #qt(self,...args){try{return self.#qa1b?.tap(...args);}catch(_){}}
  static #qv(self,kind,value,...args){IntextManager.#qt(self,kind,...args,value);return value;}
  static #qr(self,value,node,anchor){IntextManager.#qt(self,'result',node,anchor,value);return value;}
  static #qf(self,value,node,creative){IntextManager.#qt(self,'control',node,'C1',creative,value);return value;}
  static #ticket(self,node,caller,token,owner=null){try{return self.#qa1b?.ticket(node,caller,token,owner)??null;}catch(_){return null;}}
  /*QA1B_RUNTIME_BEGIN*/ static #qaRuntime = (()=>{try{return (function createRuntime(qa0, byteLength, context = {}) {
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
})((()=>{const defs={"intext-p14b-data.cjs":function(require,module,exports){
'use strict';
// QA0 data-only utilities. No browser acquisition, clocks, storage or commercial APIs.
const {Buffer}=require('node:buffer');
const SCHEMA='p14b-shadow-sample-v1', FORMULA='p14b-geometry-v1';
const MODELS=Object.freeze(['player-measured-current-flow','player-intent-current-flow-v1','slot-open-envelope-v1']);
const DISTRIBUTIONS=Object.freeze(['_gam_kv_.js','IntextManager.js']);
const STAGES=Object.freeze(['before-player','after-player','post-request','post-reveal']);
const CLOCKS=Object.freeze(['synthetic-monotonic-ms','page-monotonic-ms']);
function record(value){
  if(!value||typeof value!=='object'||Array.isArray(value))return false;
  try {const proto=Object.getPrototypeOf(value);return proto===Object.prototype||proto===null;}catch{return false;}
}
function own(value,key){
  if(!record(value)&&!Array.isArray(value))return undefined;
  try {const d=Object.getOwnPropertyDescriptor(value,key);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}
}
const at=(value,...keys)=>keys.reduce((v,k)=>own(v,k),value);
const finite=value=>typeof value==='number'&&Number.isFinite(value);
const integer=(value,min=0)=>Number.isSafeInteger(value)&&value>=min;
const localId=value=>typeof value==='string'&&/^[A-Za-z][A-Za-z0-9_-]{0,47}$/.test(value);
const hash=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value);
const numberOrNull=value=>finite(value)?value:null;
const oneOf=(value,values)=>values.includes(value)?value:null;
function items(value,max){
  if(!Array.isArray(value))return null;
  const length=own(value,'length');
  if(!integer(length)||length>max)return null;
  return Array.from({length},(_,i)=>own(value,String(i)));
}
function identity(value){
  if(!record(value))return null;
  const out={};
  for(const key of ['documentLocalId','navigationLocalId','slotLocalId','anchorLocalId']){
    if(!localId(own(value,key)))return null;out[key]=own(value,key);
  }
  for(const key of ['cycleId','fetchGeneration','renderToken','activeRenderToken']){
    if(!integer(own(value,key),key==='cycleId'||key==='fetchGeneration'?1:0))return null;out[key]=own(value,key);
  }
  if(own(value,'verified')!==true)return null;
  out.state=oneOf(own(value,'state'),['live','stale','terminal']);
  return out.state?out:null;
}
const opportunityKey=i=>JSON.stringify([i.documentLocalId,i.navigationLocalId,i.slotLocalId,i.cycleId]);
const bytes=value=>Buffer.byteLength(JSON.stringify(value),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value)); // Only our own whitelisted records, never raw samples.
function validRect(value){
  const r=Object.fromEntries(['left','top','width','height'].map(k=>[k,own(value,k)]));
  if(!Object.values(r).every(finite)||r.width<=0||r.height<=0)return null;
  if(!finite(r.left+r.width)||!finite(r.top+r.height)||!finite(r.width*r.height)||r.width*r.height<=0)return null;
  return r;
}
function validViewport(value){
  const width=own(value,'width'),height=own(value,'height');
  return finite(width)&&finite(height)&&width>0&&height>0&&finite(width*height)&&width*height>0?{width,height}:null;
}
function control(sample){
  return at(sample,'control','observed')===true&&at(sample,'control','reliable')===true&&typeof at(sample,'control','eligible')==='boolean'
    ?at(sample,'control','eligible'):null;
}
function baseStatus(sample){
  if(!record(sample)||own(sample,'schemaVersion')!==SCHEMA||own(sample,'contractRevision')!=='r2')return 'invalid-schema';
  if(at(sample,'source','consistent')!==true)return 'inconsistent-source';
  if(own(sample,'scope')==='display')return 'display-only';
  const i=identity(own(sample,'identity'));if(!i)return 'identity-unknown';
  if(['stale','terminal'].includes(i.state))return i.state==='stale'?'stale-identity':'terminal';
  if(i.renderToken!==i.activeRenderToken)return 'stale-identity';
  if(own(sample,'scope')!=='video')return 'scope-unknown';
  return null;
}
module.exports={SCHEMA,FORMULA,MODELS,DISTRIBUTIONS,STAGES,CLOCKS,record,own,at,finite,integer,localId,hash,numberOrNull,oneOf,items,identity,opportunityKey,bytes,clone,validRect,validViewport,control,baseStatus};

},
"intext-p14b-shadow-evaluator.cjs":function(require,module,exports){
'use strict';
// Isolated QA0 evaluator. Never imports or calls the core, DOM, SDK, clocks or I/O.
const D=require('./intext-p14b-data.cjs');
const {own,at,finite,integer,localId,hash,items}=D;
const CORES=Object.freeze({
  '_gam_kv_.js':'1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690',
  'IntextManager.js':'ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8',
});

function geometryV1(rect,viewport){
  const r=D.validRect(rect),v=D.validViewport(viewport);if(!r||!v)return null;
  const right=r.left+r.width,bottom=r.top+r.height;
  const ix=Math.max(0,Math.min(right,v.width)-Math.max(r.left,0));
  const iy=Math.max(0,Math.min(bottom,v.height)-Math.max(r.top,0));
  const xFraction=Math.min(1,ix/r.width),yFraction=Math.min(1,iy/r.height);
  return {formulaVersion:D.FORMULA,ix,iy,xFraction,yFraction,areaFraction:xFraction*yFraction,
    maxAreaFraction:(Math.min(r.width,v.width)/r.width)*(Math.min(r.height,v.height)/r.height),
    position:r.top>=v.height?'below':bottom<=0?'above':ix===0?'horizontal-out':'overlapping'};
}

// Numeric operands already resolved by a data source; no CSS parsing or DOM reads.
function validCurrentBox(operands){
  const b=own(operands,'currentBox'),keys=['paddingTopPx','paddingBottomPx','paddingLeftPx','paddingRightPx','borderTopPx','borderBottomPx','borderLeftPx','borderRightPx'];
  if(!keys.every(k=>finite(own(b,k))&&own(b,k)>=0))return false;
  const horizontal=own(b,'paddingLeftPx')+own(b,'paddingRightPx')+own(b,'borderLeftPx')+own(b,'borderRightPx');
  const vertical=own(b,'paddingTopPx')+own(b,'paddingBottomPx')+own(b,'borderTopPx')+own(b,'borderBottomPx');
  const width=own(b,'borderBoxWidthPx'),left=own(b,'borderBoxLeftPx'),top=own(b,'borderBoxTopPx');
  const agrees=(a,b)=>finite(a)&&finite(b)&&Math.abs(a-b)<=1e-7;
  return finite(horizontal)&&finite(vertical)&&finite(width)&&width>0&&width>horizontal
    &&agrees(width-horizontal,own(operands,'contentWidthPx'))
    &&agrees(left+own(b,'borderLeftPx')+own(b,'paddingLeftPx'),own(operands,'contentLeftPx'))
    &&agrees(top+own(b,'borderTopPx')+own(b,'paddingTopPx'),own(operands,'contentTopPx'));
}
function openEnvelopeHeightV1(operands){
  const override=own(operands,'lockedHeightOverride'),chrome=own(operands,'wrapperChromeHeight'),preset=own(operands,'targetHeightPx');
  if(override!==null&&(!finite(override)||override<0))return null;
  if(chrome!==undefined&&chrome!==null&&(!Number.isSafeInteger(chrome)||chrome<0))return null;
  if(own(operands,'currentBox')!==undefined&&!validCurrentBox(operands))return null;
  if(preset!==undefined&&preset!==null&&(!finite(preset)||preset<=0))return null;
  if(override!==null&&override>1){
    if(chrome!==null&&!Number.isSafeInteger(chrome))return null;
    const height=override+(chrome===null||chrome===0?15:chrome);
    return finite(height)&&height>0?height:null;
  }
  return preset===null?360:finite(preset)&&preset>0?preset:null;
}

// Checks data attestations and cross-record consistency. It does not assert that CSS
// really matched a live page; QA1 would have to obtain those facts under separate approval.
function qualifyModelV1(sample,model){
  const modelId=own(model,'modelId'),quality=own(model,'quality'),e=own(model,'evidence'),c=own(model,'context');
  const i=D.identity(own(sample,'identity')),v=own(sample,'viewport'),p=own(sample,'provenance');
  const measured=modelId==='player-measured-current-flow'&&quality==='measured';
  const estimated=['player-intent-current-flow-v1','slot-open-envelope-v1'].includes(modelId)&&quality==='qualified-estimate';
  const stage=own(sample,'stage'),operands=own(e,'operands'),rect=D.validRect(own(model,'rect'));
  const originResolved=measured||!!(rect&&own(operands,'contentLeftPx')===rect.left&&own(operands,'contentTopPx')===rect.top
    &&own(operands,'contentWidthPx')===rect.width);
  const heightResolved=measured||!!(rect&&(modelId==='slot-open-envelope-v1'
    ?openEnvelopeHeightV1(operands)===rect.height
    :finite(own(operands,'intendedPlayerHeightPx'))&&own(operands,'intendedPlayerHeightPx')===rect.height));
  const sameIdentity=!!i&&['documentLocalId','navigationLocalId','slotLocalId','anchorLocalId','cycleId','fetchGeneration','renderToken']
    .every(k=>own(c,k)===i[k]);
  const Q1=!!(sameIdentity&&own(e,'wrapperConnected')===true&&localId(own(e,'wrapperLocalId'))&&own(c,'stage')===stage&&D.STAGES.includes(stage));
  const Q2=!!(D.validRect(own(model,'rect'))&&D.validViewport(v)&&own(c,'coordinateSpace')==='layout-css-px'
    &&own(v,'coordinateSpace')==='layout-css-px'&&integer(own(sample,'sampleSequence'),1)
    &&D.CLOCKS.includes(own(sample,'sourceClock'))&&own(c,'sourceClock')===own(sample,'sourceClock')
    &&own(c,'sampleSequence')===own(sample,'sampleSequence')&&finite(own(sample,'monotonicMs'))&&own(sample,'monotonicMs')>=0
    &&localId(own(sample,'layoutRevision'))&&own(c,'layoutRevision')===own(sample,'layoutRevision')
    &&localId(own(v,'revision'))&&own(c,'viewportRevision')===own(v,'revision')&&own(e,'acquiredWithinRevision')===true
    &&originResolved&&(measured||(own(e,'contentBoxResolved')===true&&own(e,'currentPaddingBordersResolved')===true)));
  const Q3=!!(D.DISTRIBUTIONS.includes(own(p,'distribution'))&&hash(own(p,'coreSha256'))&&CORES[own(p,'distribution')]===own(p,'coreSha256')
    &&localId(own(p,'cssModelVersion'))&&localId(own(p,'configVersion'))
    &&['distribution','coreSha256','cssModelVersion','configVersion'].every(k=>own(e,k)===own(p,k))
    &&heightResolved&&(measured||validCurrentBox(operands))
    &&(measured||own(operands,'wrapperChromeHeight')===null||(integer(own(operands,'wrapperChromeHeight'))))
    &&own(e,'sourcesResolved')===true&&own(e,'units')==='css-px'
    &&(measured
      ?own(e,'originSource')==='player-rect'&&own(e,'heightSource')==='player-rect'&&own(e,'widthSource')==='player-rect'
      :own(e,'originSource')==='wrapper-content-box'&&own(e,'widthSource')==='wrapper-content-box'
        &&(modelId==='slot-open-envelope-v1'?own(e,'heightSource')==='open-operands':own(e,'heightSource')==='pinned-effective-style')));
  const Q4=!!(own(e,'supportedLayout')===true&&own(e,'externalStylesResolved')===true&&own(e,'intentionalClosureKnown')===true
    &&(measured?stage!=='before-player'&&own(e,'existingObject')==='player':true));
  const Q5=!!(own(model,'modelVersion')==='1'&&own(e,'provenanceComplete')===true&&own(e,'sourceConflict')===false
    &&own(c,'coordinateSpace')==='layout-css-px'&&own(e,'pipFloating')===false);
  const checks={Q1,Q2,Q3,Q4,Q5};
  const valid=(measured||estimated)&&Object.values(checks).every(Boolean);
  return {valid,quality:measured?'measured':estimated?'qualified-estimate':D.oneOf(quality,['partial','unknown'])||'unknown',
    checks,failedChecks:Object.keys(checks).filter(k=>!checks[k]),reason:valid?null:'model-quality-insufficient'};
}

function candidateV1(value){
  const family=own(value,'family');
  if(!['B0','B1','B2','B3','B4','B5'].includes(family)||(own(value,'formulaVersion')!==undefined&&own(value,'formulaVersion')!==D.FORMULA))return null;
  const rectModelId=D.MODELS.includes(own(value,'rectModelId'))?own(value,'rectModelId'):null;
  if(family==='B0')return {family,rectModelId:null,parameterSetId:'control-factual',formulaVersion:D.FORMULA};
  if(family==='B4'||family==='B5')return {family,rectModelId,parameterSetId:'temporal-deferred',formulaVersion:D.FORMULA};
  const p=own(value,'parameters'),areaFraction=own(p,'areaFraction'),xFraction=own(p,'xFraction'),yFraction=own(p,'yFraction');
  const parameters=family==='B2'?{areaFraction}:family==='B3'?{xFraction,yFraction}:{};
  const parametersValid=family==='B1'||(family==='B2'?[0.25,0.5,0.75].includes(areaFraction):[0.5,1].includes(xFraction)&&[0.25,0.5].includes(yFraction));
  return {family,rectModelId,parameters,parametersValid,parameterSetId:family==='B1'?'positive':family==='B2'&&parametersValid?`area-${areaFraction}`:
    family==='B3'&&parametersValid?`xy-${xFraction}-${yFraction}`:'invalid-parameters',formulaVersion:D.FORMULA};
}

function evaluateP14BShadowV1(sample,candidate){
  const spec=candidateV1(candidate),family=spec?.family||null;
  const result={candidateId:family,rectModelId:spec?.rectModelId??null,parameterSetId:spec?.parameterSetId??null,formulaVersion:D.FORMULA,
    evaluationStage:family==='B4'||family==='B5'?'temporal-deferred':'snapshot-B0-B3',status:'unknown',reasons:[],
    controlComparison:'unknown',stage:D.oneOf(own(sample,'stage'),D.STAGES)||'unknown',
    geometryQuality:family==='B0'?'not-required':'not-evaluated',movementQuality:family==='B0'?'not-required':'not-evaluated',
    areaFraction:null,xFraction:null,yFraction:null,maxAreaFraction:null,qualification:null};
  const c0=D.control(sample);
  const finish=(status,reason)=>({...result,status,reasons:reason?[reason]:[],controlComparison:status==='not-applicable'?'not-applicable':
    status==='unknown'||c0===null?'unknown':status==='pass'||c0===false?'agrees':'candidate-rejects-control'});
  if(!spec)return finish('unknown','invalid-candidate');
  const base=D.baseStatus(sample);
  if(base)return finish(['display-only','stale-identity','terminal'].includes(base)?'not-applicable':'unknown',base);
  // B0 must terminate here. Even a missing or accessor-backed P cannot affect it.
  if(family==='B0')return finish(c0===null?'unknown':c0?'pass':'fail',c0===null?'control-unobserved':c0?null:'control-ineligible');
  if(family==='B4'||family==='B5'){
    result.movementQuality='deferred';return finish('unknown','temporal-stage-deferred');
  }
  if(c0===null)return finish('unknown','control-unobserved');
  if(!c0)return finish('fail','control-ineligible');
  if(!spec.rectModelId||!spec.parametersValid)return finish('unknown','invalid-candidate');
  const models=items(own(sample,'plannedRegions'),D.MODELS.length);
  const matches=models?.filter(m=>own(m,'modelId')===spec.rectModelId)||[];
  if(matches.length!==1)return finish('unknown',matches.length?'ambiguous-planned-rect':'no-planned-rect');
  const model=matches[0];
  if(at(model,'evidence','pipFloating')===true)return finish('not-applicable','pip-geometry');
  const q=qualifyModelV1(sample,model);result.geometryQuality=q.quality;result.qualification=q;
  if(!q.valid)return finish('unknown','model-quality-insufficient');
  const g=geometryV1(own(model,'rect'),own(sample,'viewport'));
  Object.assign(result,{areaFraction:g.areaFraction,xFraction:g.xFraction,yFraction:g.yFraction,maxAreaFraction:g.maxAreaFraction});
  if(g.ix<=0||g.iy<=0)return finish('fail','outside-planned');
  if(family==='B1')return finish('pass');
  if(family==='B2')return finish(g.areaFraction>=spec.parameters.areaFraction?'pass':'fail',
    g.areaFraction>=spec.parameters.areaFraction?null:g.maxAreaFraction<spec.parameters.areaFraction?'threshold-unreachable-by-size':'below-fraction');
  return finish(g.xFraction>=spec.parameters.xFraction&&g.yFraction>=spec.parameters.yFraction?'pass':'fail',
    g.xFraction<spec.parameters.xFraction?'horizontal-fraction':g.yFraction<spec.parameters.yFraction?'below-fraction':null);
}
module.exports={SCHEMA:D.SCHEMA,FORMULA:D.FORMULA,MODELS:D.MODELS,CORES,geometryV1,openEnvelopeHeightV1,qualifyModelV1,candidateV1,evaluateP14BShadowV1};

},
"intext-p14b-shadow-ledger.cjs":function(require,module,exports){
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

}},cache=Object.create(null),shim=Object.freeze({Buffer:Object.freeze({byteLength:function utf8ByteLength(value, encoding = 'utf8') {
  if (typeof value !== 'string' || !['utf8', 'utf-8'].includes(encoding)) throw new TypeError('utf8-string-only');
  return new TextEncoder().encode(value).byteLength;
}})});
    const require=id=>{if(id==='node:buffer')return shim;const key=id.startsWith('./')?id.slice(2):id;
      if(!Object.hasOwn(defs,key))throw new TypeError('require-not-allowlisted');if(cache[key])return cache[key].exports;
      const module={exports:{}};cache[key]=module;defs[key](require,module,module.exports);return module.exports;};
    return require('intext-p14b-shadow-ledger.cjs');})(),function utf8ByteLength(value, encoding = 'utf8') {
  if (typeof value !== 'string' || !['utf8', 'utf-8'].includes(encoding)) throw new TypeError('utf8-string-only');
  return new TextEncoder().encode(value).byteLength;
},{profile:{"distribution":"_gam_kv_.js","coreSha256":"1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690","releaseInputId":"77f587db377412591450a191add07aff2e698524f87f491d9928987a66f7bd39"},clock:()=>performance.now(),randomId:()=>{const a=new Uint8Array(12);crypto.getRandomValues(a);return Array.from(a,v=>v.toString(16).padStart(2,'0')).join('');},host:typeof window==='undefined'?null:window,sourceAttestor:null,evidenceKind:'UNBOUND-BROWSER'});}catch(_){return null;}})(); /*QA1B_RUNTIME_END*/

  constructor(config, gexpInstance) {
    try { this.#qa1b = IntextManager.#qaRuntime?.manager(this, typeof document==='undefined'?null:document)??null; } catch (_) {}
    this.config = config;
    this.gexp = gexpInstance;
    this.nodes = [];
    this.siteContext = this.getSiteContext();
    this.siteConfig = this.resolveSiteConfig();
    this.baseSiteConfig = this.siteConfig ? JSON.parse(JSON.stringify(this.siteConfig)) : null;
    this.intextQaCookieOverride = this.readIntextQaCookieOverride();
    this._intextQaCookieApplied = false;
    this._intextQaInclusionForced = false;
    this._intextQaCookieExclusionsBypassed = false;
    this._intextQaCookieExclusionsBypassSource = null;
    this.intextRandomSnapshot = null;
    this._intextSyntheticEventKeys = new Set();
    this._intextOpportunityDecisionKeys = new Set();
    this._intextContentIdentityByNavIndex = new Map();
    this._intextTelemetrySampled = this.gexp?.statsG?.telp === true;
    this._activeIntextPipNode = null;
    Object.defineProperty(this, "_intextPageInstanceId", {
      value: this.createIntextTelemetryId("intext-page"),
      writable: false,
      configurable: false,
      enumerable: false,
    });
    this.adUnitPath = this.extractStaticAdUnitPath();
    this.detectedAdUnitPath = null;
    this.detectedNetworkId = null;
    this.configuredNetworkId = this.normalizeIntextNetworkId(
      this.siteConfig?.gam?.networkId ?? this.config?.networkId,
    );
    this.requestNetworkId = null;
    this.networkIdResolutionSource = "unresolved";
    this.networkId = this.resolveIntextRequestNetworkId();
    if (window.gexpIntextDebug) intextDebugCollector.attachManager(this);
    ensureBaseStyles();

    if (!this.siteConfig) return;

    logIntext(`[IntextManager] site_config_resolved`, {
      hasSiteConfig: Boolean(this.siteConfig),
      hasDomainFilter: Boolean(this.siteConfig?.domainFilter),
      domainFilterEnabled: this.siteConfig?.domainFilter?.enabled === true,
    });

    if (this.siteConfig?.domainFilter?.enabled) {
      const filter = this.siteConfig?.domainFilter;

      if (filter.allowedDomains !== "all") {
        let currentDomain = null;
        const dl = window[filter.dataLayerObj] || window.utag_data;
        logIntext(`[IntextManager] domain_filter_datalayer_resolved`, {
          dataLayerObj: filter.dataLayerObj,
          dataLayerProp: filter.dataLayerProp,
          hasDataLayer: Boolean(dl),
        });

        if (dl) {
          const dlData = Array.isArray(dl) ? dl[0] : dl;
          if (dlData && dlData[filter.dataLayerProp]) {
            currentDomain = dlData[filter.dataLayerProp];
            logIntext(`[IntextManager] domain_filter_current_domain_resolved`, {
              source: "dataLayer",
              currentDomain,
            });
          }
        }

        if (!currentDomain && window.location) {
          currentDomain = window.location.hostname;
          logIntext(`[IntextManager] domain_filter_current_domain_resolved`, {
            source: "window.location",
            currentDomain,
          });
        }

        if (
          !filter.allowedDomains.some(domain => currentDomain.includes(domain))
          && this.intextQaCookieOverride?.enabled !== true
        ) {
          logIntext(`🛑 [IntextManager] Ejecución bloqueada. Dominio '${currentDomain}' no permitido.`);
          return;
        }
        if (
          !filter.allowedDomains.some(domain => currentDomain.includes(domain))
          && this.intextQaCookieOverride?.enabled === true
        ) {
          this.markIntextQaCookieApplied();
          logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
            key: "domainFilter.allowedDomains",
            currentDomain,
          });
        }
      }
    }

    if (this.siteConfig?.debug === true) {
      window.gexpIntextDebug = true;
    }
    this.recordIntextRuntimeIdentity();

    if (!this.gexp.isEnabled()) {
      if (this.intextQaCookieOverride?.enabled === true) {
        this.markIntextQaCookieApplied();
        logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
          key: "gexp.isEnabled",
          originalValue: false,
        });
      } else {
        return;
      }
    }

    const allowedTypes = this.siteConfig.allowedContentTypes || [];
    if (allowedTypes.length > 0 && !allowedTypes.includes(this.siteContext.contentType)) {
      logIntext(`[IntextManager] Disabled for content type: ${this.siteContext.contentType}. Allowed: ${allowedTypes.join(', ')}`);
      return;
    }

    if (this.siteConfig?.exclusions?.disableAll === true) {
      if (this.isIntextQaExclusionsBypassEnabled()) {
        this.markIntextQaExclusionsBypassApplied("constructor-exclusions.disableAll");
      } else {
        logIntext(`[IntextManager] ❌ BLOCKED by exclusions.disableAll = true`);
        return;
      }
    }
    const launchIntextPositions = () => {
      googletag.cmd.push(async () => {
        if (this.resolveAdUnit() === false) return;
        this.siteContext.contentType = this.detectContentType();
        logIntext(`[IntextManager] Detected content type: "${this.siteContext.contentType}"`);

        this.siteConfig = this.resolveContentTypeProfile(this.siteConfig, this.siteContext.contentType);
        if (!this.isContentTypeAllowed(this.siteConfig, this.siteContext.contentType, "[IntextManager]")) {
          return;
        }
        const snapshot = this.requiresIntextNativeRandom()
          ? await this.waitForIntextRandomSnapshotReady()
          : this.captureIntextRandomSnapshot();
        if (!this.validateIntextRandomSnapshot(snapshot)) {
          this.recordIntextRuntimeIdentity();
          this.registerIntextManagerDecision({
            navIndex: 0,
            scope: "initial",
            decision: "blocked",
            reason: "random-snapshot-unresolved",
          });
          this.registerIntextDiagnosticEvent({
            diagnosticKey: "random-snapshot-unresolved",
            "gexp-intext-decision": "blocked",
            "gexp-intext-decision-reason": "random-snapshot-unresolved",
          });
          return;
        }
        this.recordIntextRuntimeIdentity();
        if (await this.isBlockedByExclusionsAfterTargetingReady()) {
          return;
        }

        if (!this.isAllowedByInclusions()) {
          return;
        }

        if (this.shouldBlockIntextByFallbackBlankControl()) {
          logIntext(`[IntextManager] intext_blocked_by_fallback_blank_cookie`);
          this.registerIntextManagerDecision({
            navIndex: 0,
            scope: "initial",
            decision: "blocked",
            reason: "fallback-blank-cookie",
          });
          return;
        }

        const placement = this.createIntextPositions();
        this.registerIntextManagerDecision({
          navIndex: 0,
          scope: "initial",
          decision: "allowed",
          reason: "passed",
          placement,
        });

        const infiniteScrollTypes = ["noticia", "noticia-especial"];
        if (this.siteConfig?.infiniteScroll?.enabled && infiniteScrollTypes.includes(this.siteContext.contentType)) {
          this.startNavContinuaObserver();
        }
      }, true);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", launchIntextPositions);
    } else {
      launchIntextPositions();
    }
  }
  createIntextPositions() {
    try {
      const engine = new IntextPlacementEngine(
        this.siteConfig.dom,
        this.siteConfig.rules,
        null, IntextManager.#qp(this)
      );
      const placements = engine.findPlacements();
      const slotsConfig = this.siteConfig.slots;
      const maxSlots = slotsConfig?.maxSlots ?? Infinity;
      let slotsCreated = 0;

      if (!placements.length) return { result: "no-valid-placement", found: 0, created: 0 };
      if (Number(maxSlots) === 0) return { result: "max-slots-zero", found: placements.length, created: 0 };
      if (slotsConfig?.enabled === false) return { result: "all-slots-disabled", found: placements.length, created: 0 };

      placements.forEach((placement, index) => {
        if (slotsCreated >= maxSlots) {
          logIntext(
            `[IntextManager] Slot ${index}: SKIPPED — maxSlots limit reached (${maxSlots})`,
          );
          return;
        }

        if (slotsConfig) {
          if (!slotsConfig.enabled) {
            logIntext(
              `[IntextManager] Slots disabled globally — skipping all`,
            );
            return;
          }
          if (
            slotsConfig.enabledSlots &&
            !slotsConfig.enabledSlots.includes(index)
          ) {
            logIntext(
              `[IntextManager] Slot ${index}: DISABLED (not in enabledSlots: [${slotsConfig.enabledSlots}])`,
            );
            return;
          }
        }

        if (this.isSlotDisabledByExclusion(index)) {
          logIntext(
            `[IntextManager] Slot ${index}: DISABLED by exclusions.disableSlots`,
          );
          return;
        }

        const displayWrapper = this.createWrapperNode(index, "display");
        if (document.getElementById(displayWrapper.id)) {
          logIntext(`[IntextManager] duplicate_intext_wrapper_creation_blocked`, {
            slotCode: displayWrapper.id,
            nodeId: displayWrapper.dataset.gexpIntextNodeId,
            placementIndex: index,
            source: "createIntextPositions",
          });
          return;
        }
        placement.paragraph.parentNode.insertBefore(
          displayWrapper,
          placement.paragraph.nextSibling,
        );
        const displayContainer = new IntextContainer(
          displayWrapper,
          this.siteConfig.style,
        );

        const videoWrapper = this.createWrapperNode(index, "video");
        displayWrapper.parentNode.insertBefore(
          videoWrapper,
          displayWrapper.nextSibling,
        );
        const videoContainer = new IntextContainer(
          videoWrapper,
          this.siteConfig.style,
        );

        let nodeConfig = this.siteConfig;
        const slotOverrides = this.getSlotOverridesForNode(index, displayWrapper.id, this.siteConfig);
        if (slotOverrides) {
          nodeConfig = JSON.parse(JSON.stringify(this.siteConfig)); // deep clone
          // Deep merge each section
          for (const section of Object.keys(slotOverrides)) {
            if (
              typeof slotOverrides[section] === "object" &&
              slotOverrides[section] !== null &&
              !Array.isArray(slotOverrides[section])
            ) {
              nodeConfig[section] = IntextManager.deepMerge(nodeConfig[section] || {}, slotOverrides[section]);
            } else {
              nodeConfig[section] = slotOverrides[section];
            }
          }
          logIntext(
            `[IntextManager] Slot ${index}: applied overrides`,
            slotOverrides,
          );
        }

        logIntext(
          `[IntextManager] Slot ${index}: ENABLED (mode: ${nodeConfig.decision?.mode || "auto"}, threshold: ${nodeConfig.lazyLoad?.threshold || "default"}, maxCycles: ${nodeConfig.refresh?.maxCycles || "default"})`,
        );

        const node = new IntextNode({
          id: displayWrapper.id,
          videoId: videoWrapper.id,
          container: displayContainer,
          videoContainer: videoContainer,
          config: nodeConfig,
          manager: this,
          placement,
          slotIndex: index,
        }, IntextManager.#qp(this));
        displayContainer.ownerNode = node;
        videoContainer.ownerNode = node;
        this.nodes.push(node);
        slotsCreated++;
      });
      this.nodes.forEach((n) => n.initialize());
      return {
        result: slotsCreated > 0 ? "created" : "all-slots-disabled",
        found: placements.length,
        created: slotsCreated,
      };
    } catch (err) {
      this.registerIntextDiagnosticEvent({
        diagnosticKey: "create-intext-positions-failed",
        "gexp-intext-diagnostic-context": String(err?.message || err),
      });
      errorIntext("[IntextManager] Failed to create positions", err);
      return { result: "creation-error", found: 0, created: 0 };
    }
  }
  createIntextPositionsScoped(rootElement, scopedConfig, pncSuffix, navIndex, scopedContext = null) {
    try {
      const engine = new IntextPlacementEngine(
        scopedConfig.dom,
        scopedConfig.rules,
        rootElement, IntextManager.#qp(this)
      );
      const placements = engine.findPlacements();
      if (!placements.length) {
        logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: no valid placements found`);
        return { result: "no-valid-placement", found: 0, created: 0 };
      }

      const newNodes = [];
      const slotsConfigScoped = scopedConfig.slots;
      const maxSlotsScoped = slotsConfigScoped?.maxSlots ?? Infinity;
      let slotsCreatedScoped = 0;
      if (Number(maxSlotsScoped) === 0) return { result: "max-slots-zero", found: placements.length, created: 0 };
      if (slotsConfigScoped?.enabled === false) return { result: "all-slots-disabled", found: placements.length, created: 0 };

      placements.forEach((placement, index) => {
        if (slotsCreatedScoped >= maxSlotsScoped) {
          logIntext(`[IntextManager:NavContinua] navIndex=${navIndex} Slot ${index}: SKIPPED — maxSlots limit reached (${maxSlotsScoped})`);
          return;
        }
        const slotsConfig = scopedConfig.slots;
        if (slotsConfig) {
          if (!slotsConfig.enabled) return;
          if (slotsConfig.enabledSlots && !slotsConfig.enabledSlots.includes(index)) return;
        }

        if (this.isSlotDisabledByExclusion(index, scopedContext)) {
          logIntext(
            `[IntextManager:NavContinua] navIndex=${navIndex} Slot ${index}: DISABLED by scoped exclusions.disableSlots`,
          );
          return;
        }

        const displayWrapper = this.createWrapperNode(index, "display", pncSuffix);
        if (document.getElementById(displayWrapper.id)) {
          logIntext(`[IntextManager:NavContinua] duplicate_intext_wrapper_creation_blocked`, {
            slotCode: displayWrapper.id,
            nodeId: displayWrapper.dataset.gexpIntextNodeId,
            placementIndex: index,
            navIndex,
            source: "createIntextPositionsScoped",
          });
          return;
        }
        placement.paragraph.parentNode.insertBefore(
          displayWrapper,
          placement.paragraph.nextSibling
        );
        const displayContainer = new IntextContainer(
          displayWrapper,
          scopedConfig.style
        );

        const videoWrapper = this.createWrapperNode(index, "video", pncSuffix);
        displayWrapper.parentNode.insertBefore(
          videoWrapper,
          displayWrapper.nextSibling
        );
        const videoContainer = new IntextContainer(
          videoWrapper,
          scopedConfig.style
        );

        let nodeConfig = { ...scopedConfig };
        const slotOverrides = this.getSlotOverridesForNode(index, displayWrapper.id, scopedConfig);
        if (slotOverrides) {
          for (const section of Object.keys(slotOverrides)) {
            if (typeof slotOverrides[section] === 'object' && slotOverrides[section] !== null && !Array.isArray(slotOverrides[section])) {
              nodeConfig[section] = IntextManager.deepMerge(nodeConfig[section] || {}, slotOverrides[section]);
            } else {
              nodeConfig[section] = slotOverrides[section];
            }
          }
        }

        logIntext(
          `[IntextManager:NavContinua] navIndex=${navIndex} Slot ${index} (${displayWrapper.id}): ENABLED (mode: ${nodeConfig.decision?.mode || 'auto'})`
        );

        const nodeScopedContext = {
          ...(scopedContext || {}),
          navIndex,
        };
        if (scopedContext?.rootElement) {
          Object.defineProperty(nodeScopedContext, "rootElement", {
            value: scopedContext.rootElement,
            enumerable: false,
            configurable: false,
            writable: false,
          });
        }

        const node = new IntextNode({
          id: displayWrapper.id,
          videoId: videoWrapper.id,
          container: displayContainer,
          videoContainer: videoContainer,
          config: nodeConfig,
          manager: this,
          placement,
          slotIndex: index,
          navIndex: navIndex,
          scopedContext: nodeScopedContext,
        }, IntextManager.#qp(this));
        displayContainer.ownerNode = node;
        videoContainer.ownerNode = node;
        newNodes.push(node);
        this.nodes.push(node);
        slotsCreatedScoped++;
      });

      newNodes.forEach(n => n.initialize());
      this._navContinuaNodes.push({ navIndex, nodes: newNodes });
      logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: created ${newNodes.length} slot(s)`);
      return {
        result: slotsCreatedScoped > 0 ? "created" : "all-slots-disabled",
        found: placements.length,
        created: slotsCreatedScoped,
      };
    } catch (err) {
      errorIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: Failed to create positions`, err);
      return { result: "creation-error", found: 0, created: 0 };
    }
  }
  async onNewArticleDetected(mainElement, navIndex) {
    const scopedBaseConfig =
      this.baseSiteConfig ||
      this.siteConfig;
    const baseInfiniteScrollConfig =
      scopedBaseConfig?.infiniteScroll;
    if (!baseInfiniteScrollConfig) {
      return { handled: true, decision: "content-type-blocked", telemetryRegistered: false };
    }

    const scopedContext = this.resolveScopedAdContext(mainElement);
    const requestNetworkId = this.resolveIntextRequestNetworkId(scopedContext);
    if (!requestNetworkId) {
      return { handled: true, decision: "network-force-invalid", telemetryRegistered: false };
    }
    scopedContext.networkId = requestNetworkId;
    scopedContext.adUnitPath =
      this.resolveIntextDisplayAdUnitPath(scopedContext);
    const resolvedIdentity = await this.resolveScopedIntextNewsIdentity(mainElement, navIndex, scopedContext);
    const contentIdentity = this.captureIntextContentIdentity(navIndex, mainElement, scopedContext, resolvedIdentity);
    const contentType = scopedContext.contentType || this.detectContentType(mainElement);
    logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: content type = "${contentType}"`);

    let scrollConfig = IntextManager.deepMerge(
      { ...scopedBaseConfig },
      {},
    );
    const scopedNetworkOverride =
      this.getIntextNetworkOverride(requestNetworkId);
    if (scopedNetworkOverride) {
      scrollConfig = IntextManager.deepMerge(
        scrollConfig,
        scopedNetworkOverride,
      );
    }
    const ctProfile = scrollConfig?.contentTypes?.[contentType];
    if (ctProfile) {
      scrollConfig = IntextManager.deepMerge(scrollConfig, ctProfile);
    }
    const infiniteScrollOverrides =
      scrollConfig?.infiniteScroll?.overrides;
    if (infiniteScrollOverrides) {
      scrollConfig = IntextManager.deepMerge(
        scrollConfig,
        infiniteScrollOverrides,
      );
    }
    if (!this.isContentTypeAllowed(scrollConfig, contentType, "[IntextManager:NavContinua]")) {
      return { handled: true, decision: "content-type-blocked", telemetryRegistered: false };
    }

    const scopedRuleContext = {
      ...scopedContext,
      contentType,
      navIndex,
      be_page_newsID: contentIdentity.newsId,
      intextContentIdentity: contentIdentity,
      siteConfig: scrollConfig,
    };
    Object.defineProperty(scopedRuleContext, "rootElement", {
      value: scopedContext.rootElement,
      enumerable: false,
      configurable: false,
      writable: false,
    });

    if (await this.isBlockedByExclusionsAfterTargetingReady(scopedRuleContext)) {
      logIntext(
        `[IntextManager:NavContinua] navcontinua_exclusions_blocked - navIndex=${navIndex}, adUnitPath=${scopedRuleContext.adUnitPath || "missing"}`,
      );
      return { handled: true, decision: "excluded", telemetryRegistered: false };
    }

    if (!this.isAllowedByInclusions(scopedRuleContext)) {
      logIntext(`[IntextManager:NavContinua] navcontinua_inclusions_allowed - navIndex=${navIndex}, allowed=false`);
      return { handled: true, decision: "not-in-cohort", telemetryRegistered: false };
    }

    logIntext(`[IntextManager:NavContinua] navcontinua_inclusions_allowed - navIndex=${navIndex}, allowed=true`);

    if (this.shouldBlockIntextByFallbackBlankControl()) {
      const registered = this.registerIntextManagerDecision({
        navIndex,
        scope: "navcontinua",
        decision: "blocked",
        reason: "fallback-blank-cookie",
        contentType,
        rootElement: mainElement,
        scopedContext: scopedRuleContext,
      });
      logIntext(`[IntextManager:NavContinua] navcontinua_blocked_by_fallback_blank_cookie`, { navIndex });
      return { handled: true, decision: "blocked", telemetryRegistered: registered === true };
    }

    const pncSuffix = navIndex >= 1 ? `-pnc-${navIndex}` : '';
    const placement = this.createIntextPositionsScoped(mainElement, scrollConfig, pncSuffix, navIndex, scopedRuleContext);

    const telemetryRegistered = this.registerIntextManagerDecision({
      navIndex,
      scope: "navcontinua",
      decision: "allowed",
      reason: "passed",
      contentType,
      rootElement: mainElement,
      scopedContext: scopedRuleContext,
      placement,
    });
    return { handled: true, decision: "allowed", telemetryRegistered: telemetryRegistered === true };
  }
}
class IntextPlacementEngine {
  #qa1b = null;
  static #qp(self){try{return self.#qa1b;}catch(_){return null;}}
  static #qt(self,...args){try{return self.#qa1b?.tap(...args);}catch(_){}}
  static #qv(self,kind,value,...args){IntextPlacementEngine.#qt(self,kind,...args,value);return value;}
  static #qr(self,value,node,anchor){IntextPlacementEngine.#qt(self,'result',node,anchor,value);return value;}
  static #qf(self,value,node,creative){IntextPlacementEngine.#qt(self,'control',node,'C1',creative,value);return value;}
  static #ticket(self,node,caller,token,owner=null){try{return self.#qa1b?.ticket(node,caller,token,owner)??null;}catch(_){return null;}}
  

  constructor(domConfig = {}, rulesConfig = {}, rootElement = null, __qa1bPort = null) {
    try { this.#qa1b = __qa1bPort; } catch (_) {}
    this.domConfig = domConfig;
    this.rulesConfig = rulesConfig;
    const searchRoot = rootElement || document;
    const bodySelector = domConfig.articleBodySelector || '.ue-c-article__body';
    this.articleBody = searchRoot.querySelector(bodySelector);
    IntextPlacementEngine.#qt(this,'root', this, document, this.articleBody);

    groupIntext('%c[IntextPlacementEngine] 🔍 DOM Discovery', 'color:#9C27B0;font-weight:bold');
    if (this.articleBody) {
      logIntext(`✅ Article body found: "${bodySelector}"`, this.articleBody);
    } else {
      warnIntext(`❌ Article body NOT found: "${bodySelector}"`);
    }
    groupEndIntext();
  }
  findPlacements() {
    const paragraphSelector = this.domConfig.paragraphSelector || 'p';

    if (!this.articleBody) {
      warnIntext('[IntextPlacementEngine] ⛔ No article body — cannot find placements.');
      return [];
    }

    const rawElements = Array.from(this.articleBody.querySelectorAll(paragraphSelector));
    const paragraphs = rawElements.filter((p) => this.isValidParagraph(p));

    groupIntext(`%c[IntextPlacementEngine] 📋 Elements — selector: "${paragraphSelector}"`, 'color:#9C27B0;font-weight:bold');
    logIntext(`Total found:  ${rawElements.length}`);
    logIntext(`Valid (after filtering): ${paragraphs.length}`);
    if (rawElements.length !== paragraphs.length) {
      logIntext(`Filtered out: ${rawElements.length - paragraphs.length} (too short or inside blocker)`);
    }
    if (paragraphs.length > 0) {
      logIntext('First valid element:', paragraphs[0]);
      logIntext('Last valid element: ', paragraphs[paragraphs.length - 1]);
    }
    groupEndIntext();

    if (!paragraphs.length) {
      warnIntext('[IntextPlacementEngine] ⛔ No valid elements found after filtering.');
      return [];
    }

    let rules = this.rulesConfig.placements;
    if (!Array.isArray(rules)) {
      rules = [];
      if (this.rulesConfig.defaultPlacement) rules.push(this.rulesConfig.defaultPlacement);
      if (this.rulesConfig.allowMultiple && this.rulesConfig.fallbackPlacement) rules.push(this.rulesConfig.fallbackPlacement);
      if (this.rulesConfig.allowMultiple && this.rulesConfig.thirdPlacement) rules.push(this.rulesConfig.thirdPlacement);
    }

    groupIntext(`%c[IntextPlacementEngine] 📌 Evaluating ${rules.length} placement rule(s)`, 'color:#9C27B0;font-weight:bold');
    const placements = [];
    let lastIndex = -1;
    for (const rule of rules) {
      // For the first slot, always evaluate. For subsequent, only if allowMultiple.
      if (placements.length > 0 && this.rulesConfig.allowMultiple !== true) break;
      const ruleIdx = placements.length;
      const slotCode = ruleIdx === 0 ? "gexp-intext" : `gexp-intext-${ruleIdx + 1}`;
      const result = this.evaluatePlacement(paragraphs, rule, lastIndex, slotCode);
      if (result) {
        placements.push(result);
        lastIndex = result.paragraphIndex;
        const el = result.paragraph;
        const preview = (el.innerText || el.textContent || '').slice(0, 60).replace(/\n/g, ' ');
        logIntext(`✅ Slot ${ruleIdx}: after element[${result.paragraphIndex}] → "${preview}…"`, el);
      } else {
        logIntext(`❌ Slot ${ruleIdx}: rule [${rule}] — no valid position (lastIndex=${lastIndex}, total=${paragraphs.length})`);
      }
    }
    groupEndIntext();

    logIntext(`%c[IntextPlacementEngine] ✅ ${placements.length} placement(s) resolved`, 'color:#4CAF50;font-weight:bold');
    return IntextPlacementEngine.#qv(this,'placements', placements, this);
  }
}
class IntextNode {
  #qa1b = null;
  static #qp(self){try{return self.#qa1b;}catch(_){return null;}}
  static #qt(self,...args){try{return self.#qa1b?.tap(...args);}catch(_){}}
  static #qv(self,kind,value,...args){IntextNode.#qt(self,kind,...args,value);return value;}
  static #qr(self,value,node,anchor){IntextNode.#qt(self,'result',node,anchor,value);return value;}
  static #qf(self,value,node,creative){IntextNode.#qt(self,'control',node,'C1',creative,value);return value;}
  static #ticket(self,node,caller,token,owner=null){try{return self.#qa1b?.ticket(node,caller,token,owner)??null;}catch(_){return null;}}
  

  constructor({
    id,
    videoId,
    container,
    videoContainer,
    config,
    manager,
    placement,
    slotIndex = 0,
    navIndex = 0,
    scopedContext = null,
  }, __qa1bPort = null) {
    try { this.#qa1b = __qa1bPort; } catch (_) {}
    this.id = id;
    this.videoId = videoId;
    this.container = container;
    this.videoContainer = videoContainer;
    this.config = config;
    this.manager = manager;
    this.placement = placement;
    this.slotIndex = slotIndex;
    this.navIndex = navIndex;
    this.scopedContext = scopedContext;
    this.state = "idle";
    this.waterfall = null;
    this.activeCreative = null;
    this.wa = null;
    this.slot = null;
    this._slotGptApi = null;
    this._slotPubadsService = null;
    this._slotGptSource = null;
    this._initialDisplayRenderHandler = null;
    this._persistentDisplayRenderHandler = null;
    this._coordinator = null;
    this.lockedHeight = 0;
    this._videoTiming = null;
    this._intextTelemetryCycleId = 0;
    this._intextTelemetryCycle = null;
    this._pendingIntextTelemetry = {};
    this._intextViewportObserver = null;
    this._intextViewportObservedEl = null;
    this._intextViewportEnterAt = null;
    this._intextViewportVisibleMs = 0;
    this._intextTelemetryCommittedForCycle = false;
    this._intextTelemetryCommittedReasons = {};
    this._intextTelemetryFinalCommitted = false;
    this._lastImaAdDuration = null;
    this._house1x1AutoRefreshAttemptsForCycle = 0;
    this._house1x1AutoRefreshAttemptsPerSlot = 0;
    this._activeRenderToken = 0;
    this._renderTokenSeq = 0;
    this._renderInProgress = false;
    this._renderCompleted = false;
    this._displayRequestInFlight = false;
    this._lastVisualCycleId = 0;
    this._visualState = "idle";
    this._destroyedOrResetToken = 0;
    this._renderTimers = [];
    this._intextTransitionBridge = null;
    this._intextRealRenderTelemetryCommittedForToken = null;
    this._fallbackBlankControlCountedTokens = new Set();
    this._fallbackBlankControlCountedEvents = new Set();
    this._nodeActive = true;
    this._intextPipState = "inline";
    this._intextPipDismissedRenderToken = null;
    this._intextPipEnteredAt = null;
    this._intextPipVisibleMs = 0;
    this._intextPipEntryCount = 0;
    this._intextPipAnchorEverVisible = false;
    this._intextPipFirstFrameConfirmed = false;
    this._intextPipPlayerRevealed = false;
    this._intextPipCloseButton = null;
    this._intextPipCloseHandler = null;
    this._intextPipPlayerElement = null;
    this._intextPipOriginalInlineStyles = null;
    this._intextPipLastIntersectionRatio = null;
    this._intextPipLastExitPlayedPct = null;
    this._intextPipPlaybackActive = false;
    this._intextPipPlaybackSource = "unresolved";
    IntextNode.#qt(this,'node', this, manager, placement, document, navIndex, scopedContext);
    this._initialOpenAnimationPlayed = false;
    if (window.gexpIntextDebug) {
      intextDebugCollector.attachManager(this.manager);
      intextDebugCollector.recordTimeline("created", { node: this, slotId: this.id });
    }
  }
  initialize() {
    this.wa = new WindowArray(
      this.id,
      this.manager.gexp.cfg,
      this.manager.gexp,
    );

    if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
      const wrapExistingCallback = (methodName, metric, details = () => ({})) => {
        const original = this.wa?.[methodName];
        if (typeof original !== "function") return;
        this.wa[methodName] = (...args) => {
          const result = original.apply(this.wa, args);
          intextDebugCollector.recordMetric(metric, {
            node: this,
            element: this.container?.getElement?.(),
            ...details(...args),
          });
          return result;
        };
      };
      wrapExistingCallback("onRequested", "display_slot_requested", () => ({ source: "window-array" }));
      wrapExistingCallback("response", "display_slot_response_received", (event = {}) => {
        const responseInfo = event?.slot?.getResponseInformation?.() || {};
        return {
          source: "window-array",
          lineItemId: responseInfo.lineItemId,
          creativeId: responseInfo.creativeId,
          campaignId: responseInfo.campaignId,
          advertiserId: responseInfo.advertiserId,
        };
      });
      wrapExistingCallback("onLoaded", "display_onload", () => ({ source: "window-array" }));
      wrapExistingCallback("onViewable", "display_impression_viewable", () => ({
        source: "window-array",
        impressionViewable: true,
        inViewPercentage: this.wa?.cI?.adMaxViewability ?? null,
        maxInViewPercentage: this.wa?.cI?.adMaxViewability ?? null,
      }));
      wrapExistingCallback("onSlotVisibilityChanged", "display_visibility_changed", (inViewPercentage) => ({
        source: "window-array",
        inViewPercentage,
        maxInViewPercentage: this.wa?.cI?.adMaxViewability ?? inViewPercentage,
      }));
    }

    // Block native GEXP core from auto-refreshing Intext slots.
    // Native refresh bypasses our waterfall, corrupts randoms, ignores video state, and injects empty HBs.
    this.wa.refreshSlot = () => {
      logIntext(`[Intext:Display:${this.id}] Blocked native GEXP refresh. Intext manages its own refresh lifecycle.`);
    };

    this.manager.gexp.windows[this.id] = this.wa;

    this.waterfall = new IntextWaterfall({
      node: this,
      container: this.container,
      config: this.config,
      gexp: this.manager.gexp,
      wa: this.wa,
    }, IntextNode.#qp(this));

    this.waterfall.init();
  }
  getIntextTelemetryElement() {
    try {
      if (this.telemetryAnchor) return IntextNode.#qv(this,'anchor', this.telemetryAnchor, this);
      if (this.placement?.paragraph) return IntextNode.#qv(this,'anchor', this.placement.paragraph, this);
      const displayEl = this.container?.getElement?.() || null;
      const videoEl = this.videoContainer?.getElement?.() || null;
      if (this.state === "video") return IntextNode.#qv(this,'anchor', videoEl || displayEl, this);
      return IntextNode.#qv(this,'anchor', displayEl || videoEl, this);
    } catch (e) {
      return IntextNode.#qv(this,'anchor', null, this);
    }
  }
  getReadinessViewportState() {
    const anchor = this.getIntextTelemetryElement();
    if (!anchor || anchor.isConnected === false) return IntextNode.#qr(this,{ eligible: false, reason: "anchor-missing", distancePx: null }, this, anchor);
    const rect = anchor.getBoundingClientRect?.();
    if (!rect) return IntextNode.#qr(this,{ eligible: false, reason: "geometry-unavailable", distancePx: null }, this, anchor);
    const height = window.innerHeight || document.documentElement?.clientHeight || 0;
    const width = window.innerWidth || document.documentElement?.clientWidth || 0;
    const bottom = Number.isFinite(rect.bottom) ? rect.bottom : rect.top + rect.height;
    const right = Number.isFinite(rect.right) ? rect.right : rect.left + rect.width;
    const hidden = document.hidden === true || document.visibilityState === "hidden";
    const sized = [rect.top, rect.left, rect.width, rect.height, bottom, right].every(Number.isFinite)
      && rect.width > 0 && rect.height > 0 && width > 0 && height > 0;
    let rendered = !anchor.getClientRects || anchor.getClientRects().length > 0;
    for (let el = anchor; rendered && el; el = el.parentElement) {
      const css = window.getComputedStyle?.(el);
      if (css && (css.display === "none" || /^(hidden|collapse)$/.test(css.visibility) || css.opacity === "0")) rendered = false;
    }
    const overlapX = sized ? Math.max(0, Math.min(right, width) - Math.max(rect.left, 0)) : 0;
    const overlapY = sized ? Math.max(0, Math.min(bottom, height) - Math.max(rect.top, 0)) : 0;
    const visible = sized && rendered && overlapX > 0 && overlapY > 0;
    const reason = hidden ? "document-hidden" : !sized ? "anchor-zero-or-invalid-size" : !rendered ? "anchor-not-rendered"
      : bottom <= 0 ? "passed" : rect.top >= height ? "below" : overlapX === 0 ? "outside-horizontal" : "visible";
    return IntextNode.#qr(this,{ eligible: !hidden && visible, reason, distancePx: Math.round(rect.top - height),
      intersectionRatio: sized && rendered ? (overlapX * overlapY) / (rect.width * rect.height) : 0 }, this, anchor);
  }
  waitForViewport(renderToken = this._activeRenderToken, source = "waitForViewport", owner = null, __qa1bTicket = null) {
    const startedAt = Date.now();
    const format = source.startsWith("showDisplay") ? "display" : "video";
    this.waterfall?.recordReadiness?.(`${format}_viewport_wait_started`, { source, renderToken, winnerFormat: format });
    return new Promise(resolve => {
      let observer = null, settled = false;
      const anchor = this.getIntextTelemetryElement();
      const finish = result => {
        if (settled) return;
        settled = true;
      IntextNode.#qt(this,'wait-finished',this,__qa1bTicket); observer?.disconnect();
        document.removeEventListener?.("visibilitychange", check);
        window.removeEventListener?.("scroll", check);
        window.removeEventListener?.("resize", check);
        this._viewportWaits?.delete(finish);
        this.waterfall?.recordReadiness?.(`${format}_viewport_wait_resolved`, { source, renderToken, winnerFormat: format, reason: result || "visible", durationMs: Date.now() - startedAt });
        resolve(result);
      };
      const check = () => {
        if (!this.isActiveRenderToken(renderToken, source)) return finish("stale");
        const state = this.getReadinessViewportState();
      IntextNode.#qt(this,'wait', this, renderToken, source, owner, state, __qa1bTicket);
        if (state.reason === "anchor-missing") return finish("stale");
        if (state.eligible) finish();
      };
      finish.owner = owner;
      (this._viewportWaits ||= new Set()).add(finish);
      document.addEventListener?.("visibilitychange", check);
      if (typeof IntersectionObserver !== "undefined" && anchor) {
        observer = new IntersectionObserver(check, { threshold: 0, rootMargin: "0px" });
        observer.observe(anchor);
      } else {
        window.addEventListener?.("scroll", check, { passive: true });
        window.addEventListener?.("resize", check);
      }
      check();
    });
  }
  startIntextTelemetryCycle(trigger, extra = {}) {
    this.teardownIntextViewportTelemetryObserver();
    this._intextTelemetryCycleId += 1;
    IntextNode.#qt(this,'cycle', this, this._intextTelemetryCycleId);
    if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
      this._intextDebugTimings = { cycleStartedAt: null, requestStartedAt: null, imaLoadedAt: null, startedAt: null, firstFrameAt: null, completedAt: null };
      intextDebugCollector.recordMetric("cycle_started", {
        node: this,
        trigger,
        pipEnabled: this.getIntextPipConfig().enabled === true,
      });
    }
    this._pendingIntextTelemetry = {};
    this._intextViewportEnterAt = null;
    this._intextViewportVisibleMs = 0;
    this._intextTelemetryCommittedForCycle = false;
    this._intextTelemetryCommittedReasons = {};
    this._intextTelemetryFinalCommitted = false;
    this._intextTelemetryFinalDeltaCommitted = false;
    this._house1x1AutoRefreshAttemptsForCycle = 0;
    this.clearIntextTelemetryCycleCI();

    const isRefresh = trigger === "refresh";
    const isFallback = trigger === "fallback";
    const contentIdentity = this.manager?.captureIntextContentIdentity?.(
      this.navIndex || 0,
      null,
      this.scopedContext || null,
    ) || {};
    const cycle = {
      "gexp-intext-telemetry-event-type": "slot-cycle",
      "gexp-intext-telemetry-sampled": this.manager?._intextTelemetrySampled === true ? "true" : "false",
      "gexp-intext-page-instance-id": String(this.manager?._intextPageInstanceId || "unresolved"),
      // Canonical correlation key for every Intext cycle, including the
      // explicit unknown-news fallback when no real news ID is available.
      "gexp-intext-content-id": String(contentIdentity.id || `unknown-news:${this.navIndex || 0}`),
      "gexp-intext-content-id-source": String(contentIdentity.source || "unresolved"),
      domain: String(this.manager?.getHostnameNormalized?.(this.manager?.siteContext?.site) || "unknown"),
      country: String(this.manager?.resolveIntextCountry?.() || "unknown"),
      contentType: String(this.scopedContext?.contentType || this.manager?.siteContext?.contentType || "unknown"),
      timestamp: String(Date.now()),
      "gexp-intext-cycle-id": String(this._intextTelemetryCycleId),
      "gexp-intext-position": String(this.id || "unknown"),
      "gexp-intext-load-trigger": String(trigger || "unknown"),
      "gexp-intext-is-refresh": isRefresh ? "true" : "false",
      "gexp-intext-refresh": isRefresh ? "true" : "false",
      "gexp-intext-is-fallback": isFallback ? "true" : "false",
      "gexp-intext-fallback": isFallback ? "true" : "false",
      "gexp-intext-refresh-blocked": "false",
      "gexp-intext-refresh-blocked-reason": "none",
      "gexp-intext-ever-in-viewport": "false",
      "gexp-intext-viewport-visible-ms": "0",
      ...this.manager?.getIntextNetworkTelemetry?.(this.scopedContext),
      "gexp-intext-pip-enabled": this.getIntextPipConfig().enabled === true ? "true" : "false",
      "gexp-intext-pip-effective-enabled": this.isIntextPipEffectiveEnabled() ? "true" : "false",
      "gexp-intext-pip-slot-enabled": this.isIntextPipSlotEnabled() ? "true" : "false",
      "gexp-intext-pip-targeting-allowed": "true",
      "gexp-intext-pip-targeting-reason": "allowed",
      "gexp-intext-pip-inclusion-site-matched": "false",
      "gexp-intext-pip-inclusion-keyvalue-matched": "false",
      "gexp-intext-pip-exclusion-site-matched": "false",
      "gexp-intext-pip-exclusion-keyvalue-matched": "false",
      "gexp-intext-pip-targeting-matched-key": "none",
      "gexp-intext-pip-targeting-matched-value": "none",
      "gexp-intext-pip-playback-source": String(this._intextPipPlaybackSource || "unresolved"),
      "gexp-intext-pip-video-playing": this._intextPipPlaybackActive ? "true" : "false",
      "gexp-intext-pip-entered": "false",
      "gexp-intext-pip-entry-count": "0",
      "gexp-intext-pip-visible-ms": "0",
      "gexp-intext-pip-dismissed": "false",
      "gexp-intext-pip-ended-while-active": "false",
      "gexp-intext-pip-last-exit-reason": "none",
      "gexp-intext-pip-entry-played-pct": "unknown",
      "gexp-intext-pip-exit-played-pct": "unknown",
      "gexp-intext-render-waited-for-fetch": "false",
      "gexp-intext-render-wait-for-fetch-ms": "0",
      "gexp-intext-pending-auction-used": "false",
      "gexp-intext-pending-auction-expired": "false",
      "gexp-intext-pending-auction-age-ms": "0",
      "gexp-intext-pending-auction-restarted": "false",
      "gexp-intext-render-token": String(this._activeRenderToken || 0),
      "gexp-intext-render-attempt": String(this._renderTokenSeq || 0),
      "gexp-intext-visual-state": String(this._visualState || "idle"),
      ...this.manager?.getIntextRandomTelemetry?.(),
    };
    if (contentIdentity.resolved === true && contentIdentity.newsId) {
      cycle.be_page_newsID = String(contentIdentity.newsId);
    }
    const initPageMs = this.getIntextInitPageMs();
    const startDistance = this.getIntextDistancePx();
    const maxDelayMs = this.config?.loading?.maxDelayMs;
    const hasTimer = typeof maxDelayMs === "number" && Number.isFinite(maxDelayMs) && maxDelayMs >= 0;
    const loadingExperiment = this.config?.loading?._experiment || {};
    const adjacencyMeta = this.placement?.adjacencyMeta || {};
    const qaCookieApplied = this.manager?._intextQaCookieApplied === true;
    const loadingExperimentValue = loadingExperiment.enabled ? "true" : "false";
    Object.assign(cycle, {
      "gexp-intext-root-margin": String(this.config?.loading?.renderRootMargin || this.config?.loading?.rootMargin || "200px 0px"),
      "gexp-intext-timer-delay-ms": hasTimer ? String(maxDelayMs) : "disabled",
      "gexp-intext-has-timer": hasTimer ? "true" : "false",
      "gexp-intext-loading-experiment": loadingExperimentValue,
      "gexp-intext-loading-experiment-enabled": loadingExperiment.enabled === true ? "true" : "false",
      "gexp-intext-loading-experiment-resolved": loadingExperiment.resolved === true ? "true" : "false",
      "gexp-intext-loading-experiment-name": String(loadingExperiment.experimentName || "none"),
      "gexp-intext-loading-variant": String(loadingExperiment.variant || "default"),
      "gexp-intext-loading-key": String(loadingExperiment.key || "random1"),
      "gexp-intext-loading-key-value": String(loadingExperiment.keyValue || ""),
      "gexp-intext-loading-key-source": String(loadingExperiment.keySource || "unresolved"),
      "gexp-intext-loading-lookup-slot": String(loadingExperiment.lookupSlot || this.id || "unknown"),
      "gexp-intext-loading-fallback-reason": String(loadingExperiment.fallbackReason || "none"),
      ...this.manager?.getIntextQaCookieTelemetry?.(qaCookieApplied),
      ...this.manager?.getFallbackBlankControlTelemetry?.(),
      "gexp-intext-fetch-root-margin": String(this.config?.loading?.fetchRootMargin || this.config?.loading?.renderRootMargin || this.config?.loading?.rootMargin || "200px 0px"),
      "gexp-intext-render-root-margin": String(this.config?.loading?.renderRootMargin || this.config?.loading?.rootMargin || "200px 0px"),
      "gexp-intext-max-delay-ms": hasTimer ? String(maxDelayMs) : "disabled",
      "gexp-intext-max-fetch-to-render-ms": String(this.config?.loading?.maxFetchToRenderMs ?? "disabled"),
      "gexp-intext-load-observer-target": String(this._intextLoadObserverTarget || "wrapper"),
      "gexp-intext-slot-id": String(this.id || "unknown"),
      "gexp-intext-slot-index": String(this.slotIndex ?? 0),
      "gexp-intext-nav-index": String(this.navIndex || 0),
      "gexp-intext-paragraph-index": this.placement?.paragraphIndex != null ? String(this.placement.paragraphIndex) : "unknown",
      "gexp-intext-paragraph-number": this.placement?.paragraphIndex != null ? String(this.placement.paragraphIndex + 1) : "unknown",
      "gexp-intext-placement-rule": this.placement?.placementRule ? JSON.stringify(this.placement.placementRule) : "unknown",
      "gexp-intext-valid-paragraphs-count": this.placement?.validParagraphsCount != null ? String(this.placement.validParagraphsCount) : "unknown",
      "gexp-intext-adjacency-enabled": adjacencyMeta.enabled === true ? "true" : "false",
      "gexp-intext-adjacency-triggered": adjacencyMeta.triggered === true ? "true" : "false",
      "gexp-intext-adjacency-original-paragraph": adjacencyMeta.originalParagraph != null ? String(adjacencyMeta.originalParagraph) : "unknown",
      "gexp-intext-adjacency-final-paragraph": adjacencyMeta.finalParagraph != null ? String(adjacencyMeta.finalParagraph) : "unknown",
      "gexp-intext-adjacency-shifted": adjacencyMeta.shifted === true ? "true" : "false",
      "gexp-intext-adjacency-shift-direction": String(adjacencyMeta.shiftDirection || "none"),
      "gexp-intext-adjacency-shift-distance": String(adjacencyMeta.shiftDistance ?? 0),
      "gexp-intext-adjacency-fallback-original": adjacencyMeta.fallbackOriginal === true ? "true" : "false",
      "gexp-intext-adjacency-min-final-paragraph-index": adjacencyMeta.minFinalParagraphIndex != null ? String(adjacencyMeta.minFinalParagraphIndex) : "none",
      "gexp-intext-adjacency-candidate-rejected-reason": String(adjacencyMeta.candidateRejectedReason || "none"),
      "gexp-intext-adjacency-reason": String(adjacencyMeta.reason || "not-triggered"),
      ...this.getIntextTelemetryElementMeta(),
    });
    if (initPageMs !== null) cycle["gexp-intext-init-page-ms"] = String(initPageMs);
    if (startDistance !== null) cycle["gexp-intext-load-start-distance-px"] = String(startDistance);
    if (trigger === "house-1x1-refresh") {
      cycle["gexp-intext-is-refresh"] = "false";
      cycle["gexp-intext-refresh"] = "false";
      cycle["gexp-intext-is-technical-refresh"] = "true";
      cycle["gexp-intext-technical-refresh-reason"] = "house-lineitem-sentinel";
    }

    this._intextTelemetryCycle = cycle;
    const playbackState = this.getIntextPipPlaybackState();
    this.mergeIntextTelemetry({
      "gexp-intext-pip-playback-source": playbackState.source,
      "gexp-intext-pip-video-playing": playbackState.playing ? "true" : "false",
    });
    this.resolveIntextPipTargetingEligibility();
    this.mergeIntextTelemetry(extra);
    this.setupIntextViewportTelemetryObserver();
    this.flushIntextTelemetryToCI();
  }
  beginVisualRender(source = "unknown", trigger = "unknown") {
    this.cancelViewportWaits?.("stale");
    if (source !== "render_started" || this.waterfall?._videoPreparation?.boundToken) this.waterfall?.cancelVideoPreparation?.("new-render-cycle");
    if (this.activeCreative && !this.activeCreative._destroyed) {
      this.activeCreative.abort?.();
      this.activeCreative.destroy?.();
    }
    if (Number(this._activeRenderToken) > 0) {
      this.cleanupIntextPip("stale-render-token");
    }
    this._renderTokenSeq += 1;
    this._activeRenderToken = this._renderTokenSeq;
    IntextNode.#qt(this,'token', this, this._activeRenderToken);
    this._renderInProgress = true;
    this._renderCompleted = false;
    this._displayRequestInFlight = false;
    this._lastVisualCycleId = this._intextTelemetryCycleId;
    this._visualState = source;
    this.resetIntextPipState(this._activeRenderToken);
    const pipEnabled =
      this.getIntextPipConfig?.().enabled === true;
    const pipSlotEnabled =
      this.isIntextPipSlotEnabled?.() === true;
    const pipEffectiveEnabled =
      this.isIntextPipEffectiveEnabled?.() === true;
    this.mergeIntextTelemetry({
      "gexp-intext-render-token": String(this._activeRenderToken),
      "gexp-intext-render-attempt": String(this._renderTokenSeq),
      "gexp-intext-visual-state": this._visualState,
      "gexp-intext-pip-enabled": pipEnabled ? "true" : "false",
      "gexp-intext-pip-effective-enabled": pipEffectiveEnabled ? "true" : "false",
      "gexp-intext-pip-slot-enabled": pipSlotEnabled ? "true" : "false",
    });
    if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
      intextDebugCollector.recordMetric("video_pip_config_effective", {
        node: this,
        source,
        trigger,
        pipEnabled,
        pipEffectiveEnabled,
        pipSlotEnabled,
      });
    }
    this.applyIntextWrapperDebugAttributes(this.container?.getElement?.(), {
      renderToken: this._activeRenderToken,
      visualState: this._visualState,
    });
    this.applyIntextWrapperDebugAttributes(this.videoContainer?.getElement?.(), {
      renderToken: this._activeRenderToken,
      visualState: this._visualState,
      slotCode: this.videoId || this.id,
    });
    if (source === "render_started") this.waterfall?.claimVideoPreparation?.(this._activeRenderToken);
    return this._activeRenderToken;
  }
  invalidateVisualCallbacks(source = "unknown") {
    this.cancelViewportWaits?.("stale");
    this.waterfall?.cancelVideoPreparation?.("callbacks-invalidated");
    this.cleanupIntextPip(source === "reset" ? "reset" : "stale-render-token");
    this._destroyedOrResetToken += 1;
    this._renderTokenSeq += 1;
    this._activeRenderToken = this._renderTokenSeq;
    IntextNode.#qt(this,'invalidate', this);
    this._renderInProgress = false;
    this._renderCompleted = false;
    this._displayRequestInFlight = false;
    this._visualState = source;
    this.clearRenderTimers();
    this.mergeIntextTelemetry({
      "gexp-intext-render-token": String(this._activeRenderToken),
      "gexp-intext-visual-state": this._visualState,
    });
    logIntext(`[Intext:Display:${this.id}] intext_node_reset_callbacks_invalidated`, {
      slotCode: this.id,
      activeToken: this._activeRenderToken,
      cycleId: this._intextTelemetryCycleId,
      visualState: this._visualState,
    });
  }
  async buildAndPlayVideo(gamVideoTagUrl, renderToken = this._activeRenderToken, trigger = "unknown") {
    if (!this.isActiveRenderToken(renderToken, "buildAndPlayVideo:start", trigger)) return false;
    if (!this.waterfall?._videoPreparation) this.waterfall?.setupVideoPreparation?.({ winner: "video" }, renderToken);
    let prepared = this.waterfall?.getPreparedVideo?.(renderToken);
    if (!prepared) {
      const eligibility = await this.waitForViewport(renderToken, "buildAndPlayVideo:capacity-or-legacy", null, IntextNode.#ticket(this,this,'W2',renderToken));
      if (eligibility === "stale" || !this.isActiveRenderToken(renderToken, "buildAndPlayVideo:before_prepare", trigger)) return false;
      prepared = this.waterfall?.getPreparedVideo?.(renderToken);
      if (!prepared) this.waterfall?.cancelVideoPreparation?.("activated-without-standby");
    }

    this.state = "video";
    this._visualState = "video";
    this.mergeIntextTelemetry({
      "gexp-intext-pip-effective-enabled": this.isIntextPipEffectiveEnabled() ? "true" : "false",
    });
    this.setupIntextViewportTelemetryObserver();
    if (this._videoTiming?.auctionStartAt && this._videoTiming?.requestWinnerVideoAt) {
      logIntext(
        `[Intext:Video:${this.videoId}] timing trigger=${this._videoTiming.trigger || "unknown"} auction_to_request_winner_video=${this._videoTiming.requestWinnerVideoAt - this._videoTiming.auctionStartAt}ms`,
      );
    }
    logIntext(
      `[Intext:Video:${this.videoId}] 🎬 VIDEO WON — building player`,
    );

    const containerEl = this.videoContainer.getElement();
    this.applyIntextWrapperDebugAttributes(containerEl, {
      renderToken,
      visualState: "video",
      slotCode: this.videoId || this.id,
    });
    containerEl.style.pointerEvents = "none";

    const creativeOpts = {
      container: this.videoContainer,
      node: this,
      config: this.config,
      onVideoEnded: () => this.onVideoEnded(renderToken),
      adTagUrl: gamVideoTagUrl,
      videoTiming: this._videoTiming,
    };

    const creative = prepared?.creative || new IntextVideoCreative(creativeOpts, IntextNode.#qp(this));
    creative.adTagUrl = gamVideoTagUrl;
    creative._renderToken = renderToken;
    creative._videoTiming = this._videoTiming;
    creative.onVideoEnded = creativeOpts.onVideoEnded;
    creative._preparationGuard = null;
    this.activeCreative = creative;
    IntextNode.#qt(this,'creative', this, creative, renderToken);

    try {
      await creative.prepare();
      const viewportState = await this.waitForViewport(renderToken, "buildAndPlayVideo:waitForViewport", creative, IntextNode.#ticket(this,this,'W3',renderToken,creative));
      if (viewportState === "stale" || !this.isActiveRenderToken(renderToken, "buildAndPlayVideo:afterViewport", trigger)) {
        creative.destroy();
        return false;
      }
      await creative.render();
      if (!this.isActiveRenderToken(renderToken, "buildAndPlayVideo:after_render", trigger)) {
        creative.destroy();
        return false;
      }

      logIntext(
        `[Intext:Video:${this.videoId}] ✅ Video ad is playing — revealing container`,
      );
      this.ensureSingleVisibleIntextSurface("video", renderToken, "buildAndPlayVideo_before_reveal");
      const vc = this.waterfall?.resolveIntextVideoConfig?.() || this.config?.video || {};
      const playerSize = Array.isArray(vc.playerSize) && vc.playerSize.length === 2 ? vc.playerSize : [640, 360];
      this.mergeIntextTelemetry({
        "gexp-intext-request-type": "video",
        "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
        "gexp-intext-creative-size": `${playerSize[0]}x${playerSize[1]}`,
      });
      this.flushIntextTelemetryToCI();
      this.commitIntextTelemetry("video-rendered");
      containerEl.style.pointerEvents = "auto";
      this.recordTelemetry("video_fill", { slotId: this.videoId });
      this.discardDisplay();
      this.completeVisualRender(renderToken, "video_completed");
    } catch (err) {
      if (!this.isActiveRenderToken(renderToken, "buildAndPlayVideo:catch", trigger)) return false;
      logIntext(
        `[Intext:Video:${this.videoId}] ❌ Video build/play failed: ${err.message || err}`,
      );
      logIntext(`[Intext:Video:${this.videoId}]    Full error:`, err);

      const loader = containerEl.querySelector(".gexp-intext-loader");
      if (loader) loader.style.display = "none";

      const videoErrorRawMessage = String(err?.message || err || "unknown");
      const videoErrorCode =
        videoErrorRawMessage === "video_ad_timeout" || videoErrorRawMessage === "contrib_ads_timeout"
          ? "timeout"
          : String(
            this._intextTelemetryCycle?.["gexp-intext-video-error-code"] ||
            this.wa?.cI?.["gexp-intext-video-error-code"] ||
            "unknown",
          );
      const videoErrorMessage = videoErrorCode === "timeout" ? "video_ad_timeout" : videoErrorRawMessage;
      this.cleanupIntextPip(videoErrorCode === "timeout" ? "video-timeout" : "video-error");
      creative.destroy();
      this.mergeIntextTelemetry({
        "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
        "gexp-intext-video-failed": "true",
        "gexp-intext-video-error-code": videoErrorCode,
        "gexp-intext-video-error-message": videoErrorMessage,
      });
      this.flushIntextTelemetryToCI({ register: true, reason: "video-error" });
      this.recordTelemetry("video_no_fill", { slotId: this.videoId });
      containerEl.style.pointerEvents = "";
      this.teardownIntextViewportTelemetryObserver();
      this.flushIntextTelemetryToCI();
      this.videoContainer.close({ destroy: true });
      return false;
    }
    return true;
  }
}
class IntextWaterfall {
  #qa1b = null;
  static #qp(self){try{return self.#qa1b;}catch(_){return null;}}
  static #qt(self,...args){try{return self.#qa1b?.tap(...args);}catch(_){}}
  static #qv(self,kind,value,...args){IntextWaterfall.#qt(self,kind,...args,value);return value;}
  static #qr(self,value,node,anchor){IntextWaterfall.#qt(self,'result',node,anchor,value);return value;}
  static #qf(self,value,node,creative){IntextWaterfall.#qt(self,'control',node,'C1',creative,value);return value;}
  static #ticket(self,node,caller,token,owner=null){try{return self.#qa1b?.ticket(node,caller,token,owner)??null;}catch(_){return null;}}
  

  constructor({ node, container, config, gexp, wa }, __qa1bPort = null) {
    try { this.#qa1b = __qa1bPort; } catch (_) {}
    this.node = node;
    this.container = container;
    this.config = config;
    this.gexp = gexp;
    this.wa = wa;
    this.prebidStarted = false;
    this.fetchStarted = false;
    this.fetchComplete = false;
    this.renderStarted = false;
    this.timer = null;
    this.fetchObserver = null;
    this.renderObserver = null;
    this.pendingAuction = null;
    this.loadingConfig = null;
    this._lastFetchExpiredBeforeRestart = false;
    this._lastFetchExpiredAgeMs = null;
    this._lastFetchExpiredTrigger = null;
    this._renderWaitForFetchStartedAt = null;
    this._renderWaitedForFetch = false;
    this._aliasRegistrationState = "idle";
    this._aliasRegistrationPromise = null;
    IntextWaterfall.#qt(this,'waterfall',this,node);
  }
  async startFetch(trigger) {
    if (this.fetchStarted) return;
    const fetchGeneration = this._fetchGeneration = (this._fetchGeneration || 0) + 1;
    IntextWaterfall.#qt(this,'fetch-begin', this, this.node, fetchGeneration);
    this.fetchStarted = true;
    this.fetchComplete = false;
    this.fetchTrigger = trigger;
    this.fetchStartAt = Date.now();
    this._auctionStartAt = this.fetchStartAt;
    this.disconnectFetchObserver();
    if (window.gexpIntextDebug) intextDebugCollector.recordTimeline("fetch-margin-entered", { node: this.node, slotId: this.node.id, trigger });

    const distancePx = this.getLoadingDistancePx();
    const fetchOffYTelemetry = this.getIntextOffYTelemetry("gexp-intext-fetch");
    const fetchExpectedViewability = this.getIntextExpectedViewability(
      fetchOffYTelemetry,
      "gexp-intext-fetch",
      trigger,
    );
    const exp = this.loadingConfig?._experiment || {};
    logIntext(`[Intext:Auction:${this.node.id}] loading_phase_fetch_triggered`, {
      slotCode: this.node.id,
      random1: exp.key === "random1" ? exp.keyValue : undefined,
      key: exp.key || "random1",
      keyValue: exp.keyValue || "",
      keySource: exp.keySource || "unresolved",
      variant: exp.variant || "default",
      fetchRootMargin: this.loadingConfig?.fetchRootMargin,
      renderRootMargin: this.loadingConfig?.renderRootMargin,
      maxDelayMs: this.loadingConfig?.maxDelayMs ?? null,
      trigger,
      distancePx,
    });

    const effectiveMode = this.config.decision?.mode || "auto";
    this._effectiveMode = effectiveMode;
    this.node.startIntextTelemetryCycle(trigger);
    IntextWaterfall.#qt(this,'fetch', this, this.node, fetchGeneration);
    if (this._lastFetchExpiredBeforeRestart) {
      this.mergeLoadingPhaseTelemetry({
        "gexp-intext-fetch-restarted-after-expiry": "true",
        "gexp-intext-prev-fetch-age-ms": String(this._lastFetchExpiredAgeMs),
        "gexp-intext-prev-fetch-expired-trigger": String(this._lastFetchExpiredTrigger || "unknown"),
        "gexp-intext-pending-auction-expired": "true",
        "gexp-intext-pending-auction-age-ms": String(this._lastFetchExpiredAgeMs),
        "gexp-intext-pending-auction-restarted": "true",
        "gexp-intext-pending-auction-used": "false",
      });
      logIntext(`[Intext:Auction:${this.node.id}] loading_previous_fetch_expiry_telemetry_applied`, {
        slotCode: this.node.id,
        previousFetchAgeMs: this._lastFetchExpiredAgeMs,
        previousFetchExpiredTrigger: this._lastFetchExpiredTrigger || "unknown",
        trigger,
      });
      this._lastFetchExpiredBeforeRestart = false;
      this._lastFetchExpiredAgeMs = null;
      this._lastFetchExpiredTrigger = null;
    }
    this.mergeLoadingPhaseTelemetry({
      "gexp-intext-fetch-trigger": trigger,
      "gexp-intext-fetch-start-time-ms": String(this.fetchStartAt),
      "gexp-intext-fetch-distance-px": distancePx !== null ? String(distancePx) : undefined,
      ...fetchOffYTelemetry,
      "gexp-intext-fetch-ev": fetchExpectedViewability,
    });

    try {
      await this.runPrebidPhase(trigger, effectiveMode);
      if (this._fetchGeneration !== fetchGeneration || !this.fetchStarted) return;
      const decision = this.decideWinner({ commit: false });
      this.pendingAuction = {
        timestamp: Date.now(),
        ...decision,
      };
      IntextWaterfall.#qt(this,'winner', this, this.node, fetchGeneration, this.pendingAuction);
      this.recordReadiness?.(decision?.winner === "video" ? "video_winner_resolved" : "intext_winner_resolved", { winnerFormat: decision?.winner || "none", durationMs: Date.now() - this.fetchStartAt });
      this.setupVideoPreparation?.(this.pendingAuction);
      if (decision?.winner === "video") {
        // Infrastructure only: no player, IMA initialization or ad request during fetch.
        Promise.resolve().then(() => IntextVideoCreative.prewarmDependencies({
          node: this.node, trigger, winner: "video",
        })).catch(() => { /* Prewarm failure is observed; render can retry. */ });
      }
      this.fetchComplete = true;
      logIntext(`[Intext:Auction:${this.node.id}] loading_phase_fetch_waiting_for_render`, {
        slotCode: this.node.id,
        winner: decision?.winner || "none",
      });
      if (this.renderTriggeredWaitingForFetch) {
        const waitingTrigger = this.renderTriggeredWaitingForFetch;
        this.renderTriggeredWaitingForFetch = null;
        this.startRender(waitingTrigger);
      }
    } catch (err) {
      if (this._fetchGeneration !== fetchGeneration || !this.fetchStarted) return;
      this.fetchComplete = true;
      this.pendingAuction = null;
      warnIntext(`[Intext:Auction:${this.node.id}] loading_phase_fetch_error`, err);
      if (this.renderTriggeredWaitingForFetch) {
        const waitingTrigger = this.renderTriggeredWaitingForFetch;
        this.renderTriggeredWaitingForFetch = null;
        this.startRender(waitingTrigger);
      }
    }
  }
  cleanup() {
    this.cancelVideoPreparation?.("waterfall-cleanup");
    this._fetchGeneration = (this._fetchGeneration || 0) + 1;
    IntextWaterfall.#qt(this,'cleanup', this, this.node);
    this.disconnectFetchObserver();
    this.disconnectRenderObserver();
    clearTimeout(this.timer);
    this.timer = null;
    this.pendingAuction = null;
    this.renderTriggeredWaitingForFetch = null;
    this.fetchStarted = false;
    this.fetchComplete = false;
    this.renderStarted = false;
    this.prebidStarted = false;
    logIntext(`[Intext:Waterfall:${this.node.id}] cleanup - loading observers and timer cleared`);
  }
  setupVideoPreparation(auction, renderToken = null) {
    this.cancelVideoPreparation("replacement");
    const config = this.getVideoPreparationConfig(), anchor = this.getLoadingTargetElement();
    if (!config.enabled || this.config?.decision?.mode === "display_only" || auction?.winner !== "video" || !anchor || typeof IntersectionObserver === "undefined") return;
    const entry = { config, auction, createdAt: Date.now(), busy: false, inZone: false, generation: 0, boundToken: renderToken,
      state: "STANDBY_UNBOUND" };
    this._videoPreparation = entry;
    IntextWaterfall.#qt(this,'preparation', this, this.node, auction, entry);
    const pool = IntextVideoCreative._preparationEntries ||= new Map();
    if (!renderToken) pool.set(this, entry);
    entry.valid = () => this._videoPreparation === entry && this.getVideoPreparationConfig().enabled && this.config?.decision?.mode !== "display_only" && (entry.boundToken
      ? this.node.isActiveRenderToken(entry.boundToken, "video-preparation")
      : this.pendingAuction === auction && auction.winner === "video") && anchor.isConnected !== false;
    entry.eligible = () => ["visible", "below"].includes(this.node.getReadinessViewportState().reason);
    entry.distance = () => Math.max(0, this.getLoadingDistancePx() ?? Infinity);
    entry.release = reason => {
      entry.generation++; IntextWaterfall.#qt(this,'retire-entry', this, this.node, entry, entry.generation); clearTimeout(entry.leaseTimer); entry.leaseTimer = null;
      entry.state = this._videoPreparation === entry ? "RELEASED" : "CANCELLED";
      entry.creative?.destroy(); entry.creative = null; entry.promise = null; entry.busy = false;
      // Re-arm only on a fresh proximity/visibility notification, not a retry loop.
      entry.inZone = false;
      this.recordReadiness("video_activation_cancelled", { reason, ownershipState: entry.state });
    };
    entry.start = () => {
      if (entry.busy && entry.creative) return;
      entry.busy = true;
      entry.state = entry.boundToken ? "RENDER_OWNED" : "STANDBY_UNBOUND";
      const generation = ++entry.generation;
      IntextWaterfall.#qt(this,'entry-start', this, this.node, entry, generation);
      this.recordReadiness("video_prepare_triggered", { source: "preparation-margin", preparationRootMargin: config.preparationRootMargin,
        preparationTriggerDistancePx: entry.distance(), winnerAgeMs: auction.timestamp != null ? Date.now() - auction.timestamp : null });
      const creative = new IntextVideoCreative({ container: this.node.videoContainer, node: this.node, config: this.node.config,
        preparationGuard: () => entry.valid() && entry.generation === generation }, IntextWaterfall.#qp(this));
      entry.creative = creative;
      IntextWaterfall.#qt(this,'prepared-creative', this, this.node, entry, creative, generation);
      creative._preparationEntry = entry;
      if (entry.boundToken) { creative._renderToken = entry.boundToken; creative._preparationGuard = null; }
      entry.promise = creative.prepare().catch(error => {
        if (entry.creative !== creative) return;
        this.recordReadiness("video_prepare_failed", { reason: error?.message || String(error) });
        entry.release("prepare-failed"); IntextVideoCreative.drainPreparations();
      });
      const ttl = this.loadingConfig?.maxFetchToRenderMs;
      const lease = Number.isFinite(ttl) && ttl > 0 ? Math.min(config.preparedMaxAgeMs, ttl) : config.preparedMaxAgeMs;
      if (entry.state === "STANDBY_UNBOUND") entry.leaseTimer = setTimeout(() => {
        if (this._videoPreparation !== entry || entry.state !== "STANDBY_UNBOUND" || entry.boundToken) return;
        this.recordReadiness("video_standby_expired", { ownershipState: entry.state, durationMs: lease });
        this.cancelVideoPreparation("standby-lease-expired");
      }, lease);
    };
    entry.check = entries => {
      if (!entry.valid()) { this.cancelVideoPreparation("stale-auction"); return; }
      if (entries?.[0]) entry.inZone = entries[0].isIntersecting === true;
      if ((!entry.inZone || !entry.eligible()) && !entry.boundToken) entry.release("outside-preparation-zone");
      else if (document.visibilityState !== "hidden") IntextVideoCreative.drainPreparations();
    };
    try {
      entry.visibility = () => {
        if (document.visibilityState !== "hidden" && entry.lastInZone) entry.inZone = true;
        entry.check();
      };
      const check = entry.check;
      entry.observer = new IntersectionObserver(entries => { entry.lastInZone = entries[0]?.isIntersecting === true; check(entries); }, { threshold: 0, rootMargin: config.preparationRootMargin });
      entry.observer.observe(anchor);
      document.addEventListener?.("visibilitychange", entry.visibility);
    } catch (error) {
      this.recordReadiness("video_prepare_failed", { reason: "invalid-preparation-margin" });
      this.cancelVideoPreparation("observer-unavailable");
    }
    if (renderToken) this.claimVideoPreparation(renderToken);
  }
  claimVideoPreparation(renderToken) {
    const entry = this._videoPreparation;
    if (!entry || !this.node.isActiveRenderToken(renderToken, "video-ownership") || !entry.valid()) return null;
    if (entry.boundToken && entry.boundToken !== renderToken) return null;
    const transferred = entry.state !== "RENDER_OWNED";
    // Synchronous handoff: a queued standby timer also checks state and identity.
    entry.boundToken = renderToken; entry.state = "RENDER_OWNED";
    IntextWaterfall.#qt(this,'handoff', this, this.node, entry, renderToken);
    if (entry.creative) { entry.creative._renderToken = renderToken; entry.creative._preparationGuard = null; }
    clearTimeout(entry.leaseTimer); entry.leaseTimer = null;
    entry.observer?.disconnect(); document.removeEventListener?.("visibilitychange", entry.visibility);
    IntextVideoCreative._preparationEntries?.delete(this);
    if (transferred) this.recordReadiness("video_preparation_ownership_transferred", { renderToken, ownershipState: entry.state });
    IntextVideoCreative.drainPreparations();
    return entry;
  }
  getPreparedVideo(renderToken) {
    const entry = this._videoPreparation;
    if (entry && !entry.valid()) { this.cancelVideoPreparation("stale-preparation"); return null; }
    if (entry && !this.claimVideoPreparation(renderToken)) return null;
    if (entry && !entry.creative && entry.valid()) {
      const lead = /^(-?\d+(?:\.\d+)?)px(?:\s|$)/.exec(entry.config.preparationRootMargin);
      if (lead && entry.eligible() && this.getLoadingDistancePx() <= Number(lead[1])) {
        entry.inZone = true; entry.start();
      }
    }
    if (!entry?.creative || entry.creative._destroyed) return null;
    this.recordReadiness("video_activation_pending", { renderToken, ownershipState: entry.state });
    return entry;
  }
  cancelVideoPreparation(reason = "cleanup") {
    const entry = this._videoPreparation;
    if (!entry) return;
    this._videoPreparation = null;
    IntextVideoCreative._preparationEntries?.delete(this);
    entry.observer?.disconnect(); document.removeEventListener?.("visibilitychange", entry.visibility);
    entry.release(reason); IntextVideoCreative.drainPreparations();
  }
  async startAuction(trigger) {
    const sentinelRetryContext =
      trigger === "house-1x1-refresh" &&
        this._houseLineItemSentinelRetryContext?.forceRequestType === "display"
        ? this._houseLineItemSentinelRetryContext
        : null;
    if (sentinelRetryContext) {
      this._houseLineItemSentinelRetryContext = null;
    }
    if (this.wa && this.wa.cI) {
      const isRefresh =
        trigger === "refresh" ||
        this.node?._intextTelemetryCycle?.["gexp-intext-refresh"] === "true";
      const isFallback =
        trigger === "fallback" ||
        this.node?._intextTelemetryCycle?.["gexp-intext-fallback"] === "true" ||
        sentinelRetryContext?.isFallback === true;
      this.wa.cI["gexp-intext-is-refresh"] = isRefresh ? "true" : "false";
      this.wa.cI["gexp-intext-refresh"] = this.wa.cI["gexp-intext-is-refresh"];
      this.wa.cI["gexp-intext-is-fallback"] = isFallback ? "true" : "false";
      this.wa.cI["gexp-intext-fallback"] = this.wa.cI["gexp-intext-is-fallback"];
      logIntext(`[Intext:Auction:${this.node.id}] Status injected: refresh=${this.wa.cI["gexp-intext-is-refresh"]}, fallback=${this.wa.cI["gexp-intext-is-fallback"]}`);
    }
    if (this.prebidStarted) return;
    this.prebidStarted = true;
    const renderToken = this.node.beginVisualRender("auction_started", trigger);
    this.node.startIntextTelemetryCycle(trigger);
    IntextWaterfall.#qt(this,'legacy-auction', this, this.node);
    this.node.mergeIntextTelemetry({
      "gexp-intext-render-token": String(renderToken),
      "gexp-intext-render-attempt": String(this.node._renderTokenSeq || 0),
      "gexp-intext-visual-state": "auction_started",
    });
    if (sentinelRetryContext) {
      this.node.mergeIntextTelemetry({
        "gexp-intext-is-fallback": sentinelRetryContext.isFallback ? "true" : "false",
        "gexp-intext-fallback": sentinelRetryContext.isFallback ? "true" : "false",
        "gexp-intext-sentinel-retry-forced-request-type": "display",
        "gexp-intext-sentinel-retry-preserved-fallback": sentinelRetryContext.isFallback ? "true" : "false",
        "gexp-intext-sentinel-retry-original-decision-mode": sentinelRetryContext.originalDecisionMode || "unknown",
        "gexp-intext-sentinel-retry-lineitem": sentinelRetryContext.sentinelLineItemId || "unknown",
        "gexp-intext-sentinel-retry-attempt-slot": String(sentinelRetryContext.attemptSlot ?? "unknown"),
        "gexp-intext-sentinel-retry-max-slot": String(sentinelRetryContext.maxAttemptsPerSlot ?? "unknown"),
        "gexp-intext-sentinel-retry-attempt-cycle": String(sentinelRetryContext.attemptCycle ?? "unknown"),
        "gexp-intext-sentinel-retry-max-cycle": String(sentinelRetryContext.maxAttemptsPerCycle ?? "unknown"),
      });
    }

    // Cleanup: reset fallback state and clear targeting on new auctions
    if (trigger !== "fallback") {
      if (this._displayRenderState) this._displayRenderState.isFallback = false;
    }
    if (sentinelRetryContext?.isFallback === true) {
      if (!this._displayRenderState) this._displayRenderState = {};
      this._displayRenderState.isFallback = true;
    }
    if (this.node.slot) {
      this.node.clearDisplayRequestTargeting(this.node.slot, "auction_start_targeting_cleanup");
    }

    this.lastTrigger = trigger;
    this._auctionStartAt = Date.now();
    clearTimeout(this.timer);
    this.node.recordTelemetry("auction_start", { trigger });

    if (trigger === "refresh") {
      if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
        intextDebugCollector.recordMetric("display_refresh_started", {
          node: this.node,
          element: this.container?.getElement?.(),
          trigger,
          isRefresh: true,
        });
      }
      const currentState = this.node.state;

      const refreshPb = this.node.manager.resolveIntextPrebidApi().api;
      if (typeof refreshPb?.clearTargeting === "function") {
        refreshPb.clearTargeting(this.node.id);
      }

      if (typeof refreshPb?.removeAdUnit === "function") {
        refreshPb.removeAdUnit(this.node.id);
      }

      if (this.node.activeCreative && this.node.activeCreative.player) {
        const vjsEl = this.node.activeCreative.player.el();
        if (vjsEl) {
          vjsEl.classList.add("vjs-hidden");
          vjsEl.style.display = "none";
        }
      }

      if (currentState === "video") {
        const videoEl = this.node.videoContainer?.getElement();
        const displayEl = this.container.getElement();
        if (!this.node.isActiveRenderToken(renderToken, "startAuction_refresh_video_to_display_prepare", trigger)) {
          logIntext(`[Intext:Display:${this.node.id}] video_to_display_transition_skipped_stale_token`, {
            slotCode: this.node.id,
            renderToken,
            currentState,
            displayConnected: Boolean(displayEl?.isConnected),
            videoConnected: Boolean(videoEl?.isConnected),
            source: "startAuction_refresh_video_to_display_prepare",
          });
          return;
        }
        this.node.mergeIntextTelemetry({
          "gexp-intext-video-to-display-transition": "started",
        });
        logIntext(`[Intext:Display:${this.node.id}] video_to_display_transition_started`, {
          slotCode: this.node.id,
          renderToken,
          currentState,
          displayConnected: Boolean(displayEl?.isConnected),
          videoConnected: Boolean(videoEl?.isConnected),
          source: "startAuction_refresh_video_to_display_prepare",
        });
        const preservedHeight = this.node.resolveTransitionPreservedHeight(displayEl, videoEl, this.node.lockedHeight);
        const bridge = this.node.ensureIntextTransitionBridge({
          preferredSurface: "display",
          fallbackSurface: "video",
          renderToken,
          source: "video_to_display_refresh",
          preservedHeight,
          loaderText: "Recuperando anuncio",
        });
        const displayMissing = !displayEl?.isConnected;
        this.node.mergeIntextTelemetry({
          "gexp-intext-video-to-display-display-missing": displayMissing ? "true" : "false",
          "gexp-intext-video-to-display-video-bridge": bridge?.bridgeSurface === "video" ? "true" : "false",
          "gexp-intext-video-to-display-bridge-complete": "true",
          "gexp-intext-video-to-display-display-loader": "true",
          "gexp-intext-video-to-display-single-surface": "true",
          "gexp-intext-video-to-display-container-state-synced": "true",
        });
        if (displayMissing && bridge?.bridgeSurface === "video") {
          logIntext(`[Intext:Display:${this.node.id}] video_to_display_display_missing_keep_video_surface`, {
            slotCode: this.node.id,
            renderToken,
            currentState,
            preservedHeight: bridge.preservedHeight,
            displayConnected: Boolean(displayEl?.isConnected),
            videoConnected: Boolean(videoEl?.isConnected),
            source: "video_to_display_refresh",
          });
          logIntext(`[Intext:Display:${this.node.id}] video_to_display_video_loader_preserved_as_bridge`, {
            slotCode: this.node.id,
            renderToken,
            currentState,
            preservedHeight: bridge.preservedHeight,
            source: "video_to_display_refresh",
          });
        } else if (bridge?.bridgeSurface === "display" || bridge?.bridgeSurface === "display-recreated") {
          logIntext(`[Intext:Display:${this.node.id}] video_to_display_display_surface_ready`, {
            slotCode: this.node.id,
            renderToken,
            currentState,
            preservedHeight: bridge.preservedHeight,
            bridgeSurface: bridge.bridgeSurface,
            source: "video_to_display_refresh",
          });
          logIntext(`[Intext:Display:${this.node.id}] video_to_display_video_surface_hidden_after_display_ready`, {
            slotCode: this.node.id,
            renderToken,
            currentState,
            displayConnected: Boolean(this.container.getElement()?.isConnected),
            videoConnected: Boolean(videoEl?.isConnected),
            source: "video_to_display_refresh",
          });
        }
        logIntext(`[Intext:Display:${this.node.id}] video_to_display_bridge_complete`, {
          slotCode: this.node.id,
          renderToken,
          currentState,
          bridgeSurface: bridge?.bridgeSurface || "none",
          preservedHeight: bridge?.preservedHeight || preservedHeight,
          displayConnected: Boolean(this.container.getElement()?.isConnected),
          videoConnected: Boolean(videoEl?.isConnected),
          source: "video_to_display_refresh",
        });
      } else {
        let loaderDisplay = this.container
          .getElement()
          ?.querySelector(".gexp-intext-loader");
        if (!loaderDisplay && this.container.getElement()) {
          const el = this.container.getElement();
          el.insertAdjacentHTML('beforeend', '<div class="gexp-intext-loader"><div class="gexp-intext-spinner"></div><div class="gexp-intext-loader-text">Recuperando anuncio</div></div>');
          loaderDisplay = el.querySelector(".gexp-intext-loader");
        }
        if (loaderDisplay) loaderDisplay.style.display = "flex";
        const activeEl = this.container.getElement();
        if (activeEl) {
          const preservedHeight = this.node.getPreservedRefreshHeight(activeEl);
          logIntext(
            `[Intext:Display:${this.node.id}] display_refresh_preserved_height - height=${preservedHeight}`,
          );
          this.node.applyDisplayWrapperHeight(activeEl, preservedHeight, {
            logReason:
              preservedHeight === 600 ? "display_300x600_visual_height_adjusted" : "",
            source: "refresh_prepare_display_container",
          });
          activeEl.classList.add("is-open");
          activeEl.style.display = "block";
          activeEl.style.opacity = "1";
        }
      }
    }

    const isRefresh = trigger === "refresh";
    const effectiveMode = sentinelRetryContext?.forceDecisionMode || (isRefresh
      ? this.config.refreshCycle?.mode || "display_only"
      : this.config.decision?.mode || "auto");

    this._effectiveMode = effectiveMode;

    logIntext(
      `%c[Intext:Slot:${this.node.id}:${this.node.id}] ═══ AUCTION START ═══`,
      "color:#2196F3;font-weight:bold",
    );
    logIntext(
      `[Intext:Slot:${this.node.id}] ├─ Trigger:  ${trigger}`,
    );
    logIntext(
      `[Intext:Slot:${this.node.id}] ├─ Mode:     ${effectiveMode}${isRefresh ? " (refresh cycle)" : ""}`,
    );

    if (sentinelRetryContext) {
      logIntext(`[Intext:Slot:${this.node.id}] house_lineitem_sentinel_retry_forced_display`, {
        lineItemId: sentinelRetryContext.sentinelLineItemId,
        preservedFallback: sentinelRetryContext.isFallback ? "true" : "false",
        originalMode: sentinelRetryContext.originalDecisionMode || "unknown",
        attemptSlot: sentinelRetryContext.attemptSlot,
        maxAttemptsPerSlot: sentinelRetryContext.maxAttemptsPerSlot,
        attemptCycle: sentinelRetryContext.attemptCycle,
        maxAttemptsPerCycle: sentinelRetryContext.maxAttemptsPerCycle,
      });
      logIntext(
        `[Intext:Slot:${this.node.id}] technical house lineitem sentinel retry forced to display lineItemId=${sentinelRetryContext.sentinelLineItemId}, preservedFallback=${sentinelRetryContext.isFallback ? "true" : "false"}, originalMode=${sentinelRetryContext.originalDecisionMode || "unknown"}`,
      );
    }

    const bidStrategy = isRefresh
      ? (this.config.refreshCycle?.bidStrategy || "fresh")
      : "fresh";

    if (isRefresh && bidStrategy !== "fresh") {
      const cached = this.getCachedBidsForMode(effectiveMode);
      if (cached && bidStrategy === "reuse") {
        logIntext(
          `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: REUSE (${cached.banner.length} banner, ${cached.video.length} video from cache, age: ${cached.ageMs}ms)`,
        );
        this._cachedBidsForDecision = cached;
        this._currentAuctionId = cached.auctionId;
        this.decideWinner();
        return;
      } else if (cached && bidStrategy === "compare") {
        logIntext(
          `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: COMPARE (will merge new bids with ${cached.banner.length + cached.video.length} cached, age: ${cached.ageMs}ms)`,
        );
        this._cachedBidsForDecision = cached;
      } else {
        logIntext(
          `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: ${bidStrategy.toUpperCase()} → no valid cache, falling back to FRESH`,
        );
        this._cachedBidsForDecision = null;
      }
    } else {
      this._cachedBidsForDecision = null;
      if (isRefresh) {
        logIntext(
          `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: FRESH (new auction)`,
        );
      }
    }

    const prebidPromises = [];

    const multiConfig = this.getPrebidMultiFormatConfig();
    if (multiConfig) {
      const bannerBidders = multiConfig.bids.filter(b => !(this.config.prebid?.videoBidders || []).includes(b)).length;
      const videoBidders = (this.config.prebid?.videoBidders || []).length;
      const mediaTypesStr = Object.keys(multiConfig.mediaTypes).join("+");
      logIntext(
        `[Intext:Slot:${this.node.id}] ├─ Prebid MultiFormat: requesting (code: ${multiConfig.code}, ${multiConfig.bids.length} bidders, types: ${mediaTypesStr})`,
      );
      prebidPromises.push(this.executePrebid(multiConfig));
    } else {
      logIntext(
        `[Intext:Slot:${this.node.id}] ├─ Prebid: SKIPPED (no config)`,
      );
    }

    logIntext(
      `[Intext:Slot:${this.node.id}] └─ ${prebidPromises.length} Prebid request(s)...`,
    );

    await Promise.all(prebidPromises);
    this.decideWinner();
  }
}
class IntextVideoCreative {
  #qa1b = null;
  static #qp(self){try{return self.#qa1b;}catch(_){return null;}}
  static #qt(self,...args){try{return self.#qa1b?.tap(...args);}catch(_){}}
  static #qv(self,kind,value,...args){IntextVideoCreative.#qt(self,kind,...args,value);return value;}
  static #qr(self,value,node,anchor){IntextVideoCreative.#qt(self,'result',node,anchor,value);return value;}
  static #qf(self,value,node,creative){IntextVideoCreative.#qt(self,'control',node,'C1',creative,value);return value;}
  static #ticket(self,node,caller,token,owner=null){try{return self.#qa1b?.ticket(node,caller,token,owner)??null;}catch(_){return null;}}
  

  constructor({ container, adTagUrl, bid, node, config, onVideoEnded, videoTiming, preparationGuard }, __qa1bPort = null) {
    try { this.#qa1b = __qa1bPort; } catch (_) {}
    this.container = container;
    this.adTagUrl = adTagUrl || null;
    this.bid = bid || null;
    this.node = node;
    this.config = config;
    this.onVideoEnded = onVideoEnded || null;
    this.playerId = `gexp-intext-video-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.player = null;
    this.spinnerHidden = false;
    this._aborted = false;
    this._settle = null;
    this._playerRevealed = false;
    this._videoEndHandled = false;
    this._videoTiming = videoTiming || null;
    this._renderToken = node?._activeRenderToken || 0;
    this._adMediaEl = null;
    this._adMediaFirstFrameCleanup = null;
    this._adMediaCleanup = null;
    this._adMediaDiscoveryTimers = [];
    this._firstFrameWaitTimers = [];
    this._adMediaStateSeen = new WeakMap();
    this._destroyed = false;
    this._lastAdDuration = null;
    this._mutedOverrideRejectedLogged = false;
    this._videoControlsMetricRenderToken = null;
    this._preparationGuard = preparationGuard || null;
    this._preparePromise = null;
    this._prepared = false;
    this._activationPromise = null;
    IntextVideoCreative.#qt(this,'creative-created',node,this);
  }
  async activate() {
    await this.prepare();
    if (!this.preparationValid()) throw new Error("stale_render_token");
    const node = this.node;
    if (node?.waitForViewport) {
      node.waterfall?.recordReadiness?.("video_activation_deferred", { reason: node.getReadinessViewportState().reason });
      const state = await node.waitForViewport(this._renderToken, "video-activation", this, IntextVideoCreative.#ticket(this,node,'W4',this._renderToken,this));
      if (state === "stale" || !this.preparationValid()) throw new Error("stale_render_token");
    }
    if (node?.getReadinessViewportState && !IntextVideoCreative.#qf(this,node.getReadinessViewportState(), node, this).eligible) throw new Error("video_activation_ineligible");
    node?.waterfall?.recordReadiness?.("video_activation_eligible");
    node?.waterfall?.releasePreparedVideo?.(this);
    IntextVideoCreative.#qt(this,'player-build', node, this);
    this.createPlayerForActivation();
    this.observeActivationEligibility();
    node?.waterfall?.recordReadiness?.("video_activation_started");
    return this.requestAds();
  }
  abort() {
    this._aborted = true;
    IntextVideoCreative.#qt(this,'retire-creative', this.node, this);
    this.node?.cancelViewportWaits?.("stale", this);
    this._eligibilityCleanup?.();
    this.cleanupAdMediaObservation();
    logIntext(
      `[Intext:Video:IMA] 🛑 abort() — display won, cancelling video path`,
    );
    this._settle?.("reject", new Error("display_won_abort"));
  }
  destroy() {
    if (this._destroyed) return;
    this._destroyed = true;
    IntextVideoCreative.#qt(this,'retire-creative', this.node, this);
    if (this._preparationEntry?.state === "ACTIVATED") this._preparationEntry.state = "RELEASED";
    this.node?.cancelViewportWaits?.("stale", this);
    this._eligibilityCleanup?.();
    this._settle?.("reject", new Error("video_destroyed"));
    this.cleanupAdMediaObservation();
    try {
      this.player?.dispose?.();
    } catch (err) {
      // ignore
    }
    this.videoEl?.remove?.();
  }
};return Object.freeze({IntextManager,IntextPlacementEngine,IntextNode,IntextWaterfall,IntextVideoCreative});})(),Manager:(()=>{class IntextManager {
  #qa1b = null;
  static #qp(self){try{return self.#qa1b;}catch(_){return null;}}
  static #qt(self,...args){try{return self.#qa1b?.tap(...args);}catch(_){}}
  static #qv(self,kind,value,...args){IntextManager.#qt(self,kind,...args,value);return value;}
  static #qr(self,value,node,anchor){IntextManager.#qt(self,'result',node,anchor,value);return value;}
  static #qf(self,value,node,creative){IntextManager.#qt(self,'control',node,'C1',creative,value);return value;}
  static #ticket(self,node,caller,token,owner=null){try{return self.#qa1b?.ticket(node,caller,token,owner)??null;}catch(_){return null;}}
  /*QA1B_RUNTIME_BEGIN*/ static #qaRuntime = (()=>{try{return (function createRuntime(qa0, byteLength, context = {}) {
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
})((()=>{const defs={"intext-p14b-data.cjs":function(require,module,exports){
'use strict';
// QA0 data-only utilities. No browser acquisition, clocks, storage or commercial APIs.
const {Buffer}=require('node:buffer');
const SCHEMA='p14b-shadow-sample-v1', FORMULA='p14b-geometry-v1';
const MODELS=Object.freeze(['player-measured-current-flow','player-intent-current-flow-v1','slot-open-envelope-v1']);
const DISTRIBUTIONS=Object.freeze(['_gam_kv_.js','IntextManager.js']);
const STAGES=Object.freeze(['before-player','after-player','post-request','post-reveal']);
const CLOCKS=Object.freeze(['synthetic-monotonic-ms','page-monotonic-ms']);
function record(value){
  if(!value||typeof value!=='object'||Array.isArray(value))return false;
  try {const proto=Object.getPrototypeOf(value);return proto===Object.prototype||proto===null;}catch{return false;}
}
function own(value,key){
  if(!record(value)&&!Array.isArray(value))return undefined;
  try {const d=Object.getOwnPropertyDescriptor(value,key);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}
}
const at=(value,...keys)=>keys.reduce((v,k)=>own(v,k),value);
const finite=value=>typeof value==='number'&&Number.isFinite(value);
const integer=(value,min=0)=>Number.isSafeInteger(value)&&value>=min;
const localId=value=>typeof value==='string'&&/^[A-Za-z][A-Za-z0-9_-]{0,47}$/.test(value);
const hash=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value);
const numberOrNull=value=>finite(value)?value:null;
const oneOf=(value,values)=>values.includes(value)?value:null;
function items(value,max){
  if(!Array.isArray(value))return null;
  const length=own(value,'length');
  if(!integer(length)||length>max)return null;
  return Array.from({length},(_,i)=>own(value,String(i)));
}
function identity(value){
  if(!record(value))return null;
  const out={};
  for(const key of ['documentLocalId','navigationLocalId','slotLocalId','anchorLocalId']){
    if(!localId(own(value,key)))return null;out[key]=own(value,key);
  }
  for(const key of ['cycleId','fetchGeneration','renderToken','activeRenderToken']){
    if(!integer(own(value,key),key==='cycleId'||key==='fetchGeneration'?1:0))return null;out[key]=own(value,key);
  }
  if(own(value,'verified')!==true)return null;
  out.state=oneOf(own(value,'state'),['live','stale','terminal']);
  return out.state?out:null;
}
const opportunityKey=i=>JSON.stringify([i.documentLocalId,i.navigationLocalId,i.slotLocalId,i.cycleId]);
const bytes=value=>Buffer.byteLength(JSON.stringify(value),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value)); // Only our own whitelisted records, never raw samples.
function validRect(value){
  const r=Object.fromEntries(['left','top','width','height'].map(k=>[k,own(value,k)]));
  if(!Object.values(r).every(finite)||r.width<=0||r.height<=0)return null;
  if(!finite(r.left+r.width)||!finite(r.top+r.height)||!finite(r.width*r.height)||r.width*r.height<=0)return null;
  return r;
}
function validViewport(value){
  const width=own(value,'width'),height=own(value,'height');
  return finite(width)&&finite(height)&&width>0&&height>0&&finite(width*height)&&width*height>0?{width,height}:null;
}
function control(sample){
  return at(sample,'control','observed')===true&&at(sample,'control','reliable')===true&&typeof at(sample,'control','eligible')==='boolean'
    ?at(sample,'control','eligible'):null;
}
function baseStatus(sample){
  if(!record(sample)||own(sample,'schemaVersion')!==SCHEMA||own(sample,'contractRevision')!=='r2')return 'invalid-schema';
  if(at(sample,'source','consistent')!==true)return 'inconsistent-source';
  if(own(sample,'scope')==='display')return 'display-only';
  const i=identity(own(sample,'identity'));if(!i)return 'identity-unknown';
  if(['stale','terminal'].includes(i.state))return i.state==='stale'?'stale-identity':'terminal';
  if(i.renderToken!==i.activeRenderToken)return 'stale-identity';
  if(own(sample,'scope')!=='video')return 'scope-unknown';
  return null;
}
module.exports={SCHEMA,FORMULA,MODELS,DISTRIBUTIONS,STAGES,CLOCKS,record,own,at,finite,integer,localId,hash,numberOrNull,oneOf,items,identity,opportunityKey,bytes,clone,validRect,validViewport,control,baseStatus};

},
"intext-p14b-shadow-evaluator.cjs":function(require,module,exports){
'use strict';
// Isolated QA0 evaluator. Never imports or calls the core, DOM, SDK, clocks or I/O.
const D=require('./intext-p14b-data.cjs');
const {own,at,finite,integer,localId,hash,items}=D;
const CORES=Object.freeze({
  '_gam_kv_.js':'1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690',
  'IntextManager.js':'ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8',
});

function geometryV1(rect,viewport){
  const r=D.validRect(rect),v=D.validViewport(viewport);if(!r||!v)return null;
  const right=r.left+r.width,bottom=r.top+r.height;
  const ix=Math.max(0,Math.min(right,v.width)-Math.max(r.left,0));
  const iy=Math.max(0,Math.min(bottom,v.height)-Math.max(r.top,0));
  const xFraction=Math.min(1,ix/r.width),yFraction=Math.min(1,iy/r.height);
  return {formulaVersion:D.FORMULA,ix,iy,xFraction,yFraction,areaFraction:xFraction*yFraction,
    maxAreaFraction:(Math.min(r.width,v.width)/r.width)*(Math.min(r.height,v.height)/r.height),
    position:r.top>=v.height?'below':bottom<=0?'above':ix===0?'horizontal-out':'overlapping'};
}

// Numeric operands already resolved by a data source; no CSS parsing or DOM reads.
function validCurrentBox(operands){
  const b=own(operands,'currentBox'),keys=['paddingTopPx','paddingBottomPx','paddingLeftPx','paddingRightPx','borderTopPx','borderBottomPx','borderLeftPx','borderRightPx'];
  if(!keys.every(k=>finite(own(b,k))&&own(b,k)>=0))return false;
  const horizontal=own(b,'paddingLeftPx')+own(b,'paddingRightPx')+own(b,'borderLeftPx')+own(b,'borderRightPx');
  const vertical=own(b,'paddingTopPx')+own(b,'paddingBottomPx')+own(b,'borderTopPx')+own(b,'borderBottomPx');
  const width=own(b,'borderBoxWidthPx'),left=own(b,'borderBoxLeftPx'),top=own(b,'borderBoxTopPx');
  const agrees=(a,b)=>finite(a)&&finite(b)&&Math.abs(a-b)<=1e-7;
  return finite(horizontal)&&finite(vertical)&&finite(width)&&width>0&&width>horizontal
    &&agrees(width-horizontal,own(operands,'contentWidthPx'))
    &&agrees(left+own(b,'borderLeftPx')+own(b,'paddingLeftPx'),own(operands,'contentLeftPx'))
    &&agrees(top+own(b,'borderTopPx')+own(b,'paddingTopPx'),own(operands,'contentTopPx'));
}
function openEnvelopeHeightV1(operands){
  const override=own(operands,'lockedHeightOverride'),chrome=own(operands,'wrapperChromeHeight'),preset=own(operands,'targetHeightPx');
  if(override!==null&&(!finite(override)||override<0))return null;
  if(chrome!==undefined&&chrome!==null&&(!Number.isSafeInteger(chrome)||chrome<0))return null;
  if(own(operands,'currentBox')!==undefined&&!validCurrentBox(operands))return null;
  if(preset!==undefined&&preset!==null&&(!finite(preset)||preset<=0))return null;
  if(override!==null&&override>1){
    if(chrome!==null&&!Number.isSafeInteger(chrome))return null;
    const height=override+(chrome===null||chrome===0?15:chrome);
    return finite(height)&&height>0?height:null;
  }
  return preset===null?360:finite(preset)&&preset>0?preset:null;
}

// Checks data attestations and cross-record consistency. It does not assert that CSS
// really matched a live page; QA1 would have to obtain those facts under separate approval.
function qualifyModelV1(sample,model){
  const modelId=own(model,'modelId'),quality=own(model,'quality'),e=own(model,'evidence'),c=own(model,'context');
  const i=D.identity(own(sample,'identity')),v=own(sample,'viewport'),p=own(sample,'provenance');
  const measured=modelId==='player-measured-current-flow'&&quality==='measured';
  const estimated=['player-intent-current-flow-v1','slot-open-envelope-v1'].includes(modelId)&&quality==='qualified-estimate';
  const stage=own(sample,'stage'),operands=own(e,'operands'),rect=D.validRect(own(model,'rect'));
  const originResolved=measured||!!(rect&&own(operands,'contentLeftPx')===rect.left&&own(operands,'contentTopPx')===rect.top
    &&own(operands,'contentWidthPx')===rect.width);
  const heightResolved=measured||!!(rect&&(modelId==='slot-open-envelope-v1'
    ?openEnvelopeHeightV1(operands)===rect.height
    :finite(own(operands,'intendedPlayerHeightPx'))&&own(operands,'intendedPlayerHeightPx')===rect.height));
  const sameIdentity=!!i&&['documentLocalId','navigationLocalId','slotLocalId','anchorLocalId','cycleId','fetchGeneration','renderToken']
    .every(k=>own(c,k)===i[k]);
  const Q1=!!(sameIdentity&&own(e,'wrapperConnected')===true&&localId(own(e,'wrapperLocalId'))&&own(c,'stage')===stage&&D.STAGES.includes(stage));
  const Q2=!!(D.validRect(own(model,'rect'))&&D.validViewport(v)&&own(c,'coordinateSpace')==='layout-css-px'
    &&own(v,'coordinateSpace')==='layout-css-px'&&integer(own(sample,'sampleSequence'),1)
    &&D.CLOCKS.includes(own(sample,'sourceClock'))&&own(c,'sourceClock')===own(sample,'sourceClock')
    &&own(c,'sampleSequence')===own(sample,'sampleSequence')&&finite(own(sample,'monotonicMs'))&&own(sample,'monotonicMs')>=0
    &&localId(own(sample,'layoutRevision'))&&own(c,'layoutRevision')===own(sample,'layoutRevision')
    &&localId(own(v,'revision'))&&own(c,'viewportRevision')===own(v,'revision')&&own(e,'acquiredWithinRevision')===true
    &&originResolved&&(measured||(own(e,'contentBoxResolved')===true&&own(e,'currentPaddingBordersResolved')===true)));
  const Q3=!!(D.DISTRIBUTIONS.includes(own(p,'distribution'))&&hash(own(p,'coreSha256'))&&CORES[own(p,'distribution')]===own(p,'coreSha256')
    &&localId(own(p,'cssModelVersion'))&&localId(own(p,'configVersion'))
    &&['distribution','coreSha256','cssModelVersion','configVersion'].every(k=>own(e,k)===own(p,k))
    &&heightResolved&&(measured||validCurrentBox(operands))
    &&(measured||own(operands,'wrapperChromeHeight')===null||(integer(own(operands,'wrapperChromeHeight'))))
    &&own(e,'sourcesResolved')===true&&own(e,'units')==='css-px'
    &&(measured
      ?own(e,'originSource')==='player-rect'&&own(e,'heightSource')==='player-rect'&&own(e,'widthSource')==='player-rect'
      :own(e,'originSource')==='wrapper-content-box'&&own(e,'widthSource')==='wrapper-content-box'
        &&(modelId==='slot-open-envelope-v1'?own(e,'heightSource')==='open-operands':own(e,'heightSource')==='pinned-effective-style')));
  const Q4=!!(own(e,'supportedLayout')===true&&own(e,'externalStylesResolved')===true&&own(e,'intentionalClosureKnown')===true
    &&(measured?stage!=='before-player'&&own(e,'existingObject')==='player':true));
  const Q5=!!(own(model,'modelVersion')==='1'&&own(e,'provenanceComplete')===true&&own(e,'sourceConflict')===false
    &&own(c,'coordinateSpace')==='layout-css-px'&&own(e,'pipFloating')===false);
  const checks={Q1,Q2,Q3,Q4,Q5};
  const valid=(measured||estimated)&&Object.values(checks).every(Boolean);
  return {valid,quality:measured?'measured':estimated?'qualified-estimate':D.oneOf(quality,['partial','unknown'])||'unknown',
    checks,failedChecks:Object.keys(checks).filter(k=>!checks[k]),reason:valid?null:'model-quality-insufficient'};
}

function candidateV1(value){
  const family=own(value,'family');
  if(!['B0','B1','B2','B3','B4','B5'].includes(family)||(own(value,'formulaVersion')!==undefined&&own(value,'formulaVersion')!==D.FORMULA))return null;
  const rectModelId=D.MODELS.includes(own(value,'rectModelId'))?own(value,'rectModelId'):null;
  if(family==='B0')return {family,rectModelId:null,parameterSetId:'control-factual',formulaVersion:D.FORMULA};
  if(family==='B4'||family==='B5')return {family,rectModelId,parameterSetId:'temporal-deferred',formulaVersion:D.FORMULA};
  const p=own(value,'parameters'),areaFraction=own(p,'areaFraction'),xFraction=own(p,'xFraction'),yFraction=own(p,'yFraction');
  const parameters=family==='B2'?{areaFraction}:family==='B3'?{xFraction,yFraction}:{};
  const parametersValid=family==='B1'||(family==='B2'?[0.25,0.5,0.75].includes(areaFraction):[0.5,1].includes(xFraction)&&[0.25,0.5].includes(yFraction));
  return {family,rectModelId,parameters,parametersValid,parameterSetId:family==='B1'?'positive':family==='B2'&&parametersValid?`area-${areaFraction}`:
    family==='B3'&&parametersValid?`xy-${xFraction}-${yFraction}`:'invalid-parameters',formulaVersion:D.FORMULA};
}

function evaluateP14BShadowV1(sample,candidate){
  const spec=candidateV1(candidate),family=spec?.family||null;
  const result={candidateId:family,rectModelId:spec?.rectModelId??null,parameterSetId:spec?.parameterSetId??null,formulaVersion:D.FORMULA,
    evaluationStage:family==='B4'||family==='B5'?'temporal-deferred':'snapshot-B0-B3',status:'unknown',reasons:[],
    controlComparison:'unknown',stage:D.oneOf(own(sample,'stage'),D.STAGES)||'unknown',
    geometryQuality:family==='B0'?'not-required':'not-evaluated',movementQuality:family==='B0'?'not-required':'not-evaluated',
    areaFraction:null,xFraction:null,yFraction:null,maxAreaFraction:null,qualification:null};
  const c0=D.control(sample);
  const finish=(status,reason)=>({...result,status,reasons:reason?[reason]:[],controlComparison:status==='not-applicable'?'not-applicable':
    status==='unknown'||c0===null?'unknown':status==='pass'||c0===false?'agrees':'candidate-rejects-control'});
  if(!spec)return finish('unknown','invalid-candidate');
  const base=D.baseStatus(sample);
  if(base)return finish(['display-only','stale-identity','terminal'].includes(base)?'not-applicable':'unknown',base);
  // B0 must terminate here. Even a missing or accessor-backed P cannot affect it.
  if(family==='B0')return finish(c0===null?'unknown':c0?'pass':'fail',c0===null?'control-unobserved':c0?null:'control-ineligible');
  if(family==='B4'||family==='B5'){
    result.movementQuality='deferred';return finish('unknown','temporal-stage-deferred');
  }
  if(c0===null)return finish('unknown','control-unobserved');
  if(!c0)return finish('fail','control-ineligible');
  if(!spec.rectModelId||!spec.parametersValid)return finish('unknown','invalid-candidate');
  const models=items(own(sample,'plannedRegions'),D.MODELS.length);
  const matches=models?.filter(m=>own(m,'modelId')===spec.rectModelId)||[];
  if(matches.length!==1)return finish('unknown',matches.length?'ambiguous-planned-rect':'no-planned-rect');
  const model=matches[0];
  if(at(model,'evidence','pipFloating')===true)return finish('not-applicable','pip-geometry');
  const q=qualifyModelV1(sample,model);result.geometryQuality=q.quality;result.qualification=q;
  if(!q.valid)return finish('unknown','model-quality-insufficient');
  const g=geometryV1(own(model,'rect'),own(sample,'viewport'));
  Object.assign(result,{areaFraction:g.areaFraction,xFraction:g.xFraction,yFraction:g.yFraction,maxAreaFraction:g.maxAreaFraction});
  if(g.ix<=0||g.iy<=0)return finish('fail','outside-planned');
  if(family==='B1')return finish('pass');
  if(family==='B2')return finish(g.areaFraction>=spec.parameters.areaFraction?'pass':'fail',
    g.areaFraction>=spec.parameters.areaFraction?null:g.maxAreaFraction<spec.parameters.areaFraction?'threshold-unreachable-by-size':'below-fraction');
  return finish(g.xFraction>=spec.parameters.xFraction&&g.yFraction>=spec.parameters.yFraction?'pass':'fail',
    g.xFraction<spec.parameters.xFraction?'horizontal-fraction':g.yFraction<spec.parameters.yFraction?'below-fraction':null);
}
module.exports={SCHEMA:D.SCHEMA,FORMULA:D.FORMULA,MODELS:D.MODELS,CORES,geometryV1,openEnvelopeHeightV1,qualifyModelV1,candidateV1,evaluateP14BShadowV1};

},
"intext-p14b-shadow-ledger.cjs":function(require,module,exports){
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

}},cache=Object.create(null),shim=Object.freeze({Buffer:Object.freeze({byteLength:function utf8ByteLength(value, encoding = 'utf8') {
  if (typeof value !== 'string' || !['utf8', 'utf-8'].includes(encoding)) throw new TypeError('utf8-string-only');
  return new TextEncoder().encode(value).byteLength;
}})});
    const require=id=>{if(id==='node:buffer')return shim;const key=id.startsWith('./')?id.slice(2):id;
      if(!Object.hasOwn(defs,key))throw new TypeError('require-not-allowlisted');if(cache[key])return cache[key].exports;
      const module={exports:{}};cache[key]=module;defs[key](require,module,module.exports);return module.exports;};
    return require('intext-p14b-shadow-ledger.cjs');})(),function utf8ByteLength(value, encoding = 'utf8') {
  if (typeof value !== 'string' || !['utf8', 'utf-8'].includes(encoding)) throw new TypeError('utf8-string-only');
  return new TextEncoder().encode(value).byteLength;
},{profile:{"distribution":"IntextManager.js","coreSha256":"ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8","releaseInputId":"522c2cbe587304fdaedaa55faa9e86ceacb2b84f1109eda5ec5d15cc1388465c"},clock:()=>performance.now(),randomId:()=>{const a=new Uint8Array(12);crypto.getRandomValues(a);return Array.from(a,v=>v.toString(16).padStart(2,'0')).join('');},host:typeof window==='undefined'?null:window,sourceAttestor:null,evidenceKind:'UNBOUND-BROWSER'});}catch(_){return null;}})(); /*QA1B_RUNTIME_END*/

  constructor(config, gexpInstance) {
    try { this.#qa1b = IntextManager.#qaRuntime?.manager(this, typeof document==='undefined'?null:document)??null; } catch (_) {}
    this.config = config;
    this.gexp = gexpInstance;
    this.nodes = [];
    this.siteContext = this.getSiteContext();
    this.siteConfig = this.resolveSiteConfig();
    this.baseSiteConfig = this.siteConfig ? JSON.parse(JSON.stringify(this.siteConfig)) : null;
    this.intextQaCookieOverride = this.readIntextQaCookieOverride();
    this._intextQaCookieApplied = false;
    this._intextQaInclusionForced = false;
    this._intextQaCookieExclusionsBypassed = false;
    this._intextQaCookieExclusionsBypassSource = null;
    this.intextRandomSnapshot = null;
    this._intextSyntheticEventKeys = new Set();
    this._intextOpportunityDecisionKeys = new Set();
    this._intextContentIdentityByNavIndex = new Map();
    this._intextTelemetrySampled = this.gexp?.statsG?.telp === true;
    this._activeIntextPipNode = null;
    Object.defineProperty(this, "_intextPageInstanceId", {
      value: this.createIntextTelemetryId("intext-page"),
      writable: false,
      configurable: false,
      enumerable: false,
    });
    this.adUnitPath = this.extractStaticAdUnitPath();
    this.detectedAdUnitPath = null;
    this.detectedNetworkId = null;
    this.configuredNetworkId = this.normalizeIntextNetworkId(
      this.siteConfig?.gam?.networkId ?? this.config?.networkId,
    );
    this.requestNetworkId = null;
    this.networkIdResolutionSource = "unresolved";
    this.networkId = this.resolveIntextRequestNetworkId();
    if (window.gexpIntextDebug) intextDebugCollector.attachManager(this);
    ensureBaseStyles();

    if (!this.siteConfig) return;

    logIntext(`[IntextManager] site_config_resolved`, {
      hasSiteConfig: Boolean(this.siteConfig),
      hasDomainFilter: Boolean(this.siteConfig?.domainFilter),
      domainFilterEnabled: this.siteConfig?.domainFilter?.enabled === true,
    });

    if (this.siteConfig?.domainFilter?.enabled) {
      const filter = this.siteConfig?.domainFilter;

      if (filter.allowedDomains !== "all") {
        let currentDomain = null;
        const dl = window[filter.dataLayerObj] || window.utag_data;
        logIntext(`[IntextManager] domain_filter_datalayer_resolved`, {
          dataLayerObj: filter.dataLayerObj,
          dataLayerProp: filter.dataLayerProp,
          hasDataLayer: Boolean(dl),
        });

        if (dl) {
          const dlData = Array.isArray(dl) ? dl[0] : dl;
          if (dlData && dlData[filter.dataLayerProp]) {
            currentDomain = dlData[filter.dataLayerProp];
            logIntext(`[IntextManager] domain_filter_current_domain_resolved`, {
              source: "dataLayer",
              currentDomain,
            });
          }
        }

        if (!currentDomain && window.location) {
          currentDomain = window.location.hostname;
          logIntext(`[IntextManager] domain_filter_current_domain_resolved`, {
            source: "window.location",
            currentDomain,
          });
        }

        if (
          !filter.allowedDomains.some(domain => currentDomain.includes(domain))
          && this.intextQaCookieOverride?.enabled !== true
        ) {
          logIntext(`🛑 [IntextManager] Ejecución bloqueada. Dominio '${currentDomain}' no permitido.`);
          return;
        }
        if (
          !filter.allowedDomains.some(domain => currentDomain.includes(domain))
          && this.intextQaCookieOverride?.enabled === true
        ) {
          this.markIntextQaCookieApplied();
          logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
            key: "domainFilter.allowedDomains",
            currentDomain,
          });
        }
      }
    }

    if (this.siteConfig?.debug === true) {
      window.gexpIntextDebug = true;
    }
    this.recordIntextRuntimeIdentity();

    if (!this.gexp.isEnabled()) {
      if (this.intextQaCookieOverride?.enabled === true) {
        this.markIntextQaCookieApplied();
        logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
          key: "gexp.isEnabled",
          originalValue: false,
        });
      } else {
        return;
      }
    }

    const allowedTypes = this.siteConfig.allowedContentTypes || [];
    if (allowedTypes.length > 0 && !allowedTypes.includes(this.siteContext.contentType)) {
      logIntext(`[IntextManager] Disabled for content type: ${this.siteContext.contentType}. Allowed: ${allowedTypes.join(', ')}`);
      return;
    }

    if (this.siteConfig?.exclusions?.disableAll === true) {
      if (this.isIntextQaExclusionsBypassEnabled()) {
        this.markIntextQaExclusionsBypassApplied("constructor-exclusions.disableAll");
      } else {
        logIntext(`[IntextManager] ❌ BLOCKED by exclusions.disableAll = true`);
        return;
      }
    }
    const launchIntextPositions = () => {
      googletag.cmd.push(async () => {
        if (this.resolveAdUnit() === false) return;
        this.siteContext.contentType = this.detectContentType();
        logIntext(`[IntextManager] Detected content type: "${this.siteContext.contentType}"`);

        this.siteConfig = this.resolveContentTypeProfile(this.siteConfig, this.siteContext.contentType);
        if (!this.isContentTypeAllowed(this.siteConfig, this.siteContext.contentType, "[IntextManager]")) {
          return;
        }
        const snapshot = this.requiresIntextNativeRandom()
          ? await this.waitForIntextRandomSnapshotReady()
          : this.captureIntextRandomSnapshot();
        this.recordIntextRuntimeIdentity();
        if (!this.validateIntextRandomSnapshot(snapshot)) {
          this.registerIntextManagerDecision({
            navIndex: 0,
            scope: "initial",
            decision: "blocked",
            reason: "random-snapshot-unresolved",
          });
          this.registerIntextDiagnosticEvent({
            diagnosticKey: "random-snapshot-unresolved",
            "gexp-intext-decision": "blocked",
            "gexp-intext-decision-reason": "random-snapshot-unresolved",
          });
          return;
        }
        if (await this.isBlockedByExclusionsAfterTargetingReady()) {
          return;
        }

        if (!this.isAllowedByInclusions()) {
          return;
        }

        if (this.shouldBlockIntextByFallbackBlankControl()) {
          logIntext(`[IntextManager] intext_blocked_by_fallback_blank_cookie`);
          this.registerIntextManagerDecision({
            navIndex: 0,
            scope: "initial",
            decision: "blocked",
            reason: "fallback-blank-cookie",
          });
          return;
        }

        const placement = this.createIntextPositions();
        this.registerIntextManagerDecision({
          navIndex: 0,
          scope: "initial",
          decision: "allowed",
          reason: "passed",
          placement,
        });

        const infiniteScrollTypes = ["noticia", "noticia-especial"];
        if (this.siteConfig?.infiniteScroll?.enabled && infiniteScrollTypes.includes(this.siteContext.contentType)) {
          this.startNavContinuaObserver();
        }
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", launchIntextPositions);
    } else {
      launchIntextPositions();
    }
  }
  createIntextPositions() {
    try {
      const engine = new IntextPlacementEngine(
        this.siteConfig.dom,
        this.siteConfig.rules,
        null, IntextManager.#qp(this)
      );
      const placements = engine.findPlacements();
      const slotsConfig = this.siteConfig.slots;
      const maxSlots = slotsConfig?.maxSlots ?? Infinity;
      let slotsCreated = 0;

      if (!placements.length) return { result: "no-valid-placement", found: 0, created: 0 };
      if (Number(maxSlots) === 0) return { result: "max-slots-zero", found: placements.length, created: 0 };
      if (slotsConfig?.enabled === false) return { result: "all-slots-disabled", found: placements.length, created: 0 };

      placements.forEach((placement, index) => {
        if (slotsCreated >= maxSlots) {
          logIntext(
            `[IntextManager] Slot ${index}: SKIPPED — maxSlots limit reached (${maxSlots})`,
          );
          return;
        }

        if (slotsConfig) {
          if (!slotsConfig.enabled) {
            logIntext(
              `[IntextManager] Slots disabled globally — skipping all`,
            );
            return;
          }
          if (
            slotsConfig.enabledSlots &&
            !slotsConfig.enabledSlots.includes(index)
          ) {
            logIntext(
              `[IntextManager] Slot ${index}: DISABLED (not in enabledSlots: [${slotsConfig.enabledSlots}])`,
            );
            return;
          }
        }

        if (this.isSlotDisabledByExclusion(index)) {
          logIntext(
            `[IntextManager] Slot ${index}: DISABLED by exclusions.disableSlots`,
          );
          return;
        }

        const displayWrapper = this.createWrapperNode(index, "display");
        if (document.getElementById(displayWrapper.id)) {
          logIntext(`[IntextManager] duplicate_intext_wrapper_creation_blocked`, {
            slotCode: displayWrapper.id,
            nodeId: displayWrapper.dataset.gexpIntextNodeId,
            placementIndex: index,
            source: "createIntextPositions",
          });
          return;
        }
        placement.paragraph.parentNode.insertBefore(
          displayWrapper,
          placement.paragraph.nextSibling,
        );
        const displayContainer = new IntextContainer(
          displayWrapper,
          this.siteConfig.style,
        );

        const videoWrapper = this.createWrapperNode(index, "video");
        displayWrapper.parentNode.insertBefore(
          videoWrapper,
          displayWrapper.nextSibling,
        );
        const videoContainer = new IntextContainer(
          videoWrapper,
          this.siteConfig.style,
        );

        let nodeConfig = this.siteConfig;
        const slotOverrides = this.getSlotOverridesForNode(index, displayWrapper.id, this.siteConfig);
        if (slotOverrides) {
          nodeConfig = JSON.parse(JSON.stringify(this.siteConfig)); // deep clone
          // Deep merge each section
          for (const section of Object.keys(slotOverrides)) {
            if (
              typeof slotOverrides[section] === "object" &&
              slotOverrides[section] !== null &&
              !Array.isArray(slotOverrides[section])
            ) {
              nodeConfig[section] = IntextManager.deepMerge(nodeConfig[section] || {}, slotOverrides[section]);
            } else {
              nodeConfig[section] = slotOverrides[section];
            }
          }
          logIntext(
            `[IntextManager] Slot ${index}: applied overrides`,
            slotOverrides,
          );
        }

        logIntext(
          `[IntextManager] Slot ${index}: ENABLED (mode: ${nodeConfig.decision?.mode || "auto"}, threshold: ${nodeConfig.lazyLoad?.threshold || "default"}, maxCycles: ${nodeConfig.refresh?.maxCycles || "default"})`,
        );

        const node = new IntextNode({
          id: displayWrapper.id,
          videoId: videoWrapper.id,
          container: displayContainer,
          videoContainer: videoContainer,
          config: nodeConfig,
          manager: this,
          placement,
          slotIndex: index,
        }, IntextManager.#qp(this));
        displayContainer.ownerNode = node;
        videoContainer.ownerNode = node;
        this.nodes.push(node);
        slotsCreated++;
      });
      this.nodes.forEach((n) => n.initialize());
      return {
        result: slotsCreated > 0 ? "created" : "all-slots-disabled",
        found: placements.length,
        created: slotsCreated,
      };
    } catch (err) {
      this.registerIntextDiagnosticEvent({
        diagnosticKey: "create-intext-positions-failed",
        "gexp-intext-diagnostic-context": String(err?.message || err),
      });
      errorIntext("[IntextManager] Failed to create positions", err);
      return { result: "creation-error", found: 0, created: 0 };
    }
  }
  createIntextPositionsScoped(rootElement, scopedConfig, pncSuffix, navIndex, scopedContext = null) {
    try {
      const engine = new IntextPlacementEngine(
        scopedConfig.dom,
        scopedConfig.rules,
        rootElement, IntextManager.#qp(this)
      );
      const placements = engine.findPlacements();
      if (!placements.length) {
        logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: no valid placements found`);
        return { result: "no-valid-placement", found: 0, created: 0 };
      }

      const newNodes = [];
      const slotsConfigScoped = scopedConfig.slots;
      const maxSlotsScoped = slotsConfigScoped?.maxSlots ?? Infinity;
      let slotsCreatedScoped = 0;
      if (Number(maxSlotsScoped) === 0) return { result: "max-slots-zero", found: placements.length, created: 0 };
      if (slotsConfigScoped?.enabled === false) return { result: "all-slots-disabled", found: placements.length, created: 0 };

      placements.forEach((placement, index) => {
        if (slotsCreatedScoped >= maxSlotsScoped) {
          logIntext(`[IntextManager:NavContinua] navIndex=${navIndex} Slot ${index}: SKIPPED — maxSlots limit reached (${maxSlotsScoped})`);
          return;
        }
        const slotsConfig = scopedConfig.slots;
        if (slotsConfig) {
          if (!slotsConfig.enabled) return;
          if (slotsConfig.enabledSlots && !slotsConfig.enabledSlots.includes(index)) return;
        }

        if (this.isSlotDisabledByExclusion(index, scopedContext)) {
          logIntext(
            `[IntextManager:NavContinua] navIndex=${navIndex} Slot ${index}: DISABLED by scoped exclusions.disableSlots`,
          );
          return;
        }

        const displayWrapper = this.createWrapperNode(index, "display", pncSuffix);
        if (document.getElementById(displayWrapper.id)) {
          logIntext(`[IntextManager:NavContinua] duplicate_intext_wrapper_creation_blocked`, {
            slotCode: displayWrapper.id,
            nodeId: displayWrapper.dataset.gexpIntextNodeId,
            placementIndex: index,
            navIndex,
            source: "createIntextPositionsScoped",
          });
          return;
        }
        placement.paragraph.parentNode.insertBefore(
          displayWrapper,
          placement.paragraph.nextSibling
        );
        const displayContainer = new IntextContainer(
          displayWrapper,
          scopedConfig.style
        );

        const videoWrapper = this.createWrapperNode(index, "video", pncSuffix);
        displayWrapper.parentNode.insertBefore(
          videoWrapper,
          displayWrapper.nextSibling
        );
        const videoContainer = new IntextContainer(
          videoWrapper,
          scopedConfig.style
        );

        let nodeConfig = { ...scopedConfig };
        const slotOverrides = this.getSlotOverridesForNode(index, displayWrapper.id, scopedConfig);
        if (slotOverrides) {
          for (const section of Object.keys(slotOverrides)) {
            if (typeof slotOverrides[section] === 'object' && slotOverrides[section] !== null && !Array.isArray(slotOverrides[section])) {
              nodeConfig[section] = IntextManager.deepMerge(nodeConfig[section] || {}, slotOverrides[section]);
            } else {
              nodeConfig[section] = slotOverrides[section];
            }
          }
        }

        logIntext(
          `[IntextManager:NavContinua] navIndex=${navIndex} Slot ${index} (${displayWrapper.id}): ENABLED (mode: ${nodeConfig.decision?.mode || 'auto'})`
        );

        const nodeScopedContext = {
          ...(scopedContext || {}),
          navIndex,
        };
        if (scopedContext?.rootElement) {
          Object.defineProperty(nodeScopedContext, "rootElement", {
            value: scopedContext.rootElement,
            enumerable: false,
            configurable: false,
            writable: false,
          });
        }

        const node = new IntextNode({
          id: displayWrapper.id,
          videoId: videoWrapper.id,
          container: displayContainer,
          videoContainer: videoContainer,
          config: nodeConfig,
          manager: this,
          placement,
          slotIndex: index,
          navIndex: navIndex,
          scopedContext: nodeScopedContext,
        }, IntextManager.#qp(this));
        displayContainer.ownerNode = node;
        videoContainer.ownerNode = node;
        newNodes.push(node);
        this.nodes.push(node);
        slotsCreatedScoped++;
      });

      newNodes.forEach(n => n.initialize());
      this._navContinuaNodes.push({ navIndex, nodes: newNodes });
      logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: created ${newNodes.length} slot(s)`);
      return {
        result: slotsCreatedScoped > 0 ? "created" : "all-slots-disabled",
        found: placements.length,
        created: slotsCreatedScoped,
      };
    } catch (err) {
      errorIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: Failed to create positions`, err);
      return { result: "creation-error", found: 0, created: 0 };
    }
  }
  async onNewArticleDetected(mainElement, navIndex) {
    const scopedBaseConfig =
      this.baseSiteConfig ||
      this.siteConfig;
    const baseInfiniteScrollConfig =
      scopedBaseConfig?.infiniteScroll;
    if (!baseInfiniteScrollConfig) {
      return { handled: true, decision: "content-type-blocked", telemetryRegistered: false };
    }

    const scopedContext = this.resolveScopedAdContext(mainElement);
    const requestNetworkId = this.resolveIntextRequestNetworkId(scopedContext);
    if (!requestNetworkId) {
      return { handled: true, decision: "network-force-invalid", telemetryRegistered: false };
    }
    scopedContext.networkId = requestNetworkId;
    scopedContext.adUnitPath =
      this.resolveIntextDisplayAdUnitPath(scopedContext);
    const resolvedIdentity = await this.resolveScopedIntextNewsIdentity(mainElement, navIndex, scopedContext);
    const contentIdentity = this.captureIntextContentIdentity(navIndex, mainElement, scopedContext, resolvedIdentity);
    const contentType = scopedContext.contentType || this.detectContentType(mainElement);
    logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: content type = "${contentType}"`);

    let scrollConfig = IntextManager.deepMerge(
      { ...scopedBaseConfig },
      {},
    );
    const scopedNetworkOverride =
      this.getIntextNetworkOverride(requestNetworkId);
    if (scopedNetworkOverride) {
      scrollConfig = IntextManager.deepMerge(
        scrollConfig,
        scopedNetworkOverride,
      );
    }
    const ctProfile = scrollConfig?.contentTypes?.[contentType];
    if (ctProfile) {
      scrollConfig = IntextManager.deepMerge(scrollConfig, ctProfile);
    }
    const infiniteScrollOverrides =
      scrollConfig?.infiniteScroll?.overrides;
    if (infiniteScrollOverrides) {
      scrollConfig = IntextManager.deepMerge(
        scrollConfig,
        infiniteScrollOverrides,
      );
    }
    if (!this.isContentTypeAllowed(scrollConfig, contentType, "[IntextManager:NavContinua]")) {
      return { handled: true, decision: "content-type-blocked", telemetryRegistered: false };
    }

    const scopedRuleContext = {
      ...scopedContext,
      contentType,
      navIndex,
      be_page_newsID: contentIdentity.newsId,
      intextContentIdentity: contentIdentity,
      siteConfig: scrollConfig,
    };
    Object.defineProperty(scopedRuleContext, "rootElement", {
      value: scopedContext.rootElement,
      enumerable: false,
      configurable: false,
      writable: false,
    });

    if (await this.isBlockedByExclusionsAfterTargetingReady(scopedRuleContext)) {
      logIntext(
        `[IntextManager:NavContinua] navcontinua_exclusions_blocked - navIndex=${navIndex}, adUnitPath=${scopedRuleContext.adUnitPath || "missing"}`,
      );
      return { handled: true, decision: "excluded", telemetryRegistered: false };
    }

    if (!this.isAllowedByInclusions(scopedRuleContext)) {
      logIntext(`[IntextManager:NavContinua] navcontinua_inclusions_allowed - navIndex=${navIndex}, allowed=false`);
      return { handled: true, decision: "not-in-cohort", telemetryRegistered: false };
    }

    logIntext(`[IntextManager:NavContinua] navcontinua_inclusions_allowed - navIndex=${navIndex}, allowed=true`);

    if (this.shouldBlockIntextByFallbackBlankControl()) {
      const registered = this.registerIntextManagerDecision({
        navIndex,
        scope: "navcontinua",
        decision: "blocked",
        reason: "fallback-blank-cookie",
        contentType,
        rootElement: mainElement,
        scopedContext: scopedRuleContext,
      });
      logIntext(`[IntextManager:NavContinua] navcontinua_blocked_by_fallback_blank_cookie`, { navIndex });
      return { handled: true, decision: "blocked", telemetryRegistered: registered === true };
    }

    const pncSuffix = navIndex >= 1 ? `-pnc-${navIndex}` : '';
    const placement = this.createIntextPositionsScoped(mainElement, scrollConfig, pncSuffix, navIndex, scopedRuleContext);

    const telemetryRegistered = this.registerIntextManagerDecision({
      navIndex,
      scope: "navcontinua",
      decision: "allowed",
      reason: "passed",
      contentType,
      rootElement: mainElement,
      scopedContext: scopedRuleContext,
      placement,
    });
    return { handled: true, decision: "allowed", telemetryRegistered: telemetryRegistered === true };
  }
}
class IntextPlacementEngine {
  #qa1b = null;
  static #qp(self){try{return self.#qa1b;}catch(_){return null;}}
  static #qt(self,...args){try{return self.#qa1b?.tap(...args);}catch(_){}}
  static #qv(self,kind,value,...args){IntextPlacementEngine.#qt(self,kind,...args,value);return value;}
  static #qr(self,value,node,anchor){IntextPlacementEngine.#qt(self,'result',node,anchor,value);return value;}
  static #qf(self,value,node,creative){IntextPlacementEngine.#qt(self,'control',node,'C1',creative,value);return value;}
  static #ticket(self,node,caller,token,owner=null){try{return self.#qa1b?.ticket(node,caller,token,owner)??null;}catch(_){return null;}}
  

  constructor(domConfig = {}, rulesConfig = {}, rootElement = null, __qa1bPort = null) {
    try { this.#qa1b = __qa1bPort; } catch (_) {}
    this.domConfig = domConfig;
    this.rulesConfig = rulesConfig;
    const searchRoot = rootElement || document;
    const bodySelector = domConfig.articleBodySelector || '.ue-c-article__body';
    this.articleBody = searchRoot.querySelector(bodySelector);
    IntextPlacementEngine.#qt(this,'root', this, document, this.articleBody);

    groupIntext('%c[IntextPlacementEngine] 🔍 DOM Discovery', 'color:#9C27B0;font-weight:bold');
    if (this.articleBody) {
      logIntext(`✅ Article body found: "${bodySelector}"`, this.articleBody);
    } else {
      warnIntext(`❌ Article body NOT found: "${bodySelector}"`);
    }
    groupEndIntext();
  }
  findPlacements() {
    const paragraphSelector = this.domConfig.paragraphSelector || 'p';

    if (!this.articleBody) {
      warnIntext('[IntextPlacementEngine] ⛔ No article body — cannot find placements.');
      return [];
    }

    const rawElements = Array.from(this.articleBody.querySelectorAll(paragraphSelector));
    const paragraphs = rawElements.filter((p) => this.isValidParagraph(p));

    groupIntext(`%c[IntextPlacementEngine] 📋 Elements — selector: "${paragraphSelector}"`, 'color:#9C27B0;font-weight:bold');
    logIntext(`Total found:  ${rawElements.length}`);
    logIntext(`Valid (after filtering): ${paragraphs.length}`);
    if (rawElements.length !== paragraphs.length) {
      logIntext(`Filtered out: ${rawElements.length - paragraphs.length} (too short or inside blocker)`);
    }
    if (paragraphs.length > 0) {
      logIntext('First valid element:', paragraphs[0]);
      logIntext('Last valid element: ', paragraphs[paragraphs.length - 1]);
    }
    groupEndIntext();

    if (!paragraphs.length) {
      warnIntext('[IntextPlacementEngine] ⛔ No valid elements found after filtering.');
      return [];
    }

    let rules = this.rulesConfig.placements;
    if (!Array.isArray(rules)) {
      rules = [];
      if (this.rulesConfig.defaultPlacement) rules.push(this.rulesConfig.defaultPlacement);
      if (this.rulesConfig.allowMultiple && this.rulesConfig.fallbackPlacement) rules.push(this.rulesConfig.fallbackPlacement);
      if (this.rulesConfig.allowMultiple && this.rulesConfig.thirdPlacement) rules.push(this.rulesConfig.thirdPlacement);
    }

    groupIntext(`%c[IntextPlacementEngine] 📌 Evaluating ${rules.length} placement rule(s)`, 'color:#9C27B0;font-weight:bold');
    const placements = [];
    let lastIndex = -1;
    for (const rule of rules) {
      // For the first slot, always evaluate. For subsequent, only if allowMultiple.
      if (placements.length > 0 && this.rulesConfig.allowMultiple !== true) break;
      const ruleIdx = placements.length;
      const slotCode = ruleIdx === 0 ? "gexp-intext" : `gexp-intext-${ruleIdx + 1}`;
      const result = this.evaluatePlacement(paragraphs, rule, lastIndex, slotCode);
      if (result) {
        placements.push(result);
        lastIndex = result.paragraphIndex;
        const el = result.paragraph;
        const preview = (el.innerText || el.textContent || '').slice(0, 60).replace(/\n/g, ' ');
        logIntext(`✅ Slot ${ruleIdx}: after element[${result.paragraphIndex}] → "${preview}…"`, el);
      } else {
        logIntext(`❌ Slot ${ruleIdx}: rule [${rule}] — no valid position (lastIndex=${lastIndex}, total=${paragraphs.length})`);
      }
    }
    groupEndIntext();

    logIntext(`%c[IntextPlacementEngine] ✅ ${placements.length} placement(s) resolved`, 'color:#4CAF50;font-weight:bold');
    return IntextPlacementEngine.#qv(this,'placements', placements, this);
  }
}
class IntextNode {
  #qa1b = null;
  static #qp(self){try{return self.#qa1b;}catch(_){return null;}}
  static #qt(self,...args){try{return self.#qa1b?.tap(...args);}catch(_){}}
  static #qv(self,kind,value,...args){IntextNode.#qt(self,kind,...args,value);return value;}
  static #qr(self,value,node,anchor){IntextNode.#qt(self,'result',node,anchor,value);return value;}
  static #qf(self,value,node,creative){IntextNode.#qt(self,'control',node,'C1',creative,value);return value;}
  static #ticket(self,node,caller,token,owner=null){try{return self.#qa1b?.ticket(node,caller,token,owner)??null;}catch(_){return null;}}
  

  constructor({
    id,
    videoId,
    container,
    videoContainer,
    config,
    manager,
    placement,
    slotIndex = 0,
    navIndex = 0,
    scopedContext = null,
  }, __qa1bPort = null) {
    try { this.#qa1b = __qa1bPort; } catch (_) {}
    this.id = id;
    this.videoId = videoId;
    this.container = container;
    this.videoContainer = videoContainer;
    this.config = config;
    this.manager = manager;
    this.placement = placement;
    this.slotIndex = slotIndex;
    this.navIndex = navIndex;
    this.scopedContext = scopedContext;
    this.state = "idle";
    this.waterfall = null;
    this.activeCreative = null;
    this.wa = null;
    this.slot = null;
    this._slotGptApi = null;
    this._slotPubadsService = null;
    this._slotGptSource = null;
    this._initialDisplayRenderHandler = null;
    this._persistentDisplayRenderHandler = null;
    this._coordinator = null;
    this.lockedHeight = 0;
    this._videoTiming = null;
    this._intextTelemetryCycleId = 0;
    this._intextTelemetryCycle = null;
    this._pendingIntextTelemetry = {};
    this._intextViewportObserver = null;
    this._intextViewportObservedEl = null;
    this._intextViewportEnterAt = null;
    this._intextViewportVisibleMs = 0;
    this._intextTelemetryCommittedForCycle = false;
    this._intextTelemetryCommittedReasons = {};
    this._intextTelemetryFinalCommitted = false;
    this._lastImaAdDuration = null;
    this._house1x1AutoRefreshAttemptsForCycle = 0;
    this._house1x1AutoRefreshAttemptsPerSlot = 0;
    this._activeRenderToken = 0;
    this._renderTokenSeq = 0;
    this._renderInProgress = false;
    this._renderCompleted = false;
    this._displayRequestInFlight = false;
    this._lastVisualCycleId = 0;
    this._visualState = "idle";
    this._destroyedOrResetToken = 0;
    this._renderTimers = [];
    this._intextTransitionBridge = null;
    this._intextRealRenderTelemetryCommittedForToken = null;
    this._fallbackBlankControlCountedTokens = new Set();
    this._fallbackBlankControlCountedEvents = new Set();
    this._nodeActive = true;
    this._intextPipState = "inline";
    this._intextPipDismissedRenderToken = null;
    this._intextPipEnteredAt = null;
    this._intextPipVisibleMs = 0;
    this._intextPipEntryCount = 0;
    this._intextPipAnchorEverVisible = false;
    this._intextPipFirstFrameConfirmed = false;
    this._intextPipPlayerRevealed = false;
    this._intextPipCloseButton = null;
    this._intextPipCloseHandler = null;
    this._intextPipPlayerElement = null;
    this._intextPipOriginalInlineStyles = null;
    this._intextPipLastIntersectionRatio = null;
    this._intextPipLastExitPlayedPct = null;
    this._intextPipPlaybackActive = false;
    this._intextPipPlaybackSource = "unresolved";
    IntextNode.#qt(this,'node', this, manager, placement, document, navIndex, scopedContext);
    if (window.gexpIntextDebug) {
      intextDebugCollector.attachManager(this.manager);
      intextDebugCollector.recordTimeline("created", { node: this, slotId: this.id });
    }
  }
  initialize() {
    this.wa = new WindowArray(
      this.id,
      this.manager.gexp.cfg,
      this.manager.gexp,
    );

    if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
      const wrapExistingCallback = (methodName, metric, details = () => ({})) => {
        const original = this.wa?.[methodName];
        if (typeof original !== "function") return;
        this.wa[methodName] = (...args) => {
          const result = original.apply(this.wa, args);
          intextDebugCollector.recordMetric(metric, {
            node: this,
            element: this.container?.getElement?.(),
            ...details(...args),
          });
          return result;
        };
      };
      wrapExistingCallback("onRequested", "display_slot_requested", () => ({ source: "window-array" }));
      wrapExistingCallback("response", "display_slot_response_received", (event = {}) => {
        const responseInfo = event?.slot?.getResponseInformation?.() || {};
        return {
          source: "window-array",
          lineItemId: responseInfo.lineItemId,
          creativeId: responseInfo.creativeId,
          campaignId: responseInfo.campaignId,
          advertiserId: responseInfo.advertiserId,
        };
      });
      wrapExistingCallback("onLoaded", "display_onload", () => ({ source: "window-array" }));
      wrapExistingCallback("onViewable", "display_impression_viewable", () => ({
        source: "window-array",
        impressionViewable: true,
        inViewPercentage: this.wa?.cI?.adMaxViewability ?? null,
        maxInViewPercentage: this.wa?.cI?.adMaxViewability ?? null,
      }));
      wrapExistingCallback("onSlotVisibilityChanged", "display_visibility_changed", (inViewPercentage) => ({
        source: "window-array",
        inViewPercentage,
        maxInViewPercentage: this.wa?.cI?.adMaxViewability ?? inViewPercentage,
      }));
    }

    // Block native GEXP core from auto-refreshing Intext slots. 
    // Native refresh bypasses our waterfall, corrupts randoms, ignores video state, and injects empty HBs.
    this.wa.refreshSlot = () => {
      logIntext(`[Intext:Display:${this.id}] Blocked native GEXP refresh. Intext manages its own refresh lifecycle.`);
    };

    this.manager.gexp.windows[this.id] = this.wa;

    this.waterfall = new IntextWaterfall({
      node: this,
      container: this.container,
      config: this.config,
      gexp: this.manager.gexp,
      wa: this.wa,
    }, IntextNode.#qp(this));

    this.waterfall.init();
  }
  getIntextTelemetryElement() {
    try {
      if (this.telemetryAnchor) return IntextNode.#qv(this,'anchor', this.telemetryAnchor, this);
      if (this.placement?.paragraph) return IntextNode.#qv(this,'anchor', this.placement.paragraph, this);
      const displayEl = this.container?.getElement?.() || null;
      const videoEl = this.videoContainer?.getElement?.() || null;
      if (this.state === "video") return IntextNode.#qv(this,'anchor', videoEl || displayEl, this);
      return IntextNode.#qv(this,'anchor', displayEl || videoEl, this);
    } catch (e) {
      return IntextNode.#qv(this,'anchor', null, this);
    }
  }
  getReadinessViewportState() {
    const anchor = this.getIntextTelemetryElement();
    if (!anchor || anchor.isConnected === false) return IntextNode.#qr(this,{ eligible: false, reason: "anchor-missing", distancePx: null }, this, anchor);
    const rect = anchor.getBoundingClientRect?.();
    if (!rect) return IntextNode.#qr(this,{ eligible: false, reason: "geometry-unavailable", distancePx: null }, this, anchor);
    const height = window.innerHeight || document.documentElement?.clientHeight || 0;
    const width = window.innerWidth || document.documentElement?.clientWidth || 0;
    const bottom = Number.isFinite(rect.bottom) ? rect.bottom : rect.top + rect.height;
    const right = Number.isFinite(rect.right) ? rect.right : rect.left + rect.width;
    const hidden = document.hidden === true || document.visibilityState === "hidden";
    const sized = [rect.top, rect.left, rect.width, rect.height, bottom, right].every(Number.isFinite)
      && rect.width > 0 && rect.height > 0 && width > 0 && height > 0;
    let rendered = !anchor.getClientRects || anchor.getClientRects().length > 0;
    for (let el = anchor; rendered && el; el = el.parentElement) {
      const css = window.getComputedStyle?.(el);
      if (css && (css.display === "none" || /^(hidden|collapse)$/.test(css.visibility) || css.opacity === "0")) rendered = false;
    }
    const overlapX = sized ? Math.max(0, Math.min(right, width) - Math.max(rect.left, 0)) : 0;
    const overlapY = sized ? Math.max(0, Math.min(bottom, height) - Math.max(rect.top, 0)) : 0;
    const visible = sized && rendered && overlapX > 0 && overlapY > 0;
    const reason = hidden ? "document-hidden" : !sized ? "anchor-zero-or-invalid-size" : !rendered ? "anchor-not-rendered"
      : bottom <= 0 ? "passed" : rect.top >= height ? "below" : overlapX === 0 ? "outside-horizontal" : "visible";
    return IntextNode.#qr(this,{ eligible: !hidden && visible, reason, distancePx: Math.round(rect.top - height),
      intersectionRatio: sized && rendered ? (overlapX * overlapY) / (rect.width * rect.height) : 0 }, this, anchor);
  }
  waitForViewport(renderToken = this._activeRenderToken, source = "waitForViewport", owner = null, __qa1bTicket = null) {
    const startedAt = Date.now();
    const format = source.startsWith("showDisplay") ? "display" : "video";
    this.waterfall?.recordReadiness?.(`${format}_viewport_wait_started`, { source, renderToken, winnerFormat: format });
    return new Promise(resolve => {
      let observer = null, settled = false;
      const anchor = this.getIntextTelemetryElement();
      const finish = result => {
        if (settled) return;
        settled = true;
      IntextNode.#qt(this,'wait-finished',this,__qa1bTicket); observer?.disconnect();
        document.removeEventListener?.("visibilitychange", check);
        window.removeEventListener?.("scroll", check);
        window.removeEventListener?.("resize", check);
        this._viewportWaits?.delete(finish);
        this.waterfall?.recordReadiness?.(`${format}_viewport_wait_resolved`, { source, renderToken, winnerFormat: format, reason: result || "visible", durationMs: Date.now() - startedAt });
        resolve(result);
      };
      const check = () => {
        if (!this.isActiveRenderToken(renderToken, source)) return finish("stale");
        const state = this.getReadinessViewportState();
      IntextNode.#qt(this,'wait', this, renderToken, source, owner, state, __qa1bTicket);
        if (state.reason === "anchor-missing") return finish("stale");
        if (state.eligible) finish();
      };
      finish.owner = owner;
      (this._viewportWaits ||= new Set()).add(finish);
      document.addEventListener?.("visibilitychange", check);
      if (typeof IntersectionObserver !== "undefined" && anchor) {
        observer = new IntersectionObserver(check, { threshold: 0, rootMargin: "0px" });
        observer.observe(anchor);
      } else {
        window.addEventListener?.("scroll", check, { passive: true });
        window.addEventListener?.("resize", check);
      }
      check();
    });
  }
  startIntextTelemetryCycle(trigger, extra = {}) {
    this.teardownIntextViewportTelemetryObserver();
    this._intextTelemetryCycleId += 1;
    IntextNode.#qt(this,'cycle', this, this._intextTelemetryCycleId);
    if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
      this._intextDebugTimings = { cycleStartedAt: null, requestStartedAt: null, imaLoadedAt: null, startedAt: null, firstFrameAt: null, completedAt: null };
      intextDebugCollector.recordMetric("cycle_started", {
        node: this,
        trigger,
        pipEnabled: this.getIntextPipConfig().enabled === true,
      });
    }
    this._pendingIntextTelemetry = {};
    this._intextViewportEnterAt = null;
    this._intextViewportVisibleMs = 0;
    this._intextTelemetryCommittedForCycle = false;
    this._intextTelemetryCommittedReasons = {};
    this._intextTelemetryFinalCommitted = false;
    this._intextTelemetryFinalDeltaCommitted = false;
    this._house1x1AutoRefreshAttemptsForCycle = 0;
    this.clearIntextTelemetryCycleCI();

    const isRefresh = trigger === "refresh";
    const isFallback = trigger === "fallback";
    const contentIdentity = this.manager?.captureIntextContentIdentity?.(
      this.navIndex || 0,
      null,
      this.scopedContext || null,
    ) || {};
    const cycle = {
      "gexp-intext-telemetry-event-type": "slot-cycle",
      "gexp-intext-telemetry-sampled": this.manager?._intextTelemetrySampled === true ? "true" : "false",
      "gexp-intext-page-instance-id": String(this.manager?._intextPageInstanceId || "unresolved"),
      // Canonical correlation key for every Intext cycle, including the
      // explicit unknown-news fallback when no real news ID is available.
      "gexp-intext-content-id": String(contentIdentity.id || `unknown-news:${this.navIndex || 0}`),
      "gexp-intext-content-id-source": String(contentIdentity.source || "unresolved"),
      domain: String(this.manager?.getHostnameNormalized?.(this.manager?.siteContext?.site) || "unknown"),
      country: String(this.manager?.resolveIntextCountry?.() || "unknown"),
      contentType: String(this.scopedContext?.contentType || this.manager?.siteContext?.contentType || "unknown"),
      timestamp: String(Date.now()),
      "gexp-intext-cycle-id": String(this._intextTelemetryCycleId),
      "gexp-intext-position": String(this.id || "unknown"),
      "gexp-intext-load-trigger": String(trigger || "unknown"),
      "gexp-intext-is-refresh": isRefresh ? "true" : "false",
      "gexp-intext-refresh": isRefresh ? "true" : "false",
      "gexp-intext-is-fallback": isFallback ? "true" : "false",
      "gexp-intext-fallback": isFallback ? "true" : "false",
      "gexp-intext-refresh-blocked": "false",
      "gexp-intext-refresh-blocked-reason": "none",
      "gexp-intext-ever-in-viewport": "false",
      "gexp-intext-viewport-visible-ms": "0",
      ...this.manager?.getIntextNetworkTelemetry?.(this.scopedContext),
      "gexp-intext-pip-enabled": this.getIntextPipConfig().enabled === true ? "true" : "false",
      "gexp-intext-pip-effective-enabled": this.isIntextPipEffectiveEnabled() ? "true" : "false",
      "gexp-intext-pip-slot-enabled": this.isIntextPipSlotEnabled() ? "true" : "false",
      "gexp-intext-pip-targeting-allowed": "true",
      "gexp-intext-pip-targeting-reason": "allowed",
      "gexp-intext-pip-inclusion-site-matched": "false",
      "gexp-intext-pip-inclusion-keyvalue-matched": "false",
      "gexp-intext-pip-exclusion-site-matched": "false",
      "gexp-intext-pip-exclusion-keyvalue-matched": "false",
      "gexp-intext-pip-targeting-matched-key": "none",
      "gexp-intext-pip-targeting-matched-value": "none",
      "gexp-intext-pip-playback-source": String(this._intextPipPlaybackSource || "unresolved"),
      "gexp-intext-pip-video-playing": this._intextPipPlaybackActive ? "true" : "false",
      "gexp-intext-pip-entered": "false",
      "gexp-intext-pip-entry-count": "0",
      "gexp-intext-pip-visible-ms": "0",
      "gexp-intext-pip-dismissed": "false",
      "gexp-intext-pip-ended-while-active": "false",
      "gexp-intext-pip-last-exit-reason": "none",
      "gexp-intext-pip-entry-played-pct": "unknown",
      "gexp-intext-pip-exit-played-pct": "unknown",
      "gexp-intext-render-waited-for-fetch": "false",
      "gexp-intext-render-wait-for-fetch-ms": "0",
      "gexp-intext-pending-auction-used": "false",
      "gexp-intext-pending-auction-expired": "false",
      "gexp-intext-pending-auction-age-ms": "0",
      "gexp-intext-pending-auction-restarted": "false",
      "gexp-intext-render-token": String(this._activeRenderToken || 0),
      "gexp-intext-render-attempt": String(this._renderTokenSeq || 0),
      "gexp-intext-visual-state": String(this._visualState || "idle"),
      ...this.manager?.getIntextRandomTelemetry?.(),
    };
    if (contentIdentity.resolved === true && contentIdentity.newsId) {
      cycle.be_page_newsID = String(contentIdentity.newsId);
    }
    const initPageMs = this.getIntextInitPageMs();
    const startDistance = this.getIntextDistancePx();
    const maxDelayMs = this.config?.loading?.maxDelayMs;
    const hasTimer = typeof maxDelayMs === "number" && Number.isFinite(maxDelayMs) && maxDelayMs >= 0;
    const loadingExperiment = this.config?.loading?._experiment || {};
    const adjacencyMeta = this.placement?.adjacencyMeta || {};
    const qaCookieApplied = this.manager?._intextQaCookieApplied === true;
    const loadingExperimentValue = loadingExperiment.enabled ? "true" : "false";
    Object.assign(cycle, {
      "gexp-intext-root-margin": String(this.config?.loading?.renderRootMargin || this.config?.loading?.rootMargin || "200px 0px"),
      "gexp-intext-timer-delay-ms": hasTimer ? String(maxDelayMs) : "disabled",
      "gexp-intext-has-timer": hasTimer ? "true" : "false",
      "gexp-intext-loading-experiment": loadingExperimentValue,
      "gexp-intext-loading-experiment-enabled": loadingExperiment.enabled === true ? "true" : "false",
      "gexp-intext-loading-experiment-resolved": loadingExperiment.resolved === true ? "true" : "false",
      "gexp-intext-loading-experiment-name": String(loadingExperiment.experimentName || "none"),
      "gexp-intext-loading-variant": String(loadingExperiment.variant || "default"),
      "gexp-intext-loading-key": String(loadingExperiment.key || "random1"),
      "gexp-intext-loading-key-value": String(loadingExperiment.keyValue || ""),
      "gexp-intext-loading-key-source": String(loadingExperiment.keySource || "unresolved"),
      "gexp-intext-loading-lookup-slot": String(loadingExperiment.lookupSlot || this.id || "unknown"),
      "gexp-intext-loading-fallback-reason": String(loadingExperiment.fallbackReason || "none"),
      ...this.manager?.getIntextQaCookieTelemetry?.(qaCookieApplied),
      ...this.manager?.getFallbackBlankControlTelemetry?.(),
      "gexp-intext-fetch-root-margin": String(this.config?.loading?.fetchRootMargin || this.config?.loading?.renderRootMargin || this.config?.loading?.rootMargin || "200px 0px"),
      "gexp-intext-render-root-margin": String(this.config?.loading?.renderRootMargin || this.config?.loading?.rootMargin || "200px 0px"),
      "gexp-intext-max-delay-ms": hasTimer ? String(maxDelayMs) : "disabled",
      "gexp-intext-max-fetch-to-render-ms": String(this.config?.loading?.maxFetchToRenderMs ?? "disabled"),
      "gexp-intext-load-observer-target": String(this._intextLoadObserverTarget || "wrapper"),
      "gexp-intext-slot-id": String(this.id || "unknown"),
      "gexp-intext-slot-index": String(this.slotIndex ?? 0),
      "gexp-intext-nav-index": String(this.navIndex || 0),
      "gexp-intext-paragraph-index": this.placement?.paragraphIndex != null ? String(this.placement.paragraphIndex) : "unknown",
      "gexp-intext-paragraph-number": this.placement?.paragraphIndex != null ? String(this.placement.paragraphIndex + 1) : "unknown",
      "gexp-intext-placement-rule": this.placement?.placementRule ? JSON.stringify(this.placement.placementRule) : "unknown",
      "gexp-intext-valid-paragraphs-count": this.placement?.validParagraphsCount != null ? String(this.placement.validParagraphsCount) : "unknown",
      "gexp-intext-adjacency-enabled": adjacencyMeta.enabled === true ? "true" : "false",
      "gexp-intext-adjacency-triggered": adjacencyMeta.triggered === true ? "true" : "false",
      "gexp-intext-adjacency-original-paragraph": adjacencyMeta.originalParagraph != null ? String(adjacencyMeta.originalParagraph) : "unknown",
      "gexp-intext-adjacency-final-paragraph": adjacencyMeta.finalParagraph != null ? String(adjacencyMeta.finalParagraph) : "unknown",
      "gexp-intext-adjacency-shifted": adjacencyMeta.shifted === true ? "true" : "false",
      "gexp-intext-adjacency-shift-direction": String(adjacencyMeta.shiftDirection || "none"),
      "gexp-intext-adjacency-shift-distance": String(adjacencyMeta.shiftDistance ?? 0),
      "gexp-intext-adjacency-fallback-original": adjacencyMeta.fallbackOriginal === true ? "true" : "false",
      "gexp-intext-adjacency-min-final-paragraph-index": adjacencyMeta.minFinalParagraphIndex != null ? String(adjacencyMeta.minFinalParagraphIndex) : "none",
      "gexp-intext-adjacency-candidate-rejected-reason": String(adjacencyMeta.candidateRejectedReason || "none"),
      "gexp-intext-adjacency-reason": String(adjacencyMeta.reason || "not-triggered"),
      ...this.getIntextTelemetryElementMeta(),
    });
    if (initPageMs !== null) cycle["gexp-intext-init-page-ms"] = String(initPageMs);
    if (startDistance !== null) cycle["gexp-intext-load-start-distance-px"] = String(startDistance);
    if (trigger === "house-1x1-refresh") {
      cycle["gexp-intext-is-refresh"] = "false";
      cycle["gexp-intext-refresh"] = "false";
      cycle["gexp-intext-is-technical-refresh"] = "true";
      cycle["gexp-intext-technical-refresh-reason"] = "house-lineitem-sentinel";
    }

    this._intextTelemetryCycle = cycle;
    const playbackState = this.getIntextPipPlaybackState();
    this.mergeIntextTelemetry({
      "gexp-intext-pip-playback-source": playbackState.source,
      "gexp-intext-pip-video-playing": playbackState.playing ? "true" : "false",
    });
    this.resolveIntextPipTargetingEligibility();
    this.mergeIntextTelemetry(extra);
    this.setupIntextViewportTelemetryObserver();
    this.flushIntextTelemetryToCI();
  }
  beginVisualRender(source = "unknown", trigger = "unknown") {
    this.cancelViewportWaits?.("stale");
    if (source !== "render_started" || this.waterfall?._videoPreparation?.boundToken) this.waterfall?.cancelVideoPreparation?.("new-render-cycle");
    if (this.activeCreative && !this.activeCreative._destroyed) {
      this.activeCreative.abort?.();
      this.activeCreative.destroy?.();
    }
    if (Number(this._activeRenderToken) > 0) {
      this.cleanupIntextPip("stale-render-token");
    }
    this._renderTokenSeq += 1;
    this._activeRenderToken = this._renderTokenSeq;
    IntextNode.#qt(this,'token', this, this._activeRenderToken);
    this._renderInProgress = true;
    this._renderCompleted = false;
    this._displayRequestInFlight = false;
    this._lastVisualCycleId = this._intextTelemetryCycleId;
    this._visualState = source;
    this.resetIntextPipState(this._activeRenderToken);
    const pipEnabled =
      this.getIntextPipConfig?.().enabled === true;
    const pipSlotEnabled =
      this.isIntextPipSlotEnabled?.() === true;
    const pipEffectiveEnabled =
      this.isIntextPipEffectiveEnabled?.() === true;
    this.mergeIntextTelemetry({
      "gexp-intext-render-token": String(this._activeRenderToken),
      "gexp-intext-render-attempt": String(this._renderTokenSeq),
      "gexp-intext-visual-state": this._visualState,
      "gexp-intext-pip-enabled": pipEnabled ? "true" : "false",
      "gexp-intext-pip-effective-enabled": pipEffectiveEnabled ? "true" : "false",
      "gexp-intext-pip-slot-enabled": pipSlotEnabled ? "true" : "false",
    });
    if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
      intextDebugCollector.recordMetric("video_pip_config_effective", {
        node: this,
        source,
        trigger,
        pipEnabled,
        pipEffectiveEnabled,
        pipSlotEnabled,
      });
    }
    this.applyIntextWrapperDebugAttributes(this.container?.getElement?.(), {
      renderToken: this._activeRenderToken,
      visualState: this._visualState,
    });
    this.applyIntextWrapperDebugAttributes(this.videoContainer?.getElement?.(), {
      renderToken: this._activeRenderToken,
      visualState: this._visualState,
      slotCode: this.videoId || this.id,
    });
    if (source === "render_started") this.waterfall?.claimVideoPreparation?.(this._activeRenderToken);
    return this._activeRenderToken;
  }
  invalidateVisualCallbacks(source = "unknown") {
    this.cancelViewportWaits?.("stale");
    this.waterfall?.cancelVideoPreparation?.("callbacks-invalidated");
    this.cleanupIntextPip(source === "reset" ? "reset" : "stale-render-token");
    this._destroyedOrResetToken += 1;
    this._renderTokenSeq += 1;
    this._activeRenderToken = this._renderTokenSeq;
    IntextNode.#qt(this,'invalidate', this);
    this._renderInProgress = false;
    this._renderCompleted = false;
    this._displayRequestInFlight = false;
    this._visualState = source;
    this.clearRenderTimers();
    this.mergeIntextTelemetry({
      "gexp-intext-render-token": String(this._activeRenderToken),
      "gexp-intext-visual-state": this._visualState,
    });
    logIntext(`[Intext:Display:${this.id}] intext_node_reset_callbacks_invalidated`, {
      slotCode: this.id,
      activeToken: this._activeRenderToken,
      cycleId: this._intextTelemetryCycleId,
      visualState: this._visualState,
    });
  }
  async buildAndPlayVideo(gamVideoTagUrl, renderToken = this._activeRenderToken, trigger = "unknown") {
    if (!this.isActiveRenderToken(renderToken, "buildAndPlayVideo:start", trigger)) return false;
    if (!this.waterfall?._videoPreparation) this.waterfall?.setupVideoPreparation?.({ winner: "video" }, renderToken);
    let prepared = this.waterfall?.getPreparedVideo?.(renderToken);
    if (!prepared) {
      const eligibility = await this.waitForViewport(renderToken, "buildAndPlayVideo:capacity-or-legacy", null, IntextNode.#ticket(this,this,'W2',renderToken));
      if (eligibility === "stale" || !this.isActiveRenderToken(renderToken, "buildAndPlayVideo:before_prepare", trigger)) return false;
      prepared = this.waterfall?.getPreparedVideo?.(renderToken);
      if (!prepared) this.waterfall?.cancelVideoPreparation?.("activated-without-standby");
    }

    this.state = "video";
    this._visualState = "video";
    this.mergeIntextTelemetry({
      "gexp-intext-pip-effective-enabled": this.isIntextPipEffectiveEnabled() ? "true" : "false",
    });
    this.setupIntextViewportTelemetryObserver();
    if (this._videoTiming?.auctionStartAt && this._videoTiming?.requestWinnerVideoAt) {
      logIntext(
        `[Intext:Video:${this.videoId}] timing trigger=${this._videoTiming.trigger || "unknown"} auction_to_request_winner_video=${this._videoTiming.requestWinnerVideoAt - this._videoTiming.auctionStartAt}ms`,
      );
    }
    logIntext(
      `[Intext:Video:${this.videoId}] 🎬 VIDEO WON — building player`,
    );

    const containerEl = this.videoContainer.getElement();
    this.applyIntextWrapperDebugAttributes(containerEl, {
      renderToken,
      visualState: "video",
      slotCode: this.videoId || this.id,
    });
    containerEl.style.pointerEvents = "none";

    const creativeOpts = {
      container: this.videoContainer,
      node: this,
      config: this.config,
      onVideoEnded: () => this.onVideoEnded(renderToken),
      adTagUrl: gamVideoTagUrl,
      videoTiming: this._videoTiming,
    };

    const creative = prepared?.creative || new IntextVideoCreative(creativeOpts, IntextNode.#qp(this));
    creative.adTagUrl = gamVideoTagUrl;
    creative._renderToken = renderToken;
    creative._videoTiming = this._videoTiming;
    creative.onVideoEnded = creativeOpts.onVideoEnded;
    creative._preparationGuard = null;
    this.activeCreative = creative;
    IntextNode.#qt(this,'creative', this, creative, renderToken);

    try {
      await creative.prepare();
      const viewportState = await this.waitForViewport(renderToken, "buildAndPlayVideo:waitForViewport", creative, IntextNode.#ticket(this,this,'W3',renderToken,creative));
      if (viewportState === "stale" || !this.isActiveRenderToken(renderToken, "buildAndPlayVideo:afterViewport", trigger)) {
        creative.destroy();
        return false;
      }
      await creative.render();
      if (!this.isActiveRenderToken(renderToken, "buildAndPlayVideo:after_render", trigger)) {
        creative.destroy();
        return false;
      }

      logIntext(
        `[Intext:Video:${this.videoId}] ✅ Video ad is playing — revealing container`,
      );
      this.ensureSingleVisibleIntextSurface("video", renderToken, "buildAndPlayVideo_before_reveal");
      const vc = this.waterfall?.resolveIntextVideoConfig?.() || this.config?.video || {};
      const playerSize = Array.isArray(vc.playerSize) && vc.playerSize.length === 2 ? vc.playerSize : [640, 360];
      this.mergeIntextTelemetry({
        "gexp-intext-request-type": "video",
        "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
        "gexp-intext-creative-size": `${playerSize[0]}x${playerSize[1]}`,
      });
      this.flushIntextTelemetryToCI();
      this.commitIntextTelemetry("video-rendered");
      containerEl.style.pointerEvents = "auto";
      this.recordTelemetry("video_fill", { slotId: this.videoId });
      this.discardDisplay();
      this.completeVisualRender(renderToken, "video_completed");
    } catch (err) {
      if (!this.isActiveRenderToken(renderToken, "buildAndPlayVideo:catch", trigger)) return false;
      logIntext(
        `[Intext:Video:${this.videoId}] ❌ Video build/play failed: ${err.message || err}`,
      );
      logIntext(`[Intext:Video:${this.videoId}]    Full error:`, err);

      const loader = containerEl.querySelector(".gexp-intext-loader");
      if (loader) loader.style.display = "none";

      const videoErrorRawMessage = String(err?.message || err || "unknown");
      const videoErrorCode =
        videoErrorRawMessage === "video_ad_timeout" || videoErrorRawMessage === "contrib_ads_timeout"
          ? "timeout"
          : String(
            this._intextTelemetryCycle?.["gexp-intext-video-error-code"] ||
            this.wa?.cI?.["gexp-intext-video-error-code"] ||
            "unknown",
          );
      const videoErrorMessage = videoErrorCode === "timeout" ? "video_ad_timeout" : videoErrorRawMessage;
      this.cleanupIntextPip(videoErrorCode === "timeout" ? "video-timeout" : "video-error");
      creative.destroy();
      this.mergeIntextTelemetry({
        "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
        "gexp-intext-video-failed": "true",
        "gexp-intext-video-error-code": videoErrorCode,
        "gexp-intext-video-error-message": videoErrorMessage,
      });
      this.flushIntextTelemetryToCI({ register: true, reason: "video-error" });
      this.recordTelemetry("video_no_fill", { slotId: this.videoId });
      containerEl.style.pointerEvents = "";
      this.teardownIntextViewportTelemetryObserver();
      this.flushIntextTelemetryToCI();
      this.videoContainer.close({ destroy: true });
      return false;
    }
    return true;
  }
}
class IntextWaterfall {
  #qa1b = null;
  static #qp(self){try{return self.#qa1b;}catch(_){return null;}}
  static #qt(self,...args){try{return self.#qa1b?.tap(...args);}catch(_){}}
  static #qv(self,kind,value,...args){IntextWaterfall.#qt(self,kind,...args,value);return value;}
  static #qr(self,value,node,anchor){IntextWaterfall.#qt(self,'result',node,anchor,value);return value;}
  static #qf(self,value,node,creative){IntextWaterfall.#qt(self,'control',node,'C1',creative,value);return value;}
  static #ticket(self,node,caller,token,owner=null){try{return self.#qa1b?.ticket(node,caller,token,owner)??null;}catch(_){return null;}}
  

  constructor({ node, container, config, gexp, wa }, __qa1bPort = null) {
    try { this.#qa1b = __qa1bPort; } catch (_) {}
    this.node = node;
    this.container = container;
    this.config = config;
    this.gexp = gexp;
    this.wa = wa;
    this.prebidStarted = false;
    this.fetchStarted = false;
    this.fetchComplete = false;
    this.renderStarted = false;
    this.timer = null;
    this.fetchObserver = null;
    this.renderObserver = null;
    this.pendingAuction = null;
    this.loadingConfig = null;
    this._lastFetchExpiredBeforeRestart = false;
    this._lastFetchExpiredAgeMs = null;
    this._lastFetchExpiredTrigger = null;
    this._renderWaitForFetchStartedAt = null;
    this._renderWaitedForFetch = false;
    this._aliasRegistrationState = "idle";
    this._aliasRegistrationPromise = null;
    IntextWaterfall.#qt(this,'waterfall',this,node);
  }
  async startFetch(trigger) {
    if (this.fetchStarted) return;
    const fetchGeneration = this._fetchGeneration = (this._fetchGeneration || 0) + 1;
    IntextWaterfall.#qt(this,'fetch-begin', this, this.node, fetchGeneration);
    this.fetchStarted = true;
    this.fetchComplete = false;
    this.fetchTrigger = trigger;
    this.fetchStartAt = Date.now();
    this._auctionStartAt = this.fetchStartAt;
    this.disconnectFetchObserver();
    if (window.gexpIntextDebug) intextDebugCollector.recordTimeline("fetch-margin-entered", { node: this.node, slotId: this.node.id, trigger });

    const distancePx = this.getLoadingDistancePx();
    const fetchOffYTelemetry = this.getIntextOffYTelemetry("gexp-intext-fetch");
    const fetchExpectedViewability = this.getIntextExpectedViewability(
      fetchOffYTelemetry,
      "gexp-intext-fetch",
      trigger,
    );
    const exp = this.loadingConfig?._experiment || {};
    logIntext(`[Intext:Auction:${this.node.id}] loading_phase_fetch_triggered`, {
      slotCode: this.node.id,
      random1: exp.key === "random1" ? exp.keyValue : undefined,
      key: exp.key || "random1",
      keyValue: exp.keyValue || "",
      keySource: exp.keySource || "unresolved",
      variant: exp.variant || "default",
      fetchRootMargin: this.loadingConfig?.fetchRootMargin,
      renderRootMargin: this.loadingConfig?.renderRootMargin,
      maxDelayMs: this.loadingConfig?.maxDelayMs ?? null,
      trigger,
      distancePx,
    });

    const effectiveMode = this.config.decision?.mode || "auto";
    this._effectiveMode = effectiveMode;
    this.node.startIntextTelemetryCycle(trigger);
    IntextWaterfall.#qt(this,'fetch', this, this.node, fetchGeneration);
    if (this._lastFetchExpiredBeforeRestart) {
      this.mergeLoadingPhaseTelemetry({
        "gexp-intext-fetch-restarted-after-expiry": "true",
        "gexp-intext-prev-fetch-age-ms": String(this._lastFetchExpiredAgeMs),
        "gexp-intext-prev-fetch-expired-trigger": String(this._lastFetchExpiredTrigger || "unknown"),
        "gexp-intext-pending-auction-expired": "true",
        "gexp-intext-pending-auction-age-ms": String(this._lastFetchExpiredAgeMs),
        "gexp-intext-pending-auction-restarted": "true",
        "gexp-intext-pending-auction-used": "false",
      });
      logIntext(`[Intext:Auction:${this.node.id}] loading_previous_fetch_expiry_telemetry_applied`, {
        slotCode: this.node.id,
        previousFetchAgeMs: this._lastFetchExpiredAgeMs,
        previousFetchExpiredTrigger: this._lastFetchExpiredTrigger || "unknown",
        trigger,
      });
      this._lastFetchExpiredBeforeRestart = false;
      this._lastFetchExpiredAgeMs = null;
      this._lastFetchExpiredTrigger = null;
    }
    this.mergeLoadingPhaseTelemetry({
      "gexp-intext-fetch-trigger": trigger,
      "gexp-intext-fetch-start-time-ms": String(this.fetchStartAt),
      "gexp-intext-fetch-distance-px": distancePx !== null ? String(distancePx) : undefined,
      ...fetchOffYTelemetry,
      "gexp-intext-fetch-ev": fetchExpectedViewability,
    });

    try {
      await this.runPrebidPhase(trigger, effectiveMode);
      if (this._fetchGeneration !== fetchGeneration || !this.fetchStarted) return;
      const decision = this.decideWinner({ commit: false });
      this.pendingAuction = {
        timestamp: Date.now(),
        ...decision,
      };
      IntextWaterfall.#qt(this,'winner', this, this.node, fetchGeneration, this.pendingAuction);
      this.recordReadiness?.(decision?.winner === "video" ? "video_winner_resolved" : "intext_winner_resolved", { winnerFormat: decision?.winner || "none", durationMs: Date.now() - this.fetchStartAt });
      this.setupVideoPreparation?.(this.pendingAuction);
      if (decision?.winner === "video") {
        // Infrastructure only: no player, IMA initialization or ad request during fetch.
        Promise.resolve().then(() => IntextVideoCreative.prewarmDependencies({
          node: this.node, trigger, winner: "video",
        })).catch(() => { /* Prewarm failure is observed; render can retry. */ });
      }
      this.fetchComplete = true;
      logIntext(`[Intext:Auction:${this.node.id}] loading_phase_fetch_waiting_for_render`, {
        slotCode: this.node.id,
        winner: decision?.winner || "none",
      });
      if (this.renderTriggeredWaitingForFetch) {
        const waitingTrigger = this.renderTriggeredWaitingForFetch;
        this.renderTriggeredWaitingForFetch = null;
        this.startRender(waitingTrigger);
      }
    } catch (err) {
      if (this._fetchGeneration !== fetchGeneration || !this.fetchStarted) return;
      this.fetchComplete = true;
      this.pendingAuction = null;
      warnIntext(`[Intext:Auction:${this.node.id}] loading_phase_fetch_error`, err);
      if (this.renderTriggeredWaitingForFetch) {
        const waitingTrigger = this.renderTriggeredWaitingForFetch;
        this.renderTriggeredWaitingForFetch = null;
        this.startRender(waitingTrigger);
      }
    }
  }
  cleanup() {
    this.cancelVideoPreparation?.("waterfall-cleanup");
    this._fetchGeneration = (this._fetchGeneration || 0) + 1;
    IntextWaterfall.#qt(this,'cleanup', this, this.node);
    this.disconnectFetchObserver();
    this.disconnectRenderObserver();
    clearTimeout(this.timer);
    this.timer = null;
    this.pendingAuction = null;
    this.renderTriggeredWaitingForFetch = null;
    this.fetchStarted = false;
    this.fetchComplete = false;
    this.renderStarted = false;
    this.prebidStarted = false;
    logIntext(`[Intext:Waterfall:${this.node.id}] cleanup - loading observers and timer cleared`);
  }
  setupVideoPreparation(auction, renderToken = null) {
    this.cancelVideoPreparation("replacement");
    const config = this.getVideoPreparationConfig(), anchor = this.getLoadingTargetElement();
    if (!config.enabled || this.config?.decision?.mode === "display_only" || auction?.winner !== "video" || !anchor || typeof IntersectionObserver === "undefined") return;
    const entry = { config, auction, createdAt: Date.now(), busy: false, inZone: false, generation: 0, boundToken: renderToken,
      state: "STANDBY_UNBOUND" };
    this._videoPreparation = entry;
    IntextWaterfall.#qt(this,'preparation', this, this.node, auction, entry);
    const pool = IntextVideoCreative._preparationEntries ||= new Map();
    if (!renderToken) pool.set(this, entry);
    entry.valid = () => this._videoPreparation === entry && this.getVideoPreparationConfig().enabled && this.config?.decision?.mode !== "display_only" && (entry.boundToken
      ? this.node.isActiveRenderToken(entry.boundToken, "video-preparation")
      : this.pendingAuction === auction && auction.winner === "video") && anchor.isConnected !== false;
    entry.eligible = () => ["visible", "below"].includes(this.node.getReadinessViewportState().reason);
    entry.distance = () => Math.max(0, this.getLoadingDistancePx() ?? Infinity);
    entry.release = reason => {
      entry.generation++; IntextWaterfall.#qt(this,'retire-entry', this, this.node, entry, entry.generation); clearTimeout(entry.leaseTimer); entry.leaseTimer = null;
      entry.state = this._videoPreparation === entry ? "RELEASED" : "CANCELLED";
      entry.creative?.destroy(); entry.creative = null; entry.promise = null; entry.busy = false;
      // Re-arm only on a fresh proximity/visibility notification, not a retry loop.
      entry.inZone = false;
      this.recordReadiness("video_activation_cancelled", { reason, ownershipState: entry.state });
    };
    entry.start = () => {
      if (entry.busy && entry.creative) return;
      entry.busy = true;
      entry.state = entry.boundToken ? "RENDER_OWNED" : "STANDBY_UNBOUND";
      const generation = ++entry.generation;
      IntextWaterfall.#qt(this,'entry-start', this, this.node, entry, generation);
      this.recordReadiness("video_prepare_triggered", { source: "preparation-margin", preparationRootMargin: config.preparationRootMargin,
        preparationTriggerDistancePx: entry.distance(), winnerAgeMs: auction.timestamp != null ? Date.now() - auction.timestamp : null });
      const creative = new IntextVideoCreative({ container: this.node.videoContainer, node: this.node, config: this.node.config,
        preparationGuard: () => entry.valid() && entry.generation === generation }, IntextWaterfall.#qp(this));
      entry.creative = creative;
      IntextWaterfall.#qt(this,'prepared-creative', this, this.node, entry, creative, generation);
      creative._preparationEntry = entry;
      if (entry.boundToken) { creative._renderToken = entry.boundToken; creative._preparationGuard = null; }
      entry.promise = creative.prepare().catch(error => {
        if (entry.creative !== creative) return;
        this.recordReadiness("video_prepare_failed", { reason: error?.message || String(error) });
        entry.release("prepare-failed"); IntextVideoCreative.drainPreparations();
      });
      const ttl = this.loadingConfig?.maxFetchToRenderMs;
      const lease = Number.isFinite(ttl) && ttl > 0 ? Math.min(config.preparedMaxAgeMs, ttl) : config.preparedMaxAgeMs;
      if (entry.state === "STANDBY_UNBOUND") entry.leaseTimer = setTimeout(() => {
        if (this._videoPreparation !== entry || entry.state !== "STANDBY_UNBOUND" || entry.boundToken) return;
        this.recordReadiness("video_standby_expired", { ownershipState: entry.state, durationMs: lease });
        this.cancelVideoPreparation("standby-lease-expired");
      }, lease);
    };
    entry.check = entries => {
      if (!entry.valid()) { this.cancelVideoPreparation("stale-auction"); return; }
      if (entries?.[0]) entry.inZone = entries[0].isIntersecting === true;
      if ((!entry.inZone || !entry.eligible()) && !entry.boundToken) entry.release("outside-preparation-zone");
      else if (document.visibilityState !== "hidden") IntextVideoCreative.drainPreparations();
    };
    try {
      entry.visibility = () => {
        if (document.visibilityState !== "hidden" && entry.lastInZone) entry.inZone = true;
        entry.check();
      };
      const check = entry.check;
      entry.observer = new IntersectionObserver(entries => { entry.lastInZone = entries[0]?.isIntersecting === true; check(entries); }, { threshold: 0, rootMargin: config.preparationRootMargin });
      entry.observer.observe(anchor);
      document.addEventListener?.("visibilitychange", entry.visibility);
    } catch (error) {
      this.recordReadiness("video_prepare_failed", { reason: "invalid-preparation-margin" });
      this.cancelVideoPreparation("observer-unavailable");
    }
    if (renderToken) this.claimVideoPreparation(renderToken);
  }
  claimVideoPreparation(renderToken) {
    const entry = this._videoPreparation;
    if (!entry || !this.node.isActiveRenderToken(renderToken, "video-ownership") || !entry.valid()) return null;
    if (entry.boundToken && entry.boundToken !== renderToken) return null;
    const transferred = entry.state !== "RENDER_OWNED";
    // Synchronous handoff: a queued standby timer also checks state and identity.
    entry.boundToken = renderToken; entry.state = "RENDER_OWNED";
    IntextWaterfall.#qt(this,'handoff', this, this.node, entry, renderToken);
    if (entry.creative) { entry.creative._renderToken = renderToken; entry.creative._preparationGuard = null; }
    clearTimeout(entry.leaseTimer); entry.leaseTimer = null;
    entry.observer?.disconnect(); document.removeEventListener?.("visibilitychange", entry.visibility);
    IntextVideoCreative._preparationEntries?.delete(this);
    if (transferred) this.recordReadiness("video_preparation_ownership_transferred", { renderToken, ownershipState: entry.state });
    IntextVideoCreative.drainPreparations();
    return entry;
  }
  getPreparedVideo(renderToken) {
    const entry = this._videoPreparation;
    if (entry && !entry.valid()) { this.cancelVideoPreparation("stale-preparation"); return null; }
    if (entry && !this.claimVideoPreparation(renderToken)) return null;
    if (entry && !entry.creative && entry.valid()) {
      const lead = /^(-?\d+(?:\.\d+)?)px(?:\s|$)/.exec(entry.config.preparationRootMargin);
      if (lead && entry.eligible() && this.getLoadingDistancePx() <= Number(lead[1])) {
        entry.inZone = true; entry.start();
      }
    }
    if (!entry?.creative || entry.creative._destroyed) return null;
    this.recordReadiness("video_activation_pending", { renderToken, ownershipState: entry.state });
    return entry;
  }
  cancelVideoPreparation(reason = "cleanup") {
    const entry = this._videoPreparation;
    if (!entry) return;
    this._videoPreparation = null;
    IntextVideoCreative._preparationEntries?.delete(this);
    entry.observer?.disconnect(); document.removeEventListener?.("visibilitychange", entry.visibility);
    entry.release(reason); IntextVideoCreative.drainPreparations();
  }
  async startAuction(trigger) {
    const sentinelRetryContext =
      trigger === "house-1x1-refresh" &&
        this._houseLineItemSentinelRetryContext?.forceRequestType === "display"
        ? this._houseLineItemSentinelRetryContext
        : null;
    if (sentinelRetryContext) {
      this._houseLineItemSentinelRetryContext = null;
    }
    if (this.wa && this.wa.cI) {
      const isRefresh =
        trigger === "refresh" ||
        this.node?._intextTelemetryCycle?.["gexp-intext-refresh"] === "true";
      const isFallback =
        trigger === "fallback" ||
        this.node?._intextTelemetryCycle?.["gexp-intext-fallback"] === "true" ||
        sentinelRetryContext?.isFallback === true;
      this.wa.cI["gexp-intext-is-refresh"] = isRefresh ? "true" : "false";
      this.wa.cI["gexp-intext-refresh"] = this.wa.cI["gexp-intext-is-refresh"];
      this.wa.cI["gexp-intext-is-fallback"] = isFallback ? "true" : "false";
      this.wa.cI["gexp-intext-fallback"] = this.wa.cI["gexp-intext-is-fallback"];
      logIntext(`[Intext:Auction:${this.node.id}] Status injected: refresh=${this.wa.cI["gexp-intext-is-refresh"]}, fallback=${this.wa.cI["gexp-intext-is-fallback"]}`);
    }
    if (this.prebidStarted) return;
    this.prebidStarted = true;
    const renderToken = this.node.beginVisualRender("auction_started", trigger);
    this.node.startIntextTelemetryCycle(trigger);
    IntextWaterfall.#qt(this,'legacy-auction', this, this.node);
    this.node.mergeIntextTelemetry({
      "gexp-intext-render-token": String(renderToken),
      "gexp-intext-render-attempt": String(this.node._renderTokenSeq || 0),
      "gexp-intext-visual-state": "auction_started",
    });
    if (sentinelRetryContext) {
      this.node.mergeIntextTelemetry({
        "gexp-intext-is-fallback": sentinelRetryContext.isFallback ? "true" : "false",
        "gexp-intext-fallback": sentinelRetryContext.isFallback ? "true" : "false",
        "gexp-intext-sentinel-retry-forced-request-type": "display",
        "gexp-intext-sentinel-retry-preserved-fallback": sentinelRetryContext.isFallback ? "true" : "false",
        "gexp-intext-sentinel-retry-original-decision-mode": sentinelRetryContext.originalDecisionMode || "unknown",
        "gexp-intext-sentinel-retry-lineitem": sentinelRetryContext.sentinelLineItemId || "unknown",
        "gexp-intext-sentinel-retry-attempt-slot": String(sentinelRetryContext.attemptSlot ?? "unknown"),
        "gexp-intext-sentinel-retry-max-slot": String(sentinelRetryContext.maxAttemptsPerSlot ?? "unknown"),
        "gexp-intext-sentinel-retry-attempt-cycle": String(sentinelRetryContext.attemptCycle ?? "unknown"),
        "gexp-intext-sentinel-retry-max-cycle": String(sentinelRetryContext.maxAttemptsPerCycle ?? "unknown"),
      });
    }

    // Cleanup: reset fallback state and clear targeting on new auctions
    if (trigger !== "fallback") {
      if (this._displayRenderState) this._displayRenderState.isFallback = false;
    }
    if (sentinelRetryContext?.isFallback === true) {
      if (!this._displayRenderState) this._displayRenderState = {};
      this._displayRenderState.isFallback = true;
    }
    if (this.node.slot) {
      this.node.clearDisplayRequestTargeting(this.node.slot, "auction_start_targeting_cleanup");
    }

    this.lastTrigger = trigger;
    this._auctionStartAt = Date.now();
    clearTimeout(this.timer);
    this.node.recordTelemetry("auction_start", { trigger });

    if (trigger === "refresh") {
      if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
        intextDebugCollector.recordMetric("display_refresh_started", {
          node: this.node,
          element: this.container?.getElement?.(),
          trigger,
          isRefresh: true,
        });
      }
      const currentState = this.node.state;

      const refreshPb = this.node.manager.resolveIntextPrebidApi().api;
      if (typeof refreshPb?.clearTargeting === "function") {
        refreshPb.clearTargeting(this.node.id);
      }

      if (typeof refreshPb?.removeAdUnit === "function") {
        refreshPb.removeAdUnit(this.node.id);
      }

      if (this.node.activeCreative && this.node.activeCreative.player) {
        const vjsEl = this.node.activeCreative.player.el();
        if (vjsEl) {
          vjsEl.classList.add("vjs-hidden");
          vjsEl.style.display = "none";
        }
      }

      if (currentState === "video") {
        const videoEl = this.node.videoContainer?.getElement();
        const displayEl = this.container.getElement();
        if (!this.node.isActiveRenderToken(renderToken, "startAuction_refresh_video_to_display_prepare", trigger)) {
          logIntext(`[Intext:Display:${this.node.id}] video_to_display_transition_skipped_stale_token`, {
            slotCode: this.node.id,
            renderToken,
            currentState,
            displayConnected: Boolean(displayEl?.isConnected),
            videoConnected: Boolean(videoEl?.isConnected),
            source: "startAuction_refresh_video_to_display_prepare",
          });
          return;
        }
        this.node.mergeIntextTelemetry({
          "gexp-intext-video-to-display-transition": "started",
        });
        logIntext(`[Intext:Display:${this.node.id}] video_to_display_transition_started`, {
          slotCode: this.node.id,
          renderToken,
          currentState,
          displayConnected: Boolean(displayEl?.isConnected),
          videoConnected: Boolean(videoEl?.isConnected),
          source: "startAuction_refresh_video_to_display_prepare",
        });
        const preservedHeight = this.node.resolveTransitionPreservedHeight(displayEl, videoEl, this.node.lockedHeight);
        const bridge = this.node.ensureIntextTransitionBridge({
          preferredSurface: "display",
          fallbackSurface: "video",
          renderToken,
          source: "video_to_display_refresh",
          preservedHeight,
          loaderText: "Recuperando anuncio",
        });
        const displayMissing = !displayEl?.isConnected;
        this.node.mergeIntextTelemetry({
          "gexp-intext-video-to-display-display-missing": displayMissing ? "true" : "false",
          "gexp-intext-video-to-display-video-bridge": bridge?.bridgeSurface === "video" ? "true" : "false",
          "gexp-intext-video-to-display-bridge-complete": "true",
          "gexp-intext-video-to-display-display-loader": "true",
          "gexp-intext-video-to-display-single-surface": "true",
          "gexp-intext-video-to-display-container-state-synced": "true",
        });
        if (displayMissing && bridge?.bridgeSurface === "video") {
          logIntext(`[Intext:Display:${this.node.id}] video_to_display_display_missing_keep_video_surface`, {
            slotCode: this.node.id,
            renderToken,
            currentState,
            preservedHeight: bridge.preservedHeight,
            displayConnected: Boolean(displayEl?.isConnected),
            videoConnected: Boolean(videoEl?.isConnected),
            source: "video_to_display_refresh",
          });
          logIntext(`[Intext:Display:${this.node.id}] video_to_display_video_loader_preserved_as_bridge`, {
            slotCode: this.node.id,
            renderToken,
            currentState,
            preservedHeight: bridge.preservedHeight,
            source: "video_to_display_refresh",
          });
        } else if (bridge?.bridgeSurface === "display" || bridge?.bridgeSurface === "display-recreated") {
          logIntext(`[Intext:Display:${this.node.id}] video_to_display_display_surface_ready`, {
            slotCode: this.node.id,
            renderToken,
            currentState,
            preservedHeight: bridge.preservedHeight,
            bridgeSurface: bridge.bridgeSurface,
            source: "video_to_display_refresh",
          });
          logIntext(`[Intext:Display:${this.node.id}] video_to_display_video_surface_hidden_after_display_ready`, {
            slotCode: this.node.id,
            renderToken,
            currentState,
            displayConnected: Boolean(this.container.getElement()?.isConnected),
            videoConnected: Boolean(videoEl?.isConnected),
            source: "video_to_display_refresh",
          });
        }
        logIntext(`[Intext:Display:${this.node.id}] video_to_display_bridge_complete`, {
          slotCode: this.node.id,
          renderToken,
          currentState,
          bridgeSurface: bridge?.bridgeSurface || "none",
          preservedHeight: bridge?.preservedHeight || preservedHeight,
          displayConnected: Boolean(this.container.getElement()?.isConnected),
          videoConnected: Boolean(videoEl?.isConnected),
          source: "video_to_display_refresh",
        });
      } else {
        let loaderDisplay = this.container
          .getElement()
          ?.querySelector(".gexp-intext-loader");
        if (!loaderDisplay && this.container.getElement()) {
          const el = this.container.getElement();
          el.insertAdjacentHTML('beforeend', '<div class="gexp-intext-loader"><div class="gexp-intext-spinner"></div><div class="gexp-intext-loader-text">Recuperando anuncio</div></div>');
          loaderDisplay = el.querySelector(".gexp-intext-loader");
        }
        if (loaderDisplay) loaderDisplay.style.display = "flex";
        const activeEl = this.container.getElement();
        if (activeEl) {
          const preservedHeight = this.node.getPreservedRefreshHeight(activeEl);
          logIntext(
            `[Intext:Display:${this.node.id}] display_refresh_preserved_height - height=${preservedHeight}`,
          );
          this.node.applyDisplayWrapperHeight(activeEl, preservedHeight, {
            logReason:
              preservedHeight === 600 ? "display_300x600_visual_height_adjusted" : "",
            source: "refresh_prepare_display_container",
          });
          activeEl.classList.add("is-open");
          activeEl.style.display = "block";
          activeEl.style.opacity = "1";
        }
      }
    }

    const isRefresh = trigger === "refresh";
    const effectiveMode = sentinelRetryContext?.forceDecisionMode || (isRefresh
      ? this.config.refreshCycle?.mode || "display_only"
      : this.config.decision?.mode || "auto");

    this._effectiveMode = effectiveMode;

    logIntext(
      `%c[Intext:Slot:${this.node.id}:${this.node.id}] ═══ AUCTION START ═══`,
      "color:#2196F3;font-weight:bold",
    );
    logIntext(
      `[Intext:Slot:${this.node.id}] ├─ Trigger:  ${trigger}`,
    );
    logIntext(
      `[Intext:Slot:${this.node.id}] ├─ Mode:     ${effectiveMode}${isRefresh ? " (refresh cycle)" : ""}`,
    );

    if (sentinelRetryContext) {
      logIntext(`[Intext:Slot:${this.node.id}] house_lineitem_sentinel_retry_forced_display`, {
        lineItemId: sentinelRetryContext.sentinelLineItemId,
        preservedFallback: sentinelRetryContext.isFallback ? "true" : "false",
        originalMode: sentinelRetryContext.originalDecisionMode || "unknown",
        attemptSlot: sentinelRetryContext.attemptSlot,
        maxAttemptsPerSlot: sentinelRetryContext.maxAttemptsPerSlot,
        attemptCycle: sentinelRetryContext.attemptCycle,
        maxAttemptsPerCycle: sentinelRetryContext.maxAttemptsPerCycle,
      });
      logIntext(
        `[Intext:Slot:${this.node.id}] technical house lineitem sentinel retry forced to display lineItemId=${sentinelRetryContext.sentinelLineItemId}, preservedFallback=${sentinelRetryContext.isFallback ? "true" : "false"}, originalMode=${sentinelRetryContext.originalDecisionMode || "unknown"}`,
      );
    }

    const bidStrategy = isRefresh
      ? (this.config.refreshCycle?.bidStrategy || "fresh")
      : "fresh";

    if (isRefresh && bidStrategy !== "fresh") {
      const cached = this.getCachedBidsForMode(effectiveMode);
      if (cached && bidStrategy === "reuse") {
        logIntext(
          `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: REUSE (${cached.banner.length} banner, ${cached.video.length} video from cache, age: ${cached.ageMs}ms)`,
        );
        this._cachedBidsForDecision = cached;
        this._currentAuctionId = cached.auctionId;
        this.decideWinner();
        return;
      } else if (cached && bidStrategy === "compare") {
        logIntext(
          `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: COMPARE (will merge new bids with ${cached.banner.length + cached.video.length} cached, age: ${cached.ageMs}ms)`,
        );
        this._cachedBidsForDecision = cached;
      } else {
        logIntext(
          `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: ${bidStrategy.toUpperCase()} → no valid cache, falling back to FRESH`,
        );
        this._cachedBidsForDecision = null;
      }
    } else {
      this._cachedBidsForDecision = null;
      if (isRefresh) {
        logIntext(
          `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: FRESH (new auction)`,
        );
      }
    }

    const prebidPromises = [];

    const multiConfig = this.getPrebidMultiFormatConfig();
    if (multiConfig) {
      const bannerBidders = multiConfig.bids.filter(b => !(this.config.prebid?.videoBidders || []).includes(b)).length;
      const videoBidders = (this.config.prebid?.videoBidders || []).length;
      const mediaTypesStr = Object.keys(multiConfig.mediaTypes).join("+");
      logIntext(
        `[Intext:Slot:${this.node.id}] ├─ Prebid MultiFormat: requesting (code: ${multiConfig.code}, ${multiConfig.bids.length} bidders, types: ${mediaTypesStr})`,
      );
      prebidPromises.push(this.executePrebid(multiConfig));
    } else {
      logIntext(
        `[Intext:Slot:${this.node.id}] ├─ Prebid: SKIPPED (no config)`,
      );
    }

    logIntext(
      `[Intext:Slot:${this.node.id}] └─ ${prebidPromises.length} Prebid request(s)...`,
    );

    await Promise.all(prebidPromises);
    this.decideWinner();
  }
}
class IntextVideoCreative {
  #qa1b = null;
  static #qp(self){try{return self.#qa1b;}catch(_){return null;}}
  static #qt(self,...args){try{return self.#qa1b?.tap(...args);}catch(_){}}
  static #qv(self,kind,value,...args){IntextVideoCreative.#qt(self,kind,...args,value);return value;}
  static #qr(self,value,node,anchor){IntextVideoCreative.#qt(self,'result',node,anchor,value);return value;}
  static #qf(self,value,node,creative){IntextVideoCreative.#qt(self,'control',node,'C1',creative,value);return value;}
  static #ticket(self,node,caller,token,owner=null){try{return self.#qa1b?.ticket(node,caller,token,owner)??null;}catch(_){return null;}}
  

  constructor({ container, adTagUrl, bid, node, config, onVideoEnded, videoTiming, preparationGuard }, __qa1bPort = null) {
    try { this.#qa1b = __qa1bPort; } catch (_) {}
    this.container = container;
    this.adTagUrl = adTagUrl || null;
    this.bid = bid || null;
    this.node = node;
    this.config = config;
    this.onVideoEnded = onVideoEnded || null;
    this.playerId = `gexp-intext-video-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.player = null;
    this.spinnerHidden = false;
    this._aborted = false;
    this._settle = null;
    this._playerRevealed = false;
    this._videoEndHandled = false;
    this._videoTiming = videoTiming || null;
    this._renderToken = node?._activeRenderToken || 0;
    this._adMediaEl = null;
    this._adMediaFirstFrameCleanup = null;
    this._adMediaCleanup = null;
    this._adMediaDiscoveryTimers = [];
    this._firstFrameWaitTimers = [];
    this._adMediaStateSeen = new WeakMap();
    this._destroyed = false;
    this._lastAdDuration = null;
    this._preparationGuard = preparationGuard || null;
    this._preparePromise = null;
    this._prepared = false;
    this._activationPromise = null;
    IntextVideoCreative.#qt(this,'creative-created',node,this);
  }
  async activate() {
    await this.prepare();
    if (!this.preparationValid()) throw new Error("stale_render_token");
    const node = this.node;
    if (node?.waitForViewport) {
      node.waterfall?.recordReadiness?.("video_activation_deferred", { reason: node.getReadinessViewportState().reason });
      const state = await node.waitForViewport(this._renderToken, "video-activation", this, IntextVideoCreative.#ticket(this,node,'W4',this._renderToken,this));
      if (state === "stale" || !this.preparationValid()) throw new Error("stale_render_token");
    }
    if (node?.getReadinessViewportState && !IntextVideoCreative.#qf(this,node.getReadinessViewportState(), node, this).eligible) throw new Error("video_activation_ineligible");
    node?.waterfall?.recordReadiness?.("video_activation_eligible");
    node?.waterfall?.releasePreparedVideo?.(this);
    IntextVideoCreative.#qt(this,'player-build', node, this);
    this.createPlayerForActivation();
    this.observeActivationEligibility();
    node?.waterfall?.recordReadiness?.("video_activation_started");
    return this.requestAds();
  }
  abort() {
    this._aborted = true;
    IntextVideoCreative.#qt(this,'retire-creative', this.node, this);
    this.node?.cancelViewportWaits?.("stale", this);
    this._eligibilityCleanup?.();
    this.cleanupAdMediaObservation();
    logIntext(
      `[Intext:Video:IMA] 🛑 abort() — display won, cancelling video path`,
    );
    this._settle?.("reject", new Error("display_won_abort"));
  }
  destroy() {
    if (this._destroyed) return;
    this._destroyed = true;
    IntextVideoCreative.#qt(this,'retire-creative', this.node, this);
    if (this._preparationEntry?.state === "ACTIVATED") this._preparationEntry.state = "RELEASED";
    this.node?.cancelViewportWaits?.("stale", this);
    this._eligibilityCleanup?.();
    this._settle?.("reject", new Error("video_destroyed"));
    this.cleanupAdMediaObservation();
    try {
      this.player?.dispose?.();
    } catch (err) {
      // ignore
    }
    this.videoEl?.remove?.();
  }
};return Object.freeze({IntextManager,IntextPlacementEngine,IntextNode,IntextWaterfall,IntextVideoCreative});})()}),configurable:true});
