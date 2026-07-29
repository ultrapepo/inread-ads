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
        this.sentPrebidTimings=false;
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

        if (typeof this.pCfg.rv !== "undefined" && Math.random()>.8)
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
        if(this.cI)
            this.nReloads++;
        this.cI = {
            adRendered:false,
            strategy: this.state.strategy,
            nHouse: this.state.nHouse,
            nAdex: this.state.nAdex,
            adUnitPath: slot.getAdUnitPath(),
            adUnit: slot.getAdUnitPath().split('/')[2] || 'unknown',
            nReloads: this.nReloads,
            adFilled: false,
            adLoadTime: null,
            adMaxViewability: 0,
            adViewable: false,
            last: this.state.last,
            lastPrice:this.state.lastPrice,
            lastPriceIndex:this.state.lastPriceIndex,
            lastRes: this.state.lastRes,
            lastWasPrebid:this.state.lastWasPrebid,
            usingPrebid:false,
            position:this.position,
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
        let p=this.getBasePrice();
        if(this.prebidIndex!==-1 &&
        /*    (this.prebidValue > 0.5 ||
                this.state.lastType==this.IT_PREBID || this.state.lastType==this.IT_NONE || this.state.lastType==this.IT_HOUSE ||
                this.prebidValue>this.array[this.state.windowStart]*0.75 ||
                (this.array[this.state.windowStart] <= p)
            )*/
            (this.prebidValue > 0.5 ||
                this.state.lastType==this.IT_HOUSE ||
                this.prebidValue>this.array[this.state.windowStart]*0.50 ||
                (this.getRandom(1)==1 && this.array[this.state.windowStart] <= p)

            )
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
        if(this.sentPrebidTimings===false)
        {
            this.sentPrebidTimings=true;
            let pb=window.pbjs;
            if(!pb)
                return;
            let slotName="";
            if(pb.__ctrl)
            {
                pb=pb.__ctrl.realObj;
                slotName=this.slot.getName()+"_1";
            }
            else
            {
                slotName=this.slot.getSlotElementId()
            }
            let foundBids={};
            let saveTimings=()=> {
                if(pbjs && pbjs.getBidResponsesForAdUnitCode) {
                let pbjsBids = pbjs.getBidResponsesForAdUnitCode(slotName);
                if (pbjsBids) {
                    let bb = pbjsBids.bids;
                    for (var k = 0; k < bb.length; k++) {
                        let cb = bb[k];
                        if (typeof foundBids[cb["bidder"]] !== "undefined")
                            continue;
                        foundBids[cb["bidder"]] = 1;

                            let prefix="prebid_" + cb["bidder"];
                            this.cI[prefix + "_timeToRespond"] = cb.timeToRespond;
                            this.cI[prefix + "_creativeId"] = "" + cb.creativeId;
                            this.cI[prefix+ "_cpm"] = cb.cpm;
                            this.cI[prefix+ "_currency"] = cb.currency;
                            this.cI[prefix+ "_size"]=cb.size;
                            if(typeof cb.meta!==undefined)
                            {
                                for(var k in cb.meta)
                                {
                                    if(k==="advertiserDomains")
                                    {
                                        this.cI[prefix+"_meta_"+k]=(cb.meta[k] && cb.meta[k].length>0)?cb.meta[k][0]:'';
                                        continue;
                                    }
                                    if(typeof cb.meta[k]!=="object")
                                    {
                                        this.cI[prefix+"_meta_"+k]=cb.meta[k];
                                    }
                                    else
                                        this.cI[prefix+"_meta_"+k]=JSON.stringify(cb.meta[k]);
                                }
                            }
                            this.cI[prefix+ "_size"]=cb.size;
                        }
                    }
                }
            }
            saveTimings();
            setTimeout(()=>{
                saveTimings();
            },3000)
        }
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
        if(m==t_aps)
            bidder="amazon";
        else {
            if (typeof hbb !== "undefined" && hbb.length > 0) {
                bidder = hbb[0];
            }
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
        if(this.pCfg.umu==1 && this.gexp.isEnabled())
        {
            this.cI.usingUMU=1;
            let id=this.slot.getSlotElementId();
            let p=document.getElementById(id);
            if(p && p.parentNode) {
                let sp=p.parentNode;
                this.slotContainer=sp;
                this.muSave={
                    position:sp.style.position,
                    top:sp.style.top,
                    left:sp.style.left
                };
                //let scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                let minTop=this.pCfg.umumint ?? 0;
                //let maxTop = this.pCfg.umumaxt ?? 300;
                //let rnd=(maxTop-minTop)*Math.random()+minTop;
                let rnd=this.getRandom(1)*50+minTop;
                sp.style.position="fixed";
                sp.style.top=rnd+"px";
                sp.style.left="100px";
                this.cI.oSlOffy = parseInt(off.top / 100);
                /* Offset del div del slot con respecto al scroll del usuario */
                this.cI.oUsOffY = parseInt(off.uTop / 100);
            }

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
                    this.effectivePrice=this.array[Math.floor(Math.max(1,Math.min(this.array.length - 1, this.state.windowStart)))];
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
        for(var y=1;y<=4;y++)
        {
            this.cI["random"+y]=this.getRandom(y);
            targetings["random"+y]=this.cI["random"+y];
        }

        targetings["tlm"]=this.gexp.statsG.telp==true?"1":"0";
        targetings["tlm_id"]=this.gexp.statsG.telId;
        targetings["nvis"]=this.gexp.statsG.dailyStorageInstance.get("nVisits")

        this.slot.updateTargetingFromMap(targetings);

        let allT = this.slot.getTargetingMap();
        let foundPremium=false;
        for (var k in allT) {
            if(k.includes("hb_pb")) {
                try {
                    this.cI[k] = parseFloat(allT[k][0]);
                }catch(e){}
            }
            this.cI[k] = allT[k][0];
        }
        try {
            let pads=googletag.pubads();
            let globalKeys = pads.getTargetingKeys();
            for (var i=0;i<globalKeys.length;i++) {
                var k=globalKeys[i];
                var tg=pads.getTargeting(k)[0];
                if(k==="isPremium")
                {
                    tg=(tg=="1" || tg=="true");
                }
                if (typeof this.cI[k] === "undefined") {
                    this.cI[k] = tg;
                }

                if (k === "isPremium" && (this.cI[k]=="true" || this.cI[k]=="1")) {
                    foundPremium = true;
                    localStorage.setItem("_gexp_prem", "1");
                }
            }
            if (foundPremium === false && localStorage.getItem("_gexp_prem")=="1") {
                pads.setTargeting("isPremium", "1");
            }
        }catch(e){}
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

        if(this.pCfg.umu==1 && this.slotContainer && this.gexp.isEnabled()) {
            for(var k in this.muSave)
                this.slotContainer.style[k]=this.muSave[k];
        }

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
        setTimeout(()=>{
        this.cI.qemQueryId=this.slot.getEscapedQemQueryId();
        },1000);
        this.cI.adResponseTime = this.getTimeOffset();
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
        let bp=this.getBasePrice();
        if(bp>0 && this.state.windowStart && this.array[this.state.windowStart] &&
            this.array[this.state.windowStart] > 12*bp
        )
        {
            this.cI.debugStr+="x";
            this.effectivePrice = this.array[this.state.windowStart];
            this.effectivePriceIndex = this.state.windowStart;
            return;
        }
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
                        if(this.offY < 6) {
                            f = Math.max(0,Math.floor(Math.random() * 5) - 1);
                            this.cI.floorStage="a";
                        }
                        else {
                            f = 0 ;
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
                        if(this.offY < 6)
                            f = 2;
                        else
                            f = 1;
                    }
                    else
                        f = 0;
                }
                    break;
                case 2: {
                    this.cI.debugStr += "e";
                    if (this.state.nHouse == 0) {
                        if(this.offY < 6)
                            f = 3;
                        else
                            f = 2;
                    } else {
                        f = 0;
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
                            f = 0;
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
    getTimeOffset()
    {
        return parseInt(performance.now());
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
    onRequested()
    {
        if(this.cI!==null)
        {
            this.cI.adRequestedTime=this.getTimeOffset();
        }
    }

    onLoaded() {

        if (this.cI !== null) {
            this.cI.adLoadTime = this.getTimeOffset();
        }
        //if (typeof this.pCfg.rqpbtim !== false && this.cI !== null && this.cI.willReload == true)
        if (this.cI !== null && this.cI.willReload == true)
            setTimeout(() => {
                this.doPrebid();
                if (this.prebidPromise)
                    this.prebidPromise.resolve();
            }, 4000); //this.pCfg.rqpbtim);
    }
    onRendered()
    {
        if(this.cI!==null)
        {
            this.cI.adRendered=true;
            this.cI.adRenderedTime=this.getTimeOffset();
        }
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
            --gexp-intext-bg: linear-gradient(180deg, #fafbfc 0%, #f4f6f8 100%);
            --gexp-intext-border: rgba(15, 23, 42, 0.08);
            --gexp-intext-shadow: inset 0 0 0 1px var(--gexp-intext-border);
            --gexp-intext-label: rgba(15, 23, 42, 0.62);
            --gexp-intext-loader-overlay: rgba(250, 251, 252, 0.88);
            width: 100%;
            max-width: 100%;
            margin: 0 auto;          
            padding: 0;
            position: relative;
            overflow: hidden;
            min-height: 0;           
            height: 0;
            opacity: 0;
            box-sizing: border-box;
            text-align: center;
            background: var(--gexp-intext-bg);
            box-shadow: var(--gexp-intext-shadow);
            border-radius: 2px;
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
        .gexp-intext-pip-player {
            position: fixed !important;
            z-index: var(--gexp-intext-pip-z-index, 100000) !important;
            width: var(--gexp-intext-pip-width, 360px) !important;
            max-width: var(--gexp-intext-pip-max-width, 90vw) !important;
            height: auto !important;
            aspect-ratio: 16 / 9;
            right: var(--gexp-intext-pip-right, 16px) !important;
            bottom: var(--gexp-intext-pip-bottom, 16px) !important;
            left: auto !important;
            top: auto !important;
            margin: 0 !important;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
            background: #000;
            transform: translateZ(0);
        }
        .gexp-intext-slot.gexp-intext-pip-active {
            overflow: visible !important;
        }
        .gexp-intext-pip-close {
            position: absolute;
            top: 6px;
            right: 6px;
            z-index: 10000;
            width: 28px;
            height: 28px;
            border: 0;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.72);
            color: #fff;
            cursor: pointer;
            font-size: 20px;
            line-height: 28px;
            text-align: center;
            pointer-events: auto;
            touch-action: manipulation;
        }
        .gexp-intext-pip-close:focus-visible {
            outline: 2px solid #fff;
            outline-offset: 2px;
        }
        .gexp-intext-slot.gexp-intext-layout-wide-standard {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .gexp-intext-slot.gexp-intext-layout-wide-standard > div[id^="google_ads_iframe"],
        .gexp-intext-slot.gexp-intext-layout-wide-standard > iframe {
            align-self: flex-start;
            margin: 0 auto;
        }
        .gexp-intext-slot.gexp-intext-layout-wide-tall {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            overflow: hidden;
        }

        .gexp-intext-slot:not(.video-started) .video-js {
             opacity: 0 !important;
             pointer-events: none !important;
        }

        .gexp-intext-slot.is-open::before {
            content: "PUBLICIDAD";
            color: var(--gexp-intext-label);
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
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-top: 20px;
            background: var(--gexp-intext-loader-overlay);
            border-radius: inherit;
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

      const sanitizeIntextDebugString = (value, maxLength = 10000) => {
        let text = String(value ?? "");
        text = text.replace(/https?:\/\/[^\s"'<>]+/gi, (raw) => {
          try { const url = new URL(raw); return `${url.origin}${url.pathname}`.slice(0, 1000); }
          catch (e) { return raw.split(/[?#]/)[0].slice(0, 1000); }
        });
        text = text.replace(/\bBearer\s+[A-Z0-9._~+\/-]+=*/gi, "Bearer [RedactedToken]");
        text = text.replace(/(^|[\s,{])(token|access_token|id_token|authorization|password|secret|sessionid|userid|pvid|ppid|ueid|permid|sharedid|id5|tdid|pubcid|gaid|idfa|deviceid)\s*[=:]\s*[^\s,;}]+/gi, "$1$2=[Redacted]");
        text = text.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[RedactedEmail]");
        return text.length > maxLength
          ? `${text.slice(0, maxLength)}...[Truncated ${text.length - maxLength} chars]`
          : text;
      };

      const serializeIntextLogValue = (value, options = {}) => {
        const limits = {
          depth: Number(options.maxDepth ?? 3),
          array: Number(options.maxArray ?? 100),
          keys: Number(options.maxKeys ?? 60),
          string: Number(options.maxString ?? 10000),
        };
        const seen = new WeakSet();
        const sensitiveKeys = new Set([
          "cookie", "token", "accesstoken", "idtoken", "authorization", "password", "secret",
          "sessionid", "userid", "pvid", "ppid", "ueid", "permid", "sharedid", "id5",
          "tdid", "pubcid", "gaid", "idfa", "deviceid", "email",
        ]);
        const normalizeSensitiveKey = (key) => String(key || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
        const isSensitive = (key) => sensitiveKeys.has(normalizeSensitiveKey(key));
        const shortDescriptor = (current, type) => ({
          type,
          id: String(current?.id || current?.playerId || current?.videoId || ""),
          slotIndex: current?.slotIndex ?? null,
          navIndex: current?.navIndex ?? null,
          cycleId: current?._intextTelemetryCycleId ?? null,
          renderToken: current?._activeRenderToken ?? current?._renderToken ?? null,
          state: String(current?.state || current?._visualState || ""),
        });
        const walk = (current, depth, key = "") => {
          if (isSensitive(key)) return "[Redacted]";
          if (current === undefined) return "[Undefined]";
          if (current === null || ["boolean", "number"].includes(typeof current)) return current;
          if (typeof current === "string") return sanitizeIntextDebugString(current, limits.string);
          if (typeof current === "bigint") return `${current}n`;
          if (typeof current === "function") return `[Function ${current.name || "anonymous"}]`;
          if (typeof current === "symbol") return `[Symbol ${current.description || ""}]`;
          if (depth >= limits.depth) return "[MaxDepth]";
          if (typeof current !== "object") return String(current);
          if (seen.has(current)) return "[Circular]";
          seen.add(current);
          try {
            if (current instanceof Date) return { type: "Date", value: current.toISOString() };
            if (current instanceof Error || (current?.message && current?.stack)) {
              return { type: "Error", name: String(current.name || "Error"), message: sanitizeIntextDebugString(current.message, limits.string), stack: sanitizeIntextDebugString(current.stack, limits.string) };
            }
            if (current?.nodeType === 1 && current?.tagName) {
              let rect = null;
              try { const raw = current.getBoundingClientRect?.(); if (raw) rect = Object.fromEntries(["top", "right", "bottom", "left", "width", "height"].map((name) => [name, Number(raw[name] || 0)])); } catch (e) {}
              return { type: "DOMElement", tagName: String(current.tagName), id: String(current.id || ""), className: String(typeof current.className === "string" ? current.className : ""), dataset: walk({ ...(current.dataset || {}) }, depth + 1), rect, isConnected: current.isConnected === true };
            }
            if (typeof current?.getSlotElementId === "function") {
              return { type: "GPTSlot", slotElementId: String(current.getSlotElementId?.() || ""), adUnitPath: sanitizeIntextDebugString(current.getAdUnitPath?.() || "", 1000) };
            }
            const constructorName = String(current?.constructor?.name || "");
            if (constructorName === "IntextNode" || (current?.manager && current?.container && "_intextTelemetryCycleId" in current)) return shortDescriptor(current, "IntextNode");
            if (constructorName === "IntextManager" || (Array.isArray(current?.nodes) && current?.siteConfig)) return { type: "IntextManager", nodeCount: Number(current.nodes?.length || 0) };
            if (/google\.ima|AdsManager|AdsRequest/i.test(constructorName)) return { type: "IMA", name: constructorName };
            if (/Player|Creative/i.test(constructorName) || (current?.player && current?.node)) return shortDescriptor(current, /Creative/i.test(constructorName) ? "Creative" : "Player");
            if (Array.isArray(current)) {
              const result = current.slice(0, limits.array).map((item) => walk(item, depth + 1));
              if (current.length > limits.array) result.push(`[Truncated ${current.length - limits.array} items]`);
              return result;
            }
            const result = {};
            const keys = Reflect.ownKeys(current);
            keys.slice(0, limits.keys).forEach((objectKey) => {
              const name = String(objectKey);
              try { result[name] = isSensitive(name) ? "[Redacted]" : walk(current[objectKey], depth + 1, name); }
              catch (error) { result[name] = `[GetterError: ${sanitizeIntextDebugString(error?.message || error, 500)}]`; }
            });
            if (keys.length > limits.keys) result["[TruncatedKeys]"] = keys.length - limits.keys;
            return result;
          } catch (error) { return `[SerializationError: ${sanitizeIntextDebugString(error?.message || error, 500)}]`; }
        };
        return walk(value, 0);
      };
      const serializeIntextDebugValue = serializeIntextLogValue;

      const INTEXT_DEBUG_ONE_SHOT_VIDEO_METRICS = new Set([
        "video_request_started",
        "video_player_ads_load",
        "video_vast_processed",
        "video_ima_loaded",
        "video_player_adstart",
        "video_ima_started",
        "video_first_frame",
        "video_player_revealed",
        "video_pipeline_completed",
        "video_first_quartile",
        "video_midpoint",
        "video_third_quartile",
        "video_complete",
        "video_skipped",
        "video_timeout",
        "video_pip_dismissed",
      ]);

      const resolveIntextDebugMetricFormat = (metricName, explicitFormat, nodeState) => {
        if (String(metricName).startsWith("video_")) return "video";
        if (String(metricName).startsWith("display_")) return "display";
        if (explicitFormat === "video" || explicitFormat === "display") return explicitFormat;
        if (nodeState === "video" || nodeState === "display") return nodeState;
        return null;
      };

      const createIntextDebugCollector = (options = {}) => {
        const maxEntries = Math.max(1, Number(options.maxEntries || 5000));
        const maxBytes = Math.max(1, Number(options.maxBytes || 5 * 1024 * 1024));
        let intextDebugLogBuffer = null;
        let videoMetricDedupeKeys = new Set();
        let videoMetricOccurrenceCounts = new Map();
        let videoMetricEventSequence = 0;
        let displayGptSignalKeys = new Set();
        let manager = null;
        const active = () => typeof window !== "undefined" && window.gexpIntextDebug === true;
        const createBuffer = () => ({ startedAt: Date.now(), sequence: 0, groupDepth: 0, droppedEntries: 0, approximateBytes: 0, entries: [] });
        const ensureActive = () => {
          if (!active()) return false;
          if (!intextDebugLogBuffer) {
            intextDebugLogBuffer = createBuffer();
            videoMetricDedupeKeys = new Set();
            videoMetricOccurrenceCounts = new Map();
            videoMetricEventSequence = 0;
            displayGptSignalKeys = new Set();
          }
          if (window.gexpIntextDebugTools !== api) window.gexpIntextDebugTools = api;
          return true;
        };
        const push = (entry) => {
          const size = JSON.stringify(entry).length;
          intextDebugLogBuffer.entries.push(entry);
          intextDebugLogBuffer.approximateBytes += size;
          while (intextDebugLogBuffer.entries.length > maxEntries || intextDebugLogBuffer.approximateBytes > maxBytes) {
            const removed = intextDebugLogBuffer.entries.shift();
            intextDebugLogBuffer.approximateBytes = Math.max(0, intextDebugLogBuffer.approximateBytes - JSON.stringify(removed).length);
            intextDebugLogBuffer.droppedEntries += 1;
          }
          return entry;
        };
        const capture = (level, args = [], kind = level) => {
          if (!active() || !ensureActive()) return null;
          const values = Array.from(args || []);
          if (kind === "groupEnd") intextDebugLogBuffer.groupDepth = Math.max(0, intextDebugLogBuffer.groupDepth - 1);
          const now = Date.now();
          const hasMessage = typeof values[0] === "string";
          const message = sanitizeIntextDebugString(hasMessage ? values[0] : values.map((item) => item instanceof Error ? `${item.name}: ${item.message}` : "[Object]").join(" "));
          const entry = push({
            sequence: ++intextDebugLogBuffer.sequence,
            timestamp: now,
            isoTime: new Date(now).toISOString(),
            elapsedMs: now - intextDebugLogBuffer.startedAt,
            level,
            groupDepth: intextDebugLogBuffer.groupDepth,
            message,
            args: (hasMessage ? values.slice(1) : values).map((item) => serializeIntextLogValue(item)),
          });
          if (kind === "group") intextDebugLogBuffer.groupDepth += 1;
          return entry;
        };
        const rectOf = (element) => {
          try {
            const rect = element?.getBoundingClientRect?.();
            return rect ? Object.fromEntries(["top", "bottom", "left", "right", "width", "height"].map((key) => [key, Number(rect[key] || 0)])) : null;
          } catch (e) { return null; }
        };
        const intersectionRatio = (rect) => {
          if (!rect) return null;
          const width = Math.max(0, Math.min(rect.right, Number(window?.innerWidth || 0)) - Math.max(rect.left, 0));
          const height = Math.max(0, Math.min(rect.bottom, Number(window?.innerHeight || 0)) - Math.max(rect.top, 0));
          return rect.width * rect.height > 0 ? Math.min(1, (width * height) / (rect.width * rect.height)) : 0;
        };
        const number = (value) => {
          try {
            const resolved = typeof value === "function" ? value() : value;
            return resolved === null || resolved === undefined || resolved === "" || !Number.isFinite(Number(resolved)) ? null : Number(resolved);
          }
          catch (e) { return null; }
        };
        const recordMetric = (metric, data = {}) => {
          if (!active() || !ensureActive()) return null;
          const node = data.node || null;
          const metricName = String(metric);
          const source = String(data.source || "unknown");
          const slotId = String(data.slotId || data.slotCode || node?.id || "unknown");
          const cycleId = data.cycleId ?? node?._intextTelemetryCycleId ?? null;
          const renderToken = data.renderToken ?? node?._activeRenderToken ?? null;
          const contextKey = `${slotId}:${cycleId ?? "unknown"}:${renderToken ?? "unknown"}`;
          let occurrence = null;
          let eventSequence = null;
          if (INTEXT_DEBUG_ONE_SHOT_VIDEO_METRICS.has(metricName)) {
            const dedupeKey = `${contextKey}:${metricName}:${source}`;
            if (videoMetricDedupeKeys.has(dedupeKey)) return null;
            if (videoMetricDedupeKeys.size >= maxEntries) {
              videoMetricDedupeKeys.delete(videoMetricDedupeKeys.values().next().value);
            }
            videoMetricDedupeKeys.add(dedupeKey);
          } else if (metricName.startsWith("video_")) {
            const occurrenceKey = `${contextKey}:${metricName}`;
            occurrence = (videoMetricOccurrenceCounts.get(occurrenceKey) || 0) + 1;
            if (!videoMetricOccurrenceCounts.has(occurrenceKey) && videoMetricOccurrenceCounts.size >= maxEntries) {
              videoMetricOccurrenceCounts.delete(videoMetricOccurrenceCounts.keys().next().value);
            }
            videoMetricOccurrenceCounts.set(occurrenceKey, occurrence);
            eventSequence = ++videoMetricEventSequence;
          }
          const creative = data.creative || node?.activeCreative || null;
          const player = data.player || creative?.player || null;
          const media = data.mediaElement || creative?._adMediaEl || null;
          const format = resolveIntextDebugMetricFormat(metricName, data.format, node?.state);
          const element = data.element || (format === "video" ? node?.videoContainer?.getElement?.() : node?.container?.getElement?.());
          const wrapperRect = data.wrapperRect || rectOf(element);
          const wrapperIntersection = data.wrapperIntersectionRatio ?? data.intersectionRatio ?? intersectionRatio(wrapperRect);
          const explicitGptPercentage = number(data.gptInViewPercentage);
          const callbackGptPercentage = number(data.inViewPercentage);
          const isDisplayGptSignal = metricName === "display_visibility_changed" || metricName === "display_impression_viewable";
          if (isDisplayGptSignal) {
            if (!displayGptSignalKeys.has(contextKey) && displayGptSignalKeys.size >= maxEntries) {
              displayGptSignalKeys.delete(displayGptSignalKeys.values().next().value);
            }
            displayGptSignalKeys.add(contextKey);
          }
          const isVideoMetric = format === "video";
          const storedDisplayGptPercentage = !isVideoMetric && displayGptSignalKeys.has(contextKey)
            ? number(node?.wa?.cI?.adMaxViewability)
            : null;
          const resolvedGptPercentage = explicitGptPercentage
            ?? (!isVideoMetric && isDisplayGptSignal ? callbackGptPercentage : null)
            ?? storedDisplayGptPercentage;
          const gptViewabilityAvailable = resolvedGptPercentage !== null;
          const domViewabilityPercentage = number(wrapperIntersection) === null ? null : number(wrapperIntersection) * 100;
          const viewabilitySource = gptViewabilityAvailable
            ? "gpt"
            : (domViewabilityPercentage !== null ? "dom-intersection" : "unknown");
          const viewabilityPercentage = gptViewabilityAvailable ? resolvedGptPercentage : domViewabilityPercentage;
          const now = Date.now();
          if (node && !node._intextDebugTimings) node._intextDebugTimings = { cycleStartedAt: null, requestStartedAt: null, imaLoadedAt: null, startedAt: null, firstFrameAt: null, completedAt: null };
          const timings = node?._intextDebugTimings || {};
          if (metric === "cycle_started") timings.cycleStartedAt = now;
          if (metric === "video_request_started" || metric === "display_request_started") timings.requestStartedAt = now;
          if (metric === "video_ima_loaded") timings.imaLoadedAt = now;
          if (metric === "video_ima_started") timings.startedAt = now;
          if (metric === "video_first_frame") timings.firstFrameAt = now;
          if (metric === "video_complete") timings.completedAt = now;
          const currentTime = number(data.currentTime ?? media?.currentTime ?? (() => player?.currentTime?.()));
          const duration = number(data.duration ?? media?.duration ?? creative?._lastAdDuration ?? (() => player?.duration?.()));
          const payload = {
            metric: metricName,
            source,
            format,
            phase: data.phase ?? data.eventPhase ?? null,
            state: data.state ?? node?.state ?? null,
            slotId,
            slotIndex: data.slotIndex ?? node?.slotIndex ?? null,
            navIndex: data.navIndex ?? node?.navIndex ?? null,
            cycleId,
            renderToken,
            trigger: data.trigger || node?.waterfall?.lastTrigger || "unknown",
            requestType: data.requestType || (metricName.startsWith("video_") ? "video" : (metricName.startsWith("display_") ? "display" : null)),
            isRefresh: data.isRefresh ?? String(data.trigger || "").includes("refresh"),
            isFallback: data.isFallback ?? String(data.trigger || "").includes("fallback"),
            timestamp: now,
            documentVisibility: String(document?.visibilityState || "unknown"),
            scrollY: Number(window?.scrollY || 0),
            viewportHeight: Number(window?.innerHeight || 0),
            wrapperRect,
            intersectionRatio: wrapperIntersection,
            wrapperIntersectionRatio: wrapperIntersection,
            gptViewabilityAvailable,
            viewabilitySource,
            viewabilityPercentage,
            gptInViewPercentage: resolvedGptPercentage,
            maxInViewPercentage: data.maxInViewPercentage ?? resolvedGptPercentage,
            ...(occurrence !== null ? { occurrence, eventSequence } : {}),
            currentTime,
            duration,
            remainingTime: currentTime !== null && duration !== null ? Math.max(0, duration - currentTime) : null,
            muted: data.muted ?? media?.muted ?? null,
            volume: number(data.volume ?? media?.volume ?? (() => player?.volume?.())),
            elapsedFromCycleStartMs: timings.cycleStartedAt ? now - timings.cycleStartedAt : null,
            elapsedFromRequestMs: timings.requestStartedAt ? now - timings.requestStartedAt : null,
            elapsedFromVideoRequestMs: metricName.startsWith("video_") && timings.requestStartedAt ? now - timings.requestStartedAt : null,
            elapsedFromImaLoadedMs: timings.imaLoadedAt ? now - timings.imaLoadedAt : null,
            elapsedFromStartedMs: timings.startedAt ? now - timings.startedAt : null,
            elapsedFromFirstFrameMs: timings.firstFrameAt ? now - timings.firstFrameAt : null,
            errorCode: data.errorCode ?? data.imaErrorCode ?? null,
            errorMessage: data.errorMessage ?? data.imaErrorMessage ?? null,
            ...Object.fromEntries(Object.entries(data).filter(([key]) => ![
              "node", "element", "creative", "player", "mediaElement", "wrapperRect",
              "currentTime", "duration", "volume", "muted", "gptInViewPercentage",
              "maxInViewPercentage", "gptViewabilityAvailable", "viewabilitySource",
              "viewabilityPercentage", "occurrence", "eventSequence", "format",
            ].includes(key))),
          };
          return logIntext(`[IntextMetrics] ${metricName}`, payload);
        };
        const timelineMetricMap = {
          created: "display_slot_created",
          "render-logical": "intext_real_render",
          "intersection-change": "intext_intersection_changed",
          "wrapper-open": "display_opened",
          "wrapper-close": "display_closed",
          "fetch-margin-entered": "cycle_fetch_margin_entered",
          "render-margin-entered": "cycle_render_margin_entered",
          "request-start": "display_request_started",
          "request-end": "display_waterfall_result",
        };
        const videoMetricMap = {
          "video-request-start": "video_request_started",
          "video-request-complete": "video_pipeline_completed",
          "player-ads-load": "video_player_ads_load",
          "vast-processed": "video_vast_processed",
          loaded: "video_ima_loaded",
          "player-adstart": "video_player_adstart",
          started: "video_ima_started",
          "first-frame": "video_first_frame",
          revealed: "video_player_revealed",
          "first-quartile": "video_first_quartile",
          midpoint: "video_midpoint",
          "third-quartile": "video_third_quartile",
          complete: "video_complete",
          skipped: "video_skipped",
          paused: "video_paused",
          resumed: "video_resumed",
          click: "video_click",
          error: "video_error",
          timeout: "video_timeout",
          "fallback-started": "video_fallback_started",
          "fallback-display-requested": "video_fallback_display_requested",
        };
        const recordTimeline = (event, data = {}) => recordMetric(timelineMetricMap[event] || String(event).replace(/-/g, "_"), data);
        const recordVideoEvent = (event, node, data = {}) => recordMetric(videoMetricMap[event] || String(event).replace(/-/g, "_"), { source: data.source || event, ...data, node });
        const getSummary = () => {
          if (!active() || !ensureActive()) return { totalEntries: 0, slotsAndCycles: [] };
          const groups = {};
          intextDebugLogBuffer.entries.forEach((entry) => {
            if (!entry.message.startsWith("[IntextMetrics] ")) return;
            const data = entry.args?.[0] || {};
            const metric = String(data.metric || entry.message.slice(16));
            const key = `${data.slotId || "unknown"}:${data.cycleId ?? "unknown"}:${data.renderToken ?? "unknown"}`;
            const group = groups[key] ||= { slotId: data.slotId || "unknown", cycleId: data.cycleId ?? null, renderToken: data.renderToken ?? null, navIndex: data.navIndex ?? null, display: {}, video: {}, overall: {}, flags: {}, _times: {}, _data: {}, _events: {} };
            group._times[metric] ??= entry.timestamp;
            group._data[metric] ??= data;
            (group._events[metric] ||= []).push({ ...data, timestamp: data.timestamp ?? entry.timestamp });
            const viewPercentage = data.viewabilityPercentage;
            if (viewPercentage != null && Number.isFinite(Number(viewPercentage))) {
              const percentage = Number(viewPercentage);
              const metricFormat = resolveIntextDebugMetricFormat(metric, data.format, data.state);
              const isDisplay = metricFormat === "display";
              const isVideo = metricFormat === "video";
              if (isDisplay) group.display.maxInViewPercentage = Math.max(Number(group.display.maxInViewPercentage ?? 0), percentage);
              if (isVideo) group.video.maxInViewPercentage = Math.max(Number(group.video.maxInViewPercentage ?? 0), percentage);
              group.overall.maxInViewPercentage = Math.max(Number(group.overall.maxInViewPercentage ?? 0), percentage);
            }
          });
          const delta = (times, from, to) => times[from] != null && times[to] != null ? times[to] - times[from] : null;
          const resolveViewability = (data = {}) => {
            if (data.viewabilityPercentage != null && Number.isFinite(Number(data.viewabilityPercentage))) {
              return { percentage: Number(data.viewabilityPercentage), source: data.viewabilitySource || "unknown" };
            }
            const gpt = data.gptInViewPercentage;
            if (data.gptViewabilityAvailable === true && gpt != null && Number.isFinite(Number(gpt))) return { percentage: Number(gpt), source: "gpt" };
            const ratio = data.wrapperIntersectionRatio ?? data.intersectionRatio;
            if (ratio != null && Number.isFinite(Number(ratio))) return { percentage: Number(ratio) * 100, source: "dom-intersection" };
            return { percentage: null, source: "unknown" };
          };
          Object.values(groups).forEach((group) => {
            const t = group._times;
            const has = (name) => t[name] != null;
            Object.assign(group.display, {
              requestStarted: has("display_request_started"),
              slotResponseReceived: has("display_slot_response_received"),
              waterfallResult: has("display_waterfall_result"),
              renderEnded: has("display_slot_render_ended"),
              gamFilled: has("display_gam_filled"),
              realFilled: has("display_real_filled"),
              empty: has("display_empty"), house: has("display_house"), sentinel: has("display_sentinel"),
              opened: has("display_opened") || has("display_wrapper_opened"), impressionViewable: has("display_impression_viewable"),
              requestToResponseMs: delta(t, "display_request_started", "display_slot_response_received"),
              responseToRenderMs: delta(t, "display_slot_response_received", "display_slot_render_ended"),
              renderToOpenMs: delta(t, "display_slot_render_ended", has("display_wrapper_opened") ? "display_wrapper_opened" : "display_opened"),
              renderToViewableMs: delta(t, "display_slot_render_ended", "display_impression_viewable"),
            });
            Object.assign(group.video, {
              requestStarted: has("video_request_started"),
              playerAdsLoad: has("video_player_ads_load"),
              vastProcessed: has("video_vast_processed"),
              pipelineCompleted: has("video_pipeline_completed"),
              imaLoaded: has("video_ima_loaded"),
              playerAdstart: has("video_player_adstart"), imaStarted: has("video_ima_started"), firstFrame: has("video_first_frame"),
              playerRevealed: has("video_player_revealed"), quartile25: has("video_first_quartile"), quartile50: has("video_midpoint"),
              quartile75: has("video_third_quartile"), complete: has("video_complete"), skipped: has("video_skipped"),
              error: has("video_error"), timeout: has("video_timeout"), fallback: has("video_fallback_started"),
              requestToImaLoadedMs: delta(t, "video_request_started", "video_ima_loaded"),
              imaLoadedToStartedMs: delta(t, "video_ima_loaded", "video_ima_started"),
              startedToFirstFrameMs: delta(t, "video_ima_started", "video_first_frame"),
              firstFrameToRevealMs: delta(t, "video_first_frame", "video_player_revealed"),
              startedToCompleteMs: delta(t, "video_ima_started", "video_complete"),
            });
            const pipEntries = group._events.video_pip_entered || [];
            const pipReturns = group._events.video_pip_returned_inline || [];
            const pipDismissals = group._events.video_pip_dismissed || [];
            const pipReplacements = group._events.video_pip_replaced || [];
            const pipEnded = group._events.video_pip_video_ended || [];
            const pipExits = [...pipReturns, ...pipDismissals, ...pipEnded]
              .sort((a, b) => Number(a.timestamp || 0) - Number(b.timestamp || 0));
            const firstPipEntry = pipEntries[0] || {};
            const lastPipExit = pipExits[pipExits.length - 1] || {};
            const totalFloatingMs = pipExits.reduce(
              (max, event) => Math.max(max, Number(event.accumulatedPipVisibleMs) || 0),
              0,
            );
            group.video.pip = {
              enabled: group._data.cycle_started?.pipEnabled === true || pipEntries.length > 0,
              entered: pipEntries.length > 0,
              entryCount: pipEntries.length,
              returnedInlineCount: pipReturns.length,
              dismissed: pipDismissals.length > 0,
              replaced: pipReplacements.length > 0,
              endedWhileActive: pipEnded.length > 0,
              totalFloatingMs,
              firstEntryPlayedPct: firstPipEntry.playedPct ?? null,
              lastExitPlayedPct: lastPipExit.playedPct ?? null,
              firstEntryIntersectionRatio: firstPipEntry.anchorIntersectionRatio ?? null,
              lastExitReason: lastPipExit.reason ?? null,
            };
            const startedData = group._data.video_ima_started || {};
            const firstFrameData = group._data.video_first_frame || {};
            const revealData = group._data.video_player_revealed || {};
            const displayOpenData = group._data.display_wrapper_opened || group._data.display_opened || {};
            const firstFrameViewability = resolveViewability(firstFrameData);
            const revealViewability = resolveViewability(revealData);
            const displayOpenViewability = resolveViewability(displayOpenData);
            group.viewabilitySource = {
              firstFrame: firstFrameViewability.source,
              playerRevealed: revealViewability.source,
              displayOpened: displayOpenViewability.source,
            };
            Object.assign(group.flags, {
              startedWithoutFirstFrame: group.video.imaStarted ? !group.video.firstFrame : "not-applicable",
              firstFrameWithoutReveal: group.video.firstFrame ? !group.video.playerRevealed : "not-applicable",
              startedWithPageHidden: group.video.imaStarted ? startedData.documentVisibility === "hidden" : "not-applicable",
              firstFrameBelow50Percent: !group.video.firstFrame ? "not-applicable" : (firstFrameViewability.percentage === null ? "unknown" : firstFrameViewability.percentage < 50),
              firstFrameOutsideViewport: !group.video.firstFrame ? "not-applicable" : (firstFrameViewability.percentage === null ? "unknown" : firstFrameViewability.percentage <= 0),
              revealedAfterViewportExit: !group.video.playerRevealed ? "not-applicable" : (revealViewability.percentage === null ? "unknown" : revealViewability.percentage <= 0),
              completedBeforeReveal: group.video.complete ? (!group.video.playerRevealed || t.video_complete < t.video_player_revealed) : "not-applicable",
              fallbackBeforeStarted: group.video.fallback ? (!group.video.imaStarted || t.video_fallback_started < t.video_ima_started) : "not-applicable",
              fallbackAfterStarted: group.video.fallback ? (group.video.imaStarted && t.video_fallback_started >= t.video_ima_started) : "not-applicable",
              displayRenderedButNeverViewable: group.display.renderEnded ? !group.display.impressionViewable : "not-applicable",
              displayOpenedOutsideViewport: !group.display.opened ? "not-applicable" : (displayOpenViewability.percentage === null ? "unknown" : displayOpenViewability.percentage <= 0),
              pipEnteredBeforeFirstFrame: pipEntries.some((event) =>
                t.video_first_frame == null || Number(event.timestamp) < Number(t.video_first_frame)
              ),
              pipEnteredBeforeReveal: pipEntries.some((event) =>
                t.video_player_revealed == null || Number(event.timestamp) < Number(t.video_player_revealed)
              ),
              pipEnteredWithPageHidden: pipEntries.some((event) => event.documentVisibility !== "visible"),
              pipRemainedAfterVideoEnd: pipEnded.some((endedEvent) =>
                pipEntries.some((entryEvent) => {
                  const enteredAt = Number(entryEvent.timestamp);
                  const endedAt = Number(endedEvent.timestamp);
                  if (enteredAt > endedAt) return false;
                  return !pipReturns.some((returnEvent) => {
                    const returnedAt = Number(returnEvent.timestamp);
                    return returnedAt >= enteredAt && returnedAt <= endedAt;
                  });
                })
              ),
              multiplePipPlayersDetected: pipEntries.some((event) => event.multiplePipPlayersDetected === true),
              pipDismissedButReenteredSameToken: pipDismissals.some((dismissedEvent) =>
                pipEntries.some((entryEvent) =>
                  Number(entryEvent.timestamp) > Number(dismissedEvent.timestamp)
                )
              ),
            });
            delete group._times;
            delete group._data;
            delete group._events;
          });
          return { totalEntries: intextDebugLogBuffer.entries.length, slotsAndCycles: Object.values(groups) };
        };
        const getPage = () => {
          const source = window?.ueDataLayer || window?.utag_data || {};
          const origin = String(window?.location?.origin || "");
          const pathname = String(window?.location?.pathname || "/");
          return { origin, pathname, be_page_newsID: source?.be_page_newsID ?? null, contentType: manager?.siteContext?.contentType || source?.be_page_content_type || "unknown", domain: manager?.siteContext?.site || source?.be_page_domain || window?.location?.hostname || "unknown" };
        };
        const getPackage = () => {
          if (!active() || !ensureActive()) return null;
          const now = Date.now();
          return { schemaVersion: "1.0.0", generatedAt: new Date(now).toISOString(), startedAt: new Date(intextDebugLogBuffer.startedAt).toISOString(), durationMs: now - intextDebugLogBuffer.startedAt, page: getPage(), debugger: { totalEntries: intextDebugLogBuffer.entries.length, droppedEntries: intextDebugLogBuffer.droppedEntries, approximateBytes: intextDebugLogBuffer.approximateBytes }, summary: getSummary(), logs: intextDebugLogBuffer.entries.slice() };
        };
        const download = (content, mime, extension) => {
          const page = getPage();
          const domain = String(page.domain || "unknown").replace(/[^a-z0-9.-]/gi, "_");
          const contentId = String(page.be_page_newsID || "unknown-news").replace(/[^a-z0-9._-]/gi, "_");
          const filename = `gexp-intext-debug_${domain}_${contentId}_${new Date().toISOString().replace(/[:.]/g, "-")}.${extension}`;
          const blob = new Blob([content], { type: mime });
          const href = URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = href; anchor.download = filename; anchor.style.display = "none";
          document.body?.appendChild?.(anchor); anchor.click(); anchor.remove?.();
          setTimeout(() => URL.revokeObjectURL(href), 1000);
          return { filename, sizeBytes: blob.size };
        };
        const downloadJSON = () => { const pkg = getPackage(); return pkg ? download(JSON.stringify(pkg, null, 2), "application/json;charset=utf-8", "json") : null; };
        const downloadTXT = () => {
          if (!active() || !ensureActive()) return null;
          const lines = intextDebugLogBuffer.entries.map((entry) => `${String(entry.sequence).padStart(5, "0")} +${entry.elapsedMs}ms [${entry.level}] ${"  ".repeat(entry.groupDepth || 0)}${entry.message}${entry.args?.length ? ` ${JSON.stringify(entry.args.length === 1 ? entry.args[0] : entry.args)}` : ""}`);
          return download(lines.join("\n"), "text/plain;charset=utf-8", "txt");
        };
        const getLogs = () => active() && ensureActive() ? intextDebugLogBuffer.entries.slice() : [];
        const mark = (label, data = null) => capture("marker", [String(label), data], "marker");
        const clear = () => {
          if (!active()) return false;
          intextDebugLogBuffer = createBuffer();
          videoMetricDedupeKeys = new Set();
          videoMetricOccurrenceCounts = new Map();
          videoMetricEventSequence = 0;
          displayGptSignalKeys = new Set();
          return true;
        };
        const attachManager = (candidate) => { if (!active()) return false; manager = candidate || manager; return ensureActive(); };
        const api = { downloadJSON, downloadTXT, getLogs, getSummary, clear, mark };
        return { isActive: active, ensureActive, capture, recordMetric, recordTimeline, recordVideoEvent, attachManager, getSummary, clear, mark, downloadJSON, downloadTXT, getLogs, getStateForTests: () => intextDebugLogBuffer };
      };

      const intextDebugCollector = createIntextDebugCollector();
      intextDebugCollector.ensureActive();
      const logIntext = (...args) => { if (window.gexpIntextDebug) { intextDebugCollector.capture("log", args); console.log(...formatLog(args, badgeLog)); } };
      const warnIntext = (...args) => { if (window.gexpIntextDebug) { intextDebugCollector.capture("warn", args); console.warn(...formatLog(args, badgeWarn)); } };
      const warnIntextAlways = (...args) => { if (window.gexpIntextDebug) intextDebugCollector.capture("warn", args); console.warn(...formatLog(args, badgeWarn)); };
      const errorIntext = (...args) => { if (window.gexpIntextDebug) intextDebugCollector.capture("error", args); console.error(...formatLog(args, badgeErr)); };
      const groupIntext = (...args) => { if (window.gexpIntextDebug) { intextDebugCollector.capture("group", args, "group"); console.groupCollapsed(...formatLog(args, badgeLog)); } };
      const groupEndIntext = () => { if (window.gexpIntextDebug) { intextDebugCollector.capture("groupEnd", [], "groupEnd"); console.groupEnd(); } };

      const INTEXT_RANDOM_KEYS = Object.freeze(["random1", "random2", "random3", "random4"]);
      const INTEXT_TELEMETRY_STANDARD_FIELDS = Object.freeze([
        "gexp-intext-telemetry-event-type",
        "gexp-intext-opportunity-id",
        "gexp-intext-manager-event-id",
        "gexp-intext-decision",
        "gexp-intext-decision-reason",
        "gexp-intext-decision-scope",
        "gexp-intext-fallback-blank-event-id",
        "gexp-intext-fallback-blank-control-enabled",
        "gexp-intext-fallback-blank-control-threshold",
        "gexp-intext-fallback-blank-control-cookie",
        "gexp-intext-fallback-blank-control-count",
        "gexp-intext-fallback-blank-control-counted",
        "gexp-intext-fallback-blank-control-source",
        "gexp-intext-fallback-blank-control-reason",
        "gexp-intext-fallback-blank-control-cookie-set",
        "gexp-intext-fallback-blank-control-blocked",
        "gexp-intext-fallback-blank-control-counter-before",
        "gexp-intext-fallback-blank-control-counter-after",
        "gexp-intext-fallback-blank-control-threshold-reached",
        "gexp-intext-fallback-blank-control-cookie-set-attempted",
        "gexp-intext-fallback-blank-control-cookie-set-confirmed",
        "gexp-intext-fallback-blank-control-cookie-set-error",
        "gexp-intext-random-source",
        "gexp-intext-random1-effective",
        "gexp-intext-random2-effective",
        "gexp-intext-random3-effective",
        "gexp-intext-random4-effective",
        "gexp-intext-random-consistency-slots",
        "gexp-intext-random-slots-found",
        "gexp-intext-random-slots-checked",
        "gexp-intext-random-slots-unresolved-count",
        "gexp-intext-random-slots-mismatch-count",
        "gexp-intext-random-mismatch-slot-ids",
        "gexp-intext-random-unresolved-slot-ids",
        "gexp-intext-random-mismatch-corrected",
        "gexp-intext-random-expected",
        "gexp-intext-random-observed",
        "gexp-intext-diagnostic-key",
        "gexp-intext-diagnostic-context",
        "gexp-intext-lifecycle-event",
        "gexp-intext-lifecycle-payload",
        "gexp-intext-reference-slot-id",
        "gexp-intext-reference-slot-position",
        "gexp-intext-reference-slot-pvid",
        "gexp-intext-telemetry-sampled",
        "gexp-intext-page-instance-id",
        "gexp-intext-content-id",
        "gexp-intext-content-id-source",
        "be_page_newsID",
        "gexp-intext-qa-inclusion-forced",
        "gexp-intext-qa-original-random1",
        "gexp-intext-qa-cookie-enabled",
        "gexp-intext-qa-cookie-random1",
        "gexp-intext-qa-cookie-applied",
        "gexp-intext-qa-cookie-force-exclusions",
        "gexp-intext-qa-cookie-exclusions-bypassed",
        "gexp-intext-qa-cookie-exclusions-bypass-source",
        "gexp-intext-placement-result",
        "gexp-intext-placements-found",
        "gexp-intext-placements-created",
        "gexp-intext-parent-tlm-rid",
        "gexp-intext-cycle-finalized-after-early-flush",
        "gexp-intext-telemetry-commit-reason",
        "gexp-intext-request-type",
        "gexp-intext-video",
        "gexp-intext-display",
        "gexp-intext-is-refresh",
        "gexp-intext-refresh",
        "gexp-intext-is-fallback",
        "gexp-intext-fallback",
        "gexp-intext-video-failed",
        "gexp-intext-video-error-code",
        "gexp-intext-video-error-message",
        "gexp-intext-network-id-mode",
        "gexp-intext-network-id-configured",
        "gexp-intext-network-id-detected",
        "gexp-intext-network-id-request",
        "gexp-intext-network-id-source",
        "gexp-intext-network-id-forced",
        "gexp-intext-display-adunit-request",
        "gexp-intext-video-adunit-request",
        "gexp-intext-refresh-blocked",
        "gexp-intext-refresh-blocked-reason",
        "gexp-intext-pip-enabled",
        "gexp-intext-pip-effective-enabled",
        "gexp-intext-pip-slot-enabled",
        "gexp-intext-pip-targeting-allowed",
        "gexp-intext-pip-targeting-reason",
        "gexp-intext-pip-inclusion-site-matched",
        "gexp-intext-pip-inclusion-keyvalue-matched",
        "gexp-intext-pip-exclusion-site-matched",
        "gexp-intext-pip-exclusion-keyvalue-matched",
        "gexp-intext-pip-targeting-matched-key",
        "gexp-intext-pip-targeting-matched-value",
        "gexp-intext-pip-playback-source",
        "gexp-intext-pip-video-playing",
        "gexp-intext-pip-entered",
        "gexp-intext-pip-entry-count",
        "gexp-intext-pip-visible-ms",
        "gexp-intext-pip-dismissed",
        "gexp-intext-pip-ended-while-active",
        "gexp-intext-pip-last-exit-reason",
        "gexp-intext-pip-entry-played-pct",
        "gexp-intext-pip-exit-played-pct",
        "gexp-intext-ad-rendered-logical",
        "gexp-intext-ad-filled-logical",
        "gexp-intext-gam-line-item-type",
        "gexp-intext-gam-event-size",
        "gexp-intext-render-layout",
        "adFilled",
        "adRendered",
        "isEmpty",
        "lineItemId",
        "creativeId",
        "campaignId",
        "advertiserId",
        "slot-id",
        "slot-index",
        "cycle-id",
        "render-token",
        "pvid",
        "navIndex",
        "domain",
        "country",
        "contentType",
        "timestamp",
        "tlm_rid",
        "random1",
        "random2",
        "random3",
        "random4",
      ]);

      class IntextManager {
        constructor(config, gexpInstance) {
          this.config = config;
          this.gexp = gexpInstance;
          this.nodes = [];
          this.siteContext = this.getSiteContext();
          this.siteConfig = this.resolveSiteConfig();
          this.baseSiteConfig = this.siteConfig ? JSON.parse(JSON.stringify(this.siteConfig)) : null;
          this.intextQaCookieOverride = this.readIntextQaCookieOverride();
          this._intextQaCookieApplied = false;
          this._intextQaInclusionForced = false;
          this._intextQaCookieExclusionsBypassed = false;
          this._intextQaCookieExclusionsBypassSource = null;
          this.intextRandomSnapshot = null;
          this._intextSyntheticEventKeys = new Set();
          this._intextOpportunityDecisionKeys = new Set();
          this._intextContentIdentityByNavIndex = new Map();
          this._intextTelemetrySampled = this.gexp?.statsG?.telp === true;
          this._activeIntextPipNode = null;
          Object.defineProperty(this, "_intextPageInstanceId", {
            value: this.createIntextTelemetryId("intext-page"),
            writable: false,
            configurable: false,
            enumerable: false,
          });
          this.adUnitPath = this.extractStaticAdUnitPath();
          this.detectedAdUnitPath = null;
          this.detectedNetworkId = null;
          this.configuredNetworkId = this.normalizeIntextNetworkId(
            this.siteConfig?.gam?.networkId ?? this.config?.networkId,
          );
          this.requestNetworkId = null;
          this.networkIdResolutionSource = "unresolved";
          this.networkId = this.resolveIntextRequestNetworkId();
          if (window.gexpIntextDebug) intextDebugCollector.attachManager(this);
          ensureBaseStyles();

          if (!this.siteConfig) return;

          logIntext(`[IntextManager] site_config_resolved`, {
            hasSiteConfig: Boolean(this.siteConfig),
            hasDomainFilter: Boolean(this.siteConfig?.domainFilter),
            domainFilterEnabled: this.siteConfig?.domainFilter?.enabled === true,
          });

          if (this.siteConfig?.domainFilter?.enabled) {
            const filter = this.siteConfig?.domainFilter;
            
            if (filter.allowedDomains !== "all") {
                let currentDomain = null;
                const dl = window[filter.dataLayerObj] || window.utag_data; 
                logIntext(`[IntextManager] domain_filter_datalayer_resolved`, {
                  dataLayerObj: filter.dataLayerObj,
                  dataLayerProp: filter.dataLayerProp,
                  hasDataLayer: Boolean(dl),
                });
                
                if (dl) {
                    const dlData = Array.isArray(dl) ? dl[0] : dl;
                    if (dlData && dlData[filter.dataLayerProp]) {
                        currentDomain = dlData[filter.dataLayerProp];  
                        logIntext(`[IntextManager] domain_filter_current_domain_resolved`, {
                          source: "dataLayer",
                          currentDomain,
                        });
                    }
                }

                if (!currentDomain && window.location) {
                    currentDomain = window.location.hostname;
                    logIntext(`[IntextManager] domain_filter_current_domain_resolved`, {
                      source: "window.location",
                      currentDomain,
                    });
                }

                if (
                  !filter.allowedDomains.some(domain => currentDomain.includes(domain))
                  && this.intextQaCookieOverride?.enabled !== true
                ) {
                    logIntext(`🛑 [IntextManager] Ejecución bloqueada. Dominio '${currentDomain}' no permitido.`);                   
                    return;
                }
                if (
                  !filter.allowedDomains.some(domain => currentDomain.includes(domain))
                  && this.intextQaCookieOverride?.enabled === true
                ) {
                  this.markIntextQaCookieApplied();
                  logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
                    key: "domainFilter.allowedDomains",
                    currentDomain,
                  });
                }
            }
          }

          if (this.siteConfig?.debug === true) {
            window.gexpIntextDebug = true;
          }

          if (!this.gexp.isEnabled()) {
            if (this.intextQaCookieOverride?.enabled === true) {
              this.markIntextQaCookieApplied();
              logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
                key: "gexp.isEnabled",
                originalValue: false,
              });
            } else {
              return;
            }
          }

          const allowedTypes = this.siteConfig.allowedContentTypes || [];
          if (allowedTypes.length > 0 && !allowedTypes.includes(this.siteContext.contentType)) {
              logIntext(`[IntextManager] Disabled for content type: ${this.siteContext.contentType}. Allowed: ${allowedTypes.join(', ')}`);
              return;
          }

          if (this.siteConfig?.exclusions?.disableAll === true) {
            if (this.isIntextQaExclusionsBypassEnabled()) {
              this.markIntextQaExclusionsBypassApplied("constructor-exclusions.disableAll");
            } else {
              logIntext(`[IntextManager] ❌ BLOCKED by exclusions.disableAll = true`);
              return;
            }
          }
          const launchIntextPositions = () => {
            googletag.cmd.push(() => {
              if (this.resolveAdUnit() === false) return;
              this.siteContext.contentType = this.detectContentType();
              logIntext(`[IntextManager] Detected content type: "${this.siteContext.contentType}"`);

              this.siteConfig = this.resolveContentTypeProfile(this.siteConfig, this.siteContext.contentType);
              if (!this.isContentTypeAllowed(this.siteConfig, this.siteContext.contentType, "[IntextManager]")) {
                return;
              }
              const snapshot = this.captureIntextRandomSnapshot();
              if (!this.validateIntextRandomSnapshot(snapshot)) {
                this.registerIntextManagerDecision({
                  navIndex: 0,
                  scope: "initial",
                  decision: "blocked",
                  reason: "random-snapshot-invalid",
                });
                this.registerIntextDiagnosticEvent({
                  diagnosticKey: "random-snapshot-invalid",
                  "gexp-intext-decision": "blocked",
                  "gexp-intext-decision-reason": "random-snapshot-invalid",
                });
                return;
              }
              if (this.isBlockedByExclusions()) {
                return;
              }

              if (!this.isAllowedByInclusions()) {
                return;
              }

              if (this.shouldBlockIntextByFallbackBlankControl()) {
                logIntext(`[IntextManager] intext_blocked_by_fallback_blank_cookie`);
                this.registerIntextManagerDecision({
                  navIndex: 0,
                  scope: "initial",
                  decision: "blocked",
                  reason: "fallback-blank-cookie",
                });
                return;
              }

              const placement = this.createIntextPositions();
              this.registerIntextManagerDecision({
                navIndex: 0,
                scope: "initial",
                decision: "allowed",
                reason: "passed",
                placement,
              });

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

        createIntextTelemetryId(prefix = "intext") {
          try {
            if (typeof window !== "undefined" && typeof window.crypto?.randomUUID === "function") {
              return `${prefix}:${window.crypto.randomUUID()}`;
            }
          } catch (e) {}
          this._intextTelemetryIdSequence = (this._intextTelemetryIdSequence || 0) + 1;
          return `${prefix}:${Date.now()}:${this._intextTelemetryIdSequence}:${Math.random().toString(36).slice(2, 10)}`;
        }

        resolveIntextNewsIdentity(rootElement = null, scopedContext = null) {
          const readAttribute = (name) => {
            try {
              const value = rootElement?.getAttribute?.(name);
              return value !== undefined && value !== null && value !== "" ? String(value) : null;
            } catch (e) {
              return null;
            }
          };
          const candidates = [
            [readAttribute("data-ue-news-id"), "root:data-ue-news-id"],
            [readAttribute("data-news-id"), "root:data-news-id"],
            [readAttribute("data-article-id"), "root:data-article-id"],
            [scopedContext?.be_page_newsID, "scopedContext.be_page_newsID"],
            [typeof window !== "undefined" ? window.ueDataLayer?.be_page_newsID : null, "ueDataLayer.be_page_newsID"],
            [typeof window !== "undefined" ? window.utag_data?.be_page_newsID : null, "utag_data.be_page_newsID"],
          ];
          const resolved = candidates.find(([value]) => value !== undefined && value !== null && value !== "");
          return resolved
            ? Object.freeze({ id: String(resolved[0]), source: resolved[1], resolved: true })
            : Object.freeze({ id: null, source: "unresolved", resolved: false });
        }

        resolveIntextNewsId(rootElement = null, scopedContext = null) {
          return this.resolveIntextNewsIdentity(rootElement, scopedContext).id;
        }

        getPreviousResolvedIntextNewsId(navIndex) {
          const current = Number(navIndex) || 0;
          let previous = null;
          this._intextContentIdentityByNavIndex?.forEach?.((identity, index) => {
            if (Number(index) < current && identity?.resolved && (!previous || Number(index) > previous.index)) {
              previous = { index: Number(index), id: String(identity.newsId) };
            }
          });
          return previous?.id || null;
        }

        getScopedIntextNewsIdentityCandidate(mainElement, scopedContext = null) {
          const readAttribute = (element, name) => {
            try {
              const value = element?.getAttribute?.(name);
              return value !== undefined && value !== null && value !== "" ? String(value) : null;
            } catch (e) {
              return null;
            }
          };
          const attributes = ["data-ue-news-id", "data-news-id", "data-article-id"];
          for (const attribute of attributes) {
            const value = readAttribute(mainElement, attribute);
            if (value) return { id: value, source: `root:${attribute}`, scoped: true };
          }
          for (const attribute of attributes) {
            let descendant = null;
            try { descendant = mainElement?.querySelector?.(`[${attribute}]`) || null; } catch (e) {}
            const value = readAttribute(descendant, attribute);
            if (value) return { id: value, source: `descendant:${attribute}`, scoped: true };
          }
          if (scopedContext?.be_page_newsID !== undefined && scopedContext?.be_page_newsID !== null && scopedContext.be_page_newsID !== "") {
            return { id: String(scopedContext.be_page_newsID), source: "scopedContext.be_page_newsID", scoped: true };
          }
          const scopedSlots = this.getScopedSlotsForRoot(mainElement);
          for (const slot of scopedSlots) {
            for (const key of ["be_page_newsID", "be_page_newsid", "newsID", "news_id", "article_id"]) {
              const value = this.normalizeIntextDiagnosticTargetingValue(slot?.getTargeting?.(key));
              if (value !== null) {
                return { id: value, source: `scoped-slot:${slot?.getSlotElementId?.() || "unknown"}:${key}`, scoped: true };
              }
            }
          }
          const ueValue = typeof window !== "undefined" ? window.ueDataLayer?.be_page_newsID : null;
          if (ueValue !== undefined && ueValue !== null && ueValue !== "") {
            return { id: String(ueValue), source: "ueDataLayer.be_page_newsID", scoped: false };
          }
          const utagValue = typeof window !== "undefined" ? window.utag_data?.be_page_newsID : null;
          if (utagValue !== undefined && utagValue !== null && utagValue !== "") {
            return { id: String(utagValue), source: "utag_data.be_page_newsID", scoped: false };
          }
          return null;
        }

        async resolveScopedIntextNewsIdentity(mainElement, navIndex, scopedContext = null) {
          const normalizedNavIndex = Number(navIndex) || 0;
          const previousNewsId = this.getPreviousResolvedIntextNewsId(normalizedNavIndex);
          const waitMs = Math.max(0, Number(this.siteConfig?.infiniteScroll?.contentIdentityWaitMs ?? 500));
          const pollMs = Math.max(10, Number(this.siteConfig?.infiniteScroll?.contentIdentityPollMs ?? 50));
          const startedAt = Date.now();
          while (true) {
            const candidate = this.getScopedIntextNewsIdentityCandidate(mainElement, scopedContext);
            if (candidate && (candidate.scoped || !previousNewsId || candidate.id !== previousNewsId)) {
              return Object.freeze({ id: candidate.id, source: candidate.source, resolved: true });
            }
            if (Date.now() - startedAt >= waitMs) {
              return Object.freeze({ id: null, source: "unresolved", resolved: false });
            }
            await new Promise((resolve) => setTimeout(resolve, Math.min(pollMs, waitMs - (Date.now() - startedAt))));
          }
        }

        requestActiveIntextPip(node) {
          if (!node) return false;
          const previousNode = this._activeIntextPipNode;
          if (previousNode === node) return true;
          if (previousNode) {
            previousNode.exitIntextPip?.("replaced-by-another-slot");
          }
          this._activeIntextPipNode = node;
          return true;
        }

        releaseActiveIntextPip(node) {
          if (this._activeIntextPipNode !== node) return false;
          this._activeIntextPipNode = null;
          return true;
        }

        captureIntextContentIdentity(navIndex = 0, rootElement = null, scopedContext = null, resolvedIdentity = null) {
          const normalizedNavIndex = Number(navIndex) || 0;
          if (this._intextContentIdentityByNavIndex?.has(normalizedNavIndex)) {
            return this._intextContentIdentityByNavIndex.get(normalizedNavIndex);
          }
          if (!this._intextContentIdentityByNavIndex) this._intextContentIdentityByNavIndex = new Map();
          const resolved = resolvedIdentity || this.resolveIntextNewsIdentity(rootElement, scopedContext);
          const identity = Object.freeze({
            id: resolved.id || `unknown-news:${normalizedNavIndex}`,
            newsId: resolved.id || null,
            source: resolved.source,
            resolved: resolved.resolved,
            navIndex: normalizedNavIndex,
          });
          this._intextContentIdentityByNavIndex.set(normalizedNavIndex, identity);
          if (!identity.resolved) {
            this.registerIntextDiagnosticEvent({
              diagnosticKey: `content-id-unresolved:${normalizedNavIndex}`,
              navIndex: String(normalizedNavIndex),
              "gexp-intext-diagnostic-context": `navIndex:${normalizedNavIndex}`,
            });
          }
          return identity;
        }

        resolveOptionalIntextSlotPvid(rootElement = null, scopedContext = null) {
          try {
            const slots = rootElement
              ? this.getScopedSlotsForRoot(rootElement)
              : (Array.isArray(scopedContext?.scopedSlots)
                ? scopedContext.scopedSlots
                : (googletag?.pubads?.().getSlots?.() || []));
            for (const slot of slots) {
              const slotId = String(slot?.getSlotElementId?.() || "");
              if (!slotId || slotId.startsWith("gexp-intext")) continue;
              const value = this.normalizeIntextDiagnosticTargetingValue(slot?.getTargeting?.("pvid"));
              if (value !== null) return value;
            }
          } catch (e) {}
          return null;
        }

        resolveIntextCountry() {
          const value =
            (typeof window !== "undefined" ? window.ueDataLayer?.be_page_country : null) ||
            (typeof window !== "undefined" ? window.utag_data?.be_page_country : null) ||
            this.gexp?.country ||
            this.config?.gexp_cfg_country ||
            "unknown";
          return String(value);
        }

        captureIntextRandomSnapshot() {
          if (this.intextRandomSnapshot) return this.intextRandomSnapshot;
          try {
            this.intextRandomSnapshot = Object.freeze({
              random1: String(this.gexp.getRandom(1)),
              random2: String(this.gexp.getRandom(2)),
              random3: String(this.gexp.getRandom(3)),
              random4: String(this.gexp.getRandom(4)),
              source: "gexp-slot-random-snapshot",
            });
          } catch (e) {
            this.intextRandomSnapshot = Object.freeze({
              random1: "",
              random2: "",
              random3: "",
              random4: "",
              source: "gexp-slot-random-snapshot",
            });
          }
          return this.intextRandomSnapshot;
        }

        validateIntextRandomSnapshot(snapshot = this.intextRandomSnapshot) {
          if (!snapshot || !Object.isFrozen(snapshot)) return false;
          const invalidLiterals = new Set(["", "undefined", "null", "nan"]);
          return INTEXT_RANDOM_KEYS.every((key) => {
            const raw = String(snapshot[key] ?? "").trim();
            if (invalidLiterals.has(raw.toLowerCase())) return false;
            const value = Number(raw);
            return Number.isInteger(value) && value >= 1 && value <= 20;
          });
        }

        validateIntextRandomSnapshotStability(context = "runtime") {
          const snapshot = this.intextRandomSnapshot;
          if (!this.validateIntextRandomSnapshot(snapshot)) return false;
          let current = null;
          try {
            current = {
              random1: String(this.gexp.getRandom(1)),
              random2: String(this.gexp.getRandom(2)),
              random3: String(this.gexp.getRandom(3)),
              random4: String(this.gexp.getRandom(4)),
            };
          } catch (e) {
            return false;
          }
          const stable = INTEXT_RANDOM_KEYS.every((key) => current[key] === snapshot[key]);
          if (!stable) {
            this.registerIntextDiagnosticEvent({
              diagnosticKey: `gexp-random-changed-after-snapshot:${context}`,
              "gexp-intext-diagnostic-context": String(context),
              "gexp-intext-random-expected": JSON.stringify(snapshot),
              "gexp-intext-random-observed": JSON.stringify(current),
            });
          }
          return stable;
        }

        getIntextRandomValue(key) {
          if (!INTEXT_RANDOM_KEYS.includes(String(key))) return null;
          const snapshot = this.intextRandomSnapshot;
          return snapshot && snapshot[key] !== undefined ? String(snapshot[key]) : null;
        }

        getIntextRuleTargetingValue(key, pageTargeting = null) {
          const snapshotValue = this.getIntextRandomValue(key);
          if (INTEXT_RANDOM_KEYS.includes(String(key))) return snapshotValue;
          return pageTargeting?.[key];
        }

        getIntextRandomTelemetry() {
          const snapshot = this.intextRandomSnapshot || {};
          // The gexp-intext-randomN-effective fields are the canonical Intext
          // analysis values. Bare randomN fields remain for compatibility only.
          return {
            "gexp-intext-random-source": String(snapshot.source || "unresolved"),
            "gexp-intext-random1-effective": String(snapshot.random1 || ""),
            "gexp-intext-random2-effective": String(snapshot.random2 || ""),
            "gexp-intext-random3-effective": String(snapshot.random3 || ""),
            "gexp-intext-random4-effective": String(snapshot.random4 || ""),
            random1: String(snapshot.random1 || ""),
            random2: String(snapshot.random2 || ""),
            random3: String(snapshot.random3 || ""),
            random4: String(snapshot.random4 || ""),
          };
        }

        normalizeIntextDiagnosticTargetingValue(value) {
          if (Array.isArray(value)) return value.length ? String(value[0]) : null;
          if (value === undefined || value === null || value === "") return null;
          return String(value);
        }

        getIntextRandomConsistencyDiagnostics(context = "manager-decision", navIndex = 0) {
          const snapshot = this.intextRandomSnapshot;
          let slotConsistency = "slots-not-present";
          let slotsFound = 0;
          let slotsChecked = 0;
          const mismatchSlotIds = [];
          const unresolvedSlotIds = [];
          try {
            const slots = googletag?.pubads?.().getSlots?.() || [];
            const normalSlots = slots.filter((slot) => {
              const id = String(slot?.getSlotElementId?.() || "");
              return id && !id.startsWith("gexp-intext");
            });
            slotsFound = normalSlots.length;
            normalSlots.forEach((slot) => {
              const slotId = String(slot.getSlotElementId?.() || "unknown");
              const position = this.normalizeIntextDiagnosticTargetingValue(slot.getTargeting?.("p")) || "unknown";
              const observed = {};
              INTEXT_RANDOM_KEYS.forEach((key) => {
                observed[key] = this.normalizeIntextDiagnosticTargetingValue(slot.getTargeting?.(key));
              });
              const ready = INTEXT_RANDOM_KEYS.every((key) => {
                const value = observed[key];
                return value !== null && /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 20;
              });
              if (!ready) {
                unresolvedSlotIds.push(slotId);
                return;
              }
              slotsChecked += 1;
              const matches = INTEXT_RANDOM_KEYS.every((key) => observed[key] === String(snapshot?.[key] || ""));
              if (!matches) {
                mismatchSlotIds.push(slotId);
                this.registerIntextDiagnosticEvent({
                  diagnosticKey: `normal-slot-random-mismatch:${slotId}:${context}`,
                  "gexp-intext-diagnostic-context": context,
                  "gexp-intext-reference-slot-id": slotId,
                  "gexp-intext-reference-slot-position": position,
                  "gexp-intext-random-expected": JSON.stringify(INTEXT_RANDOM_KEYS.reduce((acc, key) => ({ ...acc, [key]: snapshot?.[key] }), {})),
                  "gexp-intext-random-observed": JSON.stringify(observed),
                  navIndex: String(Number(navIndex) || 0),
                  timestamp: String(Date.now()),
                });
              }
            });
            if (slotsFound > 0 && slotsChecked === 0) slotConsistency = "slots-not-ready";
            else if (slotsChecked > 0) slotConsistency = mismatchSlotIds.length ? "false" : "true";
          } catch (e) {}
          return {
            "gexp-intext-random-consistency-slots": slotConsistency,
            "gexp-intext-random-slots-found": String(slotsFound),
            "gexp-intext-random-slots-checked": String(slotsChecked),
            "gexp-intext-random-slots-unresolved-count": String(unresolvedSlotIds.length),
            "gexp-intext-random-slots-mismatch-count": String(mismatchSlotIds.length),
            "gexp-intext-random-mismatch-slot-ids": mismatchSlotIds.length ? mismatchSlotIds.join(",") : "none",
            "gexp-intext-random-unresolved-slot-ids": unresolvedSlotIds.length ? unresolvedSlotIds.join(",") : "none",
          };
        }

        filterIntextSyntheticEvent(event = {}) {
          // This allowlist filters only the Intext-specific synthetic payload
          // before registerImpression(). StatsGatherer.registerRow() may later
          // append its common data and DataLayer properties to the stored row.
          if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
            return { ...event };
          }
          const filtered = {};
          Object.keys(event || {}).forEach((key) => {
            if (INTEXT_TELEMETRY_STANDARD_FIELDS.includes(key)) filtered[key] = event[key];
          });
          return filtered;
        }

        registerIntextSyntheticEvent(eventType, payload = {}, dedupeKey = null) {
          if (!this.gexp?.registerImpression) return false;
          const eventKey = dedupeKey || `${eventType}:${payload["gexp-intext-opportunity-id"] || this.createIntextTelemetryId("event")}`;
          if (this._intextSyntheticEventKeys.has(eventKey)) return false;
          this._intextSyntheticEventKeys.add(eventKey);
          if (this._intextTelemetrySampled !== true) return false;
          const navIndex = Number(payload.navIndex) || 0;
          const identity = this.captureIntextContentIdentity(navIndex, payload.rootElement || null, payload.scopedContext || null);
          const optionalPvid = this.resolveOptionalIntextSlotPvid(payload.rootElement || null, payload.scopedContext || null);
          const event = {
            ...payload,
            navIndex: String(navIndex),
            domain: this.getHostnameNormalized(this.siteContext?.site),
            contentType: String(payload.contentType || this.siteContext?.contentType || "unknown"),
            "gexp-intext-telemetry-sampled": "true",
            "gexp-intext-telemetry-event-type": eventType,
            "gexp-intext-page-instance-id": this._intextPageInstanceId,
            "gexp-intext-content-id": identity.id,
            "gexp-intext-content-id-source": identity.source,
            country: this.resolveIntextCountry(),
            timestamp: String(Date.now()),
            tlm_rid: this.createIntextTelemetryId(eventType),
            ...this.getIntextRandomTelemetry(),
          };
          delete event.rootElement;
          delete event.scopedContext;
          delete event.be_page_newsID;
          delete event.pvid;
          delete event["gexp-intext-reference-slot-pvid"];
          if (identity.resolved && identity.newsId) event.be_page_newsID = identity.newsId;
          if (optionalPvid) {
            event.pvid = optionalPvid;
            event["gexp-intext-reference-slot-pvid"] = optionalPvid;
          }
          if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
            const unknownFields = Object.keys(event).filter((key) =>
              key.startsWith("gexp-intext-") && !INTEXT_TELEMETRY_STANDARD_FIELDS.includes(key)
            );
            if (unknownFields.length) {
              warnIntext(`[IntextManager] intext_telemetry_fields_outside_standard_allowlist`, unknownFields);
            }
          }
          this.gexp.registerImpression(this.filterIntextSyntheticEvent(event));
          return true;
        }

        registerIntextManagerDecision({ navIndex = 0, scope = "initial", decision, reason, contentType = null, rootElement = null, scopedContext = null, placement = null } = {}) {
          const normalizedNavIndex = Number(navIndex) || 0;
          const identity = this.captureIntextContentIdentity(normalizedNavIndex, rootElement, scopedContext);
          const opportunityContent = identity.resolved ? identity.id : "unknown-news";
          const opportunityId = `${this._intextPageInstanceId}:${opportunityContent}:${normalizedNavIndex}`;
          const dedupeKey = `${opportunityId}:manager-decision`;
          if (this._intextOpportunityDecisionKeys.has(dedupeKey)) return false;
          this._intextOpportunityDecisionKeys.add(dedupeKey);
          const managerEventId = `${opportunityId}:manager-decision`;
          return this.registerIntextSyntheticEvent("manager-decision", {
            "gexp-intext-opportunity-id": opportunityId,
            "gexp-intext-manager-event-id": managerEventId,
            "gexp-intext-decision": String(decision || "blocked"),
            "gexp-intext-decision-reason": String(reason || "random-slot-unresolved"),
            "gexp-intext-decision-scope": String(scope),
            navIndex: String(normalizedNavIndex),
            contentType: String(contentType || this.siteContext?.contentType || "unknown"),
            ...(placement ? {
              "gexp-intext-placement-result": String(placement.result || "creation-error"),
              "gexp-intext-placements-found": String(placement.found ?? 0),
              "gexp-intext-placements-created": String(placement.created ?? 0),
            } : {}),
            ...this.getFallbackBlankControlTelemetry(),
            "gexp-intext-fallback-blank-control-blocked": reason === "fallback-blank-cookie" ? "true" : "false",
            "gexp-intext-fallback-blank-control-source": "manager-decision",
            "gexp-intext-fallback-blank-control-reason": reason === "fallback-blank-cookie" ? "fallback-blank-cookie" : "not-applicable",
            ...this.getIntextRandomConsistencyDiagnostics(`manager-decision:${scope}:${navIndex}`, normalizedNavIndex),
            rootElement,
            scopedContext,
          }, dedupeKey);
        }

        registerIntextDiagnosticEvent({ diagnosticKey = "unknown", ...payload } = {}) {
          return this.registerIntextSyntheticEvent("diagnostic", {
            "gexp-intext-diagnostic-key": String(diagnosticKey),
            ...payload,
          }, `diagnostic:${diagnosticKey}`);
        }

        registerIntextFallbackBlankEvent(payload = {}, dedupeKey = null) {
          return this.registerIntextSyntheticEvent("fallback-blank", payload, dedupeKey);
        }

        extractStaticAdUnitPath() {
          const devPath = window.GEXP_DEV_CONFIG?.intextSites?.default?.general?.display?.adUnitPath;
          if (devPath) return devPath;
          if (typeof data !== "undefined" && data?.adSlots?.[0]?.adUnit) return data.adSlots[0].adUnit;
          if (typeof ueDFPData !== "undefined" && ueDFPData?.adSlots?.[0]?.adUnit) return ueDFPData.adSlots[0].adUnit;
          return this.config?.adUnit || "";
        }

        normalizeIntextNetworkId(value) {
          const normalized = String(value ?? "").trim();
          return /^\d{3,20}$/.test(normalized) ? normalized : null;
        }

        normalizeIntextAdUnitPath(value, networkId = null) {
          const parts = String(value ?? "").trim().replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
          const embeddedNetworkId = this.normalizeIntextNetworkId(parts[0]);
          if (embeddedNetworkId) {
            parts.shift();
            if (networkId && embeddedNetworkId !== String(networkId)) {
              const payload = {
                source: "mismatched-network-prefix",
                embeddedNetworkId,
                requestNetworkId: String(networkId),
                normalizedAdUnitPath: parts.join("/"),
              };
              this.recordIntextNetworkDebug(
                "intext_adunit_network_prefix_normalized",
                payload,
              );
              logIntext(
                "[IntextManager] intext_adunit_network_prefix_normalized",
                payload,
              );
            }
          }
          return parts.join("/");
        }

        getIntextGamConfig() {
          return this.siteConfig?.gam || this.baseSiteConfig?.gam || {};
        }

        recordIntextNetworkDebug(metric, payload = {}) {
          if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
            intextDebugCollector.recordMetric(metric, {
              manager: this,
              source: payload.source || this.networkIdResolutionSource,
              ...payload,
            });
          }
        }

        resolveScopedDetectedNetworkId(scopedContext = null) {
          const hasDetectedProperty = Object.prototype.hasOwnProperty.call(
            scopedContext || {},
            "detectedNetworkId",
          );
          return this.normalizeIntextNetworkId(
            hasDetectedProperty
              ? scopedContext.detectedNetworkId
              : scopedContext?.networkId,
          );
        }

        resolveIntextNetworkResolution(scopedContext = null) {
          const gamConfig = this.getIntextGamConfig();
          const mode = gamConfig.networkIdMode === "force" ? "force" : "auto";
          const configured = this.normalizeIntextNetworkId(gamConfig.networkId);
          const legacy = this.normalizeIntextNetworkId(this.config?.networkId);
          const configuredNetworkId = configured || legacy || null;
          const scopedDetectedNetworkId =
            this.resolveScopedDetectedNetworkId(scopedContext);
          const pageDetectedNetworkId =
            this.normalizeIntextNetworkId(this.detectedNetworkId);
          let requestNetworkId = null;
          let source = "unresolved";

          if (mode === "force") {
            requestNetworkId = configured || legacy;
            source = configured ? "gam-config-forced" : legacy ? "legacy-config-forced" : "force-invalid";
          } else if (scopedDetectedNetworkId) {
            requestNetworkId = scopedDetectedNetworkId;
            source = "scoped-gpt-detected";
          } else if (pageDetectedNetworkId) {
            requestNetworkId = pageDetectedNetworkId;
            source = "page-gpt-detected";
          } else if (configured) {
            requestNetworkId = configured;
            source = "gam-config";
          } else if (legacy) {
            requestNetworkId = legacy;
            source = "legacy-config";
          } else {
            requestNetworkId = "99071977";
            source = "default";
          }

          return {
            mode,
            requestNetworkId,
            configuredNetworkId,
            scopedDetectedNetworkId,
            pageDetectedNetworkId,
            detectedNetworkId:
              scopedDetectedNetworkId || pageDetectedNetworkId || null,
            source,
            forced: mode === "force",
            valid: Boolean(requestNetworkId),
          };
        }

        resolveIntextRequestNetworkId(scopedContext = null) {
          const resolution =
            this.resolveIntextNetworkResolution(scopedContext);
          const {
            mode,
            requestNetworkId,
            configuredNetworkId,
            scopedDetectedNetworkId,
            detectedNetworkId,
            source,
          } = resolution;

          this.configuredNetworkId = configuredNetworkId;
          this.requestNetworkId = requestNetworkId;
          this.networkId = requestNetworkId;
          this.networkIdResolutionSource = source;
          if (
            mode === "force" &&
            scopedDetectedNetworkId &&
            requestNetworkId &&
            scopedDetectedNetworkId !== requestNetworkId
          ) {
            this.recordIntextNetworkDebug("intext_network_scoped_ignored", {
              source,
              scopedNetworkId: scopedDetectedNetworkId,
              requestNetworkId,
            });
          }
          if (!resolution.valid) {
            logIntext("[IntextManager] intext_network_force_invalid");
            this.recordIntextNetworkDebug("intext_network_force_invalid", {
              source,
              configuredNetworkId:
                this.getIntextGamConfig().networkId ?? null,
              legacyNetworkId: this.config?.networkId ?? null,
            });
            this.registerIntextDiagnosticEvent?.({
              diagnosticKey: "intext-network-force-invalid",
              "gexp-intext-decision": "blocked",
              "gexp-intext-decision-reason": "intext-network-force-invalid",
            });
            return null;
          }
          const debugMetric = mode === "force" ? "intext_network_forced" : "intext_network_resolved";
          this.recordIntextNetworkDebug(debugMetric, {
            source,
            mode,
            configuredNetworkId,
            detectedNetworkId,
            requestNetworkId,
          });
          logIntext(`[IntextManager] ${debugMetric}`, {
            mode,
            source,
            configuredNetworkId,
            detectedNetworkId,
            requestNetworkId,
          });
          return requestNetworkId;
        }

        getIntextNetworkTelemetry(scopedContext = null) {
          const resolution =
            this.resolveIntextNetworkResolution(scopedContext);
          return {
            "gexp-intext-network-id-mode": resolution.mode,
            "gexp-intext-network-id-configured": String(
              resolution.configuredNetworkId || "none",
            ),
            "gexp-intext-network-id-detected": String(
              resolution.detectedNetworkId || "none",
            ),
            "gexp-intext-network-id-request": String(
              resolution.requestNetworkId || "none",
            ),
            "gexp-intext-network-id-source": String(resolution.source),
            "gexp-intext-network-id-forced":
              resolution.forced ? "true" : "false",
          };
        }

        getIntextNetworkOverride(networkId = this.requestNetworkId) {
          if (!networkId) return null;
          return this.baseSiteConfig?.networks?.[networkId] || this.siteConfig?.networks?.[networkId] || null;
        }

        resolveIntextDisplayAdUnitPath(scopedContext = null) {
          const requestNetworkId = this.resolveIntextRequestNetworkId(scopedContext);
          if (!requestNetworkId) return null;
          const gamConfig = this.getIntextGamConfig();
          const networkOverride = this.getIntextNetworkOverride(requestNetworkId);
          const resolved =
            this.normalizeIntextAdUnitPath(gamConfig.displayAdUnitPath, requestNetworkId) ||
            this.normalizeIntextAdUnitPath(networkOverride?.display?.adUnitPath, requestNetworkId) ||
            this.normalizeIntextAdUnitPath(
              scopedContext?.detectedAdUnitPath ?? scopedContext?.adUnitPath,
              requestNetworkId,
            ) ||
            this.normalizeIntextAdUnitPath(this.detectedAdUnitPath, requestNetworkId) ||
            this.normalizeIntextAdUnitPath(this.adUnitPath, requestNetworkId) ||
            this.normalizeIntextAdUnitPath(this.siteConfig?.display?.adUnitPath, requestNetworkId);
          return resolved || null;
        }

        resolveIntextVideoAdUnitPath(scopedContext = null) {
          const requestNetworkId = this.resolveIntextRequestNetworkId(scopedContext);
          if (!requestNetworkId) return null;
          const gamConfig = this.getIntextGamConfig();
          const networkOverride = this.getIntextNetworkOverride(requestNetworkId);
          const configured =
            this.normalizeIntextAdUnitPath(gamConfig.videoAdUnitPath, requestNetworkId) ||
            this.normalizeIntextAdUnitPath(networkOverride?.video?.adUnitPath, requestNetworkId);
          if (configured) return configured;
          const displayPath = this.resolveIntextDisplayAdUnitPath(scopedContext);
          if (!displayPath) return null;
          const parts = displayPath.split("/").filter(Boolean);
          if (parts.length) parts[parts.length - 1] = "video-intext";
          return parts.join("/") || null;
        }
        
        resolveAdUnit() {
          let source = "config_fallback";
          let resolvedPath = this.adUnitPath;
          let resolvedNetworkId = null;

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
            warnIntextAlways("[IntextManager] GPT slot resolution failed, using static fallback", e);
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

          this.detectedAdUnitPath = this.normalizeIntextAdUnitPath(resolvedPath, resolvedNetworkId);
          this.detectedNetworkId = this.normalizeIntextNetworkId(resolvedNetworkId);
          const requestNetworkId = this.resolveIntextRequestNetworkId();
          if (!requestNetworkId) return false;
          this.adUnitPath =
            this.resolveIntextDisplayAdUnitPath() ||
            this.detectedAdUnitPath ||
            this.normalizeIntextAdUnitPath(this.siteConfig?.display?.adUnitPath, requestNetworkId) ||
            "";
          this.networkId = requestNetworkId;

          const KNOWN_NETWORKS = {
            "99071977": "Unidad Editorial",
            "21626337071": "Hispanic Exchange (LATAM)"
          };
          const networkName = KNOWN_NETWORKS[this.networkId] || "Unknown";

          logIntext(`[IntextManager] AdUnit resolved: ${this.adUnitPath} (source: ${source})`);
          logIntext(`[IntextManager] Network: ${networkName} (${this.networkId})`);

          const networkOverrides = this.getIntextNetworkOverride(this.requestNetworkId);
          if (networkOverrides) {
            this.siteConfig = IntextManager.deepMerge(this.siteConfig, networkOverrides);
            logIntext(`[IntextManager] Applied network overrides for ${networkName} (${this.networkId})`);
          }
          this.adUnitPath = this.resolveIntextDisplayAdUnitPath() || this.adUnitPath;
          return true;
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
          const root = rootElement || document;
          if (rootElement) {
            const attrType =
              rootElement.getAttribute?.("data-content-type") ||
              rootElement.dataset?.contentType ||
              rootElement.getAttribute?.("data-ue-content-type") ||
              null;
            if (attrType) {
              return IntextManager.CONTENT_TYPE_MAP[attrType] || attrType;
            }
            if (root.querySelector('.ue-c-streamlive__body')) return 'directo';
            if (root.querySelector('.ue-c-article__body')) return 'noticia';
          }

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

        readIntextQaCookieOverride() {
          const disabled = {
            enabled: false,
            forceRawValue: null,
            random1: "none",
            random1Value: null,
            random1RawValue: null,
            defaultForced: false,
            invalidRandom1Value: null,
            forceExclusions: false,
            forceExclusionsRawValue: null,
          };

          try {
            if (typeof document === "undefined" || typeof document.cookie !== "string") return disabled;
            const cookies = {};
            document.cookie.split(";").forEach((part) => {
              const eqIndex = part.indexOf("=");
              if (eqIndex < 0) return;
              const name = part.slice(0, eqIndex).trim();
              if (!name) return;
              const rawValue = part.slice(eqIndex + 1).trim();
              try {
                cookies[decodeURIComponent(name)] = decodeURIComponent(rawValue);
              } catch (e) {
                cookies[name] = rawValue;
              }
            });

            const forceRawValue = cookies.gexp_intext_force ?? null;
            const forceValue = String(forceRawValue || "").trim().toLowerCase();
            const enabled = ["1", "true", "yes"].includes(forceValue);
            const random1RawValue = cookies.gexp_intext_force_random1 ?? null;
            const normalizedRandom1 = String(random1RawValue || "").trim().toLowerCase();
            const validRandom1Values = ["5", "6", "7", "8", "9", "10"];
            const defaultForced = normalizedRandom1 === "default";
            const random1Value = validRandom1Values.includes(normalizedRandom1)
              ? normalizedRandom1
              : null;
            const invalidRandom1Value = normalizedRandom1 && !random1Value && !defaultForced
              ? normalizedRandom1
              : null;
            const forceExclusionsRawValue = cookies.gexp_intext_force_exclusions ?? null;
            const forceExclusionsValue = String(forceExclusionsRawValue || "").trim().toLowerCase();
            const forceExclusions = enabled && ["1", "true", "yes"].includes(forceExclusionsValue);
            const override = {
              enabled,
              forceRawValue,
              random1: random1Value || (defaultForced ? "default" : "none"),
              random1Value,
              random1RawValue,
              defaultForced,
              invalidRandom1Value,
              forceExclusions,
              forceExclusionsRawValue,
            };

            if (forceRawValue !== null || random1RawValue !== null || forceExclusionsRawValue !== null) {
              logIntext(`[IntextManager] intext_qa_cookie_override_detected`, {
                enabled,
                random1: override.random1,
                forceExclusions,
              });
            }
            if (invalidRandom1Value) {
              logIntext(`[IntextManager] intext_qa_cookie_override_invalid`, {
                cookie: "gexp_intext_force_random1",
                value: invalidRandom1Value,
              });
            }
            if (forceExclusions) {
              logIntext(`[IntextManager] intext_qa_cookie_exclusions_bypass_detected`, {
                disableSlotsBypass: true,
              });
            }
            return override;
          } catch (e) {
            return disabled;
          }
        }

        getFallbackBlankControlConfig() {
          return this.siteConfig?.fallbackBlankControl || {};
        }

        getEndOfDayDate() {
          const end = new Date();
          end.setHours(23, 59, 59, 999);
          return end;
        }

        getFallbackBlankExpiryMs() {
          const cfg = this.getFallbackBlankControlConfig();
          if (cfg.expireAtEndOfDay !== false) return this.getEndOfDayDate().getTime();
          const ttlMs = Number(cfg.ttlMs);
          if (Number.isFinite(ttlMs) && ttlMs > 0) return Date.now() + ttlMs;
          const maxAgeSeconds = Number(cfg.cookieMaxAgeSeconds);
          if (Number.isFinite(maxAgeSeconds) && maxAgeSeconds > 0) return Date.now() + (maxAgeSeconds * 1000);
          return this.getEndOfDayDate().getTime();
        }

        readFallbackBlankCounter() {
          const cfg = this.getFallbackBlankControlConfig();
          const key = cfg.counterStorageKey || "gexp_intext_fallback_blank_count";
          const empty = { count: 0, expiresAt: this.getFallbackBlankExpiryMs(), updatedAt: 0 };
          try {
            if (typeof window === "undefined" || !window.localStorage) return empty;
            const raw = window.localStorage.getItem(key);
            if (!raw) return empty;
            const parsed = JSON.parse(raw);
            const expiresAt = Number(parsed?.expiresAt) || 0;
            if (!Number.isFinite(expiresAt) || expiresAt <= 0 || Date.now() > expiresAt) {
              window.localStorage.removeItem(key);
              return empty;
            }
            return {
              count: Number(parsed?.count) || 0,
              expiresAt: expiresAt || empty.expiresAt,
              updatedAt: Number(parsed?.updatedAt) || 0,
            };
          } catch (e) {
            try { window.localStorage.removeItem(key); } catch (removeErr) {}
            this.registerIntextDiagnosticEvent?.({
              diagnosticKey: "fallback-blank-counter-read-failed",
              "gexp-intext-diagnostic-context": String(e?.message || e || "storage-read-failed"),
            });
            return empty;
          }
        }

        writeFallbackBlankCounter(count) {
          const cfg = this.getFallbackBlankControlConfig();
          const key = cfg.counterStorageKey || "gexp_intext_fallback_blank_count";
          const payload = {
            count: Number(count) || 0,
            expiresAt: this.getFallbackBlankExpiryMs(),
            updatedAt: Date.now(),
          };
          try {
            if (typeof window !== "undefined" && window.localStorage) {
              window.localStorage.setItem(key, JSON.stringify(payload));
            }
          } catch (e) {
            this.registerIntextDiagnosticEvent?.({
              diagnosticKey: "fallback-blank-counter-write-failed",
              "gexp-intext-diagnostic-context": String(e?.message || e || "storage-write-failed"),
            });
          }
          return payload;
        }

        incrementFallbackBlankCounter() {
          const counter = this.readFallbackBlankCounter();
          const next = this.writeFallbackBlankCounter((Number(counter.count) || 0) + 1);
          const threshold = Number(this.getFallbackBlankControlConfig().threshold ?? 1);
          const thresholdReached = threshold > 0 && next.count >= threshold;
          const cookieWrite = thresholdReached
            ? this.setTeadsBlockCookie(next.expiresAt)
            : { attempted: false, confirmed: false, error: null, expiresAt: next.expiresAt };
          if (cookieWrite.attempted && !cookieWrite.confirmed) {
            this.registerIntextDiagnosticEvent({
              diagnosticKey: `fallback-blank-cookie-write-failed:${next.updatedAt}`,
              "gexp-intext-fallback-blank-control-cookie-set-attempted": "true",
              "gexp-intext-fallback-blank-control-cookie-set-confirmed": "false",
              "gexp-intext-fallback-blank-control-cookie-set-error": String(cookieWrite.error || "cookie-not-confirmed"),
            });
          }
          return {
            count: next.count,
            expiresAt: next.expiresAt,
            updatedAt: next.updatedAt,
            counterBefore: Number(counter.count) || 0,
            counterAfter: Number(next.count) || 0,
            thresholdReached,
            cookieWrite,
          };
        }

        setTeadsBlockCookie(requestedExpiresAt = null) {
          const cfg = this.getFallbackBlankControlConfig();
          const name = cfg.blockCookieName || "gexp_intext_teads_block";
          const expiresAt = Number(requestedExpiresAt) > Date.now()
            ? Number(requestedExpiresAt)
            : this.getFallbackBlankExpiryMs();
          const result = { attempted: true, confirmed: false, error: null, expiresAt };
          try {
            if (typeof document === "undefined") {
              result.error = "document-unavailable";
              return result;
            }
            const expires = new Date(expiresAt).toUTCString();
            document.cookie = `${encodeURIComponent(name)}=1; expires=${expires}; path=/; SameSite=Lax`;
            result.confirmed = this.hasTeadsBlockCookie();
            if (!result.confirmed) result.error = "cookie-not-confirmed";
          } catch (e) {
            result.error = e?.message || String(e);
          }
          return result;
        }

        hasTeadsBlockCookie() {
          const cfg = this.getFallbackBlankControlConfig();
          const name = cfg.blockCookieName || "gexp_intext_teads_block";
          try {
            if (typeof document === "undefined" || typeof document.cookie !== "string") return false;
            return document.cookie
              .split(";")
              .some((part) => {
                const eqIndex = part.indexOf("=");
                const cookieName = (eqIndex >= 0 ? part.slice(0, eqIndex) : part).trim();
                const cookieValue = eqIndex >= 0 ? part.slice(eqIndex + 1).trim() : "";
                return decodeURIComponent(cookieName) === name && decodeURIComponent(cookieValue) === "1";
              });
          } catch (e) {
            return false;
          }
        }

        shouldBlockIntextByFallbackBlankControl() {
          const cfg = this.getFallbackBlankControlConfig();
          if (cfg.enabled !== true) return false;
          return this.hasTeadsBlockCookie();
        }

        getFallbackBlankControlTelemetry(extra = {}) {
          const cfg = this.getFallbackBlankControlConfig();
          const counter = this.readFallbackBlankCounter();
          const hasCookie = this.hasTeadsBlockCookie();
          return {
            "gexp-intext-fallback-blank-control-enabled": cfg.enabled === true ? "true" : "false",
            "gexp-intext-fallback-blank-control-threshold": String(cfg.threshold ?? 1),
            "gexp-intext-fallback-blank-control-cookie": hasCookie ? "true" : "false",
            "gexp-intext-fallback-blank-control-count": String(counter.count || 0),
            "gexp-intext-fallback-blank-control-counted": "false",
            "gexp-intext-fallback-blank-control-source": "baseline",
            "gexp-intext-fallback-blank-control-reason": "baseline",
            "gexp-intext-fallback-blank-control-cookie-set": "false",
            "gexp-intext-fallback-blank-control-cookie-set-attempted": "false",
            "gexp-intext-fallback-blank-control-cookie-set-confirmed": "false",
            "gexp-intext-fallback-blank-control-cookie-set-error": "none",
            "gexp-intext-fallback-blank-control-counter-before": String(counter.count || 0),
            "gexp-intext-fallback-blank-control-counter-after": String(counter.count || 0),
            "gexp-intext-fallback-blank-control-threshold-reached": "false",
            ...extra,
          };
        }

        markIntextQaCookieApplied() {
          if (this.intextQaCookieOverride?.enabled) {
            this._intextQaCookieApplied = true;
          }
        }

        isIntextQaExclusionsBypassEnabled() {
          return this.intextQaCookieOverride?.enabled === true
            && this.intextQaCookieOverride?.forceExclusions === true;
        }

        markIntextQaExclusionsBypassApplied(source = "unknown") {
          if (!this.isIntextQaExclusionsBypassEnabled()) return;
          this.markIntextQaCookieApplied();
          this._intextQaCookieExclusionsBypassed = true;
          this._intextQaCookieExclusionsBypassSource = String(source || "unknown");
          logIntext(`[IntextManager] intext_qa_cookie_exclusions_bypass_applied`, {
            source: this._intextQaCookieExclusionsBypassSource,
            disableSlotsBypass: true,
          });
        }

        getIntextQaCookieTelemetry(applied = this._intextQaCookieApplied) {
          const override = this.intextQaCookieOverride || {};
          return {
            "gexp-intext-qa-cookie-enabled": override.enabled ? "true" : "false",
            "gexp-intext-qa-cookie-random1": String(
              override.random1Value || (override.defaultForced ? "default" : "none"),
            ),
            "gexp-intext-qa-cookie-applied": applied ? "true" : "false",
            "gexp-intext-qa-inclusion-forced": this._intextQaInclusionForced === true ? "true" : "false",
            "gexp-intext-qa-original-random1": String(this.getIntextRandomValue("random1") || "unresolved"),
            "gexp-intext-qa-cookie-force-exclusions": override.forceExclusions ? "true" : "false",
            "gexp-intext-qa-cookie-exclusions-bypassed":
              this._intextQaCookieExclusionsBypassed === true ? "true" : "false",
            "gexp-intext-qa-cookie-exclusions-bypass-source": String(
              this._intextQaCookieExclusionsBypassSource || "none",
            ),
          };
        }

        parseIntextRootMarginPx(rootMargin) {
          const firstValue = String(rootMargin || "").trim().split(/\s+/)[0];
          const parsed = parseFloat(firstValue);
          return Number.isFinite(parsed) ? parsed : null;
        }

        normalizeIntextLoadingConfig(loadingConfig = {}) {
          const normalized = JSON.parse(JSON.stringify(loadingConfig || {}));
          delete normalized._legacyRootMarginUsed;
          const defaultRenderRootMargin = "250px 0px";
          const defaultMaxFetchToRenderMs = 8000;
          const legacyRootMarginUsed = !normalized.renderRootMargin && !!normalized.rootMargin;
          const renderRootMargin = normalized.renderRootMargin || normalized.rootMargin || defaultRenderRootMargin;
          const derivedFetchRootMargin = normalized.derivedFetchRootMargin;
          normalized.renderRootMargin = renderRootMargin;
          normalized.fetchRootMargin = normalized.fetchRootMargin || derivedFetchRootMargin || renderRootMargin;
          normalized.maxFetchToRenderMs = normalized.maxFetchToRenderMs ?? defaultMaxFetchToRenderMs;

          const fetchPx = this.parseIntextRootMarginPx(normalized.fetchRootMargin);
          const renderPx = this.parseIntextRootMarginPx(normalized.renderRootMargin);
          if (fetchPx !== null && renderPx !== null && fetchPx < renderPx) {
            normalized.fetchRootMargin = normalized.renderRootMargin;
          }

          if (legacyRootMarginUsed) {
            normalized._legacyRootMarginUsed = true;
          }

          return normalized;
        }

        resolveLoadingExperimentsConfig(resolvedConfig, context = null) {
          const candidates = [
            { source: "resolvedConfig", config: resolvedConfig },
            { source: "scopedConfig", config: context?.siteConfig },
            { source: "manager.siteConfig", config: this.siteConfig },
            { source: "baseSiteConfig", config: this.baseSiteConfig },
          ];

          for (const candidate of candidates) {
            if (candidate.config?.loadingExperiments) {
              return {
                experiments: candidate.config.loadingExperiments,
                source: candidate.source,
              };
            }
          }

          return { experiments: null, source: "fallback" };
        }

        readIntextLoadingExperimentKeyResolution(key, context = null) {
          const snapshotValue = this.getIntextRandomValue(key);
          if (INTEXT_RANDOM_KEYS.includes(String(key))) {
            return snapshotValue !== null
              ? { value: snapshotValue, source: "gexp-slot-random-snapshot" }
              : { value: null, source: "random-snapshot-unresolved" };
          }
          const readFromMap = (map) => {
            if (!map || typeof map !== "object") return null;
            const value = map[key];
            if (Array.isArray(value)) return value.length > 0 ? String(value[0]) : null;
            if (value !== null && value !== undefined && value !== "") return String(value);
            return null;
          };

          try {
            const directValue = this.getPageCustomTargeting?.(key);
            if (!directValue || typeof directValue !== "object") {
              const normalized = Array.isArray(directValue)
                ? (directValue.length > 0 ? String(directValue[0]) : null)
                : (directValue !== null && directValue !== undefined && directValue !== "" ? String(directValue) : null);
              if (normalized !== null) {
                return { value: normalized, source: "manager.getPageCustomTargeting(key)" };
              }
            }
          } catch (e) {}

          const scopedValue = readFromMap(context?.targeting);
          if (scopedValue !== null) return { value: scopedValue, source: "scopedContext.targeting" };

          const pageValue = readFromMap(this.getPageCustomTargeting(context));
          if (pageValue !== null) return { value: pageValue, source: "manager.getPageCustomTargeting(context)" };

          const managerPageValue = readFromMap(this.pageTargeting);
          if (managerPageValue !== null) return { value: managerPageValue, source: "manager.pageTargeting" };

          const randomMatch = String(key || "").match(/^random([1-4])$/);
          if (randomMatch) {
            try {
              const random = this.gexp?.getRandom?.(Number(randomMatch[1]));
              if (random !== null && random !== undefined && random !== "") {
                return { value: String(random), source: "gexp.getRandom(fallback)" };
              }
            } catch (e) {}
          }

          return { value: null, source: "unresolved" };
        }

        getEffectiveIntextTargetingResolution(key, context = null) {
          const original = this.readIntextLoadingExperimentKeyResolution(key, context);
          const override = this.intextQaCookieOverride || {};
          if (String(key) === "random1" && override.enabled === true) {
            if (override.random1Value) {
              this.markIntextQaCookieApplied();
              logIntext(`[IntextManager] intext_qa_cookie_random1_applied`, {
                value: override.random1Value,
                originalValue: original.value,
              });
              return {
                value: override.random1Value,
                source: "qa-cookie",
                originalValue: original.value,
                qaCookieApplied: true,
                qaCookieDefault: false,
              };
            }
            if (override.defaultForced === true) {
              this.markIntextQaCookieApplied();
              logIntext(`[IntextManager] intext_qa_cookie_default_applied`, {
                originalValue: original.value,
              });
              return {
                ...original,
                source: "qa-cookie-default",
                originalValue: original.value,
                qaCookieApplied: true,
                qaCookieDefault: true,
              };
            }
          }
          return {
            ...original,
            originalValue: original.value,
            qaCookieApplied: false,
            qaCookieDefault: false,
          };
        }

        readIntextLoadingExperimentKey(key, context = null) {
          return this.getEffectiveIntextTargetingResolution(key, context).value;
        }

        normalizeIntextLoadingSlotId(slotId) {
          const raw = String(slotId || "").replace(/-video$/, "");
          if (raw.indexOf("-pnc") !== -1 || raw === "pnc") return "pnc";
          const match = raw.match(/^(gexp-intext(?:-\d+)?)/);
          return match ? match[1] : raw;
        }

        resolveLoadingConfig(slotId, resolvedConfig, context = null) {
          const experimentResolution = this.resolveLoadingExperimentsConfig(resolvedConfig, context);
          const experiments = experimentResolution.experiments;
          const managerBaseLoading = context?.siteConfig?.loading || this.siteConfig?.loading || this.baseSiteConfig?.loading;
          const defaultLoading = {
            fetchRootMargin: "250px 0px",
            renderRootMargin: "250px 0px",
            maxDelayMs: 1500,
            maxFetchToRenderMs: 8000,
          };
          const baseLoading = managerBaseLoading || defaultLoading;
          const nodeLoading = resolvedConfig?.loading;
          const mergedLoading = nodeLoading
            ? IntextManager.deepMerge(baseLoading, nodeLoading)
            : baseLoading;
          let loadingConfig = this.normalizeIntextLoadingConfig(mergedLoading);
          const key = experiments?.key || "random1";
          const keyResolution = this.getEffectiveIntextTargetingResolution(key, context);
          const keyValue = keyResolution.value || "";
          const keySource = keyResolution.source || "unresolved";
          let variantName = "default";
          let experimentResolved = false;
          let fallbackReason = "none";
          const lookupId = this.normalizeIntextLoadingSlotId(slotId);
          const qaCookieLoadingDefault = keyResolution.qaCookieDefault === true;
          const qaCookieLoadingApplied = keyResolution.qaCookieApplied === true;

          logIntext(`[IntextManager] loading_experiment_config_source_resolved`, {
            slotCode: slotId,
            lookupSlot: lookupId,
            source: experimentResolution.source,
            enabled: experiments?.enabled === true,
            hasExperiments: Boolean(experiments),
          });

          if (!experiments) {
            fallbackReason = "experiments-not-found";
          } else if (qaCookieLoadingDefault) {
            fallbackReason = "qa-cookie-default";
          } else if (experiments?.enabled !== true) {
            fallbackReason = "experiments-disabled";
          } else if (!keyValue) {
            fallbackReason = "key-unresolved";
          } else if (!experiments?.variants?.[keyValue]) {
            fallbackReason = "variant-not-found";
          } else {
            const variant = experiments.variants[keyValue];
            variantName = variant?.name || (key === "random1" && keyValue === "5" ? "test-b" : (key === "random1" && keyValue === "6" ? "control" : keyValue));
            const slotExperiment = variant?.slots?.[lookupId];
            if (slotExperiment?.loading) {
              loadingConfig = this.normalizeIntextLoadingConfig(
                IntextManager.deepMerge(mergedLoading, slotExperiment.loading),
              );
              experimentResolved = true;
              fallbackReason = "none";
              logIntext(`[IntextManager] loading_experiment_resolved`, {
                slotCode: slotId,
                lookupSlot: lookupId,
                random1: key === "random1" ? keyValue : undefined,
                key,
                keyValue,
                keySource,
                variant: variantName,
                fetchRootMargin: loadingConfig.fetchRootMargin,
                renderRootMargin: loadingConfig.renderRootMargin,
                maxDelayMs: loadingConfig.maxDelayMs ?? null,
                maxFetchToRenderMs: loadingConfig.maxFetchToRenderMs ?? null,
              });
            } else {
              fallbackReason = "slot-loading-not-found";
            }
          }

          if (loadingConfig._legacyRootMarginUsed) {
            logIntext(`[IntextManager] loading_legacy_rootmargin_used`, {
              slotCode: slotId,
              rootMargin: loadingConfig.rootMargin,
              renderRootMargin: loadingConfig.renderRootMargin,
            });
          }

          if (!experimentResolved) {
            logIntext(`[IntextManager] loading_experiment_fallback_to_default`, {
              slotCode: slotId,
              lookupSlot: lookupId,
              random1: key === "random1" ? keyValue : undefined,
              key,
              keyValue,
              keySource,
              variant: variantName,
              reason: fallbackReason,
            });
          }

          logIntext(`[IntextManager] loading_experiment_key_source`, {
            slotCode: slotId,
            key,
            value: keyValue,
            source: keySource,
            variant: variantName,
          });

          loadingConfig._experiment = {
            enabled: qaCookieLoadingDefault ? false : experiments?.enabled === true,
            resolved: experimentResolved,
            variant: variantName,
            key,
            keyValue,
            keySource,
            lookupSlot: lookupId,
            fallbackReason,
            experimentName: qaCookieLoadingDefault
              ? "default"
              : (experiments?.name || experiments?.experiment || experiments?.id || (experiments?.enabled === true ? "loadingExperiments" : "none")),
            configSource: experimentResolution.source,
            qaCookieEnabled: this.intextQaCookieOverride?.enabled === true,
            qaCookieApplied: qaCookieLoadingApplied,
            qaCookieRandom1: this.intextQaCookieOverride?.random1 || "none",
          };

          return loadingConfig;
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

        getHostnameNormalized(hostname = null) {
          let normalized = hostname;
          if (!normalized && typeof window !== "undefined" && window.location?.hostname) {
            normalized = window.location.hostname;
          }
          return String(normalized || "").toLowerCase().replace(/^www\./, "");
        }

        mergeRuleBlock(base, siteSpecific) {
          const hasBase = base && typeof base === "object";
          const hasSiteSpecific = siteSpecific && typeof siteSpecific === "object";
          if (!hasBase && !hasSiteSpecific) return null;
          const baseClone = hasBase ? JSON.parse(JSON.stringify(base)) : {};
          const siteClone = hasSiteSpecific ? JSON.parse(JSON.stringify(siteSpecific)) : {};
          return IntextManager.deepMerge(baseClone, siteClone);
        }

        resolveScopedRuleBlock(block, hostname = null) {
          if (!block || typeof block !== "object") return null;

          const normalizedHostname = this.getHostnameNormalized(hostname);
          const generalBlock = Object.keys(block).reduce((acc, key) => {
            if (key !== "sites") acc[key] = block[key];
            return acc;
          }, {});
          const siteSpecific =
            block.sites?.[normalizedHostname] ||
            block.sites?.[hostname] ||
            null;
          const resolved = this.mergeRuleBlock(generalBlock, siteSpecific);

          logIntext(
            `[IntextManager] scoped_rule_block_resolved - hostname=${normalizedHostname || "unknown"}, has_general=${Object.keys(generalBlock).length > 0}, has_site_specific=${Boolean(siteSpecific)}`,
          );

          return resolved;
        }

        getScopedSlotsForRoot(rootElement) {
          if (!rootElement || typeof googletag === "undefined" || !googletag.pubads || typeof googletag.pubads !== "function") {
            return [];
          }

          try {
            return googletag.pubads().getSlots().filter((slot) => {
              const slotElId = slot?.getSlotElementId?.();
              if (!slotElId || slotElId.indexOf("gexp-intext") === 0) return false;
              const slotEl = document.getElementById(slotElId);
              return Boolean(slotEl && rootElement.contains(slotEl));
            });
          } catch (e) {
            return [];
          }
        }

        getSlotTargetingMap(slot) {
          if (!slot || typeof slot.getTargetingKeys !== "function") return {};
          const targeting = {};
          try {
            slot.getTargetingKeys().forEach((key) => {
              const values = slot.getTargeting(key);
              targeting[key] = values && values.length === 1 ? values[0] : values;
            });
          } catch (e) {}
          return targeting;
        }

        resolveScopedAdContext(rootElement) {
          const scopedSlots = this.getScopedSlotsForRoot(rootElement);
          const referenceSlot =
            scopedSlots.find((slot) => {
              const fullPath = slot?.getAdUnitPath?.() || "";
              return fullPath && !/\/p_/.test(fullPath);
            }) ||
            scopedSlots[0] ||
            null;

          let detectedNetworkId = null;
          let detectedAdUnitPath = null;
          if (referenceSlot?.getAdUnitPath) {
            const fullPath = referenceSlot.getAdUnitPath();
            const parts = String(fullPath || "").replace(/^\//, "").split("/");
            if (parts.length >= 2) {
              detectedNetworkId = this.normalizeIntextNetworkId(parts[0]);
              detectedAdUnitPath = parts.slice(1).join("/").replace(/\bp_/g, "") || null;
            }
          }

          const pageTargeting = this.getPageCustomTargeting();
          const slotTargeting = this.getSlotTargetingMap(referenceSlot);
          const contentType = this.detectContentType(rootElement);
          const pageUrl =
            rootElement?.querySelector?.('link[rel="canonical"]')?.href ||
            rootElement?.dataset?.url ||
            window.location.href;
          const hostname = this.getHostnameNormalized(
            (() => {
              try {
                return new URL(pageUrl, window.location.href).hostname;
              } catch (e) {
                return this.siteContext?.site || window.location.hostname;
              }
            })(),
          );

          const scopedContext = {
            detectedNetworkId,
            detectedAdUnitPath,
            targeting: { ...(slotTargeting || {}), ...(pageTargeting || {}) },
            contentType,
            pageUrl,
            hostname,
          };
          scopedContext.networkId = this.resolveIntextRequestNetworkId(scopedContext);
          scopedContext.adUnitPath = this.resolveIntextDisplayAdUnitPath(scopedContext);

          logIntext(
            `[IntextManager:NavContinua] navcontinua_scoped_context_resolved - slots=${scopedSlots.length}, hostname=${hostname}, contentType=${contentType}, pageUrl=${pageUrl}`,
            scopedContext,
          );
          logIntext(
            `[IntextManager:NavContinua] navcontinua_scoped_adunit_resolved - networkId=${scopedContext.networkId || "missing"}, adUnitPath=${scopedContext.adUnitPath || "missing"}, source_slot=${referenceSlot?.getSlotElementId?.() || "fallback"}`,
          );

          return scopedContext;
        }

        isContentTypeAllowed(siteConfig, contentType, logPrefix = "[IntextManager]") {
          const allowedTypes = siteConfig?.allowedContentTypes || [];
          if (allowedTypes.length > 0 && !allowedTypes.includes(contentType)) {
            logIntext(
              `${logPrefix} navcontinua_content_type_blocked - contentType=${contentType}, allowed=${allowedTypes.join(",")}`,
            );
            return false;
          }
          return true;
        }

        isBlockedByExclusions(context = null) {
          if (this.isIntextQaExclusionsBypassEnabled()) {
            this.markIntextQaExclusionsBypassApplied(
              context?.navIndex > 0 ? "navcontinua-exclusions" : "exclusions",
            );
            return false;
          }
          const hostname = this.getHostnameNormalized(context?.hostname || this.siteContext?.site);
          const excl = this.resolveScopedRuleBlock(
            context?.siteConfig?.exclusions || this.siteConfig?.exclusions,
            hostname,
          );
          if (!excl) return false;

          if (excl.disableAll === true) {
            logIntext(`[IntextManager] ❌ BLOCKED by exclusions.disableAll = true`);
            return true;
          }

          if (Array.isArray(excl.adUnitPaths) && excl.adUnitPaths.length > 0) {
            const pageAdUnit = this.getPageAdUnitPath(context);
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
            const pageTargeting = this.getPageCustomTargeting(context) || {};
            if (pageTargeting) {
              for (const [key, blockedValues] of Object.entries(excl.keyValues)) {
                if (!Array.isArray(blockedValues) || blockedValues.length === 0) continue;
                const rawPageValue = this.getIntextRuleTargetingValue(key, pageTargeting);
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

        isAllowedByInclusions(context = null) {
          const hostname = this.getHostnameNormalized(context?.hostname || this.siteContext?.site);
          const inc = this.resolveScopedRuleBlock(
            context?.siteConfig?.inclusions || this.siteConfig?.inclusions,
            hostname,
          );
          if (!inc) return true;
          if (this.intextQaCookieOverride?.enabled === true) {
            this.markIntextQaCookieApplied();
            this._intextQaInclusionForced = true;
            logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
              key: "inclusions",
              forcedValue: "inclusion-only",
              originalValue: this.getIntextRandomValue("random1"),
            });
            return true;
          }

          if (inc.keyValues && typeof inc.keyValues === 'object' && Object.keys(inc.keyValues).length > 0) {
            let pageTargeting = null;
            for (const [key, allowedValues] of Object.entries(inc.keyValues)) {
                if (!Array.isArray(allowedValues) || allowedValues.length === 0) continue;
                if (INTEXT_RANDOM_KEYS.includes(String(key))) {
                  const snapshotValue = this.getIntextRandomValue(key);
                  if (key === "random1" && this.intextQaCookieOverride?.enabled === true) {
                    this.markIntextQaCookieApplied();
                    this._intextQaInclusionForced = true;
                    logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
                      key,
                      forcedValue: "inclusion-only",
                      originalValue: snapshotValue,
                    });
                    return true;
                  }
                  if (snapshotValue !== null && allowedValues.map(String).includes(String(snapshotValue))) {
                    logIntext(`[IntextManager] ✅ ALLOWED by inclusions.keyValues — key "${key}" has allowed snapshot value "${snapshotValue}"`);
                    return true;
                  }
                  continue;
                }
                if (pageTargeting === null) pageTargeting = this.getPageCustomTargeting(context) || {};
                const effectiveResolution = this.getEffectiveIntextTargetingResolution(key, context);
                if (effectiveResolution.qaCookieDefault === true) {
                  this.markIntextQaCookieApplied();
                  logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
                    key,
                    forcedValue: "default",
                    originalValue: effectiveResolution.originalValue,
                  });
                  return true;
                }
                const rawPageValue = this.getIntextRuleTargetingValue(key, pageTargeting);
                const effectiveValue = INTEXT_RANDOM_KEYS.includes(String(key))
                  ? rawPageValue
                  : effectiveResolution.qaCookieApplied === true
                  ? effectiveResolution.value
                  : rawPageValue;
                if (effectiveValue === undefined || effectiveValue === null) continue;

                let pageValues;
                if (Array.isArray(effectiveValue)) {
                  pageValues = effectiveValue.map(String);
                } else if (typeof effectiveValue === 'string' && effectiveValue.includes(',')) {
                  pageValues = effectiveValue.split(',').map(v => v.trim());
                } else {
                  pageValues = [String(effectiveValue)];
                }

                const matchedValue = allowedValues.find(allowed =>
                  pageValues.includes(String(allowed))
                );
                if (matchedValue) {
                  if (effectiveResolution.qaCookieApplied === true) {
                    this.markIntextQaCookieApplied();
                    logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
                      key,
                      forcedValue: effectiveResolution.value,
                      originalValue: effectiveResolution.originalValue,
                    });
                  }
                  logIntext(`[IntextManager] ✅ ALLOWED by inclusions.keyValues — key "${key}" has allowed value "${matchedValue}"`);
                  return true;
                }
            }
            logIntext(`[IntextManager] ❌ BLOCKED by inclusions.keyValues — page does not have any of the required allowed key-values`);
            return false;
          }

          return true;
        }

        getPageAdUnitPath(context = null) {
          if (context?.adUnitPath) {
            return context.adUnitPath;
          }
          if (typeof data !== 'undefined' && data?.adSlots?.[0]?.adUnit) {
            return data.adSlots[0].adUnit;
          }
          if (typeof ueDFPData !== 'undefined' && ueDFPData?.adSlots?.[0]?.adUnit) {
            return ueDFPData.adSlots[0].adUnit;
          }
          return this.adUnitPath || null;
        }

        getPageCustomTargeting(context = null) {
          const withoutIntextRandoms = (targeting) => {
            if (!targeting || typeof targeting !== "object") return targeting;
            const filtered = {};
            Object.keys(targeting).forEach((key) => {
              if (INTEXT_RANDOM_KEYS.includes(String(key))) return;
              filtered[key] = targeting[key];
            });
            return filtered;
          };
          if (typeof context === "string") {
            const key = context;
            if (INTEXT_RANDOM_KEYS.includes(key)) return null;
            const targeting = this.getPageCustomTargeting(null);
            if (!targeting || typeof targeting !== "object") return null;
            return targeting[key];
          }
          if (context?.targeting && typeof context.targeting === "object") {
            return withoutIntextRandoms(context.targeting);
          }
          if (typeof data !== 'undefined' && data?.customTargeting) {
            return withoutIntextRandoms(data.customTargeting);
          }
          if (typeof ueDFPData !== 'undefined' && ueDFPData?.customTargeting) {
            return withoutIntextRandoms(ueDFPData.customTargeting);
          }
          try {
            if (typeof googletag !== 'undefined' && googletag.pubads && typeof googletag.pubads === 'function') {
              const pubads = googletag.pubads();
              if (pubads && typeof pubads.getTargetingKeys === 'function') {
                const keys = pubads.getTargetingKeys();
                if (keys && keys.length > 0) {
                  const targeting = {};
                  keys.forEach(key => {
                    if (INTEXT_RANDOM_KEYS.includes(String(key))) return;
                    const values = pubads.getTargeting(key);
                    targeting[key] = values && values.length === 1 ? values[0] : values;
                  });
                  logIntext(`[IntextManager] 📋 Read page targeting from googletag.pubads():`, Object.keys(targeting).join(', '));
                  return targeting;
                }
              }
            }
          } catch (e) {
            warnIntextAlways('[IntextManager] Could not read GPT targeting:', e);
          }
          if (typeof window !== 'undefined' && (window.ueDataLayer || window.utag_data)) {
            return withoutIntextRandoms(window.ueDataLayer || window.utag_data);
          }
          return null;
        }
        
        isSlotDisabledByExclusion(index, context = null) {
          if (this.isIntextQaExclusionsBypassEnabled()) {
            this.markIntextQaExclusionsBypassApplied(
              context?.navIndex > 0 ? "navcontinua-disableSlots" : "disableSlots",
            );
            return false;
          }
          const siteConfig = context?.siteConfig || this.siteConfig;
          const ds = siteConfig?.exclusions?.disableSlots;
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
                const pageAdUnit = this.getPageAdUnitPath(context);
                if (pageAdUnit && rule.ifAdUnitPath.some(p => pageAdUnit.startsWith(p))) {
                  logIntext(`[IntextManager] Slot ${index}: DISABLED by disableSlots rule (adUnitPath match)`);
                  return true;
                }
              }

              if (rule.ifKeyValues && typeof rule.ifKeyValues === 'object' && Object.keys(rule.ifKeyValues).length > 0) {
                const pageTargeting = this.getPageCustomTargeting(context);
                if (pageTargeting) {
                  for (const [key, blockedValues] of Object.entries(rule.ifKeyValues)) {
                    if (!Array.isArray(blockedValues) || blockedValues.length === 0) continue;
                    const rawVal = this.getIntextRuleTargetingValue(key, pageTargeting);
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

            if (!placements.length) return { result: "no-valid-placement", found: 0, created: 0 };
            if (Number(maxSlots) === 0) return { result: "max-slots-zero", found: placements.length, created: 0 };
            if (slotsConfig?.enabled === false) return { result: "all-slots-disabled", found: placements.length, created: 0 };

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
              if (document.getElementById(displayWrapper.id)) {
                logIntext(`[IntextManager] duplicate_intext_wrapper_creation_blocked`, {
                  slotCode: displayWrapper.id,
                  nodeId: displayWrapper.dataset.gexpIntextNodeId,
                  placementIndex: index,
                  source: "createIntextPositions",
                });
                return;
              }
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
              const slotOverrides = this.getSlotOverridesForNode(index, displayWrapper.id, this.siteConfig);
              if (slotOverrides) {
                nodeConfig = JSON.parse(JSON.stringify(this.siteConfig)); // deep clone
                // Deep merge each section
                for (const section of Object.keys(slotOverrides)) {
                  if (
                    typeof slotOverrides[section] === "object" &&
                    slotOverrides[section] !== null &&
                    !Array.isArray(slotOverrides[section])
                  ) {
                    nodeConfig[section] = IntextManager.deepMerge(nodeConfig[section] || {}, slotOverrides[section]);
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
              displayContainer.ownerNode = node;
              videoContainer.ownerNode = node;
              this.nodes.push(node);
              slotsCreated++;
            });
            this.nodes.forEach((n) => n.initialize());
            return {
              result: slotsCreated > 0 ? "created" : "all-slots-disabled",
              found: placements.length,
              created: slotsCreated,
            };
          } catch (err) {
            this.registerIntextDiagnosticEvent({
              diagnosticKey: "create-intext-positions-failed",
              "gexp-intext-diagnostic-context": String(err?.message || err),
            });
            errorIntext("[IntextManager] Failed to create positions", err);
            return { result: "creation-error", found: 0, created: 0 };
          }
        }

        onSlotComplete(completedIndex) {
          // No-op: Slots initialize independently via IntersectionObserver
        }

        normalizeIntextBaseSlotId(displayWrapperId) {
          const id = String(displayWrapperId || "")
            .replace(/-video$/, "");
          if (/-pnc-\d+$/.test(id) || id === "pnc") return "pnc";
          const match = id.match(/^(gexp-intext(?:-\d+)?)/);
          return match ? match[1] : id;
        }

        getSlotOverridesForNode(index, displayWrapperId, config) {
          const baseSlotId = this.normalizeIntextBaseSlotId(displayWrapperId);
          const slotOverrides = config?.slotOverrides;
          return (
            config?.slotOverridesById?.[baseSlotId] ||
            (slotOverrides && !Array.isArray(slotOverrides) ? slotOverrides[baseSlotId] : null) ||
            (slotOverrides && !Array.isArray(slotOverrides) ? slotOverrides[`slot-${index + 1}`] : null) ||
            (slotOverrides && !Array.isArray(slotOverrides) ? slotOverrides[String(index)] : null) ||
            (Array.isArray(slotOverrides) ? slotOverrides[index] : null) ||
            null
          );
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
          wrapper.dataset.gexpIntextSlot = positionId.replace(/-video$/, "");
          wrapper.dataset.gexpIntextNodeId = positionId.replace(/-video$/, "");
          wrapper.dataset.gexpIntextPlacementIndex = typeof idxOrId === "number" ? String(idxOrId) : "unknown";
          wrapper.dataset.gexpIntextCycleId = "0";
          wrapper.dataset.gexpIntextRenderToken = "0";
          wrapper.dataset.gexpIntextVisualState = "created";
          wrapper.dataset.gexpIntextFormat = type;
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
          this._pendingNavIndexes = new Set();
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
                  if (this._processedNavIndexes.has(navIndex) || this._pendingNavIndexes.has(navIndex)) continue;
                  if ((this._processedNavIndexes.size + this._pendingNavIndexes.size) > (isConfig.maxArticles || 5)) {
                    logIntext(`[IntextManager:NavContinua] Max articles reached (${isConfig.maxArticles || 5}), ignoring navIndex=${navIndex}`);
                    continue;
                  }

                  this.processIntextNavCandidate(mainEl, navIndex);
                  logIntext(`[IntextManager:NavContinua] 🆕 New article detected: navIndex=${navIndex}`);
                }
              }
            }
          });

          observer.observe(document.body, { childList: true, subtree: true });
          logIntext('[IntextManager:NavContinua] 👁️ MutationObserver started');
        }

        getScopedIntextNcSlots(mainElement) {
          return this.getScopedSlotsForRoot(mainElement).filter((slot) => {
            const value = slot?.getTargeting?.("nc");
            return Array.isArray(value) ? value.map(String).includes("1") : String(value || "") === "1";
          });
        }

        async waitForIntextNavContext(mainElement) {
          const isConfig = this.siteConfig?.infiniteScroll || {};
          const timeoutMs = Math.max(0, Number(isConfig.contextWaitMs ?? 1000));
          const pollMs = Math.max(10, Number(isConfig.contextPollMs ?? 50));
          const startedAt = Date.now();
          while (true) {
            const slots = this.getScopedIntextNcSlots(mainElement);
            if (slots.length) return slots;
            if (Date.now() - startedAt >= timeoutMs) return [];
            await new Promise((resolve) => setTimeout(resolve, Math.min(pollMs, timeoutMs - (Date.now() - startedAt))));
          }
        }

        async processIntextNavCandidate(mainElement, navIndex) {
          const normalizedNavIndex = Number(navIndex) || 0;
          if (!normalizedNavIndex || this._processedNavIndexes?.has(normalizedNavIndex) || this._pendingNavIndexes?.has(normalizedNavIndex)) return false;
          if (!this._pendingNavIndexes) this._pendingNavIndexes = new Set();
          if (!this._processedNavIndexes) this._processedNavIndexes = new Set([0]);
          this._pendingNavIndexes.add(normalizedNavIndex);
          try {
            const scopedSlots = await this.waitForIntextNavContext(mainElement);
            if (!scopedSlots.length) {
              this.registerIntextDiagnosticEvent({
                diagnosticKey: `navcontinua-context-timeout:${normalizedNavIndex}`,
                navIndex: String(normalizedNavIndex),
                "gexp-intext-diagnostic-context": `navIndex:${normalizedNavIndex}`,
              });
              this._processedNavIndexes.add(normalizedNavIndex);
              return false;
            }
            const result = await this.onNewArticleDetected(mainElement, normalizedNavIndex);
            if (result?.handled === true) this._processedNavIndexes.add(normalizedNavIndex);
            return result;
          } finally {
            this._pendingNavIndexes.delete(normalizedNavIndex);
          }
        }

        async onNewArticleDetected(mainElement, navIndex) {
          const scopedBaseConfig =
            this.baseSiteConfig ||
            this.siteConfig;
          const baseInfiniteScrollConfig =
            scopedBaseConfig?.infiniteScroll;
          if (!baseInfiniteScrollConfig) {
            return { handled: true, decision: "content-type-blocked", telemetryRegistered: false };
          }

          const scopedContext = this.resolveScopedAdContext(mainElement);
          const requestNetworkId = this.resolveIntextRequestNetworkId(scopedContext);
          if (!requestNetworkId) {
            return { handled: true, decision: "network-force-invalid", telemetryRegistered: false };
          }
          scopedContext.networkId = requestNetworkId;
          scopedContext.adUnitPath =
            this.resolveIntextDisplayAdUnitPath(scopedContext);
          const resolvedIdentity = await this.resolveScopedIntextNewsIdentity(mainElement, navIndex, scopedContext);
          const contentIdentity = this.captureIntextContentIdentity(navIndex, mainElement, scopedContext, resolvedIdentity);
          const contentType = scopedContext.contentType || this.detectContentType(mainElement);
          logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: content type = "${contentType}"`);

          let scrollConfig = IntextManager.deepMerge(
            { ...scopedBaseConfig },
            {},
          );
          const scopedNetworkOverride =
            this.getIntextNetworkOverride(requestNetworkId);
          if (scopedNetworkOverride) {
            scrollConfig = IntextManager.deepMerge(
              scrollConfig,
              scopedNetworkOverride,
            );
          }
          const ctProfile = scrollConfig?.contentTypes?.[contentType];
          if (ctProfile) {
            scrollConfig = IntextManager.deepMerge(scrollConfig, ctProfile);
          }
          const infiniteScrollOverrides =
            scrollConfig?.infiniteScroll?.overrides;
          if (infiniteScrollOverrides) {
            scrollConfig = IntextManager.deepMerge(
              scrollConfig,
              infiniteScrollOverrides,
            );
          }
          if (!this.isContentTypeAllowed(scrollConfig, contentType, "[IntextManager:NavContinua]")) {
            return { handled: true, decision: "content-type-blocked", telemetryRegistered: false };
          }

          const scopedRuleContext = {
            ...scopedContext,
            contentType,
            navIndex,
            be_page_newsID: contentIdentity.newsId,
            intextContentIdentity: contentIdentity,
            siteConfig: scrollConfig,
          };

          if (this.isBlockedByExclusions(scopedRuleContext)) {
            logIntext(
              `[IntextManager:NavContinua] navcontinua_exclusions_blocked - navIndex=${navIndex}, adUnitPath=${scopedRuleContext.adUnitPath || "missing"}`,
            );
            return { handled: true, decision: "excluded", telemetryRegistered: false };
          }

          if (!this.isAllowedByInclusions(scopedRuleContext)) {
            logIntext(`[IntextManager:NavContinua] navcontinua_inclusions_allowed - navIndex=${navIndex}, allowed=false`);
            return { handled: true, decision: "not-in-cohort", telemetryRegistered: false };
          }

          logIntext(`[IntextManager:NavContinua] navcontinua_inclusions_allowed - navIndex=${navIndex}, allowed=true`);

          if (this.shouldBlockIntextByFallbackBlankControl()) {
            const registered = this.registerIntextManagerDecision({
              navIndex,
              scope: "navcontinua",
              decision: "blocked",
              reason: "fallback-blank-cookie",
              contentType,
              rootElement: mainElement,
              scopedContext: scopedRuleContext,
            });
            logIntext(`[IntextManager:NavContinua] navcontinua_blocked_by_fallback_blank_cookie`, { navIndex });
            return { handled: true, decision: "blocked", telemetryRegistered: registered === true };
          }

          const pncSuffix = navIndex >= 1 ? `-pnc-${navIndex}` : '';
          const placement = this.createIntextPositionsScoped(mainElement, scrollConfig, pncSuffix, navIndex, scopedRuleContext);

          const telemetryRegistered = this.registerIntextManagerDecision({
            navIndex,
            scope: "navcontinua",
            decision: "allowed",
            reason: "passed",
            contentType,
            rootElement: mainElement,
            scopedContext: scopedRuleContext,
            placement,
          });
          return { handled: true, decision: "allowed", telemetryRegistered: telemetryRegistered === true };
        }

        createIntextPositionsScoped(rootElement, scopedConfig, pncSuffix, navIndex, scopedContext = null) {
          try {
            const engine = new IntextPlacementEngine(
              scopedConfig.dom,
              scopedConfig.rules,
              rootElement
            );
            const placements = engine.findPlacements();
            if (!placements.length) {
              logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: no valid placements found`);
              return { result: "no-valid-placement", found: 0, created: 0 };
            }

            const newNodes = [];
            const slotsConfigScoped = scopedConfig.slots;
            const maxSlotsScoped = slotsConfigScoped?.maxSlots ?? Infinity;
            let slotsCreatedScoped = 0;
            if (Number(maxSlotsScoped) === 0) return { result: "max-slots-zero", found: placements.length, created: 0 };
            if (slotsConfigScoped?.enabled === false) return { result: "all-slots-disabled", found: placements.length, created: 0 };

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

              if (this.isSlotDisabledByExclusion(index, scopedContext)) {
                logIntext(
                  `[IntextManager:NavContinua] navIndex=${navIndex} Slot ${index}: DISABLED by scoped exclusions.disableSlots`,
                );
                return;
              }

              const displayWrapper = this.createWrapperNode(index, "display", pncSuffix);
              if (document.getElementById(displayWrapper.id)) {
                logIntext(`[IntextManager:NavContinua] duplicate_intext_wrapper_creation_blocked`, {
                  slotCode: displayWrapper.id,
                  nodeId: displayWrapper.dataset.gexpIntextNodeId,
                  placementIndex: index,
                  navIndex,
                  source: "createIntextPositionsScoped",
                });
                return;
              }
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
              const slotOverrides = this.getSlotOverridesForNode(index, displayWrapper.id, scopedConfig);
              if (slotOverrides) {
                for (const section of Object.keys(slotOverrides)) {
                  if (typeof slotOverrides[section] === 'object' && slotOverrides[section] !== null && !Array.isArray(slotOverrides[section])) {
                    nodeConfig[section] = IntextManager.deepMerge(nodeConfig[section] || {}, slotOverrides[section]);
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
                scopedContext: {
                  ...(scopedContext || {}),
                  navIndex,
                },
              });
              displayContainer.ownerNode = node;
              videoContainer.ownerNode = node;
              newNodes.push(node);
              this.nodes.push(node);
              slotsCreatedScoped++;
            });

            newNodes.forEach(n => n.initialize());
            this._navContinuaNodes.push({ navIndex, nodes: newNodes });
            logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: created ${newNodes.length} slot(s)`);
            return {
              result: slotsCreatedScoped > 0 ? "created" : "all-slots-disabled",
              found: placements.length,
              created: slotsCreatedScoped,
            };
          } catch (err) {
            errorIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: Failed to create positions`, err);
            return { result: "creation-error", found: 0, created: 0 };
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
            const ruleIdx = placements.length;
            const slotCode = ruleIdx === 0 ? "gexp-intext" : `gexp-intext-${ruleIdx + 1}`;
            const result = this.evaluatePlacement(paragraphs, rule, lastIndex, slotCode);
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

        evaluatePlacement(paragraphs, rule = [], startIndex = -1, slotCode = "gexp-intext") {
          if (!rule || rule.length < 2) return null;
          let [targetIndex, minParagraphsAfter] = rule;
          targetIndex = Math.max(targetIndex - 1, startIndex + 1);
          if (targetIndex >= paragraphs.length) return null;
          let paragraph = paragraphs[targetIndex];
          const remaining = paragraphs.length - (targetIndex + 1);
          if (remaining < minParagraphsAfter) return null;
          if (!paragraph) return null;
          let adjacencyMeta = {
            enabled: false,
            triggered: false,
            originalParagraph: targetIndex,
            finalParagraph: targetIndex,
            shifted: false,
            shiftDirection: "none",
            shiftDistance: 0,
            fallbackOriginal: false,
            minFinalParagraphIndex: null,
            candidateRejectedReason: "none",
            reason: "not-triggered",
          };

          const avoidance = this.rulesConfig.adjacencyAvoidance;
          if (avoidance?.enabled && avoidance?.selector) {
            adjacencyMeta.enabled = true;
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
              const originalIndex = targetIndex;
              const originalParagraph = paragraph;
              const direction = avoidance.direction || "up";
              const preferUp = direction === "up";
              const allowDownwardShift = avoidance.allowDownwardShift !== false;
              const allowUpwardShift = avoidance.allowUpwardShift !== false;
              const fallbackToOriginal = avoidance.fallbackToOriginal !== false;
              const minFinalParagraphIndex = avoidance.minFinalParagraphIndexBySlot?.[slotCode] ?? null;
              const maxShiftParagraphs = Number.isFinite(Number(avoidance.maxShiftParagraphs))
                ? Math.max(1, Number(avoidance.maxShiftParagraphs))
                : paragraphs.length;
              let blockedByDownwardDisabled = false;
              let blockedByMinFinalIndex = false;
              adjacencyMeta = {
                enabled: true,
                triggered: true,
                originalParagraph: originalIndex,
                finalParagraph: originalIndex,
                shifted: false,
                shiftDirection: "none",
                shiftDistance: 0,
                fallbackOriginal: false,
                minFinalParagraphIndex,
                candidateRejectedReason: "none",
                reason: "adjacent-to-ad",
              };
              logIntext(`[IntextPlacement] adjacency_avoidance_triggered`, {
                slotCode,
                originalIndex,
                paragraphNumber: originalIndex + 1,
                selector: avoidance.selector,
                direction,
                allowDownwardShift,
                fallbackToOriginal,
                maxShiftParagraphs,
                minFinalParagraphIndex,
              });
              const tryOrder = [];
              for (let d = 1; d <= maxShiftParagraphs; d++) {
                if (preferUp) {
                  tryOrder.push({ index: originalIndex - d, shiftDirection: "up", shiftDistance: d });
                  if (allowDownwardShift) {
                    tryOrder.push({ index: originalIndex + d, shiftDirection: "down", shiftDistance: d });
                  } else {
                    blockedByDownwardDisabled = true;
                  }
                } else {
                  if (allowDownwardShift) {
                    tryOrder.push({ index: originalIndex + d, shiftDirection: "down", shiftDistance: d });
                  } else {
                    blockedByDownwardDisabled = true;
                  }
                  if (allowUpwardShift) {
                    tryOrder.push({ index: originalIndex - d, shiftDirection: "up", shiftDistance: d });
                  }
                }
              }
              let moved = false;
              for (const candidateInfo of tryOrder) {
                const newIdx = candidateInfo.index;
                const rejectCandidate = (reason) => {
                  adjacencyMeta.candidateRejectedReason = reason;
                  logIntext(`[IntextPlacement] adjacency_avoidance_candidate_rejected`, {
                    slotCode,
                    originalIndex,
                    candidateIndex: newIdx,
                    minFinalParagraphIndex,
                    shiftDirection: candidateInfo.shiftDirection,
                    shiftDistance: candidateInfo.shiftDistance,
                    selector: avoidance.selector,
                    reason,
                  });
                };
                if (newIdx <= startIndex) {
                  rejectCandidate("before-start-index");
                  continue;
                }
                if (newIdx < 0 || newIdx >= paragraphs.length) {
                  rejectCandidate("out-of-range");
                  continue;
                }
                if (minFinalParagraphIndex !== null && newIdx < minFinalParagraphIndex) {
                  blockedByMinFinalIndex = true;
                  rejectCandidate("below-min-final-paragraph-index");
                  continue;
                }
                const newRemaining = paragraphs.length - (newIdx + 1);
                if (newRemaining < minParagraphsAfter) {
                  rejectCandidate("min-paragraphs-after");
                  continue;
                }
                const candidate = paragraphs[newIdx];
                if (candidate && !isAdjacentToAd(candidate)) {
                  logIntext(`[IntextPlacement] adjacency_avoidance_shift_applied`, {
                    slotCode,
                    originalIndex,
                    finalIndex: newIdx,
                    shiftDirection: candidateInfo.shiftDirection,
                    shiftDistance: candidateInfo.shiftDistance,
                    selector: avoidance.selector,
                  });
                  paragraph = candidate;
                  targetIndex = newIdx;
                  adjacencyMeta.finalParagraph = newIdx;
                  adjacencyMeta.shifted = true;
                  adjacencyMeta.shiftDirection = candidateInfo.shiftDirection;
                  adjacencyMeta.shiftDistance = candidateInfo.shiftDistance;
                  adjacencyMeta.reason = "safe-candidate-found";
                  moved = true;
                  break;
                } else if (candidate) {
                  rejectCandidate("adjacent-to-ad");
                }
              }
              if (!moved) {
                const reason = blockedByMinFinalIndex
                  ? "no-safe-candidate-above-min-final-index"
                  : (blockedByDownwardDisabled ? "downward-shift-disabled" : "no-safe-candidate");
                paragraph = fallbackToOriginal ? originalParagraph : paragraph;
                targetIndex = fallbackToOriginal ? originalIndex : targetIndex;
                adjacencyMeta.finalParagraph = targetIndex;
                adjacencyMeta.fallbackOriginal = fallbackToOriginal;
                adjacencyMeta.reason = reason;
                logIntext(`[IntextPlacement] adjacency_avoidance_kept_original`, {
                  slotCode,
                  originalIndex,
                  finalIndex: targetIndex,
                  selector: avoidance.selector,
                  reason,
                  fallbackToOriginal,
                });
              }
              /*
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
              */
            }
          }

          return {
            paragraph,
            paragraphIndex: targetIndex,
            placementRule: Array.isArray(rule) ? [...rule] : rule,
            validParagraphsCount: paragraphs.length,
            adjacencyMeta,
          };
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
          navIndex = 0,
          scopedContext = null,
        }) {
          this.id = id;
          this.videoId = videoId;
          this.container = container;
          this.videoContainer = videoContainer;
          this.config = config;
          this.manager = manager;
          this.placement = placement;
          this.slotIndex = slotIndex;
          this.navIndex = navIndex;
          this.scopedContext = scopedContext;
          this.state = "idle";
          this.waterfall = null;
          this.activeCreative = null;
          this.wa = null;
          this.slot = null;
          this._coordinator = null;
          this.lockedHeight = 0;
          this._videoTiming = null;
          this._intextTelemetryCycleId = 0;
          this._intextTelemetryCycle = null;
          this._pendingIntextTelemetry = {};
          this._intextViewportObserver = null;
          this._intextViewportObservedEl = null;
          this._intextViewportEnterAt = null;
          this._intextViewportVisibleMs = 0;
          this._intextTelemetryCommittedForCycle = false;
          this._intextTelemetryCommittedReasons = {};
          this._intextTelemetryFinalCommitted = false;
          this._lastImaAdDuration = null;
          this._house1x1AutoRefreshAttemptsForCycle = 0;
          this._house1x1AutoRefreshAttemptsPerSlot = 0;
          this._activeRenderToken = 0;
          this._renderTokenSeq = 0;
          this._renderInProgress = false;
          this._renderCompleted = false;
          this._displayRequestInFlight = false;
          this._lastVisualCycleId = 0;
          this._visualState = "idle";
          this._destroyedOrResetToken = 0;
          this._renderTimers = [];
          this._intextTransitionBridge = null;
          this._intextRealRenderTelemetryCommittedForToken = null;
          this._fallbackBlankControlCountedTokens = new Set();
          this._fallbackBlankControlCountedEvents = new Set();
          this._nodeActive = true;
          this._intextPipState = "inline";
          this._intextPipDismissedRenderToken = null;
          this._intextPipEnteredAt = null;
          this._intextPipVisibleMs = 0;
          this._intextPipEntryCount = 0;
          this._intextPipAnchorEverVisible = false;
          this._intextPipFirstFrameConfirmed = false;
          this._intextPipPlayerRevealed = false;
          this._intextPipCloseButton = null;
          this._intextPipCloseHandler = null;
          this._intextPipPlayerElement = null;
          this._intextPipOriginalInlineStyles = null;
          this._intextPipLastIntersectionRatio = null;
          this._intextPipLastExitPlayedPct = null;
          this._intextPipPlaybackActive = false;
          this._intextPipPlaybackSource = "unresolved";
          if (window.gexpIntextDebug) {
            intextDebugCollector.attachManager(this.manager);
            intextDebugCollector.recordTimeline("created", { node: this, slotId: this.id });
          }
        }

        getIntextNodeId() {
          return String(this.id || this.videoId || "unknown");
        }

        getIntextPlacementIndex() {
          return this.placement?.placementIndex != null
            ? this.placement.placementIndex
            : this.slotIndex;
        }

        getIntextPipConfig() {
          const source = this.config?.video?.pip || {};
          const sourceSlots = source.slots && typeof source.slots === "object" && !Array.isArray(source.slots)
            ? source.slots
            : {};
          const slots = Object.freeze ? Object.freeze({
            default: sourceSlots.default === true,
            "gexp-intext": sourceSlots["gexp-intext"] !== false,
            "gexp-intext-2": sourceSlots["gexp-intext-2"] === true,
            "gexp-intext-3": sourceSlots["gexp-intext-3"] === true,
            pnc: sourceSlots.pnc === true,
            ...sourceSlots,
          }) : { ...sourceSlots };
          const number = (value, fallback, min, max) => {
            const parsed = Number(value);
            return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
          };
          const enterIntersectionRatio = number(source.enterIntersectionRatio, 0.05, 0, 0.95);
          let returnIntersectionRatio = number(source.returnIntersectionRatio, 0.35, 0, 1);
          if (returnIntersectionRatio <= enterIntersectionRatio) {
            returnIntersectionRatio = Math.min(1, enterIntersectionRatio + 0.05);
          }
          const config = {
            enabled: source.enabled === true,
            slots,
            inclusions: source.inclusions && typeof source.inclusions === "object"
              ? source.inclusions
              : { enabled: false, sites: [], keyValues: {} },
            exclusions: source.exclusions && typeof source.exclusions === "object"
              ? source.exclusions
              : { enabled: false, disableAll: false, sites: [], keyValues: {} },
            mode: source.mode === "floating" ? source.mode : "floating",
            enabledDesktop: source.enabledDesktop !== false,
            enabledMobile: source.enabledMobile === true,
            position: source.position === "bottom-right" ? source.position : "bottom-right",
            widthDesktop: number(source.widthDesktop, 360, 160, 960),
            widthMobile: number(source.widthMobile, 280, 160, 640),
            maxWidthViewportRatio: number(source.maxWidthViewportRatio, 0.9, 0.25, 1),
            right: number(source.right, 16, 0, 200),
            bottom: number(source.bottom, 16, 0, 200),
            zIndex: number(source.zIndex, 100000, 1, 1000000),
            enterIntersectionRatio,
            returnIntersectionRatio,
            onlyAfterFirstFrame: source.onlyAfterFirstFrame !== false,
            requireInitialViewport: source.requireInitialViewport !== false,
            showCloseButton: source.showCloseButton !== false,
            singleActive: source.singleActive !== false,
            closeBehavior: source.closeBehavior === "return-inline-and-dismiss-cycle"
              ? source.closeBehavior
              : "return-inline-and-dismiss-cycle",
          };
          return Object.freeze ? Object.freeze(config) : { ...config };
        }

        getIntextPipBaseSlotId() {
          const id = String(this.id || "").replace(/-video$/, "");
          return this.manager?.normalizeIntextBaseSlotId?.(id) || id;
        }

        isIntextPipSlotEnabled() {
          const pip = this.getIntextPipConfig();
          const slotId = this.getIntextPipBaseSlotId();
          if (Object.prototype.hasOwnProperty.call(pip.slots || {}, slotId)) {
            return pip.slots[slotId] === true;
          }
          return pip.slots?.default === true;
        }

        isIntextPipMobileDevice() {
          try {
            const dl = (typeof window !== "undefined" && (window.ueDataLayer || window.utag_data)) || {};
            if (dl.device_category === "mobile" || dl.be_page_site_version === "mobile") return true;
            if (dl.device_category === "desktop" || dl.be_page_site_version === "desktop") return false;
            return this.manager?.gexp?.isMobileDevice?.() === true;
          } catch (e) {
            return false;
          }
        }

        isIntextPipEnabled() {
          const pip = this.getIntextPipConfig();
          const isMobile = this.isIntextPipMobileDevice();
          const renderTokenValid =
            Number(this._activeRenderToken) > 0 &&
            this._activeRenderToken === this._renderTokenSeq;
          return (
            pip.enabled === true &&
            this.isIntextPipSlotEnabled() &&
            pip.mode === "floating" &&
            (isMobile ? pip.enabledMobile : pip.enabledDesktop) &&
            this._nodeActive === true &&
            this.state === "video" &&
            Boolean(this.videoContainer?.getElement?.()) &&
            this._intextPipState !== "destroyed" &&
            renderTokenValid
          );
        }

        isIntextPipEffectiveEnabled() {
          return this.isIntextPipEnabled();
        }

        getIntextPipPlayerElement() {
          try {
            const player = this.activeCreative?.player;
            const playerEl = typeof player?.el === "function" ? player.el() : null;
            if (playerEl) return playerEl;
            if (player?.element) return player.element;
            const videoContainer = this.videoContainer?.getElement?.();
            const videoJs = videoContainer?.querySelector?.(".video-js");
            if (videoJs) return videoJs;
            const video = videoContainer?.querySelector?.("video");
            return video?.closest?.(".video-js") || null;
          } catch (e) {
            return null;
          }
        }

        getIntextPipPlaybackData() {
          const player = this.activeCreative?.player;
          const media = this.activeCreative?._adMediaEl;
          const read = (candidate, fallback = null) => {
            try {
              const value = typeof candidate === "function" ? candidate() : candidate;
              const parsed = Number(value);
              return Number.isFinite(parsed) ? parsed : fallback;
            } catch (e) {
              return fallback;
            }
          };
          const currentTime = read(media?.currentTime, read(() => player?.currentTime?.(), 0));
          const duration = read(
            media?.duration,
            read(() => player?.duration?.(), read(this.activeCreative?._lastAdDuration, 0)),
          );
          const playedPct = duration > 0
            ? Math.max(0, Math.min(100, Math.round((currentTime / duration) * 10000) / 100))
            : null;
          return { currentTime, duration, playedPct };
        }

        getIntextPipPlaybackState() {
          const creative = this.activeCreative;
          const player = creative?.player || null;
          const media = creative?._adMediaEl || null;
          const readNumber = (candidate, fallback = 0) => {
            try {
              const raw = typeof candidate === "function" ? candidate() : candidate;
              const parsed = Number(raw);
              return Number.isFinite(parsed) ? parsed : fallback;
            } catch (e) {
              return fallback;
            }
          };
          const readBoolean = (candidate) => {
            try {
              const raw = typeof candidate === "function" ? candidate() : candidate;
              return typeof raw === "boolean" ? raw : null;
            } catch (e) {
              return null;
            }
          };
          const currentTime = readNumber(media?.currentTime, readNumber(() => player?.currentTime?.(), 0));
          const duration = readNumber(
            media?.duration,
            readNumber(() => player?.duration?.(), readNumber(creative?._lastAdDuration, 0)),
          );
          const mediaEnded = readBoolean(media?.ended);
          const mediaPaused = readBoolean(media?.paused);
          const playerEnded = readBoolean(() => player?.ended?.());
          const playerPaused = readBoolean(() => player?.paused?.());
          let ended = mediaEnded ?? playerEnded ?? creative?._videoEndHandled === true;
          let paused = mediaPaused ?? playerPaused;
          let source = media ? "ima-media-element" : player ? "videojs-player" : "canonical";
          if (paused === null) {
            paused = this._intextPipPlaybackActive !== true;
            source = "canonical";
          }
          if (ended === null) ended = creative?._videoEndHandled === true;
          const playing =
            Boolean(creative) &&
            Boolean(player || media) &&
            ended !== true &&
            paused === false &&
            (currentTime > 0 || this._intextPipPlaybackActive === true);
          const readyState = readNumber(media?.readyState, readNumber(() => player?.readyState?.(), 0));
          return {
            hasCreative: Boolean(creative),
            hasPlayer: Boolean(player),
            hasMediaElement: Boolean(media),
            currentTime,
            duration,
            ended: ended === true,
            paused: paused === true,
            playing,
            readyState,
            source,
          };
        }

        setIntextPipPlaybackActive(active, source = "canonical") {
          this._intextPipPlaybackActive = active === true;
          this._intextPipPlaybackSource = String(source || "canonical");
          this.mergeIntextTelemetry({
            "gexp-intext-pip-playback-source": this._intextPipPlaybackSource,
            "gexp-intext-pip-video-playing": this._intextPipPlaybackActive ? "true" : "false",
          });
          if (this._intextPipPlaybackActive) this.maybeEnterIntextPipFromLastIntersection();
        }

        getIntextPipTargetingContext() {
          const scopedContext = this.scopedContext || null;
          const site = this.manager?.getHostnameNormalized?.(
            scopedContext?.hostname ||
              window?.location?.hostname ||
              this.manager?.siteContext?.site ||
              "",
          ) || "";
          const targeting = {
            ...(this.manager?.getPageCustomTargeting?.(scopedContext) || {}),
            ...(scopedContext?.targeting || {}),
          };
          INTEXT_RANDOM_KEYS.forEach((key) => {
            const value = this.manager?.getIntextRandomValue?.(key);
            if (value !== null && value !== undefined && value !== "") targeting[key] = String(value);
          });
          return { site, targeting, scopedContext };
        }

        normalizeIntextPipRuleValues(value) {
          const values = Array.isArray(value) ? value : [value];
          return values
            .flatMap((entry) => String(entry ?? "").split(","))
            .map((entry) => entry.trim())
            .filter(Boolean);
        }

        isIntextPipSiteMatched(site, configuredSites) {
          const normalizedSite = this.manager?.getHostnameNormalized?.(site) || String(site || "").toLowerCase();
          return this.normalizeIntextPipRuleValues(configuredSites).some((candidate) => {
            const normalizedCandidate =
              this.manager?.getHostnameNormalized?.(candidate) || String(candidate || "").toLowerCase();
            return normalizedSite === normalizedCandidate || normalizedSite.endsWith(`.${normalizedCandidate}`);
          });
        }

        findIntextPipKeyValueMatch(rules, targeting) {
          if (!rules || typeof rules !== "object" || Array.isArray(rules)) return null;
          for (const [key, configuredValues] of Object.entries(rules)) {
            const allowedValues = this.normalizeIntextPipRuleValues(configuredValues);
            if (!allowedValues.length) continue;
            const pageValues = this.normalizeIntextPipRuleValues(targeting?.[key]);
            const matchedValue = allowedValues.find((value) => pageValues.includes(String(value)));
            if (matchedValue !== undefined) return { key: String(key), value: String(matchedValue) };
          }
          return null;
        }

        isIntextPipAllowedByInclusions(context = this.getIntextPipTargetingContext()) {
          const rules = this.getIntextPipConfig().inclusions || {};
          if (rules.enabled !== true) {
            return { allowed: true, reason: "allowed", siteMatched: false, keyValueMatched: false, match: null };
          }
          const sites = this.normalizeIntextPipRuleValues(rules.sites);
          const hasSites = sites.length > 0;
          const siteMatched = !hasSites || this.isIntextPipSiteMatched(context.site, sites);
          if (!siteMatched) {
            return {
              allowed: false,
              reason: "pip-inclusion-site-not-matched",
              siteMatched: false,
              keyValueMatched: false,
              match: null,
            };
          }
          const hasKeyValues =
            rules.keyValues && typeof rules.keyValues === "object" && Object.keys(rules.keyValues).length > 0;
          const match = hasKeyValues ? this.findIntextPipKeyValueMatch(rules.keyValues, context.targeting) : null;
          if (hasKeyValues && !match) {
            return {
              allowed: false,
              reason: "pip-inclusion-keyvalue-not-matched",
              siteMatched,
              keyValueMatched: false,
              match: null,
            };
          }
          return {
            allowed: true,
            reason: "allowed",
            siteMatched,
            keyValueMatched: Boolean(match),
            match,
          };
        }

        isIntextPipBlockedByExclusions(context = this.getIntextPipTargetingContext()) {
          const rules = this.getIntextPipConfig().exclusions || {};
          if (rules.enabled !== true) {
            return { blocked: false, reason: "allowed", siteMatched: false, keyValueMatched: false, match: null };
          }
          if (rules.disableAll === true) {
            return {
              blocked: true,
              reason: "pip-exclusions-disable-all",
              siteMatched: false,
              keyValueMatched: false,
              match: null,
            };
          }
          const sites = this.normalizeIntextPipRuleValues(rules.sites);
          const siteMatched = sites.length > 0 && this.isIntextPipSiteMatched(context.site, sites);
          if (siteMatched) {
            return {
              blocked: true,
              reason: "pip-excluded-site",
              siteMatched: true,
              keyValueMatched: false,
              match: null,
            };
          }
          const match = this.findIntextPipKeyValueMatch(rules.keyValues, context.targeting);
          if (match) {
            return {
              blocked: true,
              reason: "pip-excluded-keyvalue",
              siteMatched: false,
              keyValueMatched: true,
              match,
            };
          }
          return { blocked: false, reason: "allowed", siteMatched: false, keyValueMatched: false, match: null };
        }

        resolveIntextPipTargetingEligibility() {
          const context = this.getIntextPipTargetingContext();
          const inclusion = this.isIntextPipAllowedByInclusions(context);
          const exclusion = this.isIntextPipBlockedByExclusions(context);
          const allowed = inclusion.allowed === true && exclusion.blocked !== true;
          const reason = exclusion.blocked ? exclusion.reason : inclusion.reason;
          const match = exclusion.match || inclusion.match;
          const result = {
            allowed,
            reason,
            site: context.site,
            inclusionSiteMatched: inclusion.siteMatched,
            inclusionKeyValueMatched: inclusion.keyValueMatched,
            exclusionSiteMatched: exclusion.siteMatched,
            exclusionKeyValueMatched: exclusion.keyValueMatched,
            matchedKey: match?.key || "none",
            matchedValue: match?.value || "none",
          };
          this.mergeIntextTelemetry({
            "gexp-intext-pip-slot-enabled": this.isIntextPipSlotEnabled() ? "true" : "false",
            "gexp-intext-pip-targeting-allowed": allowed ? "true" : "false",
            "gexp-intext-pip-targeting-reason": String(reason),
            "gexp-intext-pip-inclusion-site-matched": inclusion.siteMatched ? "true" : "false",
            "gexp-intext-pip-inclusion-keyvalue-matched": inclusion.keyValueMatched ? "true" : "false",
            "gexp-intext-pip-exclusion-site-matched": exclusion.siteMatched ? "true" : "false",
            "gexp-intext-pip-exclusion-keyvalue-matched": exclusion.keyValueMatched ? "true" : "false",
            "gexp-intext-pip-targeting-matched-key": result.matchedKey,
            "gexp-intext-pip-targeting-matched-value": result.matchedValue,
          });
          this.recordIntextPipEvent("video_pip_targeting_evaluated", reason, result);
          if (!allowed) this.recordIntextPipEvent("video_pip_targeting_blocked", reason, result);
          return result;
        }

        recordIntextPipEvent(metric, reason = "unknown", extra = {}) {
          const playback = this.getIntextPipPlaybackData();
          const payload = {
            node: this,
            source: reason,
            slotId: this.id,
            slotIndex: this.slotIndex,
            navIndex: this.navIndex,
            cycleId: this._intextTelemetryCycleId,
            renderToken: this._activeRenderToken,
            reason,
            pipState: this._intextPipState,
            currentTime: playback.currentTime,
            duration: playback.duration,
            playedPct: playback.playedPct,
            anchorIntersectionRatio: this._intextPipLastIntersectionRatio,
            documentVisibility: String(document?.visibilityState || "unknown"),
            entryCount: this._intextPipEntryCount,
            accumulatedPipVisibleMs: this._intextPipVisibleMs,
            ...extra,
          };
          if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
            intextDebugCollector.recordMetric(metric, payload);
          }
          return payload;
        }

        getIntextPipEntryBlockReason() {
          const pip = this.getIntextPipConfig();
          if (pip.enabled === true && !this.isIntextPipSlotEnabled()) return "pip-slot-disabled";
          if (!this.isIntextPipEnabled()) return "disabled-or-inactive";
          if (this._intextPipState !== "inline") return `state-${this._intextPipState}`;
          if (this._intextPipDismissedRenderToken === this._activeRenderToken) return "dismissed-render-token";
          const targetingEligibility = this.resolveIntextPipTargetingEligibility();
          if (!targetingEligibility.allowed) return targetingEligibility.reason;
          if (!this.activeCreative || this.activeCreative?._aborted) return "creative-unavailable";
          if (!this.getIntextPipPlayerElement()) return "player-unavailable";
          const playback = this.getIntextPipPlaybackState();
          this.mergeIntextTelemetry({
            "gexp-intext-pip-playback-source": playback.source,
            "gexp-intext-pip-video-playing": playback.playing ? "true" : "false",
          });
          if (playback.ended || this.activeCreative?._videoEndHandled === true) return "video-ended";
          if (
            this.state === "error" ||
            this._displayRequestInFlight === true ||
            this._visualState === "fallback_started" ||
            this._intextTelemetryCycle?.["gexp-intext-video-failed"] === "true"
          ) return "error-or-fallback";
          if (pip.onlyAfterFirstFrame && !this._intextPipFirstFrameConfirmed) return "first-frame-pending";
          if (!this._intextPipPlayerRevealed) return "player-not-revealed";
          if (!playback.playing || playback.paused) return "video-not-playing";
          if (pip.requireInitialViewport && !this._intextPipAnchorEverVisible) return "anchor-never-visible";
          if (typeof document !== "undefined" && document.visibilityState !== "visible") return "document-hidden";
          if (
            this._intextPipLastIntersectionRatio === null ||
            this._intextPipLastIntersectionRatio > pip.enterIntersectionRatio
          ) return "anchor-still-visible";
          const loader = this.videoContainer?.getElement?.()?.querySelector?.(".gexp-intext-loader");
          if (loader) {
            let loaderVisible = loader.style?.display === "flex" || loader.style?.display === "block";
            try {
              if (typeof window.getComputedStyle === "function") {
                loaderVisible = loaderVisible || window.getComputedStyle(loader)?.display !== "none";
              }
            } catch (e) {}
            if (loaderVisible) return "loader-visible";
          }
          if (playback.duration > 0 && playback.currentTime >= playback.duration) return "video-ended";
          return null;
        }

        canEnterIntextPip() {
          const reason = this.getIntextPipEntryBlockReason();
          if (!reason) return true;
          const pip = this.getIntextPipConfig();
          if (
            pip.enabled &&
            this._intextPipLastIntersectionRatio !== null &&
            this._intextPipLastIntersectionRatio <= pip.enterIntersectionRatio
          ) {
            this.recordIntextPipEvent("video_pip_entry_blocked", reason);
            if (reason === "video-not-playing") {
              this.recordIntextPipEvent("video_pip_entry_blocked_video_not_playing", reason);
            }
          }
          return false;
        }

        enterIntextPip(reason = "anchor-left-viewport", intersectionEntry = null) {
          if (
            intersectionEntry &&
            Number.isFinite(Number(intersectionEntry.intersectionRatio))
          ) {
            this._intextPipLastIntersectionRatio = Number(intersectionEntry.intersectionRatio);
          }
          if (!this.canEnterIntextPip()) return false;
          const renderToken = this._activeRenderToken;
          const pip = this.getIntextPipConfig();
          const playerElement = this.getIntextPipPlayerElement();
          const videoWrapper = this.videoContainer?.getElement?.();
          if (!playerElement || !videoWrapper || !this.isActiveRenderToken(renderToken, "enterIntextPip", reason)) {
            return false;
          }
          if (pip.singleActive && this.manager?.requestActiveIntextPip?.(this) === false) return false;
          if (!this.isActiveRenderToken(renderToken, "enterIntextPip:after-manager", reason)) {
            this.manager?.releaseActiveIntextPip?.(this);
            return false;
          }

          const cssVariables = [
            "--gexp-intext-pip-width",
            "--gexp-intext-pip-max-width",
            "--gexp-intext-pip-right",
            "--gexp-intext-pip-bottom",
            "--gexp-intext-pip-z-index",
          ];
          const originalVariables = {};
          cssVariables.forEach((name) => {
            originalVariables[name] = {
              value: playerElement.style?.getPropertyValue?.(name) || "",
              priority: playerElement.style?.getPropertyPriority?.(name) || "",
            };
          });
          const wrapperRect = videoWrapper.getBoundingClientRect?.();
          const wrapperHeight = Number(wrapperRect?.height) || Number(this.lockedHeight) || 0;
          const originalMinHeight = videoWrapper.style?.minHeight || "";
          const explicitHeight = Number.parseFloat(videoWrapper.style?.height || "");
          const minHeightApplied = wrapperHeight > 0 && !(Number.isFinite(explicitHeight) && explicitHeight > 0);
          this._intextPipOriginalInlineStyles = {
            renderToken,
            playerElement,
            videoWrapper,
            originalVariables,
            originalMinHeight,
            minHeightApplied,
          };
          if (minHeightApplied) videoWrapper.style.minHeight = `${wrapperHeight}px`;

          const configuredWidth = this.isIntextPipMobileDevice() ? pip.widthMobile : pip.widthDesktop;
          const viewportWidth = Number(window?.innerWidth);
          const finalWidth = Math.min(
            configuredWidth,
            Number.isFinite(viewportWidth) && viewportWidth > 0
              ? viewportWidth * pip.maxWidthViewportRatio
              : configuredWidth,
          );
          playerElement.style?.setProperty?.("--gexp-intext-pip-width", `${Math.round(finalWidth)}px`);
          playerElement.style?.setProperty?.("--gexp-intext-pip-max-width", `${pip.maxWidthViewportRatio * 100}vw`);
          playerElement.style?.setProperty?.("--gexp-intext-pip-right", `${pip.right}px`);
          playerElement.style?.setProperty?.("--gexp-intext-pip-bottom", `${pip.bottom}px`);
          playerElement.style?.setProperty?.("--gexp-intext-pip-z-index", String(pip.zIndex));
          playerElement.classList?.add?.("gexp-intext-pip-player");
          videoWrapper.classList?.add?.("gexp-intext-pip-active");
          this._intextPipPlayerElement = playerElement;

          if (pip.showCloseButton && !this._intextPipCloseButton) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "gexp-intext-pip-close";
            button.setAttribute("aria-label", "Cerrar reproductor flotante");
            button.textContent = "×";
            this._intextPipCloseHandler = (event) => {
              event.preventDefault();
              event.stopPropagation();
              this.dismissIntextPip();
            };
            button.addEventListener("click", this._intextPipCloseHandler, { once: true });
            playerElement.appendChild(button);
            this._intextPipCloseButton = button;
          }

          this._intextPipState = "floating";
          this._intextPipEnteredAt = Date.now();
          this._intextPipEntryCount += 1;
          const playback = this.getIntextPipPlaybackData();
          this.mergeIntextTelemetry({
            "gexp-intext-pip-enabled": "true",
            "gexp-intext-pip-effective-enabled": "true",
            "gexp-intext-pip-entered": "true",
            "gexp-intext-pip-entry-count": String(this._intextPipEntryCount),
            "gexp-intext-pip-entry-played-pct": playback.playedPct === null ? "unknown" : String(playback.playedPct),
          });
          let multiplePipPlayersDetected = false;
          try {
            multiplePipPlayersDetected =
              document.querySelectorAll?.(".gexp-intext-pip-player")?.length > 1;
          } catch (e) {}
          this.recordIntextPipEvent("video_pip_entered", reason, {
            multiplePipPlayersDetected,
          });
          return true;
        }

        exitIntextPip(reason = "return-inline") {
          const wasFloating = this._intextPipState === "floating";
          const styles = this._intextPipOriginalInlineStyles;
          if (wasFloating && this._intextPipEnteredAt !== null) {
            this._intextPipVisibleMs += Math.max(0, Date.now() - this._intextPipEnteredAt);
          }
          this._intextPipEnteredAt = null;

          const button = this._intextPipCloseButton;
          if (button) {
            try {
              if (this._intextPipCloseHandler) button.removeEventListener("click", this._intextPipCloseHandler);
              button.remove?.();
            } catch (e) {}
          }
          this._intextPipCloseButton = null;
          this._intextPipCloseHandler = null;

          const playerElement = styles?.playerElement || this._intextPipPlayerElement;
          const videoWrapper = styles?.videoWrapper || this.videoContainer?.getElement?.();
          playerElement?.classList?.remove?.("gexp-intext-pip-player");
          videoWrapper?.classList?.remove?.("gexp-intext-pip-active");
          if (styles?.originalVariables && playerElement?.style) {
            Object.entries(styles.originalVariables).forEach(([name, original]) => {
              if (original.value) {
                playerElement.style.setProperty(name, original.value, original.priority);
              } else {
                playerElement.style.removeProperty(name);
              }
            });
          }
          if (styles?.minHeightApplied && videoWrapper?.style) {
            videoWrapper.style.minHeight = styles.originalMinHeight;
          }
          this._intextPipOriginalInlineStyles = null;
          this._intextPipPlayerElement = null;
          this.manager?.releaseActiveIntextPip?.(this);

          if (wasFloating) {
            const playback = this.getIntextPipPlaybackData();
            this._intextPipLastExitPlayedPct = playback.playedPct;
            this.mergeIntextTelemetry({
              "gexp-intext-pip-visible-ms": String(Math.round(this._intextPipVisibleMs)),
              "gexp-intext-pip-last-exit-reason": String(reason),
              "gexp-intext-pip-exit-played-pct": playback.playedPct === null ? "unknown" : String(playback.playedPct),
            });
            this._intextPipState = "inline";
            this.recordIntextPipEvent("video_pip_returned_inline", reason);
            if (reason === "replaced-by-another-slot") {
              this.recordIntextPipEvent("video_pip_replaced", reason);
            }
          }
          return wasFloating;
        }

        dismissIntextPip() {
          const renderToken = this._activeRenderToken;
          if (!this.isActiveRenderToken(renderToken, "dismissIntextPip", "user-dismissed")) return false;
          const wasFloating = this.exitIntextPip("user-dismissed");
          this._intextPipDismissedRenderToken = renderToken;
          this._intextPipState = "dismissed";
          this.mergeIntextTelemetry({ "gexp-intext-pip-dismissed": "true" });
          this.recordIntextPipEvent("video_pip_dismissed", "user-dismissed");
          return wasFloating;
        }

        cleanupIntextPip(reason = "cleanup") {
          const wasFloating = this._intextPipState === "floating";
          this.exitIntextPip(reason);
          if (wasFloating || this._intextPipCloseButton || this._intextPipPlayerElement) {
            this.recordIntextPipEvent("video_pip_cleanup", reason);
          }
          return wasFloating;
        }

        resetIntextPipState(renderToken) {
          this._intextPipState = "inline";
          this._intextPipDismissedRenderToken = null;
          this._intextPipEnteredAt = null;
          this._intextPipVisibleMs = 0;
          this._intextPipEntryCount = 0;
          this._intextPipAnchorEverVisible = false;
          this._intextPipFirstFrameConfirmed = false;
          this._intextPipPlayerRevealed = false;
          this._intextPipCloseButton = null;
          this._intextPipCloseHandler = null;
          this._intextPipPlayerElement = null;
          this._intextPipOriginalInlineStyles = null;
          this._intextPipLastIntersectionRatio = null;
          this._intextPipLastExitPlayedPct = null;
          this._intextPipPlaybackActive = false;
          this._intextPipPlaybackSource = "render-reset";
          return renderToken;
        }

        resetIntextPipForRenderToken(renderToken) {
          this.cleanupIntextPip("stale-render-token");
          return this.resetIntextPipState(renderToken);
        }

        maybeEnterIntextPipFromLastIntersection() {
          const pip = this.getIntextPipConfig();
          if (
            this._intextPipLastIntersectionRatio !== null &&
            this._intextPipLastIntersectionRatio <= pip.enterIntersectionRatio
          ) {
            return this.enterIntextPip("eligibility-confirmed-after-viewport-exit");
          }
          return false;
        }

        handleIntextPipIntersection(entry) {
          if (!entry) return false;
          if (!this.isIntextPipEnabled()) return false;
          const ratio = Number(entry.intersectionRatio);
          this._intextPipLastIntersectionRatio = Number.isFinite(ratio) ? Math.min(1, Math.max(0, ratio)) : 0;
          const pip = this.getIntextPipConfig();
          if (entry.isIntersecting === true && this._intextPipLastIntersectionRatio > pip.enterIntersectionRatio) {
            this._intextPipAnchorEverVisible = true;
          }
          if (this._intextPipState === "floating") {
            if (this._intextPipLastIntersectionRatio >= pip.returnIntersectionRatio) {
              return this.exitIntextPip("anchor-returned");
            }
            return false;
          }
          if (this._intextPipLastIntersectionRatio <= pip.enterIntersectionRatio) {
            return this.enterIntextPip("anchor-left-viewport", entry);
          }
          return false;
        }

        maybeIncrementFallbackBlankControl(event, context = {}) {
          const cfg = this.manager?.getFallbackBlankControlConfig?.() || {};
          const source = String(context.source || "unknown");
          if (cfg.enabled !== true) return false;
          if (Number(this.slotIndex) + 1 !== Number(cfg.slotIndex ?? 1)) return false;
          if (this._nodeActive !== true || !this.manager?.nodes?.includes?.(this)) return false;

          const trigger = context.trigger || "unknown";
          if (trigger !== "fallback") return false;
          if (cfg.ignoreRefresh !== false) {
            const isRefresh =
              this._intextTelemetryCycle?.["gexp-intext-refresh"] === "true" ||
              this.waterfall?.lastTrigger === "refresh" ||
              trigger === "refresh";
            if (isRefresh) return false;
          }
          if (trigger === "house-1x1-refresh") return false;
          if (cfg.onlyFirstLoad !== false && (this._cycleCount || 0) > 0) return false;

          const renderToken = context.renderToken || this._activeRenderToken || 0;
          const cycleId = Number(context.cycleId ?? this._intextTelemetryCycleId ?? 0);
          if (!this.isActiveRenderToken(renderToken, "fallback_blank_control", trigger)) return false;
          if (cycleId !== Number(this._intextTelemetryCycleId || 0)) {
            this.manager?.registerIntextDiagnosticEvent?.({
              diagnosticKey: `stale-fallback-blank-cycle:${this.id}:${cycleId}:${renderToken}`,
              "gexp-intext-diagnostic-context": `expected-cycle:${this._intextTelemetryCycleId}`,
              "slot-id": String(this.id),
              "cycle-id": String(cycleId),
              "render-token": String(renderToken),
            });
            return false;
          }
          const countedKey = `${this.id}:${cycleId}:${renderToken}`;
          if (this._fallbackBlankControlCountedEvents.has(countedKey)) return false;

          const videoFailed =
            this._intextTelemetryCycle?.["gexp-intext-video-failed"] === "true" ||
            this.wa?.cI?.["gexp-intext-video-failed"] === "true";
          const videoToDisplayFallback =
            this._intextTelemetryCycle?.["gexp-intext-is-fallback"] === "true" ||
            this._intextTelemetryCycle?.["gexp-intext-fallback"] === "true" ||
            this.wa?.cI?.["gexp-intext-is-fallback"] === "true" ||
            this.wa?.cI?.["gexp-intext-fallback"] === "true";
          if (cfg.onlyVideoFallbackDisplay !== false && !(videoFailed && videoToDisplayFallback)) return false;

          const house1x1Cfg = this.getHouse1x1AutoRefreshConfig?.();
          const isEmptyDisplay = event?.isEmpty === true;
          const isSentinelHouse =
            this.isHouseLineItemSentinel?.(event) === true ||
            this.isHouse1x1EventMatch?.(event, house1x1Cfg) === true;
          const isHouseDisplay = (() => {
            if (!event || event.isEmpty === true) return false;
            const lineItemType = String(event.lineItemType || "").toLowerCase();
            if (lineItemType === "house") return true;
            try {
              return this.manager?.gexp?.isHouse?.(event.campaignId, event.lineItemId, event.advertiserId) === true;
            } catch (e) {
              return false;
            }
          })();

          const shouldCount =
            (cfg.countEmptyDisplay === true && isEmptyDisplay) ||
            (cfg.countHouseDisplay === true && isHouseDisplay) ||
            (cfg.countSentinelHouse === true && isSentinelHouse);
          if (!shouldCount) return false;

          this._fallbackBlankControlCountedEvents.add(countedKey);
          if (renderToken) this._fallbackBlankControlCountedTokens.add(renderToken);
          const counter = this.manager.incrementFallbackBlankCounter();
          const threshold = Number(cfg.threshold ?? 1);
          const reason = isEmptyDisplay ? "empty-display" : (isSentinelHouse ? "sentinel-house" : "house-display");
          const cookieWrite = counter.cookieWrite || {};
          const eventId = `${this.manager._intextPageInstanceId}:${countedKey}`;
          this.manager.registerIntextFallbackBlankEvent({
            "gexp-intext-fallback-blank-event-id": eventId,
            "gexp-intext-fallback-blank-control-counted": "true",
            "gexp-intext-fallback-blank-control-reason": reason,
            "gexp-intext-fallback-blank-control-source": source,
            "gexp-intext-fallback-blank-control-counter-before": String(counter.counterBefore),
            "gexp-intext-fallback-blank-control-counter-after": String(counter.counterAfter),
            "gexp-intext-fallback-blank-control-count": String(counter.counterAfter),
            "gexp-intext-fallback-blank-control-threshold": String(threshold),
            "gexp-intext-fallback-blank-control-threshold-reached": counter.thresholdReached ? "true" : "false",
            "gexp-intext-fallback-blank-control-cookie-set-attempted": cookieWrite.attempted ? "true" : "false",
            "gexp-intext-fallback-blank-control-cookie-set-confirmed": cookieWrite.confirmed ? "true" : "false",
            "gexp-intext-fallback-blank-control-cookie-set-error": String(cookieWrite.error || "none"),
            "gexp-intext-fallback-blank-control-cookie-set": cookieWrite.confirmed ? "true" : "false",
            "slot-id": String(this.id),
            "slot-index": String(this.slotIndex),
            "cycle-id": String(cycleId),
            "render-token": String(renderToken),
            navIndex: String(this.navIndex || 0),
          }, `fallback-blank:${countedKey}`);
          logIntext(`[Intext:Display:${this.id}] fallback_blank_control_incremented`, {
            counterBefore: counter.counterBefore,
            counterAfter: counter.counterAfter,
            threshold: cfg.threshold,
            source,
            reason,
            cookieSet: cookieWrite.confirmed === true,
            renderToken,
            cycleId,
            isEmptyDisplay,
            isHouseDisplay,
            isSentinelHouse,
          });
          return true;
        }

        beginVisualRender(source = "unknown", trigger = "unknown") {
          if (Number(this._activeRenderToken) > 0) {
            this.cleanupIntextPip("stale-render-token");
          }
          this._renderTokenSeq += 1;
          this._activeRenderToken = this._renderTokenSeq;
          this._renderInProgress = true;
          this._renderCompleted = false;
          this._displayRequestInFlight = false;
          this._lastVisualCycleId = this._intextTelemetryCycleId;
          this._visualState = source;
          this.resetIntextPipState(this._activeRenderToken);
          this.mergeIntextTelemetry({
            "gexp-intext-render-token": String(this._activeRenderToken),
            "gexp-intext-render-attempt": String(this._renderTokenSeq),
            "gexp-intext-visual-state": this._visualState,
          });
          this.applyIntextWrapperDebugAttributes(this.container?.getElement?.(), {
            renderToken: this._activeRenderToken,
            visualState: this._visualState,
          });
          this.applyIntextWrapperDebugAttributes(this.videoContainer?.getElement?.(), {
            renderToken: this._activeRenderToken,
            visualState: this._visualState,
            slotCode: this.videoId || this.id,
          });
          return this._activeRenderToken;
        }

        completeVisualRender(renderToken, source = "unknown") {
          if (!this.isActiveRenderToken(renderToken, source)) return false;
          this._renderInProgress = false;
          this._renderCompleted = true;
          this._visualState = source;
          this.mergeIntextTelemetry({ "gexp-intext-visual-state": this._visualState });
          this.applyIntextWrapperDebugAttributes(this.container?.getElement?.(), {
            renderToken,
            visualState: this._visualState,
          });
          return true;
        }

        invalidateVisualCallbacks(source = "unknown") {
          this.cleanupIntextPip(source === "reset" ? "reset" : "stale-render-token");
          this._destroyedOrResetToken += 1;
          this._renderTokenSeq += 1;
          this._activeRenderToken = this._renderTokenSeq;
          this._renderInProgress = false;
          this._renderCompleted = false;
          this._displayRequestInFlight = false;
          this._visualState = source;
          this.clearRenderTimers();
          this.mergeIntextTelemetry({
            "gexp-intext-render-token": String(this._activeRenderToken),
            "gexp-intext-visual-state": this._visualState,
          });
          logIntext(`[Intext:Display:${this.id}] intext_node_reset_callbacks_invalidated`, {
            slotCode: this.id,
            activeToken: this._activeRenderToken,
            cycleId: this._intextTelemetryCycleId,
            visualState: this._visualState,
          });
        }

        logStaleRenderCallback(source, oldToken, trigger = "unknown", extra = {}) {
          const payload = {
            slotCode: this.id,
            source,
            oldToken,
            activeToken: this._activeRenderToken,
            cycleId: this._intextTelemetryCycleId,
            trigger,
            visualState: this._visualState,
            ...extra,
          };
          logIntext(`[Intext:Display:${this.id}] stale_render_callback_ignored`, payload);
          this.mergeIntextTelemetry({
            "gexp-intext-stale-render-ignored": "true",
            "gexp-intext-stale-render-source": source,
            "gexp-intext-visual-state": this._visualState,
          });
          this.manager?.registerIntextDiagnosticEvent?.({
            diagnosticKey: `stale-callback:${this.id}:${this._intextTelemetryCycleId}:${oldToken}:${source}`,
            "gexp-intext-diagnostic-context": String(source),
            "slot-id": String(this.id),
            "cycle-id": String(this._intextTelemetryCycleId || 0),
            "render-token": String(oldToken || "missing"),
          });
        }

        isActiveRenderToken(renderToken, source = "unknown", trigger = "unknown") {
          if (this._nodeActive !== true || !renderToken || renderToken !== this._activeRenderToken) {
            this.logStaleRenderCallback(source, renderToken || "missing", trigger);
            return false;
          }
          return true;
        }

        trackRenderTimer(timerId) {
          if (!timerId) return timerId;
          this._renderTimers.push(timerId);
          return timerId;
        }

        clearRenderTimers() {
          if (Array.isArray(this._renderTimers)) {
            this._renderTimers.forEach((timerId) => clearTimeout(timerId));
          }
          this._renderTimers = [];
        }

        applyIntextWrapperDebugAttributes(el, {
          renderToken = this._activeRenderToken,
          visualState = this._visualState,
          slotCode = this.id,
        } = {}) {
          if (!el?.dataset) return;
          el.dataset.gexpIntextSlot = String(slotCode || this.id || "unknown").replace(/-video$/, "");
          el.dataset.gexpIntextNodeId = this.getIntextNodeId();
          el.dataset.gexpIntextPlacementIndex = String(this.getIntextPlacementIndex() ?? "unknown");
          el.dataset.gexpIntextCycleId = String(this._intextTelemetryCycleId || 0);
          el.dataset.gexpIntextRenderToken = String(renderToken || 0);
          el.dataset.gexpIntextVisualState = String(visualState || "unknown");
        }

        findIntextWrappersForNode() {
          if (typeof document === "undefined") return [];
          const baseSlot = String(this.id || "").replace(/-video$/, "");
          return Array.from(document.querySelectorAll(".gexp-intext-slot")).filter((el) => {
            if (el.dataset?.gexpIntextFormat === "video" || /-video$/.test(el.id || "")) return false;
            const slot = String(el.dataset?.gexpIntextSlot || el.id || "").replace(/-video$/, "");
            const nodeId = String(el.dataset?.gexpIntextNodeId || "");
            return slot === baseSlot || nodeId === this.getIntextNodeId() || el.id === this.id;
          });
        }

        ensureSingleIntextWrapper(preferredEl = null, {
          source = "unknown",
          renderToken = this._activeRenderToken,
          visualState = this._visualState,
        } = {}) {
          const wrappers = this.findIntextWrappersForNode().filter((el) => el?.isConnected);
          const duplicateCount = Math.max(0, wrappers.length - 1);
          if (duplicateCount > 0) {
            logIntext(`[Intext:Display:${this.id}] duplicate_intext_wrapper_detected`, {
              slotCode: this.id,
              source,
              duplicateCount,
              renderToken,
              cycleId: this._intextTelemetryCycleId,
            });
            this.mergeIntextTelemetry({
              "gexp-intext-duplicate-wrapper-count": String(duplicateCount),
            });
          }

          const preferred =
            preferredEl ||
            wrappers.find((el) => String(el.dataset?.gexpIntextRenderToken || "") === String(renderToken)) ||
            wrappers.find((el) => el.id === this.id) ||
            wrappers[0] ||
            null;

          wrappers.forEach((el) => {
            if (!el || el === preferred) return;
            const token = String(el.dataset?.gexpIntextRenderToken || "0");
            const isStale =
              token !== String(renderToken) ||
              el.dataset?.gexpIntextVisualState === "stale" ||
              el.dataset?.gexpIntextVisualState === "destroyed";
            if (isStale) {
              logIntext(`[Intext:Display:${this.id}] duplicate_intext_wrapper_stale_removed`, {
                slotCode: this.id,
                source,
                oldToken: token,
                activeToken: renderToken,
                cycleId: this._intextTelemetryCycleId,
              });
              this.mergeIntextTelemetry({ "gexp-intext-stale-wrapper-removed": "true" });
              el.dataset.gexpIntextVisualState = "stale";
              el.style.transition = "none";
              el.style.display = "none";
              el.remove();
            } else {
              logIntext(`[Intext:Display:${this.id}] duplicate_intext_wrapper_creation_blocked`, {
                slotCode: this.id,
                source,
                renderToken,
                cycleId: this._intextTelemetryCycleId,
              });
            }
          });

          if (preferred) {
            if (preferred !== preferredEl && duplicateCount > 0) {
              logIntext(`[Intext:Display:${this.id}] duplicate_intext_wrapper_reused`, {
                slotCode: this.id,
                source,
                renderToken,
                cycleId: this._intextTelemetryCycleId,
              });
              this.mergeIntextTelemetry({ "gexp-intext-wrapper-reused": "true" });
            }
            this.applyIntextWrapperDebugAttributes(preferred, { renderToken, visualState });
          }
          return preferred;
        }

        ensureSingleVisibleIntextSurface(activeFormat, renderToken = this._activeRenderToken, source = "unknown") {
          if (!this.isActiveRenderToken(renderToken, `ensureSingleVisibleIntextSurface:${source}`, this.waterfall?.lastTrigger || "unknown")) {
            return false;
          }

          const hideSurface = (el, format) => {
            if (!el?.isConnected) return;
            el.style.transition = "none";
            el.style.display = "none";
            el.style.height = "0px";
            el.style.minHeight = "0px";
            el.style.opacity = "0";
            el.classList.remove("is-open");
            const loader = el.querySelector(".gexp-intext-loader");
            if (loader) loader.style.display = "none";
            if (format === "display") {
              el.style.margin = "0";
              el.style.padding = "0";
            }
          };

          if (activeFormat === "display") {
            hideSurface(this.videoContainer?.getElement?.(), "video");
            return true;
          }

          if (activeFormat === "video") {
            hideSurface(this.container?.getElement?.(), "display");
            return true;
          }

          return false;
        }

        resolveTransitionPreservedHeight(...candidates) {
          const standardHeight = this.getDisplayStandardContentHeight();
          for (const candidate of candidates) {
            if (!candidate) continue;
            const direct = typeof candidate === "number" ? candidate : 0;
            const dataset = candidate?.dataset || {};
            const values = [
              direct,
              parseInt(dataset.gexpIntextContentHeight, 10) || 0,
              parseInt(dataset.lockedHeight, 10) || 0,
              parseInt(dataset.gexpIntextTotalHeight, 10) || 0,
              candidate?.offsetHeight ? Math.max(0, candidate.offsetHeight - this.getWrapperChromeHeight()) : 0,
            ];
            const normalized = values.find((value) => value >= this.getDisplayExpandedContentHeight())
              || values.find((value) => value >= standardHeight)
              || 0;
            if (normalized >= this.getDisplayExpandedContentHeight()) return this.getDisplayExpandedContentHeight();
            if (normalized >= standardHeight) return standardHeight;
          }
          if (this.lockedHeight >= this.getDisplayExpandedContentHeight()) return this.getDisplayExpandedContentHeight();
          return standardHeight;
        }

        ensureTransitionLoader(surfaceEl, {
          text = "Recuperando anuncio",
          source = "unknown",
          renderToken = this._activeRenderToken,
        } = {}) {
          if (!surfaceEl?.isConnected) return null;
          let loader = Array.from(surfaceEl.children || []).find((child) => child.classList?.contains("gexp-intext-loader"))
            || surfaceEl.querySelector(".gexp-intext-loader");
          if (!loader) {
            surfaceEl.insertAdjacentHTML("beforeend", '<div class="gexp-intext-loader"><div class="gexp-intext-spinner"></div><div class="gexp-intext-loader-text">Recuperando anuncio</div></div>');
            loader = surfaceEl.querySelector(".gexp-intext-loader");
          }
          const loaderText = loader?.querySelector(".gexp-intext-loader-text");
          if (loaderText) loaderText.textContent = text;
          if (loader) {
            loader.style.display = "flex";
            loader.dataset.gexpIntextTransitionLoader = "true";
          }
          surfaceEl.dataset.gexpIntextTransitionLoaderActive = "true";
          logIntext(`[Intext:Display:${this.id}] intext_transition_bridge_loader_visible`, {
            slotCode: this.id,
            renderToken,
            source,
            loaderVisible: Boolean(loader),
          });
          this.mergeIntextTelemetry({
            "gexp-intext-transition-bridge-loader-visible": "true",
          });
          return loader;
        }

        findDisplayCreativeSurface(slotDoc) {
          if (!slotDoc?.isConnected) return null;
          const candidates = [
            slotDoc.querySelector('iframe[id*="google_ads_iframe"]'),
            slotDoc.querySelector('iframe[name*="google_ads_iframe"]'),
            slotDoc.querySelector('div[id^="google_ads_iframe"] iframe'),
            slotDoc.querySelector("iframe"),
            slotDoc.querySelector('div[id^="google_ads_iframe"]'),
          ].filter(Boolean);

          Array.from(slotDoc.children || []).forEach((child) => {
            if (child && !candidates.includes(child)) candidates.push(child);
          });

          return candidates.find((candidate) => {
            if (!candidate || candidate === slotDoc) return false;
            if (candidate.classList?.contains("gexp-intext-loader")) return false;
            if (candidate.closest?.(".gexp-intext-loader")) return false;
            if (candidate.classList?.contains("gexp-intext-slot")) return false;
            return candidate.isConnected;
          }) || null;
        }

        hideOppositeTransitionSurface(surfaceEl, surfaceName, {
          renderToken = this._activeRenderToken,
          source = "unknown",
        } = {}) {
          if (!surfaceEl?.isConnected) return;
          delete surfaceEl.dataset.gexpIntextTransitionBridgeActive;
          delete surfaceEl.dataset.gexpIntextTransitionLoaderActive;
          surfaceEl.style.transition = "none";
          surfaceEl.style.display = "none";
          surfaceEl.style.opacity = "0";
          surfaceEl.classList.remove("is-open");
          surfaceEl.setAttribute("aria-hidden", "true");
          const loader = surfaceEl.querySelector(".gexp-intext-loader");
          if (loader) loader.style.display = "none";
          if (surfaceName === "display") {
            this.container.isOpen = false;
          } else if (this.videoContainer) {
            this.videoContainer.isOpen = false;
          }
          logIntext(`[Intext:Display:${this.id}] intext_transition_bridge_opposite_surface_hidden`, {
            slotCode: this.id,
            renderToken,
            source,
            hiddenSurface: surfaceName,
          });
        }

        recreateDisplayBridgeWrapper(renderToken, source, preservedHeight) {
          const slotEl = this.manager.createWrapperNode(this.id, "display");
          this.applyIntextWrapperDebugAttributes(slotEl, {
            renderToken,
            visualState: "transition_bridge",
          });
          const videoEl = this.videoContainer?.getElement?.();
          if (videoEl?.parentNode) {
            videoEl.parentNode.insertBefore(slotEl, videoEl);
          } else if (this.placement?.paragraph?.parentNode) {
            this.placement.paragraph.parentNode.insertBefore(slotEl, this.placement.paragraph.nextSibling);
          }
          if (this.container && typeof this.container.setElement === "function") {
            this.container.setElement(slotEl);
          }
          this.applyDisplayWrapperHeight(slotEl, preservedHeight, {
            logReason: preservedHeight === 600 ? "display_300x600_visual_height_adjusted" : "",
            source,
          });
          slotEl.classList.add("is-open");
          slotEl.style.display = "";
          slotEl.style.opacity = "1";
          slotEl.style.margin = "";
          slotEl.style.padding = "";
          slotEl.setAttribute("aria-hidden", "false");
          this.container.isOpen = true;
          this.ensureTransitionLoader(slotEl, { source, renderToken });
          logIntext(`[Intext:Display:${this.id}] intext_transition_bridge_no_surface_recreated_display`, {
            slotCode: this.id,
            renderToken,
            source,
            preservedHeight,
          });
          return slotEl;
        }

        ensureIntextTransitionBridge({
          preferredSurface = "display",
          fallbackSurface = "video",
          renderToken = this._activeRenderToken,
          source = "unknown",
          preservedHeight = null,
          loaderText = "Recuperando anuncio",
        } = {}) {
          if (renderToken && !this.isActiveRenderToken(renderToken, `ensureIntextTransitionBridge:${source}`, this.waterfall?.lastTrigger || "unknown")) {
            return null;
          }

          const displayEl = this.container?.getElement?.();
          const videoEl = this.videoContainer?.getElement?.();
          const displayConnected = Boolean(displayEl?.isConnected);
          const videoConnected = Boolean(videoEl?.isConnected);
          const height = this.resolveTransitionPreservedHeight(
            preservedHeight,
            displayEl,
            videoEl,
            this.lockedHeight,
          );
          logIntext(`[Intext:Display:${this.id}] intext_transition_bridge_started`, {
            slotCode: this.id,
            renderToken,
            source,
            preferredSurface,
            fallbackSurface,
            preservedHeight: height,
            displayConnected,
            videoConnected,
          });

          let bridgeSurface = null;
          let bridgeEl = null;
          let recreated = false;
          if (preferredSurface === "display" && displayConnected) {
            bridgeSurface = "display";
            bridgeEl = displayEl;
          } else if (fallbackSurface === "video" && videoConnected) {
            bridgeSurface = "video";
            bridgeEl = videoEl;
          } else if (displayConnected) {
            bridgeSurface = "display";
            bridgeEl = displayEl;
          } else if (videoConnected) {
            bridgeSurface = "video";
            bridgeEl = videoEl;
          } else {
            bridgeSurface = "display-recreated";
            bridgeEl = this.recreateDisplayBridgeWrapper(renderToken, source, height);
            recreated = true;
          }

          if (!bridgeEl) return null;
          logIntext(`[Intext:Display:${this.id}] intext_transition_bridge_surface_selected`, {
            slotCode: this.id,
            renderToken,
            source,
            bridgeSurface,
            preservedHeight: height,
            displayConnected,
            videoConnected,
          });

          this.applyDisplayWrapperHeight(bridgeEl, height, {
            logReason: height === 600 ? "display_300x600_visual_height_adjusted" : "",
            source,
          });
          bridgeEl.classList.add("is-open");
          bridgeEl.style.display = "";
          bridgeEl.style.opacity = "1";
          bridgeEl.style.margin = bridgeSurface === "display" || bridgeSurface === "display-recreated" ? "" : bridgeEl.style.margin;
          bridgeEl.style.padding = bridgeSurface === "display" || bridgeSurface === "display-recreated" ? "" : bridgeEl.style.padding;
          bridgeEl.setAttribute("aria-hidden", "false");
          bridgeEl.dataset.gexpIntextTransitionBridgeActive = "true";
          bridgeEl.dataset.gexpIntextTransitionBridgeSurface = bridgeSurface;
          bridgeEl.dataset.gexpIntextTransitionBridgeHeight = String(height);
          this.ensureTransitionLoader(bridgeEl, { text: loaderText, source, renderToken });

          if (bridgeSurface === "display" || bridgeSurface === "display-recreated") {
            this.container.isOpen = true;
            if (videoConnected) this.hideOppositeTransitionSurface(videoEl, "video", { renderToken, source });
          } else {
            this.videoContainer.isOpen = true;
            if (displayConnected) this.hideOppositeTransitionSurface(displayEl, "display", { renderToken, source });
          }

          this._intextTransitionBridge = {
            active: true,
            surface: bridgeSurface,
            renderToken,
            source,
            preservedHeight: height,
          };
          this.mergeIntextTelemetry({
            "gexp-intext-transition-bridge-active": "true",
            "gexp-intext-transition-bridge-surface": bridgeSurface,
            "gexp-intext-transition-bridge-height": String(height),
            "gexp-intext-transition-bridge-loader-visible": "true",
            "gexp-intext-transition-bridge-wrapper-recreated": recreated ? "true" : "false",
          });
          logIntext(`[Intext:Display:${this.id}] intext_transition_bridge_height_preserved`, {
            slotCode: this.id,
            renderToken,
            source,
            bridgeSurface,
            preservedHeight: height,
          });
          return { bridgeSurface, bridgeEl, preservedHeight: height, recreated };
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

        getDisplayStandardContentHeight() {
          return 345;
        }

        getDisplayExpandedContentHeight() {
          return 600;
        }

        getDisplayEffectiveLock(currentEl = null) {
          const nodeLockedHeight = parseInt(this.lockedHeight, 10) || 0;
          const datasetLockedHeight = parseInt(currentEl?.dataset?.lockedHeight, 10) || 0;
          return Math.max(nodeLockedHeight, datasetLockedHeight) >= this.getDisplayExpandedContentHeight()
            ? this.getDisplayExpandedContentHeight()
            : this.getDisplayStandardContentHeight();
        }

        normalizeDisplayContentHeight(contentHeight, currentEl = null, source = "unknown") {
          const standardHeight = this.getDisplayStandardContentHeight();
          const expandedHeight = this.getDisplayExpandedContentHeight();
          const persistedLock = Math.max(
            parseInt(this.lockedHeight, 10) || 0,
            parseInt(currentEl?.dataset?.lockedHeight, 10) || 0,
          );
          const previousHeight = parseInt(currentEl?.dataset?.gexpIntextContentHeight, 10) || 0;
          const rawRequestedHeight = parseInt(contentHeight, 10) || 0;
          const requestedHeight =
            rawRequestedHeight ||
            (previousHeight === expandedHeight ? previousHeight : 0) ||
            (persistedLock >= expandedHeight ? expandedHeight : standardHeight);

          if (persistedLock >= expandedHeight || requestedHeight >= expandedHeight) {
            if (requestedHeight < expandedHeight) {
              logIntext(
                `[Intext:Display:${this.id}] display_height_compression_rejected_600 - attempted_height=${requestedHeight}, min_height=${expandedHeight}, source=${source}`,
              );
            }
            return {
              contentHeight: expandedHeight,
              effectiveLock: expandedHeight,
              persistedLock: expandedHeight,
              requestedHeight,
            };
          }

          if (requestedHeight !== standardHeight) {
            if (requestedHeight < standardHeight) {
              logIntext(
                `[Intext:Display:${this.id}] display_height_compression_rejected_standard - attempted_height=${requestedHeight}, min_height=${standardHeight}, source=${source}`,
              );
              logIntext(
                `[Intext:Display:${this.id}] display_height_compression_rejected_to_standard - attempted_height=${requestedHeight}, standard_height=${standardHeight}, source=${source}`,
              );
            } else {
              logIntext(
                `[Intext:Display:${this.id}] display_height_base_standard_enforced - attempted_height=${requestedHeight}, base_height=${standardHeight}, source=${source}`,
              );
            }
            logIntext(
              `[Intext:Display:${this.id}] display_height_normalized_to_standard - attempted_height=${requestedHeight}, content_height=${standardHeight}, total_height=${standardHeight + this.getWrapperChromeHeight()}, source=${source}`,
            );
          }

          return {
            contentHeight: standardHeight,
            effectiveLock: standardHeight,
            persistedLock: 0,
            requestedHeight,
          };
        }

        getPreservedRefreshHeight(currentEl) {
          const nodeLockedHeight = parseInt(this.lockedHeight, 10) || 0;
          const datasetLockedHeight = parseInt(currentEl?.dataset?.lockedHeight, 10) || 0;
          const chromeHeight = this.getWrapperChromeHeight();
          const rawOffsetHeight = currentEl?.offsetHeight || 0;
          const currentOffsetHeight = rawOffsetHeight > chromeHeight
            ? Math.max(rawOffsetHeight - chromeHeight, 0)
            : rawOffsetHeight;

          let preservedHeight = this.getDisplayStandardContentHeight();
          let lockSource = "default_345";

          if (nodeLockedHeight >= this.getDisplayExpandedContentHeight()) {
            preservedHeight = nodeLockedHeight;
            lockSource = "this.node.lockedHeight";
          } else if (datasetLockedHeight >= this.getDisplayExpandedContentHeight()) {
            preservedHeight = datasetLockedHeight;
            lockSource = "el.dataset.lockedHeight";
          } else if (currentOffsetHeight >= this.getDisplayExpandedContentHeight()) {
            preservedHeight = currentOffsetHeight;
            lockSource = "currentEl.offsetHeight";
          } else if (currentOffsetHeight > 0 && currentOffsetHeight < this.getDisplayStandardContentHeight()) {
            logIntext(
              `[Intext:Display:${this.id}] display_height_compression_rejected_to_standard - attempted_height=${currentOffsetHeight}, standard_height=${this.getDisplayStandardContentHeight()}, source=getPreservedRefreshHeight:currentEl.offsetHeight`,
            );
          }

          const normalizedState = this.normalizeDisplayContentHeight(
            preservedHeight,
            currentEl,
            `getPreservedRefreshHeight:${lockSource}`,
          );
          preservedHeight = normalizedState.contentHeight;

          if (normalizedState.persistedLock === 600) {
            if (preservedHeight < this.getDisplayExpandedContentHeight()) {
              logIntext(`[Intext:Display:${this.id}] display_height_lock_restored_600`);
            }
            this.markDisplayHeightLock(600, currentEl);
          }

          logIntext(
            `[Intext:Display:${this.id}] display_refresh_lock_source - source=${lockSource}, height=${preservedHeight}, effective_lock=${normalizedState.effectiveLock}`,
          );

          return preservedHeight;
        }

        getWrapperChromeHeight() {
          return 15;
        }

        getDisplayWrapperTotalHeight(contentHeight, logReason = "") {
          const numericHeight = parseInt(contentHeight, 10) || 0;
          if (!(numericHeight > 0)) return 0;
          const totalHeight = numericHeight + this.getWrapperChromeHeight();
          if (logReason) {
            logIntext(
              `[Intext:Display:${this.id}] ${logReason} - content_height=${numericHeight}, total_height=${totalHeight}`,
            );
          }
          logIntext(
            `[Intext:Display:${this.id}] display_wrapper_total_height_applied - content_height=${numericHeight}, total_height=${totalHeight}`,
          );
          return totalHeight;
        }

        getSlotTargetingMapSafe(slot = null) {
          const targetSlot = slot || this.slot;
          if (!targetSlot || typeof targetSlot.getTargetingKeys !== "function") return {};
          const targeting = {};
          try {
            targetSlot.getTargetingKeys().forEach((key) => {
              const values = targetSlot.getTargeting(key);
              if (!values || values.length === 0) return;
              targeting[key] = values.length === 1 ? values[0] : values.map(String);
            });
          } catch (e) {}
          return targeting;
        }

        normalizeHbValue(value) {
          if (Array.isArray(value)) value = value[0];
          if (value === undefined || value === null || value === "") return null;
          return String(value);
        }

        getIntextTelemetryElement() {
          try {
            if (this.telemetryAnchor) return this.telemetryAnchor;
            if (this.placement?.paragraph) return this.placement.paragraph;
            const displayEl = this.container?.getElement?.() || null;
            const videoEl = this.videoContainer?.getElement?.() || null;
            if (this.state === "video") return videoEl || displayEl;
            return displayEl || videoEl;
          } catch (e) {
            return null;
          }
        }

        getIntextTelemetryElementMeta(el = null) {
          try {
            const target = el || this.getIntextTelemetryElement();
            let type = "wrapper";
            if (target && target === this.telemetryAnchor) type = "anchor";
            else if (target && target === this.placement?.paragraph) type = "paragraph";
            const rect = target?.getBoundingClientRect?.();
            return {
              "gexp-intext-observer-target": type,
              "gexp-intext-observer-target-height": rect ? String(Math.round(rect.height || 0)) : "unknown",
              "gexp-intext-observer-target-top": rect ? String(Math.round(rect.top || 0)) : "unknown",
            };
          } catch (e) {
            return {
              "gexp-intext-observer-target": "wrapper",
              "gexp-intext-observer-target-height": "unknown",
              "gexp-intext-observer-target-top": "unknown",
            };
          }
        }

        getIntextDistancePx() {
          try {
            const el = this.getIntextTelemetryElement();
            if (!el || typeof el.getBoundingClientRect !== "function") return null;
            const rect = el.getBoundingClientRect();
            if (!rect) return null;
            return Math.round(rect.top);
          } catch (e) {
            return null;
          }
        }

        getIntextOffYTelemetry(prefix) {
          try {
            if (typeof this.waterfall?.getIntextOffYTelemetry === "function") {
              return this.waterfall.getIntextOffYTelemetry(prefix);
            }
          } catch (e) { }
          return {
            [`${prefix}-sl-off-y`]: "unknown",
            [`${prefix}-us-off-y`]: "unknown",
          };
        }

        getIntextExpectedViewability(offYTelemetry, prefix, trigger) {
          try {
            if (typeof this.waterfall?.getIntextExpectedViewability === "function") {
              return this.waterfall.getIntextExpectedViewability(offYTelemetry, prefix, trigger);
            }
          } catch (e) { }
          return "unknown";
        }

        markIntextRealRenderTelemetry(phase, trigger = "unknown") {
          try {
            const renderToken = this._activeRenderToken || 0;
            if (renderToken && this._intextRealRenderTelemetryCommittedForToken === renderToken) return;
            this._intextRealRenderTelemetryCommittedForToken = renderToken || `cycle-${this._intextTelemetryCycleId || 0}`;

            const realRenderOffYTelemetry = this.getIntextOffYTelemetry("gexp-intext-real-render");
            const realRenderExpectedViewability = this.getIntextExpectedViewability(
              realRenderOffYTelemetry,
              "gexp-intext-real-render",
              trigger,
            );
            const now = Date.now();
            const fetchStartAt =
              this.waterfall?.fetchStartAt ||
              this.fetchStartAt ||
              null;
            const renderStartAt =
              this.waterfall?.renderStartAt ||
              this.renderStartAt ||
              null;
            const fetchToRealRenderMs =
              fetchStartAt ? Math.max(0, now - fetchStartAt) : null;
            const renderToRealRenderMs =
              renderStartAt ? Math.max(0, now - renderStartAt) : null;

            this.mergeIntextTelemetry({
              "gexp-intext-real-render-phase": String(phase || "unknown"),
              ...realRenderOffYTelemetry,
              "gexp-intext-real-render-ev": realRenderExpectedViewability,
              "gexp-intext-fetch-to-real-render-ms": fetchToRealRenderMs !== null ? String(fetchToRealRenderMs) : "unknown",
              "gexp-intext-render-to-real-render-ms": renderToRealRenderMs !== null ? String(renderToRealRenderMs) : "unknown",
            });
            this.flushIntextTelemetryToCI?.();

            if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
              intextDebugCollector.recordTimeline("render-logical", {
                node: this,
                format: this.state === "video" ? "video" : (this.state === "display" ? "display" : "unknown"),
                phase,
                state: this.state,
                eventPhase: phase,
                trigger,
                element: this.getActiveVisibleIntextWrapper?.(),
              });
            }

            if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
              logIntext(`[Intext:Telemetry:${this.id || this.node?.id}] real_render_telemetry`, {
                phase,
                usOffY: realRenderOffYTelemetry["gexp-intext-real-render-us-off-y"],
                ev: realRenderExpectedViewability,
                fetchToRealRenderMs,
                renderToRealRenderMs,
              });
            }
          } catch (e) { }
        }

        getDisplayCreativeSizeFromEvent(event) {
          try {
            if (!event?.size || event.size.length < 2) return "unknown";
            const width = parseInt(event.size[0], 10) || 0;
            const height = parseInt(event.size[1], 10) || 0;
            if (width <= 0 || height <= 0) return "unknown";
            if (width === 1 && height === 1) {
              const bidSize = this.getBidSize(this.waterfall?._lastDisplayBid || null);
              if (bidSize && /^\d+x\d+$/.test(String(bidSize)) && bidSize !== "1x1") {
                return String(bidSize);
              }
            }
            return `${width}x${height}`;
          } catch (e) {
            return "unknown";
          }
        }

        getDisplayGamEventSize(event) {
          try {
            if (!event?.size || event.size.length < 2) return "unknown";
            const width = parseInt(event.size[0], 10) || 0;
            const height = parseInt(event.size[1], 10) || 0;
            return width > 0 && height > 0 ? `${width}x${height}` : "unknown";
          } catch (e) {
            return "unknown";
          }
        }

        classifyDisplayLayout(renderSize = null, currentEl = null) {
          const creativeWidth = parseInt(renderSize?.gamWidth, 10) || 0;
          const creativeHeight = parseInt(renderSize?.gamHeight, 10) || 0;
          const renderWidth = creativeWidth || parseInt(currentEl?.clientWidth, 10) || 0;
          const renderHeight =
            parseInt(renderSize?.actualHeight, 10) ||
            creativeHeight ||
            parseInt(currentEl?.dataset?.gexpIntextContentHeight, 10) ||
            0;
          const lockedHeight = Math.max(
            parseInt(this.lockedHeight, 10) || 0,
            parseInt(currentEl?.dataset?.lockedHeight, 10) || 0,
          );
          const contentHeight =
            parseInt(currentEl?.dataset?.gexpIntextContentHeight, 10) ||
            renderHeight ||
            0;
          const isWide = creativeWidth >= 900 || renderWidth >= 900;
          const isTall =
            creativeHeight >= 540 ||
            renderHeight >= 540 ||
            lockedHeight >= 540 ||
            contentHeight >= 540;
          let layoutKind = "standard";
          if (isWide && isTall) layoutKind = "wide-tall";
          else if (isWide) layoutKind = "wide-standard";
          else if (isTall) layoutKind = "tall";
          return {
            layoutKind,
            isWide,
            isTall,
            creativeWidth,
            creativeHeight,
            renderWidth,
            renderHeight,
            lockedHeight,
            contentHeight,
          };
        }

        getDisplaySpecialCreativeProfile(width, height) {
          const sourceWidth = parseInt(width, 10) || 0;
          const sourceHeight = parseInt(height, 10) || 0;
          const key = `${sourceWidth}x${sourceHeight}`;
          const profiles = {
            "970x90": "wide-horizontal-special",
            "980x90": "wide-horizontal-special",
            "970x250": "wide-medium-special",
            "980x250": "wide-medium-special",
            "120x600": "tall-narrow-special",
            "120x1000": "tall-narrow-special",
          };
          const layoutKind = profiles[key];
          if (!layoutKind) {
            return {
              isSpecial: false,
              reason: sourceWidth > 0 && sourceHeight > 0 ? "size-not-whitelisted" : "invalid-size",
              sourceWidth,
              sourceHeight,
            };
          }
          return {
            isSpecial: true,
            layoutKind,
            sourceWidth,
            sourceHeight,
            centerX: true,
            centerY: true,
            preserveSlotHeight: true,
          };
        }

        getDisplaySpecialCreativeTelemetry(profile = null, applied = false, scaleFactor = null, targetContentHeight = null) {
          const size = profile?.sourceWidth && profile?.sourceHeight
            ? `${profile.sourceWidth}x${profile.sourceHeight}`
            : "unknown";
          return {
            "gexp-intext-special-creative-layout": profile?.isSpecial ? profile.layoutKind : "none",
            "gexp-intext-special-creative-size": size,
            "gexp-intext-special-creative-scale": scaleFactor !== null && scaleFactor !== undefined ? String(scaleFactor) : "none",
            "gexp-intext-special-creative-source-width": String(profile?.sourceWidth || 0),
            "gexp-intext-special-creative-source-height": String(profile?.sourceHeight || 0),
            "gexp-intext-special-creative-target-height": targetContentHeight !== null && targetContentHeight !== undefined ? String(targetContentHeight) : "none",
            "gexp-intext-special-creative-applied": applied ? "true" : "false",
          };
        }

        getDisplayLayoutTelemetry(renderSize = null) {
          const measuredWidth = parseInt(this.container?.getElement?.()?.clientWidth, 10) || 300;
          const width = parseInt(renderSize?.gamWidth, 10) || measuredWidth;
          const height = parseInt(renderSize?.actualHeight, 10) || parseInt(renderSize?.gamHeight, 10) || 0;
          let layout = renderSize?.layout === "960x540" ? "expanded" : (renderSize?.layout || "unknown");
          if (layout === "event_size") {
            layout = height >= this.getDisplayExpandedContentHeight() ? "expanded" : "standard";
          }
          const classified = this.classifyDisplayLayout(renderSize, this.container?.getElement?.());
          return {
            "gexp-intext-layout-size": width > 0 && height > 0 ? `${width}x${height}` : "unknown",
            "gexp-intext-render-layout": ["standard", "expanded", "recovered"].includes(layout) ? layout : (renderSize?.recovered ? "recovered" : "unknown"),
            "gexp-intext-size-recovered": renderSize?.recovered ? "true" : "false",
            "gexp-intext-layout-kind": classified.layoutKind,
            "gexp-intext-render-layout-width": String(classified.creativeWidth || classified.renderWidth || width || 0),
            "gexp-intext-render-layout-height": String(classified.creativeHeight || classified.renderHeight || height || 0),
            "gexp-intext-layout-locked-height": String(classified.lockedHeight || 0),
            "gexp-intext-wide-layout-mode": classified.isWide ? classified.layoutKind : "none",
          };
        }

        getHouse1x1AutoRefreshConfig() {
          return this.config?.refreshCycle?.house1x1AutoRefresh || null;
        }

        getHouse1x1EventIdMatch(event, cfg) {
          const asStrings = (values) => Array.isArray(values) ? values.map((value) => String(value)) : [];
          const advertiserIds = asStrings(cfg?.advertiserIds);
          const campaignIds = asStrings(cfg?.campaignIds);
          const lineItemIds = asStrings(cfg?.lineItemIds);
          const hasConfiguredIds = advertiserIds.length || campaignIds.length || lineItemIds.length;
          const advertiserId = event?.advertiserId != null ? String(event.advertiserId) : "";
          const campaignId = event?.campaignId != null ? String(event.campaignId) : "";
          const lineItemId = event?.lineItemId != null ? String(event.lineItemId) : "";
          const configuredMatch =
            (advertiserId && advertiserIds.includes(advertiserId)) ||
            (campaignId && campaignIds.includes(campaignId)) ||
            (lineItemId && lineItemIds.includes(lineItemId));
          return {
            hasConfiguredIds: Boolean(hasConfiguredIds),
            configuredMatch: Boolean(configuredMatch),
            advertiserId,
            campaignId,
            lineItemId,
          };
        }

        isHouseLineItemSentinel(event) {
          const cfg = this.getHouse1x1AutoRefreshConfig();
          const lineItemIds = Array.isArray(cfg?.lineItemIds) ? cfg.lineItemIds.map((value) => String(value)) : [];
          const lineItemId = event?.lineItemId != null ? String(event.lineItemId) : "";
          return Boolean(lineItemId && lineItemIds.includes(lineItemId));
        }

        getHouseLineItemSentinelTelemetry(event, extra = {}) {
          const renderSize = this.resolveDisplayRenderSizeFromEvent(event, "house_lineitem_sentinel");
          return {
            "gexp-intext-type": "technical-sentinel",
            "gexp-intext-sentinel": "true",
            "gexp-intext-sentinel-lineitem": event?.lineItemId != null ? String(event.lineItemId) : "unknown",
            "gexp-intext-render-suppressed": "true",
            "gexp-intext-house-1x1-refresh": "true",
            "gexp-intext-technical-refresh-reason": "house-lineitem-sentinel",
            "gexp-intext-exclude-from-viewability-analysis": "true",
            "gexp-intext-ad-rendered-logical": "false",
            "gexp-intext-ad-filled-logical": "false",
            "gexp-intext-creative-size": this.getDisplayCreativeSizeFromEvent(event),
            "gexp-intext-gam-event-size": this.getDisplayGamEventSize(event),
            "gexp-intext-gam-line-item-type": event?.lineItemType,
            "gexp-intext-sentinel-campaign-id": event?.campaignId != null ? String(event.campaignId) : "unknown",
            "gexp-intext-sentinel-advertiser-id": event?.advertiserId != null ? String(event.advertiserId) : "unknown",
            "gexp-intext-sentinel-event-size": this.getDisplayGamEventSize(event),
            ...this.getDisplayLayoutTelemetry(renderSize),
            advertiserId: event?.advertiserId,
            campaignId: event?.campaignId,
            lineItemId: event?.lineItemId,
            creativeId: event?.creativeId,
            ...extra,
          };
        }

        isHouse1x1EventMatch(event, cfg) {
          if (!event || event.isEmpty === true) return false;
          const idMatch = this.getHouse1x1EventIdMatch(event, cfg);

          // With configured IDs, retry only on those IDs so Prebid or wrapper 1x1 creatives are not captured by size.
          if (idMatch.hasConfiguredIds) return idMatch.configuredMatch;

          const is1x1 = event.size && event.size[0] === 1 && event.size[1] === 1;
          if (!is1x1) return false;

          if (cfg?.requireHouse !== true) return true;

          try {
            return Boolean(this.manager?.gexp?.isHouse?.(null, null, idMatch.advertiserId || null));
          } catch (e) {
            return false;
          }
        }

        isHouse1x1AutoRefreshCandidate(event) {
          const cfg = this.getHouse1x1AutoRefreshConfig();
          if (!cfg || cfg.enabled !== true) return false;
          if (!this.isHouse1x1EventMatch(event, cfg)) return false;

          const maxAttemptsPerSlot = Number(cfg.maxAttemptsPerSlot ?? 2);
          if (maxAttemptsPerSlot >= 0 && this._house1x1AutoRefreshAttemptsPerSlot >= maxAttemptsPerSlot) return false;
          return true;
        }

        isHouse1x1AutoRefreshMaxReached(event) {
          const cfg = this.getHouse1x1AutoRefreshConfig();
          if (!cfg || cfg.enabled !== true) return false;
          if (!this.isHouse1x1EventMatch(event, cfg)) return false;
          const maxAttemptsPerSlot = Number(cfg.maxAttemptsPerSlot ?? 2);
          return maxAttemptsPerSlot >= 0 && this._house1x1AutoRefreshAttemptsPerSlot >= maxAttemptsPerSlot;
        }

        handleHouse1x1MaxAttemptsReached(event) {
          const cfg = this.getHouse1x1AutoRefreshConfig() || {};
          this.mergeIntextTelemetry({
            ...this.getHouseLineItemSentinelTelemetry(event),
            "gexp-intext-sentinel-retry-attempt-slot": String(this._house1x1AutoRefreshAttemptsPerSlot),
            "gexp-intext-sentinel-retry-max-slot": String(cfg.maxAttemptsPerSlot ?? 2),
            "gexp-intext-sentinel-retry-attempt-cycle": String(this._house1x1AutoRefreshAttemptsForCycle),
            "gexp-intext-sentinel-retry-max-cycle": String(cfg.maxAttemptsPerCycle ?? 1),
            "gexp-intext-sentinel-max-attempts-reached": "true",
            "gexp-intext-house-1x1-max-attempts-reached": "true",
          });
          this.flushIntextTelemetryToCI({ register: true, reason: "house-lineitem-sentinel-max-attempts" });
          logIntext(`[Intext:Display:${this.id}] house_lineitem_sentinel_max_attempts_reached`, {
            attemptCycle: this._house1x1AutoRefreshAttemptsForCycle,
            attemptSlot: this._house1x1AutoRefreshAttemptsPerSlot,
            maxAttemptsPerCycle: cfg.maxAttemptsPerCycle,
            maxAttemptsPerSlot: cfg.maxAttemptsPerSlot,
            lineItemId: event?.lineItemId,
            campaignId: event?.campaignId,
            advertiserId: event?.advertiserId,
            eventSize: this.getDisplayGamEventSize(event),
          });
        }

        handleHouse1x1AutoRefresh(event, renderToken = this._activeRenderToken) {
          const cfg = this.getHouse1x1AutoRefreshConfig();
          if (!cfg || !this.waterfall) return false;
          if (!this.isActiveRenderToken(renderToken, "house_lineitem_sentinel", "house-1x1-refresh")) {
            logIntext(`[Intext:Display:${this.id}] house_lineitem_sentinel_stale_callback_ignored`, {
              slotCode: this.id,
              oldToken: renderToken,
              activeToken: this._activeRenderToken,
              cycleId: this._intextTelemetryCycleId,
              lineItemId: event?.lineItemId,
            });
            return true;
          }

          this._house1x1AutoRefreshAttemptsForCycle += 1;
          this._house1x1AutoRefreshAttemptsPerSlot += 1;
          const attemptSlot = this._house1x1AutoRefreshAttemptsPerSlot;
          const attemptCycle = this._house1x1AutoRefreshAttemptsForCycle;
          this.mergeIntextTelemetry({
            ...this.getHouseLineItemSentinelTelemetry(event),
            "gexp-intext-house-1x1-attempt": String(attemptSlot),
            "gexp-intext-sentinel-retry-attempt-slot": String(attemptSlot),
            "gexp-intext-sentinel-retry-max-slot": String(cfg.maxAttemptsPerSlot ?? 2),
            "gexp-intext-sentinel-retry-attempt-cycle": String(attemptCycle),
            "gexp-intext-sentinel-retry-max-cycle": String(cfg.maxAttemptsPerCycle ?? 1),
            "gexp-intext-sentinel-max-attempts-reached": "false",
            "gexp-intext-house-1x1-max-attempts-reached": "false",
          });

          if (cfg.registerTelemetry === true) {
            this.flushIntextTelemetryToCI({ register: true, reason: "house-lineitem-sentinel" });
          } else {
            this.flushIntextTelemetryToCI();
          }

          const delayMs = Number(cfg.delayMs ?? 100);
          logIntext(`[Intext:Display:${this.id}] house_lineitem_sentinel_detected`, {
            attemptCycle,
            attemptSlot,
            maxAttemptsPerCycle: cfg.maxAttemptsPerCycle,
            maxAttemptsPerSlot: cfg.maxAttemptsPerSlot,
            lineItemId: event?.lineItemId,
            campaignId: event?.campaignId,
            advertiserId: event?.advertiserId,
            eventSize: this.getDisplayGamEventSize(event),
          });
          logIntext(`[Intext:Display:${this.id}] house_lineitem_sentinel_retry_scheduled`, {
            delayMs,
            attemptCycle,
            attemptSlot,
            maxAttemptsPerCycle: cfg.maxAttemptsPerCycle,
            maxAttemptsPerSlot: cfg.maxAttemptsPerSlot,
            lineItemId: event?.lineItemId,
            campaignId: event?.campaignId,
            advertiserId: event?.advertiserId,
            eventSize: this.getDisplayGamEventSize(event),
          });

          this.destroyDisplayForRetry(renderToken, "house_lineitem_sentinel");
          logIntext(`[Intext:Display:${this.id}] house_lineitem_sentinel_wrapper_cleanup_safe`, {
            slotCode: this.id,
            renderToken,
            cycleId: this._intextTelemetryCycleId,
          });
          this.waterfall.prebidStarted = false;
            this.waterfall._houseLineItemSentinelRetryContext = {
              forceRequestType: "display",
              forceDecisionMode: "display_only",
              fromRequestType: "display",
              isFallback:
                this._intextTelemetryCycle?.["gexp-intext-fallback"] === "true" ||
                this.wa?.cI?.["gexp-intext-is-fallback"] === "true",
              originalDecisionMode: this.config?.decision?.mode || "unknown",
              sentinelLineItemId: event?.lineItemId != null ? String(event.lineItemId) : "unknown",
            attemptSlot,
            maxAttemptsPerSlot: cfg.maxAttemptsPerSlot ?? 2,
            attemptCycle,
            maxAttemptsPerCycle: cfg.maxAttemptsPerCycle ?? 1,
          };
          this.trackRenderTimer(setTimeout(() => {
            try {
              if (!this.isActiveRenderToken(renderToken, "house_lineitem_sentinel_retry_timer", "house-1x1-refresh")) {
                logIntext(`[Intext:Display:${this.id}] house_lineitem_sentinel_stale_callback_ignored`, {
                  slotCode: this.id,
                  oldToken: renderToken,
                  activeToken: this._activeRenderToken,
                  cycleId: this._intextTelemetryCycleId,
                  lineItemId: event?.lineItemId,
                });
                return;
              }
              this.waterfall.startAuction("house-1x1-refresh");
            } catch (err) {
              warnIntext(`[Intext:Display:${this.id}] house_1x1_auto_refresh_failed`, err);
            }
          }, Math.max(0, delayMs)));

          return true;
        }

        getIntextInitPageMs() {
          try {
            const ref = this.manager?.gexp?.getTimeReference?.();
            if (typeof ref !== "number" || !isFinite(ref)) return null;
            const delta = Date.now() - ref;
            return Number.isFinite(delta) && delta >= 0 ? Math.round(delta) : null;
          } catch (e) {
            return null;
          }
        }

        isIntextTelemetryDebugEnabled() {
          try {
            const configuredMode = String(
              this.config?.telemetry?.mode || this.manager?.siteConfig?.telemetry?.mode || "",
            ).trim().toLowerCase();
            if (configuredMode === "debug") return true;
            if (typeof window !== "undefined" && window.gexpIntextDebug === true) return true;
            if (typeof document !== "undefined" && typeof document.cookie === "string") {
              return document.cookie.split(";").some((part) => part.trim() === "gexp_intext_telemetry_debug=1");
            }
          } catch (e) {}
          return false;
        }

        getIntextTelemetryMode() {
          const mode = this.isIntextTelemetryDebugEnabled() ? "debug" : "standard";
          if (this._lastIntextTelemetryMode !== mode) {
            this._lastIntextTelemetryMode = mode;
            logIntext(`[Intext:Telemetry:${this.id}] intext_telemetry_mode_resolved`, { mode });
          }
          return mode;
        }

        getStandardIntextTelemetryAllowlist() {
          if (!this._standardIntextTelemetryAllowlist) {
            this._standardIntextTelemetryAllowlist = new Set([
              "gexp-intext-cycle-id",
              "gexp-intext-slot-id",
              "gexp-intext-slot-index",
              "gexp-intext-nav-index",
              "gexp-intext-position",
              "gexp-intext-load-trigger",
              "gexp-intext-is-refresh",
              "gexp-intext-is-fallback",
              "gexp-intext-request-type",
              "gexp-intext-refresh",
              "gexp-intext-fallback",
              "gexp-intext-is-technical-refresh",
              "gexp-intext-technical-refresh-reason",
              "gexp-intext-init-page-ms",
              "gexp-intext-fetch-root-margin",
              "gexp-intext-render-root-margin",
              "gexp-intext-max-delay-ms",
              "gexp-intext-max-fetch-to-render-ms",
              "gexp-intext-load-observer-target",
              "gexp-intext-fetch-trigger",
              "gexp-intext-render-trigger",
              "gexp-intext-fetch-sl-off-y",
              "gexp-intext-fetch-us-off-y",
              "gexp-intext-render-sl-off-y",
              "gexp-intext-render-us-off-y",
              "gexp-intext-fetch-ev",
              "gexp-intext-render-ev",
              "gexp-intext-real-render-phase",
              "gexp-intext-real-render-sl-off-y",
              "gexp-intext-real-render-us-off-y",
              "gexp-intext-real-render-ev",
              "gexp-intext-fetch-to-real-render-ms",
              "gexp-intext-render-to-real-render-ms",
              "gexp-intext-fetch-distance-px",
              "gexp-intext-render-distance-px",
              "gexp-intext-load-start-distance-px",
              "gexp-intext-load-end-distance-px",
              "gexp-intext-fetch-to-render-ms",
              "gexp-intext-fetch-age-ms",
              "gexp-intext-fetch-expired",
              "gexp-intext-render-waited-for-fetch",
              "gexp-intext-render-wait-for-fetch-ms",
              "gexp-intext-pending-auction-used",
              "gexp-intext-pending-auction-restarted",
              "gexp-intext-pending-auction-expired",
              "gexp-intext-pending-auction-age-ms",
              "gexp-intext-ever-in-viewport",
              "gexp-intext-viewport-visible-ms",
              "gexp-intext-loading-experiment",
              "gexp-intext-loading-experiment-enabled",
              "gexp-intext-loading-experiment-resolved",
              "gexp-intext-loading-experiment-name",
              "gexp-intext-loading-variant",
              "gexp-intext-loading-key",
              "gexp-intext-loading-key-value",
              "gexp-intext-loading-key-source",
              "gexp-intext-loading-lookup-slot",
              "gexp-intext-loading-fallback-reason",
              "gexp-intext-fallback-blank-control-enabled",
              "gexp-intext-fallback-blank-control-threshold",
              "gexp-intext-fallback-blank-control-cookie",
              "gexp-intext-fallback-blank-control-count",
              "gexp-intext-fallback-blank-control-counted",
              "gexp-intext-fallback-blank-control-source",
              "gexp-intext-fallback-blank-control-reason",
              "gexp-intext-fallback-blank-control-cookie-set",
              "gexp-intext-paragraph-index",
              "gexp-intext-paragraph-number",
              "gexp-intext-placement-rule",
              "gexp-intext-valid-paragraphs-count",
              "gexp-intext-adjacency-enabled",
              "gexp-intext-adjacency-triggered",
              "gexp-intext-adjacency-original-paragraph",
              "gexp-intext-adjacency-final-paragraph",
              "gexp-intext-adjacency-shifted",
              "gexp-intext-adjacency-shift-direction",
              "gexp-intext-adjacency-shift-distance",
              "gexp-intext-adjacency-fallback-original",
              "gexp-intext-adjacency-min-final-paragraph-index",
              "gexp-intext-adjacency-reason",
              "gexp-intext-ad-rendered-logical",
              "gexp-intext-ad-filled-logical",
              "gexp-intext-gam-line-item-type",
              "gexp-intext-gam-event-size",
              "gexp-intext-layout-size",
              "gexp-intext-render-layout",
              "gexp-intext-size-recovered",
              "lineItemId",
              "creativeId",
              "campaignId",
              "advertiserId",
              "gexp-intext-video-failed",
              "gexp-intext-video-error-code",
              "gexp-intext-video-error-message",
              "gexp-intext-video-fast-fallback",
              "gexp-intext-video-fast-fallback-reason",
              "gexp-intext-video-before-playback",
              "gexp-intext-video-viewport-exit-played-pct",
              "gexp-intext-pip-enabled",
              "gexp-intext-pip-effective-enabled",
              "gexp-intext-pip-slot-enabled",
              "gexp-intext-pip-targeting-allowed",
              "gexp-intext-pip-targeting-reason",
              "gexp-intext-pip-inclusion-site-matched",
              "gexp-intext-pip-inclusion-keyvalue-matched",
              "gexp-intext-pip-exclusion-site-matched",
              "gexp-intext-pip-exclusion-keyvalue-matched",
              "gexp-intext-pip-targeting-matched-key",
              "gexp-intext-pip-targeting-matched-value",
              "gexp-intext-pip-playback-source",
              "gexp-intext-pip-video-playing",
              "gexp-intext-pip-entered",
              "gexp-intext-pip-entry-count",
              "gexp-intext-pip-visible-ms",
              "gexp-intext-pip-dismissed",
              "gexp-intext-pip-ended-while-active",
              "gexp-intext-pip-last-exit-reason",
              "gexp-intext-pip-entry-played-pct",
              "gexp-intext-pip-exit-played-pct",
              "gexp-intext-sentinel",
              "gexp-intext-sentinel-lineitem",
              "gexp-intext-sentinel-retry-attempt-slot",
              "gexp-intext-sentinel-retry-max-slot",
              "gexp-intext-sentinel-max-attempts-reached",
              "gexp-intext-exclude-from-viewability-analysis",
              "gexp-intext-prebid-slot-family",
              "gexp-intext-prebid-slot-profile",
              "gexp-intext-prebid-banner-bidder-count",
              "gexp-intext-prebid-video-bidder-count",
              "gexp-intext-prebid-ortb2-video-mode",
              "gexp-intext-taboola-tagid-applied",
              "gexp-intext-ttd-placementid-applied",
              "gexp-intext-telemetry-mode",
              "gexp-intext-telemetry-filtered",
              "gexp-intext-telemetry-commit-reason",
              ...INTEXT_TELEMETRY_STANDARD_FIELDS,
            ]);
          }
          return this._standardIntextTelemetryAllowlist;
        }

        filterIntextTelemetryForCI(payload = {}) {
          const mode = this.getIntextTelemetryMode();
          if (mode === "debug") {
            logIntext(`[Intext:Telemetry:${this.id}] intext_telemetry_debug_passthrough`, {
              keys: Object.keys(payload).length,
            });
            return {
              ...payload,
              "gexp-intext-telemetry-mode": "debug",
              "gexp-intext-telemetry-filtered": "false",
            };
          }

          const allowlist = this.getStandardIntextTelemetryAllowlist();
          const filtered = {};
          Object.entries(payload || {}).forEach(([key, value]) => {
            if (allowlist.has(key)) filtered[key] = value;
          });
          const didFilter = Object.keys(filtered).length < Object.keys(payload).length;
          filtered["gexp-intext-telemetry-mode"] = "standard";
          filtered["gexp-intext-telemetry-filtered"] = String(didFilter);
          logIntext(`[Intext:Telemetry:${this.id}] intext_telemetry_standard_filter_applied`, {
            inputKeys: Object.keys(payload).length,
            outputKeys: Object.keys(filtered).length,
          });
          return filtered;
        }

        applyIntextTelemetryToCI(payload = {}) {
          if (!this.wa?.cI) return;
          const filtered = this.filterIntextTelemetryForCI(payload);
          Object.keys(payload || {}).forEach((key) => {
            if (!Object.prototype.hasOwnProperty.call(filtered, key)) {
              delete this.wa.cI[key];
            }
          });
          Object.assign(this.wa.cI, filtered);
        }

        clearIntextTelemetryCycleCI() {
          if (!this.wa?.cI) return;
          [
            "gexp-intext-init-page-ms",
            "gexp-intext-load-start-distance-px",
            "gexp-intext-load-end-distance-px",
            "gexp-intext-load-observer-target",
            "gexp-intext-position",
            "gexp-intext-refresh",
            "gexp-intext-fallback",
            "gexp-intext-request-type",
            "gexp-intext-type",
            "gexp-intext-creative-size",
            "gexp-intext-video-viewport-exit-played-pct",
            "gexp-intext-pip-enabled",
            "gexp-intext-pip-effective-enabled",
            "gexp-intext-pip-slot-enabled",
            "gexp-intext-pip-targeting-allowed",
            "gexp-intext-pip-targeting-reason",
            "gexp-intext-pip-inclusion-site-matched",
            "gexp-intext-pip-inclusion-keyvalue-matched",
            "gexp-intext-pip-exclusion-site-matched",
            "gexp-intext-pip-exclusion-keyvalue-matched",
            "gexp-intext-pip-targeting-matched-key",
            "gexp-intext-pip-targeting-matched-value",
            "gexp-intext-pip-playback-source",
            "gexp-intext-pip-video-playing",
            "gexp-intext-pip-entered",
            "gexp-intext-pip-entry-count",
            "gexp-intext-pip-visible-ms",
            "gexp-intext-pip-dismissed",
            "gexp-intext-pip-ended-while-active",
            "gexp-intext-pip-last-exit-reason",
            "gexp-intext-pip-entry-played-pct",
            "gexp-intext-pip-exit-played-pct",
            "gexp-intext-network-id-mode",
            "gexp-intext-network-id-configured",
            "gexp-intext-network-id-detected",
            "gexp-intext-network-id-request",
            "gexp-intext-network-id-source",
            "gexp-intext-network-id-forced",
            "gexp-intext-display-adunit-request",
            "gexp-intext-video-adunit-request",
            "gexp-intext-refresh-blocked",
            "gexp-intext-refresh-blocked-reason",
            "gexp-intext-video-failed",
            "gexp-intext-video-error-code",
            "gexp-intext-video-error-msg",
            "gexp-intext-video-error-message",
            "gexp-intext-video-fast-fallback",
            "gexp-intext-video-fast-fallback-reason",
            "gexp-intext-video-before-playback",
            "gexp-intext-viewport-visible-ms",
            "gexp-intext-ever-in-viewport",
            "gexp-intext-house-1x1-refresh",
            "gexp-intext-house-1x1-attempt",
            "gexp-intext-house-1x1-max-attempts-reached",
            "gexp-intext-render-suppressed",
            "gexp-intext-is-technical-refresh",
            "gexp-intext-technical-refresh-reason",
            "gexp-intext-root-margin",
            "gexp-intext-timer-delay-ms",
            "gexp-intext-has-timer",
            "gexp-intext-loading-experiment",
            "gexp-intext-loading-experiment-enabled",
            "gexp-intext-loading-experiment-resolved",
            "gexp-intext-loading-experiment-name",
            "gexp-intext-loading-variant",
            "gexp-intext-loading-key",
            "gexp-intext-loading-key-value",
            "gexp-intext-loading-key-source",
            "gexp-intext-loading-lookup-slot",
            "gexp-intext-loading-fallback-reason",
            "gexp-intext-qa-cookie-enabled",
            "gexp-intext-qa-cookie-random1",
            "gexp-intext-qa-cookie-applied",
            "gexp-intext-qa-inclusion-forced",
            "gexp-intext-qa-original-random1",
            "gexp-intext-qa-cookie-force-exclusions",
            "gexp-intext-qa-cookie-exclusions-bypassed",
            "gexp-intext-qa-cookie-exclusions-bypass-source",
            "gexp-intext-fallback-blank-control-enabled",
            "gexp-intext-fallback-blank-control-threshold",
            "gexp-intext-fallback-blank-control-cookie",
            "gexp-intext-fallback-blank-control-count",
            "gexp-intext-fallback-blank-control-counted",
            "gexp-intext-fallback-blank-control-source",
            "gexp-intext-fallback-blank-control-reason",
            "gexp-intext-fallback-blank-control-cookie-set",
            "gexp-intext-fetch-root-margin",
            "gexp-intext-render-root-margin",
            "gexp-intext-max-delay-ms",
            "gexp-intext-max-fetch-to-render-ms",
            "gexp-intext-fetch-trigger",
            "gexp-intext-render-trigger",
            "gexp-intext-fetch-sl-off-y",
            "gexp-intext-fetch-us-off-y",
            "gexp-intext-render-sl-off-y",
            "gexp-intext-render-us-off-y",
            "gexp-intext-fetch-ev",
            "gexp-intext-render-ev",
            "gexp-intext-real-render-phase",
            "gexp-intext-real-render-sl-off-y",
            "gexp-intext-real-render-us-off-y",
            "gexp-intext-real-render-ev",
            "gexp-intext-fetch-to-real-render-ms",
            "gexp-intext-render-to-real-render-ms",
            "gexp-intext-fetch-start-time-ms",
            "gexp-intext-render-start-time-ms",
            "gexp-intext-fetch-to-render-ms",
            "gexp-intext-fetch-age-ms",
            "gexp-intext-fetch-expired",
            "gexp-intext-fetch-restarted-after-expiry",
            "gexp-intext-prev-fetch-age-ms",
            "gexp-intext-prev-fetch-expired-trigger",
            "gexp-intext-render-waited-for-fetch",
            "gexp-intext-render-wait-for-fetch-ms",
            "gexp-intext-pending-auction-used",
            "gexp-intext-pending-auction-expired",
            "gexp-intext-pending-auction-age-ms",
            "gexp-intext-pending-auction-restarted",
            "gexp-intext-fetch-distance-px",
            "gexp-intext-render-distance-px",
            "gexp-intext-slot-id",
            "gexp-intext-slot-index",
            "gexp-intext-nav-index",
            "gexp-intext-paragraph-index",
            "gexp-intext-paragraph-number",
            "gexp-intext-placement-rule",
            "gexp-intext-valid-paragraphs-count",
            "gexp-intext-adjacency-enabled",
            "gexp-intext-adjacency-triggered",
            "gexp-intext-adjacency-original-paragraph",
            "gexp-intext-adjacency-final-paragraph",
            "gexp-intext-adjacency-shifted",
            "gexp-intext-adjacency-shift-direction",
            "gexp-intext-adjacency-shift-distance",
            "gexp-intext-adjacency-fallback-original",
            "gexp-intext-adjacency-min-final-paragraph-index",
            "gexp-intext-adjacency-candidate-rejected-reason",
            "gexp-intext-adjacency-reason",
            "gexp-intext-observer-target",
            "gexp-intext-observer-target-height",
            "gexp-intext-observer-target-top",
            "gexp-intext-sentinel",
            "gexp-intext-sentinel-lineitem",
            "gexp-intext-sentinel-campaign-id",
            "gexp-intext-sentinel-advertiser-id",
            "gexp-intext-sentinel-event-size",
            "gexp-intext-sentinel-retry-attempt-slot",
            "gexp-intext-sentinel-retry-max-slot",
            "gexp-intext-sentinel-retry-attempt-cycle",
            "gexp-intext-sentinel-retry-max-cycle",
            "gexp-intext-sentinel-max-attempts-reached",
            "gexp-intext-exclude-from-viewability-analysis",
            "gexp-intext-ad-rendered-logical",
            "gexp-intext-ad-filled-logical",
            "gexp-intext-gam-line-item-type",
            "gexp-intext-gam-event-size",
            "gexp-intext-layout-size",
            "gexp-intext-render-layout",
            "gexp-intext-size-recovered",
            "gexp-intext-render-token",
            "gexp-intext-render-attempt",
            "gexp-intext-stale-render-ignored",
            "gexp-intext-stale-render-source",
            "gexp-intext-visual-state",
            "gexp-intext-duplicate-wrapper-count",
            "gexp-intext-wrapper-reused",
            "gexp-intext-stale-wrapper-removed",
            "gexp-intext-layout-kind",
            "gexp-intext-render-layout-width",
            "gexp-intext-render-layout-height",
            "gexp-intext-layout-locked-height",
            "gexp-intext-wide-layout-mode",
            "gexp-intext-special-creative-layout",
            "gexp-intext-special-creative-size",
            "gexp-intext-special-creative-scale",
            "gexp-intext-special-creative-source-width",
            "gexp-intext-special-creative-source-height",
            "gexp-intext-special-creative-target-height",
            "gexp-intext-special-creative-applied",
            "gexp-intext-special-creative-prerender-hidden",
            "gexp-intext-special-creative-revealed-after-layout",
            "gexp-intext-special-creative-prerender-hide-skipped",
            "gexp-intext-special-creative-surface-hidden",
            "gexp-intext-special-creative-surface-revealed",
            "gexp-intext-special-creative-loader-preserved",
            "gexp-intext-special-creative-loader-hidden-after-layout",
            "gexp-intext-video-to-display-transition",
            "gexp-intext-video-to-display-video-hidden",
            "gexp-intext-video-to-display-display-loader",
            "gexp-intext-video-to-display-single-surface",
            "gexp-intext-video-to-display-container-state-synced",
            "gexp-intext-video-to-display-display-missing",
            "gexp-intext-video-to-display-video-bridge",
            "gexp-intext-video-to-display-bridge-complete",
            "gexp-intext-video-to-display-bridge-display-recreated",
            "gexp-intext-video-to-display-bridge-swap-complete",
            "gexp-intext-transition-bridge-active",
            "gexp-intext-transition-bridge-surface",
            "gexp-intext-transition-bridge-height",
            "gexp-intext-transition-bridge-loader-visible",
            "gexp-intext-transition-bridge-wrapper-recreated",
            "gexp-intext-delayed-destroy-skipped-active-display",
            "gexp-intext-delayed-destroy-skipped-transition-bridge",
            "gexp-intext-delayed-destroy-skipped-special-creative",
            "gexp-intext-close-visual-preserve-skipped",
            "gexp-intext-close-visual-preserve-reason",
            "gexp-intext-sentinel-retry-forced-request-type",
            "gexp-intext-sentinel-retry-preserved-fallback",
            "gexp-intext-sentinel-retry-original-decision-mode",
            "gexp-intext-sentinel-retry-lineitem",
            "gexp-intext-prebid-slot-family",
            "gexp-intext-prebid-slot-profile",
            "gexp-intext-prebid-banner-bidder-count",
            "gexp-intext-prebid-video-bidder-count",
            "gexp-intext-taboola-tagid-applied",
            "gexp-intext-ttd-placementid-applied",
            "gexp-intext-prebid-ortb2-video-mode",
            "gexp-intext-telemetry-mode",
            "gexp-intext-telemetry-filtered",
            "gexp-intext-telemetry-commit-reason",
            "gexp-intext-technical-refresh-lineitem",
            "gexp-intext-technical-refresh-source",
            "advertiserId",
            "campaignId",
            "lineItemId",
            "creativeId",
          ].forEach((key) => {
            try {
              delete this.wa.cI[key];
            } catch (e) {}
          });
        }

        startIntextTelemetryCycle(trigger, extra = {}) {
          this.teardownIntextViewportTelemetryObserver();
          this._intextTelemetryCycleId += 1;
          if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
            this._intextDebugTimings = { cycleStartedAt: null, requestStartedAt: null, imaLoadedAt: null, startedAt: null, firstFrameAt: null, completedAt: null };
            intextDebugCollector.recordMetric("cycle_started", {
              node: this,
              trigger,
              pipEnabled: this.getIntextPipConfig().enabled === true,
            });
          }
          this._pendingIntextTelemetry = {};
          this._intextViewportEnterAt = null;
          this._intextViewportVisibleMs = 0;
          this._intextTelemetryCommittedForCycle = false;
          this._intextTelemetryCommittedReasons = {};
          this._intextTelemetryFinalCommitted = false;
          this._intextTelemetryFinalDeltaCommitted = false;
          this._house1x1AutoRefreshAttemptsForCycle = 0;
          this.clearIntextTelemetryCycleCI();

          const isRefresh = trigger === "refresh";
          const isFallback = trigger === "fallback";
          const contentIdentity = this.manager?.captureIntextContentIdentity?.(
            this.navIndex || 0,
            null,
            this.scopedContext || null,
          ) || {};
          const cycle = {
            "gexp-intext-telemetry-event-type": "slot-cycle",
            "gexp-intext-telemetry-sampled": this.manager?._intextTelemetrySampled === true ? "true" : "false",
            "gexp-intext-page-instance-id": String(this.manager?._intextPageInstanceId || "unresolved"),
            // Canonical correlation key for every Intext cycle, including the
            // explicit unknown-news fallback when no real news ID is available.
            "gexp-intext-content-id": String(contentIdentity.id || `unknown-news:${this.navIndex || 0}`),
            "gexp-intext-content-id-source": String(contentIdentity.source || "unresolved"),
            domain: String(this.manager?.getHostnameNormalized?.(this.manager?.siteContext?.site) || "unknown"),
            country: String(this.manager?.resolveIntextCountry?.() || "unknown"),
            contentType: String(this.scopedContext?.contentType || this.manager?.siteContext?.contentType || "unknown"),
            timestamp: String(Date.now()),
            "gexp-intext-cycle-id": String(this._intextTelemetryCycleId),
            "gexp-intext-position": String(this.id || "unknown"),
            "gexp-intext-load-trigger": String(trigger || "unknown"),
            "gexp-intext-is-refresh": isRefresh ? "true" : "false",
            "gexp-intext-refresh": isRefresh ? "true" : "false",
            "gexp-intext-is-fallback": isFallback ? "true" : "false",
            "gexp-intext-fallback": isFallback ? "true" : "false",
            "gexp-intext-refresh-blocked": "false",
            "gexp-intext-refresh-blocked-reason": "none",
            "gexp-intext-ever-in-viewport": "false",
            "gexp-intext-viewport-visible-ms": "0",
            ...this.manager?.getIntextNetworkTelemetry?.(this.scopedContext),
            "gexp-intext-pip-enabled": this.getIntextPipConfig().enabled === true ? "true" : "false",
            "gexp-intext-pip-effective-enabled": this.isIntextPipEffectiveEnabled() ? "true" : "false",
            "gexp-intext-pip-slot-enabled": this.isIntextPipSlotEnabled() ? "true" : "false",
            "gexp-intext-pip-targeting-allowed": "true",
            "gexp-intext-pip-targeting-reason": "allowed",
            "gexp-intext-pip-inclusion-site-matched": "false",
            "gexp-intext-pip-inclusion-keyvalue-matched": "false",
            "gexp-intext-pip-exclusion-site-matched": "false",
            "gexp-intext-pip-exclusion-keyvalue-matched": "false",
            "gexp-intext-pip-targeting-matched-key": "none",
            "gexp-intext-pip-targeting-matched-value": "none",
            "gexp-intext-pip-playback-source": String(this._intextPipPlaybackSource || "unresolved"),
            "gexp-intext-pip-video-playing": this._intextPipPlaybackActive ? "true" : "false",
            "gexp-intext-pip-entered": "false",
            "gexp-intext-pip-entry-count": "0",
            "gexp-intext-pip-visible-ms": "0",
            "gexp-intext-pip-dismissed": "false",
            "gexp-intext-pip-ended-while-active": "false",
            "gexp-intext-pip-last-exit-reason": "none",
            "gexp-intext-pip-entry-played-pct": "unknown",
            "gexp-intext-pip-exit-played-pct": "unknown",
            "gexp-intext-render-waited-for-fetch": "false",
            "gexp-intext-render-wait-for-fetch-ms": "0",
            "gexp-intext-pending-auction-used": "false",
            "gexp-intext-pending-auction-expired": "false",
            "gexp-intext-pending-auction-age-ms": "0",
            "gexp-intext-pending-auction-restarted": "false",
            "gexp-intext-render-token": String(this._activeRenderToken || 0),
            "gexp-intext-render-attempt": String(this._renderTokenSeq || 0),
            "gexp-intext-visual-state": String(this._visualState || "idle"),
            ...this.manager?.getIntextRandomTelemetry?.(),
          };
          if (contentIdentity.resolved === true && contentIdentity.newsId) {
            cycle.be_page_newsID = String(contentIdentity.newsId);
          }
          const initPageMs = this.getIntextInitPageMs();
          const startDistance = this.getIntextDistancePx();
          const maxDelayMs = this.config?.loading?.maxDelayMs;
          const hasTimer = typeof maxDelayMs === "number" && Number.isFinite(maxDelayMs) && maxDelayMs >= 0;
          const loadingExperiment = this.config?.loading?._experiment || {};
          const adjacencyMeta = this.placement?.adjacencyMeta || {};
          const qaCookieApplied = this.manager?._intextQaCookieApplied === true;
          const loadingExperimentValue = loadingExperiment.enabled ? "true" : "false";
          Object.assign(cycle, {
            "gexp-intext-root-margin": String(this.config?.loading?.renderRootMargin || this.config?.loading?.rootMargin || "200px 0px"),
            "gexp-intext-timer-delay-ms": hasTimer ? String(maxDelayMs) : "disabled",
            "gexp-intext-has-timer": hasTimer ? "true" : "false",
            "gexp-intext-loading-experiment": loadingExperimentValue,
            "gexp-intext-loading-experiment-enabled": loadingExperiment.enabled === true ? "true" : "false",
            "gexp-intext-loading-experiment-resolved": loadingExperiment.resolved === true ? "true" : "false",
            "gexp-intext-loading-experiment-name": String(loadingExperiment.experimentName || "none"),
            "gexp-intext-loading-variant": String(loadingExperiment.variant || "default"),
            "gexp-intext-loading-key": String(loadingExperiment.key || "random1"),
            "gexp-intext-loading-key-value": String(loadingExperiment.keyValue || ""),
            "gexp-intext-loading-key-source": String(loadingExperiment.keySource || "unresolved"),
            "gexp-intext-loading-lookup-slot": String(loadingExperiment.lookupSlot || this.id || "unknown"),
            "gexp-intext-loading-fallback-reason": String(loadingExperiment.fallbackReason || "none"),
            ...this.manager?.getIntextQaCookieTelemetry?.(qaCookieApplied),
            ...this.manager?.getFallbackBlankControlTelemetry?.(),
            "gexp-intext-fetch-root-margin": String(this.config?.loading?.fetchRootMargin || this.config?.loading?.renderRootMargin || this.config?.loading?.rootMargin || "200px 0px"),
            "gexp-intext-render-root-margin": String(this.config?.loading?.renderRootMargin || this.config?.loading?.rootMargin || "200px 0px"),
            "gexp-intext-max-delay-ms": hasTimer ? String(maxDelayMs) : "disabled",
            "gexp-intext-max-fetch-to-render-ms": String(this.config?.loading?.maxFetchToRenderMs ?? "disabled"),
            "gexp-intext-load-observer-target": String(this._intextLoadObserverTarget || "wrapper"),
            "gexp-intext-slot-id": String(this.id || "unknown"),
            "gexp-intext-slot-index": String(this.slotIndex ?? 0),
            "gexp-intext-nav-index": String(this.navIndex || 0),
            "gexp-intext-paragraph-index": this.placement?.paragraphIndex != null ? String(this.placement.paragraphIndex) : "unknown",
            "gexp-intext-paragraph-number": this.placement?.paragraphIndex != null ? String(this.placement.paragraphIndex + 1) : "unknown",
            "gexp-intext-placement-rule": this.placement?.placementRule ? JSON.stringify(this.placement.placementRule) : "unknown",
            "gexp-intext-valid-paragraphs-count": this.placement?.validParagraphsCount != null ? String(this.placement.validParagraphsCount) : "unknown",
            "gexp-intext-adjacency-enabled": adjacencyMeta.enabled === true ? "true" : "false",
            "gexp-intext-adjacency-triggered": adjacencyMeta.triggered === true ? "true" : "false",
            "gexp-intext-adjacency-original-paragraph": adjacencyMeta.originalParagraph != null ? String(adjacencyMeta.originalParagraph) : "unknown",
            "gexp-intext-adjacency-final-paragraph": adjacencyMeta.finalParagraph != null ? String(adjacencyMeta.finalParagraph) : "unknown",
            "gexp-intext-adjacency-shifted": adjacencyMeta.shifted === true ? "true" : "false",
            "gexp-intext-adjacency-shift-direction": String(adjacencyMeta.shiftDirection || "none"),
            "gexp-intext-adjacency-shift-distance": String(adjacencyMeta.shiftDistance ?? 0),
            "gexp-intext-adjacency-fallback-original": adjacencyMeta.fallbackOriginal === true ? "true" : "false",
            "gexp-intext-adjacency-min-final-paragraph-index": adjacencyMeta.minFinalParagraphIndex != null ? String(adjacencyMeta.minFinalParagraphIndex) : "none",
            "gexp-intext-adjacency-candidate-rejected-reason": String(adjacencyMeta.candidateRejectedReason || "none"),
            "gexp-intext-adjacency-reason": String(adjacencyMeta.reason || "not-triggered"),
            ...this.getIntextTelemetryElementMeta(),
          });
          if (initPageMs !== null) cycle["gexp-intext-init-page-ms"] = String(initPageMs);
          if (startDistance !== null) cycle["gexp-intext-load-start-distance-px"] = String(startDistance);
          if (trigger === "house-1x1-refresh") {
            cycle["gexp-intext-is-refresh"] = "false";
            cycle["gexp-intext-refresh"] = "false";
            cycle["gexp-intext-is-technical-refresh"] = "true";
            cycle["gexp-intext-technical-refresh-reason"] = "house-lineitem-sentinel";
          }

          this._intextTelemetryCycle = cycle;
          const playbackState = this.getIntextPipPlaybackState();
          this.mergeIntextTelemetry({
            "gexp-intext-pip-playback-source": playbackState.source,
            "gexp-intext-pip-video-playing": playbackState.playing ? "true" : "false",
          });
          this.resolveIntextPipTargetingEligibility();
          this.mergeIntextTelemetry(extra);
          this.setupIntextViewportTelemetryObserver();
          this.flushIntextTelemetryToCI();
        }

        mergeIntextTelemetry(extra = {}, options = {}) {
          try {
            const clean = {};
            Object.entries(extra || {}).forEach(([key, value]) => {
              if (value === undefined || value === null || value === "") return;
              clean[key] = String(value);
            });

            if (this._intextTelemetryCycle) {
              Object.assign(this._intextTelemetryCycle, clean);
            } else {
              Object.assign(this._pendingIntextTelemetry, clean);
            }

            if (this.wa?.cI) {
              this.applyIntextTelemetryToCI({
                ...(this._intextTelemetryCycle || {}),
                ...(this._pendingIntextTelemetry || {}),
                ...clean,
              });
            }

            if (options.register === true) {
              this.commitIntextTelemetry(options.reason || "manual");
            }
          } catch (e) {}
        }

        flushIntextTelemetryToCI(options = {}) {
          try {
            if (this.wa?.cI) {
              this.applyIntextTelemetryToCI({
                ...(this._intextTelemetryCycle || {}),
                ...(this._pendingIntextTelemetry || {}),
              });
            }
            if (options.register === true) {
              this.commitIntextTelemetry(options.reason || "manual");
            }
          } catch (e) {}
        }

        commitIntextTelemetry(reason = "manual") {
          try {
            if (!this._intextTelemetryCommittedReasons) this._intextTelemetryCommittedReasons = {};
            if (this._intextTelemetryCommittedReasons[reason]) return;

            const finalReasons = new Set([
              "display-render-ended",
              "video-rendered",
              "video-ended",
              "video-error",
              "no-fill",
              "house-1x1-max-attempts",
              "house-lineitem-sentinel",
              "house-lineitem-sentinel-max-attempts",
            ]);
            const closeReasons = new Set(["close-all", "destroy"]);
            const isFinalReason = finalReasons.has(reason);
            const isCloseReason = closeReasons.has(reason);
            if (!this.wa?.cI) return;
            this.ensureIntextCycleTelemetryIdentity();
            const parentTelemetryId = String(this.wa.cI.tlm_rid || "");
            const statsRows = this.manager?.gexp?.statsG?.rows;
            const rowIsPending = !Array.isArray(statsRows) || statsRows.includes(this.wa.cI);
            const requiresFinalDelta = (isFinalReason || isCloseReason) && !rowIsPending;
            if (
              (isFinalReason || isCloseReason) &&
              this._intextTelemetryFinalCommitted &&
              (!requiresFinalDelta || this._intextTelemetryFinalDeltaCommitted)
            ) return;
            if (this._intextTelemetryCommittedForCycle && !isFinalReason && !isCloseReason) return;
            if (requiresFinalDelta) {
              const finalDedupeKey = `slot-cycle-final:${parentTelemetryId}`;
              const finalSource = {
                ...(this.wa.cI || {}),
                ...(this._intextTelemetryCycle || {}),
                ...(this._pendingIntextTelemetry || {}),
              };
              const finalDeltaFields = [
                "gexp-intext-request-type", "gexp-intext-video", "gexp-intext-display",
                "gexp-intext-is-refresh", "gexp-intext-refresh", "gexp-intext-is-fallback",
                "gexp-intext-fallback", "gexp-intext-video-failed", "gexp-intext-video-error-code",
                "gexp-intext-video-error-message", "gexp-intext-ad-rendered-logical",
                "gexp-intext-ad-filled-logical", "gexp-intext-gam-line-item-type",
                "gexp-intext-gam-event-size", "gexp-intext-render-layout", "adFilled",
                "gexp-intext-network-id-mode", "gexp-intext-network-id-configured",
                "gexp-intext-network-id-detected", "gexp-intext-network-id-request",
                "gexp-intext-network-id-source", "gexp-intext-network-id-forced",
                "gexp-intext-display-adunit-request", "gexp-intext-video-adunit-request",
                "gexp-intext-refresh-blocked", "gexp-intext-refresh-blocked-reason",
                "gexp-intext-pip-enabled", "gexp-intext-pip-effective-enabled",
                "gexp-intext-pip-slot-enabled", "gexp-intext-pip-targeting-allowed",
                "gexp-intext-pip-targeting-reason", "gexp-intext-pip-inclusion-site-matched",
                "gexp-intext-pip-inclusion-keyvalue-matched", "gexp-intext-pip-exclusion-site-matched",
                "gexp-intext-pip-exclusion-keyvalue-matched", "gexp-intext-pip-targeting-matched-key",
                "gexp-intext-pip-targeting-matched-value", "gexp-intext-pip-playback-source",
                "gexp-intext-pip-video-playing",
                "gexp-intext-pip-entered", "gexp-intext-pip-entry-count",
                "gexp-intext-pip-visible-ms", "gexp-intext-pip-dismissed",
                "gexp-intext-pip-ended-while-active", "gexp-intext-pip-last-exit-reason",
                "gexp-intext-pip-entry-played-pct", "gexp-intext-pip-exit-played-pct",
                "adRendered", "isEmpty", "lineItemId", "creativeId", "campaignId", "advertiserId",
              ];
              const finalDelta = {};
              finalDeltaFields.forEach((key) => {
                if (finalSource[key] !== undefined && finalSource[key] !== null && finalSource[key] !== "") {
                  finalDelta[key] = String(finalSource[key]);
                }
              });
              this.manager?.registerIntextSyntheticEvent?.("slot-cycle-final", {
                ...finalDelta,
                "gexp-intext-parent-tlm-rid": parentTelemetryId,
                "gexp-intext-cycle-finalized-after-early-flush": "true",
                "gexp-intext-telemetry-commit-reason": String(reason),
                "slot-id": String(this.id || "unknown"),
                "slot-index": String(this.slotIndex ?? 0),
                "cycle-id": String(this._intextTelemetryCycleId || 0),
                "render-token": String(this._activeRenderToken || 0),
                navIndex: String(this.navIndex || 0),
                contentType: String(this.scopedContext?.contentType || this.manager?.siteContext?.contentType || "unknown"),
                scopedContext: this.scopedContext || null,
              }, finalDedupeKey);
              this._intextTelemetryCommittedForCycle = true;
              this._intextTelemetryCommittedReasons[reason] = true;
              this._intextTelemetryFinalCommitted = true;
              this._intextTelemetryFinalDeltaCommitted = true;
              return;
            }
            this.flushIntextTelemetryToCI();
            this.applyIntextTelemetryToCI({ "gexp-intext-telemetry-commit-reason": reason });
            this._intextTelemetryRegisteredByWindowArray = true;
            this._intextTelemetryCommittedForCycle = true;
            this._intextTelemetryCommittedReasons[reason] = true;
            if (isFinalReason || isCloseReason) this._intextTelemetryFinalCommitted = true;
            logIntext(`[Intext:Telemetry:${this.id}] telemetry_updated_without_duplicate_registration`, {
              cycleId: this._intextTelemetryCycleId,
              reason,
            });
          } catch (e) {}
        }

        accumulateIntextViewportVisibleMs() {
          if (!this._intextViewportEnterAt) return;
          if (document.visibilityState === "visible") {
            this._intextViewportVisibleMs += Date.now() - this._intextViewportEnterAt;
          }
          this._intextViewportEnterAt = null;
          this.mergeIntextTelemetry({
            "gexp-intext-viewport-visible-ms": String(Math.max(0, Math.round(this._intextViewportVisibleMs))),
          });
        }

        setupIntextViewportTelemetryObserver() {
          try {
            const pipEnabled = this.isIntextPipEnabled();
            const el = pipEnabled
              ? this.videoContainer?.getElement?.()
              : this.getIntextTelemetryElement();
            if (!el || typeof IntersectionObserver === "undefined") return;
            if (this._intextViewportObserver && this._intextViewportObservedEl === el) return;
            this.teardownIntextViewportTelemetryObserver();
            this._intextViewportObservedEl = el;
            this.mergeIntextTelemetry(this.getIntextTelemetryElementMeta(el));
            const observerRenderToken = this._activeRenderToken;
            this._intextViewportObserver = new IntersectionObserver((entries) => {
              if (observerRenderToken !== this._activeRenderToken || this._nodeActive !== true) return;
              const entry = entries && entries[0];
              if (!entry) return;
              if (window.gexpIntextDebug) {
                intextDebugCollector.recordTimeline("intersection-change", {
                  node: this,
                  format: this.state === "video" ? "video" : (this.state === "display" ? "display" : "unknown"),
                  phase: "viewport-observer",
                  state: this.state,
                  slotId: this.id,
                  element: el,
                  intersectionRatio: Number(entry.intersectionRatio || 0),
                  isIntersecting: entry.isIntersecting === true,
                });
              }
              this.handleIntextPipIntersection(entry);
              if (entry.isIntersecting) {
                this.mergeIntextTelemetry({ "gexp-intext-ever-in-viewport": "true" });
                if (!this._intextViewportEnterAt && document.visibilityState === "visible") {
                  this._intextViewportEnterAt = Date.now();
                }
              } else {
                this.accumulateIntextViewportVisibleMs();
                if (this.state === "video") {
                  const pct = this.getVideoPlayedPct();
                  if (pct !== null) {
                    this.mergeIntextTelemetry({ "gexp-intext-video-viewport-exit-played-pct": String(pct) });
                  }
                }
              }
            }, {
              threshold: pipEnabled
                ? Array.from(new Set([
                    0,
                    this.getIntextPipConfig().enterIntersectionRatio,
                    this.getIntextPipConfig().returnIntersectionRatio,
                    1,
                  ])).sort((a, b) => a - b)
                : 0.1,
            });
            this._intextViewportObserver.observe(el);
          } catch (e) {}
        }

        teardownIntextViewportTelemetryObserver() {
          try {
            this.accumulateIntextViewportVisibleMs();
            if (this._intextViewportObserver) {
              this._intextViewportObserver.disconnect();
            }
          } catch (e) {}
          this._intextViewportObserver = null;
          this._intextViewportObservedEl = null;
        }

        getVideoPlayedPct() {
          try {
            const player = this.activeCreative?.player;
            const current = Number(player?.currentTime?.());
            let duration = Number(player?.duration?.());
            if (!Number.isFinite(duration) || duration <= 0) {
              duration = Number(this.activeCreative?._lastAdDuration || this._lastImaAdDuration);
            }
            if (!Number.isFinite(current) || current < 0 || !Number.isFinite(duration) || duration <= 0) return null;
            const pct = Math.max(0, Math.min(100, (current / duration) * 100));
            return Math.round(pct * 10) / 10;
          } catch (e) {
            return null;
          }
        }

        readIntextPageKv(key) {
          if (INTEXT_RANDOM_KEYS.includes(String(key))) {
            return { value: this.manager?.getIntextRandomValue?.(key), source: "gexp-slot-random-snapshot" };
          }
          const readFromMap = (map) => {
            if (!map || typeof map !== "object") return null;
            return this.normalizeHbValue(map[key]);
          };

          try {
            const directSource = this.manager?.getPageCustomTargeting?.(key);
            if (!directSource || typeof directSource !== "object") {
              const directValue = this.normalizeHbValue(directSource);
              if (directValue !== null) return { value: directValue, source: "manager.getPageCustomTargeting(key)" };
            }
          } catch (e) {}

          try {
            const managerTargeting = this.manager?.getPageCustomTargeting?.();
            const value = readFromMap(managerTargeting);
            if (value !== null) return { value, source: "manager.getPageCustomTargeting" };
          } catch (e) {}

          const managerPageTargeting = readFromMap(this.manager?.pageTargeting);
          if (managerPageTargeting !== null) return { value: managerPageTargeting, source: "manager.pageTargeting" };

          const scopedValue = readFromMap(this.scopedContext?.targeting);
          if (scopedValue !== null) return { value: scopedValue, source: "scopedContext.targeting" };

          try {
            if (typeof googletag !== "undefined" && googletag.pubads) {
              const pubads = googletag.pubads();
              if (pubads && typeof pubads.getTargeting === "function") {
                const value = this.normalizeHbValue(pubads.getTargeting(key));
                if (value !== null) return { value, source: "googletag.pubads" };
              }
            }
          } catch (e) {}

          return { value: null, source: "fallback" };
        }

        getSlotTargetingValueSafe(slot, key) {
          try {
            if (slot && typeof slot.getTargeting === "function") {
              return slot.getTargeting(key);
            }
          } catch (e) {}
          return [];
        }

        readIntextSlotRandoms(slot = null) {
          const targetSlot = slot || this.slot;
          const observed = {};
          INTEXT_RANDOM_KEYS.forEach((key) => {
            observed[key] = this.normalizeHbValue(this.getSlotTargetingValueSafe(targetSlot, key));
          });
          return observed;
        }

        applyIntextRandomSnapshotToSlot(slot = null) {
          const targetSlot = slot || this.slot;
          const snapshot = this.manager?.intextRandomSnapshot;
          if (!targetSlot || !snapshot || typeof targetSlot.setTargeting !== "function") return false;
          INTEXT_RANDOM_KEYS.forEach((key) => targetSlot.setTargeting(key, String(snapshot[key])));
          const targetWindowArray = this.wa || this.manager?.gexp?.windows?.[this.id];
          if (targetWindowArray?.cI) {
            INTEXT_RANDOM_KEYS.forEach((key) => {
              targetWindowArray.cI[key] = String(snapshot[key]);
            });
          }
          return true;
        }

        assertIntextRandomSnapshotOnSlot(slot = null, context = "before-request") {
          const targetSlot = slot || this.slot;
          const snapshot = this.manager?.intextRandomSnapshot;
          if (!targetSlot || !this.manager?.validateIntextRandomSnapshot?.(snapshot)) return false;
          this.manager?.validateIntextRandomSnapshotStability?.(context);
          const observed = this.readIntextSlotRandoms(targetSlot);
          const mismatched = INTEXT_RANDOM_KEYS.some((key) => observed[key] !== String(snapshot[key]));
          if (!mismatched) return true;
          this.applyIntextRandomSnapshotToSlot(targetSlot);
          this.mergeIntextTelemetry({
            "gexp-intext-random-mismatch-corrected": "true",
            "gexp-intext-random-source": snapshot.source,
            "gexp-intext-random-expected": JSON.stringify(INTEXT_RANDOM_KEYS.reduce((acc, key) => ({ ...acc, [key]: snapshot[key] }), {})),
            "gexp-intext-random-observed": JSON.stringify(observed),
          });
          this.manager?.registerIntextDiagnosticEvent?.({
            diagnosticKey: `intext-slot-random-mismatch:${this.id}:${this._intextTelemetryCycleId}:${context}`,
            "gexp-intext-diagnostic-context": String(context),
            "gexp-intext-random-mismatch-corrected": "true",
            "gexp-intext-random-expected": JSON.stringify(snapshot),
            "gexp-intext-random-observed": JSON.stringify(observed),
            "slot-id": String(this.id),
            "cycle-id": String(this._intextTelemetryCycleId || 0),
            "render-token": String(this._activeRenderToken || 0),
          });
          return INTEXT_RANDOM_KEYS.every((key) =>
            this.normalizeHbValue(this.getSlotTargetingValueSafe(targetSlot, key)) === String(snapshot[key])
          );
        }

        ensureIntextCycleTelemetryIdentity() {
          if (!this.wa?.cI) return false;
          if (!this.wa.cI.tlm_rid) this.wa.cI.tlm_rid = this.manager.createIntextTelemetryId("slot-cycle");
          this.wa.cI["gexp-intext-telemetry-event-type"] = "slot-cycle";
          Object.assign(this.wa.cI, this.manager.getIntextRandomTelemetry());
          return true;
        }

        normalizeIntextBidderCodeForGam(bidderCode) {
          const raw = this.normalizeHbValue(bidderCode);
          if (!raw) return null;
          return String(raw).replace(/_video$/, "");
        }

        sanitizeBidderSuffix(bidderCode) {
          const normalizedBidderCode = this.normalizeIntextBidderCodeForGam(bidderCode);
          const suffix = String(normalizedBidderCode || "").trim().replace(/[^\w]/g, "_");
          return suffix ? suffix.substring(0, 20) : "";
        }

        getBidderSuffixFromBid(bid) {
          const bidderCode =
            this.normalizeHbValue(bid?.adserverTargeting?.hb_bidder) ||
            this.normalizeHbValue(bid?.bidderCode);
          return this.sanitizeBidderSuffix(bidderCode);
        }

        getBidSize(bid, defaultSize = null) {
          const adserverSize = this.normalizeHbValue(bid?.adserverTargeting?.hb_size);
          if (adserverSize) return adserverSize;

          const width = bid?.width || bid?.w;
          const height = bid?.height || bid?.h;
          if (width && height) return `${width}x${height}`;

          if (Array.isArray(defaultSize) && defaultSize.length === 2) {
            return `${defaultSize[0]}x${defaultSize[1]}`;
          }

          return null;
        }

        collectHbTargetingFromBid(bid, options = {}) {
          const isWinner = options.isWinner === true;
          const mediaType = options.mediaType || bid?.mediaType || "banner";
          const adserverTargeting = bid?.adserverTargeting || {};
          const suffix = this.getBidderSuffixFromBid(bid);
          const originalBidder =
            this.normalizeHbValue(adserverTargeting.hb_bidder) ||
            this.normalizeHbValue(bid?.bidderCode);
          const rawOriginalSuffix = String(originalBidder || "").trim().replace(/[^\w]/g, "_").substring(0, 20);
          const scoped = {};
          const hbTargeting = {};
          const scopedBases = [
            "hb_pb",
            "hb_bidder",
            "hb_format",
            "hb_adid",
            "hb_size",
            "hb_uuid",
            "hb_cache_id",
            "hb_cache_host",
            "hb_cache_path",
          ];
          const isKnownScopedKey = (key) =>
            scopedBases.some((base) => key.indexOf(`${base}_`) === 0);
          const setIfPresent = (target, key, value, overwrite = false) => {
            const normalized = this.normalizeHbValue(value);
            if (normalized === null) return;
            if (!overwrite && target[key] !== undefined && target[key] !== null && target[key] !== "") return;
            target[key] = normalized;
          };
          const readScoped = (keyBase, fallback) =>
            adserverTargeting[`${keyBase}_${suffix}`] ||
            (rawOriginalSuffix ? adserverTargeting[`${keyBase}_${rawOriginalSuffix}`] : null) ||
            fallback;

          const generic = {};
          Object.entries(adserverTargeting).forEach(([key, value]) => {
            if (!String(key).startsWith("hb_")) return;
            if (isKnownScopedKey(String(key))) return;
            // Strip _video from any unknown generic keys (e.g. hb_deal_teads_video -> hb_deal_teads)
            const normalizedKey = String(key).replace(/_video$/, "").replace(/_video_/, "_");
            setIfPresent(generic, normalizedKey, value);
          });

          const pb =
            generic.hb_pb ||
            this.normalizeHbValue(bid?.pbCg) ||
            this.normalizeHbValue(bid?.pbAg) ||
            this.normalizeHbValue(bid?.pbHg) ||
            this.normalizeHbValue(bid?.cpm);
          const bidder = this.normalizeIntextBidderCodeForGam(generic.hb_bidder || bid?.bidderCode);
          const format = generic.hb_format || (mediaType === "video" ? "video" : "banner");
          const adId = generic.hb_adid || this.normalizeHbValue(bid?.adId);
          const size = generic.hb_size || this.getBidSize(bid, options.defaultSize);

          setIfPresent(generic, "hb_pb", pb);
          setIfPresent(generic, "hb_bidder", bidder, true);
          setIfPresent(generic, "hb_format", format);
          setIfPresent(generic, "hb_adid", adId);
          setIfPresent(generic, "hb_size", size);
          setIfPresent(generic, "hb_uuid", bid?.videoCacheKey || bid?.cacheId || bid?.vastCacheKey);
          setIfPresent(generic, "hb_cache_id", bid?.videoCacheKey || bid?.cacheId || bid?.vastCacheKey);
          setIfPresent(generic, "hb_cache_host", bid?.hb_cache_host);
          setIfPresent(generic, "hb_cache_path", bid?.hb_cache_path);

          if (suffix) {
            setIfPresent(scoped, `hb_pb_${suffix}`, readScoped("hb_pb", pb));
            setIfPresent(scoped, `hb_bidder_${suffix}`, this.normalizeIntextBidderCodeForGam(readScoped("hb_bidder", bidder)));
            setIfPresent(scoped, `hb_format_${suffix}`, readScoped("hb_format", format));
            setIfPresent(scoped, `hb_adid_${suffix}`, readScoped("hb_adid", adId));
            setIfPresent(scoped, `hb_size_${suffix}`, readScoped("hb_size", size));
            setIfPresent(scoped, `hb_uuid_${suffix}`, readScoped("hb_uuid", generic.hb_uuid));
            setIfPresent(scoped, `hb_cache_id_${suffix}`, readScoped("hb_cache_id", generic.hb_cache_id));
            setIfPresent(scoped, `hb_cache_host_${suffix}`, readScoped("hb_cache_host", generic.hb_cache_host));
            setIfPresent(scoped, `hb_cache_path_${suffix}`, readScoped("hb_cache_path", generic.hb_cache_path));
          }

          if (isWinner) {
            Object.assign(hbTargeting, generic, scoped);
          } else {
            Object.assign(hbTargeting, scoped);
          }

          return {
            hbTargeting,
            bidderSuffix: suffix,
            bidder,
            pb,
          };
        }

        collectHbTargetingFromCurrentBids(bids = [], winnerBid = null, options = {}) {
          const hbTargeting = {};
          const biddersIncluded = [];
          const seen = new Set();
          const winnerAdId = winnerBid?.adId || null;
          const merge = (map) => {
            Object.entries(map || {}).forEach(([key, value]) => {
              if (value === undefined || value === null || value === "") return;
              if (hbTargeting[key] !== undefined && hbTargeting[key] !== null && hbTargeting[key] !== "") return;
              hbTargeting[key] = String(value);
            });
          };
          const orderedBids = [
            ...(winnerBid ? [winnerBid] : []),
            ...(Array.isArray(bids) ? bids : []),
          ].filter(Boolean);

          orderedBids.forEach((bid) => {
            const identity = bid.adId || bid.requestId || `${bid.bidderCode}:${bid.cpm}:${bid.mediaType}`;
            if (identity && seen.has(identity)) return;
            if (identity) seen.add(identity);

            const isWinner = bid === winnerBid || (winnerAdId && bid.adId === winnerAdId);
            const built = this.collectHbTargetingFromBid(bid, { ...options, isWinner });
            merge(built.hbTargeting);
            if (built.bidderSuffix) biddersIncluded.push(built.bidderSuffix);
          });

          return {
            hbTargeting,
            biddersIncluded: Array.from(new Set(biddersIncluded)),
          };
        }

        resolveVideoRequestTargeting() {
          const gexp = this.manager?.gexp;
          const sourceLabels = [];
          const mergedTargeting = {};
          const collect = (map, sourceLabel) => {
            if (!map || typeof map !== "object") return;
            let used = false;
            Object.keys(map).forEach((rawKey) => {
              const key = String(rawKey || "").trim();
              if (!key) return;
              if (INTEXT_RANDOM_KEYS.includes(key)) return;
              const rawValue = map[rawKey];
              if (rawValue === undefined || rawValue === null) return;
              if (key.indexOf("hb_") === 0) return;
              let value = rawValue;
              if (Array.isArray(value)) value = value.length === 1 ? value[0] : value.join(",");
              if (value === undefined || value === null || value === "") return;
              mergedTargeting[key] = String(value);
              used = true;
            });
            if (used) sourceLabels.push(sourceLabel);
          };

          collect(this.scopedContext?.targeting, "scopedContext.targeting");
          collect(this.manager?.getPageCustomTargeting?.(this.scopedContext), "manager.getPageCustomTargeting");
          collect(this.getSlotTargetingMapSafe(this.slot), "display_slot_targeting");

          const fallbackTargeting = {};
          try {
            Object.assign(fallbackTargeting, this.manager?.intextRandomSnapshot || {});
            fallbackTargeting.tlm = gexp?.statsG?.telp ? "1" : "0";
            fallbackTargeting.tlm_id = gexp?.statsG?.telId || "";
            fallbackTargeting.nvis =
              gexp?.statsG?.dailyStorageInstance?.get?.("nVisits") || "0";
          } catch (e) {}

          const finalTargeting = {
            intext: "true",
            p: this.id || "gexp-intext",
          };
          if (this.navIndex) {
            finalTargeting["gexp-intext-navcont"] = String(this.navIndex);
          }

          ["random1", "random2", "random3", "random4", "tag", "t", "tlm", "tlm_id", "nvis"].forEach((key) => {
            const snapshotValue = this.manager?.getIntextRandomValue?.(key);
            const preferredValue = INTEXT_RANDOM_KEYS.includes(key) ? snapshotValue : mergedTargeting[key];
            const fallbackValue = fallbackTargeting[key];
            if (preferredValue !== undefined && preferredValue !== null && preferredValue !== "") {
              finalTargeting[key] = String(preferredValue);
              if (snapshotValue !== null) sourceLabels.push(`${key}:gexp-slot-random-snapshot`);
            } else if (fallbackValue !== undefined && fallbackValue !== null && fallbackValue !== "") {
              finalTargeting[key] = String(fallbackValue);
            }
          });

          const targetingSource =
            sourceLabels.length > 0
              ? sourceLabels.join(" -> ")
              : "gexp_runtime_fallback";

          logIntext(`[Intext:Auction:${this.id}] intext_video_request_targeting_source`, {
            targetingSource,
            scopedContextPageUrl: this.scopedContext?.pageUrl || null,
            slotAttached: Boolean(this.slot),
          });
          logIntext(`[Intext:Auction:${this.id}] intext_video_request_targeting_final`, finalTargeting);

          return {
            targeting: finalTargeting,
            targetingSource,
          };
        }

        getDisplayRequestTargetingKeysToClear(slot = null) {
          const keys = new Set([
            "p",
            "intext",
            "tlm",
            "tlm_id",
            "nvis",
            "aut",
            "h",
            "gexp_floor",
            "rndp",
            "sj",
            "gexp-intext-navcont",
            "gexp-intext-display",
            "gexp-intext-refresh",
            "gexp-intext-fallback",
            "gexp-intext-is-refresh",
            "gexp-intext-is-fallback",
            "hb_pb",
            "hb_bidder",
            "hb_format",
            "hb_adid",
          ]);

          const currentTargeting = this.getSlotTargetingMapSafe(slot);
          Object.keys(currentTargeting).forEach((key) => {
            if (String(key).startsWith("hb_")) keys.add(String(key));
          });

          return Array.from(keys);
        }

        clearDisplayRequestTargeting(slot = null, logLabel = "display_request_targeting_cleared_keys") {
          const targetSlot = slot || this.slot;
          if (!targetSlot || typeof targetSlot.clearTargeting !== "function") return [];
          if (typeof targetSlot.getSlotElementId === "function" && targetSlot.getSlotElementId() !== this.id) {
            logIntext(`[Intext:Display:${this.id}] ${logLabel}_skipped_slot_mismatch`, {
              targetSlotId: targetSlot.getSlotElementId(),
              expectedSlotId: this.id,
            });
            return [];
          }

          const keysToClear = this.getDisplayRequestTargetingKeysToClear(targetSlot);
          keysToClear.forEach((key) => {
            try {
              targetSlot.clearTargeting(key);
            } catch (e) {}
          });

          logIntext(`[Intext:Display:${this.id}] ${logLabel}`, keysToClear);
          return keysToClear;
        }

        resolveDisplayRequestTargeting(slotTargetingOverride = null) {
          const gexp = this.manager?.gexp;
          const sourceLabels = [];
          const mergedTargeting = {};
          const collect = (map, sourceLabel) => {
            if (!map || typeof map !== "object") return;
            let used = false;
            Object.keys(map).forEach((rawKey) => {
              const key = String(rawKey || "").trim();
              if (!key) return;
              if (INTEXT_RANDOM_KEYS.includes(key)) return;
              const rawValue = map[rawKey];
              if (rawValue === undefined || rawValue === null) return;
              if (Object.prototype.hasOwnProperty.call(mergedTargeting, key)) return;
              let value = rawValue;
              if (Array.isArray(value)) value = value.length === 1 ? value[0] : value.join(",");
              if (value === undefined || value === null || value === "") return;
              mergedTargeting[key] = String(value);
              used = true;
            });
            if (used) sourceLabels.push(sourceLabel);
          };

          collect(this.scopedContext?.targeting, "scopedContext.targeting");
          collect(this.manager?.getPageCustomTargeting?.(this.scopedContext), "manager.getPageCustomTargeting");
          collect(slotTargetingOverride || this.getSlotTargetingMapSafe(this.slot), "slot_targeting");

          const fallbackTargeting = {};
          try {
            Object.assign(fallbackTargeting, this.manager?.intextRandomSnapshot || {});
            fallbackTargeting.tlm = gexp?.statsG?.telp ? "1" : "0";
            fallbackTargeting.tlm_id = gexp?.statsG?.telId || "";
            fallbackTargeting.nvis =
              gexp?.statsG?.dailyStorageInstance?.get?.("nVisits") || "0";
            fallbackTargeting.aut =
              typeof gexp?.getUserType === "function" ? String(gexp.getUserType()) : null;
            fallbackTargeting.h = document.hidden ? "1" : "0";
          } catch (e) {}

          const finalTargeting = {
            p: this.id || "gexp-intext",
            intext: "true",
          };
          if (this.navIndex) {
            finalTargeting["gexp-intext-navcont"] = String(this.navIndex);
          }

          [
            "random1",
            "random2",
            "random3",
            "random4",
            "tlm",
            "tlm_id",
            "nvis",
            "aut",
            "h",
            "gexp_floor",
            "rndp",
            "sj",
          ].forEach((key) => {
            const snapshotValue = this.manager?.getIntextRandomValue?.(key);
            const preferredValue = INTEXT_RANDOM_KEYS.includes(key) ? snapshotValue : mergedTargeting[key];
            const fallbackValue = fallbackTargeting[key];
            if (preferredValue !== undefined && preferredValue !== null && preferredValue !== "") {
              finalTargeting[key] = String(preferredValue);
              if (snapshotValue !== null) sourceLabels.push(`${key}:gexp-slot-random-snapshot`);
            } else if (fallbackValue !== undefined && fallbackValue !== null && fallbackValue !== "") {
              finalTargeting[key] = String(fallbackValue);
            }
          });

          const targetingSource =
            sourceLabels.length > 0
              ? sourceLabels.join(" -> ")
              : "gexp_runtime_fallback";

          logIntext(`[Intext:Display:${this.id}] display_request_targeting_source`, {
            targetingSource,
            scopedContextPageUrl: this.scopedContext?.pageUrl || null,
            slotAttached: Boolean(this.slot),
          });
          logIntext(`[Intext:Display:${this.id}] display_request_targeting_final`, finalTargeting);

          return {
            targeting: finalTargeting,
            targetingSource,
          };
        }

        applyDisplayRequestTargeting(slot, targetingMap = {}) {
          if (!slot || typeof slot.setTargeting !== "function") return;
          Object.entries(targetingMap).forEach(([key, value]) => {
            if (value === undefined || value === null || value === "") return;
            slot.setTargeting(key, String(value));
          });
        }

        getDisplayGamRequestTargetingFinal(slot = null) {
          const targetSlot = slot || this.slot;
          const targeting = this.getSlotTargetingMapSafe(targetSlot);
          const finalTargeting = {};
          [
            "p",
            "intext",
            "random1",
            "random2",
            "random3",
            "random4",
            "gexp_floor",
            "rndp",
            "sj",
          ].forEach((key) => {
            if (targeting[key] !== undefined) finalTargeting[key] = targeting[key];
          });
          Object.keys(targeting)
            .filter((key) => String(key).startsWith("hb_"))
            .sort()
            .forEach((key) => {
              finalTargeting[key] = targeting[key];
            });
          return finalTargeting;
        }

        pickHbTargeting(targetingMap = {}) {
            const hbTargeting = {};

            Object.entries(targetingMap || {}).forEach(([key, value]) => {
                if (!String(key).startsWith("hb_")) return;
                if (value === undefined || value === null || value === "") return;

                hbTargeting[key] = value;
            });

            return hbTargeting;
        }

        applyDisplayBidTargeting(slot, bidResponse, bidResponses = null) {
          if (!slot) return;
          if (!bidResponse) {
            logIntext(`[Intext:Display:${this.id}] display_hb_targeting_skipped_no_winner`, {
              slotCode: this.id || null,
            });
            return;
          }

          if (bidResponse.cpm == null || !(Number(bidResponse.cpm) > 0)) {
            logIntext(`[Intext:Display:${this.id}] display_hb_targeting_skipped_invalid_winner`, {
              slotCode: this.id || null,
              winnerBidder: bidResponse.bidderCode || null,
              winnerCpm: bidResponse.cpm ?? null,
            });
            return;
          }

          const currentBids = Array.isArray(bidResponses)
            ? bidResponses
            : this.waterfall?._lastCurrentBannerBids || [bidResponse];
          const currentAuctionId = this.waterfall?._currentAuctionId || null;
          const validBids = currentBids.filter((bid) => {
            if (!bid || bid.cpm == null || !(Number(bid.cpm) > 0)) return false;
            if (currentAuctionId && bid.auctionId !== currentAuctionId) return false;
            return true;
          });

          if (!validBids.length) {
            logIntext(`[Intext:Display:${this.id}] display_hb_targeting_skipped_zero_valid_bids`, {
              slotCode: this.id || null,
              winnerBidder: bidResponse.bidderCode || null,
            });
            return;
          }

          const { hbTargeting, biddersIncluded } = this.collectHbTargetingFromCurrentBids(
            validBids,
            bidResponse,
            { mediaType: "banner" },
          );

          if (!hbTargeting.hb_pb) {
            logIntext(`[Intext:Display:${this.id}] display_hb_targeting_skipped_no_hb_pb`, {
              slotCode: this.id || null,
              winnerBidder: bidResponse.bidderCode || null,
              biddersIncluded,
              keys: Object.keys(hbTargeting),
            });
            return;
          }

          logIntext(`[Intext:Display:${this.id}] display_hb_targeting_built`, {
            winnerBidder: hbTargeting.hb_bidder || bidResponse.bidderCode || null,
            winnerPb: hbTargeting.hb_pb || null,
            biddersIncluded,
            keys: Object.keys(hbTargeting),
          });
          this.applyDisplayRequestTargeting(slot, hbTargeting);
        }

        getDisplayHeightFloor(currentEl = null) {
          return this.getDisplayEffectiveLock(currentEl);
        }

        applyDisplayWrapperHeight(currentEl, contentHeight, {
          logReason = "",
          source = "unknown",
          allowCompression = false,
        } = {}) {
          if (!currentEl) {
            return { contentHeight: 0, totalHeight: 0, lockedFloor: 0 };
          }

          const normalizedState = this.normalizeDisplayContentHeight(contentHeight, currentEl, source);
          let numericHeight = normalizedState.effectiveLock >= this.getDisplayExpandedContentHeight()
            ? this.getDisplayExpandedContentHeight()
            : this.getDisplayStandardContentHeight();
          const lockedFloor = normalizedState.effectiveLock;

          if (!allowCompression && numericHeight < lockedFloor) {
            numericHeight = lockedFloor;
          }

          if (numericHeight === this.getDisplayExpandedContentHeight()) {
            this.markDisplayHeightLock(600, currentEl);
          }

          const totalHeight = this.getDisplayWrapperTotalHeight(numericHeight, logReason);
          currentEl.style.height = totalHeight + "px";
          currentEl.style.minHeight = totalHeight + "px";
          currentEl.dataset.gexpIntextContentHeight = String(numericHeight);
          currentEl.dataset.gexpIntextTotalHeight = String(totalHeight);
          currentEl.dataset.wrapperChromeHeight = String(this.getWrapperChromeHeight());

          const persistedLock = Math.max(
            parseInt(currentEl?.dataset?.lockedHeight, 10) || 0,
            this.lockedHeight || 0,
          );
          if (persistedLock >= this.getDisplayExpandedContentHeight()) {
            currentEl.dataset.lockedHeight = String(persistedLock);
          } else if (currentEl.dataset.lockedHeight && parseInt(currentEl.dataset.lockedHeight, 10) < this.getDisplayExpandedContentHeight()) {
            delete currentEl.dataset.lockedHeight;
          }

          logIntext(
            `[Intext:Display:${this.id}] display_height_state_applied - source=${source}, content_height=${numericHeight}, total_height=${totalHeight}, locked_height=${Math.max(persistedLock || 0, lockedFloor)}`,
          );

          return {
            contentHeight: numericHeight,
            totalHeight,
            lockedFloor: Math.max(persistedLock || 0, lockedFloor),
          };
        }

        clearDisplayLayoutGuard() {
          if (this._displayLayoutObserver) {
            this._displayLayoutObserver.disconnect();
            this._displayLayoutObserver = null;
          }
          if (Array.isArray(this._displayLayoutTimers)) {
            this._displayLayoutTimers.forEach((timerId) => clearTimeout(timerId));
          }
          this._displayLayoutTimers = [];
        }

        resolveDisplayRenderSizeFromEvent(event, source = "unknown") {
          const gamWidth = event?.size ? parseInt(event.size[0], 10) || 0 : 0;
          const gamHeight = event?.size ? parseInt(event.size[1], 10) || 0 : 0;
          const is1x1 = gamWidth === 1 && gamHeight === 1;

          if (!is1x1) {
            return {
              gamWidth,
              gamHeight,
              actualHeight: gamHeight,
              recovered: false,
              layout: "event_size",
            };
          }

          const bid = this.waterfall?._lastDisplayBid || null;
          const recoveredWidth = parseInt(bid?.width ?? bid?.w, 10) || 0;
          const recoveredHeight = parseInt(bid?.height ?? bid?.h, 10) || 0;
          const standardHeight = this.getDisplayStandardContentHeight();
          const configuredStandardSizes = (this.config.display?.sizes || [[300, 250], [336, 280], [320, 100], [320, 50]])
            .filter((size) => Array.isArray(size) && size.length >= 2)
            .map((size) => [parseInt(size[0], 10) || 0, parseInt(size[1], 10) || 0])
            .filter((size) => size[0] > 0 && size[1] > 0 && size[1] <= standardHeight);
          const isConfiguredStandardSize = configuredStandardSizes.some(
            (size) => size[0] === recoveredWidth && size[1] === recoveredHeight,
          );
          const isConfiguredStandardWidth = configuredStandardSizes.some(
            (size) => size[0] === recoveredWidth,
          );
          const isStandardVisualSize = isConfiguredStandardWidth && recoveredHeight === standardHeight;

          if (recoveredWidth === 960 && recoveredHeight === 540) {
            logIntext(`[Intext:Display:${this.id}] display_render_size_recovered_from_1x1`, {
              source,
              width: recoveredWidth,
              height: recoveredHeight,
            });
            logIntext(`[Intext:Display:${this.id}] display_1x1_special_layout_960x540_applied`);
            return {
              gamWidth: 960,
              gamHeight: 540,
              actualHeight: 540,
              recovered: true,
              layout: "960x540",
            };
          }

          if (recoveredWidth === 300 && recoveredHeight === 600) {
            logIntext(`[Intext:Display:${this.id}] display_render_size_recovered_from_1x1`, {
              source,
              width: recoveredWidth,
              height: recoveredHeight,
            });
            logIntext(`[Intext:Display:${this.id}] display_1x1_expanded_layout_300x600_applied`);
            return {
              gamWidth: 300,
              gamHeight: 600,
              actualHeight: 600,
              recovered: true,
              layout: "300x600",
            };
          }

          const recoveredSpecialProfile = this.getDisplaySpecialCreativeProfile(recoveredWidth, recoveredHeight);
          if (recoveredSpecialProfile.isSpecial) {
            logIntext(`[Intext:Display:${this.id}] display_render_size_recovered_from_1x1`, {
              source,
              width: recoveredWidth,
              height: recoveredHeight,
              layoutKind: recoveredSpecialProfile.layoutKind,
            });
            logIntext(`[Intext:Display:${this.id}] display_special_creative_layout_detected`, {
              source,
              sourceWidth: recoveredWidth,
              sourceHeight: recoveredHeight,
              layoutKind: recoveredSpecialProfile.layoutKind,
            });
            return {
              gamWidth: recoveredWidth,
              gamHeight: recoveredHeight,
              actualHeight: recoveredHeight,
              recovered: true,
              layout: recoveredSpecialProfile.layoutKind,
            };
          }

          if (isConfiguredStandardSize || isStandardVisualSize) {
            logIntext(`[Intext:Display:${this.id}] display_render_size_recovered_from_1x1`, {
              source,
              width: recoveredWidth,
              height: recoveredHeight,
              normalizedTo: standardHeight,
            });
            logIntext(`[Intext:Display:${this.id}] display_render_size_fallback_standard`, {
              source,
              reason: "standard_visual_size",
              width: recoveredWidth,
              height: recoveredHeight,
            });
            return {
              gamWidth: 0,
              gamHeight: standardHeight,
              actualHeight: standardHeight,
              recovered: true,
              layout: "standard",
            };
          }

          if (recoveredWidth || recoveredHeight) {
            logIntext(`[Intext:Display:${this.id}] display_render_size_whitelist_rejected`, {
              source,
              width: recoveredWidth,
              height: recoveredHeight,
            });
          }
          logIntext(`[Intext:Display:${this.id}] display_render_size_fallback_standard`, {
            source,
            reason: "missing_or_untrusted_size",
          });

          return {
            gamWidth: 0,
            gamHeight: standardHeight,
            actualHeight: standardHeight,
            recovered: false,
            layout: "standard",
          };
        }

        applyDisplayRenderLayout(currentEl, {
          gamWidth = 0,
          gamHeight = 0,
          actualHeight = 0,
          reason = "unknown",
          skipGuardRefresh = false,
          renderToken = this._activeRenderToken,
        } = {}) {
          if (!currentEl) return null;
          if (!this.isActiveRenderToken(renderToken, `applyDisplayRenderLayout:${reason}`)) return null;
          const slotEl = currentEl;
          this.applyIntextWrapperDebugAttributes(slotEl, {
            renderToken,
            visualState: `layout:${reason}`,
          });
          let scaleTarget = slotEl.querySelector('div[id^="google_ads_iframe"]') || slotEl.querySelector("iframe");
          if (!scaleTarget && slotEl.children.length > 1) {
            scaleTarget = slotEl.lastElementChild;
          }
          if (!scaleTarget) scaleTarget = slotEl;

          const measuredHeight = parseInt(actualHeight, 10) || parseInt(gamHeight, 10) || 0;
          const classified = this.classifyDisplayLayout({ gamWidth, gamHeight, actualHeight }, slotEl);
          const specialProfile = this.getDisplaySpecialCreativeProfile(
            parseInt(gamWidth, 10) || classified.creativeWidth || 0,
            parseInt(gamHeight, 10) || classified.creativeHeight || 0,
          );
          slotEl.classList.remove(
            "gexp-intext-layout-standard",
            "gexp-intext-layout-tall",
            "gexp-intext-layout-wide",
            "gexp-intext-layout-wide-standard",
            "gexp-intext-layout-wide-tall",
          );
          slotEl.classList.add(`gexp-intext-layout-${classified.layoutKind}`);
          if (classified.isWide) slotEl.classList.add("gexp-intext-layout-wide");
          logIntext(`[Intext:Display:${this.id}] display_layout_classified`, {
            slotCode: this.id,
            reason,
            layoutKind: classified.layoutKind,
            creativeWidth: classified.creativeWidth,
            creativeHeight: classified.creativeHeight,
            renderWidth: classified.renderWidth,
            renderHeight: classified.renderHeight,
            lockedHeight: classified.lockedHeight,
            contentHeight: classified.contentHeight,
          });
          if (specialProfile.isSpecial) {
            logIntext(`[Intext:Display:${this.id}] display_special_creative_layout_detected`, {
              source: reason,
              sourceWidth: specialProfile.sourceWidth,
              sourceHeight: specialProfile.sourceHeight,
              layoutKind: specialProfile.layoutKind,
            });
          } else if (
            specialProfile.reason !== "invalid-size" &&
            (specialProfile.sourceWidth >= 900 || specialProfile.sourceWidth === 120)
          ) {
            logIntext(`[Intext:Display:${this.id}] display_special_creative_layout_skipped`, {
              source: reason,
              sourceWidth: specialProfile.sourceWidth,
              sourceHeight: specialProfile.sourceHeight,
              reason: specialProfile.reason,
            });
          }
          this.mergeIntextTelemetry({
            "gexp-intext-layout-kind": classified.layoutKind,
            "gexp-intext-render-layout-width": String(classified.creativeWidth || classified.renderWidth || 0),
            "gexp-intext-render-layout-height": String(classified.creativeHeight || classified.renderHeight || 0),
            "gexp-intext-layout-locked-height": String(classified.lockedHeight || 0),
            "gexp-intext-wide-layout-mode": classified.isWide ? classified.layoutKind : "none",
            ...this.getDisplaySpecialCreativeTelemetry(specialProfile),
          });
          if (!specialProfile.isSpecial && (measuredHeight === 600 || parseInt(gamHeight, 10) === 600)) {
            this.markDisplayHeightLock(600, slotEl);
          }

          this._isApplyingDisplayLayout = true;
          try {
            if (specialProfile.isSpecial) {
              const computedStyle = window.getComputedStyle(slotEl);
              const paddingX =
                parseFloat(computedStyle.paddingLeft || 0) +
                parseFloat(computedStyle.paddingRight || 0);
              const availableWidth = Math.max(
                (slotEl.clientWidth || this.container.getElement().clientWidth || 320) - paddingX,
                1,
              );
              const existingContentHeight =
                parseInt(slotEl?.dataset?.gexpIntextContentHeight, 10) ||
                parseInt(this.lockedHeight, 10) ||
                parseInt(slotEl?.dataset?.lockedHeight, 10) ||
                0;
              const targetContentHeight = existingContentHeight >= this.getDisplayExpandedContentHeight()
                ? this.getDisplayExpandedContentHeight()
                : this.getDisplayStandardContentHeight();
              const sourceWidth = Math.max(specialProfile.sourceWidth, 1);
              const sourceHeight = Math.max(specialProfile.sourceHeight, 1);
              const scaleFactor = Math.min(1, availableWidth / sourceWidth, targetContentHeight / sourceHeight);
              const heightState = this.applyDisplayWrapperHeight(slotEl, targetContentHeight, {
                source: reason,
              });

              scaleTarget.style.position = "static";
              scaleTarget.style.top = "";
              scaleTarget.style.left = "";
              scaleTarget.style.right = "";
              scaleTarget.style.margin = "0 auto";
              scaleTarget.style.alignSelf = "center";
              scaleTarget.style.transformOrigin = "center center";
              scaleTarget.style.transform = `scale(${scaleFactor})`;
              scaleTarget.style.width = sourceWidth + "px";
              scaleTarget.style.height = sourceHeight + "px";
              scaleTarget.style.maxWidth = "none";

              slotEl.style.overflow = "hidden";
              slotEl.style.display = "flex";
              slotEl.style.justifyContent = "center";
              slotEl.style.alignItems = "center";

              this.mergeIntextTelemetry({
                "gexp-intext-layout-kind": specialProfile.layoutKind,
                "gexp-intext-render-layout-width": String(sourceWidth),
                "gexp-intext-render-layout-height": String(sourceHeight),
                "gexp-intext-wide-layout-mode": specialProfile.layoutKind,
                ...this.getDisplaySpecialCreativeTelemetry(specialProfile, true, scaleFactor.toFixed(4), heightState.contentHeight),
              });
              logIntext(`[Intext:Display:${this.id}] display_special_creative_layout_applied`, {
                source: reason,
                sourceWidth,
                sourceHeight,
                layoutKind: specialProfile.layoutKind,
                availableWidth,
                targetContentHeight: heightState.contentHeight,
                scaleFactor: scaleFactor.toFixed(4),
              });
            } else if (classified.layoutKind === "wide-standard" || classified.layoutKind === "wide-tall") {
              const wideTall = classified.layoutKind === "wide-tall";
              const targetContentHeight = wideTall
                ? Math.max(this.getDisplayEffectiveLock(slotEl), this.getDisplayExpandedContentHeight())
                : this.getDisplayStandardContentHeight();
              const computedStyle = window.getComputedStyle(slotEl);
              const paddingX =
                parseFloat(computedStyle.paddingLeft || 0) +
                parseFloat(computedStyle.paddingRight || 0);
              const availableWidth = Math.max(
                (slotEl.clientWidth || this.container.getElement().clientWidth || 320) - paddingX,
                1,
              );
              const sourceWidth = Math.max(parseInt(gamWidth, 10) || classified.creativeWidth || 960, 1);
              const sourceHeight = Math.max(parseInt(gamHeight, 10) || classified.creativeHeight || 540, 1);
              const scaleFactor = Math.min(1, availableWidth / sourceWidth, targetContentHeight / sourceHeight);
              const heightState = this.applyDisplayWrapperHeight(slotEl, targetContentHeight, {
                source: reason,
              });

              scaleTarget.style.position = "static";
              scaleTarget.style.top = "";
              scaleTarget.style.left = "";
              scaleTarget.style.right = "";
              scaleTarget.style.margin = "0 auto";
              scaleTarget.style.alignSelf = wideTall ? "center" : "flex-start";
              scaleTarget.style.transformOrigin = "top center";
              scaleTarget.style.transform = `scale(${scaleFactor})`;
              scaleTarget.style.width = sourceWidth + "px";
              scaleTarget.style.height = sourceHeight + "px";
              scaleTarget.style.maxWidth = "none";

              slotEl.style.overflow = "hidden";
              slotEl.style.display = "flex";
              slotEl.style.justifyContent = "center";
              slotEl.style.alignItems = wideTall ? "flex-start" : "center";

              logIntext(`[Intext:Display:${this.id}] ${wideTall ? "display_wide_tall_layout_applied" : "display_wide_standard_layout_applied"}`, {
                source: reason,
                scaleFactor: scaleFactor.toFixed(4),
                contentHeight: heightState.contentHeight,
                totalHeight: heightState.totalHeight,
                sourceWidth,
                sourceHeight,
              });
              logIntext(
                `[Intext:Display:${this.id}] display_960x540_centered - source=${reason}, scale_factor=${scaleFactor.toFixed(4)}, content_height=${heightState.contentHeight}, total_height=${heightState.totalHeight}`,
              );
            } else {
              const isTallDisplay =
                measuredHeight === this.getDisplayExpandedContentHeight() ||
                this.getDisplayHeightFloor(slotEl) === this.getDisplayExpandedContentHeight();
              const heightState = this.applyDisplayWrapperHeight(slotEl, measuredHeight || this.getDisplayStandardContentHeight(), {
                logReason: isTallDisplay ? "display_300x600_visual_height_adjusted" : "",
                source: reason,
              });

              slotEl.style.overflow = "";
              slotEl.style.display = "block";
              slotEl.style.justifyContent = "";
              slotEl.style.alignItems = "";

              scaleTarget.style.transform = "";
              scaleTarget.style.transformOrigin = "";
              scaleTarget.style.width = "";
              scaleTarget.style.height = "";
              scaleTarget.style.maxWidth = "";

              if (measuredHeight > 0 && measuredHeight < (heightState.lockedFloor || this.getDisplayStandardContentHeight())) {
                scaleTarget.style.position = "sticky";
                scaleTarget.style.top = "60px";
                scaleTarget.style.margin = "0 auto";
                scaleTarget.style.alignSelf = "flex-start";
              } else {
                scaleTarget.style.position = "static";
                scaleTarget.style.top = "";
                scaleTarget.style.margin = "0 auto";
                scaleTarget.style.alignSelf = "";
              }
            }

            this._displayRenderState = {
              slotElementId: slotEl.id,
              gamWidth: parseInt(gamWidth, 10) || 0,
              gamHeight: parseInt(gamHeight, 10) || 0,
              actualHeight: measuredHeight || parseInt(slotEl?.dataset?.gexpIntextContentHeight, 10) || 0,
              renderToken,
            };
          } finally {
            this._isApplyingDisplayLayout = false;
          }

          if (!skipGuardRefresh) {
            this.ensureDisplayLayoutGuard(slotEl);
          }
          return this._displayRenderState;
        }

        ensureDisplayLayoutGuard(slotEl) {
          if (!slotEl) return;

          const shouldResetGuard =
            !this._displayLayoutGuardEl || this._displayLayoutGuardEl !== slotEl;
          if (shouldResetGuard) {
            this.clearDisplayLayoutGuard();
            this._displayLayoutGuardEl = slotEl;
          } else if (Array.isArray(this._displayLayoutTimers)) {
            this._displayLayoutTimers.forEach((timerId) => clearTimeout(timerId));
            this._displayLayoutTimers = [];
          }

          if (!this._displayLayoutObserver && typeof MutationObserver !== "undefined") {
            this._displayLayoutObserver = new MutationObserver(() => {
              if (this._isApplyingDisplayLayout) return;
              const state = this._displayRenderState;
              if (!state || state.slotElementId !== slotEl.id) return;
              if (!this.isActiveRenderToken(state.renderToken, "display_layout_guard_observer")) return;
              const expectedTotalHeight =
                parseInt(slotEl.dataset.gexpIntextTotalHeight, 10) || 0;
              const currentInlineHeight = parseInt(slotEl.style.height, 10) || 0;
              const currentDisplay = slotEl.style.display || "";
              const expectedDisplay =
                this.classifyDisplayLayout(state, slotEl).isWide ? "flex" : "block";
              const needsHeightRepair =
                expectedTotalHeight > 0 &&
                currentInlineHeight > 0 &&
                currentInlineHeight < expectedTotalHeight;
              const needsDisplayRepair =
                expectedDisplay === "flex" && currentDisplay !== "flex";

              if (!needsHeightRepair && !needsDisplayRepair) return;

              logIntext(
                `[Intext:Display:${this.id}] display_layout_guard_reapply - attempted_height=${currentInlineHeight || 0}, expected_total_height=${expectedTotalHeight || 0}, attempted_display=${currentDisplay || "unset"}`,
              );
              requestAnimationFrame(() => {
                if (!this.isActiveRenderToken(state.renderToken, "display_layout_guard_reapply_raf")) return;
                this.applyDisplayRenderLayout(slotEl, {
                  ...state,
                  reason: "display_layout_guard_reapply",
                  skipGuardRefresh: true,
                });
              });
            });
            this._displayLayoutObserver.observe(slotEl, {
              attributes: true,
              attributeFilter: ["style"],
            });
          }

          this._displayLayoutTimers = [0, 300, 900, 1800, 3200, 5200].map((delayMs) =>
            this.trackRenderTimer(setTimeout(() => {
              if (!this._displayRenderState || this._displayLayoutGuardEl !== slotEl) return;
              if (!this.isActiveRenderToken(this._displayRenderState.renderToken, `display_layout_post_guard_${delayMs}ms`)) return;
              this.applyDisplayRenderLayout(slotEl, {
                ...this._displayRenderState,
                reason: `display_layout_post_guard_${delayMs}ms`,
                skipGuardRefresh: true,
              });
            }, delayMs)),
          );
        }

        initialize() {
          this.wa = new WindowArray(
            this.id,
            this.manager.gexp.cfg,
            this.manager.gexp,
          );

          if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
            const wrapExistingCallback = (methodName, metric, details = () => ({})) => {
              const original = this.wa?.[methodName];
              if (typeof original !== "function") return;
              this.wa[methodName] = (...args) => {
                const result = original.apply(this.wa, args);
                intextDebugCollector.recordMetric(metric, {
                  node: this,
                  element: this.container?.getElement?.(),
                  ...details(...args),
                });
                return result;
              };
            };
            wrapExistingCallback("onRequested", "display_slot_requested", () => ({ source: "window-array" }));
            wrapExistingCallback("response", "display_slot_response_received", (event = {}) => {
              const responseInfo = event?.slot?.getResponseInformation?.() || {};
              return {
                source: "window-array",
                lineItemId: responseInfo.lineItemId,
                creativeId: responseInfo.creativeId,
                campaignId: responseInfo.campaignId,
                advertiserId: responseInfo.advertiserId,
              };
            });
            wrapExistingCallback("onLoaded", "display_onload", () => ({ source: "window-array" }));
            wrapExistingCallback("onViewable", "display_impression_viewable", () => ({
              source: "window-array",
              impressionViewable: true,
              inViewPercentage: this.wa?.cI?.adMaxViewability ?? null,
              maxInViewPercentage: this.wa?.cI?.adMaxViewability ?? null,
            }));
            wrapExistingCallback("onSlotVisibilityChanged", "display_visibility_changed", (inViewPercentage) => ({
              source: "window-array",
              inViewPercentage,
              maxInViewPercentage: this.wa?.cI?.adMaxViewability ?? inViewPercentage,
            }));
          }
          
          // Block native GEXP core from auto-refreshing Intext slots. 
          // Native refresh bypasses our waterfall, corrupts randoms, ignores video state, and injects empty HBs.
          this.wa.refreshSlot = () => {
            logIntext(`[Intext:Display:${this.id}] Blocked native GEXP refresh. Intext manages its own refresh lifecycle.`);
          };
          
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

        askDisplay(bidResponse, renderToken = this._activeRenderToken, trigger = "unknown") {
          return new Promise((resolve) => {
            if (!this.isActiveRenderToken(renderToken, "askDisplay:start", trigger)) {
              resolve({ filled: false, event: null, stale: true });
              return;
            }
            this.state = "asking_display";
            this._displayRequestInFlight = true;
            this._visualState = "asking_display";
            this.mergeIntextTelemetry({ "gexp-intext-visual-state": this._visualState });
            const networkId = this.manager.resolveIntextRequestNetworkId(this.scopedContext);
            const adUnitPath = this.manager.resolveIntextDisplayAdUnitPath(this.scopedContext);
            let sizes = this.config.display?.sizes || [[300, 250], [336, 280], [320, 100], [320, 50]];

            this.mergeIntextTelemetry({
              ...this.manager.getIntextNetworkTelemetry(this.scopedContext),
              "gexp-intext-display-adunit-request": String(adUnitPath || "none"),
            });
            if (!networkId || !adUnitPath) {
              logIntext(`[Intext:Display:${this.id}] intext_network_force_invalid - display request blocked`);
              this._displayRequestInFlight = false;
              resolve({ filled: false, event: null, networkBlocked: true });
              return;
            }
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
              if (!this.isActiveRenderToken(renderToken, "askDisplay:googletag_cmd", trigger)) {
                resolve({ filled: false, event: null, stale: true });
                return;
              }
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

              const preRequestDisplayTargeting = this.resolveDisplayRequestTargeting();
              this.clearDisplayRequestTargeting(this.slot);
              this.applyDisplayRequestTargeting(this.slot, preRequestDisplayTargeting.targeting);
              this.applyIntextRandomSnapshotToSlot(this.slot);
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

              const isRefresh =
                this._intextTelemetryCycle?.["gexp-intext-refresh"] === "true" ||
                this.waterfall?._intextTelemetryCycle?.["gexp-intext-refresh"] === "true" ||
                this.waterfall?.lastTrigger === "refresh";
              const isFallback =
                this._intextTelemetryCycle?.["gexp-intext-fallback"] === "true" ||
                this.waterfall?._intextTelemetryCycle?.["gexp-intext-fallback"] === "true" ||
                this.waterfall?.lastTrigger === "fallback";
              this.mergeIntextTelemetry({
                "gexp-intext-request-type": "display",
                "gexp-intext": "true",
                "gexp-intext-position": this.id,
                "gexp-intext-display": "true",
                "gexp-intext-is-refresh": isRefresh ? "true" : "false",
                "gexp-intext-refresh": isRefresh ? "true" : "false",
                "gexp-intext-is-fallback": isFallback ? "true" : "false",
                "gexp-intext-fallback": isFallback ? "true" : "false",
              });
              this.manager.gexp.request(this.slot);
              this.ensureIntextCycleTelemetryIdentity();
              this.applyIntextRandomSnapshotToSlot(this.slot);
              this.assertIntextRandomSnapshotOnSlot(this.slot, "after-gexp-request");
              const postCoreSlotTargeting = this.getSlotTargetingMapSafe(this.slot);
              const finalDisplayTargeting = this.resolveDisplayRequestTargeting(postCoreSlotTargeting);

              finalDisplayTargeting.targeting["gexp-intext"] = "true";
              finalDisplayTargeting.targeting["gexp-intext-position"] = this.id;
              finalDisplayTargeting.targeting["gexp-intext-display"] = "true";
              finalDisplayTargeting.targeting["gexp-intext-is-refresh"] = isRefresh ? "true" : "false";
              finalDisplayTargeting.targeting["gexp-intext-refresh"] = isRefresh ? "true" : "false";
              finalDisplayTargeting.targeting["gexp-intext-is-fallback"] = isFallback ? "true" : "false";
              finalDisplayTargeting.targeting["gexp-intext-fallback"] = isFallback ? "true" : "false";

              if (this.wa && this.wa.cI) {
                this.wa.cI["gexp-intext"] = "true";
                this.wa.cI["gexp-intext-position"] = this.id;
                this.wa.cI["gexp-intext-display"] = "true";
                this.wa.cI["gexp-intext-is-refresh"] = isRefresh ? "true" : "false";
                this.wa.cI["gexp-intext-refresh"] = this.wa.cI["gexp-intext-is-refresh"];
                this.wa.cI["gexp-intext-is-fallback"] = isFallback ? "true" : "false";
                this.wa.cI["gexp-intext-fallback"] = this.wa.cI["gexp-intext-is-fallback"];
                this.flushIntextTelemetryToCI();
              }

              this.clearDisplayRequestTargeting(this.slot, "display_request_targeting_cleared_keys_post_core");
              this.applyDisplayRequestTargeting(this.slot, finalDisplayTargeting.targeting);
              this.applyDisplayBidTargeting(this.slot, bidResponse, this.waterfall?._lastCurrentBannerBids);
              if (window.apstag && window.apstag.targetingKeys) {
                const tamKeys = window.apstag.targetingKeys();
                if (tamKeys && tamKeys[this.id]) {
                  Object.entries(tamKeys[this.id]).forEach(([k, v]) => {
                    this.slot.setTargeting(k, v);
                  });
                }
              }
              this.applyIntextRandomSnapshotToSlot(this.slot);
              this.assertIntextRandomSnapshotOnSlot(this.slot, "after-final-display-targeting");

              const initialRenderHandler = (event) => {
                if (event.slot !== this.slot) return;
                googletag
                  .pubads()
                  .removeEventListener("slotRenderEnded", initialRenderHandler);
                if (!this.isActiveRenderToken(renderToken, "display_initial_slotRenderEnded", trigger)) {
                  if (this.isHouseLineItemSentinel(event)) {
                    logIntext(`[Intext:Display:${this.id}] house_lineitem_sentinel_stale_callback_ignored`, {
                      slotCode: this.id,
                      oldToken: renderToken,
                      activeToken: this._activeRenderToken,
                      cycleId: this._intextTelemetryCycleId,
                      lineItemId: event?.lineItemId,
                    });
                  }
                  resolve({ filled: false, event, stale: true });
                  return;
                }

                const hasContent = !event.isEmpty;
                const is1x1 =
                  event.size && event.size[0] === 1 && event.size[1] === 1;
                const renderSize = this.resolveDisplayRenderSizeFromEvent(event, "display_initial_slotRenderEnded");
                if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
                  const isSentinel = this.isHouseLineItemSentinel(event);
                  const gamFilled = event.isEmpty !== true;
                  const realDisplayFilled = gamFilled && !isSentinel;
                  let isHouse = String(event.lineItemType || "").toLowerCase() === "house";
                  try { isHouse ||= this.manager?.gexp?.isHouse?.(event.campaignId, event.lineItemId, event.advertiserId) === true; } catch (e) {}
                  const metricData = {
                    node: this,
                    element: this.container?.getElement?.(),
                    source: "initial-render-handler",
                    trigger,
                    renderToken,
                    isEmpty: event.isEmpty === true,
                    gamFilled,
                    realDisplayFilled,
                    size: event.size,
                    lineItemId: event.lineItemId,
                    creativeId: event.creativeId,
                    campaignId: event.campaignId,
                    advertiserId: event.advertiserId,
                    lineItemType: event.lineItemType,
                  };
                  intextDebugCollector.recordMetric("display_slot_render_ended", metricData);
                  if (gamFilled) intextDebugCollector.recordMetric("display_gam_filled", metricData);
                  if (realDisplayFilled) intextDebugCollector.recordMetric("display_real_filled", metricData);
                  if (!gamFilled) intextDebugCollector.recordMetric("display_empty", metricData);
                  if (isHouse) intextDebugCollector.recordMetric("display_house", metricData);
                  if (isSentinel) intextDebugCollector.recordMetric("display_sentinel", metricData);
                }
                this.mergeIntextTelemetry({
                  "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
                  "gexp-intext-creative-size": this.getDisplayCreativeSizeFromEvent(event),
                  "gexp-intext-gam-event-size": this.getDisplayGamEventSize(event),
                  "gexp-intext-gam-line-item-type": event?.lineItemType,
                  ...this.getDisplayLayoutTelemetry(renderSize),
                  advertiserId: event?.advertiserId,
                  campaignId: event?.campaignId,
                  lineItemId: event?.lineItemId,
                  creativeId: event?.creativeId,
                });
                this.flushIntextTelemetryToCI();
                logIntext(
                  `[Intext:Display:${this.id}] initial slotRenderEnded — isEmpty: ${event.isEmpty}, size: ${JSON.stringify(event.size)}, is1x1: ${is1x1}, hasContent: ${hasContent}`,
                );

                this.maybeIncrementFallbackBlankControl(event, {
                  trigger,
                  renderToken,
                  source: "display_initial_slotRenderEnded",
                });

                if (this.isHouse1x1AutoRefreshCandidate(event)) {
                  this.handleHouse1x1AutoRefresh(event, renderToken);
                  resolve({ filled: false, event, is1x1, suppressed: true, retrying: true, sentinelLineItemId: event?.lineItemId });
                  return;
                }

                if (this.isHouse1x1AutoRefreshMaxReached(event)) {
                  this.handleHouse1x1MaxAttemptsReached(event);
                  resolve({ filled: false, event, is1x1, suppressed: true, retrying: false, maxAttemptsReached: true, sentinelLineItemId: event?.lineItemId });
                  return;
                }

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
                  const activeToken = this._activeRenderToken;
                  const slotDocForToken = document.getElementById(this.id);
                  const eventToken = parseInt(slotDocForToken?.dataset?.gexpIntextRenderToken, 10) || activeToken;
                  if (!this.isActiveRenderToken(eventToken, "display_persistent_slotRenderEnded", this.waterfall?.lastTrigger || "unknown")) return;
                  if (this.isHouseLineItemSentinel(event)) {
                    this.mergeIntextTelemetry(this.getHouseLineItemSentinelTelemetry(event));
                    this.flushIntextTelemetryToCI();
                    logIntext(`[Intext:Display:${this.id}] sentinel render ignored by persistent display telemetry`);
                    return;
                  }
                  
                  if (event.campaignId) {
                      this._lastRenderedCampaignId = String(event.campaignId);
                      if (this.wa && this.wa.cI) {
                          this.wa.cI.campaignId = String(event.campaignId);
                      }
                  }
                  if (event.advertiserId) {
                      this._lastRenderedAdvertiserId = String(event.advertiserId);
                      if (this.wa && this.wa.cI) {
                          this.wa.cI.advertiserId = String(event.advertiserId);
                      }
                  }

                  // Granular Type Telemetry
                  if (this.wa && this.wa.cI) {
                      const gexp = this.manager?.gexp;
                      const bid = this._lastDisplayBid;
                      const campaignId = this._lastRenderedCampaignId;
                      const advertiserId = this._lastRenderedAdvertiserId;
                      let type = event.lineItemType ? event.lineItemType.toLowerCase() : "adserver";

                      const tIds = this.config?.telemetryIds || {};
                      const prebidIds = tIds.prebid || [];
                      const amazonIds = tIds.amazon || [];
                      const adexIds = tIds.adex || [];

                      if (type === "ad_exchange" || adexIds.includes(campaignId) || gexp?.isAdex(campaignId, null, advertiserId)) type = "adex";
                      else if (prebidIds.includes(advertiserId)) type = "prebid";
                      else if (amazonIds.includes(advertiserId)) type = "amazon";
                      else if (gexp?.isHouse(null, null, advertiserId)) type = "house";
                      else if (gexp?.isReloadAllowed(campaignId, null, advertiserId)) type = "cpc";
                      else if (bid && (type === "price_priority" || type === "ad_exchange")) {
                          if (bid.source === "prebid") type = "prebid";
                          else if (bid.source === "amazon") type = "amazon";
                      }
                      
                      this.wa.cI["gexp-intext-type"] = type;
                      const renderSize = this.resolveDisplayRenderSizeFromEvent(event, "display_slotRenderEnded_telemetry");
                      this.mergeIntextTelemetry({
                        "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
                        "gexp-intext-creative-size": this.getDisplayCreativeSizeFromEvent(event),
                        "gexp-intext-gam-event-size": this.getDisplayGamEventSize(event),
                        "gexp-intext-gam-line-item-type": event?.lineItemType,
                        ...this.getDisplayLayoutTelemetry(renderSize),
                        advertiserId: event?.advertiserId,
                        campaignId: event?.campaignId,
                        lineItemId: event?.lineItemId,
                        creativeId: event?.creativeId,
                      });
                      this.flushIntextTelemetryToCI();
                      logIntext(`[Intext:Display:${this.id}] Rendered type: ${type} (Adv:${advertiserId}, Camp:${campaignId})`);
                      
                      // Explicitly register again to ensure statsG has the post-render metadata
                      if (this.manager?.gexp) {
                          this.commitIntextTelemetry("display-render-ended");
                          logIntext(`[Intext:Display:${this.id}] 📤 Post-render telemetry updated`);
                      }
                  }
                  
                  const slotDoc = document.getElementById(this.id);
                  if (slotDoc && event.size) {
                    const renderSize = this.resolveDisplayRenderSizeFromEvent(event, "display_slotRenderEnded");
                    if (renderSize.actualHeight === 600) {
                        this.markDisplayHeightLock(600, slotDoc);
                    }
                    this.applyDisplayRenderLayout(slotDoc, {
                      gamWidth: renderSize.gamWidth,
                      gamHeight: renderSize.gamHeight,
                      actualHeight: renderSize.actualHeight,
                      reason: "display_slotRenderEnded",
                      renderToken: activeToken,
                    });
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

                const videoEl = document.getElementById(this.videoId);
                const activeVideoBridge =
                  this._intextTransitionBridge?.active === true &&
                  this._intextTransitionBridge?.surface === "video" &&
                  String(this._intextTransitionBridge?.renderToken || "") === String(renderToken);
                const preservedHeight = activeVideoBridge
                  ? this.resolveTransitionPreservedHeight(
                      videoEl,
                      this._intextTransitionBridge?.preservedHeight,
                      this.lockedHeight,
                    )
                  : this.getDisplayStandardContentHeight();
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
                if (activeVideoBridge) {
                  this.applyIntextWrapperDebugAttributes(slotEl, {
                    renderToken,
                    visualState: "transition_bridge_display_recreated",
                  });
                  this.applyDisplayWrapperHeight(slotEl, preservedHeight, {
                    logReason:
                      preservedHeight === 600 ? "display_300x600_visual_height_adjusted" : "",
                    source: "askDisplay_recreate_from_video_bridge",
                  });
                  this.ensureTransitionLoader(slotEl, {
                    source: "askDisplay_recreate_from_video_bridge",
                    renderToken,
                    text: "Recuperando anuncio",
                  });
                  slotEl.classList.add("is-open");
                  slotEl.style.display = "";
                  slotEl.style.opacity = "1";
                  slotEl.style.margin = "";
                  slotEl.style.padding = "";
                  slotEl.setAttribute("aria-hidden", "false");
                  slotEl.dataset.gexpIntextTransitionBridgeActive = "true";
                  slotEl.dataset.gexpIntextTransitionBridgeSurface = "display";
                  slotEl.dataset.gexpIntextTransitionBridgeHeight = String(preservedHeight);
                  this.container.isOpen = true;
                  this.mergeIntextTelemetry({
                    "gexp-intext-video-to-display-bridge-display-recreated": "true",
                    "gexp-intext-video-to-display-bridge-swap-complete": "true",
                    "gexp-intext-transition-bridge-surface": "display",
                    "gexp-intext-transition-bridge-height": String(preservedHeight),
                  });
                  logIntext(`[Intext:Display:${this.id}] video_to_display_bridge_display_recreated`, {
                    slotCode: this.id,
                    renderToken,
                    preservedHeight,
                    source: "askDisplay_recreate_from_video_bridge",
                  });
                  logIntext(`[Intext:Display:${this.id}] video_to_display_bridge_display_opened_before_video_hide`, {
                    slotCode: this.id,
                    renderToken,
                    preservedHeight,
                    displayConnected: Boolean(slotEl?.isConnected),
                    videoConnected: Boolean(videoEl?.isConnected),
                  });
                  if (videoEl?.isConnected) {
                    this.hideOppositeTransitionSurface(videoEl, "video", {
                      renderToken,
                      source: "askDisplay_recreate_from_video_bridge",
                    });
                    logIntext(`[Intext:Display:${this.id}] video_to_display_bridge_video_hidden_after_recreate`, {
                      slotCode: this.id,
                      renderToken,
                      preservedHeight,
                    });
                  }
                  this._intextTransitionBridge = {
                    active: true,
                    surface: "display",
                    renderToken,
                    source: "askDisplay_recreate_from_video_bridge",
                    preservedHeight,
                  };
                  logIntext(`[Intext:Display:${this.id}] video_to_display_bridge_swap_complete`, {
                    slotCode: this.id,
                    renderToken,
                    preservedHeight,
                  });
                } else {
                  slotEl.style.height = "0px";
                  slotEl.style.minHeight = "0px";
                  slotEl.style.opacity = "0";
                  slotEl.style.display = "none";
                  slotEl.style.margin = "0";
                  slotEl.style.padding = "0";
                }
              }
              slotEl = this.ensureSingleIntextWrapper(slotEl, {
                source: "askDisplay_before_display",
                renderToken,
                visualState: "asking_display",
              }) || slotEl;
              if (slotEl && this.container?.getElement?.() !== slotEl && typeof this.container.setElement === "function") {
                this.container.setElement(slotEl);
              }

              if (slotEl && !slotEl.hasAttribute("data-gpt-displayed")) {
                googletag.display(this.id);
                slotEl.setAttribute("data-gpt-displayed", "true");
              }

              const beforeRefreshTargeting = this.getDisplayGamRequestTargetingFinal(this.slot);

              logIntext(
                `[Intext:Display:${this.id}] display_before_refresh_targeting_snapshot`,
                {
                  final: beforeRefreshTargeting,
                  allHbTargeting: this.pickHbTargeting(this.getSlotTargetingMapSafe(this.slot)),
                  rawRandom1: this.getSlotTargetingValueSafe(this.slot, "random1"),
                  rawRandom2: this.getSlotTargetingValueSafe(this.slot, "random2"),
                  rawRandom3: this.getSlotTargetingValueSafe(this.slot, "random3"),
                  rawRandom4: this.getSlotTargetingValueSafe(this.slot, "random4"),
                  rawHbPb: this.getSlotTargetingValueSafe(this.slot, "hb_pb"),
                  rawHbBidder: this.getSlotTargetingValueSafe(this.slot, "hb_bidder"),
                  rawHbFormat: this.getSlotTargetingValueSafe(this.slot, "hb_format"),
                  rawHbAdid: this.getSlotTargetingValueSafe(this.slot, "hb_adid"),
                },
              );

              logIntext(
                `[Intext:Display:${this.id}] display_gam_request_targeting_final`,
                this.getDisplayGamRequestTargetingFinal(this.slot),
              );
              if (!this.isActiveRenderToken(renderToken, "askDisplay:before_refresh", trigger)) {
                resolve({ filled: false, event: null, stale: true });
                return;
              }
              this.assertIntextRandomSnapshotOnSlot(this.slot, "immediately-before-gpt-refresh");
              googletag.pubads().refresh([this.slot]);
            });
          });
        }

        waitForViewport(renderToken = this._activeRenderToken, source = "waitForViewport") {
          return new Promise((resolve) => {
            const el = this.container.getElement();
            if (typeof IntersectionObserver === "undefined" || !el) {
              return resolve();
            }
            const observer = new IntersectionObserver((entries) => {
              if (!this.isActiveRenderToken(renderToken, source)) {
                observer.disconnect();
                resolve("stale");
                return;
              }
              if (entries[0].isIntersecting) {
                observer.disconnect();
                resolve();
              }
            }, { threshold: 0, rootMargin: "0px" });
            observer.observe(el);
          });
        }

        async showDisplay(displayResult, renderToken = this._activeRenderToken, trigger = "unknown") {
          if (!this.isActiveRenderToken(renderToken, "showDisplay:start", trigger)) return false;
          if (trigger === "fallback" || this._intextPipState === "floating") {
            this.cleanupIntextPip(trigger === "fallback" ? "video-fallback" : "container-close");
          }
          const viewportState = await this.waitForViewport(renderToken, "showDisplay:waitForViewport");
          if (viewportState === "stale" || !this.isActiveRenderToken(renderToken, "showDisplay:afterViewport", trigger)) return false;

          this.state = "display";
          this._displayRequestInFlight = false;
          this._visualState = "display";
          this.setupIntextViewportTelemetryObserver();
          const { event, is1x1 } = displayResult;
          const creativeHeight = event.size && !is1x1 ? event.size[1] : null;
          const activeDisplayEl = this.ensureSingleIntextWrapper(this.container.getElement(), {
            source: "showDisplay",
            renderToken,
            visualState: "display",
          }) || this.container.getElement();
          if (activeDisplayEl && activeDisplayEl !== this.container.getElement()) {
            this.container.setElement(activeDisplayEl);
          }
          const loader = this.container
            .getElement()
            .querySelector(".gexp-intext-loader");
          if (loader) loader.style.display = "none";

          const videoLoader = this.videoContainer
            .getElement()
            .querySelector(".gexp-intext-loader");
          if (videoLoader) videoLoader.style.display = "none";
          this.ensureSingleVisibleIntextSurface("display", renderToken, "showDisplay_before_open");

           const renderSize = this.resolveDisplayRenderSizeFromEvent(event, "display_showDisplay");
           const actualCreativeHeight = renderSize.actualHeight;
           if (actualCreativeHeight === 600) {
               const specialProfile = this.getDisplaySpecialCreativeProfile(renderSize.gamWidth, renderSize.gamHeight);
               if (!specialProfile.isSpecial) {
                   this.markDisplayHeightLock(600, this.container.getElement());
               }
           }

           const slotDoc = this.ensureSingleIntextWrapper(document.getElementById(this.id), {
             source: "showDisplay_before_open",
             renderToken,
             visualState: "display",
           }) || document.getElementById(this.id);
           const incomingSpecialProfile = this.getDisplaySpecialCreativeProfile(
             renderSize.gamWidth,
             renderSize.gamHeight,
           );
           let specialHidden = false;
           let specialHiddenEl = null;
           let specialRevealRecoveredFromError = false;
           if (slotDoc) {
              slotDoc.style.transition = "none";
              if (this.lockedHeight) {
                  slotDoc.dataset.lockedHeight = String(this.lockedHeight);
              }
              if (incomingSpecialProfile.isSpecial) {
                  this.ensureTransitionLoader(slotDoc, {
                    source: "display_special_creative_loader_preserved_until_layout",
                    renderToken,
                    text: "Recuperando anuncio",
                  });
                  slotDoc.dataset.gexpIntextSpecialCreativeActive = "true";
                  slotDoc.dataset.gexpIntextDisplayFillActive = "true";
                  specialHiddenEl = this.findDisplayCreativeSurface(slotDoc);
                  if (specialHiddenEl?.isConnected) {
                    specialHiddenEl.style.visibility = "hidden";
                    specialHidden = true;
                    logIntext(`[Intext:Display:${this.id}] display_special_creative_surface_hidden`, {
                      slotCode: this.id,
                      renderToken,
                      sourceWidth: incomingSpecialProfile.sourceWidth,
                      sourceHeight: incomingSpecialProfile.sourceHeight,
                      layoutKind: incomingSpecialProfile.layoutKind,
                      surfaceTag: specialHiddenEl.tagName || "unknown",
                      surfaceId: specialHiddenEl.id || "",
                    });
                    logIntext(`[Intext:Display:${this.id}] display_special_creative_loader_preserved_until_layout`, {
                      slotCode: this.id,
                      renderToken,
                      layoutKind: incomingSpecialProfile.layoutKind,
                    });
                    this.mergeIntextTelemetry({
                      "gexp-intext-special-creative-prerender-hidden": "true",
                      "gexp-intext-special-creative-surface-hidden": "true",
                      "gexp-intext-special-creative-loader-preserved": "true",
                    });
                  } else {
                    logIntext(`[Intext:Display:${this.id}] display_special_creative_surface_hide_skipped`, {
                      slotCode: this.id,
                      renderToken,
                      reason: "creative_surface_not_found",
                      sourceWidth: incomingSpecialProfile.sourceWidth,
                      sourceHeight: incomingSpecialProfile.sourceHeight,
                      layoutKind: incomingSpecialProfile.layoutKind,
                    });
                    this.mergeIntextTelemetry({
                      "gexp-intext-special-creative-prerender-hide-skipped": "true",
                      "gexp-intext-special-creative-loader-preserved": "true",
                    });
                  }
              } else if (incomingSpecialProfile.reason === "invalid-size") {
                  logIntext(`[Intext:Display:${this.id}] display_special_creative_prerender_hide_skipped`, {
                    slotCode: this.id,
                    renderToken,
                    reason: incomingSpecialProfile.reason,
                    sourceWidth: incomingSpecialProfile.sourceWidth,
                    sourceHeight: incomingSpecialProfile.sourceHeight,
                  });
                  this.mergeIntextTelemetry({
                    "gexp-intext-special-creative-prerender-hide-skipped": "true",
                  });
              }
           }

          try {
            this.container.open(this.lockedHeight);
            if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
              const metricData = {
                node: this,
                element: slotDoc || this.container?.getElement?.(),
                trigger,
                renderToken,
                size: event.size,
                lineItemId: event.lineItemId,
                creativeId: event.creativeId,
                campaignId: event.campaignId,
                advertiserId: event.advertiserId,
                lineItemType: event.lineItemType,
              };
              intextDebugCollector.recordMetric("display_wrapper_opened", metricData);
              if (trigger === "refresh") {
                intextDebugCollector.recordMetric("display_refresh_completed", { ...metricData, isRefresh: true });
              }
            }
            this.markIntextRealRenderTelemetry("display-open", trigger);
            this.recordTelemetry("fill", { slotId: this.id, size: event.size });

             if (slotDoc) {
               slotDoc.classList.add("is-open");
                slotDoc.dataset.gexpIntextDisplayFillActive = "true";
                slotDoc.style.display = "block";
                slotDoc.style.opacity = "1";
                slotDoc.style.margin = "";
                slotDoc.style.padding = "";
               this.applyDisplayRenderLayout(slotDoc, {
                 gamWidth: renderSize.gamWidth,
                 gamHeight: renderSize.gamHeight,
                 actualHeight: actualCreativeHeight,
                 reason: "display_showDisplay",
                 renderToken,
               });

                    this.trackRenderTimer(setTimeout(() => {
                        if (!this.isActiveRenderToken(renderToken, "showDisplay_transition_restore", trigger)) return;
                        if (slotDoc?.isConnected && this.container?.getElement?.() === slotDoc) slotDoc.style.transition = "";
                    }, 50));
                }
           } catch (e) {
             specialRevealRecoveredFromError = true;
             throw e;
           } finally {
             if (specialHidden && specialHiddenEl?.isConnected) {
               specialHiddenEl.style.visibility = "";
               logIntext(`[Intext:Display:${this.id}] display_special_creative_surface_revealed`, {
                 slotCode: this.id,
                 renderToken,
                 recoveredFromError: specialRevealRecoveredFromError,
               });
               logIntext(`[Intext:Display:${this.id}] display_special_creative_revealed_after_layout`, {
                 slotCode: this.id,
                 renderToken,
                 recoveredFromError: specialRevealRecoveredFromError,
               });
               if (specialRevealRecoveredFromError) {
                 logIntext(`[Intext:Display:${this.id}] display_special_creative_reveal_recovered_from_error`, {
                   slotCode: this.id,
                   renderToken,
                 });
               }
               this.mergeIntextTelemetry({
                 "gexp-intext-special-creative-revealed-after-layout": "true",
                 "gexp-intext-special-creative-surface-revealed": "true",
               });
             }
             if (incomingSpecialProfile?.isSpecial && slotDoc?.isConnected) {
               const transitionLoader = slotDoc.querySelector?.(".gexp-intext-loader");
               if (transitionLoader) {
                 transitionLoader.style.display = "none";
                 delete transitionLoader.dataset.gexpIntextTransitionLoader;
               }
               if (slotDoc.dataset) {
                 delete slotDoc.dataset.gexpIntextTransitionLoaderActive;
               }
               logIntext(`[Intext:Display:${this.id}] display_special_creative_loader_hidden_after_layout`, {
                 slotCode: this.id,
                 renderToken,
                 hadHiddenSurface: specialHidden === true,
                 layoutKind: incomingSpecialProfile.layoutKind,
                 sourceWidth: incomingSpecialProfile.sourceWidth,
                 sourceHeight: incomingSpecialProfile.sourceHeight,
               });
               this.mergeIntextTelemetry({
                 "gexp-intext-special-creative-loader-hidden-after-layout": "true",
               });
               this.trackRenderTimer(setTimeout(() => {
                 if (!this.isActiveRenderToken(renderToken, "special_creative_active_flag_cleanup", trigger)) return;
                 const currentDisplayEl = this.container?.getElement?.();
                 if (currentDisplayEl === slotDoc && slotDoc?.isConnected) {
                   delete slotDoc.dataset.gexpIntextSpecialCreativeActive;
                   logIntext(`[Intext:Display:${this.id}] display_special_creative_active_flag_cleared`, {
                     slotCode: this.id,
                     renderToken,
                   });
                 }
               }, 700));
             }
           }
               
              this.videoContainer.close({ destroy: true });
    
              this.completeVisualRender(renderToken, "display_completed");
              this.scheduleWaterfallRetry(renderToken);
              return true;
            }

        scheduleWaterfallRetry(renderToken = this._activeRenderToken) {
          const refreshCfg = this.config.refreshCycle;
          if (!refreshCfg || !refreshCfg.enabled) return;
          if (!this.isActiveRenderToken(renderToken, "scheduleWaterfallRetry:start", this.waterfall?.lastTrigger || "unknown")) return;

          this._cycleCount = (this._cycleCount || 0) + 1;
          if (this._cycleCount >= refreshCfg.maxCycles) {
            logIntext(`[Intext:Display:${this.id}] Max refresh cycles reached (${this._cycleCount}/${refreshCfg.maxCycles}).`);
            return;
          }

          let targetIntervalMs = refreshCfg.delayMs || 30000;
          
          if (this._lastRenderedCampaignId || this._lastRenderedAdvertiserId) {
              const gexp = this.manager?.gexp;
              const campaignId = this._lastRenderedCampaignId ? parseInt(this._lastRenderedCampaignId, 10) : null;
              const advertiserId = this._lastRenderedAdvertiserId ? parseInt(this._lastRenderedAdvertiserId, 10) : null;
              
              if (gexp?.isHouse(null, null, advertiserId)) {
                  targetIntervalMs = refreshCfg.houseDelayMs || targetIntervalMs;
              } else if (gexp?.isReloadAllowed(campaignId, null, advertiserId)) {
                  targetIntervalMs = refreshCfg.cpcDelayMs || targetIntervalMs;
              } else if (this.wa?.cI?.["gexp-intext-type"] === "adex") {
                  targetIntervalMs = refreshCfg.adexDelayMs || targetIntervalMs;
              }
          }
          
          logIntext(`[Intext:Display:${this.id}] ⏱️ Scheduling Waterfall Retry ${this._cycleCount}/${refreshCfg.maxCycles} (Requires ${targetIntervalMs}ms of VISIBLE time)`);

          if (this._visibilityTimer) {
            this._visibilityTimer.stop();
          }

          const el = document.getElementById(this.id);
          if (!el) {
             this.trackRenderTimer(setTimeout(() => {
                 if (!this.isActiveRenderToken(renderToken, "display_refresh_missing_el_timer", "refresh")) return;
                 this.destroyDisplayForRetry(renderToken, "display_refresh_missing_el");
                 this.waterfall.prebidStarted = false;
                 this.waterfall.startAuction("refresh");
             }, targetIntervalMs));
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
            if (!this.isActiveRenderToken(renderToken, "display_refresh_visible_timer", "refresh")) return;
            this.destroyDisplayForRetry(renderToken, "display_refresh_visible_timer");
            this.waterfall.prebidStarted = false;
            this.waterfall.startAuction("refresh");
          };

          const updateAccumulator = () => {
            if (!this.isActiveRenderToken(renderToken, "display_refresh_update_accumulator", "refresh")) {
                if (observer) observer.disconnect();
                if (checkInterval) clearInterval(checkInterval);
                return;
            }
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

        destroyDisplayForRetry(renderToken = this._activeRenderToken, source = "destroyDisplayForRetry") {
             if (!this.isActiveRenderToken(renderToken, source, this.waterfall?.lastTrigger || "unknown")) return null;
             this.teardownIntextViewportTelemetryObserver();
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
             this.applyIntextWrapperDebugAttributes(newWrapper, {
               renderToken,
               visualState: "refresh_pending",
             });
             this.applyDisplayWrapperHeight(newWrapper, preservedHeight, {
               logReason:
                 preservedHeight === 600 ? "display_300x600_visual_height_adjusted" : "",
               source: "destroyDisplayForRetry",
             });
             newWrapper.classList.add("is-open");
             newWrapper.style.opacity = "1";
             newWrapper.style.display = "block";
             const newLoader = newWrapper.querySelector(".gexp-intext-loader");
             if (newLoader) newLoader.style.display = "flex";

             if (currentEl && currentEl.parentNode) {
                 this.ensureSingleIntextWrapper(currentEl, {
                   source: `${source}:before_replace`,
                   renderToken,
                   visualState: "refresh_pending",
                 });
                 currentEl.parentNode.insertBefore(newWrapper, currentEl);
                 currentEl.style.transition = "none";
                 currentEl.style.display = "none";
                 currentEl.dataset.gexpIntextVisualState = "stale";
                 currentEl.remove();
             } else if (this.placement && this.placement.paragraph) {
                 this.placement.paragraph.parentNode.insertBefore(newWrapper, this.placement.paragraph.nextSibling);
             }

             this.container.setElement(newWrapper);
             this.container.isOpen = true;
             this.ensureSingleIntextWrapper(newWrapper, {
               source,
               renderToken,
               visualState: "refresh_pending",
             });
             this.setupIntextViewportTelemetryObserver();
             return newWrapper;
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

        async buildAndPlayVideo(gamVideoTagUrl, renderToken = this._activeRenderToken, trigger = "unknown") {
          if (!this.isActiveRenderToken(renderToken, "buildAndPlayVideo:start", trigger)) return false;
          const viewportState = await this.waitForViewport(renderToken, "buildAndPlayVideo:waitForViewport");
          if (viewportState === "stale" || !this.isActiveRenderToken(renderToken, "buildAndPlayVideo:afterViewport", trigger)) return false;
          
          this.state = "video";
          this._visualState = "video";
          this.mergeIntextTelemetry({
            "gexp-intext-pip-effective-enabled": this.isIntextPipEffectiveEnabled() ? "true" : "false",
          });
          this.setupIntextViewportTelemetryObserver();
          if (this._videoTiming?.auctionStartAt && this._videoTiming?.requestWinnerVideoAt) {
            logIntext(
              `[Intext:Video:${this.videoId}] timing trigger=${this._videoTiming.trigger || "unknown"} auction_to_request_winner_video=${this._videoTiming.requestWinnerVideoAt - this._videoTiming.auctionStartAt}ms`,
            );
          }
          logIntext(
            `[Intext:Video:${this.videoId}] 🎬 VIDEO WON — building player`,
          );

          const containerEl = this.videoContainer.getElement();
          this.applyIntextWrapperDebugAttributes(containerEl, {
            renderToken,
            visualState: "video",
            slotCode: this.videoId || this.id,
          });
          containerEl.style.pointerEvents = "none";

          const creativeOpts = {
            container: this.videoContainer,
            node: this,
            config: this.config,
            onVideoEnded: () => this.onVideoEnded(renderToken),
            adTagUrl: gamVideoTagUrl,
            videoTiming: this._videoTiming,
          };

          this.activeCreative = new IntextVideoCreative(creativeOpts);

          try {
            await this.activeCreative.render();
            if (!this.isActiveRenderToken(renderToken, "buildAndPlayVideo:after_render", trigger)) {
              this.activeCreative?.destroy?.();
              return false;
            }

            logIntext(
              `[Intext:Video:${this.videoId}] ✅ Video ad is playing — revealing container`,
            );
            this.ensureSingleVisibleIntextSurface("video", renderToken, "buildAndPlayVideo_before_reveal");
            const vc = this.waterfall?.resolveIntextVideoConfig?.() || this.config?.video || {};
            const playerSize = Array.isArray(vc.playerSize) && vc.playerSize.length === 2 ? vc.playerSize : [640, 360];
            this.mergeIntextTelemetry({
              "gexp-intext-request-type": "video",
              "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
              "gexp-intext-creative-size": `${playerSize[0]}x${playerSize[1]}`,
            });
            this.flushIntextTelemetryToCI();
            this.commitIntextTelemetry("video-rendered");
            containerEl.style.pointerEvents = "auto";
            this.recordTelemetry("video_fill", { slotId: this.videoId });
            this.discardDisplay();
            this.completeVisualRender(renderToken, "video_completed");
          } catch (err) {
            if (!this.isActiveRenderToken(renderToken, "buildAndPlayVideo:catch", trigger)) return false;
            logIntext(
              `[Intext:Video:${this.videoId}] ❌ Video build/play failed: ${err.message || err}`,
            );
            logIntext(`[Intext:Video:${this.videoId}]    Full error:`, err);

            const loader = containerEl.querySelector(".gexp-intext-loader");
            if (loader) loader.style.display = "none";

            const videoErrorRawMessage = String(err?.message || err || "unknown");
            const videoErrorCode =
              videoErrorRawMessage === "video_ad_timeout" || videoErrorRawMessage === "contrib_ads_timeout"
                ? "timeout"
                : String(
                    this._intextTelemetryCycle?.["gexp-intext-video-error-code"] ||
                    this.wa?.cI?.["gexp-intext-video-error-code"] ||
                    "unknown",
                  );
            const videoErrorMessage = videoErrorCode === "timeout" ? "video_ad_timeout" : videoErrorRawMessage;
            this.cleanupIntextPip(videoErrorCode === "timeout" ? "video-timeout" : "video-error");
            this.activeCreative?.destroy?.();
            this.mergeIntextTelemetry({
              "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
              "gexp-intext-video-failed": "true",
              "gexp-intext-video-error-code": videoErrorCode,
              "gexp-intext-video-error-message": videoErrorMessage,
            });
            this.flushIntextTelemetryToCI({ register: true, reason: "video-error" });
            this.recordTelemetry("video_no_fill", { slotId: this.videoId });
            containerEl.style.pointerEvents = "";
            this.teardownIntextViewportTelemetryObserver();
            this.flushIntextTelemetryToCI();
            this.videoContainer.close({ destroy: true });
            return false;
          }
          return true;
        }
        
        resolveIntextVideoRefreshPlan() {
          const refreshCfg = this.config?.refreshCycle || null;
          const enabled = refreshCfg?.enabled === true;
          const nextCycleCount = (this._cycleCount || 0) + (enabled ? 1 : 0);
          const configuredMaxCycles = Number(refreshCfg?.maxCycles);
          const maxCycles = Number.isFinite(configuredMaxCycles)
            ? configuredMaxCycles
            : Infinity;
          const maxCyclesReached =
            enabled && nextCycleCount >= maxCycles;
          const visibilityObserverAvailable =
            typeof IntersectionObserver !== "undefined";
          const anchor =
            enabled && !maxCyclesReached
              ? this.videoContainer?.getElement?.() || null
              : null;
          const blocked =
            enabled &&
            !maxCyclesReached &&
            (!anchor || !visibilityObserverAvailable);
          const blockedReason = !blocked
            ? "none"
            : !anchor
              ? "refresh-anchor-missing"
              : "refresh-visibility-unavailable";
          return {
            enabled,
            refreshCfg,
            nextCycleCount,
            maxCycles,
            maxCyclesReached,
            anchor,
            visibilityObserverAvailable,
            blocked,
            blockedReason,
          };
        }

        onVideoEnded(renderToken = this._activeRenderToken) {
          if (!this.isActiveRenderToken(renderToken, "onVideoEnded", this.waterfall?.lastTrigger || "unknown")) return;
          const endedWhilePip = this._intextPipState === "floating";
          this.exitIntextPip("video-ended");
          this._intextPipState = "ended";
          if (endedWhilePip) {
            this.mergeIntextTelemetry({
              "gexp-intext-pip-ended-while-active": "true",
              "gexp-intext-pip-last-exit-reason": "video-ended",
            });
            this.recordIntextPipEvent("video_pip_video_ended", "video-ended");
          }
          const refreshPlan = this.resolveIntextVideoRefreshPlan();
          this.mergeIntextTelemetry({
            "gexp-intext-refresh-blocked":
              refreshPlan.blocked ? "true" : "false",
            "gexp-intext-refresh-blocked-reason":
              refreshPlan.blockedReason,
          });
          this.flushIntextTelemetryToCI({
            register: true,
            reason: "video-ended",
          });
          logIntext(`[Intext:Video:${this.videoId}] 🔄 Video playback ended`);

          const refreshCfg = refreshPlan.refreshCfg;
          if (!refreshPlan.enabled) {
            logIntext(
              `[Intext:Video:${this.videoId}] Refresh cycle disabled — keeping container open for UX stability or closing`,
            );
            this.teardownIntextViewportTelemetryObserver();
            this.flushIntextTelemetryToCI({ register: true, reason: "close-all" });
            this.videoContainer.close({ destroy: true });
            this.manager.onSlotComplete(this.id);
            return;
          }

          this._cycleCount = refreshPlan.nextCycleCount;
          if (refreshPlan.maxCyclesReached) {
            logIntext(
              `[Intext:Video:${this.videoId}] Max refresh cycles reached (${this._cycleCount}/${refreshCfg.maxCycles}) — closing`,
            );
            this.videoContainer.close({ destroy: true });
            this.manager.onSlotComplete(this.id);
            return;
          }

          const targetIntervalMs = refreshCfg.videoIntervalMs || 0;
          logIntext(`[Intext:Video:${this.videoId}] ⏱️ Scheduling Video Refresh ${this._cycleCount}/${refreshCfg.maxCycles} (Requires ${targetIntervalMs}ms of VISIBLE time)`);

          if (refreshPlan.blocked) {
            logIntext(
              `[Intext:Video:${this.videoId}] ${refreshPlan.blockedReason}`,
            );
            this.teardownIntextViewportTelemetryObserver();
            this.cleanupIntextPip(refreshPlan.blockedReason);
            this.activeCreative?.destroy?.();
            this.activeCreative = null;
            this.videoContainer.close({ destroy: true });
            this.manager.onSlotComplete(this.id);
            return;
          }

          const el = refreshPlan.anchor;
          if (this._videoVisibilityTimer) {
             this._videoVisibilityTimer.stop();
          }

          let accumulatedVisibleTime = 0;
          let lastVisibleTimestamp = 0;
          let isCurrentlyVisible = false;
          let checkInterval;
          let observer;

          const triggerRefresh = () => {
             if (!this.isActiveRenderToken(renderToken, "video_refresh_visible_timer", "refresh")) return;
             if (observer) observer.disconnect();
             if (checkInterval) clearInterval(checkInterval);
             logIntext(
               `[Intext:Video:${this.videoId}] 🔄 Visible time reached (${targetIntervalMs}ms) -> Starting refresh cycle ${this._cycleCount}/${refreshCfg.maxCycles} (mode: ${refreshCfg.mode || "display_only"})`,
             );
             this.cleanupIntextPip("refresh");
             this.activeCreative?.destroy?.();
             this.activeCreative = null;
             this.waterfall.prebidStarted = false;
             this.waterfall.startAuction("refresh");
          };

          const updateAccumulator = () => {
             if (!this.isActiveRenderToken(renderToken, "video_refresh_update_accumulator", "refresh")) {
                 if (observer) observer.disconnect();
                 if (checkInterval) clearInterval(checkInterval);
                 return;
             }
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

          observer = new IntersectionObserver((entries) => {
                  const entry = entries[0];
                  const wasVisible = isCurrentlyVisible;
                  isCurrentlyVisible = entry?.isIntersecting === true;
                  
                  if (isCurrentlyVisible && !wasVisible && document.visibilityState === 'visible') {
                      lastVisibleTimestamp = Date.now();
                      if (targetIntervalMs === 0) updateAccumulator(); // Fast-path for 0ms
                  } else if (!isCurrentlyVisible && wasVisible) {
                      updateAccumulator();
                      logIntext(`[Intext:Video:${this.videoId}] Slot not visible — pausing video refresh timer until viewport entry`);
                  }
              }, { threshold: 0.1 });
          observer.observe(el);

          checkInterval = setInterval(updateAccumulator, 500);

          this._videoVisibilityTimer = {
             stop: () => {
                if (observer) observer.disconnect();
                if (checkInterval) clearInterval(checkInterval);
             }
          };
        }
        
        closeAll() {
          this.cleanupIntextPip("container-close");
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
            this.applyDisplayWrapperHeight(displayEl, this.lockedHeight || this.getDisplayStandardContentHeight(), {
              logReason:
                this.lockedHeight === 600 ? "display_300x600_visual_height_adjusted" : "",
              source: "closeAll_display_container",
            });
            displayEl.style.opacity = "1";
            if (videoInDom) this.videoContainer.close({ destroy: false });
          } else if (videoInDom) {
            videoEl.classList.add("is-open");
            videoEl.style.display = "block";
            this.applyDisplayWrapperHeight(videoEl, this.lockedHeight || this.getDisplayStandardContentHeight(), {
              logReason:
                this.lockedHeight === 600 ? "display_300x600_visual_height_adjusted" : "",
              source: "closeAll_video_container",
            });
            videoEl.style.opacity = "1";
            logIntext(`[Intext:Slot:${this.id}] ⬜ Keeping VIDEO container open (display was destroyed)`);
          } else {
            logIntext(`[Intext:Slot:${this.id}] ⬜ No container in DOM — nothing to preserve`);
          }

          this.teardownIntextViewportTelemetryObserver();
          this.mergeIntextTelemetry({
            "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
          });
          this.flushIntextTelemetryToCI({ register: true, reason: "no-fill" });
          this.recordTelemetry("no_fill", { slotId: this.id });
          this.manager.onSlotComplete(this.id);
        }

        handleCreativeError(reason) {
          this.cleanupIntextPip("video-error");
          this.state = "error";
          this.recordTelemetry("error", { reason });
          this.container.close({ destroy: false });
          this.waterfall?.handleCreativeFailure();
        }

        recordTelemetry(eventName, payload = {}) {
          this.mergeIntextTelemetry({
            "gexp-intext-lifecycle-event": String(eventName || "unknown"),
            "gexp-intext-lifecycle-payload": JSON.stringify(payload || {}),
          });
          this.flushIntextTelemetryToCI();
          if (eventName === "error") {
            this.manager?.registerIntextDiagnosticEvent?.({
              diagnosticKey: `creative-error:${this.id}:${this._intextTelemetryCycleId}`,
              "gexp-intext-diagnostic-context": String(payload?.reason || "unknown"),
              "slot-id": String(this.id),
              "cycle-id": String(this._intextTelemetryCycleId || 0),
              "render-token": String(this._activeRenderToken || 0),
            });
          }
        }

        resetNode() {
          logIntext(`[Intext:Display:${this.id}] intext_node_reset_visual_state`, {
            slotCode: this.id,
            activeToken: this._activeRenderToken,
            cycleId: this._intextTelemetryCycleId,
            visualState: this._visualState,
          });
          this.cleanupIntextPip("node-destroy");
          this._intextPipState = "destroyed";
          this._nodeActive = false;
          this.invalidateVisualCallbacks("reset");
          this.state = "idle";
          this.clearDisplayLayoutGuard();
          this.teardownIntextViewportTelemetryObserver();
          this.flushIntextTelemetryToCI({ register: true, reason: "destroy" });
          if (this.slot) {
            googletag.cmd.push(() => googletag.destroySlots([this.slot]));
          }
          this.activeCreative?.destroy?.();
          this.container.destroy();
          this.videoContainer?.destroy?.();
          
          if (this.waterfall) {
             this.waterfall.cleanup?.();
             this.waterfall.pendingAuction = null;
             this.waterfall.renderTriggeredWaitingForFetch = null;
             this.waterfall.fetchStarted = false;
             this.waterfall.fetchComplete = false;
             this.waterfall.renderStarted = false;
             this.waterfall.prebidStarted = false;
             if (this.waterfall._visibilityTimer) {
                 this.waterfall._visibilityTimer.stop();
                 this.waterfall._visibilityTimer = null;
             }
             if (this.waterfall._videoVisibilityTimer) {
                 this.waterfall._videoVisibilityTimer.stop();
                 this.waterfall._videoVisibilityTimer = null;
             }
          }

          this.findIntextWrappersForNode().forEach((el) => {
            if (!el?.isConnected) return;
            el.dataset.gexpIntextVisualState = "stale";
            el.style.transition = "none";
            el.style.display = "none";
            try { el.remove(); } catch (e) {}
          });

          delete this.manager.gexp.windows[this.id];
        }
      }

      class IntextContainer {
        constructor(domNode, styleConfig = {}) {
          this.domNode = domNode;
          this.styleConfig = styleConfig;
          this.isOpen = false;
          this.ownerNode = null;
          this.applyStyles();
        }

        applyStyles() {
          const style = this.styleConfig || {};
          const containerBackground =
            typeof style.containerBackground === "string"
              ? style.containerBackground.trim()
              : style.containerBackground;
          const hasCustomBackground =
            !!containerBackground &&
            !(
              typeof containerBackground === "string" &&
              containerBackground.toLowerCase() === "transparent"
            );

          if (hasCustomBackground) {
            this.domNode.style.setProperty("--gexp-intext-bg", containerBackground);
            this.domNode.style.backgroundColor = containerBackground;
          } else {
            this.domNode.style.removeProperty("--gexp-intext-bg");
            this.domNode.style.removeProperty("background-color");
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
          const elToOpen = this.domNode;
          if (!elToOpen) return;
          let finalHeight;
          if (lockedHeightOverride && lockedHeightOverride > 1) {
              const chromeHeight =
                typeof elToOpen?.dataset?.wrapperChromeHeight !== "undefined"
                  ? parseInt(elToOpen.dataset.wrapperChromeHeight, 10) || 15
                  : 15;
              finalHeight = (lockedHeightOverride + chromeHeight) + "px";
          } else {
              const preset = elToOpen.dataset.targetHeight;
              finalHeight = preset || "360px";
          }
          elToOpen.style.height = '0px';
          elToOpen.style.minHeight = '';
          requestAnimationFrame(() => {
            if (this.domNode !== elToOpen || !elToOpen.isConnected) {
              logIntext(`[Intext:Container] intext_container_open_stale_skipped`);
              return;
            }
            requestAnimationFrame(() => {
              if (this.domNode !== elToOpen || !elToOpen.isConnected) {
                logIntext(`[Intext:Container] intext_container_open_stale_skipped`);
                return;
              }
              elToOpen.classList.add("is-open");
              elToOpen.style.height = finalHeight;
              if (typeof window !== "undefined" && window.gexpIntextDebug === true && this.ownerNode?.container === this) {
                intextDebugCollector.recordTimeline("wrapper-open", {
                  node: this.ownerNode,
                  element: elToOpen,
                });
              }
            });
          });
        }

        close({ destroy = false } = {}) {
          const elToDestroy = this.domNode;
          if (!elToDestroy) return;
          const getProtectedDestroyReason = (el) => {
            if (!el?.isConnected) return "";
            const hasPreservedHeight =
              (parseInt(el.dataset?.gexpIntextContentHeight, 10) || 0) >= 345 ||
              (parseInt(el.dataset?.gexpIntextTotalHeight, 10) || 0) >= 345 ||
              (parseInt(el.style?.height, 10) || 0) >= 345;
            const visiblyOpen = el.style?.display !== "none" && el.style?.opacity !== "0";
            const loaderActive =
              el.dataset?.gexpIntextTransitionLoaderActive === "true" ||
              el.querySelector?.(".gexp-intext-loader[style*='flex']");
            const isOwnerDisplayWrapper = this.ownerNode?.container?.getElement?.() === el;
            const isOwnerVideoWrapper = this.ownerNode?.videoContainer?.getElement?.() === el;
            if (el.dataset?.gexpIntextTransitionBridgeActive === "true") return "transition_bridge";
            if (el.dataset?.gexpIntextTransitionLoaderActive === "true") return "transition_loader";
            if (el.dataset?.gexpIntextSpecialCreativeActive === "true") return "special_creative_active";
            if (el.dataset?.gexpIntextDisplayFillActive === "true" && visiblyOpen && hasPreservedHeight) return "active_display";
            if ((isOwnerDisplayWrapper || isOwnerVideoWrapper) && visiblyOpen && hasPreservedHeight) return "owner_current_wrapper";
            if (this.domNode === el && el.classList?.contains("is-open") && visiblyOpen && hasPreservedHeight) return "current_wrapper";
            if (loaderActive && hasPreservedHeight) return "transition_bridge";
            return "";
          };
          const markDelayedDestroySkippedTelemetry = (reason) => {
            if (!this.ownerNode?.mergeIntextTelemetry) return;
            const telemetry = {};
            if (reason === "transition_bridge") {
              telemetry["gexp-intext-delayed-destroy-skipped-transition-bridge"] = "true";
            } else if (reason === "transition_loader") {
              telemetry["gexp-intext-delayed-destroy-skipped-transition-bridge"] = "true";
            } else if (reason === "special_creative_active") {
              telemetry["gexp-intext-delayed-destroy-skipped-special-creative"] = "true";
            } else if (reason === "active_display") {
              telemetry["gexp-intext-delayed-destroy-skipped-active-display"] = "true";
            }
            telemetry["gexp-intext-close-visual-preserve-skipped"] = "true";
            telemetry["gexp-intext-close-visual-preserve-reason"] = reason;
            if (Object.keys(telemetry).length) this.ownerNode.mergeIntextTelemetry(telemetry);
          };
          const logCloseVisualPreserveSkipped = (reason, phase = "before_close_mutation") => {
            logIntext(`[Intext:Container] intext_container_close_visual_preserve_skipped`, {
              slotCode: elToDestroy.id,
              reason,
              phase,
              renderToken: elToDestroy.dataset?.gexpIntextRenderToken || "unknown",
              isConnected: elToDestroy.isConnected,
              height: elToDestroy.style.height,
              minHeight: elToDestroy.style.minHeight,
              display: elToDestroy.style.display,
              opacity: elToDestroy.style.opacity,
              datasetHeight: elToDestroy.dataset?.gexpIntextContentHeight,
            });
          };
          if (destroy) {
            const protectedReason = getProtectedDestroyReason(elToDestroy);
            if (protectedReason) {
              markDelayedDestroySkippedTelemetry(protectedReason);
              this.isOpen = true;
              elToDestroy.classList.add("is-open");
              elToDestroy.style.display = "";
              elToDestroy.style.opacity = "1";
              elToDestroy.setAttribute("aria-hidden", "false");
              logCloseVisualPreserveSkipped(protectedReason);
              if (protectedReason === "transition_bridge") {
                logIntext(`[Intext:Container] intext_container_delayed_destroy_skipped_transition_bridge`);
                logIntext(`[Intext:Container] intext_transition_bridge_active_wrapper_destroy_skipped`);
              } else if (protectedReason === "transition_loader") {
                logIntext(`[Intext:Container] intext_container_delayed_destroy_skipped_transition_bridge`);
                logIntext(`[Intext:Container] intext_transition_bridge_active_wrapper_destroy_skipped`);
              } else if (protectedReason === "special_creative_active") {
                logIntext(`[Intext:Container] intext_container_delayed_destroy_skipped_special_creative_active`);
              } else if (protectedReason === "active_display") {
                logIntext(`[Intext:Container] intext_container_delayed_destroy_skipped_active_display`);
              } else {
                logIntext(`[Intext:Container] intext_container_delayed_destroy_skipped_current_wrapper`);
              }
              return;
            }
          }
          this.isOpen = false;
          elToDestroy.classList.remove("is-open");
          elToDestroy.style.height = "0px";
          if (typeof window !== "undefined" && window.gexpIntextDebug === true && this.ownerNode?.container === this) {
            intextDebugCollector.recordTimeline("wrapper-close", {
              node: this.ownerNode,
              element: elToDestroy,
              destroy,
            });
          }
          if (destroy) {
            setTimeout(() => {
              const protectedReason = getProtectedDestroyReason(elToDestroy);
              if (protectedReason) {
                markDelayedDestroySkippedTelemetry(protectedReason);
                logCloseVisualPreserveSkipped(protectedReason, "delayed_destroy");
                if (protectedReason === "transition_bridge") {
                  logIntext(`[Intext:Container] intext_container_delayed_destroy_skipped_transition_bridge`);
                  logIntext(`[Intext:Container] intext_transition_bridge_active_wrapper_destroy_skipped`);
                } else if (protectedReason === "transition_loader") {
                  logIntext(`[Intext:Container] intext_container_delayed_destroy_skipped_transition_bridge`);
                  logIntext(`[Intext:Container] intext_transition_bridge_active_wrapper_destroy_skipped`);
                } else if (protectedReason === "special_creative_active") {
                  logIntext(`[Intext:Container] intext_container_delayed_destroy_skipped_special_creative_active`);
                } else if (protectedReason === "active_display") {
                  logIntext(`[Intext:Container] intext_container_delayed_destroy_skipped_active_display`);
                } else {
                  logIntext(`[Intext:Container] intext_container_delayed_destroy_skipped_current_wrapper`);
                }
                return;
              }
              if (this.domNode !== elToDestroy) {
                logIntext(`[Intext:Container] intext_container_delayed_destroy_skipped_current_changed`);
                if (elToDestroy.isConnected) elToDestroy.remove();
                return;
              }
              logIntext(`[Intext:Container] intext_container_delayed_destroy_applied`);
              this.destroy();
            }, 350);
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
          this.applyStyles();
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
          this.fetchStarted = false;
          this.fetchComplete = false;
          this.renderStarted = false;
          this.timer = null;
          this.fetchObserver = null;
          this.renderObserver = null;
          this.pendingAuction = null;
          this.loadingConfig = null;
          this._lastFetchExpiredBeforeRestart = false;
          this._lastFetchExpiredAgeMs = null;
          this._lastFetchExpiredTrigger = null;
          this._renderWaitForFetchStartedAt = null;
          this._renderWaitedForFetch = false;
        }

        getPbjsBidResponsesSafe(adUnitCode) {
          if (
            !window.pbjs ||
            typeof window.pbjs.getBidResponsesForAdUnitCode !== "function"
          ) {
            if (!IntextWaterfall._loggedPbjsBidResponsesApiMissing) {
              IntextWaterfall._loggedPbjsBidResponsesApiMissing = true;
              logIntext(
                `[Intext:Prebid:${this.node.id}] pbjs_bid_responses_api_missing - using empty bids fallback`,
              );
            }
            return { bids: [] };
          }

          try {
            return window.pbjs.getBidResponsesForAdUnitCode(adUnitCode) || { bids: [] };
          } catch (e) {
            if (!IntextWaterfall._loggedPbjsBidResponsesApiMissing) {
              IntextWaterfall._loggedPbjsBidResponsesApiMissing = true;
              logIntext(
                `[Intext:Prebid:${this.node.id}] pbjs_bid_responses_api_missing - using empty bids fallback`,
              );
            }
            return { bids: [] };
          }
        }

        getPbjsBidsSafe(adUnitCode) {
          const bidResponses = this.getPbjsBidResponsesSafe(adUnitCode);
          return Array.isArray(bidResponses?.bids) ? bidResponses.bids : [];
        }

        init() {
          this.loadingConfig = this.node.manager.resolveLoadingConfig(
            this.node.id,
            this.node.config,
            this.node.scopedContext,
          );
          this.config.loading = this.loadingConfig;
          this.node.config.loading = this.loadingConfig;
          this.setupLoadingTriggers();
          this.setupTimerTrigger();
        }

        getLoadingTargetElement() {
          return this.node?.getIntextTelemetryElement?.() || this.container.getElement();
        }

        getLoadingDistancePx() {
          try {
            const targetEl = this.getLoadingTargetElement();
            if (!targetEl || typeof targetEl.getBoundingClientRect !== "function") return null;
            const rect = targetEl.getBoundingClientRect();
            return Math.round(rect.top - window.innerHeight);
          } catch (e) {
            return null;
          }
        }

        getIntextOffYTelemetry(prefix) {
          const unknown = {
            [`${prefix}-sl-off-y`]: "unknown",
            [`${prefix}-us-off-y`]: "unknown",
          };
          try {
            const el =
              this.getLoadingTargetElement?.() ||
              this.node?.getIntextTelemetryElement?.() ||
              this.container?.getElement?.();
            if (!el || typeof el.getBoundingClientRect !== "function") return unknown;

            const rect = el.getBoundingClientRect();
            let scrollTop =
              window.scrollY ||
              window.pageYOffset ||
              document.documentElement?.scrollTop ||
              0;
            let top = rect.top;
            let currentNode = el;
            let parent = null;
            while (currentNode && currentNode.tagName !== "BODY" && currentNode !== parent) {
              if (parent) currentNode = parent;
              if (window.getComputedStyle(currentNode).position === "fixed") {
                top = 100;
                scrollTop = 0;
                break;
              }
              parent = currentNode.parentNode;
            }

            return {
              [`${prefix}-sl-off-y`]: String(parseInt((top + scrollTop) / 100)),
              [`${prefix}-us-off-y`]: String(parseInt(top / 100)),
            };
          } catch (e) {
            return unknown;
          }
        }

        getIntextExpectedViewability(offYTelemetry, prefix, trigger) {
          try {
            const usOffY = Number(offYTelemetry?.[`${prefix}-us-off-y`]);
            if (!Number.isFinite(usOffY)) return "unknown";

            let adUnit = this.wa?.cI?.adUnit || null;
            if (!adUnit) {
              const adUnitPath =
                this.node?.manager?.resolveIntextDisplayAdUnitPath?.(this.node?.scopedContext) ||
                this.gexp?.cfg?.adUnit ||
                "";
              const parts = String(adUnitPath).replace(/^\/+/, "").split("/").filter(Boolean);
              const requestNetworkId =
                this.node?.manager?.resolveIntextRequestNetworkId?.(this.node?.scopedContext);
              if (parts[0] === String(requestNetworkId || "")) {
                parts.shift();
              }
              adUnit = parts[0] || null;
            }
            if (!adUnit || typeof this.gexp?.getExpectedViewability !== "function") return "unknown";

            const isRefresh = trigger === "refresh" || (this.node?._cycleCount || 0) > 0;
            const isHouseRefresh = isRefresh && this.wa?.lastImpressionType === this.wa?.IT_HOUSE;
            return String(
              this.gexp.getExpectedViewability(
                adUnit,
                usOffY,
                isHouseRefresh ? "t" : "f",
                isRefresh && !isHouseRefresh ? "t" : "f",
              ),
            );
          } catch (e) {
            return "unknown";
          }
        }

        setupLoadingTriggers() {
          const renderMargin = this.loadingConfig?.renderRootMargin || this.loadingConfig?.rootMargin || "250px 0px";
          const fetchMargin = this.loadingConfig?.fetchRootMargin || renderMargin;
          const targetEl = this.getLoadingTargetElement();

          if ("IntersectionObserver" in window) {
            const observerTarget =
              targetEl && targetEl === this.node?.telemetryAnchor ? "anchor" :
              targetEl && targetEl === this.node?.placement?.paragraph ? "paragraph" :
              "wrapper";
            if (this.node) this.node._intextLoadObserverTarget = observerTarget;
            this.node?.mergeIntextTelemetry?.({
              "gexp-intext-load-observer-target": observerTarget,
            });
            this.fetchObserver = new IntersectionObserver(
              (entries) => {
                if (entries[0].isIntersecting) {
                  this.startFetch("fetch-intersection");
                }
              },
              { threshold: 0, rootMargin: fetchMargin },
            );

            this.renderObserver = new IntersectionObserver(
              (entries) => {
                if (entries[0].isIntersecting) {
                  this.startRender("render-intersection");
                }
              },
              { threshold: 0, rootMargin: renderMargin },
            );

            const observedEl = targetEl || this.container.getElement();
            if (observedEl) {
              this.fetchObserver.observe(observedEl);
              this.renderObserver.observe(observedEl);
            }
          } else {
            this.startRender("fallback");
          }
        }

        setupTimerTrigger() {
          const timeout = this.loadingConfig?.maxDelayMs;
          if (typeof timeout !== "number" || !Number.isFinite(timeout) || timeout < 0) {
            logIntext(`[Intext:Auction:${this.node.id}] timer trigger disabled`);
            return;
          }
          this.timer = setTimeout(() => this.startRender("timer"), timeout);
        }

        disconnectFetchObserver() {
          if (this.fetchObserver) {
            this.fetchObserver.disconnect();
            this.fetchObserver = null;
          }
        }

        disconnectRenderObserver() {
          if (this.renderObserver) {
            this.renderObserver.disconnect();
            this.renderObserver = null;
          }
        }

        cleanup() {
          this.disconnectFetchObserver();
          this.disconnectRenderObserver();
          clearTimeout(this.timer);
          this.timer = null;
          this.pendingAuction = null;
          this.renderTriggeredWaitingForFetch = null;
          this.fetchStarted = false;
          this.fetchComplete = false;
          this.renderStarted = false;
          this.prebidStarted = false;
          logIntext(`[Intext:Waterfall:${this.node.id}] cleanup - loading observers and timer cleared`);
        }

        mergeLoadingPhaseTelemetry(extra = {}) {
          this.node.mergeIntextTelemetry(extra);
          this.node.flushIntextTelemetryToCI();
        }

        async runPrebidPhase(trigger, effectiveMode) {
          const prebidPromises = [];

          this.registerPrebidAliases();
          const multiConfig = this.getPrebidMultiFormatConfig();
          if (multiConfig) {
            const mediaTypesStr = Object.keys(multiConfig.mediaTypes).join("+");
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ Fetch Prebid: requesting (code: ${multiConfig.code}, ${multiConfig.bids.length} bidders, types: ${mediaTypesStr})`,
            );
            prebidPromises.push(this.executePrebid(multiConfig));
          } else {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ Fetch Prebid: SKIPPED (no config)`,
            );
          }

          await Promise.all(prebidPromises);
        }

        async startFetch(trigger) {
          if (this.fetchStarted) return;
          this.fetchStarted = true;
          this.fetchComplete = false;
          this.fetchTrigger = trigger;
          this.fetchStartAt = Date.now();
          this._auctionStartAt = this.fetchStartAt;
          this.disconnectFetchObserver();
          if (window.gexpIntextDebug) intextDebugCollector.recordTimeline("fetch-margin-entered", { node: this.node, slotId: this.node.id, trigger });

          const distancePx = this.getLoadingDistancePx();
          const fetchOffYTelemetry = this.getIntextOffYTelemetry("gexp-intext-fetch");
          const fetchExpectedViewability = this.getIntextExpectedViewability(
            fetchOffYTelemetry,
            "gexp-intext-fetch",
            trigger,
          );
          const exp = this.loadingConfig?._experiment || {};
          logIntext(`[Intext:Auction:${this.node.id}] loading_phase_fetch_triggered`, {
            slotCode: this.node.id,
            random1: exp.key === "random1" ? exp.keyValue : undefined,
            key: exp.key || "random1",
            keyValue: exp.keyValue || "",
            keySource: exp.keySource || "unresolved",
            variant: exp.variant || "default",
            fetchRootMargin: this.loadingConfig?.fetchRootMargin,
            renderRootMargin: this.loadingConfig?.renderRootMargin,
            maxDelayMs: this.loadingConfig?.maxDelayMs ?? null,
            trigger,
            distancePx,
          });

          const effectiveMode = this.config.decision?.mode || "auto";
          this._effectiveMode = effectiveMode;
          this.node.startIntextTelemetryCycle(trigger);
          if (this._lastFetchExpiredBeforeRestart) {
            this.mergeLoadingPhaseTelemetry({
              "gexp-intext-fetch-restarted-after-expiry": "true",
              "gexp-intext-prev-fetch-age-ms": String(this._lastFetchExpiredAgeMs),
              "gexp-intext-prev-fetch-expired-trigger": String(this._lastFetchExpiredTrigger || "unknown"),
              "gexp-intext-pending-auction-expired": "true",
              "gexp-intext-pending-auction-age-ms": String(this._lastFetchExpiredAgeMs),
              "gexp-intext-pending-auction-restarted": "true",
              "gexp-intext-pending-auction-used": "false",
            });
            logIntext(`[Intext:Auction:${this.node.id}] loading_previous_fetch_expiry_telemetry_applied`, {
              slotCode: this.node.id,
              previousFetchAgeMs: this._lastFetchExpiredAgeMs,
              previousFetchExpiredTrigger: this._lastFetchExpiredTrigger || "unknown",
              trigger,
            });
            this._lastFetchExpiredBeforeRestart = false;
            this._lastFetchExpiredAgeMs = null;
            this._lastFetchExpiredTrigger = null;
          }
          this.mergeLoadingPhaseTelemetry({
            "gexp-intext-fetch-trigger": trigger,
            "gexp-intext-fetch-start-time-ms": String(this.fetchStartAt),
            "gexp-intext-fetch-distance-px": distancePx !== null ? String(distancePx) : undefined,
            ...fetchOffYTelemetry,
            "gexp-intext-fetch-ev": fetchExpectedViewability,
          });

          try {
            await this.runPrebidPhase(trigger, effectiveMode);
            const decision = this.decideWinner({ commit: false });
            this.pendingAuction = {
              timestamp: Date.now(),
              ...decision,
            };
            this.fetchComplete = true;
            logIntext(`[Intext:Auction:${this.node.id}] loading_phase_fetch_waiting_for_render`, {
              slotCode: this.node.id,
              winner: decision?.winner || "none",
            });
            if (this.renderTriggeredWaitingForFetch) {
              const waitingTrigger = this.renderTriggeredWaitingForFetch;
              this.renderTriggeredWaitingForFetch = null;
              this.startRender(waitingTrigger);
            }
          } catch (err) {
            this.fetchComplete = true;
            this.pendingAuction = null;
            warnIntext(`[Intext:Auction:${this.node.id}] loading_phase_fetch_error`, err);
            if (this.renderTriggeredWaitingForFetch) {
              const waitingTrigger = this.renderTriggeredWaitingForFetch;
              this.renderTriggeredWaitingForFetch = null;
              this.startRender(waitingTrigger);
            }
          }
        }

        async startRender(trigger) {
          if (this.renderStarted) return;

          if (!this.fetchStarted) {
            this.renderTriggeredWaitingForFetch = trigger;
            this._renderWaitForFetchStartedAt = Date.now();
            this._renderWaitedForFetch = true;
            this.startFetch(`${trigger}-auto-fetch`);
            return;
          }

          if (!this.pendingAuction && !this.fetchComplete) {
            this.renderTriggeredWaitingForFetch = trigger;
            this._renderWaitForFetchStartedAt = this._renderWaitForFetchStartedAt || Date.now();
            this._renderWaitedForFetch = true;
            logIntext(`[Intext:Auction:${this.node.id}] loading_phase_render_waiting_for_fetch - trigger=${trigger}`);
            return;
          }

          this.renderStarted = true;
          this.renderTrigger = trigger;
          this.lastTrigger = trigger;
          this.renderStartAt = Date.now();
          const renderToken = this.node.beginVisualRender("render_started", trigger);
          if (window.gexpIntextDebug) intextDebugCollector.recordTimeline("render-margin-entered", { node: this.node, slotId: this.node.id, trigger, renderToken });
          const renderWaitForFetchMs = this._renderWaitForFetchStartedAt
            ? Math.max(0, this.renderStartAt - this._renderWaitForFetchStartedAt)
            : 0;
          const renderWaitedForFetch = this._renderWaitedForFetch;
          this._renderWaitForFetchStartedAt = null;
          this._renderWaitedForFetch = false;
          this.disconnectRenderObserver();
          clearTimeout(this.timer);
          this.timer = null;

          const distancePx = this.getLoadingDistancePx();
          const renderOffYTelemetry = this.getIntextOffYTelemetry("gexp-intext-render");
          const renderExpectedViewability = this.getIntextExpectedViewability(
            renderOffYTelemetry,
            "gexp-intext-render",
            trigger,
          );
          const fetchToRenderMs = this.fetchStartAt ? this.renderStartAt - this.fetchStartAt : 0;
          logIntext(`[Intext:Auction:${this.node.id}] loading_phase_render_triggered`, {
            slotCode: this.node.id,
            trigger,
            distancePx,
            renderToken,
          });
          this.mergeLoadingPhaseTelemetry({
            "gexp-intext-render-trigger": trigger,
            "gexp-intext-render-start-time-ms": String(this.renderStartAt),
            "gexp-intext-fetch-to-render-ms": String(fetchToRenderMs),
            "gexp-intext-render-waited-for-fetch": renderWaitedForFetch ? "true" : "false",
            "gexp-intext-render-wait-for-fetch-ms": String(renderWaitForFetchMs),
            "gexp-intext-render-distance-px": distancePx !== null ? String(distancePx) : undefined,
            ...renderOffYTelemetry,
            "gexp-intext-render-ev": renderExpectedViewability,
          });

          if (!this.pendingAuction) {
            const pendingAuctionExpiredAlready =
              this.node?._intextTelemetryCycle?.["gexp-intext-pending-auction-expired"] === "true";
            const previousPendingAuctionAgeMs =
              this.node?._intextTelemetryCycle?.["gexp-intext-pending-auction-age-ms"];
            this.mergeLoadingPhaseTelemetry({
              "gexp-intext-pending-auction-used": "false",
              "gexp-intext-pending-auction-expired": pendingAuctionExpiredAlready ? "true" : "false",
              "gexp-intext-pending-auction-age-ms": pendingAuctionExpiredAlready ? previousPendingAuctionAgeMs : "0",
              "gexp-intext-pending-auction-restarted": pendingAuctionExpiredAlready ? "true" : "false",
            });
            this.prebidStarted = false;
            await this.startAuction(trigger);
            return;
          }

          const pendingAgeMs = Date.now() - this.pendingAuction.timestamp;
          const maxFetchToRenderMs = this.loadingConfig?.maxFetchToRenderMs;
          const hasFetchExpiry =
            typeof maxFetchToRenderMs === "number" &&
            Number.isFinite(maxFetchToRenderMs) &&
            maxFetchToRenderMs >= 0;
          const fetchExpired = hasFetchExpiry && pendingAgeMs > maxFetchToRenderMs;
          const pendingAuctionExpiredAlready =
            this.node?._intextTelemetryCycle?.["gexp-intext-pending-auction-expired"] === "true";
          const pendingAuctionAgeMsTelemetry =
            pendingAuctionExpiredAlready
              ? this.node?._intextTelemetryCycle?.["gexp-intext-pending-auction-age-ms"]
              : String(Math.max(0, Math.round(pendingAgeMs)));
          this.mergeLoadingPhaseTelemetry({
            "gexp-intext-fetch-age-ms": String(Math.max(0, Math.round(pendingAgeMs))),
            "gexp-intext-fetch-expired": fetchExpired ? "true" : "false",
            "gexp-intext-pending-auction-age-ms": pendingAuctionAgeMsTelemetry,
            "gexp-intext-pending-auction-expired": pendingAuctionExpiredAlready || fetchExpired ? "true" : "false",
          });

          if (fetchExpired) {
            logIntext(`[Intext:Auction:${this.node.id}] loading_phase_fetch_expired`, {
              slotCode: this.node.id,
              trigger,
              pendingAgeMs,
              maxFetchToRenderMs,
            });
            this._lastFetchExpiredBeforeRestart = true;
            this._lastFetchExpiredAgeMs = Math.max(0, Math.round(pendingAgeMs));
            this._lastFetchExpiredTrigger = trigger;
            logIntext(`[Intext:Auction:${this.node.id}] loading_pending_auction_expired_restart_marked`, {
              slotCode: this.node.id,
              pendingAgeMs,
              maxFetchToRenderMs,
              trigger,
            });
            this.pendingAuction = null;
            this.fetchStarted = false;
            this.fetchComplete = false;
            this.renderStarted = false;
            this.prebidStarted = false;
            this.renderTriggeredWaitingForFetch = trigger;
            this._renderWaitForFetchStartedAt = Date.now();
            this._renderWaitedForFetch = true;
            this.mergeLoadingPhaseTelemetry({
              "gexp-intext-pending-auction-used": "false",
              "gexp-intext-pending-auction-restarted": "true",
            });
            await this.startFetch(`${trigger}-restart`);
            return;
          }

          logIntext(`[Intext:Auction:${this.node.id}] loading_phase_render_releasing_pending_request`, {
            slotCode: this.node.id,
            winner: this.pendingAuction.winner || "none",
          });

          const { winner, loser, allowFallback } = this.pendingAuction;
          this.pendingAuction = null;
          this.mergeLoadingPhaseTelemetry({
            "gexp-intext-pending-auction-used": "true",
            "gexp-intext-pending-auction-restarted": pendingAuctionExpiredAlready ? "true" : "false",
          });
          if (!winner) {
            this.node.closeAll();
            return;
          }
          this.requestWinner(winner, loser, allowFallback);
        }
        
        async startAuction(trigger) {
          const sentinelRetryContext =
            trigger === "house-1x1-refresh" &&
            this._houseLineItemSentinelRetryContext?.forceRequestType === "display"
              ? this._houseLineItemSentinelRetryContext
              : null;
          if (sentinelRetryContext) {
            this._houseLineItemSentinelRetryContext = null;
          }
          if (this.wa && this.wa.cI) {
            const isRefresh =
              trigger === "refresh" ||
              this.node?._intextTelemetryCycle?.["gexp-intext-refresh"] === "true";
            const isFallback =
              trigger === "fallback" ||
              this.node?._intextTelemetryCycle?.["gexp-intext-fallback"] === "true" ||
              sentinelRetryContext?.isFallback === true;
            this.wa.cI["gexp-intext-is-refresh"] = isRefresh ? "true" : "false";
            this.wa.cI["gexp-intext-refresh"] = this.wa.cI["gexp-intext-is-refresh"];
            this.wa.cI["gexp-intext-is-fallback"] = isFallback ? "true" : "false";
            this.wa.cI["gexp-intext-fallback"] = this.wa.cI["gexp-intext-is-fallback"];
            logIntext(`[Intext:Auction:${this.node.id}] Status injected: refresh=${this.wa.cI["gexp-intext-is-refresh"]}, fallback=${this.wa.cI["gexp-intext-is-fallback"]}`);
          }
          if (this.prebidStarted) return;
          this.prebidStarted = true;
          const renderToken = this.node.beginVisualRender("auction_started", trigger);
          this.node.startIntextTelemetryCycle(trigger);
          this.node.mergeIntextTelemetry({
            "gexp-intext-render-token": String(renderToken),
            "gexp-intext-render-attempt": String(this.node._renderTokenSeq || 0),
            "gexp-intext-visual-state": "auction_started",
          });
          if (sentinelRetryContext) {
            this.node.mergeIntextTelemetry({
              "gexp-intext-is-fallback": sentinelRetryContext.isFallback ? "true" : "false",
              "gexp-intext-fallback": sentinelRetryContext.isFallback ? "true" : "false",
              "gexp-intext-sentinel-retry-forced-request-type": "display",
              "gexp-intext-sentinel-retry-preserved-fallback": sentinelRetryContext.isFallback ? "true" : "false",
              "gexp-intext-sentinel-retry-original-decision-mode": sentinelRetryContext.originalDecisionMode || "unknown",
              "gexp-intext-sentinel-retry-lineitem": sentinelRetryContext.sentinelLineItemId || "unknown",
              "gexp-intext-sentinel-retry-attempt-slot": String(sentinelRetryContext.attemptSlot ?? "unknown"),
              "gexp-intext-sentinel-retry-max-slot": String(sentinelRetryContext.maxAttemptsPerSlot ?? "unknown"),
              "gexp-intext-sentinel-retry-attempt-cycle": String(sentinelRetryContext.attemptCycle ?? "unknown"),
              "gexp-intext-sentinel-retry-max-cycle": String(sentinelRetryContext.maxAttemptsPerCycle ?? "unknown"),
            });
          }

          // Cleanup: reset fallback state and clear targeting on new auctions
          if (trigger !== "fallback") {
              if (this._displayRenderState) this._displayRenderState.isFallback = false;
          }
          if (sentinelRetryContext?.isFallback === true) {
            if (!this._displayRenderState) this._displayRenderState = {};
            this._displayRenderState.isFallback = true;
          }
          if (this.node.slot) {
              this.node.clearDisplayRequestTargeting(this.node.slot, "auction_start_targeting_cleanup");
          }

          this.lastTrigger = trigger;
          this._auctionStartAt = Date.now();
          clearTimeout(this.timer);
          this.node.recordTelemetry("auction_start", { trigger });

          if (trigger === "refresh") {
            if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
              intextDebugCollector.recordMetric("display_refresh_started", {
                node: this.node,
                element: this.container?.getElement?.(),
                trigger,
                isRefresh: true,
              });
            }
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
              const displayEl = this.container.getElement();
              if (!this.node.isActiveRenderToken(renderToken, "startAuction_refresh_video_to_display_prepare", trigger)) {
                logIntext(`[Intext:Display:${this.node.id}] video_to_display_transition_skipped_stale_token`, {
                  slotCode: this.node.id,
                  renderToken,
                  currentState,
                  displayConnected: Boolean(displayEl?.isConnected),
                  videoConnected: Boolean(videoEl?.isConnected),
                  source: "startAuction_refresh_video_to_display_prepare",
                });
                return;
              }
              this.node.mergeIntextTelemetry({
                "gexp-intext-video-to-display-transition": "started",
              });
              logIntext(`[Intext:Display:${this.node.id}] video_to_display_transition_started`, {
                slotCode: this.node.id,
                renderToken,
                currentState,
                displayConnected: Boolean(displayEl?.isConnected),
                videoConnected: Boolean(videoEl?.isConnected),
                source: "startAuction_refresh_video_to_display_prepare",
              });
              const preservedHeight = this.node.resolveTransitionPreservedHeight(displayEl, videoEl, this.node.lockedHeight);
              const bridge = this.node.ensureIntextTransitionBridge({
                preferredSurface: "display",
                fallbackSurface: "video",
                renderToken,
                source: "video_to_display_refresh",
                preservedHeight,
                loaderText: "Recuperando anuncio",
              });
              const displayMissing = !displayEl?.isConnected;
              this.node.mergeIntextTelemetry({
                "gexp-intext-video-to-display-display-missing": displayMissing ? "true" : "false",
                "gexp-intext-video-to-display-video-bridge": bridge?.bridgeSurface === "video" ? "true" : "false",
                "gexp-intext-video-to-display-bridge-complete": "true",
                "gexp-intext-video-to-display-display-loader": "true",
                "gexp-intext-video-to-display-single-surface": "true",
                "gexp-intext-video-to-display-container-state-synced": "true",
              });
              if (displayMissing && bridge?.bridgeSurface === "video") {
                logIntext(`[Intext:Display:${this.node.id}] video_to_display_display_missing_keep_video_surface`, {
                  slotCode: this.node.id,
                  renderToken,
                  currentState,
                  preservedHeight: bridge.preservedHeight,
                  displayConnected: Boolean(displayEl?.isConnected),
                  videoConnected: Boolean(videoEl?.isConnected),
                  source: "video_to_display_refresh",
                });
                logIntext(`[Intext:Display:${this.node.id}] video_to_display_video_loader_preserved_as_bridge`, {
                  slotCode: this.node.id,
                  renderToken,
                  currentState,
                  preservedHeight: bridge.preservedHeight,
                  source: "video_to_display_refresh",
                });
              } else if (bridge?.bridgeSurface === "display" || bridge?.bridgeSurface === "display-recreated") {
                logIntext(`[Intext:Display:${this.node.id}] video_to_display_display_surface_ready`, {
                  slotCode: this.node.id,
                  renderToken,
                  currentState,
                  preservedHeight: bridge.preservedHeight,
                  bridgeSurface: bridge.bridgeSurface,
                  source: "video_to_display_refresh",
                });
                logIntext(`[Intext:Display:${this.node.id}] video_to_display_video_surface_hidden_after_display_ready`, {
                  slotCode: this.node.id,
                  renderToken,
                  currentState,
                  displayConnected: Boolean(this.container.getElement()?.isConnected),
                  videoConnected: Boolean(videoEl?.isConnected),
                  source: "video_to_display_refresh",
                });
              }
              logIntext(`[Intext:Display:${this.node.id}] video_to_display_bridge_complete`, {
                slotCode: this.node.id,
                renderToken,
                currentState,
                bridgeSurface: bridge?.bridgeSurface || "none",
                preservedHeight: bridge?.preservedHeight || preservedHeight,
                displayConnected: Boolean(this.container.getElement()?.isConnected),
                videoConnected: Boolean(videoEl?.isConnected),
                source: "video_to_display_refresh",
              });
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
                  this.node.applyDisplayWrapperHeight(activeEl, preservedHeight, {
                    logReason:
                      preservedHeight === 600 ? "display_300x600_visual_height_adjusted" : "",
                    source: "refresh_prepare_display_container",
                  });
                  activeEl.classList.add("is-open");
                  activeEl.style.display = "block";
                  activeEl.style.opacity = "1";
              }
            }
          }

          const isRefresh = trigger === "refresh";
          const effectiveMode = sentinelRetryContext?.forceDecisionMode || (isRefresh
            ? this.config.refreshCycle?.mode || "display_only"
            : this.config.decision?.mode || "auto");

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

          if (sentinelRetryContext) {
            logIntext(`[Intext:Slot:${this.node.id}] house_lineitem_sentinel_retry_forced_display`, {
              lineItemId: sentinelRetryContext.sentinelLineItemId,
              preservedFallback: sentinelRetryContext.isFallback ? "true" : "false",
              originalMode: sentinelRetryContext.originalDecisionMode || "unknown",
              attemptSlot: sentinelRetryContext.attemptSlot,
              maxAttemptsPerSlot: sentinelRetryContext.maxAttemptsPerSlot,
              attemptCycle: sentinelRetryContext.attemptCycle,
              maxAttemptsPerCycle: sentinelRetryContext.maxAttemptsPerCycle,
            });
            logIntext(
              `[Intext:Slot:${this.node.id}] technical house lineitem sentinel retry forced to display lineItemId=${sentinelRetryContext.sentinelLineItemId}, preservedFallback=${sentinelRetryContext.isFallback ? "true" : "false"}, originalMode=${sentinelRetryContext.originalDecisionMode || "unknown"}`,
            );
          }

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

        waitForPbjsAvailability(configuration) {
          const waitMs = this.config.prebid?.pbjsAvailabilityWaitMs ?? 1200;
          const intervalMs = this.config.prebid?.pbjsAvailabilityRetryMs ?? 150;
          const startedAt = Date.now();
          let attempt = 0;

          const isReady = () =>
            typeof window.pbjs !== "undefined" &&
            typeof window.pbjs.requestBids === "function" &&
            window.pbjs.que &&
            typeof window.pbjs.que.push === "function";

          if (isReady()) return Promise.resolve(true);

          logIntext(
            `[Intext:Prebid:${this.node.id}] prebid_pbjs_wait_start - code=${configuration.code}, wait_ms=${waitMs}, retry_ms=${intervalMs}`,
          );

          return new Promise((resolve) => {
            const retry = () => {
              if (isReady()) {
                logIntext(
                  `[Intext:Prebid:${this.node.id}] prebid_pbjs_wait_ready - code=${configuration.code}, elapsed_ms=${Date.now() - startedAt}, attempts=${attempt}`,
                );
                resolve(true);
                return;
              }

              const elapsedMs = Date.now() - startedAt;
              if (elapsedMs >= waitMs) {
                logIntext(
                  `[Intext:Prebid:${this.node.id}] prebid_pbjs_wait_timeout - code=${configuration.code}, elapsed_ms=${elapsedMs}, attempts=${attempt}`,
                );
                resolve(false);
                return;
              }

              attempt += 1;
              logIntext(
                `[Intext:Prebid:${this.node.id}] prebid_pbjs_wait_retry - code=${configuration.code}, attempt=${attempt}, elapsed_ms=${elapsedMs}`,
              );
              setTimeout(retry, intervalMs);
            };

            setTimeout(retry, intervalMs);
          });
        }

        waitForPrebidGlobalInitFlag(configuration) {
          const flag = this.config.prebid?.waitForGlobalInitFlag;
          if (!flag) return Promise.resolve(true);

          const waitMs = Number(this.config.prebid?.globalInitWaitMs);
          const maxWaitMs = Number.isFinite(waitMs) && waitMs >= 0 ? waitMs : 1200;
          const intervalMs = 50;
          const startedAt = Date.now();

          logIntext(
            `[Intext:Prebid:${this.node.id}] prebid_global_init_wait_start - code=${configuration.code}, flag=${flag}, wait_ms=${maxWaitMs}`,
          );

          const isReady = () => {
            try {
              return window[flag] === true;
            } catch (e) {
              return false;
            }
          };

          if (isReady()) {
            logIntext(
              `[Intext:Prebid:${this.node.id}] prebid_global_init_wait_ready - code=${configuration.code}, flag=${flag}, elapsed_ms=0`,
            );
            return Promise.resolve(true);
          }

          return new Promise((resolve) => {
            const retry = () => {
              if (isReady()) {
                logIntext(
                  `[Intext:Prebid:${this.node.id}] prebid_global_init_wait_ready - code=${configuration.code}, flag=${flag}, elapsed_ms=${Date.now() - startedAt}`,
                );
                resolve(true);
                return;
              }

              const elapsedMs = Date.now() - startedAt;
              if (elapsedMs >= maxWaitMs) {
                warnIntext(
                  `[Intext:Prebid:${this.node.id}] prebid_global_init_wait_timeout - code=${configuration.code}, flag=${flag}, elapsed_ms=${elapsedMs}`,
                );
                resolve(false);
                return;
              }

              setTimeout(retry, intervalMs);
            };

            retry();
          });
        }

        executePrebid(configuration) {
          return new Promise((resolve) => {
            const runPrebid = () => window.pbjs.que.push(() => {
              let restoreVideoCacheConfig = null;
              try {
              this.registerPrebidAdUnit(configuration);
              this.applyIntextDisplayFloorToPrebid(configuration);

              const graceMs = this.config.prebid?.graceMs ?? 300;
              const watchdogMs = this.getPrebidTimeout() + graceMs + 1500;
              let settled = false;
              let watchdogFired = false;
              let finalizeTimer = null;

              const resolveAuctionId = (auctionIdParam = null) => {
                const raw = this.getPbjsBidsSafe(configuration.code);
                let id = auctionIdParam;
                if (!id && raw.length > 0) {
                  id = raw[raw.length - 1].auctionId;
                  logIntext(
                    `[Intext:Slot:${this.node.id}]   Prebid: auctionId extracted from bid objects: ${id?.substring(0,8)}`,
                  );
                }
                return id;
              };

              const finalize = (phase, timedOut = false, auctionIdParam = null) => {
                if (settled) return;
                settled = true;
                clearTimeout(_watchdogTimer);
                if (finalizeTimer) {
                  clearTimeout(finalizeTimer);
                  finalizeTimer = null;
                }
                if (restoreVideoCacheConfig) {
                  restoreVideoCacheConfig();
                  restoreVideoCacheConfig = null;
                }

                const auctionId = resolveAuctionId(auctionIdParam);
                this._currentAuctionId = auctionId;

                const allRaw = this.getPbjsBidsSafe(configuration.code);
                const allResponses = auctionId
                  ? allRaw.filter(b => b.auctionId === auctionId)
                  : allRaw;
                const bannerBids = allResponses.filter(b => b.mediaType === "banner");
                const videoBids = allResponses.filter(b => b.mediaType === "video");

                const phaseLabel = phase === "grace" ? " [after grace window]" : phase === "watchdog" ? " [watchdog]" : "";
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

              logIntext(
                `[Intext:Prebid:${this.node.id}] prebid_watchdog_armed - ms=${watchdogMs} code=${configuration.code}`,
              );
              const _watchdogTimer = setTimeout(() => {
                watchdogFired = true;
                if (settled) return;
                logIntext(
                  `[Intext:Prebid:${this.node.id}] prebid_watchdog_fired - code=${configuration.code}`,
                );
                logIntext(
                  `[Intext:Prebid:${this.node.id}] prebid_watchdog_finalize_with_available_bids - code=${configuration.code}`,
                );
                finalize("watchdog", true);
              }, watchdogMs);

              const hasVideo = Boolean(configuration?.mediaTypes?.video);
              if (hasVideo) {
                this.node.mergeIntextTelemetry({
                  "gexp-intext-request-type": "video-prebid",
                });
                const videoCacheProfile = this.resolveIntextVideoCacheProfile(configuration.code);

                logIntext(`[Intext:Prebid:${configuration.code}] video_cache_profile_resolved`, {
                  slotCode: videoCacheProfile.slotCode,
                  random1: videoCacheProfile.random1,
                  random2: videoCacheProfile.random2,
                  mode: videoCacheProfile.mode,
                  url: videoCacheProfile.url || null,
                  ignoreBidderCacheKey: videoCacheProfile.ignoreBidderCacheKey,
                  reason: videoCacheProfile.reason,
                });

                restoreVideoCacheConfig = this.applyIntextVideoCacheOverride(videoCacheProfile);
              }

              window.pbjs.requestBids({
                timeout: this.getPrebidTimeout(),
                adUnitCodes: [configuration.code],
                bidsBackHandler: (bidResponses, timedOut, auctionIdParam) => {
                  if (!watchdogFired) {
                    logIntext(
                      `[Intext:Prebid:${this.node.id}] prebid_callback_arrived_before_watchdog - code=${configuration.code}`,
                    );
                  }
                  if (timedOut && graceMs > 0) {
                    const bidsAtTimeout = this.getPbjsBidsSafe(configuration.code).length;
                    logIntext(
                      `[Intext:Slot:${this.node.id}]   Prebid: TIMED OUT with ${bidsAtTimeout} bids — waiting ${graceMs}ms grace window for late bids...`,
                    );
                    if (finalizeTimer) clearTimeout(finalizeTimer);
                    finalizeTimer = setTimeout(() => finalize("grace", timedOut, auctionIdParam), graceMs);
                  } else {
                    finalize("immediate", timedOut, auctionIdParam);
                  }
                },
              });
              } catch(e) {
                if (restoreVideoCacheConfig) {
                  restoreVideoCacheConfig();
                  restoreVideoCacheConfig = null;
                }
                logIntext(`[Intext:Prebid] ❌ Exception in pbjs.que — skipping Prebid:`, e);
                resolve(null);
              }
            });

            this.waitForPbjsAvailability(configuration).then((isAvailable) => {
              if (!isAvailable) {
                logIntext(
                  `[Intext:Slot:${this.node.id}]   Prebid [${configuration.code}]: pbjs not available after wait`,
                );
                resolve(null);
                return;
              }
              this.waitForPrebidGlobalInitFlag(configuration).then(() => runPrebid());
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

        decideWinner(options = {}) {
          const commit = options.commit !== false;
          const mode = this._effectiveMode;
          const code = this.getPrebidCode();

          let displayBid = null;
          let videoBid = null;
          let currentBannerBids = [];
          let currentVideoBids = [];

          const cached = this._cachedBidsForDecision;
          this._cachedBidsForDecision = null; // consume immediately
          const bidStrategy = this.config.refreshCycle?.bidStrategy || "fresh";
          const isReuseMode = cached && bidStrategy === "reuse";

          if (isReuseMode) {
            const bannerBids = cached.banner.sort((a, b) => b.cpm - a.cpm);
            const videoBids = cached.video.sort((a, b) => b.cpm - a.cpm);
            currentBannerBids = bannerBids;
            currentVideoBids = videoBids;
            if (bannerBids.length > 0) { displayBid = bannerBids[0]; displayBid.source = "prebid_cached"; }
            if (videoBids.length > 0) { videoBid = videoBids[0]; videoBid.source = "prebid_cached"; }
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ Using CACHED bids only (${bannerBids.length} banner, ${videoBids.length} video, age: ${cached.ageMs}ms)`,
            );
          } else if (typeof window.pbjs !== "undefined") {
            const currentAuctionId = this._currentAuctionId;
            const allBids = this.getPbjsBidsSafe(code)
              .filter(b => currentAuctionId ? b.auctionId === currentAuctionId : true);

            const seen = new Set();
            const uniqueBids = allBids.filter(b => {
              const identity = b.adId || b.requestId || `${b.bidderCode}:${b.cpm}:${b.mediaType}:${b.auctionId || ""}`;
              if (identity && seen.has(identity)) return false;
              if (identity) seen.add(identity);
              return true;
            });

            const totalBids = this.getPbjsBidsSafe(code).length || 0;
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

            currentBannerBids = bannerBids;
            currentVideoBids = videoBids;

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
          this._lastCurrentBannerBids = currentBannerBids;
          this._lastCurrentVideoBids = currentVideoBids;
          this.node._lastCurrentBannerBids = currentBannerBids;
          this.node._lastCurrentVideoBids = currentVideoBids;
          if (!isReuseMode) {
            this._bidCache = {
              timestamp: Date.now(),
              auctionId: this._currentAuctionId,
              bannerBids: currentBannerBids || [],
              videoBids: currentVideoBids || [],
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
            if (commit === false) {
              return { winner: null, loser: null, allowFallback: false, displayBid, videoBid };
            }
            this.node.closeAll();
            return;
          }

          const allowFallback = mode === "auto";
          const loser = winner === "video" ? "display" : "video";

          if (commit === false) {
            return { winner, loser, allowFallback, displayBid, videoBid };
          }

          this.requestWinner(winner, loser, allowFallback);
        }

        async requestWinner(winner, loser, allowFallback) {
          const renderToken = this.node._activeRenderToken || this.node.beginVisualRender("request_winner", this.lastTrigger || "unknown");
          if (!this.node.isActiveRenderToken(renderToken, "requestWinner:start", this.lastTrigger || "unknown")) return;
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

          const success = await this._requestFormat(winner, renderToken);
          if (!this.node.isActiveRenderToken(renderToken, "requestWinner:after_request_format", this.lastTrigger || "unknown")) return;

          if (success === "retrying" || success === "closed") {
            return;
          }

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

          if (winner === "video" && this.node.wa && this.node.wa.cI) {
            this.node.wa.cI["gexp-intext-video-failed"] = "true";
            logIntext(`[Intext:Slot:${this.node.id}] gexp-intext-video-failed=true injected into telemetry`);
          }
          if (winner === "video") {
            this.node.cleanupIntextPip?.("video-fallback");
          }
          const videoErrorTelemetry = winner === "video"
            ? {
                "gexp-intext-video-failed": "true",
                "gexp-intext-video-error-code": String(
                  this.node?._intextTelemetryCycle?.["gexp-intext-video-error-code"] ||
                  this.node?.wa?.cI?.["gexp-intext-video-error-code"] ||
                  "unknown",
                ),
                "gexp-intext-video-error-message": String(
                  this.node?._intextTelemetryCycle?.["gexp-intext-video-error-message"] ||
                  this.node?.wa?.cI?.["gexp-intext-video-error-message"] ||
                  "unknown",
                ),
              }
            : {};

          if (!this._displayRenderState) this._displayRenderState = {};
          this._displayRenderState.isFallback = true;
          if (!(winner === "video" && loser === "display")) {
            this.node.beginVisualRender("fallback_started", "fallback");
          }
          if (winner === "video" && loser === "display") {
            this.node.beginVisualRender("fallback_started", "fallback");
            this.node.startIntextTelemetryCycle("fallback", {
              "gexp-intext-is-fallback": "true",
              "gexp-intext-fallback": "true",
              "gexp-intext-video-failed": "true",
              "gexp-intext-request-type": "display",
              "gexp-intext-render-token": String(this.node._activeRenderToken || 0),
              "gexp-intext-render-attempt": String(this.node._renderTokenSeq || 0),
              "gexp-intext-visual-state": "fallback_started",
              ...videoErrorTelemetry,
            });
          }
          const fallbackRenderToken = this.node._activeRenderToken;
          if (winner === "video" && loser === "display") {
            this.node.ensureSingleVisibleIntextSurface("display", fallbackRenderToken, "fallback_video_to_display_before_request");
          }

          if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
            if (loser === "display") {
              intextDebugCollector.recordMetric("display_fallback_started", {
                node: this.node,
                element: this.container?.getElement?.(),
                source: "waterfall",
                trigger: this.lastTrigger || "fallback",
                winner,
                loser,
                isFallback: true,
              });
            }
            intextDebugCollector.recordVideoEvent("fallback-started", this.node, {
              trigger: this.lastTrigger || "fallback",
              winner,
              loser,
            });
            if (loser === "display") {
              intextDebugCollector.recordVideoEvent("fallback-display-requested", this.node, {
                trigger: this.lastTrigger || "fallback",
              });
            }
          }

          logIntext(
            `%c[Intext:Slot:${this.node.id}:${this.node.id}] ═══ FALLBACK → ${loser.toUpperCase()} ═══`,
            "color:#FF5722;font-weight:bold",
          );
          const fallbackSuccess = await this._requestFormat(loser, fallbackRenderToken, "fallback");
          if (!this.node.isActiveRenderToken(fallbackRenderToken, "requestWinner:after_fallback_format", "fallback")) return;

          if (fallbackSuccess === "retrying" || fallbackSuccess === "closed") {
            return;
          }

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

        async _requestFormat(format, renderToken = this.node._activeRenderToken, triggerOverride = null) {
          if (format === "display") {
            return await this._requestDisplay(renderToken, triggerOverride);
          } else {
            return await this._requestVideo(renderToken, triggerOverride);
          }
        }

        async _requestDisplay(renderToken = this.node._activeRenderToken, triggerOverride = null) {
          const requestTrigger = triggerOverride || this.lastTrigger || "unknown";
          if (!this.node.isActiveRenderToken(renderToken, "_requestDisplay:start", requestTrigger)) return false;
          if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
            intextDebugCollector.recordTimeline("request-start", {
              node: this.node,
              source: "waterfall",
              requestType: "display",
              trigger: requestTrigger,
            });
          }
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
          if (!this.node.isActiveRenderToken(renderToken, "_requestDisplay:after_tam", requestTrigger)) return false;
          const displayResult = await this.node.askDisplay(
            this._lastDisplayBid,
            renderToken,
            requestTrigger,
          );
          if (displayResult.stale === true || !this.node.isActiveRenderToken(renderToken, "_requestDisplay:after_askDisplay", requestTrigger)) return "closed";

          if (displayResult.retrying === true) {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ GAM Display: technical house lineitem sentinel suppressed lineItemId=${displayResult.event?.lineItemId || "unknown"}, campaignId=${displayResult.event?.campaignId || "unknown"}, advertiserId=${displayResult.event?.advertiserId || "unknown"}, eventSize=${this.node.getDisplayGamEventSize(displayResult.event || {})}`,
            );
            return "retrying";
          }

          if (displayResult.maxAttemptsReached === true) {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ GAM Display: technical house lineitem sentinel max attempts reached lineItemId=${displayResult.event?.lineItemId || "unknown"}, campaignId=${displayResult.event?.campaignId || "unknown"}, advertiserId=${displayResult.event?.advertiserId || "unknown"}, eventSize=${this.node.getDisplayGamEventSize(displayResult.event || {})}`,
            );
            this.node.closeAll();
            return "closed";
          }

          if (displayResult.filled) {
            if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
              intextDebugCollector.recordTimeline("request-end", {
                node: this.node,
                source: "waterfall",
                requestType: "display",
                trigger: requestTrigger,
                filled: true,
              });
            }
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ GAM Display: FILL ✅ (size: ${JSON.stringify(displayResult.event?.size)})`,
            );
            this.node.showDisplay(displayResult, renderToken, requestTrigger);
            return true;
          } else {
            if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
              intextDebugCollector.recordTimeline("request-end", {
                node: this.node,
                source: "waterfall",
                requestType: "display",
                trigger: requestTrigger,
                filled: false,
              });
            }
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ GAM Display: NO-FILL ❌`,
            );
            this.node.discardDisplay();
            return false;
          }
        }

        async _requestVideo(renderToken = this.node._activeRenderToken, triggerOverride = null) {
          const requestTrigger = triggerOverride || this.lastTrigger || "unknown";
          if (!this.node.isActiveRenderToken(renderToken, "_requestVideo:start", requestTrigger)) return false;
          if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
            intextDebugCollector.recordVideoEvent("video-request-start", this.node, {
              trigger: requestTrigger,
            });
          }
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

          if (!this.node.isActiveRenderToken(renderToken, "_requestVideo:after_tam", requestTrigger)) return false;
          const gamVideoTagUrl = this.buildGAMVideoTagUrl();
          if (!gamVideoTagUrl) return false;
          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ GAM Video: building player...`,
          );
          const videoPlayed = await this.node.buildAndPlayVideo(gamVideoTagUrl, renderToken, requestTrigger);
          if (!this.node.isActiveRenderToken(renderToken, "_requestVideo:after_buildAndPlayVideo", requestTrigger)) return false;
          if (typeof window !== "undefined" && window.gexpIntextDebug === true) {
            intextDebugCollector.recordVideoEvent("video-request-complete", this.node, {
              trigger: requestTrigger,
              filled: Boolean(videoPlayed),
            });
          }
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
            const preservedDisplayHeight = isOpen
              ? this.node.getPreservedRefreshHeight(vContainerEl)
              : (this.node.lockedHeight || this.node.getDisplayStandardContentHeight());
            
            if (isOpen) {
               // 2. We MUST prepare the Display container BEFORE destroying the Video container
               const dContainer = this.node.container;
               const dEl = this.node.container.getElement();
               if (dEl) {
                 dEl.style.transition = "none";
                 this.node.applyDisplayWrapperHeight(dEl, preservedDisplayHeight, {
                   logReason:
                     preservedDisplayHeight === 600 ? "display_300x600_visual_height_adjusted" : "",
                   source: "video_failure_restore_display",
                 });
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
                 const restoreRenderToken = renderToken;
                 const elToRestore = dEl;
                 requestAnimationFrame(() => {
                   if (!this.node.isActiveRenderToken(restoreRenderToken, "video_failure_restore_display_raf", requestTrigger)) return;
                   if (!elToRestore.isConnected || this.node.container?.getElement?.() !== elToRestore) return;
                   elToRestore.style.transition = "";
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
          const videoConfig = this.resolveIntextVideoConfig();
          if (!videoConfig || !videoConfig.enabled) return null;

          const slotId = this.node.videoId;
          const slotName = this.getVideoAdUnitPath();
          const playerSize = videoConfig.playerSize || [640, 360];
          const networkId = this.node.manager.resolveIntextRequestNetworkId(this.node.scopedContext);

          if (!slotId || !slotName || !networkId) return null;

          return {
            slots: [
              {
                slotID: slotId,
                slotName: `/${networkId}/${slotName}`,
                mediaType: "video",
                sizes: [playerSize],
              },
            ],
          };
        }

        normalizeIntextTargetingValue(value) {
          if (Array.isArray(value)) {
            if (value.length === 0) return null;
            return String(value[0]);
          }
          if (value === undefined || value === null || value === "") return null;
          return String(value);
        }

        resolveIntextVideoVariant() {
          const videoConfig = this.config?.video || {};
          const selection = videoConfig.variantSelection || {};
          const selectionKey = selection.key || "random1";
          const selectionMap = selection.values || {};
          const fallbackVariant = selection.fallback || "instream";
          const slotCode = this.node?.id || this.node?.videoId || "gexp-intext";

          const effectiveResolution = this.node?.manager?.getEffectiveIntextTargetingResolution?.(
            selectionKey,
            this.node?.scopedContext || null,
          );
          let resolvedValue = effectiveResolution?.qaCookieDefault === true
            ? null
            : (effectiveResolution?.value ?? this.node?.manager?.getIntextRandomValue?.(selectionKey));
          let resolvedSource = effectiveResolution?.qaCookieDefault === true
            ? "qa-cookie-default"
            : (effectiveResolution?.source || (resolvedValue !== null ? "gexp-slot-random-snapshot" : null));
          if (resolvedValue === null && !INTEXT_RANDOM_KEYS.includes(String(selectionKey))) {
            const candidateSources = [
              {
                label: "scopedContext.targeting",
                map: this.node?.scopedContext?.targeting || null,
              },
              {
                label: "manager.getPageCustomTargeting",
                map: this.node?.manager?.getPageCustomTargeting?.(this.node?.scopedContext) || null,
              },
              {
                label: "slot_targeting",
                map: this.node?.getSlotTargetingMapSafe?.(this.node?.slot) || null,
              },
            ];
            for (const source of candidateSources) {
              const candidateValue = this.normalizeIntextTargetingValue(source.map?.[selectionKey]);
              if (candidateValue == null) continue;
              resolvedValue = candidateValue;
              resolvedSource = source.label;
              break;
            }
          }

          const variantName = selectionMap[String(resolvedValue)] || fallbackVariant;

          logIntext(`[Intext:Video:${slotCode}] intext_video_variant_resolution_source`, {
            nodeId: this.node?.id || null,
            slotCode,
            key: selectionKey,
            detectedValue: resolvedValue,
            source: resolvedSource || "unresolved",
            scopedContextPageUrl: this.node?.scopedContext?.pageUrl || null,
          });
          logIntext(`[Intext:Video:${slotCode}] intext_video_variant_resolved`, {
            nodeId: this.node?.id || null,
            slotCode,
            key: selectionKey,
            random1: String(this.node?.manager?.intextRandomSnapshot?.random1 || ""),
            detectedValue: resolvedValue,
            variant: variantName,
            fallback: fallbackVariant,
          });

          return {
            key: selectionKey,
            value: resolvedValue,
            variant: variantName,
            source: resolvedSource || "unresolved",
            fallback: fallbackVariant,
          };
        }

        resolveIntextVideoConfig() {
          const videoConfig = this.config?.video;
          if (!videoConfig || videoConfig.enabled === false) return videoConfig || null;

          const slotCode = this.node?.id || this.node?.videoId || "gexp-intext";
          const variantState = this.resolveIntextVideoVariant();
          const profiles = videoConfig.profiles || {};
          const commonVideoConfig = Object.keys(videoConfig).reduce((acc, key) => {
            if (key === "profiles" || key === "variantSelection") return acc;
            acc[key] = videoConfig[key];
            return acc;
          }, {});

          let profileName = variantState.variant || "instream";
          let profileConfig = profiles[profileName] || null;

          if (!profileConfig && profiles[variantState.fallback]) {
            warnIntext(`[Intext:Video:${slotCode}] intext_video_profile_missing_variant_fallback`, {
              nodeId: this.node?.id || null,
              requestedVariant: profileName,
              fallbackVariant: variantState.fallback,
            });
            profileName = variantState.fallback;
            profileConfig = profiles[profileName];
          }

          if (!profileConfig && Object.keys(profiles).length > 0) {
            const firstProfileName = Object.keys(profiles)[0];
            warnIntext(`[Intext:Video:${slotCode}] intext_video_profile_missing_config_fallback_first_profile`, {
              nodeId: this.node?.id || null,
              requestedVariant: profileName,
              fallbackVariant: firstProfileName,
            });
            profileName = firstProfileName;
            profileConfig = profiles[firstProfileName];
          }

          if (!profileConfig) {
            profileName = "instream";
            profileConfig = commonVideoConfig;
          }

          if (profileConfig?.plcmt == null && commonVideoConfig?.plcmt != null) {
            warnIntext(`[Intext:Video:${slotCode}] intext_video_profile_plcmt_fallback_common`, {
              nodeId: this.node?.id || null,
              variant: profileName,
              plcmt: commonVideoConfig.plcmt,
            });
          }
          if (profileConfig?.placement == null && commonVideoConfig?.placement != null) {
            warnIntext(`[Intext:Video:${slotCode}] intext_video_profile_placement_fallback_common`, {
              nodeId: this.node?.id || null,
              variant: profileName,
              placement: commonVideoConfig.placement,
            });
          }

          const mergedProfileConfig = IntextManager.deepMerge(commonVideoConfig, profileConfig || {});
          const isOutstreamProfile = String(mergedProfileConfig.context || "").toLowerCase() === "outstream";
          if (mergedProfileConfig.plcmt == null) {
            const fallbackPlcmt = isOutstreamProfile ? 4 : 1;
            warnIntext(`[Intext:Video:${slotCode}] intext_video_profile_plcmt_fallback_default`, {
              nodeId: this.node?.id || null,
              variant: profileName,
              fallbackPlcmt,
            });
            mergedProfileConfig.plcmt = fallbackPlcmt;
          }
          if (mergedProfileConfig.placement == null) {
            const fallbackPlacement = isOutstreamProfile ? 3 : 1;
            warnIntext(`[Intext:Video:${slotCode}] intext_video_profile_placement_fallback_default`, {
              nodeId: this.node?.id || null,
              variant: profileName,
              fallbackPlacement,
            });
            mergedProfileConfig.placement = fallbackPlacement;
          }
          mergedProfileConfig._variant = profileName;
          mergedProfileConfig._variantKey = variantState.key;
          mergedProfileConfig._variantValue = variantState.value;
          mergedProfileConfig._variantSource = variantState.source;

          logIntext(`[Intext:Video:${slotCode}] intext_video_profile_applied`, {
            nodeId: this.node?.id || null,
            slotCode,
            random1: variantState.key === "random1" ? variantState.value : null,
            variant: profileName,
            context: mergedProfileConfig.context || null,
            plcmt: mergedProfileConfig.plcmt ?? null,
            placement: mergedProfileConfig.placement ?? null,
            source: variantState.source,
          });

          return mergedProfileConfig;
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

          return {
            playerSize: [width, height],
            width,
            height,
          };
        }

        buildIntextOutstreamAU(videoConfig, adUnitCode) {
          const configuredOutstreamAU =
            videoConfig?.outstreamAU ||
            videoConfig?.pubmaticOutstreamAU ||
            videoConfig?.pubmatic?.outstreamAU ||
            null;
          if (configuredOutstreamAU) return String(configuredOutstreamAU);

          const path = this.getVideoAdUnitPath?.() || "";
          const normalizedPath = String(path || "")
            .split("/")
            .filter(Boolean)
            .join("_");
          return normalizedPath || String(adUnitCode || this.node?.id || "gexp-intext");
        }

        enhanceIntextVideoBidders(videoBidders, videoConfig, videoMediaType, adUnitCode) {
          const isOutstream = String(videoMediaType?.context || "").toLowerCase() === "outstream";
          const normalizedPlayerSize = this.normalizeVideoPlayerSize(videoMediaType?.playerSize);
          const enhancedBidders = [];

          (videoBidders || []).forEach((bid) => {
            if (!bid || typeof bid !== "object" || !bid.bidder) {
              logIntext(`[Intext:Prebid:${this.node.id}] intext_video_bidder_disabled_invalid_config`, {
                bidder: bid?.bidder || null,
                reason: "missing_bidder_config",
              });
              return;
            }

            const bidderName = String(bid.bidder).toLowerCase();
            const params = { ...(bid.params || {}) };

            if (bidderName === "rubicon_video" || bidderName === "rubicon") {
              if (params.playerWidth == null) params.playerWidth = normalizedPlayerSize.width;
              if (params.playerHeight == null) params.playerHeight = normalizedPlayerSize.height;
            }

            if ((bidderName === "pubmatic_video" || bidderName === "pubmatic") && isOutstream) {
              if (!params.publisherId) {
                logIntext(`[Intext:Prebid:${this.node.id}] intext_video_bidder_disabled_invalid_config`, {
                  bidder: bid.bidder,
                  reason: "pubmatic_missing_publisherId",
                });
                return;
              }
              if (!params.outstreamAU) {
                params.outstreamAU = this.buildIntextOutstreamAU(videoConfig, adUnitCode);
                logIntext(`[Intext:Prebid:${this.node.id}] pubmatic_outstreamAU_applied`, {
                  bidder: bid.bidder,
                  outstreamAU: params.outstreamAU,
                  reason: "required_for_pubmatic_outstream",
                });
              }
            }

            enhancedBidders.push({
              ...bid,
              params,
            });
          });

          return enhancedBidders;
        }

        logIntextPrebidVideoConfiguration(videoMediaType, videoBidders) {
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
          const bidders = (videoBidders || []).map((bid) => ({
            bidder: bid?.bidder || null,
            params: bid?.params || {},
          }));

          logIntext(`[Intext:Prebid:${this.node.id}] intext_prebid_video_media_types`, videoMediaType);
          logIntext(`[Intext:Prebid:${this.node.id}] intext_prebid_video_bidders`, bidders);

          requiredFields.forEach((field) => {
            if (videoMediaType?.[field] == null) {
              warnIntext(`[Intext:Prebid:${this.node.id}] intext_prebid_video_missing_field`, {
                field,
                bidders: bidders.map((bid) => bid.bidder),
              });
            }
          });
        }

        getIntextPrebidAdSlotContext(adUnitCode, adUnitPathOverride = null) {
          const networkId = this.node.manager.resolveIntextRequestNetworkId(this.node.scopedContext);
          const adUnitPath =
            adUnitPathOverride ||
            this.node.manager.resolveIntextDisplayAdUnitPath(this.node.scopedContext) ||
            "";
          const fullAdUnitPath = networkId && adUnitPath ? `/${networkId}/${adUnitPath}` : "";

          return {
            networkId,
            adUnitPath,
            fullAdUnitPath,
            adUnitCode: adUnitCode || this.node?.id || "",
          };
        }

        resolvePrebidSlotProfile(targetNetwork, slotCode) {
          const normalizedSlot = String(slotCode || "");
          const isSecondary =
            /^gexp-intext-\d+$/.test(normalizedSlot) ||
            normalizedSlot === "pnc" ||
            /-pnc$/.test(normalizedSlot);
          const slotFamily = isSecondary ? "secondary" : "primary";
          const profileKey = isSecondary ? "secondary" : "gexp-intext";
          const profiles = targetNetwork?.slotProfiles || {};
          const profile = profiles[profileKey];

          if (profile) {
            const resolved = {
              slotFamily,
              profileKey,
              bidders: profile.bidders || targetNetwork?.bidders || [],
              videoBidders: profile.videoBidders || targetNetwork?.videoBidders || [],
            };
            this.node.mergeIntextTelemetry({
              "gexp-intext-prebid-slot-family": slotFamily,
              "gexp-intext-prebid-slot-profile": profileKey,
            });
            logIntext(`[Intext:Prebid:${this.node.id}] intext_prebid_slot_profile_resolved`, {
              slotCode: normalizedSlot,
              slotFamily,
              profile: profileKey,
              bannerBidders: resolved.bidders.length,
              videoBidders: resolved.videoBidders.length,
            });
            return resolved;
          }

          const fallback = {
            slotFamily,
            profileKey: "fallback",
            bidders: targetNetwork?.bidders || [],
            videoBidders: targetNetwork?.videoBidders || [],
          };
          this.node.mergeIntextTelemetry({
            "gexp-intext-prebid-slot-family": slotFamily,
            "gexp-intext-prebid-slot-profile": "fallback",
          });
          logIntext(`[Intext:Prebid:${this.node.id}] intext_prebid_slot_profile_fallback`, {
            slotCode: normalizedSlot,
            slotFamily,
            requestedProfile: profileKey,
            bannerBidders: fallback.bidders.length,
            videoBidders: fallback.videoBidders.length,
          });
          return fallback;
        }

        enhanceIntextDisplayBidders(bidders, adUnitCode) {
          const context = this.getIntextPrebidAdSlotContext(adUnitCode);
          const hasContext = Boolean(context.fullAdUnitPath && context.adUnitCode);
          const dynamicId = hasContext ? `${context.fullAdUnitPath}/${context.adUnitCode}` : "";
          let taboolaApplied = false;
          let ttdApplied = false;

          const enhancedBidders = (bidders || []).map((bid) => {
            if (!bid || typeof bid !== "object" || !bid.bidder) return bid;

            const bidderName = String(bid.bidder).toLowerCase();
            const params = bid.params || {};

            if (bidderName === "taboola") {
              if (params.tagId) {
                logIntext(`[Intext:Prebid:${this.node.id}] taboola_tagId_skipped_existing`, {
                  bidder: bid.bidder,
                  tagId: params.tagId,
                });
                return bid;
              }
              if (!hasContext) {
                logIntext(`[Intext:Prebid:${this.node.id}] taboola_tagId_skipped_missing_context`, {
                  bidder: bid.bidder,
                  networkId: context.networkId || null,
                  adUnitPath: context.adUnitPath || null,
                  adUnitCode: context.adUnitCode || null,
                });
                return bid;
              }
              taboolaApplied = true;
              logIntext(`[Intext:Prebid:${this.node.id}] taboola_tagId_applied`, {
                bidder: bid.bidder,
                tagId: dynamicId,
              });
              return {
                ...bid,
                params: {
                  ...params,
                  tagId: dynamicId,
                },
              };
            }

            if (bidderName === "ttd") {
              if (params.placementId) {
                logIntext(`[Intext:Prebid:${this.node.id}] ttd_display_placementId_skipped_existing`, {
                  bidder: bid.bidder,
                  placementId: params.placementId,
                });
                return bid;
              }
              if (!hasContext) return bid;
              ttdApplied = true;
              logIntext(`[Intext:Prebid:${this.node.id}] ttd_display_placementId_applied`, {
                bidder: bid.bidder,
                placementId: dynamicId,
              });
              return {
                ...bid,
                params: {
                  ...params,
                  placementId: dynamicId,
                },
              };
            }

            return bid;
          });

          this.node.mergeIntextTelemetry({
            "gexp-intext-taboola-tagid-applied": taboolaApplied ? "true" : "false",
            "gexp-intext-ttd-placementid-applied": ttdApplied ? "true" : "false",
          });

          return enhancedBidders;
        }

        getPrebidMultiFormatConfig() {
          const code = this.getPrebidCode();
          const mode = this._effectiveMode;
          const mediaTypes = {};
          let allBids = [];
          let videoMediaType = null;
          const networkId = this.node.manager.resolveIntextRequestNetworkId(this.node.scopedContext);
          if (!networkId) return null;
          const prebidNetworks = this.config.prebid?.networks || {};
          const targetNetwork = prebidNetworks[networkId] || prebidNetworks.default || {};
          const slotProfile = this.resolvePrebidSlotProfile(targetNetwork, code);
          this.node.mergeIntextTelemetry({
            "gexp-intext-prebid-banner-bidder-count": "0",
            "gexp-intext-prebid-video-bidder-count": "0",
          });

          // Banner (if mode allows display)
          if (mode === "auto" || mode === "display_only") {
            const sizes = this.getDisplaySizes();
            if (sizes.length) {
              mediaTypes.banner = { sizes };
              const displayBidders = this.enhanceIntextDisplayBidders(slotProfile.bidders || [], code);
              this.node.mergeIntextTelemetry({
                "gexp-intext-prebid-banner-bidder-count": String(displayBidders.length),
              });
              allBids = allBids.concat(displayBidders);
            }
          }

          if (mode === "auto" || mode === "video_only") {
            const vc = this.resolveIntextVideoConfig();
            if (vc?.enabled) {
              const normalizedPlayerSize = this.normalizeVideoPlayerSize(vc.playerSize || [640, 360]);
              videoMediaType = {
                context: vc.context || "instream",
                playerSize: normalizedPlayerSize.playerSize,
                playersize: normalizedPlayerSize.playerSize,
                mimes: vc.mimes || ["video/mp4", "application/javascript"],
                protocols: vc.protocols || [2, 3, 5, 6, 7],
                playbackmethod: vc.playbackmethod || [6],
                plcmt: vc.plcmt,
                placement: vc.placement,
                linearity: vc.linearity || 1,
                api: vc.api || [1, 2],
                maxduration: vc.maxduration || 30,
                minduration: vc.minduration || 1,
                startdelay: vc.startdelay != null ? vc.startdelay : 0,
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
              mediaTypes.video = videoMediaType;
              const excludedVideoList = this.config.prebid?.excludedVideoBidders || [];
              const filteredVideoBidders = (slotProfile.videoBidders || []).filter(
                (b) => !excludedVideoList.includes(b.bidder)
              );
              if (excludedVideoList.length) {
                logIntext(
                  `[Intext:Prebid] ⚠️ excludedVideoBidders active: [${excludedVideoList.join(", ")}] — filtered ${(slotProfile.videoBidders || []).length - filteredVideoBidders.length} bidder(s)`
                );
              }
              const effectiveVideoBidders = this.enhanceIntextVideoBidders(filteredVideoBidders, vc, videoMediaType, code);
              this.node.mergeIntextTelemetry({
                "gexp-intext-prebid-video-bidder-count": String(effectiveVideoBidders.length),
              });
              allBids = allBids.concat(effectiveVideoBidders);
              this.logIntextPrebidVideoConfiguration(videoMediaType, effectiveVideoBidders);
            }
          }

          if (!Object.keys(mediaTypes).length || !allBids.length) return null;

          return {
            code,
            mediaTypes,
            bids: allBids,
            ortb2Imp: this.buildOrtb2Imp(code, null, videoMediaType),
          };
        }

        buildOrtb2Imp(adUnitCode, adUnitPathOverride, videoMediaType = null) {
          const adSlotContext = this.getIntextPrebidAdSlotContext(adUnitCode, adUnitPathOverride);
          const fullAdSlot = adSlotContext.fullAdUnitPath || `/${adSlotContext.networkId}/${adSlotContext.adUnitPath}`;
          const pbadslot = `${fullAdSlot}#${adUnitCode}`;

          const imp = {
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

          if (videoMediaType) {
            const configuredMode = this.config?.prebid?.videoOrtb2ImpMode;
            const videoOrtb2ImpMode = configuredMode === "full" ? "full" : "ext_only";
            this.node.mergeIntextTelemetry({
              "gexp-intext-prebid-ortb2-video-mode": videoOrtb2ImpMode,
            });
            logIntext(`[Intext:Prebid:${this.node.id}] prebid_ortb2_video_mode_resolved`, {
              mode: videoOrtb2ImpMode,
              configuredMode: configuredMode || null,
            });

            if (videoOrtb2ImpMode === "full") {
              const normalizedPlayerSize = this.normalizeVideoPlayerSize(videoMediaType.playerSize);
              imp.video = {
                w: normalizedPlayerSize.width,
                h: normalizedPlayerSize.height,
                mimes: videoMediaType.mimes,
                protocols: videoMediaType.protocols,
                playbackmethod: videoMediaType.playbackmethod,
                plcmt: videoMediaType.plcmt,
                placement: videoMediaType.placement,
                linearity: videoMediaType.linearity,
                api: videoMediaType.api,
                minduration: videoMediaType.minduration,
                maxduration: videoMediaType.maxduration,
                startdelay: videoMediaType.startdelay,
                ...(videoMediaType.battr ? { battr: videoMediaType.battr } : {}),
                ...(videoMediaType.skip != null ? { skip: videoMediaType.skip } : {}),
              };
              logIntext(`[Intext:Prebid:${this.node.id}] prebid_ortb2_video_included_full`, {
                code: adUnitCode,
              });
            } else {
              logIntext(`[Intext:Prebid:${this.node.id}] prebid_ortb2_video_omitted_ext_only`, {
                code: adUnitCode,
              });
            }
          }

          return imp;
        }

        getTAMConfiguration() {
          if (this.config.tam?.enabled === false) return null;
          const slotId = this.node.id;
          const slotName = this.node.manager.resolveIntextDisplayAdUnitPath(this.node.scopedContext) || "";
          const sizes = this.getDisplaySizes().filter(
            (s) => s !== "fluid" && s[0] > 1,
          );
          const networkId = this.node.manager.resolveIntextRequestNetworkId(this.node.scopedContext);

          if (!slotId || !slotName || !sizes.length || !networkId) return null;

          return {
            slots: [
              {
                slotID: slotId,
                slotName: `/${networkId}/${slotName}`,
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
          this.node?.manager?.validateIntextRandomSnapshotStability?.("immediately-before-video-request");
          const networkId = this.node.manager.resolveIntextRequestNetworkId(this.node.scopedContext);
          const adUnitPath = this.getVideoAdUnitPath();
          this.node.mergeIntextTelemetry({
            ...this.node.manager.getIntextNetworkTelemetry(this.node.scopedContext),
            "gexp-intext-video-adunit-request": String(adUnitPath || "none"),
          });
          if (!networkId || !adUnitPath) {
            logIntext(`[Intext:Waterfall:${this.node.id}] intext_network_force_invalid - video request blocked`);
            return null;
          }
          const videoId = this.node.videoId;
          const pageUrl = this.node.scopedContext?.pageUrl || window.location.href;
          const resolvedVideoConfig = this.resolveIntextVideoConfig() || {};
          const intextPositionCode =
            this.node.id || (videoId ? videoId.replace(/-video$/, "") : "") || "gexp-intext";
          const resolvedVideoTargeting = this.node.resolveVideoRequestTargeting();
          const playerSize = Array.isArray(resolvedVideoConfig.playerSize) && resolvedVideoConfig.playerSize.length === 2
            ? resolvedVideoConfig.playerSize
            : [640, 360];
          const gamSize = `${playerSize[0]}x${playerSize[1]}`;
          const gamPlcmt = resolvedVideoConfig.plcmt != null
            ? String(resolvedVideoConfig.plcmt)
            : "1";

          const custTargeting = {};
          const addCustParam = (key, value) => {
            if (value === undefined || value === null || value === "") return;
            custTargeting[String(key)] = String(value);
          };
          Object.entries(resolvedVideoTargeting.targeting).forEach(([key, value]) => {
            if (String(key).indexOf("hb_") === 0) return;
            addCustParam(key, value);
          });
          
          addCustParam("gexp-intext", "true");
          addCustParam("gexp-intext-position", this.node.id);
          addCustParam("intext", "true");
          addCustParam("gexp-intext-video", "true");
          logIntext(`[Intext:Waterfall:${this.node.id}] video_gam_position_targeting_applied`, {
            p: intextPositionCode,
            targetingSource: resolvedVideoTargeting.targetingSource,
          });

          if (window.pbjs && this._lastVideoBid) {
            const bid = this._lastVideoBid;
            if (bid.source && bid.source.includes("prebid") && bid.cpm != null && Number(bid.cpm) > 0) {
              const diagnostics = this.getIntextVideoBidDiagnostics(bid);
              const targeting = diagnostics.targeting;
              const rawVideoBids = this._lastCurrentVideoBids || this.node?._lastCurrentVideoBids || [bid];
              const currentAuctionId = this._currentAuctionId || null;
              const validVideoBids = rawVideoBids.filter((videoBid) =>
                videoBid &&
                videoBid.cpm != null &&
                Number(videoBid.cpm) > 0 &&
                (!currentAuctionId || videoBid.auctionId === currentAuctionId)
              );

              if (!validVideoBids.length) {
                logIntext(`[Intext:Video:${this.node.id}] video_hb_targeting_skipped_zero_valid_bids`, {
                  slotCode: this.node.id || null,
                  winnerBidder: bid.bidderCode || null,
                });
              } else {
              const { hbTargeting, biddersIncluded } = this.node.collectHbTargetingFromCurrentBids(
                validVideoBids,
                bid,
                { mediaType: "video", defaultSize: playerSize },
              );
              const pb = hbTargeting.hb_pb || targeting.hb_pb || bid.pbCg || bid.pbAg || bid.pbHg || String(bid.cpm);

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

              if (hbTargeting.hb_pb) {
                Object.entries(hbTargeting).forEach(([key, value]) => addCustParam(key, value));
              } else {
                logIntext(`[Intext:Video:${this.node.id}] video_hb_targeting_skipped_no_hb_pb`, {
                  slotCode: this.node.id || null,
                  winnerBidder: bid.bidderCode || null,
                  biddersIncluded,
                  keys: Object.keys(hbTargeting),
                });
              }

              logIntext(`[Intext:Video:${this.node.id}] video_hb_targeting_built`, {
                winnerBidder: hbTargeting.hb_bidder || targeting.hb_bidder || bid.bidderCode || null,
                winnerPb: pb || null,
                biddersIncluded,
                keys: Object.keys(hbTargeting),
              });

              logIntext(`[Intext:Auction:${this.node.id}] intext_video_gam_targeting_payload`, {
                hb_pb: pb,
                hb_bidder: hbTargeting.hb_bidder || targeting.hb_bidder || bid.bidderCode || null,
                hb_format: hbTargeting.hb_format || targeting.hb_format || "video",
                hb_adid: hbTargeting.hb_adid || targeting.hb_adid || null,
                hb_size: hbTargeting.hb_size || null,
                hb_uuid: hbTargeting.hb_uuid || targeting.hb_uuid || null,
                hb_cache_id: hbTargeting.hb_cache_id || targeting.hb_cache_id || null,
                hb_cache_host: hbTargeting.hb_cache_host || targeting.hb_cache_host || null,
                hb_cache_path: hbTargeting.hb_cache_path || targeting.hb_cache_path || null,
              });
              }
            } else {
              logIntext(`[Intext:Video:${this.node.id}] video_hb_targeting_skipped_invalid_winner`, {
                slotCode: this.node.id || null,
                winnerBidder: bid.bidderCode || null,
                winnerCpm: bid.cpm ?? null,
                source: bid.source || null,
              });
            }
          } else if (this._lastVideoBid) {
            logIntext(`[Intext:Video:${this.node.id}] video_hb_targeting_skipped_invalid_winner`, {
              slotCode: this.node.id || null,
              winnerBidder: this._lastVideoBid.bidderCode || null,
              winnerCpm: this._lastVideoBid.cpm ?? null,
              source: this._lastVideoBid.source || null,
            });
          }

          if (window.apstag && window.apstag.targetingKeys) {
            const tamKeys = window.apstag.targetingKeys();
            if (tamKeys && tamKeys[videoId]) {
              Object.entries(tamKeys[videoId]).forEach(([k, v]) => {
                const val = Array.isArray(v) ? v.join(",") : v;
                addCustParam(k, val);
              });
            }
          }

          if (this.node && this.node.wa) {
            // Fix: Mock slot to avoid core crash when this.slot is null in video
            if (!this.node.wa.slot) {
                const videoAU = adUnitPath || this.getVideoAdUnitPath();
                this.node.wa.slot = { getAdUnitPath: () => videoAU };
            }
            this.node.mergeIntextTelemetry({
              "gexp-intext-request-type": "video",
              "gexp-intext-video": "true",
              "gexp-intext-display": "false",
              "gexp-intext-position": this.node.id,
              "gexp-intext-is-refresh": this._videoTiming?.trigger === "refresh" ? "true" : "false",
              "gexp-intext-refresh": this._videoTiming?.trigger === "refresh" ? "true" : "false",
              "gexp-intext-is-fallback": "false",
              "gexp-intext-fallback": "false",
            });
            this.node.wa.newImpression();
            this.node.ensureIntextCycleTelemetryIdentity();
            
            if (this.node.wa.cI) {
                // Video only: gexp-intext-video (no refresh/fallback as per user request)
                this.node.wa.cI["gexp-intext-video"] = "true";
                this.node.wa.cI["gexp-intext-display"] = "false";
                this.node.flushIntextTelemetryToCI();
                
                Object.assign(this.node.wa.cI, custTargeting);
                logIntext(`[Intext:Video:${this.node.id}] video_telemetry_registered`, { keys: Object.keys(custTargeting) });
            }
          }

          INTEXT_RANDOM_KEYS.forEach((key) => {
            addCustParam(key, this.node?.manager?.intextRandomSnapshot?.[key]);
          });

          logIntext(
            `[Intext:Auction:${this.node.id}] intext_video_gam_request_targeting_final`,
            { ...custTargeting },
          );
          const custParts = Object.entries(custTargeting).map(([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
          );
          const custParams = custParts.join("&");

          const params = new URLSearchParams({
            iu: `/${networkId}/${adUnitPath}`,
            vpos: "preroll",
            sz: gamSize,
            gdfp_req: "1",
            env: "vp",
            output: "xml_vast4",
            unviewed_position_start: "1",
            ad_rule: "0",
            plcmt: gamPlcmt,
            vpmute: "1",
            vpa: "auto",
            url: pageUrl,
            description_url: pageUrl,
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
          return this.node.manager.resolveIntextVideoAdUnitPath(this.node.scopedContext) || "";
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
                if (slot.getSlotElementId() === configuration.code && typeof slot.getTargetingMap === "function") {
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

          const networkId = this.node.manager.resolveIntextRequestNetworkId(this.node.scopedContext);
          if (!networkId) return;
          const prebidNetworks = this.config.prebid?.networks || {};
          const targetNetwork = prebidNetworks[networkId] || prebidNetworks.default || {};
          const aliases = targetNetwork.aliases;
          if (!aliases || !window.pbjs) {
            logIntext(`[Intext:Prebid] prebid_alias_register_skipped`, {
              reason: !aliases ? "missing_aliases" : "missing_pbjs",
            });
            return;
          }

          window.pbjs.que.push(() => {
            if (typeof window.pbjs.aliasBidder !== "function") {
              logIntext(`[Intext:Prebid] prebid_alias_register_skipped`, {
                reason: "missing_aliasBidder",
              });
              return;
            }

            for (const [alias, aliasConfig] of Object.entries(aliases)) {
              const isObjectConfig = aliasConfig && typeof aliasConfig === "object";
              const original = isObjectConfig ? aliasConfig.bidder : aliasConfig;
              const gvlid = isObjectConfig ? aliasConfig.gvlid : null;
              const useBaseGvlid = isObjectConfig && aliasConfig.useBaseGvlid === true;

              if (!original) {
                logIntext(`[Intext:Prebid] prebid_alias_register_skipped`, {
                  alias,
                  reason: "missing_original_bidder",
                });
                continue;
              }

              try {
                const options = {};
                if (useBaseGvlid) {
                  options.useBaseGvlid = true;
                } else if (gvlid != null) {
                  options.gvlid = gvlid;
                }
                const hasOptions = Object.keys(options).length > 0;
                logIntext(`[Intext:Prebid] prebid_alias_register_attempt`, {
                  alias,
                  bidder: original,
                  gvlid: gvlid ?? null,
                  useBaseGvlid,
                });
                window.pbjs.aliasBidder(
                  original,
                  alias,
                  hasOptions ? options : undefined
                );
                if (useBaseGvlid) {
                  logIntext(`[Intext:Prebid] prebid_alias_use_base_gvlid_applied`, {
                    alias,
                    bidder: original,
                  });
                } else if (gvlid != null) {
                  logIntext(`[Intext:Prebid] prebid_alias_gvlid_applied`, {
                    alias,
                    bidder: original,
                    gvlid,
                  });
                }
                logIntext(`[Intext:Prebid] prebid_alias_register_success`, {
                  alias,
                  bidder: original,
                });
              } catch (e) {
                warnIntext(`[Intext:Prebid] prebid_alias_register_error`, {
                  alias,
                  bidder: original,
                  error: e?.message || String(e),
                });
              }
            }
          });
        }

        getPrebidCode() {
          return this.node.id;
        }

        getPrebidTimeout() {
          const configuredTimeout = Number(this.config?.prebid?.timeoutMs);
          return configuredTimeout > 0 ? configuredTimeout : 1500;
        }

        getIntextPageTargetingValue(key) {
          const snapshotValue = this.node?.manager?.getIntextRandomValue?.(key);
          if (INTEXT_RANDOM_KEYS.includes(String(key))) return snapshotValue ?? "";
          const readValue = (source) => {
            if (source === undefined || source === null || source === "") return null;
            if (typeof source === "object") {
              const value = source[key];
              return value === undefined || value === null || value === "" ? null : value;
            }
            return source;
          };

          const manager = this.node?.manager;
          const sources = [
            () => manager?.getPageCustomTargeting?.(key),
            () => manager?.getPageCustomTargeting?.(),
            () => manager?.pageTargeting,
            () => this.node?.scopedContext?.targeting,
          ];

          for (const getSource of sources) {
            try {
              const value = readValue(getSource());
              if (value !== null) return Array.isArray(value) ? value[0] : value;
            } catch (e) {}
          }

          return "";
        }

        resolveIntextVideoCacheProfile(slotCode) {
          const cfg =
            this.config?.prebidVideoCache ||
            this.config?.prebid?.videoCache ||
            this.node?.manager?.config?.prebidVideoCache ||
            this.node?.manager?.config?.prebid?.videoCache;

          if (!cfg || !cfg.variants) {
            return { mode: "default", reason: "no_config", slotCode };
          }

          const key1 = cfg.key1 || "random1";
          const key2 = cfg.key2 || "random2";
          const random1 = String(this.node?.manager?.getIntextRandomValue?.(key1) ?? "");
          const random2 = String(this.node?.manager?.getIntextRandomValue?.(key2) ?? "");
          const enabledRandom1 = (cfg.enabledRandom1 || ["5", "6"]).map(String);

          if (!enabledRandom1.includes(random1)) {
            return {
              mode: "default",
              reason: "random1_not_enabled",
              slotCode,
              random1,
              random2,
            };
          }

          const variant = cfg.variants[random2];

          if (!variant || variant.mode !== "custom" || !variant.url) {
            return {
              mode: "default",
              reason: variant ? "variant_default" : "random2_no_variant",
              slotCode,
              random1,
              random2,
            };
          }

          return {
            mode: "custom",
            slotCode,
            random1,
            random2,
            url: variant.url,
            ignoreBidderCacheKey: variant.ignoreBidderCacheKey === true,
            reason: "matched_custom",
          };
        }

        getCurrentPrebidCacheConfig() {
          try {
            if (window.pbjs && typeof window.pbjs.getConfig === "function") {
              return window.pbjs.getConfig("cache") || {};
            }
          } catch (e) {}
          return {};
        }

        applyIntextVideoCacheOverride(profile) {
          const pbjs = window.pbjs;

          if (!pbjs || typeof pbjs.setConfig !== "function") {
            return () => {};
          }

          if (!profile || profile.mode !== "custom" || !profile.url) {
            return () => {};
          }

          const previousCache = this.getCurrentPrebidCacheConfig();
          const nextCache = {
            ...previousCache,
            url: profile.url,
            ignoreBidderCacheKey: profile.ignoreBidderCacheKey,
          };

          logIntext(`[Intext:Prebid:${profile.slotCode}] video_cache_override_apply`, {
            slotCode: profile.slotCode,
            random1: profile.random1,
            random2: profile.random2,
            mode: profile.mode,
            url: profile.url,
            ignoreBidderCacheKey: profile.ignoreBidderCacheKey,
            previousUrl: previousCache?.url || null,
            reason: profile.reason,
          });

          try {
            pbjs.setConfig({ cache: nextCache });
          } catch (err) {
            logIntext(`[Intext:Prebid:${profile.slotCode}] video_cache_override_apply_failed`, {
              slotCode: profile.slotCode,
              random1: profile.random1,
              random2: profile.random2,
              mode: profile.mode,
              url: profile.url,
              ignoreBidderCacheKey: profile.ignoreBidderCacheKey,
              previousUrl: previousCache?.url || null,
              reason: profile.reason,
              error: err?.message || String(err),
            });
            return () => {};
          }

          let restored = false;

          return () => {
            if (restored) return;
            restored = true;

            try {
              pbjs.setConfig({ cache: previousCache });

              logIntext(`[Intext:Prebid:${profile.slotCode}] video_cache_override_restore`, {
                slotCode: profile.slotCode,
                random1: profile.random1,
                random2: profile.random2,
                mode: profile.mode,
                url: profile.url,
                ignoreBidderCacheKey: profile.ignoreBidderCacheKey,
                previousUrl: previousCache?.url || null,
                restoredUrl: previousCache?.url || null,
                reason: profile.reason,
              });
            } catch (err) {
              logIntext(`[Intext:Prebid:${profile.slotCode}] video_cache_override_restore_failed`, {
                slotCode: profile.slotCode,
                random1: profile.random1,
                random2: profile.random2,
                mode: profile.mode,
                url: profile.url,
                ignoreBidderCacheKey: profile.ignoreBidderCacheKey,
                previousUrl: previousCache?.url || null,
                reason: profile.reason,
                error: err?.message || String(err),
              });
            }
          };
        }

        isIntextBannerFloorKey(floorKey) {
          return /^gexp-intext(?:-\d+)?\|banner$/.test(String(floorKey || ""));
        }

        getIntextDisplayFloorInfo(floorKey) {
          const wa = this.wa;
          if (!wa) return { value: null, source: "missing" };

          const allowedSources = new Set(["effectivePrice", "lastPrice", "windowStart", "initial"]);
          const logFloorCandidate = (candidate, source, mediaType) => {
            logIntext(`[Intext:Prebid:${this.node.id}] display_prebid_floor_write_candidate`, {
              code: this.getPrebidCode(),
              floorKey,
              candidate,
              source,
              mediaType,
            });
          };
          const logRejectedCandidate = (candidate, source, mediaType) => {
            logIntext(`[Intext:Prebid:${this.node.id}] display_prebid_floor_write_rejected_non_banner`, {
              code: this.getPrebidCode(),
              floorKey,
              candidate,
              source,
              mediaType,
            });
          };
          const commitCandidate = (candidate, source) => {
            logFloorCandidate(candidate, source, "banner");
            if (!allowedSources.has(source)) {
              logRejectedCandidate(candidate, source, "banner");
              return null;
            }
            if (!(candidate > 0)) return null;
            return { value: parseFloat(candidate), source };
          };

          // 1) Si ya existe el effectivePrice calculado por GEXP, úsalo
          if (typeof wa.effectivePrice === "number" && isFinite(wa.effectivePrice) && wa.effectivePrice > 0) {
            const candidate = commitCandidate(wa.effectivePrice, "effectivePrice");
            if (candidate) return candidate;
          }

          // 2) Si hay lastPrice persistido, úsalo
          if (typeof wa.state?.lastPrice === "number" && isFinite(wa.state.lastPrice) && wa.state.lastPrice > 0) {
            const candidate = commitCandidate(wa.state.lastPrice, "lastPrice");
            if (candidate) return candidate;
          }

          // 3) Si hay windowStart válido, úsalo contra el array de precios
          const idx = wa.state?.windowStart;
          if (
            typeof idx === "number" &&
            idx >= 0 &&
            Array.isArray(wa.array) &&
            typeof wa.array[idx] === "number" &&
            isFinite(wa.array[idx]) &&
            wa.array[idx] > 0
          ) {
            const candidate = commitCandidate(wa.array[idx], "windowStart");
            if (candidate) return candidate;
          }

          // 4) En primera subasta display, deriva un floor inicial estable desde el índice base
          try {
            const deriveInitialAdUnit = () => {
              if (wa.cI?.adUnit) return wa.cI.adUnit;
              try {
                const slotAdUnitPath = wa.slot?.getAdUnitPath?.();
                if (slotAdUnitPath) {
                  const slotParts = String(slotAdUnitPath).split("/").filter(Boolean);
                  if (slotParts.length >= 2) return slotParts[1];
                  if (slotParts.length >= 1) return slotParts[0];
                }
              } catch (e) {
                /* ignore */
              }

              const cfgAdUnit = wa.gexp?.cfg?.adUnit;
              if (cfgAdUnit) {
                const cfgParts = String(cfgAdUnit).split("/").filter(Boolean);
                if (cfgParts.length >= 1) return cfgParts[0];
              }

              return null;
            };

            const initialAdUnit = deriveInitialAdUnit();
            let initialIdx = null;
            if (initialAdUnit && typeof wa.gexp?.getPivotIndex === "function") {
              initialIdx = wa.gexp.getPivotIndex(initialAdUnit, wa.position, 0, wa.offY);
            }
            if (initialIdx === null || typeof initialIdx === "undefined") {
              initialIdx = typeof wa.pCfg?.p === "number" ? wa.pCfg.p + 1 : null;
            }
            if (
              typeof initialIdx === "number" &&
              initialIdx >= 0 &&
              Array.isArray(wa.array) &&
              typeof wa.array[initialIdx] === "number" &&
              isFinite(wa.array[initialIdx]) &&
              wa.array[initialIdx] > 0
            ) {
              const candidate = commitCandidate(wa.array[initialIdx], "initial");
              if (candidate) return candidate;
            }
          } catch (e) {
            /* ignore */
          }

          // 5) No reutilizar gexp_floor desde GAM targeting: puede venir contaminado por otros formatos.
          try {
            const slot = this.node?.slot;
            if (slot && typeof slot.getTargeting === "function") {
              const kv = slot.getTargeting("gexp_floor");
              if (Array.isArray(kv) && kv[0] && !isNaN(parseFloat(kv[0]))) {
                logFloorCandidate(parseFloat(kv[0]), "slot_targeting", "unknown");
                logRejectedCandidate(parseFloat(kv[0]), "slot_targeting", "unknown");
              }
            }
          } catch (e) {
            /* ignore */
          }

          return { value: null, source: "missing" };
        }

        getCoreFloorsConfigData() {
          const fallbackData = {
            currency: "USD",
            schema: {
              delimiter: "|",
              fields: ["adUnitCode", "mediaType"],
            },
            values: {},
          };

          let source = "fallback";
          let baseFloors = null;
          let baseData = null;

          try {
            if (typeof window.pbjs?.getConfig === "function") {
              const pbjsFloors = window.pbjs.getConfig("floors");
              if (pbjsFloors?.data) {
                source = "pbjs";
                baseFloors = pbjsFloors;
                baseData = pbjsFloors.data;
              }
            }
          } catch (e) {}

          if (!baseData && WindowArray.pbFloorCfg?.floors?.data) {
            source = "windowarray";
            baseFloors = WindowArray.pbFloorCfg.floors;
            baseData = WindowArray.pbFloorCfg.floors.data;
          }

          if (!baseData) {
            baseFloors = { data: fallbackData };
            baseData = fallbackData;
          }

          logIntext(
            `[Intext:Prebid:${this.node.id}] display_prebid_floor_core_detected - source=${source}, data=${JSON.stringify(baseData)}`,
          );

          return {
            source,
            floors: baseFloors,
            data: baseData,
            fallbackData,
          };
        }

        buildMergedFloorsConfig(floorKey, floorValue) {
          const { floors, data, fallbackData } = this.getCoreFloorsConfigData();
          const rawValues = {
            ...(fallbackData.values || {}),
            ...((data && data.values) || {}),
          };
          const values = {};
          Object.entries(rawValues).forEach(([key, value]) => {
            if (!key) return;

            if (String(key).startsWith("gexp-intext")) {
              if (!this.isIntextBannerFloorKey(key)) {
                logIntext(`[Intext:Prebid:${this.node.id}] display_prebid_floor_write_rejected_non_banner`, {
                  code: this.getPrebidCode(),
                  floorKey: key,
                  candidate: value,
                  source: "existing_config",
                  mediaType: String(key).split("|")[1] || "unknown",
                });
                return;
              }

              const parsedExistingValue = parseFloat(value);
              if (!(parsedExistingValue > 0)) return;
              values[key] = parsedExistingValue;
              return;
            }

            values[key] = value;
          });
          const parsedFloorValue = parseFloat(floorValue);
          const hasValidFloorValue = Number.isFinite(parsedFloorValue) && parsedFloorValue > 0;

          if (hasValidFloorValue) {
            values[floorKey] = parsedFloorValue;
          } else {
            delete values[floorKey];
          }

          const mergedFloors = {
            ...(floors || {}),
            data: {
              ...fallbackData,
              ...(data || {}),
              schema: data?.schema || fallbackData.schema,
              values,
            },
          };

          return {
            floorPayload: {
              floors: mergedFloors,
            },
            floorValue: hasValidFloorValue ? parsedFloorValue : null,
          };
        }

        setIntextDisplayFloorConfig(floorKey, floorValue) {
          if (!window.pbjs?.setConfig || !floorKey) return null;

          const { floorPayload, floorValue: parsedFloorValue } =
            this.buildMergedFloorsConfig(floorKey, floorValue);

          WindowArray.pbFloorCfg = floorPayload;
          logIntext(`[Intext:Prebid:${this.node.id}] display_prebid_floor_state_snapshot`, {
            code: this.getPrebidCode(),
            floorKey,
            values: floorPayload?.floors?.data?.values || {},
          });
          logIntext(
            `[Intext:Prebid:${this.node.id}] display_prebid_floor_setconfig_payload - key=${floorKey}, floor=${parsedFloorValue != null ? parsedFloorValue : "cleared"}, payload=${JSON.stringify(floorPayload)}`,
          );

          window.pbjs.setConfig(floorPayload);

          if (parsedFloorValue != null) {
            logIntext(`[Intext:Prebid:${this.node.id}] display_prebid_floor_write_committed`, {
              code: this.getPrebidCode(),
              floorKey,
              floor: parsedFloorValue,
            });
          }

          let floorsConfigAfter = null;
          try {
            floorsConfigAfter = typeof window.pbjs.getConfig === "function"
              ? window.pbjs.getConfig("floors")
              : null;
          } catch (e) {
            floorsConfigAfter = null;
          }

          let acceptedState = "unknown";
          const configuredValue = floorsConfigAfter?.data?.values?.[floorKey];
          if (parsedFloorValue != null) {
            acceptedState = Number(configuredValue) === Number(parsedFloorValue) ? "accepted" : "unconfirmed";
          } else {
            acceptedState = typeof configuredValue === "undefined" ? "cleared" : "unconfirmed";
          }

          logIntext(
            `[Intext:Prebid:${this.node.id}] display_prebid_floor_config_after_set - key=${floorKey}, floor=${parsedFloorValue != null ? parsedFloorValue : "cleared"}, accepted=${acceptedState}, config=${JSON.stringify(floorsConfigAfter)}`,
          );

          return floorPayload;
        }

        applyIntextDisplayFloorToPrebid(configuration) {
          if (!window.pbjs?.setConfig || !configuration?.code) return null;

          const hasBanner = Boolean(configuration?.mediaTypes?.banner);
          const floorKey = `${configuration.code}|banner`;

          // El floor del intext solo aplica a banner/display
          if (!hasBanner) {
            logIntext(`[Intext:Prebid:${this.node.id}] display_prebid_floor_write_rejected_non_banner`, {
              code: configuration.code,
              floorKey,
              candidate: null,
              source: "configuration",
              mediaType: "non_banner",
            });
            this.setIntextDisplayFloorConfig(floorKey, null);
            logIntext(
              `[Intext:Prebid:${this.node.id}] display_prebid_floor_cleared - no banner mediaType for ${floorKey}`,
            );
            return null;
          }

          const floorInfo = this.getIntextDisplayFloorInfo(floorKey);
          const floorValue = floorInfo.value;

          if (!(floorValue > 0)) {
            this.setIntextDisplayFloorConfig(floorKey, null);
            logIntext(
              `[Intext:Prebid:${this.node.id}] display_prebid_floor_missing - key=${floorKey}, floor cleared`,
            );
            return null;
          }

          this.setIntextDisplayFloorConfig(floorKey, floorValue);

          if (floorInfo.source === "initial") {
            logIntext(
              `[Intext:Prebid:${this.node.id}] display_prebid_floor_initial_applied - key=${floorKey}, gexp_floor=${floorValue}`,
            );
          } else {
            logIntext(
              `[Intext:Prebid:${this.node.id}] display_prebid_floor_applied - key=${floorKey}, gexp_floor=${floorValue}`,
            );
          }

          return floorValue;
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
          this._renderToken = node?._activeRenderToken || 0;
          this._adMediaEl = null;
          this._adMediaCleanup = null;
          this._adMediaDiscoveryTimers = [];
          this._lastAdDuration = null;
        }

        async render() {
          if (!this.node?.isActiveRenderToken?.(this._renderToken, "IntextVideoCreative.render:start", this._videoTiming?.trigger || "unknown")) {
            throw new Error("stale_render_token");
          }
          await this.ensureDependencies();
          if (!this.node?.isActiveRenderToken?.(this._renderToken, "IntextVideoCreative.render:after_dependencies", this._videoTiming?.trigger || "unknown")) {
            throw new Error("stale_render_token");
          }
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
            loader.style.background = "var(--gexp-intext-loader-overlay)";
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
            this.node?.setIntextPipPlaybackActive?.(false, "videojs-error");
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
            this.node?.setIntextPipPlaybackActive?.(false, "videojs-adend");
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

        findAdMediaElement() {
          const playerRoot = this.player?.el?.();
          if (!playerRoot) {
            logIntext(`[Intext:Video:IMA] ad_media_element_not_found - player root missing`);
            return null;
          }

          const selectors = [
            ".ima-ad-container video",
            ".vjs-ima-ad-container video",
            ".ima-video-container video",
            ".ima-html5-video-content video",
            "video",
          ];

          for (const selector of selectors) {
            const mediaEls = Array.from(playerRoot.querySelectorAll(selector));
            if (!mediaEls.length) continue;

            const realMediaEls = mediaEls.filter((el) => el && el !== this.videoEl);
            if (!realMediaEls.length) {
              logIntext(
                `[Intext:Video:IMA] ad_media_element_not_found - selector=${selector} matched only base/dummy player video`,
              );
              continue;
            }

            const preferred = realMediaEls[0];
            if (preferred) {
              logIntext(
                `[Intext:Video:IMA] ad_media_element_found - selector=${selector} currentTime=${preferred.currentTime || 0}`,
              );
              return preferred;
            }
          }

          logIntext(`[Intext:Video:IMA] ad_media_element_not_found - no internal video found`);
          return null;
        }

        cleanupAdMediaObservation() {
          if (this._adMediaDiscoveryTimers?.length) {
            this._adMediaDiscoveryTimers.forEach((timerId) => clearTimeout(timerId));
            this._adMediaDiscoveryTimers = [];
          }

          if (this._adMediaCleanup) {
            try {
              this._adMediaCleanup();
            } catch (e) {
              // ignore
            }
            this._adMediaCleanup = null;
          }

          this._adMediaEl = null;
        }

        isRenderTokenActive(source = "IntextVideoCreative") {
          return this.node?.isActiveRenderToken?.(
            this._renderToken,
            source,
            this._videoTiming?.trigger || "unknown",
          ) !== false;
        }

        requestAds() {
          return new Promise((resolve, reject) => {
            const debugVideo = (event, data = {}) => {
              if (typeof window === "undefined" || window.gexpIntextDebug !== true) return;
              intextDebugCollector.recordVideoEvent(event, this.node, {
                creative: this,
                trigger: this._videoTiming?.trigger || "unknown",
                ...data,
              });
            };
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
            let intextDebugFirstFrameLogged = false;
            let terminalEvent = null;
            let terminalHandled = false;
            let adTimeout = null;
            let adstartAt = null;
            let nativeAdError = null;
            let nativeStartedFallbackTimer = null;
            let mediaReadyConfirmTimer = null;
            let mediaTimeupdateLogged = false;
            let mediaElementFound = false;

            const clearAdTimeout = () => {
              if (!adTimeout) return;
              clearTimeout(adTimeout);
              adTimeout = null;
            };
            const clearNativeStartedFallbackTimer = () => {
              if (!nativeStartedFallbackTimer) return;
              clearTimeout(nativeStartedFallbackTimer);
              nativeStartedFallbackTimer = null;
            };
            const clearMediaReadyConfirmTimer = () => {
              if (!mediaReadyConfirmTimer) return;
              clearTimeout(mediaReadyConfirmTimer);
              mediaReadyConfirmTimer = null;
            };
            const settle = (type, value) => {
              if (settled) return;
              settled = true;
              clearAdTimeout();
              clearNativeStartedFallbackTimer();
              clearMediaReadyConfirmTimer();
              this.cleanupAdMediaObservation();
              if (type === "resolve") resolve(value);
              else reject(value);
            };
            const markTerminal = (source) => {
              if (terminalHandled) return false;
              terminalHandled = true;
              terminalEvent = source;
              clearAdTimeout();
              clearNativeStartedFallbackTimer();
              clearMediaReadyConfirmTimer();
              this.cleanupAdMediaObservation();
              return true;
            };
            this._settle = settle;

            adTimeout = setTimeout(() => {
              terminalHandled = true;
              terminalEvent = "video_ad_timeout";
              debugVideo("timeout", {
                imaErrorCode: "timeout",
                imaErrorMessage: "video_ad_timeout",
              });
              logIntext(
                `[Intext:Video:IMA] timeout_without_terminal_event - rejecting as video_ad_timeout`,
              );
              settle("reject", new Error("video_ad_timeout"));
            }, 25000);

            const revealPlayer = (source = "unknown") => {
              if (!this.isRenderTokenActive(`IntextVideoCreative.revealPlayer:${source}`)) return;
              if (terminalEvent || terminalHandled) {
                logIntext(
                  `[Intext:Video:IMA] reveal_blocked_by_terminal - source=${source} terminal=${terminalEvent || "unknown"}`,
                );
                return;
              }
              if (firstFramePlayed) return;
              markIntextDebugFirstFrame(source);
              firstFramePlayed = true;
              this._playerRevealed = true;
              if (adstartAt) {
                logIntext(
                  `[Intext:Video:${this.playerId}] timing adstart_to_reveal=${Date.now() - adstartAt}ms source=${source} trigger=${this._videoTiming?.trigger || "unknown"}`,
                );
              }
              if (source === "native_started") {
                logIntext(`[Intext:Video:IMA] reveal_from_native_started`);
              } else if (source === "media_playing") {
                logIntext(`[Intext:Video:IMA] reveal_from_media_playing`);
              } else if (source === "media_timeupdate") {
                logIntext(`[Intext:Video:IMA] reveal_from_media_timeupdate`);
              } else if (source === "media_loadeddata_confirmed") {
                logIntext(`[Intext:Video:IMA] reveal_from_media_loadeddata_confirmed`);
              } else {
                logIntext(`[Intext:Video:IMA] 🎬 Playback confirmado por ${source}. Mostrando player.`);
              }
              this.hideSpinner();
              const el = this.node.videoContainer.getElement();
              this.node.videoContainer.open(this.node.lockedHeight || this.node.getDisplayStandardContentHeight());
              if (el) {
                el.classList.add("video-started");
                el.style.opacity = "1";
              }
              debugVideo("revealed", {
                source,
                mediaElement: this._adMediaEl,
                element: el,
              });
              if (this.isRenderTokenActive(`IntextVideoCreative.revealed:${source}`)) {
                this.node._intextPipPlayerRevealed = true;
                this.node.maybeEnterIntextPipFromLastIntersection?.();
              }
              settle("resolve");
            };

            const rejectBeforePlayback = (error, terminalSource) => {
              if (!this.isRenderTokenActive(`IntextVideoCreative.rejectBeforePlayback:${terminalSource || "unknown"}`)) return;
              if (terminalSource && !markTerminal(terminalSource)) return;
              if (firstFramePlayed) return;
              settle("reject", error);
              setTimeout(() => {
                try { this.destroy(); } catch (e) { /* ignore */ }
              }, 50);
            };

            const isRevealBlocked = () =>
              firstFramePlayed || terminalEvent || terminalHandled || this._aborted || !this.player || !this.isRenderTokenActive("IntextVideoCreative.isRevealBlocked");

            const getMediaCurrentTime = () => {
              const mediaEl = this._adMediaEl;
              if (!mediaEl) return 0;
              const currentTime = Number(mediaEl.currentTime);
              return Number.isFinite(currentTime) ? currentTime : 0;
            };
            const markIntextDebugFirstFrame = (source) => {
              const currentTime = getMediaCurrentTime();
              if (intextDebugFirstFrameLogged || currentTime <= 0) return false;
              intextDebugFirstFrameLogged = true;
              debugVideo("first-frame", {
                source,
                currentTime,
                mediaElement: this._adMediaEl,
              });
              if (this.isRenderTokenActive(`IntextVideoCreative.firstFrame:${source}`)) {
                this.node._intextPipFirstFrameConfirmed = true;
                this.node.maybeEnterIntextPipFromLastIntersection?.();
              }
              return true;
            };

            const scheduleMediaReadyConfirmation = (source) => {
              clearMediaReadyConfirmTimer();
              const confirmPlayback = () => {
                if (isRevealBlocked()) return;
                if (getMediaCurrentTime() > 0) {
                  markIntextDebugFirstFrame("media_loadeddata_confirmed");
                  revealPlayer("media_loadeddata_confirmed");
                }
              };

              confirmPlayback();
              if (firstFramePlayed || terminalEvent) return;

              mediaReadyConfirmTimer = setTimeout(() => {
                mediaReadyConfirmTimer = null;
                if (source === "loadeddata") {
                  logIntext(`[Intext:Video:IMA] ad_media_loadeddata - deferred confirmation check`);
                } else {
                  logIntext(`[Intext:Video:IMA] ad_media_canplay - deferred confirmation check`);
                }
                confirmPlayback();
              }, 120);
            };

            const attachAdMediaListeners = (mediaEl) => {
              if (!mediaEl) return;
              if (this._adMediaEl === mediaEl && this._adMediaCleanup) return;

              this.cleanupAdMediaObservation();
              this._adMediaEl = mediaEl;
              mediaElementFound = true;

              const onLoadedData = () => {
                logIntext(`[Intext:Video:IMA] ad_media_loadeddata`);
                scheduleMediaReadyConfirmation("loadeddata");
              };
              const onCanPlay = () => {
                logIntext(`[Intext:Video:IMA] ad_media_canplay`);
                scheduleMediaReadyConfirmation("canplay");
              };
              const onPlaying = () => {
                logIntext(`[Intext:Video:IMA] ad_media_playing`);
                this.node?.setIntextPipPlaybackActive?.(true, "ima-media-playing");
                markIntextDebugFirstFrame("media_playing");
                revealPlayer("media_playing");
              };
              const onTimeUpdate = () => {
                if (getMediaCurrentTime() > 0) {
                  this.node?.setIntextPipPlaybackActive?.(true, "ima-media-timeupdate");
                  if (!mediaTimeupdateLogged) {
                    mediaTimeupdateLogged = true;
                    logIntext(`[Intext:Video:IMA] ad_media_timeupdate_started`);
                  }
                  markIntextDebugFirstFrame("media_timeupdate");
                  revealPlayer("media_timeupdate");
                }
              };
              const onError = () => {
                this.node?.setIntextPipPlaybackActive?.(false, "ima-media-error");
                logIntext(`[Intext:Video:IMA] ad_media_error`);
              };
              const onStalled = () => {
                logIntext(`[Intext:Video:IMA] ad_media_stalled`);
              };
              const onAbort = () => {
                logIntext(`[Intext:Video:IMA] ad_media_abort`);
              };

              mediaEl.addEventListener("loadeddata", onLoadedData);
              mediaEl.addEventListener("canplay", onCanPlay);
              mediaEl.addEventListener("playing", onPlaying);
              mediaEl.addEventListener("timeupdate", onTimeUpdate);
              mediaEl.addEventListener("error", onError);
              mediaEl.addEventListener("stalled", onStalled);
              mediaEl.addEventListener("abort", onAbort);

              this._adMediaCleanup = () => {
                mediaEl.removeEventListener("loadeddata", onLoadedData);
                mediaEl.removeEventListener("canplay", onCanPlay);
                mediaEl.removeEventListener("playing", onPlaying);
                mediaEl.removeEventListener("timeupdate", onTimeUpdate);
                mediaEl.removeEventListener("error", onError);
                mediaEl.removeEventListener("stalled", onStalled);
                mediaEl.removeEventListener("abort", onAbort);
              };

              if (getMediaCurrentTime() > 0) {
                if (!mediaTimeupdateLogged) {
                  mediaTimeupdateLogged = true;
                  logIntext(`[Intext:Video:IMA] ad_media_timeupdate_started`);
                }
                revealPlayer("media_timeupdate");
              }
            };

            const startAdMediaObservation = () => {
              if (this._adMediaEl || this._adMediaCleanup || this._adMediaDiscoveryTimers.length) return;

              [0, 60, 180, 400].forEach((delayMs) => {
                const timerId = setTimeout(() => {
                  this._adMediaDiscoveryTimers = this._adMediaDiscoveryTimers.filter(
                    (pendingTimerId) => pendingTimerId !== timerId,
                  );
                  if (isRevealBlocked()) return;
                  const mediaEl = this.findAdMediaElement();
                  if (mediaEl) {
                    attachAdMediaListeners(mediaEl);
                  }
                }, delayMs);
                this._adMediaDiscoveryTimers.push(timerId);
              });
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

            const resolveFastFallbackVideoErrorCodes = () => {
              const candidates = [
                { source: "node.config.video", video: this.node?.config?.video },
                { source: "manager.siteConfig.video", video: this.node?.manager?.siteConfig?.video },
                { source: "baseSiteConfig.video", video: this.node?.manager?.baseSiteConfig?.video },
              ];

              for (const candidate of candidates) {
                if (Array.isArray(candidate.video?.fastFallbackErrorCodes)) {
                  return {
                    codes: candidate.video.fastFallbackErrorCodes.map((code) => String(code)),
                    source: candidate.source,
                  };
                }
              }

              return { codes: [], source: "fallback" };
            };

            const isFastFallbackVideoError = (errCode) => {
              const { codes: configuredCodes } = resolveFastFallbackVideoErrorCodes();
              const normalizedCode = String(errCode || "");
              return configuredCodes.includes(normalizedCode);
            };

            const getFastFallbackVideoReason = (errCode) => {
              const normalizedCode = String(errCode || "");
              if (normalizedCode === "303") return "ima-303-empty-vast";
              if (normalizedCode === "1005") return "ima-1005-fast-fallback";
              return "configured-error";
            };

            const markFastFallbackVideoError = (errCode, errMsg, source) => {
              const normalizedCode = String(errCode || "");
              const beforePlayback = !firstFramePlayed;
              const fastFallbackConfig = resolveFastFallbackVideoErrorCodes();
              const enabled = isFastFallbackVideoError(normalizedCode);
              const reason = getFastFallbackVideoReason(normalizedCode);
              logIntext(`[Intext:Video:IMA] video_fast_fallback_config_source_resolved`, {
                slotCode: this.node?.id,
                source: fastFallbackConfig.source,
                codes: fastFallbackConfig.codes,
              });
              logIntext(`[Intext:Video:IMA] video_fast_fallback_error_detected`, {
                slotCode: this.node?.id,
                trigger: this._videoTiming?.trigger || "unknown",
                code: normalizedCode,
                message: errMsg,
                reason,
                source,
                beforePlayback,
                configured: enabled,
              });
              this.node?.mergeIntextTelemetry?.({
                "gexp-intext-video-error-code": normalizedCode,
                "gexp-intext-video-error-message": String(errMsg || "unknown"),
                "gexp-intext-video-fast-fallback": enabled && beforePlayback ? "true" : "false",
                "gexp-intext-video-fast-fallback-reason": enabled && beforePlayback ? reason : "not-applied",
                "gexp-intext-video-before-playback": beforePlayback ? "true" : "false",
                "gexp-intext-video-failed": "true",
              });
              if (!enabled || !beforePlayback) {
                logIntext(`[Intext:Video:IMA] video_fast_fallback_skipped`, {
                  slotCode: this.node?.id,
                  code: normalizedCode,
                  reason: enabled ? "after-playback" : "code-not-configured",
                  source,
                });
                return false;
              }
              logIntext(`[Intext:Video:IMA] video_fast_fallback_applied`, {
                slotCode: this.node?.id,
                trigger: this._videoTiming?.trigger || "unknown",
                code: normalizedCode,
                reason,
                source,
              });
              this.node?.flushIntextTelemetryToCI?.();
              return true;
            };

            this.player.on("readyforpreroll", () => {
              logIntext(`[Intext:Video:IMA] 🎯 readyforpreroll — anuncio preparado.`);
              logIntext(`[Intext:Video:IMA] readyforpreroll: anuncio preparado, contenedor oculto hasta playback real.`);
            });

            this.player.on("adstart", () => {
              debugVideo("player-adstart");
              logIntext(`[Intext:Video:IMA] ✅ adstart — Arrancando...`);
              adStarted = true;
              adstartAt = Date.now();
              this.node?.markIntextRealRenderTelemetry?.("video-adstart", this._videoTiming?.trigger || "unknown");
              if (this._videoTiming?.requestWinnerVideoAt) {
                logIntext(
                  `[Intext:Video:${this.playerId}] timing request_winner_video_to_adstart=${adstartAt - this._videoTiming.requestWinnerVideoAt}ms trigger=${this._videoTiming?.trigger || "unknown"}`,
                );
              }
              startAdMediaObservation();

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
                  startAdMediaObservation();
                }
              }, 800);
            });

            this.player.on("timeupdate", () => {
              if (adStarted && !firstFramePlayed && !terminalEvent && !this.spinnerHidden) {
                startAdMediaObservation();
              }
            });

            this.player.on("adserror", (evt) => {
              const imaErr = evt?.data?.AdError;
              const errCode = imaErr?.getErrorCode?.() || nativeAdError?.code || "unknown";
              const errMsg = imaErr?.getMessage?.() || nativeAdError?.message || "unknown";
              const normalizedErrCode = String(errCode || "unknown");

              debugVideo("error", {
                imaErrorCode: normalizedErrCode,
                imaErrorMessage: errMsg,
              });
              logIntext(`[Intext:Video:IMA] player_adserror - code: ${normalizedErrCode}, msg: ${errMsg}`);
              this.node?.cleanupIntextPip?.("video-error");

              if (!firstFramePlayed) {
                 markFastFallbackVideoError(normalizedErrCode, errMsg, "player_adserror");
                 rejectBeforePlayback(new Error(`video_ad_error: [${normalizedErrCode}] ${errMsg}`), "adserror");
              } else {
                markFastFallbackVideoError(normalizedErrCode, errMsg, "player_adserror");
                markTerminal("adserror");
              }

              if (this.node && this.node.wa && this.node.wa.cI) {
                  this.node.wa.cI["gexp-intext-video-error-code"] = normalizedErrCode;
                  this.node.wa.cI["gexp-intext-video-error-msg"] = errMsg;
                  this.node.wa.cI["gexp-intext-video-error-message"] = errMsg;
                  
                  // Track IDs if available even on error
                  const ad = imaErr?.getAd?.() || evt?.getAd?.() || this.player?.ima?.getAdsManager?.()?.getCurrentAd();
                  if (ad) {
                      this.node.wa.cI.campaignId = ad.getAdId();
                      this.node.wa.cI.advertiserId = ad.getAdvertiserName();
                  }

                  if (this.node.manager?.gexp) {
                      this.node.mergeIntextTelemetry({
                        "gexp-intext-video-failed": "true",
                        "gexp-intext-video-error-code": normalizedErrCode,
                        "gexp-intext-video-error-msg": errMsg,
                        "gexp-intext-video-error-message": errMsg,
                        "gexp-intext-video-before-playback": firstFramePlayed ? "false" : "true",
                        "gexp-intext-load-end-distance-px": this.node.getIntextDistancePx(),
                      });
                      this.node.flushIntextTelemetryToCI();
                      this.node.commitIntextTelemetry("video-error");
                  }
              }
            });

            this.player.on("ads-request", () => {
              logIntext(
                `[Intext:Video:IMA] 📤 ads-request — IMA processing ad request`,
              );
            });
            this.player.on("ads-load", (evt) => {
                debugVideo("player-ads-load", {
                  source: "player-ads-load",
                });
                debugVideo("vast-processed", {
                  inferred: true,
                  source: "player-ads-load",
                });
                logIntext(
                  `[Intext:Video:IMA] 📥 ads-load — VAST response parsed by IMA`,
                );
                const ad = evt?.data?.ad;
                if (ad && this.node && this.node.wa && this.node.wa.cI) {
                    try {
                      const adDuration = typeof ad.getDuration === "function" ? Number(ad.getDuration()) : null;
                      if (Number.isFinite(adDuration) && adDuration > 0) {
                        this._lastAdDuration = adDuration;
                        this.node._lastImaAdDuration = adDuration;
                      }
                    } catch (e) {}
                    this.node.wa.cI.campaignId = ad.getAdId();
                    this.node.wa.cI.advertiserId = ad.getAdvertiserName();
                    
                    // Video Type Telemetry
                    const gexp = this.node.manager?.gexp;
                    const rawType = typeof ad.getLineItemType === "function" ? ad.getLineItemType() : null;
                    let type = rawType ? rawType.toLowerCase() : "adserver";
                    
                    const tIds = this.node.config?.telemetryIds || {};
                    const adexIds = tIds.adex || [];

                    if (type === "ad_exchange" || adexIds.includes(ad.getAdId()) || gexp?.isAdex(ad.getAdId(), null, null)) {
                        type = "adex";
                    } else if (type === "price_priority") {
                        // Correlation only if GAM confirms it's a price priority line
                        if (this._lastVideoBid && this._lastVideoBid.source === "prebid") type = "prebid";
                        else if (this._lastVideoBid && this._lastVideoBid.source === "amazon") type = "amazon";
                    } else if (gexp?.isHouse(null, null, ad.getAdvertiserName())) {
                        type = "house";
                    }

                    this.node.wa.cI["gexp-intext-type"] = type;
                    logIntext(`[Intext:Video:IMA] Video ad loaded: ${ad.getAdvertiserName()} (${ad.getAdId()}) type: ${type}`);
                    
                    // Explicitly register again to ensure statsG has the post-load metadata
                    if (this.node.manager?.gexp) {
                        this.node.flushIntextTelemetryToCI();
                        logIntext(`[Intext:Video:${this.node.id}] 📤 Post-load video telemetry updated`);
                    }
                }
            });
            this.player.on("nopreroll", () => {
              logIntext(
                `[Intext:Video:IMA] 📭 nopreroll — IMA says no preroll available`,
              );
            });
            this.player.on("adtimeout", () => {
              debugVideo("timeout", {
                imaErrorCode: "timeout",
                imaErrorMessage: "contrib_ads_timeout",
              });
              logIntext(
                `[Intext:Video:IMA] ⏱ adtimeout — contrib-ads internal timeout`,
              );
              this.node?.mergeIntextTelemetry?.({
                "gexp-intext-video-failed": "true",
                "gexp-intext-video-error-code": "timeout",
                "gexp-intext-video-error-message": "video_ad_timeout",
              });
              this.node?.flushIntextTelemetryToCI?.();
              rejectBeforePlayback(new Error("contrib_ads_timeout"), "adtimeout");
            });
            this.player.on("adend", () => {
              debugVideo("complete");
              handleTerminalBeforeReveal(
                "adend",
                new Error("video_ad_ended_before_reveal"),
              );
            });
            this.player.on("alladscompleted", () => {
              debugVideo("all-ads-completed");
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
                        const errCode = err?.getErrorCode?.() || "unknown";
                        const errMsg = err?.getMessage?.() || "unknown";
                        nativeAdError = {
                          code: errCode,
                          message: errMsg,
                          vastCode: err?.getVastErrorCode?.(),
                        };
                        debugVideo("error", {
                          imaErrorCode: errCode,
                          imaErrorMessage: errMsg,
                        });
                        logIntext(
                          `[Intext:Video:IMA:Native] native_ad_error - code=${errCode}, msg=${errMsg}, vast=${err?.getVastErrorCode?.()}`,
                        );
                        this.node?.cleanupIntextPip?.("video-error");
                        if (!firstFramePlayed) {
                          markFastFallbackVideoError(errCode, errMsg, "native_ad_error");
                          rejectBeforePlayback(
                            new Error(`video_ad_error: [${errCode}] ${errMsg}`),
                            "native_ad_error",
                          );
                        } else {
                          markFastFallbackVideoError(errCode, errMsg, "native_ad_error");
                          markTerminal("native_ad_error");
                        }
                      },
                    );
                    this.player.ima.addEventListener(
                      ima.AdEvent.Type.LOADED,
                      () => {
                        debugVideo("loaded", {
                          source: "native-ima-loaded",
                        });
                        logIntext(
                          `[Intext:Video:IMA:Native] 📥 LOADED event fired`,
                        );
                      },
                    );
                    this.player.ima.addEventListener(
                      ima.AdEvent.Type.STARTED,
                      () => {
                        debugVideo("started", {
                          source: "native-ima-started",
                        });
                        logIntext(
                          `[Intext:Video:IMA:Native] native started - STARTED event fired`,
                        );
                        startAdMediaObservation();
                        clearNativeStartedFallbackTimer();
                        nativeStartedFallbackTimer = setTimeout(() => {
                          nativeStartedFallbackTimer = null;
                          if (isRevealBlocked()) return;
                          if (mediaElementFound) return;
                          revealPlayer("native_started");
                        }, 500);
                      },
                    );
                    this.player.ima.addEventListener(
                      ima.AdEvent.Type.COMPLETE,
                      () => {
                        this.node?.setIntextPipPlaybackActive?.(false, "ima-complete");
                        debugVideo("complete");
                        handleTerminalBeforeReveal(
                          "native_complete",
                          new Error("video_ad_ended_before_reveal"),
                        );
                      },
                    );
                    this.player.ima.addEventListener(
                      ima.AdEvent.Type.SKIPPED,
                      () => {
                        this.node?.setIntextPipPlaybackActive?.(false, "ima-skipped");
                        debugVideo("skipped");
                        handleTerminalBeforeReveal(
                          "native_skipped",
                          new Error("video_ad_ended_before_reveal"),
                        );
                      },
                    );
                    [
                      [ima.AdEvent.Type.FIRST_QUARTILE, "first-quartile"],
                      [ima.AdEvent.Type.MIDPOINT, "midpoint"],
                      [ima.AdEvent.Type.THIRD_QUARTILE, "third-quartile"],
                      [ima.AdEvent.Type.PAUSED, "paused"],
                      [ima.AdEvent.Type.RESUMED, "resumed"],
                      [ima.AdEvent.Type.CLICK, "click"],
                      [ima.AdEvent.Type.ALL_ADS_COMPLETED, "all-ads-completed"],
                      [ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, "content-pause-requested"],
                      [ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, "content-resume-requested"],
                    ].forEach(([eventType, debugEvent]) => {
                      if (!eventType) return;
                      this.player.ima.addEventListener(eventType, () => {
                        if (debugEvent === "paused") {
                          this.node?.setIntextPipPlaybackActive?.(false, "ima-paused");
                        } else if (debugEvent === "resumed") {
                          this.node?.setIntextPipPlaybackActive?.(true, "ima-resumed");
                        }
                        debugVideo(debugEvent);
                      });
                    });
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
          this.cleanupAdMediaObservation();
          logIntext(
            `[Intext:Video:IMA] 🛑 abort() — display won, cancelling video path`,
          );
          this._settle?.("reject", new Error("display_won_abort"));
        }

        destroy() {
          this.cleanupAdMediaObservation();
          try {
            this.player?.dispose?.();
          } catch (err) {
            // ignore
          }
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
        if(baseNumber===null || baseId===null)
        {
            baseNumber=Math.floor(Math.random()*1000);
            if(typeof window.crypto!=="undefined" && typeof window.crypto.randomUUID!=="undefined")
                baseId=window.crypto.randomUUID();
            else
                baseId="0";
            localStorage.setItem('telP', baseNumber);
            localStorage.setItem('telPId', baseId);
        }
        this.scrollData={};
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
                this.rows[k]["scroll"]=this.scrollData;
                this.rows[k].gexp_enabled=this.gexp.enabled;
                this.rows[k].gexp_error=this.gexp.error;
                this.rows[k].gexp_errored=this.gexp.errored;
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

        // =============================================
        // Variables principales
        // =============================================
        const startTime = Date.now();

        let maxScrollDepthPx = 0;
        let lastScrollY = 0;
        let totalPixelsScrolled = 0;

        let sampleCounter = 0;
        let scrollBehaviour = "";
        let currentIntervalPixels = 0;

        // Nuevas métricas solicitadas
        let maxScrollPercentage = 0;
        const timeToScroll = { 25: null, 50: null, 75: null, 90: null };

        const INTERVAL_SAMPLES = 4;        // 4 × 500ms = 2 segundos
        const PIXELS_PER_UNIT = 100;
        const MAX_SAMPLES=40;
        let nSamples=0;

        // Inicializar sessionStorage
        this.scrollData["maxScrollDepth"]= 0;
        this.scrollData["maxScrollPercentage"]= 0;
        this.scrollData["scrollVelocity"]= 0;
        this.scrollData["totalPixelsScrolled"]= 0;
        this.scrollData["scrollBehaviour"]= "";
        this.scrollData["timeToScroll"]= timeToScroll;   // objeto con tiempos en segundos

        let scTimeout = null;

        // =============================================
        // Función para calcular porcentaje de scroll actual
        // =============================================
        const getScrollPercentage = (scrollY) => {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollableHeight <= 0) return 0;
            return Math.min(Math.round((scrollY / scrollableHeight) * 100), 100);
        };

        // =============================================
        // Inicialización inmediata (scroll inicial)
        // =============================================

        const initialY = window.scrollY ??
            window.pageYOffset ??
            document.documentElement.scrollTop ??
            document.body.scrollTop ?? 0;
        this.scrollData["initialY"]=initialY;
        if (initialY < 1000) {
            totalPixelsScrolled += initialY;
            currentIntervalPixels += initialY;
            maxScrollDepthPx = initialY;

            const perc = getScrollPercentage(initialY);
            maxScrollPercentage = perc;

            // Registrar como scroll inicial hacia abajo
            scrollBehaviour += "D" + Math.round(initialY / PIXELS_PER_UNIT);
            this.scrollData["scrollBehaviour"]= scrollBehaviour;

            // Registrar tiempos de umbrales si ya los supera al cargar
            const nowSec = 0; // justo al inicio
            if (perc >= 25 && timeToScroll[25] === null) timeToScroll[25] = nowSec;
            if (perc >= 50 && timeToScroll[50] === null) timeToScroll[50] = nowSec;
            if (perc >= 75 && timeToScroll[75] === null) timeToScroll[75] = nowSec;
            if (perc >= 90 && timeToScroll[90] === null) timeToScroll[90] = nowSec;
        }

        lastScrollY = initialY;
        this.scrollData["maxScrollDepth"]=Math.round(maxScrollDepthPx);
        this.scrollData["maxScrollPercentage"]= maxScrollPercentage;
        this.scrollData["timeToScroll"]= timeToScroll;

        let currentY=initialY;

        // =============================================
        // Función principal (ejecutada cada ~500ms)
        // =============================================
        const scTimeoutFunc = () => {

            currentY = window.scrollY ??
                window.pageYOffset ??
                document.documentElement.scrollTop ??
                document.body.scrollTop ?? 0;


            const diff = Math.abs(currentY - lastScrollY);
            if (diff > 5) {
                totalPixelsScrolled += diff;
                currentIntervalPixels += diff;
            }

            maxScrollDepthPx = Math.max(maxScrollDepthPx, currentY);

            // Calcular porcentaje actual
            const currentPercentage = getScrollPercentage(currentY);
            maxScrollPercentage = Math.max(maxScrollPercentage, currentPercentage);

            // Registrar tiempo para cada umbral (solo la primera vez)
            const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
            if (currentPercentage >= 25 && timeToScroll[25] === null) timeToScroll[25] = elapsedSeconds;
            if (currentPercentage >= 50 && timeToScroll[50] === null) timeToScroll[50] = elapsedSeconds;
            if (currentPercentage >= 75 && timeToScroll[75] === null) timeToScroll[75] = elapsedSeconds;
            if (currentPercentage >= 90 && timeToScroll[90] === null) timeToScroll[90] = elapsedSeconds;

            // Velocidad media (px/s desde el inicio)
            const totalElapsedSec = (Date.now() - startTime) / 1000 || 0.001;
            const scrollVelocity = Math.round(totalPixelsScrolled / totalElapsedSec);

            // Actualizar storage
            this.scrollData["maxScrollDepth"]=Math.round(maxScrollDepthPx);
            this.scrollData["maxScrollPercentage"]= maxScrollPercentage;
            this.scrollData["scrollVelocity"]=scrollVelocity;
            this.scrollData["totalPixelsScrolled"]=Math.round(totalPixelsScrolled);
            this.scrollData["lastScrollY"]=Math.round(currentY);
            this.scrollData["timeToScroll"]= { ...timeToScroll }; // copia para guardar correctamente

            // =============================================
            // Scroll Behaviour cada 2 segundos
            // =============================================
            sampleCounter++;

            if (sampleCounter >= INTERVAL_SAMPLES && nSamples < MAX_SAMPLES) {
                nSamples++;
                let code = "-";
                if (currentIntervalPixels > 15) {

                    const units = Math.ceil(currentIntervalPixels / PIXELS_PER_UNIT);
                    const direction = (currentY > lastScrollY) ? "D" : "U";

                    code = direction + units;
                }


                scrollBehaviour += code;
                this.scrollData["scrollBehaviour"]= scrollBehaviour;

                currentIntervalPixels = 0;
                sampleCounter = 0;
            }
            lastScrollY = currentY;


        };

        scTimeoutFunc();
        setInterval(scTimeoutFunc,500);

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
            page_fetchStart: relativeTime("fetchStart"),
            page_requestStart: relativeTime("requestStart"),
            page_responseStart: relativeTime("responseStart"),
            page_responseEnd: relativeTime("responseEnd"),
            page_domInteractive: relativeTime("domInteractive"),
            page_domContentLoadedEventStart: relativeTime("domContentLoadedEventStart"),
            page_domContentLoadedEventEnd: relativeTime("domContentLoadedEventEnd"),
            page_domComplete: relativeTime("domComplete"),
            page_loadEventStart: relativeTime("loadEventStart"),
            page_loadEventEnd: relativeTime("loadEventEnd"),
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
            this.errored=false;
            this.isNew = false;
            this.country = 'ES';
            this.houseAdexRatio = -1;

            this.initialized = false;
            this.enabled = false;
            this.paywallShown = false;
            this.signWallShown = false;

            this.loadConfig().then(() => {
                this.initialize();
                this.intextManager = new IntextManager(this.cfg, this);
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
            if(this.cfg.name)
                this.statsG.addRequiredVariable("gam_cfg",this.cfg.name)

            if(this.cfg.gexp_cfg_country)
                this.statsG.addRequiredVariable("gam_cfg_country",this.cfg.gexp_cfg_country)

            googletag.cmd.push(()=>{
                googletag.pubads().addEventListener("impressionViewable",(event)=>{this.onSlotViewable(event.slot);});
                googletag.pubads().addEventListener("slotVisibilityChanged",(event)=>{this.onSlotVisibilityChanged(event);});
                googletag.pubads().addEventListener("slotOnload",(event)=>{this.onSlotLoaded(event.slot);});
                googletag.pubads().addEventListener("slotResponseReceived",(event)=>{this.response(event)})
                googletag.pubads().addEventListener("slotRequested",(event)=>{this.onSlotRequested(event.slot)});
                googletag.pubads().addEventListener("slotRenderEnded",(event)=>{this.onSlotRenderEnded(event.slot)});

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
    onSlotRenderEnded(slot)
    {
        try {
            let w = this.getWindowFromSlot(slot)
            w.onRendered();
        }catch(e)
        {
            this.reportError(e);
        }
    }

    onSlotRequested(slot){
        try {
            let w = this.getWindowFromSlot(slot)
            w.onRequested();
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
        if(typeof slot==="undefined")
        {
            try {
                for (var k in this.windows) {

                    let w = this.windows[k];
                    w.setTargetings();
                }
                this.save();
            }catch(error)
            {
                slot.setTargeting("gexp_error","true");
                this.reportError(error);
            }
        }

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
            slot.setTargeting("gexp_error","true");
            this.reportError(error);

        }
    }

    response(event) {
        if (this.enabled == false)
            return;
        try{
            const slot = event.slot;
            let c = this.getWindowFromSlot(slot);
            c.response(event);
            this.save();
        } catch (e) {
            this.reportError(e);
        }
    }
    reportError(exception)
    {
        this.error=exception.stack.toString();
        this.errored=true;
        this.enabled = false;
        this.info = this.init;
        this.save();
        if(this.statsG) {
            this.statsG.sendData();
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
        if(this.cfg?.ext?.sites?.pp2)
        {
            return this.cfg?.ext?.sites?.pp2?.[adunit]?.[this.country]?.[position] ?? null;
        }

        let idx = this.getIndexFromOffY(offY);
        if (position == "m") {
            idx = 1;
        } else if (position && (position[0] == "r" || position[0] == "s")) {
            position = position[0];
        }

        let node = this.cfg?.ext?.sites?.p1?.[adunit]?.[this.country]?.[position] ?? null;
        if (node === null && position !== "rb") {
            position = "rb";
            node = this.cfg?.ext?.sites?.p1?.[adunit]?.[this.country]?.[position] ?? null;
        }

        // New format: direct price index by position (offY-independent)
        if (typeof node === "number") {
            return node;
        }

        // Legacy format: object with i0..i3 buckets.
        if (node && typeof node === "object") {
            return node["i" + idx] ?? node["i1"] ?? null;
        }

        return null;
    }
    /*getPriceProbability(adunit, priceIdx,position, offY)
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
        let pNode=this.cfg?.ext?.sites?.pp1?.[adunit]?.[this.country]?.[position] ?? null;
        if (typeof pNode === "number") {
            // Position-only p1-like value has no probability distribution.
            return -1;
        }
        let t1=pNode?.["i"+idx]?.["p"+priceIdx] ?? pNode?.["i1"]?.["p"+priceIdx] ?? -1;
        if(t1!=-1)
            return t1;
        return this.cfg?.ext?.sites?.pp1?.[adunit]?.[this.country]?.['r']?.["i"+idx]?.["p"+priceIdx] ?? -1;

    }*/
    getExpectedViewability(adunit,offY,gr,ar)
    {
        if(!this.enabled) return -1;
        if(typeof ueDataLayer==="undefined")
            return -1;
        let type = ueDataLayer?.be_page_content_type ?? "-1";
        let idx=this.getVIndexFromOffY(offY);
        return this.cfg?.ext?.sites?.vv?.[adunit]?.[type]?.[idx]?.[gr]?.[ar] ?? -1;
    }
    findGPTSlotByDivId(divId) {
        if (typeof googletag === 'undefined' || !googletag.apiReady) {
            console.warn('Google Publisher Tag no está cargado o no está listo.');
            return null;
        }

        // Obtenemos todos los slots definidos
        const slots = googletag.pubads().getSlots();

        // Buscamos el slot cuyo div ID coincida
        for (const slot of slots) {
            if (slot.getSlotElementId() === divId) {
                return slot;
            }
        }

        console.warn(`No se encontró ningún slot para el div ID: ${divId}`);
        return null;
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
    version="0.0156";
    info = this.init;
}


let _gam_exp = new GAMExp();

const _gam_kv_ = function(s) {
    _gam_exp.request(s);
}

window._gam_kv_ = _gam_kv_;

