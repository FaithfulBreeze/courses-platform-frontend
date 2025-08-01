import { Review } from '@/types.generated';
import StarRating from './star-rating';

export default function ReviewListItem({ review }: { review: Review }) {
  return (
    <li
      key={review.id}
      className="p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow hover:shadow-md transition"
    >
      <div className="grid grid-cols-[auto,1fr] gap-3 sm:flex sm:items-start sm:gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 sm:w-12 sm:h-12">
          {review.reviewer.avatar ? (
            <img
              src={review.reviewer.avatar}
              alt={`${review.reviewer.name}'s avatar`}
              className="w-full h-full rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 text-base sm:text-base font-semibold">
              {review.reviewer.name[0]}
            </div>
          )}
        </div>

        {/* Text Block */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
              {review.reviewer.name}
            </p>
            <div className="mt-1 sm:mt-0">
              <StarRating rate={review.rate} />
            </div>
          </div>
          <p className="mt-2 text-sm sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {review.content}
          </p>
        </div>
      </div>
    </li>
  );
}
