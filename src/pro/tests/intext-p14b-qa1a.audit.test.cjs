'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),vm=require('node:vm');
const C=require('./qa/intext-p14b-qa1a-converter.cjs'),R=require('./qa/intext-p14b-qa1a-offline.cjs');
const V=require('./qa/intext-p14b-qa1a-artifact-proof.cjs');
const E=require('./qa/intext-p14b-shadow-evaluator.cjs'),F=require('./qa/intext-p14b-qa0-fixtures.cjs');
const captured=require('./qa/intext-p14b-qa1a-captured-fixtures.json');
const root=path.resolve(__dirname,'..'),copy=x=>JSON.parse(JSON.stringify(x));
const context={captureLocalId:'legacy26',linkedRuntime:captured.cases[0].debug.runtime,linkedArm:'E0',metadataLinkVerified:true};
const convert=(value=captured.cases[0].qa,ctx=context)=>{const text=JSON.stringify(value);return C.convertExportV1({text,expectedSha256:C.hash(text),context:ctx});};
const integrated=result=>result.records.filter(r=>r.evidence.channel==='integration');
const temp=()=>fs.mkdtempSync(path.join(os.tmpdir(),'intext-qa1a-'));
const remove=dir=>{
  const resolved=fs.realpathSync(dir),base=fs.realpathSync(os.tmpdir());
  if(path.dirname(resolved)!==base||!path.basename(resolved).startsWith('intext-qa1a-'))throw Error('unsafe test cleanup');
  fs.rmSync(resolved,{recursive:true,force:true});
};
function artifactFixture(servedSha256=Object.keys(C.ARTIFACTS)[0]){
  const pinned=C.ARTIFACTS[servedSha256],q=copy(captured.cases[0].qa),d=copy(captured.cases[0].debug);
  q.arm=pinned.arm;q.logs.forEach(e=>e.arm=pinned.arm);q.logs[0].effectiveArm=pinned.arm;
  d.page={origin:'https://example.test',pathname:'/article'};
  const file=`intext-p14a-${pinned.arm}-${pinned.distribution==='_gam_kv_.js'?'gam':'manager'}.qa.js`;
  const body=fs.readFileSync(path.join(root,'tests/qa/generated',file));assert.equal(C.hash(body),servedSha256);
  const h={log:{entries:[{_resourceType:'document',request:{url:'https://example.test/article'},
    startedDateTime:new Date(d.logs[0].timestamp-1000).toISOString(),pageref:'p'},
    {request:{url:'https://example.test/gexp/'+pinned.distribution},pageref:'p',response:{content:{text:body.toString('base64'),encoding:'base64'}}}]}};
  const source=value=>{const text=JSON.stringify(value);return {text,sha256:C.hash(text)};};
  const qa=source(q),debug=source(d),har=source(h),receipt=R.capturedArtifactV1(har,d,pinned.arm).artifact;
  return {q,d,h,qa,debug,har,receipt,source};
}

test('QA1-A parser requires matching bytes/hash, supported observational schema and bounded JSON',()=>{
  assert.throws(()=>C.parseInputV1('{}','0'.repeat(64)),/hash_mismatch/);
  for(const value of [null,[],42]){const text=JSON.stringify(value);assert.throws(()=>C.parseInputV1(text,C.hash(text)),/plain_export/);}
  for(const value of [{schema:'other',logs:[]},{schema:'p13c-integration-observe-v1',qaOnly:false,enforce:false,logs:[]}]){
    const text=JSON.stringify(value);assert.throws(()=>C.parseInputV1(text,C.hash(text)),/unsupported|observational/);}
  assert.throws(()=>C.parseInputV1('x'.repeat(C.LIMITS.inputBytes+1),'0'.repeat(64)),/input_size/);
  assert.throws(()=>C.parseInputV1(null,'0'.repeat(64)),/input_size/);
  const text='{';assert.throws(()=>C.parseInputV1(text,C.hash(text)),SyntaxError);
  const x=copy(captured.cases[0].qa);x.logs=Array(10001).fill({});assert.throws(()=>convert(x),/log_limit/);
  const y=copy(captured.cases[0].qa);y.integration.logs=Array(10001).fill({});assert.throws(()=>convert(y),/integration_log_limit/);
  assert.throws(()=>convert(captured.cases[0].qa,{}),/capture_namespace/);
});
test('QA1-A cohorts follow runtime facts, never filenames or arm labels',()=>{
  assert.equal(C.cohortOf(captured.cases[0].debug.runtime),'Legacy');assert.equal(C.cohortOf(captured.cases[1].debug.runtime),'PSP');
  for(const runtime of [{},{dualMode:true,pspDetected:false,randomSource:'gpt-native-slot-targeting'},
    {dualMode:false,pspDetected:false,randomSource:'other'}])assert.equal(C.cohortOf(runtime),'unknown');
  const q=copy(captured.cases[0].qa);q.arm='E1';q.logs.forEach(e=>e.arm='E1');q.logs[0].effectiveArm='E1';assert.equal(C.armOf(q),'E1');
  assert.equal(convert(q).source.arm,'E1');assert.equal(convert(q).source.cohort,'Legacy');
  const p=convert(captured.cases[1].qa,{...context,linkedRuntime:captured.cases[1].debug.runtime});assert.equal(p.source.cohort,'PSP');
});
test('QA1-A fixed assignment conflict, missing or duplicate fixed events do not produce an arm',()=>{
  for(const change of [q=>q.logs.push({event:'assignment_conflict'}),q=>q.logs.push(copy(q.logs[0])),q=>q.logs.shift(),
    q=>q.logs[0].effectiveArm='E1',q=>q.logs[1].arm='E1',q=>q.arm='other']){
    const q=copy(captured.cases[0].qa);change(q);assert.equal(C.armOf(q),null);assert.equal(convert(q).source.arm,null);
  }
  assert.equal(C.armOf({}),null);
});
test('QA1-A metadata pairing needs two distinct exact diagnostic identities/timestamps',()=>{
  const {qa,debug}=captured.cases[0];assert.deepEqual(C.metadataLinkV1(qa,debug),{matched:true,exactDiagnosticMatches:2});
  const wrong=copy(debug);wrong.logs[0].args[0].timestamp++;assert.equal(C.metadataLinkV1(qa,wrong).matched,false);
  wrong.logs.push(copy(wrong.logs[1]));assert.equal(C.metadataLinkV1(qa,wrong).matched,false);
  const tokenMismatch=copy(debug);tokenMismatch.logs[1].args[0].renderToken=999;assert.equal(C.metadataLinkV1(qa,tokenMismatch).matched,false);
  assert.equal(C.metadataLinkV1(qa,captured.cases[1].debug).matched,false);assert.equal(C.metadataLinkV1({},debug).matched,false);
  assert.equal(C.metadataLinkV1({...qa,logs:null},debug).matched,false);
});
test('QA1-A unverified linkage never lends runtime or arm to a different source',()=>{
  const result=convert(captured.cases[0].qa,{...context,metadataLinkVerified:false});assert.equal(result.source.cohort,'unknown');
  assert.equal(result.source.arm,'E0');assert.equal(result.source.version,null);
  const debug=convert(captured.cases[0].debug,{...context,metadataLinkVerified:false});assert.equal(debug.source.arm,null);
  assert.equal(debug.source.cohort,'Legacy');assert.equal(debug.source.version,'2026.10.07-p1-ima-preload-first-frame');
});
test('QA1-A captured 0.225% anchor and offscreen measured player remain post-player partial observations',()=>{
  const r=integrated(convert())[0];assert.equal(r.evidence.event,'observer:attached');assert.equal(r.evidence.factualC0,true);
  assert.equal(r.sample.control.eligible,true);assert.equal(r.sample.stage,'after-player');assert.equal(r.sample.plannedRegions[0].quality,'partial');
  assert.equal(r.sample.plannedRegions[0].rect.top,1091.6624755859375);assert.equal(r.sample.plannedRegions[0].rect.height,350);
  assert.ok(Math.abs(r.evidence.anchorIntersectionRatio*100-0.2249755859375)<1e-12);
  assert.equal(r.sample.viewport.width,null);assert.equal(r.sample.viewport.height,null);
  assert.equal(r.sample.identity.fetchGeneration,null);assert.equal(r.sample.identity.anchorLocalId,null);assert.equal(r.sample.identity.navigationLocalId,null);
  assert.equal(r.sample.identity.verified,false);assert.ok(r.results.every(x=>x.status==='unknown'));
});
test('QA1-A direct C0 false survives; no geometry, outcome or reason can manufacture C0',()=>{
  const q=copy(captured.cases[0].qa),row=q.integration.logs[0];row.snapshot.readiness.eligible=false;
  const r=integrated(convert(q))[0];assert.equal(r.sample.control.eligible,false);assert.equal(r.evidence.factualC0,false);
  delete row.snapshot.readiness.eligible;row.event='core:first-frame';row.snapshot.readiness.reason='visible';row.snapshot.revealed=true;
  const unknown=integrated(convert(q))[0];assert.equal(unknown.sample.control.eligible,null);assert.equal(unknown.sample.control.observed,false);
});
test('QA1-A B0 uses frozen factual control contract but missing identity is never patched',()=>{
  const r=integrated(convert())[0];delete r.sample.plannedRegions;delete r.sample.viewport;
  assert.equal(E.evaluateP14BShadowV1(r.sample,{family:'B0'}).status,'unknown');
  assert.deepEqual(E.evaluateP14BShadowV1(r.sample,{family:'B0'}).reasons,['identity-unknown']);
  // Independent synthetic contract check; this identity is never added to converted evidence.
  const trusted=F.makeSample();trusted.control=r.sample.control;delete trusted.plannedRegions;delete trusted.viewport;
  assert.equal(E.evaluateP14BShadowV1(trusted,{family:'B0'}).status,'pass');assert.equal(r.sample.identity.verified,false);
});
test('QA1-A debugger retains nav, epoch and viewport height without joining clocks or inventing P/C0',()=>{
  const result=convert(captured.cases[0].debug),r=result.records.find(r=>r.evidence.event==='video_activation_eligible');
  assert.equal(r.sample.stage,'before-player');assert.equal(r.sample.identity.navigationLocalId,'nav0');
  assert.equal(r.sample.monotonicMs,null);assert.equal(r.sample.sourceClock,null);assert.equal(r.evidence.temporalQuality,'epoch-only');
  assert.equal(r.evidence.epochMs,1793035035303);assert.equal(r.sample.viewport.height,922);assert.equal(r.sample.viewport.width,null);
  assert.equal(r.sample.plannedRegions.length,0);assert.equal(r.evidence.factualC0,null);assert.equal(r.evidence.readinessReason,null);
});
test('QA1-A no later viewport or fabricated Q1-Q5 can qualify a measured snapshot retroactively',()=>{
  const q=copy(captured.cases[0].qa);q.integration.logs[0].snapshot.viewport={width:412,height:922};
  q.integration.logs[0].snapshot.quality='measured';q.integration.logs[0].snapshot.Q1=true;
  const r=integrated(convert(q,{...context,timeOrigin:1793035022826}))[0];
  assert.equal(r.sample.viewport.height,null);assert.equal(r.sample.plannedRegions[0].quality,'partial');
  assert.equal(r.sample.layoutRevision,null);assert.equal(r.results.find(x=>x.candidateId==='B1').status,'unknown');
  assert.equal(r.sample.monotonicMs,q.integration.logs[0].monotonicMs);
});
test('QA1-A native impressions remain native observations, never frame proof or visibility',()=>{
  const result=convert(),r=integrated(result).find(r=>r.evidence.event==='ima:IMPRESSION');assert.ok(r);
  assert.equal(r.evidence.nativeImpressionObserved,true);assert.equal(r.facts.impressionObserved,true);
  assert.ok(r.evidence.observedManagerId>0);assert.equal(r.evidence.frameAttribution,'unknown');assert.equal(r.evidence.perceptibility,'unknown');
  for(const row of result.records){assert.equal(row.facts.frame,undefined);assert.equal(row.sample.adMediaBinding,undefined);}
  const q=copy(captured.cases[0].qa);q.integration.logs.find(r=>r.event==='ima:IMPRESSION').tokenMatches=false;
  assert.equal(integrated(convert(q)).find(r=>r.evidence.event==='ima:IMPRESSION').facts.impressionObserved,undefined);
});
test('QA1-A STARTED, IMPRESSION, COMPLETE and core:first-frame never upgrade frame attribution',()=>{
  for(const event of ['ima:STARTED','ima:IMPRESSION','ima:COMPLETE','core:first-frame','media:playing','media:canplay']){
    const q=copy(captured.cases[0].qa),row=q.integration.logs[0];row.event=event;
    row.snapshot.frame={observed:true,media:'ad',source:'request-video-frame-callback',presentedFrames:1};
    const r=integrated(convert(q))[0];assert.equal(r.facts.frame,undefined);assert.equal(r.sample.adMediaBinding,undefined);
    assert.equal(r.evidence.frameAttribution,'unknown');
  }
});
test('QA1-A epoch-only and regressing clocks are explicit; sequence is neither reordered nor reconstructed',()=>{
  const q=copy(captured.cases[0].qa);q.integration.logs[0].monotonicMs=100;q.integration.logs[1].monotonicMs=99;
  let r=integrated(convert(q));assert.equal(r[1].evidence.temporalQuality,'regression');assert.equal(r[1].sample.source.consistent,false);
  assert.equal(r[1].sample.coverage.sourceGap,true);assert.equal(r[0].evidence.epochMs,q.integration.logs[0].timestamp);
  for(const v of [null,-1]){q.integration.logs[0].monotonicMs=v;r=integrated(convert(q));assert.equal(r[0].sample.monotonicMs,null);}
  delete q.integration.logs[0].sequence;r=integrated(convert(q));assert.equal(r[0].sample.sampleSequence,null);
});
test('QA1-A snapshot duplicates and left censor do not become population counts or exact rates',()=>{
  const q=copy(captured.cases[0].qa);q.integration.logs.push(copy(q.integration.logs[0]));const result=convert(q);
  assert.equal(result.accounting.notAdmittedToLedger,result.records.length);assert.equal(result.accounting.ledger.summaries.length,0);
  assert.equal(result.accounting.ledger.windowStartObservedMs,null);assert.equal(result.accounting.ledger.windowEndMs,null);
  assert.equal(result.accounting.windowQuality,'unknown');
  for(const d of ['D0','Dv','Dc'])assert.equal(result.accounting.ledger.totals[d].complete,false);
  for(const rate of Object.values(result.accounting.ledger.rates)){assert.equal(rate.value,null);assert.equal(rate.exactRatesAllowed,false);}
  assert.ok(result.records.every(r=>r.sample.coverage.leftCensored));assert.equal(result.guarantees.exactRates,false);
});
test('QA1-A positive drops, unknown drop counts and absent integration preserve coverage gaps',()=>{
  for(const change of [q=>q.dropped=1,q=>delete q.dropped,q=>q.integration.dropped=2,q=>delete q.integration.dropped,q=>delete q.integration]){
    const q=copy(captured.cases[0].qa);change(q);const r=convert(q);assert.ok(r.source.losses.length);
    assert.ok(r.records.every(row=>row.sample.coverage.sourceGap));assert.equal(r.accounting.ledger.coverage.exactRatesAllowed,false);
  }
  const d=copy(captured.cases[0].debug);d.logs[0].args=null;
  assert.ok(convert(d).source.losses.includes('debugger-metric-args-unavailable'));
});
test('QA1-A partition identity preserves arm/cohort/version/source and never merges equal local tokens',()=>{
  const a=convert(),b=convert(captured.cases[1].qa,{...context,captureLocalId:'psp26',linkedRuntime:captured.cases[1].debug.runtime});
  assert.notEqual(a.source.partitionKey,b.source.partitionKey);assert.notEqual(a.records[0].sample.identity.documentLocalId,b.records[0].sample.identity.documentLocalId);
  assert.equal(a.source.cohort,'Legacy');assert.equal(b.source.cohort,'PSP');
  assert.equal(a.records[0].sample.identity.renderToken,b.records[0].sample.identity.renderToken);
  const unlinked=convert(captured.cases[0].qa,{...context,linkedRuntime:{}});assert.equal(unlinked.source.version,null);assert.equal(unlinked.source.cohort,'unknown');
});
test('QA1-A stale and terminal tokens remain explicit without inventing verified identity',()=>{
  const q=copy(captured.cases[0].qa);q.integration.logs[0].activeRenderToken=999;q.integration.logs[0].tokenMatches=false;
  let r=integrated(convert(q))[0];assert.equal(r.sample.identity.state,'stale');assert.equal(r.sample.identity.activeRenderToken,999);
  assert.equal(r.sample.identity.verified,false);assert.equal(r.results[0].status,'unknown');
  q.integration.logs[0].snapshot.destroyed=true;q.integration.logs[0].snapshot.playerSurface.connected=null;
  r=integrated(convert(q))[0];assert.equal(r.sample.identity.state,'terminal');assert.equal(r.sample.plannedRegions[0].evidence.wrapperConnected,null);
  assert.equal(r.facts.terminal,undefined);assert.equal(r.facts.frame,undefined);
});
test('QA1-A source winner/fetch facts remain partial records with no synthesized population',()=>{
  const d=copy(captured.cases[0].debug),m=d.logs[0].args[0];m.metric='intext_winner_resolved';m.winnerFormat='display';
  let result=convert(d);assert.equal(result.records[0].facts.initialWinner,'display');assert.equal(result.records[0].facts.fetchObserved,undefined);
  m.winnerFormat='unresolved';result=convert(d);assert.equal(result.records[0].facts.initialWinner,undefined);
  m.metric='video_fetch_started';result=convert(d);assert.equal(result.records[0].facts.fetchObserved,true);
  assert.equal(result.accounting.ledger.totals.D0.complete,false);assert.equal(result.accounting.ledger.summaries.length,0);
});
test('QA1-A combined source record limit rejects excess observations rather than silently truncating',()=>{
  const q=copy(captured.cases[0].qa);q.logs=Array(6000).fill({event:'video_winner_resolved',slotId:'slotOne'});
  q.integration.logs=Array(4001).fill({event:'observer:coverage'});assert.throws(()=>convert(q),/record_limit/);
});
test('QA1-A distribution receipts are pinned per arm and preserve both distributions independently',()=>{
  for(const [servedSha256,pinned]of Object.entries(C.ARTIFACTS)){
    const f=artifactFixture(servedSha256),checked=V.verifyHarArtifactV2(f);assert.equal(checked.status,'local-bytes-verified');
    const ctx={...context,artifact:f.receipt,artifactProof:checked.proof};
    const r=convert(f.q,ctx);assert.equal(r.source.distribution,pinned.distribution);assert.equal(r.source.servedSha256,servedSha256);
    assert.equal(convert(f.q,{...ctx,artifact:{...f.receipt,servedSha256:'f'.repeat(64)}}).source.distribution,null);
    assert.equal(convert(f.q,{...ctx,artifact:{...f.receipt,coreSha256:'f'.repeat(64)}}).source.distribution,null);
    assert.equal(convert(f.q,{...context,artifact:{...f.receipt,verified:true}}).source.distribution,null);
  }
});
test('QA1-A unknown and sensitive fields cannot enter converted exports, IDs or event names',()=>{
  const q=copy(captured.cases[0].qa);q.url='https://secret.test/TOKEN';q.cookie='SECRET';
  q.integration.logs[0].snapshot.xml='<VAST>SECRET</VAST>';q.integration.logs[0].snapshot.targeting={key:'SECRET'};
  q.integration.logs[0].event='SECRET';q.integration.logs[0].slotId='https://secret.test';
  const r=convert(q);assert.equal(integrated(r)[0].sample.identity.slotLocalId,null);assert.equal(integrated(r)[0].evidence.event,'other');
  const json=JSON.stringify(r);for(const s of ['SECRET','https://','<VAST>','cookie','targeting'])assert.ok(!json.includes(s));
  const again=convert(q);assert.deepEqual(r,again);r.records[0].sample.control.eligible='changed';assert.deepEqual(convert(q),again);
});
test('QA1-A standalone integration is recognized without borrowing an arm or runtime',()=>{
  const r=convert(captured.cases[0].qa.integration,{captureLocalId:'historical'});assert.equal(r.source.kind,'integration');
  assert.equal(r.source.arm,null);assert.equal(r.source.cohort,'unknown');assert.equal(r.records.length,3);
  assert.ok(r.records.every(r=>r.evidence.channel==='integration'));
});
test('QA1-A local file runner enforces file limits/basenames and records missing inputs',()=>{
  const dir=temp();try{
    assert.equal(R.readSource(dir,'absent.json',100),null);assert.throws(()=>R.readSource(dir,'../input.json',100),/basename/);
    fs.writeFileSync(path.join(dir,'input.json'),'{}');assert.throws(()=>R.readSource(dir,'input.json',1),/file_limit/);
    assert.equal(R.readSource(dir,'input.json',2).sha256,C.hash('{}'));
    const result=R.analyzeDirectoryV1(dir);assert.equal(result.cases.length,10);assert.equal(result.conversions.length,0);
    assert.ok(result.cases.every(c=>c.status==='input-missing'));
  }finally{remove(dir);}
});
test('QA1-A captured bundle proof hashes a body without executing it and requires document correlation',()=>{
  const body=fs.readFileSync(path.join(root,'tests/qa/generated/intext-p14a-E0-gam.qa.js'),'utf8');
  const debug={page:{origin:'https://example.test',pathname:'/article'},logs:[{timestamp:1000},{timestamp:2000}]};
  const harValue={log:{entries:[{_resourceType:'document',request:{url:'https://example.test/article'},startedDateTime:new Date(0).toISOString(),pageref:'p'},
    {request:{url:'https://example.test/gexp/_gam_kv_.js'},pageref:'p',response:{content:{text:Buffer.from(body).toString('base64'),encoding:'base64'}}}]}};
  const har=()=>{const text=JSON.stringify(harValue);return {text,sha256:C.hash(text)};};
  assert.equal(R.capturedArtifactV1(har(),debug,'E0').artifact.distribution,'_gam_kv_.js');
  assert.equal(R.capturedArtifactV1(har(),debug,'E1').artifact,null);
  assert.equal(R.capturedArtifactV1(null,debug,'E0').reason,'HAR-unavailable');
  harValue.log.entries[1].response.content.text='unrecognized body';delete harValue.log.entries[1].response.content.encoding;
  assert.equal(R.capturedArtifactV1(har(),debug,'E0').artifact,null);
  harValue.log.entries[0].pageref=null;assert.equal(R.capturedArtifactV1(har(),debug,'E0').reason,'HAR-document-correlation-insufficient');
});
test('QA1-A explicit runner writes only new QA1-A result names and leaves unrelated files intact',()=>{
  const dir=temp();try{
    fs.writeFileSync(path.join(dir,'A2-E0-debug.json'),JSON.stringify(captured.cases[0].qa));
    fs.writeFileSync(path.join(dir,'A2-E0.json'),JSON.stringify(captured.cases[0].debug));
    fs.writeFileSync(path.join(dir,'protected.txt'),'keep');
    const result=R.analyzeDirectoryV1(dir);assert.equal(result.conversions.length,2);assert.equal(result.cases[0].metadataLink.matched,true);
    R.writeResultsV1(result,dir);assert.equal(fs.readFileSync(path.join(dir,'protected.txt'),'utf8'),'keep');
    const json=JSON.parse(fs.readFileSync(path.join(dir,'intext-p14b-qa1a-results.json'),'utf8'));assert.equal(json.conversions,undefined);
    assert.equal(R.summarizeConversionV1(result.conversions[0]).attributedFrames,0);
    fs.writeFileSync(path.join(dir,'A2-E0-debug.json'),JSON.stringify(captured.cases[0].debug));
    assert.throws(()=>R.analyzeDirectoryV1(dir),/input_role_mismatch/);
  }finally{remove(dir);}
});
test('QA1-A converter runs with browser/network/timer/process globals inaccessible',()=>{
  const context=vm.createContext({}),cache=new Map();let reads=0;
  for(const name of ['window','document','google','googletag','fetch','XMLHttpRequest','setTimeout','setInterval','performance','process'])
    Object.defineProperty(context,name,{get(){reads++;throw Error('forbidden '+name);}});
  function load(file){if(cache.has(file))return cache.get(file).exports;const mod={exports:{}};cache.set(file,mod);
    const text=fs.readFileSync(path.join(__dirname,'qa',file),'utf8');
    vm.runInContext('(function(require,module,exports){'+text+'\n})',context)(name=>{
      if(name==='node:crypto'||name==='node:buffer')return require(name);
      if(/^\.\/intext-p14b-(data|shadow-evaluator|shadow-ledger|qa1a-artifact-proof)\.cjs$/.test(name))return load(name.slice(2));throw Error('invalid import '+name);
    },mod,mod.exports);return mod.exports;}
  context.converter=load('intext-p14b-qa1a-converter.cjs');context.text=JSON.stringify(captured.cases[0].qa);
  const result=vm.runInContext('converter.convertExportV1({text,expectedSha256:converter.hash(text),context:{captureLocalId:"vmCase"}})',context);
  assert.equal(result.source.kind,'dependencies');assert.equal(result.accounting.status,'coverage-insufficient');assert.equal(reads,0);
});
test('P2.1 a forged verified flag and hash-shaped receipt never suffice without raw byte proof',()=>{
  const f=artifactFixture();
  for(const artifact of [f.receipt,{...f.receipt,verified:true},{...f.receipt,verified:true,evidenceSha256:'f'.repeat(64)},
    {...f.receipt,attestationSchema:'externally-verified',verified:true}]){
    const r=convert(f.q,{...context,artifact});assert.equal(r.source.distribution,null);
    assert.equal(r.source.artifactProvenance.status,'attestation-not-corroborated');assert.equal(r.source.artifactProvenance.receiptFlagIsProof,false);
  }
  assert.equal(V.verifyHarArtifactV2({receipt:f.receipt}).status,'not-verified');
});
test('P2.1 local proof recomputes HAR and export bytes; it does not certify an external review',()=>{
  const f=artifactFixture(),proof=V.verifyHarArtifactV2(f);assert.equal(proof.status,'local-bytes-verified');
  assert.equal(proof.externalIndependentAudit,'not-performed');assert.equal(proof.evidence.exactDiagnosticMatches,2);
  const r=convert(f.q,{...context,artifact:f.receipt,artifactProof:proof.proof});assert.equal(r.source.artifactProvenance.status,'local-bytes-verified');
  assert.equal(r.source.artifactProvenance.externalIndependentAudit,'not-performed');
  for(const verified of [false,true])assert.equal(convert(f.q,{...context,artifact:{...f.receipt,verified},artifactProof:proof.proof}).source.distribution,'_gam_kv_.js');
});
test('P2.1 incompatible arm, distribution, core, body, HAR hash or index receipts are rejected',()=>{
  const f=artifactFixture();
  for(const patch of [{arm:'E1'},{distribution:'IntextManager.js'},{coreSha256:'a'.repeat(64)},
    {servedSha256:'b'.repeat(64)},{evidenceSha256:'c'.repeat(64)},{entryIndex:999}]){
    const receipt={...f.receipt,...patch};assert.equal(V.verifyHarArtifactV2({...f,receipt}).status,'not-verified');
    const checked=V.verifyHarArtifactV2(f);assert.equal(convert(f.q,{...context,artifact:receipt,artifactProof:checked.proof}).source.distribution,null);
  }
});
test('P2.1 proof cannot be forged by JSON serialization or replayed onto different source bytes',()=>{
  const f=artifactFixture(),checked=V.verifyHarArtifactV2(f),ctx={...context,artifact:f.receipt};
  for(const proof of [{kind:'qa1a-local-har-proof-v2'},copy(checked.proof),{...checked.proof,status:'verified'}])
    assert.equal(convert(f.q,{...ctx,artifactProof:proof}).source.distribution,null);
  const text=f.qa.text+' ';assert.equal(C.convertExportV1({text,expectedSha256:C.hash(text),context:{...ctx,artifactProof:checked.proof}}).source.distribution,null);
  const patched=copy(f.q);patched.logs.push({event:'another'});assert.equal(convert(patched,{...ctx,artifactProof:checked.proof}).source.distribution,null);
});
test('P2.1 changed bytes, wrong recording, incompatible document and ambiguous body do not validate',()=>{
  const f=artifactFixture();
  for(const key of ['qa','debug','har'])assert.equal(V.verifyHarArtifactV2({...f,[key]:{...f[key],sha256:'0'.repeat(64)}}).status,'not-verified');
  const changed=copy(f.h);changed.log.entries[1].response.content.text=Buffer.from('wrong bytes').toString('base64');
  assert.equal(V.verifyHarArtifactV2({...f,har:f.source(changed)}).status,'not-verified');
  const wrong=copy(f.d);wrong.logs[0].args[0].timestamp++;assert.equal(V.verifyHarArtifactV2({...f,debug:f.source(wrong)}).status,'not-verified');
  const wrongDoc=copy(f.h);wrongDoc.log.entries[0].request.url='https://example.test/other';assert.equal(V.verifyHarArtifactV2({...f,har:f.source(wrongDoc)}).status,'not-verified');
  const duplicate=copy(f.h);duplicate.log.entries.push(copy(duplicate.log.entries[1]));assert.equal(V.verifyHarArtifactV2({...f,har:f.source(duplicate)}).status,'not-verified');
});
test('P2.2 rectPresent, rectComplete and rectUsable are distinct and preserve invalid numeric data',()=>{
  for(const [value,present,complete,usable]of [
    [undefined,false,false,false],[null,false,false,false],[{},true,false,false],
    [{left:1,top:2,width:null,height:4},true,false,false],
    [{left:1,top:2,width:0,height:4},true,true,false],
    [{left:1,top:2,width:-3,height:4},true,true,false],
    [{left:1,top:2,width:3,height:4},true,true,true],
  ]){const r=C.rectStatusV2(value);assert.deepEqual([r.rectPresent,r.rectComplete,r.rectUsable],[present,complete,usable]);
    if(present)assert.equal(r.original.width.value,value.width??null);}
});
test('P2.2 NaN, infinity, missing values, nonpositive sizes and unrepresentable rectangles are unusable',()=>{
  for(const key of ['left','top','width','height'])for(const value of [null,undefined,NaN,Infinity,-Infinity]){
    const rect={left:1,top:2,width:3,height:4,[key]:value},r=C.rectStatusV2(rect);assert.equal(r.rectUsable,false);assert.equal(r.rectComplete,false);
    assert.equal(r.rect[key],null);if(typeof value==='number')assert.equal(r.original[key].type,'number');
  }
  for(const rect of [{left:0,top:0,width:-0,height:1},{left:0,top:0,width:1,height:-1},
    {left:Number.MAX_VALUE,top:0,width:Number.MAX_VALUE,height:1},
    {left:0,top:0,width:Number.MAX_VALUE,height:Number.MAX_VALUE},{left:0,top:0,width:Number.MIN_VALUE,height:Number.MIN_VALUE}])assert.equal(C.rectStatusV2(rect).rectUsable,false);
  assert.equal(C.rectStatusV2({left:0,top:0,width:-0,height:1}).original.width.numberState,'-0');
});
test('P2.2 incomplete rectangles are not repaired from right/bottom or converted numeric strings',()=>{
  const rect={left:1,top:2,right:10,bottom:20,height:18};let r=C.rectStatusV2(rect);assert.equal(r.rectComplete,false);assert.equal(r.rect.width,null);
  assert.equal(r.original.right.value,10);assert.equal(r.original.width.type,'missing');
  r=C.rectStatusV2({...rect,width:'9'});assert.equal(r.rectComplete,false);assert.equal(r.original.width.value,'9');assert.equal(r.rect.width,null);
  const secret=C.rectStatusV2({...rect,width:'https://secret.test/SECRET'});assert.equal(secret.original.width.redacted,true);assert.ok(!JSON.stringify(secret).includes('SECRET'));
});
test('P2.2 unusable measured geometry remains in its source stage with original values and no promotion',()=>{
  const q=copy(captured.cases[0].qa);q.integration.logs[0].snapshot.playerSurface.rect.width=-7;
  const r=integrated(convert(q))[0];assert.equal(r.evidence.playerRect.rectPresent,true);assert.equal(r.evidence.playerRect.rectComplete,true);
  assert.equal(r.evidence.playerRect.rectUsable,false);assert.equal(r.sample.plannedRegions[0].rect.width,-7);
  assert.equal(r.evidence.playerRect.original.width.value,-7);assert.equal(r.sample.stage,'after-player');assert.equal(r.sample.plannedRegions[0].quality,'partial');
  assert.equal(r.results.find(x=>x.candidateId==='B1').status,'unknown');
});
test('P2.3 unknown event names and prototype keys cannot acquire demonstrated stages',()=>{
  for(const name of ['unlisted','player:unlisted','ima:UNLISTED','core:unlisted','observer:unlisted','constructor','toString','__proto__']){
    const q=copy(captured.cases[0].qa),row=q.integration.logs[0];row.event=name;row.stage='post-reveal';row.installationStage='after-videojs-before-ima';
    const r=integrated(convert(q))[0];assert.equal(r.sample.stage,'unknown');assert.equal(r.evidence.geometryStage,'unknown');
    assert.equal(r.evidence.stageEvidence.status,'unknown');assert.equal(r.sample.plannedRegions[0].context.stage,'unknown');
    assert.ok(r.evidence.unknownReasons.includes('temporal-stage-not-accredited'));
  }
});
test('P2.3 explicit producer events retain their supported classifications without temporal inference',()=>{
  for(const [name,stage]of [['observer:attached','after-player'],['core:first-frame','after-player'],['ima:IMPRESSION','after-player'],
    ['player:ads-request','post-request'],['core:revealed','post-reveal'],['ima:STARTED:microtask','after-player']]){
    assert.equal(C.stageV2(name,'integration'),stage);const q=copy(captured.cases[0].qa);q.integration.logs[0].event=name;
    const r=integrated(convert(q))[0];assert.equal(r.sample.stage,stage);assert.equal(r.evidence.stageEvidence.status,'producer-event-map-v2');
  }
  assert.equal(C.stageV2('video_activation_eligible','debugger'),'before-player');assert.equal(C.stageV2('unlisted','debugger'),'unknown');
  assert.equal(C.stageV2('observer:attached','dependencies'),'unknown');
  assert.equal(C.stageV2('player:dispose:microtask','integration'),'unknown');
  assert.equal(C.stageV2('media:playing:microtask','integration'),'unknown');
});
test('P2.3 known neighboring samples cannot lend their stage to an unknown event',()=>{
  const q=copy(captured.cases[0].qa);q.integration.logs[1].event='unknown-between-known';q.integration.logs[1].snapshot.revealed=true;
  const rows=integrated(convert(q));assert.equal(rows[0].sample.stage,'after-player');assert.equal(rows[1].sample.stage,'unknown');
  assert.equal(rows[1].evidence.playerRect.rectPresent,true);assert.equal(rows[1].sample.plannedRegions[0].quality,'partial');
  assert.equal(rows[1].facts.frame,undefined);assert.equal(rows[1].sample.identity.verified,false);
});

test('All 345 pre-existing files including approved QA0 retain their bytes in the complete workspace',()=>{
  const before=JSON.parse(fs.readFileSync(path.join(root,'docs/intext-p14b-qa1a-protected-before.json'),'utf8'));
  assert.equal(before.files.length,345);for(const f of before.files){const bytes=fs.readFileSync(path.join(root,f.file));assert.equal(bytes.length,f.bytes,f.file);
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),f.sha256,f.file);}
});
