<script>
  import { onMount } from "svelte";
  import { RECAPTCHA_KEY } from "../app-configs";

  const RECAPTCHA_FORM_ID = "recaptcha-form;";

  const renderReCaptcha = () => {
    window.grecaptcha.render(RECAPTCHA_FORM_ID, {
      sitekey: RECAPTCHA_KEY,
    });
  };
</script>


<svelte:window on:load={renderReCaptcha} />

<style>
  .grecaptcha-badge { visibility: hidden; }
</style>
<div>
  <main>
    <section class="relative block py-24 lg:pt-30 bg-blueGray-800">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center">
          <div class="w-full lg:w-6/12 px-4">
            <div
              class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200"
            >
              <div class="flex-auto p-5 lg:p-10">
                <h4 class="text-2xl font-semibold">Want to work with me?</h4>
                <p class="leading-relaxed mt-1 mb-4 text-blueGray-500">
                  Complete this form and I will get back to you in 24 hours.
                </p>
                <div class="relative w-full mb-3 mt-8">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="full-name"
                  >
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Full Name"
                  />
                </div>

                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                  />
                </div>

                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    cols="80"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Type a message..."
                  />
                </div>
                <div class="text-center mt-6">
                  <div id={RECAPTCHA_FORM_ID} style="width: auto;" />
                </div>
                <div class="text-center mt-6">
                  <button
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>
