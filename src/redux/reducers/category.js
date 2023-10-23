import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: null,
  categories: [],
};

export default function category(state = initialState, action) {
  let { type, data } = action;
  switch (type) {
    case "category/admin/list":
      return { ...state, categories: data, loading: false, error: null };
    case "category/admin/delete":
      toast.success("دسته بندی با موفقیت حذف شد.")
      return { ...state, loading: false, error: null };
    case "category/admin/create":
      toast.success("دسته بندی با موفقیت اضافه شد.")
      return { ...state, loading: false, error: null };
    case "category/loading":
      return { ...state, loading: true };
    case "category/error":
      toast.error(data?.message);
      return { ...state, loading: false, error: data.message };
    default:
      return state;
  }
}
