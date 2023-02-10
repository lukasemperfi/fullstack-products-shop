import { Category } from "../../../db/models/category.model";

export interface GetTreeCategoryDto extends Category {
  children: GetTreeCategoryDto[];
}
