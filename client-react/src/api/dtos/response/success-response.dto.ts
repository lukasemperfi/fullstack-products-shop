export interface SuccessResponseDto<T> {
  data: T;
  status_message: string;
  status_code: number;
}
