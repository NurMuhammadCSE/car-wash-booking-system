import FeaturedServiceCard from "@/components/FeaturedServiceCard/FeaturedServiceCard";
import getAllProducts from "@/data/ServicesData";
import { useGetServicesQuery } from "@/redux/api/servicesApi";

const FeaturedServices = () => {
  // const services = getAllProducts();
  const { data, isError, isLoading } = useGetServicesQuery(undefined);
  // console.log(data.data);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#30415A]">
          Featured Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.map((service) => (
            <FeaturedServiceCard
              key={service._id}
              service={service}
            ></FeaturedServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
