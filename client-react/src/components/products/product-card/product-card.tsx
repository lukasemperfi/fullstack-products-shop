import { FC, useEffect, useState } from "react";
import cn from "classnames";
import { generatePath, Link, useNavigate } from "react-router-dom";

import { ReactComponent as PriceIcon } from "assets/price.svg";
import { ReactComponent as ViewsIcon } from "assets/views.svg";
import { ReactComponent as StarIcon } from "assets/star.svg";
import { ReactComponent as LikeIcon } from "assets/like.svg";
import { ReactComponent as DislikeIcon } from "assets/dislike.svg";
import verticalStyles from "./vertical-card.module.scss";
import horizontalStyles from "./product-card.module.scss";
import { IconButton } from "components/icon-button/icon-button";
import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";
import { ProductDto } from "api/dtos/products/product.dto";
import { formatPrice } from "utils/format-price";
import { AuthPath, Path } from "navigation/route-names";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { create, deleteFavorite } from "store/favorites-slice/favorites-slice";
import { selectUserState } from "store/user-slice/user-slice";
import { useLikeDislike } from "hooks/use-like-dislike";

type CardVariants = "horizontal" | "vertical";
const cardVariants = {
  horizontal: horizontalStyles,
  vertical: verticalStyles,
};

interface ProductCardProps {
  product: ProductDto;
  variant?: CardVariants;
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  variant = "horizontal",
}) => {
  const {
    id,
    images,
    name,
    price,
    rating,
    views,
    like,
    dislike,
    attributes,
    is_favorite,
    favorite_count,
  } = product;
  const classes = cardVariants[variant];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuth } = useAppSelector(selectUserState);
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    handleLike,
    handleDislike,
    addOrRemoveLikeOrDislike,
    reaction,
    like: likeCounter,
    dislike: dislikeCounter,
  } = useLikeDislike(product);

  useEffect(() => {
    setIsFavorite(Boolean(is_favorite));
  }, [is_favorite]);

  const toogleIsFavorite = () => {
    if (!user) {
      return;
    }
    if (isFavorite) {
      setIsFavorite(false);
      dispatch(
        deleteFavorite({ user_id: String(user.id), product_id: String(id) })
      );
    } else {
      setIsFavorite(true);
      dispatch(create({ user_id: String(user.id), product_id: String(id) }));
    }
  };

  const handleIsFavorite = () => {
    if (!isAuth) {
      navigate(AuthPath.Login);
    } else {
      toogleIsFavorite();
    }
  };

  return (
    <div className={classes["product-card"]}>
      <div
        className={cn(classes["product-card__favorite"], classes["favorite"])}
      >
        <IconButton
          onClick={handleIsFavorite}
          className={cn(classes["favorite__button"])}
        >
          <StarIcon
            className={cn(classes["favorite__star-icon"], {
              [classes["active"]]: isFavorite,
            })}
          />
        </IconButton>
      </div>

      <div
        className={cn(classes["product-card__image"], classes["card-image"])}
      >
        <Link to={generatePath(Path.Details, { id: `${product.id}` })}>
          <AdaptivImage
            src={images[0] ? images[0].path : undefined}
            imgContainerClassname={classes["card-image__container"]}
            imgClassname={classes["card-image__img"]}
          />
        </Link>
      </div>
      <div
        className={cn(
          classes["product-card__description"],
          classes["description"]
        )}
      >
        <div className={cn(classes["description__title"])}>
          <Link to={generatePath(Path.Details, { id: `${product.id}` })}>
            {name}
          </Link>
        </div>
        <div
          className={cn(
            classes["description__attributes"],
            classes["attributes"]
          )}
        >
          {attributes.map((attribute) => (
            <div className={cn(classes["attributes__item"])} key={attribute.id}>
              <div className={cn(classes["attributes__name"])}>
                {attribute.name}:
              </div>
              <div className={cn(classes["attributes__description"])}>
                {attribute.value}
              </div>
            </div>
          ))}
        </div>
        <div className={cn(classes["description__price"])}>
          <PriceIcon />
          <span>{formatPrice(price)}</span>
        </div>
      </div>
      <div
        className={cn(classes["product-card__statistic"], classes["statistic"])}
      >
        <div className={cn(classes["statistic__item"])}>
          <div className={cn(classes["icon"])}>
            <ViewsIcon className={cn(classes["icon-views"])} />
          </div>
          <span>{views}</span>
        </div>
        <div className={cn(classes["statistic__item"])}>
          <div className={cn(classes["icon"])}>
            <StarIcon className={cn(classes["icon-fav"])} />
          </div>
          <span>{favorite_count}</span>
        </div>
        <div className={cn(classes["statistic__item"])}>
          <IconButton
            onClick={handleLike}
            className={cn(classes["like-btn"], {
              [classes["active"]]: reaction === 1,
            })}
          >
            <div className={cn(classes["icon"])}>
              <LikeIcon className={cn(classes["icon-reaction"])} />
            </div>
            <div>{addOrRemoveLikeOrDislike(likeCounter, like)}</div>
          </IconButton>
        </div>
        <div className={cn(classes["statistic__item"])}>
          <IconButton
            onClick={handleDislike}
            className={cn(classes["dislike-btn"], {
              [classes["active"]]: reaction === -1,
            })}
          >
            <div className={cn(classes["icon"])}>
              <DislikeIcon className={cn(classes["icon-reaction"])} />
            </div>
            <div>{addOrRemoveLikeOrDislike(dislikeCounter, dislike)}</div>
          </IconButton>
        </div>
      </div>
    </div>
  );
};
