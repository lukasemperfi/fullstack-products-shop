import classes from "./categories-filter.module.scss";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { FilterSpoiler } from "components/filter-spoiler/filter-spoiler";
import { RadioButton } from "./radio-button/radio-button";
import { CategoryDto } from "api/dtos/categories/category.dto";

interface CategoriesFilterProps {
  categories?: CategoryDto[];
  categoryId?: string | null;
}

export const CategoriesFilter: FC<CategoriesFilterProps> = ({
  categories,
  categoryId,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const addQueryParams = (
    name: string,
    addValue: string,
    searchParams: URLSearchParams
  ) => {
    searchParams.delete("page");
    searchParams.set(name, addValue);
    setSearchParams(searchParams);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    addQueryParams("category_id", value, searchParams);
  };

  useEffect(() => {
    setSelectedCategoryId(categoryId);
  }, [searchParams]);

  return (
    <div className={classes["categories"]}>
      <FilterSpoiler label="Categories" open>
        <div className={classes["container"]}>
          {categories?.map(({ id, name }) => (
            <RadioButton
              label={name}
              value={id}
              checked={String(id) === selectedCategoryId}
              onChange={handleChange}
              key={id}
            />
          ))}
        </div>
      </FilterSpoiler>
    </div>
  );
};
