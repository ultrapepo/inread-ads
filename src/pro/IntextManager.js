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
              this.applyIntextDisplayFloorToPrebid(configuration);

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

        getIntextDisplayFloorValue() {
          const wa = this.wa;
          if (!wa) return null;

          // 1) Si ya existe el effectivePrice calculado por GEXP, úsalo
          if (typeof wa.effectivePrice === "number" && isFinite(wa.effectivePrice) && wa.effectivePrice > 0) {
            return parseFloat(wa.effectivePrice);
          }

          // 2) Si hay lastPrice persistido, úsalo
          if (typeof wa.state?.lastPrice === "number" && isFinite(wa.state.lastPrice) && wa.state.lastPrice > 0) {
            return parseFloat(wa.state.lastPrice);
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
            return parseFloat(wa.array[idx]);
          }

          // 4) Si ya existe en slot targeting previo, úsalo como fallback
          try {
            const slot = this.node?.slot;
            if (slot && typeof slot.getTargeting === "function") {
              const kv = slot.getTargeting("gexp_floor");
              if (Array.isArray(kv) && kv[0] && !isNaN(parseFloat(kv[0]))) {
                return parseFloat(kv[0]);
              }
            }
          } catch (e) {
            /* ignore */
          }

          return null;
        }

        applyIntextDisplayFloorToPrebid(configuration) {
          if (!window.pbjs?.setConfig || !configuration?.code) return null;

          const hasBanner = Boolean(configuration?.mediaTypes?.banner);
          const floorKey = `${configuration.code}|banner`;

          // El floor del intext solo aplica a banner/display
          if (!hasBanner) {
            if (WindowArray.pbFloorCfg?.floors?.data?.values) {
              delete WindowArray.pbFloorCfg.floors.data.values[floorKey];
              window.pbjs.setConfig(WindowArray.pbFloorCfg);
            }
            logIntext(
              `[Intext:Prebid:${this.node.id}] display_prebid_floor_cleared - no banner mediaType for ${floorKey}`,
            );
            return null;
          }

          const floorValue = this.getIntextDisplayFloorValue();

          // Ojo: gexp_floor está en EUR en vuestro stack
          WindowArray.pbFloorCfg.floors.data.currency = "EUR";
          WindowArray.pbFloorCfg.floors.data.schema = {
            delimiter: "|",
            fields: ["adUnitCode", "mediaType"],
          };

          if (!(floorValue > 0)) {
            delete WindowArray.pbFloorCfg.floors.data.values[floorKey];
            window.pbjs.setConfig(WindowArray.pbFloorCfg);
            logIntext(
              `[Intext:Prebid:${this.node.id}] display_prebid_floor_missing - key=${floorKey}, floor cleared`,
            );
            return null;
          }

          WindowArray.pbFloorCfg.floors.data.values[floorKey] = parseFloat(floorValue);
          window.pbjs.setConfig(WindowArray.pbFloorCfg);

          logIntext(
            `[Intext:Prebid:${this.node.id}] display_prebid_floor_applied - key=${floorKey}, gexp_floor=${floorValue}`,
          );

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