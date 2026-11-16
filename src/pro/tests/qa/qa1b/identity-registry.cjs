'use strict';
// Stage I supports branded empty fixture handles exclusively, never live DOM/SDK objects.
const P=require('./packet.cjs');
const handles=new WeakSet();
// A snapshot is a local producer capability. Neither it nor packet accreditation
// survives a JSON copy; exported scalar identities are data, never credentials.
const issued=new WeakMap();
const registries=new WeakSet();
function fixtureHandle(){const handle=Object.freeze(Object.create(null));handles.add(handle);return handle;}
function createIdentityRegistry({budgetBytes=12288,distribution=null}={}){
  if(!Number.isSafeInteger(budgetBytes)||budgetBytes<0||budgetBytes>12288)throw new RangeError('registry-budget');
  if(distribution!==null&&!Object.hasOwn(P.CORES,distribution))throw new TypeError('registry-distribution');
  const aliases=new WeakMap(),attempts=new WeakMap(),nodes=new WeakMap(),packets=new WeakMap();
  let issuerDistribution=distribution;
  let next=0,chargedBytes=0,exhausted=false;
  function charge(value){const n=P.bytes(value);if(chargedBytes+n>budgetBytes){exhausted=true;throw new RangeError('registry-overflow');}chargedBytes+=n;}
  function alias(handle){
    if(handle===null||handle===undefined)return null;
    if(!handles.has(handle))throw new TypeError('fixture-handle-required');
    if(!aliases.has(handle)){const id=`a${++next}`;charge(id);aliases.set(handle,id);}
    return aliases.get(handle);
  }
  const native=(value,min)=>Number.isSafeInteger(value)&&value>=min?value:null;
  function bind({document,navigation,node,waterfall,anchor,attempt,creative=null,entry=null,cycleId,fetchGeneration,renderToken}){
    if(attempts.has(attempt))throw new Error('attempt-already-bound');
    const identity={documentLocalId:alias(document),navigationLocalId:alias(navigation),slotLocalId:alias(node),anchorLocalId:alias(anchor),
      cycleId:native(cycleId,1),fetchGeneration:native(fetchGeneration,1),renderToken:native(renderToken,0),activeRenderToken:native(renderToken,0),verified:false,state:'unknown'};
    const ownership={nodeLocalId:identity.slotLocalId,waterfallLocalId:alias(waterfall),attemptLocalId:alias(attempt),creativeLocalId:alias(creative),entryLocalId:alias(entry),verified:false,state:'unknown'};
    if(!node||!attempt||!handles.has(node)||!handles.has(attempt))throw new TypeError('node-attempt-required');
    const valid=Object.values(identity).filter(v=>v===null).length===0&&ownership.waterfallLocalId!==null;
    identity.verified=valid;identity.state=valid?'live':'unknown';ownership.verified=valid;ownership.state=identity.state;
    // Compact scalar tuples and shared scalar leases; no DOM/SDK references in values.
    const record=[identity.documentLocalId,identity.navigationLocalId,identity.slotLocalId,identity.anchorLocalId,
      identity.cycleId,identity.fetchGeneration,identity.renderToken,ownership.waterfallLocalId,ownership.attemptLocalId,
      ownership.creativeLocalId,ownership.entryLocalId,valid,identity.state];charge(record);
    // Charge the longer revoked boolean representation before publishing a lease.
    const current=[ownership.attemptLocalId,identity.renderToken,identity.state,{active:false}];
    charge(current);attempts.set(attempt,record);
    const previous=nodes.get(node);if(previous)previous[3].active=false;
    current[3].active=true;nodes.set(node,current);
    return snapshot({node,attempt});
  }
  function snapshot({node,attempt}){
    const record=attempts.get(attempt),current=nodes.get(node);
    if(!record||!current||record[2]!==aliases.get(node))throw new TypeError('unbound-owner');
    const out={identity:{documentLocalId:record[0],navigationLocalId:record[1],slotLocalId:record[2],anchorLocalId:record[3],
      cycleId:record[4],fetchGeneration:record[5],renderToken:record[6],activeRenderToken:current[1],verified:record[11],state:record[12]},
    ownership:{nodeLocalId:record[2],waterfallLocalId:record[7],attemptLocalId:record[8],creativeLocalId:record[9],entryLocalId:record[10],verified:record[11],state:record[12]}};
    const stale=current[0]!==out.ownership.attemptLocalId||current[2]==='stale';
    out.identity.state=stale?'stale':current[2];
    out.ownership.state=out.identity.state;
    const expectedIdentity=out.identity,expectedOwnership=out.ownership,lease=current[3];
    issued.set(out,packet=>{
      // No re-issuing invented identities/owners, even through the fixture factory.
      const matches=(actual,expected)=>Object.keys(expected).every(key=>actual[key]===expected[key]);
      if(!matches(packet.identity,expectedIdentity)||!matches(packet.ownership,expectedOwnership)
        ||packet.provenance.origin!=='synthetic-fixture')return packet;
      if(issuerDistribution===null)issuerDistribution=packet.provenance.distribution;
      if(packet.provenance.distribution!==issuerDistribution)return packet;
      // The immutable packet is a WEAK key. Its value references one shared,
      // already-charged lease, not a new identity, digest, DOM handle or SDK object.
      packets.set(packet,lease);return packet;
    });
    return P.freeze(out);
  }
  function handoff({node,attempt,creative,renderToken}){
    const r=attempts.get(attempt),n=nodes.get(node);
    if(!r||!n||n[0]!==r[8]||n[2]!=='live'||native(renderToken,0)===null||renderToken<n[1])throw new Error('stale-handoff');
    const out=[...r];out[6]=renderToken;out[9]=alias(creative);
    // Charge replacement conservatively too. No hidden reclamation or weak-key enumeration.
    const current=[n[0],renderToken,n[2],{active:false}];
    charge(out);charge(current);n[3].active=false;
    attempts.set(attempt,out);current[3].active=true;nodes.set(node,current);return snapshot({node,attempt});
  }
  function retire({node,attempt,state='stale'}){
    if(!['stale','terminal'].includes(state))throw new TypeError('retirement-state');
    const r=attempts.get(attempt),n=nodes.get(node);
    if(!r||!n||n[0]!==r[8])throw new Error('stale-retirement');
    const current=[n[0],n[1],state,{active:false}];charge(current);n[3].active=false;
    current[3].active=true;nodes.set(node,current);return snapshot({node,attempt});
  }
  function accredit(packet){
    const lease=packets.get(packet);
    return !lease?'unaccredited':exhausted?'authority-exhausted':lease.active?'current':'retired-owner';
  }
  const stats=()=>({logicalChargedBytes:chargedBytes,budgetBytes,aliasesIssued:next,exhausted,
    issuerDistribution,packetAuthority:'local-fixture-object-v1',physicalHeapMeasured:false});
  const registry=Object.freeze({bind,snapshot,handoff,retire,accredit,stats});registries.add(registry);return registry;
}
function fixturePacket(snapshot,overrides={}){
  const certify=issued.get(snapshot);if(!certify)throw new TypeError('registry-snapshot-required');
  const seq=overrides.sampleSequence??1,distribution=overrides.distribution??'_gam_kv_.js';
  const p={schemaVersion:'qa1b-packet-v1',contractRevision:'r1-review-B',eventId:`e${seq}`,sampleSequence:seq,
    kind:'guard',caller:'W3',stage:'before-player',format:'video',...P.clone(snapshot),
    time:{sourceClock:'synthetic-monotonic-ms',monotonicMs:seq},
    provenance:{distribution,coreSha256:P.CORES[distribution],origin:'synthetic-fixture',fixtureVersion:'fixtureV1',
      cssModelVersion:'unknown',configVersion:'fixtureV1',boundary:'guard-result',verified:true},
    guard:{executed:true,eligible:true,reason:'visible',playerCreated:false},
    evidence:{anchorRect:null,viewport:null,documentVisibility:'unknown'},
    facts:{initialWinner:'unknown',winnerSource:'unknown',terminal:null,relation:'unknown'}};
  // Trusted synthetic producer composition, not an external import API. Invalid
  // and inconsistent negative fixtures remain unaccredited for rejection tests.
  function merge(base,changes,depth=0){
    const out=P.clone(base);
    for(const [key,value]of Object.entries(changes))if(depth!==0||key!=='distribution')out[key]=value&&typeof value==='object'
      &&!Array.isArray(value)&&out[key]&&typeof out[key]==='object'?merge(out[key],value,depth+1):value;
    return out;
  }
  const draft=merge(p,overrides),result=P.validate(draft);
  return result.valid?certify(result.packet):draft;
}
module.exports={fixtureHandle,createIdentityRegistry,fixturePacket,isRegistry:value=>registries.has(value)};
