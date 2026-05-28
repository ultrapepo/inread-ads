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
if (isset($_SERVER['HTTP_X_GEO_ISO'])) {
    if (($_SERVER['HTTP_X_GEO_ISO'] == 'ES') || ($_SERVER['HTTP_X_GEO_ISO'] == 'YY')) {
echo <<<HTTP_X_GEO_ISO_CODE
function getLazyLoad(s, ct) {
  if (s === 'portada')
    return ['re', 'rf', 'rg', 'ri', 'rj', 'c990x50_320x53d'];
  if ( ['tiramillas', 'motor', 'baloncesto'].includes(s) )
    return ['rb', 'rc', 'rd', 're', 'r-nata'];
  if (ct === 'dir')
    return ['rb', 'rc', 'rd', 're', 'r-nata'];
      
  return [];
}

function getrootMargin(data, s) {
  let p = '100';
  if ( ['tiramillas', 'motor', 'baloncesto'].includes(s) ) {
    const rm = ['20', '50', '75', '100'];
    p = rm[Math.floor(Math.random() * rm.length)];
  }
  data.customTargeting.llrm = [p];
  return p + '% 0px ' + p + '% 0px';
}
HTTP_X_GEO_ISO_CODE;
    } else {
      if ($_SERVER['HTTP_X_GEO_ISO'] != 'US') {
echo <<<HTTP_X_GEO_ISO_CODE
function getLazyLoad(s, ct) {
  return [];
}

function getrootMargin(data, s) {
    var p = '100';
    data.customTargeting.llrm = [p];
    return p + '% 0px ' + p + '% 0px';
}
HTTP_X_GEO_ISO_CODE;
      } else {
echo <<<HTTP_X_GEO_ISO_CODE
function getLazyLoad(s, ct) {
  return ['b300x100b', 'b300x100c', 'b300x100d', 'c990x50_320x53', 'c990x50_320x53b', 'c990x50_320x53c', 'c990x50_320x53d', 'mb', 'r-nata', 'r-nata-prm-snw', 'rb', 'rb-prm-snw', 'rc', 'rc-prm-snw', 'rd', 'rd-prm-snw', 're', 're-prm-snw', 'rf', 'rg', 'rh', 'ri', 'rj', 'rk'];
}

function getrootMargin(data, s) {
    var p = '100';
    data.customTargeting.llrm = [p];
    return p + '% 0px ' + p + '% 0px';
}
HTTP_X_GEO_ISO_CODE;
      }
    }
} else {
echo <<<HTTP_X_GEO_ISO_CODE
function getLazyLoad(s) {
  return [];
}

function getrootMargin(data, s) {
    var p = '0';
    data.customTargeting.llrm = [p];
    return p + '% 0px ' + p + '% 0px';
}
HTTP_X_GEO_ISO_CODE;
}
?>

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
      if (typeof _gam_kv_ !== 'undefined') {
        _gam_kv_(slot);
      }
      googletag.pubads().refresh([slot]);
    });
  });
}

const DFPSection = getDFPSection(data);
const DFPCT = getDFPCT(data);
const LazyLoaded = getLazyLoad(DFPSection, DFPCT);
const rootMarginLL = getrootMargin(data, DFPSection);

var enableUELazyLoad = LazyLoaded.length != 0;

let requestManager = {
  adserverRequestSent: false,
  aps: false,
  prebid: false
};
function sendAdserverRequest() {
  if (requestManager.adserverRequestSent === true) {
    return;
  }
  requestManager.adserverRequestSent = true;
  googletag.cmd.push(function() {
    if (typeof _gam_kv_ !== 'undefined') {
      googletag.pubads().getSlots().forEach(s=>{ _gam_kv_(s); });
    }
    if ('a' !== getDFPCT(data)) {
      googletag.pubads().refresh(window.__unfilteredSlots);
    } else {
      googletag.pubads().refresh(googletag.pubads().getSlots().filter((s) => ! s.getSlotElementId().includes('_r_')));
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
if (isset($_GET['enabledCWV'])) {
  echo <<< CWV_CODE
function runAds() {
CWV_CODE;
}
?>
<?php include(__DIR__ . '/prebidconfig.php'); ?>
var adUnits=JSON.parse(adUnits_s);

var adUnits_nc = JSON.parse(JSON.stringify(adUnits));
var map = JSON.parse('{"div-gpt-ad-LDB1":"m","div-gpt-ad-LDB2":"mb","div-gpt-ad-MPU1":"r","div-gpt-ad-MPU2":"rb","div-gpt-ad-MPU3":"rc","div-gpt-ad-MPU4":"rd","div-gpt-ad-MPU5":"re","div-gpt-ad-MPU6":"rf","div-gpt-ad-MPU7":"rg","div-gpt-ad-MPU8":"ri","div-gpt-ad-MPU9":"rj","div-gpt-ad-SD":"sd","div-gpt-ad-SI":"si"}');

if ('portada' === getDFPCT(data)) {
  adUnits_video.mediaTypes.video.plcmt = 2;
  adUnits_video.mediaTypes.video.playbackmethod = [6]
}

let prebid_not_lazyload = [];

adUnits.forEach(function(item) {
	if (item.code in map) {
    const pos = map[item.code]
		item.code = data.divId + '_' + pos + '_' + uniqueCtId;
    
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
	}
});

if (typeof pbjs !== 'undefined') {
    pbjs.bidderSettings = {
        pubmatic: {
          allowAlternateBidderCodes: true,
          allowedAlternateBidderCodes: ["groupm"]
        },
        taboola: {
          storageAllowed: true
        }
    }
		pbjs.que.push(function() {

    let pbjs_config = {
      useBidCache: true,
      bidCacheFilterFunction: bid => bid.adUnitCode.indexOf('-video') === -1,
      cache: {
        url: 'https://prebid-cache.pbstck.com/cache'
      },
      userSync: {
        filterSettings: {
            iframe: {
              bidders: ['richaudience', 'pubmatic', 'rubicon', 'appnexus'],
              filter: 'include'
            }
        }
      },
			priceGranularity: "dense",
			enableSendAllBids: true,
      consentManagement: {
        gdpr: {
            cmpApi: 'iab',
            timeout: 8000,
            defaultGdprScope: true
        }
      },
			rubicon: { singleRequest: true }
    };
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
if (isset($_GET['enabledCWV'])) {
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
<?php include '/mnt/filer/html/produccion/httpd/portales/com/marca/esi/ads/d/_gam_kv_country.php'; ?>
