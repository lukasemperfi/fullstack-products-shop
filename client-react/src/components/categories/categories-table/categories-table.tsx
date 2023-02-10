import { memo, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import cn from "classnames";

import classes from "./categories-table.module.scss";
import { useAppSelector, useAppDispatch } from "hooks/redux";
import { deleteCat, getList } from "store/categories-slice/categories-slice";
import { CategoriesRenameForm } from "components/categories/categories-rename-form/categories-rename-form";
import { ModalAuthForm } from "components/modal-auth-form/modal-auth-form";
import { selectCategoriesState } from "store/categories-slice/selectors";

export const CategoriesTable = memo(() => {
  const { list, isLoading, error, updateComponent } = useAppSelector(
    selectCategoriesState
  );
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getList());
  }, [updateComponent]);

  const handleRename = (id: number) => {
    setOpen(true);
    setCategoryId(id);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCat(id));
  };

  useEffect(() => {
    if (!isLoading && open && !error) {
      setOpen(false);
    }
  }, [isLoading]);

  return (
    <div className={classes["container"]}>
      <Table className={classes["table"]}>
        <TableHead>
          <TableRow>
            <TableCell className={classes["table__header"]}>Category</TableCell>
            <TableCell className={classes["table__header"]}></TableCell>
            <TableCell className={classes["table__header"]}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes["table__body"]}>
          {list.map((category) => (
            <TableRow key={category.id}>
              <TableCell
                className={cn(classes["table__cell"], classes["table__name"])}
              >
                {category.name}
              </TableCell>
              <TableCell className={classes["table__cell"]}>
                <Button
                  variant="contained"
                  className={classes["table__rename-button"]}
                  onClick={() => handleRename(category.id)}
                >
                  Rename
                </Button>
              </TableCell>
              <TableCell className={classes["table__cell"]}>
                <Button
                  variant="contained"
                  className={classes["table__delete-button"]}
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalAuthForm open={open} onClose={closeModal} isLoading={isLoading}>
        <CategoriesRenameForm categoryId={categoryId} />
      </ModalAuthForm>
    </div>
  );
});
