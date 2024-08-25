import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Reviews from "./Reviews";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    // Handle form submission, save feedback and rating
    console.log("Rating:", rating, "Feedback:", feedback);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#30415A] text-center">
          Leave a Review
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-center items-center mb-4">
            <Rating
              style={{ maxWidth: 250 }}
              value={rating}
              onChange={setRating}
              className="text-yellow-400"
            />
          </div>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your feedback here..."
            rows={5}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Review
          </button>
        </div>
        <Reviews></Reviews>
      </div>
    </section>
  );
};

export default ReviewForm;
