import { GET_COURSE } from '@/graphql/queries/get-course';
import { Course, GetCourseQuery, GetCourseQueryVariables } from '@/types.generated';
import { GraphQLClient } from 'graphql-request';

export const fetchCourse = async ({ client, id }: { client: GraphQLClient; id: number }) => {
  const response = await client.request<GetCourseQuery, GetCourseQueryVariables>(GET_COURSE, {
    id,
  });

  return response.course as Course;
};
