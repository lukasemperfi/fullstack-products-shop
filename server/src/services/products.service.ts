import { CreateImageDto } from "../dtos/products/image/create-image.dto";
import { CreateProductRequestBodyDto } from "../dtos/products/product/create-product-request-body.dto";
import { Product } from "../db/models/product.model";
import { CreateProductDto } from "../dtos/products/product/create-product.dto";
import { GetOneProductDto } from "../dtos/products/product/get-one-product.dto";
import { NotFoundError } from "../exceptions/not-found-error";
import { filesService } from "./files.service";
import { ProductFiltersDto } from "../dtos/filters/product-filters.dto";
import { PaginatedListDto } from "../dtos/pagination/paginated-list.dto";
import { ProductFiltersDataDto } from "../dtos/filters/filters-data/product-filters-data.dto";
import { SearchedProductsAndCategories } from "../dtos/products/search/searched-products-and-categories.dto";
import { PriceDynamicDto } from "../dtos/products/price-dynamic/price-dynamic.dto";

class ProductsService {
  public create = async (
    newProduct: CreateProductRequestBodyDto
  ): Promise<void> => {
    const { images, attributes, ...rest } = newProduct;
    const imagesPath = filesService.generateImagesPath(images);
    const imagesData = imagesPath.map((imagePath, index) =>
      CreateImageDto.toDto(imagePath, index + 1)
    );
    const attributesDto = CreateProductDto.attributesToDto(attributes);
    const product = { ...rest, images: imagesData, attributes: attributesDto };

    await Product.create(product);
  };

  public getOne = async (
    productId: GetOneProductDto["id"],
    user_id: string
  ): Promise<GetOneProductDto> => {
    const product = await Product.getOneProduct(productId, user_id);

    if (!product) {
      throw NotFoundError.create(`Product with id=${productId} not found.`);
    }

    return product;
  };

  public getFilteredList = async (
    filters?: ProductFiltersDto,
    user_id?: number
  ): Promise<PaginatedListDto<GetOneProductDto>> => {
    const filteredList = await Product.getFilteredList(filters, user_id);

    return filteredList;
  };

  public getProductsStatistic = async (): Promise<any> => {
    const statistic = await Product.getProductsStatistic();

    return statistic;
  };

  public delete = async (productId: number): Promise<void> => {
    const product = await Product.getProductById(productId);

    if (!product) {
      throw NotFoundError.create(`Product with id=${productId} not found`);
    }

    await Product.deleteById(productId);
  };

  public update = async (
    productId: number,
    newProduct: CreateProductRequestBodyDto
  ): Promise<void> => {
    const { images, attributes, ...rest } = newProduct;
    const imagesPath = filesService.generateImagesPath(images);

    const imagesData = imagesPath.map((imagePath, index) =>
      CreateImageDto.toDto(imagePath, index + 1)
    );
    const attributesDto = CreateProductDto.attributesToDto(attributes);
    const product = { ...rest, images: imagesData, attributes: attributesDto };

    await Product.update(productId, product);
  };

  public getFiltersData = async (
    category_id: number,
    search_query: string
  ): Promise<ProductFiltersDataDto> => {
    const filtersData = await Product.getFiltersData(category_id, search_query);

    return filtersData;
  };

  public getSearchedProductsAndCategories = async (
    searchQuery: string
  ): Promise<SearchedProductsAndCategories> => {
    const searchedProductsAndCategories =
      await Product.getSearchedProductsAndCategories(searchQuery);

    return searchedProductsAndCategories;
  };

  public getPriceDynamicList = async (
    product_id: number
  ): Promise<PriceDynamicDto[]> => {
    const priceDynamicList = await Product.getPriceDynamicList(product_id);

    return priceDynamicList;
  };
}
export const productsService = new ProductsService();
