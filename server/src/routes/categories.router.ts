import express, { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { categoriesController } from "../controllers/categories.controller";
import { attributesController } from "../controllers/attributes.controller";
import { roleCheck } from "../middlewares/role-check";

export const createCategoriesRoutes = (): Router => {
  const categoriesRouter = express.Router();

  categoriesRouter.post("/", asyncHandler(categoriesController.create));

  categoriesRouter.delete(
    "/",
    roleCheck(["admin"]),
    asyncHandler(categoriesController.delete)
  );
  categoriesRouter.patch(
    "/",
    roleCheck(["admin"]),
    asyncHandler(categoriesController.update)
  );
  categoriesRouter.get("/", asyncHandler(categoriesController.getList));
  categoriesRouter.get("/tree", asyncHandler(categoriesController.getTree));

  categoriesRouter.get(
    "/:categoryId/attributes",
    asyncHandler(attributesController.getAttributesAndValues)
  );

  return categoriesRouter;
};
