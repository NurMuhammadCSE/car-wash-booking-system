import React from "react";
import { FaCar, FaClock, FaCreditCard, FaCheckCircle } from "react-icons/fa"; // Import icons

const steps = [
  {
    id: 1,
    icon: <FaCar className="text-indigo-600 w-12 h-12" />,
    title: "Select Service",
    description:
      "Browse and choose from a variety of car wash services we offer.",
  },
  {
    id: 2,
    icon: <FaClock className="text-indigo-600 w-12 h-12" />,
    title: "Choose Time Slot",
    description: "Pick a convenient time slot for your car wash appointment.",
  },
  {
    id: 3,
    icon: <FaCreditCard className="text-indigo-600 w-12 h-12" />,
    title: "Confirm Booking & Payment",
    description: "Secure your booking with easy and quick payment options.",
  },
  {
    id: 4,
    icon: <FaCheckCircle className="text-indigo-600 w-12 h-12" />,
    title: "Get Your Car Washed!",
    description:
      "Drive in at your scheduled time, and we’ll take care of the rest!",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-indigo-600 text-center mb-10">
          How It Works
        </h2>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="mb-4">{step.icon}</div>

              {/* Step Title */}
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>

              {/* Step Description */}
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
