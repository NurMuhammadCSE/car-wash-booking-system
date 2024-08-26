/* eslint-disable @typescript-eslint/no-explicit-any */
const FeaturedServiceCard = ({ service }: { service: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2 text-[#30415A]">
          {service.name}
        </h3>
        <p className="text-gray-700 mb-4">{service.description}</p>
      </div>
    </div>
  );
};

export default FeaturedServiceCard;
