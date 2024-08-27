/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";

const ServiceCard = ({ service }: { service: any }) => {
  return (
    <div>
      <Link
        to={`/services/${service._id}`}
        className="inline-block mt-4 text-white py-2 px-4 rounded-lg ] transition-colors duration-300"
      >
        <div
          key={service._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-48 object-cover"
          />

          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-4 text-[#30415A]">
              {service.name}
            </h3>
            <p className="text-gray-700 mb-4">{service.description}</p>
            <p className="text-lg font-bold text-gray-900">${service.price}</p>
            <p className="text-sm text-gray-500">
              Duration: {service.duration} minutes
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
