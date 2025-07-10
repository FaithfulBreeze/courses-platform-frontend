import gql from "graphql-tag";
import { CourseFragment } from "../fragments/course";

export const GET_USER_PURCHASED_COURSES = gql`
  query GetUserPurchasedCourses($id: Int!) {
    user(id: $id) {
      purchasedCourses {
        ...CourseFields
      }
    }
  }
  ${CourseFragment}
`;
