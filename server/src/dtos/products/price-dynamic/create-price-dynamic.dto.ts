export class CreatePriceDynamicDto {
  constructor(
    public readonly product_id: number,
    public readonly new_price: number
  ) {}
}
