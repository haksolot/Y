import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../utils/axios";

function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    api
      .post("/auth/authenticate", {}, { withCredentials: true })
      .then((res) => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
