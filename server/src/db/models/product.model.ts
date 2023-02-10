import {
  AnyQueryBuilder,
  Expression,
  Model,
  ModelOptions,
  PrimitiveValue,
  QueryContext,
  raw,
  ref,
  Transaction,
} from "objection";

import { PaginatedListDto } from "../../dtos/pagination/paginated-list.dto";
import { CreateProductDto } from "../../dtos/products/product/create-product.dto";
import { GetOneProductDto } from "../../dtos/products/product/get-one-product.dto";
import { BaseModel } from "./base-model.model";
import { Characteristic } from "./characteristic.model";
import { PriceDynamic } from "./price-dynamic.model";
import { Reaction } from "./reaction.model";
import { View } from "./view.model";
import { ProductCategory } from "./product-category.model";
import { Image } from "./image.model";
import { ProductFiltersDto } from "../../dtos/filters/product-filters.dto";
import { Attribute } from "./attribute.model";
import { ProductAttributeValue } from "./product_attribute_value.model";
import { AttributeValue } from "./attribute-value.model";
import { Category } from "./category.model";
import { Favorite } from "./favorite.model";
import {
  ReactionAction,
  REACTION_ACTION,
} from "../../dtos/products/reaction/types";
import { User } from "./user.model";
import { ProductFiltersDataDto } from "../../dtos/filters/filters-data/product-filters-data.dto";
import { GetCategoryDto } from "../../dtos/products/category/get-category.dto";
import { ProductFiltersPriceDto } from "../../dtos/filters/filters-data/product-filters-price.dto";
import { ProductFiltersAttributeDto } from "../../dtos/filters/filters-data/product-filters-attribute.dto";
import { SearchedProductsAndCategories } from "../../dtos/products/search/searched-products-and-categories.dto";
import { PriceDynamicDto } from "../../dtos/products/price-dynamic/price-dynamic.dto";

export class Product extends BaseModel {
  static tableName = "product";

  id: number;
  name: string;
  description: string;
  price: number;
  views: number;
  like: number;
  dislike: number;

  static relationMappings = {
    attribute: {
      relation: Model.ManyToManyRelation,
      modelClass: Attribute,
      join: {
        from: "product.id",
        through: {
          from: "product_attribute_value.product_id",
          to: "product_attribute_value.attribute_id",
        },
        to: "attribute.id",
      },
    },
    attribute_value: {
      relation: Model.ManyToManyRelation,
      modelClass: AttributeValue,
      join: {
        from: "product.id",
        through: {
          from: "product_attribute_value.product_id",
          to: "product_attribute_value.attribute_id",
        },
        to: "attribute_value.id",
      },
    },
    product_attribute_value: {
      relation: Model.HasManyRelation,
      modelClass: ProductAttributeValue,
      join: {
        from: "product.id",
        to: "product_attribute_value.product_id",
      },
    },
    characteristics: {
      relation: Model.HasManyRelation,
      modelClass: Characteristic,
      join: {
        from: "product.id",
        to: "characteristic.product_id",
      },
    },
    views: {
      relation: Model.HasManyRelation,
      modelClass: View,
      join: {
        from: "product.id",
        to: "view.product_id",
      },
    },
    reaction: {
      relation: Model.HasManyRelation,
      modelClass: Reaction,
      join: {
        from: "product.id",
        to: "reaction.product_id",
      },
    },
    product_category: {
      relation: Model.HasManyRelation,
      modelClass: ProductCategory,
      join: {
        from: "product.id",
        to: "product_category.product_id",
      },
    },
    images: {
      relation: Model.HasManyRelation,
      modelClass: Image,
      join: {
        from: "product.id",
        to: "image.product_id",
      },
    },
    price_dynamic: {
      relation: Model.HasManyRelation,
      modelClass: PriceDynamic,
      join: {
        from: "product.id",
        to: "price_dynamic.product_id",
      },
    },

    category: {
      relation: Model.ManyToManyRelation,
      modelClass: Category,
      join: {
        from: "product.id",
        through: {
          from: "product_category.product_id",
          to: "product_category.category_id",
        },
        to: "category.id",
      },
    },
    favorite: {
      relation: Model.HasManyRelation,
      modelClass: Favorite,
      join: {
        from: "product.id",
        to: "favorite.product_id",
      },
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: Product,
      join: {
        from: "product.id",
        to: "product.id",
      },
    },

    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "product.id",
        to: "product.id",
      },
    },
  };

  static get modifiers() {
    return {
      filterProductsByPrice(
        builder: AnyQueryBuilder,
        range: [Expression<PrimitiveValue>, Expression<PrimitiveValue>]
      ) {
        builder.whereBetween("price", range);
      },

      filterProductsByCategory(builder: AnyQueryBuilder, category_id: number) {
        if (category_id) {
          builder
            .joinRelated("product_category")
            .where("product_category.category_id", "=", category_id);
        } else {
          return builder;
        }
      },
      filterProductsByAttributes(
        builder: AnyQueryBuilder,
        attr_value_ids: string[] | number[]
      ) {
        if (attr_value_ids && attr_value_ids.length) {
          const havingCount = attr_value_ids.length;
          builder
            .joinRelated("product_attribute_value")
            .whereIn(
              "product_attribute_value.attribute_value_id",
              attr_value_ids
            )

            .groupBy("id")
            .having(raw(`count(*) = ${havingCount}`));
        } else {
          return builder;
        }
      },
      filterProductsBySearchQuery(
        builder: AnyQueryBuilder,
        searchQuery?: string
      ) {
        const search_query = searchQuery?.trim();

        if (search_query) {
          const searchQueries = search_query.split(" ");

          builder
            .orWhere("product.name", "like", `%${searchQueries[0]}%`)
            .modify((builder) => {
              for (let i = 1; i < searchQueries.length; i++) {
                const word = searchQueries[i];
                builder.orWhere("product.name", "like", `%${word}%`);
              }
            });
        } else {
          return builder;
        }
      },

      filterProductsAndCategoriesBySearchQuery(
        builder: AnyQueryBuilder,
        searchQuery: string
      ) {
        if (searchQuery) {
          const searchQueries = searchQuery.split(" ");

          builder
            .orWhere("product.name", "like", `%${searchQueries[0]}%`)
            .orWhere("category.name", "like", `%${searchQueries[0]}%`)
            .modify((builder) => {
              for (let i = 1; i < searchQueries.length; i++) {
                const word = searchQueries[i];
                builder.orWhere("product.name", "like", `%${word}%`);
                builder.orWhere("category.name", "like", `%${word}%`);
              }
            });
        } else {
          return builder;
        }
      },

      selectProductWithFavoriteField(
        builder: AnyQueryBuilder,
        user_id?: number
      ) {
        const userId = user_id ? user_id : 0;

        builder.select([
          "id",
          "name",
          "price",
          "description",
          "views",
          "like",
          "dislike",
          Favorite.query()
            .where("product_id", ref("product.id"))
            .andWhere("user_id", userId)
            .count()
            .as("is_favorite"),
          Favorite.query()
            .where("product_id", ref("product.id"))
            .count()
            .as("favorite_count"),
          Reaction.query()
            .where("product_id", ref("product.id"))
            .andWhere("user_id", userId)
            .count()
            .as("reaction"),
        ]);
      },

      filterProducts(
        builder: AnyQueryBuilder,
        filters: ProductFiltersDto,
        user_id?: number
      ) {
        const {
          category_id,
          page = 1,
          sort = "ASC",
          min_price = 0,
          max_price = 9999999999,
          attributes,
          search_query,
        } = filters;
        const page_limit = 4;
        const userId = user_id ? user_id : 0;

        builder
          .modify("filterProductsByCategory", category_id)
          .modify("filterProductsByAttributes", attributes)
          .modify("filterProductsByPrice", [min_price, max_price])
          .modify("filterProductsBySearchQuery", search_query)
          .withGraphFetched("[product_attribute_value as attributes, images]")
          .modifyGraph("attributes", "getProductAttributes")
          .modify("selectProductWithFavoriteField", userId)
          .orderBy("price", sort)
          .page(page - 1, page_limit);
      },
    };
  }

  static async incrementLikeOrDislikeStatistic(
    product_id: Product["id"],
    reaction_action: ReactionAction
  ): Promise<void> {
    if (reaction_action === REACTION_ACTION.like) {
      await this.query().findById(product_id).increment("like", 1);
    }
    if (reaction_action === REACTION_ACTION.dislike) {
      await this.query().findById(product_id).increment("dislike", 1);
    }
  }

  static async decrementLikeOrDislikeStatistic(
    product_id: Product["id"],
    reaction_action: ReactionAction
  ): Promise<void> {
    if (reaction_action === REACTION_ACTION.like) {
      await this.query().findById(product_id).decrement("like", 1);
    }
    if (reaction_action === REACTION_ACTION.dislike) {
      await this.query().findById(product_id).decrement("dislike", 1);
    }
  }

  static async getSearchedProductsAndCategories(
    searchQuery: string
  ): Promise<SearchedProductsAndCategories> {
    const products = (await Product.query()
      .joinRelated("category")
      .modify("filterProductsAndCategoriesBySearchQuery", searchQuery)
      .withGraphFetched("[product_attribute_value as attributes, images]")
      .select("product.*")
      .distinct("product.id")
      .limit(5)) as unknown as GetOneProductDto[];

    const categories = (await Product.query()
      .joinRelated("category")
      .modify("filterProductsAndCategoriesBySearchQuery", searchQuery)
      .select("category.*")
      .distinct("category.id")
      .limit(5)) as unknown as GetCategoryDto[];

    const searchedProductsAndCategories = {
      products: products,
      categories: categories,
    };

    return searchedProductsAndCategories;
  }

  static async getFiltersData(
    category_id: number,
    search_query?: string
  ): Promise<ProductFiltersDataDto> {
    const categories = (await Product.query()
      .joinRelated("category")
      .modify("filterProductsAndCategoriesBySearchQuery", search_query)
      .distinct("category.id")
      .select("category.*")) as unknown as GetCategoryDto[];

    const price = (await Product.query()
      .modify("filterProductsByCategory", category_id)
      .min("price as min")
      .max("price as max")
      .first()) as unknown as ProductFiltersPriceDto;

    const attributes = category_id
      ? ((await Attribute.query()
          .select("id", "name", "order")
          .where("category_id", category_id)
          .withGraphFetched("attribute_value as values")
          .modifyGraph("values", (builder) => {
            builder.select("id", "value", "order");
          })) as unknown as ProductFiltersAttributeDto[])
      : [];

    const filtersData = {
      categories: categories,
      price: price ? price : { min: 0, max: 0 },
      attributes: attributes ? attributes : [],
    };

    return filtersData;
  }

  static async getOneProduct(
    productId: GetOneProductDto["id"],
    user_id: string
  ): Promise<GetOneProductDto | undefined> {
    const product = (await Product.query()
      .withGraphFetched(
        "[product_attribute_value as attributes, images, product_category as category]"
      )
      .modifyGraph("attributes", "getProductAttributes")
      .modify("selectProductWithFavoriteField", user_id)
      .findById(productId)) as GetOneProductDto | undefined;

    return product;
  }

  static async getFilteredList(
    filters?: ProductFiltersDto,
    user_id?: number
  ): Promise<PaginatedListDto<GetOneProductDto>> {
    const {
      category_id,
      page = 1,
      sort = "ASC",
      min_price = 0,
      max_price = 9999999999,
      attributes,
      search_query,
    } = filters || {};
    const page_limit = 4;
    const { results, total } = await Product.query()
      .modify("filterProductsByCategory", category_id)
      .modify("filterProductsByAttributes", attributes)
      .modify("filterProductsByPrice", [min_price, max_price])
      .modify("filterProductsBySearchQuery", search_query)
      .withGraphFetched("[product_attribute_value as attributes, images]")
      .modifyGraph("attributes", "getProductAttributes")
      .modify("selectProductWithFavoriteField", user_id)
      .orderBy("price", sort)
      .page(page - 1, page_limit);

    const filteredList = PaginatedListDto.toDto(
      page,
      results,
      total,
      page_limit
    );

    return filteredList as unknown as PaginatedListDto<GetOneProductDto>;
  }

  static async isProductNameUniq(name: string) {
    const product = await Product.query().findOne({ name });

    return !product;
  }

  static async isProductExist(productId: GetOneProductDto["id"]) {
    const product = await Product.query().findById(productId);

    return !!product;
  }

  static async getProductById(productId: GetOneProductDto["id"]) {
    const product = await Product.query().findById(productId);

    return product;
  }

  static async relatedBatchInsert(
    product: Product,
    relationName: string,
    items: any[],
    trx: Transaction
  ) {
    for (const key in items) {
      if (Object.prototype.hasOwnProperty.call(items, key)) {
        const element = items[key];
        await product.$relatedQuery(relationName, trx).insert(element);
      }
    }
  }

  static async create(newProduct: CreateProductDto): Promise<void> {
    const { info, attributes, category, images } = newProduct;

    await this.transaction(async (trx) => {
      const product = await this.query(trx).insert({
        ...info,
      });

      if (attributes.length) {
        await this.relatedBatchInsert(
          product,
          "product_attribute_value",
          attributes,
          trx
        );
      }

      await product
        .$relatedQuery("product_category", trx)
        .insert({ category_id: category });

      if (images.length > 0) {
        const imagesData = images.map((image) => ({
          ...image,
          product_id: product.id,
        }));
        await this.relatedBatchInsert(product, "images", imagesData, trx);
      }

      await product.$relatedQuery("price_dynamic", trx).insert({
        new_price: product.$query().select("price"),
      });
    });
  }

  static async getPriceDynamicList(
    product_id: number
  ): Promise<PriceDynamicDto[]> {
    const price_dynamic = await PriceDynamic.query().where(
      "product_id",
      product_id
    );

    return price_dynamic as unknown as PriceDynamicDto[];
  }

  static async update(productId: number, newProduct: CreateProductDto) {
    const { info, attributes, category, images, imagesForDelete } = newProduct;
    const oldPrice = (
      await Product.query().findById(productId).select("price").first()
    )?.price;

    const newPrice = info.price;

    await this.transaction(async (trx) => {
      const product = await this.query(trx).patchAndFetchById(productId, {
        ...info,
      });

      if (attributes.length) {
        await ProductAttributeValue.query(trx)
          .delete()
          .where("product_id", productId);

        await this.relatedBatchInsert(
          product,
          "product_attribute_value",
          attributes,
          trx
        );
      }

      await product
        .$relatedQuery("product_category", trx)
        .for(productId)
        .patch({ category_id: category });

      if (imagesForDelete?.length) {
        for (const key in imagesForDelete) {
          if (Object.prototype.hasOwnProperty.call(imagesForDelete, key)) {
            const imagePath = imagesForDelete[key];

            await product
              .$relatedQuery("images", trx)
              .delete()
              .where("path", imagePath);
          }
        }
      }

      if (images.length) {
        const imagesData = images.map((image) => ({
          ...image,
          product_id: product.id,
        }));

        await this.relatedBatchInsert(product, "images", imagesData, trx);
      }

      if (oldPrice !== newPrice) {
        await product.$relatedQuery("price_dynamic", trx).insert({
          new_price: newPrice,
        });
      }
    });
  }

  static async deleteById(productId: GetOneProductDto["id"]): Promise<any> {
    await Product.query().deleteById(productId);
  }

  static async getProductsStatistic(): Promise<any> {
    const mostViewed = await Product.query()
      .select("id", "name", "views as total")
      .where("views", "=", Product.query().max("views"))
      .withGraphFetched("images")
      .modifyGraph("images", (builder) => {
        builder.select("id", "path", "order").orderBy("order", "asc");
      })
      .first();
    const mostLiked = await Product.query()
      .select("id", "name", "like as total")
      .where("like", "=", Product.query().max("like"))
      .withGraphFetched("images")
      .modifyGraph("images", (builder) => {
        builder.select("id", "path", "order").orderBy("order", "asc");
      })
      .first();

    const mostFavorite = await Product.query()
      .joinRelated("favorite")
      .withGraphFetched("images")
      .modifyGraph("images", (builder) => {
        builder.select("id", "path", "order").orderBy("order", "asc");
      })
      .select("id", "name")
      .count("* as total")
      .groupBy("id")
      .orderBy("total", "DESC")
      .limit(1)
      .first();

    const usersReg = await User.query()
      .select(raw("DAY(`created_at`) day_of_month"))
      .count("* as total")
      .whereRaw("MONTH(created_at) = MONTH(NOW())")
      .groupBy("day_of_month")
      .orderBy("day_of_month");

    const statistic = {
      most_viewed: mostViewed || {},
      most_liked: mostLiked || {},
      most_favorite: mostFavorite || {},
      users_for_curr_month: usersReg,
    };

    return statistic;
  }
}
