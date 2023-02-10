import { Model, ModelOptions, QueryContext, raw } from "objection";

import { CreateReactionDto } from "../../dtos/products/reaction/create-reaction.dto";
import { DeleteReactionDto } from "../../dtos/products/reaction/delete-reaction.dto";
import { ReactionAction } from "../../dtos/products/reaction/types";
import { NotFoundError } from "../../exceptions/not-found-error";
import { BaseModel } from "./base-model.model";
import { Product } from "./product.model";
import { User } from "./user.model";

type LikeAndDislike = { like: number; dislike: number };

export class Reaction extends BaseModel {
  product_id: number;
  user_id: number;
  reaction_action: ReactionAction;

  static tableName = "reaction";

  static get idColumn() {
    return ["product_id", "user_id"];
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "reaction.user_id",
        to: "user.id",
      },
    },
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "reaction.product_id",
        to: "product.id",
      },
    },
  };

  async $afterInsert(queryContext: QueryContext) {
    await super.$afterInsert(queryContext);
    const { product_id, reaction_action } = this;

    await Product.incrementLikeOrDislikeStatistic(product_id, reaction_action);
  }
  async $afterDelete(queryContext: QueryContext) {
    await super.$afterDelete(queryContext);
    const { product_id, reaction_action } = this;

    await Product.decrementLikeOrDislikeStatistic(product_id, reaction_action);
  }

  async $afterUpdate(opt: ModelOptions, queryContext: QueryContext) {
    await super.$afterUpdate(opt, queryContext);
    const { product_id } = opt.old as Reaction;

    await Reaction.productRatingLikeDislikeTrigger(product_id);
  }

  static async productRatingLikeDislikeTrigger(
    product_id: Product["id"]
  ): Promise<void> {
    const likeAndDislike = await Reaction.calculateLikeAndDislike(product_id);

    if (likeAndDislike) {
      const rating = await Reaction.calculateRating(likeAndDislike);
    }
  }

  static async calculateLikeAndDislike(
    product_id: Product["id"]
  ): Promise<LikeAndDislike | undefined> {
    const likeAndDislike = (await Reaction.query()
      .select(
        raw("count(if(reaction_action=1,1,null))").as("like"),
        raw("count(if(reaction_action=-1,1,null))").as("dislike")
      )
      .findOne({ product_id })) as LikeAndDislike | undefined;

    return likeAndDislike;
  }

  static async calculateRating(
    likeAndDislike: LikeAndDislike
  ): Promise<number> {
    const { like, dislike } = likeAndDislike;
    if (like === 0 || Math.sign(like) === -1) {
      return 0;
    }
    const rating = like / (like + dislike);
    return Math.floor(rating * 100) / 100;
  }

  static async updateProductRatingLikeDislike(
    product_id: Product["id"],
    likeAndDislike: LikeAndDislike
  ) {
    await Product.query().findById(product_id);
  }

  static async isUserAndProductExist(
    user_id: User["id"],
    product_id: Product["id"]
  ) {
    const user = await User.query().findById(user_id);
    const product = await Product.query().findById(product_id);

    return !!(user && product);
  }

  static async create(reaction: CreateReactionDto): Promise<void> {
    const { product_id, user_id, reaction_action } = reaction;
    const isUserAndProductExist = await this.isUserAndProductExist(
      user_id,
      product_id
    );

    if (!isUserAndProductExist) {
      throw new NotFoundError("User or Product doesnot exist");
    }
    await this.query().insert(reaction);
  }

  static async delete(
    product_id: DeleteReactionDto["product_id"],
    user_id: DeleteReactionDto["user_id"]
  ): Promise<void> {
    const reaction = await Reaction.query().findOne({ product_id, user_id });
    if (!reaction) {
      throw new NotFoundError("User or Product doesnot exist");
    }

    await reaction.$query().delete();
  }

  static async update(reaction: CreateReactionDto): Promise<void> {
    const { product_id, user_id, reaction_action } = reaction;

    await Reaction.delete(product_id, user_id);
    await Reaction.create(reaction);
  }
}
