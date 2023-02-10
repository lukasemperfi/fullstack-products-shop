import { CreateImageDto } from "../image/create-image.dto";
import { AttributesReqBody } from "./create-product-request-body.dto";
import { Info } from "./types";

export class CreateProductDto {
  public readonly info: Info;
  public readonly attributes: {
    attribute_id: number;
    attribute_value_id: number;
  }[];
  public readonly category: number;
  public readonly images: CreateImageDto[];
  public readonly imagesForDelete?: string[];

  public static attributesToDto(attributes: AttributesReqBody) {
    const attributesArr = Object.entries(attributes);

    const attributesDto = attributesArr.map(([key, value]) => {
      return {
        attribute_id: parseInt(key),
        attribute_value_id: parseInt(value, 10),
      };
    });

    return attributesDto;
  }
}
