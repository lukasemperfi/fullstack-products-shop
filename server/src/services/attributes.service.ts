import { Attribute } from "../db/models/attribute.model";
import { AttributeAndValue } from "../dtos/products/attribute/attribute-and-value.dto";

class AttributesService {
  public getAttributesAndValues = async (
    category_id: number
  ): Promise<AttributeAndValue[]> => {
    const attributesAndValues = await Attribute.getAttributesAndValues(
      category_id
    );

    return attributesAndValues;
  };
}
export const attributesService = new AttributesService();
