import { OrderByDirection } from "objection";

export interface ProductFiltersDto {
  category_id?: number;
  sort?: OrderByDirection;
  page?: number;
  min_price?: number;
  max_price?: number;
  attributes?: string[];
  search_query?: string;
  user_id?: number;
}
