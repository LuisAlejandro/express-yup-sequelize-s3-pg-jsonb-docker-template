

const errorMiddleware = async (err, req, res, next) => {
  console.error(err);
  console.dir(req.error);
  res.status(req.error.status).json({
    message: req.error.message,
    details: req.error.details,
  });
  return next();
};


module.exports = errorMiddleware;
