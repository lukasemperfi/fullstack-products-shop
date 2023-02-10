import moment from "moment";
import { Model, QueryContext } from "objection";

export class BaseModel extends Model {
  created_at: string;
  updated_at: string;

  $beforeInsert(queryContext: QueryContext) {
    this.created_at = moment().format("YYYY-MM-DD HH:mm:ss");
  }

  $beforeUpdate() {
    this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  }
}
