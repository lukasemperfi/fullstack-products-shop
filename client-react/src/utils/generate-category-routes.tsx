import { RouteObject } from "react-router-dom";

import { ProductsPage } from "pages/products-page/products-page";
import { Breadcrumbs } from "./breadcrumbs";

export const generateCategoryRoutes = (categoryTree: any[]) => {
  return categoryTree.map((category): RouteObject => {
    const { parent_id, id, children, ...rest } = category;

    const element = !children.length && {
      element: <ProductsPage category={category} />,
    };
    const handle = !children.length && {
      handle: {
        breadcrumb: Breadcrumbs.createName(rest.name),
      },
    };

    const newObj = {
      ...rest,
      children: children as RouteObject[],
      ...handle,
      ...element,
    };

    if (children.length) {
      newObj.children = generateCategoryRoutes(children);
    }

    return newObj;
  });
};
