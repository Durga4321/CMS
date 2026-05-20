import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../services/api";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("authToken") || getAuthToken();
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
