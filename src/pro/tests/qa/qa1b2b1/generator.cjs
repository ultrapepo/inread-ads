'use strict';
const fs=require('node:fs');
const crypto=require('node:crypto');
const previous=require('../qa1b2a/generator.cjs');
const {createRuntime}=require('./runtime.factory.js');
const {utf8ByteLength}=require('./qa0-byte-length.js');
const CORES=Object.freeze({'_gam_kv_.js':'1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690',
  'IntextManager.js':'ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8'});
const PARENTS=Object.freeze({'_gam_kv_.js':'82712fd8317a9de8878c0934e503362bca8a7944c6723209a0e408f0d7cecf78',
  'IntextManager.js':'2fa180905972b432a14442bafeaf0d911a71724569b19f7580b03c6c9d2bb7df'});
const MODULES=['tests/qa/intext-p14b-data.cjs','tests/qa/intext-p14b-shadow-evaluator.cjs','tests/qa/intext-p14b-shadow-ledger.cjs'];
const SOURCES=['tests/qa/qa1b2b1/runtime.factory.js','tests/qa/qa1b2b1/qa0-byte-length.js','tests/qa/qa1b2b1/native-browser.schema.json','tests/qa/qa1b2b1/release.schema.json','tests/qa/qa1b2b1/generator.cjs'];
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const record=file=>{const b=fs.readFileSync(file);return {file,bytes:b.length,sha256:hash(b)};};
function moduleBundle(){
  const m=MODULES.map(file=>({file,source:fs.readFileSync(file,'utf8')}));
  const defs=m.map(({file,source})=>`${JSON.stringify(file.split('/').at(-1))}:function(require,module,exports){\n${source}\n}`).join(',\n');
  return `(()=>{const defs={${defs}},cache=Object.create(null),shim=Object.freeze({Buffer:Object.freeze({byteLength:${utf8ByteLength.toString()}})});
    const require=id=>{if(id==='node:buffer')return shim;const key=id.startsWith('./')?id.slice(2):id;
      if(!Object.hasOwn(defs,key))throw new TypeError('require-not-allowlisted');if(cache[key])return cache[key].exports;
      const module={exports:{}};cache[key]=module;defs[key](require,module,module.exports);return module.exports;};
    return require('intext-p14b-shadow-ledger.cjs');})()`;
}
function runtimeExpression(profile,fixture=false){
  const ctx=fixture?`{profile:${JSON.stringify(profile)},clock:__fixture.clock,randomId:__fixture.randomId,host:window,
    sourceAttestor:__fixture.sourceAttestor,evidenceKind:'NODE-PRIVATE-FIXTURE',limits:__fixture.limits}`:
    `{profile:${JSON.stringify(profile)},clock:()=>performance.now(),randomId:()=>{const a=new Uint8Array(12);crypto.getRandomValues(a);return Array.from(a,v=>v.toString(16).padStart(2,'0')).join('');},host:typeof window==='undefined'?null:window,sourceAttestor:null,evidenceKind:'UNBOUND-BROWSER'}`;
  const value=`(${createRuntime.toString()})(${moduleBundle()},${utf8ByteLength.toString()},${ctx})`;
  return fixture?`__fixture.capture(${value})`:value;
}
function helpers(cls,profile,fixture=false){return `
  #qa1b = null;
  static #qp(self){try{return self.#qa1b;}catch(_){return null;}}
  static #qt(self,...args){try{return self.#qa1b?.tap(...args);}catch(_){}}
  static #qv(self,kind,value,...args){${cls}.#qt(self,kind,...args,value);return value;}
  static #qr(self,value,node,anchor){${cls}.#qt(self,'result',node,anchor,value);return value;}
  static #qf(self,value,node,creative){${cls}.#qt(self,'control',node,'C1',creative,value);return value;}
  static #ticket(self,node,caller,token,owner=null){try{return self.#qa1b?.ticket(node,caller,token,owner)??null;}catch(_){return null;}}
  ${cls==='IntextManager'?`/*QA1B_RUNTIME_BEGIN*/ static #qaRuntime = (()=>{try{return ${runtimeExpression(profile,fixture)};}catch(_){return null;}})(); /*QA1B_RUNTIME_END*/`:''}
`;}
function changeOnce(text,from,to,label){if(text.split(from).length!==2)throw new Error('anchor-not-unique:'+label);return text.replace(from,to);}
function addArg(text,start,close,extra,label){const a=text.indexOf(start);if(a<0||text.indexOf(start,a+1)>=0)throw new Error('call-anchor:'+label);const end=text.indexOf(close,a);if(end<0)throw new Error('call-end:'+label);return text.slice(0,end)+text.slice(end).replace(close,extra);}
function build(distribution,base,{fixture=false}={}){
  if(!Buffer.isBuffer(base)||hash(base)!==CORES[distribution])throw new Error('base-hash');
  const parent=previous.build(distribution,base);if(hash(parent.copy)!==PARENTS[distribution])throw new Error('parent-hash');
  const source=base.toString('utf8'),inputs=[...MODULES,...SOURCES].map(record);
  // Module bytes are frozen inputs, not an editable copy used as an oracle.
  const protectedRecords=JSON.parse(fs.readFileSync('docs/intext-p14b-qa1b-stage2a-integrity.json','utf8')).protectedBefore;
  for(const x of inputs.filter(x=>MODULES.includes(x.file))){const frozen=protectedRecords.find(e=>e.file===x.file);if(!frozen||x.sha256!==frozen.sha256)throw new Error('frozen-module-diverged');}
  const profile={distribution,coreSha256:CORES[distribution],releaseInputId:hash(JSON.stringify({distribution,parent:PARENTS[distribution],inputs}))};
  const methods=new Map();
  for(const e of parent.manifest.edits)methods.set(e.className+'.'+e.method,{...e});
  function edit(cls,name,fn){let e=methods.get(cls+'.'+name);if(!e){const m=previous.method(source,cls,name);e={className:cls,method:name,...m,before:m.text,after:m.text,anchorSha256:hash(m.text)};methods.set(cls+'.'+name,e);}e.after=fn(e.after);}
  const M='IntextManager',N='IntextNode',W='IntextWaterfall',V='IntextVideoCreative',E='IntextPlacementEngine';
  for(const cls of [E,N,W,V])edit(cls,'constructor',text=>{
    const header=/^  constructor\([\s\S]*?\) \{/.exec(text)?.[0];if(!header)throw new Error('constructor-header');
    text=changeOnce(text,header,header.slice(0,-3)+', __qa1bPort = null) {\n    try { this.#qa1b = __qa1bPort; } catch (_) {}',cls+' signature');
    if(cls===W)text=text.slice(0,-1)+`  ${W}.#qt(this,'waterfall',this,node);\n  }`;
    if(cls===V)text=text.slice(0,-1)+`  ${V}.#qt(this,'creative-created',node,this);\n  }`;
    return text;
  });
  edit(M,'constructor',text=>text.replace('constructor(config, gexpInstance) {',`constructor(config, gexpInstance) {\n    try { this.#qa1b = ${M}.#qaRuntime?.manager(this, typeof document==='undefined'?null:document)??null; } catch (_) {}`));
  edit(M,'createIntextPositions',text=>{
    text=changeOnce(text,'        this.siteConfig.rules,\r\n      );',`        this.siteConfig.rules,\r\n        null, ${M}.#qp(this)\n      );`,'initial engine');
    return addArg(text,'const node = new IntextNode({','        });',`        }, ${M}.#qp(this));`,'initial node');});
  edit(M,'createIntextPositionsScoped',text=>{
    text=changeOnce(text,'        rootElement\r\n      );',`        rootElement, ${M}.#qp(this)\n      );`,'scoped engine');
    return addArg(text,'const node = new IntextNode({','        });',`        }, ${M}.#qp(this));`,'scoped node');});
  edit(N,'initialize',text=>addArg(text,'this.waterfall = new IntextWaterfall({','    });',`    }, ${N}.#qp(this));`,'waterfall'));
  edit(N,'constructor',text=>changeOnce(text,'placement, document, navIndex);','placement, document, navIndex, scopedContext);','native nav context'));
  edit(N,'buildAndPlayVideo',text=>{
    text=changeOnce(text,'new IntextVideoCreative(creativeOpts)',`new IntextVideoCreative(creativeOpts, ${N}.#qp(this))`,'new creative');
    text=changeOnce(text,'this.waitForViewport(renderToken, "buildAndPlayVideo:capacity-or-legacy")',`this.waitForViewport(renderToken, "buildAndPlayVideo:capacity-or-legacy", null, ${N}.#ticket(this,this,'W2',renderToken))`,'W2');
    return changeOnce(text,'this.waitForViewport(renderToken, "buildAndPlayVideo:waitForViewport", creative)',`this.waitForViewport(renderToken, "buildAndPlayVideo:waitForViewport", creative, ${N}.#ticket(this,this,'W3',renderToken,creative))`,'W3');});
  edit(W,'setupVideoPreparation',text=>changeOnce(text,'preparationGuard: () => entry.valid() && entry.generation === generation });',`preparationGuard: () => entry.valid() && entry.generation === generation }, ${W}.#qp(this));`,'prepared creative constructor'));
  edit(V,'activate',text=>changeOnce(text,'node.waitForViewport(this._renderToken, "video-activation", this)',`node.waitForViewport(this._renderToken, "video-activation", this, ${V}.#ticket(this,node,'W4',this._renderToken,this))`,'W4'));
  edit(N,'waitForViewport',text=>{
    text=changeOnce(text,'owner = null) {','owner = null, __qa1bTicket = null) {','wait signature');
    text=changeOnce(text,'source, owner, state);','source, owner, state, __qa1bTicket);','wait ticket');
    return changeOnce(text,'      settled = true;',`      settled = true;\n      ${N}.#qt(this,'wait-finished',this,__qa1bTicket);`,'finish');});
  const old=previous.variable(distribution);
  for(const e of methods.values()){
    for(const[a,b]of [['tap','qt'],['value','qv'],['result','qr'],['final','qf']])e.after=e.after.replaceAll(old+'.'+a+'(',e.className+'.#'+b+'(this,');
  }
  const edits=[...methods.values()].map(({className,method,start,end,before,after,anchorSha256})=>({className,method,start,end,before,after,anchorSha256}));
  for(const cls of [M,E,N,W,V]){const anchor=`class ${cls} {`,start=source.indexOf(anchor);if(start<0||source.indexOf(anchor,start+1)>=0)throw new Error('class-anchor');
    const at=start+anchor.length;edits.push({className:cls,method:'private-binding',start:at,end:at,before:'',after:helpers(cls,profile,fixture),anchorSha256:hash(anchor)});}
  edits.sort((a,b)=>a.start-b.start);for(let i=1;i<edits.length;i++)if(edits[i-1].end>edits[i].start)throw new Error('overlap');
  let text=source;for(const e of [...edits].reverse())text=text.slice(0,e.start)+e.after+text.slice(e.end);
  const copy=Buffer.from(text);return {copy,profile,manifest:{distribution,baseSha256:hash(base),baseBytes:base.length,parentSha256:hash(parent.copy),
    copySha256:hash(copy),copyBytes:copy.length,sourceAttestation:fixture?'NODE-PRIVATE-FIXTURE':'pending',endpointGlobal:false,inputs,edits,profile}};
}
module.exports={build,hash,record,CORES,PARENTS,MODULES,SOURCES,moduleBundle,runtimeExpression,helpers,method:previous.method};
