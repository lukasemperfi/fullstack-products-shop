import { ChangeEvent, FC } from "react";

import classes from "./add-new-attributes-form.module.scss";
import { CreateAttributeDto } from "api/dtos/products/attribute/create-attribute.dto";

interface AddNewAttributesFormProps {
  characteristics: CreateAttributeDto[];
  onChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  add: () => void;
  remove: (index: number) => void;
  errorMessage?: string;
}

export const AddNewAttributesForm: FC<AddNewAttributesFormProps> = ({
  characteristics,
  onChange,
  add,
  remove,
  errorMessage,
}) => {
  return <div className={classes["characteristics"]}></div>;
};
