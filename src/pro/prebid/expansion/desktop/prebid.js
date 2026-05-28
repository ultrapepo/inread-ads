<?php include(__DIR__ . '/prebidconfig_video.php'); ?>
function getDFPCT(data) {
  let a = data.adSlots[0].adUnit.split('/');
  return a.pop()
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

window.setTimeout( () => { requestSlotsAfterPaywallCheck(); }, 3000);

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

<?php include(__DIR__ . '/prebidconfig.php'); ?>
var adUnits=JSON.parse(adUnits_s);
var adUnits_nc=JSON.parse(adUnits_s);

if ('portada' === getDFPCT(data)) {
  adUnits_video.mediaTypes.video.plcmt = 2;
  adUnits_video.mediaTypes.video.playbackmethod = [6]
}

<?php echo "var dfpPremium = '", (isset($_dfpPremium) ? $_dfpPremium : 'std'), "';\n"?>

var posfilter = /-pr[vm]$/;
if (dfpPremium === 'prm') {
    posfilter = /-prv$/;
} else if (dfpPremium === 'prm-prw') {
    posfilter = /-prm$/;
}

var map = JSON.parse('{"div-gpt-ad-LDB1":"m","div-gpt-ad-LDB2":"c990x50b","div-gpt-ad-LDB3":"mb","div-gpt-ad-MPU1":"r","div-gpt-ad-MPU2":"rb","div-gpt-ad-MPU3":"rd","div-gpt-ad-MPU4":"rc","div-gpt-ad-SD":"sd","div-gpt-ad-SI":"si"}');

function getLazyLoad(data) {
    return ['c990x50_320x53b', 'mb', 'mb-prv', 'rb', 'rc', 'rd', 'rd-prm', 're', 'rf'];
}

const LazyLoaded = getLazyLoad(data);
const rootMarginLL = '25% 0px 25% 0px';
<?php
if (isset($_SERVER['HTTP_X_GEO_ISO'])) {
    if (($_SERVER['HTTP_X_GEO_ISO'] == 'ES') || ($_SERVER['HTTP_X_GEO_ISO'] == 'YY')) {
        echo "\nvar enableUELazyLoad = LazyLoaded.length != 0;\n";
    } else {
        echo "\nvar enableUELazyLoad = false;\n";
    }
} else {
    echo "\nvar enableUELazyLoad = LazyLoaded.length != 0;\n";
}
?>

let prebid_not_lazyload = [];

adUnits = adUnits.filter(function(item) {
	if (item.code in map) {
        if (!map[item.code].match(posfilter)) {
          const pos = map[item.code] 
          item.code = data.divId + '_' + pos<?php echo (isset($_uniqueCtId) ? " + '_$_uniqueCtId'" : ""), ";\n"?>

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
              console.log('prebid LL: ', item.code)
          }          

          item.optiYield = {
            adUnitPath: '/' + data.networkId + '/' + data.adSlots[0].adUnit,
            cd: {
              cd1: pos
            }
          }
          return true;
        }
    }
    return false;
});
console.log('prebid LL: ', prebid_not_lazyload)

if (typeof pbjs !== 'undefined') {
    pbjs.bidderSettings = {
        taboola: {
          storageAllowed: true
        }
    }
		pbjs.que.push(function() {
		
      <?php include(__DIR__ . '/../expansion2/prebidconfig/config.js'); ?>
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
                    let bidsWin = pbjs.getHighestCpmBids();
                    if (bidsWin.find(a => a.dealId == "ramkt") || bidsWin.find(a => a.dealId == "1PsYeoooYs")) {
                        googletag.cmd.push(function() {
                            googletag.pubads().getSlots().filter(e => e.getSizes().find(function(size) { if (size.width == 120 && size.height == 600 || size.width == 160 && size.height == 600 || size.width == 120 && size.height == 1000 || size.width == 160 && size.height == 1000 || size.width == 450 && size.height == 1000 || size.width == 120 && size.height == 1001 || size.width == 160 && size.height == 1001 || size.width == 450 && size.height == 1001) { return size } })).forEach(a => a.setTargeting('hb_deal', ['ramkt', '1PsYeoooYs']));
                        })
                    }
                    initAdServer();
                });
			}
		});
	});
}

<?php include(__DIR__ . '/../expansion2/_gam_kv_country.php'); ?>
