import { Request, Response, NextFunction } from "express-serve-static-core";
import { OrderByDirection } from "objection";
import * as core from "express-serve-static-core";

import { ProductFiltersDto } from "../dtos/filters/product-filters.dto";

type Attributes = {
  [key: string]: string[] | string;
};

interface FiltersQueryParams extends core.Query {
  category_id?: string;
  sort?: OrderByDirection;
  min_price?: string;
  max_price?: string;
  attributes?: Attributes;
  search_query?: string;
  user_id?: string;
  page?: string;
}

const getAttributesFromReqQuery = (
  queryParams: FiltersQueryParams
): string[] => {
  const attributes: Attributes = {};

  for (const key in queryParams) {
    if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
      if (key[0] === "a") {
        const value = queryParams[key as keyof FiltersQueryParams] as
          | string[]
          | string;

        const attrKey = key.slice(1);

        const isValueString = typeof value === "string";

        attributes[attrKey] = isValueString ? [value] : value;
      }
    }
  }

  const attributesValues = Object.values(attributes).flat();

  return attributesValues;
};

export const parseFiltersQuery = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const parseReqQuery = (
    queryParams: FiltersQueryParams
  ): { filters: ProductFiltersDto; userId?: number } => {
    const {
      category_id,
      sort,
      min_price,
      max_price,
      search_query,
      user_id,
      page,
    } = queryParams;
    const filters: ProductFiltersDto = {};
    const attributes = getAttributesFromReqQuery(queryParams);
    const isAttributesEmpty = !Object.keys(attributes).length;
    let userId: number | undefined;

    if (category_id) {
      filters["category_id"] = parseInt(category_id, 10);
    }
    if (sort) {
      filters.sort = sort;
    }

    if (min_price) {
      filters.min_price = parseInt(min_price, 10);
    }
    if (max_price) {
      filters.max_price = parseInt(max_price, 10);
    }
    if (search_query) {
      filters.search_query = search_query;
    }
    if (!isAttributesEmpty) {
      filters.attributes = attributes;
    }

    if (user_id) {
      userId = parseInt(user_id, 10);
    }
    if (page) {
      filters.page = parseInt(page, 10);
    }

    return { filters, userId };
  };

  const { filters } = parseReqQuery(req.query);

  req.body = {
    filters: filters,
  };

  next();
};
