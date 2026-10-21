'use strict';
// Local media-only laboratory. No IMA/GAM/Prebid and no live asset downloads.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),http=require('node:http'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..'),assets=path.join(__dirname,'generated/dummy-lab');
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const candidate=require('./intext-p13c-dummy-candidate.cjs');
const decode=content=>content?.text?Buffer.from(content.text,content.encoding==='base64'?'base64':'utf8'):null;
function boxes(bytes,start=0,end=bytes.length){const result=[];let at=start;
 while(at+8<=end){const size=bytes.readUInt32BE(at),type=bytes.toString('ascii',at+4,at+8);if(size<8||at+size>end)throw Error('Invalid MP4 box '+type+' at '+at);
  result.push({type,offset:at,size});at+=size;}if(at!==end)throw Error('Trailing incomplete MP4 box');return result;}
function prepare(directory=path.join(os.homedir(),'Downloads')){
 const harPath=path.join(directory,'www.marca.com-observe.har'),harBytes=fs.readFileSync(harPath),har=JSON.parse(harBytes.toString('utf8'));
 const videojsEntry=har.log.entries.find(e=>new URL(e.request.url).pathname==='/7.20.3/video.min.js');
 const videojs=decode(videojsEntry?.response.content);if(!videojs||!videojs.toString('utf8').includes('7.20.3'))throw Error('Missing exact Video.js 7.20.3');
 const controlEntry=har.log.entries[387];if(controlEntry?.response.status!==206||!controlEntry.request.url.includes('aaea173cbf37b22d'))throw Error('Unexpected control entry');
 const range=controlEntry.response.headers.find(h=>h.name.toLowerCase()==='content-range')?.value;
 const match=/^bytes 0-(\d+)\/(\d+)$/.exec(range??''),control=decode(controlEntry.response.content);
 if(!match||Number(match[1])+1!==Number(match[2])||!control||control.length!==Number(match[2]))throw Error('Control is not the complete response body');
 const structure=boxes(control),moov=structure.find(b=>b.type==='moov');if(!moov||!structure.some(b=>b.type==='mdat')||!boxes(control,moov.offset+8,moov.offset+moov.size).some(b=>b.type==='trak'))throw Error('Control lacks movie/track/media boxes');
 const source=fs.readFileSync(path.join(root,'_gam_kv_.js'),'utf8'),section=source.slice(source.indexOf('  createVideoElement() {'),source.indexOf('  initVideoJS()',source.indexOf('  createVideoElement() {')));
 const dummy64=/data:video\/mp4;base64,([A-Za-z0-9+/=]+)/.exec(section)?.[1];if(!dummy64)throw Error('Current dummy missing');const dummy=Buffer.from(dummy64,'base64');
 const black=candidate.create();
 const manifest={schema:'p13c-dummy-lab-assets-v2',sourceHar:'www.marca.com-observe.har',sourceHarSha256:sha(harBytes),candidate:black.manifest,
  dummy:{bytes:dummy.length,sha256:sha(dummy)},control:{bytes:control.length,sha256:sha(control),sourceEntry:387,contentRange:range,structure,
   validation:'Complete HTTP byte range, exact decoded length and MP4 box bounds/track/mdat checked. Browser playback validation is separate.'},
  videojs:{version:'7.20.3',sha256:sha(videojs)},browserCandidates:['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(file=>fs.existsSync(file))};
 fs.mkdirSync(assets,{recursive:true});fs.writeFileSync(path.join(assets,'video.min.js'),videojs);
 fs.writeFileSync(path.join(assets,'control.mp4'),control);fs.writeFileSync(path.join(assets,'dummy.mp4'),dummy);
 fs.writeFileSync(path.join(assets,'candidate.mp4'),black.data);
 fs.writeFileSync(path.join(assets,'fixtures.js'),'window.IntextDummyFixtures = '+JSON.stringify({manifest,dummy:'data:video/mp4;base64,'+dummy64,control:'data:video/mp4;base64,'+control.toString('base64'),candidate:'data:video/mp4;base64,'+black.data.toString('base64')})+';\n');
 fs.writeFileSync(path.join(assets,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');return manifest;
}
function createHandler(assetDirectory=assets){
 const files=new Map([['/',['intext-p13c-dummy.html','text/html']],['/lab.js',['intext-p13c-dummy.js','text/javascript']],
  ['/video.min.js',[path.join(assetDirectory,'video.min.js'),'text/javascript']],['/fixtures.js',[path.join(assetDirectory,'fixtures.js'),'text/javascript']],
  ['/media/control.mp4',[path.join(assetDirectory,'control.mp4'),'video/mp4']],['/media/dummy.mp4',[path.join(assetDirectory,'dummy.mp4'),'video/mp4']],
  ['/media/candidate.mp4',[path.join(assetDirectory,'candidate.mp4'),'video/mp4']]]);
 return (req,res)=>{const entry=files.get(new URL(req.url,'http://127.0.0.1').pathname);
  if(!['GET','HEAD'].includes(req.method)||!entry){res.writeHead(404);res.end();return;}
  const bytes=fs.readFileSync(path.resolve(__dirname,entry[0])),isMedia=entry[1]==='video/mp4';
  const headers={'Content-Type':entry[1]+(isMedia?'':'; charset=utf-8'),'Cache-Control':'no-store',
   'Content-Security-Policy':"default-src 'none'; script-src 'self'; style-src 'unsafe-inline'; media-src 'self' data: blob:; connect-src 'none'; img-src data:; frame-src 'none'; base-uri 'none'; form-action 'none'"};
  let from=0,to=bytes.length-1,status=200;
  if(isMedia){headers['Accept-Ranges']='bytes';const range=req.headers.range;
    if(range){const match=/^bytes=(\d*)-(\d*)$/.exec(range);
      if(match&&(match[1]||match[2])){from=match[1]?Number(match[1]):Math.max(0,bytes.length-Number(match[2]));to=match[1]&&match[2]?Math.min(to,Number(match[2])):to;}
      if(!match||(!match[1]&&!match[2])||from>to||from>=bytes.length||Number(match[2])===0&&!match[1]){
        res.writeHead(416,{...headers,'Content-Range':'bytes */'+bytes.length});res.end();return;}
      status=206;headers['Content-Range']=`bytes ${from}-${to}/${bytes.length}`;
    }
  }
  headers['Content-Length']=to-from+1;res.writeHead(status,headers);res.end(req.method==='HEAD'?undefined:bytes.subarray(from,to+1));
 };
}
function serve(port=8134){
 const server=http.createServer(createHandler());
 server.listen(port,'127.0.0.1',()=>console.log('Media-only dummy lab: http://127.0.0.1:'+server.address().port));return server;
}
module.exports={prepare,serve,boxes,createHandler};
if(require.main===module){if(process.argv[2]==='prepare')console.log(JSON.stringify(prepare(process.argv[3]),null,2));
 else if(process.argv[2]==='serve')serve(Number(process.argv[3]??8134));else throw Error('Use prepare [Downloads] or serve [port]');}
