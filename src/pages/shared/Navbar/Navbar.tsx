import { Moon, Sun } from "lucide-react"; // Import the Sun icon as well
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/userSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode); // Toggle dark mode class on <html>
  };

  const dispatch = useAppDispatch();

  // Get the user's authentication state
  const { token } = useAppSelector((state) => state.user);

  // Dummy user avatar; replace with actual data from user profile if available
  const userAvatar = "https://avatar.iran.liara.run/public";

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  return (
    <header
      className={`bg-[#30415A] text-white rounded-sm ${isDarkMode ? "dark" : ""}`}
    >
      {/* fixed z-10 bg-opacity-30  */}
      <nav className="container text-white bg-[#30415A]  mx-auto flex items-center justify-between space-x-10 py-4">
        <Link to="/" className="text-white font-bold text-lg">
          Car Wash
        </Link>

        <div className="hidden md:flex items-center space-x-5">
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
                to="/services"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            {!token ? (
              <li>
                <Link
                  className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="relative">
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={handleAvatarClick}
                  style={{ zIndex: 10 }} // Add z-index here
                />
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-1 w-20 bg-white text-black rounded-lg shadow-lg z-20">
                    {" "}
                    {/* Add z-index here */}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm "
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
            <li>
              <button
                aria-label="Toggle Dark Mode"
                onClick={handleDarkModeToggle} // Add dark mode toggle handler
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}{" "}
                {/* Toggle icon based on dark mode state */}
              </button>
            </li>
          </ul>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={handleMenuToggle}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-5 mt-4 transition-all duration-300 ease-in-out">
          <li>
            <Link
              className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
              to="/services"
              onClick={handleMenuToggle}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
              to="/dashboard"
              onClick={handleMenuToggle}
            >
              Dashboard
            </Link>
          </li>
          {!token ? (
            <li className="relative">
              <Link
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
                to="/login"
                onClick={handleMenuToggle}
              >
                Login
              </Link>
            </li>
          ) : (
            <li>
              <img
                src={userAvatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={handleAvatarClick}
              />
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
          <li>
            <button
              aria-label="Toggle Dark Mode"
              onClick={handleDarkModeToggle} // Add dark mode toggle handler
              className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}{" "}
              {/* Toggle icon based on dark mode state */}
            </button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
