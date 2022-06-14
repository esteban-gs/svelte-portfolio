<script>
  import { navigate } from "svelte-routing";

  const navigateToContactForm = () => {
    navigate("/contact-me");
  };

  navigateToContactForm;
</script>

<main id="grad1" class="pt-24">
  <section class="relative block">
    <div class="container mx-auto px-4">
      <div class="items-center flex flex-wrap mt-24 mb-24">
        <div class="w-full md:w-4/12 ml-auto mr-auto px-4">
          <img
            alt="..."
            class="max-w-full rounded-lg shadow-lg"
            src="https://images.unsplash.com/photo-1654479087295-6daa348754d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1794&q=80"
          />
        </div>
        <div class="w-full md:w-5/12 ml-auto mr-auto px-4 mb-24 pb-2">
          <div class="md:pr-12">
            <div
              class="text-red-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-red-300"
            >
              <i class="fas fa-rocket text-xl" />
            </div>
            <h3 class="text-3xl font-semibold">Woops!</h3>
            <p class="mt-4 text-lg leading-relaxed text-blueGray-500">
              My site is experiencing technical issues at the moment.
            </p>
            <ul class="list-none mt-6">
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span
                      class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200 mr-3"
                    >
                      <i class="fas fa-paper-plane" />
                    </span>
                  </div>
                  <div>
                    <button
                      class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      on:click={navigateToContactForm}
                    >
                      Want to get in touch with me?
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  #grad1 {
    background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #6f4547);
  }
</style>
