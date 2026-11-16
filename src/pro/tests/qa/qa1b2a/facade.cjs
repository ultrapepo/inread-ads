'use strict';
// This function is serialized verbatim into each QA copy. Delivery always uses null.
// The only enabled use in II-A is lexical injection into isolated offline methods.
function facade(endpoint) {
  function tap(...args) { try { if (endpoint) endpoint(...args); } catch (_) { /* observation cannot affect the caller */ } }
  function value(kind, value, ...args) { tap(kind, ...args, value); return value; }
  function result(value, node, anchor) { tap('result', node, anchor, value); return value; }
  function final(value, node, creative) { tap('control', node, 'C1', creative, value); return value; }
  return Object.freeze({tap, value, result, final});
}
module.exports = {facade};
