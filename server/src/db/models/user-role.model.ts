import { Model } from "objection";

import { BaseModel } from "./base-model.model";
import { User } from "./user.model";

export class UserRole extends BaseModel {
  static tableName = "user_role";

  user_id: number;
  role_id: number;

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "user_role.user_id",
        to: "user.id",
      },
    },
  };


}
