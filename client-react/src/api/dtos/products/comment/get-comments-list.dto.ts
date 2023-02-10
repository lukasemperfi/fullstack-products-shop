import { PaginatedListDto } from "api/dtos/pagination/paginated-list.dto";
import { CommentDto } from "./comment.dto";

export type GetCommentsListDto = PaginatedListDto<CommentDto>;
