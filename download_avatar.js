var request = require("request");
var fs = require("fs");
require('dotenv').config();

const accessToken = process.env.GITHUB_API_TOKEN;
const userName = "devin-web";

const gitHubAPI = "https://api.github.com/repos/";
const contributors = "contributors";

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
         url: gitHubAPI + repoOwner + "/" + repoName + "/" + contributors,
      headers: {
        'User-Agent': 'request'
      },
       'auth': {
       'user': userName,
       'pass': accessToken,
      }
    }
    request( options, cb );

}


function downloadImageByURL(url, filePath) {
  var options = {
     url: url,
  headers: {
    'User-Agent': 'request'
    },
   'auth': {
   'user': userName,
   'pass': accessToken,
    }
  }
  var extension  = "";
  var noErrors = true;
  var req = request( options, function saveFile(err, data){
    if(err){
      console.log(err);
      noErrors = false;
    }
    else {
      writeFileOutWithExtension( data.headers['content-type'].split('/')[1] );
    }
  });

  var streamOut = fs.createWriteStream(filePath);

  req.pipe(streamOut);

  function writeFileOutWithExtension( extension ){
    fs.renameSync(filePath, filePath+"."+extension);
  }
}

var myArgs = process.argv.slice(2);
if( myArgs.length !== 2 ){
  console.log("Error: expected 2 and only 2 arguments, the user/org and the repository");
}
else{
  getRepoContributors( myArgs[0], myArgs[1], (err, result) => {//"lighthouse-labs", "laser_shark",
    console.log("Errors:", err);
    var parsedBody = JSON.parse(result.body);
    for( var i = 0; i < parsedBody.length; i++){
      var fileParts = parsedBody[i].avatar_url.split("/");
      var fileParts2 = fileParts[fileParts.length-1].split("?");
      var filename = fileParts2[0];
      downloadImageByURL( parsedBody[i].avatar_url, "./avatars/" + filename );
    }
  });
}


