const {
  Organization,
  Role,
  User,
} = require("../definitions");


// user.getOrganization();
// user.setOrganization();
// user.createOrganization();
User.belongsTo(Organization, {
  targetKey: "id",
  onDelete: "cascade",
  foreignKey: "organizationId",
  as: 'organization'
});

// user.getRole();
// user.setRole();
// user.createRole();
User.belongsTo(Role, {
  targetKey: "id",
  onDelete: "cascade",
  foreignKey: "roleId",
  as: 'role'
});


module.exports = User;
