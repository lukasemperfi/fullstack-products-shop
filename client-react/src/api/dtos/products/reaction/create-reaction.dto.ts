import { ReactionAction } from "./types";

export interface CreateReactionDto {
  product_id: number;
  user_id: number;
  reaction_action: ReactionAction;
}
