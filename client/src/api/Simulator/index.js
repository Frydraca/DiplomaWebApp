import axios from "axios";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";
import { addError } from "../../store/Errors";
import { loadGame } from "../../store/Game";

export function simulateGame(simulationData) {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "POST",
      url:
        serverBaseUrl +
        `simulator/${simulationData.gameId}/simulate/${simulationData.ownScript}/${simulationData.enemyScript}`,
      headers: header,
      data: simulationData.scripts,
    }).then(
      (success) => {
        dispatch(
          loadGame({
            game: success.data,
          })
        );
        console.log("saved game simulation");
      },
      (error) => {
        dispatch(
          addError({
            name: "simulateGameError",
            description: error.response.data,
          })
        );
      }
    );
  };
}

export function getStartOfGame(gameId) {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "GET",
      url: `${serverBaseUrl}simulator/${gameId}/start`,
      headers: header,
    }).then(
      (success) => {
        dispatch(
          loadGame({
            game: success.data,
          })
        );
        console.log("loaded game start");
      },
      (error) => {
        dispatch(
          addError({
            name: "getStartOfGameError",
            description: error.response.data,
          })
        );
      }
    );
  };
}

export function getEndOfGame(gameId) {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "GET",
      url: `${serverBaseUrl}simulator/${gameId}/end`,
      headers: header,
    }).then(
      (success) => {
        dispatch(
          loadGame({
            game: success.data,
          })
        );
        console.log("got previous turn");
      },
      (error) => {
        dispatch(
          addError({
            name: "getStartOfGameError",
            description: error.response.data,
          })
        );
      }
    );
  };
}

export function getNextTurnOfGame(gameId) {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "GET",
      url: `${serverBaseUrl}simulator/${gameId}/nextTurn`,
      headers: header,
    }).then(
      (success) => {
        dispatch(
          loadGame({
            game: success.data,
          })
        );
        console.log("got next turn");
      },
      (error) => {
        dispatch(
          addError({
            name: "getStartOfGameError",
            description: error.response.data,
          })
        );
      }
    );
  };
}

export function getPreviousTurnOfGame(gameId) {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "GET",
      url: `${serverBaseUrl}simulator/${gameId}/previousTurn`,
      headers: header,
    }).then(
      (success) => {
        dispatch(
          loadGame({
            game: success.data,
          })
        );
        console.log("got previous turn");
      },
      (error) => {
        dispatch(
          addError({
            name: "getStartOfGameError",
            description: error.response.data,
          })
        );
      }
    );
  };
}

export function loadCurrentMap(mapId) {
  return (dispatch, getState) => {
    console.log(getState);
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "GET",
      url: serverBaseUrl + "simulator/" + mapId,
      headers: header,
    }).then(
      (success) => {
        console.log("loaded map");
        dispatch(
          loadGame({
            game: success.data,
          })
        );
      },
      (error) => {
        dispatch(
          addError({
            name: "map loading error",
            description: error.response.data,
          })
        );
      }
    );
  };
}
