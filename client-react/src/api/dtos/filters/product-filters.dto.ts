export type Attributes = {
  [key: string]: string[] | string;
};

export interface ProductFiltersDto {
  category_id?: string;
  page?: string;
  sort?: string;
  min_price?: string;
  max_price?: string;
  attributes?: Attributes;
  search_query?: string;
}
