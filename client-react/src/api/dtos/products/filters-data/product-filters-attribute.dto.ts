import { ProductFiltersAttributeValueDto } from "./product-filters-attribute-value-dto";

export interface ProductFiltersAttributeDto {
  id: number;
  name: string;
  order: number;
  values: ProductFiltersAttributeValueDto[];
}
