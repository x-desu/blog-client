import useTheme from "../context/ThemeContext"; // Context for theme management
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const SunMoonToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 p-2 rounded-full  flex items-center justify-center shadow-md shadow-amber-400/40 bg-amber-200/80 dark:bg-gray-800 dark:shadow-stone-900/40 transition-all duration-500"
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transform transition-transform duration-500 ${
          theme === "dark" ? "-rotate-[25deg] " : "rotate-180"
        }`}
      >
        {theme === "light" ? (
          <FontAwesomeIcon icon={faSun} className="text-amber-500 text-3xl shadow-lg shadow-yellow-300" />
        ) : (
          <FontAwesomeIcon icon={faMoon} className="text-blue-300 text-3xl" />
        )}
      </div>
    </button>
  );
};

export default SunMoonToggle;