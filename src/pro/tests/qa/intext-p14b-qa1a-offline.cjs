'use strict';
// Explicit local-file runner. Never loads a URL or executes code from an input.
const fs=require('node:fs'),path=require('node:path');
const C=require('./intext-p14b-qa1a-converter.cjs');
const V=require('./intext-p14b-qa1a-artifact-proof.cjs');
const CASES=Object.freeze([
  ['case01','A2-E0-debug.json','A2-E0.json','A2-E0.har'],
  ['case02','A2-E0-2-debug.json','A2-E0-2.json','A2-E0-2.har'],
  ['case03','A2-E0-3-debug.json','A2-E0-3.json','A2-E0-3.har'],
  ['case04','A2-E1-debug.json','A2-E1.json','A2-E1.har'],
  ['case05','E1-2-debug.json','A2-E1-2.json','A2-E1-2.har'],
  ['case06','E1-3-debug.json','A2-E1-3.json','A2-E1-3.har'],
  ['case07','A2-Legacy-E0-real-1-JSON.json','A2-Legacy-E0-real-1.json','A2-Legacy-E0-real-1.har'],
  ['case08','A2-Legacy-E0-real-2-JSON.json','A2-Legacy-E0-real-2.json','A2-Legacy-E0-real-2.har'],
  ['case09','A2-PSP-E0-1-JSON.json','A2-PSP-E0-1.json','A2-PSP-E0-1.har'],
  ['case10','E0-26oct-json.json','E0-26oct.json','www.marca.com-mobile E0-26oct.har'],
]);
function readSource(directory,file,maxBytes){
  if(path.basename(file)!==file)throw new TypeError('qa1a_basename_required');
  const target=path.join(directory,file);if(!fs.existsSync(target))return null;
  const size=fs.statSync(target).size;if(size>maxBytes)throw new RangeError('qa1a_file_limit');
  const bytes=fs.readFileSync(target),text=bytes.toString('utf8');
  return {file,bytes:bytes.length,sha256:C.hash(bytes),text};
}
function capturedArtifactV1(har,debug,arm){
  if(!har)return {artifact:null,reason:'HAR-unavailable'};
  const x=JSON.parse(har.text),entries=x.log?.entries;
  if(!Array.isArray(entries)||entries.length>100000)return {artifact:null,reason:'HAR-entries-invalid'};
  const origin=debug.page?.origin,pathname=debug.page?.pathname;
  const stamps=debug.logs?.map(l=>l.timestamp).filter(Number.isFinite)||[];
  const first=stamps.length?Math.min(...stamps):null,last=stamps.length?Math.max(...stamps):null;
  const docs=entries.filter(e=>{
    try{const u=new URL(e.request?.url),t=Date.parse(e.startedDateTime);
      return e._resourceType==='document'&&u.origin===origin&&u.pathname===pathname&&Number.isFinite(t)&&first!==null&&t<=first&&last-t<600000;
    }catch{return false;}
  });
  if(docs.length!==1||!docs[0].pageref)return {artifact:null,reason:'HAR-document-correlation-insufficient'};
  const page=docs[0].pageref,matches=[];
  for(let i=0;i<entries.length;i++){
    const e=entries[i];let pathname;try{pathname=new URL(e.request?.url).pathname;}catch{continue;}
    if(e.pageref!==page||!/(?:^|\/)(?:_gam_kv_|IntextManager)\.js$/.test(pathname))continue;
    const content=e.response?.content;if(typeof content?.text!=='string')continue;
    if(content.encoding!==undefined&&content.encoding!=='base64')continue;
    const body=content.encoding==='base64'?Buffer.from(content.text,'base64'):Buffer.from(content.text,'utf8');
    const servedSha256=C.hash(body),pinned=C.ARTIFACTS[servedSha256];
    if(pinned?.arm===arm)matches.push({attestationSchema:'qa1a-runner-har-v2',...pinned,servedSha256,evidenceSha256:har.sha256,entryIndex:i});
  }
  return matches.length===1?{artifact:matches[0],reason:'runner-body-and-document-attested'}:{artifact:null,reason:'pinned-body-absent-or-ambiguous'};
}
function summarizeConversionV1(result){
  const rows=result.records,stat=family=>Object.fromEntries(['pass','fail','unknown','not-applicable'].map(s=>[s,rows.filter(r=>r.results.find(x=>x.candidateId===family)?.status===s).length]));
  return {source:result.source,records:rows.length,
    factualC0:{true:rows.filter(r=>r.evidence.factualC0===true).length,false:rows.filter(r=>r.evidence.factualC0===false).length,unknown:rows.filter(r=>r.evidence.factualC0===null).length},
    measuredPartialP:rows.filter(r=>r.evidence.geometryQuality==='partial').length,
    playerRectCounts:Object.fromEntries(['rectPresent','rectComplete','rectUsable'].map(k=>[k,rows.filter(r=>r.evidence.playerRect[k]).length])),
    stageCounts:Object.fromEntries(['before-player','after-player','post-request','post-reveal','unknown'].map(s=>[s,rows.filter(r=>r.sample.stage===s).length])),
    firstPartialP:rows.find(r=>r.evidence.geometryQuality==='partial')?.evidence.pointer??null,
    nativeImpressions:rows.filter(r=>r.evidence.nativeImpressionObserved).length,attributedFrames:rows.filter(r=>r.facts.frame).length,
    temporalQuality:Object.fromEntries(['page-monotonic-observed','epoch-only','regression','unknown'].map(s=>[s,rows.filter(r=>r.evidence.temporalQuality===s).length])),
    B0:stat('B0'),B1:stat('B1'),B2:stat('B2'),B3:stat('B3'),B4:stat('B4'),B5:stat('B5'),
    accounting:result.accounting,status:'coverage-insufficient',exactRatesAllowed:false};
}
function analyzeDirectoryV1(directory){
  const cases=[],conversions=[],sources=[];
  for(const [captureLocalId,qaFile,debugFile,harFile]of CASES){
    const qa=readSource(directory,qaFile,C.LIMITS.inputBytes),debug=readSource(directory,debugFile,C.LIMITS.inputBytes);
    if(!qa||!debug){cases.push({captureLocalId,status:'input-missing',qaAvailable:!!qa,debugAvailable:!!debug});continue;}
    const qp=C.parseInputV1(qa.text,qa.sha256),dp=C.parseInputV1(debug.text,debug.sha256);
    if(qp.kind!=='dependencies'||dp.kind!=='debugger')throw new TypeError('qa1a_input_role_mismatch');
    const q=qp.value,d=dp.value,link=C.metadataLinkV1(q,d),arm=C.armOf(q);
    const har=readSource(directory,harFile,128*1024*1024),proof=capturedArtifactV1(har,d,arm);
    const checked=V.verifyHarArtifactV2({har,qa,debug,receipt:proof.artifact});
    sources.push(...[qa,debug,har].filter(Boolean).map(({file,bytes,sha256})=>({file,bytes,sha256,captureLocalId})));
    const context={captureLocalId,linkedRuntime:d.runtime,linkedArm:arm,metadataLinkVerified:link.matched,artifact:proof.artifact,artifactProof:checked.proof};
    const results=[qa,debug].map(s=>C.convertExportV1({text:s.text,expectedSha256:s.sha256,context}));
    conversions.push(...results);
    const {proof:opaqueProof,...localByteCheck}=checked;
    cases.push({captureLocalId,qaFile,debugFile,harFile,metadataLink:link,artifactProof:proof,localByteCheck,
      status:link.matched?'converted-with-limitations':'metadata-link-insufficient',results:results.map(summarizeConversionV1)});
  }
  return {schema:'p14b-qa1a-offline-analysis-v1',qaOnly:true,enforce:false,sources,cases,conversions,
    policy:'Each export/capture/cohort/arm/distribution/version remains separate. Counts describe records, never traffic or causal effects.',
    nextPhase:'Independent review first. QA1-B acquisition remains unauthorized.'};
}
function writeResultsV1(result,outputDirectory){
  const summary={...result};delete summary.conversions;
  for(const [name,value]of [['intext-p14b-qa1a-results.json',summary],['intext-p14b-qa1a-converted.json',{schema:'p14b-qa1a-converted-set-v1',conversions:result.conversions}]]){
    const json=JSON.stringify(value,null,2)+'\n';if(Buffer.byteLength(json)>64*1024*1024)throw new RangeError('qa1a_output_limit');
    fs.writeFileSync(path.join(outputDirectory,name),json);
  }
}
if(require.main===module){
  const [directory,outputDirectory]=process.argv.slice(2);if(!directory||!outputDirectory)throw new Error('Usage: node intext-p14b-qa1a-offline.cjs INPUT_DIRECTORY OUTPUT_DIRECTORY');
  const result=analyzeDirectoryV1(path.resolve(directory));writeResultsV1(result,path.resolve(outputDirectory));
  process.stdout.write(JSON.stringify({cases:result.cases.length,convertedExports:result.conversions.length,inputSources:result.sources.length,records:result.conversions.reduce((n,c)=>n+c.records.length,0)})+'\n');
}
module.exports={CASES,readSource,capturedArtifactV1,summarizeConversionV1,analyzeDirectoryV1,writeResultsV1};
