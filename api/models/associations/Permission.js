const {
  Role,
  Permission,
} = require("../definitions");


// permission.getRoles();
// permission.countRoles();
// permission.hasRole();
// permission.hasRoles();
// permission.setRoles();
// permission.addRole();
// permission.addRoles();
// permission.removeRole();
// permission.removeRoles();
// permission.createRole();
Permission.belongsToMany(Role, {
  through: 'rolepermissions',
  onDelete: "cascade",
  foreignKey: 'permissionId',
  as: 'roles'
});


module.exports = Permission;
