import { Review } from '@/types.generated';
import StarRating from './star-rating';

interface IReviewList {
  reviews: Review[];
  heading?: string;
}

export default function ReviewList({ reviews, heading }: IReviewList) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {heading || 'Reviews'}
      </h2>

      {reviews?.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow transition hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                {review.reviewer.avatar ? (
                  <img
                    src={review.reviewer.avatar}
                    alt={`${review.reviewer.name}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 text-sm font-semibold">
                    {review.reviewer.name[0]}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {review.reviewer.name}
                    </p>
                    <StarRating rate={review.rate} />
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line mt-2">
                    {review.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
