import { RequestHandler } from "express";

import { AttributeAndValue } from "../dtos/products/attribute/attribute-and-value.dto";
import { SuccessResponseDto } from "../dtos/response/success-response.dto";
import { HttpCode } from "../exceptions/http-code";
import { attributesService } from "../services/attributes.service";
import { HttpResponse } from "../utils/http-response";

class AttributesController {
  public getAttributesAndValues: RequestHandler<
    any,
    SuccessResponseDto<AttributeAndValue[]>,
    any
  > = async (req, res, next) => {
    const category_id = parseInt(req.params.categoryId, 10);

    const attributesAndValues = await attributesService.getAttributesAndValues(
      category_id
    );

    return res
      .status(HttpCode.OK)
      .json(HttpResponse.success(attributesAndValues, "Succes", HttpCode.OK));
  };
}

export const attributesController = new AttributesController();
