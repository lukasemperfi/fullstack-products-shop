import { ErrorResponseDto } from "../dtos/response/error-response.dto";
import { BaseError } from "./base-error";
import { HttpCode } from "./http-code";

export class NotFoundError extends BaseError {
  constructor(message: string, errors?: ErrorResponseDto["details"]) {
    super(HttpCode.NOT_FOUND, message, errors);
  }

  static create(
    message = "Item not found",
    errors?: ErrorResponseDto["details"]
  ) {
    return new NotFoundError(message, errors);
  }
}
