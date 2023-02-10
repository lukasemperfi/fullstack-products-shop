import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthCheckbox } from "components/auth-checkbox/auth-checkbox";
import { Button } from "components/button/button";
import { FormInput } from "components/form-input/form-input";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { AuthPath, Path } from "navigation/route-names";
import { login, selectUserState } from "store/user-slice/user-slice";
import classes from "./login-form.module.scss";

interface BackgroundLocation {
  backgroundLocation?: Location;
}

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  let location = useLocation();
  const { isAuth, error } = useAppSelector(selectUserState);

  const state = location.state as BackgroundLocation;
  const from = state?.backgroundLocation?.pathname || Path.Home;

  useEffect(() => {
    if (isAuth) {
      navigate(Path.Home);
    }
  }, [isAuth]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(formState));
  };

  const handleFormInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={classes["wrapper"]}>
      <div className={classes["container"]}>
        <div className={classes["title"]}>SIGN IN</div>
        <form action="" className={classes["form"]} onSubmit={handleSubmit}>
          <FormInput
            label="Email address or mobile phone number"
            placeholder="address@gmail.com"
            name="email"
            onChange={handleFormInput}
            value={formState.email}
            errorText={error?.details["email"]}
          />
          <FormInput
            label="Password"
            placeholder="***************"
            name="password"
            type="password"
            onChange={handleFormInput}
            value={formState.password}
            errorText={error?.details["password"]}
          />
          <AuthCheckbox label="Remember me" />
          <Button type="submit">Continue</Button>
          <div className={classes["account-question"]}>
            Don't have an account yet?
          </div>
          <Link to={AuthPath.Registration} className={classes["reg-btn"]}>
            Create your Best Product account
          </Link>
        </form>
      </div>
    </div>
  );
};
