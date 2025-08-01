import { GET_COURSE_REVIEWS } from '@/graphql/queries/get-course-reviews';
import { GetCourseLessonsQueryVariables, GetCourseReviewsQuery, Review } from '@/types.generated';
import { GraphQLClient } from 'graphql-request';

export const fetchCourseReviews = async ({
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
  const response = await client.request<GetCourseReviewsQuery, GetCourseLessonsQueryVariables>(
    GET_COURSE_REVIEWS,
    {
      id,
      limit,
      page,
    },
  );

  return response.course.reviews as Review[];
};
