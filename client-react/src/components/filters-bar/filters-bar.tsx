import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

import classes from "./filters-bar.module.scss";
import { ReactComponent as FiltersIcon } from "assets/filters.svg";
import { IconButton } from "components/icon-button/icon-button";
import { GetTreeCategoryDto } from "api/dtos/categories/get-tree-category.dto";
import { ModalFilters } from "components/modal-filters/modal-filters";
import { ProductsSort } from "components/filters/sort/products-sort";
import { useAppSelector } from "hooks/redux";
import { selectCategoryByID } from "store/categories-slice/selectors";

interface FiltersBarProps {
  category?: GetTreeCategoryDto;
}

export const FiltersBar: FC<FiltersBarProps> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const category_id = searchParams.get("category_id");
  const categoryFromParams = useAppSelector((state) =>
    selectCategoryByID(state, category_id)
  );
  const categoryName = category?.name || categoryFromParams?.name;

  const toogleFiltersOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={classes["filters"]}>
      <ProductsSort />

      <IconButton className={classes["filters__item"]}>
        <FiltersIcon onClick={toogleFiltersOpen} />
      </IconButton>
      <ModalFilters open={isOpen} categoryId={category?.id} />

      <div className={classes["filters__item"]}>Category: {categoryName}</div>
    </div>
  );
};
