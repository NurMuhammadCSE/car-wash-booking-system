/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetServiceByIdQuery,
  useGetSlotsByServiceIdQuery,
} from "@/redux/api/servicesApi";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { deselectSlot, selectSlot } from "@/redux/features/slotSlice";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate] = useState(new Date());
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useAppDispatch();
  const selectedSlots = useAppSelector((state) => state.slot.selectedSlots);

  // Fetch service details
  const {
    data: serviceData,
    isLoading: isServiceLoading,
    isError: isServiceError,
  } = useGetServiceByIdQuery(id!);

  // Fetch slots for the selected service on the selected date
  const {
    data: slotsData,
    isLoading: isSlotsLoading,
    isError: isSlotsError,
  } = useGetSlotsByServiceIdQuery(serviceData?.data?._id);

  // Fetch User Data
  const { user } = useAppSelector((state) => state.user);

  const handleSlotClick = (slotId: string) => {
    if (selectedSlots.includes(slotId)) {
      dispatch(deselectSlot(slotId));
    } else {
      dispatch(selectSlot(slotId));
    }
  };

  const handleBooking = async () => {
    if (selectedSlots.length === 0 || !serviceData || !user.userId) {
      console.error("Missing booking information");
      return;
    }

    setIsBooking(true); // Disable the button immediately on click
    navigate(`/booking/${serviceData.data._id}/${selectedSlots[0]}`); // Redirect to Booking page
  };

  if (isServiceLoading || isSlotsLoading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  if (isServiceError || isSlotsError) {
    return (
      <div className="text-center text-lg text-red-500">
        Error loading service details or slots
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Banner Image */}
      <div className="relative h-64 md:h-96 mb-8 overflow-hidden rounded-lg">
        <img
          src={serviceData?.data?.image}
          alt={serviceData?.data?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
            {serviceData?.data?.name}
          </h1>
        </div>
      </div>

      {/* Service Description */}
      <p className="text-lg mb-6 text-gray-700">
        {serviceData?.data?.description}
      </p>

      {/* Available Slots Section */}
      <h2 className="text-2xl font-semibold mb-4">
        Available Slots on {selectedDate.toDateString()}
      </h2>

      {/* Calendar and Slots Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 rounded-lg p-4 bg-white">
          <Calendar
            value={selectedDate}
            className="w-full text-center border-0 shadow-none"
            tileClassName={({ date }) =>
              selectedDate.toDateString() === date.toDateString()
                ? "bg-[#30415A] text-white"
                : ""
            }
          />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {slotsData?.data?.map((slot: any) => (
            <button
              key={slot._id}
              onClick={() => handleSlotClick(slot._id)}
              disabled={
                slot.isBooked === "booked" ||
                isBooking ||
                slot.isBooked === "cancelled"
              }
              className={`p-4 rounded-lg py-2 px-8 border-2 font-semibold transition-transform transform hover:scale-105 ${
                selectedSlots.includes(slot._id)
                  ? " bg-green-500 text-white"
                  : slot.isBooked === "available"
                  ? " text-white bg-[#30415A] hover:bg-[#1e2c42] transition-colors duration-300"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {slot.startTime} - {slot.endTime}
            </button>
          ))}
        </div>
      </div>

      {/* Book Button */}
      {selectedSlots.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleBooking}
            className={`bg-[#30415A] text-white py-2 px-6 rounded-lg hover:bg-[#1e2c42] transition-colors duration-300${
              isBooking ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isBooking}
          >
            Book This Service
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
