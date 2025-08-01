import { GET_LESSON_REVIEWS } from '@/graphql/queries/get-lesson-reviews';
import { GetLessonReviewsQuery, GetLessonReviewsQueryVariables, Review } from '@/types.generated';
import { GraphQLClient } from 'graphql-request';

export const fetchLessonReviews = async ({
  client,
  id,
  limit = 10,
  page = 1,
}: {
  client: GraphQLClient;
  id: number;
  limit?: number;
  page?: number;
}) => {
  const response = await client.request<GetLessonReviewsQuery, GetLessonReviewsQueryVariables>(
    GET_LESSON_REVIEWS,
    {
      id,
      limit,
      page,
    },
  );

  return response.lesson.reviews as Review[];
};
