import { useMatches, useSearchParams } from "react-router-dom";

import { selectCategoryTree } from "store/categories-slice/selectors";
import { Breadcrumbs as BreadcrumbsObj } from "utils/breadcrumbs";
import { recursiveCategorySearch } from "utils/recursive-category-search";
import { useAppSelector } from "./redux";

type Matches = typeof useMatches;
type Match = Matches extends () => (infer U)[] ? U : never;

interface RouterMatch extends Omit<Match, "handle"> {
  handle: {
    breadcrumb: BreadcrumbsObj;
  };
}

export const useBreadcrumbs = () => {
  const matches = useMatches() as RouterMatch[];
  const [searchParams, setSearchParams] = useSearchParams();
  const searchPath = "/search";
  const favoritesPath = "/favorites";
  const category_id = searchParams.get("category_id");
  const categoriesTree = useAppSelector(selectCategoryTree);
  const categoryId = category_id ? parseInt(category_id) : null;

  const category = recursiveCategorySearch(categoriesTree, categoryId);


  const crumbs = matches
    .filter((match) => {
      return (
        Boolean(match.handle?.breadcrumb) ||
        match.pathname === searchPath ||
        match.pathname === favoritesPath
      );
    })
    .map((match) => {
      const { handle, ...rest } = match;
      if (match.pathname === searchPath || match.pathname === favoritesPath) {
        return { ...rest, breadcrumbName: category?.name };
      }

      return { ...rest, breadcrumbName: handle.breadcrumb.breadcrumbName };
    });

  return crumbs;
};
