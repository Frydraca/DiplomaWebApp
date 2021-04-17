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
import gameMap from "./Map";

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authentication,
  errors: errors,
  user: user,
  currentGame: game,
  gameMap: gameMap,
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
