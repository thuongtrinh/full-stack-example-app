import { apiRequestDTO } from "../models/apis/apiRequestDTO";
import { pagingRequestDTO } from "../models/apis/pagingRequestDTO";
import { ALL_CODE_TYPE, USER_ROLE } from "./constant";

class RequestUtils {
  static setBodyUpdateUser = (data) => {
    return apiRequestDTO({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        position: data.position,
        role: data.role,
        id: data.id,
      },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });
  };

  static setBodyRegisterUser = (data) => {
    return apiRequestDTO({
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        position: data.position,
        role: data.role,
      },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });
  };

  static setBodyFetchAllUsersStart = () => {
    return pagingRequestDTO({
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
      pageIndex: 0,
      sizePage: 10,
      sort: "",
      orders: [],
      data: {},
    });
  };

  static setBodyFetchTopDoctors = () => {
    return pagingRequestDTO({
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
      pageIndex: 0,
      sizePage: 100,
      sort: "",
      orders: [],
      data: {
        role: USER_ROLE.DOCTOR,
      },
    });
  };

  static setBodySaveMarkdown = (data) => {
    return apiRequestDTO({
      data: {
        id: data.id,
        doctorId: data.doctorId,
        clinicId: data.clinicId,
        specialityId: data.specialityId,
        contentHtml: data.contentHtml,
        contentMarkdown: data.contentMarkdown,
        description: data.description,
      },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });
  };

  static setBodyFetchAllCode = (types) => {
    return apiRequestDTO({
      data: {
        types: types,
      },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });
  };

  static setBodySaveSchedule = (data) => {
    return apiRequestDTO({
      data: {
        doctorId: data.doctorId,
        date: data.date,
        timeKeys: data.timeKeys,
      },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });
  };

  static setBodyFetchScheduleTimeByDoctor = (data) => {
    return apiRequestDTO({
      data: {
        doctorId: data.doctorId,
        date: data.date,
      },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });
  };

  static setBodySaveDoctorInfo = (data) => {
    return apiRequestDTO({
      data: {
        id: data.id,
        doctorId: data.doctorId,
        clinicId: data.clinicId,
        specialityId: data.specialityId,
        contentHtml: data.contentHtml,
        contentMarkdown: data.contentMarkdown,
        description: data.description,
        priceKey: data.priceKey,
        provinceKey: data.provinceKey,
        paymentKey: data.paymentKey,
        addressClinic: data.addressClinic,
        nameClinic: data.nameClinic,
        note: data.note,
      },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });
  };

  static setBodyGetGenders = (data) => {
    return apiRequestDTO({
      data: {
        types: [ALL_CODE_TYPE.GENDER],
      },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });
  };

  static setBodySaveBookingInfo = (data) => {
    return apiRequestDTO({
      data: {
        doctorId: data.doctorId,
        email: data.email,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        date: data.date,
        timeKey: data.timeKey,
        gender: data.gender,
        reason: data.reason,
        birthday: data.birthday,
        language: data.language,
      },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });
  };

  static setBodyConfirmTokenBooking = (data) => {
    return apiRequestDTO({
      data: {
        doctorId: data.doctorId,
        patientId: data.patientId,
        token: data.token,
      },
      exchangeId: "",
      createdBy: "",
      createdDate: new Date(),
    });
  };
}

export default RequestUtils;
