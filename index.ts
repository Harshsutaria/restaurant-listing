// importing required modules
import express from "express";
import dotenv from "dotenv";

// setting .env file
dotenv.config();

import router from "./src/router";
import {
  APPLICATION_PORT,
  APPLICATION_VERSION,
} from "./src/constants/service-constants";

// creating express server
const app = express();

// using service router
app.use(`/${APPLICATION_VERSION}`, router);

// listening to the port.
app.listen(APPLICATION_PORT, () => {
  console.log("SERVING RUNNING AT", APPLICATION_PORT);
});
