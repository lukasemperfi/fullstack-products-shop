import { Button } from "@mui/material";
import { memo, useEffect, useState } from "react";

import classes from "./create-categories.module.scss";
import { useAppSelector } from "hooks/redux";
import { ModalAuthForm } from "components/modal-auth-form/modal-auth-form";
import { selectCategoriesState } from "store/categories-slice/selectors";
import { CategoriesAddNewForm } from "../categories-add-new-form/categories-add-new-form";

export const CreateCategories = memo(() => {
  const [openAddNew, setOpenAddNew] = useState(false);
  const { isLoading, error } = useAppSelector(selectCategoriesState);

  const openAddNewForm = () => {
    setOpenAddNew(true);
  };

  const closeAddNewForm = () => {
    setOpenAddNew(false);
  };

  useEffect(() => {
    if (!isLoading && openAddNew && !error) {
      setOpenAddNew(false);
    }
  }, [isLoading]);

  return (
    <div className={classes["container"]}>
      <Button
        className={classes["button"]}
        variant="outlined"
        onClick={openAddNewForm}
      >
        Add New
      </Button>
      <ModalAuthForm
        open={openAddNew}
        onClose={closeAddNewForm}
        isLoading={isLoading}
      >
        <CategoriesAddNewForm />
      </ModalAuthForm>
    </div>
  );
});
