import { AnyQueryBuilder, Model } from "objection";

import { Attribute } from "./attribute.model";
import { BaseModel } from "./base-model.model";
import { Product } from "./product.model";

export class AttributeValue extends BaseModel {
  static tableName = "attribute_value";

  id: number;
  value: string;
  order: number;
  attribute_id: number;

  static relationMappings = {
    attribute: {
      relation: Model.BelongsToOneRelation,
      modelClass: Attribute,
      join: {
        from: "attribute_value.attribute_id",
        to: "attribute.id",
      },
    },
    product: {
      relation: Model.ManyToManyRelation,
      modelClass: Product,
      join: {
        from: "attribute_value.id",
        through: {
          from: "product_attribute_value.attribute_value_id",
          to: "product_attribute_value.product_id",
        },
        to: "product.id",
      },
    },
  };

  static get modifiers() {
    return {
      selectValues(builder: AnyQueryBuilder) {
        builder
          .select(
            "attribute_value.id",
            "attribute_value.value",
            "attribute_value.order"
          )
          .orderBy("attribute_value.order");
      },
    };
  }
}
