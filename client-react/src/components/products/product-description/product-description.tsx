import cn from "classnames";
import { FC } from "react";

import classes from "./product-description.module.scss";

interface ProductDescriptionProps {
  description?: string;
}

export const ProductDescription: FC<ProductDescriptionProps> = ({
  description,
}) => {
  return <div className={cn(classes["description"])}>{description}</div>;
};
