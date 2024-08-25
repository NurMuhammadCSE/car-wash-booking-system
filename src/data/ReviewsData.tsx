import Review from "@/pages/Home/Reviews/Review";

const reviews = [
  { rating: 5, feedback: "Great service, highly recommend!" },
  { rating: 4, feedback: "Good experience, but room for improvement." },
  { rating: 4, feedback: "Good experience, but room for improvement." },
  // Add more reviews
];

const handleReviewSubmit = (newReview) => {
  // Handle the review submission (e.g., send to server)
  console.log("Review submitted:", newReview);
};

const ReviewsData = () => (
  <div>
    <Review reviews={reviews} onSubmit={handleReviewSubmit} />
  </div>
);

export default ReviewsData;
