import cn from "classnames";
import { Link } from "react-router-dom";

import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";
import facebookIcon from "assets/facebook.png";
import instagramIcon from "assets/instagram.png";
import youtubeIcon from "assets/youtube.png";
import logoIcon from "assets/company-logo.png";
import copyrightIcon from "assets/copyright.png";
import classes from "./footer.module.scss";

export const Footer = () => (
  <footer className={classes["footer"]}>
    <div className={cn(classes["footer__item"], classes["item"])}>
      <div className={classes["item__title"]}>Our services</div>
      <ul className={classes["item__content"]}>
        <li>
          <Link to={"#"} className={classes["item__link"]}>
            Product reviews
          </Link>
        </li>
        <li>
          <Link to={"#"} className={classes["item__link"]}>
            Reviews of stores
          </Link>
        </li>
      </ul>
    </div>
    <div className={cn(classes["footer__item"], classes["item"])}>
      <div className={classes["item__title"]}>To users</div>
      <ul className={classes["item__content"]}>
        <li>
          <Link to={"#"} className={classes["item__link"]}>
            FAQ for users
          </Link>
        </li>
        <li>
          <Link to={"#"} className={classes["item__link"]}>
            About the project
          </Link>
        </li>
      </ul>
    </div>
    <div className={cn(classes["footer__item"], classes["item"])}>
      <div className={classes["item__title"]}>Feedback</div>
      <ul className={classes["item__content"]}>
        <li>
          <Link to={"#"} className={classes["item__link"]}>
            For users
          </Link>
        </li>
        <li>
          <Link to={"#"} className={classes["item__link"]}>
            For online stores
          </Link>
        </li>
      </ul>
    </div>
    <div className={cn(classes["footer__item"], classes["item"])}>
      <div className={classes["item__title"]}>Social media</div>
      <div className={cn(classes["item__content"], classes["social-media"])}>
        <Link to={"#"} className={classes["item__link"]}>
          <AdaptivImage
            src={facebookIcon}
            imgContainerClassname={cn(classes["social-media__facebook"])}
          />
        </Link>
        <Link to={"#"} className={classes["item__link"]}>
          <AdaptivImage
            src={instagramIcon}
            imgContainerClassname={cn(classes["social-media__instagram"])}
          />
        </Link>
        <Link to={"#"} className={classes["item__link"]}>
          <AdaptivImage
            src={youtubeIcon}
            imgContainerClassname={cn(classes["social-media__youtube"])}
          />
        </Link>
      </div>
    </div>
    <div className={cn(classes["footer__item"], classes["item"])}>
      <div className={cn(classes["item__content"], classes["logo"])}>
        <Link to={"#"} className={classes["logo__link"]}>
          <AdaptivImage
            src={logoIcon}
            imgContainerClassname={classes["logo__logotype"]}
          />
          <div>
            <div className={cn(classes["item__title"], classes["logo__title"])}>
              PRODUCTS SHOP
            </div>
            <div className={classes["logo__title-sec"]}>
              Stay home. Shop online
            </div>
          </div>
        </Link>
        <div className={cn(classes["logo__copyright"], classes["copyright"])}>
          <AdaptivImage
            src={copyrightIcon}
            imgContainerClassname={classes["copyright__logo"]}
          />
          <div className={classes["copyright__title"]}>Products Shop 2022</div>
        </div>
      </div>
    </div>
  </footer>
);
