const _ = require("lodash");

const { getUniqueQuery } = require("./queries");


const extractAsFk = (options) => {
  const bt = Object.values(options.model.associations)
                   .filter(a => a.associationType === 'BelongsTo');
  const hm = Object.values(options.model.associations)
                   .filter(a => a.associationType === 'HasMany');
  const btfk = [].concat(bt.map(a => a.foreignKey));
  const hmfk = hm.map(a => a.foreignKey);
  const btas = bt.map(a => a.as);
  const hmas = hm.map(a => a.as);
  return { btas, btfk, hmas, hmfk };
};

const filterPayload = (options) => {
  const { btas, btfk, hmas, hmfk } = extractAsFk(options);
  const fks = _.pick(options.values, btfk);
  const resource = _.omit(options.values, [].concat(btas, btfk, hmas, hmfk, ['id', 'updatedAt', 'createdAt']));
  return { fks, resource };
};

const filterIncludes = (options) => {
  const { btas, hmas } = extractAsFk(options);
  const excludes = _.get(options, 'config.model.excludes', []);
  const rm = new Set(excludes);
  return [].concat(btas, hmas).filter(e => !rm.has(e));
};

const findBy = async (options, req, next) => {
  try {
    const include = filterIncludes(options);
    const entity = await options.model.findAll({
      ...(_.isEmpty(options.where) ? {} : { where: options.where }),
      ...(_.isEmpty(options.order) ? {} : { order: options.order }),
      ...(_.isEmpty(include) ? {} : { include }),
    });
    return entity;
  } catch (err) {
    req.error = {
      status: 500,
      message: "Server error: internal server error",
      details: err.message,
    };
    return next(new Error(req.error.message, { cause: err }));
  }
};

const findOneBy = async (options, req, next) => {
  const entity = await findBy(options, req, next);

  if (entity && entity.length > 0) {
    return entity[0];
  }
  
  req.error = {
    status: 404,
    message: "Client error: not found",
    details: `${options.model.name} doesn't exist.`,
  };
  return next(new Error(req.error.message));
};

const upsert = async (options, req, next) => {
  try {

    const now = Math.round(new Date().valueOf() / 1000);
    const isUpdate = Boolean(options.id);
    const { fks, resource } = filterPayload(options);
    
    if (!isUpdate) {
      const uniqueQuery = getUniqueQuery(options.model.name, options.values);
      if (!_.isEmpty(uniqueQuery)) {
        const uniqueResults = await options.model.findAll({
          ...uniqueQuery,
          raw: true,
        });
    
        if (uniqueResults.length > 0) {
          req.error = {
            status: 403,
            message: "Client error: forbidden",
            details: `${options.model.name} already exists.`,
          };
          return next(new Error(req.error.message));
        }
      }
    }

    const [ result, ] = await options.model.upsert({
      id: isUpdate ? options.id : now,
      resource,
      ...fks,
    });

    const entity = await findOneBy({
      model: options.model,
      where: { id: result.id },
      config: options.config
    }, req, next);

    return entity;
  } catch (err) {
    req.error = {
      status: 500,
      message: "Server error: internal server error",
      details: err.message,
    };
    return next(new Error(req.error.message, { cause: err }));
  }
};

const destroy = async (options, req, next) => {
  try {

    const entity = await findOneBy({
      model: options.model,
      where: { id: options.id },
      config: options.config
    }, req, next);

    if (await entity.destroy() === 0) {
      req.error = {
        status: 500,
        message: "Server error: internal server error",
        details: `${options.model.name} couldn't be destroyed.`,
      };
      return next(new Error(req.error.message));
    }

    return entity;
  } catch (err) {
    req.error = {
      status: 500,
      message: "Server error: internal server error",
      details: err.message,
    };
    return next(new Error(req.error.message, { cause: err }));
  }
};


module.exports = {
  findBy,
  findOneBy,
  upsert,
  destroy,
};
