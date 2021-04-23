import axios from "axios";
import { push } from "connected-react-router";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";
import { addError } from "../../store/Errors";
import { loadOneScript } from "../../store/Script";

export function createScript(scriptData) {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "post",
      url: serverBaseUrl + "designer",
      headers: header,
      data: scriptData,
    }).then(
      (success) => {
        console.log("created script");
        dispatch(push(`${success.data.id}`));
        window.location.reload();
      },
      (error) => {
        dispatch(
          addError({
            name: "scriptSaveError",
            description: error.response.data,
          })
        );
      }
    );
  };
}

export function updateScript(scriptId, scriptData) {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "post",
      url: `${serverBaseUrl}designer/${scriptId}/update`,
      headers: header,
      data: scriptData,
    }).then(
      (success) => {
        console.log("updated script");
      },
      (error) => {
        dispatch(
          addError({
            name: "scriptSaveError",
            description: error.response.data,
          })
        );
      }
    );
  };
}

export function loadScript(scriptId) {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "GET",
      url: serverBaseUrl + "designer/" + scriptId,
      headers: header,
    }).then(
      (success) => {
        console.log("loaded script");
        dispatch(
          loadOneScript({
            script: {
              ...success.data.script,
            },
          })
        );
      },
      (error) => {
        dispatch(
          addError({
            name: "scriptSaveError",
            description: error.response.data,
          })
        );
      }
    );
  };
}
