import createGameSimulationMW from "../middlewares/data/game/createGameSimulationMW.js";
import getGameMW from "../middlewares/data/game/getGameMW.js";
import updateGameMW from "../middlewares/data/game/updateGameMW.js";
import createMapMW from "../middlewares/data/gameMap/createMapMW.js";
import getAllMapsMW from "../middlewares/data/gameMap/getAllMapsMW.js";
import getGameMapMW from "../middlewares/data/gameMap/getGameMapMW.js";
import returnOneGameMapMW from "../middlewares/data/gameMap/returnOneGameMapMW.js";
import returnAsStartingMapMW from "../middlewares/data/gameMap/returnAsStartingMapMW.js";
import createScriptMW from "../middlewares/data/script/createScriptMW.js";
import deleteScriptMW from "../middlewares/data/script/deleteScriptMW.js";
import getAllScriptMW from "../middlewares/data/script/getAllScriptMW.js";
import getAllOwnScriptMW from "../middlewares/data/script/getAllOwnScriptMW.js";
import getScriptMW from "../middlewares/data/script/getScriptMW.js";
import getScriptContentMW from "../middlewares/data/script/getScriptContentMW.js";
import updateScriptMW from "../middlewares/data/script/updateScriptMW.js";
import createUserForRegisterMW from "../middlewares/data/user/createUserForRegisterMW.js";
import getUserForLoginMW from "../middlewares/data/user/getUserForLoginMW.js";
import getUserMW from "../middlewares/data/user/getUserMW.js";
import logUserInMW from "../middlewares/data/user/logUserInMW.js";
import logUserOutMW from "../middlewares/data/user/logUserOutMW.js";
import authenticateWithJWTMW from "../middlewares/logic/auth/authenticateWithJWTMW.js";
import authenticateUserMW from "../middlewares/logic/auth/authenticateUserMW.js";
import sendBackActualUserMW from "../middlewares/logic/auth/sendBackActualUserMW.js";
import validatePasswordMW from "../middlewares/logic/auth/validatePasswordMW.js";
import setGameToEndMW from "../middlewares/logic/game/setGameToEndMW.js";
import setGameToNextTurnMW from "../middlewares/logic/game/setGameToNextTurnMW.js";
import setGameToPreviousTurnMW from "../middlewares/logic/game/setGameToPreviousTurnMW.js";
import setGameToStartMW from "../middlewares/logic/game/setGameToStartMW.js";
import runSimulationMW from "../middlewares/logic/game/runSimulationMW.js";
import logIncomingCallMW from "../middlewares/logic/log/logIncomingCallMW.js";
import sendJsonResponseMW from "../middlewares/logic/sendJsonResponseMW.js";

import objRepo from "../models/objectRepository.js";

export default function routes(app) {
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
}
