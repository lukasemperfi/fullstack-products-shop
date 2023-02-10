import { Request, Response, NextFunction } from "express";
import { AnyObjectSchema } from "yup";

import { BadRequest } from "../exceptions/bad-request";
import { transformYupErrorsIntoObject } from "../utils/transform-yup-errors-into-object";

export const validate =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { abortEarly: false }
      );
      return next();
    } catch (err: any) {
      return next(
        BadRequest.create(`Validation error`, transformYupErrorsIntoObject(err))
      );
    }
  };
