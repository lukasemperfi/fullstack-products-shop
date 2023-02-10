import { Link } from "react-router-dom";

import { useBreadcrumbs } from "hooks/breadcrumbs";
import { ReactComponent as ArrowIcon } from "assets/arrow-right.svg";
import classes from "./breadcrumbs.module.scss";

export const Breadcrumbs = () => {
  const crumbs = useBreadcrumbs();

  return (
    <div className={classes["breadcrumbs"]}>
      <div className={classes["breadcrumbs__list"]}>
        {crumbs.map((crumb, index) => {
          const lastIndex = crumbs.length - 1;

          if (index === lastIndex) {
            return (
              <div className={classes["breadcrumbs__item"]} key={index}>
                <span className={classes["breadcrumbs__last-crumb"]}>
                  {crumb.breadcrumbName?.replaceAll("-", " ")}
                </span>
              </div>
            );
          }
          return (
            <div className={classes["breadcrumbs__item"]} key={index}>
              <Link
                className={classes["breadcrumbs__link"]}
                to={crumb.pathname}
              >
                {crumb.breadcrumbName}
              </Link>
              <ArrowIcon className={classes["breadcrumbs__icon"]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
