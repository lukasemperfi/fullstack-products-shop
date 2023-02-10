import { FormControl, InputLabel, Select } from "@mui/material";
import { FC } from "react";

import { TreeList, TreeListProps } from "./tree-list/tree-list";
import { GetTreeCategoryDto } from "api/dtos/categories/get-tree-category.dto";

interface CategoriesTreeSelectProps extends TreeListProps {}

export interface SelectedCategory extends GetTreeCategoryDto {
  checked: boolean;
}

export const CategoriesTreeSelect: FC<CategoriesTreeSelectProps> = ({
  items,
  selectedCategories,
  handleCheckboxOnChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="tree-category">Select Category</InputLabel>
      <Select
        labelId="tree-category"
        id="tree-category-select"
        label="Select Category"
      >
        <TreeList
          items={items}
          selectedCategories={selectedCategories}
          handleCheckboxOnChange={handleCheckboxOnChange}
        />
      </Select>
    </FormControl>
  );
};
