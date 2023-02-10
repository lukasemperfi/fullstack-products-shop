import { array, number, object, SchemaOf, string } from "yup";

import { CreateCharacteristicDto } from "../dtos/products/characteristic/create-characteristic.dto";

export const createCharacteristicsBodySchema: SchemaOf<CreateCharacteristicDto> =
  object({
    name: string().strict().required().label("name"),
    description: string().strict().required().label("description"),
  });

export const createCharacteristicsSchema = object({
  body: array()
    .of(createCharacteristicsBodySchema)
    .min(1, "Empty array. Characteristics must contain at least one element")
    .required(),
});
