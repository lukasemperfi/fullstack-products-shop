import { ReactNode, useState } from "react";
import cn from "classnames";

import classes from "./items-list.module.scss";
import { useOnScreen } from "../../hooks/use-on-screen";

interface ItemsListProps<T> {
  data: T[];
  renderItem: (item: T, index?: number) => ReactNode;
  keyExtractor: (item: T) => number;
  ListFooterComponent?: ReactNode;
  ListEmptyComponent?: ReactNode;
  onEndReached?: () => any;
  onEndReachedOptions?: IntersectionObserverInit;
  classNameContainer?: string;
  classNameItem?: string;
  columns?: boolean;
}

export const ItemsList = <T,>({
  data,
  renderItem,
  keyExtractor,
  onEndReached,
  onEndReachedOptions,
  ListFooterComponent,
  ListEmptyComponent,
  classNameContainer,
  classNameItem,
  columns,
}: ItemsListProps<T>) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const lastElementRef = (node: HTMLDivElement) => {
    setNode(node);
  };

  useOnScreen(node, onEndReached, onEndReachedOptions);

  return (
    <div className={classes.wrapper}>
      {data.length > 0 ? (
        <div className={classes.container}>
          <div
            className={cn(
              {
                [classes.list]: !columns,
                [classes.columns]: columns,
              },
              classNameContainer
            )}
          >
            {data?.map((item, index) => {
              if (data.length === index + 1) {
                return (
                  <div
                    key={keyExtractor(item)}
                    ref={lastElementRef}
                    className={cn(classes.item, classNameItem)}
                  >
                    {renderItem(item, index)}
                  </div>
                );
              } else {
                return (
                  <div
                    key={keyExtractor(item)}
                    className={cn(classes.item, classNameItem)}
                  >
                    {renderItem(item, index)}
                  </div>
                );
              }
            })}
          </div>
          {ListFooterComponent}
        </div>
      ) : (
        ListEmptyComponent
      )}
    </div>
  );
};
