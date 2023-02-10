import { Outlet } from "react-router-dom";

import { Navbar } from "../navbar/navbar";
import { Footer } from "./footer/footer";
import classes from "./main-layout.module.scss";
import { SidebarNavMenu } from "components/sidebar-nav-menu/sidebar-nav-menu";

export const MainLayout = () => (
  <div className={classes.wrapper}>
    <Navbar />
    <main className={classes.main}>
      <SidebarNavMenu />
      <div className={classes["main__outlet-wrapper"]}>
        <Outlet />
      </div>
    </main>

    <Footer />
  </div>
);
