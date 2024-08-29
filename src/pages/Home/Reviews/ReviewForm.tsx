import  { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Reviews from "./Reviews";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [createReview, { isLoading, isSuccess, isError }] =
    useCreateReviewMutation();

  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Redirect to login if user is not logged in
  //   if (!user || !user.userId) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      // Alert or show error message for required feedback
      alert("Feedback is required!");
      return;
    }

    if (!user || !user.userId) {
      // Return null or a loading indicator while redirecting
      navigate("/login");
    }

    try {
      await createReview({
        userId: user.userId, // Replace with actual user ID
        rating,
        feedback,
      }).unwrap();
      toast.success("Successfully Review!");

      console.log("Review submitted successfully");
      setRating(0); // Clear rating
      setFeedback(""); // Clear feedback
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white text-[#30415A] text-center">
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
            required
          />
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
          {isSuccess && (
            <p className="mt-4 text-green-600">
              Review submitted successfully!
            </p>
          )}
          {isError && (
            <p className="mt-4 text-red-600">Failed to submit review.</p>
          )}
        </div>
        <Reviews />
      </div>
    </section>
  );
};

export default ReviewForm;
