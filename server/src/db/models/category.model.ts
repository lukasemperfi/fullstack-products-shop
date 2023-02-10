import { AnyQueryBuilder, QueryContext } from "objection";

import { CreateCategoryDto } from "../../dtos/products/category/create-category.dto";
import { UpdateCategoryDto } from "../../dtos/products/category/update-category.dto";
import { NotFoundError } from "../../exceptions/not-found-error";
import { BaseModel } from "./base-model.model";

export class Category extends BaseModel {
  static tableName = "category";

  id: number;
  parent_id: number | null;
  name: string;
  path: string;
  search_visibility: number;

  static get modifiers() {
    return {
      getParentCategories(
        builder: AnyQueryBuilder,
        path: string,
        parent_id: number
      ) {
        if (parent_id) {
          builder.where("category.parent_id", "=", parent_id);
        } else {
          return builder;
        }

        if (path) {
          const lastIndex = path.lastIndexOf("/") + 1;
          const parentPath = path.slice(0, lastIndex);

          builder.where("category.path", "like", `${parentPath}%`);
        } else {
          return builder;
        }
      },

      showVisibillityCategories(
        builder: AnyQueryBuilder,
        isVisibillity: boolean
      ) {
        if (isVisibillity) {
          builder.where("search_visibility", "=", "1");
        } else {
          return builder;
        }
      },
    };
  }

  async $afterInsert(queryContext: QueryContext) {
    await super.$afterInsert(queryContext);
    const { id, parent_id } = this;
    const path = await Category.generatePath(parent_id, id);
    await Category.query().findById(id).patch({ path });
  }

  static async create(category: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.query().insertAndFetch({
      ...category,
    });

    return newCategory;
  }

  static async delete(id: Category["id"]): Promise<void> {
    await this.query().deleteById(id);
  }
  static async getList(isVisibillity?: boolean): Promise<any> {
    const categories = await this.query().modify(
      "showVisibillityCategories",
      isVisibillity
    );

    return categories;
  }

  static async update(categoryData: UpdateCategoryDto): Promise<void> {
    const { id, name } = categoryData;

    const category = await this.query().findById(id);

    if (!category) {
      throw new NotFoundError("category id not found");
    }

    await this.query().findById(id).patch({
      name,
    });
  }

  static async generatePath(
    parent_id: Category["parent_id"],
    insertedCategoryId: Category["id"]
  ): Promise<string> {
    const separator = "/";
    if (parent_id === null) {
      return `${insertedCategoryId}`;
    }

    const category = await this.query().findOne({ id: parent_id });

    if (!category) {
      throw new NotFoundError("category not found");
    }
    const { path: parentPath } = category;

    return `${parentPath}${separator}${insertedCategoryId}`;
  }
}
