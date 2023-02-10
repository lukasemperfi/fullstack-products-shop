import { CategoryDto } from "./category.dto";

export interface GetTreeCategoryDto extends CategoryDto {
  children: GetTreeCategoryDto[];
}
