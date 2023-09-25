import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

export default function roles(state = initialState, action) {
  let { type, data } = action;
  switch (type) {
    case "roles/admin/list":
      return { ...state, list: data, loading: false, error: false };
    case "roles/loading":
      return { ...state, loading: true };
    case "roles/error":
      toast.error(data?.message);
      return { ...state, loading: false, error: data.message };
    default:
      return state;
  }
}
