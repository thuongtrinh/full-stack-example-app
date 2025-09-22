import axios from "axios";
// import Cookies from "js-cookie";
import config from "../config";
import reduxStore from "../redux";

const axiosClient = axios.create({
  baseURL: config.api.API_BASE_URL || "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const handleRequestSuccess = async (config) => {
  const state = reduxStore.getState();
  const accessToken = state.user.accessToken; // Assuming your access token is stored in state.auth.accessToken
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const handleRequestError = (error) => {
  return Promise.reject(error);
};

const handleResponseSuccess = (res) => {
  return res;
};

const handleResponseErr = async (error) => {
  // const originalRequest = error.config;
  // if (error.response.status === 401 && !originalRequest._retry) {
  //   originalRequest._retry = true;
  //   const refreshToken = Cookies.get("refreshToken");
  //   if (!refreshToken) return Promise.reject(error);
  //   try {
  //     const res = await axiosClient.post("/refresh-token", {
  //       token: refreshToken,
  //     });
  //     const newAccessToken = res.data.accessToken;
  //     Cookies.set("token", newAccessToken);
  //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  //     return axiosClient(originalRequest);
  //   } catch (error) {
  //     Cookies.remove("token");
  //     Cookies.remove("refreshToken");
  //     Cookies.remove("userId");
  //     return Promise.reject(error);
  //   }
  // }
  return Promise.reject(error);
};

axiosClient.interceptors.request.use(
  (config) => handleRequestSuccess(config),
  (error) => handleRequestError(error)
);

axiosClient.interceptors.response.use(
  (config) => handleResponseSuccess(config),
  (error) => handleResponseErr(error)
);

export default axiosClient;
