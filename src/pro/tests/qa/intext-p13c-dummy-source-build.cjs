'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const {create}=require('./intext-p13c-dummy-candidate.cjs');
const expected={'_gam_kv_.js':'1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690','IntextManager.js':'ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8'};
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function build(source,candidate=create()){
 const begin=source.indexOf('class IntextVideoCreative {'),from=source.indexOf('  createVideoElement() {',begin),to=source.indexOf('  initVideoJS()',from);
 if(begin<0||from<0||to<0)throw Error('Current Intext creative boundaries missing');
 const section=source.slice(from,to),matches=[...section.matchAll(/data:video\/mp4;base64,[A-Za-z0-9+/=]+/g)];
 if(matches.length!==1)throw Error('Expected one dummy source in createVideoElement');
 const original=matches[0][0],replacement='data:video/mp4;base64,'+candidate.data.toString('base64'),at=from+matches[0].index;
 const output=source.slice(0,at)+replacement+source.slice(at+original.length);
 if(output.slice(0,at)+original+output.slice(at+replacement.length)!==source)throw Error('Non-source modification detected');
 new vm.Script(output);return {output,original:source,manifest:{sourceOnly:true,changedOccurrences:1,offset:at,
  inputSha256:sha(source),outputSha256:sha(output),oldDummySha256:sha(Buffer.from(original.split(',')[1],'base64')),candidate:candidate.manifest}};
}
module.exports={build,expected};
if(require.main===module){const root=path.resolve(__dirname,'../..'),out=path.join(__dirname,'generated'),manifests=[];fs.mkdirSync(out,{recursive:true});
 for(const file of Object.keys(expected)){
  const source=fs.readFileSync(path.join(root,file),'utf8');if(sha(source)!==expected[file])throw Error('P1.3b input hash changed: '+file);
  const result=build(source),name=file==='_gam_kv_.js'?'gam':'manager';
  const control=path.join(out,'intext-dummy-original-'+name+'.qa.js'),variant=path.join(out,'intext-dummy-black-'+name+'.qa.js');
  fs.writeFileSync(control,source);fs.writeFileSync(variant,result.output);manifests.push({file,control,variant,...result.manifest});
 }
 fs.writeFileSync(path.join(root,'docs/intext-p13c-dummy-source-build.json'),JSON.stringify({qaOnly:true,advertisingValidation:'PENDING real Intext test; no production authorization',variants:manifests},null,2)+'\n');console.log(JSON.stringify(manifests,null,2));
}
