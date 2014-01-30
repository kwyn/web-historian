var path = require('path');
var url = require('url')
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
    methods[req.method](res, req);
};

var methods = {
  GET: helpers.serveAssets,
  POST: helpers.postReq,
  OPTIONS: helpers.option
};