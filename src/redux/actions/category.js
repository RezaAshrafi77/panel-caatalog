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
        .get(`${baseUrl}/category/admin/list`, {
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
};

export default category;
