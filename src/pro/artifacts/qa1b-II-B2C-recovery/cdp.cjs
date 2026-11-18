'use strict';
// External controller only; no eval/Function, producer binding or page script loader.
const fs=require('node:fs');
class CDP{
 constructor(ws,log){this.ws=ws;this.log=log;this.id=0;this.pending=new Map();this.listeners=new Set();this.events=[];this.closed=false;
  ws.addEventListener('message',e=>{const msg=JSON.parse(e.data);this.emitLog('receive',msg);if(msg.id){const p=this.pending.get(msg.id);if(p){clearTimeout(p.timer);this.pending.delete(msg.id);msg.error?p.reject(new Error(JSON.stringify(msg.error))):p.resolve(msg.result??{});}}else{this.events.push(msg);for(const f of [...this.listeners])f(msg);}});
  ws.addEventListener('close',()=>{this.closed=true;for(const p of this.pending.values()){clearTimeout(p.timer);p.reject(new Error('CDP-closed'));}this.pending.clear();});
 }
 emitLog(direction,data){fs.appendFileSync(this.log,JSON.stringify({at:new Date().toISOString(),direction,data})+'\n');}
 static async connect(url,log){if(!/^ws:\/\/127\.0\.0\.1:\d+\/devtools\/browser\/[a-z0-9-]+$/i.test(url))throw new Error('nonlocal-CDP');const ws=new WebSocket(url);await new Promise((resolve,reject)=>{const t=setTimeout(()=>{ws.close();reject(new Error('CDP-connect-timeout'));},5000);ws.addEventListener('open',()=>{clearTimeout(t);resolve();},{once:true});ws.addEventListener('error',()=>{clearTimeout(t);reject(new Error('CDP-WebSocket-error'));},{once:true});});return new CDP(ws,log);}
 send(method,params={},sessionId){if(this.closed)return Promise.reject(new Error('CDP-closed'));const id=++this.id,msg={id,method,params,...(sessionId?{sessionId}:{})};this.emitLog('send',msg);return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{this.pending.delete(id);reject(new Error('CDP-timeout:'+method));},10000);this.pending.set(id,{resolve,reject,timer});this.ws.send(JSON.stringify(msg));});}
 wait(method,sessionId,predicate=()=>true,timeout=10000){const old=this.events.find(x=>x.method===method&&x.sessionId===sessionId&&predicate(x.params));if(old)return Promise.resolve(old.params);return new Promise((resolve,reject)=>{const f=x=>{if(x.method===method&&x.sessionId===sessionId&&predicate(x.params)){clearTimeout(t);this.listeners.delete(f);resolve(x.params);}};const t=setTimeout(()=>{this.listeners.delete(f);reject(new Error('CDP-event-timeout:'+method));},timeout);this.listeners.add(f);});}
 on(fn){this.listeners.add(fn);return ()=>this.listeners.delete(fn);}
 waitFor(predicate,timeout=10000){const old=this.events.find(predicate);if(old)return Promise.resolve(old);return new Promise((resolve,reject)=>{const fn=e=>{if(predicate(e)){clearTimeout(t);this.listeners.delete(fn);resolve(e);}};const t=setTimeout(()=>{this.listeners.delete(fn);reject(new Error('CDP-event-timeout'));},timeout);this.listeners.add(fn);});}
 close(){this.ws.close();}
}
async function blank(cdp){const context=await cdp.send('Target.createBrowserContext',{disposeOnDetach:true}),target=await cdp.send('Target.createTarget',{url:'about:blank',browserContextId:context.browserContextId}),attach=await cdp.send('Target.attachToTarget',{targetId:target.targetId,flatten:true}),sid=attach.sessionId;
 await cdp.send('Page.enable',{},sid);await cdp.send('Runtime.enable',{},sid);const tree=await cdp.send('Page.getFrameTree',{},sid),ctx=await cdp.wait('Runtime.executionContextCreated',sid,p=>p.context.auxData?.isDefault===true&&p.context.auxData.frameId===tree.frameTree.frame.id);
 if(tree.frameTree.frame.url!=='about:blank')throw new Error('nonblank-environment-context');return {...context,...target,sessionId:sid,frame:tree.frameTree.frame,executionContext:ctx.context};}
module.exports={CDP,blank};
