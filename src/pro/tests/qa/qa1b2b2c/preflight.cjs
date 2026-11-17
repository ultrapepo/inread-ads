'use strict';
// II-B2/C independent read-only checks of prior inputs. Never calls frozen verify
// (its historical HEAD/allowlist is intentionally not the current environment).
const fs=require('node:fs'),crypto=require('node:crypto'),cp=require('node:child_process'),os=require('node:os');
const P='docs/intext-p14b-qa1b-II-B2C-';
const ROOT_SHA='3ac37c8396ea1739c9bf362c26a102f020db6336ffa7e0dd4992037b9665b94f';
const SHA=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const record=file=>{const b=fs.readFileSync(file);return {file,bytes:b.length,sha256:SHA(b)};};
const inputs=['II-B0-design.md','II-B0-budget-rollback.md','II-B0-test-matrix.md','II-B1-browser-readiness.md','II-B1-results.json','II-B1-integrity.json','II-B1-fixture-release.json','II-B1-copy-manifest.json'].map(x=>'docs/intext-p14b-qa1b-'+x);
function git(args){try{return {ok:true,stdout:cp.execFileSync('git',args,{encoding:'utf8'}).trim(),argv:['git',...args],source:'Node child_process'};}catch(e){const file=P+'git-environment.json';
  const captured=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)).records.find(x=>JSON.stringify(x.argv)===JSON.stringify(['git',...args])&&x.exit_code===0):null;
  return captured?{ok:true,argv:captured.argv,stdout:captured.output.trim(),source:'working exec_command tool capture',capture:record(file),childProcessError:e.message}:
    {ok:false,argv:['git',...args],error:e.message,status:e.status,stderr:e.stderr?.toString()};}}
function run(){const manifest=inputs.find(x=>x.endsWith('II-B1-integrity.json'));if(record(manifest).sha256!==ROOT_SHA)throw new Error('approved-external-root-mismatch');
  const m=JSON.parse(fs.readFileSync(manifest)),all=[...m.before,...m.newFiles,record(manifest)],checked=[],missing=[],mismatches=[];
  for(const x of all){if(!fs.existsSync(x.file)){missing.push(x);continue;}const y=record(x.file);checked.push(y);if(x.bytes!==y.bytes||x.sha256!==y.sha256)mismatches.push({expected:x,actual:y});}
  const fullReads=inputs.map(file=>{const text=fs.readFileSync(file,'utf8');const json=file.endsWith('.json')?JSON.parse(text):null;return {...record(file),readEntirely:true,keys:json?Object.keys(json):null};});
  const build=JSON.parse(fs.readFileSync(inputs.at(-1)));let anchors=0;for(const c of build.copies){const b=fs.readFileSync(c.output);if(SHA(b)!==c.copySha256)throw new Error('copy-sha');for(const x of c.inputs){if(record(x.file).sha256!==x.sha256)throw new Error('recipe-input');}for(const e of c.edits){if(typeof e.before!=='string'||typeof e.after!=='string')throw new Error('incomplete-transform');anchors++;}}
  const release=JSON.parse(fs.readFileSync('docs/intext-p14b-qa1b-II-B1-fixture-release.json'));for(const x of release.files){if(record(x.file).sha256!==x.sha256||'sha256-'+Buffer.from(x.sha256,'hex').toString('base64')!==x.sri)throw new Error('fixture-release');}
  const tracked=git(['ls-files','--full-name','-z']),names=tracked.ok?tracked.stdout.split('\0').filter(Boolean).map(x=>x.replace(/^src\/pro\//,'')):null;
  const historicalHead=m.head,currentHead=git(['rev-parse','HEAD']),remoteCache=git(['rev-parse','refs/remotes/origin/main']);
  const data={schema:'qa1b-II-B2C-preflight-v1',at:new Date().toISOString(),status:mismatches.length?'FAIL':missing.length?'BLOCKED':'PASS',cwd:process.cwd(),node:process.version,
    platform:{type:os.type(),release:os.release(),version:os.version(),arch:os.arch()},externalApprovedRoot:ROOT_SHA,
    A_historicalLocal:{expected:418,verified:checked.filter(x=>m.before.some(y=>y.file===x.file)).length},B_versionControl:{currentHead,historicalHead,remoteTrackingCache:remoteCache,trackedFileCount:names?.length??null,trackedFiles:names,trackingEvidence:tracked.source??'BLOCKED',GitHubLive:'NOT-QUERIED; local tracked/ref data is not a live GitHub attestation'},
    C_generatedUntracked:release.files.filter(x=>x.file.includes('/generated/')).map(x=>({...x,tracked:names?names.includes(x.file):null})),D_HEAD:{historical:historicalHead,current:currentHead.stdout??null,changed:currentHead.ok?currentHead.stdout!==historicalHead:null},
    completeInputReads:fullReads,inspectedRecipeInputs:build.inputs,inspectedTransformSegments:anchors,checked,missing,mismatches,
    frozenVerifier:{executed:false,modified:false,knownIncompatibleExpectations:['historical HEAD '+historicalHead,'only II-B1 add-only inventory; II-B2/C paths are new'],independentChecks:'Pinned external root, all 447 expected local bytes, recipe and release/SRI'},
    priorSuites:'Not rerun or relabelled: II-B1 138/138, I57/57, II-A106/106, QA0/QA1-A108/110 historical sty',sealedFixtureExecuted:false,commercialCopiesExecuted:false,browserLaunches:'Recorded separately; preflight does not establish page execution'};
  fs.writeFileSync(P+'preflight.json',JSON.stringify(data,null,2)+'\n');if(mismatches.length||missing.length)throw new Error('protected-input-missing-or-mismatch');return data;}
if(require.main===module){try{const r=run();console.log(JSON.stringify({status:r.status,checked:r.checked.length,missing:r.missing.length,mismatch:r.mismatches.length,heads:r.D_HEAD,tracked:r.B_versionControl.trackedFileCount}));}catch(e){console.error(e.stack);process.exitCode=1;}}
module.exports={run,record,SHA,P,ROOT_SHA,inputs,git};
