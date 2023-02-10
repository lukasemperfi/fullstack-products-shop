type ErrorDetails = {
  [key: string]: any;
};
export class ErrorResponseDto {
  constructor(
    public readonly error: string,
    public readonly status_code: number,
    public readonly details?: ErrorDetails[] | ErrorDetails
  ) {}
}
