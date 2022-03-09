const express = require("express");


const splitByLastDot = (str) => {
  const index = str.lastIndexOf('.');
  return [str.slice(0, index), str.slice(index + 1)];
};

const buildRouter = (routes) => {
  const router = express.Router();
  const routesArr = Object.entries(routes);

  routesArr.forEach((value) => {
    const requestMethodPath = value[0].replace(/\s\s+/g, ' ');
    const requestMethod = requestMethodPath.split(' ')[0].toLocaleLowerCase();
    const myPath = requestMethodPath.split(' ')[1];
    const controller = splitByLastDot(value[1].path)[0];
    const controllerMethod = splitByLastDot(value[1].path)[1];
    const handler = require(`${__dirname}/../controllers/${controller}`);
    const contr = handler();
    router.route(myPath)[requestMethod]([], contr[controllerMethod]);
  });

  return router;
};


module.exports = buildRouter;
