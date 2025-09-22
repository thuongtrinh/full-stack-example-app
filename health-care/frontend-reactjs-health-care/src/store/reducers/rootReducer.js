import { combineReducers } from "redux";
// import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import persistReducer from "redux-persist/es/persistReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import modalReducer from "./modalReducer";
import adminReducer from "./adminReducer";
// import adminReducer from "./adminReducer";

const persistCommonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

// const adminPersistConfig = {
//   ...persistCommonConfig,
//   key: "admin",
//   whitelist: ["isLoggedIn", "adminInfo"],
// };

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo", "accessToken"],
};

// export default (history) => combineReducers({
export default () =>
  combineReducers({
    // router: connectRouter(history),
    // admin: persistReducer(adminPersistConfig, adminReducer),
    admin: adminReducer,
    user: persistReducer(userPersistConfig, userReducer),
    app: appReducer,
    modal: modalReducer,
  });
