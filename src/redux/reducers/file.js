import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: null,
  id: null,
};

export default function file(state = initialState, action) {
  let { type, data } = action;
  switch (type) {
    case "file/upload":
      return {
        ...state,
        loading: false,
        error: null,
        id: data?._id,
      };
    case "file/reset":
      return { ...state, id: null, loading: false };
    case "file/loading":
      return { ...state, loading: true, progress: 0 };
    case "file/error":
      toast.error(data?.message);
      return { ...state, loading: false, error: data.message };
    default:
      return state;
  }
}
