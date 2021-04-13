import axios from "axios";
import { push } from "connected-react-router";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";
import { loadAuthData, removeAuthData } from "../../store/Authentication";
import { addError } from "../../store/Errors";
import { loadUser } from "../../store/User";

var refreshInterval = { id: setInterval(() => {}, 1000), isSet: false };

function refreshToken(dispatch, getState) {
  const header = generateAuthenticationHeader(getState());
  console.log("refresh");
  return axios({
    method: "POST",
    url: serverBaseUrl + "token",
    headers: header,
  }).then(
    (success) => {
      if (
        success.data.loggedOut !== undefined &&
        success.data.loggedOut === true
      ) {
        logOutLocally(dispatch);
      } else {
        dispatch(loadAuthData({ auth: success.data }));
      }
    },
    (error) => {
      dispatch(
        addError({
          name: "refreshError",
          description: error.response.data,
        })
      );
      if (error.response.status === 401) {
        logOutLocally(dispatch);
      }
    }
  );
}

export function initializeScreen() {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "GET",
      url: serverBaseUrl + "user",
      headers: header,
    }).then(
      (success) => {
        dispatch(loadUser({ user: success.data }));
        if (refreshInterval.isSet === false) {
          refreshInterval.isSet = true;
          refreshToken(dispatch, getState);
          refreshInterval.id = setInterval(() => {
            refreshToken(dispatch, getState);
          }, 5000);
        }
      },
      (error) => {
        dispatch(
          addError({
            name: "Get user data Error",
            description: error.response.data,
          })
        );
        if (error.response.status === 401) {
          logOutLocally(dispatch);
        }
      }
    );
  };
}

export function logIn(loginData) {
  return (dispatch) => {
    return axios({
      method: "post",
      url: serverBaseUrl + "login",
      data: loginData,
    }).then(
      (success) => {
        dispatch(loadAuthData({ auth: success.data }));
        dispatch(push("/designer"));
      },
      (error) => {
        console.log(error);
        dispatch(
          addError({
            name: "credentialError",
            description: error.response.data,
          })
        );
      }
    );
  };
}

export function logOutLocally(dispatch) {
  console.log("logout locally");
  clearInterval(refreshInterval.id);
  refreshInterval.isSet = false;
  dispatch(removeAuthData());
  dispatch(loadUser({ user: {} }));
  dispatch(push("/"));
}

export function logOut() {
  console.log("logout");
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "POST",
      url: serverBaseUrl + "logout",
      headers: header,
    }).then(
      (_success) => {
        console.log("success");
        logOutLocally(dispatch);
      },
      (error) => {
        console.log("error");
        logOutLocally(dispatch);
        dispatch(
          addError({
            name: "credentialError",
            description: error.response.data,
          })
        );
      }
    );
  };
}

export function createNewAccount(registerData) {
  console.log(registerData);
  return (dispatch) => {
    return axios({
      method: "post",
      url: serverBaseUrl + "register",
      data: registerData,
    }).then(
      (success) => {
        dispatch(loadAuthData({ auth: success.data }));
        dispatch(push("/designer"));
      },
      (error) => {
        dispatch(
          addError({
            name: "registrationCredentialError",
            description: error.response.data,
          })
        );
      }
    );
  };
}

export function isLoggedIn() {
  const jwtToken = localStorage.getItem("jwtToken");
  return jwtToken !== undefined && jwtToken !== null;
}
