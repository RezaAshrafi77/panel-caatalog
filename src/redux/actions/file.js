import axios from "axios";
import { baseUrl } from "../../config";
import { getHeaders } from "../../middleware";
const file = {
  upload:
    (data = {}) =>
    async (dispatch) => {
      var formData = new FormData();
      for (let key in data) formData.append(key, data[key]);
      return await axios
        .post(`${baseUrl}/files/upload`, formData, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "file/upload",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          dispatch({ type: "file/error", data: error });
        });
    },
};

export default file;
