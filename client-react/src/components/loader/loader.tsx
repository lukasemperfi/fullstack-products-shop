import { FC } from "react";
import cn from "classnames";

import styles from "./loader.module.scss";

export enum LoaderSize {
  standart = "standart",
  medium = "medium",
  small = "small",
}

interface LoaderProps {
  size?: LoaderSize;
  centered?: boolean;
}

export const Loader: FC<LoaderProps> = ({
  size = LoaderSize.standart,
  centered,
}) => (
  <div className={cn({ [styles.centered]: centered })}>
    <div
      className={cn(styles.loader, {
        [styles[size]]: size,
      })}
    ></div>
  </div>
);
