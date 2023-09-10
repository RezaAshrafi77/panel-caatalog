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
  adminUpdate:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "users/loading" });
      await axios
        .patch(`${baseUrl}/users/admin/update/${data?._id}`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "users/admin/update",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          apiErrorHandler(error);
        });
    },
  update:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "users/loading" });
      await axios
        .patch(`${baseUrl}/users/update`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "auth/login",
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

  del:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "users/loading" });
      await axios
        .delete(`${baseUrl}/users/admin/remove`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "users/admin/remove",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          apiErrorHandler(error);
        });
    },
  adminInfo:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "users/loading" });
      await axios
        .get(`${baseUrl}/users/admin/info/${data?.id}`, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "users/admin/info",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          apiErrorHandler(error);
        });
    },
};

export default users;
