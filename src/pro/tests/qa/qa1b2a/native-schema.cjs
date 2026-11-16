'use strict';
// A new output profile, not a modification or implicit widening of Stage I's schema.
const P=require('../qa1b/packet.cjs');
const object=properties=>({type:'object',additionalProperties:false,required:Object.keys(properties),properties});
const choice=values=>({enum:values});
const sha={type:'string',pattern:'^[a-f0-9]{64}$'};
const base=P.schema.properties;
const schema=P.freeze({$schema:'https://json-schema.org/draft/2020-12/schema',$id:'urn:qa1b:native-packet:II-A-offline:v1',
  ...object({schemaVersion:{const:'qa1b-native-packet-v1'},contractRevision:base.contractRevision,eventId:base.eventId,sampleSequence:base.sampleSequence,
    kind:base.kind,caller:base.caller,stage:base.stage,format:base.format,series:choice(['primary-video-preplayer','non-primary-video','display','native-lifecycle']),
    identity:base.identity,ownership:base.ownership,time:base.time,
    provenance:object({distribution:base.provenance.properties.distribution,coreSha256:sha,copySha256:sha,
      origin:{const:'native-boundary'},producerProfile:{const:'II-A-offline'},boundary:base.provenance.properties.boundary,verified:{type:'boolean'}}),
    guard:object({executed:{type:'boolean'},eligible:{anyOf:[{type:'boolean'},{type:'null'}]},
      reason:{anyOf:[{type:'string',maxLength:48},{type:'null'}]},playerCreated:{anyOf:[{const:false},{type:'null'}]}}),
    evidence:object({rect:{type:'null'},viewport:{type:'null'},P:{const:'unknown'}}),
    facts:object({initialWinner:choice(['video','display','none','unknown']),observedInitialWinner:choice(['video','display','none','unknown']),
      winnerSource:choice(['native-decision','unknown']),terminal:{const:null}})})});
// Output conformance only. Validation never accredits an input or authenticates JSON.
function conforms(value,s= schema){
  if(s.anyOf)return s.anyOf.some(x=>conforms(value,x));
  if(Object.hasOwn(s,'const')&&value!==s.const)return false;
  if(s.enum&&!s.enum.includes(value))return false;
  if(s.type==='null')return value===null;
  if(s.type==='boolean'&&typeof value!=='boolean')return false;
  if(s.type==='string'&&(typeof value!=='string'||(s.pattern&&!new RegExp(s.pattern).test(value))||(s.maxLength&&value.length>s.maxLength)))return false;
  if(['number','integer'].includes(s.type)&&(typeof value!=='number'||!Number.isFinite(value)||(s.type==='integer'&&!Number.isSafeInteger(value))||(s.minimum!==undefined&&value<s.minimum)||(s.maximum!==undefined&&value>s.maximum)))return false;
  if(s.type==='object'){
    if(!value||typeof value!=='object'||Array.isArray(value))return false;
    const keys=Reflect.ownKeys(value);
    if(keys.some(k=>typeof k!=='string'||!Object.hasOwn(s.properties,k))||s.required.some(k=>!Object.hasOwn(value,k)))return false;
    return keys.every(k=>{const d=Object.getOwnPropertyDescriptor(value,k);return Object.hasOwn(d,'value')&&conforms(d.value,s.properties[k]);});
  }
  return true;
}
module.exports={schema,conforms};
