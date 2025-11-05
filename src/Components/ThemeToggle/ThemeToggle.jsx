import React, { use } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <button onClick={toggleTheme} className="cursor-pointer">
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
