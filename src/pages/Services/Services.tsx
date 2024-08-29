/* eslint-disable @typescript-eslint/no-explicit-any */
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import { useGetServicesQuery } from "@/redux/api/servicesApi";
import { setSearch, setSort, setFilter } from "@/redux/features/searchSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Helmet } from "react-helmet-async";

const Services = () => {
  const { search, sort, filter } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  // Fetch services based on search, sort, and filter options
  const { data } = useGetServicesQuery({ searchTerm: search, sort, filter });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (!value) {
      // Reset filter if no value is selected
      dispatch(setFilter({ price: "", duration: "" }));
      return;
    }

    // Update the filter based on the value selected
    const filterType = value === "5000" ? "price" : "duration";
    const filterValue = value;

    dispatch(setFilter({ [filterType]: filterValue }));
  };

  return (
    <section className="py-12 bg-gradient-to-b">
      <Helmet>
        <title>All Service - Car Washing</title>
      </Helmet>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#30415A] drop-shadow-lg">
          Our Services
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="p-3 rounded-lg border dark:text-black border-gray-300 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="p-3 rounded-lg border dark:text-black border-gray-300 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">Sort by</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="duration">Duration: Short to Long</option>
            <option value="-duration">Duration: Long to Short</option>
          </select>

          {/* Filter Dropdown */}
          <select
            onChange={handleFilterChange}
            className="p-3 rounded-lg border dark:text-black border-gray-300 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">Filter by</option>
            <option value="5000">Price: 5000</option>
            {/* <option value="price:1500">Price: 10000</option> */}
            <option value="30">Duration: 30 minutes</option>
            {/* <option value="duration:60">Duration: 60 minutes</option> */}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.map((service: any) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
