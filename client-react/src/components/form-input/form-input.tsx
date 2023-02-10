import cn from "classnames";
import { forwardRef } from "react";

import { Input, InputProps } from "components/input/input";
import classes from "./form-input.module.scss";

interface FormInputProps extends InputProps {
  label?: string;
  errorText?: string;
  containerClassname?: string;
  inputClassname?: string;
  labelClassname?: string;
  errorClassname?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      containerClassname,
      inputClassname,
      labelClassname,
      errorClassname,
      errorText,
      ...inputProperties
    },
    ref
  ) => (
    <Input
      label={label}
      containerClassname={cn(classes["container"], containerClassname)}
      inputClassname={cn(classes["input"], inputClassname)}
      labelClassname={cn(classes["label"], labelClassname)}
      errorClassname={cn(classes["error"], errorClassname)}
      errorText={errorText}
      ref={ref}
      {...inputProperties}
    />
  )
);
