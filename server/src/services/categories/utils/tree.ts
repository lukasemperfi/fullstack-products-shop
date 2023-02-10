import { Category } from "../../../db/models/category.model";
import { GetTreeCategoryDto } from "../../../dtos/products/category/get-tree-category.dto";
import { MapTreeObj } from "./types";

class Tree {
  public async listToTree(
    list: GetTreeCategoryDto[]
  ): Promise<GetTreeCategoryDto[]> {
    const map: MapTreeObj = {};
    let node: GetTreeCategoryDto;
    const roots: GetTreeCategoryDto[] = [];
    let i: number;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i;
      list[i].children = [];
      list[i].path = this.getPath(list, list[i].path);
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent_id !== null) {
        list[map[node.parent_id]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  public getPath(arr: Category[], path: string) {
    return path
      .split("/")
      .map((id) => {
        const name = arr.find((obj) => obj.id === +id)?.name;
        return "/" + name;
      })
      .join("");
  }
}

export const tree = new Tree();
