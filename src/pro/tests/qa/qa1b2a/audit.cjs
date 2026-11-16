'use strict';
// Offline artifact runner. Writes only the explicit NEW II-A allowlist below.
// Never evaluates an entire core/copy and never serves, installs or sends data.
const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const assert=require('node:assert/strict');
const H=require('./harness.cjs');
const G=require('./generator.cjs');
const P=require('../qa1b/packet.cjs');
const ROOT=path.resolve(__dirname,'../../..');
const DOC='docs/intext-p14b-qa1b-stage2a-';
const DIR='tests/qa/generated/qa1b-stage2a';
const MANIFEST=`${DOC}integrity.json`;
const artifactNames=['before.json','review.md','browser-protocol.md','validation.txt','stage1-validation.txt','frozen-validation.txt',
  'results.json','effects.json','evidence.json','native-export.json','copies.json','gam.diff','manager.diff'];
const newFiles=[...artifactNames.map(n=>DOC+n),'tests/intext-p14b-qa1b-stage2a.test.cjs',
  ...['audit.cjs','facade.cjs','generator.cjs','harness.cjs','native.cjs','native-schema.cjs'].map(n=>'tests/qa/qa1b2a/'+n),
  `${DIR}/gam.qa.js`,`${DIR}/manager.qa.js`];
function entry(file){const b=fs.readFileSync(file);return {file,bytes:b.length,sha256:G.hash(b)};}
function check(entries){for(const e of entries){const actual=entry(e.file);assert.equal(actual.bytes,e.bytes,e.file);assert.equal(actual.sha256,e.sha256,e.file);}return entries.length;}
function write(file,data){if(!newFiles.includes(file)&&file!==MANIFEST)throw new Error('outside-new-artifact-allowlist');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,typeof data==='string'||Buffer.isBuffer(data)?data:JSON.stringify(data,null,2)+'\n');}
function before(){const b=JSON.parse(fs.readFileSync(DOC+'before.json','utf8'));assert.equal(b.files.length,386);check(b.files);return b;}
function run(label,args,file){
  // Explicit file descriptors also work where Windows sandbox pipes are denied.
  write(file,`cwd: ${ROOT}\nNode: ${process.version}\ncommand argv: ${JSON.stringify([process.execPath,...args])}\n\n`);
  const fd=fs.openSync(file,'a');let r;
  try{r=spawnSync(process.execPath,args,{cwd:ROOT,stdio:['ignore',fd,fd],timeout:180000});}finally{fs.closeSync(fd);}
  if(r.error)throw r.error;
  const output=fs.readFileSync(file,'utf8');write(file,output+`\nprocess exit: ${r.status}\n`);
  const n=kind=>Number(new RegExp(`# ${kind} (\\d+)`).exec(output)?.[1]??-1);
  const result={label,command:['node',...args],cwd:ROOT,node:process.version,exit:r.status,tests:n('tests'),pass:n('pass'),fail:n('fail'),log:file};
  if(result.tests<0)throw new Error(`unreadable-test-report:${label}`);return result;
}
async function evidence(){
  const effects=[],copies=[],records=[];let manual;
  for(const distribution of H.distributions){
    const s=H.source(distribution),name=distribution==='_gam_kv_.js'?'gam':'manager',target=`${DIR}/${name}.qa.js`;
    write(target,s.copy);const reverse=G.restore(s.copy,s.manifest);assert.deepEqual(reverse,s.base);
    const diffFile=`${DOC}${name}.diff`;write(diffFile,'');const fd=fs.openSync(diffFile,'a');let diff;
    try{diff=spawnSync('git',['diff','--no-index','--no-ext-diff','--text','--',distribution,target],{stdio:['ignore',fd,fd]});}finally{fs.closeSync(fd);}
    if(diff.error||diff.status!==1)throw diff.error||new Error('diff-not-produced');
    copies.push({...s.manifest,file:target,diff:`${DOC}${name}.diff`,reverseSha256:G.hash(reverse),reversedByteForByte:true,wholeCopyExecuted:false});
    for(const branch of ['new','prepared','below-to-visible','stale','sink-fault']){
      const traces=[];let outcome;
      for(const copy of [false,true]){
        const h=H.env(distribution,{copy,throwSink:branch==='sink-fault',position:branch==='below-to-visible'?900:20});await h.start();h.resetTrace();
        if(branch==='prepared'){h.waterfall._videoPreparation={};h.waterfall.getPreparedVideo=()=>{h.record('getPrepared');return {creative:h.creative};};}
        if(branch==='stale')h.setActive(false);
        if(branch==='below-to-visible'){
          const promise=h.node.waitForViewport(1,'buildAndPlayVideo:capacity-or-legacy');h.setTop(20);h.callbacks.get('window:scroll')();outcome=await promise;
        }else outcome=await h.node.buildAndPlayVideo('offline-no-request',1,'offline');
        traces.push(P.clone(h.trace));
        if(copy&&branch==='new')manual=h.native.exportManual();
      }
      assert.deepEqual(traces[0],traces[1]);effects.push({distribution,branch,result:outcome??null,original:traces[0],copy:traces[1],equal:true});
    }
    const ring=H.env(distribution);await ring.start();for(let i=0;i<1100;i++)ring.guard('W2',i%2===0);
    const overflow=H.env(distribution);for(let i=0;i<65;i++){if(i)overflow.waterfall.original_cleanup.call(overflow.waterfall);await overflow.start();overflow.guard('W2');}
    ring.native.close(10000);const r=ring.native.exportManual(),o=overflow.native.exportManual();
    records.push({distribution,ring:{memory:r.memory,totals:r.qa0.totals,coverage:r.qa0.coverage,counters:r.metadata.counters,export:ring.native.serializeManual({maxBytes:10}),
      defaultExport:(()=>{const e=ring.native.serializeManual();return {status:e.status,bytes:e.bytes,jsonIncluded:e.json!==null};})()},
      overflow65:{memory:o.memory,totals:o.qa0.totals,coverage:o.qa0.coverage,retainedSummaries:o.qa0.summaries.length,authority:o.metadata.authority}});
  }
  write(DOC+'copies.json',{schema:'qa1b-stage2a-build-manifest-v1',copies});
  write(DOC+'effects.json',{schema:'qa1b-stage2a-effects-v1',kind:'isolated-method-offline-doubles',realSDK:false,wallClockEqualityClaim:false,effects});
  write(DOC+'evidence.json',{schema:'qa1b-stage2a-evidence-v1',sourceComplete:false,physicalBudgetMeasured:false,records});
  write(DOC+'native-export.json',manual);
}
async function main(){
  assert.equal(process.cwd(),ROOT,'run from project root');
  if(process.argv[2]==='--verify'){
    const m=JSON.parse(fs.readFileSync(MANIFEST,'utf8'));const protectedCount=check(m.protectedBefore),newCount=check(m.newFiles);
    for(const c of JSON.parse(fs.readFileSync(DOC+'copies.json','utf8')).copies){const {copy,manifest}=G.build(c.distribution,fs.readFileSync(c.distribution));assert.equal(G.hash(copy),c.copySha256);assert.deepEqual(G.restore(fs.readFileSync(c.file),manifest),fs.readFileSync(c.distribution));}
    console.log(JSON.stringify({protectedCount,newCount,manifestSha256:G.hash(fs.readFileSync(MANIFEST)),reverse:'2/2 byte-identical',wholeCopiesExecuted:false}));return;
  }
  const b=before();await evidence();
  const stage2a=run('II-A',['--test','--test-isolation=none','--test-reporter=tap','--experimental-test-coverage','--test-coverage-include=tests/qa/qa1b2a/*.cjs','tests/intext-p14b-qa1b-stage2a.test.cjs'],DOC+'validation.txt');
  const stage1=run('Stage I frozen',['--test','--test-isolation=none','--test-reporter=tap','tests/intext-p14b-qa1b-stage1.test.cjs'],DOC+'stage1-validation.txt');
  const frozen=run('QA0 / QA1-A frozen',['--test','--test-isolation=none','--test-reporter=tap','tests/intext-p14b-shadow.audit.test.cjs','tests/intext-p14b-qa1a.audit.test.cjs'],DOC+'frozen-validation.txt');
  assert.equal(stage2a.fail,0);assert.equal(stage2a.exit,0);assert.equal(stage1.pass,57);assert.equal(stage1.fail,0);assert.equal(frozen.tests,110);assert.equal(frozen.pass,108);assert.equal(frozen.fail,2);
  const protectedCount=check(b.files);
  write(DOC+'results.json',{schema:'qa1b-stage2a-results-v1',node:process.version,platform:process.platform,stage2a,stage1,frozen,
    integrity:{protectedUnchanged:protectedCount,originals:360,contracts:4,approvedStageI:22,styBytes:3940,stySha256:'15c72d69032cc0e212b1501cdd78e9da78561b404c65165fe1a6d02efe16b660'},
    historicalFailures:{expectedBytes:3903,actualBytes:3940,testsAltered:false,testsFiltered:false,styRestored:false},
    sourceComplete:false,exactRatesAllowed:false,browserExecuted:false,wholeCopiesExecuted:false,independentAuditPending:true});
  write(MANIFEST,{schema:'qa1b-stage2a-integrity-v1',protectedBefore:b.files,newFiles:newFiles.map(entry),selfHashExcluded:true,
    reversal:'Remove only the listed new II-A artifacts plus this manifest; no existing file requires restoration. Core copy inversion is separately verified byte for byte.',
    modifiedExistingFiles:[],wholeCopiesExecuted:false});
  console.log(JSON.stringify({stage2a,stage1,frozen,protectedCount,newFiles:newFiles.length,manifest:entry(MANIFEST)},null,2));
}
if(require.main===module)main().catch(error=>{console.error(error.stack);process.exitCode=1;});
module.exports={newFiles,check,evidence};
