import { ChangeEvent, FC } from "react";

import { SelectedCategory } from "../../categories-tree-select";

interface TreeCheckboxProps {
  category: any;
  onChange: (category: SelectedCategory) => void;
}

export const TreeCheckbox: FC<TreeCheckboxProps> = ({ category, onChange }) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...category, checked: event.target.checked });
  };
  return (
    <label>
      <input
        type="checkbox"
        id={`tree-checkbox-${category.id}`}
        name={category.name}
        value={category.checked}
        checked={category.checked}
        onChange={handleOnChange}
      />
      <span> {category.name}</span>
    </label>
  );
};
