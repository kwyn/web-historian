var fs = require('fs');
var path = require('path');
var _ = require('../bower_components/underscore/underscore.js');

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
      return err
    }
    var siteArray = data.split('\n'); 
    cb(siteArray);
  })
};

exports.isUrlInList = function(searchUrl, cb){
  //takes in a url
  //return bool if url is in readLists
  var result;
  readListOfUrls( paths.list, function(urls){
    result = urls;
    cb(result, searchUrl)
  });

};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
  
};

