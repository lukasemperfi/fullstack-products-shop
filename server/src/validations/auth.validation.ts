import { object, ref, SchemaOf, string } from "yup";
import "yup-phone";

interface UserRegistration {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const createUserBodySchema: SchemaOf<UserRegistration> = object({
  first_name: string()
    .strict()
    .required("first_name is required field")
    .trim()
    .min(2, "First Name must be at least 2 characters")
    .max(20, "First Name must be less than 20 characters")
    .label("first_name"),
  last_name: string()
    .strict()
    .required("last_name is required field")
    .trim()
    .min(2, "Last Name must be at least 2 characters")
    .max(20, "Last Name must be less than 20 characters")
    .label("last_name"),
  email: string()
    .strict()
    .required("Email is required field")
    .trim()
    .email()
    .label("email"),
  password: string()
    .strict()
    .required("password is required field")
    .trim()
    .min(
      5,
      "Password must contain at least five characters.A strong password contains a combination of letters, numbers and symbols."
    )
    .matches(/^[a-z]+$/i, "Password can only contain Latin letters.")
    .label("password"),
  confirm_password: string()
    .strict()
    .label("confirm password")
    .required("confirm_password is required field")
    .oneOf([ref("password"), null], "Passwords does not match"),
});

export const createUserSchema = object({
  body: createUserBodySchema,
});
