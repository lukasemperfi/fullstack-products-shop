import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Path } from "../../navigation/route-names";

interface BackgroundLocation {
  backgroundLocation?: Location;
}

export const AuthWrapper = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const state = location.state as BackgroundLocation;
  const redirectPath = state?.backgroundLocation?.pathname || Path.Home;
  if (!token) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};
