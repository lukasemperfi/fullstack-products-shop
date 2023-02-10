import { Model } from "objection";

import { CreateCharacteristicDto } from "../../dtos/products/characteristic/create-characteristic.dto";
import { GetOneProductDto } from "../../dtos/products/product/get-one-product.dto";
import { BaseModel } from "./base-model.model";

export class Characteristic extends BaseModel {
  id: number;
  product_id: number;
  name: string;
  description: string;

  static tableName = "characteristic";

  $formatJson(json: any) {
    json = super.$formatJson(json);
    delete json.product_id;
    return json;
  }

  static relationMappings = {
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: "product.model",
      join: {
        from: "characteristic.product_id",
        to: "product.id",
      },
    },
  };

  static async transactionBatchInsert(model: typeof Model, items: any[]) {
    await model.transaction(async (trx) => {
      for (const key in items) {
        if (Object.prototype.hasOwnProperty.call(items, key)) {
          const element = items[key];

          await model.query(trx).insert(element);
        }
      }
    });
  }

  static async existingCharacteristicsNames(
    characteristics: CreateCharacteristicDto[]
  ) {
    const characteristicsNames = characteristics.map((char) => char.name);

    const existingCharacteristicsNames = await Characteristic.query()
      .select("name")
      .whereIn("name", characteristicsNames);

    return existingCharacteristicsNames;
  }

  static async create(
    newCharacteristics: CreateCharacteristicDto[],
    product_id: GetOneProductDto["id"]
  ) {
    const characteristics = newCharacteristics.map((char) => ({
      ...char,
      product_id,
    }));

    await this.transactionBatchInsert(Characteristic, characteristics);
  }
}
