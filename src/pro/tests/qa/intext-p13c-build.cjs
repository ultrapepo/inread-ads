'use strict';
// Generates an explicitly labelled QA copy. Never writes either production distribution.
const fs=require('node:fs'),path=require('node:path');
function instrument(source,probe,config={enabled:true,mode:'observe',console:false,captureErrors:true}) {
  const start=source.indexOf('class IntextVideoCreative {');
  if(start<0)throw Error('Missing current creative');
  let end=source.indexOf('class WPromise {',start);if(end<0)end=source.length;
  let core=source.slice(start,end);
  const insert=(marker,replacement)=>{if(core.split(marker).length!==2)throw Error('QA marker must match exactly once: '+marker);core=core.replace(marker,replacement);};
  insert('  createVideoElement() {','  createVideoElement() {\n    window.IntextP13C?.attach(this, window.__INTEXT_P13C_QA__ || {});');
  insert('    this.initVideoJS();','    this._p13cProbe?.record("videojs-init-called");\n    this.initVideoJS();\n    this._p13cProbe?.attachPlayer(this.player,{beforeIma:true});');
  insert('      const debugVideo = (event, data = {}) => {','      const debugVideo = (event, data = {}) => {\n        this._p13cProbe?.noteCore(event, data);');
  insert('          this.player.ima(options);','          this.player.ima(options);\n          this._p13cProbe?.afterIma();');
  let result=source.slice(0,start)+core+source.slice(end);
  const hook=(marker,replacement)=>{if(result.split(marker).length!==2)throw Error('QA boundary must match once: '+marker);result=result.replace(marker,replacement);};
  hook('            pb.setTargetingForGPTAsync([configuration.code]);',
    '            window.IntextP13C?.prebidSnapshot(this.node,pb,configuration,auctionId,allResponses,"before-set");\n'+
    '            pb.setTargetingForGPTAsync([configuration.code]);\n'+
    '            window.IntextP13C?.prebidSnapshot(this.node,pb,configuration,auctionId,allResponses,"after-set");');
  hook('    const fallbackRenderToken = this.node._activeRenderToken;',
    '    const fallbackRenderToken = this.node._activeRenderToken;\n    window.IntextP13C?.markFallback(this.node,renderToken);');
  hook('      this.markIntextRealRenderTelemetry("display-open", trigger);',
    '      this.markIntextRealRenderTelemetry("display-open", trigger);\n      window.IntextP13C?.markDisplayOpened(this);');
  return '/* P1.3c QA INSTRUMENTED COPY — NOT FOR PRODUCTION */\n'+probe+'\nwindow.__INTEXT_P13C_QA__ = '+JSON.stringify(config).replace(/</g,'\\u003c')+';\n'+result;
}
module.exports={instrument};
if(require.main===module) {
  const root=path.resolve(__dirname,'../..'),name=process.argv[2]??'_gam_kv_.js';
  if(!['_gam_kv_.js','IntextManager.js'].includes(name))throw Error('Choose an existing Intext distribution');
  const output=path.join(__dirname,'generated',name==='IntextManager.js'?'intext-p13c-manager.qa.js':'intext-p13c-gam.qa.js');
  fs.mkdirSync(path.dirname(output),{recursive:true});
  const config=process.argv[3]?JSON.parse(fs.readFileSync(process.argv[3],'utf8')):{enabled:true,mode:'observe',console:false,captureErrors:true};
  fs.writeFileSync(output,instrument(fs.readFileSync(path.join(root,name),'utf8'),fs.readFileSync(path.join(__dirname,'intext-p13c-probe.cjs'),'utf8'),config));
  console.log(output);
}
