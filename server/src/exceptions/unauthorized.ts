import { ErrorResponseDto } from "../dtos/response/error-response.dto";
import { BaseError } from "./base-error";
import { HttpCode } from "./http-code";

export class Unauthorized extends BaseError {
  constructor(message: string, errors?: ErrorResponseDto["details"]) {
    super(HttpCode.UNAUTHORIZED, message, errors);
  }

  static create(
    message = "User not authorized",
    errors?: ErrorResponseDto["details"]
  ) {
    return new Unauthorized(message, errors);
  }
}
