import { ComponentPropsWithoutRef, FC } from "react";
import cn from "classnames";

import { FilterAttributeDto } from "api/dtos/filters/filter-attribute.dto";
import classes from "./attributes-checkbox.module.scss";

interface AttributesCheckboxProps extends ComponentPropsWithoutRef<"input"> {
  attributeValue: FilterAttributeDto;
  onChange: (arg: any) => void;
  attributeId: number;
}

export const AttributesCheckbox: FC<AttributesCheckboxProps> = ({
  attributeValue,
  onChange,
  attributeId,
  ...rest
}) => {
  return (
    <label className={cn(classes["label"])}>
      <input
        type="checkbox"
        name={String(attributeId)}
        value={attributeValue.id}
        onChange={onChange}
        {...rest}
      />
      <div className={classes["name"]}> {attributeValue.value}</div>
    </label>
  );
};
