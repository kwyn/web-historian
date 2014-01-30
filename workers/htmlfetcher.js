// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers');
var http = require('http-get');

exports.getWebsite= function(url, filePath){
  http.get(url, filePath, function(err){
    if(err) {console.log("erro fetching site" + err);}
  });
}