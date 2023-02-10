import { FunctionComponent } from "react";

import { Path } from "navigation/route-names";
import { ReactComponent as HomeIcon } from "assets/home.svg";
import { ReactComponent as FavoritesIcon } from "assets/favorites.svg";
import { ReactComponent as CategoriesIcon } from "assets/categories.svg";

export interface MenuItem {
  id: number;
  name: string;
  path?: string;
  children: MenuItem[];
  parent_id?: number;
  icon?: FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  level?: number;
}

export const productsMenuData: MenuItem[] = [
  {
    id: 1,
    name: "Home",
    path: Path.Home,
    icon: HomeIcon,
    children: [],
    level: 1,
  },
  {
    id: 2,
    name: "Favorites",
    path: Path.Favorites,
    icon: FavoritesIcon,
    children: [],
    level: 1,
  },
  {
    id: 3,
    name: "Categories",
    icon: CategoriesIcon,
    children: [],
    level: 1,
  },
];
