'use strict';
// Offline byte transformations only. Neither source nor copies are imported/evaluated.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {CORES}=require('./packet.cjs');
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const PREFIX=Buffer.from('/* QA1-B r1-review-B | STAGE I OFFLINE COPY | acquisition disabled | no hooks */\n','utf8');
const ANCHORS=Object.freeze([
  'getReadinessViewportState() {',
  'waitForViewport(renderToken = this._activeRenderToken, source = "waitForViewport", owner = null) {',
  'const viewportState = await this.waitForViewport(renderToken, "showDisplay:waitForViewport");',
  'const eligibility = await this.waitForViewport(renderToken, "buildAndPlayVideo:capacity-or-legacy");',
  'const viewportState = await this.waitForViewport(renderToken, "buildAndPlayVideo:waitForViewport", creative);',
  'const state = await node.waitForViewport(this._renderToken, "video-activation", this);',
  'if (node?.getReadinessViewportState && !node.getReadinessViewportState().eligible) throw new Error("video_activation_ineligible");',
]);
const names=distribution=>distribution==='_gam_kv_.js'?{artifact:'gam.qa.js',patch:'gam.diff'}:{artifact:'manager.qa.js',patch:'manager.diff'};
function checkAnchors(bytes,anchors=ANCHORS){
  const text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
  return anchors.map(textAnchor=>{
    const parts=text.split(textAnchor);if(parts.length!==2)throw new Error('anchor-not-exactly-once');
    return {text:textAnchor,line:parts[0].split('\n').length,sha256:sha(Buffer.from(textAnchor))};
  });
}
function generateCopy(distribution,input){
  if(!Object.hasOwn(CORES,distribution)||!Buffer.isBuffer(input))throw new TypeError('approved-distribution-and-bytes-required');
  if(sha(input)!==CORES[distribution])throw new Error('unapproved-base-hash');
  const anchors=checkAnchors(input),artifact=Buffer.concat([PREFIX,input]),files=names(distribution);
  const firstLine=input.toString('utf8').split(/\r?\n/)[0];
  const diff=`--- a/${distribution}\n+++ b/${files.artifact}\n@@ -1,1 +1,2 @@\n+${PREFIX.toString('utf8').trimEnd()}\n ${firstLine}\n`;
  const manifest={schema:'qa1b-offline-copy-v1',stage:'I',distribution,baseSha256:sha(input),baseBytes:input.length,
    artifactFile:files.artifact,artifactSha256:sha(artifact),artifactBytes:artifact.length,patchFile:files.patch,
    patchSha256:sha(Buffer.from(diff)),anchors,acquisitionEnabled:false,transformation:'inert-comment-prefix-only',
    reverse:'Remove the exact fixed prefix, then require the approved original byte hash. Never write the original path.'};
  return {artifact,diff,manifest};
}
function reverseCopy(distribution,artifact){
  if(!Object.hasOwn(CORES,distribution)||!Buffer.isBuffer(artifact)||!artifact.subarray(0,PREFIX.length).equals(PREFIX))throw new Error('invalid-copy-prefix');
  const original=Buffer.from(artifact.subarray(PREFIX.length));
  if(sha(original)!==CORES[distribution])throw new Error('reverse-hash-mismatch');
  return original;
}
function writeCopies({sourceRoot,outputDirectory}){
  const source=fs.realpathSync(sourceRoot),target=path.resolve(outputDirectory);
  if(fs.existsSync(target))throw new Error('output-must-not-exist');
  // Exact approved bytes and every anchor are validated before the first write.
  const generated=Object.keys(CORES).map(distribution=>generateCopy(distribution,fs.readFileSync(path.join(source,distribution))));
  const parent=fs.realpathSync(path.dirname(target));
  if(path.resolve(parent,path.basename(target))!==target||target===source)throw new Error('unsafe-output-directory');
  fs.mkdirSync(target);
  const artifacts=[],created=[];
  function write(name,bytes){
    const file=path.join(target,name),fd=fs.openSync(file,'wx');created.push(file);
    try{fs.writeFileSync(fd,bytes);}finally{fs.closeSync(fd);}
  }
  try{
    for(const g of generated){
      for(const [name,bytes]of [[g.manifest.artifactFile,g.artifact],[g.manifest.patchFile,Buffer.from(g.diff)]]){
        write(name,bytes);artifacts.push({file:name,bytes:bytes.length,sha256:sha(bytes)});
      }
    }
    const manifest={schema:'qa1b-copy-set-v1',acquisitionEnabled:false,artifacts,copies:generated.map(g=>g.manifest)};
    write('manifest.json',JSON.stringify(manifest,null,2)+'\n');return manifest;
  }catch(error){
    // Only exact files opened by this invocation, within its newly created directory.
    for(const file of created.reverse())if(path.dirname(file)===target&&fs.existsSync(file))fs.unlinkSync(file);
    if(fs.readdirSync(target).length===0)fs.rmdirSync(target);
    throw error;
  }
}
function removeCopies(outputDirectory){
  const root=fs.realpathSync(outputDirectory),file=path.join(root,'manifest.json');
  const m=JSON.parse(fs.readFileSync(file,'utf8'));
  const allowed=new Set(['gam.qa.js','gam.diff','manager.qa.js','manager.diff']);
  if(m.schema!=='qa1b-copy-set-v1'||m.artifacts?.length!==4||new Set(m.artifacts.map(x=>x.file)).size!==4)throw new Error('invalid-copy-set');
  if(fs.readdirSync(root).some(name=>!allowed.has(name)&&name!=='manifest.json'))throw new Error('unexpected-output-file');
  // Preflight the entire set. No partial deletion on an altered artifact.
  for(const x of m.artifacts){
    if(!allowed.has(x.file))throw new Error('unsafe-artifact-path');
    const resolved=fs.realpathSync(path.join(root,x.file));
    if(path.dirname(resolved)!==root||sha(fs.readFileSync(resolved))!==x.sha256)throw new Error('altered-output');
  }
  for(const distribution of Object.keys(CORES)){
    const n=names(distribution),original=reverseCopy(distribution,fs.readFileSync(path.join(root,n.artifact)));
    const expected=generateCopy(distribution,original);
    if(!fs.readFileSync(path.join(root,n.patch)).equals(Buffer.from(expected.diff)))throw new Error('altered-patch');
  }
  for(const x of m.artifacts)fs.unlinkSync(path.join(root,x.file));
  fs.unlinkSync(file);fs.rmdirSync(root);return {removed:5,originalsTouched:0};
}
module.exports={ANCHORS,checkAnchors,generateCopy,reverseCopy,writeCopies,removeCopies};
if(require.main===module){
  const [operation,target]=process.argv.slice(2);
  if(!target||!['generate','remove'].includes(operation))throw new Error('usage: generator.cjs generate|remove <new-output-directory>');
  console.log(JSON.stringify(operation==='generate'?writeCopies({sourceRoot:path.resolve(__dirname,'../../..'),outputDirectory:target}):removeCopies(target),null,2));
}
