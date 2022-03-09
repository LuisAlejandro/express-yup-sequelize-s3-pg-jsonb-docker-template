const {
  findBy,
} = require("../utils/controller");
const { Role } = require("../models");
const {
  emailSchema,
  tokenSchema,
  configSchema,
} = require("../middlewares/schemas/misc");


// RoleController

// role.getUsers();
// role.countUsers();
// role.hasUser();
// role.hasUsers();
// role.setUsers();
// role.addUser();
// role.addUsers();
// role.removeUser();
// role.removeUsers();
// role.createUser();

// role.getPermissions();
// role.countPermissions();
// role.hasPermission();
// role.hasPermissions();
// role.setPermissions();
// role.addPermission();
// role.addPermissions();
// role.removePermission();
// role.removePermissions();
// role.createPermission();

const RoleController = () => {

  const findRoles = async (req, res, next) => {
    req.result = await findBy({
      model: Role,
      where: {},
      config: req.payload.config,
    }, req, next);
    req.excludes = [];
    return next();
  };

  return {
    findRoles,
  };
};

RoleController.routes = {
  // Roles
  'GET /roles': {
    path: 'RoleController.findRoles',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
    }
  },
};


module.exports = RoleController;
