import { FC, useState } from "react";
import { Button } from "@mui/material";
import cn from "classnames";

import { SidebarItem } from "./sidebar-item/sidebar-item";
import classes from "./sidebar-admin-menu.module.scss";
import { ReactComponent as BurgerIcon } from "assets/burger.svg";

interface SidebarAdminMenuProps {
  items: any[];
}

export const SidebarAdminMenu: FC<SidebarAdminMenuProps> = ({ items }) => {
  const [show, setShow] = useState(false);

  const toogleOpenMenu = () => {
    setShow(!show);
  };

  return (
    <>
      <button
        onClick={toogleOpenMenu}
        className={cn(classes["burger-btn"], {
          [classes["open"]]: show,
        })}
      >
        <BurgerIcon />
      </button>
      <div
        className={cn(classes["sidebar"], {
          [classes["show"]]: show,
        })}
      >
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
        <div className={classes["btn-container"]}>
          <Button variant="contained" className={classes["logout-btn"]}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};
