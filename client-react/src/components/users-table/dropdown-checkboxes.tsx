import cn from "classnames";
import { ChangeEvent, FC, useState } from "react";
import { Button } from "@mui/material";

import classes from "./dropdown-checkboxes.module.scss";
import { ReactComponent as ArrowIcon } from "assets/arrow-down.svg";

type Checkbox = {
  id: string;
  name: string;
};

interface DropdownCheckboxesProps {
  checkboxes: Checkbox[];
  defaultValue?: string[];
  userId: number;
  saveChanges: (selectedCheckboxes: string[], user_id: number) => void;
}


export const DropdownCheckboxes: FC<DropdownCheckboxesProps> = ({
  checkboxes,
  saveChanges,
  defaultValue,
  userId,
}) => {
  const [isActive, setIsActive] = useState(false);
  const defaultCheckboxes = defaultValue || [];
  const [selectedCheckboxes, setSelectedCheckboxes] =
    useState<string[]>(defaultCheckboxes);

  const switchIsActive = () => {
    setIsActive((prev) => !prev);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const hasCheckbox = selectedCheckboxes.includes(value);

    if (hasCheckbox) {
      const filteredCheckboxes = selectedCheckboxes.filter(
        (selCheckbox) => selCheckbox !== value
      );
      setSelectedCheckboxes(filteredCheckboxes);
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };

  const handleSaveChanges = () => {
    setIsActive(false);
    saveChanges(selectedCheckboxes, userId);
  };


  return (
    <div className={cn(classes["dropdown"])}>
      <div className={cn(classes["dropdown__btn"])} onClick={switchIsActive}>
        some label
        <ArrowIcon fill="black" />
      </div>

      <div
        className={cn(classes["dropdown__content"], {
          [classes["active"]]: isActive,
        })}
      >
        {checkboxes.map((checkbox) => (
          <label key={checkbox.id} className={cn(classes["dropdown__label"])}>
            <input
              type="checkbox"
              value={checkbox.id}
              onChange={onChange}
              checked={selectedCheckboxes.includes(String(checkbox.id))}
            />
            {checkbox.name}
          </label>
        ))}
        <Button onClick={handleSaveChanges} variant="contained">
          Save
        </Button>
      </div>
    </div>
  );
};
