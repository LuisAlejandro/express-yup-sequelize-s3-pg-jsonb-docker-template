const publicRoutes = require("./routes/publicRoutes");
const privateRoutes = require("./routes/privateRoutes");


module.exports = {
  migrate: process.env.MIGRATE === "true",
  publicRoutes,
  privateRoutes,
  port: process.env.PORT,
};
