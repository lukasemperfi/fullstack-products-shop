import { AxiosResponse } from "axios";

import { ProductFiltersDto } from "api/dtos/filters/product-filters.dto";
import { GetProductsListDto } from "api/dtos/products/get-products-list.dto";
import { SuccessResponseDto } from "api/dtos/response/success-response.dto";
import { httpApi } from "api/http";
import { FavoritesPath } from "./favorites-path";

class Favorites {
  public create = async (
    user_id: string,
    product_id: string
  ): Promise<AxiosResponse<SuccessResponseDto<null>>> => {
    const response = await httpApi.post<SuccessResponseDto<null>>(
      FavoritesPath.base + "/" + user_id + "/favorites",
      {
        product_id,
      }
    );

    return response;
  };

  public delete = async (
    user_id: string,
    product_id: string
  ): Promise<AxiosResponse<SuccessResponseDto<null>>> => {
    const response = await httpApi.delete<SuccessResponseDto<null>>(
      FavoritesPath.base + "/" + user_id + "/favorites",
      {
        data: {
          product_id,
        },
      }
    );

    return response;
  };

  public getFilteredList = async (
    filters?: ProductFiltersDto,
    user_id?: number
  ): Promise<AxiosResponse<SuccessResponseDto<GetProductsListDto>, any>> => {
    const response = await httpApi.get<SuccessResponseDto<GetProductsListDto>>(
      FavoritesPath.base + "/" + user_id + "/favorites",
      {
        params: {
          ...filters,
        },
      }
    );

    return response;
  };
}

export const favoritesService = new Favorites();
