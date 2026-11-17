'use strict';
// S1 only: extracted class definitions/methods, lexical private fixture attestor.
// Never evaluates the original or QA commercial bootstrap.
const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const G=require('./generator.cjs');
const selections=Object.freeze({
  IntextManager:['constructor','createIntextPositions','createIntextPositionsScoped','onNewArticleDetected'],
  IntextPlacementEngine:['constructor','findPlacements'],
  IntextNode:['constructor','initialize','getIntextTelemetryElement','getReadinessViewportState','waitForViewport','startIntextTelemetryCycle','beginVisualRender','invalidateVisualCallbacks','buildAndPlayVideo'],
  IntextWaterfall:['constructor','startFetch','cleanup','setupVideoPreparation','claimVideoPreparation','getPreparedVideo','cancelVideoPreparation','startAuction'],
  IntextVideoCreative:['constructor','activate','abort','destroy']});
function sources(distribution){const base=fs.readFileSync(distribution),built=G.build(distribution,base);return {base,...built};}
function env(distribution='_gam_kv_.js',options={}){
  const mode=options.mode??'E',trace=[],callbacks=new Map();let top=options.position??20,now=10,active=true,sourceState=options.source??'accredited',runtime;
  const record=(name,value)=>trace.push(value===undefined?name:[name,JSON.parse(JSON.stringify(value))]);
  const root={querySelectorAll(){record('paragraphs');return [anchor];},insertBefore(el){record('insert');el.parentNode=this;}};
  const anchor={parentNode:root,isConnected:true,textContent:'synthetic branch fixture',getBoundingClientRect(){record('rect');if(options.rectError)throw new Error('original-rect-error');return options.rectMissing?null:{top,left:0,width:320,height:180,bottom:top+180,right:320};},getClientRects(){record('clientRects');return options.rendered===false?[]:[{}];}};
  const document={hidden:options.hidden??false,visibilityState:options.hidden?'hidden':'visible',readyState:'loading',querySelector(){record('querySelector');return options.missing?null:root;},getElementById(){record('getElementById');return null;},
    addEventListener(t,f){record('document.add',t);callbacks.set('document:'+t,f);},removeEventListener(t){record('document.remove',t);callbacks.delete('document:'+t);}};
  const window={gexpIntextDebug:false,innerHeight:800,innerWidth:1200,getComputedStyle(){record('css');return {display:'block',visibility:'visible',opacity:'1'};},
    addEventListener(t,f){record('window.add',t);callbacks.set('window:'+t,f);},removeEventListener(t){record('window.remove',t);callbacks.delete('window:'+t);}};
  if(options.adminCollision)Object.defineProperty(window,'__qa1bAdmin_'+distribution.replace(/[^a-z0-9]/gi,'_'),{value:options.adminCollision,configurable:true});
  class Container {constructor(el){this.el=el;}getElement(){record('container');return this.el;}close(){record('close');}}
  class WindowArray {constructor(id){record('WindowArray',id);this.cI={};}}
  const globals={document,window,WindowArray,IntextContainer:Container,TextEncoder,Uint8Array,performance:{now:()=>++now},crypto:{getRandomValues:a=>crypto.randomFillSync(a)},
    Date:{now(){record('Date.now');return 100;}},Math:Object.assign(Object.create(Math),{random(){return .5;}}),
    ensureBaseStyles(){record('baseStyles');},logIntext(){record('log');},warnIntext(){record('warn');},errorIntext(){record('error');},groupIntext(){record('group');},groupEndIntext(){record('groupEnd');},
    setTimeout(f,ms){record('timeout',ms);callbacks.set('timer',f);return 7;},clearTimeout(id){record('clearTimeout',id??null);}};
  if(options.intersection)globals.IntersectionObserver=class{constructor(f,o){record('IO.new',o);callbacks.set('intersection',f);}observe(){record('IO.observe');}disconnect(){record('IO.disconnect');}};
  const data=sources(distribution),input=(mode==='O'?data.base:data.copy).toString('utf8');
  const fixture={clock:options.clock??(()=>++now),randomId:()=>crypto.randomBytes(12).toString('hex'),sourceAttestor:mode==='N'?null:()=>sourceState,
    limits:options.limits,capture:r=>{runtime=r;return r;}};
  const classBodies=Object.entries(selections).map(([cls,names])=>`class ${cls} {${mode==='O'?'':G.helpers(cls,data.profile,true)}\n${names.map(name=>G.method(input,cls,name).text).join('\n')}\n}`).join('\n');
  const context=vm.createContext(globals);
  const instantiate=vm.runInContext(`(function(__fixture){${classBodies};return {${Object.keys(selections).join(',')}};})`,context,{timeout:2000});
  const actors=instantiate(fixture),M=actors.IntextManager,N=actors.IntextNode,W=actors.IntextWaterfall,V=actors.IntextVideoCreative,E=actors.IntextPlacementEngine;
  Object.assign(M.prototype,{getSiteContext:()=>({}),resolveSiteConfig:()=>null,readIntextQaCookieOverride:()=>null,createIntextTelemetryId:()=> 'synthetic-id',
    extractStaticAdUnitPath:()=>null,normalizeIntextNetworkId:()=>null,resolveIntextRequestNetworkId:()=>null,
    isSlotDisabledByExclusion:()=>false,getSlotOverridesForNode:()=>null,registerIntextDiagnosticEvent:()=>record('diagnostic'),
    createWrapperNode(i,type){return {id:'fixture-'+type,style:{},dataset:{},querySelector(){record('loader');return null;}};}});
  E.prototype.isValidParagraph=()=>true;E.prototype.evaluatePlacement=()=>({paragraph:anchor,paragraphIndex:0});
  const noopNames=['teardownIntextViewportTelemetryObserver','clearIntextTelemetryCycleCI','mergeIntextTelemetry','resolveIntextPipTargetingEligibility','setupIntextViewportTelemetryObserver','flushIntextTelemetryToCI',
    'cancelViewportWaits','cleanupIntextPip','resetIntextPipState','applyIntextWrapperDebugAttributes','clearRenderTimers','commitIntextTelemetry','ensureSingleVisibleIntextSurface','recordTelemetry','discardDisplay','completeVisualRender'];
  for(const name of noopNames)N.prototype[name]=()=>record(name);
  Object.assign(N.prototype,{getIntextPipConfig:()=>({}),isIntextPipEffectiveEnabled:()=>false,isIntextPipSlotEnabled:()=>false,getIntextInitPageMs:()=>null,getIntextDistancePx:()=>20,
    getIntextTelemetryElementMeta(){this.getIntextTelemetryElement();return {};},getIntextPipPlaybackState:()=>({source:'unknown',playing:false}),
    isActiveRenderToken(token,source){record('token-check',source);return active&&token===this._activeRenderToken;}});
  const original={};for(const name of selections.IntextWaterfall)if(name!=='constructor')original[name]=W.prototype[name];
  Object.assign(W.prototype,{init(){record('waterfall.init');},disconnectFetchObserver(){record('disconnectFetch');},disconnectRenderObserver(){record('disconnectRender');},getLoadingDistancePx(){record('distance');return 20;},
    getIntextOffYTelemetry(){record('offY');return {};},getIntextExpectedViewability(){record('expected');return 'unknown';},mergeLoadingPhaseTelemetry(){record('loadingTelemetry');},async runPrebidPhase(){record('prebid');},
    decideWinner(){record('decision');return {winner:'video'};},recordReadiness(e){record('readiness',e);},setupVideoPreparation(){record('setupPreparation');},cancelVideoPreparation(){record('cancelPreparation');},
    claimVideoPreparation(){record('claimPreparation');},getPreparedVideo(){record('getPrepared');return null;},startRender(){record('startRender');},releasePreparedVideo(){record('releasePrepared');}});
  Object.assign(V.prototype,{async prepare(){record('prepare');},preparationValid(){record('preparationValid');return true;},createPlayerForActivation(){record('createPlayer');},
    observeActivationEligibility(){record('observeActivation');},requestAds(){record('requestAds');return 'synthetic-no-request';},render(){record('render');return this.activate();},cleanupAdMediaObservation(){record('cleanupMedia');}});
  V.prewarmDependencies=()=>{record('prewarm');return Promise.resolve();};V.drainPreparations=()=>record('drain');
  const manager=new M({}, {cfg:{},windows:{},statsG:{}});
  manager._navContinuaNodes=[]; // absent only because the full bootstrap is deliberately not run
  manager.siteConfig={dom:{},rules:{placements:[1]},style:{},decision:{mode:'auto'}};
  manager.createIntextPositions();
  const node=manager.nodes[0]??null,waterfall=node?.waterfall??null;
  if(waterfall)waterfall.loadingConfig={};
  function session(){return runtime?.inspect(document)??null;}
  async function start(winner='video'){waterfall.decideWinner=()=>{record('decision');return {winner};};await original.startFetch.call(waterfall,'synthetic');node.beginVisualRender('render_started','synthetic');}
  function finish(result='stale'){for(const f of node?._viewportWaits??[])f(result);}
  function method(cls,name){return actors[cls].prototype[name];}
  function scoped(index=1,body=root){const before=manager.nodes.length;const searchRoot={querySelector(){record('scopedQuery');return body;}};
    const result=manager.createIntextPositionsScoped(searchRoot,manager.siteConfig,'_synthetic',index,{navIndex:index});return {result,nodes:manager.nodes.slice(before)};}
  const driver=Object.freeze({session,decision:(...a)=>runtime.decision(...a),costStats:()=>runtime.costStats(),
    // Only the Node test driver owns this lexical access; never a page global.
    port:()=>runtime?.manager(manager,document)??null,newManager:()=>new M({}, {cfg:{},windows:{},statsG:{}})});
  return {distribution,mode,data,actors,context,globals,trace,record,manager,node,waterfall,document,window,root,anchor,callbacks,original,driver,start,finish,method,scoped,
    setTop:v=>{top=v;},setActive:v=>{active=v;},setTime:v=>{now=v;},setSource:v=>{sourceState=v;},resetTrace:()=>{trace.length=0;}};
}
function comparable(value){return JSON.parse(JSON.stringify(value));}
async function compare(distribution,run,options={}){const rows=[];let enabled;
  for(const mode of ['O','N','E']){const h=env(distribution,{...options,mode});const result=await run(h);rows.push({mode,result:result??null,trace:comparable(h.trace)});if(mode==='E')enabled=h;}
  return {rows,enabled};}
module.exports={env,compare,comparable,sources,selections};
