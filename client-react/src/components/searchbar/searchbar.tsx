import cn from "classnames";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";

import classes from "./searchbar.module.scss";
import searchIcon from "assets/seach-icon.png";
import { IconButton } from "components/icon-button/icon-button";
import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  getProductsSearchData,
  selectProductsCategoriesSearchDataState,
} from "store/products-categories-search-data-slice/products-categories-search-data-slice";
import { Path } from "navigation/route-names";
import useOnClickOutside from "hooks/use-on-click-outside";

export const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isDropdownResultsOpen, setIsDropdownResultsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const dispatch = useAppDispatch();
  const { searchData } = useAppSelector(
    selectProductsCategoriesSearchDataState
  );
  const formRef = useRef(null);

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
    setIsDropdownResultsOpen(false);
  };

  useOnClickOutside(formRef, onBlur);

  const closeDropdown = () => {
    setIsDropdownResultsOpen(false);
    setFocused(false);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    dispatch(getProductsSearchData(event.target.value));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({
      pathname: Path.Search,
      search: createSearchParams({
        search_query: searchQuery,
      }).toString(),
    });
    setSearchQuery("");
    closeDropdown();
  };

  const handleLinkClick = () => {
    closeDropdown();
  };

  useEffect(() => {
    if (searchQuery && focused) {
      setIsDropdownResultsOpen(true);
    }
  }, [searchQuery, focused]);

  return (
    <div className={classes["searchbar"]}>
      <form
        ref={formRef}
        className={cn(classes["searchbar__form"], classes["form"], {
          [classes["active"]]: focused,
        })}
        onSubmit={handleSubmit}
      >
        <IconButton className={classes["form__button"]} type="submit">
          <img src={searchIcon} alt="" />
        </IconButton>
        <div
          className={cn(classes["form__input-container"], {
            [classes["active"]]: focused,
          })}
        >
          <input
            type="text"
            className={cn(classes["form__input"], {
              [classes["focus"]]: focused,
            })}
            placeholder="Search"
            value={searchQuery}
            onChange={handleOnChange}
            onFocus={onFocus}
          />
          <div
            className={cn(classes["searchbar__results"], classes["results"], {
              [classes["open"]]: isDropdownResultsOpen,
            })}
          >
            <div
              className={cn(
                classes["results__categories"],
                classes["categories"]
              )}
            >
              <ul className={cn(classes["categories__list"], classes["list"])}>
                {searchData.categories.map((category) => (
                  <li className={cn(classes["list__item"])} key={category.id}>
                    <Link
                      to={
                        Path.Search +
                        `?category_id=${category.id}&search_query=${searchQuery}`
                      }
                      onClick={handleLinkClick}
                      className={cn(classes["searchbar__link"])}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(classes["results__products"], classes["products"])}
            >
              <div className={cn(classes["products__title"])}>Goods</div>
              <ul className={cn(classes["products__list"], classes["list"])}>
                {searchData.products.map((product) => (
                  <li className={cn(classes["list__item"])} key={product.id}>
                    <Link
                      to={Path.Details}
                      className={cn(classes["searchbar__link"])}
                    >
                      <div
                        className={cn(
                          classes["products__card"],
                          classes["card"]
                        )}
                      >
                        <AdaptivImage
                          src={
                            product?.images[0]
                              ? product?.images[0]?.path
                              : undefined
                          }
                          imgContainerClassname={classes["card__image"]}
                        />
                        <div className={cn(classes["card__title"])}>
                          {product.name}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </form>
      <div className={cn({ [classes["overlay"]]: isDropdownResultsOpen })} />
    </div>
  );
};
