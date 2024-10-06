
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        {/* Car Body */}
        <div className="w-24 h-12 bg-[#30415A] rounded-t-lg shadow-md relative z-10">
          {/* Car Roof */}
          <div className="w-16 h-8 bg-[#30415A] rounded-b-lg mx-auto mt-[-8px]"></div>
          {/* Windows */}
          <div className="absolute top-2 left-4 w-5 h-4 bg-white rounded-sm"></div>
          <div className="absolute top-2 right-4 w-5 h-4 bg-white rounded-sm"></div>
        </div>

        {/* Wheels */}
        <div className="absolute -bottom-2 left-3">
          <div className="w-8 h-8 rounded-full border-4 border-gray-700 border-t-[#E5E7EB] animate-spin"></div>
        </div>
        <div className="absolute -bottom-2 right-3">
          <div className="w-8 h-8 rounded-full border-4 border-gray-700 border-t-[#E5E7EB] animate-spin"></div>
        </div>
      </div>

      <div className="ml-4 text-xl font-semibold text-[#30415A] animate-pulse">
        Cleaning in progress...
      </div>
    </div>
  );
};

export default LoadingSpinner;
