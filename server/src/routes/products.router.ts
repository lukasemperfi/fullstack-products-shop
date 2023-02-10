import express, { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { productsController } from "../controllers/products.controller";
import { validate } from "../middlewares/validate";
import { createProductSchema } from "../validations/product.validation";
import { parseToStringAndSaveReqParamsToBody } from "../middlewares/parse-to-string-and-save-req-params-to-body";
import { priceDynamicController } from "../controllers/price-dynamic.controller";
import { viewController } from "../controllers/view.controller";
import { reactionController } from "../controllers/reaction.controller";
import { commentController } from "../controllers/comment.controller";
import { upload } from "../utils/multer-upload";
import { jsonParseBody } from "../middlewares/json-parse-body";
import { parseFiltersQuery } from "../middlewares/parse-filters-query";
import { roleCheck } from "../middlewares/role-check";

export const createProductsRoutes = (): Router => {
  const productsRouter = express.Router();

  productsRouter.post(
    "/",
    upload.any(),
    jsonParseBody,
    validate(createProductSchema),
    asyncHandler(productsController.create)
  );

  productsRouter.get(
    "/",
    parseFiltersQuery,
    asyncHandler(productsController.getList)
  );
  productsRouter.get(
    "/statistic",
    roleCheck(["admin"]),
    asyncHandler(productsController.getProductsStatistic)
  );

  productsRouter.get(
    "/filters",
    asyncHandler(productsController.getFiltersData)
  );
  productsRouter.get(
    "/search",
    asyncHandler(productsController.getSearchedProductsAndCategories)
  );

  productsRouter.delete(
    "/:productId",
    roleCheck(["admin"]),
    asyncHandler(productsController.delete)
  );

  productsRouter.patch(
    "/:productId",
    roleCheck(["admin"]),
    upload.any(),
    jsonParseBody,
    validate(createProductSchema),
    asyncHandler(productsController.update)
  );

  productsRouter.get(
    "/:productId",
    parseToStringAndSaveReqParamsToBody,
    asyncHandler(productsController.getOne)
  );

  productsRouter.post(
    "/:productId/price-dynamic",
    asyncHandler(priceDynamicController.create)
  );

  productsRouter.get(
    "/:productId/price-dynamic",
    asyncHandler(productsController.getPriceDynamicList)
  );

  productsRouter.post("/:productId/view", asyncHandler(viewController.create));

  productsRouter.post(
    "/:productId/reaction",
    asyncHandler(reactionController.create)
  );
  productsRouter.delete(
    "/:productId/reaction",
    asyncHandler(reactionController.delete)
  );
  productsRouter.patch(
    "/:productId/reaction",
    asyncHandler(reactionController.update)
  );

  productsRouter.post(
    "/:productId/comments",
    asyncHandler(commentController.create)
  );

  productsRouter.delete(
    "/:productId/comments",
    roleCheck(["admin"]),
    asyncHandler(commentController.delete)
  );

  productsRouter.get(
    "/:productId/comments",
    asyncHandler(commentController.getList)
  );

  return productsRouter;
};
