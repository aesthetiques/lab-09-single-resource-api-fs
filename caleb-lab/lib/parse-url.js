'use strict';

const debug = require('debug')('http:parsel-url');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req){
  debug('#parse-url');
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);//Promise.all will wait for all of the other promises to be complete before it gets handed into the .then block
};
