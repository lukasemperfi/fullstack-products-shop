import { Model } from "objection";

import { BaseModel } from "./base-model.model";
import { Product } from "./product.model";

export class Image extends BaseModel {
  id: number;
  product_id: number;
  path: string;
  order: number;

  static tableName = "image";

  static relationMappings = {
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "image.product_id",
        to: "product.id",
      },
    },
  };
}
