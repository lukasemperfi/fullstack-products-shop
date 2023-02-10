export interface GetCategoryDto {
  id: number;
  parent_id: number | null;
  name: string;
  path: string;
}
