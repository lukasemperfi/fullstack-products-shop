import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { memo, useEffect, useState } from "react";
import cn from "classnames";
import queryString from "query-string";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";

import classes from "./products-table.module.scss";
import { useAppSelector, useAppDispatch } from "hooks/redux";
import {
  deleteProduct,
  forceUpdate,
  getProductsList,
  selectProductsState,
} from "store/products-slice/products-slice";
import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";
import { formatPrice } from "utils/format-price";
import { AdminPanelPath } from "navigation/route-names";
import { Pagination } from "components/pagination/pagination";
import { ProductFiltersDto } from "api/dtos/filters/product-filters.dto";

export const ProductsTable = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    list,
    isLoading,
    error,
    updateComponent,
    pagination: { page, totalPages, totalResults },
  } = useAppSelector(selectProductsState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const parsedParams = queryString.parse(searchParams.toString(), {
      arrayFormat: "comma",
    }) as ProductFiltersDto;

    dispatch(getProductsList({ filters: parsedParams }));
  }, [updateComponent, searchParams]);

  const handleEdit = (id: number) => {
    navigate(generatePath(AdminPanelPath.EditProduct, { productId: `${id}` }));
  };

  const handleDelete = async (productId: number) => {
    await dispatch(deleteProduct(productId));
    dispatch(forceUpdate());
  };

  useEffect(() => {
    if (!isLoading && open && !error) {
      setOpen(false);
    }
  }, [isLoading]);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    searchParams.set("page", String(value));
    setSearchParams(searchParams);
  };

  return (
    <div className={classes["container"]}>
      <Table className={classes["table"]}>
        <TableHead>
          <TableRow>
            <TableCell className={classes["table__header"]}>Name</TableCell>
            <TableCell className={classes["table__header"]}>Image</TableCell>
            <TableCell className={classes["table__header"]}>Price</TableCell>
            <TableCell className={classes["table__header"]}></TableCell>
            <TableCell className={classes["table__header"]}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes["table__body"]}>
          {list.map((product) => (
            <TableRow key={product.id} className={classes["table__row"]}>
              <TableCell
                className={cn(classes["table__cell"], classes["table__name"])}
              >
                {product.name}
              </TableCell>
              <TableCell
                className={cn(classes["table__cell"], classes["image"])}
              >
                <AdaptivImage
                  src={product.images[0] ? product.images[0].path : undefined}
                  imgContainerClassname={classes["image__container"]}
                />
              </TableCell>
              <TableCell
                className={cn(classes["table__cell"], classes["price"])}
              >
                {formatPrice(product.price)}
              </TableCell>
              <TableCell className={classes["table__cell"]}>
                <Button
                  variant="contained"
                  className={classes["table__rename-button"]}
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell className={classes["table__cell"]}>
                <Button
                  variant="contained"
                  className={classes["table__delete-button"]}
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes["pagination"]}>
        <Pagination
          page={page}
          onChange={handlePaginationChange}
          count={totalPages}
        />
      </div>
    </div>
  );
});
