'use strict';
// Loaded ONLY after the manual environment gate passes in the same process.
// Uses approved scripts via normal external classic script tags + SRI. CDP
// functions below are external inspection/test stimuli, never a script loader,
// eval/Function/blob/data/DOM-injected fallback or source-attestation binding.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const L=require('./lib.cjs'),{blank}=require('./cdp.cjs');
const fail=message=>{throw Object.assign(new Error(message),{verdict:'FAIL'});};
function check(condition,message){if(!condition)fail(message);}
async function serve(out){let mode='positive',index=0;const requests=[],sockets=new Set();
 const server=http.createServer((req,res)=>{const host='127.0.0.1:'+server.address().port;const item={id:++index,at:new Date().toISOString(),method:req.method,url:req.url,host:req.headers.host,mode};requests.push(item);
  if(req.method!=='GET'||req.headers.host!==host){item.denied=true;res.writeHead(403);res.end();return;}
  let data;try{data=L.route(L.ROOT,req.url,mode);}catch(e){item.error=e.message;item.denied=true;res.writeHead(409);res.end();return;}if(!data){item.denied=true;res.writeHead(404);res.end();return;}
  item.response={status:200,headers:{'Content-Type':data.mime,'Content-Length':String(data.body.length),'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'},sha256:data.sha256,originalSha256:data.originalSha256,tampered:data.tampered,bodyFile:'responses/server-'+item.id+'.body'};
  L.write(out,item.response.bodyFile,data.body);res.writeHead(200,item.response.headers);res.end(data.body);
 });server.on('connection',s=>{sockets.add(s);s.on('close',()=>sockets.delete(s));});
 await new Promise((r,j)=>{server.once('error',j);server.listen(0,'127.0.0.1',r);});return {origin:'http://127.0.0.1:'+server.address().port,requests,setMode:m=>{mode=m;},async close(){for(const s of sockets)s.destroy();await new Promise(r=>server.close(r));L.write(out,'server-requests.json',requests);}};
}
async function inspect(cdp,sid,context,fn,args=[]){const r=await cdp.send('Runtime.callFunctionOn',{executionContextId:context.id,functionDeclaration:fn.toString(),arguments:args.map(value=>({value})),returnByValue:true,awaitPromise:true},sid);if(r.exceptionDetails)throw new Error('external-driver-exception:'+JSON.stringify(r.exceptionDetails));return r.result.value;}
function pageState(){return {url:location.href,origin:location.origin,readyState:document.readyState,csp:document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.content??null,
 scripts:Array.from(document.scripts,s=>({src:s.src,integrity:s.integrity,crossOrigin:s.crossOrigin,type:s.type})),canary:window.__qa1bSriCanary??null,
 classes:window.__qa1bIsolatedClasses?Object.fromEntries(Object.entries(window.__qa1bIsolatedClasses).map(([k,v])=>[k,Object.keys(v)])):null,
 admins:Object.getOwnPropertyNames(window).filter(x=>x.startsWith('__qa1bAdmin_')),publicIngress:['ingest','activate','mint','bind'].filter(x=>Object.hasOwn(window,x)),SDKGlobals:['googletag','pbjs','apstag','videojs'].filter(x=>typeof window[x]!=='undefined')};}
async function sourceProbe(probe){try{await fetch(probe);return {blocked:false};}catch(e){return {blocked:true,error:e.name};}}
async function inactive(distribution){const kinds={GAM:'_gam_kv_.js',Manager:'IntextManager.js'},M=window.__qa1bIsolatedClasses[distribution].IntextManager,name='__qa1bAdmin_'+kinds[distribution].replace(/[^a-z0-9]/gi,'_'),errors=[];
 // Intentionally stop the extracted constructor at the first missing commercial
 // helper (getSiteContext). QA binding precedes it. No SDK/bootstrap stubs,
 // prototypes, page globals or producer authority are installed or changed.
 function construct(config){try{new M(config,{});}catch(e){errors.push({name:e.name,message:e.message});}}
 construct({});const admin=window[name];if(!admin)return {error:'admin-not-created',errors};const initial=admin.status(),keys=Object.keys(admin).sort();
 construct(JSON.parse('{"verified":true,"sourceAttestor":"accredited","sourceComplete":{"D0":true},"identity":{"verified":true,"documentLocalId":"fake"},"ownership":{"verified":true},"hash":"declared","alias":"a1"}'));
 const afterJSON=admin.status(),exported=admin.exportManual(),envelope=exported.status==='ok'?JSON.parse(exported.json):null;
 let unrelated=0;const callback=Promise.resolve().then(()=>{unrelated++;});admin.stop();await callback;const stopped=admin.status();admin.dispose();const disposed=admin.status();construct({verified:true});
 return {keys,initial,afterJSON,exported:{status:exported.status,bytes:exported.bytes,envelope},stopped,disposed,unrelated,adminAfterNewManager:Object.hasOwn(window,name),errors,
  note:'Controlled early constructor TypeError is an explicit synthetic path, not normal full commercial Manager execution. JSON is data, never a capability.'};}
function gateG2(r){check(!r.error,'G2-admin');check(JSON.stringify(r.keys)===JSON.stringify(['dispose','exportManual','status','stop']),'G2-admin-surface');
 for(const s of [r.initial,r.afterJSON]){check(s.phase==='INACTIVE'&&s.sourceAttestation==='pending'&&s.evidenceKind==='UNBOUND-BROWSER','G2-not-unbound-inactive');check(['D0','Dv','Dc','outcomes'].every(k=>s.sourceComplete[k]===false),'G2-coverage');check(s.sequence===0&&s.counts.received===0&&s.counts.accepted===0,'G2-admission');}
 const e=r.exported.envelope;check(r.exported.status==='ok'&&e?.qa0===null&&e.entries.length===0&&e.sourceComplete===false,'G2-fictitious-ledger');check(r.stopped.phase==='STOPPED'&&r.disposed.phase==='DISPOSED'&&!r.adminAfterNewManager,'G2-tombstone');check(r.unrelated===1,'G2-unrelated-callback-cancelled');
 check(r.errors.length===3&&r.errors.every(x=>x.name==='TypeError'&&x.message.includes('getSiteContext')),'G2-unexpected-constructor-path');return true;}
async function one(cdp,server,out,mode,distribution){server.setMode(mode);const start=cdp.events.length,reqStart=server.requests.length,doc=await blank(cdp),sid=doc.sessionId,events=[],errors=[],paused=[];let unexpected=null;
 const allow=new Set(L.ALLOWED.map(x=>server.origin+x)),probe=server.origin+'/__csp_probe';
 const off=cdp.on(e=>{if(e.sessionId!==sid)return;events.push(e);if(e.method==='Fetch.requestPaused'){paused.push(e.params.request.url);const good=allow.has(e.params.request.url)&&e.params.request.method==='GET';if(!good&&e.params.request.url!==probe)unexpected=e.params.request.url;
   cdp.send(good?'Fetch.continueRequest':'Fetch.failRequest',{requestId:e.params.requestId,...(good?{}:{errorReason:'BlockedByClient'})},sid).catch(x=>errors.push(x.message));}
 });
 let result;
 try{for(const method of ['Network.enable','Log.enable','Runtime.enable','Page.enable','Profiler.enable'])await cdp.send(method,{},sid);
  await cdp.send('Network.setCacheDisabled',{cacheDisabled:true},sid);await cdp.send('Network.setBypassServiceWorker',{bypass:true},sid);await cdp.send('Page.setLifecycleEventsEnabled',{enabled:true},sid);
  await cdp.send('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]},sid);await cdp.send('Profiler.startPreciseCoverage',{callCount:true,detailed:true},sid);
  const nav=await cdp.send('Page.navigate',{url:server.origin+L.ALLOWED[0]},sid);if(nav.errorText)throw new Error('navigation:'+nav.errorText);
  await cdp.wait('Page.lifecycleEvent',sid,p=>p.name==='load'&&p.loaderId===nav.loaderId);
  const ctx=(await cdp.wait('Runtime.executionContextCreated',sid,p=>p.context.auxData?.isDefault&&p.context.auxData.frameId===nav.frameId&&p.context.origin===server.origin)).context;
  const state=await inspect(cdp,sid,ctx,pageState),coverage=await cdp.send('Profiler.takePreciseCoverage',{},sid);await cdp.send('Profiler.stopPreciseCoverage',{},sid);
  const responses=[];
  for(const url of allow){const response=events.find(x=>x.method==='Network.responseReceived'&&x.params.response.url===url)?.params;if(!response)throw new Error('response-unavailable:'+url);
   const end=await cdp.waitFor(e=>e.sessionId===sid&&['Network.loadingFinished','Network.loadingFailed'].includes(e.method)&&e.params.requestId===response.requestId);
   let body=null,bodyError=null;try{const raw=await cdp.send('Network.getResponseBody',{requestId:response.requestId},sid);body=raw.base64Encoded?Buffer.from(raw.body,'base64'):Buffer.from(raw.body,'utf8');}catch(e){bodyError=e.message;}
   const served=server.requests.slice(reqStart).find(x=>server.origin+x.url===url&&x.response)?.response;const file='responses/chrome-'+mode+'-'+distribution+'-'+responses.length+'.body';if(body)L.write(out,file,body);
   responses.push({requestId:response.requestId,response:response.response,completion:end,served,bodyFile:body?file:null,bodySha256:body?L.hash(body):null,bodyBytes:body?.length??null,bodyError});
  }
  const expectedCanary='sha256-'+Buffer.from(L.PINS[L.ALLOWED[1].slice(1)],'hex').toString('base64'),expectedFixture='sha256-'+Buffer.from(L.PINS[L.ALLOWED[2].slice(1)],'hex').toString('base64');
  check(state.scripts.length===2&&state.scripts[0].src===server.origin+L.ALLOWED[1]&&state.scripts[1].src===server.origin+L.ALLOWED[2]&&state.scripts.every(s=>s.crossOrigin==='anonymous'&&s.type===''),'G1-script-chain');check(state.scripts[0].integrity===expectedCanary&&state.scripts[1].integrity===expectedFixture,'G1-applied-integrity-attributes');
  check(state.admins.length===0&&state.publicIngress.length===0&&state.SDKGlobals.length===0,'G1-auto-construction-or-public-ingress');
  const rootCount=coverage.result.filter(x=>x.url===server.origin+L.ALLOWED[1]).flatMap(x=>x.functions.filter(f=>f.ranges[0]?.startOffset===0).map(f=>f.ranges[0].count));
  const canaryRejected=mode==='canary-negative',fixtureRejected=mode==='fixture-negative';
  check(canaryRejected?state.canary===null&&rootCount.every(n=>n===0):state.canary?.executions===1&&rootCount.length===1&&rootCount[0]===1,'G1-canary-execution-proof');
  check(fixtureRejected?state.classes===null:!!state.classes?.GAM&&!!state.classes?.Manager,'G1-synthetic-class-availability');
  for(const x of responses){const isHTML=x.response.url.endsWith('.html');check(x.response.status===200&&x.response.mimeType===(isHTML?'text/html':'application/javascript')&&!x.response.fromDiskCache&&!x.response.fromServiceWorker&&!x.response.fromPrefetchCache,'G1-status-MIME-cache-or-SW');
   if(!x.served?.tampered){if(!x.bodySha256)throw new Error('same-load-body-not-available');check(x.bodySha256===x.served.sha256&&x.bodySha256===x.served.originalSha256,'G1-loaded-body-mismatch');}
   else{const digest=Buffer.from(x.served.sha256,'hex').toString('base64');const sriError=events.filter(e=>e.method==='Log.entryAdded').some(e=>e.params.entry.text.includes(digest)&&/integrity|digest/i.test(e.params.entry.text));check(sriError,'G1-no-browser-computed-SRI-rejection');if(x.bodySha256)check(x.bodySha256===x.served.sha256,'G1-negative-same-load-body');}
  }
  check(!events.some(e=>e.method==='Network.requestWillBeSent'&&e.params.redirectResponse),'G1-redirect-not-allowed');
  for(const url of allow)check(events.filter(e=>e.method==='Network.requestWillBeSent'&&e.params.request.url===url).length===1&&server.requests.slice(reqStart).filter(x=>server.origin+x.url===url).length===1,'G1-duplicate-request-no-second-fetch');
  const csp=await inspect(cdp,sid,ctx,sourceProbe,[probe]);await cdp.waitFor(e=>e.sessionId===sid&&e.method==='Log.entryAdded'&&e.params.entry.text.includes(probe)&&/connect-src/.test(e.params.entry.text));const cspError=true;
  check(state.csp==="default-src 'none'; script-src 'self'; connect-src 'none'; img-src 'none'; style-src 'none'; frame-src 'none'"&&csp.blocked&&cspError&&!paused.includes(probe)&&!server.requests.slice(reqStart).some(x=>x.url==='/__csp_probe'),'G1-effective-CSP-not-accredited');
  if(unexpected||errors.length)fail('unexpected-page-network-or-interception-error:'+JSON.stringify({unexpected,errors}));
  let g2=null;if(mode==='positive'){g2=await inspect(cdp,sid,ctx,inactive,[distribution]);gateG2(g2);}
  result={mode,distribution,status:'PASS-ISOLATED-COMPONENTS',context:{...doc,navigation:nav,executionContext:ctx},state,coverage,canaryRootExecutionCounts:rootCount,responses,csp,g2,networkRequests:events.filter(e=>e.method==='Network.requestWillBeSent').map(e=>e.params),scope:'No active authority, E, O/N/E parity or performance acceptance'};
  return result;
 }finally{try{await cdp.send('Target.disposeBrowserContext',{browserContextId:doc.browserContextId});}finally{off();const denied=server.requests.slice(reqStart).some(x=>x.denied);if(result&&(unexpected||errors.length||denied)){result.status='FAIL';result.reason='late-or-denied-network';}L.write(out,'case-'+mode+'-'+distribution+'.json',{result:result??null,events,unexpected,errors,serverRequests:server.requests.slice(reqStart),partial:!result});if(unexpected||errors.length||denied)fail('late-or-denied-network-during-case');}}
}
async function g1g2(cdp,out){const server=await serve(out),results=[];try{for(const [mode,d]of [['positive','GAM'],['fixture-negative','GAM'],['canary-negative','GAM'],['positive','Manager']])results.push(await one(cdp,server,out,mode,d));
 return {status:'PASS-C-ISOLATED-LIMITED',runs:results,source:'UNBOUND',E:'BLOCKED',O:'NOT-RUN',N:'isolated-unbound-only',performance:'NOT-MEASURED',noCommercialCopiesExecuted:true};
 }finally{await server.close();}}
module.exports={g1g2,serve,one,inspect,pageState,inactive,gateG2};
