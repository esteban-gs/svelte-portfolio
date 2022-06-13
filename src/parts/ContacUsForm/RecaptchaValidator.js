import * as yup from "yup";

const recaptchaSchema = yup.object().shape({
  recaptcha: yup
    .bool()
    .test("is valid", "Challenge not passed", (value) => value !== null || value.value.length > 0),
});

export { recaptchaSchema };
