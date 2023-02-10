import express, { Router } from "express";

import { favoritesController } from "../controllers/favorites.controller";
import { userController } from "../controllers/user-controller";
import { parseFiltersQuery } from "../middlewares/parse-filters-query";
import { roleCheck } from "../middlewares/role-check";
import { updateUserParseFormData } from "../middlewares/update-user-parse-formdata";
import { validate } from "../middlewares/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { upload } from "../utils/multer-upload";
import { createUserSchema } from "../validations/auth.validation";

export const createUsersRoutes = (): Router => {
  const usersRouter = express.Router();

  usersRouter.post(
    "/:userId/favorites",
    asyncHandler(favoritesController.create)
  );

  usersRouter.delete(
    "/:userId/favorites",
    asyncHandler(favoritesController.delete)
  );

  usersRouter.get(
    "/:userId/favorites",
    parseFiltersQuery,
    asyncHandler(favoritesController.getList)
  );

  usersRouter.get(
    "/",
    roleCheck(["admin"]),
    asyncHandler(userController.getUsers)
  );

  usersRouter.delete(
    "/:userId",
    roleCheck(["admin"]),
    asyncHandler(userController.deleteUser)
  );
  usersRouter.get(
    "/roles",
    roleCheck(["admin"]),
    asyncHandler(userController.getRoles)
  );
  usersRouter.patch(
    "/:userId/roles",
    roleCheck(["admin"]),
    asyncHandler(userController.updateRoles)
  );

  usersRouter.patch(
    "/:userId/profile",
    upload.any(),
    validate(createUserSchema),
    updateUserParseFormData,
    asyncHandler(userController.updateUser)
  );

  return usersRouter;
};
