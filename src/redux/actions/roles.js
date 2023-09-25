import axios from "axios";
import ApiConfig from "~/config";
import { getHeaders } from "../../middleware";

const { baseUrl } = ApiConfig;

const roles = {
  list:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "roles/loading" });
      await axios
        .get(`${baseUrl}/roles/admin/list`, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "roles/admin/list",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          dispatch({ type: "roles/error", data: error });
        });
    },
};

export default roles;
