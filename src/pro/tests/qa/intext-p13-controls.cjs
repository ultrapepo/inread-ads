/* QA only. No auction, cache fetch, impression request or SDK invocation here. */
(function (scope) {
  const sampleTag = 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&correlator=';
  function variantTag(variant, tag, qaInventory) {
    if (variant === 'A') return sampleTag;
    if (!qaInventory) throw new Error('GAM controls require explicitly confirmed QA inventory');
    const url = new URL(tag);
    if (url.protocol !== 'https:' || !['pubads.g.doubleclick.net', 'securepubads.g.doubleclick.net'].includes(url.hostname)
      || url.pathname !== '/gampad/ads') throw new Error('Expected GAM HTTPS video tag');
    if (!['B', 'C-with', 'C-without'].includes(variant)) throw new Error('Unknown variant');
    if (variant !== 'C-without') return tag; // Exact original, no new correlator or targeting.
    const params = new URLSearchParams(url.searchParams.get('cust_params') || '');
    for (const key of [...params.keys()]) if (key.startsWith('hb_')) params.delete(key);
    url.searchParams.set('cust_params', params.toString());
    return url.href;
  }
  function harTimeline(har) {
    const entries = har?.log?.entries;
    if (!Array.isArray(entries)) throw new Error('Expected HAR log.entries');
    return entries.map(entry => {
      let resource; try { const url = new URL(entry.request.url); resource = url.origin + url.pathname; } catch { resource = 'invalid-url'; }
      const content = entry.response?.content || {};
      const text = content.encoding === 'base64'
        ? (typeof Buffer !== 'undefined' ? Buffer.from(content.text || '', 'base64').toString('utf8') : atob(content.text || ''))
        : content.text || '';
      const vast = /<(?:\w+:)?VAST(?:\s|>)/i.test(text);
      const wrappers = [...text.matchAll(/<(?:\w+:)?VASTAdTagURI[^>]*>([\s\S]*?)<\/(?:\w+:)?VASTAdTagURI>/gi)].map(match => {
        const target = match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&amp;/g, '&').trim();
        try { const url = new URL(target); return url.origin + url.pathname; } catch { return 'invalid-wrapper-uri'; }
      });
      return { startedAt: entry.startedDateTime, durationMs: entry.time ?? null,
        status: entry.response?.status ?? null, resource, timings: entry.timings || null,
        responseBodyAvailable: typeof content.text === 'string', vast,
        wrapperResources: wrappers, hasInline: /<(?:\w+:)?InLine(?:\s|>)/i.test(text),
        emptyVastObserved: vast && !/<(?:\w+:)?Ad(?:\s|>)/i.test(text),
        // These are captured responses, not proof of SDK parsing or cache expiry.
        bodyValidation: 'markup-only', error: entry._error || null };
    });
  }
  const api = { sampleTag, variantTag, harTimeline };
  if (typeof module !== 'undefined') module.exports = api;
  else scope.IntextP13Controls = api;
})(typeof window !== 'undefined' ? window : globalThis);
