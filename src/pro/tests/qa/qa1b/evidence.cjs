'use strict';
// Explicit offline CLI to materialize review evidence, never called by the adapter.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const F=require('./fixtures.cjs'),G=require('./generator.cjs');
const root=path.resolve(__dirname,'../../..'),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function run(){
  const before=JSON.parse(fs.readFileSync(path.join(root,'docs/intext-p14b-qa1b-stage1-before.json'),'utf8'));
  for(const row of [...before.files,...before.contracts]){
    const bytes=fs.readFileSync(path.join(root,row.file));assert.equal(bytes.length,row.bytes,row.file);assert.equal(sha(bytes),row.sha256,row.file);
  }
  const output={},copies=[],authorityChecks={};
  for(const distribution of ['_gam_kv_.js','IntextManager.js']){
    const s=F.session(distribution);s.start();
    const receipts=['W2','W3','W4','C1'].map(caller=>s.send({caller}));
    s.send({caller:'W1',format:'display',facts:{relation:'fallback'}});s.adapter.close(20);
    const value=s.adapter.exportManual();
    assert.deepEqual([value.qa0.totals.D0.yes,value.qa0.totals.Dv.yes,value.qa0.totals.Dc.yes],[1,1,1]);
    output[distribution]={counts:value.qa0.totals,coverage:value.qa0.coverage,receipts,exportBytes:s.adapter.serializeManual().bytes};
    const a=F.session(distribution),b=F.session(distribution);a.start();b.start();
    const foreign=a.packet(),own=b.packet();assert.deepEqual(foreign,own);
    const rejection=b.adapter.ingest(foreign),blocked=b.adapter.exportManual();
    assert.equal(rejection.reason,'registry-unaccredited');assert.equal(blocked.qa0.totals.Dc.yes,0);
    assert.equal(blocked.qa0.summaries[0].firstControlAt,null);assert.equal(blocked.metadata.lastSequence,2);
    const legitimate=b.adapter.ingest(own),duplicate=b.adapter.ingest(own),jsonRejection=b.adapter.ingest(JSON.parse(JSON.stringify(own)));
    assert.equal(legitimate.acceptanceA,'valid');assert.equal(duplicate.duplicate,true);assert.equal(jsonRejection.reason,'registry-unaccredited');
    authorityChecks[distribution]={aliasesAndPayloadEqual:true,foreignRejection:rejection,foreignDidNotCreateFirstPositive:true,
      ownReceipt:legitimate,ownRetransmission:duplicate,jsonCopyRejection:jsonRejection,sourceComplete:b.adapter.exportManual().qa0.coverage.sourceComplete};
    const generated=G.generateCopy(distribution,fs.readFileSync(path.join(root,distribution)));
    assert.equal(sha(G.reverseCopy(distribution,generated.artifact)),generated.manifest.baseSha256);
    const label=distribution==='_gam_kv_.js'?'gam':'manager';
    fs.writeFileSync(path.join(root,`docs/intext-p14b-qa1b-stage1-${label}.diff`),generated.diff);
    copies.push({...generated.manifest,reverseVerified:true,copyExecuted:false,copyRetainedInWorkspace:false});
  }
  const stress=F.session();stress.start();for(let n=0;n<2001;n++)stress.send({guard:{eligible:n%2===0}});
  const memory=stress.adapter.exportManual();
  const overflow=F.session();for(let n=1;n<=65;n++){if(n>1)overflow.nextCycle(n);overflow.start();overflow.send({});}
  const overflowValue=overflow.adapter.exportManual();
  const example=F.session();example.start();example.send({});example.send({guard:{eligible:false,reason:'below'}});example.adapter.close(10);
  const exported=example.adapter.serializeManual();assert.equal(exported.status,'ok');
  fs.writeFileSync(path.join(root,'docs/intext-p14b-qa1b-stage1-synthetic-export.json'),exported.json+'\n');
  const evidence={schema:'qa1b-stage1-evidence-v1',origin:'synthetic-fixtures-only',acquisition:false,environment:{node:process.version,platform:process.platform},
    protectedOriginalsVerified:before.files.length,bindingContractsVerified:before.contracts.length,sessions:output,
    auditCorrection:{finding:'I-01',profile:'local-fixture-object-v1',authorityChecks,
      packetSchemaChanged:false,externalProducerAuthenticationImplemented:false,persistentSecrets:false,
      authorityMembership:'Weak packet keys; shared scalar leases charged once per owner state; no strong packet index',physicalWeakMapHeapMeasured:false},
    stress:{originalGuards:2001,notificationsIncludingFetchAndWinner:2003,memory:memory.memory,
      retainedQA0:memory.qa0.snapshots.length,retainedPackets:memory.entries.length,packetLoss:memory.metadata.loss,
      packetCounters:memory.metadata.counts,qa0Loss:memory.qa0.coverage.flags,
      exportStatus:stress.adapter.serializeManual().status,exportBytes:stress.adapter.serializeManual().bytes,
      logicalPartitionVerified:true,physicalHeapMeasured:false,browserBudgetMeasured:false},
    opportunity65:{retained:overflowValue.qa0.summaries.length,totals:overflowValue.qa0.totals,flags:overflowValue.qa0.coverage.flags,
      registry:overflowValue.metadata.registry},
    generator:{copies,originalsTouched:0,served:false,executed:false,instrumentationImplemented:false},
    blocked:['II','III','IV','real acquisition','B shadow runtime','B enforce','A3','C']};
  fs.writeFileSync(path.join(root,'docs/intext-p14b-qa1b-stage1-evidence.json'),JSON.stringify(evidence,null,2)+'\n');
  const plan=fs.readFileSync(path.join(root,'docs/intext-p14b-qa1b-test-plan.md'),'utf8');
  const partial=new Set(['G01','G02','G03','G04','G05','G06','G11','G12','G14','G15','I04','P02','T01','A04','X03']);
  const cases=[...plan.matchAll(/^\| ([GIPTODAX]\d{2}) \| ([^|]+) \|/gm)].map(match=>{
    const id=match[1],deferredP=['P03','P04','P05','P06'].includes(id),deferredO=id.startsWith('O');
    return {id,proposedCase:match[2].trim(),status:deferredP?'DEFERRED-III':deferredO?'DEFERRED-IV':partial.has(id)?'PARTIAL-OFFLINE':'VALIDATED-SYNTHETIC',
      limitation:deferredP?'No P producer/profile, CSS bracket or live geometry implemented; frozen QA0 arithmetic regressions only.':
        deferredO?'No manager/media/frame/reveal acquisition or binding producer implemented.':partial.has(id)?
          'Only data semantics, static byte invariance or report criteria are tested; original callbacks/guards and browser budget require later authorization.':
          'Fixture data and actual frozen QA0 APIs only; no evidence of live acquisition, population completeness or browser cost.'};
  });
  assert.equal(cases.length,52);
  fs.writeFileSync(path.join(root,'docs/intext-p14b-qa1b-stage1-case-matrix.json'),JSON.stringify({schema:'qa1b-stage1-case-matrix-v1',
    proposedCases:52,meaning:'Case-level applicability, not a claim that 52 runtime scenarios passed. Match case IDs in the stage-I test names.',cases},null,2)+'\n');
  fs.writeFileSync(path.join(root,'docs/intext-p14b-qa1b-stage1-case-matrix.md'),
    '# QA1-B etapa I: aplicabilidad de los 52 casos\n\nVALIDATED-SYNTHETIC acredita semantica de datos con fixtures y QA0 real. PARTIAL-OFFLINE no acredita ramas/callbacks comerciales, presupuesto de navegador ni observacion real. DEFERRED-III/IV identifica productores aun no implementados. Ninguna fila autoriza avance de etapa. Los IDs enlazan con los nombres de los tests nuevos; las limitaciones completas constan en el JSON homonimo.\n\n| Caso | Estado | Alcance pendiente |\n|---|---|---|\n'+
    cases.map(x=>`| ${x.id} | ${x.status} | ${x.status==='DEFERRED-III'?'Perfil P y geometria real III':x.status==='DEFERRED-IV'?'Productor/bindings/outcomes IV':x.status==='PARTIAL-OFFLINE'?'Ramas/callbacks o medicion real II-IV':'Validacion del productor real y presupuesto en II'} |`).join('\n')+'\n');
  return evidence;
}
module.exports={run};
if(require.main===module){const e=run();console.log(JSON.stringify({originals:e.protectedOriginalsVerified,stress:e.stress.memory,
  retainedQA0:e.stress.retainedQA0,retainedPackets:e.stress.retainedPackets,opportunity65:e.opportunity65.retained,
  exportBytes:e.stress.exportBytes,exportStatus:e.stress.exportStatus}));}
