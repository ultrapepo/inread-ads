'use strict';
// Separate observe-only copies; neither production nor the accepted source-only variants are overwritten.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const {build:replaceDummy,expected}=require('./intext-p13c-dummy-source-build.cjs');
const sha=text=>crypto.createHash('sha256').update(text).digest('hex');
function instrument(source,probe){let output=source;const edits=[];
 const insert=(marker,addition)=>{if(output.split(marker).length!==2)throw Error('Ambiguous QA marker: '+marker);
  output=output.replace(marker,marker+addition);edits.push({marker,addition});};
 insert('    this.initVideoJS();','\n    try { window.IntextIntegrationQA?.attach(this); } catch (e) { /* QA observation only */ }');
 insert('      const debugVideo = (event, data = {}) => {','\n        window.IntextIntegrationQA?.core(this, event);');
 insert('  onVideoEnded(renderToken = this._activeRenderToken) {','\n    window.IntextIntegrationQA?.node(this, "video-ended-entry");');
 // Record entry; close after dispose/removal (also when the original dispose throws).
 const begin=output.indexOf('class IntextVideoCreative {'),end=output.indexOf('class WPromise {',begin);
 const segment=output.slice(begin,end<0?undefined:end),marker='  destroy() {';
 if(segment.split(marker).length!==2)throw Error('Creative destroy marker ambiguous');
 const at=begin+segment.indexOf(marker)+marker.length,addition='\n    window.IntextIntegrationQA?.core(this, "destroy-entry");';
 output=output.slice(0,at)+addition+output.slice(at);edits.push({marker:'IntextVideoCreative.destroy',addition});
 insert('    this.videoEl?.remove?.();','\n    window.IntextIntegrationQA?.close(this, "creative-destroy");');
 const banner='/* P1.3c integration QA OBSERVE ONLY. No budgets, enforce or playback wrappers. */\n';
 const generated=banner+probe+'\n'+output;new vm.Script(generated);return {output:generated,edits};
}
function buildAll(){const root=path.resolve(__dirname,'../..'),directory=path.join(__dirname,'generated'),probe=fs.readFileSync(path.join(__dirname,'intext-p13c-integration-probe.cjs'),'utf8');
 const variants=[];fs.mkdirSync(directory,{recursive:true});for(const [name,hash]of Object.entries(expected)){
  const source=fs.readFileSync(path.join(root,name),'utf8');if(sha(source)!==hash)throw Error('Protected P1.3b changed: '+name);
  for(const fixture of ['original','black']){const input=fixture==='black'?replaceDummy(source).output:source,{output,edits}=instrument(input,probe);
   const file='intext-integration-'+fixture+'-'+(name==='_gam_kv_.js'?'gam':'manager')+'.qa.js';fs.writeFileSync(path.join(directory,file),output);
   variants.push({source:name,fixture,file,inputSha256:sha(source),fixtureInputSha256:sha(input),outputSha256:sha(output),hooks:edits.map(e=>e.marker)});
  }
 }
 const manifest={qaOnly:true,enforce:false,productionVersionUnchanged:true,probeSha256:sha(probe),variants};
 fs.writeFileSync(path.join(root,'docs/intext-p13c-integration-build.json'),JSON.stringify(manifest,null,2)+'\n');return manifest;
}
module.exports={instrument,buildAll};if(require.main===module)console.log(JSON.stringify(buildAll(),null,2));
