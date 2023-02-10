import { Request, Response, NextFunction } from "express-serve-static-core";

export const updateUserParseFormData = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { phone_number, event, confirm_password, ...rest } = req.body;

  const avatar = req.files?.length && {
    avatar: req.files,
  };

  const phone =
    phone_number === "" || phone_number === undefined ? null : phone_number;

  req.body = {
    ...rest,
    phone_number: phone,
    ...avatar,
  };

  next();
};
