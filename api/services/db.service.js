const fixtures = require('sequelize-fixtures');

const models = require('../models');
const database = require('../../config/database');


const dbService = (environment, migrate) => {
  const authenticateDB = () => database.authenticate();

  const dropDB = () => database.drop();

  const syncDB = () => database.sync();

  const seedAdminData = async () => {
    await fixtures.loadFile(`${__dirname}/../fixtures/admin/organization.json`, models);
    await fixtures.loadFile(`${__dirname}/../fixtures/admin/permission.json`, models);
    await fixtures.loadFile(`${__dirname}/../fixtures/admin/role.json`, models);
    await fixtures.loadFile(`${__dirname}/../fixtures/admin/user.json`, models);
  };

  const seedSampleData = async () => {
    // await fixtures.loadFile(`${__dirname}/../fixtures/sample/sample.json`, models);
  };

  const successfulDBStart = () => (
    console.info('connection to the database has been established successfully')
  );

  const errorDBStart = (err) => (
    console.info('unable to connect to the database:', err)
  );

  const wrongEnvironment = () => {
    console.warn(`only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`);
    return process.exit(1);
  };

  const startDev = async () => {
    try {
      await authenticateDB();
      if (migrate) await dropDB();
      await syncDB();
      if (migrate) {
        await seedAdminData();
        await seedSampleData();
      }
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startProd = async () => {
    try {
      await authenticateDB();
      if (migrate) await dropDB();
      await syncDB();
      if (migrate) await seedAdminData();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const start = async () => {
    switch (environment) {
      case 'development':
        await startDev();
        break;
      case 'production':
        await startProd();
        break;
      default:
        await wrongEnvironment();
    }
  };

  return {
    start,
  };
};

module.exports = dbService;
