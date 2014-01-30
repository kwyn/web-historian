var fs = require('fs');
var path = require('path');
var _ = require('../bower_components/underscore/underscore.js');
var http = require('http-get');
var htmlfetcher = require('../workers/htmlfetcher.js');

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
  //takes in a url
  //return bool if url is in readLists
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

exports.isURLArchived = function(){
};

exports.downloadUrls = function(url){
  httpurl = "http://" + url;
  newFilePath = path.join(paths.archivedSites, url);
  fs.writeFile(newFilePath, '', function(err){
    if(err) {console.log("writeFile :" )}
    htmlfetcher.getWebsite(httpurl, newFilePath);
  });
//   http.get(httpurl, newFilePath, function(err){
//     if(err) {console.log("erro fetching site" + err);}
//   });
// //   console.log("http.get "+ url);
//   http.get({
//     url: url,
//     progress: function (current, total) {
//       console.log('downloaded %d bytes from %d', current, total);
//     }
//     }, paths.archivedSites, function (err, res) {
//       if (err) {
//         console.error(err);
//       return;
//     }
//     // console.log(res.code, res.headers, res.file);
// });

//   http.get(url, path.archivedSites, function(err){
//     if(err) {console.log("erro fetching site");}
//   });
};

