import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import ReviewForm from "./ReviewForm";

const Review = ({ reviews, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (rating > 0 && feedback.trim() !== "") {
      onSubmit({ rating, feedback });
      setRating(0);
      setFeedback("");
    }
  };

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#30415A] text-center">
          Leave a Review
        </h2>

        {/* Rating and Feedback Input */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-center items-center mb-4">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className="hidden"
                  />
                  <FaStar
                    size={40}
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    className="cursor-pointer transition-transform transform hover:scale-110"
                  />
                </label>
              );
            })}
          </div>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Leave your feedback..."
            rows={4}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#30415A] mb-4"
          ></textarea>

          <button
            onClick={handleSubmit}
            className="bg-[#30415A] text-white py-2 px-6 rounded-lg hover:bg-[#1e2c42] transition duration-300 w-full"
          >
            Submit Review
          </button>
        </div>

        <ReviewForm></ReviewForm>

        {/* Post-Submission Display */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-[#30415A]">
            Overall Rating: {averageRating.toFixed(1)} / 5
          </h3>

          <div className="space-y-4">
            {reviews.slice(0, 2).map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((star, i) => (
                    <FaStar
                      key={i}
                      size={24}
                      color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.feedback}</p>
              </div>
            ))}
          </div>

          <a
            href="/reviews"
            className="inline-block mt-4 text-[#30415A] font-semibold hover:underline"
          >
            See All Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default Review;
