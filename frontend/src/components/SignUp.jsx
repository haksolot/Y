import logo from "../assets/logo.png";
import closeButton from "../assets/close-button.png";
import React, { useState } from "react";
import api from "../utils/axios";

const SignUpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const create = async () => {
    try {
      const res = await api.post("/auth/register", {
        pseudo,
        email,
        password,
        role: "Visitor",
      });
      onClose();
      console.log("Réponse:", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6)] fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fadeIn delay-50 relative bg-[#1F1F1F] rounded-[6vw] p-6 w-10/12 min-h-[30vh] shadow-lg md:rounded-[1vw] md:w-[600px] md:h-[600px]"
      >
        <button
          onClick={onClose}
          className="absolute -top-6 -right-7 w-[60px] h-[60px] bg-transparent border-none cursor-pointer z-10 md:-right-9 md:w-[90px] md:h-[90px]"
          type="button"
        >
          <img
            className="h-full w-full object-scale-down pointer-events-auto"
            src={closeButton}
            alt="Close button"
          />
        </button>

        <div className="relative flex flex-col gap-4">
          <div
            id="logo"
            className="w-full h-1/3 flex justify-center items-center"
          >
            <img
              className="h-[60px] w-[60px] object-scale-down md:h-[100px] md:w-[100px]"
              src={logo}
              alt="Logo"
            />
          </div>
          <div className="modal-body w-full h-2/3 flex flex-col">
            <h1 className="font-koulen text-white text-xl md:text-4xl">
              Create your account.
            </h1>
          </div>
          <div className="relative flex flex-col gap-6 md:gap-10">
            <div>
              <div className="relative w-70 mt-6">
                <label className="font-koulen absolute -top-3 left-9 px-3 bg-[#1F1F1F] text-xl text-white md:text-2xl">
                  Pseudo
                </label>
                <input
                  type="text"
                  id="pseudo"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  placeholder="Type your pseudo here..."
                  required
                  className="font-roboto text-sm pl-11 block w-full rounded-[8vw] border-2 border-[#FF6600] bg-transparent py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6600] md:rounded-[0.9vw] md:py-4"
                />
              </div>
              <div className="relative w-70 mt-6">
                <label className="font-koulen absolute -top-3 left-9 px-3 bg-[#1F1F1F] text-xl text-white md:text-2xl">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email here..."
                  required
                  className="font-roboto text-sm pl-11 block w-full rounded-[8vw] border-2 border-[#FF6600] bg-transparent py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6600] md:rounded-[0.9vw] md:py-4"
                />
              </div>
              <div className="relative w-70 mt-6">
                <label className="font-koulen absolute -top-3 left-9 px-3 bg-[#1F1F1F] text-xl text-white md:text-2xl">
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your password here..."
                  required
                  className="font-roboto text-sm pl-11 block w-full rounded-[8vw] border-2 border-[#FF6600] bg-transparent py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6600] md:rounded-[0.9vw] md:py-4"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={create}
              className="text-sm font-roboto mx-auto shadow-[3px_2px_8.3px_3px_rgba(0,0,0,0.25)] transition delay-50 bg-[#FF6600] font-roboto border-2 border-[#FF6600] hover:bg-transparent text-white py-2 px-4 rounded-[8vw] w-28 md:py-4 md:rounded-[0.9vw] md:w-80"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
