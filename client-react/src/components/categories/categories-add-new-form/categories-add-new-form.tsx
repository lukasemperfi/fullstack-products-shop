import classes from "./categories-add-new-form.module.scss";
import { Button, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useState } from "react";

import { useAppSelector, useAppDispatch } from "hooks/redux";
import { FormInput } from "components/form-input/form-input";
import { CategoriesSelect } from "../categories-select/categories-select";
import { createCategory } from "store/categories-slice/categories-slice";
import { selectCategoriesState } from "store/categories-slice/selectors";

interface CategoriesAddNewFormProps {}

export const CategoriesAddNewForm: FC<CategoriesAddNewFormProps> = ({}) => {
  const { error } = useAppSelector(selectCategoriesState);
  const dispatch = useAppDispatch();
  const [parentId, setParentId] = useState("");
  const [name, setName] = useState("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setParentId(event.target.value as string);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const saveNewCategory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === "") {
      return;
    }

    let parent_id: number | null;

    if (parentId === "root" || parentId === "") {
      parent_id = null;
    } else {
      parent_id = parseInt(parentId);
    }

    dispatch(createCategory({ parent_id, name }));
  };

  return (
    <form className={classes["form"]} onSubmit={saveNewCategory}>
      <FormInput
        value={name}
        onChange={handleNameChange}
        label="Name"
        errorText={error?.response?.data.error}
      />
      <CategoriesSelect value={parentId} onChange={handleSelectChange} />
      <Button variant="contained" className={classes["button"]} type="submit">
        Save
      </Button>
    </form>
  );
};
