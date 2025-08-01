'use client';

import { Course, Lesson, Review } from '@/types.generated';
import { useContext, useEffect, useState } from 'react';
import { ClientContext } from '@/contexts/ClientContext';
import { fetchLessonReviews } from '@/repositories/fetchLessonReviews';
import { fetchCourseReviews } from '@/repositories/fetchCourseReviews';
import ReviewListItem from './review-list-item';
import { PaginatedList } from './paginated-list';

interface IReviewListProps {
  lesson?: Lesson;
  course?: Course;
}

interface IReviewListStateProps {
  reviews?: Review[];
  totalCount?: number;
}

export default function ReviewList({ lesson, course }: IReviewListProps) {
  const [page, setPage] = useState(1);
  const [state, setState] = useState<IReviewListStateProps>({});
  const { client } = useContext(ClientContext);

  const REVIEWS_PER_PAGE = 5;

  useEffect(() => {
    if (!client) return;

    const fetchReviews = async () => {
      if (!course && lesson) {
        const reviews = await fetchLessonReviews({
          client,
          id: lesson.id,
          page,
          limit: REVIEWS_PER_PAGE,
        });
        setState((prev) => ({ ...prev, reviews, totalCount: lesson.reviewsCount }));
        return;
      }

      if (!lesson && course) {
        const reviews = await fetchCourseReviews({
          client,
          id: course.id,
          page,
          limit: REVIEWS_PER_PAGE,
        });
        setState((prev) => ({ ...prev, reviews, totalCount: course.reviewsCount }));
        return;
      }
    };

    fetchReviews();
  }, [client, course, lesson, page]);

  const total = state.totalCount ?? 0;

  return (
    <section className="space-y-5 sm:space-y-6">
      {(course || lesson) && (
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          {course ? 'Course Reviews' : 'Lesson Reviews'}
        </h2>
      )}

      {total === 0 ? (
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">No reviews yet.</p>
      ) : (
        <PaginatedList
          items={state.reviews || []}
          totalCount={total}
          currentPage={page}
          pageSize={REVIEWS_PER_PAGE}
          onPageChange={setPage}
          isLoading={!state.reviews}
          renderItem={(review) => <ReviewListItem key={review.id} review={review} />}
        />
      )}
    </section>
  );
}
