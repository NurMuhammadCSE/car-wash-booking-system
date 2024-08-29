/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/pages/shared/Loader/Loader";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { Rating } from "@smastrom/react-rating";
import { Helmet } from "react-helmet-async";

const AllReviews = () => {
  const {
    data: reviews,
    isLoading,
    isError,
  } = useGetAllReviewsQuery(undefined);

  if (isLoading)
    return (
      <p>
        <Loader></Loader>{" "}
      </p>
    );
  if (isError) return <p>Error fetching reviews.</p>;

  const averageRating =
    reviews?.data.reduce((acc:any, review:any) => acc + review.rating, 0) /
    reviews?.data.length;

  return (
    <section>
      <Helmet>
        <title>All Reviews - Car Washing</title>
      </Helmet>
      {/* Post-Submission Display */}
      <div className="dark:bg-black bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-[#30415A]">
          Overall Rating: {averageRating.toFixed(1)} / 5
        </h3>

        <div className="space-y-4">
          {reviews?.data.map((review:any, index:any) => (
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
      </div>
    </section>
  );
};

export default AllReviews;
