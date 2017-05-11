'use strict';
const RELATIVE_URL = '@@RELATIVE';
const url = require('url');

module.exports = function getFullUrl(req, urlStr) {
  if (urlStr.substring(0, RELATIVE_URL.length) === RELATIVE_URL) {
    const addr = url.format({
      protocol: req.protocol,
      host: req.get('host')
    });
    return addr + urlStr.substring(RELATIVE_URL.length);
  }
  return urlStr;
};
