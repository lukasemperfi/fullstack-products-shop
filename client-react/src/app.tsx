import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { checkAuth, selectUserState } from "store/user-slice/user-slice";
import { AppRouter } from "./navigation/app-router";

export const App = () => {
  const dispatch = useAppDispatch();
  const { userUpdated } = useAppSelector(selectUserState);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [userUpdated]);

  return (
    <>
      <AppRouter />
    </>
  );
};
