import { View } from "../db/models/view.model";
import { GetOneProductDto } from "../dtos/products/product/get-one-product.dto";

class ViewService {
  public create = async (productId: GetOneProductDto["id"]): Promise<void> => {
    await View.create(productId);
  };
}
export const viewService = new ViewService();
