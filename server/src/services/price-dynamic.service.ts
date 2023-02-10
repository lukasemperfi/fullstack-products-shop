import { PriceDynamic } from "../db/models/price-dynamic.model";
import { CreatePriceDynamicDto } from "../dtos/products/price-dynamic/create-price-dynamic.dto";

class PriceDynamicService {
  public create = async (newPrice: CreatePriceDynamicDto): Promise<void> => {
    await PriceDynamic.create({ ...newPrice });
  };
}
export const priceDynamicService = new PriceDynamicService();
