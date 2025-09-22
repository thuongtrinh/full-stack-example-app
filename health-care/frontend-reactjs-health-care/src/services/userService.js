import RequestUtils from "../utils/RequestUtils";
import axiosClient from "./axiosClient";

const listUserPaging = async (body) => {
  return await axiosClient.post(`/api/v1/auth/list-user`, body);
};

const updateUser = async (data) => {
  const body = RequestUtils.setBodyUpdateUser(data);
  return await axiosClient.put(`/api/v1/auth/update-user`, body);
};

const deleteUser = async (userId) => {
  return await axiosClient.delete(`/api/v1/auth/delete-user/${userId}`);
};

const getUserInfo = async () => {
  return await axiosClient.get(`/api/v1/auth/user-info`);
};

const userService = {
  listUserPaging,
  updateUser,
  deleteUser,
  getUserInfo,
};

export default userService;
