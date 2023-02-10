import { Model } from "objection";

import { AttributeAndValue } from "../../dtos/products/attribute/attribute-and-value.dto";
import { AttributeValue } from "./attribute-value.model";
import { BaseModel } from "./base-model.model";
import { Category } from "./category.model";
import { Product } from "./product.model";

export class Attribute extends BaseModel {
  static tableName = "attribute";

  id: number;
  name: string;
  order: number;
  category_id: number;

  static relationMappings = {
    category: {
      relation: Model.BelongsToOneRelation,
      modelClass: Category,
      join: {
        from: "attribute.category_id",
        to: "category.id",
      },
    },
    attribute_value: {
      relation: Model.HasManyRelation,
      modelClass: AttributeValue,
      join: {
        from: "attribute.id",
        to: "attribute_value.attribute_id",
      },
    },
    product: {
      relation: Model.ManyToManyRelation,
      modelClass: Product,
      join: {
        from: "attribute.id",
        through: {
          from: "product_attribute_value.attribute_id",
          to: "product_attribute_value.product_id",
        },
        to: "product.id",
      },
    },
    children: {
      relation: Model.HasManyRelation,
      modelClass: Product,
      join: {
        from: "attribute.id",
        to: "attribute.id",
      },
    },

    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "attribute.id",
        to: "attribute.id",
      },
    },
  };

  static async getAttributesAndValues(
    category_id: number
  ): Promise<AttributeAndValue[]> {
    const attributesAndValues = (await Attribute.query()
      .where("category_id", category_id)
      .withGraphFetched("attribute_value as values")
      .modifyGraph("values", "selectValues")
      .select(
        "attribute.id",
        "attribute.name"
      )) as unknown as AttributeAndValue[];

    return attributesAndValues;
  }
}
