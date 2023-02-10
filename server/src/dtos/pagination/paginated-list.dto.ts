export class PaginatedListDto<T> {
  constructor(
    public readonly page: number,
    public readonly results: T[],
    public readonly total_results: number,
    public readonly total_pages: number
  ) {}

  public static toDto<U>(
    page: number,
    results: U[],
    total: number,
    page_limit: number
  ) {
    const total_pages = Math.ceil(total / page_limit);

    return new PaginatedListDto<U>(page, results, total, total_pages);
  }
}
