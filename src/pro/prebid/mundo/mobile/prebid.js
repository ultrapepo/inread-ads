<?php include(__DIR__ . '/prebidconfig_video.php'); ?>

function getDFPSection(data) {
  return data.adSlots[0].adUnit.split('/').at(1);
}

function getDFPCT(data) {
  return data.adSlots[0].adUnit.split('/').pop();
}

window.marfeel = window.marfeel || { cmd: [] };
window.marfeel.cmd.push(['compass', function(compass) {
  compass.getRFV(({rfv}) => {
    let userType;

    if (rfv <= 1) {
      userType = 'new';
    } else if (rfv <= 10) {
      userType = 'fly-by';
    } else if (rfv <= 35) {
      userType = 'casual';
    } else if (rfv <= 60) {
      userType = 'loyal';
    } else {
      userType = 'lover';
    }
    googletag.cmd.push(() => {
      googletag.pubads().setTargeting('rfv', userType);
    });
  });
}]);

<?php
if (isset($UEBrandDay) && $UEBrandDay == 0) {
echo <<<NO_BRAND_DAY_CODE
if ('a' === getDFPCT(data)) {
  data.adSlots = data.adSlots.filter(function (item) {
    return item.customTargeting.p[0] === 'r';
  });
}
NO_BRAND_DAY_CODE;
}
?>

function getLazyLoad(DFPSection, DFPCT) {
  if (['n', 'ne', 'o'].includes(DFPCT))
    return ['rb', 'rc', 'mb', 'rd', 'rd-prm', 'rd-prm-snw', 're', 're-prm', 're-prm-snw'];

  return [];
}

function getrootMargin(DFPSection, DFPCT) {
  return '25% 0px 25% 0px';
}

const positionsToBeRequestedAfterPaywallCheck = ['f2', 'f3'];
let slotsToBeRequestedBeforePaywallCheck = [];
let slotsToBeRequestedAfterPaywallCheck = [];
window.requestSlotsAfterPaywallCheckAlreadyCalled = false;

window.requestSlotsAfterPaywallCheck = () => {

  if (window.requestSlotsAfterPaywallCheckAlreadyCalled === true) {
    return
  }
  window.requestSlotsAfterPaywallCheckAlreadyCalled = true;

  googletag.cmd.push(function() {
    googletag.pubads().refresh(slotsToBeRequestedAfterPaywallCheck);
  });
}

window.setTimeout(() => { requestSlotsAfterPaywallCheck(); }, 3000);

function refreshSlot(slot) {
  var hb_p = [];
  // apstag
  var aps_data_r = {
    slots: []
  };
  var sizes = slot.getSizes().filter(function(size) {
    return size !== 'fluid'
  });
  if (sizes.length > 0) {
    sizes = sizes.map(function(adSlotSize) {
      return [adSlotSize.getWidth(), adSlotSize.getHeight()];
    }).filter(function(size) {
      return (size[0] !== 1) && (size[1] !== 1);
    });
    if (sizes.length > 0) {
      aps_data_r.slots.push({
        slotID: slot.getSlotElementId(),
        slotName: slot.getAdUnitPath(),
        sizes: sizes
      });
    }

    hb_p.push(new Promise(function(result, reject) {
      apstag.fetchBids(aps_data_r, function(bids) {
        apstag.setDisplayBids();
        result();
      });
    }));
  }

  hb_p.push(new Promise(function(result, reject) {
    pbjs.requestBids({
      timeout: 1000,
      adUnitCodes: [slot.getSlotElementId()],
      bidsBackHandler: function(bidResponses, timedOut, auctionId) {
        pbjs.setTargetingForGPTAsync([slot.getSlotElementId()]);
        result();
      }
    });
  }));

  Promise.all(hb_p).then(function(results) {
    googletag.cmd.push(function() {
      _gam_kv_(slot);
      googletag.pubads().refresh([slot]);
    });
  });
}

const DFPSection = getDFPSection(data);
const DFPCT = getDFPCT(data);
const LazyLoaded = getLazyLoad(DFPSection, DFPCT);
const rootMarginLL = getrootMargin(DFPSection, DFPCT);

var enableUELazyLoad = LazyLoaded.length != 0;

let requestManager = {
  adserverRequestSent: false,
  aps: false,
  prebid: false
};

let mAlreadyCreated = false;

function sendAdserverRequest() {
  if (requestManager.adserverRequestSent === true) {
    return;
  }
  requestManager.adserverRequestSent = true;
  googletag.cmd.push(function() {
    googletag.pubads().getSlots().forEach(s=>{ _gam_kv_(s); });
    if (mAlreadyCreated) {
      let slots = slotsToBeRequestedBeforePaywallCheck.filter(s => !s.getSlotElementId().includes('_m_'));
      googletag.pubads().refresh(slots);
    } else {
      if ('a' !== getDFPCT(data)) {
        googletag.pubads().refresh(slotsToBeRequestedBeforePaywallCheck);
      } else {
        googletag.pubads().refresh(googletag.pubads().getSlots().filter((s) => ! s.getSlotElementId().includes('_r_')));
      }
    }
  });
}

function biddersBack() {
  //console.log('Manolo:', requestManager);
  if (requestManager.aps && requestManager.prebid) {
    sendAdserverRequest();
  } 
}

window.setTimeout(() => { sendAdserverRequest(); }, 5000);

<?php
if (isset($enabledCWV) && $enabledCWV) {
  echo <<< CWV_CODE
function runAds() {
CWV_CODE;
}
?>
<?php include(__DIR__ . '/prebidconfig.php'); ?>
var adUnits=JSON.parse(adUnits_s);
var adUnits_nc=JSON.parse(adUnits_s);

if ('portada' === getDFPCT(data)) {
  adUnits_video.mediaTypes.video.plcmt = 2;
  adUnits_video.mediaTypes.video.playbackmethod = [6]
}

<?php echo "var dfpPremium = '", (isset($_dfpPremium) ? $_dfpPremium : 'std'), "';\n"?>

var posfilter = /-pr[vm]$/;
if (dfpPremium === 'prm' || dfpPremium === 'prm-piano') {
    posfilter = /-prv$/;
} else if (dfpPremium === 'prm-prw') {
    posfilter = /-prm$/;
}

var map = JSON.parse('{"div-gpt-ad-LDB1":"m","div-gpt-ad-LDB4":"msup","div-gpt-ad-LDB2":"c990x50_320x53","div-gpt-ad-LDB3":"mb","div-gpt-ad-MPU1":"r","div-gpt-ad-MPU2":"rb","div-gpt-ad-MPU3":"rc","div-gpt-ad-MPU4":"rd","div-gpt-ad-MPU5":"re","div-gpt-ad-MPU6":"rf","div-gpt-ad-MPU7":"rg","div-gpt-ad-MPU8":"rh","div-gpt-ad-LDB1P":"m-prm","div-gpt-ad-LDB1PRV":"m-prv","div-gpt-ad-MPU2P":"rb-prm","div-gpt-ad-MPU3P":"rc-prm","div-gpt-ad-MPU4P":"rd-prm","div-gpt-ad-MPU5P":"re-prm","div-gpt-ad-MPU1P":"r-prm","div-gpt-ad-MPU1PRV":"r-prv","div-gpt-ad-SD":"sd","div-gpt-ad-SI":"si"}');

let prebid_not_lazyload = [];
adUnits = adUnits.filter(function(item) {
	if (item.code in map) {
      if (!map[item.code].match(posfilter)) {
          const pos = map[item.code]
          item.code = data.divId + '_' + map[item.code]<?php echo (isset($_uniqueCtId) ? " + '_$_uniqueCtId'" : ""), ";\n"?>
          item.bids.forEach(b => {
            if (b.bidder === 'ttd') {
              b.params.placementId = data.adSlots[0].adUnit + '/' + pos
            }
            if (b.bidder === 'taboola') {
              b.params.tagId = data.adSlots[0].adUnit + '/' + pos
            }
          })
          if (!LazyLoaded.includes(pos)) {
            prebid_not_lazyload.push(item.code)
          } else {
          //console.log('prebid LL: ', item.code)
          }
          return true;
      }
    }
    return false;
});

if (typeof pbjs !== 'undefined') {
    pbjs.bidderSettings = {
        taboola: {
          storageAllowed: true
        }
    }
		pbjs.que.push(function() {
		
      <?php include(__DIR__ . '/../elmundo/prebidconfig/config.js'); ?>
      pbjs.setConfig(pbjs_config);

    if (!window.ueInitPrebid) {
      document.dispatchEvent(new CustomEvent('ueInitPrebid'));
      window.ueInitPrebid = true;
    }

		pbjs.addAdUnits(adUnits);

		pbjs.requestBids({
			timeout: 1000,
			adUnitCodes: prebid_not_lazyload,
			bidsBackHandler: function () {
                window.didomiOnReady = window.didomiOnReady || [];
                window.didomiOnReady.push(function(Didomi) {
                    pbjs.setTargetingForGPTAsync();
                    let bidsWin = pbjs.getHighestCpmBids();
                    if (bidsWin.find(a => a.dealId == "ramkt") || bidsWin.find(a => a.dealId == "1PsYeoooYs")) {
                        googletag.cmd.push(function() {
                            googletag.pubads().getSlots().filter(e => e.getSizes().find(function(size) { if (size.width == 120 && size.height == 600 || size.width == 160 && size.height == 600 || size.width == 120 && size.height == 1000 || size.width == 160 && size.height == 1000 || size.width == 450 && size.height == 1000 || size.width == 120 && size.height == 1001 || size.width == 160 && size.height == 1001 || size.width == 450 && size.height == 1001) { return size } })).forEach(a => a.setTargeting('hb_deal', ['ramkt', '1PsYeoooYs']));
                        })
                    }
                    initAdServer();
                    requestManager.prebid = true;
                    biddersBack();
                });
			}
		});
	});
}
<?php
if (isset($enabledCWV) && $enabledCWV) {
  echo <<< CWV_CODE
}
window.addEventListener('ue-permutive-loaded', () => {
    window.didomiOnReady.push(() => {
        if (window.Didomi.isConsentRequired()) {
            initPubAds();
            runAds();
        }
    });
});
CWV_CODE;
}
?>

<?php include(__DIR__ . '/../elmundo/_gam_kv_country.php'); ?>
