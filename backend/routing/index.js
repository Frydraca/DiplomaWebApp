const createGameSimulationMW = require("../middlewares/data/game/createGameSimulationMW");
const getGameMW = require("../middlewares/data/game/getGameMW");
const updateGameMW = require("../middlewares/data/game/updateGameMW");
const createMapMW = require("../middlewares/data/gameMap/createMapMW");
const getAllMapsMW = require("../middlewares/data/gameMap/getAllMapsMW");
const getGameMapMW = require("../middlewares/data/gameMap/getGameMapMW");
const returnOneGameMapMW = require("../middlewares/data/gameMap/returnOneGameMapMW");
const returnAsStartingMapMW = require("../middlewares/data/gameMap/returnAsStartingMapMW");
const createScriptMW = require("../middlewares/data/script/createScriptMW");
const deleteScriptMW = require("../middlewares/data/script/deleteScriptMW");
const getAllScriptMW = require("../middlewares/data/script/getAllScriptMW");
const getAllOwnScriptMW = require("../middlewares/data/script/getAllOwnScriptMW");
const getScriptMW = require("../middlewares/data/script/getScriptMW");
const getScriptContentMW = require("../middlewares/data/script/getScriptContentMW");
const updateScriptMW = require("../middlewares/data/script/updateScriptMW");
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

  app.get(
    "/simulator/:gameId",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getGameMapMW(objRepo),
    returnAsStartingMapMW(),
    sendJsonResponseMW()
  );

  app.post(
    "/simulator/:gameId/simulate/:ownScriptId/:enemyScriptId",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getGameMapMW(objRepo),
    getScriptContentMW(objRepo),
    runSimulationMW(),
    createGameSimulationMW(objRepo),
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
    "/simulator/:gameId/nextTurn/:turnIncrement",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getGameMW(objRepo),
    setGameToNextTurnMW(),
    updateGameMW(objRepo),
    sendJsonResponseMW()
  );

  app.get(
    "/simulator/:gameId/previousTurn/:turnIncrement",
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

  app.get(
    "/designer/:scriptId",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getScriptMW(objRepo),
    sendJsonResponseMW()
  );

  app.post(
    "/designer/:scriptId/update",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getScriptMW(objRepo),
    updateScriptMW(objRepo),
    sendJsonResponseMW()
  );

  app.delete(
    "/designer/:scriptId/delete",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getScriptMW(objRepo),
    deleteScriptMW(),
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
    "/mapList/:gameId",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getGameMapMW(objRepo),
    returnOneGameMapMW(),
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

  //scripts
  app.get(
    "/scripts/own",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getAllOwnScriptMW(objRepo),
    sendJsonResponseMW()
  );

  app.get(
    "/scripts",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getAllScriptMW(objRepo),
    sendJsonResponseMW()
  );
};
