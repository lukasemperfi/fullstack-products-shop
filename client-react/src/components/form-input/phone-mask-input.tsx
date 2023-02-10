import cn from "classnames";
import { forwardRef } from "react";
import InputMask from "react-input-mask";

import { InputProps } from "components/input/input";
import classes from "./form-input.module.scss";

interface FormMaskInputProps extends InputProps {
  label?: string;
  errorText?: string;
  containerClassname?: string;
  inputClassname?: string;
  labelClassname?: string;
  errorClassname?: string;
}

export const FormMaskInput = forwardRef<HTMLInputElement, FormMaskInputProps>(
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
    <div className={cn(classes["container"], containerClassname)}>
      {label ? (
        <label htmlFor={label} className={cn(classes["label"], labelClassname)}>
          {label}
        </label>
      ) : null}
      <InputMask
        mask="\+1 999 99 99 999"
        maskChar=" "
        id={label}
        className={cn(classes["input"], inputClassname)}
        {...inputProperties}
      />
      {errorText ? (
        <div className={cn(classes["error"], errorClassname)}>{errorText}</div>
      ) : null}
    </div>
  )
);
