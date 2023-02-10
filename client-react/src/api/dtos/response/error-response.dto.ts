export type ErrorDetails = {
  [key: string]: string;
};
export interface ErrorResponseDto {
  error: string;
  status_code: number;
  details?: any;
}
