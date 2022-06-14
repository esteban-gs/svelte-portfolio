import { writable } from "svelte/store";

export const profileStore = writable({
  githubProfile: {
    followers: 0,
    following: 0,
    public_repos: 0,
  },
  githubUrl: "",
  linkedInUrl: "",
  location: "",
  profileBackgroundImg: "",
  profileImage: "",
  profileName: "",
});
