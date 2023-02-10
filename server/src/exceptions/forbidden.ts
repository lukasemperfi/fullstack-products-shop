import { ErrorResponseDto } from "../dtos/response/error-response.dto";
import { BaseError } from "./base-error";
import { HttpCode } from "./http-code";

export class Forbidden extends BaseError {
  constructor(message: string, errors?: ErrorResponseDto["details"]) {
    super(HttpCode.FORBIDDEN, message, errors);
  }

  static create(
    message = "You don't have access",
    errors?: ErrorResponseDto["details"]
  ) {
    return new Forbidden(message, errors);
  }
}
