import { RequestHandler } from "express";
import { readdirSync, rmSync } from "fs";

import {
  GetOneProductDto,
  ProductId,
} from "../dtos/products/product/get-one-product.dto";
import { SuccessResponseDto } from "../dtos/response/success-response.dto";
import { HttpCode } from "../exceptions/http-code";
import { productsService } from "../services/products.service";
import { HttpResponse } from "../utils/http-response";
import { CreateProductRequestBodyDto } from "../dtos/products/product/create-product-request-body.dto";

import { ProductStatisticDto } from "../dtos/products/statistic/statistic.dto";

class ProductsController {
  public create: RequestHandler<
    any,
    SuccessResponseDto<null>,
    CreateProductRequestBodyDto
  > = async (req, res, next) => {
    const newProduct = req.body;

    await productsService.create({ ...newProduct });

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(null, "Succes", HttpCode.CREATED));
  };

  public getOne: RequestHandler<
    any,
    SuccessResponseDto<GetOneProductDto>,
    ProductId
  > = async (req, res, next) => {
    const { productId } = req.body;
    const user_id = req.query.user_id as unknown as string;
    const product = await productsService.getOne(productId, user_id);

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(product, "Succes", HttpCode.OK));
  };

  public getProductsStatistic: RequestHandler<
    any,
    SuccessResponseDto<ProductStatisticDto>,
    any,
    any
  > = async (req, res, next) => {
    const statistic = await productsService.getProductsStatistic();

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(statistic, "Succes", HttpCode.OK));
  };

  public getList: RequestHandler<any, SuccessResponseDto<any>, any, any> =
    async (req, res, next) => {
      const { filters, userId } = req.body;

      const filteredList = await productsService.getFilteredList(
        filters,
        userId
      );

      return res
        .status(HttpCode.CREATED)
        .json(HttpResponse.success(filteredList, "Succes", HttpCode.OK));
    };

  public delete: RequestHandler<any, SuccessResponseDto<null>> = async (
    req,
    res,
    next
  ) => {
    const productId = req.params.productId;
    await productsService.delete(productId);

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(null, "Succes", HttpCode.OK));
  };

  public update: RequestHandler<
    any,
    SuccessResponseDto<null>,
    CreateProductRequestBodyDto
  > = async (req, res, next) => {
    const newProduct = req.body;
    const productId = parseInt(req.params.productId, 10);
    const imagesForDelete = req.body.imagesForDelete;

    if (imagesForDelete.length) {
      const dir = "images/products";

      readdirSync(dir).forEach((fileName) => {
        const hasImage = imagesForDelete.some(
          (imagePath) => getLastPart(imagePath) === fileName
        );

        if (hasImage) {
          rmSync(`${dir}/${fileName}`);
        }
      });
    }

    function getLastPart(url: string) {
      const parts = url.split("/");
      return parts.at(-1);
    }

    await productsService.update(productId, newProduct);

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(null, "Succes", HttpCode.CREATED));
  };

  public getFiltersData: RequestHandler<any, SuccessResponseDto<any>> = async (
    req,
    res,
    next
  ) => {
    const category_id = req.query.category_id as unknown as number;
    const search_query = req.query.search_query as unknown as string;

    const filtersData = await productsService.getFiltersData(
      category_id,
      search_query
    );

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(filtersData, "Succes", HttpCode.OK));
  };

  public getSearchedProductsAndCategories: RequestHandler<
    any,
    SuccessResponseDto<any>
  > = async (req, res, next) => {
    const searchQuery = req.query.search_query as unknown as string;

    const searchedProductsAndCategories =
      await productsService.getSearchedProductsAndCategories(searchQuery);

    return res
      .status(HttpCode.CREATED)
      .json(
        HttpResponse.success(
          searchedProductsAndCategories,
          "Succes",
          HttpCode.OK
        )
      );
  };

  public getPriceDynamicList: RequestHandler<any, SuccessResponseDto<any>> =
    async (req, res, next) => {
      const product_id = req.params.productId as number;

      const priceDynamicList = await productsService.getPriceDynamicList(
        product_id
      );

      return res
        .status(HttpCode.CREATED)
        .json(HttpResponse.success(priceDynamicList, "Succes", HttpCode.OK));
    };
}

export const productsController = new ProductsController();
