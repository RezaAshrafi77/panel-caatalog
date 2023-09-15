import axios from "axios";
import { baseUrl } from "../../config";
import { getHeaders } from "../../middleware";
const file = {
  upload:
    (data = {}) =>
    async (dispatch) => {
      var formData = new FormData();
      formData.append("file", data);
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
