const createUserForRegisterMW = require("../middlewares/data/user/createUserForRegisterMW");
const getUserForLoginMW = require("../middlewares/data/user/getUserForLoginMW");
const getUserMW = require("../middlewares/data/user/getUserMW");
const logUserInMW = require("../middlewares/data/user/logUserInMW");
const logUserOutMW = require("../middlewares/data/user/logUserOutMW");
const authenticateWithJWTMW = require("../middlewares/logic/auth/authenticateWithJWTMW");
const authenticateUserMW = require("../middlewares/logic/auth/authenticateUserMW");
const sendBackActualUserMW = require("../middlewares/logic/auth/sendBackActualUserMW");
const validatePasswordMW = require("../middlewares/logic/auth/validatePasswordMW");
const logIncomingCallMW = require("../middlewares/logic/log/logIncomingCallMW");
const sendJsonResponseMW = require("../middlewares/logic/sendJsonResponseMW");

const objRepo = require("../models/objectRepository");

module.exports = function (app) {
  // Authentication
  app.post(
    "/register",
    logIncomingCallMW(),
    createUserForRegisterMW(objRepo),
    authenticateUserMW(),
    logUserInMW(),
    sendJsonResponseMW()
  );

  app.post(
    "/login",
    logIncomingCallMW(),
    getUserForLoginMW(objRepo),
    validatePasswordMW(),
    authenticateUserMW(),
    logUserInMW(),
    sendJsonResponseMW()
  );

  app.post(
    "/token",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    authenticateUserMW(),
    logUserInMW(),
    sendJsonResponseMW()
  );

  app.post(
    "/logout",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    logUserOutMW(),
    sendJsonResponseMW()
  );

  app.get(
    "/force-logout",
    logIncomingCallMW(),
    getUserMW(objRepo),
    logUserOutMW(),
    sendJsonResponseMW()
  );

  app.get(
    "/user",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    sendBackActualUserMW(),
    sendJsonResponseMW()
  );

  //simulator
  app.get("/simulator", logIncomingCallMW());
};
