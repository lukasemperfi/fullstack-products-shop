import { NextFunction, Request, Response } from "express";

import { HttpCode } from "../exceptions/http-code";
import { HttpResponse } from "../utils/http-response";
import { authService } from "../services/authService";
import { CreateUserRequestBodyDto } from "../dtos/user/create-user-request-body.dto";

const cookieMaxAge = 30 * 24 * 60 * 60 * 1000;

class AuthController {
  async registration(
    req: Request<any, any, CreateUserRequestBodyDto>,
    res: Response,
    next: NextFunction
  ) {
    const user = req.body;

    const userData = await authService.registration({ ...user });

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(userData, "Succes", HttpCode.CREATED));
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const userData = await authService.login(email, password);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(userData, "Succes", HttpCode.OK));
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;

    const token = await authService.logout(refreshToken);

    res.clearCookie("refreshToken");

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(token, "Succes", HttpCode.OK));
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;

    const userData = await authService.refresh(refreshToken);

    res.cookie("refreshToken", userData?.refreshToken, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });
    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(userData, "Succes", HttpCode.OK));
  }
}

export const authController = new AuthController();
