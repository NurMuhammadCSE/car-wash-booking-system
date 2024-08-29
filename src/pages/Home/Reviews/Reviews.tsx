/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/pages/shared/Loader/Loader";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

const Reviews = () => {
  const {
    data: reviews,
    isLoading,
    isError,
  } = useGetAllReviewsQuery(undefined);

  if (isLoading) return <p><Loader></Loader>{" "}</p>;
  if (isError) return <p>Error fetching reviews.</p>;

  const averageRating =
    reviews?.data.reduce((acc:any, review:any) => acc + review.rating, 0) /
    reviews?.data.length;

  return (
    <section>
      {/* Post-Submission Display */}
      <div className="p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white text-[#30415A]">
          Overall Rating: {averageRating.toFixed(1)} / 5
        </h3>

        <div className="space-y-4">
          {reviews?.data.slice(0, 2).map((review:any, index:any) => (
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
