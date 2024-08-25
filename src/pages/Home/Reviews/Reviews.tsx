import reviews from "@/data/ReviewsData";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

const Reviews = () => {
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <section>
      {/* Post-Submission Display */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-[#30415A]">
          Overall Rating: {averageRating.toFixed(1)} / 5
        </h3>

        <div className="space-y-4">
          {reviews.slice(0, 2).map((review, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <Rating
                  style={{ maxWidth: 250 }}
                  value={review.rating}
                  className="text-yellow-400"
                  readOnly
                />
              </div>
              <p className="text-gray-700">{review.feedback}</p>
            </div>
          ))}
        </div>

        <Link
          to="/reviews"
          className="inline-block mt-4 text-[#30415A] font-semibold hover:underline"
        >
          See All Reviews
        </Link>
      </div>
    </section>
  );
};

export default Reviews;
