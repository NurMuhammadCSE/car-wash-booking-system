import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout, setUser } from "@/redux/features/userSlice";
import { setLoginEmail, setLoginPassword } from "@/redux/features/loginSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dispatch = useAppDispatch();

  const { token, user } = useAppSelector((state) => state.user);

  const userAvatar = "https://avatar.iran.liara.run/public";

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setUser(""));
    dispatch(setLoginEmail(""));
    dispatch(setLoginPassword(""));
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-[#30415A] fixed w-full z-10 shadow-sm text-white rounded-sm">
      <nav className="container text-white bg-[#30415A] mx-auto flex items-center justify-between space-x-10 py-4">
        <Link to="/" className="text-white font-bold text-lg">
          Car Wash
        </Link>

        {/* Desktop Menu */}
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
            {user?.role !== "admin" && (
              <li>
                <Link
                  className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
                  to="/booking"
                >
                  Bookings
                </Link>
              </li>
            )}
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
                  className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:text-black transition duration-300"
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
                />
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-1 w-20 bg-white text-black rounded-lg shadow-lg z-20">
                    <li>
                      <Link
                        to="/update-profile"
                        className="block w-full rounded-lg text-left px-4 py-2 text-sm hover:bg-gray-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full rounded-lg hover:bg-gray-200 text-left px-4 py-2 text-sm"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
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
          {user?.role !== "admin" && (
            <li>
              <Link
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
                to="/booking"
                onClick={handleMenuToggle}
              >
                Bookings
              </Link>
            </li>
          )}
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
            <li>
              <Link
                className="rounded-lg backdrop-blur-[2px] p-1 inline-block text-white hover:bg-white hover:text-black transition duration-300"
                to="/login"
                onClick={handleMenuToggle}
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
              />
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                  <li>
                    <Link
                      to="/update-profile"
                      className="block w-full rounded-lg text-left px-4 py-2 text-sm hover:bg-gray-200"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsMenuOpen(false); // Close the menu after clicking
                      }}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false); // Close the menu after logout
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
