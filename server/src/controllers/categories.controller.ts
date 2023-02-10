import { RequestHandler } from "express";

import { Category } from "../db/models/category.model";
import { DeleteCategoryDto } from "../dtos/products/category/delete-category.dto";
import { GetCategoryDto } from "../dtos/products/category/get-category.dto";
import { GetTreeCategoryDto } from "../dtos/products/category/get-tree-category.dto";
import { SuccessResponseDto } from "../dtos/response/success-response.dto";
import { HttpCode } from "../exceptions/http-code";
import { categoriesService } from "../services/categories/categories.service";
import { HttpResponse } from "../utils/http-response";

class CategoriesController {
  public create: RequestHandler<any, SuccessResponseDto<Category>> = async (
    req,
    res,
    next
  ) => {
    const category = req.body;

    const newCategory = await categoriesService.create(category);

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(newCategory, "success", HttpCode.CREATED));
  };

  public delete: RequestHandler<
    any,
    SuccessResponseDto<null>,
    DeleteCategoryDto
  > = async (req, res, next) => {
    const { id } = req.body;

    await categoriesService.delete(id);

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(null, "success", HttpCode.OK));
  };

  public getList: RequestHandler<any, SuccessResponseDto<GetCategoryDto[]>> =
    async (req, res, next) => {
      const categories = await categoriesService.getList();

      return res
        .status(HttpCode.OK)
        .json(HttpResponse.success(categories, "success", HttpCode.OK));
    };

  public getTree: RequestHandler<
    any,
    SuccessResponseDto<GetTreeCategoryDto[]>
  > = async (req, res, next) => {
    const categories = await categoriesService.getTree();

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(categories, "success", HttpCode.OK));
  };

  public update: RequestHandler<any, SuccessResponseDto<null>> = async (
    req,
    res,
    next
  ) => {
    const categoryData = req.body;

    await categoriesService.update(categoryData);

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(null, "success", HttpCode.OK));
  };
}

export const categoriesController = new CategoriesController();
