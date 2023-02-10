import { RequestHandler } from "express";

import { Product } from "../db/models/product.model";
import { PaginatedListDto } from "../dtos/pagination/paginated-list.dto";
import { SuccessResponseDto } from "../dtos/response/success-response.dto";
import { HttpCode } from "../exceptions/http-code";
import { favoritesService } from "../services/favorites.service";
import { HttpResponse } from "../utils/http-response";
import { ProductFiltersDto } from "../dtos/filters/product-filters.dto";

class FavoritesController {
  public create: RequestHandler<any, SuccessResponseDto<null>> = async (
    req,
    res,
    next
  ) => {
    const { userId } = req.params;
    const { product_id } = req.body;

    const user_id = parseInt(userId, 10);
    const productId = parseInt(product_id, 10);

    await favoritesService.create(productId, user_id);

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(null, "success", HttpCode.CREATED));
  };

  public delete: RequestHandler<any, SuccessResponseDto<null>> = async (
    req,
    res,
    next
  ) => {
    const { userId } = req.params;
    const { product_id } = req.body;

    const user_id = parseInt(userId, 10);
    const productId = parseInt(product_id, 10);

    await favoritesService.delete(productId, user_id);

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(null, "success", HttpCode.OK));
  };

  public getList: RequestHandler<
    any,
    SuccessResponseDto<PaginatedListDto<Product>>,
    any
  > = async (req, res, next) => {
    const filters = req.body.filters as ProductFiltersDto;
    const userId = req.params.userId as number;

    const filteredList = await favoritesService.getFilteredList(
      filters,
      userId
    );

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(filteredList, "Succes", HttpCode.OK));
  };
}

export const favoritesController = new FavoritesController();
