const {
  User,
  Organization,
} = require("../definitions");


// organization.getUsers();
// organization.countUsers();
// organization.hasUser();
// organization.hasUsers();
// organization.setUsers();
// organization.addUser();
// organization.addUsers();
// organization.removeUser();
// organization.removeUsers();
// organization.createUser();
Organization.hasMany(User, {
  sourceKey: "id",
  onDelete: "cascade",
  foreignKey: "organizationId",
  as: 'users'
});


module.exports = Organization;
