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
          this.baseSiteConfig = this.siteConfig ? JSON.parse(JSON.stringify(this.siteConfig)) : null;
          this.intextQaCookieOverride = this.readIntextQaCookieOverride();
          this._intextQaCookieApplied = false;
          this._intextQaCookieExclusionsBypassed = false;
          this._intextQaCookieExclusionsBypassSource = "none";
          this.adUnitPath = this.extractStaticAdUnitPath();
          this.networkId = this.config?.networkId || "99071977";
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

                if (this.intextQaCookieOverride?.enabled && !filter.allowedDomains.some(domain => currentDomain.includes(domain))) {
                    this.markIntextQaCookieApplied();
                    logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
                      key: "domainFilter.allowedDomains",
                      forcedValue: "qa-cookie",
                      originalValue: currentDomain || "unknown",
                    });
                } else if (!filter.allowedDomains.some(domain => currentDomain.includes(domain))) {
                    logIntext(`🛑 [IntextManager] Ejecución bloqueada. Dominio '${currentDomain}' no permitido.`);                   
                    return;
                }
            }
          }

          if (this.siteConfig?.debug === true) {
            window.gexpIntextDebug = true;
          }

          if (!this.gexp.isEnabled()) {
            if (this.intextQaCookieOverride?.enabled) {
              this.markIntextQaCookieApplied();
              logIntext(`[IntextManager] intext_qa_cookie_force_allow_applied`, {
                key: "gexp.isEnabled",
                forcedValue: "qa-cookie",
                originalValue: "false",
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
              this.markIntextQaExclusionsBypassApplied("constructor");
              logIntext(`[IntextManager] intext_qa_cookie_exclusions_bypass_applied`, {
                key: "exclusions.disableAll",
                source: "constructor",
              });
            } else {
              logIntext(`[IntextManager] ❌ BLOCKED by exclusions.disableAll = true`);
              return;
            }
          }
          const launchIntextPositions = () => {
            googletag.cmd.push(() => {
              this.resolveAdUnit();
              this.siteContext.contentType = this.detectContentType();
              logIntext(`[IntextManager] Detected content type: "${this.siteContext.contentType}"`);

              this.siteConfig = this.resolveContentTypeProfile(this.siteConfig, this.siteContext.contentType);
              if (!this.isContentTypeAllowed(this.siteConfig, this.siteContext.contentType, "[IntextManager]")) {
                return;
              }
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
            random1: "none",
            random1Value: null,
            defaultForced: false,
            invalidValue: null,
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

            const forceValue = String(cookies.gexp_intext_force || "").trim().toLowerCase();
            const enabled = ["1", "true", "yes"].includes(forceValue);
            if (!enabled) return disabled;

            const rawRandom1 = cookies.gexp_intext_force_random1;
            const normalizedRandom1 = rawRandom1 === undefined || rawRandom1 === null
              ? "none"
              : String(rawRandom1).trim().toLowerCase();
            const override = {
              enabled: true,
              random1: "none",
              random1Value: null,
              defaultForced: false,
              invalidValue: null,
              forceExclusions: false,
              forceExclusionsRawValue: null,
            };

            const rawForceExclusions = cookies.gexp_intext_force_exclusions;
            const normalizedForceExclusions = rawForceExclusions === undefined || rawForceExclusions === null
              ? ""
              : String(rawForceExclusions).trim().toLowerCase();
            override.forceExclusionsRawValue = normalizedForceExclusions || null;
            override.forceExclusions = ["1", "true", "yes"].includes(normalizedForceExclusions);

            if (normalizedRandom1 === "5" || normalizedRandom1 === "6") {
              override.random1 = normalizedRandom1;
              override.random1Value = normalizedRandom1;
            } else if (normalizedRandom1 === "default") {
              override.random1 = "default";
              override.defaultForced = true;
            } else if (normalizedRandom1 !== "none" && normalizedRandom1 !== "") {
              override.random1 = "invalid";
              override.invalidValue = normalizedRandom1;
              logIntext(`[IntextManager] intext_qa_cookie_override_invalid`, {
                key: "gexp_intext_force_random1",
                value: normalizedRandom1,
              });
            }

            logIntext(`[IntextManager] intext_qa_cookie_override_detected`, {
              enabled: true,
              random1: override.random1,
              forceExclusions: override.forceExclusions,
            });
            if (override.forceExclusions) {
              logIntext(`[IntextManager] intext_qa_cookie_exclusions_bypass_detected`, {
                key: "gexp_intext_force_exclusions",
                value: override.forceExclusionsRawValue,
              });
            }
            return override;
          } catch (e) {
            return disabled;
          }
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
          this._intextQaCookieExclusionsBypassSource = source;
        }

        getIntextQaCookieTelemetry(applied = this._intextQaCookieApplied) {
          const override = this.intextQaCookieOverride || {};
          return {
            "gexp-intext-qa-cookie-enabled": override.enabled ? "true" : "false",
            "gexp-intext-qa-cookie-random1": String(override.random1 || "none"),
            "gexp-intext-qa-cookie-applied": applied ? "true" : "false",
            "gexp-intext-qa-cookie-force-exclusions": override.forceExclusions ? "true" : "false",
            "gexp-intext-qa-cookie-exclusions-bypassed": this._intextQaCookieExclusionsBypassed ? "true" : "false",
            "gexp-intext-qa-cookie-exclusions-bypass-source": String(this._intextQaCookieExclusionsBypassSource || "none"),
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
          const override = this.intextQaCookieOverride;
          if (String(key || "") !== "random1" || !override?.enabled) {
            return {
              ...original,
              originalValue: original.value,
              qaCookieApplied: false,
              qaCookieDefault: false,
            };
          }

          if (override.random1Value === "5" || override.random1Value === "6") {
            return {
              value: override.random1Value,
              source: "qa-cookie",
              originalValue: original.value,
              originalSource: original.source,
              qaCookieApplied: true,
              qaCookieDefault: false,
            };
          }

          if (override.defaultForced) {
            return {
              value: original.value,
              source: "qa-cookie-default",
              originalValue: original.value,
              originalSource: original.source,
              qaCookieApplied: true,
              qaCookieDefault: true,
            };
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

          if (!qaCookieLoadingDefault && qaCookieLoadingApplied && key === "random1" && keyValue === "5") {
            variantName = "test-b";
          } else if (!qaCookieLoadingDefault && qaCookieLoadingApplied && key === "random1" && keyValue === "6") {
            variantName = "control";
          }
          if (qaCookieLoadingApplied && !qaCookieLoadingDefault) {
            this.markIntextQaCookieApplied();
            logIntext(`[IntextManager] intext_qa_cookie_loading_variant_forced`, {
              slotCode: slotId,
              key,
              forcedValue: keyValue,
              originalValue: keyResolution.originalValue,
              variant: variantName,
            });
          }

          if (!experiments) {
            fallbackReason = "experiments-not-found";
          } else if (qaCookieLoadingDefault) {
            fallbackReason = "qa-cookie-default";
            this.markIntextQaCookieApplied();
            logIntext(`[IntextManager] intext_qa_cookie_loading_default_forced`, {
              slotCode: slotId,
              key,
              originalValue: keyResolution.originalValue,
              keySource,
            });
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

          let networkId = this.networkId;
          let adUnitPath = this.adUnitPath;
          if (referenceSlot?.getAdUnitPath) {
            const fullPath = referenceSlot.getAdUnitPath();
            const parts = String(fullPath || "").replace(/^\//, "").split("/");
            if (parts.length >= 2) {
              networkId = parts[0] || networkId;
              adUnitPath = parts.slice(1).join("/").replace(/\bp_/g, "") || adUnitPath;
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
            networkId,
            adUnitPath,
            targeting: { ...(slotTargeting || {}), ...(pageTargeting || {}) },
            contentType,
            pageUrl,
            hostname,
          };

          logIntext(
            `[IntextManager:NavContinua] navcontinua_scoped_context_resolved - slots=${scopedSlots.length}, hostname=${hostname}, contentType=${contentType}, pageUrl=${pageUrl}`,
            scopedContext,
          );
          logIntext(
            `[IntextManager:NavContinua] navcontinua_scoped_adunit_resolved - networkId=${networkId}, adUnitPath=${adUnitPath || "missing"}, source_slot=${referenceSlot?.getSlotElementId?.() || "fallback"}`,
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
          const hostname = this.getHostnameNormalized(context?.hostname || this.siteContext?.site);
          if (this.isIntextQaExclusionsBypassEnabled()) {
            this.markIntextQaExclusionsBypassApplied(context?.navIndex !== undefined && context?.navIndex !== null ? "navcontinua" : "isBlockedByExclusions");
            logIntext(`[IntextManager] intext_qa_cookie_exclusions_bypass_applied`, {
              hostname,
              contentType: context?.contentType || this.siteContext?.contentType,
              navIndex: context?.navIndex,
              source: "isBlockedByExclusions",
            });
            return false;
          }
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

        isAllowedByInclusions(context = null) {
          const hostname = this.getHostnameNormalized(context?.hostname || this.siteContext?.site);
          const inc = this.resolveScopedRuleBlock(
            context?.siteConfig?.inclusions || this.siteConfig?.inclusions,
            hostname,
          );
          if (!inc) return true;

          if (inc.keyValues && typeof inc.keyValues === 'object' && Object.keys(inc.keyValues).length > 0) {
            const pageTargeting = this.getPageCustomTargeting(context) || {};
            if (pageTargeting) {
              for (const [key, allowedValues] of Object.entries(inc.keyValues)) {
                if (!Array.isArray(allowedValues) || allowedValues.length === 0) continue;
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
                const rawPageValue = pageTargeting[key];
                const effectiveValue = effectiveResolution.qaCookieApplied === true
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
          if (typeof context === "string") {
            const key = context;
            const targeting = this.getPageCustomTargeting(null);
            if (!targeting || typeof targeting !== "object") return null;
            return targeting[key];
          }
          if (context?.targeting && typeof context.targeting === "object") {
            return context.targeting;
          }
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
        
        isSlotDisabledByExclusion(index, context = null) {
          if (this.isIntextQaExclusionsBypassEnabled()) {
            this.markIntextQaExclusionsBypassApplied(context?.navIndex !== undefined && context?.navIndex !== null ? "navcontinua" : "isSlotDisabledByExclusion");
            logIntext(`[IntextManager] intext_qa_cookie_slot_exclusion_bypass_applied`, {
              slotIndex: index,
              navIndex: context?.navIndex,
              source: "isSlotDisabledByExclusion",
            });
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
          } catch (err) {
            if (this.gexp.statsG)
              this.gexp.statsG.addRequiredVariable("intext_err", err.message);
            console.error("[IntextManager] Failed to create positions", err);
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

          const scopedContext = this.resolveScopedAdContext(mainElement);
          const contentType = scopedContext.contentType || this.detectContentType(mainElement);
          logIntext(`[IntextManager:NavContinua] navIndex=${navIndex}: content type = "${contentType}"`);

          let scrollConfig = IntextManager.deepMerge({...this.siteConfig}, {});
          const ctProfile = this.siteConfig?.contentTypes?.[contentType];
          if (ctProfile) {
            scrollConfig = IntextManager.deepMerge(scrollConfig, ctProfile);
          }
          if (isConfig.overrides) {
            scrollConfig = IntextManager.deepMerge(scrollConfig, isConfig.overrides);
          }
          if (!this.isContentTypeAllowed(scrollConfig, contentType, "[IntextManager:NavContinua]")) {
            return;
          }

          const scopedRuleContext = {
            ...scopedContext,
            contentType,
            navIndex,
            siteConfig: scrollConfig,
          };

          if (this.isBlockedByExclusions(scopedRuleContext)) {
            logIntext(
              `[IntextManager:NavContinua] navcontinua_exclusions_blocked - navIndex=${navIndex}, adUnitPath=${scopedRuleContext.adUnitPath || "missing"}`,
            );
            return;
          }

          if (!this.isAllowedByInclusions(scopedRuleContext)) {
            logIntext(`[IntextManager:NavContinua] navcontinua_inclusions_allowed - navIndex=${navIndex}, allowed=false`);
            return;
          }

          logIntext(`[IntextManager:NavContinua] navcontinua_inclusions_allowed - navIndex=${navIndex}, allowed=true`);

          const pncSuffix = navIndex >= 1 ? `-pnc-${navIndex}` : '';

          this.createIntextPositionsScoped(mainElement, scrollConfig, pncSuffix, navIndex, scopedRuleContext);
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
        }

        getIntextNodeId() {
          return String(this.id || this.videoId || "unknown");
        }

        getIntextPlacementIndex() {
          return this.placement?.placementIndex != null
            ? this.placement.placementIndex
            : this.slotIndex;
        }

        beginVisualRender(source = "unknown", trigger = "unknown") {
          this._renderTokenSeq += 1;
          this._activeRenderToken = this._renderTokenSeq;
          this._renderInProgress = true;
          this._renderCompleted = false;
          this._displayRequestInFlight = false;
          this._lastVisualCycleId = this._intextTelemetryCycleId;
          this._visualState = source;
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
        }

        isActiveRenderToken(renderToken, source = "unknown", trigger = "unknown") {
          if (!renderToken || renderToken !== this._activeRenderToken) {
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
              this.waterfall._displayRenderState?.isFallback === true ||
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

        clearIntextTelemetryCycleCI() {
          if (!this.wa?.cI) return;
          [
            "gexp-intext-init-page-ms",
            "gexp-intext-load-start-distance-px",
            "gexp-intext-load-end-distance-px",
            "gexp-intext-load-observer-target",
            "gexp-intext-request-type",
            "gexp-intext-type",
            "gexp-intext-creative-size",
            "gexp-intext-video-viewport-exit-played-pct",
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
            "gexp-intext-qa-cookie-force-exclusions",
            "gexp-intext-qa-cookie-exclusions-bypassed",
            "gexp-intext-qa-cookie-exclusions-bypass-source",
            "gexp-intext-fetch-root-margin",
            "gexp-intext-render-root-margin",
            "gexp-intext-max-delay-ms",
            "gexp-intext-max-fetch-to-render-ms",
            "gexp-intext-fetch-trigger",
            "gexp-intext-render-trigger",
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
          this._pendingIntextTelemetry = {};
          this._intextViewportEnterAt = null;
          this._intextViewportVisibleMs = 0;
          this._intextTelemetryCommittedForCycle = false;
          this._intextTelemetryCommittedReasons = {};
          this._intextTelemetryFinalCommitted = false;
          this._house1x1AutoRefreshAttemptsForCycle = 0;
          this.clearIntextTelemetryCycleCI();

          const cycle = {
            "gexp-intext-cycle-id": String(this._intextTelemetryCycleId),
            "gexp-intext-load-trigger": String(trigger || "unknown"),
            "gexp-intext-is-refresh": trigger === "refresh" ? "true" : "false",
            "gexp-intext-is-fallback": trigger === "fallback" ? "true" : "false",
            "gexp-intext-ever-in-viewport": "false",
            "gexp-intext-viewport-visible-ms": "0",
            "gexp-intext-render-waited-for-fetch": "false",
            "gexp-intext-render-wait-for-fetch-ms": "0",
            "gexp-intext-pending-auction-used": "false",
            "gexp-intext-pending-auction-expired": "false",
            "gexp-intext-pending-auction-age-ms": "0",
            "gexp-intext-pending-auction-restarted": "false",
            "gexp-intext-render-token": String(this._activeRenderToken || 0),
            "gexp-intext-render-attempt": String(this._renderTokenSeq || 0),
            "gexp-intext-visual-state": String(this._visualState || "idle"),
          };
          const initPageMs = this.getIntextInitPageMs();
          const startDistance = this.getIntextDistancePx();
          const maxDelayMs = this.config?.loading?.maxDelayMs;
          const hasTimer = typeof maxDelayMs === "number" && Number.isFinite(maxDelayMs) && maxDelayMs >= 0;
          const loadingExperiment = this.config?.loading?._experiment || {};
          const adjacencyMeta = this.placement?.adjacencyMeta || {};
          const qaCookieApplied = this.manager?._intextQaCookieApplied === true || loadingExperiment.qaCookieApplied === true;
          const loadingExperimentValue = loadingExperiment.qaCookieEnabled
            ? String(loadingExperiment.experimentName || (loadingExperiment.qaCookieRandom1 === "default" ? "default" : "none"))
            : (loadingExperiment.enabled ? "true" : "false");
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
            cycle["gexp-intext-is-technical-refresh"] = "true";
            cycle["gexp-intext-technical-refresh-reason"] = "house-lineitem-sentinel";
          }

          this._intextTelemetryCycle = cycle;
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
              Object.assign(this.wa.cI, this._intextTelemetryCycle || {}, this._pendingIntextTelemetry || {}, clean);
            }

            if (options.register === true) {
              this.commitIntextTelemetry(options.reason || "manual");
            }
          } catch (e) {}
        }

        flushIntextTelemetryToCI(options = {}) {
          try {
            if (this.wa?.cI) {
              Object.assign(this.wa.cI, this._intextTelemetryCycle || {}, this._pendingIntextTelemetry || {});
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
              "video-error",
              "no-fill",
              "house-1x1-max-attempts",
              "house-lineitem-sentinel",
              "house-lineitem-sentinel-max-attempts",
            ]);
            const closeReasons = new Set(["close-all", "destroy"]);
            const isFinalReason = finalReasons.has(reason);
            if (isFinalReason && this._intextTelemetryFinalCommitted) return;
            if (closeReasons.has(reason) && this._intextTelemetryFinalCommitted) return;
            if (this._intextTelemetryCommittedForCycle && !isFinalReason && !closeReasons.has(reason)) return;
            if (!this.wa?.cI || !this.manager?.gexp?.registerImpression) return;
            this.flushIntextTelemetryToCI();
            this.wa.cI["gexp-intext-telemetry-commit-reason"] = reason;
            this.manager.gexp.registerImpression(this.wa.cI);
            this._intextTelemetryCommittedForCycle = true;
            this._intextTelemetryCommittedReasons[reason] = true;
            if (isFinalReason) this._intextTelemetryFinalCommitted = true;
            logIntext(`[Intext:Telemetry:${this.id}] telemetry_committed`, {
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
            const el = this.getIntextTelemetryElement();
            if (!el || typeof IntersectionObserver === "undefined") return;
            if (this._intextViewportObserver && this._intextViewportObservedEl === el) return;
            this.teardownIntextViewportTelemetryObserver();
            this._intextViewportObservedEl = el;
            this.mergeIntextTelemetry(this.getIntextTelemetryElementMeta(el));
            this._intextViewportObserver = new IntersectionObserver((entries) => {
              const entry = entries && entries[0];
              if (!entry) return;
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
            }, { threshold: 0.1 });
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

        restoreIntextRandomTargetingAfterGexpRequest(slot = null) {
          const targetSlot = slot || this.slot;
          if (!targetSlot || typeof targetSlot.setTargeting !== "function") return;

          const targetWindowArray = this.manager?.gexp?.windows?.[this.id];
          const restored = {};
          const sources = {};
          ["random1", "random2", "random3", "random4"].forEach((key) => {
            const pageKv = this.readIntextPageKv(key);
            if (pageKv.value === null || pageKv.value === undefined || pageKv.value === "") return;
            restored[key] = String(pageKv.value);
            sources[key] = pageKv.source;
            targetSlot.setTargeting(key, restored[key]);

            if (targetWindowArray && targetWindowArray.cI) {
              targetWindowArray.cI[key] = restored[key];
            }
          });

          logIntext(`[Intext:Display:${this.id}] display_random_restored_after_gexp_request`, {
            random1: restored.random1 || null,
            random2: restored.random2 || null,
            random3: restored.random3 || null,
            random4: restored.random4 || null,
            source: Object.entries(sources).map(([key, source]) => `${key}:${source}`).join(","),
            slotCode: this.id || null,
          });
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
            Object.entries(map).forEach(([rawKey, rawValue]) => {
              if (rawValue === undefined || rawValue === null) return;
              const key = String(rawKey || "").trim();
              if (!key) return;
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
            fallbackTargeting.random1 = gexp?.getRandom?.(1);
            fallbackTargeting.random2 = gexp?.getRandom?.(2);
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

          ["random1", "random2", "tag", "t", "tlm", "tlm_id", "nvis"].forEach((key) => {
            const pageKv = key.indexOf("random") === 0 ? this.readIntextPageKv(key) : { value: null, source: null };
            const preferredValue = pageKv.value !== null ? pageKv.value : mergedTargeting[key];
            const fallbackValue = fallbackTargeting[key];
            if (preferredValue !== undefined && preferredValue !== null && preferredValue !== "") {
              finalTargeting[key] = String(preferredValue);
              if (pageKv.value !== null) sourceLabels.push(`${key}:${pageKv.source}`);
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
            Object.entries(map).forEach(([rawKey, rawValue]) => {
              if (rawValue === undefined || rawValue === null) return;
              const key = String(rawKey || "").trim();
              if (!key) return;
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
            fallbackTargeting.random1 = gexp?.getRandom?.(1);
            fallbackTargeting.random2 = gexp?.getRandom?.(2);
            fallbackTargeting.random3 = gexp?.getRandom?.(3);
            fallbackTargeting.random4 = gexp?.getRandom?.(4);
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
            const pageKv = key.indexOf("random") === 0 ? this.readIntextPageKv(key) : { value: null, source: null };
            const preferredValue = pageKv.value !== null ? pageKv.value : mergedTargeting[key];
            const fallbackValue = fallbackTargeting[key];
            if (preferredValue !== undefined && preferredValue !== null && preferredValue !== "") {
              finalTargeting[key] = String(preferredValue);
              if (pageKv.value !== null) sourceLabels.push(`${key}:${pageKv.source}`);
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
            const adUnitPath =
              this.scopedContext?.adUnitPath || this.manager.adUnitPath || this.manager.gexp.cfg.adUnit || "";
            let sizes = this.config.display?.sizes || [[300, 250], [336, 280], [320, 100], [320, 50]];

            const networkId = this.scopedContext?.networkId || this.manager.networkId;
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

              const isRefresh = this.waterfall && (this.waterfall._cycleCount > 0 || this.waterfall.lastTrigger === "refresh");
              const isFallback = this.waterfall && this.waterfall._displayRenderState?.isFallback === true;
              this.mergeIntextTelemetry({
                "gexp-intext-request-type": "display",
                "gexp-intext": "true",
                "gexp-intext-position": this.id,
                "gexp-intext-display": "true",
                "gexp-intext-is-refresh": isRefresh ? "true" : "false",
                "gexp-intext-is-fallback": isFallback ? "true" : "false",
              });
              this.manager.gexp.request(this.slot);
              this.restoreIntextRandomTargetingAfterGexpRequest(this.slot);
              const postCoreSlotTargeting = this.getSlotTargetingMapSafe(this.slot);
              const finalDisplayTargeting = this.resolveDisplayRequestTargeting(postCoreSlotTargeting);

              finalDisplayTargeting.targeting["gexp-intext"] = "true";
              finalDisplayTargeting.targeting["gexp-intext-position"] = this.id;
              finalDisplayTargeting.targeting["gexp-intext-display"] = "true";
              finalDisplayTargeting.targeting["gexp-intext-is-refresh"] = isRefresh ? "true" : "false";
              finalDisplayTargeting.targeting["gexp-intext-is-fallback"] = isFallback ? "true" : "false";

              if (this.wa && this.wa.cI) {
                this.wa.cI["gexp-intext"] = "true";
                this.wa.cI["gexp-intext-position"] = this.id;
                this.wa.cI["gexp-intext-display"] = "true";
                this.wa.cI["gexp-intext-is-refresh"] = isRefresh ? "true" : "false";
                this.wa.cI["gexp-intext-is-fallback"] = isFallback ? "true" : "false";
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

            this.activeCreative?.destroy?.();
            this.mergeIntextTelemetry({
              "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
              "gexp-intext-video-failed": "true",
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
        
        onVideoEnded(renderToken = this._activeRenderToken) {
          if (!this.isActiveRenderToken(renderToken, "onVideoEnded", this.waterfall?.lastTrigger || "unknown")) return;
          logIntext(`[Intext:Video:${this.videoId}] 🔄 Video playback ended`);

          const refreshCfg = this.config.refreshCycle;
          if (!refreshCfg || !refreshCfg.enabled) {
            logIntext(
              `[Intext:Video:${this.videoId}] Refresh cycle disabled — keeping container open for UX stability or closing`,
            );
            this.teardownIntextViewportTelemetryObserver();
            this.flushIntextTelemetryToCI({ register: true, reason: "close-all" });
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
             this.trackRenderTimer(setTimeout(() => {
                 if (!this.isActiveRenderToken(renderToken, "video_refresh_missing_el_timer", "refresh")) return;
                 this.activeCreative?.destroy?.();
                 this.activeCreative = null;
                 this.waterfall.prebidStarted = false;
                 this.waterfall.startAuction("refresh");
             }, targetIntervalMs));
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
             if (!this.isActiveRenderToken(renderToken, "video_refresh_visible_timer", "refresh")) return;
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
          logIntext(`[Intext:Display:${this.id}] intext_node_reset_visual_state`, {
            slotCode: this.id,
            activeToken: this._activeRenderToken,
            cycleId: this._intextTelemetryCycleId,
            visualState: this._visualState,
          });
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

          const distancePx = this.getLoadingDistancePx();
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
              this.wa.cI["gexp-intext-is-refresh"] = (trigger === "refresh" || this.node._cycleCount > 0) ? "true" : "false";
              this.wa.cI["gexp-intext-is-fallback"] = (trigger === "fallback" || this._displayRenderState?.isFallback || sentinelRetryContext?.isFallback === true) ? "true" : "false";
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

            setTimeout(retry, intervalMs);
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

          if (!this._displayRenderState) this._displayRenderState = {};
          this._displayRenderState.isFallback = true;
          if (!(winner === "video" && loser === "display")) {
            this.node.beginVisualRender("fallback_started", "fallback");
          }
          if (winner === "video" && loser === "display") {
            this.node.beginVisualRender("fallback_started", "fallback");
            this.node.startIntextTelemetryCycle("fallback", {
              "gexp-intext-is-fallback": "true",
              "gexp-intext-video-failed": "true",
              "gexp-intext-request-type": "display",
              "gexp-intext-render-token": String(this.node._activeRenderToken || 0),
              "gexp-intext-render-attempt": String(this.node._renderTokenSeq || 0),
              "gexp-intext-visual-state": "fallback_started",
            });
          }
          const fallbackRenderToken = this.node._activeRenderToken;
          if (winner === "video" && loser === "display") {
            this.node.ensureSingleVisibleIntextSurface("display", fallbackRenderToken, "fallback_video_to_display_before_request");
          }

          logIntext(
            `%c[Intext:Slot:${this.node.id}:${this.node.id}] ═══ FALLBACK → ${loser.toUpperCase()} ═══`,
            "color:#FF5722;font-weight:bold",
          );
          const fallbackSuccess = await this._requestFormat(loser, fallbackRenderToken);
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

        async _requestFormat(format, renderToken = this.node._activeRenderToken) {
          if (format === "display") {
            return await this._requestDisplay(renderToken);
          } else {
            return await this._requestVideo(renderToken);
          }
        }

        async _requestDisplay(renderToken = this.node._activeRenderToken) {
          if (!this.node.isActiveRenderToken(renderToken, "_requestDisplay:start", this.lastTrigger || "unknown")) return false;
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
          if (!this.node.isActiveRenderToken(renderToken, "_requestDisplay:after_tam", this.lastTrigger || "unknown")) return false;
          const displayResult = await this.node.askDisplay(
            this._lastDisplayBid,
            renderToken,
            this.lastTrigger || "unknown",
          );
          if (displayResult.stale === true || !this.node.isActiveRenderToken(renderToken, "_requestDisplay:after_askDisplay", this.lastTrigger || "unknown")) return "closed";

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
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ GAM Display: FILL ✅ (size: ${JSON.stringify(displayResult.event?.size)})`,
            );
            this.node.showDisplay(displayResult, renderToken, this.lastTrigger || "unknown");
            return true;
          } else {
            logIntext(
              `[Intext:Slot:${this.node.id}] ├─ GAM Display: NO-FILL ❌`,
            );
            this.node.discardDisplay();
            return false;
          }
        }

        async _requestVideo(renderToken = this.node._activeRenderToken) {
          if (!this.node.isActiveRenderToken(renderToken, "_requestVideo:start", this.lastTrigger || "unknown")) return false;
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

          if (!this.node.isActiveRenderToken(renderToken, "_requestVideo:after_tam", this.lastTrigger || "unknown")) return false;
          const gamVideoTagUrl = this.buildGAMVideoTagUrl();
          logIntext(
            `[Intext:Slot:${this.node.id}] ├─ GAM Video: building player...`,
          );
          const videoPlayed = await this.node.buildAndPlayVideo(gamVideoTagUrl, renderToken, this.lastTrigger || "unknown");
          if (!this.node.isActiveRenderToken(renderToken, "_requestVideo:after_buildAndPlayVideo", this.lastTrigger || "unknown")) return false;
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
                   if (!this.node.isActiveRenderToken(restoreRenderToken, "video_failure_restore_display_raf", this.lastTrigger || "unknown")) return;
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
          const networkId = this.node.scopedContext?.networkId || this.node.manager.networkId;

          if (!slotId || !slotName) return null;

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

          let resolvedValue = null;
          let resolvedSource = null;
          for (const source of candidateSources) {
            const candidateValue = this.normalizeIntextTargetingValue(source.map?.[selectionKey]);
            if (candidateValue == null) continue;
            resolvedValue = candidateValue;
            resolvedSource = source.label;
            break;
          }

          if (resolvedValue == null) {
            try {
              if (selectionKey === "random1") {
                resolvedValue = this.gexp?.getRandom?.(1) != null
                  ? String(this.gexp.getRandom(1))
                  : null;
                resolvedSource = "gexp_runtime_fallback";
              }
            } catch (e) {}
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
            random1: selectionKey === "random1" ? resolvedValue : this.normalizeIntextTargetingValue(this.node?.scopedContext?.targeting?.random1),
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
          const networkId =
            this.node.scopedContext?.networkId ||
            this.node.manager.networkId ||
            this.gexp.cfg.networkId ||
            "99071977";
          const adUnitPath =
            adUnitPathOverride ||
            this.node.scopedContext?.adUnitPath ||
            this.node.manager.adUnitPath ||
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
          const networkId = this.node.scopedContext?.networkId || this.node.manager.networkId;
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
          const slotName = this.node.scopedContext?.adUnitPath || this.node.manager.adUnitPath || "";
          const sizes = this.getDisplaySizes().filter(
            (s) => s !== "fluid" && s[0] > 1,
          );
          const networkId = this.node.scopedContext?.networkId || this.node.manager.networkId;

          if (!slotId || !slotName || !sizes.length) return null;

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
          const networkId = this.node.scopedContext?.networkId || this.node.manager.networkId;
          const adUnitPath = this.getVideoAdUnitPath();
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
              "gexp-intext-is-refresh": this.lastTrigger === "refresh" ? "true" : "false",
              "gexp-intext-is-fallback": this._displayRenderState?.isFallback === true ? "true" : "false",
            });
            this.node.wa.newImpression();
            
            if (this.node.wa.cI) {
                // Video only: gexp-intext-video (no refresh/fallback as per user request)
                this.node.wa.cI["gexp-intext-video"] = "true";
                this.node.wa.cI["gexp-intext-display"] = "false";
                this.node.flushIntextTelemetryToCI();
                
                Object.assign(this.node.wa.cI, custTargeting);
                logIntext(`[Intext:Video:${this.node.id}] video_telemetry_registered`, { keys: Object.keys(custTargeting) });
            }
          }

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
          const basePath = this.node.scopedContext?.adUnitPath || this.node.manager.adUnitPath || "";
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

          const networkId = this.node.scopedContext?.networkId || this.node.manager.networkId || this.gexp.cfg.networkId;
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

              if (!original) {
                logIntext(`[Intext:Prebid] prebid_alias_register_skipped`, {
                  alias,
                  reason: "missing_original_bidder",
                });
                continue;
              }

              try {
                const options = gvlid != null ? { gvlid } : undefined;
                logIntext(`[Intext:Prebid] prebid_alias_register_attempt`, {
                  alias,
                  bidder: original,
                  gvlid: gvlid ?? null,
                });
                if (options) {
                  window.pbjs.aliasBidder(original, alias, options);
                  logIntext(`[Intext:Prebid] prebid_alias_gvlid_applied`, {
                    alias,
                    bidder: original,
                    gvlid,
                  });
                } else {
                  window.pbjs.aliasBidder(original, alias);
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
          const random1 = String(this.getIntextPageTargetingValue(key1) ?? "");
          const random2 = String(this.getIntextPageTargetingValue(key2) ?? "");
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

            const scheduleMediaReadyConfirmation = (source) => {
              clearMediaReadyConfirmTimer();
              const confirmPlayback = () => {
                if (isRevealBlocked()) return;
                if (getMediaCurrentTime() > 0) {
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
                revealPlayer("media_playing");
              };
              const onTimeUpdate = () => {
                if (getMediaCurrentTime() > 0) {
                  if (!mediaTimeupdateLogged) {
                    mediaTimeupdateLogged = true;
                    logIntext(`[Intext:Video:IMA] ad_media_timeupdate_started`);
                  }
                  revealPlayer("media_timeupdate");
                }
              };
              const onError = () => {
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
              logIntext(`[Intext:Video:IMA] ✅ adstart — Arrancando...`);
              adStarted = true;
              adstartAt = Date.now();
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

              logIntext(`[Intext:Video:IMA] player_adserror - code: ${normalizedErrCode}, msg: ${errMsg}`);

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
                        "gexp-intext-video-error-message": errMsg,
                        "gexp-intext-video-before-playback": firstFramePlayed ? "false" : "true",
                        "gexp-intext-load-end-distance-px": this.node.getIntextDistancePx(),
                      });
                      this.node.flushIntextTelemetryToCI();
                      this.node.commitIntextTelemetry("video-error");
                  }
              }
            });

            this.player.on("ads-request", () =>
              logIntext(
                `[Intext:Video:IMA] 📤 ads-request — IMA processing ad request`,
              ),
            );
            this.player.on("ads-load", (evt) => {
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
                        const errCode = err?.getErrorCode?.() || "unknown";
                        const errMsg = err?.getMessage?.() || "unknown";
                        nativeAdError = {
                          code: errCode,
                          message: errMsg,
                          vastCode: err?.getVastErrorCode?.(),
                        };
                        logIntext(
                          `[Intext:Video:IMA:Native] native_ad_error - code=${errCode}, msg=${errMsg}, vast=${err?.getVastErrorCode?.()}`,
                        );
                        if (!firstFramePlayed) {
                          markFastFallbackVideoError(errCode, errMsg, "native_ad_error");
                          rejectBeforePlayback(
                            new Error(`video_ad_error: [${errCode}] ${errMsg}`),
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

