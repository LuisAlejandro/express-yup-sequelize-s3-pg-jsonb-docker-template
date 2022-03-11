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
    type: yup
      .string()
      .required()
      .oneOf([
        'A',
        'B',
        'C',
        'D',
      ], '"Tipo de organización" debe ser uno de los siguientes valores: A, B, C, D')
      .label('Tipo de Organización')
      .default(''),
    logo: urlSchema
      .optional()
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
