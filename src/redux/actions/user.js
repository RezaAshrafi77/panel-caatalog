import proxy from "~/redux/proxy";
const user = {
  checkAuthentication: (data) => async (dispatch) =>
    dispatch({ type: "user/setActiveRoleId", data }),
    
  setActiveRoleId: (data) => async (dispatch) =>
    dispatch({ type: "user/setActiveRoleId", data }),
  login: (data) => async (dispatch) =>
    await proxy.login("user/login", data, { dispatch }),
  switchRole:
    (data = {}) =>
    async (dispatch) => {
      await proxy.login("user/switchRole", data, { dispatch });
    },
  otp_login: (data) => async (dispatch) =>
    await proxy.login("user/otp/login", data, { dispatch }),
  otp_register: (data) => async (dispatch) =>
    await proxy.login("user/otp/register", data, { dispatch }),
  logout: (data) => async (dispatch) =>
    await proxy.logout("user/logout", data, { dispatch }),
  getUserRole: (data) => async (dispatch) =>
    await proxy.get("user/getUserRole", data, { dispatch }),
  getProfile:
    (data = {}) =>
    async (dispatch) =>
      await proxy.get("user/getProfile", data, { dispatch }),
  setProfile:
    (data = {}, data2 = {}) =>
    async (dispatch) => {
      await proxy.put("user/setProfile", data, { dispatch });
      await proxy.get("user/getProfile", data2, { dispatch });
    },
  list:
    (data = {}) =>
    async (dispatch) => {
      await proxy.get("user/list", data, { dispatch });
    },
  info:
    (data = {}) =>
    async (dispatch) => {
      await proxy.get("user/info", data, { dispatch });
    },
  add:
    (data = {}) =>
    async (dispatch) => {
      await proxy.post("user/add", data, { dispatch });
    },
  setDefaultPassword:
    (data = {}) =>
    async (dispatch) => {
      await proxy.put("user/setDefaultPassword", data, { dispatch });
    },
  resetPassword:
    (data = {}) =>
    async (dispatch) => {
      await proxy.post("user/resetPassword", data, { dispatch });
    },
  addUserRole:
    (data = {}) =>
    async (dispatch) => {
      await proxy.post("user/addUserRole", data, { dispatch });
    },
  deleteUserRole:
    (data = {}) =>
    async (dispatch) => {
      await proxy.delete("user/deleteUserRole", data, { dispatch });
    },
  updateUserRole:
    (data = {}) =>
    async (dispatch) => {
      await proxy.put("user/updateUserRole", data, { dispatch });
    },
  referAndDeleteUserRole:
    (data = {}) =>
    async (dispatch) => {
      await proxy.delete("user/referAndDeleteUserRole", data, { dispatch });
    },

  delete:
    (data = {}) =>
    async (dispatch) => {
      await proxy.delete("user/delete", data, { dispatch });
    },
  update:
    (data = {}) =>
    async (dispatch) => {
      await proxy.put("user/update", data, { dispatch });
    },
};

export default user;
