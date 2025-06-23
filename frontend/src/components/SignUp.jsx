import logo from "../assets/logo.png";
import React, { useState } from "react";
import { registerUser, validateEmail } from "../services/authService";

const SignUpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //erreur
  const [errorPseudo, setErrorPseudo] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [globalError, setGlobalError] = useState("");

  const create = async () => {
    setErrorPseudo("");
    setErrorEmail("");
    setErrorPassword("");

    let valid = true;

    if (!pseudo.trim()) {
      setErrorPseudo("A pseudo is required");
      valid = false;
    }

    if (!validateEmail(email)) {
      setErrorEmail("Your email is not valid");
      valid = false;
    }

    if (password.length < 6) {
      setErrorPassword("Your password is too short (6 caracters minimum)");
      valid = false;
    }

    if (!valid) return;

    try {
      const data = await registerUser(pseudo, email, password);
      onClose();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        const errorMsg = err.response.data.msg;
        if (errorMsg === "User already exists") {
          setErrorEmail("This email is already taken.");
        } else if (errorMsg === "Pseudo already exists") {
          setErrorPseudo("This pseudo is already taken.");
        } else {
          setGlobalError(errorMsg);
        }
      } else {
        setGlobalError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6)] fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fadeIn delay-50 relative bg-white dark:bg-[#1F1F1F] rounded-[6vw] p-6 w-10/12 min-h-[30vh] shadow-lg md:rounded-[1vw] md:w-[600px] md:h-[600px]"
      >
        <button
          onClick={onClose}
          className="absolute -top-8 -right-12 w-[60px] h-[60px] bg-transparent border-none cursor-pointer z-10 md:-right-9 md:w-[90px] md:h-[90px]"
          type="button"
        >
          <svg
            className="w-7 h-7 aspect-square"
            viewBox="0 0 74 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="37"
              cy="37"
              r="34"
              fill="#1F1F1F"
              stroke="#FF6600"
              stroke-width="6"
            />
            <path
              d="M52.0529 26.4649C53.3024 25.2155 53.3024 23.1865 52.0529 21.9371C50.8035 20.6876 48.7745 20.6876 47.5251 21.9371L37 32.4721L26.4649 21.9471C25.2155 20.6976 23.1865 20.6976 21.9371 21.9471C20.6876 23.1965 20.6876 25.2255 21.9371 26.4749L32.4721 37L21.9471 47.5351C20.6976 48.7845 20.6976 50.8135 21.9471 52.0629C23.1965 53.3124 25.2255 53.3124 26.4749 52.0629L37 41.5279L47.5351 52.0529C48.7845 53.3024 50.8135 53.3024 52.0629 52.0529C53.3124 50.8035 53.3124 48.7745 52.0629 47.5251L41.5279 37L52.0529 26.4649Z"
              fill="#FF6600"
            />
          </svg>
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
            <h1 className="font-koulen text-xl md:text-4xl">
              Create your account.
            </h1>
          </div>
          <div className="relative flex flex-col gap-6 md:gap-10">
            <div>
              <div className="relative w-70 mt-6">
                <label className="font-koulen absolute -top-3 left-9 px-3 bg-white dark:bg-[#1F1F1F] text-xl md:text-2xl">
                  Pseudo
                </label>
                <input
                  type="text"
                  id="pseudo"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  placeholder="Type your pseudo here..."
                  required
                  className={`font-roboto text-sm pl-11 block w-full rounded-[8vw] border-2 ${
                    errorPseudo ? "border-red-500" : "border-[#FF6600]"
                  } bg-transparent py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errorPseudo ? "focus:ring-red-500" : "focus:ring-[#FF6600]"
                  } md:rounded-[0.9vw] md:py-4`}
                />
                {errorPseudo && (
                  <p className="text-red-500 text-sm mt-1">{errorPseudo}</p>
                )}
              </div>
              <div className="relative w-70 mt-6">
                <label className="font-koulen absolute -top-3 left-9 px-3 bg-white dark:bg-[#1F1F1F] text-xl md:text-2xl">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email here..."
                  required
                  className={`font-roboto text-sm pl-11 block w-full rounded-[8vw] border-2 ${
                    errorEmail ? "border-red-500" : "border-[#FF6600]"
                  } bg-transparent py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errorEmail ? "focus:ring-red-500" : "focus:ring-[#FF6600]"
                  } md:rounded-[0.9vw] md:py-4`}
                />
                {errorEmail && (
                  <p className="text-red-500 text-sm mt-1">{errorEmail}</p>
                )}
              </div>
              <div className="relative w-70 mt-6">
                <label className="font-koulen absolute -top-3 left-9 px-3 bg-white dark:bg-[#1F1F1F] text-xl md:text-2xl">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your password here..."
                  required
                  className={`font-roboto text-sm pl-11 block w-full rounded-[8vw] border-2 ${
                    errorPassword ? "border-red-500" : "border-[#FF6600]"
                  } bg-transparent py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errorPassword
                      ? "focus:ring-red-500"
                      : "focus:ring-[#FF6600]"
                  } md:rounded-[0.9vw] md:py-4`}
                />
                {errorPassword && (
                  <p className="text-red-500 text-sm mt-1">{errorPassword}</p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6600] text-xl select-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  🦐
                </button>
              </div>
            </div>

            {globalError && (
              <p className="text-red-500 text-sm text-center mb-2">
                {globalError}
              </p>
            )}
            <button
              type="submit"
              onClick={create}
              className="text-sm mx-auto shadow-[3px_2px_8.3px_3px_rgba(0,0,0,0.25)] transition delay-50 bg-[#FF6600] font-roboto border-2 border-[#FF6600] hover:bg-transparent py-2 px-4 rounded-[8vw] w-28 md:py-4 md:rounded-[0.9vw] md:w-80"
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
