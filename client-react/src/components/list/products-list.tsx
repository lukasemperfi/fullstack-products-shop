import { FC } from "react";
import cn from "classnames";

import { ProductDto } from "api/dtos/products/product.dto";
import { PageContainer } from "components/page-container/page-container";
import { ProductCard } from "components/products/product-card/product-card";
import { List } from "./list";
import classes from "./products-list.module.scss";
import { useMediaQuery } from "hooks/use-media-query";

interface ProductsListProps {
  products: ProductDto[];
  isViewChange: boolean;
}

export const ProductsList: FC<ProductsListProps> = ({
  products,
  isViewChange,
}) => {
  const match = useMediaQuery("(max-width: 1072px)");

  const cardVariant = isViewChange || match ? "vertical" : "horizontal";

  const renderItem = (product: ProductDto) => (
    <ProductCard product={product} variant={cardVariant} />
  );

  return (
    <PageContainer className={classes["container"]}>
      <List
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        classNameContainer={cn({
          [classes["list"]]: cardVariant === "horizontal" && !match,
          [classes["list-horizontal"]]: cardVariant === "vertical" || match,
        })}
        classNameItem={cn({
          [classes["list-horizontal__item"]]:
            cardVariant === "vertical" || match,
        })}
      />
    </PageContainer>
  );
};
