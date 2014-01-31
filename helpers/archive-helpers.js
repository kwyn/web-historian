var fs = require('fs');
var path = require('path');
var _ = require('../bower_components/underscore/underscore.js');
var http = require('http-get');
var _ = require('underscore');

/* You will need to reuse the same paths many times over in the course of this sprint.
  Consider calling this function in `request-handler.js` and passing in the necessary
  directories/files. This way, if you move any files, you'll only need to change your
  code in one place! Feel free to customize it in any way you wish.
*/

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  for(var type in pathsObj) {
    // Check that the type is valid
    if (exports.paths[type] && pathsObj.hasOwnProperty(type)) {
      exports.paths[type] = pathsObj[type];
    }
  }
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = readListOfUrls = function(path, cb){
  fs.readFile(path, "utf-8", function(err, data){
    if(err){
      return err;
    }
    var siteArray = data.split('\n');
    cb(siteArray);
  });
};

exports.isUrlInList = function(searchUrl, cb){

  var result;
  readListOfUrls( paths.list, function(urls){
    result = urls;
    cb(result, searchUrl);
  });

};

exports.addUrlToList = function(url){
  url = url + "\n";
  fs.appendFile( paths.list, url, "utf-8", function(err){
    if(err){
      console.log("addUrlToList :" + err);
    }
    console.log("added to list!" + url);
  });
};

//reutrns a bool is a URL is archive 
exports.isUrlArchived = function(url, cb){
  fs.readdir(paths.archivedSites, function(err, files){
    if(err){ console.log("isUrlArchived error")};
    cb(files, url);
  });
};

exports.downloadUrls = function(url){

  httpurl = "http://" + url;
  newFilePath = path.join(paths.archivedSites, url);
  fs.writeFile(newFilePath, '', function(err){
    if(err) {console.log("downloadUrls error")}
    getWebsite(httpurl, newFilePath);
  });
};

var getWebsite = function(url, filePath){
  http.get(url, filePath, function(err){
    if(err) {console.log("error fetching site");}
  });
};