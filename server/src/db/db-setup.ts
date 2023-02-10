import knex from "knex";
import { Model } from "objection";

import knexConfig from "./knexfile";

export const setupDb = () => {
  const db = knex(knexConfig);

  Model.knex(db);
};
