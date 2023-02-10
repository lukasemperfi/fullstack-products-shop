import { PaginatedListDto } from "../pagination/paginated-list.dto";
import { ProductDto } from "./product.dto";

export type GetProductsListDto = PaginatedListDto<ProductDto>;
