import logo from "../assets/logo.png";
import closeButton from "../assets/close-button.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const SignInModal = ({ isOpen, onClose, onSwitch }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //erreur
  const [errorPseudo, setErrorPseudo] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [globalError, setGlobalError] = useState("");

  const signIn = async () => {
    setErrorPseudo("");
    setErrorPassword("");
    setGlobalError("");

    let valid = true;

    if (!pseudo.trim()) {
      setErrorPseudo("Your pseudo is required");
      valid = false;
    }

    if (!password.trim()) {
      setErrorPassword("Your password is required");
      valid = false;
    }

    if (!valid) return;

    try {
      const data = await loginUser(pseudo, password);

      onClose();
      navigate("/");
    } catch (err) {
      setGlobalError("Your pseudo or password is incorrect");
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
              Sign in to Y.
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
                  placeholder="Type your pseudo here..."
                  required
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  className={`font-roboto text-sm pl-11 block w-full rounded-[8vw] border-2 ${
                    errorPseudo ? "border-red-500" : "border-[#FF6600]"
                  } bg-transparent py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errorPseudo ? "focus:ring-red-500" : "focus:ring-[#FF6600]"
                  } md:rounded-[0.9vw] md:py-4`}
                />
                {errorPseudo && (
                  <p className="text-red-500 text-sm mt-1">{errorPseudo}</p>
                )}
              </div>
              <div className="relative w-70 mt-6">
                <label className="font-koulen absolute -top-3 left-9 px-3 bg-[#1F1F1F] text-xl text-white md:text-2xl">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Type your password here..."
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`font-roboto text-sm block w-full rounded-[8vw] border-2 ${
                    errorPassword ? "border-red-500" : "border-[#FF6600]"
                  } bg-transparent py-3 px-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errorPassword
                      ? "focus:ring-red-500"
                      : "focus:ring-[#FF6600]"
                  } md:rounded-[0.9vw] md:py-4`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF6600] text-xl select-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  🦐
                </button>
                {errorPassword && (
                  <p className="text-red-500 text-sm mt-1">{errorPassword}</p>
                )}
              </div>
              {globalError && (
                <p className="text-red-500 text-sm mt-4 text-center">
                  {globalError}
                </p>
              )}
            </div>
            <button
              onClick={signIn}
              type="submit"
              className="text-sm font-roboto mx-auto shadow-[3px_2px_8.3px_3px_rgba(0,0,0,0.25)] transition delay-50 bg-[#FF6600] font-roboto border-2 border-[#FF6600] hover:bg-transparent text-white py-2 px-4 rounded-[8vw] w-28 md:py-4 md:rounded-[0.9vw] md:w-80"
            >
              Sign In
            </button>
            <p className="text-sm font-roboto mx-auto text-gray-400">
              Don't have an account? Click{" "}
              <span
                onClick={onSwitch}
                className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
              >
                here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
