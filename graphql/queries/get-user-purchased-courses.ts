import gql from 'graphql-tag';
import { CourseFragment } from '../fragments/course';
import { UserFragment } from '../fragments/user';

export const GET_USER_PURCHASED_COURSES = gql`
  query GetUserPurchasedCourses($id: Int!) {
    user(id: $id) {
      purchasedCourses {
        ...CourseFields
        owner {
          ...UserFields
        }
      }
    }
  }
  ${CourseFragment}
  ${UserFragment}
`;
