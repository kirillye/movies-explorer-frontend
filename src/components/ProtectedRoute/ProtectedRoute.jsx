import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const ProtectedRoute = ({ element, loggedIn }) => {
  const location = useLocation();
  return loggedIn ? (
    element
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
