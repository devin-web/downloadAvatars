var request = require("request");
var fs = require("fs");
var constants = require("./constants.js");
var getContributors = require( "./getContributors.js" );
var getImages = require( "./downloadImages.js" );

var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) {
      throw e;
    }
    else {
      console.log(path, " already exists, folder will be used to store avatars");
    }
  }
}

main();

function main(){
  var myArgs = process.argv.slice(2);
  if( myArgs.length !== 2 ){
    console.log("Error: expected 2 and only 2 arguments, the user/org and the repository");
  }
  else if(  process.env.GITHUB_API_TOKEN === undefined ||
            process.env.GITHUB_USER === undefined ){
    console.log(".env doesn't exist or is not readable for key(GIT_HUB_API_TOKEN). " );
  }
  else{
    getContributors.getRepoContributors( myArgs[0], myArgs[1], (err, result) => {//"lighthouse-labs", "laser_shark",
      if(err){
        console.log("Errors: ", err);
      }
      else {
        var parsedBody = JSON.parse(result.body);
        if( parsedBody.message === "Bad credentials" ){
          console.log("Fatal error: bad credentials");
        }
        else if( parsedBody.message === "Not Found"){
          console.log( "Fatal error: repository or user not found" );
        }
        else {
          mkdirSync( "./avatars" );

          console.log( "Downloaing", parsedBody.length, "avatars..." );
          for( var i = 0; i < parsedBody.length; i++){
            //url contains the (unique) user name in the last position
            var fileParts = parsedBody[i].url.split("/");
            var filename = fileParts[fileParts.length-1];
            getImages.downloadImageByURL(
              parsedBody[i].avatar_url, "./avatars/" + filename );
          }
          console.log("Completed download of avatars to avatars directory");
        }
      }
    });
  }
}


