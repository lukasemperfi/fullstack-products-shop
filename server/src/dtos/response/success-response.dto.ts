export class SuccessResponseDto<T> {
  constructor(
    public readonly data: T,
    public readonly status_message: string,
    public readonly status_code: number = 200
  ) {}
}
