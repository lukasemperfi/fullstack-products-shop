import { useEffect } from "react";

import { AuthWrapper } from "components/auth-wrapper/auth-wrapper";
import { Unauthorized } from "components/unauthorized/unauthorized";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { FavoritesPage } from "pages/favorites-page/favorites-page";
import { ProductDetails } from "pages/product-details/product-details";
import { ProductsPage } from "pages/products-page/products-page";
import { UserPage } from "pages/user-page/user-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getTree } from "store/categories-slice/categories-slice";
import { selectCategoryRoutes } from "store/categories-slice/selectors";
import { Breadcrumbs } from "utils/breadcrumbs";
import { MainLayout } from "../components/main-layout/main-layout";
import { HomePage } from "../pages/home-page/home-page";
import { adminPanelRoutes } from "./admin-panel-routes";
import { AccountPath, Path } from "./route-names";
import { authRoutes } from "./auth-routes";

export interface RouteItem {
  name: string;
  path: string;
  element?: JSX.Element;
  children: RouteItem[];
  handle?: {
    breadcrumb: Breadcrumbs;
  };
}

interface BackgroundLocation {
  backgroundLocation?: Location;
}

export const AppRouter = () => {
  const dispatch = useAppDispatch();
  const categoriesRoutes = useAppSelector(selectCategoryRoutes);

  const routes = [
    {
      path: Path.Home,
      element: <MainLayout />,
      handle: {
        breadcrumb: Breadcrumbs.createName("Home"),
      },
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: Path.Details,
          element: <ProductDetails />,
        },
        {
          path: Path.Search,
          element: <ProductsPage />,
        },
        {
          path: Path.Favorites,
          element: (
            <AuthWrapper>
              <FavoritesPage />
            </AuthWrapper>
          ),
        },
        {
          path: AccountPath.Account,
          element: (
            <AuthWrapper>
              <UserPage />
            </AuthWrapper>
          ),
        },
        ...categoriesRoutes,
      ],
    },
    ...authRoutes,
    ...adminPanelRoutes,

    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
  ];

  useEffect(() => {
    dispatch(getTree());
  }, []);

  const router = createBrowserRouter(routes);

  return <>{categoriesRoutes.length && <RouterProvider router={router} />}</>;
};
