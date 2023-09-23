import proxy from "~/redux/proxy";
import { toast } from "react-toastify";
import { checkUserStatus } from "../../middleware";

const initialState = {
  status: checkUserStatus(),
  loading: false,
  error: null,
};

export default function auth(state = initialState, action) {
  let { type, data } = action;
  switch (type) {
    case "auth/login":
      return {
        ...state,
        loading: false,
        status: data,
      };
    case "auth/loading":
      return { ...state, loading: true };
    case "auth/error":
      // toast.error(data.message);
      return { ...state, loading: false };
    default:
      return state;
  }
}
