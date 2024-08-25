import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    // Handle form submission, save feedback and rating
    console.log("Rating:", rating, "Feedback:", feedback);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Leave a Review</h2>
      <div className="flex items-center mb-4">
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
  );
};

export default ReviewForm;
