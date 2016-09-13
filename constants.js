require('dotenv').config();

myConstants = {
  accessToken: process.env.GITHUB_API_TOKEN,
  userName: process.env.GITHUB_USER,

  gitHubAPI: "https://api.github.com/repos/",
  contributors: "contributors"
}

module.exports = myConstants;
