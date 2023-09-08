import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "~/config";
import { apiErrorHandler, getHeaders } from "../../middleware";

const { baseUrl } = ApiConfig;

const template = {
  getTemplate:
    (data = {}) =>
    async (dispatch) => {
      await axios
        .get(`${baseUrl}/${data?.id}`)
        .then((res) => {
          dispatch({ type: "template/loading" });
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
      await axios
        .get(`${baseUrl}/templates/admin/list`, { headers: getHeaders() })
        .then((res) => {
          console.log(res?.data);
        })
        .catch((error) => {
          apiErrorHandler(error);
        });
    },
};

export default template;
