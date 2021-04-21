import axios from "axios";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";
import { addError } from "../../store/Errors";
import { loadOneScript } from "../../store/Script";

export function saveScript(scriptData) {
  return (dispatch, getState) => {
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "post",
      url: serverBaseUrl + "designer",
      headers: header,
      data: scriptData,
    }).then(
      (success) => {
        console.log("saved script");
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
            script: success.data,
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
