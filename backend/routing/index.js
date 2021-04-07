const createUserForRegisterMW = require("../middlewares/data/user/createUserForRegisterMW");
const logUserInMW = require("../middlewares/data/user/logUserInMW");
const authenticateUserMW = require("../middlewares/logic/auth/authenticateUserMW");
const sendJsonResponseMW = require("../middlewares/logic/sendJsonResponseMW");

const objRepo = require("../models/objectRepository");

module.exports = function (app) {
  // Authentication
  app.post(
    "/register",
    createUserForRegisterMW(objRepo),
    authenticateUserMW(),
    logUserInMW(),
    sendJsonResponseMW()
  );
};
