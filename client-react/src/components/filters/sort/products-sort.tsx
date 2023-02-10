import { memo, MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";

import { DropdownSelect } from "components/dropdown-select/dropdown-select";
import { ReactComponent as ArrowUpIcon } from "assets/arrow.svg";
import { ReactComponent as ArrowDownIcon } from "assets/arrow-down.svg";

enum SortValues {
  ASC = "ASC",
  DESC = "DESC",
}
const sortOptions = [
  {
    id: 1,
    name: "Price",
    value: SortValues.ASC,
    icon: ArrowUpIcon,
  },
  {
    id: 2,
    name: "Price",
    value: SortValues.DESC,
    icon: ArrowDownIcon,
  },
];

export const ProductsSort = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSortValue = searchParams.get("sort") || sortOptions[0].value;

  const handleSortChange = (
    event: MouseEvent<HTMLElement>,
    value: string | number
  ) => {
    searchParams.set("sort", String(value));
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <DropdownSelect
      defaultValue={defaultSortValue}
      onChange={handleSortChange}
      options={sortOptions}
    />
  );
});
