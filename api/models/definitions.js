const sequelize = require("../../config/database");
const { defineModel } = require("../utils");


const Organization = defineModel(sequelize, 'Organization');
const Permission = defineModel(sequelize, 'Permission');
const Role = defineModel(sequelize, 'Role');
const User = defineModel(sequelize, 'User');


module.exports = {
  Organization,
  Permission,
  Role,
  User,
};
