'use strict';
// Offline HAR comparison only: no requests, auctions, targeting writes or random authority changes.
const fs = require('node:fs');
function videoRequests(har) {
  return (har.log?.entries || []).filter(entry => {
    try { const url=new URL(entry.request.url); return url.pathname==='/gampad/ads' && url.searchParams.get('env')==='vp'; }
    catch { return false; }
  }).map(entry => {
    const url=new URL(entry.request.url), parameters=Object.fromEntries(url.searchParams);
    delete parameters.correlator; // Only normalize this known volatile value; preserve random and commercial parameters.
    const targeting=Object.fromEntries(new URLSearchParams(parameters.cust_params || ''));
    delete parameters.cust_params;
    return {startedAt:entry.startedDateTime,status:entry.response?.status,durationMs:entry.time,
      parameters,targeting,response:entry.response?.content || null};
  });
}
function differences(left,right) {
  return [...new Set([...Object.keys(left),...Object.keys(right)])].sort().flatMap(key =>
    JSON.stringify(left[key])===JSON.stringify(right[key]) ? [] : [{key,left:left[key]??null,right:right[key]??null}]);
}
module.exports={videoRequests,differences};
if(require.main===module) {
  const [left,right]=process.argv.slice(2);
  if(!left || !right) throw new Error('Usage: node intext-p13a-targeting.cjs production.har fiddler.har');
  const a=videoRequests(JSON.parse(fs.readFileSync(left,'utf8'))),b=videoRequests(JSON.parse(fs.readFileSync(right,'utf8')));
  console.log(JSON.stringify({production:a,fiddler:b,note:'Select matching initial video requests before comparing; no creative equivalence inferred.',
    firstRequestDifferences:a[0]&&b[0]?{parameters:differences(a[0].parameters,b[0].parameters),targeting:differences(a[0].targeting,b[0].targeting)}:null},null,2));
}
