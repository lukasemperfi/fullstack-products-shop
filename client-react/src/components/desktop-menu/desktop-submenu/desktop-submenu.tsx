import { FC, MouseEvent, useEffect, useState } from "react";
import cn from "classnames";

import classes from "./desktop-submenu.module.scss";
import { DesktopMenu } from "../desktop-menu";
import { MenuLink } from "../menu-link/menu-link";
import { MenuButton } from "../menu-button/menu-button";
import { MenuItem } from "components/sidebar-nav-menu/products-menu-data";

interface DesktopDropDownSubmenuProps {
  open?: boolean;
  item: MenuItem;
  level?: number;
  className?: string;
  isMenuOpen?: boolean;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export const DesktopDropDownSubmenu: FC<DesktopDropDownSubmenuProps> = ({
  item,
  open,
  level,
  className,
  isMenuOpen,
  onClick,
}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsSubmenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) {
      setIsSubmenuOpen(false);
    }
  }, [open]);

  return (
    <>
      {item.children.length === 0 ? (
        <MenuLink item={item} open={open} onClick={onClick} />
      ) : (
        <>
          <MenuButton
            item={item}
            open={open}
            isSubOpen={isSubmenuOpen}
            onClick={handleButtonClick}
            level={level}
          />
          <DesktopMenu
            menu={item.children}
            open={open}
            className={cn(
              classes["submenu"],
              {
                [classes["show"]]: isSubmenuOpen && open,
                [classes["aside"]]: level === 3,
              },
              className
            )}
            onClick={onClick}
            level={level}
          />
        </>
      )}
    </>
  );
};
