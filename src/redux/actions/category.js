import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "~/config";
import { apiErrorHandler, getHeaders } from "../../middleware";

const { baseUrl } = ApiConfig;

const category = {
  getAdminCategories:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "category/loading" });
      await axios
        .get(`${baseUrl}/category/list`, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "category/admin/list",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: "category/error",
            data: res?.data?.data,
          });
        });
    },

  createAdminCategory:
    (data = {}, callback) =>
    async (dispatch) => {
      dispatch({ type: "category/loading" });
      await axios
        .post(`${baseUrl}/category/admin/create`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          callback();
          dispatch({
            type: "category/admin/create",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          dispatch({
            type: "category/error",
          });
        });
    },
  deleteAdminCategory:
    (data = {}, callback) =>
    async (dispatch) => {
      dispatch({ type: "category/loading" });
      await axios
        .delete(`${baseUrl}/category/admin/remove`, {
          data,
          headers: getHeaders(),
        })
        .then((res) => {
          callback();
          dispatch({
            type: "category/admin/delete",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          // toast.error(error?.response?.data?.message);
          dispatch({
            type: "category/error",
          });
        });
    },
};

export default category;
