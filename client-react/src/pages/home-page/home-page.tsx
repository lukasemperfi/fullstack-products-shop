import cn from "classnames";
import { Link } from "react-router-dom";

import { PageContainer } from "components/page-container/page-container";
import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";
import mainBanner from "assets/banner-1.png";
import banner2 from "assets/banner-2.png";
import banner3 from "assets/banner-3.png";
import banner4 from "assets/banner-4.png";
import banner5 from "assets/banner-5.png";
import banner6 from "assets/banner-6.png";
import classes from "./home-page.module.scss";

export const HomePage = () => {
  const path = "/Laptopsandcomputers/Laptops";

  return (
    <PageContainer>
      <div className={classes["banners"]}>
        <div className={classes["banners__row"]}>
          <Link className={cn(classes["banners__link"])} to={path}>
            <AdaptivImage
              src={mainBanner}
              imgClassname={classes["banners__img"]}
              imgContainerClassname={cn(classes["banner"])}
            />
          </Link>
        </div>
        <div className={cn(classes["banners__row"], classes["row-2"])}>
          <Link
            className={cn(classes["row-2__col-1"], classes["banners__link"])}
            to={path}
          >
            <AdaptivImage
              src={banner2}
              imgClassname={classes["banners__img"]}
              imgContainerClassname={cn(classes["row-2__col-1"])}
            />
          </Link>

          <Link
            className={cn(classes["row-2__col-2"], classes["banners__link"])}
            to={path}
          >
            <AdaptivImage
              src={banner3}
              imgClassname={classes["banners__img"]}
              imgContainerClassname={cn(classes["row-2__col-2"])}
            />
          </Link>
        </div>
        <div className={cn(classes["banners__row"], classes["row-3"])}>
          <Link
            className={cn(classes["row-2__col-1"], classes["banners__link"])}
            to={path}
          >
            <AdaptivImage
              src={banner4}
              imgClassname={classes["banners__img"]}
              imgContainerClassname={cn(classes["row-3__col-1"])}
            />
          </Link>

          <Link
            className={cn(classes["row-2__col-1"], classes["banners__link"])}
            to={path}
          >
            <AdaptivImage
              src={banner5}
              imgClassname={classes["banners__img"]}
              imgContainerClassname={cn(classes["row-3__col-2"])}
            />
          </Link>

          <Link
            className={cn(classes["row-2__col-1"], classes["banners__link"])}
            to={path}
          >
            <AdaptivImage
              src={banner6}
              imgClassname={classes["banners__img"]}
              imgContainerClassname={cn(classes["row-3__col-3"])}
            />
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};
