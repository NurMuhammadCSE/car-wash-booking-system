import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Add this if you want navigation and pagination features
import { Navigation, Pagination } from 'swiper/modules';

const promotions = [
  {
    id: 1,
    title: '10% Off Your First Wash!',
    description: 'Get a 10% discount on your first car wash. Use code: FIRST10 at checkout.',
    image: 'https://images.unsplash.com/photo-1689182358896-2514cd65dfff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image paths
  },
  {
    id: 2,
    title: 'Summer Special: Exterior Wash',
    description: 'Enjoy a shiny car all summer long with our discounted exterior wash packages!',
    image: 'https://plus.unsplash.com/premium_photo-1664300115952-a2ec14ed32fc?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Loyalty Program',
    description: 'Sign up for our loyalty program and get a free wash for every 5 washes!',
    image: 'https://plus.unsplash.com/premium_photo-1670002392440-0a64552ae431?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const Promotions: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-black text-center mb-6">Current Promotions</h2>
        <p className="text-lg text-gray-600 text-center mb-10">Don’t miss out on these special offers and discounts!</p>

        {/* Swiper Carousel for Promotions */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-96"
        >
          {promotions.map((promo) => (
            <SwiperSlide key={promo.id}>
              <div className="relative h-full bg-cover bg-center rounded-lg shadow-lg" style={{ backgroundImage: `url(${promo.image})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
                  <h3 className="text-3xl font-bold mb-4">{promo.title}</h3>
                  <p className="text-lg mb-6">{promo.description}</p>
                  <button className="bg-[#30415A] py-2 px-6 rounded-md text-white font-semibold transition-colors">Redeem Offer</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Static Banner for Membership/Loyalty Program */}
        {/* <div className="mt-16 bg-indigo-600 text-white py-12 px-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-6 lg:mb-0">
            <h3 className="text-3xl font-bold">Join Our Membership Program</h3>
            <p className="text-lg mt-2">Become a member and get exclusive discounts, priority booking, and a free wash on your birthday!</p>
          </div>
          <button className="bg-white text-indigo-600 py-2 px-6 rounded-md font-semibold hover:bg-gray-200 transition-colors">
            Join Now
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Promotions;
