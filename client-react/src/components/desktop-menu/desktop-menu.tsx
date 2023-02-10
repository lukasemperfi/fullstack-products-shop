import { FC, MouseEvent } from "react";
import cn from "classnames";

import classes from "./desktop-menu.module.scss";
import { DesktopDropDownSubmenu } from "./desktop-submenu/desktop-submenu";
import { MenuItem } from "components/sidebar-nav-menu/products-menu-data";

interface DesktopMenuProps {
  open?: boolean;
  menu: MenuItem[];
  className?: string;
  level?: number;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export const DesktopMenu: FC<DesktopMenuProps> = ({
  open,
  menu,
  className,
  level = 1,
  onClick,
}) => {
  return (
    <ul className={cn(classes["menu"], className)}>
      {menu.map((item) => (
        <li className={classes["menu__item"]} key={item.id}>
          <DesktopDropDownSubmenu
            item={item}
            open={open}
            level={level + 1}
            onClick={onClick}
          />
        </li>
      ))}
    </ul>
  );
};
