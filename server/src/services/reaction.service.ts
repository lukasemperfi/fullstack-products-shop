import { Reaction } from "../db/models/reaction.model";
import { CreateReactionDto } from "../dtos/products/reaction/create-reaction.dto";
import { DeleteReactionDto } from "../dtos/products/reaction/delete-reaction.dto";

class ReactionService {
  public create = async (reaction: CreateReactionDto): Promise<void> => {
    await Reaction.create(reaction);
  };
  public delete = async (
    product_id: DeleteReactionDto["product_id"],
    user_id: DeleteReactionDto["user_id"]
  ): Promise<void> => {
    await Reaction.delete(product_id, user_id);
  };

  public update = async (reaction: CreateReactionDto): Promise<void> => {
    await Reaction.update(reaction);
  };
}
export const reactionService = new ReactionService();
