import { RequestHandler } from "express";

import { HttpCode } from "../exceptions/http-code";
import { priceDynamicService } from "../services/price-dynamic.service";
import { HttpResponse } from "../utils/http-response";

class PriceDynamicController {
  public create: RequestHandler<any, any> = async (req, res, next) => {
    await priceDynamicService.create({
      new_price: req.body.newPrice,
      product_id: req.body.product_id,
    });
    return res
      .status(HttpCode.CREATED)
      .json(HttpResponse.success(null, "Succes", HttpCode.CREATED));
  };
}

export const priceDynamicController = new PriceDynamicController();
