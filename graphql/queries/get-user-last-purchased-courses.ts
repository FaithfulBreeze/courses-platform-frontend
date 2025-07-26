import gql from 'graphql-tag';
import { CourseFragment } from '../fragments/course';
import { UserFragment } from '../fragments/user';
import { LessonFragment } from '../fragments/lesson';
import { CoursePurchaseFragment } from '../fragments/course-purchase';

export const GET_USER_LAST_PURCHASED_COURSES = gql`
  query GetUserLastPurchasedCourses($id: Int!, $limit: Int!) {
    user(id: $id) {
      lastCoursePurchases(limit: $limit) {
        ...CoursePurchaseFields
        course {
          ...CourseFields
          lessons {
            ...LessonFields
          }
          owner {
            ...UserFields
          }
        }
      }
    }
  }
  ${CoursePurchaseFragment}
  ${CourseFragment}
  ${UserFragment}
  ${LessonFragment}
`;
