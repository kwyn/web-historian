var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  fs.readFile(__dirname + "/public/index.html", "utf-8", function(err, data){
    if(err){
      throw err
    }
    res.write(data);
    res.end();
  });
};

exports.sendResponse = sendResponse = function(status, res, data){
  res.writeHead(status, headers);
  res.end(data);
};
// As you progress, keep thinking about what helper functions you can put here!

