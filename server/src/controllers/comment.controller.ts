import { RequestHandler } from "express";
import { OrderByDirection } from "objection";

import { Comment } from "../db/models/comment.model";
import { PaginatedListDto } from "../dtos/pagination/paginated-list.dto";
import { GetCommentListDto } from "../dtos/products/comment/get-comment-list.dto";
import { SuccessResponseDto } from "../dtos/response/success-response.dto";
import { HttpCode } from "../exceptions/http-code";
import { commentService } from "../services/comment.service";
import { HttpResponse } from "../utils/http-response";

class CommentController {
  public create: RequestHandler<any, SuccessResponseDto<null>> = async (
    req,
    res,
    next
  ) => {
    const product_id = req.params.productId;
    const { user_id, text } = req.body;

    await commentService.create({ product_id, user_id, text });

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(null, "success", HttpCode.CREATED));
  };

  public delete: RequestHandler<any, SuccessResponseDto<null>> = async (
    req,
    res,
    next
  ) => {
    const { commentId } = req.body;

    await commentService.delete(commentId);

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(null, "success", HttpCode.OK));
  };

  public getList: RequestHandler<
    any,
    SuccessResponseDto<PaginatedListDto<Comment>>,
    GetCommentListDto
  > = async (req, res, next) => {
    const commentDto = {
      product_id: req.params.productId as number,
      sort: req.query.sort as unknown as OrderByDirection | undefined,
      page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
    };

    const paginatedcommentsList = await commentService.getList(commentDto);

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(paginatedcommentsList, "Succes", HttpCode.OK));
  };
}

export const commentController = new CommentController();
