'use strict';
// Empty branded object handles plus explicit synthetic facts. No commercial mocks.
const R=require('./identity-registry.cjs');
const P=require('./packet.cjs');
const {createOfflineAdapter}=require('./adapter.cjs');
function merge(base,changes){
  const out=P.clone(base);
  for(const [k,v]of Object.entries(changes))out[k]=v&&typeof v==='object'&&!Array.isArray(v)&&out[k]&&typeof out[k]==='object'?merge(out[k],v):v;
  return out;
}
function session(distribution='_gam_kv_.js',options={}){
  const registry=R.createIdentityRegistry({...options.registryOptions,distribution});
  const objects=Object.fromEntries(['document','navigation','node','waterfall','anchor','attempt','creative','entry'].map(k=>[k,R.fixtureHandle()]));
  if(options.withoutCreative)objects.creative=null;
  let snapshot=registry.bind({...objects,...options.binding,cycleId:options.binding&&Object.hasOwn(options.binding,'cycleId')?options.binding.cycleId:1,
    fetchGeneration:options.binding&&Object.hasOwn(options.binding,'fetchGeneration')?options.binding.fetchGeneration:1,renderToken:options.renderToken??1});
  const adapter=createOfflineAdapter({distribution,documentLocalId:snapshot.identity.documentLocalId,registry,...options.adapterOptions});
  let sequence=0;
  function packet(changes={}){
    const n=++sequence;
    let base={distribution,sampleSequence:n};
    if(changes.kind&&changes.kind!=='guard')base={...base,kind:changes.kind,caller:'population',format:'opportunity',
      guard:{executed:false,eligible:null,reason:'guard-not-executed',playerCreated:null},
      provenance:{boundary:{fetch:'native-fetch',winner:'native-decision',handoff:'handoff',terminal:'terminal',subattempt:'subattempt',gap:'unknown'}[changes.kind]}};
    return R.fixturePacket(snapshot,merge(base,changes));
  }
  function send(changes){return adapter.ingest(packet(changes));}
  function start(winner='video'){
    send({kind:'fetch'});
    if(winner!=='unknown')send({kind:'winner',facts:{initialWinner:winner,winnerSource:'native-decision'}});
  }
  function nextCycle(cycleId,fetchGeneration=cycleId){
    objects.attempt=R.fixtureHandle();
    snapshot=registry.bind({...objects,cycleId,fetchGeneration,renderToken:cycleId});return snapshot;
  }
  function handoff(renderToken){snapshot=registry.handoff({...objects,renderToken});return snapshot;}
  const current=()=>snapshot;
  return {registry,objects,adapter,packet,send,start,nextCycle,handoff,current,distribution};
}
module.exports={session,merge};
