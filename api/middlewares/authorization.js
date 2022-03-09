
// this function converts HTTP method to a recognizable verb which
// we can then use to form a phrase that constitutes a "permission"
const getMethodVerb = (method) => {
  let verb;
  switch (method) {
    default:
    case 'GET':
      verb = 'view';
      break;
    case 'POST':
      verb = 'create';
      break;
    case 'PUT':
      verb = 'edit';
      break;
    case 'DELETE':
      verb = 'destroy';
      break;
  }
  return verb;
};

const getEntity = (path) => path.split('/')[1];

const authorization = async (req, res, next) => {
  try {
    // we get the permission verb (ie: view, create, edit, destroy)
    const verb = getMethodVerb(req.method);
    // we get the entity in which we need to act
    const entity = getEntity(req.path);
    // These paths dont have authorization
    const noAuthPaths = ['/login'];
    if (noAuthPaths.includes(req.path)) {
      req.verb = verb;
      req.entity = entity;
      return next();
    }
    // we obtain user permissions from request
    const userPermissions = req.user.role.permissions.map((p) => p.name);
    // build the permission phrase (ie: "edit patient")
    const neededPermission = `${verb} ${entity}`;
    // if user has permission, then we store it and move on
    // else we throw an error
    if (userPermissions.includes(neededPermission)) {
      req.verb = verb;
      req.entity = entity;
      req.permission = neededPermission;
      return next();
    }
    throw new Error(`"${req.user.role.name}" is not authorized to execute this action: ${neededPermission}`);
  } catch (err) {
    req.error = {
      status: 403,
      message: "Client error: forbidden",
      details: err.message,
    };
    return next(new Error(req.error.message, { cause: err }));
  }
};


module.exports = authorization;
