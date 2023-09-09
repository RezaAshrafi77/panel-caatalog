const dialog = {
  set: (data = {}) => dispatch({ type: "dialog/set", data }),
  reset: (data = {}) => dispatch({ type: "dialog/reset", data }),
};

export default dialog;
