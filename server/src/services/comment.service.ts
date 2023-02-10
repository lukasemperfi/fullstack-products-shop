import { Comment } from "../db/models/comment.model";
import { PaginatedListDto } from "../dtos/pagination/paginated-list.dto";
import { CreateCommentDto } from "../dtos/products/comment/create-comment.dto";
import { GetCommentListDto } from "../dtos/products/comment/get-comment-list.dto";

class CommentService {
  public create = async (commentDto: CreateCommentDto): Promise<void> => {
    await Comment.create(commentDto);
  };

  public delete = async (commentId: number): Promise<void> => {
    await Comment.delete(commentId);
  };

  public getList = async (
    commentsDto: GetCommentListDto
  ): Promise<PaginatedListDto<Comment>> => {
    const paginatedcommentsList = await Comment.getSortedList(commentsDto);

    return paginatedcommentsList;
  };
}
export const commentService = new CommentService();
