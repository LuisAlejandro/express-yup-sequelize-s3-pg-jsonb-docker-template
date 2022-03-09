const {
  findBy,
  upsert,
  destroy
} = require("../utils/controller");
const { Permission } = require("../models");
const {
  emailSchema,
  tokenSchema,
  configSchema,
  idSchema,
} = require("../middlewares/schemas/misc");
const { permissionDetailsSchema } = require("../middlewares/schemas");


// PermissionController

// permission.getUsers();
// permission.countUsers();
// permission.hasUser();
// permission.hasUsers();
// permission.setUsers();
// permission.addUser();
// permission.addUsers();
// permission.removeUser();
// permission.removeUsers();
// permission.createUser();


const PermissionController = () => {

  const findPermissions = async (req, res, next) => {
    req.result = await findBy({
      model: Permission,
      where: {},
      config: req.payload.config,
    }, req, next);
    req.excludes = [];
    return next();
  };

  const upsertPermission = async (req, res, next) => {
    req.result = await upsert({
      model: Permission,
      id: req.payload.id,
      values: req.payload.values,
      config: req.payload.config,
    }, req, next);
    req.excludes = [];
    return next();
  };

  const destroyPermission = async (req, res, next) => {
    req.result = await destroy({
      model: Permission,
      id: req.payload.id,
      config: req.payload.config,
    }, req, next);
    req.excludes = [];
    return next();
  };

  return {
    findPermissions,
    upsertPermission,
    destroyPermission,
  };
};

PermissionController.routes = {
  // Permissions
  'GET /permissions': {
    path: 'PermissionController.findPermissions',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
    }
  },
  'POST /permissions/create': {
    path: 'PermissionController.upsertPermission',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      values: permissionDetailsSchema,
    }
  },
  'PUT /permissions/update': {
    path: 'PermissionController.upsertPermission',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      values: permissionDetailsSchema,
      id: idSchema,
    }
  },
  'DELETE /permissions/delete': {
    path: 'PermissionController.destroyPermission',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      id: idSchema,
    }
  },
};


module.exports = PermissionController;
