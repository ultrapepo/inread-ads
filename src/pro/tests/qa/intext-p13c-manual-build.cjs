'use strict';
const fs=require('node:fs'),path=require('node:path'),{instrument}=require('./intext-p13c-build.cjs');
function build(source,probe,manual){
 let output=instrument(source,probe,{enabled:true,mode:'observe',console:false,captureErrors:true});
 const begin=output.indexOf('class IntextVideoCreative {'),end=output.indexOf('class WPromise {',begin);
 let core=output.slice(begin,end<0?output.length:end);
 const replace=(marker,value)=>{if(core.split(marker).length!==2)throw Error('Manual QA marker not unique: '+marker);core=core.replace(marker,value);};
 replace('            autoPlayAdBreaks: true,','            autoPlayAdBreaks: false,');
 replace('          this._p13cProbe?.afterIma();','          this._p13cProbe?.afterIma();\n          this._manualBreakLab = window.IntextManualBreakLab.attach(this);');
 replace('        this._p13cProbe?.noteCore(event, data);','        this._p13cProbe?.noteCore(event, data);\n        if (["error","timeout","complete","skipped"].includes(event)) this._manualBreakLab?.dispose();');
 return '/* MANUAL AD-BREAK EXPERIMENT — NOT FOR PRODUCTION; compatibility UNVERIFIED */\n'+manual+'\n'+output.slice(0,begin)+core+(end<0?'':output.slice(end));
}
module.exports={build};
if(require.main===module){const file=process.argv[2]??'_gam_kv_.js';if(!['_gam_kv_.js','IntextManager.js'].includes(file))throw Error('Choose a current distribution');
 const root=path.resolve(__dirname,'../..'),output=path.join(__dirname,'generated',file==='_gam_kv_.js'?'intext-manual-gam.qa.js':'intext-manual-manager.qa.js');
 fs.writeFileSync(output,build(fs.readFileSync(path.join(root,file),'utf8'),fs.readFileSync(path.join(__dirname,'intext-p13c-probe.cjs'),'utf8'),fs.readFileSync(path.join(__dirname,'intext-p13c-manual-break.cjs'),'utf8')));console.log(output);}
