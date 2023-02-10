import cn from "classnames";
import React from "react";
import { Link, Outlet } from "react-router-dom";

import classes from "./auth-layout.module.scss";
import companyLogoIcon from "assets/logo-big.png";
import { Path } from "navigation/route-names";

export const AuthLayout = () => {
  return (
    <div className={classes.wrapper}>
      <header className={classes["header"]}>
        <Link to={Path.Home} className={classes["header__link"]}>
          <div className={classes["header__logo-container"]}>
            <img src={companyLogoIcon} className={classes["header__logo"]} />
          </div>
          <div className={cn(classes["header__titles"], classes["titles"])}>
            <div className={classes["titles__main"]}>Products Shop</div>
            <div className={classes["titles__second"]}>
              Stay home. Shop online
            </div>
          </div>
        </Link>
      </header>
      <main className={classes.main}>
        <div className={classes["main__outlet-wrapper"]}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
