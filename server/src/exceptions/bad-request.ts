import { ErrorResponseDto } from "../dtos/response/error-response.dto";
import { BaseError } from "./base-error";
import { HttpCode } from "./http-code";

export class BadRequest extends BaseError {
  constructor(message: string, errors?: ErrorResponseDto["details"]) {
    super(HttpCode.BAD_REQUEST, message, errors);
  }

  static create(message: string, errors?: ErrorResponseDto["details"]) {
    return new BadRequest(message, errors);
  }
}
