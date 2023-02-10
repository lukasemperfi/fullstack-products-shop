import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

import { PageContainer } from "components/page-container/page-container";
import classes from "./favorites-page.module.scss";
import { FiltersBar } from "components/filters-bar/filters-bar";
import { Breadcrumbs } from "components/breadcrumbs/breadcrumbs";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { ProductFiltersDto } from "api/dtos/filters/product-filters.dto";
import { ListViewChange } from "components/filters-bar/list-view-change/list-view-change";
import { GetTreeCategoryDto } from "api/dtos/categories/get-tree-category.dto";
import { Loader } from "components/loader/loader";
import { selectUserState } from "store/user-slice/user-slice";
import {
  getFavoritesList,
  selectFavoritesState,
} from "store/favorites-slice/favorites-slice";
import { ProductsList } from "components/list/products-list";
import { Pagination } from "components/pagination/pagination";
import { EmptyData } from "components/empty-data/empty-data";

interface FavoritesPageProps {
  category?: GetTreeCategoryDto;
}

export const FavoritesPage: FC<FavoritesPageProps> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isViewChange, setIsViewChange] = useState(false);
  const { user, isLoading: isUserLoading } = useAppSelector(selectUserState);
  const dispatch = useAppDispatch();
  const {
    list,
    isLoading,
    pagination: { page, totalPages, totalResults },
  } = useAppSelector(selectFavoritesState);

  const handleFetchProducts = () => {
    const parsedParams = queryString.parse(searchParams.toString(), {
      arrayFormat: "comma",
    }) as ProductFiltersDto;
    const { category_id, search_query, ...rest } = parsedParams;

    const categoryVariant = category?.id || category_id;
    const categoryId = categoryVariant ? String(categoryVariant) : undefined;
    const searchQuery = !category_id ? search_query : undefined;

    dispatch(
      getFavoritesList({
        filters: {
          ...rest,
          search_query: search_query,
          category_id: categoryId,
        },
        user_id: user?.id,
      })
    );
  };

  const handleToggleIsViewChange = () => {
    setIsViewChange((isViewChange) => !isViewChange);
  };

  useEffect(() => {
    if (!isUserLoading) {
      handleFetchProducts();
    }
  }, [searchParams, isUserLoading]);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    searchParams.set("page", String(value));
    setSearchParams(searchParams);
  };

  return (
    <PageContainer className={classes["page-container"]}>
      <Breadcrumbs />
      <div className={classes["filters-bar"]}>
        <ListViewChange
          isViewChange={isViewChange}
          onViewChangeClick={handleToggleIsViewChange}
        />
        <FiltersBar category={category} />
      </div>
      {list.length ? (
        <>
          <ProductsList products={list} isViewChange={isViewChange} />
          <div className={classes["pagination"]}>
            <Pagination
              page={page}
              onChange={handlePaginationChange}
              count={totalPages}
            />
          </div>
        </>
      ) : (
        <>
          {!isLoading && <EmptyData title="No Data" />}
          {isLoading && <Loader centered />}
        </>
      )}
    </PageContainer>
  );
};
