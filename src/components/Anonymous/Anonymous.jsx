import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Anonymous = ({ loggedIn }) => {
  return loggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default Anonymous;
