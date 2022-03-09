const yup = require("yup");

const {
  emailSchema,
  idNumberSchema,
  genderSchema,
  phoneSchema,
  idTypeSchema,
  lastNameSchema,
  firstNameSchema,
  idSchema,
  stringDateSchema,
  urlSchema
} = require("./misc");


const userDetailsSchema = yup
  .object({
    id: idSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    idType: idTypeSchema,
    idNumber: idNumberSchema,
    phone: phoneSchema,
    gender: genderSchema,
    email: emailSchema,
    avatar: urlSchema
      .label('Avatar')
      .default(''),
    password: yup
      .string()
      .required()
      .min(6)
      .max(30)
      .label('Contraseña')
      .default(''),
    password2: yup
      .string()
      .optional()
      .nullable()
      .oneOf([
        yup.ref('password'),
        null
      ], 'Las contraseñas deben coincidir')
      .label('Repetir Contraseña')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const usersSchema = yup
  .array(userDetailsSchema)
  .label("Usuarios")
  .default([]);


module.exports = { userDetailsSchema, usersSchema };
