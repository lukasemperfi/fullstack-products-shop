import { UpdateCharacteristicDto } from "../characteristic/update-characteristic.dto";
import { CreateProductDto } from "./create-product.dto";

type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<
    Property,
    "characteristics"
  >]: Type[Property];
};

export type UpdateProductDto = RemoveKindField<Partial<CreateProductDto>> & {
  characteristics?: UpdateCharacteristicDto[];
};
