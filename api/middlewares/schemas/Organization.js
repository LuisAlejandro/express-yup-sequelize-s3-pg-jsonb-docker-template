const yup = require("yup");

const { idSchema, stringDateSchema, urlSchema } = require("./misc");


const organizationDetailsSchema = yup
  .object({
    id: idSchema,
    name: yup
      .string()
      .min(2)
      .max(256)
      .required()
      .label('Nombre de la Organización')
      .default(''),
    logo: urlSchema
      .label('Logo')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const organizationsSchema = yup
  .array(organizationDetailsSchema)
  .label("Organizaciones")
  .default([]);


module.exports = { organizationDetailsSchema, organizationsSchema };
