<script>
  import {
    RECAPTCHA_KEY,
    EMAIL_JS_KEY,
    EMAIL_JS_SERVICE_ID,
  } from "app-configs";
  import emailjs from "emailjs";
  // import { schema } from "./ContactUsFormValidators";
  import { onMount } from "svelte";

  import { createForm } from "svelte-forms-lib";

  import * as yup from "yup";

  const RECAPTCHA_FORM_ID = "recaptcha-form;";

  let widget;
  let recaptchaVerifyResponse = "";
  let fields = { fullName: "", email: "", message: "", recaptcha: "" };
  let submittedValues;

  const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup
      .string()
      .required("Email name is required")
      .email("Email is invalid"),
    message: yup.string().required("Message name is required"),
  });

  const recaptchaSchema = yup.object().shape({
    recaptcha: yup
      .bool()
      .test("is valid", "Challenge not passed", (value) => value.success),
  });

  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: fields,
    validationSchema: schema,
    onSubmit: (values) => onSubmit(values),
  });

  const onSubmit = (values) => {
    console.log("valuesSubmitted: ===>", values);
    sendEmailJS(recaptchaVerifyResponse);
  };

  const renderReCaptcha = () => {
    widget = window.grecaptcha.render(RECAPTCHA_FORM_ID, {
      sitekey: RECAPTCHA_KEY,
      theme: "dark",
    });
  };

  const handleRecaptchaResponse = () => {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      recaptchaVerifyResponse = window.grecaptcha.getResponse(widget);
      const recaptchaIsValid = recaptchaSchema.isValidSync({
        recaptcha: recaptchaVerifyResponse,
      });
      console.log(recaptchaVerifyResponse, "recaptcha response");
    }, 750);
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

  onMount(() => {
    window.handleRecaptchaResponse = handleRecaptchaResponse;
  });
</script>

<svelte:window on:load={renderReCaptcha} />
{JSON.stringify($errors)}
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
                  <h4 class="text-2xl font-semibold">Want to hire me?</h4>
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
                    <div
                      id={RECAPTCHA_FORM_ID}
                      on:pointerout={handleRecaptchaResponse}
                    />
                  </div>
                  <div class="text-center mt-6">
                    <button
                      class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
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
