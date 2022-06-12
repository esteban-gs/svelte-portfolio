import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().required("Email name is required").email("Email is invalid"),
  message: yup.string().required("Message name is required"),
});

export { schema };
