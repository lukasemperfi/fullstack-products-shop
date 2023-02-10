import { ComponentPropsWithRef, FC, useState } from "react";
import cn from "classnames";

import classes from "./sidebar-nav-menu.module.scss";
import { ReactComponent as BurgerIcon } from "assets/burger.svg";
import { DesktopMenu } from "components/desktop-menu/desktop-menu";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { selectCategoryTree } from "store/categories-slice/selectors";
import { useLockedBody } from "hooks/use-locked-body";
import { useMediaQuery } from "hooks/use-media-query";
import { MenuItem } from "./menu-item.interface";

interface SidebarNavMenuProps extends ComponentPropsWithRef<"aside"> {
  menu: MenuItem[];
}

export const SidebarNavMenu: FC<SidebarNavMenuProps> = ({ menu }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const categoriesTree = useAppSelector(selectCategoryTree);
  const match = useMediaQuery("(max-width: 992px)");
  const isLockedBody = isOpen && match;

  const handleClick = () => {
    setIsOpen(false);
  };

  useLockedBody(isLockedBody);

  return (
    <>
      <aside
        className={cn(classes["sidebar"], {
          [classes["open"]]: isOpen,
        })}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(classes["burger-btn"], {
            [classes["open"]]: isOpen,
          })}
        >
          <BurgerIcon />
        </button>
        <div
          className={cn(classes["sidebar__container"], {
            [classes["show"]]: isOpen,
          })}
        >
          <nav className={cn([classes["sidebar__nav"], classes["nav"]])}>
            {menu && (
              <DesktopMenu open={isOpen} menu={menu} onClick={handleClick} />
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};
