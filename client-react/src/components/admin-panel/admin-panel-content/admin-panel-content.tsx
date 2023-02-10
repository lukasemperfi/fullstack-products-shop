import { Paper } from "@mui/material";
import cn from "classnames";
import { FC, ReactNode } from "react";

import classes from "./admin-panel-content.module.scss";

interface AdminPanelContentProps {
  children: ReactNode;
  className?: string;
}

export const AdminPanelContent: FC<AdminPanelContentProps> = ({
  children,
  className,
}) => {
  return (
    <Paper className={cn(classes["container"], className)}>{children}</Paper>
  );
};
