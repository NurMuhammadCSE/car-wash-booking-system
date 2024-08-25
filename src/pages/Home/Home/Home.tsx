import ServiceData from "@/data/ServicesData";
import Banner from "../Banner/Banner";
import ReviewsData from "@/data/ReviewsData";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <ServiceData></ServiceData>
      <ReviewsData></ReviewsData>
    </div>
  );
};

export default Home;
