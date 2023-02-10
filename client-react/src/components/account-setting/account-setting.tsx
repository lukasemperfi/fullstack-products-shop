import cn from "classnames";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

import { AuthCheckbox } from "components/auth-checkbox/auth-checkbox";
import { Button } from "components/button/button";
import { FormInput } from "components/form-input/form-input";

import classes from "./account-setting.module.scss";
import { UploadAvatarImage } from "./upload-avatar-image/upload-avatar-image";
import { FormMaskInput } from "components/form-input/phone-mask-input";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  checkAuth,
  clearError,
  forceUpdate,
  selectUserState,
  updateUser,
} from "store/user-slice/user-slice";
import { UserDto } from "api/dtos/user/user.dto";
import { Loader } from "components/loader/loader";

enum FieldNames {
  first_name = "first_name",
  last_name = "last_name",
  email = "email",
  phone_number = "phone_number",
  password = "password",
  confirm_password = "confirm_password",
}

interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  confirm_password?: string;
  phone_number: string;
}

interface AccountSettingProps {
  user?: UserDto;
}

export const AccountSetting: FC<AccountSettingProps> = ({ user }) => {
  const [image, setImage] = useState<File | null>(null);
  const { error, isLoading } = useAppSelector(selectUserState);
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<FormState>({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    password: "",
    confirm_password: "",
  });

  const handleFormInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setImage(event.target.files[0]);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    const formDataArray = Object.entries(formState);

    formData.append("event", "userAvatar");

    formDataArray.forEach((fieldAndValue) => {
      const [name, value] = fieldAndValue;
      formData.append(name, value);
    });

    if (image) {
      formData.append("avatar", image);
    }

    if (user) {
      dispatch(updateUser({ newUser: formData, user_id: user?.id }));
      dispatch(forceUpdate());
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <div className={classes["account-setting"]}>
      {isLoading ? (
        <Loader centered />
      ) : (
        <>
          {" "}
          <div className={classes["account-setting__title"]}>
            Account Setting
          </div>
          <div className={classes["account-setting__content"]}>
            <form
              className={cn(classes["account-setting__form"], classes["form"])}
              onSubmit={onSubmit}
            >
              <div className={classes["form__avatar-upload"]}>
                <UploadAvatarImage
                  avatar={user?.avatar}
                  image={image}
                  onChange={onImageChange}
                />
              </div>
              <div className={classes["form__info"]}>
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

                <FormMaskInput
                  onChange={handleFormInput}
                  value={formState.phone_number}
                  name={FieldNames.phone_number}
                  label="Phone Mask"
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
                  type="password"
                  onChange={handleFormInput}
                  value={formState.confirm_password}
                  name={FieldNames.confirm_password}
                  label="Confirm password"
                  errorText={error?.details[FieldNames.confirm_password]}
                />
                <AuthCheckbox label="Get updates on our shop news and promotions" />
                <Button>Save All Changes</Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
