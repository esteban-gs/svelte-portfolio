require("dotenv").config({ path: "../../../" });

exports.main = (args) => {
  let content = {
    profileName: process.env.PROFILE_NAME,
    linkedInUrl: process.env.LINKED_IN_URL,
    profileImage: process.env.PROFILE_IMAGE,
    githubUrl: process.env.GITHUB_URL,
    location: process.env.LOCATION,
    profileBackgroundImg: process.env.PROFILE_BACKGROUND_IMG,
  };
  return { body: content };
};
