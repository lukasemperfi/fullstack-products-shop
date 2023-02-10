import { Info } from "./types";

export type AttributesReqBody = {
  [key: string]: string;
};

export class CreateProductRequestBodyDto {
  public readonly info: Info;
  public readonly attributes: AttributesReqBody;
  public readonly category: number;
  public readonly images: Express.Multer.File[];
  public readonly imagesForDelete: string[];
}
