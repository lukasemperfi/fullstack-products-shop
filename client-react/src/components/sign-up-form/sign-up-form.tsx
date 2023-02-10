import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CreateUserDto } from "api/dtos/user/create-user.dto copy";
import { AuthCheckbox } from "components/auth-checkbox/auth-checkbox";
import { Button } from "components/button/button";
import { FormInput } from "components/form-input/form-input";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Path } from "navigation/route-names";
import { registration, selectUserState } from "store/user-slice/user-slice";
import classes from "./sign-up-form.module.scss";

interface SignUpFormProps {}
interface BackgroundLocation {
  backgroundLocation?: Location;
}

enum FieldNames {
  first_name = "first_name",
  last_name = "last_name",
  email = "email",
  password = "password",
  confirm_password = "confirm_password",
}

export const SignUpForm: FC<SignUpFormProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState<CreateUserDto>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const { error, isAuth, user } = useAppSelector(selectUserState);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (isAuth) {
      navigate(Path.Home);
    }
  }, [isAuth]);

  const state = location.state as BackgroundLocation;
  const from = state?.backgroundLocation?.pathname || Path.Home;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(registration(formState));
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
        <div className={classes["title"]}>sign up</div>
        <form action="" className={classes["form"]} onSubmit={handleSubmit}>
          <FormInput
            onChange={handleFormInput}
            value={formState.first_name}
            name={FieldNames.first_name}
            label="First Name"
            errorText={error?.details[FieldNames.first_name]}
          />
          <FormInput
            onChange={handleFormInput}
            value={formState.last_name}
            name={FieldNames.last_name}
            label="Last Name"
            errorText={error?.details[FieldNames.last_name]}
          />
          <FormInput
            onChange={handleFormInput}
            value={formState.email}
            name={FieldNames.email}
            label="Email address"
            errorText={error?.details[FieldNames.email]}
          />
          <FormInput
            onChange={handleFormInput}
            value={formState.password}
            name={FieldNames.password}
            label="Password"
            type="password"
            errorText={error?.details[FieldNames.password]}
          />
          <FormInput
            onChange={handleFormInput}
            value={formState.confirm_password}
            name={FieldNames.confirm_password}
            label="Confirm password"
            type="password"
            errorText={error?.details[FieldNames.confirm_password]}
          />
          <AuthCheckbox label="Get updates on our shop news and promotions" />
          <Button>Create account</Button>
        </form>
      </div>
    </div>
  );
};
