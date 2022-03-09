const { formatOutput } = require("../utils");


const outputMiddleware = async (req, res, next) => {
  res.status(200).json(formatOutput(req.result, req.excludes));
  return next();
};


module.exports = outputMiddleware;
