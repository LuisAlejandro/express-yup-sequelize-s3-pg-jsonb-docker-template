/**
 * third party libraries
 */
const http = require("http");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

/**
 * server configuration
 */
const config = require("../config");
const dbService = require("./services/db.service");
const notfoundMiddleware = require("./middlewares/notfound");
const authenticationMiddleware = require("./middlewares/authentication");
const authorizationMiddleware = require("./middlewares/authorization");
const validationMiddleware = require("./middlewares/validation");
const outputMiddleware = require("./middlewares/output");
const errorMiddleware = require("./middlewares/error");
const buildRouter = require("./utils/router");

// environment: development, testing, production
const environment = process.env.NODE_ENV  || "development";

/**
 * express application
 */
const api = express();
const server = http.Server(api);
const router = buildRouter(config.publicRoutes);
const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to allow only requests from certain origins
api.use(cors());

// secure express app
api.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request body
api.use(express.json({ limit: "10mb" }));

// Manage not found
api.use(notfoundMiddleware);

// application middlewares
api.use(authenticationMiddleware);
api.use(authorizationMiddleware);
api.use(validationMiddleware);

// public REST API
api.use("/", router);

// Format and return output
api.use(outputMiddleware);

// error handler
api.use(errorMiddleware);

server.listen(config.port, () => {
  if (
    environment !== "production" &&
    environment !== "development"
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});
