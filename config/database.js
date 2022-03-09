const Sequelize = require('sequelize');

const connection = require('./connection');

let sequelize;

switch (process.env.NODE_ENV) {
  case 'production':
    sequelize = new Sequelize(
      connection.production.database,
      connection.production.username,
      connection.production.password, {
        host: connection.production.host,
        dialect: connection.production.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        logging: false,
      },
    );
    break;
  default:
  case 'development':
    sequelize = new Sequelize(
      connection.development.database,
      connection.development.username,
      connection.development.password, {
        host: connection.development.host,
        dialect: connection.development.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        logging: false,
      },
    );
}


module.exports = sequelize;
