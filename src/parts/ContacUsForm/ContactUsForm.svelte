<script>
  import {
    RECAPTCHA_KEY,
    EMAIL_JS_KEY,
    EMAIL_JS_SERVICE_ID,
  } from "app-configs";
  import emailjs from "emailjs";
  import { schema } from "./ContactUsFormValidators";

  import { createForm } from "svelte-forms-lib";

  const RECAPTCHA_FORM_ID = "recaptcha-form;";

  let widget;
  let recaptchaVerifyResponse;
  let fields = { fullName: "", email: "", message: "" };
  let submittedValues;

  const onSubmit = (values) => {
    console.log("valuesSubmitted: ===>", values);
    handleRecaptchaResponse();
    if (!errors) {
      sendEmailJS(response);
    }
  };

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: fields,
    validationSchema: schema,
    onSubmit: onSubmit,
  });

  const renderReCaptcha = () => {
    widget = window.grecaptcha.render(RECAPTCHA_FORM_ID, {
      sitekey: RECAPTCHA_KEY,
      theme: "dark",
    });
  };

  const handleRecaptchaResponse = () => {
    recaptchaVerifyResponse = window.grecaptcha.getResponse(widget);
    console.log(recaptchaVerifyResponse, "recaptcha response");
  };

  const sendEmailJS = (recaptchaToken) => {
    emailjs.init(EMAIL_JS_KEY);
    emailjs
      .send(
        EMAIL_JS_SERVICE_ID,
        EMAIL_JS_TEMPLATE_ID,
        { ...submittedValues, "g-recaptcha-response": recaptchaToken },
        EMAIL_JS_KEY
      )
      .then((_) => console.log(_));
  };
</script>

<svelte:window on:load={renderReCaptcha} />
<div>
  <main>
    <section class="relative block py-24 lg:pt-30 bg-blueGray-800">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center">
          <div class="w-full lg:w-6/12 px-4">
            <div
              class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200"
            >
              <form on:submit|preventDefault={handleSubmit}>
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
                      id="fullName"
                      type="text"
                      name="fullName"
                      on:change={handleChange}
                      on:keyup={handleChange}
                      bind:value={$form.fullName}
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Full Name"
                    />
                    {#if $errors.fullName}
                      <span
                        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1"
                      >
                        <small>{$errors.fullName}</small>
                      </span>
                    {/if}
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
                      type="text"
                      name="email"
                      on:change={handleChange}
                      on:keyup={handleChange}
                      bind:value={$form.email}
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                    {#if $errors.email}
                      <span
                        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1"
                      >
                        <small>{$errors.email}</small>
                      </span>
                    {/if}
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
                      name="message"
                      rows="4"
                      cols="80"
                      on:change={handleChange}
                      on:keyup={handleChange}
                      bind:value={$form.message}
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Type a message..."
                    />
                    {#if $errors.message}
                      <span
                        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1"
                      >
                        <small>{$errors.message}</small>
                      </span>
                    {/if}
                  </div>
                  <div class="text-center mt-6">
                    <div id={RECAPTCHA_FORM_ID} style="width: auto;" />
                  </div>
                  <div class="text-center mt-6">
                    <button
                      class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      disabled={$errors && !recaptchaVerifyResponse}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>

<style>
  .invalid {
    border-color: red !important;
  }
</style>
