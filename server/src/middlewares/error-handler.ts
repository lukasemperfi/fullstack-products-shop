import { ErrorRequestHandler } from "express";
import {
  NotFoundError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
  DBError,
} from "objection";
import { ValidationError } from "yup";

import { BaseError } from "../exceptions/base-error";
import { HttpCode } from "../exceptions/http-code";
import { HttpResponse } from "../utils/http-response";

export const errorHandler: ErrorRequestHandler<any, any> = (
  err,
  req,
  res,
  next
) => {

  if (err instanceof BaseError) {
    return res
      .status(err.status)
      .json(HttpResponse.failed(err.message, err.status, err.errors));
  }

  if (err instanceof ValidationError) {
    switch (err.type) {
      case "ModelValidation":
        res
          .status(400)
          .json(
            HttpResponse.failed(
              "ModelValidation Error",
              HttpCode.INTERNAL_SERVER_ERROR
            )
          );
        break;
      case "RelationExpression":
        res
          .status(400)
          .json(
            HttpResponse.failed(
              "RelationExpression Error",
              HttpCode.INTERNAL_SERVER_ERROR
            )
          );
        break;
      case "UnallowedRelation":
        res
          .status(400)
          .json(
            HttpResponse.failed(
              "UnallowedRelation Error",
              HttpCode.INTERNAL_SERVER_ERROR
            )
          );
        break;
      case "InvalidGraph":
        res
          .status(400)
          .json(
            HttpResponse.failed(
              "InvalidGraph Error",
              HttpCode.INTERNAL_SERVER_ERROR
            )
          );
        break;
      default:
        res
          .status(400)
          .json(
            HttpResponse.failed(
              "Unforeseen Validation Error",
              HttpCode.INTERNAL_SERVER_ERROR
            )
          );
        break;
    }
  } else if (err instanceof NotFoundError) {
    res.status(404).json(HttpResponse.failed("NotFoundError", 404, [err]));
  } else if (err instanceof UniqueViolationError) {
    res
      .status(409)
      .json(HttpResponse.failed("UniqueViolation Error", 409, [err]));
  } else if (err instanceof NotNullViolationError) {
    res.status(400).json(HttpResponse.failed("NotNullViolation Error", 400));
  } else if (err instanceof ForeignKeyViolationError) {
    res.status(409).json(HttpResponse.failed("ForeignKeyViolation Error", 409));
  } else if (err instanceof CheckViolationError) {
    res.status(400).json(HttpResponse.failed("CheckViolation Error", 400));
  } else if (err instanceof DataError) {
    res.status(400).json(HttpResponse.failed("DataError", 400));
  } else if (err instanceof DBError) {
    res.status(500).json(HttpResponse.failed("DBError Error", 500, [err]));
  } else {
    res
      .status(500)
      .json(HttpResponse.failed("Unforeseen DB Error", 500, [err]));
  }

  return res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .json(
      HttpResponse.failed("Unforeseen Error", HttpCode.INTERNAL_SERVER_ERROR)
    );
};
