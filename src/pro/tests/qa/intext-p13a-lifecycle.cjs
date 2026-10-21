/* QA-only lifecycle experiment. Never imported by either production distribution. */
(function(scope) {
  function optionsFromSource(source, creative) {
    const begin = source.indexOf('          const options = {', source.indexOf('  requestAds() {'));
    const end = source.indexOf('          this.player.ima(options);', begin);
    if (begin < 0 || end < 0) throw new Error('Current IMA options markers unavailable');
    return new Function('controls','preloadEnabled','adTag',source.slice(begin,end)+'return options;')
      .call(creative,creative.resolveVideoControlsConfig(),creative.config?.video?.imaPreload?.enabled !== false,
        creative.vastXml ? null : creative.getVideoTagUrl());
  }
  function install(creative, { variant, source, sdk, record, eligible }) {
    if (!['A','B','C'].includes(variant)) throw new Error('Unknown lifecycle variant');
    const originalPrepare = creative.preparePlayer, originalRequest = creative.requestAds;
    const restore = []; let activated = false, initialized = false;
    const pending = [];
    function flush() { for (const operation of pending.splice(0)) operation(); }
    if (variant === 'B') creative.preparePlayer = async function() {
      await this.ensureDependencies();
      if (!this.preparationValid()) throw new Error('stale_render_token');
      this._prepared = true; record('qa-dependencies-only-prepared');
    };
    if (variant === 'C') creative.preparePlayer = async function() {
      await originalPrepare.call(this);
      if (!this.preparationValid()) throw new Error('stale_render_token');
      if (!this.player) throw new Error('QA C requires archived player preparation; unavailable in dependencies-only P1.3b');
      const prototype = sdk().AdsLoader?.prototype, original = prototype?.requestAds;
      if (typeof original !== 'function') throw new Error('QA C cannot safely gate AdsLoader.requestAds');
      const gated = function(...args) {
        if (!activated) { record('qa-sdk-request-deferred'); pending.push(() => original.apply(this,args)); return; }
        return original.apply(this,args);
      };
      prototype.requestAds = gated;
      if (prototype.requestAds !== gated) throw new Error('QA C SDK request gate unavailable');
      restore.push(() => { if (prototype.requestAds === gated) prototype.requestAds = original; });
      await new Promise(resolve => this.player.ready(resolve));
      if (!this.preparationValid()) throw new Error('stale_render_token');
      const player = this.player, trigger = player.trigger, play = player.play;
      player.play = function(...args) {
        if (!activated) throw new Error('QA C playback forbidden before activation');
        return play.apply(this,args);
      };
      restore.push(() => { player.play = play; });
      player.trigger = function(event,...args) {
        if (!activated && (typeof event === 'string' ? event : event?.type) === 'ads-request') {
          record('qa-plugin-request-event-deferred'); pending.push(() => trigger.call(this,event,...args)); return;
        }
        return trigger.call(this,event,...args);
      };
      restore.push(() => { player.trigger = trigger; });
      sdk().settings?.setVpaidMode?.(sdk().ImaSdkSettings.VpaidMode.INSECURE);
      const options = optionsFromSource(source,this);
      this.player.ima(options); initialized = true;
      const plugin = this.player.ima;
      const reused = Object.assign(function(next) {
        if (JSON.stringify(options) !== JSON.stringify(next)) throw new Error('QA C IMA options changed');
        record('qa-ima-init-reused');
      },plugin);
      const initialize = plugin.initializeAdDisplayContainer;
      reused.initializeAdDisplayContainer = function(...args) {
        if (!eligible() || !creative.preparationValid()) throw new Error('QA activation ineligible');
        const result = initialize.apply(plugin,args); activated = true; flush(); return result;
      };
      this.player.ima = reused;
      record('qa-ima-prepared', { initializationCount:1, advertisingGateOpen:false });
    };
    creative.requestAds = async function() {
      if (!eligible() || !this.preparationValid()) throw new Error('QA activation ineligible');
      record('qa-lifecycle-activation', { variant, initialized });
      if (variant === 'B') await originalPrepare.call(this);
      return originalRequest.call(this);
    };
    return () => { pending.length = 0; for (const undo of restore.reverse()) undo();
      creative.preparePlayer = originalPrepare; creative.requestAds = originalRequest; };
  }
  const api = {install,optionsFromSource};
  if (typeof module !== 'undefined') module.exports = api; else scope.IntextP13Lifecycle = api;
})(typeof window !== 'undefined' ? window : globalThis);
