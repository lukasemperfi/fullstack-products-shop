import { FC, ReactNode } from "react";
import cn from "classnames";

import classes from "./statistic-card.module.scss";
import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";

type ProductStat = {
  id: number;
  name: string;
  image: string;
  total: number;
  icon: ReactNode;
};

interface StatisticCardProps {
  cardTitle: string;
  productStat: ProductStat;
}

export const StatisticCard: FC<StatisticCardProps> = ({
  cardTitle,
  productStat,
}) => {
  return (
    <div className={classes["card"]}>
      <div className={classes["card__title"]}>{cardTitle}</div>
      <div className={cn(classes["card__product"], classes["product"])}>
        <div className={cn(classes["product__title"])}>{productStat.name}</div>
        <div className={cn(classes["product__content"], classes["content"])}>
          <div className={cn(classes["content__image"])}>
            <AdaptivImage
              src={productStat.image}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div
            className={cn(classes["content__statistic"], classes["statistic"])}
          >
            <div className={cn(classes["statistic__container"])}>
              <div className={cn(classes["statistic__icon"])}>
                {productStat.icon}
              </div>
              <div className={cn(classes["statistic__value"])}>
                {productStat.total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
