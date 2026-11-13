'use strict';
// Stage I data contract only. No clock acquisition, browser globals or I/O.
const {createHash}=require('node:crypto');
const CORES=Object.freeze({
  '_gam_kv_.js':'1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690',
  'IntextManager.js':'ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8',
});
const CALLERS=Object.freeze(['W1','W2','W3','W4',...Array.from({length:11},(_,i)=>`C${i+1}`),'population','unknown']);
const PRIMARY=Object.freeze(['W2','W3','W4','C1']);
const REASONS=Object.freeze(['unknown','visible','below','passed','document-hidden','anchor-missing','geometry-unavailable',
  'anchor-zero-or-invalid-size','anchor-not-rendered','outside-horizontal','guard-not-executed','stale','terminal']);
const local={type:'string',pattern:'^[A-Za-z][A-Za-z0-9_-]{0,47}$'};
const positive={type:'integer',minimum:1,maximum:Number.MAX_SAFE_INTEGER};
const natural={type:'integer',minimum:0,maximum:Number.MAX_SAFE_INTEGER};
const bool={type:'boolean'},nullable=s=>({anyOf:[s,{type:'null'}]});
const choice=values=>({enum:values});
const object=properties=>({type:'object',additionalProperties:false,required:Object.keys(properties),properties});
const identity=object({documentLocalId:nullable(local),navigationLocalId:nullable(local),slotLocalId:nullable(local),anchorLocalId:nullable(local),
  cycleId:nullable(positive),fetchGeneration:nullable(positive),renderToken:nullable(natural),activeRenderToken:nullable(natural),
  verified:bool,state:choice(['live','stale','terminal','unknown'])});
const ownership=object({nodeLocalId:nullable(local),waterfallLocalId:nullable(local),attemptLocalId:nullable(local),
  creativeLocalId:nullable(local),entryLocalId:nullable(local),verified:bool,state:choice(['live','stale','terminal','unknown'])});
const rect=object(Object.fromEntries(['left','top','width','height'].map(k=>[k,{type:'number'}])));
const schema=object({
  schemaVersion:{const:'qa1b-packet-v1'},contractRevision:{const:'r1-review-B'},
  eventId:{type:'string',pattern:'^e[1-9][0-9]{0,15}$'},sampleSequence:positive,
  kind:choice(['fetch','winner','guard','handoff','terminal','subattempt','gap']),caller:choice(CALLERS),
  stage:choice(['before-player','after-player','post-request','post-reveal','unknown']),
  format:choice(['video','display','opportunity','unknown']),identity,ownership,
  time:object({sourceClock:choice(['synthetic-monotonic-ms','page-monotonic-ms','unknown']),monotonicMs:nullable({type:'number',minimum:0})}),
  provenance:object({distribution:choice(Object.keys(CORES)),coreSha256:{type:'string',pattern:'^[a-f0-9]{64}$'},
    origin:choice(['synthetic-fixture','unknown']),fixtureVersion:local,cssModelVersion:local,configVersion:local,
    boundary:choice(['native-fetch','native-auction','native-decision','guard-result','handoff','terminal','subattempt','unknown']),verified:bool}),
  guard:object({executed:bool,eligible:nullable(bool),reason:choice(REASONS),playerCreated:nullable(bool)}),
  evidence:object({anchorRect:nullable(rect),viewport:nullable(object({width:{type:'number'},height:{type:'number'}})),
    documentVisibility:choice(['visible','hidden','unknown'])}),
  facts:object({initialWinner:choice(['video','display','none','unknown']),
    winnerSource:choice(['native-decision','preparation-descriptor','unknown']),
    terminal:choice(['complete','timeout','error','disposed','abandoned',null]),
    relation:choice(['initial','fallback','refresh','handoff','subattempt','unknown'])}),
});
schema.$schema='https://json-schema.org/draft/2020-12/schema';
schema.$id='urn:intext:qa1b:packet:v1';

function freeze(x){if(x&&typeof x==='object'){for(const value of Object.values(x))freeze(value);Object.freeze(x);}return x;}
freeze(schema);

// Descriptor-only copy: accessors, exotic prototypes, cycles and unknown keys fail closed.
// This never calls input getters, toJSON or SDK/DOM methods.
function validate(input){
  const errors=[];
  function read(value,s,path,depth=0){
    if(depth>12){errors.push(`${path}:depth`);return undefined;}
    if(s.anyOf){
      if(value===null&&s.anyOf.some(x=>x.type==='null'))return null;
      return read(value,s.anyOf.find(x=>x.type!=='null'),path,depth+1);
    }
    if(Object.hasOwn(s,'const')){if(value!==s.const)errors.push(`${path}:const`);return value;}
    if(s.enum){if(!s.enum.includes(value))errors.push(`${path}:enum`);return value;}
    if(s.type==='object'){
      if(!value||typeof value!=='object'||Array.isArray(value)){errors.push(`${path}:object`);return null;}
      let proto,ds;
      try{proto=Object.getPrototypeOf(value);ds=Object.getOwnPropertyDescriptors(value);}catch{errors.push(`${path}:descriptors`);return null;}
      if(proto!==Object.prototype&&proto!==null){errors.push(`${path}:prototype`);return null;}
      if(Reflect.ownKeys(ds).some(k=>typeof k!=='string'||!Object.hasOwn(s.properties,k)))errors.push(`${path}:extra-key`);
      const out={};
      for(const [key,child]of Object.entries(s.properties)){
        const d=ds[key];
        if(!d||!Object.hasOwn(d,'value')||!d.enumerable){errors.push(`${path}.${key}:data-property`);continue;}
        out[key]=read(d.value,child,`${path}.${key}`,depth+1);
      }
      return out;
    }
    let ok=s.type==='integer'?Number.isSafeInteger(value):s.type==='number'?typeof value==='number'&&Number.isFinite(value):typeof value===s.type;
    if(ok&&s.minimum!==undefined)ok=value>=s.minimum;
    if(ok&&s.maximum!==undefined)ok=value<=s.maximum;
    if(ok&&s.pattern)ok=new RegExp(s.pattern).test(value);
    if(!ok)errors.push(`${path}:${s.type}`);
    return value;
  }
  const packet=read(input,schema,'packet');
  if(!errors.length){
    if(packet.eventId!==`e${packet.sampleSequence}`)errors.push('packet:event-sequence-mismatch');
    if(packet.provenance.coreSha256!==CORES[packet.provenance.distribution])errors.push('packet:core-mismatch');
    if(!packet.guard.executed&&packet.guard.eligible!==null)errors.push('packet:unexecuted-is-not-false');
    if(packet.guard.executed&&typeof packet.guard.eligible!=='boolean')errors.push('packet:executed-without-result');
  }
  return errors.length?{valid:false,errors,packet:null}:{valid:true,errors:[],packet:freeze(packet)};
}
const clone=x=>JSON.parse(JSON.stringify(x));
const bytes=x=>Buffer.byteLength(JSON.stringify(x),'utf8');
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
function completeIdentity(i){return i.verified&&i.state==='live'&&i.renderToken===i.activeRenderToken
  &&['documentLocalId','navigationLocalId','slotLocalId','anchorLocalId','cycleId','fetchGeneration','renderToken','activeRenderToken'].every(k=>i[k]!==null);}
function select(packet){
  const p=packet,owner=p.ownership;
  const verified=completeIdentity(p.identity)&&owner.verified&&owner.state==='live'&&owner.nodeLocalId===p.identity.slotLocalId
    &&owner.waterfallLocalId!==null&&owner.attemptLocalId!==null&&p.provenance.verified&&p.provenance.origin==='synthetic-fixture';
  const primary=p.kind==='guard'&&PRIMARY.includes(p.caller)&&p.stage==='before-player'&&p.format==='video'
    &&p.guard.playerCreated===false&&p.guard.executed&&p.provenance.boundary==='guard-result'
    &&(p.caller==='W2'||owner.creativeLocalId!==null)&&verified;
  const series=p.caller==='W1'?'display':PRIMARY.includes(p.caller)?'primary-video':p.caller==='C4'?'preparation':
    ['C3','C5'].includes(p.caller)?'diagnostic':['C6','C7','C8'].includes(p.caller)?'recovery':p.caller==='C9'?'reveal':
      ['C10','C11'].includes(p.caller)?'post-player-activation':p.caller==='C2'?'no-fill':'population-or-unknown';
  return {primary,verified,series,acceptanceA:primary?'valid':'not-admitted'};
}
module.exports={schema,CORES,CALLERS,PRIMARY,validate,select,completeIdentity,clone,bytes,digest,freeze};
