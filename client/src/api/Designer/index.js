import axios from "axios";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";
import { addError } from "../../store/Errors";

export function saveScript(scriptData) {
  console.log(scriptData);
  return (dispatch, getState) => {
    console.log(getState);
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
