import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: null,
  template: null,
  templates: [],
};

export default function template(state = initialState, action) {
  let { type, data } = action;
  switch (type) {
    case "template/admin/list":
      return { ...state, templates: data, loading: false, error: null };
    case "template/admin/list":
      return { ...state, templates: data, loading: false, error: null };
    case "template/customer/list":
      return { ...state, templates: data, loading: false, error: null };
    case "template/admin/create":
      toast.success("عملیات با موفقیت انجام شد.");
      return { ...state, template: data, loading: false, error: null };
    case "template/admin/update":
      toast.success("عملیات با موفقیت انجام شد.");
      return { ...state, template: data, loading: false, error: null };
    case "template/customer/update":
      toast.success("عملیات با موفقیت انجام شد.");
      return { ...state, template: data, loading: false, error: null };
    case "template/getTemplate":
      return { ...state, template: data, loading: false, error: null };
    case "template/admin/{id}":
      return { ...state, template: data, loading: false, error: null };
    case "template/loading":
      return { ...state, loading: true };
    case "template/error":
      toast.error(data?.message);
      return { ...state, loading: false, error: data.message };
    default:
      return state;
  }
}
