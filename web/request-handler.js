var path = require('path');
var url = require('url')
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(req.url)
  methods[req.method](res, req.url);
  // res.end(archive.paths.list);
};

var methods = {
  GET: helpers.serveAssets,
};