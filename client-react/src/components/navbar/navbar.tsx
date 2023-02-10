import { Link, useLocation, useNavigate } from "react-router-dom";
import { MouseEvent, useEffect, useRef, useState } from "react";

import { AuthPath, Path } from "../../navigation/route-names";
import { PageContainer } from "../page-container/page-container";
import classes from "./navbar.module.scss";
import companyLogoIcon from "assets/company-logo.png";
import unknownUserIcon from "assets/unknown-user.png";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ProfileMenu } from "components/profile-menu/profile-menu";
import { Searchbar } from "components/searchbar/searchbar";
import { checkAuth, selectUserState } from "store/user-slice/user-slice";
import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, user, userUpdated } = useAppSelector(selectUserState);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dropdownButtonRef = useRef(null);
  const avatarViewImage = user?.avatar || unknownUserIcon;

  const openLoginFormOrDropdownMenu = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    if (isAuth) {
      setOpen((prevState) => !prevState);
    } else {
      navigate(AuthPath.Login, { state: { backgroundLocation: location } });
    }
  };

  const onMenuItemClick = (event: MouseEvent<HTMLLIElement>) => {
    setOpen(false);
  };

  return (
    <header className={classes.header}>
      <PageContainer className={classes["container"]}>
        <div className={classes.content}>
          <div className={classes["logo"]}>
            <Link to={Path.Home} className={classes["logo__link"]}>
              <div className={classes["logo__container"]}>
                <img src={companyLogoIcon} className={classes["logo__image"]} />
              </div>
              <div className={classes["logo__title"]}>
                products <br /> shop
              </div>
            </Link>
          </div>
          <Searchbar />
          <div className={classes["profile"]}>
            <button
              ref={dropdownButtonRef}
              onClick={openLoginFormOrDropdownMenu}
              className={classes["profile__avatar-button"]}
            >
              <AdaptivImage src={avatarViewImage} alt="user-avatar" />
            </button>
            {isAuth && (
              <ProfileMenu open={open} onMenuItemClick={onMenuItemClick} />
            )}
          </div>
        </div>
      </PageContainer>
    </header>
  );
};
