import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: null,
};

export default function part(state = initialState, action) {
  let { type, data } = action;
  switch (type) {
    case "part/loading":
      return { ...state, loading: !state.loading, error: false };
    case "part/error":
      toast.error(data?.message);
      return { ...state, loading: false, error: data.message };
    default:
      return state;
  }
}
