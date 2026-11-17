'use strict';
// Browser launch preflight only. Does not navigate, serve, or load ad/core code.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process');
const {P,run,record}=require('./preflight.cjs');
async function launch(){run();const executable='C:/Program Files/Google/Chrome/Application/chrome.exe';
  const profile=fs.mkdtempSync(path.join(os.tmpdir(),'gexp-qa1b-II-B2C-'));
  const flags=['--headless=new','--remote-debugging-pipe','--user-data-dir='+profile,'--no-first-run','--no-default-browser-check','--disable-background-networking','--disable-component-update','--disable-sync','--disable-extensions','--no-pings','--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost','--proxy-server=http://127.0.0.1:9','--proxy-bypass-list=localhost;127.0.0.1'];
  const stdout=fs.openSync(P+'launch.stdout.txt','w'),stderr=fs.openSync(P+'launch.stderr.txt','w'),started=new Date().toISOString();
  let child,error=null,result=null,exitCode=null,signal=null,timedOut=false,raw='';
  try{child=cp.spawn(executable,flags,{windowsHide:true,stdio:['ignore',stdout,stderr,'pipe','pipe']});
    child.on('error',e=>{error={code:e.code,message:e.message};});child.on('exit',(code,sig)=>{exitCode=code;signal=sig;});
    await new Promise(resolve=>{const timeout=setTimeout(()=>{timedOut=true;child.kill();resolve();},15000);
      child.once('error',()=>{clearTimeout(timeout);resolve();});child.once('exit',()=>{clearTimeout(timeout);resolve();});
      child.stdio[4]?.on('data',buf=>{raw+=buf.toString();const parts=raw.split('\0');raw=parts.pop();for(const part of parts){if(!part)continue;let x;try{x=JSON.parse(part);}catch(_){continue;}if(x.id===1){result=x;child.stdio[3].write(JSON.stringify({id:2,method:'Browser.close'})+'\0');}}});
      child.stdio[3]?.on('error',e=>{error??={code:e.code,message:e.message};});
      child.stdio[3]?.write(JSON.stringify({id:1,method:'Browser.getVersion'})+'\0');
    });
  }catch(e){error={code:e.code,message:e.message};}finally{fs.closeSync(stdout);fs.closeSync(stderr);}
  const data={schema:'qa1b-II-B2C-browser-launch-v1',started,ended:new Date().toISOString(),executable,executableRecord:record(executable),flags,profile,profileFresh:true,
    os:{type:os.type(),release:os.release(),version:os.version(),arch:os.arch()},node:process.version,result,error,exitCode,signal,timedOut,
    sandboxDisabled:false,securityRelaxed:false,navigations:0,advertising:false,stdout:record(P+'launch.stdout.txt'),stderr:record(P+'launch.stderr.txt'),status:result?.result?'PASS-LAUNCH':'BLOCKED'};
  fs.writeFileSync(P+'environment.json',JSON.stringify(data,null,2)+'\n');console.log(JSON.stringify(data,null,2));return data;}
if(require.main===module)launch().catch(e=>{console.error(e.stack);process.exitCode=1;});
module.exports={launch};
