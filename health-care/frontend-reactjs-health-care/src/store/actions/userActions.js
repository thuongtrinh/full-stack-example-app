import actionTypes from "./actionTypes";

export const userLoginSuccess = (accessToken) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  accessToken,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const addUserSuccess = () => ({
  type: actionTypes.USER_ADD_SUCCESS,
});

export const getUserInfoSuccess = (userInfo) => ({
  type: actionTypes.USER_INFO_SUCCESS,
  userInfo: userInfo,
});
