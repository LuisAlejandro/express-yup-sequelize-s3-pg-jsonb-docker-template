const b = require('bcrypt');

const bcrypt = () => {

  const password = (pass) => b.hashSync(pass, b.genSaltSync());

  const compare = (pw, hash) => b.compareSync(pw, hash);

  return {
    password,
    compare,
  };
};

module.exports = bcrypt;
