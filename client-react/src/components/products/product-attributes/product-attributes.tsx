import cn from "classnames";
import { FC } from "react";

import { AttributeDto } from "api/dtos/products/attribute/attribute.dto";
import classes from "./product-attributes.module.scss";

interface ProductAttributesProps {
  attributes: AttributeDto[];
}

export const ProductAttributes: FC<ProductAttributesProps> = ({
  attributes,
}) => {
  return (
    <div className={cn(classes["characteristics"])}>
      <ul className={cn(classes["characteristics__list"])}>
        {attributes.map((attribute) => (
          <li
            key={attribute.id}
            className={cn(classes["characteristics__item"])}
          >
            <span
              className={cn(
                classes["characteristics__name"],
                classes["characteristics__text"]
              )}
            >
              {attribute.name}:
            </span>
            <span
              className={cn(
                classes["characteristics__value"],
                classes["characteristics__text"]
              )}
            >
              {attribute.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
