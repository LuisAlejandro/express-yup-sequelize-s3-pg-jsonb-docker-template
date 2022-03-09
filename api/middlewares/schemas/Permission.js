const yup = require("yup");

const { idSchema, stringDateSchema } = require("./misc");


const permissionDetailsSchema = yup
  .object({
    id: idSchema,
    name: yup
      .string()
      .required()
      .min(2)
      .max(256)
      .label('Nombre')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const permissionsSchema = yup
  .array(permissionDetailsSchema)
  .label("Permisos")
  .default([]);

  
module.exports = { permissionDetailsSchema, permissionsSchema };
