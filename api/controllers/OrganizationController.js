const {
  findBy,
  findOneBy,
  upsert,
  destroy
} = require("../utils/controller");
const { Organization } = require("../models");
const {
  emailSchema,
  tokenSchema,
  configSchema,
  idSchema,
} = require("../middlewares/schemas/misc");
const { organizationDetailsSchema } = require("../middlewares/schemas");


// OrganizationController

// organization.getUsers();
// organization.countUsers();
// organization.hasUser();
// organization.hasUsers();
// organization.setUsers();
// organization.addUser();
// organization.addUsers();
// organization.removeUser();
// organization.removeUsers();
// organization.createUser();


const OrganizationController = () => {

  const findOrganizationById = async (req, res, next) => {
    req.result = await findOneBy({
      model: Organization,
      where: { id: req.payload.id },
      config: req.payload.config,
    }, req, next);
    req.excludes = [];
    return next();
  };

  const findOrganizations = async (req, res, next) => {
    req.result = await findBy({
      model: Organization,
      where: {},
      config: req.payload.config,
    }, req, next);
    req.excludes = [];
    return next();
  };

  const upsertOrganization = async (req, res, next) => {
    req.result = await upsert({
      model: Organization,
      id: req.payload.id,
      values: req.payload.values,
      config: req.payload.config,
    }, req, next);
    req.excludes = [];
    return next();
  };

  const destroyOrganization = async (req, res, next) => {
    req.result = await destroy({
      model: Organization,
      id: req.payload.id,
      config: req.payload.config,
    }, req, next);
    req.excludes = [];
    return next();
  };

  return {
    findOrganizationById,
    findOrganizations,
    upsertOrganization,
    destroyOrganization,
  };
};

OrganizationController.routes = {
  // Organizations
  'GET /organizations/detail/by-id': {
    path: 'OrganizationController.findOrganizationById',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      id: idSchema,
    }
  },
  'GET /organizations': {
    path: 'OrganizationController.findOrganizations',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
    }
  },
  'POST /organizations/create': {
    path: 'OrganizationController.upsertOrganization',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      values: organizationDetailsSchema,
    }
  },
  'PUT /organizations/update': {
    path: 'OrganizationController.upsertOrganization',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      values: organizationDetailsSchema,
      id: idSchema,
    }
  },
  'DELETE /organizations/delete': {
    path: 'OrganizationController.destroyOrganization',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      id: idSchema,
    }
  },
};


module.exports = OrganizationController;
