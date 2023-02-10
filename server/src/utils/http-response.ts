import { ErrorResponseDto } from "../dtos/response/error-response.dto";
import { SuccessResponseDto } from "../dtos/response/success-response.dto";
import { HttpCode } from "../exceptions/http-code";

export class HttpResponse {
  static success<T>(
    data: T,
    status_message: string,
    status_code: number = HttpCode.OK
  ): SuccessResponseDto<T> {
    return new SuccessResponseDto<T>(data, status_message, status_code);
  }

  static failed(
    error: string,
    status_code: number,
    details?: ErrorResponseDto["details"]
  ) {
    return new ErrorResponseDto(error, status_code, details);
  }
}
