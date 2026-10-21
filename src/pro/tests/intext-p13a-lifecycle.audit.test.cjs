'use strict';
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const {install,optionsFromSource} = require('./qa/intext-p13a-lifecycle.cjs');
const {videoRequests,differences}=require('./qa/intext-p13a-targeting.cjs');
function fixture(variant) {
  const events = [], requests = [], calls = {create:0,init:0,play:0,request:0}, records=[];
  let eligible = false, valid = true, now = 0;
  class AdsLoader { requestAds(value) { requests.push(value); } }
  const sdk = {AdsLoader,settings:{setVpaidMode(){}},ImaSdkSettings:{VpaidMode:{INSECURE:2}}};
  const loader = new AdsLoader();
  const source = '  requestAds() {\n          const options = { id:this.playerId, adTagUrl:adTag, adsRenderingSettings:{enablePreloading:preloadEnabled} };\n          this.player.ima(options);';
  const creative = {playerId:'qa',config:{video:{}},preparationValid:()=>valid,ensureDependencies:async()=>{},
    getVideoTagUrl:()=> 'https://example.test/exact-tag',resolveVideoControlsConfig:()=>({showForJsAds:true}),
    async preparePlayer() { await this.ensureDependencies(); calls.create++;
      const player = {ready:fn=>fn(),trigger:event=>events.push(event),play:()=>{calls.play++;return Promise.resolve();}};
      player.ima = options => { calls.init++; player.ima.options=options;
        player.trigger('ads-request'); loader.requestAds(options.adTagUrl); };
      player.ima.initializeAdDisplayContainer=()=>{}; this.player=player;
    },
    requestAds() { calls.request++; const options=optionsFromSource(source,this); this.player.ima(options);
      this.player.ima.initializeAdDisplayContainer(); return this.player.play(); }
  };
  const cleanup=install(creative,{variant,source,sdk:()=>sdk,eligible:()=>eligible,record:(event,data)=>records.push({event,at:now,...data})});
  return {creative,calls,requests,events,records,cleanup,advance:ms=>now+=ms,setEligible:value=>eligible=value,setValid:value=>valid=value};
}
for (const variant of ['A','B','C']) {
  for (const standbyMs of [0,6580,45000]) test('QA lifecycle '+variant+': '+standbyMs+'ms standby clock performs no effective ad request/play and activates once',async()=>{
    const f=fixture(variant); await f.creative.preparePlayer();
    f.advance(standbyMs); // No timer can open the experimental advertising gate.
    assert.equal(f.requests.length,0); assert.equal(f.calls.play,0); assert.equal(f.events.length,0);
    assert.equal(f.calls.create,variant==='B'?0:1); assert.equal(f.calls.init,variant==='C'?1:0);
    await assert.rejects(f.creative.requestAds(),/ineligible/);
    f.setEligible(true); await f.creative.requestAds();
    assert.equal(f.records.find(entry=>entry.event==='qa-lifecycle-activation').at,standbyMs);
    assert.equal(f.calls.create,1);assert.equal(f.calls.init,1);assert.equal(f.calls.play,1);
    assert.deepEqual(f.requests,['https://example.test/exact-tag']);assert.deepEqual(f.events,['ads-request']);f.cleanup();
  });
  test('QA lifecycle '+variant+': stale cycle cannot activate',async()=>{
    const f=fixture(variant);await f.creative.preparePlayer();f.setEligible(true);f.setValid(false);
    await assert.rejects(f.creative.requestAds(),/ineligible/);assert.equal(f.requests.length,0);f.cleanup();
  });
}
test('QA C prohibits early playback even if geometry is eligible',async()=>{
  const f=fixture('C');f.setEligible(true);await f.creative.preparePlayer();
  assert.throws(()=>f.creative.player.play(),/forbidden/);assert.equal(f.calls.play,0);f.cleanup();
});
test('QA C cleanup discards pending VAST and restores SDK prototype',async()=>{
  const f=fixture('C');await f.creative.preparePlayer();f.cleanup();assert.equal(f.requests.length,0);
  assert.equal(f.events.length,0);
});
test('QA C refuses unsupported SDK instead of requesting ads early',async()=>{
  const f=fixture('A');f.cleanup();install(f.creative,{variant:'C',source:'',sdk:()=>({}),record(){},eligible:()=>true});
  await assert.rejects(f.creative.preparePlayer(),/safely gate/);assert.equal(f.calls.init,0);
});
test('QA options extraction refuses unknown current architecture',()=>{
  assert.throws(()=>optionsFromSource('',{}),/markers/);
});
for(const file of ['_gam_kv_.js','IntextManager.js']) {
  test(file+': rule-discovered native tag/t do not become video targeting implicitly',()=>{
    const source=fs.readFileSync(path.join(__dirname,'..',file),'utf8');
    const begin=source.indexOf('  resolveVideoRequestTargeting() {'),end=source.indexOf('\n  }',begin)+6;
    const Node=new Function('INTEXT_RANDOM_KEYS','logIntext','return class { '+source.slice(begin,end)+' };')(['random1','random2','random3','random4'],()=>{});
    let ruleCalls=0;
    const node=Object.assign(new Node(),{id:'gexp-intext',slot:null,scopedContext:null,getSlotTargetingMapSafe:()=>null,
      manager:{getPageCustomTargeting:()=>({}),getIntextRandomValue:key=>key==='random1'?'8':null,
        resolveIntextRuleTargeting:()=>{ruleCalls++;return {values:['native-tag']};}}});
    const result=node.resolveVideoRequestTargeting().targeting;
    assert.equal(result.random1,'8');assert.equal(result.tag,undefined);assert.equal(result.t,undefined);assert.equal(ruleCalls,0);
    node.scopedContext={targeting:{tag:'scoped-tag',t:'scoped-t'}};
    const scoped=node.resolveVideoRequestTargeting().targeting;assert.equal(scoped.tag,'scoped-tag');assert.equal(scoped.t,'scoped-t');
  });
  test(file+': QA options are taken from current source, unchanged for all variants',()=>{
    const source=fs.readFileSync(path.join(__dirname,'..',file),'utf8');
    global.window={google:{ima:{ImaSdkSettings:{VpaidMode:{INSECURE:2}}}}};
    try {
      const creative={playerId:'slot-2',config:{video:{}},resolveVideoControlsConfig:()=>({showForJsAds:true}),getVideoTagUrl:()=> 'https://example.test/tag?cust_params=tag%3Da%26t%3Db'};
      const options=optionsFromSource(source,creative);
      assert.equal(options.adTagUrl,creative.getVideoTagUrl());assert.equal(options.adsRenderingSettings.enablePreloading,true);
      assert.equal(options.timeout,30000);assert.equal(options.prerollTimeout,30000);assert.equal(options.postrollTimeout,30000);
      assert.equal(options.autoPlayAdBreaks,true);
    } finally {delete global.window;}
  });
}
test('offline HAR audit normalizes only correlator and retains random, tag/t and VAST body evidence',()=>{
  const har={log:{entries:[{request:{url:'https://pubads.g.doubleclick.net/gampad/ads?env=vp&correlator=123&cust_params=random1%3D8%26tag%3Dqa%26t%3Dline'},response:{status:200,content:{text:'<VAST/>'}},time:30}]}};
  const entry=videoRequests(har)[0];assert.equal(entry.parameters.correlator,undefined);
  assert.equal(entry.targeting.random1,'8');assert.equal(entry.targeting.tag,'qa');assert.equal(entry.response.text,'<VAST/>');
  assert.deepEqual(differences(entry.targeting,{random1:'10'}).map(value=>value.key),['random1','t','tag']);
});
