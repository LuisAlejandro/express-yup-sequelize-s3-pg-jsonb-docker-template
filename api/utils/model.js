const { DataTypes } = require("sequelize");
const pluralize = require("pluralize");

const { objectId } = require("./ids");
const bcrypt = require("../services/bcrypt.service");


const defineModel = (sequelize, modelName) => {
  const tableName = pluralize(modelName.toLowerCase());
  let options = { tableName };
  const attributes = {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      set(value) {
        this.setDataValue(
          "id",
          typeof value === "number" ? objectId(value) : value
        );
      },
    },
    resource: {
      type: DataTypes.JSONB,
    },
  };
  if (modelName === "User") {
    options = {
      ...options,
      hooks: {
        beforeCreate: (user) => {
          // eslint-disable-next-line no-param-reassign
          user.resource.password = bcrypt().password(user.resource.password);
        },
        beforeUpdate: (user) => {
          // eslint-disable-next-line no-param-reassign
          user.resource.password = bcrypt().password(user.resource.password);
        },
      },
    };
  }
  return sequelize.define(modelName, attributes, options);
};


module.exports = {
  defineModel,
};
