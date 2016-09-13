var request = require("request");
var constants = require("./constants.js");

console.log( "constants: ", constants );
module.exports = {
    getRepoContributors: function(repoOwner, repoName, cb) {
    var options = {
         url: constants.gitHubAPI + repoOwner + "/" + repoName + "/"
              + constants.contributors,
      headers: {
        'User-Agent': 'request'
      },
       'auth': {
       'user': constants.userName,
       'pass': constants.accessToken,
      }
    }
    console.log( "constants: ", constants );

    request( options, cb );
  }
}


