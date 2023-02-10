import { Outlet } from "react-router-dom";

import { MenuItem } from "components/sidebar-nav-menu/products-menu-data";
import { AdminPanelPath } from "navigation/route-names";
import { SidebarNavMenu } from "../sidebar-nav-menu/sidebar-nav-menu";
import classes from "./admin-panel-layout.module.scss";
import { ReactComponent as HomeIcon } from "assets/home.svg";
import { ReactComponent as ProductIcon } from "assets/product.svg";
import { ReactComponent as UsersIcon } from "assets/users.svg";

const menuData: MenuItem[] = [
  {
    id: 1,
    name: "Home",
    path: AdminPanelPath.Base,
    icon: HomeIcon,
    children: [],
    level: 1,
  },
  {
    id: 2,
    name: "Products",
    path: AdminPanelPath.Products,
    icon: ProductIcon,
    children: [],
    level: 1,
  },
  {
    id: 3,
    name: "Users",
    path: AdminPanelPath.Users,
    icon: UsersIcon,
    children: [],
    level: 1,
  },
];

export const AdminPanelLayout = () => (
  <div className={classes.wrapper}>
    <main className={classes.main}>
      <SidebarNavMenu menu={menuData} />
      <div className={classes["main__outlet-wrapper"]}>
        <Outlet />
      </div>
    </main>
  </div>
);
