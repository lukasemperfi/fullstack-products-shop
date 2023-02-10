import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AdminPanelContent } from "components/admin-panel/admin-panel-content/admin-panel-content";
import { AdminPanelHeader } from "components/admin-panel/admin-panel-header/admin-panel-header";
import { PageContainer } from "components/page-container/page-container";
import { ProductsTable } from "components/products/products-table/products-table";
import classes from "./admin-products-page.module.scss";
import { AdminPanelPath } from "navigation/route-names";

export const AdminProductsPage = () => {
  const navigate = useNavigate();

  const openAddNewForm = () => {
    navigate(AdminPanelPath.CreateProduct);
  };

  return (
    <PageContainer className={classes["container"]}>
      <AdminPanelHeader className={classes["header"]}>
        <Button
          className={classes["button"]}
          variant="outlined"
          onClick={openAddNewForm}
        >
          Add New
        </Button>
      </AdminPanelHeader>
      <AdminPanelContent>
        <ProductsTable />
      </AdminPanelContent>
    </PageContainer>
  );
};
