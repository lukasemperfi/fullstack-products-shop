import { FC, MouseEvent } from "react";
import cn from "classnames";

import classes from "./menu-button.module.scss";
import { ReactComponent as ArrowRightIcon } from "assets/arrow-right.svg";
import { MenuItem } from "components/sidebar-nav-menu/products-menu-data";

interface MenuButtonProps {
  open?: boolean;
  isSubOpen?: boolean;
  item: MenuItem;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  level?: number;
}

export const MenuButton: FC<MenuButtonProps> = ({
  item,
  open,
  isSubOpen,
  onClick,
  className,
  level,
}) => {
  const currLevel = level ? level : 0;

  return (
    <button
      className={cn(
        classes["menu__link"],
        { [classes["open"]]: open },
        className
      )}
      onClick={onClick}
    >
      {item.icon && (
        <div>{<item.icon className={cn([classes["menu__icon"]])} />}</div>
      )}

      <div
        className={cn([
          classes["menu__name"],
          { [classes["open"]]: open, [classes["btn"]]: currLevel > 2 },
          ,
        ])}
      >
        {currLevel > 2 && (
          <div className={classes["icon-container"]}>
            <ArrowRightIcon
              className={cn(classes["icon"], { [classes["open"]]: isSubOpen })}
            />
          </div>
        )}
        <div className={classes["item-name"]}>
          {item.name.replaceAll("-", " ")}
        </div>
      </div>
    </button>
  );
};
