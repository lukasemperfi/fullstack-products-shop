import cn from "classnames";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { ReactComponent as PriceIcon } from "assets/price.svg";
import { ReactComponent as ViewsIcon } from "assets/views.svg";
import { ReactComponent as StarIcon } from "assets/star.svg";
import { ReactComponent as LikeIcon } from "assets/like.svg";
import { ReactComponent as DislikeIcon } from "assets/dislike.svg";
import { PageContainer } from "components/page-container/page-container";
import classes from "./product-details.module.scss";
import { Tab, Tabs } from "components/tabs/tabs";
import { ProductComments } from "components/products/product-comments/product-comments";
import { ProductDescription } from "components/products/product-description/product-description";
import { ProductImagesSlider } from "components/products/product-images-slider/product-images-slider";
import { ProductPriceDynamic } from "components/products/product-price-dynamic/product-price-dynamic";
import { ProductAttributes } from "components/products/product-attributes/product-attributes";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  getProductDetails,
  selectProductDetailsState,
} from "store/product-details-slice/product-details-slice";
import { formatPrice } from "utils/format-price";
import {
  getPriceDynamicList,
  selectPriceDynamicState,
} from "store/price-dynamic-slice/price-dynamic-slice";
import {
  getCommentsList,
  selectCommentsState,
} from "store/comment-slice/comment-slice";
import { IconButton } from "components/icon-button/icon-button";
import { selectUserState } from "store/user-slice/user-slice";
import { useLikeDislike } from "hooks/use-like-dislike";
import { createView } from "store/products-slice/products-slice";

export const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { product } = useAppSelector(selectProductDetailsState);
  const { priceDynamic } = useAppSelector(selectPriceDynamicState);
  const prices = priceDynamic.map((price) => price.new_price);
  const images = product?.images.map((image) => image.path) || [];
  const { comments, updateComponent } = useAppSelector(selectCommentsState);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortFromQuery = searchParams.get("sort");
  const { user, isAuth } = useAppSelector(selectUserState);

  const items: Tab[] = [
    {
      label: `Description`,
      id: "1",
      children: <ProductDescription description={product?.description} />,
    },
    {
      label: `Characterisics`,
      id: "2",
      children: <ProductAttributes attributes={product?.attributes || []} />,
    },
    {
      label: `Comments`,
      id: "3",
      children: <ProductComments comments={comments} />,
    },
    {
      label: `Price dynamics`,
      id: "4",
      children: <ProductPriceDynamic prices={prices} />,
    },
  ];

  const {
    handleLike,
    handleDislike,
    addOrRemoveLikeOrDislike,
    reaction,
    like,
    dislike,
  } = useLikeDislike(product);

  useEffect(() => {
    if (id) {
      const page = searchParams.get("page");
      dispatch(getCommentsList({ product_id: id, sort: sortFromQuery, page }));
    }
  }, [searchParams, updateComponent]);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails({ product_id: id, user_id: user?.id }));
      dispatch(getPriceDynamicList(id));
      dispatch(createView(parseInt(id)));
    }
  }, []);

  return (
    <PageContainer className={classes["container"]}>
      <div className={classes["product"]}>
        <section className={cn(classes["product__card"], classes["card"])}>
          <div className={classes["card__slider"]}>
            <ProductImagesSlider images={images} />
          </div>
          <div className={cn(classes["card__info"], classes["info"])}>
            <div
              className={cn(classes["info__indicators"], classes["indicators"])}
            >
              <div className={cn(classes["indicators__item"])}>
                <div className={cn(classes["icon"])}>
                  <ViewsIcon className={cn(classes["icon-views"])} />
                </div>
                <span>{product?.views}</span>
              </div>
              <div className={cn(classes["indicators__item"])}>
                <div className={cn(classes["icon"])}>
                  <StarIcon className={cn(classes["icon-fav"])} />
                </div>
                <span>{product?.favorite_count}</span>
              </div>
              <div className={cn(classes["indicators__item"])}>
                <IconButton
                  onClick={handleLike}
                  className={cn(classes["like-btn"], {
                    [classes["active"]]: reaction === 1,
                  })}
                >
                  <LikeIcon className={cn(classes["icon-reaction"])} />
                  <div>{addOrRemoveLikeOrDislike(like, product?.like)}</div>
                </IconButton>
              </div>
              <div className={cn(classes["indicators__item"])}>
                <IconButton
                  onClick={handleDislike}
                  className={cn(classes["dislike-btn"], {
                    [classes["active"]]: reaction === -1,
                  })}
                >
                  <DislikeIcon className={cn(classes["icon-reaction"])} />
                  <div>
                    {addOrRemoveLikeOrDislike(dislike, product?.dislike)}
                  </div>
                </IconButton>
              </div>
            </div>
            <div
              className={cn(
                classes["info__description"],
                classes["description"]
              )}
            >
              <div className={cn(classes["description__title"])}>
                {product?.name}
              </div>
              <div className={cn(classes["description__characteristics"])}>
                {product?.attributes.map((attribute) => (
                  <div
                    className={cn(classes["description__item"])}
                    key={attribute.id}
                  >
                    <div>{attribute.name}:</div> <div>{attribute.value}</div>
                  </div>
                ))}
              </div>
              <div
                className={cn(classes["description__price"], classes["price"])}
              >
                <PriceIcon className={cn(classes["price__icon"])} />
                <span>{formatPrice(product?.price || 0)}</span>
              </div>
            </div>
          </div>
        </section>
        <section
          className={cn(
            classes["product__information"],
            classes["information"]
          )}
        >
          <Tabs items={items} defaultActiveId={items[0].id} />
        </section>
      </div>
    </PageContainer>
  );
};
