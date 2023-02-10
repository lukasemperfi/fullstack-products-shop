import { SelectChangeEvent } from "@mui/material";
import { FC } from "react";
import cn from "classnames";

import classes from "./attributes-form.module.scss";
import { CreateAttributeDto } from "api/dtos/products/attribute/create-attribute.dto";
import { Select } from "../../select/select";

interface AttributesFormProps {
  attributes: CreateAttributeDto[];
  selectedItem: {
    [key: string]: any;
  };
  onChange: (event: SelectChangeEvent) => void;
  errorMessage?: string;
}

export const AttributesForm: FC<AttributesFormProps> = ({
  attributes,
  onChange,
  selectedItem,
  errorMessage,
}) => {
  return (
    <div className={classes["characteristics"]}>
      <div className={classes["characteristics__label"]}>Characteristics:</div>

      <div
        className={cn(classes["characteristics__inputs"], classes["inputs"])}
      >
        {attributes.map((attribute) => {
          const values = attribute.values.map((val) => {
            const { value, ...rest } = val;
            return { ...rest, name: value };
          });

          return (
            <div
              className={cn(classes["inputs__attribute"])}
              key={attribute.id}
            >
              <div className={cn(classes["inputs__title"])}>
                {attribute.name}
              </div>
              <Select
                items={values}
                selectedItem={selectedItem[attribute.id] || ""}
                handleChange={onChange}
                label={attribute.name}
                attrId={String(attribute.id)}
              />
            </div>
          );
        })}
      </div>
      {!attributes.length && <div>Choose Category</div>}
    </div>
  );
};
