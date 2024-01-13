import { type Review } from "@prisma/client";
import { api } from "~/utils/api";
import ErrorSpan from "./ErrorSpan";
import { Star } from "./StarsRating";

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="rounded-md bg-white p-2 shadow-md">
      <div className="mb-2 text-lg font-semibold">{review.title}</div>
      <div className="mb-2 text-gray-600">{review.description}</div>
      <div className="mb-2 flex items-center">
        <div className="text-gray-500">{review.position}</div>
      </div>
      <div className="mb-2 text-gray-500">
        {`${review.startDate.toDateString()} ${
          review.endDate ? `- ${review.endDate.toDateString()}` : ""
        }`}
      </div>
      <div className="flex items-center">
        <div id="stars" className="flex gap-2">
          {[1, 2, 3, 4, 5].map((v, i) => (
            <Star key={i} filled={v <= review.stars} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Reviews: React.FC<{ companyId: string }> = ({ companyId }) => {
  const reviewsQuery = api.review.getAllReviewFromCompany.useQuery({
    companyId,
  });
  if (reviewsQuery.isLoading) {
    return <>loading...</>;
  }

  if (reviewsQuery.isError) {
    return <ErrorSpan message={reviewsQuery.error.message} />;
  }
  const reviews = reviewsQuery.data;

  return (
    <div className="grid w-fit grid-cols-2 gap-4 overflow-y-auto p-2">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};
export default Reviews;
