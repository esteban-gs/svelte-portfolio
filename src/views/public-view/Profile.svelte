<script>
  // core components
  import { APP_CMS } from "app-configs";
  import axios from "axios";

  import ProfileTitle from "parts/Profile/ProfileTitle.svelte";
  import ProfileUniversity from "parts/Profile/ProfileUniversity.svelte";
  import ProfileBio from "parts/Profile/ProfileBio.svelte";

  import { writable } from "svelte/store";
  import { profileStore } from "stores/ProfileStore.js";

  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  const authLinks = {
    githubUrl: "",
    linkedInUrl: "",
  };

  const profileName = writable("");
  const profileImg = writable("");
  const profileLocation = writable("");
  const profileBackgroundImg = writable("");
  const profileTitle = writable("");
  const profileBio = writable("");
  const profileEducation = writable("");
  const profileUniversity = writable("");

  let githubMetrics = [];

  const navigateToContactForm = () => {
    navigate("/contact-me");
  };

  onMount(async () => {
    let { data, status } = await axios.get(APP_CMS);
    const profile = data;
    status = 200;
    if (status !== 200) {
      console.log("not ok");
      navigate("/woops", { replace: true });
    }

    $profileStore = { ...profile };

    profileName.set(profile.profileName);
    profileImg.set(profile.profileImage);
    profileLocation.set(profile.location);
    profileBackgroundImg.set(profile.profileBackgroundImg);
    profileTitle.set(profile.profileTitle);
    profileBio.set(profile.profileBio);
    profileEducation.set(profile.profileEducation);
    profileUniversity.set(profile.profileUniversity);

    authLinks.githubUrl = profile.githubUrl;
    authLinks.linkedInUrl = profile.linkedInUrl;

    const { public_repos, following, followers } = profile.githubProfile;

    githubMetrics = [
      { name: "Repos", count: public_repos },
      { name: "Following", count: following },
      { name: "Followers", count: followers },
    ];
  });

</script>

<div>
  <main class="profile-page">
    <section class="relative block h-500-px">
      <div
        class="absolute top-0 w-full h-full bg-center bg-cover"
        style="
          background-image: url({$profileBackgroundImg});
        "
      >
        <span
          id="blackOverlay"
          class="w-full h-full absolute opacity-50 bg-black"
        />
      </div>
      <div
        class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
        style="transform: translateZ(0);"
      >
        <svg
          class="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            class="text-blueGray-200 fill-current"
            points="2560 0 2560 100 0 100"
          />
        </svg>
      </div>
    </section>
    <section class="relative py-16 bg-blueGray-200">
      <div class="container mx-auto px-4">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
        >
          <div class="px-6">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div class="relative">
                  <img
                    alt="..."
                    src={$profileImg}
                    class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  />
                </div>
              </div>
              <div
                class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
              >
                <div class="py-6 px-3 mt-32 sm:mt-0">
                  <button
                    class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    on:click={navigateToContactForm}
                  >
                    Connect
                  </button>
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4 lg:order-1">
                <div class="flex justify-center py-4 lg:pt-4 pt-8">
                  {#each githubMetrics as { name, count }}
                    <div class="mr-4 p-3 text-center">
                      <span
                        class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                      >
                        {count}
                      </span>
                      <i
                        class="lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg"
                      />
                      <span class="text-sm text-blueGray-400">{name}</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
            <div class="text-center mt-12">
              <h3
                class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
              >
                {$profileName}
              </h3>
              <div
                class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
              >
                <i
                  class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
                />
                {$profileLocation}
              </div>

              <ProfileTitle
                title={$profileTitle}
                education={$profileEducation}
              />

              <ProfileUniversity university={$profileEducation} />
            </div>

            <ProfileBio bio={$profileBio} />
          </div>
        </div>
      </div>
    </section>
  </main>
</div>
