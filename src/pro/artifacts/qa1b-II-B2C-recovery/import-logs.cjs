'use strict';
// Copies inert local evidence only. Never executes logs or changes a producer.
const fs=require('node:fs'),path=require('node:path'),L=require('./lib.cjs');
function verifyLogs(source,expected){L.localPath(source);if(!/^[a-f0-9]{64}$/.test(expected??''))throw new Error('external-logs-manifest-sha-required');if(fs.lstatSync(source).isSymbolicLink())throw new Error('source-symlink');
 const manifestPath=L.safe(source,'logs-manifest.json');if(fs.statSync(manifestPath).size>1048576)throw new Error('logs-manifest-over-1MiB');const bytes=fs.readFileSync(manifestPath);if(L.hash(bytes)!==expected)throw new Error('logs-root-mismatch');const m=JSON.parse(bytes);
 if(m.schema!=='qa1b-recovery-logs-v1'||!Array.isArray(m.files)||m.files.length>1000||new Set(m.files.map(x=>x.file)).size!==m.files.length)throw new Error('logs-manifest-shape');
 let size=bytes.length;for(const x of m.files){if(!/\.(json|jsonl|txt|body)$/.test(x.file)||!Number.isSafeInteger(x.bytes)||x.bytes<0)throw new Error('logs-file-type-or-size');size+=x.bytes;if(size>134217728)throw new Error('logs-over-128MiB');const stat=fs.statSync(L.safe(source,x.file));if(!stat.isFile()||stat.size!==x.bytes)throw new Error('logs-actual-size-mismatch');const y=L.record(source,x.file);if(y.bytes!==x.bytes||y.sha256!==x.sha256)throw new Error('logs-file-mismatch:'+x.file);}
 const names=new Set([...m.files.map(x=>x.file),'logs-manifest.json']);if(L.walk(source).some(x=>!names.has(x)))throw new Error('unexpected-log-file');if(!names.has('result.json'))throw new Error('missing-local-result');return m;
}
function importLogs(source,destination,expected,packageSha){L.verifyPackage(L.ROOT,packageSha);const m=verifyLogs(source,expected),result=JSON.parse(fs.readFileSync(L.safe(source,'result.json')));if(result.package?.packageManifestSha256!==packageSha)throw new Error('different-package-run');const out=L.createOutput(destination);
 for(const file of [...m.files.map(x=>x.file),'logs-manifest.json'])L.write(out,'raw/'+file,fs.readFileSync(L.safe(source,file)));
 L.write(out,'import-review.json',{schema:'qa1b-local-import-v1',status:'IMPORTED-PENDING-INDEPENDENT-REVIEW',integrity:'MATCHED-EXTERNAL-ARGUMENT',claimedLocalStatus:result.status,sourceManifestSha256:expected,packageManifestSha256:packageSha,
   trust:'Matching hashes preserve bytes in transfer. JSON/logs do not prove authentic Chrome execution or grant source attestation; review raw CDP/contexts/response bodies/proxy/exit evidence independently.',E:'BLOCKED-UNBOUND',automaticContinuation:false});return {out,status:'IMPORTED-PENDING-INDEPENDENT-REVIEW'};
}
if(require.main===module){try{const a=L.parseArgs(process.argv.slice(2));if(Object.keys(a).some(x=>!['--logs','--destination','--expected-logs-manifest','--expected-manifest'].includes(x)))throw new Error('unknown-import-option');console.log(JSON.stringify(importLogs(path.resolve(a['--logs']??''),a['--destination'],a['--expected-logs-manifest'],a['--expected-manifest']),null,2));}catch(e){console.error(e.stack);process.exitCode=2;}}
module.exports={verifyLogs,importLogs};
