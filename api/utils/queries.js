const { Op } = require("sequelize");


const getUniqueQuery = (modelName, values) => {
  switch (modelName) {
    case 'Organization':
      return {
        where: {
          [Op.or]: [
            { 'resource.name': values.name },
          ],
        },
      };
    case 'Permission':
      return {
        where: {
          [Op.or]: [
            { 'resource.name': values.name },
          ],
        },
      };
    case 'Role':
      return {
        where: {
          [Op.or]: [
            { 'resource.name': values.name },
          ],
        },
      };
    case 'User':
      return {
        where: {
          [Op.or]: [
            { 'resource.email': values.email },
          ],
        },
      };
    default:
      return {};
  }
};

module.exports = {
  getUniqueQuery,
};