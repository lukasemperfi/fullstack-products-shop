import { Category } from "../../db/models/category.model";
import { CreateCategoryDto } from "../../dtos/products/category/create-category.dto";
import { DeleteCategoryDto } from "../../dtos/products/category/delete-category.dto";
import { GetCategoryDto } from "../../dtos/products/category/get-category.dto";
import { GetTreeCategoryDto } from "../../dtos/products/category/get-tree-category.dto";
import { UpdateCategoryDto } from "../../dtos/products/category/update-category.dto";
import { tree } from "./utils/tree";

class CategoriesService {
  public create = async (category: CreateCategoryDto): Promise<Category> => {
    const newCategory = await Category.create(category);
    return newCategory;
  };
  public delete = async (id: DeleteCategoryDto["id"]): Promise<void> => {
    await Category.delete(id);
  };

  public async getList(): Promise<GetCategoryDto[]> {
    const categories = await Category.getList(true);

    return categories;
  }

  public async getTree(): Promise<GetTreeCategoryDto[]> {
    const categoriesList = await Category.getList();

    const categoriesTree = await tree.listToTree(categoriesList);

    return categoriesTree;
  }

  public async update(categoryData: UpdateCategoryDto): Promise<void> {
    await Category.update(categoryData);
  }
}
export const categoriesService = new CategoriesService();
