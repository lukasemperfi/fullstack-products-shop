import { ProductFiltersDto } from "../../dtos/filters/product-filters.dto";
import { Model, Page } from "objection";
import { PaginatedListDto } from "../../dtos/pagination/paginated-list.dto";
import { CreateFavoriteDto } from "../../dtos/products/favorite/create-favorite.dto";
import { BaseModel } from "./base-model.model";
import { Product } from "./product.model";

export class Favorite extends BaseModel {
  product_id: number;
  user_id: number;

  static tableName = "favorite";

  static get idColumn() {
    return ["product_id", "user_id"];
  }

  static relationMappings = {
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "favorite.product_id",
        to: "product.id",
      },
    },
  };

  static async create(
    product_id: CreateFavoriteDto["product_id"],
    user_id: CreateFavoriteDto["user_id"]
  ): Promise<void> {
    await this.query().insert({ product_id, user_id });
  }

  static async delete(
    product_id: CreateFavoriteDto["product_id"],
    user_id: CreateFavoriteDto["user_id"]
  ): Promise<void> {
    await this.query().deleteById([product_id, user_id]);
  }

  static async getFilteredList(
    filters: ProductFiltersDto,
    user_id: number
  ): Promise<PaginatedListDto<Product>> {
    const page_limit = 4;
    const page = filters.page || 1;

    const { results, total } = (await Product.query()
      .joinRelated("favorite")
      .where("favorite.user_id", user_id)
      .modify("filterProducts", filters, user_id)) as unknown as Page<Product>;

    const filteredList = PaginatedListDto.toDto(
      page,
      results,
      total,
      page_limit
    );

    return filteredList;
  }
}
