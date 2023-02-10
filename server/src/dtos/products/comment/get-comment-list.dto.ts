import { OrderByDirection } from "objection";

export interface GetCommentListDto {
  product_id: number;
  page?: number;
  sort?: OrderByDirection;
}
