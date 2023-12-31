import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "~/config";
import { getHeaders } from "../../middleware";

const { baseUrl } = ApiConfig;

const users = {
  create:
    (data = {}, calllback = () => {}) =>
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
          calllback();
        })
        .catch((error) => {
          dispatch({ type: "users/error", data: error });
        });
    },
  adminUpdate:
    (data = {}, callback = () => {}) =>
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
          callback();
        })
        .catch((error) => {
          dispatch({ type: "users/error", data: error });
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
          dispatch({ type: "users/error", data: error });
        });
    },

  del:
    (data = {}) =>
    async (dispatch) => {
      console.log(data);
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
          dispatch({ type: "users/error", data: error });
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
          dispatch({ type: "users/error", data: error });
        });
    },
  addRole:
    (data = {}, callback = () => {}) =>
    async (dispatch) => {
      dispatch({ type: "users/loading" });
      await axios
        .patch(`${baseUrl}/users/admin/role/add`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "/users/admin/role/add",
            data: res?.data?.data,
          });
          callback();
        })
        .catch((error) => {
          dispatch({ type: "users/error", data: error });
        });
    },
  removeRole:
    (data = {}, callback = () => {}) =>
    async (dispatch) => {
      dispatch({ type: "users/loading" });
      await axios
        .patch(`${baseUrl}/users/admin/role/remove`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "/users/admin/role/remove",
            data: res?.data?.data,
          });
          callback();
        })
        .catch((error) => {
          dispatch({ type: "users/error", data: error });
        });
    },
};

export default users;
