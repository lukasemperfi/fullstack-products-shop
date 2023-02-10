import cn from "classnames";
import { ChangeEvent, FC, memo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import classes from "./price-filter.module.scss";
import { FilterSpoiler } from "components/filter-spoiler/filter-spoiler";
import { Input } from "components/input/input";

export type PriceFilterParamsState = {
  min_price: string;
  max_price: string;
};

export enum PriceFilterParamNames {
  min_price = "min_price",
  max_price = "max_price",
}

interface PriceFilterProps {
  min_price: string;
  max_price: string;
}

export const PriceFilter: FC<PriceFilterProps> = memo(
  ({ min_price, max_price }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [price, setPrice] = useState<PriceFilterParamsState>({
      min_price: searchParams.get(PriceFilterParamNames.min_price) || "",
      max_price: searchParams.get(PriceFilterParamNames.max_price) || "",
    });

    const removeQueryParams = (name: string) => {
      const sortValue = searchParams.get(name);

      if (sortValue) {
        searchParams.delete(name);
        setSearchParams(searchParams);
      }
    };

    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      if (value) {
        searchParams.set(name, value);
        setSearchParams(searchParams, { replace: true });
      } else {
        removeQueryParams(name);
      }
      searchParams.delete("page");
      setSearchParams(searchParams);
      setPrice({
        ...price,
        [name]: value,
      });
    };

    return (
      <div className={classes["price"]}>
        <FilterSpoiler label="Price" open>
          <div className={classes["container"]}>
            <Input
              type="number"
              inputClassname={cn(classes["input"])}
              placeholder={min_price}
              value={price.min_price}
              onChange={handlePriceChange}
              name={PriceFilterParamNames.min_price}
            />
            <div className={cn(classes["dash"])}>—</div>
            <Input
              type="number"
              inputClassname={cn(classes["input"])}
              placeholder={max_price}
              value={price.max_price}
              onChange={handlePriceChange}
              name={PriceFilterParamNames.max_price}
            />
          </div>
        </FilterSpoiler>
      </div>
    );
  }
);
