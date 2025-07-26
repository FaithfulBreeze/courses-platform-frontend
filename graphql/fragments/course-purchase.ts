import { gql } from 'graphql-request';
import { CourseFragment } from './course';
import { UserFragment } from './user';

export const CoursePurchaseFragment = gql`
  fragment CoursePurchaseFields on CoursePurchase {
    id
    course {
      ...CourseFields
    }
    user {
      ...UserFields
    }
  }
  ${CourseFragment}
  ${UserFragment}
`;
