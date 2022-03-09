const yup = require("yup");

const { idSchema, stringDateSchema } = require("./misc");


const roleDetailsSchema = yup
  .object({
    id: idSchema,
    name: yup
      .string()
      .required()
      .oneOf([
        'Admin',
        'Superadmin',
        'Visitor',
        'User',
      ])
      .label('Nombre')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const rolesSchema = yup
  .array(roleDetailsSchema)
  .label("Roles")
  .default([]);


module.exports = { roleDetailsSchema, rolesSchema };
