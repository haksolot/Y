import { useState } from "react";
import logo from "../assets/logo.png";
import SignUpModal from "../components/SignUp";
import SignInModal from "../components/SignIn";
const Home = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <div
      id="parent"
      className="h-screen w-screen flex flex-col overflow-hidden md:flex-row"
    >
      <div
        id="logo"
        className="w-full h-1/3 flex justify-center items-center md:w-1/2 md:h-full"
      >
        <img
          className="h-[158px] w-[158px] object-scale-down md:h-[769px] md:w-[769px]"
          src={logo}
          alt="Logo"
        />
      </div>
      <div
        id="formulaire"
        className="w-full h-2/3 flex flex-col items-left gap-20 md:w-1/2 md:h-full"
      >
        <div
          id="titres"
          className="flex flex-col items-left gap-y-8 ml-10 md:mt-48"
        >
          <div className="select-none font-koulen  text-4xl md:text-7xl">
            Happened yesterday
          </div>
          <div className="select-none font-koulen text-2xl md:text-4xl">
            Leave tomorrow.
          </div>
        </div>
        <div id="boutons" className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => setShowSignUpModal(true)}
            className="shadow-[3px_2px_8.3px_3px_rgba(0,0,0,0.25)] transition delay-50 bg-[#FF6600] font-roboto border-2 border-[#FF6600] hover:bg-transparent py-4 px-4 rounded-[4vw] w-80 md:w-96 md:rounded-[0.9vw]"
          >
            Create an account
          </button>
          <SignUpModal
            isOpen={showSignUpModal}
            onClose={() => setShowSignUpModal(false)}
          />
          <div className="relative flex py-5 items-center w-80 md:w-96">
            <div className="flex-grow border-t border-black dark:border-white"></div>
            <span className="select-none flex-shrink mx-2 text-sm">OR</span>
            <div className="flex-grow border-t border-black dark:border-white"></div>
          </div>

          <button
            onClick={() => setShowSignInModal(true)}
            className="shadow-[3px_2px_8.3px_3px_rgba(0,0,0,0.25)] transition delay-50 bg-transparent border-2 border-[#FF6600] font-roboto hover:bg-[#FF6600] py-4 px-4 dark:hover:text-black rounded-[4vw] w-80 md:w-96 md:rounded-[0.9vw]"
          >
            Sign in
          </button>
          <SignInModal
            isOpen={showSignInModal}
            onClose={() => setShowSignInModal(false)}
            onSwitch={() => {
              setShowSignInModal(false);
              setShowSignUpModal(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
