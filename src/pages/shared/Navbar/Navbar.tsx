/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Moon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Get the user's authentication state
  const { token, user } = useAppSelector((state) => state.user);
  
  // Dummy user avatar; replace with actual data from user profile if available
  const userAvatar = "https://avatar.iran.liara.run/public";

  return (
    <header className="bg-[#30415A] text-white rounded-sm px-3">
      <nav className="container mx-auto flex items-center justify-between space-x-10 py-4">
        <Link to="/" className="text-white font-bold text-lg">
          Car Washing
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
                to="/booking"
              >
                Booking
              </Link>
            </li>
            {/* Conditionally render login or avatar */}
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
              <li>
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </li>
            )}
            <li>
              <button
                aria-label="Toggle Dark Mode"
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
              >
                <Moon size={24} />
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
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
              to="/booking"
              onClick={handleMenuToggle}
            >
              Booking
            </Link>
          </li>
          {/* Conditionally render login or avatar */}
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
              />
            </li>
          )}
          <li>
            <button
              aria-label="Toggle Dark Mode"
              className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
            >
              <Moon size={24} />
            </button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
