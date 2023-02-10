import { Model, Page } from "objection";

import { PaginatedListDto } from "../../dtos/pagination/paginated-list.dto";
import { CreateCommentDto } from "../../dtos/products/comment/create-comment.dto";
import { GetCommentListDto } from "../../dtos/products/comment/get-comment-list.dto";
import { BaseModel } from "./base-model.model";
import { Product } from "./product.model";
import { User } from "./user.model";

export class Comment extends BaseModel {
  id: number;
  product_id: number;
  user_id: number;
  text: string;

  static tableName = "comment";

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "comment.user_id",
        to: "user.id",
      },
    },
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "comment.product_id",
        to: "product.id",
      },
    },
  };

  static async create(commentDto: CreateCommentDto): Promise<void> {
    await this.query().insert(commentDto);
  }

  static async delete(id: number): Promise<void> {
    await this.query().deleteById(id);
  }

  static async getSortedList(
    commentDto: GetCommentListDto
  ): Promise<PaginatedListDto<Comment>> {
    const { product_id, sort = "desc", page = 1 } = commentDto;


    const page_limit = 2;

    const { results, total } = await Comment.query()
      .joinRelated("user")
      .where("product_id", "=", product_id)
      .select(
        "user.first_name",
        "user.last_name",
        "user.avatar",
        "comment.id",
        "comment.text",
        "comment.created_at",
        "comment.user_id"
      )
      .orderBy("comment.created_at", sort)
      .page(page - 1, page_limit);

    const paginatedList = PaginatedListDto.toDto(
      page,
      results,
      total,
      page_limit
    );

    return paginatedList;
  }
}
