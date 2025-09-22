import { toast } from "react-toastify";
import authService from "../../services/authService";
import userService from "../../services/userService";
import actionTypes from "./actionTypes";
import { FormattedMessage } from "react-intl";
import RequestUtils from "../../utils/RequestUtils";
import healthCareService from "../../services/healthCareService";
import adminService from "../../services/adminService";
import { ALL_CODE_TYPE } from "../../utils";

export const adminLoginSuccess = (adminInfo) => ({
  type: actionTypes.ADMIN_LOGIN_SUCCESS,
  adminInfo: adminInfo,
});

export const adminLoginFail = () => ({
  type: actionTypes.ADMIN_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const adminCreateNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      authService
        .register(data)
        .then((response) => {
          toast.success(
            <FormattedMessage id="system.user-manage.add-user-success" />
          );

          dispatch(adminCreateUserSuccess());
          dispatch(fetchAllUsersStart());
        })
        .catch((error) => {
          toast.error(
            <FormattedMessage id="system.user-manage.add-user-fail" />
          );

          dispatch(adminCreateUserFailed());
          console.error(error);
        });
    } catch (e) {
      console.error(e);
      toast.error(<FormattedMessage id="system.user-manage.add-user-fail" />);
    }
  };
};

export const adminCreateUserSuccess = () => ({
  type: actionTypes.ADMIN_CREATE_USER_SUCCESS,
});

export const adminCreateUserFailed = () => ({
  type: actionTypes.ADMIN_CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      const requestData = RequestUtils.setBodyFetchAllUsersStart();
      userService
        .listUserPaging(requestData)
        .then((response) => {
          let users = response.data.data.records;
          dispatch(fetchAllUsersSuccess(users));
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
    } catch (e) {
      alert(JSON.stringify(e));
      dispatch(fetchAllUsersFailed());
    }
  };
};

export const fetchAllUsersSuccess = (users) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: users,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteUserRedux = (userId) => {
  return async (dispatch, getState) => {
    try {
      userService
        .deleteUser(userId)
        .then((response) => {
          toast.success(
            <FormattedMessage id="system.user-manage.del-user-success" />
          );

          dispatch(fetchAllUsersStart());
          // dispatch(deleteUserSucess());
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          toast.success(
            <FormattedMessage id="system.user-manage.del-user-fail" />
          );
        });
    } catch (e) {
      toast.success(<FormattedMessage id="system.user-manage.del-user-fail" />);
      alert(JSON.stringify(e));
    }
  };
};

export const adminUpdateUser = (data) => {
  return async (dispatch, getState) => {
    try {
      await userService
        .updateUser(data)
        .then((response) => {
          toast.success(
            <FormattedMessage id="system.user-manage.edit-user-success" />
          );
          dispatch(fetchAllUsersStart());
        })
        .catch((error) => {
          toast.error(
            <FormattedMessage id="system.user-manage.edit-user-fail" />
          );
          console.log(error);
        });
    } catch (e) {
      toast.error(<FormattedMessage id="system.user-manage.edit-user-fail" />);
      console.log(e);
    }
  };
};

export const fetchTopDoctors = () => {
  return async (dispatch, getState) => {
    try {
      const requestData = RequestUtils.setBodyFetchTopDoctors();
      healthCareService
        .listUserPaging(requestData)
        .then((response) => {
          let users = response.data.data.records;
          dispatch(fetchTopDoctorsSuccess(users));
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          dispatch(fetchTopDoctorsFailed());
        });
    } catch (e) {
      toast.error(<FormattedMessage id="system.user-manage.edit-user-fail" />);
      console.log(e);
      dispatch(fetchTopDoctorsFailed());
    }
  };
};

export const fetchTopDoctorsSuccess = (users) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  dataDoctors: users,
});

export const fetchTopDoctorsFailed = (users) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
});

export const saveDoctorInfoAction = (data) => {
  return async (dispatch, getState) => {
    try {
      await adminService
        .saveDoctorInfo(data)
        .then((response) => {
          if (data.id) {
            toast.success(<FormattedMessage id="common.update-success" />);
          } else {
            toast.success(<FormattedMessage id="common.save-success" />);
          }
        })
        .catch((error) => {
          toast.error(<FormattedMessage id="common.invalid-request" />);
          console.log(error);
        });
    } catch (e) {
      toast.error(<FormattedMessage id="common.internal-server-error" />);
      console.log(e);
    }
  };
};

export const doctorDetailSuccess = (doctorDetail) => ({
  type: actionTypes.DOCTOR_DETAIL_SUCCESS,
  doctorDetail,
});

export const doctorDetailFailed = () => ({
  type: actionTypes.DOCTOR_DETAIL_FAILED,
});

export const detailDoctorAction = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      healthCareService
        .getDetailDoctor(doctorId)
        .then((response) => {
          let doctorDetail = response.data.data;
          dispatch(doctorDetailSuccess(doctorDetail));
        })
        .catch((error) => {
          dispatch(adminCreateUserFailed());
          console.error(error);
        });
    } catch (e) {
      dispatch(adminCreateUserFailed());
      console.error(e);
    }
  };
};

export const getDoctorMarkdownSuccess = (doctorMarkdown) => ({
  type: actionTypes.DOCTOR_MARKDOWN_SUCCESS,
  doctorMarkdown,
});

export const getDoctorMarkdownFailed = () => ({
  type: actionTypes.DOCTOR_MARKDOWN_FAILED,
});

export const getAllRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      let types = [
        ALL_CODE_TYPE.PRICE,
        ALL_CODE_TYPE.PROVINCE,
        ALL_CODE_TYPE.PAYMENT,
      ];

      const requestData = RequestUtils.setBodyFetchAllCode(types);
      healthCareService
        .getAllcodeByList(requestData)
        .then((response) => {
          let dataResponse = response.data.data;
          let allRequiredData = {
            resPrice: dataResponse.filter(
              (item) => item.type === ALL_CODE_TYPE.PRICE
            ),
            resPayment: dataResponse.filter(
              (item) => item.type === ALL_CODE_TYPE.PAYMENT
            ),
            resProvince: dataResponse.filter(
              (item) => item.type === ALL_CODE_TYPE.PROVINCE
            ),
          };

          dispatch({
            type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
            data: allRequiredData,
          });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          dispatch({
            type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
          });
        });
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
      });
    }
  };
};

export const getMarkdownByDoctorAction = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      adminService
        .getMarkdownByDoctor(doctorId)
        .then((response) => {
          let doctorMarkdown = response.data.data;
          dispatch(getDoctorMarkdownSuccess(doctorMarkdown));
        })
        .catch((error) => {
          dispatch(getDoctorMarkdownFailed());
          console.error(error);
        });
    } catch (e) {
      dispatch(adminCreateUserFailed());
      console.error(e);
    }
  };
};

export const getDoctorInfoAction = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      adminService
        .getMarkdownByDoctor(doctorId)
        .then((response) => {
          let doctorMarkdown = response.data.data;
          dispatch(getDoctorMarkdownSuccess(doctorMarkdown));
        })
        .catch((error) => {
          dispatch(getDoctorMarkdownFailed());
          console.error(error);
        });
    } catch (e) {
      dispatch(adminCreateUserFailed());
      console.error(e);
    }
  };
};

export const fetchAllCodeTime = () => {
  return async (dispatch, getState) => {
    try {
      let types = [ALL_CODE_TYPE.TIME];
      const requestData = RequestUtils.setBodyFetchAllCode(types);
      healthCareService
        .getAllcodeByList(requestData)
        .then((response) => {
          let data = response.data.data;
          dispatch({
            type: actionTypes.FETCH_ALLCODE_TIME_SUCCESS,
            dataTime: data,
          });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          dispatch({
            type: actionTypes.FETCH_ALLCODE_TIME_FAILED,
          });
        });
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_TIME_FAILED,
      });
    }
  };
};

export const saveScheduleAction = (data) => {
  return async (dispatch, getState) => {
    try {
      const requestData = RequestUtils.setBodySaveSchedule(data);
      await adminService
        .saveScheduleTime(requestData)
        .then((response) => {
          toast.success(
            <FormattedMessage id="manage-schedule.save-schedule-success" />
          );
        })
        .catch((error) => {
          toast.error(
            <FormattedMessage id="manage-schedule.save-schedule-fail" />
          );
          console.log(error);
        });
    } catch (e) {
      toast.error(<FormattedMessage id="common.internal-server-error" />);
      console.log(e);
    }
  };
};

export const fetchScheduleTimeByDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      const requestData = RequestUtils.setBodyFetchScheduleTimeByDoctor(data);
      await healthCareService
        .getScheduleTimeByDoctor(requestData)
        .then((response) => {
          let data = response.data.data;
          dispatch({
            type: actionTypes.FETCH_SCHEDULE_TIME_DOCTOR_SUCCESS,
            scheduleTimeDoctor: data,
          });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          dispatch({
            type: actionTypes.FETCH_SCHEDULE_TIME_DOCTOR_FAILED,
          });
        });
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_SCHEDULE_TIME_DOCTOR_FAILED,
      });
    }
  };
};

export const clearScheduleRangeTime = () => ({
  type: actionTypes.CLEAR_SCHEDULE_TIME_DOCTOR,
});

export const fetchGenders = () => {
  return async (dispatch, getState) => {
    try {
      const requestData = RequestUtils.setBodyGetGenders();
      healthCareService
        .getAllcodeByList(requestData)
        .then((response) => {
          let resGenders = response.data.data;
          dispatch({
            type: actionTypes.FETCH_ALLCODE_GENDER_SUCCESS,
            payload: resGenders,
          });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          dispatch({
            type: actionTypes.FETCH_ALLCODE_GENDER_FAILED,
          });
        });
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_GENDER_FAILED,
      });
    }
  };
};

export const clearBookingInfo = (isData) => ({
  type: actionTypes.CLEAR_BOOKING_INFO,
  actionSuccess: isData,
});

export const saveBookingInfo = (data) => {
  return async (dispatch, getState) => {
    try {
      const requestData = RequestUtils.setBodySaveBookingInfo(data);
      console.log("saveBookingInfoAction:", requestData);
      await healthCareService
        .saveBookingInfo(requestData)
        .then((response) => {
          toast.success(<FormattedMessage id="common.save-success" />);
          dispatch(clearBookingInfo(true));
        })
        .catch((error) => {
          toast.error(<FormattedMessage id="common.invalid-request" />);
          console.log(error);
        });
    } catch (e) {
      toast.error(<FormattedMessage id="common.internal-server-error" />);
      console.log(e);
    }
  };
};
