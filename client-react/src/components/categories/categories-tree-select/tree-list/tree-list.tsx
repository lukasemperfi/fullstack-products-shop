import cn from "classnames";
import { FC, ComponentPropsWithoutRef, useState } from "react";

import { GetTreeCategoryDto } from "api/dtos/categories/get-tree-category.dto";
import { SelectedCategory } from "../categories-tree-select";
import { TreeCheckbox } from "./tree-checkbox/tree-checkbox";
import classes from "./tree-list.module.scss";

export interface TreeListProps extends ComponentPropsWithoutRef<"ul"> {
  items: GetTreeCategoryDto[];
  selectedCategories: SelectedCategory[];
  handleCheckboxOnChange: (category: SelectedCategory) => void;
}

type DisplayChildren = {
  [key: string]: boolean;
};

export const TreeList: FC<TreeListProps> = ({
  items,
  selectedCategories,
  handleCheckboxOnChange,
}) => {
  const [displayChildren, setDisplayChildren] = useState<DisplayChildren>({});

  const handleShowSublist = (item: GetTreeCategoryDto) => {
    setDisplayChildren({
      ...displayChildren,
      [item.name]: !displayChildren[item.name],
    });
  };

  const getItemWithChecked = (item: GetTreeCategoryDto) => {
    const selectedCategory = selectedCategories.find(
      (selectedCat) => selectedCat.id === item.id
    );
    if (selectedCategory) {
      return { ...item, checked: selectedCategory.checked };
    }

    return { ...item, checked: false };
  };

  return (
    <ul className={cn(classes["list"])}>
      {items.map((item) => {
        return (
          <li
            key={item.name}
            className={cn(classes["list__item"], classes["item"])}
          >
            <div
              className={cn(classes["item__element"], {
                [classes["button-hidden"]]: item.children.length === 0,
              })}
            >
              {item.children && (
                <button
                  onClick={() => handleShowSublist(item)}
                  className={cn(classes["list__button"], {
                    [classes["hide"]]: item.children.length === 0,
                  })}
                >
                  {displayChildren[item.name] ? "-" : "+"}
                </button>
              )}
              <TreeCheckbox
                category={getItemWithChecked(item)}
                onChange={handleCheckboxOnChange}
              />
            </div>

            {displayChildren[item.name] && item.children && (
              <TreeList
                items={item.children}
                selectedCategories={selectedCategories}
                handleCheckboxOnChange={handleCheckboxOnChange}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
