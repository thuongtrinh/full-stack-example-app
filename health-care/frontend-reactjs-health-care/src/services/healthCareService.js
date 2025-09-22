import RequestUtils from "../utils/RequestUtils";
import axiosClient from "./axiosClient";

const listUserPaging = async (body) => {
  return await axiosClient.post(`/api/v1/heath-care/list-user`, body);
};

const getAllcodeByList = async (body) => {
  return await axiosClient.post(`/api/v1/heath-care/all-code`, body);
};

const getDetailDoctor = async (doctorId) => {
  return await axiosClient.post(`/api/v1/heath-care/doctor-info/${doctorId}`);
};

const getScheduleTimeByDoctor = async (body) => {
  return await axiosClient.post(`/api/v1/heath-care/schedule-time/get`, body);
};

const getDoctorExtra = async (doctorId) => {
  return await axiosClient.get(`/api/v1/heath-care/doctor-extra/${doctorId}`);
};

const getDoctorProfile = async (doctorId) => {
  return await axiosClient.get(`/api/v1/heath-care/doctor-profile/${doctorId}`);
};

const saveBookingInfo = async (body) => {
  return await axiosClient.post(
    `/api/v1/heath-care/patient-booking-appointment`,
    body
  );
};

const confirmTokenBooking = async (body) => {
  return await axiosClient.post(
    `/api/v1/heath-care/confirm-token-booking`,
    body
  );
};

const healthCareService = {
  listUserPaging,
  getAllcodeByList,
  getDetailDoctor,
  getScheduleTimeByDoctor,
  getDoctorExtra,
  getDoctorProfile,
  saveBookingInfo,
  confirmTokenBooking,
};

export default healthCareService;
