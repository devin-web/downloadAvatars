require('dotenv').config();

myConstants = {
  accessToken: process.env.GITHUB_API_TOKEN,
  userName: "devin-web",

  gitHubAPI: "https://api.github.com/repos/",
  contributors: "contributors"
}

module.exports = myConstants;
