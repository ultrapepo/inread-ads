'use strict';
// Bounded second launch: files for stdio, CDP bound to loopback. The pipe attempt
// failed at spawn EPERM, so this distinguishes transport from Chrome execution.
// No sandbox/security flags are removed. No page navigation or serving.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process');
const {P,run,record}=require('./preflight.cjs');
async function launch({chromium=false}={}){run();const executable=chromium?path.join(process.env.LOCALAPPDATA,'ms-playwright/chromium-1234/chrome-win64/chrome.exe'):'C:/Program Files/Google/Chrome/Application/chrome.exe',profile=fs.mkdtempSync(path.join(os.tmpdir(),'gexp-qa1b-II-B2C-port-'));
 const flags=['--headless=new','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,'--no-first-run','--no-default-browser-check','--disable-background-networking','--disable-component-update','--disable-sync','--disable-extensions','--no-pings','--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost','--proxy-server=http://127.0.0.1:9','--proxy-bypass-list=localhost;127.0.0.1'];
 const label=chromium?'launch-chromium':'launch-port',out=P+label+'.stdout.txt',err=P+label+'.stderr.txt',stdout=fs.openSync(out,'w'),stderr=fs.openSync(err,'w');let child,error=null,result=null,exitCode=null,signal=null,timedOut=false,pid=null,devTools=null;
 const started=new Date().toISOString();
 try{child=cp.spawn(executable,flags,{windowsHide:true,stdio:['ignore',stdout,stderr]});pid=child.pid??null;child.on('error',e=>{error={code:e.code,message:e.message};});child.on('exit',(c,s)=>{exitCode=c;signal=s;});
  await new Promise(resolve=>{let done=false,ws;const finish=()=>{if(done)return;done=true;clearInterval(poll);clearTimeout(timeout);resolve();};
   const poll=setInterval(()=>{const f=path.join(profile,'DevToolsActivePort');if(!devTools&&fs.existsSync(f)){const lines=fs.readFileSync(f,'utf8').trim().split(/\r?\n/);devTools={port:Number(lines[0]),path:lines[1],address:'127.0.0.1'};ws=new WebSocket('ws://127.0.0.1:'+devTools.port+devTools.path);
     ws.addEventListener('error',()=>{error??={code:'WEBSOCKET',message:'Local CDP WebSocket failed'};child.kill();finish();});
     ws.addEventListener('open',()=>ws.send(JSON.stringify({id:1,method:'Browser.getVersion'})));
     ws.addEventListener('message',event=>{const x=JSON.parse(event.data);if(x.id===1){result=x;ws.send(JSON.stringify({id:2,method:'Browser.close'}));}if(x.id===2)ws.close();});}},50);
   const timeout=setTimeout(()=>{timedOut=true;child.kill();ws?.close();finish();},15000);
   child.once('error',finish);child.once('exit',finish);
  });
 }catch(e){error={code:e.code,message:e.message};}finally{fs.closeSync(stdout);fs.closeSync(stderr);}
 const data={schema:'qa1b-II-B2C-browser-launch-v1',transport:'CDP-loopback-port-file-stdio',started,ended:new Date().toISOString(),executable,executableRecord:record(executable),flags,profile,profileFresh:true,pid,devTools,result,error,exitCode,signal,timedOut,
  sandboxDisabled:false,securityRelaxed:false,navigations:0,advertising:false,stdout:record(out),stderr:record(err),status:result?.result?'PASS-LAUNCH':'BLOCKED'};
 fs.writeFileSync(P+label+'.json',JSON.stringify(data,null,2)+'\n');console.log(JSON.stringify(data,null,2));return data;}
if(require.main===module)launch({chromium:process.argv[2]==='--chromium'}).catch(e=>{console.error(e.stack);process.exitCode=1;});
module.exports={launch};
