var request = require("request");
var fs = require("fs");
var constants = require("./constants.js");
var getContributors = require( "./getContributors.js" );
var getImages = require( "./downloadImages.js" );




var myArgs = process.argv.slice(2);
if( myArgs.length !== 2 ){
  console.log("Error: expected 2 and only 2 arguments, the user/org and the repository");
}
else{
  getContributors.getRepoContributors( myArgs[0], myArgs[1], (err, result) => {//"lighthouse-labs", "laser_shark",
    if(err){
      console.log("Errors:", err);
    }
    var parsedBody = JSON.parse(result.body);
    for( var i = 0; i < parsedBody.length; i++){
      var fileParts = parsedBody[i].avatar_url.split("/");
      var fileParts2 = fileParts[fileParts.length-1].split("?");
      var filename = fileParts2[0];
      getImages.downloadImageByURL( parsedBody[i].avatar_url, "./avatars/" + filename );
    }
  });
}


