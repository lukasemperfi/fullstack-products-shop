import { TextareaAutosize } from "@mui/material";
import cn from "classnames";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import classes from "./text-area.module.scss";

export interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  label?: string;
  errorText?: string;
  containerClassname?: string;
  textAreaClassname?: string;
  errorClassname?: string;
  labelClassname?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      containerClassname,
      textAreaClassname,
      errorText,
      labelClassname,
      errorClassname,
      ...TextAreaProperties
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
        <TextareaAutosize
          id={label}
          className={cn(classes["textarea"], textAreaClassname)}
          ref={ref}
          {...TextAreaProperties}
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
