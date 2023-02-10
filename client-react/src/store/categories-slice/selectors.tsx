import { GetTreeCategoryDto } from "api/dtos/categories/get-tree-category.dto";
import { RootState } from "store/store";
import { generateCategoryRoutes } from "utils/generate-category-routes";
import { recursiveCategorySearch } from "utils/recursive-category-search";

export const selectCategoriesState = (state: RootState) => state?.categories;
export const selectCategoryById = (state: RootState, id: number | null) =>
  selectCategoriesState(state).list.find((category) => category.id === id);

export const selectList = (state: RootState) => state?.categories?.list;
export const selectAttributesAndValues = (state: RootState) =>
  state?.categories?.attributesAndValues;
export const selectCategoryTree = (state: RootState) => state?.categories?.tree;
export const selectCategoryRoutes = (state: RootState) =>
  generateCategoryRoutes(selectCategoryTree(state));
export const selectCategoryByID = (
  state: RootState,
  id: number | string | null
): GetTreeCategoryDto | null => {
  const arr = selectCategoryTree(state);
  return recursiveCategorySearch(arr, id);
};
