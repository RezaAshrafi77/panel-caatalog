import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "~/config";
import { apiErrorHandler, getHeaders } from "../../middleware";

const { baseUrl } = ApiConfig;

const part = {
  adminPartUpdate:
    (data = {}, callback = () => {}) =>
    async (dispatch) => {
      dispatch({ type: "part/loading" });
      await axios
        .patch(`${baseUrl}/templates/admin/part/update`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "template/admin/{id}",
            data: res?.data?.data,
          });
          dispatch({
            type: "file/reset",
          });
          callback();
        })
        .catch((error) => {
          dispatch({ type: "part/loading" });
          toast.error(error?.message);
        });
    },
  customerPartUpdate:
    (data = {}, callback = () => {}) =>
    async (dispatch) => {
      dispatch({ type: "part/loading" });
      await axios
        .patch(`${baseUrl}/templates/customer/part/update`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "template/admin/{id}",
            data: res?.data?.data,
          });
          dispatch({
            type: "file/reset",
            data: res?.data?.data,
          });
          callback();
        })
        .catch((error) => {
          dispatch({ type: "part/loading" });
          toast.error(error?.message);
        });
    },
  adminPartCreate:
    (data = {}, callback = () => {}) =>
    async (dispatch) => {
      dispatch({ type: "part/loading" });
      await axios
        .post(`${baseUrl}/templates/admin/part/create`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "template/admin/{id}",
            data: res?.data?.data,
          });
          dispatch({
            type: "file/reset",
            data: res?.data?.data,
          });
          callback();
        })
        .catch((error) => {
          dispatch({ type: "part/loading" });
          toast.error(error?.message);
        });
    },
  customerPartCreate:
    (data = {}, callback = () => {}) =>
    async (dispatch) => {
      dispatch({ type: "part/loading" });
      await axios
        .post(`${baseUrl}/templates/customer/part/create`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({
            type: "template/admin/{id}",
            data: res?.data?.data,
          });
          dispatch({
            type: "file/reset",
            data: res?.data?.data,
          });
          callback();
        })
        .catch((error) => {
          dispatch({ type: "part/loading" });
          toast.error(error?.message);
        });
    },
};

export default part;
