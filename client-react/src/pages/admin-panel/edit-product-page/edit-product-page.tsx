import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { AdminPanelContent } from "components/admin-panel/admin-panel-content/admin-panel-content";
import { AdminPanelHeader } from "components/admin-panel/admin-panel-header/admin-panel-header";
import { PageContainer } from "components/page-container/page-container";
import classes from "./edit-product-page.module.scss";
import { ReactComponent as BackIcon } from "assets/arrow-left.svg";
import { UpdateProduct } from "components/products/update-product/update-product";
import { useAppSelector, useAppDispatch } from "hooks/redux";
import {
  selectProductDetailsState,
  getProductDetails,
  clearProduct,
} from "store/product-details-slice/product-details-slice";

export const EditProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { product } = useAppSelector(selectProductDetailsState);

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetails({ product_id: productId }));
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [productId]);

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
        {product && <UpdateProduct product={product} />}
      </AdminPanelContent>
    </PageContainer>
  );
};
