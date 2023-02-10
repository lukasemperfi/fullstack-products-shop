import { Model } from "objection";

import { CreatePriceDynamicDto } from "../../dtos/products/price-dynamic/create-price-dynamic.dto";
import { BaseModel } from "./base-model.model";
import { Product } from "./product.model";

export class PriceDynamic extends BaseModel {
  static tableName = "price_dynamic";

  public readonly id: number;
  public readonly product_id: number;
  public readonly new_price: number;

  static relationMappings = {
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "price_dynamic.product_id",
        to: "product.id",
      },
    },
  };

  static async create(newPriceDynamic: CreatePriceDynamicDto) {
    await this.query().insert(newPriceDynamic);
  }
}
