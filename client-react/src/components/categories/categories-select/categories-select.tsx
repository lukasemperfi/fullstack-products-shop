import { FC } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useAppSelector } from "hooks/redux";
import { selectCategoriesState } from "store/categories-slice/selectors";
import classes from "./categories-select.module.scss";

interface CategoriesSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

export const CategoriesSelect: FC<CategoriesSelectProps> = ({
  value,
  onChange,
}) => {
  const { list } = useAppSelector(selectCategoriesState);

  return (
    <FormControl fullWidth>
      <InputLabel id="parent-category">Parent Category</InputLabel>
      <Select
        labelId="parent-category"
        id="parent-category-select"
        value={value}
        label="Parent Category"
        onChange={onChange}
      >
        <MenuItem value={"root"}>
          <span className={classes["name"]}>Root Category</span>
        </MenuItem>
        {list.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            <span className={classes["name"]}> {category.name}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
