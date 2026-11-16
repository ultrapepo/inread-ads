'use strict';
// Offline branch harness: only extracted class methods execute. No full core bootstrap.
const fs=require('node:fs');
const vm=require('node:vm');
const G=require('./generator.cjs');
const {facade}=require('./facade.cjs');
const {createNativeOffline}=require('./native.cjs');
const distributions=['_gam_kv_.js','IntextManager.js'];
const cache=new Map(); // exactly two immutable source/build records, no runtime objects
function source(distribution){if(!cache.has(distribution)){const base=fs.readFileSync(distribution),built=G.build(distribution,base);cache.set(distribution,{base,...built,capability:G.verifyCopy(distribution,base,built.copy)});}return cache.get(distribution);}
function compile(distribution,cls,name,{copy=true,endpoint=null,globals={}}={}){
  const s=source(distribution),text=G.method((copy?s.copy:s.base).toString('utf8'),cls,name).text;
  const C=vm.runInNewContext(`(class OfflineMethod {${text}\n})`,{[G.variable(distribution)]:facade(endpoint),...globals},{timeout:1000});
  return name==='constructor'?C:C.prototype[name];
}
function env(distribution,{copy=true,enabled=true,throwSink=false,limits,position=20,hidden=false,missing=false,rectMissing=false,rendered=true,intersection=false}={}){
  const trace=[],callbacks=new Map();let now=10,top=position,active=true;
  const record=(name,value)=>{trace.push(value===undefined?name:[name,value]);};
  const anchor={isConnected:true,textContent:'offline paragraph',getBoundingClientRect(){record('rect');return rectMissing?null:{top,left:0,width:320,height:180,bottom:top+180,right:320};},getClientRects(){record('clientRects');return rendered?[{}]:[];}};
  const root={querySelectorAll(){record('paragraphs');return [anchor];}};
  const document={hidden,visibilityState:hidden?'hidden':'visible',querySelector(){record('querySelector');return root;},
    addEventListener(t,fn){record('document.add',t);callbacks.set(`document:${t}`,fn);},removeEventListener(t){record('document.remove',t);callbacks.delete(`document:${t}`);}};
  const window={innerHeight:800,innerWidth:1200,gexpIntextDebug:false,
    getComputedStyle(){record('css');return {display:'block',visibility:'visible',opacity:'1'};},
    addEventListener(t,fn){record('window.add',t);callbacks.set(`window:${t}`,fn);},removeEventListener(t){record('window.remove',t);callbacks.delete(`window:${t}`);}};
  const native=createNativeOffline({buildCapability:source(distribution).capability,document,clock:()=>++now,limits});
  const endpoint=throwSink?()=>{throw new Error('sink-fault');}:enabled?native.endpoint:null;
  let activation;
  class OfflineCreative {
    constructor(opts){Object.assign(this,opts);this._renderToken=1;record('newCreative');}
    async prepare(){record('prepare');}
    preparationValid(){record('preparationValid');return true;}
    createPlayerForActivation(){record('createPlayer');}
    observeActivationEligibility(){record('observeActivation');}
    requestAds(){record('requestAds');return 'offline-result';}
    render(){record('render');return activation.call(this);}
    destroy(){record('destroyCreative');}
    cleanupAdMediaObservation(){record('cleanupMedia');}
    static prewarmDependencies(){record('prewarm');return Promise.resolve();}
    static drainPreparations(){record('drain');}
  }
  const globals={document,window,Date:{now(){record('Date.now');return 100;}},
    logIntext(){record('log');},warnIntext(){record('warn');},groupIntext(){record('group');},groupEndIntext(){record('groupEnd');},
    setTimeout(fn,delay){record('timeout',delay);callbacks.set('timer',fn);return 7;},clearTimeout(id){record('clearTimeout',id??null);},
    IntextVideoCreative:OfflineCreative};
  if(intersection)globals.IntersectionObserver=class {constructor(fn,opts){record('IO.new',opts);callbacks.set('intersection',fn);}observe(){record('IO.observe');}disconnect(){record('IO.disconnect');}};
  const options={copy,endpoint,globals};
  const Engine=compile(distribution,'IntextPlacementEngine','constructor',options),engine=new Engine({}, {placements:[1]});
  engine.isValidParagraph=()=>true;engine.evaluatePlacement=()=>({paragraph:anchor,paragraphIndex:0});
  const placements=compile(distribution,'IntextPlacementEngine','findPlacements',options).call(engine);
  const Node=compile(distribution,'IntextNode','constructor',options);
  const videoEl={style:{},querySelector(){record('loader');return null;}};
  const container={getElement(){record('container');return missing?null:anchor;},close(){record('close');}};
  const videoContainer={getElement(){record('videoContainer');return missing?null:videoEl;},close(){record('video.close');}};
  const node=new Node({id:'offline',videoId:'offline-video',container,videoContainer,config:{},manager:{},placement:missing?{}:placements[0]});
  const nodeMethods=['getIntextTelemetryElement','getReadinessViewportState','waitForViewport','startIntextTelemetryCycle','beginVisualRender','invalidateVisualCallbacks','buildAndPlayVideo'];
  for(const name of nodeMethods)node[name]=compile(distribution,'IntextNode',name,options);
  for(const name of ['teardownIntextViewportTelemetryObserver','clearIntextTelemetryCycleCI','mergeIntextTelemetry','resolveIntextPipTargetingEligibility','setupIntextViewportTelemetryObserver','flushIntextTelemetryToCI','cancelViewportWaits','cleanupIntextPip','resetIntextPipState','applyIntextWrapperDebugAttributes','clearRenderTimers','commitIntextTelemetry','ensureSingleVisibleIntextSurface','recordTelemetry','discardDisplay','completeVisualRender'])node[name]=()=>record(name);
  node.getIntextPipConfig=()=>({});node.isIntextPipEffectiveEnabled=()=>false;node.isIntextPipSlotEnabled=()=>false;
  node.getIntextInitPageMs=()=>null;node.getIntextDistancePx=()=>20;node.getIntextTelemetryElementMeta=()=>{node.getIntextTelemetryElement();return {};};node.getIntextPipPlaybackState=()=>({source:'unknown',playing:false});
  node.isActiveRenderToken=(token,source)=>{record('token-check',source);return active&&token===node._activeRenderToken;};
  const waterfall={node,config:{decision:{mode:'auto'}},loadingConfig:{},_fetchGeneration:0,
    disconnectFetchObserver(){record('disconnectFetch');},disconnectRenderObserver(){record('disconnectRender');},
    getLoadingDistancePx(){record('distance');return 20;},getIntextOffYTelemetry(){record('offY');return {};},getIntextExpectedViewability(){record('expected');return 'unknown';},
    mergeLoadingPhaseTelemetry(){record('loadingTelemetry');},async runPrebidPhase(){record('prebid');},decideWinner(){record('decision');return {winner:'video'};},
    recordReadiness(event){record('readiness',event);},setupVideoPreparation(){record('setupPreparation');},cancelVideoPreparation(){record('cancelPreparation');},
    claimVideoPreparation(){record('claimPreparation');},getPreparedVideo(){record('getPrepared');return null;},startRender(){record('startRender');},
    releasePreparedVideo(){record('releasePrepared');}};
  node.waterfall=waterfall;
  for(const name of ['startFetch','cleanup','setupVideoPreparation','claimVideoPreparation','startAuction']){
    waterfall[`original_${name}`]=compile(distribution,'IntextWaterfall',name,options);
  }
  const creative=new OfflineCreative({node});
  activation=compile(distribution,'IntextVideoCreative','activate',options);
  function method(cls,name){return compile(distribution,cls,name,options);}
  async function start(winner='video') {waterfall.decideWinner=()=>{record('decision');return {winner};};await waterfall.original_startFetch.call(waterfall,'offline');node.beginVisualRender('render_started','offline');creative._renderToken=node._activeRenderToken;
    if(enabled&&copy&&!throwSink)native.endpoint('creative',node,creative,node._activeRenderToken);}
  function guard(caller,eligible=true){const result={eligible,reason:eligible?'visible':'below'};native.endpoint('result',node,anchor,result);return caller==='C1'?native.endpoint('control',node,caller,creative,result):native.endpoint('wait',node,node._activeRenderToken,Object.keys(require('./native.cjs').WAIT).find(k=>require('./native.cjs').WAIT[k]===caller),caller==='W2'||caller==='W1'?null:creative,result);}
  return {native,node,waterfall,creative,activation,trace,callbacks,globals,anchor,root,document,engine,method,start,guard,
    setTop(v){top=v;},setActive(v){active=v;},setTime(v){now=v;},resetTrace(){trace.length=0;},options,record};
}
module.exports={source,compile,env,distributions};
