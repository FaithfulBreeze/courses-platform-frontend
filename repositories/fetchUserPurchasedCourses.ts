import { GET_USER_PURCHASED_COURSES } from '@/graphql/queries/get-user-purchased-courses';
import {
  Course,
  GetUserPurchasedCoursesQuery,
  GetUserPurchasedCoursesQueryVariables,
} from '@/types.generated';
import { GraphQLClient } from 'graphql-request';

export const fetchUserPurchasedCourses = async ({
  client,
  id,
}: {
  client: GraphQLClient;
  id: number;
}) => {
  const {
    user: { purchasedCourses },
  } = await client.request<GetUserPurchasedCoursesQuery, GetUserPurchasedCoursesQueryVariables>(
    GET_USER_PURCHASED_COURSES,
    { id },
  );

  return purchasedCourses as Course[];
};
