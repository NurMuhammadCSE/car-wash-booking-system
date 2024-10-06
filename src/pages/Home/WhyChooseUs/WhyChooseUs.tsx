import React from "react";
import { FaLeaf, FaUsers, FaTachometerAlt, FaShieldAlt } from "react-icons/fa"; // Import icons

const features = [
  {
    id: 1,
    icon: <FaLeaf className="text-green-600 w-12 h-12" />,
    title: "Eco-Friendly Products",
    description:
      "We use eco-friendly cleaning products that are safe for both your car and the environment.",
  },
  {
    id: 2,
    icon: <FaUsers className="text-blue-600 w-12 h-12" />,
    title: "Professional Staff",
    description:
      "Our team is highly trained to provide top-notch service and attention to detail.",
  },
  {
    id: 3,
    icon: <FaTachometerAlt className="text-red-600 w-12 h-12" />,
    title: "Fast Service",
    description:
      "We guarantee a quick and efficient service without compromising quality.",
  },
  {
    id: 4,
    icon: <FaShieldAlt className="text-yellow-600 w-12 h-12" />,
    title: "Secure Payment",
    description:
      "Our booking system offers secure and trusted payment options for your convenience.",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Why Choose Us
        </h2>

        {/* Features Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="mb-4">{feature.icon}</div>

              {/* Feature Title */}
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>

              {/* Feature Description */}
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
