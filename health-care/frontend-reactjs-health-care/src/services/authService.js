import RequestUtils from "../utils/RequestUtils";
import axiosClient from "./axiosClient";

const register = async (data) => {
  const body = RequestUtils.setBodyRegisterUser(data);
  return await axiosClient.post(`/api/v1/auth/add-user`, body);
};

const signIn = async (body) => {
  return await axiosClient.post(`/api/v1/auth/generate-token`, body);
};

const userById = async (userId) => {
  return await axiosClient.get(`/api/v1/auth/user/${userId}`);
};

const authService = {
  register,
  signIn,
  userById,
};

export default authService;
