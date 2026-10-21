/* QA only: event subscriptions and read-only snapshots. No playback or SDK wrappers. */
(function(root,factory){const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;else root.IntextIntegrationQA=api;})(typeof window==='object'?window:globalThis,function(root){
 'use strict';
 const logs=[],instances=new Set(),byCreative=new WeakMap(),byNode=new WeakMap(),ids=new WeakMap();let nextId=0,dropped=0;
 const read=(fn,fallback=null)=>{try{return fn()??fallback;}catch{return fallback;}};
 const identity=o=>o&&(typeof o==='object'||typeof o==='function')?(ids.has(o)?ids.get(o):(ids.set(o,++nextId),nextId)):null;
 const source=value=>{if(!value)return null;const s=String(value);return s.startsWith('data:')?{kind:'data',mime:s.slice(5,s.indexOf(';')),length:s.length}:
  s.startsWith('blob:')?{kind:'blob',value:s}: {kind:'url',value:s};};
 const rect=el=>read(()=>{const r=el.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height};});
 function surface(el){return read(()=>{const style=root.getComputedStyle(el),r=rect(el);return {id:identity(el),connected:el.isConnected,rect:r,
  display:style.display,visibility:style.visibility,opacity:style.opacity,hidden:el.hidden,
  // Geometry/CSS snapshot only, not IMA/GAM viewability or proof of visible pixels.
  hasBox:!!r&&r.width>0&&r.height>0};});}
 function attach(creative){if(byCreative.has(creative))return byCreative.get(creative);const player=creative.player;if(!player)return null;
  const node=creative.node,token=creative._renderToken,cycle=node?._intextTelemetryCycleId??null;
  const cleanup=[],mediaCleanup=new Map();let closed=false,manager=null,managerOff=[],sequence=0,mutationQueued=false;
  const emit=(event,detail={})=>{if(closed)return;try{const buildStart=read(()=>root.performance.now());
   const base=creative.videoEl,current=creative._adMediaEl,tech=read(()=>player.el().querySelector('video.vjs-tech')),adState=read(()=>player.ads?._state);
   const scalarState=typeof player.ads?.state==='string'?player.ads.state:null;
   const media=[...new Set([base,current,...read(()=>Array.from(player.el().querySelectorAll('video')),[])].filter(Boolean))];
   const snapshot={playerId:identity(player),managerId:identity(manager),baseMediaId:identity(base),techMediaId:identity(tech),observedAdMediaId:identity(current),
    playerBuildStartedAt:creative._playerBuildStartedAt??null,
    playerBuildElapsedMs:Number.isFinite(creative._playerBuildStartedAt)?Date.now()-creative._playerBuildStartedAt:null,
    adState:{constructor:read(()=>adState.constructor.name),state:scalarState,inAdMode:read(()=>player.ads.isInAdMode()),
     inAdBreak:read(()=>player.ads.inAdBreak()),snapshotPresent:!!player.ads?.snapshot,
     snapshotCurrentSrc:source(read(()=>player.ads.snapshot.currentSrc)),snapshotEnded:read(()=>player.ads.snapshot.ended),
     snapshotCurrentTime:read(()=>player.ads.snapshot.currentTime)},
    media:media.map(el=>({id:identity(el),isBase:el===base,isVjsTech:el===tech,isCoreObservedAd:el===current,
     insideImaContainer:!!read(()=>el.closest('.ima-ad-container,.vjs-ima-ad-container,.ima-video-container,.ima-html5-video-content'),false),
     currentSrc:source(read(()=>el.currentSrc)),src:source(read(()=>el.getAttribute('src'))),
     currentTime:read(()=>el.currentTime),duration:read(()=>Number.isFinite(el.duration)?el.duration:null),paused:read(()=>el.paused),ended:read(()=>el.ended),
     readyState:read(()=>el.readyState),networkState:read(()=>el.networkState),videoWidth:read(()=>el.videoWidth),videoHeight:read(()=>el.videoHeight),
     mediaError:el.error?{code:el.error.code,message:el.error.message}:null,rect:rect(el)})),
    playerSource:source(read(()=>player.currentSrc())),playerSurface:surface(read(()=>player.el())),
    videoSurface:surface(read(()=>node.videoContainer.getElement())),displaySurface:surface(read(()=>node.container.getElement())),
    readiness:read(()=>node.getReadinessViewportState()),readinessAnchorRect:rect(read(()=>node.getIntextTelemetryElement())),documentVisibility:root.document?.visibilityState??'unknown',
    revealed:creative._playerRevealed===true,destroyed:creative._destroyed===true};
   if(logs.length>=5000){logs.shift();dropped++;}
   logs.push({event,sequence:++sequence,timestamp:Date.now(),monotonicMs:read(()=>root.performance.now()),slotId:node?.id??null,
    cycleId:cycle,renderToken:token,activeRenderToken:node?._activeRenderToken??null,
    tokenMatches:node?._activeRenderToken===token,snapshot,...detail,
    observerBuildMs:buildStart===null?null:read(()=>root.performance.now()-buildStart)});
  }catch{/* Observation must not interrupt the original call stack. */}};
  const later=fn=>{if(typeof root.queueMicrotask==='function')root.queueMicrotask(()=>{if(!closed)fn();});else Promise.resolve().then(()=>{if(!closed)fn();});};
  const discover=()=>{
   const all=[creative.videoEl,creative._adMediaEl,...read(()=>Array.from(player.el().querySelectorAll('video')),[])].filter(Boolean);
   for(const el of [...mediaCleanup.keys()])if(!all.includes(el)){mediaCleanup.get(el)();mediaCleanup.delete(el);}
   for(const el of new Set(all)){if(mediaCleanup.has(el))continue;const off=[];
    for(const type of ['loadstart','loadedmetadata','loadeddata','canplay','play','playing','pause','seeking','seeked','ended','emptied','abort','error']){
     const handler=()=>emit('media:'+type,{mediaId:identity(el)});el.addEventListener(type,handler);off.push(()=>el.removeEventListener(type,handler));
    }mediaCleanup.set(el,()=>off.forEach(fn=>read(fn)));
   }
  };
  const bindManager=event=>{
   const next=event?.adsManager??read(()=>player.ima.getAdsManager());if(next===manager)return;
   managerOff.forEach(fn=>read(fn));managerOff=[];manager=next??null;emit('manager:identity');if(!manager)return;
   const owner=manager,types=root.google?.ima?.AdEvent?.Type??{},errors=root.google?.ima?.AdErrorEvent?.Type??{};
   for(const [name,type]of [...['LOADED','STARTED','IMPRESSION','COMPLETE','ALL_ADS_COMPLETED','CONTENT_PAUSE_REQUESTED','CONTENT_RESUME_REQUESTED','PAUSED','RESUMED','SKIPPED']
    .map(name=>[name,types[name]]),['AD_ERROR',errors.AD_ERROR]]){
    if(!type){emit('manager:subscription-missing',{nativeEvent:name,reason:'enum-unavailable'});continue;}
    if(typeof owner.addEventListener!=='function'||typeof owner.removeEventListener!=='function'){emit('manager:subscription-missing',{nativeEvent:name,reason:'removable-api-unavailable'});continue;}
    const handler=()=>{if(closed||manager!==owner)return;discover();emit('ima:'+name);later(()=>emit('ima:'+name+':microtask'));};
    try{owner.addEventListener(type,handler);managerOff.push(()=>owner.removeEventListener(type,handler));emit('manager:subscribed',{nativeEvent:name});}
    catch(error){emit('manager:subscription-failed',{nativeEvent:name,error:String(error)});}
   }
  };
  function close(reason='manual'){if(closed)return;emit('observer:closed',{reason});closed=true;cleanup.forEach(fn=>read(fn));managerOff.forEach(fn=>read(fn));
   mediaCleanup.forEach(fn=>read(fn));mediaCleanup.clear();instances.delete(probe);byNode.delete(node);byCreative.delete(creative);}
  const probe={record:(event,detail)=>{discover();emit(event,detail);},close};byCreative.set(creative,probe);if(node)byNode.set(node,probe);instances.add(probe);
  for(const type of ['loadstart','play','playing','pause','ended','contentended','contentresumed','contentloadstart','contentloadedmetadata','contentcanplay',
   'ads-request','ads-loader','ads-manager','adsready','readyforpreroll','adstart','ads-ad-started','adend','adended','adtimeout','nopreroll','adserror','alladscompleted','dispose']){
   const handler=event=>{if(closed)return;discover();if(type==='ads-manager')bindManager(event);emit('player:'+type);
    if(type==='dispose')close('player-dispose');else later(()=>{discover();emit('player:'+type+':microtask');});};
   player.on(type,handler);cleanup.push(()=>player.off(type,handler));
  }
  const visibility=()=>emit('document:visibilitychange');root.document?.addEventListener('visibilitychange',visibility);
  cleanup.push(()=>root.document?.removeEventListener('visibilitychange',visibility));
  const pagehide=()=>close('pagehide');root.addEventListener?.('pagehide',pagehide);cleanup.push(()=>root.removeEventListener?.('pagehide',pagehide));
  const wrapper=read(()=>node.videoContainer.getElement());
  if(wrapper&&typeof root.MutationObserver==='function'){
   const observer=new root.MutationObserver(()=>{if(closed||mutationQueued)return;mutationQueued=true;later(()=>{mutationQueued=false;discover();emit('surface:mutation');});});
   observer.observe(wrapper,{subtree:true,childList:true,attributes:true,attributeFilter:['style','class','hidden','src']});cleanup.push(()=>observer.disconnect());
  }
  discover();emit('observer:attached');return probe;
 }
 return {attach,core:(creative,event)=>{try{byCreative.get(creative)?.record('core:'+event);}catch{}},
  node:(node,event)=>{try{byNode.get(node)?.record('node:'+event);}catch{}},
  close:(creative,reason)=>byCreative.get(creative)?.close(reason),
  stop:()=>[...instances].forEach(p=>p.close('manual-stop')),
  export:()=>({schema:'p13c-integration-observe-v1',qaOnly:true,enforce:false,wrappers:false,dropped,activeObservers:instances.size,logs:logs.slice()})};
});
