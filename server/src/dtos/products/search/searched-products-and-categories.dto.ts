import { GetCategoryDto } from "../category/get-category.dto";
import { GetOneProductDto } from "../product/get-one-product.dto";

export interface SearchedProductsAndCategories {
  products: GetOneProductDto[];
  categories: GetCategoryDto[];
}
