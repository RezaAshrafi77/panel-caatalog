import proxy from "~/redux/proxy";
import { toast } from "react-toastify";

const status = proxy.status();

const initialState = {
  status,
  loading: false,
  error: null,
};

export default function auth(state = initialState, action) {
  let { type, data } = action;
  switch (type) {
    case "user/login":
      return {
        ...state,
        loading: false,
        status: data,
      };
    case "user/loading":
      return { ...state, loading: true };
    case "user/error":
      toast.error(data.message);
      return { ...state, loading: false, error: data.message };
    default:
      return state;
  }
}
