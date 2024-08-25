import ServiceData from "@/data/ServicesData";
import Banner from "../Banner/Banner";
import ReviewsData from "@/data/ReviewsData";
import ReviewForm from "../Reviews/ReviewForm";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <ServiceData></ServiceData>
      <ReviewForm></ReviewForm>
      {/* <Reviews></Reviews> */}
      {/* <ReviewsData></ReviewsData> */}
    </div>
  );
};

export default Home;
