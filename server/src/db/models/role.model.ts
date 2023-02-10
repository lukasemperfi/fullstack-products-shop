import { Model } from "objection";

import { BaseModel } from "./base-model.model";
import { User } from "./user.model";

export class Role extends BaseModel {
  static tableName = "role";

  id: number;
  role: string;

  static relationMappings = {
    user: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: "role.id",
        through: {
          from: "user_role.role_id",
          to: "user_role.user_id",
        },
        to: "user.id",
      },
    },
  };
}
