import { Favorite } from "../db/models/favorite.model";
import { Product } from "../db/models/product.model";
import { CreateFavoriteDto } from "../dtos/products/favorite/create-favorite.dto";
import { PaginatedListDto } from "../dtos/pagination/paginated-list.dto";
import { ProductFiltersDto } from "../dtos/filters/product-filters.dto";

class FavoritesService {
  public create = async (
    product_id: CreateFavoriteDto["product_id"],
    user_id: CreateFavoriteDto["user_id"]
  ): Promise<void> => {
    await Favorite.create(product_id, user_id);
  };

  public delete = async (
    product_id: CreateFavoriteDto["product_id"],
    user_id: CreateFavoriteDto["user_id"]
  ): Promise<void> => {
    await Favorite.delete(product_id, user_id);
  };

  public getFilteredList = async (
    filters: ProductFiltersDto,
    user_id: number
  ): Promise<PaginatedListDto<Product>> => {
    const paginatedFavoritesList = await Favorite.getFilteredList(
      filters,
      user_id
    );

    return paginatedFavoritesList;
  };
}
export const favoritesService = new FavoritesService();
