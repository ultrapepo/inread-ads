'use strict';
// Isolated QA0 evaluator. Never imports or calls the core, DOM, SDK, clocks or I/O.
const D=require('./intext-p14b-data.cjs');
const {own,at,finite,integer,localId,hash,items}=D;
const CORES=Object.freeze({
  '_gam_kv_.js':'1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690',
  'IntextManager.js':'ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8',
});

function geometryV1(rect,viewport){
  const r=D.validRect(rect),v=D.validViewport(viewport);if(!r||!v)return null;
  const right=r.left+r.width,bottom=r.top+r.height;
  const ix=Math.max(0,Math.min(right,v.width)-Math.max(r.left,0));
  const iy=Math.max(0,Math.min(bottom,v.height)-Math.max(r.top,0));
  const xFraction=Math.min(1,ix/r.width),yFraction=Math.min(1,iy/r.height);
  return {formulaVersion:D.FORMULA,ix,iy,xFraction,yFraction,areaFraction:xFraction*yFraction,
    maxAreaFraction:(Math.min(r.width,v.width)/r.width)*(Math.min(r.height,v.height)/r.height),
    position:r.top>=v.height?'below':bottom<=0?'above':ix===0?'horizontal-out':'overlapping'};
}

// Numeric operands already resolved by a data source; no CSS parsing or DOM reads.
function validCurrentBox(operands){
  const b=own(operands,'currentBox'),keys=['paddingTopPx','paddingBottomPx','paddingLeftPx','paddingRightPx','borderTopPx','borderBottomPx','borderLeftPx','borderRightPx'];
  if(!keys.every(k=>finite(own(b,k))&&own(b,k)>=0))return false;
  const horizontal=own(b,'paddingLeftPx')+own(b,'paddingRightPx')+own(b,'borderLeftPx')+own(b,'borderRightPx');
  const vertical=own(b,'paddingTopPx')+own(b,'paddingBottomPx')+own(b,'borderTopPx')+own(b,'borderBottomPx');
  const width=own(b,'borderBoxWidthPx'),left=own(b,'borderBoxLeftPx'),top=own(b,'borderBoxTopPx');
  const agrees=(a,b)=>finite(a)&&finite(b)&&Math.abs(a-b)<=1e-7;
  return finite(horizontal)&&finite(vertical)&&finite(width)&&width>0&&width>horizontal
    &&agrees(width-horizontal,own(operands,'contentWidthPx'))
    &&agrees(left+own(b,'borderLeftPx')+own(b,'paddingLeftPx'),own(operands,'contentLeftPx'))
    &&agrees(top+own(b,'borderTopPx')+own(b,'paddingTopPx'),own(operands,'contentTopPx'));
}
function openEnvelopeHeightV1(operands){
  const override=own(operands,'lockedHeightOverride'),chrome=own(operands,'wrapperChromeHeight'),preset=own(operands,'targetHeightPx');
  if(override!==null&&(!finite(override)||override<0))return null;
  if(chrome!==undefined&&chrome!==null&&(!Number.isSafeInteger(chrome)||chrome<0))return null;
  if(own(operands,'currentBox')!==undefined&&!validCurrentBox(operands))return null;
  if(preset!==undefined&&preset!==null&&(!finite(preset)||preset<=0))return null;
  if(override!==null&&override>1){
    if(chrome!==null&&!Number.isSafeInteger(chrome))return null;
    const height=override+(chrome===null||chrome===0?15:chrome);
    return finite(height)&&height>0?height:null;
  }
  return preset===null?360:finite(preset)&&preset>0?preset:null;
}

// Checks data attestations and cross-record consistency. It does not assert that CSS
// really matched a live page; QA1 would have to obtain those facts under separate approval.
function qualifyModelV1(sample,model){
  const modelId=own(model,'modelId'),quality=own(model,'quality'),e=own(model,'evidence'),c=own(model,'context');
  const i=D.identity(own(sample,'identity')),v=own(sample,'viewport'),p=own(sample,'provenance');
  const measured=modelId==='player-measured-current-flow'&&quality==='measured';
  const estimated=['player-intent-current-flow-v1','slot-open-envelope-v1'].includes(modelId)&&quality==='qualified-estimate';
  const stage=own(sample,'stage'),operands=own(e,'operands'),rect=D.validRect(own(model,'rect'));
  const originResolved=measured||!!(rect&&own(operands,'contentLeftPx')===rect.left&&own(operands,'contentTopPx')===rect.top
    &&own(operands,'contentWidthPx')===rect.width);
  const heightResolved=measured||!!(rect&&(modelId==='slot-open-envelope-v1'
    ?openEnvelopeHeightV1(operands)===rect.height
    :finite(own(operands,'intendedPlayerHeightPx'))&&own(operands,'intendedPlayerHeightPx')===rect.height));
  const sameIdentity=!!i&&['documentLocalId','navigationLocalId','slotLocalId','anchorLocalId','cycleId','fetchGeneration','renderToken']
    .every(k=>own(c,k)===i[k]);
  const Q1=!!(sameIdentity&&own(e,'wrapperConnected')===true&&localId(own(e,'wrapperLocalId'))&&own(c,'stage')===stage&&D.STAGES.includes(stage));
  const Q2=!!(D.validRect(own(model,'rect'))&&D.validViewport(v)&&own(c,'coordinateSpace')==='layout-css-px'
    &&own(v,'coordinateSpace')==='layout-css-px'&&integer(own(sample,'sampleSequence'),1)
    &&D.CLOCKS.includes(own(sample,'sourceClock'))&&own(c,'sourceClock')===own(sample,'sourceClock')
    &&own(c,'sampleSequence')===own(sample,'sampleSequence')&&finite(own(sample,'monotonicMs'))&&own(sample,'monotonicMs')>=0
    &&localId(own(sample,'layoutRevision'))&&own(c,'layoutRevision')===own(sample,'layoutRevision')
    &&localId(own(v,'revision'))&&own(c,'viewportRevision')===own(v,'revision')&&own(e,'acquiredWithinRevision')===true
    &&originResolved&&(measured||(own(e,'contentBoxResolved')===true&&own(e,'currentPaddingBordersResolved')===true)));
  const Q3=!!(D.DISTRIBUTIONS.includes(own(p,'distribution'))&&hash(own(p,'coreSha256'))&&CORES[own(p,'distribution')]===own(p,'coreSha256')
    &&localId(own(p,'cssModelVersion'))&&localId(own(p,'configVersion'))
    &&['distribution','coreSha256','cssModelVersion','configVersion'].every(k=>own(e,k)===own(p,k))
    &&heightResolved&&(measured||validCurrentBox(operands))
    &&(measured||own(operands,'wrapperChromeHeight')===null||(integer(own(operands,'wrapperChromeHeight'))))
    &&own(e,'sourcesResolved')===true&&own(e,'units')==='css-px'
    &&(measured
      ?own(e,'originSource')==='player-rect'&&own(e,'heightSource')==='player-rect'&&own(e,'widthSource')==='player-rect'
      :own(e,'originSource')==='wrapper-content-box'&&own(e,'widthSource')==='wrapper-content-box'
        &&(modelId==='slot-open-envelope-v1'?own(e,'heightSource')==='open-operands':own(e,'heightSource')==='pinned-effective-style')));
  const Q4=!!(own(e,'supportedLayout')===true&&own(e,'externalStylesResolved')===true&&own(e,'intentionalClosureKnown')===true
    &&(measured?stage!=='before-player'&&own(e,'existingObject')==='player':true));
  const Q5=!!(own(model,'modelVersion')==='1'&&own(e,'provenanceComplete')===true&&own(e,'sourceConflict')===false
    &&own(c,'coordinateSpace')==='layout-css-px'&&own(e,'pipFloating')===false);
  const checks={Q1,Q2,Q3,Q4,Q5};
  const valid=(measured||estimated)&&Object.values(checks).every(Boolean);
  return {valid,quality:measured?'measured':estimated?'qualified-estimate':D.oneOf(quality,['partial','unknown'])||'unknown',
    checks,failedChecks:Object.keys(checks).filter(k=>!checks[k]),reason:valid?null:'model-quality-insufficient'};
}

function candidateV1(value){
  const family=own(value,'family');
  if(!['B0','B1','B2','B3','B4','B5'].includes(family)||(own(value,'formulaVersion')!==undefined&&own(value,'formulaVersion')!==D.FORMULA))return null;
  const rectModelId=D.MODELS.includes(own(value,'rectModelId'))?own(value,'rectModelId'):null;
  if(family==='B0')return {family,rectModelId:null,parameterSetId:'control-factual',formulaVersion:D.FORMULA};
  if(family==='B4'||family==='B5')return {family,rectModelId,parameterSetId:'temporal-deferred',formulaVersion:D.FORMULA};
  const p=own(value,'parameters'),areaFraction=own(p,'areaFraction'),xFraction=own(p,'xFraction'),yFraction=own(p,'yFraction');
  const parameters=family==='B2'?{areaFraction}:family==='B3'?{xFraction,yFraction}:{};
  const parametersValid=family==='B1'||(family==='B2'?[0.25,0.5,0.75].includes(areaFraction):[0.5,1].includes(xFraction)&&[0.25,0.5].includes(yFraction));
  return {family,rectModelId,parameters,parametersValid,parameterSetId:family==='B1'?'positive':family==='B2'&&parametersValid?`area-${areaFraction}`:
    family==='B3'&&parametersValid?`xy-${xFraction}-${yFraction}`:'invalid-parameters',formulaVersion:D.FORMULA};
}

function evaluateP14BShadowV1(sample,candidate){
  const spec=candidateV1(candidate),family=spec?.family||null;
  const result={candidateId:family,rectModelId:spec?.rectModelId??null,parameterSetId:spec?.parameterSetId??null,formulaVersion:D.FORMULA,
    evaluationStage:family==='B4'||family==='B5'?'temporal-deferred':'snapshot-B0-B3',status:'unknown',reasons:[],
    controlComparison:'unknown',stage:D.oneOf(own(sample,'stage'),D.STAGES)||'unknown',
    geometryQuality:family==='B0'?'not-required':'not-evaluated',movementQuality:family==='B0'?'not-required':'not-evaluated',
    areaFraction:null,xFraction:null,yFraction:null,maxAreaFraction:null,qualification:null};
  const c0=D.control(sample);
  const finish=(status,reason)=>({...result,status,reasons:reason?[reason]:[],controlComparison:status==='not-applicable'?'not-applicable':
    status==='unknown'||c0===null?'unknown':status==='pass'||c0===false?'agrees':'candidate-rejects-control'});
  if(!spec)return finish('unknown','invalid-candidate');
  const base=D.baseStatus(sample);
  if(base)return finish(['display-only','stale-identity','terminal'].includes(base)?'not-applicable':'unknown',base);
  // B0 must terminate here. Even a missing or accessor-backed P cannot affect it.
  if(family==='B0')return finish(c0===null?'unknown':c0?'pass':'fail',c0===null?'control-unobserved':c0?null:'control-ineligible');
  if(family==='B4'||family==='B5'){
    result.movementQuality='deferred';return finish('unknown','temporal-stage-deferred');
  }
  if(c0===null)return finish('unknown','control-unobserved');
  if(!c0)return finish('fail','control-ineligible');
  if(!spec.rectModelId||!spec.parametersValid)return finish('unknown','invalid-candidate');
  const models=items(own(sample,'plannedRegions'),D.MODELS.length);
  const matches=models?.filter(m=>own(m,'modelId')===spec.rectModelId)||[];
  if(matches.length!==1)return finish('unknown',matches.length?'ambiguous-planned-rect':'no-planned-rect');
  const model=matches[0];
  if(at(model,'evidence','pipFloating')===true)return finish('not-applicable','pip-geometry');
  const q=qualifyModelV1(sample,model);result.geometryQuality=q.quality;result.qualification=q;
  if(!q.valid)return finish('unknown','model-quality-insufficient');
  const g=geometryV1(own(model,'rect'),own(sample,'viewport'));
  Object.assign(result,{areaFraction:g.areaFraction,xFraction:g.xFraction,yFraction:g.yFraction,maxAreaFraction:g.maxAreaFraction});
  if(g.ix<=0||g.iy<=0)return finish('fail','outside-planned');
  if(family==='B1')return finish('pass');
  if(family==='B2')return finish(g.areaFraction>=spec.parameters.areaFraction?'pass':'fail',
    g.areaFraction>=spec.parameters.areaFraction?null:g.maxAreaFraction<spec.parameters.areaFraction?'threshold-unreachable-by-size':'below-fraction');
  return finish(g.xFraction>=spec.parameters.xFraction&&g.yFraction>=spec.parameters.yFraction?'pass':'fail',
    g.xFraction<spec.parameters.xFraction?'horizontal-fraction':g.yFraction<spec.parameters.yFraction?'below-fraction':null);
}
module.exports={SCHEMA:D.SCHEMA,FORMULA:D.FORMULA,MODELS:D.MODELS,CORES,geometryV1,openEnvelopeHeightV1,qualifyModelV1,candidateV1,evaluateP14BShadowV1};
