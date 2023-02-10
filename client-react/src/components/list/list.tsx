import { ReactNode } from "react";
import cn from "classnames";

import classes from "./list.module.scss";

interface ListProps<T> {
  data: T[];
  renderItem: (item: T, index?: number) => ReactNode;
  keyExtractor: (item: T) => number;
  classNameContainer?: string;
  classNameItem?: string;
}

export const List = <T,>({
  data,
  renderItem,
  keyExtractor,
  classNameContainer,
  classNameItem,
}: ListProps<T>) => {
  return (
    <div className={cn(classes.wrapper, classNameContainer)}>
      {data?.map((item, index) => {
        return (
          <div
            key={keyExtractor(item)}
            className={cn(classes.item, classNameItem)}
          >
            {renderItem(item, index)}
          </div>
        );
      })}
    </div>
  );
};
