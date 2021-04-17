import axios from "axios";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";
import { addError } from "../../store/Errors";
import { loadMapList } from "../../store/Map";
import { loadGame } from "../../store/Game";

export function loadMaps() {
  return (dispatch, getState) => {
    console.log(getState);
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "GET",
      url: serverBaseUrl + "mapList",
      headers: header,
    }).then(
      (success) => {
        console.log("loaded maps");
        dispatch(
          loadMapList({
            maps: success.data,
          })
        );
      },
      (error) => {
        dispatch(
          addError({
            name: "map list loading error",
            description: error.response.data,
          })
        );
      }
    );
  };
}

// export function loadOneMap(mapId) {
//   return (dispatch, getState) => {
//     console.log(getState);
//     const header = generateAuthenticationHeader(getState());
//     return axios({
//       method: "GET",
//       url: serverBaseUrl + "simulator" + mapId,
//       headers: header,
//     }).then(
//       (success) => {
//         console.log("loaded map");
//         dispatch(
//           loadGame({
//             gameMap: success.data,
//           })
//         );
//       },
//       (error) => {
//         dispatch(
//           addError({
//             name: "map loading error",
//             description: error.response.data,
//           })
//         );
//       }
//     );
//   };
// }

export function addMap(mapData) {
  return (dispatch, getState) => {
    console.log(mapData);
    const header = generateAuthenticationHeader(getState());
    return axios({
      method: "POST",
      url: serverBaseUrl + "mapList",
      headers: header,
      data: mapData,
    }).then(
      (success) => {
        console.log("added map");
      },
      (error) => {
        dispatch(
          addError({
            name: "map adding error",
            description: error.response.data,
          })
        );
      }
    );
  };
}
