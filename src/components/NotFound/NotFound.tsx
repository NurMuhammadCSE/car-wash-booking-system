import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#30415A] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          We can't seem to find the page you're looking for.
        </p>

        {/* Illustrative Image */}
        <img
          src="https://via.placeholder.com/400x300?text=Page+Not+Found"
          alt="404 Illustration"
          className="mb-6 w-full max-w-md mx-auto"
        />

        {/* Navigation Links */}
        <div className="flex flex-col items-center">
          <Link
            to="/"
            className="mb-4 bg-[#30415A] text-white py-2 px-6 rounded-lg hover:bg-[#1e2c42] transition-colors duration-300"
          >
            Go to Home
          </Link>
          <Link
            to="/login"
            className="bg-[#1e2c42] text-white py-2 px-6 rounded-lg hover:bg-[#30415A] transition-colors duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
