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
