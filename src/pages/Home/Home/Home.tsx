import Banner from "../Banner/Banner";
import ReviewForm from "../Reviews/ReviewForm";
import FeaturedServices from "../FeaturedServices/FeaturedServices";
import Location from "@/pages/Location/Location";
import ScrollToTopButton from "@/components/ScrolleUpToBottom/ScrolleUpToBottom";
import PopularFeatured from "../PopularFeatured/PopularFeatured";
import Promotions from "../Promotions/Promotions";
import HowItWorks from "../HowItWorks/HowItWorks";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import ContactAndSupport from "../ContactAndSupport/ContactAndSupport";
import CustomerTestimonials from "../CustomerTestimonials/CustomerTestimonials";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner />

      {/* Popular Services */}
      <PopularFeatured />

      {/* Featured Services */}
      <FeaturedServices />

      {/* Promotions: Grab attention with discounts/offers */}
      <Promotions />

      {/* Customer Testimonials */}
      <CustomerTestimonials />

      {/* Review Form */}
      <ReviewForm />

      {/* Locations with black background */}
      <Location />

      {/* How the booking system works */}
      <HowItWorks />

      {/* Why choose our services */}
      <WhyChooseUs />

      {/* Contact and Support Information */}
      <ContactAndSupport />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
