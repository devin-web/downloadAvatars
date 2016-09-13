var request = require("request");
var constants = require("./constants.js");
var fs = require("fs");

module.exports = {
  downloadImageByURL: function (url, filePath) {
    var options = {
       url: url,
    headers: {
      'User-Agent': 'request'
      },
     'auth': {
     'user': constants.userName,
     'pass': constants.accessToken,
      }
    }
    var req = request( options, function saveFile(err, data){
      if(err){
        console.log(err);
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
}
