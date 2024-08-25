import Services from "@/pages/Home/Services/Services";

// Example services data
const services = [
    {
      _id: "66b9c15d0fb598abe54bc456",
      name: "Car Wash",
      description: "Professional car Full-Service",
      duration: 60,
      price: 700,
      imageUrl: "https://rb.gy/dmrzfs",
    },
    {
      _id: "66b9c15d0fb598abe54bc457",
      name: "Interior Cleaning",
      description: "Thorough cleaning of the car's interior",
      duration: 45,
      price: 500,
      imageUrl: "https://rb.gy/dmrzfs",
    },
    {
      _id: "66b9c15d0fb598abe54bc456",
      name: "Car Wash",
      description: "Professional car Full-Service",
      duration: 60,
      price: 700,
      imageUrl: "https://rb.gy/dmrzfs",
    },
    {
      _id: "66b9c15d0fb598abe54bc457",
      name: "Interior Cleaning",
      description: "Thorough cleaning of the car's interior",
      duration: 45,
      price: 500,
      imageUrl: "https://rb.gy/dmrzfs",
    },
    {
      _id: "66b9c15d0fb598abe54bc456",
      name: "Car Wash",
      description: "Professional car Full-Service",
      duration: 60,
      price: 700,
      imageUrl: "https://rb.gy/dmrzfs",
    },
    {
      _id: "66b9c15d0fb598abe54bc457",
      name: "Interior Cleaning",
      description: "Thorough cleaning of the car's interior",
      duration: 45,
      price: 500,
      imageUrl: "https://rb.gy/dmrzfs",
    },
    // Add more services
  ];
  
  const ServiceData = () => (
    <div>
      <Services services={services} />
    </div>
  );
  
  export default ServiceData;
  