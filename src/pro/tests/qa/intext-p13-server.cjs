'use strict';
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname,'../..');
const files = new Map([['/', ['tests/qa/intext-p13.html','text/html']], ['/app.js',['tests/qa/intext-p13-app.js','text/javascript']],
  ['/controls.cjs',['tests/qa/intext-p13-controls.cjs','text/javascript']],
  ['/lifecycle.cjs',['tests/qa/intext-p13a-lifecycle.cjs','text/javascript']],
  ['/source/_gam_kv_.js',['_gam_kv_.js','text/plain']], ['/source/IntextManager.js',['IntextManager.js','text/plain']]]);
const server = http.createServer((request,response) => {
  const target = files.get(new URL(request.url,'http://127.0.0.1').pathname);
  if (request.method !== 'GET' || !target) { response.writeHead(404); response.end(); return; }
  response.writeHead(200,{'Content-Type':target[1]+'; charset=utf-8','Cache-Control':'no-store'});
  response.end(fs.readFileSync(path.join(root,target[0])));
});
server.listen(Number(process.env.INTEXT_P13_QA_PORT || 8133),'127.0.0.1',()=>console.log('QA only: http://127.0.0.1:'+server.address().port));
