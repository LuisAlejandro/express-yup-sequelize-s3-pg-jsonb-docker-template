const {
  findBy,
  findOneBy,
  upsert,
  destroy
} = require("../utils/controller");
const { User } = require("../models");
const {
  emailSchema,
  tokenSchema,
  configSchema,
  idSchema,
} = require("../middlewares/schemas/misc");
const { userDetailsSchema } = require("../middlewares/schemas");


// UserController

// user.getOrganization();
// user.setOrganization();
// user.createOrganization();

// user.getRole();
// user.setRole();
// user.createRole();

const UserController = () => {

  const findUserById = async (req, res, next) => {
    req.result = await findOneBy({
      model: User,
      where: { id: req.payload.id },
      config: req.payload.config,
    }, req, next);
    req.excludes = [];
    return next();
  };

  const findUsers = async (req, res, next) => {
    const where = req.user.role.name === 'Superadmin' ?
      {} :
      { organizationId: req.user.organization.id };
    req.result = await findBy({
      model: User,
      where,
      config: req.payload.config,
    }, req, next);
    req.excludes = ['password', 'password2'];
    return next();
  };

  const upsertUser = async (req, res, next) => {
    req.result = await upsert({
      model: User,
      id: req.payload.id,
      values: req.payload.values,
      config: req.payload.config,
    }, req, next);
    req.excludes = ['password', 'password2'];
    return next();
  };

  const destroyUser = async (req, res, next) => {
    req.result = await destroy({
      model: User,
      id: req.payload.id,
      config: req.payload.config,
    }, req, next);
    req.excludes = ['password', 'password2'];
    return next();
  };

  return {
    findUserById,
    findUsers,
    upsertUser,
    destroyUser,
  };
};

UserController.routes = {
  // Users
  'GET /users/detail/by-id': {
    path: 'UserController.findUserById',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      id: idSchema,
    }
  },
  'GET /users': {
    path: 'UserController.findUsers',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
    }
  },
  'POST /users/create': {
    path: 'UserController.upsertUser',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      values: userDetailsSchema,
    }
  },
  'PUT /users/update': {
    path: 'UserController.upsertUser',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      values: userDetailsSchema.omit([
        'password', 'password2',
      ]),
      id: idSchema,
    }
  },
  'DELETE /users/delete': {
    path: 'UserController.destroyUser',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      id: idSchema,
    }
  },
};


module.exports = UserController;
