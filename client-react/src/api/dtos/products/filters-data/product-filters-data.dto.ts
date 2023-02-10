import { CategoryDto } from "api/dtos/categories/category.dto";
import { ProductFiltersAttributeDto } from "./product-filters-attribute.dto";
import { ProductFiltersPriceDto } from "./product-filters-price.dto";

export interface ProductFiltersDataDto {
  categories?: CategoryDto[];
  price: ProductFiltersPriceDto;
  attributes: ProductFiltersAttributeDto[];
}
