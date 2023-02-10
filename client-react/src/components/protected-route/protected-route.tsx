import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "hooks/redux";
import { useHasRole } from "hooks/use-has-role";
import { selectUserState } from "store/user-slice/user-slice";

export type ProtectedRouteProps = {
  allowRoles: string[];
  children: JSX.Element;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  allowRoles,
}) => {
  const { user, isLoading, isAuth } = useAppSelector(selectUserState);

  const hasRole = useHasRole(allowRoles);

  if (isLoading) {
    return null;
  }

  if (!hasRole) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return children ? children : <Outlet />;
};
