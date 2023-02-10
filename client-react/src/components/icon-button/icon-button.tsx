import cn from "classnames";
import { FC, ComponentPropsWithRef, forwardRef } from "react";

import classes from "./icon-button.module.scss";

interface IconButtonProps extends ComponentPropsWithRef<"button"> {}

export const IconButton: FC<IconButtonProps> = forwardRef(
  ({ children, onClick, className, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(classes["button"], className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
);
