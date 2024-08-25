
const FeaturedServices = ({ services }) => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#30415A]">
          Featured Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-[#30415A]">
                  {service.name}
                </h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <p className="text-lg font-bold text-gray-900">
                  ${service.price}
                </p>
                <p className="text-sm text-gray-500">
                  Duration: {service.duration} minutes
                </p>
                <a
                  href={`/services/${service._id}`}
                  className="inline-block mt-4 bg-[#30415A] text-white py-2 px-4 rounded-lg hover:bg-[#1e2c42] transition-colors duration-300"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
