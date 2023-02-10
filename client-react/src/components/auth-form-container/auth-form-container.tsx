import { FC, ReactNode } from "react";

import classes from "./auth-form-container.module.scss";

interface AuthFormContainerProps {
  children: ReactNode;
}

export const AuthFormContainer: FC<AuthFormContainerProps> = ({ children }) => {
  return <div className={classes["container"]}>{children}</div>;
};
