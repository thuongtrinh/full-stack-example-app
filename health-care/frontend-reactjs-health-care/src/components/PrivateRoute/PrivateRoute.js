import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
