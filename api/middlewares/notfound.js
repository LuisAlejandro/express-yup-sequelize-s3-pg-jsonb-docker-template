const yup = require("yup");

const publicRoutes = require("../../config/routes/publicRoutes");


const notfoundMiddleware = async (req, res, next) => {
  const currRoute = Object.entries(publicRoutes).find(([k,]) => k.split(" ")[1] === req.path);
  if (currRoute) {
    console.log(new Date().toISOString(), currRoute[0]);
    req.schema = yup.object(currRoute[1].schema);
    return next();
  }
  req.error = {
    status: 404,
    message:  "Client error: not found",
    details: `${req.path} endpoint doesn't exist.`,
  };
  return next(new Error(req.error.message));
};


module.exports = notfoundMiddleware;
