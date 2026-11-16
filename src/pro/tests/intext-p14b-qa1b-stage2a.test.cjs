'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const G=require('./qa/qa1b2a/generator.cjs');
const H=require('./qa/qa1b2a/harness.cjs');
const {facade}=require('./qa/qa1b2a/facade.cjs');
const {createNativeOffline}=require('./qa/qa1b2a/native.cjs');
const {PARTITION}=require('./qa/qa1b/adapter.cjs');
const P=require('./qa/qa1b/packet.cjs');
const totals=s=>s.native.exportManual().qa0.totals;
const numeric=s=>Object.fromEntries(Object.entries(totals(s)).map(([k,v])=>[k,v.yes]));
const qa=s=>s.native.exportManual().qa0;
function bounds(s){const e=s.native.exportManual(),m=e.memory,l=m.limits;
  for(const k of ['summaryBytes','qa0AggregateBytes','qa0RingBytes','metadataBytes','packetRingBytes'])assert.ok(m[k]<=l[k],`${k} ${m[k]} > ${l[k]}`);
  assert.ok(m.detailEntries<=2000);assert.ok(Object.keys(m).filter(k=>k.endsWith('Bytes')).reduce((n,k)=>n+m[k],0)<=2097152);
  assert.deepEqual(qa(s).coverage.sourceComplete,{D0:false,Dv:false,Dc:false,outcomes:false});
  for(const r of Object.values(qa(s).rates)){assert.equal(r.value,null);assert.equal(r.exactRatesAllowed,false);}
  return e;
}
async function paired(distribution,run,opts={}){
  const original=H.env(distribution,{...opts,copy:false}),copy=H.env(distribution,opts);
  const a=await run(original),b=await run(copy);
  assert.deepEqual(P.clone(copy.trace),P.clone(original.trace));assert.deepEqual(b,a);return {original,copy};
}
for(const d of H.distributions){
  test(`${d}: exact build, syntax-only full copy, inverse bytes, inert endpoint`,()=>{
    const s=H.source(d);assert.equal(G.hash(s.base),P.CORES[d]);new vm.Script(s.copy.toString('utf8'));
    assert.deepEqual(G.restore(s.copy,s.manifest),s.base);assert.equal(s.manifest.endpoint,'null');
    assert.ok(s.copy.toString().startsWith(s.manifest.prefix));assert.ok(s.manifest.prefix.endsWith('(null);\n'));
    assert.equal(s.manifest.edits.length,18);
  });
  test(`${d}: base/copy/manifest divergence and forged build proof fail closed`,()=>{
    const s=H.source(d),bad=Buffer.from(s.base);bad[bad.length-1]^=1;
    assert.throws(()=>G.build(d,bad),/base-hash/);
    const copy=Buffer.from(s.copy);copy[copy.length-1]^=1;
    assert.throws(()=>G.verifyCopy(d,s.base,copy),/unverified-copy/);
    assert.throws(()=>G.restore(copy,s.manifest),/copy-diverged/);
    const manifest=P.clone(s.manifest);manifest.edits[0].after+='x';assert.throws(()=>G.restore(s.copy,manifest),/reverse-anchor/);
    assert.throws(()=>createNativeOffline({buildCapability:{...G.describe(s.capability)},document:{},clock:()=>0}),/capability/);
  });
  test(`${d}: all commercial source bytes outside declared edit methods are identical`,()=>{
    const s=H.source(d);let a=s.base.toString(),b=s.copy.toString().slice(s.manifest.prefix.length);
    // Independent removal of complete methods; no generator inverse used by this oracle.
    for(const e of [...s.manifest.edits].reverse())a=a.slice(0,e.start)+`<${e.className}.${e.method}>`+a.slice(e.end);
    for(const e of [...s.manifest.edits].reverse()){const m=G.method(b,e.className,e.method);b=b.slice(0,m.start)+`<${e.className}.${e.method}>`+b.slice(m.end);}
    assert.equal(b,a);
    for(const e of s.manifest.edits){assert.equal((e.after.match(/\bawait\b/g)||[]).length,(e.before.match(/\bawait\b/g)||[]).length);
      for(const call of ['setTimeout','setInterval','addEventListener','requestAds','initVideoJS','setupIma','requestAnimationFrame'])assert.equal((e.after.match(new RegExp(`\\b${call}\\(`,'g'))||[]).length,(e.before.match(new RegExp(`\\b${call}\\(`,'g'))||[]).length);}
  });
  test(`${d}: native fetch/winner/token/guard through extracted methods and real QA0`,async()=>{
    const {copy:s}=await paired(d,async h=>{await h.start();return h.activation.call(h.creative);});
    assert.deepEqual(numeric(s),{D0:1,Dv:1,Dc:1});
    const guards=s.native.exportManual().entries.filter(e=>e.packet.kind==='guard');
    assert.deepEqual(guards.map(e=>e.packet.caller),['W4','C1']);
    assert.ok(guards.every(e=>e.receipt.acceptanceA==='valid'&&e.receipt.candidateB0==='pass'));
    assert.equal(qa(s).summaries.length,1);assert.equal(qa(s).summaries[0].firstControlToken,1);
    assert.equal(guards[0].packet.evidence.P,'unknown');assert.equal(guards[0].packet.stage,'before-player');bounds(s);
    const S=require('./qa/qa1b2a/native-schema.cjs');for(const e of s.native.exportManual().entries)assert.equal(S.conforms(e.packet),true);
  });
  test(`${d}: B0 true/false with P unknown; W2/W3/W4/C1 one opportunity and first positive`,async()=>{
    const s=H.env(d);await s.start();assert.equal(s.guard('W2',false).candidateB0,'fail');
    for(const caller of ['W2','W3','W4','C1'])assert.equal(s.guard(caller,true).candidateB0,'pass');
    assert.deepEqual(numeric(s),{D0:1,Dv:1,Dc:1});assert.equal(qa(s).summaries.length,1);
    assert.equal(qa(s).summaries[0].censor.left,false);assert.equal(qa(s).summaries[0].firstControlAt,15);
    assert.ok(s.native.exportManual().entries.filter(e=>e.packet.kind==='guard').every(e=>e.packet.evidence.P==='unknown'));
  });
  test(`${d}: W1 Display true remains Display and never adds Dc`,async()=>{
    const s=H.env(d);await s.start();const r=s.guard('W1',true);
    assert.equal(r.series,'display');assert.equal(r.acceptanceA,'not-admitted');assert.equal(totals(s).Dc.yes,0);
    const p=s.native.latestPacket();assert.equal(p.format,'display');assert.equal(p.caller,'W1');
  });
  test(`${d}: native preparation descriptor alone never invents an initial video winner`,async()=>{
    const s=H.env(d);s.waterfall.runPrebidPhase=async()=>{throw new Error('prebid-failure');};
    await s.waterfall.original_startFetch.call(s.waterfall,'offline');s.node.beginVisualRender('render_started');
    s.native.endpoint('preparation',s.waterfall,s.node,{winner:'video'},{});
    assert.equal(s.guard('W2').candidateB0,'pass');assert.equal(totals(s).Dv.yes,0);assert.equal(totals(s).Dv.unknown,1);
    assert.equal(qa(s).summaries[0].winner,'unknown');assert.ok(qa(s).coverage.flags.sourceGap);
  });
  test(`${d}: exact original native decision display / null (none), no video winner inference`,async()=>{
    for(const winner of ['display',null]){const s=H.env(d);await s.start(winner);s.guard('W2');
      assert.equal(qa(s).summaries[0].winner,winner??'none');assert.equal(totals(s).Dv.yes,0);assert.equal(totals(s).Dc.yes,0);}
  });
  test(`${d}: local original object authority, foreign registration and JSON verified fields denied before counts`,async()=>{
    const a=H.env(d),b=H.env(d);await a.start();await b.start();a.guard('W2');
    const packet=a.native.latestPacket(),before=numeric(b);
    assert.notEqual(packet.identity.documentLocalId,b.native.exportManual().metadata.documentLocalId);
    assert.equal(packet.identity.slotLocalId,b.native.latestPacket().identity.slotLocalId); // deliberately equal local aliases
    for(const p of [packet,P.clone(packet),{identity:{verified:true},ownership:{verified:true},provenance:{verified:true}},new Proxy({}, {get(){throw new Error('getter');}})]){
      assert.equal(b.native.ingest(p).accepted,false);assert.deepEqual(numeric(b),before);
    }
    assert.equal(qa(b).summaries[0].firstControlAt,null);assert.ok(qa(b).coverage.flags.sourceGap);
    assert.equal(a.native.ingest(packet).duplicate,true);assert.equal(a.guard('W2').duplicate,false);
    assert.equal(qa(a).summaries.length,1);assert.equal(qa(a).summaries[0].results[0].pass,2);
  });
  test(`${d}: Stage I fixture authority and native authority are disjoint`,async()=>{
    const s=H.env(d),f=require('./qa/qa1b/fixtures.cjs').session(d);await s.start();f.start();
    const packet=f.packet();assert.equal(s.native.ingest(packet).accepted,false);s.guard('W2');
    assert.equal(f.adapter.ingest(s.native.latestPacket()).accepted,false);
  });
  test(`${d}: stale result/token, handoff and owner retirement cannot make positives`,async()=>{
    const s=H.env(d);await s.start();s.guard('W2',false);const old=s.native.latestPacket();
    const result=s.node.getReadinessViewportState();s.node.beginVisualRender('render_started');
    s.native.endpoint('wait',s.node,1,'buildAndPlayVideo:capacity-or-legacy',null,result);
    assert.equal(totals(s).Dc.yes,0);assert.equal(s.native.ingest(old).accepted,false);
    s.native.endpoint('creative',s.node,s.creative,s.node._activeRenderToken);s.guard('W3',false);
    const owned=s.native.latestPacket();s.method('IntextVideoCreative','destroy').call(s.creative);
    assert.equal(s.native.ingest(owned).accepted,false);assert.equal(s.guard('C1'),undefined);assert.equal(totals(s).Dc.yes,0);
  });
  test(`${d}: cleanup, navigation and cycle genealogy revoke rather than reconstruct`,async()=>{
    const s=H.env(d);await s.start();s.guard('W2',false);const old=s.native.latestPacket();
    s.waterfall.original_cleanup.call(s.waterfall);assert.equal(s.native.ingest(old).accepted,false);
    await s.start();s.guard('W2');assert.equal(qa(s).summaries.length,2);assert.deepEqual(numeric(s),{D0:2,Dv:2,Dc:1});
    assert.notEqual(qa(s).summaries[0].currentFetchGeneration,qa(s).summaries[1].currentFetchGeneration);
    const e={},p={},n={};s.native.endpoint('root',e,s.document,{});s.native.endpoint('placements',e,[p]);s.native.endpoint('node',n,{},p,s.document,0);
    const wf={};s.native.endpoint('fetch-begin',wf,n,1);s.native.endpoint('cycle',n,1);s.native.endpoint('anchor',n,{});s.native.endpoint('fetch',wf,n,1);
    assert.equal(qa(s).summaries.length,3);assert.equal(totals(s).D0.yes,3);
  });
  test(`${d}: missing native generation, navigation or anchor is unknown with gap`,async()=>{
    for(const missing of ['generation','navigation','anchor']){const s=H.env(d);await s.start();const n={},e={},p={},wf={};
      if(missing!=='navigation'){s.native.endpoint('root',e,s.document,{});s.native.endpoint('placements',e,[p]);}
      s.native.endpoint('node',n,{},p,s.document,0);if(missing!=='generation')s.native.endpoint('fetch-begin',wf,n,1);
      s.native.endpoint('cycle',n,1);if(missing!=='anchor')s.native.endpoint('anchor',n,{});
      const r=s.native.endpoint('fetch',wf,n,1);if(r){assert.equal(r.accepted,false);assert.equal(r.reason,'native-identity-unknown');}assert.equal(totals(s).D0.yes,1);assert.ok(qa(s).coverage.flags.sourceGap);
    }
  });
  test(`${d}: direct legacy auction does not reuse an earlier native fetch generation`,async()=>{
    const s=H.env(d);await s.start();s.node.startIntextTelemetryCycle('legacy');
    s.native.endpoint('legacy-auction',s.waterfall,s.node);s.guard('W2');
    assert.equal(s.native.latestPacket().identity.fetchGeneration,null);assert.equal(totals(s).D0.yes,1);assert.equal(totals(s).Dc.yes,0);
  });
  test(`${d}: diagnostics, preparation, recovery/reveal and post-player are excluded`,async()=>{
    const s=H.env(d);await s.start();for(let i=0;i<8;i++)s.node.getReadinessViewportState();
    assert.equal(totals(s).Dc.yes,0);assert.equal(s.native.exportManual().entries.filter(e=>e.packet.kind==='guard').length,0);
    await s.activation.call(s.creative);const prior=qa(s).summaries[0].results[0].pass;
    s.guard('W2');assert.equal(qa(s).summaries[0].results[0].pass,prior);assert.equal(s.native.latestPacket().stage,'unknown');assert.equal(s.native.latestPacket().series,'non-primary-video');
  });
  for(const branch of ['visible','below','hidden','missing','geometry','unrendered','stale','intersection'])test(`${d}: wait ${branch}, equal effects and original true/false/never-executed`,async()=>{
    const opts={position:branch==='below'?900:20,hidden:branch==='hidden',missing:branch==='missing',rectMissing:branch==='geometry',rendered:branch!=='unrendered',intersection:branch==='intersection'};
    const pair=await paired(d,async h=>{await h.start();if(branch==='stale')h.setActive(false);
      const p=h.node.waitForViewport(1,'buildAndPlayVideo:capacity-or-legacy');
      if(['hidden','geometry','unrendered'].includes(branch)){h.node.cancelViewportWaits=()=>{};for(const finish of h.node._viewportWaits)finish('stale');}
      if(branch==='below'){h.setTop(10);h.callbacks.get('window:scroll')();}
      return await p;
    },opts);
    const guards=pair.copy.native.exportManual().entries.filter(e=>e.packet.kind==='guard');
    if(branch==='stale')assert.equal(guards.length,0);
    else if(branch==='below')assert.deepEqual(guards.map(e=>e.packet.guard.eligible),[false,true]);
    else if(['visible','intersection'].includes(branch))assert.equal(guards[0].packet.guard.eligible,true);
    else assert.equal(guards[0].packet.guard.eligible,false);
  });
  for(const branch of ['prepare-error','invalid-before-wait','stale-wait','invalid-after-wait','false-final','missing-final','normal','throwing-sink'])test(`${d}: activate ${branch}, same awaits/throws/callback ordering`,async()=>{
    await paired(d,async h=>{await h.start();h.resetTrace();
      if(branch==='prepare-error')h.creative.prepare=async()=>{h.record('prepare-failure');throw new Error('prepare-failure');};
      if(branch==='invalid-before-wait')h.creative.preparationValid=()=>false;
      if(branch==='stale-wait')h.node.waitForViewport=async()=>{h.record('stale-wait');return 'stale';};
      if(branch==='invalid-after-wait'){let n=0;h.creative.preparationValid=()=>++n===1;}
      if(branch==='false-final'){let n=0;const actual=h.node.getReadinessViewportState;h.node.getReadinessViewportState=function(){if(++n===3)h.setTop(900);return actual.call(this);};}
      if(branch==='missing-final'){h.node.waitForViewport=null;h.node.getReadinessViewportState=null;}
      try{return {value:await h.activation.call(h.creative)};}catch(e){return {error:e.message};}
    },{throwSink:branch==='throwing-sink'});
  });
  test(`${d}: sourceComplete false forever, all exact rates blocked, firstPassFrame absent`,async()=>{
    const s=H.env(d);await s.start();s.guard('W2');s.native.close(100);
    const e=bounds(s);assert.equal(e.sourceComplete,false);assert.equal(e.qa0.rates.firstPassFrame.status,'temporal-coverage-not-implemented');
    assert.equal(s.native.ingest(s.native.latestPacket()).accepted,false);assert.equal(e.acquisition,false);
  });
  for(const branch of ['new','prepared','inactive','stale-W2','stale-W3','prepare-error','false-C1','stale-after-render','throwing-sink'])test(`${d}: buildAndPlayVideo ${branch}, W2/W3 and activation effects match original`,async()=>{
    const {copy:s}=await paired(d,async h=>{await h.start();h.resetTrace();
      if(['prepared','stale-W3','stale-after-render'].includes(branch)){h.waterfall._videoPreparation={};h.waterfall.getPreparedVideo=()=>{h.record('getPrepared');return {creative:h.creative};};}
      if(branch==='inactive')h.setActive(false);
      if(['stale-W2','stale-W3'].includes(branch)){const original=h.node.waitForViewport;h.node.waitForViewport=function(token,source,owner){if(source===`buildAndPlayVideo:${branch==='stale-W2'?'capacity-or-legacy':'waitForViewport'}`){h.record('forced-stale',source);return Promise.resolve('stale');}return original.call(this,token,source,owner);};}
      if(branch==='prepare-error')h.globals.IntextVideoCreative.prototype.prepare=async()=>{h.record('prepare-failure');throw new Error('offline-prepare-failure');};
      if(branch==='false-C1'){let count=0;const original=h.node.getReadinessViewportState;h.node.getReadinessViewportState=function(){if(++count===5)h.setTop(900);return original.call(this);};}
      if(branch==='stale-after-render'){const original=h.creative.render;h.creative.render=async function(){const v=await original.call(this);h.setActive(false);return v;};}
      return h.node.buildAndPlayVideo('offline-no-request',1,'offline');
    },{throwSink:branch==='throwing-sink'});
    const guards=s.native.exportManual().entries.filter(e=>e.packet.kind==='guard');
    if(branch==='new')assert.deepEqual(guards.map(e=>e.packet.caller),['W2','W3','W4','C1']);
    if(branch==='prepared')assert.deepEqual(guards.map(e=>e.packet.caller),['W3','W4','C1']);
    if(branch==='inactive'||branch==='stale-W2')assert.equal(guards.length,0);
    if(branch==='false-C1')assert.equal(guards.at(-1).receipt.candidateB0,'fail');
    assert.ok(totals(s).Dc.yes<=1);bounds(s);
  });
  test(`${d}: actual preparation entry handoff and standby release preserve effects and populations`,async()=>{
    const {copy:s}=await paired(d,async h=>{await h.start();h.resetTrace();
      const config={enabled:true,preparationRootMargin:'1200px',preparedMaxAgeMs:1000};
      h.waterfall.getVideoPreparationConfig=()=>config;h.waterfall.getLoadingTargetElement=()=>h.anchor;
      h.waterfall.claimVideoPreparation=function(token){return h.waterfall.original_claimVideoPreparation.call(this,token);};
      h.waterfall.original_setupVideoPreparation.call(h.waterfall,h.waterfall.pendingAuction);
      const entry=h.waterfall._videoPreparation;entry.start();await entry.promise;
      h.waterfall.original_claimVideoPreparation.call(h.waterfall,1);entry.release('offline-release');
      return {state:entry.state,generation:entry.generation,token:entry.boundToken};
    },{intersection:true});
    assert.deepEqual(numeric(s),{D0:1,Dv:1,Dc:0});assert.equal(qa(s).summaries[0].terminal,null);
  });
  test(`${d}: original guard exception remains exception; no fabricated false`,async()=>{
    const {copy:s}=await paired(d,async h=>{await h.start();h.resetTrace();h.anchor.getBoundingClientRect=()=>{h.record('rect-throw');throw new Error('original-geometry-error');};
      try{await h.node.waitForViewport(1,'buildAndPlayVideo:capacity-or-legacy');return 'unexpected';}catch(e){return e.message;}
    });
    assert.equal(s.native.exportManual().entries.filter(e=>e.packet.kind==='guard').length,0);assert.equal(totals(s).Dc.yes,0);
  });
  test(`${d}: prepared creative accredited only by actual entry, release revokes its packets`,async()=>{
    const s=H.env(d,{intersection:true});await s.start();
    s.waterfall.getVideoPreparationConfig=()=>({enabled:true,preparationRootMargin:'1200px',preparedMaxAgeMs:1000});s.waterfall.getLoadingTargetElement=()=>s.anchor;
    s.waterfall.original_setupVideoPreparation.call(s.waterfall,s.waterfall.pendingAuction);
    const entry=s.waterfall._videoPreparation;entry.start();await entry.promise;
    s.waterfall.getPreparedVideo=token=>{s.waterfall.original_claimVideoPreparation.call(s.waterfall,token);return entry;};
    assert.equal(await s.node.buildAndPlayVideo('offline-no-request',1,'offline'),true);
    const packet=s.native.latestPacket();assert.equal(packet.caller,'C1');assert.ok(packet.ownership.entryLocalId);assert.equal(s.native.ingest(packet).duplicate,true);
    entry.release('offline-release');assert.equal(s.native.ingest(packet).accepted,false);assert.equal(qa(s).summaries[0].terminal,null);bounds(s);
  });
  test(`${d}: regressed or unknown clock produces a gap without a new first positive`,async()=>{
    for(const time of [-10,Number.NaN]){const s=H.env(d);await s.start();s.setTime(time);const r=s.guard('W2');assert.equal(r.accepted,false);assert.equal(r.reason,'unknown-or-regressed-clock');assert.equal(qa(s).summaries[0].firstControlAt,null);assert.equal(totals(s).Dc.yes,0);}
  });
  test(`${d}: metadata reserves the longest permitted finite clock representation`,async()=>{
    const s=H.env(d);await s.start();s.setTime(Number.MAX_VALUE);assert.equal(s.guard('W2').candidateB0,'pass');bounds(s);
  });
  test(`${d}: reused article root with a new native navigation index has separate genealogy`,()=>{
    const s=H.env(d),engine={},placement={},node={},wf={};
    s.native.endpoint('root',engine,s.document,s.root);s.native.endpoint('placements',engine,[placement]);
    const nav=[];
    for(const index of [0,1]){s.native.endpoint('node',node,{},placement,s.document,index);s.native.endpoint('fetch-begin',wf,node,1);s.native.endpoint('cycle',node,1);
      s.native.endpoint('anchor',node,s.anchor);s.native.endpoint('fetch',wf,node,1);nav.push(s.native.latestPacket().identity.navigationLocalId);}
    assert.notEqual(nav[0],nav[1]);assert.equal(totals(s).D0.yes,2);
  });
  test(`${d}: independent waterfalls with equal native counters cannot borrow the current owner`,async()=>{
    const s=H.env(d);await s.start();const next={};s.native.endpoint('fetch-begin',next,s.node,1);s.node.startIntextTelemetryCycle('next-owner');
    assert.equal(s.native.endpoint('fetch',s.waterfall,s.node,1),undefined);assert.equal(s.native.endpoint('winner',s.waterfall,s.node,1,{winner:'video'}),undefined);
    assert.equal(totals(s).D0.yes,1);assert.equal(totals(s).Dv.yes,1);
    assert.equal(s.native.endpoint('fetch',next,s.node,1).accepted,true);assert.equal(totals(s).D0.yes,2);
  });
  test(`${d}: original async generation check suppresses a cancelled fetch winner, effects unchanged`,async()=>{
    const {copy:s}=await paired(d,async h=>{let release;h.waterfall.runPrebidPhase=()=>{h.record('pending-prebid');return new Promise(resolve=>{release=resolve;});};
      const promise=h.waterfall.original_startFetch.call(h.waterfall,'offline');h.waterfall.original_cleanup.call(h.waterfall);release();await promise;
      return {fetchComplete:h.waterfall.fetchComplete,pending:h.waterfall.pendingAuction};
    });
    assert.equal(s.trace.includes('decision'),false);assert.equal(totals(s).D0.yes,1);assert.equal(totals(s).Dv.unknown,1);assert.equal(totals(s).Dc.yes,0);
  });
  test(`${d}: rings, shared 2 MiB partition, bounded manual export, evicted retransmission`,async()=>{
    const s=H.env(d);await s.start();s.guard('W2',false);const early=s.native.latestPacket();
    for(let i=0;i<1100;i++)s.guard('W2',i%2===0);
    const e=bounds(s);assert.deepEqual(e.memory.limits,PARTITION);assert.ok(e.metadata.counters.dropped>0);assert.ok(e.qa0.coverage.flags.rawEvidenceEvicted);
    assert.ok(e.entries.length<=1000);assert.ok(e.qa0.snapshots.length<=1000);assert.equal(s.native.ingest(early).accepted,false);
    assert.equal(s.native.serializeManual({maxBytes:10}).json,null);const out=s.native.serializeManual();assert.ok(out.bytes<=2097152||out.json===null);
    assert.equal(e.metadata.authority.exhausted,false);assert.ok(!JSON.stringify(e).includes('offline paragraph'));
  });
  test(`${d}: opportunity 65 is overflow, no eviction or second population engine`,async()=>{
    const s=H.env(d);for(let i=0;i<65;i++){if(i)s.waterfall.original_cleanup.call(s.waterfall);await s.start();s.guard('W2');}
    const e=bounds(s);assert.equal(e.qa0.summaries.length,64);assert.equal(e.qa0.coverage.flags.accountingOverflow,true);
    assert.deepEqual(numeric(s),{D0:64,Dv:64,Dc:64});assert.equal(e.qa0.coverage.exactRatesAllowed,false);
  });
  test(`${d}: reduced partitions, oversized evidence and authority exhaustion fail safely`,async()=>{
    const s=H.env(d,{limits:{packetRingBytes:500,qa0RingBytes:1000,packetEntries:1,qa0Entries:1}});await s.start();s.guard('W2');
    assert.ok(s.native.exportManual().metadata.counters.oversized>0);bounds(s);
    for(let i=0;i<1000;i++)s.native.endpoint('root',{},s.document,{});
    assert.equal(s.native.stats().exhausted,true);assert.ok(s.native.stats().logicalChargedBytes<=12288);assert.equal(s.native.ingest({}).accepted,false);bounds(s);
  });
}
test('facade never changes return identity or propagates a sink exception',()=>{
  const q=facade(()=>{throw new Error('sink');}),value={eligible:false};assert.equal(q.result(value,{},{}),value);assert.equal(q.final(value,{},{}),value);assert.equal(q.value('anchor',value,{}),value);q.tap('anything');
});
test('originals, four contracts and approved Stage I bytes remain exactly at the before baseline',()=>{
  const before=JSON.parse(fs.readFileSync('docs/intext-p14b-qa1b-stage2a-before.json','utf8'));
  assert.equal(before.files.length,386);
  for(const e of before.files){const b=fs.readFileSync(e.file);assert.equal(b.length,e.bytes,e.file);assert.equal(G.hash(b),e.sha256,e.file);}
  const sty=fs.readFileSync('Indicar que dependencias tiene el core d.sty');assert.equal(sty.length,3940);assert.equal(G.hash(sty),'15c72d69032cc0e212b1501cdd78e9da78561b404c65165fe1a6d02efe16b660');
});
