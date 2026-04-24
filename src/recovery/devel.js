let cfg={
        "enabled":true,
        "defaultP":1,
        "houseTm":30000,
        "maxHReload":1,
        "telemetryProb":1,
        "pList": [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4],
        "adexIds" : [2559776610],
        "houseIds" : [45125937, 81003777, 4815141041, 79449777, 67317777, 4633770194, 4717022388, 5170458185],
        "prebidIds":[
            "5359233312",
            "4406227815",
            "4402193934",
            "5180398781",
            "83488497",
            "83522457",
            "4402208836",
            "5354911588"

        ],
        "reloadIds" : [45125937, 81003777, 4815141041,4764613895, 4811457786,
            79449777, 67317777, 4633770194, 4717022388, 5170458185,
            5359233312,4402193934,5180398781,83488497,83522457,4402208836, 5354911588, 4406227815
        ],
        "reloadCampaignIds":[2559776610, 483876297, 3038846356, 2098434238, 494913417, 494827977, 2106449176, 2108387998, 2106441352, 2106520950, 2106523863, 2667870692, 2668441436, 2668163671, 2668164637],
        "houseLineItems":[],
        "positions":{
            "r":{"p":2,"mu":3,"md":2,"rv":1,"nbb":3,"st":1,"ub":7,"ppbo":0.15,"ppbd":1,"hl":20,"mp":0,"hr":{"tim":15000,"ov":false,"mr":1},"ar":{"tim":null,"ov":true,"pbtim":2000,"mr":1,"mintim":5000},"rqpbtim":2000,"tl":true},
            "rb":{"p":2,"mu":3,"md":2,"rv":1,"nbb":3,"st":1,"ub":7,"ppbo":0.15,"ppbd":1,"hl":20,"mp":0,"hr":{"tim":15000,"ov":false,"mr":1},"ar":{"tim":null,"ov":true,"pbtim":2000,"mr":1,"mintim":5000},"rqpbtim":2000,"tl":true},
            "rc":{"p":2,"mu":3,"md":2,"rv":1,"nbb":3,"st":1,"ub":7,"ppbo":0.15,"ppbd":1,"hl":20,"mp":0,"hr":{"tim":15000,"ov":false,"mr":1},"ar":{"tim":null,"ov":true,"pbtim":2000,"mr":1,"mintim":5000},"rqpbtim":2000,"tl":true},
            "rd":{"p":2,"mu":3,"md":2,"rv":1,"nbb":3,"st":1,"ub":7,"ppbo":0.15,"ppbd":1,"hl":20,"mp":0,"hr":{"tim":15000,"ov":false,"mr":1},"ar":{"tim":null,"ov":true,"pbtim":2000,"mr":1,"mintim":5000},"rqpbtim":2000,"tl":true},
            "re":{"p":1,"mu":4,"rv":1},
            "rf":{"p":1,"mu":4,"rv":1},
            "rg":{"p":0,"mu":4,"rv":1},
            "r-pnc":{"p":2,"mu":2,"rv":1},
            "rb-pnc":{"p":2,"mu":2,"rv":1},
            "r-nata":{"p":2,"mu":2,"rv":1},
            "r-nata-pnc":{"p":2,"mu":2,"rv":1},
            "m":{"p":4,"mu":6,"rv":1,"tl":true},
            "mb":{"p":4,"mu":2,"rv":1},
            "m-pnc":{"p":2,"mu":2,"rv":1},
            "si":{"p":2,"mu":2,"rv":1},
            "sd":{"p":2,"mu":2,"rv":1},
            "c990x50_320x50":{"p":2,"mu":2,"rv":1},
            "c990x50_320x53":{"p":2,"mu":2,"rv":1},
            "gexp-intext": {
            "p": 4,
            "mu": 3,
            "md": 2,
            "rv": 0,
            "nbb": 3,
            "st": 1,
            "ub": 7,
            "ppbo": 0.1,
            "ppbd": 2,
            "hl": 20,
            "hr": {
                "tim": null,
                "ov": true,
                "pbtim": 2000,
                "mr": 1,
                "mintim": 5000
            },
            "ar": {
                "tim": null,
                "ov": true,
                "pbtim": 2000,
                "mr": 1,
                "mintim": 5000
            },
            "rqpbtim": 2000,
            "tl": true
        },
        "gexp-intext-2": {
            "p": 4,
            "mu": 3,
            "md": 2,
            "rv": 0,
            "nbb": 3,
            "st": 1,
            "ub": 7,
            "ppbo": 0.1,
            "ppbd": 2,
            "hl": 20,
            "hr": {
                "tim": null,
                "ov": true,
                "pbtim": 2000,
                "mr": 1,
                "mintim": 5000
            },
            "ar": {
                "tim": null,
                "ov": true,
                "pbtim": 2000,
                "mr": 1,
                "mintim": 5000
            },
            "rqpbtim": 2000,
            "tl": true
        },
            "default":{"p":2,"mu":3,"md":2,"rv":1,"nbb":3,"st":1,"ub":7,"ppbo":0.15,"ppbd":1,"hl":20,"mp":0,"hr":null,"ar":null,"rqpbtim":2000,"tl":false}
        },
    "intextSites": {
        "default": {
            "general": {
                "debug": false,
                "domainFilter": {
                    "enabled": true,
                    "allowedDomains": ["telva"],
                    "dataLayerObj": "ueDataLayer",
                    "dataLayerProp": "be_page_domain"
                },
                "inclusions": {
                    "keyValues": {
                        "newsid": ["69bbe63601a2f1b5478b4597"]
                    }
                },
                "allowedContentTypes": [
                    "noticia",
                    "directo",
                    "noticia-especial",
                    "cronica",
                    "opinion"
                ],
                "dom": {
                    "articleBodySelector": ".ue-c-article__body",
                    "paragraphSelector": "p",
                    "blockerSelector": ".ue-c-article__embed, .ue-c-article__image, .ue-c-ad"
                },
                "rules": {
                    "placements": [
                        [2, 1],
                        [5, 1]
                    ],
                    "allowMultiple": true,
                    "minCharacters": 50,
                    "adjacencyAvoidance": {
                        "enabled": true,
                        "selector": ".ue-c-ad",
                        "direction": "up"
                    }
                },
                "style": {
                    "containerBackground": "transparent",
                    "fixedHeight": "360px",
                    "useBlur": false
                },
                "loading": {
                    "rootMargin": "1000px 0px",
                    "maxDelayMs": 1500
                },
                "display": {
                    "adUnitPath": "telva/belleza/n",
                    "sizes": [
                        [300, 250],
                        [300, 300],
                        [320, 100],
                        [320, 50],
                        [300, 600],
                        [960, 540]
                    ]
                },
                "video": {
                    "enabled": true,
                    "playerSize": [640, 360],
                    "context": "instream",
                    "plcmt": 1,
                    "placement": 1,
                    "mimes": [
                        "video/mp4",
                        "application/javascript"
                    ],
                    "protocols": [2, 3, 5, 6, 7],
                    "linearity": 1,
                    "api": [1, 2],
                    "battr": [13, 14],
                    "skippable": true,
                    "maxduration": 30,
                    "minduration": 1,
                    "playbackmethod": [6]
                },
                "slots": {
                    "enabled": true,
                    "maxSlots": 2,
                    "enabledSlots": [0, 1]
                },
                "decision": {
                    "mode": "auto",
                    "minCpm": 1.0,
                    "priorityBelowMin": "video"
                },
                "refreshCycle": {
                    "enabled": true,
                    "delayMs": 5000,
                    "maxCycles": 2,
                    "mode": "display_only",
                    "bidStrategy": "fresh",
                    "bidMaxAgeMs": 30000
                },
                "slotOverrides": {
                    "0": {
                        "decision": {
                            "mode": "auto"
                        }
                    },
                    "1": {
                        "decision": {
                            "mode": "display_only"
                        }
                    }
                },
                "prebid": {
                    "timeoutMs": 2000,
                    "graceMs": 200,
                    "excludedVideoBidders": [],
                    "networks": {
                        "default": {
                            "aliases": {
                                "rubicon_video": "rubicon",
                                "appnexus_video": "appnexus",
                                "criteo_video": "criteo",
                                "pubmatic_video": "pubmatic",
                                "smartadserver_video": "smartadserver",
                                "ix_video": "ix",
                                "ttd_video": "ttd"
                            },
                            "bidders": [
                                {
                                    "bidder": "appnexus",
                                    "params": {
                                        "placementId": "11595057"
                                    }
                                },
                                {
                                    "bidder": "rubicon",
                                    "params": {
                                        "zoneId": 663050,
                                        "siteId": 142576,
                                        "accountId": 15366,
                                        "position": "btf"
                                    }
                                },
                                {
                                    "bidder": "criteo",
                                    "params": {
                                        "networkId": 1080,
                                        "pubid": "108879"
                                    }
                                },
                                {
                                    "bidder": "smartadserver",
                                    "params": {
                                        "pageId": 648549,
                                        "formatId": 40859,
                                        "siteId": 99913,
                                        "domain": "https://prg.smartadserver.com"
                                    }
                                },
                                {
                                    "bidder": "equativ",
                                    "params": {
                                        "networkId": 1844,
                                        "pageId": 648549,
                                        "formatId": 40859,
                                        "siteId": 99913
                                    }
                                },
                                {
                                    "bidder": "richaudience",
                                    "params": {
                                        "pid": "463Y4dJxIO",
                                        "supplyType": "site"
                                    }
                                },
                                {
                                    "bidder": "teads",
                                    "params": {
                                        "placementId": 202864,
                                        "pageId": 187761
                                    }
                                },
                                {
                                    "bidder": "pubmatic",
                                    "params": {
                                        "publisherId": "161984",
                                        "adSlot": "4525457"
                                    }
                                },
                                {
                                    "bidder": "ttd",
                                    "params": {
                                        "supplySourceId": "unidad",
                                        "publisherId": "1"
                                    }
                                },
                                {
                                    "bidder": "ix",
                                    "params": {
                                        "siteId": "1255677"
                                    }
                                },
                                {
                                    "bidder": "taboola",
                                    "params": {
                                        "publisherId": "1925071"
                                    }
                                }
                            ],
                            "videoBidders": [
                                {
                                    "bidder": "rubicon_video",
                                    "params": {
                                        "zoneId": 3460964,
                                        "siteId": 96110,
                                        "position": "atf",
                                        "accountId": 15366,
                                        "video": {
                                            "size_id": 201
                                        }
                                    }
                                },
                                {
                                    "bidder": "pubmatic_video",
                                    "params": {
                                        "publisherId": "161984",
                                        "adSlot": "6112271"
                                    }
                                },
                                {
                                    "bidder": "richaudience",
                                    "params": {
                                        "pid": "ImcSe2TtvR",
                                        "supplyType": "site"
                                    }
                                },
                                {
                                    "bidder": "appnexus_video",
                                    "params": {
                                        "placementId": 34117164
                                    }
                                },
                                {
                                    "bidder": "criteo_video",
                                    "params": {
                                        "networkId": "1080",
                                        "pubid": "108879"
                                    }
                                },
                                {
                                    "bidder": "ttd_video",
                                    "params": {
                                        "supplySourceId": "unidad",
                                        "publisherId": "1",
                                        "placementId": "video"
                                    }
                                },
                                {
                                    "bidder": "smartadserver_video",
                                    "params": {
                                        "siteId": "99913",
                                        "pageId": "648549",
                                        "formatId": "40183",
                                        "domain": "//prg.smartadserver.com"
                                    }
                                },
                                {
                                    "bidder": "ix_video",
                                    "params": {
                                        "siteId": "1255722"
                                    }
                                }
                            ]
                        },
                        "21626337071": {
                            "aliases": {},
                            "bidders": [ 
                                {
                                    "bidder": "appnexus",
                                    "params": {
                                        "placementId": 37306510                    
                                    }
                                },
                                {
                                    "bidder": "sovrn",
                                    "params": {
                                        "tagid": 1306015                    
                                    }
                                }
                            ],
                            "videoBidders": []
                        }
                    }
                },
                "tam": {
                    "pubID": "3537",
                    "adServer": "googletag",
                    "bidTimeout": 1000,
                    "gdpr": {
                        "enabled": true
                    },
                    "videoAdServer": "DFP",
                    "deals": true
                },
                "contentTypes": {
                    "directo": {
                        "dom": {
                            "articleBodySelector": ".ue-c-streamlive__body",
                            "paragraphSelector": "article.ue-c-streamlive-comment",
                            "blockerSelector": ".ue-c-ad"
                        },
                        "rules": {
                            "placements": [
                                [8, 1],
                                [16, 1],
                                [24, 1]
                            ],
                            "allowMultiple": true,
                            "minCharacters": 0
                        },
                        "slots": {
                            "enabled": true,
                            "maxSlots": 3,
                            "enabledSlots": [0, 1, 2]
                        },
                        "decision": {
                            "mode": "auto",
                            "minCpm": 1.0,
                            "priorityBelowMin": "video"
                        },
                        "refreshCycle": {
                            "enabled": true,
                            "delayMs": 3000,
                            "maxCycles": 2,
                            "mode": "display_only",
                            "bidStrategy": "fresh"
                        },
                        "slotOverrides": {
                            "1": {
                                "decision": {
                                    "mode": "display_only"
                                }
                            },
                            "2": {
                                "decision": {
                                    "mode": "display_only"
                                }
                            }
                        },
                        "exclusions": {
                            "disableAll": false,
                            "adUnitPaths": [],
                            "keyValues": {},
                            "disableSlots": {
                                "always": [],
                                "rules": []
                            }
                        }
                    }
                },
                "exclusions": {
                    "disableAll": false,
                    "adUnitPaths": [],
                    "keyValues": {
                        "newsid": [""],
                        "tag": ["bloqueo-publi"],
                        "t": [""]
                    },
                    "disableSlots": {
                        "always": [],
                        "rules": []
                    }
                },
                "infiniteScroll": {
                    "enabled": true,
                    "mainSelector": "main[data-ue-navindex]",
                    "maxArticles": 5,
                    "overrides": {
                        "slots": {
                            "enabled": true,
                            "maxSlots": 1,
                            "enabledSlots": [0]
                        },
                        "decision": {
                            "mode": "display_only",
                            "minCpm": 1.0,
                            "priorityBelowMin": "display"
                        },
                        "refreshCycle": {
                            "enabled": true,
                            "delayMs": 3000,
                            "maxCycles": 2,
                            "mode": "display_only",
                            "bidStrategy": "fresh"
                        },
                        "slotOverrides": {}
                    },
                    "exclusions": {
                        "disableAll": false,
                        "adUnitPaths": [],
                        "keyValues": {},
                        "disableSlots": {
                            "always": [],
                            "rules": []
                        }
                    }
                },
                "networks": {
                    "21626337071": {
                        "tam": {
                            "enabled": false
                        }
                    }
                }
            },
            "overrides": [
                {
                    "if": [
                        "device:mobile"
                    ],
                    "then": {
                        "display": {
                            "sizes": [
                                [300, 250],
                                [300, 300],
                                [336, 280],
                                [320, 100],
                                [320, 50],
                                [300, 600]
                            ]
                        },
                        "rules": {
                            "placements": [
                                [2, 1],
                                [5, 1]
                            ]
                        }
                    }
                }
            ]
        }
    }
}