import { Model } from "objection";

export class Token extends Model {
  static tableName = "token";

  id: number;
  user_id: number;
  refreshToken: string;
}
