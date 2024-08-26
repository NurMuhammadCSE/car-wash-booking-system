/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useGetServiceByIdQuery,
  useGetSlotsByServiceIdQuery,
} from "@/redux/api/servicesApi";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppSelector } from "@/redux/hooks";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

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
  // console.log(slotsData.data)

  // Fetch User Data
  const { token, user } = useAppSelector((state) => state.user);
  // console.log(user.userId)

  const [createBooking] = useCreateBookingMutation();

  // const handleSlotClick = (slotId: string) => {
  //   setSelectedSlot(slotId);
  // };

  // const handleDateChange = (date: Date) => {
  //   setSelectedDate(date);
  //   setSelectedSlot(null);
  // };

  const handleBooking = async () => {
    if (!selectedSlot || !serviceData || !user.userId) {
      console.error("Missing booking information");
      return;
    }
  
    const bookingInfo = {
      serviceId: serviceData.data._id,
      slotId: selectedSlot,
      customer: user.userId,
      token: token, // Pass the token here
    };
  
    try {
      const response = await createBooking(bookingInfo).unwrap();
      console.log("Booking successful:", response);
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
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
        <div className="flex-1  rounded-lg p-4 bg-white">
          <Calendar
            onChange={() => handleDateChange(selectedDate)}
            value={selectedDate}
            className="w-full text-center border-0 shadow-none"
            tileClassName={({ date }) =>
              selectedDate.toDateString() === date.toDateString()
                ? "bg-blue-500 text-white"
                : ""
            }
          />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {slotsData?.data?.map((slot: any) => (
            <button
              key={slot._id}
              onClick={() => setSelectedSlot(slot._id)}
              disabled={slot.isBooked === "booked"}
              className={`p-4 rounded-lg border-2 font-semibold transition-transform transform hover:scale-105 ${
                slot.isBooked === "available"
                  ? "bg-green-500 text-white hover:bg-green-600 hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {slot.startTime} - {slot.endTime}
            </button>
          ))}
        </div>
      </div>

      {/* Book Button */}
      {selectedSlot && (
        <div className="text-center mt-6">
          <button
            onClick={handleBooking}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Book This Service
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
