'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process'),http=require('node:http');
const L=require('./lib.cjs'),{CDP,blank}=require('./cdp.cjs');
const pause=ms=>new Promise(r=>setTimeout(r,ms));
function options(argv){const mode=argv[0],a=L.parseArgs(argv.slice(1));if(!['preflight','environment','g1g2'].includes(mode))throw new Error('mode: preflight | environment | g1g2');
 const allowed=['--expected-manifest','--out','--chrome','--operator-local','--resume-g1g2'];for(const k of Object.keys(a))if(!allowed.includes(k))throw new Error('unknown-option:'+k);
 if(!a['--out'])throw new Error('new-output-directory-required');if(mode!=='preflight'&&!a['--operator-local'])throw new Error('manual-local-operator-confirmation-required');if(mode==='g1g2'&&!a['--resume-g1g2'])throw new Error('separate-manual-G1G2-opt-in-required');return {mode,...a};}
function flags(profile,proxyPort){return ['--headless=new','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0','--user-data-dir='+profile,'--no-first-run','--no-default-browser-check',
 '--disable-background-networking','--disable-component-update','--disable-sync','--disable-extensions','--disable-quic','--no-pings','--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost',
 '--proxy-server=http://127.0.0.1:'+proxyPort,'--proxy-bypass-list=127.0.0.1;localhost;[::1]'];}
function version(executable,out){L.localPath(executable);if(!path.isAbsolute(executable)||!executable.toLowerCase().endsWith('.exe')||!fs.statSync(executable).isFile()||fs.lstatSync(executable).isSymbolicLink())throw new Error('explicit-real-Chrome-executable-required');
 const b=fs.readFileSync(executable),fd1=fs.openSync(path.join(out,'chrome-version.stdout.txt'),'w'),fd2=fs.openSync(path.join(out,'chrome-version.stderr.txt'),'w');let r;
 try{r=cp.spawnSync('powershell.exe',['-NoProfile','-NonInteractive','-File',path.join(L.ROOT,'chrome-version.ps1'),'-ChromePath',executable],{windowsHide:true,stdio:['ignore',fd1,fd2],timeout:10000});}finally{fs.closeSync(fd1);fs.closeSync(fd2);}
 if(r.error||r.status!==0)throw new Error('read-only-VersionInfo-blocked:'+JSON.stringify({error:r.error?.message,exitCode:r.status}));
 const info=JSON.parse(fs.readFileSync(path.join(out,'chrome-version.stdout.txt'),'utf8').replace(/^\uFEFF/,'').trim());if(!/Chrome|Chromium/i.test(info.ProductName??''))throw new Error('not-a-Chrome-product');return {executable,bytes:b.length,sha256:L.hash(b),installedVersion:info};}
async function denyProxy(out){const requests=[],sockets=new Set();const server=http.createServer((req,res)=>{requests.push({method:req.method,url:req.url,blocked:true});res.writeHead(403,{'Connection':'close','Content-Type':'text/plain'});res.end('External network blocked');});
 server.on('connect',(req,socket)=>{requests.push({method:'CONNECT',url:req.url,blocked:true});socket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');});server.on('connection',s=>{sockets.add(s);s.on('close',()=>sockets.delete(s));});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});return {port:server.address().port,requests,async close(){for(const s of sockets)s.destroy();await new Promise(r=>server.close(r));L.write(out,'blocked-proxy.json',{scope:'Browser HTTP(S) proxy only; not an OS-wide packet capture',requests});}};}
async function environment(executable,out,proxyPort){const profile=fs.mkdtempSync(path.join(os.tmpdir(),'gexp-qa1b-recovery-')),args=flags(profile,proxyPort),outFd=fs.openSync(path.join(out,'chrome.stdout.txt'),'w'),errFd=fs.openSync(path.join(out,'chrome.stderr.txt'),'w');
 const data={started:new Date().toISOString(),profile,profileFresh:true,flags:args,executable,pid:null,stableWindowMs:3000,stable:false,version:null,blankDocument:null,devToolsActivePort:null,exitCode:null,signal:null,spawnError:null,securityRelaxed:false,fixtureOpened:false};
 let child,cdp,closed=false;try{
  child=cp.spawn(executable,args,{windowsHide:true,stdio:['ignore',outFd,errFd]});data.pid=child.pid??null;
  child.on('error',e=>{data.spawnError={code:e.code,message:e.message};});child.on('exit',(c,s)=>{closed=true;data.exitCode=c;data.signal=s;});
  const deadline=Date.now()+20000,portFile=path.join(profile,'DevToolsActivePort');
  while(!fs.existsSync(portFile)){if(closed||data.spawnError)throw new Error('Chrome-exited-before-CDP');if(Date.now()>deadline)throw new Error('DevToolsActivePort-timeout');await pause(50);}
  const text=fs.readFileSync(portFile,'utf8'),lines=text.trim().split(/\r?\n/),port=Number(lines[0]);if(!Number.isInteger(port)||port<1||port>65535||!/^\/devtools\/browser\/[a-f0-9-]+$/i.test(lines[1]??''))throw new Error('invalid-CDP-port-file');
  data.devToolsActivePort={text,port,address:'127.0.0.1',path:lines[1]};cdp=await CDP.connect('ws://127.0.0.1:'+port+lines[1],path.join(out,'cdp.jsonl'));
  data.version=await cdp.send('Browser.getVersion');if(!/^(HeadlessChrome|Chrome|Chromium)\//.test(data.version.product??'')||!data.version.protocolVersion)throw new Error('invalid-Browser.getVersion');
  data.blankDocument=await blank(cdp);const start=Date.now();await pause(3000);if(closed||data.spawnError||!Number.isInteger(data.pid)||data.pid<=0)throw new Error('Chrome-not-stable');
  const second=await cdp.send('Browser.getVersion');if(second.product!==data.version.product)throw new Error('browser-identity-changed');data.stableObservedMs=Date.now()-start;data.stable=true;data.status='PASS-ENVIRONMENT-ONLY';
  L.write(out,'environment.json',data);
  return {cdp,data,async close(){await cleanup();}};
 }catch(e){data.status='BLOCKED';data.reason=e.message;await cleanup();throw Object.assign(e,{environment:data});}
 async function cleanup(){if(cdp){try{await cdp.send('Browser.close');}catch(_){}cdp.close();}
  const until=Date.now()+5000;while(child?.pid&&!closed&&!data.spawnError&&Date.now()<until)await pause(50);
  if(child?.pid&&!closed&&!data.spawnError){data.forcedTermination=true;child.kill();const end=Date.now()+2000;while(!closed&&Date.now()<end)await pause(50);data.status='BLOCKED';data.reason='browser-cleanup-required-termination';}
  fs.closeSync(outFd);fs.closeSync(errFd);data.ended=new Date().toISOString();L.write(out,'environment.json',data);
 }
}
async function main(argv){const o=options(argv),packageCheck=L.verifyPackage(L.ROOT,o['--expected-manifest']),out=L.createOutput(o['--out']);
 const result={schema:'qa1b-recovery-run-v1',runId:cryptoId(),mode:o.mode,started:new Date().toISOString(),package:packageCheck,scope:'Synthetic C only, UNBOUND, no E, no acceptance-performance series',sourceComplete:{D0:false,Dv:false,Dc:false,outcomes:false},G3:'NOT-RUN',G4:'NOT-MEASURED',status:'BLOCKED'};
 let browser,proxy;try{L.write(out,'preflight.json',{...packageCheck,os:{type:os.type(),version:os.version(),release:os.release(),arch:os.arch()},node:process.version,priorDiagnostics:'Unchanged under docs/',fullHistoricalBaseline:'Not bundled; not required by independent fixture checks; no frozen suites run'});
  if(o.mode==='preflight'){result.status='PASS-PREFLIGHT-ONLY';return result;}
  const [major,minor]=process.versions.node.split('.').map(Number);if(process.platform!=='win32'||!/Windows 11/.test(os.version())||typeof WebSocket!=='function'||major<22||(major===22&&minor<16))throw new Error('Windows11-and-existing-Node22.16+-required');
  const executable=o['--chrome']??path.join(process.env.PROGRAMFILES??'C:/Program Files','Google','Chrome','Application','chrome.exe');const info=version(executable,out);L.write(out,'chrome-binary.json',info);
  proxy=await denyProxy(out);browser=await environment(executable,out,proxy.port);const installed=/\d+\.\d+\.\d+\.\d+/.exec(info.installedVersion.ProductVersion??'')?.[0];if(!installed||browser.data.version.product.split('/')[1]!==installed)throw new Error('observed-version-vs-inspected-binary-mismatch');result.environment='PASS-ENVIRONMENT-ONLY';
  if(o.mode==='environment')result.status='PASS-ENVIRONMENT-ONLY';
  else{const {g1g2}=require('./g1g2.cjs');result.g1g2=await g1g2(browser.cdp,out);result.status='PASS-C-ISOLATED-LIMITED';}
 }catch(e){result.status=e.verdict??'BLOCKED';result.error={message:e.message,code:e.code??null};if(e.environment)result.environment=e.environment;}
 finally{if(browser){await browser.close();if(browser.data.status==='BLOCKED'){result.status='BLOCKED';result.cleanup=browser.data.reason;}}if(proxy)await proxy.close();try{L.verifyPackage(L.ROOT,o['--expected-manifest']);result.inputsAfter='UNCHANGED';}catch(e){result.status='FAIL';result.inputsAfter=e.message;}result.ended=new Date().toISOString();L.write(out,'result.json',result);const manifest=L.sealLogs(out);console.log(JSON.stringify({status:result.status,out,logsManifest:manifest},null,2));}
 return result;
}
const cryptoId=()=>require('node:crypto').randomUUID();
if(require.main===module)main(process.argv.slice(2)).then(r=>{if(!r.status.startsWith('PASS-'))process.exitCode=2;}).catch(e=>{console.error(e.stack);process.exitCode=2;});
module.exports={options,flags,environment,main,version};
