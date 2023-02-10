import cn from "classnames";
import { ComponentPropsWithoutRef, FC } from "react";

import { Loader, LoaderSize } from "components/loader/loader";
import classes from "./button.module.scss";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  className?: string;
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  onClick,
  isLoading = false,
  ...buttonProperties
}) => (
  <button
    className={cn(classes["button"], className)}
    onClick={onClick}
    {...buttonProperties}
  >
    {children}
    {isLoading && <Loader size={LoaderSize.small} />}
  </button>
);
