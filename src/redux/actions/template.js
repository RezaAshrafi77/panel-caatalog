import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "~/config";
import { apiErrorHandler, getHeaders } from "../../middleware";

const { baseUrl } = ApiConfig;

const template = {
  getTemplate:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "template/loading" });
      await axios
        .get(`${baseUrl}/${data?.id}`)
        .then((res) => {
          switch (res?.status) {
            case 200:
              dispatch({ type: "template/getTemplate", data: res.data.data });
          }
        })
        .catch((error) => {
          dispatch({ type: "template/error", data: error });
        });
    },
  getAdminsTemplates:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "template/loading" });
      await axios
        .get(`${baseUrl}/templates/admin/list`, { headers: getHeaders() })
        .then((res) => {
          dispatch({
            type: "template/admin/list",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          apiErrorHandler(error);
        });
    },
  getAdminTemplate:
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
          apiErrorHandler(error);
        });
    },
};

export default template;
