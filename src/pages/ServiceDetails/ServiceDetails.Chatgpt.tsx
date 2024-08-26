/* eslint-disable @typescript-eslint/no-explicit-any */
import getAllProducts from "@/data/ServicesData";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Mock data to simulate fetching a service by ID

const availableSlots = [
  { time: "09:00 AM", isBooked: false },
  { time: "10:00 AM", isBooked: true },
  { time: "11:00 AM", isBooked: false },
  // Add more slots
];

const ServiceDetailsChatGPT = () => {
  const services = getAllProducts();

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [service, setService] = useState<any>(null);

  const { id } = useParams();

  // Fetch service details by ID
  useEffect(() => {
    const fetchedService = services.find((service) => service._id === id);
    setService(fetchedService);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSlotSelection = (slotTime: string) => {
    if (!availableSlots.find((slot) => slot.time === slotTime)?.isBooked) {
      setSelectedSlot(slotTime);
    }
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full lg:w-1/2 rounded-lg shadow-lg mb-8 lg:mb-0"
          />
          <div className="lg:ml-12 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-[#30415A] mb-4">
              {service.name}
            </h2>
            <p className="text-gray-700 mb-4">{service.description}</p>
            <p className="text-lg font-bold text-gray-900 mb-4">
              ${service.price}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Duration: {service.duration} minutes
            </p>

            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-[#30415A] mb-2">
                Select a Time Slot
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlotSelection(slot.time)}
                    disabled={slot.isBooked}
                    className={`py-2 px-4 rounded-lg text-white ${
                      slot.isBooked
                        ? "bg-gray-400 cursor-not-allowed"
                        : selectedSlot === slot.time
                        ? "bg-[#1e2c42]"
                        : "bg-[#30415A] hover:bg-[#1e2c42]"
                    } transition-colors duration-300`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar (Optional) */}
            <div className="mb-4">
              <label htmlFor="service-date" className="text-lg font-semibold">
                Select Date:
              </label>
              <input
                type="date"
                id="service-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="ml-4 p-2 rounded-lg border border-gray-300"
              />
            </div>

            {selectedSlot && (
              <button
                className="mt-4 bg-[#30415A] text-white py-2 px-8 rounded-lg hover:bg-[#1e2c42] transition-colors duration-300"
                onClick={() =>
                  alert(`Service booked for ${selectedSlot} on ${selectedDate}`)
                }
              >
                Book This Service
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsChatGPT;
