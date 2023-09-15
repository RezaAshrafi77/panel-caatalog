import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "~/config";
import { apiErrorHandler, getHeaders } from "../../middleware";

const { baseUrl } = ApiConfig;

const template = {
  getAdminsTemplates:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "template/loading" });
      await axios
        .get(`${baseUrl}/templates/admin/list`, {
          params: data,
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "template/admin/list",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          dispatch({ type: "template/error", data: error });
        });
    },
  getCustomersTemplates:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "template/loading" });
      await axios
        .get(`${baseUrl}/templates/customer/list`, {
          headers: getHeaders(),
          params: data
        })
        .then((res) => {
          dispatch({
            type: "template/customer/list",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          dispatch({ type: "template/error", data: error });
        });
    },
  getAdminTemplates:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "template/loading" });
      await axios
        .get(`${baseUrl}/templates/admin/${data?.id}`, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "template/admin/{id}",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          dispatch({ type: "template/error", data: error });
        });
    },
  updateTemplate:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "template/loading" });
      await axios
        .patch(`${baseUrl}/templates/customer/update`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "template/customer/update",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          dispatch({ type: "template/error", data: error });
        });
    },
  adminUpdateTemplate:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "template/loading" });
      await axios
        .patch(`${baseUrl}/templates/admin/update`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "template/admin/update",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          dispatch({ type: "template/error", data: error });
        });
    },
  create:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "template/loading" });
      await axios
        .post(`${baseUrl}/templates/admin/create`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "template/admin/create",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          dispatch({ type: "template/error", data: error });
        });
    },
};

export default template;
