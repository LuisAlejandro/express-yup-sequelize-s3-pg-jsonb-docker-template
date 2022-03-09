const jwt = require('jsonwebtoken');

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';

const auth = () => {

  const issue = (payload) => jwt.sign(payload, secret, { expiresIn: '1d' });

  const verify = (token) => jwt.verify(token, secret, {});

  return {
    issue,
    verify,
  };
};

module.exports = auth;
