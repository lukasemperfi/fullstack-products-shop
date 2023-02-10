import cn from "classnames";
import { ChangeEvent, ComponentPropsWithoutRef, FC } from "react";

import classes from "./radio-button.module.scss";

interface RadioButtonProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  labelClassname?: string;
  inputClassname?: string;
}

export const RadioButton: FC<RadioButtonProps> = ({
  label,
  checked,
  onChange,
  labelClassname,
  inputClassname,
  ...rest
}) => {
  return (
    <label className={cn(classes["label"], labelClassname)}>
      <input
        className={cn(inputClassname)}
        type="radio"
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      {label}
    </label>
  );
};
