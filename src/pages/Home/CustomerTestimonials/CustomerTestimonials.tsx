/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiStar } from "react-icons/fi";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";

// const testimonials = [
//   {
//     name: "John Doe",
//     profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
//     rating: 5,
//     review:
//       "The car wash service was fantastic! My car looks brand new. Highly recommended!",
//   },
//   {
//     name: "Jane Smith",
//     profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
//     rating: 4,
//     review:
//       "Great service and quick turnaround. Will definitely use them again.",
//   },
//   {
//     name: "Sam Wilson",
//     profileImage: "https://randomuser.me/api/portraits/men/55.jpg",
//     rating: 5,
//     review:
//       "Excellent customer service and attention to detail. Very impressed!",
//   },
// ];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <FiStar
          key={i}
          className={`text-2xl ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const CustomerTestimonials: React.FC = () => {
  const { data: reviews } = useGetAllReviewsQuery(undefined);
  // console.log(reviews?.data);
  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          What Our Customers Say
        </h2>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="w-full"
        >
          {reviews?.data?.map((testimonial: any, index: any) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center text-center">
                <img
                  src={"https://avatar.iran.liara.run/public"}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <StarRating rating={testimonial.rating} />
                <p className="mt-4 text-lg text-gray-600 max-w-lg">
                  {testimonial.feedback}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
