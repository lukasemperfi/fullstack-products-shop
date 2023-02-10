import { Image } from "../../../db/models/image.model";
import { AttributeDto } from "../attribute/attribute.dto";

export type ProductId = {
  productId: GetOneProductDto["id"];
};

export class GetOneProductDto {
  public readonly id: number;
  public readonly name: string;
  public readonly price: number;
  public readonly images: Image[];
  public readonly description: string;
  public readonly attributes: AttributeDto[];
  public readonly views: number;
  public readonly rating: number;
  public readonly like: number;
  public readonly dislike: number;
  public readonly created_at: string;
  public readonly updated_at: string;
}
