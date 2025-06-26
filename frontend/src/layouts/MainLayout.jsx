import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import logo from "../assets/logo.png";
import ShrimpModal from "../components/ShrimpModal.jsx";

function MainLayout() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center fixed top-0 w-full h-16 backdrop-blur-md z-10">
        <img
          src={logo}
          alt="Shrimp"
          className="w-12 h-12 object-cover cursor-pointer"
          onClick={() => setModalOpen(true)}
        />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen scrollbar">
        <Outlet />
      </div>

      <div
        id="hidder"
        className="fixed bottom-0 w-full h-52 bg-gradient-to-t from-white to-transparent dark:from-[#1F1F1F] pointer-events-none z-10"
      />

      <Navbar className="fixed bottom-5 w-full px-4 z-20" />

      <ShrimpModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default MainLayout;
