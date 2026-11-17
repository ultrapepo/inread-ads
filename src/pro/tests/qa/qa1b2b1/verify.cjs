'use strict';
// Independent byte verifier: does not import the generator or runtime.
const fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path'),vm=require('node:vm');
const HEAD='4badfd433807e8e2024908573cfb637d9398cfa1';
const prefix='docs/intext-p14b-qa1b-II-B1-';
const allowlist=[...['runtime.factory.js','qa0-byte-length.js','native-browser.schema.json','release.schema.json','generator.cjs','build.cjs','verify.cjs','harness.cjs','fixtures/lifecycle.json','fixtures/sri.json','fixtures/isolated.html','fixtures/canary.js'].map(x=>'tests/qa/qa1b2b1/'+x),
  'tests/intext-p14b-qa1b-II-B1.test.cjs',...['gam.qa.js','manager.qa.js','isolated-fixture.qa.js'].map(x=>'tests/qa/generated/qa1b-stage2b1/'+x),
  ...['copy-manifest.json','fixture-release.json','gam.diff','manager.diff','results.json','validation.txt','stage1-validation.txt','stage2a-validation.txt','frozen-validation.txt','effects.json','budget-evidence.json','browser-readiness.md','integrity.json'].map(x=>prefix+x)];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function record(file){const b=fs.readFileSync(file);return {file,bytes:b.length,sha256:sha(b)};}
function baseline(){const p=JSON.parse(fs.readFileSync('docs/intext-p14b-qa1b-II-B0-preflight.json')),i=JSON.parse(fs.readFileSync('docs/intext-p14b-qa1b-II-B0-integrity.json'));
  return [...p.baseline.files,...i.newFiles,{file:'docs/intext-p14b-qa1b-II-B0-integrity.json',bytes:76042,sha256:'5cbec7e48e505fc5e09d1cbf5e0c88911747c50d074ea79dd4e28cd64088ebc3'}];}
function inventory(dir='.',out=[]){for(const d of fs.readdirSync(dir,{withFileTypes:true})){if(d.name==='.git')continue;const f=path.posix.join(dir.replaceAll('\\','/'),d.name);if(d.isSymbolicLink())throw new Error('symlink:'+f);if(d.isDirectory())inventory(f,out);else out.push(f);}return out;}
function gitHead(){let dir=path.resolve('.');while(!(fs.existsSync(path.join(dir,'.git','HEAD'))||(fs.existsSync(path.join(dir,'.git'))&&fs.statSync(path.join(dir,'.git')).isFile()))){const parent=path.dirname(dir);if(parent===dir)throw new Error('git-not-found');dir=parent;}
  let git=path.join(dir,'.git');if(fs.statSync(git).isFile())git=path.resolve(dir,fs.readFileSync(git,'utf8').trim().replace(/^gitdir: /,''));
  const head=fs.readFileSync(path.join(git,'HEAD'),'utf8').trim();if(!head.startsWith('ref: '))return head;const ref=head.slice(5),target=path.join(git,ref);
  if(fs.existsSync(target))return fs.readFileSync(target,'utf8').trim();const packed=fs.readFileSync(path.join(git,'packed-refs'),'utf8').split('\n').find(x=>x.endsWith(' '+ref));if(!packed)throw new Error('git-ref-missing');return packed.split(' ')[0];}
function protectedCheck(){const rows=baseline(),bad=rows.filter(x=>{try{const y=record(x.file);return x.bytes!==y.bytes||x.sha256!==y.sha256;}catch(_){return true;}}),known=new Set([...rows.map(x=>x.file),...allowlist]),unexpected=inventory().filter(x=>!known.has(x));
  if(gitHead()!==HEAD||rows.length!==418||new Set(rows.map(x=>x.file)).size!==418||bad.length||unexpected.length)throw new Error(JSON.stringify({baseline:rows.length,bad,unexpected,head:gitHead()}));return {preserved:418,unexpected:0};}
function reverse(copy,m){let text=copy.toString('utf8'),shift=0;const ranges=[];for(const e of m.edits){const start=e.start+shift;ranges.push({...e,startNew:start,endNew:start+e.after.length});shift+=e.after.length-(e.end-e.start);}
  for(const e of ranges.reverse()){if(text.slice(e.startNew,e.endNew)!==e.after)throw new Error('copy-edit-diverged:'+e.className+'.'+e.method);text=text.slice(0,e.startNew)+e.before+text.slice(e.endNew);}
  const bytes=Buffer.from(text);if(sha(bytes)!==m.baseSha256||bytes.length!==m.baseBytes)throw new Error('reverse-base');return bytes;}
function verifyCopy(copy,m){const base=fs.readFileSync(m.distribution);if(sha(copy)!==m.copySha256||copy.length!==m.copyBytes)throw new Error('copy-hash');
  if(!reverse(copy,m).equals(base))throw new Error('base-bytes');let last=0;
  for(const e of m.edits){if(e.start<last||base.toString('utf8').slice(e.start,e.end)!==e.before)throw new Error('base-anchor');last=e.end;
    if(e.before&&sha(e.before)!==e.anchorSha256)throw new Error('anchor-sha');}
  new vm.Script(copy.toString('utf8')); // compile only, never run the full script
  for(const input of m.inputs){const actual=record(input.file);if(actual.sha256!==input.sha256||actual.bytes!==input.bytes)throw new Error('input-hash:'+input.file);}
  // Independent parent proof uses its frozen bytes; no regenerating helper as oracle.
  const parentFile='tests/qa/generated/qa1b-stage2a/'+(m.distribution==='_gam_kv_.js'?'gam':'manager')+'.qa.js';
  if(sha(fs.readFileSync(parentFile))!==m.parentSha256)throw new Error('parent-hash');
  return {distribution:m.distribution,syntax:'PASS-COMPILE-ONLY',inverseBytes:base.length,edits:m.edits.length,sha256:sha(copy)};
}
function safeNewPaths(){const root=path.resolve('.');for(const f of allowlist){const absolute=path.resolve(f);if(!absolute.startsWith(root+path.sep)||path.isAbsolute(f)||f.split('/').includes('..'))throw new Error('unsafe-output');}return true;}
function verifyPackage({approvedIntegritySha256=null}={}){protectedCheck();safeNewPaths();
  if(approvedIntegritySha256!==null&&record(prefix+'integrity.json').sha256!==approvedIntegritySha256)throw new Error('unapproved-integrity-root');
  const m=JSON.parse(fs.readFileSync(prefix+'copy-manifest.json'));
  if(m.copies.length!==2||new Set(m.copies.map(x=>x.distribution)).size!==2||m.copies.some(x=>x.output!=='tests/qa/generated/qa1b-stage2b1/'+({'_gam_kv_.js':'gam','IntextManager.js':'manager'}[x.distribution])+'.qa.js'))throw new Error('copy-inventory');
  const copies=m.copies.map(x=>verifyCopy(fs.readFileSync(x.output),x));const integrity=JSON.parse(fs.readFileSync(prefix+'integrity.json'));
  const expected=allowlist.filter(f=>f!==prefix+'integrity.json').sort(),actual=integrity.newFiles.map(x=>x.file).sort();
  if(JSON.stringify(expected)!==JSON.stringify(actual))throw new Error('manifest-file-set');
  const baselineRows=baseline();if(JSON.stringify(integrity.before)!==JSON.stringify(baselineRows)||JSON.stringify(integrity.after)!==JSON.stringify(baselineRows))throw new Error('manifest-baseline');
  for(const x of integrity.newFiles){const y=record(x.file);if(x.bytes!==y.bytes||x.sha256!==y.sha256)throw new Error('new-hash:'+x.file);}
  if(integrity.newFiles.length!==28||allowlist.length!==29||allowlist.some(f=>!fs.existsSync(f)))throw new Error('new-inventory');
  return {status:'PASS-LOCAL-CONSISTENCY',rootAuthentication:approvedIntegritySha256?'MATCHED-EXTERNAL-ARGUMENT':'NOT-PINNED-local-consistency-only',protected:418,newFiles:29,hashedWithoutSelf:28,copies,integrity:record(prefix+'integrity.json')};}
if(require.main===module){try{const args=process.argv.slice(2);if(args.length&&!(args.length===2&&args[0]==='--integrity-sha256'&&/^[a-f0-9]{64}$/.test(args[1])))throw new Error('invalid-verifier-arguments');console.log(JSON.stringify(verifyPackage({approvedIntegritySha256:args[1]??null}),null,2));}catch(e){console.error(e.stack);process.exitCode=1;}}
module.exports={HEAD,prefix,allowlist,sha,record,baseline,inventory,gitHead,protectedCheck,reverse,verifyCopy,safeNewPaths,verifyPackage};
