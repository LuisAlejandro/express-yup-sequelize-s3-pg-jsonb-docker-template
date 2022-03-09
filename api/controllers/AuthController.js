const _ = require("lodash");
const {
  User,
  Role,
  Organization
} = require("../models");
const {
  emailSchema,
  passwordSchema,
} = require("../middlewares/schemas/misc");
const auth = require("../services/auth.service");
const bcrypt = require("../services/bcrypt.service");


// AuthController

const AuthController = () => {
  const login = async (req, res, next) => {
    const user = await User.findOne({
      where: { "resource.email": req.payload.email },
      include: [
        {
          model: Role,
          as: "role",
          include: "permissions",
        },
        {
          model: Organization,
          as: "organization",
        },
      ],
    });

    if (user) {
      const hash = user.resource.password;
      const pw = req.payload.password;

      if (bcrypt().compare(pw, hash)) {
        const token = auth().issue({ id: user.id });
        const result = user.get();
        const sel = _.omit(result, ["resource"]);
        req.result = {
          token,
          ...sel,
          ...result.resource,
        };
        req.excludes = ["password", "password2"];
        return next();
      }
    }

    req.error = {
      status: 401,
      message: "Client error: unauthorized",
      details: "Authentication error",
    };

    return next(new Error(req.error.message));
  };

  return {
    login,
  };
};

AuthController.routes = {
  "POST /login": {
    path: "AuthController.login",
    schema: {
      email: emailSchema,
      password: passwordSchema,
    },
  },
};


module.exports = AuthController;
