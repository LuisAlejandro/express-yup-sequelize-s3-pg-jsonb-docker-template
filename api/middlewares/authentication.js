const { User, Role, Organization } = require("../models");
const auth = require("../services/auth.service");
const { formatOutput } = require("../utils");


const authentication = async (req, res, next) => {
  try {

    // These paths dont have authentication
    const noAuthPaths = ['/login'];
    if (noAuthPaths.includes(req.path)) return next();

    // let's get credentials from request
    const token = req.method === 'GET' ? req.query.token : req.body.token;
    const email = req.method === 'GET' ? req.query.email : req.body.email;

    // check if token or email are empty
    if (!(token && email)) throw new Error('Authentication error');

    // let's get user data that is encrypted in the token and also verify it
    const theirUser = auth().verify(token);
    // we see if we have a user stored with email from credential
    const ourUser = await User.findOne({
      where: { 'resource.email': email },
      include: [{
        model: Role,
        as: 'role',
        include: 'permissions'
      }, {
        model: Organization,
        as: 'organization'
      }]
    });
    // if token is correct, and we have a user matching the provided email
    // and their ids also match, then we are authenticated
    if (theirUser && ourUser && theirUser.id === ourUser.id) {
      // we are going to save the user object in the request for other
      // middlewares and controllers to use
      req.user = formatOutput(ourUser, []);
      return next();
    }
    throw new Error('Authentication error');
  } catch (err) {
    req.error = {
      status: 401,
      message: "Client error: unauthorized",
      details: `${err.name}: ${err.message}`,
    };
    return next(new Error(req.error.message, { cause: err }));
  }
};


module.exports = authentication;
