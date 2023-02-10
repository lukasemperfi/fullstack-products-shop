import { Characteristic } from "../db/models/characteristic.model";
import { CreateCharacteristicDto } from "../dtos/products/characteristic/create-characteristic.dto";
import { GetOneProductDto } from "../dtos/products/product/get-one-product.dto";
import { BadRequest } from "../exceptions/bad-request";

class CharacteristicsService {
  public create = async (
    newCharacteristics: CreateCharacteristicDto[],
    productId: GetOneProductDto["id"]
  ): Promise<string> => {
    const existingCharacteristicsNames =
      await Characteristic.existingCharacteristicsNames(newCharacteristics);

    const isNamesExist = existingCharacteristicsNames.length > 0;

    if (isNamesExist) {
      throw BadRequest.create(
        `Characteristics with names '${existingCharacteristicsNames}' already exist.`,
        existingCharacteristicsNames
      );
    }
    await Characteristic.create(newCharacteristics, productId);

    return "Characteristics created successfully";
  };
}
export const characteristicsService = new CharacteristicsService();
