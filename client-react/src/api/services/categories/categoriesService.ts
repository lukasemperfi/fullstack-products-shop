import { CategoryDto } from "api/dtos/categories/category.dto";
import { GetTreeCategoryDto } from "api/dtos/categories/get-tree-category.dto";
import { CreateAttributeDto } from "api/dtos/products/attribute/create-attribute.dto";
import { SuccessResponseDto } from "api/dtos/response/success-response.dto";
import { httpApi } from "api/http";
import { CategoriesPath } from "./categoriesPath";

class Categories {
  public getList = async () => {
    const response = await httpApi.get<SuccessResponseDto<CategoryDto[]>>(
      CategoriesPath.Categories
    );

    return response;
  };

  public getTree = async () => {
    const response = await httpApi.get<
      SuccessResponseDto<GetTreeCategoryDto[]>
    >(CategoriesPath.CategoriesTree);

    return response;
  };

  public createCategory = async (parent_id: number | null, name: string) => {
    const response = await httpApi.post<SuccessResponseDto<CategoryDto>>(
      CategoriesPath.Categories,
      {
        parent_id,
        name,
      }
    );
    return response.data;
  };

  public updateCategoryName = async (id: number, name: string) => {
    const response = await httpApi.patch<SuccessResponseDto<null>>(
      CategoriesPath.Categories,
      {
        id,
        name,
      }
    );
    return response.data;
  };

  public deleteCategory = async (id: number) => {
    const response = await httpApi.delete<SuccessResponseDto<null>>(
      CategoriesPath.Categories,
      {
        data: {
          id,
        },
      }
    );
    return response.data;
  };

  public getAttributesAndValues = async (category_id: string | number) => {
    const response = await httpApi.get<
      SuccessResponseDto<CreateAttributeDto[]>
    >(`${CategoriesPath.Categories}/${category_id}/attributes`);

    return response;
  };
}

export const categoriesService = new Categories();
