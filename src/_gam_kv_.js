class WindowArray {
    static _gam_mapaps = '#####k0zk#a0hs#9u1hcn08w#e718gx0qo#5h1q8ti4g#ydj403im8#pnjlsgidc#u0jcwqiv4#lajuowr28#qgs1s6rk0#hqsjkjrb4#m3saotrsw#ddssgq96o#6aa6809og#xkao0d9fk#1xaf4n9xc#t7awwydj4#mieio8e0w#dsf0glds0#i5erkve9s#9ff9crvnk#2bwn41w5c#tlx4wevwg#xyww0owe8#p8xdsv4lc#uf5kw5534#lp62oi4u8#q25tss5c0#hc6bkomps#a8npcyn7k#1io74bmyo#5vny8lngg#x5og06rk##2j7r4979c#tt88wm70g#y6800w7i8#pg8hssow0#icpvk2pds#9mqdcfp4w#dzq4gppmo#59qm8vxts#afytc5ybk#1pzb4iy2o#62z28sykg#xczk0pfy8#q9gxszgg0#hjhfkcg74#lwh6omgow#d6hogxkao#6hla87ksg#xrls0kkjk#24lj4ul1c#tem0wr2f4#mb3eo12ww#dl3wge2o0#hy3nko35s#9845cubcw#eeccg4buo#5ocu8hbls#a1clcrc3k#1bd34nthc#u7ugwxtz4#lhuyoatq8#puupsku80#h4v7klds##jmdc#9lvk#jtmv4mlmo#o6mm8wm4g#fgn40t3i8#8d4hs3400#zn4zkg3r4#404qoq48w#va58gwcg0#0gdfk6cxs#rqdxcjcow#w3dogtd6o#nde68pukg#g9vk0zv28#7jw1scutc#bwvswmvb4#36waoxyww#whzwg7zeo#ns0e8kz5s#s505cuznk#jf0n4rh1c#cbi0w1hj4#3liioeha8#7yi9sohs0#z8irkupz4#4eqyo4qgw#vorgghq80#01r7krqps#rbrpco83k#k8934y8lc#bi9kwb8cg#fv9c0l8u8#759tss5c##cit4w8sn4#3stmolse8#85tdsvsw0#zftvksa9s#scb9c2ark#jmbr4faio#nzbi8pb0g#f9c00vj7k#kfk745jpc#bpkowijgg#g2kg0sjy8#7ckxsp1c0#092bkz1ts#rj2tcc1kw#vw2kgm22o#n6328x5og#gh6o07668#7r75sk5xc#c46wwu6f4#3e7eoqnsw#waosg0oao#nkpa8do1s#rxp1cnojk#j7pj4twqo#odxq83x8g#fny80gwzk#k0xz4qxhc#baygwnev4#47fuoxfcw#vhgcgaf40#zug3kkfls#r4glcsow##jtog#9t6o#etu68msxs#j6txcwtfk#aguf4tatc#3dbsw3bb4#uncaogb28#z0c1sqbk0#qacjkwjr4#vgkqo6k8w#mql8gjk00#r3kzktkhs#idlhcq1vk#ba2v402dc#2k3cwd24g#6x340n2m8#y73lsy680#ri77k86ps#is7pcl6gw#n57ggv6yo#ef7y8rocg#7bpc01ou8#ylptseolc#zey9sry0w#6igw0zgg##360ow2i2o#a9jb4iqrk#v99mom9ds#2regwqv40#mxwcg44jk#6b5s0amf4#jf28#wetc#4mxogw54w#136dcznr4#86ozkkruo#hbapsoagw#0ok5co0sg#kv20w8lc0#4fmkgf37k#pfcw0scn4#wivi8wydc#h3zls0gzk#o7i80gpog#978jkk8ao#cbxtsbegw#wifpconwg#fvp4wv5s0#p0av4dam8#w3thcd0xs#sk268gjk0#znksg43cw#kum807lz4#47vnk7cao#oedj4ph4w#vwidcvz0g#gw8ow98g0#nzrb4hq8##qoiyol0cg#xs1kw191c#irrwg4rnk#q9wqo9dds#agem8mmtc#tto1st4ow#f0phcdp8g#m483kdfk0#ikgsggy68#pnzeo229s#ysl4w5kw0#i5ukg5b7k#2ccg0rpj4#cyqrky7eo#xyh34bgu8#51zpcg2kg#hqcqonncw#l2sxs4ao0#jeku89fr4#mr11c8cu8#sz5s#97uo#my48wonb4#3djpctse8#omccg3o5c#tl9fkg4cg#wqeiosi68#47nr44ydc#jf8jkwkcg#6p4aoa8e8#a1khsksg0#q9ou8hdds#d69s01a8##u0bggv6dc#3dzi8btog#jm3uojegw#myk1sk5c0#v91q8paf4#agmio4pvk#wx9tsdiio#02ewwm6f4#whkw#4lxc#h24g#cbnk#oruo#ww74#b668#ju2o#smps#8268#d79c#w934#3tvk#kh6o#pm9s#ya68#ck5c#n474#0s8w#se80#8oow#0n4##fl6o#nwu8#9p8g#a2o0#un7k#2cxs#or9c#b37k#y8sg#2ayo#qj28#65ts#udxc#yg3k#5l34#x1c##ebcw#m134#';
    static pbFloorCfg = {
        floors: {
            data: {
                currency: 'USD',
                schema: {
                    delimiter: '|',
                    fields: ['adUnitCode', 'mediaType']
                },
                values: {}
            }
        }
    };
    IT_NONE = -1;
    IT_HOUSE = 0;
    IT_ADEX = 1;
    IT_PREBID = 2;
    lastImpressionType = -1;
    canReload = false;
    nReloads = 0;
    kPrefix = 'gexp_';
    tKeys = {
        "lastRes": "last_result",
        "last": "last_floor"
    };
    impressionData = [];
    strategy = "base";

    constructor(position, cfg, gexp) {
        this.gexp = gexp;
        this.forcePrice = null;
        this.allowUpdate = false;
        this.array = cfg.pList;
        this.position = position;
        this.prebidPromise = null;
        this.viewablePromise = null;
        this.lastWasBlank = false;
        this.refreshing = false;
        this.pCfg = null;
        this.cI = null;
        this.effectivePrice=null;
        this.effectivePriceIndex=null;
        this.tempWindowStart=null;
        this.lastPriceIndex=null;
        this.lastImpressionType=this.IT_NONE;


        let def = cfg.positions['default'];
        if (typeof cfg.positions[position] !== "undefined") {
            var mydef = this.getConfiguration(cfg.positions[position]);
            this.pCfg = {};
            for (var k in def)
                this.pCfg[k] = mydef[k] ?? def[k];
        } else
            this.pCfg = def;
        this.slot = null;
        this.state = {
            windowStart:-1,
            nAdex:0,
            nHouse:0,
            ahistory: [],
            aresults: [],
            blocked: {},
            nConsAdex: 0,
            nConsHouse: 0,
            last: null,
            lastRes: this.IT_NONE,
            lastPrice:-1,
            lastPriceIndex:-1,
            lastWasPrebid:false,
            lastPrebidIndex:0,
            date: this.today(),
            blankOverriden: this.lastWasBlank,
            nHouseOnReloads: 0,
            lastReset:null,
            nResets:0,
            nGoodCpms:0,
            nYestGoodCpms:0,
            nProbes:0,
            nPriceUpgrades:0,
            last2Res:null,
            last2:null
        };
        this.frozen = false;
        this.prebidValue = null;
        this.lastPrice = null;
        this.prebidIndex = -1;
        this.usingPrebid = false;
        this.offY = null;
        /*if(position && position.indexOf("patrocinio")>=0 && document.location.href.indexOf("elmundo.es")>=0)
        {
            let nRefresh=5;
            let refInterval    =20000;
            let curR=0;
            let interv=setInterval(()=>{
                this.refreshing=true;
                if(curR < nRefresh)
                {
                    curR++;
                    this.refreshSlot(false,true);
                }
            },refInterval)
        }*/
    }

    getStrategy() {
        return this.strategy;
    }
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    getBasePrice()
    {
        let p=this.gexp.getPivotIndex(this.cI.adUnit, this.position,
            0, this.offY);
        if(p===null)
            return this.pCfg.p+1;
        /*if(p==0 && this.offY < 20)
            p=1;*/
        return p;

    }
    initPrice() {

        let iP = this.getBasePrice();
        /*if(this.state.nYestGoodCpms>=2 || this.state.nGoodCpms>=2)
        {
            iP+=2;
        }*/
        //if(this.position==="rd")
        //    iP+=10;

        if (typeof this.pCfg.rv !== "undefined" && Math.random()>.5)
            iP = Math.max(0, iP + Math.floor(Math.random() * this.pCfg.rv * 2 - this.pCfg.rv));
        return iP;
    }

    initStrategy() {
        return {};
    }

    newImpression() {
        const now = new Date();

        let slot = this.slot;
        this.allowUpdate = true;
        this.cI = {
            strategy: this.state.strategy,
            nHouse: this.state.nHouse,
            nAdex: this.state.nAdex,
            adUnitPath: slot.getAdUnitPath(),
            adUnit: slot.getAdUnitPath().split('/')[2] || 'unknown',
            nReloads: this.nReloads,
            adFilled: false,
            adLoadTime: null,
            adReadyTime: null,
            adMaxViewability: 0,
            adViewable: false,
            last: this.state.last,
            lastPrice:this.state.lastPrice,
            lastPriceIndex:this.state.lastPriceIndex,
            lastRes: this.state.lastRes,
            lastWasPrebid:this.state.lastWasPrebid,
            usingPrebid:false,
            adRequestTime: this.gexp.getTimeOffset(),
            usingPricePivot: false,
            adUpFloorCredits: this.state.nUpCredits,
            debugStr: '',
            isBlankReload: false,
            wasRefreshed: false,
            adHist:"",
            adHistRes:"",
            adHistResets:this.state.nResets,
            nGoodCpms:this.state.nGoodCpms,
            nYestGoodCpms:this.state.nYestGoodCpms,
            nProbes:this.state.nProbes,
            updatedWindowStart:null,
            nPriceUpgrades:this.state.nPriceUpgrades,
            gexp_floor:0,
            tlm_rid:null
        };
        if(typeof window.crypto!=="undefined" && typeof window.crypto.randomUUID!=="undefined" )
            this.cI.tlm_rid=window.crypto.randomUUID();
        let s = this.cI.nHouse + this.cI.nAdex;
        this.cI.houseAdexSum=s;
        if (s > 0) {
            this.cI.ahRatio = this.cI.nAdex / s;
        }
        this.state.nPriceUpgrades=0;
        this.adLoadTime = new Date().getTime();
        this.adResponseTime = new Date().getTime();
        if (this.pCfg.tl === true)
            this.gexp.registerImpression(this.cI);


    }

    setSlot(s) {
        this.slot = s;
    }

    getRandom(i) {
        return this.gexp.getRandom(i);
    }

    getConfiguration(c) {
        if (typeof c.random1 === "undefined")
            return c;
        let nOptions = c.random1.length;

        let r = this.getRandom(1);
        let opt = Math.floor(Math.floor(r / nOptions));
        return c.random1[opt];
    }

    toBounds(p) {
        p = Math.round(p);
        if (this.usingPrebid == true) {
            return p;
        }
        return Math.max(Math.min(this.array.length,p),0);
    }

    unserialize(obj) {
        let cDate = this.state.date;
        let sameStrategy = true;
        for (var k in this.state) {
            if (k === "strategy") {
                if (obj.strategy === this.strategy)
                    this.state.str_state = obj.str_state ?? this.state.str_state;
                else
                    sameStrategy = false;
                continue;
            }
            if (k === "str_state")
                continue;
            else
                this.state[k] = obj[k] ?? this.state[k];
        }


    }

    serialize(obj) {
        Object.assign(obj, this.state);
    }

    today() {
        return this.datetostring(new Date());
    }

    datetostring(d) {
        return d.getFullYear().toString() + (d.getMonth() + 1).toString().padStart(2, '0') + d.getDate().toString().padStart(2, '0');
    }

    block(value) {
        if (value === this.array[0]) {
            return;
        }
        let idx = this.array.indexOf(value);
        for (var k = idx; k < this.array.length; k++) {
            let v = this.array[k];
            if (typeof this.state.blocked[v] === "undefined")
                this.state.blocked[v] = 1;
            else
                this.state.blocked[v]++;
        }
    }

    unblockUntil(value) {
        this.state.blocked = {};
        return;
        for (var k = 0; k < this.array.length; k++) {
            if (this.array[k] <= value) {
                if (typeof this.state.blocked[this.array[k]] !== "undefined")
                    delete this.state.blocked[this.array[k]];
            } else
                return;
        }
    }

    resetDay(incResets) {
        this.resetUnblock();
        this.state.nHouse=0;
        this.state.nAdex=0;
        this.state.nProbes=0;
        this.state.onHisOwn=false;
        this.state.lastRes=this.IT_NONE;
        this.state.windowStart=this.getBasePrice();
        this.state.lastReset=(new Date()).getTime();
        this.state.nHouseOnReloads = 0;
        this.state.aresults=[];
        this.state.ahistory=[];


        if(typeof incResets=="undefined") {
            this.state.nResets = 0;
            this.state.nYestGoodCpms=this.state.nGoodCpms;
            this.state.nGoodCpms=0;
        }
        else
            this.state.nResets++;
    }

    resetUnblock() {
        this.state.blocked = {};
        return;
        let nToUnblock = this.pCfg.ub;
        let nU = 0;
        for (var k = 0; k < this.array.length && nU < nToUnblock; k++) {
            let v = this.array[k];
            if (typeof this.state.blocked[v] !== "undefined") {
                delete this.state.blocked[v];
                nU++;
            }
        }
    }

    getUpper(base, l) {
        for (let k = 0; k < l.length; k++) {
            if (l[k] >= base) {
                return l[k];
            }
        }
        return l[l.length - 1];
    }

    getIndexLesserThan(val) {
        for (var k = this.array.length - 1; k >= 0; k--) {
            if (this.array[k] <= val)
                return k;
        }
        return 0;
    }

    setPrebidValue(val,bidder) {
        this.cI.bidder=bidder;
        if (top.ueDataLayer?.be_page_autorefresh == 1) {
            this.prebidIndex = -1;
            this.prebidValue=0;
            return;
        }
        if (val == null || val == -1) {
            this.prebidIndex = -1;
            return;
        }
        // Fix de richaudience.No queremos que pervierta windowStart.
        if (parseInt(val) == 20 && bidder=="richaudience")
        {

                this.prebidValue=0;
                this.prebidIndex=-1;

            return;
        }
        this.prebidValue = val;
        this.prebidIndex = this.getIndexLesserThan(val);

    }

    getNextPrice() {
        this.usingPrebid = false;
        if (this.offY == null)
            this.offY = 0;
        this.updatePrice(this.state.lastRes, this.state.last);
        if(this.prebidIndex!==-1 &&
            (this.prebidValue>(this.array[this.state.windowStart]/4))
        )
        {
            this.setPrebidPrice();
        }
        if(typeof this.effectivePrice==="undefined") {
            this.effectivePrice = this.array[this.state.windowStart];
            this.effectivePriceIndex = this.state.windowStart;
        }
        return this.effectivePrice;
    }

    setOffY(offY) {
        // Si estamos usando prebid, no nos arriesgamos con la altura
        this.offY = offY;
    }

    getSlotOffset() {

        if (this.slot) {
            var el = document.getElementById(this.slot.getSlotElementId());
            if (el) {
                var rect = el.getBoundingClientRect(),

                    scrollLeft = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft,

                    scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                let currentNode = el;
                let parent=null;
                let top=rect.top;
                while (currentNode && currentNode.tagName !== "BODY" && currentNode!==parent) {
                    if(parent)
                    currentNode = parent;
                    if (window.getComputedStyle(currentNode).position === 'fixed') {
                        top=100;
                        scrollTop=0;
                        break;
                    }
                    parent=currentNode.parentNode;
                }

                return {top: top + scrollTop, left: rect.left + scrollLeft, uTop: top}
            }
        }
        return null;
    }

    checkPrebid() {
        let pbtoval = function (a) {
            if (a.length === 0)
                return 0;
            return parseFloat(a[0]);
        }
        let apstoval = function (a) {
            if (a.length === 0)
                return 0;
            a = a[0].replace("amp_", "").replace("v_", "").substring(2, 7).padEnd(5, '#');
            var pos = WindowArray._gam_mapaps.indexOf(a);
            if (pos === -1) {
                return -1;
            }
            var order = Math.floor(pos / 5);
            return Math.min(order, 300) * 0.01 + Math.max(Math.min(order - 300, 100), 0) * 0.05 + Math.max(Math.min(order - 400, 48), 0) * 0.25 + Math.max(Math.min(order - 448, 20), 0) * 0.5 + Math.max(order - 468, 0) * 1;
        }.bind(this);
        let valtosj = function (n) {
            if (n < 0.5)
                return 0;
            if ((0.5 <= n) && (n <= 1))
                return 1;
            if (n >= 7)
                return 4;
            return 1 + Math.floor((n - 1) / 2)
        }


        let s = this.slot;
        const t_pb = pbtoval(s.getTargeting('hb_pb'));
        const t_aps = apstoval(s.getTargeting('amznbid'));
        let m = Math.max(t_pb, t_aps);
        let hbb=s.getTargeting('hb_bidder');
        let bidder=null;
        if(typeof hbb!=="undefined" && hbb.length>0)
        {
            bidder=hbb[0];
        }
        if (m > 0) {
            return {
                'rndp': m.toFixed(2),
                'sj': valtosj(m).toString(),
                'hb_bidder':bidder
            };
        } else {
            return {'rndp': '-1', sj: '-1'}
        }
    }


    clearTargetings() {
        for (var k in this.tKeys)
            this.slot.clearTargeting(this.getkName(this.tKeys[k]));

        ["slOffy", "usOffY", "sj", "rndp", this.getkName('rfrsh')].map((i) => this.slot.clearTargeting(i));
    }

    setTargetings() {
        let isTestRandom = (this.getRandom(1) == 19);
        this.newImpression();
        let curTargeting = this.slot.getTargetingMap();
        let targetings = {};
        targetings.tlm_rid=this.cI.tlm_rid;
        if (curTargeting) {
            this.cI["refresco"] = localStorage.getItem('auto-refresh-counter') ?? '0';
            if (typeof curTargeting["amznsz"] !== "undefined")
                this.cI["amznsz"] = curTargeting["amznsz"][0];
        }

        let off = this.getSlotOffset();
        if (off !== null) {
            /* Offset del div del slot con respecto al 0,0 de la pantalla */
            targetings.slOffy = parseInt(off.top / 100);
            /* Offset del div del slot con respecto al scroll del usuario */
            targetings.usOffY = parseInt(off.uTop / 100);
            this.offY=targetings.usOffY;
            this.setOffY(targetings.usOffY);
        } else {
            this.offY = 0;
        }
        let today=this.today();
        if (this.state.date != today) {
            this.state.date = today;
            this.resetDay();
        }
        else {
            /*let cTime = (new Date()).getTime();
            if (typeof this.state.lastReset == "undefined" || this.state.lastReset === null || (this.state.lastReset - cTime) > 1 * 60 * 60 * 1000)
                this.resetDay(1);*/
        }

        if(this.state.windowStart===-1)
            this.state.windowStart=this.initPrice();
        /* Hora segun UTC */
        targetings.utch = (new Date()).getUTCHours();
        let pbt = this.checkPrebid();
        if (parseFloat(pbt.rndp) !== -1)
            this.setPrebidValue(parseFloat(pbt.rndp),pbt.hb_bidder);
        for (var k in this.tKeys) {
            if (this.state[k] !== null)
                targetings[this.getkName(this.tKeys[k])] = "" + this.state[k];
        }
        // Se calcula ahora la ev, para poder usarla en los calculos de precio.
        let gr = 'f';
        let ar = 'f';
        if (this.refreshing) {
            if (this.lastImpressionType === this.IT_HOUSE) {
                targetings['rfrsh'] = '1';
                targetings[this.getkName('rfrsh')] = this.nReloads;
                gr = 't';
            } else {
                targetings['rfrsh'] = '1';
                ar = 't';
            }
            targetings['ar'] = 1;

        }
        let expectedViewability = this.gexp.getExpectedViewability(this.cI.adUnit, this.offY, gr, ar);
        targetings['ev'] = "" + expectedViewability;
        this.cI.ev=targetings['ev'];

        if (this.gexp.isEnabled()) {
            this.getNextPrice();

            if (!isTestRandom) {
                targetings = Object.assign(targetings, pbt);
                if(typeof this.effectivePrice==="undefined" || this.effectivePrice === "undefined")
                {
                    this.effectivePrice=this.array[Math.floor(Math.max(0,Math.min(this.array.length - 1, this.state.windowStart)))];
                }
                targetings[this.getkName("floor")] = "" + this.effectivePrice;
            }
            this.cI["dataTimestamp"] = new Date().getTime();
            this.cI["windowStart"] = this.state.windowStart;
            this.cI["effectivePrice"] = this.effectivePrice;
            this.cI["effectivePriceIndex"] = this.effectivePriceIndex;
            this.cI["lastWasPrebid"]=this.state.lastWasPrebid;
            this.cI["last2Res"]=this.state.last2Res;
            this.cI["last2"]=this.state.last2;
            this.cI["lastPrice"]=this.state.lastPrice;
            this.cI["lastPriceIndex"]=this.state.lastPriceIndex;
            this.cI["lastRes"]=this.state.lastRes;
            this.cI["usingPrebid"]=this.usingPrebid;
            this.state.lastWasPrebid=this.usingPrebid;
            if(this.usingPrebid)
                this.state.lastPrebidIndex=this.prebidIndex;
            this.state.lastPrice=this.effectivePrice;
            this.state.lastPriceIndex=this.effectivePriceIndex;
        }
        targetings["aut"]=""+this.gexp.getUserType();
        this.cI.aut=targetings["aut"];

        targetings['h'] = document.hidden ? '1' : '0';
        let tt=this.getCookie("adopsCampTest");
        if(tt)
        {
            targetings["adopsCampTest"]=tt;
        }


        /*if(this.state.nUpCredits==0)
        {
            targetings['useTarget']=1;
        }*/
        this.slot.updateTargetingFromMap(targetings);

        let allT = this.slot.getTargetingMap();
        for (var k in allT) {
            if(k.includes("hb_pb")) {
                try {
                    this.cI[k + "_f"] = parseFloat(allT[k][0]);
                }catch(e){}
            }
            this.cI[k] = allT[k][0];
        }
        if(this.prebidIndex > -1 && this.prebidValue >=1)
        {
            this.slot.clearTargeting("r");
        }
        if (this.prebidFloor !== null)
            this.cI["prebidFloor"] = this.prebidFloor;
        this.cI['dailyAdex'] = this.state.dailyAdex;
        this.cI['dailyHouse'] = this.state.dailyHouse;
        this.cI['dailyAdexRatio'] = parseFloat(this.state.dailyAdex) / parseFloat((this.state.dailyAdex + this.state.dailyHouse));

    }

    isReloadAllowed(event) {
        if (event === null)
            return true;
        if(document.visibilityState === 'hidden')
            return false;
        if(this.gexp.isHouse(event.campaignId,event.lineItemId,event.advertiserId))
            return true;
        if (this.pCfg.disableReload) {
            return false;
        }

        return this.gexp.isReloadAllowed(event.campaignId, event.lineItemId, event.advertiserId);
    }

    isNodeVisible(node) {
        if (!node || !(node instanceof Element)) {
            console.warn('Provided node is not a valid DOM element');
            this.cI.nodeVisibleType = 'dontExist';
            return 'occluded';
        }

        // 1️⃣ Check if node or any ancestor has display:none
        let current = node;
        while (current) {
            const style = window.getComputedStyle(current);
            if (style.display === 'none') {
                this.cI.nodeVisibleType = 'displayNone';
                return 'occluded';
            }
            current = current.parentElement;
        }

        // 2️⃣ Check size
        const rect = node.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            this.cI.nodeVisibleType = 'zeroSize';
            return 'zero-size';
        }

        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;
        const scrollY = window.scrollY;

        // 3️⃣ Check horizontal bounds
        if (rect.right <= 0 || rect.left >= viewportWidth) {
            this.cI.nodeVisibleType = 'outsideHorizontalBounds';
            return 'occluded';
        }

        // 4️⃣ Check if node is above scroll position (user scrolled past)
        const nodeBottomY = rect.bottom + scrollY;
        if (nodeBottomY < scrollY) {
            this.cI.nodeVisibleType = 'overScroll';
            this._setupIntersectionObserver(node);
            return 'occluded';
        }

        // 5️⃣ Check vertical offscreen (still below or above viewport)
        if (rect.bottom < 0 || rect.top > viewportHeight) {
            this.cI.nodeVisibleType = 'offscreenY';
            this._setupIntersectionObserver(node);
            return 'visible'; // defer final check
        }

        // 6️⃣ Check occlusion at center point
        const centerX = Math.min(Math.max(rect.left + rect.width / 2, 0), viewportWidth - 1);
        const centerY = Math.min(Math.max(rect.top + rect.height / 2, 0), viewportHeight - 1);

        const topElement = document.elementFromPoint(centerX, centerY);

        if (!topElement) {
            this.cI.nodeVisibleType = 'notPossible';
            return 'occluded';
        }

        if (node === topElement || node.contains(topElement)) {
            this.cI.nodeVisibleType = 'visible';
            return 'visible';
        }

        this.cI.nodeVisibleType = 'overlapped';
        return 'occluded';
    }

    _setupIntersectionObserver(node) {
        if (!this.cI._observer) {
            this.cI._observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        observer.unobserve(entry.target);
                        // Re-run visibility check
                        this.isNodeVisible(entry.target);
                    }
                });
            }, { threshold: 0 });
        }
        this.cI._observer.observe(node);
    }



    response(ev) {

        if (this.allowUpdate === false)
            return;
        this.allowUpdate = false;

        let overrideTim = false;
        let overrideTimeout = null;
        let event = ev.slot.getResponseInformation();
        this.lastWasBlank = false;
        this.canReload = false;
        this.clearTargetings();
        this.canReload = this.isReloadAllowed(event);
        this.cI.adResponseTime = (new Date().getTime()) - this.adResponseTime;
        if (event === null) {
            this.cI.isBlank = true;

            this.lastImpressionType = this.IT_HOUSE;
            // Solo recargamos blancos si al menos existe una configuracion de recarga de house.
            if (this.state.blankOverriden === false && this.pCfg.hr !== null) {
                overrideTim = true;
                overrideTimeout = 3000;
                this.canReload = true;
                this.lastWasBlank = true;
            }
        } else {

            if (this.gexp.isHouse(null, null, event.advertiserId))
                this.lastImpressionType = this.IT_HOUSE;
            else {
                if (this.gexp.isAdex(event.campaignId, event.lineItemId, event.advertiserId)) {
                    this.lastImpressionType = this.IT_ADEX;
                }
            }
            if (this.cI !== null) {
                this.cI.adFilled = true;
                ['advertiserId', 'campaignId', 'creativeId', 'isEmpty', 'lineItemId'].map((k) => this.cI[k] = event[k]);
            }
        }
        this.update();
        this.state.last2Res=this.state.lastRes;
        this.state.last2=this.state.last;
        this.state.lastRes = this.lastImpressionType;
        this.state.last=this.effectivePrice;
        this.reloadPromise = null;



        let rlInfo = this.pCfg.ar;

        /* if (this.lastImpressionType === this.IT_ADEX) {
             rlInfo = this.pCfg.ar;
         }
         else {
             if (this.lastImpressionType === this.IT_HOUSE) {

                 rlInfo = this.pCfg.hr;
             }
             else
                 // Por defecto, se coge la configuracion de adex.
                 rlInfo=this.pCfg.ar;
         }*/
        // No permitimos que una posicion recarge mas de 3 House.
        this.refreshing=false;
        if (this.lastImpressionType == this.IT_HOUSE && this.refreshing) {
            this.state.nHouseOnReloads++;
            if (this.state.nHouseOnReloads > 3)
                return;
        }
        if (!this.canReload || rlInfo == null || rlInfo.mr < this.nReloads) {
            if (this.cI !== null)
                this.cI.willReload = false;
            return;
        }
        this.refreshing = true;
        if (this.cI !== null)
            this.cI.willReload = true;
        this.prebidPromise = new WPromise();
        let accelPrebid = false;
        if (this.pCfg.rqpbtim) {
            accelPrebid = true;
        } else
            this.prebidPromise.resolve();

        this.reloadPromise = null;
        this.minTimPromise = new WPromise();
        this.viewablePromise = new WPromise();

        if (typeof rlInfo.mintim !== "undefined" && overrideTim === false) {

            setTimeout(() => {
                this.minTimPromise.resolve()
            }, rlInfo.mintim+2000);
        } else {
            this.minTimPromise.resolve();
        }
        if (typeof rlInfo.ov === "undefined" || rlInfo.ov === false)
            this.viewablePromise.resolve();
        let reloadPromise = new WPromise();
        this.reloadPromise = reloadPromise;
        let timeout = rlInfo.tim;
        // Si estamos aqui, es porque dio house o adex. Pero , ademas, tenemos una puja.
        // Significa que la puja no se ha usado, y, en teoria, la tenemos cacheada.
        // Activamos el timeout de prebid, si existe
        if (typeof rlInfo.pbtim !== "undefined" && this.prebidIndex > 0) {
            timeout = rlInfo.pbtim;
        }
        if (timeout)
            setTimeout(() => {
                if (reloadPromise) {
                    reloadPromise.resolve(1)
                }
            }, overrideTim ? overrideTimeout : timeout);
        else
            reloadPromise.resolve();

        Promise.all([this.viewablePromise.inner, reloadPromise.inner, this.minTimPromise.inner, this.prebidPromise.inner]).then((v) => {
            // Si es un refresco por timeout, o porque ha dado viewability, y eso era una condicion de refresco
            this.cI.reloading = true;
            this.refreshSlot(!accelPrebid);
        })
        // Comprobacion de que el nodo es visible, desde el punto de vista HTML
        var el = document.getElementById(this.slot.getSlotElementId());
        var isVT=null;
        var isVisible=null;
        if(el) {
            setTimeout(()=>{
                isVT = this.isNodeVisible(el);
                if(this.cI.isBlank)
                {
                    if(isVT!=="occluded")
                        isVisible=true;
                    else
                        isVisible=false;
                }
                else
                    isVisible=(isVT==='visible');
                this.cI.nodeVisible=isVisible;
            },1000)
        }
    }

    doPrebid() {
        this.prebidFloor = 0.10;
        if(this.state.nProbes < 2)
            this.prebidFloor=0.30;

        var hb_p = [];
        // apstag
        var aps_data_r = {
            slots: []
        };
        var sizes = this.slot.getSizes().filter(function (size) {
            return size !== 'fluid'
        });
        if (sizes.length > 0) {
            sizes = sizes.map(function (adSlotSize) {
                return [adSlotSize.getWidth(), adSlotSize.getHeight()];
            }).filter(function (size) {
                return (size[0] !== 1) && (size[1] !== 1);
            });
            if (sizes.length > 0) {
                aps_data_r.slots.push({
                    slotID: this.slot.getSlotElementId(),
                    slotName: this.slot.getAdUnitPath(),
                    sizes: sizes
                });


                hb_p.push(new Promise(function (result, reject) {
                        apstag.fetchBids(aps_data_r, function (bids) {
                            apstag.setDisplayBids();
                            result();
                        });
                    }
                ));
            }
        }
        let slot = this.slot;
        hb_p.push(new Promise(function (result, reject) {
                // Vemos si tenemos pujas en la cache.
                let pbjsAdUnits = pbjs.adUnits;
                let pbAdUnit = null;
                for (var k = 0; k < pbjsAdUnits.length; k++) {
                    if (pbjsAdUnits[k].code == slot.getSlotElementId()) {
                        pbAdUnit = pbjsAdUnits[k];
                        break;
                    }
                }
                if (pbAdUnit) {
                    let lKey = pbAdUnit.code + "|banner";
                    let curBid = pbjs.getAdserverTargetingForAdUnitCode(pbAdUnit.code);
                    if (curBid && typeof curBid.hb_pb !== "undefined") {
                        let tmpBidFloor = (curBid.hb_pb <= 0.5) ? curBid.hb_pb * 3 : curBid.hb_pb * 1.50;
                        this.prebidFloor = Math.max(tmpBidFloor, this.prebidFloor ?? 0);

                        WindowArray.pbFloorCfg.floors.data.values[lKey] = parseFloat(curBid.hb_pb);
                        pbjs.setConfig(WindowArray.pbFloorCfg);
                    } else {
                        if (this.prebidFloor !== null) {
                            WindowArray.pbFloorCfg.floors.data.values[lKey] = parseFloat(this.prebidFloor);
                            pbjs.setConfig(WindowArray.pbFloorCfg);
                        } else {
                            delete WindowArray.pbFloorCfg.floors.data.values[lKey];
                            pbjs.setConfig(WindowArray.pbFloorCfg);
                        }
                    }
                }
                pbjs.requestBids({
                    timeout: 1000,
                    adUnitCodes: [slot.getSlotElementId()],
                    bidsBackHandler: function (bidResponses, timedOut, auctionId) {
                        pbjs.setTargetingForGPTAsync([slot.getSlotElementId()]);
                        result();
                    }
                });
            }.bind(this)
        ));

        return Promise.all(hb_p);
    }

    refreshSlot(dp,ignoreViewability=false) {

                
        let f = () => {
            this.nReloads++;
            if (this.cI) {
                this.cI.wasRefreshed = true;
            }
            googletag.cmd.push(function () {
                var el = document.getElementById(this.slot.getSlotElementId());
                let isVT = this.isNodeVisible(el);

                if((document.visibilityState!=="hidden" && isVT==="visible") || ignoreViewability){
                    this.gexp.request(this.slot);
                    googletag.pubads().refresh([this.slot]);
                }
            }.bind(this));
        }
        if (typeof dp === "undefined" || dp === true)
            this.doPrebid().then(f());
        else
            f();
    }

    update() {
        this.cI.debugStr+="U";
        let result = this.lastImpressionType;
        this.state.lastWasPrebid =  this.usingPrebid;
        // Se reinicia esta variable, para la proxima request.
        //this.usingPrebid = false;
        var value = this.effectivePrice;
        // Solo por seguridad.
        if (value === null) {

            return;
        }
        switch(result)
        {
            case this.IT_ADEX:{
                this.cI.debugStr+="a";
                if(!this.usingPrebid) {
                    this.state.nProbes++;
                    if (this.state.nProbes < 5) {
                        this.state.ahistory.push(this.effectivePriceIndex);
                        this.state.aresults.push(result);
                    }
                }
                if(value > 1) {
                    this.cI.debugStr+="b";
                    this.state.nGoodCpms++;


                        let ut=3;
                        if(value > 3)
                            ut=2;
                        if(value > 5)
                            ut=1;
                        this.gexp.setUserType(ut);
                        this.gexp.onGoodCPM(this, value);

                }
                this.state.nAdex++;
                this.state.nConsAdex++;
                this.state.nConsHouse = 0;
                this.gexp.incAdex();
            }break;
            case this.IT_HOUSE:{

                if(this.usingPrebid)
                {
                    this.cI.debugStr+="c";
                    this.state.lastImpressionType=this.IT_NONE;
                }
                else {
                    if(this.offY < 10 && this.gexp.getDailyVisits() > 4 && this.state.windowStart===0 && (this.position[0]=="r" || this.position[0]=="m"))
                    {
                        this.gexp.setUserType(5);
                    }
                    this.state.nProbes++;
                    this.cI.debugStr+="e";
                    if (this.state.nProbes < 5) {
                        this.cI.debugStr+="f";
                        this.state.ahistory.push(this.effectivePriceIndex);
                        this.state.aresults.push(result);
                    }
                    this.state.nHouse++;
                    this.state.nConsAdex = 0;
                    this.state.nConsHouse++;
                    this.block(value);
                    this.gexp.incHouse();
                }
                // House..
            }break;
            case this.IT_PREBID:{
                if(this.usingPrebid) {
                    this.cI.debugStr += "g";
                    this.state.nProbes++;
                    this.state.windowStart = Math.min(this.tempWindowStart,Math.max(this.pCfg.mp, Math.floor(this.effectivePriceIndex / 2)));
                    this.block(this.effectivePrice);
                }
            }break;
            default:{}break;

        }
        if(this.state.ahistory.length > 5)
            this.state.ahistory.length=5;
        if(this.state.aresults.length > 5)
            this.state.aresults.length=5;
        this.cI.adHist=this.state.ahistory.join("-");
        this.cI.adHistRes=this.state.aresults.join("-");
        this.cI.nConsAdex = this.state.nConsAdex;
        this.cI.nConsHouse = this.state.nConsHouse;
        this.cI.updatedWindowStart=this.state.windowStart;
    }
    upgradePrice(amount,offY)
    {
        this.state.nPriceUpgrades++;
        if(this.offY < offY) {

            this.state.windowStart += amount;
        }
    }

    setPrebidPrice()
    {
        this.cI.debugStr+="P";
        this.tempWindowStart=this.state.windowStart;
        this.usingPrebid = true;
        this.effectivePrice=this.array[this.prebidIndex];
        this.effectivePriceIndex=this.prebidIndex;
    }
    updateHousePrice(result,value)
    {
        this.cI.debugStr+="H"+this.state.windowStart+"-"+this.state.nConsHouse;
        let p = this.state.windowStart;
        if(this.state.last2Res==this.IT_ADEX) {
            this.effectivePriceIndex = this.getIndexLesserThan(this.state.last2);
            this.effectivePrice = this.state.last2;
            return;
        }
        if(this.state.windowStart > 10) {
            if(this.state.windowStart > 15)
                p = Math.floor(this.state.windowStart / 4);
            else
                p=Math.floor(this.state.windowStart / 2);
        }
        else
        {
            p=this.state.windowStart-(2*this.state.nConsHouse);
        }
        let min=(this.state.nConsHouse > 2)?0:1;
        p=Math.min(this.array.length-1,Math.max(min,p));


       // p=this.checkBlocked(p);
        this.state.windowStart=p;
        this.effectivePrice = this.array[this.state.windowStart];
        this.effectivePriceIndex = this.state.windowStart;

    }
    updatePrebidAdexPrice(result,value)
    {
        this.cI.debugStr+="Q"+this.state.windowStart;
        // Y el indice de prebid, era mas alto que el de gexp, se reajusta a esa posicion
        if (this.state.windowStart < this.state.lastPriceIndex) {
            this.cI.debugStr+="a";
            // Desbloqueamos todos los precios hasta el nuevo valor
            this.unblockUntil(this.array[this.state.lastPriceIndex], null);
            this.state.windowStart = this.state.lastPriceIndex;
            //if(this.state.nProbes < 4) {
            //    this.state.windowStart += Math.floor(this.state.lastPriceIndex / (this.state.lastPriceIndex>=15?4:2));
            //    this.state.windowStart=Math.min(this.array.length-1,this.state.windowStart);
            // this.state.windowStart = this.checkBlocked(Math.min(this.array.length-1,Math.max(1, this.state.windowStart)));
            //}

        }
        this.cI.debugStr+="a"+this.state.windowStart;
        this.effectivePrice=this.array[this.state.windowStart];
        this.effectivePriceIndex=this.state.windowStart;

    }
    updateAdexPrice(result,value)
    {
        this.cI.debugStr+="A";
        ///this.state.moveDownStep=Math.max(1,this.state.moveDownStep-1);
        // Si se estaba usando la puja de prebid
        // No subimos mas.
        /*if(this.gexp.getUserType() > 4)
        {
            this.effectivePrice = this.array[this.state.windowStart];
            this.effectivePriceIndex = this.state.windowStart;
            return;
        }*/


        let s = this.state.nProbes;

        let ahsum=(this.state.nHouse+this.state.nAdex);
        if(s > 4) {
            if (ahsum > 6) {

                if (this.state.nAdex / ahsum > .75)
                    this.state.windowStart += this.state.nConsAdex;
            }
                this.cI.debugStr += "a";
                this.effectivePrice = this.array[this.state.windowStart];
                this.effectivePriceIndex = this.state.windowStart;
                return;
        }
       /* let bp=this.getBasePrice();
        if(
            this.array[this.state.windowStart] > 12*bp
        )
        {
            this.effectivePrice = this.array[this.state.windowStart];
            this.effectivePriceIndex = this.state.windowStart;
            return;
        }*/
        /*if(this.position=="rd" && this.offY>40 && this.state.nProbes < 2)
        {
            this.cI.debugStr+="x";
            this.state.windowStart=30;
            this.effectivePrice = this.array[this.state.windowStart];
            this.effectivePriceIndex = this.state.windowStart;
            return;
        }*/
        let f = 0;
        let max=20;
        /*if(this.offY < -2 || this.offY > 35)
            f=1;
        else {*/

            switch (s) {
                case 0: {
                    //  if(this.offY > 40 && this.position==="rd")
                    //      f=15;
                    //  else
                    if(Math.random() < .30 && this.offY>=0 && this.offY < 35) {
                        if(this.offY < 7) {
                            f = Math.max(0,Math.floor(Math.random() * 5) - 1);
                            this.cI.floorStage="a";
                        }
                        else {
                            f = 1 ;
                            this.cI.floorStage="b";
                        }

                    }
                    else
                        f=0;

                }
                    break;
                case 1: {
                    this.cI.debugStr += "d";
                    if (this.state.nHouse == 0) {
                        if(this.offY < 7)
                            f = 3;
                        else
                            f = 2;
                    }
                    else
                        f = 1;
                }
                    break;
                case 2: {
                    this.cI.debugStr += "e";
                    if (this.state.nHouse == 0) {
                        if(this.offY < 7)
                            f = 3;
                        else
                            f = 2;
                    } else {
                        f = 1;
                        max=7;
                    }
                }
                    break;
                case 3: {
                    this.cI.debugStr += "f";
                    if (this.state.nHouse == 0) {
                        f = 5;
                    } else {
                        f = 2;
                    }
                }
                    break;
                default: {
                    this.cI.debugStr += "g";
                    if (this.state.nHouse == 0) {
                        f = 0;
                        max = 16;
                    } else {
                        if (this.offY < -2 || this.offY > 7) {
                            f = 2;
                            max = 16;
                        } else {
                            f = 1;
                            max = 16;
                        }
                    }
                }
            }
        //}
        let next=this.state.windowStart+f;
        //let topPrice=10*bp;
        //if((next > topPrice && Math.random()>0.5) || next <=topPrice) {
            this.state.windowStart = this.checkBlocked(Math.min(this.array.length-1,Math.max(1, next)));
        //}
        /*if(f>0)
        {

            this.cI.debugStr+="h";
            let prob = 0;
            let nextPrice = this.state.windowStart;
            let maxVal = 0;
            let maxValIndex = 0;
            let maxValProb = 0;
            let maxProbVal = 0;
            let maxProbIndex = 0;
            let maxProbProb = 0;
            let j;

            let start = this.state.windowStart+f;

            for (j = start+f; j > this.state.windowStart; j--) {
                prob = this.gexp.getPriceProbability(this.cI.adUnit, j, this.position, this.offY)

                if (prob == -1)
                    prob = .3;
                let val = prob * this.array[j];
                if (val > maxVal) {
                    maxVal = val;
                    maxValIndex = j;
                    maxValProb = prob;
                }
                if (prob > maxProbProb) {
                    maxProbProb = prob;
                    maxProbVal = val;
                    maxProbIndex = j;
                }
            }
            let maxProb;
            if (maxValIndex == maxProbIndex) {
                maxProb = maxProbProb;
                nextPrice = maxProbIndex;
            } else {
                if (maxProbVal / maxVal < 0.5) {
                    maxProb = maxProbProb;
                    nextPrice = maxProbIndex;
                } else {
                    maxProb = maxValProb;
                    nextPrice = maxValIndex;
                }
            }


                let rnd = Math.random();
                if (
                    true ||
                    this.state.nHouse === 0 ||
                    this.state.nUpCredits > 5 || maxProb > .8 || (maxProb > .6 && rnd < 0.8) || (maxProb > .4 && rnd < 0.5) || rnd < 0.2) {
                    this.cI.priceProbability = maxProb;
                    //if(this.state.nUpCredits > 0){
                    this.state.windowStart = nextPrice;
                    this.cI.debugStr += ("s" + this.state.windowStart);
                    //this.state.moveUpStep = Math.max(1, parseInt(this.state.moveUpStep / 2));
                    this.cI.gexp_raising_price = true;
                } else {
                    this.cI.priceProbability = -1;
                    this.cI.gexp_raising_price = false;
                }

        }

        */
        this.state.windowStart=this.checkBlocked(this.state.windowStart);
        this.effectivePrice=this.array[this.state.windowStart];
        this.effectivePriceIndex=this.state.windowStart;
    }
    checkBlocked(p)
    {
        if(typeof this.state.blocked!=="undefined")
        {
            this.cI.debugStr += ("u" + this.state.windowStart);
            let curPrice=this.array[p];
            for(let k in this.state.blocked)
            {
                if(parseFloat(k)<curPrice && this.state.blocked[k]>=1)
                    curPrice=parseFloat(k);
            }
            if(curPrice!==this.array[p]) {
                this.cI.debugStr += ("v" + this.state.windowStart);
                p = Math.max(0,this.getIndexLesserThan(curPrice)-1);
                this.cI.gexp_price_block=curPrice;
                this.cI.debugStr += "W" + p;
            }
        }
        return p;
    }

    updatePrice(result, value) {

        let minPrebid = this.pCfg.ppbo;


        if (result === this.IT_HOUSE) {
            return this.updateHousePrice(result,value);
        }

        if (result == this.IT_ADEX && this.state.lastWasPrebid) {
            return this.updatePrebidAdexPrice(result,value);
        }

        if (result == this.IT_ADEX || (result==this.IT_NONE && this.state.nProbes==0))
            return this.updateAdexPrice(result, value);

        this.effectivePrice=this.array[this.state.windowStart];
        this.effectivePriceIndex=this.state.windowStart;
    }

    getkName(n) {
        return this.kPrefix + n;
    }

    onViewable() {
        if (this.cI !== null) {
            this.cI.adViewable = true;
        }
        if (this.viewablePromise)
            this.viewablePromise.resolve(2);
    }

    onSlotVisibilityChanged(percent) {
        if (this.cI !== null) {
            if (percent > this.cI.adMaxViewability)
                this.cI.adMaxViewability = percent;
        }
    }

    onLoaded() {

        if (this.cI !== null) {
            this.cI.adLoadTime = (new Date().getTime()) - this.adLoadTime;
        }
        //if (typeof this.pCfg.rqpbtim !== false && this.cI !== null && this.cI.willReload == true)
        if (this.cI !== null && this.cI.willReload == true)
            setTimeout(() => {
                this.doPrebid();
                if (this.prebidPromise)
                    this.prebidPromise.resolve();
            }, 4000); //this.pCfg.rqpbtim);
    }
}

class RandomStrategy extends WindowArray {
    getStrategy() {
        this.strategy = "rnd";
        return this.strategy
    };

    initStrategy() {
        let str = this.pCfg.str ?? {};
        return {min: str.min ?? 0, max: str.max ?? 10}
    }

    initPrice() {
        return this.state.str_state.min + Math.round(Math.random() * (this.state.str_state.max - this.state.str_state.min));
    }

    updatePrice(result, value, wasUsingPrebid) {
        this.state.windowStart = this.initPrice();
    }
}

      const INtext_STYLE_ID = "gexp-intext-styles";
      const INtext_BASE_STYLES = `
        .gexp-intext-slot {
            width: 100%;
            max-width: 100%;
            margin: 0 auto;          
            padding: 0;
            position: relative;
            overflow: hidden;
            min-height: 0;           
            height: 0;
            opacity: 0;
            text-align: center;
            transition:
                height   0.42s cubic-bezier(0.16, 1, 0.3, 1),
                opacity  0.35s ease 0.08s,
                margin   0.42s cubic-bezier(0.16, 1, 0.3, 1),
                padding  0.35s ease;
            will-change: height, opacity;
        }
        .gexp-intext-slot.is-open {
            overflow: visible; 
            opacity: 1;
            padding-top: 15px;
            margin-top: 16px;
            margin-bottom: 36px !important;
        }

        .gexp-intext-slot:not(.video-started) .video-js {
             opacity: 0 !important;
             pointer-events: none !important;
        }

        .gexp-intext-slot.is-open::before {
            content: "PUBLICIDAD";
            color: #000000;
            letter-spacing: 0.08em;
            width: 100%;
            text-align: center;
            position: absolute;
            top: 0;
            display: block;
            height: 20px;
            line-height: 14px;
            font-family: Roboto, Arial, Helvetica, sans-serif;
            font-size: 9px;
            text-transform: uppercase;
        }
        .gexp-intext-loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            display: none; /* Shown via JS during refresh/load */
            z-index: 100;
        }
        .gexp-intext-spinner {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 3px solid rgba(0,0,0,0.12);
            border-top-color: #555555;
            animation: gexp-intext-spin 1s linear infinite;
            margin-bottom: 8px;
        }
        .gexp-intext-loader-text {
            font-family: Roboto, Arial, Helvetica, sans-serif;
            font-size: 11px;
            color: #555555;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }
        @keyframes gexp-intext-spin {
            to { transform: rotate(360deg); }
        }
      `;

      let intextStylesAttached = false;
      function ensureBaseStyles() {
        if (intextStylesAttached) return;
        if (typeof document === "undefined") return;
        if (document.getElementById(INtext_STYLE_ID)) return;
        
        const styleEl = document.createElement("style");
        styleEl.id = INtext_STYLE_ID;
        styleEl.innerHTML = INtext_BASE_STYLES;
        document.head.appendChild(styleEl);
        intextStylesAttached = true;
      }

      const getDebugState = () => {
        try {
          if (typeof window !== 'undefined') {
            if (window.gexpIntextDebug === true) return true;
            if (window.location && window.location.search.includes('gexpIntextDebug=true')) return true;
            if (window.localStorage && window.localStorage.getItem('gexpIntextDebug') === 'true') return true;
          }
        } catch(e) {}
        return false;
      };
      
      if (typeof window !== 'undefined') {
          window.gexpIntextDebug = getDebugState();
      }

      const badgeLog = 'background:#607D8B;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;';
      const badgeWarn = 'background:#F57C00;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;';
      const badgeErr = 'background:#D32F2F;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;';
      
      const slotColors = [
          '#4CAF50', '#922B21', '#8E44AD', '#2980B9', '#00838F', '#2E7D32', '#D35400', '#2C3E50', '#16A085', '#C0392B'
      ];
      const getSlotColor = (slotId) => {
          let hash = 0;
          for (let i = 0; i < slotId.length; i++) {
              hash = slotId.charCodeAt(i) + ((hash << 5) - hash);
          }
          return slotColors[Math.abs(hash) % slotColors.length];
      };

      const formatLog = (args, defaultBadge) => {
          let mainText = args[0];
          let style1 = defaultBadge;
          let hasCustomStyle = false;
          let customStyleStr = '';

          if (typeof mainText === 'string' && mainText.includes('%c')) {
              hasCustomStyle = true;
              customStyleStr = args[1] || '';
              args = [mainText.replace(/^%c/, ''), ...args.slice(2)];
              mainText = args[0];
          }

          let prefixStr = '%c INTEXT ';
          let prefixStyle = style1;
          
          if (typeof mainText === 'string') {
              const slotMatch = mainText.match(/\[Intext:(Slot|Video|Display):([^\]]+)\]/);
              if (slotMatch && slotMatch[2]) {
                  const slotId = slotMatch[2].split(':')[0];
                  const color = getSlotColor(slotId);
                  prefixStyle = `background:${color};color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;`;
              }
              if (mainText.includes('refresh cycle') || mainText.includes('REFRESH')) {
                  prefixStr = '%c 🔄 INTEXT ';
              }
          }

          if (hasCustomStyle) {
              return [`${prefixStr}%c ${mainText}`, prefixStyle, customStyleStr, ...args.slice(1)];
          }
          return [`${prefixStr}%c ${mainText}`, prefixStyle, '', ...args.slice(1)];
      };

      const logIntext = (...args) => { if (window.gexpIntextDebug) console.log(...formatLog(args, badgeLog)); };
      const warnIntext = (...args) => { if (window.gexpIntextDebug) console.warn(...formatLog(args, badgeWarn)); };
      const errorIntext = (...args) => { console.error(...formatLog(args, badgeErr)); };
      const groupIntext = (...args) => { if (window.gexpIntextDebug) console.groupCollapsed(...formatLog(args, badgeLog)); };
      const groupEndIntext = () => { if (window.gexpIntextDebug) console.groupEnd(); };

      class IntextManager {
        constructor(config, gexpInstance) {
          this.config = config;
          this.gexp = gexpInstance;
          this.nodes = [];
          this.siteContext = this.getSiteContext();
          this.siteConfig = this.resolveSiteConfig();
          this.adUnitPath = this.extractStaticAdUnitPath();
          this.networkId = this.config?.networkId || "99071977";
          ensureBaseStyles();

          console.log(this.siteConfig);
          console.log(this.siteConfig.domainFilter);
          console.log(this.siteConfig.domainFilter.enabled);

          if (this.siteConfig && this.siteConfig.domainFilter && this.siteConfig.domainFilter.enabled) {
            const filter = this.siteConfig.domainFilter;
            
            if (filter.allowedDomains !== "all") {
                let currentDomain = null;
                const dl = window[filter.dataLayerObj] || window.utag_data; 
                console.log(dl);
                
                if (dl) {
                    const dlData = Array.isArray(dl) ? dl[0] : dl;
                    if (dlData && dlData[filter.dataLayerProp]) {
                        currentDomain = dlData[filter.dataLayerProp];  
                        console.log(currentDomain);
                    }
                }

                if (!currentDomain && window.location) {
                    currentDomain = window.location.hostname;
                    console.log(currentDomain);
                }

                if (!filter.allowedDomains.some(domain => currentDomain.includes(domain))) {
                    logIntext(`🛑 [IntextManager] Ejecución bloqueada. Dominio '${currentDomain}' no permitido.`);                   
                    return;
                }
            }
          }

          if (this.siteConfig?.debug === true) {
            window.gexpIntextDebug = true;
          }

          if (!this.gexp.isEnabled() || !this.siteConfig) return;

          const allowedTypes = this.siteConfig.allowedContentTypes || [];
          if (allowedTypes.length > 0 && !allowedTypes.includes(this.siteContext.contentType)) {
              logIntext(`[IntextManager] Disabled for content type: ${this.siteContext.contentType}. Allowed: ${allowedTypes.join(', ')}`);
              return;
          }

          if (this.siteConfig?.exclusions?.disableAll === true) {
              logIntext(`[IntextManager] ❌ BLOCKED by exclusions.disableAll = true`);
              return;
          }
          const launchIntextPositions = () => {
            googletag.cmd.push(() => {
              this.resolveAdUnit();
              this.siteContext.contentType = this.detectContentType();
              logIntext(`[IntextManager] Detected content type: "${this.siteContext.contentType}"`);

              this.siteConfig = this.resolveContentTypeProfile(this.siteConfig, this.siteContext.contentType);

              if (this.isBlockedByExclusions()) {
                return;
              }

              if (!this.isAllowedByInclusions()) {
                return;
              }

              this.createIntextPositions();

              const infiniteScrollTypes = ["noticia", "noticia-especial"];
              if (this.siteConfig?.infiniteScroll?.enabled && infiniteScrollTypes.includes(this.siteContext.contentType)) {
                this.startNavContinuaObserver();
              }
            });
          };

          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", launchIntextPositions);
          } else {
            launchIntextPositions();
          }
        }

        extractStaticAdUnitPath() {
          const devPath = window.GEXP_DEV_CONFIG?.intextSites?.default?.general?.display?.adUnitPath;
          if (devPath) return devPath;
          if (typeof data !== "undefined" && data?.adSlots?.[0]?.adUnit) return data.adSlots[0].adUnit;
          if (typeof ueDFPData !== "undefined" && ueDFPData?.adSlots?.[0]?.adUnit) return ueDFPData.adSlots[0].adUnit;
          return this.config?.adUnit || "";
        }
        
        resolveAdUnit() {
          let source = "config_fallback";
          let resolvedPath = this.adUnitPath;
          let resolvedNetworkId = this.networkId;

          try {
            const slots = googletag.pubads().getSlots();
            if (slots && slots.length > 0) {
              const refSlot = slots.find(s => {
                const elId = s.getSlotElementId() || "";
                if (elId.startsWith("gexp-intext")) return false;
                const path = s.getAdUnitPath() || "";
                if (/\/p_/.test(path)) return false;
                return true;
              }) || slots[0];

              const fullPath = refSlot.getAdUnitPath();
              if (fullPath) {
                const parts = fullPath.replace(/^\//, "").split("/");
                if (parts.length >= 2) {
                  resolvedNetworkId = parts[0];
                  resolvedPath = parts.slice(1).join("/");
                  resolvedPath = resolvedPath.replace(/\bp_/g, "");
                  source = `gpt_slot(${refSlot.getSlotElementId()})`;
                }
              }
            }
          } catch (e) {
            console.warn("[IntextManager] GPT slot resolution failed, using static fallback", e);
          }

          if (source === "config_fallback") {
            if (typeof data !== "undefined" && data?.adSlots?.[0]?.adUnit) {
              resolvedPath = data.adSlots[0].adUnit;
              source = "data.adSlots";
            }
            else if (typeof ueDFPData !== "undefined" && ueDFPData?.adSlots?.[0]?.adUnit) {
              resolvedPath = ueDFPData.adSlots[0].adUnit;
              source = "ueDFPData";
            }
            else if (typeof window !== "undefined" && (window.ueDataLayer || window.utag_data)) {
              const dlData = window.ueDataLayer || window.utag_data;
              const domainRaw = (dlData.be_page_domain || "").toLowerCase();
              const siteVersion = (dlData.be_page_site_version || "web").toLowerCase();
              let domain = domainRaw.split(".")[0]; 
              
              const isMobile = siteVersion === "mobile";
              
              if (domain === "marca") {
                  domain = isMobile ? "mc-mv2" : "mc2";
              } else if (domain === "elmundo") {
                  domain = isMobile ? "mun-mv" : "mun";
              } else if (domain === "expansion") {
                  domain = isMobile ? "exp-mv" : "exp2";
              } else if (domain === "telva") {
                  domain = isMobile ? "telva-mv" : "telva";
              }
              
              const section = dlData.be_page_section || "";
              if (domain && section) {
                const parts = [domain, section];
                
                let subIndex = 1;
                while (dlData[`be_page_subsection${subIndex}`]) {
                    parts.push(dlData[`be_page_subsection${subIndex}`]);
                    subIndex++;
                }
                
                const ctRaw = dlData.be_page_content_type || this.siteContext?.contentType || "noticia";
                let ctSuffix = "n";
                if (ctRaw === "directo") ctSuffix = "dir";
                else if (ctRaw === "opinion") ctSuffix = "o";
                else if (ctRaw === "noticia-especial") ctSuffix = "ne";
                else if (ctRaw === "cronica") ctSuffix = "cro";
                
                parts.push(ctSuffix);
                resolvedPath = parts.join("/");
                source = "dataLayer_build";
              }
            }
          }

          if (!resolvedPath && this.config.display && this.config.display.adUnitPath) {
              resolvedPath = this.config.display.adUnitPath;
              source = "config_display_fallback";
          }

          this.adUnitPath = resolvedPath;
          this.networkId = resolvedNetworkId;

          const KNOWN_NETWORKS = {
            "99071977": "Unidad Editorial",
            "21626337071": "Hispanic Exchange (LATAM)"
          };
          const networkName = KNOWN_NETWORKS[this.networkId] || "Unknown";

          logIntext(`[IntextManager] AdUnit resolved: ${this.adUnitPath} (source: ${source})`);
          logIntext(`[IntextManager] Network: ${networkName} (${this.networkId})`);

          const networkOverrides = this.siteConfig?.networks?.[this.networkId];
          if (networkOverrides) {
            this.siteConfig = IntextManager.deepMerge(this.siteConfig, networkOverrides);
            logIntext(`[IntextManager] Applied network overrides for ${networkName} (${this.networkId})`);
          }
        }

        getSiteContext() {
          const dl =
            (typeof window !== "undefined" ? (window.ueDataLayer || window.utag_data) : null) || {};
          return {
            site: dl.be_page_domain || window.location.hostname,
            section: dl.be_page_section || null,
            subsection: dl.be_page_subsection1 || null,
            contentType: this.detectContentType(),
          };
        }

        static CONTENT_TYPE_MAP = {
          'n': 'noticia', 'noticia': 'noticia',
          'dir': 'directo', 'directo': 'directo',
          'ne': 'noticia-especial', 'noticia-especial': 'noticia-especial',
          'cro': 'cronica', 'cronica': 'cronica',
          'o': 'opinion', 'opinion': 'opinion',
        };

        detectContentType(rootElement = null) {
          const dl = (typeof window !== "undefined" ? (window.ueDataLayer || window.utag_data) : null) || {};
          if (dl.be_page_content_type) {
            const normalized = IntextManager.CONTENT_TYPE_MAP[dl.be_page_content_type] || dl.be_page_content_type;
            return normalized;
          }

          try {
            if (typeof googletag !== 'undefined' && googletag.pubads && typeof googletag.pubads === 'function') {
              const ctValues = googletag.pubads().getTargeting('ct');
              if (ctValues && ctValues.length > 0) {
                const normalized = IntextManager.CONTENT_TYPE_MAP[ctValues[0]] || ctValues[0];
                return normalized;
              }
            }
          } catch (e) { /* silent */ }

          const root = rootElement || document;
          if (root.querySelector('.ue-c-streamlive__body')) return 'directo';
          if (root.querySelector('.ue-c-article__body')) return 'noticia';

          return this.getPageContentType() || 'noticia';
        }

        resolveContentTypeProfile(baseConfig, contentType) {
          const profiles = baseConfig?.contentTypes;
          if (!profiles || !contentType || !profiles[contentType]) {
            return baseConfig;
          }
          const profile = profiles[contentType];
          logIntext(`[IntextManager] Applying content-type profile: "${contentType}"`);
          return IntextManager.deepMerge(baseConfig, profile);
        }

        resolveSiteConfig() {
          const siteConfigs = this.config?.intextSites;

          if (!siteConfigs) return this.config.intextDefault || null;

          let hostname = this.siteContext.site.replace("www.", "");
          const baseConfig = siteConfigs[hostname] || siteConfigs["default"];

          if (!baseConfig || !baseConfig.general) return null;

          let resolved = JSON.parse(JSON.stringify(baseConfig.general));
          const overrides = Array.isArray(baseConfig.overrides)
            ? baseConfig.overrides
            : [];
          overrides.forEach((override) => {
            if (this.matchesOverrideConditions(override?.if)) {
              resolved = IntextManager.deepMerge(
                resolved,
                override?.then || {},
              );
            }
          });
          resolved.__siteContext = this.siteContext;
          return resolved;
        }

        matchesOverrideConditions(conditions) {
          if (!Array.isArray(conditions) || conditions.length === 0)
            return false;
          return conditions.some((condition) =>
            this.evaluateCondition(condition),
          );
        }

        evaluateCondition(conditionStr = "") {
          const [key, value] = conditionStr.split(":");
          if (!key || typeof value === "undefined") return false;
          switch (key.trim()) {
            case "url":
              return this.matchUrlCondition(value.trim());
            case "device":
              const dl = (typeof window !== "undefined" ? (window.ueDataLayer || window.utag_data) : null) || {};
              const isMobileVar = dl.device_category === 'mobile' || dl.be_page_site_version === 'mobile' || this.gexp.isMobileDevice();
              if (value.trim() === "mobile") return isMobileVar;
              if (value.trim() === "desktop") return !isMobileVar;
              return false;
            case "contentType":
              return this.siteContext.contentType === value.trim();
            default:
              return false;
          }
        }

        matchUrlCondition(pattern) {
          if (!pattern) return false;
          const url =
            window.location && window.location.pathname
              ? window.location.pathname
              : "";
          if (pattern === "*") return true;
          const regex = new RegExp(
            "^" +
              pattern
                .split("*")
                .map((part) => IntextManager.escapeRegex(part))
                .join(".*") +
              "$",
          );
          return regex.test(url);
        }

        static escapeRegex(str = "") {
          return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }

        isBlockedByExclusions() {
          const excl = this.siteConfig?.exclusions;
          if (!excl) return false;

          if (excl.disableAll === true) {
            logIntext(`[IntextManager] ❌ BLOCKED by exclusions.disableAll = true`);
            return true;
          }

          if (Array.isArray(excl.adUnitPaths) && excl.adUnitPaths.length > 0) {
            const pageAdUnit = this.getPageAdUnitPath();
            if (pageAdUnit) {
              const matchedPath = excl.adUnitPaths.find(blockedPath =>
                pageAdUnit.startsWith(blockedPath)
              );
              if (matchedPath) {
                logIntext(`[IntextManager] ❌ BLOCKED by exclusions.adUnitPaths — page adUnit "${pageAdUnit}" matches blocked prefix "${matchedPath}"`);
                return true;
              }
            }
          }

          if (excl.keyValues && typeof excl.keyValues === 'object' && Object.keys(excl.keyValues).length > 0) {
            const pageTargeting = this.getPageCustomTargeting();
            if (pageTargeting) {
              for (const [key, blockedValues] of Object.entries(excl.keyValues)) {
                if (!Array.isArray(blockedValues) || blockedValues.length === 0) continue;
                const rawPageValue = pageTargeting[key];
                if (rawPageValue === undefined || rawPageValue === null) continue;

                let pageValues;
                if (Array.isArray(rawPageValue)) {
                  pageValues = rawPageValue.map(String);
                } else if (typeof rawPageValue === 'string' && rawPageValue.includes(',')) {
                  pageValues = rawPageValue.split(',').map(v => v.trim());
                } else {
                  pageValues = [String(rawPageValue)];
                }

                const matchedValue = blockedValues.find(blocked =>
                  pageValues.includes(String(blocked))
                );
                if (matchedValue) {
                  logIntext(`[IntextManager] ❌ BLOCKED by exclusions.keyValues — key "${key}" has blocked value "${matchedValue}" (page values: [${pageValues.join(', ')}])`);
                  return true;
                }
              }
            }
          }

          return false;
        }

        isAllowedByInclusions() {
          const inc = this.siteConfig?.inclusions;
          if (!inc) return true;

          if (inc.keyValues && typeof inc.keyValues === 'object' && Object.keys(inc.keyValues).length > 0) {
            const pageTargeting = this.getPageCustomTargeting();
            if (pageTargeting) {
              for (const [key, allowedValues] of Object.entries(inc.keyValues)) {
                if (!Array.isArray(allowedValues) || allowedValues.length === 0) continue;
                const rawPageValue = pageTargeting[key];
                if (rawPageValue === undefined || rawPageValue === null) continue;

                let pageValues;
                if (Array.isArray(rawPageValue)) {
                  pageValues = rawPageValue.map(String);
                } else if (typeof rawPageValue === 'string' && rawPageValue.includes(',')) {
                  pageValues = rawPageValue.split(',').map(v => v.trim());
                } else {
                  pageValues = [String(rawPageValue)];
                }

                const matchedValue = allowedValues.find(allowed =>
                  pageValues.includes(String(allowed))
                );
                if (matchedValue) {
                  logIntext(`[IntextManager] ✅ ALLOWED by inclusions.keyValues — key "${key}" has allowed value "${matchedValue}"`);
                  return true;
                }
              }
            }
            logIntext(`[IntextManager] ❌ BLOCKED by inclusions.keyValues — page does not have any of the required allowed key-values`);
            return false;
          }

          return true;
        }

        getPageAdUnitPath() {
          if (typeof data !== 'undefined' && data?.adSlots?.[0]?.adUnit) {
            return data.adSlots[0].adUnit;
          }
          if (typeof ueDFPData !== 'undefined' && ueDFPData?.adSlots?.[0]?.adUnit) {
            return ueDFPData.adSlots[0].adUnit;
          }
          return this.adUnitPath || null;
        }

        getPageCustomTargeting() {
          if (typeof data !== 'undefined' && data?.customTargeting) {
            return data.customTargeting;
          }
          if (typeof ueDFPData !== 'undefined' && ueDFPData?.customTargeting) {
            return ueDFPData.customTargeting;
          }
          try {
            if (typeof googletag !== 'undefined' && googletag.pubads && typeof googletag.pubads === 'function') {
              const pubads = googletag.pubads();
              if (pubads && typeof pubads.getTargetingKeys === 'function') {
                const keys = pubads.getTargetingKeys();
                if (keys && keys.length > 0) {
                  const targeting = {};
                  keys.forEach(key => {
                    const values = pubads.getTargeting(key);
                    targeting[key] = values && values.length === 1 ? values[0] : values;
                  });
                  logIntext(`[IntextManager] 📋 Read page targeting from googletag.pubads():`, Object.keys(targeting).join(', '));
                  return targeting;
                }
              }
            }
          } catch (e) {
            console.warn('[IntextManager] Could not read GPT targeting:', e);
          }
          if (typeof window !== 'undefined' && (window.ueDataLayer || window.utag_data)) {
            return window.ueDataLayer || window.utag_data;
          }
          return null;
        }
        
        isSlotDisabledByExclusion(index) {
          const ds = this.siteConfig?.exclusions?.disableSlots;
          if (!ds) return false;

          if (Array.isArray(ds)) {
            return ds.includes(index);
          }
          if (Array.isArray(ds.always) && ds.always.includes(index)) {
            logIntext(`[IntextManager] Slot ${index}: DISABLED by disableSlots.always`);
            return true;
          }

          if (Array.isArray(ds.rules)) {
            for (const rule of ds.rules) {
              if (!Array.isArray(rule.slots) || !rule.slots.includes(index)) continue;
              if (Array.isArray(rule.ifAdUnitPath) && rule.ifAdUnitPath.length > 0) {
                const pageAdUnit = this.getPageAdUnitPath();
                if (pageAdUnit && rule.ifAdUnitPath.some(p => pageAdUnit.startsWith(p))) {
                  logIntext(`[IntextManager] Slot ${index}: DISABLED by disableSlots rule (adUnitPath match)`);
                  return true;
                }
              }

              if (rule.ifKeyValues && typeof rule.ifKeyValues === 'object' && Object.keys(rule.ifKeyValues).length > 0) {
                const pageTargeting = this.getPageCustomTargeting();
                if (pageTargeting) {
                  for (const [key, blockedValues] of Object.entries(rule.ifKeyValues)) {
                    if (!Array.isArray(blockedValues) || blockedValues.length === 0) continue;
                    const rawVal = pageTargeting[key];
                    if (rawVal === undefined || rawVal === null) continue;

                    let pageValues;
                    if (Array.isArray(rawVal)) pageValues = rawVal.map(String);
                    else if (typeof rawVal === 'string' && rawVal.includes(',')) pageValues = rawVal.split(',').map(v => v.trim());
                    else pageValues = [String(rawVal)];

                    if (blockedValues.some(b => pageValues.includes(String(b)))) {
                      logIntext(`[IntextManager] Slot ${index}: DISABLED by disableSlots rule (keyValue "${key}" match)`);
                      return true;
                    }
                  }
                }
              }
            }
          }

          return false;
        }

        createIntextPositions() {
          try {
            const engine = new IntextPlacementEngine(
              this.siteConfig.dom,
              this.siteConfig.rules,
            );
            const placements = engine.findPlacements();
            const slotsConfig = this.siteConfig.slots;
            const maxSlots = slotsConfig?.maxSlots ?? Infinity;
            let slotsCreated = 0;

            placements.forEach((placement, index) => {
              if (slotsCreated >= maxSlots) {
                logIntext(
                  `[IntextManager] Slot ${index}: SKIPPED — maxSlots limit reached (${maxSlots})`,
                );
                return;
              }

              if (slotsConfig) {
                if (!slotsConfig.enabled) {
                  logIntext(
                    `[IntextManager] Slots disabled globally — skipping all`,
                  );
                  return;
                }
                if (
                  slotsConfig.enabledSlots &&
                  !slotsConfig.enabledSlots.includes(index)
                ) {
                  logIntext(
                    `[IntextManager] Slot ${index}: DISABLED (not in enabledSlots: [${slotsConfig.enabledSlots}])`,
                  );
                  return;
                }
              }

              if (this.isSlotDisabledByExclusion(index)) {
                logIntext(
                  `[IntextManager] Slot ${index}: DISABLED by exclusions.disableSlots`,
                );
                return;
              }

              const displayWrapper = this.createWrapperNode(index, "display");
              placement.paragraph.parentNode.insertBefore(
                displayWrapper,
                placement.paragraph.nextSibling,
              );
              const displayContainer = new IntextContainer(
                displayWrapper,
                this.siteConfig.style,
              );

              const videoWrapper = this.createWrapperNode(index, "video");
              displayWrapper.parentNode.insertBefore(
                videoWrapper,
                displayWrapper.nextSibling,
              );
              const videoContainer = new IntextContainer(
                videoWrapper,
                this.siteConfig.style,
              );

              let nodeConfig = this.siteConfig;
              const slotOverrides =
                this.siteConfig.slotOverrides?.[String(index)];
              if (slotOverrides) {
                nodeConfig = JSON.parse(JSON.stringify(this.siteConfig)); // deep clone
                // Deep merge each section
                for (const section of Object.keys(slotOverrides)) {
                  if (
                    typeof slotOverrides[section] === "object" &&
                    !Array.isArray(slotOverrides[section])
                  ) {
                    nodeConfig[section] = {
                      ...(nodeConfig[section] || {}),
                      ...slotOverrides[section],
                    };
                  } else {
                    nodeConfig[section] = slotOverrides[section];
                  }
                }
                logIntext(
                  `[IntextManager] Slot ${index}: applied overrides`,
                  slotOverrides,
                );
              }

              logIntext(
                `[IntextManager] Slot ${index}: ENABLED (mode: ${nodeConfig.decision?.mode || "auto"}, threshold: ${nodeConfig.lazyLoad?.threshold || "default"}, maxCycles: ${nodeConfig.refresh?.maxCycles || "default"})`,
              );

              const node = new IntextNode({
                id: displayWrapper.id,
                videoId: videoWrapper.id,
                container: displayContainer,
                videoContainer: videoContainer,
                config: nodeConfig,
                manager: this,
                placement,
                slotIndex: index,
              });
              this.nodes.push(node);
              slotsCreated++;
            });
            this.nodes.forEach((n) => n.initialize());
          } catch (err) {
            if (this.gexp.statsG)
              this.gexp.statsG.addRequiredVariable("intext_err", err.message);
            console.error("[IntextManager] Failed to create positions", err);
          }
        }

        onSlotComplete(completedIndex) {
          // No-op: Slots initialize independently via IntersectionObserver
        }

        createWrapperNode(idxOrId, type = "display", pncSuffix = "") {
          const wrapper = document.createElement("div");
          let baseId;
          
          if (typeof idxOrId === "string") {
              baseId = idxOrId.replace(/-video$/, "");
          } else {
              baseId = idxOrId === 0 ? "gexp-intext" : `gexp-intext-${idxOrId + 1}`;
          }
          
          let positionId;
          if (type === "video") {
            if (pncSuffix && !baseId.endsWith(pncSuffix)) {
                positionId = `${baseId}${pncSuffix}-video`;
            } else {
                positionId = `${baseId}-video`;
            }
          } else {
            if (pncSuffix && !baseId.endsWith(pncSuffix)) {
                positionId = `${baseId}${pncSuffix}`;
            } else {
                positionId = `${baseId}`;
            }
          }
          wrapper.id = positionId;
          wrapper.className = "gexp-intext-slot";
          wrapper.innerHTML = `
            <div class="gexp-intext-loader">
              <div class="gexp-intext-spinner"></div>
              <div class="gexp-intext-loader-text">Recuperando anuncio</div>
            </div>
          `;
          return wrapper;
        }

        getPageContentType() {
          return "";
        }
        
        startNavContinuaObserver() {
          const isConfig = this.siteConfig?.infiniteScroll;
          if (!isConfig?.enabled) return;

          this._processedNavIndexes = new Set([0]);
          this._navContinuaNodes = [];

          const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;

                const mains = node.matches?.(isConfig.mainSelector)
                  ? [node]
                  : Array.from(node.querySelectorAll?.(isConfig.mainSelector) || []);

                for (const mainEl of mains) {
                  const navIndex = parseInt(mainEl.dataset.ueNavindex, 10);
                  if (isNaN(navIndex) || navIndex === 0) continue;
                  if (this._processedNavIndexes.has(navIndex)) continue;
                  if (this._processedNavIndexes.size > (isConfig.maxArticles || 5)) {
                    logIntext(`[IntextManager:NavContinua] Max articles reached (${isConfig.maxArticles || 5}), ignoring navIndex=${navIndex}`);
                    continue;
                  }

                  this._processedNavIndexes.add(navIndex);
                  logIntext(`[IntextManager:NavContinua] 🆕 New article detected: navIndex=${navIndex}`);

                  requestAnimationFrame(() => {
                    googletag.cmd.push(() => {
                      const allSlots = googletag.pubads().getSlots();
                      const mainSlots = allSlots.filter(s => {
                        const el = document.getElementById(s.getSlotElementId());
                        return el && mainEl.contains(el);
                      });
                      const ncTargeting = mainSlots.some(s => {
                        const val = s.getTargeting('nc');
                        if (Array.isArray(val)) return val.includes('1');
                        return val === '1';
                      });
                      if (!ncTargeting) {
                        logIntext(`[IntextManager:NavContinua] ❌ navIndex=${navIndex} skipped — no GPT slot with nc='1' targeting found in new main`);
                        return;
                      }
                      this.onNewArticleDetected(mainEl, navIndex);
                    });
                  });
                }
              }
            }
          });

          observer.observe(document.body, { childList: true, subtree: true });
          logIntext('[IntextManager:NavContinua] 👁️ MutationObserver started');
        }

        onNewArticleDetected(mainElement, navIndex) {
          const isConfig = this.siteConfig?.infiniteScroll;
          if (!isConfig) return;

          const contentType = this.detectContentType(mainElement);
          logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: content type = "${contentType}"`);

          let scrollConfig = IntextManager.deepMerge({...this.siteConfig}, {});
          const ctProfile = this.siteConfig?.contentTypes?.[contentType];
          if (ctProfile) {
            scrollConfig = IntextManager.deepMerge(scrollConfig, ctProfile);
          }
          if (isConfig.overrides) {
            scrollConfig = IntextManager.deepMerge(scrollConfig, isConfig.overrides);
          }

          const exclusions = isConfig.exclusions;
          if (exclusions) {
            if (exclusions.disableAll === true) {
              logIntext(`[IntextManager:NavContinua] ❌ BLOCKED by infiniteScroll.exclusions.disableAll`);
              return;
            }
            if (Array.isArray(exclusions.adUnitPaths) && exclusions.adUnitPaths.length > 0) {
              const pageAdUnit = this.getPageAdUnitPath();
              if (pageAdUnit && exclusions.adUnitPaths.some(p => pageAdUnit.startsWith(p))) {
                logIntext(`[IntextManager:NavContinua] ❌ BLOCKED by infiniteScroll.exclusions.adUnitPaths`);
                return;
              }
            }
            if (exclusions.keyValues && Object.keys(exclusions.keyValues).length > 0) {
              const pageTargeting = this.getPageCustomTargeting();
              if (pageTargeting) {
                for (const [key, blockedValues] of Object.entries(exclusions.keyValues)) {
                  if (!Array.isArray(blockedValues) || blockedValues.length === 0) continue;
                  const rawVal = pageTargeting[key];
                  if (rawVal === undefined || rawVal === null) continue;
                  let pageValues;
                  if (Array.isArray(rawVal)) pageValues = rawVal.map(String);
                  else if (typeof rawVal === 'string' && rawVal.includes(',')) pageValues = rawVal.split(',').map(v => v.trim());
                  else pageValues = [String(rawVal)];
                  if (blockedValues.some(b => pageValues.includes(String(b)))) {
                    logIntext(`[IntextManager:NavContinua] ❌ BLOCKED by infiniteScroll.exclusions.keyValues key="${key}"`);
                    return;
                  }
                }
              }
            }
          }

          const pncSuffix = navIndex >= 1 ? `-pnc-${navIndex}` : '';

          this.createIntextPositionsScoped(mainElement, scrollConfig, pncSuffix, navIndex);
        }

        createIntextPositionsScoped(rootElement, scopedConfig, pncSuffix, navIndex) {
          try {
            const engine = new IntextPlacementEngine(
              scopedConfig.dom,
              scopedConfig.rules,
              rootElement
            );
            const placements = engine.findPlacements();
            if (!placements.length) {
              logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: no valid placements found`);
              return;
            }

            const newNodes = [];
            const slotsConfigScoped = scopedConfig.slots;
            const maxSlotsScoped = slotsConfigScoped?.maxSlots ?? Infinity;
            let slotsCreatedScoped = 0;

            placements.forEach((placement, index) => {
              if (slotsCreatedScoped >= maxSlotsScoped) {
                logIntext(`[IntextManager:NavContinua] navIndex=${navIndex} Slot ${index}: SKIPPED — maxSlots limit reached (${maxSlotsScoped})`);
                return;
              }
              const slotsConfig = scopedConfig.slots;
              if (slotsConfig) {
                if (!slotsConfig.enabled) return;
                if (slotsConfig.enabledSlots && !slotsConfig.enabledSlots.includes(index)) return;
              }

              const isExclusions = this.siteConfig?.infiniteScroll?.exclusions;
              if (isExclusions?.disableSlots) {
                const ds = isExclusions.disableSlots;
                if (Array.isArray(ds) && ds.includes(index)) return;
                if (Array.isArray(ds.always) && ds.always.includes(index)) return;
              }

              const displayWrapper = this.createWrapperNode(index, "display", pncSuffix);
              placement.paragraph.parentNode.insertBefore(
                displayWrapper,
                placement.paragraph.nextSibling
              );
              const displayContainer = new IntextContainer(
                displayWrapper,
                scopedConfig.style
              );

              const videoWrapper = this.createWrapperNode(index, "video", pncSuffix);
              displayWrapper.parentNode.insertBefore(
                videoWrapper,
                displayWrapper.nextSibling
              );
              const videoContainer = new IntextContainer(
                videoWrapper,
                scopedConfig.style
              );

              let nodeConfig = { ...scopedConfig };
              if (scopedConfig.slotOverrides?.[index]) {
                const slotOverrides = scopedConfig.slotOverrides[index];
                for (const section of Object.keys(slotOverrides)) {
                  if (typeof slotOverrides[section] === 'object' && slotOverrides[section] !== null && !Array.isArray(slotOverrides[section])) {
                    nodeConfig[section] = { ...(nodeConfig[section] || {}), ...slotOverrides[section] };
                  } else {
                    nodeConfig[section] = slotOverrides[section];
                  }
                }
              }

              logIntext(
                `[IntextManager:NavContinua] navIndex=${navIndex} Slot ${index} (${displayWrapper.id}): ENABLED (mode: ${nodeConfig.decision?.mode || 'auto'})`
              );

              const node = new IntextNode({
                id: displayWrapper.id,
                videoId: videoWrapper.id,
                container: displayContainer,
                videoContainer: videoContainer,
                config: nodeConfig,
                manager: this,
                placement,
                slotIndex: index,
                navIndex: navIndex,
              });
              newNodes.push(node);
              this.nodes.push(node);
              slotsCreatedScoped++;
            });

            newNodes.forEach(n => n.initialize());
            this._navContinuaNodes.push({ navIndex, nodes: newNodes });
            logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: created ${newNodes.length} slot(s)`);
          } catch (err) {
            console.error(`[IntextManager:NavContinua] navIndex=${navIndex}: Failed to create positions`, err);
          }
        }

        static deepMerge(target, source) {
          const isObject = (obj) =>
            obj && typeof obj === "object" && !Array.isArray(obj);
          if (!isObject(target) || !isObject(source)) {
            return source;
          }
          const merged = Object.assign({}, target);
          Object.keys(source).forEach((key) => {
            if (isObject(source[key]) && isObject(merged[key])) {
              merged[key] = IntextManager.deepMerge(merged[key], source[key]);
            } else {
              merged[key] = source[key];
            }
          });
          return merged;
        }
      }

      class IntextPlacementEngine {
        constructor(domConfig = {}, rulesConfig = {}, rootElement = null) {
          this.domConfig = domConfig;
          this.rulesConfig = rulesConfig;
          const searchRoot = rootElement || document;
          const bodySelector = domConfig.articleBodySelector || '.ue-c-article__body';
          this.articleBody = searchRoot.querySelector(bodySelector);

          groupIntext('%c[IntextPlacementEngine] 🔍 DOM Discovery', 'color:#9C27B0;font-weight:bold');
          if (this.articleBody) {
            logIntext(`✅ Article body found: "${bodySelector}"`, this.articleBody);
          } else {
            warnIntext(`❌ Article body NOT found: "${bodySelector}"`);
          }
          groupEndIntext();
        }

        findPlacements() {
          const paragraphSelector = this.domConfig.paragraphSelector || 'p';

          if (!this.articleBody) {
            warnIntext('[IntextPlacementEngine] ⛔ No article body — cannot find placements.');
            return [];
          }

          const rawElements = Array.from(this.articleBody.querySelectorAll(paragraphSelector));
          const paragraphs = rawElements.filter((p) => this.isValidParagraph(p));

          groupIntext(`%c[IntextPlacementEngine] 📋 Elements — selector: "${paragraphSelector}"`, 'color:#9C27B0;font-weight:bold');
          logIntext(`Total found:  ${rawElements.length}`);
          logIntext(`Valid (after filtering): ${paragraphs.length}`);
          if (rawElements.length !== paragraphs.length) {
            logIntext(`Filtered out: ${rawElements.length - paragraphs.length} (too short or inside blocker)`);
          }
          if (paragraphs.length > 0) {
            logIntext('First valid element:', paragraphs[0]);
            logIntext('Last valid element: ', paragraphs[paragraphs.length - 1]);
          }
          groupEndIntext();

          if (!paragraphs.length) {
            warnIntext('[IntextPlacementEngine] ⛔ No valid elements found after filtering.');
            return [];
          }

          let rules = this.rulesConfig.placements;
          if (!Array.isArray(rules)) {
            rules = [];
            if (this.rulesConfig.defaultPlacement) rules.push(this.rulesConfig.defaultPlacement);
            if (this.rulesConfig.allowMultiple && this.rulesConfig.fallbackPlacement) rules.push(this.rulesConfig.fallbackPlacement);
            if (this.rulesConfig.allowMultiple && this.rulesConfig.thirdPlacement) rules.push(this.rulesConfig.thirdPlacement);
          }

          groupIntext(`%c[IntextPlacementEngine] 📌 Evaluating ${rules.length} placement rule(s)`, 'color:#9C27B0;font-weight:bold');
          const placements = [];
          let lastIndex = -1;
          for (const rule of rules) {
            // For the first slot, always evaluate. For subsequent, only if allowMultiple.
            if (placements.length > 0 && this.rulesConfig.allowMultiple !== true) break;
            const result = this.evaluatePlacement(paragraphs, rule, lastIndex);
            const ruleIdx = placements.length;
            if (result) {
              placements.push(result);
              lastIndex = result.paragraphIndex;
              const el = result.paragraph;
              const preview = (el.innerText || el.textContent || '').slice(0, 60).replace(/\n/g, ' ');
              logIntext(`✅ Slot ${ruleIdx}: after element[${result.paragraphIndex}] → "${preview}…"`, el);
            } else {
              logIntext(`❌ Slot ${ruleIdx}: rule [${rule}] — no valid position (lastIndex=${lastIndex}, total=${paragraphs.length})`);
            }
          }
          groupEndIntext();

          logIntext(`%c[IntextPlacementEngine] ✅ ${placements.length} placement(s) resolved`, 'color:#4CAF50;font-weight:bold');
          return placements;
        }

        evaluatePlacement(paragraphs, rule = [], startIndex = -1) {
          if (!rule || rule.length < 2) return null;
          let [targetIndex, minParagraphsAfter] = rule;
          targetIndex = Math.max(targetIndex - 1, startIndex + 1);
          if (targetIndex >= paragraphs.length) return null;
          let paragraph = paragraphs[targetIndex];
          const remaining = paragraphs.length - (targetIndex + 1);
          if (remaining < minParagraphsAfter) return null;
          if (!paragraph) return null;

          const avoidance = this.rulesConfig.adjacencyAvoidance;
          if (avoidance?.enabled && avoidance?.selector) {
            const matchesAdSelector = (el) => {
              if (!el) return false;
              return el.matches(avoidance.selector) || !!el.querySelector(avoidance.selector);
            };

            const isAdjacentToAd = (p) => {
              let el = p.previousElementSibling;
              for (let i = 0; i < 2 && el; i++) {
                if (matchesAdSelector(el)) return true;
                if (el.matches && el.matches(this.domConfig.paragraphSelector || "p")) break;
                el = el.previousElementSibling;
              }
              el = p.nextElementSibling;
              for (let i = 0; i < 2 && el; i++) {
                if (matchesAdSelector(el)) return true;
                if (el.matches && el.matches(this.domConfig.paragraphSelector || "p")) break;
                el = el.nextElementSibling;
              }
              return false;
            };

            if (isAdjacentToAd(paragraph)) {
              logIntext(
                `[IntextPlacement] ⚠️ Adjacency avoidance triggered: paragraph ${targetIndex + 1} is grouped with an ad ("${avoidance.selector}"). Searching for a safe paragraph...`
              );
              const preferUp = (avoidance.direction || "up") === "up";
              
              const tryOrder = [];
              for (let d = 1; d < paragraphs.length; d++) {
                if (preferUp) {
                  tryOrder.push(targetIndex - d);
                  tryOrder.push(targetIndex + d);
                } else {
                  tryOrder.push(targetIndex + d);
                  tryOrder.push(targetIndex - d);
                }
              }

              let moved = false;
              for (const newIdx of tryOrder) {
                if (newIdx <= startIndex) continue;
                if (newIdx < 1) continue;
                if (newIdx >= paragraphs.length) continue;
                const newRemaining = paragraphs.length - (newIdx + 1);
                if (newRemaining < 1) continue;
                
                const candidate = paragraphs[newIdx];
                if (candidate && !isAdjacentToAd(candidate)) {
                  logIntext(
                    `[IntextPlacement] ✅ Adjacency avoidance SUCCESS: shifted slot from paragraph ${targetIndex + 1} → ${newIdx + 1}`
                  );
                  paragraph = candidate;
                  targetIndex = newIdx;
                  moved = true;
                  break;
                } else if (candidate) {
                  logIntext(`[IntextPlacement] ❌ Adjacency avoidance: paragraph ${newIdx + 1} rejected (also adjacent to ad)`);
                }
              }
              if (!moved) {
                warnIntext(
                  `[IntextPlacement] ⚠️ Adjacency avoidance FAILURE: could not find any safe paragraph to shift to from paragraph ${targetIndex + 1}. Keeping original position.`
                );
              }
            }
          }

          return { paragraph, paragraphIndex: targetIndex };
        }

        isValidParagraph(paragraph) {
          if (!paragraph) return false;
          if (
            paragraph.innerText.trim().length <
            (this.rulesConfig.minCharacters || 50)
          )
            return false;
          const blockerSelector = this.domConfig.blockerSelector;
          if (blockerSelector && paragraph.closest(blockerSelector))
            return false;
          return true;
        }
      }

      class IntextNode {
        constructor({
          id,
          videoId,
          container,
          videoContainer,
          config,
          manager,
          placement,
          slotIndex = 0,
        }) {
          this.id = id;
          this.videoId = videoId;
          this.container = container;
          this.videoContainer = videoContainer;
          this.config = config;
          this.manager = manager;
          this.placement = placement;
          this.slotIndex = slotIndex;
          this.state = "idle";
          this.waterfall = null;
          this.activeCreative = null;
          this.wa = null;
          this.slot = null;
          this._coordinator = null;
          this.lockedHeight = 0;
          this._videoTiming = null;
        }

        markDisplayHeightLock(height, sourceEl = null) {
          const numericHeight = parseInt(height, 10) || 0;
          if (numericHeight !== 600) return;
          if (this.lockedHeight !== 600) {
            logIntext(`[Intext:Display:${this.id}] display_height_lock_set_600`);
          }
          this.lockedHeight = 600;
          const els = [sourceEl, this.container?.getElement?.(), this.videoContainer?.getElement?.()].filter(Boolean);
          els.forEach((el) => {
            if (el?.dataset) {
              el.dataset.lockedHeight = "600";
            }
          });
        }

        getPreservedRefreshHeight(currentEl) {
          const nodeLockedHeight = parseInt(this.lockedHeight, 10) || 0;
          const datasetLockedHeight = parseInt(currentEl?.dataset?.lockedHeight, 10) || 0;
          const currentOffsetHeight = currentEl?.offsetHeight || 0;

          let preservedHeight = 360;
          let lockSource = "default_360";

          if (nodeLockedHeight > 0) {
            preservedHeight = nodeLockedHeight;
            lockSource = "this.node.lockedHeight";
          } else if (datasetLockedHeight > 0) {
            preservedHeight = datasetLockedHeight;
            lockSource = "el.dataset.lockedHeight";
          } else if (currentOffsetHeight > 0) {
            preservedHeight = currentOffsetHeight;
            lockSource = "currentEl.offsetHeight";
          }

          if (nodeLockedHeight === 600 || datasetLockedHeight === 600) {
            if (preservedHeight < 600) {
              logIntext(`[Intext:Display:${this.id}] display_height_lock_restored_600`);
            }
            preservedHeight = Math.max(preservedHeight, 600);
            this.lockedHeight = 600;
          }

          logIntext(
            `[Intext:Display:${this.id}] display_refresh_lock_source - source=${lockSource}, height=${preservedHeight}`,
          );

          return preservedHeight;
        }

        initialize() {
          this.wa = new WindowArray(
            this.id,
            this.manager.gexp.cfg,
            this.manager.gexp,
          );
          this.manager.gexp.windows[this.id] = this.wa;

          this.waterfall = new IntextWaterfall({
            node: this,
            container: this.container,
            config: this.config,
            gexp: this.manager.gexp,
            wa: this.wa,
          });

          this.waterfall.init();
        }

        isMobile() {
          return window.innerWidth < 768;
        }

        askDisplay(bidResponse) {
          return new Promise((resolve) => {
            this.state = "asking_display";
            const adUnitPath =
              this.manager.adUnitPath || this.manager.gexp.cfg.adUnit || "";
            let sizes = this.config.display?.sizes || [[300, 250], [336, 280], [320, 100], [320, 50]];

            const networkId = this.manager.networkId;
            const fullAdUnit = `/${networkId}/${adUnitPath}`;

            logIntext(
              `[Intext:Display:${this.id}] 🔍 Asking GAM for display. AdUnit: ${fullAdUnit}, Sizes:`,
              sizes,
            );
            if (bidResponse) {
              logIntext(
                `[Intext:Display:${this.id}] Prebid bid: $${bidResponse.cpm} from ${bidResponse.bidderCode}`,
              );
            }

            googletag.cmd.push(() => {
              if (!this.slot) {
                this.slot = googletag.defineSlot(fullAdUnit, sizes, this.id);
                if (!this.slot) {
                  errorIntext(
                    `[Intext:Display:${this.id}] ❌ Slot definition failed`,
                  );
                  resolve({ filled: false, event: null });
                  return;
                }
                this.slot.addService(googletag.pubads());
              }

              this.slot.clearTargeting();
              this.slot.setTargeting("p", [this.id]);
              this.slot.setTargeting("intext", "true");
              if (this.navIndex) {
                  this.slot.setTargeting("gexp-intext-navcont", String(this.navIndex));
              }
              
              if (window.pbjs && bidResponse) {
                  let pb = bidResponse.pbCg || bidResponse.pbAg || bidResponse.pbHg || String(bidResponse.cpm);
                  this.slot.setTargeting("hb_pb", pb);
                  this.slot.setTargeting("hb_bidder", bidResponse.bidderCode);
                  this.slot.setTargeting("hb_format", "banner");
                  if (bidResponse.adId) {
                      this.slot.setTargeting("hb_adid", bidResponse.adId);
                  }
                  
                  const aliasKey = bidResponse.bidderCode.length > 20 ? bidResponse.bidderCode.substring(0, 20) : bidResponse.bidderCode;
                  this.slot.setTargeting(`hb_pb_${aliasKey}`, pb);
                  this.slot.setTargeting(`hb_bidder_${aliasKey}`, bidResponse.bidderCode);
              }
              if (window.apstag && window.apstag.targetingKeys) {
                const tamKeys = window.apstag.targetingKeys();
                if (tamKeys && tamKeys[this.id]) {
                  Object.entries(tamKeys[this.id]).forEach(([k, v]) => {
                    this.slot.setTargeting(k, v);
                  });
                }
              }

              if (this.wa) {
                this.wa.slot = this.slot;
                this.wa.allowUpdate = true;
              }

              try {
                  const targetMap = this.slot.getTargetingKeys().reduce((acc, key) => {
                      acc[key] = this.slot.getTargeting(key);
                      return acc;
                  }, {});
                  logIntext(`[Intext:Display:${this.id}] 📤 Launching GAM Display Request. Targeted keys:`, targetMap);
              } catch(e) {}
              // -----------------------------------------------

              this.manager.gexp.request(this.slot);

              const initialRenderHandler = (event) => {
                if (event.slot !== this.slot) return;
                googletag
                  .pubads()
                  .removeEventListener("slotRenderEnded", initialRenderHandler);

                const hasContent = !event.isEmpty;
                const is1x1 =
                  event.size && event.size[0] === 1 && event.size[1] === 1;
                logIntext(
                  `[Intext:Display:${this.id}] initial slotRenderEnded — isEmpty: ${event.isEmpty}, size: ${JSON.stringify(event.size)}, is1x1: ${is1x1}, hasContent: ${hasContent}`,
                );

                resolve({ filled: hasContent, event, is1x1 });
              };
              googletag
                .pubads()
                .addEventListener("slotRenderEnded", initialRenderHandler);

              if (!this._hasPersistentListener) {
                this._hasPersistentListener = true;
                googletag.pubads().addEventListener("slotRenderEnded", (event) => {
                  if (event.slot !== this.slot) return;
                  if (this.state !== "display") return;
                  
                  const slotDoc = document.getElementById(this.id);
                  if (slotDoc && event.size) {
                    const parentWidth = this.container.getElement().clientWidth;
                    let scaleTarget = slotDoc.querySelector('div[id^="google_ads_iframe"]') || slotDoc.querySelector('iframe');
                    if (!scaleTarget && slotDoc.children.length > 1) {
                        scaleTarget = slotDoc.lastElementChild;
                    }
                    if (!scaleTarget) scaleTarget = slotDoc;

                    const gamWidth = event.size ? event.size[0] : 0;
                    const gamHeight = event.size ? event.size[1] : 0;
                    const isRefresh1x1 = event.size && event.size[0] === 1 && event.size[1] === 1;

                    let actualHeight = gamHeight;
                    if (isRefresh1x1 && this.waterfall?._lastDisplayBid) {
                        actualHeight = parseInt(this.waterfall._lastDisplayBid.height, 10) || 0;
                    }
                    if (actualHeight === 600) {
                        this.markDisplayHeightLock(600, slotDoc);
                    }

                    if (gamWidth === 960 && gamHeight === 540) {
                        const computedStyle = window.getComputedStyle(slotDoc);
                        const paddingX = parseFloat(computedStyle.paddingLeft || 0) + parseFloat(computedStyle.paddingRight || 0);
                        const availableWidth = (slotDoc.clientWidth || this.container.getElement().clientWidth || 320) - paddingX; 
                        const scaleFactor = availableWidth / gamWidth;   
                        const proportionalHeight = gamHeight * scaleFactor; 

                        scaleTarget.style.position = "static";
                        scaleTarget.style.margin = "0 auto";
                        
                        scaleTarget.style.transformOrigin = 'top center';
                        scaleTarget.style.transform = `scale(${scaleFactor})`;
                        scaleTarget.style.width = `${gamWidth}px`;
                        scaleTarget.style.height = `${gamHeight}px`;

                        slotDoc.style.overflow = 'hidden';
                        slotDoc.style.display = 'flex';
                        slotDoc.style.justifyContent = 'center';
                        slotDoc.style.alignItems = 'flex-start';
                        
                        const finalHeight = Math.max((this.lockedHeight || 0), proportionalHeight);
              
                        slotDoc.style.minHeight = finalHeight + "px";
                        slotDoc.style.height = finalHeight + "px";

                    } else {
                        slotDoc.style.overflow = '';
                        slotDoc.style.display = 'block';
                        slotDoc.style.justifyContent = '';
                        slotDoc.style.alignItems = '';
                        
                        scaleTarget.style.transform = '';
                        scaleTarget.style.width = '';
                        scaleTarget.style.height = '';

                        if (this.lockedHeight) {
                            slotDoc.style.minHeight = this.lockedHeight + "px";
                            slotDoc.style.height = this.lockedHeight + "px";
                        }

                        if (actualHeight > 0 && actualHeight < (this.lockedHeight || 360)) {
                            scaleTarget.style.position = "sticky";
                            scaleTarget.style.top = "60px";
                            scaleTarget.style.margin = "0 auto";
                            scaleTarget.style.alignSelf = "flex-start";
                        } else {
                            scaleTarget.style.position = "static";
                            scaleTarget.style.margin = "0 auto";
                        }
                    }
                  }
                });
              }

              logIntext(
                `[Intext:Display:${this.id}] Calling googletag.display + refresh`,
              );

              let slotEl = document.getElementById(this.id);
              if (!slotEl) {
                logIntext(
                  `[Intext:Display:${this.id}] ⚠️ DOM element missing, recreating wrapper...`,
                );

                slotEl = this.manager.createWrapperNode(
                  this.id,
                  "display",
                );

                slotEl.style.height = "0px";
                slotEl.style.minHeight = "0px";
                slotEl.style.opacity = "0";
                slotEl.style.display = "none";
                slotEl.style.margin = "0";
                slotEl.style.padding = "0";

                const videoEl = document.getElementById(this.videoId);
                if (videoEl && videoEl.parentNode) {
                  videoEl.parentNode.insertBefore(slotEl, videoEl);
                } else if (this.placement && this.placement.paragraph) {
                  this.placement.paragraph.parentNode.insertBefore(
                    slotEl,
                    this.placement.paragraph.nextSibling,
                  );
                } else {
                  errorIntext(
                    `[Intext:Display:${this.id}] ❌ Could not find anchor to re-insert display wrapper.`,
                  );
                }

                if (
                  this.container &&
                  typeof this.container.setElement === "function"
                ) {
                  this.container.setElement(slotEl);
                }
              }

              if (slotEl && !slotEl.hasAttribute("data-gpt-displayed")) {
                googletag.display(this.id);
                slotEl.setAttribute("data-gpt-displayed", "true");
              }
              googletag.pubads().refresh([this.slot]);
            });
          });
        }

        waitForViewport() {
          return new Promise((resolve) => {
            const el = this.container.getElement();
            if (typeof IntersectionObserver === "undefined" || !el) {
              return resolve();
            }
            const observer = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting) {
                observer.disconnect();
                resolve();
              }
            }, { threshold: 0, rootMargin: "0px" });
            observer.observe(el);
          });
        }

        async showDisplay(displayResult) {
          await this.waitForViewport();

          this.state = "display";
          const { event, is1x1 } = displayResult;
          const creativeHeight = event.size && !is1x1 ? event.size[1] : null;
          const loader = this.container
            .getElement()
            .querySelector(".gexp-intext-loader");
          if (loader) loader.style.display = "none";

          const videoLoader = this.videoContainer
            .getElement()
            .querySelector(".gexp-intext-loader");
          if (videoLoader) videoLoader.style.display = "none";

           const gamCreativeHeight = event?.size ? event.size[1] : 0;
           let actualCreativeHeight = gamCreativeHeight;
           if (is1x1 && this.waterfall?._lastDisplayBid) {
             actualCreativeHeight = parseInt(this.waterfall._lastDisplayBid.height, 10) || 0;
           }
           if (actualCreativeHeight === 600) {
               this.markDisplayHeightLock(600, this.container.getElement());
           }

           const vContainerEl = this.videoContainer.getElement();
           if (vContainerEl) {
             vContainerEl.style.transition = "none";
             vContainerEl.style.display = "none";
             vContainerEl.style.height = "0px";
             vContainerEl.style.minHeight = "0px";
             vContainerEl.classList.remove("is-open");
           }

           const slotDoc = document.getElementById(this.id);
           if (slotDoc) {
              slotDoc.style.transition = "none";
              if (this.lockedHeight) {
                  slotDoc.dataset.lockedHeight = String(this.lockedHeight);
              }
           }

           this.container.open(this.lockedHeight);
           this.recordTelemetry("fill", { slotId: this.id, size: event.size });

           if (slotDoc) {
              slotDoc.classList.add("is-open");
              slotDoc.style.display = "block";
              slotDoc.style.opacity = "1";
              slotDoc.style.margin = "";
              slotDoc.style.padding = "";

             if (this.lockedHeight) {
                 slotDoc.style.minHeight = this.lockedHeight + "px";
                 slotDoc.style.height = this.lockedHeight + "px"; 
                 slotDoc.dataset.lockedHeight = String(this.lockedHeight);
             } else {
                 slotDoc.style.minHeight = "360px";
                 if (!slotDoc.style.height) slotDoc.style.height = "360px";
             }

             let scaleTarget = slotDoc.querySelector('div[id^="google_ads_iframe"]') || slotDoc.querySelector("iframe") || slotDoc.lastElementChild || slotDoc;
          
             const gamWidth = event.size ? event.size[0] : 0;
             const gamHeight = event.size ? event.size[1] : 0;

             if (gamWidth === 960 && gamHeight === 540) {
                const computedStyle = window.getComputedStyle(slotDoc);
                const paddingX = parseFloat(computedStyle.paddingLeft || 0) + parseFloat(computedStyle.paddingRight || 0);
                const availableWidth = (slotDoc.clientWidth || this.container.getElement().clientWidth || 320) - paddingX; 
                const scaleFactor = availableWidth / gamWidth;   
                const proportionalHeight = gamHeight * scaleFactor; 

                scaleTarget.style.position = "static";
                scaleTarget.style.margin = "0 auto";
                
                scaleTarget.style.transformOrigin = 'top center';
                scaleTarget.style.transform = `scale(${scaleFactor})`;
                scaleTarget.style.width = `${gamWidth}px`;
                scaleTarget.style.height = `${gamHeight}px`;

                slotDoc.style.overflow = 'hidden';
                slotDoc.style.display = 'flex';
                slotDoc.style.justifyContent = 'center';
                slotDoc.style.alignItems = 'flex-start';
                
                const finalHeight = Math.max((this.lockedHeight || 0), proportionalHeight);
                
                slotDoc.style.minHeight = finalHeight + "px";
                slotDoc.style.height = finalHeight + "px";

             } else {
                slotDoc.style.overflow = '';
                slotDoc.style.display = 'block';
                slotDoc.style.justifyContent = '';
                slotDoc.style.alignItems = '';
                
                scaleTarget.style.transform = '';
                scaleTarget.style.width = '';
                scaleTarget.style.height = '';

                if (actualCreativeHeight > 0 && actualCreativeHeight < (this.lockedHeight || 360)) {
                    scaleTarget.style.position = "sticky";
                    scaleTarget.style.top = "60px";
                    scaleTarget.style.margin = "0 auto";
                    scaleTarget.style.alignSelf = "flex-start";
                } else {
                  scaleTarget.style.position = "static";
                  scaleTarget.style.margin = "0 auto";
                }
             }

             setTimeout(() => {
                if (slotDoc) slotDoc.style.transition = "";
             }, 50);
          }
           
           this.videoContainer.close({ destroy: true });

          this.scheduleWaterfallRetry();
        }

        scheduleWaterfallRetry() {
          const refreshCfg = this.config.refreshCycle;
          if (!refreshCfg || !refreshCfg.enabled) return;

          this._cycleCount = (this._cycleCount || 0) + 1;
          if (this._cycleCount >= refreshCfg.maxCycles) {
            logIntext(`[Intext:Display:${this.id}] Max refresh cycles reached (${this._cycleCount}/${refreshCfg.maxCycles}).`);
            return;
          }

          const targetIntervalMs = refreshCfg.delayMs || 30000;
          logIntext(`[Intext:Display:${this.id}] ⏱️ Scheduling Waterfall Retry ${this._cycleCount}/${refreshCfg.maxCycles} (Requires ${targetIntervalMs}ms of VISIBLE time)`);

          if (this._visibilityTimer) {
            this._visibilityTimer.stop();
          }

          const el = document.getElementById(this.id);
          if (!el) {
             setTimeout(() => {
                 this.destroyDisplayForRetry();
                 this.waterfall.prebidStarted = false;
                 this.waterfall.startAuction("refresh");
             }, targetIntervalMs);
             return;
          }

          let accumulatedVisibleTime = 0;
          let lastVisibleTimestamp = 0;
          let isCurrentlyVisible = false;
          let checkInterval;
          let observer;

          const triggerRefresh = () => {
            if (observer) observer.disconnect();
            if (checkInterval) clearInterval(checkInterval);
            logIntext(`[Intext:Display:${this.id}] 🔄 Visible time reached (${targetIntervalMs}ms) -> Retrying Waterfall`);
            this.destroyDisplayForRetry();
            this.waterfall.prebidStarted = false;
            this.waterfall.startAuction("refresh");
          };

          const updateAccumulator = () => {
            if (isCurrentlyVisible && document.visibilityState === 'visible') {
                const now = Date.now();
                if (lastVisibleTimestamp > 0) {
                    accumulatedVisibleTime += (now - lastVisibleTimestamp);
                }
                lastVisibleTimestamp = now;

                if (accumulatedVisibleTime >= targetIntervalMs) {
                    triggerRefresh();
                }
            } else {
                lastVisibleTimestamp = 0;
            }
          };

          if (typeof IntersectionObserver !== "undefined") {
              observer = new IntersectionObserver((entries) => {
                  const entry = entries[0];
                  const wasVisible = isCurrentlyVisible;
                  isCurrentlyVisible = entry.isIntersecting;
                  
                  if (isCurrentlyVisible && !wasVisible && document.visibilityState === 'visible') {
                      lastVisibleTimestamp = Date.now();
                  } else if (!isCurrentlyVisible && wasVisible) {
                      updateAccumulator();
                  }
              }, { threshold: 0.1 });
              observer.observe(el);
          } else {
               isCurrentlyVisible = true;
          }
          checkInterval = setInterval(updateAccumulator, 500);
          this._visibilityTimer = {
             stop: () => {
                if (observer) observer.disconnect();
                if (checkInterval) clearInterval(checkInterval);
             }
          };
        }

        destroyDisplayForRetry() {
             if (this._visibilityTimer) {
                 this._visibilityTimer.stop();
                 this._visibilityTimer = null;
             }
             const currentEl = this.container.getElement();
             const preservedHeight = this.getPreservedRefreshHeight(currentEl);
             logIntext(
               `[Intext:Display:${this.id}] display_refresh_preserved_height - height=${preservedHeight}`,
             );

             if (this.slot) {
                googletag.cmd.push(() => googletag.destroySlots([this.slot]));
                this.slot = null;
             }

             const newWrapper = this.manager.createWrapperNode(this.id, "display");
             newWrapper.style.height = preservedHeight + "px";
             newWrapper.style.minHeight = preservedHeight + "px";
             newWrapper.dataset.lockedHeight = String(preservedHeight);
             newWrapper.classList.add("is-open");
             newWrapper.style.opacity = "1";
             newWrapper.style.display = "block";
             newWrapper.style.margin = "32px auto";
             newWrapper.style.paddingTop = "15px";
             const newLoader = newWrapper.querySelector(".gexp-intext-loader");
             if (newLoader) newLoader.style.display = "flex";

             if (currentEl && currentEl.parentNode) {
                 currentEl.parentNode.insertBefore(newWrapper, currentEl);
                 currentEl.style.transition = "none";
                 currentEl.style.display = "none";
                 currentEl.remove();
             } else if (this.placement && this.placement.paragraph) {
                 this.placement.paragraph.parentNode.insertBefore(newWrapper, this.placement.paragraph.nextSibling);
             }

             this.container.setElement(newWrapper);
             this.container.isOpen = true;
        }
        discardDisplay() {
          if (this.slot) {
            googletag.cmd.push(() => {
              googletag.destroySlots([this.slot]);
              this.slot = null;
              const el = document.getElementById(this.id);
              if (el) el.removeAttribute("data-gpt-displayed");
            });
          }
          this.container.close({ destroy: true });
        }

        async buildAndPlayVideo(gamVideoTagUrl) {
          await this.waitForViewport();
          
          this.state = "video";
          if (this._videoTiming?.auctionStartAt && this._videoTiming?.requestWinnerVideoAt) {
            logIntext(
              `[Intext:Video:${this.videoId}] timing trigger=${this._videoTiming.trigger || "unknown"} auction_to_request_winner_video=${this._videoTiming.requestWinnerVideoAt - this._videoTiming.auctionStartAt}ms`,
            );
          }
          logIntext(
            `[Intext:Video:${this.videoId}] 🎬 VIDEO WON — building player`,
          );

          const containerEl = this.videoContainer.getElement();
          containerEl.style.pointerEvents = "none";

          const creativeOpts = {
            container: this.videoContainer,
            node: this,
            config: this.config,
            onVideoEnded: () => this.onVideoEnded(),
            adTagUrl: gamVideoTagUrl,
            videoTiming: this._videoTiming,
          };

          this.activeCreative = new IntextVideoCreative(creativeOpts);

          try {
            await this.activeCreative.render();

            logIntext(
              `[Intext:Video:${this.videoId}] ✅ Video ad is playing — revealing container`,
            );
            containerEl.style.pointerEvents = "auto";
            this.recordTelemetry("video_fill", { slotId: this.videoId });
            this.discardDisplay();
          } catch (err) {
            logIntext(
              `[Intext:Video:${this.videoId}] ❌ Video build/play failed: ${err.message || err}`,
            );
            logIntext(`[Intext:Video:${this.videoId}]    Full error:`, err);

            const loader = containerEl.querySelector(".gexp-intext-loader");
            if (loader) loader.style.display = "none";

            this.activeCreative?.destroy?.();
            this.recordTelemetry("video_no_fill", { slotId: this.videoId });
            containerEl.style.pointerEvents = "";
            this.videoContainer.close({ destroy: true });
            return false;
          }
          return true;
        }
        
        onVideoEnded() {
          logIntext(`[Intext:Video:${this.videoId}] 🔄 Video playback ended`);

          const refreshCfg = this.config.refreshCycle;
          if (!refreshCfg || !refreshCfg.enabled) {
            logIntext(
              `[Intext:Video:${this.videoId}] Refresh cycle disabled — keeping container open for UX stability or closing`,
            );
            this.videoContainer.close({ destroy: true });
            this.manager.onSlotComplete(this.id);
            return;
          }

          this._cycleCount = (this._cycleCount || 0) + 1;
          if (this._cycleCount >= refreshCfg.maxCycles) {
            logIntext(
              `[Intext:Video:${this.videoId}] Max refresh cycles reached (${this._cycleCount}/${refreshCfg.maxCycles}) — closing`,
            );
            this.videoContainer.close({ destroy: true });
            this.manager.onSlotComplete(this.id);
            return;
          }

          const targetIntervalMs = refreshCfg.videoIntervalMs || 0;
          logIntext(`[Intext:Video:${this.videoId}] ⏱️ Scheduling Video Refresh ${this._cycleCount}/${refreshCfg.maxCycles} (Requires ${targetIntervalMs}ms of VISIBLE time)`);

          const el = this.videoContainer.getElement();
          if (!el) {
             setTimeout(() => {
                 this.activeCreative?.destroy?.();
                 this.activeCreative = null;
                 this.waterfall.prebidStarted = false;
                 this.waterfall.startAuction("refresh");
             }, targetIntervalMs);
             return;
          }

          if (this._videoVisibilityTimer) {
             this._videoVisibilityTimer.stop();
          }

          let accumulatedVisibleTime = 0;
          let lastVisibleTimestamp = 0;
          let isCurrentlyVisible = false;
          let checkInterval;
          let observer;

          const triggerRefresh = () => {
             if (observer) observer.disconnect();
             if (checkInterval) clearInterval(checkInterval);
             logIntext(
               `[Intext:Video:${this.videoId}] 🔄 Visible time reached (${targetIntervalMs}ms) -> Starting refresh cycle ${this._cycleCount}/${refreshCfg.maxCycles} (mode: ${refreshCfg.mode || "display_only"})`,
             );
             this.activeCreative?.destroy?.();
             this.activeCreative = null;
             this.waterfall.prebidStarted = false;
             this.waterfall.startAuction("refresh");
          };

          const updateAccumulator = () => {
             if (isCurrentlyVisible && document.visibilityState === 'visible') {
                 const now = Date.now();
                 if (lastVisibleTimestamp > 0) {
                     accumulatedVisibleTime += (now - lastVisibleTimestamp);
                 }
                 lastVisibleTimestamp = now;

                 if (accumulatedVisibleTime >= targetIntervalMs) {
                     triggerRefresh();
                 }
             } else {
                 lastVisibleTimestamp = 0;
             }
          };

          if (typeof IntersectionObserver !== "undefined") {
              observer = new IntersectionObserver((entries) => {
                  const entry = entries[0];
                  const wasVisible = isCurrentlyVisible;
                  isCurrentlyVisible = entry.isIntersecting;
                  
                  if (isCurrentlyVisible && !wasVisible && document.visibilityState === 'visible') {
                      lastVisibleTimestamp = Date.now();
                      if (targetIntervalMs === 0) updateAccumulator(); // Fast-path for 0ms
                  } else if (!isCurrentlyVisible && wasVisible) {
                      updateAccumulator();
                      logIntext(`[Intext:Video:${this.videoId}] Slot not visible — pausing video refresh timer until viewport entry`);
                  }
              }, { threshold: 0.1 });
              observer.observe(el);
          } else {
              isCurrentlyVisible = true;
          }

          checkInterval = setInterval(updateAccumulator, 500);

          this._videoVisibilityTimer = {
             stop: () => {
                if (observer) observer.disconnect();
                if (checkInterval) clearInterval(checkInterval);
             }
          };
        }
        
        closeAll() {
          logIntext(
            `[Intext:Slot:${this.id}] ⬜ No fill — keeping space open (blank) to avoid CLS`,
          );

          const displayEl = this.container.getElement();
          const displayInDom = displayEl && displayEl.isConnected;
          const videoEl = this.videoContainer.getElement();
          const videoInDom = videoEl && videoEl.isConnected;
          if (displayInDom) {
            const loader = displayEl.querySelector(".gexp-intext-loader");
            if (loader) loader.style.display = "none";
          }
          if (videoInDom) {
            const loader = videoEl.querySelector(".gexp-intext-loader");
            if (loader) loader.style.display = "none";
          }

          if (displayInDom) {
            displayEl.classList.add("is-open");
            displayEl.style.display = "block";
            displayEl.style.height = (this.lockedHeight || 360) + "px";
            displayEl.style.minHeight = (this.lockedHeight || 360) + "px";
            displayEl.style.opacity = "1";
            if (videoInDom) this.videoContainer.close({ destroy: false });
          } else if (videoInDom) {
            videoEl.classList.add("is-open");
            videoEl.style.display = "block";
            videoEl.style.height = (this.lockedHeight || 360) + "px";
            videoEl.style.minHeight = (this.lockedHeight || 360) + "px";
            videoEl.style.opacity = "1";
            logIntext(`[Intext:Slot:${this.id}] ⬜ Keeping VIDEO container open (display was destroyed)`);
          } else {
            logIntext(`[Intext:Slot:${this.id}] ⬜ No container in DOM — nothing to preserve`);
          }

          this.recordTelemetry("no_fill", { slotId: this.id });
          this.manager.onSlotComplete(this.id);
        }

        handleCreativeError(reason) {
          this.state = "error";
          this.recordTelemetry("error", { reason });
          this.container.close({ destroy: false });
          this.waterfall?.handleCreativeFailure();
        }

        recordTelemetry(eventName, payload = {}) {
          if (this.manager.gexp.statsG) {
            this.manager.gexp.statsG.addVariable(
              `intext_${eventName}`,
              JSON.stringify(payload),
            );
          }
        }

        resetNode() {
          this.state = "idle";
          if (this.slot) {
            googletag.cmd.push(() => googletag.destroySlots([this.slot]));
          }
          this.activeCreative?.destroy?.();
          this.container.destroy();
          
          if (this.waterfall) {
             if (this.waterfall._visibilityTimer) {
                 this.waterfall._visibilityTimer.stop();
                 this.waterfall._visibilityTimer = null;
             }
             if (this.waterfall._videoVisibilityTimer) {
                 this.waterfall._videoVisibilityTimer.stop();
                 this.waterfall._videoVisibilityTimer = null;
             }
          }

          delete this.manager.gexp.windows[this.id];
        }
      }

      class IntextContainer {
        constructor(domNode, styleConfig = {}) {
          this.domNode = domNode;
          this.styleConfig = styleConfig;
          this.isOpen = false;
          this.applyStyles();
        }

        applyStyles() {
          const style = this.styleConfig || {};
          if (style.containerBackground) {
            this.domNode.style.backgroundColor = style.containerBackground;
          }
          if (style.fixedHeight) {
            this.domNode.style.height = "0px";
            this.domNode.dataset.targetHeight = style.fixedHeight;
          }
          if (style.flexibleMaxHeight) {
            this.domNode.style.maxHeight = style.flexibleMaxHeight;
          }
          if (style.useBlur) {
            this.domNode.style.backdropFilter = `blur(${style.blurValue || "8px"})`;
          }
        }

        open(lockedHeightOverride) {
          if (this.isOpen) return;
          this.isOpen = true;
          let finalHeight;
          if (lockedHeightOverride && lockedHeightOverride > 1) {
              finalHeight = (lockedHeightOverride + 15) + "px";
          } else {
              const preset = this.domNode.dataset.targetHeight;
              finalHeight = preset || "360px";
          }
          this.domNode.style.height = '0px';
          this.domNode.style.minHeight = '';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              this.domNode.classList.add("is-open");
              this.domNode.style.height = finalHeight;
            });
          });
        }

        close({ destroy = false } = {}) {
          this.isOpen = false;
          this.domNode.classList.remove("is-open");
          this.domNode.style.height = "0px";
          if (destroy) {
            setTimeout(() => this.destroy(), 350);
          }
        }

        destroy() {
          this.domNode.remove();
        }

        getElement() {
          return this.domNode;
        }

        setElement(el) {
          this.domNode = el;
        }
      }

      class IntextWaterfall {
        constructor({ node, container, config, gexp, wa }) {
          this.node = node;
          this.container = container;
          this.config = config;
          this.gexp = gexp;
          this.wa = wa; 
          this.prebidStarted = false;
          this.timer = null;
          this.intersectionObserver = null;
        }

        init() {
          this.setupIntersectionTrigger();
          this.setupTimerTrigger();
        }

        setupIntersectionTrigger() {
          const margin = this.config.loading?.rootMargin || "200px 0px";

          if ("IntersectionObserver" in window) {
            this.intersectionObserver = new IntersectionObserver(
              (entries) => {
                if (entries[0].isIntersecting) {
                  this.startAuction("intersection");
                  this.intersectionObserver.disconnect();
                }
              },
              { threshold: 0, rootMargin: margin },
            );
            this.intersectionObserver.observe(this.container.getElement());
          } else {
            this.startAuction("fallback");
          }
        }

        setupTimerTrigger() {
          const timeout = this.config.loading?.maxDelayMs || 5000;
          this.timer = setTimeout(() => this.startAuction("timer"), timeout);
        }
        
        async startAuction(trigger) {
          if (this.prebidStarted) return;
          this.prebidStarted = true;
          this.lastTrigger = trigger;
          this._auctionStartAt = Date.now();
          clearTimeout(this.timer);
          this.node.recordTelemetry("auction_start", { trigger });

          if (trigger === "refresh") {
            const currentState = this.node.state; 

            if (window.pbjs.clearTargeting) {
              window.pbjs.clearTargeting(this.node.id);
            }

            if (window.pbjs.removeAdUnit) {
              window.pbjs.removeAdUnit(this.node.id);
            }

            if (this.node.activeCreative && this.node.activeCreative.player) {
              const vjsEl = this.node.activeCreative.player.el();
              if (vjsEl) {
                vjsEl.classList.add("vjs-hidden");
                vjsEl.style.display = "none";
              }
            }

            if (currentState === "video") {
              const videoEl = this.node.videoContainer?.getElement();
              if (videoEl) {
                let loaderVideo = videoEl.querySelector(".gexp-intext-loader");
                if (!loaderVideo) {
                  videoEl.insertAdjacentHTML('beforeend', '<div class="gexp-intext-loader"><div class="gexp-intext-spinner"></div><div class="gexp-intext-loader-text">Recuperando anuncio</div></div>');
                  loaderVideo = videoEl.querySelector(".gexp-intext-loader");
                }
                if (loaderVideo) loaderVideo.style.display = "flex";
                const preservedHeight = this.node.getPreservedRefreshHeight(videoEl);
                logIntext(
                  `[Intext:Display:${this.node.id}] display_refresh_preserved_height - height=${preservedHeight}`,
                );
                videoEl.style.height = preservedHeight + "px";
                videoEl.style.minHeight = preservedHeight + "px";
                videoEl.dataset.lockedHeight = String(preservedHeight);
                videoEl.classList.add("is-open");
                videoEl.style.display = "block";
                videoEl.style.opacity = "1";
              }
              const displayEl = this.container.getElement();
              if (displayEl) {
                displayEl.style.height = "0px";
                displayEl.style.minHeight = "0px";
                displayEl.style.margin = "0";
                displayEl.style.padding = "0";
                displayEl.style.opacity = "0";
                displayEl.style.display = "none";
                displayEl.classList.remove("is-open");
              }
            } else {
              let loaderDisplay = this.container
                .getElement()
                ?.querySelector(".gexp-intext-loader");
              if (!loaderDisplay && this.container.getElement()) {
                  const el = this.container.getElement();
                  el.insertAdjacentHTML('beforeend', '<div class="gexp-intext-loader"><div class="gexp-intext-spinner"></div><div class="gexp-intext-loader-text">Recuperando anuncio</div></div>');
                  loaderDisplay = el.querySelector(".gexp-intext-loader");
              }
              if (loaderDisplay) loaderDisplay.style.display = "flex";
              const activeEl = this.container.getElement();
              if (activeEl) {
                  const preservedHeight = this.node.getPreservedRefreshHeight(activeEl);
                  logIntext(
                    `[Intext:Display:${this.node.id}] display_refresh_preserved_height - height=${preservedHeight}`,
                  );
                  activeEl.style.height = preservedHeight + "px";
                  activeEl.style.minHeight = preservedHeight + "px";
                  activeEl.dataset.lockedHeight = String(preservedHeight);
                  activeEl.classList.add("is-open");
                  activeEl.style.display = "block";
                  activeEl.style.opacity = "1";
              }
            }
          }

          const isRefresh = trigger === "refresh";
          const effectiveMode = isRefresh
            ? this.config.refreshCycle?.mode || "display_only"
            : this.config.decision?.mode || "auto";

          this._effectiveMode = effectiveMode;

          logIntext(
            `%c[Intext:Slot:${this.node.id}:${this.node.id}] ═══ AUCTION START ═══`,
            "color:#2196F3;font-weight:bold",
          );
          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ Trigger:  ${trigger}`,
          );
          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ Mode:     ${effectiveMode}${isRefresh ? " (refresh cycle)" : ""}`,
          );

          const bidStrategy = isRefresh
            ? (this.config.refreshCycle?.bidStrategy || "fresh")
            : "fresh"; 

          if (isRefresh && bidStrategy !== "fresh") {
            const cached = this.getCachedBidsForMode(effectiveMode);
            if (cached && bidStrategy === "reuse") {
              logIntext(
                `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: REUSE (${cached.banner.length} banner, ${cached.video.length} video from cache, age: ${cached.ageMs}ms)`,
              );
              this._cachedBidsForDecision = cached;
              this._currentAuctionId = cached.auctionId;
              this.decideWinner();
              return;
            } else if (cached && bidStrategy === "compare") {
              logIntext(
                `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: COMPARE (will merge new bids with ${cached.banner.length + cached.video.length} cached, age: ${cached.ageMs}ms)`,
              );
              this._cachedBidsForDecision = cached;
            } else {
              logIntext(
                `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: ${bidStrategy.toUpperCase()} → no valid cache, falling back to FRESH`,
              );
              this._cachedBidsForDecision = null;
            }
          } else {
            this._cachedBidsForDecision = null;
            if (isRefresh) {
              logIntext(
                `[Intext:Slot:${this.node.id}] ├─ Bid Strategy: FRESH (new auction)`,
              );
            }
          }

          const prebidPromises = [];

          this.registerPrebidAliases();
          const multiConfig = this.getPrebidMultiFormatConfig();
          if (multiConfig) {
            const bannerBidders = multiConfig.bids.filter(b => !(this.config.prebid?.videoBidders || []).includes(b)).length;
            const videoBidders = (this.config.prebid?.videoBidders || []).length;
            const mediaTypesStr = Object.keys(multiConfig.mediaTypes).join("+");
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ Prebid MultiFormat: requesting (code: ${multiConfig.code}, ${multiConfig.bids.length} bidders, types: ${mediaTypesStr})`,
            );
            prebidPromises.push(this.executePrebid(multiConfig));
          } else {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ Prebid: SKIPPED (no config)`,
            );
          }

          logIntext(
            `[Intext:Slot:${this.node.id}] └─ ${prebidPromises.length} Prebid request(s)...`,
          );

          await Promise.all(prebidPromises);
          this.decideWinner();
        }

        executePrebid(configuration) {
          return new Promise((resolve) => {
            if (
              typeof window.pbjs === "undefined" ||
              typeof window.pbjs.requestBids === "undefined"
            ) {
              logIntext(
                `[Intext:Slot:${this.node.id}]   Prebid [${configuration.code}]: pbjs not available`,
              );
              resolve(null);
              return;
            }

            window.pbjs.que.push(() => {
              try {
              this.registerPrebidAdUnit(configuration);

              const _safetyTimer = setTimeout(() => {
                logIntext(`[Intext:Prebid] ⚠️ Safety timeout (${this.getPrebidTimeout() + 500}ms) — resolving to avoid blocking`);
                resolve(null);
              }, this.getPrebidTimeout() + 500);

              window.pbjs.requestBids({
                timeout: this.getPrebidTimeout(),
                adUnitCodes: [configuration.code],
                bidsBackHandler: (bidResponses, timedOut, auctionIdParam) => {
                  clearTimeout(_safetyTimer);
                  const resolveAuctionId = () => {
                    const raw = window.pbjs.getBidResponsesForAdUnitCode(configuration.code)?.bids || [];
                    let id = auctionIdParam;
                    if (!id && raw.length > 0) {
                      id = raw[raw.length - 1].auctionId;
                      logIntext(
                        `[Intext:Slot:${this.node.id}]   Prebid: auctionId extracted from bid objects: ${id?.substring(0,8)}`,
                      );
                    }
                    return id;
                  };

                  const finalize = (phase) => {
                    const auctionId = resolveAuctionId();
                    this._currentAuctionId = auctionId;

                    const allRaw = window.pbjs.getBidResponsesForAdUnitCode(configuration.code)?.bids || [];
                    const allResponses = auctionId
                      ? allRaw.filter(b => b.auctionId === auctionId)
                      : allRaw;
                    const bannerBids = allResponses.filter(b => b.mediaType === "banner");
                    const videoBids = allResponses.filter(b => b.mediaType === "video");

                    const phaseLabel = phase === "grace" ? " [after grace window]" : "";
                    logIntext(
                      `[Intext:Slot:${this.node.id}]   Prebid [${configuration.code}] auction=${auctionId?.substring(0,8) || 'unknown'}: ${allResponses.length} bid responses (${bannerBids.length} banner, ${videoBids.length} video)${timedOut ? ' [TIMED OUT]' : ''}${phaseLabel}`,
                    );
                    if (bannerBids.length > 0) {
                      const topBanner = bannerBids.sort((a, b) => b.cpm - a.cpm)[0];
                      logIntext(
                        `[Intext:Slot:${this.node.id}]     ├─ Best Banner: $${topBanner.cpm.toFixed(2)} from ${topBanner.bidderCode}`,
                      );
                      bannerBids.forEach(b => {
                        logIntext(
                          `[Intext:Slot:${this.node.id}]     │  └─ ${b.bidderCode}: $${b.cpm.toFixed(2)} (${b.mediaType})`,
                        );
                      });
                    }
                    if (videoBids.length > 0) {
                      const topVideo = videoBids.sort((a, b) => b.cpm - a.cpm)[0];
                      logIntext(
                        `[Intext:Slot:${this.node.id}]     ├─ Best Video:  $${topVideo.cpm.toFixed(2)} from ${topVideo.bidderCode}`,
                      );
                      videoBids.forEach(b => {
                        logIntext(
                          `[Intext:Slot:${this.node.id}]     │  └─ ${b.bidderCode}: $${b.cpm.toFixed(2)} (${b.mediaType})`,
                        );
                      });
                    }

                    try {
                      const noBids = window.pbjs.getNoBids?.() || [];
                      const relevantNoBids = auctionId
                        ? noBids.filter(nb => nb.adUnitCode === configuration.code && nb.auctionId === auctionId)
                        : noBids.filter(nb => nb.adUnitCode === configuration.code);
                      if (relevantNoBids.length > 0) {
                        logIntext(
                          `[Intext:Slot:${this.node.id}]     ├─ No-bids (${relevantNoBids.length}): ${relevantNoBids.map(nb => nb.bidder).join(', ')}`,
                        );
                      }
                    } catch (e) { /* getNoBids may not exist */ }

                    if (allResponses.length === 0) {
                      logIntext(
                        `[Intext:Slot:${this.node.id}]     └─ No bid responses received`,
                      );
                    }

                    window.pbjs.setTargetingForGPTAsync([configuration.code]);
                    resolve("prebid_done");
                  };

                  const graceMs = this.config.prebid?.graceMs ?? 300;
                  if (timedOut && graceMs > 0) {
                    const bidsAtTimeout = (window.pbjs.getBidResponsesForAdUnitCode(configuration.code)?.bids || []).length;
                    logIntext(
                      `[Intext:Slot:${this.node.id}]   Prebid: TIMED OUT with ${bidsAtTimeout} bids — waiting ${graceMs}ms grace window for late bids...`,
                    );
                    setTimeout(() => finalize("grace"), graceMs);
                  } else {
                    finalize("immediate");
                  }
                },
              });
              } catch(e) {
                logIntext(`[Intext:Prebid] ❌ Exception in pbjs.que — skipping Prebid:`, e);
                resolve(null);
              }
            });
          });
        }

        executeAmazonTam(configuration) {
          return new Promise((resolve) => {
            if (
              typeof window.apstag === "undefined" ||
              typeof window.apstag.fetchBids === "undefined"
            ) {
              logIntext(
                `[Intext:Slot:${this.node.id}]   TAM: apstag not available`,
              );
              resolve(null);
              return;
            }

            const _tamSafetyTimer = setTimeout(() => {
              logIntext(`[Intext:Slot:${this.node.id}]   TAM: ⚠️ safety timeout — resolving to avoid blocking`);
              resolve("tam_timeout");
            }, 2000);

            try {
              window.apstag.fetchBids(configuration, (bids) => {
                clearTimeout(_tamSafetyTimer);
                try {
                  if (bids && bids.length > 0) {
                    logIntext(
                      `[Intext:Slot:${this.node.id}]   TAM: ${bids.length} bid(s) received`,
                    );
                  } else {
                    logIntext(
                      `[Intext:Slot:${this.node.id}]   TAM: no bids`,
                    );
                  }
                  window.apstag.setDisplayBids();
                  resolve("tam_done");
                } catch (err) {
                  warnIntext(
                    `[Intext:Slot:${this.node.id}]   TAM: setDisplayBids failed`,
                    err,
                  );
                  resolve("tam_error");
                }
              });
            } catch (err) {
              clearTimeout(_tamSafetyTimer);
              logIntext(`[Intext:Slot:${this.node.id}]   TAM: ❌ fetchBids threw — skipping`, err);
              resolve("tam_error");
            }
          });
        }

        decideWinner() {
          const mode = this._effectiveMode;
          const code = this.getPrebidCode();

          let displayBid = null;
          let videoBid = null;

          const cached = this._cachedBidsForDecision;
          this._cachedBidsForDecision = null; // consume immediately
          const bidStrategy = this.config.refreshCycle?.bidStrategy || "fresh";
          const isReuseMode = cached && bidStrategy === "reuse";

          if (isReuseMode) {
            const bannerBids = cached.banner.sort((a, b) => b.cpm - a.cpm);
            const videoBids = cached.video.sort((a, b) => b.cpm - a.cpm);
            if (bannerBids.length > 0) { displayBid = bannerBids[0]; displayBid.source = "prebid_cached"; }
            if (videoBids.length > 0) { videoBid = videoBids[0]; videoBid.source = "prebid_cached"; }
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ Using CACHED bids only (${bannerBids.length} banner, ${videoBids.length} video, age: ${cached.ageMs}ms)`,
            );
          } else if (typeof window.pbjs !== "undefined") {
            const currentAuctionId = this._currentAuctionId;
            const allBids = (window.pbjs.getBidResponsesForAdUnitCode(code)?.bids || [])
              .filter(b => currentAuctionId ? b.auctionId === currentAuctionId : true);

            const seen = new Set();
            const uniqueBids = allBids.filter(b => {
              if (seen.has(b.adId)) return false;
              seen.add(b.adId);
              return true;
            });

            const totalBids = window.pbjs.getBidResponsesForAdUnitCode(code)?.bids?.length || 0;
            if (totalBids > uniqueBids.length) {
              logIntext(
                `[Intext:Slot:${this.node.id}] ├─ Bid filtering: ${totalBids} total, ${totalBids - uniqueBids.length} stale (from previous auctions), ${uniqueBids.length} current`,
              );
            }

            let bannerBids = uniqueBids
              .filter(b => b.mediaType === "banner")
              .sort((a, b) => b.cpm - a.cpm);
            let videoBids = uniqueBids
              .filter(b => b.mediaType === "video")
              .sort((a, b) => b.cpm - a.cpm);

            if (cached) {
              const cachedBanner = (cached.banner || []).filter(cb => cb.mediaType === "banner");
              const cachedVideo = (cached.video || []).filter(cb => cb.mediaType === "video");
              const freshBannerTop = bannerBids.length > 0 ? bannerBids[0].cpm : 0;
              const freshVideoTop = videoBids.length > 0 ? videoBids[0].cpm : 0;
              const cachedBannerTop = cachedBanner.length > 0 ? cachedBanner.sort((a,b) => b.cpm - a.cpm)[0].cpm : 0;
              const cachedVideoTop = cachedVideo.length > 0 ? cachedVideo.sort((a,b) => b.cpm - a.cpm)[0].cpm : 0;

              logIntext(
                `[Intext:Slot:${this.node.id}] ├─ COMPARE: fresh banner=$${freshBannerTop.toFixed(2)} vs cached=$${cachedBannerTop.toFixed(2)}, fresh video=$${freshVideoTop.toFixed(2)} vs cached=$${cachedVideoTop.toFixed(2)}`,
              );

              if (cachedBannerTop > freshBannerTop && cachedBanner.length > 0) {
                bannerBids = cachedBanner.sort((a, b) => b.cpm - a.cpm);
                logIntext(
                  `[Intext:Slot:${this.node.id}] │  └─ Using CACHED banner: $${cachedBannerTop.toFixed(2)} from ${bannerBids[0].bidderCode}`,
                );
              }
              if (cachedVideoTop > freshVideoTop && cachedVideo.length > 0) {
                videoBids = cachedVideo.sort((a, b) => b.cpm - a.cpm);
                logIntext(
                  `[Intext:Slot:${this.node.id}] │  └─ Using CACHED video: $${cachedVideoTop.toFixed(2)} from ${videoBids[0].bidderCode}`,
                );
              }
            }

            if (bannerBids.length > 0) {
              displayBid = bannerBids[0];
              displayBid.source = cached && bannerBids[0] === (cached.banner || []).sort((a,b) => b.cpm - a.cpm)[0]
                ? "prebid_cached" : "prebid";
            }
            if (videoBids.length > 0) {
              videoBid = videoBids[0];
              videoBid.source = cached && videoBids[0] === (cached.video || []).sort((a,b) => b.cpm - a.cpm)[0]
                ? "prebid_cached" : "prebid";
            }
          }

          if (mode === "display_only" && videoBid) {
              logIntext(`[Intext:Slot:${this.node.id}] ├─ Mode is ${mode}: discarding a ${videoBid.source} video bid ($${videoBid.cpm.toFixed(2)})`);
              videoBid = null;
          } else if (mode === "video_only" && displayBid) {
              logIntext(`[Intext:Slot:${this.node.id}] ├─ Mode is ${mode}: discarding a ${displayBid.source} display bid ($${displayBid.cpm.toFixed(2)})`);
              displayBid = null;
          }

          const dCPM = displayBid ? displayBid.cpm : 0;
          const vCPM = videoBid ? videoBid.cpm : 0;
          const minCpm = this.config.decision?.minCpm ?? 1.0;
          const priority = this.config.decision?.priorityBelowMin || "video";

          this._lastDisplayBid = displayBid;
          this._lastVideoBid = videoBid;
          if (!isReuseMode) {
            this._bidCache = {
              timestamp: Date.now(),
              auctionId: this._currentAuctionId,
              bannerBids: displayBid ? [displayBid] : [],
              videoBids: videoBid ? [videoBid] : [],
            };
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ Bid Cache: saved ${displayBid ? 1 : 0} banner + ${videoBid ? 1 : 0} video bids`,
            );
          }

          logIntext(
            `%c[Intext:Slot:${this.node.id}:${this.node.id}] ═══ PREBID COMPLETE ═══`,
            "color:#4CAF50;font-weight:bold",
          );
          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ Display CPM: ${displayBid ? "$" + dCPM.toFixed(2) + " from " + displayBid.bidderCode : "(no bid)"}`,
          );
          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ Video CPM:   ${videoBid ? "$" + vCPM.toFixed(2) + " from " + videoBid.bidderCode : "(no bid)"}`,
          );
          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ Min CPM:     $${minCpm.toFixed(2)}`,
          );
          logIntext(
            `[Intext:Slot:${this.node.id}] └─ Priority:    ${priority}`,
          );

          let winner = null;
          let reason = "";

          logIntext(
            `%c[Intext:Slot:${this.node.id}:${this.node.id}] ═══ DECISION (mode: ${mode}) ═══`,
            "color:#FF9800;font-weight:bold",
          );

          if (mode === "video_only") {
            winner = "video";
            reason = "mode=video_only → VIDEO (no fallback)";
          } else if (mode === "display_only") {
            winner = "display";
            reason = "mode=display_only → DISPLAY (no fallback)";
          } else {
            const displayAbove = dCPM >= minCpm;
            const videoAbove = vCPM >= minCpm;

            if (displayAbove && videoAbove) {
              winner = dCPM >= vCPM ? "display" : "video";
              reason = `BOTH above min ($${minCpm.toFixed(2)}) → highest CPM wins: ${winner.toUpperCase()} ($${winner === "display" ? dCPM.toFixed(2) : vCPM.toFixed(2)})`;
            } else if (displayAbove && !videoAbove) {
              winner = "display";
              reason = `ONLY display above min ($${dCPM.toFixed(2)} >= $${minCpm.toFixed(2)}) → DISPLAY`;
            } else if (videoAbove && !displayAbove) {
              winner = "video";
              reason = `ONLY video above min ($${vCPM.toFixed(2)} >= $${minCpm.toFixed(2)}) → VIDEO`;
            } else {
              if (priority === "video") {
                winner = "video";
                reason = `NEITHER above min → priority=${priority} → VIDEO`;
              } else if (priority === "display") {
                winner = "display";
                reason = `NEITHER above min → priority=${priority} → DISPLAY`;
              } else {
                winner = dCPM >= vCPM ? "display" : "video";
                reason = `NEITHER above min → priority=highest → ${winner.toUpperCase()} ($${winner === "display" ? dCPM.toFixed(2) : vCPM.toFixed(2)})`;
              }
            }
          }

          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ Rule: ${reason}`,
          );
          logIntext(
            `%c[Intext:Slot:${this.node.id}:${this.node.id}] ═══ WINNER: ${winner ? winner.toUpperCase() : "NONE"} ═══`,
            "color:#E91E63;font-weight:bold",
          );

          if (!winner) {
            this.node.closeAll();
            return;
          }

          const allowFallback = mode === "auto";
          const loser = winner === "video" ? "display" : "video";

          this.requestWinner(winner, loser, allowFallback);
        }

        async requestWinner(winner, loser, allowFallback) {
          logIntext(
            `%c[Intext:Slot:${this.node.id}:${this.node.id}] ═══ REQUEST PHASE: ${winner.toUpperCase()} ═══`,
            "color:#9C27B0;font-weight:bold",
          );
          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ Winner:   ${winner}`,
          );
          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ Fallback: ${allowFallback ? loser : "NONE (forced mode)"}`,
          );

          if (winner === "video") {
            const now = Date.now();
            this.node._videoTiming = {
              trigger: this.lastTrigger || "unknown",
              auctionStartAt: this._auctionStartAt || now,
              requestWinnerVideoAt: now,
            };
            logIntext(
              `[Intext:Video:${this.node.videoId}] timing auction_to_request_winner_video=${now - (this._auctionStartAt || now)}ms trigger=${this.lastTrigger || "unknown"}`,
            );
          }

          const success = await this._requestFormat(winner);

          if (success) {
            logIntext(
              `[Intext:Slot:${this.node.id}] ✅ ${winner.toUpperCase()} delivered successfully`,
            );
            return;
          }

          logIntext(
            `[Intext:Slot:${this.node.id}] ❌ ${winner.toUpperCase()} failed`,
          );

          if (!allowFallback) {
            logIntext(
              `[Intext:Slot:${this.node.id}] No fallback allowed (forced mode) — closing`,
            );
            this.node.closeAll();
            return;
          }

          logIntext(
            `%c[Intext:Slot:${this.node.id}:${this.node.id}] ═══ FALLBACK → ${loser.toUpperCase()} ═══`,
            "color:#FF5722;font-weight:bold",
          );
          const fallbackSuccess = await this._requestFormat(loser);

          if (fallbackSuccess) {
            logIntext(
              `[Intext:Slot:${this.node.id}] ✅ Fallback ${loser.toUpperCase()} delivered successfully`,
            );
          } else {
            logIntext(
              `[Intext:Slot:${this.node.id}] ❌ Fallback ${loser.toUpperCase()} also failed — closing`,
            );
            this.node.closeAll();
          }
        }

        async _requestFormat(format) {
          if (format === "display") {
            return await this._requestDisplay();
          } else {
            return await this._requestVideo();
          }
        }

        async _requestDisplay() {
          const tamConfig = this.getTAMConfiguration();
          if (tamConfig) {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ TAM Display: requesting...`,
            );
            await this.executeAmazonTam(tamConfig);
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ TAM Display: done`,
            );
          } else {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ TAM Display: SKIPPED`,
            );
          }

          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ GAM Display: requesting GPT slot...`,
          );
          const displayResult = await this.node.askDisplay(
            this._lastDisplayBid,
          );

          if (displayResult.filled) {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ GAM Display: FILL ✅ (size: ${JSON.stringify(displayResult.event?.size)})`,
            );
            this.node.showDisplay(displayResult);
            return true;
          } else {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ GAM Display: NO-FILL ❌`,
            );
            this.node.discardDisplay();
            return false;
          }
        }

        async _requestVideo() {
          const tamVideoConfig = this.getTAMVideoConfiguration();
          if (tamVideoConfig) {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ TAM Video: requesting...`,
            );
            await this.executeAmazonTam(tamVideoConfig);
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ TAM Video: done`,
            );
          } else {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ TAM Video: SKIPPED`,
            );
          }

          const gamVideoTagUrl = this.buildGAMVideoTagUrl();
          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ GAM Video: building player...`,
          );
          const videoPlayed = await this.node.buildAndPlayVideo(gamVideoTagUrl);
          if (videoPlayed) {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ GAM Video: FILL ✅ — playing`,
            );
            return true;
          } else {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ GAM Video: player build failed ❌`,
            );

            const vContainerEl = this.node.videoContainer.getElement();
            const isOpen = vContainerEl && vContainerEl.classList.contains("is-open");
            const vHeight = isOpen ? (vContainerEl.offsetHeight || 360) : (this.node.lockedHeight || 360);            
            
            if (isOpen) {
               // 2. We MUST prepare the Display container BEFORE destroying the Video container
               const dContainer = this.node.container;
               const dEl = this.node.container.getElement();
               if (dEl) {
                 dEl.style.transition = "none";
                 dEl.style.height = vHeight + "px";
                 dEl.style.minHeight = vHeight + "px";
                 dEl.style.opacity = "1";
                 dEl.style.display = "block";
                 dEl.classList.add("is-open");

                 dContainer.isOpen = true;
                 
                 const loader = dEl.querySelector(".gexp-intext-loader");
                 if (loader) loader.style.display = "flex";
               }
               
               vContainerEl.style.transition = "none";
               vContainerEl.style.display = "none";
               // 3. Now it is safe to remove the video container
               this.node.videoContainer.close({ destroy: true });
               
               // 4. Restore transitions for future updates
               if (dEl) {
                 requestAnimationFrame(() => {
                   dEl.style.transition = "";
                 });
               }
            } else {
               // If the video container never opened (e.g., failed before readyforpreroll),
               // just destroy it silently. The Display container will open naturally when filled.
               this.node.videoContainer.close({ destroy: true });
            }           

            return false;
          }
        }

        getTAMVideoConfiguration() {
          if (this.config.tam?.enabled === false) return null;
          const videoConfig = this.config.video;
          if (!videoConfig || !videoConfig.enabled) return null;

          const slotId = this.node.videoId;
          const slotName = this.getVideoAdUnitPath();
          const playerSize = videoConfig.playerSize || [640, 360];

          if (!slotId || !slotName) return null;

          return {
            slots: [
              {
                slotID: slotId,
                slotName: `/${this.gexp.cfg.networkId}/${slotName}`,
                mediaType: "video",
                sizes: [playerSize],
              },
            ],
          };
        }

        getPrebidMultiFormatConfig() {
          const code = this.getPrebidCode();
          const mode = this._effectiveMode;
          const mediaTypes = {};
          let allBids = [];

          // Banner (if mode allows display)
          if (mode === "auto" || mode === "display_only") {
            const sizes = this.getDisplaySizes();
            if (sizes.length) {
              mediaTypes.banner = { sizes };
              const networkId = this.node.manager.networkId;
              const prebidNetworks = this.config.prebid?.networks || {};
              const targetNetwork = prebidNetworks[networkId] || prebidNetworks.default || {};
              allBids = allBids.concat(targetNetwork.bidders || []);              
            }
          }

          if (mode === "auto" || mode === "video_only") {
            const vc = this.config.video;
            if (vc?.enabled) {
              mediaTypes.video = {
                context: vc.context || "instream",
                playerSize: vc.playerSize || [640, 360],
                mimes: vc.mimes || ["video/mp4", "application/javascript"],
                protocols: vc.protocols || [2, 3, 5, 6, 7],
                playbackmethod: vc.playbackmethod || [6],
                plcmt: vc.plcmt || 1,
                placement: vc.placement || 1,
                linearity: vc.linearity || 1,
                api: vc.api || [1, 2],
                maxduration: vc.maxduration || 30,
                minduration: vc.minduration || 1,
                ...(vc.battr ? { battr: vc.battr } : {}),
                ...(vc.skippable != null ? { skippable: vc.skippable } : {}),
                ...(vc.skip != null
                  ? { skip: vc.skip }
                  : vc.skippable === true
                    ? { skip: 1 }
                    : vc.skippable === false
                      ? { skip: 0 }
                      : {}),
              };
              const networkId = this.node.manager.networkId;
              const prebidNetworks = this.config.prebid?.networks || {};
              const targetNetwork = prebidNetworks[networkId] || prebidNetworks.default || {};
              const excludedVideoList = this.config.prebid?.excludedVideoBidders || [];
              const filteredVideoBidders = (targetNetwork.videoBidders || []).filter(
                (b) => !excludedVideoList.includes(b.bidder)
              );
              if (excludedVideoList.length) {
                logIntext(
                  `[Intext:Prebid] ⚠️ excludedVideoBidders active: [${excludedVideoList.join(", ")}] — filtered ${(targetNetwork.videoBidders || []).length - filteredVideoBidders.length} bidder(s)`
                );
              }
              allBids = allBids.concat(filteredVideoBidders);
            }
          }

          if (!Object.keys(mediaTypes).length || !allBids.length) return null;

          return {
            code,
            mediaTypes,
            bids: allBids,
            ortb2Imp: this.buildOrtb2Imp(code),
          };
        }

        buildOrtb2Imp(adUnitCode, adUnitPathOverride) {
          const networkId = this.gexp.cfg.networkId || "99071977";
          const adUnitPath =
            adUnitPathOverride || this.node.manager.adUnitPath || "";
          const fullAdSlot = `/${networkId}/${adUnitPath}`;
          const pbadslot = `${fullAdSlot}#${adUnitCode}`;

          return {
            ext: {
              data: {
                adserver: {
                  name: "gam",
                  adslot: fullAdSlot,
                },
              },
              gpid: pbadslot,
            },
          };
        }

        getTAMConfiguration() {
          if (this.config.tam?.enabled === false) return null;
          const slotId = this.node.id;
          const slotName = this.node.manager.adUnitPath || "";
          const sizes = this.getDisplaySizes().filter(
            (s) => s !== "fluid" && s[0] > 1,
          );

          if (!slotId || !slotName || !sizes.length) return null;

          return {
            slots: [
              {
                slotID: slotId,
                slotName: `/${this.node.manager.networkId}/${slotName}`,
                sizes: sizes,
              },
            ],
          };
        }

        normalizeTargetingMap(targeting) {
          const normalized = {};
          if (!targeting) return normalized;

          if (Array.isArray(targeting)) {
            targeting.forEach((entry) => {
              const key = entry?.key;
              const value = entry?.value;
              if (!key || value == null || value === "") return;
              normalized[key] = Array.isArray(value) ? value.join(",") : String(value);
            });
            return normalized;
          }

          if (typeof targeting === "object") {
            Object.entries(targeting).forEach(([key, value]) => {
              if (!key || value == null || value === "") return;
              normalized[key] = Array.isArray(value) ? value.join(",") : String(value);
            });
          }

          return normalized;
        }

        getIntextVideoBidDiagnostics(bid) {
          const targetingFromBid = this.normalizeTargetingMap(bid?.adserverTargeting);
          let targetingFromPbjs = {};
          try {
            const code = this.getPrebidCode();
            if (Object.keys(targetingFromBid).length === 0 && window.pbjs?.getAdserverTargetingForAdUnitCode && code) {
              targetingFromPbjs = this.normalizeTargetingMap(
                window.pbjs.getAdserverTargetingForAdUnitCode(code),
              );
            }
          } catch (err) {}

          const targeting = { ...targetingFromPbjs, ...targetingFromBid };
          const videoCacheKey =
            bid?.videoCacheKey ||
            bid?.cacheId ||
            bid?.vastCacheKey ||
            targeting.hb_uuid ||
            targeting.hb_cache_id ||
            null;

          if (!targeting.hb_uuid && videoCacheKey) targeting.hb_uuid = String(videoCacheKey);
          if (!targeting.hb_cache_id && videoCacheKey) targeting.hb_cache_id = String(videoCacheKey);
          if (!targeting.hb_cache_host && bid?.hb_cache_host) targeting.hb_cache_host = String(bid.hb_cache_host);
          if (!targeting.hb_cache_path && bid?.hb_cache_path) targeting.hb_cache_path = String(bid.hb_cache_path);
          if (!targeting.hb_pb) {
            const pb = bid?.pbCg || bid?.pbAg || bid?.pbHg || bid?.pbDg || bid?.pbLg || bid?.pbMg || null;
            if (pb != null) targeting.hb_pb = String(pb);
          }
          if (!targeting.hb_bidder && bid?.bidderCode) targeting.hb_bidder = String(bid.bidderCode);
          if (!targeting.hb_format) targeting.hb_format = "video";
          if (!targeting.hb_adid && bid?.adId) targeting.hb_adid = String(bid.adId);

          return {
            targeting,
            targetingSource: Object.keys(targetingFromBid).length
              ? "bid.adserverTargeting"
              : Object.keys(targetingFromPbjs).length
                ? "pbjs.getAdserverTargetingForAdUnitCode"
                : "fallback_fields",
            targetingKeysPresent: Object.keys(targeting).filter(Boolean).sort(),
            videoCacheKey: videoCacheKey || null,
            cacheSignals: {
              hb_uuid: targeting.hb_uuid || null,
              hb_cache_id: targeting.hb_cache_id || null,
              hb_cache_host: targeting.hb_cache_host || null,
              hb_cache_path: targeting.hb_cache_path || null,
            },
            hasCacheSignal: Boolean(
              videoCacheKey ||
              targeting.hb_uuid ||
              targeting.hb_cache_id ||
              targeting.hb_cache_host ||
              targeting.hb_cache_path
            ),
          };
        }

        buildGAMVideoTagUrl() {
          const networkId = this.node.manager.networkId;
          const adUnitPath = this.getVideoAdUnitPath();
          const videoId = this.node.videoId;

          let custParts = ["intext=true"];
          if (this.node.navIndex) {
              custParts.push(`gexp-intext-navcont=${encodeURIComponent(this.node.navIndex)}`);
          }

          if (window.pbjs && this._lastVideoBid) {
            const bid = this._lastVideoBid;
            if (bid.source && bid.source.includes("prebid")) {
              const diagnostics = this.getIntextVideoBidDiagnostics(bid);
              const targeting = diagnostics.targeting;
              const pb = targeting.hb_pb || bid.pbCg || bid.pbAg || bid.pbHg || String(bid.cpm);

              logIntext(`[Intext:Auction:${this.node.id}] intext_video_bid_targeting_detected`, {
                bidderCode: bid.bidderCode || null,
                adId: bid.adId || null,
                targetingSource: diagnostics.targetingSource,
                targetingKeysPresent: diagnostics.targetingKeysPresent,
              });
              logIntext(`[Intext:Auction:${this.node.id}] intext_video_bid_cache_detected`, {
                bidderCode: bid.bidderCode || null,
                adId: bid.adId || null,
                videoCacheKey: diagnostics.videoCacheKey,
                cacheSignals: diagnostics.cacheSignals,
              });
              if (!diagnostics.hasCacheSignal) {
                warnIntext(`[Intext:Auction:${this.node.id}] intext_video_bid_missing_cache_signal`, {
                  bidderCode: bid.bidderCode || null,
                  adId: bid.adId || null,
                  targetingSource: diagnostics.targetingSource,
                  targetingKeysPresent: diagnostics.targetingKeysPresent,
                });
              }

              custParts.push(`hb_pb=${encodeURIComponent(pb)}`);
              if (targeting.hb_bidder) {
                custParts.push(`hb_bidder=${encodeURIComponent(targeting.hb_bidder)}`);
              }
              if (targeting.hb_format) {
                custParts.push(`hb_format=${encodeURIComponent(targeting.hb_format)}`);
              }
              if (targeting.hb_adid) {
                custParts.push(`hb_adid=${encodeURIComponent(targeting.hb_adid)}`);
              }
              if (targeting.hb_uuid) {
                custParts.push(`hb_uuid=${encodeURIComponent(targeting.hb_uuid)}`);
              }
              if (targeting.hb_cache_id) {
                custParts.push(`hb_cache_id=${encodeURIComponent(targeting.hb_cache_id)}`);
              }
              if (targeting.hb_cache_host) {
                custParts.push(`hb_cache_host=${encodeURIComponent(targeting.hb_cache_host)}`);
              }
              if (targeting.hb_cache_path) {
                custParts.push(`hb_cache_path=${encodeURIComponent(targeting.hb_cache_path)}`);
              }

              const aliasKey = bid.bidderCode.length > 20 ? bid.bidderCode.substring(0, 20) : bid.bidderCode;
              custParts.push(`hb_pb_${aliasKey}=${encodeURIComponent(pb)}`);
              custParts.push(`hb_bidder_${aliasKey}=${encodeURIComponent(bid.bidderCode)}`);
              custParts.push(`hb_format_${aliasKey}=video`);

              logIntext(`[Intext:Auction:${this.node.id}] intext_video_gam_targeting_payload`, {
                hb_pb: pb,
                hb_bidder: targeting.hb_bidder || null,
                hb_format: targeting.hb_format || null,
                hb_adid: targeting.hb_adid || null,
                hb_uuid: targeting.hb_uuid || null,
                hb_cache_id: targeting.hb_cache_id || null,
                hb_cache_host: targeting.hb_cache_host || null,
                hb_cache_path: targeting.hb_cache_path || null,
              });
            }
          }

          if (window.apstag && window.apstag.targetingKeys) {
            const tamKeys = window.apstag.targetingKeys();
            if (tamKeys && tamKeys[videoId]) {
              Object.entries(tamKeys[videoId]).forEach(([k, v]) => {
                const val = Array.isArray(v) ? v.join(",") : v;
                custParts.push(
                  `${encodeURIComponent(k)}=${encodeURIComponent(val)}`,
                );
              });
            }
          }

          try {
            const gexp = this.gexp;
            custParts.push(`random1=${gexp.getRandom(1)}`);
            custParts.push(`random2=${gexp.getRandom(2)}`);
            custParts.push(`tlm=${gexp.statsG?.telp ? "1" : "0"}`);
            custParts.push(`tlm_id=${gexp.statsG?.telId || ""}`);
            const nvis =
              gexp.statsG?.dailyStorageInstance?.get("nVisits") || "0";
            custParts.push(`nvis=${nvis}`);
          } catch (e) {
            /* ignore */
          }

          const custParams = custParts.join("&");

          const params = new URLSearchParams({
            iu: `/${networkId}/${adUnitPath}`,
            vpos: "preroll",
            sz: "640x360",
            gdfp_req: "1",
            env: "vp",
            output: "xml_vast4",
            unviewed_position_start: "1",
            ad_rule: "0",
            plcmt: "1",
            vpmute: "1",
            vpa: "auto",
            url: window.location.href,
            description_url: window.location.href,
            correlator: String(Date.now()),
            cust_params: custParams,
          });

          const url = `https://securepubads.g.doubleclick.net/gampad/ads?${params.toString()}`;
          logIntext(
            `[Intext:Waterfall:${this.node.id}] GAM video tag built. iu=/${networkId}/${adUnitPath}, cust_params: ${custParams}`,
          );
          return url;
        }

        getVideoAdUnitPath() {
          const basePath = this.node.manager.adUnitPath || "";
          const parts = basePath.split("/");
          if (parts.length > 0) {
            parts[parts.length - 1] = "video-intext";
          }
          return parts.join("/");
        }

        registerPrebidAdUnit(configuration) {
          const pb = window.pbjs;
          if (!pb) return;
          
          try {
            pb.markWinningBidAsUsed({ adUnitCode: configuration.code });
          } catch (e) { /* ignore if no winning bid */ }
          try {
            googletag.cmd.push(() => {
              const gptSlots = googletag.pubads().getSlots();
              gptSlots.forEach(slot => {
                if (slot.getSlotElementId() === configuration.code ||
                    slot.getSlotElementId()?.startsWith('gexp-intext')) {
                  const tMap = slot.getTargetingMap();
                  Object.keys(tMap).forEach(key => {
                    if (key.startsWith('hb_')) {
                      slot.clearTargeting(key);
                    }
                  });
                }
              });
            });
          } catch (e) { /* ignore */ }

          pb.removeAdUnit(configuration.code);
          pb.addAdUnits([configuration]);
        }

        registerPrebidAliases() {
          if (this._aliasesRegistered) return;
          this._aliasesRegistered = true;

          const networkId = this.gexp.cfg.networkId;
          const prebidNetworks = this.config.prebid?.networks || {};
          const targetNetwork = prebidNetworks[networkId] || prebidNetworks.default || {};
          const aliases = targetNetwork.aliases;
          if (!aliases || !window.pbjs) return;

          window.pbjs.que.push(() => {
            try {
              const gvlMapping = {
                rubicon: 52,
                appnexus: 32,
                criteo: 91,
                pubmatic: 76,
                smartadserver: 45,
                ix: 10,
                ttd: 21,
                teads: 132
              };
              for (const [alias, original] of Object.entries(aliases)) {
                if (typeof window.pbjs.aliasBidder === "function") {
                  if (gvlMapping[original]) {
                    window.pbjs.aliasBidder(original, alias, { gvlid: gvlMapping[original] });
                  } else {
                    window.pbjs.aliasBidder(original, alias);
                  }
                }
              }
              logIntext(`[Intext:Prebid] Configured bidder aliases via pbjs.aliasBidder`, aliases);
            } catch (e) {
              warnIntext(`[Intext:Prebid] Failed to configure aliases:`, e);
            }
          });
        }

        getPrebidCode() {
          return this.node.id;
        }

        getPrebidTimeout() {
          return this.config.prebid?.timeoutMs || 1000;
        }

        getCachedBidsForMode(mode) {
          const cache = this._bidCache;
          if (!cache || !cache.timestamp) return null;

          const maxAge = this.config.refreshCycle?.bidMaxAgeMs ?? 30000;
          const ageMs = Date.now() - cache.timestamp;

          if (ageMs > maxAge) {
            logIntext(
              `[Intext:Slot:${this.node.id}]   Bid Cache: expired (age: ${Math.round(ageMs / 1000)}s > max: ${Math.round(maxAge / 1000)}s)`,
            );
            return null;
          }

          let banner = [];
          let video = [];

          if (mode === "display_only") {
            banner = cache.bannerBids || [];
          } else if (mode === "video_only") {
            video = cache.videoBids || [];
          } else {
            banner = cache.bannerBids || [];
            video = cache.videoBids || [];
          }

          if (banner.length === 0 && video.length === 0) {
            logIntext(
              `[Intext:Slot:${this.node.id}]   Bid Cache: no compatible bids for mode=${mode}`,
            );
            return null;
          }

          return { banner, video, ageMs: Math.round(ageMs), auctionId: cache.auctionId };
        }

        getDisplaySizes() {
          const sizes = this.config.display?.sizes;
          if (Array.isArray(sizes) && sizes.length) return sizes;
          return [[300, 250]];
        }
      }

      class IntextVideoCreative {
        constructor({ container, adTagUrl, bid, node, config, onVideoEnded, videoTiming }) {
          this.container = container;
          this.adTagUrl = adTagUrl || null;
          this.bid = bid || null;
          this.node = node;
          this.config = config;
          this.onVideoEnded = onVideoEnded || null;
          this.playerId = `gexp-intext-video-${Date.now()}-${Math.random().toString(36).slice(2)}`;
          this.player = null;
          this.spinnerHidden = false;
          this._aborted = false;
          this._settle = null;
          this._playerRevealed = false;
          this._videoEndHandled = false;
          this._videoTiming = videoTiming || null;
        }

        async render() {
          await this.ensureDependencies();
          this.createVideoElement();
          this.initVideoJS();
          const loader = this.container.getElement().querySelector(".gexp-intext-loader");
          this.container.getElement().style.position = "relative";
          if (loader) {
            loader.style.width = "100%";
            loader.style.height = "100%";
            loader.style.top = "0";
            loader.style.left = "0";
            loader.style.transform = "none";
            loader.style.background = "#f7f7f7";
            loader.style.position = "absolute";
            loader.style.zIndex = "999";
            loader.style.pointerEvents = "auto";
            loader.style.display = "flex";
          }
          this.attachPlayerEvents();
          await this.requestAds();
        }

        async ensureDependencies() {
          const VideoAssetLoader = {
            loadScript(src) {
              return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                  resolve();
                  return;
                }
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
              });
            },
            loadCSS(href) {
              if (document.querySelector(`link[href="${href}"]`)) return;
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = href;
              document.head.appendChild(link);
            },
          };

          VideoAssetLoader.loadCSS(
            "https://vjs.zencdn.net/7.20.3/video-js.css",
          );
          VideoAssetLoader.loadCSS(
            "https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/6.9.0/videojs-contrib-ads.css",
          );
          VideoAssetLoader.loadCSS(
            "https://cdnjs.cloudflare.com/ajax/libs/videojs-ima/1.11.0/videojs.ima.css",
          );

          if (!window.videojs) {
            await VideoAssetLoader.loadScript(
              "https://vjs.zencdn.net/7.20.3/video.min.js",
            );
          }
          await VideoAssetLoader.loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/6.9.0/videojs-contrib-ads.min.js",
          );
          // IMA SDK is a prerequisite for videojs-ima
          if (!window.google?.ima) {
            await VideoAssetLoader.loadScript(
              "https://imasdk.googleapis.com/js/sdkloader/ima3.js",
            );
          }
          await VideoAssetLoader.loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/videojs-ima/1.11.0/videojs.ima.min.js",
          );
        }

        createVideoElement() {
          const el = document.createElement("video");
          el.id = this.playerId;
          el.className = "video-js vjs-default-skin vjs-big-play-centered";
          el.setAttribute("playsinline", "true");
          el.setAttribute("webkit-playsinline", "true");
          el.setAttribute("muted", "");
          el.muted = true;
          const sourceEl = document.createElement("source");
          sourceEl.src =
            "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAABqhtb292AAAAbG12aGQAAAAA3WwLtt1sC7YAAAPoAAAAqgABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAGGlvZHMAAAAAEID/AABEAAAn1QAAAAAABNN0cmFrAAAAXHRraGQAAAAD3WwLtt1sC7YAAAABAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAHgAAABIAAAAAAAMtbWRpYQAAACBtZGhkAAAAAN1sC7bdbAu2AAAD6AAAAKpxAAQAAAAAAAFoZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAittaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAIIc3RibAAAAGRzdHNkAAAAAAAAAAEAAABQVmF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAHgASAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwH0AAr/4QAYZ/QACq609NQYBBmQAAADAAQAAAMANI8WLkgAAAAQZ2QACqwOQAAAAAAAEHN0dHMAAAAAAAAAAQAAAAEAAACqAAAAFHN0c3MAAAAAAAAAAQAAAAEAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAAEwAAAAEAAAAUc3RjbwAAAAAAAAABAAAALAAAAGR1dHRhAAAAWG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAK2lsc3QAAAAjqXRvbwAAABtkYXRhAAAAAQAAAABBcHBsZSBWdWxjYW4A";
          sourceEl.type = "video/mp4";
          el.appendChild(sourceEl);

          el.style.width = "100%";
          el.style.height = "350px";
          el.style.objectFit = "contain";

          this.container.getElement().appendChild(el);
          this.videoEl = el;
        }

        initVideoJS() {
          if (typeof window.videojs === "undefined") return;

          this.player = window.videojs(this.videoEl, {
            controls: true,
            autoplay: false,
            muted: true,
            fluid: false,
            width: 640,
            height: 360,
            controlBar: { fullscreenToggle: false },
            errorDisplay: false,
          });

          this.player.on("error", () => {
            const err = this.player.error();
            if (err && err.code === 4) {
              logIntext(
                "[Intext:VideoJS] Ignored expected dummy source MEDIA_ERR_SRC_NOT_SUPPORTED",
              );
              const errDisplay =
                this.videoEl.parentElement.querySelector(".vjs-error-display");
              if (errDisplay) errDisplay.style.display = "none";
            }
          });
        }

        attachPlayerEvents() {
          if (!this.player) return;
          this.player.on("adend", () => {
            logIntext(
              `[Intext:VideoPlayer:${this.playerId}] Ad playback ended`,
            );
            if (!this._playerRevealed) {
              logIntext(
                `[Intext:VideoPlayer:${this.playerId}] adend_before_reveal - requestAds will handle terminal fallback`,
              );
              return;
            }
            if (this._videoEndHandled) {
              return;
            }
            this._videoEndHandled = true;
            this.node.recordTelemetry("video_end");
            if (this.onVideoEnded) {
              this.onVideoEnded();
            } else {
              this.destroy();
              this.container.close({ destroy: true });
            }
          });
        }

        requestAds() {
          return new Promise((resolve, reject) => {
            if (!this.player) {
              errorIntext(`[Intext:Video:IMA] No player instance`);
              reject(new Error("no_player"));
              return;
            }

            const useAdsResponse = !!this.vastXml;
            const adTag = useAdsResponse ? null : this.getVideoTagUrl();

            if (!useAdsResponse && !adTag) {
              errorIntext(`[Intext:Video:IMA] No ad tag URL or VAST XML`);
              reject(new Error("missing_vast_tag"));
              return;
            }

            if (useAdsResponse) {
              logIntext(
                `[Intext:Video:IMA] 🎬 Using adsResponse (prefetched VAST, ${this.vastXml.length} chars)`,
              );
            } else {
              logIntext(`[Intext:Video:IMA] 🎬 Full VAST tag URL:\n${adTag}`);
            }

            if (this._aborted) {
              logIntext(
                `[Intext:Video:IMA] 🛑 Already aborted before requestAds — rejecting`,
              );
              reject(new Error("display_won_abort"));
              return;
            }

            let settled = false;
            let adStarted = false;
            let firstFramePlayed = false;
            let terminalEvent = null;
            let terminalHandled = false;
            let adTimeout = null;
            let adstartGraceTimer = null;
            let adstartAt = null;
            let nativeAdError = null;

            const clearAdTimeout = () => {
              if (!adTimeout) return;
              clearTimeout(adTimeout);
              adTimeout = null;
            };
            const clearAdstartGraceTimer = () => {
              if (!adstartGraceTimer) return;
              clearTimeout(adstartGraceTimer);
              adstartGraceTimer = null;
            };
            const settle = (type, value) => {
              if (settled) return;
              settled = true;
              clearAdTimeout();
              clearAdstartGraceTimer();
              if (type === "resolve") resolve(value);
              else reject(value);
            };
            const markTerminal = (source) => {
              if (terminalHandled) return false;
              terminalHandled = true;
              terminalEvent = source;
              clearAdTimeout();
              if (adstartGraceTimer) {
                logIntext(
                  `[Intext:Video:IMA] adstart_grace_cancelled_by_terminal - terminal=${source}`,
                );
              }
              clearAdstartGraceTimer();
              return true;
            };
            this._settle = settle;

            adTimeout = setTimeout(() => {
              terminalHandled = true;
              terminalEvent = "video_ad_timeout";
              logIntext(
                `[Intext:Video:IMA] timeout_without_terminal_event - rejecting as video_ad_timeout`,
              );
              settle("reject", new Error("video_ad_timeout"));
            }, 25000);

            const revealPlayer = (source = "unknown") => {
              if (firstFramePlayed || terminalEvent) return;
              firstFramePlayed = true;
              this._playerRevealed = true;
              if (adstartAt) {
                logIntext(
                  `[Intext:Video:${this.playerId}] timing adstart_to_reveal=${Date.now() - adstartAt}ms source=${source} trigger=${this._videoTiming?.trigger || "unknown"}`,
                );
              }
              if (source === "ima_started") {
                logIntext(`[Intext:Video:IMA] ima_started - revealing player on native STARTED`);
              } else if (source === "timeupdate") {
                logIntext(`[Intext:Video:IMA] timeupdate_started - revealing player after currentTime > 0`);
              } else {
                logIntext(`[Intext:Video:IMA] 🎬 Playback confirmado por ${source}. Mostrando player.`);
              }
              this.hideSpinner();
              const el = this.node.videoContainer.getElement();
              this.node.videoContainer.open(this.node.lockedHeight || 360);
              if (el) {
                el.classList.add("video-started");
                el.style.opacity = "1";
              }
              settle("resolve");
            };

            const rejectBeforePlayback = (error, terminalSource) => {
              if (terminalSource && !markTerminal(terminalSource)) return;
              if (firstFramePlayed) return;
              settle("reject", error);
              setTimeout(() => {
                try { this.destroy(); } catch (e) { /* ignore */ }
              }, 50);
            };

            const handleTerminalBeforeReveal = (source, error) => {
              if (terminalHandled) return;
              if (firstFramePlayed) {
                markTerminal(source);
                return;
              }
              if (
                source === "adend" ||
                source === "alladscompleted" ||
                source === "native_complete" ||
                source === "native_skipped"
              ) {
                logIntext(
                  `[Intext:Video:IMA] adend_before_reveal - terminal event ${source} arrived before playback confirmation`,
                );
              }
              rejectBeforePlayback(error, source);
            };

            this.player.on("readyforpreroll", () => {
              logIntext(`[Intext:Video:IMA] 🎯 readyforpreroll — anuncio preparado.`);
              logIntext(`[Intext:Video:IMA] readyforpreroll: anuncio preparado, contenedor oculto hasta playback real.`);
            });

            this.player.on("adstart", () => {
              logIntext(`[Intext:Video:IMA] ✅ adstart — Arrancando...`);
              adStarted = true;
              adstartAt = Date.now();
              if (this._videoTiming?.requestWinnerVideoAt) {
                logIntext(
                  `[Intext:Video:${this.playerId}] timing request_winner_video_to_adstart=${adstartAt - this._videoTiming.requestWinnerVideoAt}ms trigger=${this._videoTiming?.trigger || "unknown"}`,
                );
              }
              clearAdstartGraceTimer();
              logIntext(`[Intext:Video:IMA] adstart_grace_started - waiting 200ms before pragmatic reveal`);
              adstartGraceTimer = setTimeout(() => {
                adstartGraceTimer = null;
                if (terminalEvent || terminalHandled) {
                  logIntext(
                    `[Intext:Video:IMA] adstart_grace_cancelled_by_terminal - terminal=${terminalEvent || "unknown"}`,
                  );
                  return;
                }
                if (firstFramePlayed || this._playerRevealed || this._aborted || !this.player) {
                  return;
                }
                logIntext(`[Intext:Video:IMA] adstart_grace_reveal - no early terminal after grace window`);
                revealPlayer("adstart_grace");
              }, 200);

              setTimeout(() => {
                if (
                  adStarted &&
                  !firstFramePlayed &&
                  !terminalEvent &&
                  !this._aborted &&
                  this.player &&
                  typeof this.player.currentTime === "function" &&
                  this.player.currentTime() > 0
                ) {
                  logIntext(`[Intext:Video:IMA] ⏱ Confirmación diferida tras adstart con currentTime > 0`);
                  revealPlayer("adstart+currentTime");
                }
              }, 800);
            });

            this.player.on("timeupdate", () => {
              if (adStarted && !firstFramePlayed && !terminalEvent && !this.spinnerHidden) {
                if (this.player.currentTime() > 0) revealPlayer("timeupdate");
              }
            });

            this.player.on("adserror", (evt) => {
              const imaErr = evt?.data?.AdError;
              const errCode = imaErr?.getErrorCode?.() || nativeAdError?.code || "unknown";
              const errMsg = imaErr?.getMessage?.() || nativeAdError?.message || "unknown";

              logIntext(`[Intext:Video:IMA] player_adserror - code: ${errCode}, msg: ${errMsg}`);

              if (!firstFramePlayed) {
                 rejectBeforePlayback(new Error(`video_ad_error: [${errCode}] ${errMsg}`), "adserror");
              } else {
                markTerminal("adserror");
              }

              if (errCode === 901 || errCode === 400 || errCode === 1009) {
                logIntext(`[Intext:Video:IMA] Error previo al primer frame, manteniendo fallo silencioso.`);
              }
            });

            this.player.on("ads-request", () =>
              logIntext(
                `[Intext:Video:IMA] 📤 ads-request — IMA processing ad request`,
              ),
            );
            this.player.on("ads-load", () =>
              logIntext(
                `[Intext:Video:IMA] 📥 ads-load — VAST response parsed by IMA`,
              ),
            );
            this.player.on("nopreroll", () => {
              logIntext(
                `[Intext:Video:IMA] 📭 nopreroll — IMA says no preroll available`,
              );
            });
            this.player.on("adtimeout", () => {
              logIntext(
                `[Intext:Video:IMA] ⏱ adtimeout — contrib-ads internal timeout`,
              );
              rejectBeforePlayback(new Error("contrib_ads_timeout"), "adtimeout");
            });
            this.player.on("adend", () => {
              handleTerminalBeforeReveal(
                "adend",
                new Error("video_ad_ended_before_reveal"),
              );
            });
            this.player.on("alladscompleted", () => {
              handleTerminalBeforeReveal(
                "alladscompleted",
                new Error("video_ad_ended_before_reveal"),
              );
            });
            this.player.on("readyforpreroll", () =>
              logIntext(
                `[Intext:Video:IMA] 🎯 readyforpreroll — player ready for ad playback`,
              ),
            );

            this.player.ready(() => {
              try {
                logIntext(
                  `[Intext:Video:IMA] 🔧 Player ready — initializing IMA plugin...`,
                );

                if (window.google && window.google.ima && window.google.ima.settings) {
                  window.google.ima.settings.setVpaidMode(window.google.ima.ImaSdkSettings.VpaidMode.INSECURE);
                }

                const options = {
                  id: this.playerId,
                  showCountdown: true,
                  vpaidMode: (window.google && window.google.ima && window.google.ima.ImaSdkSettings)
                             ? window.google.ima.ImaSdkSettings.VpaidMode.INSECURE
                             : "insecure",
                  autoPlayAdBreaks: true,
                  debug: true,
                  timeout: 30000,
                  prerollTimeout: 30000,
                  postrollTimeout: 30000,
                  adTagUrl: adTag
                };

                this.player.ima(options);
                logIntext(`[Intext:Video:IMA] ✔ IMA plugin initialized`);

                try {
                  const ima = window.google.ima;
                  if (
                    this.player.ima.addEventListener &&
                    ima &&
                    ima.AdEvent &&
                    ima.AdErrorEvent
                  ) {
                    this.player.ima.addEventListener(
                      ima.AdErrorEvent.Type.AD_ERROR,
                      (event) => {
                        const err = event.getError();
                        nativeAdError = {
                          code: err?.getErrorCode?.(),
                          message: err?.getMessage?.(),
                          vastCode: err?.getVastErrorCode?.(),
                        };
                        logIntext(
                          `[Intext:Video:IMA:Native] native_ad_error - code=${err?.getErrorCode?.()}, msg=${err?.getMessage?.()}, vast=${err?.getVastErrorCode?.()}`,
                        );
                        if (!firstFramePlayed) {
                          rejectBeforePlayback(
                            new Error(`video_ad_error: [${err?.getErrorCode?.() || "unknown"}] ${err?.getMessage?.() || "unknown"}`),
                            "native_ad_error",
                          );
                        } else {
                          markTerminal("native_ad_error");
                        }
                      },
                    );
                    this.player.ima.addEventListener(
                      ima.AdEvent.Type.LOADED,
                      () => {
                        logIntext(
                          `[Intext:Video:IMA:Native] 📥 LOADED event fired`,
                        );
                      },
                    );
                    this.player.ima.addEventListener(
                      ima.AdEvent.Type.STARTED,
                      () => {
                        logIntext(
                          `[Intext:Video:IMA:Native] native started - STARTED event fired`,
                        );
                        revealPlayer("ima_started");
                      },
                    );
                    this.player.ima.addEventListener(
                      ima.AdEvent.Type.COMPLETE,
                      () => {
                        handleTerminalBeforeReveal(
                          "native_complete",
                          new Error("video_ad_ended_before_reveal"),
                        );
                      },
                    );
                    this.player.ima.addEventListener(
                      ima.AdEvent.Type.SKIPPED,
                      () => {
                        handleTerminalBeforeReveal(
                          "native_skipped",
                          new Error("video_ad_ended_before_reveal"),
                        );
                      },
                    );
                  }
                } catch (e) {
                  warnIntext(
                    "[Intext:Video:IMA] Could not attach native IMA listeners",
                    e,
                  );
                }

                this.player.ima.initializeAdDisplayContainer();
                logIntext(
                  `[Intext:Video:IMA] ✔ AdDisplayContainer initialized`,
                );
                const playPromise = this.player.play();
                logIntext(`[Intext:Video:IMA] ▶ player.play() called`);
                if (playPromise !== undefined && playPromise.catch) {
                  playPromise.catch((e) => {
                    warnIntext(
                      `[Intext:Video:IMA] ▶ player.play() rejected (may be expected as IMA intercepts):`,
                      e,
                    );
                  });
                }
              } catch (err) {
                errorIntext(
                  `[Intext:Video:IMA] 💥 IMA initialization error:`,
                  err,
                );
                settle("reject", err);
              }
            });
          });
        }

        getVideoTagUrl() {
          if (this.adTagUrl) return this.adTagUrl;
          return (
            this.bid?.vastUrl || this.bid?.adTag || this.bid?.vastXml || ""
          );
        }

        hideSpinner() {
          if (this.spinnerHidden) return;
          const loader = this.container
            .getElement()
            .querySelector(".gexp-intext-loader");
          if (loader) loader.style.display = "none";
          this.spinnerHidden = true;
        }

        abort() {
          this._aborted = true;
          logIntext(
            `[Intext:Video:IMA] 🛑 abort() — display won, cancelling video path`,
          );
          this._settle?.("reject", new Error("display_won_abort"));
        }

        destroy() {
          try {
            this.player?.dispose?.();
          } catch (err) {
            // ignore
          }
        }
      }
      const INIMAGE_STYLE_ID = "gexp-inimage-styles";
      const INIMAGE_BASE_STYLES = `
        .gexp-inimage-shell {
            position: absolute;
            bottom: 12px;
            right: 12px;
            width: 300px;
            height: 250px;
            max-width: 35%;
            max-height: 35%;
            z-index: 20;
            pointer-events: auto;
            opacity: 0;
            visibility: hidden;
            overflow: visible;
            transition: opacity 0.2s ease;
        }
        .gexp-inimage-shell.is-visible {
            opacity: 1;
            visibility: visible;
        }
        .gexp-inimage-overlay {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            overflow: visible;
        }
        .gexp-inimage-slot {
            width: 100%;
            height: 100%;
            overflow: visible;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            transform-origin: bottom right;
        }
        .gexp-inimage-label {
            position: absolute;
            top: -16px;
            right: 22px;
            padding: 2px 6px;
            font-family: Roboto, Arial, Helvetica, sans-serif;
            font-size: 9px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #111111;
            background: rgba(255,255,255,0.88);
            border-radius: 2px;
            line-height: 1.2;
            pointer-events: none;
        }
        .gexp-inimage-close {
            position: absolute;
            top: -12px;
            right: -12px;
            width: 28px;
            height: 28px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 0;
            border-radius: 999px;
            background: rgba(17,17,17,0.72);
            color: transparent;
            font-size: 0;
            cursor: pointer;
            z-index: 50;
            box-shadow: 0 2px 8px rgba(0,0,0,0.18);
            -webkit-tap-highlight-color: transparent;
        }
        .gexp-inimage-close:hover {
            background: rgba(17,17,17,0.84);
        }
        .gexp-inimage-close::before,
        .gexp-inimage-close::after {
            content: "";
            position: absolute;
            width: 14px;
            height: 2px;
            border-radius: 999px;
            background: #ffffff;
        }
        .gexp-inimage-close::before {
            transform: rotate(45deg);
        }
        .gexp-inimage-close::after {
            transform: rotate(-45deg);
        }
      `;

      let inimageStylesAttached = false;
      function ensureInimageBaseStyles() {
        if (inimageStylesAttached) return;
        if (typeof document === "undefined") return;
        if (document.getElementById(INIMAGE_STYLE_ID)) return;

        const styleEl = document.createElement("style");
        styleEl.id = INIMAGE_STYLE_ID;
        styleEl.innerHTML = INIMAGE_BASE_STYLES;
        document.head.appendChild(styleEl);
        inimageStylesAttached = true;
      }

      const getInimageDebugState = () => {
        try {
          if (typeof window !== "undefined") {
            if (window.gexpInimageDebug === true) return true;
            if (window.location && window.location.search.includes("gexpInimageDebug=true")) return true;
            if (window.localStorage && window.localStorage.getItem("gexpInimageDebug") === "true") return true;
          }
        } catch (e) {}
        return false;
      };

      if (typeof window !== "undefined") {
        window.gexpInimageDebug = getInimageDebugState();
      }

      const inimageLogContextStyles = {
        manager: "background:#455A64;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;",
        placement: "background:#5D4037;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;",
        auction: "background:#0277BD;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;",
        refresh: "background:#00897B;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;",
        nav: "background:#6A1B9A;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;",
        display: "background:#2E7D32;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;",
      };

      const formatInimageLog = (args, defaultBadge) => {
        let mainText = args[0];
        let style1 = defaultBadge;
        let hasCustomStyle = false;
        let customStyleStr = "";

        if (typeof mainText === "string" && mainText.includes("%c")) {
          hasCustomStyle = true;
          customStyleStr = args[1] || "";
          args = [mainText.replace(/^%c/, ""), ...args.slice(2)];
          mainText = args[0];
        }

        let prefixStr = "%c INIMAGE ";
        let prefixStyle = style1;

        if (typeof mainText === "string") {
          const slotMatch = mainText.match(/\[Inimage:(Slot|Display):([^\]]+)\]/);
          if (slotMatch && slotMatch[2]) {
            const slotId = slotMatch[2].split(":")[0];
            const color = getSlotColor(slotId);
            prefixStyle = `background:${color};color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;`;
          } else if (mainText.includes("[InimageManager:NavContinua]")) {
            prefixStyle = inimageLogContextStyles.nav;
            prefixStr = "%c 🧭 INIMAGE ";
          } else if (mainText.includes("[InimageManager]")) {
            prefixStyle = inimageLogContextStyles.manager;
          } else if (mainText.includes("[InimagePlacementEngine]")) {
            prefixStyle = inimageLogContextStyles.placement;
          } else if (mainText.includes("[Inimage:Prebid]") || mainText.includes("[Inimage:TAM]") || mainText.includes("[Inimage:Auction]")) {
            prefixStyle = inimageLogContextStyles.auction;
            prefixStr = "%c 🎯 INIMAGE ";
          }

          if (mainText.includes("refresh") || mainText.includes("REFRESH")) {
            prefixStr = "%c 🔄 INIMAGE ";
            if (prefixStyle === style1) prefixStyle = inimageLogContextStyles.refresh;
          } else if (mainText.includes("[Inimage:Display:")) {
            prefixStr = "%c 🖼 INIMAGE ";
            if (prefixStyle === style1) prefixStyle = inimageLogContextStyles.display;
          }
        }

        if (hasCustomStyle) {
          return [`${prefixStr}%c ${mainText}`, prefixStyle, customStyleStr, ...args.slice(1)];
        }
        return [`${prefixStr}%c ${mainText}`, prefixStyle, "", ...args.slice(1)];
      };

      const logInimage = (...args) => { if (window.gexpInimageDebug) console.log(...formatInimageLog(args, badgeLog)); };
      const warnInimage = (...args) => { if (window.gexpInimageDebug) console.warn(...formatInimageLog(args, badgeWarn)); };
      const errorInimage = (...args) => { console.error(...formatInimageLog(args, badgeErr)); };
      const groupInimage = (...args) => { if (window.gexpInimageDebug) console.groupCollapsed(...formatInimageLog(args, badgeLog)); };
      const groupEndInimage = () => { if (window.gexpInimageDebug) console.groupEnd(); };

      class InimagePlacementEngine {
        constructor(domConfig = {}, eligibilityConfig = {}, rootElement = null) {
          this.domConfig = domConfig;
          this.eligibilityConfig = eligibilityConfig;
          this.rootElement = rootElement || document;
          this.mainColumns = Array.from(
            this.rootElement.querySelectorAll(
              this.domConfig.mainColumnSelector || ".ue-l-article__main-column",
            ),
          );
          this._seenFigures = new Set();
          this._seenImages = new Set();
        }

        findPlacements({ maxSlots = Infinity, firstOnly = false } = {}) {
          const placements = [];
          const figureSelector = this.domConfig.figureSelector || "figure";
          const pictureSelector = this.domConfig.pictureSelector || "picture";
          const imageSelector = this.domConfig.imageSelector || "img";
          const scopeLabel = this.rootElement === document ? "document" : this.rootElement?.dataset?.ueNavindex ? `navIndex=${this.rootElement.dataset.ueNavindex}` : "scoped-root";

          groupInimage(`[InimagePlacementEngine] 🔍 Discovery start (${scopeLabel})`);
          logInimage(`[InimagePlacementEngine] main columns found: ${this.mainColumns.length}`);
          logInimage(`[InimagePlacementEngine] selectors`, {
            mainColumnSelector: this.domConfig.mainColumnSelector || ".ue-l-article__main-column",
            figureSelector,
            pictureSelector,
            imageSelector,
            maxSlots,
            firstOnly,
          });

          for (const [mainIndex, mainColumn] of this.mainColumns.entries()) {
            const figures = Array.from(mainColumn.querySelectorAll(figureSelector));
            const pictures = Array.from(mainColumn.querySelectorAll(pictureSelector));
            const imgs = Array.from(mainColumn.querySelectorAll(imageSelector));
            groupInimage(`[InimagePlacementEngine] 📋 main[${mainIndex}] candidate scan`);
            logInimage(`[InimagePlacementEngine] figure count=${figures.length}, picture/img count=${pictures.length}/${imgs.length}`);

            for (const [figureIndex, figure] of figures.entries()) {
              if (placements.length >= maxSlots) {
                logInimage(`[InimagePlacementEngine] maxSlots reached (${maxSlots})`);
                groupEndInimage();
                groupEndInimage();
                return placements;
              }

              const figureCheck = this.evaluateFigure(figure);
              if (!figureCheck.eligible) {
                logInimage(`[InimagePlacementEngine] figure[${figureIndex}] skipped — ${figureCheck.reason}`);
                continue;
              }

              const picture = figure.querySelector(pictureSelector);
              if (!picture) {
                logInimage(`[InimagePlacementEngine] figure[${figureIndex}] skipped — no picture found`);
                continue;
              }

              const img = picture.querySelector(imageSelector);
              const imageCheck = this.evaluateImage(img);
              if (!imageCheck.eligible) {
                logInimage(`[InimagePlacementEngine] figure[${figureIndex}] skipped — ${imageCheck.reason}`, imageCheck.meta || {});
                continue;
              }
              if (this._seenFigures.has(figure) || this._seenImages.has(img)) {
                logInimage(`[InimagePlacementEngine] figure[${figureIndex}] skipped — already seen`);
                continue;
              }

              this._seenFigures.add(figure);
              this._seenImages.add(img);

              const imageIndex = placements.length;
              const placement = {
                mainColumn,
                figure,
                picture,
                img,
                imageIndex,
                overlayIndex: imageIndex,
              };

              placements.push(placement);
              logInimage(`[InimagePlacementEngine] ✅ placement[${imageIndex}] accepted`, {
                mainIndex,
                figureIndex,
                renderedWidth: imageCheck.meta.renderedWidth,
                renderedHeight: imageCheck.meta.renderedHeight,
                currentSrc: img.currentSrc || img.src || null,
              });
              if (firstOnly) {
                logInimage(`[InimagePlacementEngine] firstOnly=true — stopping after first eligible image`);
                groupEndInimage();
                groupEndInimage();
                return placements;
              }
            }

            groupEndInimage();
          }

          logInimage(`[InimagePlacementEngine] ✅ final placements resolved: ${placements.length}`);
          groupEndInimage();
          return placements;
        }

        evaluateFigure(figure) {
          if (!figure) return { eligible: false, reason: "missing_figure" };
          const blockerSelector = this.domConfig.blockerSelector;
          if (blockerSelector && figure.closest(blockerSelector)) {
            return { eligible: false, reason: `inside blocker selector "${blockerSelector}"` };
          }
          return { eligible: true, reason: "ok" };
        }

        isEligibleFigure(figure) {
          return this.evaluateFigure(figure).eligible;
        }

        evaluateImage(img) {
          if (!img) return { eligible: false, reason: "missing_img" };

          const rect = img.getBoundingClientRect();
          const renderedWidth = rect.width || img.clientWidth || 0;
          const renderedHeight = rect.height || img.clientHeight || 0;
          const minImageWidth = this.eligibilityConfig.minImageWidth || 0;
          const minImageHeight = this.eligibilityConfig.minImageHeight || 0;
          const meta = { renderedWidth, renderedHeight, minImageWidth, minImageHeight };

          if (renderedWidth < minImageWidth || renderedHeight < minImageHeight) {
            return { eligible: false, reason: "below_min_dimensions", meta };
          }

          if (this.eligibilityConfig.skipIfHidden) {
            const style = window.getComputedStyle(img);
            meta.display = style.display;
            meta.visibility = style.visibility;
            meta.opacity = style.opacity;
            if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
              return { eligible: false, reason: "hidden_image", meta };
            }
          }

          if (this.eligibilityConfig.requireLoadedImage && !img.complete && !img.naturalWidth) {
            meta.complete = img.complete;
            meta.naturalWidth = img.naturalWidth;
            return { eligible: false, reason: "image_not_loaded", meta };
          }

          return { eligible: true, reason: "ok", meta };
        }

        isEligibleImage(img) {
          return this.evaluateImage(img).eligible;
        }
      }

      class InimageContainer {
        constructor({ placement, overlayConfig = {}, slotId, onClose = null }) {
          this.placement = placement;
          this.overlayConfig = overlayConfig;
          this.slotId = slotId;
          this.onClose = onClose;
          this.figure = placement.figure;
          this.originalFigurePosition = null;
          this.shell = null;
          this.overlay = null;
          this.slotEl = null;
          this.labelEl = null;
          this.closeButton = null;
          this._boundClose = () => {
            logInimage(`[Inimage:Slot:${this.slotId}] close button clicked`);
            this.onClose?.();
          };
        }

        attach() {
          if (this.shell) {
            logInimage(`[Inimage:Slot:${this.slotId}] attach skipped — shell already exists`);
            return this.shell;
          }

          const computed = window.getComputedStyle(this.figure);
          logInimage(`[Inimage:Slot:${this.slotId}] attach start`, {
            figurePosition: computed.position,
            labelEnabled: this.overlayConfig.showLabel !== false,
          });
          if (computed.position === "static") {
            this.originalFigurePosition = this.figure.style.position || "";
            this.figure.style.position = "relative";
            logInimage(`[Inimage:Slot:${this.slotId}] figure positioning context forced to relative`);
          } else {
            logInimage(`[Inimage:Slot:${this.slotId}] figure positioning context already usable (${computed.position})`);
          }

          this.shell = document.createElement("div");
          this.shell.className = "gexp-inimage-shell";
          this.overlay = document.createElement("div");
          this.overlay.className = "gexp-inimage-overlay";

          this.closeButton = document.createElement("button");
          this.closeButton.type = "button";
          this.closeButton.className = "gexp-inimage-close";
          this.closeButton.setAttribute("aria-label", "Cerrar publicidad");
          this.closeButton.textContent = "×";
          this.closeButton.addEventListener("click", this._boundClose);
          this.shell.appendChild(this.closeButton);

          if (this.overlayConfig.showLabel !== false) {
            this.labelEl = document.createElement("div");
            this.labelEl.className = "gexp-inimage-label";
            this.labelEl.textContent = this.overlayConfig.label || "Publicidad";
            this.overlay.appendChild(this.labelEl);
          }

          this.slotEl = document.createElement("div");
          this.slotEl.id = this.slotId;
          this.slotEl.className = "gexp-inimage-slot";

          this.overlay.appendChild(this.slotEl);
          this.shell.appendChild(this.overlay);
          this.applyBaseStyles();
          this.figure.appendChild(this.shell);
          logInimage(`[Inimage:Slot:${this.slotId}] shell created and attached`);

          return this.shell;
        }

        applyBaseStyles() {
          if (!this.shell) return;
          this.shell.style.bottom = `${this.overlayConfig.offsetBottom ?? 0}px`;
          this.shell.style.right = `${this.overlayConfig.offsetRight ?? 0}px`;
          this.shell.style.zIndex = `${this.overlayConfig.zIndex ?? 20}`;
          logInimage(`[Inimage:Slot:${this.slotId}] base styles applied`, {
            offsetBottom: this.overlayConfig.offsetBottom ?? 0,
            offsetRight: this.overlayConfig.offsetRight ?? 0,
            zIndex: this.overlayConfig.zIndex ?? 20,
          });
        }

        updateOverlayMetrics(metrics) {
          if (!this.shell || !metrics) return;
          this.shell.style.width = `${metrics.width}px`;
          this.shell.style.height = `${metrics.height}px`;
          this.shell.style.maxWidth = `${Math.round(metrics.maxWidth)}px`;
          this.shell.style.maxHeight = `${Math.round(metrics.maxHeight)}px`;
          this.shell.style.left = `${metrics.left}px`;
          this.shell.style.top = `${metrics.top}px`;
          this.shell.style.right = "auto";
          this.shell.style.bottom = "auto";
          logInimage(`[Inimage:Slot:${this.slotId}] overlay metrics applied`, metrics);
          this.applyCreativeScale(metrics.creativeWidth, metrics.creativeHeight);
        }

        applyCreativeScale(creativeWidth, creativeHeight) {
          if (!this.slotEl || !creativeWidth || !creativeHeight) return;
          const shellWidth = this.shell?.clientWidth || creativeWidth;
          const shellHeight = this.shell?.clientHeight || creativeHeight;
          const scale = Math.min(shellWidth / creativeWidth, shellHeight / creativeHeight);
          const creativeRoot =
            this.slotEl.querySelector('div[id^="google_ads_iframe"]') ||
            this.slotEl.querySelector("iframe") ||
            this.slotEl.lastElementChild;

          if (creativeRoot) {
            creativeRoot.style.width = `${creativeWidth}px`;
            creativeRoot.style.height = `${creativeHeight}px`;
            creativeRoot.style.transformOrigin = "";
            creativeRoot.style.transform = "";
            creativeRoot.style.position = "";
            creativeRoot.style.bottom = "";
            creativeRoot.style.right = "";
          }

          this.slotEl.style.width = `${creativeWidth}px`;
          this.slotEl.style.height = `${creativeHeight}px`;
          this.slotEl.style.position = "absolute";
          this.slotEl.style.bottom = "0";
          this.slotEl.style.right = "0";
          this.slotEl.style.transformOrigin = "bottom right";
          this.slotEl.style.transform = `scale(${scale})`;
          logInimage(`[Inimage:Slot:${this.slotId}] creative scale applied`, {
            creativeWidth,
            creativeHeight,
            shellWidth,
            shellHeight,
            scale,
            hasCreativeRoot: !!creativeRoot,
          });
        }

        show() {
          if (this.shell) {
            this.shell.classList.add("is-visible");
            logInimage(`[Inimage:Slot:${this.slotId}] shell shown`);
          }
        }

        hide() {
          if (this.shell) {
            this.shell.classList.remove("is-visible");
            logInimage(`[Inimage:Slot:${this.slotId}] shell hidden`);
          }
        }

        clearSlotMarkup() {
          if (!this.slotEl) return;
          this.slotEl.removeAttribute("data-gpt-displayed");
          this.slotEl.innerHTML = "";
          logInimage(`[Inimage:Slot:${this.slotId}] slot markup cleared for retry`);
        }

        getElement() {
          return this.shell;
        }

        getSlotElement() {
          return this.slotEl;
        }

        destroy() {
          logInimage(`[Inimage:Slot:${this.slotId}] destroy container`);
          if (this.closeButton) {
            this.closeButton.removeEventListener("click", this._boundClose);
          }
          if (this.shell?.parentNode) {
            this.shell.parentNode.removeChild(this.shell);
          }
          if (this.originalFigurePosition !== null) {
            this.figure.style.position = this.originalFigurePosition;
          }
          this.shell = null;
          this.overlay = null;
          this.slotEl = null;
          this.closeButton = null;
        }
      }
      class InimageNode {
        constructor({ id, config, manager, placement, slotIndex = 0, navIndex = null }) {
          this.id = id;
          this.config = config;
          this.manager = manager;
          this.placement = placement;
          this.slotIndex = slotIndex;
          this.navIndex = navIndex;
          this.state = "idle";
          this.slot = null;
          this.wa = null;
          this.waterfall = null;
          this._cycleCount = 0;
          this._renderSize = null;
          this.closedByUser = false;
          this.destroyed = false;
          this._boundResize = () => this.updateOverlayMetrics();
          this._boundLoad = () => this.updateOverlayMetrics();
        }

        initialize() {
          groupInimage(`[Inimage:Slot:${this.id}] initialize`);
          logInimage(`[Inimage:Slot:${this.id}] placement context`, {
            slotIndex: this.slotIndex,
            navIndex: this.navIndex,
            currentSrc: this.placement?.img?.currentSrc || this.placement?.img?.src || null,
          });

          this.container = new InimageContainer({
            placement: this.placement,
            overlayConfig: this.config.overlay,
            slotId: this.id,
            onClose: () => this.closeByUser(),
          });
          this.container.attach();
          this.container.hide();

          this.wa = new WindowArray(this.id, this.manager.gexp.cfg, this.manager.gexp);
          this.manager.gexp.windows[this.id] = this.wa;
          logInimage(`[Inimage:Slot:${this.id}] WindowArray attached`);

          this.waterfall = new InimageWaterfall({
            node: this,
            container: this.container,
            config: this.config,
            gexp: this.manager.gexp,
            wa: this.wa,
          });

          this.observeResize();
          this.updateOverlayMetrics();
          this.waterfall.init();
          groupEndInimage();
        }

        observeResize() {
          if (this.isClosed()) return;
          const img = this.placement?.img;
          if (!img) {
            warnInimage(`[Inimage:Slot:${this.id}] observeResize skipped — no img node`);
            return;
          }
          img.addEventListener("load", this._boundLoad);
          window.addEventListener("resize", this._boundResize);
          logInimage(`[Inimage:Slot:${this.id}] load/resize observers attached`);
          if (typeof ResizeObserver !== "undefined") {
            this._resizeObserver = new ResizeObserver(() => {
              logInimage(`[Inimage:Slot:${this.id}] ResizeObserver fired`);
              this.updateOverlayMetrics();
            });
            this._resizeObserver.observe(img);
            logInimage(`[Inimage:Slot:${this.id}] ResizeObserver observing image`);
          }
        }

        getDisplaySizes() {
          const sizes = this.config.display?.sizes;
          if (Array.isArray(sizes) && sizes.length) return sizes;
          return [[300, 250]];
        }

        chooseBaseCreativeSize(maxWidth, maxHeight, sizes) {
          let chosen = sizes[0] || [300, 250];
          let chosenArea = 0;
          sizes.forEach((size) => {
            const [w, h] = size;
            const scale = Math.min(maxWidth / w, maxHeight / h, 1);
            if (scale <= 0) return;
            const area = (w * scale) * (h * scale);
            if (area > chosenArea) {
              chosenArea = area;
              chosen = size;
            }
          });
          logInimage(`[Inimage:Slot:${this.id}] creative size chosen`, {
            maxWidth,
            maxHeight,
            availableSizes: sizes,
            chosen,
          });
          return chosen;
        }

        computeOverlayMetrics(renderSize = null) {
          if (this.isClosed()) return null;
          const img = this.placement?.img;
          if (!img) return null;

          const rect = img.getBoundingClientRect();
          const figureRect = this.placement?.figure?.getBoundingClientRect?.() || rect;
          const renderedWidth = rect.width || img.clientWidth || 0;
          const renderedHeight = rect.height || img.clientHeight || 0;
          if (!renderedWidth || !renderedHeight) {
            warnInimage(`[Inimage:Slot:${this.id}] overlay metrics unavailable — zero rendered image size`, {
              renderedWidth,
              renderedHeight,
            });
            return null;
          }

          const overlayCfg = this.config.overlay || {};
          const maxWidth = renderedWidth * (overlayCfg.maxOverlayWidthRatio ?? 0.35);
          const maxHeight = renderedHeight * (overlayCfg.maxOverlayHeightRatio ?? 0.35);
          const sizes = this.getDisplaySizes();
          const baseSize = renderSize || this.chooseBaseCreativeSize(maxWidth, maxHeight, sizes);
          const minScale = overlayCfg.minScale ?? 0.65;
          const maxScale = overlayCfg.maxScale ?? 1;
          const fitScale = Math.min(maxWidth / baseSize[0], maxHeight / baseSize[1]);
          if (!isFinite(fitScale) || fitScale <= 0) {
            warnInimage(`[Inimage:Slot:${this.id}] overlay metrics invalid — fitScale <= 0`, {
              maxWidth,
              maxHeight,
              baseSize,
              fitScale,
            });
            return null;
          }
          const cappedFitScale = Math.min(maxScale, fitScale);
          const scale = fitScale < minScale
            ? cappedFitScale
            : Math.max(minScale, cappedFitScale);
          const width = Math.round(baseSize[0] * scale);
          const height = Math.round(baseSize[1] * scale);
          const relativeImageLeft = Math.max(0, rect.left - figureRect.left);
          const relativeImageTop = Math.max(0, rect.top - figureRect.top);
          const offsetRight = overlayCfg.offsetRight ?? 0;
          const offsetBottom = overlayCfg.offsetBottom ?? 0;
          const left = Math.max(
            0,
            Math.min(
              relativeImageLeft + renderedWidth - width - offsetRight,
              (figureRect.width || renderedWidth) - width,
            ),
          );
          const top = Math.max(
            0,
            Math.min(
              relativeImageTop + renderedHeight - height - offsetBottom,
              (figureRect.height || renderedHeight) - height,
            ),
          );

          const metrics = {
            width,
            height,
            creativeWidth: baseSize[0],
            creativeHeight: baseSize[1],
            maxWidth,
            maxHeight,
            left,
            top,
            offsetRight,
            offsetBottom,
          };
          logInimage(`[Inimage:Slot:${this.id}] overlay metrics calculated`, metrics);
          return metrics;
        }

        updateOverlayMetrics(renderSize = null) {
          if (this.isClosed()) return;
          const metrics = this.computeOverlayMetrics(renderSize || this._renderSize);
          if (!metrics) return;
          this.container.updateOverlayMetrics(metrics);
        }

        askDisplay(bidResponse) {
          return new Promise((resolve) => {
            this.state = "asking_display";
            const adUnitPath = this.manager.adUnitPath || this.manager.gexp.cfg.adUnit || "";
            const sizes = this.getDisplaySizes();
            const fullAdUnit = `/${this.manager.networkId}/${adUnitPath}`;

            groupInimage(`[Inimage:Display:${this.id}] askDisplay`);
            logInimage(`[Inimage:Display:${this.id}] GAM request inputs`, {
              fullAdUnit,
              sizes,
              navIndex: this.navIndex,
              bidResponse: bidResponse ? {
                bidderCode: bidResponse.bidderCode,
                cpm: bidResponse.cpm,
                auctionId: bidResponse.auctionId,
                adId: bidResponse.adId,
              } : null,
            });

            googletag.cmd.push(() => {
              if (!this.slot) {
                this.slot = googletag.defineSlot(fullAdUnit, sizes, this.id);
                if (!this.slot) {
                  errorInimage(`[Inimage:Display:${this.id}] slot definition failed`);
                  groupEndInimage();
                  resolve({ filled: false, event: null });
                  return;
                }
                this.slot.addService(googletag.pubads());
                logInimage(`[Inimage:Display:${this.id}] slot defined and service attached`);
              }

              this.slot.clearTargeting();
              this.slot.setTargeting("p", [this.id]);
              this.slot.setTargeting("inimage", "true");
              if (this.navIndex !== null && this.navIndex !== undefined) {
                this.slot.setTargeting("gexp-inimage-navcont", String(this.navIndex));
              }

              if (window.pbjs && bidResponse) {
                const pb = bidResponse.pbCg || bidResponse.pbAg || bidResponse.pbHg || String(bidResponse.cpm);
                this.slot.setTargeting("hb_pb", pb);
                this.slot.setTargeting("hb_bidder", bidResponse.bidderCode);
                this.slot.setTargeting("hb_format", "banner");
                if (bidResponse.adId) {
                  this.slot.setTargeting("hb_adid", bidResponse.adId);
                }
              }

              if (window.apstag && window.apstag.targetingKeys) {
                const tamKeys = window.apstag.targetingKeys();
                if (tamKeys && tamKeys[this.id]) {
                  Object.entries(tamKeys[this.id]).forEach(([k, v]) => this.slot.setTargeting(k, v));
                  logInimage(`[Inimage:Display:${this.id}] TAM targeting applied`, tamKeys[this.id]);
                }
              }

              if (this.wa) {
                this.wa.slot = this.slot;
                this.wa.allowUpdate = true;
              }

              this.manager.gexp.request(this.slot);
              logInimage(`[Inimage:Display:${this.id}] GAM display request dispatched`);

              const initialRenderHandler = (event) => {
                if (event.slot !== this.slot) return;
                googletag.pubads().removeEventListener("slotRenderEnded", initialRenderHandler);
                if (this.isClosed()) {
                  logInimage(`[Inimage:Display:${this.id}] render callback ignored â€” node closed`);
                  groupEndInimage();
                  resolve({ filled: false, event: null });
                  return;
                }
                const hasContent = !event.isEmpty;
                const is1x1 = event.size && event.size[0] === 1 && event.size[1] === 1;
                logInimage(`[Inimage:Display:${this.id}] render result`, {
                  isEmpty: event.isEmpty,
                  size: event.size || null,
                  is1x1,
                  lineItemId: event.lineItemId,
                  creativeId: event.creativeId,
                });
                groupEndInimage();
                resolve({ filled: hasContent, event, is1x1 });
              };
              googletag.pubads().addEventListener("slotRenderEnded", initialRenderHandler);

              if (!this._hasPersistentListener) {
                this._hasPersistentListener = true;
                googletag.pubads().addEventListener("slotRenderEnded", (event) => {
                  if (this.isClosed()) return;
                  if (event.slot !== this.slot) return;
                  if (event.isEmpty) return;
                  if (event.size && event.size[0] > 1 && event.size[1] > 1) {
                    this._renderSize = [event.size[0], event.size[1]];
                    logInimage(`[Inimage:Display:${this.id}] persistent render listener updated creative size`, this._renderSize);
                    this.updateOverlayMetrics(this._renderSize);
                  }
                });
              }

              const slotEl = this.container.getSlotElement();
              if (slotEl && !slotEl.hasAttribute("data-gpt-displayed")) {
                googletag.display(this.id);
                slotEl.setAttribute("data-gpt-displayed", "true");
                logInimage(`[Inimage:Display:${this.id}] googletag.display executed`);
              }
              googletag.pubads().refresh([this.slot]);
              logInimage(`[Inimage:Display:${this.id}] googletag.pubads().refresh executed`);
            });
          });
        }

        showDisplay(displayResult) {
          if (this.isClosed()) {
            logInimage(`[Inimage:Display:${this.id}] showDisplay ignored â€” node closed`);
            return;
          }
          this.state = "display";
          if (displayResult?.event?.size && displayResult.event.size[0] > 1 && displayResult.event.size[1] > 1) {
            this._renderSize = [displayResult.event.size[0], displayResult.event.size[1]];
          }
          this.updateOverlayMetrics(this._renderSize);
          this.container.show();
          this.recordTelemetry("fill", { slotId: this.id, size: displayResult?.event?.size || null });
          logInimage(`[Inimage:Display:${this.id}] fill confirmed`, {
            renderSize: this._renderSize,
            lineItemId: displayResult?.event?.lineItemId,
            creativeId: displayResult?.event?.creativeId,
          });
          this.scheduleRefreshCycle();
        }

        scheduleRefreshCycle() {
          if (this.isClosed()) {
            logInimage(`[Inimage:Display:${this.id}] refresh cycle skipped â€” node closed`);
            return;
          }
          const refreshCfg = this.config.refreshCycle;
          if (!refreshCfg || !refreshCfg.enabled) {
            logInimage(`[Inimage:Display:${this.id}] refresh cycle disabled`);
            return;
          }

          this._cycleCount += 1;
          if (this._cycleCount >= refreshCfg.maxCycles) {
            logInimage(`[Inimage:Display:${this.id}] max refresh cycles reached (${this._cycleCount}/${refreshCfg.maxCycles})`);
            return;
          }

          const targetIntervalMs = refreshCfg.delayMs || 30000;
          const el = this.container.getElement();
          if (!el) {
            warnInimage(`[Inimage:Display:${this.id}] refresh cycle skipped — no container element`);
            return;
          }

          if (this._visibilityTimer) this._visibilityTimer.stop();
          logInimage(`[Inimage:Display:${this.id}] scheduling refresh cycle ${this._cycleCount}/${refreshCfg.maxCycles} (visible time ${targetIntervalMs}ms)`);

          let accumulatedVisibleTime = 0;
          let lastVisibleTimestamp = 0;
          let isCurrentlyVisible = false;
          let checkInterval = null;
          let observer = null;

          const triggerRefresh = () => {
            if (this.isClosed()) {
              logInimage(`[Inimage:Display:${this.id}] refresh trigger ignored â€” node closed`);
              return;
            }
            logInimage(`[Inimage:Display:${this.id}] visible-time threshold reached -> refresh`);
            if (observer) observer.disconnect();
            if (checkInterval) clearInterval(checkInterval);
            this.destroyDisplayForRetry();
            this.waterfall.prebidStarted = false;
            this.waterfall.startAuction("refresh");
          };

          const updateAccumulator = () => {
            if (isCurrentlyVisible && document.visibilityState === "visible") {
              const now = Date.now();
              if (lastVisibleTimestamp > 0) accumulatedVisibleTime += now - lastVisibleTimestamp;
              lastVisibleTimestamp = now;
              if (accumulatedVisibleTime >= targetIntervalMs) {
                triggerRefresh();
              }
            } else {
              lastVisibleTimestamp = 0;
            }
          };

          if (typeof IntersectionObserver !== "undefined") {
            observer = new IntersectionObserver((entries) => {
              if (this.isClosed()) return;
              const entry = entries[0];
              const wasVisible = isCurrentlyVisible;
              isCurrentlyVisible = entry.isIntersecting;
              logInimage(`[Inimage:Display:${this.id}] refresh visibility update`, {
                isIntersecting: entry.isIntersecting,
                accumulatedVisibleTime,
              });
              if (isCurrentlyVisible && !wasVisible && document.visibilityState === "visible") {
                lastVisibleTimestamp = Date.now();
              } else if (!isCurrentlyVisible && wasVisible) {
                updateAccumulator();
              }
            }, { threshold: 0.1 });
            observer.observe(el);
          } else {
            isCurrentlyVisible = true;
            logInimage(`[Inimage:Display:${this.id}] refresh visibility fallback -> always visible`);
          }

          checkInterval = setInterval(updateAccumulator, 500);
          this._visibilityTimer = {
            stop: () => {
              if (observer) observer.disconnect();
              if (checkInterval) clearInterval(checkInterval);
            },
          };
        }

        destroyDisplayForRetry() {
          if (this.isClosed()) {
            logInimage(`[Inimage:Display:${this.id}] destroyDisplayForRetry skipped â€” node closed`);
            return;
          }
          logInimage(`[Inimage:Display:${this.id}] destroyDisplayForRetry`);
          if (this._visibilityTimer) {
            this._visibilityTimer.stop();
            this._visibilityTimer = null;
          }
          if (this.slot) {
            googletag.cmd.push(() => googletag.destroySlots([this.slot]));
            this.slot = null;
          }
          this.container.clearSlotMarkup();
          this.container.show();
        }

        discardDisplay() {
          if (this.isClosed()) {
            logInimage(`[Inimage:Display:${this.id}] discardDisplay skipped â€” node closed`);
            return;
          }
          logInimage(`[Inimage:Display:${this.id}] no-fill -> discard display`);
          if (this.slot) {
            googletag.cmd.push(() => {
              googletag.destroySlots([this.slot]);
              this.slot = null;
            });
          }
          this.container.hide();
          this.recordTelemetry("no_fill", { slotId: this.id });
        }

        recordTelemetry(eventName, payload = {}) {
          if (this.manager.gexp.statsG) {
            this.manager.gexp.statsG.addVariable(`inimage_${eventName}`, JSON.stringify(payload));
          }
        }

        isClosed() {
          return this.closedByUser || this.destroyed;
        }

        closeByUser() {
          if (this.isClosed()) {
            logInimage(`[Inimage:Slot:${this.id}] closeByUser ignored â€” already closed`);
            return;
          }
          this.closedByUser = true;
          this.state = "dismissed";
          logInimage(`[Inimage:Slot:${this.id}] manual close requested`);
          this.recordTelemetry("closed_by_user", { slotId: this.id, navIndex: this.navIndex });
          this.waterfall?.cancelPendingFlow("user_close");
          if (this._visibilityTimer) {
            this._visibilityTimer.stop();
            this._visibilityTimer = null;
          }
          if (this._resizeObserver) this._resizeObserver.disconnect();
          this.placement?.img?.removeEventListener("load", this._boundLoad);
          window.removeEventListener("resize", this._boundResize);
          if (this.slot) {
            googletag.cmd.push(() => {
              if (this.slot) {
                googletag.destroySlots([this.slot]);
                this.slot = null;
              }
            });
          }
          this.container?.clearSlotMarkup();
          this.container?.destroy();
          delete this.manager.gexp.windows[this.id];
        }

        destroy() {
          if (this.destroyed) return;
          this.destroyed = true;
          logInimage(`[Inimage:Slot:${this.id}] destroy node`);
          this.waterfall?.cancelPendingFlow("destroy");
          if (this._resizeObserver) this._resizeObserver.disconnect();
          if (this._visibilityTimer) this._visibilityTimer.stop();
          this._visibilityTimer = null;
          this.placement?.img?.removeEventListener("load", this._boundLoad);
          window.removeEventListener("resize", this._boundResize);
          if (this.slot) {
            googletag.cmd.push(() => googletag.destroySlots([this.slot]));
            this.slot = null;
          }
          this.container?.destroy();
          delete this.manager.gexp.windows[this.id];
        }
      }
      class InimageWaterfall {
        constructor({ node, container, config, gexp, wa }) {
          this.node = node;
          this.container = container;
          this.config = config;
          this.gexp = gexp;
          this.wa = wa;
          this.prebidStarted = false;
          this.timer = null;
          this.intersectionObserver = null;
          this._lastPrebidStatus = null;
          this._lastPrebidResult = null;
          this._prebidReadinessRetryUsed = false;
        }

        init() {
          logInimage(`[Inimage:Auction:${this.node.id}] init waterfall`);
          this.setupIntersectionTrigger();
          this.setupTimerTrigger();
        }

        cancelPendingFlow(reason = "cancelled") {
          logInimage(`[Inimage:Auction:${this.node.id}] cancelPendingFlow`, { reason });
          if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
          }
          if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
          }
        }

        setupIntersectionTrigger() {
          if (this.node.isClosed()) {
            logInimage(`[Inimage:Auction:${this.node.id}] intersection trigger skipped â€” node closed`);
            return;
          }
          const margin = this.config.loading?.rootMargin || "200px 0px";
          const el = this.container.getElement();
          if (!el) {
            warnInimage(`[Inimage:Auction:${this.node.id}] intersection trigger skipped — no element`);
            return;
          }

          if ("IntersectionObserver" in window) {
            this.intersectionObserver = new IntersectionObserver((entries) => {
              if (this.node.isClosed()) return;
              if (entries[0].isIntersecting) {
                logInimage(`[Inimage:Auction:${this.node.id}] trigger=intersection`);
                this.startAuction("intersection");
                this.intersectionObserver.disconnect();
                this.intersectionObserver = null;
              }
            }, { threshold: 0, rootMargin: margin });
            this.intersectionObserver.observe(el);
            logInimage(`[Inimage:Auction:${this.node.id}] intersection observer armed`, { rootMargin: margin });
          } else {
            logInimage(`[Inimage:Auction:${this.node.id}] IntersectionObserver unavailable -> fallback trigger`);
            this.startAuction("fallback");
          }
        }

        setupTimerTrigger() {
          if (this.node.isClosed()) {
            logInimage(`[Inimage:Auction:${this.node.id}] timer trigger skipped â€” node closed`);
            return;
          }
          const timeout = this.config.loading?.maxDelayMs || 5000;
          this.timer = setTimeout(() => {
            logInimage(`[Inimage:Auction:${this.node.id}] trigger=timer after ${timeout}ms`);
            this.startAuction("timer");
          }, timeout);
          logInimage(`[Inimage:Auction:${this.node.id}] timer trigger armed`, { timeout });
        }

        async startAuction(trigger) {
          if (this.node.isClosed()) {
            logInimage(`[Inimage:Auction:${this.node.id}] startAuction ignored â€” node closed`, { trigger });
            return;
          }
          if (this.prebidStarted) {
            logInimage(`[Inimage:Auction:${this.node.id}] startAuction ignored — already started`, { trigger });
            return;
          }
          this.prebidStarted = true;
          clearTimeout(this.timer);
          this.node.recordTelemetry("auction_start", { trigger });
          this._currentAuctionId = null;
          this._lastPrebidStatus = null;
          this._lastPrebidResult = null;

          groupInimage(`[Inimage:Auction:${this.node.id}] start trigger=${trigger}`);
          if (trigger === "refresh") {
            logInimage(`[Inimage:Auction:${this.node.id}] refresh cleanup before auction`);
            if (window.pbjs?.clearTargeting) window.pbjs.clearTargeting(this.node.id);
            if (window.pbjs?.removeAdUnit) window.pbjs.removeAdUnit(this.node.id);
          }

          const prebidConfig = this.getPrebidBannerConfig();
          logInimage(`[Inimage:Auction:${this.node.id}] prebid config`, prebidConfig);
          if (prebidConfig) {
            this._lastPrebidResult = await this.executePrebid(prebidConfig);
            this._lastPrebidStatus = this._lastPrebidResult?.status || null;
            logInimage(`[Inimage:Auction:${this.node.id}] prebid_final_state`, this._lastPrebidResult);
          } else {
            logInimage(`[Inimage:Auction:${this.node.id}] prebid skipped — no eligible config`);
          }
          if (this.node.isClosed()) {
            logInimage(`[Inimage:Auction:${this.node.id}] auction aborted after Prebid â€” node closed`);
            groupEndInimage();
            return;
          }
          this._lastDisplayBid = this.getBestDisplayBid(prebidConfig?.code || this.node.id, this._lastPrebidResult);
          if (this._lastDisplayBid) {
            logInimage(`[Inimage:Auction:${this.node.id}] best_display_bid_selected`, {
              bidderCode: this._lastDisplayBid.bidderCode,
              cpm: this._lastDisplayBid.cpm,
              auctionId: this._lastDisplayBid.auctionId,
              adId: this._lastDisplayBid.adId,
            });
          } else {
            logInimage(`[Inimage:Auction:${this.node.id}] best_display_bid_missing`, {
              prebidStatus: this._lastPrebidStatus,
              prebidResult: this._lastPrebidResult,
            });
          }
          logInimage(`[Inimage:Auction:${this.node.id}] best display bid`, this._lastDisplayBid ? {
            bidderCode: this._lastDisplayBid.bidderCode,
            cpm: this._lastDisplayBid.cpm,
            auctionId: this._lastDisplayBid.auctionId,
            adId: this._lastDisplayBid.adId,
          } : null);

          const tamConfig = this.getTAMConfiguration();
          logInimage(`[Inimage:Auction:${this.node.id}] TAM config`, tamConfig);
          logInimage(`[Inimage:Auction:${this.node.id}] auction_continues_to_tam`, {
            prebidStatus: this._lastPrebidStatus,
            hasBid: !!this._lastDisplayBid,
            resolvedBy: this._lastPrebidResult?.resolvedBy || null,
            hadUsableBannerBids: this._lastPrebidResult?.hadUsableBannerBids || false,
          });
          if (tamConfig) {
            await this.executeAmazonTam(tamConfig);
          } else {
            logInimage(`[Inimage:Auction:${this.node.id}] TAM skipped — no eligible config`);
          }

          if (this.node.isClosed()) {
            logInimage(`[Inimage:Auction:${this.node.id}] auction aborted after TAM â€” node closed`);
            groupEndInimage();
            return;
          }
          logInimage(`[Inimage:Auction:${this.node.id}] auction_continues_to_gam`, {
            prebidStatus: this._lastPrebidStatus,
            hasBid: !!this._lastDisplayBid,
            resolvedBy: this._lastPrebidResult?.resolvedBy || null,
            hadUsableBannerBids: this._lastPrebidResult?.hadUsableBannerBids || false,
          });
          const displayResult = await this.node.askDisplay(this._lastDisplayBid);
          if (this.node.isClosed()) {
            logInimage(`[Inimage:Auction:${this.node.id}] display result ignored â€” node closed`);
            groupEndInimage();
            return;
          }
          if (displayResult.filled) {
            logInimage(`[Inimage:Auction:${this.node.id}] fill result -> showDisplay`);
            this.node.showDisplay(displayResult);
          } else if (this.shouldRetryAfterPrebidReadiness(trigger)) {
            logInimage(`[Inimage:Auction:${this.node.id}] first no-fill after Prebid readiness miss -> controlled retry`);
            this.schedulePrebidReadinessRetry();
          } else {
            logInimage(`[Inimage:Auction:${this.node.id}] fill result -> no-fill`);
            this.node.discardDisplay();
          }
          groupEndInimage();
        }

        getPrebidBannerConfig() {
          const code = this.node.id;
          const sizes = this.getDisplaySizes();
          const networkId = this.node.manager.networkId;
          const prebidNetworks = this.config.prebid?.networks || {};
          const targetNetwork = prebidNetworks[networkId] || prebidNetworks.default || {};
          const bids = targetNetwork.bidders || [];
          if (!sizes.length || !bids.length) return null;
          return {
            code,
            mediaTypes: { banner: { sizes } },
            bids,
            ortb2Imp: this.buildOrtb2Imp(code),
          };
        }

        executePrebidLegacy(configuration) {
          return this.executePrebid(configuration);
          return new Promise((resolve) => {
            if (this.node.isClosed()) {
              logInimage(`[Inimage:Prebid] skipped â€” node closed`);
              resolve(null);
              return;
            }
            if (!window.pbjs || typeof window.pbjs.requestBids === "undefined") {
              logInimage(`[Inimage:Prebid] pbjs unavailable — skipping`);
              resolve(null);
              return;
            }

            window.pbjs.que.push(() => {
              if (this.node.isClosed()) {
                resolve(null);
                return;
              }
              try {
                this.registerPrebidAdUnit(configuration);
                const timeout = this.getPrebidTimeout();
                const knownAuctionIds = new Set(
                  (window.pbjs.getBidResponsesForAdUnitCode(configuration.code)?.bids || [])
                    .map((bid) => bid.auctionId)
                    .filter(Boolean),
                );
                logInimage(`[Inimage:Prebid] requestBids`, {
                  code: configuration.code,
                  timeout,
                  knownAuctionIds: Array.from(knownAuctionIds),
                });
                const safetyTimer = setTimeout(() => {
                  warnInimage(`[Inimage:Prebid] safety timeout (${timeout + 500}ms)`);
                  resolve(null);
                }, timeout + 500);
                window.pbjs.requestBids({
                  timeout,
                  adUnitCodes: [configuration.code],
                  bidsBackHandler: (bidResponses, timedOut, auctionIdParam) => {
                    clearTimeout(safetyTimer);
                    if (this.node.isClosed()) {
                      resolve(null);
                      return;
                    }
                    const rawBids = window.pbjs.getBidResponsesForAdUnitCode(configuration.code)?.bids || [];
                    const newAuctionIds = rawBids
                      .map((bid) => bid.auctionId)
                      .filter((auctionId) => auctionId && !knownAuctionIds.has(auctionId));
                    const resolvedAuctionId =
                      auctionIdParam ||
                      (newAuctionIds.length > 0 ? newAuctionIds[newAuctionIds.length - 1] : null) ||
                      null;
                    this._currentAuctionId = resolvedAuctionId;
                    logInimage(`[Inimage:Prebid] bidsBackHandler resolved`, {
                      timedOut,
                      auctionIdParam,
                      resolvedAuctionId,
                      bidCount: rawBids.length,
                    });
                    window.pbjs.setTargetingForGPTAsync([configuration.code]);
                    resolve("prebid_done");
                  },
                });
              } catch (e) {
                warnInimage(`[Inimage:Prebid] exception in pbjs queue`, e);
                resolve(null);
              }
            });
          });
        }

        async executePrebid(configuration) {
          if (this.node.isClosed()) {
            logInimage(`[Inimage:Prebid] skipped — node closed`);
            return this.buildPrebidFinalResult({
              status: "prebid_skipped_closed",
              resolvedBy: "node_closed",
            });
          }

          const readiness = await this.waitForPrebidReady("executePrebid");
          if (!readiness.ready) {
            warnInimage(`[Inimage:Prebid] pbjs unavailable — skipping after bounded readiness wait`, readiness);
            const result = this.buildPrebidFinalResult({
              status: "prebid_not_ready",
              resolvedBy: "readiness",
              waitedMs: readiness.waitedMs,
            });
            logInimage(`[Inimage:Prebid] prebid_finalized`, result);
            return result;
          }

          this.registerPrebidAliases();

          return new Promise((resolve) => {
            let settled = false;
            let safetyTimer = null;
            let timeoutLogTimer = null;
            let graceTimer = null;
            const requestStartedAt = Date.now();
            const timeout = this.getPrebidTimeout();
            const graceMs = this.getPrebidGraceMs();
            const watchdogMs = Math.max(1200, graceMs + 1000);
            const knownAuctionIds = new Set(
              (window.pbjs.getBidResponsesForAdUnitCode(configuration.code)?.bids || [])
                .map((bid) => bid.auctionId)
                .filter(Boolean),
            );
            let bidsBackHandlerSeen = false;
            const finish = (result) => {
              if (settled) return;
              settled = true;
              if (safetyTimer) clearTimeout(safetyTimer);
              if (timeoutLogTimer) clearTimeout(timeoutLogTimer);
              if (graceTimer) clearTimeout(graceTimer);
              this._currentAuctionId = result?.auctionId || null;
              logInimage(`[Inimage:Prebid] prebid_finalized`, result);
              resolve(result);
            };

            const collectSnapshot = () => {
              const rawBids = window.pbjs.getBidResponsesForAdUnitCode(configuration.code)?.bids || [];
              const bannerBids = rawBids.filter((bid) => (bid.mediaType === "banner" || !bid.mediaType));
              const uniqueAuctionIds = Array.from(new Set(rawBids.map((bid) => bid.auctionId).filter(Boolean)));
              return { rawBids, bannerBids, uniqueAuctionIds };
            };

            const resolveAuctionId = (preferredAuctionId, bannerBids, uniqueAuctionIds) => {
              if (preferredAuctionId) return preferredAuctionId;
              if (bannerBids.length === 1 && bannerBids[0].auctionId) return bannerBids[0].auctionId;
              if (uniqueAuctionIds.length === 1) return uniqueAuctionIds[0];
              return null;
            };

            const finalizeWithSnapshot = ({ resolvedBy, timedOut = false, preferredAuctionId = null }) => {
              const waitedMs = Date.now() - requestStartedAt;
              const { rawBids, bannerBids, uniqueAuctionIds } = collectSnapshot();
              const auctionId = resolveAuctionId(preferredAuctionId, bannerBids, uniqueAuctionIds);
              const finalBannerBids = auctionId
                ? bannerBids.filter((bid) => bid.auctionId === auctionId)
                : bannerBids;
              const result = this.buildPrebidFinalResult({
                status: finalBannerBids.length > 0 ? "prebid_done" : timedOut ? "prebid_timeout" : "prebid_done_no_bids",
                auctionId,
                timedOut,
                bidCount: rawBids.length,
                bannerBidCount: finalBannerBids.length,
                resolvedBy,
                waitedMs,
                hadUsableBannerBids: finalBannerBids.length > 0,
              });
              logInimage(`[Inimage:Prebid] prebid_final_state`, result);
              window.pbjs.setTargetingForGPTAsync([configuration.code]);
              finish(result);
            };

            window.pbjs.que.push(() => {
              if (this.node.isClosed()) {
                finish(this.buildPrebidFinalResult({
                  status: "prebid_skipped_closed",
                  resolvedBy: "node_closed",
                }));
                return;
              }
              const queuedMissing = this.getPrebidMissingHelpers();
              if (queuedMissing.length) {
                warnInimage(`[Inimage:Prebid] pbjs became unavailable inside queue`, {
                  missing: queuedMissing,
                  helper: "pbjs.que",
                });
                finish(this.buildPrebidFinalResult({
                  status: "prebid_not_ready",
                  resolvedBy: "queue_readiness",
                  waitedMs: Date.now() - requestStartedAt,
                }));
                return;
              }
              try {
                this.registerPrebidAdUnit(configuration);
                logInimage(`[Inimage:Prebid] prebid_request_started`, {
                  code: configuration.code,
                  timeout,
                  graceMs,
                  watchdogMs,
                  knownAuctionIds: Array.from(knownAuctionIds),
                  readinessWaitMs: readiness.waitedMs,
                  readinessAttempts: readiness.attempts,
                });
                timeoutLogTimer = setTimeout(() => {
                  if (settled || bidsBackHandlerSeen) return;
                  warnInimage(`[Inimage:Prebid] prebid_timeout_reached`, {
                    stage: "provisional",
                    resolvedBy: "watchdog_pending_callback",
                    waitedMs: Date.now() - requestStartedAt,
                    timeout,
                    graceMs,
                    watchdogMs,
                  });
                }, timeout + graceMs);
                safetyTimer = setTimeout(() => {
                  const timeoutResult = this.buildPrebidFinalResult({
                    status: "prebid_timeout",
                    timedOut: true,
                    resolvedBy: bidsBackHandlerSeen ? "watchdog_after_callback" : "watchdog_no_callback",
                    waitedMs: Date.now() - requestStartedAt,
                  });
                  warnInimage(`[Inimage:Prebid] prebid_timeout_reached`, {
                    stage: "final",
                    ...timeoutResult,
                  });
                  finish(timeoutResult);
                }, timeout + graceMs + watchdogMs);
                window.pbjs.requestBids({
                  timeout,
                  adUnitCodes: [configuration.code],
                  bidsBackHandler: (bidResponses, timedOut, auctionIdParam) => {
                    bidsBackHandlerSeen = true;
                    if (timeoutLogTimer) {
                      clearTimeout(timeoutLogTimer);
                      timeoutLogTimer = null;
                    }
                    if (safetyTimer) {
                      clearTimeout(safetyTimer);
                      safetyTimer = null;
                    }
                    if (this.node.isClosed()) {
                      finish(this.buildPrebidFinalResult({
                        status: "prebid_skipped_closed",
                        resolvedBy: "node_closed",
                      }));
                      return;
                    }
                    const { rawBids, bannerBids, uniqueAuctionIds } = collectSnapshot();
                    const newAuctionIds = rawBids
                      .map((bid) => bid.auctionId)
                      .filter((auctionId) => auctionId && !knownAuctionIds.has(auctionId));
                    const resolvedAuctionId =
                      auctionIdParam ||
                      (bannerBids.length === 1 && bannerBids[0].auctionId ? bannerBids[0].auctionId : null) ||
                      (uniqueAuctionIds.length === 1 ? uniqueAuctionIds[0] : null) ||
                      (newAuctionIds.length > 0 ? newAuctionIds[newAuctionIds.length - 1] : null) ||
                      null;
                    logInimage(`[Inimage:Prebid] bidsBackHandler resolved`, {
                      timedOut,
                      auctionIdParam,
                      resolvedAuctionId,
                      bidCount: rawBids.length,
                      bannerBidCount: bannerBids.length,
                      waitedMs: Date.now() - requestStartedAt,
                    });
                    if (timedOut && graceMs > 0) {
                      logInimage(`[Inimage:Prebid] prebid_grace_window_started`, {
                        auctionId: resolvedAuctionId,
                        timedOut,
                        bidCount: rawBids.length,
                        bannerBidCount: bannerBids.length,
                        graceMs,
                      });
                      graceTimer = setTimeout(() => {
                        logInimage(`[Inimage:Prebid] prebid_grace_window_finished`, {
                          auctionId: resolvedAuctionId,
                          waitedMs: Date.now() - requestStartedAt,
                          graceMs,
                        });
                        finalizeWithSnapshot({
                          resolvedBy: "bidsBackHandler_grace",
                          timedOut: true,
                          preferredAuctionId: resolvedAuctionId,
                        });
                      }, graceMs);
                      return;
                    }
                    finalizeWithSnapshot({
                      resolvedBy: "bidsBackHandler",
                      timedOut,
                      preferredAuctionId: resolvedAuctionId,
                    });
                  },
                });
              } catch (e) {
                warnInimage(`[Inimage:Prebid] exception in pbjs queue`, e);
                finish(this.buildPrebidFinalResult({
                  status: "prebid_error",
                  resolvedBy: "exception",
                  waitedMs: Date.now() - requestStartedAt,
                }));
              }
            });
          });
        }

        getPrebidReadinessConfig() {
          const readinessCfg = this.config.prebid?.readiness || {};
          return {
            intervalMs: readinessCfg.intervalMs || 100,
            maxRetries: readinessCfg.maxRetries ?? 12,
            maxWaitMs: readinessCfg.maxWaitMs || 1200,
          };
        }

        getPrebidGraceMs() {
          return this.config.prebid?.graceMs ?? 200;
        }

        buildPrebidFinalResult({
          status = "prebid_done",
          auctionId = null,
          timedOut = false,
          bidCount = 0,
          bannerBidCount = 0,
          resolvedBy = "unknown",
          waitedMs = 0,
          hadUsableBannerBids = false,
        } = {}) {
          return {
            status,
            auctionId,
            timedOut,
            bidCount,
            bannerBidCount,
            resolvedBy,
            waitedMs,
            hadUsableBannerBids,
          };
        }

        getPrebidMissingHelpers() {
          const missing = [];
          const pb = window.pbjs;
          if (!pb) {
            return ["window.pbjs"];
          }
          if (!pb.que || typeof pb.que.push !== "function") missing.push("window.pbjs.que");
          if (typeof pb.requestBids !== "function") missing.push("window.pbjs.requestBids");
          if (typeof pb.getBidResponsesForAdUnitCode !== "function") missing.push("window.pbjs.getBidResponsesForAdUnitCode");
          if (typeof pb.setTargetingForGPTAsync !== "function") missing.push("window.pbjs.setTargetingForGPTAsync");
          return missing;
        }

        waitForPrebidReady(helperName = "unknown") {
          const { intervalMs, maxRetries, maxWaitMs } = this.getPrebidReadinessConfig();
          const startedAt = Date.now();
          let attempts = 0;

          return new Promise((resolve) => {
            const check = () => {
              const missing = this.getPrebidMissingHelpers();
              const waitedMs = Date.now() - startedAt;
              if (!missing.length) {
                logInimage(`[Inimage:Prebid] pbjs ready`, {
                  helper: helperName,
                  waitedMs,
                  attempts,
                });
                resolve({ ready: true, missing: [], waitedMs, attempts, helper: helperName });
                return;
              }

              logInimage(`[Inimage:Prebid] pbjs readiness pending`, {
                helper: helperName,
                missing,
                pbjsExists: !!window.pbjs,
                waitedMs,
                attempts,
              });

              if (attempts >= maxRetries || waitedMs >= maxWaitMs || this.node.isClosed()) {
                resolve({
                  ready: false,
                  missing,
                  pbjsExists: !!window.pbjs,
                  waitedMs,
                  attempts,
                  helper: helperName,
                  maxRetries,
                  maxWaitMs,
                });
                return;
              }

              attempts += 1;
              setTimeout(check, Math.min(intervalMs, Math.max(0, maxWaitMs - waitedMs)));
            };

            check();
          });
        }

        shouldRetryAfterPrebidReadiness(trigger) {
          return !this._prebidReadinessRetryUsed &&
            trigger !== "refresh" &&
            trigger !== "prebid_readiness_retry" &&
            this._lastPrebidStatus === "prebid_not_ready";
        }

        schedulePrebidReadinessRetry() {
          this._prebidReadinessRetryUsed = true;
          this.node.recordTelemetry("prebid_readiness_retry", { slotId: this.node.id });
          this.node.destroyDisplayForRetry();
          this.container.hide();
          this.prebidStarted = false;
          this.timer = setTimeout(() => {
            if (this.node.isClosed()) {
              logInimage(`[Inimage:Auction:${this.node.id}] Prebid readiness retry skipped — node closed`);
              return;
            }
            logInimage(`[Inimage:Auction:${this.node.id}] Prebid readiness retry firing`);
            this.startAuction("prebid_readiness_retry");
          }, 250);
        }

        getBestDisplayBid(code, prebidResult = null) {
          if (!window.pbjs || !code) return null;
          const rawBids = window.pbjs.getBidResponsesForAdUnitCode(code)?.bids || [];
          const bannerBids = rawBids.filter((bid) => (bid.mediaType === "banner" || !bid.mediaType));
          const uniqueAuctionIds = Array.from(new Set(bannerBids.map((bid) => bid.auctionId).filter(Boolean)));
          const resolvedAuctionId =
            prebidResult?.auctionId ||
            this._currentAuctionId ||
            (bannerBids.length === 1 && bannerBids[0].auctionId ? bannerBids[0].auctionId : null) ||
            (uniqueAuctionIds.length === 1 ? uniqueAuctionIds[0] : null);
          if (!resolvedAuctionId) {
            logInimage(`[Inimage:Prebid] best_display_bid_missing`, {
              reason: "no_final_auction_id",
              bidCount: rawBids.length,
              bannerBidCount: bannerBids.length,
              prebidResult,
            });
            return null;
          }
          logInimage(`[Inimage:Prebid] filtering bids by auctionId`, {
            code,
            currentAuctionId: resolvedAuctionId,
            rawBidCount: rawBids.length,
          });
          const bids = bannerBids
            .filter((bid) => bid.auctionId === resolvedAuctionId)
            .sort((a, b) => b.cpm - a.cpm);
          logInimage(`[Inimage:Prebid] filtered banner bids`, bids.map((bid) => ({
            bidderCode: bid.bidderCode,
            cpm: bid.cpm,
            auctionId: bid.auctionId,
          })));
          if (!bids.length) {
            logInimage(`[Inimage:Prebid] best_display_bid_missing`, {
              reason: "no_banner_bids_for_final_auction",
              auctionId: resolvedAuctionId,
              bidCount: rawBids.length,
              bannerBidCount: bannerBids.length,
              prebidResult,
            });
            return null;
          }
          return bids[0] || null;
        }

        executeAmazonTam(configuration) {
          return new Promise((resolve) => {
            if (this.node.isClosed()) {
              logInimage(`[Inimage:TAM] skipped â€” node closed`);
              resolve(null);
              return;
            }
            if (!window.apstag || typeof window.apstag.fetchBids === "undefined") {
              logInimage(`[Inimage:TAM] apstag unavailable — skipping`);
              resolve(null);
              return;
            }

            logInimage(`[Inimage:TAM] fetchBids request`, configuration);
            const safetyTimer = setTimeout(() => {
              warnInimage(`[Inimage:TAM] safety timeout`);
              resolve("tam_timeout");
            }, 2000);
            try {
              window.apstag.fetchBids(configuration, () => {
                clearTimeout(safetyTimer);
                if (this.node.isClosed()) {
                  resolve(null);
                  return;
                }
                try {
                  window.apstag.setDisplayBids();
                  logInimage(`[Inimage:TAM] setDisplayBids applied`);
                } catch (err) {
                  warnInimage(`[Inimage:TAM] setDisplayBids failed`, err);
                }
                resolve("tam_done");
              });
            } catch (err) {
              clearTimeout(safetyTimer);
              warnInimage(`[Inimage:TAM] fetchBids threw`, err);
              resolve("tam_error");
            }
          });
        }

        getTAMConfiguration() {
          if (this.config.tam?.enabled === false) return null;
          const slotId = this.node.id;
          const slotName = this.node.manager.adUnitPath || "";
          const sizes = this.getDisplaySizes().filter((s) => s !== "fluid" && s[0] > 1);
          if (!slotId || !slotName || !sizes.length) return null;
          return {
            slots: [
              {
                slotID: slotId,
                slotName: `/${this.node.manager.networkId}/${slotName}`,
                sizes,
              },
            ],
          };
        }

        buildOrtb2Imp(adUnitCode) {
          const networkId = this.gexp.cfg.networkId || "99071977";
          const adUnitPath = this.node.manager.adUnitPath || "";
          const fullAdSlot = `/${networkId}/${adUnitPath}`;
          const pbadslot = `${fullAdSlot}#${adUnitCode}`;
          return {
            ext: {
              data: {
                adserver: {
                  name: "gam",
                  adslot: fullAdSlot,
                },
                pbadslot,
              },
              gpid: pbadslot,
            },
          };
        }

        registerPrebidAdUnit(configuration) {
          const pb = window.pbjs;
          if (!pb) return;
          try {
            googletag.cmd.push(() => {
              const gptSlots = googletag.pubads().getSlots();
              gptSlots.forEach((slot) => {
                if (slot.getSlotElementId() === configuration.code || slot.getSlotElementId()?.startsWith("gexp-inimage")) {
                  const tMap = slot.getTargetingMap();
                  Object.keys(tMap).forEach((key) => {
                    if (key.startsWith("hb_")) {
                      slot.clearTargeting(key);
                    }
                  });
                }
              });
            });
          } catch (e) {}
          pb.removeAdUnit(configuration.code);
          pb.addAdUnits([configuration]);
          logInimage(`[Inimage:Prebid] adUnit registered`, { code: configuration.code });
        }

        registerPrebidAliases() {
          if (this._aliasesRegistered) return;
          this._aliasesRegistered = true;

          const networkId = this.gexp.cfg.networkId;
          const prebidNetworks = this.config.prebid?.networks || {};
          const targetNetwork = prebidNetworks[networkId] || prebidNetworks.default || {};
          const aliases = targetNetwork.aliases;
          if (!aliases || !window.pbjs) {
            logInimage(`[Inimage:Prebid] no aliases to register`);
            return;
          }

          window.pbjs.que.push(() => {
            try {
              for (const [alias, original] of Object.entries(aliases)) {
                if (typeof window.pbjs.aliasBidder === "function") {
                  window.pbjs.aliasBidder(original, alias);
                }
              }
              logInimage(`[Inimage:Prebid] aliases registered`, aliases);
            } catch (e) {
              warnInimage(`[Inimage:Prebid] failed to configure aliases`, e);
            }
          });
        }

        getPrebidTimeout() {
          return this.config.prebid?.timeoutMs || 1000;
        }

        getDisplaySizes() {
          const sizes = this.config.display?.sizes;
          if (Array.isArray(sizes) && sizes.length) return sizes;
          return [[300, 250]];
        }
      }
      const INIMAGE_CONTENT_TYPE_MAP = {
        n: "noticia",
        noticia: "noticia",
        dir: "directo",
        directo: "directo",
        ne: "noticia-especial",
        "noticia-especial": "noticia-especial",
        cro: "cronica",
        cronica: "cronica",
        o: "opinion",
        opinion: "opinion",
      };

      function inimageEscapeRegex(str = "") {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }

      function inimageDeepMerge(target, source) {
        const isObject = (obj) =>
          obj && typeof obj === "object" && !Array.isArray(obj);
        if (!isObject(target) || !isObject(source)) {
          return source;
        }
        const merged = Object.assign({}, target);
        Object.keys(source).forEach((key) => {
          if (isObject(source[key]) && isObject(merged[key])) {
            merged[key] = inimageDeepMerge(merged[key], source[key]);
          } else {
            merged[key] = source[key];
          }
        });
        return merged;
      }

      class InimageManager {
        constructor(config, gexpInstance) {
          this.config = config;
          this.gexp = gexpInstance;
          this.nodes = [];
          this.siteContext = this.getSiteContext();
          this.siteConfig = this.resolveSiteConfig();
          this.adUnitPath = this.extractStaticAdUnitPath();
          this.networkId = this.config?.networkId || "99071977";
          this.processedFigures = new WeakSet();
          ensureInimageBaseStyles();

          if (this.siteConfig?.debug === true) {
            window.gexpInimageDebug = true;
          }

          groupInimage(`[InimageManager] bootstrap`);
          logInimage(`[InimageManager] site context`, this.siteContext);
          logInimage(`[InimageManager] resolved siteConfig`, this.siteConfig);

          if (!this.gexp.isEnabled()) {
            logInimage(`[InimageManager] execution skipped — gexp disabled`);
            groupEndInimage();
            return;
          }
          if (!this.siteConfig) {
            logInimage(`[InimageManager] execution skipped — no siteConfig`);
            groupEndInimage();
            return;
          }
          if (this.siteConfig?.domainFilter?.enabled && !this.passesDomainFilter()) {
            groupEndInimage();
            return;
          }

          const allowedTypes = this.siteConfig.allowedContentTypes || [];
          logInimage(`[InimageManager] detected contentType="${this.siteContext.contentType}" allowed=${allowedTypes.join(",") || "all"}`);
          if (allowedTypes.length > 0 && !allowedTypes.includes(this.siteContext.contentType)) {
            logInimage(`[InimageManager] execution skipped — contentType not allowed`);
            groupEndInimage();
            return;
          }
          if (this.siteConfig?.exclusions?.disableAll === true) {
            logInimage(`[InimageManager] execution skipped — exclusions.disableAll=true`);
            groupEndInimage();
            return;
          }

          const launchInimagePositions = () => {
            logInimage(`[InimageManager] DOM ready -> launch inimage positions`);
            googletag.cmd.push(() => {
              this.resolveAdUnit();
              this.siteContext.contentType = this.detectContentType();
              logInimage(`[InimageManager] contentType resolved for launch`, this.siteContext.contentType);
              this.siteConfig = this.resolveContentTypeProfile(this.siteConfig, this.siteContext.contentType);
              logInimage(`[InimageManager] siteConfig after contentType profile`, this.siteConfig);
              if (this.isBlockedByExclusions()) {
                groupEndInimage();
                return;
              }
              if (!this.isAllowedByInclusions()) {
                groupEndInimage();
                return;
              }
              this.createInimagePositions();

              const infiniteScrollTypes = ["noticia", "noticia-especial"];
              if (this.siteConfig?.infiniteScroll?.enabled && infiniteScrollTypes.includes(this.siteContext.contentType)) {
                logInimage(`[InimageManager] nav-continua enabled for contentType=${this.siteContext.contentType}`);
                this.startNavContinuaObserver();
              } else {
                logInimage(`[InimageManager] nav-continua not started`, {
                  enabled: this.siteConfig?.infiniteScroll?.enabled,
                  contentType: this.siteContext.contentType,
                });
              }
              groupEndInimage();
            });
          };

          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", launchInimagePositions);
          } else {
            launchInimagePositions();
          }
        }

        extractStaticAdUnitPath() {
          const devPath = window.GEXP_DEV_CONFIG?.inimageSites?.default?.general?.display?.adUnitPath;
          if (devPath) return devPath;
          if (typeof data !== "undefined" && data?.adSlots?.[0]?.adUnit) return data.adSlots[0].adUnit;
          if (typeof ueDFPData !== "undefined" && ueDFPData?.adSlots?.[0]?.adUnit) return ueDFPData.adSlots[0].adUnit;
          return this.config?.adUnit || "";
        }

        getSiteContext() {
          const dl = ((typeof window !== "undefined" ? (window.ueDataLayer || window.utag_data) : null) || {});
          return {
            site: dl.be_page_domain || window.location.hostname,
            section: dl.be_page_section || null,
            subsection: dl.be_page_subsection1 || null,
            contentType: this.detectContentType(),
          };
        }

        detectContentType(rootElement = null) {
          const dl = ((typeof window !== "undefined" ? (window.ueDataLayer || window.utag_data) : null) || {});
          if (dl.be_page_content_type) {
            return INIMAGE_CONTENT_TYPE_MAP[dl.be_page_content_type] || dl.be_page_content_type;
          }
          try {
            if (typeof googletag !== "undefined" && googletag.pubads && typeof googletag.pubads === "function") {
              const ctValues = googletag.pubads().getTargeting("ct");
              if (ctValues && ctValues.length > 0) {
                return INIMAGE_CONTENT_TYPE_MAP[ctValues[0]] || ctValues[0];
              }
            }
          } catch (e) {}
          const root = rootElement || document;
          if (root.querySelector(".ue-c-streamlive__body")) return "directo";
          if (root.querySelector(".ue-l-article__main-column")) return "noticia";
          return "noticia";
        }

        resolveContentTypeProfile(baseConfig, contentType) {
          const profiles = baseConfig?.contentTypes;
          if (!profiles || !contentType || !profiles[contentType]) return baseConfig;
          return inimageDeepMerge(baseConfig, profiles[contentType]);
        }

        resolveSiteConfig() {
          const siteConfigs = this.config?.inimageSites;
          if (!siteConfigs) return null;
          const hostname = this.siteContext.site.replace("www.", "");
          const baseConfig = siteConfigs[hostname] || siteConfigs.default;
          if (!baseConfig?.general) return null;

          let resolved = JSON.parse(JSON.stringify(baseConfig.general));
          const overrides = Array.isArray(baseConfig.overrides) ? baseConfig.overrides : [];
          overrides.forEach((override) => {
            if (this.matchesOverrideConditions(override?.if)) {
              resolved = inimageDeepMerge(resolved, override?.then || {});
            }
          });
          resolved.__siteContext = this.siteContext;
          return resolved;
        }

        matchesOverrideConditions(conditions) {
          if (!Array.isArray(conditions) || conditions.length === 0) return false;
          return conditions.some((condition) => this.evaluateCondition(condition));
        }

        evaluateCondition(conditionStr = "") {
          const [key, value] = conditionStr.split(":");
          if (!key || typeof value === "undefined") return false;
          switch (key.trim()) {
            case "device": {
              const dl = ((typeof window !== "undefined" ? (window.ueDataLayer || window.utag_data) : null) || {});
              const isMobileVar = dl.device_category === "mobile" || dl.be_page_site_version === "mobile" || this.gexp.isMobileDevice();
              if (value.trim() === "mobile") return isMobileVar;
              if (value.trim() === "desktop") return !isMobileVar;
              return false;
            }
            case "contentType":
              return this.siteContext.contentType === value.trim();
            case "url":
              return this.matchUrlCondition(value.trim());
            default:
              return false;
          }
        }

        matchUrlCondition(pattern) {
          if (!pattern) return false;
          const url = window.location?.pathname || "";
          if (pattern === "*") return true;
          const regex = new RegExp("^" + pattern.split("*").map((part) => inimageEscapeRegex(part)).join(".*") + "$");
          return regex.test(url);
        }

        passesDomainFilter() {
          const filter = this.siteConfig?.domainFilter;
          if (!filter || filter.allowedDomains === "all") {
            logInimage(`[InimageManager] domainFilter pass — allowedDomains=all or disabled`);
            return true;
          }
          let currentDomain = null;
          const dl = window[filter.dataLayerObj] || window.utag_data;
          if (dl) {
            const dlData = Array.isArray(dl) ? dl[0] : dl;
            currentDomain = dlData?.[filter.dataLayerProp] || null;
          }
          if (!currentDomain && window.location) currentDomain = window.location.hostname;
          const allowed = filter.allowedDomains.some((domain) => String(currentDomain || "").includes(domain));
          if (!allowed) {
            logInimage(`[InimageManager] ❌ blocked by domainFilter`, {
              currentDomain,
              allowedDomains: filter.allowedDomains,
            });
          } else {
            logInimage(`[InimageManager] ✅ domainFilter passed`, {
              currentDomain,
              allowedDomains: filter.allowedDomains,
            });
          }
          return allowed;
        }

        resolveAdUnit() {
          let source = "config_fallback";
          let resolvedPath = this.adUnitPath;
          let resolvedNetworkId = this.networkId;

          try {
            const slots = googletag.pubads().getSlots();
            if (slots && slots.length > 0) {
              const refSlot = slots.find((s) => {
                const elId = s.getSlotElementId() || "";
                if (elId.startsWith("gexp-intext") || elId.startsWith("gexp-inimage")) return false;
                const path = s.getAdUnitPath() || "";
                if (/\/p_/.test(path)) return false;
                return true;
              }) || slots[0];

              const fullPath = refSlot.getAdUnitPath();
              if (fullPath) {
                const parts = fullPath.replace(/^\//, "").split("/");
                if (parts.length >= 2) {
                  resolvedNetworkId = parts[0];
                  resolvedPath = parts.slice(1).join("/").replace(/\bp_/g, "");
                  source = `gpt_slot(${refSlot.getSlotElementId()})`;
                }
              }
            }
          } catch (e) {}

          if (!resolvedPath && this.siteConfig?.display?.adUnitPath) {
            resolvedPath = this.siteConfig.display.adUnitPath;
            source = "config_display_fallback";
          }

          this.adUnitPath = resolvedPath;
          this.networkId = resolvedNetworkId;

          const networkOverrides = this.siteConfig?.networks?.[this.networkId];
          if (networkOverrides) {
            this.siteConfig = inimageDeepMerge(this.siteConfig, networkOverrides);
            logInimage(`[InimageManager] applied network overrides`, {
              networkId: this.networkId,
              keys: Object.keys(networkOverrides),
            });
          }
          logInimage(`[InimageManager] AdUnit resolved: ${this.adUnitPath} (source: ${source})`);
          logInimage(`[InimageManager] Network resolved: ${this.networkId}`);
        }

        getPageAdUnitPath() {
          if (typeof data !== "undefined" && data?.adSlots?.[0]?.adUnit) return data.adSlots[0].adUnit;
          if (typeof ueDFPData !== "undefined" && ueDFPData?.adSlots?.[0]?.adUnit) return ueDFPData.adSlots[0].adUnit;
          return this.adUnitPath || null;
        }

        getPageCustomTargeting() {
          if (typeof data !== "undefined" && data?.customTargeting) return data.customTargeting;
          if (typeof ueDFPData !== "undefined" && ueDFPData?.customTargeting) return ueDFPData.customTargeting;
          try {
            if (typeof googletag !== "undefined" && googletag.pubads && typeof googletag.pubads === "function") {
              const pubads = googletag.pubads();
              if (pubads && typeof pubads.getTargetingKeys === "function") {
                const keys = pubads.getTargetingKeys();
                if (keys && keys.length > 0) {
                  const targeting = {};
                  keys.forEach((key) => {
                    const values = pubads.getTargeting(key);
                    targeting[key] = values && values.length === 1 ? values[0] : values;
                  });
                  return targeting;
                }
              }
            }
          } catch (e) {}
          if (typeof window !== "undefined" && (window.ueDataLayer || window.utag_data)) return window.ueDataLayer || window.utag_data;
          return null;
        }

        normalizeTargetingValues(rawValue) {
          if (rawValue === undefined || rawValue === null) return [];
          if (Array.isArray(rawValue)) {
            return rawValue
              .flatMap((value) => this.normalizeTargetingValues(value))
              .filter((value) => value !== "");
          }
          if (typeof rawValue === "string" && rawValue.includes(",")) {
            return rawValue
              .split(",")
              .map((value) => String(value).trim())
              .filter(Boolean);
          }
          return [String(rawValue).trim()].filter(Boolean);
        }

        isBlockedByExclusions() {
          const excl = this.siteConfig?.exclusions;
          if (!excl) return false;
          if (excl.disableAll === true) {
            logInimage(`[InimageManager] ❌ blocked by exclusions.disableAll=true`);
            return true;
          }
          if (Array.isArray(excl.adUnitPaths) && excl.adUnitPaths.length > 0) {
            const pageAdUnit = this.getPageAdUnitPath();
            const matchedPath = pageAdUnit && excl.adUnitPaths.find((blockedPath) => pageAdUnit.startsWith(blockedPath));
            if (matchedPath) {
              logInimage(`[InimageManager] ❌ blocked by exclusions.adUnitPaths`, { pageAdUnit, matchedPath });
              return true;
            }
          }
          if (excl.keyValues && typeof excl.keyValues === "object") {
            const pageTargeting = this.getPageCustomTargeting();
            if (pageTargeting) {
              for (const [key, blockedValues] of Object.entries(excl.keyValues)) {
                if (!Array.isArray(blockedValues) || blockedValues.length === 0) continue;
                const rawPageValue = pageTargeting[key];
                if (rawPageValue === undefined || rawPageValue === null) continue;
                const pageValues = this.normalizeTargetingValues(rawPageValue);
                const matchedValue = blockedValues.find((blocked) => pageValues.includes(String(blocked)));
                if (matchedValue) {
                  logInimage(`[InimageManager] ❌ blocked by exclusions.keyValues`, { key, matchedValue, pageValues });
                  return true;
                }
              }
            }
          }
          return false;
        }

        isAllowedByInclusions() {
          const inc = this.siteConfig?.inclusions;
          if (!inc) return true;
          if (inc.keyValues && typeof inc.keyValues === "object" && Object.keys(inc.keyValues).length > 0) {
            const pageTargeting = this.getPageCustomTargeting();
            if (pageTargeting) {
              for (const [key, allowedValues] of Object.entries(inc.keyValues)) {
                if (!Array.isArray(allowedValues) || allowedValues.length === 0) continue;
                const rawPageValue = pageTargeting[key];
                if (rawPageValue === undefined || rawPageValue === null) continue;
                const pageValues = this.normalizeTargetingValues(rawPageValue);
                const matchedValue = allowedValues.find((allowed) => pageValues.includes(String(allowed)));
                if (matchedValue) {
                  logInimage(`[InimageManager] ✅ allowed by inclusions.keyValues`, { key, matchedValue, pageValues });
                  return true;
                }
              }
            }
            logInimage(`[InimageManager] ❌ blocked by inclusions.keyValues — no allowed values found`);
            return false;
          }
          return true;
        }

        isSlotDisabledByExclusion(index, configScope = this.siteConfig) {
          const ds = configScope?.exclusions?.disableSlots;
          if (!ds) return false;
          if (Array.isArray(ds) && ds.includes(index)) return true;
          if (Array.isArray(ds.always) && ds.always.includes(index)) return true;
          return false;
        }

        getSlotId(index, pncSuffix = "") {
          const base = index === 0 ? "gexp-inimage" : `gexp-inimage-${index + 1}`;
          return pncSuffix ? `${base}${pncSuffix}` : base;
        }

        buildPlacementList(rootElement, scopedConfig) {
          const slotsConfig = scopedConfig.slots || {};
          const mode = slotsConfig.mode || (slotsConfig.maxSlots > 1 ? "multi" : "first_image_only");
          const maxSlots = slotsConfig.maxSlots ?? Infinity;
          logInimage(`[InimageManager] buildPlacementList`, {
            mode,
            maxSlots,
            rootNavIndex: rootElement?.dataset?.ueNavindex || null,
          });
          const engine = new InimagePlacementEngine(scopedConfig.dom, scopedConfig.eligibility, rootElement);
          const placements = engine.findPlacements({
            maxSlots,
            firstOnly: mode === "first_image_only",
          });

          return placements.filter((placement, idx) => {
            if (this.processedFigures.has(placement.figure)) {
              logInimage(`[InimageManager] placement[${idx}] skipped — duplicated figure already processed`);
              return false;
            }
            this.processedFigures.add(placement.figure);
            return true;
          });
        }

        createInimagePositions() {
          try {
            groupInimage(`[InimageManager] createInimagePositions`);
            const placements = this.buildPlacementList(document, this.siteConfig);
            logInimage(`[InimageManager] placements discovered=${placements.length}`);
            this.createNodesFromPlacements(placements, this.siteConfig, "");
            groupEndInimage();
          } catch (err) {
            errorInimage(`[InimageManager] Failed to create positions`, err);
          }
        }

        createNodesFromPlacements(placements, scopedConfig, pncSuffix = "", navIndex = null) {
          if (!placements.length) {
            logInimage(`[InimageManager] no placements to convert into nodes`, { navIndex, pncSuffix });
            return;
          }
          const slotsConfig = scopedConfig.slots;
          const maxSlots = slotsConfig?.maxSlots ?? Infinity;
          let slotsCreated = 0;
          const newNodes = [];

          placements.forEach((placement, index) => {
            if (slotsCreated >= maxSlots) {
              logInimage(`[InimageManager] placement[${index}] skipped — maxSlots reached (${maxSlots})`);
              return;
            }
            if (slotsConfig) {
              if (!slotsConfig.enabled) {
                logInimage(`[InimageManager] placement[${index}] skipped — slots.enabled=false`);
                return;
              }
              if (slotsConfig.enabledSlots && !slotsConfig.enabledSlots.includes(index)) {
                logInimage(`[InimageManager] placement[${index}] skipped — not in enabledSlots`);
                return;
              }
            }
            if (this.isSlotDisabledByExclusion(index, scopedConfig)) {
              logInimage(`[InimageManager] placement[${index}] skipped — disableSlots exclusion`);
              return;
            }

            let nodeConfig = scopedConfig;
            const slotOverrides = scopedConfig.slotOverrides?.[String(index)];
            if (slotOverrides) {
              nodeConfig = JSON.parse(JSON.stringify(scopedConfig));
              Object.keys(slotOverrides).forEach((section) => {
                if (typeof slotOverrides[section] === "object" && !Array.isArray(slotOverrides[section])) {
                  nodeConfig[section] = { ...(nodeConfig[section] || {}), ...slotOverrides[section] };
                } else {
                  nodeConfig[section] = slotOverrides[section];
                }
              });
              logInimage(`[InimageManager] slotOverrides applied to slot[${index}]`, slotOverrides);
            }

            const slotId = this.getSlotId(index, pncSuffix);
            const node = new InimageNode({
              id: slotId,
              config: nodeConfig,
              manager: this,
              placement,
              slotIndex: index,
              navIndex,
            });
            this.nodes.push(node);
            newNodes.push(node);
            slotsCreated += 1;
            logInimage(`[InimageManager] node created`, { slotId, navIndex, slotIndex: index });
          });

          newNodes.forEach((node) => node.initialize());
          logInimage(`[InimageManager] nodes initialized=${newNodes.length}`, { navIndex, pncSuffix });
        }

        startNavContinuaObserver() {
          const isConfig = this.siteConfig?.infiniteScroll;
          if (!isConfig?.enabled) return;

          this._processedNavIndexes = new Set([0]);
          logInimage(`[InimageManager:NavContinua] observer start`, {
            mainSelector: isConfig.mainSelector,
            maxArticles: isConfig.maxArticles || 5,
          });
          const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;
                const mains = node.matches?.(isConfig.mainSelector)
                  ? [node]
                  : Array.from(node.querySelectorAll?.(isConfig.mainSelector) || []);

                for (const mainEl of mains) {
                  const navIndex = parseInt(mainEl.dataset.ueNavindex, 10);
                  if (isNaN(navIndex) || navIndex === 0) {
                    logInimage(`[InimageManager:NavContinua] ignored main without usable navIndex`);
                    continue;
                  }
                  if (this._processedNavIndexes.has(navIndex)) {
                    logInimage(`[InimageManager:NavContinua] navIndex=${navIndex} ignored — already processed`);
                    continue;
                  }
                  if (this._processedNavIndexes.size > (isConfig.maxArticles || 5)) {
                    logInimage(`[InimageManager:NavContinua] navIndex=${navIndex} ignored — maxArticles reached`);
                    continue;
                  }
                  this._processedNavIndexes.add(navIndex);
                  requestAnimationFrame(() => {
                    groupInimage(`[InimageManager:NavContinua] navIndex=${navIndex}`);
                    googletag.cmd.push(() => {
                      const allSlots = googletag.pubads().getSlots();
                      const mainSlots = allSlots.filter((slot) => {
                        const el = document.getElementById(slot.getSlotElementId());
                        return el && mainEl.contains(el);
                      });
                      logInimage(`[InimageManager:NavContinua] scoped GPT slots=${mainSlots.length}`);
                      const ncTargeting = mainSlots.some((slot) => {
                        const val = slot.getTargeting("nc");
                        if (Array.isArray(val)) return val.includes("1");
                        return val === "1";
                      });
                      if (!ncTargeting) {
                        logInimage(`[InimageManager:NavContinua] navIndex=${navIndex} skipped: no nc=1 GPT slot found in scoped main`);
                        groupEndInimage();
                        return;
                      }
                      logInimage(`[InimageManager:NavContinua] navIndex=${navIndex} accepted — nc=1 found`);
                      this.onNewArticleDetected(mainEl, navIndex);
                      groupEndInimage();
                    });
                  });
                }
              }
            }
          });

          observer.observe(document.body, { childList: true, subtree: true });
        }

        onNewArticleDetected(mainElement, navIndex) {
          const isConfig = this.siteConfig?.infiniteScroll;
          if (!isConfig) return;

          let scrollConfig = inimageDeepMerge({ ...this.siteConfig }, {});
          const contentType = this.detectContentType(mainElement);
          logInimage(`[InimageManager:NavContinua] navIndex=${navIndex} contentType="${contentType}"`);
          const ctProfile = this.siteConfig?.contentTypes?.[contentType];
          if (ctProfile) scrollConfig = inimageDeepMerge(scrollConfig, ctProfile);
          if (isConfig.overrides) scrollConfig = inimageDeepMerge(scrollConfig, isConfig.overrides);

          const pncSuffix = navIndex >= 1 ? `-pnc-${navIndex}` : "";
          const placements = this.buildPlacementList(mainElement, scrollConfig);
          logInimage(`[InimageManager:NavContinua] navIndex=${navIndex} placements discovered=${placements.length}`);
          this.createNodesFromPlacements(placements, scrollConfig, pncSuffix, navIndex);
        }
      }
      const INTERSTITIAL_STYLE_ID = "gexp-interstitial-styles";
      const INTERSTITIAL_BASE_STYLES = `
        .gexp-interstitial-shell {
            position: fixed;
            inset: 0;
            z-index: 2147483000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            pointer-events: auto;
            transition: opacity 0.2s ease;
        }
        .gexp-interstitial-shell.is-visible {
            opacity: 1;
            visibility: visible;
        }
        .gexp-interstitial-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(90, 90, 90, 0.58);
            pointer-events: auto;
        }
        .gexp-interstitial-panel {
            position: relative;
            z-index: 1;
            width: min(92vw, 960px);
            max-width: 92vw;
            max-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            border-radius: 12px;
            background: rgba(0, 0, 0, 0.02);
            pointer-events: none;
            box-sizing: border-box;
        }
        .gexp-interstitial-slot {
            position: relative;
            z-index: 1;
            display: none;
            align-items: center;
            justify-content: center;
            min-width: 300px;
            min-height: 250px;
            max-width: 100%;
            max-height: 100%;
            overflow: hidden;
            pointer-events: auto;
        }
        .gexp-interstitial-slot.is-active {
            display: flex;
        }
        .gexp-interstitial-display-stage {
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 100%;
            max-height: 100%;
            box-sizing: border-box;
            margin: auto;
        }
        .gexp-interstitial-slot iframe,
        .gexp-interstitial-slot video,
        .gexp-interstitial-slot .video-js,
        .gexp-interstitial-slot > div {
            max-width: 100%;
            max-height: 100%;
            box-sizing: border-box;
        }
        .gexp-interstitial-hud {
            position: absolute;
            inset: 0;
            z-index: 2147483646;
            pointer-events: none;
        }
        .gexp-interstitial-status,
        .gexp-interstitial-countdown {
            position: absolute;
            top: 8px;
            right: 8px;
            z-index: 2147483646;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 36px;
            min-height: 36px;
            border-radius: 999px;
            background: rgba(17, 17, 17, 0.82);
            color: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 700;
            line-height: 1;
            pointer-events: none;
        }
        .gexp-interstitial-close {
            position: absolute;
            top: 8px;
            right: 8px;
            z-index: 2147483647;
            width: 36px;
            height: 36px;
            display: none;
            align-items: center;
            justify-content: center;
            border: 0;
            border-radius: 999px;
            background: rgba(17, 17, 17, 0.92);
            cursor: pointer;
            pointer-events: auto;
        }
        .gexp-interstitial-close.is-visible {
            display: inline-flex;
        }
        .gexp-interstitial-close::before,
        .gexp-interstitial-close::after {
            content: "";
            position: absolute;
            width: 16px;
            height: 2px;
            border-radius: 999px;
            background: #ffffff;
        }
        .gexp-interstitial-close::before {
            transform: rotate(45deg);
        }
        .gexp-interstitial-close::after {
            transform: rotate(-45deg);
        }
        @media (max-width: 480px), (max-height: 480px) {
            .gexp-interstitial-shell {
                align-items: center;
                justify-content: center;
                padding: 0;
                overflow: hidden;
            }
            .gexp-interstitial-panel {
                width: calc(100vw - 16px);
                max-width: calc(100vw - 16px);
                max-height: calc(100vh - 16px);
                padding: 8px;
                border-radius: 10px;
                overflow: visible;
                align-items: center;
                justify-content: center;
                margin: auto;
            }
            .gexp-interstitial-slot {
                min-width: 0;
                min-height: 0;
                max-width: 100%;
                max-height: calc(100vh - 32px);
                align-items: center;
                justify-content: center;
                margin: auto;
            }
            #gexp-interstitial.gexp-interstitial-slot {
                width: auto;
                max-width: none;
                max-height: none;
                overflow: visible;
            }
            #gexp-interstitial-video.gexp-interstitial-slot {
                width: 100%;
                max-width: 100%;
                max-height: calc(100vh - 32px);
                overflow: hidden;
            }
            #gexp-interstitial-video iframe,
            #gexp-interstitial-video video,
            #gexp-interstitial-video .video-js,
            #gexp-interstitial-video .vjs-tech,
            #gexp-interstitial-video .ima-ad-container {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
                max-height: calc(100vh - 32px) !important;
                box-sizing: border-box;
            }
            .gexp-interstitial-display-stage {
                width: auto;
                max-width: none;
                max-height: none;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: auto;
            }
            .gexp-interstitial-display-stage > div,
            .gexp-interstitial-display-stage iframe {
                box-sizing: border-box;
                margin-left: auto !important;
                margin-right: auto !important;
            }
            #gexp-interstitial-video iframe,
            #gexp-interstitial-video video,
            #gexp-interstitial-video .video-js {
                height: auto;
            }
            .gexp-interstitial-hud {
                position: fixed;
                inset: 0;
                z-index: 2147483646;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
            }
            .gexp-interstitial-status,
            .gexp-interstitial-countdown {
                top: max(8px, env(safe-area-inset-top));
                right: max(8px, env(safe-area-inset-right));
                min-width: 34px;
                min-height: 34px;
                font-size: 13px;
            }
            .gexp-interstitial-close {
                top: max(8px, env(safe-area-inset-top));
                right: max(8px, env(safe-area-inset-right));
                width: 38px;
                height: 38px;
                pointer-events: auto;
                touch-action: manipulation;
            }
        }
        @media (max-width: 480px) and (orientation: landscape) {
            .gexp-interstitial-panel {
                width: calc(100vw - 16px);
                max-width: calc(100vw - 16px);
                max-height: calc(100vh - 12px);
                padding: 6px;
            }
            .gexp-interstitial-slot,
            .gexp-interstitial-slot iframe,
            .gexp-interstitial-slot video,
            .gexp-interstitial-slot .video-js,
            .gexp-interstitial-slot .vjs-tech,
            .gexp-interstitial-slot .ima-ad-container,
            .gexp-interstitial-slot > div {
                max-height: calc(100vh - 24px) !important;
            }
        }
      `;

      let interstitialStylesAttached = false;
      function ensureInterstitialBaseStyles() {
        if (interstitialStylesAttached) return;
        if (typeof document === "undefined") return;
        if (document.getElementById(INTERSTITIAL_STYLE_ID)) {
          interstitialStylesAttached = true;
          return;
        }
        const styleEl = document.createElement("style");
        styleEl.id = INTERSTITIAL_STYLE_ID;
        styleEl.innerHTML = INTERSTITIAL_BASE_STYLES;
        document.head.appendChild(styleEl);
        interstitialStylesAttached = true;
      }

      const interstitialBadgeBase = "color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;";
      const interstitialBadgeLog = `background:#546E7A;${interstitialBadgeBase}`;
      const interstitialBadgeWarn = `background:#EF6C00;${interstitialBadgeBase}`;
      const interstitialBadgeErr = `background:#C62828;${interstitialBadgeBase}`;
      const interstitialContextStyles = {
        manager: "background:#455A64;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;",
        auction: "background:#0277BD;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;",
        video: "background:#6A1B9A;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;",
        display: "background:#2E7D32;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;",
        node: "background:#00897B;color:#fff;border-radius:3px;padding:2px 4px;font-size:10px;font-weight:bold;",
      };

      const getInterstitialDebugState = () => {
        try {
          if (typeof window !== "undefined") {
            if (window.gexpInterstitialDebug === true) return true;
            if (window.location && window.location.search.includes("gexpInterstitialDebug=true")) return true;
            if (window.localStorage && window.localStorage.getItem("gexpInterstitialDebug") === "true") return true;
          }
        } catch (e) {}
        return false;
      };

      if (typeof window !== "undefined") {
        window.gexpInterstitialDebug = getInterstitialDebugState();
      }

      const formatInterstitialLog = (args, defaultBadge) => {
        let mainText = args[0];
        let style1 = defaultBadge;
        if (typeof mainText !== "string") {
          return [`%cINTERSTITIAL`, style1, ...args];
        }

        if (mainText.includes("[InterstitialManager")) {
          style1 = interstitialContextStyles.manager;
        } else if (mainText.includes("[Interstitial:Auction:")) {
          style1 = interstitialContextStyles.auction;
        } else if (mainText.includes("[Interstitial:Video:")) {
          style1 = interstitialContextStyles.video;
        } else if (mainText.includes("[Interstitial:Display:")) {
          style1 = interstitialContextStyles.display;
        } else if (mainText.includes("[Interstitial:Node:")) {
          style1 = interstitialContextStyles.node;
        }

        const slotMatch = mainText.match(/\[Interstitial:(?:Auction|Video|Display|Node):([^\]]+)\]/);
        const slotLabel = slotMatch ? ` ${slotMatch[1]}` : "";
        return [`%cINTERSTITIAL${slotLabel}`, style1, mainText, ...args.slice(1)];
      };

      const logInterstitial = (...args) => { if (window.gexpInterstitialDebug) console.log(...formatInterstitialLog(args, interstitialBadgeLog)); };
      const warnInterstitial = (...args) => { if (window.gexpInterstitialDebug) console.warn(...formatInterstitialLog(args, interstitialBadgeWarn)); };
      const errorInterstitial = (...args) => { console.error(...formatInterstitialLog(args, interstitialBadgeErr)); };
      const groupInterstitial = (...args) => { if (window.gexpInterstitialDebug) console.groupCollapsed(...formatInterstitialLog(args, interstitialBadgeLog)); };
      const groupEndInterstitial = () => { if (window.gexpInterstitialDebug) console.groupEnd(); };

      class InterstitialContainer {
        constructor(uiConfig = {}, onClose = null) {
          this.uiConfig = uiConfig;
          this.onClose = onClose;
          this.shell = null;
          this.backdrop = null;
          this.panel = null;
          this.hudEl = null;
          this.displaySlotEl = null;
          this.displayStageEl = null;
          this.videoSlotEl = null;
          this.statusEl = null;
          this.closeButton = null;
          this._countdownTimer = null;
          this._previousBodyOverflow = "";
          this._boundClose = () => this.onClose?.();
          this._boundAbsorbInteraction = (event) => {
            const target = event.target;
            if (
              (this.closeButton && this.closeButton.contains(target)) ||
              (this.displaySlotEl && this.displaySlotEl.contains(target)) ||
              (this.videoSlotEl && this.videoSlotEl.contains(target))
            ) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
          };
        }

        attach() {
          if (this.shell) return this.shell;
          this.shell = document.createElement("div");
          this.shell.className = "gexp-interstitial-shell";
          this.shell.style.zIndex = String(this.uiConfig.zIndex || 2147483000);
          this.shell.addEventListener("click", this._boundAbsorbInteraction);
          this.shell.addEventListener("pointerdown", this._boundAbsorbInteraction);
          this.shell.addEventListener("touchstart", this._boundAbsorbInteraction, { passive: false });

          this.backdrop = document.createElement("div");
          this.backdrop.className = "gexp-interstitial-backdrop";
          this.backdrop.style.background = this.uiConfig.backdropColor || "rgba(90, 90, 90, 0.58)";
          this.backdrop.addEventListener("click", this._boundAbsorbInteraction);
          this.backdrop.addEventListener("pointerdown", this._boundAbsorbInteraction);
          this.backdrop.addEventListener("touchstart", this._boundAbsorbInteraction, { passive: false });

          this.panel = document.createElement("div");
          this.panel.className = "gexp-interstitial-panel";
          this.panel.style.maxWidth = this.uiConfig.maxWidth || "960px";
          this.panel.style.maxHeight = this.uiConfig.maxHeight || "90vh";

          this.hudEl = document.createElement("div");
          this.hudEl.className = "gexp-interstitial-hud";

          this.statusEl = document.createElement("div");
          this.statusEl.className = "gexp-interstitial-status gexp-interstitial-countdown";
          this.statusEl.textContent = "";

          this.closeButton = document.createElement("button");
          this.closeButton.type = "button";
          this.closeButton.className = "gexp-interstitial-close";
          this.closeButton.setAttribute("aria-label", "Cerrar publicidad");
          this.closeButton.addEventListener("click", this._boundClose);

          this.displaySlotEl = document.createElement("div");
          this.displaySlotEl.id = "gexp-interstitial";
          this.displaySlotEl.className = "gexp-interstitial-slot";

          this.displayStageEl = document.createElement("div");
          this.displayStageEl.className = "gexp-interstitial-display-stage";
          this.displayStageEl.setAttribute("aria-hidden", "true");

          this.videoSlotEl = document.createElement("div");
          this.videoSlotEl.id = "gexp-interstitial-video";
          this.videoSlotEl.className = "gexp-interstitial-slot";

          this.panel.appendChild(this.displaySlotEl);
          this.panel.appendChild(this.videoSlotEl);
          this.hudEl.appendChild(this.statusEl);
          this.hudEl.appendChild(this.closeButton);
          this.panel.appendChild(this.hudEl);
          this.shell.appendChild(this.backdrop);
          this.shell.appendChild(this.panel);
          document.body.appendChild(this.shell);
          if (this.isMobileConstrainedViewport()) {
            logInterstitial(`[Interstitial:Node:gexp-interstitial] mobile_viewport_centering_applied`);
            logInterstitial(`[Interstitial:Node:gexp-interstitial] mobile_close_viewport_anchor_applied`);
            logInterstitial(`[Interstitial:Node:gexp-interstitial] mobile_close_clickable_ready`);
          }
          this.hideClose();
          return this.shell;
        }

        setActiveMode(mode) {
          const showDisplay = mode === "display";
          if (this.displaySlotEl) this.displaySlotEl.classList.toggle("is-active", showDisplay);
          if (this.videoSlotEl) this.videoSlotEl.classList.toggle("is-active", !showDisplay);
        }

        open(mode) {
          this.attach();
          this.setActiveMode(mode);
          this.lockBodyScroll();
          this.shell.classList.add("is-visible");
        }

        close() {
          if (!this.shell) return;
          this.stopCountdown();
          this.shell.classList.remove("is-visible");
          this.unlockBodyScroll();
        }

        destroy() {
          this.stopCountdown();
          if (this.closeButton) this.closeButton.removeEventListener("click", this._boundClose);
          if (this.shell) {
            this.shell.removeEventListener("click", this._boundAbsorbInteraction);
            this.shell.removeEventListener("pointerdown", this._boundAbsorbInteraction);
            this.shell.removeEventListener("touchstart", this._boundAbsorbInteraction);
          }
          if (this.backdrop) {
            this.backdrop.removeEventListener("click", this._boundAbsorbInteraction);
            this.backdrop.removeEventListener("pointerdown", this._boundAbsorbInteraction);
            this.backdrop.removeEventListener("touchstart", this._boundAbsorbInteraction);
          }
          this.unlockBodyScroll();
          if (this.shell?.parentNode) this.shell.parentNode.removeChild(this.shell);
          this.shell = null;
          this.backdrop = null;
          this.panel = null;
          this.hudEl = null;
          this.displaySlotEl = null;
          this.displayStageEl = null;
          this.videoSlotEl = null;
          this.statusEl = null;
          this.closeButton = null;
        }

        startCountdown(seconds) {
          this.stopCountdown();
          const totalSeconds = Math.max(0, parseInt(seconds, 10) || 0);
          if (!this.statusEl) return Promise.resolve();
          this.hideClose();
          this.statusEl.style.display = totalSeconds > 0 ? "flex" : "none";
          logInterstitial(`[Interstitial:Node:gexp-interstitial] countdown_start`, { seconds: totalSeconds });
          if (totalSeconds <= 0) return Promise.resolve();
          return new Promise((resolve) => {
            let lastLoggedRemaining = null;
            const startedAt = Date.now();
            const render = () => {
              const elapsed = Math.floor((Date.now() - startedAt) / 1000);
              const remaining = Math.max(0, totalSeconds - elapsed);
              this.statusEl.textContent = String(remaining);
              if (remaining !== lastLoggedRemaining) {
                lastLoggedRemaining = remaining;
                logInterstitial(`[Interstitial:Node:gexp-interstitial] countdown`, { remaining });
              }
              if (remaining <= 0) {
                this.stopCountdown();
                resolve();
              }
            };
            render();
            this._countdownTimer = setInterval(render, 250);
          });
        }

        stopCountdown() {
          if (this._countdownTimer) {
            clearInterval(this._countdownTimer);
            this._countdownTimer = null;
          }
        }

        showClose() {
          if (this.statusEl) this.statusEl.style.display = "none";
          if (this.closeButton) this.closeButton.classList.add("is-visible");
          logInterstitial(`[Interstitial:Node:gexp-interstitial] close_visible`);
        }

        hideClose() {
          if (this.closeButton) this.closeButton.classList.remove("is-visible");
        }

        getDisplaySlotElement() {
          return this.displaySlotEl;
        }

        getDisplayStageElement() {
          return this.displayStageEl;
        }

        getVideoSlotElement() {
          return this.videoSlotEl;
        }

        isMobileConstrainedViewport() {
          try {
            return window.matchMedia?.("(max-width: 480px), (max-height: 480px)")?.matches === true;
          } catch (err) {
            return false;
          }
        }

        applyDisplayCreativeSize(size) {
          if (!this.displaySlotEl || !Array.isArray(size) || size.length < 2) return;
          const width = Number(size[0]);
          const height = Number(size[1]);
          if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 1 || height <= 1) return;

          this.displaySlotEl.style.width = `${width}px`;
          this.displaySlotEl.style.height = `${height}px`;
          this.displaySlotEl.style.minWidth = `${width}px`;
          this.displaySlotEl.style.minHeight = `${height}px`;

          if (this.isMobileConstrainedViewport()) {
            this.displaySlotEl.style.maxWidth = "";
            this.displaySlotEl.style.maxHeight = "";
            logInterstitial(`[Interstitial:Display:gexp-interstitial] mobile_display_natural_size_applied`, { width, height });
            return;
          }

          this.displaySlotEl.style.maxWidth = "calc(100vw - 48px)";
          this.displaySlotEl.style.maxHeight = "calc(100vh - 48px)";
          logInterstitial(`[Interstitial:Display:gexp-interstitial] desktop_display_natural_size_applied`, { width, height });
        }

        centerMobileDisplayRender(size) {
          if (!this.displaySlotEl || !this.displayStageEl || !this.isMobileConstrainedViewport()) return;
          const width = Array.isArray(size) ? Number(size[0]) : null;
          const height = Array.isArray(size) ? Number(size[1]) : null;
          if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 1 || height <= 1) return;

          if (!this.displayStageEl.parentNode) {
            logInterstitial(`[Interstitial:Display:gexp-interstitial] mobile_display_stage_created`, {
              width,
              height,
            });
          }

          const children = Array.from(this.displaySlotEl.childNodes).filter((child) => child !== this.displayStageEl);
          if (children.length) {
            if (!this.displayStageEl.parentNode) this.displaySlotEl.appendChild(this.displayStageEl);
            children.forEach((child) => this.displayStageEl.appendChild(child));
          } else if (!this.displayStageEl.parentNode) {
            this.displaySlotEl.appendChild(this.displayStageEl);
          }

          this.displaySlotEl.style.width = `${width}px`;
          this.displaySlotEl.style.height = `${height}px`;
          this.displaySlotEl.style.minWidth = `${width}px`;
          this.displaySlotEl.style.minHeight = `${height}px`;
          this.displaySlotEl.style.maxWidth = "";
          this.displaySlotEl.style.maxHeight = "";
          this.displayStageEl.style.width = Number.isFinite(width) && width > 0 ? `${width}px` : "auto";
          this.displayStageEl.style.height = Number.isFinite(height) && height > 0 ? `${height}px` : "auto";
          this.displayStageEl.style.maxWidth = "";
          this.displayStageEl.style.maxHeight = "";
          this.displayStageEl.style.transform = "";
          this.displayStageEl.style.margin = "auto";
          this.displayStageEl.style.pointerEvents = "auto";

          logInterstitial(`[Interstitial:Display:gexp-interstitial] mobile_display_css_constraints_removed`, {
            width,
            height,
          });
          logInterstitial(`[Interstitial:Display:gexp-interstitial] mobile_display_stage_no_scale`, { width, height });
          logInterstitial(`[Interstitial:Display:gexp-interstitial] mobile_display_centering_applied`, {
            stageChildren: this.displayStageEl.childNodes.length,
          });
          logInterstitial(`[Interstitial:Display:gexp-interstitial] mobile_display_render_natural_size_centered`, {
            width,
            height,
          });
        }

        lockBodyScroll() {
          if (typeof document === "undefined" || !document.body) return;
          if (!this._bodyScrollLocked) {
            this._previousBodyOverflow = document.body.style.overflow || "";
            document.body.style.overflow = "hidden";
            this._bodyScrollLocked = true;
          }
        }

        unlockBodyScroll() {
          if (typeof document === "undefined" || !document.body) return;
          if (this._bodyScrollLocked) {
            document.body.style.overflow = this._previousBodyOverflow;
            this._bodyScrollLocked = false;
          }
        }
      }
      class InterstitialNode {
        constructor({ manager, config }) {
          this.manager = manager;
          this.config = config;
          this.id = "gexp-interstitial";
          this.videoId = "gexp-interstitial-video";
          this.state = "idle";
          this.slot = null;
          this.wa = null;
          this.container = new InterstitialContainer(
            this.config.ui || {},
            () => this.close(),
          );
          this.waterfall = null;
          this.videoCreative = null;
          this.lastVideoFailureReason = null;
          this.closed = false;
          this.shown = false;
        }

        initialize() {
          if (this.waterfall) return;
          this.container.attach();
          this.wa = new WindowArray(
            this.id,
            this.manager.gexp.cfg,
            this.manager.gexp,
          );
          this.manager.gexp.windows[this.id] = this.wa;
          this.waterfall = new InterstitialWaterfall({
            node: this,
            container: this.container,
            config: this.config,
            gexp: this.manager.gexp,
            wa: this.wa,
          });
        }

        prepareAndShow() {
          this.initialize();
          logInterstitial(`[Interstitial:Node:${this.id}] prepare_and_show`);
          return this.waterfall.startAuction("delay");
        }

        askDisplay(bidResponse) {
          return new Promise((resolve) => {
            const adUnitPath =
              this.manager.adUnitPath || this.manager.gexp.cfg.adUnit || "";
            const sizes = this.getDisplaySizes();
            const fullAdUnit = `/${this.manager.networkId}/${adUnitPath}`;
            logInterstitial(`[Interstitial:Display:${this.id}] request_gam_display`, {
              fullAdUnit,
              sizes,
              bidder: bidResponse?.bidderCode || null,
              cpm: bidResponse?.cpm ?? null,
            });

            googletag.cmd.push(() => {
              if (!this.slot) {
                this.slot = googletag.defineSlot(fullAdUnit, sizes, this.id);
                if (!this.slot) {
                  warnInterstitial(`[Interstitial:Display:${this.id}] define_slot_failed`, { fullAdUnit });
                  resolve({ filled: false, event: null });
                  return;
                }
                this.slot.addService(googletag.pubads());
              }

              this.slot.clearTargeting();
              this.slot.setTargeting("p", [this.id]);
              this.slot.setTargeting("interstitial", "true");

              if (window.pbjs && bidResponse) {
                const pb = bidResponse.pbCg || bidResponse.pbAg || bidResponse.pbHg || String(bidResponse.cpm);
                this.slot.setTargeting("hb_pb", pb);
                this.slot.setTargeting("hb_bidder", bidResponse.bidderCode);
                this.slot.setTargeting("hb_format", "banner");
                if (bidResponse.adId) {
                  this.slot.setTargeting("hb_adid", bidResponse.adId);
                }
              }

              if (window.apstag && window.apstag.targetingKeys) {
                const tamKeys = window.apstag.targetingKeys();
                if (tamKeys && tamKeys[this.id]) {
                  Object.entries(tamKeys[this.id]).forEach(([k, v]) => {
                    this.slot.setTargeting(k, v);
                  });
                }
              }

              if (this.wa) {
                this.wa.slot = this.slot;
                this.wa.allowUpdate = true;
              }

              this.manager.gexp.request(this.slot);

              const renderHandler = (event) => {
                if (event.slot !== this.slot) return;
                googletag.pubads().removeEventListener("slotRenderEnded", renderHandler);
                const hasRenderableCreative =
                  !event.isEmpty &&
                  Array.isArray(event.size) &&
                  event.size[0] > 1 &&
                  event.size[1] > 1;
                logInterstitial(`[Interstitial:Display:${this.id}] slot_render_ended`, {
                  filled: hasRenderableCreative,
                  isEmpty: event.isEmpty,
                  size: event.size,
                  advertiserId: event.advertiserId,
                  lineItemId: event.lineItemId,
                });
                if (hasRenderableCreative) {
                  this.container.applyDisplayCreativeSize(event.size);
                  this.container.centerMobileDisplayRender(event.size);
                }
                resolve({ filled: hasRenderableCreative, event });
              };
              googletag.pubads().addEventListener("slotRenderEnded", renderHandler);

              const slotEl = this.container.getDisplaySlotElement();
              if (slotEl && !slotEl.hasAttribute("data-gpt-displayed")) {
                googletag.display(this.id);
                slotEl.setAttribute("data-gpt-displayed", "true");
              }
              googletag.pubads().refresh([this.slot]);
            });
          });
        }

        async buildAndPrepareVideo(adTagUrl, bidResponse) {
          this.destroyVideoCreative();
          this.lastVideoFailureReason = null;
          logInterstitial(`[Interstitial:Auction:${this.id}] video_prepare_start`, {
            adTagUrl,
            bidder: bidResponse?.bidderCode || null,
            cpm: bidResponse?.cpm ?? null,
          });
          try {
            this.videoCreative = new InterstitialVideoCreative({
              container: this.container,
              adTagUrl,
              bid: bidResponse,
              node: this,
              config: this.config,
            });
            await this.videoCreative.render();
            logInterstitial(`[Interstitial:Auction:${this.id}] video_prepare_success`, {
              bidder: bidResponse?.bidderCode || null,
              cpm: bidResponse?.cpm ?? null,
            });
            return true;
          } catch (err) {
            this.lastVideoFailureReason = err?.message || "video_prepare_failed";
            warnInterstitial(`[Interstitial:Auction:${this.id}] video_prepare_fail`, {
              reason: this.lastVideoFailureReason,
              bidder: bidResponse?.bidderCode || null,
              cpm: bidResponse?.cpm ?? null,
              error: err,
            });
            this.destroyVideoCreative();
            return false;
          }
        }

        async show(mode, payload = {}) {
          if (this.shown || this.closed) return false;
          this.shown = true;
          this.state = mode;
          logInterstitial(`[Interstitial:Node:${this.id}] reveal_real`, {
            mode,
            bidder: payload.bid?.bidderCode ?? null,
            cpm: payload.bid?.cpm ?? null,
          });
          this.container.open(mode);
          this.manager.markShownNow();
          this.recordTelemetry("shown", {
            mode,
            cpm: payload.bid?.cpm ?? null,
            bidder: payload.bid?.bidderCode ?? null,
          });
          const countdownSeconds = this.config.ui?.countdownSeconds ?? 3;
          await this.container.startCountdown(countdownSeconds);
          if (!this.closed) {
            this.container.showClose();
          }
          return true;
        }

        close() {
          if (this.closed) return;
          this.closed = true;
          this.state = "closed";
          logInterstitial(`[Interstitial:Node:${this.id}] closed_by_user`);
          this.recordTelemetry("closed_by_user", { slotId: this.id });
          this.destroyDisplaySlot();
          this.destroyVideoCreative();
          this.container.close();
          this.container.destroy();
          delete this.manager.gexp.windows[this.id];
        }

        destroyDisplaySlot() {
          const slotEl = this.container.getDisplaySlotElement();
          if (slotEl) {
            slotEl.removeAttribute("data-gpt-displayed");
            slotEl.innerHTML = "";
          }
          if (this.slot) {
            googletag.cmd.push(() => {
              if (this.slot) {
                googletag.destroySlots([this.slot]);
                this.slot = null;
              }
            });
          }
        }

        destroyVideoCreative() {
          const slotEl = this.container.getVideoSlotElement();
          try {
            if (this.videoCreative) {
              logInterstitial(`[Interstitial:Video:${this.id}] destroy`);
            }
            this.videoCreative?.destroy?.();
          } catch (err) {}
          this.videoCreative = null;
          if (slotEl) {
            slotEl.innerHTML = "";
          }
        }

        recordTelemetry(eventName, payload = {}) {
          if (this.manager.gexp.statsG) {
            this.manager.gexp.statsG.addVariable(
              `interstitial_${eventName}`,
              JSON.stringify(payload),
            );
          }
        }

        getDisplaySizes() {
          const sizes = this.config.display?.sizes;
          if (Array.isArray(sizes) && sizes.length) return sizes;
          return [[300, 250]];
        }
      }

      class InterstitialWaterfall {
        constructor({ node, container, config, gexp, wa }) {
          this.node = node;
          this.container = container;
          this.config = config;
          this.gexp = gexp;
          this.wa = wa;
          this.started = false;
          this._currentAuctionId = null;
          this._lastDisplayBid = null;
          this._lastVideoBid = null;
          this._lastNoShowReason = null;
        }

        async startAuction(trigger) {
          if (this.started || this.node.closed) return false;
          this.started = true;
          groupInterstitial(`[Interstitial:Auction:${this.node.id}] start trigger=${trigger}`);

          this.registerPrebidAliases();
          const prebidConfig = this.getPrebidMultiFormatConfig();
          logInterstitial(`[Interstitial:Auction:${this.node.id}] prebid_config`, prebidConfig);
          if (prebidConfig) {
            await this.executePrebid(prebidConfig);
          } else {
            warnInterstitial(`[Interstitial:Auction:${this.node.id}] no_prebid_configuration`);
          }

          const sanitizedBids = this.inspectAuctionBids(prebidConfig?.code || this.node.id);
          this._lastDisplayBid = sanitizedBids.displayBid;
          this._lastVideoBid = sanitizedBids.videoBid;
          logInterstitial(`[Interstitial:Auction:${this.node.id}] bids_back`, {
            rawCount: sanitizedBids.rawCount,
            validDisplayCount: sanitizedBids.displayCount,
            validVideoCount: sanitizedBids.videoCount,
            auctionId: this._currentAuctionId,
          });
          logInterstitial(`[Interstitial:Auction:${this.node.id}] display_best_bid`, this.summarizeBid(this._lastDisplayBid));
          logInterstitial(`[Interstitial:Auction:${this.node.id}] video_best_bid`, this.summarizeBid(this._lastVideoBid));
          const winner = this.selectWinner();
          logInterstitial(`[Interstitial:Auction:${this.node.id}] winner`, winner);

          if (!winner) {
            this.reportNoShow(this._lastNoShowReason || "no_usable_bid", {
              displayBid: this.summarizeBid(this._lastDisplayBid),
              videoBid: this.summarizeBid(this._lastVideoBid),
            });
            groupEndInterstitial();
            return false;
          }

          const attempts = this.buildAttemptPlan(winner);
          let shown = false;
          let lastFailure = null;
          for (let i = 0; i < attempts.length; i += 1) {
            const attempt = attempts[i];
            if (i > 0) {
              logInterstitial(`[Interstitial:Auction:${this.node.id}] fallback_start`, {
                from: attempts[i - 1].mode,
                to: attempt.mode,
                previousReason: lastFailure,
              });
              if (attempt.reason === "only_video_fallback_to_display") {
                logInterstitial(`[Interstitial:Auction:${this.node.id}] only_video_fallback_to_display`, {
                  previousReason: lastFailure,
                  hasDisplayBid: Boolean(attempt.bid),
                });
              }
            }
            const result = await this.tryMode(attempt);
            if (result.shown) {
              if (i > 0) {
                logInterstitial(`[Interstitial:Auction:${this.node.id}] fallback_success`, {
                  mode: attempt.mode,
                  reason: result.reason,
                });
              }
              shown = true;
              break;
            }
            lastFailure = result.reason || "unknown_failure";
            if (i > 0) {
              warnInterstitial(`[Interstitial:Auction:${this.node.id}] fallback_fail`, {
                mode: attempt.mode,
                reason: lastFailure,
              });
            }
          }

          if (!shown) {
            this.reportNoShow(lastFailure || this._lastNoShowReason || "fallback_exhausted", {
              winner: winner.mode,
              displayBid: this.summarizeBid(this._lastDisplayBid),
              videoBid: this.summarizeBid(this._lastVideoBid),
            });
            this.node.recordTelemetry("no_fill", {
              requestedMode: winner.mode,
              displayBid: this._lastDisplayBid?.cpm ?? null,
              videoBid: this._lastVideoBid?.cpm ?? null,
              reason: lastFailure || this._lastNoShowReason || "fallback_exhausted",
            });
          }
          groupEndInterstitial();
          return shown;
        }

        normalizeDecisionMode(rawMode) {
          if (rawMode === "display_only") return "only_display";
          if (rawMode === "video_only") return "only_video";
          if (rawMode === "only_display" || rawMode === "only_video" || rawMode === "auto") return rawMode;
          return "auto";
        }

        selectWinner() {
          const mode = this.normalizeDecisionMode(this.config.decision?.mode);
          const minCpm = Number(this.config.decision?.minCpm ?? 0);
          const priorityBelowMin = this.normalizeDecisionMode(
            this.config.decision?.priorityBelowMin === "display"
              ? "only_display"
              : this.config.decision?.priorityBelowMin === "video"
                ? "only_video"
                : this.config.decision?.priorityBelowMin,
          );
          const displayBid = this._lastDisplayBid;
          const videoBid = this._lastVideoBid;

          if (mode === "only_display") {
            if (!displayBid) {
              logInterstitial(`[Interstitial:Auction:${this.node.id}] no_prebid_bid_but_forced_display_only`);
              return { mode: "display", bid: null, reason: "forced_display_without_prebid_bid" };
            }
            return { mode: "display", bid: displayBid, reason: "forced_display" };
          }

          if (mode === "only_video") {
            if (!videoBid) {
              logInterstitial(`[Interstitial:Auction:${this.node.id}] no_prebid_bid_but_forced_only_video`);
              logInterstitial(`[Interstitial:Auction:${this.node.id}] only_video_still_requests_video_without_bid`, {
                minCpm,
                displayBid: this.summarizeBid(displayBid),
              });
              logInterstitial(`[Interstitial:Auction:${this.node.id}] only_video_video_first_attempt`, {
                videoBid: null,
                displayBid: this.summarizeBid(displayBid),
                minCpm,
              });
              return { mode: "video", bid: null, reason: "forced_video_without_prebid_bid" };
            }
            const videoCpm = Number(videoBid.cpm || 0);
            const displayCpm = Number(displayBid?.cpm || 0);
            if (minCpm > 0 && videoCpm < minCpm && displayBid && displayCpm >= minCpm) {
              logInterstitial(`[Interstitial:Auction:${this.node.id}] only_video_display_overrides_low_video_bid`, {
                videoBid: this.summarizeBid(videoBid),
                displayBid: this.summarizeBid(displayBid),
                minCpm,
              });
              return { mode: "display", bid: displayBid, reason: "only_video_display_overrides_low_video_bid" };
            }
            if (minCpm > 0 && videoCpm < minCpm) {
              logInterstitial(`[Interstitial:Auction:${this.node.id}] only_video_still_requests_video_below_min_cpm`, {
                videoBid: this.summarizeBid(videoBid),
                displayBid: this.summarizeBid(displayBid),
                minCpm,
              });
            }
            logInterstitial(`[Interstitial:Auction:${this.node.id}] only_video_video_first_attempt`, {
              videoBid: this.summarizeBid(videoBid),
              displayBid: this.summarizeBid(displayBid),
              minCpm,
            });
            return { mode: "video", bid: videoBid, reason: "forced_video" };
          }

          logInterstitial(`[Interstitial:Auction:${this.node.id}] auto_ignores_min_cpm`, {
            minCpm,
            priorityBelowMin,
          });
          if (displayBid && videoBid) {
            return displayBid.cpm >= videoBid.cpm
              ? { mode: "display", bid: displayBid, reason: "highest_bid_auto" }
              : { mode: "video", bid: videoBid, reason: "highest_bid_auto" };
          }
          if (displayBid) return { mode: "display", bid: displayBid, reason: "display_only_bid" };
          if (videoBid) return { mode: "video", bid: videoBid, reason: "video_only_bid" };
          logInterstitial(`[Interstitial:Auction:${this.node.id}] no_prebid_bid_defaulting_to_display_auto`);
          return { mode: "display", bid: null, reason: "auto_default_display_without_prebid_bid" };
        }

        buildAttemptPlan(winner) {
          if (!winner) return [];
          const mode = this.normalizeDecisionMode(this.config.decision?.mode);
          const attempts = [winner];
          if (mode === "only_video") {
            if (winner.mode !== "video") return attempts;
            attempts.push({
              mode: "display",
              bid: this._lastDisplayBid || null,
              reason: "only_video_fallback_to_display",
            });
            return attempts;
          }
          if (mode !== "auto") return attempts;
          const alternateMode = winner.mode === "display" ? "video" : "display";
          const alternateBid = alternateMode === "display" ? this._lastDisplayBid : this._lastVideoBid;
          if (!alternateBid) {
            logInterstitial(`[Interstitial:Auction:${this.node.id}] no_alternate_bid`, { alternateMode });
            return attempts;
          }
          attempts.push({
            mode: alternateMode,
            bid: alternateBid,
            reason: "auto_fallback_alternate",
          });
          return attempts;
        }

        async tryMode(attempt) {
          if (!attempt || !attempt.mode) return { shown: false, reason: "invalid_attempt" };

          if (attempt.mode === "display") {
            if (!attempt.bid) {
              logInterstitial(`[Interstitial:Auction:${this.node.id}] display_request_without_prebid_bid`, {
                reason: attempt.reason || null,
              });
            }
            const tamConfig = this.getTAMConfiguration();
            logInterstitial(`[Interstitial:TAM:${this.node.id}] request_tam_display`, tamConfig);
            if (tamConfig) await this.executeAmazonTam(tamConfig);
            const displayResult = await this.node.askDisplay(attempt.bid);
            if (!displayResult.filled) {
              warnInterstitial(`[Interstitial:Display:${this.node.id}] no_fill`, {
                size: displayResult.event?.size || null,
              });
              return { shown: false, reason: "display_no_fill" };
            }
            const shown = await this.node.show("display", { bid: attempt.bid, event: displayResult.event });
            return { shown, reason: shown ? "display_shown" : "display_show_failed" };
          }

          if (attempt.mode === "video") {
            if (!attempt.bid) {
              logInterstitial(`[Interstitial:Auction:${this.node.id}] video_request_without_prebid_bid`, {
                reason: attempt.reason || null,
              });
            }
            const tamVideoConfig = this.getTAMVideoConfiguration();
            logInterstitial(`[Interstitial:Auction:${this.node.id}] request_tam_video`, tamVideoConfig);
            if (tamVideoConfig) await this.executeAmazonTam(tamVideoConfig);
            const adTagUrl = this.buildGAMVideoTagUrl();
            logInterstitial(`[Interstitial:Auction:${this.node.id}] request_gam_video`, {
              adTagUrl,
              bid: this.summarizeBid(attempt.bid),
            });
            const ready = await this.node.buildAndPrepareVideo(adTagUrl, attempt.bid);
            if (!ready) {
              const reason = this.node.lastVideoFailureReason || this.node.videoCreative?.lastFailureReason || "video_prepare_failed";
              return { shown: false, reason };
            }
            const shown = await this.node.show("video", { bid: attempt.bid });
            return { shown, reason: shown ? "video_shown" : "video_show_failed" };
          }

          return { shown: false, reason: "unsupported_mode" };
        }

        getPrebidMultiFormatConfig() {
          const mode = this.normalizeDecisionMode(this.config.decision?.mode);
          const code = this.node.id;
          const mediaTypes = {};
          let bids = [];
          const networkId = this.node.manager.networkId;
          const prebidNetworks = this.config.prebid?.networks || {};
          const targetNetwork = prebidNetworks[networkId] || prebidNetworks.default || {};

          if (mode === "auto" || mode === "only_display") {
            const sizes = this.getDisplaySizes();
            if (sizes.length) {
              const bannerMediaTypes = { banner: { sizes } };
              mediaTypes.banner = bannerMediaTypes.banner;
              bids = bids.concat(
                (targetNetwork.bidders || []).map((bid) => this.buildPrebidBidConfig(bid, bannerMediaTypes)),
              );
            }
          }

          if (mode === "auto" || mode === "only_video") {
            const vc = this.config.video;
            if (vc?.enabled) {
              const normalizedPlayerSize = this.normalizeVideoPlayerSize(vc.playerSize || [640, 360]);
              const videoMediaType = {
                context: vc.context || "instream",
                playerSize: normalizedPlayerSize.playerSize,
                mimes: vc.mimes || ["video/mp4", "application/javascript"],
                protocols: vc.protocols || [2, 3, 5, 6, 7],
                playbackmethod: vc.playbackmethod || [6],
                plcmt: vc.plcmt || 1,
                placement: vc.placement || 1,
                linearity: vc.linearity || 1,
                api: vc.api || [1, 2],
                maxduration: vc.maxduration || 30,
                minduration: vc.minduration || 1,
                startdelay: vc.startdelay != null ? vc.startdelay : 0,
                ...(vc.battr ? { battr: vc.battr } : {}),
                ...(vc.skippable != null ? { skippable: vc.skippable } : {}),
                ...(vc.skip != null ? { skip: vc.skip } : vc.skippable != null ? { skip: vc.skippable ? 1 : 0 } : {}),
              };
              if (vc.startdelay == null) {
                logInterstitial(`[Interstitial:Prebid:${this.node.id}] interstitial_prebid_video_startdelay_applied`, {
                  startdelay: videoMediaType.startdelay,
                  reason: "default_for_instream",
                });
              }
              const videoMediaTypes = {
                video: videoMediaType,
              };
              mediaTypes.video = videoMediaTypes.video;
              const effectiveVideoBidders = this.enhanceVideoBidders(targetNetwork.videoBidders || [], normalizedPlayerSize);
              bids = bids.concat(
                effectiveVideoBidders.map((bid) => this.buildPrebidBidConfig(bid, videoMediaTypes)),
              );
              this.logPrebidVideoConfiguration(mediaTypes.video, effectiveVideoBidders);
            }
          }

          if (!Object.keys(mediaTypes).length || !bids.length) return null;
          const adUnit = {
            code,
            mediaTypes,
            bids,
            ortb2Imp: this.buildOrtb2Imp(code),
          };
          logInterstitial(`[Interstitial:Prebid:${this.node.id}] interstitial_prebid_multiformat_adunit`, adUnit);
          return adUnit;
        }

        normalizeVideoPlayerSize(inputSize) {
          let width = null;
          let height = null;

          if (Array.isArray(inputSize) && Array.isArray(inputSize[0])) {
            width = Number(inputSize[0][0]);
            height = Number(inputSize[0][1]);
          } else if (Array.isArray(inputSize)) {
            width = Number(inputSize[0]);
            height = Number(inputSize[1]);
          } else if (inputSize && typeof inputSize === "object") {
            width = Number(inputSize.width);
            height = Number(inputSize.height);
          }

          if (!Number.isFinite(width) || width <= 0) width = 640;
          if (!Number.isFinite(height) || height <= 0) height = 360;

          const normalized = {
            playerSize: [[width, height]],
            width,
            height,
          };
          logInterstitial(`[Interstitial:Prebid:${this.node.id}] interstitial_video_player_size_input`, inputSize);
          logInterstitial(`[Interstitial:Prebid:${this.node.id}] interstitial_video_player_size_normalized`, normalized);
          return normalized;
        }

        enhanceVideoBidders(videoBidders, normalizedPlayerSize) {
          return (videoBidders || []).map((bid) => {
            if (!bid || typeof bid !== "object") return bid;
            if (bid.bidder !== "rubicon_video") return bid;

            const params = {
              ...(bid.params || {}),
            };
            const enhanced = {
              ...bid,
              params: {
                ...params,
                playerWidth: params.playerWidth || normalizedPlayerSize.width,
                playerHeight: params.playerHeight || normalizedPlayerSize.height,
              },
            };
            logInterstitial(`[Interstitial:Prebid:${this.node.id}] rubicon_video_params_enhanced`, {
              bidder: bid.bidder,
              previousParams: bid.params || {},
              params: enhanced.params,
            });
            return enhanced;
          });
        }

        logPrebidVideoConfiguration(videoMediaType, videoBidders) {
          const requiredFields = [
            "context",
            "playerSize",
            "mimes",
            "protocols",
            "playbackmethod",
            "plcmt",
            "placement",
            "linearity",
            "api",
            "minduration",
            "maxduration",
            "startdelay",
          ];
          const importantOptionalFields = ["battr", "skippable", "skip"];
          const bidders = (videoBidders || []).map((bid) => ({
            bidder: bid?.bidder || null,
            params: bid?.params || {},
          }));

          logInterstitial(`[Interstitial:Prebid:${this.node.id}] interstitial_prebid_video_media_types`, videoMediaType);
          logInterstitial(`[Interstitial:Prebid:${this.node.id}] interstitial_prebid_video_bidders`, bidders);

          requiredFields.concat(importantOptionalFields).forEach((field) => {
            if (videoMediaType?.[field] == null) {
              warnInterstitial(`[Interstitial:Prebid:${this.node.id}] interstitial_prebid_video_missing_field`, {
                field,
                bidders: bidders.map((bid) => bid.bidder),
              });
            }
          });

          if (bidders.some((bid) => bid.bidder === "pubmatic_video")) {
            ["context", "playerSize", "mimes", "plcmt", "placement", "linearity", "protocols", "playbackmethod", "startdelay"].forEach((field) => {
              if (videoMediaType?.[field] == null) {
                warnInterstitial(`[Interstitial:Prebid:${this.node.id}] pubmatic_video_missing_required_video_field`, {
                  bidder: "pubmatic_video",
                  field,
                  reason: "pubmatic_video_requires_complete_video_media_type",
                });
              }
            });
          }

          if (bidders.some((bid) => bid.bidder === "criteo_video") && videoMediaType?.skip == null) {
            warnInterstitial(`[Interstitial:Prebid:${this.node.id}] interstitial_prebid_video_missing_field`, {
              bidder: "criteo_video",
              field: "skip",
              reason: "criteo_video_requires_skip",
            });
          }
        }

        buildPrebidBidConfig(bid, mediaTypes) {
          if (!bid || typeof bid !== "object") return bid;
          return {
            ...bid,
            mediaTypes,
          };
        }

        inspectAuctionBids(code) {
          const rawBids = this.getAuctionBids(code);
          const displayBids = [];
          const videoBids = [];

          rawBids.forEach((bid) => {
            const inspected = this.inspectBid(bid);
            logInterstitial(`[Interstitial:Auction:${this.node.id}] inspect_bid`, inspected.logData);
            if (inspected.acceptedAs === "display") {
              displayBids.push(bid);
              return;
            }
            if (inspected.acceptedAs === "video") {
              logInterstitial(`[Interstitial:Auction:${this.node.id}] accepted_video_bid`, inspected.logData);
              videoBids.push(bid);
              return;
            }
            if (inspected.rejectedAs === "display") {
              warnInterstitial(`[Interstitial:Auction:${this.node.id}] discard_invalid_display_bid`, inspected.logData);
            }
            if (inspected.rejectedAs === "video") {
              warnInterstitial(`[Interstitial:Auction:${this.node.id}] discard_invalid_video_bid`, inspected.logData);
            }
          });

          displayBids.sort((a, b) => Number(b?.cpm || 0) - Number(a?.cpm || 0));
          videoBids.sort((a, b) => Number(b?.cpm || 0) - Number(a?.cpm || 0));

          return {
            rawCount: rawBids.length,
            displayCount: displayBids.length,
            videoCount: videoBids.length,
            displayBid: displayBids[0] || null,
            videoBid: videoBids[0] || null,
          };
        }

        getAuctionBids(code) {
          if (!window.pbjs || !code) return [];
          return (window.pbjs.getBidResponsesForAdUnitCode(code)?.bids || []).filter((bid) => {
            if (this._currentAuctionId && bid.auctionId !== this._currentAuctionId) return false;
            return true;
          });
        }

        inspectBid(bid) {
          const bidder = bid?.bidder || bid?.bidderCode || null;
          const bidderCode = bid?.bidderCode || bid?.bidder || null;
          const mediaType = bid?.mediaType || null;
          const cpm = Number(bid?.cpm || 0);
          const width = bid?.width ?? null;
          const height = bid?.height ?? null;
          const hasVastUrl = Boolean(bid?.vastUrl);
          const hasVastXml = Boolean(bid?.vastXml);
          const hasHtmlAd = typeof bid?.ad === "string" && bid.ad.trim().length > 0;
          const hasAdUrl = Boolean(bid?.adUrl);
          const hasRenderer = Boolean(bid?.renderer);
          const hasVideoSignal = hasVastUrl || hasVastXml;
          const isAliasVideo = this.isAliasVideoBid(bid);
          let acceptedAs = null;
          let rejectedAs = null;
          let discardReason = null;

          if (isAliasVideo) {
            if (mediaType !== "video") {
              rejectedAs = "video";
              discardReason = mediaType === "banner" ? "alias_video_returned_banner" : "alias_video_non_video_media_type";
            } else if (!hasVideoSignal) {
              rejectedAs = "video";
              discardReason = "alias_video_missing_vast";
            } else {
              acceptedAs = "video";
            }
          } else if (mediaType === "video") {
            if (!hasVideoSignal) {
              rejectedAs = "video";
              discardReason = "video_missing_vast_signal";
            } else {
              acceptedAs = "video";
            }
          } else if (mediaType === "banner") {
            const hasDisplayCreative = hasHtmlAd || hasAdUrl || hasRenderer;
            if (!hasDisplayCreative) {
              rejectedAs = "display";
              discardReason = "banner_missing_display_creative";
            } else {
              acceptedAs = "display";
            }
          } else if (!mediaType) {
            rejectedAs = "display";
            discardReason = "missing_media_type_for_display";
          } else {
            discardReason = "unsupported_media_type";
          }

          const logData = {
            bidder,
            bidderCode,
            mediaType,
            cpm,
            width,
            height,
            hasVastUrl,
            hasVastXml,
            hasHtmlAd,
            hasAdUrl,
            hasRenderer,
            isAliasVideo,
            acceptedAs,
            rejectedAs,
            discardReason,
          };

          return {
            acceptedAs,
            rejectedAs,
            discardReason,
            logData,
          };
        }

        isAliasVideoBid(bid) {
          const bidder = String(bid?.bidder || "");
          const bidderCode = String(bid?.bidderCode || "");
          return bidder.endsWith("_video") || bidderCode.endsWith("_video");
        }

        executePrebid(configuration) {
          return new Promise((resolve) => {
            if (!window.pbjs || typeof window.pbjs.requestBids === "undefined" || !window.pbjs.que) {
              warnInterstitial(`[Interstitial:Prebid:${this.node.id}] unavailable`);
              resolve(null);
              return;
            }
            window.pbjs.que.push(() => {
              try {
                this.registerPrebidAdUnit(configuration);
                const timeout = this.getPrebidTimeout();
                const knownAuctionIds = new Set(
                  (window.pbjs.getBidResponsesForAdUnitCode(configuration.code)?.bids || [])
                    .map((bid) => bid.auctionId)
                    .filter(Boolean),
                );
                const safetyTimer = setTimeout(() => resolve(null), timeout + 500);
                window.pbjs.requestBids({
                  timeout,
                  adUnitCodes: [configuration.code],
                  bidsBackHandler: (bidResponses, timedOut, auctionIdParam) => {
                    clearTimeout(safetyTimer);
                    const rawBids = window.pbjs.getBidResponsesForAdUnitCode(configuration.code)?.bids || [];
                    const newAuctionIds = rawBids
                      .map((bid) => bid.auctionId)
                      .filter((auctionId) => auctionId && !knownAuctionIds.has(auctionId));
                    this._currentAuctionId =
                      auctionIdParam ||
                      (newAuctionIds.length > 0 ? newAuctionIds[newAuctionIds.length - 1] : null) ||
                      null;
                    logInterstitial(`[Interstitial:Prebid:${this.node.id}] bids_back`, {
                      auctionId: this._currentAuctionId,
                      timedOut,
                      bidResponses,
                    });
                    window.pbjs.setTargetingForGPTAsync([configuration.code]);
                    resolve("prebid_done");
                  },
                });
              } catch (err) {
                warnInterstitial(`[Interstitial:Prebid:${this.node.id}] failed`, err);
                resolve(null);
              }
            });
          });
        }

        executeAmazonTam(configuration) {
          return new Promise((resolve) => {
            if (!window.apstag || typeof window.apstag.fetchBids === "undefined") {
              warnInterstitial(`[Interstitial:TAM:${this.node.id}] unavailable`);
              resolve(null);
              return;
            }
            const safetyTimer = setTimeout(() => resolve("tam_timeout"), 2000);
            try {
              window.apstag.fetchBids(configuration, () => {
                clearTimeout(safetyTimer);
                try {
                  window.apstag.setDisplayBids();
                } catch (err) {}
                logInterstitial(`[Interstitial:TAM:${this.node.id}] response`, configuration);
                resolve("tam_done");
              });
            } catch (err) {
              clearTimeout(safetyTimer);
              warnInterstitial(`[Interstitial:TAM:${this.node.id}] error`, err);
              resolve("tam_error");
            }
          });
        }

        getTAMConfiguration() {
          if (this.config.tam?.enabled === false) return null;
          const slotName = this.node.manager.adUnitPath || "";
          const sizes = this.getDisplaySizes().filter((size) => size !== "fluid" && size[0] > 1);
          if (!slotName || !sizes.length) return null;
          return {
            slots: [
              {
                slotID: this.node.id,
                slotName: `/${this.node.manager.networkId}/${slotName}`,
                sizes,
              },
            ],
          };
        }

        getTAMVideoConfiguration() {
          if (this.config.tam?.enabled === false) return null;
          const videoConfig = this.config.video;
          if (!videoConfig?.enabled) return null;
          const slotName = this.getVideoAdUnitPath();
          const playerSize = videoConfig.playerSize || [640, 360];
          if (!slotName) return null;
          return {
            slots: [
              {
                slotID: this.node.videoId,
                slotName: `/${this.node.manager.networkId}/${slotName}`,
                mediaType: "video",
                sizes: [playerSize],
              },
            ],
          };
        }

        buildOrtb2Imp(adUnitCode, adUnitPathOverride) {
          const networkId = this.gexp.cfg.networkId || "99071977";
          const adUnitPath = adUnitPathOverride || this.node.manager.adUnitPath || "";
          const fullAdSlot = `/${networkId}/${adUnitPath}`;
          const pbadslot = `${fullAdSlot}#${adUnitCode}`;
          return {
            ext: {
              data: {
                adserver: {
                  name: "gam",
                  adslot: fullAdSlot,
                },
                pbadslot,
              },
              gpid: pbadslot,
            },
          };
        }

        normalizeTargetingMap(targeting) {
          const normalized = {};
          if (!targeting) return normalized;

          if (Array.isArray(targeting)) {
            targeting.forEach((entry) => {
              if (!entry || typeof entry !== "object") return;
              const key = entry.key || entry.name;
              const value = entry.val ?? entry.value;
              if (!key || value == null || value === "") return;
              normalized[key] = Array.isArray(value) ? value.join(",") : String(value);
            });
            return normalized;
          }

          if (typeof targeting === "object") {
            Object.entries(targeting).forEach(([key, value]) => {
              if (!key || value == null || value === "") return;
              normalized[key] = Array.isArray(value) ? value.join(",") : String(value);
            });
          }

          return normalized;
        }

        getVideoBidDiagnostics(bid) {
          const targetingFromBid = this.normalizeTargetingMap(bid?.adserverTargeting);
          let targetingFromPbjs = {};
          try {
            if (Object.keys(targetingFromBid).length === 0 && window.pbjs?.getAdserverTargetingForAdUnitCode) {
              targetingFromPbjs = this.normalizeTargetingMap(
                window.pbjs.getAdserverTargetingForAdUnitCode(this.node.id),
              );
            }
          } catch (err) {}

          const targeting = { ...targetingFromPbjs, ...targetingFromBid };
          const videoCacheKey =
            bid?.videoCacheKey ||
            bid?.cacheId ||
            bid?.vastCacheKey ||
            targeting.hb_uuid ||
            targeting.hb_cache_id ||
            null;

          if (!targeting.hb_uuid && videoCacheKey) targeting.hb_uuid = String(videoCacheKey);
          if (!targeting.hb_cache_id && videoCacheKey) targeting.hb_cache_id = String(videoCacheKey);
          if (!targeting.hb_cache_host && bid?.hb_cache_host) targeting.hb_cache_host = String(bid.hb_cache_host);
          if (!targeting.hb_cache_path && bid?.hb_cache_path) targeting.hb_cache_path = String(bid.hb_cache_path);
          if (!targeting.hb_pb) {
            const pb = bid?.pbCg || bid?.pbAg || bid?.pbHg || bid?.pbDg || bid?.pbLg || null;
            if (pb != null) targeting.hb_pb = String(pb);
          }
          if (!targeting.hb_bidder && bid?.bidderCode) targeting.hb_bidder = String(bid.bidderCode);
          if (!targeting.hb_format) targeting.hb_format = "video";
          if (!targeting.hb_adid && bid?.adId) targeting.hb_adid = String(bid.adId);
          if (!targeting.hb_size && bid?.width && bid?.height) targeting.hb_size = `${bid.width}x${bid.height}`;

          const targetingKeysPresent = Object.keys(targeting).filter(Boolean).sort();
          const hasVastUrl = Boolean(bid?.vastUrl);
          const hasVastXml = Boolean(bid?.vastXml);
          const hasVideoCacheKey = Boolean(videoCacheKey);
          const hasCacheSignal =
            hasVideoCacheKey ||
            Boolean(targeting.hb_uuid) ||
            Boolean(targeting.hb_cache_id) ||
            Boolean(targeting.hb_cache_host) ||
            Boolean(targeting.hb_cache_path);

          return {
            targeting,
            targetingSource: Object.keys(targetingFromBid).length ? "bid.adserverTargeting" : Object.keys(targetingFromPbjs).length ? "pbjs.getAdserverTargetingForAdUnitCode" : "fallback_fields",
            targetingKeysPresent,
            hasVastUrl,
            hasVastXml,
            hasVideoCacheKey,
            videoCacheKey: videoCacheKey || null,
            hasCacheSignal,
            cacheSignals: {
              videoCacheKey: videoCacheKey || null,
              hb_uuid: targeting.hb_uuid || null,
              hb_cache_id: targeting.hb_cache_id || null,
              hb_cache_host: targeting.hb_cache_host || null,
              hb_cache_path: targeting.hb_cache_path || null,
            },
          };
        }

        buildCustParamsString(paramMap) {
          return Object.entries(paramMap)
            .filter(([key, value]) => key && value != null && String(value) !== "")
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
            .join("&");
        }

        buildGAMVideoTagUrl() {
          const networkId = this.node.manager.networkId;
          const adUnitPath = this.getVideoAdUnitPath();
          const videoId = this.node.videoId;
          const playerSize = this.config.video?.playerSize || [640, 360];
          const bid = this._lastVideoBid;
          const allowDirectVastFallback = this.config.video?.allowDirectVastFallback === true;
          const bidDiagnostics = this.getVideoBidDiagnostics(bid);
          const custParamMap = {
            interstitial: "true",
            p: this.node.id,
            ...bidDiagnostics.targeting,
          };

          logInterstitial(`[Interstitial:Auction:${this.node.id}] video_bid_targeting_detected`, {
            ...this.summarizeBid(bid),
            targetingSource: bidDiagnostics.targetingSource,
            targetingKeysPresent: bidDiagnostics.targetingKeysPresent,
          });
          logInterstitial(`[Interstitial:Auction:${this.node.id}] video_bid_cache_detected`, {
            ...this.summarizeBid(bid),
            hasVideoCacheKey: bidDiagnostics.hasVideoCacheKey,
            videoCacheKey: bidDiagnostics.videoCacheKey,
            cacheSignals: bidDiagnostics.cacheSignals,
            hasVastUrl: bidDiagnostics.hasVastUrl,
            hasVastXml: bidDiagnostics.hasVastXml,
          });
          if (!bidDiagnostics.hasCacheSignal) {
            warnInterstitial(`[Interstitial:Auction:${this.node.id}] video_bid_missing_cache_signal`, {
              ...this.summarizeBid(bid),
              targetingSource: bidDiagnostics.targetingSource,
              targetingKeysPresent: bidDiagnostics.targetingKeysPresent,
            });
          }
          if (!bidDiagnostics.hasVastUrl && !bidDiagnostics.hasVastXml) {
            warnInterstitial(`[Interstitial:Auction:${this.node.id}] video_bid_missing_vast_signal`, {
              ...this.summarizeBid(bid),
              targetingSource: bidDiagnostics.targetingSource,
            });
          }

          if (window.apstag && window.apstag.targetingKeys) {
            const tamKeys = window.apstag.targetingKeys();
            if (tamKeys && tamKeys[videoId]) {
              Object.entries(tamKeys[videoId]).forEach(([k, v]) => {
                const value = Array.isArray(v) ? v.join(",") : v;
                if (value != null && value !== "") custParamMap[k] = value;
              });
            }
          }

          const custParams = this.buildCustParamsString(custParamMap);
          logInterstitial(`[Interstitial:Auction:${this.node.id}] gam_video_tag_required`, {
            ...this.summarizeBid(bid),
            adUnitPath,
            allowDirectVastFallback,
          });
          logInterstitial(`[Interstitial:Auction:${this.node.id}] gam_video_targeting_payload`, {
            ...this.summarizeBid(bid),
            targetingSource: bidDiagnostics.targetingSource,
            targetingKeysPresent: bidDiagnostics.targetingKeysPresent,
            custParams,
          });

          const params = new URLSearchParams({
            iu: `/${networkId}/${adUnitPath}`,
            vpos: "preroll",
            sz: `${playerSize[0]}x${playerSize[1]}`,
            gdfp_req: "1",
            env: "vp",
            output: "xml_vast4",
            unviewed_position_start: "1",
            ad_rule: "0",
            plcmt: String(this.config.video?.plcmt || 1),
            vpmute: "1",
            vpa: "auto",
            url: window.location.href,
            description_url: window.location.href,
            correlator: String(Date.now()),
            cust_params: custParams,
          });

          let finalUrl = `https://securepubads.g.doubleclick.net/gampad/ads?${params.toString()}`;
          let deliveryMode = "gam_ad_tag";

          if (!finalUrl) {
            warnInterstitial(`[Interstitial:Auction:${this.node.id}] gam_video_tag_unavailable`, {
              ...this.summarizeBid(bid),
              reason: "missing_gam_video_tag",
              allowDirectVastFallback,
            });
          }

          if (!bidDiagnostics.hasCacheSignal && bid?.vastUrl && allowDirectVastFallback) {
            finalUrl = bid.vastUrl;
            deliveryMode = "direct_vast_url_fallback";
            warnInterstitial(`[Interstitial:Auction:${this.node.id}] direct_vast_fallback_used`, {
              ...this.summarizeBid(bid),
              reason: "missing_cache_signal",
            });
          } else if (!bidDiagnostics.hasCacheSignal && bid?.vastUrl) {
            logInterstitial(`[Interstitial:Auction:${this.node.id}] direct_vast_fallback_disabled`, {
              ...this.summarizeBid(bid),
              reason: "missing_cache_signal",
              allowDirectVastFallback,
            });
          }

          logInterstitial(`[Interstitial:Auction:${this.node.id}] gam_video_cache_resolution`, {
            ...this.summarizeBid(bid),
            deliveryMode,
            targetingSource: bidDiagnostics.targetingSource,
            cacheSignals: bidDiagnostics.cacheSignals,
            hasVastUrl: bidDiagnostics.hasVastUrl,
            hasVastXml: bidDiagnostics.hasVastXml,
            custParams,
          });
          logInterstitial(`[Interstitial:Video:${this.node.id}] gam_vast_url`, finalUrl);
          return finalUrl;
        }

        getVideoAdUnitPath() {
          const overridePath = this.config.video?.adUnitPath;
          const basePath = this.node.manager.adUnitPath || this.config.display?.adUnitPath || "";
          let finalPath = overridePath || basePath;
          if (!overridePath) {
            const parts = String(basePath || "").split("/").filter(Boolean);
            if (parts.length > 0) {
              parts[parts.length - 1] = "video-interstitial";
              finalPath = parts.join("/");
            } else {
              finalPath = "video-interstitial";
            }
          }
          logInterstitial(`[Interstitial:Video:${this.node.id}] video_ad_unit_path`, {
            baseAdUnitPath: basePath,
            overrideAdUnitPath: overridePath || null,
            finalAdUnitPath: finalPath,
          });
          return finalPath;
        }

        registerPrebidAdUnit(configuration) {
          const pb = window.pbjs;
          if (!pb) return;
          try {
            googletag.cmd.push(() => {
              const gptSlots = googletag.pubads().getSlots();
              gptSlots.forEach((slot) => {
                if (slot.getSlotElementId() === configuration.code || slot.getSlotElementId()?.startsWith("gexp-interstitial")) {
                  const tMap = slot.getTargetingMap();
                  Object.keys(tMap).forEach((key) => {
                    if (key.startsWith("hb_")) {
                      slot.clearTargeting(key);
                    }
                  });
                }
              });
            });
          } catch (e) {}
          pb.removeAdUnit(configuration.code);
          if (configuration?.mediaTypes?.video) {
            logInterstitial(`[Interstitial:Prebid:${this.node.id}] interstitial_prebid_video_media_types`, configuration.mediaTypes.video);
            logInterstitial(
              `[Interstitial:Prebid:${this.node.id}] interstitial_prebid_video_bidders`,
              (configuration.bids || [])
                .filter((bid) => bid?.mediaTypes?.video)
                .map((bid) => ({ bidder: bid.bidder || null, params: bid.params || {} })),
            );
          }
          logInterstitial(`[Interstitial:Prebid:${this.node.id}] interstitial_prebid_multiformat_adunit`, configuration);
          pb.addAdUnits([configuration]);
        }

        registerPrebidAliases() {
          if (this._aliasesRegistered) return;
          this._aliasesRegistered = true;
          const networkId = this.gexp.cfg.networkId;
          const prebidNetworks = this.config.prebid?.networks || {};
          const targetNetwork = prebidNetworks[networkId] || prebidNetworks.default || {};
          const aliases = targetNetwork.aliases;
          if (!aliases || !window.pbjs || !window.pbjs.que) return;
          window.pbjs.que.push(() => {
            try {
              const gvlMapping = {
                rubicon: 52,
                appnexus: 32,
                criteo: 91,
                pubmatic: 76,
                smartadserver: 45,
                ix: 10,
                ttd: 21,
                teads: 132,
              };
              for (const [alias, original] of Object.entries(aliases)) {
                if (typeof window.pbjs.aliasBidder === "function") {
                  if (gvlMapping[original]) {
                    window.pbjs.aliasBidder(original, alias, { gvlid: gvlMapping[original] });
                    logInterstitial(`[Interstitial:Prebid:${this.node.id}] prebid_alias_registered_with_gvl`, {
                      alias,
                      original,
                      gvlid: gvlMapping[original],
                    });
                  } else {
                    window.pbjs.aliasBidder(original, alias);
                    logInterstitial(`[Interstitial:Prebid:${this.node.id}] prebid_alias_registered_without_gvl`, {
                      alias,
                      original,
                    });
                  }
                }
              }
            } catch (err) {
              warnInterstitial(`[Interstitial:Prebid:${this.node.id}] prebid_alias_registration_failed`, {
                error: err,
              });
            }
          });
        }

        getDisplaySizes() {
          const sizes = this.config.display?.sizes;
          if (Array.isArray(sizes) && sizes.length) return sizes;
          return [[300, 250]];
        }

        getPrebidTimeout() {
          return this.config.prebid?.timeoutMs || 1000;
        }

        summarizeBid(bid) {
          if (!bid) return null;
          const diagnostics = this.getVideoBidDiagnostics(bid);
          return {
            bidder: bid.bidder || bid.bidderCode || null,
            bidderCode: bid.bidderCode || bid.bidder || null,
            cpm: bid.cpm ?? null,
            mediaType: bid.mediaType || null,
            adId: bid.adId || null,
            auctionId: bid.auctionId || null,
            width: bid.width ?? null,
            height: bid.height ?? null,
            hasVastUrl: Boolean(bid.vastUrl),
            hasVastXml: Boolean(bid.vastXml),
            hasVideoCacheKey: diagnostics.hasVideoCacheKey,
            hasHtmlAd: typeof bid.ad === "string" && bid.ad.trim().length > 0,
            targetingKeysPresent: diagnostics.targetingKeysPresent,
            isAliasVideo: this.isAliasVideoBid(bid),
          };
        }

        reportNoShow(reason, extra = {}) {
          const finalReason = reason || "unknown_no_show";
          this._lastNoShowReason = finalReason;
          warnInterstitial(`[Interstitial:Auction:${this.node.id}] no_show`, {
            reason: finalReason,
            ...extra,
          });
        }
      }
      class InterstitialVideoCreative {
        constructor({ container, adTagUrl, bid, node, config }) {
          this.container = container;
          this.adTagUrl = adTagUrl || null;
          this.bid = bid || null;
          this.node = node;
          this.config = config;
          this.playerId = `gexp-interstitial-player-${Date.now()}-${Math.random().toString(36).slice(2)}`;
          this.videoEl = null;
          this.player = null;
          this._settled = false;
          this._aborted = false;
          this._adFlowStarted = false;
          this._dummyBootstrapActive = false;
          this._bootstrapWindowOpen = false;
          this._bootstrapWindowTimer = null;
          this.allowDirectVastFallback = this.config.video?.allowDirectVastFallback === true;
          this.lastFailureReason = null;
        }

        async render() {
          logInterstitial(`[Interstitial:Video:${this.node.id}] render_start`, {
            adTagUrl: this.adTagUrl,
            bidder: this.bid?.bidderCode || null,
            cpm: this.bid?.cpm ?? null,
          });
          await this.ensureDependencies();
          this.createVideoElement();
          this.initVideoJS();
          await this.requestAds();
        }

        async ensureDependencies() {
          const AssetLoader = {
            loadScript(src) {
              return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                  resolve();
                  return;
                }
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
              });
            },
            loadCSS(href) {
              if (document.querySelector(`link[href="${href}"]`)) return;
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = href;
              document.head.appendChild(link);
            },
          };

          AssetLoader.loadCSS("https://vjs.zencdn.net/7.20.3/video-js.css");
          AssetLoader.loadCSS("https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/6.9.0/videojs-contrib-ads.css");
          AssetLoader.loadCSS("https://cdnjs.cloudflare.com/ajax/libs/videojs-ima/1.11.0/videojs.ima.css");

          if (!window.videojs) {
            await AssetLoader.loadScript("https://vjs.zencdn.net/7.20.3/video.min.js");
          }
          await AssetLoader.loadScript("https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/6.9.0/videojs-contrib-ads.min.js");
          if (!window.google?.ima) {
            await AssetLoader.loadScript("https://imasdk.googleapis.com/js/sdkloader/ima3.js");
          }
          await AssetLoader.loadScript("https://cdnjs.cloudflare.com/ajax/libs/videojs-ima/1.11.0/videojs.ima.min.js");
        }

        createVideoElement() {
          const slotEl = this.container.getVideoSlotElement();
          if (!slotEl) throw new Error("missing_video_slot");
          slotEl.innerHTML = "";
          this.videoEl = document.createElement("video");
          this.videoEl.id = this.playerId;
          this.videoEl.className = "video-js vjs-default-skin vjs-big-play-centered";
          this.videoEl.setAttribute("playsinline", "");
          this.videoEl.setAttribute("webkit-playsinline", "");
          this.videoEl.setAttribute("muted", "muted");
          this.videoEl.setAttribute("preload", "auto");
          const sourceEl = document.createElement("source");
          sourceEl.src =
            "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAABqhtb292AAAAbG12aGQAAAAA3WwLtt1sC7YAAAPoAAAAqgABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAGGlvZHMAAAAAEID/AABEAAAn1QAAAAAABNN0cmFrAAAAXHRraGQAAAAD3WwLtt1sC7YAAAABAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAHgAAABIAAAAAAAMtbWRpYQAAACBtZGhkAAAAAN1sC7bdbAu2AAAD6AAAAKpxAAQAAAAAAAFoZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAittaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAIIc3RibAAAAGRzdHNkAAAAAAAAAAEAAABQVmF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAHgASAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwH0AAr/4QAYZ/QACq609NQYBBmQAAADAAQAAAMANI8WLkgAAAAQZ2QACqwOQAAAAAAAEHN0dHMAAAAAAAAAAQAAAAEAAACqAAAAFHN0c3MAAAAAAAAAAQAAAAEAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAAEwAAAAEAAAAUc3RjbwAAAAAAAAABAAAALAAAAGR1dHRhAAAAWG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAK2lsc3QAAAAjqXRvbwAAABtkYXRhAAAAAQAAAABBcHBsZSBWdWxjYW4A";
          sourceEl.type = "video/mp4";
          this.videoEl.appendChild(sourceEl);
          this._dummyBootstrapActive = true;
          logInterstitial(`[Interstitial:Video:${this.node.id}] dummy_bootstrap_src_set`, {
            playerId: this.playerId,
          });
          this.videoEl.style.width = "min(90vw, 960px)";
          this.videoEl.style.height = "auto";
          this.videoEl.style.maxHeight = "85vh";
          this.videoEl.style.display = "block";
          slotEl.appendChild(this.videoEl);
        }

        openBootstrapWindow(reason = "unknown") {
          this.closeBootstrapWindow("reopen");
          this._bootstrapWindowOpen = true;
          logInterstitial(`[Interstitial:Video:${this.node.id}] bootstrap_window_open`, {
            reason,
            playerId: this.playerId,
          });
          this._bootstrapWindowTimer = setTimeout(() => {
            this.closeBootstrapWindow("bootstrap_window_timeout");
          }, 8000);
        }

        closeBootstrapWindow(reason = "unknown") {
          if (this._bootstrapWindowTimer) {
            clearTimeout(this._bootstrapWindowTimer);
            this._bootstrapWindowTimer = null;
          }
          if (!this._bootstrapWindowOpen) return;
          this._bootstrapWindowOpen = false;
          this._dummyBootstrapActive = false;
          logInterstitial(`[Interstitial:Video:${this.node.id}] bootstrap_window_closed`, {
            reason,
            playerId: this.playerId,
          });
        }

        shouldIgnoreCode4DuringBootstrap(err) {
          return err?.code === 4 && this._bootstrapWindowOpen && !this._settled && !this._aborted;
        }

        initVideoJS() {
          this.openBootstrapWindow("videojs_init");
          this.player = window.videojs(this.videoEl, {
            autoplay: false,
            muted: true,
            controls: false,
            preload: "auto",
            fluid: true,
            errorDisplay: false,
          });
          this.player.on("error", () => {
            const err = this.player?.error?.();
            if (this.shouldIgnoreCode4DuringBootstrap(err)) {
              logInterstitial(`[Interstitial:Video:${this.node.id}] player_media_error_ignored_bootstrap_window`, {
                reason: "bootstrap_or_ima_takeover_src_not_supported",
                code: err?.code || null,
                message: err?.message || null,
                bootstrapWindowOpen: this._bootstrapWindowOpen,
                adFlowStarted: this._adFlowStarted,
              });
              const errDisplay = this.videoEl?.parentElement?.querySelector?.(".vjs-error-display");
              if (errDisplay) errDisplay.style.display = "none";
              return;
            }
            this.lastFailureReason = "video_media_error";
            warnInterstitial(`[Interstitial:Video:${this.node.id}] player_media_error_terminal`, {
              reason: this.lastFailureReason,
              code: err?.code || null,
              message: err?.message || null,
            });
          });
          logInterstitial(`[Interstitial:Video:${this.node.id}] player_created`, { playerId: this.playerId });
        }

        requestAds() {
          return new Promise((resolve, reject) => {
            if (!this.player) {
              reject(new Error("no_player"));
              return;
            }

            const useAdsResponse = !this.adTagUrl && this.allowDirectVastFallback && !!this.bid?.vastXml;
            const adTagUrl = useAdsResponse ? null : (this.adTagUrl || (this.allowDirectVastFallback ? this.bid?.vastUrl : ""));
            if (!useAdsResponse && !adTagUrl) {
              warnInterstitial(`[Interstitial:Video:${this.node.id}] gam_video_tag_unavailable`, {
                reason: "missing_ad_tag_url",
                allowDirectVastFallback: this.allowDirectVastFallback,
                hasVastUrl: Boolean(this.bid?.vastUrl),
                hasVastXml: Boolean(this.bid?.vastXml),
              });
              if ((this.bid?.vastUrl || this.bid?.vastXml) && !this.allowDirectVastFallback) {
                logInterstitial(`[Interstitial:Video:${this.node.id}] direct_vast_fallback_disabled`, {
                  reason: "missing_ad_tag_url",
                  hasVastUrl: Boolean(this.bid?.vastUrl),
                  hasVastXml: Boolean(this.bid?.vastXml),
                });
              }
              reject(new Error("missing_vast_tag"));
              return;
            }
            if (!this.adTagUrl && this.allowDirectVastFallback && (this.bid?.vastUrl || this.bid?.vastXml)) {
              warnInterstitial(`[Interstitial:Video:${this.node.id}] direct_vast_fallback_used`, {
                reason: useAdsResponse ? "using_vast_xml_ads_response" : "using_vast_url_ad_tag",
                hasVastUrl: Boolean(this.bid?.vastUrl),
                hasVastXml: Boolean(this.bid?.vastXml),
              });
            }

            let adStarted = false;
            let firstFramePlayed = false;
            let terminalEvent = null;
            let nativeAdError = null;
            let adstartGraceTimer = null;
            const prepareTimeoutMs = this.getPrepareTimeoutMs();
            const imaTimeoutMs = this.getImaTimeoutMs();
            const clearTimers = () => {
              clearTimeout(timeout);
              if (adstartGraceTimer) {
                clearTimeout(adstartGraceTimer);
                adstartGraceTimer = null;
              }
            };
            const settleResolve = (source = "unknown") => {
              if (this._settled) return;
              this._settled = true;
              firstFramePlayed = true;
              clearTimers();
              this.closeBootstrapWindow(`ready_${source}`);
              logInterstitial(`[Interstitial:Video:${this.node.id}] ready`, {
                source,
                reveal_real_source: source,
              });
              resolve(true);
            };
            const settleReject = (err) => {
              if (this._settled) return;
              this._settled = true;
              clearTimers();
              this.closeBootstrapWindow("prepare_reject");
              this.lastFailureReason = err?.message || "video_prepare_failed";
              warnInterstitial(`[Interstitial:Video:${this.node.id}] prepare_terminal`, {
                reason: this.lastFailureReason,
                terminalEvent,
                nativeAdError,
              });
              warnInterstitial(`[Interstitial:Video:${this.node.id}] prepare_fail_reason`, {
                reason: this.lastFailureReason,
                terminalEvent,
                bidder: this.bid?.bidderCode || this.bid?.bidder || null,
                cpm: this.bid?.cpm ?? null,
              });
              reject(err);
            };
            const markTerminal = (reason) => {
              if (terminalEvent) return false;
              terminalEvent = reason;
              return true;
            };
            const rejectBeforeReady = (reason, details = null) => {
              if (this._settled || this._aborted) return;
              if (!markTerminal(reason)) return;
              const err = new Error(reason);
              if (details) err.details = details;
              settleReject(err || new Error(reason));
            };
            const timeout = setTimeout(() => {
              logInterstitial(`[Interstitial:Video:${this.node.id}] prepare_timeout`, {
                timeoutMs: prepareTimeoutMs,
                adStarted,
                firstFramePlayed,
                terminalEvent,
              });
              rejectBeforeReady("video_prepare_timeout");
            }, prepareTimeoutMs);

            const revealPlayer = (source = "unknown") => {
              if (firstFramePlayed || terminalEvent || this._aborted) return;
              settleResolve(source);
            };

            const handleTerminalBeforePlayback = (reason, details = null) => {
              if (firstFramePlayed) {
                markTerminal(reason);
                return;
              }
              rejectBeforeReady(reason, details);
            };

            this.player.on("adstart", () => {
              this._adFlowStarted = true;
              adStarted = true;
              logInterstitial(`[Interstitial:Video:${this.node.id}] adstart`);
              if (adstartGraceTimer) clearTimeout(adstartGraceTimer);
              adstartGraceTimer = setTimeout(() => {
                if (!this._settled && !terminalEvent && !this._aborted && !firstFramePlayed) {
                  revealPlayer("adstart_grace");
                }
              }, 200);
            });
            this.player.on("timeupdate", () => {
              const currentTime = typeof this.player.currentTime === "function" ? this.player.currentTime() : null;
              logInterstitial(`[Interstitial:Video:${this.node.id}] timeupdate`, { currentTime });
              if (adStarted && currentTime > 0) {
                revealPlayer("timeupdate");
              }
            });
            this.player.on("adserror", (evt) => {
              this.closeBootstrapWindow("adserror");
              const err = evt?.data?.AdError;
              nativeAdError = {
                code: err?.getErrorCode?.() || null,
                message: err?.getMessage?.() || null,
                vastCode: err?.getVastErrorCode?.() || null,
              };
              warnInterstitial(`[Interstitial:Video:${this.node.id}] ima_ad_error`, {
                reason: "video_ad_error",
                ...nativeAdError,
              });
              handleTerminalBeforePlayback("video_ad_error", nativeAdError);
            });
            this.player.on("adtimeout", () => {
              this.closeBootstrapWindow("adtimeout");
              warnInterstitial(`[Interstitial:Video:${this.node.id}] adtimeout`, { reason: "video_ad_timeout" });
              handleTerminalBeforePlayback("video_ad_timeout");
            });
            this.player.on("readyforpreroll", () => {
              logInterstitial(`[Interstitial:Video:${this.node.id}] readyforpreroll`);
            });
            this.player.on("adend", () => {
              this.closeBootstrapWindow("adend");
              logInterstitial(`[Interstitial:Video:${this.node.id}] adend`);
              handleTerminalBeforePlayback("video_end_before_ready");
            });
            this.player.on("alladscompleted", () => {
              this.closeBootstrapWindow("alladscompleted");
              logInterstitial(`[Interstitial:Video:${this.node.id}] alladscompleted`);
              handleTerminalBeforePlayback("video_alladscompleted_before_ready");
            });
            this.player.on("error", () => {
              const err = this.player?.error?.();
              if (this.shouldIgnoreCode4DuringBootstrap(err)) {
                logInterstitial(`[Interstitial:Video:${this.node.id}] player_media_error_ignored_bootstrap_window`, {
                  reason: "bootstrap_or_ima_takeover_src_not_supported",
                  code: err?.code || null,
                  message: err?.message || null,
                  bootstrapWindowOpen: this._bootstrapWindowOpen,
                  adFlowStarted: this._adFlowStarted,
                });
                return;
              }
              this.closeBootstrapWindow("player_media_error");
              warnInterstitial(`[Interstitial:Video:${this.node.id}] player_media_error_terminal`, {
                reason: "video_media_error",
                code: err?.code || null,
                message: err?.message || null,
              });
              handleTerminalBeforePlayback("video_media_error", {
                code: err?.code || null,
                message: err?.message || null,
              });
            });

            this.player.ready(() => {
              try {
                logInterstitial(`[Interstitial:Video:${this.node.id}] player_ready`);
                const options = {
                  id: this.playerId,
                  showCountdown: true,
                  autoPlayAdBreaks: true,
                  debug: true,
                  timeout: imaTimeoutMs,
                  prerollTimeout: imaTimeoutMs,
                  postrollTimeout: imaTimeoutMs,
                  ...(useAdsResponse ? { adsResponse: this.bid?.vastXml } : { adTagUrl }),
                };
                logInterstitial(`[Interstitial:Video:${this.node.id}] ima_init`, options);
                this._adFlowStarted = true;
                this.player.ima(options);
                if (
                  this.player.ima &&
                  typeof this.player.ima.addEventListener === "function" &&
                  window.google?.ima?.AdEvent &&
                  window.google?.ima?.AdErrorEvent
                ) {
                  this.player.ima.addEventListener(
                    window.google.ima.AdErrorEvent.Type.AD_ERROR,
                    (event) => {
                      this.closeBootstrapWindow("native_ad_error");
                      const err = event.getError();
                      nativeAdError = {
                        code: err?.getErrorCode?.() || null,
                        message: err?.getMessage?.() || null,
                        vastCode: err?.getVastErrorCode?.() || null,
                      };
                      warnInterstitial(`[Interstitial:Video:${this.node.id}] ima_ad_error`, {
                        reason: "video_native_ad_error",
                        ...nativeAdError,
                      });
                      handleTerminalBeforePlayback("video_native_ad_error", nativeAdError);
                    },
                  );
                  this.player.ima.addEventListener(
                    window.google.ima.AdEvent.Type.STARTED,
                    () => {
                      logInterstitial(`[Interstitial:Video:${this.node.id}] native_started`);
                      revealPlayer("ima_started");
                    },
                  );
                  this.player.ima.addEventListener(
                    window.google.ima.AdEvent.Type.COMPLETE,
                    () => {
                      this.closeBootstrapWindow("native_complete");
                      handleTerminalBeforePlayback("video_end_before_ready");
                    },
                  );
                  this.player.ima.addEventListener(
                    window.google.ima.AdEvent.Type.SKIPPED,
                    () => {
                      this.closeBootstrapWindow("native_skipped");
                      handleTerminalBeforePlayback("video_end_before_ready");
                    },
                  );
                }
                this.player.ima.initializeAdDisplayContainer();
                const playPromise = this.player.play();
                if (playPromise && playPromise.catch) {
                  playPromise.catch((err) => {
                    warnInterstitial(`[Interstitial:Video:${this.node.id}] player_media_error_terminal`, {
                      reason: "video_media_error",
                      message: err?.message || null,
                    });
                  });
                }
              } catch (err) {
                settleReject(err);
              }
            });
          });
        }

        getPrepareTimeoutMs() {
          const timeoutMs = parseInt(this.config.video?.prepareTimeoutMs, 10);
          return Number.isFinite(timeoutMs) && timeoutMs >= 0 ? timeoutMs : 25000;
        }

        getImaTimeoutMs() {
          const timeoutMs = parseInt(this.config.video?.imaTimeoutMs, 10);
          return Number.isFinite(timeoutMs) && timeoutMs >= 0 ? timeoutMs : 30000;
        }

        destroy() {
          this._aborted = true;
          this.closeBootstrapWindow("destroy");
          logInterstitial(`[Interstitial:Video:${this.node.id}] destroy_abort`, {
            settled: this._settled,
            reason: this.lastFailureReason,
          });
          try {
            this.player?.dispose?.();
          } catch (err) {}
          this.player = null;
        }
      }

      class InterstitialManager {
        constructor(config, gexpInstance) {
          this.config = config;
          this.gexp = gexpInstance;
          this.node = null;
          this.siteContext = this.getSiteContext();
          this.siteConfig = this.resolveSiteConfig();
          this.adUnitPath = this.extractStaticAdUnitPath();
          this.networkId = this.config?.networkId || "99071977";
          this._delayTimer = null;
          this._visibilityListener = null;
          ensureInterstitialBaseStyles();

          if (this.siteConfig?.debug === true) {
            window.gexpInterstitialDebug = true;
          }

          logInterstitial(`[InterstitialManager] bootstrap`, {
            siteContext: this.siteContext,
            hasSiteConfig: !!this.siteConfig,
            initialAdUnitPath: this.adUnitPath,
            networkId: this.networkId,
          });

          if (!this.gexp.isEnabled() || !this.siteConfig) return;

          const boot = () => {
            googletag.cmd.push(() => {
              this.resolveAdUnit();
              this.siteContext.contentType = this.detectContentType();
              this.siteConfig = this.resolveContentTypeProfile(this.siteConfig, this.siteContext.contentType);
              logInterstitial(`[InterstitialManager] resolved_bootstrap`, {
                adUnitPath: this.adUnitPath,
                networkId: this.networkId,
                contentType: this.siteContext.contentType,
              });
              if (!this.canRunOnPage()) return;
              this.scheduleActivation();
            });
          };

          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", boot, { once: true });
          } else {
            boot();
          }
        }

        static CONTENT_TYPE_MAP = {
          n: "noticia",
          noticia: "noticia",
          dir: "directo",
          directo: "directo",
          ne: "noticia-especial",
          "noticia-especial": "noticia-especial",
          cro: "cronica",
          cronica: "cronica",
          o: "opinion",
          opinion: "opinion",
        };

        static escapeRegex(str = "") {
          return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }

        static deepMerge(target, source) {
          const isObject = (obj) =>
            obj && typeof obj === "object" && !Array.isArray(obj);
          if (!isObject(target) || !isObject(source)) return source;
          const merged = Object.assign({}, target);
          Object.keys(source).forEach((key) => {
            if (isObject(source[key]) && isObject(merged[key])) {
              merged[key] = InterstitialManager.deepMerge(merged[key], source[key]);
            } else {
              merged[key] = source[key];
            }
          });
          return merged;
        }

        extractStaticAdUnitPath() {
          const devPath = window.GEXP_DEV_CONFIG?.interstitialSites?.default?.general?.display?.adUnitPath;
          if (devPath) return devPath;
          if (typeof data !== "undefined" && data?.adSlots?.[0]?.adUnit) return data.adSlots[0].adUnit;
          if (typeof ueDFPData !== "undefined" && ueDFPData?.adSlots?.[0]?.adUnit) return ueDFPData.adSlots[0].adUnit;
          return this.config?.adUnit || "";
        }

        getSiteContext() {
          const dl = ((typeof window !== "undefined" ? (window.ueDataLayer || window.utag_data) : null) || {});
          return {
            site: dl.be_page_domain || window.location.hostname,
            section: dl.be_page_section || null,
            subsection: dl.be_page_subsection1 || null,
            contentType: this.detectContentType(),
          };
        }

        detectContentType(rootElement = null) {
          const dl = ((typeof window !== "undefined" ? (window.ueDataLayer || window.utag_data) : null) || {});
          if (dl.be_page_content_type) {
            return InterstitialManager.CONTENT_TYPE_MAP[dl.be_page_content_type] || dl.be_page_content_type;
          }
          try {
            if (typeof googletag !== "undefined" && googletag.pubads && typeof googletag.pubads === "function") {
              const ctValues = googletag.pubads().getTargeting("ct");
              if (ctValues && ctValues.length > 0) {
                return InterstitialManager.CONTENT_TYPE_MAP[ctValues[0]] || ctValues[0];
              }
            }
          } catch (e) {}
          const root = rootElement || document;
          if (root.querySelector(".ue-c-streamlive__body")) return "directo";
          if (root.querySelector(".ue-l-article__main-column")) return "noticia";
          return "noticia";
        }

        resolveContentTypeProfile(baseConfig, contentType) {
          const profiles = baseConfig?.contentTypes;
          if (!profiles || !contentType || !profiles[contentType]) return baseConfig;
          return InterstitialManager.deepMerge(baseConfig, profiles[contentType]);
        }

        resolveSiteConfig() {
          const siteConfigs = this.config?.interstitialSites;
          if (!siteConfigs) return null;
          const hostname = this.siteContext.site.replace("www.", "");
          const baseConfig = siteConfigs[hostname] || siteConfigs.default;
          if (!baseConfig?.general) return null;
          let resolved = JSON.parse(JSON.stringify(baseConfig.general));
          const overrides = Array.isArray(baseConfig.overrides) ? baseConfig.overrides : [];
          overrides.forEach((override) => {
            if (this.matchesOverrideConditions(override?.if)) {
              resolved = InterstitialManager.deepMerge(resolved, override?.then || {});
            }
          });
          resolved.__siteContext = this.siteContext;
          return resolved;
        }

        isDebugEnabled() {
          return getInterstitialDebugState() || this.siteConfig?.debug === true;
        }

        shouldBypassCooldown() {
          try {
            if (typeof window !== "undefined") {
              if (window.gexpInterstitialBypassCooldown === true) return true;
              if (window.location && window.location.search.includes("gexpInterstitialBypassCooldown=true")) return true;
              if (window.localStorage && window.localStorage.getItem("gexpInterstitialBypassCooldown") === "true") return true;
            }
          } catch (e) {}

          const storageCfg = this.siteConfig?.storage || {};
          if (storageCfg.respectCooldown === false) return true;
          if (storageCfg.ignoreCooldownWhenDebug === true && this.isDebugEnabled()) return true;
          return false;
        }

        matchesOverrideConditions(conditions) {
          if (!Array.isArray(conditions) || conditions.length === 0) return false;
          return conditions.some((condition) => this.evaluateCondition(condition));
        }

        evaluateCondition(conditionStr = "") {
          const [key, value] = conditionStr.split(":");
          if (!key || typeof value === "undefined") return false;
          switch (key.trim()) {
            case "device": {
              const dl = ((typeof window !== "undefined" ? (window.ueDataLayer || window.utag_data) : null) || {});
              const isMobileVar = dl.device_category === "mobile" || dl.be_page_site_version === "mobile" || this.gexp.isMobileDevice();
              if (value.trim() === "mobile") return isMobileVar;
              if (value.trim() === "desktop") return !isMobileVar;
              return false;
            }
            case "contentType":
              return this.siteContext.contentType === value.trim();
            case "url":
              return this.matchUrlCondition(value.trim());
            default:
              return false;
          }
        }

        matchUrlCondition(pattern) {
          if (!pattern) return false;
          const url = window.location?.pathname || "";
          if (pattern === "*") return true;
          const regex = new RegExp("^" + pattern.split("*").map((part) => InterstitialManager.escapeRegex(part)).join(".*") + "$");
          return regex.test(url);
        }

        resolveAdUnit() {
          let resolvedPath = this.adUnitPath;
          let resolvedNetworkId = this.networkId;
          try {
            const slots = googletag.pubads().getSlots();
            if (slots && slots.length > 0) {
              const refSlot = slots.find((slot) => {
                const elId = slot.getSlotElementId() || "";
                if (elId.startsWith("gexp-intext") || elId.startsWith("gexp-inimage") || elId.startsWith("gexp-interstitial")) return false;
                const path = slot.getAdUnitPath() || "";
                if (/\/p_/.test(path)) return false;
                return true;
              }) || slots[0];
              const fullPath = refSlot.getAdUnitPath();
              if (fullPath) {
                const parts = fullPath.replace(/^\//, "").split("/");
                if (parts.length >= 2) {
                  resolvedNetworkId = parts[0];
                  resolvedPath = parts.slice(1).join("/").replace(/\bp_/g, "");
                }
              }
            }
          } catch (e) {}

          if (!resolvedPath && this.siteConfig?.display?.adUnitPath) {
            resolvedPath = this.siteConfig.display.adUnitPath;
          }

          this.adUnitPath = resolvedPath;
          this.networkId = resolvedNetworkId;
          logInterstitial(`[InterstitialManager] ad_unit_resolved`, {
            baseAdUnitPath: resolvedPath,
            networkId: resolvedNetworkId,
          });
          const networkOverrides = this.siteConfig?.networks?.[this.networkId];
          if (networkOverrides) {
            this.siteConfig = InterstitialManager.deepMerge(this.siteConfig, networkOverrides);
          }
        }

        canRunOnPage() {
          if (!this.siteConfig) {
            warnInterstitial(`[InterstitialManager] canRunOnPage=false`, { reason: "missing_site_config" });
            return false;
          }
          if (this.siteConfig?.domainFilter?.enabled && !this.passesDomainFilter()) {
            warnInterstitial(`[InterstitialManager] canRunOnPage=false`, { reason: "blocked_by_domain_filter" });
            return false;
          }
          const allowedTypes = this.siteConfig.allowedContentTypes || [];
          if (allowedTypes.length > 0 && !allowedTypes.includes(this.siteContext.contentType)) {
            warnInterstitial(`[InterstitialManager] canRunOnPage=false`, {
              reason: "blocked_by_content_type",
              contentType: this.siteContext.contentType,
              allowedTypes,
            });
            return false;
          }
          if (!this.isDeviceAllowed()) {
            warnInterstitial(`[InterstitialManager] canRunOnPage=false`, { reason: "device_not_allowed" });
            return false;
          }
          if (this.isCooldownActive()) {
            warnInterstitial(`[InterstitialManager] canRunOnPage=false`, { reason: "cooldown_active" });
            return false;
          }
          if (this.isBlockedByExclusions()) {
            warnInterstitial(`[InterstitialManager] canRunOnPage=false`, { reason: "blocked_by_exclusions" });
            return false;
          }
          if (!this.isAllowedByInclusions()) {
            warnInterstitial(`[InterstitialManager] canRunOnPage=false`, { reason: "blocked_by_inclusions" });
            return false;
          }
          logInterstitial(`[InterstitialManager] canRunOnPage=true`);
          return true;
        }

        passesDomainFilter() {
          const filter = this.siteConfig?.domainFilter;
          if (!filter || filter.allowedDomains === "all") return true;
          let currentDomain = null;
          const dl = window[filter.dataLayerObj] || window.utag_data;
          if (dl) {
            const dlData = Array.isArray(dl) ? dl[0] : dl;
            currentDomain = dlData?.[filter.dataLayerProp] || null;
          }
          if (!currentDomain && window.location) currentDomain = window.location.hostname;
          return filter.allowedDomains.some((domain) => String(currentDomain || "").includes(domain));
        }

        getPageAdUnitPath() {
          if (typeof data !== "undefined" && data?.adSlots?.[0]?.adUnit) return data.adSlots[0].adUnit;
          if (typeof ueDFPData !== "undefined" && ueDFPData?.adSlots?.[0]?.adUnit) return ueDFPData.adSlots[0].adUnit;
          return this.adUnitPath || null;
        }

        getPageCustomTargeting() {
          if (typeof data !== "undefined" && data?.customTargeting) return data.customTargeting;
          if (typeof ueDFPData !== "undefined" && ueDFPData?.customTargeting) return ueDFPData.customTargeting;
          try {
            if (typeof googletag !== "undefined" && googletag.pubads && typeof googletag.pubads === "function") {
              const pubads = googletag.pubads();
              if (pubads && typeof pubads.getTargetingKeys === "function") {
                const keys = pubads.getTargetingKeys();
                if (keys && keys.length > 0) {
                  const targeting = {};
                  keys.forEach((key) => {
                    const values = pubads.getTargeting(key);
                    targeting[key] = values && values.length === 1 ? values[0] : values;
                  });
                  return targeting;
                }
              }
            }
          } catch (e) {}
          if (typeof window !== "undefined" && (window.ueDataLayer || window.utag_data)) return window.ueDataLayer || window.utag_data;
          return null;
        }

        normalizeTargetingValues(rawValue) {
          if (rawValue === undefined || rawValue === null) return [];
          if (Array.isArray(rawValue)) {
            return rawValue.flatMap((value) => this.normalizeTargetingValues(value)).filter(Boolean);
          }
          if (typeof rawValue === "string" && rawValue.includes(",")) {
            return rawValue.split(",").map((value) => String(value).trim()).filter(Boolean);
          }
          return [String(rawValue).trim()].filter(Boolean);
        }

        isBlockedByExclusions() {
          const excl = this.siteConfig?.exclusions;
          if (!excl) return false;
          if (excl.disableAll === true) {
            logInterstitial(`[InterstitialManager] exclusions`, { blocked: true, reason: "disable_all" });
            return true;
          }
          if (Array.isArray(excl.adUnitPaths) && excl.adUnitPaths.length > 0) {
            const pageAdUnit = this.getPageAdUnitPath();
            if (pageAdUnit && excl.adUnitPaths.some((blockedPath) => pageAdUnit.startsWith(blockedPath))) {
              logInterstitial(`[InterstitialManager] exclusions`, {
                blocked: true,
                reason: "ad_unit_path",
                pageAdUnit,
              });
              return true;
            }
          }
          if (excl.keyValues && typeof excl.keyValues === "object") {
            const pageTargeting = this.getPageCustomTargeting();
            if (pageTargeting) {
              for (const [key, blockedValues] of Object.entries(excl.keyValues)) {
                if (!Array.isArray(blockedValues) || blockedValues.length === 0) continue;
                const pageValues = this.normalizeTargetingValues(pageTargeting[key]);
                if (blockedValues.some((blocked) => pageValues.includes(String(blocked)))) {
                  logInterstitial(`[InterstitialManager] exclusions`, {
                    blocked: true,
                    reason: "key_value",
                    key,
                    pageValues,
                  });
                  return true;
                }
              }
            }
          }
          logInterstitial(`[InterstitialManager] exclusions`, { blocked: false });
          return false;
        }

        isAllowedByInclusions() {
          const inc = this.siteConfig?.inclusions;
          if (!inc) return true;
          if (inc.keyValues && typeof inc.keyValues === "object" && Object.keys(inc.keyValues).length > 0) {
            const pageTargeting = this.getPageCustomTargeting();
            if (!pageTargeting) {
              logInterstitial(`[InterstitialManager] inclusions`, { allowed: false, reason: "missing_page_targeting" });
              return false;
            }
            for (const [key, allowedValues] of Object.entries(inc.keyValues)) {
              if (!Array.isArray(allowedValues) || allowedValues.length === 0) continue;
              const pageValues = this.normalizeTargetingValues(pageTargeting[key]);
              if (allowedValues.some((allowed) => pageValues.includes(String(allowed)))) {
                logInterstitial(`[InterstitialManager] inclusions`, { allowed: true, key, pageValues });
                return true;
              }
            }
            logInterstitial(`[InterstitialManager] inclusions`, { allowed: false, reason: "no_match" });
            return false;
          }
          logInterstitial(`[InterstitialManager] inclusions`, { allowed: true, reason: "no_rules" });
          return true;
        }

        isDeviceAllowed() {
          const targeting = this.siteConfig?.deviceTargeting || {};
          const allowDesktop = targeting.desktop !== false;
          const allowMobile = targeting.mobile !== false;
          const isMobile = this.gexp.isMobileDevice();
          const allowed = !allowDesktop && !allowMobile
            ? false
            : isMobile
              ? allowMobile
              : allowDesktop;
          logInterstitial(`[InterstitialManager] device_gating`, {
            isMobile,
            allowDesktop,
            allowMobile,
            allowed,
          });
          return allowed;
        }

        getLastShownAt() {
          const key = this.siteConfig?.storage?.lastShownAtKey || "gexp_interstitial_last_shown_at";
          try {
            const raw = window.localStorage?.getItem(key);
            return raw ? parseInt(raw, 10) || 0 : 0;
          } catch (e) {
            return 0;
          }
        }

        isCooldownActive() {
          if (this.shouldBypassCooldown()) {
            logInterstitial(`[InterstitialManager] cooldown bypassed`, {
              debugEnabled: this.isDebugEnabled(),
              respectCooldown: this.siteConfig?.storage?.respectCooldown,
              ignoreCooldownWhenDebug: this.siteConfig?.storage?.ignoreCooldownWhenDebug,
            });
            return false;
          }
          const cooldownMs = parseInt(this.siteConfig?.storage?.cooldownMs, 10);
          const effectiveCooldown = Number.isFinite(cooldownMs) && cooldownMs >= 0 ? cooldownMs : 28800000;
          const lastShownAt = this.getLastShownAt();
          const active = lastShownAt > 0 && (Date.now() - lastShownAt) < effectiveCooldown;
          logInterstitial(`[InterstitialManager] cooldown_check`, {
            active,
            lastShownAt,
            cooldownMs: effectiveCooldown,
          });
          return active;
        }

        markShownNow() {
          const key = this.siteConfig?.storage?.lastShownAtKey || "gexp_interstitial_last_shown_at";
          try {
            window.localStorage?.setItem(key, String(Date.now()));
          } catch (e) {}
        }

        scheduleActivation() {
          const delayMs = parseInt(this.siteConfig?.trigger?.delayMs, 10);
          const effectiveDelay = Number.isFinite(delayMs) && delayMs >= 0 ? delayMs : 10000;
          logInterstitial(`[InterstitialManager] delay_armed`, { delayMs: effectiveDelay });
          this._delayTimer = setTimeout(() => this.activateWhenEligible(), effectiveDelay);
        }

        activateWhenEligible() {
          logInterstitial(`[InterstitialManager] start_trigger_delay`);
          if (!this.canRunOnPage()) return;
          if (this.siteConfig?.trigger?.pageVisibleOnly && document.visibilityState !== "visible") {
            warnInterstitial(`[InterstitialManager] page_not_visible`, {
              visibilityState: document.visibilityState,
            });
            this._visibilityListener = () => {
              if (document.visibilityState !== "visible") return;
              document.removeEventListener("visibilitychange", this._visibilityListener);
              this._visibilityListener = null;
              if (this.canRunOnPage()) {
                logInterstitial(`[InterstitialManager] page_visible_resume`);
                this.startNode();
              }
            };
            document.addEventListener("visibilitychange", this._visibilityListener);
            return;
          }
          this.startNode();
        }

        startNode() {
          if (!this.node) {
            this.node = new InterstitialNode({
              manager: this,
              config: this.siteConfig,
            });
          }
          logInterstitial(`[InterstitialManager] node_start`);
          this.node.prepareAndShow();
        }
      }
class WPromise
{
    constructor() {
        let res, rej;
        this.inner = new Promise((resolve, reject) => {
            res = resolve;
            rej = reject;
        });
        this.reject = rej;

        this.resolve = function (ret) {
            res.apply(null, [ret])
        };
        this.then = function (r, e) {
            return this.inner.then(r, e);
        }
    }
}
/**
 * BfCacheEventTracker
 * Tracks pageshow/pagehide events with bfcache detection.
 * Includes fallback when APIs are unavailable.
 */
class BfCacheEventTracker {
    constructor() {
        // Detect API support
        this.isSupported = 'onpageshow' in window && 'onpagehide' in window;

        // Counters
        this.pageshowTotal = 0;
        this.pageshowFromBfcache = 0;
        this.pageshowNotFromBfcache = 0;

        this.pagehideTotal = 0;
        this.pagehideToBfcache = 0;
        this.pagehideNotToBfcache = 0;

        // Fallback state
        this.isFallback = !this.isSupported;

        this._boundPageshow = this._handlePageshow.bind(this);
        this._boundPagehide = this._handlePagehide.bind(this);

        this._setupListeners();
    }

    _setupListeners() {
        if (this.isSupported) {
            window.addEventListener('pageshow', this._boundPageshow);
            window.addEventListener('pagehide', this._boundPagehide);
        }
    }

    _handlePageshow(event) {
        this.pageshowTotal++;
        if (event && 'persisted' in event) {
            if (event.persisted) {
                this.pageshowFromBfcache++;
            } else {
                this.pageshowNotFromBfcache++;
            }
        } else {
            // Rare: event exists but no persisted → treat as non-bfcache
            this.pageshowNotFromBfcache++;
        }
    }

    _handlePagehide(event) {
        this.pagehideTotal++;
        if (event && 'persisted' in event) {
            if (event.persisted) {
                this.pagehideToBfcache++;
            } else {
                this.pagehideNotToBfcache++;
            }
        } else {
            this.pagehideNotToBfcache++;
        }
    }

    /**
     * Returns counts with compatibility flag.
     * If APIs not supported: all counts = 0, isFallback = true.
     */
    getCounts() {
        if (this.isFallback) {
            return {
                pageshowTotal: 0,
                pageshowFromBfcache: 0,
                pageshowNotFromBfcache: 0,
                pagehideTotal: 0,
                pagehideToBfcache: 0,
                pagehideNotToBfcache: 0,
                isFallback: true,
                isSupported: false,
            };
        }

        return {
            pageshowTotal: this.pageshowTotal,
            pageshowFromBfcache: this.pageshowFromBfcache,
            pageshowNotFromBfcache: this.pageshowNotFromBfcache,
            pagehideTotal: this.pagehideTotal,
            pagehideToBfcache: this.pagehideToBfcache,
            pagehideNotToBfcache: this.pagehideNotToBfcache,
            isFallback: false,
            isSupported: true,
        };
    }

    reset() {
        this.pageshowTotal = 0;
        this.pageshowFromBfcache = 0;
        this.pageshowNotFromBfcache = 0;
        this.pagehideTotal = 0;
        this.pagehideToBfcache = 0;
        this.pagehideNotToBfcache = 0;
    }

    destroy() {
        if (this.isSupported) {
            window.removeEventListener('pageshow', this._boundPageshow);
            window.removeEventListener('pagehide', this._boundPagehide);
        }
    }
}

class PageVisibilityTracker {
    constructor({ minVisibleMs = 300 } = {}) {
        this.minVisibleMs = minVisibleMs; // minimum visible duration to count
        this.lastVisibleTime = 0; // timestamp when page was last visible
        this.isVisibleNow = false;
        this.initialVisibilityState=document.visibilityState;
        this.lastVisibilityState=document.visibilityState;
        setInterval(()=>{this.lastVisibilityState=document.visibilityState;},5000);
        this.nVisibilityChanges=0;
        this.totalVisibleTime = 0; // total visible time in ms
        this._lastUpdateTime = Date.now(); // for delta calculations
        this._pageLoadTime = this._lastUpdateTime; // track page lifetime

        // Bind events
        document.addEventListener('visibilitychange', () =>{this.nVisibilityChanges++;this._update()});
        window.addEventListener('resize', () => this._update());

        // Initial check
        this._update();
    }

    /**
     * Internal update function
     */
    _update() {
        const now = Date.now();

        // Accumulate visible time if previously visible
        if (this.isVisibleNow) {
            this.totalVisibleTime += now - this._lastUpdateTime;
        }

        this.isVisibleNow = this._checkVisible();
        if (this.isVisibleNow) this.lastVisibleTime = now;

        this._lastUpdateTime = now;
    }

    /**
     * Returns true if tab is selected and window is not minimized
     */
    _checkVisible() {
        const tabVisible = document.visibilityState === 'visible';
        const windowVisible = window.innerWidth > 0 && window.innerHeight > 0;
        return tabVisible && windowVisible;
    }

    /**
     * Returns true if page has been recently visible (avoiding very brief flips)
     */
    isRecentlyVisible() {
        return Date.now() - this.lastVisibleTime < this.minVisibleMs;
    }

    /**
     * Returns total visible time and percentage of page lifetime
     */
    getTotalVisibleTime() {
        this._update();

        const now = Date.now();
        const pageLifetime = now - this._pageLoadTime;
        const visiblePercentage = pageLifetime > 0
            ? (this.totalVisibleTime / pageLifetime) * 100
            : 0;

        return {
            absoluteMs: this.totalVisibleTime,
            percentage: visiblePercentage
        };
    }

    /**
     * Callback helper for visibility changes
     */
    onChange(callback) {
        const checkAndCallback = () => callback(this.isRecentlyVisible());
        document.addEventListener('visibilitychange', checkAndCallback);
        window.addEventListener('resize', checkAndCallback);
    }
}

class BaseStorage {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.startTime = performance.now();
        this.data = this.load();
    }

    // Set a key-value pair
    set(key, value) {
        this.data[key] = value;
        this.save();
    }
    get(key)
    {
        return this.data[key] ?? null;
    }
    // Get all stored data
    getAll() {
        return this.data;
    }

    // Load data from storage (to be implemented by derived classes)
    load() {
        // By default, load nothing and initialize data
        return {};
    }

    // Save current data to storage (for derived classes to implement)
    save() {}

    // Get the time the page visit started
    getVisitStart() {
        return this.startTime;
    }

    // Get the elapsed time from the start of the page visit in milliseconds
    getVisitOffset() {
        return performance.now() - this.startTime;
    }
}

class SessionStorage extends BaseStorage {
    constructor() {
        super("sessionStorageData");
    }

    load() {
        const sessionData = sessionStorage.getItem(this.storageKey);
        return sessionData ? JSON.parse(sessionData) : {};
    }

    save() {
        sessionStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }
}

class DailyStorage extends BaseStorage {
    constructor() {
        super("gexpDaily");

    }

    load() {
        this.currentDate = new Date().toDateString();
        const dailyData = localStorage.getItem(this.storageKey);
        const parsedData = dailyData ? JSON.parse(dailyData) : {};

        // Check if data is from the current day, reset if not
        if (parsedData.date !== this.currentDate) {
            this.data=this.initDay(parsedData);
            this.save();
        } else {
            this.data = parsedData.data || this.initDay({});
        }

        return this.data;
    }
    initDay(curVal)
    {
        let t={};
        if(typeof t.userType>=3)
            t.userType=3;
        return t;
    }

    save() {
        const dataToStore = { date: this.currentDate, data: this.data };
        localStorage.setItem(this.storageKey, JSON.stringify(dataToStore));
    }
}

class HistoryStorage extends BaseStorage {
    constructor() {
        super("gexpHistory");
    }
    load() {
        const historyData = localStorage.getItem(this.storageKey);
        let hh=historyData ? JSON.parse(historyData) : {};
        if(typeof hh.firstSeen_t ==="undefined") {
            if(typeof hh.firstSeen!=="undefined")
                hh.firstSeen_t=hh.firstSeen;
            else
                hh.firstSeen_t = (new Date()).getTime();
        }
        return hh;


    }
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }
}

class StatsGatherer
{
    sessionStorageInstance= new SessionStorage();
    dailyStorageInstance = new DailyStorage();
    historyStorageInstance = new HistoryStorage();

    rows=[];
    extra={};
    required={};
    constructor(sendProbability,telemetryName,gexp) {
        let baseNumber=localStorage.getItem("telP");
        let baseId=localStorage.getItem("telPId")
        this.visTracker=new PageVisibilityTracker({minVisibleMs:500});
        this.bfCacheTracker=new BfCacheEventTracker();
        if(baseNumber===null)
        {
            baseNumber=Math.floor(Math.random()*1000);
            if(typeof window.crypto!=="undefined" && typeof window.crypto.randomUUID!=="undefined")
                baseId=window.crypto.randomUUID();
            else
                baseId="0";
            localStorage.setItem('telP', baseNumber);
            localStorage.setItem('telPId', baseId);
        }
        this.telp=(baseNumber%sendProbability===0);
        this.telId=baseId;
        this.tln=telemetryName;
        this.cData=null;
        this.gexp=gexp;
        this.internalReference=(new Date()).getTime();
        this.extra={};
        this.measureCPULoad(
            {
                resultObject: this.extra,
                intervals: [0, 10, 25, 30],
                samplesPerInterval: 5
            }
        );
        if(typeof this.extra.__longTaskObserver !== "undefined")
            delete this.extra.__longTaskObserver;

        this.init()
        this.captureScrollMetrics();
        this.captureReferrerInfo();
        this.captureVisitFrequency();
        this.execOnElements();

        this.dlInterval=null;
        this.ignoreProperties=["cmp_cookie_consent_accepted","privacy","be_bt_modules_showed","be_emailing_campaign","be_external_campaign","be_galleries_count","be_galleries_position","be_galleries_quantity","be_internal_campaign","be_internal_search_kw","be_product_section_conversion","be_product_subsection_conversion","be_product_title_conversion","be_scroll_type","user_adobe_id","be_page_url","be_page_url_qs","be_page_url_raw","be_page_hierarchy","be_adblocking","be_page_cwv","error_log","client_subscription_expiration"];
    }
    init()
    {
        let evs=this.rows;
        this.captureResourceTimings();
        if(this.telp) {
            window.addEventListener('beforeunload', () => {
               this.sendData();
            });
            window.addEventListener('pagehide', () => {this.sendData();})
            this.initWatchdog();
        }
        setInterval(()=>{
            if (typeof ueDataLayer !== "undefined") {
                for(var j=0;j<this.rows.length;j++)
                {
                    for (var k in ueDataLayer) {
                        if (this.ignoreProperties.indexOf(k) < 0)
                            this.rows[j][k] = ueDataLayer[k];
                    }
                }
            }
        },5000);
    }

    reset() {
        if (this.telp) {
            this.sendData();
        }
    }

    measureCPULoad(config = {}) {
    const resultObject = config.resultObject || {};
    const intervals = config.intervals || [0, 5, 25]; // Seconds
    const samplesPerInterval = config.samplesPerInterval || 5;
    const timeoutDuration = 500; // 1 second in milliseconds

    // 1. Copy hardwareConcurrency if supported
    if ('hardwareConcurrency' in navigator) {
        resultObject.hardwareConcurrency = navigator.hardwareConcurrency;
    }

    // 2. Timeout-based interval measurement
    function measureTimeoutOffset(callback) {
        const startTime = performance.now();
        setTimeout(() => {
            const endTime = performance.now();
            const elapsed = endTime - startTime;
            const offset = elapsed - timeoutDuration;
            callback(offset);
        }, timeoutDuration);
    }

    function collectSamples(intervalIndex, sampleCount = 0, offsets = []) {
        if (sampleCount >= samplesPerInterval) {
            // Calculate average offset and store in resultObject
            const averageOffset = offsets.reduce((sum, offset) => sum + offset, 0) / samplesPerInterval;
            resultObject[`performance_timing_${intervals[intervalIndex]}`] = averageOffset;
            // Schedule next interval if any
            if (intervalIndex + 1 < intervals.length) {
                const delay = (intervals[intervalIndex + 1] - intervals[intervalIndex]) * 1000;
                setTimeout(() => collectSamples(intervalIndex + 1), delay);
            }
            return;
        }

        measureTimeoutOffset(offset => {
            offsets.push(offset);
            collectSamples(intervalIndex, sampleCount + 1, offsets);
        });
    }

    // Start timeout-based measurement
    collectSamples(0);

    // 3. Long Tasks API observer (if supported)
    if ('PerformanceObserver' in window && PerformanceObserver.supportedEntryTypes.includes('longtask')) {
        // Store top 3 longest tasks
        const longestTasks = [];

        const observer = new PerformanceObserver(list => {
            list.getEntries().forEach(entry => {
                // Extract relevant fields from the long task
                const taskData = {
                    startTime: entry.startTime,
                    name: entry.name,
                    duration: entry.duration,
                    containerSrc: entry.attribution[0]?.containerSrc || '',
                    containerName: entry.attribution[0]?.containerName || '',
                    containerId: entry.attribution[0]?.containerId || '',
                };

                // Insert task into longestTasks, sorted by duration
                longestTasks.push(taskData);
                longestTasks.sort((a, b) => b.duration - a.duration); // Descending order
                if (longestTasks.length > 3) {
                    longestTasks.pop(); // Keep only top 3
                }

                // Update resultObject with top 3 tasks
                longestTasks.forEach((task, index) => {
                    resultObject[`performance_longtask${index + 1}_startTime`] = task.startTime;
                    resultObject[`performance_longtask${index + 1}_name`] = task.name;
                    resultObject[`performance_longtask${index + 1}_duration`] = task.duration;
                    resultObject[`performance_longtask${index + 1}_containerSrc`] = task.containerSrc;
                    resultObject[`performance_longtask${index + 1}_containerId`] = task.containerId;
                    resultObject[`performance_longtask${index + 1}_containerName`] = task.containerName;
                });
            });
        });

        observer.observe({ entryTypes: ['longtask'] });
        // Store observer in resultObject to allow manual disconnection if needed
        resultObject.__longTaskObserver = observer;
    }

    return resultObject;
}

    initWatchdog()
    {
        let inactivityTimeout;
        const INACTIVITY_TIME = 10*60*1000; // 10 minutes in milliseconds
        let resetInactivityTimer=function() {
            clearTimeout(inactivityTimeout);
            inactivityTimeout = setTimeout(()=>this.sendData(), INACTIVITY_TIME);
        }.bind(this);

// List of user activity events
        const activityEvents = [
            'mousemove',
            'keydown',
            'click',
            'scroll',
            'touchstart' // For touch devices
        ];

// Add event listeners for user activity
        activityEvents.forEach(event => {
            document.addEventListener(event, resetInactivityTimer, { passive: true });
        });

// Handle page visibility changes (tab switch, minimize)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Page is hidden (tab switched or minimized)
                clearTimeout(inactivityTimeout);
                // Nota: en un futuro, se enviarian updates
                this.sendData(); // Trigger immediately or keep timer running, depending on your needs
            } else {
                // Page is visible again, reset timer
                resetInactivityTimer();
            }
        }, { passive: true });

// Initialize the timer on page load
        resetInactivityTimer();
    }
    sendData()
    {
        let visInfo=this.visTracker.getTotalVisibleTime();
        let currentVisible=this.visTracker.isRecentlyVisible();
        if(this.rows.length===0)
            return;
        try {
            let cls = this.captureCLS();
            /*if(this.rows.length == 0 && Object.keys(this.required).length>0)
                this.rows.push(this.required);*/

            for (var k=0;k<this.rows.length;k++) {
                this.rows[k] = Object.assign(this.rows[k], cls);
                this.rows[k] = Object.assign(this.rows[k],this.extra);
                for(var j in this.required)
                    this.rows[k][j]=this.required[j];
                this.rows[k]=Object.assign(this.rows[k],this.resourceTimings);
                this.rows[k]["session"]=this.sessionStorageInstance.getAll();
                this.rows[k]["daily"]=this.dailyStorageInstance.getAll();
                this.rows[k]["history"]=this.historyStorageInstance.getAll();
                this.rows[k].gexp_enabled=this.gexp.enabled;
                this.rows[k].gexp_error=this.gexp.error;
                this.rows[k].newUser=this.gexp.isNewUser();
                this.rows[k].adtut=this.gexp.getUserType();
                this.rows[k].initialVisibilityState=this.visTracker.initialVisibilityState;
                this.rows[k].lastVisibilityState=this.visTracker.lastVisibilityState;
                this.rows[k].nVisibilityChanges=this.visTracker.nVisibilityChanges;
                this.rows[k].recentlyVisible=currentVisible;
                this.rows[k].visibleTime=visInfo.absoluteMs;
                this.rows[k].visibleTimePercentage=visInfo.percentage;
                this.rows[k].tel_id=this.telId;
                if(this.rows[k]["gexp_floor"]==="undefined")
                    this.rows[k]["gexp_floor"]=-1;
                let bfCounts=this.bfCacheTracker.getCounts();
                for(var bk in bfCounts)
                    this.rows[k][bk]=bfCounts[bk];
            }

            const data = JSON.stringify({
                telemetryType: this.tln,
                datas: this.rows
            });
            navigator.sendBeacon('https://adttelemetry2.unidadeditorial.es:8080/json', data);
            this.rows=[];
        }catch(e)
        {

        }
    }
    getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    captureResourceTimings() {
    // Collect all resource timings from the Performance API
// Object of telemetry keys and corresponding URLs to monitor
        const targetResources = {
            "resourceTimings_didomi": "https://sdk.privacy-center.org/sdk/7991bda51eb5539e21b1b8c0f37470a264eb2db9/modern/sdk.7991bda51eb5539e21b1b8c0f37470a264eb2db9.js",
            "resourceTimings_gpt": "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
            "resourceTimings_prebid": "https://e00-elmundo.uecdn.es/js/pbm",
            "resourceTimings_permutive":"https://cdn.permutive.com/10453011",
            "resourceTimings_utag":"https://tags.tiqcdn.com/utag/unidadeditorial/marca/prod/utag.js",
            "resourceTimings_utag_code":"https://tags.tiqcdn.com/utag/unidadeditorial/marca/prod/utag.14.js?utv=ut4.48.202205051108",
            "resourceTimings_gfk":"https://es-config.sensic.net/s2s-web.js",
            "resourceTimings_piano":"https://api-esp.piano.io/public/sdk/v04/sdk.js?v=xxx"
        };
        const targetSelectors={
            "pageElements_mundoDynamicSignwall":".ue-cintillo-premium-scroll-dynamic-mid",
            "pageElements_mundoDynamicPaywall":".ue-cintillo-premium-scroll-dynamic-high",
            "pageElements_mundoPaywall":".ue-c-article__premium",
            "pageElements_expansionDynamicPaywall":".ue-cintillo-premium-scroll-paywall",
            "pageElements_expansionDynamicSignwall":".ue-cintillo-premium-scroll-signwall",
            "pageElements_expansionPaywall":".paywall-block"
        }
        this.resourceTimings={};
        for(var k in targetSelectors)
            this.resourceTimings[k]=false;
// Object to store the timing data of completed resources, keyed by telemetry key

// Interval function to periodically check for resource completion
        const checkResourceInterval = setInterval(() => {
            // Get all resource performance entries
            const resourceTimings = performance.getEntriesByType("resource");

            // Iterate over each telemetry key and its associated URL
            Object.entries(targetResources).forEach(([telemetryKey, url]) => {
                const entry = resourceTimings.find((resource) => resource.name.includes(url));

                // If resource is found and has completed loading
                if (entry && entry.responseEnd > 0) {
                    // Store relevant timing metrics in the object, using the telemetry key
                    this.resourceTimings[telemetryKey+"_start"] = parseInt(entry.startTime);
                    this.resourceTimings[telemetryKey+"_duration"]=parseInt(entry.duration);
                    // Remove the telemetry key from targetResources once completed
                    delete targetResources[telemetryKey];
                }
            });

            // Clear the interval if all target resources have been processed
            if (Object.keys(targetResources).length === 0) {
                clearInterval(checkResourceInterval);
            }
        }, 1500);
        const checkSelectorInterval = setInterval(() => {
            Object.entries(targetSelectors).forEach(([telemetryKey, selector]) => {
                let v=document.querySelectorAll(selector);
                if(v && v.length>0) {
                    this.resourceTimings[telemetryKey] = true;
                    delete targetSelectors[telemetryKey];
                }
            })

            // Clear the interval if all target resources have been processed
            if (Object.keys(targetSelectors).length === 0) {
                clearInterval(checkSelectorInterval);
            }
        }, 1500);
}
    execOnElements()
    {
        let cur=this;
        const selectorCallbacks = {
            '.tbl-feed-container': (element) => {
                    setInterval(()=>{
                        let l=element.querySelectorAll('[data-item-syndicated]');
                        cur.extra.taboola_number_of_cards=l.length;
                        if(l.length>0)
                        {
                            cur.extra.taboola_card_title=(l[0].getAttribute('data-item-title') ?? null);
                        }
                    },3000);
            }
        };
            // Store callbacks and track processed elements
            const callbacks = new Map(Object.entries(selectorCallbacks));
            const processedElements = new WeakSet();
            const intervalId = setInterval(checkElements, 1000);
            // Function to check for matching elements
            function checkElements() {
                if(Object.keys(selectorCallbacks).length===0)
                {
                    clearInterval(intervalId);
                    return;
                }
                callbacks.forEach((callback, selector) => {
                    document.querySelectorAll(selector).forEach(element => {
                        // Only process new elements
                        if (!processedElements.has(element)) {
                            processedElements.add(element);
                            callback(element);
                        }
                    });
                });
            }
    }

    getDeviceType() {
        const userAgent = navigator.userAgent;
        if (/Mobi|Android/i.test(userAgent)) {
            return 'Mobile';
        } else if (/Tablet|iPad/i.test(userAgent)) {
            return 'Tablet';
        }
        return 'Desktop';
    }

    getBrowserType() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf('Firefox') > -1) {
            return 'Firefox';
        } else if (userAgent.indexOf('Chrome') > -1) {
            return 'Chrome';
        } else if (userAgent.indexOf('Safari') > -1) {
            return 'Safari';
        } else if (userAgent.indexOf('Edge') > -1) {
            return 'Edge';
        } else if (userAgent.indexOf('Trident') > -1) {
            return 'Internet Explorer';
        }
        return 'Unknown';

    }
    getCommonData()
    {
        if(this.cData!==null)
            return this.cData;
        this.cData={
            domain: window.location.hostname,
            url: window.location.href,
            userDate: new Date().getTime(),
            deviceType: this.getDeviceType(),
            browserType: this.getBrowserType(),
            // Esta duplicado, se obtiene de otro sitio que desconozco, aqui que lo comento aqui.
            //userAgent: navigator.userAgent,
            screenDimensions: {
                width: screen.width,
                height: screen.height,
                availableWidth: screen.availWidth,
                availableHeight: screen.availHeight
            },
            viewportDimensions: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            referrer: document.referrer,
            language: navigator.language || navigator.userLanguage,
            connectionType: navigator.connection ? navigator.connection.effectiveType : 'unknown',
            platform: navigator.platform,
            timeZoneOffset: new Date().getTimezoneOffset(),
            cookiesEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack || 'unspecified',
            utm_source: this.getQueryParam("utm_source"),
            utm_source_CID:this.getQueryParam("cid"),
            utm_campaign:this.getQueryParam("utm_campaign"),
            ueUserContentGoogle:"" + (window.ueUserContentGoogle ?? "")
        };

        return this.cData;
    }
    registerRow(cI)
    {
        this.rows.push(cI);
        let gd=this.getCommonData();
        for(var k in gd)
            cI[k]=gd[k];
        let f=()=> {
            if (typeof ueDataLayer !== "undefined") {
                for (var k in ueDataLayer) {
                    if (this.ignoreProperties.indexOf(k) < 0)
                        cI[k] = ueDataLayer[k];
                }
            }
        }
        // Esto es porque queremos hacerlo lo antes posibles..No queremos ni esperar a los 2 segundos del intervalo.

        if(typeof ueDataLayer!=="undefined" )
            f();
        cI["timestamp"]=new Date().getTime();
        cI["timestamp_t"]=new Date().getTime();
    }
    captureScrollMetrics() {
        let maxScrollDepth = 0;
        let lastScrollTime = Date.now();
        this.sessionStorageInstance.set("maxScrollDepth", 0);
        this.sessionStorageInstance.set("scrollVelocity", 0);
        this.sessionStorageInstance.set("lastScrollY", 0);
        let scTimeout=null;
        let mainCb=()=>{
            scTimeout=setTimeout(()=>{scTimeoutFunc()},500);
            window.removeEventListener("scroll",mainCb);
        };

        let scTimeoutFunc = () => {
            const scrollDepth = window.scrollY;
            maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
            this.sessionStorageInstance.set("maxScrollDepth", maxScrollDepth);

            // Calculate scroll velocity
            const currentTime = Date.now();
            const scrollVelocity = (window.scrollY - (this.sessionStorageInstance.getAll().lastScrollY || 0)) / (currentTime - lastScrollTime);
            lastScrollTime = currentTime;

            this.sessionStorageInstance.set("scrollVelocity", scrollVelocity);
            this.sessionStorageInstance.set("lastScrollY", window.scrollY);
            scTimeout=null;
            window.addEventListener("scroll",mainCb);
        }

        window.addEventListener("scroll",mainCb);





    }
    captureReferrerInfo() {
            this.addVariable("referrer", document.referrer);
    }
    captureVisitFrequency() {
        let h=this.historyStorageInstance.getAll();
        let d=this.dailyStorageInstance.getAll();
        let s=this.sessionStorageInstance.getAll();
        let dailyVisits=d.nVisits || 0;
        let sVisits=s.nVisits || 0;

        const lastVisit = h.lastVisit || Date.now();
        const nVisits= h.nVisits || 0;
        const currentVisit = Date.now();
        const timeSinceLastVisit = currentVisit - lastVisit;

        this.dailyStorageInstance.set("visitRecency", timeSinceLastVisit);
        this.dailyStorageInstance.set("nVisits",dailyVisits+1);

        this.historyStorageInstance.set("lastVisit", currentVisit);
        this.historyStorageInstance.set("nVisits", nVisits+1);
        this.sessionStorageInstance.set("nVisits", sVisits+1);
    }
    getTimeReference()
    {
        const [navTiming] = performance.getEntriesByType("navigation");
        if(navTiming)
            return parseInt( window.performance.timeOrigin);

        let p=window.performance.timing;
        if(p)
        {
            return window.performance.timing.connectStart;
        }
        return this.internalReference;
    }
    captureCLS()
    {
        // Relative time calculation helper

        const [navTiming] = performance.getEntriesByType("navigation");

        if (!navTiming) return; // Navigation timing may not be available in some contexts.
        const navigationStart = navTiming.startTime;
        const relativeTime = (metric) =>{return (typeof navTiming[metric]==="undefined" || navTiming[metric]===null)?null:parseInt(navTiming[metric] - navigationStart)};

        let d = {
            fetchStart: relativeTime("fetchStart"),
            requestStart: relativeTime("requestStart"),
            responseStart: relativeTime("responseStart"),
            responseEnd: relativeTime("responseEnd"),
            domInteractive: relativeTime("domInteractive"),
            domContentLoadedEventStart: relativeTime("domContentLoadedEventStart"),
            domContentLoadedEventEnd: relativeTime("domContentLoadedEventEnd"),
            domComplete: relativeTime("domComplete"),
            loadEventStart: relativeTime("loadEventStart"),
            loadEventEnd: relativeTime("loadEventEnd"),
            visitDuration:parseInt(Date.now() - navTiming.startTime - performance.timeOrigin)
        };

         return d;
    }
    addVariable(v,val)
    {
        this.extra[v]=val;
    }
    addRequiredVariable(v,val)
    {
        this.required[v]=val;
    }
}



class GAMExp {
    constructor() {
        this.statsG = null;
        this.intextManager = null;
        this.inimageManager = null;
        this.interstitialManager = null;
        if (window.__disable_gam_kv__ !== true) {
            pbjs.que.push(() => {
                pbjs.setConfig({ useBidCache: true });
                pbjs.setConfig({ floors: {} })
                pbjs.setConfig({
                    "currency": {
                        "adServerCurrency": "EUR",
                        "granularityMultiplier": 1,
                        "defaultRates": { "USD": { "EUR": 1 } }
                    }
                });
            });
            this.error = "";
            this.isNew = false;
            this.country = 'ES';
            this.houseAdexRatio = -1;

            this.initialized = false;
            this.enabled = false;
            this.paywallShown = false;
            this.signWallShown = false;

            this.loadConfig().then(() => {
                this.initialize();                
                if (typeof IntextManager !== "undefined" && this.cfg?.intextSites) {
                    this.intextManager = new IntextManager(this.cfg, this);
                }
                if (typeof InimageManager !== "undefined" && this.cfg?.inimageSites) {
                    this.inimageManager = new InimageManager(this.cfg, this);
                }
                if (typeof InterstitialManager !== "undefined" && this.cfg?.interstitialSites) {
                    this.interstitialManager = new InterstitialManager(this.cfg, this);
                }
            });
        }
    }


    initialize(){
        if(this.initialized)
            return;
        try {
            this.enabled=true;
            this.initialized = true;
            this.random1 = Math.floor(Math.random() * 20 + 1).toString();
            this.random2 = localStorage.getItem('random2');
            if (this.random2 === null) {
                this.random2 = Math.floor(Math.random() * 20 + 1).toString();
                localStorage.setItem('random2', this.random2);
            }
            this.random3 = Math.floor(Math.random() * 20 + 1).toString();
            this.random4 = Math.floor(Math.random() * 20 + 1).toString();
            this.houseCounters = {};
            let tCfg=this.cfg;
            for (var k in tCfg)
                this[k] = tCfg[k];
            for (var k = this.pList[this.pList.length - 1]+0.25;k<20;k+=0.25)
                this.pList.push(k);
            this.windows = {};
            this.enabled = true;

            this.load();
            if(typeof this.info.userType==="undefined")
            {
                this.info.userType=0;
            }
            if(typeof this.info.adexCounter!=="undefined")
            {
                if(this.info.adexCounter==-1)
                {
                    if(this.info.houseCounter==-1)
                        this.houseAdexRatio=-1;
                    else
                        this.houseAdexRatio=0;
                }
                else
                {
                    if(this.info.houseCounter==-1)
                        this.houseAdexRatio=1;
                    else
                        this.houseAdexRatio=this.info.adexCounter/this.info.houseCounter;
                }
            }
            this.info.adexCounter=-1;
            this.info.houseCounter=-1;
            let telP=this.cfg.telemetryProb ?? 0;
            this.statsG=new StatsGatherer(telP,"test",this);

            googletag.cmd.push(()=>{
                googletag.pubads().addEventListener("impressionViewable",(event)=>{this.onSlotViewable(event.slot);});
                googletag.pubads().addEventListener("slotVisibilityChanged",(event)=>{this.onSlotVisibilityChanged(event);});
                googletag.pubads().addEventListener("slotOnload",(event)=>{this.onSlotLoaded(event.slot);});
                googletag.pubads().addEventListener("slotResponseReceived",(event)=>{this.response(event)})
            })

            window.tel_envioPreviewModuloGenerico=(evType)=>{

                this.statsG.addRequiredVariable("paywallType",evType);
            }
            window.tel_addTelemetry=(eventName, eventValue)=>{
                this.statsG.addRequiredVariable("tel_"+eventValue);
            }
            window.tel_envioPaywallEvent=(eventName, eventValue)=>{
               if(typeof eventValue==="undefined")
                    eventValue="exists";
               if(typeof eventValue==="string" && eventValue.indexOf('NaN')>=0)
                   return;
                this.statsG.addRequiredVariable("suscr_"+eventName,eventValue);

            }
        }catch(e)
        {
            this.reportError(e);
        }
    }
    incAdex()
    {
        if(this.info.adexCounter==-1)
            this.info.adexCounter=1;
        else
            this.info.adexCounter++;
    }
    incHouse()
    {
        if(this.info.houseCounter==-1)
            this.info.houseCounter=1;
        else
            this.info.houseCounter++;
    }
    getAdexHouseRatio()
    {
        return this.houseAdexRatio;
    }
    getUserType()
    {
        let v=this.statsG.dailyStorageInstance.get("userType");
        if(typeof v==="undefined")
            this.statsG.dailyStorageInstance.set("userType",3);
        return v || 3;
    }
    setUserType(type)
    {
        this.statsG.dailyStorageInstance.set("userType",type);

    }
    onGoodCPM(window,value)
    {
        for(var k in this.windows)
        {
            if(this.windows[k]!==window && this.windows[k].state.windowStart<14) {
                let am=Math.floor(value);
                this.windows[k].upgradePrice(am,window.offY)
            }
        }
    }
    onBadCPM()
    {
        this.setUserType(5);
    }


    getStats()
    {
        return this.statsG;
    }
    getWindowFromSlot(slot)
    {
        if(typeof slot.__position!=="undefined")
            return this.windows[slot.__position];
        let position = slot.getTargeting('p')[0];
        let w=this.getWindow(position);
        w.setSlot(slot);
        slot.__position=position;
        return w;
    }
    onSlotViewable(slot)
    {
        try {
            let w = this.getWindowFromSlot(slot);
            if (w) {
                w.onViewable();
            }
        }catch(e)
        {
            this.reportError(e);
        }
    }
    onSlotVisibilityChanged(event)
    {
        try {
            let w = this.getWindowFromSlot(event.slot);
            if (w) {
                w.onSlotVisibilityChanged(event.inViewPercentage);
            }
        }catch(e)
        {
            this.reportError(e);
        }
    }
    onSlotLoaded(slot)
    {
        try {
            let w = this.getWindowFromSlot(slot)
            w.onLoaded();
        }catch(e)
        {
            this.reportError(e);
        }
    }
    getRandom(i)
    {
        return this["random"+i];
    }
    getWindow(position)
    {
        if(typeof this.windows[position]!=="undefined")
            return this.windows[position];
        let w=null;
        switch(parseInt(this.random2)) {
           /* case 1:{
                w = new RandomStrategy(position,this.cfg,this);
            }break;
            case 2:{
                w = new FixedStrategy(position,this.cfg,this);
            }break;
            case 3:{
                w=new AggrStrategy(position,this.cfg,this);
            }break;*/
            default: {
                w = new WindowArray(position, this.cfg, this)
            }
        }
        if (this.info.ptypes[position])
            w.unserialize(this.info.ptypes[position]);
        this.windows[position]=w;
        return w;
    }
    getSessionVisits()
    {
        return this.statsG.sessionStorageInstance.get("nVisits");
    }
    getDailyVisits()
    {
        return this.statsG.dailyStorageInstance.get("nVisits");
    }

    getTimeReference()
    {
        return this.statsG.getTimeReference();
    }
    getTimeOffset()
    {
        return parseInt(Date.now()-this.statsG.getTimeReference())
    }

    update(position, result) {
        if(typeof this.windows[position]==="undefined")
            return;
        this.windows[position].update(this.windows[position], result);
        this.save();
    }

    request(slot) {
        if(window.__disable_gam_kv__===true)
            return;
        if (!this.enabled)
            return;


        var w;
        try {
            w=this.getWindowFromSlot(slot);
            w.setTargetings();
            slot.updateTargetingFromMap({
                random1:this.getRandom(1),
                random2:this.getRandom(2),
                random3:this.getRandom(3),
                random4:this.getRandom(4),
                tlm:this.statsG.telp==true?"1":"0",
                tlm_id:this.statsG.telId,
                nvis:this.statsG.dailyStorageInstance.get("nVisits")
            })
            this.save();
        } catch (error) {
            this.reportError(error);

        }
    }

    response(event) {
        if (this.enabled == false)
            return;
        try{
            const slot = event.slot;
            const position = slot.getTargeting('p')[0];
            if (typeof this.windows[position]==="undefined") {
                return;
            }
            let c = this.windows[position];
            c.response(event);
            this.save();
        } catch (e) {
            this.reportError(e);
        }
    }
    reportError(exception)
    {
        this.error=exception.toString()+exception.stack;
        this.enabled = false;
        this.info = this.init;
        this.save();
        if(this.statsG) {
            var err = new Error();
            this.statsG.addRequiredVariable("gamexp_err",err.stack);
        }
    }
    addVariable(v,val)
    {
        this.statsG.addRequiredVariable(v,val);
    }

    isAdex(campaignId,lineItemId,advertiserId)
    {
        return this.adexIds.includes(campaignId) || this.adexIds.includes(lineItemId);
    }
    isHouse(campaignId,lineItemId,advertiserId)
    {
        return this.houseIds.includes(advertiserId);
    }
    isReloadAllowed(campaignId,lineItemId,advertiserId)
    {
        return this.reloadIds.includes(advertiserId) || this.reloadCampaignIds.includes(campaignId);
    }

    getLSInfo() {
        return JSON.parse(localStorage.getItem(this.itemName));
    }
    isNewUser()
    {
        return this.isNew;
    }
    load() {
        try {
            this.info = this.getLSInfo();
            if (!this.info) {
                this.info = this.init;
                this.isNew=true;
            } else {
                if (
                    typeof this.info.v === 'undefined' ||
                    this.info.v !== this.init.v) {
                    this.info = this.init;
                }
            }

            if (!this.info.ptypes)
                this.info.ptypes = {};
            for (var k in this.info.ptypes) {
                if (this.info.ptypes[k].window) {
                    this.windows[k] = new WindowArray(k,this.cfg,this);
                    this.windows[k].unserialize(this.info.ptypes[k]);
                }
            }
        } catch (e) {
            this.error=e;
            this.enabled = false;
        }
    }

    save() {
        if (!this.info.ptypes)
            this.info.ptypes = {};
        for (var k in this.windows) {
            this.info.ptypes[k] = {};
            this.windows[k].serialize(this.info.ptypes[k]);
        }
        localStorage.setItem(this.itemName, JSON.stringify(this.info));
    }

    isEnabled()
    {
        if(typeof this.cfg.enabled!=="undefined" && this.cfg.enabled===false)
            return false;
        return true;
    }
    registerImpression(cI)
    {
        cI.gexp_version=this.version;
        cI.random1=this.getRandom(1);
        cI.random2=this.getRandom(2);
        cI.random3=this.getRandom(3);
        cI.random4=this.getRandom(4);
        this.statsG.registerRow(cI);
    }

    today() {
        return this.datetostring(new Date());
    }

    datetostring(d) {
        return d.getFullYear().toString() + (d.getMonth() + 1).toString().padStart(2, '0') + d.getDate().toString().padStart(2, '0');
    }
    isMobileDevice() {
        const isMobileScreen = window.matchMedia("(max-width: 768px)").matches;
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        return isMobileScreen && isTouchDevice;
    }

    geo() {
        let geoPromise=new WPromise();

        let geoCached = localStorage.getItem('geocached');
        var geoInfo = null;
        if (geoCached) {
            try {
                geoInfo = JSON.parse(geoCached);
                geoPromise.resolve();
            } catch (e) {
            }
        }
        if (geoInfo === null) {
            fetch("https://www.marca.com/edge-services/user-geo.html").
            then(response => response.json()).
            then(
                (geo)=>{
                    localStorage.setItem('geocached', JSON.stringify(geo));
                    geoPromise.resolve();
                }
            )
        }
        return geoPromise;
    }

    resolveConfig(cfg)
    {
        if(typeof cfg.sw==="undefined")
            return cfg;
        let pType=null;
        let opts={};
        let value=null;
        for(var k in cfg)
        {
            if(k=="sw")
                pType=cfg[k];
            else
            {
                let p=k.split(",").map((el)=>{opts[el]=cfg[k]});
            }
        }
        switch(pType)
        {
            case "geo":{
                let geoCached = localStorage.getItem('geocached');
                let country=null;
                if(!geoCached)
                    value='ES';
                else {
                    try {
                        let inf=JSON.parse(geoCached);
                        value=inf.country_code ?? 'ES';
                    }catch(e){
                        value='ES';
                    }
                }
            }break;
            case 'adunit':{
                var s=googletag.pubads().getSlots();
                if(s.length==0)
                    value="default";
                else
                    value=s[0].getAdUnitPath().split("/")[2];
            }break;
        }
        let curcfg=null;
        if(typeof opts[value]==="undefined")
        {
            curcfg=opts["default"];
        }
        else
            curcfg=opts[value];
        return this.resolveConfig(curcfg);
    }
    getIndexFromOffY(usOffY)
    {
        let idx=0;
        if(usOffY > 0 && usOffY <=5)
            idx=1;
        if(usOffY>5 && usOffY<=15)
            idx=2;
        if(usOffY>15)
            idx=3;
        return ""+idx;
    }
    yRanges=null;
    buildVYRanges()
    {
        if(this.yRanges!==null)
            return this.yRanges;
        const ranges = [
            "*--10.0",
            "-12.0--10.0",
            "-10.0--8.0",
            "-8.0--6.0",
            "-6.0--4.0",
            "-4.0--2.0",
            "-2.0-0.0",
            "0.0-2.0",
            "2.0-4.0",
            "4.0-6.0",
            "6.0-8.0",
            "8.0-10.0",
            "10.0-12.0",
            "12.0-14.0",
            "14.0-16.0",
            "16.0-18.0",
            "18.0-20.0",
            "20.0-25.0",
            "25.0-30.0",
            "30.0-35.0",
            "35.0-*"
        ];
        const regex = new RegExp(/((?:-?[0-9]+(?:\.[0-9]+)?)|\*)-((?:-?[0-9]+(?:\.[0-9]+)?)|\*)/);
        this.yRanges= ranges.map(range => {
            const match = range.match(regex);
            if (match) {
                let m1=match[1],m2=match[2];
                if(m1=="*")
                    m1=-Infinity;
                else
                    m1=parseFloat(m1);
                if(m2=="*")
                    m2=Infinity;
                else
                    m2=parseFloat(m2);
                return [m1, m2];
            }
            return null; // Handle cases where the regex doesn't match
        }).filter(pair => pair !== null);
        return this.yRanges;
    }
    getVIndexFromOffY(number)
    {
        let pairs=this.buildVYRanges();
        for (let i = 0; i < pairs.length; i++) {
            const [start, end] = pairs[i];

            if (number >= start && number < end) {
                return i;
            }
        }

        // Return -1 if the number doesn't fit in any range (unlikely with * boundaries)
        return -1;
    }
    // Devuelve el indice de precio con mejor ecpm segun la altura de la posicion de publi,
    // segun los datos calculados en telemetria.
    getPivotIndex(adunit, position,upPoints,offY) {
        if (!this.enabled) return null;
        let idx=this.getIndexFromOffY(offY);
        if(typeof position==="undefined")
            position="r";
        else {
            if (position == "m")
                idx = 1;
            else {
                if (position[0] == "r" || position[0] == "s")
                    position = position[0];
            }
        }
        return this.cfg?.ext?.sites?.p1?.[adunit]?.[this.country]?.[position]?.["i"+idx] ?? null;
    }
    getPriceProbability(adunit, priceIdx,position, offY)
    {
        if (!this.enabled) return null;
        let idx=this.getIndexFromOffY(offY);
        if(position=="m")
            idx=1;
        else
        {
            if(position[0]=="r" || position[0]=="s")
                position=position[0];
        }
        let t1=this.cfg?.ext?.sites?.pp1?.[adunit]?.[this.country]?.[position]?.["i"+idx]?.["p"+priceIdx] ?? -1;
        if(t1!=-1)
            return t1;
        return this.cfg?.ext?.sites?.pp1?.[adunit]?.[this.country]?.['r']?.["i"+idx]?.["p"+priceIdx] ?? -1;

    }
    getExpectedViewability(adunit,offY,gr,ar)
    {
        if(!this.enabled) return -1;
        let type = ueDataLayer?.be_page_content_type ?? "-1";
        let idx=this.getVIndexFromOffY(offY);
        return this.cfg?.ext?.sites?.vv?.[adunit]?.[type]?.[idx]?.[gr]?.[ar] ?? -1;
    }
    
    // Devuelve la informacion para un floor, y un usOffY, segun lo que se ha recibido de telemetria.

    loadConfig()
    {
        let country='ES';
        let loadPromise=new WPromise();
        /*** config ***/
        this.geo().then(()=>{
            let geoCached = localStorage.getItem('geocached');
            let country=null;
            if(geoCached)
            {
                try {
                    let inf=JSON.parse(geoCached);
                    country=inf.country_code ?? 'ES';
                }catch(e){
                    country='ES';
                }
            }
            this.country=country;
            let device=this.isMobileDevice();
            let site=window.location.hostname;
            let siteParts=site.split(".");
            siteParts.pop();
            if(siteParts[0]==='www')
                siteParts.shift();
            site=siteParts.join(".");
            let cfgUrl=this.cfgUrl+"-"+site+"-"+country+"-"+(device?"m":"d")+".php";
            fetch(cfgUrl).
            then(response =>{

                response.json().then(
                    (cfg)=>{
                        this.cfg=cfg;
                        loadPromise.resolve();
                    }
                )

            })

        })
        return loadPromise;
    }
    cfgUrl = 'https://adtcdn2.unidadeditorial.es/gexp/getCfg';
    itemName = 'GAMExp';
    init = {
        positions: {},
        v: 13
    };
    version="0.0152";
    info = this.init;
}


let _gam_exp = new GAMExp();

const _gam_kv_ = function(s) {
    _gam_exp.request(s);
}

window._gam_kv_ = _gam_kv_;


