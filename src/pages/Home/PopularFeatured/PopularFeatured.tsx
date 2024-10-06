import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    name: "Exterior Wash",
    description: "Get a spotless shine with our exterior-only wash.",
    image:
      "https://images.unsplash.com/photo-1689182358896-2514cd65dfff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Add appropriate image URLs
    price: "$15",
  },
  {
    id: 2,
    name: "Interior Cleaning",
    description:
      "Deep cleaning of your car’s interior, leaving it fresh and clean.",
    image:
      "https://plus.unsplash.com/premium_photo-1664300115952-a2ec14ed32fc?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$25",
  },
  {
    id: 3,
    name: "Full Detailing",
    description: "Complete detailing inside and out for a pristine car.",
    image:
      "https://plus.unsplash.com/premium_photo-1670002392440-0a64552ae431?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$50",
  },
  {
    id: 4,
    name: "Premium Wash",
    description: "Luxury wash with premium wax and finishing touches.",
    image:
      "https://plus.unsplash.com/premium_photo-1664298064912-4caa5049602e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "$40",
  },
];

const PopularFeatured: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-black mb-6">
          Featured Services
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Choose from our most popular car wash services and book your
          appointment today!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-indigo-600 font-semibold text-lg">
                  {service.price}
                </p>
                <Link to={"/services"}>
                  <button className="mt-4 w-full bg-[#30415A] text-white py-2 px-4 rounded-md hover:bg-[#30415A] transition-colors">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularFeatured;
