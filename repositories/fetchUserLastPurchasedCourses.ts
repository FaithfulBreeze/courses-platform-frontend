import { GET_USER_LAST_PURCHASED_COURSES } from '@/graphql/queries/get-user-last-purchased-courses';
import {
  Course,
  GetUserLastPurchasedCoursesQuery,
  GetUserLastPurchasedCoursesQueryVariables,
} from '@/types.generated';
import { GraphQLClient } from 'graphql-request';

export const fetchUserLastPurchasedCourses = async ({
  client,
  id,
  limit = 5,
}: {
  client: GraphQLClient;
  id: number;
  limit?: number;
}) => {
  const { user } = await client.request<
    GetUserLastPurchasedCoursesQuery,
    GetUserLastPurchasedCoursesQueryVariables
  >(GET_USER_LAST_PURCHASED_COURSES, { id, limit });

  return user.lastCoursePurchases.map((coursePurchase) => coursePurchase.course) as Course[];
};
