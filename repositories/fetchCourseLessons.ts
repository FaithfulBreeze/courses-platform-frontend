import { GET_COURSE_LESSONS } from '@/graphql/queries/get-course-lessons';
import { GetCourseLessonsQuery, GetCourseLessonsQueryVariables, Lesson } from '@/types.generated';
import { GraphQLClient } from 'graphql-request';

export const fetchCourseLessons = async ({
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
  const response = await client.request<GetCourseLessonsQuery, GetCourseLessonsQueryVariables>(
    GET_COURSE_LESSONS,
    {
      id,
      limit,
      page,
    },
  );

  return response.course.lessons as Lesson[];
};
