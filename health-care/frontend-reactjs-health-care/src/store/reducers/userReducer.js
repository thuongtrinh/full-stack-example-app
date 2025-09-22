import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  accessToken: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.accessToken,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
        accessToken: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
        accessToken: null,
      };
    case actionTypes.USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};

export default userReducer;
