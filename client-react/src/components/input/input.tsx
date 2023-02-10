import cn from "classnames";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import classes from "./input.module.scss";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  errorText?: string;
  containerClassname?: string;
  inputClassname?: string;
  errorClassname?: string;
  labelClassname?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      containerClassname,
      inputClassname,
      errorText,
      labelClassname,
      errorClassname,
      ...inputProperties
    },
    ref
  ) => {
    return (
      <div className={cn(classes["container"], containerClassname)}>
        {label ? (
          <label
            htmlFor={label}
            className={cn(classes["label"], labelClassname)}
          >
            {label}
          </label>
        ) : null}
        <input
          id={label}
          className={cn(classes["input"], inputClassname)}
          ref={ref}
          {...inputProperties}
        />
        {errorText ? (
          <div className={cn(classes["error"], errorClassname)}>
            {errorText}
          </div>
        ) : null}
      </div>
    );
  }
);
