import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import { Knex } from "knex";

export default {
  client: "mysql",
  connection: {
    port: parseInt(process.env.DB_PORT || ""),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
} as Knex.Config;
