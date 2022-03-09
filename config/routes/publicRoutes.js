const AuthController = require("../../api/controllers/AuthController");
const FileController = require("../../api/controllers/FileController");
const OrganizationController = require("../../api/controllers/OrganizationController");
const RoleController = require("../../api/controllers/RoleController");
const UserController = require("../../api/controllers/UserController");
const PermissionController = require("../../api/controllers/PermissionController");


const publicRoutes = {
  ...AuthController.routes,
  ...FileController.routes,
  ...OrganizationController.routes,
  ...RoleController.routes,
  ...UserController.routes,
  ...PermissionController.routes,
};


module.exports = publicRoutes;
