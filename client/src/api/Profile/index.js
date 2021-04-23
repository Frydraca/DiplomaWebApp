import axios from "axios";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";
import { addError } from "../../store/Errors";
import { loadAllScripts } from "../../store/Script";

export function loadScripts() {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "GET",
      url: serverBaseUrl + "scripts",
      headers: header,
    }).then(
      (success) => {
        console.log("loaded scripts");
        dispatch(
          loadAllScripts({
            scripts: success.data,
          })
        );
      },
      (error) => {
        dispatch(
          addError({
            name: "script loading error",
            description: error.response.data,
          })
        );
      }
    );
  };
}

export function deleteScript(scriptId) {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "DELETE",
      url: `${serverBaseUrl}designer/${scriptId}/delete`,
      headers: header,
    }).then(
      (success) => {},
      (error) => {
        dispatch(
          addError({
            name: "script deleting error",
            description: error.response.data,
          })
        );
      }
    );
  };
}
