const createGameSimulationMW = require("../middlewares/data/game/createGameSimulationMW");
const getGameMW = require("../middlewares/data/game/getGameMW");
const updateGameMW = require("../middlewares/data/game/updateGameMW");
const createMapMW = require("../middlewares/data/gameMap/createMapMW");
const getAllMapsMW = require("../middlewares/data/gameMap/getAllMapsMW");
const getGameMapMW = require("../middlewares/data/gameMap/getGameMapMW");
const createScriptMW = require("../middlewares/data/script/createScriptMW");
const createUserForRegisterMW = require("../middlewares/data/user/createUserForRegisterMW");
const getUserForLoginMW = require("../middlewares/data/user/getUserForLoginMW");
const getUserMW = require("../middlewares/data/user/getUserMW");
const logUserInMW = require("../middlewares/data/user/logUserInMW");
const logUserOutMW = require("../middlewares/data/user/logUserOutMW");
const authenticateWithJWTMW = require("../middlewares/logic/auth/authenticateWithJWTMW");
const authenticateUserMW = require("../middlewares/logic/auth/authenticateUserMW");
const sendBackActualUserMW = require("../middlewares/logic/auth/sendBackActualUserMW");
const validatePasswordMW = require("../middlewares/logic/auth/validatePasswordMW");
const setGameToEndMW = require("../middlewares/logic/game/setGameToEndMW");
const setGameToGivenTurnMW = require("../middlewares/logic/game/setGameToGivenTurnMW");
const setGameToNextTurnMW = require("../middlewares/logic/game/setGameToNextTurnMW");
const setGameToPreviousTurnMW = require("../middlewares/logic/game/setGameToPreviousTurnMW");
const setGameToStartMW = require("../middlewares/logic/game/setGameToStartMW");
const runSimulationMW = require("../middlewares/logic/game/runSimulationMW");
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
  app.post(
    "/simulator",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    createGameSimulationMW(objRepo),
    sendJsonResponseMW()
  );

  // app.get(
  //   "/simulator/:gameId",
  //   logIncomingCallMW(),
  //   authenticateWithJWTMW(),
  //   getUserMW(objRepo),
  //   getGameMapMW(objRepo),
  //   sendJsonResponseMW()
  // );

  app.post(
    "/simulator/simulate",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getGameMapMW(objRepo),
    runSimulationMW(objRepo),
    sendJsonResponseMW()
  );

  app.get(
    "/simulator/:gameId/start",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getGameMW(objRepo),
    setGameToStartMW(),
    updateGameMW(objRepo),
    sendJsonResponseMW()
  );

  app.get(
    "/simulator/:gameId/nextTurn",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getGameMW(objRepo),
    setGameToNextTurnMW(),
    updateGameMW(objRepo),
    sendJsonResponseMW()
  );

  app.get(
    "/simulator/:gameId/previousTurn",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getGameMW(objRepo),
    setGameToPreviousTurnMW(),
    updateGameMW(objRepo),
    sendJsonResponseMW()
  );

  app.get(
    "/simulator/:gameId/end",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getGameMW(objRepo),
    setGameToEndMW(),
    updateGameMW(objRepo),
    sendJsonResponseMW()
  );

  app.get(
    "/simulator/:gameId/:turnNumber",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getGameMW(objRepo),
    setGameToGivenTurnMW(),
    updateGameMW(objRepo),
    sendJsonResponseMW()
  );

  //designer
  app.post(
    "/designer",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    createScriptMW(objRepo),
    sendJsonResponseMW()
  );

  //mapList
  app.post(
    "/mapList",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    createMapMW(objRepo),
    sendJsonResponseMW()
  );

  app.get(
    "/mapList",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getAllMapsMW(objRepo),
    sendJsonResponseMW()
  );
};
