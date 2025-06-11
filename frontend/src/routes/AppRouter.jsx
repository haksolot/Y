import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Auth from "../pages/Auth";
// import Login from "../pages/Login/Login";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Route>
        <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
