/* QA ONLY. Never loaded by the production bundles. No SDK/global playback patches. */
(function(scope) {
  const safe=(fn,fallback=null)=>{try{return fn()??fallback;}catch{return fallback;}};
  function errorInfo(error,depth=0) {
    if(!error) return null;
    return {name:error.name??null,message:safe(()=>error.getMessage?.()??error.message??String(error)),
      code:safe(()=>error.getErrorCode?.()),type:safe(()=>error.getType?.()),vastCode:safe(()=>error.getVastErrorCode?.()),
      stack:error.stack??null,inner:depth<2?errorInfo(safe(()=>error.getInnerError?.()),depth+1):null};
  }
  // QA classification only. Never write the core's device/configuration authorities.
  function resolveDevice(node,environment=scope) {
    const classify=value=>{if(Array.isArray(value)&&value.length===1)value=value[0];
      return typeof value==='string'?({mobile:'mobile',desktop:'desktop',web:'desktop'}[value.trim().toLowerCase()]??null):null;};
    const scoped=node?.scopedContext;
    const tiers=[['scopedContext',scoped],['scopedContext.targeting',scoped?.targeting],
      ['ueDataLayer',environment.ueDataLayer],['utag_data',environment.utag_data]];
    for(const [source,data]of tiers) {
      const signals=['device','device_category','be_page_site_version'].map(key=>({source:source+'.'+key,value:classify(data?.[key])})).filter(signal=>signal.value);
      if(signals.length) {
        if(new Set(signals.map(signal=>signal.value)).size>1)return {deviceEffective:'unknown',deviceSource:source+'.conflict'};
        return {deviceEffective:signals[0].value,deviceSource:signals[0].source};
      }
    }
    const mobile=safe(()=>node.manager.gexp.isMobileDevice());
    return {deviceEffective:typeof mobile==='boolean'?(mobile?'mobile':'desktop'):'unknown',
      deviceSource:typeof mobile==='boolean'?'gexp.isMobileDevice':'missing'};
  }
  function budget({config={},now=()=>performance.now(),setTimer=setTimeout,clearTimer=clearTimeout,
    live=()=>true,canCancel=()=>false,cancel=()=>{},record=()=>{}}={}) {
    const mode=config.mode??'observe';
    if(!['observe','shadow','enforce'].includes(mode)) throw Error('Unknown QA budget mode');
    for(const key of ['totalMs','managerMs']) if(config[key]!=null && (!Number.isFinite(config[key])||config[key]<=0)) throw Error('Invalid QA '+key);
    const timers=new Map(),milestones={};let finished=false,frame=false,started=false,impression=false,cancelled=false;
    const policy=()=>({mode,qaConfirmed:config.qaConfirmed===true,mobileBudgetActive:config.mobile===true,
      deviceEffective:config.deviceEffective??'unknown',deviceSource:config.deviceSource??'missing',budgetArmed:timers.size>0});
    const clear=()=>{for(const id of timers.values())clearTimer(id);timers.clear();};
    const drop=key=>{if(timers.has(key)){clearTimer(timers.get(key));timers.delete(key);}};
    const expire=(reason,scheduledAt,delay)=>{
      if(!live()){finished=true;clear();return;}if(finished||frame){clear();return;}
      const actualElapsedMs=now()-scheduledAt;
      const authorization=canCancel(),conditions=typeof authorization==='object'&&authorization!==null?authorization:{ownershipProven:authorization===true};
      const cancelBlockedReason=mode!=='enforce'?'mode-'+mode:config.mobile!==true?'mobile-budget-inactive':config.qaConfirmed!==true?'qa-not-confirmed':
        started?'playback-started':impression?'impression-observed':Object.keys(conditions).find(key=>conditions[key]!==true)??null;
      record('qa_budget_expired',{...policy(),budgetArmed:reason!=='anchor-passed'||timers.size>0,reason,deadlineAt:scheduledAt+delay,expiration:now(),cancelBlockedReason,cancelConditions:conditions,actualElapsedMs,timerDriftMs:actualElapsedMs-delay,
        clockSource:milestones.clockSource??null,startedObserved:started,impressionObserved:impression});
      if(cancelBlockedReason) {record('qa_budget_cancel_blocked',{...policy(),reason,cancelBlockedReason,cancelConditions:conditions});return;}
      if(cancelled)return;cancelled=true;finished=true;clear();
      record('qa_budget_cancelled',{...policy(),reason,cancelBlockedReason:null,cancelConditions:conditions});cancel(reason);
    };
    const arm=(key,at,delay)=>{
      if(mode==='observe'||config.mobile!==true||!delay) {
        record('qa_budget_not_armed',{...policy(),reason:key,deadlineAt:null,expiration:null,
          cancelBlockedReason:mode==='observe'?'mode-observe':config.mobile!==true?'mobile-budget-inactive':'deadline-not-configured'});return;
      }
      timers.set(key,setTimer(()=>{timers.delete(key);expire(key,at,delay);},Math.max(0,at+delay-now())));
      record('qa_budget_armed',{...policy(),reason:key,deadlineAt:at+delay,expiration:null,cancelBlockedReason:null});
    };
    return {note(event,data={}) {
      if(!live()){finished=true;clear();return;}if(finished){clear();return;}
      const first=milestones[event]==null;milestones[event]??=now();
      if(event==='ads-request'&&milestones.clockSource==null) {
        milestones.clockSource=data.clockSource??'plugin-ads-request-proxy-NOT-HTTP';arm('request-to-frame',milestones[event],config.totalMs);
      }
      if(event==='ads-manager'&&first&&milestones.readyforpreroll==null)arm('manager-to-preroll',milestones[event],config.managerMs);
      if(event==='readyforpreroll')drop('manager-to-preroll');
      if(event==='adstart'||event==='native-STARTED')started=true;
      if(event==='native-IMPRESSION')impression=true;
      if(event==='first-frame'){frame=true;clear();}
      if(['error','complete','skipped','destroy','abort'].includes(event)){finished=true;clear();}
    },checkPassed(passed) {
      if(passed===true&&config.cancelPassed===true)expire('anchor-passed',now(),0);
    },dispose(){finished=true;clear();},state:()=>({milestones:{...milestones},frame,started,impression,cancelled,pendingTimers:timers.size})};
  }
  const attached=new WeakMap(),entries=[],controllers=new Set(),displayCleanups=new Set();let globalErrorCleanup=null,droppedEntries=0;
  const boundedPush=entry=>{entries.push(entry);if(entries.length>2000){entries.shift();droppedEntries++;}};
  function captureErrors() {
    if(globalErrorCleanup||!scope.addEventListener)return;
    const handler=event=>{
      const entry={event:event.type==='unhandledrejection'?'qa_unhandled_rejection':'qa_global_error',qaOnly:true,timestamp:Date.now(),slotId:null,cycleId:null,renderToken:null,
        message:event.message??null,filename:event.filename??null,line:event.lineno??null,column:event.colno??null,error:errorInfo(event.error??event.reason),
        attribution:'unknown-global-SDK-error',contexts:[...controllers].map(controller=>controller.identity)};
      boundedPush(entry);if(scope.__INTEXT_P13C_QA__?.console!==false)safe(()=>console.debug('[IntextP13C QA]',entry));
    };
    scope.addEventListener('error',handler);scope.addEventListener('unhandledrejection',handler);
    globalErrorCleanup=()=>{scope.removeEventListener('error',handler);scope.removeEventListener('unhandledrejection',handler);globalErrorCleanup=null;};
  }
  function attach(creative,config={}) {
    if(!config.enabled)return null;
    if(attached.has(creative))return attached.get(creative);
    const node=creative.node,token=creative._renderToken,cycle=node?._intextTelemetryCycleId??null,cleanup=[];
    let player=null,manager=null,closed=false,armed=false,coverage=false,managerEpoch=0,managerAmbiguous=false,managerCleanup=[],pluginCleanup=[],loaderCleanup=[];
    const managerIds=new WeakMap();let nextManagerId=0;
    const managerId=value=>value&&(typeof value==='object'||typeof value==='function')?(managerIds.has(value)?managerIds.get(value):(managerIds.set(value,++nextManagerId),nextManagerId)):null;
    const currentManager=()=>safe(()=>player.ima.getAdsManager());
    const device=resolveDevice(node);
    const adsSnapshot=()=>({adsState:safe(()=>player?.ads?.state),
      adsFsmState:safe(()=>player?.ads?._state?.name??player?.ads?._state?.constructor?.name),
      isInAdMode:safe(()=>player?.ads?.isInAdMode?.())});
    if(config.captureErrors===true)captureErrors();
    const live=()=>!closed&&!creative._aborted&&!creative._destroyed&&safe(()=>node.isActiveRenderToken(token),false);
    const rect=element=>safe(()=>{const r=element.getBoundingClientRect();return Object.fromEntries(['top','left','bottom','right','width','height'].map(k=>[k,r[k]]));});
    const snapshot=()=>({anchorRect:rect(node?.getIntextTelemetryElement?.()),wrapperRect:rect(creative.container?.getElement?.()),
      playerRect:rect(player?.el?.()),imaContainerRect:rect(safe(()=>player.el().querySelector('.ima-ad-container, .vjs-ima-ad-container'))),
      readiness:safe(()=>node.getReadinessViewportState()),documentVisibility:scope.document?.visibilityState??null,
      ...adsSnapshot(),snapshotPresent:player?.ads?.snapshot!=null,
      pausedForEligibility:creative._pausedForEligibility===true,playerDisposed:safe(()=>player.isDisposed?.()),
      media:safe(()=>{const m=creative._adMediaEl??creative.videoEl;return m?{currentTime:m.currentTime,readyState:m.readyState,
        networkState:m.networkState,paused:m.paused,ended:m.ended,videoWidth:m.videoWidth,videoHeight:m.videoHeight,error:errorInfo(m.error),currentSrc:m.currentSrc?.startsWith('data:')?'data:dummy':m.currentSrc??null}:null;})});
    const record=(event,data={})=>{
      const started=performance.now();
      const entry={event,qaOnly:true,timestamp:Date.now(),monotonicMs:started,slotId:node?.id??null,cycleId:cycle,renderToken:token,
        ...device,mode:config.mode??'observe',qaConfirmed:config.qaConfirmed===true,
        impressionTypeAvailable:!!scope.google?.ima?.AdEvent?.Type?.IMPRESSION,managerId:managerId(manager),managerEpoch,
        impressionSubscribed:coverage,managerOwnershipAmbiguous:managerAmbiguous,...data,snapshot:safe(snapshot,{unavailable:true})};
      entry.observerBuildMs=performance.now()-started;
      boundedPush(entry);safe(()=>config.record?.(entry));
      if(config.console!==false)safe(()=>console.debug('[IntextP13C QA]',entry));
    };
    const mobileBudgetActive=config.mobile===true&&device.deviceEffective==='mobile';
    const clock=budget({config:{...config,...device,mobile:mobileBudgetActive},live,record,canCancel:()=>({
      deviceMobile:resolveDevice(node).deviceEffective==='mobile',listenerInstalledBeforeIma:armed,
      managerPresent:manager!=null,managerIdentityCurrent:manager!=null&&currentManager()===manager,
      impressionSubscribed:coverage,managerOwnershipUnambiguous:!managerAmbiguous,
      settlementAvailable:typeof creative._settle==='function',notRevealed:!creative._playerRevealed,
      outsideAdMode:safe(()=>player.ads.isInAdMode())===false,noMediaProgress:!(creative._adMediaEl?.currentTime>0)}),
      cancel:reason=>{creative._aborted=true;try{creative._settle('reject',new Error('p13c_qa_'+reason));}finally{creative.destroy();}}});
    const listen=(target,event,handler,native=false,removers=cleanup)=>{
      if(!target||!event)return false;
      const add=native?'addEventListener':'on',remove=native?'removeEventListener':'off';
      if(typeof target[add]!=='function'||typeof target[remove]!=='function')return false;
      try{target[add](event,handler);removers.push(()=>target[remove](event,handler));return true;}
      catch(error){safe(()=>target[remove](event,handler));record('qa_listener_failed',{eventType:event,error:errorInfo(error)});return false;}
    };
    const note=(event,data={})=>{if(!live())return;record(event,data);clock.note(event,data);};
    const wrap=(target,name,observe,removers)=>{
      const original=target[name],descriptor=Object.getOwnPropertyDescriptor(target,name);if(typeof original!=='function')return;
      const wrapper=function(...args){safe(()=>observe(args));return original.apply(this,args);};
      safe(()=>{target[name]=wrapper;});removers.push(()=>{if(target[name]!==wrapper)return;
        if(descriptor)Object.defineProperty(target,name,descriptor);else delete target[name];});
    };
    const unbindManager=()=>{coverage=false;for(const remove of [...managerCleanup.splice(0),...pluginCleanup.splice(0),...loaderCleanup.splice(0)].reverse())safe(remove);};
    const bindManager=value=>{
      if(!live())return;
      if(value&&currentManager()!==value){managerAmbiguous=true;record('qa_manager_identity_mismatch',{eventManagerId:managerId(value)});return;}
      if(manager===value&&value)return;
      if(manager){managerAmbiguous=true;record('qa_manager_replaced',{previousManagerId:managerId(manager),nextManagerId:managerId(value)});}
      unbindManager();manager=value??null;const epoch=++managerEpoch,ima=scope.google?.ima;
      if(!value){record('qa_manager_identity_unavailable');return;}
      const owned=()=>{
        if(!live()||manager!==value||managerEpoch!==epoch)return false;
        if(currentManager()===value)return true;
        managerAmbiguous=true;managerEpoch++;unbindManager();record('qa_manager_identity_changed_without_event');return false;
      };
      for(const key of ['LOADED','STARTED','IMPRESSION','PAUSED','RESUMED','COMPLETE','SKIPPED','ALL_ADS_COMPLETED']) {
        const subscribed=listen(value,ima?.AdEvent?.Type?.[key],()=>{if(!owned())return;note('native-'+key);if(key==='COMPLETE'||key==='SKIPPED')clock.note(key.toLowerCase());},true,managerCleanup);
        if(key==='IMPRESSION')coverage=subscribed;
      }
      listen(value,ima?.AdErrorEvent?.Type?.AD_ERROR,event=>{if(!owned())return;note('ima-error',{error:errorInfo(safe(()=>event.getError()))});clock.note('error');},true,managerCleanup);
      record('qa_manager_subscription',{managerIdentityCurrent:currentManager()===value});
      // These instance wrappers are interventions, not strictly passive observation.
      // Preserve receiver, return value, synchronous throws and Promise identity.
      for(const name of ['init','start','pause','resume']) {
        wrap(value,name,()=>{if(owned())note('manager-api',{api:name,stack:new Error('QA callsite').stack});},managerCleanup);
      }
    };
    const controller={identity:{slotId:node?.id??null,cycleId:cycle,renderToken:token},record,afterIma() {
      note('ima-init-returned');
      const type=scope.google?.ima?.AdErrorEvent?.Type?.AD_ERROR;
      if(type&&typeof player?.ima?.addEventListener==='function') {
        const boundManager=currentManager(),epoch=managerEpoch,plugin=player.ima;
        if(!boundManager||boundManager!==manager||typeof plugin.removeEventListener!=='function') {
          record('qa_plugin_error_listener_unavailable',{reason:'manager-ownership-or-removal-unproven'});return;
        }
        const handler=event=>{const target=event?.target;if(!live()||!manager||manager!==boundManager||epoch!==managerEpoch||currentManager()!==manager||(target&&target!==manager))return;
          note('ima-plugin-error',{error:errorInfo(safe(()=>event.getError()))});clock.note('error');};
        try{plugin.addEventListener(type,handler);pluginCleanup.push(()=>plugin.removeEventListener?.(type,handler));}
        catch(error){safe(()=>plugin.removeEventListener(type,handler));record('qa_plugin_error_listener_unavailable',{error:errorInfo(error)});}
      }
    },noteCore(event,data={}) {
      if(event==='first-frame')note('first-frame',{source:data.source??null});
      else if(event==='revealed')note('revealed',{source:data.source??null});
      else if(['error','timeout','complete','skipped'].includes(event)){note('core-'+event,data);clock.note(event==='timeout'?'error':event);}
    },attachPlayer(value,{beforeIma=false}={}) {
      if(player||!value)return;player=value;armed=beforeIma;
      note('player-created');
      for(const event of ['loadstart','play','playing','pause','ads-request','adsready','readyforpreroll','adstart','ads-load','adplaying','adtimeout','nopreroll','adserror','adend','alladscompleted','contentchanged','contentresumed']) {
        listen(value,event,eventObject=>{note(event,{observationPhase:'listener',error:event==='adserror'?errorInfo(eventObject?.data?.AdError??eventObject?.error??null):null});
          if(['loadstart','play','adsready','readyforpreroll'].includes(event))Promise.resolve().then(()=>note(event+'-after-dispatch',{observationPhase:'microtask'}));
          if(['adserror','adtimeout','adend','alladscompleted'].includes(event))clock.note(event==='adend'||event==='alladscompleted'?'complete':'error');});
      }
      listen(value,'ads-manager',event=>{bindManager(event?.adsManager??safe(()=>value.ima.getAdsManager?.()));note('ads-manager');});
      listen(value,'ads-loader',event=>{
        if(!live())return;
        for(const remove of loaderCleanup.splice(0).reverse())safe(remove);
        note('ads-loader');const loader=event?.adsLoader,type=scope.google?.ima?.AdErrorEvent?.Type?.AD_ERROR;
        const epoch=managerEpoch;
        listen(loader,type,errorEvent=>{if(!live()||managerEpoch!==epoch)return;
          note('ima-loader-error',{error:errorInfo(safe(()=>errorEvent.getError()))});clock.note('error');},true,loaderCleanup);
      });
      for(const name of ['play','pause','src']) {
        wrap(value,name,args=>{if(name!=='src'||args.length)note('player-api',{api:name,stack:new Error('QA callsite').stack});},cleanup);
      }
      listen(value,'dispose',()=>controller.dispose());
    },dispose(){if(closed)return;record('qa_probe_disposed');closed=true;clock.dispose();unbindManager();for(const remove of cleanup.splice(0).reverse())safe(remove);controllers.delete(controller);},
      state:()=>({...clock.state(),...device,mode:config.mode??'observe',qaConfirmed:config.qaConfirmed===true,
        budgetArmed:clock.state().pendingTimers>0,managerId:managerId(manager),managerEpoch,impressionSubscribed:coverage,managerOwnershipAmbiguous:managerAmbiguous})};
    const surface=creative.container?.getElement?.();
    for(const event of ['loadstart','loadedmetadata','abort','error','emptied']) {
      const handler=e=>note('native-media-'+event,{mediaIdentity:e.target===creative.videoEl?'base':e.target===creative._adMediaEl?'ad':'other',error:errorInfo(e.target?.error)});
      surface?.addEventListener?.(event,handler,true);cleanup.push(()=>surface?.removeEventListener?.(event,handler,true));
    }
    const check=()=>{
      if(!live()){controller.dispose();return;}
      const r=rect(node?.getIntextTelemetryElement?.());clock.checkPassed(r&&r.width>0&&r.height>0&&r.bottom<=0);
    };
    if(config.cancelPassed){scope.addEventListener?.('scroll',check,{passive:true});cleanup.push(()=>scope.removeEventListener?.('scroll',check));}
    wrap(creative,'destroy',()=>controller.dispose(),cleanup);
    controllers.add(controller);attached.set(creative,controller);creative._p13cProbe=controller;
    note('qa_probe_attached',{mobileBudgetActive});return controller;
  }
  const emitNode=(node,event,data={})=>{
    if(!scope.__INTEXT_P13C_QA__?.enabled)return;
    const entry={event,qaOnly:true,timestamp:Date.now(),slotId:node.id,cycleId:node._intextTelemetryCycleId??null,renderToken:node._activeRenderToken??null,...data};
    boundedPush(entry);if(scope.__INTEXT_P13C_QA__?.console!==false)safe(()=>console.debug('[IntextP13C QA]',entry));
  };
  function prebidSnapshot(node,pb,configuration,auctionId,responses,stage) {
    if(!scope.__INTEXT_P13C_QA__?.enabled)return;
    const hb=value=>Object.fromEntries(Object.entries(value??{}).filter(([key])=>key.startsWith('hb_')));
    const slot=node.slot,native=slot?.__ctrl?.innerObject??null;
    emitNode(node,'qa_prebid_targeting_snapshot',{stage,auctionId,adUnitCode:configuration.code,
      slotExists:!!slot,slotElementId:safe(()=>slot.getSlotElementId()),nativeProxySameObject:native?native===slot:null,
      pbjsTargeting:safe(()=>pb.getAdserverTargetingForAdUnitCode(configuration.code)),
      slotTargeting:safe(()=>hb(slot.getTargetingMap())),nativeTargeting:native?safe(()=>hb(native.getTargetingMap())):null,
      bids:responses.map(bid=>({auctionId:bid.auctionId??null,adUnitCode:bid.adUnitCode??null,mediaType:bid.mediaType??null,
        bidder:bid.bidderCode??bid.bidder??null,adId:bid.adId??null,rawCpm:bid.cpm??null,adserverTargeting:hb(bid.adserverTargeting)}))});
  }
  function markFallback(node,parentRenderToken) {
    const candidates=entries.filter(entry=>entry.slotId===node.id&&entry.renderToken===parentRenderToken);
    const cycles=[...new Set(candidates.map(entry=>entry.cycleId).filter(value=>value!=null))];
    emitNode(node,'qa_fallback_bridge',{parentRenderToken,parentCycleId:cycles.length===1?cycles[0]:null});
  }
  const visibleObservers=new WeakMap();
  function markDisplayOpened(node) {
    if(!scope.__INTEXT_P13C_QA__?.enabled)return;
    visibleObservers.get(node)?.();
    const element=node.container?.getElement?.(),token=node._activeRenderToken,removers=[];let done=false,raf=null,timer=null;
    const stop=()=>{if(done)return;done=true;for(const fn of removers)fn();if(timer!=null)clearTimeout(timer);if(raf!=null)scope.cancelAnimationFrame?.(raf);visibleObservers.delete(node);displayCleanups.delete(stop);};
    const check=()=>{
      if(!node.isActiveRenderToken(token)){stop();return;}
      const r=safe(()=>element.getBoundingClientRect()),readiness=safe(()=>node.getReadinessViewportState());
      let cssVisible=true;for(let el=element,depth=0;el&&depth<12;el=el.parentElement,depth++) {
        const css=safe(()=>scope.getComputedStyle(el));if(css&&(css.display==='none'||css.visibility==='hidden'||Number(css.opacity)===0))cssVisible=false;
      }
      const overlap=!!r&&r.width>0&&r.height>0&&r.bottom>0&&r.top<scope.innerHeight&&r.right>0&&r.left<scope.innerWidth;
      const visible=cssVisible&&overlap&&scope.document.visibilityState==='visible';
      emitNode(node,'qa_display_dom_visibility',{visibleDomProxy:visible,wrapperRect:r?{top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height}:null,
        readinessEligible:readiness?.eligible??null,source:'DOM-CSS-geometry-NOT-pixel-or-ActiveView'});
      if(visible)stop();
    };
    for(const name of ['transitionend','animationend']){element?.addEventListener?.(name,check);removers.push(()=>element?.removeEventListener?.(name,check));}
    scope.addEventListener?.('scroll',check,{passive:true});removers.push(()=>scope.removeEventListener?.('scroll',check));
    scope.document?.addEventListener?.('visibilitychange',check);removers.push(()=>scope.document?.removeEventListener?.('visibilitychange',check));
    timer=setTimeout(stop,5000);if(scope.requestAnimationFrame)raf=scope.requestAnimationFrame(check);
    displayCleanups.add(stop);visibleObservers.set(node,stop);check();
  }
  const guarded=fn=>(...args)=>{try{return fn(...args);}catch(error){boundedPush({event:'qa_probe_internal_error',qaOnly:true,timestamp:Date.now(),error:errorInfo(error)});return null;}};
  const api={budget,errorInfo,resolveDevice,attach:guarded(attach),entries,prebidSnapshot:guarded(prebidSnapshot),markFallback:guarded(markFallback),markDisplayOpened:guarded(markDisplayOpened),
    stats:()=>({droppedEntries,activeCreatives:controllers.size,displayObservers:displayCleanups.size}),
    dispose(){for(const controller of [...controllers])controller.dispose();for(const stop of [...displayCleanups])stop();globalErrorCleanup?.();}};
  if(typeof module!=='undefined')module.exports=api;else scope.IntextP13C=api;
})(typeof window!=='undefined'?window:globalThis);
