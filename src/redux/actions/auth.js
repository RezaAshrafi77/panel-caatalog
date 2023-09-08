import axios from "axios";
import { baseUrl } from "../../config";
import { setTokens } from "../../middleware";

const auth = {
  login:
    (data = {}) =>
    async (dispatch) => {
      dispatch({ type: "auth/loading" });
      await axios
        .post(baseUrl + "/" + "auth/login", data)
        .then((res) => {
          dispatch({ type: "auth/login", data: res?.data?.data });
          setTokens(res?.data?.data);
        })
        .catch((err) => dispatch({ type: "auth/error", data: err?.message }));
    },
};

export default auth;
