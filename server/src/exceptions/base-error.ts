import { ErrorResponseDto } from "../dtos/response/error-response.dto";

export class BaseError extends Error {
  status: number;
  errors?: ErrorResponseDto["details"];

  constructor(
    status: number,
    message: string,
    errors?: ErrorResponseDto["details"]
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
