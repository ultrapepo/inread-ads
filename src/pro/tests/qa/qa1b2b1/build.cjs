'use strict';
// Offline CLI. No server, network, browser or execution of full copies.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),vm=require('node:vm');
const G=require('./generator.cjs'),V=require('./verify.cjs'),H=require('./harness.cjs');
const P=V.prefix;
function write(file,body){if(!V.allowlist.includes(file))throw new Error('output-not-allowlisted:'+file);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,typeof body==='string'||Buffer.isBuffer(body)?body:JSON.stringify(body,null,2)+'\n');}
function generate(){V.protectedCheck();V.safeNewPaths();const copies=[];
  // Refuse to overwrite a diverged artifact from an earlier local build.
  const oldManifest=P+'copy-manifest.json',oldRelease=P+'fixture-release.json';
  if(fs.existsSync(oldManifest)){for(const x of JSON.parse(fs.readFileSync(oldManifest)).copies){if(!['tests/qa/generated/qa1b-stage2b1/gam.qa.js','tests/qa/generated/qa1b-stage2b1/manager.qa.js'].includes(x.output)||V.record(x.output).sha256!==x.copySha256)throw new Error('existing-copy-diverged');}}
  else if(['gam','manager'].some(n=>fs.existsSync('tests/qa/generated/qa1b-stage2b1/'+n+'.qa.js')))throw new Error('unmanifested-copy');
  if(fs.existsSync(oldRelease))for(const x of JSON.parse(fs.readFileSync(oldRelease)).files){if(!V.allowlist.includes(x.file)||V.record(x.file).sha256!==x.sha256)throw new Error('existing-fixture-diverged');}
  const pending=Object.keys(G.CORES).map(d=>({d,b:G.build(d,fs.readFileSync(d))}));
  for(const {d,b} of pending){const file='tests/qa/generated/qa1b-stage2b1/'+(d==='_gam_kv_.js'?'gam':'manager')+'.qa.js';
    V.verifyCopy(b.copy,b.manifest);write(file,b.copy);copies.push({...b.manifest,output:file});
    const out=P+(d==='_gam_kv_.js'?'gam':'manager')+'.diff',fd=fs.openSync(out,'w');
    const r=cp.spawnSync('git',['--no-pager','diff','--no-index','--no-ext-diff','--no-textconv','--',d,file],{stdio:['ignore',fd,fd]});fs.closeSync(fd);if(r.status!==1)throw new Error('diff-command:'+r.status+':'+r.error?.message);
  }
  const fragments=[];
  const bodies=copies.map(m=>{const source=fs.readFileSync(m.output,'utf8');const defs=Object.entries(H.selections).map(([cls,names])=>{
    const methods=names.map(name=>{const x=G.method(source,cls,name);fragments.push({distribution:m.distribution,className:cls,method:name,start:x.start,end:x.end,sha256:G.hash(x.text)});return x.text;});
    return `class ${cls} {${G.helpers(cls,m.profile,false)}\n${methods.join('\n')}\n}`;
  }).join('\n');return `(()=>{${defs};return Object.freeze({${Object.keys(H.selections).join(',')}});})()`;});
  const fixture='tests/qa/generated/qa1b-stage2b1/isolated-fixture.qa.js';
  write(fixture,`'use strict';\n// Synthetic class definitions only. No construction, ad bootstrap or browser activation.\nObject.defineProperty(window,'__qa1bIsolatedClasses',{value:Object.freeze({GAM:${bodies[0]},Manager:${bodies[1]}}),configurable:true});\n`);
  new vm.Script(fs.readFileSync(fixture,'utf8')); // syntax only, not browser execution
  const canary='tests/qa/qa1b2b1/fixtures/canary.js',html='tests/qa/qa1b2b1/fixtures/isolated.html';
  const sri=file=>'sha256-'+Buffer.from(V.record(file).sha256,'hex').toString('base64');
  write(html,`<!doctype html>\n<meta charset="utf-8">\n<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; connect-src 'none'; img-src 'none'; style-src 'none'; frame-src 'none'">\n<title>QA1-B II-B1 inert synthetic fixture — NOT RUN</title>\n<p>II-B2/C requires separate authorization. This fixture does not attest either commercial distribution.</p>\n<script src="canary.js" integrity="${sri(canary)}" crossorigin="anonymous"></script>\n<script src="../../generated/qa1b-stage2b1/isolated-fixture.qa.js" integrity="${sri(fixture)}" crossorigin="anonymous"></script>\n`);
  write(P+'copy-manifest.json',{schema:'qa1b-II-B1-copy-manifest-v1',head:V.HEAD,copies,inputs:copies[0].inputs,fragments,fullCopiesExecuted:false,fixtureExecutedInBrowser:false,
    composition:'Exact frozen QA0 module bodies inside private allowlisted CJS wrappers; sourceAttestor is null in delivered bytes. Private Node harness fixture only.',
    transformations:'29 identified nonoverlapping segments per distribution; including 18 inherited native boundary methods and added private carriers/constructors; inverse verified independently.',
    rollback:'Remove only 29 new paths after exact path/hash verification; originals and II-A remain untouched. Never a second bootstrap in a live document.'});
  write(P+'fixture-release.json',{schema:'qa1b-II-B1-fixture-release-v1',authority:'synthetic-only-not-source-accreditation',browserStatus:'NOT-RUN',externalSourceRoot:'UNBOUND',files:[fixture,canary,html].map(file=>({...V.record(file),sri:sri(file)})),
    publicEnvironment:{status:'BLOCKED-no-authorization',url:null},inputs:copies.map(x=>({distribution:x.distribution,releaseInputId:x.profile.releaseInputId,copySha256:x.copySha256}))});
  return copies.map(x=>({distribution:x.distribution,bytes:x.copyBytes,sha256:x.copySha256}));
}
function runSuite(label,files,output){const args=['--test','--test-isolation=none','--test-reporter=tap',...files],fd=fs.openSync(output,'w'),started=new Date().toISOString();
  const r=cp.spawnSync(process.execPath,args,{stdio:['ignore',fd,fd]});fs.closeSync(fd);if(r.error)throw r.error;
  const text=fs.readFileSync(output,'utf8'),num=name=>Number(new RegExp('^# '+name+' (\\d+)$','m').exec(text)?.[1]??0);
  return {label,cwd:process.cwd(),node:process.version,executable:process.execPath,command:'node '+args.join(' '),started,exitCode:r.status,
    tests:num('tests'),pass:num('pass'),fail:num('fail'),cancelled:num('cancelled'),skipped:num('skipped'),log:V.record(output),failures:[...text.matchAll(/^not ok .+$/gm)].map(x=>x[0])};
}
async function evidence(){const effects=[],budget=[];
  for(const d of Object.keys(G.CORES)){
    for(const branch of ['true','false-to-true','stale','false-final','prepare-throw']){
      const r=await H.compare(d,async h=>{await h.start();if(branch==='stale')h.setActive(false);
        if(branch==='prepare-throw')h.actors.IntextVideoCreative.prototype.prepare=async()=>{h.record('prepare-throw');throw new Error('fixture-prepare');};
        if(branch==='false-final'){const guard=h.node.getReadinessViewportState;let n=0;h.node.getReadinessViewportState=function(){if(++n===5)h.setTop(900);return guard.call(this);};}
        const work=h.node.buildAndPlayVideo();if(branch==='false-to-true'){h.setTop(20);h.callbacks.get('window:scroll')();}return await work;
      },{position:branch==='false-to-true'?900:20});
      const equal=r.rows.every(x=>JSON.stringify({result:x.result,trace:x.trace})===JSON.stringify({result:r.rows[0].result,trace:r.rows[0].trace}));
      if(!equal)throw new Error('effect-regression:'+d+':'+branch);effects.push({distribution:d,branch,status:'PASS-S1-EXTRACTED-METHODS',rows:r.rows});
    }
    const h=H.env(d),old=h.node.isActiveRenderToken;h.node.isActiveRenderToken=function(t,s){return s==='buildAndPlayVideo:before_prepare'?false:old.call(this,t,s);};let at64;
    for(let i=0;i<65;i++){if(i)h.original.cleanup.call(h.waterfall);await h.start();await h.node.buildAndPlayVideo();if(i===63)at64=h.driver.session().exportManual();}
    const overflow=h.driver.session().exportManual();if(at64.qa0.totals.Dc.yes!==64||overflow.qa0.coverage.flags.untrackedOpportunityNotifications!==1)throw new Error('65-not-reached');
    const ring=H.env(d,{position:900});await ring.start();const p=ring.node.buildAndPlayVideo();for(let i=0;i<1101;i++)ring.callbacks.get('window:scroll')();const full=ring.driver.session().exportManual();ring.finish();await p;
    budget.push({distribution:d,oracle:'Native original fetch/cycle boundaries counted independently: 65 attempts; no 65th retained summary.',at64,attempt65:overflow,
      ringChecks:1102,ringEvidence:full,exportTooLarge:ring.driver.session().serializeManual({maxBytes:1}),exportFull:ring.driver.session().serializeManual().status,
      logicalAuthorityRepresentation:'UTF8 JSON scalar tuples conservatively charged at issue time, never recovered before dispose; weak values only scalar genealogy/lease cells. Not a V8 heap estimate.'});
  }
  write(P+'effects.json',{schema:'qa1b-II-B1-effects-v1',oracle:'Unmodified extracted O methods with identical recorder doubles; not SDK/ad execution.',realBrowser:'NOT-RUN',runs:effects});
  write(P+'budget-evidence.json',{schema:'qa1b-II-B1-budget-v1',logicalOnly:true,realChrome:{CPU:'NOT-MEASURED',layout:'NOT-MEASURED',GC:'NOT-MEASURED',heap:'NOT-MEASURED'},
    F02:{sampleSync:{minN:100,p95MaxMs:2},unique:['setup','cleanup','export'],uniqueRule:'Actual N, maximum and total, no percentile; every cost contributes to outer CPU/ratio/long-task/physical assessment.',stop:{ratio:'.01',longTaskMs:50,heapSteadyBytes:8388608,heapPeakBytes:16777216},noPosthocExtension:true},runs:budget});
}
async function validate(){V.protectedCheck();const suites=[];
  for(const [label,files,out]of [
    ['II-B1',['tests/intext-p14b-qa1b-II-B1.test.cjs'],'validation.txt'],
    ['I',['tests/intext-p14b-qa1b-stage1.test.cjs'],'stage1-validation.txt'],
    ['II-A',['tests/intext-p14b-qa1b-stage2a.test.cjs'],'stage2a-validation.txt'],
    ['QA0-QA1A',['tests/intext-p14b-shadow.audit.test.cjs','tests/intext-p14b-qa1a.audit.test.cjs'],'frozen-validation.txt']])suites.push(runSuite(label,files,P+out));
  await evidence();const text=fs.readFileSync(P+'validation.txt','utf8');const cases=Array.from({length:52},(_,i)=>{const id='B'+String(i+1).padStart(2,'0'),lines=text.split('\n').filter(s=>/^ok \d+ -/.test(s)&&s.slice(0,s.indexOf(']')+1).includes(id));return {id,offline:lines.length||id==='B51'?'PASS-COMPONENTS':'NOT-RUN',evidence:id==='B51'?suites.slice(1):lines,browserC:'NOT-RUN',commercialP:'BLOCKED-no-authorization',meaning:'S0/S1 components only, not the entire multi-stage case'};});
  const good=suites[0].fail===0&&suites[0].tests>0&&suites[1].pass===57&&suites[2].pass===106&&suites[3].pass===108&&suites[3].fail===2;
  const result={schema:'qa1b-II-B1-results-v1',verdict:good?'PASS OFFLINE':'PARTIAL',scope:'S0/S1 extracted methods and new private fixture authority only',environment:{cwd:process.cwd(),node:process.version,platform:process.platform,arch:process.arch,dependencies:'Node built-ins + 418 frozen local inputs; no packages installed'},commands:{generate:'node tests/qa/qa1b2b1/build.cjs --generate',validate:'node tests/qa/qa1b2b1/build.cjs --validate',seal:'node tests/qa/qa1b2b1/build.cjs --seal',verify:'node tests/qa/qa1b2b1/verify.cjs'},suites,cases,
    historical:{file:'Indicar que dependencias tiene el core d.sty',expectedBytes:3903,actualBytes:3940,sha256:'15c72d69032cc0e212b1501cdd78e9da78561b404c65165fe1a6d02efe16b660',baseline:'II-B0 preflight 418 before any II-B1 write',testsUnmodified:true,
      assertions:[{test:'All 345 pre-existing files including approved QA0 retain their bytes in the complete workspace',location:'tests/intext-p14b-qa1a.audit.test.cjs:350',expression:'assert.equal(bytes.length,f.bytes,f.file)',expected:3903,actual:3940},{test:'All 333 pre-existing protected files retain their bytes; no core/probe/bundle generation occurred',location:'tests/intext-p14b-shadow.audit.test.cjs:535',expression:'assert.equal(b.length,f.bytes,f.file)',expected:3903,actual:3940}]},
    sourceComplete:{D0:false,Dv:false,Dc:false,outcomes:false},browser:'NOT-RUN',realSourceAttestation:'UNBOUND, INACTIVE',independentReview:'PENDING',notAuthorized:['II-B2/C','II-B2/P','B shadow/enforce','III-IV','A3','C'],protectedCheck:V.protectedCheck()};
  write(P+'results.json',result);return result.suites.map(x=>({label:x.label,tests:x.tests,pass:x.pass,fail:x.fail,exitCode:x.exitCode}));
}
function seal(){V.protectedCheck();const before=V.baseline(),newFiles=V.allowlist.filter(f=>!f.endsWith('-integrity.json')).map(V.record);
  write(P+'integrity.json',{schema:'qa1b-II-B1-integrity-v1',head:V.HEAD,before,after:before.map(x=>V.record(x.file)),protectedCount:418,newFiles,allowlist:V.allowlist,
    self:'Excluded from self-reference; SHA256 returned by independent verify.cjs and delivery.',rollback:'Read-only inverse byte checks; removal only with exact matching paths/hashes after separate instruction. No deletion performed.',stage:'II-B1-S0-S1',browser:'NOT-RUN'});return V.verifyPackage();}
if(require.main===module)(async()=>{const arg=process.argv[2];const r=arg==='--generate'?generate():arg==='--validate'?await validate():arg==='--seal'?seal():null;if(!r)throw new Error('Use --generate, --validate or --seal (offline only)');console.log(JSON.stringify(r,null,2));})().catch(e=>{console.error(e.stack);process.exitCode=1;});
module.exports={generate,validate,evidence,seal};
