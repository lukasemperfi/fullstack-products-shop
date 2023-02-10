import { Model, QueryContext } from "objection";

import { GetOneProductDto } from "../../dtos/products/product/get-one-product.dto";
import { BaseModel } from "./base-model.model";
import { Product } from "./product.model";

export class View extends BaseModel {
  id: number;
  product_id: number;

  static tableName = "view";

  async $afterInsert(queryContext: QueryContext) {
    await super.$afterInsert(queryContext);
    const { product_id } = this;

    await Product.query().findById(product_id).increment("views", 1);
  }

  static relationMappings = {
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: "product.model",
      join: {
        from: "view.product_id",
        to: "product.id",
      },
    },
  };

  static async create(product_id: GetOneProductDto["id"]): Promise<void> {
    await this.query().insert({ product_id });
  }
}
