import { Pagination } from "../../pagination/types";

export interface GetFavoritesListDto {
  user_id: number;
  pagination: Pagination;
}
