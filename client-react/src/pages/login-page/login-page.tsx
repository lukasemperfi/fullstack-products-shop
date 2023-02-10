import { useState } from "react";

import { LoginForm } from "components/login-form/login-form";
import { PageContainer } from "components/page-container/page-container";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { logout, selectUserState } from "store/user-slice/user-slice";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { isAuth, isLoading } = useAppSelector(selectUserState);
  const [isReg, setIsReg] = useState(false);

  const logoutFunc = () => {
    dispatch(logout());
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div style={{ color: "red", fontSize: "50px", height: "500px" }}>
          Loading...
        </div>{" "}
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 style={{ color: "red" }}>
        {isAuth ? " Пользователь авторизован" : "АВТОРИЗУЙТЕСЬ"}
      </h1>
      <button onClick={logoutFunc}>Logout</button>
    </PageContainer>
  );
};
