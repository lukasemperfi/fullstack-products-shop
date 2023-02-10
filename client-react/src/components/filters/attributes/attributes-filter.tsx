import { ChangeEvent, FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

import { FilterSpoiler } from "components/filter-spoiler/filter-spoiler";
import { AttributesCheckbox } from "./attributes-checkbox/attributes-checkbox";
import classes from "./attributes-filter.module.scss";
import { ProductFiltersAttributeDto } from "api/dtos/products/filters-data/product-filters-attribute.dto";

interface AttributesFilterProps {
  attributes: ProductFiltersAttributeDto[];
}

export const AttributesFilter: FC<AttributesFilterProps> = ({ attributes }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getValuesFromParams = () => {
    const attrIds = attributes.map((attribute) => attribute.id);

    const values: any[] = [];

    attrIds.forEach((id) => {
      const currId = "a" + id;

      const parsedParams = queryString.parse(searchParams.toString(), {
        arrayFormat: "comma",
      });

      if (parsedParams[currId]) {
        values.push(parsedParams[currId]);
      }
    });

    return values.flat();
  };
  const values = getValuesFromParams();

  const [attributeValues, setAttributeValues] = useState<string[]>([]);

  useEffect(() => {
    setAttributeValues(values);
  }, [attributes]);

  const removeQueryParams = (
    name: string,
    currentValue: string | null,
    deleteValue: string,
    searchParams: URLSearchParams
  ) => {
    if (currentValue) {
      const filteredValues = currentValue
        .split(",")
        .filter((value) => value !== deleteValue);

      if (filteredValues.length === 0) {
        searchParams.delete(name);
      } else {
        searchParams.set(name, filteredValues.join(","));
      }
      setSearchParams(searchParams);
    }
  };

  const addQueryParams = (
    name: string,
    currentValue: string | null,
    addValue: string,
    searchParams: URLSearchParams
  ) => {
    if (currentValue) {
      const newValue = currentValue + "," + addValue;

      searchParams.set(name, newValue);
    } else {
      searchParams.append(name, addValue);
    }
    setSearchParams(searchParams);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: attributeValue, checked, name: attributeId } = e.target;
    const name = "a" + attributeId;
    const currentValue = searchParams.get(name);

    if (checked) {
      addQueryParams(name, currentValue, attributeValue, searchParams);

      setAttributeValues([...attributeValues, attributeValue]);
    } else {
      removeQueryParams(name, currentValue, attributeValue, searchParams);

      setAttributeValues(attributeValues.filter((e) => e !== attributeValue));
    }
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <div className={classes["attributes"]}>
      {attributes.map(({ id, name, values }) => (
        <FilterSpoiler label={name} open key={id}>
          <div className={classes["attributes__checkboxes"]}>
            {values.map((value) => (
              <AttributesCheckbox
                attributeValue={value}
                checked={attributeValues.includes(String(value.id))}
                onChange={handleChange}
                attributeId={id}
                key={value.id}
              />
            ))}
          </div>
        </FilterSpoiler>
      ))}
    </div>
  );
};
