// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers.js');
var path = require('path');
//something that takes an array, sifts through to array to see if that website is archived
var paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};
archive.readListOfUrls(paths.list, function(array){
  for(var i = 0; i<array.length ; i++){
    archive.isUrlArchived(array[i], function(array, url){
      if(array.indexOf(url) === -1){
        archive.downloardUrls(url);
      }
    });
  }
});
