import { toast } from "react-toastify";

const initialState = {
  open: false,
  title: "",
  description: "",
  confirmTitle: "",
  cancelTitle: "",
  confirm: () => {},
};

export default function dialog(state = initialState, action) {
  let { type, data } = action;
  switch (type) {
    case "dialog/set":
      return {
        ...state,
        open: true,
        title: data?.title,
        description: data?.description,
        confirmTitle: data?.confirmTitle,
        cancelTitle: data?.cancelTitle,
        confirm: data?.confirm,
      };
    case "dialog/reset":
      return {
        open: false,
        title: "",
        description: "",
        confirmTitle: "",
        cancelTitle: "",
        confirm: () => {},
      };
    default:
      return state;
  }
}
