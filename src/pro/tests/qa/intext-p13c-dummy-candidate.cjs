'use strict';
// Original QA fixture: black AVC timeline (IDR + skipped P frames), no audio/ad content.
const crypto=require('node:crypto');
const u32=(...values)=>{const b=Buffer.alloc(values.length*4);values.forEach((value,i)=>b.writeUInt32BE(value>>>0,i*4));return b;};
const u16=(...values)=>{const b=Buffer.alloc(values.length*2);values.forEach((value,i)=>b.writeUInt16BE(value,i*2));return b;};
const box=(type,...parts)=>{const body=Buffer.concat(parts);return Buffer.concat([u32(body.length+8),Buffer.from(type),body]);};
const full=(type,flags,...parts)=>box(type,u32(flags),...parts);
const ue=value=>{const bits=(value+1).toString(2);return '0'.repeat(bits.length-1)+bits;};
const bytes=bits=>Buffer.from(bits.match(/.{8}/g).map(value=>parseInt(value,2)));
function rbsp(bits){bits+='1';return bytes(bits+'0'.repeat((8-bits.length%8)%8));}
function nal(header,data){const escaped=[];let zeros=0;for(const byte of data){if(zeros>=2&&byte<=3){escaped.push(3);zeros=0;}escaped.push(byte);zeros=byte===0?zeros+1:0;}return Buffer.from([header,...escaped]);}
function create(){
 const width=64,height=64,timescale=1000,duration=1000,frames=25,sampleDuration=40;
 const timing='00001'+(1).toString(2).padStart(32,'0')+(50).toString(2).padStart(32,'0')+'10000';
 const sps=nal(0x67,Buffer.concat([Buffer.from([66,0xc0,10]),rbsp(ue(0)+ue(0)+ue(2)+ue(1)+'0'+ue(width/16-1)+ue(height/16-1)+'1101'+timing)]));
 const pps=nal(0x68,rbsp(ue(0)+ue(0)+'00'+ue(0)+ue(0)+ue(0)+'000'+ue(0)+ue(0)+ue(0)+'100'));
 const macroblocks=[];for(let mb=0;mb<width*height/256;mb++){
  let bits=(mb===0?ue(0)+ue(2)+ue(0)+'0000'+ue(0)+'00'+ue(0)+ue(1):'')+ue(25);bits+='0'.repeat((8-bits.length%8)%8);
  macroblocks.push(bytes(bits),Buffer.alloc(256,16),Buffer.alloc(128,128));
 }
 const idr=nal(0x65,Buffer.concat([...macroblocks,rbsp('')]));
 const samples=[Buffer.concat([u32(idr.length),idr])];
 for(let frame=1;frame<frames;frame++){
  // P slice: one reference, default list, no adaptive marking; all 16 macroblocks skipped.
  const header=ue(0)+ue(0)+ue(0)+(frame%16).toString(2).padStart(4,'0')+'000'+ue(0)+ue(1)+ue(16);
  const p=nal(0x41,rbsp(header));samples.push(Buffer.concat([u32(p.length),p]));
 }
 const avcC=box('avcC',Buffer.from([1,66,0xc0,10,0xff,0xe1]),u16(sps.length),sps,Buffer.from([1]),u16(pps.length),pps);
 const visual=Buffer.concat([Buffer.alloc(6),u16(1),Buffer.alloc(16),u16(width,height),u32(0x480000,0x480000,0),u16(1),Buffer.alloc(32),u16(24,65535)]);
 const stsd=full('stsd',0,u32(1),box('avc1',visual,avcC));
 const matrix=u32(0x10000,0,0,0,0x10000,0,0,0,0x40000000);
 const mvhd=full('mvhd',0,u32(0,0,timescale,duration,0x10000),u16(0x100),Buffer.alloc(10),matrix,Buffer.alloc(24),u32(2));
 const tkhd=full('tkhd',7,u32(0,0,1,0,duration),Buffer.alloc(8),u16(0,0,0,0),matrix,u32(width*65536,height*65536));
 const mdhd=full('mdhd',0,u32(0,0,timescale,duration),u16(0x55c4,0));
 const hdlr=full('hdlr',0,u32(0),Buffer.from('vide'),Buffer.alloc(12),Buffer.from('QA black\0'));
 const dinf=box('dinf',full('dref',0,u32(1),full('url ',1)));
 const moov=offset=>box('moov',mvhd,box('trak',tkhd,box('mdia',mdhd,hdlr,box('minf',full('vmhd',1,u16(0,0,0,0)),dinf,
   box('stbl',stsd,full('stts',0,u32(1,frames,sampleDuration)),full('stsc',0,u32(1,1,frames,1)),full('stsz',0,u32(0,frames,...samples.map(sample=>sample.length))),full('stco',0,u32(1,offset)),full('stss',0,u32(1,1)))))));
 const ftyp=box('ftyp',Buffer.from('isom'),u32(512),Buffer.from('isomiso2avc1mp41'));
 const data=Buffer.concat([ftyp,moov(ftyp.length+moov(0).length+8),box('mdat',...samples)]);
 return {data,manifest:{schema:'p13c-black-fixture-v2',origin:'Generated locally from source, not from GAM/HAR or a third-party clip',
  width,height,durationMs:duration,frames,frameRate:25,sampleDurationMs:40,presentationTimesMs:Array.from({length:frames},(_,i)=>i*40),
  audio:false,codec:'avc1.42C00A',profile:'Constrained Baseline',level:'1.0',pixelFormat:'YUV420 limited-range black',
  bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex'),validation:'Complete MP4 timeline, SPS fixed-rate timing, IDR + P frames. Decoder PTS/duration and browser wall-clock validation are separate.'}};
}
module.exports={create};
if(require.main===module){const fs=require('node:fs'),path=require('node:path'),{data,manifest}=create(),out=path.join(__dirname,'generated/dummy-lab/black-64x64.mp4');fs.writeFileSync(out,data);console.log(JSON.stringify({...manifest,path:out},null,2));}
