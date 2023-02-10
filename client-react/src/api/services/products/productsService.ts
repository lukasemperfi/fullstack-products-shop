import { AxiosResponse } from "axios";

import { ProductFiltersDto } from "api/dtos/filters/product-filters.dto";
import { CommentDto } from "api/dtos/products/comment/comment.dto";
import { GetCommentsListDto } from "api/dtos/products/comment/get-comments-list.dto";
import { ProductFiltersDataDto } from "api/dtos/products/filters-data/product-filters-data.dto";
import { GetProductsListDto } from "api/dtos/products/get-products-list.dto";
import { PriceDynamicDto } from "api/dtos/products/price-dynamic/price-dynamic.dto";
import { ProductDto } from "api/dtos/products/product.dto";
import { ReactionAction } from "api/dtos/products/reaction/types";
import { SearchedProductsAndCategoriesDto } from "api/dtos/products/search/searched-products-and-categories.dto";
import { ProductStatisticDto } from "api/dtos/products/statistic/statistic.dto";
import { SuccessResponseDto } from "api/dtos/response/success-response.dto";
import { httpApi } from "api/http";
import { ProductsPath } from "./productsPath";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

class Products {
  public getFilteredList = async (
    filters?: ProductFiltersDto,
    user_id?: number
  ): Promise<AxiosResponse<SuccessResponseDto<GetProductsListDto>, any>> => {
    const response = await httpApi.get<SuccessResponseDto<GetProductsListDto>>(
      ProductsPath.products,
      {
        params: {
          ...filters,
          user_id,
        },
      }
    );

    return response;
  };
  public getFiltersData = async (
    search_query?: string,
    category_id?: string
  ) => {
    const response = await httpApi.get<
      SuccessResponseDto<ProductFiltersDataDto>
    >(ProductsPath.filters, {
      params: {
        category_id,
        search_query,
      },
    });

    return response;
  };

  public getProductsSearchData = async (search_query: string) => {
    const response = await httpApi.get<
      SuccessResponseDto<SearchedProductsAndCategoriesDto>
    >(ProductsPath.search, {
      params: {
        search_query,
      },
    });

    return response;
  };

  public createProduct = async (formData: FormData) => {
    const response = await httpApi.post<SuccessResponseDto<null>>(
      ProductsPath.products,
      formData,
      config
    );
    return response;
  };

  public updateProduct = async (formData: FormData, productId?: string) => {
    const response = await httpApi.patch<SuccessResponseDto<null>>(
      ProductsPath.products + "/" + productId,
      formData,
      config
    );
    return response;
  };

  public getOneProduct = async (product_id: string, user_id?: number) => {
    const response = await httpApi.get<SuccessResponseDto<ProductDto>>(
      ProductsPath.products + "/" + product_id,
      {
        params: {
          user_id,
        },
      }
    );

    return response;
  };

  public getPriceDynamicList = async (product_id: string) => {
    const response = await httpApi.get<SuccessResponseDto<PriceDynamicDto[]>>(
      ProductsPath.products + "/" + product_id + "/price-dynamic"
    );

    return response;
  };

  public getCommentsList = async (
    product_id: string,
    sort?: string | null,
    page?: string | null
  ): Promise<AxiosResponse<SuccessResponseDto<GetCommentsListDto>, any>> => {
    const response = await httpApi.get<SuccessResponseDto<GetCommentsListDto>>(
      ProductsPath.products + "/" + product_id + "/comments",
      {
        params: {
          sort: sort,
          page,
        },
      }
    );

    return response;
  };

  public createComment = async (
    product_id: string,
    user_id: string,
    text: string
  ): Promise<AxiosResponse<SuccessResponseDto<CommentDto>, any>> => {
    const response = await httpApi.post<SuccessResponseDto<CommentDto>>(
      ProductsPath.products + "/" + product_id + "/comments",
      {
        user_id,
        text,
      }
    );

    return response;
  };

  public deleteComment = async (
    product_id: string,
    commentId: number
  ): Promise<AxiosResponse<SuccessResponseDto<CommentDto>, any>> => {
    const response = await httpApi.delete<SuccessResponseDto<CommentDto>>(
      ProductsPath.products + "/" + product_id + "/comments",
      {
        data: {
          commentId,
        },
      }
    );

    return response;
  };

  public createReaction = async (
    product_id: number,
    user_id: number,
    reaction_action: ReactionAction
  ): Promise<AxiosResponse<SuccessResponseDto<null>, any>> => {
    const response = await httpApi.post<SuccessResponseDto<null>>(
      ProductsPath.products + "/" + product_id + "/reaction",
      {
        user_id,
        reaction_action,
      }
    );

    return response;
  };

  public updateReaction = async (
    product_id: number,
    user_id: number,
    reaction_action: ReactionAction
  ): Promise<AxiosResponse<SuccessResponseDto<null>, any>> => {
    const response = await httpApi.patch<SuccessResponseDto<null>>(
      ProductsPath.products + "/" + product_id + "/reaction",
      {
        user_id,
        reaction_action,
      }
    );

    return response;
  };

  public deleteReaction = async (
    product_id: number,
    user_id: number
  ): Promise<AxiosResponse<SuccessResponseDto<null>, any>> => {
    const response = await httpApi.delete<SuccessResponseDto<null>>(
      ProductsPath.products + "/" + product_id + "/reaction",
      {
        data: {
          user_id,
        },
      }
    );

    return response;
  };

  public createView = async (
    product_id: number
  ): Promise<AxiosResponse<SuccessResponseDto<null>, any>> => {
    const response = await httpApi.post<SuccessResponseDto<null>>(
      ProductsPath.products + "/" + product_id + "/view"
    );

    return response;
  };

  public deleteProduct = async (productId: number) => {
    const response = await httpApi.delete<SuccessResponseDto<null>>(
      ProductsPath.products + "/" + productId
    );
    return response.data;
  };

  public getProductStatistic = async () => {
    const response = await httpApi.get<SuccessResponseDto<ProductStatisticDto>>(
      ProductsPath.products + "/" + "statistic"
    );
    return response;
  };
}

export const productsService = new Products();
