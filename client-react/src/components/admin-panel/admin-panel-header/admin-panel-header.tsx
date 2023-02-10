import { Paper } from "@mui/material";
import cn from "classnames";
import { FC, ReactNode } from "react";

import classes from "./admin-panel-header.module.scss";

interface AdminPanelHeaderProps {
  children: ReactNode;
  className?: string;
}

export const AdminPanelHeader: FC<AdminPanelHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <Paper className={cn(classes["container"], className)}>{children}</Paper>
  );
};
