import * as dotenv from "dotenv";
dotenv.config();

import { setupDb } from "./db/db-setup";
import { createWebServer } from "./utils/create-web-server";

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = createWebServer();

    setupDb();
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
