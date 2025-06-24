import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeSwitch() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 px-3 py-2 rounded bg-transparent text-gray-900 dark:text-gray-100 z-50"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clicPath="url(#clip0_201_4)">
          <path
            d="M15.75 9C15.75 5.27344 12.7266 2.25 9 2.25V15.75C12.7266 15.75 15.75 12.7266 15.75 9ZM0 9C0 6.61305 0.948212 4.32387 2.63604 2.63604C4.32387 0.948212 6.61305 0 9 0C11.3869 0 13.6761 0.948212 15.364 2.63604C17.0518 4.32387 18 6.61305 18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18C6.61305 18 4.32387 17.0518 2.63604 15.364C0.948212 13.6761 0 11.3869 0 9Z"
            fill="#FE6022"
          />
        </g>
        <defs>
          <clipPath id="clip0_201_4">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}
