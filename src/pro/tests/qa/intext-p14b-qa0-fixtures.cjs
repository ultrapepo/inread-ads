'use strict';
// Synthetic data attestations only. No SDK/DOM mocks or replacement evaluator.
const CORES={
  '_gam_kv_.js':'1cde1ccdc962c07d5833dc9691a3bfe31b7dd74b3e649e89153a240940a06690',
  'IntextManager.js':'ba832dc0eb3c0f6e1070a515fac09dd31467e2c7a5a64a18ff4e4f4c063fead8',
};
function makeSample(options={}){
  const distribution=options.distribution||'_gam_kv_.js',modelId=options.modelId||'player-intent-current-flow-v1';
  const stage=options.stage||(modelId==='player-measured-current-flow'?'after-player':'before-player');
  const cycleId=options.cycleId||1,sequence=options.sequence||cycleId;
  const identity={documentLocalId:options.documentLocalId||'documentOne',navigationLocalId:options.navigationLocalId||'navOne',
    slotLocalId:options.slotLocalId||'slotOne',anchorLocalId:options.anchorLocalId||'anchorOne',cycleId,
    fetchGeneration:options.fetchGeneration||1,renderToken:options.renderToken??1,activeRenderToken:options.renderToken??1,verified:true,state:'live'};
  const provenance={distribution,coreSha256:CORES[distribution],cssModelVersion:'p14bCssV1',configVersion:'syntheticConfigV1'};
  const measured=modelId==='player-measured-current-flow';
  const sample={schemaVersion:'p14b-shadow-sample-v1',contractRevision:'r2',scope:options.scope||'video',source:{consistent:true},identity,
    sourceClock:'synthetic-monotonic-ms',monotonicMs:options.monotonicMs??cycleId*10,sampleSequence:sequence,stage,layoutRevision:'layoutOne',provenance,
    control:{observed:true,reliable:true,eligible:options.control??true},
    viewport:{width:options.viewportWidth??100,height:options.viewportHeight??100,revision:'viewportOne',coordinateSpace:'layout-css-px'},
    coverage:{leftCensored:false,sourceGap:false},plannedRegions:[],
    adMediaBinding:{...identity,provenanceVerified:true,media:'ad',managerLocalId:'syntheticManager',mediaLocalId:'syntheticAdMedia'}};
  const rect=options.rect||{left:0,top:0,width:100,height:100};
  sample.plannedRegions.push({modelId,modelVersion:'1',quality:measured?'measured':'qualified-estimate',rect,
    context:{...identity,sourceClock:'synthetic-monotonic-ms',sampleSequence:sequence,stage,coordinateSpace:'layout-css-px',layoutRevision:'layoutOne',viewportRevision:'viewportOne'},
    evidence:{wrapperConnected:true,wrapperLocalId:'wrapperOne',acquiredWithinRevision:true,contentBoxResolved:true,currentPaddingBordersResolved:true,
      ...provenance,sourcesResolved:true,units:'css-px',originSource:measured?'player-rect':'wrapper-content-box',
      widthSource:measured?'player-rect':'wrapper-content-box',heightSource:measured?'player-rect':modelId==='slot-open-envelope-v1'?'open-operands':'pinned-effective-style',
      supportedLayout:true,externalStylesResolved:true,intentionalClosureKnown:true,existingObject:measured?'player':null,
      provenanceComplete:true,sourceConflict:false,pipFloating:false,
      operands:{contentLeftPx:rect.left,contentTopPx:rect.top,contentWidthPx:rect.width,intendedPlayerHeightPx:rect.height,
        lockedHeightOverride:null,wrapperChromeHeight:null,targetHeightPx:rect.height,
        currentBox:{paddingTopPx:0,paddingBottomPx:0,paddingLeftPx:0,paddingRightPx:0,
          borderTopPx:0,borderBottomPx:0,borderLeftPx:0,borderRightPx:0,
          borderBoxLeftPx:rect.left,borderBoxTopPx:rect.top,borderBoxWidthPx:rect.width}}}});
  return sample;
}
const candidate=(family='B0',model='player-intent-current-flow-v1',parameters)=>({family,formulaVersion:'p14b-geometry-v1',
  rectModelId:family==='B0'?null:model,parameters:parameters??(family==='B2'?{areaFraction:0.25}:family==='B3'?{xFraction:1,yFraction:0.5}:{})});
const catalogue=model=>['B0','B1','B2','B3','B4','B5'].map(f=>candidate(f,model));
const fullCoverage=()=>({D0:true,Dv:true,Dc:true,outcomes:true});
const frameFor=(sample,source='request-video-frame-callback')=>({...sample.identity,provenanceVerified:true,
  managerLocalId:sample.adMediaBinding.managerLocalId,mediaLocalId:sample.adMediaBinding.mediaLocalId,
  observed:true,media:'ad',source,sourceClock:sample.sourceClock,monotonicMs:sample.monotonicMs,
  evidence:source==='request-video-frame-callback'?{kind:'presented-frame',presentedFrames:1,mediaTimeSeconds:0}
    :{kind:'decoded-ad-frame',decodedFramesSinceBinding:1,mediaTimeSeconds:0.01}});
const completedFacts=(sample=makeSample())=>({fetchObserved:true,initialWinner:'video',frame:frameFor(sample),
  controlCoverageComplete:true,frameCoverageComplete:true,terminal:'complete'});
module.exports={CORES,makeSample,candidate,catalogue,fullCoverage,frameFor,completedFacts};
