/* eslint-disable @typescript-eslint/no-explicit-any */
import FeaturedServiceCard from "@/components/FeaturedServiceCard/FeaturedServiceCard";
import Loader from "@/pages/shared/Loader/Loader";
import { useGetAllServicesQuery } from "@/redux/api/servicesApi";

const FeaturedServices = () => {
  const { data, isError, isLoading } = useGetAllServicesQuery(undefined);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl dark:text-white font-bold mb-8 text-[#30415A]">
          Our Services
        </h2>

        {isLoading ? (
          <div className="text-2xl text-[#30415A]">
            <Loader></Loader>{" "}
          </div>
        ) : isError ? (
          <div className="text-2xl text-red-500">Something went wrong!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.slice(0, 6).map((service: any) => (
              <FeaturedServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedServices;
