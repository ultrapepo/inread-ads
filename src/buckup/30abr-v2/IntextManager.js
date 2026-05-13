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
            const pageTargeting = this.getPageCustomTargeting(context);
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
            const pageTargeting = this.getPageCustomTargeting(context);
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
                scopedContext: {
                  ...(scopedContext || {}),
                  navIndex,
                },
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
            const displayEl = this.container?.getElement?.() || null;
            const videoEl = this.videoContainer?.getElement?.() || null;
            if (this.state === "video") return videoEl || displayEl;
            return displayEl || videoEl;
          } catch (e) {
            return null;
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
            const is1x1 = event?.size && event.size[0] === 1 && event.size[1] === 1;
            if (event?.size && !is1x1) return `${event.size[0]}x${event.size[1]}`;
            const renderSize = this.resolveDisplayRenderSizeFromEvent(event, "display_telemetry_size");
            const width = renderSize.gamWidth || renderSize.actualWidth || 0;
            const height = renderSize.actualHeight || renderSize.gamHeight || 0;
            return `${width}x${height}`;
          } catch (e) {
            return null;
          }
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
            "gexp-intext-request-type",
            "gexp-intext-creative-size",
            "gexp-intext-video-viewport-exit-played-pct",
            "gexp-intext-video-failed",
            "gexp-intext-viewport-visible-ms",
            "gexp-intext-ever-in-viewport",
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
          this.clearIntextTelemetryCycleCI();

          const cycle = {
            "gexp-intext-cycle-id": String(this._intextTelemetryCycleId),
            "gexp-intext-load-trigger": String(trigger || "unknown"),
            "gexp-intext-is-refresh": trigger === "refresh" ? "true" : "false",
            "gexp-intext-is-fallback": trigger === "fallback" ? "true" : "false",
            "gexp-intext-ever-in-viewport": "false",
            "gexp-intext-viewport-visible-ms": "0",
          };
          const initPageMs = this.getIntextInitPageMs();
          const startDistance = this.getIntextDistancePx();
          if (initPageMs !== null) cycle["gexp-intext-init-page-ms"] = String(initPageMs);
          if (startDistance !== null) cycle["gexp-intext-load-start-distance-px"] = String(startDistance);

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
        } = {}) {
          if (!currentEl) return null;
          const slotEl = currentEl;
          let scaleTarget = slotEl.querySelector('div[id^="google_ads_iframe"]') || slotEl.querySelector("iframe");
          if (!scaleTarget && slotEl.children.length > 1) {
            scaleTarget = slotEl.lastElementChild;
          }
          if (!scaleTarget) scaleTarget = slotEl;

          const measuredHeight = parseInt(actualHeight, 10) || parseInt(gamHeight, 10) || 0;
          if (measuredHeight === 600 || parseInt(gamHeight, 10) === 600) {
            this.markDisplayHeightLock(600, slotEl);
          }

          this._isApplyingDisplayLayout = true;
          try {
            if (parseInt(gamWidth, 10) === 960 && parseInt(gamHeight, 10) === 540) {
              const targetContentHeight = this.getDisplayEffectiveLock(slotEl);
              const computedStyle = window.getComputedStyle(slotEl);
              const paddingX =
                parseFloat(computedStyle.paddingLeft || 0) +
                parseFloat(computedStyle.paddingRight || 0);
              const availableWidth = Math.max(
                (slotEl.clientWidth || this.container.getElement().clientWidth || 320) - paddingX,
                1,
              );
              const scaleFactor = Math.min(1, availableWidth / 960, targetContentHeight / 540);
              const heightState = this.applyDisplayWrapperHeight(slotEl, targetContentHeight, {
                source: reason,
              });

              scaleTarget.style.position = "static";
              scaleTarget.style.top = "";
              scaleTarget.style.left = "";
              scaleTarget.style.right = "";
              scaleTarget.style.margin = "0 auto";
              scaleTarget.style.alignSelf = "center";
              scaleTarget.style.transformOrigin = "top center";
              scaleTarget.style.transform = `scale(${scaleFactor})`;
              scaleTarget.style.width = "960px";
              scaleTarget.style.height = "540px";
              scaleTarget.style.maxWidth = "none";

              slotEl.style.overflow = "hidden";
              slotEl.style.display = "flex";
              slotEl.style.justifyContent = "center";
              slotEl.style.alignItems = "flex-start";

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
              const expectedTotalHeight =
                parseInt(slotEl.dataset.gexpIntextTotalHeight, 10) || 0;
              const currentInlineHeight = parseInt(slotEl.style.height, 10) || 0;
              const currentDisplay = slotEl.style.display || "";
              const expectedDisplay =
                state.gamWidth === 960 && state.gamHeight === 540 ? "flex" : "block";
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
            setTimeout(() => {
              if (!this._displayRenderState || this._displayLayoutGuardEl !== slotEl) return;
              this.applyDisplayRenderLayout(slotEl, {
                ...this._displayRenderState,
                reason: `display_layout_post_guard_${delayMs}ms`,
                skipGuardRefresh: true,
              });
            }, delayMs),
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

        askDisplay(bidResponse) {
          return new Promise((resolve) => {
            this.state = "asking_display";
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

                const hasContent = !event.isEmpty;
                const is1x1 =
                  event.size && event.size[0] === 1 && event.size[1] === 1;
                const renderSize = this.resolveDisplayRenderSizeFromEvent(event, "display_initial_slotRenderEnded");
                const creativeSize = `${renderSize.gamWidth || renderSize.actualWidth || 0}x${renderSize.actualHeight || 0}`;
                this.mergeIntextTelemetry({
                  "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
                  "gexp-intext-creative-size": creativeSize,
                });
                this.flushIntextTelemetryToCI();
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
                      this.mergeIntextTelemetry({
                        "gexp-intext-load-end-distance-px": this.getIntextDistancePx(),
                        "gexp-intext-creative-size": this.getDisplayCreativeSizeFromEvent(event),
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
          this.setupIntextViewportTelemetryObserver();
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

           const renderSize = this.resolveDisplayRenderSizeFromEvent(event, "display_showDisplay");
           const actualCreativeHeight = renderSize.actualHeight;
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
             this.applyDisplayRenderLayout(slotDoc, {
               gamWidth: renderSize.gamWidth,
               gamHeight: renderSize.gamHeight,
               actualHeight: actualCreativeHeight,
               reason: "display_showDisplay",
             });

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
                 currentEl.parentNode.insertBefore(newWrapper, currentEl);
                 currentEl.style.transition = "none";
                 currentEl.style.display = "none";
                 currentEl.remove();
             } else if (this.placement && this.placement.paragraph) {
                 this.placement.paragraph.parentNode.insertBefore(newWrapper, this.placement.paragraph.nextSibling);
             }

             this.container.setElement(newWrapper);
             this.container.isOpen = true;
             this.setupIntextViewportTelemetryObserver();
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
          } catch (err) {
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
        
        onVideoEnded() {
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
          this.state = "idle";
          this.clearDisplayLayoutGuard();
          this.teardownIntextViewportTelemetryObserver();
          this.flushIntextTelemetryToCI({ register: true, reason: "destroy" });
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
          let finalHeight;
          if (lockedHeightOverride && lockedHeightOverride > 1) {
              const chromeHeight =
                typeof this.domNode?.dataset?.wrapperChromeHeight !== "undefined"
                  ? parseInt(this.domNode.dataset.wrapperChromeHeight, 10) || 15
                  : 15;
              finalHeight = (lockedHeightOverride + chromeHeight) + "px";
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
          this.timer = null;
          this.intersectionObserver = null;
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
          if (this.wa && this.wa.cI) {
              this.wa.cI["gexp-intext-is-refresh"] = (trigger === "refresh" || this.node._cycleCount > 0) ? "true" : "false";
              this.wa.cI["gexp-intext-is-fallback"] = (trigger === "fallback" || this._displayRenderState?.isFallback) ? "true" : "false";
              logIntext(`[Intext:Auction:${this.node.id}] Status injected: refresh=${this.wa.cI["gexp-intext-is-refresh"]}, fallback=${this.wa.cI["gexp-intext-is-fallback"]}`);
          }
          if (this.prebidStarted) return;
          this.prebidStarted = true;
          this.node.startIntextTelemetryCycle(trigger);

          // Cleanup: reset fallback state and clear targeting on new auctions
          if (trigger !== "fallback") {
              if (this._displayRenderState) this._displayRenderState.isFallback = false;
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
                this.node.applyDisplayWrapperHeight(videoEl, preservedHeight, {
                  logReason:
                    preservedHeight === 600 ? "display_300x600_visual_height_adjusted" : "",
                  source: "refresh_prepare_video_container",
                });
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
              runPrebid();
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

          if (winner === "video" && this.node.wa && this.node.wa.cI) {
            this.node.wa.cI["gexp-intext-video-failed"] = "true";
            logIntext(`[Intext:Slot:${this.node.id}] gexp-intext-video-failed=true injected into telemetry`);
          }

          if (!this._displayRenderState) this._displayRenderState = {};
          this._displayRenderState.isFallback = true;
          if (winner === "video" && loser === "display") {
            this.node.startIntextTelemetryCycle("fallback", {
              "gexp-intext-is-fallback": "true",
              "gexp-intext-video-failed": "true",
              "gexp-intext-request-type": "display",
            });
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

        getPrebidMultiFormatConfig() {
          const code = this.getPrebidCode();
          const mode = this._effectiveMode;
          const mediaTypes = {};
          let allBids = [];
          let videoMediaType = null;

          // Banner (if mode allows display)
          if (mode === "auto" || mode === "display_only") {
            const sizes = this.getDisplaySizes();
            if (sizes.length) {
              mediaTypes.banner = { sizes };
              const networkId = this.node.scopedContext?.networkId || this.node.manager.networkId;
              const prebidNetworks = this.config.prebid?.networks || {};
              const targetNetwork = prebidNetworks[networkId] || prebidNetworks.default || {};
              allBids = allBids.concat(targetNetwork.bidders || []);              
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
              const networkId = this.node.scopedContext?.networkId || this.node.manager.networkId;
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
              const effectiveVideoBidders = this.enhanceIntextVideoBidders(filteredVideoBidders, vc, videoMediaType, code);
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
          const fullAdSlot = `/${networkId}/${adUnitPath}`;
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
          this._adMediaEl = null;
          this._adMediaCleanup = null;
          this._adMediaDiscoveryTimers = [];
          this._lastAdDuration = null;
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
              if (terminalSource && !markTerminal(terminalSource)) return;
              if (firstFramePlayed) return;
              settle("reject", error);
              setTimeout(() => {
                try { this.destroy(); } catch (e) { /* ignore */ }
              }, 50);
            };

            const isRevealBlocked = () =>
              firstFramePlayed || terminalEvent || terminalHandled || this._aborted || !this.player;

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

              logIntext(`[Intext:Video:IMA] player_adserror - code: ${errCode}, msg: ${errMsg}`);

              if (!firstFramePlayed) {
                 rejectBeforePlayback(new Error(`video_ad_error: [${errCode}] ${errMsg}`), "adserror");
              } else {
                markTerminal("adserror");
              }

              if (this.node && this.node.wa && this.node.wa.cI) {
                  this.node.wa.cI["gexp-intext-video-error-code"] = errCode;
                  this.node.wa.cI["gexp-intext-video-error-msg"] = errMsg;
                  
                  // Track IDs if available even on error
                  const ad = imaErr?.getAd?.() || evt?.getAd?.() || this.player?.ima?.getAdsManager?.()?.getCurrentAd();
                  if (ad) {
                      this.node.wa.cI.campaignId = ad.getAdId();
                      this.node.wa.cI.advertiserId = ad.getAdvertiserName();
                  }

                  if (this.node.manager?.gexp) {
                      this.node.mergeIntextTelemetry({
                        "gexp-intext-video-failed": "true",
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