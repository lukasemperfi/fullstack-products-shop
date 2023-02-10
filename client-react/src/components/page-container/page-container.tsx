import { ComponentPropsWithoutRef, FC } from "react";
import cn from "classnames";

import classes from "./page-container.module.scss";

export const PageContainer: FC<ComponentPropsWithoutRef<"div">> = ({
  children,
  className,
}) => <div className={cn(classes["container"], className)}>{children}</div>;
