const _ = require("lodash");
const { Model } = require("sequelize");

const { defineModel } = require("./model");
const { objectId } = require("./ids");


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formatOutput = (data, excludes) => {
  let result = data;
  if (!result) return result;
  if (data instanceof Model) {
    const g = data.get();
    const sel = _.omit(g, ['resource']);
    result = _.omit({
      ...sel,
      ...g.resource,
    }, excludes);
  }
  if (Array.isArray(data)) {
    result = data.map((d) => formatOutput(d, excludes));
  }
  if (data.constructor === Object) {
    result = _.omit(data, excludes);
  }
  if (result.constructor === Object) {
    const rEntries = Object.entries(result);
    const rSub = rEntries.map(([k, v],) => [k, formatOutput(v, excludes)]);
    result = Object.fromEntries(rSub);
  }
  return result;
};

module.exports = {
  objectId,
  defineModel,
  phoneRegExp,
  formatOutput,
};
  