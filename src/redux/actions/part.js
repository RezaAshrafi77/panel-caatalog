import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "~/config";
import { apiErrorHandler, getHeaders } from "../../middleware";

const { baseUrl } = ApiConfig;

const part = {
  update:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "part/loading" });
      await axios
        .patch(`${baseUrl}/templates/admin/part/update`, data, {
          headers: getHeaders(),
        })
        .then((res) => {
          dispatch({ type: "part/loading" });
          toast.success("با موفقیت ویرایش شد.");
          dispatch({
            type: "template/admin/{id}",
            data: res?.data?.data,
          });
        })
        .catch((error) => {
          dispatch({ type: "part/loading" });
          toast.error(error?.message);
        });
    },
};

export default part;
