/* Separate QA experiment. Public videojs-ima APIs only. Never imported by production. */
(function(scope){
  const safe=(fn,fallback=null)=>{try{return fn()??fallback;}catch{return fallback;}};
  function attach(creative,environment=scope){
    const player=creative.player,node=creative.node,token=creative._renderToken,cleanup=[];
    let manager=null,epoch=0,closed=false,ambiguous=false,coverage=false,pluginReady=false,nativeReady=false,preroll=false,attempted=false,started=false,impression=false;
    const live=()=>!closed&&!creative._aborted&&!creative._destroyed&&safe(()=>node.isActiveRenderToken(token),false);
    const current=()=>safe(()=>player.ima.getAdsManager());
    const states=()=>({isInAdMode:safe(()=>player.ads.isInAdMode()),isWaitingForAdBreak:safe(()=>player.ads.isWaitingForAdBreak()),
      inAdBreak:safe(()=>player.ads.inAdBreak()),isContentResuming:safe(()=>player.ads.isContentResuming())});
    const record=(event,data={})=>safe(()=>creative._p13cProbe?.record(event,{experiment:'manual-break-public-api',...states(),...data}));
    const listen=(target,event,handler,native=false)=>{const add=native?'addEventListener':'on',remove=native?'removeEventListener':'off';
      if(!event||typeof target?.[add]!=='function'||typeof target?.[remove]!=='function')return false;
      try{target[add](event,handler);cleanup.push(()=>target[remove](event,handler));return true;}catch{return false;}};
    function check(){
      if(!live()||attempted)return;
      const viewport=safe(()=>node.getReadinessViewportState()),state=states();
      const conditions={unambiguous:!ambiguous,coverage,managerCurrent:!!manager&&manager===current(),pluginReady,nativeReady,preroll,
        documentVisible:environment.document?.visibilityState==='visible',eligible:viewport?.eligible===true,
        waiting:state.isWaitingForAdBreak===true,noAdBreak:state.inAdBreak===false,notResuming:state.isContentResuming===false,
        notStarted:!started,notImpressed:!impression,api:typeof player.ima.playAdBreak==='function'};
      if(Object.values(conditions).some(value=>value!==true)){record('qa_manual_start_deferred',{conditions});return;}
      attempted=true;record('qa_manual_start_requested',{conditions});
      try{player.ima.playAdBreak();record('qa_manual_api_returned',{api:'playAdBreak',playbackConfirmed:false});}
      catch(error){record('qa_manual_api_failed',{message:error.message});} // Never retry or synthesize SDK events.
    }
    function dispose(){if(closed)return;record('qa_manual_disposed',{attempted,started,impression,pluginReady,nativeReady,preroll});closed=true;
      for(const remove of cleanup.splice(0).reverse())safe(remove);}
    const types=environment.google?.ima?.AdEvent?.Type;
    if(typeof player?.ima?.setAdBreakReadyListener!=='function'||!types?.AD_BREAK_READY){record('qa_manual_unavailable',{reason:'public-ad-break-api-missing'});throw Error('qa_manual_public_api_missing');}
    listen(player,'ads-manager',event=>{
      if(!live())return;const value=event?.adsManager??current();if(!value||value!==current()){ambiguous=true;record('qa_manual_manager_unproven');return;}
      if(manager===value)return;if(manager)ambiguous=true;manager=value;const ownEpoch=++epoch;
      pluginReady=false;nativeReady=false;const owned=()=>live()&&epoch===ownEpoch&&manager===value&&current()===value;
      coverage=listen(value,types.AD_BREAK_READY,()=>{if(!owned())return;nativeReady=true;record('qa_manual_native_break_ready');check();},true);
      for(const [type,name]of [[types.STARTED,'started'],[types.IMPRESSION,'impression']]){
        const registered=listen(value,type,()=>{if(!owned())return;if(name==='started')started=true;else impression=true;record('qa_manual_'+name,{attempted});},true);
        coverage=coverage&&registered;
      }
      record('qa_manual_manager_loaded',{ambiguous});
    });
    player.ima.setAdBreakReadyListener(()=>{if(!live()||!manager||manager!==current())return;pluginReady=true;record('qa_manual_plugin_break_ready');check();});
    listen(player,'readyforpreroll',()=>{if(!live())return;preroll=true;record('qa_manual_preroll');check();});
    for(const event of ['adend','alladscompleted','adserror','adtimeout','dispose'])listen(player,event,dispose);
    listen(environment.document,'visibilitychange',check,true);listen(environment,'scroll',check,true);listen(environment,'resize',check,true);
    const original=creative.destroy,descriptor=Object.getOwnPropertyDescriptor(creative,'destroy');
    const wrapper=function(...args){dispose();return original.apply(this,args);};creative.destroy=wrapper;
    cleanup.push(()=>{if(creative.destroy!==wrapper)return;if(descriptor)Object.defineProperty(creative,'destroy',descriptor);else delete creative.destroy;});
    record('qa_manual_attached',{autoPlayAdBreaks:false});return {dispose,check,state:()=>({attempted,started,impression,pluginReady,nativeReady,preroll,ambiguous})};
  }
  const api={attach};if(typeof module!=='undefined')module.exports=api;else scope.IntextManualBreakLab=api;
})(typeof window!=='undefined'?window:globalThis);
