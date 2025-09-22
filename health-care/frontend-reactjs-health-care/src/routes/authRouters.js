import { lazy } from "react";
import { path } from "../utils/index.js";

const routers = [
  {
    path: path.HOME,
    component: lazy(() => import("../containers/Auth/Home.js")),
  },
  {
    path: path.SYSTEM,
    component: lazy(() => import("../containers/System/System.js")),
  },
  {
    path: path.SYSTEM_USER_MANAGE,
    component: lazy(() =>
      import("../containers/System/Admin/UserManage/UserManage.js")
    ),
  },
  {
    path: path.SYSTEM_USER_REDUX,
    component: lazy(() =>
      import("../containers/System/Admin/UserRedux/UserRedux.js")
    ),
  },
  {
    path: path.MANAGE_DOCTOR,
    component: lazy(() =>
      import("../containers/System/Admin/ManageDoctor/ManageDoctor.js")
    ),
  },
  {
    path: path.DOCTOR_MANAGE_SCHEDULE,
    component: lazy(() =>
      import("../containers/System/Admin/ManageSchedule/ManageSchedule.js")
    ),
  },
];

export default routers;
