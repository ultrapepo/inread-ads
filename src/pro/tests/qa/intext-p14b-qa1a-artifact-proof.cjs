'use strict';
// Local bytes only. This verifier does not call the runner, acquire data or certify an external audit.
const {createHash}=require('node:crypto');
const {Buffer}=require('node:buffer');
const D=require('./intext-p14b-data.cjs'),E=require('./intext-p14b-shadow-evaluator.cjs');
const ARTIFACTS=Object.freeze(Object.fromEntries([
  ['18299f4fa54e151ff045e6d355c554055bdc85399ddec29eb5e9e85990bcfdfc','E0','_gam_kv_.js'],
  ['6356718da3b272d2c68ac208ac9147020b9b327ce6b6dc7b40af3317e3e58e11','E1','_gam_kv_.js'],
  ['0995a835320911ea856636044e5008e175285f8bbc76abb1f94aa596290fbf5f','E0','IntextManager.js'],
  ['250c24ca253e814c6cca4beec1363fe32abd6f17cf2c9234fdf2a5f73c164bd8','E1','IntextManager.js'],
].map(([sha,arm,distribution])=>[sha,Object.freeze({arm,distribution,coreSha256:E.CORES[distribution]})])));
const proofs=new WeakMap();
const digest=x=>createHash('sha256').update(x).digest('hex');
const failure=reason=>({status:'not-verified',reason,proof:null,externalIndependentAudit:'not-performed'});
function checkedJSON(source,maxBytes){
  if(!D.record(source)||typeof source.text!=='string'||Buffer.byteLength(source.text)>maxBytes
    ||!D.hash(source.sha256)||digest(source.text)!==source.sha256)throw Error('source-bytes-or-sha256-mismatch');
  return JSON.parse(source.text);
}
function receiptAgrees(receipt,artifact){
  return D.record(receipt)&&['arm','distribution','coreSha256','servedSha256','evidenceSha256','entryIndex'].every(k=>D.own(receipt,k)===artifact[k]);
}
function verifyHarArtifactV2({har,qa,debug,receipt}){
  if(!har||!qa||!debug||!receipt)return failure('raw-evidence-required');
  let h,q,d;try{h=checkedJSON(har,128*1024*1024);q=checkedJSON(qa,8*1024*1024);d=checkedJSON(debug,8*1024*1024);}catch{return failure('source-bytes-or-json-invalid');}
  const qlogs=D.items(q?.logs,10000),dlogs=D.items(d?.logs,10000),entries=D.items(h?.log?.entries,100000);
  if(q?.schema!=='p14a-dependencies-v1'||q.qaOnly!==true||q.enforce!==false||!['E0','E1'].includes(q.arm)
    ||d?.schemaVersion!=='1.0.0'||!qlogs||!dlogs||!entries)return failure('source-schemas-or-limits-invalid');
  const fixed=qlogs.filter(r=>r?.event==='assignment_fixed');
  if(fixed.length!==1||fixed[0].effectiveArm!==q.arm||qlogs.some(r=>r?.event==='assignment_conflict'||(r?.arm!==undefined&&r.arm!==q.arm)))return failure('arm-inconsistent');
  const tuple=(event,r)=>JSON.stringify([event,r.timestamp,r.slotId,r.cycleId,r.renderToken]);
  const qaTuples=new Set(qlogs.filter(r=>D.finite(r?.timestamp)&&D.integer(r?.cycleId,1)&&D.localId(r?.slotId)).map(r=>tuple(r.event,r)));
  const common=new Set();
  for(const log of dlogs){if(typeof log?.message!=='string'||!log.message.startsWith('[IntextMetrics]'))continue;
    for(const m of D.items(log.args,100)||[]){if(D.record(m)){const key=tuple(m.metric,m);if(qaTuples.has(key))common.add(key);}}}
  if(common.size<2)return failure('export-content-correlation-insufficient');
  const times=dlogs.map(r=>r?.timestamp).filter(D.finite);if(!times.length)return failure('document-window-unknown');
  const first=Math.min(...times),last=Math.max(...times);
  const docs=[];
  entries.forEach((e,index)=>{try{const u=new URL(e?.request?.url),start=Date.parse(e.startedDateTime);
    if(e._resourceType==='document'&&u.origin===d.page?.origin&&u.pathname===d.page?.pathname
      &&D.finite(start)&&start<=first&&last-start<600000)docs.push({entry:e,index});}catch{/* Invalid URL is not evidence. */}});
  if(docs.length!==1||typeof docs[0].entry.pageref!=='string'||!docs[0].entry.pageref)return failure('document-correlation-insufficient');
  const candidates=[];
  entries.forEach((e,index)=>{try{
    const u=new URL(e?.request?.url),content=e?.response?.content;
    if(e.pageref!==docs[0].entry.pageref||!/(?:^|\/)(?:_gam_kv_|IntextManager)\.js$/.test(u.pathname)
      ||typeof content?.text!=='string'||(content.encoding!==undefined&&content.encoding!=='base64'))return;
    const bytes=content.encoding==='base64'?Buffer.from(content.text,'base64'):Buffer.from(content.text,'utf8');
    const servedSha256=digest(bytes),pinned=ARTIFACTS[servedSha256];
    if(pinned)candidates.push({...pinned,servedSha256,evidenceSha256:har.sha256,entryIndex:index});
  }catch{/* Reject malformed entry without executing its contents. */}});
  if(candidates.length!==1||candidates[0].arm!==q.arm)return failure('captured-body-absent-ambiguous-or-wrong-arm');
  const artifact=Object.freeze(candidates[0]);
  if(!receiptAgrees(receipt,artifact))return failure('runner-receipt-incompatible');
  const proof=Object.freeze({kind:'qa1a-local-har-proof-v2'});
  proofs.set(proof,{artifact,sources:Object.freeze([qa.sha256,debug.sha256])});
  return {status:'local-bytes-verified',reason:'har-and-export-content-recomputed',proof,
    evidence:{...artifact,qaSha256:qa.sha256,debugSha256:debug.sha256,documentEntryIndex:docs[0].index,exactDiagnosticMatches:common.size},
    externalIndependentAudit:'not-performed'};
}
function resolveHarProofV2(proof,sourceSha256,arm,receipt){
  const bound=proof&&typeof proof==='object'?proofs.get(proof):null;
  return bound&&bound.sources.includes(sourceSha256)&&bound.artifact.arm===arm&&receiptAgrees(receipt,bound.artifact)?{...bound.artifact}:null;
}
module.exports={ARTIFACTS,verifyHarArtifactV2,resolveHarProofV2};
