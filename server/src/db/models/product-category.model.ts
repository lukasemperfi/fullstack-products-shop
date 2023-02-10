import { Model } from "objection";

import { BaseModel } from "./base-model.model";
import { Product } from "./product.model";

export class ProductCategory extends BaseModel {
  product_id: number;
  category_id: number;

  static tableName = "product_category";

  static get idColumn() {
    return ["product_id", "category_id"];
  }

  static relationMappings = {
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "product_category.product_id",
        to: "product.id",
      },
    },
  };
}
