import cn from "classnames";
import { FC } from "react";

import { Input, InputProps } from "components/input/input";
import classes from "./auth-checkbox.module.scss";

interface AuthCheckboxProps extends InputProps {
  label?: string;
  errorText?: string;
  containerClassname?: string;
  inputClassname?: string;
}

export const AuthCheckbox: FC<AuthCheckboxProps> = ({
  label,
  containerClassname,
  inputClassname,
  errorText,
  labelClassname,
  ...inputProperties
}) => {
  return (
    <Input
      label={label}
      containerClassname={cn(classes["container"], containerClassname)}
      inputClassname={cn(classes["input"], inputClassname)}
      labelClassname={cn(classes["label"], labelClassname)}
      errorText={errorText}
      type="checkbox"
      {...inputProperties}
    />
  );
};
