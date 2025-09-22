import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  adminInfo: null,
  users: [],
  topDoctors: [],
  doctorDetail: null,
  allCodeTime: [],
  allCodeGender: [],
  allRequiredDoctorInfo: [],
  actionSuccess: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        adminInfo: action.adminInfo,
      };
    case actionTypes.ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };

    case actionTypes.DOCTOR_DETAIL_SUCCESS:
      state.doctorDetail = action.doctorDetail;
      return {
        ...state,
      };

    case actionTypes.DOCTOR_DETAIL_FAILED:
      state.doctorDetail = null;
      return {
        ...state,
      };

    case actionTypes.DOCTOR_MARKDOWN_SUCCESS:
      state.doctorMarkdown = action.doctorMarkdown;
      return {
        ...state,
      };

    case actionTypes.DOCTOR_MARKDOWN_FAILED:
      state.doctorMarkdown = null;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_TIME_SUCCESS:
      state.allCodeTime = action.dataTime;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_TIME_FAILED:
      state.allCodeTime = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_SCHEDULE_TIME_DOCTOR_SUCCESS:
      state.scheduleTimeDoctor = action.scheduleTimeDoctor;
      return {
        ...state,
      };

    case (actionTypes.FETCH_SCHEDULE_TIME_DOCTOR_FAILED,
    actionTypes.CLEAR_SCHEDULE_TIME_DOCTOR):
      state.scheduleTimeDoctor = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
      state.allRequiredDoctorInfo = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
      state.allRequiredDoctorInfo = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_GENDER_SUCCESS:
      state.allCodeGender = action.payload;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_GENDER_FAILED:
      state.allCodeGender = [];
      return {
        ...state,
      };

    case actionTypes.CLEAR_BOOKING_INFO:
      state.actionSuccess = action.actionSuccess;
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
