import { IconButton } from "@mui/material";
import cn from "classnames";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./sidebar-item.module.scss";
import { ReactComponent as ArrowRightIcon } from "assets/arrow-right.svg";
import { MenuItem } from "components/sidebar-nav-menu/products-menu-data";

interface SidebarItemProps {
  item: MenuItem;
}

export const SidebarItem: FC<SidebarItemProps> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = () => {
    setOpen(!open);
  };

  if (item.children.length) {
    return (
      <div
        className={cn(classes["sidebar-item"], {
          [classes["open"]]: open,
        })}
      >
        <div
          className={classes["sidebar-item__title"]}
          onClick={handleItemClick}
        >
          <span>{item.name}</span>
          {!!item.children.length && (
            <IconButton>
              <ArrowRightIcon
                className={cn(classes["icon"], { [classes["open"]]: open })}
              />
            </IconButton>
          )}
        </div>
        <div
          className={cn(classes["sidebar-item__content"], {
            [classes["open"]]: open,
          })}
        >
          {item.children.map((child: any, index: any) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link to={item.path || "#"} className={cn(classes["sidebar-item__link"])}>
        {item.name}
      </Link>
    );
  }
};
