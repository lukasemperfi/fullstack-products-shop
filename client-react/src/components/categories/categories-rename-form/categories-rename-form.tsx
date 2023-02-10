import { Button } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useState } from "react";

import classes from "./categories-rename-form.module.scss";
import { useAppSelector, useAppDispatch } from "hooks/redux";
import { updateCategoryName } from "store/categories-slice/categories-slice";
import { FormInput } from "components/form-input/form-input";
import {
  selectCategoriesState,
  selectCategoryById,
} from "store/categories-slice/selectors";

interface CategoriesRenameFormProps {
  categoryId: number | null;
}

export const CategoriesRenameForm: FC<CategoriesRenameFormProps> = ({
  categoryId,
}) => {
  const { error } = useAppSelector(selectCategoriesState);
  const category = useAppSelector((state) =>
    selectCategoryById(state, categoryId)
  );

  const [value, setValue] = useState(category?.name);

  const dispatch = useAppDispatch();

  const handleRenameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const saveCategoryChanges = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (categoryId !== null && value !== "" && value !== undefined) {
      dispatch(updateCategoryName({ id: categoryId, name: value }));
    }
  };

  return (
    <form className={classes["rename-form"]} onSubmit={saveCategoryChanges}>
      <FormInput
        value={value}
        onChange={handleRenameOnChange}
        errorText={error?.response?.data.error}
      />
      <Button
        variant="contained"
        className={classes["save-button"]}
        type="submit"
      >
        Save
      </Button>
    </form>
  );
};
