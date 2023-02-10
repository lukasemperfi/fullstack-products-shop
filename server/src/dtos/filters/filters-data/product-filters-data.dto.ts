import { GetCategoryDto } from "../../products/category/get-category.dto";
import { ProductFiltersAttributeDto } from "./product-filters-attribute.dto";
import { ProductFiltersPriceDto } from "./product-filters-price.dto";

export interface ProductFiltersDataDto {
  categories?: GetCategoryDto[];
  price: ProductFiltersPriceDto;
  attributes: ProductFiltersAttributeDto[];
}
