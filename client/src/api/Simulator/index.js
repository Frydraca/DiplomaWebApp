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
      url: serverBaseUrl + "simulator/simulate",
      headers: header,
      data: simulationData,
    }).then(
      (success) => {
        dispatch(
          loadGame({
            game: success.data,
          })
        );
        console.log("saved game simulation");
        console.log(success.data);
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
  console.log(gameId);
  console.log("gameId: " + gameId);
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "GET",
      url: `${serverBaseUrl}simulator/${gameId}/start`,
      headers: header,
    }).then(
      (success) => {
        // dispatch(
        //   loadGame({
        //     game: success.data,
        //   })
        // );
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

export function getNextTurnOfGame(gameId) {
  console.log(gameId);
  console.log("gameId: " + gameId);
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
  console.log(gameId);
  console.log("gameId: " + gameId);
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
