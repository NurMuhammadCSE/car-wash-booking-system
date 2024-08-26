import ServiceCard from "@/components/ServiceCard/ServiceCard";
import { useGetServicesQuery } from "@/redux/api/servicesApi";
import { setSearch, setSort, setFilter } from "@/redux/features/searchSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

const Services = () => {
  const { search, sort, filter } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  // Fetch services based on search, sort, and filter options
  const { data } = useGetServicesQuery({ searchTerm: search, sort, filter });

  // const { data } = useGetServicesQuery({ 
  //   searchTerm: 'car wash', 
  //   sort: 'price:asc', 
  //   filter: 'price:under500' 
  // });
  
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#30415A]">
          Featured Services
        </h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="mb-4 p-2 rounded-lg border border-gray-300 w-full"
        />

        {/* Sort Dropdown */}
        <select
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          className="mb-4 p-2 rounded-lg border border-gray-300 w-full"
        >
          <option value="">Sort by</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="duration">Duration: Short to Long</option>
          <option value="-duration">Duration: Long to Short</option>
        </select>

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="mb-4 p-2 rounded-lg border border-gray-300 w-full"
        >
          <option value="">Filter by</option>
          <option value="price">Price Under $500</option>
          <option value="duration">Duration Under 60 mins</option>
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
