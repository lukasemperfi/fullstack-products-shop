import express, { Router } from "express";

import { authController } from "../controllers/authController";
import { asyncHandler } from "../utils/asyncHandler";
import { createUserSchema } from "../validations/auth.validation";
import { validate } from "../middlewares/validate";

export const createAuthRoutes = (): Router => {
  const authRouter = express.Router();

  authRouter.post(
    "/registration",
    validate(createUserSchema),
    asyncHandler(authController.registration)
  );
  authRouter.post("/login", asyncHandler(authController.login));
  authRouter.post("/logout", asyncHandler(authController.logout));
  authRouter.get("/refresh", asyncHandler(authController.refresh));

  return authRouter;
};
