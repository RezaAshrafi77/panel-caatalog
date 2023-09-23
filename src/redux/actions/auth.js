import axios from "axios";
import { baseUrl } from "../../config";
import { setTokens } from "../../middleware";
import { toast } from "react-toastify";

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
        .catch((err) => {
          dispatch({ type: "auth/error" });
          console.log(err);
          switch (err?.response?.status) {
            case 401:
              toast.error("رمز عبور یا نام کاربری اشتباه است.");
          }
        });
    },
};

export default auth;
