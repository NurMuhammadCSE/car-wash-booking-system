import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="mt-3 bg-cover bg-center text-white py-24 px-4 text-center relative"
      style={{
        backgroundImage: "url('https://rb.gy/dmrzfs')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-gray-800/60"></div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to Car Washing Booking System
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
          Simplify your car wash booking experience.
        </p>

        <Link
          aria-label="Book a Service"
          className="bg-yellow-400 text-black font-semibold py-3 px-8 rounded-lg hover:bg-[#30415A] hover:text-white transition duration-300 shadow-lg text-xl md:text-2xl"
          to={"/services"}
        >
          Book a Service
        </Link>
      </div>
    </div>
  );
};

export default Banner;
