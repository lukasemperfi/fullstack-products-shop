import { number, object, SchemaOf, string } from "yup";

export const createProductBodySchema: SchemaOf<any> = object({
  name: string()
    .strict()
    .required("name is required field")
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .label("name"),
  description: string()
    .strict()
    .required("description is required field")
    .min(10, "Description must be at least 10 characters")
    .label("description"),
  price: number()
    .typeError("Price must be a number")
    .strict()
    .required("price is required field")
    .moreThan(0, "Price must be greater than 0")
    .positive()
    .label("price"),
});

export const createProductSchema = object({
  body: object({
    info: createProductBodySchema,
  }),
});
