import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: null,
  users: [],
  userInfo: null,
};

export default function users(state = initialState, action) {
  let { type, data } = action;
  switch (type) {
    case "users/admin/create":
      return { ...state, loading: false, error: false };
    case "users/admin/info" || "users/admin/update":
      return { ...state, userInfo: data, loading: false, error: false };
    case "users/admin/list":
      return { ...state, users: data, loading: false, error: false };
    case "users/admin/remove":
      toast.success("با موفقیت ثبت شد.");
      return { ...state, users: data, loading: false, error: false };
    case "users/loading":
      return { ...state, loading: true };
    case "users/error":
      toast.error(data?.message);
      return { ...state, loading: false, error: data.message };
    default:
      return state;
  }
}