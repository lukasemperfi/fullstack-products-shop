import { CategoryDto } from "api/dtos/categories/category.dto";
import { ProductDto } from "../product.dto";

export interface SearchedProductsAndCategoriesDto {
  products: ProductDto[];
  categories: CategoryDto[];
}
