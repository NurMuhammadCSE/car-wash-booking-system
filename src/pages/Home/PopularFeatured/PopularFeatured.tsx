import React from "react";

const services = [
  {
    id: 1,
    name: "Exterior Wash",
    description: "Get a spotless shine with our exterior-only wash.",
    image: "/images/exterior-wash.jpg", // Add appropriate image URLs
    price: "$15",
  },
  {
    id: 2,
    name: "Interior Cleaning",
    description:
      "Deep cleaning of your car’s interior, leaving it fresh and clean.",
    image: "/images/interior-cleaning.jpg",
    price: "$25",
  },
  {
    id: 3,
    name: "Full Detailing",
    description: "Complete detailing inside and out for a pristine car.",
    image: "/images/full-detailing.jpg",
    price: "$50",
  },
  {
    id: 4,
    name: "Premium Wash",
    description: "Luxury wash with premium wax and finishing touches.",
    image: "/images/premium-wash.jpg",
    price: "$40",
  },
];

const PopularFeatured: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-indigo-600 mb-6">
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
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularFeatured;
