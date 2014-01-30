var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('url');


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  if(asset.url === "/"){
    fs.readFile( path.join(__dirname, "public", "index.html"), "utf-8", function(err, data){
      sendResponse(err, data, 200, res);
    } );
  }else if(asset.url === '/styles.css' || asset.url === '/favicon.ico'){
    fs.readFile(__dirname + "/public" + asset.url, "utf-8", function(err, data){
      sendResponse(err, data, 200, res);
    });
  }else{
    fs.readFile( path.join(__dirname, "../archives", "sites", asset.url), "utf-8", function(err, data){
      sendResponse(err, data, 200, res);
    });
  }
};


exports.postReq = postReq = function(res, req){
  
  var reqUrl = '';

  req.on('data', function(chunk) {
    reqUrl += chunk;
  });

  req.on('end', function(){
    
    if( archive.isUrlInList(reqUrl) ){
      console.log('inhurr');
    }else{
      fs.readFile( path.join(__dirname, "public", "loading.html"), "utf-8", function(err, data){
        sendResponse(err, data, 302,res);
      } );
    }
  //   console.log(reqUrl.substring(4))
    
  //   fs.appendFile( path.join(__dirname,"../archives", "sites.txt"), reqUrl.substring(4)+ "\n", function(err){
  //     if(err){
  //       console.log(err);
  //     }
  //   } );
  //   console.log(reqUrl);
  // });
  
  });
};

exports.sendResponse = sendResponse = function(err, data, status, res){
  if(err){
    res.writeHead(404, headers);
    res.end('Nothing here...');
    console.log(err);
  }else{
    res.writeHead(status, headers);
    res.end(data);
  }
};
// As you progress, keep thinking about what helper functions you can put here!

