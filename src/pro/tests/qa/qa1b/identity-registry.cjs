'use strict';
// Stage I supports branded empty fixture handles exclusively, never live DOM/SDK objects.
const P=require('./packet.cjs');
const handles=new WeakSet();
const issued=new WeakSet();
const registries=new WeakSet();
function fixtureHandle(){const handle=Object.freeze(Object.create(null));handles.add(handle);return handle;}
function createIdentityRegistry({budgetBytes=12288}={}){
  if(!Number.isSafeInteger(budgetBytes)||budgetBytes<0||budgetBytes>12288)throw new RangeError('registry-budget');
  const aliases=new WeakMap(),attempts=new WeakMap(),nodes=new WeakMap();
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
    // Compact scalar tuples stay in weak values; no object references in either direction.
    const record=[identity.documentLocalId,identity.navigationLocalId,identity.slotLocalId,identity.anchorLocalId,
      identity.cycleId,identity.fetchGeneration,identity.renderToken,ownership.waterfallLocalId,ownership.attemptLocalId,
      ownership.creativeLocalId,ownership.entryLocalId,valid,identity.state];charge(record);attempts.set(attempt,record);
    const current=[ownership.attemptLocalId,identity.renderToken,identity.state];
    charge(current);nodes.set(node,current);
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
    issued.add(out);return P.freeze(out);
  }
  function handoff({node,attempt,creative,renderToken}){
    const r=attempts.get(attempt),n=nodes.get(node);
    if(!r||!n||n[0]!==r[8]||n[2]!=='live'||native(renderToken,0)===null||renderToken<n[1])throw new Error('stale-handoff');
    const out=[...r];out[6]=renderToken;out[9]=alias(creative);
    // Charge replacement conservatively too. No hidden reclamation or weak-key enumeration.
    charge(out);attempts.set(attempt,out);nodes.set(node,[n[0],renderToken,n[2]]);return snapshot({node,attempt});
  }
  function retire({node,attempt,state='stale'}){
    if(!['stale','terminal'].includes(state))throw new TypeError('retirement-state');
    const r=attempts.get(attempt),n=nodes.get(node);
    if(!r||!n||n[0]!==r[8])throw new Error('stale-retirement');
    nodes.set(node,[n[0],n[1],state]);return snapshot({node,attempt});
  }
  const stats=()=>({logicalChargedBytes:chargedBytes,budgetBytes,aliasesIssued:next,exhausted,physicalHeapMeasured:false});
  const registry=Object.freeze({bind,snapshot,handoff,retire,stats});registries.add(registry);return registry;
}
function fixturePacket(snapshot,overrides={}){
  if(!issued.has(snapshot))throw new TypeError('registry-snapshot-required');
  const seq=overrides.sampleSequence??1,distribution=overrides.distribution??'_gam_kv_.js';
  const p={schemaVersion:'qa1b-packet-v1',contractRevision:'r1-review-B',eventId:`e${seq}`,sampleSequence:seq,
    kind:'guard',caller:'W3',stage:'before-player',format:'video',...P.clone(snapshot),
    time:{sourceClock:'synthetic-monotonic-ms',monotonicMs:seq},
    provenance:{distribution,coreSha256:P.CORES[distribution],origin:'synthetic-fixture',fixtureVersion:'fixtureV1',
      cssModelVersion:'unknown',configVersion:'fixtureV1',boundary:'guard-result',verified:true},
    guard:{executed:true,eligible:true,reason:'visible',playerCreated:false},
    evidence:{anchorRect:null,viewport:null,documentVisibility:'unknown'},
    facts:{initialWinner:'unknown',winnerSource:'unknown',terminal:null,relation:'unknown'}};
  for(const [key,value]of Object.entries(overrides))if(key!=='distribution')p[key]=value;
  const result=P.validate(p);if(!result.valid)throw new TypeError(result.errors.join(';'));
  return result.packet;
}
module.exports={fixtureHandle,createIdentityRegistry,fixturePacket,isRegistry:value=>registries.has(value)};
