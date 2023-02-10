import { NextFunction, Request, Response } from "express";

import { tokenService } from "../services/tokenService";
import { Unauthorized } from "../exceptions/unauthorized";
import { UserRoleDto } from "../dtos/user/user-role.dto";
import { Forbidden } from "../exceptions/forbidden";

export const roleCheck = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
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

      const { roles: userRoles } =
        tokenService.validateAccessToken(accessToken);

      if (!userRoles) {
        return next(Forbidden.create());
      }

      const hasRole = userRoles.some((role) => roles.includes(role.role));

      if (!hasRole) {
        return next(Forbidden.create());
      }

      next();
    } catch (e) {
      return next(Unauthorized.create());
    }
  };
};
