import { Request, Response, NextFunction } from "express-serve-static-core";

export const parseToStringAndSaveReqParamsToBody = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const productId = parseInt(req.params.productId, 10);

  req.body = {
    ...req.body,
    productId,
  };

  next();
};
