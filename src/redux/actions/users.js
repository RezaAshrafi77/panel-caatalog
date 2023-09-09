import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "~/config";
import { apiErrorHandler, getHeaders } from "../../middleware";

const { baseUrl } = ApiConfig;

const users = {
  create:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "users/loading" });
      await axios
        .post(`${baseUrl}/users/admin/create`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "users/admin/create",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          apiErrorHandler(error);
        });
    },
  list:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "users/loading" });
      await axios
        .get(`${baseUrl}/users/admin/list`, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "users/admin/list",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          apiErrorHandler(error);
        });
    },
};

export default users;
