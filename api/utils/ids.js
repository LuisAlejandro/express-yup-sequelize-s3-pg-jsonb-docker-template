const { ObjectId } = require("bson");


// metodo que genera id similar a los existentes
const objectId = (value) => new ObjectId(value).toHexString();


module.exports = {
  objectId,
};
    