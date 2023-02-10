import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AdminPanelContent } from "components/admin-panel/admin-panel-content/admin-panel-content";
import { AdminPanelHeader } from "components/admin-panel/admin-panel-header/admin-panel-header";
import { PageContainer } from "components/page-container/page-container";
import { AddNewProductForm } from "components/products/add-new-product-form/add-new-product-form";
import classes from "./admin-create-product-page.module.scss";
import { ReactComponent as BackIcon } from "assets/arrow-left.svg";

export const AdminCreateProductPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer className={classes["container"]}>
      <AdminPanelHeader className={classes["header"]}>
        <Button
          className={classes["back-button"]}
          variant="text"
          startIcon={<BackIcon width={20} height={20} />}
          onClick={goBack}
        >
          Back
        </Button>
      </AdminPanelHeader>
      <AdminPanelContent>
        <AddNewProductForm />
      </AdminPanelContent>
    </PageContainer>
  );
};
