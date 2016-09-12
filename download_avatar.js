var request = require("request");

const accessToken = "8a5697a464b158e5f4951c26e62f1074af4c53c0";
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

var myArgs = process.argv.slice(2);
if( myArgs.length != 2 ){
  console.log("Error: expected 2 and only 2 arguments, the user/org and the repository");
}
else{
  getRepoContributors( myArgs[0], myArgs[1], (err, result) => {//"lighthouse-labs", "laser_shark",
    console.log("Errors:", err);
    console.log("Result:", JSON.parse(result.body) );
  });
}
