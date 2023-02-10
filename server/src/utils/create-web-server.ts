import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import bodyParser from "body-parser";

import { errorHandler } from "../middlewares/error-handler";
import { createCategoriesRoutes } from "../routes/categories.router";
import { createProductsRoutes } from "../routes/products.router";
import { createUsersRoutes } from "../routes/users.router";
import { createAuthRoutes } from "../routes/authRouter";

export const createWebServer = (): Application => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    })
  );

  app.use("/auth", createAuthRoutes());
  app.use("/images", express.static("images"));
  app.use("/products", createProductsRoutes());
  app.use("/users", createUsersRoutes());
  app.use("/categories", createCategoriesRoutes());

  app.use(errorHandler);

  return app;
};
