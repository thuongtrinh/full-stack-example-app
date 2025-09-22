import { path } from "../../utils";

export const adminMenu = [
  {
    //hệ thống
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: path.SYSTEM_USER_MANAGE,
      },
      {
        name: "menu.admin.crud-redux",
        link: path.SYSTEM_USER_REDUX,
      },
      {
        name: "menu.admin.manage-doctor",
        link: path.MANAGE_DOCTOR,
      },
      {
        name: "menu.doctor.manage-schedule",
        link: path.DOCTOR_MANAGE_SCHEDULE,
      },

      // {
      //   name: "menu.admin.manage-admin",
      //   link: path.SYSTEM_USER_REDUX,
      // },
      // {
      //   name: "menu.system.system-administrator.header",
      //   subMenus: [
      //     {
      //       name: "menu.system.system-administrator.user-manage",
      //       link: path.SYSTEM_USER_MANAGE,
      //     },
      //     {
      //       name: "menu.system.system-administrator.user-redux",
      //       link: path.SYSTEM_USER_REDUX,
      //     },
      //   ],
      // },
    ],
  },
  {
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: path.SYSTEM_USER_MANAGE,
      },
    ],
  },
  {
    name: "menu.admin.speciality",
    menus: [
      {
        name: "menu.admin.manage-speciality",
        link: path.SYSTEM_USER_MANAGE,
      },
    ],
  },
  {
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: path.SYSTEM_USER_MANAGE,
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: path.DOCTOR_MANAGE_SCHEDULE,
      },
    ],
  },
];
