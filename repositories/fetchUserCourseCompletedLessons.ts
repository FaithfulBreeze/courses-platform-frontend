import { GET_USER_COURSE_COMPLETED_LESSONS } from '@/graphql/queries/get-user-course-completed-lessons';
import {
  GetUserCourseCompletedLessonsQuery,
  GetUserCourseCompletedLessonsQueryVariables,
  Lesson,
} from '@/types.generated';
import { GraphQLClient } from 'graphql-request';

export const fetchUserCourseCompletedLessons = async ({
  client,
  id,
  courseId,
}: {
  client: GraphQLClient;
  id: number;
  courseId: number;
}) => {
  const { user } = await client.request<
    GetUserCourseCompletedLessonsQuery,
    GetUserCourseCompletedLessonsQueryVariables
  >(GET_USER_COURSE_COMPLETED_LESSONS, { id, courseId });

  return user.completedCourseLessons as Lesson[];
};
