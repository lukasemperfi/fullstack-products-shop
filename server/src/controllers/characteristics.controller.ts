import { RequestHandler } from "express";

import { CreateCharacteristicDto } from "../dtos/products/characteristic/create-characteristic.dto";
import { SuccessResponseDto } from "../dtos/response/success-response.dto";
import { HttpCode } from "../exceptions/http-code";
import { characteristicsService } from "../services/characteristics.service";
import { HttpResponse } from "../utils/http-response";

class CharacteristicsController {
  public create: RequestHandler<
    any,
    SuccessResponseDto<null>,
    CreateCharacteristicDto[]
  > = async (req, res, next) => {
    const characteristics = req.body;
    const productId = parseInt(req.params.productId, 10);

    const succesMessage = await characteristicsService.create(
      characteristics,
      productId
    );

    return res.json(
      HttpResponse.success(null, succesMessage, HttpCode.CREATED)
    );
  };

  public getList: RequestHandler<
    any,
    SuccessResponseDto<null>,
    CreateCharacteristicDto[]
  > = async (req, res, next) => {
    const characteristics = req.body;
    const productId = parseInt(req.params.productId, 10);

    const succesMessage = await characteristicsService.create(
      characteristics,
      productId
    );

    return res.json(
      HttpResponse.success(null, succesMessage, HttpCode.CREATED)
    );
  };
}

export const characteristicsController = new CharacteristicsController();
