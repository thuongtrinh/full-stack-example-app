import RequestUtils from "../utils/RequestUtils";
import axiosClient from "./axiosClient";

const saveMarkdown = async (data) => {
  const body = RequestUtils.setBodySaveMarkdown(data);
  return await axiosClient.post(`/api/v1/admin/markdown/save`, body);
};

const getMarkdownByDoctor = async (doctorId) => {
  return await axiosClient.get(`/api/v1/admin/markdown/${doctorId}`);
};

const saveScheduleTime = async (body) => {
  return await axiosClient.post(`/api/v1/admin/schedule-time/save`, body);
};

const saveDoctorInfo = async (data) => {
  const body = RequestUtils.setBodySaveDoctorInfo(data);
  return await axiosClient.post(`/api/v1/admin/doctor-info/save`, body);
};

const adminService = {
  saveMarkdown,
  getMarkdownByDoctor,
  saveScheduleTime,
  saveDoctorInfo,
};

export default adminService;
