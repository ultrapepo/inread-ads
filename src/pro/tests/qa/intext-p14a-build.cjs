'use strict';
// Reversible QA composition. No production file or pre-existing QA artifact is written.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const {build:replaceDummy,expected}=require('./intext-p13c-dummy-source-build.cjs');
const {instrument}=require('./intext-p13c-integration-build.cjs');
const root=path.resolve(__dirname,'../..');
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const runtimeSource=()=>fs.readFileSync(path.join(__dirname,'intext-p14a-dependencies.cjs'),'utf8');
const probeSource=()=>fs.readFileSync(path.join(__dirname,'intext-p13c-integration-probe.cjs'),'utf8');
function runtimeFor(arm){
 if(!['E0','E1'].includes(arm))throw Error('Invalid P1.4-A arm');
 const source=runtimeSource(),marker="/*__P14A_ARM__*/'E0'";
 if(source.split(marker).length!==2)throw Error('Ambiguous assignment marker');
 return source.replace(marker,"/*__P14A_ARM__*/'"+arm+"'");
}
function replaceOnce(source,before,after){if(source.split(before).length!==2)throw Error('Ambiguous QA edit: '+before.slice(0,90));return source.replace(before,after);}
function build(source,arm,{probe=probeSource()}={}){
 if(!Object.values(expected).includes(sha(source)))throw Error('Protected P1.3b source hash mismatch');
 const black=replaceDummy(source),from=black.output.indexOf('  static async loadDependencies() {',black.output.indexOf('class IntextVideoCreative {'));
 const to=black.output.indexOf('  static ensureSharedDependencies()',from);
 if(from<0||to<0)throw Error('Dependency method boundaries changed');
 const before=black.output.slice(from,to),after='  static async loadDependencies() {\n    return window.IntextP14A.run(this);\n  }\n\n';
 const edits=[{before,after}];let core=replaceOnce(black.output,before,after);
 const hook=(marker,addition)=>{const edit={before:marker,after:marker+addition};core=replaceOnce(core,edit.before,edit.after);edits.push(edit);};
 hook('  static dependencyDiagnostic(metric, node, data = {}) {','\n    try { window.IntextP14A?.diagnostic(metric, node, data); } catch (e) { /* QA observation only */ }');
 hook('      const debugVideo = (event, data = {}) => {','\n        try { window.IntextP14A?.core(this, event, data); } catch (e) { /* QA observation only */ }');
 hook('  async activate() {','\n    try { window.IntextP14A?.activationWait(this, "started"); } catch (e) { /* QA observation only */ }');
 const activateFrom=core.indexOf('  async activate() {'),prepareAt=core.indexOf('    await this.prepare();',activateFrom);
 const readyHook='\n    try { window.IntextP14A?.activationWait(this, "ready"); } catch (e) { /* QA observation only */ }';
 if(prepareAt<0||prepareAt>core.indexOf('\n  }',activateFrom))throw Error('Activation await changed');
 const beforeReady=core.slice(activateFrom,prepareAt+'    await this.prepare();'.length),afterReady=beforeReady+readyHook;
 core=replaceOnce(core,beforeReady,afterReady);edits.push({before:beforeReady,after:afterReady});
 const integrated=instrument(core,probe),runtime=runtimeFor(arm);
 const prefix='/* P1.4-A QA '+arm+'. Dependency experiment only; not Lifecycle A/B/C. */\n'+runtime+'\n';
 const output=prefix+integrated.output;new vm.Script(output);
 const dummyOffset=black.manifest.offset,dummyAt=text=>text.slice(dummyOffset).match(/^data:video\/mp4;base64,[A-Za-z0-9+/=]+/)[0];
 const ledger={prefix,probe,edits,integrationEdits:integrated.edits,blackSource:black.output,
  dummyOffset,originalDummy:dummyAt(source),qaDummy:dummyAt(black.output),originalSha256:sha(source)};
 if(reverse(output,ledger)!==source)throw Error('QA reversal is not byte-exact');
 return {output,ledger,manifest:{arm,inputSha256:sha(source),sourceOnlySha256:sha(black.output),outputSha256:sha(output),
  runtimeSha256:sha(runtime),probeSha256:sha(probe),dummy:black.manifest.candidate,
  commercialCodeRestoredSha256:sha(reverse(output,ledger)),byteExactReversal:true,
  originalLoadDependenciesSha256:sha(before),edits:['QA runtime prefix','same integration probe/hooks','same black dummy literal','loadDependencies delegation','two diagnostic hooks','two marks around existing activation prepare await']}};
}
function reverse(output,ledger){
 if(!output.startsWith(ledger.prefix))throw Error('QA prefix changed');let source=output.slice(ledger.prefix.length);
 const integrationEnd=source.indexOf(ledger.probe)+ledger.probe.length+1;
 if(integrationEnd<=ledger.probe.length)throw Error('Integration prefix missing');source=source.slice(integrationEnd);
 for(const edit of ledger.integrationEdits)source=replaceOnce(source,edit.addition,'');
 for(const edit of ledger.edits.slice().reverse())source=replaceOnce(source,edit.after,edit.before);
 if(source!==ledger.blackSource)throw Error('Non-experiment core change');
 // Reverse the one pre-existing source-only replacement; its source is never inferred from a QA file.
 if(source.slice(ledger.dummyOffset,ledger.dummyOffset+ledger.qaDummy.length)!==ledger.qaDummy)throw Error('QA dummy literal changed');
 source=source.slice(0,ledger.dummyOffset)+ledger.originalDummy+source.slice(ledger.dummyOffset+ledger.qaDummy.length);
 if(sha(source)!==ledger.originalSha256)throw Error('Commercial reversal hash mismatch');return source;
}
function buildAll(){
 const directory=path.join(__dirname,'generated');fs.mkdirSync(directory,{recursive:true});const variants=[];
 for(const [name,hash]of Object.entries(expected)){
  const source=fs.readFileSync(path.join(root,name),'utf8');if(sha(source)!==hash)throw Error('Protected P1.3b changed: '+name);
  for(const arm of ['E0','E1']){const result=build(source,arm),file='intext-p14a-'+arm+'-'+(name==='_gam_kv_.js'?'gam':'manager')+'.qa.js';
   fs.writeFileSync(path.join(directory,file),result.output);variants.push({source:name,file,...result.manifest});}
 }
 const manifest={schema:'p14a-build-v1',qaOnly:true,enforce:false,productionVersion:'2026.10.07-p1-ima-preload-first-frame',
  assignment:'External choice of E0/E1 artifact before document execution; first assignment immutable through SPA/PNC and refresh.',
  dependencyScriptTimeoutMs:10000,productionFilesWritten:false,probeUnmodified:true,variants};
 fs.writeFileSync(path.join(root,'docs/intext-p14a-build.json'),JSON.stringify(manifest,null,2)+'\n');return manifest;
}
module.exports={build,reverse,buildAll,runtimeFor,sha,expected};
if(require.main===module)console.log(JSON.stringify(buildAll(),null,2));
