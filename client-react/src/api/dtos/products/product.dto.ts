import { AttributeDto } from "./attribute/attribute.dto";
import { ImageDto } from "./image/image.dto";

export interface ProductDto {
  id: number;
  name: string;
  price: number;
  description: string;
  views: number;
  rating: number;
  like: number;
  dislike: number;
  category?: {
    category_id: number;
    product_id: number;
  }[];
  reaction: 0 | 1 | -1;
  is_favorite?: 0 | 1;
  favorite_count?: number;
  attributes: AttributeDto[];
  images: ImageDto[];
}
