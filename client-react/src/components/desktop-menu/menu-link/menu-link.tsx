import { FC, MouseEvent } from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";

import classes from "./menu-link.module.scss";
import { MenuItem } from "components/sidebar-nav-menu/products-menu-data";

interface MenuLinkProps {
  item: MenuItem;
  open?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export const MenuLink: FC<MenuLinkProps> = ({ item, open, onClick }) => {
  const activeClassName = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? cn(classes["link"], classes["active"])
      : cn(classes["link"], { [classes["open"]]: open });

  return (
    <NavLink
      to={item.path ? item.path : "#"}
      className={activeClassName}
      id={String(item.id)}
      onClick={onClick}
      end

    >
      {item.icon && (
        <div>
          <item.icon className={cn([classes["icon"]])} />
        </div>
      )}
      <div className={cn([classes["name"], { [classes["open"]]: open }])}>
        {item.name.replaceAll("-", " ")}
      </div>
    </NavLink>
  );
};
