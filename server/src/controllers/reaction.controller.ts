import { RequestHandler } from "express";

import { DeleteReactionDto } from "../dtos/products/reaction/delete-reaction.dto";
import { SuccessResponseDto } from "../dtos/response/success-response.dto";
import { HttpCode } from "../exceptions/http-code";
import { reactionService } from "../services/reaction.service";
import { HttpResponse } from "../utils/http-response";

class ReactionController {
  public create: RequestHandler<any, SuccessResponseDto<null>> = async (
    req,
    res,
    next
  ) => {
    const reaction = {
      user_id: req.body.user_id,
      reaction_action: req.body.reaction_action,
      product_id: req.params.productId,
    };

    await reactionService.create(reaction);

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(null, "success", HttpCode.CREATED));
  };

  public delete: RequestHandler<
    any,
    SuccessResponseDto<null>,
    DeleteReactionDto
  > = async (req, res, next) => {
    const { user_id } = req.body;
    const product_id = req.params.productId;

    await reactionService.delete(product_id, user_id);

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(null, "success", HttpCode.OK));
  };

  public update: RequestHandler<any, SuccessResponseDto<null>> = async (
    req,
    res,
    next
  ) => {
    const reaction = {
      user_id: req.body.user_id,
      reaction_action: req.body.reaction_action,
      product_id: req.params.productId,
    };

    await reactionService.update(reaction);

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(null, "success", HttpCode.CREATED));
  };
}

export const reactionController = new ReactionController();
