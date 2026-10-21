'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {create}=require('./qa/intext-p13c-dummy-candidate.cjs'),{build,expected}=require('./qa/intext-p13c-dummy-source-build.cjs');
const {boxes}=require('./qa/intext-p13c-dummy-lab.cjs');const root=path.resolve(__dirname,'..');
const sha=data=>crypto.createHash('sha256').update(data).digest('hex');
function child(data,parent,type){const found=boxes(data,parent.offset+8,parent.offset+parent.size).find(b=>b.type===type);assert(found,type+' required');return found;}
test('dummy QA: fixture is original deterministic black AVC, small, silent and complete',()=>{
  const {data,manifest}=create();assert(data.equals(create().data));assert.equal(data.length,7141);assert.equal(manifest.sha256,'410e77398580e6b470c0f5c2297d32484cbb29b9765133f7703038fc24ed753d');
  assert.equal(sha(data),manifest.sha256);assert.equal(manifest.audio,false);assert.equal(manifest.codec,'avc1.42C00A');
  const top=boxes(data);assert.deepEqual(top.map(b=>b.type),['ftyp','moov','mdat']);
  const moov=top[1],trak=child(data,moov,'trak'),mdia=child(data,trak,'mdia'),minf=child(data,mdia,'minf'),stbl=child(data,minf,'stbl');
  assert.equal(boxes(data,moov.offset+8,moov.offset+moov.size).filter(b=>b.type==='trak').length,1);
  const hdlr=child(data,mdia,'hdlr');assert.equal(data.toString('ascii',hdlr.offset+16,hdlr.offset+20),'vide');
  const stco=child(data,stbl,'stco'),stsz=child(data,stbl,'stsz'),stts=child(data,stbl,'stts');
  assert.equal(data.readUInt32BE(stco.offset+16),top[2].offset+8);assert.equal(data.readUInt32BE(stsz.offset+16),25);
  assert.equal(data.readUInt32BE(stts.offset+16),25);assert.equal(data.readUInt32BE(stts.offset+20),40);
  let sum=0,offset=top[2].offset+8;for(let i=0;i<25;i++){
    const size=data.readUInt32BE(stsz.offset+20+i*4);assert.equal(data.readUInt32BE(offset),size-4);assert.equal(data[offset+4]&31,i===0?5:1);sum+=size;offset+=size;
  }assert.equal(sum,top[2].size-8);assert.equal(offset,data.length);
  const stsc=child(data,stbl,'stsc'),stss=child(data,stbl,'stss');assert.equal(data.readUInt32BE(stsc.offset+20),25);assert.equal(data.readUInt32BE(stss.offset+16),1);
  const stsd=child(data,stbl,'stsd'),avc1=stsd.offset+16;assert.equal(data.toString('ascii',avc1+4,avc1+8),'avc1');
  assert.equal(data.readUInt16BE(avc1+32),64);assert.equal(data.readUInt16BE(avc1+34),64);
  const avcC=boxes(data,avc1+86,stsd.offset+stsd.size).find(b=>b.type==='avcC');assert(avcC);
  assert.deepEqual([...data.subarray(avcC.offset+8,avcC.offset+12)],[1,66,0xc0,10]);
  assert.equal(manifest.frames,25);assert.equal(manifest.presentationTimesMs.at(-1)+manifest.sampleDurationMs,1000);
});
test('dummy QA: I_PCM macroblocks contain exclusively black luma/chroma, with legal bounded RBSP',()=>{
  const {data}=create(),mdat=boxes(data).find(b=>b.type==='mdat'),firstLength=data.readUInt32BE(mdat.offset+8);const escaped=data.subarray(mdat.offset+13,mdat.offset+12+firstLength),raw=[];
  for(let i=0,zeros=0;i<escaped.length;i++){const byte=escaped[i];if(zeros===2&&byte===3){zeros=0;continue;}raw.push(byte);zeros=byte===0?zeros+1:0;}
  const buffer=Buffer.from(raw);let bit=0;
  const read=count=>{let value=0;while(count--)value=value*2+((buffer[bit>>3]>>(7-(bit++%8)))&1);return value;};
  const ue=()=>{let count=0;while(read(1)===0){assert(count++<16);}return (1<<count)-1+read(count);};
  assert.equal(ue(),0);assert.equal(ue(),2);assert.equal(ue(),0);assert.equal(read(4),0);assert.equal(ue(),0);assert.equal(read(2),0);assert.equal(ue(),0);assert.equal(ue(),1);
  for(let mb=0;mb<16;mb++){assert.equal(ue(),25);while(bit%8)assert.equal(read(1),0);for(let i=0;i<384;i++)assert.equal(read(8),i<256?16:128);}
  assert.equal(read(1),1);while(bit%8)assert.equal(read(1),0);assert.equal(bit/8,buffer.length);
});
for(const file of Object.keys(expected))test('dummy QA source-only variant and exact P1.3b control: '+file,()=>{
  const source=fs.readFileSync(path.join(root,file),'utf8');assert.equal(sha(source),expected[file]);
  const result=build(source);assert.equal(result.original,source);assert.equal(result.manifest.changedOccurrences,1);
  const at=result.manifest.offset,old=/data:video\/mp4;base64,[A-Za-z0-9+/=]+/.exec(source.slice(at))[0],replacement='data:video/mp4;base64,'+create().data.toString('base64');
  assert.equal(result.output.slice(0,at),source.slice(0,at));assert.equal(result.output.slice(at+replacement.length),source.slice(at+old.length));
  assert.equal(result.output.slice(0,at)+old+result.output.slice(at+replacement.length),source);
  assert.equal(result.manifest.oldDummySha256,'6231a292d2b2202abe7ef00697d2172b1c2b67e26c231b3bb4e529e983cdb52b');
});
test('dummy QA builder refuses ambiguous source matches and missing creative boundary',()=>{
  assert.throws(()=>build('not an Intext bundle'),/boundaries/);
  const source=fs.readFileSync(path.join(root,'_gam_kv_.js'),'utf8'),at=source.indexOf('  createVideoElement() {',source.indexOf('class IntextVideoCreative {'));
  assert.throws(()=>build(source.slice(0,at)+source.slice(at).replace('  createVideoElement() {','  createVideoElement() {\n // data:video/mp4;base64,YQ==')),/one dummy/);
});
