import { Model, QueryBuilder } from "objection";

import { AttributeValue } from "./attribute-value.model";
import { Attribute } from "./attribute.model";
import { BaseModel } from "./base-model.model";
import { Product } from "./product.model";

export class ProductAttributeValue extends BaseModel {
  product_id: number;
  attribute_id: number;
  attribute_value_id: number;

  static tableName = "product_attribute_value";

  static relationMappings = {
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "product_attribute_value.product_id",
        to: "product.id",
      },
    },
    attribute: {
      relation: Model.BelongsToOneRelation,
      modelClass: Attribute,
      join: {
        from: "product_attribute_value.attribute_id",
        to: "attribute.id",
      },
    },
    attribute_value: {
      relation: Model.BelongsToOneRelation,
      modelClass: AttributeValue,
      join: {
        from: "product_attribute_value.attribute_value_id",
        to: "attribute_value.id",
      },
    },
  };

  static get modifiers() {
    return {
      getProductAttributes(builder: QueryBuilder<any, any[]>) {
        builder
          .join(
            "attribute_value",
            "product_attribute_value.attribute_value_id",
            "attribute_value.id"
          )
          .join(
            "attribute",
            "product_attribute_value.attribute_id",
            "attribute.id"
          )
          .select(
            "attribute_value.value",
            "attribute.name",
            "attribute.id",
            "attribute.order",
            "attribute_value.id as value_id"
          )
          .orderBy("attribute.order");
      },
    };
  }
}
