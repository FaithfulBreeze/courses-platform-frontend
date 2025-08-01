import gql from 'graphql-tag';
import { ReviewFragment } from '../fragments/review';
import { UserFragment } from '../fragments/user';

export const GET_COURSE_REVIEWS = gql`
  query GetCourseReviews($id: Int!, $limit: Int!, $page: Int!) {
    course(id: $id) {
      reviews(limit: $limit, page: $page) {
        ...ReviewFields
        reviewer {
          ...UserFields
        }
      }
    }
  }
  ${UserFragment}
  ${ReviewFragment}
`;
