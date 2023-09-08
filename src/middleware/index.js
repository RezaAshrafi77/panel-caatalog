
export const setTokens = (data) => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.setItem("refresh_token", data?.accessToken);
  localStorage.setItem("access_token", data?.refreshToken);
  localStorage.setItem("userData", JSON.stringify(data));
};

export const checkUserStatus = () => {
  const refresh = localStorage.getItem("refresh_token");
  const userData = localStorage.getItem("userData");
  if (!refresh) return false;
  if (refresh == "undefined") {
    localStorage.clear();
    return false;
  }
  return JSON.parse(userData);
};

export const getHeaders = () => {
  const access_token = localStorage.getItem("access_token");
  return { Authorization: `Bearer ${access_token}`, Token: access_token };
};

export const apiErrorHandler = (err) => {
  switch (err?.response?.statusText) {
    case "Unauthorized":
      // localStorage.clear();
    default:
      console.log(err);
  }
};
