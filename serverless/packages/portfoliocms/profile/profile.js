require("dotenv").config({ path: "../../../" });
const { Octokit } = require("@octokit/core");

exports.main = async (args) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const githubprofile = (await octokit.request(`GET /users/${process.env.GITHUB_USERNAME}`, {
    username: 'USERNAME'
  })).data;

  console.log(githubprofile);

  let content = {
    profileName: process.env.PROFILE_NAME,
    linkedInUrl: process.env.LINKED_IN_URL,
    profileImage: process.env.PROFILE_IMAGE,
    githubUrl: process.env.GITHUB_URL,
    location: process.env.LOCATION,
    profileBackgroundImg: process.env.PROFILE_BACKGROUND_IMG,
    githubProfile: {
      public_repos: githubprofile.public_repos,
      followers: githubprofile.followers,
      following: githubprofile.following,
    },
  };
  return { body: content };
};
