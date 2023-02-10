import { NextFunction, Request, Response } from "express";

import { tokenService } from "../services/tokenService";
import { Unauthorized } from "../exceptions/unauthorized";

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(Unauthorized.create());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(Unauthorized.create());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(Unauthorized.create());
    }

    req.user = userData;

    next();
  } catch (e) {
    return next(Unauthorized.create());
  }
};
