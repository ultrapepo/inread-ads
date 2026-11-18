'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const ROOT=__dirname;
const PINS=Object.freeze({
 'docs/intext-p14b-qa1b-II-B1-integrity.json':'3ac37c8396ea1739c9bf362c26a102f020db6336ffa7e0dd4992037b9665b94f',
 'docs/intext-p14b-qa1b-II-B2C-integrity.json':'a932ab99abf25ca892cdd8e493e657cf90135c0b379875080eb1779379e085b2',
 'tests/qa/generated/qa1b-stage2b1/gam.qa.js':'b8a827fcae272bdacdfb24c7492e0de733ae67defd585e53020cfb87b6416bc1',
 'tests/qa/generated/qa1b-stage2b1/manager.qa.js':'4c668a65e01913afdcf23bdc72ad8c8104a51b731666611cd8346ebf51422e0c',
 'tests/qa/generated/qa1b-stage2b1/isolated-fixture.qa.js':'827cd5906441b2504a972ecafc30c15fd52c2640a5b8e53725d4e55bcca4a07f',
 'tests/qa/qa1b2b1/fixtures/canary.js':'631fd38ecd70e24b82db57f12f13961c83a4f049ffdbeb4ec3729f2357d2bfee',
 'tests/qa/qa1b2b1/fixtures/isolated.html':'97da21d78549956c32b16b466337a295afbabc097ef871ed105b28d590fc18c5'
});
const ALLOWED=Object.freeze(['/tests/qa/qa1b2b1/fixtures/isolated.html','/tests/qa/qa1b2b1/fixtures/canary.js','/tests/qa/generated/qa1b-stage2b1/isolated-fixture.qa.js']);
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function safe(root,name){if(typeof name!=='string'||!name||name.includes('\\')||name.includes('\0')||name.split('/').some(x=>!x||x==='.'||x==='..'||!/^[A-Za-z0-9._-]+$/.test(x)||/[. ]$/.test(x)||/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(x))||path.isAbsolute(name)||/^[a-z]:/i.test(name))throw new Error('unsafe-relative-path');
 const full=path.resolve(root,...name.split('/'));if(!full.startsWith(path.resolve(root)+path.sep))throw new Error('path-outside-root');let at=path.resolve(root);for(const part of name.split('/')){at=path.join(at,part);if(fs.existsSync(at)&&fs.lstatSync(at).isSymbolicLink())throw new Error('symlink-not-allowed');}return full;}
function record(root,file){const b=fs.readFileSync(safe(root,file));return {file,bytes:b.length,sha256:hash(b)};}
function verifyPackage(root,expected){if(!/^[a-f0-9]{64}$/.test(expected??''))throw new Error('external-package-manifest-sha256-required');const b=fs.readFileSync(path.join(root,'package-manifest.json'));if(hash(b)!==expected)throw new Error('package-root-mismatch');const m=JSON.parse(b);
 if(!Array.isArray(m.files)||new Set(m.files.map(x=>x.file)).size!==m.files.length)throw new Error('package-inventory');
 for(const x of m.files){const y=record(root,x.file);if(x.sha256!==y.sha256||x.bytes!==y.bytes)throw new Error('package-file-mismatch:'+x.file);}
 for(const[file,sha]of Object.entries(PINS))if(record(root,file).sha256!==sha)throw new Error('sealed-input-mismatch:'+file);
 const b1=JSON.parse(fs.readFileSync(safe(root,'docs/intext-p14b-qa1b-II-B1-integrity.json'))),b2=JSON.parse(fs.readFileSync(safe(root,'docs/intext-p14b-qa1b-II-B2C-integrity.json')));
 const historical=[...b1.before,...b1.newFiles,...b2.newFiles];for(const x of m.files.filter(x=>x.kind==='sealed-input')){const e=historical.find(e=>e.file===x.file);if(e&&(e.bytes!==x.bytes||e.sha256!==x.sha256))throw new Error('historical-chain:'+x.file);}
 return {status:'PASS-PACKAGE-BYTES',packageManifestSha256:expected,files:m.files.length,threeGenerated: Object.keys(PINS).filter(x=>x.includes('/generated/')).map(file=>record(root,file)),historicalFullBaseline:'NOT-INCLUDED; no old 468-file suite is claimed',previousVerdict:'BLOCKED preserved, not overwritten'};
}
function parseArgs(args){const o={};for(let i=0;i<args.length;i++){const k=args[i];if(!k.startsWith('--')||Object.hasOwn(o,k))throw new Error('invalid-or-duplicate-option');if(['--operator-local','--resume-g1g2'].includes(k))o[k]=true;else{if(!args[i+1]||args[i+1].startsWith('--'))throw new Error('option-value-required:'+k);o[k]=args[++i];}}return o;}
function write(root,file,value){const full=safe(root,file);fs.mkdirSync(path.dirname(full),{recursive:true});fs.writeFileSync(full,Buffer.isBuffer(value)||typeof value==='string'?value:JSON.stringify(value,null,2)+'\n');}
function physicalFuture(full){let at=full;const tail=[];while(!fs.existsSync(at)){tail.unshift(path.basename(at));const parent=path.dirname(at);if(parent===at)throw new Error('no-existing-ancestor');at=parent;}return path.join(fs.realpathSync(at),...tail);}
function localPath(value){if(typeof value!=='string'||!value||/^\\\\|^\/\//.test(value))throw new Error('local-path-required');const full=path.resolve(value);const parts=full.slice(path.parse(full).root.length).split(path.sep);if(parts.some(x=>/[. ]$/.test(x)||/[\x00-\x1f:]/.test(x)||/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(x)))throw new Error('unsafe-Windows-path');return full;}
function createOutput(dir){const full=localPath(dir),real=physicalFuture(full),pkg=fs.realpathSync(ROOT),fold=x=>process.platform==='win32'?x.toLowerCase():x;const p=fold(pkg),r=fold(real);if(r===p||r.startsWith(p+path.sep))throw new Error('output-must-be-outside-package');if(fs.existsSync(full))throw new Error('output-directory-must-not-exist');fs.mkdirSync(full,{recursive:true});return full;}
function walk(root,sub='',out=[],budget={count:0}){if(sub.split('/').length>12)throw new Error('inventory-depth');for(const d of fs.readdirSync(sub?safe(root,sub):root,{withFileTypes:true})){if(++budget.count>10000)throw new Error('inventory-entry-limit');const f=sub?sub+'/'+d.name:d.name;if(d.isSymbolicLink())throw new Error('symlink');if(d.isDirectory())walk(root,f,out,budget);else out.push(f);}return out;}
function sealLogs(dir){const list=walk(dir).filter(x=>x!=='logs-manifest.json').sort().map(file=>record(dir,file));write(dir,'logs-manifest.json',{schema:'qa1b-recovery-logs-v1',files:list,trust:'Local diagnostic evidence; not a producer capability or independent browser attestation'});return record(dir,'logs-manifest.json');}
function route(root,url,mode='positive'){if(!ALLOWED.includes(url))return null;let body=fs.readFileSync(safe(root,url.slice(1)));if(hash(body)!==PINS[url.slice(1)])throw new Error('sealed-resource-changed');const tamper=(mode==='fixture-negative'&&url===ALLOWED[2])||(mode==='canary-negative'&&url===ALLOWED[1]);if(tamper){body=Buffer.from(body);const at=body.indexOf(Buffer.from('//'));if(at<0)throw new Error('negative-comment-anchor');body[at+2]^=1;}
 return {body,originalSha256:PINS[url.slice(1)],sha256:hash(body),tampered:tamper,mime:url.endsWith('.html')?'text/html; charset=utf-8':'application/javascript; charset=utf-8'};}
module.exports={ROOT,PINS,ALLOWED,hash,safe,record,verifyPackage,parseArgs,write,physicalFuture,localPath,createOutput,walk,sealLogs,route};
