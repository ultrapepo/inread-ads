'use strict';
// Offline inventory verification and removal PLAN only; never deletes the delivery.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../..');
const MANIFEST='docs/intext-p14b-qa1b-stage1-integrity.json';
const allowed=name=>name==='tests/intext-p14b-qa1b-stage1.test.cjs'||/^tests\/qa\/qa1b\/[A-Za-z0-9.-]+\.(cjs|json)$/.test(name)
  ||/^docs\/intext-p14b-qa1b-stage1-[A-Za-z0-9-]+\.(json|md|txt|diff)$/.test(name);
function removalPlan(manifest){
  if(manifest.schema!=='qa1b-stage1-integrity-v1')throw new Error('invalid-stage1-manifest');
  const protectedNames=new Set([...manifest.protectedBefore,...manifest.contracts].map(x=>x.file));
  const names=[...manifest.newFiles.map(x=>x.file),MANIFEST];
  if(new Set(names).size!==names.length||names.some(name=>!allowed(name)||protectedNames.has(name)))throw new Error('unsafe-removal-plan');
  return {action:'reviewable-removal-plan-only',files:names,protectedFilesRemoved:0,restoreOrNormalizeOriginals:false};
}
function hashFile(file){const b=fs.readFileSync(path.join(root,file));return {file,bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex')};}
function verify(manifest){
  removalPlan(manifest);
  const checked=[];
  for(const expected of [...manifest.protectedBefore,...manifest.contracts,...manifest.newFiles]){
    const resolved=fs.realpathSync(path.join(root,expected.file));
    if(!resolved.startsWith(fs.realpathSync(root)+path.sep))throw new Error('path-outside-workspace');
    const actual=hashFile(expected.file);
    if(actual.bytes!==expected.bytes||actual.sha256!==expected.sha256)throw new Error('integrity-mismatch: '+expected.file);
    checked.push(expected.file);
  }
  return {verified:true,protectedOriginals:manifest.protectedBefore.length,contracts:manifest.contracts.length,newFiles:manifest.newFiles.length,
    selfHashExcluded:true,removalPlanFiles:removalPlan(manifest).files.length};
}
module.exports={MANIFEST,allowed,removalPlan,verify,hashFile};
if(require.main===module){
  const m=JSON.parse(fs.readFileSync(path.join(root,MANIFEST),'utf8')),operation=process.argv[2]||'verify';
  if(!['verify','plan'].includes(operation))throw new Error('usage: delivery-integrity.cjs verify|plan');
  console.log(JSON.stringify(operation==='verify'?verify(m):removalPlan(m),null,2));
}
