import Banner from "../Banner/Banner";
import ReviewForm from "../Reviews/ReviewForm";
import FeaturedServices from "../FeaturedServices/FeaturedServices";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedServices></FeaturedServices>
      <ReviewForm></ReviewForm>
    </div>
  );
};

export default Home;
