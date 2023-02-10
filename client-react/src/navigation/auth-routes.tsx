import { AuthLayout } from "components/auth-layout/auth-layout";
import { LoginForm } from "components/login-form/login-form";
import { SignUpForm } from "components/sign-up-form/sign-up-form";
import { AuthPath } from "./route-names";

export const authRoutes = [
  {
    path: AuthPath.Base,
    element: <AuthLayout />,
    children: [
      {
        path: AuthPath.Login,
        element: <LoginForm />,
      },
      {
        path: AuthPath.Registration,
        element: <SignUpForm />,
      },
    ],
  },
];
