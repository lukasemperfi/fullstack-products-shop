import { ChangeEvent, FC } from "react";

import classes from "./add-new-product-info-form.module.scss";
import { FormInput } from "components/form-input/form-input";
import { TextArea } from "components/text-area/text-area";
import { ErrorDetails } from "api/dtos/response/error-response.dto";

export type Info = {
  name: string;
  price: string;
  description: string;
};

const FormStateEnum = {
  name: "name",
  price: "price",
  description: "description",
} as const;

export type Error = {
  [key: string]: string;
};

interface AddNewProductInfoFormProps {
  info: Info;
  error?: ErrorDetails;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const AddNewProductInfoForm: FC<AddNewProductInfoFormProps> = ({
  info,
  error,
  onChange,
}) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(event);
  };

  const errorMessage = (name: keyof Info) => {
    return error ? error[name] : "";
  };

  return (
    <>
      <FormInput
        name={FormStateEnum.name}
        value={info.name}
        onChange={handleChange}
        errorClassname={classes["error"]}
        label="Name:"
        errorText={errorMessage(FormStateEnum.name)}
      />
      <FormInput
        name={FormStateEnum.price}
        onChange={handleChange}
        type="number"
        label="Price:"
        value={info.price}
        errorText={errorMessage(FormStateEnum.price)}
        errorClassname={classes["error"]}
      />
      <TextArea
        label="Description:"
        name={FormStateEnum.description}
        value={info.description}
        onChange={handleChange}
        errorText={errorMessage(FormStateEnum.description)}
        errorClassname={classes["error"]}
        rows={5}
        cols={5}
      />
    </>
  );
};
