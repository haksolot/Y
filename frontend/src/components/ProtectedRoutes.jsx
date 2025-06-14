import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { apiAuth } from "../utils/axios";
import { useLocation } from "react-router-dom";

function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    apiAuth
      .post("/auth/authenticate", {}, { withCredentials: true })
      .then((res) => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, [location.pathname]); //vérifie entre changement de route

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
