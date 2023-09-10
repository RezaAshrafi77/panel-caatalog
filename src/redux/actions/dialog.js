const dialog = {
  set:
    (data = {}) =>
    async (dispatch) =>
      dispatch({ type: "dialog/set", data }),
  reset:
    (data = {}) =>
    async (dispatch) =>
      dispatch({ type: "dialog/reset", data }),
};

export default dialog;
