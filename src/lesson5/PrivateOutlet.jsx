import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authContext } from "./AuthProvider";

export default function PrivateOutlet() {
    const { authed } = React.useContext(authContext);
  
    return authed ? <Outlet /> : <Navigate to="/login" />;
  }