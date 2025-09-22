import { lazy } from "react";
import { path } from "../utils";

const routers = [
  {
    path: path.EMPTY,
    component: lazy(() => import("../containers/Auth/Home.js")),
  },
  {
    path: path.LOGIN,
    component: lazy(() => import("../containers/Auth/Login/Login.js")),
  },
  {
    path: path.HOME_PAGE,
    component: lazy(() => import("../containers/HomePage/HomePage.js")),
  },
  {
    path: path.DETAIL_DOCTOR,
    component: lazy(() =>
      import("../containers/HomePage/DetailDoctor/DetailDoctor.js")
    ),
  },
  {
    path: path.VERIFY_BOOKING_APPOINTMENT,
    component: lazy(() =>
      import("../containers/System/Patient/VerifyEmail/VerifyEmail.js")
    ),
  },
];

export default routers;
