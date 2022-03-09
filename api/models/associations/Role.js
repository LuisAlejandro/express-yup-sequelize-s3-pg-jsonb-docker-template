const {
  User,
  Permission,
  Role,
} = require("../definitions");


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
Role.hasMany(User, {
  sourceKey: "id",
  onDelete: "cascade",
  foreignKey: "roleId",
  as: 'users'
});

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
Role.belongsToMany(Permission, {
  through: 'rolepermissions',
  onDelete: "cascade",
  foreignKey: "roleId",
  as: 'permissions'
});


module.exports = Role;
