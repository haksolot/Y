import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import Feed from "../pages/Feed";
import ProtectedRoute from "../components/ProtectedRoutes";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
          </Route>
        </Route>
        <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
