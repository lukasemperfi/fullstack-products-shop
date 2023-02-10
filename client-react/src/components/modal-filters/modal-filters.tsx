import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import classes from "./modal-filters.module.scss";
import { PriceFilter } from "components/filters/price/price-filter";
import { AttributesFilter } from "components/filters/attributes/attributes-filter";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  selectProductsFiltersDataState,
  getProductFiltersData,
} from "store/products-filters-data-slice/products-filters-data.slice.";
import { CategoriesFilter } from "components/filters/categories/categories-filter";

interface ModalFiltersProps {
  open: boolean;
  categoryId?: string | number;
}

export const ModalFilters: FC<ModalFiltersProps> = ({ open, categoryId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search_query = searchParams.get("search_query");
  const category_id = searchParams.get("category_id");

  const dispatch = useAppDispatch();
  const {
    filtersData: { categories, price, attributes },
    isLoading,
  } = useAppSelector(selectProductsFiltersDataState);

  const getCategory = () => {
    const categoryVariant = categoryId || category_id;

    const catId = categoryVariant ? String(categoryVariant) : undefined;

    return catId;
  };

  const handleFetchFiltersData = () => {
    const category_id = getCategory();

    const searchQuery = search_query ? search_query : undefined;

    dispatch(getProductFiltersData({ search_query: searchQuery, category_id }));
  };

  useEffect(() => {
    handleFetchFiltersData();
  }, [searchParams]);

  if (!open) {
    return null;
  }

  return (
    <div className={classes["filters"]}>
      {categories?.length && !categoryId && (
        <CategoriesFilter categories={categories} categoryId={getCategory()} />
      )}

      <PriceFilter
        min_price={String(price.min)}
        max_price={String(price.max)}
      />
      <AttributesFilter attributes={attributes} />
    </div>
  );
};
