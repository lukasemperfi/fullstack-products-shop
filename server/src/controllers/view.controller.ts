import { RequestHandler } from "express";

import { SuccessResponseDto } from "../dtos/response/success-response.dto";
import { HttpCode } from "../exceptions/http-code";
import { viewService } from "../services/view.service";
import { HttpResponse } from "../utils/http-response";

class ViewController {
  public create: RequestHandler<any, SuccessResponseDto<null>, any> = async (
    req,
    res,
    next
  ) => {
    const productId = req.params.productId;
    await viewService.create(productId);

    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(null, "Succes", HttpCode.CREATED));
  };
}

export const viewController = new ViewController();
