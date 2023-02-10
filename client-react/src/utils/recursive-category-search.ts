import { GetTreeCategoryDto } from "api/dtos/categories/get-tree-category.dto";

export const recursiveCategorySearch = (
  arr: GetTreeCategoryDto[],
  id: number | string | null
): GetTreeCategoryDto | null => {
  if (!id) {
    return null;
  }

  const catId = typeof id === "string" ? parseInt(id, 10) : id;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === catId) {
      return arr[i];
    }
    if (arr[i].children) {
      const result = recursiveCategorySearch(arr[i].children, catId);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
