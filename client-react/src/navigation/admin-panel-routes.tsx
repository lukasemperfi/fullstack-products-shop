import { AdminPanelLayout } from "components/admin-panel/admin-panel-layout/admin-panel-layout";
import { ProtectedRoute } from "components/protected-route/protected-route";
import { AdminHome } from "pages/admin-panel/admin-home/admin-home";
import { AdminUsersPage } from "pages/admin-panel/admin-users-page /admin-users-page";
import { AdminCreateProductPage } from "pages/admin-panel/admin-create-product-page/admin-create-product-page";
import { AdminProductsPage } from "pages/admin-panel/admin-products-page/admin-products-page";
import { CategoriesPage } from "pages/admin-panel/categories-page/categories-page";
import { EditProductPage } from "pages/admin-panel/edit-product-page/edit-product-page";
import { AdminPanelPath } from "./route-names";

export const adminPanelRoutes = [
  {
    path: AdminPanelPath.Base,
    element: (
      <ProtectedRoute allowRoles={["admin"]}>
        <AdminPanelLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        path: AdminPanelPath.Base,
        element: <AdminHome />,
      },
      {
        path: AdminPanelPath.Categories,
        element: <CategoriesPage />,
      },
      {
        path: AdminPanelPath.Products,
        element: <AdminProductsPage />,
      },
      {
        path: AdminPanelPath.CreateProduct,
        element: <AdminCreateProductPage />,
      },
      {
        path: AdminPanelPath.EditProduct,
        element: <EditProductPage />,
      },
      {
        path: AdminPanelPath.Users,
        element: <AdminUsersPage />,
      },
    ],
  },
];
