import cn from "classnames";
import { FC, MouseEvent } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useHasRole } from "hooks/use-has-role";
import { AccountPath, AdminPanelPath } from "navigation/route-names";
import { logout, selectUserState } from "store/user-slice/user-slice";
import classes from "./profile-menu.module.scss";

interface ProfileMenuProps {
  open: boolean;
  onMenuItemClick?: (event: MouseEvent<HTMLLIElement>) => void;
}

export const ProfileMenu: FC<ProfileMenuProps> = ({
  open,
  onMenuItemClick,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUserState);

  const isAdmin = useHasRole(["admin"]);

  const userLogout = async () => {
    await dispatch(logout());
  };

  const onItemClick = (event: MouseEvent<HTMLLIElement>) => {
    if (onMenuItemClick) {
      onMenuItemClick(event);
    }
  };

  return (
    <div
      className={cn(classes["dropdown"], {
        [classes["active"]]: open,
      })}
    >
      <div className={classes["profile-menu"]}>
        <div className={classes["profile-menu__triangle"]}></div>
        <div className={classes["profile-menu__menu"]}>
          <ul className={classes["menu"]}>
            <li className={classes["menu__item"]} onClick={onItemClick}>
              <Link
                to={AccountPath.Account}
                className={cn(classes["menu__link"], classes["profile"])}
              >
                {`${user?.first_name} ${user?.last_name}`}
              </Link>
            </li>
            {isAdmin && (
              <li className={classes["menu__item"]} onClick={onItemClick}>
                <Link
                  to={AdminPanelPath.Base}
                  className={classes["menu__link"]}
                >
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className={classes["profile-menu__button"]}>
          <button onClick={userLogout} className={classes["button"]}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
