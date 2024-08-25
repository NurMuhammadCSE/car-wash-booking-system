import { useState } from "react";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import getAllProducts from "@/data/ServicesData";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("priceAsc");
  const [filterPrice, setFilterPrice] = useState<number | null>(null);

  const services = getAllProducts();

  const filteredServices = services
    .filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((service) =>
      filterPrice ? service.price <= filterPrice : true
    )
    .sort((a, b) => {
      if (sortOption === "priceAsc") return a.price - b.price;
      if (sortOption === "priceDesc") return b.price - a.price;
      if (sortOption === "durationAsc") return a.duration - b.duration;
      if (sortOption === "durationDesc") return b.duration - a.duration;
      return 0;
    });

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 rounded-lg border border-gray-300 w-full"
        />

        {/* Filter by Price */}
        <div className="mb-4">
          <label htmlFor="filter-price" className="mr-2">
            Filter by Price:
          </label>
          <select
            id="filter-price"
            value={filterPrice || ""}
            onChange={(e) =>
              setFilterPrice(e.target.value ? parseFloat(e.target.value) : null)
            }
            className="p-2 rounded-lg border border-gray-300"
          >
            <option value="">No Filter</option>
            <option value="50">Under $50</option>
            <option value="100">Under $100</option>
            <option value="200">Under $200</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="mb-8">
          <label htmlFor="sort-option" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort-option"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded-lg border border-gray-300"
          >
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="durationAsc">Duration: Short to Long</option>
            <option value="durationDesc">Duration: Long to Short</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
