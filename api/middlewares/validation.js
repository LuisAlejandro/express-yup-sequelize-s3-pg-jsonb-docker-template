const _ = require("lodash");


const validation = async (req, res, next) => {
  try {
    // we get the allowed params for the current path
    const allowedParams = Object.keys(req.schema.fields);
    // we select only the allowed parameters
    let payload = _.pick(req.method === 'GET' ? req.query : req.body, allowedParams);
    // and filter falsey values
    payload = _.pickBy(payload, _.identity);
    // we have no data to act upon if payload is empty
    if (_.isEmpty(payload)) throw new Error("Empty payload");
    // we apply validation and go to the next middleware
    payload = await req.schema.validate(payload, {
      abortEarly: true,
      stripUnknown: true,
    });
    // we omit updatedAt and createdAt because they're db automatic
    if ('values' in payload) {
      payload = {
        ...payload,
        values: _.omit(payload.values, ['id', 'updatedAt', 'createdAt']),
      };
    }
    if ('config' in payload && _.isString(payload.config)) {
      payload = {
        ...payload,
        config: JSON.parse(payload.config),
      };
    }
    req.payload = payload;
    return next();
  } catch (err) {
    req.error = {
      status: 400,
      message: "Client error: bad request",
      details: err.message,
    };
    return next(new Error(req.error.message, { cause: err }));
  }
};
  
  
module.exports = validation;
