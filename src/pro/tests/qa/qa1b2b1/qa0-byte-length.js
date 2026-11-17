'use strict';
function utf8ByteLength(value, encoding = 'utf8') {
  if (typeof value !== 'string' || !['utf8', 'utf-8'].includes(encoding)) throw new TypeError('utf8-string-only');
  return new TextEncoder().encode(value).byteLength;
}
if (typeof module !== 'undefined') module.exports = {utf8ByteLength};
