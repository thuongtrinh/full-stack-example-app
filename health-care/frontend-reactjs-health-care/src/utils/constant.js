export const path = {
  EMPTY: "",
  HOME: "/",
  LOGIN: "/login",
  LOG_OUT: "/logout",
  SYSTEM: "/system",
  PREFIX_PAGE_USERS: "/health-care/",

  // admin
  SYSTEM_USER_MANAGE: "/system/user-manage",
  SYSTEM_USER_REDUX: "/system/user-redux",
  MANAGE_DOCTOR: "/system/manage-doctor",

  // doctor
  DOCTOR_MANAGE_SCHEDULE: "/doctor/manage-schedule",

  // no authenticate
  HOME_PAGE: "/health-care/home",
  DETAIL_DOCTOR: "/health-care/detail-doctor/:id",
  VERIFY_BOOKING_APPOINTMENT: "health-care/verify-booking-appointment",
};

export const languages = {
  VI: "vi",
  EN: "en",
};

export const manageActions = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

export const dateFormat = {
  SEND_TO_SERVER: "DD/MM/YYYY",
};

export const YesNoObj = {
  YES: "Y",
  NO: "N",
};

export const ALL_CODE_TYPE = {
  ROLE: "ROLE",
  STATUS: "STATUS",
  TIME: "TIME",
  POSITION: "POSITION",
  GENDER: "GENDER",
  PRICE: "PRICE",
  PAYMENT: "PAYMENT",
  PROVINCE: "PROVINCE",
};

export const CODE_COMMON = {
  DOCTOR: "DOCTOR",
};

export const USER_ROLE = {
  ADMIN: "R1",
  DOCTOR: "R2",
  PATIENT: "R3",
};

export const CRUD_ACTIONS = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
};

export const COOKIES = {
  TOKEN: "token",
  REFRESH_TOKEN: "refreshToken",
  USER_ROLE: "userId",
};
