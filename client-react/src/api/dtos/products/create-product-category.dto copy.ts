import { SelectedCategory } from "components/categories/categories-tree-select/categories-tree-select";

export class CreateProductCategoryDto {
  constructor(public readonly category_id: number) {}

  public static selectedCategoriesToDto(
    selectedCategories: SelectedCategory[]
  ): number[] {
    return selectedCategories.map((category) => category.id);
  }
}
