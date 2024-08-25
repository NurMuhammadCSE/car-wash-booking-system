import ServiceCard from "@/components/ServiceCard/ServiceCard";
import getAllProducts from "@/data/ServicesData";

const FeaturedServices = () => {
  const services = getAllProducts();
  console.log(services)

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#30415A]">
          Featured Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
