import proxy from "~/redux/proxy";

const prefix = "auth/";
const auth = {
  login:
    (data = {}) =>
    async (dispatch) => {
      await proxy.login(prefix + "login", data, { dispatch });
    },
};

export default auth;
