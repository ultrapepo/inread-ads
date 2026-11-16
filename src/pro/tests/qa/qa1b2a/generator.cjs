'use strict';
const crypto = require('node:crypto');
const {CORES} = require('../qa1b/packet.cjs');
const {facade} = require('./facade.cjs');
const capabilities = new WeakMap();
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const variable = distribution => `__qa1b2a_${distribution.replace(/[^a-z0-9]/gi,'_').toLowerCase()}_${CORES[distribution].slice(0, 12)}`;
function method(source, className, name) {
  const classStart = source.indexOf(`class ${className} `);
  if (classStart < 0) throw new Error(`class-missing:${className}`);
  const nextClass = source.indexOf('\nclass ', classStart + 1);
  const re = new RegExp(`^  (?:async )?${name}\\(`, 'gm');
  re.lastIndex = classStart;
  const match = re.exec(source);
  if (!match || (nextClass >= 0 && match.index > nextClass)) throw new Error(`method-missing:${className}.${name}`);
  const endMatch = /\r?\n  \}(?=\r?\n|$)/g;
  endMatch.lastIndex = match.index;
  const end = endMatch.exec(source);
  if (!end) throw new Error('method-end-missing');
  return {start:match.index, end:end.index + end[0].length, text:source.slice(match.index, end.index + end[0].length)};
}
function build(distribution, base) {
  if (!Object.hasOwn(CORES, distribution) || !Buffer.isBuffer(base) || hash(base) !== CORES[distribution]) throw new Error('unapproved-base-hash');
  const source = base.toString('utf8'), q = variable(distribution), edits = [];
  function edit(cls, name, changes) {
    const m = method(source, cls, name); let text = m.text;
    for (const [from, to] of changes) {
      if (text.split(from).length !== 2) throw new Error(`anchor-not-exactly-once:${cls}.${name}:${from}`);
      text = text.replace(from, to);
    }
    edits.push({className:cls, method:name, start:m.start, end:m.end, before:m.text, after:text, anchorSha256:hash(m.text)});
  }
  const N='IntextNode', V='IntextVideoCreative', E='IntextPlacementEngine';
  // Resolve the owning class inside the hash-locked source, not a name supplied by JSON.
  const wi = source.lastIndexOf('\nclass ', source.indexOf('  async startFetch(trigger)'));
  const wf = /^\nclass (\w+)/.exec(source.slice(wi))[1];
  edit(E,'constructor', [['    this.articleBody = searchRoot.querySelector(bodySelector);', `    this.articleBody = searchRoot.querySelector(bodySelector);\n    ${q}.tap('root', this, document, this.articleBody);`]]);
  edit(E,'findPlacements', [['    return placements;', `    return ${q}.value('placements', placements, this);`]]);
  edit(N,'constructor', [['    this._intextPipPlaybackSource = "unresolved";', `    this._intextPipPlaybackSource = "unresolved";\n    ${q}.tap('node', this, manager, placement, document, navIndex);`]]);
  edit(N,'getIntextTelemetryElement', [
    ['return this.telemetryAnchor;', `return ${q}.value('anchor', this.telemetryAnchor, this);`],
    ['return this.placement.paragraph;', `return ${q}.value('anchor', this.placement.paragraph, this);`],
    ['return videoEl || displayEl;', `return ${q}.value('anchor', videoEl || displayEl, this);`],
    ['return displayEl || videoEl;', `return ${q}.value('anchor', displayEl || videoEl, this);`],
    ['return null;', `return ${q}.value('anchor', null, this);`]
  ]);
  edit(N,'startIntextTelemetryCycle', [['    this._intextTelemetryCycleId += 1;', `    this._intextTelemetryCycleId += 1;\n    ${q}.tap('cycle', this, this._intextTelemetryCycleId);`]]);
  edit(N,'beginVisualRender', [['    this._activeRenderToken = this._renderTokenSeq;', `    this._activeRenderToken = this._renderTokenSeq;\n    ${q}.tap('token', this, this._activeRenderToken);`]]);
  edit(N,'invalidateVisualCallbacks', [['    this._activeRenderToken = this._renderTokenSeq;', `    this._activeRenderToken = this._renderTokenSeq;\n    ${q}.tap('invalidate', this);`]]);
  const readiness = method(source,N,'getReadinessViewportState');
  const returns = [...readiness.text.matchAll(/return (\{[\s\S]*?\});/g)].map(m=>m[1]);
  if (returns.length !== 3) throw new Error('readiness-return-anchor-count');
  edit(N,'getReadinessViewportState', returns.map(v=>[`return ${v};`, `return ${q}.result(${v}, this, anchor);`]));
  edit(N,'waitForViewport', [['      const state = this.getReadinessViewportState();', `      const state = this.getReadinessViewportState();\n      ${q}.tap('wait', this, renderToken, source, owner, state);`]]);
  edit(N,'buildAndPlayVideo', [['    this.activeCreative = creative;', `    this.activeCreative = creative;\n    ${q}.tap('creative', this, creative, renderToken);`]]);
  edit(wf,'startFetch', [
    ['    const fetchGeneration = this._fetchGeneration = (this._fetchGeneration || 0) + 1;', `    const fetchGeneration = this._fetchGeneration = (this._fetchGeneration || 0) + 1;\n    ${q}.tap('fetch-begin', this, this.node, fetchGeneration);`],
    ['    this.node.startIntextTelemetryCycle(trigger);', `    this.node.startIntextTelemetryCycle(trigger);\n    ${q}.tap('fetch', this, this.node, fetchGeneration);`],
    ['        ...decision,\r\n      };', `        ...decision,\r\n      };\n      ${q}.tap('winner', this, this.node, fetchGeneration, this.pendingAuction);`]
  ]);
  edit(wf,'startAuction', [['    this.node.startIntextTelemetryCycle(trigger);', `    this.node.startIntextTelemetryCycle(trigger);\n    ${q}.tap('legacy-auction', this, this.node);`]]);
  edit(wf,'cleanup', [['    this._fetchGeneration = (this._fetchGeneration || 0) + 1;', `    this._fetchGeneration = (this._fetchGeneration || 0) + 1;\n    ${q}.tap('cleanup', this, this.node);`]]);
  edit(wf,'setupVideoPreparation', [
    ['    this._videoPreparation = entry;', `    this._videoPreparation = entry;\n    ${q}.tap('preparation', this, this.node, auction, entry);`],
    ['      entry.generation++; clearTimeout(entry.leaseTimer);', `      entry.generation++; ${q}.tap('retire-entry', this, this.node, entry, entry.generation); clearTimeout(entry.leaseTimer);`],
    ['      const generation = ++entry.generation;', `      const generation = ++entry.generation;\n      ${q}.tap('entry-start', this, this.node, entry, generation);`],
    ['      entry.creative = creative;', `      entry.creative = creative;\n      ${q}.tap('prepared-creative', this, this.node, entry, creative, generation);`]
  ]);
  edit(wf,'claimVideoPreparation', [['    entry.boundToken = renderToken; entry.state = "RENDER_OWNED";', `    entry.boundToken = renderToken; entry.state = "RENDER_OWNED";\n    ${q}.tap('handoff', this, this.node, entry, renderToken);`]]);
  edit(V,'activate', [
    ['!node.getReadinessViewportState().eligible', `!${q}.final(node.getReadinessViewportState(), node, this).eligible`],
    ['    this.createPlayerForActivation();', `    ${q}.tap('player-build', node, this);\n    this.createPlayerForActivation();`]
  ]);
  edit(V,'destroy', [['    this._destroyed = true;', `    this._destroyed = true;\n    ${q}.tap('retire-creative', this.node, this);`]]);
  edit(V,'abort', [['    this._aborted = true;', `    this._aborted = true;\n    ${q}.tap('retire-creative', this.node, this);`]]);
  edits.sort((a,b)=>a.start-b.start);
  for(let i=1;i<edits.length;i++) if(edits[i-1].end>edits[i].start) throw new Error('overlapping-edits');
  const prefix=`// QA1-B II-A: INERT. No runtime endpoint or installation path.\nconst ${q} = (${facade.toString()})(null);\n`;
  let copy=source;
  for(const e of [...edits].reverse()) copy=copy.slice(0,e.start)+e.after+copy.slice(e.end);
  copy=prefix+copy;
  const manifest={schema:'qa1b-stage2a-copy-v1',distribution,baseSha256:hash(base),copySha256:hash(copy),baseBytes:base.length,copyBytes:Buffer.byteLength(copy),endpoint:'null',prefix,edits};
  return {copy:Buffer.from(copy),manifest};
}
function restore(copy, manifest) {
  if(hash(copy)!==manifest.copySha256 || !copy.toString('utf8').startsWith(manifest.prefix)) throw new Error('copy-diverged');
  let text=copy.toString('utf8').slice(manifest.prefix.length);
  for(const e of manifest.edits) {
    const start=e.start;
    if(text.slice(start,start+e.after.length)!==e.after)throw new Error('reverse-anchor-diverged');
    text=text.slice(0,start)+e.before+text.slice(start+e.after.length);
    // previous edits are restored, so original offsets apply on every iteration
  }
  const base=Buffer.from(text);
  if(hash(base)!==manifest.baseSha256 || hash(base)!==CORES[manifest.distribution]) throw new Error('reverse-base-diverged');
  return base;
}
function verifyCopy(distribution, base, copy) {
  const expected=build(distribution,base);
  if(!Buffer.isBuffer(copy)||!copy.equals(expected.copy))throw new Error('unverified-copy');
  const capability=Object.freeze(Object.create(null));
  capabilities.set(capability,Object.freeze({distribution,coreSha256:hash(base),copySha256:hash(copy)}));
  return capability;
}
function describe(capability) {const proof=capabilities.get(capability);if(!proof)throw new TypeError('native-build-capability-required');return proof;}
module.exports={build,restore,verifyCopy,describe,method,variable,hash};
