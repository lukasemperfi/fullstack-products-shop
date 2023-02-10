export class CreateImageDto {
  constructor(public readonly path: string, public readonly order?: number) {}

  public static toDto(path: string, order?: number) {
    return new CreateImageDto(path, order);
  }
}
