import proxy from "~/redux/proxy";
import { toast } from "react-toastify";

const status = proxy.status();
const prefix = "user/";

const initialState = {
  status,
  loading: false,
  error: null,
};

export default function auth(state = initialState, action) {
  let { type, data, schema, count, params } = action;
  switch (type) {
    case prefix + "login":
      return {
        ...state,
        loading: false,
        status: data,
      };
    case prefix + "loading":
      return { ...state, loading: true };
    case prefix + "error":
      toast.error(data.message);
      return { ...state, loading: false, error: data.message };
    default:
      return state;
  }
}
