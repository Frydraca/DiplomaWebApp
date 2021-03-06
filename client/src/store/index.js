import {
  combineReducers,
  getDefaultMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import history from "./applicationHistory";
import authentication from "./Authentication";
import errors from "./Errors";
import user from "./User";
import game from "./Game";
import gameMaps from "./MapList";
import oneMap from "./OneMap";
import script from "./Script";
import ownScripts from "./OwnScripts";
import SimulationState from "./SimulationState";

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authentication,
  errors: errors,
  user: user,
  simulationState: SimulationState,
  currentGame: game,
  gameMaps: gameMaps,
  oneMap: oneMap,
  script: script,
  ownScripts: ownScripts,
});

const middleware = [
  ...getDefaultMiddleware(),
  thunk,
  routerMiddleware(history),
];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});
