
let { userDetailsSchema } = require("./User");
const { usersSchema } = require("./User");
const { organizationDetailsSchema, organizationsSchema } = require("./Organization");
const { permissionDetailsSchema, permissionsSchema } = require("./Permission");
const { roleDetailsSchema, rolesSchema } = require("./Role");
const { nullableIdSchema } = require("./misc");


userDetailsSchema = userDetailsSchema.shape({
  organizationId: nullableIdSchema,
  roleId: nullableIdSchema,
});


module.exports = {
  organizationDetailsSchema, organizationsSchema,
  permissionDetailsSchema, permissionsSchema,
  roleDetailsSchema, rolesSchema,
  userDetailsSchema, usersSchema,
};
