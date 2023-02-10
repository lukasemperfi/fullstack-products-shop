import { NextFunction, Request, Response } from "express";

import { HttpCode } from "../exceptions/http-code";
import { HttpResponse } from "../utils/http-response";
import { CreateUserRequestBodyDto } from "../dtos/user/create-user-request-body.dto";
import { userService } from "../services/user-service";

class UserController {
  async updateUser(
    req: Request<any, any, CreateUserRequestBodyDto>,
    res: Response,
    next: NextFunction
  ) {
    const user = req.body;
    const user_id = req.params.userId;

    await userService.updateUser(user, user_id);

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(null, "Succes", HttpCode.CREATED));
  }

  async getUsers(
    req: Request<any, any, any>,
    res: Response,
    next: NextFunction
  ) {
    const users = await userService.getUsers();

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(users, "Succes", HttpCode.OK));
  }

  async deleteUser(
    req: Request<any, any, any>,
    res: Response,
    next: NextFunction
  ) {
    const user_id = req.params.userId
      ? parseInt(req.params.userId as string, 10)
      : undefined;

    if (user_id) {
      await userService.deleteUser(user_id);
    }

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(null, "Succes", HttpCode.OK));
  }

  async updateRoles(
    req: Request<any, any, any>,
    res: Response,
    next: NextFunction
  ) {
    const roles = req.body.roles;
    const user_id = req.params.userId;

    await userService.updateRoles(roles, user_id);

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(null, "Succes", HttpCode.CREATED));
  }

  async getRoles(
    req: Request<any, any, any>,
    res: Response,
    next: NextFunction
  ) {
    const roles = await userService.getRoles();

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(roles, "Succes", HttpCode.OK));
  }
}

export const userController = new UserController();
