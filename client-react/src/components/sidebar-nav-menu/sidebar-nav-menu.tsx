import { ComponentPropsWithRef, FC, MouseEvent, useState } from "react";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

import classes from "./sidebar-nav-menu.module.scss";
import { ReactComponent as BurgerIcon } from "assets/burger.svg";
import { AuthPath } from "navigation/route-names";
import { DesktopMenu } from "components/desktop-menu/desktop-menu";
import { MenuItem, productsMenuData } from "./products-menu-data";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { selectCategoryTree } from "store/categories-slice/selectors";
import { useLockedBody } from "hooks/use-locked-body";
import { useMediaQuery } from "hooks/use-media-query";
import { selectUserState } from "store/user-slice/user-slice";

interface SidebarNavMenuProps extends ComponentPropsWithRef<"aside"> {
  className?: string;
  menuT?: MenuItem[];
}

export const SidebarNavMenu: FC<SidebarNavMenuProps> = ({
  className,
  menuT,
}) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const categoriesTree = useAppSelector(selectCategoryTree);
  const match = useMediaQuery("(max-width: 992px)");
  const isLockedBody = isOpen && match;
  const { isAuth } = useAppSelector(selectUserState);
  const navigate = useNavigate();

  const menu = productsMenuData.map((menuItem) =>
    menuItem.id === 3
      ? { ...menuItem, children: categoriesTree as MenuItem[] }
      : menuItem
  );

  const favoritesPageAccess = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.id === "2") {
      if (!isAuth) {
        event.preventDefault();
        navigate(AuthPath.Login);
      }
    }
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);
    favoritesPageAccess(event);
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
            <DesktopMenu open={isOpen} menu={menu} onClick={handleClick} />
          </nav>
        </div>
      </aside>
    </>
  );
};
