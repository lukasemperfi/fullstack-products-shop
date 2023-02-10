import cn from "classnames";
import { FC, ReactNode, useState } from "react";

import { IconButton } from "components/icon-button/icon-button";
import classes from "./filter-spoiler.module.scss";
import { ReactComponent as ArrowUpIcon } from "assets/arrow.svg";

interface FilterSpoilerProps {
  label: string;
  children: ReactNode;
  open?: boolean;
}

export const FilterSpoiler: FC<FilterSpoilerProps> = ({
  label,
  children,
  open = false,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  const switchIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={cn(classes["spoiler"])}>
      <IconButton
        className={cn(classes["spoiler__btn"])}
        onClick={switchIsOpen}
      >
        <ArrowUpIcon
          className={cn(classes["spoiler__icon"], {
            [classes["open"]]: isOpen,
          })}
        />
        {label}
      </IconButton>
      <div
        className={cn(classes["spoiler__content"], {
          [classes["open"]]: isOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
};
