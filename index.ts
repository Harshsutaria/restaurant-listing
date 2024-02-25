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
import postgresConnectionParams from "./utils/serviceUtils/postgres/connectionParams";
import logger from "./utils/serviceUtils/loggerUtil";

// creating express server
const app = express();

// using service router
app.use(`/${APPLICATION_VERSION}`, router);
logger.info(JSON.stringify(postgresConnectionParams));

// listening to the port.
app.listen(APPLICATION_PORT, () => {
  logger.info(`SERVING RUNNING AT ${APPLICATION_PORT}`);
});
